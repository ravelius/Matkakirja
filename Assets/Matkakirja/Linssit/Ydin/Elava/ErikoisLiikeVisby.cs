// ERIKOISMALLIN LIIKE: VISBY (omistaja hyväksyi elämänidean 27.9.2026; speksi docs/raportit/erikoismallit/visby.md).
// Sama kaava kuin ErikoisLiike.cs: perusliike (Gotlannin lautta), harvinainen tapahtuma (Valdemar Atterdagin oluttynnyrit,
// legenda 1361), reaktio pelaajaan (lähestyminen tuo lautan, napautus = tynnyrit) ja yövalot. Puhdas C#, ei allokaatioita
// kehyksessä (Asento vertaa nimiä suoraan, ei Substringiä), aikataulu siemenellä noston id:stä.
using System;

namespace Matkakirja.Linssit.Elava
{
    /// <summary>
    /// Visby: perusliike = Gotlannin lautta tulee näkyviin meren vasemmasta päästä (pohjoisesta, Nynäshamnin suunnalta) ja
    /// liukuu kaupungin rantamuurin ja Kruttornetin editse satamaan (14 s ±10 %, hidastuen), tekee satama-altaassa
    /// puolikäännöksen (4,5 s, suunta siemenestä) ja peruuttaa perä edellä lauttalaituriin (3,5 s). Laiturissa se odottaa
    /// 15–45 s ja lähtee keula edellä takaisin vasemmalle (15 s, kiihtyen), jossa se katoaa. Merellä tauko on 25–70 s ja joka
    /// viides kerta pitkä (70–120 s). Kulkulinja vaihtelee ±0,006, ja liikkeessä runko keinuu ±1,2°. Vana levenee vauhdin mukaan.
    /// Harvinainen (noin 1/10 saapumisista, oma kanava): Stora torgetille putoaa kolme oluttynnyriä porrastettuina, kulta nousee
    /// niiden sisältä reunan yli kimaltelevaksi kasaksi ja kaikki pienenevät pois (7,2 s). Legenda (Strelow 1633), ei fakta.
    /// Reaktio: lähestyminen tuo merellä olevan lautan heti; napautus = tynnyrit heti (enintään kerran 20 s:ssa, myös yöllä).
    /// Yöllä lautta kulkee ja sen ikkunat hehkuvat, tornit ja S:ta Karin hehkuvat (1,5 s), eivätkä tynnyrit tule itsestään.
    /// Levossa (lautta laiturissa tai merellä, tori hiljaa, valo vakaa) Liikkuu = false, joten elävä kerros piirtää 0 kehystä.
    /// </summary>
    public sealed class VisbyLiike : ErikoisAnimaatio
    {
        // ---- Satama (samat kuin Symbolimallit.Vb*-vakiot: muuta molemmat) ----

        /// <summary>Laituripaikka (lautan pivot), kääntöpaikka, altaan kulkulinja, meren kulkulinja ja ilmestymiskohta X.</summary>
        public const double LaituriX = 0.39, KaantoX = 0.30, AltaanZ = -0.2275, KulkuZ = -0.205, AlkuX = -0.43;

        // ---- Ajat ja vaihtelu (speksi kohta 6) ----

        public const double SaapuuS = 14, KaantyyS = 4.5, PeruuttaaS = 3.5, LahteeS = 15, IlmestyyS = 1.2;
        public const double LaiturissaMinS = 15, LaiturissaMaxS = 45, MerellaMinS = 25, MerellaMaxS = 70, PitkaTod = 0.2, PitkaMinS = 70, PitkaMaxS = 120;
        public const double Harvinainen = 0.1, NapautusValiS = 20;
        /// <summary>Keinunta (±°, jakso s) ja vanan täysi vauhti (mallin yksikköä sekunnissa).</summary>
        public const double KeinuAste = 1.2, KeinuS = 3.2, VanaVauhti = 0.06;
        /// <summary>Tynnyrit: kesto, putoamiskorkeus ja -aika, porrastus, täytön alku ja kesto, loppu ja kullan lähtösyvyys
        /// (reunan tasosta tynnyrin pohjalle, Symbolimallit.VbTynnyriH − 0,005).</summary>
        public const double TynnyriS = 7.2, Pudotus = 0.03, PutoaaS = 0.45, Porras = 0.25, TayttoAlku = 1.0, TayttoPorras = 0.45, TayttoS = 1.8,
            LoppuAlku = 6.0, KultaSyvyys = 0.025;

        enum Vaihe { Merella, Saapuu, Kaantyy, Peruuttaa, Laiturissa, Lahtee }
        Vaihe vaihe = Vaihe.Merella;
        double aika, kesto, vauhti = 1, linja, kaanto = 1, keinuVaihe;
        int matkoja, saapumisia, tynnyrikertoja;
        double tynnyrit = -1, edellinenTynnyri = double.NegativeInfinity;
        // Tynnyrikerran vaihtelu: järjestys, täytön alku ja kesto sekä kimalluksen vaihe tynnyreittäin.
        readonly int[] jarjestys = new int[3];
        readonly double[] tayttoAlku = new double[3], tayttoKesto = new double[3], kimallusVaihe = new double[3];
        // Lautan asento mallin avaruudessa (x, z), keulan suunta ψ (°, lepo 0 = keula −X), skaala, vauhti ja keinunta.
        double lx = LaituriX, lz = AltaanZ, psi, skaala, nopeus, keinu;

        public VisbyLiike(string id) : base(id)
        {
            kesto = Vali(3, 20, 0, 90);
            keinuVaihe = Vali(0, Math.PI * 2, 0, 91);
        }

        public bool Tynnyrit => tynnyrit >= 0;
        public int Matkoja => matkoja;
        public int Saapumisia => saapumisia;
        public int Tynnyrikertoja => tynnyrikertoja;
        /// <summary>Lautan paikka, suunta ja näkyvyys (testeihin).</summary>
        public (double x, double z, double psi, double skaala) Lautta => (lx, lz, psi, skaala);

        void AloitaTynnyrit()
        {
            tynnyrit = 0; edellinenTynnyri = T; tynnyrikertoja++;
            // Järjestys: kolmen tynnyrin permutaatio siemenestä (6 vaihtoehtoa).
            int p = (int)(Arpa(tynnyrikertoja, 92) * 6) % 6;
            int a = p / 2, b = (p % 2 == 0) ? (a + 1) % 3 : (a + 2) % 3, c = 3 - a - b;
            jarjestys[a] = 0; jarjestys[b] = 1; jarjestys[c] = 2;
            for (int k = 0; k < 3; k++)
            {
                tayttoAlku[k] = TayttoAlku + TayttoPorras * jarjestys[k] + Vali(-0.1, 0.1, tynnyrikertoja * 3 + k, 93);
                tayttoKesto[k] = TayttoS * Vali(0.85, 1.15, tynnyrikertoja * 3 + k, 94);
                kimallusVaihe[k] = Vali(0, Math.PI * 2, tynnyrikertoja * 3 + k, 95);
            }
        }

        void Aloita(Vaihe v, double k) { vaihe = v; aika = 0; kesto = k; }

        protected override void Askel(double d, bool heraa, bool tapahtuma, bool yo)
        {
            if (tapahtuma && tynnyrit < 0 && T - edellinenTynnyri >= NapautusValiS) AloitaTynnyrit();
            // Lähestyminen: merellä oleva lautta tulee heti.
            if (heraa && vaihe == Vaihe.Merella) aika = kesto;
            aika += d;
            if (aika >= kesto)
            {
                switch (vaihe)
                {
                    case Vaihe.Merella:
                        saapumisia++;
                        vauhti = Vali(0.9, 1.1, saapumisia, 96);
                        linja = Vali(-0.006, 0.006, saapumisia, 97);
                        kaanto = Arpa(saapumisia, 98) < 0.5 ? 1 : -1;
                        Aloita(Vaihe.Saapuu, SaapuuS / vauhti);
                        break;
                    case Vaihe.Saapuu: Aloita(Vaihe.Kaantyy, KaantyyS); break;
                    case Vaihe.Kaantyy: Aloita(Vaihe.Peruuttaa, PeruuttaaS); break;
                    case Vaihe.Peruuttaa:
                        matkoja++;
                        Aloita(Vaihe.Laiturissa, Vali(LaiturissaMinS, LaiturissaMaxS, matkoja, 99));
                        if (!yo && tynnyrit < 0 && Arpa(matkoja, 100) < Harvinainen) AloitaTynnyrit();
                        break;
                    case Vaihe.Laiturissa: Aloita(Vaihe.Lahtee, LahteeS / vauhti); break;
                    case Vaihe.Lahtee:
                        Aloita(Vaihe.Merella, Arpa(matkoja, 101) < PitkaTod ? Vali(PitkaMinS, PitkaMaxS, matkoja, 102) : Vali(MerellaMinS, MerellaMaxS, matkoja, 103));
                        break;
                }
            }
            bool liikkuu = PaivitaLautta(d);
            if (tynnyrit >= 0) { tynnyrit += d; liikkuu = true; if (tynnyrit > TynnyriS) tynnyrit = -1; }
            if (liikkuu && d > 0) Liikkuu = true;
        }

        /// <summary>Lautan asento vaiheen mukaan; palauttaa true, jos lautta liikkuu.</summary>
        bool PaivitaLautta(double d)
        {
            double u = Math.Min(1, aika / Math.Max(1e-6, kesto));
            double vx = 0, vz = 0;
            switch (vaihe)
            {
                case Vaihe.Merella:
                    skaala = 0; nopeus = 0; keinu = 0;
                    return false;
                case Vaihe.Saapuu:
                {
                    // Hermite: alkuvauhti 1,5 × keskivauhti, pysähtyy kääntöpaikalle (h(u) = −0,5u³ + 1,5u).
                    double h = -0.5 * u * u * u + 1.5 * u, dh = -1.5 * u * u + 1.5;
                    double L = KaantoX - AlkuX;
                    lx = AlkuX + L * h; vx = L * dh / kesto;
                    // Kulkulinjalta altaan linjalle viimeisellä 40 %:lla.
                    double w = (u - 0.6) / 0.4, s = Pehmea(w), ds = w > 0 && w < 1 ? 30 * w * w * (1 - w) * (1 - w) / 0.4 : 0;
                    double z0 = KulkuZ + linja;
                    lz = z0 + (AltaanZ - z0) * s; vz = (AltaanZ - z0) * ds / kesto;
                    psi = 180 - Math.Atan2(vz, Math.Max(1e-6, Math.Abs(vx))) * 180 / Math.PI;
                    skaala = Pehmea(aika / IlmestyyS);
                    break;
                }
                case Vaihe.Kaantyy:
                    lx = KaantoX; lz = AltaanZ; skaala = 1;
                    psi = 180 + kaanto * 180 * Pehmea(u);   // 180 → 0 tai 360 (sama asento)
                    break;
                case Vaihe.Peruuttaa:
                    lx = KaantoX + (LaituriX - KaantoX) * Pehmea(u); lz = AltaanZ; psi = 0; skaala = 1;
                    break;
                case Vaihe.Laiturissa:
                    lx = LaituriX; lz = AltaanZ; psi = 0; skaala = 1; nopeus = 0; keinu = 0;
                    return false;
                case Vaihe.Lahtee:
                {
                    // Peilattu saapuminen: lähtee levosta ja kiihtyy (1 − h(1 − u)).
                    double q = 1 - u, h = -0.5 * q * q * q + 1.5 * q, dh = -1.5 * q * q + 1.5;
                    double L = LaituriX - AlkuX;
                    lx = AlkuX + L * h; vx = -L * dh / kesto;
                    double w = u / 0.35, s = Pehmea(w), ds = w > 0 && w < 1 ? 30 * w * w * (1 - w) * (1 - w) / 0.35 : 0;
                    double z1 = KulkuZ + linja;
                    lz = AltaanZ + (z1 - AltaanZ) * s; vz = (z1 - AltaanZ) * ds / kesto;
                    psi = Math.Atan2(vz, Math.Max(1e-6, Math.Abs(vx))) * 180 / Math.PI;
                    skaala = 1 - Pehmea((aika - (kesto - IlmestyyS)) / IlmestyyS);
                    break;
                }
            }
            nopeus = Math.Sqrt(vx * vx + vz * vz);
            // Keinunta liikkeessä (vaimenee pysähtyessä): keulan ja perän välinen akseli pysyy vaakana, runko kallistuu kyljelle.
            double voima = Math.Min(1, nopeus / VanaVauhti + (vaihe == Vaihe.Kaantyy ? 0.6 * Math.Sin(Math.PI * u) : 0));
            keinu = KeinuAste * voima * Math.Sin(2 * Math.PI * T / KeinuS + keinuVaihe);
            return true;
        }

        /// <summary>Tynnyrin k vaihe: näkyvyys (skaala), pudotus (y) ja kullan nousu 0–1.</summary>
        double TynnyrinSkaala(int k, out double y)
        {
            y = 0;
            if (tynnyrit < 0) return 0;
            double t = tynnyrit - Porras * jarjestys[k];
            if (t <= 0) return 0;
            double p = Pehmea(t / PutoaaS);
            y = Pudotus * (1 - p);
            // Pieni pomppu laskeutuessa.
            double b = (t - PutoaaS) / 0.28;
            if (b > 0 && b < 1) y += 0.0035 * Math.Sin(Math.PI * b);
            return Pehmea(t / 0.3) * Loppu();
        }

        /// <summary>Loppu: kaikki pienenevät pois 6,0–7,2 s.</summary>
        double Loppu() => 1 - Pehmea((tynnyrit - LoppuAlku) / (TynnyriS - LoppuAlku));

        double Taytto(int k) => tynnyrit < 0 ? 0 : Pehmea((tynnyrit - tayttoAlku[k]) / tayttoKesto[k]);

        OsanAsento Tynnyri(int k)
        {
            double s = TynnyrinSkaala(k, out double y);
            return s <= 0.02 ? OsanAsento.Piilossa : new OsanAsento { Qw = 1, Y = y, Skaala = s };
        }

        OsanAsento Kulta(int k)
        {
            if (tynnyrit < 0 || tynnyrit < tayttoAlku[k]) return OsanAsento.Piilossa;
            double s = TynnyrinSkaala(k, out double y);
            double f = Taytto(k);
            // Kasa nousee pohjalta reunan yli ja kasvaa (0,7 → 1).
            double sk = s * (0.7 + 0.3 * f);
            return sk <= 0.02 ? OsanAsento.Piilossa : new OsanAsento { Qw = 1, Y = y - KultaSyvyys * (1 - f), Skaala = sk };
        }

        OsanAsento Kimallus(int k)
        {
            if (tynnyrit < 0) return OsanAsento.Piilossa;
            double f = Taytto(k);
            if (f < 0.6) return OsanAsento.Piilossa;
            // Syttyy kasan täyttyessä, sammuu ennen tynnyrien katoamista.
            double auki = Pehmea((f - 0.6) / 0.4) * (1 - Pehmea((tynnyrit - (LoppuAlku - 0.4)) / 0.6));
            double syke = 0.75 + 0.35 * Math.Sin(2 * Math.PI * 2.6 * tynnyrit + kimallusVaihe[k]);
            double sk = auki * syke;
            if (sk <= 0.02) return OsanAsento.Piilossa;
            double kulma = 200 * tynnyrit + kimallusVaihe[k] * 57.29578;
            return new OsanAsento { Y = 0.003 * Math.Sin(2 * Math.PI * 0.8 * tynnyrit + kimallusVaihe[k]), Skaala = sk }
                .Kierretty(OsanAsento.Kierto(0, 1, 0, kulma));
        }

        public override OsanAsento Asento(string osa)
        {
            switch (osa)
            {
                case "lautta":
                {
                    if (skaala <= 0.02) return OsanAsento.Piilossa;
                    var q = OsanAsento.Tulo(OsanAsento.Kierto(0, 1, 0, psi), OsanAsento.Kierto(1, 0, 0, keinu));
                    return new OsanAsento { X = lx - LaituriX, Z = lz - AltaanZ, Skaala = skaala }.Kierretty(q);
                }
                case "vana":
                {
                    // Vana vain eteenpäin liukuessa (ei käännöksessä eikä peruuttaessa).
                    double v = (vaihe == Vaihe.Saapuu || vaihe == Vaihe.Lahtee) ? Math.Min(1, nopeus / VanaVauhti) * skaala : 0;
                    if (v <= 0.03) return OsanAsento.Piilossa;
                    return new OsanAsento { X = lx - LaituriX, Z = lz - AltaanZ, Skaala = v }.Kierretty(OsanAsento.Kierto(0, 1, 0, psi));
                }
                case "lauttavalo":
                {
                    double v = Valo <= 0.001 ? 0 : Pehmea(Valo) * skaala;
                    if (v <= 0.02) return OsanAsento.Piilossa;
                    var q = OsanAsento.Tulo(OsanAsento.Kierto(0, 1, 0, psi), OsanAsento.Kierto(1, 0, 0, keinu));
                    return new OsanAsento { X = lx - LaituriX, Z = lz - AltaanZ, Skaala = v }.Kierretty(q);
                }
                case "tynnyri0": return Tynnyri(0);
                case "tynnyri1": return Tynnyri(1);
                case "tynnyri2": return Tynnyri(2);
                case "kulta0": return Kulta(0);
                case "kulta1": return Kulta(1);
                case "kulta2": return Kulta(2);
                case "kimallus0": return Kimallus(0);
                case "kimallus1": return Kimallus(1);
                case "kimallus2": return Kimallus(2);
                case "valot0": case "valot1": case "valot2": case "valot3": case "valot4":
                case "valot5": case "valot6": case "valot7": case "valot8":
                    return Valot();
                default: return OsanAsento.Lepo;
            }
        }

        public override string Tila() =>
            $"lautta {vaihe} x {lx:F2} z {lz:F3} ψ {psi:F0}° ({aika:F1}/{kesto:F1} s), matkoja {matkoja}, tynnyrikertoja {tynnyrikertoja}" +
            (tynnyrit >= 0 ? $", tynnyrit {tynnyrit:F1} s" : "");
    }
}
