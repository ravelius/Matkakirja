# Fablen luovutus Mac Studion Fable-sessiolle — 17.9.2026 (Suomen aikaa)

Omistaja päätti 17.9.2026 klo 15.25 (Raamattu, AGENTIT VAIN OPUS JA SONNET,
TARKENNUS 5 kohta 11): Fable siirtyy pilvestä Mac Studiolle, koska agentit
ajavat siellä missä Fable ajaa, ja Mac ajaa savukkeet ja WebKit-mittaukset
moninkertaisesti nopeammin kuin jaettu pilvikontti.

Sitovat linjaukset ovat Raamatussa (js/tyohuone-raamattu.js). Lue ennen
mitään: CLAUDE.md, docs/roolitus.md, ja Raamatusta osio "AGENTIT VAIN OPUS
JA SONNET" tarkennuksineen 1–5 (työtavat: Actions-savukkeet, pilvisessiot,
Mac, ei odottavia monitoreja, aikakatto 45 min, yksi päätös per erä, savukkeet
vain Actionsissa + yksi kohdemittaus), sekä ASTRONAUTIN KAMERA LISAYS 10–13,
KARTTAUUDISTUKSEN PAATOKSET 27 ja 31 tarkennuksineen, IHMISEN MATKA JATKO 2
KORJAUS ja JATKO 3 TARKENNUS 2.

## main = v1931 (katso git log), tänään julkaistu v1925–v1931

| versio | sisältö |
|---|---|
| v1925 | topografialinssin odotuspeite, Pariisin lähizoomi (nimiökatto 16 px) |
| v1926 | iPhonen musta pallo (Safari-kangas), WebAppin tyhjä linssi (aikakatko, vaihevartijat, ?pallodiag=1), minipulun chatti + selite pienennettynä + hover pois, Ihmisen matka 5 s zoom + Marokko zoomin jälkeen + koko Afrikka |
| v1927 | Pariisin aihenostot nimiöllä "Nimi…" + viuhka, turisti-kyltin 16 px katto |
| v1928 | kertojan simpukkavirke PALAUTETTU (Fable luki omistajan sanat väärin 16.9.), pulun repliikki "Simpukoita. Hyvä alku." poistettu |
| v1929 | aihenoston nimiö vain lähizoomissa, satelliittilinssin sulkuvartio vaakaan |
| v1930 | turisti-kyltti: napautus avaa oppaan, sama kerroin (11,5 px), oma ladontalaatikko, siirtyy sivuun kun aihenosto osuu; Actions-ajoituskorjaus |
| v1931 | Astronautin kamera: pallo ei mustu uudelleenavauksessa (globe.gl color=null, Macin mittaama), kehysvahti, pinta-musta-vartija, ladontakatto 4096×2048; savuke-astro-webkit.mjs (Mac) |
| (ei versio) | Savukkeet Actions-matriisiin (PR #2551): .github/workflows/savukkeet.yml + tools/savukkeet/sarjat.json, 12 savuketta rinnakkain 12 min, portti kaataa vain UUSISTA punaisista; Arabia-leikkaustyökalu tools/arabia (PERUTTU käyttö, jää työkaluksi) |

## Työtavat, jotka ovat voimassa (Raamattu)

- Agentit vain Opus (juurisyy) ja Sonnet (rajatut, julkaisut). Ei Fable-mallia agenttina.
- Omistajan sanat Raamattuun sanatarkasti ASCII:na ENNEN työtä; kysymykset AskUserQuestion-kortteina; Suomen aika viesteissä (Raamatussa vanhat merkinnät UTC).
- Agentille: yksi komento kerrallaan, ei taustaprosesseja, ei odottavia monitoreja eikä uusintasilmukoita; yksi Playwright-kohdemittaus omasta väitteestä; vastakoe vain juurisyytyössä; raportti docs/raportit/viesti-fable-<aihe>-<pvm>.md; commit + push HETI vaikka jokin jäisi punaiseksi; aikakatto 45 min.
- Julkaisu: Sonnet-agentti, worktree origin/mainista (tai edellisen julkaisuhaaran päältä, jos edellinen PR on vielä auki — versiotyökalu lukee numeron mainista, joten uusi-versio.mjs ajetaan vasta mergen jälkeen), merge haarat + Fablen haara (Raamattu Fablen versio), node tools/uusi-versio.mjs, npm test, tarkistimet, build-standalone (dist ei committiin), raportti ENNEN PR:ää (säästää Actions-kierroksen), PR footerilla. EI paikallisia savukkeita — PR:n Savukkeet-työnkulku ajaa. Fable squash-mergeää kun "testit" ja "Savukkeet" vihreitä, synkkaa oman haaransa mainiin (Raamattu: oma versio).
- sarjat.json: tunnetut punaiset huomautuksineen; uusi punainen kaataa jobin.
- Codex vain postilaatikon kautta (haara claude/postilaatikko, posti/fable-codex-*.md).
- Mac Studio: toisen tilin Claude työpöytäsovelluksessa; tämän tilin CLI-sessio "Mac CLI opus" (Remote Control, ~/Matkakirja-fable) on työntekijä. Pilvi-Fable ei nähnyt sitä ListAgentsissa, joten tehtävät menivät create_trigger(persistent_session_id) -viestinä; Mac vastaa SendMessagella. Mac-Fable näkee sen todennäköisesti suoraan.

## Avoinna

- Codex: WebApp-uusintatesti v1931:llä ?pallodiag=1 (odotetut rivit: pinta-mittaus kirkkaus>20, kehykset pakotettu=0/K, pistemittari kohteita=64 domissa=64); kohta 36 (pisteitä 0) ei toistunut Playwright-WebKitissä — jos toistuu WebAppissa, pallodiag kertoo nyt kohteet/DOM/merkkikerros. Codexille kuitattava v1931-SHA postilaatikkoon (pilvi-Fable tekee tämän ennen luovutusta jos ehtii).
- savuke-ihmisen-kehys vastakokeen raja (99 vs 100) kalibroitava Actions-ympäristöön (tunnettu punainen sarjat.jsonissa).
- savuke-pallo-nostolaput Bukarest-limitys häilyvä (tunnettu); pyörimishäilyvät satelliittilinssi/astro-pallo.
- Vanhat: savuke-nimikyltti 4/7a/7b, savuke-kaupunkipopup 17, savuke-kaupunkietusivu 6 (mainin omia).
- Ihmisen matka -äänite: EI uusita (kertojan virke palautettu); Arabia-staging-tiedostot R2:ssa jäävät käyttämättä.
- Omistajan pelitesti puhelimella v1931:stä (Astronautin kamera kolme avausta peräkkäin, Pariisin kyltti ja aihenostot, Ihmisen matka avaus).
- Viikkoraja "allowed_warning" (nollautuu 21.9.).
- Pilvisessio "Opus: Astronautin kamera WebApp…" (session_013aQWaA8FNKgSNWWfQNRNef) jätetty arkistoimatta omistajan pyynnöstä; kulutti n. 350 $ odotussilmukassa — syy TARKENNUS 3:n sääntöön.

## Aloitusviesti Mac-Fablelle

"Olet Fable, päätoimittaja pelissä Matkakirja ja unohdettu aarre, nyt Mac Studiolla. Lue CLAUDE.md, docs/roolitus.md, docs/raportit/viesti-fable-luovutus-20260917.md ja Raamatun tänään lisätyt kohdat. Fablen haara on claude/bold-ride-vow4ki (git fetch origin && git checkout -B claude/bold-ride-vow4ki origin/claude/bold-ride-vow4ki). Agentit vain Opus/Sonnet, enintään kolme rinnakkain Macilla, Raamatun työtavat. Jatka avoimista kohdista; kysy omistajalta kortteina."
