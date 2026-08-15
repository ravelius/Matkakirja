# Opus 16 → Fable: etukäteispuskuri (v695)

## Tilanne

**Valmis, PR auki.** Haara `claude/opus16-esipuskuri`, rebasattu
tuoreeseen mainiin juuri ennen versionostoa (v695; main ehti ottaa
v694:n PR:ssä #1062, joten numero nostettiin uudelleen työkalulla).

Portit ajettu: `node --test tests/*.test.mjs` → **711 testiä, pass 710,
fail 0**; `tarkista-kaksoisavaimet` → ei kaksoisavaimia;
`build-standalone` → dist 10 507 kt; savukkeet
`esilataus 17/17`, `lukijan-seuranta 9/9`, `dist`, `lehtiasettelu 10/10`,
`lehtiotsikko 17/17`, `lehden-mitta 4/4`, `vuosisaa 8/8`,
`katselin-pollo 6/6`.

## Mitä puskuroidaan ja milloin

| Hetki | Mitä | Missä |
| --- | --- | --- |
| Saapuminen (openArrival → `esilataaKaupunki`) | Kaupunkilehden etusivu: kansikuvat 1200 + 640, maan lippu 96, kohdekartta (juliste tai 1000) ja satelliitti | `esilataaLehdet` / `kaupunkilehdenEtusivunKuvat` |
| Saapuminen | **Maalehden** etusivu kokonaan: korkokartta 1000, kartan kuvanosto 900 galleria mukaan lukien, lippu — lehteä avaamatta | `maalehdenEkaSivu` + `lehdenSivunKuvat` |
| Saapuminen | Lukijaäänen **ensimmäinen pala** kumpaankin lehteen (2 hakua, ei enempää) | `esipuskuroiLehtienLuennat` → `esipuskuroiLuenta` |
| Lehden avaus ja jokainen sivunvaihto (`naytaTutkiSivu`) | **Viereiset** sivut kokonaan: seuraava ja myös edellinen, jos sitä ei ole vielä haettu | `esilataaViereisetSivut` |

Kaikki kuvat kulkevat vanhan `esilataaOsoitteet`-jonon läpi (kolme
kerrallaan, `dead`- ja kaupunkivartijat ennallaan). Uusi
`esipuskuroiKuvat` pitää kirjaa jo pyydetyistä osoitteista, joten
edestakainen selailu ei jonota samaa kuvaa uudelleen.

**Leveydet on kopioitu piirrosta yksi yhteen** (1200/640/1000/900/640/
320/96): eri leveys on selaimelle eri kuva, ja väärä leveys olisi
tuplannut latauksen sen sijaan että poistaa sen.

## TTS-avainosuma — miten se varmistettiin

Esihaku on `js/puhe.js esihaePala`, joka kutsuu samaa `haePala`-
funktiota kuin luenta: sama muistiavain (`persoona|säädöt|teksti`,
nopeus mukana), sama pysyvä säilölohko, ei ääntä eikä elettä.

Teksti johdetaan `js/lukija.js esipuskuroiLuenta`:ssa samasta ketjusta
kuin luennassa — `kokoaLuettavatKohdat` → kohta 0 → `paloitteleVirkkeiksi`
→ ensimmäinen virke (juuri se pala, jonka `pilkoPaloiksi` lähettää
yksin, jotta luenta alkaa heti).

- **Kaupunkilehti:** etusivu on saapuessa jo piirretty, joten teksti
  otetaan oikeasta DOMista — ei datasta johdettuna.
- **Maalehti:** etusivua ei ole DOMissa, joten se rakennetaan
  irralliseen elementtiin (`maalehdenEtusivuRunko`): karttamailla
  otsikko + maaosaston kopio, kartattomilla mailla sama
  `piirraKategoria`-piirto kuvattomasta kopiosta (lukija ohittaa
  IMG:t, joten teksti on sama, mutta irrallinen piirto ei ohita
  esilatausjonoa).

Savuke mittaa osuman kolmella vartiolla: esihakuja on tasan kaksi ja
molemmat kertojan ääntä; esihaettu virke on sama kuin ruudulta
riippumattomasti luettu etusivun ensimmäinen virke; ja kaiuttimen
painalluksen jälkeen samaa palaa **ei** pyydetä uudelleen (luenta hakee
vain jatkopalat). Negatiivikokeella varmistettu, että vartiot
kaatuvat, jos esihaun teksti muuttuu (kaksi FAILia).

Maalehden rekonstruktio verrataan savukkeessa **oikeaan** avattuun
maalehteen: sen ensimmäisen palan on oltava sama teksti, joka
esihaettiin.

## Kaksi asiaa tiedoksi

1. **Muut lehtisavukkeet eivät enää kuluta kiintiötä.** Koska saapuminen
   nyt esihakee puhetta, jokainen lehden avaava savuke olisi tehnyt
   kaksi oikeaa generointikutsua per ajo. Lisäsin
   `katselin-pollo`-, `lehden-mitta`-, `lehtiotsikko`- ja
   `vuosisaa`-savukkeisiin saman pöllöpalvelimen katkaisun, joka
   `lukijan-seurannassa` jo oli.
2. **Sääosio ei tarvinnut kuvapuskuria:** säärivin kuvakkeet ovat pelin
   omia SVG-piirroksia ja päivän ennuste haetaan jo saapumisessa
   (`naytaLehtiSaa` ajetaan `rakennaSivut`in osana). Ei siis
   puskuroitavaa — kirjattu koodikommenttiin.

Sivukohtaista TTS-puskuria **ei** tehty (vain lehtien ensimmäiset palat
saapuessa) — kiintiökurin mukaisesti. Jos haluat sivunvaihdolle saman,
se on yksi kutsu `naytaTutkiSivu`:ssa, mutta se maksaisi generoinnin
jokaisesta selatusta sivusta.

Opus 15:n karttafunktioihin (`piirraKaupunkiKartta`, `kytkeKarttaZoom`)
ei koskettu; `KAUPUNKIKARTAT`-dataa vain luetaan osoitteiden
kokoamiseen.
