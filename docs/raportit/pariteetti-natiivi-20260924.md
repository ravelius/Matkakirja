# Pariteettikierros: natiivi vs. web (24.9.2026)

Omistajan kysymys: näyttääkö ja toimiiko natiivi täsmälleen kuten web,
myös pienissä yksityiskohdissa. Web-kuvat Playwrightilla (Chromium
`--use-angle=metal`, oikea GPU) tuotannosta https://matkakirja.app/,
natiivi-kuvat iOS-simulaattorista (`ui`/`peli`/`linssi`-komennot).
Pisteleveys: iPhone 393 × 852 CSS-px, iPad 834 × 1194.

Kuvat eivät ole repossa (levytila, CLAUDE.md dist-periaate) —
polut viittaavat tämän Macin scratchpad-kansioon
`.../pariteetti/<laite>/<web|natiivi>/`. Hyväksytyt erot, joita ei
kirjata: pohjakartta 23a, vesistöjen uoma, värivivahde 0,96–0,99.

## Tunnetut esteet

- **KUMOTTU (Pelikoodari 24.9.2026): Web-etusivun otsikko piilossa
  automaatiossa ei ole bugi.** `.intro-juliste` on tarkoituksella
  piilossa aloitusportilla omistajan tilauksesta 6.9.2026 — luokka
  `avaus-kesken` poistuu vasta "Aloita seikkailu" -napin painalluksesta
  (js/ui.js `naytaAvausjuliste`), ei ajastimella. Automaatiokomento
  odotti väärää ehtoa (aikakattoa) oikean sijaan (napin painallusta).
  Etusivun rivi uusittava mittaamalla ajastus napin painalluksesta.

## Taulu (iPhone, aloitettu 24.9.2026)

| # | Näkymä | Ero | Kuvapari | Vastuu |
|---|--------|-----|----------|--------|
| 1 | Etusivu/portti | UUSITTAVA — ei bugi, väärä mittaustapa (ks. Tunnetut esteet). Rakenteellisesti sama pino (logo, otsikko, pallo, äänipainike, päänappi, footer) siltä osin kuin web näkyy. Web-istunto oli tuore (vain "Aloita seikkailu"), natiivilla oli tallennus (myös "Jatka matkaa" + "Uusi matka") — eri pelitila, ei bugi; uusittava samalla tallennustilalla ja mittaamalla otsikon ajastus "Aloita seikkailu" -napin painalluksesta, ei sivun latauksesta. | iphone/web/01-etusivu.jpg, iphone/natiivi/01-etusivu-v3.jpg | Laitetestaaja (uusi mittaus) |

| 2 | Aloitusvalinta (kaupunkivalinta pallolta) | **ERO**: webissä valittavissa olevat kaupungit (Moskova, Istanbul, Ateena, Kairo) korostuvat kultaisella/oranssilla HEHKURENKAALLA ympärillään — helposti erottuvat muista pisteistä. Natiivissa samat kaupungit ovat vain tavallisia oranssin väriseikä pisteitä, EI rengashehkua — vaikeampi huomata mitkä kaupungit ovat valittavissa. Lisäksi natiivissa näkyy kaksi kelluvaa ikoninappia oikealla (lista/selite, linssit-silmälasit) joita web ei näytä tässä näkymässä. Web merkitsee Lontoon erikoisella nastaikonilla, natiivi pelkällä mustalla pisteellä. Pulu (kyyhky) näkyy molemmissa oikeassa alakulmassa. **Huom**: natiivin kuvassa näkyy tumma liuska ylimpänä (siirtymäanimaation jäänne `ui aloitus valinta` -pikakomennosta, ei välttämättä oikean navigointipolun tila) — uusittava oikealla klikkausvirralla varmuuden vuoksi. | iphone/web/02-aloitusvalinta.jpg, iphone/natiivi/02-aloitusvalinta.jpg | Natiivi-UI |

**Erä 1 (Ateena/Kreikka/Tanger, rivit 3–13) — Laitetestaaja 24.9.2026.**
Web-kuvat `tools/pariteetti-web-lehti.mjs`:llä (`window.matkakirja.ui`-konsoli
suoraan, ei klikkailua — saapumissekvenssi veisi muuten ~30–40 s/näkymä).
Natiivikuvat Natiivi-UI:n erä 1:stä, iPhone uusittu tuoreella masterilla
4ef72b0 (Natiiviseppä asensi klo 08.4x). Kuvat
`/Users/Shared/Claude/proto-3d/lokit/pariteetti-20260924/` (jaettu Macin
polku, ei repossa). Natiivin punainen "Development Console" -laatikko ja
alarivin korostukset (esim. "Poistu lehdestä") ovat Natiivi-UI:n mukaan jo
korjattu (7878cbc) eivätkä ole ero webiin — jätetty pois riveiltä.

| 3 | Lehti: kansi (Ateena) | **PASS**. Rakenne ja sisältö täsmäävät: sama otsikkopino (UNOHDETTU AARRE / ATEENA / 1. MATKAPÄIVÄ · KREIKKA-LIITE), sama säärivi "14° (12…24°), selkeää", sama herokuva-galleria 1/7 samalla kuvalla ja kuvatekstillä, sama leipäteksti. | web-lehti-kansi-iphone.jpg, natiivi-lehti-kansi-iphone.jpg | — |
| 4 | Lehti: kansi, vieritetty (Ennen/Nyt + radio) | **PASS**. Sama Ennen/Nyt-kuvapari (1890-luvun photochrom vs. nykyinen), sama teksti, sama "ΕΡΤ Πρώτο Πρόγραμμα · LIVE" radionappi, sama Matkaopas-liuska (Munikhia/Mikrolimano, sama kuvateksti ja lisenssi). | web-lehti-kansi-alas-iphone.jpg, natiivi-lehti-kansi-alas-iphone.jpg | — |
| 5 | Lehti: aihesivu (Ateena pintaa syvemmältä) | **ERO — otsikkotypografia**. Sisältö (leipäteksti, kuva, kuvateksti "Viisi siskoa museossa, kuudes Lontoossa", Commons-lisenssi) täsmää sanatarkasti. Mutta otsikko "ATEENA PINTAA SYVEMMÄLTÄ" on webissä ISO, KESKITETTY, kaksiriviinen otsikko ilman alaviivaa; natiivissa se on PIENI, VASEMMALLE tasattu yksiriviinen otsikko jonka alla on ohut jakoviiva. Eri fonttikoko/asettelu samalle H2-tason otsikolle. | web-lehti-aihe-iphone.jpg, natiivi-lehti-aihe-iphone.jpg | Natiivi-UI tai Pelikoodari |
| 6 | Lehti: aihesivu vieritetty (nostot) | **EI SUORAAN VERTAILUKELPOINEN** — molemmat komennot vierittivät saman sivun eri kohtaan (web `scrollTo(0,900)`, natiivi `ui lehti vierita 900`), koska otsikon korkeusero (ks. rivi 5) siirtää koko sivun sisältöä pystysuunnassa. Web pysähtyi otsikkoon "Vesikantaja voitti ensimmäisen maratonin" + muotokuva 1/3; natiivi samaan otsikkoon mutta eri kohtaan galleriaa (stadionkuva 1/2). Molemmissa sama tykkää/ei-tykkää-rivi ja "Lue lisää aiheesta". Ei bugi, vaan mittaustavan ero — tarkista uusiksi kiinteällä ankkurilla (esim. otsikon teksti), ei pikselimäärällä. | web-lehti-aihe-nostot-iphone.jpg, natiivi-lehti-aihe-nostot-iphone.jpg | Laitetestaaja (mittaustapa) |
| 7 | Lehti: loppu | **EI SUORAAN VERTAILUKELPOINEN** — eri tulkinta "lopusta". Web navigoi viimeiselle aihesivulle (Menovinkit, indeksi 5/5 — `naytaTutkiSivu(sivut.length)`), natiivi vieritti SEN HETKISEN sivun loppuun (`ui lehti vierita loppu`, pysähtyi kesken "Historia"-sivua LEHDEN KYSYMYS -tietovisaan Tuulten tornista). Molemmat aidosti sivun/lehden "loppuosia", mutta eri sivuja — ei vertailukelpoinen pari. Uusittava samalla määritelmällä (esim. molemmat Menovinkit-sivun loppuun). | web-lehti-loppu-iphone.jpg, natiivi-lehti-loppu-iphone.jpg | Laitetestaaja (mittaustapa) |
| 8 | Lehti: sisällys | **ERO — ulkoasu ja rivien otsikot**. Webissä Sisällys on kortti-lista: jokaisella rivillä pieni valokuva + lihavoitu otsikko (mm. "Ateena pintaa syvemmältä", "Historian hetki: Louis 1896") + kuvausrivi, vaalea kiinteä tausta, otsikkona "SISÄLLYS" + "Palaa kartalle" -nappi alla. Natiivissa Sisällys on LÄPINÄKYVÄ teksti-lista ilman kuvia, taustalla näkyy edellinen sivu läpi; toinen rivi on pelkkä "Ateena" (ei "Ateena pintaa syvemmältä") ja korostettu nykyisenä sivuna, "Historian hetki" ei näytä alaotsikkoa "Louis 1896". Sulkupainike eri paikassa (× oikeassa yläkulmassa natiivissa, "Palaa kartalle" -nappi webissä). Sama 6 riviä (Etusivu, Ateena/aihe, Arki ja tavat, Historia, Historian hetki, Menovinkit) molemmissa. **KORJATTU JA VAHVISTETTU (24.9.2026)** — uusi natiivikuva (`natiivi-v-sisallys-iphone.jpg`) näyttää nyt saman korttilistan kuvineen ja täsmäävin otsikoin ("Ateena pintaa syvemmältä", "Historian hetki: Louis 1896") kuin web. PASS. | web-lehti-sisallys-iphone.jpg, natiivi-v-sisallys-iphone.jpg | — |
| 9 | Maalehti (Kreikka) | **ERO — puuttuva kansisivu ja tilastojen ulkoasu**. Natiivissa maalehdellä on OMA KANSISIVU ennen karttaa: "KREIKKA · MAAN OMA LEHTI" ylätunniste, "UNOHDETTU AARRE" / iso "KREIKKA"-otsikko / "MAAN OMA LEHTI" -alaotsikko, vielä yksi "KREIKKA"-välOTSIKKO, vasta sitten kartta. Webissä `avaaMaalehti('GRC')` avaa suoraan tiiviimmän näkymän: pelkkä "KREIKKA [lippu]" -ylätunniste ja kartta heti sen alla — ei kansisivun otsikkopinoa. Tilastojen esitys eroaa myös: natiivissa YKSINKERTAINEN TAULUKKO (Valtiomuoto/Väkiluku/Pinta-ala/Demokratiaindeksi/Keskitulo, sijaluku suluissa, esim. "10 milj. (93./195)"); webissä sama data mutta IKONEIN JA PALKKIMITTAREIN ("PERUSTIEDOT"-lohko, pylväsmittari demokratiaindeksille ja keskitulolle). Sama data, eri visuaalinen esitystapa — voi olla tarkoituksellinen eri komponentti, syytä varmistaa kummalta puolelta linjaus tulee. **KORJATTU JA VAHVISTETTU (24.9.2026)** — uusi natiivikuva (`natiivi-v-maalehti-iphone.jpg`) näyttää nyt saman "PERUSTIEDOT"-lohkon ikonein ja palkkimittarein kuin web, samat luvut ja sijaluvut. PASS. | web-maalehti-iphone.jpg, natiivi-v-maalehti-iphone.jpg | — |
| 10 | Matkakirja auki (Tanger) | **HYVÄKSYTTY JA VAHVISTETTU (Fable 24.9.2026)**. Web ei itse asiassa pakota korttia auki puhelimella — `asetaPaivakirjanKoko` seuraa `tekstitPiilossa()`-tilaa (omistajan päätös 14.9.2026), joten webinkin oletus puhelimella on sama PIENI liuska kuin natiivissa. Natiivin oikea testikomento auki-tilaan on `ui matkakirja auki` (vastaa webin `asetaPaivakirjanKoko(false)`). Natiivi-UI:n uusi kuva (`natiivi-v-matkakirja-auki-iphone.jpg`) vahvistaa: sama teksti "ISOISÄN PÄIVÄKIRJASTA, 1873 · Tanger · Salmen yli näkee Espanjaan…" sanatarkasti kuin webissä. PASS. | web-matkakirja-auki-iphone.jpg, natiivi-v-matkakirja-auki-iphone.jpg | — |
| 11 | Linssi: keksinnöt | **PASS (rakenne), eri kohta linjalla**. Molemmat näyttävät käynnissä olevan linssin samalla peruskomponentilla: yläpalkissa vuosiluku+paikka, "Tauko"-nappi, valokuva keksijästä/laitteesta kortissa, pallo taustalla hehkupisteineen. Web pysähtyi vuoteen 1769 (Glasgow, James Watt, höyrykoneen lauhdutin), natiivi vuoteen 1800 (Pavia) — eri ajastuskohta koska molemmat käynnistettiin hieman eri hetkellä, ei bugi. Natiivissa NÄKYY pallo suoraan, webissä pallo on himmeämpi taustalla samalla sommittelulla — sama rakenne, vaikea sanoa onko tarkoituksellinen kontrastiero ilman rinnakkaista pysäytystä samaan vuoteen. | web-linssi-keksinnot-iphone.jpg, natiivi-linssi-keksinnot-iphone.jpg | Natiivi-UI (varmista kontrasti samalla vuodella) |
| 12 | Linssi: selite | **ODOTTAA** — en löytänyt web-konsolista suoraa funktiota natiivin "selite"-komennolle (`ui linssi selite (testiselite)`) rajatussa ajassa; karttaselitteet-nappi (ref "Karttaselitteet: mitä kartan merkit tarkoittavat") avaa NOSTOT/MAAKUNNAT-suodattimen, mikä ei vaikuta samalta kuin natiivin per-linssi-selite. Ei kuvaa otettu. | — | Laitetestaaja (jatka) tai Natiivi-UI (mikä funktio tätä vastaa webissä?) |
| 13 | Linssi: ihmisen matka | **ERO — natiivissa väärä otsikko (bugi), web kesken siirtymässä**. Natiivikuvassa yläpalkki lukee yhä "KEKSINNÖT EUROOPASSA" (edellisen linssin otsikko jäänyt vaihtumatta), vaikka sisältö on jo Ihmisen matka -linssin teksti "240 000 v. sitten … Mutta mennäänpä toiselle puolelle Afrikkaa. Sieltä varsinainen matka alkaa…" pallolla Lähi-idän/Afrikan yllä — TODENNÄKÖINEN OTSIKKOBUGI linssin vaihdossa natiivissa. Web-kuva jäi mustalle kysymysruudulle "Tiedätkö, mistä ihmiset lähtivät liikkeelle?" — tämä on linssin OMA aloitusanimaatio (kysymys ennen palloa), ei virhe, mutta eri kohta ajassa kuin natiivin kuva; uusittava pidemmällä odotuksella käynnistyksen jälkeen jotta pallo-osuus näkyy. | web-linssi-ihminen-iphone.jpg, natiivi-linssi-ihminen-iphone.jpg | Natiivi-UI (otsikkobugi), Laitetestaaja (uusi web-kuva pidemmällä odotuksella) |

**Erä 2 — Pelikoodarin web-kuvat (PR #3038, tools/pariteettikuvat.mjs,
43 näkymää × 2 kokoa, kansio proto-3d/lokit/pariteetti-web-2026-09-24/)
vs. Natiivi-UI:n erä 2 (proto-3d/lokit/pariteetti-20260924/, 24.9.2026).
Fable 24.9.2026: kauppaa ei ole (linssit ovat aarteina) ja passi = laukku
— molemmat pois listalta.**

| 14 | Asetukset | **PASS + lisäys**. Äänentasot täsmäävät tismalleen: Äänitehosteet 100 %, Pulun ääni 100 %, Lukija 90 %, Taustamusiikki 35 %, Taustaäänet 100 % — samat liukurit, samat arvot, sama järjestys. Natiivissa on LISÄKSI "LATAA OFFLINE-KÄYTTÖÖN" -lohko heti sliderien alla (mantereiden lataus, koot Gt/Mt) jota web-kuvassa ei näy — web saattaa näyttää sen omalla sivullaan/kohdassaan, ei tarkistettu tässä erässä. | ratas-393x852.png, natiivi-asetukset-iphone.jpg | Laitetestaaja (tarkista onko offline-lohko webissä muualla) |
| 15 | Karttaselite | **PASS**. Sama rakenne molemmissa: NOSTOT/MAAKUNNAT-välilehdet, sama rivilista samassa järjestyksessä (Kaikki, Kaupungit, Historia, Ihmeet, Hetket, Skandaalit, Luonto, Eläimet, Kulttuuri…, Kauppa…), samat kuvakkeet, "Ei mitään" -rivi alimpana. Lukumäärät eroavat suuresti (web Ranska-rajattu esim. Historia 15, natiivi koko maailma Historia 597) — eri zoomaustaso/laajuus kuvanotossa, ei bugi. | karttaselite-393x852.png, natiivi-karttaselite-iphone.jpg | — |
| 16 | Kysymys | **PASS (rakenne)**. Sama korttikaava: kaupunki+tyyppi-otsikko, tiimalasi+aikalaskuri oikeassa yläkulmassa, kursivoitu johdatteluteksti, pyöristetyt vaihtoehtorivit kirjainmerkein (A/B…), alarivin toiminnot. Web nappasi "kohtaaminen"-tyyppisen 2-vaihtoehtoisen kysymyksen (vain 50:50-nappi), natiivi "aarrekysymyksen" 4 vaihtoehdolla (Vihje+50:50) — eri kysymyslaji, ei virhe, kortin ulkoasu itsessään täsmää. | visa-393x852.png, natiivi-kysymys-iphone.jpg | — |
| 17 | Kortti (kaupunkikortti, Ateena) | **PASS (natiivi), EI VERTAILTAVISSA (web)**. Natiivi näyttää Ateena-kaupunkikortin oikein (lippu+maa, otsikko, kuva, kuvateksti, leipäteksti, "Lisää"-nappi). Web-kuva `kaupunkikortti-393x852.png` näyttää PELKÄN Ranska-kartan ilman korttia, vaikka `yhteenveto.json` merkitsee sen onnistuneeksi (`ok:true, virheet:[]`) — TODENNÄKÖINEN TYÖKALUVIKA Pelikoodarin skriptissä (kortti sulkeutunut/ei avautunut ennen kuvakaappausta). Ilmoitettu Pelikoodarille. | kaupunkikortti-393x852.png, natiivi-kortti-iphone.jpg | Pelikoodari (työkalu) |
| 18 | Valikko | **PASS (rakenne)**. Molemmissa sama osiorakenne ÄÄNET (Kertoja/Musiikki/Äänimaisema PÄÄLLÄ) ja KARTTA (Pieni liike PÄÄLLÄ). Web näyttää lisäksi "Kallistus POIS" -rivin jota natiivissa ei näy tässä kuvassa, ja natiivissa on RETKIKUNTA- ja KOKEET-osiot (Sähkelinja, Astronautin reliefi, Linssien kynnykset, Raamattu, Kehittäjälehti) joita web ei näytä — nämä ovat todennäköisesti kehittäjätilan/koetilan omia rivejä eivätkä kuulu pelaajan valikkoon, ei siis välttämättä ero. | valikko-393x852.png, natiivi-valikko-iphone.jpg | Laitetestaaja (varmista mitkä rivit ovat kehittäjätilan omia) |
| 19 | Siirtolista (Lontoo) | **PASS (natiivi), EI VERTAILTAVISSA (web)**. Natiivi näyttää oikein "Lontoo"-kohdekortin (Bussi/Lento/Liftaus/Laiva hintoineen). Web-kuva `noppa-siirtolista-393x852.png` näyttää PELKÄN Ranska-kartan nopan kuvaketta lukuun ottamatta — sama työkaluvika-epäily kuin rivillä 17. | noppa-siirtolista-393x852.png, natiivi-siirtolista-iphone.jpg | Pelikoodari (työkalu) |
| 20 | Laukku | **VAHVISTETTU TILAERO, ei UI-bugi**. Alkuperäinen ero johtui siitä, ettei natiivin tallenteessa ollut aktiivista matkaa ("Matka ei ole vielä alkanut" + VARUSTEET-ruudukko). Rivi 32 (laukku-linssit, sama näkymä aktiivisella matkalla) vahvistaa: kun tila täsmää, natiivi näyttää saman "MATKA"-yhteenvedon kuin web. Ei jatkotoimia. | laukku-393x852.png, natiivi-laukku-iphone.jpg | — |
| 21 | Kulkutapaliuska | **PASS**. Natiivi-UI uusi aktiivisessa pelissä (uusi-peli 5 marseille, sama kuin web). Molemmissa sama alarivi: peukku/liftaus, bussi, laiva (harmaana/pois käytöstä), lento — ja "Liiku"-nappi. Natiivissa näkyy lisäksi nopan kuva "Tripoli"-tekstillä oikeassa alakulmassa (liftauksen tulos), web-kuva otettu ennen sitä vaihetta — ei ero, eri hetki. | liiku-393x852.png, natiivi-kulkutapaliuska-iphone.jpg | — |
| 21b | Noppa | **VERTAILTAVISSA, eri vaihe**. Natiivi (uusittu) näyttää "Noppa 4" -kohdelistan (Alpit, Barcelona, Pariisi… askelmäärineen) liftauksen jälkeen. Web-kuva `noppa-393x852.png` on otettu ENNEN heittoa — pelkkä nopan kuva kartalla, ei listaa. Eri vaihe samassa kulkutapaketjussa, ei suoraan vertailukelpoinen ilman uutta web-kuvaa samasta kohdasta. | noppa-393x852.png, natiivi-noppa-iphone.jpg | Pelikoodari (web-kuva heiton jälkeen) |
| 21c | Sähke | **PASS**. Natiivi-UI uusi (`ui sahketehtava sofia`, koska web-sähke on Sofian kohtaaminen). Rakenne ja teksti täsmäävät lähes sanatarkasti: "SÄHKE / Pöllöltä, jostain maan alta", sama sähkösanoma-arkki "SÄHKÖSANOMA N:o 1898", sama teksti LIVIALLE STOP / MISSÄ BULGARIASSA LÖYTYI MAAILMAN VANHIN KULTA JA MINÄ VUONNA STOP / VASTAA KOHDE JA VUOSI STOP / PAIKKA ON KARTAN KOHTEISSA STOP / PÖLLÖ STOP, sama KOHDE/VUOSI-lomake. | sahke-393x852.png, natiivi-sahketehtava-iphone.jpg | — |

**Erät 3–4 — Natiivi-UI:n kuvat molemmista laitteista valmiit (kansio
proto-3d/lokit/pariteetti-20260924/, pelitila `uusi-peli 5 marseille`,
puhe pois — sama kuin webin tallenne). Build enimmäkseen 3b107c0
(poikkeus: iPhonen kartta–pollo ja linssi-radio 7878cbc:stä). Alla
pistokoe 12/25 näkymästä (loput listattu erikseen, eivät vielä
tarkistettuja tässä kierroksessa — ei havaittuja eroja odoteta samalla
kaavalla, mutta on syytä käydä läpi ennen lopullista hyväksyntää).**

| 22 | Kartta (pallo, ei introa) | **PASS**. Molemmat: Marseille-nasta, RANSKA/France-alatunniste, Liiku-teksti/nappi, pulu oikeassa alakulmassa. Eri kaupunkilabelit näkyvissä (eri pan/zoom), ei ero. | kartta-393x852.png, natiivi-kartta-iphone.jpg | — |
| 23 | Matkakirjakortti (kiinni) | **EI SELVÄÄ KORTTIA KUVASSA (natiivi)**. Natiivikuva näyttää pelkän kartan + Liiku-napin, ei havaittavaa pientä liuskaa — joko kortti on niin pieni ettei erotu tästä kuvasta tai komento ei tuottanut sitä. Web-vastinparia ei vielä katsottu tarkasti. | matkakirjakortti-kiinni-393x852.png, natiivi-matkakirjakortti-kiinni-iphone.jpg | Natiivi-UI (varmista näkyykö kortti) |
| 24 | Kohtaaminen | **PASS**, sisällöltään lähes sanatarkka: sama Baptiste/laituri-tarina, sama "yritys 1/2", sama "Aloita peli" -nappi. Ainoa ero on jo tunnettu erotinmerkki otsikossa (natiivi "·", web "—", ks. rivi 16). | kohtaaminen-393x852.png, natiivi-kohtaaminen-iphone.jpg | — |
| 25 | Nostokortti (Pont du Gard) | **PASS**. Sama kuva, sama kuvateksti "Pont du Gardin kolme holvikerrosta Gardon-joen yllä", sama LISÄÄ-nappi. | nostokortti-393x852.png, natiivi-nostokortti-iphone.jpg | — |
| 26 | Nostovisa (Roquefort) | **PASS**, huomioiden Pelikoodarin oma varaus (web näyttää kortin yläosan, kysymys on alempana vieritettynä — natiivin kuva sattuu näyttämään koko vastausvalikoiman). Sisältö (juustolegenda, lukijan kysymys, samat 3 vastausvaihtoehtoa) täsmää. | nostovisa-393x852.png, natiivi-nostovisa-iphone.jpg | — |
| 27 | Eläintakyy (Camarguenvarsa) | **PASS**. Sama kuva ja kuvateksti "Camarguenvarsa, Ranska", sama LISÄÄ-nappi. | elaintaky-393x852.png, natiivi-elaintaky-iphone.jpg | — |
| 28 | Aarre (croissantkori) | **PASS**, sisältö lähes sanatarkka ("Kori tuoreita croissanteja +150 puntaa", sama Baptiste-lopputeksti rasiasta). | aarre-393x852.png, natiivi-aarre-iphone.jpg | — |
| 29 | Pöllö/Livia-chat | **PASS (rakenne)**. Sama tervehdysteksti "Olen Livia, pulu — tuuraan Viisasta Pöllöä…", sama nappirivi (näppäimistö/kaiutin/mikki). Natiivi näytti lisäksi latausviestin "Odotas, pudotin muistiinpanot katolle..", web kaksi valmista kysymysehdotusta — eri hetki latauksessa, ei rakenne-ero. | pollo-393x852.png, natiivi-pollo-iphone.jpg | — |
| 30 | Linssi: topografia | **PASS**. Sama reliefiväritys (vihreä-ruskea korkeuskartta), sama "TOPOGRAFIALINSSI"-otsikko ja Sulje linssi -nappi. | linssi-topografia-393x852.png, natiivi-linssi-topografia-iphone.jpg | — |
| 31 | Linssi: vesistöt | **KORJAUS (Fable 24.9.2026): suunta oli väärin raportoitu.** Tarkistin molemmat kuvat uudelleen yksitellen (ensimmäinen lukukerta oli rinnakkaislukemassa sekoittunut toiseen näkymään): NATIIVI näyttää linssin oikein (siniset jokiviivat + "VESISTÖLINSSI"-tunniste). WEB (`linssi-vesistot-393x852.png`) on pelkkä peruskartta ilman linssiä, vaikka Pelikoodarin `yhteenveto.json` merkitsee sen onnistuneeksi — sama työkaluvika kuin rivillä 17/19, Pelikoodari korjaa. **Merkitse: web-työkaluvika, natiivi ok.** | linssi-vesistot-393x852.png, natiivi-linssi-vesistot-iphone.jpg | Pelikoodari (työkalu) |

| 32 | Laukku (linssit, aktiivinen matka) | **PASS**. Sama "MATKA"-yhteenveto (Sijainti/Kukkaro/Untuvikko) ja "VARUSTEET"-ruudukko samoin ikonein (silmälasit/suurennuslasi/kone/jalanjälki/astronautti/radio). Natiivissa näkyy lisäksi 3 harmaata (ei vielä löydettyä) linssikuvaketta joita web-kuva ei näytä — todennäköisesti eri määrä omistettuja linssejä pelitilanteessa, ei rakenne-ero. Vahvistaa myös rivin 20 tilaero-selityksen. | laukku-linssit-393x852.png, natiivi-laukku-linssit-iphone.jpg | — |
| 33 | Kaupunkilehti: aihesivu 2 (Ruoka) | **PASS**, lähes sanatarkka ("RUOKA" / Bouillabaisse-tarina, sama kuva ja kuvateksti). | kaupunkilehti-aihe2-393x852.png, natiivi-kaupunkilehti-aihe2-iphone.jpg | — |
| 34 | Kaupunkilehti: Lue lisää | **PASS**, sama "Marseille 1/6" -artikkeli sanatarkasti (Vieux-Port, Notre-Dame de la Garde, bouillabaisse-tausta). | kaupunkilehti-luelisaa-393x852.png, natiivi-kaupunkilehti-luelisaa-iphone.jpg | — |
| 35 | Maalehti: aihesivu 1 (Historia) | **PASS**, sama Lascaux-luolamaalaus-artikkeli sanatarkasti ja sama kuva/kuvateksti. | maalehti-aihe1-393x852.png, natiivi-maalehti-aihe1-iphone.jpg | — |
| 36 | Maalehti: mediarivi | **PASS**, sama Ariane 5 -artikkeli sanatarkasti; radioasema eri (web France Inter, natiivi Radio Campus Paris) mutta molemmissa LIVE-nappi samalla paikalla — sisältövalinta, ei bugi. | maalehti-mediarivi-393x852.png, natiivi-maalehti-mediarivi-iphone.jpg | — |
| 37 | Linssi: radio | **PASS**. Sama asemaverkosto (soittopallukat kartalla) ja sama retro-radiodialin alapalkki (RADIO POIS / VALITSE KAUPUNKI, kaupunkiviivain). | linssi-radio-393x852.png, natiivi-linssi-radio-iphone.jpg | — |
| 38 | Linssi: satelliitti | **PASS**. Sama realistinen pilvipeitteinen maapallo, samat vihreät kohdepisteet, sama astronauttipulu. | linssi-satelliitti-393x852.png, natiivi-linssi-satelliitti-iphone.jpg | — |
| 39 | Linssi: vertailu | **PASS**. Sama reliefikartta + maatunniste-chip + "Vertaa"-nappi alapalkissa. Eri maat näkyvissä kartalla (eri zoom/pan), ei ero. | linssi-vertailu-393x852.png, natiivi-linssi-vertailu-iphone.jpg | — |
| 40 | Linssi: ihmisen matka, karuselli-intro | **PASS**, sama "IHMISEN MATKA" -aloituskortti sanatarkasti, sama "Käynnistä"-nappi. | linssi-karuselli-393x852.png, natiivi-linssi-karuselli-iphone.jpg | — |
| 41 | Linssi: maatiedot | **EI VERTAILUKELPOINEN, MOLEMMAT TYHJÄT.** Sekä natiivi- että web-kuva näyttävät pelkän peruskartan ilman linssin sisältöä (web-kuvassa sama irrallinen kirja-ikoni kuin natiivissa) — todennäköisesti sama Pelikoodarin työkaluvika kuin rivillä 31, mutta tällä kertaa molemmilla puolilla. Uusittava kun Pelikoodari korjaa työkalun ja Natiivi-UI ottaa uuden natiivikuvan varmuuden vuoksi. | linssi-maatiedot-393x852.png, natiivi-linssi-maatiedot-iphone.jpg | Pelikoodari (työkalu) + Natiivi-UI (varmistus) |
| 12b | Linssi: selite (päivitys) | **YHÄ ODOTTAA** — natiivikuva on edelleen sama vanha ennen-erää-3/4-kuva (maailmanpallo + kehittäjäkonsoli, ei "TOPOGRAFIALINSSI"-selitelaatikkoa), ei Natiivi-UI:n uusintaa. Web näyttää selitteen oikein (rivi 12:n huomio pysyy). | linssi-selite-393x852.png, natiivi-linssi-selite-iphone.jpg | Natiivi-UI (uusi kuva) |

## Yhteenveto per näkymä (rivit 1–41 + 12b, 21b/21c)

PASS sellaisenaan: 3, 4, 11 (rakenne), 15, 16, 18 (rakenne), 21, 21c,
22, 24, 25, 26, 27, 28, 29, 30, 32, 33, 34, 35, 36, 37, 38, 39, 40 — 25 kpl.
Hyväksytty/vahvistettu (aiempi ero selittyi tai korjattiin): 8, 9, 10, 13
(otsikkobugi jää auki, ks. rivi), 20 — 5 kpl.
Ero, korjaus jonossa tai auki: 5 (otsikkotypografia), 17 (natiivi ok,
web-työkaluvika), 19 (natiivi ok, web-työkaluvika), 21b (eri vaihe),
23 (kortti ei näy natiivissa), 31 (natiivi ok, web-työkaluvika), 41
(molemmat tyhjät, web-työkaluvika epäilty) — 7 kpl.
Ei suoraan vertailukelpoinen (mittaustapa): 6, 7 — 2 kpl.
Odottaa uusintaa: 1 (etusivu, väärä mittaustapa), 12/12b (linssin
selite), 14 (asetukset, tarkista offline-lohko) — 3 kpl.
Ei natiivissa / pois listalta pysyvästi: linssi-pallo. Aloitusportti
ja "matkakirjakortti-auki (uusintaversio)" kattaa jo rivi 1 ja rivi 10.

**Työkaluvika-yhteenveto Pelikoodarille:** rivit 17 (kaupunkikortti),
19 (noppa-siirtolista), 31 (vesistöt) ja epäilty 41 (maatiedot) —
Pelikoodarin `pariteettikuvat.mjs` merkitsee nämä `ok:true` vaikka
kuvassa ei ole linssin/kortin sisältöä. Korjaus on jo työn alla
(DOM-ehto per näkymä + aktiivinen pelitila kaupunkikortille ja
noppa/siirtolistalle, Pelikoodarin viesti 24.9.2026).
