using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// LÄHITASO (omistaja 27.9.2026 klo 08.0x Fablen kautta): nostojen 3D-mallien polygonimäärä saa kasvaa lähizoomissa.
    /// Kolmas tarkkuustaso Erikoismalli.Lahi (Runko = keski, Lod1 = kauko) tason 1 malleille (erikoismallit ja
    /// kategoriasymbolit, rekisteröinti kuten ennen). Ehto sama kaikille: kartan kerroin ≥ <see cref="LahiKerroin"/>
    /// (hystereesi 10 %), ja lähiverkon saa kerrallaan enintään <see cref="LahiEnintaan"/> kameraa lähintä näkyvää mallia;
    /// muut piirtävät Rungon. Vaihto vain muuttuessa (verkko + ääriviiva), ei per-kehys-allokaatioita.
    /// Komento `symbolit lahi 0|1|n` (n = enintään n mallia), `symbolit tila` näyttää lähitason mallit.
    /// </summary>
    public sealed partial class Symbolimallit
    {
        public const double LahiKerroin = 4.0;
        /// <summary>Lähiverkon kolmiokatto (varoitus lokiin, jos ylittyy).</summary>
        public const int LahiKatto = 3000;
        public static int LahiEnintaan = 3;
        public static bool Lahitaso = true;
        static bool lahiZoom;

        readonly Dictionary<string, Mesh> lahiVerkot = new Dictionary<string, Mesh>(System.StringComparer.Ordinal);
        readonly Kappale[] lahimmat = new Kappale[12];
        int lahiNyt;

        /// <summary>Noston lähiverkko (erikoismalli tai kategoriasymboli), rakennetaan kerran; null = ei lähitasoa.</summary>
        Mesh LahiVerkkoNostolle(Tieto t)
        {
            Erikoismalli m = null;
            string avain = null;
            if (t.Erikois != null) { Mallit.TryGetValue(t.Erikois, out m); avain = "e:" + t.Erikois; }
            else if (KayttaaSymbolia(t)) { m = KategoriaMallit[(int)t.Symboli.Value]; avain = "k:" + t.Symboli.Value; }
            if (m == null || m.Lahi == null) return null;
            if (lahiVerkot.TryGetValue(avain, out var v)) return v;
            v = m.Lahi();
            int n = v != null ? v.triangles.Length / 3 : 0;
            if (n > LahiKatto) Debug.LogWarning($"MATKAKIRJA symbolimallit: lähitaso {avain} {n} kolmiota yli budjetin {LahiKatto}");
            return lahiVerkot[avain] = v;
        }

        /// <summary>Valitsee lähitason mallit tälle kehykselle (LateUpdaten lopussa tason 1 päivityksen jälkeen).</summary>
        void ValitseLahitaso(NostoKerros nk)
        {
            double kerroin = nk != null ? nk.ZoomKerroin : 0.0, kynnys = LahiKynnys(nk);
            if (lahiZoom && kerroin < kynnys * 0.9) lahiZoom = false;
            else if (!lahiZoom && kerroin >= kynnys) lahiZoom = true;
            int enintaan = Lahitaso && lahiZoom ? Mathf.Min(LahiEnintaan, lahimmat.Length) : 0;
            int n = 0;
            if (enintaan > 0)
                foreach (var p in kappaleet)
                {
                    var k = p.Value;
                    if (k.LahiVerkko == null || !k.R.enabled || float.IsInfinity(k.Etaisyys)) continue;
                    // Lisäyslajittelu enintään `enintaan` lähimpään (pieni taulukko, ei allokaatioita).
                    int i = n < enintaan ? n++ : enintaan;
                    if (i == enintaan && k.Etaisyys >= lahimmat[enintaan - 1].Etaisyys) continue;
                    if (i == enintaan) i = enintaan - 1;
                    while (i > 0 && lahimmat[i - 1].Etaisyys > k.Etaisyys) { lahimmat[i] = lahimmat[i - 1]; i--; }
                    lahimmat[i] = k;
                }
            lahiNyt = 0;
            foreach (var p in kappaleet)
            {
                var k = p.Value;
                bool lahi = false;
                for (int i = 0; i < n; i++) if (lahimmat[i] == k) { lahi = true; break; }
                if (lahi) lahiNyt++;
                if (lahi == k.LahiNyt) continue;
                k.LahiNyt = lahi;
                var v = lahi ? k.LahiVerkko : k.Perus;
                k.Suodin.sharedMesh = k.ReunaSuodin.sharedMesh = v;
                PallonLepo.Muuttui("symbolimallit");
            }
            for (int i = 0; i < n; i++) lahimmat[i] = null;
        }

        /// <summary>
        /// Lähikynnys: <see cref="LahiKerroin"/>, mutta pienissä maissa enintään 0,97 × suurin saavutettava kerroin (Mallinsepän
        /// löydös 27.9. klo 09.2x: NLD/BEL/CHE/DNK:ssa kerroin on enintään ~1,3), eli lähimmässä zoomissa lähitaso myös niissä.
        /// </summary>
        static double LahiKynnys(NostoKerros nk) =>
            nk != null && !float.IsInfinity(nk.SuurinKerroin) ? System.Math.Min(LahiKerroin, 0.97 * nk.SuurinKerroin) : LahiKerroin;

        string LahiTila() =>
            $"{(Lahitaso ? 1 : 0)} ({lahiNyt}/{LahiEnintaan}, kerroin ≥ {LahiKynnys(NostoKerros.Instanssi):0.##}{(lahiZoom ? " nyt" : "")}, verkkoja {lahiVerkot.Count})";
    }
}
