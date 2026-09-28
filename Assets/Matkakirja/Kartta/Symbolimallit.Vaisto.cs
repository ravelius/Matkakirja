using System;
using System.Collections.Generic;
using System.Globalization;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// 3D-SYMBOLIT ISOMMIKSI, AIKAISEMMIN JA VÄISTÄEN (omistajan toive 27.9.2026 klo 23.2x Fablen kautta; Linssisepän speksi
    /// docs/raportit/symbolit-ja-lippu-speksi-20260928.md; säännöt ja geometria SymbolienVaisto.cs).
    ///  - Kynnys <see cref="Taso1KynnysKerroin"/> (1,25), symbolien koko <see cref="SymKynnysPt"/> → <see cref="SymKokoPt"/>
    ///    (30 → 54 pt) ja perspektiivin ramppi <see cref="PerspektiiviReuna"/> (0,5): Symbolimallit.cs käyttää näitä.
    ///  - Väistö: näkyvät tason 1 symbolit (ei erikoismalleja) tärkeysjärjestyksessä; kaupunkien pisteet ja nimet
    ///    (Nimikerros.Laatikot, KaupunkiLaatikoita) ja jo näytetyt tärkeämmät symbolit. Väistynyt symboli piirtyy 2D-kuvamerkkinä
    ///    (OnMalli epätosi) tai, jos jalka on tärkeämmän symbolin laatikossa, piiloutuu ja merkki on reunapisteenä
    ///    (<see cref="ReunaPiste"/>). Häivytys jakaa erikoismallin alla -säännön piilokanavan (_Tila.y): suurempi voittaa.
    /// Komennot `symbolit kynnys k | symkoko a b | ramppi r | vaisto 0|1 | vanha 0|1` (A/B samasta käännöksestä).
    /// Ei allokaatioita kehyksittäin levossa: tila noston id:llä luodaan kerran, listat valmiina.
    /// </summary>
    public sealed partial class Symbolimallit
    {
        /// <summary>Tason 1 3D-mallien kynnyskerroin (komento `symbolit kynnys k`).</summary>
        public static double Taso1KynnysKerroin = SymbolienVaisto.KynnysKerroin;
        /// <summary>Kategoriasymbolien ja arkkityyppien leveys (pt) kynnyksellä ja täydellä kertoimella (`symbolit symkoko a b`).</summary>
        public static float SymKynnysPt = SymbolienVaisto.SymKynnysPt, SymKokoPt = SymbolienVaisto.SymTaysiPt;
        /// <summary>Liioitellun perspektiivin täyden kallistuksen etäisyys (`symbolit ramppi r`, 1 = 1.0.33).</summary>
        public static float PerspektiiviReuna = (float)SymbolienVaisto.RamppiReuna;
        /// <summary>Koko zoomtasojen mukaan (log); false = 1.0.33:n lineaarinen kertoimen mukaan.</summary>
        public static bool LogKoko = true;
        /// <summary>Väistösääntö päällä (`symbolit vaisto 0|1`).</summary>
        public static bool VaistoSaanto = true;

        // ---- Koko kallistetussa kartassa (omistaja 28.9. klo 17.4x, SymbolienVaisto kohta 5; A/B samasta käännöksestä) ----

        /// <summary>Kokokerroin tasolle 1 (symbolit ja erikoismallit) ja tasoille 2–3 (`symbolit iso a [b]`; 1 = 1.0.37).</summary>
        public static float Iso = SymbolienVaisto.IsoKerroin, Iso23 = SymbolienVaisto.IsoKerroin;
        /// <summary>Kallistetussa kartassa esineen koko ja perspektiivi (`symbolit luonnollinen 0|1`; 0 = 1.0.37:n vakioruutu).</summary>
        public static bool Luonnollinen = true;
        /// <summary>Kallistetun kartan lisäkasvu (`symbolit kasvu x`) ja katto ruudun lyhyemmästä sivusta (`symbolit katto osuus`).</summary>
        public static float LisaKasvu = (float)SymbolienVaisto.LisaKasvu, KattoOsuus = SymbolienVaisto.KattoOsuus;
        /// <summary>Kasvaa, kun kokoasetus vaihtuu komennolla (tasot 2–3 lasketaan silloin uudelleen).</summary>
        static int kokoVersio;

        static void NollaaVaisto()
        {
            Taso1KynnysKerroin = SymbolienVaisto.KynnysKerroin;
            SymKynnysPt = SymbolienVaisto.SymKynnysPt; SymKokoPt = SymbolienVaisto.SymTaysiPt;
            PerspektiiviReuna = (float)SymbolienVaisto.RamppiReuna;
            LogKoko = true; VaistoSaanto = true;
            Iso = Iso23 = SymbolienVaisto.IsoKerroin; Luonnollinen = true;
            LisaKasvu = (float)SymbolienVaisto.LisaKasvu; KattoOsuus = SymbolienVaisto.KattoOsuus;
            kokoVersio = 0;
        }

        /// <summary>`symbolit vanha 1`: kaikki 1.0.33:n arvot kerralla (kuvaparin "ennen"), `vanha 0` uudet.</summary>
        static void AsetaVanha(bool vanha)
        {
            Taso1KynnysKerroin = vanha ? SymbolienVaisto.VanhaKynnysKerroin : SymbolienVaisto.KynnysKerroin;
            SymKynnysPt = vanha ? SymbolienVaisto.VanhaSymKynnysPt : SymbolienVaisto.SymKynnysPt;
            SymKokoPt = vanha ? SymbolienVaisto.VanhaSymTaysiPt : SymbolienVaisto.SymTaysiPt;
            PerspektiiviReuna = (float)(vanha ? SymbolienVaisto.VanhaRamppiReuna : SymbolienVaisto.RamppiReuna);
            LogKoko = !vanha;
            VaistoSaanto = !vanha;
        }

        /// <summary>Väistön komennot (Komento kutsuu): palauttaa, tunnistettiinko.</summary>
        static bool VaistoKomento(string[] o)
        {
            var c = CultureInfo.InvariantCulture;
            switch (o[1])
            {
                case "kynnys": Taso1KynnysKerroin = Math.Max(0.2, double.Parse(o[2], c)); return true;
                case "symkoko":
                    SymKynnysPt = Mathf.Clamp(float.Parse(o[2], c), 8f, 120f);
                    SymKokoPt = o.Length > 3 ? Mathf.Clamp(float.Parse(o[3], c), SymKynnysPt, 160f) : Mathf.Max(SymKokoPt, SymKynnysPt);
                    return true;
                case "ramppi": PerspektiiviReuna = Mathf.Clamp(float.Parse(o[2], c), 0.1f, 1f); return true;
                case "vaisto": VaistoSaanto = o[2] != "0" && o[2] != "pois"; return true;
                case "vanha": AsetaVanha(o[2] != "0" && o[2] != "pois"); return true;
                case "iso":
                    Iso = Mathf.Clamp(float.Parse(o[2], c), 0.3f, 4f);
                    Iso23 = o.Length > 3 ? Mathf.Clamp(float.Parse(o[3], c), 0.3f, 4f) : Iso;
                    kokoVersio++;
                    return true;
                case "luonnollinen": Luonnollinen = o[2] != "0" && o[2] != "pois"; kokoVersio++; return true;
                case "kasvu": LisaKasvu = Mathf.Clamp(float.Parse(o[2], c), 0f, 1.5f); kokoVersio++; return true;
                case "katto": KattoOsuus = Mathf.Clamp(float.Parse(o[2], c), 0.05f, 1f); kokoVersio++; return true;
                default: return false;
            }
        }

        /// <summary>
        /// Tason 1 symbolin leveys ylhäältä nyt (pt, × <see cref="Iso"/>): Natiivi-UI:n merkin ruutu (oma nimiö symbolin viereen)
        /// ja muiden merkkien peitto, kun noston omaa kokoa ei tunneta (ks. <see cref="LeveysPt"/>).
        /// </summary>
        public static float Taso1LeveysPt
        {
            get
            {
                var nk = NostoKerros.Instanssi;
                return (nk != null ? SymKokoNyt(nk.ZoomKerroin) : SymKokoPt) * Iso;
            }
        }

        /// <summary>
        /// Noston 3D-mallin leveys ruudulla nyt (pt): kallistetussa kartassa jokaisella mallilla on oma kokonsa (lähempänä
        /// isompi, omistaja 28.9. klo 17.4x), joten Natiivi-UI:n merkin ruutu ja peitto lukevat tämän. Taso 1 kappaleesta,
        /// tasot 2–3 viimeisimmästä instanssilaskennasta; tuntematon: <see cref="Taso1LeveysPt"/>.
        /// </summary>
        public static float LeveysPt(string nostoId)
        {
            if (instanssi != null && nostoId != null)
            {
                if (instanssi.kappaleet.TryGetValue(nostoId, out var k) && k.R.enabled && k.LeveysPx > 0f)
                    return k.LeveysPx / Mathf.Max(1e-3f, PalloKierto.Pistekerroin);
                if (instanssi.instanssit23.TryGetValue(nostoId, out var i) && i.LeveysPt > 0f) return i.LeveysPt;
            }
            var t = TietoIdlla(nostoId);
            if (t != null && t.Taso >= 2)
            {
                var nk = NostoKerros.Instanssi;
                return (nk != null ? KokoNyt23(nk.ZoomKerroin) : KokoPt) * (t.Taso == 2 ? Taso2Koko : Taso3Koko) * Iso23;
            }
            return Taso1LeveysPt;
        }

        /// <summary>Kategoriasymbolin tai arkkityypin leveys (pt) kartan kertoimella (tason 1 kynnys → täysi kerroin).</summary>
        public static float SymKokoNyt(double kerroin)
        {
            var (k0, k1) = KokoValit();
            return SymbolienVaisto.Koko(kerroin, k0, k1, SymKynnysPt, SymKokoPt, LogKoko);
        }

        /// <summary>Tason 1 kynnys ja täyden koon kerroin (pienissä maissa enintään suurin saavutettava).</summary>
        static (double k0, double k1) KokoValit()
        {
            double k0 = Taso1Kynnys(), k1 = KokoTaysiKerroin;
            var nk = NostoKerros.Instanssi;
            if (nk != null && !float.IsInfinity(nk.SuurinKerroin)) k1 = Math.Min(k1, nk.SuurinKerroin);
            return (k0, Math.Max(k1, k0));
        }

        /// <summary>Noston väistötila (noston id:llä).</summary>
        sealed class Vaisto
        {
            /// <summary>Tavoite: 3D pois (2D-kuvamerkki tai reunapiste) ja reunapiste (jalka tärkeämmän laatikossa).</summary>
            public bool Vaistaa, Reunalle;
            /// <summary>Reunapisteen laatikon symboli.</summary>
            public Kappale Voittaja;
            /// <summary>Edellinen vaihto (unscaledTime; −1 = ei päätetty) ja häivytys (0 näkyy … 1 piilossa).</summary>
            public float Muutos = -1f, Piilo;
            public bool Nahty;
            /// <summary>Tilariville: "nimi" tai "symboli".</summary>
            public string Syy;
        }
        readonly Dictionary<string, Vaisto> vaistot = new Dictionary<string, Vaisto>(StringComparer.Ordinal);

        struct VEhdokas { public string Id; public Kappale K; public Vaisto V; public float X, Y; public Ruutulaatikko L; }
        readonly List<VEhdokas> vEhdokkaat = new List<VEhdokas>(64);
        readonly List<int> vNaytetyt = new List<int>(64);
        /// <summary>Tärkeysjärjestys IComparerina: List.Sort(Comparison) allokoisi vertailijan joka kutsulla.</summary>
        sealed class VJarjestys : IComparer<VEhdokas>
        {
            public int Compare(VEhdokas a, VEhdokas b) => SymbolienVaisto.Vertaa(a.K.Loydetty, a.Id, b.K.Loydetty, b.Id);
        }
        static readonly VJarjestys vJarjestys = new VJarjestys();
        bool vaistoAnimoi;

        /// <summary>Väistyykö noston 3D-symboli 2D-kuvamerkiksi (OnMalli epätosi). Reunapisteeseen piiloutunut ei väisty kuvamerkiksi.</summary>
        bool VaistyyKuvamerkiksi(string id) =>
            VaistoSaanto && id != null && vaistot.TryGetValue(id, out var v) && v.Vaistaa && !v.Reunalle;

        /// <summary>Väistön häivytys noston kappaleelle (0 näkyy … 1 piilossa); PaivitaAllaTaso1 yhdistää sen erikoismallin alla -piiloon.</summary>
        float VaistoPiilo(string id) => id != null && vaistot.TryGetValue(id, out var v) ? v.Piilo : 0f;

        /// <summary>
        /// Väistö (LateUpdate tason 1 ja maamerkkien jälkeen, ennen PaivitaAllaTaso1:tä): näkyvät tason 1 symbolit
        /// tärkeysjärjestyksessä kaupunkien laatikoita ja jo näytettyjä tärkeämpiä symboleita vasten.
        /// </summary>
        void PaivitaVaisto()
        {
            float nytS = Time.unscaledTime, dt = Mathf.Min(Time.unscaledDeltaTime, 0.1f);
            bool muuttui = false, kesken = false;
            foreach (var p in vaistot) p.Value.Nahty = false;
            vEhdokkaat.Clear();
            if (VaistoSaanto && kamera != null)
                foreach (var id in nyt)
                {
                    if (!kappaleet.TryGetValue(id, out var k) || k.Malli < 0 || float.IsInfinity(k.Etaisyys) || k.LeveysPx <= 0f) continue;
                    // Erikoismallin alla piilossa oleva ei väistä eikä väistätä (sillä on jo reunapiste).
                    if (alla.TryGetValue(id, out var ea) && ea.Piiloon) continue;
                    Vector3 r = kamera.WorldToScreenPoint(k.JalkaMaailma);
                    if (r.z <= 0f) continue;
                    if (!vaistot.TryGetValue(id, out var v)) vaistot[id] = v = new Vaisto();
                    vEhdokkaat.Add(new VEhdokas { Id = id, K = k, V = v, X = r.x, Y = r.y, L = SymbolienVaisto.Laatikko(r.x, r.y, k.LeveysPx, k.Suhde) });
                }
            vEhdokkaat.Sort(vJarjestys);
            var nimet = Nimikerros.Instanssi;
            int kaupunkeja = nimet != null ? Mathf.Min(nimet.KaupunkiLaatikoita, nimet.Laatikot.Count) : 0;
            float omaVara = SymbolienVaisto.OmaVaraPt * PalloKierto.Pistekerroin;
            vNaytetyt.Clear();
            for (int i = 0; i < vEhdokkaat.Count; i++)
            {
                var e = vEhdokkaat[i];
                var v = e.V;
                v.Nahty = true;
                bool vaistaa = false, reunalle = false;
                Kappale voittaja = null;
                string syy = null;
                // 1) Tärkeämmät näytetyt symbolit: jalka laatikossa → reunapiste, muuten päällekkäisyys → 2D-kuvamerkki.
                for (int j = 0; j < vNaytetyt.Count && !reunalle; j++)
                {
                    var w = vEhdokkaat[vNaytetyt[j]];
                    if (ErikoismallinAlla.Osuu(w.L, e.X, e.Y, v.Reunalle)) { vaistaa = reunalle = true; voittaja = w.K; syy = "symboli"; }
                    else if (!vaistaa && SymbolienVaisto.VaistaaSymbolia(e.L, w.L, v.Vaistaa)) { vaistaa = true; syy = "symboli"; }
                }
                // 2) Kaupunkien pisteet ja nimet (ei oma paikka).
                if (!vaistaa && kaupunkeja > 0)
                {
                    var ydin = SymbolienVaisto.Ydin(e.L, v.Vaistaa);
                    var lista = nimet.Laatikot;
                    for (int j = 0; j < kaupunkeja; j++)
                    {
                        var r = lista[j];
                        if (SymbolienVaisto.OsuuNimeen(ydin, new Ruutulaatikko(r.xMin, r.yMin, r.xMax, r.yMax), e.X, e.Y, omaVara))
                        { vaistaa = true; syy = "nimi"; break; }
                    }
                }
                if ((vaistaa != v.Vaistaa || reunalle != v.Reunalle) && SymbolienVaisto.SaaVaihtaa(nytS, v.Muutos))
                {
                    v.Vaistaa = vaistaa;
                    v.Reunalle = reunalle;
                    v.Muutos = nytS;
                    muuttui = true;
                }
                else if (v.Muutos < 0f) v.Muutos = nytS;
                if (v.Reunalle && voittaja != null) v.Voittaja = voittaja;
                if (v.Vaistaa && syy != null) v.Syy = syy;
                if (!v.Vaistaa) vNaytetyt.Add(i);
                v.Piilo = ErikoismallinAlla.Haivyta(v.Piilo, v.Vaistaa, dt);
                if (v.Piilo != (v.Vaistaa ? 1f : 0f)) kesken = true;
            }
            // Poissa näkyvistä (tai sääntö pois): takaisin näkyviksi ilman häivytystä, seuraava arvio pätee heti.
            foreach (var p in vaistot)
            {
                var v = p.Value;
                if (v.Nahty) continue;
                if (v.Vaistaa || v.Piilo > 0f) muuttui = true;
                v.Vaistaa = v.Reunalle = false;
                v.Piilo = 0f;
                v.Muutos = -1f;
                v.Voittaja = null;
            }
            vaistoAnimoi = kesken;
            // Natiivi-UI kysyy OnMallia ja ReunaPistettä merkkejä päivittäessään: näytettävät uudelleen, kun joku väistyy tai palaa.
            if (muuttui) { NostoKerros.Instanssi?.Herata(); PallonLepo.Muuttui("symbolimallit: väistö"); }
        }

        /// <summary>Reunapiste väistöstä (jalka tärkeämmän symbolin laatikossa): laatikon reunalla noston suunnassa.</summary>
        bool VaistonReunaPiste(string nostoId, out Vector2 ruutu)
        {
            ruutu = default;
            if (!VaistoSaanto || kamera == null || nostoId == null || !vaistot.TryGetValue(nostoId, out var v)) return false;
            if (!v.Vaistaa || !v.Reunalle || v.Voittaja == null || !v.Voittaja.R.enabled) return false;
            if (!kappaleet.TryGetValue(nostoId, out var k)) return false;
            Vector3 w = kamera.WorldToScreenPoint(v.Voittaja.JalkaMaailma), n = kamera.WorldToScreenPoint(k.JalkaMaailma);
            if (w.z <= 0f || n.z <= 0f) return false;
            var l = SymbolienVaisto.Laatikko(w.x, w.y, v.Voittaja.LeveysPx, v.Voittaja.Suhde);
            ErikoismallinAlla.ReunaPiste(l, w.x, w.y, n.x, n.y, out float x, out float y);
            ruutu = new Vector2(x, y);
            return true;
        }

        /// <summary>`symbolit tila`: kynnys, koot, ramppi ja väistyneet ("väistää: hahmotelma-x→nimi, kohde:y→symboli").</summary>
        void VaistoTila(System.Text.StringBuilder sb)
        {
            sb.Append($"; kynnys {Taso1KynnysKerroin:0.##}, symbolit {SymKynnysPt:0}–{SymKokoPt:0} pt ({(LogKoko ? "log" : "lineaarinen")}), " +
                      $"ramppi {PerspektiiviReuna:0.##}, iso {Iso:0.##}/{Iso23:0.##}, luonnollinen {(Luonnollinen ? 1 : 0)} " +
                      $"(paino {kallistusPainoNyt:0.00}, kasvu {LisaKasvu:0.##}, katto {kattoPtNyt:0} pt, fokus {fokusEtaisyys:0.###}); väistää:");
            int n = 0;
            foreach (var p in vaistot)
            {
                if (!p.Value.Vaistaa) continue;
                int k = p.Key.LastIndexOf(':');
                sb.Append(n++ == 0 ? " " : ", ").Append(k >= 0 ? p.Key.Substring(k + 1) : p.Key).Append('→')
                  .Append(p.Value.Reunalle ? "reuna" : p.Value.Syy ?? "?");
            }
            if (n == 0) sb.Append(" ei yhtään");
            if (!VaistoSaanto) sb.Append(" (sääntö pois, symbolit vaisto 0)");
        }
    }
}
