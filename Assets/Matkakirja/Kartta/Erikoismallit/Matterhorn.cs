using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// ERIKOISMALLI MATTERHORN (speksi docs/raportit/erikoismallit/matterhorn.md; omistaja hyväksyi elämänidean 27.9. klo 07.5x).
    /// Tunnistus sekunnissa: jyrkkä nelitahkoinen pyramidi, jonka vino huippuharjanne kaartuu koukuksi (vasen kylki lähes
    /// pystysuora huipun alla, oikealla pitkä Zmuttin harjanne olkapäineen); lumilakki ja valkoinen pohjoisseinä oikealla,
    /// harmaanruskea itäseinä lumijuovineen vasemmalla, tumma kallionauha juurella, Matterhorngletscher, Zermattin kylä ja
    /// Gornergratin hammasrata.
    /// Mitat: yksikkö 1,0 ≈ 3 km vaakasuunnassa (jalanjälki kylineen 1,01 × 0,78; pyramidi 0,90 × 0,55, syvyys tiivistetty),
    /// korkeus 1,35 (huippu nousee jäätiköiden yläpuolelle noin 1,5 km → pystyliioittelu noin 2,8), jotta 30°:n kallistuksessa
    /// huippu on siluetin korkein kohta ja koukku erottuu 60 pt:ssä. Takarinteet ovat jyrkempiä kuin 60° (muuten kallistettu
    /// kamera näkisi takarinteen huipun yläpuolella).
    /// SUUNTA TYYLITELTY: kuuluisa Zermattin näkymä katsoo koillisesta lounaaseen, mutta kallistettu kamera katsoo etelästä,
    /// joten vuori on käännetty noin 125° myötäpäivään: Hörnlin harjanne (todellisuudessa koilliseen) osoittaa kameraa kohti
    /// (−Z), itäseinä on vasemmalla ja pohjoisseinä oikealla edessä, Furggen vasemmalle, Zmutt oikealle ja Lion taakse.
    /// Huippuharjanne (Sveitsin ja Italian huippu) on käännetty vasemmalta oikealle, jotta vino koukkuhuippu näkyy.
    /// Zermatt (edessä) ja Gornergrat (vasemmalla edessä) ovat samassa käännetyssä suunnassa, etäisyydet tiivistetty.
    /// Liikkuvat osat:
    ///   lippupilvi       lippupilvi muodostuu huipun suojan puolelle, liehuu ja hajoaa (perusliike, tauko välissä)
    ///   hattara0–1       pilvenriekaleet irtoavat lipun pyrstöstä, ajautuvat tuulen alle ja haihtuvat
    ///   alppihehku0–1    ruusukultainen hehku huippupyramidilla (harvinainen ja napautus): leviää huipuilta alas ja vetäytyy;
    ///                    0 = Sveitsin huipun viuhka (pivot Sveitsin huippu), 1 = Italian huipun viuhka (pivot Italian huippu)
    ///   juna             punainen hammasratasjuna nousee Zermattista Gornergratille (reaktio: kamera lähestyy)
    ///   valot            Zermattin ikkunat ja kylän lämmin hehku yöllä
    /// </summary>
    public sealed partial class Symbolimallit
    {
        /// <summary>Suunnittelukoordinaattien siirto: juuri jalanjäljen keskelle (kylä ja Gornergrat ovat vuoren edessä).</summary>
        const float MhDx = 0.037f, MhDz = 0.144f;
        static Vector3 MhP(float x, float y, float z) => new Vector3(x + MhDx, y, z + MhDz);

        /// <summary>Huippuharjanne: Sveitsin huippu (4 478 m, korkein, vasemmalla) ja Italian huippu (4 476 m, oikealla ja hieman
        /// alempana). Vino harjanne on Zermattin näkymän koukkuhuippu.</summary>
        static readonly Vector3 MhSveitsi = MhP(-0.1f, 1.35f, -0.05f), MhItalia = MhP(-0.025f, 1.305f, -0.045f);

        /// <summary>
        /// Harjanteet silmukoittain (0 = huippupyramidin alareuna … 6 = maa) mallin avaruudessa; järjestys myötäpäivään
        /// ylhäältä: Zmutt (oikealle ja hieman taakse), Hörnli (kameraa kohti), Furggen (vasemmalle), Lion (taakse).
        /// Olkapäät: Zmuttin olka silmukassa 2, Hörnlin olka (4 200 m) silmukassa 1 ja Furggenin olka silmukassa 1
        /// (koukun pystyseinän alla). Lion laskee jyrkästi, jotta takarinne pysyy 30°:n kamerassa huipun alapuolella.
        /// </summary>
        static readonly Vector3[][] MhHarjanteet =
        {
            new[] { MhP(0.1f, 0.92f, 0f), MhP(0.175f, 0.79f, 0.015f), MhP(0.275f, 0.7f, 0.035f), MhP(0.315f, 0.5f, 0.05f), MhP(0.38f, 0.27f, 0.07f), MhP(0.44f, 0.1f, 0.085f), MhP(0.47f, 0f, 0.09f) },
            new[] { MhP(-0.1f, 1f, -0.14f), MhP(-0.1f, 0.955f, -0.195f), MhP(-0.095f, 0.78f, -0.225f), MhP(-0.09f, 0.56f, -0.25f), MhP(-0.085f, 0.27f, -0.275f), MhP(-0.08f, 0.1f, -0.292f), MhP(-0.075f, 0f, -0.3f) },
            new[] { MhP(-0.19f, 0.99f, -0.03f), MhP(-0.265f, 0.93f, -0.025f), MhP(-0.285f, 0.78f, -0.02f), MhP(-0.325f, 0.56f, -0.015f), MhP(-0.37f, 0.27f, -0.01f), MhP(-0.41f, 0.1f, -0.005f), MhP(-0.43f, 0f, 0f) },
            new[] { MhP(-0.04f, 0.98f, 0.07f), MhP(-0.05f, 0.9f, 0.11f), MhP(-0.055f, 0.765f, 0.145f), MhP(-0.06f, 0.54f, 0.18f), MhP(-0.065f, 0.27f, 0.215f), MhP(-0.07f, 0.1f, 0.237f), MhP(-0.07f, 0f, 0.245f) },
        };

        const int MhSilmukat = 7, MhMeridiaanit = 12;
        /// <summary>Meridiaanien huiput: 0 = Sveitsin huippu (Hörnli, itäseinä, Furggen ja eteläseinän alku), 1 = Italian huippu
        /// (Zmutt, pohjoisseinä, Lion, länsiseinä ja eteläseinän loppu). Järjestys: Z, n1, n2, H, e1, e2, F, s1, s2, L, w1, w2.</summary>
        static readonly int[] MhKarki = { 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1 };
        /// <summary>Kourujen painuma silmukoittain: seinien välimeridiaanit ovat harjanteita alempana (kourut ja lumiuomat).</summary>
        static readonly float[] MhKouru = { 0.03f, 0.03f, 0.025f, 0.02f, 0.012f, 0.006f, 0f };
        /// <summary>Huippupyramidin vyöt säteittäin huipulta silmukkaan 0 (lumilakki, keskivyö, alavyö).</summary>
        static readonly float[] MhPaaVyot = { 0.3f, 0.62f, 1f };

        /// <summary>
        /// Värikartta seinittäin (0 pohjoisseinä oikealla edessä, 1 itäseinä vasemmalla edessä, 2 eteläseinä takana vasemmalla,
        /// 3 länsiseinä takana oikealla): rivit ylhäältä (3 huippupyramidin vyötä, 6 rinnevyötä), kussakin kolme tahkoa
        /// harjanteelta seuraavalle myötäpäivään. L lumi, V vaalea kallio, K kallio, T tumma kallionauha.
        /// Pohjoisseinä on valkoinen ja itäseinä harmaanruskea lumireunuksin (Zermattin näkymän kontrasti).
        /// </summary>
        static readonly string[][] MhVarit =
        {
            new[] { "LLL", "LLL", "LLL", "LLL", "LLL", "LLL", "KLL", "KKK", "KKK" },
            new[] { "LLL", "VVV", "VVV", "VVV", "LLL", "VVV", "KKK", "TTT", "KKK" },
            new[] { "LLL", "KKK", "KKK", "KKK", "LLL", "KKK", "KKK", "TTT", "KKK" },
            new[] { "LLL", "LLL", "LLL", "LLL", "KKK", "KKK", "KKK", "KKK", "KKK" },
        };

        // ---- Paletti (Em-ramppi; aksentti vain liikkuvissa osissa: alppihehku ja juna) ----
        static readonly Color MhLumi = Hex(0xf7f3e8), MhKiviTumma = Hex(0x857259), MhJaa = Hex(0xcadbe0);
        static readonly Color MhNiitty = Hex(0xbdb48c), MhRatapenkka = Hex(0x5a4a38), MhHirsi = Hex(0x6b4f33), MhLiuske = Hex(0x8e8574);
        static readonly Color MhPilvi = Hex(0xfbf8f0);
        /// <summary>Aksentti: hammasratasjunan punainen (hillitty tiilenpunainen, ei täysi väri).</summary>
        static readonly Color MhJuna = Hex(0xb04a3a), MhJunaKatto = Hex(0x93392d);
        /// <summary>Aksentti: alppihehkun ruusukulta lumella ja kalliolla (EmKulta ruusuun päin).</summary>
        static readonly Color MhHehkuLumi = Hex(0xf6c3a2), MhHehkuKallio = Hex(0xe2a07c);

        /// <summary>Lippupilven akseli: länsituulella pilvi syntyy huipun itäpuolelle (suojan puolelle); käännetyssä mallissa
        /// vasemmalle ja hieman eteen. Sama vektori liikeytimessä (MatterhornLiike.TuuliX/Z).</summary>
        static readonly Vector3 MhTuuli = new Vector3(-0.9404f, 0f, -0.3401f);
        /// <summary>Lippupilven juuri koukun pystyseinän kohdalla huipun alla (pilvi kasvaa tästä ulos).</summary>
        static readonly Vector3 MhPilviJuuri = MhP(-0.13f, 1.2f, -0.05f);
        /// <summary>Alppihehkun pivotit 0,015 huippujen yläpuolella: huipulta skaalattu kuori pysyy pinnan ulkopuolella.</summary>
        static readonly Vector3 MhHehkuNosto = new Vector3(0f, 0.015f, 0f);
        /// <summary>Gornergratin rata ala-asemalta (Zermatt) yläasemalle (Gornergrat): suora rata kukkulan harjalla. Vektori on
        /// sama kuin liikeytimessä (MatterhornLiike.RataX/Y/Z); muuta molempia yhdessä.</summary>
        static readonly Vector3 MhRata = new Vector3(-0.28f, 0.105f, 0.12f);
        static readonly Vector3 MhRataAlku = MhP(-0.13f, 0.015f, -0.44f), MhRataLoppu = MhRataAlku + MhRata;
        /// <summary>Kylän keskipiste (yövalojen pivot).</summary>
        static readonly Vector3 MhKyla = MhP(0.03f, 0f, -0.45f);

        /// <summary>Zermattin talot: pohjan keskipiste ja harjan suunta (rad).</summary>
        static readonly (Vector3 p, float suunta)[] MhTalot =
        {
            (MhP(-0.035f, 0f, -0.46f), 0.35f),
            (MhP(0.03f, 0f, -0.425f), -0.15f),
            (MhP(0.085f, 0f, -0.46f), 0.25f),
            (MhP(0.035f, 0f, -0.495f), -0.3f),
            (MhP(0.11f, 0f, -0.41f), 0.1f),
        };

        /// <summary>Pystyakseli huippuharjanteen keskeltä (seinien koveruus ja tahkojen etupuoli).</summary>
        static Vector3 MhAkseli(float y) => new Vector3((MhSveitsi.x + MhItalia.x) * 0.5f, y, (MhSveitsi.z + MhItalia.z) * 0.5f);

        /// <summary>Ulospäin pystyakselista (tahkon etupuoli), hieman ylös.</summary>
        static Vector3 MhUlos(Vector3 c) { var a = MhAkseli(c.y); return new Vector3(c.x - a.x, 0f, c.z - a.z).normalized + Vector3.up * 0.3f; }

        static Vector3 MhKarkiPiste(int m) => MhKarki[m] == 0 ? MhSveitsi : MhItalia;

        /// <summary>
        /// Vuoren pisteverkko [meridiaani, silmukka]: neljä harjannetta ja kummallakin seinällä kaksi välimeridiaania
        /// kolmannesten kohdalla. Seinät ovat koveria (välipisteet vedetty akselia kohti 7–13 %), ja kourut painuvat
        /// harjanteita alemmas (toistettava siemen 1865, Whymperin ensinousun vuosi).
        /// </summary>
        static Vector3[,] MhVerkko()
        {
            var p = new Vector3[MhMeridiaanit, MhSilmukat];
            var sat = new System.Random(1865);
            for (int h = 0; h < 4; h++)
                for (int k = 0; k < MhSilmukat; k++)
                {
                    Vector3 a = MhHarjanteet[h][k], b = MhHarjanteet[(h + 1) % 4][k];
                    p[h * 3, k] = a;
                    for (int j = 1; j <= 2; j++)
                    {
                        var q = Vector3.Lerp(a, b, j / 3f);
                        var akseli = MhAkseli(q.y);
                        float veto = 0.07f + 0.06f * (float)sat.NextDouble();
                        q = akseli + (q - akseli) * (1f - veto);
                        q.y = Mathf.Max(0f, q.y - MhKouru[k] * (0.6f + 0.8f * (float)sat.NextDouble()));
                        p[h * 3 + j, k] = q;
                    }
                }
            return p;
        }

        static Color MhVari(char c)
        {
            switch (c)
            {
                case 'L': return MhLumi;
                case 'V': return EmKiviVaalea;
                case 'T': return MhKiviTumma;
                default: return EmKivi;
            }
        }

        /// <summary>
        /// Huippupyramidi: kummaltakin huipulta viuhka silmukan 0 pisteisiin (tahkot huipun kautta) ja huippuharjanteen etu- ja
        /// takakolmio. Viuhkan tahkot jaetaan säteittäin vyöhykkeisiin (lumilakki, keskivyö, alavyö). kuori = hehkun kuori
        /// (0,006 ulospäin, vain toisen huipun viuhka, ks. MatterhornAlppihehku), muuten runko.
        /// </summary>
        static void MhHuippupyramidi(Rakentaja r, Vector3[,] p, int kuori)
        {
            const float e = 0.006f;
            Vector3 Kuori(Vector3 q, int m)
            {
                if (kuori < 0) return q;
                var a = MhAkseli(q.y);
                var o = m < 0 ? Vector3.zero : new Vector3(p[m, 0].x - a.x, 0f, p[m, 0].z - a.z).normalized;
                return q + (o + Vector3.up * 0.6f) * e - (kuori == 0 ? MhSveitsi : MhItalia) - MhHehkuNosto;
            }
            for (int m = 0; m < MhMeridiaanit; m++)
            {
                int n = (m + 1) % MhMeridiaanit, karki = MhKarki[m];
                var K = MhKarkiPiste(m);
                string[] kartta = MhVarit[m / 3];
                if (kuori < 0 || kuori == karki)
                {
                    float t0 = 0f;
                    for (int v = 0; v < MhPaaVyot.Length; v++)
                    {
                        float t1 = MhPaaVyot[v];
                        char c = kartta[v][m % 3];
                        var vari = kuori < 0 ? MhVari(c) : c == 'L' ? MhHehkuLumi : MhHehkuKallio;
                        Vector3 a1 = Vector3.Lerp(K, p[m, 0], t1), b1 = Vector3.Lerp(K, p[n, 0], t1);
                        var ulos = MhUlos((a1 + b1) * 0.5f);
                        if (v == 0) r.KolmioUlos(Kuori(K, -1), Kuori(a1, m), Kuori(b1, n), ulos, vari);
                        else
                        {
                            Vector3 a0 = Vector3.Lerp(K, p[m, 0], t0), b0 = Vector3.Lerp(K, p[n, 0], t0);
                            r.NelioUlos(Kuori(a0, m), Kuori(b0, n), Kuori(b1, n), Kuori(a1, m), ulos, vari);
                        }
                        t0 = t1;
                    }
                }
                // Huippuharjanteen kolmio viuhkojen välissä, jaettu harjanteen keskeltä: kumpikin puolisko kulkee oman huippunsa
                // kautta, joten hehkun kuori skaalautuu kummastakin huipusta omassa tasossaan.
                if (MhKarki[n] != karki)
                {
                    var L = MhKarkiPiste(n);
                    var M = (K + L) * 0.5f;
                    var ulos = MhUlos((K + L + p[n, 0]) / 3f);
                    var vari = kuori < 0 ? MhLumi : MhHehkuLumi;
                    if (kuori < 0 || kuori == karki) r.KolmioUlos(Kuori(K, -1), Kuori(p[n, 0], n), Kuori(M, -1), ulos, vari);
                    if (kuori < 0 || kuori == MhKarki[n]) r.KolmioUlos(Kuori(M, -1), Kuori(p[n, 0], n), Kuori(L, -1), ulos, vari);
                }
            }
        }

        static Mesh MatterhornRunko()
        {
            var r = new Rakentaja();
            var p = MhVerkko();
            // Vuori yhtenä ääriviivaosana: ääriviiva kiertää koko siluetin eikä jokaista tahkoa.
            r.AloitaOsa();
            MhHuippupyramidi(r, p, -1);
            for (int m = 0; m < MhMeridiaanit; m++)
            {
                int n = (m + 1) % MhMeridiaanit;
                string[] kartta = MhVarit[m / 3];
                // Rinteet silmukasta toiseen (olkapäät, seinät, itäseinän lumireunus ja tumma kallionauha).
                for (int k = 0; k + 1 < MhSilmukat; k++)
                    r.NelioUlos(p[m, k], p[n, k], p[n, k + 1], p[m, k + 1], MhUlos((p[m, k] + p[n, k + 1]) * 0.5f), MhVari(kartta[3 + k][m % 3]));
            }
            r.LopetaOsa();

            MhJaatikko(r, p);
            MhGornergrat(r);
            MhZermatt(r);
            return r.Verkko("Matterhorn");
        }

        /// <summary>
        /// Matterhorngletscher pohjoisseinän juurella: lumen peittämä yläosa seinän alimmassa vyössä ja jääkieli, joka laskee
        /// maahan oikealle eteen (oma ääriviivaosa, joten kielen reuna erottuu kartasta).
        /// </summary>
        static void MhJaatikko(Rakentaja r, Vector3[,] p)
        {
            var ulos = new Vector3(0.69f, 0f, -0.72f).normalized;
            var sivu = Vector3.Cross(Vector3.up, ulos);
            // Juuren paikat pohjoisseinällä (meridiaani, osuus seuraavaan): seinän keskiosa Zmuttin ja Hörnlin välissä.
            (int m, float f)[] paikat = { (0, 0.55f), (1, 0.2f), (1, 0.75f), (2, 0.35f) };
            float[] leveys = { 0.012f, 0.045f, 0.045f, 0.012f };
            var juuri = new Vector3[4]; var keski = new Vector3[4];
            for (int j = 0; j < 4; j++)
            {
                var (m, f) = paikat[j];
                Vector3 y5 = Vector3.Lerp(p[m, 5], p[m + 1, 5], f), y6 = Vector3.Lerp(p[m, 6], p[m + 1, 6], f);
                var a = MhAkseli(0f);
                var o = new Vector3(y6.x - a.x, 0f, y6.z - a.z).normalized;
                juuri[j] = Vector3.Lerp(y5, y6, 0.35f) + o * 0.014f;
                keski[j] = y6 + ulos * leveys[j] + Vector3.up * 0.014f;
            }
            var karki = (keski[1] + keski[2]) * 0.5f + ulos * 0.07f;
            karki.y = 0.003f;
            Vector3 k0 = karki - sivu * 0.03f, k1 = karki + sivu * 0.03f;
            // Kärjen kulmat keskirivin päiden puolelle.
            if ((k0 - keski[0]).sqrMagnitude > (k1 - keski[0]).sqrMagnitude) (k0, k1) = (k1, k0);
            r.AloitaOsa();
            for (int j = 0; j < 3; j++)
                r.NelioUlos(juuri[j], juuri[j + 1], keski[j + 1], keski[j], Vector3.up + ulos * 0.5f, MhLumi);
            r.KolmioUlos(keski[0], keski[1], k0, Vector3.up, MhJaa);
            r.NelioUlos(keski[1], keski[2], k1, k0, Vector3.up, MhJaa);
            r.KolmioUlos(keski[2], keski[3], k1, Vector3.up, MhJaa);
            r.LopetaOsa();
        }

        /// <summary>
        /// Riffelberg–Gornergrat: niittykukkula vasemmalla edessä, jonka harjaa rata nousee suoraan ala-asemalta
        /// (Zermatt) yläasemalle; huipulla Kulmhotel kahden observatoriokupolin kanssa.
        /// </summary>
        static void MhGornergrat(Rakentaja r)
        {
            var d = MhRataLoppu - MhRataAlku;
            var vaaka = new Vector3(d.x, 0f, d.z).normalized;
            var sivu = Vector3.Cross(Vector3.up, vaaka);
            float[] t = { -0.14f, 0f, 0.5f, 1f, 1.22f };
            int n = t.Length;
            var harja = new Vector3[n];
            for (int i = 0; i < n; i++)
            {
                harja[i] = MhRataAlku + d * t[i];
                if (t[i] < 0f) harja[i].y = 0.004f;
                if (t[i] > 1f) harja[i].y = MhRataLoppu.y + 0.004f;
            }
            const float puoli = 0.008f;
            float Leveys(float y) => 0.02f + 0.5f * y;
            r.AloitaOsa();
            for (int i = 0; i + 1 < n; i++)
            {
                Vector3 a = harja[i], b = harja[i + 1];
                float la = Leveys(a.y), lb = Leveys(b.y);
                Vector3 ae = a - sivu * puoli, be = b - sivu * puoli, at = a + sivu * puoli, bt = b + sivu * puoli;
                Vector3 aeMaa = a - sivu * la, beMaa = b - sivu * lb, atMaa = a + sivu * la, btMaa = b + sivu * lb;
                aeMaa.y = beMaa.y = atMaa.y = btMaa.y = 0f;
                bool rata = t[i] >= 0f && t[i + 1] <= 1f;
                r.NelioUlos(ae, be, bt, at, Vector3.up, rata ? MhRatapenkka : MhNiitty);
                r.NelioUlos(ae, be, beMaa, aeMaa, -sivu + Vector3.up * 0.5f, MhNiitty);
                r.NelioUlos(at, bt, btMaa, atMaa, sivu + Vector3.up * 0.5f, MhNiitty);
            }
            // Päädyt: kukkulan alku kylän puolella ja jyrkkä pää Gornergratin takana.
            foreach (int i in new[] { 0, n - 1 })
            {
                var c = harja[i];
                float l = Leveys(c.y);
                var pois = i == 0 ? -vaaka : vaaka;
                Vector3 e = c - sivu * puoli, tt = c + sivu * puoli, eMaa = c - sivu * l, tMaa = c + sivu * l;
                eMaa.y = tMaa.y = 0f;
                var karki = c + pois * (0.03f + 0.4f * c.y); karki.y = 0f;
                r.KolmioUlos(e, tt, karki, pois + Vector3.up * 0.3f, MhNiitty);
                r.KolmioUlos(e, eMaa, karki, pois - sivu + Vector3.up * 0.3f, MhNiitty);
                r.KolmioUlos(tt, tMaa, karki, pois + sivu + Vector3.up * 0.3f, MhNiitty);
            }
            r.LopetaOsa();
            // Lehtikuusia kukkulan alarinteillä (radan varrella, molemmin puolin): rinteen pinnan korkeus lasketaan harjalta.
            foreach (var (tt, puoliRinne, osuus) in new[] { (0.12f, -1f, 0.55f), (0.35f, -1f, 0.62f), (0.58f, -1f, 0.58f), (0.25f, 1f, 0.6f), (0.5f, 1f, 0.66f) })
            {
                var c = MhRataAlku + d * tt;
                float l = Leveys(c.y), dd = puoli + (l - puoli) * osuus;
                var q = c + sivu * (dd * puoliRinne);
                q.y = c.y * (1f - osuus) - 0.004f;
                r.Kartio(q, 0.012f, 0.036f, 5, EmPuu);
            }
            // Kulmhotel Gornergrat yläasemalla: kivitalo ja kaksi observatoriokupolia (viisisivuiset, pieniä 60 pt:ssä).
            var h = harja[n - 1] - vaaka * 0.012f;
            r.Laatikko(h, new Vector3(0.034f, 0.022f, 0.022f), EmKiviVaalea, EmKatto);
            r.Timantti(h + new Vector3(-0.012f, 0.026f, 0f), 0.009f, 0.01f, EmPaperi, 5);
            r.Timantti(h + new Vector3(0.012f, 0.026f, 0f), 0.009f, 0.01f, EmPaperi, 5);
        }

        /// <summary>Zermatt: tummat hirsitalot liuskekivikatoin, valkoinen kirkontorni ja lehtikuusia kylän ympärillä.</summary>
        static void MhZermatt(Rakentaja r)
        {
            foreach (var (p, suunta) in MhTalot)
                r.Talo(p, suunta, 0.042f, 0.03f, 0.026f, 0.018f, MhHirsi, MhLiuske);
            var kirkko = MhP(0.005f, 0f, -0.39f);
            r.Pylvas(kirkko, 0.009f, 0.05f, 6, EmPaperi);
            r.Kartio(kirkko + Vector3.up * 0.05f, 0.011f, 0.028f, 6, EmKatto);
            foreach (var puu in new[] { MhP(-0.09f, 0f, -0.51f), MhP(0.15f, 0f, -0.48f), MhP(0.17f, 0f, -0.39f),
                         MhP(0.08f, 0f, -0.52f), MhP(0.2f, 0f, -0.44f), MhP(0.07f, 0f, -0.36f) })
                r.Kartio(puu, 0.013f, 0.04f, 5, EmPuu);
        }

        /// <summary>Pilvimöykky: litteä seitsensektorinen ellipsoidi (28 kolmiota), pitkä akseli tuulen suuntaan ja pohja litteämpi;
        /// kierto (rad) vaihtelee möykyittäin, jotta ketju ei näytä helminauhalta.</summary>
        static void MhMoykky(Rakentaja r, Vector3 k, float rp, float rs, float rk, Color vari, float kierto = 0f)
        {
            var ep = MhTuuli;
            var es = Vector3.Cross(Vector3.up, ep);
            const int n = 7;
            var yla = new Vector3[n]; var ala = new Vector3[n];
            for (int i = 0; i < n; i++)
            {
                float a = kierto + i * Mathf.PI * 2f / n;
                var d = ep * (Mathf.Cos(a) * rp) + es * (Mathf.Sin(a) * rs);
                yla[i] = k + d * 0.78f + Vector3.up * (rk * 0.55f);
                ala[i] = k + d + Vector3.up * (-rk * 0.12f);
            }
            Vector3 ylin = k + Vector3.up * rk, alin = k - Vector3.up * (rk * 0.4f);
            for (int i = 0; i < n; i++)
            {
                int j = (i + 1) % n;
                r.KolmioKeskelta(ylin, yla[i], yla[j], k, vari);
                r.NelioKeskelta(yla[i], yla[j], ala[j], ala[i], k, vari);
                r.KolmioKeskelta(alin, ala[j], ala[i], k, vari);
            }
        }

        /// <summary>Lippupilven möykyt (etäisyys tuulen suuntaan, nousu, sivusiirto, puoliakselit): juuri kapea, keskeltä
        /// paksuin ja kaksi kumpunuppia päällä, pyrstö ohenee ja nousee hieman.</summary>
        static readonly (float d, float y, float s, float rp, float rs, float rk)[] MhPilviMoykyt =
        {
            (0.025f, 0f, 0f, 0.055f, 0.048f, 0.042f),
            (0.11f, 0.015f, 0.015f, 0.082f, 0.07f, 0.062f),
            (0.22f, 0.03f, -0.012f, 0.098f, 0.08f, 0.07f),
            (0.325f, 0.025f, 0.018f, 0.088f, 0.072f, 0.062f),
            (0.425f, 0.038f, -0.01f, 0.065f, 0.058f, 0.05f),
            (0.175f, 0.082f, 0f, 0.058f, 0.05f, 0.05f),
            (0.305f, 0.08f, 0.008f, 0.052f, 0.045f, 0.045f),
        };

        /// <summary>Lippupilvi (pivot juuressa, MhPilviJuuri): möykyt tuulen suuntaan. Skaalautuu juuresta, joten pilvi kasvaa
        /// huipun kyljestä ulos.</summary>
        static Mesh MatterhornLippupilvi()
        {
            var r = new Rakentaja();
            var es = Vector3.Cross(Vector3.up, MhTuuli);
            for (int i = 0; i < MhPilviMoykyt.Length; i++)
            {
                var (d, y, s, rp, rs, rk) = MhPilviMoykyt[i];
                MhMoykky(r, MhTuuli * d + Vector3.up * y + es * s, rp, rs, rk, MhPilvi, i * 0.9f);
            }
            return r.Verkko("Matterhorn-lippupilvi");
        }

        /// <summary>Pilvenriekale (pivot möykyn keskellä): irtoaa lipun pyrstöstä ja haihtuu.</summary>
        static Mesh MatterhornHattara()
        {
            var r = new Rakentaja();
            MhMoykky(r, Vector3.zero, 0.055f, 0.047f, 0.042f, MhPilvi, 0.4f);
            return r.Verkko("Matterhorn-hattara");
        }

        /// <summary>
        /// Alppihehku, osa 0 (pivot Sveitsin huippu + 0,015) tai 1 (Italian huippu + 0,015): huippupyramidin oman huipun
        /// viuhka 0,006 pinnan ulkopuolella ruusukultaisena (lumi vaaleampi, kallio syvempi). Koska jokainen viuhkan tahko
        /// kulkee pivot-huipun kautta, huipulta skaalattu kuori pysyy omissa tasoissaan: hehku leviää huipuilta alas ja
        /// vetäytyy takaisin ilman haamumuotoja.
        /// </summary>
        static Mesh MatterhornAlppihehku(int osa)
        {
            var r = new Rakentaja();
            MhHuippupyramidi(r, MhVerkko(), osa);
            return r.Verkko("Matterhorn-alppihehku" + osa);
        }

        /// <summary>Radan suuntainen kanta: eteen (ylämäkeen), sivulle ja radan normaali ylös.</summary>
        static (Vector3 f, Vector3 s, Vector3 u) MhRadanKanta()
        {
            var f = (MhRataLoppu - MhRataAlku).normalized;
            var s = Vector3.Cross(Vector3.up, f).normalized;
            return (f, s, Vector3.Cross(f, s));
        }

        /// <summary>Junan pivot: ala-asema radan pinnalla.</summary>
        static Vector3 MhJunaPivot => MhRataAlku + Vector3.up * 0.002f;

        /// <summary>Vaunu radan suuntaisena laatikkona: keskipohja k, pituus, leveys ja korkeus (sivut ja katto).</summary>
        static void MhVaunu(Rakentaja r, Vector3 k, float pit, float lev, float kor)
        {
            var (f, s, u) = MhRadanKanta();
            Vector3 F = f * (pit * 0.5f), S = s * (lev * 0.5f), U = u * kor;
            Vector3 a = k - F - S, b = k + F - S, c = k + F + S, d = k - F + S, keski = k + U * 0.5f;
            r.NelioKeskelta(a, b, b + U, a + U, keski, MhJuna);
            r.NelioKeskelta(b, c, c + U, b + U, keski, MhJuna);
            r.NelioKeskelta(c, d, d + U, c + U, keski, MhJuna);
            r.NelioKeskelta(d, a, a + U, d + U, keski, MhJuna);
            r.NelioKeskelta(a + U, b + U, c + U, d + U, keski, MhJunaKatto);
        }

        /// <summary>Hammasratasjuna (pivot ala-asemalla, MhJunaPivot): kaksi punaista vaunua radan suuntaan, liioiteltu noin
        /// nelinkertaiseksi, jotta juna erottuu 60 pt:ssä liikkuvana punaisena viivana.</summary>
        static Mesh MatterhornJuna()
        {
            var r = new Rakentaja();
            var (f, _, _) = MhRadanKanta();
            MhVaunu(r, f * 0.015f, 0.028f, 0.02f, 0.018f);
            MhVaunu(r, f * -0.015f, 0.028f, 0.02f, 0.018f);
            return r.Verkko("Matterhorn-juna");
        }

        /// <summary>Yövalot (pivot kylän keskellä): talojen ikkunat kameran puolella, kirkon ikkuna ja kylän hehku maassa.</summary>
        static Mesh MatterhornValot()
        {
            var r = new Rakentaja();
            foreach (var (p, suunta) in MhTalot)
            {
                var n = new Vector3(Mathf.Sin(suunta), 0f, -Mathf.Cos(suunta));   // talon etuseinän normaali (eteen, −Z)
                r.Laatta(p + n * 0.0155f + Vector3.up * 0.012f - MhKyla, n, 0.02f, 0.014f, EmIkkunavalo);
            }
            r.Laatta(MhP(0.005f, 0.03f, -0.39f - 0.0095f) - MhKyla, Vector3.back, 0.006f, 0.012f, EmIkkunavalo);
            r.Kiekko(new Vector3(0.01f, 0.002f, 0.005f), 0.1f, 0.065f, 12, EmIkkunavalo);
            return r.Verkko("Matterhorn-valot");
        }

        static LiikkuvaOsaMaaritys[] MatterhornOsat()
        {
            var rata = MhRataLoppu - MhRataAlku;
            return new[]
            {
                new LiikkuvaOsaMaaritys { Nimi = "lippupilvi", Verkko = MatterhornLippupilvi, Pivot = MhPilviJuuri, Liike = Liike.Keinunta,
                    Akseli = Vector3.up, Nopeus = 1f / 9f, Laajuus = 3f, KayS = 36f, TaukoS = 50f },
                new LiikkuvaOsaMaaritys { Nimi = "hattara0", Verkko = MatterhornHattara, Pivot = MhPilviJuuri, Liike = Liike.Liuku,
                    Akseli = MhTuuli, Laajuus = 0.3f, KayS = 7f },
                new LiikkuvaOsaMaaritys { Nimi = "hattara1", Verkko = MatterhornHattara, Pivot = MhPilviJuuri, Liike = Liike.Liuku,
                    Akseli = MhTuuli, Laajuus = 0.3f, KayS = 7f },
                new LiikkuvaOsaMaaritys { Nimi = "alppihehku0", Verkko = () => MatterhornAlppihehku(0), Pivot = MhSveitsi + MhHehkuNosto,
                    Liike = Liike.Valahdys },
                new LiikkuvaOsaMaaritys { Nimi = "alppihehku1", Verkko = () => MatterhornAlppihehku(1), Pivot = MhItalia + MhHehkuNosto,
                    Liike = Liike.Valahdys },
                new LiikkuvaOsaMaaritys { Nimi = "juna", Verkko = MatterhornJuna, Pivot = MhJunaPivot, Liike = Liike.Liuku,
                    Akseli = rata.normalized, Laajuus = rata.magnitude, KayS = 14f },
                new LiikkuvaOsaMaaritys { Nimi = "valot", Verkko = MatterhornValot, Pivot = MhKyla, Liike = Liike.Valahdys },
            };
        }

        static readonly bool matterhorn = Rekisteroi("matterhorn",
            new Erikoismalli { Runko = MatterhornRunko, Osat = MatterhornOsat, Kolmiot0 = 787, KokoKerroin = 1.5f });
    }
}
