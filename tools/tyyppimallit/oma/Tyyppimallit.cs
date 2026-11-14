// TYYPPIMALLIT, LUONNOS (Valoseppä 14.11.2026; KK 22.55 TYÖKALU 2, tehtävänanto 20261111-kolme-tyokalua-tehtavananto.md kohta 2).
// Muodon arviointiin: kirkko kolmessa kokoluokassa, asema ja palatsi + tavallinen talo mittakaavaksi. Paikallinen akseli kuten ikoneissa:
// +Y ylös, x = pitkä akseli (+x itään, kuori), z = leveys. Luonnoksessa pohja on suorakaide; lopullisessa seinät nousevat OSM-pohjasta ja tyyppi
// tuo vain katon, tornin ja julkisivun. Kolmiorajat (KK 21.2x): pieni ~400, keski 900, suuri 1 500.
// Osat ovat olemassa olevasta kirjastosta (Rakentaja, Seina, Sivut, Rengas, Viisari, OsaSeinaRytmi, OsaKaarikaytava); uudet apufunktiot (Ty*) ovat
// ehdokkaita yhteisiksi osiksi (OsaTorni, OsaHuippu, OsaTukipilari, OsaKellotaulu), jotka irrotetaan vasta luonnosten hyväksynnän jälkeen.
using System;
using System.Collections.Generic;

namespace Matkakirja
{
    public static partial class OhjelmaKohdeGeometria
    {
        // Tasavärit tyyliohjeen mukaan (kohta 2): vaalea lämmin kivi, siniharmaa katto, tumma lyijy tornin huipussa, tummat aukot.
        static readonly Vari TyKivi = Vari.H(0xEADCC0), TyKiviVarjo = Vari.H(0xC9BA9C), TyKatto = Vari.H(0x8E979D), TyHuippu = Vari.H(0x5F666E),
            TyAukko = Vari.H(0x5E5850), TyLasi = Vari.H(0xA9B9B2), TyTaulu = Vari.H(0xF2EEE4), TyViisari = Vari.H(0x2E2E2E), TyRauta = Vari.H(0x6A6F74);

        /// <summary>Harjakatto pitkin x-akselia: lappeet räystäältä y harjalle y + h, räystäs ulkonee o; päädyt kivestä seinän tasossa (pois, jos päätyä ei näy).</summary>
        static void TyHarja(Rakentaja r, float x0, float x1, float z0, float z1, float y, float h, float o, Vari katto, Vari paaty, bool p0 = true, bool p1 = true)
        {
            float zc = (z0 + z1) * 0.5f, hw = (z1 - z0) * 0.5f, pudotus = h * o / hw;
            var h0 = new P3(x0 - o, y + h, zc); var h1 = new P3(x1 + o, y + h, zc);
            r.Neli(new P3(x0 - o, y - pudotus, z0 - o), new P3(x1 + o, y - pudotus, z0 - o), h1, h0, katto, new P3(0f, 1f, -1f));
            r.Neli(new P3(x1 + o, y - pudotus, z1 + o), new P3(x0 - o, y - pudotus, z1 + o), h0, h1, katto, new P3(0f, 1f, 1f));
            if (p0) r.Kolmio(new P3(x0, y, z0), new P3(x0, y, z1), new P3(x0, y + h, zc), paaty, new P3(-1f, 0f, 0f));
            if (p1) r.Kolmio(new P3(x1, y, z0), new P3(x1, y, z1), new P3(x1, y + h, zc), paaty, new P3(1f, 0f, 0f));
        }

        /// <summary>Pulpettikatto sivulaivalle: ulkoreuna zUlko korkeudella yAla, sisäreuna zSisa korkeudella yYla (seinää vasten).</summary>
        static void TyPulpetti(Rakentaja r, float x0, float x1, float zUlko, float zSisa, float yAla, float yYla, Vari katto)
        {
            float s = zUlko > zSisa ? 1f : -1f;
            r.Neli(new P3(x0, yAla, zUlko), new P3(x1, yAla, zUlko), new P3(x1, yYla, zSisa), new P3(x0, yYla, zSisa), katto, new P3(0f, 1f, s));
        }

        /// <summary>Seinät suorakaiteelle (ei kantta; katto peittää).</summary>
        static void TySeinat(Rakentaja r, float x0, float x1, float z0, float z1, float y0, float y1, Vari v) =>
            r.Seinat(new[] { (x0, z1), (x1, z1), (x1, z0), (x0, z0) }, y0, y1, v);

        /// <summary>Puolimonikulmainen kuori itäpäähän (x = x0, keskiviiva zc): seinät räystäälle ja kartiokatto. Sivuja 3 (pieni) tai 5.</summary>
        static void TyKuori(Rakentaja r, float x0, float zc, float sade, float y, float h, int sivuja, Vari kivi, Vari katto)
        {
            const float Pii = (float)Math.PI;
            r.Pyora(x0, zc, new[] { (sade, 0f), (sade, y) }, sivuja, kivi, Pii / 2f, Pii, 1f, false);
            r.Pyora(x0, zc, new[] { (sade + 0.6f, y - 0.4f), (0f, y + h) }, sivuja, katto, Pii / 2f, Pii, 1f, false);
        }

        /// <summary>TORNI (ehdokas OsaTorni): neliörunko leveys w korkeudelle yRunko, kellohuoneen aukot (aukkoja per sivu, 0 = ei) ja huippu kärkeen
        /// yKarki (sivuja 4 = pyramidi, 8 = kahdeksankulmainen neula ja nurkkapiikit). Huippu 0 = tasakatto ja kaide (katedraalin länsitornit).</summary>
        static void TyTorni(Rakentaja r, float cx, float cz, float w, float yRunko, float yKarki, int sivuja, int aukkoja, Vari kivi, Vari aukko, Vari huippu)
        {
            float h = w * 0.5f;
            r.Laatikko(cx - h, cx + h, 0f, yRunko, cz - h, cz + h, kivi, kivi);
            if (aukkoja > 0)
            {
                float a1 = yRunko - w * 0.25f, a0 = a1 - Math.Min(w * 1.1f, yRunko * 0.22f);
                foreach (var s in Sivut(r, cx - h, cx + h, cz - h, cz + h))
                {
                    float vali = s.Pituus / (aukkoja + 1), lev = Math.Min(vali * 0.55f, 1.6f + w * 0.08f);
                    for (int i = 1; i <= aukkoja; i++) Suippo(r, s, i * vali, a0, a1, lev, 0.05f, aukko);
                }
            }
            if (sivuja == 4)
                r.Pyora(cx, cz, new[] { (h * 1.4142f + 0.3f, yRunko), (0f, yKarki) }, 4, huippu, 0.7854f);
            else if (sivuja == 8)
            {
                const float Pii = (float)Math.PI;
                r.Pyora(cx, cz, new[] { (h * 0.92f, yRunko), (0f, yKarki) }, 8, huippu, Pii / 8f);
                float p = h - w * 0.08f, ph = (yKarki - yRunko) * 0.16f;
                foreach (var (dx, dz) in new[] { (-p, -p), (p, -p), (p, p), (-p, p) }) r.Piikki(cx + dx, cz + dz, yRunko, ph, w * 0.09f, kivi);
            }
            else
            {
                // Tasakatto ja matala kaide: katedraalin länsitorni (Notre-Dame-tyyppi, NdTorni yksinkertaistettuna).
                r.Laatikko(cx - h - 0.4f, cx + h + 0.4f, yRunko, yRunko + 1.2f, cz - h - 0.4f, cz + h + 0.4f, kivi, TyKatto);
            }
        }

        /// <summary>TUKIPILARIT (ehdokas OsaTukipilari, NdLentotuki yksinkertaistettuna): sivulaivan ulkoseinän vieressä porrastettu pilari ja vino lentotuki
        /// keskilaivan seinään. Jakso x-suunnassa, pilarin ulkopinta zUlko, keskilaivan seinä zSisa korkeudella yTuki.</summary>
        static void TyTukipilarit(Rakentaja r, float x0, float x1, float vali, float zUlko, float zSisa, float yPilari, float yTuki, Vari kivi)
        {
            float s = zUlko > zSisa ? 1f : -1f;
            int n = Math.Max(1, (int)((x1 - x0) / vali));
            for (int i = 1; i < n; i++)
            {
                float x = x0 + i * (x1 - x0) / n;
                float za = zUlko, zb = zUlko - s * 1.6f;
                r.Laatikko(x - 0.7f, x + 0.7f, 0f, yPilari, Math.Min(za, zb), Math.Max(za, zb), kivi, kivi);
                // Lentotuki: ohut vino laatta pilarin päästä keskilaivan seinään.
                var a = new P3(x, yPilari - 0.5f, zb); var b = new P3(x, yTuki, zSisa);
                r.Neli(new P3(x - 0.35f, a.Y, a.Z), new P3(x + 0.35f, a.Y, a.Z), new P3(x + 0.35f, b.Y, b.Z), new P3(x - 0.35f, b.Y, b.Z), kivi, new P3(0f, 1f, s));
                r.Neli(new P3(x - 0.35f, a.Y - 1.2f, a.Z), new P3(x - 0.35f, a.Y, a.Z), new P3(x - 0.35f, b.Y, b.Z), new P3(x - 0.35f, b.Y - 1.2f, b.Z), kivi.Kerro(0.9f), new P3(-1f, 0f, 0f));
                r.Neli(new P3(x + 0.35f, a.Y - 1.2f, a.Z), new P3(x + 0.35f, a.Y, a.Z), new P3(x + 0.35f, b.Y, b.Z), new P3(x + 0.35f, b.Y - 1.2f, b.Z), kivi.Kerro(0.9f), new P3(1f, 0f, 0f));
            }
        }

        /// <summary>KELLOTAULU (ehdokas OsaKellotaulu; Rengas ja Viisari Big Benistä): valkoinen kiekko, tumma reuna ja kaksi viisaria.</summary>
        static void TyKello(Rakentaja r, Seina s, float uc, float yc, float sade)
        {
            Rengas(r, s, uc, yc, 0f, sade, 0.08f, TyTaulu, 12);
            Rengas(r, s, uc, yc, sade, sade * 1.15f, 0.1f, TyRauta, 12);
            Viisari(r, s, uc, yc, 5.24f, sade * 0.12f, sade * 0.55f, sade * 0.1f, 0.14f, TyViisari);
            Viisari(r, s, uc, yc, 0.52f, sade * 0.12f, sade * 0.85f, sade * 0.07f, 0.15f, TyViisari);
        }

        /// <summary>Ikkunarivi pitkälle seinälle (OsaSeinaRytmi): suippokaari-ikkunat kirkoille, suorat palatsille.</summary>
        static void TyIkkunat(Rakentaja r, float x0, float z0, float x1, float z1, float vali, float leveys, float y0, float y1, bool suippo, Vari aukko)
        {
            var s = new Seina(r, x0, z0, x1, z1);
            int n = Math.Max(1, (int)((s.Pituus - vali) / vali) + 1);
            float alku = (s.Pituus - (n - 1) * vali) * 0.5f;
            for (int i = 0; i < n; i++)
            {
                float u = alku + i * vali;
                if (suippo) Suippo(r, s, u, y0, y1, leveys, 0.05f, aukko);
                else s.Pinta(u - leveys * 0.5f, u + leveys * 0.5f, y0, y1, 0.05f, aukko);
            }
        }

        static Rakentaja TyRakentaja() => new Rakentaja { AoKorkeus = 1f, AoMaara = 0f };

        // ------------------------------------------------------------------ tyypit ------------------------------------------------------------------

        /// <summary>KIRKKO PIENI (kappeli, kyläkirkko; ala alle ~400 m²): laiva 24 × 11 m, räystäs 7 m, jyrkkä harja, länsitorni 6 m pyramidihuipulla 26 m:iin
        /// (≈ 2,0 × laivan harja 13 m), kolmisivuinen kuori, neljä suippoikkunaa per sivu.</summary>
        public static Verkko TyyppiKirkkoPieni(string paikka = "lansi", int torneja = 1, string huippu = "pyramidi")
        {
            var r = TyRakentaja();
            float x0 = -12f, x1 = 12f, z0 = -5.5f, z1 = 5.5f, y = 7f, h = 6f;
            TySeinat(r, x0, x1, z0, z1, 0f, y, TyKivi);
            TyHarja(r, x0, x1, z0, z1, y, h, 0.5f, TyKatto, TyKivi, paikka == "risteys" || torneja >= 2, true);   // länsipääty näkyy, ellei yksi länsitorni peitä
            TyKuori(r, x1, 0f, 4f, y - 1f, 4f, 3, TyKivi, TyKatto);
            TyIkkunat(r, x0 + 6f, z1, x1, z1, 4.5f, 1.2f, 2.5f, 5.6f, true, TyAukko);
            TyIkkunat(r, x1, z0, x0 + 6f, z0, 4.5f, 1.2f, 2.5f, 5.6f, true, TyAukko);
            TyKirkonTornit(r, x0, x1, z1, y + h, paikka, torneja, huippu, 6f, 15f, 26f, 1, 2f);
            return r.Valmis();
        }

        /// <summary>KIRKKO KESKI (seurakuntakirkko): laiva 46 × 18 m, räystäs 13 m, harja 22 m, viisisivuinen kuori, länsitorni 9 m kahdeksankulmaisella
        /// neulalla 46 m:iin (≈ 2,1 × harja), viisi suippoikkunaa per sivu ja ruusuikkuna länsipäädyssä (ei näy tornin takaa, joten pois).</summary>
        public static Verkko TyyppiKirkkoKeski(string paikka = "lansi", int torneja = 1, string huippu = "neula")
        {
            var r = TyRakentaja();
            float x0 = -23f, x1 = 23f, z0 = -9f, z1 = 9f, y = 13f, h = 9f;
            TySeinat(r, x0, x1, z0, z1, 0f, y, TyKivi);
            TyHarja(r, x0, x1, z0, z1, y, h, 0.6f, TyKatto, TyKivi, true, true);
            TyKuori(r, x1, 0f, 7f, y - 1.5f, 6f, 5, TyKivi, TyKatto);
            TyIkkunat(r, x0 + 4f, z1, x1, z1, 7f, 1.8f, 3.5f, 10.5f, true, TyAukko);
            TyIkkunat(r, x1, z0, x0 + 4f, z0, 7f, 1.8f, 3.5f, 10.5f, true, TyAukko);
            TyKirkonTornit(r, x0, x1, z1, y + h, paikka, torneja, huippu, 9f, 28f, 46f, 2, 1.5f);
            return r.Valmis();
        }

        /// <summary>KIRKKO SUURI (katedraali): keskilaiva 90 × 14 m räystäs 24 m, harja 33 m; sivulaivat 2 × 9 m räystäs 12 m pulpettikatoin; poikkilaiva
        /// 14 × 48 m keskellä; viisisivuinen kuori; kaksi länsitornia 12 m tasakatoin 58 m:iin (≈ 1,8 × harja); tukipilarit lentotukineen; risteyksen
        /// kattoratsastaja (flèche, NdFleche yksinkertaistettuna) 62 m:iin.</summary>
        public static Verkko TyyppiKirkkoSuuri()
        {
            var r = TyRakentaja();
            float x0 = -45f, x1 = 40f, zl = 7f, zs = 16f, y = 24f, h = 9f, ys = 12f;
            // Keskilaiva ja kuoriosa
            TySeinat(r, x0, x1, -zl, zl, 0f, y, TyKivi);
            TyHarja(r, x0, x1, -zl, zl, y, h, 0.5f, TyKatto, TyKivi, false, false);
            TyKuori(r, x1, 0f, zl, y, 7f, 5, TyKivi, TyKatto);
            TyKuori(r, x1, 0f, zs, ys, 4f, 5, TyKivi, TyKatto);
            // Sivulaivat
            foreach (float s in new[] { -1f, 1f })
            {
                float zu = s * zs;
                var sx = s > 0 ? r.S(x0, zu, x1, zu) : r.S(x1, zu, x0, zu);
                sx.Pinta(0f, sx.Pituus, 0f, ys, 0f, TyKivi);
                TyPulpetti(r, x0, x1, zu, s * zl, ys, ys + 4f, TyKatto);
                // Ikkunat tukipilarien väleihin (sama jako kuin TyTukipilarit): sivulaivan ikkunat ja keskilaivan yläikkunat (kleresteori).
                int n = Math.Max(1, (int)((x1 - x0 - 12f) / 7f)); float jakso = (x1 - x0 - 12f) / n;
                var sa = s > 0 ? r.S(x0, zu, x1, zu) : r.S(x1, zu, x0, zu);
                var sk = s > 0 ? r.S(x0, s * zl, x1, s * zl) : r.S(x1, s * zl, x0, s * zl);
                for (int i = 0; i < n; i++)
                {
                    float xm = x0 + 12f + (i + 0.5f) * jakso, u = s > 0 ? xm - x0 : x1 - xm;
                    Suippo(r, sa, u, 3f, 10f, 2.4f, 0.05f, TyAukko);
                    Suippo(r, sk, u, 16.8f, 22.5f, 2.6f, 0.05f, TyAukko);
                }
                TyTukipilarit(r, x0 + 12f, x1, 7f, zu + s * 1.6f, s * zl, ys + 2f, y - 3f, TyKivi);
            }
            // Sivulaivojen päätyseinät (länsi): tornit peittävät suurimman osan.
            // Poikkilaiva
            float px0 = 0f, px1 = 14f, pz = 24f;
            TySeinat(r, px0, px1, -pz, pz, 0f, y, TyKivi);
            r.Neli(new P3(px0 - 0.5f, y, -pz - 0.5f), new P3(px0 - 0.5f, y, pz + 0.5f), new P3((px0 + px1) / 2f, y + h, pz + 0.5f), new P3((px0 + px1) / 2f, y + h, -pz - 0.5f), TyKatto, new P3(-1f, 1f, 0f));
            r.Neli(new P3(px1 + 0.5f, y, pz + 0.5f), new P3(px1 + 0.5f, y, -pz - 0.5f), new P3((px0 + px1) / 2f, y + h, -pz - 0.5f), new P3((px0 + px1) / 2f, y + h, pz + 0.5f), TyKatto, new P3(1f, 1f, 0f));
            foreach (float s in new[] { -1f, 1f })
            {
                r.Kolmio(new P3(px0, y, s * pz), new P3(px1, y, s * pz), new P3((px0 + px1) / 2f, y + h, s * pz), TyKivi, new P3(0f, 0f, s));
                var ps = s > 0 ? r.S(px0, pz, px1, pz) : r.S(px1, -pz, px0, -pz);
                Rengas(r, ps, 7f, 17f, 0f, 4.2f, 0.06f, TyAukko, 10);   // poikkilaivan ruusuikkuna
            }
            // Länsijulkisivu: tornien välinen keskiosa ruusuineen ja portaalit
            r.Laatikko(x0 - 10f, x0, 0f, 34f, -zl, zl, TyKivi, TyKatto);
            var lj = r.S(x0 - 10f, -zl, x0 - 10f, zl);
            Rengas(r, lj, zl, 24f, 0f, 4.6f, 0.06f, TyAukko, 12);
            for (int i = -1; i <= 1; i++) Suippo(r, r.S(x0 - 10f, -zs - 2f, x0 - 10f, zs + 2f), zs + 2f + i * 11f, 0f, 9f, i == 0 ? 5f : 3.6f, 0.07f, TyAukko);
            TyTorni(r, x0 - 4f, -(zl + 4.5f) - 1f, 12f, 56f, 0f, 0, 2, TyKivi, TyAukko, TyHuippu);
            TyTorni(r, x0 - 4f, zl + 4.5f + 1f, 12f, 56f, 0f, 0, 2, TyKivi, TyAukko, TyHuippu);
            // Kattoratsastaja risteyksessä
            r.Pyora(7f, 0f, new[] { (2.2f, y + h - 1f), (2.2f, y + h + 6f), (0f, 62f) }, 8, TyHuippu, (float)Math.PI / 8f, (float)(Math.PI * 2.0), 1f, false);
            return r.Valmis();
        }

        /// <summary>ASEMA (pääteasema): julkisivurakennus 64 × 16 m räystäs 20 m keskikaarella ja kellolla, kulmapaviljongit 26 m; sen takana kaareva
        /// hallikatto 60 × 140 m pitkän akselin suuntaan (lasinauha harjalla, lasinen pääty raiteiden suuntaan).</summary>
        public static Verkko TyyppiAsema()
        {
            var r = TyRakentaja();
            const float Pii = (float)Math.PI;
            // Halli: x 0…140, z ±30, seinät 9 m, kaari nousee 18 m (puoliellipsi), 10 jaksoa.
            float hx0 = 0f, hx1 = 140f, hz = 30f, hy = 9f, nousu = 18f;
            TySeinat(r, hx0, hx1, -hz, hz, 0f, hy, TyKiviVarjo);
            const int K = 10;
            P3 Kaari(float x, int j) { float a = Pii * j / K; return new P3(x, hy + nousu * (float)Math.Sin(a), hz * (float)Math.Cos(a)); }
            for (int j = 0; j < K; j++)
            {
                var v = (j == K / 2 - 1 || j == K / 2) ? TyLasi : TyKatto;
                var a0 = Kaari(hx0 - 1f, j); var a1 = Kaari(hx1, j); var b1 = Kaari(hx1, j + 1); var b0 = Kaari(hx0 - 1f, j + 1);
                var keski = Kaari(0f, j); var nn = new P3(0f, keski.Y - hy + 0.01f, keski.Z);
                r.Neli(a0, a1, b1, b0, v, nn);
                // Päätylasi raiteiden puolella
                r.Kolmio(new P3(hx1, hy, 0f), Kaari(hx1, j), Kaari(hx1, j + 1), TyLasi, new P3(1f, 0f, 0f));
            }
            // Kaarten ripojen rytmi lasin päällä: ohuet tummat raidat
            for (float x = 14f; x < hx1; x += 14f)
                for (int j = 0; j < K; j++)
                {
                    var a = Kaari(x, j); var b = Kaari(x, j + 1); var no = new P3(0f, a.Y - hy + 0.01f, a.Z);
                    float k = 1.04f;
                    P3 Ul(P3 p, float dx) => new P3(p.X + dx, hy + (p.Y - hy) * k, p.Z * k);
                    r.Neli(Ul(a, -0.5f), Ul(a, 0.5f), Ul(b, 0.5f), Ul(b, -0.5f), TyRauta, no);
                }
            // Julkisivurakennus x −16…0, z ±32, räystäs 20, matala mansardi; kulmapaviljongit 10 × 10 m räystäs 26 m pyramidikatoin
            float fx0 = -16f, fx1 = 0f, fz = 32f, fy = 20f;
            r.Laatikko(fx0, fx1, 0f, fy, -fz, fz, TyKivi, TyKatto);
            r.Katto(fx0, fx1, -fz + 10f, fz - 10f, new[] { (0f, 0f, fy), (2.5f, 2.5f, fy + 4f) }, TyKatto, TyKatto);
            foreach (float s in new[] { -1f, 1f })
            {
                float zc = s * (fz - 5f);
                r.Laatikko(fx0 - 1f, fx0 + 10f, 0f, 26f, zc - 5.5f, zc + 5.5f, TyKivi, TyKatto);
                r.Pyora(fx0 + 4.5f, zc, new[] { (5.5f * 1.4142f, 26f), (0f, 33f) }, 4, TyKatto, 0.7854f);
            }
            var j0 = r.S(fx0, -fz + 11f, fx0, fz - 11f);   // länsijulkisivu (kasvot −x)
            float L = j0.Pituus, c = L / 2f;
            // Suuri keskikaari (hallin pääty näkyy julkisivussa) ja kello sen yllä
            j0.Pinta(c - 8f, c + 8f, 0f, 10f, 0.06f, TyAukko);
            j0.KaariTayte(c, 10f, 8f, 0.06f, TyLasi, 8);
            TyKello(r, j0, c, 16.5f, 2.2f);
            // Sivujen kaariovet ja yläkerran ikkunat
            for (int i = 0; i < 4; i++)
            {
                float u1 = 4f + i * 3.6f, u2 = L - 4f - i * 3.6f;
                foreach (float u in new[] { u1, u2 }) { j0.Pinta(u - 1.1f, u + 1.1f, 0f, 4.5f, 0.05f, TyAukko); j0.KaariTayte(u, 4.5f, 1.1f, 0.05f, TyAukko, 4); j0.Pinta(u - 0.8f, u + 0.8f, 8f, 12f, 0.05f, TyAukko); }
            }
            return r.Valmis();
        }

        /// <summary>PALATSI: suorakaide 100 × 28 m, räystäs 16 m, mansardikatto (jyrkkä 5 m + loiva 2 m), kulmapaviljongit 18 × 32 m räystäs 18 m korkeammalla
        /// mansardilla, keskirisaliitti kolmiopäätyineen; pohjakerros kaarirytminä, kaksi ikkunakerrosta.</summary>
        public static Verkko TyyppiPalatsi()
        {
            var r = TyRakentaja();
            float x0 = -50f, x1 = 50f, z0 = -14f, z1 = 14f, y = 16f;
            r.Laatikko(x0 + 16f, x1 - 16f, 0f, y, z0, z1, TyKivi, TyKatto);
            r.Katto(x0 + 16f, x1 - 16f, z0, z1, new[] { (0f, 0f, y), (0f, 1.8f, y + 5f), (0f, 9f, y + 7f) }, TyKatto, TyKatto);
            foreach (float s in new[] { -1f, 1f })
            {
                float a = s < 0 ? x0 : x1 - 18f, b = a + 18f;
                r.Laatikko(a, b, 0f, y + 2f, z0 - 2f, z1 + 2f, TyKivi, TyKatto);
                r.Katto(a, b, z0 - 2f, z1 + 2f, new[] { (0f, 0f, y + 2f), (1.8f, 1.8f, y + 8f), (6f, 10f, y + 10f) }, TyKatto, TyKatto);
            }
            // Keskirisaliitti ja kolmiopääty pihan puolelle (+z)
            r.Laatikko(-10f, 10f, 0f, y + 1f, z1 - 0.5f, z1 + 1.5f, TyKivi, TyKatto);
            r.Kolmio(new P3(-10f, y + 1f, z1 + 1.5f), new P3(10f, y + 1f, z1 + 1.5f), new P3(0f, y + 6f, z1 + 1.5f), TyKivi, new P3(0f, 0f, 1f));
            r.Neli(new P3(-10.3f, y + 1f, z1 + 1.8f), new P3(0f, y + 6.2f, z1 + 1.8f), new P3(0f, y + 6.2f, z1 - 4f), new P3(-10.3f, y + 1f, z1 - 4f), TyKatto, new P3(-1f, 2f, 0f));
            r.Neli(new P3(10.3f, y + 1f, z1 + 1.8f), new P3(0f, y + 6.2f, z1 + 1.8f), new P3(0f, y + 6.2f, z1 - 4f), new P3(10.3f, y + 1f, z1 - 4f), TyKatto, new P3(1f, 2f, 0f));
            // Julkisivu +z: pohjakerroksen kaaret ja kaksi ikkunakerrosta, vyö 5,5 m
            foreach (var (u0, u1, zz) in new[] { (x0 + 16f, -10f, z1), (10f, x1 - 16f, z1), (x0, x0 + 18f, z1 + 2f), (x1 - 18f, x1, z1 + 2f), (-10f, 10f, z1 + 1.5f) })
                foreach (float s in new[] { 1f, -1f })
                {
                    // Seinä a → b ulkopuoli oikealla: +z-sivulla länsi → itä, −z-sivulla itä → länsi.
                    float a0 = s > 0 ? u0 : u1, a1 = s > 0 ? u1 : u0, z = s > 0 ? zz : -(zz - (zz == z1 + 1.5f ? 1.5f : 0f));
                    if (s < 0 && zz == z1 + 1.5f) continue;   // keskirisaliitti vain pihan puolella
                    OsaKaarikaytava(r, a0, z, a1, z, 4.2f, 1.6f, 2.2f, 0f, 3.2f, TyAukko, 5.5f, TyKiviVarjo);
                    TyIkkunat(r, a0, z, a1, z, 4.2f, 1.8f, 7.5f, 10.5f, false, TyAukko);
                    TyIkkunat(r, a0, z, a1, z, 4.2f, 1.8f, 12f, 14.5f, false, TyAukko);
                }
            return r.Valmis();
        }

        /// <summary>TORNIN PARAMETRIT (KK 23.05 kohta 2: paikka, määrä ja huippu parametreina, ei uusina tyyppeinä). paikka "lansi" | "risteys",
        /// torneja 1 | 2, huippu "pyramidi" | "neula" | "tasakatto". Länsi 1: torni keskiviivalla länsipäädyn edessä (sisään sisennys m), ovi tornissa.
        /// Länsi 2: tornipari julkisivun kulmissa, ovi laivan päädyssä. Risteys 1: torni harjan läpi kuoren puoleiseen kolmannekseen (kaakko-Eurooppa,
        /// romaaninen), länsipäätyyn ovi. Risteys 2: tornit kuoren molemmin puolin (kuoritornit). Tasakatto saa kaiteen (TyTorni sivuja 0).</summary>
        static void TyKirkonTornit(Rakentaja r, float x0, float x1, float zl, float yHarja, string paikka, int torneja, string huippu, float w, float yRunko,
            float yKarki, int aukkoja, float sisennys)
        {
            int sivuja = huippu == "pyramidi" ? 4 : huippu == "neula" ? 8 : 0;
            bool lansi = paikka != "risteys";
            float korkeus = yRunko, karki = yKarki;
            if (torneja >= 2) { w *= 0.8f; korkeus *= 0.92f; karki *= 0.9f; }   // pari: kumpikin hieman kapeampi ja matalampi
            if (sivuja == 0) karki = 0f;
            if (lansi && torneja < 2)
            {
                float cx = x0 - w * 0.5f + sisennys;
                TyTorni(r, cx, 0f, w, korkeus, karki, sivuja, aukkoja, TyKivi, TyAukko, TyHuippu);
                var s = new Seina(r, cx - w * 0.5f, -w * 0.5f, cx - w * 0.5f, w * 0.5f);
                Suippo(r, s, w * 0.5f, 0f, w * 0.65f, w * 0.29f, 0.06f, TyAukko);
                return;
            }
            var ovi = new Seina(r, x0, -zl, x0, zl);
            Suippo(r, ovi, zl, 0f, Math.Min(w * 0.65f, yHarja * 0.4f), w * 0.29f, 0.06f, TyAukko);
            if (lansi)
                foreach (float s in new[] { -1f, 1f }) TyTorni(r, x0 + w * 0.5f - sisennys, s * (zl + w * 0.5f - 1f), w, korkeus, karki, sivuja, aukkoja, TyKivi, TyAukko, TyHuippu);
            else if (torneja < 2)
                TyTorni(r, x1 - (x1 - x0) * 0.3f, 0f, Math.Min(w, zl * 1.6f), Math.Max(korkeus, yHarja + w * 1.2f), karki, sivuja, aukkoja, TyKivi, TyAukko, TyHuippu);
            else
                foreach (float s in new[] { -1f, 1f }) TyTorni(r, x1 - w * 0.5f, s * (zl + w * 0.5f - 0.5f), w, korkeus, karki, sivuja, aukkoja, TyKivi, TyAukko, TyHuippu);
        }

        /// <summary>Kaksi verkkoa yhteen; b kierretään ensin 90° y-akselin ympäri (x, z) → (z, −x) ja siirretään (dx, 0, dz). Osat, jotka on kirjoitettu
        /// akselille z (OsaPylvasPaaty), saadaan näin länsijulkisivulle (−x).</summary>
        static Verkko TyYhdista(Verkko a, Verkko b, bool kierra, float dx, float dz)
        {
            float[] Liita(float[] p, float[] q) { if (p == null || q == null) return null; var t = new float[p.Length + q.Length]; p.CopyTo(t, 0); q.CopyTo(t, p.Length); return t; }
            var bp = (float[])b.Paikat.Clone(); var bn = (float[])b.Normaalit.Clone();
            for (int i = 0; i + 2 < bp.Length; i += 3)
            {
                if (kierra) { float x = bp[i], z = bp[i + 2]; bp[i] = z; bp[i + 2] = -x; float nx = bn[i], nz = bn[i + 2]; bn[i] = nz; bn[i + 2] = -nx; }
                bp[i] += dx; bp[i + 2] += dz;
            }
            var v = new Verkko { Paikat = Liita(a.Paikat, bp), Normaalit = Liita(a.Normaalit, bn), Varit = Liita(a.Varit, b.Varit), Syvyys = Liita(a.Syvyys, b.Syvyys) };
            v.MinX = v.MinY = v.MinZ = float.MaxValue; v.MaxX = v.MaxY = v.MaxZ = float.MinValue;
            for (int i = 0; i + 2 < v.Paikat.Length; i += 3)
            {
                v.MinX = Math.Min(v.MinX, v.Paikat[i]); v.MaxX = Math.Max(v.MaxX, v.Paikat[i]);
                v.MinY = Math.Min(v.MinY, v.Paikat[i + 1]); v.MaxY = Math.Max(v.MaxY, v.Paikat[i + 1]);
                v.MinZ = Math.Min(v.MinZ, v.Paikat[i + 2]); v.MaxZ = Math.Max(v.MaxZ, v.Paikat[i + 2]);
            }
            return v;
        }

        /// <summary>OsaKupoli ja OsaRumpu sivumäärä parametrina (osakirjastossa kiinteä 32; tyyppimallin kolmioraja 1 500 vaatii 16). Ehdotus irrotukseen:
        /// valinnainen parametri sivuja = 32 osakirjastoon, jolloin ikonit pysyvät tavulleen samoina ja nämä kopiot poistuvat.</summary>
        static float TyKupoli(Rakentaja r, float cx, float cz, float y, float sade, float korkeus, Vari kupoli, Vari kivi, Vari aukko, int rivat, float lyhtySade, float huippuY, int sivuja, int k = 9)
        {
            int K = k;
            float tays = (float)(Math.PI * 2.0);
            float laki = Math.Max(lyhtySade, 0.5f) / sade;
            var q = new (float r, float y)[K + 1];
            for (int j = 0; j <= K; j++)
            {
                float th = j / (float)K * (float)Math.Acos(laki);
                q[j] = (sade * (float)Math.Cos(th), y + korkeus * (float)Math.Sin(th));
            }
            r.Pyora(cx, cz, q, sivuja, kupoli, 0f, tays, 1f, false);
            for (int i = 0; i < rivat; i++)
            {
                float a = i * tays / rivat;
                var qq = new (float r, float y)[K + 1];
                for (int j = 0; j <= K; j++) qq[j] = (q[j].r + 0.12f, q[j].y);
                r.Pyora(cx, cz, qq, 1, kupoli.Kerro(0.82f), a, tays / rivat * 0.12f, 1f, false);
            }
            float yl = q[K].y, lk = Math.Max(3f, lyhtySade * 2.2f);
            r.Pyora(cx, cz, new[] { (lyhtySade, yl), (lyhtySade, yl + lk) }, 12, aukko, 0f, tays, 1f, false);
            for (int i = 0; i < 8; i++)
            {
                float a = i * tays / 8f;
                Palkki(r, new P3(cx + lyhtySade * 1.15f * (float)Math.Cos(a), yl, cz + lyhtySade * 1.15f * (float)Math.Sin(a)),
                    new P3(cx + lyhtySade * 1.15f * (float)Math.Cos(a), yl + lk, cz + lyhtySade * 1.15f * (float)Math.Sin(a)), Math.Max(0.4f, lyhtySade * 0.23f), kivi);
            }
            float ky = yl + lk;
            r.Pyora(cx, cz, new[] { (lyhtySade * 1.35f, ky), (lyhtySade * 1.35f, ky + 0.6f), (lyhtySade, ky + 1.2f), (lyhtySade * 0.55f, ky + 2.6f), (lyhtySade * 0.2f, ky + 3.4f) }, 12, kupoli);
            if (huippuY > ky + 3.3f) r.Piikki(cx, cz, ky + 3.3f, huippuY - (ky + 3.3f), Math.Max(0.3f, lyhtySade * 0.17f), kivi);
            return yl;
        }

        static void TyRumpu(Rakentaja r, float cx, float cz, float y0, float rUlko, float rSeina, float yPylvas, float rYla, float yYla, int nPylvas, int nIkkuna, Vari kivi, Vari varjo, Vari aukko, int sivuja)
        {
            float tays = (float)(Math.PI * 2.0), y1 = y0 + 1f;
            r.Pyora(cx, cz, new[] { (rUlko, y0), (rUlko, y1), (rSeina, y1) }, sivuja, kivi, 0f, tays, 1f, false);
            r.Pyora(cx, cz, new[] { (rSeina, y1), (rSeina, yPylvas + 0.4f) }, sivuja, varjo, 0f, tays, 1f, false);
            for (int i = 0; i < nPylvas; i++)
            {
                float a = (i + 0.5f) * tays / nPylvas;
                SpPylvaat(r, cx + (rSeina + 2.6f) * (float)Math.Cos(a), cz + (rSeina + 2.6f) * (float)Math.Sin(a), y1, yPylvas, 0.7f, kivi);
            }
            float ya = yPylvas + 3.2f;
            r.Pyora(cx, cz, new[] { (rSeina, yPylvas), (rUlko - 0.2f, yPylvas), (rUlko - 0.2f, yPylvas + 2f), (rUlko - 0.6f, yPylvas + 2f), (rUlko - 0.6f, ya), (rYla, ya) }, sivuja, kivi, 0f, tays, 1f, false);
            r.Pyora(cx, cz, new[] { (rYla, ya), (rYla, yYla - 0.8f), (rYla + 0.4f, yYla - 0.4f), (rYla - 0.2f, yYla) }, sivuja, kivi, 0f, tays, 1f, false);
            for (int i = 0; i < nIkkuna; i++)
            {
                float levy = tays / nIkkuna;
                r.Pyora(cx, cz, new[] { (rYla + 0.05f, ya + 1f), (rYla + 0.05f, ya + 3.2f) }, 1, aukko, i * levy, levy * 0.35f, 1f, false);
            }
        }

        /// <summary>KUPOLIKIRKKO (KK 23.05 kohta 1; Val-de-Grâce, Institut, Saint-Paul-Saint-Louis; myös Rooma, Wien, Lontoo): latinalainen risti,
        /// laiva 32 × 16 m räystäs 18 m harjakatolla, poikkilaiva 14 × 34 m, risteyksessä neliöjalusta 22 m:iin, sen päällä OsaRumpu (8 pylvästä,
        /// 8 ikkunaa) 35 m:iin ja OsaKupoli (lyijy, 8 ripaa, lyhty) huippuun 58 m; kuori 12 m ja puolipyöreä apsis itään. Länsijulkisivu kaksikerroksinen
        /// pääty 26 m; pylvaspaaty = OsaPylvasPaaty (4 pylvästä) julkisivun eteen, muuten kaari-ovi ja ikkuna.</summary>
        public static Verkko TyyppiKupolikirkko(bool pylvaspaaty = true)
        {
            var r = TyRakentaja();
            float x0 = -32f, y = 18f, h = 6f, zl = 8f, cx = 9f;
            // Laiva, risteys, kuori
            TySeinat(r, x0, 0f, -zl, zl, 0f, y, TyKivi);
            TyHarja(r, x0, 0f, -zl, zl, y, h, 0.4f, TyKatto, TyKivi, false, false);
            r.Laatikko(0f, 18f, 0f, 22f, -9f, 9f, TyKivi, TyKatto);
            TySeinat(r, 18f, 30f, -7f, 7f, 0f, 16f, TyKivi);
            TyHarja(r, 18f, 30f, -7f, 7f, 16f, 5f, 0.4f, TyKatto, TyKivi, false, false);
            TyKuori(r, 30f, 0f, 7f, 16f, 4.5f, 5, TyKivi, TyKatto);
            // Poikkilaiva z:n suuntaan; harja z:n suuntaan kolmiopäätyineen
            TySeinat(r, 2f, 16f, -17f, 17f, 0f, y, TyKivi);
            OsaHarjakatto(r, 2f, 16f, -17f, 17f, y, 5f, TyKatto, 0f);
            foreach (float s in new[] { -1f, 1f })
            {
                r.Kolmio(new P3(2f, y, s * 17f), new P3(16f, y, s * 17f), new P3(9f, y + 5f, s * 17f), TyKivi, new P3(0f, 0f, s));
                var ps = s > 0 ? r.S(2f, 17f, 16f, 17f) : r.S(16f, -17f, 2f, -17f);
                ps.Pinta(5f, 9f, 4f, 13f, 0.05f, TyAukko); ps.KaariTayte(7f, 13f, 2f, 0.05f, TyAukko, 4);
            }
            // Laivan ikkunat (kaari-ikkunat, barokki): kolme per sivu
            foreach (float s in new[] { -1f, 1f })
            {
                var sv = s > 0 ? r.S(x0, zl, 0f, zl) : r.S(0f, -zl, x0, -zl);
                for (int i = 0; i < 3; i++) { float u = 8f + i * 9f; sv.Pinta(u - 1.4f, u + 1.4f, 6f, 13f, 0.05f, TyAukko); sv.KaariTayte(u, 13f, 1.4f, 0.05f, TyAukko, 4); }
            }
            // Rumpu ja kupoli osakirjastosta (16 sivua, kupolissa 7 kehää)
            TyRumpu(r, cx, 0f, 22f, 9f, 5.6f, 30f, 6.2f, 35f, 8, 8, TyKivi, TyKiviVarjo, TyAukko, 16);
            TyKupoli(r, cx, 0f, 35f, 6.6f, 10f, TyHuippu, TyKivi, TyAukko, 8, 1.4f, 58f, 16, 7);
            // Länsijulkisivu: leveämpi alakerta, kapeampi yläkerta, kolmiopääty, voluuttien sijaan porrastus
            float fx = x0 - 1.5f;
            r.Laatikko(fx, x0, 0f, 15f, -11f, 11f, TyKivi, TyKatto);
            r.Laatikko(fx + 0.4f, x0, 15f, 23f, -7f, 7f, TyKivi, TyKatto);
            r.Kolmio(new P3(fx + 0.4f, 23f, -7.4f), new P3(fx + 0.4f, 23f, 7.4f), new P3(fx + 0.4f, 27f, 0f), TyKivi, new P3(-1f, 0f, 0f));
            r.Neli(new P3(fx + 0.4f, 23f, -7.4f), new P3(fx + 0.4f, 27f, 0f), new P3(x0, 27f, 0f), new P3(x0, 23f, -7.4f), TyKatto, new P3(0f, 1f, -0.55f));
            r.Neli(new P3(x0, 23f, 7.4f), new P3(x0, 27f, 0f), new P3(fx + 0.4f, 27f, 0f), new P3(fx + 0.4f, 23f, 7.4f), TyKatto, new P3(0f, 1f, 0.55f));
            var ylakerta = r.S(fx + 0.4f, -7f, fx + 0.4f, 7f);
            ylakerta.Pinta(5.6f, 8.4f, 16f, 20.5f, 0.05f, TyAukko); ylakerta.KaariTayte(7f, 20.5f, 1.4f, 0.05f, TyAukko, 4);
            var verkko = r.Valmis();
            if (!pylvaspaaty)
            {
                var r2 = TyRakentaja(); var j = r2.S(fx, -11f, fx, 11f);
                j.Pinta(9f, 13f, 0f, 7f, 0.06f, TyAukko); j.KaariTayte(11f, 7f, 2f, 0.06f, TyAukko, 6);
                foreach (float u in new[] { 4f, 18f }) { j.Pinta(u - 1f, u + 1f, 0f, 4.5f, 0.05f, TyAukko); j.KaariTayte(u, 4.5f, 1f, 0.05f, TyAukko, 4); }
                return TyYhdista(verkko, r2.Valmis(), false, 0f, 0f);
            }
            // Portikko kirjoitetaan akselille z (seinä z = 0, portikko −z:n suuntaan) ja kierretään julkisivun eteen.
            var rp = TyRakentaja();
            OsaPylvasPaaty(rp, 0f, 0f, 7f, 4.5f, 13f, 4, 1, TyKivi, TyKiviVarjo, TyAukko, -1f);
            return TyYhdista(verkko, rp.Valmis(), true, fx, 0f);
        }

        /// <summary>PYLVÄSTEMPPELI (KK 23.25 työ C; Madeleine, Palais Brongniart; myöhemmin Wien ja Ateena): korotettu jalusta (podium) portaineen
        /// etupäässä (−x), umpinainen cella, pylväskehä (peripteros: päädyssä paaty pylvästä, sivuilla sama jako), palkisto ja harja kolmiopäätyineen
        /// (harja = tosi) tai attika ja loiva katto (Brongniart). Pituus ja leveys jalustan mitat; pylväs 0,048 × leveys säteeltään.</summary>
        public static Verkko TyyppiPylvastemppeli(float pituus = 100f, float leveys = 40f, int paaty = 8, bool harja = true)
        {
            var r = TyRakentaja();
            float x0 = -pituus * 0.5f, x1 = pituus * 0.5f, z0 = -leveys * 0.5f, z1 = leveys * 0.5f;
            float yp = Math.Max(2.5f, leveys * 0.15f), yc = yp + leveys * 0.48f, ye = yc + leveys * 0.1f, h = leveys * 0.17f, rp = leveys * 0.024f;
            // Jalusta ja etuportaat (neljä askelmaa koko leveydeltä etupäätyyn)
            r.Laatikko(x0, x1, 0f, yp, z0, z1, TyKivi, TyKivi);
            for (int i = 0; i < 4; i++)
                r.Laatikko(x0 - (4 - i) * yp * 0.45f, x0, 0f, yp * (i + 1) / 4f, z0 + 3f, z1 - 3f, TyKiviVarjo, TyKivi);
            // Cella hieman tummempana pylväiden takana, suuri ovi etuseinässä
            float ci = 2.2f + rp * 2f + leveys * 0.06f;
            TySeinat(r, x0 + ci, x1 - ci, z0 + ci, z1 - ci, yp, yc, TyKiviVarjo);
            var etu = r.S(x0 + ci, z0 + ci, x0 + ci, z1 - ci);
            float ec = etu.Pituus * 0.5f;
            etu.Pinta(ec - leveys * 0.06f, ec + leveys * 0.06f, yp, yp + (yc - yp) * 0.55f, 0.06f, TyAukko);
            // Pylväskehä: päädyissä paaty pylvästä, sivuilla sama jako
            float zz0 = z0 + 1.6f + rp, zz1 = z1 - 1.6f - rp, xx0 = x0 + 1.6f + rp, xx1 = x1 - 1.6f - rp;
            float jako = (zz1 - zz0) / (paaty - 1);
            int sivu = Math.Max(2, (int)Math.Round((xx1 - xx0) / jako) + 1);
            float sjako = (xx1 - xx0) / (sivu - 1);
            for (int i = 0; i < paaty; i++) foreach (float x in new[] { xx0, xx1 }) SpPylvaat(r, x, zz0 + i * jako, yp, yc, rp, TyKivi);
            for (int i = 1; i < sivu - 1; i++) foreach (float z in new[] { zz0, zz1 }) SpPylvaat(r, xx0 + i * sjako, z, yp, yc, rp, TyKivi);
            // Palkisto ja katto
            r.Laatikko(x0 + 0.8f, x1 - 0.8f, yc, ye, z0 + 0.8f, z1 - 0.8f, TyKivi, TyKatto);
            if (harja) TyHarja(r, x0 + 0.8f, x1 - 0.8f, z0 + 0.8f, z1 - 0.8f, ye, h, 0.5f, TyKatto, TyKivi, true, true);
            else
            {
                r.Laatikko(x0 + 0.8f, x1 - 0.8f, ye, ye + leveys * 0.07f, z0 + 0.8f, z1 - 0.8f, TyKivi, TyKatto);   // attika
                OsaHarjakatto(r, x0 + 0.8f, x1 - 0.8f, z0 + 0.8f, z1 - 0.8f, ye + leveys * 0.07f, leveys * 0.08f, TyKatto, 2.5f);
            }
            return r.Valmis();
        }

        /// <summary>TAVALLINEN TALO mittakaavaksi: 16 × 12 m, viisi kerrosta räystääseen 18 m, sinkkinen mansardi 4 m (Pariisin kerrostalo); talojen kivi.</summary>
        public static Verkko TyyppiTalo()
        {
            var r = TyRakentaja();
            r.Laatikko(-8f, 8f, 0f, 18f, -6f, 6f, TaloKivi.Seina, Sinkki);
            r.Katto(-8f, 8f, -6f, 6f, new[] { (0f, 0f, 18f), (1.6f, 1.6f, 21.5f), (3.5f, 3.5f, 22.5f) }, Sinkki, Sinkki);
            for (int k = 0; k < 5; k++) TyIkkunat(r, -8f, 6f, 8f, 6f, 3f, 1.2f, 1.2f + k * 3.4f, 3f + k * 3.4f, false, TyAukko);
            return r.Valmis();
        }

        /// <summary>Kaikki luonnosmallit nimineen ja kokoluokan kolmiorajoineen (0 = ei rajaa).</summary>
        public static List<(string nimi, Verkko v, int raja)> TyyppiLuonnokset() => new List<(string, Verkko, int)>
        {
            ("kirkko-pieni", TyyppiKirkkoPieni(), 400),
            ("kirkko-keski", TyyppiKirkkoKeski(), 900),
            ("kirkko-suuri", TyyppiKirkkoSuuri(), 1500),
            ("asema", TyyppiAsema(), 1500),
            ("palatsi", TyyppiPalatsi(), 1500),
            ("kupolikirkko", TyyppiKupolikirkko(true), 1500),
            ("pylvastemppeli", TyyppiPylvastemppeli(100f, 40f, 8, true), 1500),
            ("pylvastemppeli-attika", TyyppiPylvastemppeli(70f, 42f, 10, false), 1500),
            ("kupolikirkko-ilman", TyyppiKupolikirkko(false), 1500),
            ("kirkko-keski-risteys-1-pyramidi", TyyppiKirkkoKeski("risteys", 1, "pyramidi"), 900),
            ("kirkko-keski-lansi-2-neula", TyyppiKirkkoKeski("lansi", 2, "neula"), 900),
            ("kirkko-keski-lansi-1-tasakatto", TyyppiKirkkoKeski("lansi", 1, "tasakatto"), 900),
            ("kirkko-pieni-risteys-2-pyramidi", TyyppiKirkkoPieni("risteys", 2, "pyramidi"), 400),
            ("talo", TyyppiTalo(), 0),
        };
    }
}
