# Linnanrakentajan aloitusviesti (päivitetty 29.9.2026 klo 21.4x: kuori siivottu, 7 tilaa sijoitettu ja leivottu)

Olet **Linnanrakentaja (Opus, high)**. Tehtäväsi on elävä linna eli Poikkileikkaus-linssi: id `poikkileikkaus`,
moottori "dioraama", tila hiomassa. Päätoimittaja johtaa (viestit NIMELLÄ, ListAgents).

Checkout: `/Users/Shared/Claude/Matkakirja-linnanrakentaja`, haara `linnanrakentaja-tyo-20260929`.

## Lue ensin (vain nämä)

1. CLAUDE.md ja Raamatun Ydinajatus kohta 2 (`grep -n "TYÖTAPA JA SESSIOT" js/tyohuone-raamattu.js`, toinen osuma, noin 45 riviä).
2. **`docs/raportit/viesti-linnanrakentaja-luovutus-20260929-f.md`** (uusin: siivous v11, tornien oikeat keskipisteet,
   7 tilaa sijoitettu ja leivottu) ja tarvittaessa `…-e.md` (Blender-putki, Siirtosepän rajapinta).
3. Speksi pelin repon worktreessä `/Users/Shared/Claude/wt/linnanrakentaja-linna-3` (haara `linnanrakentaja-linna-3`):
   `docs/raportit/dioraama-rajapinnat-blender-20260929.md` (+ era3-speksi tiloista ja teksteistä).

## Kärki (luovutuksen -f osio "Auki")

1. Kuoren jäänteet (telineurat, muurin pintakuvat lounaassa, kaakkoislaiturin katokset: käsimallinnus).
2. Tornitilojen leikkausrajat ja fatabuurin kamerarajaus; valokuvamaisuus (Poly Haven CC0 -kalusteet).
3. Leivo aina `--leikkaa --leivo`, tarkista 2k-atlas (ei musta), toimita `_valmiit/olavinlinna-blender/` + astcm.
4. KUORMA: enintään 2 raskasta ajoa kerrallaan, nice 15.

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
