# Nostotaso maittain — muiden maiden nostot piiloon (18.9.2026)

Haara `claude/bold-ride-vow4ki-nostotaso-maittain` (pohjana
`claude/bold-ride-vow4ki-kerma-reuna`, commit 799a1dda).
Päätös: Raamattu KARTTAUUDISTUKSEN PAATOKSET 34 kohta 17 d,
omistaja 18.9.2026 klo 15.20 — *"muiden maiden nostot piiloon"*.

## Ratkaisu yhdellä virkkeellä

Nostotaso poltetaan väritason mallin mukaan MAAKOHTAISINA LAATASTOINA
polkuun `<nostoversio>/nostot/<ISO>/z<taso>/<sarake>/<rivi>.webp`
(luettelossa taulu `nostotasot[ISO]`), ja peli hakee vain kohdemaan
laataston — sen saman yhden luvun varassa kuin väritaso.

## Miksi maittainen laatasto eikä maski

Vaihtoehto oli yksi maailmanlaajuinen laatasto + maakohtainen maski.
Laatasto valittiin, koska se on kevyempi molemmissa päissä:

| | maittainen laatasto | maailmanlaajuinen + maski |
|---|---|---|
| laattoja ämpärissä | musteelliset laatat kerran per maa; vain rajalle osuva laatta syntyy kahdesti | musteelliset laatat kerran + **toinen alfalaatasto joka maalle** (≈ yhtä monta laattaa kuin muste) |
| pelin lataus | vain kohdemaan laatat | koko maailman nostolaatat **ja** maan maski |
| selaimen työ | sama kuin nyt (yksi kuva kerrokseen) | kaksi kuvaa + kompositointi joka laatalle |
| koodi | sama kaava kuin väritasolla, jo todistettu | uusi kerroslaji |

Mitattu koepoltossa (z5–z6, kuusi maata): päällekkäisyys on pieni.
Esimerkiksi ruutu `z6/42/18` syntyy kolmelle maalle (FRA, CHE, ITA),
mutta niiden yhteinen koko on 24 kt — kun taas globaalissa mallissa
sama ruutu oli yksi 17 kt:n laatta, jossa oli kaikkien kolmen muste.
Pelille ero on ratkaiseva: Ranskassa ladataan **963** musteellista
pikseliä tästä ruudusta aiemman **5 956**:n sijaan.

## Muutokset

**Polttoketju**

- `tools/generoi-laattapyramidi.mjs`
  - uusi valitsin `--nostomaa <ISO>` (`--nostotaso`-ajon rinnalle).
  - `poltettavatMerkit` — yksi suodatin, kolme käyttäjää
    (mustelaatikot → peite → työlista ja bittikartta, piirtosivun
    `nostot.json`, luettelon tunnus→tiiviste). **Ladonta lasketaan yhä
    koko maailmasta** (`keraaNostot`), koska naapurimaan ladonta on osa
    tämän maan väistöä; suodatus tapahtuu vasta ladonnan jälkeen, joten
    merkit asettuvat täsmälleen samaan paikkaan kuin globaalissa ajossa.
  - laattojen kansio `nostot/<ISO>/z…` (`NOSTO_KANSIO`, kaava tulee
    `js/laattapyramidi.js nostotasonKansio`-funktiosta — yksi kaava,
    kaksi lukijaa).
  - luetteloon `nostotasot[ISO] = { versio, maa, saanto, tasot, nostot,
    laatastot }`. Maakohtaisessa ajossa vanhaa `nostotaso`-kenttää **ei
    kirjoiteta** (se lupaisi maailmanlaajuisia laattoja, joita ei ole).
  - maa, jolla ei ole yhtään poltettavaa nostoa, keskeyttää ajon
    selvällä virheellä (esim. BEL: 0 merkkiä).
  - `PLAYWRIGHT_JS`-ympäristömuuttuja varapolkuna (worktreessä ei ole
    node_modulesia, eikä kontin `/opt/node22/...` ole Macilla).
- `tools/nostomaat.mjs` (uusi) — ajettavien maiden lista **samasta
  funktiosta kuin merkit** (`keraaNostot`). Käsin kirjoitettu lista
  ehtisi eriytyä. Nyt: **112 maata, 1 605 poltettavaa merkkiä**.
- `tools/pyramidiluettelo.mjs` — `nostotasot` yhdistetään maittain
  kuten `varitasot`; väriajo kantaa taulun eteenpäin koskematta siihen.
- `tools/polta-paikallisesti.sh` — nostoshardit maittain
  (`nostoshardit`-apufunktio + `nostomaat`-välimuisti), ja laattojen
  laskuri tuntee polun `nostot/<ISO>/z*`.

**Peli**

- `js/laattapyramidi.js`
  - `nostotasonKansio` / `nostotasonLaattapolku` (viety ulos) — polun
    ainoa kaava, jonka myös generaattori lukee.
  - `nostotasonKirjaus()` lukee `nostotasot[kohdemaa]`. **Kohdemaa on
    sama yksi moduulitason luku kuin väritasolla** (`variMaaNyt`,
    `asetaVaritasonMaa`); kaksi päättelyä ehtisi olla eri mieltä.
    Matkalla ja maailmanäkymässä maata ei ole → kerrosta ei ole,
    täsmälleen kuten väritasolla.
  - `nostotasonTasot()`, `laattaUrl()`, `tasonVersio()` (avain on koko
    polku, koska kahdella maalla voi olla sama versio),
    `nostoOnPoltettu()` ja `laatoissaOnNostoja()` lukevat taulun kautta.
    Tiivisteluettelo seuraa laatastoa: vain kohdemaan merkeistä saa
    vaieta.
  - johdettu `__nostoTasot` mitätöidään maan vaihtuessa.
- `js/pallolaatat.js` — `lepokerroksenKerrokset` sai väritason
  kaltaisen maakohtaisen portin (ks. "Pallon tie" alla).
- `js/pallolauta/nostot.js` — **ei muutoksia**. Elävien naapurinostojen
  suodatus oli jo olemassa (`NAYTA_VAIN_KOHDEMAAN_NOSTOT = true`,
  rivi 696), joten rinnakkaisen ankkuriagentin työhön ei koskettu.

Vanha luettelo toimii ennallaan (taulua ei ole → vanha haara), ja vanha
peli uuden luettelon kanssa piirtää jokaisen noston elävänä — mikä on
oikein, koska pohjalaatoissa ei ole nostoja. Ikkunaa, jossa nosto
näkyisi kahdesti tai ei kertaakaan, ei ole kumpaankaan suuntaan.

## Koepoltto (ei ämpäriin)

```
node tools/generoi-laattapyramidi.mjs <ulos> --tasot 5-6 \
  --nostotaso --nostoversio 2026-09-18-koe --nostomaa <ISO>
```
ajettuna maille FRA, CHE, BEL, DEU, ITA, ESP, GBR.

- FRA 10 merkkiä → 9 laattaa, CHE 19 → 6, DEU 18 → 10, ITA 20 → 12,
  ESP 1 → 4, GBR 1 → 2. BEL 0 → ajo keskeytyi kuten pitääkin.
- **Yksi maa on 1,2 s.** 112 maata ≈ 2–3 min per tasoväli, ja shardit
  menevät rinnakkain ytimille — maittaisuus ei tee poltosta raskasta.
- Laatastot ovat erilliset ja **päällekkäiset ruudut ovat eri
  tiedostoja**: `z6/42/18` löytyy kansioista FRA, CHE ja ITA.
- Musteen mittaus samasta ruudusta (alfa > 16):
  **FRA 963 px, CHE 4 723 px, ITA 270 px** (512×512 = 262 144 px).
  Globaalissa laatastossa kaikki 5 956 px olivat samassa kuvassa — ja
  juuri se kuulsi 0,85-kerman läpi (Gotthard 14,8 / 13,9).
  Ranskan laatastossa on nyt vain Ranskan nostot, naapurin
  laatastossa vain naapurin.

## Mittaus — MITÄ EI EHDITTY

Kohdemittausta (Ranskan saapumisnäkymä 1400 px ja 390 px, naapurin
nimiön kontrasti < 5, muiden maiden nostomerkkejä DOMissa 0) **ei
ajettu**: aikakatto tuli vastaan, ja mittaus vaatii koepoltettujen
laattojen tarjoilun route-välityksellä sekä koeluettelon
(`nostotasot`-taulu) pujottamisen savukkeeseen. Todisteena on
yllä oleva laatastomittaus, joka osoittaa saman asian lähteestä:
naapurin mustetta ei ole Ranskan laatoissa lainkaan, joten
kontrastia ei voi syntyä. DOM-puoli on jo voimassa ennen tätä erää
(`NAYTA_VAIN_KOHDEMAAN_NOSTOT`, mitattu savukkeessa
`tools/savukkeet/savuke-nostoklikkaus.mjs`).

Seuraava askel mittariin: `savuke-kerma-reuna.mjs`-pohjainen savuke,
joka reitittää `**/nostot/**` koepolttokansioon ja korvaa
`pyramidi.json`:in `nostotasot`-taululla. Kahden ruudun kontrasti
Gotthard-nimiön kohdalta on sen jälkeen suora luku.

## Fablen polttokomento

```
tools/polta-paikallisesti.sh --nostot-ja-pallo \
  --nostoversio 2026-09-19-maittain --pallotunniste i
```

Shardit tulevat nyt muodossa `nosto-z5-z7-<ISO>` ja `nosto-z8-<ISO>`
kaikille 112 maalle (`node tools/nostomaat.mjs --rivi`). Vienti
ämpäriin on ennallaan: `aws s3 sync <kansio>/nostot →
julisteet/pyramidi/<nostoversio>/nostot`, ja ISO-koodi on vain
alikansio sen alla.

**Julkaisujärjestys on sama kuin väritasolla: laatat ensin, luettelo
vasta niiden jälkeen.** Luettelon `nostotasot`-taulu on lupaus
ämpärissä olevista laatoista.

## Pallon tie — TÄMÄ ERÄ EI RATKAISE SITÄ LOPPUUN

Pallolla nostot tulevat kahdesta paikasta:

1. **Liikkuva pallo** — nostot on POLTETTU pallon omaan
   Mercator-sarjaan (`tools/tee-pallolaatat.mjs --nostot`, joka lukee
   `pyramidi.json`:in `nostotaso.versio`-polusta). Sarja on yksi
   maailmanlaajuinen kuva, eikä maittaisuus ole siinä mahdollinen.
2. **Lepokerros** — pallo latoo pyramidin laatat samalla koodilla kuin
   tasokartta (`pyramidinKerrostasot`, `pyramidinLaattaUrl`), joten
   tämän erän maakohtaisuus pätee siellä sellaisenaan.

Tie on siis: **pallon sarja ajetaan ILMAN `--nostot`-lippua**, jolloin
liikkuvassa pallossa ei ole nostoja lainkaan ja lepokerros latoo vain
kohdemaan nostolaatat. `js/pallolaatat.js lepokerroksenKerrokset` sai
tätä varten väritason kaltaisen portin:

```js
const nostoKirjaus = variMaa ? (pyramidi.nostotasot?.[variMaa] ?? null) : null;
const nostotMaittain = !nostot && Boolean(nostoKirjaus?.versio && nostoKirjaus.tasot?.length);
...
nosto: Boolean(nostot) || nostotMaittain,
```

Ehto on `!nostot`: jos sarjaan ON poltettu nostot, ne ovat jo kankaassa
koko maailmasta eikä kerros voi ottaa niitä pois — silloin käytös on
täsmälleen entinen. Portti herää vasta, kun Fable ajaa sarjan ilman
`--nostot`-lippua.

**Omistajan päätettäväksi jää yksi asia:** nostot katoavat liikkuvasta
pallosta (pyörityksen ajaksi) ja palaavat, kun pallo asettuu lepoon.
Jos se ei kelpaa, vaihtoehto on jättää pallon sarjaan poltetuksi vain
kohdemaan nostot — mutta silloin sarja olisi maakohtainen, eli 112
Mercator-sarjaa. Se on eri erä ja iso.

`tools/polta-paikallisesti.sh`:n pallon lähdekansion keruu
(`for d in "$ULOS"/nosto-*/nostot/z*`) jätettiin ennalleen: se on
juuri se `--nostot`-polku, jota ei enää käytetä, kun sarja ajetaan
ilman lippua.

## Todennus

- `node --test tests/*.test.mjs` — 3 623 ok, 0 fail, 13 skip.
- `node tools/tarkista-savukkeet.mjs` — kunnossa.
- `node tools/tarkista-niputus.mjs` — 398 moduulia, ei törmäyksiä.
- `node tools/build-standalone.mjs` — dist/matkakirja.html 32 632 kt.

Versiota ei nostettu, PR:ää ei avattu, Raamattuun ja sarjat.jsoniin ei
koskettu (ohjeen mukaisesti).
