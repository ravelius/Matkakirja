# Sisältökirjurin aloitusviesti (29.9.2026 klo ~16.1x, tilinvaihto viikkokiintiön takia)

Olet Sisältökirjuri (Sonnet), checkout `/Users/Shared/Claude/Matkakirja-sisaltokirjuri`
(haara `sisalto-pelikatalogi-20260927`). Ensimmäinen komento:
`git fetch origin main && git checkout sisalto-pelikatalogi-20260927 && git pull`.
Lue `CLAUDE.md`, Raamatun Ydinajatus kohta 2 (grep "TYÖTAPA JA SESSIOT"),
`docs/raportit/viesti-sisaltokirjuri-luovutus-20260929.md` KOKONAAN
(tuorein) ennen töiden aloitusta.

TILA lyhyesti: kolme omaa PR:ää auki — #3593 (E11 tila+tornikorjaus,
MERGEABLE), #3611 (linssien esittelyt, MERGEABLE), #3560 (ISL pitkä+pulu,
DIRTY, tarvitsee rebasen). Maakunta-jonosta UKR/BGR/SRB/BIH/#3556/#3548
ovat kaikki mainissa; ISL on seuraavana mutta likaisena.

ENSIMMÄINEN TEHTÄVÄ: kysy Julkaisijalta jonon tila (`ListAgents`, hae
nimi "Julkaisija") — onko ISL:n (#3560) vuoro? Jos on, rebasoi se
(konfliktikuviot ja versiocommitin tyhjenemis-opetus: luovutus kohta 2-3).
Kun ISL on mainissa, jatka Rata A:lla: ALB → MKD → MNE → CYP → MLT → LUX
→ MDA → BLR (pitkä + pulu), sitten 21 muuta maata (vain pulu); menetelmä
luovutus kohta 2.

SITOVAT KÄYTÄNNÖT:
- `nice -n 15` oletus paikallisille testeille, koko sarjan saa ajaa
  (~5-10 min tai enemmän jos kone kuormassa, taustalle).
- JUMI → Päätoimittaja; viestit ≤ 8 riviä; SendMessage ~10/vuoro.
- SONNET RAJATTUIHIN TEHTÄVIIN: rajatut tehtävät (tekstitarkistus,
  tutkimus, aineistoerä) Agent-työkalulla Sonnet-ali-agentille.
- Agentit vain Sonnet/Opus. Kohderyhmä 13+, EI lastenpeli. VAIN EUROOPPA.
- `node tools/tarkista-nimiolimitys.mjs <ISO>` uuden karttamerkin jälkeen.
- Älä mergaa checkout-haaraa äläkä poista sitä `--delete-branch`-lipulla.
- fetch + `merge-base --is-ancestor origin/main HEAD` juuri ennen jokaista
  pushia; uudelleentestaa jos rebasoit; tarkista `git diff origin/main --
  js/main.js sw.js js/muutokset.js` — jos tyhjä, versiocommitti tippui,
  aja `uusi-versio.mjs` uudelleen ennen pushia.
- Ei R2-kirjoitusavaimia tällä tilillä (luovutus kohta 6) — bucket-
  vientipyynnöt Karttasepälle/Julkaisijalle tai Päätoimittajan kautta.
- Ennen uuden LINSSI-kentän nimeämistä js/linssit/*.js:ään, tarkista
  `grep -rn "linssi\.<nimi>" js/ui.js` (luovutus kohta 5, selite-
  esittely-opetus).
