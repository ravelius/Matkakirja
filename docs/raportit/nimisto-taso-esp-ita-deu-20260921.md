# Nimistö 1873 + nosto.taso: ESP, ITA, DEU (2026-09-21)

Fablen tilaus jatkona Ranskan nimistö-1873-erälle: "muutama muu maa
samalla tapaa" — Espanja, Italia, Saksa, historiallisilla 1873-nimillä
+ nosto.taso-luokittelu. Viimeinen maaerä tälle päivälle ("ei enempää
maita sen jälkeen").

## Perusta

`sisalto-nimisto-1873` (Ranskan aiempi työ) rebasattu ajantasalle
origin/v1973-prep:iin ja pushattu. Kolme maata haarautettu siitä
erikseen, kukin omaksi haarakseen (Fablen ohje: yksi haara per maa):

- `sisalto-nimisto-taso-deu` (commit cca22bea)
- `sisalto-nimisto-taso-ita` (commit b8fcdbe0)
- `sisalto-nimisto-taso-esp` (commit f208c490)

Kaikki kolme perustuvat samaan `sisalto-nimisto-1873`-kantaan mutta
EIVÄT toisiinsa — Karttaseppä/Julkaisija yhdistää ne julkaisussa
(kukin lisää oman iso-kohtaisen lohkonsa NIMISTO_1873-taulukkoon,
ei päällekkäisyyksiä keskenään).

## Sisältö per maa

- **DEU** (29 nimiötä): Preussin kuningaskunnan suuret provinssit
  omina nimiöinään (kuten oikeissa 1800-luvun atlaksissa), muut
  kuningaskunnat/suurherttuakunnat/herttuakunnat/vapaakaupungit omina
  riveinään. 7 pienintä Thüringenin/Waldeckin ruhtinaskuntaa jätetty
  pois. 8 taso-1-nostoa (fokuskohteet-deu.js, hahmotelma-deu.js).
- **ITA** (16 nimiötä): yhdistyneen Italian 1873-tilanne
  (1861-ydin + Veneto 1866 + Rooma/Lazio 1870). Trentino/Alto Adige/
  Triest/Friuli EIVÄT mukana (yhä Itävalta-Unkaria). 8 taso-1-nostoa
  (fokuskohteet-ita.js).
- **ESP** (16 nimiötä): 1800-luvun historialliset alue-/
  kuningaskuntanimet, ei 1833-provinssijakoa. Kolme harkinnanvaraista
  rajauspäätöstä dokumentoitu reviewille (Baskimaa yhtenä, Kantabria
  ja León omina). 8 taso-1-nostoa (maastokohteet-esp.js,
  hahmotelma-esp.js).

Yhteensä 61 uutta nimiötä, 24 uutta taso:1-merkintää.

## Prosessi ja löydetty virhe

Tutkimus delegoitiin kolmelle rinnakkaiselle taustasessiolle. Itse
tarkistin jokaisen maan taso-1-poiminnat grepillä (kaikki 24 löytyivät
verbatim, mitään ei keksitty) ja splicasin sisällön käsin. DEU:n
luonnoksesta puuttui vahingossa 5 herttuakuntaa (Braunschweig,
Sachsen-Meiningen, Sachsen-Altenburg, Sachsen-Coburg-Gotha, Anhalt) —
25 Bundesstaatin laskelma tekstissä oli oikein, mutta rivit jäivät
kirjoittamatta; lisäsin ne itse ennen commitointia.

## Testit

Jokaisen maan jälkeen ja lopuksi: `node --test tests/*.test.mjs` —
3784 pass, 0 fail, 13 skip. `node tools/tarkista-kaksoisavaimet.mjs` —
ei kaksoisavaimia.

## Seuraava vaihe

Muu Eurooppa (Itävalta-Unkari, Osmanien Balkan, muut) omana
myöhempänä eränään, kun omistaja antaa järjestyksen. Ei aloiteta
oma-aloitteisesti — Fablen ohje: "ei enempää maita sen jälkeen".
