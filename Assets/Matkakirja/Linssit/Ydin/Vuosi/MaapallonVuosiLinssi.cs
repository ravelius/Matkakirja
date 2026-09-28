// MAAPALLON VUOSI -LINSSI (web js/linssit/maapallon-vuosi.js, Siirtoseppä PR #3558; omistaja 28.9.2026 klo 13.17,
// loki "MAAPALLON VUOSI -LINSSI TYÖN ALLE NYT"). Työnimi. TILA: HIOMASSA — tiedoissa Kesken, eikä linssillä ole
// avauskynnystä (Linssirekisteri.Avauskynnykset), joten pelaaja ei näe sitä; kehittäjätilassa se on valitsimessa.
//
// Pyöritettävä maapallo kuukausi kerrallaan: pohjana NASA Blue Marble Next Generation -kuukausikuvat (BMNG 2004, PD;
// ämpärin data/bmng/<kk>-4096.jpg, tasakulmainen 4096 × 2048), kuukausi vaihtuu pehmeällä ristihäivytyksellä, ja
// päälle voi valita datakerroksen Karttasepän datakokeesta (NASA GIBS / FIRMS 2024, PD: kasvillisuus, lumi, meren
// lämpötila, sade, pilvet, palot; 4096 × 2048 PNG omalla väriasteikolla ja alfalla). Kerrosluettelo on ämpärissä
// (KerrosLuettelo), joten uusi kerros ei vaadi koodimuutosta.
//
// WEBIN ARVOT (sovittu Siirtosepän kanssa 28.9.): häivytys 650 ms smoothstep, reduced motion vaihtaa suoraan; toisto
// vaihtaa kuukautta 1 400 ms:n välein; kerroksen oletuspeitto 0,7, ja kerros häivytetään kuukauden vaihtuessa samoin
// kuin pohja. Natiivin erot: häivytys alkaa vasta, kun uusi kuva on ladattu (webissä kello käy valinnasta), ja
// toisto odottaa edellisen häivytyksen loppuun, joten hidas verkko ei hypi kuukausien yli. Kerroksen vaihto
// häivytetään samalla käyrällä (webissä suora vaihto).
//
// Natiivissa pallo on pelin oma Cesium-pallo, jonka päälle Unity-puoli (VuosiKuori) piirtää kuukausikuoren
// (IVuosiKuori). Linssi ei lataa kuvia itse: se kertoo kuorelle, mitkä osoitteet ovat nyt näkyvissä ja millä
// painoilla, ja kysyy kuorelta, onko kuva valmis.
using System;
using System.Collections.Generic;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Vuosi
{
    /// <summary>Kerrosluettelon rivi (web lueKerrosluettelo): osoitteessa {kk} = 01…12.</summary>
    public sealed class VuosiKerros
    {
        public string Tunnus, Nimi, Lahde, Lisenssi, Osoite;
    }

    /// <summary>
    /// Kuukausikuori pallon päällä (Unity: VuosiKuori). Kuvat tunnistetaan osoitteella; kuori lataa ja pitää
    /// välimuistia, linssi vain pyytää.
    /// </summary>
    public interface IVuosiKuori
    {
        /// <summary>Kuori näkyviin tai piiloon.</summary>
        void Nayta(bool nakyvissa);
        /// <summary>Onko kuva ladattu (pyytää latauksen, jos ei ole vielä pyydetty).</summary>
        bool Valmis(string osoite);
        /// <summary>Luovuttiko lataus (osoite ei vastaa).</summary>
        bool Epaonnistui(string osoite);
        /// <summary>Lataus etukäteen (seuraava kuukausi toistoa varten).</summary>
        void Esilataa(string osoite);
        /// <summary>
        /// Kehyksen yhdistelmä: pohja A, pohja B painolla t, kerroskuvat K1 ja K2 omilla alfoillaan (0 = ei piirretä).
        /// Osoite null = ei kuvaa siinä paikassa.
        /// </summary>
        void Aseta(string pohjaA, string pohjaB, float t, string kerros1, float alfa1, string kerros2, float alfa2);
    }

    /// <summary>
    /// Ristihäivytin kahden kuvan välillä: uusi kohde alkaa häivyttyä vasta, kun sen kuva on valmis. Kesken
    /// häivytyksen tullut uusi kohde lähtee siitä, mikä ruudulla nyt pääosin näkyy (web asetaKuukausi).
    /// </summary>
    public sealed class Haivytin
    {
        public string Nykyinen { get; private set; }
        /// <summary>Kohde, johon häivytetään (null = tyhjään, esim. kerros pois); merkitsevä vain, kun Kesken.</summary>
        public string Tuleva { get; private set; }
        /// <summary>Tulevan paino 0…1 (smoothstep); 1, kun häivytys ei ole kesken.</summary>
        public float T { get; private set; } = 1f;
        public bool Kesken { get; private set; }
        double alku = -1;

        /// <summary>Suoraan kohteeseen ilman häivytystä (linssin avaus).</summary>
        public void Nollaa(string kohde)
        {
            Nykyinen = kohde;
            Tuleva = null;
            Kesken = false;
            T = 1f;
            alku = -1;
        }

        /// <summary>Uusi kohde (null = tyhjään).</summary>
        public void Aseta(string kohde)
        {
            if (Kesken)
            {
                if (kohde == Tuleva) return;
                if (T >= 0.5f) Nykyinen = Tuleva;
            }
            if (kohde == Nykyinen) { Nollaa(kohde); return; }
            Tuleva = kohde;
            Kesken = true;
            T = 0f;
            alku = -1;
        }

        /// <summary>Etene: kello käy, kun tuleva on valmis (tyhjä on aina valmis); kesto 0 = suora vaihto.</summary>
        public void Paivita(double aika, Func<string, bool> valmis, double kestoS)
        {
            if (!Kesken) return;
            if (Tuleva != null && !valmis(Tuleva)) return;
            if (alku < 0) alku = aika;
            double x = kestoS > 0 ? Math.Max(0, Math.Min(1, (aika - alku) / kestoS)) : 1;
            T = (float)(x * x * (3 - 2 * x));
            if (x >= 1) Nollaa(Tuleva);
        }
    }

    public sealed class MaapallonVuosiLinssi : ILinssi
    {
        public const string Id = "maapallon-vuosi";
        public const string Juuri = "https://media.matkakirja.app/";
        /// <summary>Kerrosluettelo ämpärissä (Karttasepän vienti omistajan luvalla, web KERROSLUETTELO).</summary>
        public const string KerrosLuettelo = "data/maapallon-vuosi/kerrokset.json";
        public const double HaivytysS = 0.65;
        public const double ToistonKuukausiS = 1.4;
        public const float OletusPeitto = 0.7f;
        /// <summary>Aloitusnäkymä (web pointOfView lat 30, lng 15); korkeus = koko pallo ruudussa.</summary>
        public const double AloitusLat = 30, AloitusLon = 15;
        /// <summary>Avausajo ja paluu sulkiessa (s).</summary>
        public const float Ajo = 0.9f;
        /// <summary>Peite pois viimeistään tässä, vaikka pohja ei tulisi (s).</summary>
        public const double PeitteenKatto = 8;

        public static readonly string[] Kuukaudet =
            { "tammikuu", "helmikuu", "maaliskuu", "huhtikuu", "toukokuu", "kesäkuu",
              "heinäkuu", "elokuu", "syyskuu", "lokakuu", "marraskuu", "joulukuu" };

        public static readonly LinssiTiedot VuosiTiedot = new LinssiTiedot
        {
            Id = Id,
            Nimi = "Maapallon vuosi",
            Lyhyt = "Pyöritä maapalloa kuukausi kerrallaan: lumiraja, vihertyminen ja jäät vuoden kierrossa.",
            Jarjestys = 60,
            Ikoni = "<circle cx=\"12\" cy=\"12\" r=\"5.5\"/>"
                + "<path d=\"M6.5 12h11M12 6.5c-2 1.6-2 9.4 0 11M12 6.5c2 1.6 2 9.4 0 11\"/>"
                + "<path d=\"M3 12a9 9 0 0 1 9-9M21 12a9 9 0 0 1-9 9\" stroke-dasharray=\"1.5 2.5\"/>",
            Valokuva = true,
            Kesken = true,
            Lahde = new Lahde
            {
                Aineisto = "NASA Blue Marble Next Generation (2004) -kuukausikuvat; datakerrokset NASA GIBS ja FIRMS (2024)",
                Lisenssi = "Public domain (NASA)",
                Osoite = "https://visibleearth.nasa.gov/collection/1484/blue-marble",
                Haettu = "2026-09-28",
            },
        };

        /// <summary>Kuukausi 1–12 mistä tahansa kokonaisluvusta (13 → 1, 0 → 12).</summary>
        public static int Kuukausi(int kk) => ((kk - 1) % 12 + 12) % 12 + 1;

        /// <summary>BMNG-kuukausikuva: kk 1–12 → data/bmng/01-4096.jpg.</summary>
        public static string KuukaudenPohja(int kk, string juuri = Juuri) =>
            juuri + "data/bmng/" + Kuukausi(kk).ToString("00") + "-4096.jpg";

        /// <summary>Kerroksen kuukausikuva luettelon osoitekaavasta; suhteellinen polku luettelon juuresta.</summary>
        public static string KerroksenKuva(VuosiKerros k, int kk, string juuri = Juuri)
        {
            if (k?.Osoite == null) return null;
            string polku = k.Osoite.Replace("{kk}", Kuukausi(kk).ToString("00"));
            if (polku.StartsWith("http://", StringComparison.Ordinal) || polku.StartsWith("https://", StringComparison.Ordinal)
                || polku.StartsWith("file://", StringComparison.Ordinal)) return polku;
            return juuri + polku.TrimStart('/');
        }

        /// <summary>Luettelon tarkistus (web lueKerrosluettelo): vain kelvolliset rivit, muut ohitetaan ja kerrotaan.</summary>
        public static List<VuosiKerros> LueKerrosluettelo(object json, List<string> ohitetut = null)
        {
            var tulos = new List<VuosiKerros>();
            var juuri = MiniJson.ObjektiTaiNull(json);
            if (juuri == null) return tulos;
            foreach (var rivi in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(juuri, "kerrokset")))
            {
                var o = MiniJson.ObjektiTaiNull(rivi);
                string tunnus = o == null ? null : MiniJson.Teksti(o, "tunnus"), nimi = o == null ? null : MiniJson.Teksti(o, "nimi"),
                    osoite = o == null ? null : MiniJson.Teksti(o, "osoite");
                if (tunnus == null || nimi == null || osoite == null || !osoite.Contains("{kk}"))
                {
                    ohitetut?.Add(tunnus ?? "?");
                    continue;
                }
                tulos.Add(new VuosiKerros { Tunnus = tunnus, Nimi = nimi, Osoite = osoite,
                    Lahde = MiniJson.Teksti(o, "lahde"), Lisenssi = MiniJson.Teksti(o, "lisenssi") });
            }
            return tulos;
        }

        readonly IVuosiKuori kuori;
        readonly Func<int, string> pohja;
        ILinssiYmparisto y;
        Nakyma talteen;
        double avattu, seuraavaAskel;
        bool peiteYlhaalla, peiteLaskettu;
        readonly Haivytin pohjat = new Haivytin(), kerrokset = new Haivytin();

        /// <param name="kuori">Kuukausikuori (Unity: VuosiKuori; testeissä vale).</param>
        /// <param name="pohja">Kuukauden pohjakuvan osoite (oletus ämpärin BMNG).</param>
        public MaapallonVuosiLinssi(IVuosiKuori kuori, Func<int, string> pohja = null)
        {
            this.kuori = kuori ?? throw new ArgumentNullException(nameof(kuori));
            this.pohja = pohja ?? (kk => KuukaudenPohja(kk));
        }

        public LinssiTiedot Tiedot => VuosiTiedot;
        public bool Auki { get; private set; }

        /// <summary>Datakerrokset luettelosta (sovitin asettaa, kun luettelo on haettu; tyhjä = vain pohja).</summary>
        public IReadOnlyList<VuosiKerros> Kerrokset { get; private set; } = Array.Empty<VuosiKerros>();
        /// <summary>Luettelon suhteellisten osoitteiden juuri (web kerrosJuuri).</summary>
        public string KerrosJuuri = Juuri;

        /// <summary>Valittu kuukausi 1–12.</summary>
        public int Kk { get; private set; } = 1;
        /// <summary>Valittu kerros tai null.</summary>
        public string Kerros { get; private set; }
        /// <summary>Kerroksen peitto 0…1 (web läpinäkyvyysliuku).</summary>
        public float Peitto { get; private set; } = OletusPeitto;
        /// <summary>Toisto käynnissä (▶/❚❚).</summary>
        public bool Toistaa { get; private set; }
        /// <summary>Kuukauden nimi pienaakkosin (web KUUKAUSINIMET).</summary>
        public string KuukaudenNimi => Kuukaudet[Kk - 1];
        /// <summary>Lähderivi (web mv-lahde).</summary>
        public string LahdeRivi
        {
            get
            {
                var k = Valittu;
                return "NASA Blue Marble NG (PD)" + (k == null ? "" : $" · {k.Nimi}: {k.Lahde ?? "NASA"}{(k.Lisenssi != null ? $" ({k.Lisenssi})" : "")}");
            }
        }
        /// <summary>Tila muuttui (kuukausi, kerros, peitto, toisto, luettelo): Natiivi-UI päivittää paneelin.</summary>
        public event Action Muuttui;

        VuosiKerros Valittu
        {
            get
            {
                if (Kerros == null) return null;
                foreach (var k in Kerrokset) if (k.Tunnus == Kerros) return k;
                return null;
            }
        }

        /// <summary>Kuukausi ennen avausta (oletus: sovitin antaa kuluvan kuukauden).</summary>
        public int AloitusKk = DateTime.UtcNow.Month;

        public void AsetaKerrokset(IReadOnlyList<VuosiKerros> luettelo, string juuri = null)
        {
            Kerrokset = luettelo ?? Array.Empty<VuosiKerros>();
            if (juuri != null) KerrosJuuri = juuri;
            if (Kerros != null && Valittu == null) Kerros = null;
            PaivitaKohteet();
            Muuttui?.Invoke();
        }

        public void Avaa(ILinssiYmparisto ymparisto)
        {
            if (Auki) return;
            y = ymparisto ?? throw new ArgumentNullException(nameof(ymparisto));
            Auki = true;
            avattu = y.Aika;
            talteen = y.Kamera;
            Kk = Kuukausi(AloitusKk);
            Toistaa = false;
            pohjat.Nollaa(pohja(Kk));
            var alussa = Valittu;
            kerrokset.Nollaa(alussa == null ? null : KerroksenKuva(alussa, Kk, KerrosJuuri));
            // Peite ensin, pelin kerrokset piiloon sen alla; kuori näkyviin vasta, kun pohja on ladattu.
            y.Peite(true);
            peiteYlhaalla = true;
            peiteLaskettu = false;
            y.Pelikerrokset(false);
            y.MusiikkiPitoon(true);
            double koko = y.KokoPallonKorkeus;
            y.ZoomiKatto(koko * 1.3);
            y.AjaKamera(new Nakyma(AloitusLat, AloitusLon, koko), y.VahennettyLiike ? 0f : Ajo);
            PaivitaKohteet();
            Muuttui?.Invoke();
        }

        public void AsetaKuukausi(int kk)
        {
            int n = Kuukausi(kk);
            if (n == Kk) return;
            Kk = n;
            PaivitaKohteet();
            Muuttui?.Invoke();
        }

        public void AsetaKerros(string tunnus)
        {
            string uusi = null;
            foreach (var k in Kerrokset) if (k.Tunnus == tunnus) uusi = tunnus;
            if (uusi == Kerros) return;
            Kerros = uusi;
            PaivitaKohteet();
            Muuttui?.Invoke();
        }

        public void AsetaPeitto(double p)
        {
            float uusi = (float)Math.Max(0, Math.Min(1, double.IsNaN(p) ? 0 : p));
            if (uusi == Peitto) return;
            Peitto = uusi;
            Muuttui?.Invoke();
        }

        /// <summary>Toisto päälle tai pois (▶/❚❚): kuukausi vaihtuu 1,4 s:n välein, kun edellinen häivytys on valmis.</summary>
        public void Toisto(bool paalla)
        {
            if (paalla == Toistaa) return;
            Toistaa = paalla;
            if (paalla && y != null) seuraavaAskel = y.Aika + ToistonKuukausiS;
            Muuttui?.Invoke();
        }

        void PaivitaKohteet()
        {
            if (!Auki) return;
            pohjat.Aseta(pohja(Kk));
            var k = Valittu;
            kerrokset.Aseta(k == null ? null : KerroksenKuva(k, Kk, KerrosJuuri));
            // Seuraava kuukausi valmiiksi, ettei toisto odota verkkoa.
            kuori.Esilataa(pohja(Kk + 1));
            if (k != null) kuori.Esilataa(KerroksenKuva(k, Kk + 1, KerrosJuuri));
        }

        public void Paivita()
        {
            if (!Auki) return;
            double aika = y.Aika, kesto = y.VahennettyLiike ? 0 : HaivytysS;
            // Luovuttanut kuva ei jumita häivytystä: se ohitetaan kuin tyhjä.
            Func<string, bool> valmis = o => kuori.Valmis(o) || kuori.Epaonnistui(o);
            pohjat.Paivita(aika, valmis, kesto);
            kerrokset.Paivita(aika, valmis, kesto);

            if (peiteYlhaalla && (valmis(pohjat.Nykyinen) || aika - avattu >= PeitteenKatto))
            {
                peiteYlhaalla = false;
                peiteLaskettu = true;
                y.Peite(false);
                kuori.Nayta(true);
            }

            if (Toistaa && !pohjat.Kesken && aika >= seuraavaAskel)
            {
                seuraavaAskel = aika + ToistonKuukausiS;
                AsetaKuukausi(Kk + 1);
            }

            string a = pohjat.Nykyinen, b = pohjat.Kesken ? pohjat.Tuleva : null;
            float t = b == null ? 0f : pohjat.T;
            string k1 = kerrokset.Nykyinen, k2 = kerrokset.Kesken ? kerrokset.Tuleva : null;
            float a1 = k1 == null ? 0f : Peitto * (kerrokset.Kesken ? 1f - kerrokset.T : 1f);
            float a2 = k2 == null ? 0f : Peitto * kerrokset.T;
            if (k1 != null && !kuori.Valmis(k1)) a1 = 0f;
            kuori.Aseta(a, b, t, k1, a1, k2, a2);
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            Toistaa = false;
            if (peiteYlhaalla) y.Peite(false);
            peiteYlhaalla = false;
            kuori.Nayta(false);
            y.Pelikerrokset(true);
            y.ZoomiKatto(null);
            y.MusiikkiPitoon(false);
            y.AjaKamera(talteen, y.VahennettyLiike ? 0f : Ajo);
            Muuttui?.Invoke();
        }

        /// <summary>Testikomennon ja lokin kuvaus.</summary>
        public string Kuvaus() =>
            $"vuosi: {(Auki ? "auki" : "kiinni")}, {KuukaudenNimi}, kerros {Kerros ?? "-"} {Peitto:F2}, toisto {Toistaa}, "
            + $"pohja {Tiedosto(pohjat.Nykyinen)}{(pohjat.Kesken ? "→" + Tiedosto(pohjat.Tuleva) : "")} t {pohjat.T:F2}, kerros {Tiedosto(kerrokset.Nykyinen)}{(kerrokset.Kesken ? "→" + Tiedosto(kerrokset.Tuleva) : "")} t {kerrokset.T:F2}, "
            + $"luettelossa {Kerrokset.Count}, peite {(peiteLaskettu ? "laskettu" : peiteYlhaalla ? "ylhäällä" : "-")}";

        static string Tiedosto(string o) => o == null ? "-" : o.Substring(o.LastIndexOf('/') + 1);
    }
}
