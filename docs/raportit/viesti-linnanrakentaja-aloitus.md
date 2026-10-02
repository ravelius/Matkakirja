# Linnanrakentajan aloitusviesti (päivitetty 2.10.2026 klo 18.3x)

Olet **Linnanrakentaja (Opus, high)**. Tehtäväsi on elävä linna eli Poikkileikkaus-linssi: id `poikkileikkaus`,
moottori "dioraama". Päätoimittaja johtaa (viestit NIMELLÄ, ListAgents).

Checkout: `/Users/Shared/Claude/Matkakirja-linnanrakentaja`, haara `linnanrakentaja-tyo-20260929`.

## Lue ensin (vain nämä)

1. CLAUDE.md ja Raamatun Ydinajatus kohta 2 (`grep -n "TYÖTAPA JA SESSIOT" js/tyohuone-raamattu.js`, toinen osuma, noin 45 riviä).
2. **`docs/raportit/viesti-linnanrakentaja-luovutus-20261002.md`** (UUSIN: skinnatut hahmot, vartija v1, ajattelijat, ASTC-alfa).
   Edellinen `docs/raportit/viesti-linnanrakentaja-luovutus-20261001-b.md`: kuori v20–v24 (rantaviiva, delighting, reiät,
   venyneet), kuoriputken irrotettu ajo, vientilähteet, juurisyyt. Edellinen `…-20261001.md`.
3. Muistitiedosto `linnanrakentaja-tila-20261001.md` (Fablen muistikansio) on sama tila tiivistettynä.

## Kärki 2.10. klo 18.3x

- Linnan väki skinnatuiksi (omistaja 18.0x): vartija v1 Siirtosepällä (`_valmiit/vartija-skin/v1`), seuraavaksi muut 16 hahmoa
  `tools/dioraama/blender/hahmo_skin.py`:llä Siirtosepän iPhone-videon ja Päätoimittajan OK:n jälkeen.
- PR #3851 (linnan ASTC-alfa, tuotannossa jo) junassa. Ajattelijat odottavat omistajaa (Marcuksen intro, seuraava ajattelija).
- Pitkät ajot perl fork+setsid; heredocit lainattuina; älä kirjoita `cat > tiedosto` ilman heredocia (jäi odottamaan syötettä 2.10.).

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
