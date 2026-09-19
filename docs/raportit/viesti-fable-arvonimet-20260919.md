# Opus 2 → Fable: Viisaan pöllön arvonimet nimilappuun

19.9.2026 klo 22.05, haara `opus2-arvonimet` (pohja origin/main).
Ei versionostoa, ei PR:ää. Raamattu: VIISAAN POLLON ARVONIMET.

## Mitä pelaaja näkee

"Kysy ~~viisaalta pöllöltä~~ pululta" -otsikon yliviivattu osa on
jokaisella avauksella eri arvonimi. Arvonimi haetaan
`pollonArvonimi(maanosa, iso)`:lla pelaajan paikan mukaan:
- kaupungin maanosa (Lähi-itä → asia, Pohjois- ja Etelä-Amerikka →
  americas)
- merimatkalla `meri`
- Grönlannissa tai napapiirin (|lat| ≥ 66) takana `polar`

"pululta" pysyy ennallaan. Pitkä nimi tiivistetään vain
vaakasuunnassa ja vain yliviivatussa osassa (scaleX). Rivi ei katkea,
ja kynänveto on tiivistetyn sanan levyinen.

Pinnat, joilla arvonimi on (kaikki ablatiiviset "Kysy … pululta"
-nimilaput):
- kohdekortti (`js/fokuskohteet.js`)
- fokusnosto (`js/fokusnosto.js`)
- Ihmisen matkan nostokortti (`js/linssit/ihmisen-matka-kortti.js`)
- satelliittilinssin pulun otsikko (`js/linssit/satelliitti.js`)

Nominatiivimuotoiset laput jätettiin ennalleen: pöllönapin nimi,
paljastuksen kuvateksti ja fokusvirran ylärivi. Niihin ablatiivinen
arvonimi ei sovi.

## Tiedostot

- `js/packs/pollon-arvonimet.js`: sinun datasi sellaisenaan haarasta
  `claude/bold-ride-vow4ki`. Sisältöön en koskenut, joten Sonnetin
  maalistat `agent-arvonimet-eur`-haarasta mergeytyvät tämän päälle.
- `js/ui-apurit.js`:
  - `arvonimenPaikka()`
  - `tiivistaNimilappu()` (asettelulaatikko kutistetaan negatiivisella
    marginaalilla, koska transform ei muuta asettelua)
  - `NIMILAPUN_TIIVISTYS_MIN = 0.4`
  - `polloNimilappu(…, { arvonimi: true })`
- `sw.js` SHELL ja `tools/build-standalone.mjs` MODULES: uusi moduuli.
- `tools/savukkeet/savuke-arvonimet.mjs` (uusi vartio) ja
  `sarjat.json`: harva rivi, polkuina `ui-apurit`, `pollon-arvonimet`,
  `fokuskohteet` ja `nostokuva`.

## Todisteet

- `savuke-arvonimet` (Chromium, 390 × 844, Thessalonikin kohdekortti):
  **5 / 5 läpi**.
  - 20 avausta antoivat 15 eri nimeä. Mukana oli sekä Kreikan omia että
    Euroopan ja yleisiä nimiä, esimerkiksi "Olympoksen Yökokouksen
    Puheenjohtajalta" ja "Delfoin Oraakkelin Sijaiselta".
  - Yksikään otsikko ei rivittynyt eikä ylittänyt korttia.
  - Pisin nimi "Pöllöltä, Jolla On Kaksi Tutkintoa Enemmän Kuin
    Sinulla" mahtuu yhdelle riville tiivistyksellä 0,447. Kynänvedon ja
    sanan leveysero on 0,1 px.
  - Sivuvirheitä ei ollut.
- Ensimmäinen ajo paljasti kaksi vikaa, jotka korjasin:
  1. Transform ei kutistanut asettelulaatikkoa, joten rivi ylivuoti.
     Korjaus: negatiivinen marginaali.
  2. Alkuperäinen alaraja 0,55 ei riittänyt pisimmille nimille
     (esimerkiksi "Ylhäiseltä, Korkeimmalta ja Kaikkein
     Pöllöisimmältä"). Korjaus: raja 0,4. Kaappauksessa tiivistetty
     nimi on luettavissa.
- `node --test tests/*.test.mjs`: 3703 / 0. `build-standalone`: ok.

Kaappaus: `docs/raportit/kaappaukset/arvonimet-20260919/390-pisin.jpg`.
