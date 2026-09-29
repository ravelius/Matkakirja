# Sisältökirjurin luovutus 29.9.2026 klo ~16.1x (viikkokiintiö 94 %, tilinvaihto)

Kirjoittaja: Sisältökirjuri (Sonnet). Checkout-haara `sisalto-pelikatalogi-20260927`
@ `3cd55e449` (vain raportti, ei koodia — checkout-haaraa ei mergata äläkä poista).

## 1. Auki olevat PR:t (tarkistettu 16.1x)

| PR | Haara @ SHA | Tila | Seuraava askel |
|----|-------------|------|-----------------|
| #3593 E11 tila+tornikorjaus | `sisaltokirjuri-e11-tyon-alla` @ `1e0b67bb5` | MERGEABLE/CLEAN | odottaa Julkaisijan junaa |
| #3611 linssien esittelyt | `sisaltokirjuri-linssi-selitteet` @ `668faa0d3` | MERGEABLE (juuri rebasoitu, v2408) | odottaa Julkaisijan junaa |
| #3560 ISL pitkä+pulu | `sisaltokirjuri-isl-pitka-pulu` @ `090565fe4` | **DIRTY/CONFLICTING** | tarvitsee rebasen ennen mergeä — kysy Julkaisijalta onko ISL:n vuoro (ks. kohta 2) |

Kaikki kolme ovat MINUN pushaamiani, ei muiden. `gh pr view <nro> --json mergeable,mergeStateStatus` tarkistaa tuoreen tilan.

## 2. Maakunta-PR-jono (Julkaisijan mergejärjestys)

Alkuperäinen järjestys UKR→BGR→SRB→BIH→ISL→... — **UKR/BGR/SRB/BIH/#3556
(maalehti-Historia)/#3548 (ihmeet) ovat kaikki MERGATTU**. ISL (#3560) on
listalla seuraavana mutta DIRTY — kysy Julkaisijalta (`ListAgents`, hae
nimi) onko sen vuoro ennen rebasointia, äläkä rebasoi useampaa PR:ää
rinnakkain (sääntö: yksi kerrallaan, seuraava vasta edellisen ollessa
mainissa).

**Rata A -jono ISL:n jälkeen (ei vielä aloitettu):** ALB → MKD → MNE → CYP
→ MLT → LUX → MDA → BLR (pitkä + pulu), sitten 21 muuta maata (vain pulu).
Menetelmä lyhyesti (täysi kuvaus docs/raportit/viesti-sisaltokirjuri-
luovutus-20260928-b.md kohta 6, mutta se on vanha — tässä tiivistetty):
1. 1-2 Sonnet-tutkimusagenttia (Agent-työkalu, WebSearch), Livia-nykyaika-
   ääni, EI isoisä-runkoa, anna olemassa oleva `lyhyt`-teksti toiston
   välttämiseksi.
2. Sovella `js/packs/maakunnat-luonnehdinnat.js` (`pitka:` heti `lyhyt:`-
   rivin jälkeen) ja `js/packs/maakunnat-pulu.js` (uusi maa-lohko ennen
   viimeistä `};`). Poista maa `tests/maakunnat-pulu.test.mjs` ERASSA_1-
   listalta.
3. OMALLA topic-haaralla `origin/main`:sta (EI checkout-haarasta):
   `git checkout -b sisaltokirjuri-<aihe> origin/main`.
4. `node tools/uusi-versio.mjs`, testit, `node tools/build-standalone.mjs`,
   commit, push, PR.
5. `git fetch origin main` + `git merge-base --is-ancestor origin/main HEAD`
   JUURI ennen pushia — main liikkuu usein, versiocommitti tyhjenee
   rebasessa (ks. kohta 4 alla), aja uusi-versio.mjs uudelleen.

## 3. TÄRKEÄ OPETUS: versiocommitti tyhjenee rebasessa

Tässä vuorossa BIH (v2381), E11 (ei versiota, docs-only) ja linssien
esittelyt (v2397→v2398→v2408, KOLME kertaa) osuivat tähän: `git checkout
--ours sw.js js/main.js js/muutokset.js` rebase-konfliktin ratkaisussa
TEKEE VERSIOCOMMITISTA TYHJÄN (pudotetaan automaattisesti). Tarkista aina
`git diff origin/main -- js/main.js sw.js js/muutokset.js` rebasen
jälkeen — jos tyhjä, aja `node tools/uusi-versio.mjs "<kuvaus>"` uudelleen
ENNEN pushia.

## 4. Skeemaversion törmäys (opittu, ei enää auki)

#3548 (ihmeet) ja main käyttivät molemmat skeemaversiota 1.56 eri
sisällölle samaan aikaan. Ratkaisu: `tools/vienti/skeemasopimus.mjs`
VAATIMUKSET-oliossa duplikaattiavain jää huomaamatta (JS: jälkimmäinen
voittaa, hiljainen bugi) — jos rebase tuo kaksi PR:ää jotka molemmat
nostivat skeeman samaan numeroon, nosta oman PR:n numero yhdellä (+1) ja
aja `node tools/vienti/vie-sisalto.mjs` + `node tools/vienti/
skeemasopimus.mjs --paivita`.

## 5. Kenttänimitörmäykset linssidatassa (opittu)

`js/linssit/<tunnus>.js`:n LINSSI-oliossa `selite` on JO VARATTU
karttaselite-funktiolle (topografia.js, vesistot.js; luetaan js/ui.js
`linssi.selite?.()`). Uusi merkkijonokenttä linssin selitykselle on
`esittely` (PR #3611) — TARKISTA aina `grep -rn "linssi\.\(kenttä\)"
js/ui.js` ennen uuden kentän nimeämistä LINSSI-olioon.

## 6. Ei R2-kirjoitusavaimia tällä sessiolla

Koodaus-tilillä ei ole R2-bucket-avaimia (~/.zshrc tyhjä, avaintiedostossa
vain XAI_API_KEY) — Bash-luokitin estää myös avainten etsimisen muista
tiedostoista ("Credential Exploration"). E11:n kuvat (742 kt + 96 kt,
SHA-256 tarkistettu) vietiin ämpäriin JONKUN MUUN roolin kautta
(Päätoimittaja järjesti) — ne OVAT nyt ämpärissä (Päätoimittaja vahvisti
16.9. ilta). Jos tarvitset bucket-kirjoitusta jatkossa, pyydä Karttaseppää
tai Julkaisijaa, tai self-hosted-workflow `vie-karttanostot-ampariin.yml`
(vain karttanostot/-polku, oma Sisältökirjurin siirtokansio /Users/Shared/
Claude/siirto-sisaltokirjuri/).

## 7. Käynnissä olevat/hiljattain suljetut yhteistyöketjut

- **Linnanrakentaja** (uusi rooli, Olavinlinnan poikkileikkaus-linssi,
  natiivi): kaksi faktantarkistuskierrosta toimitettu, koottu raporttiin
  `docs/raportit/sisaltokirjuri-olavinlinna-faktantarkistus-20260929.md`
  (checkout-haarassa). Kärkilöydös: Kijlin torni väärin n1500-ajalle →
  Pyhän Eerikin torni. Jos Linnanrakentaja kysyy lisää (esim. muiden
  huoneiden lähderivejä), sama menetelmä: Sonnet-tutkimusagentti +
  Kansallismuseo/Museovirasto/Finna-lähteet.
- **Pelikoodari** (pelikoodari-pillerivalikko): linssien esittely-kenttä
  sovittu ja toimitettu (PR #3611), kaksi nimitörmäystä ratkaistu matkalla
  (selite→esittely, sitten vahvistettu ettei kolmatta törmäystä ole).
  Havainnekuvat (kaikilta 9 avatulta linssiltä puuttuu) Pelikoodarin
  kootavana Päätoimittajalle — ei minun vastuullani.
- **Postivahti**: scratchpad-siivous tehty (~1,0 Gt vapautui), 2 tyhjää
  worktreetä poistettu. `/private/tmp`:n 7 QA-kopiota (samireivinen-
  omisteisia, ei kirjoitusoikeutta koodaukselle) raportoitu — ei minun
  ratkaistavissani, tarvitsee omistajan tilin.

## 8. Muistisäännöt (ennallaan, ks. myös -28.9-luovutus)

- Ei "isoisä"/1873-mainintoja alue- ja maatekstissä; nykyaika edellä;
  13+ ei lastenpeli.
- BIH: ei sotaa eikä entiteettirajoja (jo mainissa, ei enää auki).
- Agentit vain Sonnet/Opus; VAIN EUROOPPA; älä mergaa äläkä poista
  checkout-haaraa `sisalto-pelikatalogi-20260927`.
- Jumi → Päätoimittaja (`ListAgents` nimen tarkistukseen), viestit ≤ 8
  riviä, vain valmis erä / jumi / kysymys.
- SONNET RAJATTUIHIN TEHTÄVIIN (omistaja 28.9. klo 23.3x): jokainen
  rajattu tehtävä (tekstitarkistus, aineistoerä, tutkimus) Agent-
  työkalulla Sonnet-ali-agentille (model sonnet, effort high), itse
  todennat ja julkaiset.
- Stash on jaettu worktreiden kesken: vain `git stash push -u -m
  "<tunniste>"` + `apply <sha>`.
