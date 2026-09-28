using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// ERIKOISMALLI NIDAROSIN TUOMIOKIRKKO (Nidarosdomen, Trondheim; speksi docs/raportit/erikoismallit/nidaros.md, omistaja
    /// hyväksyi elämänidean "Pyhiinvaeltajat" 27.9.2026). Nosto kohde:nidaros, Norja, 63,4273 N 10,397 E, taso 1.
    /// Tunnistus sekunnissa: harmaa goottilainen länsijulkisivu (kaksi neliötornia kulmahuippuineen, pääty, suuri tumma
    /// ruusuikkuna teräväkaarisessa syvennyksessä, kolme patsasriviä ja kolme porttia), pitkä laiva vihrein katoin,
    /// keskitorni neljine kulmatorneineen ja hoikka vihreä suippotorni, poikkilaiva päätyineen, kuori ja itäpään oktogoni
    /// jyrkkine kattoineen vihreällä kirkkomaalla, jota kiertää vaalea polku (vaeltajien reitti).
    /// Mittakaava: 1,0 ≈ 112 m (NdS), pystyliioittelu 1,3 (NdKorotus; kallistettu kamera lyhentää korkeudet), joten suippotorni
    /// (87 m) on 1,01 ja mallin korkein kohta. Keskiportti (8 m) ja ruusuikkuna (9 m, ympyränä √1,3-kertaisena) on hieman
    /// liioiteltu, jotta vaeltajat mahtuvat porttiin ja ikkuna luetaan 40 pt:ssä. Kirkon koordinaatit (u, v, y) metreinä:
    /// u länsijulkisivusta itään kirkon akselia pitkin, v pohjoiseen, y ylös (mallissa y · NdSy).
    /// SUUNTA TYYLITELTY (kuten Brandenburgin portti): todellinen akseli kulkee lähes länsi–itä ja julkisivu katsoo länteen.
    /// Malli on käännetty 45° vastapäivään (ylhäältä), joten julkisivu katsoo lounaaseen eli vinosti kameraan vasemmalla
    /// edessä, oktogoni on oikealla takana, eteläkylki poikkilaivan ruusuikkunoineen oikealla edessä ja pohjoiskylki
    /// kapitulitaloineen vasemmalla takana (kamera näkee kirkon kuten lounaasta otetuissa kuvissa).
    /// Pohjan rajat (kirkkomaa) x −0,516…0,492 ja z −0,513…0,505, juuri jalanjäljen keskellä maassa. Pohjalevyä ei ole: kirkkomaa
    /// (nurmi, polku ja aukio) on maan pinta 0,006:n korkeudella (kuten Stonehengen maatason osat), ja sen reuna laskee maahan.
    /// Liikkuvat osat:
    ///   kirkkomaa        nurmi, polku, aukio ja Pyhän Olavin tie: paikallaan pysyvä osa ilman ääriviivaa (kuten
    ///                    Mont-Saint-Michelin hiekka ja Stonehengen valli), jotta kirkkomaa ei näytä pohjalevyltä eikä mitalilta
    ///   vaeltaja0–3      pyhiinvaeltajat (kaapu, hattu ja sauva), pivot NdVaeltajaPivot keskiportin edessä kiveyksellä
    ///   kynttila0–3      valvojaisten kynttilä (liekki ja lämmin valopiiri maassa), sama pivot ja asento kuin vaeltajalla
    ///   ruusu            valvojaisten ruusuikkuna (lämmin kiekko, pivot ikkunan keskellä, syttyy skaalalla)
    ///   valot            yöllä länsijulkisivu, ruusuikkuna ja keskiportti (pivot julkisivun juuressa)
    /// Reitin taulukot (NdKierrosU/V, NdSaapuU/V), tien nousu (NdTienKorkeus) ja muunnos (NdS, NdUc, NdSiirtoX/Z) ovat samat kuin
    /// liikeytimessä (Matkakirja.Linssit.Elava.NidarosLiike: KierrosU/V, SaapuU/V, Maa, S, Uc, SiirtoX/Z): muuta molempia
    /// yhdessä. Poistumiskaari keskiporttiin on vain liikeytimessä (PoistuCu/Cv, PorttiU/V).
    /// </summary>
    public sealed partial class Symbolimallit
    {
        // ---- Mittakaava ja kirkon koordinaatit ----

        /// <summary>Mallin yksikköä metriä kohden (1,0 ≈ 112 m).</summary>
        const float NdS = 1f / 112f;
        /// <summary>Kirkon keskikohta akselilla (m länsijulkisivusta): käännön keskipiste.</summary>
        const float NdUc = 51f;
        /// <summary>Jalanjäljen keskitys käännön jälkeen (m mallin X- ja Z-suunnassa).</summary>
        const float NdSiirtoX = 1.82f, NdSiirtoZ = 2.30f;
        const float NdC45 = 0.70710678f;
        /// <summary>Pystyliioittelu 1,3: kamera kallistuu 30–55°, joten korkeudet näkyvät lyhentyneinä; julkisivu, tornit ja
        /// suippotorni luetaan 40 pt:ssä vasta korotettuina (Pannonhalma ja Malbork 1,6). Korkeudet (m) kerrotaan tällä.</summary>
        const float NdKorotus = 1.3f;
        /// <summary>Pystymitta mallin yksiköissä metriä kohden (NdS · NdKorotus).</summary>
        const float NdSy = NdS * NdKorotus;
        /// <summary>Pyöreiden aukkojen (ruusuikkunat) säteen kerroin: ympyrä pysyy ympyränä ja kasvaa pinta-alan mukaan (√1,3).</summary>
        const float NdYmpyra = 1.14f;
        /// <summary>Kirkkomaan (kiveys, aukio ja nurmen sisäreuna) pinta mallin yksiköissä; nurmen ulkoreuna 0,0015.</summary>
        const float NdMaa = 0.006f, NdMaaReuna = 0.0015f;

        /// <summary>Kirkon koordinaatit (u, v, y metreinä) mallin avaruuteen: käännös 45° vastapäivään, mittakaava ja keskitys.</summary>
        static Vector3 NdP(float u, float v, float y) => new Vector3(
            ((u - NdUc) * NdC45 - v * NdC45 + NdSiirtoX) * NdS, y * NdSy, ((u - NdUc) * NdC45 + v * NdC45 + NdSiirtoZ) * NdS);

        /// <summary>Piste (u, v) mallin korkeudella ym (mallin yksiköissä).</summary>
        static Vector3 NdPm(float u, float v, float ym) { var p = NdP(u, v, 0f); p.y = ym; return p; }

        /// <summary>Kirkon koordinaattien vaakasuunta (du, dv) mallin avaruudessa (yksikkövektori, jos (du, dv) on).</summary>
        static Vector3 NdSuunta(float du, float dv) => new Vector3((du - dv) * NdC45, 0f, (du + dv) * NdC45);

        /// <summary>Kehän piste: keskipiste (uc, vc), säde (m), kulma asteina u-akselista v-akseliin päin, korkeus y (m).</summary>
        static Vector3 NdKehaP(float uc, float vc, float sade, float kulma, float y)
        {
            float a = kulma * Mathf.PI / 180f;
            return NdP(uc + Mathf.Cos(a) * sade, vc + Mathf.Sin(a) * sade, y);
        }

        // ---- Paletti (kärkivärit; Em-paletti vain metodeissa, koska staattisten kenttien alustusjärjestys tiedostojen välillä
        //      ei ole määrätty) ----

        /// <summary>Kleberkivi (vaalea harmaanvihreä), länsijulkisivu tummempana, patsaat ja huiput vaaleina, aukot musteena.</summary>
        static readonly Color NdKivi = Hex(0xb3b09c), NdKiviTumma = Hex(0xa3a08c), NdKiviVaalea = Hex(0xd8d1ba),
            NdAukko = Hex(0x4a4034), NdSyvennys = Hex(0x6d6555), NdLasi = Hex(0x3e362b), NdHuippu = Hex(0xc4bea8);
        /// <summary>Kuparinvihreät katot ja suippotorni (materiaaliväri kuten Pannonhalman kupolissa), sivulaivat tummempina.</summary>
        static readonly Color NdKupari = Hex(0x86a08a), NdKupariTumma = Hex(0x76907c), NdKupariVaalea = Hex(0xa2b6a2);
        /// <summary>Kirkkomaa: oliivinen nurmi (erottuu sinertävämmästä kuparikatosta), tummat puut ja vaalea kiveys.</summary>
        static readonly Color NdNurmi = Hex(0xa9ad79), NdPuu = Hex(0x5f6e45), NdPuuVaalea = Hex(0x6d7c50), NdKiveys = Hex(0xe4dac0), NdRunkoPuu = Hex(0x5a4a36),
            NdTie = Hex(0xdcd0b2);
        /// <summary>Vaeltajien kaavut (tumma seepia, muste, lämmin harmaa, ruskea), hatut ja liekki.</summary>
        static readonly Color[] NdKaavut = { Hex(0x54432f), Hex(0x3f3327), Hex(0x6b5843), Hex(0x5e4a35) };
        static readonly Color[] NdHatut = { Hex(0x3b2f22), Hex(0x8a6a44), Hex(0x3b2f22), Hex(0xd8ccae) };
        static readonly Color NdLiekki = Hex(0xfff2c4),
            NdRuusuValo = Hex(0xf4d898), NdRuusuKeski = Hex(0xfff0cc), NdRuusuKulta = Hex(0xf0c070);

        // ---- Mitat (m, kirkon koordinaatit) ----

        /// <summary>Länsijulkisivu: seinä (u 0–3,5) tornien välissä, tornit (u 0–10, |v| 9–19), seinän harja, tornien kaide.</summary>
        const float NdSeinaU = 3.5f, NdTorniU = 10f, NdTorni0 = 9f, NdTorni1 = 19f, NdSeinaH = 22f, NdTorniH = 34f;
        /// <summary>Länsipääty (laivan päätyseinä seinän harjan yllä): leveys ±7, harja 32,5, pinta u = 2,5.</summary>
        const float NdPaatyV = 7f, NdPaatyH = 32.5f, NdPaatyU = 2.5f;
        /// <summary>Ruusuikkuna: keskipiste korkeudella 15,5, säde 4,5 m (halkaisija 9 m, todellinen 8 m), syvennys.</summary>
        const float NdRuusuY = 15.5f, NdRuusuR = 4.5f, NdSyvV = 6f, NdSyvY0 = 8.8f, NdSyvY1 = 22.4f;
        /// <summary>Keskiportti (leveys 5,5, korkeus 8) ja sivuportit (v ±8,1, leveys 3, korkeus 5,5).</summary>
        const float NdPorttiW = 5.5f, NdPorttiH = 8f, NdSivuPorttiV = 8.1f, NdSivuPorttiW = 3f, NdSivuPorttiH = 5.5f;
        /// <summary>Laiva: sivulaivat u 10–46 (keskilaiva alkaa päädystä u 3,5), keskilaiva |v| ≤ 5,5 (räystäs 23, harja 32,5),
        /// sivulaivat |v| 5,5–12 (räystäs 11, katto 15).</summary>
        const float NdLaiva0 = 10f, NdLaiva1 = 46f, NdKeskiV = 5.5f, NdSivuV = 12f, NdRaystas = 23f, NdHarjaH = 32.5f, NdSivuH = 11f, NdSivuKatto = 15f;
        /// <summary>Poikkilaiva: u 46–62, |v| ≤ 24, räystäs 23 ja harja 32,5 (harja v-suunnassa).</summary>
        const float NdPoikki0 = 46f, NdPoikki1 = 62f, NdPoikkiV = 24f;
        /// <summary>Keskitorni: u 48–60, |v| ≤ 6, kaide 43; kulmatornit 36–45 ja huiput 52; suippotorni 43 → 87 (säde 4,8).</summary>
        const float NdTorniKu0 = 48f, NdTorniKu1 = 60f, NdTorniKv = 6f, NdTorniKH = 43f, NdSuippoH = 87f, NdSuippoR = 4.8f;
        /// <summary>Kuori: u 62–87, keskiosa |v| ≤ 5,5 (räystäs 22, harja 31), sivut |v| 5,5–11 (räystäs 11, katto 14,5).</summary>
        const float NdKuori0 = 62f, NdKuori1 = 87f, NdKuoriV = 11f, NdKuoriR = 22f, NdKuoriH = 31f, NdKuoriSivuH = 11f, NdKuoriSivuKatto = 14.5f;
        /// <summary>Oktogoni: keskipiste u 93, ympärisäde 9,2 (ulkohalkaisija 18 m), seinä 16, jyrkkä katto 33.</summary>
        const float NdOktU = 93f, NdOktR = 9.2f, NdOktH = 16f, NdOktKatto = 33f;

        // ---- Oriented primitives (kirkon koordinaateissa) ----

        /// <summary>Suorakulmainen kappale: u0–u1, v0–v1, y0–y1 (m); neljä seinää ja halutessa kansi.</summary>
        static void NdLaatikko(Rakentaja r, float u0, float u1, float v0, float v1, float y0, float y1, Color sivu, Color kansi, bool kannellinen = true)
        {
            Vector3 a0 = NdP(u0, v0, y0), b0 = NdP(u1, v0, y0), c0 = NdP(u1, v1, y0), d0 = NdP(u0, v1, y0);
            Vector3 a1 = NdP(u0, v0, y1), b1 = NdP(u1, v0, y1), c1 = NdP(u1, v1, y1), d1 = NdP(u0, v1, y1);
            var k = NdP((u0 + u1) * 0.5f, (v0 + v1) * 0.5f, (y0 + y1) * 0.5f);
            r.NelioKeskelta(a0, b0, b1, a1, k, sivu);
            r.NelioKeskelta(b0, c0, c1, b1, k, sivu);
            r.NelioKeskelta(c0, d0, d1, c1, k, sivu);
            r.NelioKeskelta(d0, a0, a1, d1, k, sivu);
            if (kannellinen) r.NelioKeskelta(a1, b1, c1, d1, k, kansi);
        }

        /// <summary>Harjakatto, harja u-suunnassa: räystäät v0 ja v1 korkeudella yR, harja keskellä korkeudella yH; päädyt
        /// valinnaisesti. 4–6 kolmiota.</summary>
        static void NdHarjaU(Rakentaja r, float u0, float u1, float v0, float v1, float yR, float yH, Color katto, Color paaty, bool paaty0, bool paaty1,
            bool lahi = false)
        {
            float vm = (v0 + v1) * 0.5f;
            Vector3 a = NdP(u0, v0, yR), b = NdP(u1, v0, yR), c = NdP(u1, v1, yR), d = NdP(u0, v1, yR);
            Vector3 h0 = NdP(u0, vm, yH), h1 = NdP(u1, vm, yH);
            var k = NdP((u0 + u1) * 0.5f, vm, yR + (yH - yR) * 0.3f);
            r.NelioKeskelta(a, b, h1, h0, k, katto);
            r.NelioKeskelta(d, c, h1, h0, k, katto);
            if (paaty0) r.KolmioKeskelta(a, d, h0, k, paaty);
            if (paaty1) r.KolmioKeskelta(b, c, h1, k, paaty);
            if (lahi) { NdLhLape(r, a, b, h1, h0, k); NdLhLape(r, d, c, h1, h0, k); }
        }

        /// <summary>Lähitason lappeen räystäskaista (alin 14 % vaaleampana kuparina) ja harjalista (ylin 5 % tummempana),
        /// hieman lappeen yläpuolella; samassa ääriviivaosassa kuin katto. 4 kolmiota.</summary>
        static void NdLhLape(Rakentaja r, Vector3 r0, Vector3 r1, Vector3 h1, Vector3 h0, Vector3 k)
        {
            var nrm = Vector3.Cross(r1 - r0, h0 - r0).normalized;
            if (Vector3.Dot(nrm, (r0 + h1) * 0.5f - k) < 0f) nrm = -nrm;
            var o = nrm * 0.0005f;
            Vector3 a = Vector3.Lerp(r0, h0, 0.14f), b = Vector3.Lerp(r1, h1, 0.14f), c = Vector3.Lerp(r1, h1, 0.95f), d = Vector3.Lerp(r0, h0, 0.95f);
            r.NelioUlos(r0 + o, r1 + o, b + o, a + o, nrm, NdKupariVaalea);
            r.NelioUlos(d + o, c + o, h1 + o, h0 + o, nrm, NdKupariTumma);
        }

        /// <summary>Harjakatto, harja v-suunnassa (poikkilaiva): räystäät u0 ja u1, harja keskellä. 4–6 kolmiota.</summary>
        static void NdHarjaV(Rakentaja r, float u0, float u1, float v0, float v1, float yR, float yH, Color katto, Color paaty, bool paaty0, bool paaty1,
            bool lahi = false)
        {
            float um = (u0 + u1) * 0.5f;
            Vector3 a = NdP(u0, v0, yR), b = NdP(u1, v0, yR), c = NdP(u1, v1, yR), d = NdP(u0, v1, yR);
            Vector3 h0 = NdP(um, v0, yH), h1 = NdP(um, v1, yH);
            var k = NdP(um, (v0 + v1) * 0.5f, yR + (yH - yR) * 0.3f);
            r.NelioKeskelta(a, d, h1, h0, k, katto);
            r.NelioKeskelta(b, c, h1, h0, k, katto);
            if (paaty0) r.KolmioKeskelta(a, b, h0, k, paaty);
            if (paaty1) r.KolmioKeskelta(d, c, h1, k, paaty);
            if (lahi) { NdLhLape(r, a, d, h1, h0, k); NdLhLape(r, b, c, h1, h0, k); }
        }

        /// <summary>Pulpettikatto u-suunnassa (sivulaiva): ulkoräystäs (vUlko, yUlko) nousee sisäreunaan (vSisa, ySisa). 2 kolmiota.</summary>
        static void NdPulpettiU(Rakentaja r, float u0, float u1, float vUlko, float yUlko, float vSisa, float ySisa, Color katto)
        {
            Vector3 a = NdP(u0, vUlko, yUlko), b = NdP(u1, vUlko, yUlko), c = NdP(u1, vSisa, ySisa), d = NdP(u0, vSisa, ySisa);
            var ulos = NdSuunta(0f, Mathf.Sign(vUlko - vSisa)) * (ySisa - yUlko) + Vector3.up * Mathf.Abs(vSisa - vUlko);
            r.NelioUlos(a, b, c, d, ulos, katto);
        }

        /// <summary>Pulpettikatto v-suunnassa (poikkilaivan itäkappeli): ulkoräystäs (uUlko, yUlko) nousee sisäreunaan (uSisa, ySisa).</summary>
        static void NdPulpettiV(Rakentaja r, float v0, float v1, float uUlko, float yUlko, float uSisa, float ySisa, Color katto)
        {
            Vector3 a = NdP(uUlko, v0, yUlko), b = NdP(uUlko, v1, yUlko), c = NdP(uSisa, v1, ySisa), d = NdP(uSisa, v0, ySisa);
            var ulos = NdSuunta(Mathf.Sign(uUlko - uSisa), 0f) * (ySisa - yUlko) + Vector3.up * Mathf.Abs(uSisa - uUlko);
            r.NelioUlos(a, b, c, d, ulos, katto);
        }

        /// <summary>Neliöpyramidi (huippu, tornin hattu): keskipiste (uc, vc), puolileveydet, y0 → y1. 4 kolmiota.</summary>
        static void NdPyramidi(Rakentaja r, float uc, float vc, float pu, float pv, float y0, float y1, Color vari)
        {
            Vector3 a = NdP(uc - pu, vc - pv, y0), b = NdP(uc + pu, vc - pv, y0), c = NdP(uc + pu, vc + pv, y0), d = NdP(uc - pu, vc + pv, y0);
            Vector3 t = NdP(uc, vc, y1), k = NdP(uc, vc, y0 + (y1 - y0) * 0.25f);
            r.KolmioKeskelta(a, b, t, k, vari); r.KolmioKeskelta(b, c, t, k, vari);
            r.KolmioKeskelta(c, d, t, k, vari); r.KolmioKeskelta(d, a, t, k, vari);
        }

        /// <summary>Monikulmainen särmiö ilman kansia: keskipiste, ympärisäde, y0 → y1, n tahkoa, ensimmäinen kärki kulmassa a0 (°).</summary>
        static void NdSarmio(Rakentaja r, float uc, float vc, float sade, float y0, float y1, int n, float a0, Color sivu)
        {
            var k = NdP(uc, vc, (y0 + y1) * 0.5f);
            for (int i = 0; i < n; i++)
            {
                float ka = a0 + i * 360f / n, kb = a0 + (i + 1) * 360f / n;
                r.NelioKeskelta(NdKehaP(uc, vc, sade, ka, y0), NdKehaP(uc, vc, sade, kb, y0), NdKehaP(uc, vc, sade, kb, y1),
                    NdKehaP(uc, vc, sade, ka, y1), k, sivu);
            }
        }

        /// <summary>Monikulmainen kartio (suippo, oktogonin katto): keskipiste, ympärisäde, y0 → kärki y1, n tahkoa, kulma a0 (°).</summary>
        static void NdKartio(Rakentaja r, float uc, float vc, float sade, float y0, float y1, int n, float a0, Color vari)
        {
            Vector3 t = NdP(uc, vc, y1), k = NdP(uc, vc, y0 + (y1 - y0) * 0.25f);
            for (int i = 0; i < n; i++)
                r.KolmioKeskelta(NdKehaP(uc, vc, sade, a0 + i * 360f / n, y0), NdKehaP(uc, vc, sade, a0 + (i + 1) * 360f / n, y0), t, k, vari);
        }

        /// <summary>Kaikki julkisivukuviot (aukot, rivit) pystypinnalla: pinnan piste (u, v, y keskellä), ulospäin osoittava
        /// suunta (nu, nv) kirkon koordinaateissa, leveys ja korkeus metreinä; 0,0015 pinnan edessä (Laatta).</summary>
        static void NdLaatta(Rakentaja r, float u, float v, float y, float nu, float nv, float lev, float kork, Color vari, float eteen = 0f)
        {
            var n = NdSuunta(nu, nv);
            r.Laatta(NdP(u, v, y) + n * eteen, n, lev * NdS, kork * NdSy, vari);
        }

        /// <summary>
        /// Teräväkaarinen aukko pystypinnalla: alareunan keskipiste (u, v, y0), ulospäin (nu, nv), leveys ja korkeus (m), väri ja
        /// etäisyys pinnasta (mallin yksiköissä). Suorakulmainen alaosa ja kaksi kaarta, jotka kohtaavat kärjessä. 6 kolmiota.
        /// </summary>
        static void NdSuippo(Rakentaja r, float u, float v, float y0, float nu, float nv, float lev, float kork, Color vari, float eteen = 0.0015f)
        {
            var n = NdSuunta(nu, nv);
            var t = Vector3.Cross(Vector3.up, n);
            var up = Vector3.up;
            var p0 = NdP(u, v, y0) + n * eteen;
            float w = lev * 0.5f * NdS, h = kork * NdSy, hs = Mathf.Max(0f, h - w * 1.35f * NdKorotus);
            Vector3 A = p0 - t * w, B = p0 + t * w, C = B + up * hs, D = A + up * hs, M = p0 + up * hs, T = p0 + up * h;
            // Leveä aukko kahtena puoliskona: yksittäinen kuvio saa ääriviivan, jos sen puoliväli on vähintään 0,035.
            if (lev > 9f) { r.NelioUlos(A, p0, M, D, n, vari); r.NelioUlos(p0, B, C, M, n, vari); }
            else r.NelioUlos(A, B, C, D, n, vari);
            float kh = (h - hs) * 0.58f;
            Vector3 L = p0 - t * (w * 0.72f) + up * (hs + kh), R = p0 + t * (w * 0.72f) + up * (hs + kh);
            r.KolmioUlos(M, D, L, n, vari); r.KolmioUlos(M, L, T, n, vari);
            r.KolmioUlos(M, T, R, n, vari); r.KolmioUlos(M, R, C, n, vari);
        }

        /// <summary>Kiekko pystypinnalla (ruusuikkuna): keskipiste pinnalla (u, v, y), ulospäin (nu, nv), säde (m), n lohkoa,
        /// etäisyys pinnasta (mallin yksiköissä).</summary>
        static void NdKiekko(Rakentaja r, float u, float v, float y, float nu, float nv, float sade, int n, Color vari, float eteen)
        {
            var nn = NdSuunta(nu, nv);
            var t = Vector3.Cross(Vector3.up, nn);
            var c = NdP(u, v, y) + nn * eteen;
            float s = sade * NdS * NdYmpyra;
            for (int i = 0; i < n; i++)
            {
                float a0 = i * Mathf.PI * 2f / n, a1 = (i + 1) * Mathf.PI * 2f / n;
                r.KolmioUlos(c, c + (t * Mathf.Cos(a0) + Vector3.up * Mathf.Sin(a0)) * s, c + (t * Mathf.Cos(a1) + Vector3.up * Mathf.Sin(a1)) * s, nn, vari);
            }
        }

        // ---- Länsijulkisivu ----

        /// <summary>Patsasrivien korkeudet (m): alaraja ja yläraja; ylemmät kaksi riviä katkeavat ruusuikkunan syvennyksen kohdalla.</summary>
        static readonly float[] NdRiviY0 = { 7.4f, 11.8f, 16.6f }, NdRiviY1 = { 10.9f, 15.6f, 20.6f };

        /// <summary>
        /// Länsijulkisivu: seinä ja tornit (u 0–10) sekä laivan päätykolmio seinän harjan yllä yhtenä ääriviivaosana; tornien
        /// matala kivihattu, neljä kulmahuippua (ulkoetukulma korkein) ja päädyn reunahuiput ääriviivaosan ulkopuolella (ohuet
        /// piikit). Pinnoilla (sisäviivat): kolme teräväkaarista porttia, ruusuikkunan syvennys ja ikkuna (vaalea kivikehä, tumma
        /// lasi), kolme patsasriviä tummina nauhoina, joissa on vaaleita patsaita, ja tornien suippoikkunat. Lähitasolla patsaat
        /// katoksineen, porttien kaarikehykset, ruusuikkunan kivipitsi ja karbunkelikivi, tornien vyölistat, päädyn Kristus-syvennys
        /// ja arkkienkeli Mikael.
        /// </summary>
        static void NdLansijulkisivu(Rakentaja r, bool lahi)
        {
            r.AloitaOsa();
            // Seinä tornien välissä (koko tornien syvyydeltä, joten laivan ja tornien väliin ei jää aukkoa) ja tornit.
            NdLaatikko(r, 0f, NdTorniU, -NdTorni0, NdTorni0, 0f, NdSeinaH, NdKiviTumma, NdKivi);
            foreach (float s in new[] { -1f, 1f })
            {
                float v0 = s < 0 ? -NdTorni1 : NdTorni0, v1 = s < 0 ? -NdTorni0 : NdTorni1;
                NdLaatikko(r, 0f, NdTorniU, v0, v1, 0f, NdTorniH, NdKiviTumma, NdKivi);
            }
            // Laivan länsipääty seinän harjan yllä (kolmioprisma).
            {
                Vector3 a = NdP(NdPaatyU, -NdPaatyV, NdSeinaH), b = NdP(NdPaatyU, NdPaatyV, NdSeinaH), t = NdP(NdPaatyU, 0f, NdPaatyH);
                Vector3 a2 = NdP(NdPaatyU + 2f, -NdPaatyV, NdSeinaH), b2 = NdP(NdPaatyU + 2f, NdPaatyV, NdSeinaH), t2 = NdP(NdPaatyU + 2f, 0f, NdPaatyH);
                var k = NdP(NdPaatyU + 1f, 0f, NdSeinaH + 3f);
                r.KolmioKeskelta(a, b, t, k, NdKiviTumma);
                r.NelioKeskelta(a, t, t2, a2, k, NdKivi);
                r.NelioKeskelta(b, t, t2, b2, k, NdKivi);
            }
            r.LopetaOsa();
            // Huiput ääriviivaosan ulkopuolella: ohuet piikit ryhmän reunalla saisivat ääriviivasta leveän tumman kiilan (pienet
            // osat, puoliväli alle 0,035, jäävät ilman ääriviivaa kuten puut). Tornien matala kivihattu ja neljä kulmahuippua
            // (ulkoetukulma korkein, kuten julkisivun kuvissa) sekä päädyn reunahuiput.
            foreach (float s in new[] { -1f, 1f })
            {
                float v0 = s < 0 ? -NdTorni1 : NdTorni0, v1 = s < 0 ? -NdTorni0 : NdTorni1, vm = (v0 + v1) * 0.5f;
                NdPyramidi(r, NdTorniU * 0.5f, vm, 3.6f, 3.6f, NdTorniH, NdTorniH + 2.6f, NdKivi);
                foreach (float cu in new[] { 0.9f, NdTorniU - 0.9f })
                    foreach (float cv in new[] { v0 + 0.9f, v1 - 0.9f })
                    {
                        bool ulko = cu < 1f && Mathf.Abs(cv) > NdTorni1 - 1f;
                        if (lahi) NdKartio(r, cu, cv, 1.1f, NdTorniH - 0.5f, NdTorniH + (ulko ? 8.5f : 6f), 8, 22.5f, NdHuippu);
                        else NdPyramidi(r, cu, cv, 0.9f, 0.9f, NdTorniH - 0.5f, NdTorniH + (ulko ? 8.5f : 6f), NdHuippu);
                    }
                if (lahi) NdKartio(r, NdPaatyU + 0.7f, s * (NdPaatyV + 0.4f), 0.85f, NdSeinaH - 0.5f, NdSeinaH + 7f, 8, 22.5f, NdHuippu);
                else NdPyramidi(r, NdPaatyU + 0.7f, s * (NdPaatyV + 0.4f), 0.7f, 0.7f, NdSeinaH - 0.5f, NdSeinaH + 7f, NdHuippu);
            }

            // Pinnat: länsipinta u = 0, ulospäin (−1, 0).
            const float nu = -1f, nv = 0f;
            // Patsasrivit: tumma nauha ja vaaleat patsaat; alin rivi katkeaa keskiportin kohdalla, ylemmät ruusuikkunan kohdalla.
            for (int k = 0; k < 3; k++)
            {
                float y0 = NdRiviY0[k], y1 = NdRiviY1[k], ym = (y0 + y1) * 0.5f, h = y1 - y0;
                float aukko = k == 0 ? 3.4f : NdSyvV + 0.5f;
                foreach (float s in new[] { -1f, 1f })
                {
                    float va = s * aukko, vb = s * (NdTorni1 - 0.6f);
                    // Nauha enintään 8 m:n paloina (alle ääriviivan rajan 0,035).
                    int palat = Mathf.Max(1, (int)Math.Ceiling(Mathf.Abs(vb - va) / 8f));
                    for (int j = 0; j < palat; j++)
                    {
                        float pa = Mathf.Lerp(va, vb, j / (float)palat), pb = Mathf.Lerp(va, vb, (j + 1) / (float)palat);
                        NdLaatta(r, 0f, (pa + pb) * 0.5f, ym, nu, nv, Mathf.Abs(pb - pa), h, NdSyvennys);
                    }
                    int n = lahi ? 0 : (k == 0 ? 5 : 4);
                    for (int i = 0; i < n; i++)
                    {
                        float v = Mathf.Lerp(va, vb, (i + 0.5f) / n);
                        NdLaatta(r, 0f, v, ym - h * 0.06f, nu, nv, 0.95f, h * 0.72f, NdKiviVaalea, 0.001f);
                    }
                }
            }
            if (lahi) NdLhPatsaat(r);
            // Ruusuikkunan syvennys (teräväkaari) ja ikkuna: vaalea kivikehä ja tumma lasi.
            NdSuippo(r, 0f, 0f, NdSyvY0, nu, nv, NdSyvV * 2f, NdSyvY1 - NdSyvY0, NdSyvennys);
            NdKiekko(r, 0f, 0f, NdRuusuY, nu, nv, NdRuusuR, lahi ? 16 : 12, NdKiviVaalea, 0.0022f);
            NdKiekko(r, 0f, 0f, NdRuusuY, nu, nv, NdRuusuR * 0.8f, lahi ? 16 : 12, NdLasi, 0.0029f);
            if (lahi) NdLhRuusu(r);
            // Portit.
            NdSuippo(r, 0f, 0f, 0f, nu, nv, NdPorttiW, NdPorttiH, NdAukko);
            foreach (float s in new[] { -1f, 1f })
                NdSuippo(r, 0f, s * NdSivuPorttiV, 0f, nu, nv, NdSivuPorttiW, NdSivuPorttiH, NdAukko);
            // Tornien suippoikkunat seinän harjan yläpuolella: länsipinnalla ja ulkosivuilla.
            foreach (float s in new[] { -1f, 1f })
            {
                float vm = s * (NdTorni0 + NdTorni1) * 0.5f;
                NdSuippo(r, 0f, vm, NdSeinaH + 2.5f, nu, nv, 1.9f, 7.5f, NdAukko);
                NdSuippo(r, NdTorniU * 0.5f, s * NdTorni1, NdSeinaH + 2.5f, 0f, s, 1.9f, 7.5f, NdAukko);
            }
            if (lahi) NdLhTornit(r);
        }

        // ---- Laiva, poikkilaiva, keskitorni, kuori, oktogoni ja kapitulitalo ----

        /// <summary>Tukipilarien huippujen paikat laivan ja kuoren kyljillä (u, m).</summary>
        static readonly float[] NdLaivaHuiput = { 15f, 22f, 29f, 36f, 43f }, NdKuoriHuiput = { 68f, 75f, 82f };

        /// <summary>
        /// Laiva sivulaivoineen yhtenä ääriviivaosana: keskilaiva (seinät räystääseen) ja jyrkkä kuparikatto, sivulaivojen
        /// seinät ja pulpettikatot. Tukipilarien huiput sivulaivojen räystäällä ääriviivaosan ulkopuolella (ohuet piikit).
        /// Eteläkyljen kattoikkunarivi (sisäviivat); lähitasolla myös pohjoiskylki, sivulaivojen ikkunat, lentotuet ja
        /// katon räystäskaistat ja harjalista.
        /// </summary>
        static void NdLaiva(Rakentaja r, bool lahi)
        {
            r.AloitaOsa();
            NdLaatikko(r, NdSeinaU, NdLaiva1, -NdKeskiV, NdKeskiV, 0f, NdRaystas, NdKivi, NdKivi, false);
            NdHarjaU(r, NdPaatyU + 1f, NdPoikki0 + 1f, -NdKeskiV, NdKeskiV, NdRaystas, NdHarjaH, NdKupari, NdKivi, false, false, lahi);
            foreach (float s in new[] { -1f, 1f })
            {
                float vU = s * NdSivuV, vS = s * NdKeskiV;
                NdLaatikko(r, NdLaiva0, NdLaiva1, Mathf.Min(vU, vS), Mathf.Max(vU, vS), 0f, NdSivuH, NdKivi, NdKivi, false);
                NdPulpettiU(r, NdLaiva0, NdLaiva1, vU, NdSivuH, vS, NdSivuKatto, NdKupariTumma);
            }
            r.LopetaOsa();
            foreach (float s in new[] { -1f, 1f })
                foreach (float u in NdLaivaHuiput)
                    NdPyramidi(r, u, s * (NdSivuV + 0.3f), 0.8f, 0.8f, NdSivuH - 1f, NdSivuH + 6f, NdHuippu);
            // Kattoikkunat (clerestory) ja sivulaivojen ikkunat eteläkyljessä; lähitasolla myös pohjoiskyljessä.
            foreach (float s in lahi ? new[] { -1f, 1f } : new[] { -1f })
                for (int i = 0; i < 5; i++)
                {
                    float u = NdLaiva0 + 3f + i * 6.8f;
                    NdSuippo(r, u, s * NdKeskiV, NdSivuKatto + 1.2f, 0f, s, 2.2f, 6f, NdAukko);
                    if (lahi) NdSuippo(r, u, s * NdSivuV, 3f, 0f, s, 1.8f, 5.5f, NdAukko);
                }
            if (lahi) NdLhLentotuet(r, NdLaivaHuiput, NdSivuV, NdSivuH, NdKeskiV, NdRaystas);
        }

        /// <summary>
        /// Poikkilaiva yhtenä ääriviivaosana: seinät, v-suuntainen kuparikatto ja kivipäädyt sekä itäkappelit pulpettikattoineen;
        /// päätyjen kulmatornit huippuineen ääriviivaosan ulkopuolella. Eteläpäädyssä (kameraan päin) pieni ruusuikkuna,
        /// ikkunarivi ja portti; lähitasolla myös pohjoispääty, ruusuikkunoiden pitsi ja katon kaistat.
        /// </summary>
        static void NdPoikkilaiva(Rakentaja r, bool lahi)
        {
            r.AloitaOsa();
            NdLaatikko(r, NdPoikki0, NdPoikki1, -NdPoikkiV, NdPoikkiV, 0f, NdRaystas, NdKivi, NdKivi, false);
            NdHarjaV(r, NdPoikki0, NdPoikki1, -NdPoikkiV, NdPoikkiV, NdRaystas, NdHarjaH, NdKupari, NdKivi, true, true, lahi);
            foreach (float s in new[] { -1f, 1f })
            {
                // Itäkappeli pulpettikatolla poikkilaivan itäseinää vasten.
                float v0 = s < 0 ? -21f : 12f, v1 = s < 0 ? -12f : 21f;
                NdLaatikko(r, NdPoikki1, NdPoikki1 + 5f, v0, v1, 0f, 12f, NdKivi, NdKivi, false);
                NdPulpettiV(r, v0, v1, NdPoikki1 + 5f, 12f, NdPoikki1, 15.5f, NdKupariTumma);
            }
            r.LopetaOsa();
            // Päätyjen kulmatornit huippuineen ääriviivaosan ulkopuolella (ohuet piikit).
            foreach (float s in new[] { -1f, 1f })
                foreach (float u in new[] { NdPoikki0, NdPoikki1 })
                {
                    float vv = s * NdPoikkiV;
                    NdLaatikko(r, u - 1.1f, u + 1.1f, vv - 1.1f, vv + 1.1f, NdRaystas - 5f, NdRaystas + 6f, NdKivi, NdKivi, false);
                    NdPyramidi(r, u, vv, 1.1f, 1.1f, NdRaystas + 6f, NdRaystas + 12f, NdHuippu);
                }
            // Eteläpääty (v = −24, ulospäin (0, −1)): portti, ikkunarivi ja ruusuikkuna; lähitasolla myös pohjoispääty.
            float um = (NdPoikki0 + NdPoikki1) * 0.5f;
            foreach (float s in lahi ? new[] { -1f, 1f } : new[] { -1f })
            {
                float vv = s * NdPoikkiV;
                NdSuippo(r, um, vv, 0f, 0f, s, 3.4f, 6.8f, NdAukko);
                for (int i = -1; i <= 1; i++) NdSuippo(r, um + i * 3.2f, vv, 9f, 0f, s, 1.7f, 5f, NdAukko);
                NdKiekko(r, um, vv, 19.2f, 0f, s, 2.9f, lahi ? 12 : 8, NdKiviVaalea, 0.0022f);
                NdKiekko(r, um, vv, 19.2f, 0f, s, 2.3f, lahi ? 12 : 8, NdLasi, 0.0029f);
                if (lahi) NdLhPikkuruusu(r, um, vv, 19.2f, 0f, s, 2.3f);
            }
        }

        /// <summary>
        /// Keskitorni yhtenä ääriviivaosana: neliörunko poikkilaivan risteyksessä ja hoikka kahdeksankulmainen kuparinvihreä
        /// suippotorni (mallin korkein kohta); neljä kulmatornia huippuineen ääriviivaosan ulkopuolella. Kaikuaukot tummina
        /// (sisäviivat); lähitasolla kulmatornit kahdeksankulmaisina ja suippotornin juurella neljä päätyikkunaa.
        /// </summary>
        static void NdKeskitorni(Rakentaja r, bool lahi)
        {
            r.AloitaOsa();
            NdLaatikko(r, NdTorniKu0, NdTorniKu1, -NdTorniKv, NdTorniKv, NdRaystas - 2f, NdTorniKH, NdKivi, NdKiviTumma);
            float uc = (NdTorniKu0 + NdTorniKu1) * 0.5f;
            // Suippotorni: kahdeksankulmainen, tahkot kirkon akselien suuntaan; kärki ryhmän keskellä, joten ääriviiva ohenee
            // kärkeä kohti.
            NdKartio(r, uc, 0f, NdSuippoR, NdTorniKH, NdSuippoH, 8, 22.5f, NdKupari);
            if (lahi) NdLhSuipponJuuri(r, uc);
            r.LopetaOsa();
            // Neljä kulmatornia huippuineen ääriviivaosan ulkopuolella (ohuet piikit ryhmän kulmissa).
            foreach (float cu in new[] { NdTorniKu0, NdTorniKu1 })
                foreach (float cv in new[] { -NdTorniKv, NdTorniKv })
                {
                    if (lahi) NdSarmio(r, cu, cv, 1.5f, 36f, 45.5f, 8, 22.5f, NdKivi);
                    else NdLaatikko(r, cu - 1.2f, cu + 1.2f, cv - 1.2f, cv + 1.2f, 36f, 45.5f, NdKivi, NdKivi, false);
                    NdKartio(r, cu, cv, lahi ? 1.6f : 1.7f, 45.5f, 52.5f, lahi ? 8 : 4, lahi ? 22.5f : 45f, NdHuippu);
                }
            // Kaikuaukot jokaisella pinnalla (kaksi suippoaukkoa).
            foreach (var (nu, nv) in new[] { (-1f, 0f), (1f, 0f), (0f, -1f), (0f, 1f) })
            {
                float pu = nu != 0f ? (nu < 0 ? NdTorniKu0 : NdTorniKu1) : uc, pv = nv != 0f ? nv * NdTorniKv : 0f;
                foreach (float d in new[] { -2.1f, 2.1f })
                {
                    float du = nv != 0f ? d : 0f, dv = nu != 0f ? d : 0f;
                    NdSuippo(r, pu + du, pv + dv, 30.5f, nu, nv, 2.4f, 9f, NdAukko);
                }
            }
        }

        /// <summary>Kuori sivulaivoineen yhtenä ääriviivaosana (kuten laiva, matalampi); tukipilarien huiput ääriviivaosan
        /// ulkopuolella ja eteläkyljen ikkunat (lähitasolla myös pohjoiskylki, lentotuet ja katon kaistat).</summary>
        static void NdKuori(Rakentaja r, bool lahi)
        {
            r.AloitaOsa();
            NdLaatikko(r, NdKuori0, NdKuori1, -NdKeskiV, NdKeskiV, 0f, NdKuoriR, NdKivi, NdKivi, false);
            NdHarjaU(r, NdPoikki1 - 1f, NdKuori1 + 1.5f, -NdKeskiV, NdKeskiV, NdKuoriR, NdKuoriH, NdKupari, NdKivi, false, false, lahi);
            foreach (float s in new[] { -1f, 1f })
            {
                float vU = s * NdKuoriV, vS = s * NdKeskiV;
                NdLaatikko(r, NdKuori0, NdKuori1, Mathf.Min(vU, vS), Mathf.Max(vU, vS), 0f, NdKuoriSivuH, NdKivi, NdKivi, false);
                NdPulpettiU(r, NdKuori0, NdKuori1, vU, NdKuoriSivuH, vS, NdKuoriSivuKatto, NdKupariTumma);
            }
            r.LopetaOsa();
            foreach (float s in new[] { -1f, 1f })
                foreach (float u in NdKuoriHuiput)
                    NdPyramidi(r, u, s * (NdKuoriV + 0.3f), 0.8f, 0.8f, NdKuoriSivuH - 1f, NdKuoriSivuH + 5.5f, NdHuippu);
            foreach (float s in lahi ? new[] { -1f, 1f } : new[] { -1f })
                for (int i = 0; i < 3; i++)
                {
                    float u = NdKuori0 + 4.2f + i * 7f;
                    NdSuippo(r, u, s * NdKeskiV, NdKuoriSivuKatto + 1f, 0f, s, 2.2f, 5.5f, NdAukko);
                    if (lahi) NdSuippo(r, u, s * NdKuoriV, 3f, 0f, s, 1.8f, 5f, NdAukko);
                }
            if (lahi) NdLhLentotuet(r, NdKuoriHuiput, NdKuoriV, NdKuoriSivuH, NdKeskiV, NdKuoriR);
        }

        /// <summary>
        /// Oktogoni (itäpää, Olavin haudan paikka) yhtenä ääriviivaosana: kahdeksankulmainen runko (tahko itään) ja jyrkkä
        /// tummempi kuparikatto; eteläkyljen porrastorni vihreine huippuineen ääriviivaosan ulkopuolella (ohut). Ikkunat
        /// kameran puoleisilla tahkoilla (lähitasolla kaikilla).
        /// </summary>
        static void NdOktogoni(Rakentaja r, bool lahi)
        {
            r.AloitaOsa();
            NdSarmio(r, NdOktU, 0f, NdOktR, 0f, NdOktH, 8, 22.5f, NdKivi);
            NdKartio(r, NdOktU, 0f, NdOktR + 0.4f, NdOktH, NdOktKatto, 8, 22.5f, NdKupariTumma);
            r.LopetaOsa();
            // Porrastorni oktogonin ja kuoren kulmassa etelässä (ohut, ääriviivaosan ulkopuolella).
            NdSarmio(r, NdKuori1 - 0.5f, -NdKuoriV + 0.2f, 1.7f, 0f, 25f, 6, 0f, NdKivi);
            NdKartio(r, NdKuori1 - 0.5f, -NdKuoriV + 0.2f, 1.9f, 25f, 32.5f, 6, 0f, NdKupari);
            // Ikkunat: tahkojen keskellä (tahkojen normaalit 0°, ±45°, …), kameran puoleiset (etelä ja itä) rungossa.
            float apo = NdOktR * Mathf.Cos(Mathf.PI / 8f);
            foreach (float aste in lahi ? new[] { 0f, 45f, 90f, 135f, 225f, 270f, 315f } : new[] { 0f, 270f, 315f })
            {
                float a = aste * Mathf.PI / 180f;
                float nu = Mathf.Cos(a), nv = Mathf.Sin(a);
                NdSuippo(r, NdOktU + nu * apo, nv * apo, 5f, nu, nv, 2.2f, 7.5f, NdAukko);
            }
        }

        /// <summary>Kapitulitalo kuoren pohjoispuolella (u 68–81, v 11–18,5): seinät, harjakatto ja itäpään apsis kartiokatoin.</summary>
        static void NdKapitulitalo(Rakentaja r, bool lahi)
        {
            const float u0 = 68f, u1 = 81f, v0 = NdKuoriV, v1 = 18.5f, h = 10f;
            r.AloitaOsa();
            NdLaatikko(r, u0, u1, v0, v1, 0f, h, NdKivi, NdKivi, false);
            NdHarjaU(r, u0, u1, v0, v1, h, h + 5.5f, NdKupariTumma, NdKivi, true, false);
            float vm = (v0 + v1) * 0.5f, ra = (v1 - v0) * 0.5f;
            NdSarmio(r, u1, vm, ra, 0f, h, 6, 0f, NdKivi);
            NdKartio(r, u1, vm, ra + 0.3f, h, h + 5f, 6, 0f, NdKupari);
            r.LopetaOsa();
            if (lahi)
                foreach (float u in new[] { 71f, 75f, 79f })
                    NdSuippo(r, u, v1, 3f, 0f, 1f, 1.4f, 4.5f, NdAukko);
        }

        // ---- Kirkkomaa: reitti, kiveys, nurmi ja puut ----

        /// <summary>
        /// Vaeltajien kierros (u, v m) kirkon ympäri myötäpäivään ylhäältä ("medsols": länsipäässä pohjoiseen). Suljettu
        /// Catmull-Rom-käyrä näiden pisteiden kautta; ensimmäinen piste (−6, −4) on keskiportin edessä, jossa ryhmä pysähtyy ja
        /// josta kierrokset alkavat. Sama taulukko kuin NidarosLiike.KierrosU/V.
        /// </summary>
        static readonly float[] NdKierrosU = { -6f, -6f, -4.5f, 1f, 10f, 20f, 32f, 42f, 51f, 59f, 67f, 76f, 86f, 96f, 104f, 106f, 102f, 92f, 80f, 71f,
            62.5f, 51f, 42f, 32f, 20f, 10f, 1f, -4.5f };
        static readonly float[] NdKierrosV = { -4f, 8f, 20.5f, 25.5f, 25.5f, 26f, 26.5f, 28.5f, 30f, 29.5f, 26.5f, 24f, 23.5f, 17f, 8f, -2f, -11.5f, -16.5f, -18f,
            -25.5f, -29.5f, -30.5f, -28.5f, -26.5f, -26f, -25.5f, -25.5f, -20.5f };
        /// <summary>
        /// Saapuminen (u, v m), avoin Catmull-Rom (päiden haamupisteet mukana): Pyhän Olavin tie tulee kirkkomaan etureunasta
        /// (piste 1) polulle eteläkyljessä, ja ryhmä kulkee polkua länteen aukiolle ja pysähdyspaikalle (piste 7 = kierroksen
        /// alku). Sama kuin NidarosLiike.SaapuU/V.
        /// </summary>
        static readonly float[] NdSaapuU = { 30f, 30f, 27.5f, 20f, 10f, 1f, -4.5f, -6f, -6f }, NdSaapuV = { -46f, -38f, -29.5f, -26f, -25.5f, -25.5f, -20.5f, -4f, 8f };

        /// <summary>Catmull-Rom (tasainen) pisteiden i … i + 1 välillä, t 0–1; suljettu tai avoin (reunoilla toistetaan pää).</summary>
        static Vector2 NdCatmull(float[] U, float[] V, int i, float t, bool suljettu)
        {
            int n = U.Length;
            int Ix(int j) => suljettu ? ((j % n) + n) % n : Mathf.Max(0, Mathf.Min(n - 1, j));
            int i0 = Ix(i - 1), i1 = Ix(i), i2 = Ix(i + 1), i3 = Ix(i + 2);
            float t2 = t * t, t3 = t2 * t;
            float C(float p0, float p1, float p2, float p3) =>
                0.5f * (2f * p1 + (-p0 + p2) * t + (2f * p0 - 5f * p1 + 4f * p2 - p3) * t2 + (-p0 + 3f * p1 - 3f * p2 + p3) * t3);
            return new Vector2(C(U[i0], U[i1], U[i2], U[i3]), C(V[i0], V[i1], V[i2], V[i3]));
        }

        /// <summary>Kierroksen näytteet (u, v m), 12 kutakin ohjauspistettä kohden.</summary>
        static Vector2[] NdKierrosNaytteet()
        {
            int n = NdKierrosU.Length;
            var p = new Vector2[n * 12];
            for (int i = 0; i < n; i++)
                for (int k = 0; k < 12; k++) p[i * 12 + k] = NdCatmull(NdKierrosU, NdKierrosV, i, k / 12f, true);
            return p;
        }

        /// <summary>Kauimmainen leikkaus säteestä (keskipiste (NdUc, 0), suunta kulma rad) suljetun murtoviivan kanssa (m).</summary>
        static float NdSade(Vector2[] p, float kulma)
        {
            float dx = Mathf.Cos(kulma), dy = Mathf.Sin(kulma), best = 0f;
            for (int i = 0; i < p.Length; i++)
            {
                var a = p[i]; var b = p[(i + 1) % p.Length];
                float ex = b.x - a.x, ey = b.y - a.y, den = dx * ey - dy * ex;
                if (Mathf.Abs(den) < 1e-9f) continue;
                float ax = a.x - NdUc, ay = a.y;
                float t = (ax * ey - ay * ex) / den, s = (ax * dy - ay * dx) / den;
                if (t > 0f && s >= 0f && s <= 1f && t > best) best = t;
            }
            return best;
        }

        /// <summary>Aukion pyöristetty suorakulmio (u −15…4, v −17…17, kulmien säde 8 m) murtoviivana.</summary>
        static Vector2[] NdAukio()
        {
            const float u0 = -15f, u1 = 4f, v0 = -17f, v1 = 17f, rr = 8f;
            var p = new Vector2[28];
            int k = 0;
            foreach (var (cu, cv, a0) in new[] { (u1 - rr, v1 - rr, 0f), (u0 + rr, v1 - rr, 90f), (u0 + rr, v0 + rr, 180f), (u1 - rr, v0 + rr, 270f) })
                for (int j = 0; j <= 6; j++)
                {
                    float a = (a0 + 90f * j / 6f) * Mathf.PI / 180f;
                    p[k++] = new Vector2(cu + rr * Mathf.Cos(a), cv + rr * Mathf.Sin(a));
                }
            return p;
        }

        /// <summary>Kirkkomaan napakulmien määrä (polun ja nurmen reunat samoilla kulmilla keskipisteestä (NdUc, 0)).</summary>
        const int NdKulmia = 40;
        /// <summary>Vaeltajien polun puolileveys (m): polku kulkee kierroksen molemmin puolin.</summary>
        const float NdPolku = 1.9f;
        /// <summary>Pyhän Olavin tien alku (ohjauspiste 1) napakoordinaatteina: kulma (rad) ja etäisyys (m).</summary>
        static float NdTienKulma => (float)Math.Atan2(NdSaapuV[1], NdSaapuU[1] - NdUc);
        static float NdTienSade => Mathf.Sqrt((NdSaapuU[1] - NdUc) * (NdSaapuU[1] - NdUc) + NdSaapuV[1] * NdSaapuV[1]);

        /// <summary>
        /// Kirkkomaan säteet kulmittain (m): polun sisäreuna, polun ulkoreuna (aukion kohdalla aukion reuna) ja nurmen reuna.
        /// Aukion kulmilla (±20° lännestä) koko ala on kiveystä ja nurmea on vain 0,4 m:n reunus; muualla nurmea on polun
        /// ulkopuolella 8–10 m (takana leveämmin puille), ja Pyhän Olavin tien alussa nurmen reuna osuu tien alkuun.
        /// </summary>
        static void NdKirkkomaanSateet(out float[] sisa, out float[] ulko, out float[] reuna, out bool[] aukiolla)
        {
            var p = NdKierrosNaytteet();
            var aukio = NdAukio();
            sisa = new float[NdKulmia]; ulko = new float[NdKulmia]; reuna = new float[NdKulmia]; aukiolla = new bool[NdKulmia];
            float tie = NdTienKulma * 180f / Mathf.PI;
            for (int i = 0; i < NdKulmia; i++)
            {
                float a = i * Mathf.PI * 2f / NdKulmia, aste = i * 360f / NdKulmia;
                float rk = NdSade(p, a), ra = NdSade(aukio, a);
                aukiolla[i] = ra > 0f;
                sisa[i] = rk - NdPolku;
                ulko[i] = Mathf.Max(rk + NdPolku, ra);
                float lannesta = Mathf.Abs(Mathf.Repeat(aste, 360f) - 180f);
                float takana = Mathf.Max(0f, Mathf.Cos((aste - 45f) * Mathf.PI / 180f));   // kirkon takana (mallin +Z) leveämpi
                float reunus = aukiolla[i] ? 0.4f : Mathf.Lerp(0.4f, 8f + 2.5f * takana, Mathf.Clamp01((lannesta - 18f) / 14f));
                reuna[i] = ulko[i] + reunus * (1f + 0.1f * Mathf.Sin(i * 2.1f) + 0.06f * Mathf.Cos(i * 5.3f));
                // Tien alku: nurmen reuna tien alkupisteen kohdalle (tie alkaa kirkkomaan reunalta).
                float ero = Mathf.Abs(Mathf.Repeat(aste - tie + 180f, 360f) - 180f);
                if (ero < 10f) reuna[i] = Mathf.Max(ulko[i] + 2f, Mathf.Lerp(NdTienSade - 0.3f, reuna[i], ero / 10f));
            }
        }

        /// <summary>Piste kirkkomaalla: kulma i (napakulmien indeksi, liukuluku) ja osuus polun ulkoreunasta nurmen reunaan (0–1).</summary>
        static Vector2 NdKirkkomaaPiste(float[] ulko, float[] reuna, float i, float osuus)
        {
            int i0 = (int)Mathf.Repeat((float)Math.Floor(i), NdKulmia), i1 = (i0 + 1) % NdKulmia;
            float f = i - (float)Math.Floor(i);
            float rk = Mathf.Lerp(ulko[i0], ulko[i1], f), rn = Mathf.Lerp(reuna[i0], reuna[i1], f);
            float a = i * Mathf.PI * 2f / NdKulmia, sade = Mathf.Lerp(rk, rn, osuus);
            return new Vector2(NdUc + Mathf.Cos(a) * sade, Mathf.Sin(a) * sade);
        }

        /// <summary>
        /// Kirkkomaa (osa ilman ääriviivaa, pivot origossa): oliivinen nurmi kirkon ympärillä (napaviuhka keskipisteestä, kirkon
        /// alla piilossa), vaalea vaeltajien polku kirkon ympäri, länsijulkisivun kiveytty aukio, nurmi polun ulkopuolella
        /// kirkkomaan reunaan (reunalla 0,0015) ja Pyhän Olavin tie nurmen poikki kirkkomaan etureunasta aukiolle.
        /// </summary>
        static Mesh NidarosKirkkomaa()
        {
            var r = new Rakentaja();
            NdKirkkomaanSateet(out var sisa, out var ulko, out var reuna, out var aukiolla);
            var up = Vector3.up;
            var keski = NdPm(NdUc, 0f, NdMaa);
            Vector3 P(float sade, float a, float y) => NdPm(NdUc + Mathf.Cos(a) * sade, Mathf.Sin(a) * sade, y);
            for (int i = 0; i < NdKulmia; i++)
            {
                int j = (i + 1) % NdKulmia;
                float a0 = i * Mathf.PI * 2f / NdKulmia, a1 = j * Mathf.PI * 2f / NdKulmia;
                bool aukio = aukiolla[i] && aukiolla[j];
                r.KolmioUlos(keski, P(sisa[i], a0, NdMaa), P(sisa[j], a1, NdMaa), up, aukio ? NdKiveys : NdNurmi);
                r.NelioUlos(P(sisa[i], a0, NdMaa), P(ulko[i], a0, NdMaa), P(ulko[j], a1, NdMaa), P(sisa[j], a1, NdMaa), up, NdKiveys);
                bool reunaAukiolla = aukiolla[i] || aukiolla[j];
                r.NelioUlos(P(ulko[i], a0, NdMaa), P(reuna[i], a0, NdMaaReuna), P(reuna[j], a1, NdMaaReuna), P(ulko[j], a1, NdMaa), up,
                    reunaAukiolla && reuna[i] - ulko[i] < 1f && reuna[j] - ulko[j] < 1f ? NdKiveys : NdNurmi);
            }
            // Pyhän Olavin tie: 3,4 m leveä vaalea kaista nurmen yli kirkkomaan etureunasta (ohjauspiste 1) polulle (puoliväliin
            // pisteiden 2 ja 3 välillä). Korkeus NdTienKorkeus: nousee reunalta kiveyksen tasolle kuten vaeltajien jalat
            // liikeytimessä (NidarosLiike.Maa).
            const int lohkoja = 6;
            var tie = new Vector2[lohkoja + 1];
            for (int k = 0; k <= lohkoja; k++)
            {
                float tt = k * 1.5f / lohkoja;
                int seg = 1 + (int)Mathf.Min(1f, (float)Math.Floor(tt));
                tie[k] = NdCatmull(NdSaapuU, NdSaapuV, seg, tt - (seg - 1), false);
            }
            float matka = 0f;
            for (int k = 0; k < lohkoja; k++)
            {
                Vector2 a = tie[k], b = tie[k + 1];
                float ex = b.x - a.x, ey = b.y - a.y, el = Mathf.Sqrt(ex * ex + ey * ey);
                var nrm = new Vector2(-ey / el * 1.7f, ex / el * 1.7f);
                float pit = el * NdS;
                float y0 = NdTienKorkeus(matka) + 0.0004f, y1 = NdTienKorkeus(matka + pit) + 0.0004f;
                matka += pit;
                r.NelioUlos(NdPm(a.x - nrm.x, a.y - nrm.y, y0), NdPm(a.x + nrm.x, a.y + nrm.y, y0), NdPm(b.x + nrm.x, b.y + nrm.y, y1),
                    NdPm(b.x - nrm.x, b.y - nrm.y, y1), up, NdTie);
            }
            return r.Verkko("Nidaros-kirkkomaa");
        }

        /// <summary>Pyhän Olavin tien pinnan korkeus matkalla m (mallin yksiköissä) tien alusta: kirkkomaan reunalta (NdMaaReuna)
        /// kiveyksen tasolle (NdMaa) 0,07 yksikön matkalla smoothstepillä (sama kuin NidarosLiike.Maa ja TieNousu).</summary>
        static float NdTienKorkeus(float m)
        {
            float t = Mathf.Clamp01(m / 0.07f);
            return NdMaaReuna + (NdMaa - NdMaaReuna) * t * t * (3f - 2f * t);
        }

        /// <summary>Kirkkomaan puut: napakulma (°), osuus polun ulkoreunasta nurmen reunaan ja koko. Takana ja sivuilla (lehmukset ja
        /// vaahterat kirkon pohjois- ja itäpuolella), ei aukion, tien eikä länsijulkisivun ja eteläkyljen edessä.</summary>
        static readonly (float aste, float osuus, float koko)[] NdPuut =
        {
            (8f, 0.5f, 1.0f), (27f, 0.55f, 1.1f), (45f, 0.5f, 1.2f), (62f, 0.5f, 1.0f), (80f, 0.55f, 1.15f), (98f, 0.5f, 1.0f),
            (116f, 0.55f, 0.95f), (134f, 0.5f, 1.05f), (148f, 0.55f, 0.85f), (332f, 0.55f, 0.9f), (350f, 0.5f, 1.0f), (300f, 0.6f, 0.75f),
        };

        /// <summary>Puut (pienet osat ilman ääriviivaa): pyöreä latvus viisisivuisena kaksoispyramidina nurmen päällä; lähitasolla
        /// kuusisivuisena, rungon kanssa ja 10 puuta lisää.</summary>
        static void NdPuusto(Rakentaja r, bool lahi)
        {
            NdKirkkomaanSateet(out _, out var ulko, out var reuna, out _);
            void Puu(float aste, float osuus, float koko, bool tumma)
            {
                var q = NdKirkkomaaPiste(ulko, reuna, aste / 360f * NdKulmia, osuus);
                // Latvuksen säde enintään 3,7 m (0,033): alle ääriviivan rajan 0,035, joten puut eivät saa tummaa reunaa.
                float sade = 3.7f * Mathf.Min(1f, koko), kork = 10f * koko;
                var p = NdP(q.x, q.y, kork * 0.62f);
                r.Timantti(p, sade * NdS, kork * 0.36f * NdSy, tumma ? NdPuu : NdPuuVaalea, lahi ? 6 : 5);
                // Runko latvuksen alle (latvus ei leiju): kolmisivuinen vaippa maasta latvuksen sisään.
                r.Vaippa(NdPm(q.x, q.y, NdMaa - 0.001f), 0.55f * NdS, 0.4f * NdS, kork * 0.34f * NdSy, 3, NdRunkoPuu, q.x * 0.1f);
            }
            for (int i = 0; i < NdPuut.Length; i++) Puu(NdPuut[i].aste, NdPuut[i].osuus, NdPuut[i].koko, i % 3 != 1);
            if (lahi) NdLhPuut(r, Puu);
        }

        // ---- Kokoaminen ----

        static void NdRakenna(Rakentaja r, bool lahi)
        {
            NdLansijulkisivu(r, lahi);
            NdLaiva(r, lahi);
            NdPoikkilaiva(r, lahi);
            NdKeskitorni(r, lahi);
            NdKuori(r, lahi);
            NdOktogoni(r, lahi);
            NdKapitulitalo(r, lahi);
            NdPuusto(r, lahi);
            if (lahi) NdLhKirkkomaa(r);
        }

        static Mesh NidarosRunko()
        {
            var r = new Rakentaja();
            NdRakenna(r, false);
            return r.Verkko("Nidaros");
        }

        /// <summary>
        /// LÄHITASO (Natiivisepän Erikoismalli.Lahi, katto 3 000 kolmiota): sama siluetti, mittasuhteet, värit, ääriviivaosat
        /// (länsijulkisivu, laiva, poikkilaiva, keskitorni, kuori, oktogoni ja kapitulitalo) ja osien pivotit kuin rungossa;
        /// lisäkolmiot lähikuvan yksityiskohtiin. Korvaa rungon vain lähellä; kirkkomaa, vaeltajat, kynttilät, ruusu ja valot
        /// pysyvät ennallaan: portit, ruusuikkuna ja julkisivun pinta ovat samoilla paikoilla, joten vaeltajat katoavat samaan
        /// porttiin ja yövalon hehku jää patsasrivien ja porttien taakse.
        ///   länsijulkisivu  patsaat teräväkaarisissa syvennyksissä kolmessa rivissä, porttien kehykset ja kaaret, ruusuikkunan
        ///                   kivipitsi (16 sädettä) ja punainen karbunkelikivi, tornien vyölistat, kaiteet ja ikkunat
        ///   laiva ja kuori  lentotuet, sivulaivojen ja pohjoiskyljen ikkunat
        ///   torni           kahdeksankulmaiset kulmatornit ja suippotornin juuren päätyikkunat
        ///   muut            poikkilaivan pohjoispäädyn ruusuikkuna ja portti, oktogonin kaikki ikkunat, kapitulitalon ikkunat,
        ///                   kirkkomaan haudat ja lyhtypylväät sekä 10 puuta lisää
        /// </summary>
        static Mesh NidarosLahi()
        {
            var r = new Rakentaja();
            NdRakenna(r, true);
            return r.Verkko("Nidaros-lahi");
        }

        // ---- Lähitason yksityiskohdat ----

        /// <summary>Lähitason sävyt rungon paletista (ominaisuuksina, koska Em-paletti on toisessa tiedostossa).</summary>
        static Color NdLhPatsas => Color.Lerp(NdKiviVaalea, EmPaperi, 0.35f);
        static Color NdLhLista => Color.Lerp(NdKiviVaalea, NdKivi, 0.35f);
        static readonly Color NdLhKarbunkeli = Hex(0x9a3b2c), NdLhPronssi = Hex(0x4f4a3c), NdLhHauta = Hex(0xc9c3ad), NdLhPenkki = Hex(0xb9b39d);

        /// <summary>
        /// Patsaat lähitasolla: jokaisessa rivissä vaaleat patsaat (vartalo ja pää) tummassa nauhassa, niiden yllä teräväkaariset
        /// katokset ja välissä ohuet pylväät; rivin yläreunassa vaalea lista (enintään 8 m:n paloina, ettei kuvio saa ääriviivaa).
        /// Keskiportin yllä ristiinnaulitun ryhmä vaaleana ristinä. Kolmesti 16 + 14 + 14 patsasta.
        /// </summary>
        static void NdLhPatsaat(Rakentaja r)
        {
            const float nu = -1f, nv = 0f;
            var lista = NdLhLista; var patsas = NdLhPatsas;
            for (int k = 0; k < 3; k++)
            {
                float y0 = NdRiviY0[k], y1 = NdRiviY1[k], h = y1 - y0;
                float aukko = k == 0 ? 3.4f : NdSyvV + 0.5f;
                int n = k == 0 ? 8 : 7;
                foreach (float s in new[] { -1f, 1f })
                {
                    float va = s * aukko, vb = s * (NdTorni1 - 0.6f), leveys = Mathf.Abs(vb - va) / n;
                    for (int i = 0; i < n; i++)
                    {
                        float v = Mathf.Lerp(va, vb, (i + 0.5f) / n);
                        NdLaatta(r, 0f, v, y0 + h * 0.34f, nu, nv, leveys * 0.42f, h * 0.56f, patsas, 0.0009f);
                        NdLaatta(r, 0f, v, y0 + h * 0.7f, nu, nv, leveys * 0.24f, h * 0.14f, patsas, 0.0009f);
                        NdSuippo(r, 0f, v, y0 + h * 0.8f, nu, nv, leveys * 0.82f, h * 0.2f, lista, 0.0019f);
                    }
                    for (int i = 0; i <= n; i++)
                        NdLaatta(r, 0f, Mathf.Lerp(va, vb, i / (float)n), y0 + h * 0.5f, nu, nv, 0.22f, h, lista, 0.0007f);
                    int palat = Mathf.Max(1, (int)Math.Ceiling(Mathf.Abs(vb - va) / 8f));
                    for (int j = 0; j < palat; j++)
                    {
                        float pa = Mathf.Lerp(va, vb, j / (float)palat), pb = Mathf.Lerp(va, vb, (j + 1) / (float)palat);
                        NdLaatta(r, 0f, (pa + pb) * 0.5f, y1 + 0.2f, nu, nv, Mathf.Abs(pb - pa), 0.45f, lista, 0.0006f);
                    }
                }
            }
            // Ristiinnaulitun ryhmä keskiportin yllä (Wilhelm Rasmussen): vaalea risti ja kaksi pientä hahmoa.
            NdLaatta(r, 0f, 0f, 9.2f, nu, nv, 0.55f, 3.2f, patsas, 0.0009f);
            NdLaatta(r, 0f, 0f, 10.1f, nu, nv, 2.2f, 0.45f, patsas, 0.0011f);
            foreach (float s in new[] { -1f, 1f }) NdLaatta(r, 0f, s * 1.9f, 8.9f, nu, nv, 0.7f, 2.2f, patsas, 0.0009f);
        }

        /// <summary>Ruusuikkunan kivipitsi: 16 vaaleaa sädettä, sisäkehä ja keskellä punainen karbunkelikivi (Kristuksen merkki,
        /// no-Wikipedia "Vestfronten på Nidarosdomen"). Rungon lasikiekon edessä.</summary>
        static void NdLhRuusu(Rakentaja r)
        {
            var n = NdSuunta(-1f, 0f);
            var t = Vector3.Cross(Vector3.up, n);
            var c = NdP(0f, 0f, NdRuusuY) + n * 0.0031f;
            float R = NdRuusuR * NdS * NdYmpyra, lev = 0.16f * NdS;
            for (int i = 0; i < 16; i++)
            {
                float a = (i + 0.5f) * Mathf.PI * 2f / 16f;
                var d = t * Mathf.Cos(a) + Vector3.up * Mathf.Sin(a);
                var sivu = t * -Mathf.Sin(a) + Vector3.up * Mathf.Cos(a);
                Vector3 p0 = c + d * (R * 0.3f), p1 = c + d * (R * 0.79f);
                r.NelioUlos(p0 - sivu * lev, p1 - sivu * lev, p1 + sivu * lev, p0 + sivu * lev, n, NdKiviVaalea);
            }
            NdKiekko(r, 0f, 0f, NdRuusuY, -1f, 0f, NdRuusuR * 0.32f, 8, NdKiviVaalea, 0.0031f);
            NdKiekko(r, 0f, 0f, NdRuusuY, -1f, 0f, NdRuusuR * 0.14f, 6, NdLhKarbunkeli, 0.0034f);
        }

        /// <summary>
        /// Länsitornit ja portit lähitasolla: vyölistat tornien länsi- ja ulkopinnoilla, kaide tornien harjalla, porttien vaaleat
        /// kaarikehykset, päädyn Kristus-syvennys ja risti sekä pohjoistornin huipulla pronssinen arkkienkeli Mikael (Kristofer
        /// Leirdal, no-Wikipedia).
        /// </summary>
        static void NdLhTornit(Rakentaja r)
        {
            var lista = NdLhLista;
            foreach (float s in new[] { -1f, 1f })
            {
                float v0 = s < 0 ? -NdTorni1 : NdTorni0, v1 = s < 0 ? -NdTorni0 : NdTorni1, vm = (v0 + v1) * 0.5f;
                foreach (float y in new[] { NdSeinaH + 0.3f, 28.6f, NdTorniH - 0.6f })
                {
                    NdLaatta(r, 0f, vm, y, -1f, 0f, NdTorni1 - NdTorni0 + 0.2f, y > 30f ? 1.2f : 0.5f, lista, 0.0004f);
                    NdLaatta(r, NdTorniU * 0.5f, s * NdTorni1, y, 0f, s, NdTorniU + 0.2f, y > 30f ? 1.2f : 0.5f, lista, 0.0004f);
                }
            }
            // Porttien kaarikehykset rungon aukkojen takana (vaalea, hieman leveämpi ja korkeampi teräväkaari).
            NdSuippo(r, 0f, 0f, 0f, -1f, 0f, NdPorttiW + 1.6f, NdPorttiH + 1.3f, lista, 0.0009f);
            foreach (float s in new[] { -1f, 1f })
                NdSuippo(r, 0f, s * NdSivuPorttiV, 0f, -1f, 0f, NdSivuPorttiW + 1.1f, NdSivuPorttiH + 0.9f, lista, 0.0009f);
            // Päädyn Kristus riemuvoittajana -syvennys ja risti päädyn kärjessä.
            NdSuippo(r, NdPaatyU, 0f, NdSeinaH + 2.6f, -1f, 0f, 3f, 4.2f, NdSyvennys, 0.0015f);
            NdLaatta(r, NdPaatyU, 0f, NdSeinaH + 4f, -1f, 0f, 0.7f, 2.2f, NdLhPatsas, 0.0019f);
            NdLaatta(r, NdPaatyU, 0f, NdPaatyH + 1.2f, -1f, 0f, 0.35f, 2.4f, NdHuippu, 0.0006f);
            NdLaatta(r, NdPaatyU, 0f, NdPaatyH + 1.5f, -1f, 0f, 1.4f, 0.35f, NdHuippu, 0.0008f);
            // Arkkienkeli Mikael pohjoistornin ulkoetukulman huipulla: tumma pronssinen hahmo ja siivet.
            var m = NdP(0.9f, NdTorni1 - 0.9f, NdTorniH + 8.5f);
            r.Timantti(m + Vector3.up * (1.3f * NdSy), 0.45f * NdS, 1.3f * NdSy, NdLhPronssi, 4);
            var ns = NdSuunta(-1f, 0f); var ts = Vector3.Cross(Vector3.up, ns);
            r.KalvoKolmio(m + Vector3.up * (1.9f * NdSy), m + Vector3.up * (2.9f * NdSy) + ts * (1.1f * NdS), m + Vector3.up * (1.5f * NdSy) + ts * (0.4f * NdS), NdLhPronssi);
            r.KalvoKolmio(m + Vector3.up * (1.9f * NdSy), m + Vector3.up * (2.9f * NdSy) - ts * (1.1f * NdS), m + Vector3.up * (1.5f * NdSy) - ts * (0.4f * NdS), NdLhPronssi);
        }

        /// <summary>Lentotuet lähitasolla: sivulaivan ulkoseinän tukipilari (kapea pystykappale) ja kalteva tukikaari pilarin
        /// huipulta keskilaivan seinään räystään alle molemmilla kyljillä.</summary>
        static void NdLhLentotuet(Rakentaja r, float[] huiput, float vUlko, float yUlko, float vSisa, float ySisa)
        {
            foreach (float s in new[] { -1f, 1f })
                foreach (float u in huiput)
                {
                    NdLaatikko(r, u - 0.6f, u + 0.6f, s < 0 ? -vUlko - 0.9f : vUlko, s < 0 ? -vUlko : vUlko + 0.9f, 0f, yUlko - 1f, NdKivi, NdKivi);
                    // Tukikaari: kaksipuolinen kalteva levy (0,9 m leveä) ja sen alapinta tummempana.
                    Vector3 a0 = NdP(u - 0.45f, s * (vUlko + 0.2f), yUlko + 3.2f), a1 = NdP(u + 0.45f, s * (vUlko + 0.2f), yUlko + 3.2f);
                    Vector3 b0 = NdP(u - 0.45f, s * vSisa, ySisa - 4f), b1 = NdP(u + 0.45f, s * vSisa, ySisa - 4f);
                    Vector3 c0 = NdP(u - 0.45f, s * (vUlko + 0.2f), yUlko + 1.9f), c1 = NdP(u + 0.45f, s * (vUlko + 0.2f), yUlko + 1.9f);
                    Vector3 d0 = NdP(u - 0.45f, s * vSisa, ySisa - 5.6f), d1 = NdP(u + 0.45f, s * vSisa, ySisa - 5.6f);
                    r.Kalvo(a0, a1, b1, b0, NdKivi);
                    r.Kalvo(c0, c1, d1, d0, NdSyvennys);
                }
        }

        /// <summary>Poikkilaivan pienen ruusuikkunan pitsi lähitasolla: kahdeksan sädettä ja vaalea keskus.</summary>
        static void NdLhPikkuruusu(Rakentaja r, float u, float v, float y, float nu, float nv, float sade)
        {
            var n = NdSuunta(nu, nv);
            var t = Vector3.Cross(Vector3.up, n);
            var c = NdP(u, v, y) + n * 0.0033f;
            float R = sade * NdS * NdYmpyra, lev = 0.13f * NdS;
            for (int i = 0; i < 8; i++)
            {
                float a = (i + 0.5f) * Mathf.PI * 2f / 8f;
                var d = t * Mathf.Cos(a) + Vector3.up * Mathf.Sin(a);
                var sivu = t * -Mathf.Sin(a) + Vector3.up * Mathf.Cos(a);
                r.NelioUlos(c + d * (R * 0.25f) - sivu * lev, c + d * (R * 0.95f) - sivu * lev, c + d * (R * 0.95f) + sivu * lev, c + d * (R * 0.25f) + sivu * lev, n, NdKiviVaalea);
            }
            NdKiekko(r, u, v, y, nu, nv, sade * 0.28f, 6, NdKiviVaalea, 0.0035f);
        }

        /// <summary>Suippotornin juuren neljä päätyikkunaa (pääsuuntiin) lähitasolla (ristiä ei ole, jotta siluetti ja korkeus pysyvät
        /// samoina kuin rungossa).</summary>
        static void NdLhSuipponJuuri(Rakentaja r, float uc)
        {
            float apo = NdSuippoR * Mathf.Cos(Mathf.PI / 8f);
            foreach (var (nu, nv) in new[] { (-1f, 0f), (1f, 0f), (0f, -1f), (0f, 1f) })
            {
                // Pieni kolmiopääty tahkon edessä (kupari) ja tumma ikkuna siinä.
                float pu = uc + nu * (apo + 0.3f), pv = nv * (apo + 0.3f);
                float tu = -nv, tv = nu;
                Vector3 a = NdP(pu - tu * 1.5f, pv - tv * 1.5f, NdTorniKH + 0.5f), b = NdP(pu + tu * 1.5f, pv + tv * 1.5f, NdTorniKH + 0.5f);
                Vector3 kp = NdP(pu, pv, NdTorniKH + 5.5f), taka = NdP(uc + nu * (apo - 1.5f), nv * (apo - 1.5f), NdTorniKH + 5.5f);
                var k = NdP(uc, 0f, NdTorniKH + 2f);
                r.KolmioKeskelta(a, b, kp, k, NdKupari);
                r.KolmioKeskelta(a, kp, taka, k, NdKupariTumma);
                r.KolmioKeskelta(b, kp, taka, k, NdKupariTumma);
                NdSuippo(r, pu, pv, NdTorniKH + 0.9f, nu, nv, 0.9f, 2.4f, NdAukko, 0.0006f);
            }
        }

        /// <summary>Lähitason lisäpuut kirkkomaalla (kulma, osuus, koko): rungon puiden väleissä.</summary>
        static readonly (float aste, float osuus, float koko)[] NdLhLisapuut =
        {
            (17f, 0.62f, 0.8f), (36f, 0.4f, 0.75f), (53f, 0.66f, 0.85f), (71f, 0.4f, 0.8f), (89f, 0.66f, 0.75f),
            (107f, 0.38f, 0.8f), (125f, 0.66f, 0.7f), (341f, 0.35f, 0.8f), (316f, 0.45f, 0.7f), (290f, 0.62f, 0.65f),
        };

        static void NdLhPuut(Rakentaja r, Action<float, float, float, bool> puu)
        {
            for (int i = 0; i < NdLhLisapuut.Length; i++) puu(NdLhLisapuut[i].aste, NdLhLisapuut[i].osuus, NdLhLisapuut[i].koko, i % 2 == 0);
        }

        /// <summary>Kirkkomaa lähitasolla: haudat pieninä pystykivinä (edusta ja kansi) nurmella rivittäin, lyhtypylväät polun
        /// varrella ja kolme kivipenkkiä länsijulkisivun aukion reunalla.</summary>
        static void NdLhKirkkomaa(Rakentaja r)
        {
            NdKirkkomaanSateet(out _, out var ulko, out var reuna, out _);
            var n = NdSuunta(-1f, -1f).normalized;
            var t = Vector3.Cross(Vector3.up, n);
            int hauta = 0;
            // Haudat nurmen rivissä polun ulkopuolella (pohjoinen ja itä), kaksi riviä, tiheämmin takana.
            foreach (float osuus in new[] { 0.28f, 0.8f })
                for (float aste = 4f; aste < 150f; aste += 7.3f)
                {
                    if (hauta++ % 5 == 2) continue;
                    var q = NdKirkkomaaPiste(ulko, reuna, (aste + osuus * 3f) / 360f * NdKulmia, osuus);
                    var p = NdPm(q.x, q.y, NdMaa);
                    float w = 0.5f * NdS, h = 1.3f * NdSy, d = 0.2f * NdS;
                    Vector3 A = p - t * w, B = p + t * w;
                    r.NelioUlos(A + n * d, B + n * d, B + n * d + Vector3.up * h, A + n * d + Vector3.up * h, n, NdLhHauta);
                    r.NelioUlos(A + n * d + Vector3.up * h, B + n * d + Vector3.up * h, B - n * d + Vector3.up * h, A - n * d + Vector3.up * h, Vector3.up, NdLhHauta);
                }
            // Lyhtypylväät polun ulkoreunalla (etelä ja itä): tumma tolppa ja lyhty.
            foreach (float aste in new[] { 250f, 280f, 310f, 340f, 20f, 60f })
            {
                var q = NdKirkkomaaPiste(ulko, reuna, aste / 360f * NdKulmia, 0.06f);
                var p = NdPm(q.x, q.y, NdMaa);
                r.Vaippa(p, 0.18f * NdS, 0.14f * NdS, 4.2f * NdSy, 3, EmMuste);
                r.Timantti(p + Vector3.up * (4.6f * NdSy), 0.5f * NdS, 0.5f * NdSy, NdLhPronssi, 4);
            }
            // Kivipenkit aukion reunalla (kuten länsijulkisivun kuvissa).
            foreach (float v in new[] { -9f, 0f, 9f })
                NdLaatikko(r, -13.2f, -12.2f, v - 3.2f, v + 3.2f, 0f, 1.1f, NdLhPenkki, NdLhPenkki);
        }

        // ---- Liikkuvat osat ----

        /// <summary>Vaeltajien ja kynttilöiden yhteinen pivot: pysähdyspaikka keskiportin edessä kiveyksellä (kierroksen alku,
        /// NdKierros[0]). Sama kuin NidarosLiike.PivotX/Y/Z.</summary>
        static Vector3 NdVaeltajaPivot => NdPm(NdKierrosU[0], NdKierrosV[0], NdMaa);

        /// <summary>
        /// Pyhiinvaeltaja k (pivot jaloissa, katse +Z, sauva oikeassa kädessä): kuusisivuinen tumma kaapu, leveälierinen hattu
        /// ja sauva. Korkeus 0,062 hattuineen ja leveys 0,025 (noin 4-kertaiseksi liioiteltu kuten Malborkin ritarit, jotta
        /// vaeltaja näkyy 40 pt:ssä), sauva 0,075. Kaavun ja hatun sävy vaihtelevat vaeltajittain. 24 kolmiota.
        /// </summary>
        static Mesh NdVaeltaja(int k)
        {
            var r = new Rakentaja();
            var kaapu = NdKaavut[k % NdKaavut.Length];
            r.Vaippa(Vector3.zero, 0.0125f, 0.0062f, 0.046f, 6, kaapu, k * 0.3f);
            r.Kartio(new Vector3(0f, 0.0455f, 0f), 0.0101f, 0.0165f, 6, NdHatut[k % NdHatut.Length]);
            r.Vaippa(new Vector3(0.013f, 0f, 0.005f), 0.0016f, 0.0012f, 0.075f, 3, EmMuste);
            return r.Verkko("Nidaros-vaeltaja" + k);
        }

        static Mesh NidarosVaeltaja0() => NdVaeltaja(0);
        static Mesh NidarosVaeltaja1() => NdVaeltaja(1);
        static Mesh NidarosVaeltaja2() => NdVaeltaja(2);
        static Mesh NidarosVaeltaja3() => NdVaeltaja(3);

        /// <summary>
        /// Kynttilä (vaeltajan paikallisessa avaruudessa): lämmin liekki vasemmassa kädessä olan korkeudella ja lämmin
        /// valopiiri maassa jalkojen ympärillä. Ohut tehoste ilman ääriviivaryhmää (erillisinä kolmioina, kuten Pannonhalman äänirenkaat). 16 kolmiota.
        /// </summary>
        static Mesh NidarosKynttila()
        {
            var r = new Rakentaja();
            // Liekki vasemmassa kädessä olan korkeudella hatun lierin vieressä: näkyy kaikista suunnista (rinnan edessä se jäi
            // vartalon taakse, kun vaeltaja katsoi porttiin eli poispäin kamerasta).
            var liekki = new Vector3(-0.0135f, 0.046f, 0.0045f);
            Vector3 yla = liekki + Vector3.up * 0.0068f, ala = liekki - Vector3.up * 0.0042f;
            for (int i = 0; i < 4; i++)
            {
                float a0 = i * Mathf.PI * 0.5f, a1 = (i + 1) * Mathf.PI * 0.5f;
                Vector3 p0 = liekki + new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)) * 0.004f, p1 = liekki + new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1)) * 0.004f;
                r.KolmioKeskelta(p0, p1, yla, liekki, NdLiekki);
                r.KolmioKeskelta(p1, p0, ala, liekki, NdLiekki);
            }
            var c = new Vector3(-0.003f, 0.0009f, 0.004f);
            for (int i = 0; i < 8; i++)
            {
                float a0 = i * Mathf.PI * 2f / 8f, a1 = (i + 1) * Mathf.PI * 2f / 8f;
                r.KolmioUlos(c, c + new Vector3(Mathf.Cos(a0), 0f, Mathf.Sin(a0)) * 0.023f, c + new Vector3(Mathf.Cos(a1), 0f, Mathf.Sin(a1)) * 0.023f,
                    Vector3.up, EmIkkunavalo);
            }
            return r.Verkko("Nidaros-kynttila");
        }

        /// <summary>Ruusuikkunan keskipiste (pivot, julkisivun pinnalla).</summary>
        static Vector3 NdRuusuPivot => NdP(0f, 0f, NdRuusuY);

        /// <summary>
        /// Valvojaisten ruusuikkuna (pivot ikkunan keskellä): kirkas lämmin keskusta ja kultainen kehä, joka peittää myös
        /// ikkunan kivikehän ja osan syvennyksestä (säde 1,32 × ikkuna, jotta syttyminen näkyy 40 pt:ssä), 0,0036 pinnan edessä
        /// (rungon ikkunan ja yövalon edessä). Liikeydin kasvattaa sen keskeltä (skaala 0 → 1 1,5 s:ssa). Erilliset kolmiot ilman
        /// ääriviivaryhmää. 30 kolmiota.
        /// </summary>
        static Mesh NidarosRuusu()
        {
            var r = new Rakentaja();
            var n = NdSuunta(-1f, 0f);
            var t = Vector3.Cross(Vector3.up, n);
            var c = n * 0.0036f;
            float R0 = NdRuusuR * 0.72f * NdS * NdYmpyra, R1 = NdRuusuR * 1.32f * NdS * NdYmpyra;
            const int m = 10;
            for (int i = 0; i < m; i++)
            {
                float a0 = i * Mathf.PI * 2f / m, a1 = (i + 1) * Mathf.PI * 2f / m;
                Vector3 d0 = t * Mathf.Cos(a0) + Vector3.up * Mathf.Sin(a0), d1 = t * Mathf.Cos(a1) + Vector3.up * Mathf.Sin(a1);
                r.KolmioUlos(c, c + d0 * R0, c + d1 * R0, n, NdRuusuKeski);
                r.KolmioUlos(c + d0 * R0, c + d0 * R1, c + d1 * R1, n, NdRuusuKulta);
                r.KolmioUlos(c + d0 * R0, c + d1 * R1, c + d1 * R0, n, NdRuusuKulta);
            }
            return r.Verkko("Nidaros-ruusu");
        }

        /// <summary>Yövalojen pivot länsijulkisivun juuressa keskellä.</summary>
        static Vector3 NdValoPivot => NdP(0f, 0f, 0f);

        /// <summary>
        /// Yövalot (pivot julkisivun juuressa): länsijulkisivun lämmin hehku 0,0008 pinnan edessä eli patsasrivien, porttien ja
        /// ruusuikkunan syvennyksen takana (ne jäävät tummiksi valaistuun julkisivuun), tornien ja päädyn hehku sekä ruusuikkunan
        /// ja keskiportin hehku niiden edessä. Valaisematon, ei bloomia.
        /// </summary>
        static Mesh NidarosValot()
        {
            var r = new Rakentaja();
            var o = NdValoPivot;
            var n = NdSuunta(-1f, 0f);
            var t = Vector3.Cross(Vector3.up, n);
            void Pinta(float v, float y, float lev, float kork, float eteen, Color vari) =>
                r.Laatta(NdP(0f, v, y) + n * (eteen - 0.0015f) - o, n, lev * NdS, kork * NdSy, vari);
            Pinta(0f, NdSeinaH * 0.5f, NdTorni1 * 2f - 0.8f, NdSeinaH - 0.6f, 0.0008f, EmIkkunavalo);
            foreach (float s in new[] { -1f, 1f })
                Pinta(s * (NdTorni0 + NdTorni1) * 0.5f, (NdSeinaH + NdTorniH) * 0.5f, NdTorni1 - NdTorni0 - 0.6f, NdTorniH - NdSeinaH - 0.6f, 0.0008f, EmIkkunavalo);
            // Pääty (kolmio seinän harjan yllä).
            {
                var q = n * 0.0008f - o;
                Vector3 a = NdP(NdPaatyU, -NdPaatyV + 0.5f, NdSeinaH + 0.3f), b = NdP(NdPaatyU, NdPaatyV - 0.5f, NdSeinaH + 0.3f), c = NdP(NdPaatyU, 0f, NdPaatyH - 0.8f);
                r.KolmioUlos(a + q, b + q, c + q, n, EmIkkunavalo);
            }
            // Ruusuikkuna ja keskiportti hehkuvat edessä.
            var rc = NdP(0f, 0f, NdRuusuY) + n * 0.0033f - o;
            const int m = 10;
            float s0 = NdRuusuR * 0.45f * NdS * NdYmpyra, s1 = NdRuusuR * 0.82f * NdS * NdYmpyra;
            for (int i = 0; i < m; i++)
            {
                float a0 = i * Mathf.PI * 2f / m, a1 = (i + 1) * Mathf.PI * 2f / m;
                Vector3 d0 = t * Mathf.Cos(a0) + Vector3.up * Mathf.Sin(a0), d1 = t * Mathf.Cos(a1) + Vector3.up * Mathf.Sin(a1);
                r.KolmioUlos(rc, rc + d0 * s0, rc + d1 * s0, n, NdRuusuKeski);
                r.KolmioUlos(rc + d0 * s0, rc + d0 * s1, rc + d1 * s1, n, NdRuusuValo);
                r.KolmioUlos(rc + d0 * s0, rc + d1 * s1, rc + d1 * s0, n, NdRuusuValo);
            }
            var pp = NdP(0f, 0f, 0f) - o;
            {
                // Keskiportin hehku samassa muodossa kuin portti (NdSuippo), 0,0024 pinnan edessä.
                float w = NdPorttiW * 0.5f * 0.86f * NdS, h = NdPorttiH * 0.93f * NdSy, hs = Mathf.Max(0f, h - w * 1.35f * NdKorotus);
                var p0 = pp + n * 0.0024f;
                Vector3 A = p0 - t * w, B = p0 + t * w, C = B + Vector3.up * hs, D = A + Vector3.up * hs, M = p0 + Vector3.up * hs, T = p0 + Vector3.up * h;
                r.NelioUlos(A, B, C, D, n, NdRuusuValo);
                r.KolmioUlos(D, C, T, n, NdRuusuValo);
            }
            return r.Verkko("Nidaros-valot");
        }

        static LiikkuvaOsaMaaritys[] NidarosOsat()
        {
            var p = NdVaeltajaPivot;
            Func<Mesh>[] vaeltajat = { NidarosVaeltaja0, NidarosVaeltaja1, NidarosVaeltaja2, NidarosVaeltaja3 };
            var osat = new LiikkuvaOsaMaaritys[11];
            int k = 0;
            osat[k++] = new LiikkuvaOsaMaaritys { Nimi = "kirkkomaa", Verkko = NidarosKirkkomaa, Pivot = Vector3.zero, Liike = Liike.Liuku };
            for (int i = 0; i < 4; i++)
                osat[k++] = new LiikkuvaOsaMaaritys { Nimi = "vaeltaja" + i, Verkko = vaeltajat[i], Pivot = p, Liike = Liike.Liuku, Akseli = Vector3.forward,
                    KayS = 63f, TaukoS = 102f };
            for (int i = 0; i < 4; i++)
                osat[k++] = new LiikkuvaOsaMaaritys { Nimi = "kynttila" + i, Verkko = NidarosKynttila, Pivot = p, Liike = Liike.Valahdys };
            osat[k++] = new LiikkuvaOsaMaaritys { Nimi = "ruusu", Verkko = NidarosRuusu, Pivot = NdRuusuPivot, Liike = Liike.Valahdys };
            osat[k++] = new LiikkuvaOsaMaaritys { Nimi = "valot", Verkko = NidarosValot, Pivot = NdValoPivot, Liike = Liike.Valahdys };
            return osat;
        }

        static readonly bool nidaros = Rekisteroi("nidaros",
            new Erikoismalli { Runko = NidarosRunko, Osat = NidarosOsat, Lahi = NidarosLahi, Kolmiot0 = 1370, KokoKerroin = 1.5f });
    }
}
