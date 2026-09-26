# Luovutus: Sisältökirjuri — 26.9.2026 ilta (n. 19.4x Suomen aikaa, konteksti 70 % → nollaus)

Edellinen: `viesti-sisaltokirjuri-luovutus-20260926-b.md`. Tämä vuoro (iltapäivä–ilta):
löydös 158 valmistui kokonaan, sen jälkeen omistajan uusi tilaus (Astronautin
kameran erä 1, mainissa) ja maakunta-erä 2 alkoi (CHE + PRT pitkä valmiina).

## 1. Lue ensin

- `CLAUDE.md`, `docs/roolitus.md`.
- Raamattu: "TYÖTAPA JA SESSIOT".
- Ei uusia Raamattu-linjauksia tässä vuorossa.

## 2. Tila

**main = v2276, `9da80d49a`** (+ tämä raportti-commit `9b92fbd6c`, ei sisältöä).
Tämän vuoron julkaisut:

| Versio | PR | Sisältö |
| --- | --- | --- |
| v2269 | #3328 | BEL: maakuntien kuva- ja pikkukuva-kentät (11/11) |
| v2270 | #3330 | DNK: maakuntien kuva- ja pikkukuva-kentät (5/5) |
| v2271 | #3331 | SVK: maakuntien kuva- ja pikkukuva-kentät (8/8) |
| v2272 | #3332 | LVA: maakuntien kuva- ja pikkukuva-kentät (5/5) |
| v2273 | #3333 | LTU: maakuntien kuva- ja pikkukuva-kentät (10/10) |
| v2274 | #3336 | FIN/EST/SVN: maakuntien kuva- ja pikkukuva-kentät (45/45) |
| v2276 | #3340 | Astronautin kamera erä 1: pelin kaupungit (23/25) |

**Löydös 158 kokonaan valmis**: 9 maata (NLD/BEL/DNK/SVK/LVA/LTU/FIN/EST/SVN),
99 aluetta, pitkä + kuva + pikkukuva. Ämpärissä `karttanostot/20260926/`.

## 3. Pushatut haarat, ei vielä PR:ää tai PR auki

- **PR #3341 (AUKI)** — "CHE: maakuntien pitkä-teksti (26/26)"
  (`sisalto-pitka-che-20260926`). Testit 113/113 vihreät. Matchaa
  Julkaisijan automerge-kaavan — tarkista onko mennyt läpi.
- **Haara `sisalto-pitka-prt-20260926` (pushattu, EI PR:ää)** — PRT:n 20
  aluetta, pitkä-teksti valmis ja committoitu (`f37b27510`, pohjautuu
  mainiin `9da80d49a`), testit 113/113 vihreät, dual-key ok. **PR avataan
  vasta kun #3341 (CHE) on mainissa** — yksi maakunta-PR kerrallaan
  -sääntö. Kun avaat: `git checkout sisalto-pitka-prt-20260926`, rebasoi
  tuoreeseen mainiin, aja testit uudestaan, `gh pr create`.

## 4. Kesken — tee nämä ensin

1. Tarkista PR #3341 (CHE) — jos mainissa, avaa PRT:n PR (ks. kohta 3).
2. **Maakunta-erä 2, jatko**: HUN (20), SWE (21), NOR (21), IRL (30) —
   pitkä-teksti puuttuu näiltä 4 maalta (92 aluetta). Menetelmä: 3
   rinnakkaista Sonnet-agenttia per maa, KÄYTÄ AINA WebSearchia (yksi
   CHE-agentti ei käyttänyt sitä ja sai Gotthard-tunnelin päivämäärän
   väärin — kiinni jäi omalla jälkitarkistuksella). Integraatioskripti:
   `/private/tmp/.../scratchpad/integroi-che-pitka.mjs` mallina (scratchpad,
   ei repossa — kirjoita uudelleen, rakenne on yksinkertainen regex-korvaus
   `lyhyt:`-rivin jälkeen).
3. Kun KAIKKI 6 maata (CHE/PRT/HUN/SWE/NOR/IRL, 138 aluetta) on pitkä-tekstillä:
   jatka kuva-kenttään, menetelmä kuten löydös 158:ssa (Commons-kuva per
   alue, lisenssi tarkistettu API:sta, katsottu silmillä).
4. **Astronautin erät 2–4** (isoisän reitin maisemat, luonnonkohteet, "sama
   paikka eri vuosina" -parit) — Fable: "maakuntien lomassa". Ei aloitettu.
5. **UUSI, EI VIELÄ PRIORISOITU — löydös 170 (Siirtoseppä 26.9. klo 19.4x)**:
   996/2782 maakuntanostosta puuttuu kuva. Fokuskohteet 807 kpl (moduuli
   puuttuu, useimmiten `maastokohteet-<iso>.js`), skandaalit 187 kpl
   (`data.kuva(t)` puuttuu), täkynostot 2 kpl (`pariisin-vuosisadat`,
   `exchange-alleyn-kupla`). Pääosin Euroopan ulkopuolella (8–13/maa),
   Euroopassa SWE 3, FRA/HUN/LTU/NOR/PRT/CYP 2 kukin, GRC valmis. Lista:
   `git show origin/siirtoseppa-luovutus:docs/raportit/maakuntanostot-ilman-kuvaa-20260926.md`.
   **Kysy Fablelta järjestys** ennen aloitusta (Fable sanoi päättävänsä sen).

## 5. Odottaa omistajan päätöstä

Ei avoimia kysymyksiä juuri nyt.

## 6. Voimassa olevat työtavat — mikä muuttui tässä vuorossa

- Ks. Raamattu "TYÖTAPA JA SESSIOT" ja `docs/roolitus.md` — ei muutoksia
  itse sääntöihin.
- **Havainto (ei Raamattu-linjaus)**: Julkaisija ajaa automaattista mergeä
  maakunta-PR:ille (haara `sisalto-kuva-*`/`sisalto-pitka-*`, muutokset
  vain `js/packs/maakun*`-tiedostoihin, testit vihreät → versionosto +
  merge). Avaajan vastuu pysyy: yksi PR kerrallaan.
- **Pulu-kysymysmekanismi satelliitti-linssille**: `tools/astronaut/qa-*.json`
  + `build-questions.mjs` → `js/linssit/astronaut-kysymykset.js`, käytössä
  `satelliitti.js`:ssä. EI kulje `js/aikajana.js`:n `PULUKYSYMYSTEN_LINSSI`-
  reitin kautta (se on vain ihmisen-matka-linssille).

## 7. Julkaisukaava

Ei muutoksia (`docs/roolitus.md` "Julkaisusäännöt"). Maakunta-PR:ien
`savukkeet-mac`-tarkistus epäonnistui toistuvasti nopeasti tänä vuorona
("The run was canceled by @ravelius" — omistajan oma ajokilpailun
peruminen, EI testivika); merge meni läpi silti (testit+reitti riittävät).

## 8. Ympäristö ja infra

- Työkansio: `/Users/Shared/Claude/Matkakirja-sisaltokirjuri`.
- Poistin worktreen `sisaltokirjuri-linssikatalogi-kuvatekstit-era2`
  (levytila, PR #3138 suljettu). Käytin ja poistin worktreen
  `sisaltokirjuri-astro-era1` (astronautti-PR:n rebase/build).
- Ämpäri (R2): `karttanostot/20260926/` +45 maakuntakuvaa (FIN/EST/SVN)
  BEL/DNK/SVK/LVA/LTU:n 39:n lisäksi, + 6 ISS Cupola-kehyskuvaa (Codexin
  toimitus Linssisepälle).
- Ei uusia avaimia, ei muutoksia rutiineihin/ajastuksiin.

## 9. Avoimet velat ja opetukset

**Velat:**
1. PRT-PR avaamatta, odottaa CHE:n mergeä (kohta 3).
2. Astronautin erä 1 on 23/25 kohdetta — 9 kaupunkia hylätty (ei ISS-kuvaa:
   Amsterdam, Berliini, Tukholma, Kööpenhamina, Praha, Toronto, Lagos,
   Hanoi, Manila).
3. Löydös 170 (kohta 4.5) odottaa Fablen priorisointia.

**Opetukset:**
- Commons- ja NASA-kuvarajapinnat rajoittavat pyyntitahtia (429) —
  eksponentiaalinen backoff (≥20 s × yritys) tarvitaan.
- **Aina tarkista agentin ilmoittama kuvatunnus/lisenssi itse API:sta JA
  katso kuva silmillä** — Gorenjskan (SVN) alkuperäinen kuvaehdokas oli
  täysi turistivene, korvattava.
- **Pyydä pitkä-teksti-agenteilta AINA WebSearch**, älä luota muistiin —
  yksi CHE-agentti ei käyttänyt hakua ja sai Gotthard-tunnelin
  aloituspäivän väärin (helmikuu vs. oikea syyskuu 1872), kiinni jäi
  vain koska tein jälkitarkistuksen itse.
- Kirjoita tutkittu, valmis sisältö talteen (committoi/pushaa) HETI kun se
  on valmis, älä jätä sitä vain agenttien palautusviesteihin konteksti-
  session muistiin — ne katoavat nollauksessa.

## 10. Aloitusviesti uudelle sessiolle

```
Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri.
Ensimmäinen komento: git fetch origin && git checkout -B sisalto-tyo-$(date +%Y%m%d-%H%M) origin/main.
Lue CLAUDE.md, docs/roolitus.md ja docs/raportit/viesti-sisaltokirjuri-luovutus-20260926-c.md
kokonaan ja toimi niiden mukaan.

TILA lyhyesti: löydös 158 KOKONAAN VALMIS (v2274), Astronautin erä 1 MAINISSA
(v2276). Maakunta-erä 2: CHE pitkä PR #3341 auki, PRT pitkä valmis haarassa
sisalto-pitka-prt-20260926 (odottaa CHE:n mergeä ennen PR:n avaamista).

ENSIMMÄINEN TEHTÄVÄ:
1. Tarkista PR #3341 (CHE). Jos mainissa: avaa PRT:n PR (rebasoi
   sisalto-pitka-prt-20260926, testaa, gh pr create).
2. Kysy Fablelta löydös 170:n (raportin kohta 4.5) priorisointi suhteessa
   maakunta-erä 2:n loppuun (HUN/SWE/NOR/IRL).
3. Jatka maakunta-erä 2:ta: HUN/SWE/NOR/IRL pitkä-teksti, sitten kaikkien
   6 maan kuva-kenttä.

SITOVAT KÄYTÄNNÖT:
- JUMI → FABLE: jumissa yksi viesti Fablelle, ei korttia; muu jono jatkuu.
- VIESTIRAJA: SendMessage ~10/vuoro; varakanava mcp send_message session id:llä.
- Maakunta-PR:t yksi kerrallaan mainiin; Julkaisija automerges kun testit vihreät.
- Agentit vain Sonnet/Opus, enintään 3–4 rinnan, KÄYTÄ AINA WEBSEARCHIA faktojen tarkistukseen.
- Kuvat (maakunta) vain PD/CC0/CC BY/CC BY-SA Commonsista, tarkistettuina
  API:sta suoraan; NASA-astronauttikuvat aina PD, mutta tarkista kuvatunnus
  itse images-api.nasa.gov:sta äläkä luota agentin raporttiin sokeasti.
```
