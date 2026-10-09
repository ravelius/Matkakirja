// PALLON ELÄVÄT ÄÄNET v2 (Linssiseppä 9.10.2026; PT junaan 172, omistajan kysymys pallon äänimaailmasta; Pelikoodarin äänet
// aanet/pallo-elava-v2/manifest.json, muoto kuten kaupunkimaisema-v1: { aanet: [{ tunnus, aani, silmukka, kesto_s, LUFS, … }] }).
// Kaikki −23 LUFS; kertoimet ovat suhteellisia maisemaan, ja soittimet kertovat ne maiseman Tasolla (OpasAanitasot.Maisema, 0,55)
// ja mikserin Kerroin(ryhmä, tunnus):lla kuten muutkin pallon äänet. Puuttuva manifesti tai tiedosto = hiljaisuus (kaikki kuten ennen).
//   katuliikenne    auto-ohi-01…04, bussi-ohi-01…02, raitiovaunu-ohi-01…02   kerta, 3D ajoneuvossa (Ydin Ohiajot)
//   muut pallot     poltin-kaukainen-01…03                                    kerta, 3D pallossa (Ydin PoltinAanet)
//   sade            sade-kangas, sade-kori                                    silmukat, korissa (2D), taso × max(kuuro, sade)
//   liput           lippu-lepatus                                             silmukka, 3D lähimmässä lipussa alle LippuKuuluuM
//   yö              yo-humina                                                 silmukka, kehityskaupungeissa yön osuuden mukaan
//   ihmiset         ihmiset-sorina/-nauru/-lapsi, pyoran-kello, katusoittaja, laivan-torvi   kerta, 3D OSM-paikassa (Ydin IhmisAanet)
// Mikseri (Natiivi-UI:n äänirekisteri, Aanimikseri): konteksti pallo; sade ryhmässä saa, muut maisema; klipin nimi = tunnus.
// Puhdas C#: ElavatAanetTestit.
using System;
using System.Collections.Generic;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Aanet
{
    public sealed class PalloElavaAanet
    {
        public const string Juuri = "https://media.matkakirja.app/aanet/pallo-elava-v2/";
        public const string ManifestiOsoite = Juuri + "manifest.json";

        public sealed class Aani { public string Tunnus, Polku; public bool Silmukka; public double KestoS; public string Osoite => Juuri + Polku; }
        public readonly Dictionary<string, Aani> Aanet = new Dictionary<string, Aani>(StringComparer.Ordinal);

        // ---- tunnukset ----
        public static readonly string[] AutoOhi = Sarja("auto-ohi", 4), BussiOhi = Sarja("bussi-ohi", 2), RaitioOhi = Sarja("raitiovaunu-ohi", 2),
            PoltinKaukainen = Sarja("poltin-kaukainen", 3), Sorina = Sarja("ihmiset-sorina", 5), Nauru = Sarja("ihmiset-nauru", 3),
            Lapsi = Sarja("ihmiset-lapsi", 2), PyoranKello = Sarja("pyoran-kello", 3), Katusoittaja = Sarja("katusoittaja", 2), LaivanTorvi = Sarja("laivan-torvi", 3);
        public const string SadeKangas = "sade-kangas", SadeKori = "sade-kori", LippuLepatus = "lippu-lepatus", YoHumina = "yo-humina";

        static string[] Sarja(string alku, int n) { var a = new string[n]; for (int i = 0; i < n; i++) a[i] = $"{alku}-{i + 1:00}"; return a; }

        /// <summary>Mikserin äänet: tunnus, ryhmä, näkyvä nimi ja klipit (manifestin tunnukset = klippien nimet).</summary>
        public static readonly (string Id, string Ryhma, string Nimi, string[] Klipit)[] Mikseri =
        {
            ("elava.auto-ohi", "maisema", "Katuliikenne: auto ohi", AutoOhi),
            ("elava.bussi-ohi", "maisema", "Katuliikenne: bussi ohi", BussiOhi),
            ("elava.raitiovaunu-ohi", "maisema", "Katuliikenne: raitiovaunu ohi", RaitioOhi),
            ("elava.poltin-kaukainen", "maisema", "Muiden pallojen poltin", PoltinKaukainen),
            ("elava.lippu-lepatus", "maisema", "Lipun lepatus", new[] { LippuLepatus }),
            ("kaupunki.yo-humina", "maisema", "Kaupunki: yön humina", new[] { YoHumina }),
            ("elava.ihmiset-sorina", "maisema", "Ihmiset: puheensorina", Sorina),
            ("elava.ihmiset-nauru", "maisema", "Ihmiset: nauru", Nauru),
            ("elava.ihmiset-lapsi", "maisema", "Ihmiset: lapset", Lapsi),
            ("elava.pyoran-kello", "maisema", "Pyörän kello", PyoranKello),
            ("elava.katusoittaja", "maisema", "Katusoittaja", Katusoittaja),
            ("elava.laivan-torvi", "maisema", "Laivan torvi satamassa", LaivanTorvi),
            ("kori.sade-kangas", "saa", "Sade kankaalla", new[] { SadeKangas }),
            ("kori.sade-kori", "saa", "Sade korilla", new[] { SadeKori }),
        };

        /// <summary>Kaikki tämän version tunnukset (esilataus; muut manifestin rivit ohitetaan).</summary>
        public static IEnumerable<string> Tunnukset() { foreach (var m in Mikseri) foreach (var k in m.Klipit) yield return k; }

        /// <summary>Tunnuksen mikseriääni (Id, Ryhma) tai (null, null).</summary>
        public static (string Id, string Ryhma) MikseriAani(string tunnus)
        {
            foreach (var m in Mikseri) if (Array.IndexOf(m.Klipit, tunnus) >= 0) return (m.Id, m.Ryhma);
            return (null, null);
        }

        public static PalloElavaAanet Lue(string json)
        {
            var m = new PalloElavaAanet();
            foreach (var o in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(MiniJson.Objekti(MiniJson.Jasenna(json)), "aanet")))
            {
                var d = MiniJson.ObjektiTaiNull(o); if (d == null) continue;
                var a = new Aani { Tunnus = MiniJson.Teksti(d, "tunnus"), Polku = MiniJson.Teksti(d, "aani"), KestoS = MiniJson.Luku(d, "kesto_s") ?? 0,
                    Silmukka = MiniJson.Kentta(d, "silmukka") is bool b && b };
                if (!string.IsNullOrEmpty(a.Tunnus) && !string.IsNullOrEmpty(a.Polku)) m.Aanet[a.Tunnus] = a;
            }
            return m;
        }

        // ---- tasot (kertoimet maiseman Tasoon nähden; −23 LUFS -äänet) ----
        public const double AutoTaso = 0.8, BussiTaso = 0.9, RaitioTaso = 0.9, PoltinTaso = 0.6, LippuTaso = 0.45, YoHuminaKerroin = 0.35,
            SadeKangasTaso = 0.7, SadeKoriTaso = 0.4;
        public const double LippuKuuluuM = 120, LippuTaysiM = 15, SadeHaivytysS = 2.5, SilmukkaHaivytysS = 1.5;

        /// <summary>Etäisyyden taso: 1 lähempänä kuin taysiM, 0 kauempana kuin hiljaM; välillä lineaarinen osuus potenssiin eksponentti.</summary>
        public static double Etaisyystaso(double d, double taysiM, double hiljaM, double eksponentti = 1)
        {
            if (double.IsNaN(d) || d >= hiljaM) return 0;
            if (d <= taysiM) return 1;
            return Math.Pow((hiljaM - d) / (hiljaM - taysiM), eksponentti);
        }

        /// <summary>Sateen voima 0–1: max(oppaan kuuro, sään sade).</summary>
        public static double SadeVoima(double kuuro, double sade) => Raja(Math.Max(Raja(kuuro), Raja(sade)));

        /// <summary>Lipun lepatus: lähimmän lipun etäisyys (m) ja tuuli (m/s); tyynellä ei lepatusta, kovalla tuulella täysi.</summary>
        public static double LipunTaso(double d, double tuuliMs) => LippuTaso * Etaisyystaso(d, LippuTaysiM, LippuKuuluuM, 2) * Tuulikerroin(tuuliMs);
        public static double Tuulikerroin(double ms) => ms <= 0.5 ? 0 : Math.Min(1, 0.25 + 0.75 * (ms - 0.5) / 7.5);

        /// <summary>Yön humina yön osuudesta (KaupunkiYovalot.Osuus: sininen hetki → yö), pehmeä alku.</summary>
        public static double YoHuminaTaso(double yoOsuus) { double x = Raja(yoOsuus); return YoHuminaKerroin * x * x * (3 - 2 * x); }

        /// <summary>Liukuva häivytys aikavakiolla (s): silmukat nousevat ja laskevat pehmeästi.</summary>
        public static double Liuku(double nyt, double tavoite, double dt, double aikaS) => nyt + (tavoite - nyt) * Math.Min(1, Math.Max(0, dt) / Math.Max(1e-3, aikaS));

        static double Raja(double x) => double.IsNaN(x) ? 0 : Math.Max(0, Math.Min(1, x));
    }
}
