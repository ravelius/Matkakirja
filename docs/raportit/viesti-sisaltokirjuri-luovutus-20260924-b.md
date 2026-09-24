# Luovutus: Sisältökirjuri — 2026-09-24 klo 07.02 (Suomen aika, EEST/UTC+3)

Konteksti 93 %, viikkokiintiö 86 % — Fablen käskystä nopea luovutus.
Edellinen luovutus: `docs/raportit/viesti-sisaltokirjuri-luovutus-20260924.md`
(PR #3005) — tämä jatkoi siitä N6:sta alkaen. N15 ehdittiin viedä
valmiiksi asti (splaissattu, testattu, pushattu) ennen luovutusta —
ks. kohta 3, ainoa jäljellä oleva askel on PR:n avaus.

## 1. Lue ensin

1. `CLAUDE.md`, `docs/roolitus.md`
2. Raamatun "TYÖTAPA JA SESSIOT" (roolit, viestintä Fablelle, haarasääntö)
3. `docs/moduulit/kaupunkilehti.md` (kansi+aihesivu-resepti "nature-spot"-erille)
4. Tämä raportti kokonaan

## 2. Tila

**main** ei ole muuttunut tässä vuorossa — kaikki alla olevat PR:t
odottavat Julkaisijaa (joka odottaa omistajan vastausta, jono aukeaa
aamulla Fablen mukaan).

### Tässä vuorossa avatut PR:t (N6–N14, kaikki auki, testit vihreät)

| PR | Erä | Kohteet |
| --- | --- | --- |
| #3006 | N6 | mountrushmore, hawaii, bali, milfordsound, ouropreto |
| #3013 | N7 | kilimandzaro, viktorianputoukset, sitka, bermuda, falkland |
| #3015 | N8 | caphorn, namib, robinsoncrusoe, norfolk, angola |
| #3016 | N9 | karthago, tanganjika, churchill, sierraleone, appalakit |
| #3017 | N10 | sthelena, kimberley, labrador, kappalmas, boavista (+ 1 rivin testikorjaus, ks. kohta 5) |
| #3018 | N11 | viktoria, gao, kamerun, suakin, ahaggar |
| #3020 | N12 | mosambik, darfur, tshadjarvi, rashafun, cayenne |
| #3021 | N13 | orjarannikko, bahrelghazal, sepik, broome, santarem |
| #3022 | N14 | murzuk, nullarbor, geraldton, joaopessoa, bananal (+ peilipolkukorjaus, ks. kohta 10) |

### Edellisen session PR:t (N1–N5 + julisteet, yhä auki)

| PR | Sisältö |
| --- | --- |
| #2987 | N1-klusteri: Bryssel, Košice, Ljubljana, Luxemburg, Valletta, San Francisco |
| #2991 | Julisteet: Bergen ja Sevilla |
| #2996 | N2: Managua, São Luís, San Juan, Nouméa, Puerto Montt |
| #3000 | N3: 17 maan kartuscha-tunnusluvut (ei kaupunkilehtiä, eri tiedosto) |
| #3002 | N4: Sahara, Kongo, Madagaskar, Galápagos, Machu Picchu |
| #3004 | N5: Yellowstone, Grand Canyon, Uluru, Iguazú, Titicaca |

**Yhteensä 60/71 kaupunkilehteä tehty** (N1–N14, pl. N3 joka on eri
mekanismi). Kaikki erät ovat itsenäisiä, tehty tuoreesta
`origin/main`:sta erikseen — Julkaisija voi mergetä missä
järjestyksessä tahansa.

## 3. Kesken — tee tämä ensin

**N15 on VALMIS mutta ilman PR:ää.** Kohteet: `alkufra`, `macapa`,
`campogrande`, `exmouth`, `sanambrosio` — kaikki katsottu, splaissattu
`js/packs/kulttuuri-kategoriat.js`:ään, testattu ja committoitu
haaraan **`sisalto-n15-5-maailmankohdetta`** (pushattu origin:iin,
commit "N15: viisi maailmankohdetta..."). `node --test`: 4164/0 fail.
`tools/tarkista-kaksoisavaimet.mjs`: ei kaksoisavaimia. Kuvien
ainutkertaisuus tarkistettu kaikkia N6–N14:n scratchpad-tiedostoja ja
tuoretta mainia vasten (kohta 6) — kaksi törmäystä löytyi ja
korjattiin (ks. kohta 10, opetukset 2 ja 6).

**AINOA jäljellä oleva tehtävä N15:lle: avaa PR.** Ei uutta työtä,
ei uusia agentteja, ei uutta splaissausta — vain:

```
cd /Users/Shared/Claude/Matkakirja-sisaltokirjuri
git fetch origin
git checkout sisalto-n15-5-maailmankohdetta
gh pr create --title "N15: viisi maailmankohdetta (Al Kufra, Macapá, Campo Grande, Exmouth, San Ambrosio)" --body "..."
```

Ilmoita Fablelle PR-numero yhdellä rivillä heti PR:n synnyttyä.

### Sen jälkeen: N16, viimeinen erä (6 kohdetta)

Puuttuvien 71 kohteen lista on tämän jälkeen enää kuusi:
`nome` (Alaska, pohjoinen), `portovelho` (Porto Velho, Amazonin
sademetsä), `kalgoorlie` (Länsi-Australian aavikko), `birdsville`
(Etelä-Australian aavikko), `mountisa` (Mount Isa, aavikko),
`cooberpedy` (Coober Pedy, aavikko). Nämä kaikki perustettiin 1880-
luvun jälkeen (kaivoskaupunkeja), joten 1873-ankkuria EI löydy
kaupungin perustamisesta — käytä samaa ratkaisua kuin Nullarborissa/
Exmouthissa: ankkuroi luontoon, geologiaan tai alkuperäiskansojen
(esim. Wongatha, Arabana, Kalkadoon) esikoloniaaliseen läsnäoloon, älä
keksi tapahtumaa jota ei ole. Kun N16 on PR:ssä, kaikki 71 kaupunkilehteä
on tehty — ilmoita tämä Fablelle erikseen, se on virstanpylväs.

## 4. Työtapa joka toimi (toista tätä N15:stä eteenpäin)

Sama resepti kuin edellisessä luovutuksessa (docs/raportit/viesti-
sisaltokirjuri-luovutus-20260924.md kohta 4), tarkennettuna:

1. Tarkista tuore puuttuvien lista Node-importilla (skripti alla).
2. Viisi rinnakkaista Sonnet-agenttia, yksi per kohde. Jokainen
   kirjoittaa VAIN scratchpadiin, EI kosketa repoa. Ohjeeseen aina:
   isoisän 1873-ankkuri (JOS aidosti löytyy — älä pakota, ks. N15:n
   sanambrosio-ohje niukasta lähdemateriaalista), EI nykypolitiikkaa/
   -sotaa, Commons-kuva tarkistettava API:lla JA silmin, minitehtävän
   vastaus samalta sivulta.
3. **UUSI OHJE N14:n jälkeen**: käske agentteja käyttämään lyhyitä,
   selvästi erottuvia Commons-tiedostonimiä ja tarkistamaan
   `grep -rn "TIEDOSTONIMI" js/packs/` ennen käyttöä — ks. kohta 10.
4. Kun kaikki 5 valmiit: lue itse läpi, tarkista pituudet (johdanto
   154–232, nosto 440–660, lyhyt ≤100 pisteeseen), sota/politiikka-
   avainsanat (`grep -iE "sota|hyökkä|invaasio|konflikti|kriisi"`) —
   kaikki tähänastiset osumat olivat historiallisia (>80v vanhoja) ja
   hyväksyttiin sellaisenaan.
5. Kuvien ainutkertaisuus (kohta 6) — TÄRKEIN toistuva virhelähde.
6. `git fetch origin main` + `git checkout -B sisalto-nX-5-...
   origin/main` AINA tuoreesta mainista.
7. Splaissaus: ks. kohdan 6 Node-skripti (indentointi +2 tarvittaessa).
8. `node --test tests/*.test.mjs` (4164 testiä, 0 fail — jos ei, ks.
   kohta 9) + `node tools/tarkista-kaksoisavaimet.mjs`.
9. Commit + push + `gh pr create` + ilmoita Fablelle PR-numero,
   enintään ~8 riviä.

## 5. Puuttuvien listan Node-skripti (päivitä claimed-lista jokaisen erän jälkeen)

```js
import { KULTTUURI_KATEGORIAT } from './js/packs/kulttuuri-kategoriat.js';
const packs = ['europe','africa','asia','middleeast','northamerica','southamerica','oceania'];
let all = [];
for (const p of packs) {
  const mod = await import('./js/packs/' + p + '.js');
  const top = Object.values(mod)[0];
  for (const c of top.cities) all.push({ pack: p, id: c.id, name: c.name, ambience: c.ambience });
}
// claimed = kaikki N1-N14 id:t (ks. taulukko kohdassa 2) + N15:n 5 id:tä kun PR auki
const claimed = new Set([/* ... */]);
const puuttuu = all.filter(c => !(KULTTUURI_KATEGORIAT[c.id] ?? []).some(k => k.id === 'kaupunki') && !claimed.has(c.id));
console.log(puuttuu.length);
for (const c of puuttuu) console.log(c.pack, c.id, c.name, c.ambience);
```

Aja tämä `git checkout origin/main -- .`-tasolla tai tuoreella
`sisalto-nX`-haaralla ennen jokaista uutta erää, koska main ei liiku
PR:ien mukana ennen mergeä — claimed-lista on ainoa tapa välttää
päällekkäistä työtä.

## 6. Kuvien ainutkertaisuuden tarkistustapa (KRIITTINEN, toistuva virhelähde)

Jokaisessa N-erässä on löytynyt vähintään yksi kuva, joka oli jo
käytössä joko toisessa avoimessa erässä tai vanhassa maalehdessä.
Tarkista AINA kolmea kohti ennen splaissausta:

```js
import fs from 'node:fs';
const dir = '<scratchpad-polku>';
const naytFiles = ['kohde1.js','kohde2.js', /* ... */]; // tämän erän 5 tiedostoa
const priorFiles = [/* KAIKKIEN aiempien N6-N14 (+N15 jos jo tehty) scratchpad-tiedostonimet — pidä lista ajan tasalla */];
function extract(f) {
  const txt = fs.readFileSync(dir + '/' + f, 'utf8');
  const re = /tiedosto:\s*\n?\s*['"](.+?)['"],?/g;
  let m; const out=[];
  while ((m = re.exec(txt))) out.push(m[1]);
  return out;
}
const seen = new Map();
for (const f of naytFiles) for (const file of extract(f)) { if(!seen.has(file)) seen.set(file,[]); seen.get(file).push(f); }
for (const [file, fs2] of seen) if (fs2.length > 1) console.log('DUPLIKAATTI ERÄN SISÄLLÄ:', file, fs2);
const naytSet = new Set(seen.keys());
for (const f of priorFiles) for (const file of extract(f)) if (naytSet.has(file)) console.log('RISTIIN-ERÄ-DUPLIKAATTI:', file, 'in', f);
const existing = fs.readFileSync('js/packs/kulttuuri-kategoriat.js', 'utf8'); // AJA tuoreesta origin/main:sta
for (const file of naytSet) {
  const esc = file.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re2 = new RegExp('tiedosto:\\s*\\n?\\s*[\'"]' + esc + '[\'"]');
  if (re2.test(existing)) console.log('JO MAINISSA:', file);
}
```

Jos duplikaatti löytyy: hae Commonsista eri kuva samasta aiheesta
(`curl` search API:lla), tarkista koko/lisenssi/tekijä, KATSO se
silmin ennen käyttöä, kirjoita selite sen mukaan mitä oikeasti näkyy —
älä vain vaihda tiedostonimeä säilyttäen vanhaa selitettä.

## 7. Odottaa omistajan päätöstä

Ei avoimia kysymyksiä tässä vuorossa.

## 8. Voimassa olevat työtavat

Ei muutoksia — ks. Raamatun "TYÖTAPA JA SESSIOT" ja
`docs/moduulit/kaupunkilehti.md`. Yksi tarkennus tälle nature-spot-
sarjalle: resepti on kevyempi kuin täysi 9-aiheen kaupunkilehti —
tasan 2 kategoriaa (`kaupunki` + 1 aihesivu), 5–7 nostoa per kategoria.

## 9. Julkaisukaava

Ei muutoksia. Sisältökirjuri ei nosta versionumeroa itse — se on
Julkaisijan tehtävä mergen yhteydessä (`docs/roolitus.md`,
"Julkaisusäännöt"). Tämän session PR:t sisältävät vain
`js/packs/kulttuuri-kategoriat.js`-muutoksia (+ PR #3017:ssä yksi
testirivi, ks. kohta 10).

## 10. Avoimet velat ja opetukset

**Opetukset (tärkeät, säästävät aikaa seuraavalta erältä):**

1. **Kuvien ainutkertaisuus ei riitä tarkistaa vain mainista** — se
   pitää tarkistaa myös KAIKKIA muita samaan aikaan avoimia erien
   scratchpad-tiedostoja vasten, koska main ei liiku ennen mergeä.
   Löytyi ja korjattiin: N8:n Angola-Livingstone-kuva vs N7 (PR #3015),
   N12:n Ras Hafun -suitsukekuvat vs olemassa oleva Omanin maalehti
   (PR #3020), N14:n Murzuk-Nachtigal/karttakuva vs N11/N12 (PR #3022).
2. **Pitkät, lähes identtiset Commons-tiedostonimet (saman kuvaajan
   "Paikka 01.jpg", "02.jpg", "03.jpg" -sarja) voivat törmätä
   peilipoluissa, vaikka tiedostonimet ovat teknisesti eri** —
   `tests/media.test.mjs` slugaa pitkät nimet ja katkaisee ne, jolloin
   kaksi eri-numeroista tiedostoa samasta sarjasta voi tuottaa saman
   peilipolun. Löytyi N14:ssä (PR #3022): João Pessoan majakkakuva
   "...02.jpg" törmäsi jo `js/packs/southamerica-valokuvat.js`:ssä
   olevaan "...03.jpg"-versioon. Korjaus: käytä lyhyempinimistä,
   selvästi erottuvaa kuvaa samasta aiheesta. Tästä eteenpäin agentit
   on ohjeistettu välttämään tällaisia sarjoja ja tarkistamaan
   `grep -rn` koko `js/packs/`-hakemistoa vasten (ei vain
   kulttuuri-kategoriat.js:ää) ennen kuvan valintaa.
3. **"Kuka oli Napoleon?" -testiesimerkki vanheni sisällön myötä**
   (PR #3017): `tests/pollo.test.mjs`:n "ei vastausta löydy" -vartija
   käytti sitä esimerkkinä aiheesta jolla ei ole osumaa — St. Helenan
   uusi Napoleon-aihesivu antoi sille oikean osuman. Vaihdettu toiseen
   aidosti vastauksettomaan kysymykseen, tarkistettu koko sisältöindeksiä
   vasten ennen vaihtoa. Jos vastaava testi hajoaa jatkossa jonkin
   toisen "ei osumaa" -esimerkin kohdalla, sama korjaustapa pätee: se
   ei ole bugi vaan merkki siitä, että peli oikeasti kattaa nyt sen
   aiheen.
4. **1873-ankkuria ei aina löydy — älä pakota sitä.** Australian
   1880-luvun jälkeen perustetuille kaivoskaupungeille (Kalgoorlie,
   Coober Pedy, Mount Isa, Nullarbor-alueen pikkukylät) ei ole
   rehellistä perustamisvuosi-ankkuria. Toimivaksi todettu ratkaisu:
   ankkuroi luonnonhistoriaan (geologia, eläimistö) tai varhaisempaan
   eurooppalaiseen tutkimusmatkailuun (esim. Eyre 1841 Nullarborissa),
   ei kaupungin omaan syntyyn.
5. **Zubayr Rahma Mansur, Heinrich Barth ja Gustav Nachtigal toistuvat
   useissa Saharan/Itä-Afrikan kohteissa** (Darfur, Bahr el Ghazal,
   Gao, Tšad-järvi, Murzuk) koska heidän oikeat retkensä todella
   kulkivat näiden kaikkien läpi. Jokaisessa lehdessä on tietoisesti
   käytetty ERI episodia samasta henkilöstä (ei toistettu samaa
   tarinaa) — tarkista tämä aina uutta samalle alueelle tehtävää
   lehteä kirjoittaessa, listaa aiemmat käytetyt episodit agentin
   ohjeeseen.

6. **`turvanimi()` (js/media.js) poistaa diakriitit ennen peilipolun
   laskemista** — kaksi muuten eri kuvatiedostoa, joiden ainoa ero on
   diakriittimerkintä (esim. "Fortaleza de Sao Jose de Macapa.JPG" vs
   "Fortaleza de São José de Macapá.JPG"), tuottavat AINA saman
   polun, ei vain silloin kun 90 merkin katkaisu sattuu osumaan
   kohdalle. Löytyi N15:ssä (haara sisalto-n15-5-maailmankohdetta):
   sama linnoitus, saman kaupunkilehden kaksi eri nostoa yrittivät
   käyttää samannimistä kohdetta eri diakriittikirjoituksella. Tarkista
   jatkossa myös TÄMÄ tapaus `grep`-haussa: älä vain etsi täsmälleen
   samaa tiedostonimeä, vaan myös samaa nimeä ilman ääkkösiä/
   aksentteja, jos kohteen nimessä on é/ä/ö/ã-tyyppisiä merkkejä.
7. **Lajien suomenkieliset nimet on tarkistettava laji.fi:tä tai
   Wikipediaa vasten, ei arvattava käännöksellä.** San Ambrosio-lehden
   agentti (N15) käytti aluksi suoraan käännettyjä tai keksittyjä
   nimiä ("mustasotka" Sterna fuscatalle, joka on oikeasti eri linnun
   eli telkkilinnun sukulaisen suomenkielinen nimi; "kermadeninmyrsky-
   lintu" ja "cookinmyrskylintu" Pterodroma-lajeille) ja korjasi ne
   itse ennen tiedoston valmistumista oikeiksi (nokitiira,
   maininkiviistäjä, pikkuviistäjä, amerikantuulihaukka). Tarkistin
   nämä vielä itse WebSearchilla laji.fi:tä vasten ennen splaissausta.
   Ohjeista jatkossa agentteja tarkistamaan jokainen suomenkielinen
   lajinimi erikseen (esim. haku `"<tieteellinen nimi> suomenkielinen
   nimi laji.fi"`) äläkä luota käännöskoneen tai oman muistin antamaan
   nimeen, etenkin harvinaisilla merilinnuilla ja valaskaloilla.

**Velat:** ei numeroituja, korjaamattomia velkoja tässä vuorossa.

## 11. Aloitusviesti uudelle sessiolle

```
Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri.
Peli: Matkakirja, suomenkielinen selainseikkailupeli.

Ensimmäinen komento:
git fetch origin main && git checkout -B sisalto-tyo-$(date +%Y%m%d) origin/main

Lue ennen töiden aloittamista:
1. CLAUDE.md
2. docs/roolitus.md
3. Raamatun (js/tyohuone-raamattu.js) osio "TYÖTAPA JA SESSIOT"
4. docs/moduulit/kaupunkilehti.md
5. docs/raportit/viesti-sisaltokirjuri-luovutus-20260924-b.md (tämä raportti) kokonaan

Sitovat säännöt tiiviisti: agentit vain Opus tai Sonnet; yksi erä = yksi haara,
AINA tuoreesta origin/main:sta; worktreet /Users/Shared/Claude/wt/-alueelle;
kysymykset omistajalle aina AskUserQuestion-korttina; Suomen aika kaikissa
aikaleimoissa, tarkista date-komennolla, älä arvaa.

ENSIMMÄINEN TEHTÄVÄ: N15 on jo valmis ja pushattu haaraan
sisalto-n15-5-maailmankohdetta (testit 4164/0 fail, ei kaksoisavaimia) —
avaa sille vain PR (kohta 3, ei uutta työtä). Sen jälkeen N16, viimeinen
erä (kohta 3): nome, portovelho, kalgoorlie, birdsville, mountisa,
cooberpedy — käytä luontohistoria-ankkuria kaupungin perustamisen
sijaan. Kun N16:n PR on auki, kaikki 71 kaupunkilehteä on tehty —
ilmoita tämä Fablelle virstanpylväänä.

Vastaa suomeksi, tiiviisti.
```
