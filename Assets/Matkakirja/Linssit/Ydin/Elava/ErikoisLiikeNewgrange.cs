// ERIKOISMALLIN LIIKE: NEWGRANGE (omistaja hyväksyi elämänidean 27.9.2026, erä 6; speksi docs/raportit/erikoismallit/newgrange.md).
// Sama kaava kuin ErikoisLiike.cs: perusliike (laulujoutsenet uivat Boynen mutkassa, ja joskus parvi nousee lentoon, kiertää ja
// laskeutuu), harvinainen tapahtuma (talvipäivänseisauksen aamu; yöllä Aenguksen ja Caerin joutsenpari), reaktio pelaajaan
// (lähestyminen nostaa parven, napautus = harvinainen heti). Kummulla ei ole omia yövaloja. Puhdas C#, ei allokaatioita kehyksessä
// (tila kentissä, Asento vertaa nimiä suoraan), aikataulu siemenellä noston id:stä.
using System;

namespace Matkakirja.Linssit.Elava
{
    /// <summary>
    /// Newgrange: perusliike = siemen näyttää 3–6 laulujoutsenta, jotka kelluvat Boynen mutkassa eri suuntiin. Uintijaksossa
    /// (8–16 s) kukin joutsen (todennäköisyys 0,7) kääntyy (90°/s) ja ui 0,02–0,08 yksikköä joen suuntaan tai vinosti
    /// (0,012–0,018 yksikköä sekunnissa, pehmeä kiihdytys), asettuu uuteen suuntaan, ja noin joka kolmas sukeltaa pään ja kaulan
    /// veteen perä pystyssä (70°, 2–4 s). Joutsenet pysyvät järjestyksessään joella vähintään 0,05:n välein.
    /// Noin joka kolmas aktiivijakso (0,35) on lento: parvi kääntyy joen suuntaan, lähtee porrastetusti (0,4–0,7 s välein),
    /// juoksee vedenpinnalla 1 s (vaahtojuova), nousee 0,07–0,09:n korkeuteen ja kiertää joen ja pystykivien yllä soikean
    /// kierroksen (0,13–0,16 yksikköä sekunnissa, kallistus kaarteissa enintään 25°), laskeutuu liukuen ja liukuu vedellä
    /// pysähdyksiin järjestyksessä. Uiva ja lentävä joutsen vaihtuvat skaalalla 0,25 s:ssa.
    /// Harvinainen (noin 1/10 lennoista, oma arpakanava, 1,5 s ensimmäisen nousun jälkeen): talvipäivänseisauksen aamu — kultainen
    /// säde kasvaa mallin etureunasta kattoaukkoon, kattoaukko hehkuu, käytävän linja etenee kummun pinnalla kolmena pätkänä
    /// ja ristinmuotoinen kammio hehkuu kummun läpi; kaikki hiipuvat 1,5 s:ssa (noin 8 s, ajoitus ±10 %, ei välähdystä).
    /// Reaktio: lähestyminen nostaa parven päivällä heti; yöllä joutsenet havahtuvat (kääntyvät 10–25° 1,5 s:ssa).
    /// Napautus (enintään kerran 20 s:ssa): päivällä talvipäivänseisaus, yöllä joutsenpari.
    /// Yö: ei uintia eikä lentoja; yön lepojakso on 60–150 s, ja kunkin lopussa Aenguksen ja Caerin joutsenpari (0,1) lentää
    /// rinnakkain samassa tahdissa joen yltä kummun yli takareunalle (11 s). Kesken oleva jakso päättyy hämärässä rauhassa.
    /// Levossa (kaikki kelluvat, ei tapahtumaa) Liikkuu = false, joten elävä kerros piirtää 0 kehystä.
    /// </summary>
    public sealed class NewgrangeLiike : ErikoisAnimaatio
    {
        // ---- Joki ja joutsenet (samat kuin Symbolimallit.Ngr*-vakiot: muuta molemmat) ----

        /// <summary>Veden pinta, Boynen keskilinja z = Z0 + K · x² ja puolileveys.</summary>
        public const double VesiY = 0.0015, JokiZ0 = -0.352, JokiK = 0.35, JokiPuoli = 0.029;
        /// <summary>Joutsenten kotipaikat (pivotit) joen keskilinjalla.</summary>
        static readonly double[] KotiX = { -0.235, -0.14, -0.05, 0.045, 0.135, 0.225 };
        public const int Joutsenia = 6;
        /// <summary>Uinnin alue (x), pienin väli keskipisteiden välillä, sivupoikkeaman raja keskilinjasta ja levon suunnan raja
        /// joen suunnasta (°).</summary>
        public const double UintiRaja = 0.27, MinVali = 0.05, SivuRaja = 0.004, SuuntaRaja = 30;
        public const double UintiMinV = 0.012, UintiMaxV = 0.018, KaantoNopeus = 90, SukellusAste = 70, SukellusPainuma = 0.0055, UintiRamppi = 0.8;

        // ---- Lento (kierros joen ja pystykivien yllä) ----

        /// <summary>Kierroksen suorat osuudet (±XT), kaarteen säde x-suunnassa ja suorien etäisyys joen keskilinjasta (etu joen
        /// yllä, taka pystykivien puolella).</summary>
        public const double RataXT = 0.33, RataA = 0.07, RataEtu = 0.014, RataTaka = 0.095;
        public const double JuoksuS = 1.0, JuoksuV = 0.09, NousuMatka = 0.2, LaskuMatka = 0.3, LaskuV = 0.08, VaihtoS = 0.25;
        public const double LentoMinV = 0.13, LentoMaxV = 0.16, LentoMinH = 0.07, LentoMaxH = 0.09, KallistusMax = 25;
        /// <summary>Laskeutumispaikkojen väli järjestyksessä ja liukumatka vedellä.</summary>
        public const double LaskuMinVali = 0.062, LaskuMaxVali = 0.085, LiukuMin = 0.03, LiukuMax = 0.045;
        /// <summary>Nousun ja laskun kaista joen takapuoliskolla (w): siivet levällään etumainen siivenkärki pysyy joen etureunan
        /// sisällä eli mallin jalanjäljellä. Lennon sivupoikkeama on vain taaksepäin (0–0,008) samasta syystä.</summary>
        public const double NousuW = 0.013, SivuMax = 0.008;

        // ---- Ajastus (speksi kohta 6: Vaihtelu) ----

        public const double KayMinS = 8, KayMaxS = 16, SeisooMinS = 25, SeisooMaxS = 75, TaukoTod = 0.15, PitkaMinS = 75, PitkaMaxS = 120;
        public const double LentoTod = 0.35, Harvinainen = 0.1, NapautusValiS = 20, SeisausViiveS = 1.5, YoMinS = 60, YoMaxS = 150;

        // ---- Talvipäivänseisaus (s, kerrotaan ±10 %:n ajoituskertoimella) ----

        public const double SeisausS = 8.0, SadeS = 1.2, AukkoAlku = 0.8, AukkoS = 1.5, K1Alku = 1.3, K1S = 1.0, K2Alku = 2.2, K2S = 0.9,
            K3Alku = 3.0, K3S = 1.0, KammioAlku = 3.6, KammioS = 1.5, HiipuuAlku = 6.5, HiipuuS = 1.5;

        // ---- Yön joutsenpari ----

        public const double PariS = 11, PariNakyS = 1.2, PariMinH = 0.26, PariMaxH = 0.30, PariVali = 0.05, PariPorras = 0.012, PariAlkuZ = -0.34, PariLoppuZ = 0.37;
        /// <summary>Parin pivotit kummun yllä (Symbolimallit.NgrPari0/1).</summary>
        public const double Pari0X = -0.03, Pari1X = 0.03, PariPivotY = 0.28;

        // ---- Tila ----

        enum Faasi { Lepo, Uinti, Lento }
        enum JTila { Kelluu, Odottaa, Kaantyy, Ui, Asettuu, Sukeltaa, Juoksee, Lentaa, Liukuu }

        sealed class Joutsen
        {
            public bool Nakyva, Lentoon;
            public JTila Tila;
            public double Aika, Kesto;
            // Asento vedellä: paikka joella (x, sivupoikkeama w), suunta ψ (°, keula +Z = 0) ja sukelluskulma.
            public double X, W, Psi, Pitch;
            // Käännös, uinti ja asettuminen.
            public double Psi0, Psi1, Pitch0, X0, X1, W0, W1, V, Asettuu, SukellusS;
            public bool Ui, Sukeltaa;
            // Lento: lähtöhetki, kierroksen alku, kuljettu ja koko matka, sivupoikkeamat (alku, lento, loppu), korkeus, vauhti,
            // kosketuspaikka ja liukumatka, lentoaika ja siiven heilahduksen vaihe.
            public double Lahto, U0, D, Dtot, Lat0, Lat, Lat1, H, Vc, Xtd, Wtd, Liuku, LentoT, Vaihe;
            // Pintojen näkyvyys (uiva ja lentävä), vanan skaala ja lentoasento.
            public double SkUi = 1, SkLento, Vana, FX, FY, FZ, FPsi, FPitch, FRoll;
        }

        readonly Joutsen[] j = new Joutsen[Joutsenia];
        readonly int[] jarj = new int[Joutsenia];
        Faasi faasi = Faasi.Lepo;
        double faasiAika, faasiKesto, lentoAika;
        int sigma = 1, uinteja, lentoja, lepoja, jaksoja, yoJaksoja, seisauksia, pareja;
        double seisaus = -1, seisausK = 1, seisausViive = -1, edellinenNapautus = double.NegativeInfinity;
        double pari = -1, parX0, parX1, parH;
        bool alku = true;

        public NewgrangeLiike(string id) : base(id)
        {
            // Siemen valitsee 3–6 näkyvää joutsenta (satunnainen osajoukko) ja niiden lepo­suunnat (eri suuntiin joen suunnasta).
            int n = 3 + (int)(Arpa(0, 10) * 4);
            var p = new int[Joutsenia];
            for (int i = 0; i < Joutsenia; i++) p[i] = i;
            for (int i = Joutsenia - 1; i > 0; i--) { int k = (int)(Arpa(i, 11) * (i + 1)); if (k > i) k = i; int t = p[i]; p[i] = p[k]; p[k] = t; }
            for (int i = 0; i < Joutsenia; i++)
            {
                var s = new Joutsen { X = KotiX[i], W = 0 };
                s.Psi = JokiSuunta(s.X) + (Arpa(i, 12) < 0.5 ? 0 : 180) + Vali(-SuuntaRaja, SuuntaRaja, i, 13);
                j[i] = s;
            }
            for (int i = 0; i < n; i++) j[p[i]].Nakyva = true;
            faasiKesto = Vali(3, 20, 0, 14);
        }

        // ---- Julkiset tiedot testeille ----

        public bool Seisaus => seisaus >= 0;
        public bool Pari => pari >= 0;
        public bool Lentaa => faasi == Faasi.Lento;
        public int Lentoja => lentoja;
        public int Seisauksia => seisauksia;
        public int Pareja => pareja;
        public int Uinteja => uinteja;
        public int Nakyvia { get { int n = 0; for (int i = 0; i < Joutsenia; i++) if (j[i].Nakyva) n++; return n; } }
        public bool Nakyva(int i) => j[i].Nakyva;
        /// <summary>Joutsenen asento vedellä (x, z maailmassa, ψ) ja uivan pinnan skaala (testeihin).</summary>
        public (double x, double z, double psi, double sk) Uiva(int i) { var s = j[i]; return (s.X, JokiZ(s.X) + s.W, s.Psi, s.SkUi); }
        /// <summary>Joutsenen sukelluskulma (°, testeihin ja kuvahetken valintaan).</summary>
        public double Sukellus(int i) => j[i].Pitch;
        /// <summary>Lentävän joutsenen asento (x, y, z, ψ, kallistus) ja skaala (testeihin).</summary>
        public (double x, double y, double z, double psi, double roll, double sk) Lentava(int i) { var s = j[i]; return (s.FX, s.FY, s.FZ, s.FPsi, s.FRoll, s.SkLento); }

        // ---- Joki ----

        public static double JokiZ(double x) => JokiZ0 + JokiK * x * x;

        /// <summary>Joen suunta (ψ, °) kohdassa x kohti +X:ää.</summary>
        public static double JokiSuunta(double x) => Math.Atan2(1, 2 * JokiK * x) * 180 / Math.PI;

        static double KulmaEro(double a, double b)
        {
            double d = (a - b) % 360;
            if (d > 180) d -= 360;
            if (d < -180) d += 360;
            return d;
        }

        /// <summary>Levon suunta joen suuntaan (kumpaan päin on lähempänä) ja siirto enintään ±SuuntaRaja:n sisään.</summary>
        static double Lepoon(double psi, double x, double siirto)
        {
            double r = JokiSuunta(x);
            double e = KulmaEro(psi, r);
            double akseli = Math.Abs(e) <= 90 ? r : r + 180;
            return psi + KulmaEro(akseli + Math.Max(-SuuntaRaja, Math.Min(SuuntaRaja, siirto)), psi);
        }

        // ---- Lentokierros: suljettu murtoviiva (etusuora joen yllä +X:ään, kaarre, takasuora −X:ään, kaarre), kaarenpituus ----

        static readonly double[] rx, rz, rs;
        static readonly double rataL;
        const int EtuPisteet = 33, KaariPisteet = 12;

        static NewgrangeLiike()
        {
            int n = 2 * EtuPisteet + 2 * (KaariPisteet - 1);
            rx = new double[n + 1]; rz = new double[n + 1]; rs = new double[n + 1];
            int k = 0;
            double zc = JokiZ(RataXT) + (RataEtu + RataTaka) * 0.5, b = (RataTaka - RataEtu) * 0.5;
            for (int i = 0; i < EtuPisteet; i++) { double x = -RataXT + 2 * RataXT * i / (EtuPisteet - 1); rx[k] = x; rz[k] = JokiZ(x) + RataEtu; k++; }
            for (int i = 1; i < KaariPisteet; i++) { double t = (-90 + 180.0 * i / KaariPisteet) * Math.PI / 180; rx[k] = RataXT + RataA * Math.Cos(t); rz[k] = zc + b * Math.Sin(t); k++; }
            for (int i = 0; i < EtuPisteet; i++) { double x = RataXT - 2 * RataXT * i / (EtuPisteet - 1); rx[k] = x; rz[k] = JokiZ(x) + RataTaka; k++; }
            for (int i = 1; i < KaariPisteet; i++) { double t = (90 + 180.0 * i / KaariPisteet) * Math.PI / 180; rx[k] = -RataXT + RataA * Math.Cos(t); rz[k] = zc + b * Math.Sin(t); k++; }
            rx[n] = rx[0]; rz[n] = rz[0];
            rs[0] = 0;
            for (int i = 1; i <= n; i++) rs[i] = rs[i - 1] + Math.Sqrt((rx[i] - rx[i - 1]) * (rx[i] - rx[i - 1]) + (rz[i] - rz[i - 1]) * (rz[i] - rz[i - 1]));
            rataL = rs[n];
        }

        /// <summary>Kierroksen pituus (testeihin).</summary>
        public static double RataPituus => rataL;

        static void RataPiste(double u, out double x, out double z)
        {
            u %= rataL; if (u < 0) u += rataL;
            int lo = 0, hi = rs.Length - 1;
            while (hi - lo > 1) { int m = (lo + hi) >> 1; if (rs[m] <= u) lo = m; else hi = m; }
            double t = (u - rs[lo]) / Math.Max(1e-9, rs[hi] - rs[lo]);
            x = rx[lo] + (rx[hi] - rx[lo]) * t; z = rz[lo] + (rz[hi] - rz[lo]) * t;
        }

        /// <summary>Kulkusuunta (ψ, °) kierroksella kohdassa u suuntaan σ (tasoitettu keskierotuksella).</summary>
        static double RataSuunta(double u, int s)
        {
            RataPiste(u - 0.018 * s, out double x0, out double z0);
            RataPiste(u + 0.018 * s, out double x1, out double z1);
            return Math.Atan2(x1 - x0, z1 - z0) * 180 / Math.PI;
        }

        /// <summary>Etusuoran kaarenpituus kohdassa x (joen yllä, x ∈ ±RataXT).</summary>
        static double RataU(double x)
        {
            double f = (x + RataXT) / (2 * RataXT) * (EtuPisteet - 1);
            int i = Math.Max(0, Math.Min(EtuPisteet - 2, (int)Math.Floor(f)));
            double t = Math.Max(0, Math.Min(1, f - i));
            return rs[i] + (rs[i + 1] - rs[i]) * t;
        }

        // ---- Apurit ----

        /// <summary>Tasainen matka 0–1: lineaarinen kiihdytys ja jarrutus r sekuntia, välissä vakionopeus (v suhteessa huippuun).</summary>
        static double Tasainen(double t, double kesto, double r, out double v)
        {
            r = Math.Min(r, kesto * 0.5);
            t = Math.Max(0, Math.Min(kesto, t));
            double vh = 1 / (kesto - r);
            if (t < r) { v = t / r; return vh * t * t / (2 * r); }
            if (t > kesto - r) { v = (kesto - t) / r; return 1 - vh * (kesto - t) * (kesto - t) / (2 * r); }
            v = 1; return vh * (t - r * 0.5);
        }

        bool KaikkiKelluu()
        {
            for (int i = 0; i < Joutsenia; i++) if (j[i].Nakyva && j[i].Tila != JTila.Kelluu) return false;
            return true;
        }

        /// <summary>Näkyvät joutsenet järjestykseen avaimen s · x mukaan (nouseva); palauttaa määrän.</summary>
        int Jarjesta(int s)
        {
            int n = 0;
            for (int i = 0; i < Joutsenia; i++) if (j[i].Nakyva) jarj[n++] = i;
            for (int a = 1; a < n; a++)
            {
                int v = jarj[a]; int b = a - 1;
                while (b >= 0 && s * j[jarj[b]].X > s * j[v].X) { jarj[b + 1] = jarj[b]; b--; }
                jarj[b + 1] = v;
            }
            return n;
        }

        void Kaanny(Joutsen s, double kohde, double nopeus, double minKesto)
        {
            s.Psi0 = s.Psi; s.Psi1 = s.Psi + KulmaEro(kohde, s.Psi); s.Pitch0 = s.Pitch;
            s.Tila = JTila.Kaantyy; s.Aika = 0; s.Kesto = Math.Max(minKesto, Math.Abs(s.Psi1 - s.Psi0) / nopeus);
        }

        // ---- Jaksot ----

        void AloitaLepo(bool yo)
        {
            faasi = Faasi.Lepo; faasiAika = 0; lepoja++;
            if (yo) faasiKesto = Vali(YoMinS, YoMaxS, lepoja, 40);
            else faasiKesto = Arpa(lepoja, 41) < TaukoTod ? Vali(PitkaMinS, PitkaMaxS, lepoja, 42) : Vali(SeisooMinS, SeisooMaxS, lepoja, 43);
        }

        /// <summary>
        /// Uintijakso: näkyvät joutsenet järjestyksessä vasemmalta oikealle. Kunkin liikealue (nykyinen paikka ja kohde) pidetään
        /// vähintään MinVali:n päässä naapureiden liikealueista, joten joutsenet eivät koskaan osu toisiinsa eivätkä ohita toisiaan.
        /// </summary>
        void AloitaUinti()
        {
            faasi = Faasi.Uinti; faasiAika = 0; uinteja++;
            faasiKesto = Vali(KayMinS, KayMaxS, uinteja, 20);
            int n = Jarjesta(1);
            double edellinen = double.NegativeInfinity;
            for (int k = 0; k < n; k++)
            {
                var s = j[jarj[k]];
                int nro = uinteja * 7 + jarj[k];
                double lo = Math.Max(-UintiRaja, edellinen + MinVali);
                double hi = k + 1 < n ? Math.Min(UintiRaja, j[jarj[k + 1]].X - MinVali) : UintiRaja;
                bool toimii = Arpa(nro, 21) < 0.7;
                double kohde = s.X;
                if (toimii && lo <= hi)
                {
                    double m = Vali(0.02, 0.08, nro, 22), sgn = Arpa(nro, 23) < 0.5 ? -1 : 1;
                    double t1 = Math.Max(lo, Math.Min(hi, s.X + sgn * m));
                    if (Math.Abs(t1 - s.X) < 0.015) t1 = Math.Max(lo, Math.Min(hi, s.X - sgn * m));
                    if (Math.Abs(t1 - s.X) >= 0.015) kohde = t1;
                }
                edellinen = Math.Max(s.X, kohde);
                if (!toimii) continue;
                SuunnitteleUinti(s, kohde, Vali(-SivuRaja, SivuRaja, nro, 24), Arpa(nro, 25) < 0.45, nro);
            }
        }

        void SuunnitteleUinti(Joutsen s, double kohde, double w1, bool sukeltaa, int nro)
        {
            s.Lentoon = false;
            s.X0 = s.X; s.X1 = kohde; s.W0 = s.W;
            s.Ui = Math.Abs(kohde - s.X) >= 0.015;
            s.W1 = s.Ui ? w1 : s.W;
            s.V = Vali(UintiMinV, UintiMaxV, nro, 26);
            s.Sukeltaa = sukeltaa;
            s.SukellusS = Vali(2, 4, nro, 27);
            s.Asettuu = Vali(-25, 25, nro, 28);
            double kaanto = 0, uinti = 0;
            if (s.Ui)
            {
                double alkuSuunta = UintiSuunta(s, 0);
                kaanto = Math.Max(0.35, Math.Abs(KulmaEro(alkuSuunta, s.Psi)) / KaantoNopeus);
                uinti = Math.Abs(s.X1 - s.X0) / s.V + UintiRamppi;
            }
            double sukellus = s.Sukeltaa ? 0.7 + s.SukellusS + 0.8 : 0;
            double tarve = kaanto + uinti + 1.2 + sukellus;
            if (tarve > faasiKesto && s.Sukeltaa) { s.Sukeltaa = false; tarve -= sukellus; }
            if (tarve > faasiKesto && s.Ui) { s.Ui = false; s.X1 = s.X; s.W1 = s.W; tarve = 1.2; }
            s.Tila = JTila.Odottaa; s.Aika = 0; s.Kesto = Vali(0, Math.Max(0, faasiKesto - tarve), nro, 29);
        }

        /// <summary>Uinnin kulkusuunta (ψ) uinnin edistymässä p (joen kaarta pitkin, sivupoikkeama mukana).</summary>
        static double UintiSuunta(Joutsen s, double p)
        {
            double x = s.X0 + (s.X1 - s.X0) * p;
            double dx = s.X1 - s.X0, dz = 2 * JokiK * x * dx + (s.W1 - s.W0);
            return Math.Atan2(dx, dz) * 180 / Math.PI;
        }

        /// <summary>
        /// Lento: parvi kääntyy joen suuntaan σ (siemenestä), lähtee etummaisesta alkaen porrastetusti, kiertää kierroksen ja laskeutuu
        /// järjestyksessä: etummainen pisimmälle, muut 0,062–0,085:n välein sen taakse, joten järjestys ja välit säilyvät.
        /// </summary>
        void AloitaLento()
        {
            faasi = Faasi.Lento; faasiAika = 0; lentoAika = 0; lentoja++;
            sigma = Arpa(lentoja, 30) < 0.5 ? -1 : 1;
            double vc = Vali(LentoMinV, LentoMaxV, lentoja, 31), h = Vali(LentoMinH, LentoMaxH, lentoja, 32);
            int n = Jarjesta(-sigma);   // etummainen (suurin σ · x) ensin
            double vali = (n - 1) * LaskuMaxVali;
            double xl0 = sigma > 0 ? Vali(Math.Max(-0.2, -UintiRaja + vali + 0.01), UintiRaja - 0.01, lentoja, 36)
                                   : -Vali(Math.Max(-0.2, -UintiRaja + vali + 0.01), UintiRaja - 0.01, lentoja, 36);
            double lahto = 1.0, kertyma = 0;
            for (int k = 0; k < n; k++)
            {
                var s = j[jarj[k]];
                int nro = lentoja * 7 + k;
                if (k > 0) { lahto += Vali(0.4, 0.7, nro, 33); kertyma += Vali(LaskuMinVali, LaskuMaxVali, nro, 37); }
                s.Lentoon = true; s.Ui = false; s.Sukeltaa = false;
                Kaanny(s, JokiSuunta(s.X) + (sigma < 0 ? 180 : 0), 180, 0.35);
                s.Lahto = lahto;
                s.Lat = -sigma * Vali(0, SivuMax, nro, 34);
                s.H = h + Vali(-0.005, 0.005, nro, 35);
                s.Vc = vc;
                double xf = xl0 - sigma * kertyma;
                s.Liuku = Vali(LiukuMin, LiukuMax, nro, 38);
                s.Xtd = xf - sigma * s.Liuku;
                s.Wtd = Vali(-0.003, 0.003, nro, 39);
                s.Asettuu = Vali(-25, 25, nro, 28);
                s.Vaihe = Vali(0, Math.PI * 2, nro, 44);
            }
            if (seisaus < 0 && seisausViive < 0 && Arpa(lentoja * 7919 + 13, 45) < Harvinainen) seisausViive = 1.0 + SeisausViiveS;
        }

        void AloitaSeisaus()
        {
            seisaus = 0; seisauksia++;
            seisausK = Vali(0.9, 1.1, seisauksia, 50);
            seisausViive = -1;
        }

        void AloitaPari()
        {
            pari = 0; pareja++;
            parX0 = Vali(-0.15, 0.15, pareja, 60); parX1 = Vali(-0.15, 0.15, pareja, 61); parH = Vali(PariMinH, PariMaxH, pareja, 62);
        }

        /// <summary>Yön havahtuminen: kelluvat joutsenet kääntyvät 10–25° (1,5 s) levon suunnan rajojen sisällä ja rauhoittuvat.</summary>
        void Havahdu()
        {
            jaksoja++;
            for (int i = 0; i < Joutsenia; i++)
            {
                var s = j[i];
                if (!s.Nakyva || s.Tila != JTila.Kelluu) continue;
                double r = JokiSuunta(s.X);
                double e = KulmaEro(s.Psi, r);
                double akseli = Math.Abs(e) <= 90 ? r : r + 180;
                double rel = KulmaEro(s.Psi, akseli);
                double m = Vali(10, 25, jaksoja * 7 + i, 63) * (Arpa(jaksoja * 7 + i, 64) < 0.5 ? -1 : 1);
                if (Math.Abs(rel + m) > SuuntaRaja) m = -m;
                s.Lentoon = false; s.Ui = false; s.Sukeltaa = false; s.Asettuu = double.NaN;
                Kaanny(s, s.Psi + m, 1000, 1.5);
            }
        }

        // ---- Askel ----

        protected override void Askel(double d, bool heraa, bool tapahtuma, bool yo)
        {
            bool liikkuu = false;
            if (alku) { alku = false; Liikkuu = true; }
            if (tapahtuma && T - edellinenNapautus >= NapautusValiS)
            {
                if (!yo && seisaus < 0) { AloitaSeisaus(); edellinenNapautus = T; }
                else if (yo && pari < 0) { AloitaPari(); edellinenNapautus = T; }
            }
            if (heraa)
            {
                if (!yo && faasi != Faasi.Lento) AloitaLento();
                else if (yo && faasi == Faasi.Lepo) Havahdu();
            }
            faasiAika += d;
            if (faasi == Faasi.Lento) lentoAika += d;
            switch (faasi)
            {
                case Faasi.Lepo:
                    if (faasiAika >= faasiKesto)
                    {
                        if (yo)
                        {
                            yoJaksoja++;
                            if (pari < 0 && Arpa(yoJaksoja, 65) < Harvinainen) AloitaPari();
                            AloitaLepo(true);
                        }
                        else
                        {
                            jaksoja++;
                            if (Arpa(jaksoja, 66) < LentoTod) AloitaLento(); else AloitaUinti();
                        }
                    }
                    break;
                case Faasi.Uinti:
                    if (faasiAika >= faasiKesto && KaikkiKelluu()) AloitaLepo(yo);
                    break;
                case Faasi.Lento:
                    if (lentoAika > 1.5 && KaikkiKelluu()) AloitaLepo(yo);
                    break;
            }
            if (seisausViive >= 0)
            {
                seisausViive -= d;
                if (seisausViive < 0 && seisaus < 0 && !yo) AloitaSeisaus();
            }
            for (int i = 0; i < Joutsenia; i++) if (j[i].Nakyva && Eteneminen(j[i], d)) liikkuu = true;
            if (seisaus >= 0) { seisaus += d; liikkuu = true; if (seisaus > SeisausS * seisausK) seisaus = -1; }
            if (pari >= 0) { pari += d; liikkuu = true; if (pari > PariS) pari = -1; }
            if (liikkuu && d > 0) Liikkuu = true;
        }

        /// <summary>Yhden joutsenen askel tilakoneessa; palauttaa true, jos joutsen liikkuu tässä kehyksessä.</summary>
        bool Eteneminen(Joutsen s, double d)
        {
            s.Aika += d;
            switch (s.Tila)
            {
                case JTila.Kelluu:
                    s.Vana = 0;
                    return false;
                case JTila.Odottaa:
                    s.Vana = 0;
                    if (s.Lentoon ? lentoAika >= s.Lahto : s.Aika >= s.Kesto)
                    {
                        if (s.Lentoon) { s.Tila = JTila.Juoksee; s.Aika = 0; s.Kesto = JuoksuS; s.X0 = s.X; s.W0 = s.W; }
                        else if (s.Ui) Kaanny(s, UintiSuunta(s, 0), KaantoNopeus, 0.35);
                        else if (s.Sukeltaa) { s.Tila = JTila.Sukeltaa; s.Aika = 0; s.Kesto = 0.7 + s.SukellusS + 0.8; }
                        else { s.Tila = JTila.Asettuu; s.Aika = 0; AsetuAlku(s); }
                        return true;
                    }
                    return false;
                case JTila.Kaantyy:
                {
                    double p = Pehmea(s.Aika / s.Kesto);
                    s.Psi = s.Psi0 + (s.Psi1 - s.Psi0) * p;
                    s.Pitch = s.Pitch0 * (1 - p);
                    s.Vana = 0;
                    if (s.Aika >= s.Kesto)
                    {
                        s.Psi = s.Psi1; s.Pitch = 0;
                        if (s.Lentoon) { s.Tila = JTila.Odottaa; s.Aika = 0; }
                        else if (s.Ui) { s.Tila = JTila.Ui; s.Aika = 0; s.Kesto = Math.Abs(s.X1 - s.X0) / s.V + UintiRamppi; }
                        else { s.Tila = JTila.Kelluu; }   // yön havahtuminen päättyy
                    }
                    return true;
                }
                case JTila.Ui:
                {
                    double p = Tasainen(s.Aika, s.Kesto, UintiRamppi, out double v);
                    s.X = s.X0 + (s.X1 - s.X0) * p;
                    s.W = s.W0 + (s.W1 - s.W0) * p;
                    s.Psi = s.Psi0 + KulmaEro(UintiSuunta(s, p), s.Psi0);   // alkusuunta = käännöksen loppu
                    s.Vana = v * s.V / 0.02;
                    if (s.Aika >= s.Kesto) { s.X = s.X1; s.W = s.W1; s.Tila = JTila.Asettuu; s.Aika = 0; AsetuAlku(s); }
                    return true;
                }
                case JTila.Asettuu:
                {
                    double p = Pehmea(s.Aika / s.Kesto);
                    s.Psi = s.Psi0 + (s.Psi1 - s.Psi0) * p;
                    s.Pitch = s.Pitch0 * (1 - p);
                    s.Vana = 0;
                    if (s.Aika >= s.Kesto)
                    {
                        s.Psi = s.Psi1; s.Pitch = 0;
                        if (s.Sukeltaa && !s.Lentoon) { s.Tila = JTila.Sukeltaa; s.Aika = 0; s.Kesto = 0.7 + s.SukellusS + 0.8; }
                        else { s.Tila = JTila.Kelluu; s.Lentoon = false; }
                    }
                    return true;
                }
                case JTila.Sukeltaa:
                {
                    // Pää ja kaula veteen, perä pystyyn (70°), pito 2–4 s ja takaisin.
                    double a = Pehmea(s.Aika / 0.7) * (1 - Pehmea((s.Aika - (s.Kesto - 0.8)) / 0.8));
                    s.Pitch = SukellusAste * a;
                    s.Vana = 0;
                    if (s.Aika >= s.Kesto) { s.Pitch = 0; s.Sukeltaa = false; s.Tila = JTila.Kelluu; }
                    return true;
                }
                case JTila.Juoksee:
                {
                    // Juoksu vedenpinnalla: kiihtyy nollasta JuoksuV:hen, runko kallistuu hieman taakse, vaahtojuova.
                    double t = Math.Min(s.Aika, JuoksuS), a = JuoksuV / JuoksuS;
                    s.X = s.X0 + sigma * 0.5 * a * t * t;
                    s.W = s.W0 + (NousuW - s.W0) * Pehmea(t / JuoksuS);
                    s.Psi = JokiSuunta(s.X) + (sigma < 0 ? 180 : 0);
                    s.Pitch = -8 * Pehmea(t / 0.3);
                    s.Vana = 1.6 * (a * t) / JuoksuV;
                    AsetaLentoVedelle(s);
                    if (s.Aika >= JuoksuS) Nouse(s);
                    return true;
                }
                case JTila.Lentaa:
                    Lenna(s, d);
                    return true;
                case JTila.Liukuu:
                {
                    double T = s.Kesto, t = Math.Min(s.Aika, T);
                    double matka = LaskuV * t - 0.5 * (LaskuV / T) * t * t;
                    s.X = s.X0 + sigma * matka;
                    s.W = s.W0 + (s.Wtd - s.W0) * Pehmea(t / T);
                    double kohti = JokiSuunta(s.X) + (sigma < 0 ? 180 : 0);
                    s.Psi = s.Psi0 + KulmaEro(kohti, s.Psi0) * Pehmea(t / Math.Min(T, 0.6));
                    s.Pitch = -6 * (1 - Pehmea(t / 0.6));
                    s.Vana = 1.6 * LaskuV * (1 - t / T) / JuoksuV;
                    s.SkUi = Pehmea(s.Aika / VaihtoS); s.SkLento = 1 - s.SkUi;
                    AsetaLentoVedelle(s);
                    if (s.Aika >= T) { s.SkUi = 1; s.SkLento = 0; s.Tila = JTila.Asettuu; s.Aika = 0; AsetuAlku(s); }
                    return true;
                }
            }
            return false;
        }

        /// <summary>Asettumisen alku: käännös levon suuntaan (joen suunta ± siirto, rajan sisällä), 0,8–1,2 s.</summary>
        void AsetuAlku(Joutsen s)
        {
            double siirto = double.IsNaN(s.Asettuu) ? 0 : s.Asettuu;
            s.Psi0 = s.Psi; s.Pitch0 = s.Pitch;
            s.Psi1 = Lepoon(s.Psi, s.X, siirto);
            s.Kesto = 0.8 + 0.4 * Math.Min(1, Math.Abs(s.Psi1 - s.Psi0) / 45);
        }

        /// <summary>Lentävän pinnan asento vedellä (juoksu ja liuku, vaihto skaalalla).</summary>
        void AsetaLentoVedelle(Joutsen s)
        {
            s.FX = s.X; s.FY = 0; s.FZ = JokiZ(s.X) + s.W; s.FPsi = s.Psi; s.FPitch = s.Pitch; s.FRoll = 0;
        }

        /// <summary>Irtoaminen vedestä: kierroksen alku etusuoralla, matka kosketuspaikkaan kierroksen ympäri, sivupoikkeamat.</summary>
        void Nouse(Joutsen s)
        {
            s.Tila = JTila.Lentaa; s.Aika = 0; s.LentoT = 0; s.D = 0;
            s.U0 = RataU(s.X);
            double utd = RataU(s.Xtd);
            double m = (sigma * (utd - s.U0)) % rataL; if (m < 0) m += rataL;
            if (m < 0.4 * rataL) m += rataL;
            s.Dtot = m;
            // Sivupoikkeama kulkusuunnan oikealle (r = (cos ψ, −sin ψ)): etusuoralla oikea osoittaa σ:n mukaan joen yli.
            s.Lat0 = -sigma * (s.W - RataEtu);
            s.Lat1 = -sigma * (NousuW - RataEtu);
        }

        void Lenna(Joutsen s, double d)
        {
            s.LentoT += d;
            double q1 = (s.D - (s.Dtot - LaskuMatka)) / LaskuMatka;
            double v = s.Vc + (JuoksuV - s.Vc) * (1 - Pehmea(s.D / 0.12));
            if (q1 > 0) v = s.Vc + (LaskuV - s.Vc) * Pehmea(q1);
            s.D = Math.Min(s.Dtot, s.D + v * d);
            q1 = (s.D - (s.Dtot - LaskuMatka)) / LaskuMatka;
            double u = s.U0 + sigma * s.D;
            RataPiste(u, out double x, out double z);
            double psi = RataSuunta(u, sigma);
            double lat = s.Lat + (s.Lat0 - s.Lat) * (1 - Pehmea(s.D / 0.25));
            double qm = (s.D - (s.Dtot - 0.25)) / 0.25;
            if (qm > 0) lat = s.Lat + (s.Lat1 - s.Lat) * Pehmea(qm);
            double pr = psi * Math.PI / 180;
            x += Math.Cos(pr) * lat; z -= Math.Sin(pr) * lat;
            double nousu = Pehmea(s.D / NousuMatka), lasku = Pehmea(q1);
            double y = s.H * nousu * (1 - lasku);
            // Hidas siiveniskun keinahdus korkealla (ei vedellä).
            y += 0.0022 * Math.Sin(2 * Math.PI * 1.6 * s.LentoT + s.Vaihe) * Pehmea(y / 0.03);
            // Kallistus kaarteissa kaarevuuden mukaan (oikea kaarre = oikea siipi alas).
            double k = KulmaEro(RataSuunta(u + 0.03 * sigma, sigma), RataSuunta(u - 0.03 * sigma, sigma)) / 0.06;
            double roll = -Math.Max(-KallistusMax, Math.Min(KallistusMax, k * 0.03));
            double pitch = -10 * Math.Sin(Math.PI * Math.Min(1, s.D / NousuMatka)) + 4 * Math.Sin(Math.PI * Math.Max(0, Math.Min(1, q1)))
                - 9 * Pehmea((q1 - 0.75) / 0.25);
            s.FX = x; s.FY = y; s.FZ = z; s.FPsi = psi; s.FPitch = pitch; s.FRoll = roll;
            s.SkLento = Pehmea(s.LentoT / VaihtoS); s.SkUi = 1 - s.SkLento;
            s.Vana = 0;
            if (s.D >= s.Dtot)
            {
                // Kosketus vedessä: liuku joen suuntaan pysähdyksiin (uiva pinta kasvaa, lentävä pienenee).
                s.Tila = JTila.Liukuu; s.Aika = 0; s.Kesto = 2 * s.Liuku / LaskuV;
                s.X = x; s.X0 = x; s.W = z - JokiZ(x); s.W0 = s.W; s.Psi = psi; s.Psi0 = psi; s.Pitch = -6;
            }
        }

        // ---- Asennot ----

        OsanAsento UivaAsento(int i)
        {
            var s = j[i];
            if (!s.Nakyva || s.SkUi <= 0.02) return OsanAsento.Piilossa;
            var q = OsanAsento.Tulo(OsanAsento.Kierto(0, 1, 0, s.Psi), OsanAsento.Kierto(1, 0, 0, s.Pitch));
            // Sukeltaessa (nokka alas) joutsen painuu hieman, jotta kaula ja pää menevät veden alle ja vain perä jää pystyyn.
            double painuu = s.Pitch > 0 ? -SukellusPainuma * s.Pitch / SukellusAste : 0;
            return new OsanAsento { X = s.X - KotiX[i], Y = painuu, Z = JokiZ(s.X) + s.W - JokiZ(KotiX[i]), Skaala = s.SkUi }.Kierretty(q);
        }

        OsanAsento VanaAsento(int i)
        {
            var s = j[i];
            double v = Math.Min(1.6, s.Vana);
            if (!s.Nakyva || v <= 0.03) return OsanAsento.Piilossa;
            return new OsanAsento { X = s.X - KotiX[i], Z = JokiZ(s.X) + s.W - JokiZ(KotiX[i]), Skaala = v }.Kierretty(OsanAsento.Kierto(0, 1, 0, s.Psi));
        }

        OsanAsento LentoAsento(int i)
        {
            var s = j[i];
            if (!s.Nakyva || s.SkLento <= 0.02) return OsanAsento.Piilossa;
            var q = OsanAsento.Tulo(OsanAsento.Tulo(OsanAsento.Kierto(0, 1, 0, s.FPsi), OsanAsento.Kierto(1, 0, 0, s.FPitch)), OsanAsento.Kierto(0, 0, 1, s.FRoll));
            return new OsanAsento { X = s.FX - KotiX[i], Y = s.FY, Z = s.FZ - JokiZ(KotiX[i]), Skaala = s.SkLento }.Kierretty(q);
        }

        /// <summary>Talvipäivänseisauksen vaihe: kasvu alusta (s) keston aikana, kerrottuna hiipumisella.</summary>
        OsanAsento Hehku(double alkuS, double kestoS)
        {
            if (seisaus < 0) return OsanAsento.Piilossa;
            double v = Pehmea((seisaus - alkuS * seisausK) / (kestoS * seisausK)) * (1 - Pehmea((seisaus - HiipuuAlku * seisausK) / (HiipuuS * seisausK)));
            return v <= 0.02 ? OsanAsento.Piilossa : new OsanAsento { Qw = 1, Skaala = v };
        }

        OsanAsento PariAsento(int k)
        {
            if (pari < 0) return OsanAsento.Piilossa;
            double t = pari, p = t / PariS;
            double x = parX0 + (parX1 - parX0) * p, z = PariAlkuZ + (PariLoppuZ - PariAlkuZ) * p;
            double psi = Math.Atan2(parX1 - parX0, PariLoppuZ - PariAlkuZ) * 180 / Math.PI, pr = psi * Math.PI / 180;
            // Rinnakkain siivenkärjet erillään (siipiväli 0,097), Caer (1) hieman edellä.
            double s = (k == 0 ? -1 : 1) * PariVali, e = k == 0 ? 0 : PariPorras;
            x += Math.Cos(pr) * s + Math.Sin(pr) * e; z += -Math.Sin(pr) * s + Math.Cos(pr) * e;
            // Samassa tahdissa: sama keinahdus ja kallistus molemmilla.
            double y = parH + 0.004 * Math.Sin(2 * Math.PI * 0.9 * t);
            double sk = Pehmea(t / PariNakyS) * (1 - Pehmea((t - (PariS - PariNakyS)) / PariNakyS));
            if (sk <= 0.02) return OsanAsento.Piilossa;
            var q = OsanAsento.Tulo(OsanAsento.Kierto(0, 1, 0, psi), OsanAsento.Kierto(0, 0, 1, 3 * Math.Sin(2 * Math.PI * 0.45 * t)));
            return new OsanAsento { X = x - (k == 0 ? Pari0X : Pari1X), Y = y - PariPivotY, Z = z, Skaala = sk }.Kierretty(q);
        }

        public override OsanAsento Asento(string osa)
        {
            switch (osa)
            {
                case "joutsen0": return UivaAsento(0);
                case "joutsen1": return UivaAsento(1);
                case "joutsen2": return UivaAsento(2);
                case "joutsen3": return UivaAsento(3);
                case "joutsen4": return UivaAsento(4);
                case "joutsen5": return UivaAsento(5);
                case "vana0": return VanaAsento(0);
                case "vana1": return VanaAsento(1);
                case "vana2": return VanaAsento(2);
                case "vana3": return VanaAsento(3);
                case "vana4": return VanaAsento(4);
                case "vana5": return VanaAsento(5);
                case "lento0": return LentoAsento(0);
                case "lento1": return LentoAsento(1);
                case "lento2": return LentoAsento(2);
                case "lento3": return LentoAsento(3);
                case "lento4": return LentoAsento(4);
                case "lento5": return LentoAsento(5);
                case "sade": return Hehku(0, SadeS);
                case "kattoaukko": return Hehku(AukkoAlku, AukkoS);
                case "kaytava1": return Hehku(K1Alku, K1S);
                case "kaytava2": return Hehku(K2Alku, K2S);
                case "kaytava3": return Hehku(K3Alku, K3S);
                case "kammio": return Hehku(KammioAlku, KammioS);
                case "pari0": return PariAsento(0);
                case "pari1": return PariAsento(1);
                default: return OsanAsento.Lepo;
            }
        }

        public override string Tila()
        {
            int kelluu = 0, ui = 0, lentaa = 0;
            for (int i = 0; i < Joutsenia; i++)
            {
                if (!j[i].Nakyva) continue;
                if (j[i].Tila == JTila.Kelluu || j[i].Tila == JTila.Odottaa) kelluu++;
                else if (j[i].Tila == JTila.Lentaa || j[i].Tila == JTila.Juoksee || j[i].Tila == JTila.Liukuu) lentaa++;
                else ui++;
            }
            return $"{faasi} ({faasiAika:F0}/{faasiKesto:F0} s), joutsenia {Nakyvia}: kelluu {kelluu}, ui {ui}, lentää {lentaa}; uinteja {uinteja}, lentoja {lentoja}" +
                (seisaus >= 0 ? $", talvipäivänseisaus {seisaus:F1} s" : "") + (pari >= 0 ? $", joutsenpari {pari:F1} s" : "") +
                $", seisauksia {seisauksia}, pareja {pareja}";
        }
    }
}
