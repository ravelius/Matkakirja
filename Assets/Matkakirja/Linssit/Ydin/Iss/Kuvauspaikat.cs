// TARKKA ISS-KUVA KUVAUSPAIKOILLA (omistaja 4.10.2026 klo 11.44: "Kameranappi tekee VAIN tarkan ISS-kuvan ... Nappi on aktiivinen
// vain kuvauspaikan kohdalla"; Karttasepän kuvauspaikat: 25 Euroopan kohdetta, kukin 2048² jpg 20 × 20 km kesämediaanista,
// ylin rivi pohjoinen, pikselit tasavälein lon/lat-bboxissa). Aineisto: kuvauspaikat.json ({"paikat": [...]}) tai yksittäinen
// paikka-olio. Kuvausehto: Cupolan katsepiste enintään KuvausKm kuvauspaikan keskipisteestä. Kuvan rajaus (Rajaus): kamera ISS:ssä
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
        /// <summary>Katsepisteen enimmäisetäisyys kuvauspaikan keskipisteestä (km), jotta kameranappi on aktiivinen.</summary>
        public static double KuvausKm = 15;
        /// <summary>Kuvan osuus kuvauspaikan koosta lyhyemmällä sivulla (reunaan jää varaa, ettei aineiston ulkopuoli näy).</summary>
        public const double RajausOsuus = 0.9;
        /// <summary>Ämpärin juuri: kuva-kentän R2-polku lisätään tähän.</summary>
        public const string Juuri = "https://media.matkakirja.app/";

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
            double puoli = RajausOsuus * p.KokoM / 2, rho = Math.Max(1, a.EtaisyysM), cz = Math.Cos(a.Kallistus * Math.PI / 180);
            // Pystysuunta: maan puolikorkeus ≈ ρ tan(v/2) / cos ζ ≤ puoli; vaaka: ρ tan(v/2) · suhde ≤ puoli.
            double tPysty = puoli * Math.Max(0.05, cz) / rho, tVaaka = puoli / rho / Math.Max(0.1, leveysPerKorkeus);
            return (a, 2 * Math.Atan(Math.Min(tPysty, tVaaka)) * 180 / Math.PI);
        }

        static string Teksti(Dictionary<string, object> o, string k) => Matkakirja.Peli.MiniJson.Kentta(o, k) as string;
        static double Luku(object v) => v == null ? double.NaN : Convert.ToDouble(v, CultureInfo.InvariantCulture);
    }
}
