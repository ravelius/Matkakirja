# Luovutus: Sisältökirjuri — 25.9.2026 ilta (konteksti 79 %, ei tilinvaihto)

Edellinen luovutus: `docs/raportit/viesti-sisaltokirjuri-luovutus-20260925-b.md`. Tämä vuoro
(tilinvaihdon jatko-osa): koko 30 kaupungin turistiopaspaketti laajennettiin ja saatettiin
loppuun (56/60 kohdetta, 20 erää), löydös 95 (miniatyyrien leikkaus) ja löydös 108 (Välimeri
+ Messinansalmi) valmiiksi, löydös 115 (maakuntien pikkukuvat) käynnistetty, ja uusi jatkuva
tehtävä "maakuntien luonnehdinnat kaikille pelin maille" alkoi (23/138 maata, lyhyt-vaihe).
Fable pyysi luovutuksen context 79 %:ssa — **kutsun `clear_session self` tämän viestin
lopuksi, uusi Fable lähettää aloitusviestin.**

## 1. Lue ensin

1. `CLAUDE.md`, Raamatun "TYÖTAPA JA SESSIOT", JUMI → FABLE
2. Tämä raportti kokonaan
3. `docs/tyolista-opukselle.md` — Turistioppaat-paketin lopputila (kohta alla)

## 2. Turistiopaspaketti — VALMIS, kaikki 56/60 kohdetta PR:issä tai mainissa

Alkuperäinen 30 kaupungin lista (erät 1–10) valmistui iltapäivällä. Fable laajensi tehtävän
jatkuvaksi loppuun asti (päätös klo 09.49 ja 17.3x): koko inventaarion "Sopii konseptiin"
-lista (docs/raportit/sisalto-inventaario-20260924.md kohta 9, 56 kohdetta) tehtiin loppuun
samana iltana, erät 11–20 (30 lisää kohdetta). Docs/tyolista-opukselle.md on päivitetty
(PR #3224) täydellisellä erälistalla ja PR-numeroilla.

**Kaikki 20 erää ovat PR:issä; Julkaisija on ottanut suurimman osan junaan (tarkista
`gh pr list --search "head:sisaltokirjuri-turistiopas"` mikä on vielä auki — viimeksi vain
#3206, erä 19, oli avoinna).**

Kaksi flagattua datavirhettä (ei korjattu, spawn_task-ehdotuksina odottamassa):
- **Veitsenterä-silta** (Viktorian putoukset, olemassa oleva nosto): väittää sillan olevan
  Zimbabwen puolella, en-Wikipedian mukaan se on Sambian puolella. `task_0a56e4cd`.
- **Boa Vistan säätiedot** (js/packs/saatiedot.js): Roraiman Boa Vistan (Brasilia) säädata
  on virheellisesti Kap Verden Sal Reista (lat 16.1, lon −22.8). `task_0525fcb9`.
- **Liègen suomennos** (js/packs/maakunnat-nimet.js): "Liege" → "Liègen pronssi" pitäisi
  olla pelkkä "Liège". `task_c429844f`.

## 3. Löydös 95 (miniatyyrien leikkaus) — data+testit valmiit, kuvatilaus käynnissä

Omistajan havainto build 13:sta: karttanostojen/nähtävyyksien miniatyyrikuvat ovat osin
"kohtauksia" (maalattu tausta) eivätkä leikattuja kohteita. Mittasin koko kansion
(423 kuvaa): 70 kohtauskuvaa. Vartija `tests/miniatyyrit-leikkaus.test.mjs` (täyttö < 0,6,
reuna ≤ 0,35, manifesti `tools/miniatyyri-mitat.json` koska CI:ssä ei ole sharpia — aja
`node tools/mittaa-miniatyyrit.mjs` uusien kuvien jälkeen). PR #3180 (+ #3202 dokumentaatio)
mergetty junassa.

**Tilattu Codexilta postilaatikon kautta, kaupungeittain:**
- Ateenan 6 pilottina ensin (posti/sisaltokirjuri-kuvaputki-ateena-leikatut-pilotti-20260925.md).
- Loput 64 kaupungeittain kuvauksin (posti/sisaltokirjuri-kuvaputki-64-kohtauskuvaa-leikatuiksi-20260925.md).

**Toimitustilanne (`gh pr list --search "Leikatut kohtauskuvat"` tarkistaa):** Amsterdam,
Berliini/Bryssel/Helsinki, Ljubljana, Lontoo, Luxemburg/Madrid/New York/Nikosia ovat
mergetty (osa junan kautta, osa suoraan #3215). **Pariisi (#3220) on avoinna ja DIRTY**
(ristiriita, todennäköisesti sama squash-junapattern kuin muillakin — ratkaise samalla
kaavalla kuin aiemmin: uusi haara origin/mainista, cherry-pick Codexin commitit, ratkaise
testitiedostojen listakonfliktit käsin). Wien, Rooma, Pietari ja loput eivät ole vielä
tulleet — odota tai kysy Codexilta postilaatikossa jos ei kuulu.

**TÄRKEÄ OPETUS TÄLTÄ VUOROLTA:** kun PR menee sisältöjunaan squash-mergenä, GitHub sulkee
alkuperäisen PR:n mutta EI aina merkitse `mergedAt`-kenttää — jos olet pushannut lisää
committeja SAMAAN haaraan PR:n sulkeutumisen jälkeen (esim. jatkoerä samalle haaralle),
ne jäävät orvoiksi. Tarkista aina `gh pr view <numero> --json state,mergedAt` ennen kuin
oletat PR:n olevan yhä auki — jos `state: CLOSED` ja haarassa on uudempia committeja kuin
mainissa, avaa/reopen PR ja rakenna branch uudelleen `origin/main`:sta + cherry-pick vain
puuttuvat commitit (näin tein maakuntaerälle, ks. kohta 5).

## 4. Löydös 108 (Välimeri + Messinansalmi) — VALMIS, mainissa

PR #3181 mergetty junaan v2226. Välimeri (LBY, olemassa oleva `valimeri`-kohde) rikastettu
kuvin+tekstein, Messinansalmi uusi kohde ITA:han. Natiivi-UI:lle ei tarvinnut ilmoittaa
erikseen (Fable hoiti). Ei avoimia asioita.

## 5. Löydös 115 (maakuntien pikkukuvat) + jatkuva maakuntatehtävä — KESKEN

**Kenttä:** `pikkukuva` jokaiseen `MAAKUNTIEN_LUONNEHDINNAT[iso][alue]`-olioon
(js/packs/maakunnat-luonnehdinnat.js), sama tyyli kuin karttanostojen miniatyyreillä
(leikattu tunnusmaisema/-rakennus, läpinäkyvä pohja, 512 px, polku
`assets/kartat/maakunnat/<iso>-<slug>.webp`).

**Pikkukuvatilaus postilaatikossa** (posti/sisaltokirjuri-kuvaputki-maakuntien-pikkukuvat-20260925.md,
+ GRC-lisäys samassa tiedostossa): 111 aluetta 8 maalle (FRA→ESP→ITA→GBR→DEU→POL→AUT + GRC).
Ei vielä toimitettu — ei omaa vartijatestiä toistaiseksi (kirjoita
`tests/maakunnat-pikkukuva-leikkaus.test.mjs` samalla kaavalla kuin miniatyyrit-leikkaus
kun ensimmäiset kuvat saapuvat).

**Jatkuva tehtävä — luonnehdinnat kaikille pelin maille** (Fable 25.9. klo 17.5x, järjestys:
isoisän reitin maat → muu Eurooppa → loput aakkosjärjestyksessä; lyhyt ensin kaikille,
pitkä/pulu myöhemmin samassa järjestyksessä; lähdeviite jokaiselle, ei keksittyä):

**Valmiit maat (23/138, kaikki lyhyt; GRC:llä myös pitkä+pulu):**
FRA(13) DEU(16) ITA(20) ESP(19) GBR(4) POL(16) AUT(9) — olivat jo ennen tätä vuoroa
GRC(14, +pitkä/pulu) NLD(15) BEL(11) DNK(5) SVK(8) FIN(18) EST(15) LVA(5) LTU(10) SVN(12)
CHE(26) PRT(20) HUN(20) SWE(21) NOR(21) IRL(30) — tämän vuoron lisäykset

**Yhteensä 348 aluetta.** PR **#3226** on auki (reopened tämän vuoron lopussa, ks. kohdan 3
oppi — vain 6 viimeisintä maata CHE/PRT/HUN/SWE/NOR/IRL ovat PR:n diffissä, loput ovat jo
mainissa junan v2232 kautta). Testit: `tests/maakunnat-luonnehdinnat.test.mjs`,
`tests/karttatyokalu-maakunnat.test.mjs`, `tests/maakunnat-pulu.test.mjs` 102/102 vihreä.

**Seuraavat maat (Eurooppa, ei vielä tehty):** HRV(20) ROU(42) BGR(28) CZE(14, jo tehty —
tarkista, oliko mukana jo vanhassa FRA/DEU/ITA/ESP/GBR/POL/AUT-listassa? EI, tarkista
uudelleen) sekä loput Länsi-/Pohjois-/Itä-Euroopasta (esim. ISL, MLT, LUX, ALB, MKD, SRB,
BIH, MNE, XKX, MDA, UKR, BLR, RUS jos peli kattaa ne — tarkista `MAA_KATEGORIAT`).
Sen jälkeen loput 115 maata aakkosjärjestyksessä.

**Työkaava (toimi hyvin tänään):** 3 agenttia rinnan per erä (isolation: worktree, EI
pushia), jokainen tutkii MAAKUNNAT_KAIKKI[iso]:n avaimet ja kirjoittaa lyhyt-tekstit
+ lähdekommentin, päivittää molemmat testitiedostot (ODOTETUT_MAARAT + ERASSA_1-joukko).
**Pääsessio cherry-pickaa AINA `origin/main`:sta uudelle haaralle** (ei edellisen erän
paikallisen haaran päälle, ellei edellinen erä ole vielä pushattu/mergetty — muuten tulee
kohdan 3 orpo-commit-tilanne). Konfliktit testitiedostoissa (ODOTETUT_MAARAT, ERASSA_1
-joukko) ovat aina samanmuotoisia ja helppoja ratkaista käsin (molemmat puolet ovat pelkkiä
lisäyksiä).

## 6. Ympäristö ja opit tältä vuorolta

- **Squash-junan orpo-commit-riski** (kohta 3): tarkista PR:n `state`/`mergedAt` ennen
  jatkotyötä samalle haaralle.
- **`git checkout <commit> -- .`** (koko työhakemiston tiedostojen korvaus tietystä
  commitista) on VAARALLINEN kesken kesken olevan editoinnin — se hiljaa hylkää
  committoimattomat muutokset ilman varoitusta. Käytä `git stash` (uniikilla tagilla, ks.
  ympäristöohje) tai committaa ensin WIP.
- **1873-historiallinen tarkkuus maakuntateksteissä:** monissa Euroopan maissa nykyiset
  alueet eivät kuuluneet samaan valtioon 1873 (esim. Kreikan Thessalia/Makedonia/Kreeta
  olivat Osmanivaltakuntaa, Joonianmeret liittyivät vasta 1864). Tarkista aina ennen
  1873-kytkennän kirjoittamista pitkä-teksteihin.
- **SendMessage/mcp-viestiraja** ~10/vuoro, varakanava `mcp__ccd_session_mgmt__send_message`.
- **Agenttien worktree-sijainti:** harness antaa usein valmiin worktreen
  `Matkakirja-fable/.claude/worktrees/agent-<id>` -polkuun, ei `tools/uusi-worktree.sh`:llä
  `/Users/Shared/Claude/wt/`-kansioon — agentit eivät aina noudata työtilasääntöä, koska
  ympäristö valitsee sen heidän puolestaan. Ei toimenpidettä, mutta `tarkista-tyotilat.sh`
  saattaa merkitä poikkeamia.
