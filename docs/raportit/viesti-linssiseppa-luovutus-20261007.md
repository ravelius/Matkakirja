# Linssisepän luovutus 7.10.2026 klo 05.4x

Rooli: Linssiseppä (Opus, high). Proto-worktree: `/Users/Shared/Claude/wt/proto-linssiseppa-astro-auto`, jonka haarat ovat paikallisia proto-gitissä.
Tarkistus jokaisessa haarassa: `Linssit-testit/kaanna.sh` ja `Linssit-testit/unity-tarkistus.sh`. COZY-haaroille `unity-tarkistus` ajetaan COZY-dll:n
kanssa: scratchpadin `kaanna-cozy.sh` → `MATKAKIRJA_KIRJASTOT=…/kirjastot-cozy`, ja DEF_YHT:hen lisätään `COZY_URP`.

## Juna 156: VIE-savu OK 05.33 (Natiivisepän runko 4055dc77, käännös 79d8ba7c)

Haara `linssiseppa/juna-156` **8faa57f56**, joka on Natiivisepän rungossa 4055dc77 sisältää:
- master BUILD 154
- `esilataus-156`: esilataus, latauskuva, Seuraava, pehmeät lennot, kierros-kenttä #4086 ja esikameran Googlen ehtorajat kommenttina
- `yovalot-154`: yövalot v5 sekä tiet_polut ja tiet-v2
- `giza-omat-mallit`: Gizan mekanismi, oletuksena pois
- `natiiviseppa/maasto-rako` 18a9e4d3

Todistus: `proto-3d/lokit/linssiseppa-juna156-todistus-20261007/TODISTUS.md`. VIE-savu tehtiin oikeilla napautuksilla: `linssiseppa-opas-vie156b-20261007/polku.log`.
- Viimeinen korjaus koskee Seuraava-nappia. Kierroksen ulkopuolella ja viimeisen kohteen jälkeen Seuraava jatkaa kaupungin kohdelistan näkemättömiin kohteisiin, ja kun lista on käyty, se lähettää workerille toiveen. Aiemmin worker vastasi "odota" ja opas jumittui.
- Opas löytyy taikalasit-napista → LINSSIT → "Elävä opas".

Kuittaukset:
- Päätoimittaja kuittasi lennot, esilatauksen ja yövalot v5. Yövaloja koskee ehto: iPadin muisti ja kehysaika mitataan, kun Wi-Fi toimii (fyysinen iPad 00008103, scratchpadin `ipad-yovalot.sh`).
- Eiffelin VIE-este on korjattu ja todennettu (`linssiseppa-eiffel2-20261007/kuvat/stillit-2x2.png`).
  - Juurisyy: Kerro lisää -oikotie (sama paikka alle 50 m) jätti valinnan tai Liikun arviokohteen katukehyksen (143 m) workerin oikealle kohteelle.
  - Lisäksi maa otetaan nyt kehän mediaanista (r 35–60 m) eikä keskipisteestä, joka osui torniin tai kattoon.
- Korkea kohde (≥ 60 m) mahtuu kokonaan kuvaan. Etäisyys lasketaan pystynäkökentästä, yläraja on 1 200 m, ja lähemmäs-vaihe ja dolly eivät mene pienintä mahtuvaa etäisyyttä lähemmäs. Eiffel kehystetään 854 m:stä; todennus: `linssiseppa-eiffel3-20261007/kuvat/stillit-2x2.png`.

## Juna 157 (valmis, odottaa junaa)

`linssiseppa/sallitut-157` 4af2338e0 (sisältää juna-156:n 8faa57f56 ja NykyinenKaupunkiId:n Siirtosepän äänimaisemalle; NUI:n versio natiivi-ui/sallitut-157b eb6f860f) (omistaja 7.10. 00.4x, vain sallitut kaupungit):
- OpasSallitut lukee listan /opas/aineistot-vastauksen kentästä `sallitut`, ja viimeisin lista säilyy levyllä.
- Pelaajan kohde sallitun alueen ulkopuolella torjutaan siltalauseella `ei-sallittu`. Jos ääni ei soi, NUI:n TorjuntaTeksti näyttää tekstin.
- Vapaa lento pysähtyy pehmeästi alueen reunaan.

NUI:n osa on `natiivi-ui/sallitut-157` 0f770be2. LS2:n lista on tiedostossa `proto-3d/lokit/linssiseppa2-3d-kattavuus/sallitut-3d.json`: 36 sallittua ja 5 RAJA-kaupunkia, joista RAJA torjutaan (Päätoimittaja). Pelikoodari tarjoilee listan ja generoi `ei-sallittu`-lauseet; Päätoimittaja hyväksyy tekstin. Haaraan on jo mergetty juna-156 8faa57f56. Siirtosepän aanimaisema-haaran kanssa ristiriita on samassa kohdassa, ratkaisu 7d00ec3c.

## Giza (omistaja 6.10. 23.35, Päätoimittajan lupa)

- Googlen ehdot on tarkistettu: omat 3D-objektit ovat sallittuja, kun niitä ei ole johdettu Googlen tiilistä.
- Työkalu `tyokalut/omat_mallit_tileset.py` muuntaa Linnanrakentajan GLB:t (`_valmiit/giza-v1`) 3D Tilesiksi. Testiin tiedostot kopioidaan kansioon Documents/omat-mallit.
- Leikkauksen juurisyy on korjattu 72cc68be: materialKey "Clipping" asetetaan ajonaikaisesti. **Korjausta ei ole vielä todennettu simulla** (testitiedosto `leikkaus-paalle`). Leikkaus on oletuksena pois, kunnes Päätoimittaja näkee ennen/jälkeen-kuvan.
- Kheopsin LOD0:n pinnat näkyivät valkoisina leikkauskuvassa. Tarkista tämä Linnanrakentajan kanssa todennuksen jälkeen.
- Linnanrakentajalle on lähetetty kulmakorkeudet. Giza on tauolla omistajan palautteeseen asti.

## COZY (Päätoimittaja: vasta junan 156 jälkeen)

- `linssiseppa/cozy-kaupunki` a010dc9a + 44b590d7: KaupunkiSaa (`#if COZY_URP`, oletuksena pois, Documents/kaupunki-saa.txt) ja kevennys `tyokalut/cozy_kevenna.py`, jolla appi kasvaa +68 Mt.
- Siirtosepän `siirtoseppa/cozy-linna` 24eacd5a on tämän päällä.
- Koe on kirjattu (`linssiseppa-cozy-20261007`). Vaihtoehto A (taivas ja pilvet) toimii, mutta oletusprofiili ei kelpaa: tarvitaan pehmeät pilvet ja ilmaperspektiivi horisonttiin. Sumu (B) on liian tiheä ja pitää sitoa korkeuteen. Sade ei näkynyt (selvitä partikkelit).
- Seuraavaksi: kaupunkiprofiili kansioon Assets/Matkakirja/Saa/kaupunki.

## Muut

- Mac: `linssiseppa/mac-kaupunki` c3f2ff1c (MacLaatu CesiumKaupunkiin). Natiiviseppä on mitannut sen.
- Akropolis-kolmikon kulmavirhe johtui PalloKierron maaston raosta. Natiiviseppä teki MaastoRakoPois-kytkimen, ja kulma on todennettu identtiseksi.
- Simulaattorit 3A3E4671, D0D2CD1E ja 903C2B91 on tyhjennetty (erase) levyn vapauttamiseksi, ja ne ovat sammutettuina.
