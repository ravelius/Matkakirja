# Astronautin kamera — julkaistun v1924:n live-QA, 16.9.2026

## Rajaus ja julkaisu

- Kohde: `https://matkakirja.app/`, main `b298af864e07a5673f86cde2084076b11cf718b3`, PR #2546.
- Ei generointeja, R2-kirjoituksia, pelijulkaisua eikä pelikoodin muutoksia.
- Oikea Chrome Macissa, ei headless-konttia, verkon route-korvauksia, varaäänitettä, autoplayn ohituslippua tai globe.gl-virheiden suodatusta.
- Lisäksi asennetun Safari WebAppin normaali käyttöliittymätesti.
- Lopputulos ei ole koko julkaisun hyväksyntä: havaittiin minipulun hover-tausta ja WebAppin tyhjä linssinäkymä. iOS-laitetesti on avoin.

## Julkaistujen tavujen tarkistus

Seuraavien viiden tiedoston HTTPS-vastaukset vastasivat main-commitin tiedostoja täsmälleen:

| Tiedosto | Tavua | SHA-256 |
| --- | ---: | --- |
| js/linssit/satelliitti-aani.js | 16741 | 62b6561302fa13adcba397a298efb363b1a4f2b1375ebf5bccb1cdecde8e8ace |
| js/linssit/satelliitti.js | 66252 | 57abad3d8e51e9def31730121eea0f1783e4edd6add9b44a5c6bdbd55f3333e3 |
| css/satelliitti.css | 34738 | ec6f6d752f4910283dce5fc187e1b5b4b9ff6bd9f8e88740966ed13491ff5097 |
| js/minipulu.js | 4049 | 7e3fbd83a8f6d891fe892c69cdd259eab94b90429d75c1633fbb67e390dbe380 |
| js/linssit/astronaut-kysymykset.js | 87509 | 5ebe8c4c071122d0d5b09fff558e53ea6d7d41145d14dd4780f8bdef73ec079d |

Humina: `https://media.matkakirja.app/matkakirja/aanet/linssit/astronautin-kamera/20260916/93aaf7fb15092bac80abd1d740aa2a22a0fdb761558df2273673bc263fde2f2b.mp3`

- HTTP 200, audio/mpeg, 1345091 tavua.
- SHA-256 `93aaf7fb15092bac80abd1d740aa2a22a0fdb761558df2273673bc263fde2f2b`.
- Origin-pyynnön CORS-vastaus `https://matkakirja.app`.
- Chromen oikea huminapyyntö: HTTP 200 audio/mpeg, `fromDiskCache=false`, `fromServiceWorker=false`.

## Chrome — todennetut tulokset

Äänigraafiin lisättiin väliaikainen mittaus: alkuperäiset createBufferSource/createGain/start/stop/disconnect/gain-automaatiofunktiot suoritettiin muuttamatta argumentteja. Verkkovastauksia tai dekoodattuja näytteitä ei muutettu. Mittaus poistettiin lopuksi.

1. Käyttöliittymä ilmoitti v1924:n. Pelin musiikkiasetus oli päällä, taustamusiikin säädin 35 %. Näitä alkuperäisiä arvoja ei jätetty muuttuneiksi.
2. Linssi avattiin julkaistun pelin omalla `ui.valitseLinssi('satelliitti')`-kutsulla. Pelin varusteita, rahaa tai kaupunkia ei muutettu. Tämä ei yksin testaa matkalaukun aktivointipolkua Chromessa.
3. Syntyi yksi pitkä AudioBufferSourceNode: kesto **84.000 s**, loop=true, AudioContext running.
4. Sisääntulon automaatio: gain 0 ajassa **50.064 s**, linearRamp arvoon **0.26089911843469304** ajassa **52.064 s**. Kesto **2.000 s**; myöhempi gain-arvo 0.2608991265296936.
5. Sama lähde oli edelleen käynnissä **144.259 s** ja **177.888 s** aloituksen jälkeen. Ei stop-, ended- tai disconnect-tapahtumaa eikä uutta huminalähdettä. Näin ylitettiin myös kaksi kokonaista 84 s kierrosta todellisella äänikellolla, ei simuloidulla ajalla.
6. Etnan havainto avattiin käyttöliittymän pisteestä. Kuvanvaihto 30.10.2002 → 2.8.2006 onnistui tavallisesta pikkukuvapainikkeesta. Myöhemmin avattiin Italian saapas yöllä ja Istanbul pelin kohdeavaajalla; kohteen teksti ja kuva todella vaihtuivat. Huminalähteen alku ja sisääntulon ramppi säilyivät samoina.
7. Yleinen musiikkiasetus testattiin julkaistun musiikkivalitsimen API:lla kesken linssin: pois pysäytti ja irrotti lähteen (stop=244.541 s), päälle loi uuden 84 s lähteen (start=244.896 s). Alkuperäinen päällä-asetus palautettiin. Tämä on toiminnallinen API-testi, ei näkyvän asetuspainikkeen painallustesti linssin sisällä.
8. Poistuminen tehtiin UI:sta: Sulje havainto → Poistu linssistä. Tila palautui nulliksi; molemmat pitkät lähteet olivat ended=true ja disconnected=true. Uuden lähteen stop=323.571 s. Linssivalinta palautui nulliksi, varustelista pysyi ennallaan.
9. Musiikkikerroksesta ei havaittu latausta eikä pitkää toista soitinta. Resource Timingissa astronautin-kamera-musiikki-osoitteiden määrä oli 0. Alkupään CDP-verkkotapahtumapuskurissa oli ylivuoto muun sivulatauksen vuoksi; tästä ei väitetä aukotonta koko istunnon verkkolokia. Oikea huminan pyyntö/vastaus säilyi lokissa.

**Raja:** tämä todentaa latauksen, dekoodauksen, ajastuksen ja soittimen elinkaaren. Se ei ole ihmisen kuunteluarvio saumattomuudesta, äänen miellyttävyydestä tai fyysisen kaiuttimen ulostulosta.

## Minipulu ja esikirjoitetut vastaukset

- Etnan kaksi kysymystä näkyivät ja molemmat vastaukset avautuivat: tuhkapilven/maastopalojen ero sekä 2700 vuoden purkaushistoria.
- Italian saapas yöllä vaihtoi kysymykset oikeiksi Italian kysymyksiksi.
- Istanbulin molemmat kysymykset ja vastaukset toimivat (Bosporinsalmi/Kultainen sarvi ja mannerten risteys).
- Ison pulun pluspainikkeen laskettu tyyli linssissä: display=none, visibility=hidden.
- Minipulun normaali tausta rgba(0,0,0,0), reunus 0 px, pyöristys 0 px, varjo none.
- Työpöytä: 69.59 × 84 px, 12 px alareunasta ja oikeasta reunasta.
- Chromen **näyttökokoemulaatio** 390 × 844: 46.39 × 56 px, reunat 12 px. Myös 844 × 390 tarkistettiin: kortti mahtui ruutuun vieritettävänä. Tämä ei ole iOS- tai kosketustesti. Näyttökoon ohitus palautettiin.

### Korjattava: ruskea hover-laatikko

Minipulun napin painamisen jälkeen, hiiren jäädessä napille, sen tausta muuttuu **rgb(67,51,31)**:ksi. Ruskea suorakulmio näkyy työpöydällä ja kapean Chromen kuvassa. Kun osoitin siirtyy kysymykseen, pohja on taas läpinäkyvä.

- Syy lähteessä: `css/styles.css:2287` yleinen `button:hover:not(:disabled) { background: #43331f; }` voittaa minipulun pohjatyylin.
- `css/satelliitti.css:819` asettaa hover-tilassa vain kirkkaussuotimen, ei läpinäkyvää taustaa.
- Korjauspyyntö välitetty koordinaattorin kautta Fablelle. Ei korjattu rinnakkain tässä QA:ssa.

## Safari WebApp — epäonnistunut live-avaus

Sovellus: `com.apple.Safari.WebApp.6CEE5983-A27C-4AA8-AE2F-0F37CF11EFC5`.

1. Asennettu sovellus oli aluksi näkyvästi v1910:ssa. Pelitilanne Ateena, £275, päivä 1.
2. Hae uusin versio -painike päivitti sovelluksen; päivitysdialogi vahvisti **v1924**. Pelitilanne säilyi.
3. Normaali käyttöliittymäpolku: matkalaukku → Astronautin kamera → Aktivoi linssi.
4. Tulos: ruskea tyhjä näkymä, oikeassa yläkulmassa X, toisinaan Ateenan merkintä vasemmalla. Ei maapalloa eikä vihreitä pisteitä. Tila ei valmistunut myöhemmässä tarkistuksessa.
5. Uusintakoe: Näytä → Lataa sivu uudelleen lähteestä; ikkuna nostettiin etualalle. Sama normaali aktivointipolku toisti tyhjän näkymän.
6. Poistu linssistä toimi ja palautti pelin. Sovellukseen jäi normaali v1924-pelinäkymä, ei avoin testilinssi.

Tämä on WebAppissa toistuva havainto, **ei vielä todistettu juurisyy eikä osoitus kaikista WebKit-selaimista**. Sen äänigraafia tai kuuntelua ei vahvistettu. Fablelle välitetty kiireellisenä koordinaattorin kautta.

## Tavallinen Safari ja avoimet rajat

- Tavallisen Safarin erillisessä yksityisessä istunnossa pelin aloitus ja WebGL-aloituspallo näkyivät. Tämä rajaa pois väitteen, ettei WebKit piirtäisi mitään WebGL:ää.
- Ateenan valinta ei edennyt tämän natiivin käyttöliittymäautomaatioyrityksen kautta (AX-kuvan napautus ja näkyvän pisteen koordinaattinapautus). En tulkitse tätä vielä pelin todistetuksi viaksi tai astronauttilinssin testiksi. Tavallisen Safarin Astronautin kamera ja sen äänigraafi jäivät **vahvistamatta**.
- Kertakäyttöinen yksityinen Safari-ikkuna ja Chrome-testivälilehti suljettiin. Asennettu Matkakirja jätettiin v1924:n tavalliseen pelinäkymään, säilytettyyn Ateena-pelitilanteeseen. Julkaistuun koodiin tai ääniin ei koskettu.
- Oikea iPhone/iPad: ei käytettävissä olevaa ohjaus- ja mittausyhteyttä tässä testissä. iOS-autoplay, taustalta paluu ja äänen fyysinen toisto edelleen avoimia.
- Console-varoituksia havaittiin saapumisluennan autoplay-estosta ja sähkelinjan Failed to fetch -tilasta sivulatauksessa; niitä ei naamioida puhtaaksi koko pelin konsoliksi. Astronautin testissä ei havaittu globe.gl:n ajovirhettä.

## Seuraava portti

Fable korjaa hover-taustan sekä selvittää WebAppin tyhjän avauksen. Uudesta julkaisucommitista tehdään kohdistettu uusintatesti. Sen lisäksi tarvitaan oikean iOS-laitteen kuuntelu- ja taustalta paluu -testi. Arabia-äänityön erillinen jono säilyy; tätä QA-tulosta ei käytetä sen toimituskuittauksena.
