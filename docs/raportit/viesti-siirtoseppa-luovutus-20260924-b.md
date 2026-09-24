# Luovutus: Siirtoseppä, 24.9.2026 iltapäivä (b)

Luovuttaja on Siirtoseppä (Opus). Konteksti on 72 %, ja Fable nollaa session.
Tämä korvaa luovutuksen `-20260923-yo.md`, jonka opit ovat yhä voimassa.

## Lue ensin

1. `CLAUDE.md` ja Raamatun Ydinajatus kohta 2 (vain se osio). Lue myös
   **WEB ON MALLI, MITATTUNA** (Raamattu 9ebc5784c, omistaja 24.9. klo 15.5x):
   natiivi tehdään täsmälleen niin kuin web näyttää ja toimii, mitattuna
   (web-kuva → mitat → koodi → kuvapari). Paketille tämä tarkoittaa, että
   kentän merkitys otetaan webin koodista, esimerkiksi fokuspohja eikä maarajat.
2. Tämä raportti.
3. `tools/vienti/vie-sisalto.mjs`:n historiakommentti (skeemat 1.0–1.35).
4. `docs/raportit/kenttakartta-2-0-natiivi-20260924.md` (raakapolku → päätaso).

## Tila (klo 15.52)

- **Tuotanto:** 1.x **v46** (skeema 1.32) ja 2.0 **v5** (`sisalto/2/uusin.json`).
  CI julkaisee jokaisesta main-mergestä molemmat. Avausluentojen teksti ja
  aikaleimat ovat mukana (#3070).
- **Koepaketit:** `/Users/Shared/Claude/sisalto-koe` (1.x, v45 = 1.35) ja
  `/Users/Shared/Claude/sisalto-koe-2` (2.0, v6). Rakennus kärjen worktreestä:
  `node tools/vienti/vie-sisalto.mjs && node tools/vienti/julkaise-sisalto.mjs
  --ulos /Users/Shared/Claude/sisalto-koe --edellinen /Users/Shared/Claude/sisalto-koe/uusin.json --suurin 45`.
  2.0: `node tools/vienti/major2.mjs --vienti dist/vienti --ulos dist/vienti2 && node tools/vienti/julkaise-sisalto.mjs
  --major 2 --vienti dist/vienti2 --ulos /Users/Shared/Claude/sisalto-koe-2 --edellinen …/sisalto-koe-2/uusin.json --suurin 6`.
- **Worktree:** vain `/Users/Shared/Claude/wt/siirtoseppa-maamerkit`, jossa
  ovat haarat `siirtoseppa-maamerkit` ja `siirtoseppa-maarajat` (nyt checkoutattuna).
  Luovutushaaran worktree `siirtoseppa-luovutus-b`: poista pushin jälkeen.

### Avoimet PR:t

| PR | Sisältö | Tila |
|---|---|---|
| **#3074** `siirtoseppa-maamerkit` | Skeema 1.33: kokoelma `maamerkit` (natiivin 3D-maamerkit, Raamattu LENNON KARTTA JA MAAMERKIT). Rivit `tools/vienti/maamerkit.json` (Pelikoodari, nyt 0 riviä, Lontoo vasta omistajan pilotin jälkeen). CI tarkistaa GLB:t ämpäristä (`maamerkit.mjs --tarkista`). Mallit menevät maan offline-medialistaan. | mergettävissä, Julkaisijan jonossa |
| **#3081** `siirtoseppa-maarajat` (LUONNOS) | 1.34: maarajojen 1.29-rajaus pois (web #3078 piirtää Natural Earth 10m, Huippuvuoret Norjalle), `muutRenkaat` = []. 1.35: `maat.fokuspohja` = webin FOKUS_POHJAT asteina ja laudalla (nostotaso ja kameran rajaus kuten webissä). | **ÄLÄ MERGEÄ** ennen kuin Natiiviseppä ilmoittaa, että build 10 (natiivi 38e424d) on TestFlightissa. Buildit 8 ja 9 laskevat nostot maarajoista, ja FRA −62° rikkoisi ne. Merge = julkaisu. Riippuu myös #3074:stä ja #3078:sta. |

## Seuraavat askeleet

1. Kun #3074 on mainissa: yhdistä main haaraan `siirtoseppa-maarajat` ja
   tarkista ämpäristä 1.33 (`node tools/vienti/amparitarkistus.mjs --url
   https://media.matkakirja.app/sisalto/1/v<N>/`).
2. Kun Natiiviseppä ilmoittaa build 10:stä **ja** #3078 on mainissa: poista
   #3081:n luonnostila (`gh pr ready 3081`), korjaa otsikko ja kerro
   Julkaisijalle. Mergen jälkeen ilmoita Natiivisepälle, joka katsoo NOR- ja
   FRA-ääriviivat simulaattorissa.
3. Maamerkkien pilotti: kun Pelikoodari lisää Lontoon rivin, GLB:n on oltava
   ämpärissä ennen mergeä.
4. 2.0-vaihto natiivissa (Fable): oma TestFlight-build, kun Laitetestaaja on
   ajanut A/C-sarjan 2.0:lla. Natiiviseppä vaihtaa `Sisalto.Paaversio = 2`
   yhdellä rivillä. Vaihe 6 (1.x:n jäädytys) tehdään vasta, kun kaikki
   TestFlight-buildit lukevat 2.0:aa.
5. Natiivisessioiden uudet datapyynnöt: tarkista ensin webin koodista, mitä
   kenttä webissä tarkoittaa (WEB ON MALLI).

## Tämän vuoron erät (tuotannossa)

- **Skeemasopimus** (`tools/vienti/skeemasopimus.mjs`, `skeemakentat.json`):
  versioittaiset tunnuskentät ja kenttäkuvan tiiviste. Uusi kenttä samalla
  numerolla kaataa CI:n. Uusi versio: nosta `SKEEMAVERSIO_TARKKA`, lisää
  VAATIMUKSET-rivi ja historiakommentti, aja vienti ja `skeemasopimus.mjs --paivita`.
  Julkaisemattoman version tiivisteen voi vaihtaa vain poistamalla sen käsin.
- **Ämpäritarkistus** (`amparitarkistus.mjs`, CI ennen osoitinta).
- **1.17–1.32** (#3012, #3030): kohdekartat, tyypitys, muutosloki-natiivi,
  offline-maanosat, saapumistekstit, maakuntien kaaret (1.25), työhuone ja
  tilastot (1.27–1.28), maarajojen rajaus (1.29, kumotaan 1.34:ssä),
  äänitaulut ja reittien maksu (1.30), loput raakakentät (1.31–1.32).
- **2.0** (`major2.mjs`, CI `sisalto/2/`): ei raakadataa, vain natiivin lukemat
  moduulit (NATIIVIN_MODUULIT), 1.x:n ja 2.0:n sisältövertailutesti,
  RAAKA_VASTINEET, TYYPITETYT ja RAAKA_KOKONAAN (`tools/vienti/tyypitys.mjs`).
- **Lähteet:** ETOPO 2022, Copernicus GLO-30/90 ja GSHHG (js/lahteet.js,
  linssien lahde-kentät, lisenssit.json).
- **Lisenssitarkistus** (#2932): `tools/vienti/lisenssitarkistus.mjs`.
- **Muutosloki-natiivi:** Julkaisija lisää rivit komennolla
  `node tools/vienti/muutosloki-natiivi.mjs --versio "1.0.0 (<CFBundleVersion>)" --teksti "…"`.

## Opetukset

- **Merge = julkaisu.** Kun natiivi tarvitsee siirtymäajan, pidätä merge
  (luonnos-PR ja otsikko), ei pelkkää julkaisua.
- **Julkaisija pushaa PR-haaraan** (mainin yhdistys ja versionosto). Älä
  pushaa jonossa olevaan haaraan, vaan tee uusi haara sen päälle.
- **Yhdistäessä kaksi haaraa, jotka lisäävät testin tiedoston loppuun,**
  yhteinen loppusulje voi jäädä pois. Aja `node --check` ennen testejä.
- **Samanniminen tiedosto eri tarkoitukseen** (lisenssit.mjs) aiheuttaa
  add/add-konfliktin: nimeä uudelleen, älä valitse puolta.
- **Testikomennon virhe ei ole pakettivika:** tarkista natiivin
  komentokäsittelijä ennen kuin kosket pakettiin (lento-alku).
- **Raakadatan poisto (2.0) paljastaa aukkoja:** vartijatesti ja
  sisältövertailu löysivät linssiaineiston, pulmien taulukot ja
  kohtaamiskuvien kaupungin nimen.
