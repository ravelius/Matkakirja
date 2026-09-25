# Sisältökirjurin aloitusviesti (25.9.2026 ilta, kontekstin nollaus 79 %:ssa)

Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri.
Ensimmäinen komento: git fetch origin && git checkout -B sisalto-tyo-$(date +%Y%m%d-%H%M)
origin/main. Lue CLAUDE.md, Raamatun "TYÖTAPA JA SESSIOT", JUMI → FABLE, ja
docs/raportit/viesti-sisaltokirjuri-luovutus-20260925-c.md kokonaan (kontekstin nollaus,
työ jatkuu suoraan — ei omistajan tilinvaihtoa tällä kertaa).

TILA lyhyesti:
1. **Turistiopaspaketti — VALMIS.** 56/60 kohdetta, 20 erää, kaikki PR:issä tai mainissa.
   Kolme flagattua datavirhettä odottaa spawn_task-ehdotuksina (Veitsenterä-silta,
   Boa Vistan säätiedot, Liègen suomennos) — luovutuksen kohta 2.
2. **Löydös 95 (miniatyyrien leikkaus)** — data+vartija mainissa. 70 kohtauskuvaa tilattu
   Codexilta, suurin osa toimitettu/mergetty. **Pariisi (#3220) auki ja DIRTY** — ratkaise
   luovutuksen kohdan 3 kaavalla. Wien/Rooma/Pietari yms. eivät vielä tulleet.
3. **Löydös 108 (Välimeri+Messinansalmi)** — VALMIS, mainissa (PR #3181, juna v2226).
4. **Löydös 115 + jatkuva maakuntatehtävä — KESKEN.** 23/138 maata tehty (lyhyt), PR #3226
   auki. Pikkukuvatilaus (111 aluetta) postilaatikossa, ei vielä toimitettu.

ENSIMMÄINEN TEHTÄVÄ:
1. Tarkista `gh pr view 3226 --json state,mergeStateStatus` ja `gh pr view 3220
   --json state,mergeStateStatus` — jatka niiden viemistä maaliin jos tarvitaan (tarkista
   ensin PR:n `state`/`mergedAt` ennen jatkotyötä samalle haaralle, ks. luovutuksen kohta 3
   — squash-juna voi sulkea PR:n merkitsemättä `mergedAt`:ia, jolloin uudet commitit jäävät
   orvoiksi).
2. Jatka jatkuvaa maakuntatehtävää seuraavalla erällä (Kroatia, Romania, Bulgaria — tai
   luovutuksen kohdan 5 lista), **ilman erillistä lupaa** — Fable on hyväksynyt jatkuvan
   tahdin kunnes kaikki pelin maat on tehty tai toisin käsketään. Työkaava: 3 agenttia
   rinnan (isolation: worktree, EI pushia), cherry-pick AINA `origin/main`:sta.
3. Kun ensimmäiset maakuntien pikkukuvat/kohtauskuvat saapuvat Codexilta postilaatikkoon,
   tarkista PR ja kuittaa (luovutuksen kohta 5/kohtauskuva-esimerkki).

SITOVAT KÄYTÄNNÖT TÄLLÄ HETKELLÄ:
- **JUMI → FABLE:** jumissa (päätös puuttuu, työ ei etene, luokitin estää) EI tehdä
  AskUserQuestion-korttia eikä odoteta omistajaa — lähetä Fablelle YKSI viesti (tilanne,
  vaihtoehdot, oma suositus) ja jatka muuta työtä.
- **VIESTIRAJA JA VARAKANAVAT:** SendMessage sallii ~10 viestiä per omistajan vuoro.
  Kun se täyttyy tai vastaa "Failed to send", käytä
  mcp__ccd_session_mgmt__send_message session id:llä.
- **Levynkäyttö:** älä aja npm ci uudessa worktreessä — symlinkkaa node_modules
  pääkassasta (ln -s /Users/Shared/Claude/Matkakirja-sisaltokirjuri/node_modules
  <worktree>/node_modules).
- **Maakuntaerän integrointikaava** (3 rinnakkaista Opus-agenttia, isolation: worktree,
  EI pushia niiltä) → cherry-pick AINA origin/main:sta pääsessioon → testit → push → PR →
  siivous. Testitiedostojen konfliktit (ODOTETUT_MAARAT, ERASSA_1-joukko) ovat aina pelkkiä
  lisäyksiä, helppo ratkaista käsin. Täysi kaava: luovutus kohta 5.
- **Squash-junan orpo-commit-riski:** tarkista aina `gh pr view <n> --json state,mergedAt`
  ennen jatkotyötä samalle haaralle. Ks. luovutuksen kohta 3.
- **`git checkout <commit> -- .`** on vaarallinen kesken editoinnin — hylkää
  committoimattomat muutokset hiljaa. Committaa ensin tai käytä stashia uniikilla tagilla.
- **Kuorma:** tarkista `uptime` ennen `node --test tests/*.test.mjs` (koko sarja).
  Yksittäiset kevyet testitiedostot ovat turvallisia kuormasta riippumatta.
- **Versionosto rinnakkaisille haaroille:** ÄLÄ aja `tools/uusi-versio.mjs` usealle
  mergeämättömälle haaralle peräkkäin samaa mainia vasten.
- Agentit vain Sonnet/Opus, enintään 4 rinnakkain. Kontekstin nollaus: kun Fable pyytää,
  kirjoita luovutus ja kutsu clear_session self samassa vuorossa. Viestit Fablelle vain
  valmis erä, jumi tai kysymys, enintään 8 riviä. Testit ilman ääniä. Aikaleimat
  date-komennolla — älä arvaa kellonaikaa.
