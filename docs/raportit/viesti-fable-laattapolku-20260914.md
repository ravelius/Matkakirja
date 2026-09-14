# Tasoituslaatat maakohtaiseen polkuun, häive ulospäin (14.9.2026)

*(Opus-työsessio Fablelle. Haara `claude/julkaisu-laattapolku`, pohja
origin/main v1857, julkaisu **v1858**. Jokainen luku on MITATTU tässä
kontissa; arviot on merkitty sanalla "arvio".)*

## 0. Lyhyesti

Kaistat-raportin luvun 5 **avoin asia on korjattu**: maa on nyt laatan
osoitteessa, eivätkä 27 maan tasoitusajot voi enää kirjoittaa toistensa
päälle. Samalla tehtiin saman raportin suositus 1 kokonaan: **häive
piirretään laatikon reunasta ULOSPÄIN** ja **laatikko mitoitetaan
kuvasuhteelle 2,0**.

Erä löysi lisäksi kaksi asiaa, joita ei tilattu mutta jotka olivat
pakko korjata, koska ilman niitä kerros olisi ollut hiljaa rikki:

1. **`laatastoBase64` luki laatat vanhasta polusta.** Laatat menivät
   uuteen polkuun mutta bittikartta etsi niitä vanhasta, jolloin
   luettelo väitti ettei yhtään laattaa ole olemassa. Peli ei pyydä
   silloin MITÄÄN — ei 404:ää, ei virhettä, vain tyhjä kerros. Luku 4.
2. **Savuke-tasoitus-pallo oli jo valmiiksi punainen mainissa (8/11).**
   Sen vaihe A ("ilman tasoitusta") jätti tuotannon `varitasot`-taulun
   paikalleen, ja siellä on nyt 27 maan laatasto — A ja B olivat sama
   kuva. Korjattuna savuke on **11/11**. Luku 6.

Savukkeet: `savuke-kaistat-levea` **9/9**, `savuke-tasoitus-pallo`
**11/11** (mainissa 8/11), `savuke-varilaatat-pallo` ohittaa ilman
murrettua pilottilaatastoa kuten ennenkin. `npm test` **3320 pass /
0 fail**. Vastakoe luvussa 5.

**FRA-AJOA EI AJETTU ÄMPÄRIIN, JA SE ON TIETOINEN PÄÄTÖS** — se
rikkoisi julkaistun pelin merge-odotuksen ajaksi. Perustelu ja tarkka
ajolista luvussa 7.

---

## 1. Valittu polkumuoto ja miksi

**`julisteet/pyramidi/<variversio>/vari/<ISO>/z<z>/<x>/<y>.webp`.**

Tehtävänanto antoi valita tämän ja vaihtoehdon "variversio muotoon
`<pvm>-tasoitus-<ISO>`". Jälkimmäinen ei vaadi riviäkään koodia — ja
juuri siksi se hylättiin:

| | ISO polussa | ISO versiomerkkijonossa |
| --- | --- | --- |
| muutos versioporttiin | ei mitään (portti lukee polun samasta funktiosta) | ei mitään |
| muutos manifestiin | yksi kenttä (`maaPolussa`) | ei mitään |
| **kone valvoo** | **kyllä** — polku rakentuu ISO-koodista | ei: pelkkä nimeämistapa |
| törmäys mahdollinen | ei rakenteellisesti | kyllä, jos joku antaa saman version kahdelle maalle |

Toinen vaihtoehto olisi korjannut oireen ja jättänyt syyn: mikään ei
estäisi kirjoittamasta `--variversio 2026-09-14-tasoitus` kahdelle
maalle peräkkäin, ja lopputulos olisi TÄSMÄLLEEN sama vika kuin
13.9.2026 — sama hiljainen, 404:tön, oikean näköinen väärän maan
laatta. Kun ISO on polussa, ajon syöte ei voi tuottaa törmäystä.

**Kaava on YHDESSÄ PAIKASSA.** `js/laattapyramidi.js` vie kaksi uutta
funktiota:

```js
varitasonKansio(kirjaus, { versio })        // "2026-09-14-tasoitus/vari/FRA"
varitasonLaattapolku(kirjaus, z, x, y, muoto)
```

ja neljä lukijaa käyttää niitä: peli (`laattaUrl`), generaattori
(laattojen kansio, bittikartta ja lokitus), versioportti
(`tools/tarkista-varitason-portti.mjs`) ja työnkulun vientiaskel
(`node -e`, ei omaa kopiota YAML:issa). Savukkeiden pilottitarjoilu
lukee saman funktion. Testi luvussa 5 vartioi, ettei toista kopiota
synny.

## 2. Siirtymä: julkaistu peli ei mene rikki missään välivaiheessa

Kirjauksen uusi kenttä **`maaPolussa`** on siirtymän ainoa kytkin:

* **ämpärissä nyt olevissa 27 kirjauksessa sitä EI ole** → uusi peli
  rakentaa niille täsmälleen vanhan polun `<versio>/vari/z…`;
* kirjaus saa kentän vasta kun maa ajetaan uudestaan, ja työnkulku vie
  luettelon **vasta laattojen jälkeen** → uutta polkua ei luvata
  ennen kuin laatat ovat perillä;
* vanha peli (v1857 ja vanhemmat) ei tunne kenttää eikä sitä tarvitse
  ennen kuin jokin maa on ajettu uudestaan.

Tämä on testattu kahteen suuntaan (tests/varitasopolku.test.mjs):
vanhan muotoinen kirjaus tuottaa vanhan polun pikselilleen, ja
molemmat muodot voivat olla samassa luettelossa rinnakkain — portti
ajaa kummallakin ja tulostaa kumman polun se näkee.

**AINOA JÄRJESTYSEHTO ON, ETTÄ CLIENT ON MAINISSA ENNEN KUIN YKSIKÄÄN
MAA AJETAAN UUTEEN POLKUUN.** Siksi FRA-ajoa ei ajettu (luku 7).

Vastakoe on ajettavissa: `--vanha-varipolku` ajaa entiseen maattomaan
polkuun ja jättää `maaPolussa`-kentän pois.

## 3. Häive ulospäin ja laatikko kuvasuhteelle 2,0

**3.1 Häive.** `tools/fokuskartta/maailmapiirto.js polttaVariLeikkuri`
piirsi liu'un laatikon reunasta SISÄÄNPÄIN: `destination-out` pyyhki
kerman täyteen juuri laatikon reunalla ja nollaan `feidausReuna`
yksikköä sisempänä, kun taas laatikon ulkopuolella ei pyyhitty mitään.
Se teki reunan sen sijaan että olisi häivyttänyt sen (mitattu 37,3 ja
10,2 luminanssiyksikköä). Nyt vyöhykkeitä on kolme:

| vyöhyke | kerma |
| --- | --- |
| laatikon sisällä | täysi (mitään ei pyyhitä) |
| reunasta `feidausReuna` yksikköä ULOS | liuku täydestä nollaan |
| sen ulkopuolella | nolla (umpipyyhkäisy) |

Reunalla ei ole porrasta, koska liuku ALKAA nollasta juuri reunalla, ja
laataston uloin reuna rajautuu nollaan kermaan eikä täyteen — se oli
raportin toinen kaista (45,3 ja 41,6 yksikköä).

**MITATTU LAATASTA, ei pääteltty.** FRA z4, häive 125 yksikköä
(= 112 px z4:llä), alfa laatan vaakariviltä joka 16. pikselistä:

```
z4/9/4  (läntinen)  0 0 0 0 0 0 0 0 0 0 0 25 53 80 108 135 163 191 217 217 …
z4/11/4 (itäinen)   217 217 217 217 217 217 217 204 176 149 121 94 66 39 11 0 0 …
z4/10/4 (Ranska)    217 217 217 217 217 0 0 0 0 … 0 217 217 217 217 …
```

217 = 0,85 × 255 eli täysi peitto. Läntisessä laatassa kerma nousee
nollasta täyteen laatikon reunaan mennessä ja itäisessä laskee
takaisin; keskimmäisessä reikä on Ranska. Ennen korjausta sama profiili
oli päinvastainen (raportin luku 2.2: 217 → 20 → 217).

Kohdemaahan tämä ei voi koskea: häive on laatikon reunalla ja laatikko
on maan laatikko × vähintään 1,15, joten molemmat uudet vyöhykkeet ovat
aina maan ulkopuolella. Savukkeen V2 (Ranskan ala tavu tavulta) ja V5
(reliefikontrasti) ovat yhä vihreitä.

**Asiakaspuolen kermamaalaus (v1857) toimii näiden kanssa** eikä
kaksinkertaista peittoa synny: maalaus piirtää laatan kuvan VAIN
suojatun suorakaiteen sisään ja maalaa kerman vain sen ulkopuolelle.
Suojattu suorakaide on kohdemaan renkaiden laatikko eli laataston
laatikon SISÄLLÄ, joten uudet vyöhykkeet 2 ja 3 jäävät maalauksen alle.
`savuke-kaistat-levea` on 9/9 tämän erän koodilla (luku 6).

**3.2 Laatikko.** `NAKYMAN_KUVASUHTEET` päättyi kuvasuhteeseen 1,778
(1920 × 1080), mutta rootin ruutu on 2560 × 1352 = 1,893. Listaan
lisättiin `[2000, 1000]` eli 2,0. Unioni ottaa LEVEYDEN levimmältä ja
KORKEUDEN kapeimmalta kuvasuhteelta, joten **puhelimen pystyruutu
(390 × 844) pysyy osajoukkona** — lisäys kasvattaa vain leveyttä eikä
voi pienentää korkeutta.

Mitattu FRA:lla, `--laatikko-nakyma`:

| | ennen (1,778) | nyt (2,0) |
| --- | ---: | ---: |
| laatikon leveys | 830,66 yks | **934,49 yks** (+12,5 %) |
| laatikon korkeus | 1218,97 yks | 1218,97 yks (ennallaan) |
| z4-laattoja alueella | 9 | 9 |
| z4–z8 laattoja | 329 (arvio erästä 1c) | **1377** |

Laattamäärä kasvoi, mutta suurin osa kasvusta on laatikkounionista
(erä 1c, 329 laattaa, oli ennen `--laatikko-nakyma`-ajoa; tämän erän
1377 on unioni 2,0:lla). Tasoituslaatta on halpa: FRA z4–z8 poltettiin
tässä kontissa **37,6 sekunnissa**, koska korkeusaineistoa ei lueta.

Testi `--laatikko-nakyma kattaa kameran näkymän` laskee vaatimuksen
kameran omalla kaavalla (`ULOSZOOMAUKSEN_KERROIN`, `laatikonTarve`) ja
käy nyt läpi myös kuvasuhteen 2,0.

## 4. Löydös, jota ei tilattu: bittikartta luki väärää polkua

Kun laatat siirtyivät polkuun `vari/<ISO>/z…`, `laatastoBase64` luki
niitä yhä polusta `vari/z…`. Bittikartasta tuli **pelkkiä nollia**, ja
peli päätteli, ettei yhtään laattaa ole olemassa
(`js/laattapyramidi.js laattaOlemassa`). Seuraus on pahin mahdollinen
laatu:

* ei 404:ää — peli ei pyydä mitään;
* ei virhettä lokiin;
* luettelo näyttää täysin oikealta (`versio`, `tasot`, `laatastot`
  kaikki paikallaan);
* kerros on vain tyhjä.

Savuke näki sen (`tasoitettuja 0`, `varillisia 0`), ja korjauksen
jälkeen sama ajo antaa `tasoitettuja 24`. Vartio on nyt myös
yksikkötestinä (luku 5, väite 10), jottei sitä tarvitse nähdä selaimen
kautta uudestaan.

## 5. Testit ja vastakoe

**UUSI `tests/varitasopolku.test.mjs`, 11 väitettä:**

| # | väite |
| --- | --- |
| 1 | maa on polussa: `…/vari/FRA/z4/9/3.webp` |
| 2 | kaksi maata samalla versiolla eivät voi saada samaa avainta (kaikilla tasoilla) |
| 3 | kansio ilman versiota = ajokansion polku (`vari/FRA`) |
| 4 | pelin `laattaUrl` rakentaa polun samasta funktiosta (ei toista kopiota kaavasta) |
| 5 | **generaattorin ITSE ilmoittama polku === pelin luettelosta lukema polku** |
| 6 | toisen maan ajo kirjoittaa toiseen polkuun |
| 7 | ämpärissä jo oleva kirjaus (ei `maaPolussa`) lukee vanhan polun ennallaan |
| 8 | `--vanha-varipolku` palauttaa entisen kaavan |
| 9 | versioportti aukeaa maakohtaisella polulla, tulostaa polun ja osaa myös vanhan kirjauksen |
| 10 | laatat ja bittikartta kirjoitetaan/luetaan SAMASTA polusta (luku 4) |
| 11 | työnkulku lukee vientipolun pelin funktiosta eikä YAML:iin kirjoitetusta kopiosta |

Väite 5 on se, jota tehtävänanto pyysi: testi ajaa oikean
generaattorin (`--vain-luettelo`), lukee sen tulosteesta polun jonka
ajo ilmoittaa kirjoittavansa, rakentaa pelin polun SAMAN ajon
kirjoittamasta luettelosta ja vertaa merkkijonoja.

**UUSI väite `tests/tasoitustaso.test.mjs`:ssä:** häive piirretään
reunasta ulospäin. Kangasstubi kirjaa jokaisen `destination-out`-vedon,
ja väite tarkistaa kolme asiaa: yksikään pyyhkäisy ei ulotu laatikon
sisälle, jokainen liuku alkaa alfalla 0 laatikon reunalta ja päättyy
alfaan 1 `feidausReuna` yksikköä ULKONA, ja häiveen takainen ala saa
täyden pyyhkäisyn. Ei selainta, ei pikseleitä.

**VASTAKOE (ajettu):** `git stash` viidelle lähdetiedostolle, testit
uudelleen:

```
=== VASTAKOE: polku ===
not ok 1 - tests/varitasopolku.test.mjs     (# pass 0, # fail 1)
   — moduuli ei vie nimeä `varitasonKansio`, koko tiedosto punainen
=== VASTAKOE: häive ja kuvasuhde ===
not ok 7 - --laatikko-nakyma kattaa kameran näkymän puhelimella ja työpöydällä
not ok 8 - häive piirretään laatikon reunasta ULOSPÄIN eikä sisäänpäin
   (# pass 6, # fail 2)
```

Eli täsmälleen ne väitteet, jotka tämä erä lisäsi — ei enempää eikä
vähempää. Väite 7 kaatuu, koska kuvasuhde 2,0 ei mahdu vanhaan
laatikkoon; väite 8, koska liuku menee sisäänpäin.

**Julkaisukaava:** `npm test` **# pass 3320 · # fail 0** (# skipped 13),
`tarkista-kaksoisavaimet` ei kaksoisavaimia, `tarkista-niputus` kunnossa
(387 moduulia), `tarkista-savukkeet` kunnossa, `build-standalone`
31 971 kt (dist/ EI committiin), `grep '^<<<<<<<'` tyhjä.

## 6. Savukkeet

| savuke | tulos | huom |
| --- | --- | --- |
| `savuke-kaistat-levea` | **9/9** | tuotannon laatoilla; erän 1857 maalaus ehjä uusien kaavojen kanssa |
| `savuke-tasoitus-pallo` | **11/11** | mainissa 8/11 ENNEN tätä erää (ks. alla) |
| `savuke-varilaatat-pallo` | ohitus | vaatii murretun pilottilaataston (`--laatat`), kuten ennenkin |

**Savuke-tasoitus-pallo oli jo valmiiksi punainen mainissa.** Mitattu
puhtaalla `origin/main`-puulla: **8/11**, kaatuneina V3, V4 ja V5 —
kaikki kolme siksi, että A ja B olivat sama kuva (`ΔL 0,0`). Kaksi
syytä, molemmat korjattu tässä erässä:

1. **Vaihe A jätti TUOTANNON `varitasot`-taulun paikalleen.** Savuke
   kirjoitettiin, kun ämpärissä ei ollut yhtään väritasoa; nyt siellä
   on 27. "Ilman tasoituskerrosta" oli siis "tuotannon
   tasoituskerroksella". Nyt vaihe A poistaa taulun kokonaan.
2. **Paikallinen tarjoilu osui mihin tahansa `/vari/`-osoitteeseen**,
   myös tuotannon — pilottilaatat siis tarjoiltiin myös vaiheessa A.
   Nyt tarjoillaan vain pilotin oma polku (luettuna pilotin
   kirjauksesta pelin funktiolla), ja muu `/vari/` saa 404:n.

Sama korjaus tehtiin molempiin savukkeisiin (`savuke-tasoitus-pallo`,
`savuke-varilaatat-pallo`).

Ajokomento:

```
PW_CHROMIUM=/opt/pw-browsers/chromium node tools/generoi-laattapyramidi.mjs <kansio> \
  --tasot 4-8 --vari FRA --paletti tasoitus --peitto 0.85 \
  --variversio pilotti --laatikko-nakyma
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers NODE_USE_ENV_PROXY=1 \
  node tools/savukkeet/savuke-tasoitus-pallo.mjs --laatat <kansio>
```

## 7. FRA-ajo: EI AJETTU, ja miksi

Minulla on GitHub MCP:n `actions_run_trigger` ja se hyväksyy
`ref`-parametrin, joten ajo olisi ollut teknisesti mahdollinen tästä
haarasta. **Sitä ei silti ajettu ämpäriin, koska se rikkoisi julkaistun
pelin siksi ajaksi, kun PR odottaa mergeä.** Ketju on tämä:

1. ajo kirjoittaa `varitasot.FRA` = `{ versio: <uusi>, maaPolussa: true }`
   ja laatat polkuun `<uusi>/vari/FRA/z…`;
2. luettelo on ämpärissä heti — myös MAINISSA olevalle pelille;
3. mainin peli (v1857) ei tunne `maaPolussa`-kenttää ja pyytää
   `<uusi>/vari/z…` → 404 jokaiselle laatalle;
4. Ranskan tasoituskerros olisi poissa siihen asti, kunnes tämä PR on
   mainissa ja julkaistu.

Se on suoraan vastoin tehtävänannon omaa ehtoa *"tee siirtymä niin
ettei julkaistu peli mene rikki missään välivaiheessa"*. Ehdot ovat
ristiriidassa vain tässä järjestyksessä, ja oikea järjestys on:
**client ensin mainiin, sitten ajot.**

**Mitä sen sijaan tehtiin:** työnkulku ajettiin tästä haarasta
`vie: false` -tilassa (harjoitus: generointi ja versioportti ajetaan,
ämpäriin ei kirjoiteta mitään). Tulos luvun lopussa.

### 7.1 Tarkka ajolista mergen jälkeen

**27 maata, luettu manifestista 14.9.2026** (https://media.matkakirja.app/julisteet/pyramidi/pyramidi.json,
`Object.keys(varitasot)`) — **tehtävänannon lista oli väärä**: siinä oli
BEL, LUX, SRB, SVK ja SVN, joita manifestissa EI ole, ja siitä puuttui
BIH:

```
AUT BGR BIH CHE CZE DEU DNK ESP EST FIN FRA GBR GRC HRV HUN IRL ITA
LTU LVA NLD NOR POL PRT ROU SWE TUR UKR
```

Kaikilla on tällä hetkellä sama kirjaus: `versio 2026-09-13-tasoitus`,
`paletti tasoitus`, `peitto 0.85`, `tasot 4,5,6,7,8`,
`laatikkoNakyma true`, `kerma #faf4d6`.

**Inputit (samat jokaiselle maalle, vain `maa` vaihtuu):**

| input | arvo |
| --- | --- |
| `maa` | ISO A3 listalta |
| `paletti` | `tasoitus` |
| `peitto` | `0.85` |
| `kerma` | (tyhjä) |
| `variversio` | `2026-09-14-tasoitus` |
| `tasot` | `4-8` |
| `vesi`, `feidaus`, `feidausreuna`, `laatikkokerroin` | (tyhjä) |
| `laatikko_nakyma` | `true` |
| `korkeus` | `1` (ei luettava tasoituksessa) |
| `kuiva` | `false` |
| `vie` | `true` |

Versiomerkkijono saa nyt olla kaikille sama — ISO on polussa. FRA
ensin, sen jälkeen 26 muuta; ajot voivat mennä rinnakkain, koska ne
eivät enää jaa yhtään avainta (luettelo kirjoitetaan viimeisenä ja
`yhdistaLuettelo` yhdistää `varitasot`-taulun maittain).

Komentokelpoisena (gh CLI, ajo main-haarasta mergen jälkeen):

```
for M in FRA AUT BGR BIH CHE CZE DEU DNK ESP EST FIN GBR GRC HRV HUN \
         IRL ITA LTU LVA NLD NOR POL PRT ROU SWE TUR UKR; do
  gh workflow run generoi-varitaso.yml -r main \
    -f maa=$M -f paletti=tasoitus -f peitto=0.85 \
    -f variversio=2026-09-14-tasoitus -f tasot=4-8 \
    -f laatikko_nakyma=true -f korkeus=1 -f kuiva=false -f vie=true
done
```

**Tarkistus ajon jälkeen** (yhdelle maalle riittää):

```
curl -sI https://media.matkakirja.app/julisteet/pyramidi/2026-09-14-tasoitus/vari/FRA/z4/10/4.webp
curl -s  https://media.matkakirja.app/julisteet/pyramidi/pyramidi.json \
  | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{
      const v=JSON.parse(s).varitasot;for(const k of Object.keys(v).sort())
      console.log(k,v[k].versio,v[k].maaPolussa?'maa polussa':'VANHA');})"
```

### 7.2 Harjoitusajo AJETTIIN JA SE ON VIHREÄ

**Actions-ajo 34799737676**, haara `claude/julkaisu-laattapolku-siirtyma`,
inputit `maa=FRA · paletti=tasoitus · peitto=0.85 ·
variversio=2026-09-14-tasoitus · tasot=4-8 · laatikko_nakyma=true ·
korkeus=1 · kuiva=false · **vie=false**`. Tulos **success**; askeleet
"Vie laatat ämpäriin" ja "Vie luettelo ämpäriin" ohitettiin, eli
ämpäriin ei kirjoitettu yhtään tavua.

Ajon loki todistaa koko ketjun:

```
VARIKANSIO: vari/FRA
VARIPOLKU:  2026-09-14-tasoitus/vari/FRA
  pallon sarja    versio 2026-09-07a · viivat 2026-09-08a-viivat · nostot 2026-09-08a-nostot
  pyramidi        versio 2026-09-07a · viivataso 2026-09-08a-viivat · nostotaso 2026-09-08a-nostot
  varitasot[FRA]  versio 2026-09-14-tasoitus · paletti tasoitus · tasot 4,5,6,7,8
  laattapolku     julisteet/pyramidi/2026-09-14-tasoitus/vari/FRA/z<taso>/<sarake>/<rivi>.webp
  kerrokset       {"pohja":true,"ranta":false,"viiva":true,"nosto":true,"vari":true}
  TULOS           laattakerros on päällä ja FRA:n väritaso näkyy.
```

Eli versioportti aukeaa maakohtaisella polulla, pohjan/nosto-/viivatason
versiot säilyvät ja työnkulun johtamat polut tulevat pelin omasta
funktiosta. Ainoa jäljelle jäävä askel oikeassa ajossa on `vie: true`.

(Ajon lokissa `ranta: false` — pallon sarjassa ei ole rantakenttää.
Se on ennallaan mainista eikä liity tähän erään.)

## 8. Mitä EI koskettu

Tekstit, äänet, kuvat, Pulun ohjain, lehdet, tarinasisältö, kameran
rajat, `js/pallolaatat.js` (v1857:n maalaus on ennallaan),
`js/pallolauta/*` ja pallon sarjan luettelo (`laatat.json`) ovat
ennallaan. Muiden maiden kirjauksia ei muutettu — ne lukevat vanhaa
polkua kunnes ne ajetaan uudestaan.

## 9. Avoimet asiat

1. **27 maan ajot ovat ajamatta** (luku 7.1). Ennen niitä ämpärissä on
   yhä 13.9. laatasto, jossa maat ovat toistensa päällä — eli
   Pohjois-Espanjan laikku Ranskan kartalla on siihen asti tallella.
2. **Kaistat-raportin vaihtoehto 2 (tasoitus ilman laatastoa)** on yhä
   auki. Tämä erä teki vaihtoehdon 1, ja se riittää; vaihtoehto 2
   poistaisi laataston, laatikon ja häiveen kokonaan ja toimisi joka
   zoomilla ja joka kuvasuhteella. Fablen päätettäväksi, ei tässä.
3. **`savuke-varilaatat-pallo` on yhä ajamatta tässä erässä**: se vaatii
   murretun pilottilaataston (Natural Earth + 1′-korkeuspalat), mitä ei
   tässä kontissa ollut. Sen reititys- ja vaihe-A-korjaus on sama kuin
   tasoitussavukkeessa, mutta sitä ei ole todennettu ajamalla.
4. **Häive laataston reunalla syvillä tasoilla.** Häive on 125
   lautayksikköä, ja z8:lla laataston marginaali laatikon ympärillä on
   pienempi kuin se, joten liuku katkeaa ruudukon reunaan. Kartalla
   sitä ei näe, koska asiakaspuolen maalaus (v1857) peittää alan ja
   z8:lla kamera on syvällä maan sisällä — mutta jos maalaus joskus
   poistetaan, tämä on katsottava uudestaan.


## 10. TÖRMÄYS: rinnakkainen PR #2398 tekee saman työn

**Tämä on tärkein yksittäinen asia Fablelle tässä raportissa.**

Haaraa pushatessa selvisi, että toinen sessio oli avannut 20 minuuttia
aiemmin **PR #2398 (`claude/julkaisu-laattapolku`, v1858,
"tasoituslaatat maakohtaiseen polkuun")**, joka tekee saman tehtävän.
Sen työtä EI ylikirjoitettu: tämä erä pushattiin omaan haaraansa
`claude/julkaisu-laattapolku-siirtyma`. **Vain toinen näistä saa
mergetä** — ne koskevat samoja tiedostoja ja nostavat saman
versionumeron.

Ne eivät ole sama ratkaisu, ja ero on yksi kenttä:

| | PR #2398 | tämä PR |
| --- | --- | --- |
| polkumuoto | `<versio>/vari/<ISO>/z…` | sama |
| polku yhdessä funktiossa | kyllä (`js/media.js varitasonPolku`) | kyllä (`js/laattapyramidi.js varitasonKansio`) |
| bittikartan polkukorjaus | kyllä | kyllä |
| **siirtymäkenttä `maaPolussa`** | **ei** | **kyllä** |
| **vanha kirjaus luettavissa** | **ei** | **kyllä** |

PR #2398:n asiakas rakentaa maakohtaisen polun AINA. Sillä hetkellä kun
se on mainissa ja julkaistu, peli pyytää kaikille 27 maalle polkua
`<versio>/vari/<ISO>/z…`, jota ämpärissä EI OLE — siellä on yhä
13.9. maaton laatasto. **Jokainen tasoituslaatta on 404 siihen asti,
kunnes kaikki 27 maata on ajettu uudestaan.** Se on juuri se, minkä
tehtävänannon ehto *"pidä vanha muoto luettavana kunnes uudet laatat
ovat ämpärissä"* kieltää.

Tämän PR:n `maaPolussa`-kenttä poistaa sen ikkunan kokonaan: vanha
kirjaus lukee vanhan polun, uusi uuden, ja maat siirtyvät yksi
kerrallaan ajojen tahdissa. Hinta on yksi boolean luettelossa.

**Suositus:** merge tämä ja sulje #2398 — tai, jos #2398 on jo mergetty,
poimi siitä puuttuva siirtymä (kenttä `maaPolussa`, sen luku
`varitasonKansio`issa ja testit 7–8) ennen kuin yhtään maata ajetaan.
