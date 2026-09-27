using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>KATEGORIAMALLI TÄHTI (kadonneet ihmeet), ks. KategoriaApurit.cs ja proto-3d/lokit/mallinseppa-rajapinta.md §5.</summary>
    public sealed partial class Symbolimallit
    {
        /// <summary>
        /// KADONNUT IHME: kompassiruusun tähti oikeana 3D-esineenä (paneelin kompassiruusu). Neljä pitkää pääsakaraa ja neljä
        /// lyhyempää väli-ilmansuuntaa taaempana ja ohuempana kuten kaiverretussa kompassiruusussa. Jokainen sakara on harjanne,
        /// jonka puolikkaat ovat vaalea ja tumma (edestä vastapäivään vaalea, takana päinvastoin), joten ruusun pyörre näkyy
        /// edestä ja takaa ja harjanne myös ylhäältä ja sivulta. Kyljellä on paksuutta, ja se ohenee kärkiin teräväksi.
        /// Keskeltä lähtee syvyyssakara katsojaa kohti ja taakse: edestä se on ruusun keskikärki, ylhäältä ja sivulta tähden
        /// kolmas akseli. Siksi suoraan ylhäältä näkyy nelisakarainen tähti (itä, länsi, etu ja taka), ja sivulta kallistettuna
        /// sama tähti pystyssä. Seisoo alakärjellään, ei jalustaa. Leveys 0,9, korkeus 0,9, syvyys 0,7.
        /// LOD1: samat sakarat ilman kylkipaksuutta.
        /// </summary>
        static void TahtiOsat(Rakentaja r, bool lod1)
        {
            var c = new Vector3(0f, ThPaa, 0f);
            // Väli-ilmansuunnat: ohuempi kerros, jonka harjanne jää pääsakaroiden kyljen taakse myös laaksoissa.
            ThKerros(r, c, Mathf.PI * 0.25f, ThVali, 0.07f, lod1 ? 0f : 0.012f, 0.032f, ThVaalea2, ThTumma2, ThKylki);
            ThKerros(r, c, 0f, ThPaa, 0.155f, lod1 ? 0f : 0.025f, 0.085f, ThVaalea, ThTumma, ThKylki);
            r.AloitaOsa();
            ThPiikki(r, c, 0.075f, -ThSyva);
            ThPiikki(r, c, 0.075f, ThSyva);
            r.LopetaOsa();
        }

        /// <summary>Pääsakaran pituus (tähden säde), väli-ilmansuunnan pituus ja syvyyssakaran pituus.</summary>
        const float ThPaa = 0.45f, ThVali = 0.3f, ThSyva = 0.35f;

        /// <summary>
        /// Tähtikerros tasossa z = c.z: neljä kärkeä säteellä rk kulmista a0 + k·π/2, laaksot säteellä rl niiden välissä,
        /// etu- ja takapinta harjanteina keskikärkiin syvyydellä ±d ja kylki, joka on laaksossa ±t ja ohenee kärkeen terävästi.
        /// Tahkot ovat yksi ääriviivaosa ja kylki sakaroittain omansa: kyljen etu- ja takareuna ovat osan syvyysrajoilla,
        /// joten ääriviiva kasvaa reunan molemmin puolin myös kallistettuna, ja kärki jää teräväksi (ei tylppää mustetta).
        /// </summary>
        static void ThKerros(Rakentaja r, Vector3 c, float a0, float rk, float rl, float t, float d, Color vaalea, Color tumma, Color kylki)
        {
            Vector3 P(float a, float rr, float z) => c + new Vector3(Mathf.Cos(a) * rr, Mathf.Sin(a) * rr, z);
            Vector3 etu = c + new Vector3(0f, 0f, -d), taka = c + new Vector3(0f, 0f, d);
            const float h = Mathf.PI * 0.25f;
            r.AloitaOsa();
            for (int k = 0; k < 4; k++)
            {
                float a = a0 + k * Mathf.PI * 0.5f;
                var karki = P(a, rk, 0f);
                Vector3 vE = P(a + h, rl, -t), vT = P(a + h, rl, t);   // vastapäivään
                Vector3 oE = P(a - h, rl, -t), oT = P(a - h, rl, t);   // myötäpäivään
                r.KolmioUlos(etu, karki, vE, Vector3.back, vaalea);
                r.KolmioUlos(etu, oE, karki, Vector3.back, tumma);
                r.KolmioUlos(taka, karki, vT, Vector3.forward, tumma);
                r.KolmioUlos(taka, oT, karki, Vector3.forward, vaalea);
            }
            r.LopetaOsa();
            if (t <= 0f) return;
            for (int k = 0; k < 4; k++)
            {
                float a = a0 + k * Mathf.PI * 0.5f;
                var karki = P(a, rk, 0f);
                r.AloitaOsa();
                r.KolmioKeskelta(karki, P(a + h, rl, -t), P(a + h, rl, t), c, kylki);
                r.KolmioKeskelta(karki, P(a - h, rl, -t), P(a - h, rl, t), c, kylki);
                r.LopetaOsa();
            }
        }

        /// <summary>Syvyyssakara: nelitahkoinen pyramidi, jonka pohja (vinoneliö, kärjet pääilmansuunnissa, puolikoko b) on
        /// tähden tasossa ja kärki syvyydellä z; tahkot vuorottelevat vaalea/tumma kuten sakaroiden puolikkaat.</summary>
        static void ThPiikki(Rakentaja r, Vector3 c, float b, float z, Color vaalea, Color tumma)
        {
            var karki = c + new Vector3(0f, 0f, z);
            Vector3[] p = { c + new Vector3(b, 0f, 0f), c + new Vector3(0f, b, 0f), c + new Vector3(-b, 0f, 0f), c + new Vector3(0f, -b, 0f) };
            for (int i = 0; i < 4; i++) r.KolmioKeskelta(p[i], p[(i + 1) % 4], karki, c, (i % 2 == 0) == (z < 0f) ? tumma : vaalea);
        }

        static void ThPiikki(Rakentaja r, Vector3 c, float b, float z) => ThPiikki(r, c, b, z, ThVaalea, ThTumma);

        static readonly Color ThVaalea = Ramppi(0xf4ecda), ThTumma = Ramppi(0xa98a5c), ThKylki = Ramppi(0xcbb48c);
        static readonly Color ThVaalea2 = Ramppi(0xe6d7b6), ThTumma2 = Ramppi(0x967550);

        static Mesh TahtiRunko() { var r = new Rakentaja(); TahtiOsat(r, false); return r.Verkko("kategoria-Tahti"); }
        static Mesh TahtiLod1() { var r = new Rakentaja(); TahtiOsat(r, true); return r.Verkko("kategoria-Tahti-lod1"); }

        /// <summary>Esikatselu (työkalut): LOD0 tai LOD1.</summary>
        public static Mesh KategoriaTahti3D(bool lod1 = false) => lod1 ? TahtiLod1() : TahtiRunko();

        static readonly bool tahtiMalli = RekisteroiKategoria(Kategoriasymboli.Tahti, new Erikoismalli { Runko = TahtiRunko, Lod1 = TahtiLod1, Lahi = TahtiLahi });

        // ---- LÄHITASO (omistaja 27.9.2026 klo 09.0x Fablen kautta; Natiivisepän rajapinta 1.0.29, Erikoismalli.Lahi) ----

        /// <summary>
        /// LÄHITASO: sama kompassiruusun tähti lähizoomiin (kartan kerroin ≥ 4, korvaa LOD0:n). Sama siluetti, mittasuhteet,
        /// värit ja sommitelma kuin LOD0:ssa (neljä pääsakaraa, neljä ohuempaa väli-ilmansuuntaa taaempana, vaalea ja tumma
        /// puolikas sakaraa kohden, syvyyssakarat eteen ja taakse), mutta 264 kolmiota (LOD0 56, noin 4,7 ×)
        /// lähikuvan yksityiskohtiin: harjanteet viistetty kapeaksi valojuovaksi, sakaroiden kylki pyöristetty kahdeksi
        /// tahkoksi, syvyyssakaroiden särmät viistetty, syvyyssakaran juurella pyöreä matala napa viisteineen (paneelin
        /// kompassiruusun keskiö; ilman ääriviivaa) ja tummissa etupuolikkaissa kaiverruksen tasavälinen viivoitus.
        /// Kaiverrustyyli ennallaan: seepiarampin värit (Ramppi) ja ääriviivaosat kuten LOD0:ssa (tahkot yhtenä osana,
        /// kylki sakaroittain). Apurit (TahtiLahi-alkuiset) ovat tässä tiedostossa.
        /// </summary>
        static void TahtiLahiOsat(Rakentaja r)
        {
            var c = new Vector3(0f, ThPaa, 0f);
            TahtiLahiKerros(r, c, Mathf.PI * 0.25f, ThVali, 0.07f, 0.012f, 0.032f, ThVaalea2, ThTumma2, ThKylki, 0.012f, 1);
            TahtiLahiKerros(r, c, 0f, ThPaa, 0.155f, 0.025f, 0.085f, ThVaalea, ThTumma, ThKylki, 0.02f, 3);
            r.AloitaOsa();
            foreach (float sz in new[] { -1f, 1f }) TahtiLahiPiikki(r, c, 0.075f, sz * ThSyva, 0.011f);
            r.LopetaOsa();
            // Navat osien ulkopuolella: jokainen pala on ääriviivan minimiä pienempi, joten napa ei saa ääriviivaa (se on
            // tähden sisäinen lista, ei siluetin osa; osana se kasvattaisi syvyyssakaran ääriviivaan korvakkeet ylhäältä).
            foreach (float sz in new[] { -1f, 1f }) TahtiLahiNapa(r, c, sz);
        }

        /// <summary>
        /// Lähitason tähtikerros (vrt. ThKerros): etu- ja takapinnan puolikkaat, harjanteen viiste (kapea kolmio keskeltä
        /// kärkeen, alkaa etäisyydeltä harja keskikärjestä laakson särmillä), keskikärjen ympärys (syvyyssakaran ja navan
        /// peitossa) ja kaiverrettu viivoitus tummissa etupuolikkaissa (viivat kpl, harjanteen suuntaisina). Kylki
        /// sakaroittain omana osanaan, pyöristettynä kahdeksi tahkoksi.
        /// </summary>
        static void TahtiLahiKerros(Rakentaja r, Vector3 c, float a0, float rk, float rl, float t, float d, Color vaalea, Color tumma, Color kylki,
            float harja, int viivat)
        {
            Vector3 P(float a, float rr, float z) => c + new Vector3(Mathf.Cos(a) * rr, Mathf.Sin(a) * rr, z);
            const float h = Mathf.PI * 0.25f;
            r.AloitaOsa();
            foreach (float sz in new[] { -1f, 1f })
            {
                var karki0 = c + new Vector3(0f, 0f, sz * d);
                var ulos = new Vector3(0f, 0f, sz);
                for (int k = 0; k < 4; k++)
                {
                    float a = a0 + k * Mathf.PI * 0.5f;
                    var karki = P(a, rk, 0f);
                    Vector3 vv = P(a + h, rl, sz * t), vo = P(a - h, rl, sz * t);   // laaksot vastapäivään ja myötäpäivään
                    Vector3 sv = karki0 + (vv - karki0).normalized * harja, so = karki0 + (vo - karki0).normalized * harja;
                    // Edessä vastapäivään vaalea, takana päinvastoin (kuten LOD0).
                    Color cv = sz < 0f ? vaalea : tumma, co = sz < 0f ? tumma : vaalea;
                    r.KolmioUlos(sv, karki, vv, ulos, cv);
                    r.KolmioUlos(so, vo, karki, ulos, co);
                    r.KolmioUlos(so, karki, sv, ulos, ThHarja);
                    r.KolmioUlos(karki0, so, sv, ulos, cv);
                    if (sz > 0f) continue;
                    // Viivoitus tummalla etupuolikkaalla (so, vo, kärki): tasavälein harjanteen suuntaiset viivat laakson
                    // särmältä ulkosärmälle (kuten kaiverretun kompassiruusun varjopuolella), päistä hieman lyhennettyinä.
                    var n = Vector3.Cross(vo - so, karki - so).normalized;
                    if (Vector3.Dot(n, ulos) < 0f) n = -n;
                    for (int v = 1; v <= viivat; v++)
                    {
                        float u = v / (viivat + 1f) * 0.8f;
                        Vector3 alku = Vector3.Lerp(so, vo, u), loppu = Vector3.Lerp(karki, vo, u);
                        TahtiLahiViiva(r, Vector3.Lerp(alku, loppu, 0.06f) + n * 0.0008f, Vector3.Lerp(alku, loppu, 0.9f) + n * 0.0008f, n, 0.0038f, ThMusteViiva);
                    }
                }
            }
            r.LopetaOsa();
            // Kylki: sakaroittain oma osa (kuten LOD0); laakson reuna kahtena tahkona, joiden väli pullistuu ulos (pyöristys).
            for (int k = 0; k < 4; k++)
            {
                float a = a0 + k * Mathf.PI * 0.5f;
                var karki = P(a, rk, 0f);
                r.AloitaOsa();
                foreach (float s in new[] { 1f, -1f })
                {
                    Vector3 ve = P(a + s * h, rl, -t), vt = P(a + s * h, rl, t), vk = P(a + s * h, rl, 0f);
                    var reuna = (vk - karki).normalized;
                    var ulosK = Vector3.Cross(reuna, Vector3.forward) * s;
                    if (Vector3.Dot(ulosK, vk - c) < 0f) ulosK = -ulosK;
                    var keski = vk + ulosK * (t * 0.3f);
                    r.KolmioKeskelta(karki, ve, keski, c, kylki);
                    r.KolmioKeskelta(karki, keski, vt, c, ThKylki2);
                }
                r.LopetaOsa();
            }
        }

        /// <summary>Lähitason syvyyssakara (vrt. ThPiikki): nelitahkoinen pyramidi, jonka särmät on viistetty kapeiksi
        /// kolmioiksi (viiste leveys pohjassa); tahkot vuorottelevat vaalea/tumma.</summary>
        static void TahtiLahiPiikki(Rakentaja r, Vector3 c, float b, float z, float viiste)
        {
            var karki = c + new Vector3(0f, 0f, z);
            Vector3[] p = { c + new Vector3(b, 0f, 0f), c + new Vector3(0f, b, 0f), c + new Vector3(-b, 0f, 0f), c + new Vector3(0f, -b, 0f) };
            for (int i = 0; i < 4; i++)
            {
                Vector3 a0 = p[i], a1 = p[(i + 1) % 4];
                var e = (a1 - a0).normalized * viiste;
                var vari = (i % 2 == 0) == (z < 0f) ? ThTumma : ThVaalea;
                r.KolmioKeskelta(a0 + e, a1 - e, karki, c, vari);
                // Särmän viiste pisteen a1 kohdalla (seuraavan tahkon puolelle).
                var e2 = (p[(i + 2) % 4] - a1).normalized * viiste;
                r.KolmioKeskelta(a1 - e, a1 + e2, karki, c, ThHarja);
            }
        }

        /// <summary>Syvyyssakaran juuren napa (paneelin kompassiruusun keskiö): matala 12-kulmainen pyöreä kumpu tähden
        /// keskikärjen edessä (sz = −1) tai takana: kylki nousee tähden pinnasta, viistetty reuna ja tasainen laki, josta
        /// syvyyssakara lähtee.</summary>
        static void TahtiLahiNapa(Rakentaja r, Vector3 c, float sz)
        {
            const int n = 12;
            const float r0 = 0.066f, r1 = 0.058f, z0 = 0.05f, z1 = 0.081f, z2 = 0.088f;
            Vector3 P(int i, float rr, float z) { float a = (i + 0.5f) * Mathf.PI * 2f / n; return c + new Vector3(Mathf.Cos(a) * rr, Mathf.Sin(a) * rr, sz * z); }
            var ulos = new Vector3(0f, 0f, sz);
            for (int i = 0; i < n; i++)
            {
                int q = (i + 1) % n;
                r.NelioKeskelta(P(i, r0, z0), P(q, r0, z0), P(q, r0, z1), P(i, r0, z1), c, ThKylki);
                r.NelioKeskelta(P(i, r0, z1), P(q, r0, z1), P(q, r1, z2), P(i, r1, z2), c, ThVaalea);
                r.KolmioUlos(c + new Vector3(0f, 0f, sz * z2), P(i, r1, z2), P(q, r1, z2), ulos, ThVaalea2);
            }
        }

        /// <summary>Ohut kaiverrusviiva pinnalla (normaali n) pisteestä a pisteeseen b: keskeltä leveä, päistä terävä (kaksi kolmiota).</summary>
        static void TahtiLahiViiva(Rakentaja r, Vector3 a, Vector3 b, Vector3 n, float leveys, Color vari)
        {
            var sv = Vector3.Cross(n, (b - a).normalized).normalized * (leveys * 0.5f);
            var m = (a + b) * 0.5f;
            r.KolmioUlos(a, m + sv, b, n, vari);
            r.KolmioUlos(a, b, m - sv, n, vari);
        }

        /// <summary>Kaiverrusviivan muste (hieman lämpimämpi kuin KsMuste, jotta viivoitus ei mustu tummalla puolikkaalla),
        /// harjanteen viiste (vaalean ja kyljen välissä) ja kyljen takatahko (kyljen ja tumman välissä).</summary>
        static readonly Color ThMusteViiva = Ramppi(0x5a4630), ThHarja = Ramppi(0xe6d8bf), ThKylki2 = Ramppi(0xc2a980);

        static Mesh TahtiLahi() { var r = new Rakentaja(); TahtiLahiOsat(r); return r.Verkko("kategoria-Tahti-lahi"); }

        /// <summary>Esikatselu (työkalut): lähitaso.</summary>
        public static Mesh KategoriaTahti3DLahi() => TahtiLahi();
    }
}
