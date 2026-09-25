# Luovutus: Siirtoseppä, 25.9.2026 klo 12.2x

Luovuttaja on Siirtoseppä (Opus). Omistaja pysäytti sessiot tilinvaihtoa
varten. Tämä korvaa luovutuksen `-20260924-b.md`. Sen opit ja koepakettien
rakennuskomennot ovat yhä voimassa, joten lue sieltä kohdat "Koepaketit" ja
"Opetukset".

## Tila

- **Tuotanto:** 1.x **v96** (skeema 1.38) ja 2.0 **v43**. #3133 (1.39) mergettiin
  klo 12.2x, joten CI julkaisee 1.39:n seuraavaksi. Tarkista `sisalto/1/uusin.json`
  ja aja `amparitarkistus.mjs --url https://media.matkakirja.app/sisalto/1/v<N>/`.
- **Mainissa tänä vuorona:** 1.34–1.35 (#3081 maarajat täysinä, maat.fokuspohja),
  1.36 (#3099 merinimet), 1.37 (#3103 aluenimet, Karttasepän #3100),
  1.38 (#3114 kaupunkien asukkaat, Wikidata P1082), 1.39 (#3133 karttavalot.ankkuri
  ja .puoli) sekä testikorjaus #3095 (Elämää-lehtiä voi olla 0).
- **Koepaketit:** `/Users/Shared/Claude/sisalto-koe` v51 (1.40) ja
  `/Users/Shared/Claude/sisalto-koe-2` v12.
- **Worktree:** `/Users/Shared/Claude/wt/siirtoseppa-offline-z9` (#3155) ja tämä
  luovutus-worktree `wt/siirtoseppa-luovutus` (poistettu pushin jälkeen).

## Avoin erä: #3155 (skeema 1.40, LUONNOS)

Natiivisepän pyyntö (Fablen päätös, build 13): offline.jsonin rasteripohja
Karttasepän sarjaan `julisteet/pallo/laatat/2026-09-25-pohja-20260925/`
(Z0–Z9, viivaton). Maittain z6–z8 kuten ennen. **Z9 vain kaupunkien
ympärillä** listana välejä, yksi kaupunkia kohti (`lahteet.rasteri.kaupunkitaso`:
säde 60 km, kokoelman kaupungit tyyppiä 'kaupunki', 72 kpl). Rajaus on sama kuin
satelliittipinnalla (Karttasepän `tee-satelliitti.mjs kaupunginLaatikko`, haara
karttaseppa-satelliitti, ei mainissa). `offline-koot.json` on haettu uudesta
sarjasta, ja skeemasopimus osaa nyt `offline.<pistepolku>`-ehdon.

Ennen mergeä:
1. **#3133 on mergetty**, joten yhdistä `origin/main` haaraan
   `siirtoseppa-offline-z9`. Ristiriidat ovat mekaanisia skeemarivejä: pidä
   haaran puoli. Aja testit ja pushaa.
2. **Z9 ämpärissä.** Klo 12.4x Z9-laatta löytyi vain 14 kaupunkikeskukselle 71:stä.
   Karttasepän vienti jatkuu. Tila näkyy tiedoston
   `/Users/Shared/Claude/pyramidi-poltto/ajo-20260925/vie-pallo-2.out`
   viimeiseltä riviltä ("paikallisia … ämpärissä …", 349 525 laattaa).
   Karttaseppä ilmoittaa, kun sarja on valmis. Tarkista z9-keskukset
   HEAD-pyynnöillä (koodi PR:n kuvauksessa) ja aja sen jälkeen
   `offline.mjs --paivita-koot` uudelleen, jotta z9:n keskikoko tulee oikeista
   laatoista.
3. Poista luonnostila (`gh pr ready 3155`), korjaa otsikko ja kerro
   Julkaisijalle. Mergen jälkeen ilmoita tuotantoversio Natiivisepälle.

**Natiivin puolella** (kirjattu Natiivisepän luovutukseen -20260925-c.md):
`Alueet.RasterinLaatikko` ottaa laatikon syvimmältä tasolta. Z9 kattaa nyt vain
kaupunkien ympäristöt, joten laatikko on luettava tasolta `maaMax` (8).

## Tämän vuoron opit

- **Julkaisija squashaa pinon.** Jokaisen mergen jälkeen pinon seuraava PR menee
  ristiriitaan skeemariveissä (`skeemakentat.json`, `skeemasopimus.mjs`,
  `vie-sisalto.mjs`, testien loppu). Mainin puolella on aina sama edellinen
  versio, joten haaran puoli pidetään. Tarkista kuitenkin ennen kuin pidät
  haaran puolen, että mainin puolella ei ole muuta.
- **WEB ON MALLI -haku:** Natiivisepän esimerkkiarvo voi olla väärästä laudasta.
  Pallon lauta on aina maailmankartta (`js/pallolauta/lauta.js`). Esimerkiksi
  `kaupungit.nimionAnkkuri` = la/lx/ly on ollut paketissa jo 1.31:stä. Tarkista
  ensin, onko kenttä jo olemassa.
- **Pidot:** 1.34:stä tuli väärä hälytys (build 10 sisälsi fokuspohjan). Ennen
  pitoa tai peruutusta pyydä Natiivisepältä `git merge-base --is-ancestor`
  -todiste.
- **Wikidata P1082:** P518-osajoukkoja käytetään vain, jos muita arvoja ei ole
  (Australian väestönlaskenta). Saarilla ja valtioilla on
  `asukkaatAlue = true`. Linssiseppä antaa niille pienen maston.
- **Viestit:** SendMessage-socket vanhenee, kun peer käynnistyy uudelleen.
  Lähetä nimellä ("Karttaseppä (Opus)"), ei socket-osoitteella.
  Varakanavat: `vertaisviestien-10-raja`-muisti. JUMI → FABLE: jumissa yksi
  viesti Fablelle, ei korttia.

## Seuraavat askeleet

1. Tarkista, että 1.39 on tuotannossa, ja aja ämpäritarkistus.
2. #3155: yhdistä main, odota Z9:ää, päivitä koot ja vapauta (ks. yllä).
3. Natiivisessioiden build 13 -pyynnöt. Tarkista aina ensin, mitä kenttä
   tarkoittaa webin koodissa ja onko se jo paketissa.
