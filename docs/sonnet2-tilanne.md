# Sonnet 2:n tilannekuva — jatka tästä /clearin jälkeen

*Kirjoitettu 9.8.2026. Lue tämä ENSIN, sitten `CLAUDE.md` ja
`docs/roolitus.md`. Rooli: nähtävyysjutut kaupunkikarttojen kohteille
(`js/packs/nähtävyysjutut.js` — oikea nimi `js/packs/nahtavyysjutut.js`).
Raportoin Fablelle (`session_01R1jVv12E56gbU5qtH5xGaG`) triggereillä
(`create_trigger`, `persistent_session_id`, `run_once_at` ~5 min
tulevaisuuteen). Työhaara: `claude/matkakirja-peli-kehitys-rtrn23`.

## Lukittu malli (ei poikkeamia)

2-3 lyhyttä kappaletta per kohde, oma tiivis suomenkielinen kooste
englanninkielisestä Wikipediasta (ei käännös). Lainaus vain jos
aidosti hieno ja tunnettu, muuten `lainaus: null`. 1 kuva perusjuttu,
max 2. Ensimmäinen kuva AINA vaakasuuntainen. Kuvat PD/CC0/CC-BY/
CC-BY-SA Commonsista, `lahde`-kenttä "Tekijä, Wikimedia Commons
(LISENSSI)". `lahde: 'Wikipedia'` (ei `wiki`-kenttää, ei "Lue lisää"
-linkkiä). `js/packs/maakartat.js`:ää EI KOSKAAN kosketa — kohdenimet
otetaan sieltä sellaisenaan avaimiksi, ui.js:n overlay-yhdistys hoitaa
lopun.

## Prosessi joka erälle

1. Lue kohdenimet `maakartat.js`:n `KAUPUNKIKARTAT.<kaupunki>.kohteet`
   -listasta — käytä TÄSMÄLLEEN niitä.
2. Workflow-tutkimus (agentti per kaupunki, 2-vaiheinen: tutkimus +
   Commons-kuvatarkistus) — ks. skriptipohja
   `/tmp/.../scratchpad/monistus/era*-workflow.mjs` aiemmista eristä.
3. OMA riippumaton Commons-kuvatarkistus vielä agenttien jälkeen
   (lisenssi/mitat/tekijä API:sta) — on löytänyt asioita (esim.
   Panoramio-bot-lataukset, joissa Artist-kenttä ≠ uploader).
4. Kirjoitus `nahtavyysjutut.js`:ään koodigeneraattorilla (ks.
   `gen-era*.mjs`-pohjat) jotta rivitys/sisennys täsmää tarkalleen
   olemassa olevaan tyyliin.
5. `node --check`, `tarkista-kaksoisavaimet.mjs`, `node --test
   tests/*.test.mjs`.
6. Playwright-QA jokaiselle dialogille 390/834/1024px: teleport-portti
   AINA `lontoo`-kaupungin kautta ENSIN (vaihtaa `maailma`-paketista
   `maailmankartta`-pakettiin), ODOTA ~1s pack-vaihdon jälkeen ENNEN
   kohdekaupunkiin siirtymistä — muuten jää jumiin edelliseen
   kaupunkiin.
7. `git fetch origin main` JUURI ennen versionumeron valintaa — Opus 2
   ja muut julkaisevat tiheään, törmäyksiä tulee jatkuvasti. Bumppaa
   `js/main.js` APP_VERSION, `sw.js` CACHE, `js/muutokset.js` (uusin
   ensin, ≤60 merkkiä). `node tools/build-standalone.mjs`. PR, seuraa
   `subscribe_pr_activity`:llä, raportoi Fablelle.
8. Jos PR jää auki pitkäksi aikaa eikä uutta erää voi aloittaa
   (samasta haarasta ei voi avata kahta PR:ää), tee seuraava erä
   valmiiksi ja QA-testatuksi paikallisesti odottaessa, committoi
   (push vasta mergen jälkeen).

## Julkaistut erät (kaikki mergetty, ellei toisin mainita)

Kairo+Venetsia (v376), Madrid+Tukholma (v377), Lontoon konversio
(v381), Praha+Wien+Budapest+Pariisi (v426), Helsinki (v431, PR #604 —
**vahvistettu livenä 9.8.2026**), Ateena+Amsterdam+Dublin (v432, **PR
#611, EI VIELÄ MERGETTU** — seurattava/tarkistettava clearin jälkeen).

## Seuraavaksi

Odottaa Opus 2:n uusia kohdekarttoja. 9.8.2026 tilanteen mukaan
julkaistu mutta ei vielä käsitelty: Rooma, Krakova, Varsova, Tallinna
(v430/#610). Jäljellä Opus 2:lla: Kiova, Pietari, Moskova, Sofia,
Bukarest, Sarajevo, Odessa. Tarkista ensin `git log origin/main` mitä
uutta on tullut clearin jälkeen, ja kysy Fablelta jos epäselvää mitä
priorisoida.

**Wiki-täsmennyssivuansat muistettavaksi** (Opus 2:n/Fablen
välittämät, tarkista aina artikkelin ensimmäinen virke): "Zeus
Olympioksen temppeli" ja "Sininen moskeija" ovat täsmennyssivuja;
fi-wiki "Neitsyttorni" = Bakun torni (ei Istanbulin Kız Kulesi);
fi-wiki "Belém" = Brasilian kaupunki (ei Lissabonin kaupunginosa).
