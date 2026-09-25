# Luovutus: Sisältökirjuri — 24.9.2026 (c)

Konteksti korkea, Fablen käskystä nopea luovutus. Edellinen luovutus:
`docs/raportit/viesti-sisaltokirjuri-luovutus-20260924-b.md`
(sisälsi N15-avauksen ja N16-suunnitelman). Tämä vuoro vei N16:n
valmiiksi (71/71-virstanpylväs), teki lisenssiportin, kartuschan
kuudelle uudelle maalehdelle, kirjoitti 6 puuttuvaa maalehteä, lisäsi
merijää-noston ja ajoi koko laatukierroksen kaikille 77 lehdelle.

## 1. Lue ensin

1. `CLAUDE.md`, `docs/roolitus.md`
2. Raamatun "TYÖTAPA JA SESSIOT"
3. `docs/raportit/lehtien-laatukierros-20260924.md` — tämän vuoron
   laatukierroksen täysi raportti (löydökset, korjaukset, avoimet
   huomiot)
4. Tämä raportti kokonaan

## 2. PR-tila (kaikki tämän ja edellisen vuoron avaamat/päivittämät)

### Sisältö (N-sarja, kaikki auki paitsi N7)

| PR | Sisältö | Tila |
|---|---|---|
| #3013 | N7 (Kilimanjaro, Viktorian putoukset, Sitka, Bermuda, Falkland) | **MERGETTY** |
| #2987, #2996, #3000, #3002, #3004, #3006 | N1–N6 | Auki, jonossa |
| #3015 | N8 | Auki + tämän vuoron korjaus (Angola-päivämäärä) |
| #3016 | N9 (Churchill ym.) | **Auki — odottaa Julkaisijaa.** Ks. kohta 3. |
| #3017, #3018, #3020, #3021 | N10–N13 | Auki + #3021:een korjaus (Broome-kaapeli) |
| #3022 | N14 | Auki + korjaus (Bananal-lahde) |
| #3025 | N15 | Auki |
| #3026 | N16 (viimeinen kaupunkilehtierä) | Auki + 2 lisäystä: Nomen merijää-nosto, Kalgoorlie-lahde-korjaus |

### Tämän vuoron uudet PR:t

| PR | Sisältö |
|---|---|
| #3028 | Lisenssiportti-raportti (5856 kuvaa tarkistettu, ei aitoja NC/ND-tapauksia) |
| #3029 | St. John'sin apostrofikorjaus (7 kuvaa) |
| #3033 | VUT-kartuscha valmiiksi (Wikivoyage-tervehdys) |
| #3035 | M1: kuusi maalehteä (BMU, PRI, GUF, FLK, NCL, NFK) + kartuscha-tutkimus (kaikki 6 pysyvästi ilman riviä, ei sovereign-vertailua) |
| #3036 | Arktinen merijää -nosto Nuukiin + ark-merijaa-tiedon päivitys |
| #3042 | Laatukierroksen 4 korjausta jo mainissa oleviin lehtiin (San Francisco, Kosice, Bryssel, Kilimandzaro) |

Kaikissa `node --test` vihreä ajohetkellä.

## 3. Odottaa: Churchill-nosto (#3016 merge)

Fable tilasi Arktinen merijää -noston myös Churchilliin, mutta sen
kaupunkilehti on yhä auki PR #3016:ssa (N9-erä, ei minun kirjoittama).
**Kun #3016 on mainissa:** lisää Churchilliin sama NASA/NSIDC-
merijää-nosto kuin Nuukiin/Nomeen (ks. PR #3036 ja #3026:n Nome-
lisäys mallina) — käytä KOLMATTA eri Commons-kuvatiedostoa samasta
NASA SVS -sarjasta (Arctic Sea Ice Minimum 2026, SVS5677) ainut-
kertaisuuden vuoksi; Nuuk ja Nome käyttävät jo kaksi eri versiota
samasta kuvasta.

## 4. Laatukierros — täysi raportti erikseen

Ks. `docs/raportit/lehtien-laatukierros-20260924.md`. Lyhyesti:
77/77 lehteä tarkistettu, 9 korjausta tehty (kaikki pieniä, PR:issä
yllä), ei sävy-/isoisä-sitaattiongelmia, kaikki riippumattomasti
tarkistetut faktat pitivät (korjatut poislukien). Kaksi ei-tämän-
kierroksen aukkoa löytyi sivutuotteena: Valletta ja Luxemburg ovat
vielä vain kevyellä minimipakilla main:issa (ei nostoja/aihesivuja/
minitehtävää) — oma, isompi erä jos halutaan täydentää.

## 5. Menetelmä joka toimi tänään (kannattaa toistaa)

Laatukierros: dispatch N-erä kerrallaan yhdelle Sonnet-agentille
tarkistamaan ~10 lehteä (sävy, isoisä-sitaatit, 1 riippumaton
faktantarkistus per lehti, kuvatekstit/attribuutio koneellisesti
kaikista nostoista, minitehtävien yksikäsitteisyys). Agentit
haarautuivat itse omiin per-lehti-alaerittelyihinsä isomman kuorman
tasoittamiseksi — toimi hyvin, ei tarvinnut ohjata. `git show
origin/<haara>:<tiedosto>` eikä `git checkout` jaetun repon
tilan suojaamiseksi.

## 6. Voimassa olevat työtavat

Ei muutoksia — ks. Raamatun "TYÖTAPA JA SESSIOT" ja
`docs/moduulit/kaupunkilehti.md` / `maalehti.md`.

## 7. Odottaa omistajan/Fablen päätöstä

Ei uusia avoimia kysymyksiä tässä vuorossa (VUT:n tervehdyslähde-
kysymys ratkaistiin tämän vuoron aikana, ks. PR #3033).

## 8. Aloitusviesti uudelle sessiolle

```
Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri.
Ensimmäinen komento: git fetch origin && git checkout -B sisalto-tyo-$(date +%Y%m%d-%H%M) origin/main

Lue: CLAUDE.md, docs/roolitus.md, Raamatun "TYÖTAPA JA SESSIOT",
docs/raportit/lehtien-laatukierros-20260924.md, ja tämä raportti
kokonaan (docs/raportit/viesti-sisaltokirjuri-luovutus-20260924-c.md).

ENSIMMÄINEN TEHTÄVÄ: tarkista onko PR #3016 (Churchill, N9) mergetty
mainiin (gh pr view 3016 --json state,mergedAt). Jos on, lisää
Churchilliin Arktinen merijää -nosto (kohta 3 yllä). Jos ei, kysy
Fablelta seuraavaa tehtävää.

Viestit Fablelle vain PR-numero valmiista erästä, jumi tai kysymys,
enintään 8 riviä.
```
