# Sisältökirjurin aloitusviesti (28.9.2026 klo ~08.4x, kontekstin nollaus)

Olet Sisältökirjuri (Sonnet), checkout `/Users/Shared/Claude/Matkakirja-sisaltokirjuri`
(haara `sisalto-pelikatalogi-20260927`). Ensimmäinen komento:
`git fetch origin main`. Lue `CLAUDE.md`, `docs/roolitus.md` ja
`docs/raportit/viesti-sisaltokirjuri-luovutus-20260928-k.md` KOKONAAN
ennen töiden aloitusta.

TILA lyhyesti: neljä PR:ää junassa/avoinna (#3514 ROU mergetty, #3520
Kronborg, #3524 CZE+HRV, #3525 UKR). #3529 (Codex, historian hetket)
junassa, oma osuus (Nikosia-korjaus) tehty. Oma ihmeet-kytkentä-työ
(14 Matkakirjan ihmettä + 6 uutta maalehteä) on VALMIS worktreessä
`/Users/Shared/Claude/wt/sisaltokirjuri-ihmeet-14maata-kytkenta` mutta
odottaa Julkaisijan "#3529 MERGED" -ilmoitusta ennen pushia (ks.
luovutuksen kohta 2 — TÄRKEIN ENSIMMÄINEN TEHTÄVÄ).

**TÄRKEIN OPPI TÄLLE SESSIOLLE**: kaksi eri rataa samoille maille —
(A) maakuntien pitkä+pulu -jono (UKR ✅ → BGR tutkittu muttei sovellettu
→ SRB → BIH → ...) ja (B) "Matkakirjan ihme" + maalehden Historia-aihe
(SRB/BIH/ALB/MKD/MNE/CYP/MLT/MDA/BLR, valmis tässä vuorossa). B ei
korvaa A:ta — molemmat pitää tehdä. Ks. luovutuksen kohta 8.

JONO (järjestys): 1) Odota #3529 MERGED → pushaa ihmeet-PR (kohta 2).
2) Maalehti-Historia-PR samoille 6 maalle Codexin `hetki-*`-olioiden
viereen (kohta 3, raportit valmiina). 3) Sovella BGR (28 aluetta,
raportit valmiina, kohta 7). 4) Jatka rataa A: SRB → BIH → ISL → ALB →
MKD → MNE → CYP → MLT → LUX → MDA → BLR, sitten 21 muuta maata (Pulu).

SITOVAT KÄYTÄNNÖT:
- JUMI → FABLE: jumissa yksi viesti Fablelle, ei korttia; muu jono jatkuu.
- VIESTIRAJA: SendMessage ~10/vuoro.
- Kohderyhmä 13+, EI lastenpeli.
- Agentit vain Sonnet/Opus. Kirjaa agenttien löydökset TIEDOSTOON heti.
- Älä mergaa checkout-haaraa (`sisalto-pelikatalogi-20260927`) äläkä
  poista sitä `--delete-branch`-lipulla.
- VAIN EUROOPPA on maantieteellinen rajaus.
- Main liikkuu useita committeja tunnissa: fetch+rebase juuri ennen
  pushia. `js/muutokset.js`-konfliktit ovat rutiinia (versionumero-
  rivit) — oma rivi ylimmäksi, numero main+1, main.js+sw.js samaan
  lukuun.
- Uuden maan ENSIMMÄINEN karttanosto vaatii hahmotelma-pakin
  rekisteröinnin + skeemaversion noston + `--paivita`-ajon (luovutuksen
  kohta 9) — älä unohda, testit kaatuvat muuten neljästä eri syystä.
- Worktree pois heti kun PR on avattu (levytila rajallinen).
- Älä kuittaa Codexin/muiden faktakorjauksia tarkistamatta (luovutuksen
  kohta 5).
