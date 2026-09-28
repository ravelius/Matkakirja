# Luovutus: Sisältökirjuri 28.9.2026 klo ~12.5x EEST (konteksti ~70 %)

Jatkaa edellisen luovutuksen työtä: `docs/raportit/viesti-sisaltokirjuri-luovutus-20260928-k.md`.
Tämä raportti korvaa sen ja aiemman aloitusviestin ohjeet.

## 1. Lue ensin

1. `CLAUDE.md`
2. `docs/roolitus.md`
3. Tämä raportti kokonaan
4. Raamatun osio "TYÖTAPA JA SESSIOT" (kuusi roolisessiota, viestisäännöt)

## 2. Tila

- `main` oli tämän vuoron alussa `f43e3893e` (v2353-alue), nyt `b8682aed0`
  (Pelikoodarin PR #3528 mergetty, changelogin kärki v2355). **Main liikkuu
  useita kertoja tunnissa muiden roolien toimesta — fetch+rebase JUURI ennen
  jokaista versionostoa/pushia.**
- Julkaistut/valmiit tässä vuorossa:

| PR | Haara | Sisältö | Tila |
|---|---|---|---|
| #3534 | `sisaltokirjuri-bgr-pitka-pulu` | BGR pitkä+pulu, 28 maakuntaa (v2353, rebasoitu 4×) | OPEN, testit vihreät, mergeable |
| #3536 | `sisaltokirjuri-srb-pitka-pulu` | SRB pitkä+pulu, 24 maakuntaa (v2353) | OPEN, testit vihreät, mergeable |
| #3548 | `sisaltokirjuri-ihmeet-14maata-kytkenta` | Ihmeet-tilaus (14 kohdetta: 6 kadonnutta + 8 rappeutunutta), ks. kohta 5 | OPEN, testit vihreät, mergeable |
| #3549 | `sisaltokirjuri-bih-pitka-pulu` | BIH pitkä+pulu, 18 maakuntaa, ei sotaa/entiteettirajoja -erikoissääntö (v2355) | OPEN, testit vihreät, mergeable |
| #3520 | `sisaltokirjuri-kronborg-koordinaatti` | Edellisten sessioiden Kronborg-korjaus | OPEN (ei tämän vuoron työtä, ei koskettu) |

Kaikkien neljän uuden PR:n `testit`-tarkistus on vihreä. `savukkeet-mac`
epäonnistui #3534/#3536:lla — **omistaja PERUUTTI ne itse** (ydinrajoitus
klo 17 asti, ks. kohta 8), ei oikea vika. Omistaja poisti rajoituksen
12.43 (Julkaisija: "kevyt tila POIS → nice-oletus, täysi sarja sallittu").

## 3. Pushatut mutta julkaisemattomat haarat

Kaikki neljä yllä olevaa PR-haaraa. Ei muita pushaamattomia haaroja — myös
edellisen session (luovutus -k) committoimattomat raporttitiedostot
(CZE/HRV-korjaus, UKR batch1-2, maalehti-historia SRB/ALB+MKD/MNE+MDA/BLR)
on nyt committoitu ja pushattu checkout-haaraan `sisalto-pelikatalogi-20260927`
(commit `71222b7f4`).

## 4. TÄRKEIN ENSIMMÄINEN TEHTÄVÄ: ISL-tutkimusagentti kesken

Agentti (Sonnet, ISL:n 9 aluetta) käynnistettiin klo ~12.47, EI valmistunut
ennen resetiä. **Työtä ei ole committoitu minnekään.** Tarkista:

```
ls docs/raportit/sisaltokirjuri-isl-pitka-pulu-20260928.md
```

- Jos tiedosto on olemassa: lue se, tarkista pistokoe (0/9 isoisä/1873) ja
  sovella koodiin kohdan 6 menetelmällä (yksi haara, ei kahta erää — ISL:ssä
  vain 9 aluetta).
- Jos tiedostoa ei ole: agentti ei ehtinyt kirjoittaa raporttia (Write-kutsu
  puuttuu), joten käynnistä tutkimus uudelleen samalla ohjeistuksella kuin
  alla — ALUEET: Austurland, Höfuðborgarsvæði, Vestfirðir, Norðurland eystra,
  Norðurland vestra, Reykjavík, Suðurland, Suðurnes, Vesturland. VÄLTÄ
  Islannin 17 olemassa olevan maastokohteen aiheita
  (`js/packs/maastokohteet-isl.js`: Geysir, Þingvellir, Vatnajökull,
  Dettifoss, Mývatn, Eiríksstaðir, Grímsey, Laki, Reykholt, Hólar, Heimaey,
  Skálholt, Þjórsá) JA olemassa olevia `lyhyt`-tekstejä (kommentti
  `js/packs/maakunnat-luonnehdinnat.js`:ssä rivillä ~8810, ISL-osion yllä).
  Tyylisääntö sama kuin kohdassa 6: Livia, nykyaika edellä, ei isoisä/1873.

## 5. TÄRKEIN OPETUS TÄSTÄ VUOROSTA: ihmeet-PR:n kaksi bugia

PR #3548:aa tehdessä kaksi testiä (`fokusvirta.test.mjs`,
`nimiolimitys.test.mjs`) löysi kaksi asiaa, joita edellinen ihmeet-erä ei
huomannut. **Tarkista sama pistokoe jatkossa AINA kun lisäät
`rappeutunutKohde()`-tyyppisen ihmeen tai uuden karttamerkin ruuhkaiseen
maahan:**

1. **`ihmeKuva`-tiedostonimen on alettava `ihme-`-etuliitteellä**
   (`js/packs/monumentit-eurooppa.js` `rappeutunutKohde()`-funktio rakentaa
   osoitteen `.../kohtaamiset/ihmeet/${ihmeKuva}`, ja testi vaatii että
   TÄYSI osoite alkaa `.../ihmeet/ihme-`). Kaikki 8 uutta rappeutunutKohde-
   ihmettä oli nimetty maakoodilla (`bih-...`, `cyp-...` jne) ilman
   `ihme-`-etuliitettä — kaikki nimetty uudelleen. **HUOM: kuvia EI ole
   vielä ladattu ämpäriin (tarkistettu `curl -I`, 404 kaikilla 8:lla
   tiedostonimellä 28.9. klo ~09.30) — testi tarkistaa vain osoitteen
   MUODON, ei olemassaoloa. Kuvien lataus ämpäriin on erillinen,
   TEKEMÄTÖN tehtävä** (Codexin/Fablen kuvaputken asia, ei tämän session
   pystyssä tarkistettavissa ilman ämpärikirjoitusoikeutta).
2. **Uuden karttamerkin lisääminen ruuhkaiseen maahan voi rikkoa
   TÄYSIN ERI, kaukaisen maan sisäisen nimiöparin.** CYP:ssä uusi Varosha-
   merkki (6. merkki jo ahtaassa ryppäässä) aiheutti 4 nimiö-nimiö-
   limitystä olemassa olevien merkkien välillä (ei itse Varoshan kanssa!).
   Korjattu siirtämällä Varoshaa 2/-2 lautayksikköä (~6 km, yhä Famagustan
   alueella) — `tools/tarkista-nimiolimitys.mjs CYP` antoi nopean
   ruudukkohaun. NLD:ssä sama ilmiö (uusi Volksvlijt-merkki Amsterdamissa)
   rikkoi Delftin Naundorff/Leeuwenhoek-parin — TÄTÄ EI SAATU KORJATTUA
   siirtämällä (koko ±6–8,6 yksikön ruudukko kokeiltu, mikään ei riitä
   ilman että merkki siirtyisi pois Amsterdamista faktavirheeksi). Juurisyy:
   `js/fokuskohteet.js` `KAUPUNKIKATON_SADE`/`KAUPUNKINOSTOJEN_KATTO`
   (8 yksikköä / 3 merkkiä) — 6. merkki Amsterdamin ryppäässä työntää
   ruuhkanpudotuksen yli, ja sivuvaikutus näkyy kaukana Delftissä.
   Lisätty dokumentoituna poikkeuksena `tests/nimiolimitys.test.mjs`:n
   `ODOTTAVAT_LIMITYKSET`-listalle (sama malli kuin aiemmat SGP/TLS-
   tapaukset tiedostossa). **Oikea korjaus on ulkoasupäätös**: joko
   Volksvlijt Amsterdamin kaupunkilehden kohdekartalle (rajat OSUVAT JUURI
   JA JUURI Frederikspleinin kohdalle, `js/packs/maakartat.js
   KAUPUNKIKARTAT.amsterdam.rajat`) tai Delft-nimiön siirto/lyhennys —
   Karttasepän/Pelikoodarin päätös, ei kirjattu tähän raporttiin ratkaisuna
   vaan avoimena velkana (kohta 10).
   **TYÖKALU tästä eteenpäin:** `node tools/tarkista-nimiolimitys.mjs <ISO>`
   antaa nopean tarkistuksen yhdelle maalle ilman koko testisarjaa — käytä
   sitä AINA kun lisäät uuden merkin mihin tahansa maahan, jossa on jo
   paljon sisältöä (erityisesti pienet, tiiviit maat: CYP, MLT, LUX, NLD,
   BEL, saaret).

## 6. Menetelmä joka toimi (BGR/SRB/BIH, toista ISL:lle ja eteenpäin)

1. 1–2 tutkimusagenttia (Sonnet, WebSearch), ~9–14 aluetta per agentti.
   Ohjeistus AINA heti alusta: Livia-nykyaika-ääni, EI isoisä-runkoa edes
   ensimmäisellä yrittämällä (CZE/HRV/ROU-virhe, ei saa toistua). Anna
   agentille olemassa oleva `lyhyt`-teksti per alue niin se välttää
   toiston. Raportti `docs/raportit/sisaltokirjuri-<iso>-pitka-pulu-era{1,2}-20260928.md`.
2. Sovella `js/packs/maakunnat-luonnehdinnat.js`:ään (`pitka:` heti
   `lyhyt:`-rivin jälkeen, ennen `kuva:`) ja `js/packs/maakunnat-pulu.js`:ään
   (uusi `ISO: { alue: [...] }` -lohko tiedoston loppuun, ennen viimeistä
   `};`). Poista maa `tests/maakunnat-pulu.test.mjs`:n `ERASSA_1`-listalta.
3. `node tools/tarkista-kaksoisavaimet.mjs` + kohdennettu
   `node --test tests/maakunnat-pulu.test.mjs tests/sisaltopaketti.test.mjs`
   (nyt saa ajaa koko sarjan `nice -n 15`:llä, ks. kohta 8 — ei enää pakko
   kohdentaa, mutta kohdentaminen on silti nopeampi ensimmäinen tarkistus).
4. Työskentele OMALLA topic-haaralla `origin/main`:sta (EI checkout-
   haarasta `sisalto-pelikatalogi-20260927` — se on vain työtila, ei
   PR-pohja): committoi WIP checkout-haaralle, `git checkout -b
   sisaltokirjuri-<aihe> origin/main`, `git cherry-pick <wip-sha>`,
   ratkaise konfliktit (rutiinia `maakunnat-pulu.js`:ssä ja
   `tests/maakunnat-pulu.test.mjs`:n `ERASSA_1`-listassa — ota HEAD:n
   lista, poista siitä oma maasi), `git branch -f sisalto-pelikatalogi-20260927 <alkuperäinen-sha>`
   palauttaaksesi checkout-haaran ennalleen.
5. `node tools/uusi-versio.mjs "<kuvaus>"`, sitten koko testisarja
   (`node --test tests/*.test.mjs`, `nice -n 15` jos moni sessio ajaa
   yhtä aikaa), `node tools/build-standalone.mjs`, commit, push, PR.
6. **Main liikkuu useita kertoja per erä** — `git fetch origin main` +
   tarkista `git merge-base --is-ancestor origin/main HEAD` JUURI ennen
   pushia joka kerta; jos ei ajan tasalla, rebasoi uudelleen ja aja
   versionosto+testit+build UUDELLEEN (versionumero kolahtaa toisen PR:n
   kanssa muuten). Tässä vuorossa BGR piti rebasoita 4× ja versionumero
   vaihtui v2351→v2352→v2353 ennen kuin pysyi paikallaan pushin ajaksi.

## 7. Jono (rata A, järjestys)

UKR ✅ → BGR ✅ (#3534) → SRB ✅ (#3536) → BIH ✅ (#3549) →
**ISL (kesken, kohta 4)** → ALB → MKD → MNE → CYP → MLT → LUX → MDA →
BLR, sitten 21 muuta maata (vain Pulu, ei pitkä). Menetelmä kohdassa 6.

**RATA B (maalehden Historia-aihe + ihmeet) on EDELLEEN TEKEMÄTTÄ
SRB:lle/ALB:lle/MKD:lle/MNE:lle/MDA:lle/BLR:lle** — kolme agenttiraporttia
ovat valmiina soveltamiseen mutta EI vielä sovellettu:
- `docs/raportit/sisaltokirjuri-maalehti-historia-srb-alb-20260928.md`
- `docs/raportit/sisaltokirjuri-maalehti-historia-mkd-mne-20260928.md`
- `docs/raportit/sisaltokirjuri-maalehti-historia-mda-blr-20260928.md`

Nämä lisätään `js/packs/maa-kategoriat.js`:n olemassa oleviin
`MAA_KATEGORIAT[ISO]`-taulukoihin (Codexin `hetki-*`-olion VIEREEN, ei
korvaa) — #3529 on nyt mergetty, joten tälle ei ole enää estettä. Tämä oli
alkuperäisen luovutuksen (-k) kohta 3, ja se ohitettiin tässä vuorossa kun
ihmeet-PR (#3548) vaati enemmän työtä kuin odotettiin (kaksi bugia, kohta 5).
**Tämä on jonon toiseksi kärkevin tehtävä heti ISL:n jälkeen.**

## 8. Sitovat käytännöt (muuttuneet tässä vuorossa)

- **Ydinrajoitus PÄÄTTYI klo 12.43** (Julkaisija): paikalliset testit
  saa taas ajaa täytenä sarjana, mutta AINA `nice -n 15`:llä (uusi
  pysyvä oletus, ei vain tämän päivän rajoitus — "nice-oletus").
- JUMI → FABLE/PÄÄTOIMITTAJA: jumissa yksi viesti, ei korttia; muu jono
  jatkuu. **HUOM: Fable-sessio ei ollut tavoitettavissa (ListAgents) suuren
  osan tästä vuorosta — osoite näyttää siirtyneen "Päätoimittaja (Opus,
  xhigh)":lle. Tarkista ListAgentsilla kumpi on oikea osoite ennen
  viestintää.**
- VIESTIRAJA: SendMessage ~10/vuoro.
- Kohderyhmä 13+, EI lastenpeli.
- Agentit vain Sonnet/Opus.
- **BIH-erikoissääntö** (koodikommentti jo olemassa, nyt myös
  todennettu käytännössä): BIH:n `pitka`/`pulu`-tekstit eivät saa
  käsitellä Bosnian sotaa (1992–95) eivätkä federaation/Republika
  Srpskan entiteettirajoja. Herzegovina-Neretvan ensimmäinen ehdotus
  (Stari Most -silta) jouduttiin korvaamaan kokonaan, koska aihe oli jo
  varattu Sarajevon fokusvirtaan — tarkista AINA fokusvirran varatut
  aiheet ennen maakuntanoston aiheen valintaa (komment
  `js/packs/maakunnat-luonnehdinnat.js`:n maakohtaisten osioiden yllä
  listaa ne, esim. BIH:n "Sarajevon fokusvirran aiheet ... on vältetty").
- Älä mergaa checkout-haaraa `sisalto-pelikatalogi-20260927` äläkä
  poista sitä `--delete-branch`-lipulla.
- VAIN EUROOPPA on maantieteellinen rajaus.

## 9. Ympäristö ja infra

- Työkansio: `/Users/Shared/Claude/Matkakirja-sisaltokirjuri` (checkout-
  haara `sisalto-pelikatalogi-20260927`). Ei worktreeta tällä hetkellä —
  kaikki neljä PR-haaraa on tehty suoraan tässä checkoutissa
  (`git checkout -b <haara> origin/main` + cherry-pick), ei
  `tools/uusi-worktree.sh`:llä. Ihmeet-PR:n worktree
  (`/Users/Shared/Claude/wt/sisaltokirjuri-ihmeet-14maata-kytkenta`)
  POISTETTU (`tools/uusi-worktree.sh --poista`) heti PR:n avaamisen
  jälkeen, kuten sääntö vaatii.
- Kone: Mac Studio (sama kuin muut roolit).
- Ei uusia avaimia, ei uusia ajastuksia tässä vuorossa.

## 10. Avoimet velat ja opetukset

**Velat (numeroitu):**
1. NLD Naundorff/Leeuwenhoek-nimiölimitys — ks. kohta 5.2, vaatii
   ulkoasupäätöksen (Karttaseppä/Pelikoodari).
2. 8 uuden `rappeutunutKohde`-ihmeen kuvat eivät ole ämpärissä (404) —
   ks. kohta 5.1, Codexin/Fablen kuvaputken tehtävä.
3. Maalehden Historia-aihe 6 maalle tekemättä — ks. kohta 7, jonon
   kärkeä heti ISL:n jälkeen.
4. ISL-tutkimus kesken — ks. kohta 4.

**Opetukset:**
- **Tarkista AINA `tools/tarkista-nimiolimitys.mjs <ISO>` uuden
  karttamerkin jälkeen**, erityisesti pienissä/tiiviissä maissa —
  sivuvaikutus voi osua täysin toiseen, kaukaiseen maan sisäiseen
  pariin (KAUPUNKIKATON_SADE-ruuhkanpudotus on globaali maan sisällä,
  ei paikallinen).
- **`rappeutunutKohde()`/`kohde()`-ihmeiden `ihmeKuva`-tiedostonimen on
  AINA alettava `ihme-`** — tarkista tämä silmämääräisesti ennen PR:ää,
  testi (`fokusvirta.test.mjs`) huomaa sen mutta vasta ajon jälkeen.
- **Main liikkuu 3–5 kertaa tunnissa** kun monta roolia julkaisee
  rinnakkain — budjetoi rebase+uudelleentestaus jokaiseen PR:ään, älä
  oleta että yksi `fetch` riittää ensimmäisen ja viimeisen komennon
  välillä.
- Fable/Päätoimittaja-osoite vaihtui kesken vuoron ilman erillistä
  ilmoitusta minulle — jos `SendMessage` epäonnistuu "no agent named"
  -virheellä, tarkista `ListAgents` ennen kuin luovutat viestin
  lähettämättä.

## 11. Aloitusviesti uudelle sessiolle

```
Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri,
haara sisalto-pelikatalogi-20260927. Ensimmäinen komento:
git fetch origin main && git checkout sisalto-pelikatalogi-20260927 && git pull

Lue CLAUDE.md, docs/roolitus.md ja
docs/raportit/viesti-sisaltokirjuri-luovutus-20260928-b.md KOKONAAN ennen
töiden aloitusta.

TILA lyhyesti: neljä PR:ää auki testit vihreinä (#3534 BGR, #3536 SRB,
#3548 ihmeet, #3549 BIH). ISL-tutkimus jäi kesken edellisessä vuorossa —
tarkista docs/raportit/sisaltokirjuri-isl-pitka-pulu-20260928.md (ks.
luovutuksen kohta 4).

ENSIMMÄINEN TEHTÄVÄ: viimeistele ISL (kohta 4), sitten maalehden
Historia-aihe 6 maalle (kohta 7, raportit valmiina) — tämä ohitettiin
edellisessä vuorossa ihmeet-PR:n yllättävän työmäärän takia. Sen jälkeen
jatka rataa A: ALB → MKD → MNE → CYP → MLT → LUX → MDA → BLR (menetelmä
kohta 6).

SITOVAT KÄYTÄNNÖT: ks. luovutuksen kohta 8. Tarkista erityisesti onko
Fable vai Päätoimittaja oikea viestiosoite (ListAgents).
```
