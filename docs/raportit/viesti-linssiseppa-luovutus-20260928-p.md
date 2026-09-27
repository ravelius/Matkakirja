# Linssisepän luovutus 28.9.2026 (p) — Linssiseppä (Opus, max) = myös Mallinseppä

*Kirjoitettu klo 00.1x omistajan käskystä (23.58: muut työt tauolle, vain striimiluenta julkaistaan, sitten tilinvaihto).
Edellinen -o.md. Session id:t ovat ennallaan (-n.md):
- Fable local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc
- Natiiviseppä local_04e2850b-d63c-481d-be73-c7d784a7cbcb
- Karttaseppä local_4bd7c316-55bc-423a-9da1-821fdd123cab
- Natiivi-UI local_e9fdc695-8421-4c14-a187-8881e73c835a
- Laitetestaaja local_3509b4ba-6000-4dea-869b-ecb22f4e3270
- Pelikoodari local_242febe9-d6cf-45ae-8280-faf394dc6e3e

Tämän session scratchpad S = /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linssiseppa/895b8651-2b31-456c-8a40-c43ad15680b2/scratchpad
(kehotteet/era6-yhteinen.txt, integroi.sh).*

**TAUKO (omistaja 27.9. klo 23.58):** kaikki alla oleva odottaa omistajan tauon ja tilinvaihdon loppua. Unity-käännöksiä ja
simulaattoreita ei ajettu tässä sessiossa (Karttasepän yöpoltto). Kaikki haarat ovat paikallisessa proto-gitissä, ja docs on
pushattu haaraan linssiseppa-tyo-20260923.

## 1. JONO TAUON JÄLKEEN (järjestyksessä)

Jokainen käännös: rivi Karttasepälle ennen ja jälkeen, sitten
`S=<uusi S> proto-3d/tyokalut/linssiseppa-ajot/kaanna-jono.sh <nimi> <haara>`. Jos juna/b13 on liikkunut 508761e8:sta,
merge juna haaraan ennen käännöstä ja aja `tyokalut/tarkista.sh` (0 virhettä).

1. **Erä 5 (Kronborg, Visby, Nidaros)**
   - Proto-haara `mallinseppa/era5` **d35e9f2c** (worktree /Users/Shared/Claude/wt/proto-linssiseppa-era5, junan 508761e8
     päällä). Commitit: Nidaros 1b05b290, Kronborg b231e756 ja Visby d35e9f2c; unity-tarkistus 0 virhettä.
   - Visby on tarkistettu ja hyväksytty kuvista, ja speksien §11:een on lisätty integrointi.
   - Fablen ratkaisut: Kronborgin kuparinvihreä 14 % jää (oikeat katot ovat kuparia), ja `nosto:kronborg`-ankkurin
     korjaa Sisältökirjuri.
   - Seuraavaksi käännös `e5 mallinseppa/era5`, sitten laiteajo -o.md:n kohdan 1 mukaan (`ajo-mallit.sh`,
     `koosta_era2.py`). Kuvat Fablelle ja merge-pyyntö Natiivisepälle.
2. **Lippu maailman kokoisena + 3D-symbolit** (omistajan toive 23.2x, Fable hyväksyi)
   - Proto-haara `linssiseppa/symbolit-lippu` **cd4911b1** (worktree /Users/Shared/Claude/wt/proto-linssiseppa-symbolit).
     Pohjana juna 508761e8 ja Natiivisepän natiiviseppa/symbolit-erikoismalli d1cba402.
   - Speksi docs/raportit/symbolit-ja-lippu-speksi-20260928.md:
     - symbolit näkyvät kertoimesta 1,25, koko 30 → 54 pt
     - perspektiivin ramppi 0,5
     - väistö kuvakortin säännöllä
     - lippu 120 pt saapumisnäkymässä, katto 50 %.
   - Kartta-testit 349/349.
   - Seuraavaksi käännös `sl linssiseppa/symbolit-lippu`, sitten `ajo-symbolit-koko.sh` ja `koosta_koko.py` (speksin §6).
     Kuvaparit (3 zoomia, ennen/jälkeen samasta käännöksestä) Fablelle ja merge-pyyntö Natiivisepälle; hän katselmoi
     ja mergeää, ja tieto on lähetetty.
   - **Natiiviseppä 28.9. klo 00.2x:** laatikkoleikkaus on valmis haarassa natiiviseppa/symbolit-erikoismalli **6cecf733**
     (d1cba402:n päällä), ja se yhdistyy ristiriidatta cd4911b1:een (yhdistetty puu: Kartta-testit 354/354, 0 virhettä).
     **Yhdistä 6cecf733 haaraan symbolit-lippu ennen käännöstä**, niin laitekuvissa on laatikkoleikkaus.
   - Hänen ErikoismallinAlla.SymbolinLaatikkonsa on samaa muotoa kuin SymbolienVaisto.Laatikko, joten ne voi myöhemmin
     yhdistää yhdeksi lähteeksi. A/B: `symbolit alla laatikko|jalka`.
3. **Astronautin kuvaselain** (omistajan toive 23.5x; Fable hyväksyi suunnan 00.0x: yksi galleria jatkuu naapurikohteeseen)
   - Proto-haara `linssiseppa/astro-selain` **c5b073cd** (worktree /Users/Shared/Claude/wt/proto-linssiseppa-astro).
   - Suositus docs/raportit/astronautin-kuvaselain-20260928.md. Linssit-testit 351/351.
   - Seuraavaksi käännös `as linssiseppa/astro-selain`, sitten `ajo-astro-selain.sh` (Etna ja Istanbul, ennen/jälkeen
     `ui linssi kuvaselain 0|1`, video selauksesta). Kuvapari ja video Fablelle ja merge-pyyntö Natiivisepälle.
   - Natiivi-UI katselmoi Kuvanakyma.cs:n (tieto lähetetty). Web on Pelikoodarin jonossa laattatyön jälkeen; naapurijärjestys
     tulee aineistoon tools-skriptillä, ja sen jälkeen natiivi lukee sen aineistosta (AstronauttiAineisto) eikä laske itse.
   - **Vastaus Fablen kysymykseen (huomaako pelaaja pyyhkäisyllä siirtyneensä toiseen kohteeseen):**
     - Kohteen vaihtuessa selitteen otsikko "Nimi — seutu" vaihtuu, ja pallo liukuu kuvan takana 0,9 s:ssa uuteen paikkaan.
     - Ensimmäisellä käynnillä kohteessa selite avautuu kokonaan 1,5 s:ksi (nimi ja teksti), joten vaihto näkyy selvästi.
     - Jo nähdyssä kohteessa nimipilleri päivittyy hiljaa (13 px, 70 % peitto), eikä vaihto välttämättä erotu.
     - Suositus kuvaparin jälkeen: kohteen vaihtuessa nimipilleri kirkastuu täyteen peittoon 1,2 s:ksi (150 ms häivytys),
       joten vaihto huomataan aina. Tätä ei ole vielä koodattu (tauko).
4. **Astronautin kameran seuraava erä: ISS-kyyti** (Fable: kirjataan seuraavaksi eräksi)
   - Suunnitelma docs/raportit/iss-linssi-suunnitelma-20260926.md (omistaja hyväksyi 26.9.).
   - **Nyt valmiina:** ISS todellisella radalla (SGP4, TLE ämpäristä data/iss-tle.json, masterissa) kaukonäkymän merkkinä
     ja maajälkenä.
   - **Puuttuu:**
     - seurantakamera ISS:n takana ja yllä (noin 1 200 km)
     - Cupola-ikkuna 420 km:stä (kenttäkulma noin 80°, horisontti 20,3° alhaalla, kallistus 55°)
     - Cupola-kehys UI-kerrokseen (media.matkakirja.app/karttanostot/20260926/iss-cupola-*, 6 PNG:tä)
     - vaihto yhdellä napautuksella.
   - Terminaattori ja yövalot ovat Natiivisepän osuus. Tee kuvaselaimen (kohta 3) jälkeen samaan linssiin.
5. **Symbolit erikoismallin alla:** Kinderdijkin laiteajon (jalka vs. laatikko) tekee **Natiiviseppä** yötauon jälkeen
   (hänen viestinsä 00.2x), joten se ei ole enää Linssisepän jonossa.
6. **Erä 6 (Olavinlinna, Geysir, Newgrange; omistaja hyväksyi 27.9. klo 23.4x)**
   - Opus-agentit mallinsivat harnesseissa proto-3d/tyokalut/mallinseppa-esikatselu-o1…o3. Ne **pysäytettiin tauon
     alkaessa 00.0x.**
   - **Tila:**
     - Speksit ovat valmiina docs/raportit/erikoismallit/{olavinlinna,geysir,newgrange}.md. Agentit kirjoittivat ne,
       eikä Linssiseppä ole vielä tarkistanut niitä.
     - Geysir.cs kääntyy (runko 532, LOD0 1 446, Lahi kesken).
     - Olavinlinna.cs on aloitettu.
     - Newgrange.cs puuttuu.
   - **Jatko:** käynnistä kolme Opus-agenttia uudelleen samoihin harnesseihin kehotteella
     "Read TEHTAVA-yhteinen.txt and TEHTAVA-malli.txt in your harness first, continue from the files", harnessi-polku
     mukaan. Tarkista sitten kuvat, integroi haaraan `mallinseppa/era6` (S/integroi.sh-kaava, -o.md kohta 1), käännä ja
     ota laitekuvat.

## 2. TEHTY TÄSSÄ SESSIOSSA (27.9. klo 23.1x – 28.9. klo 00.1x)

- **Erä 5** integroitu (kohta 1.1), ja erä 6 -ehdotus on hyväksytty (docs/raportit/erikoismallit/era6-ehdotus-20260927.md).
- **Lippu ja symbolit** (kohta 1.2):
  - uudet tiedostot SymbolienVaisto.cs (puhdas, testit 7) ja Symbolimallit.Vaisto.cs
  - pienet muutokset Natiivisepän tiedostoihin: Symbolimallit, Tasot23, ErikoismallinAlla, Lipputanko, NostoKerros
    (SaapumisKorkeusM) ja Komennot
  - Natiivi-UI:n NostotKartalla: merkin ruutu symbolin levyinen.
  - A/B: `symbolit vanha 1|0` ja `lipputanko ruutu|maailma`.
- **Kuvaselain** (kohta 1.3):
  - AstronauttiKierros.cs (lähin naapuri + 2-opt, myötäpäivään läntisimmästä)
  - AstronauttiLinssi (AvaaKohde, Naapuri ja KatsoNaapuri, kameran liuku)
  - Kuvanakyma (eleet, ‹ ›, liu'ut, esilataus) ja Linssit.uss (tausta 0,7, napit)
  - testikomennot `astro kuva|naapuri|kierros` ja `ui linssi selaa|kohde|kuvaselain`.
- **Fablelle ISS-kyydin tila** (kohta 1.4).
- **Worktreet (3/3):** era5, symbolit ja astro. Erä 4:n worktree on poistettu, koska erä 4 on junassa.

## 3. TYÖKALUT (uudet)

- `proto-3d/tyokalut/linssiseppa-ajot/ajo-symbolit-koko.sh`: kerroin kalibroidaan `aja`-komennolla ja `nostot tila`
  -rivin ZoomKerroin-arvolla. Kuvat tulevat kolmella zoomilla, ennen ja jälkeen, ja lisäksi video.
- `proto-3d/tyokalut/linssiseppa-ajot/koosta_koko.py`: kuvapari laitteen ruutuna, kerroin, kulma ja versio kuvaan, sekä
  yhteenveto.
- `proto-3d/tyokalut/linssiseppa-ajot/ajo-astro-selain.sh`: `linssi satelliitti`, sitten `astro kuva <tunnus>`,
  ennen/jälkeen `ui linssi kuvaselain 0|1` ja video selauksesta.
- `S/integroi.sh <harness> <Malli> <avain>`: kopioi mallin ja liikkeen, luo .meta-tiedostot ja lisää Luo-rivin. Kopioi
  se uuteen S:ään tai käytä polkua sellaisenaan.

## 4. OPIT

- **Kartta-testit ja Linssit-testit:** aja `bash kaanna.sh` eikä zsh:llä, koska zsh ei jaa $V:tä sanoiksi. Sama koskee
  harnessien kaanna.sh:ta.
- **Proto-gitissä ei ole origin-remotea:** haarat ovat paikallisia, ja natiivi-backup on GitHub-varmuuskopio. `git fetch
  origin` ei toimi siellä.
- **Yksi erä = yksi haara:** kirjoitin astronauttityön ensin symbolihaaran worktreehen, ja se siirrettiin omaan haaraansa.
  Luo uuden erän worktree ennen ensimmäistä tiedostoa.
