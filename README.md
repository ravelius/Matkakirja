# Matkakirja ja unohdettu aarre ◈

*(lyhyesti Matkakirja)*

Selaimessa pelattava seikkailupeli maailman ympäri. Matkakirja on oma
pelinsä: se on saanut inspiraatiota Jules Vernen teoksista ja
monista muista, mutta se ei jäljittele mitään niistä eikä sillä ole
yhteyttä niiden oikeudenhaltijoihin. Ei riippuvuuksia, ei
käännösvaihetta — pelkkää HTML:ää, CSS:ää ja JavaScriptiä. Pelin ideana
on oppia ja opettaa maiden kulttuurista, arjesta ja maantieteestä
kiinnostavasti.

Nimen loppuosa tulee pelin ytimestä, **unohdetuista aarteista** (engl. *forgotten
treasures*): tutkimusmatkailija Aarni luetteloi aikoinaan maailman
kuuluisat kadonneet aarteet — Meripihkahuoneen, El Doradon, keisarin
jadesinetin ja muut — eikä kukaan uskonut häntä. Isoisä uskoi, ja hänen
matkansa jäi kesken. **Aarnin luettelo** (*Aarni's Catalogue*) on pelin
keskeinen ajojahti: jokaisella laudalla yksi luettelon aarre odottaa
löytäjäänsä ([docs/tarina.md](docs/tarina.md)).

## Tarina

Vintiltä löytyi isoisän matkalaukku: kartta vuodelta 1872, kukkarollinen
puntia ja kulunut matkakirja: *"Maailman ympäri kahdeksassakymmenessä
päivässä"*. Viimeinen sivu oli revitty kesken lauseen.

Nuori herra Fogg lähtee kirjoittamaan sen loppuun, mielellään nopeammin.
Mukana matkustaa isoisän päiväkirja vuodelta 1873: sen merkinnät ovat
vuoroin hämmentävän tarkkoja ja vuoroin toivottoman vanhentuneita, ja juuri
siitä jännitteestä pelin tarina syntyy. Piikki osuu aina Foggiin, klubiin
tai imperiumiin — ei koskaan maihin ja ihmisiin, joita matkalla kohdataan
([docs/tarina.md](docs/tarina.md), perustuslaki Raamatussa: [js/tyohuone-raamattu.js](js/tyohuone-raamattu.js)).

Peli alkaa maailmankartalta: napauta kaupunkia, ja kone lentää Lontoosta
kohteeseen vanhan seikkailufilmin karttakohtauksena — punainen viiva piirtyy
koneen perässä isoisän karttalehdelle, jolla kulkevat kääntöpiirit ja himmeät
päiväkirjamerkinnät. Matka jatkuu, kun astut ulos koneesta.

## Peli pähkinänkuoressa

- **Yksinpeli ilman loppua:** vaellus alkaa maailmankartalta ja jatkuu
  porttikaupunkien kautta laudalta toiselle — mantereille, maihin ja
  kaupunkitasolle. Löytöjä voi kerätä niin kauan kuin huvittaa.
- **Kymmenen pelilautaa**, jokaisella oma unohdettu aarre: Maailma (Magellanin
  kompassi), Afrikka (Suuren Zimbabwen kivilintu), Eurooppa
  (Meripihkahuoneen aarre), Aasia (Keisarin jadesinetti), Oseania
  (Eteläristin helmi), Pohjois-Amerikka (Montezuman aarre), Etelä-Amerikka
  (El Doradon aarre), Lähi-itä (Sheban kuningattaren aarre), Suomi (Lapin
  kulta) ja Istanbul (Sulttaanin timantti).
- **Afrikka on viimeistelty pisimmälle** ("Afrikka ensin"): elävät
  kahden äänen tekstit joka kaupungille, isoisän väittämät, tapahtumakortit,
  karttakysymykset, luonnoskirjan pulmat ja kartalle piirretyt maamerkit
  (Gizan pyramidit, Pöytävuori, Kilimandžaro, dhow). Muut laudat saavat
  saman käsittelyn lauta kerrallaan.
- **Aika on vastustaja, ei rangaistus:** vuoro on kuusi tuntia ja yläpalkissa
  kulkee päiväkirjan päivämäärä ("Päivä 14, ilta"). Isoisän aikataulu
  kommentoi matkaa samoilta päiviltä, ja 80 päivän ennätyksen alittamisesta
  saa kunniamerkinnän passiin — ajan loppuminen ei päätä peliä koskaan.
- **Pysähdykset vaihtelevat:** tavallisen monivalinnan rinnalla isoisän
  väittämät (totta vai tarua), karttakysymykset (mikä näistä on pohjoisin?
  mihin pääsee suoraan yhtä reittiä?) ja tapahtumakortit, joissa ei kysytä
  mitään vaan matkalla sattuu jotain pientä ja reilua.
- **Isoisän luonnoskirjan pulmat:** viisi kauniisti piirrettyä
  päättelytehtävää Afrikassa — hieroglyfiluvut, Ashantien kultapunnukset,
  xhosan naksutusmerkit, käsikirjoituksen kuunvaiheet ja karavaanin
  vesileilit. Pulmat avautuvat kerran pelissä kaupunkiin saavuttaessa ja
  varioituvat pelikerrasta toiseen: sama grafiikka, eri tehtävä.
- **Isoisä on merkinnyt paikkoja karttaansa:** aarrekaupunkiin saapuessa
  kortti näyttää paikan valokuvan ja kysyy, tutkitko paikan. Aarteet
  avataan tiedolla, ei rahalla.
- **Lue lisää:** jokaisesta Afrikan kaupungista voi avata Wikipedian
  artikkelin kuvineen suoraan pelistä (lähdemaininta CC BY-SA;
  montaasipääkuvat vaihdetaan automaattisesti yhteen valokuvaan).
- **Kaksi ääntä:** kartan päiväkirjassa vuorottelevat isoisän merkinnät
  vuodelta 1873 ja nuoren herran nykyhavainnot — yli 1000 paikkatietoa,
  Afrikassa pieniä yllättäviä arkihuomioita isojen nähtävyyksien rinnalla.
  Harvakseltaan päiväkirjasta löytyy taitettu sivu, joka vihjaa unohdetun aarteen
  suunnasta nimeämättä kaupunkia.
- **Yli 1500 kysymystä ja väittämää** kolmella vaikeustasolla: paikan omat
  kysymykset arvotaan aina ennen laudan yleispakkaa, joten kysymys liittyy
  maahan jossa seisot. Vaikeasta kysymyksestä 100 punnan bonus; 40 punnan
  vihje, 80 punnan 50:50 ja 45 sekunnin tiimalasi auttavat pinteessä.
- **Rosvon kaksintaistelu:** rosvolaatta ei vie rahoja suoraan, vaan rosvo
  esittää kiperän kysymyksen kahdeksalla vaihtoehdolla — oikea vastaus tuo
  200 punnan saaliin, ja kolmella hevosenkengällä rosvon voi ohittaa.
- **Tietäjäpisteet ja tietäjätasot:** uusi kaupunki 10, uusi lauta 50,
  vaikea kysymys 25, pulma 25 ja unohdettu aarre 100 pistettä; tietoprosentti
  kertoo osumatarkkuuden. Pisteet nostavat nimikettä Untuvikosta (0 tp)
  Tietäjäksi iänikuiseksi (2400 tp) — nousu ei anna muuta kuin nimikkeen, ja
  pöllö onnittelee jokaisesta omalla muotokuvallaan ja kalevalaisella
  värssyllä. Matkalaukun tietäjärivi näyttää nykyisen tason avatarin ja
  edistymispalkin, ja rivin i-nappi avaa kaikki kymmenen tasoa gallerian. Passi saa leiman jokaisesta laudasta, ja leimat
  säilyvät pelikertojen yli.
- **Käsin piirretyn aarrekartan ulkoasu:** pergamentti, mustepiirretty
  rannikko, kompassiruusu, maamerkit ja filmivinjetti; tekstit naksuvat
  ruudulle kuin vanhalla matkakirjoituskoneella, ja kolmiulotteinen noppa
  heitetään kartan merelle. Kartta näkyy aina kokonaan — ei raahausta.
- **Syntetisoidut äänet** kaikille toiminnoille (Web Audio, ei
  äänitiedostoja): noppa, askeleet, laiva, lento, vastaukset, paljastus.
- **Asennettava sovellus (PWA):** toimii offline, jatkaa keskeytyneen pelin
  automaattisesti, ja **Päivitä**-painike hakee uusimman version peliä
  menettämättä. Mitoitettu iPadille ja iPhonelle.

## Julkaisu puhelimeen (GitHub Pages)

Peli on staattinen sivusto, joten sen voi julkaista sellaisenaan GitHub Pagesiin.
Silloin kotivalikkoon lisätty kuvake avaa pelin kokonaan ilman selaimen palkkeja.

1. Tee reposta julkinen (ilmaisella tilillä Pages toimii vain julkisista repoista).
2. *Settings → Pages → Source: **GitHub Actions***.
3. Työnkulku `.github/workflows/pages.yml` ajaa testit, kokoaa yhden tiedoston
   version ja julkaisee sivuston osoitteeseen `https://<käyttäjä>.github.io/Afrikan-t-hti/`.
4. Avaa osoite puhelimessa ja valitse *Lisää Koti-valikkoon*.

Vaihtoehtoisesti *Settings → Pages → Source: Deploy from a branch* julkaisee valitun
haaran juuren ilman työnkulkua.

## Pelin käynnistys

Peli käyttää ES-moduuleja, joten se tarvitsee pienen web-palvelimen (pelkkä
`index.html`-tiedoston avaaminen selaimeen ei riitä):

```bash
npm start          # käynnistää python3 -m http.server 8000
# tai
npx http-server -p 8000
```

Avaa sitten <http://localhost:8000/>.

**Asennus sovellukseksi.** Kun peli on avattu selaimessa (https tai localhost), sen voi
lisätä kotivalikkoon: iPadilla ja iPhonella *Jaa → Lisää kotivalikkoon*, Chromessa
osoitepalkin asennuskuvake. Tällöin peli avautuu ilman selaimen palkkeja ja toimii myös
lentokonetilassa. Kesken jäänyt peli tallentuu selaimen muistiin ja jatkuu automaattisesti
seuraavalla avauskerralla; *Uusi peli* aloittaa alusta.

## Säännöt

**Tavoite.** Löydä laudan unohdettu aarre — Afrikassa Suuren Zimbabwen kivilintu —
ja vie se johonkin laudan aloituskaupungeista. Vaelluksessa peli ei pääty:
unohdettu aarre on 2000 punnan arvoinen löytö, ja matka jatkuu porttikaupunkien
kautta uusille laudoille. Isoisän 80 päivän ennätyksen alittaminen tuo kunniamerkinnän.

**Vuoron kulku.**

1. **Valitse matkustustapa.** Näkyvillä on kerrallaan vain muutama nappi:

| Tapa | Selitys |
| --- | --- |
| 🥾 Jalan | Ilmainen; lähtee heti ja heittää nopan samalla painalluksella |
| ⛵✈ Laiva & lento… | Avaa loput: laiva (100 p), lennot (300 p), portit ja tietoportit |
| 🔍 Tutki paikka | Isoisän merkitsemässä kaupungissa: kokeile liikkumatta |

   Jos vaihtoehtoja on vain yksi — esimerkiksi sisämaassa tai kesken reitin —
   noppa pyörähtää itsestään.

2. **Heitä noppa** — noppa jää lepäämään kartan merelle. Silmäluku on
   askelten enimmäismäärä: tasalukua ei tarvita, ja kaupunkiin saa pysähtyä
   jo matkan varrella. Kesken reitin ei saa kääntyä takaisin.
3. **Valitse kohde** kartalta napauttamalla.
4. **Tutki paikka**, jos saavuit isoisän merkitsemään kaupunkiin — pysähdys
   voi olla tietovisa, isoisän väittämä, karttakysymys tai tapahtumakortti.
   Sen jälkeen vuoro vaihtuu ja kello siirtyy kuusi tuntia.

**Portit.** Porttikaupungin tunnistaa katkoviivakehästä: sieltä pääsee
lennolla (300 p) toiselle laudalle. Maakohtaiset kartat (esim. Suomi) eivät
aukea rahalla vaan tiedolla — mantereen pääkaupungissa vastataan vaikeaan
kysymykseen, ja oikea vastaus avaa portin ilmaiseksi.

**Aarteet.** Jokaisessa isoisän merkitsemässä kaupungissa on yksi laatta.
Oikea vastaus kääntää laatan; väärästä vuoro päättyy ja samassa kaupungissa
saa uuden kysymyksen seuraavalla vuorolla. Laattoina ovat unohdettu aarre,
hevosenkengät, ryöstäjät, jalokivet (arvo 300–1000 puntaa suoraan kukkaroon)
ja tyhjät — tyhjän kohdalla isoisän merkintä oli vanhentunut. Jalokivet
vaihtuvat laudan mukaan: Lähi-idässä turkoosi, Euroopassa meripihka,
Suomessa spektroliitti.

**Rahan käyttö.** Rahalla ei osteta aarteita vaan matkoja ja apuja: laiva
100 p, lento 300 p, vihje 40 p ja 50:50 80 p. Jokainen aloittaa 300 punnalla.
Rahaton ja jumiin jäänyt matkaaja saa pankilta 100 puntaa (kotisääntö, jota
alkuperäisessä pelissä ei ole).

Kartat ja reitit ovat oma tulkintamme: kaupungit on sijoitettu todellisten
koordinaattiensa mukaan ja reittien pituudet on tasapainotettu peliä varten.

## Projektin rakenne

```
index.html          runko ja dialogit
css/styles.css      ulkoasu
js/pack.js          karttapakettien rekisteri (laudat)
js/packs/           yksi paketti per lauta: kartta, kaupungit, reitit,
                    laatat, kysymykset, tekstit ja teema — Afrikalla myös
                    väittämät, tapahtumat, pulmat (africa-puzzles.js),
                    isoisän aikataulu ja wiki-otsikot
js/tokens.js        laattatyypit ja pinon sekoitus
js/rules.js         puhdas sääntölogiikka (siirrot, etäisyydet) — testattavissa Nodella
js/game.js          pelitila, vuorot, aika, laatat, pulmat ja voittoehdot
js/wiki.js          Lue lisää: Wikipedian tiivistelmä, artikkeli ja kuvavalinta
js/mapart.js        aarrekartan grafiikka (pergamentti, rannikko, maamerkit)
js/sound.js         syntetisoidut ääniefektit
js/ui.js            kartan ja korttien piirto, tietovisa, lentokohtaus
js/main.js          käynnistys ja pelin tallennus
js/ai.js            kysymysvalinnan apurit (testien käytössä; botit poistettu pelistä)
sw.js               palvelutyöntekijä (offline-tuki)
manifest.webmanifest  sovelluksen tiedot kotivalikkoa varten
assets/             sovelluskuvakkeet
tools/              yhden tiedoston koonti ja kuvakkeiden generointi
tests/              node --test -testit säännöille ja kokonaiselle pelille
docs/               tarina, roolitus ja työohjeet
```

## Periaatteet

Projektin arvopohja — miksi peli on olemassa ja millä perusteilla sisältö
hyväksytään — on kirjattu Raamattuun ([js/tyohuone-raamattu.js](js/tyohuone-raamattu.js)) ja [CONTRIBUTING.md](CONTRIBUTING.md):hen.
Tarinan säännöt ja kirjoitusohjeet ovat tiedostossa [docs/tarina.md](docs/tarina.md).

## Uuden laudan lisääminen

Peli on rakennettu niin, että uusi manner tai alue on oma *karttapakettinsa* —
moottoriin ei tarvitse koskea. Ohjeet ovat tiedostossa
[CONTRIBUTING.md](CONTRIBUTING.md).

## Testit

```bash
npm test
```

Testit kattavat laudan yhtenäisyyden, siirtojen laskennan, laattojen
vaikutukset, tietovisan ja sen erikoismuotojen kulun, pulmien generoinnin,
kysymyspankkien eheyden (mm. ettei oikea vastaus lue saman laudan kartalla),
ajan kirjanpidon, tallennuksen palautuksen ja voittoehdot.

## Yhden tiedoston versio

```bash
node tools/build-standalone.mjs
```

Kokoaa kaiken tiedostoon `dist/matkakirja.html`, jonka voi avata selaimessa
suoraan ilman palvelinta (Lue lisää -toiminto tarvitsee silti verkon).

## Kuvakkeet

Sovelluskuvakkeet on generoitu pelin omasta rannikkoviivasta:

```bash
node tools/make-icons.mjs                                   # päivittää assets/icon.svg
node tools/make-icons.mjs --png <polku/playwright/index.mjs>  # myös PNG:t
```

Valmiit tiedostot ovat repossa, joten skriptiä tarvitaan vain kuvakkeen muuttuessa.

## Lisenssi

Copyright © 2026 Sami Reivinen. Kaikki oikeudet pidätetään — ks.
[LICENSE](LICENSE).

Peliä saa pelata ja lähdekoodia lukea vapaasti. Julkaisuun, levitykseen
tai omaan tuotteeseen tarvitaan lupa.

Pelin näyttämät valokuvat, äänet ja tiedot eivät ole tekijän omaisuutta:
ne tulevat Wikimedia Commonsista, Freesoundista, radio aporeesta,
Wikipediasta, Maailmanpankilta ja V-Demiltä omilla avoimilla
lisensseillään. Jokaisen lähde, tekijä ja lisenssi on merkitty pelin
sisältötiedostoihin.

## Lähteet ja aineistot

Sama luettelo näkyy pelissä: matkalaukun alalaidassa on linkki **Unohdettu
aarre**, joka avaa tekijätiedot ja tämän listan. Luettelon sisältö on
tiedostossa [js/lahteet.js](js/lahteet.js) — kun peliin tulee uusi aineisto,
se lisätään sinne **ja** tähän lukuun.

Alla ovat ne kokoelmat ja aineistot, joista sisältö on peräisin. Jokaisen
yksittäisen valokuvan, äänitteen ja väitteen oma lähde on siinä tiedostossa,
jossa sisältö on (kentät `lahde`, `aaniLahde`, `credit`, `source` sekä
pakettien otsikkokommentit).

### Kartta- ja korkeusaineistot

| Aineisto | Tekijä / julkaisija | Lisenssi |
| --- | --- | --- |
| Natural Earth — rannikot, maarajat, joet, järvet ja meri (1:10m, 1:50m, 1:110m) | Natural Earth, naturalearthdata.com | Public domain |
| ETOPO1 Global Relief Model, Ice Surface (1 kaariminuutti) — korkeus, syvyys, varjostus, reliefikartta | Amante & Eakins 2009, NOAA NGDC/NCEI, doi:10.7289/V5C8276M; haettu NOAA CoastWatch ERDDAPista | Public domain (Yhdysvaltain liittovaltion virasto) |
| Earth at Night (Black Marble) 2016 — yökartan valot | NASA Earth Observatory / Visible Earth; NASA GSFC, Miguel Román, kuvankäsittely Joshua Stevens (SSAI) | Public domain (NASA), maininta ehtona |

### Tietoaineistot

| Aineisto | Tekijä / julkaisija | Lisenssi |
| --- | --- | --- |
| Köppen–Geiger-ilmastoluokitus 1980–2016 | Beck ym. 2018, Scientific Data 5:180214 | CC BY 4.0 |
| Glottolog 5.2 — kielikuntien sukupuu ja sijainnit | Hammarström, Forkel, Haspelmath & Bank 2025, MPI EVA | CC BY 4.0 |
| World Development Indicators | Maailmanpankki | CC BY 4.0 |
| World Happiness Report 2026, Cantrilin tikapuu | Helliwell ym., University of Oxford; koosteena Our World in Data | Vapaa käyttö; OWIDin käsittely CC BY 4.0 |
| Liberaalin demokratian indeksi | V-Dem-instituutti, Our World in Datan kautta | **Ei kirjattu repoon** |
| International Migrant Stock 2024 | UN DESA, Population Division, © 2024 United Nations | CC BY 3.0 IGO |
| ICOADS 2° enhanced — tuulet 1971–2000 | Freeman ym. 2017; tuote NOAA PSL | Vapaasti käytettävä (NOAA) |
| OSCAR Sea Surface Velocity — pintavirtaukset | Bonjean & Lagerloef 2002, Earth & Space Research | Vapaasti jaeltava tutkimusaineisto |
| Global Atmospheric Circulations — tuulivyöhykkeiden nimet | NOAA / NWS JetStream | Public domain |
| Yale Bright Star Catalogue, 5. laitos | Hoffleit & Warren 1991, NASA ADC; jakelu CDS/VizieR (V/50) | **Ei erillistä lisenssitekstiä**; CDS pyytää mainitsemaan VizieRin ja tekijät |
| ConstellationLines — 88 tähdistön tikkukuviot | Marc van der Sluys 2005–2023, doi:10.5281/zenodo.10397192 | CC BY 4.0 (aineistotiedosto sanoo CC BY-SA 4.0 — ristiriita lähteessä) |
| IAU Catalog of Star Names | IAU Working Group on Star Names 2022 | CC BY |
| Wikidata — koordinaatit, ISO-koodit, maannimet | Wikidata-yhteisö | CC0 1.0 |
| Ihmisen leviämisen ajoitukset | Julkaistut tutkimusartikkelit (Hublin, Richter, Vidal, Hershkovitz, Groucutt, Clarkson, Fu, Bennett, Dillehay, Wilmshurst, Iasi ym.) | Lainauksia; viite rivikohtaisesti |
| Silkkitien kaupungit, reitit ja valtakuntien rajat | UNESCO Silk Roads Programme; IDP (British Library); Silk Road Seattle; Britannica; Wikipedia | Tosiasiatietoa; selitetekstit kirjoitettu itse |

### Valokuvat ja kuvitus

| Aineisto | Tekijä / julkaisija | Lisenssi |
| --- | --- | --- |
| Wikimedia Commons — valokuvien pääasiallinen lähde | Kuvaajat tiedostokohtaisesti | PD, CC0, CC BY, CC BY-SA (ei ND eikä NC) |
| Library of Congress — vanhat vedokset ja lasilevyt (mm. Matson, Prokudin-Gorski, Photochrom) | Library of Congress | Public domain |
| Rijksmuseum — vanhat piirrokset ja vedokset | Rijksmuseum, Amsterdam | Public domain |
| Internet Archive Book Images | Internet Archive | Public domain |
| Lippukuvat | Wikimedia Commons; nimeämistä vaativat neljä on lueteltu `js/packs/lippu-tekijat.js`:ssä | Public domain sekä CC BY-SA 2.5 ja 3.0 |
| Kartan grafiikka, laattojen kuvakkeet, pulmien piirrokset, aikakausjulisteet, sovelluskuvakkeet | Sami Reivinen | Copyright © 2026 Sami Reivinen |

### Äänet

| Aineisto | Tekijä / julkaisija | Lisenssi |
| --- | --- | --- |
| radio aporee ::: maps — kenttä-äänitykset (äänimaisemat, "Kuuntele kieltä") | Äänittäjät kohteittain, jakelu archive.org | PD, CC BY, CC BY-SA, CC BY-NC kohteittain |
| Freesound — äänimaisemat ja tehosteet | Äänittäjät kohteittain (mm. LoafDV, brktkrgll, Hoscalegeek, AardsReal) | CC0, CC BY, CC BY-NC kohteittain |
| Lyhytaaltoäänitteet — maailmanradion viritysäänet | archive.orgin arkistot, mm. samnewton94 | Public Domain Mark 1.0, CC0 |
| "Pocket camera start and shut down" — zoomausääni | stephan, pdsounds.org Wikimedia Commonsin kautta | Public domain |
| Musiikkinäytteet kulttuurinostoissa | Wikimedia Commons, archive.org (vain lisenssiosoitteella merkityt) | Kohteittain |
| Suorat radiolähetykset | Asemaluettelo Radio Browserista (radio-browser.info); virrat asemien omia | **Edelleenvälityksen ehtoja ei selvitetty** |
| Peliäänet ja avaustekstin lukuääni (`efekti-*.mp3`, `intro-puhe.mp3`) | Tuotettu ElevenLabsilla | **Ei kirjattu repoon** (ElevenLabsin tilausehdot) |
| Syntetisoidut tehosteet ja ambienssi (Web Audio) | Sami Reivinen | Copyright © 2026 Sami Reivinen |

### Tekstit

| Aineisto | Tekijä / julkaisija | Lisenssi |
| --- | --- | --- |
| Wikipedia (fi ja en) — tiivistelmät, artikkelit, kysymysten tarkistuslähteet | Wikipedian kirjoittajat | CC BY-SA (maininta ja linkki näkyvät pelissä) |
| Project Gutenberg — aikalaislainaukset | Alkuperäisteosten kirjoittajat; digitointi Project Gutenberg | Public domain (teokset) |
| Internet Archive ja Wikisource — lainaukset, joita Gutenbergissa ei ole | Alkuperäisteosten kirjoittajat | Public domain (teokset) |
| Pelin omat tekstit: tarina, päiväkirja, kysymykset, väittämät, tapahtumat, pulmat, tiivistelmät | Sami Reivinen | Copyright © 2026 Sami Reivinen |

**Lisenssiltään epäselvät.** Neljä riviä yllä on merkitty lihavoituna: niiden
lisenssiä ei ole kirjattu repoon eikä sitä ole tähän arvattu. Ne ovat V-Dem /
Our World in Data, Yale Bright Star Catalogue, suorien radiolähetysten
edelleenvälitys ja ElevenLabsilla tuotetut äänet. Lisäksi ConstellationLinesin
lisenssistä on kaksi eri tietoa itse lähteessä.
