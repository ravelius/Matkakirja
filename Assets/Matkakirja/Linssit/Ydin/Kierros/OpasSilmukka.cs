// ELÄVÄ OPAS (omistaja 5.10.2026 klo 17.5x, Päätoimittaja; Linssiseppä): Sonnet valitsee paikat ja kirjoittaa kerronnan
// reaaliajassa Pulun workerissa (Pelikoodari), William puhuu, ja kamera lentää ajonaikaisesti mihin tahansa maapallolla.
// Pelaajan toive (Pulu-chatin syöttökenttä, iPhonen sanelu) keskeyttää. Tämä on moottoriton osa: kohteen kehystys, lento
// kahden asennon välillä (kaupungin sisällä kaarella, kauas isoympyrää pitkin ylhäältä) ja silmukan tila.
//
// SILMUKKA: Pyyda(ensimmäinen) → Odota → Lento → Saapuu (ääni alkaa; heti pyyntö seuraavasta = esihaku) → Puhuu → (ääni loppui
// ja seuraava valmis) → Lento → … Toive: keskeneräinen esihaku hylätään, puhe katkeaa ja pyydetään toiveen mukainen kohde.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Kierros
{
    /// <summary>Workerin vastaus: yksi oppaan kohde (Pelikoodarin rajapinta /opas/seuraava).</summary>
    public sealed class OpasKohde
    {
        public string Id, Nimi, Alarivi, Teksti, Aani;
        public double Lat, Lon, KokoM = 60, KorkeusM, KestoS;
        /// <summary>Workerin kysymys (tyyppi "kysymys"): opas kysyy ääneen, vaihtoehdot chattiin; ei sijaintia.</summary>
        public bool Kysymys;
        public string[] Vaihtoehdot;

        public static OpasKohde Lue(IDictionary<string, object> j)
        {
            if (j == null) return null;
            string S(string k) => j.TryGetValue(k, out var v) ? v as string : null;
            double D(string k, double o) => j.TryGetValue(k, out var v) && v != null ? Convert.ToDouble(v, System.Globalization.CultureInfo.InvariantCulture) : o;
            if (S("tyyppi") == "kysymys")
            {
                var vaihtoehdot = new List<string>();
                if (j.TryGetValue("vaihtoehdot", out var vo) && vo is IList<object> lista) foreach (var x in lista) if (x is string t && t.Length > 0) vaihtoehdot.Add(t);
                return string.IsNullOrEmpty(S("teksti")) ? null : new OpasKohde { Kysymys = true, Teksti = S("teksti"), Aani = S("aani"), KestoS = D("kesto_s", 0), Vaihtoehdot = vaihtoehdot.ToArray() };
            }
            var k = new OpasKohde
            {
                Id = S("id"), Nimi = S("nimi"), Alarivi = S("alarivi"), Teksti = S("teksti"), Aani = S("aani"),
                Lat = D("lat", double.NaN), Lon = D("lon", double.NaN), KokoM = D("koko_m", 60), KorkeusM = D("korkeus_m", 0), KestoS = D("kesto_s", 0),
            };
            if (j.TryGetValue("vaihtoehdot", out var pv) && pv is IList<object> pl)
            {
                var v = new List<string>();
                foreach (var x in pl) if (x is string t && t.Length > 0) v.Add(t);
                k.Vaihtoehdot = v.ToArray();
            }
            if (string.IsNullOrEmpty(k.Nimi) || double.IsNaN(k.Lat) || double.IsNaN(k.Lon) || Math.Abs(k.Lat) > 90 || Math.Abs(k.Lon) > 180) return null;
            return k;
        }
    }

    public enum OpasVaihe { Alku, Odottaa, Lentaa, Puhuu, Valmis }

    public sealed class OpasSilmukka
    {
        /// <summary>Kehystys: etäisyys = koko × kerroin + lisä (rajattuna), kallistus pystystä, katse nostetaan osuuteen korkeudesta.</summary>
        public const double KokoKerroin = 3.0, KokoLisaM = 150, EtaisyysMinM = 220, EtaisyysMaxM = 1600, Kallistus = 62, KatseOsuus = 0.45;
        /// <summary>Lennon kesto: kaupungissa per km, kauas logaritmisesti; rajat.</summary>
        public const double LentoMinS = 7, LentoMaxS = 22;
        /// <summary>Puheen jälkeen tauko ennen lentoa (s) ja kierto pysähdyksessä (°/s).</summary>
        public const double TaukoS = 0.8, KiertoAsteS = 0.6;
        /// <summary>Esihaun ja toiveen vastauksen enimmäisodotus (s), jonka jälkeen silmukka pyytää uudelleen.</summary>
        public const double VastausMaxS = 25;

        public OpasVaihe Vaihe { get; private set; } = OpasVaihe.Alku;
        public OpasKohde Nykyinen { get; private set; }
        public OpasKohde Seuraava { get; private set; }
        public Pysahdys NykyinenKehys { get; private set; }
        public Kuvakulma Asento { get; private set; }
        public double VaiheAika { get; private set; }
        public double LentoKestoS { get; private set; }
        /// <summary>Lähtevä pyyntö: toive (tai null) — sovitin lähettää workerille. Palauttaa pyynnön järjestysnumeron.</summary>
        public event Action<int, string> Pyyda;
        /// <summary>Saapui kohteeseen: sovitin aloittaa äänen ja näyttää nimen.</summary>
        public event Action<OpasKohde> Saapui;
        /// <summary>Puhe katkaistava (toive keskeytti).</summary>
        public event Action Hiljenna;
        /// <summary>Workerin kysymys: sovitin soittaa sen ja näyttää vaihtoehdot chatissa; vastaus tulee Toive-kutsuna.</summary>
        public event Action<OpasKohde> Kysyy;
        /// <summary>Kysymykseen ei vastattu: oma valinta tämän jälkeen (s puheen lopusta).</summary>
        public const double KysymysOdotusS = 15;
        /// <summary>Kysymys odottaa vastausta (esihakua ei tehdä).</summary>
        public bool OdottaaVastausta { get; private set; }
        double kysymysAika = -1;
        string kysymysOletus;

        readonly HashSet<string> nahdyt = new HashSet<string>(StringComparer.Ordinal);
        int pyynto, odotettu;
        double odotusAlku, kierto;
        bool aaniLoppui;
        Kuvakulma lahto;
        Pysahdys kohdeKehys;
        string toive;

        public OpasSilmukka(Kuvakulma alku) { Asento = alku; }

        public IEnumerable<string> Nahdyt => nahdyt;

        /// <summary>Kehys kohteelle: katsesuunta tulosuunnasta (kamera jatkaa eteenpäin), maaston korkeus ellipsoidista.</summary>
        public static Pysahdys Kehysta(OpasKohde k, double maaM, double tulosuunta)
        {
            double et = Math.Max(EtaisyysMinM, Math.Min(EtaisyysMaxM, k.KokoM * KokoKerroin + KokoLisaM));
            double nosto = Math.Min(60, Math.Max(5, (k.KorkeusM > 0 ? k.KorkeusM : k.KokoM * 0.3) * KatseOsuus));
            return new Pysahdys
            {
                Id = k.Id ?? k.Nimi, Nimi = k.Nimi, Alarivi = k.Alarivi, Teksti = k.Teksti, Lat = k.Lat, Lon = k.Lon, MaaM = maaM, NostoM = nosto,
                Suuntima = KierrosLento.Kiedo(tulosuunta), Kallistus = Kallistus, EtaisyysM = et,
            };
        }

        /// <summary>Suuntima pisteestä a pisteeseen b (astetta pohjoisesta).</summary>
        public static double Suunta(double lat1, double lon1, double lat2, double lon2)
        {
            double r = Math.PI / 180, f1 = lat1 * r, f2 = lat2 * r, dl = (lon2 - lon1) * r;
            double y = Math.Sin(dl) * Math.Cos(f2), x = Math.Cos(f1) * Math.Sin(f2) - Math.Sin(f1) * Math.Cos(f2) * Math.Cos(dl);
            return Math.Atan2(y, x) / r;
        }

        /// <summary>Lennon kesto matkasta: 7 s naapurikortteliin, ~11 s kaupungin halki, ~18 s mantereen yli, enintään 22 s.</summary>
        public static double LennonKesto(double matkaM)
        {
            double km = matkaM / 1000.0;
            double s = km < 10 ? 6.5 + 0.55 * km : 12 + 2.2 * Math.Log10(km / 10.0) * 2.0;
            return Math.Max(LentoMinS, Math.Min(LentoMaxS, s));
        }

        /// <summary>Käynnistys: ensimmäinen pyyntö (alkutoive, esim. "Kööpenhamina").</summary>
        public void Aloita(string alkutoive)
        {
            toive = alkutoive;
            UusiPyynto();
        }

        /// <summary>Pelaajan toive: hylkää esihaun, katkaisee puheen ja pyytää toiveen mukaisen kohteen.</summary>
        public void Toive(string teksti)
        {
            if (string.IsNullOrWhiteSpace(teksti) || Vaihe == OpasVaihe.Valmis) return;
            toive = teksti.Trim();
            Seuraava = null;
            OdottaaVastausta = false; kysymysAika = -1;
            if (Vaihe == OpasVaihe.Puhuu) Hiljenna?.Invoke();
            aaniLoppui = true;
            UusiPyynto();
        }

        /// <summary>Paikan vaihto valikosta (Natiivi-UI OpasValikko): kuten toive ilman tekstiä, nähdyt tyhjennetään.</summary>
        public void VaihdaPaikka()
        {
            if (Vaihe == OpasVaihe.Valmis) return;
            nahdyt.Clear();
            toive = null;
            Seuraava = null;
            OdottaaVastausta = false; kysymysAika = -1;
            if (Vaihe == OpasVaihe.Puhuu) Hiljenna?.Invoke();
            aaniLoppui = true;
            UusiPyynto();
        }

        void UusiPyynto()
        {
            pyynto++;
            odotettu = pyynto;
            odotusAlku = -1;
            Pyyda?.Invoke(pyynto, toive);
            toive = null;
        }

        /// <summary>Workerin vastaus pyyntöön n (vanhat hylätään). null = virhe: pyydetään uudelleen seuraavalla päivityksellä.</summary>
        public void Vastaus(int n, OpasKohde k)
        {
            if (n != odotettu) return;
            odotettu = 0;
            if (k == null) { virhe = true; return; }
            if (k.Kysymys)
            {
                // Kysymys ei liikuta kameraa: opas kysyy, ja pelaajan valinta (chat) tulee Toive-kutsuna.
                OdottaaVastausta = true; kysymysAika = 0;
                kysymysOletus = k.Vaihtoehdot != null && k.Vaihtoehdot.Length > 0 ? k.Vaihtoehdot[0] : null;
                Kysyy?.Invoke(k);
                return;
            }
            Seuraava = k;
        }
        bool virhe;

        /// <summary>Puhe loppui (tai sitä ei voitu soittaa).</summary>
        public void AaniLoppui() => aaniLoppui = true;

        /// <summary>
        /// Kerran kehyksessä. aika = monotoninen s; maaKorkeus(kohde) palauttaa maaston korkeuden ellipsoidista (tai NaN,
        /// jolloin käytetään arviota). Palauttaa true, kun kamera on uudessa asennossa (Asento).
        /// </summary>
        public void Paivita(double dt, Func<OpasKohde, double> maaKorkeus)
        {
            if (Vaihe == OpasVaihe.Valmis) return;
            VaiheAika += Math.Max(0, dt);
            if (odotettu != 0) { if (odotusAlku < 0) odotusAlku = 0; odotusAlku += dt; if (odotusAlku > VastausMaxS) { odotettu = 0; virhe = true; } }
            if (virhe) { virhe = false; UusiPyynto(); }
            // Vastaamaton kysymys (simu 18.39: worker kysyi saman 9 kertaa): opas valitsee itse ensimmäisen vaihtoehdon.
            if (OdottaaVastausta && aaniLoppui) { kysymysAika += dt; if (kysymysAika > KysymysOdotusS) { OdottaaVastausta = false; toive = kysymysOletus ?? "Valitse sinä paikka"; UusiPyynto(); } }

            switch (Vaihe)
            {
                case OpasVaihe.Alku:
                case OpasVaihe.Odottaa:
                    if (NykyinenKehys != null) { kierto += KiertoAsteS * dt; Asento = KehysAsento(NykyinenKehys, kierto); }
                    if (Seuraava != null && aaniLoppuiTaiAlku()) AloitaLento(maaKorkeus);
                    break;
                case OpasVaihe.Puhuu:
                    kierto += KiertoAsteS * dt;
                    Asento = KehysAsento(NykyinenKehys, kierto);
                    if (aaniLoppui && VaiheAika >= TaukoS && Seuraava != null) AloitaLento(maaKorkeus);
                    else if (aaniLoppui && Seuraava == null && odotettu == 0) { Vaihe = OpasVaihe.Odottaa; VaiheAika = 0; }
                    break;
                case OpasVaihe.Lentaa:
                {
                    double t = Math.Min(1, VaiheAika / LentoKestoS);
                    Asento = Lennossa(lahto, KehysAsento(kohdeKehys, 0), t);
                    if (t >= 1)
                    {
                        NykyinenKehys = kohdeKehys; kierto = 0;
                        Vaihe = OpasVaihe.Puhuu; VaiheAika = 0; aaniLoppui = false;
                        if (Nykyinen.Id != null) nahdyt.Add(Nykyinen.Id);
                        Saapui?.Invoke(Nykyinen);
                        if (!OdottaaVastausta) UusiPyynto();   // esihaku puheen ajaksi
                    }
                    break;
                }
            }
        }

        bool aaniLoppuiTaiAlku() => Vaihe == OpasVaihe.Alku || aaniLoppui;

        void AloitaLento(Func<OpasKohde, double> maaKorkeus)
        {
            var k = Seuraava; Seuraava = null;
            // "Kerro lisää" (Pelikoodari #4009): sama paikka uudelleen → kamera jää kiertämään, kappale alkaa heti.
            if (NykyinenKehys != null && KierrosLento.EtaisyysM(NykyinenKehys.Lat, NykyinenKehys.Lon, k.Lat, k.Lon) < 50)
            {
                Nykyinen = k;
                Vaihe = OpasVaihe.Puhuu; VaiheAika = 0; aaniLoppui = false;
                Saapui?.Invoke(k);
                if (!OdottaaVastausta) UusiPyynto();
                return;
            }
            double maa = maaKorkeus?.Invoke(k) ?? double.NaN;
            if (double.IsNaN(maa)) maa = 45;
            double tulo = Suunta(Asento.Lat, Asento.Lon, k.Lat, k.Lon);
            if (KierrosLento.EtaisyysM(Asento.Lat, Asento.Lon, k.Lat, k.Lon) < 150) tulo = Asento.Suuntima;
            kohdeKehys = Kehysta(k, maa, tulo);
            Nykyinen = k;
            lahto = Asento;
            LentoKestoS = LennonKesto(KierrosLento.EtaisyysM(lahto.Lat, lahto.Lon, k.Lat, k.Lon));
            Vaihe = OpasVaihe.Lentaa; VaiheAika = 0;
        }

        public static Kuvakulma KehysAsento(Pysahdys p, double kierto) =>
            new Kuvakulma(p.Lat, p.Lon, p.EtaisyysM, p.Kallistus, KierrosLento.Kiedo(p.Suuntima + kierto), p.KatseKorkeusM);

        /// <summary>
        /// Lento kahden asennon välillä: lyhyt matka kuten kierroksessa (kaari), pitkä isoympyrää pitkin ja etäisyys nousee
        /// keskellä niin, että koko matka mahtuu kuvaan (kallistus kohti pystyä), jolloin laattoja ei tarvita reitin varrelta.
        /// </summary>
        public static Kuvakulma Lennossa(Kuvakulma a, Kuvakulma b, double t)
        {
            t = Math.Max(0, Math.Min(1, t));
            double matka = KierrosLento.EtaisyysM(a.Lat, a.Lon, b.Lat, b.Lon), s = KierrosLento.Smootherstep(t);
            if (matka < 20000)
            {
                double kaari = Math.Min(KierrosLento.KaariMaxM * 2, KierrosLento.KaariOsuus * matka) * Math.Sin(Math.PI * t);
                return KierrosLento.Valissa(a, b, s, kaari);
            }
            Isoympyra(a.Lat, a.Lon, b.Lat, b.Lon, s, out double lat, out double lon);
            double h = Math.Sin(Math.PI * t), kork = Math.Min(4e6, 0.9 * matka) * h;
            double ds = KierrosLento.Kiedo(b.Suuntima - a.Suuntima);
            double kall = a.Kallistus + (b.Kallistus - a.Kallistus) * s;
            kall = kall + (10 - kall) * h;   // keskellä lähes suoraan alas
            return new Kuvakulma(lat, lon, a.EtaisyysM + (b.EtaisyysM - a.EtaisyysM) * s + kork, kall, KierrosLento.Kiedo(a.Suuntima + ds * s),
                a.KatseKorkeusM + (b.KatseKorkeusM - a.KatseKorkeusM) * s);
        }

        /// <summary>Isoympyrän piste osuudella f (slerp yksikkövektoreilla).</summary>
        public static void Isoympyra(double lat1, double lon1, double lat2, double lon2, double f, out double lat, out double lon)
        {
            double r = Math.PI / 180;
            double x1 = Math.Cos(lat1 * r) * Math.Cos(lon1 * r), y1 = Math.Cos(lat1 * r) * Math.Sin(lon1 * r), z1 = Math.Sin(lat1 * r);
            double x2 = Math.Cos(lat2 * r) * Math.Cos(lon2 * r), y2 = Math.Cos(lat2 * r) * Math.Sin(lon2 * r), z2 = Math.Sin(lat2 * r);
            double d = Math.Acos(Math.Max(-1, Math.Min(1, x1 * x2 + y1 * y2 + z1 * z2)));
            double A = d < 1e-9 ? 1 - f : Math.Sin((1 - f) * d) / Math.Sin(d), B = d < 1e-9 ? f : Math.Sin(f * d) / Math.Sin(d);
            double x = A * x1 + B * x2, y = A * y1 + B * y2, z = A * z1 + B * z2;
            lat = Math.Atan2(z, Math.Sqrt(x * x + y * y)) / r;
            lon = Math.Atan2(y, x) / r;
        }
    }
}
