# Laitetestaaja → seuraava Laitetestaaja-sessio: luovutus (23.9.2026 klo 19.23 Suomen aikaa)

Fable pyysi luovutuksen kontekstin täyttyessä (70 %) ennen nollausta.
Edellinen luovutus tänään: `docs/raportit/viesti-laitetestaaja-luovutus-20260923.md`
(aamu, ennen Mac-rebootia) ja sen `-reboot.md`-liite (haarassa
`laitetestaaja`, ei mainissa). Tämä sessio ajoi koko iltapäivän/illan
CI-korjauksista natiivin QA:han asti — omistajan linjaus kesken
session: **koko peli siirtyy natiiviin, web ylläpitoon**, ja painopiste
on siitä lähtien ollut natiivin testaus.

## Lue ensin

1. `CLAUDE.md`, `docs/roolitus.md`.
2. Raamatun Ydinajatus-osion kohta 2 "TYÖTAPA JA SESSIOT".
3. `/Users/Shared/Claude/proto-3d/TYOTAPA.md` — natiiviprojektin
   omistusalueet, haarat, laitteiden jako (simulaattori/iPad).
4. Tämä raportti kokonaan ennen ensimmäistä tehtävää.

## Tila nyt

- `Matkakirja` (web) main = `55f2c4e13` (viimeisin nähty tässä
  vuorossa; tarkista `git fetch origin main` ennen mitään toimintaa,
  moni sessio julkaisee rinnakkain).
- `proto-3d/Matkakirja-proto` (natiivi) master = `9cca3af` ("Merge
  natiivi-ui/linssit").

Tässä vuorossa mergetyt PR:t (kaikki minun, kaikki vihreitä ilman
korttia):

| PR | Sisältö |
| --- | --- |
| #2914 | Pulu-eleiden laukaisijataulukko (70/70 ID, 9 orpoa) |
| #2928 | glnimiot-savukkeiden väärä tulostemuoto korjattu (ei WebKit-vika, ✓/✗→OK/FAIL) |
| #2945 | Peruutetun tools/arabia/-äänileikkaustyökalun poisto (3 pysyvää punaista pois) |
| #2946 | Natiivi vs. web -sulavuusvertailu + pysyvä sulavuusportti + pelisilmukan väliajo + Natiivi-UI:n kuvasarjat (kysymysnäkymä, pulu/Livia/luento/tekijätiedot) |

CI:n WebKit-launch-timeout (raportoitu aamun luovutuksessa): **ratkaistu
kokonaan** tässä vuorossa — selainkopion (`webkit-2336`) uudelleenlataus
korjasi 17/65→0/66 oikeaa kaatumista, jäljellä ollut 2/66 osoittautui
erilliseksi glnimiot-muotoiluvirheeksi (PR #2928). Ks.
`docs/raportit/ci-webkit-launch-20260923.md`. **Launch-timeout-punaisten
erikoissallinta voidaan poistaa kokonaan** — ei enää tarvita.

## Pushatut mutta julkaisemattomat haarat

- **Ei web-puolella yhtään** — kaikki 4 PR:ni mergetty.
- **`laitetestaaja-kontakti-web`** (proto-3d-repo,
  `/Users/Shared/Claude/wt/laitetestaaja-kontakti-web`): VALMIS ennen
  nollausta — kaikki 9/9 kuvaa onnistuivat, ei poikkeamia, Linssisepälle
  ilmoitettu. Skripti `tools/mittaus/kontakti-linssit-web.mjs` jäi
  worktreehen talteen (ei committoitu, kertaluonteinen ajo). Ei
  jatkotoimia tarvita tälle kohdalle.

## Kesken — tee nämä ensin

1. **Pelisilmukan lopullinen 6/6-ajo.** `pelikoodari/kysymys-ui`
   (`liiku`-komento) ON NYT MERGETTY proto-masteriin (todennettu
   `Peli-testit/silmukka-30s.txt`:ssä on `liiku lontoo` / `liiku pariisi`
   -rivit). Väliajo (ohituksella, PR #2946) oli 5/5 OK ennen mergeä —
   pelilogiikka toimii. Aja nyt VIRALLINEN käsikirjoitus:
   `node tools/mittaus/aja-pelisilmukka-savuke.mjs` haarassa
   `laitetestaaja-natiivi-sulavuus` tai uudessa worktreessä (`tools/
   uusi-worktree.sh laitetestaaja pelisilmukka-lopullinen`). Tavoite 6/6.
   Poista sen jälkeen väliaikaiset ohitustiedostot (`silmukka-30s-ohitus.txt`,
   `aja-pelisilmukka-ohitus-savuke.mjs`) — ne on merkitty korvattaviksi
   omissa kommenteissaan. Huom: yksi odotusarvo muuttui (Pelikoodari
   23.9.): `1-alku` on vaiheessa **Toiminta** ei Heitto (erä 4 purkaa
   liftauksen esivalinnan) — jos oma tarkistuslistasi vielä odottaa
   Heitto-vaihetta, päivitä se.
2. **Sulavuusportin toistoajo seuraavan VP:n jälkeen.**
   `tools/mittaus/aja-natiivi-sulavuus.mjs` (PR #2946, jo mainissa).
   Yksi rivi kirjattu `docs/raportit/sulavuus-natiivi-loki.md`:hen
   (commit c7b2f60, 0 % tökkäystä). Ajetaan aina uuden VP:n asennuksen
   jälkeen — kysy Natiiviseppältä milloin seuraava VP tulee.
3. **Kontaktiarkit iPadilta jokaisesta VP:stä** (Fablen pyyntö): kuvat +
   kehysajat omistajalle, kun linssit/UI etenevät. Ei vielä tehty erikseen
   iPadilla (tänään tehtiin simulaattorin puolella Natiivi-UI:lle).

## Odottaa omistajan päätöstä

Ei uusia avoimia kysymyksiä tälle sessiolle — kaikki tämän vuoron aikana
nousseet kysymykset (glnimiot-korjaus, arabia-työkalun poisto, worktree-
siivous, WebKit-selainkopion vaihto, zombie-CI-ajon peruutus) on jo
kysytty ja hyväksytty AskUserQuestion-korteilla tässä sessiossa.

## Voimassa olevat työtavat

Ks. Raamatun Ydinajatus kohta 2 ja `proto-3d/TYOTAPA.md`. Tässä
vuorossa opittua/vahvistettua, ei vielä Raamatussa:

- **Ääni aina mykistettynä testien/kierrosten ajaksi** (omistajan
  pysyvä sääntö, välitetty Fablen kautta 23.9.): `osascript -e 'set
  volume output muted true'` ennen, `false` jälkeen — myös
  virhetilanteessa (`try/finally`). Toteutettu `aja-natiivi-sulavuus.mjs`:ssä
  ja `aja-pelisilmukka-savuke.mjs`:ssä valmiina mallina uusille
  työkaluille. Äänen toimivuus todennetaan `currentTime`-arvolla, ei
  kaiuttimesta kuuntelemalla.
- **Simulaattori ja iPad ovat jaettuja** (Laitetestaaja + Natiiviseppä
  + muut natiivisession testaajat, esim. 3D-selvittäjä/Natiiviseppä
  käytti simulaattoria tänään usein): kysy "iPad/simulaattori vapaa?"
  ennen käyttöä, ilmoita "pois" jälkeen — sama käytäntö kaikilla.
- **Uusi worktree aina `git -C /Users/Shared/Claude/Matkakirja-fable
  worktree add -b <rooli>-<aihe> /Users/Shared/Claude/wt/<rooli>-<aihe>
  origin/main`** (tai `tools/uusi-worktree.sh` jos se on ajan tasalla) —
  EI koskaan rooli-worktreehen (`Matkakirja-laitetestaaja`), joka on
  edelleen jäljessä mainista äläkä käytä sitä koodin lukuun ilman
  fetch/checkoutia.
- **proto-3d-repo on eri git-juuri** (`/Users/Shared/Claude/proto-3d/
  Matkakirja-proto`) — sen omat worktreet, oma haarakäytäntö
  (`<rooli>/<aihe>`, TYOTAPA.md).

## Julkaisukaava

Ei muutoksia web-puolen kaavaan. Kaikki tämän vuoron PR:t olivat
dokumentti-/työkalumuutoksia (ei versionnostoa). Proto-3d-puolella ei
ole vielä vakiintunutta julkaisukaavaa — Natiiviseppä hallinnoi
käännökset ja asennukset (`./aja.sh`).

## Ympäristö ja infra

- Rooli-worktree: `/Users/Shared/Claude/Matkakirja-laitetestaaja`
  (haara `laitetestaaja`, jäljessä mainista — käytä uusia worktreitä
  koodin lukuun/muokkaukseen).
- Erä-worktreet tänään (kaikki `/Users/Shared/Claude/wt/`): kaikki
  neljä web-PR:n worktreetä (glnimiot-tuloste, arabia-siivous,
  natiivi-sulavuus, pulu-laukaisijat) ovat mergetty — **siivottavissa**
  `git worktree remove` kun seuraava sessio ei enää tarvitse niitä
  viitteenä. `laitetestaaja-kontakti-web` on KESKEN (ks. yllä), älä
  poista.
- Simulaattori: iPhone 18 Pro, UDID `1572C658-6455-4E55-8C05-3F88CB3C32F6`,
  `app.matkakirja.proto3d` asennettuna (viimeisin proto-master `2e26b45`
  asennushetkellä, sittemmin mergetty `9cca3af`:aan — käännös voi olla
  jäljessä, tarkista Natiiviseppältä).
- iPad: "iPad Pro 11 (Sami)", UDID `00008142-0019686E02F3801C`, jaettu.
- WebKit-selainkopio (`~/Library/Caches/ms-playwright/webkit-2336`)
  vaihdettiin tänään puhtaaseen tilaan — EI koske sitä enää ilman
  syytä, uusi CI-vika olisi vakava regressio.
- Levy: 131 Gt vapaana rebootin jälkeisen worktree-siivouksen jälkeen
  (7 vanhaa worktreetä poistettu omistajan luvalla).

## Avoimet velat ja opetukset

1. **Velka:** pelisilmukan lopullinen 6/6-ajo virallisella
   käsikirjoituksella (ks. Kesken-kohta 1) — liiku-komento on jo
   mergetty, vain ajo puuttuu.
2. **Opetus:** `xcrun simctl launch --console` + taustaprosessin `kill`
   TERMINOI myös itse sovelluksen, ei vain konsolikaappausta — käytä
   tavallista `simctl launch` (ilman `--console`) jos sovelluksen pitää
   jäädä käyntiin, ja `--console`-muunnosta vain kertaluonteiseen
   lokintarkistukseen jonka jälkeen sovellus käynnistetään uudelleen.
3. **Opetus:** Unityn `Debug.Log`-rivit EIVÄT näy `xcrun simctl spawn
   booted log show --predicate 'process == "..."'`-haulla tällä
   simulaattorilla, syytä ei selvitetty. Käytä `simctl launch --console`
   (tai `--console-pty`) suoraan konsolin kaappaamiseen.
4. **Opetus:** paljas `npx playwright install` ilman `node_modules`ia
   hakee UUSIMMAN playwright-paketin eikä lockfilen pinnattua versiota —
   tarkista aina pinnattu versio (`playwright@X.Y.Z` package.jsonista)
   ja asenna se erikseen scratch-hakemistoon, älä koskaan paljaana
   silloin kun tarkka selainversio on tärkeä (kuten CI-diagnoosissa).
5. **Opetus:** reboot jättää GitHubille "kadonneen" jobin, jos ajuri
   kuolee kesken ajon — `gh run cancel` ei riitä (jää `in_progress`-
   tilaan loputtomiin), tarvitaan `gh api -X POST .../force-cancel`.
   Ks. `docs/raportit/ci-webkit-launch-20260923.md`.
6. **Opetus:** `git worktree remove --force` ja `git rm -r` isoille/
   peruutetuille hakemistoille osuvat auto mode -classifierin
   "Irreversible Local Destruction" -estoon — pyydä omistajalta suora
   AskUserQuestion-lupa, älä yritä kiertää.

## Aloitusviesti uudelle sessiolle

```
Olet Laitetestaaja (Sonnet), Matkakirjan laitetestaus- ja
mittaussessio. Omistajan linjaus: koko peli siirtyy natiiviin, web
ylläpitoon — painopisteesi on natiivin testaus.

Lue: CLAUDE.md, docs/roolitus.md, Raamatun Ydinajatus kohta 2,
/Users/Shared/Claude/proto-3d/TYOTAPA.md, tämä raportti
(docs/raportit/viesti-laitetestaaja-luovutus-20260923-ilta.md)
kokonaan.

Ensimmäinen tehtävä: pelikoodari/kysymys-ui (liiku-komento) on mergetty
proto-masteriin — aja pelisilmukan LOPULLINEN 6/6-testi
(node tools/mittaus/aja-pelisilmukka-savuke.mjs, virallinen
Peli-testit/silmukka-30s.txt) ja ilmoita Fablelle/Pelikoodarille.
(Kontakti-web-kuvasarja Linssisepälle on jo valmis ja toimitettu.)

Sitovat säännöt: agentit vain Opus/Sonnet (ei koskaan Fable-mallia),
uudet erät omiin /Users/Shared/Claude/wt/laitetestaaja-<aihe>-
worktreisiin (git -C /Users/Shared/Claude/Matkakirja-fable worktree
add), ei rooli-worktreehen, ääni AINA mykistettynä testien ajaksi,
simulaattori/iPad "vapaa?"/"pois"-käytäntö, omistajan päätökset
AskUserQuestion-korttina, Suomen aika kaikkialla.

Vastaa suomeksi, tiiviisti.
```
