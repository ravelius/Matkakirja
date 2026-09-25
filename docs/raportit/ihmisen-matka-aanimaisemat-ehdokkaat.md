# Ihmisen matka — äänimaisemien ehdokaslista (omistajan hyväksyttäväksi)

Opus, 7.9.2026 ilta. Raamattu: **LINSSIEN AIDOT AANIMAISEMAT**
(omistajan tilaus sanatarkasti: *"olisi todella makeaa, jos saataisiin
myös joitain ääniefektejä, siis aitoja, jossain nauhoitettuja, missä
voisi olla eri paikkojen äänimaisemaa… jos saadaan joitain pieniä
eroja, niin se tekisi todella ison säväytyksen."*).

Tämä on **kuiva ehdokaslista**: hakusanat, rajaukset ja kytkentä ovat
valmiit, mutta yhtään Freesound-osumaa ei ole vielä haettu. Syy on
kirjattu alla kohdassa *Miksi id-numeroita ei ole*.

---

## 1. Miksi id-numeroita ei ole

Freesoundin haku vaatii API-avaimen, ja avain asuu repon salaisuuksissa.
GitHub ei näytä salaisuuden arvoa sen tallentamisen jälkeen kenellekään —
ei käyttöliittymässä eikä rajapinnassa — ja omistajan sääntö on, ettei
avaimia liitetä keskusteluun, koska ne päätyisivät lokeihin. Avain on
luettavissa vain työnkulun ajon sisällä.

Tarkistin sen: kontissa ei ole avainta yhdelläkään viidestä nimestä,
joita työkalu etsii, joten haku ei voi tuottaa id-numeroita täällä.
Valinta tehdään ajossa mitattavista luvuista (arvosana, lataukset,
kesto — `tools/tehostelista.mjs` `pisteytaOsuma`), ja **osumat
kuunnellaan ajon jälkeen**. Manifesti kertoo jokaisesta äänestä
tekijän, lisenssin, Freesoundin id:n ja sivun.

Taulukon oikeanpuoleiset sarakkeet (id, nimi, tekijä, lisenssi, kesto,
URL) täyttyvät ajon lokista ja manifestista. Omistaja hyväksyy tämän
listan **hakusanoineen**; huonon osuman vaihtaa yhden tunnuksen ajolla.

---

## 2. Yhteiset rajaukset (kaikki tunnukset)

| asia | arvo | perustelu |
|---|---|---|
| lisenssit | **CC0 ensisijaisesti**, CC BY hyväksytään attribuutiolla | rajaus palvelimen puolella (`license:("Creative Commons 0" OR "Attribution")`); CC BY-NC ja Sampling+ eivät kelpaa peliin |
| kesto | **30–120 s** | silmukka kestää minuutteja; alle 30 s alkaa kuulua kierroksena, yli 120 s on turha lataus puhelimeen |
| pois | `-tag:music -tag:song -tag:speech -tag:voice` | omistaja tilasi nauhoitettuja paikkoja: "ocean waves ambience" palauttaa myös meditaatiomusiikkia ja podcast-pätkiä |
| taso | **−30 LUFS** | kertojan alle; sama luokka kuin muullakin taustalla, ja soittimen oma kerroin (`MAISEMAN_VOIMA` 0,10) säädetään kuulokokeella |
| formaatti | mp3, mono, 128 kbps, 44,1 kHz | esikatselu-mp3 Freesoundista, normalisoitu ffmpegillä |
| hiljaisuuden leikkaus | **ei** | tuulen hiljaisin kohta on osa tuulta; `silenceremove` söisi juuri sen |
| häivytykset päissä | 0,25 s | jäävät soittimen 2,5 s ristihäivytyksen sisään kuulumattomiin |

Lista koneellisessa muodossa: `tools/tehosteet/ihmisen-matka-maisemat.json`.

---

## 3. Ehdokkaat tyypeittäin

Sarakkeet **id / nimi / tekijä / lisenssi / kesto / URL** täytetään ajon
jälkeen manifestista (`aanet/tehosteet/ihmisen-matka/manifesti.json`).

### savanni — jaksot `afrikka`, `jebel-irhoud`, `siirtyma-afrikka`
Heinäsirkat, kaukainen tuuli, linnut.
- `savanna grassland crickets wind`
- `african savanna ambience insects`
- `dry grassland birds distant wind`

| id | nimi | tekijä | lisenssi | kesto | URL |
|---|---|---|---|---|---|
| _(ajo täyttää)_ | | | | | |

### jokilaakso — jakso `omo`
Etiopian jokilaakso: virtaava vesi ja linnut.
- `river valley ambience birds`
- `small river flowing water birds`
- `riverbank ambience morning`

| id | nimi | tekijä | lisenssi | kesto | URL |
|---|---|---|---|---|---|
| _(ajo täyttää)_ | | | | | |

### meren-ranta — jaksot `ranta`, `blombos`
Aallot ja lokit; simpukkarannikko.
- `ocean waves shore seagulls`
- `sea shore waves gulls ambience`
- `calm beach waves ambience`

| id | nimi | tekijä | lisenssi | kesto | URL |
|---|---|---|---|---|---|
| _(ajo täyttää)_ | | | | | |

### vuoristotuuli — jakso `levantti`
Karmelvuori: tuuli kalliolla.
- `mountain wind ambience`
- `wind on rocky hillside`
- `highland wind gusts ambience`

| id | nimi | tekijä | lisenssi | kesto | URL |
|---|---|---|---|---|---|
| _(ajo täyttää)_ | | | | | |

### ruohikko-jarvi — jakso `arabia`
Vihertynyt Arabia: kevyt tuuli ruohikossa ja järven liplatus.
- `lake shore wind reeds`
- `gentle wind grass lake ambience`
- `calm lake water lapping birds`

| id | nimi | tekijä | lisenssi | kesto | URL |
|---|---|---|---|---|---|
| _(ajo täyttää)_ | | | | | |

### sademetsa — jakso `intian-rannat`
Sumatra: sirkutus, hyönteiset, sade.
- `rainforest ambience insects birds`
- `jungle rain ambience`
- `tropical forest crickets rain`

| id | nimi | tekijä | lisenssi | kesto | URL |
|---|---|---|---|---|---|
| _(ajo täyttää)_ | | | | | |

### rannikkomeri — jakso `australia`
Meri ja rannikko tuulessa: ensimmäinen merimatka tuntemattomaan.
- `coast waves rocky shore wind`
- `ocean surf coastline ambience`
- `sea breeze coast waves`

| id | nimi | tekijä | lisenssi | kesto | URL |
|---|---|---|---|---|---|
| _(ajo täyttää)_ | | | | | |

### luola — jaksot `denisova`, `chauvet`
Tippuva vesi ja kaiku. **Yksi tunnus kahdelle jaksolle** (ks. kohta 6).
- `cave ambience water drips echo`
- `cave drips reverb ambience`
- `underground cavern drip echo`

| id | nimi | tekijä | lisenssi | kesto | URL |
|---|---|---|---|---|---|
| _(ajo täyttää)_ | | | | | |

### arktinen-tuuli — jakso `napapiiri`
Jana napapiirin takana: yhdeksän kuukauden talvi.
- `arctic wind ambience`
- `cold wind snow blizzard distant`
- `icy wind howling ambience`

| id | nimi | tekijä | lisenssi | kesto | URL |
|---|---|---|---|---|---|
| _(ajo täyttää)_ | | | | | |

### tundratuuli — jaksot `beringia`, `white-sands`
Aava ruohomaa ja tundra.
- `tundra wind grass ambience`
- `steppe wind ambience`
- `open plain wind ambience`

| id | nimi | tekijä | lisenssi | kesto | URL |
|---|---|---|---|---|---|
| _(ajo täyttää)_ | | | | | |

### metsasade — jakso `chile`
Monte Verde: sade metsässä, tippuvat lehdet.
- `rain in forest ambience`
- `rain on leaves forest`
- `forest rain dripping ambience`

| id | nimi | tekijä | lisenssi | kesto | URL |
|---|---|---|---|---|---|
| _(ajo täyttää)_ | | | | | |

### kylma-tuuli — jaksot `aikahyppy`, `eurooppa`
Kylmä manner, paljaat puut.
- `cold winter wind ambience`
- `bleak wind ambience`
- `wind through bare trees`

| id | nimi | tekijä | lisenssi | kesto | URL |
|---|---|---|---|---|---|
| _(ajo täyttää)_ | | | | | |

### avomeri — jakso `meri`
Avomeri ja purjeet: kanootit Tyynellämerellä.
- `open ocean waves boat`
- `sailing boat sea ambience`
- `boat deck wind sails`

| id | nimi | tekijä | lisenssi | kesto | URL |
|---|---|---|---|---|---|
| _(ajo täyttää)_ | | | | | |

### rantalinnut — jakso `uusi-seelanti`
Ranta ja linnut: viimeinen suuri maa.
- `beach birds waves ambience`
- `shore birds ambience`
- `coastal birds waves morning`

| id | nimi | tekijä | lisenssi | kesto | URL |
|---|---|---|---|---|---|
| _(ajo täyttää)_ | | | | | |

### hiljainen-tuuli — jakso `loppu`
Loppusanat: kartta jää pelaajalle.
- `quiet gentle wind ambience`
- `soft breeze ambience`
- `calm wind field ambience`

| id | nimi | tekijä | lisenssi | kesto | URL |
|---|---|---|---|---|---|
| _(ajo täyttää)_ | | | | | |

### avaus — EI ÄÄNTÄ
Jakso `avaus` on musta ruutu ja pelkkä kertojan ääni (Raamattu: IHMISEN
MATKA ALKAA MUSTASTA RUUDUSTA). `maisema: null` — hiljaisuus on tässä
valinta eikä puute; maisema syttyy vasta valojen kanssa.

---

## 4. Ajokomento

Ajo tehdään työnkulusta, koska avain on repon salaisuuksissa:

**Actions → Äänihaku (Freesound) → Run workflow**

| syöte | arvo |
|---|---|
| `tila` | `ihmisen-matka-maisemat` |
| `tunnus` | tyhjä = koko lista; yksi tunnus (esim. `savanni`) = vain sen korjausajo |
| `kuiva` | `true` ensimmäisellä kerralla, jos haluat nähdä valinnat lataamatta mitään |

Sama komentoriviltä (vaatii `FREESOUND_API`-ympäristömuuttujan ja
R2-salaisuudet — **ei koskaan komentorivillä, ne päätyvät lokeihin**):

```
node tools/hae-freesound.mjs --maisemat --kuiva
node tools/hae-freesound.mjs --maisemat
node tools/hae-freesound.mjs --maisemat --tunnus savanni
```

Ajo vie tiedostot ämpärin kansioon `aanet/tehosteet/ihmisen-matka/` ja
kirjoittaa niiden viereen `manifesti.json`:in. **Repoon ei jää mitään** —
työkalu kirjoittaa `media/tehosteet-ihmisen-matka/`-kansioon, joka on
.gitignoressa, ja työnkulun viimeinen askel kaatuu, jos työhakemistoon
jäi tiedostoja.

---

## 5. Kytkentä peliin (valmis)

| pala | tiedosto |
|---|---|
| jakson maisematyyppi | `js/linssit/ihmisen-matka-kertomus.js`, kenttä `maisema` |
| hakulista ja rajaukset | `tools/tehosteet/ihmisen-matka-maisemat.json` |
| haku ja vienti | `tools/hae-freesound.mjs --maisemat`, `.github/workflows/aanihaku.yml` |
| soitin | `js/linssit/ihmisen-matka-aanimaisema.js` |
| vartija | `tests/ihmisen-matka-aanimaisemat.test.mjs` |

**Esitysmoottorille tarjottu rajapinta** (kaksi funktiota, ei enempää):

```js
import { asetaAanimaisema, lopetaAanimaisema }
  from './ihmisen-matka-aanimaisema.js';
```

- `asetaAanimaisema(jakso.maisema)` — **kutsutaan jokaisen jakson
  alussa**, samassa kohdassa kuin jakson luenta käynnistetään
  (`js/linssit/ihmisen-matka.js`, jaksojen kulku). Sama tyyppi peräkkäin
  ei tee mitään, joten kolme savannijaksoa on yksi katkeamaton savanni;
  `null` (avausjakso) häivyttää maiseman pois.
- `lopetaAanimaisema()` — **kutsutaan kun linssi suljetaan** tai esitys
  keskeytetään, samassa kohdassa kuin `lopetaSiirtymamusiikki()` ja
  `palautaAmbienssi('linssi')`.

**Kutsuja EI ole vielä lisätty** `js/linssit/ihmisen-matka.js`:ään:
jaksojen kulku on esitysagentin työn alla samaan aikaan, eikä
haarassa ole vielä moottoria, johon kutsut kuuluisivat. Soitin on
turvallinen kutsua heti kun moottori on paikallaan — puuttuva
manifesti ja puuttuva tiedosto ovat hiljaisuutta eivätkä virhe.

Soitin kunnioittaa itsestään: äänivalikon mykistyksen
(`matkakirja-aanivalinta`), kertojan ja pöllön väistön sekä
lukunäkymien hiljennykset (`lisaaVaistaja`), taustalle menneen pelin
(`lisaaTaustaVaimennus`) ja kehittäjän `tausta`-kertoimen. Linssin oman
`linssi`-hiljennyksen se ohittaa — muuten maisema väistyisi omaa
hiljennystään ja jäisi puoleen tasoon koko esityksen ajaksi.

---

## 6. Päätökset, jotka tein ilman välikysymyksiä

1. **15 maisematyyppiä 22 jaksolle.** Tilauksessa nimetyt paikat menivät
   yksi yhteen paitsi kolmessa kohdassa, joissa peräkkäiset jaksot ovat
   samaa paikkaa: savanni kattaa Afrikan kolme ensimmäistä jaksoa,
   meren-ranta Pinnacle Pointin ja Blomboksen, tundratuuli Beringian ja
   White Sandsin, kylma-tuuli aikahypyn ja Bacho Kiron. Se on
   tarkoituksellista: maisema ei saa vaihtua, kun paikka ei vaihdu.
2. **Denisova saa tunnuksen `luola`, ei omaa yhdistelmää.** Tilauksessa
   se on "luola (tippuva vesi, kaiku) + vuoristotuuli". Kahden raidan
   päällekkäissoitto olisi toinen koneisto ja toinen taso säädettäväksi;
   luola on jakson hallitseva ääni (kolme ihmisryhmää samassa luolassa),
   ja vuoristotuuli tulee jo edellisistä jaksoista korvaan. Jos omistaja
   haluaa eron Chauvet'hen, se on yksi rivi lisää listaan
   (`luola-vuoristo`) ja yksi kenttä kertomuksessa.
3. **Hakusanat ovat englanniksi ja kolme per tyyppi.** Freesoundin
   aineisto on merkitty englanniksi; kolme hakua per tunnus tarkoittaa,
   ettei yksi huono muotoilu kaada koko tunnusta.
4. **Taso −30 LUFS tiedostossa, 0,10 soittimessa.** Tiedoston taso on
   vertailukelpoinen lähtökohta (kaikki maisemat yhtä kovaa), soittimen
   kerroin on kuulokokeen nuppi. Omistaja säätää jälkimmäistä.
5. **Silmukan sauma tehdään soittimessa, ei tiedostossa.**
   Kenttä-äänitteestä ei saa saumatonta leikkaamalla; soitin
   ristihäivyttää kierroksen itsensä päälle 2,5 sekunnissa, samalla
   koneistolla kuin jakson vaihdon.

---

## 7. Mitä tapahtuu ajon jälkeen (muistilista)

1. **Kuuntele kaikki 15.** Kone valitsi ne arvosanasta, latauksista ja
   kestosta — se ei kuule lentokoneen jyrinää eikä nauhoittajan yskäisyä.
   Huonon vaihtaa `tunnus`-syötteellä.
2. **Kirjaa CC BY -tekijät lähdeluetteloon.** Manifestin `attribuutio`-
   kentät ja ajon loppuloki listaavat ne; nimet menevät `js/lahteet.js`:n
   Äänet-osaston Freesound-riville (ja sitä kautta README.md:n
   "Lähteet ja aineistot" -lukuun). CC0 ei vaadi nimeämistä.
3. **Säädä `MAISEMAN_VOIMA`** omistajan laitteella kuulokokeella.
