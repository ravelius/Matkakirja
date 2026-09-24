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

- **Web-etusivun otsikko piilossa automaatiossa**: `.intro-juliste`
  jää `opacity:0`-tilaan, luokka `avaus-kesken` ei poistu edes 15 s:ssa
  Chromium+Metal-GPU:lla. Kirjattu Pelikoodarille erikseen
  24.9.2026. Etusivun rivi alla merkitty ODOTTAA kunnes korjautuu —
  vertailu ei ole reilu ennen sitä.

## Taulu (iPhone, aloitettu 24.9.2026)

| # | Näkymä | Ero | Kuvapari | Vastuu |
|---|--------|-----|----------|--------|
| 1 | Etusivu/portti | ODOTTAA — web-otsikko piilossa (ks. yllä), joten kokonaisvertailu kesken. Rakenteellisesti sama pino (logo, otsikko, pallo, äänipainike, päänappi, footer) siltä osin kuin web näkyy. Web-istunto oli tuore (vain "Aloita seikkailu"), natiivilla oli tallennus (myös "Jatka matkaa" + "Uusi matka") — eri pelitila, ei bugi; uusittava samalla tallennustilalla kun web korjautuu. | iphone/web/01-etusivu.jpg, iphone/natiivi/01-etusivu-v3.jpg | Pelikoodari (avaus-kesken), sitten Natiivi-UI |

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
| 8 | Lehti: sisällys | **ERO — ulkoasu ja rivien otsikot**. Webissä Sisällys on kortti-lista: jokaisella rivillä pieni valokuva + lihavoitu otsikko (mm. "Ateena pintaa syvemmältä", "Historian hetki: Louis 1896") + kuvausrivi, vaalea kiinteä tausta, otsikkona "SISÄLLYS" + "Palaa kartalle" -nappi alla. Natiivissa Sisällys on LÄPINÄKYVÄ teksti-lista ilman kuvia, taustalla näkyy edellinen sivu läpi; toinen rivi on pelkkä "Ateena" (ei "Ateena pintaa syvemmältä") ja korostettu nykyisenä sivuna, "Historian hetki" ei näytä alaotsikkoa "Louis 1896". Sulkupainike eri paikassa (× oikeassa yläkulmassa natiivissa, "Palaa kartalle" -nappi webissä). Sama 6 riviä (Etusivu, Ateena/aihe, Arki ja tavat, Historia, Historian hetki, Menovinkit) molemmissa. | web-lehti-sisallys-iphone.jpg, natiivi-lehti-sisallys-iphone.jpg | Natiivi-UI |
| 9 | Maalehti (Kreikka) | **ERO — puuttuva kansisivu ja tilastojen ulkoasu**. Natiivissa maalehdellä on OMA KANSISIVU ennen karttaa: "KREIKKA · MAAN OMA LEHTI" ylätunniste, "UNOHDETTU AARRE" / iso "KREIKKA"-otsikko / "MAAN OMA LEHTI" -alaotsikko, vielä yksi "KREIKKA"-välOTSIKKO, vasta sitten kartta. Webissä `avaaMaalehti('GRC')` avaa suoraan tiiviimmän näkymän: pelkkä "KREIKKA [lippu]" -ylätunniste ja kartta heti sen alla — ei kansisivun otsikkopinoa. Tilastojen esitys eroaa myös: natiivissa YKSINKERTAINEN TAULUKKO (Valtiomuoto/Väkiluku/Pinta-ala/Demokratiaindeksi/Keskitulo, sijaluku suluissa, esim. "10 milj. (93./195)"); webissä sama data mutta IKONEIN JA PALKKIMITTAREIN ("PERUSTIEDOT"-lohko, pylväsmittari demokratiaindeksille ja keskitulolle). Sama data, eri visuaalinen esitystapa — voi olla tarkoituksellinen eri komponentti, syytä varmistaa kummalta puolelta linjaus tulee. | web-maalehti-iphone.jpg, natiivi-maalehti-iphone.jpg | Fable (linjaus) → Natiivi-UI tai Pelikoodari |
| 10 | Matkakirja auki (Tanger) | **NATIIVI RIKKI TÄLLÄ ASENNUKSELLA** — natiivikuva (uusittu klo 08.4x tuoreella masterilla 4ef72b0) näyttää PELKÄN pallon ilman korttia lainkaan; kehittäjäkonsolissa toistuva virhe "Cannot get data as compressed samples for audio clip … koodi-viesti.mp3 … Changing the load type to DecompressOnLoad" — kortti ei avautunut `ui matkakirja tanger havainto` -komennolla. Web toimii: "ISOISÄN PÄIVÄKIRJASTA, 1873 / Tanger" -kortti avautuu kokoruutuun tekstillä ja taustakartalla (`ui.asetaPaivakirjanKoko(false)`). Ei siis pariteettivertailu vielä mahdollinen — natiivin puoli pitää korjata/uusia ensin. | web-matkakirja-auki-iphone.jpg, natiivi-matkakirja-auki-iphone.jpg | Natiivisepän/Pelikoodarin ääniklippivirhe, sitten Natiivi-UI uusii kuvan |
| 11 | Linssi: keksinnöt | **OSITTAINEN — web vasta käynnistyskortilla**. Natiivi näyttää KÄYNNISSÄ OLEVAN linssin (vuosi 1800, "Tauko"-nappi, taustakuva keksijästä, pallo pienempänä ylälaidassa). Web-kuva jäi (löyhällä ajastimella, `aktivoiLinssi('keksinnot')` + "Käynnistä"-klikkaus) joko käynnistyskortille tai heti käynnistyksen jälkeiseen tilaan — tuotantosivu alkoi palauttaa 429 (liikaa pyyntöjä) ennen kuin ehdin varmistaa lopullisen ruudun, joten paria ei voi vielä arvioida luotettavasti. Uusittava kun sivu ei ole enää rajoitettu. | web-linssi-keksinnot-iphone.jpg, natiivi-linssi-keksinnot-iphone.jpg | Laitetestaaja (uusinta) |
| 12 | Linssi: selite | **ODOTTAA** — en löytänyt web-konsolista suoraa funktiota natiivin "selite"-komennolle (`ui linssi selite (testiselite)`) rajatussa ajassa; karttaselitteet-nappi (ref "Karttaselitteet: mitä kartan merkit tarkoittavat") avaa NOSTOT/MAAKUNNAT-suodattimen, mikä ei vaikuta samalta kuin natiivin per-linssi-selite. Ei kuvaa otettu. | — | Laitetestaaja (jatka) tai Natiivi-UI (mikä funktio tätä vastaa webissä?) |
| 13 | Linssi: ihmisen matka | **OSITTAINEN — sama syy kuin rivi 11**. `aktivoiLinssi('ihmisen-matka')` + "Käynnistä" ajettu, mutta sivun 429-rajoitus katkaisi ennen varmistusta. Uusittava. | web-linssi-ihminen-iphone.jpg, natiivi-linssi-ihminen-iphone.jpg | Laitetestaaja (uusinta) |

Jatkuu… (seuraava erä Fablen järjestyksessä: sähke → noppa/siirtolista →
kulkutapaliuska → kauppa/linssien hankinta → passi → asetukset → loput)
