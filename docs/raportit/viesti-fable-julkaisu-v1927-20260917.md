# Julkaisu v1927 — Opus-agentin raportti 17.9.2026

Haara `claude/bold-ride-vow4ki-julkaisu-v1927`, pohja `origin/main`
= v1926 (`86b28da6`). **Main liikkui kesken työn**: kesken savukeajoja
mainiin tuli `b840555c` *"Arabia-äänileikkaus: Codexin työkalu ja
staging-workflow (#2549)"*. Se yhdistettiin mukaan (ks. luku 2), ja
versiotyökalu ajettiin sen jälkeen uudelleen — numero pysyi **v1927**,
koska #2549 oli työkalu-/docs-muutos eikä nostanut versiota.
Muutoslokirivi: *"Pariisin nostot aiheittain nimiöllä, turisti-kyltti
kuriin"* (60 merkkiä). PR **#2550**.

## 1. Mitä haarassa on

| haara | commit | sisältö |
|---|---|---|
| claude/bold-ride-vow4ki-aihenostot | b23bc391 | kaupungin sisällä saman aiheen nostot AINA yhdeksi aihenostoksi, nimiönä tärkeimmän noston nimi + `…`, viuhka; `kaupunkiAvain`, sovittelun `este`-lippu, vastakoe `?aihekaupunki=0` |
| claude/bold-ride-vow4ki-turisti-kyltti | 2fba27a3 | turisti-info-kyltille sama 16 px:n ruutupikselikatto kuin nimiöillä (`nostosymKatettuMitta`), vastakoe `?nimiokatto=0` |
| claude/bold-ride-vow4ki (Fable) | d12e6e53 | Raamattu: kyltin katto toteutettu + kolme avointa jatkokohtaa |
| origin/main | b840555c | #2549, tuli kesken työn |

## 2. Konfliktit ja niiden ratkaisut

### 2.1 `savuke-pariisi-lahizoom.mjs` — add/add, viisi hunkia

Tiedosto on lisätty sekä mainiin (v1925:n squash) että
aihenostot-haaraan (commit `27b97172`), joten kolmisuuntaisella
mergellä ei ollut yhteistä pohjaa ja git latoi viisi
konfliktihunkia.

**Mitattu, ei arvattu.** `27b97172:tools/savukkeet/savuke-pariisi-
lahizoom.mjs` ja `origin/main:...` ovat tavulleen identtiset
(`git diff` palautti tyhjän). Haaran versio on siis mainin version
aito laajennus. **Vastakoe:** koko diffissä mainin ja haaran välillä
on vain kolme miinusriviä, ja jokainen niistä on korvaus, ei poisto —
kaksi kenttälistan laajennusta (`aihemerkit`- ja `osumat`-mittaukset)
ja `limittyy`-apufunktion nosto moduulitasolle. Ratkaisu: haaran
versio kokonaisuudessaan. `node --check` puhdas heti perään, ja
`tests/aihemerkit`, `pallosovittelu`, `nimiolimitys`, `karttamerkit`,
`nostot-kartalla` **52/52 läpi**.

### 2.2 Auto-mergen semanttinen tarkistus (turisti-kyltti)

Toinen erä muokkasi samoja tiedostoja (`js/pallolauta/nostot.js`,
`js/fokusnosto-symbolit.js`, `savuke-pariisi-lahizoom.mjs`), ja git
selvisi ilman konfliktimerkkejä. **Auto-merge ei ole todiste**, joten
tulos mitattiin. Yhdistetystä puusta löytyvät molempien erien
toiminnot:

- **aihenostot:** `ladontaNro` (rivi 984), `?aihekaupunki=0`
  (rivit 111 ja 1377), `este: r.perhe === 'aihemerkki'` (rivi 1715),
  ryhmän järjestys `ladontaNro`:n mukaan (rivi 1415);
- **turisti-kyltti:** `NOSTOSYM_NIMIO_KATTO_PX`, `NOSTOSYM_MITAN_KATTO`
  ja `nostosymKatettuMitta` tuotuna `js/fokusnosto-symbolit.js`:stä,
  `NOSTON_NIMIO_KATTO_PX`/`NOSTON_MITAN_KATTO` saman luvun niminä
  (rivit 445–447), `js/kaupunkinosto.js`
  `KAUPUNKIMERKIN_MITTA_MAX = NOSTOSYM_MITAN_KATTO` ja
  `kaupunkimerkinMitta` yhteisen katkofunktion läpi.

Savukkeessa ovat tallella **molempien haarojen kaikki vartiot**:
aihenostojen 3d, 3e, 3e2, 3e3, 3e4, 3f, 3h ja vastakoe 3g sekä kyltin
7, 7b, 7d ja INFO 7c. Molemmat vastakokeet palauttavat lippunsa ajon
jälkeen (rivit 813–814 ja 1117–1118), joten ne eivät kasaudu — ja se
tarkistettiin, koska kolme lippua ajetaan nyt samassa prosessissa.

### 2.3 Main liikkui kesken työn — ja se oli kiinni jäänyt regressio

`git diff --name-only origin/main..HEAD` paljasti työn loppupuolella
kuusi POISTETTUA tiedostoa: `.github/workflows/stage-arabia.yml` ja
`tools/arabia/*`. Ne eivät olleet minkään haaran poistoja vaan mainin
uutta sisältöä (`b840555c`, #2549), joka ilmestyi origin/mainiin
versionoston jälkeen — sessiot jakavat saman `.git`-hakemiston, joten
toisen session fetch siirsi refin kesken ajon. Ilman yhdistämistä PR
olisi **poistanut Codexin Arabia-työkalun mainista**.

Korjaus: versionoston kolme tiedostoa peruttiin
(`git checkout -- js/main.js js/muutokset.js sw.js`), `origin/main`
yhdistettiin (puhdas merge, 6 tiedostoa lisää) ja versiotyökalu
ajettiin uudelleen. **Vastakoe:** `git diff --name-only
origin/main..HEAD` sisältää nyt täsmälleen ne 18 tiedostoa, jotka
tähän erään kuuluvat — ei yhtään poistoa. Koko `npm test` ja build
ajettiin vasta tämän jälkeen uudelleen.

### 2.4 Raamattu ja js/main.js

Raamattuun ei koskettu (Fablen haaran versio meni sellaisenaan,
ei konfliktia). `js/main.js`:ään tuli vain `APP_VERSION`-rivi
versiotyökalulta.

## 3. Testit: 3556 pass / 0 fail / 13 skip

`NODE_USE_ENV_PROXY=1 npm test` → `# tests 3569`, `# pass 3556`,
`# fail 0`, `# skipped 13`. Ohitukset ovat ympäristön omia ja
ennallaan (geo-kirjastot 7, manifesti 1, rantaviiva-aineisto 5).
Yhtään testiä ei ohitettu, poistettu eikä karanteenattu.

| työkalu | tulos |
|---|---|
| `tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `tools/tarkista-niputus.mjs` | 394 moduulia, 4388 julistusta, ei törmäyksiä |
| `tools/tarkista-savukkeet.mjs` | 1898 ui-viittausta, 409 metodia, 539 kenttää, 31 lehtitilan kenttää |
| `tools/build-standalone.mjs` | läpi, `dist/matkakirja.html` 32 490 kt |

**Niputus tarkistettiin erikseen** (v1926:n aukko): tämän erän ainoat
uudet tiedostot ovat kaksi raporttia ja kaksi kuvaa
(`git diff --name-status origin/main..HEAD | grep '^A'`), eli uusia
js-moduuleja ei tullut eikä MODULES-listaan tarvinnut koskea. Build
ajettiin silti ENNEN PR:ää.

## 4. Savukkeet

| savuke | näkymä | tulos |
|---|---|---|
| savuke-pariisi-lahizoom | 390 + 1400 | **56/56** |
| savuke-pallo-nostolaput | Bukarest, Ateena, Helsinki, Istanbul | **8/8** |
| savuke-topografialinssi | — | **38/38** |
| savuke-astro-pallo | puhelin 390 × 844 | **37/37** |
| savuke-kaupunkipopup | 390 + 1400 | 40/57 (sama kuin pohjalla) |
| savuke-nimikyltti | 390 + 1400 | 60/68 |
| savuke-ihmisen-kappaleet | 390 | 20/21 (kahdesti) |

Mitattuja lukuja Pariisin lähizoomista (molemmat ruudut):

- aihenostoja **5** — `kauppa:"Kyyhkyposti…"(3)`,
  `kulttuuri:"Impressionistit…"(3)`, `historia:"Tuileriain rauniot…"(4)`,
  `skandaalit:"Mona Lisan varkaus…"(5)`, `ihmeet:"Tuileries…"(2)`;
- skandaalirykelmän nimiö on sanatarkasti omistajan oma esimerkki;
- yhdenkään aihenoston nimiö ei ole piilossa; pallossa ei ole lukuja;
- aihenostojen limittyviä pareja **1** (kuudesta) — sama kuin haaran
  raportissa, ei kasvua;
- vastakoe `?aihekaupunki=0`: aihenostoja **0**, kun säännön kanssa 5;
- kyltin nimiö **16,00 px** molemmilla ruuduilla ja kyltti mahtuu
  koteloon; vastakoe `?nimiokatto=0` antaa 22,97 px työpöydällä.

## 5. Tunnetut punaiset — mitattu, ei korjattu

### 5.1 `savuke-nimikyltti` 9b kasvoi: 5 → 8 (puhelin) ja 9 (työpöytä)

Savuke putosi 61/68:sta 60/68:aan: vartio 9b *"limittyviä
nimiöpareja enintään 4"* on nyt punainen **molemmilla** ruuduilla, kun
pohjalla se oli punainen yhdellä (5 paria).

**Juurisyy mitattu vastakokeella.** Vartio mittaa
SAAPUMISNÄKYMÄN (koko Ranska) nimiölimitystä. Tässä erässä aihemerkit
saivat nimiön (PAATOKSET 27 TARKENNUS 2 kohta 8), eli ruudulle tuli
noin kahdeksan pitkää nimiötä lisää. Kaupungin aina-yhdistys EI ole
syy — päinvastoin:

| ajo | aihemerkkejä | nimiöitä | limityspareja (puhelin / työpöytä) |
|---|---|---|---|
| sääntö päällä | 8 | 28 | **8 / 9** |
| vastakoe `?aihekaupunki=0` | 9 | 31 | **9 / 11** |

Ilman kaupungin aina-yhdistystä limityksiä on siis ENEMMÄN. Kasvu
tulee nimiöstä itsestään, ei ryhmityssäännöstä. **Kattoa ei löysätty
eikä väitettä poistettu.** Jos saapumisnäkymän 4 parin katto halutaan
pitää, se on oma päätöksensä: joko aihenostojen nimiö pois
saapumisnäkymästä (esim. vain lähizoomissa) tai katon uudelleenarvio
sen jälkeen, kun nimiöt ovat päätetty pysyviksi. Aihenostot-haaran oma
raportti varoitti tästä: se rajasi vartion 3e4 tietoisesti
lähizoomiin, koska *"saapumisnäkymässä koko Ranska on 390 px:n
levyisenä niin täynnä"*.

### 5.2 Ennallaan mainista

- `savuke-nimikyltti` **4** (kyltti / maapaneelin teksti, hajonta
  50,30 %) ja **7a/7b** (Venetsia, Firenze) — täsmälleen sama nelikko
  kuin v1925:ssä ja v1926:ssa.
- `savuke-kaupunkipopup` **17 punaista**, 40/57 — sama luku ja sama
  lista kuin turisti-kyltti-haaran raportissa mitattu pohja. Yksi
  niistä (*"turisti-info aukesi napautuksesta"*) on saman raportin
  luvun 4 osumajärjestysasia, joka jätettiin tietoisesti korjaamatta
  (kaksi kokeiltua korjausta kaatoi omistajan omia vartioita muualla).

### 5.3 `savuke-ihmisen-kappaleet` 390 px — punainen kahdesti

Väite *"saapuminen siirtyy tasan ZOOMIN_JATKO_MS (5000 ms) jakson alun
yli"*: mitattu kesto 17 076 ms (1. ajo) ja 16 144 ms (uusinta), mallin
odotus 19 624 / 19 681 ms, toleranssi 2 000 ms. **Ei tämän erän
aiheuttama**: yksikään Ihmisen matka -linssin tiedosto ei ole tämän
PR:n diffissä (`git diff --name-only origin/main..HEAD` — ei yhtään
`linss`- tai `ihmis`-tiedostoa). v1926:n raportissa sama vartio oli
häilyvä käytännössä samoilla luvuilla (16 723 vs. 19 736) ja meni läpi
uusinnassa; nyt se on punainen kahdesti peräkkäin. Kyse on mainin
omasta, kuormitukselle herkästä mittauksesta, ja se odottaa yhä omaa
korjaustaan (näytteenoton tihentäminen, ei kynnyksen löysääminen).

## 6. Avoimeksi jäi

1. **`savuke-nimikyltti` 9b:n katto** saapumisnäkymässä (luku 5.1) —
   omistajan päätös siitä, näkyykö aihenoston nimiö koko maan
   näkymässä vai vasta lähizoomissa.
2. **Kyltin klikattavuus rykelmässä** (turisti-kyltti-raportin luku 4)
   — mitattu, kaksi korjausta kokeiltu ja peruttu. Odottaa päätöstä
   siitä, kumpi osumasääntö väistää.
3. **Kyltin vertailukerroin** (saman raportin luku 5) — puhelimen ja
   työpöydän 3,3-kertainen ero saapumisnäkymässä.
4. **Kyltin varaus ladonnassa on piste eikä kyltti** (saman raportin
   luku 4, sivulöydös) — nimet ja nostojen laput latovat yhä kyltin
   päälle.
5. **Aihenostojen keskinäinen limitys 1 pari** lähizoomissa —
   hyväksytty Raamatussa (PAATOKSET 27 tarkennus 3).
6. Edellisistä julkaisuista yhä auki: `savuke-ihmisen-kehys` 1400 px
   kahden ruudun ajossa, kaksi pyörimisestä johtuvaa häilyvää vartiota
   (satelliittilinssi, astro-pallon varjo) ja Codexin
   WebApp-uusintatesti.
