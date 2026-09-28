// ERIKOISMALLIN LIIKE: KRONBORG (omistaja hyväksyi elämänidean 27.9.2026, erä 5; speksi docs/raportit/erikoismallit/kronborg.md).
// Sama kaava kuin ErikoisLiike.cs: perusliike (Helsingborgin lautta ja ohi lipuva purjealus), harvinainen tapahtuma (Juutinrauman
// tulli; yöllä Hamletin isän haamu), reaktio pelaajaan (lähestyminen lähettää lautan, napautus = harvinainen heti) ja yövalot.
// Puhdas C#, ei allokaatioita kehyksessä (tila kentissä, Asento vertaa nimiä suoraan), aikataulu siemenellä noston id:stä.
using System;

namespace Matkakirja.Linssit.Elava
{
    /// <summary>
    /// Kronborg: perusliike = kaksisuuntainen lautta (keula ja perä samanlaiset, kuten reitin Tycho Brahe) odottaa satamassa
    /// 15–45 s (yöllä 25–60 s), ajaa sisäkaistaa itään kääntöpisteeseen (x −0,02…+0,12 siemenestä, 10,5 s ±12 %, pehmennys
    /// 1,8 s), seisoo 1–2,5 s ja palaa kääntymättä. Vaahto-V näkyy perässä vauhdin mukaan. Purjealus lipuu ulkokaistaa kaistan
    /// päästä päähän (26 s ±15 %, suunta ja koko 0,9–1,1 siemenestä, ilmestyy ja katoaa päissä) 30–90 s:n tauoin; noin joka
    /// neljäs vuoro jää väliin, eikä yöllä lähde uusia aluksia.
    /// Harvinainen (noin 1/10 ohituksista, oma arpakanava): Juutinrauman tulli. Kun alus on kaakkoisbastionin kohdalla, bastionin
    /// tykistä tuprahtaa savu, keulan eteen nousee roiske, alus kääntyy 60° tuuleen (pohjoiseen) ja pysähtyy purjeet lepattaen,
    /// tullivene soutaa laiturista aluksen kylkeen ja takaisin, ja alus palaa kurssiin (noin 9,5 s).
    /// Reaktio: lähestyminen lähettää laiturissa odottavan lautan heti. Napautus (enintään kerran 20 s:ssa): päivällä tulli
    /// (salmella oleva alus tulee kohdalle tai uusi alus ilmestyy 0,09:n päähän), yöllä haamu.
    /// Yö: ikkunat, Trompetertårnetin lyhty ja majakka hehkuvat (Valot(), 1,5 s), lautan valot seuraavat lauttaa. Yön harvinainen
    /// (noin 1/10 yön lautan lähdöistä): Hamletin isän haamu ilmestyy eteläisen kurtiinin vallille, kulkee hitaasti toiseen päähän,
    /// pysähtyy keskellä kasvot linnaan päin ja katoaa (noin 14,5 s).
    /// Levossa (lautta laiturissa, salmi tyhjä, haamu poissa ja valo vakaa) Liikkuu = false, joten elävä kerros piirtää 0 kehystä.
    /// </summary>
    public sealed class KronborgLiike : ErikoisAnimaatio
    {
        // ---- Paikat (samat kuin Symbolimallit.Kb*-vakiot: muuta molemmat) ----

        /// <summary>Lautan laituri (pivot) ja kääntöpisteen vaihteluväli (x).</summary>
        public const double LaituriX = -0.42, KaantoMinX = -0.02, KaantoMaxX = 0.12;
        /// <summary>Laivan pivot (tullin kohta kaakkoisbastionin edessä ulkokaistalla) ja kaistan päät (x).</summary>
        public const double TulliX = 0.33, LaivaZ = -0.378, KaistaPaa = 0.47;
        /// <summary>Roiskeen pivot (TulliX − 0,075) ja roiskeen etäisyys keulasta.</summary>
        public const double RoiskeX = TulliX - 0.09, RoiskeMatka = 0.09;
        /// <summary>Tulliveneen lepopaikka (pivot laiturin kärjessä) ja kohtaamispaikka aluksen kyljessä (aluksen keskeltä).</summary>
        public const double VeneX = 0.351, VeneZ = -0.3278, KylkiDX = -0.024, KylkiDZ = 0.018;
        /// <summary>Haamun polun puolipituus (pivot eteläisen kurtiinin vallilla linnan keskellä).</summary>
        public const double HaamuPuoli = 0.13;

        // ---- Ajat ja vaihtelu (speksi kohta 6) ----

        public const double AjoS = 10.5, AjoVaihtelu = 0.12, Pehmennys = 1.8, SeisooMinS = 1.0, SeisooMaxS = 2.5;
        public const double LaituriMinS = 15, LaituriMaxS = 45, YoLaituriMinS = 25, YoLaituriMaxS = 60, EkaMinS = 3, EkaMaxS = 20;
        public const double LaivaS = 26, LaivaVaihtelu = 0.15, LaivaTaukoMinS = 30, LaivaTaukoMaxS = 90, LaivaEkaMinS = 8, LaivaEkaMaxS = 35;
        public const double TaukoTod = 0.25, Harvinainen = 0.1, NapautusValiS = 20;
        /// <summary>Tullin aikataulu tykin laukauksesta (s): savu, roiske, hidastus ja käännös tuuleen, veneen matkat ja paluu kurssiin.</summary>
        public const double SavuS = 2.6, RoiskeAlku = 0.45, RoiskeS = 0.95, KaannosAlku = 0.6, KaannosS = 1.8, VeneLahtee = 2.0,
            VeneMatkaS = 3.0, VeneKyljessa = 1.0, PaluuAlku = 7.0, PaluuS = 2.0, KiihdytysS = 2.5, TuuleenAste = 60;
        public static double TulliS => PaluuAlku + KiihdytysS;
        /// <summary>Haamu: ilmestyminen ja katoaminen, kävely (koko polku) ja pysähdys keskellä (s).</summary>
        public const double HaamuNakyS = 1.5, HaamuKavelyS = 10, HaamuPysahdysS = 1.5;

        // ---- Tila ----

        enum Lautta { Laiturissa, Menee, Seisoo, Palaa }
        Lautta lautta = Lautta.Laiturissa;
        double lAika, lKesto, lMatka, lauttaX = LaituriX, lauttaNopeus;
        int lahtoja, yoLahtoja;

        double laivaS = -1, laivaPituus, laivaV0, laivaAlkuX, laivaKoko = 1, laivaTauko, laivaX, laivaNopeus, laivaIlmestyy = 1, laivaHaipuu = -1;
        int laivaSuunta = -1, vuoroja, ohituksia;
        bool tulliTulossa;
        double tulli = -1, tulliAlkuX, edellinenNapautus = double.NegativeInfinity;
        int tulleja;

        double haamu = -1, haamuKavely = HaamuKavelyS;
        int haamuSuunta = 1, haamuja;

        public KronborgLiike(string id) : base(id)
        {
            lKesto = Vali(EkaMinS, EkaMaxS, 0, 90);
            laivaTauko = Vali(LaivaEkaMinS, LaivaEkaMaxS, 0, 91);
        }

        public bool Tulli => tulli >= 0;
        public bool Haamu => haamu >= 0;
        public bool LaivaSalmella => laivaS >= 0;
        public double LauttaX => lauttaX;
        public double LaivaX => laivaX;
        /// <summary>Toteutuneet ohitukset (väliin jääneet vuorot eivät laske).</summary>
        public int Ohituksia => ohituksia;
        public int Tulleja => tulleja;
        public int Haamuja => haamuja;
        public int Lahtoja => lahtoja;

        // ---- Lautta ----

        void Lahde(bool yo)
        {
            lahtoja++;
            lautta = Lautta.Menee; lAika = 0;
            lKesto = AjoS * (1 + AjoVaihtelu * (2 * Arpa(lahtoja, 92) - 1));
            lMatka = Vali(KaantoMinX, KaantoMaxX, lahtoja, 93) - LaituriX;
            if (yo)
            {
                yoLahtoja++;
                if (haamu < 0 && Arpa(yoLahtoja, 94) < Harvinainen) AloitaHaamu();
            }
        }

        /// <summary>Tasainen matka 0–1 ajassa t / kesto: pehmeä kiihdytys ja jarrutus r sekuntia, välissä vakionopeus; v = nopeus
        /// suhteessa huippunopeuteen (0–1).</summary>
        static double Tasainen(double t, double kesto, double r, out double v)
        {
            t = Math.Max(0, Math.Min(kesto, t));
            double vh = 1 / (kesto - r);
            if (t < r) { v = t / r; return vh * t * t / (2 * r); }
            if (t > kesto - r) { v = (kesto - t) / r; return 1 - vh * (kesto - t) * (kesto - t) / (2 * r); }
            v = 1; return vh * (t - r * 0.5);
        }

        bool EtenLautta(double d, bool heraa, bool yo)
        {
            if (lautta == Lautta.Laiturissa && heraa) lAika = lKesto;
            lAika += d;
            if (lAika >= lKesto)
            {
                switch (lautta)
                {
                    case Lautta.Laiturissa: Lahde(yo); break;
                    case Lautta.Menee: lautta = Lautta.Seisoo; lAika = 0; lKesto = Vali(SeisooMinS, SeisooMaxS, lahtoja, 95); lauttaX = LaituriX + lMatka; break;
                    case Lautta.Seisoo: lautta = Lautta.Palaa; lAika = 0; lKesto = AjoS * (1 + AjoVaihtelu * (2 * Arpa(lahtoja, 96) - 1)); break;
                    case Lautta.Palaa:
                        lautta = Lautta.Laiturissa; lAika = 0; lauttaX = LaituriX;
                        lKesto = yo ? Vali(YoLaituriMinS, YoLaituriMaxS, lahtoja, 97) : Vali(LaituriMinS, LaituriMaxS, lahtoja, 98);
                        break;
                }
            }
            lauttaNopeus = 0;
            if (lautta == Lautta.Menee) { lauttaX = LaituriX + lMatka * Tasainen(lAika, lKesto, Pehmennys, out lauttaNopeus); return true; }
            if (lautta == Lautta.Palaa) { lauttaX = LaituriX + lMatka * (1 - Tasainen(lAika, lKesto, Pehmennys, out lauttaNopeus)); lauttaNopeus = -lauttaNopeus; return true; }
            return false;
        }

        // ---- Purjealus ----

        /// <summary>Uusi ohitus: suunta ja koko siemenestä; erikoisohitus (napautus) alkaa 0,09:n päästä tullin kohdasta.</summary>
        void AloitaLaiva(bool erikois)
        {
            vuoroja++; ohituksia++;
            laivaSuunta = Arpa(vuoroja, 100) < 0.5 ? -1 : 1;
            laivaKoko = Vali(0.9, 1.1, vuoroja, 101);
            laivaPituus = 2 * KaistaPaa;
            laivaV0 = laivaPituus / (LaivaS * (1 + LaivaVaihtelu * (2 * Arpa(vuoroja, 102) - 1)));
            laivaAlkuX = -laivaSuunta * KaistaPaa;
            laivaS = erikois ? Math.Abs(TulliX - 0.09 * laivaSuunta - laivaAlkuX) : 0;
            tulliTulossa = erikois || Arpa(vuoroja, 103) < Harvinainen;
            laivaX = laivaAlkuX + laivaSuunta * laivaS;
            // Erikoisohitus ilmestyy keskeltä kaistaa (0,6 s); tavallinen ilmestyy kaistan päässä matkan mukaan.
            laivaIlmestyy = erikois ? 0 : 1;
            laivaHaipuu = -1;
        }

        void Laukaus()
        {
            tulli = 0; tulleja++; tulliTulossa = false; tulliAlkuX = laivaX;
        }

        /// <summary>Aluksen nopeuskerroin tullin aikana: hidastuu käännöksessä, seisoo, kiihtyy paluussa.</summary>
        double TulliNopeus()
        {
            if (tulli < 0) return 1;
            if (tulli < KaannosAlku) return 1;
            if (tulli < PaluuAlku) return 1 - Pehmea((tulli - KaannosAlku) / KaannosS);
            return Pehmea((tulli - PaluuAlku) / KiihdytysS);
        }

        bool EtenLaiva(double d, bool yo)
        {
            bool liikkuu = false;
            if (laivaS < 0)
            {
                laivaTauko -= d;
                if (laivaTauko <= 0)
                {
                    if (yo) laivaTauko = Vali(LaivaTaukoMinS, LaivaTaukoMaxS, vuoroja + 500, 104);
                    else if (Arpa(vuoroja + 1, 105) < TaukoTod) { vuoroja++; laivaTauko = Vali(LaivaTaukoMinS, LaivaTaukoMaxS, vuoroja, 104); }
                    else AloitaLaiva(false);
                }
            }
            if (laivaS >= 0 && laivaHaipuu >= 0)
            {
                // Napautus kaukana tullin kohdasta: nykyinen alus haipuu (0,5 s), ja uusi ilmestyy tullin kohdan lähelle.
                laivaHaipuu += d;
                if (laivaHaipuu >= 0.5) AloitaLaiva(true);
            }
            if (laivaIlmestyy < 1) laivaIlmestyy = Math.Min(1, laivaIlmestyy + d / 0.6);
            if (laivaS >= 0)
            {
                laivaNopeus = laivaV0 * TulliNopeus();
                double ennen = laivaX;
                laivaS += laivaNopeus * d;
                laivaX = laivaAlkuX + laivaSuunta * laivaS;
                if (tulliTulossa && tulli < 0 && (ennen - TulliX) * laivaSuunta <= 0 && (laivaX - TulliX) * laivaSuunta > 0 && !yo) Laukaus();
                if (laivaS >= laivaPituus && tulli < 0)
                {
                    laivaS = -1; laivaNopeus = 0;
                    laivaTauko = Vali(LaivaTaukoMinS, LaivaTaukoMaxS, vuoroja, 104);
                }
                liikkuu = true;
            }
            if (tulli >= 0)
            {
                tulli += d; liikkuu = true;
                if (tulli > TulliS) tulli = -1;
            }
            return liikkuu;
        }

        // ---- Haamu ----

        void AloitaHaamu()
        {
            haamu = 0; haamuja++;
            haamuSuunta = Arpa(haamuja, 110) < 0.5 ? -1 : 1;
            haamuKavely = HaamuKavelyS * (1 + 0.15 * (2 * Arpa(haamuja, 111) - 1));
        }

        double HaamuS => 2 * HaamuNakyS + HaamuPysahdysS + haamuKavely;

        // ---- Askel ----

        protected override void Askel(double d, bool heraa, bool tapahtuma, bool yo)
        {
            if (tapahtuma && T - edellinenNapautus >= NapautusValiS)
            {
                if (yo) { if (haamu < 0) { edellinenNapautus = T; AloitaHaamu(); } }
                else if (tulli < 0)
                {
                    edellinenNapautus = T;
                    double ohi = (laivaX - TulliX) * laivaSuunta;
                    if (laivaS < 0) AloitaLaiva(true);
                    else if (ohi > 0 && ohi < 0.12) Laukaus();
                    else if (ohi <= 0 && ohi > -0.12) tulliTulossa = true;
                    else if (laivaHaipuu < 0) laivaHaipuu = 0;
                }
            }
            bool liikkuu = EtenLautta(d, heraa, yo);
            liikkuu |= EtenLaiva(d, yo);
            if (haamu >= 0)
            {
                haamu += d; liikkuu = true;
                if (haamu > HaamuS) haamu = -1;
            }
            if (liikkuu && d > 0) Liikkuu = true;
        }

        // ---- Asennot ----

        static (double w, double x, double y, double z) Yaw(double aste) => OsanAsento.Kierto(0, 1, 0, aste);

        OsanAsento LauttaAsento(double skaala)
        {
            if (skaala <= 0.001) return OsanAsento.Piilossa;
            return new OsanAsento { X = lauttaX - LaituriX, Skaala = skaala }.Kierretty(Yaw(0));
        }

        /// <summary>Laivan suunta (°): itään 0, länteen 180, tullissa käännös tuuleen (pohjoiseen) ja takaisin.</summary>
        double LaivaYaw()
        {
            double perus = laivaSuunta > 0 ? 0 : 180;
            if (tulli < 0) return perus;
            double k = Pehmea((tulli - KaannosAlku) / KaannosS) * (1 - Pehmea((tulli - PaluuAlku) / PaluuS));
            return perus - laivaSuunta * TuuleenAste * k;
        }

        double LaivaSkaala()
        {
            if (laivaS < 0) return 0;
            double reuna = Math.Min(laivaS, laivaPituus - laivaS);
            double haipuu = laivaHaipuu >= 0 ? 1 - Pehmea(laivaHaipuu / 0.5) : 1;
            return laivaKoko * Pehmea(reuna / 0.035) * Pehmea(laivaIlmestyy) * haipuu;
        }

        OsanAsento LaivaAsento(double ekstraRoll, double ekstraYaw, double skaala)
        {
            if (skaala <= 0.001) return OsanAsento.Piilossa;
            var q = OsanAsento.Tulo(Yaw(LaivaYaw() + ekstraYaw), OsanAsento.Kierto(1, 0, 0, ekstraRoll));
            return new OsanAsento { X = laivaX - TulliX, Skaala = skaala }.Kierretty(q);
        }

        /// <summary>Purjeiden lepatus: voimakkuus 0–1 käännöksen ja seisonnan aikana.</summary>
        double Lepatus() => tulli < 0 ? 0 : Pehmea((tulli - 0.8) / 0.6) * (1 - Pehmea((tulli - (PaluuAlku + 0.2)) / 1.2));

        OsanAsento TulliveneAsento()
        {
            // Lepo laiturissa; tullissa matka aluksen kylkeen ja takaisin (soutu nytkähtelee 1,1 s:n tahdissa).
            if (tulli < VeneLahtee || tulli > VeneLahtee + 2 * VeneMatkaS + VeneKyljessa) return OsanAsento.Lepo;
            double t = tulli - VeneLahtee;
            // Kohtaamispaikka aluksen kyljessä (alus seisoo tullin aikana).
            double kx = laivaX + KylkiDX * (laivaSuunta > 0 ? 1 : -1), kz = LaivaZ + KylkiDZ;
            double u, yaw;
            double meno = Math.Atan2(-(kz - VeneZ), kx - VeneX) * 180 / Math.PI, paluu = Math.Atan2(-(VeneZ - kz), VeneX - kx) * 180 / Math.PI;
            if (t < VeneMatkaS)
            {
                // Lähtö: laiturin suunnasta (0°) kulkusuuntaan, perillä aluksen suuntaiseksi (keula pohjoiseen, −90°).
                u = Soutu(t / VeneMatkaS);
                yaw = Kulma(Kulma(0, meno, Pehmea(t / 0.5)), -90, Pehmea((t - (VeneMatkaS - 0.6)) / 0.6));
            }
            else if (t < VeneMatkaS + VeneKyljessa)
            {
                u = 1;
                yaw = Kulma(-90, paluu, Pehmea((t - VeneMatkaS - VeneKyljessa + 0.5) / 0.5));
            }
            else
            {
                double tb = t - VeneMatkaS - VeneKyljessa;
                u = 1 - Soutu(tb / VeneMatkaS);
                yaw = Kulma(paluu, 0, Pehmea((tb - (VeneMatkaS - 0.5)) / 0.5));
            }
            double x = VeneX + (kx - VeneX) * u, z = VeneZ + (kz - VeneZ) * u;
            return new OsanAsento { X = x - VeneX, Z = z - VeneZ, Skaala = 1 }.Kierretty(Yaw(yaw));
        }

        /// <summary>Kulma a → b osuudella t lyhintä tietä (asteina).</summary>
        static double Kulma(double a, double b, double t)
        {
            double e = b - a;
            e -= 360 * Math.Floor((e + 180) / 360);
            return a + e * Math.Max(0, Math.Min(1, t));
        }

        /// <summary>Soutumatka 0–1: pehmeä alku ja loppu, välissä vetojen tahdissa nytkähtelevä eteneminen.</summary>
        static double Soutu(double u)
        {
            u = Math.Max(0, Math.Min(1, u));
            double p = Pehmea(u);
            return Math.Max(0, Math.Min(1, p + 0.012 * Math.Sin(2 * Math.PI * u * 2.7) * Math.Sin(Math.PI * u)));
        }

        OsanAsento SavuAsento()
        {
            if (tulli < 0 || tulli > SavuS) return OsanAsento.Piilossa;
            // Tuprahtaa nopeasti (0,5 s), nousee ja hälvenee.
            double kasvu = 1 - Math.Pow(1 - Math.Min(1, tulli / 0.5), 3);
            double s = 1.15 * kasvu * (1 - Pehmea((tulli - 0.5) / (SavuS - 0.5)));
            return s <= 0.02 ? OsanAsento.Piilossa : new OsanAsento { Qw = 1, Y = 0.012 * Pehmea(tulli / SavuS), Z = -0.006 * Pehmea(tulli / SavuS), Skaala = s };
        }

        OsanAsento RoiskeAsento()
        {
            if (tulli < RoiskeAlku || tulli > RoiskeAlku + RoiskeS) return OsanAsento.Piilossa;
            double t = (tulli - RoiskeAlku) / RoiskeS;
            double s = t < 0.35 ? Pehmea(t / 0.35) : 1 - Pehmea((t - 0.35) / 0.65);
            double x = tulliAlkuX + laivaSuunta * RoiskeMatka;
            return s <= 0.02 ? OsanAsento.Piilossa : new OsanAsento { Qw = 1, X = x - RoiskeX, Skaala = s };
        }

        OsanAsento HaamuAsento()
        {
            if (haamu < 0) return OsanAsento.Piilossa;
            double t = haamu, puoli = haamuKavely * 0.5, sk, x, yaw;
            double kavely = haamuSuunta > 0 ? -90 : 90;
            if (t < HaamuNakyS) { sk = Pehmea(t / HaamuNakyS); x = -haamuSuunta * HaamuPuoli; yaw = kavely * Pehmea(t / HaamuNakyS); }
            else if (t < HaamuNakyS + puoli) { sk = 1; x = -haamuSuunta * HaamuPuoli * (1 - Pehmea((t - HaamuNakyS) / puoli)); yaw = kavely; }
            else if (t < HaamuNakyS + puoli + HaamuPysahdysS)
            {
                // Pysähtyy keskelle ja kääntyy hetkeksi katsojaan päin (käsi viittoo etelään), sitten takaisin kulkusuuntaan.
                double p = t - HaamuNakyS - puoli;
                sk = 1; x = 0;
                double kaanto = Pehmea(p / 0.5) * (1 - Pehmea((p - (HaamuPysahdysS - 0.5)) / 0.5));
                yaw = kavely * (1 - kaanto);
            }
            else if (t < HaamuNakyS + 2 * puoli + HaamuPysahdysS)
            {
                sk = 1; x = haamuSuunta * HaamuPuoli * Pehmea((t - HaamuNakyS - puoli - HaamuPysahdysS) / puoli); yaw = kavely;
            }
            else
            {
                double p = t - HaamuNakyS - 2 * puoli - HaamuPysahdysS;
                sk = 1 - Pehmea(p / HaamuNakyS); x = haamuSuunta * HaamuPuoli; yaw = kavely;
            }
            if (sk <= 0.02) return OsanAsento.Piilossa;
            double y = 0.0022 * (0.5 + 0.5 * Math.Sin(2 * Math.PI * 0.9 * t));
            return new OsanAsento { X = x, Y = y, Skaala = sk }.Kierretty(Yaw(yaw));
        }

        public override OsanAsento Asento(string osa)
        {
            switch (osa)
            {
                case "lautta": return LauttaAsento(1);
                case "lauttavana":
                {
                    double v = Math.Abs(lauttaNopeus);
                    if (v <= 0.03) return OsanAsento.Piilossa;
                    // Vana −X-pään takana: menomatkalla (itään) sellaisenaan, paluulla käännettynä 180°.
                    return new OsanAsento { X = lauttaX - LaituriX, Skaala = Math.Min(1, v) }.Kierretty(Yaw(lauttaNopeus >= 0 ? 0 : 180));
                }
                case "lauttavalot": return Valo <= 0.001 ? OsanAsento.Piilossa : LauttaAsento(Pehmea(Valo));
                case "laiva": return LaivaAsento(0, 0, LaivaSkaala());
                case "purjeet":
                {
                    double l = Lepatus();
                    double roll = l * 6 * Math.Sin(2 * Math.PI * 2.2 * tulli), brace = -laivaSuunta * l * 12 * (0.7 + 0.3 * Math.Sin(2 * Math.PI * 0.9 * tulli));
                    return LaivaAsento(roll, brace, LaivaSkaala());
                }
                case "laivavana":
                {
                    double v = laivaV0 > 0 ? laivaNopeus / laivaV0 : 0;
                    double s = LaivaSkaala() * v;
                    return s <= 0.03 ? OsanAsento.Piilossa : LaivaAsento(0, 0, s);
                }
                case "tullivene": return TulliveneAsento();
                case "savu": return SavuAsento();
                case "roiske": return RoiskeAsento();
                case "haamu": return HaamuAsento();
                case "valot":
                case "valot1":
                case "valot2":
                case "lyhty0":
                case "lyhty1":
                    return Valot();
                default: return OsanAsento.Lepo;
            }
        }

        public override string Tila() =>
            $"lautta {lautta} x {lauttaX:F2} ({lAika:F0}/{lKesto:F0} s), lähtöjä {lahtoja}; " +
            (laivaS >= 0 ? $"purjealus {(laivaSuunta > 0 ? "itään" : "länteen")} x {laivaX:F2}" : $"salmi tyhjä ({laivaTauko:F0} s)") +
            $", ohituksia {ohituksia}, tulleja {tulleja}" + (tulli >= 0 ? $", tulli {tulli:F1} s" : "") +
            $", haamuja {haamuja}" + (haamu >= 0 ? $", haamu {haamu:F1} s" : "");
    }
}
