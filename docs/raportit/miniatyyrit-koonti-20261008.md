# Miniatyyrit: 24 kuvamuutos-PR:ää yhdeksi (8.10.2026)

Haara `codex/eurooppa-miniatyyrit-koonti-20261008`, pohja main 52a8fa7bf. Tilaus: Päätoimittaja 8.10.

## Sisältö
- 71 uutta `assets/kartat/miniatyyrit/*.webp` -kuvaa 24 kaupungista (Codexin PR:t #3450–#3458, #3461, #3462, #3471, #3477, #3478, #3483 (vain data), #3484, #3492, #3494, #3495, #3501, #3502, #3504, #3505, #3509). Yksikään kuva ei ole kahdessa PR:ssä.
- `tools/miniatyyri-mitat.json` laskettu kerran uudelleen (`node tools/mittaa-miniatyyrit.mjs`): 71 riviä muuttui, 0 ristiriitaa PR:ien omien mitta-arvojen kanssa omien kuviensa osalta.
- Mukana kaupunkikohtaiset raportit ja ennen/jälkeen-arkit PR:istä sekä #3460:n 23 karttaminin R2-manifesti (vain docs).
- Yhteisarkki: `docs/raportit/kuvat/miniatyyrit-koonti-ennen-jalkeen-20261008.png` (ennen | jälkeen, kaikki 71 kuvaa kaupungeittain).
- `tests/miniatyyrit-leikkaus.test.mjs`: Vallettan poikkeuslistan muutos #3452:sta.

## Firenze (#3483) — jaettu
Mukaan: kaksi kuvaa (Ponte Vecchio, Santa Maria Novella), `js/packs/miniatyyrit.js` (Poggin terassi → `-vari3`, natiivin käyttämä datariivi) ja raportit.
Pois: `js/pallolaatat.js`, `tests/piirtokoe-asetus.test.mjs`, `tools/savukkeet/savuke-piirtokokeet.mjs` — webin piirtokokeen CI-korjaus (`peittoTaso` / tukilaatat), ei natiivin käyttämää dataa; rakennettu 1.10. vanhan mainin päälle.

## Testit
`npm test`: 5399 testiä, 5384 pass, 0 fail, 15 skipped.

## Ei tehty
Alkuperäisiä PR:iä ei suljettu (Päätoimittaja sulkee mergen jälkeen). Pelissä ei varmennettu; kuvat eivät ole R2:ssa tässä PR:ssä.
