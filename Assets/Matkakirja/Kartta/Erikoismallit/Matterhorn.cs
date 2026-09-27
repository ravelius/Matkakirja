using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// ERIKOISMALLI MATTERHORN v2 (speksi docs/raportit/erikoismallit/matterhorn.md; elämänidea hyväksytty 27.9. klo 07.5x; v2 Fablen
    /// päätös 10.3x laitekuvan jälkeen: v1 luki 55°:ssa ja 112 pt:ssä isona litteäseinäisenä kiilana, koukku ei erottunut ja malli
    /// peitti liikaa karttaa).
    /// Tunnistus sekunnissa: kapea ja jyrkkä huippupyramidi, jonka koukku erottuu etelästä sekä 30°:ssa että 55°:ssa: kärki
    /// (Sveitsin huippu) on vasemmalla ja ulkonee hieman lähes pystysuoran vasemman kyljen yli, vino huippuharjanne laskee oikealle
    /// Italian huipulle, ja koukun alla on Furggenin olan lovi; oikealla Zmuttin olka. Seinät on taiteltu harjanteiksi ja uomiksi
    /// (joka seinällä uoma, kylkiluu, uoma) ja lumi on uomissa juovina eikä isoina levyinä. Juurella tumma kallionauha,
    /// Matterhorngletscher, Zermattin kylä ja Gornergratin hammasrata.
    /// Mitat: yksikkö 1,0 ≈ 4 km vaakasuunnassa; vuoren juuri etelästä katsottuna 0,68 (koko jalanjälki kylineen noin 0,8), korkeus
    /// 1,0 (huippu nousee jäätiköiden yläpuolelle noin 1,5 km → pystyliioittelu noin 2,6). Takarinteet ovat jyrkempiä kuin 60°
    /// (muuten 30°:n kamera näkisi takarinteen huipun yläpuolella).
    /// SUUNTA TYYLITELTY: kuuluisa Zermattin näkymä katsoo koillisesta lounaaseen, mutta kallistettu kamera katsoo etelästä,
    /// joten vuori on käännetty noin 125° myötäpäivään: Hörnlin harjanne (todellisuudessa koilliseen) osoittaa kameraa kohti
    /// (−Z), itäseinä on vasemmalla ja pohjoisseinä oikealla edessä, Furggen vasemmalle, Zmutt oikealle ja Lion taakse.
    /// Huippuharjanne (Sveitsin ja Italian huippu) on käännetty vasemmalta oikealle, jotta vino koukkuhuippu näkyy, ja huippulohko
    /// kallistuu hieman kameraa kohti (todellisuudessa koilliseen). Zermatt (edessä) ja Gornergrat (vasemmalla edessä) ovat samassa
    /// käännetyssä suunnassa, etäisyydet tiivistetty.
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
        const float MhDx = 0.044f, MhDz = 0.106f;
        static Vector3 MhP(float x, float y, float z) => new Vector3(x + MhDx, y, z + MhDz);

        /// <summary>Huippuharjanne: Sveitsin huippu (4 478 m, korkein, vasemmalla; kärki ulkonee 0,01 vasemman kyljen yli) ja Italian
        /// huippu (4 476 m, oikealla ja alempana). Vino harjanne ja ulkoneva kärki ovat Zermattin näkymän koukku.</summary>
        static readonly Vector3 MhSveitsi = MhP(-0.1f, 1f, -0.02f), MhItalia = MhP(-0.03f, 0.955f, -0.015f);

        /// <summary>
        /// Harjanteet silmukoittain (0 = huippupyramidin alareuna … 5 = maa) mallin avaruudessa; järjestys myötäpäivään ylhäältä:
        /// Zmutt (oikealle ja hieman taakse), Hörnli (kameraa kohti), Furggen (vasemmalle), Lion (taakse). Silmukka 1 on olkapäät:
        /// Furggenin olan lovi koukun alla, Hörnlin olka, Zmuttin olka ja Pic Tyndall. Alarinteet levenevät hieman (kovera profiili).
        /// </summary>
        static readonly Vector3[][] MhHarjanteet =
        {
            new[] { MhP(0.1f, 0.66f, 0.02f), MhP(0.175f, 0.57f, 0.035f), MhP(0.225f, 0.45f, 0.05f), MhP(0.272f, 0.28f, 0.06f), MhP(0.315f, 0.12f, 0.07f), MhP(0.345f, 0f, 0.075f) },
            new[] { MhP(-0.075f, 0.745f, -0.115f), MhP(-0.07f, 0.695f, -0.16f), MhP(-0.064f, 0.47f, -0.21f), MhP(-0.058f, 0.28f, -0.245f), MhP(-0.054f, 0.12f, -0.272f), MhP(-0.05f, 0f, -0.29f) },
            new[] { MhP(-0.09f, 0.73f, -0.005f), MhP(-0.17f, 0.675f, 0f), MhP(-0.205f, 0.47f, 0.005f), MhP(-0.25f, 0.29f, 0.01f), MhP(-0.295f, 0.12f, 0.012f), MhP(-0.33f, 0f, 0.015f) },
            new[] { MhP(-0.035f, 0.72f, 0.1f), MhP(-0.035f, 0.66f, 0.14f), MhP(-0.037f, 0.46f, 0.18f), MhP(-0.04f, 0.28f, 0.21f), MhP(-0.042f, 0.12f, 0.23f), MhP(-0.044f, 0f, 0.245f) },
        };

        /// <summary>Silmukat, meridiaanit ja tahkot seinää kohden (harjanne, uoma, kylkiluu, uoma → seuraava harjanne).</summary>
        const int MhSilmukat = 6, MhMeridiaanit = 16, MhSeinaTahkot = 4;
        /// <summary>Harjanteiden meridiaanit: Zmutt, Hörnli, Furggen ja Lion.</summary>
        const int MhZmutt = 0, MhHornli = 4, MhFurggen = 8, MhLion = 12;
        /// <summary>Meridiaanien huiput: 0 = Sveitsin huippu (Hörnli, itäseinä, Furggen ja eteläseinän alku), 1 = Italian huippu
        /// (Zmutt, pohjoisseinä, Lion, länsiseinä ja eteläseinän loppu).</summary>
        static readonly int[] MhKarki = { 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1 };
        /// <summary>Seinän välimeridiaanit: osuus jänteellä harjanteelta seuraavalle, veto akselia kohti (syvät uomat 22 %, kylkiluu
        /// vain 3 %, joten pääharjanteet hallitsevat ja seinät taittuvat varjostukseltaan) ja painuma suhteessa kouruun.</summary>
        static readonly (float f, float veto, float painuma)[] MhSeinaMeridiaanit = { (0.25f, 0.22f, 1.6f), (0.5f, 0.03f, 0.3f), (0.75f, 0.22f, 1.6f) };
        /// <summary>Kourujen painuma silmukoittain: uomat ovat harjanteita alempana (lumi kerääntyy niihin).</summary>
        static readonly float[] MhKouru = { 0.02f, 0.03f, 0.025f, 0.02f, 0.01f, 0f };
        /// <summary>Uomien syvyys silmukoittain: kapean huippupyramidin juurella loiva (syvä uoma näkyisi ylhäältä railona),
        /// seinissä täysi.</summary>
        static readonly float[] MhUomaSyvyys = { 0.35f, 0.75f, 1f, 1f, 1f, 1f };
        /// <summary>Huippupyramidin vyöt säteittäin huipulta silmukkaan 0 (lumilakki, keskivyö, alavyö).</summary>
        static readonly float[] MhPaaVyot = { 0.3f, 0.62f, 1f };

        /// <summary>
        /// Värikartta seinittäin (0 pohjoisseinä oikealla edessä, 1 itäseinä vasemmalla edessä, 2 eteläseinä takana vasemmalla,
        /// 3 länsiseinä takana oikealla): rivit ylhäältä (3 huippupyramidin vyötä, 5 rinnevyötä), kussakin neljä tahkoa
        /// harjanteelta seuraavalle myötäpäivään (harjanne–uoma, uoma–kylkiluu, kylkiluu–uoma, uoma–harjanne). L lumi, V vaalea kallio,
        /// K kallio, T tumma kallionauha. Lumi on pystyjuovina uomissa (seinät taittuvat harjanteiksi, eivät isoja levyjä);
        /// alempana seinät ovat yhtenäistä kalliota, jonka syvät uomat taittavat varjostukseltaan, ja itä- ja eteläseinällä on
        /// tumma kallionauha; pohjoisseinällä lunta eniten, itäseinä vaaleaa kalliota lumijuovin (Zermattin näkymän kontrasti).
        /// </summary>
        static readonly string[][] MhVarit =
        {
            new[] { "LLLL", "LLLL", "LLKL", "LLKL", "KLKL", "KLKK", "KKKK", "KKKK" },
            new[] { "LLLL", "VLVV", "VLVL", "VLVL", "VLVV", "VVVV", "TTTT", "KKKK" },
            new[] { "LLLL", "KKLK", "KKLK", "KKLK", "KKKK", "KKKK", "TTTT", "KKKK" },
            new[] { "LLLL", "LKLL", "LKLK", "LKLK", "KKLK", "KKKK", "KKKK", "KKKK" },
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
        static readonly Vector3 MhPilviJuuri = MhP(-0.09f, 0.88f, -0.03f);
        /// <summary>Alppihehkun pivotit 0,015 huippujen yläpuolella: huipulta skaalattu kuori pysyy pinnan ulkopuolella.</summary>
        static readonly Vector3 MhHehkuNosto = new Vector3(0f, 0.015f, 0f);
        /// <summary>Gornergratin rata ala-asemalta (Zermatt) yläasemalle (Gornergrat): suora rata kukkulan harjalla. Vektori on
        /// sama kuin liikeytimessä (MatterhornLiike.RataX/Y/Z); muuta molempia yhdessä.</summary>
        static readonly Vector3 MhRata = new Vector3(-0.22f, 0.085f, 0.09f);
        static readonly Vector3 MhRataAlku = MhP(-0.1f, 0.012f, -0.38f), MhRataLoppu = MhRataAlku + MhRata;
        /// <summary>Lehtikuuset kylän ympärillä.</summary>
        static readonly Vector3[] MhPuut = { MhP(-0.07f, 0f, -0.43f), MhP(0.17f, 0f, -0.4f), MhP(0.185f, 0f, -0.33f),
            MhP(0.1f, 0f, -0.445f), MhP(0.2f, 0f, -0.365f), MhP(0.105f, 0f, -0.3f) };
        /// <summary>Kylän keskipiste (yövalojen pivot).</summary>
        static readonly Vector3 MhKyla = MhP(0.055f, 0f, -0.385f);
        /// <summary>Kirkontornin paikka (Zermattin Pyhän Mauritiuksen kirkko kylän vasemmalla laidalla).</summary>
        static readonly Vector3 MhKirkko = MhP(-0.012f, 0f, -0.335f);

        /// <summary>Zermattin talot: pohjan keskipiste ja harjan suunta (rad).</summary>
        static readonly (Vector3 p, float suunta)[] MhTalot =
        {
            (MhP(-0.005f, 0f, -0.395f), 0.35f),
            (MhP(0.055f, 0f, -0.36f), -0.15f),
            (MhP(0.108f, 0f, -0.395f), 0.25f),
            (MhP(0.055f, 0f, -0.43f), -0.3f),
            (MhP(0.132f, 0f, -0.345f), 0.1f),
        };

        /// <summary>Pystyakseli huippuharjanteen keskeltä (seinien koveruus ja tahkojen etupuoli).</summary>
        static Vector3 MhAkseli(float y) => new Vector3((MhSveitsi.x + MhItalia.x) * 0.5f, y, (MhSveitsi.z + MhItalia.z) * 0.5f);

        /// <summary>Ulospäin pystyakselista (tahkon etupuoli), hieman ylös.</summary>
        static Vector3 MhUlos(Vector3 c) { var a = MhAkseli(c.y); return new Vector3(c.x - a.x, 0f, c.z - a.z).normalized + Vector3.up * 0.3f; }

        static Vector3 MhKarkiPiste(int m) => MhKarki[m] == 0 ? MhSveitsi : MhItalia;

        /// <summary>
        /// Vuoren pisteverkko [meridiaani, silmukka]: neljä harjannetta ja kummankin välissä seinä, joka taittuu uomaksi, kylkiluuksi
        /// ja uomaksi (MhSeinaMeridiaanit): uomat vedetään akselia kohti ja painetaan kourun verran alemmas, kylkiluu työntyy hieman
        /// jänteen ulkopuolelle. Pieni toistettava kohina (siemen 1865, Whymperin ensinousun vuosi).
        /// </summary>
        static Vector3[,] MhVerkko()
        {
            var p = new Vector3[MhMeridiaanit, MhSilmukat];
            var sat = new System.Random(1865);
            for (int h = 0; h < 4; h++)
                for (int k = 0; k < MhSilmukat; k++)
                {
                    Vector3 a = MhHarjanteet[h][k], b = MhHarjanteet[(h + 1) % 4][k];
                    p[h * MhSeinaTahkot, k] = a;
                    for (int j = 0; j < MhSeinaMeridiaanit.Length; j++)
                    {
                        var (f, veto, painuma) = MhSeinaMeridiaanit[j];
                        var q = Vector3.Lerp(a, b, f);
                        var akseli = MhAkseli(q.y);
                        float v = (veto + 0.06f * ((float)sat.NextDouble() - 0.5f)) * (veto > 0.1f ? MhUomaSyvyys[k] : 1f);
                        q = akseli + (q - akseli) * (1f - v);
                        q.y = Mathf.Max(0f, q.y - MhKouru[k] * painuma * (0.8f + 0.4f * (float)sat.NextDouble()));
                        p[h * MhSeinaTahkot + 1 + j, k] = q;
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
                string[] kartta = MhVarit[m / MhSeinaTahkot];
                if (kuori < 0 || kuori == karki)
                {
                    float t0 = 0f;
                    for (int v = 0; v < MhPaaVyot.Length; v++)
                    {
                        float t1 = MhPaaVyot[v];
                        char c = kartta[v][m % MhSeinaTahkot];
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
                string[] kartta = MhVarit[m / MhSeinaTahkot];
                // Rinteet silmukasta toiseen (olkapäät, seinät, itäseinän lumireunus ja tumma kallionauha).
                for (int k = 0; k + 1 < MhSilmukat; k++)
                    r.NelioUlos(p[m, k], p[n, k], p[n, k + 1], p[m, k + 1], MhUlos((p[m, k] + p[n, k + 1]) * 0.5f), MhVari(kartta[3 + k][m % MhSeinaTahkot]));
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
            var (juuri, keski, k0, k1, ulos) = MhJaatikonPisteet(p);
            r.AloitaOsa();
            for (int j = 0; j < 3; j++)
                r.NelioUlos(juuri[j], juuri[j + 1], keski[j + 1], keski[j], Vector3.up + ulos * 0.5f, MhLumi);
            r.KolmioUlos(keski[0], keski[1], k0, Vector3.up, MhJaa);
            r.NelioUlos(keski[1], keski[2], k1, k0, Vector3.up, MhJaa);
            r.KolmioUlos(keski[2], keski[3], k1, Vector3.up, MhJaa);
            r.LopetaOsa();
        }

        /// <summary>Jäätikön rakennepisteet: juuririvi pohjoisseinällä, keskirivi maan rajassa, kielen kärjen kulmat ja virtaussuunta
        /// (rungon ja lähitason yhteiset, joten lähitason railot osuvat samalle pinnalle).</summary>
        static (Vector3[] juuri, Vector3[] keski, Vector3 k0, Vector3 k1, Vector3 ulos) MhJaatikonPisteet(Vector3[,] p)
        {
            var ulos = new Vector3(0.69f, 0f, -0.72f).normalized;
            var sivu = Vector3.Cross(Vector3.up, ulos);
            // Juuren paikat pohjoisseinällä (meridiaani, osuus seuraavaan): seinän keskiosa Zmuttin ja Hörnlin välissä.
            (int m, float f)[] paikat = { (0, 0.6f), (1, 0.5f), (2, 0.5f), (3, 0.35f) };
            float[] leveys = { 0.01f, 0.036f, 0.036f, 0.01f };
            var juuri = new Vector3[4]; var keski = new Vector3[4];
            for (int j = 0; j < 4; j++)
            {
                var (m, f) = paikat[j];
                Vector3 y5 = Vector3.Lerp(p[m, MhSilmukat - 2], p[m + 1, MhSilmukat - 2], f), y6 = Vector3.Lerp(p[m, MhSilmukat - 1], p[m + 1, MhSilmukat - 1], f);
                var a = MhAkseli(0f);
                var o = new Vector3(y6.x - a.x, 0f, y6.z - a.z).normalized;
                juuri[j] = Vector3.Lerp(y5, y6, 0.45f) + o * 0.012f;
                keski[j] = y6 + ulos * leveys[j] + Vector3.up * 0.012f;
            }
            var karki = (keski[1] + keski[2]) * 0.5f + ulos * 0.06f;
            karki.y = 0.003f;
            Vector3 k0 = karki - sivu * 0.026f, k1 = karki + sivu * 0.026f;
            // Kärjen kulmat keskirivin päiden puolelle.
            if ((k0 - keski[0]).sqrMagnitude > (k1 - keski[0]).sqrMagnitude) (k0, k1) = (k1, k0);
            return (juuri, keski, k0, k1, ulos);
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
            var kirkko = MhKirkko;
            r.Pylvas(kirkko, 0.009f, 0.05f, 6, EmPaperi);
            r.Kartio(kirkko + Vector3.up * 0.05f, 0.011f, 0.028f, 6, EmKatto);
            foreach (var puu in MhPuut)
                r.Kartio(puu, 0.013f, 0.04f, 5, EmPuu);
        }

        // ---- LÄHITASO (omistaja hyväksyi lähitason tyylin 27.9. klo 09.0x; Natiivisepän Erikoismalli.Lahi, katto 3 000) ----

        /// <summary>Lähitason sävyt rungon paletista. Ominaisuuksina, koska Em-paletti on toisessa tiedostossa (staattisten kenttien
        /// alustusjärjestys osittaisluokan tiedostojen välillä ei ole taattu).</summary>
        static Color MhLVarjoLumi => Color.Lerp(MhLumi, EmKivi, 0.4f);
        static Color MhLIkkuna => Color.Lerp(EmSeepia, EmMuste, 0.55f);
        static Color MhLOvi => Color.Lerp(EmKatto, EmMuste, 0.45f);
        static Color MhLRailo => Color.Lerp(MhJaa, EmMuste, 0.55f);
        static Color MhLParveke => Color.Lerp(MhHirsi, EmPaperi, 0.3f);
        /// <summary>Kerrostuman reunuksen alla oleva jyrkkä kaista: sama väri tummempana.</summary>
        static Color MhLTumma(Color c) => Color.Lerp(c, EmSeepia, 0.25f);

        /// <summary>Lähitason vuoren renkaan laji: rungon silmukka, kerrostuman hylly (reunuksen yläpinnan takareuna rinteessä) tai
        /// huuli (ulos työnnetty reuna).</summary>
        enum MhLRengas { Silmukka, Hylly, Huuli }
        /// <summary>Lähitason renkaat ylhäältä alas (laji, rungon vyö tai silmukka k): kerrostuman reunus vöissä 2 ja 3 (vyö 1 olkapäiden
        /// alla jää ehjäksi, jotta lumijuovat pysyvät yhtenäisinä).</summary>
        static readonly (MhLRengas laji, int k)[] MhLRenkaat =
        {
            (MhLRengas.Silmukka, 0), (MhLRengas.Silmukka, 1), (MhLRengas.Silmukka, 2),
            (MhLRengas.Hylly, 2), (MhLRengas.Huuli, 2), (MhLRengas.Silmukka, 3),
            (MhLRengas.Hylly, 3), (MhLRengas.Huuli, 3), (MhLRengas.Silmukka, 4),
            (MhLRengas.Silmukka, 5),
        };
        const int MhLMeridiaanit = 2 * MhMeridiaanit;
        /// <summary>Reunusvyöt (kerrostumat) lähitasossa.</summary>
        const int MhLReunusVyot = 3;
        /// <summary>Huippupyramidin lähitason vyöt säteittäin: rungon rajat 0,3 ja 0,62 säilyvät, väliin ohuet kerrostumat.</summary>
        static readonly float[] MhLPaaVyot = { 0.3f, 0.46f, 0.62f, 0.8f, 1f };

        /// <summary>Renkaan indeksi rungon silmukalle k.</summary>
        static int MhLSilmukka(int k)
        {
            for (int i = 0; i < MhLRenkaat.Length; i++) if (MhLRenkaat[i].laji == MhLRengas.Silmukka && MhLRenkaat[i].k == k) return i;
            return -1;
        }

        /// <summary>Vaakasuora ulospäin vuoren pystyakselista (ilman ylös-komponenttia).</summary>
        static Vector3 MhLUlos(Vector3 c) { var a = MhAkseli(c.y); return new Vector3(c.x - a.x, 0f, c.z - a.z).normalized; }

        /// <summary>
        /// Lähitason vuoriverkko [meridiaani, rengas] ja kerrostumien vahvuus [vyö, meridiaani]: rungon 16 meridiaania samoina
        /// pisteinä ja jokaisen parin väliin meridiaani. Silmukoissa 0 ja 6 välimeridiaani on tarkalleen jänteen keskellä, joten
        /// huippupyramidin tahkot pysyvät rungon tasoissa (alppihehkun kuori peittää ne) ja juuri maassa; muualla pieni kohina
        /// (kylkiluut ja uomat). Vöissä 2–3 kerrostuman reunus: hylly rinteen pinnalla 0,003 huulen yläpuolella ja huuli enintään
        /// 0,0075 ulos työnnettynä. Reunuksen korkeus vaeltaa (0,2–0,8 vyöstä) ja vahvuus hiipuu paikoin nollaan (pehmennetty
        /// kohina, siemen 4478), joten reunukset katkeilevat eivätkä näytä korkeuskäyriltä; lumiseinässä reunusta ei ole.
        /// </summary>
        static (Vector3[,] v, float[,] vahvuus) MhLVerkko()
        {
            var p = MhVerkko();
            var sat = new System.Random(4478);
            var q = new Vector3[MhLMeridiaanit, MhSilmukat];
            for (int m = 0; m < MhMeridiaanit; m++)
                for (int k = 0; k < MhSilmukat; k++)
                {
                    int n = (m + 1) % MhMeridiaanit;
                    q[2 * m, k] = p[m, k];
                    var c = (p[m, k] + p[n, k]) * 0.5f;
                    float s = (float)sat.NextDouble() - 0.5f, y = (float)sat.NextDouble() - 0.5f;
                    if (k > 0 && k < MhSilmukat - 1) c += MhLUlos(c) * (s * 0.012f) + Vector3.up * (y * 0.012f);
                    q[2 * m + 1, k] = c;
                }
            var osuus = new float[MhLReunusVyot + 1, MhLMeridiaanit]; var vahvuus = new float[MhLReunusVyot + 1, MhLMeridiaanit];
            for (int k = 1; k <= MhLReunusVyot; k++)
            {
                var a = new float[MhLMeridiaanit]; var b = new float[MhLMeridiaanit];
                for (int j = 0; j < MhLMeridiaanit; j++) { a[j] = (float)sat.NextDouble(); b[j] = (float)sat.NextDouble(); }
                for (int j = 0; j < MhLMeridiaanit; j++)
                {
                    int e = (j + MhLMeridiaanit - 1) % MhLMeridiaanit, n = (j + 1) % MhLMeridiaanit;
                    osuus[k, j] = 0.5f + 0.6f * ((a[e] + 2f * a[j] + a[n]) * 0.25f - 0.5f);
                    vahvuus[k, j] = Mathf.Clamp01(((b[e] + 2f * b[j] + b[n]) * 0.25f - 0.3f) / 0.3f);
                }
                // Lumiseinässä ei reunusta (molemmin puolin lunta): valoisa hylly näkyisi lumella piirretyltä viivalta.
                for (int j = 0; j < MhLMeridiaanit; j++)
                {
                    int e = (j + MhLMeridiaanit - 1) % MhLMeridiaanit;
                    if (MhVarit[e / 2 / MhSeinaTahkot][3 + k][e / 2 % MhSeinaTahkot] == 'L' && MhVarit[j / 2 / MhSeinaTahkot][3 + k][j / 2 % MhSeinaTahkot] == 'L')
                        vahvuus[k, j] = 0f;
                }
            }
            var v = new Vector3[MhLMeridiaanit, MhLRenkaat.Length];
            for (int i = 0; i < MhLRenkaat.Length; i++)
            {
                var (laji, k) = MhLRenkaat[i];
                for (int j = 0; j < MhLMeridiaanit; j++)
                {
                    if (laji == MhLRengas.Silmukka) { v[j, i] = q[j, k]; continue; }
                    float f = osuus[k, j];
                    var huuli = Vector3.Lerp(q[j, k], q[j, k + 1], f);
                    if (laji == MhLRengas.Huuli) { v[j, i] = huuli + MhLUlos(huuli) * (0.0075f * vahvuus[k, j]); continue; }
                    float dy = Mathf.Max(0.01f, q[j, k].y - q[j, k + 1].y);
                    v[j, i] = Vector3.Lerp(q[j, k], q[j, k + 1], Mathf.Max(0f, f - 0.003f / dy));
                }
            }
            return (v, vahvuus);
        }

        /// <summary>Lumi reunuksen hyllyllä: vain vahvoilla reunuksilla ja pehmeän kohinan mukaan lyhyinä jaksoina (vyö, meridiaani).</summary>
        static bool[,] MhLLumiHyllyt(float[,] vahvuus)
        {
            var sat = new System.Random(1865 * 3);
            var lumi = new bool[MhLReunusVyot + 1, MhLMeridiaanit];
            for (int k = 1; k <= MhLReunusVyot; k++)
            {
                var a = new float[MhLMeridiaanit];
                for (int j = 0; j < MhLMeridiaanit; j++) a[j] = (float)sat.NextDouble();
                for (int j = 0; j < MhLMeridiaanit; j++)
                {
                    int n = (j + 1) % MhLMeridiaanit;
                    lumi[k, j] = vahvuus[k, j] > 0.3f && vahvuus[k, n] > 0.3f && (a[j] + a[n]) * 0.5f > 0.45f;
                }
            }
            return lumi;
        }

        /// <summary>Lumikourut kalliossa (lähitason meridiaanitahko j, vyöt): itäseinän keskellä Zermattin näkymän lumiuoma ja
        /// eteläseinällä toinen.</summary>
        static readonly (int j, int ylin, int alin)[] MhLKourut = { };

        /// <summary>Lähitason rinnekaistan väri renkaan i alapuolella: rungon värikartan vyö ja sarake (sama väri samassa paikassa).
        /// Kalliossa reunuksen hylly on lunta jaksoittain (itäseinän lumijuovat) tai vaaleaa kalliota ja reunuksen alla tummempi
        /// kaista, molemmat reunuksen vahvuuden mukaan; lumiseinässä reunus näkyy vain muotona (varjostus). Lumikouruissa lunta.</summary>
        static Color MhLRinneVari(int j, int i, float[,] vahvuus, bool[,] lumi)
        {
            int m = j / 2, n = (j + 1) % MhLMeridiaanit;
            var (laji, k) = MhLRenkaat[i];
            char c = MhVarit[m / MhSeinaTahkot][3 + k][m % MhSeinaTahkot];
            var perus = MhVari(c);
            foreach (var (kj, ylin, alin) in MhLKourut)
                if (j == kj && k >= ylin && k <= alin) return laji == MhLRengas.Huuli ? MhLVarjoLumi : MhLumi;
            if (laji == MhLRengas.Silmukka || c == 'L') return perus;
            float w = Mathf.Min(vahvuus[k, j], vahvuus[k, n]);
            if (laji == MhLRengas.Hylly) return lumi[k, j] ? MhLumi : Color.Lerp(perus, EmKiviVaalea, 0.6f * w);
            return Color.Lerp(perus, MhLTumma(perus), w);
        }

        /// <summary>Huippupyramidin lähitason vyön väri: rungon rivi (0 lumilakki, 1 keski, 2 ala) ja kalliolla ohuet kerrostumat
        /// (vyö 2 tummempi, vyö 4 luminen); lumi pysyy lumena.</summary>
        static Color MhLPaaVari(int j, int b)
        {
            int m = j / 2, rivi = b == 0 ? 0 : b <= 2 ? 1 : 2;
            char c = MhVarit[m / MhSeinaTahkot][rivi][m % MhSeinaTahkot];
            var perus = MhVari(c);
            if (b != 2 && b != 4 || c == 'L') return perus;
            return b == 2 ? Color.Lerp(perus, MhLTumma(perus), 0.7f) : Color.Lerp(perus, MhLumi, 0.45f);
        }

        /// <summary>Kolmio kärjestä K säteittäin lähitason vyöhykkeisiin, lumen värisenä (huippuharjanteen puolikas): säteen K → P
        /// jakopisteet ovat samat kuin viereisen viuhkan, joten saumaan ei jää T-liitoksia.</summary>
        static void MhLSadeKaistat(Rakentaja r, Vector3 K, Vector3 P, Vector3 M, Vector3 ulos)
        {
            float t0 = 0f;
            foreach (float t1 in MhLPaaVyot)
            {
                Vector3 a1 = Vector3.Lerp(K, P, t1), b1 = Vector3.Lerp(K, M, t1);
                if (t0 == 0f) r.KolmioUlos(K, a1, b1, ulos, MhLumi);
                else r.NelioUlos(Vector3.Lerp(K, P, t0), Vector3.Lerp(K, M, t0), b1, a1, ulos, MhLumi);
                t0 = t1;
            }
        }

        /// <summary>Suojan puolen suunta harjanteen pisteessä: vaakasuunta harjameridiaanilta h naapurimeridiaanille s.</summary>
        static Vector3 MhLSuoja(Vector3[,] v, int h, int s, int i) { var d = v[s, i] - v[h, i]; d.y = 0f; return d.normalized; }

        /// <summary>
        /// Lumilippa (tuulen alapuolelle ulkoneva lumireunus) harjanteella h renkaiden a…b välillä, suoja meridiaanin s puolella:
        /// harja 0,004 rinteen yläpuolella, lippa 0,011 suojan puolelle, alapinta ja tuulen puoli upotettu rinteeseen. 6 kolmiota väliä
        /// kohden. Länsituulella lipat ulkonevat itään kuten lippupilvikin.
        /// </summary>
        static void MhLLippa(Rakentaja r, Vector3[,] v, int h, int s, int a, int b)
        {
            for (int i = a; i < b; i++)
            {
                Vector3 p0 = v[h, i], p1 = v[h, i + 1], l0 = MhLSuoja(v, h, s, i), l1 = MhLSuoja(v, h, s, i + 1);
                Vector3 T0 = p0 + Vector3.up * 0.004f, T1 = p1 + Vector3.up * 0.004f;
                Vector3 H0 = p0 + l0 * 0.011f - Vector3.up * 0.001f, H1 = p1 + l1 * 0.011f - Vector3.up * 0.001f;
                Vector3 A0 = p0 + l0 * 0.003f - Vector3.up * 0.014f, A1 = p1 + l1 * 0.003f - Vector3.up * 0.014f;
                Vector3 W0 = p0 - l0 * 0.003f - Vector3.up * 0.01f, W1 = p1 - l1 * 0.003f - Vector3.up * 0.01f;
                var ulos = (l0 + l1) * 0.5f;
                r.NelioUlos(T0, T1, H1, H0, Vector3.up + ulos * 0.3f, MhLumi);
                r.NelioUlos(H0, H1, A1, A0, ulos - Vector3.up * 0.5f, MhLVarjoLumi);
                r.NelioUlos(W0, W1, T1, T0, -ulos + Vector3.up * 0.3f, MhLumi);
            }
        }

        /// <summary>Kalliohampaat harjanteella h renkaiden a…b välillä: joka toiseen renkaanväliin tanakka neljäsivuinen torni
        /// (korkeus 0,009–0,013, kanta upotettu harjaan), kallion sävyinen. 4 kolmiota hammasta kohden.</summary>
        static void MhLHampaat(Rakentaja r, Vector3[,] v, int h, int a, int b, int siemen)
        {
            var sat = new System.Random(siemen);
            for (int i = a; i < b; i += 2)
            {
                float f = 0.35f + 0.3f * (float)sat.NextDouble(), kork = 0.009f + 0.004f * (float)sat.NextDouble();
                var c = Vector3.Lerp(v[h, i], v[h, i + 1], f) - Vector3.up * 0.007f;
                r.Kartio(c, 0.011f, kork + 0.007f, 4, Color.Lerp(EmKivi, EmKiviVaalea, 0.35f * (float)sat.NextDouble()));
            }
        }

        /// <summary>
        /// LÄHITASO (omistaja 27.9. klo 09.0x; Natiivisepän Erikoismalli.Lahi, katto 3 000 kolmiota; v2 10.3x): sama siluetti,
        /// mittasuhteet, värit, ääriviivaosat (vuori, jäätikkö, Gornergratin kukkula) ja osien pivotit kuin rungossa; 1 451 kolmiota
        /// (rungon 463 × 3,1) lähikuvan yksityiskohtiin. Korvaa rungon vain lähellä; lippupilvi, riekaleet, alppihehku, juna ja valot
        /// pysyvät ennallaan: huippupyramidin tahkot ovat rungon tasoissa (hehkun kuori peittää ne), radan penger on sama (juna kulkee
        /// sen päällä) ja talojen seinät samoilla paikoilla (yövalot osuvat ikkunoihin).
        ///   vuori     32 meridiaania (rungon harjanteet, uomat ja kylkiluut sekä hienommat kylkiluut niiden välissä) ja kerrostumat:
        ///             vöissä 2–3 katkeileva ulos työnnetty reunus, jonka hyllyllä kalliossa lunta (itäseinän lumijuovat) ja alla
        ///             tummempi jyrkkä kaista, lumiseinässä vain muotona; huippupyramidissa ohuet kerrostumat samoissa tasoissa;
        ///             lumilipat Hörnlin, Furggenin ja Lionin olalla sekä Zmuttin olalla (suoja itään); kalliohampaat Zmuttin ja
        ///             Furggenin alaharjanteilla; Hörnlin reitti polkuna Hörnlihütteltä Solvay-majalle; Italian huipun rautaristi
        ///   jäätikkö  rungon jäätikkö, railot poikittain virtaukseen ja reunarailo juurella
        ///   rata      kiskot ja hammastanko penkereellä, ala-asema radan alapäässä, Kulmhotelin ikkunat
        ///   Zermatt   rungon talot samoilla paikoilla: kivijalka, lehtikuusihirret, räystäät, ikkunat, ovi, parveke ja savupiippu;
        ///             kirkontornin kellotapulin aukot ja kello
        /// </summary>
        static Mesh MatterhornLahi()
        {
            var r = new Rakentaja();
            var (v, vahvuus) = MhLVerkko();
            var lumi = MhLLumiHyllyt(vahvuus);
            int nR = MhLRenkaat.Length;
            // Vuori yhtenä ääriviivaosana kuten rungossa (lipat ja polku sen sisällä).
            r.AloitaOsa();
            for (int j = 0; j < MhLMeridiaanit; j++)
            {
                int n = (j + 1) % MhLMeridiaanit, m = j / 2;
                var K = MhKarkiPiste(m);
                // Huippupyramidi: viuhkat rungon tasoissa, säteittäin vyöhykkeisiin.
                float t0 = 0f;
                for (int b = 0; b < MhLPaaVyot.Length; b++)
                {
                    float t1 = MhLPaaVyot[b];
                    Vector3 a1 = Vector3.Lerp(K, v[j, 0], t1), b1 = Vector3.Lerp(K, v[n, 0], t1);
                    var ulos = MhUlos((a1 + b1) * 0.5f);
                    if (b == 0) r.KolmioUlos(K, a1, b1, ulos, MhLPaaVari(j, b));
                    else r.NelioUlos(Vector3.Lerp(K, v[j, 0], t0), Vector3.Lerp(K, v[n, 0], t0), b1, a1, ulos, MhLPaaVari(j, b));
                    t0 = t1;
                }
                // Huippuharjanteen puolikkaat viuhkojen välissä kuten rungossa.
                if (j % 2 == 1 && MhKarki[(m + 1) % MhMeridiaanit] != MhKarki[m])
                {
                    var L = MhKarkiPiste((m + 1) % MhMeridiaanit);
                    var M = (K + L) * 0.5f;
                    var P = v[n, 0];
                    var ulos = MhUlos((K + L + P) / 3f);
                    MhLSadeKaistat(r, K, P, M, ulos);
                    MhLSadeKaistat(r, L, P, M, ulos);
                }
                // Rinteet renkaasta toiseen.
                for (int i = 0; i + 1 < nR; i++)
                    r.NelioUlos(v[j, i], v[n, i], v[n, i + 1], v[j, i + 1], MhUlos((v[j, i] + v[n, i + 1]) * 0.5f), MhLRinneVari(j, i, vahvuus, lumi));
            }
            // Lumilipat olkapäillä (suoja itään): Hörnli itäseinän puolelle, Zmutt pohjoisseinän, Furggen itäseinän ja Lion
            // eteläseinän puolelle.
            const int lH = 2 * MhHornli, lZ = 2 * MhZmutt, lF = 2 * MhFurggen, lL = 2 * MhLion;
            int s1 = MhLSilmukka(1), s2 = MhLSilmukka(2);
            MhLLippa(r, v, lH, lH + 1, 0, s1);
            MhLLippa(r, v, lZ, lZ + 1, s1, s2);
            MhLLippa(r, v, lF, lF - 1, 0, s1);
            MhLLippa(r, v, lL, lL - 1, 0, s1);
            // Hörnlin reitti: polku itäseinän puolella Hörnlihütteltä (silmukka 3) Solvay-majalle (silmukka 1), siksakkina.
            int s4 = MhLSilmukka(3);
            Vector3 Polku(int i) => Vector3.Lerp(v[lH, i], v[lH + 1, i], i % 2 == 0 ? 0.16f : 0.5f);
            for (int i = s4; i > s1; i--)
            {
                Vector3 a = Polku(i), b = Polku(i - 1);
                var nrm = Vector3.Cross(v[lH + 1, i] - v[lH, i], v[lH, i - 1] - v[lH, i]).normalized;
                if (Vector3.Dot(nrm, MhLUlos(a) + Vector3.up * 0.3f) < 0f) nrm = -nrm;
                Vector3 p0 = Vector3.Lerp(a, b, 0.18f) + nrm * 0.0015f, p1 = Vector3.Lerp(a, b, 0.82f) + nrm * 0.0015f;
                var sv = Vector3.Cross(nrm, p1 - p0).normalized * 0.0013f;
                r.NelioUlos(p0 - sv, p1 - sv, p1 + sv, p0 + sv, nrm, EmSeepia);
            }
            // Kalliohampaat (santarmit) harjanteilla: Zmuttin hampaat olan alla ja Furggenin alaharjanteen tornit.
            MhLHampaat(r, v, lZ, MhLSilmukka(2), MhLSilmukka(4), 1865);
            MhLHampaat(r, v, lF, MhLSilmukka(2) + 1, MhLSilmukka(4), 1868);
            r.LopetaOsa();
            // Solvay-hätämaja Hörnlin olalla (4 003 m) itäseinän puolella ja Hörnlihütte (3 260 m) harjanteen juurella.
            var lh = MhLSuoja(v, lH, lH + 1, s1);
            r.Talo(v[lH, s1] + lh * 0.009f - Vector3.up * 0.007f, -Mathf.PI * 0.5f, 0.014f, 0.009f, 0.009f, 0.004f, MhHirsi, EmKatto);
            var lh4 = MhLSuoja(v, lH, lH + 1, s4);
            var hutte = v[lH, s4] + lh4 * 0.012f - Vector3.up * 0.012f;
            r.Talo(hutte, 0f, 0.034f, 0.02f, 0.03f, 0.008f, EmPaperi, EmKatto);
            for (int y = 0; y < 2; y++)
                for (int x = -1; x <= 1; x++)
                    r.Laatta(hutte + new Vector3(x * 0.009f, 0.014f + y * 0.009f, -0.01f), Vector3.back, 0.0035f, 0.004f, MhLIkkuna);
            // Italian huipun rautaristi.
            r.Laatikko(MhItalia - Vector3.up * 0.004f, new Vector3(0.0022f, 0.028f, 0.0022f), EmMuste, EmMuste);
            r.Laatikko(MhItalia + Vector3.up * 0.015f, new Vector3(0.012f, 0.0022f, 0.0022f), EmMuste, EmMuste);

            MhLJaatikko(r);
            MhLGornergrat(r);
            MhLZermatt(r);
            return r.Verkko("Matterhorn-lahi");
        }

        /// <summary>Lähitason jäätikkö: rungon jäätikkö samoina tahkoina (oma ääriviivaosa), railot poikittain virtaukseen (lumiosan railo
        /// keskeltä myötävirtaan kaartuvana) ja reunarailo juuren alla.</summary>
        static void MhLJaatikko(Rakentaja r)
        {
            var p = MhVerkko();
            MhJaatikko(r, p);
            var (juuri, keski, k0, k1, ulos) = MhJaatikonPisteet(p);
            void Viiva(Vector3 a, Vector3 b, Vector3 nrm, float lev, Color vari)
            {
                var sv = Vector3.Cross(nrm, b - a).normalized * (lev * 0.5f);
                a += nrm * 0.0012f; b += nrm * 0.0012f;
                r.NelioUlos(a - sv, b - sv, b + sv, a + sv, nrm, vari);
            }
            void Railo(Vector3 a, Vector3 b, Vector3 nrm)
            {
                var c = (a + b) * 0.5f + ulos * 0.004f;
                Viiva(a, c, nrm, 0.0017f, MhLRailo); Viiva(c, b, nrm, 0.0017f, MhLRailo);
            }
            // Kieli: kolme railoa keskinelikulmiossa.
            var nk = Vector3.Cross(keski[2] - keski[1], k0 - keski[1]).normalized;
            if (nk.y < 0f) nk = -nk;
            foreach (float f in new[] { 0.22f, 0.48f, 0.74f })
                Viiva(Vector3.Lerp(keski[1], k0, f) + (keski[2] - keski[1]) * 0.12f, Vector3.Lerp(keski[2], k1, f) - (keski[2] - keski[1]) * 0.12f, nk, 0.0017f, MhLRailo);
            // Lumiosa: railot juuren suuntaisina ja reunarailo juuren alla.
            for (int j = 0; j < 3; j++)
            {
                var n = Vector3.Cross(juuri[j + 1] - juuri[j], keski[j] - juuri[j]).normalized;
                if (Vector3.Dot(n, Vector3.up + ulos * 0.5f) < 0f) n = -n;
                Viiva(Vector3.Lerp(juuri[j], keski[j], 0.1f), Vector3.Lerp(juuri[j + 1], keski[j + 1], 0.1f), n, 0.0022f, EmMuste);
                if (j == 1) Railo(Vector3.Lerp(juuri[j], keski[j], 0.55f) + (juuri[j + 1] - juuri[j]) * 0.15f,
                    Vector3.Lerp(juuri[j + 1], keski[j + 1], 0.55f) - (juuri[j + 1] - juuri[j]) * 0.15f, n);
            }
        }

        /// <summary>Lähitason Gornergrat: rungon kukkula, lehtikuuset ja Kulmhotel samoina; penkereellä kiskot ja hammastanko,
        /// ala-asema radan alapäässä Zermattin puolella ja Kulmhotelin ikkunat kameran puolella.</summary>
        static void MhLGornergrat(Rakentaja r)
        {
            MhGornergrat(r);
            var d = MhRataLoppu - MhRataAlku;
            var vaaka = new Vector3(d.x, 0f, d.z).normalized;
            var sivu = Vector3.Cross(Vector3.up, vaaka);
            // Kiskot (vaaleat, teräs) ja keskellä hammastanko penkereen harjalla: penger on rungossa tasainen poikkisuunnassa.
            foreach (float o in new[] { -0.0045f, 0f, 0.0045f })
                for (int i = 0; i < 2; i++)
                {
                    Vector3 a = MhRataAlku + d * (i * 0.5f) + sivu * o + Vector3.up * 0.0008f, b = MhRataAlku + d * ((i + 1) * 0.5f) + sivu * o + Vector3.up * 0.0008f;
                    var sv = sivu * (o == 0f ? 0.0008f : 0.0007f);
                    r.NelioUlos(a - sv, b - sv, b + sv, a + sv, Vector3.up, o == 0f ? EmKatto : EmKiviVaalea);
                }
            // Ala-asema radan alapäässä kameran puolella.
            var asema = MhRataAlku - vaaka * 0.02f - sivu * 0.024f;
            float kulma = (float)Math.Atan2(vaaka.z, vaaka.x);
            r.Talo(asema, kulma, 0.03f, 0.014f, 0.014f, 0.007f, EmPaperi, EmKatto);
            var etu = -sivu;
            for (int i = -1; i <= 1; i += 2)
                r.Laatta(asema + etu * 0.0071f + vaaka * (i * 0.008f) + Vector3.up * 0.008f, etu, 0.004f, 0.005f, MhLIkkuna);
            // Kulmhotelin ikkunat (rungon talo: keskipohja harjan päässä, koko 0,034 × 0,022 × 0,022).
            var harja = MhRataAlku + d * 1.22f; harja.y = MhRataLoppu.y + 0.004f;
            var h = harja - vaaka * 0.012f;
            for (int y = 0; y < 2; y++)
                for (int x = -1; x <= 1; x++)
                    r.Laatta(h + new Vector3(x * 0.0105f, 0.007f + y * 0.008f, -0.011f), Vector3.back, 0.0045f, 0.0045f, MhLIkkuna);
        }

        /// <summary>
        /// Lähitason Zermattin talo rungon talon paikalla ja koossa (seinät samoissa tasoissa, joten yövalot osuvat ikkunoihin):
        /// valkoinen kivijalka ja tummat lehtikuusihirret, räystäät (katto 0,004 seinien yli), etuseinällä kaksi yläkerran ikkunaa,
        /// ovi ja ikkuna sekä parveke, harjalla savupiippu. 50 kolmiota.
        /// </summary>
        static void MhLTalo(Rakentaja r, Vector3 p, float suunta, int nro)
        {
            const float lev = 0.042f, syv = 0.03f, h = 0.026f, harja = 0.018f, jalka = 0.009f, raystas = 0.004f;
            var ex = new Vector3(Mathf.Cos(suunta), 0f, Mathf.Sin(suunta));
            var ez = new Vector3(-Mathf.Sin(suunta), 0f, Mathf.Cos(suunta));
            Vector3 X = ex * (lev * 0.5f), Z = ez * (syv * 0.5f);
            Vector3 A = p - X - Z, B = p + X - Z, C = p + X + Z, D = p - X + Z;
            var keski = p + Vector3.up * (h * 0.5f);
            Vector3 yj = Vector3.up * jalka, yh = Vector3.up * h;
            var kulmat = new[] { A, B, C, D };
            for (int i = 0; i < 4; i++)
            {
                Vector3 a = kulmat[i], b = kulmat[(i + 1) % 4];
                r.NelioKeskelta(a, b, b + yj, a + yj, keski, EmKiviVaalea);
                r.NelioKeskelta(a + yj, b + yj, b + yh, a + yh, keski, MhHirsi);
            }
            // Harjakatto räystäineen: lappeet jatkuvat seinien yli, päätykolmiot seinien tasossa.
            Vector3 H1 = p - X + yh + Vector3.up * harja, H2 = p + X + yh + Vector3.up * harja;
            float lasku = raystas * harja / (syv * 0.5f);
            Vector3 xr = ex * raystas, zr = ez * raystas, yr = Vector3.up * lasku;
            var kk = p + yh + Vector3.up * (harja * 0.3f);
            r.NelioKeskelta(A + yh - xr - zr - yr, B + yh + xr - zr - yr, H2 + xr, H1 - xr, kk, MhLiuske);
            r.NelioKeskelta(D + yh - xr + zr - yr, C + yh + xr + zr - yr, H2 + xr, H1 - xr, kk, MhLiuske);
            r.KolmioKeskelta(A + yh, D + yh, H1, kk, MhHirsi);
            r.KolmioKeskelta(B + yh, C + yh, H2, kk, MhHirsi);
            // Ikkunat, ovi ja parveke kameran puolella (−ez).
            var etu = p - Z; var n = -ez;
            float puoli = nro % 2 == 0 ? 1f : -1f;
            r.Laatta(etu + ex * 0.009f + Vector3.up * 0.018f, n, 0.0055f, 0.006f, MhLIkkuna);
            r.Laatta(etu - ex * 0.009f + Vector3.up * 0.018f, n, 0.0055f, 0.006f, MhLIkkuna);
            r.Laatta(etu + ex * (0.012f * puoli) + Vector3.up * 0.0052f, n, 0.0058f, 0.0095f, MhLOvi);
            r.Laatta(etu - ex * (0.011f * puoli) + Vector3.up * 0.0058f, n, 0.0055f, 0.005f, MhLIkkuna);
            // Parveke yläkerran ikkunoiden alla: lattia ja kaide.
            Vector3 p0 = etu - ex * 0.016f + Vector3.up * 0.0135f, p1 = etu + ex * 0.016f + Vector3.up * 0.0135f;
            Vector3 u = n * 0.006f, kaide = Vector3.up * 0.0045f;
            r.NelioUlos(p0, p1, p1 + u, p0 + u, Vector3.up, MhLParveke);
            r.NelioUlos(p0 + u, p1 + u, p1 + u + kaide, p0 + u + kaide, n, MhLParveke);
            // Savupiippu harjan lähellä.
            r.Laatikko(p + ex * (0.011f * puoli) + Vector3.up * (h + harja * 0.45f), new Vector3(0.0055f, harja * 0.55f + 0.006f, 0.0055f), EmKiviVaalea, MhLIkkuna);
        }

        /// <summary>Lähitason Zermatt: talot yksityiskohtineen rungon paikoilla, kirkontorni kellotapulin aukkoineen ja kelloineen,
        /// lehtikuuset samoina.</summary>
        static void MhLZermatt(Rakentaja r)
        {
            for (int i = 0; i < MhTalot.Length; i++) MhLTalo(r, MhTalot[i].p, MhTalot[i].suunta, i);
            var kirkko = MhKirkko;
            r.Pylvas(kirkko, 0.009f, 0.05f, 6, EmPaperi);
            r.Kartio(kirkko + Vector3.up * 0.05f, 0.011f, 0.028f, 6, EmKatto);
            // Kuusikulmaisen tornin kameran puoleiset sivut (normaalit 210°, 270°, 330°): kellotapulin aukot ja kello.
            for (int i = 3; i <= 5; i++)
            {
                float a = (i + 0.5f) * Mathf.PI / 3f;
                var d = new Vector3(Mathf.Cos(a), 0f, Mathf.Sin(a));
                var pinta = kirkko + d * (0.009f * 0.866f);
                r.Laatta(pinta + Vector3.up * 0.042f, d, 0.0042f, 0.008f, MhLIkkuna);
                if (i == 4) r.Laatta(pinta + Vector3.up * 0.031f, d, 0.0048f, 0.0048f, EmKulta);
            }
            foreach (var puu in MhPuut)
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
            (0.02f, 0f, 0f, 0.044f, 0.038f, 0.034f),
            (0.088f, 0.012f, 0.012f, 0.066f, 0.056f, 0.05f),
            (0.176f, 0.024f, -0.01f, 0.078f, 0.064f, 0.056f),
            (0.26f, 0.02f, 0.014f, 0.07f, 0.058f, 0.05f),
            (0.34f, 0.03f, -0.008f, 0.052f, 0.046f, 0.04f),
            (0.14f, 0.066f, 0f, 0.046f, 0.04f, 0.04f),
            (0.244f, 0.064f, 0.006f, 0.042f, 0.036f, 0.036f),
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
            MhMoykky(r, Vector3.zero, 0.044f, 0.038f, 0.034f, MhPilvi, 0.4f);
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
            r.Laatta(MhKirkko + new Vector3(0f, 0.03f, -0.0095f) - MhKyla, Vector3.back, 0.006f, 0.012f, EmIkkunavalo);
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
                    Akseli = MhTuuli, Laajuus = 0.24f, KayS = 7f },
                new LiikkuvaOsaMaaritys { Nimi = "hattara1", Verkko = MatterhornHattara, Pivot = MhPilviJuuri, Liike = Liike.Liuku,
                    Akseli = MhTuuli, Laajuus = 0.24f, KayS = 7f },
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
            new Erikoismalli { Runko = MatterhornRunko, Osat = MatterhornOsat, Lahi = MatterhornLahi, Kolmiot0 = 843, KokoKerroin = 1.5f });
    }
}
