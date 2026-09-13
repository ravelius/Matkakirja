# Karttauudistus erä 10: kuuden kaupungin lehtien sivut nostoiksi

*(Opus-työsessio → Fable, 13.9.2026. Haara
`claude/karttauudistus-era10-kaupungit`. Ei versionostoa, ei dist/:iä.
Lähteet: tehtävänanto, docs/raportit/viesti-fable-karttauudistus-era5-
20260913.md kokonaisuudessaan, docs/raportit/karttauudistus-suunnitelma-
20260913.md luvut 1.7 ja 4.5–4.7, docs/moduulit/kaupunkilehti.md,
Raamattu "Kaupungit" KARTTAUUDISTUS + PAATOKSET 1–6 ja "Kirjoittajan
säännöt" LAUSEIDEN YMMARRETTAVYYS + AIHEVALINNAN KYNNYS.)*

## 0. Lyhyesti

Pariisin jako (erä 5) on monistettu **kuuteen kaupunkiin**: Lontoo,
Rooma, Berliini, Madrid, Wien ja Amsterdam. Lehtien aihesivujen nostoista
syntyi **34 uutta klikattavaa karttapalaa**, joilla jokaisella on oma
piste kaupungin kohdekartalla, ja **15 uutta minikysymystä**. **17 nostoa
pudotettiin** kaksoiskappaleina — jokainen väite väitteeltä todennettuna.

**Teksti siirtyi merkki merkiltä samana.** Tämä ei ole silmämääräinen
väite: kortit generoitiin ohjelmallisesti suoraan lehden omista nostoista,
ja siirto todennettiin kahdesti — Nodessa `===`-vertailulla (35/35
kappaletta identtisiä) ja selaimessa avaamalla jokainen kortti pallon
päällä ja vertaamalla kortin koko leipäteksti lähteeseen (34/34).

Merkkimäärät ovat rajoissa: **kohdekartalla jokainen maa ≤ 17** ja
**pääkartalle ei tullut yhtään uutta merkkiä**. `npm test` 3313/0, savuke
**159/159 vihreänä**, punainen vastakoeajo kirjattu (luku 7).

**Kolme asiaa vaatii Fablen päätöksen** (luku 11): mitä lehden
`galleria`- ja `musiikki`-kentille tehdään pysyvästi, Rooman
kulttuurivisan sanavartalokytkös, ja Wienin kainalokartan tuntematon
rajaustarkistus.

## 1. Työtapa: parvi suunnitteli, generaattori kirjoitti

Kuusi Opus-agenttia teki yhden kaupungin jakosuunnitelman kukin
(`tmp-era10/spec/<kaupunki>.json`, ei committoitu). **Agentit eivät
kirjoittaneet koodia eivätkä leipätekstiä** — spekissä lähteeseen
viitataan osaston tunnuksella ja noston otsikolla. Pääsessio ajoi
spekit läpi koneellisen tarkistuksen (lähteet olemassa, jokainen
ei-hetki-nosto käsitelty täsmälleen kerran, tunnukset uniikkeja koko
pelissä, piste rajauksen sisällä, visan vastaus- ja faktalainaus
kortin tekstissä, kiintiö `floor(pooli/3)`) ja generoi koodin, joka
**kopioi tekstin suoraan `KULTTUURI_KATEGORIAT`-taulusta**.

Siksi "teksti siirtyi samana" ei ole lupaus vaan rakenne: kirjoittavaa
mallia ei ole missään kohdassa tekstin ja kortin välissä.

## 2. Jakotaulukot kaupungeittain

Kaikki uudet nostot ovat **kohdekartalla**, eivät pääkartalla
(omistajan sääntö 2.9.2026, tests/nostot-kartalla.test.mjs).
Historian hetki -osastoihin ei koskettu yhdessäkään kaupungissa.

### Lontoo — 9 korttia, 3 visaa, 3 pudotettua

| lehden nosto (osasto) | mrk | uusi nosto | kohdekartan piste | visa |
| --- | ---: | --- | --- | --- |
| "Metron tunnelissa savusi höyryveturi" (kaupunki) | 459 | `lontoon-metro-1863` | Metron höyryveturi | — |
| "Kupla, joka puhkesi Exchange Alleyssä" (kaupunki) | 678 | `exchange-alleyn-kupla` | Exchange Alley | **on** |
| "Canaletto maalasi myös Lontoon" (kaupunki) | 280 | `canaletto-lontoossa` | Canaletto Lontoossa | — |
| "Pubi, jossa Dickens istui" (kaupunki) | 357 | `the-george-pubi` | Dickensin pubi | — |
| "Suojatie, jota jonotetaan" (kaupunki) | 398 | `abbey-roadin-suojatie` | Abbey Roadin suojatie | **on** |
| "Tunneli, jossa saa maalata" (nykytaide) | 474 | `leake-streetin-tunneli` | Leake Streetin tunneli | — |
| "Tyhjä jalusta ja 2 400 ihmistä" (nykytaide) | 452 | `neljas-jalusta` | Neljäs jalusta | — |
| "Voimalasta tuli taidesali" (nykytaide) | 460 | `tate-modernin-turbiinihalli` | Turbiinihalli | **on** |
| "Veistos, jonka sisällä on liukumäki" (nykytaide) | 492 | `orbitin-liukumaki` | Liukumäkiveistos | — |

Nykytaide- ja luonto-osastot tyhjenivät kokonaan; kansiosastolle jäi
kaksi nostoa (luku 6). Kohdekartta 15 → 24 pistettä.

### Rooma — 5 korttia, 2 visaa, 3 pudotettua

| lehden nosto (osasto) | mrk | uusi nosto | kohdekartan piste | visa |
| --- | ---: | --- | --- | --- |
| "Kolikko olan yli" (kaupunki) | 402 | `rooman-kolikko` | Kolikko olan yli | — |
| "Leijona nousi lattian alta" (kaupunki) | 434 | `colosseumin-kellari` | Areenan kellari | **on** |
| "Norsu kantaa obeliskia" (kaupunki) | 526 | `minervan-norsu` | Norsu ja obeliski | — |
| "Vesi kulkee yhä" (arki) | 502 | `aqua-virgo` | Aqua Virgo | — |
| "Iso nenä joka kulmassa" (arki) | 465 | `rooman-nasone` | Nasone | **on** |

Historia-osasto tyhjeni kokonaan (kaikki kolme nostoa olivat
lyhennelmiä olemassa olevista syvennyksistä). Kohdekartta 11 → 16.

### Berliini — 5 korttia, 2 visaa, 4 pudotettua

| lehden nosto (osasto) | mrk | uusi nosto | kohdekartan piste | visa |
| --- | ---: | --- | --- | --- |
| "Hattupäinen ukkeli sai jäädä" (kaupunki) | 500 | `hattupainen-ukkeli` | Hattupäinen ukkeli | **on** |
| "Gaertner maalasi Berliinin talo talolta" (kaupunki) | 487 | `gaertnerin-berliini` | Gaertnerin Berliini | — |
| "Tyttö Schönebergistä lauloi maailman ympäri" (kaupunki) | 513 | `marlene-dietrich` | Marlene Dietrich | — |
| "Aurinko piirsi torniin ristin" (rakennukset) | 435 | `paavin-kosto` | Paavin kosto | **on** |
| "Kelloa pyöritti Trabantin vaihteisto" (rakennukset) | 451 | `maailmankello` | Maailmankello | — |

Historia-osasto tyhjeni kokonaan. Kohdekartta 11 → 16.

### Madrid — 6 korttia, 3 visaa, 2 pudotettua

| lehden nosto (osasto) | mrk | uusi nosto | kohdekartan piste | visa |
| --- | ---: | --- | --- | --- |
| "Kaupunki, jossa syödään seisten" (kaupunki) | 480 | `madridin-tapaskierros` | Tapaskierros | **on** |
| "Goya maalasi madridilaisten vapaapäivät" (kaupunki) | 467 | `goyan-kansankuvat` | Goyan kansankuvat | — |
| "Chotis tanssitaan yhden laatan päällä" (kaupunki) | 482 | `chotis-laatalla` | Chotis | **on** |
| "Nurmi lasketaan hissillä maan alle" + "Suihkulähde, joka vaihtoi joukkuetta" (urheilu) | 487+476 | `madridin-kaksi-joukkuetta` | Kaksi joukkuetta | — |
| "Linna rakennettiin palamattomaksi" (rakennukset) | 459 | `palamaton-linna` | Palamaton linna | — |
| "Katu, joka murrettiin talojen läpi" (rakennukset) | 495 | `gran-vian-murto` | Gran Vía | — |

**Erän ainoa yhdistetty kortti** on urheiluosaston `madridin-kaksi-joukkuetta`
(`lunastus[0..1]`): Santiago Bernabéu (40,4531 N) ja Vicente Calderón ovat
molemmat kohdekartan rajauksen ulkopuolella, eikä nurmikortin tekstissä ole
yhtään rajauksen sisäistä paikkaa — yhdistettynä kortin ankkuri on sen oman
toisen kappaleen aihe, Cibeleen suihkulähde. Urheilu- ja rakennusosastot
tyhjenivät. Kohdekartta 10 → 16.

### Wien — 4 korttia, 2 visaa, 5 pudotettua, 1 siirtämättä

| lehden nosto (osasto) | mrk | uusi nosto | kohdekartan piste | visa |
| --- | ---: | --- | --- | --- |
| "Ratas, joka kulkee kävelyä hitaammin" (kaupunki) | 427 | `praterin-ratas` | Rattaan kulmat | **on** |
| "Valkoiset hevoset syntyvät tummina" (kaupunki) | 432 | `lipizzanit` | Lipizzanit | — |
| "Taikahuilu tehtiin esikaupungin teatteriin" (musiikki) | 471 | `taikahuilu-wiedenissa` | Taikahuilu | **on** |
| "Kaupunki sävelsi oman jokensa" (musiikki) | 400 | `tonava-kaunoinen` | Tonava kaunoinen | — |

Tiede- ja luonto-osastot tyhjenivät kokonaan (kaikki viisi nostoa olivat
lyhennelmiä Wienin omista syvennyksistä ja täkynostoista). Yksi nosto jäi
siirtämättä, ks. luku 11.3. Kohdekartta 12 → 16.

### Amsterdam — 5 korttia, 3 visaa, 0 pudotettua — **OHUT LEHTI**

| lehden nosto (osasto) | mrk | uusi nosto | kohdekartan piste | visa |
| --- | ---: | --- | --- | --- |
| "Verotettiin julkisivun leveydestä" (kaupunki) | 391 | `amsterdamin-kapein-talo` | Kapein talo | **on** |
| "Vermeer peitti omat esineensä maalilla" (taide) | 442 | `amsterdamin-maitotytto` | Maitotyttö | — |
| "Kanavalla asuu laivallinen kissoja" (kaupunki) | 424 | `amsterdamin-kissalaiva` | Kissalaiva | **on** |
| "Koko kaupunki seisoo puutukkien päällä" (kaupunki) | 395 | `amsterdamin-puupaalut` | Herengracht 537 | — |
| "Yövartiosta sahattiin palat pois" (taide) | 443 | `amsterdamin-yovartio` | Yövartio | **on** |

**OHUT, TARVITSEE SISÄLTÖERÄN.** Amsterdamin lehdessä on vain kaksi
osastoa (`kaupunki` 3 nostoa, `taide` 2) — vertailun vuoksi Pariisissa on
yhdeksän ja Lontoossa kahdeksan. Puuttuvat kokonaan Historia, Ruoka,
Musiikki ja Historian hetki, ja kaupunki on niitä kaikkia täynnä (VOC,
Spinoza, Rembrandtin konkurssi, haring ja stroopwafel, Concertgebouw).
Mitään ei ollut pudotettavaa, koska kaksoiskappaleita ei ollut — lehdessä
ei yksinkertaisesti ole tarpeeksi ainesta. Kohdekartta 8 → 13.

## 3. VANHA/UUSI — merkki merkiltä, ohjelmallisesti

Jokaisen kortin jokainen `lunastus`-kappale verrattiin
`origin/main`-version lehden noston `teksti`-kenttään `===`-vertailulla.
**35 kappaletta, 0 eroa.** Otos (~5 tasavälein + suurin):

| lehden nosto (VANHA) | mrk | uusi kortti (UUSI) | tulos |
| --- | ---: | --- | --- |
| lontoo / "Metron tunnelissa savusi höyryveturi" | 459 | `lontoon-metro-1863`.lunastus[0] | SAMA |
| lontoo / "Kupla, joka puhkesi Exchange Alleyssä" | 678 | `exchange-alleyn-kupla`.lunastus[0] | SAMA (erän suurin yhden kappaleen siirto) |
| rooma / "Norsu kantaa obeliskia" | 526 | `minervan-norsu`.lunastus[0] | SAMA |
| berliini / "Tyttö Schönebergistä lauloi maailman ympäri" | 513 | `marlene-dietrich`.lunastus[0] | SAMA |
| madrid / "Nurmi lasketaan hissillä maan alle" + "Suihkulähde…" | 487+476 | `madridin-kaksi-joukkuetta`.lunastus[0..1] | SAMA (erän suurin kortti, 964 mrk) |
| wien / "Taikahuilu tehtiin esikaupungin teatteriin" | 471 | `taikahuilu-wiedenissa`.lunastus[0] | SAMA |
| amsterdam / "Yövartiosta sahattiin palat pois" | 443 | `amsterdamin-yovartio`.lunastus[0] | SAMA |

Sama todennus ajetaan **myös selaimessa**: savukkeen vartio 4b avaa
kaikki 34 korttia pallon päällä ja vertaa kortin koko leipätekstin
lähteeseen merkki merkiltä (esim. 678/678, 964/964, 391/391).

**Ja toiseen suuntaan:** lehteen jääneet nostot ovat ennallaan.
Koneellinen vertailu `origin/main`iin: **1 563 jäljelle jäänyttä nostoa
tavu tavulta identtisiä, 41 poistettua, 0 muuttunutta** — eikä yhtään
osastoa, johdantoa tai lehtitehtävää muutettu missään kaupungissa.

### Otos tehtävänannon pyytämällä työkalulla

`node tools/vertaa-sisaltodiff.mjs origin/main HEAD …`:

| tiedosto | tulos |
| --- | --- |
| `js/packs/nahtavyysjutut.js` NAHTAVYYSJUTUT | **Muuttuneita kenttiä: 0** |
| `js/packs/maakartat.js` KAUPUNKIKARTAT | **Muuttuneita kenttiä: 0** |
| `js/packs/kulttuuri-kategoriat.js` KULTTUURI_KATEGORIAT | 13 paria — **työkalun indeksiharha**, ei sisältömuutos |

Indeksiharha on sama ilmiö kuin erässä 5: kun osastosta poistuu nostoja,
`nostot[0]` on eri nosto kuin ennen, ja työkalu vertaa indeksiä eikä
otsikkoa. Sen näkee otoksesta suoraan — parit ovat eri aiheista
(Canaletton kuvateksti vs. Abbey Roadin kuvateksti, Goyan niitty vs.
chotis-puku). Yllä oleva otsikkokohtainen 1 563 / 0 -vertailu on se,
mitä pistokokeessa kannattaa lukea.

## 4. Pudotettu aines — 17 sivuversiota, kaikki kaksoiskappaleita

Jokainen pudotettu on **sivuversio nostosta, jonka oma laajempi kortti
sisältää sivuversion jokaisen faktaväitteen**. Pelaaja ei menetä yhtään
faktaa, vaan lyhennelmän.

| kaupunki | pudotettu sivuversio | mrk | laajempi vastine |
| --- | --- | ---: | --- |
| lontoo | "Kellarin lattian alta tuli neljäsataa korua" | 606 | `syvennys-lontoo-cheapside` (1 012 mrk, kohdekartta) — 6/6 väitettä |
| lontoo | "Laskuvesi paljastaa rannan keskellä kaupunkia" | 544 | `syvennys-lontoo-vuorovesi` (788 mrk, kohdekartta) — 5/5, virke virkkeeltä sama |
| lontoo | "Richmond Parkin lauma" | 580 | syvennys `hirvet` (701 mrk) — 5/5 |
| rooma | "Vatikaanin vanki" | 590 | `syvennys-rooma-vatikaani` (929 mrk, kohdekartta) |
| rooma | "Avaimenreikä, josta näkee kolmen valtion läpi" | 579 | `syvennys-rooma-avaimenreika` (643 mrk) |
| rooma | "Kissalauma asuu temppelissä" | 585 | `syvennys-rooma-kissat` (733 mrk, kohdekartta) |
| berliini | "Portista alkaa Unter den Linden" | 560 | fokuskohde `brandenburgin-portti` — **teksti on merkki merkiltä sama (560 === 560)** |
| berliini | "Karhu on ollut sinetissä vuodesta 1280" | 629 | `syvennys-berliini-karhu` (917 mrk) — 7/7 |
| berliini | "Univormu, joka valtasi kaupungintalon" | 616 | täkynosto `kopenickin-kapteeni` — 10/10 |
| berliini | "Fossiilin hinta oli yksi lehmä" | 571 | `nosto-archaeopteryx` (763 mrk) — 6/6 |
| madrid | "Puistoissa asuu tuhansia villejä papukaijoja" | 585 | täkynosto `munkkiaratit` (1 080 mrk) — kaikki 6 virkettä merkki merkiltä |
| madrid | "Tasavallan vuosi: neljä johtajaa yhdessä vuodessa" | 571 | `syvennys-madrid-tasavalta` (967 mrk, kohdekartta) — 5/5 |
| wien | "Kone, joka pyörähti väärään suuntaan" | 624 | syvennys `sahko` (747 mrk) |
| wien | "Vuoristovesi ratkaisi talojen korkeuden" | 665 | `syvennys-wien-vesijohto` (898 mrk, kohdekartta) |
| wien | "Kahdeksan päivää avajaisista pörssi suljettiin" | 547 | täkynosto `maailmannayttely-1873` — tarkka osajoukko |
| wien | "Kauriit vanhalla hautausmaalla" | 583 | syvennys `kauriit` (849 mrk) |
| wien | "Yksi kirahvi muutti koko kaupungin muodin" | 477 | täkynosto `kirahvimuoti` — **sama teksti kahteen kappaleeseen jaettuna** |

*(Lontoo 3, Rooma 3, Berliini 4, Madrid 2, Wien 5 = 17. Amsterdamissa ei
ollut mitään pudotettavaa — kaksoiskappaleita ei ollut.)*

Yhteenveto poistoista: lehden nostoja poistui kuudesta kaupungista
**41**, joista **24 siirtyi kortiksi** ja **17 pudotettiin**
kaksoiskappaleena. Lisäksi **11 noston lähdettä jäi lehden sivulle**
tahallisena kaksoiskappaleena (luku 6).

**Johdannot jäivät sivuille** kaikissa kaupungeissa, kuten Pariisissa.
Ne eivät esitä yhtään faktaa, jota näissä korteissa ei olisi.

**Kaksi pudotusta ansaitsee erillisen huomion.** Rooman
"Avaimenreikä…"-vastine (`syvennys-rooma-avaimenreika`) on PÄÄKARTALLA
eikä Rooman kohdekartalla: Aventinus 41,8836 N jää kohdekartan
eteläreunan (41,8845) alapuolelle. Tarina löytyy siis yhä pelistä, mutta
ei Rooman kohdekartalta. Sama koskee Berliinin Köpenickiä ja Lontoon
Richmond Parkia — kaikki kolme ovat kartan rajauksen ulkopuolella.
Rajauksen laajentaminen on kuvatyötä eikä tämän erän työtä.

## 5. Minikysymykset — 15 uutta

Kiintiö on joka kolmas nosto kaupungin poolissa
(`floor(nostoja / 3)`), ja se täyttyy jokaisessa kuudessa kaupungissa
tarkalleen:

| kaupunki | pooli erän jälkeen | visoja | kiintiö |
| --- | ---: | ---: | ---: |
| lontoo | 10 | 3 | 3 |
| rooma | 6 | 2 | 2 |
| berliini | 8 | 2 | 2 |
| madrid | 9 | 3 | 3 |
| wien | 6 | 2 | 2 |
| amsterdam | 9 | 3 | 3 |

Kysymykset:

| kaupunki | nosto | kysymys |
| --- | --- | --- |
| lontoo | `exchange-alleyn-kupla` | Etelämeren yhtiön osake oli vuoden 1720 puheenaihe. Miten sen hinta liikkui sinä vuonna? |
| lontoo | `abbey-roadin-suojatie` | Abbey Roadin levynkannen kuva otettiin elokuussa 1969. Miten se syntyi? |
| lontoo | `tate-modernin-turbiinihalli` | Ai Weiwei täytti Tate Modernin turbiinihallin lattian vuonna 2010. Millä? |
| rooma | `colosseumin-kellari` | Colosseumin areenalla eläin saattoi ilmestyä keskelle kuin tyhjästä. Miten se tehtiin? |
| rooma | `rooman-nasone` | Rooman katupylvään eli nasonen putken päällä on pieni reikä. Mitä varten se on? |
| berliini | `hattupainen-ukkeli` | Saksojen yhdistyttyä hattupäistä ukkelia alettiin vaihtaa pois risteyksistä. Miksi se sai jäädä? |
| berliini | `paavin-kosto` | Miten televisiotornin pallo saatiin betonipylvään päähän? |
| madrid | `madridin-tapaskierros` | Mitä espanjan sana tapa alun perin tarkoittaa? |
| madrid | `chotis-laatalla` | Mikä soitin säestää chotista Madridin kaduilla? |
| madrid | `gran-vian-murto` | Millä työkalulla kuningas Alfonso XIII avasi Gran Vían työmaan vuonna 1910? |
| wien | `praterin-ratas` | Praterin jättiratas ei ole ympyrä. Minkä muotoinen sen kehä on? |
| wien | `taikahuilu-wiedenissa` | Millä kielellä Taikahuilu laulettiin ensi-illassaan? |
| amsterdam | `amsterdamin-kapein-talo` | Amsterdamin kapeissa kanavataloissa portaat ovat jyrkät kuin tikkaat. Miten huonekalut saadaan yläkertaan? |
| amsterdam | `amsterdamin-kissalaiva` | Henriëtte van Weelden asunto kävi ahtaaksi kerätyistä kulkukissoista. Mitä hän teki? |
| amsterdam | `amsterdamin-yovartio` | Yövartio ei esitä yötä lainkaan. Mistä väärä nimi silloin tuli? |

Jokaisesta on todennettu koneellisesti, että **vastaus ja faktarivi ovat
saman kortin tekstissä sanatarkasti** (spektarkistus + savukkeen vartio
6). Väärät vaihtoehdot ovat uskottavia arvauksia eivätkä faktaväitteitä,
kysymykset yhden virkkeen mittaisia ja 13+ -sopivia.

**Oikean vastauksen indeksi kierrätettiin 0 → 1 → 2** generoinnissa
(tests/visajakauma.test.mjs, mittaus 30.8.2026 löysi indeksi 0
-vinouman). Jakauma on nyt **5 / 5 / 5**.

Kaksi korttia jätettiin tarkoituksella ilman visaa, vaikka ne olisivat
osuneet kiintiöpaikalle: `lontoon-metro-1863` ja `aqua-virgo`, joiden
ainoa iso vastaus on jo kaupungin aarteen avaavan kulttuurivisan vastaus
(Raamatun spoilerisääntö).

## 6. Kansisivut ja lehteen jääneet nostot

Kaikissa kuudessa kaupungissa yksi kansiosaston nosto **jäi lehden
sivulle**, koska kaupungin kulttuurivisan vastaus on sen tekstissä ja
tests/lehdet.test.mjs vaatii sen kansisivulta — sama ratkaisu kuin
Pariisin patongissa (erän 5 luku 7.2). Sama teksti on lisäksi kartalla.

| kaupunki | kansisivulle jäänyt nosto | kulttuurivisa |
| --- | --- | --- |
| lontoo | "Metron tunnelissa savusi höyryveturi" | "Mikä veti maailman ensimmäisiä metrojunia Lontoossa 1863?" |
| rooma | "Norsu kantaa obeliskia" | "Miten Rooman akveduktit saivat veden liikkeelle?" — **ks. 11.2** |
| berliini | "Hattupäinen ukkeli sai jäädä" | "Mistä hattupäinen ukkeli on peräisin?" |
| madrid | "Chotis tanssitaan yhden laatan päällä" | "Mikä on chotis-tanssin tunnetuin sääntö?" |
| wien | "Ratas, joka kulkee kävelyä hitaammin" | "Miksi Praterin jättipyörän vaunut roikkuvat joka toisessa kulmassa?" |
| amsterdam | "Verotettiin julkisivun leveydestä" | "Miksi kanavatalot ovat niin kapeita?" |

### Lisäksi: mediakentät, joita nostokortti ei tunne

Inventaariossa löytyi asia, jota erän 5 raportti ei mainitse:
**18 siirrettävällä lehden nostolla oli kenttiä, joille nostokortin
datamallissa ei ole paikkaa** — `galleria` (kuvalista; js/fokusnosto.js
osaa gallerian vain skandaalikortilla), `musiikki`/`esikuuntelu`/
`musiikkiNayte` ja `aani`. Pariisin erässä 5 kolme Apple Music -linkkiä
(Piaf, Django, Carmen) katosi tätä kautta pelistä hiljaa.

Ratkaisin sen kahdella säännöllä, jotka generaattori ajaa itse:

1. **`galleria` seuraa kohdekartan juttuun.** `NAHTAVYYSJUTUT`-merkinnän
   `kuvat` on lista, joten gallerian kuvat selitteineen ja lähteineen
   siirtyvät sinne. Yhtään kuvaa ei poistettu repon datasta.
2. **Musiikki- ja äänikenttäinen nosto jää myös lehden sivulle** (sama
   kaksoiskappale kuin kulttuurivisan lähdejuttu). Linkille tai
   ääninäytteelle ei ole paikkaa kummallakaan kortilla, ja siirto
   pudottaisi ne pelistä kokonaan.

Sivulle jääneet musiikki-/äänikenttäiset nostot: lontoo "Suojatie, jota
jonotetaan"; rooma "Kolikko olan yli"; berliini "Tyttö Schönebergistä
lauloi maailman ympäri"; wien "Kaupunki sävelsi oman jokensa" ja
"Taikahuilu tehtiin esikaupungin teatteriin". (Madridin chotis-nosto jää
jo kulttuurivisan takia.)

Tämä on tulkintapäätös, ja se kuuluu Fablelle — ks. 11.1.

## 7. Merkkimäärät ja karttapisteet

`node tools/laske-karttanostot.mjs`:

| maa | pääkartalla ennen | pääkartalla jälkeen | kohdekartalla ennen | kohdekartalla jälkeen | raja |
| --- | ---: | ---: | ---: | ---: | ---: |
| GBR Iso-Britannia | 20 | **20** | 7 | **16** | pää ≤ 21, kohde ≤ 17 |
| ITA Italia | 22 | **22** | 12 | **17** | kohde ≤ 17 (täynnä) |
| DEU Saksa | 28 | **28** | 5 | **10** | |
| ESP Espanja | 25 | **25** | 10 | **16** | |
| AUT Itävalta | 20 | **20** | 3 | **7** | |
| NLD Alankomaat | 20 | **20** | 3 | **8** | |

**Pääkartalle ei tullut yhtään uutta merkkiä** yhdessäkään maassa — se on
koko erän jako-periaate. Kohdekartalla jokainen maa on rajan sisällä;
Italia on nyt täsmälleen katossa (17/17), eli Rooman seuraava karttanosto
ei mahdu ilman että jotain siirtyy.

**Italia, Espanja ja Saksa olivat pääkartan 21 merkin rajan yli jo ennen
tätä erää** (22 / 25 / 28, mitattuna origin/main v1851). Se ei ole tämän
erän aiheuttamaa, ja koska erä ei lisää pääkartalle mitään, savukkeen
vartio 0a mittaa näissä maissa sitä, ettei luku kasva. Ylitys on
kirjattu Fablelle (11.5).

Kohdekarttojen pistemäärät: lontoo 15 → 24, rooma 11 → 16, berliini
11 → 16, madrid 10 → 16, wien 12 → 16, amsterdam 8 → 13. Vertailuksi
Pariisissa on erän 5 jälkeen 31.

**Koordinaatteja ei keksitty.** 18 pistettä 34:stä on kartan omista
kohteista (kortti kertoo täsmälleen samasta rakennuksesta), loput
julkisia osoitteita Wikipediasta, Wikidatan P625:stä tai
OpenStreetMapista, jokainen perusteltuna spekissä. Päällekkäisyys
hoidetaan `nimiPuoli`- ja `siirto`-kentillä, ei koordinaattia siirtämällä
(js/nahtavyydet.js:456).

**Pääsessio korjasi kolme agenttien koordinaattia** tarkistusajon
jälkeen — ne eivät olleet väärässä paikassa vaan kelvottomassa:

| kortti | agentin ehdotus | vika | korjattu |
| --- | --- | --- | --- |
| `orbitin-liukumaki` | Hyde Parkin Serpentine 51,5050 / −0,1650 | **100 % vettä** (järvi) | The Mall 51,5040 / −0,1350 — sama vuoden 2012 kisapaikka-peruste, kuivalla maalla |
| `amsterdamin-puupaalut` | 52,3652 / 4,8946 | **89 % vettä** (Herengrachtin kanava) | 52,3649 / 4,8946, talon oma rantatontti |
| `marlene-dietrich` | Rathaus Schöneberg 52,4842 / 13,3433 | **peitti mittakaavajanan** | Marlene-Dietrich-Platz 52,5075 / 13,3728 — kaupungin oma, juuri hänelle nimetty aukio |

Korjausten jälkeen `node tools/tarkista-karttapisteet.mjs <kaupunki>`
antaa exit 0 viidelle kaupungille. **Lontoo antaa exit 1, mutta syy on
tätä erää vanhempi**: pisteet "Thamesin vuorovesi" ja "Tunneli 1827" ovat
Thamesissa jo `origin/main`issa — tarkistettu ajamalla työkalu
origin/mainin maakartat.js:llä, tulos identtinen. Erän omat yhdeksän
Lontoon pistettä ovat kaikki maalla.

## 8. Savukeajot

`tools/savukkeet/savuke-kaupunkien-nostot.mjs` — yleistys erän 5
`savuke-pariisin-nostot.mjs`:stä. Kaupunkilista on tiedoston omassa
taulussa ja rajattavissa komentoriviltä, joten seuraava erä lisää siihen
rivin eikä tiedostoa. **Erän omat nostot tunnistetaan `lahde`-riviltä**
("karttauudistuksen erässä 10"), joten listaa ei ylläpidetä käsin eikä
se voi ajautua datasta erilleen. Rivi lisätty tools/savukkeet/README.md.

### Vihreä ajo (koodi sellaisenaan) — 159/159

```
INFO  lontoo (GBR) pääkartalla / kohdekartalla: 20 / 16 (lähtötaso pää 20)
OK    0a. GBR: pääkartan merkkejä ≤ 21
OK    0b. GBR: kohdekartan merkkejä ≤ 17
INFO  lontoo: uusia nostoja: 9 (lontoon-metro-1863, exchange-alleyn-kupla, …)
OK    1. lontoo: jokaisella uudella nostolla on kohdekarttapiste
OK    1b. lontoo: yksikään uusi nosto ei ole pääkartalla
INFO  lontoo: nostot / minikysymykset: 10 / 3 (kiintiö 3)
OK    2. lontoo: minikysymys joka kolmannessa nostossa
OK    6. exchange-alleyn-kupla: minivisan faktarivi on kortin tekstissä sanatarkasti
INFO  lontoo: vastakoe ilman pistettä pää / kohde: 20 / 15
OK    3. lontoo: VASTAKOE — kohdekarttapisteen poisto vie nostolta karttapaikan
OK    3b. lontoo: piste palautui ajon jälkeen
INFO  rooma (ITA) pääkartalla / kohdekartalla: 22 / 17 (lähtötaso pää 22)
OK    0a. ITA: pääkartan merkkimäärä ei kasva (lähtötaso 22 > 21)
…
OK    lontoo: pallolauta aukesi
OK    1c. lontoo: yksikään uusi nosto ei ole pallon osumissa
INFO  exchange-alleyn-kupla: kappaleita 2, merkkejä 678/678, visa on
OK    4b. exchange-alleyn-kupla: kortin teksti täsmää lähteeseen sanatarkasti
INFO  madridin-kaksi-joukkuetta: kappaleita 2, merkkejä 964/964, visa ei
OK    4b. madridin-kaksi-joukkuetta: kortin teksti täsmää lähteeseen sanatarkasti
INFO  amsterdam: kaupunkilehden kohdekartta: pisteitä 13, selitteitä 13
OK    5. amsterdam: kaupunkilehti avautuu ja kohdekartta piirtää pisteensä
OK    ei sivuvirheitä

159/159 läpi
```

### Punainen ajo (VASTAKOE: yksi kohdekarttapiste poistettu datasta)

Muutos: js/packs/maakartat.js:stä poistettiin Berliinin
`Maailmankello`-piste. Muuta ei koskettu; tiedosto palautettiin heti
ajon jälkeen (`node tools/laske-karttanostot.mjs` todentaa palautuksen:
DEU koh 10, Berliinin kohteet 16).

```
INFO  berliini (DEU) pääkartalla / kohdekartalla: 29 / 9 (lähtötaso pää 28)
FAIL  0a. DEU: pääkartan merkkimäärä ei kasva (lähtötaso 28 > 21) — 29 > 28
FAIL  1. berliini: jokaisella uudella nostolla on kohdekarttapiste — maailmankello
FAIL  1b. berliini: yksikään uusi nosto ei ole pääkartalla — maailmankello
FAIL  1c. berliini: yksikään uusi nosto ei ole pallon osumissa — nosto-maailmankello, …
```

**Neljä vartiota kaatuu ja muut pysyvät vihreinä.** Luku 28 → 29 näyttää
mekanismin: karsintasääntö todella palautti noston pääkartalle, kun sen
kohdekarttapiste hävisi. Savuke siis mittaa juuri sitä, mitä väittää
mittaavansa. Savukkeen oma vartio 3 tekee saman kokeen ajon aikana
jokaisessa kaupungissa.

### Erien 5 ja 6 savukkeet yhä vihreinä

`savuke-nostovisa.mjs` ja `savuke-pariisin-nostot.mjs` koskevat vain
Pariisia, eikä tämä erä muuta Pariisin dataa.

## 9. Portit

| portti | tulos |
| --- | --- |
| `npm test` | `# tests 3326`, `# pass 3313`, `# fail 0`, skipped 13 |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `node tools/tarkista-niputus.mjs` | 388 moduulia, 4 206 julistusta, ei törmäyksiä |
| `node tools/tarkista-savukkeet.mjs` | 1 593 ui-viittausta, ei puuttuvia nimiä |
| `node tools/tarkista-nostopaikat.mjs --lyhyt` | ilman karttapaikkaa 0, exit 0 |
| `node tools/tarkista-karttapisteet.mjs` × 6 | exit 0 viidelle; lontoo exit 1 erää vanhemmasta syystä (luku 7) |
| `node tools/build-standalone.mjs` | dist/matkakirja.html 31 979 kt (ei committoitu) |
| `grep -rn '^<<<<<<<' js css tests tools` | tyhjä |
| savuke-kaupunkien-nostot | 159/159 |

## 10. Muutetut tiedostot ja kuvakaappaukset

| tiedosto | muutos |
| --- | --- |
| `js/packs/fokusvirta-{lontoo,rooma,berliini,madrid,wien,amsterdam}.js` | 34 uutta `takynostot`-riviä, 15 uutta `visa`-kenttää. `lehtitehtavat`, `takyt` ja `kohtaaminen` ennallaan |
| `js/packs/maakartat.js` | 34 uutta `KAUPUNKIKARTAT.<kaupunki>.kohteet`-riviä |
| `js/packs/nahtavyysjutut.js` | 34 uutta juttua, teksti = noston `lunastus` `\n\n`-liitoksena; gallerioiden kuvat `kuvat`-listaan |
| `js/packs/kulttuuri-kategoriat.js` | 41 nostoa poistettu (24 siirtyi kortiksi, 17 pudotettiin) kuuden kaupungin osastoista, perustelut lohkokommentteina jokaiseen muuttuneeseen osastoon. Osastoja, johdantoja eikä lehtitehtäviä ei poistettu |
| `tools/savukkeet/savuke-kaupunkien-nostot.mjs` | uusi savuke |
| `tools/savukkeet/README.md` | yksi rivi |
| `docs/raportit/kuvat/karttauudistus-10-*.png` | kuusi kaappausta (100–158 kt kukin) |

Kuvakaappaukset ovat kunkin kaupungin kohdekartta kaupunkilehdessä,
390 × 844, deviceScaleFactor 2, css-mitassa:
`karttauudistus-10-{lontoo,rooma,berliini,madrid,wien,amsterdam}.png`.

**Mitä EI tehty** (tehtävänannon rajat pidetty): js/lehti.js,
js/pallolauta/*, js/fokus*.js, js/pollo.js, js/livia-*.js ovat
koskemattomia. Karsintasääntöä ei muutettu. Versiota ei nostettu,
dist/:iä ei committoitu. Menovinkkejä ja maaosastoa ei poistettu
kaupunkilehdistä (js/lehti.js-työtä, kuten erässä 5).

## 11. AVOIMET — Fablen päätettäväksi

### 11.1 Mitä `galleria`- ja `musiikki`-kentille tehdään pysyvästi?

Luvun 6 kaksi sääntöä ovat tämän session tulkinta, eivät omistajan
linjaus. Ne pitävät aineiston tallella, mutta kumpikin on kiertotie:

- **Galleria kohdekartan jutussa toimii, mutta js/nahtavyydet.js
  näyttää enintään viisi kuvaa** (`kuvat.slice(0, 5)`). Kaksi juttua ylittää
  sen: `gaertnerin-berliini` ja `goyan-kansankuvat` (6 kuvaa kumpikin),
  joten niissä kuudes kuva on datassa mutta ei näy pelaajalle. Vaihtoehdot:
  nostaa katto kuuteen, tai antaa nostokortille gallerian tuki (silloin
  kuvat kuuluisivat kortille eikä juttuun).
- **Musiikki- ja äänikenttäiset nostot jäivät sivulle**, mikä pitää viisi
  nostoa lehdessä kaksoiskappaleina. Jos nostokortti saa `musiikki`-tuen,
  nekin voi tyhjentää sivulta.

**Ja taaksepäin katsova havainto:** erä 5 pudotti Pariisista kolme Apple
Music -linkkiä (Piaf, Django, Carmen) juuri tätä kautta. Jos linkit
halutaan takaisin, ne ovat `git show 721efc3 -- js/packs/kulttuuri-kategoriat.js` -diffissä
(v1850, erä 5).

### 11.2 Rooman kulttuurivisan kytkös on sanavartalo, ei sisältö

Rooman kulttuurivisa kysyy akvedukteista, ja sen **oikea lähdejuttu on
osastolla `arki`** ("Vesi kulkee yhä"), ei kansiosastolla.
tests/lehdet.test.mjs lukee vain kansiosaston ja läpäisee nyt sanalla
`rooman` nostossa "Norsu kantaa obeliskia" — norsupatsas ei kerro
akvedukteista mitään. Testi oli siis vihreä jo ennen tätä erää väärästä
syystä.

Jätin "Norsu kantaa obeliskia" kansisivulle, koska sen poisto olisi
kaatanut testin. Kaksi korjausvaihtoehtoa: siirtää "Vesi kulkee yhä"
kansiosastolle (sisältötyötä), tai tiukentaa testiä niin ettei kaupungin
nimen vartalo kelpaa osumaksi (jolloin muidenkin kaupunkien kytkökset
kannattaa mitata samalla). Kumpikaan ei kuulunut tähän erään.

### 11.3 Wienin kainalokartta: yksi nosto jäi siirtämättä

Wienin "Keisarin aamiaishuone eläintarhan keskellä" **ei siirtynyt**.
Aiheen ainoa oikea osoite on Schönbrunn (48,1845 N / 16,3119 E), joka on
Wienin kohdekartan **kainalossa** (rajat 48,178–48,191 N /
16,303–16,325 E) eikä päärajauksessa. Kainalo piirtyy pelissä osana samaa
kohdekarttaa, ja Schönbrunn on siellä jo napautettavana pisteenä — mutta
`tools/tarkista-nostopaikat.mjs`:n `kohdekartallaSisalla` tuntee vain
päärajauksen, joten tests/nostot-kartalla.test.mjs kaatui
("wien/Aamiaishuone on kartan rajauksen ulkopuolella").

Guardin täydentäminen on työkalumuutos eikä tämän erän dataa
(Kustannuskuri, sääntö 1), joten nosto jäi lehden sivulle. **Korjattuna
kortti syntyisi sellaisenaan**: piste Schönbrunn 48,1845 / 16,3119, nimiö
oikealle. Sama koskee kaikkia muitakin kainalollisia kohdekarttoja
(Helsingin Suomenlinna, Pekingin kainalo) — yksikään niiden kohde ei voi
tällä hetkellä kantaa karttanostoa.

### 11.4 Amsterdam on ohut ja se näkyy nyt

Amsterdamissa on kaksi osastoa ja viisi nostoa, eikä pudotettavaa ollut
lainkaan. Uudessa käyttöliittymässä ohuus näkyy heti, koska valikossa on
vain kaksi riviä. **Tarvitsee sisältöerän** — puuttuvat Historia, Ruoka,
Musiikki ja Historian hetki. (Marseille on yhä samassa tilassa, erän 5
avoin kohta 8.)

### 11.5 Pääkartan 21 merkin raja on rikki kolmessa maassa jo ennestään

Mitattuna origin/main v1851: **ITA 22, ESP 25, DEU 28** (ja erän
ulkopuolella GRC 33, TUR 29, RUS 22, HRV 23). Erä ei kasvattanut yhtäkään
näistä, mutta raja kannattaa joko nostaa tai ajaa näille maille sama
siirto kohdekartoille kuin tässä erässä. Kirjattu havaintona, ei korjattu.

### 11.6 Italian kohdekartta on täynnä

ITA on nyt 17/17. Rooman seuraava karttanosto ei mahdu ilman että jokin
siirtyy — tai että katto nostetaan.

### 11.7 Pienempiä havaintoja

1. **Lehtitehtävien vastaukset siirtyivät kartalle** useassa kaupungissa
   (Wienin tiede-, luonto- ja musiikkisivu; Berliinin maailmankello- ja
   nimikysymys; Amsterdamin Yövartio-visa). Sama ilmiö kuin Pariisin
   sivuilla 2–3 (erän 5 avoin kohta 7). Tehtäviin ei koskettu.
2. **Osastojen johdannot lupaavat nyt juttuja, joita samalla sivulla ei
   ole** (esim. Rooman historia, Wienin tiede). Se on uudistuksen
   tarkoitus, mutta jos johdannot halutaan päivittää, se on Fablen
   kaanonityötä.
3. **Kuvaton kortti:** `exchange-alleyn-kupla`. Lehden kuva on R2-ämpärin
   `osoite`, joka ei kelpaa nostokortille (sama rajoite kuin Pariisin
   `pariisin-vuosisadat`illa, erän 5 kohta 7.6). Kortti aukeaa
   tekstikorttina.
4. **Numeroympyröiden peitto** raportoi "HARKITSE KOHTEEN VAIHTOA"
   kymmenelle parille, joista kahdeksan on tahallisia: kortti istuu
   kartan omassa pisteessä (Colosseum, Tv-torni, Prado, Hofburg,
   Jättiratas, Rijksmuseum, Kuninkaanpalatsi, Cibeles) ja päällekkäisyys
   on hoidettu `nimiPuoli`- ja `siirto`-kentillä talon tavalla. Kaksi
   loppua ovat uusia naapureita: berliini "Museosaari ja Gaertnerin
   Berliini" 79 % ja lontoo "Big Ben ja Canaletto Lontoossa" 64 % —
   kummassakin uudella merkillä on `nimiPuoli`, joten nimiöt eivät osu
   toisiinsa, mutta silmätarkistus kuvakaappauksista kannattaa.
5. **Lähizoomiportti (`nosto.lahi`) puuttuu yhä** — erän 5 avoin kohta
   7.3. Ei rakennettu, kuten tehtävänannossa ohjeistettiin. Käytännössä
   tämän erän nostot ovat kohdekartalla, joten ne eivät ole pääkartan
   ruuhkaongelma.
