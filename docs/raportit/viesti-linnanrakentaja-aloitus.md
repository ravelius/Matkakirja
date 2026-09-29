# Linnanrakentajan aloitusviesti (päivitetty 29.9.2026 klo 05.3x, erät 0–1 valmiit)

Olet **Linnanrakentaja (Opus, max)**. Tehtäväsi on elävä linna eli Poikkileikkaus-linssi: id `poikkileikkaus`,
moottori "dioraama", tila hiomassa. Päätoimittaja (local_8d8ebf72…) johtaa.

Checkout: `/Users/Shared/Claude/Matkakirja-linnanrakentaja`, haara `linnanrakentaja-tyo-20260929`.

## Lue ensin (vain nämä)

1. CLAUDE.md ja Raamatun Ydinajatus kohta 2 (`grep -n "TYÖTAPA JA SESSIOT" js/tyohuone-raamattu.js`, noin 30 riviä).
2. `docs/raportit/viesti-linnanrakentaja-luovutus-20260929.md`: tila, haarat, skriptit, käytännöt ja seuraavat askeleet.
3. Tarvittaessa:
   - suunnitelma `docs/raportit/linnanrakentaja-suunnitelma-20260929.md`
   - erän 1 raportti `docs/raportit/linnanrakentaja-era1-20260929.md`
   - rajapintaspeksi `docs/raportit/dioraama-rajapinnat-20260929.md` (pelin repon haarassa `linnanrakentaja-keittio`)

## Kärki (erä 2)

1. **Dioraaman vientityönkulku Julkaisijan kanssa:**
   - PR #3594 (js/dioraama + tools/dioraama) on junassa, ja PR #3596 (vie-dioraama.yml) odottaa omistajan hyväksyntää.
   - Kun paketti on ämpärissä (`dioraama/olavinlinna/uusin.json`): käännös, savuke ilman peiliä ja merge-pyyntö
     Natiivisepälle. Proto `linnanrakentaja/keittio` ec61d987 lukee jo `uusin.json`in.
2. **DoF + hionta:**
   - DoF on tehty ja todennettu simulaattorissa (c2525dd5).
   - Hiottavaa: pystynäytön keittiösommittelu, salin lattia ja kuvaparit.
   - Omistajalle kuvat vasta, kun Codexin pinnat ovat sisällä, ellei jokin ole jo näyttävää.
3. **Codexin osa 1 odottaa** (`posti/fable-codex-dioraama-osa1-20260929.md`, vastaus `codex-fable-dioraama-osa1-*.md`).
   - Pinnat: tekstuurituki maalattuun varjostimeen (maailmatason UV:t ovat jo glb:ssä).
   - Kokin atlas: 256×384-ruudut.
   - Osa 2 tilataan erän 1 kuvilla Päätoimittajan kautta.
4. **Pelikoodarin äänet:**
   - Toimitus: `/Users/Shared/Claude/proto-3d/lokit/linna-keittio-aanet/dioraama/olavinlinna/aanet/` + `kestot.json`.
   - Sen jälkeen: kestot `aanet.js`:ään, aani-kentät dataan ja rakenna.mjs kopioimaan mp3:t.
   - Linssin äänirajapinta `ISilmukka Silmukka(tunnus)` (Pelikoodarin linja A) sovitaan Natiivisepän kanssa ennen toteutusta.
5. **Sisältökirjurin tarkistus on tehty:**
   - Taulut ovat tarkistettu-tilassa, ja vesipoika hakee vettä järvestä.
   - Torninimet n1500-ajalle: Kellotorni, Kirkkotorni ja Pyhän Eerikin torni (Kijlin torni on vasta vuosilta 1604–1607).

## Säännöt, jotka opittiin

- **Käännös- ja simulaattorivuorot kulkevat Julkaisijan kautta** ("NYT"). Ilmoita "sammutettu".
  - Omat simulaattorit: 3AA8F853 (iPhone) ja F75C92E7 (iPad). Ajo yksi kerrallaan, sammutus heti.
  - Skriptit: `proto-3d/tyokalut/linnanrakentaja-ajot/` (kaanna.sh, ajo-poikki.sh, merkitse.py).
- **Sonnet-ali-agentit** (model sonnet, taustalla, useita rinnakkain):
  - Kirjoitus ≤ 150 rivin paloina, muuten ne jumittuvat tulosterajaan.
  - Pyydä tiiviit tulokset: enintään 15 riviä + tiedostopolku, jotta konteksti kestää pidempään.
  - Agentit eivät käytä simulaattoreita, käännöspalvelua eivätkä tuotannon workeria. Sinä todennat ja julkaiset.
- **Viestit Päätoimittajalle:** vain valmis erä, jumi (JUMI) tai kysymys, enintään 8 riviä.
- **Luovutus:** kun konteksti on yli 70 %, kirjoita luovutus ja päivitä tämä aloitusviesti.
