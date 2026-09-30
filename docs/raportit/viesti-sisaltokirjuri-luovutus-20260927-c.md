# Luovutus: Sisältökirjuri 27.9.2026 klo 08.5x EEST (kontekstivaraus, ei vielä nollausta)

Edellinen: `viesti-sisaltokirjuri-luovutus-20260927-b.md` (mergetty
PR #3377:ssä). Tämä raportti jatkaa siitä — kirjoitettu Fablen
pyynnöstä kontekstin ollessa yli 68 %. Sessio jatkuu normaalisti tämän
jälkeen, ellei nollausta tarvita.

## 1. Lue ensin

1. `CLAUDE.md`
2. `docs/roolitus.md`
3. Tämä raportti kokonaan
4. Raamatun "TYÖTAPA JA SESSIOT" (ei muutoksia tässä vuorossa)

## 2. Tila

**main = v2303**, SHA `fd053ee1646da2231aed0490b7a278f37cf23ad3`
(tarkista `git fetch origin main` — liikkuu edelleen tiheään).

### Tämän vuoron aikana julkaistut/avatut PR:t

| Versio | PR | Tila | Sisältö |
|---|---|---|---|
| v2295 | [#3367](https://github.com/ravelius/Matkakirja/pull/3367) | MERGETTY | Maalehti-siirto: 28 kaupunkijuttua maalehtiin |
| v2298 | [#3370](https://github.com/ravelius/Matkakirja/pull/3370) | MERGETTY | Astronautin kamera erät 5–6: 35 kohdetta (141→176) |
| v2300 | [#3375](https://github.com/ravelius/Matkakirja/pull/3375) | MERGETTY | Astronautin kamera erä 7: 13 kohdetta (176→189), tilaus täynnä |
| — | [#3377](https://github.com/ravelius/Matkakirja/pull/3377) | MERGETTY | Luovutus -b (docs-only) |
| — | [#3206](https://github.com/ravelius/Matkakirja/pull/3206) | AUKI, mergeable juuri nyt | Turistiopas erä 19: Bananal, Boa Vista, Kap Palmas — **ÄLÄ REBASOI, Julkaisija hoitaa junassa (Fablen käsky 27.9. klo 08.4x)** |
| v2303 | [#3381](https://github.com/ravelius/Matkakirja/pull/3381) | AUKI, CONFLICTING juuri nyt | Erikoismalli-sisältötarkistus: Kinderdijk, Hohensalzburg, Matterhorn-nostot |
| v2304 | [#3382](https://github.com/ravelius/Matkakirja/pull/3382) | AUKI, mergeable juuri nyt | Maalehti-QA: CZE/IRL/NOR/LTU/SVK luettu, 2 pientä korjausta |

**HUOM #3381:** main on liikkunut sen jälkeen kun se avattiin, ja se on
nyt CONFLICTING. Toisin kuin #3206, tätä EI ole erikseen kielletty
rebasoimasta — mutta koska Julkaisija hoitaa junan, todennäköisesti
paras tapa on antaa Julkaisijan käsitellä sekin samassa yhteydessä.
Jos joku toinen sessio jatkaa tästä ja haluaa nopeuttaa, kaava on
kohdassa 8.

## 3. Pushatut haarat

- `sisalto-erikoismallit-tarkistus-20260927` → PR #3381 (auki)
- `sisalto-maalehti-qa-20260927` → PR #3382 (auki)
- `sisaltokirjuri-turistiopas-era19` → PR #3206 (auki, ÄLÄ KOSKE)
- `sisalto-luovutus-20260927-c` (tämä raportti) → pushataan heti
- Kaikki muut tämän vuoron haarat (`sisalto-maalehti-siirto-20260927`,
  `sisalto-astronautin-kamera-era5-20260927`,
  `sisalto-astronautin-kamera-era7-20260927`,
  `sisalto-luovutus-20260927-b`) on jo mergetty, voi poistaa.

Ei keskeneräisiä taustalla juoksevia agentteja.

## 4. Kesken — tee nämä ensin

1. **Odota omistajan suuntaa seuraavaan sisältötyöhön.** Fable on
   kysynyt omistajalta 27.9. klo 08.4x tienoilla; rivi tulee kun
   omistaja vastaa. Älä aloita uutta isoa sisältöpakettia omin päin
   ennen tätä.
2. **Älä rebasoi PR #3206:ta** — Fablen nimenomainen käsky 27.9. klo
   08.4x, Julkaisija hoitaa sen junassa. Jos näet sen olevan
   CONFLICTING, se on Julkaisijan asia, ei sinun.
3. Jos aikaa jää ennen omistajan vastausta: ei erityistä jonoa juuri
   nyt — kysy Fablelta ennen kuin keksit oman sisältötyön, koska
   omistajan suunta saattaa muuttaa priorisointia.

## 5. Odottaa omistajan/Fablen päätöstä

- **Kysymys omistajalle (Fable kysynyt 27.9. klo 08.4x):** mikä on
  seuraava sisältötyön suunta Sisältökirjurille? Ei omaa suositusta
  tässä kohtaa — odotetaan vastausta.
- Aiempi avoin kysymys (kohta 5, luovutus -b) 11:sta turvallisuussyistä
  ulkona jätetystä turistiopas-kohteesta on **RATKAISTU**: ne jäävät
  ulos, paketti on valmis (Fable 27.9. klo ~08.1x).
- Colosseum/Brandenburgin portti -kysymys (siirretäänkö sisältö
  takaisin lehteen fokuskohteet-järjestelmästä) on myös **RATKAISTU**:
  ei siirretä, migraatio oli tarkoituksellinen (Fable 27.9. klo ~08.2x).

## 6. Voimassa olevat työtavat

- Ei muutoksia Raamattuun tai `docs/roolitus.md`:hen tässä vuorossa.
- **UUSI OPETUS TÄLLE VUOROLLE:** main liikkui tänään poikkeuksellisen
  tiheään (useita merge-tapahtumia per 20–30 min), joten yhden PR:n
  versiokonflikti (js/main.js, sw.js, js/muutokset.js) piti korjata
  jopa 4 kertaa saman aamun aikana yhdelle PR:lle (#3206). Fable on nyt
  linjannut, että TOISTUVAA itse-rebasointia ei enää tehdä — Julkaisija
  kokoaa sisältöjunan ja hoitaa version lopullisen synkan. Sisältöä
  tuottava sessio avaa PR:n kerran, testaa sen kerran mergeable-tilassa,
  eikä jää vahtimaan sitä loputtomiin.

## 7. Ympäristö ja infra

- Työkansio: `/Users/Shared/Claude/Matkakirja-sisaltokirjuri`
  (Mac Studio, jaettu alue `/Users/Shared/Claude/`).
- Ei uusia avaimia, ei muutoksia rutiineihin tai ajastuksiin.
- Kaikki tämän session scratch-kansiot (`/tmp/matkakirja-astro-*`,
  `/tmp/landmark-check`, `/tmp/spotcheck7`) on siivottu.

## 8. Julkaisukaava (jos joku silti tarvitsee rebasoida)

```
git fetch origin main
git checkout <haara>
git merge origin/main --no-edit
# Konflikti on lähes aina VAIN js/main.js, sw.js, js/muutokset.js:
git checkout --theirs js/main.js js/muutokset.js sw.js
git add js/main.js js/muutokset.js sw.js
git commit --no-edit
node tools/uusi-versio.mjs "..."   # aja AINA mergen jälkeen uudelleen
node --test tests/*.test.mjs        # lue # pass / # fail
node tools/tarkista-kaksoisavaimet.mjs
node tools/build-standalone.mjs
git add -A && git commit -m "v...: versiokorjaus mergen jälkeen"
git push
```

Mutta ks. kohta 6 — Julkaisija hoitaa tämän nyt keskitetysti, joten
tätä ei pitäisi tarvita ainakaan #3206:lle.

## 9. Avoimet velat ja opetukset

**Velat:**
1. PR #3381 on CONFLICTING juuri nyt — Julkaisijan pitää rebasoida
   ennen mergeä (tai joku muu sessio, jos Julkaisija ei ehdi; kaava
   kohdassa 8).

**Opetukset (kertaus edellisestä raportista + uutta):**
1. Rakenna KOHTEET-taulukon lisäykset aina tuoreelta origin/main:lta
   uudella haaralla, älä vanhalta rebasoiden (astronautin kamera,
   erät 5/6/7 — toimi hyvin).
2. NASA-kuvan `~large.jpg`-rendaus pitää tarkistaa ennen kuin luottaa
   ehdokaskuvaan; ja aja aina `tests/satelliitti.test.mjs`:n
   uniikkius-tarkistus ennen mergeä.
3. `tests/vanha-maailma.test.mjs`:n umlauttitarkistus voi antaa väärän
   positiivin vieraskielisestä paikannimestä (esim. "Vila do Paiva" →
   "Paivan") — lisää tarkka, ISO ALKUKIRJAIN -erotteleva poikkeus.
4. **UUSI:** `id: 'kaupunki'` (kannen) -kategorialle EI SAA KOSKAAN
   lisätä `tehtava`-kenttää — `tests/lehdet.test.mjs` valvoo tätä,
   koska kannella on oma "kulttuurivisa"-mekanisminsa. Jos lisäät
   uuden noston kaupungin/pseudokaupungin kansikategoriaan (esim.
   Alpit), älä lisää sille tehtavaa, vaikka kategoriasta puuttuisi
   toistaiseksi minkäänlainen kysymys.
5. **UUSI:** Kun tarkistat onko jollain maamerkillä "Pulun kysymykset",
   tarkista ENSIN onko sen sisältö mahdollisesti siirretty pois
   kaupunki-/maalehdestä `js/packs/fokuskohteet-<iso3>.js`-
   karttapistejärjestelmään (koskee toistaiseksi vain DEU ja ITA;
   muilla mailla ei ole fokuskohteet-tiedostoa). Pelkkä 0-osuma
   kahdessa isossa tiedostossa ei tarkoita, ettei sisältöä ole
   lainkaan pelissä.
6. **UUSI:** maa-kategoriat.js:n ja kulttuuri-kategoriat.js:n
   jatkorivien sisennys vaihtelee (10992+588 riviä käyttää eri
   sisennystä kuin naapurinsa) — tämä on olemassa oleva, laajalti
   käytetty sekakäytäntö koko koodikannassa, ei virhe. Älä yritä
   yhtenäistää sitä laajasti; korjaa vain se yksittäinen kohta jota
   itse muokkaat, jos se pistää silmään.

## 10. Aloitusviesti uudelle sessiolle

```
Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri.
Ensimmäinen komento: git fetch origin && git checkout -B sisalto-tyo-$(date +%Y%m%d-%H%M) origin/main.
Lue CLAUDE.md, docs/roolitus.md, Raamatun "TYÖTAPA JA SESSIOT" ja
docs/raportit/viesti-sisaltokirjuri-luovutus-20260927-c.md kokonaan.

TILA lyhyesti: main = v2303. PR #3381 (erikoismallit) ja #3382
(maalehti-QA) ovat auki ja odottavat Julkaisijan junaa. PR #3206
(turistiopas) EI SAA rebasoida — Julkaisija hoitaa sen itse. Odotetaan
omistajan suuntaa seuraavaan sisältötyöhön (Fable kysynyt).

ENSIMMÄINEN TEHTÄVÄ:
1. Tarkista onko Fable välittänyt omistajan vastauksen seuraavasta
   sisältötyön suunnasta. Jos ei, kysy Fablelta ennen kuin aloitat
   mitään isoa omin päin.
2. Tarkista PR #3381/#3382/#3206 tila vain tiedoksi — älä koske
   #3206:een.
3. Jos jono on tyhjä eikä omistajan vastausta ole vielä tullut,
   odota — älä keksi omaa isoa sisältöpakettia.

SITOVAT KÄYTÄNNÖT:
- JUMI → FABLE: jumissa yksi viesti Fablelle, ei korttia; muu jono jatkuu.
- VIESTIRAJA: SendMessage ~10/vuoro; varakanava mcp send_message session id:llä.
- ÄLÄ rebasoi PR #3206:ta — Julkaisija hoitaa sen.
- `id: 'kaupunki'` (kannen) -kategorialle EI koskaan tehtava-kenttää.
- Tarkista fokuskohteet-<iso3>.js ennen kuin päätät että jokin
  maamerkki puuttuu kokonaan pelistä.
- Agentit vain Sonnet/Opus, enintään 3-4 rinnan.
```
