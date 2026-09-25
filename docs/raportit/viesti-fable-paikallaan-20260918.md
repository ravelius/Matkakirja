# Viesti Fablelle: liuskan tekstikoko ja kaikki paikallaan (18.9.2026)

Opus, haara `claude/bold-ride-vow4ki-paikallaan` (origin/main v1935 päältä,
ei versionostoa, ei PR:ää). Aloitus 18.9.2026 klo 07.03 Suomen aikaa,
mittaukset Mac Studiolla (Chromium 1234, dpr 2). Tehtävä: Raamattu
KARTTAUUDISTUKSEN PAATOKSET 34 kohta 13 a–c.

> Kohta 13 ei ollut `origin/main`in Raamatussa, vaan Fablen haarassa
> `origin/claude/bold-ride-vow4ki`. Luettu sieltä; Raamattuun ei koskettu.

## 1. a) Liuskan tekstikoko: mitattu ensin, vasta sitten korjattu

Omistaja: *"Teksteja ei nae puhelimella. Kaikki pitaisi olla samalla koolla
kuin karttaan poltetut tekstit."*

**Poltettua tekstiä ei voi lukea DOMista** — se on laatan rasterissa. Sen
ruutukoko on silti tiedossa yhdellä kaavalla: poltettu nimiö on kartan
mittaa `KARTTANIMI_KOOT.kohde` (8,5 px laudan paperissa), ja kartta on
ruudulla `nimenKarttakerroin`-kertaisena — sama kerroin, jolla kaupunkien
nimikyltit seuraavat karttaa. **Kohdemittaus** (kertakäyttöinen Playwright,
390 × 844 dpr 2, Pariisi, lähizoomi 0,34 uloimmasta):

| mitta | luku |
|---|---|
| kartan kerroin (`nimenKarttakerroin`) | **2,937** |
| POLTETTU nimiö ruudulla (8,5 px × kerroin) | **24,96 px** |
| PARIISI-nimi ruudulla (13,5 px × kerroin) | 39,65 px |
| liuskan rivi ruudulla (`NOSTON_MITTA` × 11) | **8,50 px** |

Liuskan rivi oli siis **alle kolmasosa** siitä poltetusta nimiöstä, jonka
vieressä se on. Juuri sen omistaja näki.

**Juurisyy on peritty sääntö, ei liuskan oma.** Poltettu muste on KARTAN
mitta ja kasvaa ruudulla kartan mukana; elävä nosto on PAATOKSET 32 kohdan
4 jälkeen ruutuvakio (*"yksi koko"*, `nostonKarttakerroin = 1`), ja liuska
peri sen, koska se piirretään kaupunkimerkin omaan elementtiin.

**Korjaus on sama funktio, ei uusi luku.** Liuskan rivin mitta on
`NOSTON_MITTA × nimenKarttakerroin(karttaskaala, vertailuskaala)` —
täsmälleen poltetun musteen kerroin. **Kartan merkit eivät muutu**: muutos
koskee vain liuskaa, joka ei ole kartan merkki vaan sen päälle avautuva
lista. Kaksi rajaa:

- **Katto on riviväli, ei PAATOKSET 31:n 16 px.** Rivit ovat
  `VIUHKAN_TIHEIN_VALI_PX` (26 px) päässä toisistaan, joten sitä isompi
  kirjasin menisi naapurirasterin päälle; päätöksen lause *"rivivali
  vastaavasti"* on juuri tämä. 16 px:n nimiökatto on KARTAN merkkien katto
  (ne peittivät kartan *"jattimaisina ja sumeina"*); liuskan rivi on listan
  sisällä eikä peitä muuta kuin oman pohjansa.
- **Rivi ei saa venyä ruudun yli.** Kolminkertaisella kirjasimella pisin
  nimi oli 246 px (ruutu 374 px) ja liuska loikkasi merkin VASEMMALLE
  puolelle — mitattu: vartiot 8j ja 8k punaisina. Rivin tila on nyt se,
  mikä jää merkin OIKEALLE puolelle kamera-ajon jälkeen (PAATOKSET 34
  kohta 12) miinus **pelinappulan vara**, lattiana puoli ruutua. Nappula
  seisoo pelaajan kaupungin merkin kyljessä ja on kova este, joka ei voi
  väistää: kun rivit veivät koko oikean laidan (levein 201 px), listalle ei
  jäänyt vapaata asentoa sen vierestä ja avattu kategoria jäi nappulan
  päälle (vartio 8j, ensin *Vrain-Lucas*, korjauskierroksen jälkeen
  *Kulttuuri ja ruoka (3)*). Säde kahdesti — listan oma etäisyys merkistä
  ja nappulan vara. Levein rivi 196,3 px, 8j ja 8k vihreitä.
- **Lukumäärä suluissa ei katkea.** Ensimmäinen katkaisu söi rivin lopusta
  ja *"Kadonneet ihmeet."*, *"Kauppa."*, *"Kulttuuri."* menettivät lukunsa
  (PAATOKSET 34 kohta 5). Häntä `(n)` irrotetaan nyt ensin, nimi lyhenee
  sen edestä ja häntä liitetään takaisin.

Mitattu korjauksen jälkeen: **rivit 25,0 px, poltettu 24,96 px** (13 riviä,
ero ≤ 0,05 px). Kaappaus: `docs/raportit/kuvat/paikallaan-20260918/liuska-auki-390.png`
(390 px, Skandaalit auki).

## 2. b) Kaupungin iso nimi: kaksi sääntöä kumottu nimeltä

Omistaja: *"Saisiko Pariisin ison nimitekstin pysymaan paikallaan vaikka
zoomaa tai panoroi."* — *"ruudun reuna ei pura lukkoa (nimi saa
leikkautua), pelimerkki ei pura lukkoa"*.

**Kumotut säännöt** (`js/pallolauta/nimet.js`, osio LUKKO EI PURKAUDU
VEDOSSA EIKÄ ZOOMISSA):

1. **RUUDUN REUNA PURKAA LUKON** (14.9.2026). Lukittu nimi jätettiin
   lukkonsa ulkopuolelle heti, kun sen laatikko ei mahtunut ruutuun, ja
   ladonta valitsi sille uuden kyljen — ja lisäksi reunapudotus poisti sen
   listalta. **Juuri se on se, minkä pelaaja näkee panoroidessa:** PARIISI
   on saapumisessa nimen omalla kyljellä, ja kun veto tuo kaupungin ruudun
   laitaa kohti, kyltti loikkaa toiselle puolelle. Nyt lukittu nimi ei
   putoa reunalta eikä vaihda kylkeä; se saa leikkautua. Sääntö rajaa
   itsensä: pisteen on oltava ruudulla (`NIMEN_REUNAVARA_PX` 0), joten nimi
   ei voi leikkautua enempää kuin oman mittansa verran, ja kun kaupunki
   poistuu ruudulta, nimi putoaa ladonnasta ja lukko vapautuu.
2. **PELIMERKKI PURKAA LUKON KERRAN KUTAKIN KOKOONPANOA KOHDEN**
   (18.9.2026 aamuyöllä, edellinen erä). Purku ratkaistiin leikkaustestillä,
   jonka kaksi puolta luetaan eri kehyksestä (lukon laatikko tämän kehyksen
   kamerasta, nappulan laatikko edellisen kehyksen DOM-paikasta; vedossa ero
   4,7 px / 40 ms). Testi on veitsenterällä kumpaan suuntaan tahansa —
   **ainoa vakaa vastaus on olla kysymättä.** Nappula on nyt este VAIN sille
   ladonnalle, joka SYNNYTTÄÄ lukon: `ladoRuutunimet` varaa pelimerkit ennen
   ensimmäistäkään nimeä, joten jokainen tuore sijoitus väistää sen oikein.

Mukana poistuivat `lado`n parametrit `levossa` ja `pinojenAvain`, lukon
kenttä `pinoAvain` ja `lauta.js`:n `liikkeenLadonta`-lippu: liikkeen ja
levon ladonta ovat nyt sama ajo.

**Testilukot** (`tests/pallonimikyltti.test.mjs`):

- Vartio 8 kirjoitettu uusiksi: *"pelimerkki ei pura lukkoa, mutta tuore
  ladonta väistää sen"*. Kaksiosainen, jotta se mittaa myös sen, ettei
  nappulan väistö kadonnut mukana — **vastakoe**: sama pelimerkki ilman
  lukkoa (oma ympäristö) antaa eri sijoituksen. Ilman sitä vartio menisi
  läpi myös, jos nappula olisi lakannut olemasta este (PAATOKSET 32 k. 5
  rikkoutuisi hiljaa).
- Vartio 9 (uusi): *"ruudun reuna ei pura lukkoa eikä pudota lukittua
  nimeä"* — veto ruudun laitaan, nimen laatikko leikkautuu (x0 < 0 tai
  x1 > W) ja sijoitus on sama.
- `tests/pallonimet.test.mjs` päivitetty: `liikkeenLadonta` ja `levossa:`
  ovat poistuneet `lauta.js`:stä, ja testi vaatii sen.

## 3. c) Nostot ja nimiöt paikallaan: sovittelu ratkaistaan kerran

**Juurisyy: sovittelu ajettiin joka ladonnassa.** `ladoLevossa` kutsuu
`nostot.sovittele`a jokaisella ladonnalla — myös niillä viidellä
sekunnissa, jotka ajetaan kesken vedon — ja `sovitteleLaput` ratkaisee
kyljen ja siirron uudestaan sitä vasten, mitä juuri sillä hetkellä on
tiellä. Kaupungin nimi, pelinappula ja naapurilaput liikkuvat ruudulla
vedossa ja kasvavat zoomissa, joten sama nimiö vaihtoi kylkeä kesken vedon.
Sama ilmiö kuin kaupunkien nimillä ennen niiden lukkoa, eri kerroksessa.

**Lääke on sama kuin nimillä: ratkaise kerran, kanna eteenpäin.**

- Sovittelu ajetaan vain, kun lappujoukko (nostot + niiden nimiöiden
  näkyvyys) tai **ruudun koko** vaihtuu. Veto ja zoomi eivät kumpaakaan
  muuta. Ruutukoko on avaimessa, koska kääntö vaihtaa sen, mitä laidalle
  mahtuu — sama raja kuin ankkurivaraston tunnuksella.
- Tulos talletetaan (`sovitellutAsennot`) ja luetaan takaisin datumeihin
  heti ladonnan alussa. Ilman tätä kylki putoaisi takaisin merkin omaan
  kylkeen joka ladonnalla, koska datumit rakennetaan datasta.
- **Avain luetaan riviltä, ei datumista.** Sovittelu kirjoittaa
  `nimioNakyy`-piilotuksen datumiin; jos avain lukisi sen, jokainen
  piilotus muuttaisi avainta ja pakottaisi uuden sovittelun. Sama ansa on
  jo kirjattu `omatLaatikot`issa.

## 4. Mittaukset (yksi ajo kutakin väitettä kohti)

**`savuke-pariisi-lahizoom.mjs`, 390 px — 35/35 vartiota läpi** (ennen
tätä erää 31/35: 8j, 8k ja uudet 8m, 8n punaisina).

Uudet vartiot:

| vartio | väite | tulos |
|---|---|---|
| 8l | liuskan rivin fonttikoko = poltetun nimiön ruutukoko ±1 px | OK (25,0 vs. 24,96 px) |
| 8l2 | levein liuskan rivi mahtuu kotelon leveyteen | OK (196,3 / 374 px) |
| 8m | ruutuvektori merkistä nimiöön sama vedon (−60, +60 px) yli ±1 px | OK (0,00 px) |
| 8n | zoomi ei vaihda nimiön kylkeä (etumerkki säilyy) | OK (0 kääntyi) |

**8m:n mittari korjattiin ennen väitettä.** Ensimmäinen versio luki
ankkurin elementin omasta laatikosta (`getBoundingClientRect`), joka kattaa
nimiön ja liikkuu sen mukana — se antoi 41,96 px:n *"siirron"* vain siksi,
että se vertasi nimiötä itseensä. Ankkuri luetaan nyt kerrokselta
(`pallolauta.ruudulla`), samasta luvusta kuin ladonta ja osumatesti.

**INFO ja rajoite:** 8m/8n vertaili 390 px:llä vain yhtä merkkiä
(`nimi:pariisi`). Pariisin omat nostot ovat PAATOKSET 34:n jälkeen
liuskassa eivätkä kartalla, ja kartalle jääneillä ulkopuolisilla
(Versailles, Chartres, Chambord) ei tässä näkymässä ollut nimiötekstiä.
Väite kattaa siis kohdan 13 b (PARIISI) vahvasti ja kohdan 13 c vain
välillisesti; **kattavampi mittaus kuuluu 1400 px:lle tai kaupunkiin,
jolla on kartalla nimiöllisiä nostoja — Fablelle seuraavaan erään.**

**`savuke-nimikyltti.mjs` — 58/60 läpi** (ennen 54/62). Vartiot 1 ja 2
(ero x/y vedon yli) pysyivät vihreinä, ja **7a/7b vihertyivät kaikilla
kaupungeilla**, myös Venetsiassa ja Firenzessä, jotka olivat edellisen
erän raportissa punaisia (*"kylki vaihtuu zoomin yli kaupungeissa, joiden
nimi on ruudun laidalla"*) — juuri se oli kumotun reunasäännön oire.

Ainoa punainen on **vartio 4** (*"kyltti / maapaneelin teksti sama
zoomista riippumatta"*, hajonta 50,30 % molemmilla ruuduilla). Se on
edellisen erän raportin luvussa 4 kirjattu löydös eikä liity tähän erään:
maapaneelin leipäteksti on ruutuvakio, kyltti kartan mitta. **Ei koskettu.**

## 5. Muu

- `node --test tests/*.test.mjs`: 3608/3608 läpi (13 skipattua).
- `node tools/build-standalone.mjs` ajettu ennen pushia.
- Ei koskettu Raamattuun, `sarjat.json`iin, `js/linssit/`-kansioon,
  `js/fokusvirta.js`:ään eikä nostojen sisältöteksteihin.
- Ei versionostoa, ei PR:ää (AGENTIT TARKENNUS 8). **Vaatii versionoston.**
