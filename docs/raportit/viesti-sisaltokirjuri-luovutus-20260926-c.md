# Luovutus: Sisältökirjuri — 26.9.2026 ilta (n. 19.0x Suomen aikaa)

Edellinen: `viesti-sisaltokirjuri-luovutus-20260926-b.md`. Tämä vuoro (iltapäivä–ilta):
löydös 158 valmistui kokonaan (kaikki 6 PR:ää mainissa), ja sen jälkeen aloitettiin
omistajan uusi tilaus, Astronautin kameran kohdelaajennus, erä 1.

## 1. Lue ensin

- `CLAUDE.md`, `docs/roolitus.md`.
- Raamattu: "TYÖTAPA JA SESSIOT" (roolit, worktreet, viestisäännöt).
- Ei uusia Raamattu-linjauksia tässä vuorossa — kaikki uudet päätökset tässä
  raportissa ovat tilannekuvaa, ei pysyviä sääntöjä (ne kirjaa Fable Raamattuun
  erikseen jos ne vakiintuvat).

## 2. Tila

**main = v2274, `aa5f7b42c`** (uusimmat commitit `#3335`–`#3338` eivät koskeneet
sisältöä). Tämän vuoron julkaisut:

| Versio | PR | Sisältö |
| --- | --- | --- |
| v2269 | #3328 | BEL: maakuntien kuva- ja pikkukuva-kentät (11/11) |
| v2270 | #3330 | DNK: maakuntien kuva- ja pikkukuva-kentät (5/5) |
| v2271 | #3331 | SVK: maakuntien kuva- ja pikkukuva-kentät (8/8) |
| v2272 | #3332 | LVA: maakuntien kuva- ja pikkukuva-kentät (5/5) |
| v2273 | #3333 | LTU: maakuntien kuva- ja pikkukuva-kentät (10/10) |
| v2274 | #3336 | FIN/EST/SVN: maakuntien kuva- ja pikkukuva-kentät (45/45) |

**Löydös 158 on nyt kokonaan valmis**: 9 maata (NLD/BEL/DNK/SVK/LVA/LTU/FIN/EST/SVN),
99 aluetta, kaikilla pitkä + kuva + pikkukuva. Kaikki kuvat Wikimedia Commonsista,
lisenssi PD/CC0/CC BY/CC BY-SA tarkistettu suoraan Commonsin API:sta jokaiselle,
katsottu silmillä tunnistettavien yksityishenkilöiden varalta ennen latausta.
Ämpärissä `karttanostot/20260926/`.

Kaikki kuusi PR:ää mergettiin **automaattisesti** (Julkaisijan uusi rutiini, ks.
kohta 7) — ei tarvinnut odottaa erillistä ihmis- tai Fable-mergeä.

## 3. Pushattu mutta ei PR:ää — ODOTTAA PELIKOODARIA

**Haara `astro-era1-kaupungit-20260926`** (origin, `d31bab0b4`, pohjautuu mainiin
`aa5f7b42c`): Astronautin kameran kohdelaajennus, **erä 1** (omistajan tilaus,
Fablen välitys 26.9. klo 15.5x). 23 uutta kaupunkikohdetta (pariisi, lontoo,
rooma, venetsia, moskova, peking, hongkong, singapore, sydney, rio, saopaulo,
losangeles, sanfrancisco, chicago, mexico, kapkaupunki, mumbai, delhi, bangkok,
jakarta, shanghai, wien, soul). Yhdeksälle kaupungille (Amsterdam, Berliini,
Tukholma, Kööpenhamina, Praha, Toronto, Lagos, Hanoi, Manila) EI löytynyt
kelvollista ISS-käsikamerakuvaa millään hakutavalla NASAn kuvakirjastosta —
jätetty pois, ei kompromissoitu.

Sisältö haarassa:
- `js/linssit/satelliitti-data.js` — regeneroitu `tools/hae-satelliittihavainnot.mjs`:llä,
  kaikki 23 uutta NASA-kuvatunnusta tarkistettu suoraan `images-api.nasa.gov`:sta
  (kuvateksti + päivämäärä täsmää) JA katsottu kuvina ennen hyväksymistä.
- `tools/astronaut/qa-era1.json` — 2 Pulu-kysymystä/vastausta per kohde,
  `qa-first.json`:n muodossa, validoitu käsin `build-questions.mjs`:n säännöillä
  (2 kysymystä, ≤60 merkkiä, 2–3 virkkeen vastaus ≤500 merkkiä, https-lähteet,
  `havaintoId` täsmää) — **0 ongelmaa**.

**MIKSI EI PR:ÄÄ VIELÄ**: `tools/astronaut/build-questions.mjs` on kovakoodattu
lukemaan vain `qa-first.json` + `qa-last.json` ja vaatimaan tasan 64 kohdetta.
Kolme testiä on siksi juuri nyt PUNAISENA tässä haarassa (odotetusti):
`tests/astronaut-kysymykset.test.mjs` (2 testiä: "all 64 camera targets..." ja
"runtime text matches validated...") ja `tests/satelliitti.test.mjs:1221`
(minipulun napautustesti). Pelikoodari lupasi yleistää `build-questions.mjs`:n
lukemaan kaikki `qa-*.json`-tiedostot kun erä 1 on olemassa — ilmoitin hänelle
26.9. klo 18.5x että data on haarassa. **Kun Pelikoodari on tehnyt yleistyksen**:
rebasoi tämä haara mainiin, aja `node tools/astronaut/build-questions.mjs`, aja
koko testisarja, avaa PR.

## 4. Kesken — tee nämä ensin

1. **Odota Pelikoodarin kuittausta** `astro-era1-kaupungit-20260926`-haarasta
   (build-questions.mjs yleistetty) — sitten rebasoi, testaa, avaa PR.
2. **Maakunta-erä 2** (Fablen priorisoima kolmanneksi, ks. kohta 6): CHE (26),
   PRT (20), HUN (20), SWE (21), NOR (21), IRL (30) — 138 aluetta, EI vielä
   pitkää eikä kuvaa (tarkistettu `js/packs/maakunnat-luonnehdinnat.js`:stä,
   `pitka: false` kaikilla). Menetelmä samat kuin löydös 158:ssa (ks. edellinen
   luovutus `-b.md` kohta 3), mutta HUOM: nämä maat tarvitsevat ENSIN pitkä-tekstin
   (Livian äänellä, 1873-kytkös), VASTA SEN JÄLKEEN kuvan — kaksivaiheinen työ,
   ei suoraan kuvahakuun kuten löydös 158:ssa. Yksi maakunta-PR kerrallaan mainiin.
3. **Astronautin erät 2–4** (isoisän reitin maisemat, luonnonkohteet, "sama
   paikka eri vuosina" -parit) — Fable sanoi: "maakuntien lomassa", ei kiinteää
   järjestystä erä 2:n kanssa. Odottaa vielä aloitusta.

## 5. Odottaa omistajan päätöstä

Ei avoimia kysymyksiä omistajalle juuri nyt. (Erä 1 vs. maakunta-erä 2 -jäjestys
kysyttiin Fablelta 26.9. klo 18.3x ja vastaus saatiin: erä 1 → maakunta-erä 2 →
astronautin erät 2–4 maakuntien lomassa.)

## 6. Voimassa olevat työtavat — mikä muuttui tässä vuorossa

- Ks. Raamattu "TYÖTAPA JA SESSIOT" ja `docs/roolitus.md` — ei muutoksia
  itse sääntöihin.
- **Uusi tieto (ei Raamattu-linjaus, vain havainto)**: Julkaisija ajaa nyt
  automaattista mergeä maakunta-PR:ille (haara `sisalto-kuva-*` tai
  `sisalto-pitka-*`, muutokset vain `js/packs/maakun*`-tiedostoihin, testit
  vihreät → versionosto + merge). Avaajan (minun) vastuu pysyy: yksi PR
  kerrallaan, avaa seuraava vasta kun edellinen on mainissa.
- **Pulu-kysymysmekanismi satelliitti-linssille** ei kulje `js/aikajana.js`:n
  `PULUKYSYMYSTEN_LINSSI`-reitin kautta (se on vain ihmisen-matka-linssille) —
  vaan omalla koneistollaan: `tools/astronaut/qa-*.json` + `build-questions.mjs`
  → `js/linssit/astronaut-kysymykset.js`, käytössä `satelliitti.js`:ssä
  (`haeAstronautinKysymykset`). Tämä ei ollut minulle alussa selvää — löysin sen
  vasta kun Pelikoodari kertoi.

## 7. Julkaisukaava

Ei muutoksia peruskaavaan (`docs/roolitus.md` "Julkaisusäännöt"): rebase
`origin/main`iin → testit → `tarkista-kaksoisavaimet.mjs` → commit → push →
`gh pr create` → CI. Maakunta-PR:ien osalta CI:n `savukkeet-mac`-tarkistus on
tänä vuorona epäonnistunut toistuvasti nopeasti (< 3 min) merkinnällä "The run
was canceled by @ravelius" — omistajan itse peruma ajokilpailun vuoksi samalla
Macilla, EI oikea testivika. Merge on siitä huolimatta mennyt läpi (testit+reitti
riittävät), ei vaatinut toimenpiteitä.

## 8. Ympäristö ja infra

- Työkansio: `/Users/Shared/Claude/Matkakirja-sisaltokirjuri` (tämä sessio).
- Poistin oman vanhan worktreen `/Users/Shared/Claude/wt/sisaltokirjuri-linssikatalogi-kuvatekstit-era2`
  Postivahdin/Fablen pyynnöstä (levytila, PR #3138 suljettu, vain untracked
  node_modules) — `git worktree remove --force` + `prune`.
- Käytin tilapäisiä worktreejä Codex-postilaatikkoon (`claude/postilaatikko`)
  kahdesti tämän vuoron aikana (Cupola-tilaus + kuittaus), molemmat siivottu
  pois lopuksi (`git worktree remove` + haaran poisto).
- Ämpäri (R2): `karttanostot/20260926/` sisältää nyt 45 uutta maakuntakuvaa
  (FIN 18 + EST 15 + SVN 12) BEL/DNK/SVK/LVA/LTU:n 39:n lisäksi, sekä 6 ISS
  Cupola-kehyskuvaa (Codexin toimitus Linssisepälle, ei minun tuottamaani).
- Ei uusia avaimia, ei muutoksia rutiineihin/ajastuksiin.

## 9. Avoimet velat ja opetukset

**Velat:**
1. Astronautin erä 1 tarvitsee vielä Pelikoodarin `build-questions.mjs`-
   yleistyksen ennen PR:ää (kohta 3).
2. Erä 1 on 23/25 kohdetta — 9 kaupunkia kokeiltu ja hylätty (ei ISS-kuvaa).
   Jos omistaja haluaa täsmälleen 25, pitää etsiä 2 lisää muista pelin
   kaupungeista jotka eivät ole listalla.

**Opetukset:**
- Commons- ja NASA-kuvarajapinnat rajoittavat pyyntitahtia (429) — tarvitaan
  eksponentiaalinen backoff (≥20 s × yritys), ei vain muutaman sekunnin viive.
  Havaittu molemmilla API:lla tämän vuoron aikana; syynä luultavasti muiden
  roolien samanaikainen liikenne samalta Macilta.
- **Aina tarkista agentin ilmoittama kuvatunnus/lisenssi itse API:sta JA katso
  kuva silmillä** ennen kuin luotat siihen — tässä vuorossa ei löytynyt virheitä,
  mutta Gorenjskan (SVN) alkuperäinen ehdokas oli täysi turistivene, korvattava.
- Fablen sanamuoto "maakuntakuvat ensin" oli tulkinnanvarainen (juuri valmistunut
  löydös 158 -jono vs. koko maakunta-pitkä+kuva-työ mukaan lukien erä 2) —
  kysyin ja sain selvennyksen nopeasti; kannattaa jatkossa nimetä eräjono
  täsmällisesti tilauksissa.
- Pulu-kysymysten kytkentä satelliitti-linssille on eri mekanismi kuin
  ihmisen-matka-linssin — tarkista aina koko koodikanta (myös `tools/`-kansio)
  ennen kuin toteat että jokin puuttuu.

## 10. Aloitusviesti uudelle sessiolle

```
Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri.
Ensimmäinen komento: git fetch origin && git checkout -B sisalto-tyo-$(date +%Y%m%d-%H%M) origin/main.
Lue CLAUDE.md, docs/roolitus.md ja docs/raportit/viesti-sisaltokirjuri-luovutus-20260926-c.md
kokonaan ja toimi niiden mukaan.

TILA lyhyesti: löydös 158 (maakuntien kuva-kenttä) on KOKONAAN VALMIS, kaikki
6 PR:ää mainissa (v2274). Astronautin kameran erä 1 (23 kaupunkia) on haarassa
astro-era1-kaupungit-20260926, odottaa Pelikoodarin build-questions.mjs-
yleistystä ennen PR:ää.

ENSIMMÄINEN TEHTÄVÄ:
1. Tarkista onko Pelikoodari yleistänyt tools/astronaut/build-questions.mjs:n
   (kysy Pelikoodarilta tai tarkista git log). Jos kyllä: rebasoi
   astro-era1-kaupungit-20260926 mainiin, aja build-questions.mjs, aja koko
   testisarja, avaa PR.
2. Sen jälkeen (tai sillä välin jos Pelikoodari ei ole valmis): aloita
   maakunta-erä 2 (CHE/PRT/HUN/SWE/NOR/IRL, 138 aluetta, pitkä+kuva, ks. tämän
   raportin kohta 4.2).

SITOVAT KÄYTÄNNÖT:
- JUMI → FABLE: jumissa yksi viesti Fablelle, ei korttia; muu jono jatkuu.
- VIESTIRAJA: SendMessage ~10/vuoro; varakanava mcp send_message session id:llä.
- Maakunta-PR:t yksi kerrallaan mainiin; Julkaisija automerges kun testit vihreät.
- Agentit vain Sonnet/Opus, enintään 3–4 rinnan.
- Kuvat (maakunta) vain PD/CC0/CC BY/CC BY-SA Commonsista, tarkistettuina
  API:sta suoraan; NASA-astronauttikuvat aina PD, mutta tarkista kuvatunnus
  itse images-api.nasa.gov:sta äläkä luota agentin raporttiin sokeasti.
```
