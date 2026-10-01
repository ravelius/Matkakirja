// ISS:N KYYTI (Linssisepän suositus docs/raportit/iss-kyyti-suositus-20260928.md; Natiivi-UI katselmoi):
// AstronauttiKerros.KyytiKasittelija. Kyydissä (seuranta, ikkuna ja kohteen yllä):
//   vasen ylä    tietorivi "● LIVE · ISS · 418 km · 27 580 km/h" kuvanäkymän nimipillerin tyylillä; punainen piste sykkii
//                (0,9 s, vähennetty liike: paikallaan), jotta pelaaja ymmärtää ISS:n olevan juuri nyt tuossa kohdassa (omistaja
//                28.9.). Ilman tuoretta TLE:tä ei LIVE-merkkiä vaan loppuun "rata-arvio".
//   oikea ylä    ✕ palaa kaukonäkymään (AstronauttiLinssi.PoistuKyydista); linssin oma sulkunappi on piilossa (KuvaAuki)
// Ikkunassa lisäksi Cupola-kehys (Codexin toimitus 26.9., ämpäri karttanostot/20260926/iss-cupola-*): keskilasi ja kuusi
// trapetsilasia koko ruudulle (cover), ja lasin heijastus omana kerroksenaan hitaalla heilunnalla (8 s, 3 pt; pieni liike
// pois: paikallaan). Kuvat haetaan ensimmäisellä kyydillä (Kuvat.Hae, levyvälimuisti); ilman verkkoa ikkuna ilman kehystä.
// Kehys ja heijastus häivyttyvät 300 ms. Kaikki paitsi ✕ päästää kosketukset läpi, jolloin napautus vaihtaa tilaa.
// CUPOLA 2 (omistajan päätös 28.9. klo 11.0x: "Pyydä Codexilta vain uusi kuva tuosta kupolasta … tummempi … ISS-elementit
// … melkein vain mustia varjokuvia"): Codexin kolme kerrosta ämpäristä karttanostot/20260928/iss-cupola2-* takaa eteen:
// ulko-osat (siluetit, pieni vastakkainen heilunta = syvyys), heijastus ja kehys. Haetaan jo seurannassa (ikkuna on yhden
// napautuksen päässä). Jos kehys ei lataudu, valaistu 3D-kehys (CupolaKerros) on varalla.
// SYVÄTERÄVYYS (omistaja 28.9. iltapäivällä Fablen kautta: "tuo cupola ei voi näkyä noin terävänä, koska katse on
// maapallossa"): oletuksena Linssisepän poltettu muunnelma iss-cupola2-pehmea-* (kehys levysumennuksella voimakkaasti
// epäterävä, ulko-osat vähemmän, heijastus lasin etäisyydeltä, aavistus raetta; ei ajonaikaista sumennusta).
// A/B: astro kyyti cupola uusi|pehmea|terava|3d|vanha (uusi = pehmea2, pehmea = 1.0.37, terava = Codexin alkuperäinen).
// LÄHEMMÄS LASIA (omistaja 28.9. klo 18.0x): ikkuna zoomataan 1,3 × (kenttä 80° → 65,7°, Cupola-kerrokset samassa suhteessa) ja
// sumennusta on vähemmän (pehmea2); A/B astro kyyti lasi 1|1.3.
// NOPEUTUS JA "LENNÄ KOHTEEN YLLE" (omistaja 28.9. klo 12.1x; web iss-kyyti-nakyma.js ja css/satelliitti.css, commit
// 891958e17, px → pt 1:1): pillerin alla porras LIVE · 10× · 100× · 1000× (valittu vihreänä ja lihavoituna; nopeutettuna
// LIVE-nappi on "Palaa LIVE"), sen alla "Lennä kohteen ylle…" ja ylilennon rivi ("Venetsia · Ylilento klo 14.32, 3 h 12 min
// päästä" → perillä "Venetsia: ISS 123 km sivussa"). Nopeutettuna pilleri on "● 100× · ISS …" ilman LIVE-sanaa, piste
// harmaa, ja pillerin napautus = Palaa LIVE. Valikko: webissä selaimen oma valinta; natiivissa lista napin alla (Euroopan
// NASA-kohteet samassa järjestyksessä, AstronauttiLinssi.YlilennonKohteet), napautus listan ohi sulkee sen vaihtamatta
// kyydin tilaa.
// ISS-SÄÄTÖPANEELI (omistaja 29.9. klo 00.0x "Kyllä, kytke"; Codexin sarja IssOhjaus-nahkana, asettelu sovittu Siirtosepän
// kanssa samaksi webissä): yksi paneeli vasemmassa yläkulmassa, leveys 280 pt, sisämarginaali 12, rivien väli 8.
//   rivi 1  lukema (kyydin tietorivi, nopeutettuna napautus = Palaa LIVE) · kutistusnappi (× → + kutistettuna)
//   rivi 2  välilehdet Nopeus | Kohde | Olosuhteet (segmentit, valittu aktiivinen)
//   rivi 3  Nopeus: LIVE · 10× · 100× · 1000× (nopeutettuna ensimmäinen "Palaa LIVE"); Kohde: "Lennä kohteen ylle…"
//           (lista, kärjessä Oma sijainti) ja ylilennon lukema; Olosuhteet: pilvipeitto ja vuodenaika (arvo otsikkorivillä)
// Kutistettuna vain rivi 1. Välilehti ja kutistus säilyvät istunnon ajan. Peitto puhelimella ≤ 45 % (omistaja).
// OHJAUSPÖYTÄ ALAREUNAAN (omistaja 29.9.2026 Päätoimittajan kautta: "vasemman yläreunan säätönapit siirtyisivät alareunaan"):
// paneeli on alareunan kapea pöytä (leveys ruutu − 24, enintään 560 pt, keskellä): rivi 1 välilehdet ja kutistus, rivi 2
// valitun välilehden sisältö (puhelimella ~120 pt ≈ 14 % ruudusta); lukema jää vasempaan yläkulmaan omana kilpenään ja
// kohdelista aukeaa pöydän yläpuolelle. Kutistettuna pöydästä jää vain kutistusnappi. Codexin kytkinmoduulit
// (posti/fable-codex-iss-kytkimet-20260929.md) vaihdetaan osiin, kun toimitus on omistajan näkemä.
using System;
using Matkakirja.Linssit.Astronautti;
using Matkakirja.Linssit.Iss;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class IssKyytiNakyma
    {
        const string Juuri = "https://media.matkakirja.app/karttanostot/20260926/";
        const string Juuri2 = "https://media.matkakirja.app/karttanostot/20260928/";

        readonly VisualElement juuri, kehys, heijastus, kupu, ulko2, heijastus2, kehys2, katto, polyt, turva, pilleri, piste, ohjaimet, peite;
        readonly VisualElement runko, ylilentoKilpi;
        readonly VisualElement[] sivut;
        readonly Button[] valilehdet;
        readonly Button kutistus;
        /// <summary>Auringon reunavalo pokissa: valon tulosuunta kehyskuvassa oikea, vasen, ylä, ala (PYÖREÄ ja HORISONTTI).</summary>
        readonly VisualElement[] valot = new VisualElement[4];
        /// <summary>
        /// CUPOLA 3:N REUNAVALOT YHTENÄ KERROKSENA (Linssiseppä 30.9.2026, ISS-laitemittaus docs/raportit/iss-laitemittaus-20260930.md):
        /// kolme koko ruudun valokuvaa (2732 × 2048, näkyviä pikseleitä 2–3 %) maksoivat iPad Pro 12.9:llä noin 8 ms kehyksessä
        /// (Cupola 24,8 ms ↔ reunavalo pois 16,8 ms, seuranta 16,7 ms). Varjostin Linssit/Resources/Varjostimet/CupolaValot
        /// yhdistää ne painoineen puolikokoiseen RT:hen vain painojen muuttuessa (aurinko liikkuu ~4°/min), ja UI piirtää
        /// yhden kerroksen. Ulkonäkö sama ("over" samassa järjestyksessä); A/B `astro kyyti valot1 0|1` (0 = kolme kerrosta).
        /// </summary>
        public static bool ValotYhdessa = true;
        VisualElement valoYhdessa;
        readonly Texture2D[] valoKuvat = new Texture2D[3];
        readonly float[] valoPiirretty = { -1f, -1f, -1f };
        RenderTexture valoRt;
        Material valoMat;
        static readonly int IdValo0 = Shader.PropertyToID("_Valo0"), IdValo1 = Shader.PropertyToID("_Valo1"),
            IdValo2 = Shader.PropertyToID("_Valo2"), IdPainot = Shader.PropertyToID("_Painot");
        static readonly string[] ValoNimet = { "oikea", "vasen", "yla", "ala" };
        readonly Label live, tieto, ylilento, liveNappi;
        readonly Button[] napit;
        readonly Button valikko;
        /// <summary>Paneelin välilehti (0 Nopeus, 1 Kohde, 2 Olosuhteet) ja kutistus: säilyvät istunnon ajan.</summary>
        public static int Valilehti;
        public static bool Kutistettu;
        static IssKyytiNakyma instanssi;

        /// <summary>
        /// Testikomento astro kyyti paneeli 0|1|2|kutista|avaa|nahka perus|codex (kuvapari): välilehti, kutistus tai nahka.
        /// Palauttaa tilan lokiin (paneelin koko ja peitto ruudusta).
        /// </summary>
        public static string Paneeli(string[] a)
        {
            var n = instanssi;
            if (n == null) return "paneeli: ei kyytinäkymää";
            if (a.Length > 0 && int.TryParse(a[0], out int v)) Valilehti = v;
            else if (a.Length > 0 && a[0] == "kutista") Kutistettu = true;
            else if (a.Length > 0 && a[0] == "avaa") Kutistettu = false;
            else if (a.Length > 1 && a[0] == "nahka") IssOhjaus.Nahka = a[1] == "perus" ? IssOhjaus.Perus : IssOhjaus.Codex;
            n.PaivitaPaneeli();
            // Asettelu lasketaan vasta seuraavassa ruudussa (laite cl1: rivi kertoi edellisen tilan koon), siksi mitta viiveellä.
            n.juuri.schedule.Execute(() => Debug.Log("MATKAKIRJA linssit: " + n.PaneelinMitta())).ExecuteLater(150);
            return $"paneeli: välilehti {Valilehti}, kutistettu {Kutistettu}, nahka {IssOhjaus.Nahka.Nimi} (mitta 150 ms päästä)";
        }

        /// <summary>
        /// KYTKINPÖYTÄ (Linssiseppä 30.9.2026, IssKytkinpoyta/IssKytkimet): avaruusaluksen kytkimet alareunan pöytänä; Codexin kuvat
        /// vaihtuvat paikkamerkkien tilalle Resources/IssKytkimet/-kansiosta. A/B `astro kyyti poyta 0|1` (0 = välilehtipaneeli).
        /// </summary>
        public static bool Kytkinpoyta = true;
        readonly IssKytkinpoyta poyta;
        readonly VisualElement ylariviEl, sulkuVanha;

        VisualElement Poyta => Kytkinpoyta ? poyta.Juuri : ohjaimet;

        /// <summary>Testikomento `astro kyyti kytkin lista|nopeus <i>|tila` (kuvaparit ilman kosketusta).</summary>
        public static string KytkinTesti(string[] a)
        {
            var n = instanssi;
            if (n == null) return "kytkin: ei kyytinäkymää";
            string k = a.Length > 0 ? a[0] : "tila";
            if (k == "lista") n.VaihdaLista();
            else if (k == "nopeus" && a.Length > 1 && int.TryParse(a[1], out int i) && i >= 0 && i < Simukello.Nopeudet.Length)
                Linssi()?.AsetaNopeus(Simukello.Nopeudet[i]);
            var r = n.poyta.Juuri.worldBound;
            var ruutu = n.juuri.panel?.visualTree.layout ?? Rect.zero;
            return $"kytkin: pöytä {(Kytkinpoyta ? "päällä" : "pois")}, {r.width:0} × {r.height:0} pt, peitto {(ruutu.height > 0 ? r.height / ruutu.height * 100 : 0):0.0} % korkeudesta, "
                 + $"kuvat {(IssKytkimet.KuvatPaikalla ? "Codex" : "paikkamerkit")}, nopeus {n.poyta.Nopeus.Asento}, "
                 + $"kerrokset {n.poyta.Asettelu ?? "ei"}, valosumma piirretty {n.poyta.Piirretty}×";
        }

        /// <summary>A/B `astro kyyti kerrokset 0|1`: Linnanrakentajan renderikerrokset ↔ paikkamerkit (IssPaneeliKuvat).</summary>
        public static void SivulevytAB(bool paalla)
        {
            IssKytkinpoyta.Sivulevyt = paalla;
            if (instanssi != null) { instanssi.poyta.Asettele(instanssi.poytaLeveys); instanssi.PaivitaPulu(); }
        }

        public static void VaakaAB(bool paalla)
        {
            IssKytkinpoyta.VaakaRajaus = paalla;
            if (instanssi != null) { instanssi.poyta.Asettele(instanssi.poytaLeveys); instanssi.PaivitaPulu(); }
        }

        public static void KerroksetAB(bool paalla)
        {
            IssPaneeliKuvat.Kaytossa = paalla;
            if (instanssi != null) instanssi.poyta.Asettele(instanssi.poytaLeveys);
        }

        string PaneelinMitta()
        {
            var r = Poyta.worldBound;
            var ruutu = juuri.panel?.visualTree.layout ?? Rect.zero;
            float peitto = ruutu.width > 0 ? r.width * r.height / (ruutu.width * ruutu.height) : 0;
            return $"paneeli: välilehti {Valilehti}, kutistettu {Kutistettu}, nahka {IssOhjaus.Nahka.Nimi}, {r.width:0} × {r.height:0} pt, " +
                   $"ruutu {ruutu.width:0} × {ruutu.height:0}, peitto {peitto * 100:0.0} %";
        }
        readonly ScrollView lista;
        bool nopeutettu, listaTaytetty;
        // Kyydin säätimet (omistaja 28.9. TF 1.0.39: "Pilvet peittävät aika paljon. Voisiko olla säädin pilvipeitolle sekä
        // vuodenajalle?") ja "Oma sijainti" -rivi valikon kärjessä.
        // Modulaariset elementit vaihdettavalla nahalla (IssOhjaus; Codexin sarja tulossa).
        readonly IssOhjaus.Saadin pilviSaadin, kuukausiSaadin;
        Button omaNappi;
        /// <summary>Valikon rivin korkeus (pt, web min-height 28 px).</summary>
        const float RiviPt = 28;
        bool kuvatHaettu, kuva2Haettu, sykkii;
        IVisualElementScheduledItem heilunta, syke;

        public KyydinTila Tila { get; private set; } = KyydinTila.Kauko;
        /// <summary>Kuvapari samasta käännöksestä (`ui linssi kehys 0|1`): ikkuna ilman Cupola-kehystä.</summary>
        public static bool IlmanKehysta;
        /// <summary>
        /// Cupola 2:n kuvasarja (A/B `astro kyyti cupola uusi|pehmea|pehmea2|pehmea3|pehmea4|terava`), levysumennus iPhonella
        /// kehys / ulko-osat / heijastus px (iPadilla × 1,27), rae 4/255 ennallaan ja lasin zoomin (1,3) verran hienompi;
        /// ruudulla näkyvä sumennus suhteessa 1.0.37:ään zoomin jälkeen:
        ///  "pehmea"  12 / 3,5 / 8 (1.0.37, 1 ×), "pehmea2" 7 / 2 / 4,6 (cl12, 0,75 ×; omistaja 18.0x "hieman vähemmän"),
        ///  "pehmea3" 3,7 / 1,08 / 2,46 (0,4 ×) ja "pehmea4" 2,3 / 0,67 / 1,54 (OLETUS, 0,25 ×): omistaja 28.9. klo 19.3x "Vielä
        ///  liikaa blurrina", laite cl13 0,75 | 0,4 | 0,25 ×, Päätoimittaja hyväksyi 0,25 × klo 20.0x; "" = Codexin terävä
        ///  alkuperäinen. Työkalu cupola_pehmea.py.
        /// </summary>
        public const string OletusSarja = "pehmea4";
        public static string Sarja = OletusSarja;
        /// <summary>Rajauksissa (pyöreä, horisontti) kehys suurennetaan noin 2-kertaiseksi, joten sumennus tuplaantuisi: terävä alkuperäinen.</summary>
        public const string HorisontinSarja = "";
        static bool RajausPaalla => IssKuvakulma.Rajaus != IssKuvakulma.IkkunanRajaus.Katto;
        static string KaytettavaSarja => RajausPaalla ? HorisontinSarja : Sarja;
        static string KuvaAvain => Cupola3Kaytossa ? "c3:" + Cupola3Sarja : (RajausPaalla ? "r:" : "k:") + KaytettavaSarja;
        /// <summary>Cupola 3:n tiedostonimen alku: kulma ja (vain kulmalle A) poltettu sarja, esim. "iss-cupola3-a-pehmea-".</summary>
        static string Cupola3Sarja => "iss-cupola3-" + Ohjaamo3Kulma + "-"
            + (Ohjaamo3Kulma == "a" && !string.IsNullOrEmpty(Ohjaamo3Sarja) ? Ohjaamo3Sarja + "-" : "");
        string haettuAvain;
        /// <summary>
        /// CUPOLA 3 (Codexin toimitus 28.9. klo 22.4x pyöreällä kattoikkunalla, ämpäri karttanostot/20260928/iss-cupola3-*):
        /// pyöreän rajauksen ohjaamo on valmiiksi rajattu kuva (tumma ohjaamo, läpinäkyvä ikkuna, pieni oranssi lappu), sen päällä
        /// kolme kapeaa reunavaloa (IssKuvakulma.Cupola3Valot) ja hyvin heikko lasikerros; ulko-osia ei ole. Kuva laitteen muodosta
        /// ja käännettynä, kun ruutu on eri asennossa (IssKuvakulma.Cupola3Kuva). A/B `astro kyyti ohjaamo 3|3b|2` (3 = kulma A
        /// keskitetty, 3b = hieman vino, 2 = Cupola 2:n suurennettu kattoikkuna 8852e368).
        /// </summary>
        public static bool Ohjaamo3 = true;
        public static string Ohjaamo3Kulma = "a";
        /// <summary>
        /// Omistaja 28.9. klo 23.1x cl18:n jälkeen ("OK, junaan", kulma A): "tosin tummenna ja pehmennä aavistuksen ohjaamoa".
        /// Kulman A oletussarja "pehmea-umpi" = Linssisepän poltto (c3_pehmea.py): Gaussin sumennus noin 2 näyttöpikseliä
        /// premultiplied-alfalla ohjaamoon, lasiin ja reunavaloihin, ja valojen alfa vahvistettu takaisin huippuunsa (× 1,3–1,5),
        /// jotta auringonvalo pokissa säilyy. UMPI (Natiiviseppä 29.9. klo 00.0x, cl20:n kontrollikoe): Codexin ohjaamon metalli oli
        /// alfa 245–254, ja maan pilvet kuultivat sen läpi (musta 2 → 22); ohjaamon alfa ≥ 240 → 255 ennen sumennusta. Koska
        /// huntu poistuu, ohjaamo tummenee jo tästä, joten sävy <see cref="Cupola3Tummuus"/> on 1 (0,85 A/B:nä).
        /// Sarjat: "pehmea-umpi" (oletus), "pehmea" (cl19–cl20), "" = Codexin terävä (cl18).
        /// A/B `astro kyyti ohjaamo 3|3pehmea|3terava` ja `astro kyyti tumma <0–1>`.
        /// </summary>
        public static string Ohjaamo3Sarja = "pehmea-umpi";
        public static float Cupola3Tummuus = 1f;
        static bool Cupola3Kaytossa => Ohjaamo3 && IssKuvakulma.Rajaus == IssKuvakulma.IkkunanRajaus.Pyorea;
        /// <summary>
        /// Cupola 3 on sommiteltu ruudulle valmiiksi (ikkuna 98 % iPhonen leveydestä), joten sitä suurennetaan vain 1,04 × ja
        /// ajelehdus puolitetaan (4 pt, 0,25°): liike ei paljasta kuvan reunoja, ja ikkuna pysyy pyöreänä.
        /// </summary>
        const float Cupola3Ajelehdus = 0.5f;   // suurennos: IkkunanOletus (aiemmin 1,04)
        /// <summary>
        /// Isompi Cupolan ikkuna-aukko (omistajan valinta 1.10. Päätoimittajan kautta): kehyksen suurennos laitteen ja asennon mukaan —
        /// iPhone vaaka 2,0 (aukko lähes reunasta reunaan), pysty 1,25; iPad vaaka 1,45 (sama periaate 4:3-ruudulla), pysty 1,25.
        /// Taustan maa on koko ruudun kokoinen, joten suurempi z näyttää enemmän maata. Testikomento `astro kyyti ikkuna z` (0 = oletus).
        /// </summary>
        public static float IkkunanSuurennos;
        public const float IkkunaPuhelinVaaka = 2f, IkkunaPuhelinPysty = 1.25f, IkkunaTablettiVaaka = 1.45f, IkkunaTablettiPysty = 1.25f;
        static float IkkunanOletus(float w, float h, bool ipad) =>
            w > h ? (ipad ? IkkunaTablettiVaaka : IkkunaPuhelinVaaka) : (ipad ? IkkunaTablettiPysty : IkkunaPuhelinPysty);
        /// <summary>Kuvan reunan vara (pt) keskitetyssä rajauksessa: ajelehdus 3,5–4 pt + kallistus ja skaala.</summary>
        const float Cupola3Vara = 8f;
        readonly float[] cupola3Painot = new float[3];
        /// <summary>Rajattu Cupola 3:lla (PaivitaKehys).</summary>
        bool cupola3;
        /// <summary>A/B `astro kyyti kehysmusta 1|0`: läpikuulon kontrollikoe (PaivitaKehys).</summary>
        public static bool KehysMustana;
        bool kehysMustanaNyt;
        /// <summary>Ohjaamon tila lokiin (`astro kyyti tila`): kuva, asento ja reunavalojen painot.</summary>
        public static string OhjaamonTila { get; private set; } = "";
        /// <summary>Codexin Cupola 2: null = ei vielä haettu tai latautuu, true = kehys valmis, false = ei saatu (3D varalla).</summary>
        public static bool? Kuva2Tila { get; private set; }
        /// <summary>Piirretäänkö ikkunassa valaistu 3D-kehys (A/B 3d tai Cupola 2:n kehys ei latautunut).</summary>
        public static bool KolmiulotteinenKehys => CupolaKerros.Tyyli == CupolaKerros.Tyylit.Kolmiulotteinen
            || (CupolaKerros.Tyyli == CupolaKerros.Tyylit.Kuva && Kuva2Tila == false);
        /// <summary>Kyyti alkoi tai päättyi (LinssiUi piilottaa linssin sulkunapin kyydin ajaksi).</summary>
        public event Action<bool> AukiMuuttui;

        public IssKyytiNakyma(UiKerros kerros)
        {
            instanssi = this;
            juuri = Rakenne.El("mk-isskyyti", kerros.Juuri(LinssiUi.Ylakerros), PickingMode.Ignore);
            juuri.style.display = DisplayStyle.None;
            // Cupola 2 -kerrokset säiliössä (kupu): vaakasuunnassa pyöreän ikkunan rajaus kääntää säiliön 90°, jolloin pystyn
            // kehyskuva peittää leveän ruudun ja kerrokset rajataan kuten pystyssä (IssKyytiNakyma.PaivitaKupu).
            kupu = Rakenne.El("mk-isskyyti__kupu", juuri, PickingMode.Ignore);
            kupu.style.position = Position.Absolute;
            kupu.style.left = 0; kupu.style.top = 0; kupu.style.right = 0; kupu.style.bottom = 0;
            ulko2 = Rakenne.El("mk-isskyyti__ulko2", kupu, PickingMode.Ignore);
            heijastus2 = Rakenne.El("mk-isskyyti__heijastus2", kupu, PickingMode.Ignore);
            kehys2 = Rakenne.El("mk-isskyyti__kehys2", kupu, PickingMode.Ignore);
            // HORISONTTI: kuvan yläreunan yläpuolelle jäävä alue on pimeää ohjaamoa (katto), ja auringonvalo elää pokissa neljänä
            // reunavalokerroksena kehyksen päällä (tyylit tässä, ei USS:ssä: kerrokset näkyvät vain rajauksissa).
            katto = Rakenne.El("mk-isskyyti__katto", kupu, PickingMode.Ignore);
            katto.style.position = Position.Absolute;
            katto.style.left = 0; katto.style.right = 0; katto.style.top = 0; katto.style.height = 0;
            katto.style.flexDirection = FlexDirection.Column;
            katto.style.display = DisplayStyle.None;
            // Umpinainen katto kuvan yläreunaan asti ja sen alla 60 pt:n liuku kehyksen päälle (ei kovaa vaakaviivaa).
            var kiintea = Rakenne.El("mk-isskyyti__katto-kiintea", katto, PickingMode.Ignore);
            kiintea.style.flexGrow = 1;
            kiintea.style.backgroundColor = OhjaamonVari;
            var liuku = Rakenne.El("mk-isskyyti__katto-liuku", katto, PickingMode.Ignore);
            liuku.style.height = KattoLiukuPt;
            liuku.style.flexShrink = 0;
            liuku.style.backgroundImage = KattoLiuku();
            liuku.style.backgroundSize = new BackgroundSize(Length.Percent(100), Length.Percent(100));
            for (int i = 0; i < valot.Length; i++)
            {
                var v = Rakenne.El("mk-isskyyti__valo2", kupu, PickingMode.Ignore);
                v.style.position = Position.Absolute;
                v.style.left = 0; v.style.right = 0; v.style.top = 0; v.style.bottom = 0;
                v.style.backgroundSize = new BackgroundSize(BackgroundSizeType.Cover);
                v.style.backgroundPositionX = new BackgroundPosition(BackgroundPositionKeyword.Center);
                v.style.backgroundPositionY = new BackgroundPosition(BackgroundPositionKeyword.Center);
                v.style.display = DisplayStyle.None;
                valot[i] = v;
            }
            valoYhdessa = Rakenne.El("mk-isskyyti__valo2 mk-isskyyti__valo2--yhdessa", kupu, PickingMode.Ignore);
            valoYhdessa.style.position = Position.Absolute;
            valoYhdessa.style.left = 0; valoYhdessa.style.right = 0; valoYhdessa.style.top = 0; valoYhdessa.style.bottom = 0;
            valoYhdessa.style.backgroundSize = new BackgroundSize(BackgroundSizeType.Cover);
            valoYhdessa.style.backgroundPositionX = new BackgroundPosition(BackgroundPositionKeyword.Center);
            valoYhdessa.style.backgroundPositionY = new BackgroundPosition(BackgroundPositionKeyword.Center);
            valoYhdessa.style.display = DisplayStyle.None;
            // Pölyhiukkaset leijuvat kuvun sisällä katsojan ja lasin välissä: kehyksen edessä, käyttöliittymän takana.
            polyt = Rakenne.El("mk-isskyyti__polyt", juuri, PickingMode.Ignore);
            polyt.style.position = Position.Absolute;
            polyt.style.left = 0; polyt.style.top = 0; polyt.style.right = 0; polyt.style.bottom = 0;
            polyt.style.display = DisplayStyle.None;
            polyt.generateVisualContent += PiirraPolyt;
            kehys = Rakenne.El("mk-isskyyti__kehys", juuri, PickingMode.Ignore);
            heijastus = Rakenne.El("mk-isskyyti__heijastus", juuri, PickingMode.Ignore);
            // Valikon peite: napautus listan ohi sulkee sen eikä vaihda kyydin tilaa (webissä selaimen oma valikko).
            peite = Rakenne.El("mk-isskyyti__peite", juuri);
            peite.style.display = DisplayStyle.None;
            peite.RegisterCallback<PointerDownEvent>(_ => SuljeLista());
            turva = Rakenne.El("mk-isskyyti__turva", juuri, PickingMode.Ignore);
            // Säätöpaneeli (IssOhjaus-osat Codexin nahalla).
            // Lukema vasemmassa yläkulmassa omana kilpenään, ohjauspöytä alareunassa.
            var ylarivi = Rakenne.El("mk-isskyyti__ylarivi mk-isskyyti__lukemarivi", turva);
            ylariviEl = ylarivi;
            ohjaimet = IssOhjaus.Paneeli(turva);
            ohjaimet.AddToClassList("mk-isskyyti__ohjaimet");
            pilleri = IssOhjaus.Lukema(ylarivi);
            pilleri.AddToClassList("mk-isskyyti__tieto");
            piste = Rakenne.El("mk-isskyyti__piste", pilleri, PickingMode.Ignore);
            live = Rakenne.Teksti("LIVE", "mk-isskyyti__live", pilleri);
            tieto = Rakenne.Teksti("", "mk-isskyyti__teksti", pilleri);
            live.pickingMode = PickingMode.Ignore; tieto.pickingMode = PickingMode.Ignore;
            // Lukeman napautus nopeutettuna = Palaa LIVE (poimittava vain nopeutettuna).
            pilleri.AddManipulator(new Clickable(PalaaLive));

            var valit = Rakenne.El("mk-isskyyti__valilehdet", ohjaimet);
            runko = Rakenne.El("mk-isskyyti__runko", ohjaimet);
            string[] nimet = { "Nopeus", "Kohde", "Olosuhteet" };
            valilehdet = new Button[nimet.Length];
            sivut = new VisualElement[nimet.Length];
            for (int i = 0; i < nimet.Length; i++)
            {
                int n = i;
                valilehdet[i] = IssOhjaus.Segmentti(valit, nimet[i], () => { Valilehti = n; SuljeLista(); PaivitaPaneeli(); });
                sivut[i] = Rakenne.El("mk-isskyyti__sivu", runko);
            }
            kutistus = IssOhjaus.Sulku(valit, () => { Kutistettu = !Kutistettu; PaivitaPaneeli(); }, "Pienennä paneeli");

            // Nopeus: porras LIVE · 10× · 100× · 1000× (web .iss-kyyti-ohjaimet).
            var porras = Rakenne.El("mk-isskyyti__nopeudet", sivut[0]);
            napit = new Button[Simukello.Nopeudet.Length];
            for (int i = 0; i < napit.Length; i++)
            {
                int kerroin = Simukello.Nopeudet[i];
                var b = IssOhjaus.Segmentti(porras, kerroin == 1 ? "LIVE" : kerroin + "×", () => Linssi()?.AsetaNopeus(kerroin));
                b.AddToClassList("mk-isskyyti__nopeus");
                b.userData = kerroin;
                napit[i] = b;
            }
            liveNappi = napit[0].Q<Label>(className: "mk-nappi__teksti");

            // Kohde: "Lennä kohteen ylle…" (lista napin alla, kärjessä Oma sijainti) ja ylilennon lukema.
            // Ei nuolta: web appearance none, ja "⌄" puuttui fontista (laite cl1: □).
            valikko = IssOhjaus.Valikkorivi(sivut[1], "Lennä kohteen ylle…", VaihdaLista);
            valikko.AddToClassList("mk-isskyyti__kohteet");
            valikko.tooltip = "Lennä kohteen ylle";
            lista = new ScrollView(ScrollViewMode.Vertical);
            lista.AddToClassList("mk-isskyyti__lista");
            lista.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            lista.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            lista.style.display = DisplayStyle.None;
            sivut[1].Add(lista);
            ylilentoKilpi = IssOhjaus.Lukema(sivut[1]);
            ylilento = Rakenne.Teksti("", "mk-isskyyti__ylilento", ylilentoKilpi);
            ylilento.pickingMode = PickingMode.Position;   // web: ohjainten lapset ottavat kosketuksen (ei vaihda tilaa)
            ylilentoKilpi.style.display = DisplayStyle.None;

            // Olosuhteet: pilvipeitto ja vuodenaika (arvo otsikkorivillä).
            pilviSaadin = IssOhjaus.Liukusaadin(sivut[2], "Pilvipeitto", 0f, 1f, v => { AstronauttiKerros.PilvienMaara = v; PaivitaSaatimet(); },
                vasen: "Selkeä", oikea: "Nykyinen");
            // Vuodenaika (omistaja 1.10.: neljä kautta, Iss.Vuodenaika): nykyinen kausi = ei pakotusta (pinta seuraa ISS-kelloa).
            kuukausiSaadin = IssOhjaus.Liukusaadin(sivut[2], "Vuodenaika", 0f, 3f, AsetaKausi, kokonaisluku: true, vasen: "Talvi", oikea: "Syksy");
            PaivitaPaneeli();
            OmaSijaintiHaku.Valmis += () => { if (omaNappi != null) omaNappi.Q<Label>(className: "mk-nappi__teksti").text = OmaSijaintiHaku.Rivi(); };

            var sulku = Rakenne.Nappi("×", "mk-astrokuva__sulku", Poistu, turva);
            sulku.tooltip = "Pois kyydistä";
            sulkuVanha = sulku;
            poyta = new IssKytkinpoyta(turva,
                k => Linssi()?.AsetaNopeus(k),
                v => { AstronauttiKerros.PilvienMaara = v; PaivitaSaatimet(); },
                AsetaKausi, AsetaVuorokausi,
                VaihdaLista, Kuvaa, Poistu,
                PalaaLive);
            PaivitaPoydat(KyydinTila.Kauko);
            juuri.RegisterCallback<GeometryChangedEvent>(_ =>
            {
                var r = kerros.Reunat(LinssiUi.Kerros);
                turva.style.left = r.x; turva.style.top = r.y; turva.style.right = r.z; turva.style.bottom = r.w;
                // Ohjauspöydän leveys: ruutu − 24, enintään 560 pt, keskellä (kutistettuna vain nappi vasemmalla).
                poytaLeveys = juuri.layout.width - r.x - r.z;
                // Horisonttikulma (IssKuvakulma.IkkunanKatse): ikkunaympyrän koko riippuu ruudun kuvasuhteesta.
                if (juuri.layout.height > 1f) IssKuvakulma.RuudunSuhde = juuri.layout.width / juuri.layout.height;
                AsetteleOhjaimet();
                poyta.RuudunKorkeus = juuri.layout.height;
                poyta.Asettele(poytaLeveys, r.w);
                PaivitaKupu();   // ruutu kääntyi: pyöreän rajauksen kupu vaakaan tai pystyyn heti
                PaivitaPulu();
            });
        }

        float poytaLeveys;
        const float PoytaEnintaan = 560f;

        void AsetteleOhjaimet()
        {
            if (!(poytaLeveys > 0)) return;
            if (Kutistettu) { ohjaimet.style.width = StyleKeyword.Auto; ohjaimet.style.left = 12f; return; }
            float w = Mathf.Min(PoytaEnintaan, poytaLeveys - 24f);
            ohjaimet.style.width = w;
            ohjaimet.style.left = (poytaLeveys - w) * 0.5f;
        }

        /// <summary>Kytkinpöytä tai välilehtipaneeli (A/B) ja niiden mukana lukemakilpi ja sulkunappi; kävelyllä ei pöytää.</summary>
        void PaivitaPoydat(KyydinTila tila)
        {
            bool ulkona = tila == KyydinTila.Ulkona;
            bool uusi = Kytkinpoyta && !ulkona;
            poyta.Juuri.style.display = uusi ? DisplayStyle.Flex : DisplayStyle.None;
            ohjaimet.style.display = !Kytkinpoyta && !ulkona ? DisplayStyle.Flex : DisplayStyle.None;
            ylariviEl.style.display = uusi ? DisplayStyle.None : DisplayStyle.Flex;
            sulkuVanha.style.display = uusi ? DisplayStyle.None : DisplayStyle.Flex;
        }

        /// <summary>
        /// Pulu kyydissä (omistaja 29.9.2026): Cupolassa ulkona avaruuskävelyllä ikkunan aukossa (alue oikealle alas keskeltä,
        /// kerros kehyksen alla, AstronautinNakyma), muissa tiloissa ohjauspöydän yläpuolella.
        /// </summary>
        void PaivitaPulu()
        {
            if (!UiNakymat.Olemassa) return;
            var p = Pulu.Hae();
            if (p == null) return;
            float W = juuri.layout.width, H = juuri.layout.height;
            bool ikkunassa = Tila == KyydinTila.Ikkuna && W > 1f && H > 1f;
            // Pyöreä ikkuna täyttää ~94 % lyhyemmästä sivusta keskellä; linnun keskipiste (0,25 R, 0,3 R) keskeltä, jolloin se
            // mahtuu aukkoon myös puhelimella. Alueen oikea alakulma on linnun keskipisteestä noin (66, 55) pt (Pulu.Oikea).
            float R = 0.46f * Mathf.Min(W, H);
            var pe = Poyta;
            bool poytaNakyy = Tila != KyydinTila.Kauko && pe.resolvedStyle.display != DisplayStyle.None && pe.worldBound.height > 0;
            var kulma = new Vector2(W * 0.5f + 0.25f * R + 66f, H * 0.5f + 0.3f * R + 55f);
            // Vaakana pöytä peittää ikkunan alaosan (Päätoimittaja 30.9.: iPhone vaakana vain kypärä pilkisti pöydän takaa):
            // linnun alue pöydän näkyvän yläreunan (kupu) yläpuolelle 6 pt:n välillä.
            if (ikkunassa && poytaNakyy)
            {
                float yla = pe.worldBound.yMin - juuri.worldBound.yMin + (Kytkinpoyta ? poyta.YlaReuna : 0f) - 6f;
                kulma.y = Mathf.Min(kulma.y, yla);
            }
            p.IkkunanTakana = ikkunassa ? kulma : (Vector2?)null;
            p.AlaVara = poytaNakyy && !ikkunassa ? H - pe.worldBound.yMin + 6f : 0f;
        }

        static AstronauttiLinssi Linssi() => UnityEngine.Object.FindAnyObjectByType<AstronauttiKerros>()?.Linssi;

        static void Poistu() => Linssi()?.PoistuKyydista();

        /// <summary>"Lennä kohteen ylle…": lista auki tai kiinni (täytetään ensimmäisellä avauksella linssin kohteista).</summary>
        void VaihdaLista()
        {
            if (lista.style.display == DisplayStyle.Flex) { SuljeLista(); return; }
            if (!listaTaytetty)
            {
                var kohteet = Linssi()?.YlilennonKohteet;
                if (kohteet == null || kohteet.Count == 0) return;
                listaTaytetty = true;
                // Oma sijainti ensin (karkea: maan keskipiste IP:n maasta, ilman lupakyselyä; OmaSijaintiHaku).
                omaNappi = Rakenne.Nappi(OmaSijaintiHaku.Rivi(), "mk-isskyyti__kohde", () => { SuljeLista(); omaLento = true; LennaOmaan(); }, lista);
                omaNappi.AddToClassList("mk-isskyyti__kohde--oma");
                foreach (var k in kohteet)
                {
                    string tunnus = k.Tunnus;
                    string kohdeNimi = k.Nimi;
                    Rakenne.Nappi(k.Nimi, "mk-isskyyti__kohde", () => { SuljeLista(); viimeKohde = kohdeNimi; omaLento = false; Linssi()?.LennaKohteeseen(tunnus); }, lista);
                }
            }
            // Kytkinpöydällä lista on turva-alueen lapsi pöydän yläpuolella (pöydän levyinen); välilehtipaneelissa Kohde-sivulla.
            if (Kytkinpoyta)
            {
                if (lista.parent != turva) turva.Add(lista);
                lista.style.position = Position.Absolute;
                lista.style.left = poyta.Juuri.layout.x; lista.style.width = poyta.Juuri.layout.width;
                lista.style.bottom = turva.layout.height - poyta.Juuri.layout.y - poyta.YlaReuna + 6f;
                poyta.Kohde.Tila = IssKytkimet.Tila.Aktiivinen;
            }
            else if (lista.parent != sivut[1])
            {
                sivut[1].Add(lista);
                lista.style.position = StyleKeyword.Null; lista.style.left = StyleKeyword.Null;
                lista.style.width = StyleKeyword.Null; lista.style.bottom = StyleKeyword.Null;
            }
            // Korkeus: pöydän yläpuolelle turva-alueen yläreunaan asti (12 pt:n marginaali, lukeman alle), vähintään neljä riviä.
            float tarve = lista.contentContainer.childCount * RiviPt + 2;
            float tila = (Kytkinpoyta ? poyta.Juuri.worldBound.yMin : sivut[1].worldBound.yMin) - 6 - (turva.worldBound.yMin + (Kytkinpoyta ? 12 : 64));
            lista.style.height = float.IsNaN(tila) ? tarve : Mathf.Min(tarve, Mathf.Max(4 * RiviPt, tila));
            lista.scrollOffset = Vector2.zero;
            lista.style.display = DisplayStyle.Flex;
            peite.style.display = DisplayStyle.Flex;
        }

        /// <summary>Renderipaneelin kilvet: viimeksi valittu kohde ja onko lento omaan paikkaan (OMA PAIKKA PÄÄLLÄ/POIS).</summary>
        static string viimeKohde;
        static bool omaLento;

        /// <summary>"Oma sijainti": lento maan keskipisteen ylle; jos maa ei ole vielä tiedossa, haku ja lento perään.</summary>
        /// <summary>KUVAA (ISS-kamera, omistaja 1.10.2026): oletusmuoto pysty 4:5; rajausruutu ja muotovalinta tulevat UI-pohjista.</summary>
        static void Kuvaa() => Matkakirja.Natiivi.IssKameraKuva.Hae().Laukaise();

        static void LennaOmaan()
        {
            if (OmaSijaintiHaku.Paikka(out var nimi, out var lat, out var lon)) { Linssi()?.LennaPaikkaan($"Oma sijainti ({nimi})", lat, lon); return; }
            if (OmaSijaintiHaku.Haettu) return;   // maa ei selvinnyt: rivi pysyy "Oma sijainti", ei lentoa
            void Perassa() { OmaSijaintiHaku.Valmis -= Perassa; LennaOmaan(); }
            OmaSijaintiHaku.Valmis += Perassa;
            OmaSijaintiHaku.Aloita();
        }

        /// <summary>
        /// LIVE (omistaja 1.10.): oikea UTC-aika ja ISS:n todellinen paikka (nopeutus pois), kuluva vuodenaika ja aurinko oikeassa
        /// ajassa — vuodenaika- ja vuorokaudenaikavalinnat nollataan.
        /// </summary>
        void PalaaLive()
        {
            if (nopeutettu) Linssi()?.AsetaNopeus(1);
            AstronauttiKerros.KuukausiPakotettu = 0;
            Vuorokausi.Valittu = null;
            PaivitaSaatimet();
        }

        /// <summary>Vuodenaika nupista tai liukusäätimestä (0–3): nykyinen kausi = ei pakotusta, muuten kauden edustava kuukausi.</summary>
        void AsetaKausi(float v)
        {
            int kausi = Mathf.Clamp(Mathf.RoundToInt(v), 0, 3);
            AstronauttiKerros.KuukausiPakotettu = kausi == Vuodenaika.Kausi(IssNyt.Kello().Month) ? 0 : Vuodenaika.Kuukausi(kausi);
            PaivitaSaatimet();
        }

        /// <summary>LIVE-hetken vuorokaudenaika ISS:n alapisteessä auringon korkeudesta: yö &lt; −6°, ilta/aamu −6…20° (iltapäivä/aamupäivä), muuten päivä.</summary>
        static int VuorokausiNyt()
        {
            var t = IssNyt.Kello(); var p = IssNyt.Paikka(t);
            Matkakirja.Linssit.Iss.Aurinko.Alihajapiste(Matkakirja.Linssit.Iss.Aika.Jd(t), out double dekl, out double slon);
            double r = Math.PI / 180, h = ((p.Lon - slon) % 360 + 540) % 360 - 180;
            double e = Math.Asin(Math.Sin(p.Lat * r) * Math.Sin(dekl * r) + Math.Cos(p.Lat * r) * Math.Cos(dekl * r) * Math.Cos(h * r)) / r;
            return e < -6 ? Vuorokausi.Yo : e > 20 ? Vuorokausi.Paiva : h < 0 ? Vuorokausi.Aamu : Vuorokausi.Ilta;
        }

        /// <summary>Vuorokaudenaika nupista (0–3: aamu, päivä, ilta, yö; Iss.Vuorokausi). LIVE-valo nollaa.</summary>
        void AsetaVuorokausi(float v)
        {
            Vuorokausi.Valittu = Mathf.Clamp(Mathf.RoundToInt(v), 0, 3);
            PaivitaSaatimet();
        }

        /// <summary>Säätimien arvot ja tekstit tilasta (AstronauttiKerros: pilvien määrä, pakotettu kuukausi → vuodenaika).</summary>
        void PaivitaSaatimet()
        {
            float m = AstronauttiKerros.PilvienMaara;
            pilviSaadin.Aseta(m, m <= 0.01f ? "selkeä" : m >= 0.99f ? "nyt" : $"{Mathf.RoundToInt(m * 100)} %");
            int nyt = Vuodenaika.Kausi(IssNyt.Kello().Month);
            int kausi = AstronauttiKerros.KuukausiPakotettu is >= 1 and <= 12 ? Vuodenaika.Kausi(AstronauttiKerros.KuukausiPakotettu) : nyt;
            string nimi = Vuodenaika.Nimet[kausi];
            kuukausiSaadin.Aseta(kausi, nimi + (kausi == nyt ? " (nyt)" : ""));
            if (poyta != null)
            {
                poyta.Pilvet.Aseta(m, m <= 0.01f ? "0 %" : m >= 0.99f ? "NYT" : $"{Mathf.RoundToInt(m * 100)} %");
                // Renderipaneelin kilvessä koko nimi (tarrakirjoitin), kehyksessä lyhenne.
                poyta.Vuodenaika.Aseta(kausi, poyta.Asettelu != null ? nimi.ToUpperInvariant()
                    : (nimi.Length > 3 ? nimi.Substring(0, 3) : nimi).ToUpperInvariant() + (kausi == nyt ? " •" : ""));
                // Vuorokaudenaika: LIVE:nä nupin asento seuraa ISS:n alapisteen aurinkoa (lähin kausi), kilvessä "NYT".
                int vk = Vuorokausi.Valittu ?? VuorokausiNyt();
                string vn = Vuorokausi.Valittu.HasValue ? Vuorokausi.Nimet[vk].ToUpperInvariant() : "NYT";
                poyta.Vuorokausi.Aseta(vk, poyta.Asettelu != null ? vn : (vn.Length > 3 ? vn.Substring(0, 3) : vn));
            }
        }

        /// <summary>Välilehti ja kutistus näkyviin (segmenttien tila, sivut, kutistusnapin asento).</summary>
        void PaivitaPaneeli()
        {
            Valilehti = Mathf.Clamp(Valilehti, 0, sivut.Length - 1);
            runko.style.display = Kutistettu ? DisplayStyle.None : DisplayStyle.Flex;
            foreach (var v in valilehdet) v.style.display = Kutistettu ? DisplayStyle.None : DisplayStyle.Flex;
            AsetteleOhjaimet();
            ohjaimet.EnableInClassList("mk-isskyyti__ohjaimet--kutistettu", Kutistettu);
            kutistus.tooltip = Kutistettu ? "Avaa paneeli" : "Pienennä paneeli";
            for (int i = 0; i < sivut.Length; i++)
            {
                sivut[i].style.display = i == Valilehti ? DisplayStyle.Flex : DisplayStyle.None;
                IssOhjaus.AsetaTila(valilehdet[i], IssOhjaus.Osa.Segmentti, i == Valilehti ? IssOhjaus.Tila.Aktiivinen : IssOhjaus.Tila.Normaali);
            }
            if (Kutistettu) SuljeLista();
        }

        void SuljeLista()
        {
            lista.style.display = DisplayStyle.None;
            peite.style.display = DisplayStyle.None;
            if (poyta != null) poyta.Kohde.Tila = IssKytkimet.Tila.Perus;
        }

        /// <summary>AstronauttiKerros.KyytiKasittelija.</summary>
        public void Aseta(KyydinTila tila, double korkeusKm, double nopeusKmh, bool arvio, KyydinAika aika)
        {
            bool oliAuki = Tila != KyydinTila.Kauko;
            Tila = tila;
            bool auki = tila != KyydinTila.Kauko;
            juuri.style.display = auki && !Matkakirja.Linssit.Astronautti.AstronauttiLinssi.Vertailu.HasValue ? DisplayStyle.Flex : DisplayStyle.None;
            // Nopeutettuna (web tietorivi kertoimella): "● 100× · ISS · …" ilman LIVE-sanaa, piste harmaa eikä syki.
            var rivi = KyydinTeksti.Tietorivi(korkeusKm, nopeusKmh, arvio, aika.Nopeutettu ? aika.Nopeus : (double?)null);
            if (auki) { tieto.text = rivi.Teksti; live.text = rivi.Merkki ?? ""; }
            var merkkiNakyy = auki && rivi.Merkki != null ? DisplayStyle.Flex : DisplayStyle.None;
            piste.style.display = merkkiNakyy; live.style.display = merkkiNakyy;
            nopeutettu = auki && aika.Nopeutettu;
            pilleri.EnableInClassList("mk-isskyyti__tieto--nopeutettu", nopeutettu);
            pilleri.pickingMode = nopeutettu ? PickingMode.Position : PickingMode.Ignore;
            pilleri.tooltip = nopeutettu ? "Palaa LIVE" : null;
            Syke(auki && rivi.Live);
            // Porras: valittu kerroin (kelauksessa ei mitään), nopeutettuna LIVE-nappi on "Palaa LIVE"; ylilennon rivi.
            var valittu = aika.Valittu;
            foreach (var b in napit)
            {
                bool v = valittu.HasValue && (int)b.userData == valittu.Value;
                b.EnableInClassList("mk-isskyyti__nopeus--valittu", v);
                IssOhjaus.AsetaTila(b, IssOhjaus.Osa.Segmentti, v ? IssOhjaus.Tila.Aktiivinen : IssOhjaus.Tila.Normaali);
            }
            liveNappi.text = aika.Nopeutettu ? "Palaa LIVE" : "LIVE";
            ylilento.text = aika.Ylilento ?? "";
            ylilentoKilpi.style.display = auki && aika.Ylilento != null ? DisplayStyle.Flex : DisplayStyle.None;
            if (auki) PaivitaSaatimet();
            // Avaruuskävelyllä ei nopeutusta eikä ylilentoa (tilakone kelaa itse auringonnousuun).
            PaivitaPoydat(tila);
            if (auki && Kytkinpoyta)
            {
                poyta.Lukema.Aseta(rivi.Teksti, aika.Ylilento);
                poyta.Live.Tila = IssKytkimet.Tila.Aktiivinen;
                poyta.Live.Meripihka = aika.Nopeutettu;
                poyta.Live.Nimi.text = aika.Nopeutettu ? "PALAA" : "LIVE";
                int ix = Array.IndexOf(Simukello.Nopeudet, aika.Porras);
                // Kilpi: kelaus "…", päivänvalosiirto PÄIVÄ, muu ei-LIVE 1×:llä "1×" (laite 30.9.: PALAA-valo ja kilpi LIVE yhtä aikaa).
                poyta.Nopeus.Aseta(ix >= 0 && !aika.Kelaa ? ix : 0, aika.Kelaa ? "…" : aika.Paiva ? "PÄIVÄ" : aika.Nopeutettu && ix <= 0 ? "1×" : null);
                // Arvokilvet (renderipaneeli; Päätoimittaja 30.9.): kohde, oma paikka, näkymä.
                bool lennossa = tila == KyydinTila.Kohde;
                if (!lennossa) omaLento = false;
                poyta.Kohde.Kilpi.text = lennossa && !omaLento && viimeKohde != null ? viimeKohde.ToUpperInvariant() : "VALITSE";
                poyta.Kuvaa.Kilpi.text = Matkakirja.Natiivi.IssKameraKuva.Tila == "valmis" ? "VALMIS" : $"{Matkakirja.Natiivi.IssKameraKuva.Edistyminen:P0}";
                poyta.Sulku.Kilpi.text = tila == KyydinTila.Ikkuna ? "CUPOLA" : tila == KyydinTila.Seuranta ? "SEURANTA" : lennossa ? "LENTO" : "KYYTI";
            }
            if (!auki) SuljeLista();
            bool ikkuna = tila == KyydinTila.Ikkuna;
            if (ikkuna && !kuvatHaettu && CupolaKerros.Vanha) HaeKuvat();
            if (auki && !kuva2Haettu && CupolaKerros.Tyyli == CupolaKerros.Tyylit.Kuva) HaeKuvat2();
            this.ikkuna = ikkuna;
            PaivitaKehys();
            PaivitaPulu();
            if (tila != edellinenTila) { edellinenTila = tila; TilaMuuttui?.Invoke(tila); }
            if (auki != oliAuki) AukiMuuttui?.Invoke(auki);
            PaivitaCupolanKatto(auki && ikkuna);
        }

        /// <summary>
        /// CUPOLA 30 FPS (Päätoimittaja 30.9.2026 ISS-laitemittauksen jälkeen, docs/raportit/iss-laitemittaus-20260930.md): Cupola on
        /// iPad Pro 12.9:llä GPU:n rajalla (alussa ~17 ms, lämmetessä ~24 ms, sitten kuristus), joten tavoite on tasainen 30 fps.
        /// Seuranta, kauko ja kävely pysyvät 60:ssä. Katto asettuu vasta, kun siirtymä ikkunaan on ohi (IkkunaanS + 0,2 s), ja
        /// poistuu heti tilan vaihtuessa, jotta siirtymät pyörivät täydellä taajuudella eikä vaihto näy nykäyksenä.
        /// A/B `astro kyyti katto30 0|1`.
        /// </summary>
        public static bool CupolaKatto30 = true;
        float ikkunaanAika = -1f;

        void PaivitaCupolanKatto(bool ikkunassa)
        {
            if (!ikkunassa) { ikkunaanAika = -1f; if (Matkakirja.Ruudunpaivitys.NakymanKatto == 30) Matkakirja.Ruudunpaivitys.NakymanKatto = 0; return; }
            if (ikkunaanAika < 0f)
            {
                ikkunaanAika = Time.unscaledTime;
                // Aseta kutsutaan sekunnin välein; katto asetetaan siirtymän jälkeen ajastettuna, ei vasta seuraavalla kutsulla.
                juuri.schedule.Execute(() => PaivitaCupolanKatto(ikkuna)).ExecuteLater((long)((IssKyyti.IkkunaanS + 0.25) * 1000));
            }
            bool perilla = Time.unscaledTime - ikkunaanAika >= IssKyyti.IkkunaanS + 0.2;
            Matkakirja.Ruudunpaivitys.NakymanKatto = CupolaKatto30 && perilla ? 30 : 0;
        }

        KyydinTila edellinenTila = KyydinTila.Kauko;
        /// <summary>Kyydin tila vaihtui (AstronautinNakyma: Pulun kerros Cupolassa kehyksen alle, pelielementit pois).</summary>
        public event Action<KyydinTila> TilaMuuttui;

        bool ikkuna;

        /// <summary>Kehys ja heijastus näkyviin ikkunassa (ellei A/B ilman kehystä).</summary>
        public void PaivitaKehys()
        {
            // Oletus Codexin Cupola 2 (UI-kerrokset); valaistu 3D-kerros (CupolaKerros) A/B:ssä ja varalla; 1.0.35:n UI-kehys
            // vain A/B:n "ennen"-kuvaan (CupolaKerros.Vanha).
            // A/B pehmeä ↔ terävä: haetaan kerrokset uudelleen (Aseta kutsuu tätä sekunnin välein).
            if (kuva2Haettu && haettuAvain != KuvaAvain) { kuva2Haettu = false; Kuva2Tila = null; }
            // Läpikuulon kontrollikoe (Natiiviseppä 28.9. klo 23.4x, cl19: tumma 0 -ohjaamon läpi näkyi ~6 % maata ja alempi UI,
            // vaikka opasiteetti 1,0): kehys ilman kuvaa pelkkänä mustana taustana. Jos alla näkyy yhä, syy on sekoituksessa tai
            // paneelissa; jos ei, tekstuurin alfassa purun jälkeen. Pois palatessa kuvat haetaan uudelleen (levyvälimuistista).
            if (KehysMustana != kehysMustanaNyt)
            {
                kehysMustanaNyt = KehysMustana;
                kehys2.style.backgroundColor = KehysMustana ? new StyleColor(Color.black) : new StyleColor(StyleKeyword.Null);
                if (KehysMustana) kehys2.style.backgroundImage = StyleKeyword.None;
                else { kuva2Haettu = false; Kuva2Tila = null; }
            }
            bool vanha = ikkuna && !IlmanKehysta && CupolaKerros.Vanha;
            bool uusi = ikkuna && !IlmanKehysta && CupolaKerros.Tyyli == CupolaKerros.Tyylit.Kuva && Kuva2Tila == true;
            if (vanha && !kuvatHaettu) HaeKuvat();
            if (ikkuna && !kuva2Haettu && CupolaKerros.Tyyli == CupolaKerros.Tyylit.Kuva) HaeKuvat2();
            juuri.EnableInClassList("mk-isskyyti--ikkuna", vanha);
            juuri.EnableInClassList("mk-isskyyti--kuva2", uusi);
            // Rajaukset (pyöreä, horisontti): ohjaamo pimeänä ja reunavalo päälle. Horisontissa Canadarm ja paneeli pois (ne kuuluvat
            // kattoikkunan kuvaan, eivät sivuikkunaan) ja kuvan yläpuolelle katto; pyöreä kääntyy vaakasuunnassa (PaivitaKupu).
            rajattu = uusi && RajausPaalla;
            // Cupola 3: ohjaamo on jo pimeä (metallin keskiarvo ~25/255), joten ei tummennusta; ulko-osia ei ole, valoja kolme.
            cupola3 = rajattu && Cupola3Kaytossa;
            if (!cupola3) AsetaKuvanAsema(null);   // Cupola 2 -kerrokset keskeltä (Cupola 3 asettaa Rajaa-kutsussa)
            bool horisontti = rajattu && IssKuvakulma.Horisontti;
            ulko2.style.display = horisontti || cupola3 ? DisplayStyle.None : DisplayStyle.Flex;
            float tumma = rajattu ? OhjaamonTummuus : 1f;
            kehys2.style.unityBackgroundImageTintColor = cupola3 ? new Color(Cupola3Tummuus, Cupola3Tummuus, Cupola3Tummuus, 1f)
                : new Color(tumma, tumma, tumma * 1.06f, 1f);
            katto.style.display = horisontti ? DisplayStyle.Flex : DisplayStyle.None;
            bool yhdessa = cupola3 && ValotYhdessa;
            for (int i = 0; i < valot.Length; i++)
                valot[i].style.display = rajattu && Reunavalo && !yhdessa && (!cupola3 || i < IssKuvakulma.Cupola3ValoNimet.Length)
                    ? DisplayStyle.Flex : DisplayStyle.None;
            valoYhdessa.style.display = rajattu && Reunavalo && yhdessa ? DisplayStyle.Flex : DisplayStyle.None;
            if (!yhdessa) VapautaValoRt();
            PaivitaKupu();
            PaivitaReunavalo();
            OhjaamonTila = (cupola3 ? Cupola3Sarja + (IssKuvakulma.Cupola3Kuva(Screen.width, Screen.height).ipad ? "ipad" : "iphone")
                    + $" tummuus {Cupola3Tummuus:0.00}"
                    + $" valot {cupola3Painot[0]:0.00}/{cupola3Painot[1]:0.00}/{cupola3Painot[2]:0.00}"
                : rajattu ? "cupola2 " + IssKuvakulma.Rajaus : uusi ? "kupoli" : "ei kuvaa")
                + $", kuva {(Kuva2Tila == null ? "-" : Kuva2Tila.Value ? "ok" : "ei")}, käännetty {kupuKaannetty}";
            Heilu(vanha || uusi);
            // Lasin zoom (IssKuvakulma.LasiZoom) myös ilman ajelehdusta (vähennetty liike tai A/B): kerrokset lepoasentoon.
            if (!(heiluu && Ajelehdus)) AjelehdusLepoon();
            PolytPaalle(ikkuna && !IlmanKehysta && (vanha || uusi || KolmiulotteinenKehys));
        }

        void HaeKuvat()
        {
            kuvatHaettu = true;
            // iPad-kehys leveämmälle ruudulle (1536 × 2732), muuten iPhone (1206 × 2622); cover rajaa loput.
            bool ipad = Screen.width > 0.5f * Screen.height;
            string koko = ipad ? "ipad-1536x2732" : "iphone-1206x2622";
            Kuvat.Hae(Juuri + "iss-cupola-kokonainen-" + koko + ".png", t => { if (t != null) kehys.style.backgroundImage = t; });
            Kuvat.Hae(Juuri + "iss-cupola-heijastus-" + koko + ".png", t => { if (t != null) heijastus.style.backgroundImage = t; });
        }

        /// <summary>LIVE-piste sykkii (luokka vaihtuu 0,9 s:n välein, USS-siirtymä); käynnistyy vain tilan vaihtuessa.</summary>
        void Syke(bool paalla)
        {
            paalla &= !LinssiUi.VahennettyLiike();
            if (paalla == sykkii) return;
            sykkii = paalla;
            syke?.Pause();
            piste.RemoveFromClassList("mk-isskyyti__piste--himmea");
            if (!paalla) return;
            bool himmea = false;
            syke = piste.schedule.Execute(() => { himmea = !himmea; piste.EnableInClassList("mk-isskyyti__piste--himmea", himmea); }).Every(900);
        }

        /// <summary>Codexin Cupola 2 (kolme kerrosta); kehys ratkaisee (ulko-osat ja heijastus ovat valinnaisia).</summary>
        void HaeKuvat2()
        {
            kuva2Haettu = true;
            haettuAvain = KuvaAvain;
            if (Cupola3Kaytossa) { HaeCupola3(); return; }
            // Rajauksissa iPhonen kehys myös iPadilla: rajaus ja reunavalokuvat on mitattu siitä (horisontissa vain siinä yläikkuna
            // on pystyssä; iPadin kuvassa kuusikulmio on 30° kierretty).
            bool ipad = Screen.width > 0.5f * Screen.height && !RajausPaalla;
            string koko = ipad ? "ipad-1536x2732" : "iphone-1206x2622";
            string kaytettava = KaytettavaSarja;
            string sarja = string.IsNullOrEmpty(kaytettava) ? "iss-cupola2-" : "iss-cupola2-" + kaytettava + "-";
            if (RajausPaalla)
                for (int i = 0; i < valot.Length; i++)
                {
                    var v = valot[i];
                    Kuvat.Hae(Juuri2 + "iss-cupola2-reunavalo-" + ValoNimet[i] + "-iphone-1206x2622.png", t => { if (t != null) v.style.backgroundImage = t; });
                }
            int odottaa = 3;
            bool kehysOk = false;
            void Valmis(VisualElement e, Texture2D t)
            {
                if (t != null && !(KehysMustana && e == kehys2)) e.style.backgroundImage = t;
                if (e == kehys2) kehysOk = t != null;
                if (--odottaa > 0) return;
                Kuva2Tila = kehysOk;
                Debug.Log($"MATKAKIRJA linssit: cupola2 {(kehysOk ? "valmis" : "kehys ei latautunut, 3D-kehys varalla")} ({sarja}{koko})");
                PaivitaKehys();
            }
            Kuvat.Hae(Juuri2 + sarja + "ulkoosat-" + koko + ".png", t => Valmis(ulko2, t));
            Kuvat.Hae(Juuri2 + sarja + "heijastus-" + koko + ".png", t => Valmis(heijastus2, t));
            Kuvat.Hae(Juuri2 + sarja + "kehys-" + koko + ".png", t => Valmis(kehys2, t));
        }

        /// <summary>Codexin Cupola 3: ohjaamo ratkaisee (lasi ja reunavalot ovat valinnaisia); ulko-osia ei ole.</summary>
        void HaeCupola3()
        {
            string koko = IssKuvakulma.Cupola3Kuva(Screen.width, Screen.height).ipad ? "ipad-2732x2048" : "iphone-1290x2796";
            string sarja = Cupola3Sarja;
            ulko2.style.backgroundImage = StyleKeyword.None;
            for (int i = 0; i < valot.Length; i++)
            {
                var v = valot[i];
                v.style.backgroundImage = StyleKeyword.None;
                if (i < IssKuvakulma.Cupola3ValoNimet.Length)
                {
                    int n = i;
                    valoKuvat[n] = null;
                    Kuvat.Hae(Juuri2 + sarja + IssKuvakulma.Cupola3ValoNimet[i] + "-" + koko + ".png", t =>
                    {
                        if (t == null) return;
                        v.style.backgroundImage = t;
                        valoKuvat[n] = t;
                        valoPiirretty[0] = -1f;   // uusi kuva: yhdistetty kerros piirretään uudelleen
                        PaivitaReunavalo();
                    });
                }
            }
            int odottaa = 2;
            bool kehysOk = false;
            void Valmis(VisualElement e, Texture2D t)
            {
                if (t != null && !(KehysMustana && e == kehys2)) e.style.backgroundImage = t;
                if (e == kehys2) kehysOk = t != null;
                if (--odottaa > 0) return;
                Kuva2Tila = kehysOk;
                Debug.Log($"MATKAKIRJA linssit: cupola3 {(kehysOk ? "valmis" : "ohjaamo ei latautunut, 3D-kehys varalla")} ({sarja}{koko})");
                PaivitaKehys();
            }
            Kuvat.Hae(Juuri2 + sarja + "glass-" + koko + ".png", t => Valmis(heijastus2, t));
            Kuvat.Hae(Juuri2 + sarja + "cockpit-" + koko + ".png", t => Valmis(kehys2, t));
        }

        bool heiluu;

        /// <summary>Heilunta päälle tai pois vain tilan vaihtuessa: Aseta kutsuu tätä joka sekunti (tietorivi), ja uudelleenkäynnistys
        /// palautti heijastuksen alkuun sekunnin välein (2 pt:n nykäys).</summary>
        void Heilu(bool paalla)
        {
            paalla &= !LinssiUi.VahennettyLiike();
            if (paalla == heiluu) return;
            heiluu = paalla;
            heilunta?.Pause();
            heijastus.style.translate = heijastus2.style.translate = ulko2.style.translate = new Translate(0, 0);
            AjelehdusLepoon();
            if (!paalla) return;
            float t0 = Time.unscaledTime;
            // Heijastus lasissa ja ulko-osat lasin takana liikkuvat hitaasti vastakkain (katsojan pää liikkuu): syvyys.
            heilunta = heijastus.schedule.Execute(() =>
            {
                float u = (Time.unscaledTime - t0) / 8f * 2f * Mathf.PI;
                var h = new Translate(3f * Mathf.Sin(u), 2f * Mathf.Sin(u * 0.5f));
                heijastus.style.translate = heijastus2.style.translate = h;
                ulko2.style.translate = new Translate(-1.6f * Mathf.Sin(u), -1f * Mathf.Sin(u * 0.5f));
                if (Ajelehdus) Ajelehdi(Time.unscaledTime - t0, h);
                else AjelehdusLepoon();
                PaivitaReunavalo();
            }).Every(33);
        }

        /// <summary>
        /// PAINOTON AJELEHDUS (omistaja 28.9. klo 16.3x Päätoimittajan kautta: "pitäisikö kameran liikkua hieman sisällä (eteen,
        /// taakse ja sivuille) niin että lasin muoto ja näkymä eläisivät hieman kuin kamera olisi painottomassa tilassa kuvun
        /// sisällä?"): katsojan pää ajelehtii hitaasti (jaksot 23–47 s, useampi sini, jotta liike ei toistu), joten lähellä oleva
        /// kehys ja lasin heijastus siirtyvät ja skaalautuvat, ulko-osat (~10 m) vain kymmenesosan, ja maa pysyy (parallaksi).
        /// Kallistus enintään 0,5°. Kehys on skaalattu 1,08:aan, jotta reunat eivät tule näkyviin siirtymän ja kierron aikana.
        /// Vähennetty liike: pois (Heilu ei käynnisty). A/B `astro kyyti ajelehdus 0|1`.
        /// </summary>
        public static bool Ajelehdus = true;
        /// <summary>
        /// Kellunta (omistaja 29.9.2026: "Cupola heijaa ihan vähän: hidas, pieni kellunta (muutama pt / alle asteen, jakso useita
        /// sekunteja)"): jaksot 23–47 s lyhennetään tällä kertoimella 6,6–13 s:iin, jotta leijunta tuntuu; laajuus ennallaan.
        /// A/B `astro kyyti kellunta <kerroin>` (1 = 28.9.).
        /// </summary>
        public static float Kellunta = 3.5f;
        const float AjelehdusX = 8f, AjelehdusY = 7f, AjelehdusSkaala = 0.015f, AjelehdusKallistus = 0.5f, KehysPohja = 1.08f;

        void Ajelehdi(float t, Translate heijastuksenOma)
        {
            const float tau = 2f * Mathf.PI;
            // Cupola 3:ssa liike puolitettuna (kuva on sommiteltu ruudulle, ylimääräistä reunaa vain 1,04 ×).
            float k = cupola3 ? Cupola3Ajelehdus : 1f;
            t *= Kellunta;
            float x = k * AjelehdusX * (0.6f * Mathf.Sin(tau * t / 31f) + 0.4f * Mathf.Sin(tau * t / 47f + 1.3f));
            float y = k * AjelehdusY * (0.6f * Mathf.Sin(tau * t / 23f + 0.7f) + 0.4f * Mathf.Sin(tau * t / 41f + 2.1f));
            float z = k * Mathf.Sin(tau * t / 37f + 0.4f);
            float kulma = k * AjelehdusKallistus * Mathf.Sin(tau * t / 29f + 1.1f);
            // Lähellä: kehys ja lasin heijastus (pää liikkuu, lähellä oleva siirtyy vastakkain); heijastuksen oma heilunta päälle.
            // Pohja on lasin zoom (1,3) tai vähintään KehysPohja, jotta reunat eivät tule näkyviin; rajauksissa ikkunan rajaus.
            float pohja = Mathf.Max(LasinZoom, KehysPohja);
            var siirto = Vector2.zero;
            float skaala = pohja + AjelehdusSkaala * z;
            if (rajattu && Rajaa(out siirto, out float rz)) skaala = rz * (1f + AjelehdusSkaala * z);
            var lahi = new Scale(Vector3.one * skaala);
            var kierto = new Rotate(-kulma);
            kehys2.style.translate = new Translate(siirto.x - x, siirto.y - y);
            kehys2.style.scale = lahi;
            kehys2.style.rotate = kierto;
            heijastus2.style.translate = new Translate(siirto.x + heijastuksenOma.x.value - x, siirto.y + heijastuksenOma.y.value - y);
            heijastus2.style.scale = lahi;
            heijastus2.style.rotate = kierto;
            AsetaValot(new Translate(siirto.x - x, siirto.y - y), lahi, kierto, siirto.y - y, skaala);
            // Kaukana: ulko-osat kymmenesosan, kallistus sama (pään kierto kääntää kaiken).
            var ulko = ulko2.style.translate.value;
            ulko2.style.translate = new Translate(ulko.x.value - 0.1f * x, ulko.y.value - 0.1f * y);
            ulko2.style.scale = new Scale(Vector3.one * (pohja + 0.1f * AjelehdusSkaala * z));
            ulko2.style.rotate = kierto;
        }

        /// <summary>Ajelehdus pois (A/B tai vähennetty liike): kerrokset lepoasentoon (skaala = lasin zoom, ei kiertoa).</summary>
        void AjelehdusLepoon()
        {
            var zoom = new Scale(Vector3.one * LasinZoom);
            foreach (var e in new[] { kehys2, heijastus2, ulko2 })
            {
                e.style.scale = zoom;
                e.style.rotate = StyleKeyword.Null;
            }
            kehys2.style.translate = StyleKeyword.Null;
            if (rajattu && Rajaa(out var siirto, out float rz))
            {
                var t = new Translate(siirto.x, siirto.y);
                var s = new Scale(Vector3.one * rz);
                kehys2.style.translate = heijastus2.style.translate = t;
                kehys2.style.scale = heijastus2.style.scale = s;
                AsetaValot(t, s, StyleKeyword.Null, siirto.y, rz);
            }
        }

        // ── RAJAUKSET: PYÖREÄ JA HORISONTTI (omistaja 28.9. klo 21.5x ja 22.5x Päätoimittajan kautta, mainosvideon ISS-ikkuna) ────
        // "tuossa elää auringon valo ikkunanpokissa. ainakin tuo että on todella pimeää ohjaamossa tuo tunnelmaa" ja horisontti-
        // luonnoksen jälkeen "voisiko ennemmin käyttää sitä pyöreää ikkunaa ja rajata se lähelle? toimisi aika hyvin vähän eri
        // rajauksella pysty ja vaaka muodossa". Cupola 2 -kehys (iPhonen kuva, terävä alkuperäinen) suurennetaan:
        //   PYÖREÄ (oletus): kattoikkuna (alfa-aukko x 299–907, y 1021–1623, keskus 603, 1322, halkaisija ~605) täyttää 94 % ruudun
        //     lyhyemmästä sivusta keskellä, karmi ja pala viereisistä ikkunoista näkyy reunoilla. Vaakasuunnassa säiliö (kupu)
        //     käännetään 90°, jolloin pystyn kuva peittää leveän ruudun ja rajaus on sama; katse 55° (IssKuvakulma).
        //   HORISONTTI (A/B): yläikkuna (x 376–826, y 96–837) 2,3-kertaisena (86 % leveydestä) keskikohta 39 %:n korkeudella, kehys
        //     täyttää ruudun yläreunaan asti, alareunassa pala kattoikkunaa; katse 36°, maan kaari ikkunan yläkolmanneksessa.
        //     Ajelehduksen avaama rako kuvan yläreunassa peittyy pimeällä katolla.
        // Kehys tummennetaan 0,22:een, ja auringonvalo elää pokissa: neljä reunavalokuvaa (valo oikealta, vasemmalta, ylhäältä,
        // alhaalta; laskettu kehyksen alfasta: kehyksen pikseli valaistuu, jos ikkuna on sen ja auringon välissä) painotetaan
        // auringon suunnalla kehyskuvassa (CupolaKerros.Valo, käännetyssä kuvussa 90°), ja alhaalta tulee lisäksi sininen maavalo.
        // Pyöreässä rajauksessa oletuksena Codexin Cupola 3 (28.9. klo 22.4x, Ohjaamo3): valmiiksi rajattu ohjaamo ja kolme
        // reunavaloa Cupola 2 -kehyksen ja neljän laskennallisen reunavalon tilalla; Cupola 2 -rajaus A/B:nä.
        // A/B: astro kyyti rajaus pyorea|horisontti|katto, katse <astetta>|pois, tumma <0–1>, reunavalo 0|1.
        public static float OhjaamonTummuus = 0.22f;
        public static bool Reunavalo = true;
        const float HorisontinLeveys = 0.858f, HorisontinKeskus = 0.39f, PyoreanOsuus = 0.94f;
        const float KuvaL = 1206f, KuvaK = 2622f, YlaikkunaX = 601f, YlaikkunaY = 466f, YlaikkunaL = 450f;
        const float PyoreaX = 603f, PyoreaY = 1322f, PyoreaL = 605f;
        static readonly Color OhjaamonVari = new Color(0.012f, 0.013f, 0.02f, 1f);
        static readonly Color Lampo = new Color(1f, 0.86f, 0.66f), Sini = new Color(0.45f, 0.66f, 1f);
        const float ReunavaloVoima = 0.95f, MaavaloVoima = 0.4f;
        bool rajattu, kupuKaannetty;

        /// <summary>
        /// Rajaus: skaala <paramref name="z"/> ja siirto <paramref name="siirto"/> (pt kuvun omassa koordinaatistossa; transform-origin
        /// keskellä, eli piste = c + siirto + z (p − c)), joilla cover-kuvan ikkuna tulee paikalleen. false = asettelu puuttuu.
        /// </summary>
        Vector2? kuvanAsema;

        /// <summary>
        /// Taustakuvan vasemman yläkulman paikka laatikossa (pt; negatiivinen, kun cover-kuva on laatikkoa suurempi, kuten
        /// AikajanaNakyma) kaikille Cupola-kuvakerroksille; null = keskellä (USS center).
        /// </summary>
        void AsetaKuvanAsema(Vector2? kulma)
        {
            if (kulma == kuvanAsema) return;
            kuvanAsema = kulma;
            var x = kulma.HasValue ? new BackgroundPosition(BackgroundPositionKeyword.Left, new Length(kulma.Value.x)) : new BackgroundPosition(BackgroundPositionKeyword.Center);
            var y = kulma.HasValue ? new BackgroundPosition(BackgroundPositionKeyword.Top, new Length(kulma.Value.y)) : new BackgroundPosition(BackgroundPositionKeyword.Center);
            kehys2.style.backgroundPositionX = x; kehys2.style.backgroundPositionY = y;
            heijastus2.style.backgroundPositionX = x; heijastus2.style.backgroundPositionY = y;
            foreach (var v in valot) { v.style.backgroundPositionX = x; v.style.backgroundPositionY = y; }
        }

        bool Rajaa(out Vector2 siirto, out float z)
        {
            siirto = Vector2.zero; z = 1f;
            float W = kupu.layout.width, H = kupu.layout.height;
            if (!(W > 1f) || !(H > 1f)) return false;
            // Cupola 3: kuva on jo rajattu ruudulle (cover), pieni suurennos ajelehdusta varten, ja ikkuna kohti keskustaa: kuva
            // siirtyy laatikon sisällä cover-ylijäämän verran (taustakuva leikataan laatikkoon, cl19) ja loput laatikon siirtona.
            if (cupola3)
            {
                bool ipad = IssKuvakulma.Cupola3Kuva(Screen.width, Screen.height).ipad;
                z = IkkunanSuurennos > 0f ? IkkunanSuurennos : IkkunanOletus(W, H, ipad); kuvanYlareuna = 0f;
                var d = IssKuvakulma.Cupola3Rajaus(W, H, ipad, Ohjaamo3Kulma, z, Cupola3Vara);
                var (kl, kk) = IssKuvakulma.Cupola3Koko(ipad);
                float s3 = Mathf.Max(W / (float)kl, H / (float)kk);
                AsetaKuvanAsema(new Vector2((W - (float)kl * s3) * (float)d.asemaX, (H - (float)kk * s3) * (float)d.asemaY));
                siirto = new Vector2((float)d.x, (float)d.y);
                return true;
            }
            float s = Mathf.Max(W / KuvaL, H / KuvaK);
            float ox = (W - KuvaL * s) * 0.5f, oy = (H - KuvaK * s) * 0.5f;
            kuvanYlareuna = oy;
            if (IssKuvakulma.Horisontti)
            {
                float px = ox + YlaikkunaX * s, py = oy + YlaikkunaY * s;
                z = HorisontinLeveys * W / (YlaikkunaL * s);
                siirto = new Vector2(-z * (px - W * 0.5f), HorisontinKeskus * H - H * 0.5f - z * (py - H * 0.5f));
            }
            else
            {
                float px = ox + PyoreaX * s, py = oy + PyoreaY * s;
                z = PyoreanOsuus * Mathf.Min(W, H) / (PyoreaL * s);
                siirto = new Vector2(-z * (px - W * 0.5f), -z * (py - H * 0.5f));
            }
            return true;
        }

        /// <summary>
        /// Kuvun asento: pyöreän rajauksen vaakasuunnassa säiliö on ruudun kokoinen mutta sivut vaihdettuina ja käännetty 90°
        /// myötäpäivään (pystyn kehyskuva peittää leveän ruudun); muuten koko ruutu. Kutsutaan sekunnin välein ja kun ruutu kääntyy.
        /// </summary>
        void PaivitaKupu()
        {
            float W = juuri.layout.width, H = juuri.layout.height;
            // Cupola 3: iPhonen pystykuva vaakaruudulle ja iPadin vaakakuva pystyruudulle käännettyinä (IssKuvakulma.Cupola3Kuva).
            bool kaanna = rajattu && IssKuvakulma.Rajaus == IssKuvakulma.IkkunanRajaus.Pyorea && H > 1f
                && (cupola3 ? IssKuvakulma.Cupola3Kuva(W, H).kaanna : W > H);
            if (kaanna)
            {
                kupu.style.left = (W - H) * 0.5f; kupu.style.top = (H - W) * 0.5f;
                kupu.style.width = H; kupu.style.height = W;
                kupu.style.right = StyleKeyword.Auto; kupu.style.bottom = StyleKeyword.Auto;
                kupu.style.rotate = new Rotate(90f);
            }
            else if (kupuKaannetty)
            {
                kupu.style.left = 0; kupu.style.top = 0; kupu.style.right = 0; kupu.style.bottom = 0;
                kupu.style.width = StyleKeyword.Null; kupu.style.height = StyleKeyword.Null;
                kupu.style.rotate = StyleKeyword.Null;
            }
            kupuKaannetty = kaanna;
        }

        float kuvanYlareuna;

        /// <summary>Reunavalokerrokset kehyksen asentoon ja katto kuvan yläreunaan asti (4 pt limittäin, kierto ±0,5°).</summary>
        void AsetaValot(Translate t, Scale s, StyleRotate r, float siirtoY, float skaala)
        {
            foreach (var v in valot) { v.style.translate = t; v.style.scale = s; v.style.rotate = r; }
            if (valoYhdessa != null) { valoYhdessa.style.translate = t; valoYhdessa.style.scale = s; valoYhdessa.style.rotate = r; }
            float H = kupu.layout.height;
            if (H > 1f) katto.style.height = Mathf.Max(0f, H * 0.5f + siirtoY + skaala * (kuvanYlareuna - H * 0.5f) + 4f) + KattoLiukuPt;
        }

        const float KattoLiukuPt = 60f;
        static Texture2D kattoLiuku;

        /// <summary>Katon liuku: ohjaamon väri, alfa 1 → 0 ylhäältä alas (smoothstep), 1 × 32.</summary>
        static Texture2D KattoLiuku()
        {
            if (kattoLiuku != null) return kattoLiuku;
            const int n = 32;
            var t = new Texture2D(1, n, TextureFormat.RGBA32, false) { name = "KattoLiuku", wrapMode = TextureWrapMode.Clamp, filterMode = FilterMode.Bilinear };
            var px = new Color32[n];
            for (int i = 0; i < n; i++)
            {
                // Texture2D:n rivi 0 on alhaalla: alimmainen läpinäkyvä, ylin umpinainen.
                float u = i / (n - 1f), a = u * u * (3f - 2f * u);
                px[i] = new Color(OhjaamonVari.r, OhjaamonVari.g, OhjaamonVari.b, a);
            }
            t.SetPixels32(px);
            t.Apply(false, true);
            return kattoLiuku = t;
        }

        /// <summary>
        /// Auringon reunavalo: aurinko kehyskuvassa (CupolaKerros.Valo, x oikealle, y ylös) painottaa neljää suuntaa; suoraan edessä
        /// tai takana (xy pieni) valo on laimeampi. Maan varjossa vain sininen maavalo alhaalta (CupolaKerros.MaavaloNyt).
        /// </summary>
        /// <summary>Kolme Cupola 3 -reunavaloa painoineen yhteen RT:hen; piirto vain, kun jokin paino muuttuu yli 0,01.</summary>
        void PiirraValotYhdessa(float voima)
        {
            bool muuttui = false;
            for (int i = 0; i < 3; i++)
                if (Mathf.Abs(Mathf.Clamp01(voima * cupola3Painot[i]) - valoPiirretty[i]) > 0.01f) muuttui = true;
            if (!muuttui || valoKuvat[0] == null || valoKuvat[1] == null || valoKuvat[2] == null) return;
            if (valoMat == null)
            {
                var sh = Resources.Load<Shader>("Varjostimet/CupolaValot");
                if (sh == null) { Debug.LogWarning("MATKAKIRJA linssit: CupolaValot-varjostin puuttuu, kolme kerrosta"); ValotYhdessa = false; PaivitaKehys(); return; }
                valoMat = new Material(sh) { name = "CupolaValot", hideFlags = HideFlags.HideAndDontSave };
            }
            int w = Mathf.Max(64, valoKuvat[0].width / 2), h = Mathf.Max(64, valoKuvat[0].height / 2);
            if (valoRt == null || valoRt.width != w || valoRt.height != h)
            {
                VapautaValoRt();
                valoRt = new RenderTexture(new RenderTextureDescriptor(w, h, UnityEngine.Experimental.Rendering.GraphicsFormat.R8G8B8A8_SRGB, 0)
                    { useMipMap = false, autoGenerateMips = false, msaaSamples = 1 })
                    { name = "CupolaValot", filterMode = FilterMode.Bilinear, wrapMode = TextureWrapMode.Clamp, hideFlags = HideFlags.HideAndDontSave };
                valoRt.Create();
                valoYhdessa.style.backgroundImage = new StyleBackground(Background.FromRenderTexture(valoRt));
            }
            for (int i = 0; i < 3; i++) valoPiirretty[i] = Mathf.Clamp01(voima * cupola3Painot[i]);
            valoMat.SetTexture(IdValo0, valoKuvat[0]);
            valoMat.SetTexture(IdValo1, valoKuvat[1]);
            valoMat.SetTexture(IdValo2, valoKuvat[2]);
            valoMat.SetVector(IdPainot, new Vector4(valoPiirretty[0], valoPiirretty[1], valoPiirretty[2], 0f));
            Graphics.Blit(null, valoRt, valoMat);
            valoYhdessa.MarkDirtyRepaint();
        }

        void VapautaValoRt()
        {
            if (valoRt == null) return;
            if (valoYhdessa != null) valoYhdessa.style.backgroundImage = StyleKeyword.None;
            valoRt.Release();
            UnityEngine.Object.Destroy(valoRt);
            valoRt = null;
            valoPiirretty[0] = -1f;
        }

        void PaivitaReunavalo()
        {
            if (!rajattu || !Reunavalo) return;
            var valo = CupolaKerros.ValoTiedossa ? CupolaKerros.Valo : Vector4.zero;
            float aurinko = Mathf.Clamp01(valo.w);
            // Aurinko kehyskuvan suunnissa: kuvu käännetty 90° myötäpäivään → ruudun oikea on kuvan ylä ja ruudun ylä kuvan vasen.
            var s = kupuKaannetty ? new Vector2(-valo.y, valo.x) : new Vector2(valo.x, valo.y);
            float sivu = s.magnitude;
            if (sivu > 1e-3f) s /= sivu;
            float voima = ReunavaloVoima * aurinko * Mathf.Lerp(0.45f, 1f, Mathf.Clamp01(sivu * 1.4f));
            if (cupola3)
            {
                // Codexin kerroksissa on jo oma sävy (luode ja lounas lämmin, koillinen viileä), joten vain alfa; ei maavaloa.
                IssKuvakulma.Cupola3Valot(s.x, s.y, cupola3Painot);
                if (ValotYhdessa) { PiirraValotYhdessa(voima); return; }
                for (int i = 0; i < cupola3Painot.Length; i++)
                    valot[i].style.unityBackgroundImageTintColor = new Color(1f, 1f, 1f, Mathf.Clamp01(voima * cupola3Painot[i]));
                return;
            }
            float maa = MaavaloVoima * CupolaKerros.MaavaloNyt;
            for (int i = 0; i < valot.Length; i++)
            {
                float w = i == 0 ? s.x : i == 1 ? -s.x : i == 2 ? s.y : -s.y;
                float a = voima * Mathf.Max(0f, w);
                Color c = Lampo;
                if (i == 3)
                {
                    c = a + maa > 1e-4f ? (Lampo * a + Sini * maa) / (a + maa) : Sini;
                    a = Mathf.Clamp01(a + maa);
                }
                valot[i].style.unityBackgroundImageTintColor = new Color(c.r, c.g, c.b, a);
            }
        }

        /// <summary>Cupola-kerrosten suurennos: sama kuin ikkunan kenttäkulman zoom (IssKuvakulma.LasiZoom), vähintään 1.</summary>
        static float LasinZoom => Mathf.Max(1f, (float)IssKuvakulma.LasiZoom);

        /// <summary>
        /// PÖLYHIUKKASET AURINGONSÄTEESSÄ (Päätoimittajan käsky 28.9. klo 16.3x): 34 pehmeää hiukkasta leijuu kuvun sisällä ja
        /// näkyy vain vinossa valokeilassa, kun ISS on auringossa (CupolaKerros.Valo.w, maan varjo); yöpuolella ei mitään.
        /// Keila tulee auringon suunnasta ruudulla (Valo.xy; suoraan edessä tai takana oletusvinous ylävasemmalta), joten se
        /// kääntyy hitaasti ISS:n kiertäessä. Hiukkanen on pehmeä säteittäinen hehku (PolyKuva, isommat epätarkempia) ja
        /// välähtää kääntyessään (tuike). Liike 0,6–2 pt/s ja kevyt pyörre; vähennetyllä liikkeellä paikallaan.
        /// A/B `astro kyyti polyt 0|1`. POIS 30.9. (omistaja: "nykyiset pölyhiukkaset ovat keinotekoisen näköisiä ja ne voi
        /// ottaa pois"): ei piirretä eikä ajeta; koodi jää A/B:ksi mahdollista uutta toteutusta varten.
        /// </summary>
        public static bool Polyt = false;
        const int PolyMaara = 34;
        /// <summary>Keilan puolileveys (σ) osuutena ruudun lyhyemmästä sivusta ja hiukkasen suurin peitto.</summary>
        const float KeilaOsuus = 0.2f, PolyPeitto = 0.65f;
        /// <summary>Hiukkaset: paikka 0–1 (u, v), säde pt ja tuikkeen vaihe; nopeus pt/s.</summary>
        readonly Vector4[] poly = new Vector4[PolyMaara];
        readonly Vector2[] polyNopeus = new Vector2[PolyMaara];
        bool polytAlustettu, polytPaalla;
        float polyAika, polyEdellinen;
        IVisualElementScheduledItem polyAjo;

        void PolytPaalle(bool paalla)
        {
            paalla &= Polyt;
            if (paalla == polytPaalla) return;
            polytPaalla = paalla;
            polyAjo?.Pause();
            polyt.style.display = paalla ? DisplayStyle.Flex : DisplayStyle.None;
            if (!paalla) return;
            if (!polytAlustettu)
            {
                polytAlustettu = true;
                var r = new System.Random(28092026);
                for (int i = 0; i < PolyMaara; i++)
                {
                    // Muutama iso ja epätarkka lähellä katsojaa, loput pieniä.
                    float sade = i < 5 ? 3f + 1.5f * (float)r.NextDouble() : 1.2f + 1.6f * (float)r.NextDouble();
                    poly[i] = new Vector4((float)r.NextDouble(), (float)r.NextDouble(), sade, (float)(r.NextDouble() * 6.283));
                    float suunta = (float)(r.NextDouble() * 6.283), vauhti = 0.6f + 1.4f * (float)r.NextDouble();
                    polyNopeus[i] = new Vector2(Mathf.Cos(suunta), Mathf.Sin(suunta)) * vauhti;
                }
            }
            polyEdellinen = Time.unscaledTime;
            // Kuten heilunta: 30 kertaa sekunnissa, vain ikkunassa; valo luetaan joka piirrossa (keila kääntyy ISS:n mukana).
            polyAjo = polyt.schedule.Execute(() =>
            {
                float nyt = Time.unscaledTime, dt = Mathf.Min(0.1f, nyt - polyEdellinen);
                polyEdellinen = nyt;
                if (!LinssiUi.VahennettyLiike()) polyAika += dt;
                polyt.MarkDirtyRepaint();
            }).Every(33);
        }

        /// <summary>
        /// Hiukkasen kuva: pehmeä säteittäinen hehku (kaksi Gaussia, reunalla nolla), 64 × 64 valkoinen alfalla; väri ja kirkkaus
        /// kärjen sävystä. Painter2D:n sisäkkäiset ympyrät näyttivät laitteella (cl12) renkailta, joten yksi kuvioitu neliö.
        /// </summary>
        static Texture2D polyKuva;
        static Texture2D PolyKuva()
        {
            if (polyKuva != null) return polyKuva;
            const int n = 64;
            var t = new Texture2D(n, n, TextureFormat.RGBA32, false) { name = "Polyhiukkanen", wrapMode = TextureWrapMode.Clamp, filterMode = FilterMode.Bilinear };
            var px = new Color32[n * n];
            for (int y = 0; y < n; y++)
                for (int x = 0; x < n; x++)
                {
                    float dx = (x + 0.5f) / n * 2f - 1f, dy = (y + 0.5f) / n * 2f - 1f, r2 = dx * dx + dy * dy;
                    float a = r2 >= 1f ? 0f : Mathf.Clamp01(0.8f * Mathf.Exp(-r2 * 22f) + 0.2f * Mathf.Exp(-r2 * 5f)) * (1f - r2);
                    px[y * n + x] = new Color32(255, 255, 255, (byte)Mathf.RoundToInt(a * 255f));
                }
            t.SetPixels32(px);
            t.Apply(false, true);
            return polyKuva = t;
        }

        readonly Vector4[] polyNakyvat = new Vector4[PolyMaara];

        void PiirraPolyt(MeshGenerationContext mgc)
        {
            float w = polyt.contentRect.width, h = polyt.contentRect.height;
            if (!(w > 0) || !(h > 0) || !CupolaKerros.ValoTiedossa) return;
            var valo = CupolaKerros.Valo;
            float aurinko = Mathf.Clamp01(valo.w);
            if (aurinko < 0.01f) return;
            // Keilan suunta ruudulla (y alas): valo kulkee auringosta poispäin, eli (−x, +y); suoraan edessä tai takana vinosti.
            var suunta = new Vector2(-valo.x, valo.y);
            if (suunta.sqrMagnitude < 0.04f) suunta = new Vector2(0.55f, 0.83f);
            suunta.Normalize();
            var normaali = new Vector2(-suunta.y, suunta.x);
            var keski = new Vector2(w * 0.5f, h * 0.45f);
            float sigma = KeilaOsuus * Mathf.Min(w, h);
            bool liikkuu = !LinssiUi.VahennettyLiike();
            int m = 0;
            for (int i = 0; i < PolyMaara; i++)
            {
                var q = poly[i];
                var v = polyNopeus[i];
                // Ajelehdus ja pyörre (pieni sini), kiedottuna ruudun ympäri.
                float x = q.x * w + v.x * polyAika + (liikkuu ? 6f * Mathf.Sin(0.21f * polyAika + q.w) : 0f);
                float y = q.y * h + v.y * polyAika + (liikkuu ? 5f * Mathf.Cos(0.17f * polyAika + 1.7f * q.w) : 0f);
                x = Mathf.Repeat(x, w); y = Mathf.Repeat(y, h);
                float etaisyys = Vector2.Dot(new Vector2(x, y) - keski, normaali) / sigma;
                float keila = Mathf.Exp(-etaisyys * etaisyys);
                float tuike = liikkuu ? 0.6f + 0.4f * Mathf.Sin(1.3f * polyAika + 3f * q.w) : 0.8f;
                float b = PolyPeitto * aurinko * keila * tuike;
                if (b < 0.01f) continue;
                polyNakyvat[m++] = new Vector4(x, y, q.z, b);
            }
            if (m == 0) return;
            var md = mgc.Allocate(m * 4, m * 6, PolyKuva());
            for (int i = 0; i < m; i++)
            {
                var p = polyNakyvat[i];
                // Kuvan neliö on hehkun halkaisija: hiukkasen säde × 2 × 2,4 (ydin noin kolmannes, loput pehmeää hehkua).
                float puoli = p.z * 2.4f;
                var tint = (Color32)new Color(1f, 0.96f, 0.88f, Mathf.Clamp01(p.w * 1.25f));
                md.SetNextVertex(new Vertex { position = new Vector3(p.x - puoli, p.y - puoli, Vertex.nearZ), tint = tint, uv = new Vector2(0, 1) });
                md.SetNextVertex(new Vertex { position = new Vector3(p.x + puoli, p.y - puoli, Vertex.nearZ), tint = tint, uv = new Vector2(1, 1) });
                md.SetNextVertex(new Vertex { position = new Vector3(p.x + puoli, p.y + puoli, Vertex.nearZ), tint = tint, uv = new Vector2(1, 0) });
                md.SetNextVertex(new Vertex { position = new Vector3(p.x - puoli, p.y + puoli, Vertex.nearZ), tint = tint, uv = new Vector2(0, 0) });
                ushort k = (ushort)(i * 4);
                md.SetNextIndex(k); md.SetNextIndex((ushort)(k + 1)); md.SetNextIndex((ushort)(k + 2));
                md.SetNextIndex(k); md.SetNextIndex((ushort)(k + 2)); md.SetNextIndex((ushort)(k + 3));
            }
        }

        /// <summary>Linssi vaihtui tai suljettiin: kyydin UI pois.</summary>
        public void Pois() { if (Tila != KyydinTila.Kauko) Aseta(KyydinTila.Kauko, 0, 0, false, default); }
    }
}
