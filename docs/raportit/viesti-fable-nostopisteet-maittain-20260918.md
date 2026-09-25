# Viesti Fablelle: miksi Ranskan nostopisteitä oli enää 34 / 31 (v1942)

Opus-agentti 18.9.2026. Haara `claude/bold-ride-vow4ki-nostopisteet-maittain`
(lähtö: `claude/bold-ride-vow4ki-julkaisu-v1942`, PR #2584).
Tausta: Raamattu PAATOKSET 34 kohta 17 b–d, PAATOKSET 33 TARKENNUS 2.

## Juurisyy: pallo ei tuntenut maakohtaista nostotaulua

Ämpärin uusi tila on kaksiosainen:

* pyramidi (`julisteet/pyramidi/pyramidi.json`) kantaa taulun
  `nostotasot[ISO]`, jossa FRA:lla on tasot 5–8 ja 13 poltettua
  nostotiivistettä (`nostotaso.versio = 2026-09-19-maittain`);
* pallon oma sarja (`julisteet/pallo/laatat/2026-09-07a-i/`) on ajettu
  **ilman** `--nostot`-lippua, joten `laatat.json` sisältää `nostot: null`.

Kerrosportti osasi tämän jo: `js/pallolaatat.js` `nostotMaittain` herää
juuri silloin, kun pallon sarjassa EI ole nostoja mutta pyramidissa on
kohdemaan kirjaus, ja lepokerros latoo Ranskan nostolaatat. **Poltettu
muste oli siis ruudulla.**

Mutta VAIKENEMINEN luettiin väärästä paikasta. `js/pallo.js`
`pallonNostoOnPoltettu` katsoi vain pallon oman luettelon kenttää
`nostotaso.nostot` — nyt `undefined` — ja palautti **epätoden jokaiselle
nostolle**. Elävä kerros piirsi siis kaikki Ranskan nostot elävinä
poltetun musteen päälle, ja juuri se kaatoi luvun: elävät merkit
kilpailevat CSS2D-katosta (`js/pallolauta/nostot.js` `NOSTOJEN_KATTO` 40,
`js/pallolauta/lauta.js` `HTML_MERKKIEN_KATTO`), ja katon yli jääneet
eivät päädy DOMiin **eivätkä osumalistalle** — pelaajalle ne ovat
kadonneita. Poltettu rivi ei kilpaile katosta lainkaan, joten aiemmin
(nostot-lukko-erä, pallon sarjassa oli nostot) sama näkymä antoi 43 / 42.

Epäily 2 (uusien ankkurien tiivisteet eivät täsmää) ei toteutunut:
pallon vertailu on **tunnuksella**, ja tiivistettä katsotaan vain jos
kutsuja antaa sen. Epäily 3 (savukkeen laskutapa) ei myöskään: savuke
laski oikein, peli piirsi väärin.

## Puuttuneet tunnukset (mitattu)

Uusi INFO-rivi listaa ne Ranskan kartan elävät nostot, jotka eivät ole
osumalistalla omana rivinään eivätkä aihemerkin jäsenenä. Korjatussa
v1942:ssa:

* **390 px (12)**: montblanc, biskajanlahti, carnacin-kivirivit,
  hahmotelma-verdon, hahmotelma-saint-malo, hahmotelma-pointe-du-raz,
  hahmotelma-ajaccio, hahmotelma-bonifacio, syvennys-marseille-cosquer,
  syvennys-marseille-exvotot, nosto-maalehti-chandeleur,
  nosto-maalehti-marseillen-saippua
* **1400 px (4)**: hahmotelma-bonifacio, syvennys-marseille-cosquer,
  syvennys-marseille-exvotot, nosto-maalehti-marseillen-saippua

Nämä ovat saapumisnäkymän ULKOPUOLELLA (Korsika, Mont Blanc,
Biskajanlahti; 390 px:n pystyruutu sovitetaan korkeuteen, PÄÄTÖKSET 17)
tai Marseillen rykelmässä — eivät kadonneita kesken näkymän. Lista jää
mittariin, jotta seuraava erä näkee heti, jos joukko kasvaa.

## Muutos

* `js/laattapyramidi.js`: uusi vienti `nostotasonPoltetut()` — kohdemaan
  `nostotasot[ISO].nostot` tai null. Yksi lähde, sama kuin laatastolla.
* `js/pallo.js`: `pallonNostoOnPoltettu` ja `pallonLaatoissaOnNostoja`
  putoavat tähän tauluun, kun pallon omassa sarjassa ei ole nostotasoa.
  Järjestys on pallon oma ensin — sama kuin kerrosportissa.
* `js/pallolauta/nostot.js`: aihemerkin datumille kenttä `jasenet`
  (ryhmän jäsenten tunnukset), jotta ulkopuolinen mittari voi sanoa
  MITKÄ nostot ovat kartalla eikä vain montako.
* `tools/savukkeet/savuke-ranskan-nostot-lukossa.mjs`: uusi INFO-rivi
  puuttuvista tunnuksista (molemmilla ruuduilla), ja `vaadi` kirjoittaa
  FAIL-riville myös GitHub Actionsin annotaatiorivin
  `::warning::<väite> — <lisä>` (vanha `##[warning]`-muoto), jonka
  `tools/savukkeet/aja-sarja.mjs` poimii PR-lokkiin.
* `tests/pallolepokerros.test.mjs`: tuontiväite sallii uuden nimen ja
  vaatii erikseen, että `nostotasonPoltetut` luetaan tasokartan
  moduulista.

Vartion 5 raja 35 pysyy ennallaan (Fablen päätös).

## Mittaus

`NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-ranskan-nostot-lukossa.mjs`
(Mac Studio, molemmat ruudut yhdellä ajolla): **10/10 vartiota läpi**.

| ruutu | DOM-merkkejä | osumalistan rivejä | nostopisteitä | joista poltettuja | kaupunkimerkkejä |
|---|---|---|---|---|---|
| 390 px | 32 | 42 | **36** | 9 | 5 |
| 1400 px | 40 | 53 | **44** | 12 | 7 |

Ennen korjausta samat luvut olivat 34 ja 31, poltettuja 0.

`node --test tests/*.test.mjs`: 3623 läpi, 0 punaista (13 ohitettua).
`node tools/tarkista-savukkeet.mjs`: kunnossa.

## Huomio Fablelle

Sääntö kulkee nyt kahdessa paikassa samaa reittiä: laatasto tulee
`nostotasot[ISO]`-kirjauksesta ja vaikeneminen samasta kirjauksesta.
Jos pallon sarja joskus ajetaan taas `--nostot`-lipulla, vanha käytös
palaa automaattisesti (pallon oma taulu voittaa) — mutta silloin
kohdemaakohtaisuus katoaa, koska poltettu muste on kankaassa koko
maailmasta.
