# Linnanrakentajan luovutus 9.10.2026 ilta (konteksti 66 %, nollaus PT:n pyynnöstä)

Edellinen luovutus on `viesti-linnanrakentaja-luovutus-20261009.md` (iltapäivä).

## Kesken ja odottaa (järjestyksessä)

1. **Codex-pinnat (PT 15.0x: ND v8 ja KL v2b hylättiin, osoitin ennallaan).** Suunnitelma ja tilausohje ovat tiedostossa
   `docs/raportit/linnanrakentaja-codex-pinnat-projektio-20261009.md`.
   - Pilotti (ND etelä + ND katot) on tilattu Codexilta (Sisältökirjuri, posti 4b667b8d5). Kuvat tulevat nimellä
     `notre-dame-v1/codex-ohje/<näkymä>/nd_<näkymä>_codex_v1.png`.
   - Kun kuvat tulevat:
     1. Aja `kohdista.py`. Tulos menee kansioon `<näkymä>/kohdistetut/`.
     2. Aja `projisoi.py nd <ulos> --lahde codex`.
     3. Esikatsele ja vie tulos LS2:lle pelikuvaan.
     4. Kerro Sisältökirjurille, että pilotti on kohdistunut, jolloin loput ND, KL ja Olavinlinna tilataan.
   - Työkalut (`_valmiit/kaupunkipinnat-v1/lahde/`):
     - `ortho_ohje.py` (Blender): passit.
     - `ortho_merkinnat.py` (venv-rembg): maskit, ohjekuvat ja mitat.
     - `kohdista.py` (venv-rembg): NCC-aukot ja TPS.
     - `projisoi.py` (Blender): suorakaideatlas, näkyvyys ja AO.
     - Ajokomennot ovat tiedostojen otsakkeissa. Python, jossa on numpy, PIL, scipy ja cv2:
       `/Users/Shared/Claude/proto-3d/_lahteet/venv-rembg/bin/python`.
   - Testattu puhdas-kuvilla:
     - ND-atlas on 7,15 cm/px ja KL-atlas 6,25 cm/px (4096²).
     - Kohdistus hyväksyi siirretyn kuvan (jäännös 0,05 m). Siniaallolla vääristetty kuva korjautui 0,41 m:stä 0,16 m:iin.
   - **Avoinna:**
     - KL:n sisäpihalle (4) ja itäsiipien välille (2) tarvitaan lisänäkymät.
     - KL:n isot rappausnelikulmiot pitää tihentää ennen projektiota.
     - KL:n osien kokoaja (limityksen häivytys) on vielä tekemättä.
   - **Ohjekuvat:** ND 6 näkymää, KL 5 näkymää + 14 osaa (tehty uudelleen KL v3:sta ja sisältävät sokkeliluokan 11).
     Olavinlinnan kuoren 5 seinää ovat kansiossa `_valmiit/olavinlinna-codex-ohje/` (`kuori_ohje.py` ja `kuori_merkinnat.py`,
     Siirtosepän `ruudut.json`, glTF-kehys).
2. **KL v3b ja Riddarholmen v2b ovat LS2:lla** vientiä ja pelikuvaparia varten. PT on kuitannut molemmat. Osoitin vaihdetaan vasta
   omistajan hyväksynnän jälkeen. Molempien vanhat versiot ovat tallessa kansioissa `glb-v2b/` ja `glb-v1/`.
   - KL v3:
     - Rappaus on harmaanbeige `rappaus_kl3`.
     - Sokkeli on `sokkeli_kl`, ja `JB.julkisivu(pilasterit=True)` tekee pilasterit.
     - Pääkatto on `harjarengas()` + `pelti_kl`. Siipien katot ovat `kupari_kl`.
     - Ikkunoiden hehku on 0,12.
   - Riddarholmen v2:
     - Pinnat: `kupari_ridd_laiva`, `kupari_ridd_tumma` (kappelien katot omana `kappelikatot`-esineenä) ja `kupari_ridd_sivu`.
     - Kappelien lyhdyillä on neulahuiput. Tiili on sävytetty `savytetty()`-funktiolla.
     - `harjakatto_reunoista()` sulkee katon itäpään aukon, ja pulpettikattojen päätykolmiot on muurattu.
     - Spiirassa on ydinkartio (PT kumosi aiemman "läpikuultava"-linjauksen).
   - AO (v3b ja v2b): `syvyys.leivo(..., kauko=(8.0, 0.55), ao_min=0.4, ruutu_m=2.0)` COLOR_0:aan. Vertailu:
     `kuninkaanlinna-v1/esikatselu/ao_v3b_vertailu.jpg`.
   - Vertailukuvat:
     - `kuninkaanlinna-v1/esikatselu/kl_v3_vertailu_valokuva.jpg`
     - `riddarholmen-v1/esikatselu/riddarholmen_v2_vertailu_valokuva.jpg`
     - Riddarholmenin vertailukuva on Commonsista: "Riddarholmen February 2013 01".
3. **MetaHuman-vouti v3** (`linna-hahmot/metahuman-v1`, `mh_vouti.py`):
   - Huppu on nostettu ja venytetty niskaan.
   - Morph-painot ovat 0. Peli ei lue niitä, joten tämä on varmistus.
   - jawOpen ei enää näytä piikkejä. Korjaukset: indeksikartoitus, ihon kärjet normaalin mukaan ja hampaat jäykkinä.
   - Uudet ASTC-kuvat on tehty. Tarkistusarkki: `esikatselu/vouti_mh_v3_arkki.jpg`.
   - PT antoi luvan yhteen simulaattoriajoon. Siirtosepän seuraaja ottaa lähikuvan arvio 10:n jälkeen. Sen jälkeen vouti viedään
     kansioon v44/hahmot: kopioi glb ja astc/, aja vie-blender.sh ja tee dispatch.
4. **Olavinlinna v46i** on peilissä `e5e37a8b0cc6d215` (blender 95aa0371cf569c04, haara v45b 9ba400b92), ja Siirtoseppä kytkee sen.
   - Sisältö: ranta-1499:n valoatlas on korjattu työkalulla `olavinlinna-kavely-v1/lahde/korjaa_valoatlas.py`, jossa lattia on 0,6
     ja täyttö on mukana.
   - v46h:sta puuttuivat tunnelmavalot, koska v44:n linkit osoittivat poistettuun v19-kansioon. Tiedostot on palautettu ämpäristä
     kansioon v41/valot (sha256 tarkistettu), ja v44 linkittää niihin.
   - `vie-blender.sh` pysähtyy nyt rikkinäisiin linkkeihin (31a21110b, haara v45b), ja muutos kulkee junan kautta.
   - Lounaispuolen musta oli kuoren kuvaamattomia tekselejä, ei ranta-atlasta. Siirtoseppä korvaa ne historiassa varjostimella.

## Opit tältä päivältä

- **Fotogrammetrian ja OSM:n mallit:**
  - Väärinpäin olevat normaalit: projektorin valinta tehdään |n·v|:llä ja näkyvyystestillä, ja kolmiot käännetään kohti kameraa
    ennen AO:ta.
  - Maan alle jäävät näytteet (helma) eivät saa äänestää näkyvyydestä.
- **Ilmeiden siirto kevennettyyn verkkoon:** sijaintikartoitus sekoittaa päällekkäiset kärjet (hampaat ja kiinni olevat huulet).
  Käytä indeksiattribuuttia ja normaaliin perustuvaa valintaa.
- **Commons:** robots.txt kieltää /w/-polun (API), mutta /wiki/-sivut ja Special:FilePath kelpaavat yksittäishakuun. Käyttäjän
  sähköpostia ei laiteta User-Agentiin.
- **Symlinkit** `_valmiit`-versiokansioissa voivat rikkoutua levysiivouksessa. Tarkista `find -L … -type l` ennen vientiä.
