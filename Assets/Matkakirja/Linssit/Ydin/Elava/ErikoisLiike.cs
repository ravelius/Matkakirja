// ERIKOISMALLIEN LIIKE (omistaja hyväksyi 22.0x; speksit docs/raportit/erikoismallit/, speksipohja kohta 0 ELÄMÄNIDEA):
// jokaisessa mallissa kolme kerrosta Tivolin logiikalla — perusliike (hidas, aina), harvinainen tapahtuma (noin joka
// kymmenes jakso) ja reaktio pelaajaan (kamera lähestyy → herää; löytö tai napautus → tapahtuma heti) — sekä valot yöllä.
// Puhdas C#: asennot osien nimillä (Natiivisepän LiikkuvaOsaMaaritys.Nimi), Unity-puoli (Linssit/Unity/ErikoismalliElavat)
// vain asettaa Transformit. Aikataulut ovat siemenellä toistettavia (noston id), joten liike ei toistu samana.
using System;

namespace Matkakirja.Linssit.Elava
{
    /// <summary>Osan asento lepoasennon (Pivot, identiteetti, skaala 1) suhteen mallin avaruudessa.</summary>
    public struct OsanAsento
    {
        /// <summary>Siirto lepopaikasta (mallin yksiköissä, +Y ylös, +Z pohjoinen).</summary>
        public double X, Y, Z;
        /// <summary>Kierto kvaterniona (w, x, y, z).</summary>
        public double Qw, Qx, Qy, Qz;
        /// <summary>Tasainen skaala pivotin ympäri (0 = piilossa).</summary>
        public double Skaala;

        public static OsanAsento Lepo => new OsanAsento { Qw = 1, Skaala = 1 };
        public static OsanAsento Piilossa => new OsanAsento { Qw = 1, Skaala = 0 };

        /// <summary>Kierto akselin (yksikkövektori) ympäri asteina.</summary>
        public static (double w, double x, double y, double z) Kierto(double ax, double ay, double az, double asteet)
        {
            double a = asteet * Math.PI / 360.0, s = Math.Sin(a);
            return (Math.Cos(a), ax * s, ay * s, az * s);
        }

        public static (double w, double x, double y, double z) Tulo((double w, double x, double y, double z) p, (double w, double x, double y, double z) q) =>
            (p.w * q.w - p.x * q.x - p.y * q.y - p.z * q.z,
             p.w * q.x + p.x * q.w + p.y * q.z - p.z * q.y,
             p.w * q.y - p.x * q.z + p.y * q.w + p.z * q.x,
             p.w * q.z + p.x * q.y - p.y * q.x + p.z * q.w);

        public OsanAsento Kierretty((double w, double x, double y, double z) q) { Qw = q.w; Qx = q.x; Qy = q.y; Qz = q.z; return this; }
    }

    /// <summary>Kehyksen syöte: liike 0–1 (vähennetty liike ja Staattinen → 0 pehmeästi), kamera lähellä, tapahtumapyyntö
    /// (löytö, napautus tai testikomento) ja yö kohteessa (aurinko alle −6°).</summary>
    public struct ErikoisSyote
    {
        public double Liike;
        public bool Lahella, Tapahtuma, Yo;
    }

    /// <summary>Yhden erikoismallin (noston) animaatio. Luo(avain, id) valitsee mallin; tuntematon avain = null (ei liikettä).</summary>
    public abstract class ErikoisAnimaatio
    {
        protected readonly int Siemen;
        /// <summary>Kulunut animaatioaika (s, liikkeellä kerrottuna).</summary>
        protected double T;
        bool olilahella;
        /// <summary>Yövalojen näkyvyys 0–1 (pehmeä 1,5 s:n syttyminen).</summary>
        protected double Valo;

        protected ErikoisAnimaatio(string id) { Siemen = ArkkiSiemen(id); }

        /// <summary>Jokin osa liikkuu tässä kehyksessä (elävä kerros käy), tai yövalo vaihtuu.</summary>
        public bool Liikkuu { get; protected set; }

        public static ErikoisAnimaatio Luo(string avain, string id) => avain switch
        {
            "mont-saint-michel" => new MontSaintMichelLiike(id),
            "stonehenge" => new StonehengeLiike(id),
            "colosseum" => new ColosseumLiike(id),
            "kinderdijk" => new KinderdijkLiike(id),
            "brandenburgin-portti" => new BrandenburginPorttiLiike(id),
            "segovian-akvedukti" => new SegovianAkveduktiLiike(id),
            _ => null,
        };

        /// <summary>Päivitys: dt seinäkellosta (s). Lähestymisen reuna (kauko → lähellä) herättää mallin.</summary>
        public void Paivita(double dt, ErikoisSyote s)
        {
            double d = Math.Max(0, Math.Min(0.1, dt)) * Math.Max(0, Math.Min(1, s.Liike));
            bool herää = s.Lahella && !olilahella;
            olilahella = s.Lahella;
            double valo0 = Valo;
            Valo = Math.Max(0, Math.Min(1, Valo + (s.Yo ? 1 : -1) * Math.Max(0, Math.Min(0.1, dt)) / 1.5));
            T += d;
            Liikkuu = false;
            Askel(d, herää, s.Tapahtuma, s.Yo);
            if (Valo != valo0) Liikkuu = true;
        }

        /// <summary>Mallikohtainen askel (d = tehollinen aika).</summary>
        protected abstract void Askel(double d, bool heraa, bool tapahtuma, bool yo);

        /// <summary>Osan asento nimellä; tuntematon nimi = lepo.</summary>
        public abstract OsanAsento Asento(string osa);

        /// <summary>Kokonaisasento testikomentoon ja lokiin.</summary>
        public abstract string Tila();

        // ---- yhteiset apurit ----

        /// <summary>Vakaa siemen tunnuksesta (FNV-1a).</summary>
        public static int ArkkiSiemen(string id)
        {
            unchecked
            {
                uint h = 2166136261;
                foreach (char c in id ?? "") { h ^= c; h *= 16777619; }
                return (int)(h & 0x7fffffff);
            }
        }

        /// <summary>Toistettava satunnaisluku 0–1 siemenestä ja järjestysnumerosta.</summary>
        protected double Arpa(int n, int kanava = 0)
        {
            unchecked
            {
                uint h = (uint)Siemen * 2654435761u ^ (uint)(n * 40503 + kanava * 9973 + 17);
                h ^= h >> 15; h *= 2246822519u; h ^= h >> 13; h *= 3266489917u; h ^= h >> 16;
                return (h & 0xffffff) / (double)0x1000000;
            }
        }

        protected double Vali(double a, double b, int n, int kanava = 0) => a + (b - a) * Arpa(n, kanava);

        /// <summary>Smootherstep 0–1 (nopeus ja kiihtyvyys nollassa päissä).</summary>
        protected static double Pehmea(double x)
        {
            x = Math.Max(0, Math.Min(1, x));
            return x * x * x * (x * (x * 6 - 15) + 10);
        }

        protected OsanAsento Valot() => Valo <= 0.001 ? OsanAsento.Piilossa : new OsanAsento { Qw = 1, Skaala = Pehmea(Valo) };
    }

    /// <summary>
    /// Mont-Saint-Michel: vuorovesi. Perusliike: vesi nousee (14 s) ja laskee (14 s), korkealla 20–40 s ja matalalla
    /// 30–90 s. Harvinainen (1/10 nousuista): kevätvuoksi — nousu 5 s ja vaahtoviiva kiertää saarta kohti, sen jälkeen
    /// Mikael-patsas hehkuu. Reaktio: lähestyttäessä matala vesi alkaa nousta; tapahtuma = kevätvuoksi heti.
    /// </summary>
    public sealed class MontSaintMichelLiike : ErikoisAnimaatio
    {
        /// <summary>Veden korkeus matalalla (hiekan alla) ja nousu (rannan yli); hiekka nousee reunalta (0) rantaan (0,009),
        /// joten vesiraja etenee reunalta saarta kohti. Vaahtoviivan keskisäde on 0,4825 ja ranta noin 0,39.</summary>
        public const double Matalalla = -0.002, Nousu = 0.013, HiekkaRanta = 0.009, NousuS = 14, KevatNousuS = 5, LaskuS = 14, PulssiS = 3;
        enum Vaihe { Matala, Nousee, Korkea, Laskee }
        Vaihe vaihe = Vaihe.Matala;
        double aika, kesto, alkuTaso, taso, pulssi = -1;
        int jakso;
        bool kevat;

        public MontSaintMichelLiike(string id) : base(id) { kesto = Vali(10, 60, 0); }

        /// <summary>Veden taso 0 (matala) – 1 (korkea).</summary>
        public double Taso => taso;
        public bool Kevat => kevat && vaihe == Vaihe.Nousee;

        void Aloita(Vaihe v, double k) { vaihe = v; aika = 0; kesto = k; alkuTaso = taso; }

        protected override void Askel(double d, bool heraa, bool tapahtuma, bool yo)
        {
            if (tapahtuma && !(kevat && vaihe == Vaihe.Nousee)) { kevat = true; Aloita(Vaihe.Nousee, KevatNousuS); }
            else if (heraa && vaihe == Vaihe.Matala) { kevat = Arpa(jakso, 1) < 0.1; Aloita(Vaihe.Nousee, kevat ? KevatNousuS : NousuS); }
            aika += d;
            if (aika >= kesto)
            {
                switch (vaihe)
                {
                    case Vaihe.Matala: jakso++; kevat = Arpa(jakso, 1) < 0.1; Aloita(Vaihe.Nousee, kevat ? KevatNousuS : NousuS); break;
                    case Vaihe.Nousee: taso = 1; if (kevat) pulssi = 0; Aloita(Vaihe.Korkea, Vali(20, 40, jakso, 2)); break;
                    case Vaihe.Korkea: kevat = false; Aloita(Vaihe.Laskee, LaskuS); break;
                    case Vaihe.Laskee: taso = 0; Aloita(Vaihe.Matala, Vali(30, 90, jakso, 3)); break;
                }
            }
            double p = Pehmea(aika / Math.Max(1e-6, kesto));
            if (vaihe == Vaihe.Nousee) { taso = alkuTaso + (1 - alkuTaso) * p; Liikkuu = true; }
            else if (vaihe == Vaihe.Laskee) { taso = alkuTaso * (1 - p); Liikkuu = true; }
            if (pulssi >= 0) { pulssi += d; Liikkuu = true; if (pulssi > PulssiS) pulssi = -1; }
        }

        public override OsanAsento Asento(string osa)
        {
            switch (osa)
            {
                case "vesi": return new OsanAsento { Qw = 1, Skaala = 1, Y = Matalalla + Nousu * taso };
                case "vaahto":
                {
                    if (!(kevat && vaihe == Vaihe.Nousee)) return OsanAsento.Piilossa;
                    // Vesiraja hiekkakartiolla: korkeus y peittää säteeseen 0,5 − 0,11 · y / ranta asti.
                    double y = Matalalla + Nousu * taso;
                    double raja = 0.5 - 0.11 * Math.Max(0, Math.Min(1, y / HiekkaRanta));
                    if (y < 0) return OsanAsento.Piilossa;
                    return new OsanAsento { Qw = 1, Skaala = raja / 0.4825, Y = y + 0.0004 };
                }
                case "patsas": return new OsanAsento { Qw = 1, Skaala = pulssi >= 0 ? 1 + 0.45 * Math.Sin(Math.PI * pulssi / PulssiS) : 1 };
                case "valot": return Valot();
                default: return OsanAsento.Lepo;
            }
        }

        public override string Tila() => $"vuorovesi {vaihe} {taso:F2} ({aika:F0}/{kesto:F0} s){(kevat ? ", kevätvuoksi" : "")}, jakso {jakso}";
    }

    /// <summary>
    /// Stonehenge: perusliike = kolme lammasta laiduntaa (syö 15–40 s, kävelee 3–6 s, kääntyy takaisin laitumelle), aina. Harvinainen:
    /// auringonnousu kantapääkiven takaa ja kultainen säde kehän läpi (26 s, 90–240 s:n välein noin kerran kymmenessä
    /// lammasjaksossa). Reaktio: lähestyttäessä lampaat nostavat päänsä; tapahtuma = auringonnousu heti (ei yöllä).
    /// Yöllä kuu näkyy ja aurinko ei nouse.
    /// </summary>
    public sealed class StonehengeLiike : ErikoisAnimaatio
    {
        public const double NousuS = 26, AuringonMatka = 0.11;
        /// <summary>Juhannusakselin atsimuutti (°) ja kantapääkiven suunta.</summary>
        public const double Akseli = 50;

        sealed class Lammas
        {
            public double X, Z, Suunta, Nokka, Aika, Kesto;
            public int Tila, N;   // 0 syö, 1 kävelee, 2 kääntyy
            public double KaannosAlku, KaannosLoppu;
        }
        readonly Lammas[] lampaat = new Lammas[3];
        double seuraava, nousu = -1, katse;

        public StonehengeLiike(string id) : base(id)
        {
            for (int i = 0; i < 3; i++)
                lampaat[i] = new Lammas { Suunta = Vali(0, 360, i, 7), Kesto = Vali(5, 30, i, 8) };
            seuraava = Vali(60, 180, 0, 9);
        }

        public bool Nousee => nousu >= 0;

        protected override void Askel(double d, bool heraa, bool tapahtuma, bool yo)
        {
            if (heraa) katse = 2.5;
            if (katse > 0) { katse = Math.Max(0, katse - d); Liikkuu = true; }
            // Auringonnousu: ajastettu tai tapahtumasta, ei yöllä.
            if (nousu < 0 && !yo)
            {
                seuraava -= d;
                if (tapahtuma || seuraava <= 0) { nousu = 0; seuraava = Vali(90, 240, (int)T, 10); }
            }
            if (nousu >= 0) { nousu += d; Liikkuu = true; if (nousu > NousuS) nousu = -1; }
            for (int i = 0; i < 3; i++)
            {
                var l = lampaat[i];
                l.Aika += d;
                if (l.Aika >= l.Kesto)
                {
                    l.Aika = 0; l.N++;
                    double etaisyys = Math.Sqrt(l.X * l.X + l.Z * l.Z);
                    // Syönti → kävely (tai käännös, jos lammas on liian kaukana lepopaikastaan tai joka kolmas kerta).
                    if (l.Tila == 0 && (etaisyys > 0.025 || l.N % 3 == 0))
                    {
                        l.Tila = 2; l.Kesto = 1.6; l.KaannosAlku = l.Suunta;
                        double kohti = Math.Atan2(-l.X, -l.Z) * 180 / Math.PI;
                        l.KaannosLoppu = etaisyys > 0.025 ? kohti : l.Suunta + Vali(-110, 110, l.N + i * 97, 11);
                    }
                    else if (l.Tila == 0 || l.Tila == 2) { l.Tila = 1; l.Kesto = Vali(3, 6, l.N + i * 97, 12); }
                    else { l.Tila = 0; l.Kesto = Vali(15, 40, l.N + i * 97, 13); }
                }
                if (l.Tila == 1)
                {
                    double v = 0.004 * Pehmea(Math.Min(l.Aika, l.Kesto - l.Aika) / 0.8);
                    double a = l.Suunta * Math.PI / 180;
                    l.X += Math.Sin(a) * v * d; l.Z += Math.Cos(a) * v * d;
                    Liikkuu = true;
                }
                else if (l.Tila == 2)
                {
                    l.Suunta = l.KaannosAlku + (l.KaannosLoppu - l.KaannosAlku) * Pehmea(l.Aika / l.Kesto);
                    Liikkuu = true;
                }
                // Pää alhaalla syödessä (8°), ylhäällä kävellessä; lähestyttäessä katse ylös (−14°).
                double tavoite = katse > 0 ? -14 : l.Tila == 0 ? 8 : 0;
                double ennen = l.Nokka;
                l.Nokka += (tavoite - l.Nokka) * Math.Min(1, d * 3);
                if (Math.Abs(l.Nokka - ennen) > 1e-3) Liikkuu = true;
            }
        }

        public override OsanAsento Asento(string osa)
        {
            switch (osa)
            {
                case "lammas1": case "lammas2": case "lammas3":
                {
                    var l = lampaat[osa[6] - '1'];
                    var q = OsanAsento.Tulo(OsanAsento.Kierto(0, 1, 0, l.Suunta), OsanAsento.Kierto(1, 0, 0, l.Nokka));
                    return new OsanAsento { X = l.X, Z = l.Z, Skaala = 1 }.Kierretty(q);
                }
                case "aurinko":
                {
                    if (nousu < 0) return OsanAsento.Piilossa;
                    double y = -0.04 + AuringonMatka * Pehmea(nousu / 8);
                    double s = 1 - Pehmea((nousu - (NousuS - 4)) / 4);
                    return new OsanAsento { Qw = 1, Y = y, Skaala = Math.Max(0, s) };
                }
                case "sade":
                {
                    if (nousu < 3) return OsanAsento.Piilossa;
                    double s = Pehmea((nousu - 3) / 8) * (1 - Pehmea((nousu - (NousuS - 4)) / 4));
                    return s <= 0.001 ? OsanAsento.Piilossa : new OsanAsento { Qw = 1, Skaala = s };
                }
                case "kuu": return Valot();
                default: return OsanAsento.Lepo;
            }
        }

        public override string Tila() =>
            $"lampaat {string.Join("/", Array.ConvertAll(lampaat, l => l.Tila == 0 ? "syö" : l.Tila == 1 ? "kävelee" : "kääntyy"))}" +
            (nousu >= 0 ? $", aurinko nousee {nousu:F0}/{NousuS:F0} s" : $", seuraava auringonnousu {seuraava:F0} s");
    }

    /// <summary>
    /// Colosseum: perusliike = pääskyparvi nousee, kaartelee pohjoisseinän yllä (10 s/kierros, 15–25 s) ja laskeutuu
    /// (tauko 30–60 s). Harvinainen (1/8 parven lennoista): velarium avautuu aaltona sektori kerrallaan (porrastus
    /// 0,4 s, 1,6 s/sektori), pysyy auki 30–60 s ja sulkeutuu samassa järjestyksessä. Reaktio: lähestyttäessä parvi nousee;
    /// tapahtuma = velarium heti. Yöllä kaaret valaistaan.
    /// </summary>
    public sealed class ColosseumLiike : ErikoisAnimaatio
    {
        public const int Sektoreita = 16;
        public const double Porrastus = 0.4, SektoriS = 1.6, KierrosS = 10;
        double parviAika, parviKesto, parviKulma, velarium = -1, velariumAuki;
        int parviTila, lento;   // 0 lepää, 1 nousee, 2 lentää, 3 laskeutuu

        public ColosseumLiike(string id) : base(id) { parviKesto = Vali(5, 30, 0, 20); }

        double AvausS => (Sektoreita - 1) * Porrastus + SektoriS;
        public bool VelariumKaynnissa => velarium >= 0;

        protected override void Askel(double d, bool heraa, bool tapahtuma, bool yo)
        {
            if (heraa && parviTila == 0) { parviTila = 1; parviAika = 0; parviKesto = 1.5; }
            if (tapahtuma && velarium < 0) { velarium = 0; velariumAuki = Vali(30, 60, lento, 21); }
            parviAika += d;
            if (parviAika >= parviKesto)
            {
                parviAika = 0;
                switch (parviTila)
                {
                    case 0: parviTila = 1; parviKesto = 1.5; break;
                    case 1: parviTila = 2; parviKesto = Vali(15, 25, lento, 22); break;
                    case 2: parviTila = 3; parviKesto = 1.5; break;
                    case 3:
                        parviTila = 0; parviKesto = Vali(30, 60, lento, 23); lento++;
                        if (velarium < 0 && Arpa(lento, 24) < 0.125) { velarium = 0; velariumAuki = Vali(30, 60, lento, 21); }
                        break;
                }
            }
            if (parviTila != 0) { parviKulma += d * 360 / KierrosS; Liikkuu = true; }
            if (velarium >= 0)
            {
                velarium += d;
                double loppu = AvausS * 2 + velariumAuki;
                bool liikkuu = velarium < AvausS || velarium > AvausS + velariumAuki;
                if (liikkuu) Liikkuu = true;
                if (velarium > loppu) velarium = -1;
            }
        }

        /// <summary>Sektorin s avautuminen 0–1 (aalto auki, auki pysyminen, aalto kiinni samassa järjestyksessä).</summary>
        public double Sektori(int s)
        {
            if (velarium < 0) return 0;
            double auki = Pehmea((velarium - s * Porrastus) / SektoriS);
            double kiinni = Pehmea((velarium - AvausS - velariumAuki - s * Porrastus) / SektoriS);
            return auki * (1 - kiinni);
        }

        public override OsanAsento Asento(string osa)
        {
            if (osa.StartsWith("velarium", StringComparison.Ordinal) && int.TryParse(osa.Substring(8), out int s))
            {
                double a = Sektori(s);
                return a <= 0.02 ? OsanAsento.Piilossa : new OsanAsento { Qw = 1, Skaala = a };
            }
            switch (osa)
            {
                case "parvi":
                {
                    double skaala = parviTila == 0 ? 0 : parviTila == 1 ? Pehmea(parviAika / parviKesto) : parviTila == 3 ? 1 - Pehmea(parviAika / parviKesto) : 1;
                    if (skaala <= 0.001) return OsanAsento.Piilossa;
                    double y = 0.012 * Math.Sin(parviKulma * Math.PI / 180 * 1.7);
                    return new OsanAsento { Y = y, Skaala = skaala }.Kierretty(OsanAsento.Kierto(0, 1, 0, parviKulma));
                }
                case "valot": return Valot();
                default: return OsanAsento.Lepo;
            }
        }

        public override string Tila() =>
            $"parvi {(parviTila == 0 ? "lepää" : parviTila == 1 ? "nousee" : parviTila == 2 ? "lentää" : "laskeutuu")} ({parviAika:F0}/{parviKesto:F0} s)" +
            (velarium >= 0 ? $", velarium {velarium:F0} s" : "") + $", lentoja {lento}";
    }
}
