# Julkaisijan luovutus 21.9.2026 klo 09.35 (konteksti ~70 %)

## Tila

- Tuotannossa **v1988** (09.33). Julkaistu tämän session aikana v1981–v1988.
- Työtila: `/Users/samireivinen/Matkakirja-sonnet3`, haara `v1973-prep` = origin/main
  (528e62f9, "v1988: Liftaussavuke: luenta ja linssin ajoitukset").
- Ei avoimia PR:iä julkaisujonossa. Ei kesken olevaa versiobranchia (`julkaisija`
  on tyhjä/käyttämätön, seuraava sessio aloittaa `git checkout -B julkaisija
  origin/v1973-prep`).

## Jono (ei aloitettu)

Ei tiedossa olevia mergaamattomia eriä juuri nyt. Tarkista ennen aloitusta:
- Karttasepän `nimiotaso-2026-09-21e` -luettelo on viety ämpäriin ja
  tarkistettu (v1987 mainissa ennen sitä).
- ~/Documents/Codex/2026-09-21/nostotyyppimerkit **on reititetty** —
  EI Sisältökirjurille, vaan Karttasepälle (vedos) ja Pelikoodarille
  (ykköstason nostotasojen kuvamerkki). Molemmat kuitattu vastaanotetuksi.
- ~/Documents/Codex/2026-09-21/merikoristeet reititetty Karttasepälle
  (KUVA, hän tuo itse repoon).

## Pysyvät tehtävät (cron, session-kohtaisia — eivät säily uudessa sessiossa)

Molemmat oli asetettu tässä sessiossa `CronCreate`-työkalulla, session-only
(katoavat kun tämä sessio päättyy) — **uuden Julkaisija-session on
perustettava nämä uudelleen**, jos omistaja/Fable haluaa niiden jatkuvan:

1. **Codex-toimitusten haku** (tunnittain): käy läpi
   `~/Documents/Codex/<pvm>/<aihe>/` ja `origin/claude/postilaatikko:posti/`
   verrattuna `docs/raportit/codex-toimitukset.md`-kirjanpitoon. Uusi
   git-kansio pushataan sellaisenaan, tyyppi päätellään diffin poluista
   (TEKSTI→Fable, ANIMAATIO→Pelikoodari, KUVA→Sisältökirjuri), muille
   (kuten karttamerkeille ilman koodikonteksia) reititys harkinnan mukaan.
2. **Kontekstivahti** (tunnittain): `mcp__ccd_session_mgmt__get_usage`
   jokaiselle roolisessiolle; yli 65 % → viesti sille "kirjoita luovutus";
   Fable itse yli 65 % → yksi rivi Fablelle; viikkokiintiö yli 80 % →
   Fablelle.

## Julkaisukaava (kertaus, ks. myös docs/roolitus.md ja CLAUDE.md)

1. `git fetch origin`; merge annetut haarat `origin/v1973-prep`-pohjaiseen
   `julkaisija`-haaraan. Konfliktissa `js/main.js`: vain APP_VERSION omasta,
   muu mainista. `sarjat.json`/Raamattu-loki: useimmiten MOLEMMAT puolet
   ovat puhtaita lisäyksiä samaan JSON-avainlistaan tai lokitiedostoon —
   yhdistä käsin, älä valitse vain toista puolta ilman tarkistusta (opittu
   tänä yönä useasti).
2. `node --test tests/*.test.mjs` + `node tools/tarkista-niputus.mjs` —
   MOLEMMAT, aina. Niputus jäi tänä yönä kahdesti välistä version-bumppauksen
   commitissa (korjaus tehtiin, mutta itse MODULES-listan siivousfiksi jäi
   committoimatta erillisessä diffissä) — **committoi niputusfiksi HETI kun
   teet sen, älä vasta version-bumpin yhteydessä**.
3. `node tools/uusi-versio.mjs "<60 merkin rivi>"` juuri ennen buildia
   (fetchaa mainin).
4. `node tools/tarkista-kaksoisavaimet.mjs`; `node tools/build-standalone.mjs`.
5. PR mainiin; odota Testit + Savukkeet. Jos VAIN suorituskykyrivi (tai muu
   jo `tunnetutPunaisetMac`-listattu tunnettu punainen) on jäljellä, merge
   `--admin`. Muu uusi punainen → raportoi Pelikoodarille/Karttasepälle
   suoraan (ei aina Fablelle — yöllä sovittu "vain versio ja punainen jota
   ette itse ratkaise" Fablelle), älä mergeä ennen korjausta.
6. Mergen jälkeen: `git checkout -B v1973-prep origin/main` +
   `git push origin v1973-prep --force-with-lease` (HUOM: force-push vaatii
   omistajan luvan auto-mode-luokittelijalta — kysy AskUserQuestion-kortilla
   jos evätään, älä yritä kiertää).
7. Tarkista tuotanto `matkakirja.app/js/main.js` (WebFetch, cache-bust-parametri
   jos vanha versio näkyy vielä) — EI `matkakirja-peli.pages.dev`, se ei
   resolvoidu.
8. Luettelo (pyramidi.json) ämpäriin VAIN kun Karttaseppä pyytää erikseen ja
   osoitinkoodi on jo mainissa (muuten lepokerros sammuu tuotannossa).
   R2-avaimet: `source ~/.zshrc` (ÄLÄ KOSKAAN `cat`/`head` sitä — arvot eivät
   saa näkyä työkalulokissa; opittu virheestä tänä yönä, ei toistoa).

## Opit tältä yöltä (21.9.2026 aamuyö)

- CI-ajon savukkeet-workflow ei aina käynnisty heti PR:n avaamisen jälkeen
  (havaittu ~1-2 min viive kahdesti) — `gh pr checks` voi hetken sanoa "no
  checks reported"; odota `until`-silmukalla ennen kuin epäilet vikaa.
- Kaupunkiliuska-vika (v1984) osoittautui kameran `matrixWorldInverse` vs.
  `matrixWorld` -epäsynkasta, ei osumaprioriteetista — kolme väärää
  diagnoosia ennen oikeaa; jos ensimmäinen selitys ei korjaa CI:ssä
  identtisesti toistuvaa vikaa, pyydä lisädiagnostiikkaa (klik-piste,
  kotelo, kangas, dpr) ennen seuraavaa korjausyritystä.
- Kun useampi haara mergetään peräkkäin ilman välipusheja (CI-tauon aikana),
  aja niputus ja koko testisarja JOKAISEN mergen jälkeen, ei vasta lopussa —
  virhe on helpompi jäljittää yhteen mergeen.
