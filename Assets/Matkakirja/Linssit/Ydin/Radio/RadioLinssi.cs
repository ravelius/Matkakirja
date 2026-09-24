// MAAILMANRADIO (web js/linssit/radio.js): linssi, joka ei piirrä kerrosta vaan vaihtaa
// kartan tilan. Kaupungit toimivat play-nappeina (yksi per maa), yksi lähetys kerrallaan,
// ja asemaa haetaan viritysäänellä vähimmäisajan verran ennen kuin se kuuluu.
//
// VIRITYS (web VIRITYKSEN_AJAT, omistaja 4.8.2026): 2,6 s vähintään, kolme vaihetta:
//   Siirtyma  1,25 s   asteikko liukuu uudelle asemalle
//   Haku      ≥ 1,03 s asteikko hakee; jatkuu, kunnes lähetys kuuluu
//   Lukittuu  0,32 s   ristihäivytys kohinasta lähetykseen (tasatehoinen sin/cos, 0,9 s)
// Aikakatkaisu 12 s → "Asema ei vastaa" (web VIRITYKSEN_AIKAKATKAISU_MS).
// Lähetys avataan heti mykkänä ja nostetaan vasta lukituksessa (web audio.volume 0).
//
// Ääni ja kartta ovat rajapintojen takana (Unity: AVPlayer-liitännäinen, viritysäänet,
// KaupunkiMerkit.NaytaVain/Korosta), joten koko tilakone testataan ilman editoria.
// UI (Natiivi-UI: kotelo, pistenäyttö, kartuscha) lukee TilaMuuttui-tapahtumaa.
//
// LISENSSILUOKAT (omistaja 23.9.2026 klo 21.1x): "sallittu" ja "epaselva" soitetaan,
// "kielletty" näyttää aseman nimen ja sivun (UI: "Avaa aseman sivu"), luokaton ei soi eikä
// linkitä missään tilassa (ei edes kehittäjätilassa).
using System;
using System.Collections.Generic;
using System.Linq;

namespace Matkakirja.Linssit.Radio
{
    /// <summary>Suora lähetys (Unity: AVPlayer). Avaa aloittaa soiton mykkänä.</summary>
    public interface IRadioVirta
    {
        void Avaa(string url, string tyyppi);
        void Sulje();
        /// <summary>Tauko (AVPlayer pause/play, web audio.pause): yhteys jää, data ei kulje mykistettynä.</summary>
        void Tauko(bool paalle);
        float Voimakkuus { set; }
        /// <summary>Kuuluuko lähetys (soitto on alkanut ja kulkee).</summary>
        bool Kuuluu { get; }
        /// <summary>Virheen syy (ei vastaa, katkesi), muuten null.</summary>
        string Virhe { get; }
    }

    /// <summary>Viritysääni (kohina, web viritin.js).</summary>
    public interface IViritin
    {
        void Aloita();
        /// <summary>Häivyttää pois annetussa ajassa (s).</summary>
        void Lopeta(double haiveS);
        float Voimakkuus { set; }
    }

    /// <summary>Kartan radiotila (Natiivisepän KaupunkiMerkit + IKamera.KaupunkiNapautettu).</summary>
    public interface IRadioKartta
    {
        /// <summary>Vain nämä kaupungit näkyviin; null = kaikki takaisin.</summary>
        void NaytaVain(ICollection<string> kaupungit);
        /// <summary>Soiva kaupunki korostettuna; null = ei korostusta.</summary>
        void Korosta(string kaupunki);
        event Action<string> KaupunkiNapautettu;
    }

    public enum RadioVaihe { Hiljaa, Viritys, Soi, Virhe, Linkki }

    /// <summary>
    /// Radiotilan kaupunkinappi pallolla (web radio.js pallonNapit): kaupunki, paikka, onko kanavaa
    /// (ei: katkoviivarengas ilman kolmiota) ja soiko se (punainen hehku, rengas ja kolmio).
    /// </summary>
    public sealed class RadioNappi
    {
        public string Kaupunki;
        public double Lat, Lon;
        public bool OnKanava, Soi;
    }
    public enum ViritysVaihe { Ei, Siirtyma, Haku, Lukittuu }

    /// <summary>Radion tila UI:lle (Natiivi-UI:n toive 23.9.).</summary>
    public sealed class RadioTila
    {
        public RadioVaihe Vaihe;
        public ViritysVaihe Viritys;
        /// <summary>Aseman maa (ISO3) = aseman tunnus; null kun mitään ei ole valittu.</summary>
        public string AsemaId, Nimi, Naytto, Maa, KaupunkiId, KaupunkiNimi, Viesti;
        /// <summary>Aseman oma sivu (Vaihe Linkki: UI:n "Avaa aseman sivu").</summary>
        public string Sivu;
        /// <summary>Soiko vara-äänite eikä suora lähetys.</summary>
        public bool Aanite;
        /// <summary>Pelaajan tauko (merkkivalo, web asetaTauko): lähetys ja viritysääni seis, tila säilyy.</summary>
        public bool Tauolla;
        /// <summary>Asteikon kohta 0…1 (asemat lännestä itään kaupunkinsa pituusasteen mukaan).</summary>
        public double Taajuus;
        /// <summary>Pistenäytön kaksi riviä (web TILAN_RIVIT ja aseman nimi).</summary>
        public string Rivi1, Rivi2;
    }

    public sealed class RadioLinssi : ILinssi
    {
        // Web js/linssit/radio.js ja radiosoitin.js.
        public const double VahimmaisaikaMs = 2600, SiirtymaMs = 1250, LukittuminenMs = 320;
        public const double LukitusAikaisintaanMs = VahimmaisaikaMs - LukittuminenMs;
        public const double AikakatkaisuMs = 12000;
        public const double RistihaivytysS = 0.6, LukituksenHaivytysS = 0.9, PysaytyksenHaiveS = 0.25;
        public const float OletusAani = 0.8f;

        public static double Nouseva(double x) => Math.Sin(Math.Clamp(x, 0, 1) * Math.PI / 2);
        public static double Vaistyva(double x) => Math.Cos(Math.Clamp(x, 0, 1) * Math.PI / 2);

        readonly RadioAineisto aineisto;
        readonly IRadioVirta virta;
        /// <summary>Soitin (lokia varten: RadioVirta.Kuvaus kertoo, miksi VU-taso puuttuu).</summary>
        public IRadioVirta Virta => virta;
        readonly IViritin viritin;
        readonly IRadioKartta kartta;
        readonly ISet<char> fontti;
        ILinssiYmparisto y;
        HashSet<string> nakyvat = new HashSet<string>();
        List<string> asteikko = new List<string>();   // kanavalliset kaupungit lännestä itään

        string soiva;            // kaupunki
        double alkoi, lukittuHetki;
        bool kuuluu, lukittu, aanite;
        float aani = OletusAani;

        /// <summary>Pelaajan kaupunki (näkyy aina radiotilassa), Pelikoodari asettaa.</summary>
        public Func<string> Sijainti = () => null;

        public LinssiTiedot Tiedot => aineisto.Tiedot;
        public bool Auki { get; private set; }
        public RadioTila Tila { get; private set; } = new RadioTila { Vaihe = RadioVaihe.Hiljaa, Rivi1 = "RADIO POIS", Rivi2 = "VALITSE KAUPUNKI" };
        public event Action<RadioTila> TilaMuuttui;

        /// <summary>Mitä asemalle tehdään sen lisenssiluokan mukaan (hybridimalli).</summary>
        public enum Toiminto { Soita, Aanite, Linkki, Ei }

        /// <summary>
        /// Omistajan päätös 23.9.2026 klo 21.1x (kumoaa aiemman): "sallittu" ja "epaselva" soivat,
        /// "kielletty" on linkki aseman sivulle (ilman sivua ei mitään), luokaton ei soi eikä
        /// linkitä. Vanha luokka "linkki" (koepaketti v16) käsitellään kuten kielletty.
        /// </summary>
        public static Toiminto ToimintoAsemalle(Asema a)
        {
            if (a == null) return Toiminto.Ei;
            switch (a.Luokka)
            {
                case "sallittu":
                case "epaselva":
                case "epäselvä":
                    // toimii false (Siirtosepän kättelytarkistus): virta ei aukea, ei soittoa eikä asteikkoa.
                    return string.IsNullOrEmpty(a.Url) || a.Toimii == false ? Toiminto.Ei : Toiminto.Soita;
                case "kielletty":
                case "linkki":
                    return string.IsNullOrEmpty(a.Sivu) ? Toiminto.Ei : Toiminto.Linkki;
                default:
                    return Toiminto.Ei;   // luokaton (kokoelma puuttuu) tai tuntematon luokka
            }
        }

        /// <summary>Kaupunkilehden luenta ei soi radion päällä (web luentaSallittu).</summary>
        public static bool LuentaSallittu { get; private set; } = true;

        public RadioLinssi(RadioAineisto aineisto, IRadioVirta virta, IViritin viritin, IRadioKartta kartta, ISet<char> fontti = null)
        {
            this.aineisto = aineisto ?? throw new ArgumentNullException(nameof(aineisto));
            this.virta = virta;
            this.viritin = viritin;
            this.kartta = kartta;
            this.fontti = fontti ?? new HashSet<char>();
        }

        /// <summary>
        /// WEBIN RADIOTILA (radio.js: "kaikki muu toiminto häviää"): kun UI piirtää omat napit (tosi),
        /// pelin kaupunkimerkit, nappula ja muut kerrokset piiloutuvat linssin ajaksi ja napautus
        /// tulee UI:lta SoitaKaupunki-kutsuna. Epätosi = vanha tapa (KaupunkiMerkit.NaytaVain).
        /// </summary>
        public bool OmatNapit;

        // ---- Mastot, hämärä, renkaat ja kamera-ajo (radiouudistus build 12, suunnitelma luvut 3–6) ----

        /// <summary>Mastojen piirto (Natiiviseppä); null = ei mastoja (vanha käännös, testit ilman piirtoa).</summary>
        public IRadioMastot Mastot3D;
        readonly List<Masto> mastot = new List<Masto>();
        readonly Dictionary<string, double> nousunViive = new Dictionary<string, double>();
        readonly MastonKirkkaus kirkkaus = new MastonKirkkaus();
        readonly List<double> renkaat = new List<double>(4);   // uudelleenkäyttö: ei roskaa joka kehys
        double avausHetki = double.NaN, soiAlku = double.NaN, edellinenKello = double.NaN;
        double? kallistusEnnen;
        // Kaareva kamera-ajo uudelle mastolle (Mastot.KameraAjonKesto, Kuminauha 0,25).
        double ajoAlku = double.NaN, ajoKesto, ajoLat0, ajoLon0, ajoLat1, ajoLon1, ajoKorkeus, ajoKorotus;

        public IReadOnlyList<Masto> MastoLista => mastot;

        /// <summary>
        /// POHJA (omistaja 24.9. klo 22.3x, havainnekuva A): radiolinssin kartta on värillinen topografia hämärässä,
        /// sama reliefisarja kuin topografialinssissä. Oma avain, ettei topografialinssin tila sekoitu.
        /// </summary>
        public const string PohjaKerros = "radio-topografia";
        bool pohjaVaihdettu, pohjaPalautettu;

        void VaihdaPohja()
        {
            if (y?.Kerrokset == null) return;
            y.Kerrokset.LisaaRasteri(PohjaKerros, new Rasteri
            {
                Url = Topografia.ReliefiSarja, Projektio = Projektio.WebMercator,
                MinTaso = 0, MaxTaso = Topografia.ReliefiMaxTaso, Alfa = 1f,
            });
            y.Kerrokset.Nakyvyys(Topografia.Pohja, false);
            pohjaVaihdettu = true;
            pohjaPalautettu = false;
        }

        void PalautaPohja()
        {
            if (!pohjaVaihdettu || y?.Kerrokset == null) return;
            y.Kerrokset.Poista(PohjaKerros);
            y.Kerrokset.Nakyvyys(Topografia.Pohja, true);
            pohjaVaihdettu = false;
        }

        void AvaaMastot()
        {
            mastot.Clear();
            nousunViive.Clear();
            var kam = y?.Kamera;
            foreach (var id in nakyvat)
            {
                var k = aineisto.Kaupunki(id);
                if (k == null) continue;
                var asema = aineisto.MaanAsema(k.Iso3);
                var toiminto = ToimintoAsemalle(asema);
                mastot.Add(new Masto
                {
                    Id = id, Asema = k.Iso3, Lat = k.Lat, Lon = k.Lon, Koko = Mastot.Koko(k),
                    Kanava = toiminto != Toiminto.Ei, Linkki = toiminto == Toiminto.Linkki,
                });
                // Lähimmät nousevat ensin: porras 0…0,6 s etäisyyden mukaan kameran keskipisteestä.
                double d = kam is Nakyma n ? Mastot.EtaisyysKm(n.Lat, n.Lon, k.Lat, k.Lon) : 0;
                nousunViive[id] = Mastot.NousunPorras * Math.Min(1, d / 3000);
            }
            avausHetki = Nyt;
            soiAlku = double.NaN;
            kirkkaus.Nollaa();
            if (Mastot3D != null)
            {
                Mastot3D.Mastot(mastot);
                Mastot3D.Hamara(0);
                VaihdaPohja();
            }
            // Kallistus 40° (Fable 24.9.: mastot näkyvät vain kallistetussa kamerassa); pelaaja saa muuttaa.
            if (y != null && Mastot3D != null)
            {
                var n0 = y.Kamera;
                kallistusEnnen = n0.Kallistus;
                y.AjaKamera(new Nakyma(n0.Lat, n0.Lon, n0.Korkeus, Mastot.RadionKallistus), y.VahennettyLiike ? 0f : (float)Mastot.AvausS,
                    Kamera.Kamerakayrat.Funktio(Kamera.Kayra.Pehmea), Mastot.RadionKallistus);
            }
        }

        // SULKU (Natiiviseppä 25.9.: ulosliuku ei näkynyt): hämärä ja reliefi liukuvat pois 0,8 s Pehmeä, pohja ja mastot
        // pois vasta lopuksi. Linssi on jo kiinni, joten LinssiOhjain ajaa PaivitaSulku-kutsuja jälkiajona.
        double sulkuAlku = double.NaN;
        ILinssiYmparisto sulkuY;

        /// <summary>Sulun ulosliuku käynnissä (Sulje on palannut, mutta hämärä ja reliefi vielä näkyvät).</summary>
        public bool Sulkeutuu => !double.IsNaN(sulkuAlku);

        /// <summary>Jälkiajo sulun jälkeen joka kehys; palauttaa false, kun liuku on valmis ja kaikki purettu.</summary>
        public bool PaivitaSulku()
        {
            if (!Sulkeutuu) return false;
            double s = sulkuY == null ? Mastot.SulkuS : (sulkuY.Aika * 1000 - sulkuAlku) / 1000;
            double t = sulkuY == null || sulkuY.VahennettyLiike ? 1 : Math.Clamp(s / Mastot.SulkuS, 0, 1);
            float h = (float)(1 - Kamera.Kamerakayrat.Pehmea(t));
            Mastot3D?.Hamara(h);
            foreach (var m in mastot) Mastot3D?.Nousu(m.Id, h);
            if (t < 1) return true;
            LopetaSulku();
            return false;
        }

        /// <summary>Sulku heti loppuun (uusi avaus kesken ulosliu'un tai kohtauksen purku).</summary>
        public void LopetaSulku()
        {
            if (!Sulkeutuu) return;
            var yEnnen = y;
            y = sulkuY;
            PalautaPohja();
            y = yEnnen;
            if (Mastot3D != null)
            {
                Mastot3D.Hamara(0);
                Mastot3D.Mastot(null);
            }
            mastot.Clear();
            sulkuAlku = double.NaN;
            sulkuY = null;
        }

        void SuljeMastot()
        {
            if (Mastot3D != null)
            {
                Mastot3D.Renkaat(0, 0, 0, Array.Empty<double>());
                Mastot3D.Valittu(null, 0);
                Mastot3D.YonValot(0, 0, 0);
                // Ulosliuku (PaivitaSulku); ilman mastoja ei ole mitään liu'utettavaa.
                sulkuAlku = Nyt;
                sulkuY = y;
                // Pergamentti takaisin heti reliefin alle (paikka 0, reliefi 1 peittää): se latautuu liu'un ajan
                // piilossa. Lopussa palautettuna se näkyi 2,4 s sumeana ja laikuittain (simulaattori 25.9. klo 01.2x).
                if (pohjaVaihdettu) y?.Kerrokset?.Nakyvyys(Topografia.Pohja, true);
            }
            else PalautaPohja();
            if (y != null && Mastot3D != null && kallistusEnnen is double k)
            {
                var n0 = y.Kamera;
                y.AjaKamera(new Nakyma(n0.Lat, n0.Lon, n0.Korkeus, k), y.VahennettyLiike ? 0f : (float)Mastot.SulkuS,
                    Kamera.Kamerakayrat.Funktio(Kamera.Kayra.Pehmea), k);
            }
            kallistusEnnen = null;
            if (Mastot3D == null) mastot.Clear();
            ajoAlku = avausHetki = soiAlku = double.NaN;
        }

        void AloitaKameraAjo(RadioKaupunki k)
        {
            if (y == null || Mastot3D == null || k == null) return;
            var n = y.Kamera;
            double d = Mastot.EtaisyysKm(n.Lat, n.Lon, k.Lat, k.Lon);
            if (y.VahennettyLiike)
            {
                y.AjaKamera(new Nakyma(k.Lat, k.Lon, n.Korkeus, Mastot.RadionKallistus), 0f, null, Mastot.RadionKallistus);
                return;
            }
            ajoAlku = Nyt;
            ajoKesto = Mastot.KameraAjonKesto(d);
            (ajoLat0, ajoLon0, ajoLat1, ajoLon1) = (n.Lat, n.Lon, k.Lat, k.Lon);
            ajoKorkeus = n.Korkeus;
            ajoKorotus = Mastot.KaarenKorotus(d);
        }

        /// <summary>Pelaajan veto tai nipistys (PalloKierto.PelaajanEle): kamera-ajo keskeytyy heti (suunnitelma luku 6).</summary>
        public void PelaajanEle() => ajoAlku = double.NaN;

        /// <summary>Onko kaareva kamera-ajo menossa.</summary>
        public bool KameraAjossa => !double.IsNaN(ajoAlku);

        /// <summary>Joka kehys (Paivita): hämärä, nousu, valittu masto, renkaat, yövalot ja kamera-ajo.</summary>
        void PaivitaMastot()
        {
            double nyt = Nyt, dt = double.IsNaN(edellinenKello) ? 0 : (nyt - edellinenKello) / 1000;
            edellinenKello = nyt;
            if (Mastot3D == null || !Auki || double.IsNaN(avausHetki)) return;
            // Reliefi ei tule (osoite ei vastaa): pelaaja näkee oman karttansa eikä tyhjää palloa (kuten topografialinssi).
            if (pohjaVaihdettu && !pohjaPalautettu && y.Kerrokset.Tila(PohjaKerros) == KerrosTila.Luovutti)
            {
                pohjaPalautettu = true;
                y.Kerrokset.Nakyvyys(Topografia.Pohja, true);
            }
            double s = (nyt - avausHetki) / 1000;
            bool vahennetty = y?.VahennettyLiike ?? false;
            Mastot3D.Hamara((float)(vahennetty ? 1 : Kamera.Kamerakayrat.Pehmea(Math.Clamp(s / Mastot.AvausS, 0, 1))));
            if (s <= Mastot.NousunPorras + Mastot.NousuS + 0.1)
                foreach (var m in mastot)
                {
                    double t = vahennetty ? 1 : Math.Clamp((s - nousunViive[m.Id]) / Mastot.NousuS, 0, 1);
                    Mastot3D.Nousu(m.Id, (float)Kamera.Kamerakayrat.Arvo(Kamera.Kayra.Nousu, t));
                }

            bool soi = Tila?.Vaihe == RadioVaihe.Soi && soiva != null;
            var k = soi ? aineisto.Kaupunki(soiva) : null;
            if (soi && double.IsNaN(soiAlku)) soiAlku = nyt;
            if (!soi) soiAlku = double.NaN;
            if (k != null)
            {
                double vu = Tauolla ? 0 : Mittari.Osuus;
                Mastot3D.Valittu(soiva, (float)kirkkaus.Paivita(vu, dt));
                double sLukosta = (nyt - soiAlku) / 1000;
                var koko = Mastot.Koko(k);
                bool linkki = ToimintoAsemalle(aineisto.MaanAsema(k.Iso3)) == Toiminto.Linkki;
                renkaat.Clear();
                if (!linkki && !vahennetty) Mastot.Renkaat(sLukosta, renkaat);
                Mastot3D.Renkaat(k.Lat, k.Lon, Mastot.KuuluvuusKm(koko), renkaat);
                Mastot3D.YonValot(k.Lat, k.Lon, (float)Kamera.Kamerakayrat.Pehmea(Math.Clamp(sLukosta / Mastot.ValojenSyttyminen, 0, 1)));
            }
            else
            {
                kirkkaus.Nollaa();
                Mastot3D.Valittu(null, 0);
                Mastot3D.Renkaat(0, 0, 0, Array.Empty<double>());
            }

            if (!double.IsNaN(ajoAlku) && y != null)
            {
                double t = Math.Clamp((nyt - ajoAlku) / 1000 / ajoKesto, 0, 1);
                double u = Kamera.Kamerakayrat.Arvo(Kamera.Kayra.Kuminauha, t, 0.25);
                var (lat, lon) = Mastot.Isoympyra(ajoLat0, ajoLon0, ajoLat1, ajoLon1, u);
                double korkeus = ajoKorkeus * (1 + (ajoKorotus - 1) * Math.Sin(Math.PI * t));
                y.AjaKamera(new Nakyma(lat, lon, korkeus, Mastot.RadionKallistus), 0f, null, Mastot.RadionKallistus);
                if (t >= 1) ajoAlku = double.NaN;
            }
        }
        /// <summary>Napit muuttuivat (avaus, soiva kaupunki, sulku): UI piirtää Napit uudelleen.</summary>
        public event Action NapitMuuttuivat;

        /// <summary>Radiotilan napit (web pallonNapit); tyhjä, kun linssi on kiinni.</summary>
        public IReadOnlyList<RadioNappi> Napit => !Auki ? Array.Empty<RadioNappi>() : nakyvat
            .Select(id => (id, k: aineisto.Kaupunki(id)))
            .Where(x => x.k != null)
            .Select(x => new RadioNappi
            {
                Kaupunki = x.id, Lat = x.k.Lat, Lon = x.k.Lon,
                OnKanava = ToimintoAsemalle(aineisto.MaanAsema(x.k.Iso3)) != Toiminto.Ei,
                Soi = x.id == soiva,
            }).ToList();

        void Korostus(string kaupunki)
        {
            kartta?.Korosta(kaupunki);
            NapitMuuttuivat?.Invoke();
        }

        /// <summary>Radiotilassa näkyvät kaupungit (yksi per maa).</summary>
        public IReadOnlyCollection<string> Nakyvat => nakyvat;
        /// <summary>Asteikon asemat (kaupunki-id:t) lännestä itään.</summary>
        public IReadOnlyList<string> Asteikko => asteikko;
        public IReadOnlyList<Asema> Asemat => aineisto.Asemat.Values.ToList();
        /// <summary>Maan asema (kartuscha).</summary>
        public Asema MaanAsema(string iso3) => aineisto.MaanAsema(iso3);
        /// <summary>Radiotilan kaupunki (nimi, maa, sijainti) UI:lle.</summary>
        public RadioKaupunki Kaupunki(string id) => aineisto.Kaupunki(id);
        /// <summary>Maan nimi näytölle (paketin maat), null jos ei tiedossa.</summary>
        public string MaanNimi(string iso3) => iso3 != null && aineisto.Maat.TryGetValue(iso3, out var n) ? n : null;

        /// <summary>Pelaajan tauko päällä (web tauolla).</summary>
        public bool Tauolla { get; private set; }
        double tauonAlku;

        /// <summary>
        /// Merkkivalon tauko (web asetaTauko): TAUKO EIKÄ MYKISTYS — lähetys pysähtyy (AVPlayer pause),
        /// viritysääni vaikenee, ja tila (asema, vaihe, asteikko) säilyy. Virityksen ajastimet
        /// seisovat tauon ajan, joten tauko ei tuota aikakatkaisua. Uusi asema tai STOP purkaa tauon.
        /// </summary>
        public void Tauko(bool paalle)
        {
            if (!Auki || Tauolla == paalle) return;
            Tauolla = paalle;
            if (paalle) tauonAlku = Nyt;
            else
            {
                double kesto = Nyt - tauonAlku;
                alkoi += kesto;
                lukittuHetki += kesto;
            }
            if (viritin != null) viritin.Voimakkuus = paalle ? 0 : aani;
            virta?.Tauko(paalle);
            if (Tila != null) { Tila.Tauolla = paalle; TilaMuuttui?.Invoke(Tila); }
        }

        public float Voimakkuus
        {
            get => aani;
            set { aani = Math.Clamp(value, 0, 1); if (lukittu && virta != null) virta.Voimakkuus = aani; if (viritin != null && !Tauolla) viritin.Voimakkuus = aani; }
        }

        double Nyt => (y?.Aika ?? 0) * 1000;

        public void Avaa(ILinssiYmparisto ymparisto)
        {
            if (Auki) return;
            LopetaSulku();
            Auki = true;
            y = ymparisto;
            LuentaSallittu = false;
            nakyvat = aineisto.RadionKaupungit(Sijainti?.Invoke());
            asteikko = nakyvat.Where(id => ToimintoAsemalle(aineisto.MaanAsema(aineisto.Kaupunki(id)?.Iso3)) != Toiminto.Ei)
                .OrderBy(id => aineisto.Kaupunki(id).Lon).ThenBy(id => id, StringComparer.Ordinal).ToList();
            y?.MusiikkiPitoon(true);
            if (OmatNapit) y?.Pelikerrokset(false);
            if (kartta != null)
            {
                kartta.NaytaVain(OmatNapit ? (ICollection<string>)Array.Empty<string>() : nakyvat);
                kartta.KaupunkiNapautettu += SoitaKaupunki;
            }
            // Mastot ennen nappeja: UI lukee MastoLista-koon napin osuma-alueen nostoon.
            AvaaMastot();
            NapitMuuttuivat?.Invoke();
            if (viritin != null) viritin.Voimakkuus = aani;
            AsetaHiljaa();
        }

        public void Sulje()
        {
            if (!Auki) return;
            LopetaAani(PysaytyksenHaiveS);
            SuljeMastot();
            Auki = false;
            Mittari.Nollaa();
            mittarinKello = double.NaN;
            LuentaSallittu = true;
            if (kartta != null)
            {
                kartta.KaupunkiNapautettu -= SoitaKaupunki;
                Korostus(null);
                kartta.NaytaVain(null);
            }
            if (OmatNapit) y?.Pelikerrokset(true);
            NapitMuuttuivat?.Invoke();
            y?.MusiikkiPitoon(false);
            AsetaHiljaa();
            y = null;
        }

        /// <summary>STOP: lähetys pois, radiotila jää päälle (web pysayta).</summary>
        public void Keskeyta()
        {
            if (!Auki) return;
            LopetaAani(PysaytyksenHaiveS);
            AsetaHiljaa();
        }

        /// <summary>Maan asema soimaan (kartuscha, UI:n asemalista): maan radiotilan kaupunki.</summary>
        public void Viritä(string iso3)
        {
            var kaupunki = nakyvat.FirstOrDefault(id => aineisto.Kaupunki(id)?.Iso3 == iso3);
            if (kaupunki != null) SoitaKaupunki(kaupunki);
        }

        /// <summary>Asteikon veto: lähin asema kohtaan 0…1.</summary>
        public void Taajuus(double kohta)
        {
            if (asteikko.Count == 0) return;
            int i = (int)Math.Round(Math.Clamp(kohta, 0, 1) * (asteikko.Count - 1));
            SoitaKaupunki(asteikko[i]);
        }

        /// <summary>Kaupungin napautus (web soitaKaupunki).</summary>
        public void SoitaKaupunki(string kaupunki)
        {
            if (!Auki || kaupunki == null) return;
            var k = aineisto.Kaupunki(kaupunki);
            var asema = aineisto.MaanAsema(k?.Iso3);
            var toiminto = ToimintoAsemalle(asema);
            if (toiminto == Toiminto.Linkki)
            {
                LopetaAani(0);
                soiva = null;
                Korostus(kaupunki);
                Aseta(RadioVaihe.Linkki, ViritysVaihe.Ei, kaupunki, asema, null);
                return;
            }
            if (toiminto == Toiminto.Ei)
            {
                LopetaAani(0);
                soiva = null;
                Korostus(null);
                Aseta(RadioVaihe.Virhe, ViritysVaihe.Ei, kaupunki, null, asema == null ? "Ei asemaa" : "Ei lähetystä");
                return;
            }
            if (soiva == kaupunki && Tila.Vaihe != RadioVaihe.Virhe) return;

            LopetaAani(RistihaivytysS, viritysJatkuu: true);
            soiva = kaupunki;
            alkoi = Nyt;
            kuuluu = false;
            lukittu = false;
            aanite = toiminto == Toiminto.Aanite;
            virta?.Avaa(aanite ? asema.VaraUrl : asema.Url, aanite ? "mp3" : asema.Tyyppi);
            if (virta != null) virta.Voimakkuus = 0;
            viritin?.Aloita();
            Korostus(kaupunki);
            Aseta(RadioVaihe.Viritys, ViritysVaihe.Siirtyma, kaupunki, asema, null);
            AloitaKameraAjo(k);
        }

        /// <summary>VU-mittari (BUILD 7): päivittyy joka kehys lähetyksen todellisesta tasosta (IRadioTaso) tai varakuviosta.</summary>
        // ---- Viivaimen veto (radiouudistus build 12, suunnitelma luku 7) ----

        bool vetaa;
        /// <summary>Viivainta vedetään sormella (UI: RadioNakyma).</summary>
        public bool Vetaa => vetaa;

        /// <summary>Veto alkaa: rahina (viritysääni) käyntiin mykkänä, soiva asema jää kuulumaan.</summary>
        public void VetoAlkaa()
        {
            if (!Auki || vetaa) return;
            if (Tauolla) Tauko(false);
            vetaa = true;
            if (viritin != null) { viritin.Voimakkuus = 0; viritin.Aloita(); }
        }

        /// <summary>
        /// Viisari on e asemaväliä lähimmästä asemasta (0 … 0,5): rahina ja soivan aseman taso tasatehoisena
        /// parina (Mastot.Rahina). Soiva asema hiljenee, kun viisari lähtee siltä.
        /// </summary>
        public void Veto(double e)
        {
            if (!vetaa) return;
            var (lahetys, rahina) = Mastot.Rahina(e);
            if (viritin != null) viritin.Voimakkuus = (float)(aani * rahina);
            if (lukittu && virta != null) virta.Voimakkuus = VirranTaso = (float)(aani * lahetys);
        }

        /// <summary>
        /// Irrotus: viisari lukittuu lähimpään asemaan. Sama asema → lähetys nousee takaisin lukituksen käyrällä
        /// (0,9 s) ja rahina väistyy; uusi asema → tavallinen viritys, jonka rahina on jo käynnissä.
        /// </summary>
        public void VetoLoppuu(string lahin)
        {
            if (!vetaa) return;
            vetaa = false;
            if (lahin != null && lahin == soiva && lukittu)
            {
                // Lukituksen ramppi jatkuu nykyisestä tasosta (Nouseva⁻¹), ettei taso hyppää.
                double nyt = virta == null || aani <= 0 ? 0 : Math.Clamp(VirranTaso / aani, 0, 1);
                double osuus = Math.Asin(nyt) * 2 / Math.PI;
                lukittuHetki = Nyt - osuus * LukituksenHaivytysS * 1000;
                viritin?.Lopeta(LukituksenHaivytysS);
                return;
            }
            if (viritin != null) viritin.Voimakkuus = aani;
            if (lahin != null && lahin != soiva) { SoitaKaupunki(lahin); return; }
            // Ei asemaa eikä soivaa: rahina pois. Sama asema kesken virityksen: viritys jatkuu.
            if (soiva == null) viritin?.Lopeta(PysaytyksenHaiveS);
        }

        /// <summary>Soivan lähetyksen viimeksi asetettu taso (lukituksen ramppi tai veto).</summary>
        float VirranTaso;

        public readonly VuMittari Mittari = new VuMittari();
        double mittarinKello = double.NaN;

        void PaivitaMittari()
        {
            double t = y?.Aika ?? 0;
            double dt = double.IsNaN(mittarinKello) ? 0 : t - mittarinKello;
            mittarinKello = t;
            bool soi = Auki && !Tauolla && Tila?.Vaihe == RadioVaihe.Soi && virta != null && virta.Kuuluu;
            double taso = virta is IRadioTaso rt ? rt.Taso : -1;
            Mittari.Paivita(dt, taso, soi, aani, t, y?.VahennettyLiike ?? false);
        }

        public void Paivita()
        {
            PaivitaMittari();
            PaivitaMastot();
            if (!Auki || soiva == null || Tauolla) return;
            double t = Nyt - alkoi;
            if (Tila.Vaihe == RadioVaihe.Virhe) return;

            if (virta?.Virhe is string syy) { Virhe(syy); return; }
            if (!kuuluu && virta != null && virta.Kuuluu) kuuluu = true;

            if (Tila.Vaihe == RadioVaihe.Viritys)
            {
                if (Tila.Viritys == ViritysVaihe.Siirtyma && t >= SiirtymaMs) Vaihe(ViritysVaihe.Haku);
                if (!lukittu && kuuluu && t >= LukitusAikaisintaanMs && !vetaa)
                {
                    lukittu = true;
                    lukittuHetki = Nyt;
                    viritin?.Lopeta(LukituksenHaivytysS);
                    Vaihe(ViritysVaihe.Lukittuu);
                }
                else if (!lukittu && t >= AikakatkaisuMs) { Virhe("Asema ei vastaa"); return; }
            }

            if (lukittu && !vetaa)
            {
                double osuus = (Nyt - lukittuHetki) / (LukituksenHaivytysS * 1000);
                VirranTaso = (float)(aani * Nouseva(osuus));
                if (virta != null) virta.Voimakkuus = VirranTaso;
                if (Tila.Vaihe == RadioVaihe.Viritys && Nyt - lukittuHetki >= LukittuminenMs)
                    Aseta(RadioVaihe.Soi, ViritysVaihe.Ei, soiva, aineisto.MaanAsema(aineisto.Kaupunki(soiva)?.Iso3), null);
            }
        }

        /// <summary>Virhe (virran oma tai aikakatkaisu) juuri ennen kuin virta suljetaan: diagnoosi lokiin.</summary>
        public event Action<string> VirheSyntyy;

        void Virhe(string syy)
        {
            VirheSyntyy?.Invoke(syy);
            var kaupunki = soiva;
            LopetaAani(0);
            Aseta(RadioVaihe.Virhe, ViritysVaihe.Ei, kaupunki, aineisto.MaanAsema(aineisto.Kaupunki(kaupunki)?.Iso3), syy);
        }

        void LopetaAani(double haiveS, bool viritysJatkuu = false)
        {
            // Uusi asema, STOP tai sulku purkaa tauon (uusi valinta = soita).
            if (Tauolla) { Tauolla = false; if (viritin != null) viritin.Voimakkuus = aani; }
            virta?.Sulje();
            if (!viritysJatkuu) viritin?.Lopeta(haiveS);
            kuuluu = lukittu = false;
            if (!viritysJatkuu) { soiva = null; Korostus(null); }
        }

        void AsetaHiljaa()
        {
            Tila = new RadioTila { Vaihe = RadioVaihe.Hiljaa, Rivi1 = "RADIO POIS", Rivi2 = "VALITSE KAUPUNKI" };
            TilaMuuttui?.Invoke(Tila);
        }

        void Vaihe(ViritysVaihe v)
        {
            Tila.Viritys = v;
            TilaMuuttui?.Invoke(Tila);
        }

        void Aseta(RadioVaihe vaihe, ViritysVaihe viritys, string kaupunki, Asema asema, string viesti)
        {
            var k = aineisto.Kaupunki(kaupunki);
            var iso = k?.Iso3;
            aineisto.Maat.TryGetValue(iso ?? "", out var maa);
            string naytto = asema == null ? null : RadioAineisto.NaytonNimi(asema.Nimi, maa, iso, fontti);
            bool linkki = vaihe == RadioVaihe.Linkki;
            // Web radiosoitin rivit(): asema = lyhennetty näyttönimi, paikka = "KAUPUNKI · MAA".
            string asemaRivi = (naytto ?? asema?.Nimi ?? "").ToUpperInvariant();
            string paikka = string.Join(" · ", new[] { k?.Nimi, maa }.Where(x => !string.IsNullOrEmpty(x))).ToUpperInvariant();
            int i = kaupunki == null ? -1 : asteikko.IndexOf(kaupunki);
            Tila = new RadioTila
            {
                Vaihe = vaihe, Viritys = viritys, AsemaId = asema?.Iso3, Nimi = asema?.Nimi, Naytto = naytto,
                Maa = maa, KaupunkiId = kaupunki, KaupunkiNimi = k?.Nimi, Viesti = viesti,
                Sivu = linkki ? asema?.Sivu : null, Aanite = aanite && !linkki && vaihe != RadioVaihe.Virhe,
                Taajuus = i < 0 || asteikko.Count < 2 ? (asteikko.Count == 1 && i == 0 ? 0.5 : Tila?.Taajuus ?? 0.5) : i / (double)(asteikko.Count - 1),
                Rivi1 = vaihe switch
                {
                    RadioVaihe.Viritys => "VIRITTÄÄ...",
                    RadioVaihe.Virhe => "EI KUULU",
                    RadioVaihe.Soi => asemaRivi.Length > 0 ? asemaRivi : "SUORA LÄHETYS",
                    _ => asemaRivi,
                },
                // Virittäessä ja virheessä asema, soidessa ja linkissä paikka (web: virhe → asema || '').
                Rivi2 = vaihe == RadioVaihe.Soi || linkki ? paikka : asemaRivi,
                Tauolla = Tauolla,
            };
            TilaMuuttui?.Invoke(Tila);
        }
    }
}
