# Luovutus: Sisältökirjuri 27.9.2026 klo 10.0x EEST (kontekstin nollaus)

Edellinen: `viesti-sisaltokirjuri-luovutus-20260927-c.md` (mergetty
PR #3383:ssa). Tämä on täysi kontekstin nollaus — istunto on ollut
käynnissä pitkään, ja Fable pyysi luovutusta ennen uutta isoa
tehtävää (pelikatalogi). Fable myös mergesi vahingossa edellisen
checkout-haaran `--delete-branch`-lipulla; checkout on palautettu
haaraan `sisalto-tyo-20260927-0958` (origin/main), josta tämä raportti
kirjoitetaan.

## 1. Lue ensin

1. `CLAUDE.md`
2. `docs/roolitus.md`
3. Tämä raportti kokonaan
4. Raamatun "TYÖTAPA JA SESSIOT" (ei muutoksia tässä vuorossa)
5. `docs/linssikatalogi.md` — malli uudelle pelikatalogi.md:lle (ks. kohta 4)

## 2. Tila

**main = v2310**, SHA `29cedef35d695333114b94deb60da212cf917cb0`
(tarkista `git fetch origin main` — liikkuu edelleen aktiivisesti).

Kaikki tämän session (aiemman kontekstin) avaamat PR:t on mergetty:

| PR | Sisältö | Tila |
|---|---|---|
| #3367 | Maalehti-siirto: 28 kaupunkijuttua maalehtiin | MERGETTY |
| #3370 | Astronautin kamera erät 5–6: 35 kohdetta (141→176) | MERGETTY |
| #3375 | Astronautin kamera erä 7: 13 kohdetta (176→189), tilaus täynnä | MERGETTY |
| #3377 | Luovutus -b (docs) | MERGETTY |
| #3206 | Turistiopas erä 19: Bananal, Boa Vista, Kap Palmas | MERGETTY |
| #3381 | Erikoismalli-sisältötarkistus: Kinderdijk, Hohensalzburg, Matterhorn | MERGETTY |
| #3382 | Maalehti-QA: CZE/IRL/NOR/LTU/SVK | MERGETTY |
| #3383 | Luovutus -c (docs) | MERGETTY |

**Ei mitään kesken, ei avoimia PR:jä, ei pushattuja haaroja odottamassa.**
Jono on tyhjä paitsi uusi tehtävä alla.

## 3. Pushatut haarat

- `sisalto-tyo-20260927-0958` (nykyinen checkout, origin/main-jäljitys,
  ei omia committeja) — Fable palautti tämän kun edellinen
  luovutushaara katosi vahingossa mergen `--delete-branch`-lipun takia.
  **ÄLÄ mergaa tätä haaraa — se on vain checkout, ei työhaara.**
- `sisalto-luovutus-20260927-d` (tämä raportti) → pushataan heti.
- Kaikki muut tämän session haarat on jo mergetty ja voi poistaa.

Ei keskeneräisiä taustalla juoksevia agentteja.

## 4. UUSI TEHTÄVÄ — Pelikatalogi (omistajan suunta 27.9. klo 09.5x)

Omistaja: pelit ovat yhtä merkittävä osa peliä kuin linssit, ja niille
tehdään oma suunnittelusivu **`docs/pelikatalogi.md`**, malliksi
`docs/linssikatalogi.md` (elävä luettelo + koneluettava data-tiedosto +
HTML-sivu — **HTML/Pages-kopio pelikatalogi.html tulee Pelikoodarilta,
EI Sisältökirjurin vastuulla**, tee vain markdown-sisältö).

### Sisältö (ensimmäinen versio)

1. **Lista peleistä**, joita Euroopan reittikaupungeista/maista voisi
   löytyä: perinteiset kortti-, lauta-, piha-, pallo- ja tanssipelit,
   tori- ja huvipuistopelit (esim. narunveto, pallonheitto).
   Järjestä maittain/kaupungeittain. **1–2 riviä per peli:**
   - säännöt (lyhyesti)
   - oppimiskytkös (historia, kieli, laskenta, maantieto — mitä pelistä oppii)
   - sopivuus 13+ (kohderyhmä on 13 vuotta täyttäneet ja aikuiset,
     EI lastenpeli — ks. CLAUDE.md)
   - pelataanko bottia vai kaveria vastaan
   - miten se kertyy matkakirjaan (pelin oma kokoelmamekaniikka)
2. **Oikeudet jokaiselle pelille:** käytettävissä suoraan (public
   domain / kansanperinne, ei nykyistä tekijänoikeutta) VAI tarvitaan
   oma versio (tavaramerkki/patentti estää suoran kopion — esim.
   Uno, Tetris → oma muunnelma samalla mekaniikalla mutta eri nimellä
   ja ulkoasulla). Merkitse lähde jokaiselle (mistä tieto on
   tarkistettu, esim. Wikipedia-artikkeli).
3. **Ehdotus 10 ensimmäisestä pelistä**, jotka kannattaisi toteuttaa
   ensin (perustelu: helppo toteuttaa, hyvä oppimiskytkös, kattaa eri
   pelityyppejä ja mantereita/maita).
4. **Oma osio "Omistajan ideat"** — tyhjä taulukko/lista, johon
   omistaja voi itse lisätä pelejä myöhemmin. Ei täytetä valmiiksi.

### Linja

- **Vähemmän pelkkää tietovisaa, enemmän pelejä joissa oppii tekemällä**
  (ei siis lisää monivalintakysymyksiä — peli itsessään opettaa,
  esim. korttipeli jonka pisteytys opettaa laskemista, tai lauta-
  peli jonka reitti opettaa maantietoa).
- Kohderyhmä 13+ (Raamatun ja CLAUDE.md:n perustuslaki: EI lastenpeli).

### Menetelmä

- **Tutkimusagentit maittain** (Sonnet/Opus, 3–4 rinnan — ks. Raamattu
  "AGENTIT VAIN OPUS JA SONNET"), Sisältökirjuri kokoaa yhteen
  dokumentiksi. Sama kaava kuin aiempien laajojen tutkimustehtävien
  (esim. tämän session astronautin kamera -erät): anna agenteille
  selkeä maalista ja pelikohtainen tarkistuslista (säännöt, oppimis-
  kytkös, oikeudet, lähde), ei päällekkäisyyttä agenttien välillä.
- PR Julkaisijan junaan (docs-muutos, ei versionnostoa — ks.
  `docs/roolitus.md` "Julkaisusäännöt" kohta 4).
- Rivi Fablelle kun valmis.

### Ei vielä tehty mitään

Tämä on täysin aloittamaton — ei tutkimusta, ei luonnosta, ei
haaraa. Uusi sessio aloittaa tyhjästä.

## 5. Odottaa omistajan/Fablen päätöstä

Ei avoimia kysymyksiä juuri nyt. Kaikki aiemmat (11 turvallisuus-
kohdetta, Colosseum/Brandenburg) on ratkaistu edellisessä raportissa.

## 6. Voimassa olevat työtavat

Ei muutoksia tässä vuorossa. Ks. edellisen raportin (-c) kohta 6 ja 9
opetuksista, jotka ovat yhä voimassa:
- `id: 'kaupunki'` (kannen) -kategorialle EI koskaan `tehtava`-kenttää.
- Tarkista `js/packs/fokuskohteet-<iso3>.js` ennen kuin päätät että
  jokin maamerkki puuttuu kokonaan pelistä (koskee toistaiseksi DEU/ITA).
- Rakenna KOHTEET-tyyppiset taulukkolisäykset aina tuoreelta
  origin/main:lta uudella haaralla, älä vanhalta rebasoiden.
- Main liikkuu poikkeuksellisen tiheään — älä jää vahtimaan yhtä PR:ää
  loputtomiin, Julkaisija hoitaa junan.

## 7. Ympäristö ja infra

- Työkansio: `/Users/Shared/Claude/Matkakirja-sisaltokirjuri`
  (Mac Studio, jaettu alue `/Users/Shared/Claude/`).
- Ei uusia avaimia, ei muutoksia rutiineihin tai ajastuksiin.
- Kaikki scratch-kansiot siivottu.
- **HUOM checkout-haaroista:** älä anna kenenkään mergata Sisältö-
  kirjurin checkout-haaraa `--delete-branch`-lipulla — se katkaisee
  checkoutin kesken session (tapahtui tässä vuorossa, Fablen oma
  virhe, korjattu). Työhaarat ovat aina omia `sisalto-*`-nimisiä
  haaroja, ei koskaan sama kuin checkout-haara.

## 8. Julkaisukaava

```
git fetch origin main
git checkout -B <haara> origin/main
# ... sisältömuutokset ...
node tools/uusi-versio.mjs "Muutosrivi"   # EI docs-only-muutoksille
node --test tests/*.test.mjs
node tools/tarkista-kaksoisavaimet.mjs
node tools/build-standalone.mjs           # EI docs-only-muutoksille
git add -A && git commit -m "..."
git push -u origin <haara>
gh pr create --title "..." --body "..."
```

Jos main ehtii liikkua committin jälkeen: `git fetch origin main &&
git merge origin/main --no-edit`, ota `--theirs` vain js/main.js:ään,
sw.js:ään ja js/muutokset.js:ään konfliktissa, aja `uusi-versio.mjs`
uudelleen. Docs-only-pelikatalogi-PR:lle versionostoa ei tarvita.

## 9. Avoimet velat ja opetukset

**Velat:** ei numeroituja velkoja tällä hetkellä.

**Opetukset (kertaus, yhä voimassa):**
1. KOHTEET-taulukkolisäykset aina tuoreelta origin/main:lta.
2. NASA-kuvan `~large.jpg`-rendaus tarkistettava; uniikkiustesti ajettava.
3. Umlauttitestin väärät positiivit vieraskielisistä paikannimistä —
   kapea, ISO ALKUKIRJAIN -erotteleva poikkeus.
4. `id: 'kaupunki'` ei koskaan `tehtava`-kenttää.
5. Tarkista fokuskohteet-järjestelmä ennen "puuttuu kokonaan" -päätelmää.
6. Sisennys vaihtelee laajalti koko koodikannassa — ei virhe, älä
   yhtenäistä laajasti.
7. **UUSI:** kun toinen rooli mergaa checkout-haarasi, käytä
   `--delete-branch`-lippua VAIN työhaaroille, ei koskaan session
   checkout-haaralle (jonka nimi ei ala `sisalto-<aihe>-<pvm>` vaan on
   session-kohtainen `sisalto-tyo-<pvm>-<aika>`).

## 10. Aloitusviesti uudelle sessiolle

```
Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri.
Ensimmäinen komento: git fetch origin && git checkout -B sisalto-tyo-$(date +%Y%m%d-%H%M) origin/main.
Lue CLAUDE.md, docs/roolitus.md, Raamatun "TYÖTAPA JA SESSIOT",
docs/linssikatalogi.md (malli) ja
docs/raportit/viesti-sisaltokirjuri-luovutus-20260927-d.md kokonaan.

TILA lyhyesti: main = v2310. Kaikki edellisen vuoron PR:t mergetty,
jono tyhjä. UUSI TEHTÄVÄ omistajalta: docs/pelikatalogi.md — kts.
raportin kohta 4 täydelle spekille.

ENSIMMÄINEN TEHTÄVÄ:
1. Suunnittele pelikatalogin rakenne docs/linssikatalogi.md:n mallilla
   (elävä luettelo + oikeudet + 10 ensimmäisen ehdotus + omistajan
   ideat -osio).
2. Käynnistä tutkimusagentit maittain (Sonnet/Opus, 3-4 rinnan),
   selkeä tarkistuslista jokaiselle pelille (säännöt, oppimiskytkös,
   sopivuus 13+, botti/kaveri, oikeudet, lähde).
3. Kokoa tulokset docs/pelikatalogi.md:hen, PR Julkaisijan junaan
   (docs-only, ei versionostoa), rivi Fablelle.

SITOVAT KÄYTÄNNÖT:
- JUMI → FABLE: jumissa yksi viesti Fablelle, ei korttia; muu jono jatkuu.
- VIESTIRAJA: SendMessage ~10/vuoro; varakanava mcp send_message session id:llä.
- Kohderyhmä 13+, EI lastenpeli.
- Vähemmän tietovisaa, enemmän pelejä joissa oppii tekemällä.
- `id: 'kaupunki'` (kannen) -kategorialle EI koskaan tehtava-kenttää.
- Agentit vain Sonnet/Opus, enintään 3-4 rinnan.
```
