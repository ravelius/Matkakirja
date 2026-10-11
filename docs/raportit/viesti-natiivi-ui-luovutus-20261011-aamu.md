# Natiivi-UI: luovutus 11.10.2026 aamu (05.5x, PT:n nollaus 50 %)

Säännöt: viesti-natiivi-ui-luovutus-20261010-aamu.md. Edellinen: viesti-natiivi-ui-luovutus-20261011-aamuyo.md (yksityiskohdat).
Simut: iPhone 96044270-92AA-4BD3-BE2D-772C8495AB19, iPad F7513985-C8BC-4E97-8D29-9C9BD420E962. Ajot perl POSIX::setsid, yksi simu kerrallaan,
käännös/simu vain Julkaisijan NYT-viestillä (ehdolla "muita ≤ 1" vain kun Julkaisija sanoo). Todistusajo:
/Users/Shared/Claude/wt/proto-natiiviseppa-tyokalut/tyokalut/todistusajo/todistusajo.sh. Vanha scratchpad (skenaariot, ajoskriptit):
/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-natiivi-ui/776f93d0-c5bc-4255-bc56-7f58e1d13f0d/scratchpad

## Junassa 181 (PT kuittasi, Natiivisepällä)
- natiivi-ui/metro-kyltti-181 **0fb0ad5bf**: metrolinjan korostus 26 pt koko kohteen ajan, kipin kuvat iPhonella isommiksi, isoksi avattu
  kertomuskuva iPhonella 0,64 (iPad 0,46), kuvateksti pois isona. Kuvaparit todistus-metrokyltti-pari2- ja todistus-isokuva-sirut-pari-20261011.jpg.
- natiivi-ui/olavinlinna-dialogi-181 **98fab3e74** (⊃ olavinlinna-181 12c1bfb51 ⊃ 5d6742d58): B2 + B4 + historian otsikko turva-alueeseen +
  "Aloita alusta". Julkaisija kokoaa Olavinlinnan yhdistettynä. "Aloita alusta" todennetaan Laitetestaajan kierroksella.
- natiivi-ui/opas-sirut-181 **b65f6507b** (⊃ 2cb258340): oppaan kysymyksen valintasirut nappirivin yläpuolelle (Wien-jumi, todennettu
  3d1438b8d:llä) + kierrostoive ohittaa ikäkyselyn. AVOIN: todenna Wienissä junan 181 käännöksellä (sirut näkyvät, "Esittele kaupunki"
  ei avaa ikäkyselyä).

## KESKEN
1. natiivi-ui/maakortti-pysakki **c1a3d534e** (worktree wt/proto-natiivi-ui-maakortti, EI junaan ennen omistajan vastausta, aamun kortti):
   oman maan tyhjä napautus avaa kartussin maissa ilman pääkaupunkipistettä, ja maakunnan nostokortti ei avaudu samalla napautuksella
   (yläreunan lappu näkyy). Käännös **9c37e120a** valmis (app proto-3d/lokit/natiivi-ui-app-maakortti). Kuvapari puuttuu: Julkaisijan
   SIMULAATTORI NYT → zsh /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-natiivi-ui/776f93d0-c5bc-4255-bc56-7f58e1d13f0d/scratchpad/maakortti-simu.sh (skenaario maakortti.txt, Marseille, tap 254 322) → kuvat
   proto-3d/lokit/todistus-maakortti-iphone-*/kuvat → pari PT:lle → SIMU VAPAA. Edellinen pari (2137299e2, nostokortti peitti):
   todistus-maakortti-pari-20261011.jpg.
2. natiivi-ui/taidemuseo-ui **2e409cc62** (linssiseppa2/museo-180 2c92d79da:n päällä): tekijärivi Kehys.Paper + 18 pt, ui puu nimi = tooltip.
   LS2 todentaa omassa käännöksessään; jos tekijärivi on yhä heikko, seuraava askel PT:n kautta.

## Muuta
- Hiljaisuus linnan jälkeen = KERRAN LÄPI -linjaus (Pelikoodari), ei vika. Dialogin tausta ennallaan (PT).
- Appit levyllä: natiivi-ui-app-metro-181, -sirut-181, -maakortti → poista, kun juna 181 on TF:ssä ja maakortti kuvattu.
- Mergetyt worktreet voi poistaa junan 181 jälkeen: proto-natiivi-ui-lataus-poistu, -lahtokohde, -metro, -olavinlinna, -sirut.
