// ERIKOISMALLIEN LIIKE, ERÄ 2 (omistajan jono 27.9. klo 01.4x: Kinderdijk, Brandenburgin portti, Segovian akvedukti;
// speksit docs/raportit/erikoismallit/). Sama kaava kuin ErikoisLiike.cs: perusliike, harvinainen tapahtuma, reaktio ja yövalot.
using System;

namespace Matkakirja.Linssit.Elava
{
    /// <summary>
    /// Kinderdijk: perusliike = 1–3 myllyä pyörii kerrallaan (käy 20–60 s, seisoo 30–120 s, jokaisella oma aikataulu). Siivet
    /// kiihtyvät 3 s:ssa ja pysähtyvät tasaisella hidastuvuudella pystyristiin (+, myllärin lepoasento). Harvinainen (1/10
    /// käynnistyksistä): aalto — kaikki kuusi käynnistyvät 0,6 s:n porrastuksella lännestä itään, pyörivät 30 s ja
    /// pysähtyvät samassa järjestyksessä (v3 27.9.: kuusi isoa myllyä kahdessa rivissä kameraa kohti). Reaktio: lähestyttäessä ensimmäinen seisova mylly herää; tapahtuma = aalto heti.
    /// Siivet pyörivät vastapäivään edestä (tuulen puolelta) katsottuna kuten hollantilaiset myllyt.
    /// </summary>
    public sealed class KinderdijkLiike : ErikoisAnimaatio
    {
        public const int Myllyja = 6, EnintaanKay = 3;
        /// <summary>Siipien akseli (tuulen tulosuunta etelälounas, tyylitelty kameraa kohti), sama kuin mallin Symbolimallit.KdTuuli.</summary>
        public const double AkseliX = -0.25881904510252074, AkseliZ = -0.9659258262890683;
        public const double KierrosS = 5, KiihdytysS = 3, AaltoPorras = 0.6, AaltoS = 30;
        const double Huippu = 360 / KierrosS;

        enum MTila { Seisoo, Kay, Hidastuu }
        readonly MTila[] tila = new MTila[Myllyja];
        readonly double[] kulma = new double[Myllyja], nopeus = new double[Myllyja], aika = new double[Myllyja], kesto = new double[Myllyja];
        // Hidastus: alkukulma, alkunopeus, kohde (seuraava 90°:n monikerta pysähtymismatkan jälkeen) ja kesto.
        readonly double[] hAlku = new double[Myllyja], hNopeus = new double[Myllyja], hKohde = new double[Myllyja], hKesto = new double[Myllyja];
        readonly int[] jakso = new int[Myllyja];
        double aalto = -1;
        int kaynnistyksia, aaltoja;

        public KinderdijkLiike(string id) : base(id)
        {
            for (int j = 0; j < Myllyja; j++) kesto[j] = Vali(0, 60, j, 30);
        }

        public bool Aalto => aalto >= 0;
        public int Kay { get { int n = 0; for (int j = 0; j < Myllyja; j++) if (tila[j] != MTila.Seisoo) n++; return n; } }
        public double Kulma(int j) => kulma[j];
        public double Nopeus(int j) => nopeus[j];

        void Kaynnista(int j, double kestoS)
        {
            tila[j] = MTila.Kay; aika[j] = 0; kesto[j] = kestoS; jakso[j]++;
        }

        void Pysayta(int j)
        {
            if (tila[j] != MTila.Kay) return;
            double v = Math.Max(1e-3, nopeus[j]);
            double matka = v * v / (2 * Huippu / KiihdytysS);
            double kohde = Math.Ceiling((kulma[j] + matka) / 90.0) * 90.0;
            tila[j] = MTila.Hidastuu; aika[j] = 0;
            hAlku[j] = kulma[j]; hNopeus[j] = v; hKohde[j] = kohde;
            hKesto[j] = 2 * (kohde - kulma[j]) / v;
        }

        void AloitaAalto()
        {
            aalto = 0; aaltoja++;
        }

        protected override void Askel(double d, bool heraa, bool tapahtuma, bool yo)
        {
            if (tapahtuma && aalto < 0) AloitaAalto();
            if (heraa && aalto < 0 && Kay == 0)
                for (int j = 0; j < Myllyja; j++) if (tila[j] == MTila.Seisoo) { Kaynnista(j, Vali(20, 60, jakso[j], 31)); break; }

            if (aalto >= 0)
            {
                aalto += d;
                for (int j = 0; j < Myllyja; j++)
                {
                    double alku = j * AaltoPorras, loppu = AaltoS + j * AaltoPorras;
                    if (aalto >= alku && aalto < loppu && tila[j] != MTila.Kay) Kaynnista(j, 1e9);
                    if (aalto >= loppu) Pysayta(j);
                }
                if (aalto > AaltoS + Myllyja * AaltoPorras + 1 && Kay == 0)
                {
                    aalto = -1;
                    for (int j = 0; j < Myllyja; j++) { aika[j] = 0; kesto[j] = Vali(30, 120, jakso[j], 32); }
                }
            }
            else
            {
                for (int j = 0; j < Myllyja; j++)
                {
                    if (tila[j] == MTila.Hidastuu) continue;
                    aika[j] += d;
                    if (aika[j] < kesto[j]) continue;
                    if (tila[j] == MTila.Kay) { Pysayta(j); continue; }
                    // Seisova käynnistyy, jos vuoroja on vapaana; muuten odottaa 10 s lisää.
                    if (Kay >= EnintaanKay) { kesto[j] += 10; continue; }
                    kaynnistyksia++;
                    if (Arpa(kaynnistyksia, 33) < 0.1) { AloitaAalto(); break; }
                    Kaynnista(j, Vali(20, 60, jakso[j], 31));
                }
            }

            for (int j = 0; j < Myllyja; j++)
            {
                switch (tila[j])
                {
                    case MTila.Kay:
                        nopeus[j] = Math.Min(Huippu, nopeus[j] + Huippu / KiihdytysS * d);
                        kulma[j] += nopeus[j] * d;
                        Liikkuu = true;
                        break;
                    case MTila.Hidastuu:
                    {
                        aika[j] += d;
                        double t = Math.Min(aika[j], hKesto[j]);
                        double a = hNopeus[j] / Math.Max(1e-6, hKesto[j]);
                        kulma[j] = hAlku[j] + hNopeus[j] * t - 0.5 * a * t * t;
                        nopeus[j] = Math.Max(0, hNopeus[j] - a * t);
                        Liikkuu = true;
                        if (aika[j] >= hKesto[j])
                        {
                            kulma[j] = hKohde[j] % 360.0; nopeus[j] = 0; tila[j] = MTila.Seisoo; aika[j] = 0;
                            kesto[j] = Vali(30, 120, jakso[j], 32);
                        }
                        break;
                    }
                }
            }
        }

        public override OsanAsento Asento(string osa)
        {
            if (osa.StartsWith("siivet", StringComparison.Ordinal) && int.TryParse(osa.Substring(6), out int j) && j >= 0 && j < Myllyja)
                return OsanAsento.Lepo.Kierretty(OsanAsento.Kierto(AkseliX, 0, AkseliZ, -kulma[j]));
            if (osa == "valot") return Valot();
            return OsanAsento.Lepo;
        }

        public override string Tila()
        {
            var kayvat = new System.Text.StringBuilder();
            for (int j = 0; j < Myllyja; j++) if (tila[j] != MTila.Seisoo) kayvat.Append(kayvat.Length > 0 ? "," : "").Append(j);
            return $"myllyt käy {Kay}/{Myllyja} ({kayvat}){(aalto >= 0 ? $", aalto {aalto:F0} s" : "")}, käynnistyksiä {kaynnistyksia}, aaltoja {aaltoja}";
        }
    }

    /// <summary>
    /// Brandenburgin portti: perusliike = hevosvaunut odottavat aukiolla (etelä, julkisivun puoli, 20–60 s), ajavat keskiaukon
    /// läpi pohjoiseen (12 s), odottavat (10–30 s), kääntyvät (1,5 s) ja ajavat takaisin, kääntyvät taas. Harvinainen (1/10
    /// matkoista): uudenvuoden ilotulitus — kolme rakettia portin yllä porrastettuina (0 / 1,2 / 2,4 s), kolme kierrosta, kukin
    /// puhkeaa 0,8 s:ssa ja hiipuu alas 1,7 s:ssa. Reaktio: lähestyttäessä odottavat vaunut lähtevät; tapahtuma = ilotulitus heti.
    /// </summary>
    public sealed class BrandenburginPorttiLiike : ErikoisAnimaatio
    {
        public const double Matka = 0.36, AjoS = 12, KaannosS = 1.5, RakettiS = 2.5, Puhkeaa = 0.8, KierrosS = 3.6;
        public const int Raketteja = 3, Kierroksia = 3;
        enum Vaihe { Odottaa, Ajaa, Kaantyy }
        Vaihe vaihe = Vaihe.Odottaa;
        double aika, kesto, suunta = 1, kierto, ilotulitus = -1;
        int matkoja;

        public BrandenburginPorttiLiike(string id) : base(id) { kesto = Vali(5, 40, 0, 40); }

        /// <summary>Vaunujen paikka Z (−Matka etelä … +Matka pohjoinen).</summary>
        public double Paikka { get; private set; } = -Matka;
        public bool Ilotulitus => ilotulitus >= 0;

        protected override void Askel(double d, bool heraa, bool tapahtuma, bool yo)
        {
            if (tapahtuma && ilotulitus < 0) ilotulitus = 0;
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
                        if (ilotulitus < 0 && Arpa(matkoja, 41) < 0.1) ilotulitus = 0;
                        break;
                    case Vaihe.Kaantyy:
                        suunta = -suunta; kierto = suunta > 0 ? 0 : 180;
                        vaihe = Vaihe.Odottaa; kesto = suunta > 0 ? Vali(20, 60, matkoja, 42) : Vali(10, 30, matkoja, 43);
                        break;
                }
            }
            double p = Pehmea(aika / Math.Max(1e-6, kesto));
            if (vaihe == Vaihe.Ajaa) { Paikka = -suunta * Matka + 2 * suunta * Matka * p; Liikkuu = true; }
            else if (vaihe == Vaihe.Kaantyy) { kierto = (suunta > 0 ? 0 : 180) + 180 * p; Liikkuu = true; }
            if (ilotulitus >= 0)
            {
                ilotulitus += d; Liikkuu = true;
                if (ilotulitus > (Kierroksia - 1) * KierrosS + (Raketteja - 1) * 1.2 + RakettiS) ilotulitus = -1;
            }
        }

        /// <summary>Raketin r vaihe 0–1 tämän kierroksen sisällä, tai −1, jos ei näkyvissä.</summary>
        double Raketti(int r)
        {
            if (ilotulitus < 0) return -1;
            for (int k = 0; k < Kierroksia; k++)
            {
                double t = ilotulitus - k * KierrosS - r * 1.2;
                if (t >= 0 && t < RakettiS) return t / RakettiS;
            }
            return -1;
        }

        public override OsanAsento Asento(string osa)
        {
            if (osa.StartsWith("ilotulitus", StringComparison.Ordinal) && int.TryParse(osa.Substring(10), out int r))
            {
                double v = Raketti(r);
                if (v < 0) return OsanAsento.Piilossa;
                double t = v * RakettiS;
                // Puhkeaa 0,8 s:ssa täyteen kokoon, sitten kipinät valuvat alas ja hiipuvat (skaala pienenee).
                double skaala = t < Puhkeaa ? Pehmea(t / Puhkeaa) : 1 - 0.8 * Pehmea((t - Puhkeaa) / (RakettiS - Puhkeaa));
                double y = t < Puhkeaa ? 0 : -0.05 * Pehmea((t - Puhkeaa) / (RakettiS - Puhkeaa));
                return skaala <= 0.02 ? OsanAsento.Piilossa : new OsanAsento { Qw = 1, Y = y, Skaala = skaala };
            }
            switch (osa)
            {
                case "vaunut":
                    // Rakennettu kulkemaan +Z:aan (pohjoiseen); etelään päin kierto 180°, kääntyessä välissä.
                    return new OsanAsento { Z = Paikka, Skaala = 1 }.Kierretty(OsanAsento.Kierto(0, 1, 0, kierto));
                case "valot": return Valot();
                default: return OsanAsento.Lepo;
            }
        }

        public override string Tila() =>
            $"vaunut {(vaihe == Vaihe.Odottaa ? "odottavat" : vaihe == Vaihe.Ajaa ? "ajavat" : "kääntyvät")} z {Paikka:F2} ({aika:F0}/{kesto:F0} s), matkoja {matkoja}" +
            (ilotulitus >= 0 ? $", ilotulitus {ilotulitus:F1} s" : "");
    }

    /// <summary>
    /// Segovian akvedukti: perusliike = vesikimallus liukuu kourua pitkin vuorilta (itä) kaupunkiin (länsi) 10 s:ssa, tauko
    /// 8–20 s. Harvinainen (1/10 kimalluksista): paholaisen viimeinen kivi — kivi nousee aukiolta kaarena kourun viereen (2 s),
    /// huojuu (1,2 s), aamunkoitto kultaa kaaret (1 s) ja kivi putoaa takaisin ja katoaa (1,2 s); kajo hiipuu (2,8 s).
    /// Reaktio: lähestyttäessä kimallus lähtee heti; tapahtuma = kivi heti.
    /// </summary>
    public sealed class SegovianAkveduktiLiike : ErikoisAnimaatio
    {
        public const double VesiX = 0.45, VesiS = 10, NousuS = 2, HuojuuS = 1.2, AamuS = 1, PutoaaS = 1.2, KajoS = 2.8;
        /// <summary>Kiven siirto lähtöpaikasta (aukio) kourun viereen mallin yksiköissä.</summary>
        public const double KohdeX = -0.06, KohdeY = 0.245, KohdeZ = 0.1;
        double vesiAika, vesiKesto, kivi = -1;
        bool virtaa;
        int kimalluksia;

        public SegovianAkveduktiLiike(string id) : base(id) { vesiKesto = Vali(2, 15, 0, 50); }

        public bool Kivi => kivi >= 0;
        double Loppu => NousuS + HuojuuS + AamuS + KajoS;

        protected override void Askel(double d, bool heraa, bool tapahtuma, bool yo)
        {
            if (tapahtuma && kivi < 0) kivi = 0;
            if (heraa && !virtaa) vesiAika = vesiKesto;
            vesiAika += d;
            if (vesiAika >= vesiKesto)
            {
                vesiAika = 0;
                virtaa = !virtaa;
                if (virtaa) { kimalluksia++; vesiKesto = VesiS; if (kivi < 0 && Arpa(kimalluksia, 51) < 0.1) kivi = 0; }
                else vesiKesto = Vali(8, 20, kimalluksia, 52);
            }
            if (virtaa) Liikkuu = true;
            if (kivi >= 0) { kivi += d; Liikkuu = true; if (kivi > Loppu) kivi = -1; }
        }

        public override OsanAsento Asento(string osa)
        {
            switch (osa)
            {
                case "vesi":
                    if (!virtaa) return OsanAsento.Piilossa;
                    double p = vesiAika / VesiS;
                    // Kimallus syttyy ja sammuu pehmeästi päissä.
                    double sk = Math.Min(1, Math.Min(p, 1 - p) * 8);
                    return sk <= 0.02 ? OsanAsento.Piilossa : new OsanAsento { Qw = 1, X = VesiX - 2 * VesiX * p, Skaala = sk };
                case "kivi":
                {
                    if (kivi < 0) return OsanAsento.Piilossa;
                    double t = kivi;
                    if (t < NousuS)
                    {
                        double u = Pehmea(t / NousuS);
                        // Kaari: sivusuunta tasaisesti, korkeus nousee ja hidastuu kohteessa.
                        return new OsanAsento { X = KohdeX * u, Z = KohdeZ * u, Y = KohdeY * Math.Sin(u * Math.PI * 0.5), Skaala = Math.Min(1, t * 4) }
                            .Kierretty(OsanAsento.Kierto(0, 0, 1, 25 * u));
                    }
                    t -= NousuS;
                    if (t < HuojuuS + AamuS * 0.4)
                        return new OsanAsento { X = KohdeX, Z = KohdeZ, Y = KohdeY + 0.004 * Math.Sin(t * 12), Skaala = 1 }
                            .Kierretty(OsanAsento.Kierto(0, 0, 1, 25 + 10 * Math.Sin(t * 9)));
                    t -= HuojuuS + AamuS * 0.4;
                    if (t < PutoaaS)
                    {
                        double u = t / PutoaaS;
                        // Putoaa kiihtyen (u²) takaisin aukiolle ja kutistuu pois viimeisellä kolmanneksella.
                        return new OsanAsento { X = KohdeX, Z = KohdeZ * (1 - u), Y = KohdeY * (1 - u * u), Skaala = u < 0.66 ? 1 : Math.Max(0, 1 - (u - 0.66) * 3) }
                            .Kierretty(OsanAsento.Kierto(0, 0, 1, 25 + 200 * u));
                    }
                    return OsanAsento.Piilossa;
                }
                case "aamu":
                {
                    if (kivi < 0) return OsanAsento.Piilossa;
                    double t = kivi - NousuS - HuojuuS;
                    if (t < 0) return OsanAsento.Piilossa;
                    double v = t < AamuS ? Pehmea(t / AamuS) : 1 - Pehmea((t - AamuS) / KajoS);
                    return v <= 0.02 ? OsanAsento.Piilossa : new OsanAsento { Qw = 1, Skaala = v };
                }
                case "valot": return Valot();
                default: return OsanAsento.Lepo;
            }
        }

        public override string Tila() =>
            $"vesi {(virtaa ? "virtaa" : "tauolla")} ({vesiAika:F0}/{vesiKesto:F0} s), kimalluksia {kimalluksia}" + (kivi >= 0 ? $", paholaisen kivi {kivi:F1} s" : "");
    }
}
