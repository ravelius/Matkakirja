// CUPOLAN ENNAKKO (iPad 75ddd638–aec45305, 4.10.2026: kylmä ensiavaus jäi 4 s:n kattoon karkeana; lämpimät avaukset
// häivyttivät 2,0–2,4 s:ssa tarkkoina). Linssin kaukonäkymässä haetaan levylle laatat, jotka Cupola tarvitsee juuri nyt
// avautuessaan (AstronauttiLinssi.CupolanEnnakko):
//   - CupolanLaatat laskee Cesiumin tapaan maastolaatat (nelipuu: näkyvät tarkentuen, sisarukset, esivanhemmat) ja niiden
//     rasterit kyydin BMNG- ja S2-kerroksille (AstronauttiKerros.CupolanSarjat); kalibroitu iPad 8023e34c -hakulokiin, jossa
//     mustan aikana Cesium haki S2:n kaikki 169 juurta ja BMNG z2–z4 (esihaku kattoi aiemmin vain näkymän).
//   - Maasto (KarttaKerrokset.MaastonPolku) ja rasterit karkeat ensin, Laattapalvelin.Esilataa saapumisjonoon: palvellaan vain
//     näkyvän jonon ollessa tyhjä sen vapailla paikoilla (ehto 1: linssin avaus ja liike eivät hidastu; kohdejonon 4 paikkaa
//     antoivat vain ~45 laattaa/s). Sama kaikilla verkoilla (Raamattu #3938).
//   - Piirtämätön ennakkokamera (75ddd638) poistettu: se latautti kaukonäkymän reliefiä Cupolan alueelle (~950 laattaa,
//     10 Mt hakulokissa), jota Cupola ei käytä, ja varasi näkyvän jonon.
// Uusi haku, kun asento on siirtynyt ≥ 1°; jakson yläraja EsihakuKattoMt. Cupolaan tultaessa kesken jäänyt esihaku perutaan
// (Cesium hakee loput itse). Jakson kehysajat ja verkkotavut lokiin. A/B `ui linssi astro ennakko 0|1`.
using System.Collections.Generic;
using Matkakirja.Linssit.Iss;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class CupolaEnnakko : MonoBehaviour
    {
        /// <summary>A/B `ui linssi astro ennakko 0|1` (oletus päällä).</summary>
        public static bool Kaytossa = true;
        /// <summary>Uusi esihaku, kun Cupolan katsepiste on siirtynyt vähintään tämän (°; ISS ~1° / 15 s).</summary>
        public const double EsihakuSiirtymaAst = 1;
        /// <summary>Kaukonäkymäjakson verkkotavujen yläraja, jonka jälkeen uusia esihakuja ei aloiteta (Mt).</summary>
        public const int EsihakuKattoMt = 30;

        AstronauttiKerros kerros;
        float seuraava;
        readonly List<AstronauttiKerros.CupolanSarja> sarjat = new List<AstronauttiKerros.CupolanSarja>();
        Laattapalvelin.Esilataus esihaku;
        Matkakirja.Linssit.Kuvakulma? haettu;
        int esihakuja, esihakuLaattoja;
        float esihakuAlku;
        bool esihakuKirjattu;

        /// <summary>Viimeisin tila (tilakomento): "pois", "odottaa" tai asento ja esihaun eteneminen.</summary>
        public static string Tila { get; private set; } = "pois";
        /// <summary>Verkosta haetut tavut (Laattapalvelin.VerkostaTavuja) ennakkojakson alussa; −1 = ei jaksoa vielä.</summary>
        public static long AlkuTavut { get; private set; } = -1;

        public static CupolaEnnakko Luo(AstronauttiKerros kerros)
        {
            var e = kerros.gameObject.AddComponent<CupolaEnnakko>();
            e.kerros = kerros;
            return e;
        }

        // Jakso = kaukonäkymä, jossa ennakko olisi päällä (myös A/B 0: sama mittaus vertailuun). Kehysajat linssin liikkeen
        // hidastumisen mittaamiseen (Päätoimittajan ehto 1).
        bool jaksossa;
        float jaksoAlku, pisinMs;
        int kehyksia, hitaita;
        double summaMs;

        void Update()
        {
            if (jaksossa)
            {
                float ms = Time.unscaledDeltaTime * 1000f;
                kehyksia++; summaMs += ms; pisinMs = Mathf.Max(pisinMs, ms); if (ms > 50f) hitaita++;
            }
            if (Time.unscaledTime < seuraava) return;
            seuraava = Time.unscaledTime + 1f;
            var l = kerros != null ? kerros.Linssi : null;
            var a = default(Matkakirja.Linssit.Kuvakulma);
            bool kauko = l != null && l.CupolanEnnakko(out a);
            if (kauko && !jaksossa)
            {
                jaksossa = true; jaksoAlku = Time.unscaledTime; kehyksia = hitaita = 0; summaMs = 0; pisinMs = 0;
                AlkuTavut = Laattapalvelin.VerkostaTavuja; haettu = null; esihakuja = esihakuLaattoja = 0;
            }
            else if (!kauko && jaksossa) { jaksossa = false; Kirjaa(); }
            if (!Kaytossa || !kauko) { Peru(); Tila = Kaytossa ? "odottaa" : "pois"; return; }
            Esihae(a);
            if (esihaku != null && !esihakuKirjattu && esihaku.Yhteensa > 0 && esihaku.Valmis + esihaku.Epaonnistui >= esihaku.Yhteensa)
            {
                esihakuKirjattu = true;
                Debug.Log($"MATKAKIRJA linssit: cupolan esihaku {esihakuja} valmis {Time.unscaledTime - esihakuAlku:0.0} s: {esihaku.Valmis}/{esihaku.Yhteensa}, virheitä {esihaku.Epaonnistui}");
            }
            Tila = $"asento {a}, esihaku {(esihaku != null ? $"{esihaku.Valmis}/{esihaku.Yhteensa}" : "-")}";
        }

        void Esihae(in Matkakirja.Linssit.Kuvakulma a)
        {
            if (haettu is Matkakirja.Linssit.Kuvakulma h && Matkakirja.Linssit.Laattalista.Etaisyys(h.Lat, h.Lon, a.Lat, a.Lon) < EsihakuSiirtymaAst) return;
            if (Laattapalvelin.VerkostaTavuja - AlkuTavut > EsihakuKattoMt * 1048576L) return;
            kerros.CupolanSarjat(sarjat);
            if (sarjat.Count == 0) return;   // kuukauden tarkistus kesken: uusi yritys seuraavalla sekunnilla
            Peru();
            esihaku = new Laattapalvelin.Esilataus { Saapuminen = true };
            esihakuAlku = Time.unscaledTime; esihakuKirjattu = false;
            var maasto = CupolanLaatat.Maastolaatat(a, IssKuvakulma.IkkunanKentta, (double)Screen.width / Mathf.Max(1, Screen.height), Screen.height);
            // Karkeat ensin (mustan aikana Cesium pyytää ensin S2:n juuret ja BMNG:n z2–z4, iPad 8023e34c): avain = Web Mercator
            // -taso, maastolle L + 2 (rasteri seuraa maastolaattaa noin kaksi tasoa tarkempana).
            var kaikki = new List<(int z, string polku)>();
            var kk = KarttaKerrokset.Instanssi;
            int maastoN = 0;
            if (kk != null)
                foreach (var (ml, mx, my) in maasto)
                {
                    string p = kk.MaastonPolku(ml, mx, my);
                    if (p != null) { kaikki.Add((ml + 2, p)); maastoN++; }
                }
            var rivi = new System.Text.StringBuilder().Append(maastoN).Append(" maasto");
            foreach (var sa in sarjat)
            {
                int ennen = kaikki.Count;
                foreach (var t in CupolanLaatat.Rasterit(maasto, sa.ZMin, sa.ZMax, sa.Alue))
                {
                    var p = CupolanLaatat.Polut(sa.Malli, new[] { t }, Laattapalvelin.Ampari, sa.JuuriZ, sa.JuuriX, sa.JuuriY);
                    if (p.Count > 0) kaikki.Add((t.z, p[0]));
                }
                rivi.Append(", ").Append(kaikki.Count - ennen).Append(sa.JuuriZ > 0 ? " S2" : " BMNG");
            }
            kaikki.Sort((x, y) => x.z.CompareTo(y.z));
            int n = kaikki.Count;
            if (n > 0) Laattapalvelin.Esilataa(kaikki.ConvertAll(k => k.polku), esihaku);
            haettu = a;
            esihakuja++; esihakuLaattoja += n;
            Debug.Log($"MATKAKIRJA linssit: cupolan esihaku {esihakuja}: {n} laattaa ({rivi}) asennolle {a}");
        }

        void Kirjaa()
        {
            double mt = (Laattapalvelin.VerkostaTavuja - AlkuTavut) / 1048576.0;
            Debug.Log($"MATKAKIRJA linssit: cupolan ennakko {(Kaytossa ? "päällä" : "pois")}: jakso {Time.unscaledTime - jaksoAlku:0.0} s, " +
                $"kehyksiä {kehyksia}, keskim. {(kehyksia > 0 ? summaMs / kehyksia : 0):0.0} ms, pisin {pisinMs:0} ms, yli 50 ms {hitaita}, verkosta {mt:0.0} Mt, " +
                $"esihakuja {esihakuja} ({esihakuLaattoja} laattaa, viimeisin {(esihaku != null ? $"{esihaku.Valmis}/{esihaku.Yhteensa} valmiina" : "-")})");
        }

        void Peru()
        {
            esihaku?.Peru();
            esihaku = null;
        }

        void OnDisable() => Peru();
        void OnDestroy() => Peru();
    }
}
