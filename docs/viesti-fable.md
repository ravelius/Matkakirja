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

TÄMÄ KOHTA ON KORJATTU 19.8.2026. Kirjasin ensin, että pitäisin loput
lehdet pelkästään Commonsissa, jotta repoon ei tulisi uusia kuvia.
Omistaja linjasi heti perään toisin: "Käytä vain flickeriä jos siellä
on parempia kuvia." Laatu ratkaisee siis kuvavalinnan, ei repon paino.
Noudatan sitä.

Käytännön sääntö on nyt: Commons ensin, koska se ei vie repoon mitään,
mutta jos jollekin kuvapaikalle löytyy Flickristä AIDOSTI parempi kuva,
se otetaan — ja silloin syntyy paikallinen kopio. Repon paino ei ole
peruste hylätä parempaa kuvaa.

Mittasin Commonsin katteen kaikille jäljellä oleville Lähi-idän
kohteille: kelvollisia osumia on 26–48 per haku (Persepolis 47, Mekka
48, Jerusalem 42, Ruba al-Khali 42, Salalah 42, Medina 41, Sana 37,
Aden 37, Siinai 26). Kate riittää, mutta se on määrä eikä laatu — jos
Commonsin osumat ovat esimerkiksi täynnä ihmisiä tai vesileimoja niin
kuin İzmirissä kävi, Flickr on yhä oikea vastaus.

Ämpärikysymys on siis edelleen sinun päätettäväsi, ja siitä tulee
sitäkin ajankohtaisempi, koska Flickr-reitti pysyy käytössä.

---

## Opus 19.8.2026 — kapulanvaihto: aineisto luovutuspromptia varten

Kreditit loppuvat, ja omistaja kertoi että SINÄ kirjoitat
luovutuspromptin seuraavalle sessiolle. Tämä viesti on kirjoitettu
sitä varten: alla on se, mitä promptiin kannattaa laittaa, ja
erikseen ne päätökset, jotka ovat sinun eivätkä minun.

Koko tilanne on tiedostossa
**docs/arkisto/kapulanvaihto-2026-08-19-opus.md**. Älä toista sitä
promptissa vaan viittaa siihen — se on pitkä ja sen lukeminen on
uuden session ensimmäinen työ.

### 1. Missä työ on nyt

- Haara `claude/kaupunkilehti-istanbul-4e5pif`, versiot **v930–v934**:
  Petra, Kappadokia, Persepolis, Jerusalem, Siinai. Kaikki
  committoitu ja pushattu, työpuu puhdas, portit vihreät.
- **PR:ää ei ole avattu** ja `origin/main` on yhä v929.
- Lähi-idän kahdeksasta lehdettömästä kohteesta viisi on tehty.

### 2. Mitä promptissa pitää ehdottomasti sanoa

Nämä kolme ovat sellaisia, että ilman niitä uusi sessio tekee
varmasti virheen:

1. **Versionosto tehdään käsin**, kunnes v930–v934 on mainissa.
   `tools/uusi-versio.mjs` lukee vain mainia (v929) eikä tiedä haaran
   versioista, joten se ehdottaa v930:tä uudelleen ja kaatuu omaan
   tuplavahtiinsa. Käsin nostetaan kolmeen paikkaan: sw.js CACHE,
   js/main.js APP_VERSION ja js/muutokset.js:n kärki.
2. **Agenttien faktapohjia ei saa käyttää tarkistamatta.** Yön aikana
   niistä löytyi kolme virhettä, joista yksi olisi tuonut lehteen
   pelin linjan vastaisen väkivaltamaininnan (Montefioren mylly,
   Jerusalem) ja yksi oli agentin itsensä keksimä luku. Tallennetut
   faktapohjat `docs/arkisto/faktapohja-*.md` kantavat tämän
   varoituksen, mutta se kannattaa sanoa myös promptissa.
3. **Ruba al-Khalia ei voi kirjoittaa ennen Wabar-ratkaisua**, ks.
   kohta 4 alla.

### 3. Työjärjestys, jota ehdotan

Omistajan linjaus on: Lähi-itä valmiiksi, sitten Aasia. Lähi-idässä
on kuitenkin kahdenlaista työtä jäljellä, ja niiden järjestys on
sinun päätettävissäsi:

- **A. Kolme lehdetöntä kohdetta:** Medina, Mekka, Ruba al-Khali.
  Faktapohjat ovat valmiina repossa, joten näissä pääsee suoraan
  kuviin ja kirjoittamiseen. Nopein tie eteenpäin.
- **B. Kuusitoista lehteä, joilta puuttuu avauskuvat ja matkaopas:**
  ankara, nikosia, izmir, halab, damaskos, luxor, riad, sana, aden,
  salalah, masqat, doha, kuwait, mosul, tabriz, isfahan. Tämä on
  määrällisesti isompi urakka kuin A.

Suositukseni: A ensin, koska aineisto on jo koottu ja kolme lehteä
syntyy nopeasti. Mutta B on se, mikä oikeasti ratkaisee onko Lähi-itä
"valmis" — päätä sinä, kumpi menee promptiin ensin.

### 4. Päätökset, jotka ovat sinun

1. **Wabarin meteoriitin paino.** Riadin lehden nostossa lukee museon
   kyltin mukaan 2,2 / 2,75 tonnia; en-Wikipedian *Wabar craters*
   sanoo suurimman kappaleen olevan 2 045 kg. Kyse on pelin sisäisestä
   ristiriidasta eikä pelkästä lähdevirheestä. Vaihtoehdot: (a) korjaa
   Riadin nosto, (b) kirjoita ero auki lukijalle kuten Kaymaklın
   ajoituksessa ja Katariinanvuoren korkeudessa on tehty, (c) jätä
   Wabar kokonaan pois Ruba al-Khalin lehdestä. En tehnyt tätä
   päätöstä puolestasi.
2. **Persepoliksen kohdekartta.** Se jäi tekemättä, koska Overpass oli
   alhaalla — ei sisällöllisestä syystä. Lisätäänkö jälkikäteen omana
   versionaan vai jätetäänkö lehti kartattomaksi?
3. **Avataanko PR v930–v934:lle** ennen kuin uusi sessio aloittaa? Jos
   avataan, uusi sessio saa puhtaan version­numeroinnin heti.
4. **Ämpärikysymys** (edellinen osio tässä tiedostossa) odottaa yhä
   päätöstäsi. Se on nyt ajankohtaisempi, koska omistaja linjasi että
   Flickriä käytetään aina kun siellä on parempia kuvia — eli
   paikallisia kopioita syntyy jatkossakin.

### 5. Mitä promptiin EI tarvitse laittaa

Työtapa, apuskriptit ja ansat ovat kaikki kapulanvaihdossa ja
tiedostossa `docs/arkisto/lehtityon-apuskriptit.md`. Riittää että
prompti käskee lukemaan ne. Erityisesti kannattaa mainita, että
apuskriptien **uusintalogiikka** on niiden tärkein osa: sen puute oli
yön suurin yksittäinen virhelähde, ja se on nyt korjattu.

### 6. Yksi tekninen löydös, joka kannattaa viedä eteenpäin

`tools/piirra-kaupunkikartta.mjs`:ään lisättiin kaupunkikohtainen
lippu **`rauniokaupunki`**. Se nostaa polut ja raunioalueiden
reunaviivat asuinkadun vahvuuteen, ja sitä tarvitaan aina kun kartan
"kadut" ovat OSM:ssä jalankulkuteitä — Petrassa ja Jerusalemin
vanhassakaupungissa ilman sitä kuva oli lähes tyhjä paperi.
**Sama lippu korjaisi todennäköisesti Luxorin ongelman**, joka on
merkitty saman tiedoston luxor-kohtaan keskeneräiseksi 13.8.2026.
Tämä on halpa parannus, jos B-urakka aloitetaan.

---

## Uusi kuvalinjaus tuhoutuneille kaupungeille (omistaja 20.8.2026) — Raamattuun kirjattava

Omistajan linjaus lehtisessiolle: *"kyllä pitää olla uusia kuvia myös
ja selkeästi kertoa mistä johtuu. pitää muuttaa pelin linjausta."*
(Tausta: Mosulin lehdessä oli vain sotaa edeltäviä kuvia, koska vanha
linja kielsi 2010-luvun tuhojen näyttämisen.)

Ehdotettu Raamattu-rivi (osioon "Kuvat ja lähteet" tai "Rajaukset ja
turvalinjat"):

> TUHOUTUNEEN KAUPUNGIN NYKYKUVAT (omistaja 20.8.2026): sodassa tai
> katastrofissa vaurioituneesta kaupungista näytetään MYÖS tuoreita
> kuvia, vaikka niissä näkyisi vaurioita tai jälleenrakennusta — ja
> lehti KERTOO LUKIJALLE SELKEÄSTI, mistä kaupungin nykyilme johtuu.
> Tuho kerrotaan tapahtumana neutraalisti, ilman julmuuksien
> yksityiskohtia ja ilman osapuolikehystä; kuvateksti sanoo mitä
> kuvassa näkyy (rauniot, työmaa, uusi rakennus). Vanha "ei näytetä
> tuhoja" -käytäntö poistuu; edelleen EI näytetä taistelukuvia eikä
> uhreja.

PÄIVITYS: omistaja antoi lehtisessiolle päätoimittajan valtuudet
samana päivänä — linjaus on KIRJATTU Raamattuun (Kuvat ja lähteet)
ja Mosul/Halab/Damaskos päivitetään v948:ssa. Tämä merkintä jää
tiedoksi.

---

## Bittikarttakartta, vaiheet 2 ja 3 (Opus, 29.8.2026)

**Haara `claude/bittikartta-2`.** Vaihe 1 (v1324) poisti piikit muttei
perustasoa. Vaiheen 2 resepti oli RUUTUAVARUUDEN CANVAS. Se
rakennettiin, mitattiin — ja mittaus kaatoi sekä reseptin että sen
perustelun. Alla mitä mitattiin, mitä tilalle tehtiin ja mikä jää
Fablen päätettäväksi.

### 1. Ruutuavaruuden canvas on 8 kertaa hitaampi (mitattu)

Ruudun kokoinen, kuoren ULKOPUOLELLA elävä canvas, johon blitataan joka
kehyksellä vastasiirrolla — täsmälleen speksin mukaan. WebKit, Ateenan
syväzoom, HOLD-ele ±170 px, iPhone-mitat 390×844 dpr 3:

| | p50 | p95 | max |
| --- | --- | --- | --- |
| kooste kuoressa (vaihe 1) | **16 ms** | 113 | 348 |
| ruutucanvas, blitti joka kehys | **131 ms** | 175 | 253 |
| sama ilman per-kehys-blittiä | **16 ms** | 153 | 661 |
| blitin oma JS-hinta | 0,02 ms | | |

Syy ei ole blitissä vaan kompositorissa: kuoren `translate3d` on SIIRTO
(selain siirtää valmista kerrosta), mutta kuoren ulkopuolinen canvas ei
voi siirtyä — sen sisältö on kirjoitettava uusiksi joka kehyksellä, ja
kirjoitus mitätöi kerroksen. Sama tulos Chromium 4x:llä (Puolan
tiheikkö: p95 33,3 → 16,8 kun per-kehys-blitti otettiin pois).

### 2. Maalattava ala ei ole enää syy mihinkään (ablaatio)

Reseptin perustelu oli "lava on 4,6 ruudullista ja selain maalaa
canvaksesta koko pinnan". Se testattiin ablaatiolla, WebKit, sama ele:

| näkymä | p50 | p95 | yli 40 ms |
| --- | --- | --- | --- |
| täysi kartta + kooste | 16 | 139 | 29/173 |
| ilman kaupunkeja ja nimiä | 16 | 128 | 27/161 |
| ilman koko svg-sisältöä | 16 | 135 | 25/193 |
| **täysin tyhjä kartta** | **16** | **102** | **36/211** |
| pelkkä svg, ei canvasta | 16 | 101 | 38/205 |

Tyhjä kartta tökkii yhtä paljon kuin täysi. WebKitin käännöskohtien
~100 ms:n kehykset tulevat eleen omasta koneistosta, eivät kartan
maalauksesta. **Kartan piirtoa optimoimalla ei tästä eteenpäin saada
lisää** — seuraava mittaus pitäisi tehdä oikealla iOS-laitteella, ei
Playwrightin ohjelmistorenderöijällä.

### 3. Mitä tilalle tehtiin

* **Atominen vaihto.** Täysi kooste rakennetaan taustapuskuriin, ja
  vanha kooste jää ruudulle CSS-muunnoksella venytettynä. Ennen ruutu
  palasi täyden koosteen ajaksi svg:lle — juuri sille hitaalle polulle,
  jota koko moduuli on olemassa välttämään. Omistajan linjaus
  *"tökkiminen on pahempi kuin pehmeä kuva"* toteutuu nyt kirjaimellisesti.
* **Kiinteät zoomtasot.** Nipistys napsahtaa portaikon tasoon
  (`napsautaTasoon`) eikä jätä vapaata kerrointa. Painikkeet ja nipistys
  ovat vihdoin samaa mieltä.
* **Sumennus pois** ja **kaikki näkyvissä alusta** (ks. 4).
* **Näkymärajaus kaikille**: käymättömien maiden datakerroksen paljastuminen
  toi lähikuvaan 600 solmua, ja `paivitaMaailmanRajaus` (ennen vain
  kehittäjän maailmanäkymässä) on nyt voimassa aina. Maailmanäkymän
  nipistyksen pitkät tehtävät 1036 → 392 ms.
* **`willReadFrequently` pois** koosteen kontekstista: se pakotti
  canvaksen ohjelmistolle, eikä tuotantopolulla ole yhtään
  getImageData-luentaa.

### 4. Omistajan kaksi linjausta toteutettu

* **Sumennuksesta luovuttu.** `fokusSumuPaalla()` palauttaa aina
  epätoden; koneisto jäi yhdeksi vaimennetuksi metodiksi
  (`paivitaFokusSumu`), joka on myös ainoa kohta, jota pitäisi muuttaa
  jos verho palaisi. Kahdeksan kutsupaikan purku olisi ollut isompi
  jälki kuin yksi ehto.
* **Kaikki näkyvissä alusta.** `.fokus-piilossa` ei enää koskaan asetu;
  luokka pyyhitään joka kierroksella (tallennuksesta palaava peli voi
  kantaa sitä). Maailmanappi jäi, mutta se ohjaa enää KAMERAN RAJAUSTA
  — ja se rajaus on vaiheen 3 zoomtasojen pohja (T0), joten sitä ei voi
  poistaa.

### 5. Mitä EI tehty, ja miksi

* **Merkkien täyspoltto koosteeseen.** Ablaatio (kohta 2) osoittaa,
  ettei merkeistä ole mitään saatavissa: niiden mitattu hinta on 11 ms,
  ja poltto vaatisi svg-piirtimen toisinnon canvakselle (tekstit,
  viivatyylit, maskit, zoomin mukana elävät maastonimet). Osumatestaus
  jäisi silti svg:hen, eli kerroksia tulisi lisää eikä vähemmän.
* **Fablemaxin tarkka portaikko** (kapea 5 tasoa suhteella 1,68, leveä
  4 tasoa suhteella 1,75). Nykyinen portaikko (`zoomiTasot`) on
  jaettu zoomipainikkeiden, saapumisportaan ja fokusikkunan pohjan
  kesken; sen korvaaminen on oma testattava muutoksensa. Nykyinen
  portaikko antaa fokusnäkymässä Kreikan ikkunasta maksimiin
  6 tasoa suhteella 1,5 — käytännössä sama tiheys kuin speksin 5 × 1,68.
  **Päätös Fablelle:** tehdäänkö tarkka portaikko omana eränään?
* **Vaihe 4 (laattapyramidi)** kokonaan. Se on myös se, joka poistaisi
  kehittäjän maailmanäkymän svg-poikkeuksen: siellä lavalla on 25 lehteä
  eikä koko lavan koostetta kannata rakentaa (mitattu uudelleen vaiheiden
  2–3 jälkeen: 1036 ms rajaa 750 vastaan).

### 6. Raamattuun (vain Fable kirjoittaa)

> **BITTIKARTTAKARTTA, MITATTU RAJA (29.8.2026).** Kartan pohja
> koostetaan yhdeksi bittikartaksi karttakuoreen, ja kuoren oma
> `translate3d` siirtää sitä. Ruutuavaruudessa elävää canvasta EI
> tehdä: se mitattiin kahdeksan kertaa hitaammaksi, koska kuoren
> ulkopuolinen canvas ei voi siirtyä kompositorilla. Kartan
> maalattava ala ei ole enää kehyksen kustannus — tyhjä kartta tökkii
> WebKitissä yhtä paljon kuin täysi — joten seuraava mittaus tehdään
> oikealla laitteella eikä emulaattorilla.

> **KIINTEÄT ZOOMTASOT (29.8.2026).** Nipistys päättyy aina portaikon
> tasoon, ei vapaaseen kertoimeen: mittakaavoja on kourallinen, ja
> sama taso palaa uudestaan. Portaikon pohja fokusnäkymässä on maan
> ikkuna ruudulle.

## Atlaskehys maailman yleislehteen (29.8.2026, PR #1770)

Omistajan kysymys maailman yleiskuvasta — *"ei näy sitä kartan
reunapaperia ja lisämerkintöjä?"* — on toteutettu. Lehti on ämpärissä
patinoituna ja pelipuolen pari odottaa mergeä PR:ssä #1770 (v1333).

**Mitä lehteen poltettiin.** Kermanvalkoinen paperimarginaali laudan
ylä- ja alapuolelle, ohut kaksoisviivakehys kartta-alan reunassa,
kartussi MATKAKIRJA / *Unohdettu aarre* kaiverrustyylisenä
kulmakoristein, mittakaavajana ja painajanrivi *"Painettu Matkakirjan
kustantamossa MDCCCLXXIII"* + huomaamaton © Matkakirja
alamarginaaliin, sekä kompassiruusu eteläiselle Tyynellemerelle kartan
sisään.

**Yksi poikkeama tilauksesta, ja se on rakenteellinen.** Tilaus sanoi
"paperimarginaali reunoilla". Marginaali on nyt VAIN ylhäällä ja
alhaalla. Lauta on kiertävä: peli toistaa kartan laudan leveyden
päässä (js/ui.js kiertoKohdat) ja rajaa loitonnuksen niin, ettei sama
paikka näy kahdesti (js/kartta.js rajaaSkaala) — vaakasuunnassa laudan
reunaa ei ole missään zoomissa, ja pystysuora marginaali piirtyisi
kermaisena kaistaleena keskelle Tyyntämerta. Samasta syystä lehden
reunahäivytys on alusta asti ollut vain ylä- ja alareunassa. Siksi myös
kulmakoristeet ovat kartussin kulmissa: kehyksellä itsellään ei
kiertävällä laudalla ole kulmia. Jos omistaja haluaa kehyksen myös
sivuille, se tarkoittaa laudan kierron katkaisemista uloimmalla
tasolla — erillinen päätös, ei tämän erän asia.

**Liikerajaus ei tarvinnut muutosta.** Mitattu selaimessa koko lauta
ruudulle ajettuna: 1920 x 1080 näyttää laudan ylä- ja alapuolelta 371
lautayksikköä (198 kuvapikseliä), 1180 x 820 koko marginaalin ja arkin
reunan, puhelin moninkertaisesti. Kaikki kalusteet mahtuvat 198
kuvapikselin sisään reunaviivasta, joten ne näkyvät jo nykyisillä
zoomirajoilla — ja katoavat itsestään lähemmäs zoomattaessa.

**Kaksi asiaa Raamattuun / patinan omistajalle:**

1. Marginaalin kerma on lämpimämpi kuin tilauksen rgb(245,237,214).
   Patinapassin merimaski (tools/patina.mjs VESIVIIVOITUS ja SYVYYS,
   `kromaVali: [34, 44]`) lukee mereksi jokaisen vaalean pinnan, jonka
   kroma jää alle 44:n. Kerman kroma 31 tarkoitti, että passi veti
   marginaaliin rantaviivat kartussin kirjainten ja mittajanan
   palkkien ympärille. Kroma 48 nostaa marginaalin maskin yläpuolelle.
   Sama koskee kartussin laikkua ja mittajanan vaaleita ruutuja.
   tools/patina.mjs itseään ei koskettu — mutta jos joku joskus
   säätää kromaVali-arvoja, tämä kytkös on syytä muistaa.
2. vie-fokus.yml jätettiin AJAMATTA tarkoituksella. Se synkkaa koko
   julisteet/fokus-kansion patinoimattomina pohjina, ja tuore checkout
   antaa jokaiselle tiedostolle uuden aikaleiman — ajo palauttaisi 134
   muuta lehteä patinoimattomiksi (työnkulun oma varoitus). patinoi-
   fokus.yml lukee pohjat suoraan vientihaaralta, joten se riittää
   yksin: ajo 33276439113 (maat: MAAILMA) meni läpi kahdessa
   minuutissa ja R2:sta ladattu MAAILMA.webp on 6400 x 3351 kehyksineen.

**Havainto ohimennen, ei korjattu:** tools/savuke-atlas.mjs kaatuu
tässä konttiympäristössä myös muuttamattomasta origin/mainista
(`loitonna`, TypeError undefined '.x'; kohdemaan lehti ei ilmesty
kartalle). Ei siis tästä erästä — mutta savuke ei tällä hetkellä
vartioi mitään.
