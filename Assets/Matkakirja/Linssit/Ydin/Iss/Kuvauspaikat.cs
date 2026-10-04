// TARKKA ISS-KUVA KUVAUSPAIKOILLA (omistaja 4.10.2026 klo 11.44: "Kameranappi tekee VAIN tarkan ISS-kuvan ... Nappi on aktiivinen
// vain kuvauspaikan kohdalla"; Karttasepän kuvauspaikat: 25 Euroopan kohdetta, kukin 2048² jpg 20 × 20 km kesämediaanista,
// ylin rivi pohjoinen, pikselit tasavälein lon/lat-bboxissa). Aineisto: kuvauspaikat.json ({"paikat": [...]}) tai yksittäinen
// paikka-olio. Kuvausehto: Cupolan katsepiste enintään KuvausKm (150 km) kuvauspaikan keskipisteestä. Kuvan rajaus (Rajaus): kamera ISS:ssä
// katsoo keskipisteeseen ja kenttä niin, että kuva pysyy kuvauspaikan sisällä (vino katse venyttää maan pystysuunnassa).
// Puhdas C#: Linssit-testit KuvauspaikatTestit.
using System;
using System.Collections.Generic;
using System.Globalization;

namespace Matkakirja.Linssit.Iss
{
    public sealed class Kuvauspaikka
    {
        public string Tunniste, Nimi, Maa, NimiLcd, MaaLcd, Kuva, Lahde;
        public double Lat, Lon, W, S, E, N, KokoM = 20_000, MPx;
        public int Px;
    }

    public static class Kuvauspaikat
    {
        /// <summary>
        /// Katsepisteen enimmäisetäisyys kuvauspaikan keskipisteestä (km), jotta kameranappi on aktiivinen. 150 km: alus kulkee
        /// 7,7 km/s, joten 15 km:n säteellä nappi olisi ollut aktiivinen vain ~4 s; 150 km:llä ~40 s. Kuva rajataan silti ISS:ltä
        /// paikan keskipisteeseen (Rajaus), joten katseen ei tarvitse osua tarkasti.
        /// </summary>
        public static double KuvausKm = 150;
        /// <summary>Kuvan osuus kuvauspaikan koosta lyhyemmällä sivulla (reunaan jää varaa, ettei aineiston ulkopuoli näy).</summary>
        public const double RajausOsuus = 0.9;
        /// <summary>Kuvauspaikan zeniittikulman yläraja (°): loivemmin näkyvä paikka kuvataan COG-polulla (horisontti ja usva).</summary>
        public const double MaxKallistus = 60;
        /// <summary>Vinon kuvan epäsymmetrian varmuuskerroin rajaukseen.</summary>
        public const double Varmuus = 0.95;
        /// <summary>Ämpärin juuri (Karttaseppä 4.10.): kuva-kentän suhteellinen polku (kuvauspaikat/v1/<tunniste>.jpg) lisätään tähän.</summary>
        public const string Juuri = "https://media.matkakirja.app/linssit/astronautin-kamera/";

        /// <summary>Ladattu aineisto (Unity täyttää); tyhjä = ei kuvauspaikkoja, nappi ei koskaan aktiivinen.</summary>
        public static List<Kuvauspaikka> Nykyiset = new List<Kuvauspaikka>();

        public static List<Kuvauspaikka> Jasenna(string json)
        {
            var r = new List<Kuvauspaikka>();
            var juuri = Matkakirja.Peli.MiniJson.Jasenna(json);
            var lista = juuri as List<object> ?? Matkakirja.Peli.MiniJson.Kentta(juuri as Dictionary<string, object>, "paikat") as List<object>;
            if (lista == null && juuri is Dictionary<string, object> yksi) lista = new List<object> { yksi };
            if (lista == null) return r;
            foreach (var x in lista)
            {
                if (!(x is Dictionary<string, object> o)) continue;
                var k = Matkakirja.Peli.MiniJson.Kentta(o, "keskipiste") as List<object>;
                var b = Matkakirja.Peli.MiniJson.Kentta(o, "bbox") as List<object>;
                string tunniste = Teksti(o, "tunniste");
                if (string.IsNullOrEmpty(tunniste) || k == null || k.Count < 2 || b == null || b.Count < 4) continue;
                var p = new Kuvauspaikka
                {
                    Tunniste = tunniste, Nimi = Teksti(o, "nimi") ?? tunniste, Maa = Teksti(o, "maa") ?? "",
                    Kuva = Teksti(o, "kuva"), Lahde = Teksti(o, "lahde") ?? "",
                    Lat = Luku(k[0]), Lon = Luku(k[1]), W = Luku(b[0]), S = Luku(b[1]), E = Luku(b[2]), N = Luku(b[3]),
                    Px = (int)Luku(Matkakirja.Peli.MiniJson.Kentta(o, "px") ?? 0), MPx = Luku(Matkakirja.Peli.MiniJson.Kentta(o, "m_px") ?? 0),
                };
                if (Matkakirja.Peli.MiniJson.Kentta(o, "koko_m") is object km) p.KokoM = Luku(km);
                p.NimiLcd = Teksti(o, "nimi_lcd") ?? p.Nimi.ToUpper(new CultureInfo("fi-FI"));
                p.MaaLcd = Teksti(o, "maa_lcd") ?? p.Maa.ToUpper(new CultureInfo("fi-FI"));
                if (string.IsNullOrEmpty(p.Kuva)) p.Kuva = "kuvauspaikat/v1/" + tunniste + ".jpg";
                r.Add(p);
            }
            return r;
        }

        /// <summary>Lähin kuvauspaikka katsepisteestä enintään <paramref name="maxKm"/> (oletus KuvausKm); null = ei kuvattavaa.</summary>
        public static Kuvauspaikka Lahin(IReadOnlyList<Kuvauspaikka> paikat, double lat, double lon, double maxKm = double.NaN)
        {
            if (paikat == null || double.IsNaN(lat) || double.IsNaN(lon)) return null;
            double raja = double.IsNaN(maxKm) ? KuvausKm : maxKm;
            Kuvauspaikka paras = null;
            foreach (var p in paikat)
            {
                double km = Ylilennot.MaaEtaisyysKm(lat, lon, p.Lat, p.Lon);
                if (km <= raja) { raja = km; paras = p; }
            }
            return paras;
        }

        /// <summary>
        /// Kuvan kamera: silmä ISS:ssä, katse kuvauspaikan keskipisteeseen (IssKuvakulma.KohteenKulma), pystykenttä (°) niin, että
        /// kuvan leveys ja korkeus (kuvasuhde <paramref name="leveysPerKorkeus"/>) mahtuvat RajausOsuus × koko -neliöön. Vino katse
        /// (zeniittikulma ζ) venyttää maan pystysuunnassa 1 / cos ζ.
        /// </summary>
        public static (Kuvakulma Asento, double Pystykentta) Rajaus(in IssHetki iss, Kuvauspaikka p, double leveysPerKorkeus)
        {
            var a = IssKuvakulma.KohteenKulma(iss, p.Lat, p.Lon);
            double puoli = RajausOsuus * p.KokoM / 2, rho = Math.Max(1, a.EtaisyysM), cz = Math.Max(0.05, Math.Cos(a.Kallistus * Math.PI / 180));
            // Kuvan alue maassa on suorakulmio (puolileveys ρ t · suhde, puolipituus ρ t / cos ζ, t = tan(v/2)), joka on kiertynyt
            // kameran suuntiman verran pohjoiseen nähden; sen akselien suuntainen ympäröivä laatikko pysyy kuvauspaikan neliön sisällä
            // (Päätoimittaja 4.10.: Helsingin kuvan yläkulmissa näkyi kierretyn rajauksen vino kiila lähdekuvan ulkopuolelta).
            // Vinon kuvan kaukoreuna venyy hieman enemmän kuin lähireuna; Varmuus kattaa sen (kenttä ~2°).
            double s = Math.Abs(Math.Sin(a.Suuntima * Math.PI / 180)), c = Math.Abs(Math.Cos(a.Suuntima * Math.PI / 180));
            double k = Math.Max(0.1, leveysPerKorkeus);
            double x = k * c + s / cz, y = k * s + c / cz;
            double t = Varmuus * puoli / (rho * Math.Max(x, y));
            return (a, 2 * Math.Atan(t) * 180 / Math.PI);
        }

        static string Teksti(Dictionary<string, object> o, string k) => Matkakirja.Peli.MiniJson.Kentta(o, k) as string;
        static double Luku(object v) => v == null ? double.NaN : Convert.ToDouble(v, CultureInfo.InvariantCulture);
    }
}
