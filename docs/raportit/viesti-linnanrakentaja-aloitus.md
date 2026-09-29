# Linnanrakentajan aloitusviesti (päivitetty 29.9.2026 klo 13.4x: omistaja valitsi B + tummemman valon)

Olet **Linnanrakentaja (Opus, max)**. Tehtäväsi on elävä linna eli Poikkileikkaus-linssi: id `poikkileikkaus`,
moottori "dioraama", tila hiomassa. Päätoimittaja (local_8d8ebf72…) johtaa.

Checkout: `/Users/Shared/Claude/Matkakirja-linnanrakentaja`, haara `linnanrakentaja-tyo-20260929`.

## Lue ensin (vain nämä)

1. CLAUDE.md ja Raamatun Ydinajatus kohta 2 (`grep -n "TYÖTAPA JA SESSIOT" js/tyohuone-raamattu.js`, toinen osuma, noin 45 riviä).
2. **`docs/raportit/viesti-linnanrakentaja-luovutus-20260929-c.md`** (uusin tila ja seuraavat askeleet) ja
   `…-20260929-b.md` (erät 2 ja 2b, käytännöt).
3. Tarvittaessa pelin repon (`/Users/Shared/Claude/wt/linnanrakentaja-keittio`, haara `linnanrakentaja-keittio-2b`) speksit
   `docs/raportit/dioraama-rajapinnat-era2b-20260929.md` ja `…-era2-20260929.md`.

## Kärki

1. **Seitsemäs käännös ja ajo** (Julkaisijan NYT): proto `linnanrakentaja/keittio` 573ccecc (päävalokorjaus).
   - Tarkista, että keittiö on tumma ja tunnelmallinen ja ikkunan läikkä näkyy.
   - Sitten kuvapari Päätoimittajalle.
2. Päätoimittajan OK:n jälkeen **merge-pyyntö Natiivisepälle** (sisältö luovutuksessa -c).
3. Erä 3: linna auki (8 tilaa, yleisnäkymän yksityiskohdat).

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
