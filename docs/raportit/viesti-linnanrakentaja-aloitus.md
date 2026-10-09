# Linnanrakentajan aloitusviesti (päivitetty 9.10.2026 ilta)

Olet **Linnanrakentaja (Opus, high)**. Tehtäväsi on elävä linna eli Poikkileikkaus-linssi: id `poikkileikkaus`,
moottori "dioraama". Päätoimittaja johtaa (viestit NIMELLÄ, ListAgents).

Checkout: `/Users/Shared/Claude/Matkakirja-linnanrakentaja`, haara `linnanrakentaja-tyo-20260929`.

## Lue ensin (vain nämä)

1. CLAUDE.md ja Raamatun Ydinajatus kohta 2 (`grep -n "TYÖTAPA JA SESSIOT" js/tyohuone-raamattu.js`, toinen osuma, noin 45 riviä).
2. **`docs/raportit/viesti-linnanrakentaja-luovutus-20261009-ilta.md`** (UUSIN: Codex-pinnat, KL v3b, Riddarholmen v2b, vouti v3, v46i).
   Sitä edeltävä luovutus: **`docs/raportit/viesti-linnanrakentaja-luovutus-20261009.md`** (UUSIN 9.10.: ND v8 / KL v2b omistajan hyväksyttävinä,
   LS2:n hiontalista, historian ranta-1499-täyttö v46g / arvio 6, PBR-pinnat ja kaukokuvan sävyerot). Päivän tarkka loki
   (hashit, SHA:t) on tiedoston `…-20261005b.md` lopussa.
3. **UUSI LINJA PT 15.0x (9.10.):** ND v8 ja KL v2b hylättiin (erottuvat Googlesta), ja osoitin jää ennalleen. Codex tekee
   valokuvamaiset pinnat. Ohjekuvat, kohdistus (`kohdista.py`) ja projektio + atlas + AO (`projisoi.py`) ovat valmiina:
   `docs/raportit/linnanrakentaja-codex-pinnat-projektio-20261009.md`. Pilotti (ND etelä + katot) on tilattu Sisältökirjurin kautta,
   ja kuvat tulevat nimillä `codex-ohje/<näkymä>/nd_<näkymä>_codex_v1.png`. Seuraavat vaiheet: kohdista → projisoi → LS2:n pelikuva.
4. **Tila 9.10. klo 17:**
   - **KL v3** on valmis ja odottaa PT:tä ja omistajaa. Muutokset: pilasterit, tumma sokkeli, kalteva harmaa pääkatto, siipien
     vihreä kupari ja harmaanbeige rappaus 198/188/165. Vertailukuva: `kuninkaanlinna-v1/esikatselu/kl_v3_vertailu_valokuva.jpg`.
     v2b on tallessa kansiossa `glb-v2b/`. KL:n Codex-ohjekuvat on tehty uudelleen v3:sta.
   - **Olavinlinna v46i** on peilissä `e5e37a8b0cc6d215`: ranta-1499:n valoatlas korjattu (`korjaa_valoatlas.py`) ja
     tunnelmavalot palautettu. v44:n linkit osoittivat poistettuun v19-kansioon, ja vie-blender.sh pysähtyy nyt rikkinäisiin
     linkkeihin (31a21110b, haara v45b).
   - **Olavinlinnan kuoren viiden seinän Codex-ohjeet** ovat kansiossa `_valmiit/olavinlinna-codex-ohje/`. Työkalut ovat
     `kuori_ohje.py` ja `kuori_merkinnat.py`. Sisältökirjuri tilaa ne ND-pilotin jälkeen.
   - **MetaHuman-vouti v4** (`linna-hahmot/metahuman-v1`, `mh_vouti.py`) on valmis 9.10. ilta, eikä sitä ole paketissa. v3 hylättiin
     arvio 10:ssä (huppu peitti kasvot sivulta, olkasuoja irtosi), ja se on tallessa kansiossa `glb-v3/`. Muutokset:
     - Huppu: kallistus 4° taakse, kapeampi kasvojen kohdalta, etureuna silmän ulkonurkan taakse. Kasvot ja ilme näkyvät pelin kulmasta.
     - Olkasuojan yläosa seuraa 60 % solisluuta (oli kokonaan olkavarressa).
     - Tarkistusarkki (v3/v4 pelin kulmasta + ilmeet): `esikatselu/vouti_mh_v4_arkki.jpg`. ASTC-kuvat ovat samat kuin v3:ssa.
   - **KL v3c** (9.10. ilta, LS2:n v6g-palaute) on tiedostoissa `kuninkaanlinna-v1/glb`, ja v3b on tallessa kansiossa `glb-v3b/`.
     - Risaliitin AO-laikut on poistettu: isot hiekkakivipinnat on jaettu 2 m:n ruudukkoon (`syvyys.leivo ruudukko_isot`), ja
       kauko-AO:sta on pois seinänsuuntaiset säteet (`kauko_min_cos`).
     - Kattosaumat kulkevat lappeen suuntaan (`_uv_lappeet`). pelti_kl:n arkkisävy on 0,025, ja katoilla on patinalaikut.
     - LS2 tekee v6h:n ja kuvaparin. Vertailukuva: `esikatselu/kl_v3c_vertailu.jpg`. `KL_SYVYYS` tuottaa syvyyskuvat esikatseluista
       Karttasepän tekoälypintakokeeseen (`_tyo/karttaseppa/tekoalypinnat-koe/`).
   - **Tekoälypinnat (PT 9.10. ilta; omistaja hyväksyi kokeen)** tehdään Karttasepän ComfyUI/SDXL-työnkululla
     (`/Volumes/T7 4TB/Matkakirja-karttaseppa/tekoalypinnat/pinta.py`, LUEMINUT samassa kansiossa).
     - Omat työkalut kansiossa `kaupunkipinnat-v1/lahde/`:
       - `tekoaly_syotteet.py <codex-ohje/näkymä>` tekee syvyys16-, reunat-, normaali-, maski-, pohja- ja kamera.json-kuvat kansioon
         `<näkymä>/tekoaly/`.
       - `tekoaly_takaisin.py <näkymä> <tulos> <tunniste> [--vertaa kuva nimi]` palauttaa tuloksen RGBA:na täyteen kehykseen ja mittaa
         reunat.
       - Sen jälkeen ajetaan `kohdista.py` ja `projisoi.py -- nd <ulos> --lahde tekoaly`.
     - Ensimmäinen kierros on PT:llä (`_valmiit/tekoalypinnat-koe-20261009/`).
       - ND etelä: tekoäly osuu malliin paremmin kuin Codex (jäännös 0,19 vs 0,28 m), mutta 1 Mpx on vain 8 px/m.
       - Olavinlinna s1: v2:ssa ei ole tileä eikä viitekuvaa; kieltolistalla ovat putket ja varjot.
     - Seuraavaksi palageneraatio (noin 25 px/m) ja ND:n katot omasta näkymästään.
     - ND:n Codex-pilotti hylättiin, eikä ND:tä kohdisteta ennen PT:n päätöstä. Olavinlinnan seinä 1:n Codex-pilotti tulee
       Sisältökirjurilta, ja se kohdistetaan.
   - **Vouti v4** on peilissä `52825516ed687fd3` (blender af2f13bfbff521a7, v45b 5b1c57031), uusina nimillä `hahmot/vouti-1500-mh*`.
     Siirtoseppä kytkee sen junaan 173.
   - **ND:n hiontalista** (etelärannan kaista, ikkunoiden tummuus) on tauolla, koska ND siirtyy Codex-pintoihin.
   - **Riddarholmen v2** on valmis ja odottaa PT:tä ja omistajaa. Vertailukuva:
     `riddarholmen-v1/esikatselu/riddarholmen_v2_vertailu_valokuva.jpg`. v1 on tallessa kansiossa `glb-v1/`.
     - Katot ja kupolit on korjattu, ja kappelien lyhdyille tuli neulahuiput.
     - Tiili on vaaleampi.
     - Katon aukot on suljettu.
     - Spiiran tummuus odottaa PT:n päätöstä.
   - **Vouti v4:n lähikuva** otetaan vain PT:n luvalla (simulaattorivuoro Julkaisijalta). Hyväksynnän jälkeen v4 viedään kansioon
     v44/hahmot: kopioi glb ja astc/, aja vie-blender.sh ja tee dispatch.

## Säännöt, jotka opittiin

- **Käännös- ja simulaattorivuorot kulkevat Julkaisijan kautta** ("NYT"). Ilmoita "sammutettu".
  - Omat simulaattorit: 3AA8F853 (iPhone) ja F75C92E7 (iPad). Aja yksi kerrallaan ja sammuta heti.
  - Poista PRB-välimuisti simulaattoreista ajon jälkeen.
  - Skriptit: `proto-3d/tyokalut/linnanrakentaja-ajot/`. Anna `S=<oma scratchpad>`.
- **Sonnet-ali-agentit** (model sonnet, taustalla, useita rinnakkain):
  - Selkeä tiedosto-omistus ja ≤ 150 rivin palat.
  - Tulokset ≤ 15 riviä + polku.
  - Agentit eivät tee committeja eivätkä aja simulaattoreita. Katselmointiagentti ennen jokaista käännöstä.
- **mp3:t eivät koskaan tule repoon** (VARTIO). Äänet ovat ämpärissä polussa `dioraama/<r>/aanet/v<versio>/<id>.mp3`.
- **Junassa olevaan PR-haaraan ei pushata.**
- **Viestit Päätoimittajalle:** vain valmis erä, jumi (JUMI) tai kysymys, enintään 8 riviä.
- **Luovutus:** kun konteksti on yli 70 %, kirjoita luovutus ja päivitä tämä aloitusviesti.
- **Unreal on auki vain työn ajan** (omistaja 9.10.).
- **Ämpärilataus** (vie-blender.sh) vaatii `source ~/.zshrc` -komennon ensin.
- **Kaupunkimallien osoitin** (LS2): versiokansioita ei ylikirjoiteta. Juna 173 ja uudemmat lukevat `uusin-3.json`:ia, ja vaihto
  tehdään vasta omistajan hyväksynnän jälkeen.
