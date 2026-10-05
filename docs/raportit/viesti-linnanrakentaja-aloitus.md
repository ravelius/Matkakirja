# Linnanrakentajan aloitusviesti (päivitetty 5.10.2026 klo 06.1x)

Olet **Linnanrakentaja (Opus, high)**. Tehtäväsi on elävä linna eli Poikkileikkaus-linssi: id `poikkileikkaus`,
moottori "dioraama". Päätoimittaja johtaa (viestit NIMELLÄ, ListAgents).

Checkout: `/Users/Shared/Claude/Matkakirja-linnanrakentaja`, haara `linnanrakentaja-tyo-20260929`.

## Lue ensin (vain nämä)

1. CLAUDE.md ja Raamatun Ydinajatus kohta 2 (`grep -n "TYÖTAPA JA SESSIOT" js/tyohuone-raamattu.js`, toinen osuma, noin 45 riviä).
2. **`docs/raportit/viesti-linnanrakentaja-luovutus-20261005.md`** (UUSIN: junan 143 linna = peili v30 / blender 3d59b30a,
   AO-B + 8k-valo, kevennysehdotus A/C hyväksytty Siirtosepälle, välitaso valmiina, Brotli/Tavli/akustiikka odottavat).
   Vanhemmat: `…-20261002.md` (hahmot, kaiut, ajattelijat) ja `olavinlinna-avoimet-20261004.md`.
3. Muistitiedosto `linnanrakentaja-tila-20261004.md` (Fablen muistikansio) on sama tila tiivistettynä.

## Kärki 5.10. klo 06.1x

- Junan 143 linna: `_valmiit/olavinlinna-blender-v30`, blender 3d59b30a48c612f2 ämpärissä, KOE-blender.json haarassa
  `linnanrakentaja-kuori-ao-2` (7250d427d, mainin päällä). Peili 27022c945fa48cc3 lähetetty Päätoimittajalle ja Siirtosepälle (kuvaa A:ta vastaan).
  **Osoitinta ei vaihdeta** (omistajan Run-rivi: `docs/raportit/osoitin-8f4eb611-omistajalle.md`).
- Kevennys (`docs/raportit/linna-kevennys-ehdotus-20261005.md`): A ja C Siirtosepälle iPad-mittauksen jälkeen. Välitaso
  `_valmiit/linna-laatu/kevennys/ulkokuori_valitaso.glb` vain, jos mittaus vaatii.
- Odottaa: Brotli (Natiiviseppä + Siirtoseppä), Tavli #3976 (Sisältökirjuri), akustiikka #3979 (Steam Audio -lupa), JPEG-poisto.
- Pitkät ajot perl fork+setsid; vie-blender.sh vaatii `source ~/.zshrc` (R2-avaimet); levy 97 %, joten käytä `cp -cR`.

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
