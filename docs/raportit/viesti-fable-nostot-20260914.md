# Viesti Fablelle: karttanostot — klikkaus toimii, muiden maiden nostot piiloon

Omistajan palaute 14.9.2026 (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 12, kohdat
3 ja 6), sanatarkasti: *"karttanostoja ei voi klikata ja niita pitaisi olla
enemman."* ja *"pystyyko muiden maiden karttanostoja piilottamaan helposti?"*

Kolme asiaa mitattu ja kaksi korjattu. **Ei versionostoa, ei muutoslokiriviä,
ei sisältömuutoksia** — tämä erä on osumareititys, lippu ja mittaus.

## 0. Lyhyesti

1. **Klikkaus oli oikeasti rikki.** Mitattuna Ranskan saapumisnäkymässä
   (Chromium 390 × 844, aito napautus jokaisen merkin omaan ruutupisteeseen)
   **8 Ranskan 20 merkistä avasi väärän kortin tai ei mitään**. Kaksi
   juurisyytä, kumpikin osumakilpailussa; molemmat korjattu.
2. **Nostoja EI piilota portti eikä raja.** Ranskan 20 merkkiä piirtyvät
   saapumisnäkymässä kaikki: 21 merkin katto ei purre (20 ≤ 21),
   lähizoomiportti piilottaa 0, `lahi`-lippua ei ole yhdelläkään kohteella.
   Vähäisyys on **sisällön sijoittelua**: 17 Ranskan 37 nostosta on
   tarkoituksella siirretty Pariisin ja Marseillen KOHDEKARTALLE.
3. **Muiden maiden nostot piiloon** — lippu `NAYTA_VAIN_KOHDEMAAN_NOSTOT`
   (oletus `true`). Ruudun napautettavat Ranskassa **114 → 36**. Mutta:
   naapurien muste on POLTETTU laattoihin eikä katoa ruudulta — lippu ottaa
   pois vain napautettavuuden. Se on velka, ks. luku 5.

## 1. Klikkauksen juurisyy — kaksi, molemmat mitattu

Mittaus: peli auki pallolaudalla Pariisissa, `saavu()`, ja jokaiselle
Ranskan omalle merkille aito napautus (`mouse.click` ja `touchscreen.tap`)
merkin OMAAN ruutupisteeseen ja sen NIMIÖN keskelle. Näkymä nollattiin ja
koordinaatit luettiin uudestaan ennen jokaista napautusta — kortin avaus
siirtää kameraa, ja ilman nollausta mittaus mittaa itseään.

### A) Tasapelin mitta oli nimiölaatikon keskipiste

`musteenVoittaja` (js/pallolauta/lauta.js) ratkaisi tasapelin sillä, kumman
**laatikon** keskipiste on lähempänä. Laatikko on kuvake + nimiö, joten
pitkänimisen merkin keski karkaa omasta kuvakkeestaan. Kun kaksi laatikkoa
peitti sormen (kumpikin etäisyys 0), voitti se, jonka NIMIÖ sattui olemaan
kohdalla — ei se, jonka KUVAKKEEN päällä sormi oli.

Mitattu Chartres (sormi Chartresin kuvakkeella 191, 405):

| merkki | laatikon keski sormesta | oma piste sormesta | voitti |
| --- | ---: | ---: | --- |
| Chartresin katedraali | 20 px | **0 px** | ei |
| Mont-Saint-Michel | **11 px** | 43 px | kyllä |

**Korjaus:** tasapelin mitta on nyt PIENEMPI kahdesta — etäisyys merkin omaan
ruutupisteeseen tai laatikon keskipisteeseen. Sormi merkin päällä voittaa
aina, ja pitkän nimiön ULKOPÄÄ on yhä osumaa (VIAT v1672 säilyy).
Kutsuja, joka ei anna merkin omaa pistettä, saa entisen säännön.

### B) Turisti-infon myönnytys oli ehdoton

`lahinMerkki` palautti turisti-infon aina, kun se oli lähin merkki 44 px:n
sisällä — myös silloin, kun sormi oli KOKONAAN toisen noston nimiön päällä.
Saapumisnäkymässä Pariisin seutu on yhden sormen kokoinen (mitattu
**6,7 km/px**, 390 px ruutu), joten Chambordin nimiön napautus avasi
turisti-infon.

**Korjaus:** myönnytys pätee yhä kaupungin nimimusteen yli (13.9.2026 mitattu
vika säilyy korjattuna), mutta ei noston OMAN musteen yli.

### Mittaustaulukko: 390 × 844, Ranskan saapumisnäkymä

| merkki | ENNEN, napautus kuvakkeeseen | ENNEN, napautus nimiöön | JÄLKEEN |
| --- | --- | --- | --- |
| chambord | chambord | **turisti-info** | oma kortti |
| millaun-silta | **pont-du-gard** | millaun-silta | oma kortti |
| avignonin-paavinpalatsi | **millaun-silta** | avignonin-paavinpalatsi | oma kortti |
| chartresin-katedraali | **mont-saint-michel** | chartresin-katedraali | oma kortti |
| pont-du-gard | **millaun-silta** | pont-du-gard | oma kortti |
| syvennys-marseille-cosquer | **carcassonne** | syvennys | oma kortti |
| syvennys-marseille-roquefavour | **eläintäky** | syvennys | oma kortti |
| skandaali-kaulanauhajuttu-1785 | **kaupunkietusivu** | skandaali | oma kortti |
| biskajanlahti | **ei mitään** (maapaneelin alla) | biskajanlahti | ks. sivuhavainto 1 |
| 11 muuta | oma kortti | oma kortti | oma kortti |

Kaksi merkkiä on kuvakkeellaan vanhemman, tarkoituksellisen säännön alla, ja
niiden NIMIÖ toimii molemmissa tapauksissa:

- **Biskajanlahti** — kuvake on maapaneelin (104 × 82 px, `pointer-events:
  auto`) alla, eikä napautus yllä palloon asti (sivuhavainto 1).
- **Kaulanauhajuttu** — kuvake on Pariisin kaupunkipisteen oman musteen
  päällä, ja *"sormi pisteen päällä tarkoittaa kaupunkia"* (omistaja
  9.9.2026). Kuvake avaa siis kaupungin etusivun tarkoituksella.

Hiiri ja kosketus antoivat joka kerta saman tuloksen — vika ei ollut
kosketuslaitteen oma.

## 2. Nostojen määrä Pariisissa — mitattu, ei arvattu

`node tools/tarkista-nostopaikat.mjs` -passilla ja pelin omalla portilla:

| mitta | Ranska (FRA) | josta Pariisin seutu |
| --- | ---: | ---: |
| nostorivejä datassa yhteensä | **37** | 25 |
| → siirretty KOHDEKARTALLE (kohdekartan piste kantaa `nosto`-linkkiä) | **17** | 16 |
| → pääkartalle jäävät | **20** | 9 |
| kaupunkiruuhkan katto (3 merkkiä / 8 yks) pudotti | **0** | 0 |
| `lahi: true` -kohteita | **0** | 0 |
| 21 merkin katto piilotti saapumisnäkymässä | **0** (20 ≤ 21) | 0 |
| lähizoomiportti piilotti (`portti().piiloon`) | **0** | 0 |
| piirtyy saapumisnäkymässä (mitattu selaimesta) | **20** | 9 |
| jää maapaneelin alle (kuvake) | **1** (Biskajanlahti) | 0 |
| jää kaupunkimerkin alle | 0 | 0 |
| Pariisin kohdekartan pisteitä / joilla nosto | — | **31 / 21** |
| Marseillen kohdekartan pisteitä / joilla nosto | — | 6 / 1 |

**Vastaus omistajan kohtaan 3(b): vähäisyys EI ole portin eikä rajan
seurausta.** Yksikään portti ei piilota Ranskassa yhtäkään merkkiä
saapumisnäkymässä, joten **kynnysarvoa, jolla ne tulisivat näkyviin, ei ole
olemassa** — ei ole mitään piilotettua, jonka voisi päästää läpi.

Vähäisyys tulee kahdesta tietoisesta päätöksestä:

1. **Kaupungin kohdalla olevat nostot eivät ole pääkartalla** (omistaja
   2.9.2026, kolmesti sanottuna). 16 Pariisin 25 nostosta on tämän säännön
   nojalla Pariisin kohdekartalla — ne eivät ole kadonneet, ne ovat
   kaupunkilehden sisällä. Pääkartalle jää Pariisin seudulta 9.
2. **Ranskan omaa maastosisältöä on 37 riviä**, mikä on maailman keskitasoa
   (GRC 33, TUR 29, DEU 28 ovat pääkarttarivejä katon jälkeen).

**Ehdotus Fablelle (EI toteutettu):** jos omistaja haluaa Ranskan
pääkartalle enemmän merkkejä, vipu on toinen kuin kynnys. Kaksi vaihtoehtoa,
kummastakin tarvitaan sinun sanasi:

- **(a) Sisältöä lisää.** Uusia Ranskan maastokohteita ja historian hetkiä
  pääkartalle — 20 → esim. 21 (katto) mahtuu ilman mitään porttimuutosta.
- **(b) Kohdekartan sääntöön poikkeus.** Osa Pariisin 16:sta palaisi myös
  pääkartalle (merkki kahdessa paikassa). Tämä on suoraan omistajan
  2.9.2026 linjausta vastaan, joten sitä ei tehdä ilman hänen sanaansa.

## 3. Muiden maiden nostot piiloon

Lippu `NAYTA_VAIN_KOHDEMAAN_NOSTOT` (js/pallolauta/nostot.js, oletus `true`)
jättää `naapurienPoltetutMerkit`-rivit pois. Kaupunkimerkit, aarre, reitit,
kohtaamispiste ja eläintäyt eivät kuulu lippuun.

### Ruudun merkkimäärä Ranskan saapumisnäkymässä (390 × 844, mitattu)

| | 390 × 844 ENNEN | 390 × 844 JÄLKEEN | 1400 × 900 ENNEN | 1400 × 900 JÄLKEEN |
| --- | ---: | ---: | ---: | ---: |
| napautettavia merkkejä ruudulla | **114** | **36** | **78** | **30** |
| — Ranskan omia | 20 | 20 | 20 | 20 |
| — naapurimaiden poltettuja | **78** | **0** | **48** | **0** |
| — eläintäkyjä (koko maanosa) | 16 | 16 | 10 | 10 |
| ELÄVIÄ H-merkkejä (DOM-elementtejä) | **7** | **7** | **7** | **7** |

**Vastakoe ajettu:** samassa näkymässä `naapurienPoltetutMerkit` palauttaa yhä
78 merkkiä (puhelin) ja 48 (työpöytä) — lippu (ei puuttuva data) on se, joka ne piilottaa. Lipun
kääntäminen `false`:ksi palauttaa ne osumalistalle.

### Mitkä jäävät, ja kuinka monta (luku 7:n polttovelka)

**Eläviä H-merkkejä oli ruudulla 7 ennen ja 7 jälkeen.** Kaikki 78 naapurin
merkkiä ovat POLTETTUJA laattoihin, joten lippu ei voi ottaa niiden mustetta
ruudulta — se ottaa pois vain **napautettavuuden**.

*Mitä tässä on mitattu ja mitä ei:* mitattu on osumalista (114 → 36) ja se,
että naapurien merkeistä yksikään ei ole elävä elementti. **Ei ole mitattu
pikseleittäin**, kuinka moni 78:sta on juuri tällä zoomilla oikeasti
näkyvissä — laattojen tarkkuustaso vaihtelee zoomin mukaan, ja mukana olevassa
kuvassa Ranskan saapumisnäkymässä nostomustetta näkyy vähän. Alla oleva
taulukko on siis se joukko, joka **menetti korttinsa**, ei todistettu joukko
näkyvää mustetta:

| maa | poltettuja merkkejä Ranskan saapumisnäkymässä |
| --- | ---: |
| Alankomaat (NLD) | 17 |
| Sveitsi (CHE) | 15 |
| Saksa (DEU) | 11 |
| Algeria (DZA) | 9 |
| Tunisia (TUN) | 8 |
| Italia (ITA) | 5 |
| Tanska (DNK) | 5 |
| Marokko (MAR) | 5 |
| Irlanti (IRL) | 3 |
| **yhteensä** | **78** |

Lisäksi 16 eläintäkyä (SWE, NOR, ISL, DNK, GBR, IRL, NLD, DEU, FRA, ESP, PRT,
CHE, AUT, MAR, DZA, TUN) — nekin poltettuja, eivätkä kuulu tähän lippuun.

### Se mitä lippu maksaa — sano tämä ääneen omistajalle

Naapurin poltettu muste sai napautuksensa takaisin 2.9.2026 (omistaja,
Bosnia: *"Dinara ja Sveti Jure eivät ole klikattavissa"*). **Lippu ottaa sen
uudestaan pois.** Kartalle jää siis 78 merkkiä, jotka näkyvät mutta eivät
avaa mitään, kunnes nostotaso poltetaan kohdemaakohtaisesti uudelleen
(`tools/tee-pallolaatat.mjs --nostot`, R2-ajo, ei tämä erä). Sama velka kuin
merkkirajan polttovelka (viesti-fable-merkkirajat-20260914.md luku 7).

Jos tämä ei ole se, mitä omistaja tarkoitti, lipun kääntäminen takaisin on
yhden rivin työ.

## 4. Mitä muutettiin

| tiedosto | muutos |
| --- | --- |
| `js/pallolauta/lauta.js` `musteenVoittaja` | tasapelin mitta: pienempi kahdesta (merkin oma ruutupiste / laatikon keski); uusi valinnainen `keski`-kenttä ehdokkaalla |
| `js/pallolauta/lauta.js` `musteeseenOsunut` | antaa ehdokkaalle merkin oman ruutupisteen (`keski: p`) |
| `js/pallolauta/lauta.js` `lahinMerkki` | turisti-infon myönnytys pätee kaupungin nimimusteen yli, ei noston oman musteen yli |
| `js/pallolauta/nostot.js` | uusi `NAYTA_VAIN_KOHDEMAAN_NOSTOT` (true) + portti `keraa`-funktiossa |
| `tests/osumareititys.test.mjs` | turisti-infon säännön muotoväite päivitetty (sääntö on yhä kaupunkisäännön jäljessä) |
| `tools/savukkeet/savuke-nostoklikkaus.mjs` | uusi savuke |

Sisältöön, nostoteksteihin, Raamattuun, versionumeroon, muutoslokiin,
kameraan, maapaneeliin, nimiin tai merkkeihin ei koskettu.

## 5. Testit ja portit

- `npm test` → **# pass 3355, # fail 0**. (Huom: `tests/pollo.test.mjs`
  "indeksi rakentuu" ja "haku on nopea" ovat aikamittareita, jotka punastuvat,
  jos koneella pyörii samaan aikaan selainajoja — mitattu 3 915 ms rajan
  3 000 ms yli. Hiljaisella koneella molemmat vihreitä.)
- `node tools/tarkista-kaksoisavaimet.mjs` → ei kaksoisavaimia
- `node tools/tarkista-niputus.mjs` → kunnossa
- `node tools/tarkista-savukkeet.mjs` → kunnossa
- `tools/savukkeet/savuke-nostoklikkaus.mjs` → **18/18 läpi** (ks. luku 6)

## 6. Savuke ja vastakokeet

`tools/savukkeet/savuke-nostoklikkaus.mjs`, ajettuna kahdella ruudulla
(390 × 844 ja 1400 × 900):

- **0.** tasapelin voittaa merkki, jonka omalla pisteellä sormi on
  (Chartresin mitattu asetelma Nodessa)
- **0b. VASTAKOE:** sama vertailu ILMAN merkin omaa pistettä palauttaa
  Mont-Saint-Michelin — vartio 0 mittaa siis juuri korjattua sääntöä
- **1–3.** jokainen näkyvä nosto avaa OMAN korttinsa: kuvakkeesta hiirellä,
  kuvakkeesta kosketuksella ja nimiön päältä. Oikea kortti tunnistetaan
  vertaamalla merkin OMAAN avaajaan (`napautaNosto(id)`) — syvennys- ja
  skandaalikerroksella ei ole tunnusta, joten savuke ei arvaa vaan kysyy
  laudalta. Kuvakevartioista ohitetaan maapaneelin ja kaupunkipisteen
  musteen alle jäävät kuvakkeet (INFO-rivi kertoo mitatun etäisyyden)
- **4.** muiden maiden nostoja ei ole osumalistalla (0)
- **4b. VASTAKOE:** `naapurienPoltetutMerkit` palauttaa samassa näkymässä
  78 merkkiä — lippu piilottaa, ei puuttuva data
- **5.** napautettavia on lipun kanssa vähemmän kuin ilman

Tulos: **18/18 läpi**. INFO-riveinä kirjataan kaksi kuvaketta, jotka toisen
säännön alle jäävät: Biskajanlahti maapaneelin alla, ja Kaulanauhajuttu
Pariisin kaupunkipisteen musteen päällä (mitattu **4,0 px** puhelimella ja
**11,2 px** työpöydällä). Kummankin NIMIÖ avaa noston, ja vartio 3 mittaa
sen.

**Käsin ajettava vastakoe säännölle B** (kirjattu, ei automaattinen):
palauta `lahinMerkki`in rivi muotoon
`if (voittaja?.laji === 'turistiinfo') return voittaja;` → Chambordin nimiön
napautus avaa taas turisti-infon.

Kuvat: `docs/raportit/kuvat/nostoklikkaus-390x844.jpg` ja
`nostoklikkaus-1400x900.jpg` (Ranskan saapumisnäkymä kummallakin ruudulla,
otettuna napautuskierroksen jälkeen — saapumistraileri peittää ruudun
ensimmäiset sekunnit).

## 7. Pelaajan merkki — mitattu, EI kadonnut (Fablen lisäkysymys)

Rantaviiva-agentti raportoi Kreikan saapumisnäkymästä: *"pelaajan merkkiä ei
löytynyt DOMista kummallakaan ruudulla (merkkejä 0)"*. **Mittasin uudestaan
neljässä näkymässä — merkki on joka kerta DOMissa ja näkyvissä:**

| näkymä | `.pallolauta-nappula` DOMissa | opacity | display | ruutupaikka |
| --- | --- | ---: | --- | --- |
| Pariisi 390 × 844 | kyllä | 1 | block | 207, 373 |
| Pariisi 1400 × 900 | kyllä | 1 | block | 722, 329 |
| Ateena 390 × 844 | kyllä | 1 | block | 189, 442 |
| Ateena 1400 × 900 | kyllä | 1 | block | 688, 464 |

Nappula näkyy myös mukana olevassa kuvassa (Ranskan saapumisnäkymä, tumma
nappula Loiren yläpuolella).

**Miksi mittaus näytti nollaa — arvattu juurisyy, ja se on mittarissa.**
Nappulan `getBoundingClientRect()` on **0 × 0 px** jokaisessa neljässä
näkymässä. Merkki on CSS2D-elementti, jonka oma `<svg>` on 1 × 1 px ja
`overflow: visible` — piirros vuotaa laatikon ulkopuolelle, täsmälleen kuten
nostojen nimilapuilla (siksi `js/pallolauta/nostot.js` laskee lappujen mitat
kaavasta eikä ruudulta, ks. `lappuLaatikot`). **Mittaus, joka etsii merkkejä
laatikon koon perusteella (`width > 0`) tai `merkit.laatikot()`-kutsulla,
saa nollan vaikka merkki on ruudulla.** Sama koskee
`js/pallolauta/merkit.js`:n omaa `laatikot(osa)`-funktiota, joka ohittaa
nimenomaan `!(r.width > 0)` -tapaukset.

**Ei ole tämän erän eikä nostojen vika.** Nappula on merkkikerroksen `peli`-osa
(`js/pallolauta/merkit.js` `paivita({ nappula, kohteet })`), jolla EI ole
merkkirajaa, lähizoomiporttia eikä `lahi`-lippua — v1867:n 21-raja ja tämän
erän lippu koskevat vain nostoja. Jos omistajan kuvakaappauksessa nappula on
liian pieni tai väärässä paikassa, se on **merkit.js:n koko ja asemointi** eli
nimikyltti-agentin työtä; en koskenut siihen.

Suositus nimikyltti- ja rantaviiva-agenteille: älä mittaa pallolaudan merkkien
olemassaoloa `getBoundingClientRect()`illa. Käytä valitsinta
(`document.querySelector('.pallolauta-nappula')`) tai kerroksen omaa dataa.

## 8. Sivuhavainnot (eivät tämän erän asioita)

1. **Maapaneeli syö kuvakkeen alleen.** Maapaneeli
   (`js/pallolauta/maapaneeli.js`, 104 × 82 px, `pointer-events: auto`) on
   Biskajanlahdella juuri Biskajanlahti-noston kuvakkeen päällä: napautus ei
   yllä palloon asti eikä avaa mitään. Nimiö on paneelin ulkopuolella ja
   toimii. Korjaus kuuluu maapaneelin omistajalle — joko paneelin paikka tai
   se, että paneelin läpi menevä napautus välitetään laudalle.
2. **Saapumisnäkymä ei ole sama joka ajolla.** Sama `saavu({ kesto: 0 })`
   antoi peräkkäisillä ajoilla näkyvän leveyden 570,8 (osuus uloimmasta
   0,957) ja 382,8 (0,641). Merkkimäärään se ei Ranskassa vaikuta (20
   kummallakin), mutta lähizoomiportti on toisessa auki ja toisessa kiinni.
   Kuuluu zoomin rajausta tekevälle agentille.
3. **Pariisin seutu on saapumisnäkymässä yhden sormen kokoinen** (mitattu
   6,7 km/px, 390 px ruutu): kaupunki, turisti-info, kohtaamispiste ja
   lähimmät nostot mahtuvat kaikki 44 px:n sormivaran sisälle. Osumasäännöt
   toimivat nyt, mutta tiheys on oma kysymyksensä.
4. **Eläintäyt ovat 16 merkkiä Ranskan ruudulla, kaikki muista maista paitsi
   yksi.** Jos omistajan "muiden maiden karttanostot" tarkoitti myös näitä,
   sano — ne ovat oma kerroksensa omalla portillaan, ja niiden piilotus on
   yhtä pieni muutos.
