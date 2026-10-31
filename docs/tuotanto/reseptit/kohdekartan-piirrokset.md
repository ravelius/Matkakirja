# C Resepti: kohdekartan piirrokset (tasaus ja varjo)

*(Karttaseppä 31.10.2026, PT:n tilaus. Omistajan päätökset 31.10.2026 klo 09.27–10.16; luvat ja portit: D
`tuotannonohjaus.md`. Toteuttaja: Karttaseppä; natiivin näyttö: Natiivi-UI.)*

**Mikä:** kaupungin kohdekartan (nähtävyyskartta, kaupunkilehti ja kokoruutu) piirrokset näkyvät kaikki samalla kontrastilla,
samassa musta- ja valkopisteessä ja samalla kovalla pienellä varjolla. Omistajan sanat:

- 09.31 "Kaikki pitää olla samalla kontrastilla. Nyt osa voimakkaampia kuin toiset. Metro liian voimakas esim."
- 09.33 "Määrittele kaikille sama musta piste ja valkopiste ja Säädä Keski kontrasti yhteneväksi ja pudota saturaatiota tarvittaessa"
- 09.34 "Mieti tapa joka on helppo monistaa kaikkiin kaupunkeihin"
- 10.07 "Poista pehmeä varjo ja vaihda se kovaan ja pieneen varjoon mikäli helppo monistaa."
- 10.16 tasattu Pariisi pienellä terävällä varjolla: "Kelpaa"; 10.26 kuvaan leivottu varjo "Varjo liian iso" → PT: takaisin 10.16:n CSS-varjoon.
- 09.17 "Haaleus on tarkoituksellista siinä toisessa kartassa" → striimikartta käyttää alkuperäisiä kuvia.

## Tavoite

Kaikki kohdekartan piirrokset yhdessä asetuksessa (`tools/piirrostasaus.json`): musteen (alfa > 200) luminanssi
musta = 2. persentiili 0,36, valko = 98. persentiili 0,85, keski = mediaani 0,61, kroma (max − min) 0,24. Tallennus 1024 px,
webp-laatu 82 (PT). Varjo EI kuvassa: kohdekartan CSS-sääntö `drop-shadow(1px 1px 0 rgba(44, 35, 24, 0.45))`, natiivissa
sama vakio (siluetti 1 pt oikealle ja alas, Natiivi-UI). Piirroksen paikka ja keskinäinen koko pysyvät (kevyiden pienennys 0,72). Arvot = Pariisin 14 piirroksen 09.27-puolivälin mediaani.

## Tekotapa

1. **Aja kaupunki:** `node tools/tasaa-kohdekartan-piirrokset.mjs <kaupunki> [<kaupunki> …]`. Työkalu ottaa kohdekartalle
   piirtyvät kohteet (`kaupunkikartanKohteet` ∩ `MINIATYYRIT`), hakee kuvan reposta tai ämpäristä, tasaa sen
   (`tools/piirrostasaus.py`) ja kirjoittaa `<nimi>-kk.webp`, taulun `js/packs/kohdekartan-piirrokset.js` ja mitat
   `tools/piirrostasaus-tulokset.json`.
2. **Päivitä manifestit:** `tools/miniatyyri-mitat.json` (uusien -kk-kuvien sha, täyttö ja reuna) ja `sw.js` (esivälimuisti).
3. **Testit:** `tests/piirrostasaus.test.mjs` (jokainen piirros tavoitteessa ±0,03; kroma ei yli, alle saa jäädä 0,08) ja
   `tests/miniatyyrit-leikkaus.test.mjs`. Rakenteellinen poikkeus kirjataan perusteluineen asetuksen
   `hyväksytyt_poikkeamat`-listaan (esim. Lontoon silmä: ohut valkoinen pyörä).
4. **Pari:** kohdekartta ennen/jälkeen lähimmällä zoomilla (kokoruutu, zoom 3) ja napautettu suurennus täysikokoisena.
5. **Vienti:** ensin `vie-assetit` (miniatyyrit) PR-haarasta, sitten merge; `vie-sisalto` vie kokoelman
   `kohdekartanPiirrokset` (skeema 1.66), josta natiivin kohdekartta lukee samat kuvat.

## Miten tasaus toimii (ja miksi)

- Käyrä tehdään **luminanssille** ja muutos lisätään kaikkiin kanaviin: sävy ja kroma säilyvät. Kanavittain tehty käyrä
  nosti tumman pikselin vaaleita kanavia, jolloin musta piste karkasi.
- Käyrä jatkuu **lineaarisena** musta- ja valkopisteen yli: katkaisu vaalensi täyden koon ohuet ääriviivat maitomaiseksi
  hunnuksi (Louvre 31.10.).
- Kylläisyyttä nostetaan vain vähäkylläisistä pikseleistä (kultaukset eivät kirkastu keltaisiksi pisteiksi); lasku koskee
  kaikkia. Puoliläpinäkyvä reuna (alfa < 200) korjataan vain osittain.
- Gamma sovitetaan mittaamalla välillä 0,55–3,0. Mitat otetaan ennen varjoa.

## Tyypilliset virheet

- Yhteinen CSS-suodatin kaikille: ei tasaa piirroksia keskenään (09.31). Kontrasti tulee kuvasta, CSS:ssä vain `filter: none`.
- Kuvien muuttaminen alkuperäisinä: muuttaa myös striimikartan. Aina uusi `-kk.webp`.
- Selaimen canvas-mittaus ämpärin kuvista ei toimi tuotannossa (ei CORS-otsakkeita): mitat etukäteen työkalulla.
- Kuvaan leivottu varjo skaalautuu kuvan mukana (leveillä piirroksilla ja suurennuksessa paksu, omistaja 10.26): varjo aina CSS:llä.
- Hajautusvälin tai kevyen pienennyksen muuttaminen siirtää piirroksia ja muuttaa keskinäisiä kokoja (KK 31.10.): älä koske niihin tasauksessa.
