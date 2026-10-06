// KAUPUNKIÄÄNIMAISEMA (omistaja 6.10.2026 21.4x "Aloita pilotti", PÄÄTOIMITTAJA; Siirtoseppä): oppaan (ja myöhemmin linnan) oma
// mikseri ilman FMODia/Wwiseä. Puhdas ja kehysnopeudesta riippumaton; Unity-puoli (KaupunkiAanimaisemaSoitin) soittaa silmukat
// suoratoistona näillä tasoilla. Säännöt:
//  - kerrokset (Kerrokset): kaupungin silmukat painoilla 0–1 (Pelikoodarin äänikartta, OSM ~300 m kohteen ympäriltä) + sade (COZY) +
//    tuuli (korkeus); enintään MaxSoivat kerrosta kerrallaan (heikoimmat häipyvät pois), tasot liukuvat HaivytysS:ssa (2,5 s).
//  - korkeus: kaupunki vaimenee kaukaiseksi huminaksi (taso ja alipäästön rajataajuus laskevat log-asteikolla) ja tuuli voimistuu.
//  - nopeus: pehmeä suhina (proseduraalinen suodatettu kohina) kasvaa kameran nopeuden mukana.
//  - vuorokausi: yöllä liikenne, tori, kahvila ja väkijoukko hiljaisempia, aamulla linnut voimakkaampia.
//  - puhe (kertoja, Pulu): koko maisema väistyy (−9 dB, isku 0,25 s, palautus 0,8 s). Pois-kytkin hiljentää kaiken.
//  - kirkonkellot: tasatunnein tunnin verran lyöntejä, kirkoittain hajautettuina (TasatunninLyonnit).
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Aanet
{
    public sealed class KaupunkiAanimaisema
    {
        public const string LiikenneHiljainen = "liikenne_hiljainen", LiikenneVilkas = "liikenne_vilkas", Raitiovaunu = "raitiovaunu",
            Satama = "satama", Aallot = "aallot", Kanava = "kanava", Puisto = "puisto", Suihkulahde = "suihkulahde", Tori = "tori",
            Kahvila = "kahvila", Vakijoukko = "vakijoukko", Sade = "sade", Tuuli = "tuuli";
        /// <summary>Silmukkakerrokset (kirkonkellot ovat kertasoittoja, suhina proseduraalinen).</summary>
        public static readonly string[] Kerrokset =
            { LiikenneHiljainen, LiikenneVilkas, Raitiovaunu, Satama, Aallot, Kanava, Puisto, Suihkulahde, Tori, Kahvila, Vakijoukko, Sade, Tuuli };
        public const int MaxSoivat = 8;
        public const double HaivytysS = 2.5, KuuluvuusRaja = 0.02;
        public const double MaaKorkeusM = 120, YlaKorkeusM = 3000, YlaKaupunki = 0.15, AlipaastoMaaHz = 22000, AlipaastoYlaHz = 900;
        public const double TuuliMaa = 0.08, TuuliYla = 0.8, SuhinaAlkuMs = 20, SuhinaTaysiMs = 300, SuhinaMax = 0.6;
        public const double VaistoTaso = 0.355, VaistoIskuS = 0.25, VaistoPalautusS = 0.8;   // −9 dB

        public struct Syote
        {
            /// <summary>Kaupunkikerrosten painot 0–1 (äänikartta); puuttuva = 0. Sade ja tuuli lasketaan alla.</summary>
            public IReadOnlyDictionary<string, double> Painot;
            public double KorkeusM, NopeusMs, Tunti, Sade;
            public bool Puhe, Paalla;
        }

        readonly double[] tasot = new double[Kerrokset.Length];
        readonly double[] tavoitteet = new double[Kerrokset.Length];
        double vaisto = 1, suhina, alipaasto = AlipaastoMaaHz;

        /// <summary>Kerroksen nykyinen taso 0–1 (ennen väistöä); Kerrokset-järjestyksessä.</summary>
        public IReadOnlyList<double> Tasot => tasot;
        /// <summary>Koko maiseman kerroin (väistö puheen alla, pois-kytkin 0).</summary>
        public double Kokonais { get; private set; } = 1;
        /// <summary>Proseduraalisen suhinan taso 0–SuhinaMax (nopeus).</summary>
        public double Suhina => suhina;
        /// <summary>Kaupunkikerrosten alipäästön rajataajuus (Hz): maassa avoin, ylhäällä tukahtunut humina.</summary>
        public double Alipaasto => alipaasto;

        public static int Indeksi(string kerros) => Array.IndexOf(Kerrokset, kerros);

        public void Paivita(Syote s, double dt)
        {
            dt = Math.Max(0, Math.Min(0.25, dt));
            double ylos = KorkeusOsuus(s.KorkeusM);
            double kaupunki = Lerp(1, YlaKaupunki, ylos);
            for (int i = 0; i < Kerrokset.Length; i++)
            {
                string k = Kerrokset[i];
                double p;
                if (k == Sade) p = Raja(s.Sade);
                else if (k == Tuuli) p = Lerp(TuuliMaa, TuuliYla, ylos);
                else
                {
                    p = s.Painot != null && s.Painot.TryGetValue(k, out var w) ? Raja(w) : 0;
                    p *= kaupunki * Vuorokausi(k, s.Tunti);
                }
                tavoitteet[i] = s.Paalla ? p : 0;
            }
            // Enintään MaxSoivat: heikoimmat (tavoitteeltaan) pois. Tasapeli → aiemmin soinut säilyy (ei lepatusta).
            var jarjestys = new List<int>();
            for (int i = 0; i < Kerrokset.Length; i++) if (tavoitteet[i] >= KuuluvuusRaja) jarjestys.Add(i);
            jarjestys.Sort((a, b) => { int c = tavoitteet[b].CompareTo(tavoitteet[a]); return c != 0 ? c : tasot[b].CompareTo(tasot[a]); });
            for (int j = MaxSoivat; j < jarjestys.Count; j++) tavoitteet[jarjestys[j]] = 0;
            for (int i = 0; i < Kerrokset.Length; i++) if (tavoitteet[i] < KuuluvuusRaja) tavoitteet[i] = 0;
            // Liuku: tasainen nopeus 1 / HaivytysS (koko matka 0 → 1 kestää HaivytysS).
            double askel = dt / HaivytysS;
            for (int i = 0; i < Kerrokset.Length; i++)
                tasot[i] = tasot[i] < tavoitteet[i] ? Math.Min(tavoitteet[i], tasot[i] + askel) : Math.Max(tavoitteet[i], tasot[i] - askel);
            alipaasto = Math.Exp(Lerp(Math.Log(AlipaastoMaaHz), Math.Log(AlipaastoYlaHz), ylos));
            double suhinaTavoite = s.Paalla ? SuhinaMax * Math.Sqrt(Raja((s.NopeusMs - SuhinaAlkuMs) / (SuhinaTaysiMs - SuhinaAlkuMs))) : 0;
            suhina += (suhinaTavoite - suhina) * (1 - Math.Exp(-dt / 0.6));
            double vTavoite = s.Puhe ? VaistoTaso : 1;
            vaisto += (vTavoite - vaisto) * (1 - Math.Exp(-dt / (vTavoite < vaisto ? VaistoIskuS : VaistoPalautusS)));
            Kokonais = s.Paalla ? vaisto : 0;
        }

        /// <summary>Kuinka monta kerrosta soi (taso yli kuuluvuusrajan).</summary>
        public int Soivia { get { int n = 0; foreach (var t in tasot) if (t >= KuuluvuusRaja) n++; return n; } }

        /// <summary>Korkeus 0 (≤ MaaKorkeusM) … 1 (≥ YlaKorkeusM) log-asteikolla.</summary>
        public static double KorkeusOsuus(double korkeusM) =>
            Raja(Math.Log(Math.Max(MaaKorkeusM, korkeusM) / MaaKorkeusM) / Math.Log(YlaKorkeusM / MaaKorkeusM));

        /// <summary>Vuorokauden kerroin (paikallinen tunti 0–24): yö 23–5 hiljainen, aamulla linnut (5–9).</summary>
        public static double Vuorokausi(string kerros, double tunti)
        {
            tunti = ((tunti % 24) + 24) % 24;
            bool yo = tunti >= 23 || tunti < 5, ilta = tunti >= 20 && tunti < 23, aamu = tunti >= 5 && tunti < 9;
            switch (kerros)
            {
                case LiikenneVilkas: case Raitiovaunu: return yo ? 0.25 : ilta ? 0.7 : 1;
                case LiikenneHiljainen: return yo ? 0.5 : 1;
                case Tori: return yo || ilta ? 0.1 : aamu ? 0.6 : 1;
                case Kahvila: return yo ? 0.1 : aamu ? 0.5 : 1;
                case Vakijoukko: return yo ? 0.2 : aamu ? 0.6 : 1;
                case Puisto: return yo ? 0.2 : aamu ? 1.4 : 1;
                default: return 1;
            }
        }

        /// <summary>
        /// Tasatunnin lyönnit: (viive s, kirkko) jokaiselle lyönnille. Lyöntejä tunnin verran (1–12), 2,6 s välein; kirkot alkavat
        /// hajautettuina 0,6–3,6 s toisistaan (siemenellä), joten kellot kuulostavat eri torneista. Ei kirkkoja → tyhjä.
        /// </summary>
        public static List<(double ViiveS, int Kirkko)> TasatunninLyonnit(int tunti, int kirkkoja, int siemen)
        {
            var t = new List<(double, int)>();
            int lyonteja = ((tunti % 12) + 12) % 12; if (lyonteja == 0) lyonteja = 12;
            uint h = (uint)(siemen * 2654435761u) ^ (uint)tunti;
            double alku = 0;
            for (int k = 0; k < kirkkoja; k++)
            {
                if (k > 0) { h ^= h << 13; h ^= h >> 17; h ^= h << 5; alku += 0.6 + (h % 1000) / 1000.0 * 3.0; }
                for (int i = 0; i < lyonteja; i++) t.Add((alku + i * 2.6, k));
            }
            t.Sort((a, b) => a.Item1.CompareTo(b.Item1));
            return t;
        }

        static double Raja(double x) => x < 0 ? 0 : x > 1 ? 1 : x;
        static double Lerp(double a, double b, double t) => a + (b - a) * t;
    }
}
