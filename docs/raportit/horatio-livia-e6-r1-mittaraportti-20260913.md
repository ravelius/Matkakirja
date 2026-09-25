# Horatio + Livia E6 R1 – mittaraportti

- Revisio: `eu-hl-e6-20260913-r1-approved1`
- Julkaistu lähtörevisio: `079284e1cf09f650ed7e5f3d54f54c4e3da933b1`
- Tila: hyväksytty ja sisältöjäädytetty; audioajo vain RC/animaatiovetäjälle.
- Mittatapa: Unicode-merkit ja välilyönnein erotetut sanat; parissa ei lasketa erotinmerkkiä.

## Mitat

| Kaupunki | Lähtö H | Hyväksytty H | Lähtö L | Hyväksytty L | Lähtö pari | Hyväksytty pari | Tulos |
|---|---:|---:|---:|---:|---:|---:|---|
| Kiova | 326/41 | 275/34 | 96/14 | 136/19 | 422/55 | 411/53 | alittaa |
| Odessa | 353/43 | 291/36 | 99/13 | 147/16 | 452/56 | 438/52 | alittaa |
| Krakova | 298/44 | 268/39 | 109/16 | 134/16 | 407/60 | 402/55 | alittaa |
| Varsova | 340/43 | 266/33 | 113/13 | 147/16 | 453/56 | 413/49 | alittaa |
| Moskova | 342/45 | 296/37 | 103/12 | 134/17 | 445/57 | 430/54 | alittaa |
| Pietari | 333/43 | 266/35 | 91/13 | 139/19 | 424/56 | 405/54 | alittaa |

Mitat koskevat hyväksyttäväksi tarjottavaa näkyvää tekstiä. Livia toimii kuudella eri tavalla: rajaa lentoreittinsä Kiovassa, tarkkailee vaurioita Odessassa, kuuntelee jakelusuuntia Krakovassa, lukee asuttua toria Varsovassa, väistää kameroita Moskovassa ja sovittaa reittinsä siltoihin Pietarissa. Kahvia, pullaa tai yhtä toistuvaa vitsikaavaa ei käytetä.

## Exact ElevenLabs v3 -TTS ja cue-ankkurit

Tagit ovat ääniohjeita eivätkä kuulu näkyvään tekstiin. Tagien poistaminen palauttaa lukukopion tekstin täsmälleen.

### Kiova

**Horatio TTS**

> [curious] Kiovan luostarin kupolit näkyivät Dneprille, mutta pyhiinvaeltajat menivät maan alle. Luolassa liekkini sammui. [softly] Edellä kulkeva nainen sytytti sen omastaan. Kaksi liekkiä, eikä ensimmäiseltä puuttunut mitään. Olen tutkinut monta tapaa siirtää omaisuutta. Tämän haluan muistaa.

**Livia TTS**

> [curious] Dneprin tuuli nosti minut Lavran muurin ylle, mutta luolasto jäi ihmisille. [softly] Reittiinsä luottava kirjekyyhky tietää myös, mihin ei lennä.

| Cue-ID | Puhuja | Ankkuri | Tarkoitus | Voima |
|---|---|---|---|---:|
| `kiova.r1` | H | `menivät maan alle` | hammastyy | 0.40 |
| `kiova.r2` | H | `sytytti sen omastaan` | vakavoituu | 0.55 |
| `kiova.r3` | H | `Kaksi liekkiä` | hammastyy | 0.50 |
| `kiova.r4` | H | `siirtää omaisuutta` | huvittuu | 0.40 |
| `kiova.r5` | H | `Tämän haluan muistaa` | myotailee | 0.50 |
| `kiova.livia.c1` | L | `luolasto jäi ihmisille` | hammastyy | 0.35 |
| `kiova.livia.c2` | L | `Reittiinsä luottava kirjekyyhky` | myotailee | 0.35 |
| `kiova.livia.c3` | L | `mihin ei lennä` | vakavoituu | 0.45 |

### Odessa

**Horatio TTS**

> [curious] Odessan portaat olivat niin leveät, että niitä pitkin olisi voinut saapua valtakunta. [mischievously] Minä saavuin yksin ja lepäsin silti puolivälissä. Satamassa vehnäsäkit siirtyivät laivaan; ylhäällä herrat siirtelivät keppejään. Merituuli kulki portaat yhdellä hengenvedolla; sitä ei pysäytetty tullissa.

**Livia TTS**

> [softly] Vanhakaupunki on yhä vaarantuneen maailmanperinnön luettelossa. Lensin portaiden yllä ja pidin vaurioituneisiin kattoihin tavallista enemmän väliä.

| Cue-ID | Puhuja | Ankkuri | Tarkoitus | Voima |
|---|---|---|---|---:|
| `odessa.r1` | H | `saapua valtakunta` | hammastyy | 0.50 |
| `odessa.r2` | H | `lepäsin silti puolivälissä` | huvittuu | 0.50 |
| `odessa.r3` | H | `herrat siirtelivät keppejään` | vakavoituu | 0.50 |
| `odessa.r4` | H | `yhdellä hengenvedolla` | myotailee | 0.35 |
| `odessa.r5` | H | `ei pysäytetty tullissa` | huvittuu | 0.50 |
| `odessa.livia.c1` | L | `vaarantuneen maailmanperinnön luettelossa` | vakavoituu | 0.55 |
| `odessa.livia.c2` | L | `Lensin portaiden yllä` | epailee | 0.40 |
| `odessa.livia.c3` | L | `tavallista enemmän väliä` | vakavoituu | 0.55 |

### Krakova

**Horatio TTS**

> [curious] Krakovan Marian kirkon torvi vaikeni kesken sävelmän. Odotin loppua niin kauan, että torikauppias tarjosi tuolia. Hän oli kuullut saman katkoksen koko ikänsä eikä odottanut enää. [mischievously] Ostin leivän ja jäin silti. [softly] Kun kaupunki jättää jotakin sanomatta, korva ei tahdo lähteä.

**Livia TTS**

> [curious] Odotin räystäällä ikkunan alla. Torvi soi neljään suuntaan, jokainen puhallus eri yleisölle. [brightly] Kirjekyyhky arvostaa täsmällistä jakelua.

| Cue-ID | Puhuja | Ankkuri | Tarkoitus | Voima |
|---|---|---|---|---:|
| `krakova.r1` | H | `vaikeni kesken sävelmän` | hammastyy | 0.50 |
| `krakova.r2` | H | `torikauppias tarjosi tuolia` | huvittuu | 0.50 |
| `krakova.r3` | H | `jäin silti` | huvittuu | 0.45 |
| `krakova.r4` | H | `korva ei tahdo lähteä` | vakavoituu | 0.50 |
| `krakova.livia.c1` | L | `räystäällä ikkunan alla` | hammastyy | 0.35 |
| `krakova.livia.c2` | L | `neljään suuntaan` | myotailee | 0.35 |
| `krakova.livia.c3` | L | `täsmällistä jakelua` | huvittuu | 0.45 |

### Varsova

**Horatio TTS**

> [curious] Kartassani Varsova kuului Venäjälle. Torin leipuri sanoi olevansa puolalainen ja kopautti leipää: tuoretta. Viraston kyltissä kirjaimet olivat venäläisiä, mutta aamiaiseni sain puolaksi. [softly] Karttaan voi vetää rajan yhdellä liikkeellä. Ihmiset eivät siirry kynän mukana.

**Livia TTS**

> [curious] Torin räystäältä huomaa, etteivät jälleenrakennetut talot ole lavasteita: ikkunoissa kuivuu pyykkiä. [warmly] Kaupunki jatkaa elämäänsä julkisivujen takana.

| Cue-ID | Puhuja | Ankkuri | Tarkoitus | Voima |
|---|---|---|---|---:|
| `varsova.r1` | H | `kuului Venäjälle` | vakavoituu | 0.45 |
| `varsova.r2` | H | `olevansa puolalainen` | myotailee | 0.45 |
| `varsova.r4` | H | `aamiaiseni sain puolaksi` | huvittuu | 0.50 |
| `varsova.r5` | H | `eivät siirry kynän mukana` | vakavoituu | 0.60 |
| `varsova.livia.c1` | L | `Torin räystäältä` | hammastyy | 0.35 |
| `varsova.livia.c2` | L | `jälleenrakennetut talot` | vakavoituu | 0.45 |
| `varsova.livia.c3` | L | `jatkaa elämäänsä` | myotailee | 0.45 |

### Moskova

**Horatio TTS**

> [curious] Kremlissä seisoi valtava kello, joka ei ollut soinut kertaakaan. Se halkesi ennen ensimmäistä lyöntiä. Irronnut pala näytti huonettani suuremmalta. Vartija kertoi painon kuin hiljaisuus olisi sillä voitettu. [mischievously] Illalla pieni käsikello kutsui minut syömään: vähemmän mainetta, enemmän vaikutusvaltaa.

**Livia TTS**

> [curious] Tsaarinkellon ympärillä puhelimet nousivat yhtä aikaa. Väistin kamerat ja laskeuduin muurin varjoon — [mischievously] kuuluisuus vie paljon ilmatilaa.

| Cue-ID | Puhuja | Ankkuri | Tarkoitus | Voima |
|---|---|---|---|---:|
| `moskova.r1` | H | `ei ollut soinut kertaakaan` | hammastyy | 0.50 |
| `moskova.r2` | H | `ennen ensimmäistä lyöntiä` | vakavoituu | 0.45 |
| `moskova.r3` | H | `huonettani suuremmalta` | hammastyy | 0.55 |
| `moskova.r4` | H | `hiljaisuus olisi sillä voitettu` | epailee | 0.50 |
| `moskova.r5` | H | `enemmän vaikutusvaltaa` | huvittuu | 0.55 |
| `moskova.livia.c1` | L | `puhelimet nousivat yhtä aikaa` | hammastyy | 0.35 |
| `moskova.livia.c2` | L | `Väistin kamerat` | huvittuu | 0.40 |
| `moskova.livia.c3` | L | `paljon ilmatilaa` | huvittuu | 0.45 |

### Pietari

**Horatio TTS**

> [curious] Pietarin kesäyö oli vaalea kuin loppuun pesty lakana. Kello käski nukkumaan, mutta Neva ei näyttänyt iltaa vanhemmalta. Palatsien ikkunat hohtivat ilman kynttilöitä. Kirjoitin päivän tapahtumat loppuun. [mischievously] Päivä itse ei suostunut lopettamaan, joten lisäsin vielä tämän.

**Livia TTS**

> [curious] Valkoisena yönä Nevan sillat nousivat yksi toisensa jälkeen. Vaihdoin reittiä ennen laivojen tuloa — [mischievously] kirjekyyhky ei luota pelkkään kelloon.

| Cue-ID | Puhuja | Ankkuri | Tarkoitus | Voima |
|---|---|---|---|---:|
| `pietari.r1` | H | `loppuun pesty lakana` | hammastyy | 0.40 |
| `pietari.r2` | H | `iltaa vanhemmalta` | huvittuu | 0.45 |
| `pietari.r3` | H | `ilman kynttilöitä` | myotailee | 0.35 |
| `pietari.r4` | H | `lisäsin vielä tämän` | huvittuu | 0.50 |
| `pietari.livia.c1` | L | `sillat nousivat` | hammastyy | 0.40 |
| `pietari.livia.c2` | L | `Vaihdoin reittiä` | myotailee | 0.35 |
| `pietari.livia.c3` | L | `ei luota pelkkään kelloon` | huvittuu | 0.45 |

## Lähde-SHA:t

| Kaupunki | Pack-polku | Blob-SHA lähtörevisiossa |
|---|---|---|
| Kiova | `js/packs/fokusvirta-kiova.js` | `ed2cb2af5d7448b2bd9b31885efe2ee12f0534b6` |
| Odessa | `js/packs/fokusvirta-odessa.js` | `d2898efcca1dcc18d8436c40a505d0472dcefc8f` |
| Krakova | `js/packs/fokusvirta-krakova.js` | `7b8686a263acee4570bc8ae2b7af975df60b7a0b` |
| Varsova | `js/packs/fokusvirta-varsova.js` | `02b024adbb4791d475c26a5e931c0b437822fa42` |
| Moskova | `js/packs/fokusvirta-moskova.js` | `7fe8157146dc05d69039f889f3817f47d06e4bd9` |
| Pietari | `js/packs/fokusvirta-pietari.js` | `0e9d8865c041434caec342f6744615a5d5190c8a` |

## Viralliset faktalähteet ja tarkistus

| Kaupunki | Väite | Tulos | Virallinen lähde |
|---|---|---|---|
| Kiova | Kyiv-Petšerskin lavran kokonaisuuteen kuuluvat maanpäälliset rakennukset ja yli 600 metriä luolastoja; se sijaitsee Dneprin oikean rannan ylätasangolla ja on vuosisatainen pyhiinvaelluskohde. | OK. Liekin jakaminen on Horation kertomuksen fiktiivinen kohtaaminen, ei dokumentoitu tapahtuma. | [UNESCO World Heritage Centre: Kyiv-Pechersk Lavra](https://whc.unesco.org/en/list/527/) |
| Odessa | Historiallinen keskusta on maailmanperintökohde ja vaarantuneen maailmanperinnön luettelossa; sota on vaurioittanut rakennuksia. Satama, vilja ja monumentaaliset portaat kuuluvat vuoden 1873 kaupunkikuvan perusteltuun kehykseen. | OK. Livia ei väitä yksittäistä vauriota tietyn katon kohdalla, vaan tekee havaintonsa vaurioituneesta kaupunkikuvasta. | [UNESCO World Heritage Centre: Historic Centre of Odesa](https://whc.unesco.org/en/list/1703/), [UNESCO nomination file: viljakauppa ja satama](https://whc.unesco.org/document/196047) ja [UNESCO/ICOMOS monitoring mission 2025](https://whc.unesco.org/document/221623) |
| Krakova | Marian kirkon hejnał soi nykyisin joka tunti, vuorokauden ympäri ja neljään ilmansuuntaan; sävel katkeaa. | OK. Tatarinuoleen liittyvää legendaa ei esitetä historiallisena faktana. | [Krakovan kaupungin virallinen sivu: Hejnał](https://www.krakow.pl/72182,artykul,hejnal.html) ja [Krakovan kaupungin virallinen artikkeli 2026](https://krakow.pl/aktualnosci/326325,29,komunikat,z_trabka_na_wiezy__czyli_o_krakowskim_hejnale.html) |
| Varsova | Varsova oli vuonna 1873 Venäjän vallan alaisessa Puolan kuningaskunnassa; myöhempi vanhakaupunki rakennettiin lähes täydellisen tuhon jälkeen uudelleen ja toimii asuttuna kaupunginosana. | OK. Leipuri ja ikkunassa kuivuva pyykki ovat kerronnallisia kaupunkihavaintoja. | [Varsovan valtionarkiston kaupunkikronikka](https://www.warszawa.ap.gov.pl/container/publikacje/kronika/KW-1-2015.pdf), [UNESCO World Heritage Centre: Historic Centre of Warsaw](https://whc.unesco.org/en/list/30/) ja [Museum of Warsaw: Warsaw Reconstruction Route](https://muzeumwarszawy.pl/en/exhibitions/sciezkaodbudowy/) |
| Moskova | Tsaarinkello valettiin 1735, vaurioitui vuoden 1737 palossa, siitä irtosi 11,5 tonnin pala eikä kello ole koskaan soinut; se nostettiin jalustalle 1836. | OK. Nykykävijöiden puhelimet ja Livian laskeutuminen ovat kerronnallinen nykyhetki, eivät pysyvää käyttötilannetta koskeva faktaväite. | [Moscow Kremlin Museums: Tsar Bell](https://www.kreml.ru/en-Us/visit-to-kremlin/what-to-see/tsar-kolokol/) ja [Moscow Kremlin Museums: facts](https://kreml.ru/ru/education/educators/facts/pamiatniki-kremlia-1) |
| Pietari | Pietarin valkoiset yöt ovat edelleen tunnistettu kesäilmiö, ja Nevan sillat avataan kesäkaudella aikataulun mukaan. | OK. “Yksi toisensa jälkeen” on reittiä kuvaava kerronnallinen tiivistys; yksittäisten siltojen avaamisjärjestystä tai kellonaikaa ei väitetä. | [Visit Petersburg: White Nights Marathon 2026](https://www.visit-petersburg.ru/en/event/xxxv-marafon-belye-nochi/), [Visit Petersburg: Singing Bridges 2026](https://visit-petersburg.ru/en/event/zvukovoe-shou-poyushchie-mosty-2026/) ja [Mostotrest: vuoden 2026 siltojen avausaikataulu](https://mostotrest-spb.ru/news/utverzhden-grafik-razvodki-mostov-na-2026-god-1670) |

## Kuva-inventaario

| Kaupunki | Horatio I1 | Horatio I2 / P2 | Pulu-cam | Päätös |
|---|---|---|---:|---|
| Kiova | `kiova-r20260909-story-v1.jpg` | `kiova-r20260911-paper2-v1.jpg` | 1 kuva | säilytä kaikki |
| Odessa | `odessa-r20260909-paper-v4.jpg` | `odessa-r20260911-paper2-v1.jpg` | 1 kuva | säilytä kaikki |
| Krakova | `krakova-r20260909-paper-v4.jpg` | `krakova-r20260911-paper2-v1.jpg` | 1 kuva | säilytä kaikki |
| Varsova | `varsova-r20260909-paper-v4.jpg` | `varsova-r20260911-paper2-v1.jpg` | 2 kuvaa | säilytä kaikki |
| Moskova | `moskova-r20260909-paper-v4.jpg` | `moskova-r20260911-paper2-v1.jpg` | 1 kuva | säilytä kaikki |
| Pietari | `pietari-r20260909-paper-v4.jpg` | `pietari-r20260911-paper2-v1.jpg` | 1 kuva | säilytä kaikki |

Kaikilla kuudella kaupungilla on I1 ja I2/P2. Tämä revisio ei muuta kuvien URL:eja, kuvatekstejä, lähteitä eikä hyväksyntätilaa.

## Mekaaninen QA

- Kuusi H/L-paria alittaa julkaistun lähtöparin sekä merkki- että sanarajan.
- TTS-tagien poisto palauttaa näkyvät tekstit täsmälleen.
- Jokainen cue-ankkuri esiintyy täsmälleen kerran oman puhujansa näkyvässä tekstissä.
- Cue-ID:t ovat muotoa `city.rN` ja `city.livia.cN`; tarkoitukset ovat nykyisen pack-skeeman ASCII-avaimia.
- Horation historiallinen ydinoivallus säilyy jokaisessa kaupungissa, mutta teksti on lähtöä tiiviimpi.
- Livia pysyy nykykaupungissa, toimii kokeneena kirjekyyhkynä ja noudattaa uskottavaa lintufysiikkaa sekä tilarajaa.
- Packeja, testejä, audioita ja kuvia ei ole muutettu.
