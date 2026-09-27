// ERIKOISMALLIEN LIIKE, ERÄ 3: BRUGGEN KELLOTORNI (omistaja hyväksyi elämänidean 27.9. klo 07.5x; speksi
// docs/raportit/erikoismallit/brugge-belfry.md). Sama kaava kuin ErikoisLiike.cs: perusliike, harvinainen tapahtuma, reaktio
// pelaajaan ja yövalot. Puhdas C#, ei allokaatioita kehyksessä (Tila() vain lokiin), aikataulu siemenellä noston id:stä.
using System;

namespace Matkakirja.Linssit.Elava
{
    /// <summary>
    /// Bruggen kellotorni: perusliike = kanavavene odottaa laiturilla reien länsipäässä (20–60 s), liukuu sillan ali itäpäähän
    /// (16 s), odottaa (8–25 s), kääntyy (2,2 s) ja palaa, ja kääntyy taas; vauhdissa perään levenee vana. Harvinainen (1/10
    /// matkoista): kellopeli soi — kuusi kultaista nuottia nousee kahdeksankulmion kruunusta kierteenä 0,5 s:n porrastuksella,
    /// kolme kierrosta (noin 11 s, 18 nuottia). Reaktio: lähestyttäessä odottava vene lähtee; napautus = kellopeli heti
    /// (enintään kerran 20 s:ssa). Yöllä torni ja sisäpiha valaistaan ja kruunu hehkuu (1,5 s, valaisematon, ei bloomia).
    /// Levossa (vene laiturilla, kellopeli hiljaa, valo vakaa) Liikkuu = false, joten elävä kerros piirtää 0 kehystä.
    /// </summary>
    public sealed class BruggenKellotorniLiike : ErikoisAnimaatio
    {
        /// <summary>Veneen reitin puolipituus X-akselilla (mallin BbVeneMatka), ajo, käännös ja odotukset (s).</summary>
        public const double Matka = 0.36, AjoS = 16, KaannosS = 2.2;
        public const int Savelia = 6, Kierroksia = 3;
        /// <summary>Kellopeli: nuottien porrastus, kierroksen väli, nuotin elinaika ja napautuksen vähimmäisväli (s).</summary>
        public const double Porras = 0.5, KierrosS = 3.0, SavelS = 2.9, NapautusValiS = 20;
        /// <summary>Nuotin nousu kruunusta (mallin yksiköissä), kierteen säde alussa ja lopussa sekä kierteen kiertymä (°).</summary>
        public const double Nousu = 0.3, SadeAlku = 0.03, SadeLoppu = 0.22, Kierre = 70;
        /// <summary>Nuottitason normaali (mallin BbNuottiNormaali): keinunta tapahtuu nuotin omassa tasossa.</summary>
        const double TasoY = 0.7071067811865476, TasoZ = -0.7071067811865476;
        const double KultainenKulma = 137.50776405003785;

        enum Vaihe { Odottaa, Ajaa, Kaantyy }
        Vaihe vaihe = Vaihe.Odottaa;
        double aika, kesto, suunta = 1, kierto, kello = -1, edellinenSoitto = -1e9, kulma0;
        int matkoja, soittoja;

        public BruggenKellotorniLiike(string id) : base(id) { kesto = Vali(5, 40, 0, 60); }

        /// <summary>Veneen paikka X (−Matka länsi … +Matka itä).</summary>
        public double Paikka { get; private set; } = -Matka;
        /// <summary>Kellopeli soi (nuotteja näkyvissä tai tulossa).</summary>
        public bool Soi => kello >= 0;
        public int Soittoja => soittoja;
        public int Matkoja => matkoja;
        /// <summary>Kellopelin kesto: viimeinen nuotti lähtee (Savelia − 1) · Porras + (Kierroksia − 1) · KierrosS ja elää SavelS.</summary>
        public static double KelloS => (Savelia - 1) * Porras + (Kierroksia - 1) * KierrosS + SavelS;

        void Soita()
        {
            kello = 0; soittoja++; edellinenSoitto = T;
            kulma0 = Vali(0, 360, soittoja, 64);
        }

        protected override void Askel(double d, bool heraa, bool tapahtuma, bool yo)
        {
            if (tapahtuma && kello < 0 && T - edellinenSoitto >= NapautusValiS) Soita();
            if (heraa && vaihe == Vaihe.Odottaa) aika = kesto;
            aika += d;
            if (aika >= kesto)
            {
                aika = 0;
                switch (vaihe)
                {
                    case Vaihe.Odottaa: vaihe = Vaihe.Ajaa; kesto = AjoS; break;
                    case Vaihe.Ajaa:
                        matkoja++;
                        Paikka = suunta * Matka;   // perillä
                        vaihe = Vaihe.Kaantyy; kesto = KaannosS;
                        if (kello < 0 && Arpa(matkoja, 61) < 0.1) Soita();
                        break;
                    case Vaihe.Kaantyy:
                        suunta = -suunta; kierto = suunta > 0 ? 0 : 180;
                        // Länsipään laiturilla (suunta itään) odotetaan kauemmin kuin itäpäässä.
                        vaihe = Vaihe.Odottaa; kesto = suunta > 0 ? Vali(20, 60, matkoja, 62) : Vali(8, 25, matkoja, 63);
                        break;
                }
            }
            double p = Pehmea(aika / Math.Max(1e-6, kesto));
            if (vaihe == Vaihe.Ajaa) { Paikka = -suunta * Matka + 2 * suunta * Matka * p; Liikkuu = true; }
            else if (vaihe == Vaihe.Kaantyy) { kierto = (suunta > 0 ? 0 : 180) + 180 * p; Liikkuu = true; }
            if (kello >= 0)
            {
                kello += d; Liikkuu = true;
                if (kello > KelloS) kello = -1;
            }
        }

        /// <summary>Vanan skaala 0–1: täysi ajon keskivaiheilla, kasvaa lähtiessä ja hiipuu saavuttaessa (vauhdin mukaan).</summary>
        public double Vana
        {
            get
            {
                if (vaihe != Vaihe.Ajaa) return 0;
                double u = aika / Math.Max(1e-6, kesto);
                return Math.Min(1, 1.6 * 4 * u * (1 - u));
            }
        }

        /// <summary>Nuotin k vaihe 0–1 kierroksen sisällä (n = nuotin järjestysnumero soitossa), tai −1, jos ei näkyvissä.</summary>
        double Savel(int k, out int n)
        {
            n = -1;
            if (kello < 0) return -1;
            for (int m = 0; m < Kierroksia; m++)
            {
                double t = kello - m * KierrosS - k * Porras;
                if (t >= 0 && t < SavelS) { n = m * Savelia + k; return t / SavelS; }
            }
            return -1;
        }

        public override OsanAsento Asento(string osa)
        {
            if (osa.Length == 6 && osa.StartsWith("savel", StringComparison.Ordinal))
            {
                int k = osa[5] - '0';
                if (k < 0 || k >= Savelia) return OsanAsento.Lepo;
                double u = Savel(k, out int n);
                if (u < 0) return OsanAsento.Piilossa;
                // Kierre: jokainen nuotti lähtee kultaisen kulman verran edellisestä, loittonee ja nousee hidastuen.
                double kulma = (kulma0 + n * KultainenKulma + Kierre * u) * Math.PI / 180;
                double sade = SadeAlku + (SadeLoppu - SadeAlku) * u;
                double y = -0.02 + Nousu * (1 - (1 - u) * (1 - u));
                double koko = 0.85 + 0.3 * Arpa(n + soittoja * 31, 65);
                double skaala = koko * Pehmea(u / 0.12) * (1 - Pehmea((u - 0.7) / 0.3));
                if (skaala <= 0.02) return OsanAsento.Piilossa;
                // Keinunta nuotin omassa tasossa (tanssiva nuotti), vaihe nuotin mukaan.
                double keinu = 16 * Math.Sin(2 * Math.PI * (1.4 * u + n * 0.37));
                return new OsanAsento { X = Math.Cos(kulma) * sade, Y = y, Z = Math.Sin(kulma) * sade, Skaala = skaala }
                    .Kierretty(OsanAsento.Kierto(0, TasoY, TasoZ, keinu));
            }
            switch (osa)
            {
                case "vene":
                    // Rakennettu keula itään (+X); länteen päin kierto 180°, kääntyessä välissä (keula kääntyy etelän kautta).
                    return new OsanAsento { X = Paikka, Skaala = 1 }.Kierretty(OsanAsento.Kierto(0, 1, 0, kierto));
                case "vana":
                {
                    double v = Vana;
                    return v <= 0.02 ? OsanAsento.Piilossa : new OsanAsento { X = Paikka, Skaala = v }.Kierretty(OsanAsento.Kierto(0, 1, 0, kierto));
                }
                case "valot":
                case "valot1":
                case "valot2":
                case "kruunu":
                    return Valot();
                default: return OsanAsento.Lepo;
            }
        }

        public override string Tila() =>
            $"vene {(vaihe == Vaihe.Odottaa ? "odottaa" : vaihe == Vaihe.Ajaa ? "liukuu" : "kääntyy")} x {Paikka:F2} ({aika:F0}/{kesto:F0} s), matkoja {matkoja}" +
            (kello >= 0 ? $", kellopeli soi {kello:F1} s" : "") + $", soittoja {soittoja}";
    }
}
