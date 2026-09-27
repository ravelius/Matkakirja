// ERIKOISMALLIN LIIKE: PANNONHALMA (omistaja valitsi elämänidean A 27.9.2026 klo 18.4x; speksi docs/raportit/erikoismallit/pannonhalma.md).
// Sama kaava kuin ErikoisLiike.cs: perusliike (Martinuksen hanhet), harvinainen tapahtuma (kellot soivat ja aura kiertää tornin),
// reaktio pelaajaan ja yövalot. Puhdas C#, ei allokaatioita kehyksessä: hanhien asennot lasketaan Askeleessa valmiisiin
// taulukoihin, ja Asento lukee aura- ja hanhinumeron osan nimen merkeistä (ei Substringiä). Aikataulu siemenellä noston id:stä.
using System;

namespace Matkakirja.Linssit.Elava
{
    /// <summary>
    /// Pannonhalma: perusliike = hanhiaura (V-muodostelma, 5–9 hanhea) lentää hitaasti kukkulan yli takaa oikealta vasemmalle
    /// eteen (9–12 s), ilmestyy ja katoaa mallin jalanjäljen reunalla (kukin hanhi reunan ylittäessään, 0,8 s), ja tauko on
    /// 20–60 s. Hanhet räpyttelevät ±35° (jakso noin 0,5 s) ja liitävät välillä 1–2 s kukin omaan tahtiinsa; aura keinuu ±0,01
    /// (3 s). Siemenestä vaihtelevat aurojen määrä (noin joka neljäs kerta kaksi auraa 3 s:n välein), hanhien määrä,
    /// lentokorkeus (0,6–0,7), reitin kulma (±20°) ja puoli (torni reitin vasemmalla tai oikealla), V:n kulma ja väli, ja noin
    /// joka kolmannella lennolla kärkihanhi vaihtuu kesken lennon: kärki pudottautuu toisen haaran perään ja haaran hanhet
    /// siirtyvät paikan eteenpäin (2,4 s).
    /// Reitti on tangentti tornin ympärille piirretylle ympyrälle (säde 0,15–0,19, leveällä V:llä pienempi; keskipiste 0,05 tornin
    /// takana), joten aura voi kiertää tornin sulavasti; kiireessä V tiivistyy, ja hanhi häipyy jalanjäljen reunalla, joten liike
    /// pysyy mallin päällä (10 h:n simulaatiossa yksikään hanhi ei näkynyt jalanjäljen ulkopuolella).
    /// Harvinainen (noin 1/10 auroista, oma kanava): kellot soivat — etukaikuaukon kello heilahtaa kolmesti ±35° (jakso 1,4 s)
    /// ja itäsivun kello puoli jaksoa myöhemmin, kolme äänirengasta laajenee kellokerroksesta kolmella ensimmäisellä lyönnillä
    /// (0,7 s:n välein), ja aura kaartaa tangenttipisteessä 360° tornin ympäri (noin 4,5 s, kallistuen ja hieman notkahtaen)
    /// ja jatkaa alkuperäiseen suuntaan (koko tapahtuma noin 8 s). Reaktio: lähestyttäessä aura ilmestyy heti; napautus soittaa
    /// kellot heti (enintään kerran 20 s:ssa, myös yöllä), ja lennossa oleva aura kiertää tornin (tai uusi aura tulee
    /// kiertämään). Yöllä aurat eivät lähde (lennossa oleva lentää loppuun), ja valot syttyvät 1,5 s:ssa.
    /// Levossa (ei auraa ilmassa, kellot hiljaa, valo vakaa) Liikkuu = false, joten elävä kerros piirtää 0 kehystä.
    /// </summary>
    public sealed class PannonhalmaLiike : ErikoisAnimaatio
    {
        public const int Auroja = 2, PaikkojaEnintaan = 9;
        /// <summary>Hanhipaikat auroittain (sama kuin Symbolimallit.PhAuranPaikat): aura 0 näyttää 5–9 hanhea, aura 1 5–7.</summary>
        static readonly int[] Paikkoja = { 9, 7 };
        /// <summary>Tornin akseli mallin avaruudessa (Symbolimallit.PhTx/PhTz).</summary>
        public const double TorniX = -0.12, TorniZ = -0.145;
        /// <summary>Hanhiosien yhteinen pivot (Symbolimallit.PhHanhiPivot): asento on hanhen paikka tämän suhteen.</summary>
        public const double PivotX = 0, PivotY = 0.65, PivotZ = 0;
        /// <summary>Jalanjäljen ellipsi, jonka reunalla hanhet ilmestyvät ja katoavat: kukkulan juuri (0,5 × 0,4) sisempänä ja
        /// takareunasta tiivistettynä (keskipiste z −0,03), koska etelästä kallistuva kamera nostaa korkealla lentävät hanhet
        /// ruudulla mallin takareunan yli.</summary>
        public const double ReunaX = 0.46, ReunaZ = 0.33, ReunaKeskiZ = -0.03;
        /// <summary>Reitin perussuunta (takaa oikealta vasemmalle eteen) yksikkövektorina.</summary>
        const double SuuntaX = -0.7808688, SuuntaZ = -0.6246950;

        public const double LentoMinS = 9, LentoMaxS = 12, SeisooMinS = 20, SeisooMaxS = 60, Puuska = 0.25, PuuskaValiS = 3;
        /// <summary>Lentokorkeus (tornin risti 0,543; kierroksen notkahdus 0,035 ja keinunta jättävät vähintään noin 0,01:n välin,
        /// mitattu alin 0,557).</summary>
        public const double KorkeusMin = 0.6, KorkeusMax = 0.7, ReittiVaihtelu = 20;
        public const double Harvinainen = 0.1, NapautusValiS = 20, KarkiTodennakoisyys = 0.35, KarkiS = 2.4, KarkiPullistuma = 0.022;
        /// <summary>Kierros: säde, kesto, nopeuskertoimen yläraja ja keskipisteen siirto tornin taakse (torni on vain 0,25 päässä
        /// jalanjäljen etureunasta, joten kierros keskitetään 0,05 tornin taakse; torni jää silti ympyrän sisään).</summary>
        public const double SilmukkaSadeMin = 0.15, SilmukkaSadeMax = 0.19, SilmukkaS = 4.5, SilmukkaKerroinMax = 3.2, SilmukkaKeskiZ = 0.05;
        /// <summary>Kiireessä (kellot ja kierros) muodostelma tiivistyy: sivuvälit 30 % ja syvyys 15 % pienemmiksi.</summary>
        public const double TiivisSivu = 0.3, TiivisTaka = 0.15;
        /// <summary>Kierroksen ulkoreunan raja kierroksen keskipisteestä (uloin hanhi = säde + tiivistetty sivuväli), jotta uloinkin
        /// hanhi pysyy jalanjäljen häivytysreunan sisällä tornin edessä.</summary>
        public const double SilmukkaUlkoraja = 0.243;
        /// <summary>Jalanjälki (kukkulan juuri 0,5 × 0,4): hanhi häipyy reunaa lähestyessään (normitettu säde 0,92 → 1).</summary>
        public const double JalanjalkiX = 0.5, JalanjalkiZ = 0.4, JalanjalkiHaivytys = 0.08;
        /// <summary>Kiire: kellojen soidessa aura kiihdyttää kohti tornia (ramppi 0,1 yksikköä) ja räpyttää 30 % nopeammin.</summary>
        public const double KiireRamppi = 0.1, KiireRapytys = 0.3;
        public const double KallistusSilmukassa = 24, SilmukkaNotkahdus = 0.035, KelloEnnenSilmukkaaS = 1.6;
        public const double HaivytysS = 0.8, Rapytys = 35, RapytysJaksoS = 0.5, LiitoKulma = 6, KeinuntaY = 0.01, KeinuntaS = 3;
        public const double KelloJaksoS = 1.4, KelloKulma = 35, KelloPorras = 0.7;
        public const int Heilahduksia = 3, Renkaita = 3;
        public const double RengasS = 2.2, RengasAlku = 0.15, RengasNousu = 0.02, RengasViive = 0.35, RengasPorras = 0.7;
        /// <summary>Kellotapahtuman kesto (itäsivun kello pysähtyy viimeisenä).</summary>
        public const double KelloLoppuS = Heilahduksia * KelloJaksoS + KelloPorras;

        sealed class Aura
        {
            public bool Lentaa, Silmukka, KelloOdottaa;
            /// <summary>Kärjen vaihto: −1 ei, 0 tulossa, 1 käynnissä, 2 tehty.</summary>
            public int N, Lento, Puoli, Karki = -1, KarkiHaara, VanhaKarki = -1;
            public double S, V, Aika, Ax, Az, Ux, Uz, L, H, Kulma, Vali, Sq, R, Sl, Cx, Cz, Kerroin = 1, KarkiAlkuS, KarkiAika, KelloS,
                Vaihe, TakaMax, KiireS, Kiire;
            public readonly int[] Haara = new int[PaikkojaEnintaan], Arvo = new int[PaikkojaEnintaan],
                Haara0 = new int[PaikkojaEnintaan], Arvo0 = new int[PaikkojaEnintaan];
            public readonly double[] Jakso = new double[PaikkojaEnintaan],
                Rapyttaa = new double[PaikkojaEnintaan], Liitaa = new double[PaikkojaEnintaan], Rytmi = new double[PaikkojaEnintaan],
                Siipi = new double[PaikkojaEnintaan];
            /// <summary>Koko reitin pituus (suora + mahdollinen silmukka).</summary>
            public double Pituus => L + (Silmukka ? 2 * Math.PI * R : 0);
        }

        readonly Aura[] aurat = { new Aura(), new Aura() };
        // Hanhien asennot (aura · 9 + hanhi): paikka pivotin suhteen, skaala ja puoliskojen kierrot.
        readonly double[] hx = new double[Auroja * PaikkojaEnintaan], hy = new double[Auroja * PaikkojaEnintaan], hz = new double[Auroja * PaikkojaEnintaan],
            hs = new double[Auroja * PaikkojaEnintaan], ow = new double[Auroja * PaikkojaEnintaan], ox = new double[Auroja * PaikkojaEnintaan],
            oy = new double[Auroja * PaikkojaEnintaan], oz = new double[Auroja * PaikkojaEnintaan], vw = new double[Auroja * PaikkojaEnintaan],
            vx = new double[Auroja * PaikkojaEnintaan], vy = new double[Auroja * PaikkojaEnintaan], vz = new double[Auroja * PaikkojaEnintaan];
        double tauko, toinen = -1, kello = -1, edellinenSoitto = double.NegativeInfinity;
        int lentoja, taukoja, soittoja, kierroksia, karkivaihtoja, kaksoislentoja;

        public PannonhalmaLiike(string id) : base(id) { tauko = Vali(5, 30, 0, 69); }

        public bool Lentaa => aurat[0].Lentaa || aurat[1].Lentaa;
        public bool Soi => kello >= 0;
        public int Lentoja => lentoja;
        public int Soittoja => soittoja;
        public int Kierroksia => kierroksia;
        public int KarkiVaihtoja => karkivaihtoja;
        public int KaksoisLentoja => kaksoislentoja;
        /// <summary>Auran a näkyvien hanhien määrä (0, jos aura ei lennä).</summary>
        public int Hanhia(int a) => aurat[a].Lentaa ? aurat[a].N : 0;
        /// <summary>Auran a kärki on parhaillaan kierroksella (testeille).</summary>
        public bool KiertaaNyt(int a)
        {
            var au = aurat[a];
            return au.Lentaa && au.Silmukka && au.S >= au.Sl && au.S <= au.Sl + 2 * Math.PI * au.R;
        }
        /// <summary>Aura a kiertää tornia tai kiertää tämän lennon aikana.</summary>
        public bool Kiertaa(int a) => aurat[a].Lentaa && aurat[a].Silmukka;
        /// <summary>Hanhen paikka mallin avaruudessa ja skaala (testeille ja esikatselulle).</summary>
        public (double x, double y, double z, double s) Hanhi(int a, int g)
        {
            int i = a * PaikkojaEnintaan + g;
            return (hx[i] + PivotX, hy[i] + PivotY, hz[i] + PivotZ, hs[i]);
        }

        /// <summary>Aura lähtee: reitti, muodostelma, räpyttelyn rytmi ja kärjen vaihto siemenestä (lennon järjestysnumero).</summary>
        void Laheta(int ai, bool silmukka)
        {
            var a = aurat[ai];
            int n = ++lentoja;
            a.Lento = n; a.Lentaa = true; a.Aika = 0; a.S = 0; a.Silmukka = false; a.KelloOdottaa = false; a.Kerroin = 1;
            int paikat = Paikkoja[ai];
            a.N = Math.Min(paikat, 5 + (int)(Arpa(n, 70) * (paikat - 4)));
            a.H = Vali(KorkeusMin, KorkeusMax, n, 71);
            a.Kulma = Vali(28, 40, n, 72) * Math.PI / 180;
            a.Vali = Vali(0.042, 0.05, n, 73);
            double k = Vali(-ReittiVaihtelu, ReittiVaihtelu, n, 74) * Math.PI / 180, c = Math.Cos(k), s = Math.Sin(k);
            a.Ux = SuuntaX * c - SuuntaZ * s; a.Uz = SuuntaX * s + SuuntaZ * c;
            a.Puoli = Arpa(n, 75) < 0.5 ? 1 : -1;
            // Muodostelman leveys (uloimman haaran hanhi) rajaa kierroksen säteen.
            int haara = a.N / 2;
            double sivuMax = haara * a.Vali * Math.Sin(a.Kulma) * (1 - TiivisSivu);
            a.R = Math.Min(Vali(SilmukkaSadeMin, SilmukkaSadeMax, n, 76), SilmukkaUlkoraja - sivuMax);
            // Tangenttipiste Q = C − puoli · vasen(U) · R, vasen(U) = (−Uz, Ux), C = kierroksen keskipiste tornin takana; reitti on
            // Q:n kautta kulkeva suora.
            double qx = TorniX + a.Puoli * a.Uz * a.R, qz = TorniZ + SilmukkaKeskiZ - a.Puoli * a.Ux * a.R;
            double ez = qz - ReunaKeskiZ;
            double ea = a.Ux * a.Ux / (ReunaX * ReunaX) + a.Uz * a.Uz / (ReunaZ * ReunaZ);
            double eb = 2 * (qx * a.Ux / (ReunaX * ReunaX) + ez * a.Uz / (ReunaZ * ReunaZ));
            double ec = qx * qx / (ReunaX * ReunaX) + ez * ez / (ReunaZ * ReunaZ) - 1;
            double juuri = Math.Sqrt(Math.Max(0, eb * eb - 4 * ea * ec));
            double t1 = (-eb - juuri) / (2 * ea), t2 = (-eb + juuri) / (2 * ea);
            a.Ax = qx + a.Ux * t1; a.Az = qz + a.Uz * t1; a.L = t2 - t1; a.Sq = -t1;
            // Muodostelma: kärki (haara 0), vasen haara +1 ja oikea −1 vuorotellen.
            int maxArvo = 0;
            for (int g = 0; g < PaikkojaEnintaan; g++)
            {
                a.Haara[g] = g == 0 ? 0 : (g % 2 == 1 ? 1 : -1);
                a.Arvo[g] = (g + 1) / 2;
                a.Haara0[g] = a.Haara[g]; a.Arvo0[g] = a.Arvo[g];
                if (g < a.N) maxArvo = Math.Max(maxArvo, a.Arvo[g]);
                int m = n * 16 + g;
                a.Jakso[g] = RapytysJaksoS * Vali(0.9, 1.1, m, 78);
                a.Rapyttaa[g] = Vali(2, 3.6, m, 80);
                a.Liitaa[g] = Vali(1, 2, m, 81);
                a.Rytmi[g] = Vali(0, a.Rapyttaa[g] + a.Liitaa[g], m, 82);
                a.Siipi[g] = Vali(0, 2 * Math.PI, m, 79);
            }
            a.TakaMax = maxArvo * a.Vali * Math.Cos(a.Kulma);
            a.V = (a.L + a.TakaMax) / Vali(LentoMinS, LentoMaxS, n, 77);
            a.Vaihe = Vali(0, 2 * Math.PI, n, 83);
            a.Karki = Arpa(n, 84) < KarkiTodennakoisyys ? 0 : -1;
            a.KarkiAlkuS = Vali(0.3, 0.55, n, 85) * a.L;
            a.KarkiHaara = Arpa(n, 86) < 0.5 ? 1 : -1;
            a.VanhaKarki = -1;
            if (silmukka) AsetaSilmukka(a, a.Sq, 0);
            else if (Arpa(n, 87) < Harvinainen)
            {
                // Harvinainen: kellot soivat hieman ennen kuin aura saapuu tangenttipisteeseen, aura kiirehtii ja kiertää tornin.
                a.KelloS = Math.Max(0.02, a.Sq - a.V * KelloEnnenSilmukkaaS);
                AsetaSilmukka(a, a.Sq, a.KelloS);
                a.KelloOdottaa = true;
            }
        }

        /// <summary>Silmukka kaarenpituudelle sl: keskipiste reitin vasemmalla (puoli 1) tai oikealla (−1) säteen päässä (sl = Sq →
        /// keskipiste on torni), ja nopeuskerroin niin, että kierros kestää noin SilmukkaS. Kiire alkaa kaarenpituudelta kiire
        /// (kellojen alku): aura kiihdyttää kohti tornia ja hidastaa, kun hännät ovat kierroksella.</summary>
        void AsetaSilmukka(Aura a, double sl, double kiire)
        {
            a.Silmukka = true; a.Sl = sl; a.KiireS = kiire;
            double px = a.Ax + a.Ux * sl, pz = a.Az + a.Uz * sl;
            a.Cx = px - a.Puoli * a.Uz * a.R; a.Cz = pz + a.Puoli * a.Ux * a.R;
            double ls = 2 * Math.PI * a.R;
            a.Kerroin = Math.Max(1, Math.Min(SilmukkaKerroinMax, ls / (SilmukkaS * a.V)));
            // Kärjen vaihto ei osu silmukkaan.
            if (a.Karki == 0 && a.KarkiAlkuS > sl - 0.3 && a.KarkiAlkuS < sl + ls + a.TakaMax + 0.1) a.Karki = -1;
            kierroksia++;
        }

        /// <summary>Kärki pudottautuu haaran B perään, ja B:n hanhet siirtyvät paikan eteenpäin (B:n ensimmäinen on uusi kärki).</summary>
        void VaihdaKarki(Aura a)
        {
            int b = a.KarkiHaara, maxB = 0;
            for (int g = 0; g < a.N; g++) if (a.Haara[g] == b) maxB = Math.Max(maxB, a.Arvo[g]);
            if (maxB == 0) { b = -b; for (int g = 0; g < a.N; g++) if (a.Haara[g] == b) maxB = Math.Max(maxB, a.Arvo[g]); }
            if (maxB == 0) { a.Karki = 2; return; }
            a.KarkiHaara = b;
            for (int g = 0; g < a.N; g++)
            {
                a.Haara0[g] = a.Haara[g]; a.Arvo0[g] = a.Arvo[g];
                if (a.Arvo0[g] == 0) { a.Haara[g] = b; a.Arvo[g] = maxB; a.VanhaKarki = g; }
                else if (a.Haara0[g] == b) { a.Arvo[g] = a.Arvo0[g] - 1; if (a.Arvo[g] == 0) a.Haara[g] = 0; }
            }
            a.Karki = 1; a.KarkiAika = 0; karkivaihtoja++;
        }

        void SoitaKellot()
        {
            kello = 0; edellinenSoitto = T; soittoja++;
        }

        /// <summary>Napautus: kellot heti; lennossa oleva aura kiertää tornin (jos ehtii), muuten uusi aura tulee kiertämään.</summary>
        void Napautus(bool yo)
        {
            SoitaKellot();
            if (yo) return;
            int paras = -1; double parasAika = double.MaxValue, parasSl = 0;
            for (int i = 0; i < Auroja; i++)
            {
                var a = aurat[i];
                if (!a.Lentaa || a.Silmukka) continue;
                double sl;
                if (a.S <= a.Sq) sl = a.Sq;
                else if (a.S - a.Sq < 0.6 * a.R)
                {
                    // Myöhästynyt kierros: keskipiste siirtyy reitin suuntaan, joten koko kierroksen on mahduttava jalanjälkeen.
                    sl = a.S + 0.02;
                    double cx = a.Ax + a.Ux * sl - a.Puoli * a.Uz * a.R, cz = a.Az + a.Uz * sl + a.Puoli * a.Ux * a.R;
                    if (!Mahtuu(cx, cz, a.R + (a.N / 2) * a.Vali * Math.Sin(a.Kulma) * (1 - TiivisSivu))) continue;
                }
                else continue;
                double aika = (sl - a.S) / Math.Max(1e-6, a.V);
                if (aika < parasAika) { paras = i; parasAika = aika; parasSl = sl; }
            }
            if (paras >= 0) { AsetaSilmukka(aurat[paras], parasSl, aurat[paras].S); return; }
            for (int i = 0; i < Auroja; i++)
                if (!aurat[i].Lentaa) { Laheta(i, true); return; }
        }

        /// <summary>Mahtuuko ympyrä (keskipiste, säde) jalanjäljen häivytysreunan sisään (normitettu säde ≤ 0,915, 24 suuntaa).</summary>
        static bool Mahtuu(double cx, double cz, double sade)
        {
            for (int i = 0; i < 24; i++)
            {
                double k = i * Math.PI / 12, x = cx + Math.Cos(k) * sade, z = cz + Math.Sin(k) * sade;
                if (x * x / (JalanjalkiX * JalanjalkiX) + z * z / (JalanjalkiZ * JalanjalkiZ) > 0.915 * 0.915) return false;
            }
            return true;
        }

        /// <summary>Reitin piste kaarenpituudella s: suunta (yksikkövektori), kaarto (−1…1 silmukassa kallistukseen) ja notko
        /// (0…1 silmukan puolivälissä).</summary>
        static void Polku(Aura a, double s, out double x, out double z, out double sx, out double sz, out double kaarto, out double notko)
        {
            kaarto = 0; notko = 0;
            if (!a.Silmukka || s <= a.Sl)
            {
                x = a.Ax + a.Ux * s; z = a.Az + a.Uz * s; sx = a.Ux; sz = a.Uz;
                return;
            }
            double ls = 2 * Math.PI * a.R;
            if (s < a.Sl + ls)
            {
                double f = (s - a.Sl) / a.R, k = a.Puoli * f, c = Math.Cos(k), si = Math.Sin(k);
                double px = a.Ax + a.Ux * a.Sl - a.Cx, pz = a.Az + a.Uz * a.Sl - a.Cz;
                x = a.Cx + px * c - pz * si; z = a.Cz + px * si + pz * c;
                sx = a.Ux * c - a.Uz * si; sz = a.Ux * si + a.Uz * c;
                kaarto = a.Puoli * Pehmea(f / 0.7) * Pehmea((2 * Math.PI - f) / 0.7);
                notko = 0.5 * (1 - Math.Cos(f));
                return;
            }
            double s2 = s - ls;
            x = a.Ax + a.Ux * s2; z = a.Az + a.Uz * s2; sx = a.Ux; sz = a.Uz;
        }

        /// <summary>Kiireen paino 0–1: nousee pehmeästi kellojen alusta (KiireS) ja laskee, kun hännät ovat kierroksella.</summary>
        static double KiireenPaino(Aura a)
        {
            if (!a.Silmukka) return 0;
            double ls = 2 * Math.PI * a.R;
            return Pehmea((a.S - a.KiireS) / KiireRamppi) * (1 - Pehmea((a.S - (a.Sl + ls + a.TakaMax * 0.5)) / 0.15));
        }

        protected override void Askel(double d, bool heraa, bool tapahtuma, bool yo)
        {
            if (tapahtuma && kello < 0 && T - edellinenSoitto >= NapautusValiS) Napautus(yo);
            // Reaktio: lähestyttäessä aura ilmestyy heti (ei yöllä).
            if (heraa && !yo && !Lentaa) { Laheta(0, false); toinen = -1; }
            // Aikataulu: tauko lasketaan vain, kun mikään aura ei lennä.
            if (!Lentaa && toinen < 0 && d > 0)
            {
                tauko -= d;
                if (tauko <= 0)
                {
                    taukoja++;
                    tauko = Vali(SeisooMinS, SeisooMaxS, taukoja, 90);
                    if (!yo)
                    {
                        Laheta(0, false);
                        if (Arpa(lentoja, 91) < Puuska) toinen = PuuskaValiS;
                    }
                }
            }
            if (toinen >= 0)
            {
                toinen -= d;
                if (toinen < 0 && !yo && !aurat[1].Lentaa) { Laheta(1, false); kaksoislentoja++; }
            }
            bool lensi = Lentaa;
            for (int i = 0; i < Auroja; i++)
            {
                var a = aurat[i];
                if (!a.Lentaa) continue;
                a.Kiire = KiireenPaino(a);
                a.S += a.V * (1 + (a.Kerroin - 1) * a.Kiire) * d; a.Aika += d;
                for (int g = 0; g < a.N; g++) a.Siipi[g] += 2 * Math.PI * d * (1 + KiireRapytys * a.Kiire) / a.Jakso[g];
                if (a.KelloOdottaa && a.S >= a.KelloS) { a.KelloOdottaa = false; if (kello < 0) SoitaKellot(); }
                if (a.Karki == 0 && a.S >= a.KarkiAlkuS) VaihdaKarki(a);
                if (a.Karki == 1)
                {
                    a.KarkiAika += d;
                    if (a.KarkiAika >= KarkiS)
                    {
                        a.Karki = 2;
                        for (int g = 0; g < PaikkojaEnintaan; g++) { a.Haara0[g] = a.Haara[g]; a.Arvo0[g] = a.Arvo[g]; }
                    }
                }
                if (a.S - a.TakaMax >= a.Pituus) a.Lentaa = false;
            }
            // Viimeinen aura laskeutui: uusi tauko alkaa.
            if (lensi && !Lentaa && toinen < 0) { taukoja++; tauko = Vali(SeisooMinS, SeisooMaxS, taukoja, 90); }
            if (kello >= 0) { kello += d; if (kello > KelloLoppuS) kello = -1; }
            Laske();
            if ((Lentaa || kello >= 0) && d > 0) Liikkuu = true;
        }

        /// <summary>Yhdistetty kierto: suunta ψ pystyakselin ympäri ja kallistus ρ hanhen pituusakselin ympäri (Unityn
        /// kvaternio, q = kierto(Y, ψ) · kierto(Z, ρ)).</summary>
        static void Kierto(double psi, double rho, out double w, out double x, out double y, out double z)
        {
            double cy = Math.Cos(psi * 0.5), sy = Math.Sin(psi * 0.5), cr = Math.Cos(rho * 0.5), sr = Math.Sin(rho * 0.5);
            w = cy * cr; x = sy * sr; y = sy * cr; z = cy * sr;
        }

        /// <summary>Hanhien asennot: paikka reitillä (hanhi seuraa kärkeä omalla viiveellään, joten V taipuu kaarteessa),
        /// sivusiirto muodostelmassa, keinunta, näkyvyys reunalla sekä räpyttely ja kallistus puoliskoille.</summary>
        void Laske()
        {
            for (int ai = 0; ai < Auroja; ai++)
            {
                var a = aurat[ai];
                int paikat = Paikkoja[ai];
                double ltot = a.Pituus, fd = HaivytysS * a.V, u = a.Karki == 1 ? Pehmea(a.KarkiAika / KarkiS) : 1;
                double cosK = Math.Cos(a.Kulma), sinK = Math.Sin(a.Kulma);
                for (int g = 0; g < paikat; g++)
                {
                    int i = ai * PaikkojaEnintaan + g;
                    if (!a.Lentaa || g >= a.N) { hs[i] = 0; continue; }
                    double b0 = a.Arvo0[g] * a.Vali * cosK, s0 = a.Haara0[g] * a.Arvo0[g] * a.Vali * sinK;
                    double b1 = a.Arvo[g] * a.Vali * cosK, s1 = a.Haara[g] * a.Arvo[g] * a.Vali * sinK;
                    double taka = (b0 + (b1 - b0) * u) * (1 - TiivisTaka * a.Kiire), sivu = (s0 + (s1 - s0) * u) * (1 - TiivisSivu * a.Kiire);
                    if (a.Karki == 1 && g == a.VanhaKarki) sivu += a.KarkiHaara * KarkiPullistuma * Math.Sin(Math.PI * u);
                    double s = a.S - taka;
                    Polku(a, s, out double x, out double z, out double sx, out double sz, out double kaarto, out double notko);
                    x += -sz * sivu; z += sx * sivu;
                    double y = a.H + KeinuntaY * Math.Sin(2 * Math.PI * a.Aika / KeinuntaS + a.Vaihe)
                        + 0.0025 * Math.Sin(2 * Math.PI * a.Aika / 1.7 + g * 1.3) - SilmukkaNotkahdus * notko;
                    double rho = Math.Sqrt(x * x / (JalanjalkiX * JalanjalkiX) + z * z / (JalanjalkiZ * JalanjalkiZ));
                    hs[i] = s <= 0 || s >= ltot || rho >= 1 ? 0 : Pehmea(s / fd) * Pehmea((ltot - s) / fd) * Pehmea((1 - rho) / JalanjalkiHaivytys);
                    hx[i] = x - PivotX; hy[i] = y - PivotY; hz[i] = z - PivotZ;
                    // Räpyttely ja liito vuorotellen: rytmi (räpyttää 2–3,6 s, liitää 1–2 s) hanhikohtaisella siirrolla.
                    double sykli = a.Rapyttaa[g] + a.Liitaa[g], w = (a.Aika + a.Rytmi[g]) % sykli;
                    double paino = Math.Max(a.Kiire, Pehmea(w / 0.25) * (1 - Pehmea((w - (a.Rapyttaa[g] - 0.25)) / 0.25)));
                    double siipi = paino * Rapytys * Math.Sin(a.Siipi[g]) + (1 - paino) * LiitoKulma;
                    double kallistus = KallistusSilmukassa * kaarto, psi = Math.Atan2(sx, sz);
                    Kierto(psi, (kallistus + siipi) * Math.PI / 180, out ow[i], out ox[i], out oy[i], out oz[i]);
                    Kierto(psi, (kallistus - siipi) * Math.PI / 180, out vw[i], out vx[i], out vy[i], out vz[i]);
                }
            }
        }

        /// <summary>Kellon k kulma (°): kolme heilahdusta ±35° (jakso 1,4 s), pehmeä alku ja loppu; itäsivun kello puoli jaksoa myöhemmin.</summary>
        double KellonKulma(int k)
        {
            if (kello < 0) return 0;
            double t = kello - k * KelloPorras, kesto = Heilahduksia * KelloJaksoS;
            if (t <= 0 || t >= kesto) return 0;
            double verho = Pehmea(t / 0.3) * (1 - Pehmea((t - (kesto - 0.9)) / 0.9));
            return KelloKulma * verho * Math.Sin(2 * Math.PI * t / KelloJaksoS);
        }

        /// <summary>Äänirengas k lähtee etukellon k:nnella lyönnillä (0,35 / 1,05 / 1,75 s), laajenee hidastuen ja nousee hieman.</summary>
        OsanAsento Rengas(int k)
        {
            if (kello < 0) return OsanAsento.Piilossa;
            double t = (kello - RengasViive - k * RengasPorras) / RengasS;
            if (t <= 0 || t >= 1) return OsanAsento.Piilossa;
            double laaj = 1 - (1 - t) * (1 - t);
            return new OsanAsento { Qw = 1, Y = RengasNousu * laaj, Skaala = RengasAlku + (1 - RengasAlku) * laaj };
        }

        public override OsanAsento Asento(string osa)
        {
            // Hanhet: "h" + aura + hanhi + puoli (o = oikea siipi ja puolet rungosta, v = vasen).
            if (osa.Length == 4 && osa[0] == 'h')
            {
                int ai = osa[1] - '0', g = osa[2] - '0';
                if (ai < 0 || ai >= Auroja || g < 0 || g >= Paikkoja[ai]) return OsanAsento.Piilossa;
                int i = ai * PaikkojaEnintaan + g;
                if (hs[i] <= 0.01) return OsanAsento.Piilossa;
                return osa[3] == 'o'
                    ? new OsanAsento { X = hx[i], Y = hy[i], Z = hz[i], Skaala = hs[i], Qw = ow[i], Qx = ox[i], Qy = oy[i], Qz = oz[i] }
                    : new OsanAsento { X = hx[i], Y = hy[i], Z = hz[i], Skaala = hs[i], Qw = vw[i], Qx = vx[i], Qy = vy[i], Qz = vz[i] };
            }
            switch (osa)
            {
                // Etukello heilahtaa aukon tasossa (Z-akselin ympäri), itäsivun kello X-akselin ympäri.
                case "kello0": return OsanAsento.Lepo.Kierretty(OsanAsento.Kierto(0, 0, 1, KellonKulma(0)));
                case "kello1": return OsanAsento.Lepo.Kierretty(OsanAsento.Kierto(1, 0, 0, KellonKulma(1)));
                case "aani0": return Rengas(0);
                case "aani1": return Rengas(1);
                case "aani2": return Rengas(2);
                case "valot":
                case "valot1":
                case "valot2":
                    return Valot();
                default: return OsanAsento.Lepo;
            }
        }

        public override string Tila()
        {
            string Aura(int i)
            {
                var a = aurat[i];
                if (!a.Lentaa) return "maassa";
                return $"lentää {a.N} hanhea {a.S:F2}/{a.Pituus:F2} ({a.Aika:F1} s){(a.Silmukka ? $", kierros {(a.S >= a.Sl ? "käynnissä" : "tulossa")}" : "")}" +
                    (a.Karki == 1 ? ", kärki vaihtuu" : "");
            }
            return $"aura0 {Aura(0)}, aura1 {Aura(1)}, tauko {tauko:F0} s" + (kello >= 0 ? $", kellot soivat {kello:F1} s" : "") +
                $", lentoja {lentoja}, soittoja {soittoja}, kierroksia {kierroksia}";
        }
    }
}
