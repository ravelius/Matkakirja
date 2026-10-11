using System;

namespace Matkakirja
{
    /// <summary>
    /// HOUKUTTIMET KARTALLA (omistaja 11.10.2026 PT:n kautta, juna 182): kaupungit, joissa houkuttaa käydä, hehkuvat pisteinä
    /// hunnun päällä koko ajan, kaikilla zoomeilla ja myös koko Euroopan loitonnuksessa (EurooppaLoitonnus), pelin
    /// kaupunkirajauksesta riippumatta. Puhdas lista ja syke (ei UnityEngineä); testit Kartta-testit/Testit/HoukuttimetTestit.cs
    /// ja Peli-testit (lautapelien kodit = Peliluettelo). Käyttö KaupunkiMerkit (pisteet), värit UI:n puolelta (UI/HoukutinVarit.cs,
    /// Tyylikirja), komento "houkuttimet" (Komennot).
    ///
    ///  - LINSSIKAUPUNGIT violetteina (<see cref="LinssiToken"/>): Alpit (Topografia; laudan kaupunki "alpit", alueen piste),
    ///    Lontoo (Maailmanradio), Edinburgh (Keksinnöt), Istanbul (Ihmisen matka) ja Amsterdam (Taidemuseo).
    ///  - LAUTAPELIKAUPUNGIT sinisinä (<see cref="PeliToken"/>, videopelien sininen): Berliini (Mylly) ja Ateena (Tavli).
    ///  - OLAVINLINNA (videopeli) samalla sinisellä vapaana pisteenä (ei laudan kaupunki, ei napautusta; NUI-jako 11.10.).
    ///    NUI:n nostomerkki (NostotKartalla) hoitaa Olavinlinnan maan sisällä omilla säännöillään.
    ///  - HEHKU: olemassa oleva pistepohja (KaupunkiMerkit: pisteMateriaali, nelio) isompana ja saman pisteen kuultava
    ///    hehkulevy alla; hidas sykähdys koossa ja peitossa Joutosykkeen kellolla (jäätyy levossa keskiasentoon, lämpösääntö).
    ///  - HUNNUN PÄÄLLÄ: huntu on Cesiumin laattojen raster-kerros (laatat geometriajonossa 2000); pisteet piirtyvät
    ///    läpinäkyvien jonossa (<see cref="PisteJono"/>) laattojen jälkeen ja kameraa kohti siirrettyinä, joten huntu ei peitä niitä.
    /// </summary>
    public static class Houkuttimet
    {
        public enum Laji { Linssi, Lautapeli, Videopeli }

        public readonly struct Houkutin
        {
            public readonly string Id, Kohde;
            public readonly Laji Laji;
            /// <summary>Vapaan houkuttimen paikka (ei laudan kaupunki); NaN = laudan kaupungin piste.</summary>
            public readonly double Lat, Lon;
            public Houkutin(string id, Laji laji, string kohde, double lat = double.NaN, double lon = double.NaN)
            { Id = id; Laji = laji; Kohde = kohde; Lat = lat; Lon = lon; }
            /// <summary>Vapaa piste (ei laudan kaupunki): ei napautettava, ei nimeä (NUI:n nostomerkki hoitaa maan sisällä).</summary>
            public bool Vapaa => !double.IsNaN(Lat) && !double.IsNaN(Lon);
            public override string ToString() => $"{Id} ({Kohde})";
        }

        /// <summary>
        /// Houkuttimet laudan kaupunkien tunnuksin (Sisalto.Kaupunki.id) ja vapaat pisteet paikkoineen. Olavinlinna (videopeli,
        /// NUI-jako 11.10.2026): ei laudan kaupunki (Savonlinna ei ole laudalla, Olavinlinna on maastokohde/nosto), joten vapaa
        /// piste 61,8639 N 28,9011 E samalla sinisellä kuin lautapelit. Andøya (ISS-raketti) vapaa violetti piste.
        /// </summary>
        public static readonly Houkutin[] Lista =
        {
            new Houkutin("alpit", Laji.Linssi, "Topografia"),
            new Houkutin("lontoo", Laji.Linssi, "Maailmanradio"),
            new Houkutin("edinburgh", Laji.Linssi, "Keksinnöt"),
            new Houkutin("istanbul", Laji.Linssi, "Ihmisen matka"),
            new Houkutin("amsterdam", Laji.Linssi, "Taidemuseo"),
            new Houkutin("berliini", Laji.Lautapeli, "Mylly"),
            new Houkutin("ateena", Laji.Lautapeli, "Tavli"),
            new Houkutin("olavinlinna", Laji.Videopeli, "Olavinlinna 1499", 61.8639, 28.9011),
            // Andøya (PT 11.10. 15.0x): raketti vie ISS-linssiin, joten vapaa linssi-violetti piste Andøya Spacen laukaisupaikalla
            // (Andenes, 69,2944 N 16,0206 E). LS2 tekee raketin maamerkin ja napautuksen (hintalappu, Rahapula, laukaisu).
            new Houkutin("andoya", Laji.Linssi, "ISS (raketti)", 69.2944, 16.0206),
        };

        /// <summary>Tyylikirjan tokenit (tyylikirja.json): linssi = erikois.linssi-hehku, lautapeli = teemat.videopeli.korostus.</summary>
        public const string LinssiToken = "--tk-erikois-linssi-hehku", PeliToken = "--tk-videopeli-korostus";

        /// <summary>Laudan kaupungin houkutinlaji tai null (vapaat pisteet eivät ole kaupunkeja).</summary>
        public static Laji? LajiKaupungille(string id)
        {
            if (string.IsNullOrEmpty(id)) return null;
            foreach (var h in Lista) if (!h.Vapaa && string.Equals(h.Id, id, StringComparison.Ordinal)) return h.Laji;
            return null;
        }

        /// <summary>Houkuttimen laji tunnuksella (myös vapaat) tai null.</summary>
        public static Laji? LajiTunnukselle(string id)
        {
            if (string.IsNullOrEmpty(id)) return null;
            foreach (var h in Lista) if (string.Equals(h.Id, id, StringComparison.Ordinal)) return h.Laji;
            return null;
        }

        /// <summary>Token lajille (kirjaus ja testit): linssi violetti, lautapeli ja videopeli videopelien sininen.</summary>
        public static string Token(Laji laji) => laji == Laji.Linssi ? LinssiToken : PeliToken;

        // ---- Hehku ja syke ----

        /// <summary>Pisteen koko suhteessa tavalliseen pisteeseen (näkyy kaukaakin).</summary>
        public const double KokoKerroin = 1.5;
        /// <summary>Hehkulevyn koko suhteessa houkuttimen pisteeseen ja peitto (kuultava, ei peitä karttaa).</summary>
        public const double HehkuKerroin = 2.4, HehkuPeitto = 0.32;
        /// <summary>Sykkeen jakso (hidas) ja osuus.</summary>
        public const double JaksoS = 3.2, SykeOsuus = 0.16;

        static double Aalto(double aikaS, double voima) =>
            Math.Min(1.0, Math.Max(0.0, voima)) * Math.Sin(2 * Math.PI * aikaS / JaksoS);

        /// <summary>Pisteen kokokerroin hetkellä aikaS (Joutosyke.Aika) voimalla 0–1 (Joutosyke.Voima; 0 = keskiasento).</summary>
        public static double Koko(double aikaS, double voima) => KokoKerroin * (1 + SykeOsuus * Aalto(aikaS, voima));

        /// <summary>Hehkulevyn kokokerroin (suhteessa houkuttimen pisteeseen): sykkii pistettä enemmän.</summary>
        public static double HehkunKoko(double aikaS, double voima) => HehkuKerroin * (1 + 2 * SykeOsuus * Aalto(aikaS, voima));

        /// <summary>Hehkulevyn peitto: 0,32 ± puolet sykkeessä.</summary>
        public static double HehkunPeitto(double aikaS, double voima) => HehkuPeitto * (1 + 0.5 * Aalto(aikaS, voima));

        // ---- Näkyvyys ----

        /// <summary>Cesiumin laattojen (ja siis hunnun raster-kerroksen) piirtojono: geometria.</summary>
        public const int LaattaJono = 2000;
        /// <summary>Pisteiden jono (KaupunkiMerkit: läpinäkyvät + 1); hehkulevy pisteen alla samassa ryhmässä.</summary>
        public const int PisteJono = 3001, HehkuJono = 3000;

        /// <summary>Piirtyykö jono hunnun päällä (laattojen jälkeen).</summary>
        public static bool HunnunPaalla(int jono) => jono > LaattaJono;

        /// <summary>
        /// Näkyykö houkutin: aina, kun kaupunkimerkit ovat näkyvissä (ei portissa) ja linssin oma suodatin sallii kaupungin.
        /// Pelin kaupunkirajaus, korkeus, maa ja Euroopan loitonnus eivät piilota (omistaja: koko ajan näkyvissä).
        /// </summary>
        public static bool Nakyy(bool merkitNakyvat, bool porttiSumea, bool linssiSuodatinSallii) =>
            merkitNakyvat && !porttiSumea && linssiSuodatinSallii;

        /// <summary>
        /// Piilottavatko ruudun kalusteiden laatikot (UI ja erikoismallit, KaupunkiMerkit.Kalusteet) merkin: houkutinta EI
        /// (PT 11.10. 15.5x: iPhonen Euroopan näkymässä keski-alaosan näkymätön kalustelaatikko piilotti Alpit, Istanbulin ja
        /// Ateenan; käyttöliittymä piirtyy joka tapauksessa kartan päälle). Linssitilassa houkutin on tavallinen merkki.
        /// </summary>
        public static bool KalusteetPiilottavat(bool houkutin, bool linssiTila) => !(houkutin && !linssiTila);
    }
}
