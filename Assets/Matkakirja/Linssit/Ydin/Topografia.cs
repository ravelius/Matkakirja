// TOPOGRAFIALINSSI (web js/linssit/topografia.js, js/reliefipyramidi.js).
//
// Maailma maastona: täysvärinen reliefikartta, väri kertoo korkeuden ja
// varjo muodon (omistaja 4.8.2026: "täysväri siihen linssiin, mutta
// pidetään seepia normaalissa pelinäkymässä").
//
// Natiivissa linssi on yksi rasterikerros pallon pinnalla. Reliefi KORVAA
// pohjan eikä peitä sitä (omistaja 18.9.2026, Raamattu LISAYS 16 kohta 49):
// kaksi karttaa päällekkäin olisi kaksi hakua ja välähdys, kun seepialaatta
// ehtii ensin. Rannat, reitit ja nimiöt jäävät reliefin päälle; pelin
// elävät merkit (kaupunkien nimet ja pisteet, nappula, nostot) piiloon.
//
// Aineisto: ETOPO 2022 15″ (public domain), poltettu Karttasepän
// reliefipyramidiksi (Miller, matkakirja/reliefipyramidi/20260920/) ja
// siitä Web Mercator -sarjaksi Cesiumille (ks. ReliefiSarja).
//
// Avaus kuten webissä: tumma odotuspeite heti, pelin kerrokset piiloon
// peitteen alla, peite pois vasta kun näkyvän alueen reliefi on ruudulla
// (tai kerros ei tule). Sulkiessa kamera palaa sinne, mistä linssi avattiin.
using System;

namespace Matkakirja.Linssit
{
    public sealed class Topografia : ILinssi
    {
        /// <summary>Kerroksen avain KarttaKerroksissa.</summary>
        public const string Kerros = "topografia";
        /// <summary>Pelin pergamenttilaatat (KarttaKerrokset).</summary>
        public const string Pohja = "pohja";

        /// <summary>
        /// Reliefin Web Mercator -sarja (EPSG:3857 XYZ, 256 px, Z0–Z8), laskettu
        /// reliefipyramidista samalla kaavalla kuin pallon sarja pohjapyramidista
        /// (tools/tee-pallolaatat.mjs). Karttaseppä polttaa; osoite vahvistetaan
        /// polton jälkeen. Jos osoite ei vastaa, kerros luovuttaa ja pohja palaa.
        /// </summary>
        public static string ReliefiSarja =
            "https://media.matkakirja.app/matkakirja/reliefipyramidi/20260920/pallo/{z}/{x}/{y}.jpg";
        public const int ReliefiMaxTaso = 8;

        /// <summary>
        /// Viive pelin kerrosten piilotukselle (s): peitteen häivytys ehtii
        /// ruudulle ensin (web PORTIN_MARGINAALI_MS + kalvon siirtymä).
        /// </summary>
        public const double PortinViive = 0.2;

        /// <summary>Kameran paluuajo sulkiessa (web PALUUAJON_MS 900).</summary>
        public const float PaluuAjo = 0.9f;

        public static readonly LinssiTiedot TopografiaTiedot = new LinssiTiedot
        {
            Id = "topografia",
            Nimi = "Topografialinssi",
            Lyhyt = "Maailma maastona: väri kertoo korkeuden, varjo kertoo muodon.",
            Jarjestys = 10,
            Ikoni = "<path d=\"M2.4 19.2 9 7.4l4.1 7.3 2.3-3.4 6.2 7.9z\"/>"
                + "<path d=\"M6.7 14.8 8 13.6l1.2 1.1 1.3-1.2\"/>",
            Valokuva = true,
            Lahde = new Lahde
            {
                Aineisto = "NOAA NCEI ETOPO 2022 15 Arc-Second Global Relief Model (surface), doi:10.25921/fd45-gt74",
                Lisenssi = "Public domain (U.S. Government work)",
                Osoite = "https://www.ncei.noaa.gov/products/etopo-global-relief-model",
                Haettu = "2026-09-20",
            },
            // Värit tools/reliefivarit.mjs:n asteikosta (web SELITERIVIT); jos
            // asteikko muuttuu, nämä päivitetään käsin.
            Selite = new[]
            {
                new SeliteRivi("#e8e8eb", "Lumiraja, yli 6000 m"),
                new SeliteRivi("#baa498", "Paljas kivi"),
                new SeliteRivi("#94623e", "Korkea vuoristo"),
                new SeliteRivi("#b68452", "Vuoristo, 2200 m"),
                new SeliteRivi("#cdc470", "Ylänkö, 800 m"),
                new SeliteRivi("#3e6e42", "Alanko"),
                new SeliteRivi("#b9ab8c", "Mannerjalusta"),
                new SeliteRivi("#5d5340", "Valtameren pohja"),
                new SeliteRivi("#3f382a", "Syvänne, yli 6000 m"),
            },
        };

        ILinssiYmparisto y;
        Odotuspeite peite;
        Nakyma talteen;
        double avattu;
        bool porttiAsetettu;
        bool pohjaPalautettu;

        public LinssiTiedot Tiedot => TopografiaTiedot;
        public bool Auki { get; private set; }

        /// <summary>Mittareille ja testeille: peitteen tila ja syy.</summary>
        public Odotuspeite Peite => peite;
        public bool PorttiAsetettu => porttiAsetettu;

        public void Avaa(ILinssiYmparisto ymparisto)
        {
            if (Auki) return;
            y = ymparisto ?? throw new ArgumentNullException(nameof(ymparisto));
            Auki = true;
            porttiAsetettu = false;
            pohjaPalautettu = false;
            avattu = y.Aika;
            talteen = y.Kamera;

            // 1. Peite ensin: sama kehys, jossa valinta tehtiin.
            peite = new Odotuspeite(y);
            peite.Nosta();

            // 2. Reliefi pohjan tilalle. Pohjan haut loppuvat heti.
            y.Kerrokset.LisaaRasteri(Kerros, new Rasteri
            {
                Url = ReliefiSarja,
                Projektio = Projektio.WebMercator,
                MinTaso = 0,
                MaxTaso = ReliefiMaxTaso,
                Alfa = 1f,
            });
            y.Kerrokset.Nakyvyys(Pohja, false);

            // 3. Linssi on koko maailman kartta: loitonnus koko palloon asti.
            y.ZoomiKatto(y.KokoPallonKorkeus);
            y.MusiikkiPitoon(true);
        }

        public void Paivita()
        {
            if (!Auki) return;
            if (!porttiAsetettu && y.Aika - avattu >= PortinViive)
            {
                porttiAsetettu = true;
                y.Pelikerrokset(false);
            }
            var tila = y.Kerrokset.Tila(Kerros);
            // Reliefi ei tule: pelaaja näkee oman karttansa eikä tyhjää palloa.
            if (tila == KerrosTila.Luovutti && !pohjaPalautettu)
            {
                pohjaPalautettu = true;
                y.Kerrokset.Nakyvyys(Pohja, true);
            }
            peite.Paivita(tila);
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            // Peite pois ensin: sen alle ei saa jäädä sulkeutuvaa linssiä.
            peite.Laske();
            y.Kerrokset.Poista(Kerros);
            y.Kerrokset.Nakyvyys(Pohja, true);
            // Porttia ei palauteta, jos sitä ei ehditty asettaa.
            if (porttiAsetettu) y.Pelikerrokset(true);
            y.ZoomiKatto(null);
            y.MusiikkiPitoon(false);
            y.AjaKamera(talteen, y.VahennettyLiike ? 0f : PaluuAjo);
        }
    }
}
