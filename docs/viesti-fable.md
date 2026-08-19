# Viestikanava Fablelle

## Pro-sisällöntuottajapalikka, vaihe 1 — Raamattuun kirjattavat rivit

Pro-palikka on rakennettu (worker/ehdotukset/pro.js, js/tekijakortti.js,
js/ehdotukset.js:n pro-osio, Lukijoilta-lehden pro-sivut,
docs/pro-lisenssilupa.md, docs/moduulit/lukijoilta.md osio 4). Agentti
ei kirjoita Raamattuun — nämä kaksi riviä jäävät Fablelle:

**1. Linjausrivi osioon "Lukijoiden ehdotukset" (tai omaksi osiokseen
"Pro-sisällöntuottajat"):**

> PRO-SISÄLLÖNTUOTTAJAT (omistajan tilaus 18.8.2026). Ehdotuskanava on
> auki kaikille pelaajille; pro-kanava vain niille ammattilaisille —
> valokuvaajille ja tutkijoille — jotka omistaja on HENKILÖKOHTAISESTI
> kutsunut. Kutsuttu saa pysyvän kahdeksan merkin koodin, ja
> vastineeksi laadukkaasta sisällöstä hänelle tulee pelissä krediitti
> ja oma tekijäsivu: kuva, esittely ja linkit omille kotisivuille.
> Sivu avautuu kuvan lähderiviltä, kun paketissa on kenttä `tekijaId`.
> Kolme sääntöä: (1) mikään profiili ei näy pelaajalle ennen omistajan
> hyväksyntää, ja julkaistun profiilin muutos palaa aina jonoon;
> (2) sähköposti ja koodi eivät päädy julkiseen vastaukseen eivätkä
> lokiin — julkinen profiili on eri olio eri avaimessa; (3) lupa
> pyydetään aina lupapohjalla (docs/pro-lisenssilupa.md): rinnakkainen
> ei-yksinomainen lisenssi peliin, peruutus koskee uusia julkaisuja.
> Toteutus: docs/moduulit/lukijoilta.md osio 4.

**2. Dokumenttikartan rivi (Raamatun viimeinen osio) — PAKOLLINEN,
muuten tests/dokumentit.test.mjs kaatuu:**

> 'docs/pro-lisenssilupa.md — vakiopohja, jonka omistaja lähettää
>   kutsumalleen pro-sisällöntuottajalle: mitä luovutetaan, lisenssi,
>   krediitti ja tekijäsivu, peruutusehto.',

Tämä rivi on ainoa punainen portti haarassa
`claude/fable-pro-palikka`: dokumentit-testi vaatii jokaiselle
docs/-tiedostolle rivin Raamatun kartalla. Kaikki muut portit ovat
vihreitä.

---

## Kulttuurivisat: neljä kaupunkia korjattu, yksi päällekkäisyys jää Fablelle

*(Opus-rooli, 19.8.2026, v913. Omistaja huomasi Pariisin lehdessä, ettei
patonkikilpailun visakysymykseen ole lehdessä vastausta.)*

### Mitä mitattiin

Kaikki 43 Euroopan kaupunkia, joilla on sekä kulttuurivisa
(`js/packs/europe-kulttuuri.js`) että kategoriat
(`js/packs/kulttuuri-kategoriat.js`). **39 oli kunnossa, neljä ei.**

`docs/moduulit/kaupunkilehti.md` vaatii, että visan opettava nosto on
kategorioissa näkyvillä, ja julkaisun tarkistuslistan kohta 4 sanoo
suoraan: *"Kulttuurivisa aukeaa saapumiskortilta ja sen aihe löytyy
aiheista."* Näissä neljässä aihe oli vain maalehden puolella:

| Kaupunki | Mitä puuttui |
| --- | --- |
| Pariisi | patonkikilpailu vain Matkaoppaan popupissa, ei lehden sivuilla |
| Lontoo | sanaa "höyry" ei ollut kaupunkilehdessä kertaakaan |
| Dublin | uilleann, säkkipilli, palje — ei yhtään osumaa |
| Budapest | ei ruoka-aihetta eikä sanaa gulyás lainkaan |

Jokainen sai v913:ssa kaupunki-sivulleen neljännen noston, joka kantaa
visan opettavan tiedon. **Visakysymysten tekstiin ei koskettu** —
se on Fablen kaanonia (docs/roolitus.md).

Tarkistettiin myös, ettei tämä riko Raamatun SPOILERISÄÄNTÖÄ. Ei riko:
sääntö on osiossa "Kirjoittajan säännöt (matkakirjatekstit)" ja koskee
päiväkirjatekstejä ja aarrevisaa, ei kaupunkilehteä.

### Mikä jää Fablelle: Dublin ↔ Irlanti -päällekkäisyys

Irlannin maalehden minitehtävä (`js/packs/maa-kategoriat.js`, IRL,
Musiikki-aiheen `tehtava`) kysyy **"Miten uilleann-pilliin saadaan
ilma?"** — käytännössä saman kuin Dublinin kulttuurivisa
(`js/packs/europe-kulttuuri.js`, `dublin.kysymys`): *"Miten
irlantilaiseen uilleann-säkkipilliin saadaan ilmaa?"*

`docs/moduulit/kaupunkilehti.md` rivit 319–324 kieltävät nimenomaan
tämän: *"Minitehtävä osuu kaupungin omaan kulttuurivisaan… Tarkista
aina kaupungin kysymys-kenttä ennen kuin hyväksyt tehtävän."*

Molemmat ovat tarinatekstiä, joten Opus ei koskenut kumpaankaan.
Korjaus on joko minitehtävän vaihtaminen toiseen Irlanti-aiheeseen tai
Dublinin visan vaihtaminen — kumpi tahansa on Fablen päätös.

### Sivuhavainto: rajatapaus Kreeta

Kreetan visan oikea vastaus on *"noin 4 000 vuotta"*, ja se on
pääteltävissä kategorian johdannosta ("neljätuhatta vuotta sitten").
Vastauksen jälkiosaa "Euroopan vanhin kaupunkikulttuuri" ei kuitenkaan
sanota lehdessä missään. Ei korjattu — riittääkö tämä, on
kaanonikysymys.

---

## Venetsian Matkailijalle-osio — VALMIS (v916)

*(Opus-rooli, 19.8.2026.)*

Venetsia sai Matkailijalle-osion Pariisin mallin mukaan: pystykuva
etusivulle, `taitto: 'opas'`, viisi jaksoa, `matkailu`-lohko ja
`lahde`. Jaksot 424–454 merkkiä (Pariisissa 416–473).

Jaksot on kirjoitettu niin, etteivät ne toista lehden nostoja —
puupaalut, acqua altan sireenit ja MOSE, Muranon lasi, gondolin
vinous, Canaletto, cicchetit ja Vivaldi ovat jo sivuilla. Opas kertoo
sen sijaan käytännön asiat: Ponte della Libertàn (Miozzi 1932, avattu
1933, ainoa autoyhteys), sestieri-osoitejärjestelmän (numerot
juoksevat kaupunginosittain, Castellossa lähelle 7 000), laguunin
(126 saarta, 472 siltaa), tasavallan (810–1797) ja väestön
(centro storico 50 434 vuonna 2021, kun 1980 oli ~120 000).

`matkailu`-lohkon vuodenaikojen lämpötilat on johdettu repon omista
normaaleista (js/packs/saatiedot.js: venetsia).

### Etusivukuvasta: kaava on tiukka, ja se näkyi

Omistajan kaava (docs/tyolista-opukselle.md 16.8.2026) hylkäsi
kuusi ehdokasta ennen kuin oikea löytyi:

- `20110722 Venice Santa Maria della Salute 4459.jpg` — pystysuora
  Quality image, mutta etualalla gondolieeri kasvot kameraan
- `Bridge of Sighs (50427150483).jpg` — kanavanäkymä eikä yksi aihe,
  kaukosillalla ihmisjoukko, taivas litteän harmaa
- `Venice, Rialto Bridge (SW) 6.jpg` ja `… (NE).jpg` — tunnistettavia
  ihmisiä etualalla
- `Campanile di San Marco con Loggia.jpg` ja
  `Campanile di San Marco (3499947209).jpg` — tornin juurella
  ihmisjoukko

Valituksi tuli `Santa Maria della Salute from Hotel Monaco.jpg`
(Wolfgang Moroder, CC BY-SA 3.0, 3973×5965): yksi aihe täyttää ruudun,
laituri on tyhjä, valo kirkas ja oikea yläkulma vapaa
Matkaopas-nauhalle.

**Yksi poikkeama mallista:** jakson 1 karusellissa on kaksi kuvaa
kolmen sijaan. Piazzale Roman kuvat ovat väistämättä täynnä busseja,
autoja ja ihmisiä (`Piazzale Roma.JPG` hylättiin: poliiseja kasvot
kameraan), enkä halunnut täyttää paikkaa heikolla kuvalla. Kaksi kuvaa
renderöityy karusellina normaalisti.

## Opus 19.8.2026: faktavirhe Odessan latausfaktassa

`js/packs/europe-questions.js:2410` sanoo: *"Odessan oopperatalo on
rakennettu tanskalaisen ja itävaltalaisen arkkitehdin suunnitelmien
mukaan."* `js/packs/nahtavyysjutut.js:7740` kertoo saman talon
suunnittelijoiksi Ferdinand Fellnerin ja Hermann Helmerin, jotka olivat
molemmat wieniläisen toimiston arkkitehteja — ei tanskalais-itävaltalainen
pari. Kaksi tiedostoa on siis keskenään ristiriidassa, ja
nahtavyysjutut.js:n versio on oikea.

En muuttanut visa- tai triviatiedostoja, koska ne eivät ole Opuksen
vastuulla. Korjaus on yhden lauseen mittainen.

(Löytyi Odessan Matkailijalle-osiota pohjustaneessa Sonnet-mittauksessa,
v926.)

## Opus 19.8.2026: Lähi-idän kartoitus — kahdeksan kohdetta ilman lehteä

Kun Eurooppa tuli valmiiksi (43/43), kartoitin Lähi-idän laudan
(`middleeast`, 29 kohdetta). Tilanne:

- **5 valmista**: Istanbul, Kairo, Dubai, Bagdad, Teheran (avauskuvat,
  8–10 karttakohdetta, Matkailijalle-opas).
- **16 puolivalmista**: izmir, ankara, nikosia, halab, damaskos, luxor,
  riad, sana, aden, salalah, masqat, doha, kuwait, mosul, tabriz,
  isfahan. Näillä on lehti ja kaksi sivua nostoineen, mutta ei
  avauskuvia eikä matkaopasta, ja karttakohteita on 6 tai 0 (standardi
  on ~10). Nämä voin tehdä samalla reseptillä kuin Euroopan.
- **8 ilman lehteä**: kapadokia, jerusalem, petra, siinai, medina,
  mekka, rubalkhali, persepolis. Näillä ei ole riviä
  `kulttuuri-kategoriat.js`:ssä lainkaan.

Viimeinen ryhmä on eri asia kuin täydentäminen: se vaatii kokonaan uuden
lehden eli sivujaon, nostot ja karttakohteet — ja niistä osa (Mekka,
Medina) on sellaisia, joissa sisällön rajaus on tarinakaanonin ja
sävyn kysymys, ei tekninen. En aloita niitä ilman sinun linjaustasi.

Ehdotan, että jatkan 16 puolivalmiin kimpussa Euroopan reseptillä
(avauskuvat + Matkailijalle + karttakohteet kymmeneen), ja että päätät
erikseen, tehdäänkö kahdeksalle puuttuvalle lehdet ja millä rajauksella.

Aloitin Izmiristä (v929, avauskuvat).

---

## Opus 19.8.2026 — omistajan kysymys: pitäisikö kuvien mennä ämpäriin eikä repoon?

Omistaja kysyi tänään suoraan: "Onko kuvat pakko mennä repoon? Pitäisi
mennä pelkästään ämpäriin." Tämä on arkkitehtuurilinjaus, joten en tee
mitään siirtoa vaan tuon numerot ja vaihtoehdot sinulle.

### Mikä on tilanne mitattuna

- Commons-kuvat EIVÄT ole repossa. Lehdessä on vain tiedostonimi, ja
  peli hakee kuvan ajossa Special:FilePathista, joka skaalaa sen.
- Petran (v930) ja Kappadokian (v931) yhteensä 50 kuvaa ovat kaikki
  tällaisia. Näiden kahden version ainoa uusi binääri koko repossa on
  Petran kohdekartta, 138 kt.
- Repoon menee kuvia vain kahta reittiä:
  1. tools/fetch-photos.mjs peilaa Commons-kuvia kansioon
     assets/valokuvat/ — 60 Mt, 200 tiedostoa.
  2. Flickr-reitti vaatii paikallisen kopion, koska Flickrillä ei ole
     pysyvää skaalausosoitetta.
- PAINAVIN EI OLE VALOKUVAT vaan assets/kartat, 120 Mt. Ne ovat pelin
  itse generoimia kaupunkikarttoja, eivät haettua aineistoa.
- .git on 439 Mt.

### Miksi paikalliset kopiot alun perin tehtiin

valokuvat-paikalliset.js:n oma otsikko kertoo syyn: nopea lataus,
OFFLINE-KÄYTTÖ ja immuniteetti sille että kuva poistetaan Commonsista.
Nämä kolme ovat se hinta, joka ämpärisiirrossa maksetaan.

### Mitä siirto koskisi

1. Offline ja service worker. Peli on PWA, ja paikalliset kopiot ovat
   se mikä tekee siitä offline-kelpoisen. Ämpäri toimisi, mutta
   ensimmäinen lataus vaatisi verkon ja sw.js:n välimuistisäännöt
   pitäisi kirjoittaa uusiksi.
2. Yhden tiedoston versio. dist/matkakirja.html sisältää kuvapaketit
   eli viittaukset, ei kuvatavuja — se säilyisi mutta riippuisi
   verkosta.
3. Pages-julkaisu ja CORS: ämpärille tarvitaan osoite, CORS-säännöt ja
   välimuistipolitiikka.

### Kysymykset, joihin tarvitsen päätöksesi

1. Siirretäänkö assets/valokuvat ämpäriin, ja jos siirretään, mikä on
   offline-linjaus — luovutaanko siitä vai tehdäänkö SW:hen
   verkkovälimuisti?
2. Koskeeko sama assets/kartat-kansiota? Se on kaksi kertaa painavampi
   kuin valokuvat, mutta se on itse generoitua eikä sitä voi hakea
   uudelleen mistään ulkoisesta lähteestä ilman koko piirtoajoa.
3. Puretaanko historia (60 + 120 Mt on jo .git:ssä), vai koskeeko
   linjaus vain uutta aineistoa? Historian purku on kertaluontoinen ja
   rikkoo kaikkien kloonit.

### Mitä teen sillä välin ilman päätöstä

Pidän loput Lähi-idän ja Aasian lehdet pelkästään Commonsissa, jolloin
repoon ei tule yhtään uutta valokuvaa. Mittasin Commonsin katteen
kaikille jäljellä oleville Lähi-idän kohteille: kelvollisia osumia on
26–48 per haku (Persepolis 47, Mekka 48, Jerusalem 42, Ruba al-Khali
42, Salalah 42, Medina 41, Sana 37, Aden 37, Siinai 26). Flickriä ei
siis todennäköisesti tarvita lainkaan, eli uusia paikallisia kopioita
ei synny.
