# Luovutus: Sisältökirjuri — 2026-09-24 klo 00.09 (Suomen aika, EEST/UTC+3)

Konteksti 71 %, Fablen käskystä lyhyt luovutus ennen resetiä. Edellinen
luovutus: `docs/raportit/viesti-fable-luovutus-20260923-ilta.md` (siitä
jatkettiin).

## 1. Lue ensin

1. `CLAUDE.md`, `docs/roolitus.md`
2. Raamatun "TYÖTAPA JA SESSIOT" (roolit, viestintä, haarasääntö)
3. `docs/moduulit/kaupunkilehti.md` (kansi+aihesivu-resepti)
4. Tämä raportti kokonaan

## 2. Tila

**main = v2153** (ei muuttunut tässä vuorossa — kaikki alla olevat PR:t
odottavat Julkaisijaa). Tässä vuorossa avatut PR:t:

| PR | Sisältö | Tila |
|---|---|---|
| #2991 | Julisteet: Bergen ja Sevilla (kuparipiirros) | avoin, testit vihreät, R2:ssa jo |
| #2996 | N2: 5 kaupunkilehteä (Managua, São Luís, San Juan, Nouméa, Puerto Montt) | avoin, testit vihreät |
| #3000 | N3: 17 maan kartuscha-tunnusluvut (Balkan, Kaukasus, Keski-/Etelä-Aasia) | avoin, testit vihreät |
| #3002 | N4: 5 luontokohdetta (Sahara, Kongo, Madagaskar, Galápagos, Machu Picchu) | avoin, testit vihreät |
| #3004 | N5: 5 luontokohdetta (Yellowstone, Grand Canyon, Uluru, Iguazú, Titicaca) | avoin, testit vihreät |

Jokainen PR on oma haaransa (`sisalto-tyo-20260923`, `sisalto-n2-viisi-kaupunkia`,
`sisalto-n3-17-maata`, `sisalto-n4-5-maastokohdetta`, `sisalto-n5-5-maastokohdetta`),
tehty tuoreesta `origin/main`:sta erikseen — eivät riipu toisistaan,
Julkaisija voi mergetä missä järjestyksessä tahansa (paitsi #3000 koskee
eri tiedostoja kuin muut, ei konflikteja odotettavissa).

## 3. N2/N3/N4/N5: mitä "71 kaupungin lista" on ja miten sitä jatketaan

Fablen tehtävänanto: täytä puuttuvat "kaupunkilehdet" (`KULTTUURI_KATEGORIAT`-
taulun `kansi + 1 aihesivu` -rakenne, ks. kaupunkilehti.md) kaikille kartan
71 paikalle, joilta se puuttuu — 5 kerrallaan, yksi PR per erä. Alkuperäinen
71:n lista sisälsi sekä oikeita kaupunkeja että luonnonkohteita (aavikoita,
jokia, vuoria) — kaikki "kaupungit" (ambience: kaupunki/satama/basaari)
on nyt tehty (N2), loput 46 ovat luonnonkohteita (N4, N5 ja jatko).

**Tuore lista tarkistetaan AINA Node-importilla ennen uutta erää** (vanha
lista vanhenee heti kun joku PR mergetään):

```js
import { KULTTUURI_KATEGORIAT } from './js/packs/kulttuuri-kategoriat.js';
const packs = ['europe','africa','asia','middleeast','northamerica','southamerica','oceania'];
let all = [];
for (const p of packs) {
  const mod = await import(`./js/packs/${p}.js`);
  const top = Object.values(mod)[0];
  for (const c of top.cities) all.push({ pack: p, id: c.id, name: c.name, ambience: c.ambience });
}
const puuttuu = all.filter(c => !(KULTTUURI_KATEGORIAT[c.id] ?? []).some(k => k.id === 'kaupunki'));
```

**HUOM:** koska main ei ole vielä nielaissut yhtäkään tämän vuoron PR:istä,
tuo tarkistus paikallisesta checkoutista näyttää N2–N5:n kohteet YHÄ
puuttuvina. Ennen seuraavaa erää joko (a) odota että Julkaisija on
mergennyt edelliset, tai (b) pidä käsin lista jo tehdyistä id:istä ja
suodata ne pois (näin tehtiin tässä vuorossa, ks. inventaarioskriptit
scratchpadissa — eivät säily resetin yli, kirjoita lista tästä
raportista).

**Jäljellä 46 kpl** (main-tila + tämän vuoron 5 PR:ää poistettu):
africa: ahaggar, sierraleone, kappalmas, orjarannikko, tshadjarvi,
kamerun, angola, namib, sthelena, viktoria, tanganjika, bahrelghazal,
darfur · northamerica: nome, sitka, mountrushmore, churchill, labrador,
appalakit, bermuda, hawaii · southamerica: boavista, cayenne, macapa,
santarem, joaopessoa, portovelho, bananal, campogrande, ouropreto,
sanambrosio, robinsoncrusoe, falkland, caphorn · oceania: broome,
kalgoorlie, nullarbor, birdsville, exmouth, mountisa, cooberpedy,
geraldton, sepik, norfolk, milfordsound, bali

**Ehdotus N6:lle** (tunnettuja, hyvin lähteillä katettuja): Mount
Rushmore, Havaiji, Bali, Milford Sound, Ouro Preto.

**HUOM `sthelena` (St. Helena)**: tämä EI ole sama asia kuin maatiedot-
taulun SHN (ISO-maakoodi) — St. Helena on Afrikan-laudan karttapiste
(kaupunkilehti puuttuu, saa tehdä normaalisti), kun taas SHN-niminen
poissulkulista (ks. kohta 5) koskee vain `js/packs/*-maatiedot.js`-
kartuscha-rivejä. Älä sekoita näitä kahta.

## 4. Työtapa joka toimi (toista tätä N6:sta eteenpäin)

1. Tarkista tuore puuttuvien lista (kohta 3), valitse 5.
2. **Rinnakkaiset Sonnet-agentit, yksi per kohde**, resepti kaupunkilehti.md:n
   mukaan (kansi 5-7 nostoa + 1 aihesivu 4-7 nostoa + minitehtävä), jokainen
   kirjoittaa VAIN scratchpadiin, EI kosketa repoa. Ohjeeseen aina: Commons-
   kuva tarkistettava sekä rajapinnalla (koko+lisenssi) että silmin
   (WebFetch kuvaussivulle) ennen käyttöä, EI nykypolitiikkaa/-sotaa,
   isoisän 1873-ankkuri jos sopiva löytyy.
3. Kun kaikki 5 valmiit: lue jokainen läpi itse, tarkista pituudet
   (johdanto 154-232, teksti 440-660, lyhyt <=100 piste lopussa) ja
   sota/politiikka-avainsanoilla (`grep -iE "sota|hyökkä|invaasio|konflikti|kriisi"`)
   — löytyi kerran (Moldova/Ukraina-viittaus N3:ssa), korjattiin käsin.
4. **Splice-kokoonpano**: agenttien tiedostot eivät ole yhtenäisessä
   muodossa (osa `id: [...]`, osa `export const X = [...]`, osa
   `export default {...}`) — pura jokainen Node-skriptillä täsmälleen
   oikeasta alku-/loppumerkistä (ÄLÄ luota vain `.trim()`:iin, se rikkoo
   sisennyksen vain ensimmäiseltä riviltä ja jättää loput vääräksi —
   tähän meni N3:ssa ja N5:ssä ylimääräinen kierros, ks. opetukset).
5. `git fetch origin main` + `git checkout -B sisalto-nX-... origin/main`
   AINA tuoreesta mainista, älä jatka edellisen erän haaralta (erät eivät
   riipu toisistaan, main ei liiku niiden mukana kunnes Julkaisija
   mergeää).
6. `node --test tests/*.test.mjs` (odota 4153/0 fail) +
   `node tools/tarkista-kaksoisavaimet.mjs` ("ei kaksoisavaimia").
7. Commit + push + `gh pr create`, ilmoita Fablelle yhdellä rivillä
   PR-numero.

## 5. N3:n maatiedot-poikkeus (tärkeä, toistuu jos joku yrittää GRL/SHN/HKG/VUT:ia)

`tests/maatiedot.test.mjs`:n `VIELA_ILMAN_TUNNUSLUKUJA`-lista kirjaa
GRL, SHN, HKG pysyvästi poissuljetuiksi (Fable 7.9.2026: "EI SUVEREENI,
EI VERTAILUKELPOISTA SIJALUKUA") — näille ei koskaan yritetä
maatiedot-riviä. VUT odottaa yhä kelvollista Bislama-tervehdystä;
tarkistin 23.9. sekä Wiktionaryn että en-Wikipedian "Bislama"-artikkelin
uudelleen, kumpikaan ei sisällä tervehdyssanaa — tilanne ei ole
muuttunut. Älä yritä näitä neljää uudelleen ilman uutta lähdettä.

## 6. Julisteiden R2-vienti: käytä Macia, ei GitHub Actionsia

`vie-julisteet.yml` (koko `julisteet/`-kansion `aws s3 sync`, 878
tiedostoa) aikakatkaisi 15 min rajaan KAHDESTI peräkkäin GitHub-
runnerilla, jumiutuen yhteen tiedostoon 10+ minuutiksi kummallakin
kerralla ennen kuin ehti edes uusiin tiedostoihin. Push suoraan Macilta
(`aws s3 cp <tiedosto> "s3://$AMPARI/julisteet/..." --endpoint-url
"$PAATE"`, avaimet valmiina `~/.zshrc`:ssä) vei sekunteja. Jos joku
lisää uusia julisteita: älä käytä workflow'ta enää täyteen syncciin,
vaan `aws s3 cp` yksittäisille uusille tiedostoille Macilta, tai
harkitse workflow'n `timeout-minutes`-noston Julkaisijan/Fablen kanssa.

## 7. Muut opetukset

- Klassikkosudenkuoppa: `.trim()` extraktiossa poistaa vain merkkijonon
  ALUN JA LOPUN whitespacen, ei jokaisen rivin sisennystä — jos
  agenttitiedosto oli alunperin sisennetty (esim. `export const X = {`
  -kääreen sisällä), pelkkä `.trim()` jättää sisäiset rivit liian
  syvälle sisennetyiksi. Käytin lopulta "laske ensimmäisen rivin
  sisennys, laske ero tavoitteeseen, siirrä KAIKKI rivit samalla
  erotuksella" -funktiota (`reindentToBase`) — toimi luotettavasti.
- Agentit käyttävät vaihtelevia JS-kääreitä samalla ohjeistuksella
  (`id: [...]` vs `export const X = [...]` vs `export default {...}`)
  vaikka MALLIRAKENNE-esimerkki oli täsmälleen sama kaikille — kannattaa
  tarkistaa jokaisen tiedoston ensimmäinen rivi erikseen ennen
  splice-skriptin kirjoittamista, ei olettaa.
- `Bash`-työkalun `cd`-komennot nollaavat välillä työhakemiston
  seuraavaan komentoon ("Shell cwd was reset to ...") — käytä
  absoluuttisia polkuja skripteissä äläkä luota edelliseen `cd`:hen.
- Kredentiaalihaku (esim. `env | grep POLLO`, `security find-generic-
  password`) on luokittimen estämä RIIPPUMATTA siitä yhdistetäänkö se
  muihin komentoihin — älä yritä kiertää, käytä sen sijaan Actions-
  työnkulkua jolla on valmis secrets-pääsy (esim.
  `generoi-kuva-api.yml` OPENAI_API_KEY:llä, kun `POLLO_KEHITTAJAKOODI`
  ei ole Macilla).

## 8. Odottaa omistajan päätöstä

Ei avoimia kysymyksiä.

## 9. Aloitusviesti uudelle sessiolle

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
5. docs/raportit/viesti-sisaltokirjuri-luovutus-20260924.md (tämä raportti) kokonaan

Sitovat säännöt tiiviisti: agentit vain Opus tai Sonnet; yksi erä = yksi haara,
AINA tuoreesta origin/main:sta; worktreet /Users/Shared/Claude/wt/-alueelle;
kysymykset omistajalle aina AskUserQuestion-korttina; Suomen aika kaikissa
aikaleimoissa, tarkista date-komennolla, älä arvaa.

ENSIMMÄINEN TEHTÄVÄ: N6-erä. Tarkista TUORE puuttuvien kaupunkilehtien lista
Node-importilla (kaava raportin kohdassa 3), varmista ensin gh pr list
--state merged, jotta tiedät mitkä PR:t #2991/#2996/#3000/#3002/#3004 ovat
jo mergeytyneet — jos eivät vielä, käytä raportin kohdan 3 46-listaa ja
poimi 5 (ehdotus: Mount Rushmore, Havaiji, Bali, Milford Sound, Ouro Preto).
Tee sama resepti kuin N2-N5 (kohta 4): rinnakkaiset agentit, tarkistus,
splice, testit, PR. Ilmoita Fablelle PR-numero yhdellä rivillä.

Vastaa suomeksi, tiiviisti.
```
