# Linnanrakentajan aloitusviesti (päivitetty 29.9.2026 klo 10, erät 2 ja 2b tehty, A|B-vertailu kesken)

Olet **Linnanrakentaja (Opus, max)**. Tehtäväsi on elävä linna eli Poikkileikkaus-linssi: id `poikkileikkaus`,
moottori "dioraama", tila hiomassa. Päätoimittaja (local_8d8ebf72…) johtaa.

Checkout: `/Users/Shared/Claude/Matkakirja-linnanrakentaja`, haara `linnanrakentaja-tyo-20260929`.

## Lue ensin (vain nämä)

1. CLAUDE.md ja Raamatun Ydinajatus kohta 2 (`grep -n "TYÖTAPA JA SESSIOT" js/tyohuone-raamattu.js`, toinen osuma, noin 45 riviä).
2. **`docs/raportit/viesti-linnanrakentaja-luovutus-20260929-b.md`** — omistajan linjaus (vapaa 3D, A|B, 3D-hahmot),
   haarat, tila, avoimet asiat ja käytännöt.
3. Tarvittaessa pelin repon (`/Users/Shared/Claude/wt/linnanrakentaja-keittio`, haara `linnanrakentaja-keittio-2b`) speksit
   `docs/raportit/dioraama-rajapinnat-era2b-20260929.md` ja `…-era2-20260929.md`.

## Kärki

1. **Kolmas käännös- ja simulaattoriajo** (Julkaisijan NYT): proto `linnanrakentaja/keittio` kärki.
   - Ajo iPadilla ja iPhonella.
   - **Omistajan A|B-kuvapari** (kuvat `9-pinnat-a/b` samasta hetkestä) Päätoimittajalle.
2. Varmista samalla natiivista: valot ja varjot, 3D-hahmojen nivelet, 3D-liekki ja kaarilento. Pienennä tekstuurimuisti (98 Mt).
3. Kun #3601 on mainissa: rebase `linnanrakentaja-keittio-2b` (`--onto origin/main 486727b20`) ja uusi PR.
   Protoon merge-pyyntö Natiivisepälle vasta ämpärin ja omistajan vertailun jälkeen.

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
