// ERIKOISMALLIN LIIKE: MATTERHORN (omistaja hyväksyi elämänidean 27.9. klo 07.5x; speksi docs/raportit/erikoismallit/matterhorn.md).
// Sama kaava kuin ErikoisLiike.cs: perusliike (lippupilvi), harvinainen tapahtuma (alppihehku), reaktio pelaajaan
// (hammasratasjuna) ja yövalot. Puhdas C#, ei allokaatioita kehyksessä, aikataulu siemenellä noston id:stä.
using System;

namespace Matkakirja.Linssit.Elava
{
    /// <summary>
    /// Matterhorn: perusliike = lippupilvi muodostuu huipun suojan puolelle (5 s, kasvaa juurestaan), liehuu 15–35 s (lippu keinuu
    /// ±3° ja hengittää, pilvenriekaleet irtoavat pyrstöstä 3,5 s:n välein ja haihtuvat tuulen alle 7 s:ssa) ja hajoaa ajautuen
    /// tuulen alle (6 s); tauko 25–75 s. Harvinainen (noin 1/10 pilvijaksoista, ei yöllä): alppihehku — ruusukultainen hehku
    /// leviää huipulta huippupyramidin alareunaan (2,5 s), hehkuu 4 s ja vetäytyy huipulle (3 s) kuten iltarusko. Reaktio:
    /// lähestyttäessä punainen hammasratasjuna nousee Zermattista Gornergratille (14 s), odottaa 8–16 s ja laskeutuu (14 s).
    /// Tapahtuma (kortin avaus) = alppihehku heti (ei yöllä, kuten Stonehengen auringonnousu). Yöllä Zermattin valot.
    /// </summary>
    public sealed class MatterhornLiike : ErikoisAnimaatio
    {
        public const double MuodostuuS = 5, HajoaaS = 6, HattaraS = 7, KeinuntaS = 9, HengitysS = 6, Keinunta = 3, Hengitys = 0.04;
        public const double HehkuNousuS = 2.5, HehkuPysyyS = 4, HehkuLaskuS = 3, JunaS = 14, JunaKiihdytysS = 2;
        /// <summary>Lippupilven akseli (tuulen alapuoli) mallin avaruudessa, sama kuin Symbolimallit.MhTuuli.</summary>
        public const double TuuliX = -0.9404, TuuliZ = -0.3401;
        /// <summary>Rata ala-asemalta Gornergratille mallin yksiköissä, sama kuin Symbolimallit.MhRataLoppu − MhRataAlku.</summary>
        public const double RataX = -0.22, RataY = 0.085, RataZ = 0.09;
        /// <summary>Riekale lähtee lipun pyrstöstä (0,16 juuresta), ajautuu 0,24 tuulen alle ja nousee 0,02 (v2: pilvi 0,8 ×).</summary>
        public const double HattaraAlku = 0.16, HattaraMatka = 0.24, HattaraNousu = 0.02;
        /// <summary>Hajoava lippu ajautuu tuulen alle.</summary>
        public const double Ajelehtii = 0.065;

        enum Pilvi { Tauko, Muodostuu, Liehuu, Hajoaa }
        enum Juna { Zermatt, Nousee, Gornergrat, Laskee }
        Pilvi pilvi = Pilvi.Tauko;
        Juna juna = Juna.Zermatt;
        double pilviAika, pilviKesto, hattara = -1, hattaraLoppu, hehku = -1, junaAika, junaKesto;
        int jakso, hehkuja, junaMatkoja;

        public MatterhornLiike(string id) : base(id) { pilviKesto = Vali(3, 25, 0, 60); }

        public bool Hehkuu => hehku >= 0;
        public bool PilviNakyy => pilvi != Pilvi.Tauko;
        /// <summary>Junan paikka radalla: 0 Zermatt – 1 Gornergrat.</summary>
        public double JunanPaikka { get; private set; }

        void AloitaHehku() { hehku = 0; hehkuja++; }

        /// <summary>Tasainen matka 0–1 ajassa t / kesto: kiihdytys ja jarrutus r sekuntia, välissä vakionopeus (hammasrata).</summary>
        static double Tasainen(double t, double kesto, double r)
        {
            t = Math.Max(0, Math.Min(kesto, t));
            double v = 1 / (kesto - r);
            if (t < r) return v * t * t / (2 * r);
            if (t > kesto - r) return 1 - v * (kesto - t) * (kesto - t) / (2 * r);
            return v * (t - r * 0.5);
        }

        protected override void Askel(double d, bool heraa, bool tapahtuma, bool yo)
        {
            if (tapahtuma && hehku < 0 && !yo) AloitaHehku();
            if (heraa && juna == Juna.Zermatt) { juna = Juna.Nousee; junaAika = 0; junaKesto = JunaS; }

            // Lippupilvi: tauko → muodostuu → liehuu → hajoaa → tauko; harvinainen alppihehku jakson lopussa (huippu on selkeä).
            pilviAika += d;
            if (pilviAika >= pilviKesto)
            {
                pilviAika = 0;
                switch (pilvi)
                {
                    case Pilvi.Tauko: pilvi = Pilvi.Muodostuu; pilviKesto = MuodostuuS; jakso++; break;
                    case Pilvi.Muodostuu:
                        pilvi = Pilvi.Liehuu; pilviKesto = Vali(15, 35, jakso, 61);
                        hattara = 0; hattaraLoppu = pilviKesto;
                        break;
                    case Pilvi.Liehuu: pilvi = Pilvi.Hajoaa; pilviKesto = HajoaaS; break;
                    case Pilvi.Hajoaa:
                        pilvi = Pilvi.Tauko; pilviKesto = Vali(25, 75, jakso, 62);
                        if (hehku < 0 && !yo && Arpa(jakso, 63) < 0.1) AloitaHehku();
                        break;
                }
            }
            if (pilvi != Pilvi.Tauko) Liikkuu = true;
            // Riekaleet: kello käy liehunnan alusta, kunnes viimeinen liehunnan aikana alkanut riekale on haihtunut.
            if (hattara >= 0)
            {
                hattara += d;
                if (hattara > hattaraLoppu + HattaraS) hattara = -1;
                else Liikkuu = true;
            }

            // Alppihehku.
            if (hehku >= 0)
            {
                hehku += d; Liikkuu = true;
                if (hehku > HehkuNousuS + HehkuPysyyS + HehkuLaskuS) hehku = -1;
            }

            // Hammasratasjuna.
            if (juna != Juna.Zermatt)
            {
                junaAika += d;
                if (junaAika >= junaKesto)
                {
                    junaAika = 0;
                    switch (juna)
                    {
                        case Juna.Nousee: juna = Juna.Gornergrat; junaKesto = Vali(8, 16, junaMatkoja, 64); JunanPaikka = 1; break;
                        case Juna.Gornergrat: juna = Juna.Laskee; junaKesto = JunaS; break;
                        case Juna.Laskee: juna = Juna.Zermatt; JunanPaikka = 0; junaMatkoja++; break;
                    }
                }
                if (juna == Juna.Nousee) { JunanPaikka = Tasainen(junaAika, JunaS, JunaKiihdytysS); Liikkuu = true; }
                else if (juna == Juna.Laskee) { JunanPaikka = 1 - Tasainen(junaAika, JunaS, JunaKiihdytysS); Liikkuu = true; }
            }
        }

        /// <summary>Riekale i (0 tai 1): lähtee 3,5 s:n porrastuksella, 7 s:n jaksoissa; kasvaa ja haihtuu matkalla.</summary>
        OsanAsento Hattara(int i)
        {
            if (hattara < 0) return OsanAsento.Piilossa;
            double t = hattara - i * HattaraS * 0.5;
            if (t < 0) return OsanAsento.Piilossa;
            double c = Math.Floor(t / HattaraS);
            if (i * HattaraS * 0.5 + c * HattaraS > hattaraLoppu) return OsanAsento.Piilossa;
            double u = (t - c * HattaraS) / HattaraS;
            double s = 0.9 * Math.Sin(Math.PI * Pehmea(u));
            if (s <= 0.02) return OsanAsento.Piilossa;
            double m = HattaraAlku + HattaraMatka * u;
            return new OsanAsento { Qw = 1, X = TuuliX * m, Y = HattaraNousu * u, Z = TuuliZ * m, Skaala = s };
        }

        public override OsanAsento Asento(string osa)
        {
            switch (osa)
            {
                case "lippupilvi":
                    switch (pilvi)
                    {
                        case Pilvi.Muodostuu:
                        {
                            double s = Pehmea(pilviAika / MuodostuuS);
                            return s <= 0.01 ? OsanAsento.Piilossa : new OsanAsento { Qw = 1, Skaala = s };
                        }
                        case Pilvi.Liehuu:
                        {
                            // Keinunta ja hengitys alkavat ja loppuvat pehmeästi (ei hyppyä vaiheiden rajalla).
                            double v = Math.Min(1, Math.Min(pilviAika, pilviKesto - pilviAika) / 2);
                            double kulma = Keinunta * v * Math.Sin(2 * Math.PI * pilviAika / KeinuntaS);
                            double s = 1 + Hengitys * v * Math.Sin(2 * Math.PI * pilviAika / HengitysS);
                            return new OsanAsento { Skaala = s }.Kierretty(OsanAsento.Kierto(0, 1, 0, kulma));
                        }
                        case Pilvi.Hajoaa:
                        {
                            double u = Pehmea(pilviAika / HajoaaS);
                            if (u >= 0.99) return OsanAsento.Piilossa;
                            return new OsanAsento { Qw = 1, X = TuuliX * Ajelehtii * u, Y = 0.01 * u, Z = TuuliZ * Ajelehtii * u, Skaala = 1 - u };
                        }
                        default: return OsanAsento.Piilossa;
                    }
                case "hattara0": return Hattara(0);
                case "hattara1": return Hattara(1);
                case "alppihehku0":
                case "alppihehku1":
                {
                    if (hehku < 0) return OsanAsento.Piilossa;
                    double s = hehku < HehkuNousuS ? Pehmea(hehku / HehkuNousuS)
                        : hehku < HehkuNousuS + HehkuPysyyS ? 1
                        : 1 - Pehmea((hehku - HehkuNousuS - HehkuPysyyS) / HehkuLaskuS);
                    return s <= 0.01 ? OsanAsento.Piilossa : new OsanAsento { Qw = 1, Skaala = s };
                }
                case "juna": return new OsanAsento { Qw = 1, Skaala = 1, X = RataX * JunanPaikka, Y = RataY * JunanPaikka, Z = RataZ * JunanPaikka };
                case "valot": return Valot();
                default: return OsanAsento.Lepo;
            }
        }

        public override string Tila() =>
            $"lippupilvi {(pilvi == Pilvi.Tauko ? "tauolla" : pilvi == Pilvi.Muodostuu ? "muodostuu" : pilvi == Pilvi.Liehuu ? "liehuu" : "hajoaa")}" +
            $" ({pilviAika:F0}/{pilviKesto:F0} s), jaksoja {jakso}" + (hehku >= 0 ? $", alppihehku {hehku:F1} s" : "") +
            $", juna {(juna == Juna.Zermatt ? "Zermattissa" : juna == Juna.Nousee ? "nousee" : juna == Juna.Gornergrat ? "Gornergratilla" : "laskee")} {JunanPaikka:F2}" +
            $", matkoja {junaMatkoja}, hehkuja {hehkuja}";
    }
}
