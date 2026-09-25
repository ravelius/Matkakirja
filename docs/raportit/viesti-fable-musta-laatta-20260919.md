# Viesti Fablelle — MUSTA LAATTA PANOROITAESSA (19.9.2026)

Opus-kehityserä, Mac Studio, haara `claude/bold-ride-vow4ki-musta-laatta`.
Kellonajat Suomen aikaa. EI PR:ää, EI versionostoa, EI Raamattu-muutoksia.

## Tiivistelmä yhdellä rivillä

**Omistajan musta laatta EI TOISTUNUT** Mac Studion Playwright-ajossa
(WebKit ensisijaisena, Chromium vertailuna), mutta mittaus löysi
kartan alta pinnan, jonka väri on **täsmälleen RGB(0,0,0)** — ja se on
ainoa pinta, joka voi näkyä laatoituksen aukosta. Sen sävy on
vaihdettu kartan omaksi. Mittari on olemassa vartioimaan asiaa
jatkossa.

## 1. Löydös, josta lähdettiin

Omistaja 19.9.2026 klo 14.58, iPhone, tuotanto v1954, kuva Ranskan
pelinäkymästä Pariisi-zoomilla (sanatarkasti):

> *"Panoroidessa viela bugittaa hetkellisesti. Korjaantuu kylla mutta
> liikkeen aikana nain"*

Kuvassa Keski-Ranskaan, Vézelayn ja Lascaux'n väliin, ilmestyy yhden
laatan kokoinen **täysin musta suorakaide** (n. 230 × 260 px 390 px:n
ruudulla). Se häviää liikkeen päätyttyä.

## 2. Toisto: EI ONNISTUNUT — ja mitä yritettiin

Kaikki ajot: Ranskan pelinäkymä Pariisi-zoomilla (`?lauta=pallo`,
`saavu({ kesto: 0 })`), 390 × 844, ämpäri route-välityksellä, jokainen
laattapyyntö (`/z<z>/<sarake>/<rivi>.webp`) viivytettynä 300…800 ms.
Kaappaussarja 80 ms välein, mitta = suurin täysin musta (kaikki
kanavat < 10) suorakaide kartan alalla, histogrammipinolla.

| Ajo | Selain | dpr | Panorointi | Kehyksiä | Suurin musta |
| --- | --- | --- | --- | --- | --- |
| A | WebKit | 2 | kamera (`pointOfView`), 3 × 1,6° etelään | 54 | **0 × 0 px** |
| B | WebKit | 3 | AITO vetoele (`mouse.down/move/up`), 4 × 330 px | 56 | 24 × 24 px (ei kartalla — ks. alla) |
| C | WebKit | 2 | kamera + **aukkokoe**: joka 4. laattapyyntö kaadettu (78 kpl), moduulit `origin/main`ista | 54 | **0 × 0 px** |

Ajo C on tärkein kielteinen tulos: vaikka 78 laattaa jätettiin
saapumatta kokonaan, ruudulle ei tullut mustaa. Syy on se, että
kartalla on **kolme** peittävää kerrosta samalla alalla — kirjaston
laattamoottorin pohja (joka pitää karkeamman tason laatan näkyvissä,
kunnes tarkempi saapuu), pelin oma laattakerros (kohdemaan laatasto)
ja lepokerros — eikä yhden puuttuminen paljasta alla olevaa.
Mac Studion ja localhostin välillä laatta ehtii aina paikalle.

Ajo B:n 24 × 24 px on käyttöliittymän omaa mustaa (kaappaus kattaa
koko pallon kankaan suorakaiteen, jonka sisällä on myös pelin
elementtejä), ei kartan aukko: se on samassa kohdassa jokaisessa
ajossa, myös levossa ja myös korjauksen jälkeen.

**Kirjaan rehellisesti: en saanut omistajan oiretta ruudulle.**
Todennäköisin ero on verkko — omistajan iPhone oli mobiiliverkossa,
jossa yksittäisen laatan viive on eri luokkaa kuin route-välityksen
0,3…0,8 s, ja jossa pyyntö voi myös katketa kesken.

## 3. Mikä kerros mustan piirtäisi — mitattu

Luotain luki pelin oman scenen Pariisi-zoomilla (WebKit, 390 × 844
dpr 3) ja laski kaikki näkyvät verkot materiaaleineen. Kartan alla on
kaksi mustaa palloa:

| Mesh | Materiaali | Väri | Tekstuuri | Näkyvä? |
| --- | --- | --- | --- | --- |
| pallon oma pinta, säde 100 | MeshPhongMaterial | `000000` | ei | **EI** (laattatilassa `visible === false`) |
| **laattamoottorin pohjapallo, säde 99** | MeshBasicMaterial | `000000` | **ei** | **KYLLÄ** |

Muut näkyvät pinnat samassa näkymässä: 1 040 kirjaston laattaa
(256 × 256, läpinäkymätön), 63 pelin laattakerroksen laattaa
(512 × 512, läpinäkymätön), kalvot ja viivat.

**Laattamoottorin pohjapallo on ainoa pinta laattojen alla, ja sen
väri on puhdas musta.** globe.gl asettaa sen mustaksi, koska
laattatilassa pallon pinnan ei ole tarkoitus näkyä lainkaan. Tämä on
sama juuri kuin Astronautin kameran mustassa pallossa (Raamattu
ASTRONAUTIN KAMERA kohta 37, raportti viesti-fable-webkit-toisto-20260917):
globe.gl:n `Color(0)`.

Erittelykoe: sama pohjapallo värjättiin ajon ajaksi magentaksi ja
panorointi toistettiin — **magentaa ei näkynyt yhdessäkään
kehyksessä** (0 × 0 px). Eli pohjapallo ei paljastunut tässä
ympäristössä. Se että sen väri on musta, on silti mitattu tosiasia, ja
se on ainoa väri, joka aukosta voi tulla läpi.

Omistajan epäilyt 1 ja 2 eivät saaneet vahvistusta:
- **Epäily 1 (v1951:n AbortController-keskeytys):** ehto on
  `kerrokset.reliefi !== pyramidinReliefiKaytossa()`. Pelinäkymässä
  ilman linssiä molemmat ovat epätosia joka päivityksellä, ja
  laattakerroksen mittarit olivat kaikissa ajoissa `syy: ""`,
  `valmiita === laattoja` — yhtään keskeytystä ei kirjautunut.
- **Epäily 2 (drawImage ennen decode():a):** `js/pallolaatat.js`
  `haeKuva` purkaa kuvan `createImageBitmap`illa (tai varareitillä
  `Image` + `decode()`) ENNEN kuin kangas luodaan, ja tekstuuri
  tehdään vasta kun kangas on maalattu. Koodissa ei ole kohtaa, jossa
  purkamaton kuva piirtyisi.

Jäljelle jää **epäily 3**, ja se osoittautui mitatusti oikeaksi
kysymykseksi: paikanpitäjää ei ole, ja paikanpitäjän puutteessa
näkyvissä oleva pohja on musta.

## 4. Korjaus

`js/pallo.js`: uusi `asennaPohjanSavy(pallo)`, kutsutaan
`rakennaPallo`ssa laattamoottorihaarasta `asennaLaatunosto`n ja
`asennaNapakannet`in välissä. Se odottaa (kuten napakannet) kunnes
moottori on rakentanut lapsensa ja antaa moottorin omalle
tekstuurittomalle pohjapallolle sävyn `NAPAKANSI_POHJOINEN`
(`#c9c2af`) mustan tilalle.

Periaate on sama kuin kermalla (KARTTAUUDISTUKSEN PAATOKSET 37):
**pohjasävy on paikalla heti eikä vasta laatan mukana.** Puuttuva
laatta näkyy kartanvärisenä aukkona eikä reikänä avaruuteen.

Miksi juuri tämä pallo eikä `globeMaterial()`: pallon oma pinta on
Astronautin kameran ja topografialinssin pinta, ja sen väri on niiden
asia. Se on laattatilassa piilotettu. Kosketetulla pohjapallolla EI
ole tekstuuria, joten sävy ei voi kertautua minkään linssin kuvan
päälle.

`tests/pallo.test.mjs`: napakansitestin lähdekoodivaatimus salli vain
`asennaLaatunosto` → `asennaNapakannet` peräkkäin; se päästää nyt läpi
myös muut `asenna…(pallo)`-rivit niiden välissä. Muuta ei muutettu.

## 5. Mittaus

**Uusi savuke `tools/savukkeet/savuke-musta-laatta.mjs`** (README-rivi
ja `sarjat.json` julkaisusarja: rivit `#webkit` ja `#chromium`).

Väite V1: *yhdessäkään panoroinnin kehyksessä ei ole kartan alalla
täysin mustaa suorakaidetta ≥ 40 × 40 CSS px.* Mitta on suurin musta
suorakaide histogrammipinolla, ja voittaja valitaan PIENEMMÄN sivun
mukaan, jottei kahden laatan sauma voita laattaa. V2 (sama luku
levossa ennen ja jälkeen) on INFO. `--aukkokoe` on erittelykoe, ei
väite: se kaataa joka neljännen laattapyynnön ja kirjaa aukon sävyn.
`--vanha` hakee `js/pallolaatat.js`:n ja `js/pallo.js`:n
`origin/main`ista gitistä.

| Mittaus | Ennen korjausta | Korjauksen jälkeen |
| --- | --- | --- |
| WebKit 390 × 844, suurin musta panoroitaessa | 0 × 0 px (3/3 väitettä läpi) | 0 × 0 px (3/3 läpi) |
| Chromium 390 × 844, sama | — | 0 × 0 px (3/3 läpi) |
| WebKit, aukkokoe (78 laattaa kaadettu) | 0 × 0 px | — |
| Laattamoottorin pohjapallon väri | **RGB(0,0,0)** | **RGB(201,194,175)** |
| Lepokuva 390 × 844 ennen/jälkeen, keskiero kanavaa kohti | — | 1,32 (max 84) |

**Vastakoe ei kaadu**, koska oiretta ei saatu toistumaan: savuke on
siis VARTIJA eikä toiston todiste. Tämä on kirjattu savukkeen omaan
alkukommenttiin ja `sarjat.json`:n huomautukseen, jottei sitä luettaisi
todisteeksi.

Taantumatarkistus: `tools/savukkeet/savuke-topografialinssi.mjs`
(390 px + 1400 px) **47/47 väitettä läpi**, ja PAATOKSET 46:n mittaus
säilyi: *"390 px: seepiapohjan laattoja ei haeta linssin aikana
(0 pyyntöä) — seepia 0, reliefi 64"*.

`node --test tests/*.test.mjs`: **# pass 3650 / # fail 0**
(3663 testiä, 13 skipattu).

## 6. Mitä jäi auki — Fablelle päätettäväksi

1. **Toisto puuttuu.** Jos omistaja näkee mustan uudestaan, arvokkain
   lisätieto on: näkyykö se myös silloin, kun puhelin on WiFissä, ja
   onko se aina KOHDEMAAN sisällä. Mobiiliverkon katkeava pyyntö on
   paras jäljellä oleva selitys, eikä sitä voi jäljitellä
   route-viiveellä.
2. **Kirjaston laattojen häive.** Kirjaston laatat ovat
   läpinäkymättömiä vasta valmiina; häiveen aikana alla oleva pohja
   sekoittuu mukaan. Musta pohja teki häiveestä tummenevan, kartan
   sävy tekee siitä neutraalin. Tätä ei mitattu erikseen.
3. **Sama musta on yhä `globeMaterial()`issa** (piilotettuna). Se on
   Astronautin kameran ja topografialinssin asia, eikä sitä koskettu
   tässä erässä.

## 7. Muutetut tiedostot

- `js/pallo.js` — `asennaPohjanSavy` + kutsu `rakennaPallo`ssa
- `tests/pallo.test.mjs` — napakansitestin lähdekoodivaatimus väljemmäksi
- `tools/savukkeet/savuke-musta-laatta.mjs` — UUSI mittari
- `tools/savukkeet/sarjat.json` — julkaisusarjan rivit `#webkit`, `#chromium`
- `tools/savukkeet/README.md` — savukkeen rivi taulukkoon
- `docs/raportit/viesti-fable-musta-laatta-20260919.md` — tämä raportti
