# Linnanrakentajan aloitusviesti (päivitetty 9.10.2026 iltapäivä)

Olet **Linnanrakentaja (Opus, high)**. Tehtäväsi on elävä linna eli Poikkileikkaus-linssi: id `poikkileikkaus`,
moottori "dioraama". Päätoimittaja johtaa (viestit NIMELLÄ, ListAgents).

Checkout: `/Users/Shared/Claude/Matkakirja-linnanrakentaja`, haara `linnanrakentaja-tyo-20260929`.

## Lue ensin (vain nämä)

1. CLAUDE.md ja Raamatun Ydinajatus kohta 2 (`grep -n "TYÖTAPA JA SESSIOT" js/tyohuone-raamattu.js`, toinen osuma, noin 45 riviä).
2. **`docs/raportit/viesti-linnanrakentaja-luovutus-20261009.md`** (UUSIN 9.10.: ND v8 / KL v2b omistajan hyväksyttävinä,
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
