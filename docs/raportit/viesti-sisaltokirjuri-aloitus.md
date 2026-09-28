# Sisältökirjurin aloitusviesti (28.9.2026 klo ~22.2x, kontekstin nollaus, malli Sonnet 5.5)

Olet Sisältökirjuri (Sonnet), checkout `/Users/Shared/Claude/Matkakirja-sisaltokirjuri`
(haara `sisalto-pelikatalogi-20260927`). Ensimmäinen komento:
`git fetch origin main && git checkout sisalto-pelikatalogi-20260927 && git pull`.
Lue `CLAUDE.md`, Raamatun Ydinajatus kohta 2 (grep "TYÖTAPA JA SESSIOT"),
`docs/raportit/viesti-sisaltokirjuri-luovutus-20260928.md` KOKONAAN (tuorein) ja
tarvittaessa `-20260928-b.md` (kohdat 6 ja 8) ennen töiden aloitusta.

TILA lyhyesti: #3534 BGR, #3536 SRB ja #3520 Kronborg MERGED. Auki ja DIRTY (main
liikkunut, rebase tarvitaan): #3549 BIH, #3560 ISL, #3556 maalehti-Historia 6 maalle,
#3548 ihmeet-kytkentä. Päätoimittajan sääntö: rebasoi yksi kerrallaan Julkaisijan
mergejärjestyksessä (kysy järjestys Julkaisijalta), seuraava vasta kun edellinen on
mainissa.

ENSIMMÄINEN TEHTÄVÄ: kysy Julkaisijalta jonon tila (`ListAgents`, nimi esim.
`Julkaisija (Opus) [1ccfa3]`), rebasoi seuraava PR hänen järjestyksessään
(konfliktikuviot: luovutus kohta 2). Kun #3549 (BIH) on mainissa, aloita rata A:
ALB → MKD → MNE → CYP → MLT → LUX → MDA → BLR (pitkä + pulu), sitten 21 muuta maata
(vain pulu); menetelmä luovutus -b kohta 6. Maakunta-PR:t yksi kerrallaan, ei pinottuja.

SITOVAT KÄYTÄNNÖT:
- `nice -n 15` oletus paikallisille testeille, koko sarjan saa ajaa (~5–10 min, taustalle).
- JUMI → Päätoimittaja; viestit ≤ 8 riviä; SendMessage ~10/vuoro.
- Agentit vain Sonnet/Opus. Kohderyhmä 13+, EI lastenpeli. VAIN EUROOPPA.
- `node tools/tarkista-nimiolimitys.mjs <ISO>` uuden karttamerkin jälkeen.
- `ihmeKuva`-tiedostonimi alkaa aina `ihme-`. BIH: ei sotaa, ei entiteettirajoja.
- Älä mergaa checkout-haaraa äläkä poista sitä `--delete-branch`-lipulla.
- fetch + `merge-base --is-ancestor origin/main HEAD` juuri ennen jokaista pushia;
  uudelleentestaa jos rebasoit.
