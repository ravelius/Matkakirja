// TYYPPIMALLIT, LUONNOS (Valoseppä 14.11.2026; KK 22.55 TYÖKALU 2, tehtävänanto 20261111-kolme-tyokalua-tehtavananto.md kohta 2).
// Muodon arviointiin: kirkko kolmessa kokoluokassa, asema ja palatsi + tavallinen talo mittakaavaksi. Paikallinen akseli kuten ikoneissa:
// +Y ylös, x = pitkä akseli (+x itään, kuori), z = leveys. Luonnoksessa pohja on suorakaide; lopullisessa seinät nousevat OSM-pohjasta ja tyyppi
// tuo vain katon, tornin ja julkisivun. Kolmiorajat (KK 21.2x): pieni ~400, keski 900, suuri 1 500.
// Osat ovat olemassa olevasta kirjastosta (Rakentaja, Seina, Sivut, Rengas, Viisari, OsaSeinaRytmi, OsaKaarikaytava); uudet apufunktiot (Ty*) ovat
// irrotettu osakirjastoon (OhjelmaKohdeOsat.cs: OsaTorni, OsaTukipilarit, OsaKellotaulu; OsaKupoli/OsaRumpu sivuja-parametri; KK 15.11. 06.15).
using System;
using System.Collections.Generic;

namespace Matkakirja
{
    public static partial class OhjelmaKohdeGeometria
    {
        // Tasavärit tyyliohjeen mukaan (kohta 2): vaalea lämmin kivi, siniharmaa katto, tumma lyijy tornin huipussa, tummat aukot.
        static readonly Vari TyKivi = Vari.H(0xEADCC0), TyKiviVarjo = Vari.H(0xC9BA9C), TyKatto = Vari.H(0x8E979D), TyHuippu = Vari.H(0x5F666E),
            TyAukko = Vari.H(0x5E5850), TyLasi = Vari.H(0x96958C), TyTaulu = Vari.H(0xF2EEE4), TyViisari = Vari.H(0x2E2E2E), TyRauta = Vari.H(0x6A6F74),
            // Asemahallit (KK 15.11. 04.30 kohta 1): lasi ja hallikatto harmaanvihreinä joen suuntaan (Thames pelikuvassa ≈ #B0AB8B), kirkkaus ja kylläisyys
            // enintään veden tasolla; lasin tuntu ruutujaosta, puitteet lasia tummempina. KK 04.58: yksi yhteinen lähes harmaa (kylläisyys ≤ 0,1) kaikkiin
            // kaupunkeihin, koska harmaanvihreä riiteli Pariisin sinkkikattojen kanssa (Saint-Lazare).
            TyHalli = Vari.H(0x84837A), TyPuite = Vari.H(0x5A5A54);

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

        /// <summary>KIRKKO LEVEÄ (KK 15.11. 00.28 kohta 2; lyhyt ja leveä seurakuntakirkko, pohja noin 34 × 21 m, sivusuhde ~1,6): keskilaiva 22,5 × 10 m
        /// räystäs 12 m, harja 18 m, viisisivuinen kuori; sivulaivat 2 × 5,5 m räystäs 7 m pulpettikatoin keskilaivan seinään 10 m:iin (yläikkunarivi
        /// pulpetin ja räystään väliin); kolme suippoikkunaa sivulaivaa kohti. Torni samoin parametrein (paikka, torneja, huippu) kuin kirkko-keski,
        /// mittakaava laivan mukaan: 8 m, runko 25 m, kärki 40 m (≈ 2,2 × harja, keskellä 2,1).</summary>
        public static Verkko TyyppiKirkkoLevea(string paikka = "lansi", int torneja = 1, string huippu = "neula") =>
            TyKirkkoSivulaivoin(-10.5f, 12f, 5f, 10.5f, 12f, 6f, 7f, 10f, 4f, 3, 2f, 5.6f, 1.6f, 10.4f, 11.6f, 1.4f, paikka, torneja, huippu, 8f, 25f, 40f);

        /// <summary>KIRKKO BASILIKA (KK 15.11. 01.14, viides muoto): leveän rakenne isompana, pohja noin 58 × 38 m. Keskilaiva 41,5 × 18 m räystäs 17 m,
        /// harja 25 m; sivulaivat 2 × 10 m räystäs 9 m pulpettikatoin 14 m:iin; viisi ikkunaa sivulaivaa kohti. Torni seurakuntakirkon mittakaavassa
        /// kuten kirkko-keski (9 m, runko 28 m, kärki 46 m), ei katedraalin.</summary>
        public static Verkko TyyppiKirkkoBasilika(string paikka = "lansi", int torneja = 1, string huippu = "neula") =>
            TyKirkkoSivulaivoin(-21.5f, 20f, 9f, 19f, 17f, 8f, 9f, 14f, 6f, 5, 2.5f, 7.5f, 2f, 14.6f, 16.4f, 1.6f, paikka, torneja, huippu, 9f, 28f, 46f);

        /// <summary>Sivulaivallinen kirkko (leveä, basilika): keskilaiva x0..x1 × ±zl räystäs y harja +h, kuori itään (säde zl, korkeus hk), sivulaivat ±zl..±zs
        /// räystäs ys pulpetilla keskilaivan seinään yp:hen; n suippoikkunaa per sivulaiva (ia0..ia1, leveys il) ja yläikkunat (ik0..ik1, leveys ikl; keskimmäinen pois).</summary>
        static Verkko TyKirkkoSivulaivoin(float x0, float x1, float zl, float zs, float y, float h, float ys, float yp, float hk, int n, float ia0, float ia1, float il,
            float ik0, float ik1, float ikl, string paikka, int torneja, string huippu, float tw, float tRunko, float tKarki)
        {
            var r = TyRakentaja();
            TySeinat(r, x0, x1, -zl, zl, 0f, y, TyKivi);
            TyHarja(r, x0, x1, -zl, zl, y, h, 0.5f, TyKatto, TyKivi, true, true);
            TyKuori(r, x1, 0f, zl, y - 1f, hk, 5, TyKivi, TyKatto);
            foreach (float s in new[] { -1f, 1f })
            {
                float zu = s * zs, zi = s * zl;
                var sa = s > 0 ? r.S(x0, zu, x1, zu) : r.S(x1, zu, x0, zu);
                sa.Pinta(0f, sa.Pituus, 0f, ys, 0f, TyKivi);
                TyPulpetti(r, x0, x1, zu, zi, ys, yp, TyKatto);
                foreach (float xe in new[] { x0, x1 })
                    r.Neli(new P3(xe, 0f, zi), new P3(xe, 0f, zu), new P3(xe, ys, zu), new P3(xe, yp, zi), TyKivi, new P3(xe < 0f ? -1f : 1f, 0f, 0f));
                float jakso = (x1 - x0 - 4f) / n;
                var sk = s > 0 ? r.S(x0, zi, x1, zi) : r.S(x1, zi, x0, zi);
                for (int i = 0; i < n; i++)
                {
                    float xm = x0 + 4f + (i + 0.5f) * jakso, u = s > 0 ? xm - x0 : x1 - xm;
                    Suippo(r, sa, u, ia0, ia1, il, 0.05f, TyAukko);
                    if (n % 2 == 0 || i != n / 2) Suippo(r, sk, u, ik0, ik1, ikl, 0.05f, TyAukko);
                }
            }
            TyKirkonTornit(r, x0, x1, zl, y + h, paikka, torneja, huippu, tw, tRunko, tKarki, 2, 1.5f);
            return r.Valmis();
        }


        /// <summary>JULKISIVUKIRKKO (KK 15.11. kohdat 1 ja 3; Rooma: Gesù, Sant'Andrea della Valle, Sant'Agnese; Pariisi ja Lontoo: tornittomat kuten ND-de-Lorette):
        /// EI TORNIA. Pohja 46 × 24 m (sivusuhde ~1,9, venytys kuten muilla kirkoilla). Keskilaiva ±7 m räystäs 16 m, loiva harja +4 m; sivukappelit ±7..±12 m
        /// räystäs 9 m pulpetilla laivan seinään 12 m:iin; puolipyöreä apsis itään. Länsijulkisivu kaksikerroksinen (barokki): alakerta koko leveydeltä 15 m,
        /// neljä pilasteria, keskiportaali kaarella ja kaksi sivuovea; yläkerta laivan levyinen 15–24 m, kaari-ikkuna, kolmiopääty 28 m:iin; voluuttien
        /// paikalla kalteva olka alakerran reunasta yläkerran kylkeen. kupoli = rumpu ja kupoli risteyksessä (itäpäästä 12 m) lyhtyineen 45 m:iin.</summary>
        public static Verkko TyyppiKirkkoJulkisivu(bool kupoli = true)
        {
            var r = TyRakentaja();
            float x0 = -21f, x1 = 19f, zl = 7f, zs = 12f, y = 16f, h = 4f, ys = 9f, yp = 12f;
            TySeinat(r, x0, x1, -zl, zl, 0f, y, TyKivi);
            TyHarja(r, x0, x1, -zl, zl, y, h, 0.4f, TyKatto, TyKivi, false, true);
            TyKuori(r, x1, 0f, zl, y - 2f, 4f, 5, TyKivi, TyKatto);
            foreach (float s in new[] { -1f, 1f })
            {
                float zu = s * zs, zi = s * zl;
                var sa = s > 0 ? r.S(x0, zu, x1 - 3f, zu) : r.S(x1 - 3f, zu, x0, zu);
                sa.Pinta(0f, sa.Pituus, 0f, ys, 0f, TyKivi);
                TyPulpetti(r, x0, x1 - 3f, zu, zi, ys, yp, TyKatto);
                r.Neli(new P3(x1 - 3f, 0f, zi), new P3(x1 - 3f, 0f, zu), new P3(x1 - 3f, ys, zu), new P3(x1 - 3f, yp, zi), TyKivi, new P3(1f, 0f, 0f));
                // kappelien kaari-ikkunat (barokki) ja laivan lunettirivi pulpetin yllä
                for (int i = 0; i < 4; i++) { float u = 6f + i * 8.5f; sa.Pinta(u - 1.1f, u + 1.1f, 3f, 6.5f, 0.05f, TyAukko); sa.KaariTayte(u, 6.5f, 1.1f, 0.05f, TyAukko, 4); }
                var sk = s > 0 ? r.S(x0, zi, x1, zi) : r.S(x1, zi, x0, zi);
                for (int i = 0; i < 4; i++) { float u = 6f + i * 8.5f; sk.KaariTayte(u, 13f, 1.6f, 0.05f, TyAukko, 4); }
            }
            // Kupoli (KK 15.11. ~03.3x ehto a): rungossa vain risteyksen neliöjalusta, joka venyy rungon mukana; rumpu, kupoli ja lyhty ovat oma jaettu
            // verkko (TyyppiJulkisivuKupoli), jonka peli piirtää jalustan päälle tasaisella mittakaavalla, jotta kupoli pysyy pyöreänä.
            if (kupoli) r.Laatikko(JulkisivuKupoliX - 7f, JulkisivuKupoliX + 7f, 0f, JulkisivuKupoliY, -8f, 8f, TyKivi, TyKatto);
            // Länsijulkisivu x = fx (−x:n suuntaan)
            float fx = x0 - 1.2f, ya = 15f, yy = 24f, yk = 28f;
            r.Laatikko(fx, x0, 0f, ya, -zs, zs, TyKivi, TyKatto);
            r.Laatikko(fx - 0.3f, x0, ya, ya + 1f, -zs - 0.3f, zs + 0.3f, TyKiviVarjo, TyKatto);   // jakolista
            r.Laatikko(fx + 0.3f, x0, ya + 1f, yy, -zl - 0.5f, zl + 0.5f, TyKivi, TyKatto);
            foreach (float s in new[] { -1f, 1f })
            {
                // olka (voluutin paikka): kolmio alakerran reunasta yläkerran kylkeen
                r.Kolmio(new P3(fx + 0.3f, ya + 1f, s * zs), new P3(fx + 0.3f, ya + 1f, s * (zl + 0.5f)), new P3(fx + 0.3f, ya + 6f, s * (zl + 0.5f)), TyKivi, new P3(-1f, 0f, 0f));
                r.Neli(new P3(fx + 0.3f, ya + 1f, s * zs), new P3(fx + 0.3f, ya + 6f, s * (zl + 0.5f)), new P3(x0, ya + 6f, s * (zl + 0.5f)), new P3(x0, ya + 1f, s * zs), TyKatto, new P3(0f, 1f, s));
                // alakerran pilasterit
                foreach (float z in new[] { 3.6f, 10.6f }) r.Laatikko(fx - 0.4f, fx, 0f, ya, s * z - 0.6f, s * z + 0.6f, TyKiviVarjo, TyKivi);
            }
            r.Laatikko(fx - 0.3f, x0, yy, yy + 0.8f, -zl - 0.8f, zl + 0.8f, TyKiviVarjo, TyKatto);
            r.Kolmio(new P3(fx + 0.3f, yy + 0.8f, -zl - 0.5f), new P3(fx + 0.3f, yy + 0.8f, zl + 0.5f), new P3(fx + 0.3f, yk, 0f), TyKivi, new P3(-1f, 0f, 0f));
            float kz = (yk - yy - 0.8f) / (zl + 0.5f);
            r.Neli(new P3(fx + 0.3f, yy + 0.8f, -zl - 0.5f), new P3(fx + 0.3f, yk, 0f), new P3(x0 + 2f, yk, 0f), new P3(x0 + 2f, yy + 0.8f, -zl - 0.5f), TyKatto, new P3(0f, 1f, -kz));
            r.Neli(new P3(x0 + 2f, yy + 0.8f, zl + 0.5f), new P3(x0 + 2f, yk, 0f), new P3(fx + 0.3f, yk, 0f), new P3(fx + 0.3f, yy + 0.8f, zl + 0.5f), TyKatto, new P3(0f, 1f, kz));
            var ala = r.S(fx - 0.4f, -zs, fx - 0.4f, zs);
            ala.Pinta(zs - 1.8f, zs + 1.8f, 0f, 7f, 0.06f, TyAukko); ala.KaariTayte(zs, 7f, 1.8f, 0.06f, TyAukko, 6);
            foreach (float u in new[] { zs - 7.1f, zs + 7.1f }) { ala.Pinta(u - 1f, u + 1f, 0f, 4.5f, 0.05f, TyAukko); ala.KaariTayte(u, 4.5f, 1f, 0.05f, TyAukko, 4); }
            foreach (float u in new[] { zs - 7.1f, zs + 7.1f }) { ala.Pinta(u - 0.9f, u + 0.9f, 8f, 11.5f, 0.05f, TyAukko); ala.KaariTayte(u, 11.5f, 0.9f, 0.05f, TyAukko, 4); }
            var yla = r.S(fx + 0.3f, -zl - 0.5f, fx + 0.3f, zl + 0.5f);
            yla.Pinta(zl + 0.5f - 1.6f, zl + 0.5f + 1.6f, ya + 3f, ya + 6.5f, 0.05f, TyAukko); yla.KaariTayte(zl + 0.5f, ya + 6.5f, 1.6f, 0.05f, TyAukko, 6);
            return r.Valmis();
        }

        /// <summary>Julkisivukirkon kupolin paikka rungossa (risteys itäpäästä 12 m, jalustan yläpinta 19 m).</summary>
        public const float JulkisivuKupoliX = 7f, JulkisivuKupoliY = 19f;

        /// <summary>JULKISIVUKIRKON KUPOLI (KK 15.11. ~03.3x ehdot a ja b): rumpu (8 ikkunaa), kupoli ja lyhty omana verkkona, origo rummun alla jalustan
        /// päällä; huippu 26 m origosta (45 m maasta). Kevyt = pelin versio (12 sivua, 4 kehää, ei ripoja, lyhty ilman pilareita; koko kirkko ≤ 600
        /// kolmiota); kevyt = false on luonnosten alkuperäinen (16 sivua, 7 kehää, 8 ripaa) pariin. Peli: mittakaava s = min(sx, sz) kaikkiin akseleihin,
        /// paikka rungon venytyksestä (JulkisivuKupoliX · sx, JulkisivuKupoliY).</summary>
        public static Verkko TyyppiJulkisivuKupoli(bool kevyt = true)
        {
            var r = TyRakentaja();
            float tays = (float)(Math.PI * 2.0);
            if (!kevyt)
            {
                OsaRumpu(r, 0f, 0f, 0f, 7f, 5.4f, 6f, 5.9f, 9f, 0, 8, TyKivi, TyKiviVarjo, TyAukko, 16);
                OsaKupoli(r, 0f, 0f, 9f, 6.2f, 8.5f, TyHuippu, TyKivi, TyAukko, 8, 1.2f, 26f, 16, 7);
                return r.Valmis();
            }
            const int N = 12;
            // Rumpu: jalustan reunus, seinä ja räystäslista yhtenä profiilina; ikkunat ohuina nauhoina seinän edessä.
            r.Pyora(0f, 0f, new[] { (7f, 0f), (7f, 1f), (5.9f, 1f), (5.9f, 8.2f), (6.4f, 8.6f), (5.9f, 9f) }, N, TyKivi, 0f, tays, 1f, false);
            for (int i = 0; i < 8; i++) { float levy = tays / 8f; r.Pyora(0f, 0f, new[] { (5.95f, 3f), (5.95f, 6.6f) }, 1, TyAukko, i * levy, levy * 0.35f, 1f, false); }
            // Kupoli: neljä kehää lyhdyn juureen (sama kaari kuin alkuperäisessä: säde 6,2, korkeus 8,5).
            const int K = 4; float sade = 6.2f, kork = 8.5f, ly = 1.2f, laki = ly / sade;
            var q = new (float r, float y)[K + 1];
            for (int j = 0; j <= K; j++) { float th = j / (float)K * (float)Math.Acos(laki); q[j] = (sade * (float)Math.Cos(th), 9f + kork * (float)Math.Sin(th)); }
            r.Pyora(0f, 0f, q, N, TyHuippu, 0f, tays, 1f, false);
            // Lyhty: tumma lasiseinä, kivinen hattu kartiona ja piikki 26 m:iin.
            float yl = q[K].y, lk = 3f, ky = yl + lk;
            r.Pyora(0f, 0f, new[] { (ly, yl), (ly, ky) }, 8, TyAukko, 0f, tays, 1f, false);
            r.Pyora(0f, 0f, new[] { (ly * 1.35f, ky), (ly * 1.35f, ky + 0.6f), (ly * 0.2f, ky + 3.4f) }, 8, TyHuippu, 0f, tays, 1f, false);
            r.Piikki(0f, 0f, ky + 3.3f, 26f - (ky + 3.3f), 0.3f, TyKivi);
            return r.Valmis();
        }

        /// <summary>Koko julkisivukirkko yhtenä verkkona kuten peli sen piirtää (luonnoksiin ja arkkeihin): runko venytettynä (sx, 1, sz), kupoli tasaisesti
        /// min(sx, sz) (rajattu 0,6–1,6) jalustan päällä.</summary>
        public static Verkko TyyppiKirkkoJulkisivuKoko(bool kupoli = true, float sx = 1f, float sz = 1f, bool kevyt = true)
        {
            var runko = TyyppiKirkkoJulkisivu(kupoli);
            return kupoli ? TyYhdista(runko, sx, sz, TyyppiJulkisivuKupoli(kevyt), JulkisivuKupoliX, JulkisivuKupoliY) : TyYhdista(runko, sx, sz, null, 0f, 0f);
        }

        /// <summary>Runko venytettynä (sx, 1, sz) ja lisäosa paikkaan (ox · sx, oy, 0) tasaisella mittakaavalla min(sx, sz); normaalit käänteisellä venytyksellä.</summary>
        public static Verkko TyYhdista(Verkko runko, float sx, float sz, Verkko osa, float ox, float oy)
        {
            float s = Math.Max(0.6f, Math.Min(1.6f, Math.Min(sx, sz)));   // KK 15.11. 02.5x: testattu väli 0,6–1,6
            int n1 = runko.Paikat.Length, n2 = osa?.Paikat.Length ?? 0;
            var v = new Verkko { Paikat = new float[n1 + n2], Normaalit = new float[n1 + n2], Varit = new float[n1 + n2], Syvyys = new float[(n1 + n2) / 3] };
            void Kopioi(Verkko l, int o, float kx, float ky, float kz, float tx, float ty)
            {
                for (int i = 0; i < l.Paikat.Length; i += 3)
                {
                    v.Paikat[o + i] = l.Paikat[i] * kx + tx; v.Paikat[o + i + 1] = l.Paikat[i + 1] * ky + ty; v.Paikat[o + i + 2] = l.Paikat[i + 2] * kz;
                    float nx = l.Normaalit[i] / kx, ny = l.Normaalit[i + 1] / ky, nz = l.Normaalit[i + 2] / kz, nl = (float)Math.Sqrt(nx * nx + ny * ny + nz * nz);
                    if (nl > 0f) { nx /= nl; ny /= nl; nz /= nl; }
                    v.Normaalit[o + i] = nx; v.Normaalit[o + i + 1] = ny; v.Normaalit[o + i + 2] = nz;
                    v.Varit[o + i] = l.Varit[i]; v.Varit[o + i + 1] = l.Varit[i + 1]; v.Varit[o + i + 2] = l.Varit[i + 2];
                    v.Syvyys[(o + i) / 3] = l.Syvyys[i / 3];
                }
            }
            Kopioi(runko, 0, sx, 1f, sz, 0f, 0f);
            if (osa != null) Kopioi(osa, n1, s, s, s, ox * sx, oy);
            v.MinX = v.MinY = v.MinZ = float.MaxValue; v.MaxX = v.MaxY = v.MaxZ = float.MinValue;
            for (int i = 0; i < v.Paikat.Length; i += 3)
            {
                v.MinX = Math.Min(v.MinX, v.Paikat[i]); v.MaxX = Math.Max(v.MaxX, v.Paikat[i]);
                v.MinY = Math.Min(v.MinY, v.Paikat[i + 1]); v.MaxY = Math.Max(v.MaxY, v.Paikat[i + 1]);
                v.MinZ = Math.Min(v.MinZ, v.Paikat[i + 2]); v.MaxZ = Math.Max(v.MaxZ, v.Paikat[i + 2]);
            }
            return v;
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
                OsaTukipilarit(r, x0 + 12f, x1, 7f, zu + s * 1.6f, s * zl, ys + 2f, y - 3f, TyKivi);
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
            OsaTorni(r, x0 - 4f, -(zl + 4.5f) - 1f, 12f, 56f, 0f, 0, 2, TyKivi, TyAukko, TyHuippu, TyKatto);
            OsaTorni(r, x0 - 4f, zl + 4.5f + 1f, 12f, 56f, 0f, 0, 2, TyKivi, TyAukko, TyHuippu, TyKatto);
            // Kattoratsastaja risteyksessä
            r.Pyora(7f, 0f, new[] { (2.2f, y + h - 1f), (2.2f, y + h + 6f), (0f, 62f) }, 8, TyHuippu, (float)Math.PI / 8f, (float)(Math.PI * 2.0), 1f, false);
            return r.Valmis();
        }

        /// <summary>ASEMA (pääteasema): julkisivurakennus 16 m syvä räystäs 20 m, kulmapaviljongit 26 m pyramidikatoin, jokaisen hallin päässä keskikaari
        /// ja keskimmäisen yllä kello; sen takana halleja (1–3, KK 23.32 työ E) rinnakkaista kaarevaa hallikattoa pitkän akselin suuntaan (lasinauha harjalla,
        /// lasinen pääty raiteiden suuntaan). pituus × leveys = OSM-pohjan suorakaide; oletus 156 × 60 = luonnos 1:n asema. Kaaren nousu 0,3 × hallin leveys
        /// (enintään 18 m), ripojen väli kasvaa pitkillä halleilla (kolmioraja).</summary>
        /// <summary>Hallien määrä leveydestä (KK 14.11. 23.40 E): hallin leveys 35–65 m, lähin 50 m:ä, 1–5 hallia. Nimilista saa ohittaa.</summary>
        public static int AsemanHallit(float leveys)
        {
            int n = Math.Max(1, Math.Min(5, (int)Math.Round(leveys / 50f)));
            while (n < 5 && leveys / n > 65f) n++;
            while (n > 1 && leveys / n < 35f) n--;
            return n;
        }

        /// <summary>katto = kaupungin talokattojen perusväri sRGB 0xRRGGBB (KK 15.11. 05.22: vie.py kirjoittaa p2:een samasta lähteestä kuin talopalat;
        /// 0 = yhteinen lähes harmaa). Hallikatto = katto, lasi = katto +6 % kirkkaus, puitteet = katto × 0,62 (sRGB-kanavittain).</summary>
        static (Vari halli, Vari lasi, Vari puite) AsemanVarit(int katto)
        {
            if (katto <= 0 || katto > 0xFFFFFF) return (TyHalli, TyLasi, TyPuite);
            int K(int rgb, float k) { int c(int s) => Math.Min(255, (int)Math.Round(((rgb >> s) & 255) * k)); return (c(16) << 16) | (c(8) << 8) | c(0); }
            return (Vari.H(katto), Vari.H(K(katto, 1.06f)), Vari.H(K(katto, 0.62f)));
        }

        public static Verkko TyyppiAsema(int halleja = 1, float pituus = 156f, float leveys = 60f, int katto = 0)
        {
            // Vanha malli (ei leikkausta): julkisivu x = −16 … 0, hallit 0 … pituus − 16 kaikilla kaistoilla, julkisivu 2 m leveämpi kummaltakin sivulta.
            var alku = new float[halleja]; var loppu = new float[halleja]; var jul = new bool[halleja];
            for (int h = 0; h < halleja; h++) { alku[h] = 0f; loppu[h] = pituus - 16f; jul[h] = true; }
            return TyAsema(halleja, leveys, alku, loppu, jul, 2f, katto);
        }

        /// <summary>ASEMA KAISTOITTAIN (KK 15.11. 06.20 päätös B: hallit pohjan sisään). Kaista h: z = −leveys/2 + h · leveys/halleja …, hallikatto
        /// alku[h] … loppu[h] (mukana, jos loppu &gt; alku). julkisivu[h]: julkisivurakennus (16 m) kaistan eteen x = alku − 16 … alku ja holvi alkaa
        /// alku − 1; muilla kaistoilla lasipääty molemmissa päissä. Julkisivu kattaa kaistat j0…j1 (ensimmäinen … viimeinen julkisivukaista) ja on
        /// lisa m leveämpi kummaltakin sivulta (vanha malli 2, uusi 0); kellopääty keskimmäisen julkisivukaistan kohdalla. Sivuseinät kaistoittain
        /// (vierekkäiset samanmittaiset kaistat yhtenä laatikkona).</summary>
        public static Verkko TyAsema(int halleja, float leveys, float[] alku, float[] loppu, bool[] julkisivu, float lisa, int katto)
        {
            var r = TyRakentaja();
            var (vHalli, vLasi, vPuite) = AsemanVarit(katto);
            const float Pii = (float)Math.PI;
            float hy = 9f, hl = leveys / halleja, hz = hl * 0.5f, nousu = Math.Min(18f, hl * 0.3f), harja = hy + nousu;
            float Z(int k) => k == 0 ? -leveys * 0.5f : k == halleja ? leveys * 0.5f : -leveys * 0.5f + k * hl;
            bool Mukana(int k) => loppu[k] > alku[k];
            int j0 = -1, j1 = -1;
            for (int h = 0; h < halleja; h++) if (Mukana(h) && julkisivu[h]) { if (j0 < 0) j0 = h; j1 = h; }
            // Sivuseinät: vierekkäiset kaistat, joilla sama alku ja loppu (julkisivukaistoilla alku − 1 ei vaikuta), yhtenä laatikkona.
            for (int h = 0; h < halleja; )
            {
                if (!Mukana(h)) { h++; continue; }
                int e = h + 1;
                while (e < halleja && Mukana(e) && alku[e] == alku[h] && loppu[e] == loppu[h]) e++;
                TySeinat(r, alku[h], loppu[h], Z(h), Z(e), 0f, hy, TyKiviVarjo);
                h = e;
            }
            const int K = 10;
            for (int h = 0; h < halleja; h++)
            {
                if (!Mukana(h)) continue;
                float zc = -leveys * 0.5f + hz + h * hl, hx0 = alku[h], hx1 = loppu[h], xa = julkisivu[h] ? hx0 - 1f : hx0, rivi = Math.Max(14f, (hx1 - hx0) / 10f);
                P3 Kaari(float x, int j) { float a = Pii * j / K; return new P3(x, hy + nousu * (float)Math.Sin(a), zc + hz * (float)Math.Cos(a)); }
                for (int j = 0; j < K; j++)
                {
                    var v = (j == K / 2 - 1 || j == K / 2) ? vLasi : vHalli;
                    var a0 = Kaari(xa, j); var a1 = Kaari(hx1, j); var b1 = Kaari(hx1, j + 1); var b0 = Kaari(xa, j + 1);
                    var keski = Kaari(0f, j); var nn = new P3(0f, keski.Y - hy + 0.01f, keski.Z - zc);
                    r.Neli(a0, a1, b1, b0, v, nn);
                    r.Kolmio(new P3(hx1, hy, zc), Kaari(hx1, j), Kaari(hx1, j + 1), vLasi, new P3(1f, 0f, 0f));
                    if (!julkisivu[h]) r.Kolmio(new P3(hx0, hy, zc), Kaari(hx0, j), Kaari(hx0, j + 1), vLasi, new P3(-1f, 0f, 0f));
                }
                for (float x = hx0 + rivi; x < hx1; x += rivi)
                    for (int j = 0; j < K; j++)
                    {
                        var a = Kaari(x, j); var b = Kaari(x, j + 1); var no = new P3(0f, a.Y - hy + 0.01f, a.Z - zc);
                        float k = 1.04f;
                        P3 Ul(P3 p, float dx) => new P3(p.X + dx, hy + (p.Y - hy) * k, zc + (p.Z - zc) * k);
                        r.Neli(Ul(a, -0.5f), Ul(a, 0.5f), Ul(b, 0.5f), Ul(b, -0.5f), vPuite, no);
                    }
            }
            if (j0 < 0) return r.Valmis();
            // KK 14.11. 23.40 E: julkisivurakennus vähintään 0,8 × hallin harjakorkeus, kellopääty harjan yli (keskimmäisen julkisivuhallin kohdalla).
            // Koko leveys: zf = 0 ja fz = leveys/2 + lisa suoraan (vanha malli tavulleen sama), muuten julkisivukaistojen väli.
            float fx1 = alku[j0], fx0 = fx1 - 16f, zf, fz;
            if (j0 == 0 && j1 == halleja - 1) { zf = 0f; fz = leveys * 0.5f + lisa; }
            else { float zlo = Z(j0), zhi = Z(j1 + 1); zf = (zlo + zhi) * 0.5f; fz = (zhi - zlo) * 0.5f + lisa; }
            float fy = Math.Max(20f, 0.8f * harja);
            r.Laatikko(fx0, fx1, 0f, fy, zf - fz, zf + fz, TyKivi, TyKatto);
            r.Katto(fx0, fx1, zf - fz + 10f, zf + fz - 10f, new[] { (0f, 0f, fy), (2.5f, 2.5f, fy + 4f) }, TyKatto, TyKatto);
            foreach (float s in new[] { -1f, 1f })
            {
                float zc = zf + s * (fz - 5f);
                r.Laatikko(fx0 - 1f, fx0 + 10f, 0f, fy + 6f, zc - 5.5f, zc + 5.5f, TyKivi, TyKatto);
                r.Pyora(fx0 + 4.5f, zc, new[] { (5.5f * 1.4142f, fy + 6f), (0f, fy + 13f) }, 4, TyKatto, 0.7854f);
            }
            // Kellopääty: keskimmäisen julkisivuhallin edessä julkisivusta 1,5 m ulos, räystäs harjan yli, kolmiopääty ja kello päädyssä (alareuna harjan yläpuolella).
            int hm = j0 + (j1 - j0 + 1) / 2;
            float zg = -leveys * 0.5f + hz + hm * hl, wg = Math.Min(hl * 0.7f, 34f), yg = Math.Max(fy + 3f, harja + 1.5f), gx = fx0 - 1.5f, gt = wg * 0.28f;
            r.Laatikko(gx, fx0 + 6f, 0f, yg, zg - wg * 0.5f, zg + wg * 0.5f, TyKivi, TyKatto);
            foreach (float px in new[] { gx, fx0 + 6f })
                r.Kolmio(new P3(px, yg, zg - wg * 0.5f), new P3(px, yg, zg + wg * 0.5f), new P3(px, yg + gt, zg), TyKivi, new P3(px == gx ? -1f : 1f, 0f, 0f));
            r.Neli(new P3(gx - 0.3f, yg, zg - wg * 0.5f - 0.3f), new P3(gx - 0.3f, yg + gt + 0.1f, zg), new P3(fx0 + 6.3f, yg + gt + 0.1f, zg), new P3(fx0 + 6.3f, yg, zg - wg * 0.5f - 0.3f), TyKatto, new P3(0f, 1f, -gt / (wg * 0.5f)));
            r.Neli(new P3(gx - 0.3f, yg, zg + wg * 0.5f + 0.3f), new P3(gx - 0.3f, yg + gt + 0.1f, zg), new P3(fx0 + 6.3f, yg + gt + 0.1f, zg), new P3(fx0 + 6.3f, yg, zg + wg * 0.5f + 0.3f), TyKatto, new P3(0f, 1f, gt / (wg * 0.5f)));
            var gs = r.S(gx, zg - wg * 0.5f, gx, zg + wg * 0.5f);
            float ks = Math.Min(3.2f, wg * 0.1f);
            OsaKellotaulu(r, gs, wg * 0.5f, Math.Max(yg - 0.5f, harja + 1.15f * ks + 0.5f), ks, TyTaulu, TyRauta, TyViisari);
            var js = r.S(fx0, zf - fz + 11f, fx0, zf + fz - 11f);   // julkisivu (kasvot −x)
            float L = js.Pituus, kaari = Math.Min(8f, hl * 0.27f);
            for (int h = j0; h <= j1; h++)
            {
                if (!Mukana(h) || !julkisivu[h]) continue;
                float u = (zf + fz - 11f) - (-leveys * 0.5f + hz + h * hl);   // hallin keskiviiva julkisivun koordinaatissa
                if (h == hm) { gs.Pinta(wg * 0.5f - kaari, wg * 0.5f + kaari, 0f, 10f, 0.06f, TyAukko); gs.KaariTayte(wg * 0.5f, 10f, kaari, 0.06f, vLasi, 8); continue; }
                if (u < kaari + 1f || u > L - kaari - 1f) continue;
                js.Pinta(u - kaari, u + kaari, 0f, 10f, 0.06f, TyAukko);
                js.KaariTayte(u, 10f, kaari, 0.06f, vLasi, 8);
            }
            for (int i = 0; i < 4; i++)
            {
                float u1 = 4f + i * 3.6f, u2 = L - 4f - i * 3.6f;
                foreach (float u in new[] { u1, u2 }) { js.Pinta(u - 1.1f, u + 1.1f, 0f, 4.5f, 0.05f, TyAukko); js.KaariTayte(u, 4.5f, 1.1f, 0.05f, TyAukko, 4); js.Pinta(u - 0.8f, u + 0.8f, 8f, 12f, 0.05f, TyAukko); }
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
        /// romaaninen), länsipäätyyn ovi. Risteys 2: tornit kuoren molemmin puolin (kuoritornit). Tasakatto saa kaiteen (OsaTorni sivuja 0).</summary>
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
                OsaTorni(r, cx, 0f, w, korkeus, karki, sivuja, aukkoja, TyKivi, TyAukko, TyHuippu, TyKatto);
                var s = new Seina(r, cx - w * 0.5f, -w * 0.5f, cx - w * 0.5f, w * 0.5f);
                Suippo(r, s, w * 0.5f, 0f, w * 0.65f, w * 0.29f, 0.06f, TyAukko);
                return;
            }
            var ovi = new Seina(r, x0, -zl, x0, zl);
            Suippo(r, ovi, zl, 0f, Math.Min(w * 0.65f, yHarja * 0.4f), w * 0.29f, 0.06f, TyAukko);
            if (lansi)
                foreach (float s in new[] { -1f, 1f }) OsaTorni(r, x0 + w * 0.5f - sisennys, s * (zl + w * 0.5f - 1f), w, korkeus, karki, sivuja, aukkoja, TyKivi, TyAukko, TyHuippu, TyKatto);
            else if (torneja < 2)
                OsaTorni(r, x1 - (x1 - x0) * 0.3f, 0f, Math.Min(w, zl * 1.6f), Math.Max(korkeus, yHarja + w * 1.2f), karki, sivuja, aukkoja, TyKivi, TyAukko, TyHuippu, TyKatto);
            else
                foreach (float s in new[] { -1f, 1f }) OsaTorni(r, x1 - w * 0.5f, s * (zl + w * 0.5f - 0.5f), w, korkeus, karki, sivuja, aukkoja, TyKivi, TyAukko, TyHuippu, TyKatto);
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
            OsaRumpu(r, cx, 0f, 22f, 9f, 5.6f, 30f, 6.2f, 35f, 8, 8, TyKivi, TyKiviVarjo, TyAukko, 16);
            OsaKupoli(r, cx, 0f, 35f, 6.6f, 10f, TyHuippu, TyKivi, TyAukko, 8, 1.4f, 58f, 16, 7);
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
        /// <summary>portiikki (KK 15.11. 01.13; Royal Exchange): pylväät vain etupäädyssä (−x) keskellä, kolmiopääty niiden yllä; muualla umpiseinä
        /// ikkunoineen pohjan reunassa. Muuten pylväskehä ympäri (Madeleine).</summary>
        public static Verkko TyyppiPylvastemppeli(float pituus = 100f, float leveys = 40f, int paaty = 8, bool harja = true, bool portiikki = false)
        {
            if (portiikki) return TyPortiikkitemppeli(pituus, leveys, paaty, harja);
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

        /// <summary>UMPIPIHAPALATSI (KK 23.32 työ D, parametri piha): neljä siipeä (syvyys siipi m, räystäs 16) pihan ympärillä, mansardikatot, kulmapaviljongit
        /// (siipi + 4 m, räystäs 18, jyrkempi mansardi) ja pääjulkisivun (+z) keskirisaliitti kolmiopäätyineen ja porttiholvi. Pituus x, leveys z = OSM-pohjan
        /// pienin suorakaide; ulkojulkisivuilla kaksi ikkunakerrosta, pihan puolella yksi (näkyy vain ylhäältä). Lyhyt sivu alle 2,6 × siipi → umpinainen tanko.</summary>
        /// <summary>UMPIPIHAPALATSI parametreilla (KK 14.11. 23.40 D): julkisivu = pääjulkisivun sivu ("+z", "-z", "+x", "-x"; porttiholvi ja risaliitti),
        /// avoin = sivu, jonka siipi jätetään pois (U-palatsi; "" = umpipiha). Malli rakennetaan julkisivu +z:lla ja kierretään neljänneksin
        /// (x, z) → (z, −x), joten pituus on aina x:n ja leveys z:n suuntaan lopullisessa mallissa.</summary>
        static Verkko TyPortiikkitemppeli(float pituus, float leveys, int paaty, bool harja)
        {
            var r = TyRakentaja();
            float x0 = -pituus * 0.5f, x1 = pituus * 0.5f, z0 = -leveys * 0.5f, z1 = leveys * 0.5f;
            float yp = 2.5f, yc = yp + Math.Min(leveys * 0.36f, 18f), ye = yc + 2.2f, rp = 0.75f;
            float pw = Math.Min(leveys - 6f, paaty * 4.4f), pz0 = -pw * 0.5f, pz1 = pw * 0.5f, dp = Math.Min(pituus * 0.2f, 12f), xc = x0 + dp;
            // Jalusta ja portaat portiikin edessä
            r.Laatikko(x0, x1, 0f, yp, z0, z1, TyKivi, TyKivi);
            for (int i = 0; i < 4; i++) r.Laatikko(x0 - (4 - i) * yp * 0.4f, x0, 0f, yp * (i + 1) / 4f, pz0, pz1, TyKiviVarjo, TyKivi);
            // Runko pohjan reunassa; portiikin kohdalla seinä vetäytyy dp sisään (pylväiden taakse)
            r.Seinat(new[] { (x0, z1), (x1, z1), (x1, z0), (x0, z0), (x0, pz0), (xc, pz0), (xc, pz1), (x0, pz1) }, yp, yc, TyKivi);
            var etu = r.S(xc, pz0, xc, pz1);
            etu.Pinta(pw * 0.5f - 2.5f, pw * 0.5f + 2.5f, yp, yp + 7f, 0.06f, TyAukko);
            TyIkkunat(r, xc + 4f, z1, x1, z1, 7f, 2f, yp + 4f, yp + 8f, false, TyAukko);
            TyIkkunat(r, x1, z0, xc + 4f, z0, 7f, 2f, yp + 4f, yp + 8f, false, TyAukko);
            for (int i = 0; i < paaty; i++) SpPylvaat(r, x0 + 1.6f, pz0 + 1.2f + i * (pw - 2.4f) / (paaty - 1), yp, yc, rp, TyKivi);
            // Palkisto koko pohjalle, katto, ja kolmiopääty portiikin yllä
            r.Laatikko(x0 + 0.3f, x1, yc, ye, z0, z1, TyKivi, TyKatto);
            if (harja) TyHarja(r, xc, x1, z0, z1, ye, leveys * 0.12f, 0.4f, TyKatto, TyKivi, false, true);
            else r.Laatikko(x0 + 0.3f, x1, ye, ye + 2.6f, z0, z1, TyKivi, TyKatto);
            float hp = pw * 0.14f;
            r.Kolmio(new P3(x0 + 0.3f, ye, pz0), new P3(x0 + 0.3f, ye, pz1), new P3(x0 + 0.3f, ye + hp, 0f), TyKivi, new P3(-1f, 0f, 0f));
            r.Neli(new P3(x0, ye - 0.2f, pz0 - 0.3f), new P3(x0, ye + hp + 0.2f, 0f), new P3(xc, ye + hp + 0.2f, 0f), new P3(xc, ye - 0.2f, pz0 - 0.3f), TyKatto, new P3(0f, 1f, -1f));
            r.Neli(new P3(x0, ye - 0.2f, pz1 + 0.3f), new P3(x0, ye + hp + 0.2f, 0f), new P3(xc, ye + hp + 0.2f, 0f), new P3(xc, ye - 0.2f, pz1 + 0.3f), TyKatto, new P3(0f, 1f, 1f));
            return r.Valmis();
        }

        public static Verkko TyyppiPalatsiPiha(float pituus, float leveys, string julkisivu, string avoin, float siipi = 16f, string katto = "mansardi", int seina = 0)
        {
            int n = julkisivu == "+x" ? 1 : julkisivu == "-z" ? 2 : julkisivu == "-x" ? 3 : 0;
            string Takaisin(string s) => s == "+x" ? "+z" : s == "-z" ? "+x" : s == "-x" ? "-z" : s == "+z" ? "-x" : s;   // kierron käänteinen
            string a = avoin ?? "";
            for (int i = 0; i < n; i++) a = Takaisin(a);
            var v = (n % 2 == 1) ? TyyppiPalatsiPiha(leveys, pituus, siipi, a, katto, seina) : TyyppiPalatsiPiha(pituus, leveys, siipi, a, katto, seina);
            return n == 0 ? v : TyKierra(v, n);
        }

        /// <summary>Verkko kierretään n neljännestä y:n ympäri: (x, z) → (z, −x) kerran (+z → +x).</summary>
        static Verkko TyKierra(Verkko b, int n)
        {
            var tyhja = new Verkko { Paikat = new float[0], Normaalit = new float[0], Varit = new float[0], Syvyys = b.Syvyys == null ? null : new float[0] };
            for (int i = 0; i < n; i++) b = TyYhdista(tyhja, b, true, 0f, 0f);
            return b;
        }

        /// <summary>katto "mansardi" (Pariisi) | "attika" (KK 15.11. 01.13: Lontoo ei saa näyttää Pariisilta): attikalla siivet ja paviljongit päättyvät
        /// ulkonevaan räystäslistaan ja kaiteeseen, katto tasainen kaiteen takana. Keskirisaliitin kolmiopääty molemmissa.
        /// seina = seinän sRGB 0xRRGGBB (0 = TyKivi; Lontoo: Portland-kivi 0xE4DCCA, punatiili 0xAC7862).</summary>
        public static Verkko TyyppiPalatsiPiha(float pituus = 120f, float leveys = 90f, float siipi = 16f, string avoin = "", string katto = "mansardi", int seina = 0)
        {
            var r = TyRakentaja();
            var kivi = seina > 0 ? Vari.H(seina) : TyKivi;   // seinä rivikohtaisesti (KK 15.11. 01.24; KS:n paletti), 0 = Pariisin kivi
            bool attika = katto == "attika";
            float x0 = -pituus * 0.5f, x1 = pituus * 0.5f, z0 = -leveys * 0.5f, z1 = leveys * 0.5f, y = 16f, pv = siipi + 4f;
            bool piha = Math.Min(pituus, leveys) >= 2.6f * siipi;
            (float, float, float)[] Mansardi(float sy, float d) => new[] { (0f, 0f, sy), (1.6f, 1.6f, sy + 5f), (Math.Min(d * 0.32f, 6f), d * 0.32f, sy + 7f) };
            void Siipi(float a0, float a1, float b0, float b1, bool pitkinX)
            {
                r.Laatikko(a0, a1, 0f, y, b0, b1, kivi, TyKatto);
                if (attika) { r.Laatikko(a0 - 0.4f, a1 + 0.4f, y, y + 1.6f, b0 - 0.4f, b1 + 0.4f, kivi, TyKatto); return; }
                var m = Mansardi(y, pitkinX ? b1 - b0 : a1 - a0);
                if (!pitkinX) m = Array.ConvertAll(m, t => (t.Item2, t.Item1, t.Item3));
                r.Katto(a0, a1, b0, b1, m, TyKatto, TyKatto);
            }
            if (!piha) avoin = "";
            if (piha)
            {
                if (avoin != "-z") Siipi(x0 + pv, x1 - pv, z0, z0 + siipi, true);
                if (avoin != "+z") Siipi(x0 + pv, x1 - pv, z1 - siipi, z1, true);
                if (avoin != "-x") Siipi(x0, x0 + siipi, z0 + pv, z1 - pv, false);
                if (avoin != "+x") Siipi(x1 - siipi, x1, z0 + pv, z1 - pv, false);
            }
            else Siipi(x0 + pv, x1 - pv, z0, z1, true);
            foreach (float sx in new[] { -1f, 1f })
                foreach (float sz in new[] { -1f, 1f })
                {
                    if (!piha && sz > 0) continue;
                    float a = sx < 0 ? x0 : x1 - pv, b = a + pv, c = piha ? (sz < 0 ? z0 : z1 - pv) : z0, d = piha ? c + pv : z1;
                    r.Laatikko(a, b, 0f, y + 2f, c, d, kivi, TyKatto);
                    if (attika) { r.Laatikko(a - 0.4f, b + 0.4f, y + 2f, y + 3.8f, c - 0.4f, d + 0.4f, kivi, TyKatto); continue; }
                    r.Katto(a, b, c, d, new[] { (0f, 0f, y + 2f), (1.8f, 1.8f, y + 8f), (pv * 0.3f, (d - c) * 0.3f, y + 10f) }, TyKatto, TyKatto);
                }
            // Ulkojulkisivut: kolme ikkunariviä paviljonkien välissä; jako harvenee isoissa (kolmioraja 1 500: enintään ~52 ikkunaa riviä kohden)
            float julkisivu = 2f * (pituus - 2f * pv) + (piha ? 2f * (leveys - 2f * pv) : 0f), iv = Math.Max(4.2f, julkisivu / 52f);
            foreach (var (ax, az, bx, bz, sivu) in new[] { (x0 + pv, z1, x1 - pv, z1, "+z"), (x1 - pv, z0, x0 + pv, z0, "-z"), (x0, z0 + pv, x0, z1 - pv, "-x"), (x1, z1 - pv, x1, z0 + pv, "+x") })
            {
                if (!piha && ax == bx) continue;
                if (sivu == avoin) continue;
                TyIkkunat(r, ax, az, bx, bz, iv, 1.8f, 7.5f, 10.5f, false, TyAukko);
                TyIkkunat(r, ax, az, bx, bz, iv, 1.8f, 12f, 14.5f, false, TyAukko);
                TyIkkunat(r, ax, az, bx, bz, iv, 1.8f, 2f, 4.5f, false, TyAukko);
            }
            // Keskirisaliitti pääjulkisivulla (+z) ja porttiholvi; jos +z on avoin (U-palatsin kunniapiha), risaliitti on pihan puolella päärakennuksessa (−z-siipi).
            if (avoin == "+z") z1 = z0 + siipi;
            r.Laatikko(-10f, 10f, 0f, y + 1f, z1 - 0.5f, z1 + 1.5f, kivi, TyKatto);
            r.Kolmio(new P3(-10f, y + 1f, z1 + 1.5f), new P3(10f, y + 1f, z1 + 1.5f), new P3(0f, y + 6f, z1 + 1.5f), kivi, new P3(0f, 0f, 1f));
            r.Neli(new P3(-10.3f, y + 1f, z1 + 1.8f), new P3(0f, y + 6.2f, z1 + 1.8f), new P3(0f, y + 6.2f, z1 - 4f), new P3(-10.3f, y + 1f, z1 - 4f), TyKatto, new P3(-1f, 2f, 0f));
            r.Neli(new P3(10.3f, y + 1f, z1 + 1.8f), new P3(0f, y + 6.2f, z1 + 1.8f), new P3(0f, y + 6.2f, z1 - 4f), new P3(10.3f, y + 1f, z1 - 4f), TyKatto, new P3(1f, 2f, 0f));
            var portti = r.S(-10f, z1 + 1.5f, 10f, z1 + 1.5f);
            portti.Pinta(7.5f, 12.5f, 0f, 6f, 0.06f, TyAukko); portti.KaariTayte(10f, 6f, 2.5f, 0.06f, TyAukko, 6);
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

        /// <summary>MK01 tyyppi 7 (KK 15.11. 06.20 päätös B; työkalun hallit.py): a = halleja (bitit 0–2) | julkisivukaistat (bitti 3 + k);
        /// kaistan k alku ja loppu u8:na tavuissa T[2k], T[2k + 1], T = {b, c, p3:n 4 tavua LE, varattu-kentän 4 tavua LE}; x = −L/2 + q · L/255,
        /// kaista mukana jos loppu &gt; alku. Kaikki tavut 0 = vanha malli (TyyppiAsema, hallien määrä leveydestä jos a = 0).</summary>
        public static Verkko MalliAsema(int a, int b, int c, float pituus, float leveys, int katto, uint p3Bitit, uint varattu)
        {
            int h = a & 7, jb = a >> 3;
            if (b == 0 && c == 0 && p3Bitit == 0 && varattu == 0) return TyyppiAsema(h > 0 ? h : AsemanHallit(leveys), pituus, leveys, katto);
            if (h < 1) return null;
            h = Math.Min(h, 5);
            var T = new int[10];
            T[0] = b & 255; T[1] = c & 255;
            for (int i = 0; i < 4; i++) { T[2 + i] = (int)((p3Bitit >> (8 * i)) & 255); T[6 + i] = (int)((varattu >> (8 * i)) & 255); }
            var alku = new float[h]; var loppu = new float[h]; var jul = new bool[h];
            for (int k = 0; k < h; k++)
            {
                int qa = T[2 * k], ql = T[2 * k + 1];
                alku[k] = -pituus * 0.5f + qa * pituus / 255f; loppu[k] = ql > qa ? -pituus * 0.5f + ql * pituus / 255f : alku[k];
                jul[k] = ((jb >> k) & 1) != 0;
            }
            return TyAsema(h, leveys, alku, loppu, jul, 0f, katto);
        }

        /// <summary>MK01-tiedoston mallirivi verkoksi (työkalun vie.py; MerkkiTiedosto.Malli). Tyypit 1–4, 8 ja 9 jaettuja (instanssi, venytys), 5–7 pohjan mitoista.
        /// Sivukoodi 0 ei, 1 +x, 2 −x, 3 +z, 4 −z. c: tyyppi 5 portiikki vain päädyssä 0/1, tyyppi 6 katto 0 mansardi / 1 attika; tyyppi 6 p2 = seinän sRGB 0xRRGGBB, tyyppi 7 p2 = kaupungin kattoväri sRGB 0xRRGGBB
        /// (f32 kokonaislukuna, 0 = oletuskivi). Tuntematon tyyppi = null.</summary>
        public static Verkko TyyppiMalli(int tyyppi, int a, int b, int c, float p0, float p1, float p2 = 0f, uint p3Bitit = 0, uint varattu = 0)
        {
            string[] paikka = { "lansi", "risteys" }, huippu = { "pyramidi", "neula", "tasakatto" }, sivu = { "", "+x", "-x", "+z", "-z" };
            string Sivu(int k) => k >= 0 && k < sivu.Length ? sivu[k] : "";
            switch (tyyppi)
            {
                case 1: return TyyppiKirkkoPieni(paikka[Math.Min(a, 1)], Math.Max(1, b), huippu[Math.Min(c, 2)]);
                case 2: return TyyppiKirkkoKeski(paikka[Math.Min(a, 1)], Math.Max(1, b), huippu[Math.Min(c, 2)]);
                case 3: return TyyppiKirkkoSuuri();
                case 4: return TyyppiKupolikirkko(a != 0);
                case 5: return TyyppiPylvastemppeli(p0, p1, a > 0 ? a : 8, b != 0, c == 1);
                case 6: return TyyppiPalatsiPiha(p0, p1, a > 0 ? Sivu(a) : "+z", Sivu(b), 16f, c == 1 ? "attika" : "mansardi", p2 > 0f && p2 <= 0xFFFFFF ? (int)p2 : 0);
                case 7: return MalliAsema(a, b, c, p0, p1, p2 > 0f && p2 <= 0xFFFFFF ? (int)p2 : 0, p3Bitit, varattu);
                case 8: return TyyppiKirkkoLevea(paikka[Math.Min(a, 1)], Math.Max(1, b), huippu[Math.Min(c, 2)]);
                case 9: return TyyppiKirkkoBasilika(paikka[Math.Min(a, 1)], Math.Max(1, b), huippu[Math.Min(c, 2)]);
                case 10: return TyyppiKirkkoJulkisivu(a != 0);
                default: return null;
            }
        }

        /// <summary>Jaettu verkko (yksi kaikille saman rivin merkeille, venytys sx sz instanssissa) vai pohjan mitoista rakennettu (leivotaan paloittain).</summary>
        public static bool TyyppiJaettu(int tyyppi) => (tyyppi >= 1 && tyyppi <= 4) || tyyppi == 8 || tyyppi == 9 || tyyppi == 10;

        /// <summary>Jaetun mallin LISÄOSA, joka ei veny rungon mukana (KK 15.11. ~03.3x): julkisivukirkon kupoli (tyyppi 10, a ≠ 0), muuten null.
        /// Peli piirtää sen samalla merkillä toisena jaettuna verkkona: paikka rungon kehyksessä (x · sx, y, 0), mittakaava min(sx, sz) kaikkiin akseleihin.</summary>
        public static Verkko TyyppiLisaosa(int tyyppi, int a, out float x, out float y)
        {
            x = y = 0f;
            if (tyyppi != 10 || a == 0) return null;
            x = JulkisivuKupoliX; y = JulkisivuKupoliY;
            return TyyppiJulkisivuKupoli(true);
        }

        /// <summary>Kaikki luonnosmallit nimineen ja kokoluokan kolmiorajoineen (0 = ei rajaa).</summary>
        public static List<(string nimi, Verkko v, int raja)> TyyppiLuonnokset() => new List<(string, Verkko, int)>
        {
            ("kirkko-pieni", TyyppiKirkkoPieni(), 400),
            ("kirkko-keski", TyyppiKirkkoKeski(), 900),
            ("kirkko-levea", TyyppiKirkkoLevea(), 900),
            ("kirkko-basilika", TyyppiKirkkoBasilika(), 900),
            ("kirkko-basilika-lansi-2-neula", TyyppiKirkkoBasilika("lansi", 2, "neula"), 900),
            ("kirkko-suuri", TyyppiKirkkoSuuri(), 1500),
            ("kirkko-julkisivu", TyyppiKirkkoJulkisivuKoko(true), 600),
            ("kirkko-julkisivu-raskas", TyyppiKirkkoJulkisivuKoko(true, 1f, 1f, false), 1500),
            ("kirkko-julkisivu-ilman", TyyppiKirkkoJulkisivu(false), 900),
            ("asema", TyyppiAsema(), 1500),
            ("palatsi", TyyppiPalatsi(), 1500),
            ("kupolikirkko", TyyppiKupolikirkko(true), 1500),
            ("pylvastemppeli", TyyppiPylvastemppeli(100f, 40f, 8, true), 1500),
            ("palatsi-piha", TyyppiPalatsiPiha(120f, 90f), 1500),
            ("asema-nord", TyyppiAsema(AsemanHallit(137f), 185f, 137f), 1500),
            ("asema-lazare", TyyppiAsema(AsemanHallit(247f), 249f, 247f), 1500),
            ("asema-lyon", TyyppiAsema(AsemanHallit(181f), 217f, 181f), 1500),
            ("pylvastemppeli-attika", TyyppiPylvastemppeli(70f, 42f, 10, false), 1500),
            ("kupolikirkko-ilman", TyyppiKupolikirkko(false), 1500),
            ("kirkko-keski-risteys-1-pyramidi", TyyppiKirkkoKeski("risteys", 1, "pyramidi"), 900),
            ("kirkko-keski-lansi-2-neula", TyyppiKirkkoKeski("lansi", 2, "neula"), 900),
            ("kirkko-keski-lansi-1-tasakatto", TyyppiKirkkoKeski("lansi", 1, "tasakatto"), 900),
            ("kirkko-levea-lansi-2-neula", TyyppiKirkkoLevea("lansi", 2, "neula"), 900),
            ("kirkko-levea-risteys-1-pyramidi", TyyppiKirkkoLevea("risteys", 1, "pyramidi"), 900),
            ("kirkko-pieni-risteys-2-pyramidi", TyyppiKirkkoPieni("risteys", 2, "pyramidi"), 400),
            ("palatsi-piha-attika", TyyppiPalatsiPiha(120f, 90f, 16f, "", "attika"), 1500),
            ("pylvastemppeli-portiikki", TyyppiPylvastemppeli(83f, 54f, 8, false, true), 1500),
            ("talo", TyyppiTalo(), 0),
        };
    }
}
