// PALLON KAUPUNKIÄÄNET v1 (Linssiseppä 9.10.2026; PT junaan 173, Pelikoodarin aanet/pallo-kaupunki-v1/manifest.json, Sonniss GDC,
// muoto { versio, kuvaus, aanet: [{ tunnus, aani, silmukka, kesto_s, LUFS, lahde, tekija, lisenssi, alkuperainen, ryhma, kaytto }] }).
// Kaikki −23 LUFS; kertoimet ovat suhteellisia maisemaan kuten PalloElavaAanet (soittimet kertovat ne OpasAanitasot.Maiseman ja
// mikserin Kerroin(ryhmä, tunnus):lla). Puuttuva manifesti tai tiedosto = hiljaisuus (kaikki kuten ennen).
//   kirkonkello-01…05            kerta (8 s, heiluvat kellot), 3D lähimmässä OSM-kirkossa (Ydin KaupunkiAanet)
//   suihkulahde-iso / -pieni     silmukat (25 / 45 s, mono), 3D OSM-suihkulähteissä, enintään 2 lähintä
//   kahvila-baari / -rauhallinen silmukat (60 s, stereo), 2D-tausta kahvilatiheyden mukaan
//   kahvila-maitovaahdotin       kerta (6,2 s), 3D lähimmässä cafésa; mikserissä tehosteet (manifestin ryhma)
//   tori-ulko                    silmukka (60 s, stereo), 2D-tausta torin tai ulkotorin lähellä
//   vaki-kauppahalli / vaki-sisatila-kauppakeskus   silmukat (60 s, stereo), 2D-tausta katetun hallin vieressä −12 dB
//   vene-ohi-01…03               kerta (9 s, huippu ~4,5 s), 3D pienessä veneessä (Ydin Ohiajot vesi)
//   satama-vesi                  silmukka (30 s, mono, ylipäästö 100 Hz, kivikkorannan liplatus), 3D lähimmissä laitureissa; EI manifestissa:
//                                Pelikoodarin sonniss-aanet-v4 (Erilliset, liitetään Luessa manifestin riveihin)
//   vaki-sisatila-sorina         EI käytössä (ei sopivaa paikkaa pallosta; ei ladata eikä rekisteröidä)
// Mikseri (Aanimikseri, konteksti pallo): ryhmä manifestin ryhma-kentän mukaan (maisema; maitovaahdotin tehosteet); klipin nimi = tunnus.
// Puhdas C#: KaupunkiAanetTestit.
using System;
using System.Collections.Generic;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Aanet
{
    public sealed class PalloKaupunkiAanet
    {
        public const string Juuri = "https://media.matkakirja.app/aanet/pallo-kaupunki-v1/";
        public const string ManifestiOsoite = Juuri + "manifest.json";

        public sealed class Aani { public string Tunnus, Polku, Ryhma; public bool Silmukka; public double KestoS; public string Osoite => Polku.StartsWith("https://") ? Polku : Juuri + Polku; }
        public readonly Dictionary<string, Aani> Aanet = new Dictionary<string, Aani>(StringComparer.Ordinal);

        // ---- tunnukset ----
        public static readonly string[] Kirkonkello = Sarja("kirkonkello", 5), VeneOhi = Sarja("vene-ohi", 3);
        /// <summary>KAUPUNKIEN PISTEÄÄNET (Pelikoodari 10.10.2026, PT junaan 175; aanet/kaupunki-pisteet-v1, mono, kuivimmat lähteet): kahvilan
        /// astiat maitovaahdottimen rinnalle (KaupunkiAanet) ja kolme pyörän kelloa IhmisAanetin PyoranKellot-sarjaan. Omat tunnukset
        /// (pisteet-…), koska pyoran-kello-01…03 on jo pallo-elava-v2:ssa.</summary>
        public static readonly string[] KahvilaAstiat = Sarja("kahvila-astiat", 6), PyoranKelloPisteet = Sarja("pisteet-pyoran-kello", 3);
        const string PisteJuuri = "https://media.matkakirja.app/aanet/kaupunki-pisteet-v1/";
        public const string SuihkuIso = "suihkulahde-iso", SuihkuPieni = "suihkulahde-pieni", KahvilaBaari = "kahvila-baari",
            KahvilaRauhallinen = "kahvila-rauhallinen", Maitovaahdotin = "kahvila-maitovaahdotin", ToriUlko = "tori-ulko",
            Kauppahalli = "vaki-kauppahalli", Kauppakeskus = "vaki-sisatila-kauppakeskus", SisatilaSorina = "vaki-sisatila-sorina", SatamaVesi = "satama-vesi";
        /// <summary>Manifestin ulkopuoliset äänet (Pelikoodari 9.10.): liitetään Luessa, ellei manifestissa ole samaa tunnusta.</summary>
        public static readonly Aani[] Erilliset =
        {
            new Aani { Tunnus = SatamaVesi, Polku = "https://media.matkakirja.app/aanet/sonniss-aanet-v4/satama-vesi.mp3", Silmukka = true, KestoS = 30, Ryhma = "maisema" },
            Piste(KahvilaAstiat[0], "kahvila-astiat-01", "tehosteet"), Piste(KahvilaAstiat[1], "kahvila-astiat-02", "tehosteet"),
            Piste(KahvilaAstiat[2], "kahvila-astiat-03", "tehosteet"), Piste(KahvilaAstiat[3], "kahvila-astiat-04", "tehosteet"),
            Piste(KahvilaAstiat[4], "kahvila-astiat-05", "tehosteet"), Piste(KahvilaAstiat[5], "kahvila-astiat-06", "tehosteet"),
            Piste(PyoranKelloPisteet[0], "pyoran-kello-01", "maisema"), Piste(PyoranKelloPisteet[1], "pyoran-kello-02", "maisema"),
            Piste(PyoranKelloPisteet[2], "pyoran-kello-03", "maisema"),
        };
        static Aani Piste(string tunnus, string tiedosto, string ryhma) => new Aani { Tunnus = tunnus, Polku = PisteJuuri + tiedosto + ".mp3", KestoS = 2, Ryhma = ryhma };

        static string[] Sarja(string alku, int n) { var a = new string[n]; for (int i = 0; i < n; i++) a[i] = $"{alku}-{i + 1:00}"; return a; }

        /// <summary>Mikserin äänet: tunnus, ryhmä, näkyvä nimi ja klipit (manifestin tunnukset = klippien nimet).</summary>
        public static readonly (string Id, string Ryhma, string Nimi, string[] Klipit)[] Mikseri =
        {
            ("elava.kirkonkello", "maisema", "Kirkonkellot", Kirkonkello),
            ("elava.suihkulahde", "maisema", "Suihkulähteet", new[] { SuihkuIso, SuihkuPieni }),
            ("elava.kahvila-baari", "maisema", "Kahvilat: baari", new[] { KahvilaBaari }),
            ("elava.kahvila-rauhallinen", "maisema", "Kahvilat: rauhallinen", new[] { KahvilaRauhallinen }),
            ("elava.kahvila-maitovaahdotin", "tehosteet", "Kahvila: maitovaahdotin", new[] { Maitovaahdotin }),
            ("elava.kahvila-astiat", "tehosteet", "Kahvila: astiat", KahvilaAstiat),
            ("elava.pyoran-kello-lisa", "maisema", "Pyörän kello (lisä)", PyoranKelloPisteet),
            ("elava.tori-ulko", "maisema", "Tori ulkona", new[] { ToriUlko }),
            ("elava.kauppahalli", "maisema", "Kauppahalli", new[] { Kauppahalli }),
            ("elava.kauppakeskus", "maisema", "Kauppakeskus", new[] { Kauppakeskus }),
            ("elava.vene-ohi", "maisema", "Vene ohi", VeneOhi),
            ("elava.satama-vesi", "maisema", "Satama: veden liplatus", new[] { SatamaVesi }),
        };

        /// <summary>Kaikki käytössä olevat tunnukset (esilataus; muut manifestin rivit, kuten vaki-sisatila-sorina, ohitetaan).</summary>
        public static IEnumerable<string> Tunnukset() { foreach (var m in Mikseri) foreach (var k in m.Klipit) yield return k; }

        /// <summary>Tunnuksen mikseriääni (Id, Ryhma) tai (null, null).</summary>
        public static (string Id, string Ryhma) MikseriAani(string tunnus)
        {
            foreach (var m in Mikseri) if (Array.IndexOf(m.Klipit, tunnus) >= 0) return (m.Id, m.Ryhma);
            return (null, null);
        }

        public static PalloKaupunkiAanet Lue(string json)
        {
            var m = new PalloKaupunkiAanet();
            foreach (var o in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(MiniJson.Objekti(MiniJson.Jasenna(json)), "aanet")))
            {
                var d = MiniJson.ObjektiTaiNull(o); if (d == null) continue;
                var a = new Aani { Tunnus = MiniJson.Teksti(d, "tunnus"), Polku = MiniJson.Teksti(d, "aani"), KestoS = MiniJson.Luku(d, "kesto_s") ?? 0,
                    Silmukka = MiniJson.Kentta(d, "silmukka") is bool b && b, Ryhma = MiniJson.Teksti(d, "ryhma") };
                if (!string.IsNullOrEmpty(a.Tunnus) && !string.IsNullOrEmpty(a.Polku)) m.Aanet[a.Tunnus] = a;
            }
            foreach (var a in Erilliset) if (!m.Aanet.ContainsKey(a.Tunnus)) m.Aanet[a.Tunnus] = a;
            return m;
        }

        // ---- tasot (kertoimet maiseman Tasoon nähden; −23 LUFS -äänet) ----
        public const double SatamaTaso = 0.5, KirkkoTaso = 0.8, SuihkuTaso = 0.5, KahvilaTaso = 0.35, MaitoTaso = 0.4, AstiaTaso = 0.3, ToriTaso = 0.45, VeneTaso = 0.8;
        /// <summary>Halli ulkoa kuultuna −12 dB (PT 9.10.).</summary>
        public static readonly double HalliTaso = 0.5 * Math.Pow(10, -12 / 20.0);
        /// <summary>Tori-ulko −6 dB, kun IHMISET soittaa sorinaa (ei päällekkäin liian kovaa).</summary>
        public static readonly double ToriSorinaKerroin = Math.Pow(10, -6 / 20.0);
        /// <summary>Vene-ohin huippu äänen alusta (Pelikoodari 9.10.: ~4,5 s kaikissa kolmessa).</summary>
        public const double VeneHuippuS = 4.5;
    }
}
