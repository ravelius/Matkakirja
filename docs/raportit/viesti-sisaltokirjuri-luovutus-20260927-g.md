# Luovutus: Sisältökirjuri 27.9.2026 klo ~15.0x (kontekstin nollaus, 70 %)

Edellinen: `viesti-sisaltokirjuri-luovutus-20260927-f.md`. Tämä on
**kontekstinnollausluovutus** — Postivahti mittasi 70 %, Fable käski
nollauksen. Uusi sessio jatkaa samalla checkoutilla
(`/Users/Shared/Claude/Matkakirja-sisaltokirjuri`, haara
`sisalto-pelikatalogi-20260927`).

## 1. Lue ensin

1. `CLAUDE.md`
2. `docs/roolitus.md`
3. Tämä raportti kokonaan
4. Työtila: `/Users/Shared/Claude/wt/sisaltokirjuri-euroopan-ohuimmat`
   (haara `sisaltokirjuri-euroopan-ohuimmat`) — käytä tätä samaa
   worktreeta jatkoerälle, ÄLÄ luo uutta ennen kuin PR #3419 on
   mergetty.

## 2. Tila

**main = liikkuu nopeasti** (useita rinnakkaisia PR-junia) — aja
`git fetch origin main` ENNEN mitään versionumeron valintaa tai
rebasea.

| PR | Sisältö | Tila |
|---|---|---|
| #3418 | Havainnekuva-sana yhtenäistetty tekoälykuvien teksteissä | **MERGETTY** |
| #3413 | Nähtävyyskuvien tasaus tuotantoon | **MERGETTY** — TARKISTA ONKO JULKAISTU (ei vain mergetty, ks. kohta 5) |
| #3419 | Euroopan ohuimmat kaupungit, 3 committia (ks. alla) | AVOIN, MERGEABLE, Julkaisijan junassa |

**PR #3419:n sisältö (3 committia):**
1. Valletta + Luxemburg: 2 juttua (Vallettan wiki-only-pisteet:
   Pyhän Johanneksen ko-katedraali/Caravaggio, Pyhän Elmon linnake)
   + 4 skandaalia (MLT: Caravaggion karkotus 1608, Napoleonin
   kirkkohopean ryöstö 1798; LUX: Marie-Adélaïden luopuminen 1919,
   Radio Luxembourg 1933) — MLT/LUX olivat uusia maita
   skandaalit.js:ssä, vaativat kiintiön minimin 2/maa.
2. Lappi/Sisilia/Kreeta: uusi lehtiaihe kullekin (Saamelaiskulttuuri,
   Kuvataide, Historia — 4 nostoa + minitehtävä).
3. Islanti/Alpit/Tromssa/Marseille/Riika: uusi lehtiaihe kullekin
   (Historia×4, Musiikki×1 Riialle).

**Kaikki testit vihreät koko ajan** (4458/0 fail viimeisimmässä
ajossa), `tarkista-kaksoisavaimet` puhdas, build onnistui.

## 3. Menetelmä ja mittari (Fablen hyväksymä, jatkuu samana)

Tavoite: nostaa Euroopan lehtikaupunkien mediaania kohti
(aiheet/lehtinostot/NAHTAVYYSJUTUT-jutut/kulttuurinostot). Mittari ja
koko 50 kaupungin ranking-skripti — **kirjoita uudestaan tarvittaessa**
(ei tallennettu tiedostona, scratch-skripti poistettiin):

```js
import { EUROPE } from './js/packs/europe.js';
import { KAUPUNKIKARTAT } from './js/packs/maakartat.js';
import { NAHTAVYYSJUTUT } from './js/packs/nahtavyysjutut.js';
import { kohdekarttojenNostot } from './tools/tarkista-nostopaikat.mjs';
import { KULTTUURI_KATEGORIAT } from './js/packs/kulttuuri-kategoriat.js';
// summa = aiheet + lehtinostotYht + jutut + kulttuurinostot, sort asc
```
(täysi skripti tämän session transkriptissä, tai kirjoita uudestaan —
looginen rakenne on: filtteröi vain kaupungit joilla on
KULTTUURI_KATEGORIAT-alkio, laske em. neljä lukua per kaupunki.)

**JÄLJELLÄ RANKINGISTA (summa-järjestyksessä, jo tehdyt yliviivattu):**
~~valletta, luxemburg~~ (erä 1), ~~alpit, sisilia, kreeta, lappi,
islanti~~ (erä 2, poikkeuksena järjestys — Fable valitsi), ~~tromssa,
marseille~~ (erä 3), **riika** (tehty, LVA sai bonus-skandaalin) →
SEURAAVAKSI: barcelona, kiova, edinburgh, varsova, dubrovnik,
sarajevo, odessa, vilna, krakova... (aja skripti uudestaan tarkkaan
järjestykseen, luvut voivat olla muuttuneet).

**TÄRKEÄT RAJOITTEET, TARKISTA AINA ENNEN KIRJOITUSTA:**
1. **Skandaalikiintiö on 2–3/maa** (`js/packs/skandaalit.js`,
   `tests/skandaalit.test.mjs` `assert.equal(MAAT.length, ...)` —
   PÄIVITÄ TÄMÄ LUKU jos lisäät maan/skandaalin!). Tarkista
   `SKANDAALIT[iso]?.length` ennen kirjoitusta — jos jo 3, EI VOI
   lisätä ilman poistoa (älä poista omin päin, kysy Fablelta).
2. **Historian hetket vaativat AINA kuvaputken havainnekuvan**
   (lähikuva+kaukokuva, `tests/historian-hetket.test.mjs`) — EI
   Commons-kuvaa, EI kuvatonta. Ei sessiossa kuvageneraattoria →
   TEKSTIT VALMIIKSI POSTILAATIKKOON, EI KOSKAAN SUORAAN
   `historian-hetket.js`:ään ilman kuvia.
3. **Kohdekartta puuttuu monelta kaupungilta** (alue-ambienssit:
   alpit/sisilia/kreeta/islanti/lappi) → "jutut"-reitti (kohdekartan
   wiki-only-piste) ei toimi, vain lehtiaihe-reitti.
4. Uusi maa skandaalit.js:ään lisää myös `MAAT.length`/`KAIKKI.length`
   -testit — päivitä molemmat.
5. **Rebase-kilpailu on todellinen**: main liikkuu useita committeja
   tunnissa. Fetch origin main JUURI ENNEN pushia, ei aiemmin. Odota
   konflikti `js/muutokset.js`:ssä (versionumerorivit) — ratkaisu:
   oma rivi ylimmäksi, numero main+1, main.js+sw.js samaan lukuun.

## 4. Postilaatikkotilaukset (avoinna, ei kuittausta)

- `posti/sisaltokirjuri-kuvaputki-5-historian-hetkea-euroopan-
  ohuimmat-20260927.md` (erä 1): Valletta (piirityksen loppu 1565),
  Luxemburg (Bock-kallio 963), Sisilia (Cefalù-lupaus 1131), Kreeta
  (Arkadi 1866), Lappi (ensijuna Rovaniemelle 1909).
- `posti/sisaltokirjuri-kuvaputki-5-historian-hetkea-euroopan-
  ohuimmat-era2-20260927.md` (erä 2): Islanti (Hekla 1104), Alpit
  (Napoleon St. Bernard 1800), Tromssa (Fram lähtee 1893), Marseille
  (Marseillaise 1792), Riika (Riian puolustus 1919).
- Molemmat haarassa `claude/postilaatikko`. Kun Codex toimittaa
  kuvat: lisää `js/packs/historian-hetket.js`:ään täydellä kaavalla,
  aja `tools/tarkista-nostopaikat.mjs` ja päätä kartalla/kohdekartta-
  sijoittelu sen mukaan (Valletta/Luxemburg/Tromssa/Marseille/Riika
  ovat pistekaupunkeja, Islanti/Alpit eivät).

## 5. Odottaa omistajan/Fablen päätöstä

- **#3413 (nähtävyyskuvien tasaus) on MERGETTY** — tarkista onko
  julkaistu ennen Codex-arviotilausta (23 poikkeamaa + 7 maalattua
  taustaa, ks. edellinen luovutusraportti kohta 3.4). Julkaisija
  hoitaa julkaisun, ei Sisältökirjuri.

## 6. Julkaisukaava

```
git fetch origin main
node tools/uusi-versio.mjs "Muutosrivi"
node --test tests/*.test.mjs
node tools/tarkista-kaksoisavaimet.mjs
node tools/build-standalone.mjs
git add -A && git commit -m "..."
git fetch origin main   # UUDESTAAN juuri ennen pushia, main liikkuu
git rebase origin/main  # ratkaise muutokset.js-konfliktit yllä olevalla kaavalla
git push
```

Commons-kuvahaku: `node tools/hae-commons.mjs haku "<termi>" 6`,
tiedot: `node tools/hae-commons.mjs tiedot "File:X.jpg"`.

## 7. Ympäristö ja infra

- Työkansio: `/Users/Shared/Claude/Matkakirja-sisaltokirjuri`
  (checkout-haara `sisalto-pelikatalogi-20260927`).
- Avoin worktree: `/Users/Shared/Claude/wt/sisaltokirjuri-euroopan-
  ohuimmat` (PR #3419) — poista `tools/uusi-worktree.sh --poista`
  kun mergetty.
- Ei uusia avaimia.

## 8. Aloitusviesti uudelle sessiolle

Ks. päivitetty `docs/raportit/viesti-sisaltokirjuri-aloitus.md`.
