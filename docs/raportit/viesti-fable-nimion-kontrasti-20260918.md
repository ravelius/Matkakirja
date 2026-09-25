# Viesti Fablelle: nimiön kontrasti 4,5:1 (18.9.2026, Opus-agentti)

Erä: Raamattu ASTRONAUTIN KAMERA LISAYS 16, TILA 3 "AVOINNA" — nimiön
kontrastimitta. Edellinen erä: `docs/raportit/viesti-fable-reliefi-velat-20260918.md`
(kohta 2 ja "MITÄ JÄI"). Haara `claude/bold-ride-vow4ki-nimion-kontrasti`
(pohja `claude/bold-ride-vow4ki-v1945`). Versiota EI nostettu, PR:ää ei avattu.

Ympäristö: Mac Studio, node 22, Playwright `node_modules/playwright/index.js`,
Chromium `ms-playwright/chromium-1234`, WebKit Playwrightin oma, portti 8819,
390 × 844 dpr 2, reliefilaatat ämpäristä. Mittari
`tools/savukkeet/savuke-topografialinssi.mjs`, rajaus `VAIHE=avaus`.

---

## LYHYESTI

**Molemmat rajat ylittyvät, ja ratkaisu on kaksipuolinen.** Reunus yksin
ei riittänyt, koska suhteen toinen puoli on teksti: nostotason muste on
poltettu seepiaa varten haaleana (82, 71, 54). Nyt linssi — ja VAIN
linssi — värittää nimiön oman musteen tummaksi (43, 29, 16) samalla
`source-in`-vedolla, joka säilyttää jokaisen pikselin alfan. Ladonta ei
siis muutu pikselilläkään, ja se on mitattu eikä päätelty.

| | tummin kolmannes | vaalein kolmannes |
| --- | --- | --- |
| v1945 (vertailu, samasta ajosta) | 4,23 | 4,73 |
| **a) vaaleampi reunus + tumma muste, 4 vetoa** | **10,30** | **11,58** |
| b) v1945:n sävyt, 5 vetoa | 4,61 | 4,93 |
| c) a + 5 vetoa | 11,32 | 12,17 |

Valinta: **a**. Savuke on Chromiumilla **13/13** (oli 11/13) ja
WebKitillä **11/13** (oli 10/13). Tunnettu punainen on poistettu
`tools/savukkeet/sarjat.json`:sta.

## 1. MITÄ MUUTETTIIN

`js/pallolaatat.js`:

* `NIMION_HALO` `rgb(247, 241, 224)` → `rgb(252, 249, 242)`. Viisi
  luminanssiprosenttia vaaleampi, yhä lämmin eikä valkoinen — lumirajan
  päällä reunuksella on siis yhä oma sävynsä (se oli alkuperäisen
  kommentin syy olla käyttämättä valkoista, eikä sitä kumota).
* Uusi `NIMION_MUSTE = 'rgb(43, 29, 16)'` ja `nimioLinssinMusteella()`.
  Nimiölaatta piirretään kerran kierrätettävälle kankaalle, maalataan
  `source-in`-vedolla yhdellä sävyllä ja käytetään sekä halovedoissa
  että päällimmäisessä vedossa. `null` = muste sellaisena kuin se on
  poltettu.
* `NIMION_HALO_VETOJA` pysyy **neljänä** (ks. kohta 2 b).

**Rajaus on linssin haarassa eikä muualla.** Kutsu on samassa
`if (kerrokset.reliefi && kerrostasot[i]?.nosto)` -lohkossa, jossa
reunuskin on; seepiakartan haarassa `nimio` on sama olio kuin ennen
(`let nimio = kuva;`), eli pääkartan nimiöiden piirtopolku on
merkitsemättä sama. `nimioLinssinMusteella` palauttaa alkuperäisen kuvan,
jos kangasta tai 2d-pintaa ei saa — silloin reunus kantaa yksin.

## 2. KOLME KOKEILUA, JOKAINEN MITATTU KERRAN

Jokainen ajo on oma `VAIHE=avaus`-ajonsa Chromiumilla (avaus +
vastakoe), ja vertailuluku tulee SAMASTA ajosta samasta
laattajoukosta (z7, 8 laattaa, 3 7xx mustepikseliä).

**a) Värit (valittu).** Reunus (252, 249, 242), muste (43, 29, 16),
4 vetoa → **10,30 / 11,58**. Ladonta 0 px / 0 px, reliefin peitto
10,11 × mustepikseli (vertailu 10,11 ×).

**b) Viides veto yksin.** v1945:n sävyt, poltettu muste, 5 vetoa →
**4,61 / 4,93**. Läpi, mutta tummimman kolmanneksen vara rajaan on
0,11 — ja luku on MEDIAANI, eli otoksesta iso osa jää alle 4,5:n.
Hinta on yksi koko laatan `drawImage` jokaista nimiölaattaa kohti.

**c) Yhdistelmä.** a + 5 vetoa → **11,32 / 12,17**. Lisä pelkkään
a:han verrattuna on 1,0 yksikköä eli sen verran, ettei ylimääräinen
veto maksa itseään takaisin.

**Perustelu valinnalle.** a antaa suurimman hyödyn pienimmällä työllä:
vetoja on yhä neljä, reunuksen ulottuma on sama (sama `shadowBlur`),
eikä reliefiä peitetä yhtään leveämmin (10,11 × molemmilla). b jää
rajan tuntumaan ja maksaa vedon; c maksaa vedon eikä tuo sen
vertaista. Valinta on myös se, joka koskee suhteen OIKEAA puolta:
reunus oli jo lähes pergamentin vaaleus, eikä siitä ollut enää paljon
otettavaa.

## 3. LADONTA EI MUUTU — MITATTU, EI PÄÄTELTY

Savukkeeseen lisättiin ladontamitta. Sama laatta kootaan ajossa
KAHDESTI: kerran pelin nykyisillä vakioilla ja kerran
vertailuasetuksella (`VERTAILU` = v1945: poltettu muste, pergamentti,
4 vetoa), ja verrataan sitä laatikkoa, jonka silmä näkee kirjaimena.

Maski on nostotason oma alfa > 0 ja sen sisältä ne pikselit, jotka
kompositiossa lukevat tummana (luminanssi < 0,25). Laatikko voi siis
kasvaa vain, jos kirjaimen PEHMENNETTY reuna muuttuu umpinaiseksi —
juuri se olisi lihomista.

| | leveys | korkeus | reliefin peitto |
| --- | --- | --- | --- |
| a (Chromium) | 0 px | 0 px | 10,11 × (ennen 10,11 ×) |
| b (Chromium) | 0 px | 0 px | 10,11 × (ennen 10,11 ×) |
| c (Chromium) | 0 px | 0 px | 10,11 × (ennen 10,11 ×) |
| a (WebKit) | 0 px | 0 px | 9,91 × (ennen 9,86 ×) |

Ehto "enintään +1 px" täyttyy kaikilla, ja syy on rakenteinen:
`source-in` ei koske alfaan, ja vetojen lisäys ei muuta `shadowBlur`ia
eli reunuksen ulottumaa. Reunus ei myöskään loista merkin sisään:
päällimmäinen veto on nimiö itse, eikä `kaikkiPienin` (1,0) tule
nimiöstä vaan viivamerkkien umpinaisista sisuksista — sama havainto
kuin edellisessä erässä.

**Yksi mitta jouduttiin korjaamaan kesken erän, ja se kirjataan.**
Ensimmäinen versio ladontamitasta etsi tumman laatikon koko laatasta
ilman mustemaskia, ja se poimi reliefin omat varjorotkot: laatikko
"kasvoi" 484 × 500 px eli koko laatan mitoihin. Ajo hylättiin, mitta
korjattiin (mustemaski + vertailukompositio) ja a mitattiin uudelleen.
Kontrastiluvut olivat molemmissa ajoissa samat (10,30 / 11,58).

## 4. WEBKIT

Ajettu `--webkit`-lipulla valitulla asetuksella. Kontrastiväitteet ovat
molemmat vihreitä, ja WebKitin omat luvut ovat käytännössä Chromiumin
luvut — sama kangas kokoaa samat pikselit, kuten edellisessäkin erässä:

| mitta | Chromium | WebKit |
| --- | --- | --- |
| tummin kolmannes (a) | 10,30 | 10,29 |
| vaalein kolmannes (a) | 11,58 | 11,63 |
| vertailu v1945, tummin | 4,23 | 4,26 |
| vertailu v1945, vaalein | 4,73 | 4,75 |
| otos | 3 742 px | 3 736 px |
| ladonta | 0 / 0 px | 0 / 0 px |
| savuke (VAIHE=avaus) | 13/13 | 11/13 |

WebKitin kaksi punaista, kumpikaan ei kontrastista:

1. **Välähdysvartio** — tunnettu ja perusteltu edellisessä erässä
   (paluu alas 165,1 vs. raja 15, kolmen näytteen mediaani). Kyse on
   mittarista: WebKitiltä kaapataan `page.screenshot`illa, joka jonottaa
   sivun oman työn taakse. Chromiumilla sama väite on vihreä (9,6).
   Ehdotus on yhä edellisen raportin kohta 1.
2. **UUSI: "ImageBitmapin vienti näytönohjaimelle on alle puolet
   `<img>`:n hinnasta"** — WebKitillä `img` 53 ms, `bitmap` 78 ms
   (Chromiumilla 49 vs. 4 ms). Tämä väite oli edellisessä erässä
   WebKitillä vihreä. **Se ei ole tämän diffin polulla**: mitta on oma
   4096 × 2048 -mikromittauksensa eikä koske nimiölaattoja, eikä
   `nimioLinssinMusteella` ole sen ketjussa. Pidän tätä WebKitin
   ajoituskohinana (kaksi peräkkäistä ajoa antoivat saman punaisen,
   mutta molemmat samassa kuormassa), mutta en voi sanoa sitä
   mitatusti — ks. "viereiset havainnot".

## 5. SAVUKKEEN TILA JA PORTTI

`VAIHE=avaus`, valittu asetus:

* Chromium **13/13** (oli 11/13).
* WebKit **11/13** (oli 10/13); jäljellä välähdysvartio + kohta 4.2.

`tools/savukkeet/sarjat.json`: tunnettu punainen
`"nimiön kontrasti reunusta vasten >= 4.5:1 tummimmalla reliefillä"`
POISTETTU, ja huomautus kertoo nyt, mikä velka oli ja millä se
maksettiin (sekä Chromiumin että WebKitin luvut). Jos vartio nousee
uudelleen punaiseksi, kyse on oikeasta muutoksesta nimiössä tai
reliefissä eikä vanhasta velasta.

Koko savuketta (kuusi istuntoa) EI ajettu: ne väitteet koskevat
tarkkuutta, tyhjää lautaa ja koko maapalloa, joihin tämä diffi ei
koske.

`node --test tests/*.test.mjs`: **# pass 3628 / # fail 0** (13 skipped,
# tests 3641).
`node tools/build-standalone.mjs`: ok (32 701 kt).

## MUUTETUT TIEDOSTOT

* `js/pallolaatat.js` — `NIMION_HALO` vaaleampi, uusi `NIMION_MUSTE`,
  `nimioLinssinMusteella()`, linssin haaran piirto käyttää väritettyä
  nimiötä. Ei muutoksia seepiakartan haaraan.
* `tools/savukkeet/savuke-topografialinssi.mjs` — kompositio omaksi
  `kokoa()`-funktiokseen (muste, reunus, vetoja), v1945:n
  vertailukompositio samaan ajoon, kontrasti mitataan molemmista,
  ladontamitta (laatikko + reliefin peitto) ja niiden tulosterivit.
  Väitteitä ei lisätty eikä rajoja siirretty.
* `tools/savukkeet/sarjat.json` — tunnettu punainen pois, huomautus
  päivitetty.
* `docs/raportit/viesti-fable-nimion-kontrasti-20260918.md` — tämä.

## VIEREISET HAVAINNOT (EI KORJATTU)

1. **WebKitin bitmap-vientimitta (kohta 4.2).** Oma erä: joko mitta
   ottaa mediaanin kolmesta näytteestä (kuten välähdysvartio jo tekee)
   tai raja kalibroidaan WebKitille. Nyt se on yksi kellolukema yhdestä
   näytteestä, ja WebKitillä `initTexture`-polku on eri.
2. **Kontrastin otoskoko kasvoi erästä 4 (2 620 px) tähän erään
   (3 7xx px)** samalla vertailuasetuksella. Mediaani on sama
   (4,19/4,74 vs. 4,23/4,73), joten mitta ei liikkunut, mutta otoksen
   ero on selittämättä — todennäköisin syy on, montako laattaa
   ämpäristä saatiin sillä ajolla (`laattoja` on nyt 8; edellisen erän
   lukua ei kirjattu). Jos tämä halutaan pois, savuke voi vaatia
   `laattoja === 8` ja kaatua muuten.
3. **Edellisen erän kaksi viereistä havaintoa ovat yhä auki**:
   `tools/savukkeet/mittaa-reliefipyramidi.mjs` ei osaa ajaa laattoja
   ämpäristä, ja `LAATTAKERROS_TEKSTUUREJA_PER_KEHYS = 1` maksaa
   avauksessa 7–15 ms ensimmäiselle laatalle.
4. **Nostotason uusintapoltto** (edellisen raportin suositus) on tämän
   jälkeen tarpeeton LINSSIN kannalta: linssi värittää musteen itse.
   Se olisi yhä oikea korjaus, jos sama nimiö halutaan tummemmaksi
   myös muualla kuin linssin alla — mutta se on kartografinen valinta
   eikä saavutettavuusvelka, ja se kuuluu Fablelle.
