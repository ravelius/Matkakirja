// UI:n testikomennot ilman kosketusta (Natiivi-UI), samalla tiedostoperiaatteella
// kuin PeliKomennot: Mac kirjoittaa sovelluksen Documents-kansioon tiedoston
// ui-komento.txt, sovellus lukee sen sekunnin välein, poistaa sen ja ajaa rivit
// jonossa. Rivit ja tulokset kirjataan Documents/ui-loki.txt:hen.
//
//   ui valikko | ui asetukset | ui sulje      avaa päävalikon / äänentasot, sulkee
//   ui matka                                  esimerkkimatkavalinta (ilman peliä)
//   ui kortti [kaupunki] [oma]                kaupunkikortti (oletus firenze, ilman peliä; oma = Tutki + Mannerlento)
//   ui kysymys [laji]                         esimerkkikysymys ilman peliä: visa (oletus), vaite,
//                                             kuva, lippu, pulma [id],
//                                             tulos [laattatyyppi], kohtaaminen,
//                                             kohtaaminen-tervehdys (KysymysEsimerkki.cs)
//   ui selite                                 karttaselite auki (Nostot-välilehti)
//   ui aloitus [portti|valinta|kortti|lento|jatka]  aloitusnäkymä ilman peliä (valinta kartalla, kortti = vara, lento = avausteksti pallon päällä)
//   ui aloita [kaupunki] | ui jatka           automaatio: ohittaa aloitusnäkymän (UusiMatka / Jatka);
//                                             listan ulkopuolinen kaupunki (pariisi) = oletuslähtö Pariisi
//   ui lehti <kaupunki> [sivu] | ui lehti sivu n | ui lehti kuva | ui maalehti <ISO> [aihe] | ui lehti sisallys(-ala)
//   ui wiki [otsikko]                         Lue lisää -artikkeli (oletus Venetsia: pelin oma artikkeli)
//   ui piikit [s] [kynnys ms] | ui piikit pois  pitkien kehysten raskaimmat profilointimerkit lokiin (oletus 20 s,
//                                             40 ms; KehysPiikit.cs), esim. ennen komentoa ui jatka
//   ui skaala piste|viite|auto                UI-skaala: iOS-pisteet (iPadin oletus, 1 yksikkö = web CSS-px), puhelimen
//                                             viiteruutu 393 × 852 tai automaattinen; kirjaa paneelin leveyden
//   ui napauta x y                            napautus UI Toolkitiin paneelin pisteessä (UI-yksiköt = iPadilla pt):
//                                             poiminta ylimmästä kerroksesta alkaen (sama polku kuin sormella:
//                                             rajauslaatikko + ContainsPoint), PointerDown ja PointerUp osumaan; kirjaa osuman
//   ui peitteet [osuus]                       lokiin näkyvät UI-elementit, jotka peittävät vähintään osuuden (oletus 0,5)
//                                             ruudusta ja piirtävät jotain (tausta, kuva, reuna): kerros, luokat, tehollinen
//                                             läpinäkyvyys, taustaväri ja kuva (koko ruudun sävyn etsintä)
//   ui tyohuone raamattu | kehittajalehti | tilanne [sivu] | poiminnat | musiikki | grafiikka | lukijoilta | tilastot
//                                             KOKEET-työhuone kehittäjän liitteinä
//                                             (vain kehittäjätilassa; aineisto sisältöpaketin tyohuone-moduuleista)
//   ui tyohuone poiminta [avain]              tallentaa testiparin laitteelle (oletus aihe:pariisi:kaupunki) ja
//                                             avaa Pöllöpoiminnat-vientisivun; ui tyohuone tyhjenna poistaa parit
//   ui lehti vierita <px|loppu>               auki olevan sivun vieritys (kuvasarjat ilman kosketusta)
//   ui lehti tehtava | tehtava-pois | viimeinen  alapalkin tehtävänappi (keksitty tila) / viimeinen sivu (Maa-liite)
//   ui lehti fokus [kaupunki] [juliste]       kaupunkilehti fokustehtävän sivulla (oletus ateena; AARTEEN AVAUS,
//                                             juliste = JULISTE-tehtävä); vastaus ja pulla kirjataan, jos peli on käynnissä
//   ui lehti fokus-vastaa n | fokus-pulla     napauttaa fokustehtävän vaihtoehtoa n (0–) / pullanappia (2× = osto)
//   ui nosto <valoId> [nappi]                 nostokortti karttavalon id:llä (kokoelma karttavalot, skeema 1.24):
//                                             skandaali:<id> | hetki:<id> | elaintaky:<ISO> | kohde:<id>[@ISO]
//                                             (napakohde: kohde:ata-etelanapa-asema, kohde:ark-pohjoisnapa)
//                                             | nosto:<id> (täkynosto tai maalehtinosto, kokoelma takynostot:
//                                             nosto:sofia-korut, nosto:maalehti-peilisali) | takynosto:<id>[@kaupunki]
//                                             (esim. areena, schliemann, maailmannayttely-1873)
//                                             | syvennys:<kaupunki>-<täky> (esim. wien-sahko, ateena-nike); lokiin
//                                             laji · luokka · otsikko (· leikekirja · kartalla); nappi painetaan
//                                             latauksen jälkeen: lisaa | ihme | leikekirja | kartalla | liite |
//                                             valokuva | vastaa<n> (0–) | juliste | kysy<n>
//                                             (lisäkaupunki: kohde:nakyva-kaupunki-lyon → lisäkaupungin kortti)
//   ui nostonappi <nappi>                     painaa auki olevan nostokortin nappia (esim. vastaa0, sitten juliste)
//   ui ihme [kohde[@ISO]]                     kohdekortti ja "Koe ihme" -suurennos (oletus akropolis@GRC;
//                                             kadonnut ihme on kortin ensimmäinen kuva nauhoineen: ui nosto kohde:crystal-palace@GBR)
//   ui leikekirja [kohde[@ISO]]               kohdekortti ja sen "Livian leikekirja" (oletus troija@TUR; Kreikka:
//                                             delfoi@GRC, olympos@GRC, antikythera@GRC). Pelissä pooli on pelaajan
//                                             kaupungin (web nostoPooli), ilman peliä kohteen maan täkynosto
//   ui pooli <kaupunki>                       kaupungin täkypooli lokiin (web nostoKaupunginPooli: oma virta tai
//                                             kokoelma takynostot.kaupungit), esim. ui pooli ateena
//   ui lisakaupunki [nimi]                    lisäkaupungin kortti (oletus lyon = kohde:nakyva-kaupunki-lyon)
//   ui kaupunki <id> [nostot [aihe|n] | kohde n | alas | ylos]  kaupunkikortti ilman peliä (kuten ui kortti) ja
//                                             nostokategoriat haitarina: nostot = avaa aiheen (tai n:nnen,
//                                             oletus ensimmäinen) ja kirjaa kategoriat lokiin; kohde n = avatun
//                                             kategorian n:s rivi (kortti kiinni, nosto auki); alas/ylos = kelausrivi
//   ui huipennus                              matkan huipennus (kaikki aarteet) esimerkkiluvuin
//   ui paljastus [tyyppi] [kaupunki] [kaari]  aarteen paljastus koko ruudulle ilman peliä ja ääniä (Paljastus.Testaa):
//                                             star (oletus) | isoAarre | pieniAarre | mannerAarre | pollo | piirros;
//                                             kaupunki antaa mantereen nimen (oletus pariisi); kaari = kaaritekstin paikka
//   ui reaktio [nakyma] [arg]                 reaktionapit KUIVANA (ei verkkoa, ei jonoa; Reaktiot.Kuiva = true):
//                                             lehti [kaupunki] (aihesivu 2, oletus firenze) | nosto [kohde:id@ISO] (oletus pompeji) |
//                                             nahtavyys [kaupunki] [n] | huono (Mikä oli vialla?) | virhe (lomake,
//                                             "Lähetä Livialle" / "Peru") | tila (oma ääni, jono) | kuiva pois
//   ui reaktio laheta virhe <kohde> <teksti>  OIKEA lähetys erikseen: virheilmoitus workerille (POST /laheta)
//   ui reaktio laheta aani <kohde> [symboli]  OIKEA ääni (POST /reaktio; tyhjä symboli = peru oma)
//   ui sahke liuska|apu|sulje|kiinni|uusi|jasen|tila   sähkeliuska ja retkikuntaosio valekutsuin (SahkeNakyma.Testaa)
//   ui sahketehtava [kaupunki] [tila]         pöllön sähketehtävä ilman peliä (oletus sofia tyhja), oikea sisältö ja
//                                             hakemisto, hiljainen. Tilat: tyhja | ohi | ohi2 (vinkki) | pullat (ostettu) |
//                                             odotus (pöllön tuomio matkalla 8 s) | eivastausta | osui (kuittaus) |
//                                             lahetetty | sulje | tila (SahketehtavaNakyma.Testaa)
//   ui laukku [esimerkki]                     matkalaukku (pelin data; esimerkki = keksitty sisältö)
//   ui julisteet [n]                          julistegalleria, n ensimmäistä voitettuna (oletus 7)
//   ui tietaja [pisteet]                      Tietäjän tie -minipopup (oletus 120)
//   ui seloste                                laukku esimerkillä + Aarnin luettelon pikkuseloste
//   ui nahtavyydet [kaupunki] [kohde n]      nähtävyysnäkymä (oletus firenze); kohde n avaa n:nnen kohteen jutun
//   ui opas [kaupunki] [vieritä px]           turistiopas (oletus lontoo), valinnainen vieritys
//   ui ylapalkki [vaaka|pysty|auto|auki]    vaaka-asennon piilotettu yläpalkki ja väkäsnappi (auki = avaa väkäsistä)
//   ui ylapalkki kelluva|palkki               iPhonen kelluva yläosa päälle / pois (auto palauttaa laitteen mukaan)
//   ui mitauutta [paivittyi]                  "Mitä uutta" (versiorivi) tai "Peli päivittyi" -ilmoitus
//   ui liike                                  pieni liike: pulu lentää kerran heti (ohittaa levon)
//   ui leima [muutos] [syy]                   tapahtumakupla: rahan muutos (oletus +10 Lehden minitehtävä ratkesi)
//   ui noppa [1–6 | pois]                     näkyvä noppa: heitto Pariisista lepopaikkaan / häivytys
//   ui lippu [ISO3]                           lipun tarina (oletus FIN; skeema 1.15 maat.lipputarina)
//   ui offline demo|verkoton|verkko|pois      offline-tilan pilleri: keksitty lataus / verkon tila
//   ui maakunnat [kortti] [ISO:tunnus]        karttaselite Maakunnat-välilehdellä, valinta, kortti
//   ui pulu sano [teksti] | aani [lähde n] | ele id | tilanne laji | tunne t | pois | paalle
//   ui pulu juttu [kaupunki] [n]              pulun kuvakortti nähtävyysjutulle (oletus firenze, ensimmäinen
//                                             kuvallinen juttu tai kohde n) → "Avaa juttu" nähtävyysarkkiin;
//                                             ohittaa sijaintiehdon (webissä vain kaupungissa, jossa pelaaja on)
//   ui tietoja                                tekijätiedot ja lähteet
//   ui tehoste <nimi> [voima] | ui tehoste lista  tehoste siivutaulusta (webin sfx.play-nimet: correct, wrong,
//                                             quizOpen, tick, dieLand, paper, popup …) tai pulun (pulu.kujerrus);
//                                             lista = kaikki nimet lokiin. SOI ÄÄNEEN (mykistettynä hiljaa)
//   ui lentoaani alku [kesto s] | loppu       lennon moottoriääni (PeliOhjain.LentoAani ilman peliä)
//   ui palaute [palaute|ehdotus|kuvavinkki|pro|periaate|kuvapalaute]
//                                             palaute- ja ehdotuslomake AUKI ILMAN LÄHETYSTÄ: palaute (oletus) =
//                                             "Kerro mitä huomasit" kuten hampurilaisesta; ehdotus/kuvavinkki/pro
//                                             vierittää (ja avaa väkäsen); periaate = aloitusportin periaatteet
//                                             palautelohkon kohdalla; kuvapalaute = havainnekuvan palaute
//                                             minipopupissa keksityllä kuvalla. Lähetys vain napista käsin.
//   ui haku <kysymys>                         pulun paikallisen haun katkelmat (leima + pisteet)
//   ui liiku                                  Liiku-napin napautus: kulkutapaliuku auki (peli käynnissä)
//   ui chat [kysymys]                         pulun keskustelu auki / kysy (lehti tai nähtävyysjuttu auki → "Ehdota tallennettavaksi")
//   ui traileri [kaupunki]                    saapumistraileri ilman puhetta (oletus lontoo)
//   ui luento [kaupunki] [loppu]              matkakirjakortti + luentakuvat (oletus ateena); loppu = Livian vuoro
//   ui matkakirja [kaupunki] [laji]           matkakirjakortin polut ilman ääntä (oletus tanger; Matkakirjamerkinnat.cs):
//                                             fokus (virran merkintä) | aarre (aarremerkintä) | saapuminen (pakin
//                                             kuvaus + nosto) | kaari (tarinakaaren saapuminen) | havainto (isoisän
//                                             paikkatieto, "Katso kuva") | satunnainen | reitti ("Matkalla — X", lähderivi);
//                                             ilman lajia kuten saapuessa. Esim. tanger havainto, bergen reitti, ateena aarre.
//   ui matkakirja auki                        avaa lapuksi alkaneen kortin (web asetaPaivakirjanKoko(false))
//                                             Saapumistekstit (skeema 1.24): lokiin valokuvien määrä ja äänite (kairo)
//                                             tai lukijan pituus; esim. kairo, fes (havainto kokoelmasta)
//   ui kartuscha [ISO3] [auki]                kartuscha maalle ilman peliä (oletus ITA)
//   ui heitto [teksti]                        kartan toimintonappi näkyviin
//   ui viesti teksti                          tilarivin hetkellinen viesti
//   ui tila teksti                            tilarivin teksti
//   ui pois | ui paalle                       koko UI piiloon / näkyviin
//   ui osuma x y                              osuuko piste (pikseleinä, origo vasen ala) UI:hin
//   ui livia [ele] [p] [astro|leiju|puhe|mini] Livia (152 × 304) keskellä kerrosta 40 (oletus blink 0.5)
//   ui livia kierros [astro|leiju|puhe]       kaikki eleet peräkkäin oikeassa ajassa (videotarkistus)
//   ui livia pois                             Livia pois
//   ui livia avaus [nollaa|peru]              Livian avausesittely (ensiliito + kuplat, ilman valintavahtia);
//                                             nollaa = lippu matkakirja-livia-avaus pois ensin, peru = keskeytä
//   ui linssi valitsin|peite|selite|astro|kuva|sumu|vertailu|maa|keksinnot|matka|radio|valikko|varusteet|sulje|pois
//                                             linssien UI esimerkkiaineistolla (Linssit/LinssiKomennot.cs)
//   ui linssi vertailu FIN SWE [ITA JPN]      vertailuarkki näillä mailla + maakäyrät (latautuu|verkko = tilat)
//   ui linssi valikko [keksinnot|matka] [kiinni|alusta]  linssin hampurilaisvalikko aikajanan ylärivissä
//   ui linssi varusteet [id|ei] [paalla]      laukun Varusteet: esikatselu + Aktivoi esimerkkilinsseillä
//   kuva nimi                                 Documents/ui-nimi.png (koko ruutu)
//   odota s                                   seuraava rivi s sekunnin päästä
using System.Collections.Generic;
using System.Linq;
using System.Globalization;
using System.IO;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class UiKomennot : MonoBehaviour
    {
        readonly Queue<string> jono = new Queue<string>();
        string polku, loki;
        float tarkistus, odotus;

        // ui livia: testikuva ilman peliä.
        VisualElement liviaKehys;
        LiviaKuva livia;
        Label liviaNimi;
        readonly LiviaTila liviaTila = new LiviaTila();
        bool liviaElaa, liviaPuhe;
        int kierros = -1;
        float kierrosAlku;
        const float KierrosTauko = 0.4f;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Kaynnista()
        {
#if !MATKAKIRJA_APPSTORE
            // Testiautomaation rajapinta (Documents/ui-komento.txt) ei kuulu App Store -käännökseen.
            UiKerros.Hae().gameObject.AddComponent<UiKomennot>();
#endif
        }

        void Start()
        {
            polku = Path.Combine(Application.persistentDataPath, "ui-komento.txt");
            loki = Path.Combine(Application.persistentDataPath, "ui-loki.txt");
        }

        void Update()
        {
            if (polku == null) return;
            if (Time.unscaledTime >= tarkistus)
            {
                tarkistus = Time.unscaledTime + 1f;
                try
                {
                    if (File.Exists(polku))
                    {
                        foreach (var rivi in File.ReadAllLines(polku)) if (rivi.Trim().Length > 0) jono.Enqueue(rivi.Trim());
                        File.Delete(polku);
                    }
                }
                catch (IOException e) { Debug.LogWarning("MATKAKIRJA ui-komento: " + e.Message); }
            }
            while (jono.Count > 0 && Time.unscaledTime >= odotus)
            {
                var rivi = jono.Dequeue();
                string tulos;
                try { tulos = Aja(rivi); }
                catch (System.Exception e) { tulos = "VIRHE " + e.Message; }
                Kirjaa(rivi + " → " + (tulos ?? "ok"));
            }
            PaivitaLivia();
        }

        /// <summary>
        /// ui reaktio: näkymät kuivana (Reaktiot.Kuiva = true, ei verkkoa eikä jonoa). Vain
        /// "ui reaktio laheta …" lähettää oikeasti (Reaktiot.TestiLahetys).
        /// </summary>
        string Reaktio(UiNakymat ui, string loput)
        {
            var r = loput.Split(new[] { ' ' }, 4, System.StringSplitOptions.RemoveEmptyEntries);
            string laji = r.Length > 0 ? r[0].ToLowerInvariant() : "lehti";
            if (laji == "laheta")
            {
                if (r.Length < 3) return "ui reaktio laheta virhe|aani <kohde> [teksti|symboli]";
                return Reaktiot.TestiLahetys(r[1].ToLowerInvariant(), r[2], r.Length > 3 ? r[3] : "", t => Kirjaa("ui reaktio laheta: " + t));
            }
            if (laji == "kuiva") { Reaktiot.Kuiva = !(r.Length > 1 && r[1] == "pois"); return "kuiva = " + Reaktiot.Kuiva; }
            if (laji == "tila")
            {
                var v = Reaktiot.Viimeisin;
                return "kuiva = " + Reaktiot.Kuiva + ", jonossa " + Reaktiot.Jonossa
                    + (v != null ? ", viimeisin " + v.Avain + " oma = '" + Reaktiot.OmaAani(v.Avain) + "'" : "");
            }
            Reaktiot.Kuiva = true;
            switch (laji)
            {
                case "lehti":
                    ui.Lehti.Nayta(LehtiLaji.Kaupunki, r.Length > 1 ? r[1].ToLowerInvariant() : "firenze", null, 1);
                    return null;
                case "nosto":
                    ui.Nostokortti.Avaa(r.Length > 1 ? r[1] : "kohde:pompeji@ITA");
                    return null;
                case "nahtavyys":
                {
                    string kid = r.Length > 1 ? r[1].ToLowerInvariant() : "firenze";
                    int nro = r.Length > 2 && int.TryParse(r[2], out var n) ? n : 0;
                    Kohdekartat.Hae(kid, k =>
                    {
                        var kohde = k?.Kohteet.Find(x => nro > 0 ? x.Numero == nro : x.Selattava);
                        if (kohde != null) ui.Nahtavyydet.AvaaKohde(k, kohde);
                        else Kirjaa("ui reaktio nahtavyys: ei kohdetta " + kid);
                    });
                    return null;
                }
                case "huono":
                case "virhe":
                {
                    // Auki olevan näkymän viimeisin rivi, muuten erillinen testirivi (ei piirry mihinkään).
                    var rivi = Reaktiot.Viimeisin?.Juuri.panel != null ? Reaktiot.Viimeisin
                        : Reaktiot.Piirra(new VisualElement(), "testi:reaktio", "Testirivi");
                    if (laji == "huono") rivi.AvaaKysymys(); else rivi.AvaaVirheikkuna();
                    return rivi.Avain;
                }
                default: return "ui reaktio lehti|nosto|nahtavyys|huono|virhe|tila|kuiva pois|laheta";
            }
        }

        /// <summary>
        /// Koko ruudun sävyn etsintä (Linssisepän sininen lisä 24.9.): jokainen näkyvä elementti, joka peittää vähintään
        /// osuuden kerroksensa juuresta ja piirtää taustaa, kuvaa tai reunaa, tehollisen läpinäkyvyyden kanssa.
        /// </summary>
        void Peitteet(float osuus)
        {
            int n = 0;
            foreach (var (kerros, juuri) in UiKerros.Hae().Juuret)
            {
                if (juuri == null) continue;
                var koko = juuri.worldBound;
                float ala = Mathf.Max(1f, koko.width * koko.height);
                void Kay(VisualElement e, float opasiteetti)
                {
                    var rs = e.resolvedStyle;
                    if (rs.display == DisplayStyle.None || rs.visibility == Visibility.Hidden) return;
                    opasiteetti *= rs.opacity;
                    if (opasiteetti <= 0.001f) return;
                    var r = e.worldBound;
                    var leikkaus = Rect.MinMaxRect(Mathf.Max(r.xMin, koko.xMin), Mathf.Max(r.yMin, koko.yMin), Mathf.Min(r.xMax, koko.xMax), Mathf.Min(r.yMax, koko.yMax));
                    float peitto = leikkaus.width > 0 && leikkaus.height > 0 ? leikkaus.width * leikkaus.height / ala : 0;
                    var tausta = rs.backgroundColor;
                    var kuva = rs.backgroundImage;
                    bool kuvallinen = kuva.texture != null || kuva.sprite != null || kuva.renderTexture != null || kuva.vectorImage != null;
                    bool reuna = rs.borderTopWidth + rs.borderBottomWidth + rs.borderLeftWidth + rs.borderRightWidth > 0 && rs.borderTopColor.a > 0;
                    if (peitto >= osuus && (tausta.a > 0 || kuvallinen || reuna))
                    {
                        n++;
                        string nimi = kuvallinen ? (kuva.texture != null ? kuva.texture.name : kuva.sprite != null ? kuva.sprite.name : kuva.renderTexture != null ? kuva.renderTexture.name : "vektori") : "-";
                        Kirjaa(string.Format(CultureInfo.InvariantCulture,
                            "peite kerros {0} [{1}] {2}: peitto {3:0.00}, opasiteetti {4:0.000}, tausta ({5:0.000}, {6:0.000}, {7:0.000}, {8:0.000}), kuva {9}, tint ({10:0.00}, {11:0.00}, {12:0.00}, {13:0.00})",
                            kerros, string.Join(".", e.GetClasses()), e.name, peitto, opasiteetti, tausta.r, tausta.g, tausta.b, tausta.a, nimi,
                            rs.unityBackgroundImageTintColor.r, rs.unityBackgroundImageTintColor.g, rs.unityBackgroundImageTintColor.b, rs.unityBackgroundImageTintColor.a));
                    }
                    foreach (var lapsi in e.hierarchy.Children()) Kay(lapsi, opasiteetti);
                }
                Kay(juuri, 1f);
            }
            Kirjaa("peitteet: " + n + " elementtiä (osuus ≥ " + osuus.ToString("0.00", CultureInfo.InvariantCulture) + ")");
        }

        /// <summary>Testinapautus paneelin pisteeseen: ylin kerros, jonka poiminta osuu (ei juuri), saa Down + Up.</summary>
        static string Napauta(Vector2 piste)
        {
            foreach (var (kerros, juuri) in UiKerros.Hae().Juuret.OrderByDescending(x => x.Kerros))
            {
                var paneeli = juuri?.panel;
                if (paneeli == null || juuri.resolvedStyle.display == DisplayStyle.None) continue;
                var osuma = paneeli.Pick(piste);
                if (osuma == null || osuma == juuri) continue;
                // Tapahtuma samalla pisteellä kuin sormi: IMGUI-tapahtumasta, kohde = poimittu elementti.
                var alas = new Event { type = EventType.MouseDown, mousePosition = piste, button = 0, clickCount = 1 };
                var ylos = new Event { type = EventType.MouseUp, mousePosition = piste, button = 0, clickCount = 1 };
                using (var e = PointerDownEvent.GetPooled(alas)) { e.target = osuma; osuma.SendEvent(e); }
                using (var e = PointerUpEvent.GetPooled(ylos)) { e.target = osuma; osuma.SendEvent(e); }
                var nappi = osuma as Button ?? osuma.GetFirstAncestorOfType<Button>();
                if (nappi == null)
                    // Laajennuksen selvitys: lähimmät kosketusnapit (keskipiste alle 40 yksikön päässä).
                    foreach (var kn in juuri.Query<Kosketusnappi>().ToList().Where(k => Vector2.Distance(k.worldBound.center, piste) < 40f))
                        Debug.Log("MATKAKIRJA ui napauta: " + kn.Diagnoosi(piste));
                return string.Format(CultureInfo.InvariantCulture, "napauta ({0:0.#}, {1:0.#}): kerros {2}, osuma [{3}]{4}", piste.x, piste.y, kerros,
                    string.Join(".", osuma.GetClasses()), nappi != null && nappi != osuma ? ", nappi [" + string.Join(".", nappi.GetClasses()) + "]" : "");
            }
            // Ei UI-osumaa: napautus pallolle kuten sormi (PalloKierto.Napauta ruutupikseleinä, origo alakulma).
            var kierto = UnityEngine.Object.FindAnyObjectByType<PalloKierto>();
            var ref0 = UiKerros.Hae().Juuri(UiKerros.Valikot);
            float pw = ref0?.layout.width ?? 0f, ph = ref0?.layout.height ?? 0f;
            if (kierto != null && pw > 0 && ph > 0)
                kierto.Napauta(new Vector2(piste.x * Screen.width / pw, Screen.height - piste.y * Screen.height / ph));
            return string.Format(CultureInfo.InvariantCulture, "napauta ({0:0.#}, {1:0.#}): ei osumaa UI:ssa → pallolle{2}", piste.x, piste.y, kierto != null ? "" : " (ei palloa)");
        }

        void Kirjaa(string teksti)
        {
            Debug.Log("MATKAKIRJA ui-komento: " + teksti);
            try { File.AppendAllText(loki, System.DateTime.Now.ToString("HH:mm:ss ") + teksti + "\n"); }
            catch (IOException) { }
        }

        /// <summary>ui kaupunki &lt;id&gt; [nostot [aihe|n] | kohde n | alas | ylos]: kortti ja nostohaitari.</summary>
        string Kaupunki(UiNakymat ui, string loput)
        {
            var o = loput.Split(new[] { ' ' }, System.StringSplitOptions.RemoveEmptyEntries);
            string kid = o.Length > 0 ? o[0] : "pariisi";
            string teko = o.Length > 1 ? o[1] : "";
            string arvo = o.Length > 2 ? o[2] : null;
            var kortti = ui.Kaupunkikortti;
            if (kortti.Kaupunki != kid)
                kortti.Nayta(kid, null, new KaupunkiToiminnot
                {
                    LueLehti = () => ui.Tilarivi.Viesti("Lue lehti"),
                    Liiku = () => ui.Tilarivi.Viesti("Liiku"),
                    Sulje = () => { },
                });
            switch (teko)
            {
                case "":
                    kortti.KunNostot(() => Kirjaa("kaupunki " + kid + ": " + kortti.Kuvaus()));
                    return null;
                case "nostot":
                    kortti.KunNostot(() => Kirjaa("kaupunki " + kid + ": " + (kortti.AvaaKategoria(arvo) ?? kortti.Kuvaus())));
                    return null;
                case "kohde":
                    if (!int.TryParse(arvo, out var n)) return "ui kaupunki <id> kohde <n>";
                    kortti.KunNostot(() =>
                    {
                        var virhe = kortti.NapautaKohde(n);
                        if (virhe != null && kortti.AvaaKategoria(null) == null) virhe = kortti.NapautaKohde(n);
                        Kirjaa("kaupunki " + kid + " kohde " + n + ": " + (virhe ?? "ok"));
                    });
                    return null;
                case "alas": kortti.KunNostot(() => kortti.Kelaa(1)); return null;
                case "ylos": kortti.KunNostot(() => kortti.Kelaa(-1)); return null;
                default: return "ui kaupunki <id> [nostot [aihe|n] | kohde n | alas | ylos]";
            }
        }

        string Aja(string rivi)
        {
            var osat = rivi.Split(new[] { ' ' }, 3, System.StringSplitOptions.RemoveEmptyEntries);
            string k = osat[0].ToLowerInvariant();
            if (k == "odota" && osat.Length > 1)
            {
                odotus = Time.unscaledTime + float.Parse(osat[1], CultureInfo.InvariantCulture);
                return null;
            }
            if (k == "kuva" && osat.Length > 1)
            {
                // Mobiilissa CaptureScreenshot tulkitsee nimen suhteessa persistentDataPathiin.
                var nimi = "ui-" + osat[1] + ".png";
                ScreenCapture.CaptureScreenshot(Application.isMobilePlatform ? nimi : Path.Combine(Application.persistentDataPath, nimi));
                // Kaappaus tapahtuu vasta ruudun lopussa: seuraava rivi odottaa, ettei kuvaan tule sen tila.
                odotus = Time.unscaledTime + 0.3f;
                return nimi;
            }
            if (k != "ui" || osat.Length < 2) return "tuntematon komento";
            string loput = osat.Length > 2 ? osat[2] : "";
            var ui = UiNakymat.Hae();
            switch (osat[1].ToLowerInvariant())
            {
                case "valikko": ui.Valikko.Avaa(); return null;
                case "asetukset": ui.Aanentasot.Avaa(); return null;
                case "sulje": ui.SuljeKaikki(); return null;
                case "matka": ui.Esimerkkimatka(); return null;
                case "pulu":
                {
                    var pu = ui.Pulu;
                    var pk = loput.Split(new[] { ' ' }, 2);
                    string arvo = pk.Length > 1 ? pk[1] : "";
                    switch (pk[0])
                    {
                        case "sano": pu.Sano(arvo.Length > 0 ? arvo : "Minä olen Livia. Kirjekyyhky, en mikään pulu."); return null;
                        case "aani":
                        {
                            var a = arvo.Split(' ');
                            string lahde = a[0].Length > 0 ? a[0] : "avaus";
                            int n = a.Length > 1 ? int.Parse(a[1]) - 1 : 0;
                            pu.Sano("(" + lahde + " " + (n + 1) + ")", Pulu.AaniOsoite(lahde, n));
                            return Pulu.AaniOsoite(lahde, n);
                        }
                        case "ele": return pu.Ele(arvo) ? null : "tuntematon ele " + arvo;
                        case "tilanne": return pu.Tilanne(arvo) ? null : "ei elettä (väli, puhe tai tuntematon)";
                        case "tunne": return pu.Tunne(arvo) ? null : "ei elettä";
                        case "pois": pu.Nayta(false); return null;
                        case "paalle": pu.Nayta(true); return null;
                        case "juttu":
                        {
                            var j = arvo.Split(new[] { ' ' }, System.StringSplitOptions.RemoveEmptyEntries);
                            string kid = j.Length > 0 ? j[0] : "firenze";
                            int nro = j.Length > 1 && int.TryParse(j[1], out var jn) ? jn : 0;
                            Kohdekartat.Hae(kid, k =>
                            {
                                var kohde = k?.Kohteet.Find(x => nro > 0 ? x.Numero == nro : x.Selattava);
                                if (kohde == null) { Kirjaa("ui pulu juttu: ei kohdetta " + kid + (nro > 0 ? " " + nro : "")); return; }
                                bool sijainti = PuluChat.NahtavyysAvattavissa(k, kohde);
                                ui.Chat.AvaaNahtavyys(k, kohde, true);
                                Kirjaa("ui pulu juttu: " + kohde.Nimi + (kohde.Juttu?.Kuvat.Count > 0 ? " (kuvakortti)" : " (juttu suoraan)")
                                    + (sijainti ? "" : " — pelaaja ei ole kaupungissa, webissä linkkiä ei näytettäisi"));
                            });
                            return null;
                        }
                        default: return "ui pulu sano|aani|ele|tilanne|tunne|pois|paalle|juttu";
                    }
                }
                case "luento":
                {
                    var lk = loput.Split(' ');
                    string kaup = lk[0].Length > 0 ? lk[0] : "ateena";
                    if (lk.Length > 1 && lk[1] == "loppu") ui.Saapuminen.Loppui(kaup); else ui.Saapuminen.Alkoi(kaup, pakota: true);
                    return null;
                }
                case "matkakirja":
                {
                    // Web asetaPaivakirjanKoko(false): puhelimella merkintä alkaa lappuna, "auki" avaa sen.
                    if (loput.Trim().ToLowerInvariant() == "auki") { ui.Matkakirja.Avaa(); Kirjaa("matkakirja auki: " + ui.Matkakirja.Tila); return null; }
                    var mk = loput.Split(' ');
                    string kaup = mk[0].Length > 0 ? mk[0].ToLowerInvariant() : "tanger";
                    string laji = mk.Length > 1 ? mk[1].ToLowerInvariant() : "";
                    ui.Saapuminen.Testi(kaup, laji, t => Kirjaa("matkakirja " + kaup + " → " + t));
                    return null;
                }
                case "traileri":
                {
                    string tk = loput.Length > 0 ? loput : "lontoo";
                    ui.Traileri.Nayta(tk, null, () => Kirjaa("traileri valmis: " + tk));
                    return null;
                }
                case "chat":
                    if (loput == "ehdota") { ui.Chat.Avaa(); ui.Chat.EhdotaSisaltoa(); return null; }
                    if (loput.Length > 0) ui.Chat.Kysy(loput); else ui.Chat.Vaihda();
                    return null;
                case "tietoja": ui.Tietoja.Avaa(); return null;
                case "piikit":
                {
                    if (loput == "pois") { KehysPiikit.Lopeta(); return null; }
                    var pk = loput.Split(new[] { ' ' }, System.StringSplitOptions.RemoveEmptyEntries);
                    float kesto = pk.Length > 0 && float.TryParse(pk[0], NumberStyles.Float, CultureInfo.InvariantCulture, out var ks) ? ks : 20f;
                    float kynnysMs = pk.Length > 1 && float.TryParse(pk[1], NumberStyles.Float, CultureInfo.InvariantCulture, out var ky) ? ky : 40f;
                    Kirjaa("piikit: " + KehysPiikit.Aloita(kesto, kynnysMs) + " merkkiä");
                    return null;
                }
                case "skaala":
                {
                    UiKerros.Hae().VaihdaSkaala(loput.Trim().ToLowerInvariant());
                    var j = UiKerros.Hae().Juuri(UiKerros.Valikot);
                    j.schedule.Execute(() => Kirjaa("skaala: " + (UiKerros.Pisteskaala ? "piste ×" + UiKerros.PikseliaPisteessa : "viite")
                        + ", tabletti " + UiKerros.Tabletti + ", paneeli " + j.layout.width.ToString("0", CultureInfo.InvariantCulture) + " × "
                        + j.layout.height.ToString("0", CultureInfo.InvariantCulture))).StartingIn(100);
                    return null;
                }
                case "napauta":
                {
                    var nk = loput.Split(new[] { ' ' }, System.StringSplitOptions.RemoveEmptyEntries);
                    if (nk.Length < 2 || !float.TryParse(nk[0], NumberStyles.Float, CultureInfo.InvariantCulture, out var nx)
                        || !float.TryParse(nk[1], NumberStyles.Float, CultureInfo.InvariantCulture, out var ny)) return "käyttö: ui napauta x y";
                    Kirjaa(Napauta(new Vector2(nx, ny)));
                    return null;
                }
                case "peitteet":
                    Peitteet(float.TryParse(loput, NumberStyles.Float, CultureInfo.InvariantCulture, out var po) ? po : 0.5f);
                    return null;
                case "tyohuone":
                {
                    var tk = loput.Split(new[] { ' ' }, 2);
                    string mita = tk[0].ToLowerInvariant(), arvo = tk.Length > 1 ? tk[1].Trim() : "";
                    switch (mita)
                    {
                        case "raamattu": Tyohuone.AvaaRaamattu(); return null;
                        case "kehittajalehti": Tyohuone.AvaaKehittajalehti(); return null;
                        case "tilanne": Tyohuone.AvaaTilanne(int.TryParse(arvo, out var ts) ? ts : 0); return null;
                        case "poiminnat": Tyohuone.AvaaTilanne(2); return null;
                        case "musiikki": Tyohuone.AvaaMusiikki(); return null;
                        case "grafiikka": Tyohuone.AvaaGrafiikka(); return null;
                        case "lukijoilta": Lukijoilta.Avaa(); return null;
                        case "tilastot": Tilastot.Avaa(); return null;
                        case "poiminta":
                            Kirjaa("tallennettu " + PoimintaVarasto.Tallenna(arvo.Length > 0 ? arvo : "aihe:pariisi:kaupunki",
                                "Testikysymys " + System.DateTime.Now.ToString("HH.mm.ss"), "Testivastaus.\n\nToinen kappale."));
                            Tyohuone.AvaaTilanne(2);
                            return null;
                        case "tyhjenna": PoimintaVarasto.Tyhjenna(); return null;
                        default: return "tuntematon: ui tyohuone " + mita;
                    }
                }
                case "wiki": ui.Wiki.Avaa(loput.Length > 0 ? loput : "Venetsia"); return null;
                case "media": Mediarivi.Testaa(loput.Length > 0 ? loput.ToLowerInvariant() : "lontoo", t => Kirjaa(t)); return null;
                case "liiku": ui.Matkavalinta.TestaaLiiku(); return null;
                case "haku":
                {
                    // Pulun paikallinen haku: katkelmien leimat ja pisteet (indeksi rakentuu ensimmäisellä kutsulla).
                    PuluHaku.Valmistele();
                    if (!PuluHaku.Valmis) return "indeksi rakentuu, toista hetken päästä";
                    var o = PeliOhjain.Instanssi;
                    string kid = o?.Matka != null && o.Matka.Tila.Pelaaja.Sijainti.Kaupungissa ? o.Matka.Tila.Pelaaja.Sijainti.Kaupunki : null;
                    var kat = PuluHaku.Hae(loput, kid, UiSisalto.Kaupunki(kid)?.Maa, _ => false);
                    return kat.Count == 0 ? "ei katkelmia" : string.Join(" | ", kat.Select(k => $"{k.Piste:0.#} {k.Leima}"));
                }
                case "tehoste":
                {
                    var tk = loput.Split(new[] { ' ' }, System.StringSplitOptions.RemoveEmptyEntries);
                    if (tk.Length == 0 || tk[0] == "lista")
                        return string.Join(" ", Aanet.TehosteNimet) + " | " + string.Join(" ", Aanet.PulunTehosteNimet);
                    float voima = tk.Length > 1 ? float.Parse(tk[1], CultureInfo.InvariantCulture) : 1f;
                    if (tk[0].StartsWith("pulu.")) { Aanet.PulunTehoste(tk[0], voima); return null; }
                    return Aanet.Tehoste(tk[0], voima) ? null : "ei soinut (tuntematon nimi tai Äänimaisema pois): " + tk[0];
                }
                case "lentoaani":
                {
                    var la = loput.Split(new[] { ' ' }, System.StringSplitOptions.RemoveEmptyEntries);
                    string mita = la.Length > 0 ? la[0] : "alku";
                    if (mita == "loppu") { Aanet.LentoAani(false); return null; }
                    if (mita != "alku") return "ui lentoaani alku [kesto] | loppu";
                    float kesto = la.Length > 1 ? float.Parse(la[1], CultureInfo.InvariantCulture) : 4.8f;
                    if (Aanet.LentoSoi) return "soi jo";
                    Aanet.LentoAani(true, kesto);
                    return null;
                }
                case "palaute":
                    switch (loput.Length > 0 ? loput : "palaute")
                    {
                        case "palaute": ui.Palaute.Avaa(); return null;
                        case "ehdotus": case "kuvavinkki": case "pro": ui.Palaute.Avaa(loput); return null;
                        case "periaate":
                            ui.Aloitus.Testaa("portti", id => ui.Tilarivi.Viesti("Lähtö: " + id));
                            ui.Aloitus.AvaaPeriaatteet();
                            return null;
                        case "kuvapalaute":
                            Kuvavinkki.AvaaKuvapalaute("kuvat/havainne/esimerkki.jpg", "Havainnekuva: esimerkki (testikomento)", PalauteLomake.EhdotusSivu(""));
                            return null;
                        default: return "ui palaute palaute|ehdotus|kuvavinkki|pro|periaate|kuvapalaute";
                    }
                case "aloitus":
                    ui.Aloitus.Testaa(loput.Length > 0 ? loput : "portti", id => ui.Tilarivi.Viesti("Lähtö: " + id));
                    return null;
                case "aloita":
                case "jatka":
                {
                    var o = PeliOhjain.Instanssi;
                    if (o == null) return "peli ei ole käynnissä";
                    // Automaatio: mikä tahansa kaupunki kelpaa; lähtökaupunkilistan ulkopuolinen (esim. pariisi,
                    // PeliOhjain.AloitusKaupunki) aloittaa oletuslähdöstä UusiMatka(null).
                    string lahto = loput.Length > 0 ? loput.ToLowerInvariant() : null;
                    if (lahto != null && !o.Lahtokaupungit().Exists(k => k.Id == lahto)) lahto = null;
                    // Piilotus ensin: UusiMatka voi käynnistää aloituslennon ja sen avaustekstin heti.
                    ui.Aloitus.Piilota();
                    string v = osat[1].ToLowerInvariant() == "jatka" ? o.Jatka() : o.UusiMatka(lahto);
                    return v;
                }
                case "lehti":
                case "maalehti":
                {
                    var l = loput.Split(' ');
                    if (osat[1] == "lehti" && (l[0] == "sivu" || l[0] == "kuva" || l[0] == "sisallys" || l[0] == "sisallys-ala" || l[0] == "tehtava" || l[0] == "tehtava-pois" || l[0] == "viimeinen"
                        || l[0] == "fokus-vastaa" || l[0] == "fokus-pulla"))
                        return ui.Lehti.Testaa(l[0], l.Length > 1 && int.TryParse(l[1], out var sn) ? sn : 0);
                    if (osat[1] == "lehti" && l[0] == "vierita")
                        return ui.Lehti.Vierita(l.Length > 1 ? l[1] : "loppu");
                    if (osat[1] == "lehti" && l[0] == "fokus")
                    {
                        ui.Lehti.TestaaFokus(l.Length > 1 && l[1].Length > 0 ? l[1].ToLowerInvariant() : "ateena", l.Length > 2 && l[2] == "juliste");
                        return null;
                    }
                    if (osat[1] == "maalehti") ui.Lehti.Nayta(LehtiLaji.Maa, l[0].Length > 0 ? l[0] : "ITA", l.Length > 1 ? l[1] : null);
                    else ui.Lehti.Nayta(LehtiLaji.Kaupunki, l[0].Length > 0 ? l[0] : "firenze", null, l.Length > 1 && int.TryParse(l[1], out var s) ? s : (int?)null);
                    return null;
                }
                case "nosto":
                {
                    var no = loput.Split(new[] { ' ' }, System.StringSplitOptions.RemoveEmptyEntries);
                    string valo = no.Length > 0 ? no[0] : "skandaali:shakkiturkkilainen";
                    ui.Nostokortti.Testaa(valo, no.Length > 1 ? no[1] : null, v => Kirjaa("ui nosto " + valo + ": " + (v ?? "auki · " + ui.Nostokortti.Kuvaus)));
                    return null;
                }
                case "pooli":
                {
                    string pk = loput.Trim().Length > 0 ? loput.Trim().ToLowerInvariant() : "ateena";
                    UiKerros.Hae().StartCoroutine(NostoSisalto.Pooli(pk, l => Kirjaa("ui pooli " + pk + ": " + l.Count + (l.Count > 0 ? " · " + string.Join(", ", l) : ""))));
                    return null;
                }
                case "nostonappi":
                {
                    string tulos = "ok";
                    ui.Nostokortti.Testaa(null, loput.Trim(), v => tulos = v);
                    return tulos == "ok" ? null : tulos;
                }
                case "ihme":
                case "leikekirja":
                {
                    string kohde = loput.Trim().Length > 0 ? loput.Trim() : osat[1] == "ihme" ? "akropolis@GRC" : "troija@TUR";
                    string valo = kohde.StartsWith("kohde:") ? kohde : "kohde:" + kohde;
                    string nappi = osat[1].ToLowerInvariant();
                    ui.Nostokortti.Testaa(valo, nappi, v => Kirjaa("ui " + nappi + " " + kohde + ": " + (v ?? "ok · " + ui.Nostokortti.Kuvaus)));
                    return null;
                }
                case "lisakaupunki":
                    ui.Nostokortti.Avaa("kohde:nakyva-kaupunki-" + (loput.Length > 0 ? loput.ToLowerInvariant() : "lyon"));
                    return null;
                case "kaupunki": return Kaupunki(ui, loput);
                case "paljastus":
                    return ui.Paljastus.Testaa(loput);
                case "reaktio":
                    return Reaktio(ui, loput);
                case "huipennus":
                    ui.Huipennus.Nayta(new MatkanYhteenveto { Paivat = 83, Kaupungit = 41, Aarteet = 6, AarteitaKaikkiaan = 6 },
                        () => ui.Aloitus.NaytaAvaus(id => ui.Tilarivi.Viesti("Lähtö: " + id)));
                    return null;
                case "sahke":
                    return ui.Sahke.Testaa(loput.Length > 0 ? loput : "liuska");
                case "sahketehtava":
                    return ui.Sahkelomake.Testaa(loput);
                case "laukku":
                    ui.Valikko.Sulje(); ui.Aanentasot.Sulje();
                    ui.Matkalaukku.Testaa(loput == "esimerkki" ? new System.Func<LaukkuNaytto>(Matkalaukku.Esimerkki) : null);
                    return null;
                case "julisteet":
                {
                    int n = int.TryParse(loput, out var m) ? m : 7;
                    UiSisalto.Lataa(() => ui.Julistegalleria.Avaa(System.Linq.Enumerable.Select(System.Linq.Enumerable.Take(UiSisalto.Julisteet, n), j => j.Id)));
                    return null;
                }
                case "leima":
                {
                    var l = loput.Split(new[] { ' ' }, 2);
                    int m = int.TryParse(l[0], out var mm) ? mm : 10;
                    ui.Leima.Raha(m, l.Length > 1 ? l[1] : "Lehden minitehtävä ratkesi");
                    return null;
                }
                case "noppa":
                    if (loput == "pois") { ui.Noppa.Haivyta(); return null; }
                    ui.HeitaNoppa(int.TryParse(loput, out var silmat) ? Mathf.Clamp(silmat, 1, 6) : UnityEngine.Random.Range(1, 7), 48.857, 2.352, null);
                    return null;
                case "ylapalkki":
                    if (loput == "auki") { ui.Tilarivi.Avaa(); return Ylapalkki.Piilossa ? null : "palkki ei ole piilossa (ui ylapalkki vaaka)"; }
                    if (loput == "kelluva" || loput == "palkki") { Ylapalkki.PakotaKelluva = loput == "kelluva"; ui.Tilarivi.Paivita(); return null; }
                    if (loput == "auto") Ylapalkki.PakotaKelluva = null;
                    Ylapalkki.Pakota = loput == "vaaka" ? true : loput == "pysty" ? false : (bool?)null;
                    ui.Tilarivi.Paivita();
                    return null;
                case "mitauutta":
                    if (loput == "paivittyi") ui.Valikko.MitaUutta.TarkistaPaivitys(true); else ui.Valikko.MitaUutta.Avaa();
                    return null;
                case "liike":
                    return ui.Liike.Lenna(true) ? null : "pieni liike on pois päältä tai lento jo käynnissä";
                case "lippu":
                {
                    string maa = loput.Length > 0 ? loput.ToUpperInvariant() : "FIN";
                    UiSisalto.Lataa(() =>
                    {
                        if (Lippuikkuna.On(maa)) Lippuikkuna.Avaa(maa);
                        else ui.Tilarivi.Viesti("Ei lipun tarinaa: " + maa);
                    });
                    return null;
                }
                case "nahtavyydet":
                {
                    var l = loput.Split(' ');
                    string kid = l[0].Length > 0 ? l[0] : "firenze";
                    ui.Nahtavyysnakyma.Avaa(kid);
                    if (l.Length > 2 && l[1] == "kohde" && int.TryParse(l[2], out var nro))
                        Kohdekartat.Hae(kid, k =>
                        {
                            var kohde = k?.Kohteet.Find(x => x.Numero == nro);
                            if (kohde != null) ui.Nahtavyydet.AvaaKohde(k, kohde);
                        });
                    return null;
                }
                case "opas":
                {
                    var l = loput.Split(' ');
                    string kid = l[0].Length > 0 ? l[0] : "lontoo";
                    float rulla = l.Length > 1 && float.TryParse(l[1], NumberStyles.Float, CultureInfo.InvariantCulture, out var px) ? px : 0f;
                    LehtiSisalto.HaeOpas(kid, o =>
                    {
                        if (o == null) { ui.Tilarivi.Viesti("Ei opasta: " + kid); return; }
                        ui.Nahtavyydet.AvaaOpas(o);
                        if (rulla > 0) ui.Nahtavyydet.Vierita(rulla);
                    });
                    return null;
                }
                case "tietaja":
                    Tietajagalleria.Avaa(int.TryParse(loput, out var tp) ? tp : 120);
                    return null;
                case "seloste":
                {
                    ui.Valikko.Sulje(); ui.Aanentasot.Sulje();
                    ui.Matkalaukku.Testaa(Matkalaukku.Esimerkki);
                    ui.Matkalaukku.AvaaTilastot();
                    var juuri = ui.Kerros.Juuri(UiKerros.Valikot);
                    juuri.schedule.Execute(() =>
                    {
                        var b = juuri.Q(className: "mk-laukku__osiorivi")?.Q<Button>(className: "mk-seloste-nappi");
                        if (b != null) Pikkuseloste.Avaa(b, Matkalaukku.AarniSeloste);
                    }).StartingIn(400);
                    return null;
                }
                case "offline":
                    switch (loput)
                    {
                        case "demo": OfflineTilaUi.TestiLataus.Kaynnista(); return null;
                        case "verkoton": ui.OfflineTila.TestaaVerkoton(true); return null;
                        case "verkko": ui.OfflineTila.TestaaVerkoton(false); return null;
                        case "pois": OfflineTilaUi.TestiLataus.Lopeta(); ui.OfflineTila.TestaaVerkoton(null); return null;
                        default: return "ui offline demo|verkoton|verkko|pois";
                    }
                case "maakunnat":
                {
                    bool kortti = loput == "kortti" || loput.StartsWith("kortti ");
                    string avain = (kortti ? loput.Substring(6) : loput).Trim();
                    ui.Karttaselite.Avaa();
                    ui.Karttaselite.VaihdaValilehti(true);
                    ui.Karttaselite.Maakunnat.Testaa(avain.Length > 0 ? avain : null, kortti);
                    return null;
                }
                case "selite": ui.Karttaselite.Avaa(); ui.Karttaselite.VaihdaValilehti(false); return UiPalvelut.KarttaValot == null ? "ei KarttaValot-palvelua: vain selitykset" : null;
                case "kartuscha":
                {
                    var ks = loput.Split(' ');
                    ui.Kartuscha.Testaa(ks[0].Length > 0 ? ks[0].ToUpperInvariant() : "ITA", ks.Length > 1 && ks[1] == "auki");
                    return null;
                }
                case "kortti":
                {
                    // "ui kortti <id> oma": oman kaupungin rivit (Tutki, Mannerlento) Liiku-rivin sijaan.
                    var ko = loput.Split(' ');
                    bool oma = ko.Length > 1 && ko[1] == "oma";
                    ui.Kaupunkikortti.Nayta(ko[0].Length > 0 ? ko[0] : "firenze", null, new KaupunkiToiminnot
                    {
                        LueLehti = () => ui.Tilarivi.Viesti("Lue lehti"),
                        Liiku = oma ? null : () => ui.Tilarivi.Viesti("Liiku"),
                        Mannerlento = oma ? () => ui.Tilarivi.Viesti("Mannerlento") : null,
                        MannerlentoTeksti = oma ? "Mannerlento (300 £)" : null,
                        Sulje = () => { },
                    });
                    return null;
                }
                case "kysymys": return ui.Esimerkkikysymys(loput);
                case "heitto": ui.Matkavalinta.NaytaHeitto(loput.Length > 0 ? loput : "Heitä noppaa · Lontoo", () => ui.Tilarivi.Viesti("Noppa: 4")); return null;
                case "viesti": ui.Tilarivi.Viesti(loput, 4f); return null;
                case "tila": ui.Tilarivi.Aseta(loput); return null;
                case "pois": UiKerros.Hae().Nayta(false); return null;
                case "paalle": UiKerros.Hae().Nayta(true); return null;
                case "livia": return Livia(loput);
                case "linssi": return LinssiKomennot.Aja(ui, loput);
                case "osuma":
                {
                    var xy = loput.Split(' ');
                    var p = new Vector2(float.Parse(xy[0], CultureInfo.InvariantCulture), float.Parse(xy[1], CultureInfo.InvariantCulture));
                    return UiKerros.Peittaa(p) ? "peittää" : "vapaa";
                }
                default: return "tuntematon ui-komento";
            }
        }

        // --- ui livia ------------------------------------------------------------------

        string Livia(string loput)
        {
            var osat = new List<string>(loput.Split(new[] { ' ' }, System.StringSplitOptions.RemoveEmptyEntries));
            if (osat.Count > 0 && osat[0] == "avaus")
            {
                if (osat.Count > 1 && osat[1] == "peru") { LivianAvaus.Peru(); return null; }
                if (osat.Count > 1 && osat[1] == "nollaa") LivianAvaus.NollaaLippu();
                return LivianAvaus.Nayta() ? null : LivianAvaus.Kaynnissa ? "avaus jo käynnissä" : "avaus jo nähty (ui livia avaus nollaa)";
            }
            if (osat.Count > 0 && osat[0] == "pois")
            {
                liviaKehys?.RemoveFromHierarchy();
                liviaKehys = null; livia = null; kierros = -1;
                return null;
            }
            bool mini = osat.Remove("mini");
            liviaTila.Astronautti = osat.Remove("astro");
            liviaTila.Leiju = osat.Remove("leiju") ? 1 : 0;
            liviaPuhe = osat.Remove("puhe");
            liviaTila.Puhe = -1;
            NaytaLivia(mini);
            if (osat.Count > 0 && osat[0] == "kierros")
            {
                kierros = 0;
                kierrosAlku = Time.unscaledTime;
                liviaElaa = true;
                float yhteensa = 0;
                foreach (var e in LiviaEleet.Kaikki) yhteensa += LiviaEleet.KestoMs(e) / 1000f + KierrosTauko;
                return LiviaEleet.Kaikki.Count + " elettä, " + yhteensa.ToString("0", CultureInfo.InvariantCulture) + " s";
            }
            kierros = -1;
            string ele = osat.Count > 0 ? osat[0] : "blink";
            float p = 0.5f;
            if (osat.Count > 1 && !float.TryParse(osat[1], NumberStyles.Float, CultureInfo.InvariantCulture, out p)) return "p ei ole luku: " + osat[1];
            if (!LiviaEleet.Olemassa(ele)) return "tuntematon ele " + ele;
            liviaTila.Ele = ele;
            liviaTila.P = Mathf.Clamp01(p);
            // Puhe ja leijunta liikkuvat kellon mukaan, muuten kuva on paikallaan.
            liviaElaa = liviaPuhe || liviaTila.Leiju > 0;
            AsetaLivia();
            return null;
        }

        void NaytaLivia(bool mini)
        {
            if (liviaKehys != null) liviaKehys.RemoveFromHierarchy();
            liviaKehys = new VisualElement { name = "ui-livia", pickingMode = PickingMode.Ignore };
            var s = liviaKehys.style;
            s.position = Position.Absolute;
            s.left = 0; s.top = 0; s.right = 0; s.bottom = 0;
            s.alignItems = Align.Center;
            s.justifyContent = Justify.Center;
            livia = new LiviaKuva(mini);
            if (mini) { livia.style.width = 58 * 2; livia.style.height = 70 * 2; }
            liviaKehys.Add(livia);
            liviaNimi = new Label { pickingMode = PickingMode.Ignore };
            liviaNimi.style.marginTop = 8;
            liviaNimi.style.fontSize = 13;
            liviaNimi.style.color = new Color(0.27f, 0.2f, 0.12f);
            liviaNimi.style.backgroundColor = new Color(0.95f, 0.91f, 0.8f, 0.85f);
            liviaNimi.style.paddingLeft = 6; liviaNimi.style.paddingRight = 6;
            liviaKehys.Add(liviaNimi);
            UiKerros.Hae().Turva(UiKerros.Valikot).Add(liviaKehys);
        }

        void AsetaLivia()
        {
            if (livia == null) return;
            if (liviaPuhe) liviaTila.Puhe = Time.unscaledTime * 1000f % 1500f / 1500f;
            livia.Aseta(liviaTila);
            liviaNimi.text = liviaTila.Ele + " " + liviaTila.P.ToString("0.00", CultureInfo.InvariantCulture) + " — " + LiviaEleet.Nimi(liviaTila.Ele);
        }

        void PaivitaLivia()
        {
            if (livia == null || !liviaElaa) return;
            if (kierros >= 0)
            {
                var kaikki = LiviaEleet.Kaikki;
                float kesto = LiviaEleet.KestoMs(kaikki[kierros]) / 1000f;
                float t = Time.unscaledTime - kierrosAlku;
                if (t > kesto + KierrosTauko)
                {
                    kierros = (kierros + 1) % kaikki.Count;
                    kierrosAlku = Time.unscaledTime;
                    t = 0;
                    kesto = LiviaEleet.KestoMs(kaikki[kierros]) / 1000f;
                }
                liviaTila.Ele = kaikki[kierros];
                liviaTila.P = kesto > 0 ? Mathf.Clamp01(t / kesto) : 1;
            }
            AsetaLivia();
        }
    }
}
