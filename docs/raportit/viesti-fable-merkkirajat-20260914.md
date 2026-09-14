# Pääkartan merkkiraja lähizoomiportilla, kohdekartan katto

*(Opus-työsessio → Fable, 14.9.2026. Haara
`claude/bold-ride-vow4ki-merkkirajat`, pohja `claude/bold-ride-vow4ki`.
Ei versionostoa, ei muutoslokiriviä, ei dist/:iä, ei sisältömuutoksia.
Lähteet: tehtävänanto; docs/raportit/viesti-fable-karttauudistus-era10-
20260913.md luvut 7 ja 11.5–11.7.5; docs/raportit/viesti-fable-
karttauudistus-era5-20260913.md luku 7.3; docs/raportit/karttauudistus-
suunnitelma-20260913.md luku 4.5.)*

## 0. Lyhyesti

Erän 10 kolme avointa kohtaa on ratkaistu yhdellä portilla.

- **11.5 Pääkartan 21 merkin raja.** Raja ei tehnyt tähän asti
  **mitään** — lukua 21 ei ollut koodissa missään, vain savukkeen
  vakiona. Nyt se on sääntö: uloimmalla zoomilla piirtyy enintään 21
  tärkeintä merkkiä, loput tulevat näkyviin zoomatessa. **Mitään ei
  poistettu** — jokainen merkki on yhä datassa ja pelissä.
- **11.7.5 Lähizoomiportti `nosto.lahi`.** Kenttä on olemassa:
  `lahi: true` -kohde ei piirry uloimmalla zoomilla lainkaan.
- **11.6 Italian kohdekartan katto 17.** Katto oli savukkeen oma vakio
  ilman asettelusyytä, eikä se edes koskenut yhtä karttaa. Nostettu
  24:ään; asettelun oikea mitta on kartan pistemäärä, ja Pariisin 31
  pistettä on siitä mitattu, puhelimella todennettu yläraja.

`npm test` 3354 / fail 0, uusi savuke `savuke-merkkirajat` **27/27**
vihreänä, vastakokeet kirjattu (luku 6).

## 1. Mitä raja teki, kun se ylittyi: ei mitään

Ensimmäinen kysymys tehtävänannossa oli, pudotetaanko merkkejä hiljaa.
**Ei pudoteta.** Luku 21 ei ollut pelin koodissa missään — se oli
vakio `PAAKARTAN_KATTO` savukkeessa
`tools/savukkeet/savuke-kaupunkien-nostot.mjs` ja ennen sitä erän 5
suunnitelman valmiusehto. Peli piirsi kaikki merkit: ei hiljaista
pudotusta, ei virhettä pelaajalle, ei mitään näkyvää.

Koodissa olevat katot ovat muualla ja eri asiaa varten, ja ne on
tarkistettu erikseen:

| katto | missä | mitä tekee |
| --- | --- | --- |
| 3 merkkiä / 8 yksikön säde | js/fokuskohteet.js `karsiKaupunkiruuhka` | pudottaa hiljaa kaupungin ympäriltä; kaupunkikohde ja `kattoVapaa` ovat suojassa |
| 40 elävää CSS2D-merkkiä | js/pallolauta/nostot.js `NOSTOJEN_KATTO` | pudottaa kauimmaiset ruudun keskipisteestä |
| 21 merkkiä / maa | **ei ollut missään** | — |

## 2. Lähtötila mitattuna, samalla työkalulla kuin erä 10

```
git fetch origin main && node tools/laske-karttanostot.mjs
```

origin/main (`ff6dd12`, 14.9.2026), maat joilla yli 21 merkkiä
pääkartalla — **täsmälleen sama lista ja samat luvut kuin erän 10
luvussa 11.5**:

| maa | pääkartalla |
| --- | ---: |
| GRC Kreikka | 33 |
| TUR Turkki | 29 |
| DEU Saksa | 28 |
| ESP Espanja | 25 |
| HRV Kroatia | 23 |
| ITA Italia | 22 |
| RUS Venäjä | 22 |

Laudan 112 maasta muut 105 ovat rajan sisällä.

## 3. Ratkaisu: merkkiportti

`js/pallolauta/nostot.js`: `merkkiPortti`, `lahizoomiAuki`,
`merkinTarkeys`, vakiot `PAAKARTAN_MERKKIKATTO = 21` ja
`LAHIZOOMIN_OSUUS_ULOIMMASTA = 0,7`.

**Tärkeysjärjestys.** Datassa ei ole yleistä tärkeyskenttää. Ainoa
olemassa oleva järjestys (`js/fokuskohteet.js nostonPrioriteetti`) on
kaupunkiruuhkan oma eikä kelpaa tähän: se pudottaisi kaupungit ja
maastokohteet ENNEN nostokortteja. Portti käyttää siksi sinun antamaasi
järjestystä — **kaupunkimerkit ensin, sitten aarteet (Matkakirjan
ihmeet), sitten kaikki muu datan omassa järjestyksessä**. Tasapelin
ratkaisee alkuperäinen rivinumero, joten sama data antaa saman kartan
joka ajolla.

**Per-nosto-portti.** Kohde, jonka datassa on `lahi: true`, ei piirry
uloimmalla zoomilla lainkaan — ei silloinkaan, kun maassa olisi tilaa
katon alla. Sama mekanismi kantaa molemmat kohdat, kuten pyysit.

## 4. Kynnys: kaksi mittausta, ensimmäinen kaatui

**Ensimmäinen yritys oli suunnitelman luvun 4.5 mukainen** — mitta
osuutena maan lehden ikkunasta (`lehdenOsuus`, sama luku kuin koko
kerroksen portilla). **Mittaus kaatoi sen.** Saapumisnäkymä ei ole sama
osuus joka maassa, koska saapumislaatikko on maan ÄÄRIVIIVOJEN laatikko
(+ maapaneeli) ja lehden bbox on fokuspohjan ikkuna. Chromium 390 × 844,
`saavu()` ajettuna:

| maa | osuus saapumisnäkymässä | yksi porras sisään |
| --- | ---: | ---: |
| TUR | 1,31 | 2,62 |
| ESP | 1,91 | 3,83 |
| DEU | 1,94 | 3,89 |
| GRC | 1,93 | 3,85 |
| FRA | 2,14 | 4,27 |
| ITA | 3,00 | 5,99 |
| RUS | 31,27 | 62,53 |

Turkin **porras sisäänpäin** (2,62) on pienempi kuin Italian
**saapumisnäkymä** (3,00). Yksikään kiinteä osuusluku ei siis voi olla
yhtä aikaa kiinni saavuttaessa ja auki portaan päässä.

**Toinen mitta on se, mitä portti oikeasti tarkoittaa:** paljonko näkymä
on uloimmasta sallitusta. Uloszoomaus on lukittu maan laatikkoon
(`ULOSZOOMAUKSEN_KERROIN` 1,15, `js/pallolauta/lauta.js maanZoomiraja`),
joten lauta antaa kerrokselle valmiin luvun `uloinOsuus` = kameran
korkeus / uloin sallittu korkeus. Yksi zoomiporras puolittaa näkymän
(`PALLOLAUDAN_SIIRTOLEVEYS`: *"puolet saapumisleveydestä eli yksi
lähennys saapumisnäkymästä"*), joten kynnys 0,7 on saapumisnäkymän
(1,0) ja yhden portaan (0,5) geometrisessa keskivälissä.

**Ranskan mitoitusluvut (Chromium 390 × 844):**

| | näkyvä leveys (lautayksikköä) | osuus uloimmasta | portti |
| --- | ---: | ---: | --- |
| saapumisnäkymä | 538,8 | 0,957 | kiinni |
| yksi porras sisään | 269,4 | 0,478 | auki |

Välissä tehtiin **kolmaskin virhe ja se mitattiin kiinni**: kerros
yritti ensin oppia uloimman leveyden itse ("levein tällä maalla nähty
näkymä"). Sivun latauksessa kamera ehtii olla laatikkoa leveämmällä
ennen kuin raja on asetettu, joten muisti venyi (Espanja: 746,2 kun
saapumisnäkymä on 499,7) ja portti oli auki jo saavuttaessa — savuke
antoi kolme FAIL-riviä. Raja tulee nyt laudalta, joka sen omistaa.

## 5. Mittaustaulukko: ennen ja jälkeen

**Pääkartta, portin päätös maittain** (`savuke-merkkirajat` vartio 0,
pelin oma passi `tools/tarkista-nostopaikat.mjs` ja pelin oma portti):

| maa | uloimmalla zoomilla ennen | uloimmalla zoomilla jälkeen | lähizoomilla |
| --- | ---: | ---: | ---: |
| GRC Kreikka | 33 | **21** | 33 |
| TUR Turkki | 29 | **21** | 29 |
| DEU Saksa | 28 | **21** | 28 |
| ESP Espanja | 25 | **21** | 25 |
| HRV Kroatia | 23 | **21** | 23 |
| ITA Italia | 22 | **21** | 22 |
| RUS Venäjä | 22 | **21** | 22 |
| muut 105 maata | ≤ 21 | ennallaan | ennallaan |

**Ruudulla, Espanja** (savuke vartiot 1–2, Chromium 390 × 844):

| näkymä | leveys | osuus uloimmasta | portti päästää | lähizoomiin |
| --- | ---: | ---: | ---: | ---: |
| saapuminen | 499,7 | 0,957 | **21** | 4 |
| yksi porras sisään | 249,9 | 0,478 | **25** | 0 |

## 6. Vastakokeet

| vastakoe | tulos |
| --- | --- |
| **0b.** sama mittaus portti auki | kaikki seitsemän ylitystä yhä siellä (33/29/28/25/23/22/22) — vartio 0 mittaa siis porttia eikä dataa |
| **0b-\*.** lähtötasot datassa | GRC 33, TUR 29, DEU 28, ESP 25, HRV 23, ITA 22, RUS 22 — **mitään ei poistettu** |
| **3b.** `lahi`-lippu pois | sama kohde (`mulhacen`) palaa saapumisnäkymään — vartio 3 mittaa juuri lippua |
| **1b.** piilotetut | portin `piiloon`-lista ja ruudun osumat verrattu: yksikään piilotettu ei ole osumissa |
| **kaatunut mitta 1** | osuus lehden ikkunasta: Turkin porras 2,62 < Italian saapuminen 3,00 → mahdoton, hylätty |
| **kaatunut mitta 2** | "levein nähty näkymä": Espanjassa 746,2 vs. 499,7 → 3 FAIL-riviä, hylätty |

## 7. POLTTOVELKA — tämä on se, mikä vielä puuttuu

**Poltettua mustetta ei voi piilottaa.** Pallon merkeistä valtaosa on
poltettu laattoihin, ja laatta piirtyy riippumatta tästä kerroksesta.
Mitattu 14.9.2026 pallon omasta nostotasosta
(`2026-09-07a-nostot-f/laatat.json`, 1 609 nostoa):

| maa | pääkartalla | poltettuja | eläviä |
| --- | ---: | ---: | ---: |
| GRC | 33 | 32 | 1 |
| TUR | 29 | 27 | 2 |
| DEU | 28 | 24 | 4 |
| HRV | 23 | 21 | 2 |
| ITA | 22 | 21 | 1 |
| RUS | 22 | 21 | 1 |
| **ESP** | **25** | **0** | **25** |

Portti piilottaa elävän merkin; poltetun se jättää **napautettavaksi**
(muuten kartalla olisi mustetta ilman korttia) ja kirjaa
**polttovelaksi** (`portti().polttovelka`) — sama tapa kuin tingityllä
nimiöllä (js/fokuskohteet.js "TINKIMINEN MUKAAN").

**Käytännössä tämä tarkoittaa:** raja on nyt sääntö ja se pitää
datassa ja ladonnassa jokaisessa maassa, mutta **ruudulla se näkyy
tänään vain Espanjassa** — se on ainoa ylittävä maa, jonka merkeistä
yhtäkään ei ole poltettu. Kuudessa muussa maassa laatta näyttää vielä
vanhan musteen.

**Velan purku on kahden askeleen työ, ja se on tarkistettu eikä
oletettu.** Poltto lukee nostot omasta passistaan
(`tools/fokuskartta/nostot.mjs` → `js/fokuskohteet.js kohdeKarttarivit`),
joka EI tunne tätä porttia — pelkkä uudelleenpoltto ei siis riittäisi.
Tarvitaan:

1. **yksi kutsu polttoketjuun**: `keraaNostot` ajaa merkit `merkkiPortti`n
   läpi uloimman zoomin asetuksella ennen kuin merkitsee ne
   poltettaviksi (`m.poltettava`);
2. **nostotason uudelleenpoltto** `tools/tee-pallolaatat.mjs --nostot` +
   uusi nostoversio ja versionosto.

Kumpikaan ei kuulunut tähän erään (R2-ajo, versionosto), joten ne ovat
tässä työlistana eivätkä tehtynä. Sen jälkeen polttovelka on nolla ja
raja näkyy ruudulla kaikissa seitsemässä maassa.

## 8. Kohdekartan katto 17: mistä se tuli ja miksi se nousi

**Katto oli savukkeen oma vakio.** `KOHDEKARTAN_KATTO = 17`
tiedostossa `tools/savukkeet/savuke-kaupunkien-nostot.mjs`, ja se tuli
erän 5 suunnitelman valmiusehdosta (*"pääkartan merkkimäärä Ranskassa
≤ 21, kohdekartalla ≤ 17"*) eli siitä, mihin Pariisin jako sillä
kerralla päätyi. **Koodissa lukua ei ole missään:** kohdekartan piirto
(`js/nahtavyydet.js`) ei rajaa pisteiden määrää mitenkään — ei
numerokylttejä, ei asettelua, ei mitään.

**Eikä luku edes koske yhtä karttaa.** Se on MAAN nostojen summa
kaikilta sen kohdekaupungeilta:

| maa | yhteensä | jakautuminen |
| --- | ---: | --- |
| ITA | 17 | Rooma 11, Firenze 3, Venetsia 3 |
| FRA | 17 | Pariisi 16, Marseille 1 |

"Italian kohdekartta on täynnä" ei siis kuvannut mitään asettelun
rajaa: Rooman omalla kartalla on 16 pistettä, joista 11 on nostoja.

**Asettelun mitta on kartan pistemäärä**, ja siitä on olemassa
mitattu, pelissä erästä 5 asti ollut yläraja:

```
pariisi 31, lontoo 24, wien 16, berliini 16, madrid 16, rooma 16
```

**Todiste puhelimella (390 × 844, savuke vartio 5):**

- `docs/raportit/kuvat/merkkirajat-kohdekartta-rooma.png` — Rooma, 16
  pistettä
- `docs/raportit/kuvat/merkkirajat-kohdekartta-pariisi.png` — **Pariisi,
  31 pistettä**: merkit erillään, kyltit luettavia, mittakaavajana ja
  selite paikoillaan

Pariisin kuva on se todiste, jota tehtävänanto pyysi: kartta kantaa
kaksinkertaisen määrän siihen nähden, mitä katto 17 salli.

**Uusi katto on kaksiosainen** (savuke-merkkirajat vartiot 0c ja 0c2):
maakohtainen **24** ja yhden kohdekartan pisteet **≤ 31**. Sama luku
nostettiin myös erän 10 savukkeeseen, jotta kaksi savuketta ei väitä
samasta asiasta eri lukua.

## 9. Mitä muutettiin

| tiedosto | muutos |
| --- | --- |
| js/pallolauta/nostot.js | merkkiportti: `PAAKARTAN_MERKKIKATTO`, `LAHIZOOMIN_OSUUS_ULOIMMASTA`, `merkinTarkeys`, `lahizoomiAuki`, `merkkiPortti`; `paivita({ uloinOsuus })`; mittari `nostot.portti()` |
| js/pallolauta/lauta.js | `uloimmanOsuus()` (kameran korkeus / uloin sallittu) ja sen anto nostokerrokselle — 19 riviä, `ladoLevossa`; kaupungin klikkaukseen ei kosketa |
| tools/tarkista-nostopaikat.mjs | rivi kantaa `ihme`- ja `lahi`-kentät, jotta portti mitataan Nodessa samalla funktiolla kuin peli sen ajaa |
| tools/savukkeet/savuke-merkkirajat.mjs | **uusi** savuke, vartiot 0–5 + vastakokeet |
| tools/savukkeet/savuke-kaupunkien-nostot.mjs | kohdekartan katto 17 → 24 perusteluineen |
| tools/savukkeet/README.md | uusi rivi + erän 10 rivin kattoluku |

Ei sisällön poistoa eikä siirtoa, ei tekstimuutoksia, ei Raamattua, ei
versionostoa, ei muutoslokiriviä, ei dist/:iä.

## 10. Sivuhavainnot

1. **Pääkartalla näkyy paljon enemmän merkkejä kuin maan oma luku.**
   Saapumisnäkymässä ruudulla on naapurimaiden poltettuja merkkejä ja
   koko maanosan eläintäyt: mitattuna Turkki 161, Italia 160, Saksa
   117, Ranska 110 merkkiä — maan omia näistä 29, 22, 28 ja 20. 21 on
   siis MAAN luku, ei ruudun luku. Jos ruudun kokonaismäärä on se, mikä
   omistajaa häiritsee, se on oma kysymyksensä ja vaatii
   naapurisäännön (2.9.2026, Bosnia) uudelleenharkintaa.
2. **Venäjän saapumisnäkymä ei kehystä maata** vaan sen renkaan, jossa
   pelaaja on: `saavu()` jätti kameran Moskovan mittaan (osuus lehden
   ikkunasta 31,3). Se on `maanLautalaatikko`-ankkurin seuraus
   (pelaajan rengas voittaa), ei tämän erän asia — mutta Venäjällä
   "uloin zoomi" tarkoittaa siksi eri asiaa kuin muualla.
3. **Tasokartta ei saanut porttia.** `js/fokuskohteet.js`
   `paivitaNakyvyys` on yhä koko kerroksen portti
   (`LEHDEN_VAHIN_OSUUS`), eikä siinä ole per-merkkiä-rajaa. Portti
   rakennettiin pallolaudalle, joka on pelin lauta; tasokartan
   yhtenäistäminen on oma pieni eränsä, jos sitä halutaan.
4. **`lahi`-kenttä on nyt olemassa mutta yhdelläkään kohteella ei ole
   sitä.** Kentän täyttäminen on sisältöpäätös (mikä kuuluu lähikuvaan,
   mikä maan yleiskuvaan) ja odottaa sinua. Mekanismi on koeteltu
   savukkeessa ajonaikaisella lipulla.
