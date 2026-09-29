# Radioiden maailmanlaajennus — 28.9.2026

Omistajan sanatarkka linjaus (28.9.2026): "haluan että on kaikki maailman
maat mukana. eurooppa linjaus on vain kartan ja sisällön suhteen mutta ei
koske linssejä." Tehty Linssiseppä 2:n Sonnet-ali-agenttina haarassa
`linssiseppa2-radiot-maailma`, ei pushattu.

## Maiden määrä

- Ennen: 110 maata (`tools/radiot.json`).
- Jälkeen: **182 maata** — YK:n 193 jäsentä + Vatikaani, Palestiina, Kosovo,
  Taiwan (197 kohdetta) + pelin ylimääräiset alueet (HKG, SHN, GRL), joista
  18 jäi ilman toimivaa https-asemaa (ks. alla).
- Radio-kokoelma (`kokoelmat/radiot.json`) ei ole enää osajoukko
  kokoelmasta `maat` (laudan `countryShapes`): 50 uutta maata (esim. AND,
  VAT, BEN, KIR, PLW…) ei ole millään laudalla, koska VAIN EUROOPPA
  -rajaus koskee vain karttageometriaa. `tools/vienti/kokoelmat.mjs`
  `radioKokoelma`:n viittaus `{ iso3: 'maat' }` poistettiin ja korvattiin
  selittävällä kuvaustekstillä.

## Luokkajakauma (`tools/vienti/radioluokat.json`)

- epaselva: 165 (98 alkuperäistä + 67 uutta — kaikki uudet on merkitty
  varovaisuudesta epäselviksi, koska asemakohtaisia käyttöehtoja ei ole
  tutkittu yksi kerrallaan; ei arvattu "sallittu").
- kielletty: 17 (ennallaan — samat 17 maata joilla on korvaava asema
  `tools/vienti/radiokorvaavat.json`:ssa; vientiketju ei koskaan näytä
  näitä "kielletty"-asemia, vain korvaavan).
- sallittu: 0 alkuperäisillä radiot.json-asemilla (kuten ennenkin — luokka
  "sallittu" esiintyy vain korvaavien asemien tiedostossa).

## Puuttuvat maat (18) — ei toimivaa https-audiovirtaa löytynyt

Tutkittu radio-browser-hakemisto (koko maa- ja nimihaku) sekä
verkkohaku asemien omille sivuille; mitään osoitetta ei keksitty.

| Maa | Syy |
|---|---|
| BWA Botswana | Ainoat asemat (DumaFM, Gabz FM, Yarona FM) vain http; https epäonnistui kaikilla. |
| COM Komorit | Radio Domoni Inter vain http; https epäonnistui. |
| GAB Gabon | Ainoa oikea asema (EBEN Radio) vain http; https epäonnistui. |
| GMB Gambia | Ei yhtään asemaa hakemistossa; GRTS:n striimiosoitetta ei löytynyt julkisesta sivusta. |
| LSO Lesotho | Ei asemaa hakemistossa; LNBS/Ultimate Radio -sivuilla ei suoraa striimiä. |
| MRT Mauritania | Radio Mauritanie löytyy vain TuneIn/Zeno-välityksellä, ei suoraa osoitetta. |
| STP São Tomé ja Príncipe | Hakemistossa vain väärin merkitty Koraani-kanava. |
| SYC Seychellit | Virallinen SBC on vain HLS (m3u8, kielletty); muut osumat yhteismitattomia geneerisiä asemia (sama URL kuin MHL:llä). |
| BTN Bhutan | Ei asemaa hakemistossa; BBS:n striimiä ei löytynyt. |
| TJK Tadžikistan | Asia-Plus löytyi (TuneIn), mutta vain http-portti; https epäonnistui. |
| FSM Mikronesia | Ei asemaa. |
| NRU Nauru | Ei asemaa. |
| TUV Tuvalu | Ei asemaa. |
| WSM Samoa | 0 asemaa koko radio-browser-hakemistossa maakoodilla WS. |
| TKM Turkmenistan | Ainoa "osuma" (Uğur Öztürk) on väärin merkitty turkkilainen asema, ei oikeasti Turkmenistanista. |
| MHL Marshallinsaaret | Vain geneerinen "Offshore Radio" (sama URL kuin Seychellien kohdalla) — ei maakohtainen, joten hylätty. |
| DJI Djibouti | Ei asemaa hakemistossa; RTD:n omalla sivulla ei suoraa striimiosoitetta. |
| SWZ Eswatini | Ei asemaa hakemistossa; EBIS:n oma soitin (radio12345.com) ei paljasta suoraa osoitetta. |

Näille ei ole riviä `tools/radiot.json`:ssa eikä `tools/vienti/radioluokat.json`:ssa — ei keksitty osoitteita.

## Huomiota vaativat valinnat (asema löytyi mutta ei maan virallinen yleisradio)

Moni pieni maa sai radio-browser-hakemistosta vain kaupallisen tai
yhteisöaseman, koska maan yleisradiolla ei ole suoraa striimiä tai se on
vain HLS/http. Näissä `virallinen: false` ja peruste on aseman nimessä;
merkittävimmät: RWA (MENYA FM, ei virallinen RBA:n http-only-syystä), BDI
(Heaven FM), CAF (Radio Ndeke Luka — tunnettu riippumaton uutisasema),
NER (Wadata Radio), ERI (musiikkikanava, ei puheasemaa saatavilla), GNQ
(Exa FM), BGD (Radio Shadhin). KNA (ZIZ Radio) ja KGZ (Birinchi
Radio/UTRK) ja PRK (Voice of Korea) ovat sen sijaan maan virallisia
yleisradioita ja merkitty `virallinen: true`.

## Asemien kaupunki ja koordinaatit (uusi kenttä kaikille 182 maalle)

Jokaiselle `tools/radiot.json`-riville (myös 110 alkuperäiselle) lisättiin
`kaupunki` (suomenkielinen/vakiintunut nimi), `lat`, `lon` (2 desimaalia).
Lähde: Wikidata P36 (maan pääkaupunki) + P625 (koordinaatit), haettu yhdellä
SPARQL-kyselyllä kaikille maille kerralla; 3 poikkeusta (HKG, SDS, XKX)
haettu erikseen QID:llä koska niillä ei ole ISO-3166 P298-arvoa
Wikidatassa. Käsin korjattu: NOR (kyselyn label-palvelu palautti QID:n),
GNQ (Wikidatan uusi pääkaupunki "Ciudad de la Paz" korvattu toimivalla
Malabolla), MEX ("México" → "Mexico"), ZAF/PAK/BOL/YEM/PSE (useampi P36-arvo,
valittu Kapkaupunki/Islamabad/La Paz/Sanaa/Ramallah). Tämä korvaa
aluenimen (Sahara, Kamerun, Kongo, Islanti, Angola…) aseman sijaintina
kartalla — `tools/vienti/paakaupungit.mjs`:n kommentissa mainittu ongelma.

## Muuttuneet tiedostot

- `tools/radiot.json` — 182 maata, jokaisella `kaupunki`/`lat`/`lon`.
- `tools/hae-radiot.mjs` — ISO2-taulukkoon 90 uutta maakoodia, YKKOSRADIO-hakupatterit ~50 maalle.
- `tools/kirjoita-radiot.mjs` — kirjoittaa nyt myös `kaupunki`/`lat`/`lon` `js/packs/radiot.js`:ään.
- `js/packs/radiot.js` — generoitu uudelleen (182 maata, 94 virallista).
- `tools/vienti/kokoelmat.mjs` — `radioKokoelma`: lat/lon-kentät molempiin haaroihin (alkuperäinen + korvaava), `{ iso3: 'maat' }`-viittaus poistettu ja korvattu selityksellä.
- `tools/vienti/radioluokat.json` — 67 uutta maata, kaikki `epaselva`.
- `tools/vienti/skeemasopimus.mjs` — uusi skeemaversio 1.58: `radiot.kaupunki`, `radiot.lat`, `radiot.lon`.
- `tools/vienti/vie-sisalto.mjs` — `SKEEMAVERSIO_TARKKA` 1.57 → 1.58.
- `tools/vienti/skeemakentat.json` — päivitetty `--paivita`-ajolla (uusi tiiviste 1.58:lle).

## Testit

- `node tools/kirjoita-radiot.mjs` — 182 maata, 94 virallista, ei hylättyjä.
- `node tools/vienti/vie-sisalto.mjs` (koko vienti, `dist/vienti`, ei committoitu) — onnistui, `radiot 182`.
- `node tools/vienti/skeemasopimus.mjs --paivita` — `1.58 = aee33ab3c2cba5aa`.
- `node --test tests/vienti.test.mjs` — 12/12 ok.
- `node --test tests/sisaltopaketti.test.mjs` — 89/89 ok (mm. "skeema 1.16: radiot luokittain ja viritysäänet", "skeema 1.4: saapumishaut...radioMaalle").
- `node --test tests/vanha-maailma.test.mjs tests/pistenaytto.test.mjs tests/viritin.test.mjs tests/dokumentit.test.mjs` — 80/80 ok.
- `node --test tests/radio.test.mjs tests/radio-pallolla.test.mjs` — 19/19 ok.

Koko `node --test` -ajoa ei ajettu erikseen (repossa oli samaan aikaan
toinen, ilmeisesti Postivahdin/CI:n käynnistämä täysi ajo); yllä listatut
tiedostot kattavat kaikki radiot/vienti/skeema-viittaukset, jotka `grep`
löysi `tests/`-kansiosta.

## Mitä natiivin RadioAineisto.cs:n pitää lukea

`kokoelmat/radiot.json` (`alkiot[]`), per maa yksi rivi (`jarjestys: 1`):

```
{ id, iso3, nimi, url, tyyppi, yleisradio, lahde, sivu, luokka, peruste,
  perusteLahde, varaAani, kaupunki, lat, lon, toimii, tarkistus, kuvaus? }
```

`kaupunki` (string, suomeksi tai vakiintunut nimi), `lat`/`lon` (number,
asteina, 2 desimaalia) = aseman kotipaikka tai maan pääkaupunki — käytä
näitä kartan merkin sijaintina aluenimen sijaan. `lat`/`lon` voivat olla
`null`, jos maalla ei ole tietoa (ei pitäisi esiintyä enää, kaikilla 182
maalla on arvo). 18 maata (yllä oleva taulukko) ei ole `radiot.json`:ssa
lainkaan — natiivin on käytettävä varaäänitettä (`vanhat-aanet.js`) tai
piilotettava radionappi näiltä mailta, kuten ennenkin tehdään maille
joilta radio puuttuu.
