# Luovutus: Sisältökirjuri 27.9.2026 klo 08.0x EEST (kontekstivaraus, ei vielä nollausta)

Edellinen: `viesti-sisaltokirjuri-luovutus-20260927.md` (haara
`sisalto-luovutus-20260927`, ei mergetty mainiin). Tämä raportti on
kirjoitettu Fablen pyynnöstä ("luovutus valmiiksi ennen 85 %")
ETUKÄTEEN — sessio jatkuu tämän jälkeen normaalisti, ellei kontekstia
tarvitse nollata. Jos nollaus tulee, tästä jatketaan.

## 1. Lue ensin

1. `CLAUDE.md`
2. `docs/roolitus.md`
3. Tämä raportti kokonaan
4. Raamatun "TYÖTAPA JA SESSIOT" (ei muutoksia tässä vuorossa)

## 2. Tila

**main = v2299**, SHA `6e0ef79dd1fc93ab2d48e056eefeea6e6c4c6158`
(uusin haku hetki sitten — main liikkuu nopeasti, moni rooli aktiivinen
yhtä aikaa, tarkista `git fetch origin main` ennen jatkoa).

### Tässä vuorossa julkaistut/valmistuneet versiot

| Versio | PR | Sisältö |
|---|---|---|
| v2295 | [#3367](https://github.com/ravelius/Matkakirja/pull/3367) MERGETTY | Maalehti-siirto: 28 kaupunkijuttua kaupunkilehdistä maalehtiin (5 poikkeusta jää kaupunkiin: Dublin, Marseille, Lissabon, Barcelona-ihmistorni, Praha) |
| v2298 | [#3370](https://github.com/ravelius/Matkakirja/pull/3370) MERGETTY | Astronautin kamera erät 5–6: 35 uutta kohdetta (141→176) |
| v2300 (odottaa) | [#3375](https://github.com/ravelius/Matkakirja/pull/3375) AUKI | Astronautin kamera erä 7: 13 kohdetta (176→189) — **omistajan ~100 kohteen tilaus nyt täynnä** |
| v2300 (odottaa) | [#3206](https://github.com/ravelius/Matkakirja/pull/3206) AUKI | Turistiopas erä 19: Bananal, Boa Vista, Kap Palmas — rebasattu 70+ versiota jäljestä, korjattu myös oheinen testivirhe |

**HUOM version numerosta:** #3375 ja #3206 molemmat laskivat itselleen
v2300:n, koska kumpikin oli auki samaan aikaan. Kumpi tahansa mergetään
ensin saa v2300:n; toinen tarvitsee `node tools/uusi-versio.mjs`-ajon
uudelleen ennen omaa mergeään (normaali kaava, ks. kohta 8).

## 3. Pushatut haarat ja avoimet PR:t

- `sisalto-astronautin-kamera-era7-20260927` → PR #3375, AUKI,
  mergeable=MERGEABLE, testit 4438/4438 vihreät ajohetkellä. Ei
  toimenpidettä ellei main liiku ohi ennen mergeä (ks. HUOM yllä).
- `sisaltokirjuri-turistiopas-era19` → PR #3206, AUKI,
  mergeable=MERGEABLE juuri nyt (jouduin rebasoimaan mainiin KOLME
  kertaa tämän vuoron aikana, koska main ehti liikkua joka kerta
  ennen pushia — main on erittäin aktiivinen tänään). Jos tämä on
  taas DIRTY/CONFLICTING kun luet tätä: `git fetch origin main &&
  git merge origin/main`, ota `--theirs` versiotiedostoista
  (js/main.js, sw.js, js/muutokset.js), aja
  `node tools/uusi-versio.mjs "..."`, testit, build, commit, push.
  Sisältö itse (kolme uutta turistiopasta) ei ole koskaan
  konfliktoinut — vain versiotiedostot.
- `sisalto-luovutus-20260927-b` (tämä raportti) → ei vielä pushattu
  tätä kirjoittaessa, push heti tallennuksen jälkeen.
- Aiemmat haarat `sisalto-maalehti-siirto-20260927`,
  `sisalto-astronautin-kamera-era5-20260927` on jo mergetty, voi
  poistaa.

Ei keskeneräisiä taustalla juoksevia agentteja — kaikki kolme tämän
vuoron tutkimusagenttia (astronautin erät 5, 6, 7) raportoivat valmiiksi
ja niiden tuotokset on integroitu ja committoitu. `/tmp`-scratch-kansiot
on siivottu.

## 4. Kesken — tee nämä ensin

1. **Odota Fablen vastausta turistiopas-jatkoon.** Lähetin Fablelle
   koodista tarkistetun luvun: 14 kohdetta ilman `matkailijalle:`-
   kenttää, joista 3 on jo PR #3206:ssa (poistuu kun mergetään) ja 11
   on Fablen oman 24.9. turvallisuuspäätöksen mukaan TARKOITUKSELLA
   ulkona (docs/raportit/sisalto-inventaario-20260924.md kohta 9:
   darfur, suakin, bahrelghazal, rashafun, tshadjarvi, kamerun,
   sanambrosio, kongo, sahara, tanganjika, ahaggar — aktiivinen
   konflikti, asumaton saari tai epäselvä rajaus). Kysyin: jätetäänkö
   nuo 11 rauhaan (paketti silloin täysi) vai halutaanko jokin
   niistä uudella riskiarviolla käsittelyyn. **Älä tee sisältöä
   näille 11:lle ilman Fablen/omistajan nimenomaista ohitusta** —
   turvallisuuspäätös oli harkittu, ei vahinko.
2. **Seuraa PR #3375 ja #3206 mergeä.** Kun jompikumpi (tai molemmat)
   menee läpi, tarkista toisen versiokonflikti kohdan 3 ohjeella.
3. Ei muuta kesken-listalla tältä vuorolta.

## 5. Odottaa omistajan/Fablen päätöstä

- **Kysymys:** Käsitelläänkö jokin 11:sta turvallisuussyistä
  ulkona jätetystä turistiopas-kohteesta (ks. kohta 4.1) uudella
  riskiarviolla, vai pysyykö 24.9. päätös voimassa sellaisenaan?
  - **Suositus:** pidä 24.9. päätös voimassa. Konfliktialueet eivät
    ole rauhoittuneet kolmessa päivässä, eikä tällä sessiolla ole
    reaaliaikaista uutishakua tarkistaakseen tilanteen — sama rajoite
    joka oli jo 24.9. arviossa.

## 6. Voimassa olevat työtavat

- Ei muutoksia tämän vuoron aikana Raamattuun tai `docs/roolitus.md`:hen.
- Julkaisukaava (kohta 8 alla) on sama kuin `docs/roolitus.md`:n
  "Julkaisusäännöt", sovellettuna kolmesti tänään version
  race-tilanteeseen — ks. kohta 10 "Opetukset".

## 7. Ympäristö ja infra

- Työkansio: `/Users/Shared/Claude/Matkakirja-sisaltokirjuri`
  (Mac Studio, jaettu alue `/Users/Shared/Claude/`).
- Ei uusia avaimia, ei muutoksia rutiineihin tai ajastuksiin.
- Scratch-kansiot (`/tmp/matkakirja-astro-era56`,
  `/tmp/matkakirja-astro-era7`, `/tmp/spotcheck7`) siivottu pois
  tämän vuoron lopussa — jos jokin niistä on vielä olemassa, se on
  turvallista poistaa.

## 8. Julkaisukaava (sellaisena kuin se toimi tänään)

```
git fetch origin main
git checkout -B <haara> origin/main   # AINA tuore main, ei vanhaa haaraa
# ... sisältömuutokset ...
node tools/uusi-versio.mjs "Muutosrivi"
node --test tests/*.test.mjs          # lue # pass / # fail, ei katkaistua häntää
node tools/tarkista-kaksoisavaimet.mjs
node tools/build-standalone.mjs
git add -A && git commit -m "..."
git fetch origin main                 # main on saattanut liikkua committin aikana
git merge origin/main --no-edit       # jos konflikti: vain js/main.js, sw.js, js/muutokset.js — ota --theirs näihin
node tools/uusi-versio.mjs "..."      # aja UUDELLEEN mergen jälkeen
node --test tests/*.test.mjs && node tools/build-standalone.mjs
git add -A && git commit -m "v...: versiokorjaus mergen jälkeen"
git push -u origin <haara>
gh pr create --title "..." --body "..."
```

Tänään main liikkui 3–5 kertaa jokaisen ~20 min committausikkunan
aikana (moni rooli aktiivinen samaan aikaan), joten merge+versionosto
piti toistaa jopa kolme kertaa yhdelle PR:lle (#3206). Tämä on
odotettua, ei virhe — kaava on suunniteltu juuri tätä varten.

## 9. Avoimet velat ja opetukset

**Velat:**
1. PR #3375 ja #3206 tarvitsevat todennäköisesti vielä yhden
   versionkorjauksen ennen mergeä, koska molemmat laskivat v2300:n
   samaan aikaan (ks. kohta 2 HUOM).

**Opetukset:**
1. **Rakenna KOHTEET-taulukon lisäykset AINA tuoreelta mainilta**,
   älä vanhalta haaralta jota sitten rebasoit — vanha opetus (erä
   3/4:stä) piti paikkansa taas: `git checkout -B <uusi-haara>
   origin/main` juuri ennen lisäystä säästää ison
   taulukkomerge-konfliktin. Tein tämän oikein erille 5/6 ja 7.
2. **NASA-kuvan on oltava tarkistettu `~large.jpg`-renderöinniltä**
   ennen kuin luottaa ehdokaskuvaan — yksi kohde (`argudanin-pellot`)
   putosi hiljaa pois, koska NASAlla oli vain orig/medium/small/thumb.
   Työkalu (`tools/hae-satelliittihavainnot.mjs`) tulostaa
   "yksikään kuva ei vastannut" tällaisessa tapauksessa; tarkista aina
   ajon tuloste kokonaan.
3. **Aja `tests/satelliitti.test.mjs`:n "sama kuva ei saa esiintyä
   kahdessa eri pisteessä" -tarkistus** ennen kuin luottaa uusien
   kohteiden ainutlaatuisuuteen — `perito-moreno` (erä 6) käytti
   täsmälleen samaa kuvaa ja paikkaa kuin olemassa oleva
   `lago-argentino`, ja täysi testiajo paljasti sen heti.
4. **Umlauttitesti (`tests/vanha-maailma.test.mjs`) voi antaa väärän
   positiivin vieraskielisestä paikannimestä**, jonka suomen
   sijataivutus näyttää umlautittomalta typolta (`Vila do Paiva` →
   "Paivan kylään"). Lisää tarkka, ISO ALKUKIRJAIN -erotteleva
   poikkeus samaan tapaan kuin olemassa oleva `al-nahda`-poikkeus —
   älä koskaan väljennä koko sanaa listalta.
5. **Turistiopas-kattavuus kannattaa tarkistaa suoraan koodista**
   (`matkailijalle:`-kenttä jokaisen `kulttuuri-kategoriat.js`:n
   266 ylätason avaimen kohdalla), ei pelkästä 24.9. inventaariosta —
   se oli rajattu vain 71 kaupungin N-erään eikä kata koko peliä
   (esim. Ljubljana/Košice/Valletta eivät olleet sen piirissä mutta
   niillä on jo `matkailijalle:`).

## 10. Aloitusviesti uudelle sessiolle

```
Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri.
Ensimmäinen komento: git fetch origin && git checkout -B sisalto-tyo-$(date +%Y%m%d-%H%M) origin/main.
Lue CLAUDE.md, docs/roolitus.md, Raamatun "TYÖTAPA JA SESSIOT" ja
docs/raportit/viesti-sisaltokirjuri-luovutus-20260927-b.md kokonaan.

TILA lyhyesti: main = v2299. PR #3375 (astronautin kamera erä 7,
tilaus nyt täynnä 189 kohdetta) ja PR #3206 (turistiopas erä 19,
rebasattu) ovat auki ja mergeable — kumpikin voi tarvita vielä yhden
versionkorjauksen jos toinen mergetään ensin (raportin kohta 2/8).

ENSIMMÄINEN TEHTÄVÄ:
1. Tarkista onko Fable vastannut turistiopas-kysymykseen (raportin
   kohta 5): käsitelläänkö jokin 11 turvallisuussyistä ulkona
   jätetystä kohteesta. Jos ei vastausta, älä tee niitä omin päin —
   kysy uudelleen tai jatka muuhun jonoon.
2. Tarkista PR #3375 ja #3206 tila, korjaa versiokonflikti
   tarvittaessa raportin kohdan 8 kaavalla.
3. Jos molemmat mergetty eikä uutta jonoa: ilmoita Fablelle ja
   odota seuraavaa tehtävää.

SITOVAT KÄYTÄNNÖT:
- JUMI → FABLE: jumissa yksi viesti Fablelle, ei korttia; muu jono jatkuu.
- VIESTIRAJA: SendMessage ~10/vuoro; varakanava mcp send_message session id:llä.
- Rakenna KOHTEET-tyyppiset taulukkolisäykset aina tuoreelta
  origin/main:lta, älä vanhalta haaralta (raportin kohta 9.1).
- Agentit vain Sonnet/Opus, enintään 3-4 rinnan.
```
