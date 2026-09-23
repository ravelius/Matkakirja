# Luovutus: Sisältökirjuri → Fable — 2026-09-23 klo 22.13 (Suomen aika, EEST/UTC+3)

Sisältökirjuri (Sonnet), konteksti täynnä useiden isojen erien
jälkeen. Edellinen luovutus: `docs/raportit/viesti-sisaltokirjuri-luovutus-20260923.md`
(aamun tilanne, aikaleimat + O7-worktreet).

## 1. Lue ensin

1. `CLAUDE.md`
2. `docs/roolitus.md`
3. Raamatun osio "Ydinajatus ja kohderyhmä" kohta "TYÖTAPA JA SESSIOT"
   (roolit, viestintä, haarasääntö)
4. Tämä raportti kokonaan ennen töiden jatkamista

## 2. Tila

**main = v2153**, SHA `3b45d1b1d` (origin/main, tarkistettu 23.9.2026
klo 22.13).

Tässä vuorossa valmistuneet (ei vielä main-oksassa, ks. kohta 3):

| Sisältö | PR | Tila |
|---|---|---|
| Afrikan O7-paketti erä 1 (Murzuk, Al Kufra, Gao, Karthago) | #2966 | avoin, testit vihreät |
| Afrikan O7-paketti erä 2 (Kimberley, Mosambik, Suakin, Ras Hafun, Viktorianputoukset, Kilimandžaro) | #2972 | avoin, testit vihreät |
| Afrikan faktakorjaukset (Big Hole, Suakin, Victoria Falls -silta, piri-piri, Livingstone-sitaatti) | #2973 | avoin, testit vihreät |
| Pulu-eleet: elävä kohdistus ilman kuittia (45/45 kaupunkia ämpärissä) | #2978 | **mergetty** |
| Sisältöinventaario natiiviin (kaupunkilehdet, maalehdet, herot, kartuscha, pulmapiirrokset) | #2981 | avoin, testit vihreät |
| N1-klusteri (Bryssel/Košice/Ljubljana nähtävyysjutut, Luxemburg/Valletta/San Francisco toinen aihesivu) | #2987 | avoin, testit vihreät |

## 3. Pushatut mutta julkaisemattomat haarat ja avoimet PR:t

Kaikki yllä olevat (paitsi #2978) ovat auki ja odottavat Julkaisijan
mergeä. `savukkeet-mac`-portti oli punainen #2966/#2972/#2973:ssa
Paris-lähizoomin ja glnimiot-nimien kuormaherkillä riveillä — **ei
liity näiden PR:ien sisältöön** (vain js/packs/africa-*.js ja
kulttuuri-kategoriat.js muutettu), Julkaisijan tavanomainen
--admin-merge riittää jos vain nuo rivit ovat punaisia. `testit`-portin
punaisuus (natiivin kultaiset jäljet) korjattiin mergaamalla
origin/main jokaiseen haaraan (#2979:n korjaus) — pitäisi nyt olla
vihreä kaikissa.

Ei muita omia pushattuja haaroja tai keskeneräisiä agentteja.
Kaikkien tämän session agenttien worktreet on siivottu
(`git worktree remove`) jokaisen erän assembloinnin jälkeen.

## 4. Kesken — tee nämä ensin

Priorisointi Fablen 23.9.2026 iltana antamassa järjestyksessä (N1 → N2
→ N3, hyväksytty inventaarion pohjalta PR #2981:ssä):

1. **N1 valmis, odottaa mergeä** — PR #2987 (ks. yllä). Ei enää
   toimenpiteitä minulta ellei CI punastu.
2. **N2: O-sarjan kaupunkilehdet, loput ~55 kaupunkia** (71 miinus
   O7:n 10, miinus tässä käsitellyt). Malli: 5 kaupunkia per PR,
   kansi + 1 aihesivu, faktat tuoreesta en-Wikipediasta, kuvat
   Commonsista lisenssitarkistuksella — täsmälleen sama kaava kuin
   PR #2966/#2972 (ks. niiden commit-viestit ja
   agentin-yhteiset-saannot.md). Loput puuttuvat kaupungit listattu
   PR #2981:n raportissa (docs/raportit/sisalto-inventaario-natiiviin-20260923.md),
   kohta "Kaikki 71 kokonaan puuttuvaa kaupunkilehteä" — HUOM raportti
   on kirjoitettu ennen O7 era1/era2/N1-mergejä, joten tarkista
   `KULTTUURI_KATEGORIAT`-avaimet tuoreesta mainista ennen seuraavan
   viiden valintaa, älä luota listaan sellaisenaan.
3. **N3: kartuschan 21 puuttuvaa maata** (ALB, BLR, MDA, MKD, MNE,
   SRB, SHN, HKG, ARM, AZE, GEO, PRK, KHM, LAO, BGD, BTN, KGZ, TJK,
   TKM, GRL, VUT). Tarvitaan `js/packs/*-maatiedot.js`-tyyliset rivit:
   vakiluku, pintaAla, demokratia {arvo, sija}, keskitulo {arvo, sija},
   tervehdykset [{teksti, kieli, osuus, lippu}]. Malli: mikä tahansa
   olemassa oleva maa samalta mantereelta. Riippumaton N2:sta, voi
   tehdä rinnakkain.

## 5. Odottaa omistajan päätöstä

Ei tällä hetkellä avoimia omistajan päätöstä vaativia kysymyksiä.
Kaikki tämän vuoron aikana syntyneet kysymykset (bergen/budapest-cue,
herot-väärä hälytys) on jo ratkaistu Fablen kanssa vuoron aikana.

## 6. Voimassa olevat työtavat

Ks. Raamatun "TYÖTAPA JA SESSIOT" ja `docs/roolitus.md`. Ei muutoksia
tässä vuorossa. Vahvistettu käytännössä toimivaksi tänään:

- **Rinnakkaiset Opus-agentit + jälkikäteinen splice-kokoonpano**:
  kun useampi agentti lisää sisältöä SAMAAN tiedostoon (esim.
  kulttuuri-kategoriat.js tai nahtavyysjutut.js), cherry-pick
  törmää lähes aina samaan "append tiedoston loppuun" -kohtaan.
  Ratkaisu: pura jokaisen commitin diff `git show <parent>` ja
  `git show <commit>` -tiedostopareilla, paikanna yhteinen
  alkuosa (`head -n N base.js` vs. variantti), ja liitä jokaisen
  variantin oma lisäys peräkkäin ennen tiedoston viimeistä riviä.
  Toimi puhtaasti 3 kertaa tänään (O7 era1: 4 kaupunkia,
  O7 era2: 6 kaupunkia, N1: 3 kaupunkia). EI toimi kun agentit
  muokkaavat SAMAA olemassa olevaa avainta (silloin oikea
  merge-konflikti, ratkaistava käsin).
- **CI-portin "testit" punaisuus stale-baseen**: jos PR on avattu
  ennen kuin joku korjaus (esim. #2979, kultaiset jäljet) mergetään
  mainiin, PR:n oma testit-ajo näyttää punaista vaikka muutos on
  kunnossa. Korjaus: `git merge origin/main` (ei rebase, jos haara on
  koottu splice-tekniikalla usean cherry-pickin summana — rebase
  toistaisi splice-konfliktit uudelleen jokaiselle commitille).

## 7. Julkaisukaava

Ei muutoksia. `docs/roolitus.md`:n "Julkaisusäännöt" on lähde.
Sisältökirjuri ei julkaise itse — avaa PR:n testit vihreinä ja
ilmoittaa Julkaisijalle suoraan (ei omistajan kortin kautta, koska
kyseessä rutiininomainen sisältö-PR).

## 8. Ympäristö ja infra

Ei muutoksia työkansioon, koneeseen tai CI-runnereihin. Ei uusia
avaimia eikä rutiineja. ElevenLabs/R2-avaimet käytetty vain
generoi-pulu.yml:n workflow_dispatch-ajoissa (GitHub Actions
-salaisuuksina, ei paikallisesti) — kolme ajoa tänään (1 kaupunki
-koe, 45 kaupungin täysi ajo, bergen-uusinta), kaikki onnistuivat.

## 9. Avoimet velat ja opetukset

**Velat:**
1. `js/packs/africa-artikkelit.js`:n Suakin-artikkeli (rivit
   ~1880–1900) toistaa samat lähteettömät väitteet (koralli sahattu,
   sulaminen sateisiin, kahvi, helmenkalastus) jotka korjattiin
   kulttuuri-kategoriat.js:n suakin-lehdessä. Ei korjattu — rajattu
   pois O7-tehtävän laajuudesta.
2. `js/packs/nahtavyysjutut.js`:n uudet Bryssel-jutut (Oikeuspalatsi,
   Mont des Arts) korvaavat pelissä `maakartat.js`:n vanhat
   kohdekentät (teksti+kuva), mutta vanhoja kenttiä ei poistettu
   maakartat.js:stä — turhaa dataa, ei toiminnallinen bugi
   (nähtävyysjutut voittaa aina). Siivottavissa milloin tahansa.
3. Košicen `maakartat.js`:n Valtionteatteri-kohteen vanha teksti
   väittää, ettei isoisän aikaan (1873) ollut vielä teatteria
   paikalla — sk-Wikipedian mukaan siellä oli vuoden 1788 teatteri
   vuoteen 1894 asti. Uusi nähtävyysjuttu ohittaa pelissä vanhan
   tekstin, mutta maakartat.js:n kenttää ei korjattu.

**Opetukset:**
- **"X/Y puuttuu" -inventaariolöydökset vanhenevat nopeasti tässä
  projektissa** — kolme kertaa tänään (kohdekartat 83/266, maalehdet
  E28, herot 8/45) osoittautui joko kokonaan tai osittain vääräksi
  hälytykseksi, koska joku toinen sessio oli jo tehnyt työn tai
  mittari mittasi väärää asiaa (esim. "käyttääkö generoitua
  hero-putkea" eikä "onko kuva olemassa"). **Tarkista aina suoraan
  koodista (Node-importilla) ennen kuin aloitat erää minkään
  aiemman inventaarion pohjalta**, älä luota listaan sellaisenaan.
- **`sovitaMerkit`-pohjainen sanakohdistus (tools/generoi-linssiluennat.mjs)
  desyncautuu pahasti yhdestäkin puuttuvasta/korruptoituneesta
  sanasta**, koska se ei synkronoi uudelleen sanarajoista epäonnistuneen
  täsmäyksen jälkeen — yksi väärä osuma ajaa koko loppuosan sekaisin.
  Testattaessa katoavia sanoja on turvallisinta poistaa ne TEKSTIN
  LOPUSTA, ei keskeltä, tai muuten koko jälkiosa näyttää väärin
  puuttuvalta.
- **ffprobe ei lue mp3:n kestoa putken (stdin) kautta** ilman
  seek-mahdollisuutta (palauttaa "N/A") — kirjoita väliaikaistiedostoon
  ensin. Löytyi testivaiheessa ennen tuotantoajoa, ei päätynyt bugiksi.

## 10. Aloitusviesti uudelle sessiolle

```
Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri.
Peli: Matkakirja, suomenkielinen selainseikkailupeli.

Ensimmäinen komento:
git fetch origin main && git checkout -B sisalto-tyo-$(date +%Y%m%d) origin/main

Lue ennen töiden aloittamista:
1. CLAUDE.md
2. docs/roolitus.md
3. Raamatun (js/tyohuone-raamattu.js) osio "Ydinajatus ja kohderyhmä",
   kohta "TYÖTAPA JA SESSIOT"
4. docs/raportit/viesti-fable-luovutus-20260923-ilta.md (tämä raportti) kokonaan

Sitovat säännöt tiiviisti: agentit vain Opus tai Sonnet (ei koskaan Fable-mallia
agenttina); yksi erä = yksi haara, worktreet /Users/Shared/Claude/wt/-alueelle;
kysymykset omistajalle aina AskUserQuestion-korttina; omistajan sanat Raamattuun
sanatarkasti; Suomen aika kaikissa aikaleimoissa, tarkista `date`-komennolla,
älä arvaa.

ENSIMMÄINEN TEHTÄVÄ: N2-erä — valitse seuraavat 5 kaupunkia puuttuvien
kaupunkilehtien listasta (tarkista tuoreesta mainista Node-importilla,
älä luota suoraan raportin listaan), kirjoita kansi+1 aihesivu jokaiselle
samalla kaavalla kuin PR #2966/#2972, kokoa yhteen PR:ään. Katso raportin
kohta 4 tarkemmat ohjeet.

Vastaa suomeksi, tiiviisti.
```
