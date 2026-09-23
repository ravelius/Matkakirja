// ISOISÄN LINSSI — VUOSI 1873 (web js/linssit/isoisa-1873.js, Karttasepän erä 1
// haarassa karttaseppa-isoisan-linssi a65b2eef2).
//
// Raamattu, Karttalinssit "ISOISÄN LINSSI — VUOSI 1873" (omistaja 21.9.2026): oma
// vahvasti retro linssi VAIN isoisän matkan vuodesta — sen vuoden rajat ja maiden
// nimet; myöhemmin Horation reitti katkoviivana, isoisän valokuvat, äänet ja media.
// Ei aikajanaa: yksi pysähtynyt vuosi. Linssi on tarinan lahja (loki 21.9. klo 14.59).
//
// ERÄ 1 natiivissa: rajat viivoina ja nimet nimiöinä pallon päällä.
//  - RAJAT: historical-basemaps 1878 → 1873 naulattuna Natural Earthin nykyrajoihin
//    (tools/tee-rajat-1873.mjs). GPL-3.0: aineisto STRIIMATAAN ämpäristä erillisenä
//    tiedostona, ei binaariin (Fablen päätös 23.9.2026); attribuutio kulkee tiedoston
//    mukana ja paketin lisenssit.json:ssa (historical-basemaps). Luokka 1 = valtionraja
//    (yhtenäinen), 2 = vasalli tai autonominen (katkoviiva).
//  - NIMET: valtioiden 1873-nimet (samasta tiedostosta, web js/packs/valtiot-1873.js)
//    ja nimistön maakunnat aika = '1873' (paketin moduulit/js/packs/nimisto-1873.json).
//    Näkyvyys kameran korkeuden mukaan kokoluokittain ja ruututörmäys arvojärjestyksessä
//    (heikompi piiloon, ei siirtoa — Raamattu: NIMIÖIDEN VAKAUS).
//  - Peli jatkuu linssin alla (web ei piilota pelikerroksia). Nykyrajat ovat natiivissa
//    poltettuina pohjalaattoihin; jos Karttaseppä polttaa rajattoman sarjan, se annetaan
//    RajatonPohja-osoitteena ja vaihdetaan pohjan tilalle kuten topografialinssissä.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Isoisa
{
    public enum NimenKoko { Suuri, Keski, Pieni, Maakunta }

    public sealed class Rajaviiva
    {
        /// <summary>1 = valtionraja, 2 = vasalli tai autonominen alue (katkoviiva).</summary>
        public int Luokka;
        public IReadOnlyList<LatLon> Pisteet;
    }

    public sealed class Nimi1873
    {
        public string Avain, Teksti;
        public double Lat, Lon;
        public NimenKoko Koko;
        /// <summary>0 = maakunta, 1 = itsenäinen, 2 = vasalli, 3 = siirtomaa/alusmaa (web luokka).</summary>
        public int Luokka;
    }

    /// <summary>Nimen ruutulaatikko törmäystarkistukseen (pikselit, y alas tai ylös, kunhan sama kaikilla).</summary>
    public readonly struct Nimilaatikko
    {
        public readonly string Avain;
        public readonly int Arvo;
        public readonly double X0, Y0, X1, Y1;
        public Nimilaatikko(string avain, int arvo, double x0, double y0, double x1, double y1)
        { Avain = avain; Arvo = arvo; X0 = x0; Y0 = y0; X1 = x1; Y1 = y1; }
    }

    public sealed class Isoisa1873Aineisto
    {
        public readonly List<Rajaviiva> Viivat = new List<Rajaviiva>();
        public readonly List<Nimi1873> Nimet = new List<Nimi1873>();
        public string Lisenssi, Attribuutio;

        /// <param name="data">striimattu isoisa-1873.json { lisenssi, attribuutio, viivat [{ l, p [[lon, lat]] }], valtiot [{ teksti, lat, lon, luokka, koko }] }</param>
        /// <param name="nimisto">paketin moduulit/js/packs/nimisto-1873.json (NIMISTO_1873) tai null</param>
        public static Isoisa1873Aineisto Lue(object data, object nimisto)
        {
            var a = new Isoisa1873Aineisto();
            var d = Ob(data);
            a.Lisenssi = MiniJson.Teksti(d, "lisenssi");
            a.Attribuutio = MiniJson.Teksti(d, "attribuutio");
            foreach (var v in Li(MiniJson.Kentta(d, "viivat")).Select(Ob).Where(v => v != null))
            {
                var pisteet = new List<LatLon>();
                foreach (var p in Li(MiniJson.Kentta(v, "p")))
                    if (p is List<object> xy && xy.Count >= 2 && xy[0] is double lon && xy[1] is double lat)
                        pisteet.Add(new LatLon(lat, lon));
                if (pisteet.Count >= 2)
                    a.Viivat.Add(new Rajaviiva { Luokka = (int)(MiniJson.Luku(v, "l") ?? 1), Pisteet = pisteet });
            }
            foreach (var v in Li(MiniJson.Kentta(d, "valtiot")).Select(Ob).Where(v => v != null))
            {
                var teksti = MiniJson.Teksti(v, "teksti");
                if (teksti == null || !(MiniJson.Luku(v, "lat") is double lat) || !(MiniJson.Luku(v, "lon") is double lon)) continue;
                a.Nimet.Add(new Nimi1873
                {
                    Avain = "valtio-" + teksti, Teksti = teksti, Lat = lat, Lon = lon,
                    Koko = Koko(MiniJson.Teksti(v, "koko")), Luokka = (int)(MiniJson.Luku(v, "luokka") ?? 1),
                });
            }
            // Web maakuntaDatumit: nimistön rivit aika === '1873'.
            var vienti = MiniJson.Kentta(Ob(MiniJson.Kentta(Ob(nimisto), "exportit")), "NIMISTO_1873");
            foreach (var n in Li(vienti).Select(Ob).Where(n => n != null))
            {
                if (MiniJson.Teksti(n, "aika") != "1873") continue;
                var teksti = MiniJson.Teksti(n, "teksti");
                if (teksti == null || !(MiniJson.Luku(n, "lat") is double lat) || !(MiniJson.Luku(n, "lon") is double lon)) continue;
                a.Nimet.Add(new Nimi1873 { Avain = "maakunta-" + teksti, Teksti = teksti, Lat = lat, Lon = lon, Koko = NimenKoko.Maakunta, Luokka = 0 });
            }
            return a;
        }

        static Dictionary<string, object> Ob(object x) => x as Dictionary<string, object>;
        static List<object> Li(object x) => x as List<object> ?? new List<object>();

        static NimenKoko Koko(string s) => s switch
        {
            "suuri" => NimenKoko.Suuri,
            "keski" => NimenKoko.Keski,
            "maakunta" => NimenKoko.Maakunta,
            _ => NimenKoko.Pieni,
        };
    }

    /// <summary>Nimien näkyvyys ja törmäykset (web NIMIEN_KORKEUSRAJAT, NIMIEN_ARVO, ratkaiseTormaykset).</summary>
    public static class Isoisa1873Nimet
    {
        /// <summary>Pallon säde metreinä: webin korkeus (Globe.gl altitude) on säteinä.</summary>
        public const double Sade = 6_371_000;

        /// <summary>Korkeusrajat pallon säteinä (web: suuri ja keski aina, pieni ≤ 0,13, maakunta ≤ 0,15).</summary>
        public static double KorkeusrajaSateina(NimenKoko k) => k switch
        {
            NimenKoko.Suuri => double.PositiveInfinity,
            NimenKoko.Keski => double.PositiveInfinity,
            NimenKoko.Pieni => 0.13,
            NimenKoko.Maakunta => 0.15,
            _ => 0,
        };

        /// <summary>Törmäyksen arvo: pienempi voittaa (web NIMIEN_ARVO).</summary>
        public static int Arvo(NimenKoko k) => (int)k;

        /// <summary>Nimien välinen rako pikseleinä (web NIMIEN_RAKO_PX).</summary>
        public const double RakoPx = 4;

        /// <summary>Näkyvyyden päivitysjarru (s): nimet vaihtuvat vasta, kun kamera on hetken paikallaan (web 150 ms).</summary>
        public const double Jarru = 0.15;

        /// <summary>Näkyykö kokoluokan nimi tällä kameran korkeudella (metreinä)?</summary>
        public static bool Nakyy(NimenKoko k, double korkeusM) => korkeusM / Sade <= KorkeusrajaSateina(k);

        /// <summary>
        /// Web ratkaiseTormaykset: arvojärjestyksessä (vakaa lajittelu) arvokkaampi jää ja
        /// heikompi piiloon. Palauttaa piilotettavien avaimet.
        /// </summary>
        public static HashSet<string> RatkaiseTormaykset(IEnumerable<Nimilaatikko> laatikot, double rako = RakoPx)
        {
            var pidetyt = new List<Nimilaatikko>();
            var piiloon = new HashSet<string>(StringComparer.Ordinal);
            foreach (var l in laatikot.OrderBy(l => l.Arvo))
            {
                bool osuu = pidetyt.Any(p => l.X0 - rako < p.X1 && l.X1 + rako > p.X0 && l.Y0 - rako < p.Y1 && l.Y1 + rako > p.Y0);
                if (osuu) piiloon.Add(l.Avain); else pidetyt.Add(l);
            }
            return piiloon;
        }
    }

    /// <summary>Unity-kerros (Linssit/Unity/IsoisaKerros) toteuttaa; testeissä vale.</summary>
    public interface IIsoisaNakyma
    {
        /// <summary>Rajaviivasto (luokka 1 yhtenäinen, 2 katkoviiva).</summary>
        void Rajat(IReadOnlyList<Rajaviiva> viivat);
        /// <summary>Nimet; näkymä ajaa näkyvyyden ja törmäykset Isoisa1873Nimet-säännöillä.</summary>
        void Nimet(IReadOnlyList<Nimi1873> nimet);
        void Pois();
    }

    public sealed class Isoisa1873Linssi : ILinssi
    {
        /// <summary>Striimatun aineiston osoite (GPL-3.0, ei binaarissa eikä paketissa).</summary>
        public static string AineistonOsoite = "https://media.matkakirja.app/matkakirja/linssit/isoisa-1873/20260921/isoisa-1873.json";

        /// <summary>
        /// Rajaton pohjasarja nykyrajojen tilalle ({z}/{x}/{y}, Web Mercator); null = pelin
        /// oma pohja jää (nykyrajat näkyvät poltettuina 1873-rajojen alla).
        /// </summary>
        public static string RajatonPohja;
        public static int RajatonPohjaMaxTaso = 8;
        public const string Kerros = "isoisa-1873";

        public static readonly LinssiTiedot IsoisaTiedot = new LinssiTiedot
        {
            Id = "isoisa-1873",
            Nimi = "Isoisän linssi 1873",
            Lyhyt = "Maailma isoisän silmin: vuoden 1873 rajat ja valtakunnat.",
            Jarjestys = 12,
            // Vanha silmälasipari: kaksi linssiä ja nenäsilta.
            Ikoni = "<circle cx=\"7.5\" cy=\"13\" r=\"4.2\"/><circle cx=\"16.5\" cy=\"13\" r=\"4.2\"/>"
                + "<path d=\"M11.7 13h0.6M3.3 13 4.6 6.4M20.7 13l-1.3-6.6\"/>",
            Lahde = new Lahde
            {
                Aineisto = "historical-basemaps (aourednik) world_1878 → 1873, tarkennus Natural Earth "
                    + "10m admin_0_boundary_lines_land; valtioiden nimet 1873-muodossa",
                Lisenssi = "GPL-3.0 (rajaviivasto), Natural Earth public domain",
                Osoite = "https://github.com/aourednik/historical-basemaps",
                Haettu = "2026-09-21",
            },
            Selite = new[]
            {
                new SeliteRivi("#4a3320", "Valtionraja vuonna 1873"),
                new SeliteRivi("#8a6a48", "Osmanien vasalli tai autonominen alue (Romania, Serbia, Montenegro, Egypti)"),
                new SeliteRivi("#6b5539", "Valtakuntien ja siirtomaiden nimet isoisän ajan muodossa"),
            },
        };

        readonly Isoisa1873Aineisto aineisto;
        readonly IIsoisaNakyma nakyma;
        ILinssiYmparisto y;
        bool pohjaVaihdettu;

        public Isoisa1873Linssi(Isoisa1873Aineisto aineisto, IIsoisaNakyma nakyma)
        {
            this.aineisto = aineisto ?? throw new ArgumentNullException(nameof(aineisto));
            this.nakyma = nakyma;
        }

        public LinssiTiedot Tiedot => IsoisaTiedot;
        public bool Auki { get; private set; }
        public Isoisa1873Aineisto Aineisto => aineisto;

        public void Avaa(ILinssiYmparisto ymparisto)
        {
            if (Auki) return;
            y = ymparisto ?? throw new ArgumentNullException(nameof(ymparisto));
            Auki = true;
            pohjaVaihdettu = false;
            if (!string.IsNullOrEmpty(RajatonPohja))
            {
                y.Kerrokset.LisaaRasteri(Kerros, new Rasteri { Url = RajatonPohja, MinTaso = 0, MaxTaso = RajatonPohjaMaxTaso });
                y.Kerrokset.Nakyvyys(Topografia.Pohja, false);
                pohjaVaihdettu = true;
            }
            if (nakyma == null) return;
            nakyma.Rajat(aineisto.Viivat);
            nakyma.Nimet(aineisto.Nimet);
        }

        public void Paivita()
        {
            if (!Auki || !pohjaVaihdettu) return;
            // Rajaton sarja ei tule: pelin oma pohja takaisin (ei tyhjää palloa).
            if (y.Kerrokset.Tila(Kerros) == KerrosTila.Luovutti)
            {
                pohjaVaihdettu = false;
                y.Kerrokset.Poista(Kerros);
                y.Kerrokset.Nakyvyys(Topografia.Pohja, true);
            }
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            nakyma?.Pois();
            if (pohjaVaihdettu)
            {
                y.Kerrokset.Poista(Kerros);
                y.Kerrokset.Nakyvyys(Topografia.Pohja, true);
                pohjaVaihdettu = false;
            }
        }
    }
}
