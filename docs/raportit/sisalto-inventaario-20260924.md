# Sisältöinventaario: 71 uuden kaupungin täydentävät kentät — 24.9.2026

**KORJAUS (24.9. klo 10.4x):** ensimmäinen versio unohti N7:n (#3013,
mainissa) viisi kaupunkia inventaarion listasta, vaikka tarkistukset
alla ajettiin niitä VASTEN OIKEIN (city-lista sisälsi ne koko ajan).
Korjattu: lista ja luvut ovat nyt 71/71 oikein, N7 mukana.

Menetelmä: `git diff origin/main...origin/<haara> -- js/packs/*.js`
kaikille avoimille N-erille (N7 tarkistettu suoraan mainista, koska
se on jo mergetty). Tarkistetut lähteet: `js/packs/maakartat.js`
(KAUPUNKIKARTAT), `kulttuuri-kategoriat.js` (`matkailijalle:`,
`galleria:`, `ennenNyt:`, `tehtava:`), `js/packs/fokusvirta-*.js`
(tiedosto per kaupunki), `js/packs/saapumispuheet.js`
(SAAPUMISPUHEET-äänet), `js/packs/saatiedot.js`,
`js/packs/vanhat-aanet.js`, `js/packs/kohtaamiset.js`,
`js/packs/{northamerica,southamerica,africa,asia,europe,oceania}.js`
(ambience-kenttä paikkaluokitukseen kohtaan 3).

## 1. Perusresepti — VALMIS 71/71

Masto, esittely, herokuvat, nostot (kulttuurikategoriat) ja
**minitehtävä (`tehtava:`)** ovat kaikilla 71:llä (pistokoe 3 kaupunkia +
laatukierroksen 77/77-läpikäynti 24.9., ks.
docs/raportit/lehtien-laatukierros-20260924.md). Ei toimenpidettä.

## 2. Puuttuu kaikilta 71:ltä — täydentäviä kenttiä, ei baseline

| Kenttä | Lähde | Peittävyys nyt | Huomio |
|---|---|---|---|
| Sää (`js/packs/saatiedot.js`) | lat/lon + kk-normaalit, `tools/hae-saanormaalit.mjs` | 0/71 | Mekaaninen, työkalu valmis ylimmälle/alimmalle; keskilämpö/sade haetaan Open-Meteon archive-apista erikseen (ei valmista työkalua kantarivien luontiin). |
| Galleria (`galleria: [...]`) | nosto teosgalleriana | 0/71 | Vaatii PD/CC-kuvahaun per kaupunki (lisenssiportti-kaava). |
| Ennen/nyt-pari (`ennenNyt: [...]`) | etusivun pikkurivi | 0/71 | 96/100 vanhasta kaupungista on pari; vaatii PD/CC-vedoksen. |
| Turistiopas (`matkailijalle:`) | kansiosaston kappale | 0/71 | 195 mainintaa `matkailijalle:` vanhassa paketissa, ei yhtäkään näistä 71:stä. |
| Kohdekartta (`KAUPUNKIKARTAT`, maakartat.js) | nähtävyyskartta ison pop-upin 3. lohko | 0/71 | **Vain kaupungeille/taajamille (kohta 3) — luonnonkohteille EI kävelykarttaa (Fable 24.9.).** |
| Fokusvirta (`js/packs/fokusvirta-<id>.js`) | pulman kehystävä juonipolku | 0/71 | Viimeinen erä, Siirtosepän kaavalla (Fable 24.9.). |
| Vanhat äänet (`vanhat-aanet.js`) | "Ennen"-radionappi | 0/71 | Ei omassa järjestyksessä — sama kuvahaku kuin ennenNyt, liitetään siihen eräksi kun sama kuva löytyy. |
| Saapumispuhe-ääni (`SAAPUMISPUHEET`, ElevenLabs) | "Kaupunki. Iskulause." -ottoäänite | 0/71 | **Ei Sisältökirjurin työtä** — äänigenerointi on Codexin/Fablen alue (docs/roolitus.md-taulukko). |
| Kohtaaminen (`kohtaamiset.js`) | hahmokutsu "Etsi kätkö" -napin tilalla | 0/71 | Harvinainen koko pelissä (pilotti Venetsia); ei osa tätä järjestystä. |

## 3. Paikkaluokitus kohdekarttaa varten (Fable 24.9.: vain oikeille kaupungeille/taajamille)

Luokitus `ambience`-kentän JA maantietotuntemuksen perusteella
(ambience kuvaa tunnelmaa, ei asutusta — esim. Kalgoorlie on
`ambience: 'aavikko'` mutta oikea kaupunki). **Ensimmäinen luokitus,
tarkistettava kaupunkilehden lopullista tekstiä kirjoitettaessa.**

### Kaupunki/taajama (30) — saa kohdekartan aikanaan

managua, noumea, puertomontt, sanjuan, saoluis, ouropreto, bermuda
(Hamilton), norfolk (Kingston), churchill, gao, cayenne, broome,
santarem, geraldton, joaopessoa, murzuk, alkufra, campogrande,
exmouth, macapa, birdsville, cooberpedy, kalgoorlie, mountisa, nome,
portovelho, kimberley, sitka, falkland (Stanley), sthelena
(Jamestown).

### Sekamuotoinen (8) — tarkistettava tapauskohtaisesti

angola, bali, hawaii, madagaskar, mosambik (Mosambikin saarella on
historiallinen linnoituskaupunki), robinsoncrusoe (San Juan
Bautista, hyvin pieni), sierraleone, suakin (raunioitunut
satamakaupunki).

### Luonnonkohde (33) — EI kävelykarttaa; nähtävyydet listana + galleria + ennenNyt

ahaggar, appalakit, bahrelghazal, bananal, boavista, caphorn, darfur,
galapagos, grandcanyon, iguazu, kamerun, kappalmas, karthago,
kilimandzaro, kongo, labrador, machupicchu, milfordsound,
mountrushmore, namib, nullarbor, orjarannikko, rashafun, sahara,
sanambrosio, sepik, tanganjika, titicaca, tshadjarvi, uluru,
viktoria, viktorianputoukset, yellowstone.

## 4. Kartuscha (maalehden kartuscha-rivi) — maatasolla, ei kaupunkitasolla

Kartuscha on maan ominaisuus (paikallinen nimi, lippu, valtiomuoto),
ei kaupungin. 7/71 uudesta kaupungista sijaitsee alueilla, jotka on
JO päätetty pitää PYSYVÄSTI ilman kartuscha-riviä (CLAUDE.md,
BMU/PRI/GUF/FLK/NCL/NFK ja GRL/SHN/HKG):

- bermuda → BMU · sanjuan → PRI · cayenne → GUF · falkland → FLK
- noumea → NCL · norfolk → NFK · sthelena → SHN

Näille ei tarvita toimenpidettä. Loput 64 ovat vakiintuneiden
maiden kaupunkeja, joiden kartuscha-rivi on oletettavasti jo
kunnossa aiemman maalehtityön kautta (ei pistokoetta laajemmin —
matalan riskin oletus).

## 5. Järjestys (Fable 24.9.2026, hyväksytty)

Viiden kohteen erät, PR per erä:

1. **Sää kaikille 71:lle** (mekaaninen — kantarivit Open-Meteosta +
   `tools/hae-saanormaalit.mjs` ylimmälle/alimmalle).
2. **Galleria** (PD/CC, lisenssiportin kaava).
3. **Ennen/nyt** (+ vanhat äänet samalla haulla kun kuva löytyy).
4. **Turistiopas** (`matkailijalle:`).
5. **Kohdekartta** — vain kohdan 3 kaupunki/taajama-listalle (30 +
   sekamuotoisten tarkistetut osat), ei luonnonkohteille.
6. **Fokusvirrat** viimeisenä, Siirtosepän kaavalla.

Churchill-nosto (Arktinen merijää) tehdään erikseen, kun #3016 on
mainissa (docs/raportit/viesti-sisaltokirjuri-luovutus-20260924-c.md
kohta 3).

Ei avoimia omistajan päätöksiä — järjestys on Fablen hyväksymä.

## 5.5. Kohdekartta: 12 kaupungin lista ja hylkäysperuste 18:lle (24.9.2026, Fablen hyväksymä)

Pohjajoukko on kohdan 3 kaupunki/taajama-luokka (30 kaupunkia — luonnonkohteet,
33 kpl, eivät koskaan saa kävelykarttaa). Kohdekartta vaatii kaksi asiaa
yhtä aikaa: 1) toimivan katuruudukon Overpassin bbox-haussa (Norfolk-koe:
~1700 asukkaan paikka piirtyi tyhjäksi, yksi tie ja muutama rakennus;
Kalgoorlie, n. 30 000 as., piirtyi hyvin heti), ja 2) vähintään kaksi
aidosti paikannettavaa, osoitteellista kohdetta kaupungissa (luovutus
`viesti-sisaltokirjuri-luovutus-20260924-e.md` kohta 4.1) — muuten
kartta jätetään tekemättä.

**Hyväksytty 10 kaupungin lista** (kaikki mergetyistä N8–N16-kaupungeista,
täyttävät molemmat ehdot): Kalgoorlie, Mount Isa, Broome, Geraldton,
Porto Velho, Santarém, João Pessoa, Macapá, Cayenne, Gao.

**MUUTOS 24.9.2026 (kohdekartta-erä 2):** Kimberley siirretty
hyväksytystä listasta hylättyyn ryhmään 3 — kaupungin kaikki nostot
(Big Hole, De Beers, Cecil Rhodes, timanttiryntäys) käsittelevät samaa
yhtä louhosaluetta, eikä toista aidosti erillistä, osoitteellista
kohdetta löytynyt (esim. Rudd House ei ole OSM:ssä omalla nimellään).

**MUUTOS 24.9.2026 (kohdekartta-erä 3):** Al Kufra siirretty
hyväksytystä listasta hylättyyn ryhmään 3 — OSM:ssä ei ole yhtään
Al Jawfin (oaasin pääkylä) kohdetta, joka liittyisi kaupungin omiin
nostoihin (Senussi-veljeskunta, Rohlfsin retkikunta, Zuwayya-heimo);
löytyneet moskeijat ja kauppa ovat nimettömiä sivujuonen kannalta,
eivät osa kerrottua tarinaa. Rebianan hiekkameri ja Kufran oaasiryhmä
ovat luonnonkohteita, eivät ydinkeskustan kävelykohteita.

Alkuperäinen 12 kaupungin lista oli siis 10 hyväksyttyä + Kimberley +
Al Kufra, jotka osoittautuivat toteutuksessa hylätyiksi — 18 hylätyn
lista kohdassa 2 kasvoi tämän myötä 20:een, mutta poistuma tuli
hyväksytystä puolesta, ei alkuperäisestä 18:sta.

**Hylätty 20 jakautuu kolmeen ryhmään** (tarkistettu `js/packs/*.js`:stä
tässä haarassa 24.9.2026 — ei koskaan olettaen):

1. **Ei vielä mergetty (6)** — sisältö on auki olevissa N2/N4/N5/N6-erien
   PR:issä (#2996, #3002, #3004, #3006), ei tässä haarassa eikä mainissa
   arvioitavaksi: Managua, Nouméa, Puerto Montt, San Juan, São Luís (N2),
   Ouro Preto (N6). Arvioidaan uudelleen, kun PR mergetään (kohta 4.2).
2. **Liian pieni asutus, katuruudukko piirtyisi todennäköisesti tyhjäksi
   Norfolk-kokeen mukaan (10)**: Norfolk/Kingston (n. 800 as.), Churchill
   (n. 900 as.), Birdsville (n. 140 as.), Coober Pedy (n. 1 700 as.),
   Exmouth (n. 2 500 as.), Nome (n. 3 600 as.), Sitka (n. 8 500 as.,
   raja-alueella), Stanley/Falkland (n. 2 500 as.), Jamestown/St Helena
   (n. 800 as.), Hamilton/Bermuda (itse kaupunkikeskus n. 1 000 as.,
   vaikka territorio on suurempi).
3. **Riittävä väestö, mutta ei kahta paikannettavaa kohdetta (4)** —
   nostot ovat aluetason tunnelmaa/teemaa tai saman yhden kohteen
   toistoa, eivät kahta erillistä osoitteellista nähtävyyttä: Campo
   Grande (nostot: ara-papukaijat kaupungin puistojen yllä, "portti
   Pantanaliin" — ei yksittäistä patsasta tai rakennusta; ks. myös
   kohdan 6 faktavirhehavainto samasta kaupungista), Murzuk (nostot:
   Tadrart Acacusin kalliomaalaukset ovat kaukana keitaan ulkopuolella
   eivätkä kävelymatkan päässä, taatelipalmu ja karavaanikieli ovat
   teemallisia tekstejä ilman paikkaa), Kimberley (kaikki kuusi nostoa
   — löytö, nimeäminen, Big Hole, Rhodesin De Beers, lajittelupöydät —
   kertovat samasta yhdestä louhosalueesta; toista erillistä,
   OSM:ssä nimettyä kohdetta ei löytynyt), Al Kufra (nostot koskevat
   koko oaasiryhmää, Senussi-liikettä tai Rebianan hiekkamerta —
   yksikään ei osoita tiettyä rakennusta Al Jawfin kylässä).

Lista ei ole pysyvä poissulkeva sääntö: jos jokin näistä saa myöhemmin
uuden, paikannettavan noston tai kaupunki mergetään, kohdekartta
harkitaan uudelleen samalla kaavalla.

## 6. Galleria-vaihe — tulokset (24.9.2026, Fablen hyväksymä linja: vain aito löytö)

Menetelmä: `node tools/hae-commons.mjs haku "<kaupunki/aihe> painting"`
per kaupunki, lisenssitarkistus `tiedot`-komennolla, vain PD/CC-kuvat
jotka AIDOSTI kuvaavat kyseistä paikkaa (ei samannimistä muuta
kohdetta — ks. Campo Granden hylkäys alla). Käyty läpi kaikki 46
mergettyä N8–N16-kaupunkia; N2/N4/N5/N6:n 20 kaupunkia (yhä auki
PR:issä #2996/#3002/#3004/#3006) odottavat vuoroaan.

### Sai gallerian (3/46)

| Kaupunki | PR | Kuvat |
|---|---|---|
| Kap Horn | #3066 | 3 laivamaalausta (Drew 1884, Agate 1838, Cammillieri n. 1825) |
| Norfolk | #3066 | 2 maalausta (Seller 1839, Wilson 1850-l.) |
| Karthago | #3068 | 3 teosta ("Marius raunioilla" -aihe, Vanderlyn/Bergeret 1807 + Gülin 1778) |

### Ei gallerialle aitoa löytöä (43/46)

angola, namib, robinsoncrusoe, appalakit, churchill, sierraleone,
tanganjika, boavista, kappalmas (Kap Palmas — EI Hyväntoivonniemi),
kimberley, labrador, sthelena (vain yksi Napoleonin ajan East
Indiaman-kauppalaivan maalaus, ei liity Napoleoniin, jäi liian
ohueksi galleriaksi), ahaggar, gao, kamerun, suakin, viktoria,
cayenne, darfur, mosambik, rashafun, tshadjarvi, bahrelghazal,
broome, orjarannikko, santarem, sepik, bananal, geraldton,
joaopessoa, murzuk, nullarbor, alkufra, campogrande (löytyi Pedro
Américon "Batalha de Campo Grande" 1871 -maalaus, mutta se kuvaa
SAMANNIMISTÄ taistelua Paraguayssa 1869 — ei liity Brasilian
kaupunkiin, hylätty faktantarkistuksessa), exmouth, macapa,
sanambrosio, birdsville, cooberpedy, kalgoorlie, mountisa, nome,
portovelho.

**Yield ~6,5 % (3/46).** Onnistuneet tapaukset jakavat yhteisen
piirteen: paikalla on tunnettu länsimainen taideperinne (merenkulun
kuvasto, klassismin Marius-aihe, siirtomaa-ajan vankisiirtola-
kuvitus). Valtaosalla 71:stä — erityisesti syrjäisillä
luontokohteilla ja pienillä siirtomaa-ajan jälkeisillä kaupungeilla —
tätä ei ole. Suositus: ei kannata olettaa tasaista saantia jatkoerissä
(N2/N4/N5/N6); järjestyksen seuraavat vaiheet (ennenNyt, turistiopas,
kohdekartta) ovat todennäköisesti tuottavampia.

## 7. EnnenNyt-vaihe — tulokset (24.9.2026, PR #3069)

Yield 35/46 (76 %) — huomattavasti parempi kuin galleria, ja
mekaaninen: `js/packs/*-valokuvat.js`:n (matkakirjan valokuvataulut)
top-level `tiedosto`+`vuosi`+`lahde`+`selite` ja `uusi`-alaolio ovat
TISMALLEEN `ennenNyt`-kentän muotoa (tiedoston oma kommentti rivillä
21-38 vahvistaa: "kopioidaan valokuvatauluista sellaisinaan"). Ei
tarvinnut hakea Commonsista uutta — vain kopioida ja lyhentää
kuvatekstit yhden virkkeen mittaisiksi.

34/46 sai parin suoraan valokuvataulusta (Karthago 1912, Mosambikin
saari 1655, Kalgoorlie 1901, Suakin 1871, jne.). Norfolk lisättiin
käsin galleria-erän (#3066) omasta Thomas Seller -vesiväristä (1839).

11/46 ei saanut paria:
- **Ei vanhaa kuvaa valokuvataulussa (6):** caphorn, boavista,
  santarem, exmouth (kaupunki perustettu vasta 1960-luvulla — ei voi
  ollakaan pre-1960 kuvaa), sanambrosio (asumaton saari).
- **Ei valokuvataulumerkintää lainkaan (6):** churchill, bananal,
  geraldton, nullarbor, campogrande, nome.

**Suositus:** N2/N4/N5/N6:n 20 kaupunkia kannattaa tarkistaa samalla
menetelmällä (valokuvataulu ensin, Commons-haku vasta jos ei löydy)
heti kun ne mergetään — todennäköinen yield samaa luokkaa.

## 8. N2/N4/N5/N6-erien mergetilanne (tarkistettu 24.9.2026, Fablen pyynnöstä)

`git fetch origin` + `gh pr view #2996/#3002/#3004/#3006` — kaikki
neljä ovat yhä AUKI, ei yhtään mergetty. 20 kaupungin sää/galleria/
ennenNyt-käsittely (kohdat 5.1–5.3:n kaava) odottaa siis edelleen:

- N2 (#2996): Managua, São Luís, San Juan, Nouméa, Puerto Montt.
- N4 (#3002): Sahara, Kongo, Madagaskar, Galápagos, Machu Picchu.
- N5 (#3004): Yellowstone, Grand Canyon, Uluru, Iguazú, Titicaca.
- N6 (#3006): Mount Rushmore, Havaiji, Bali, Milford Sound, Ouro Preto.

Ei toimenpidettä ennen mergeä — sama tilanne kuin edellisessä
luovutuksessa, nyt vain varmistettu tuoreella haulla.

## 9. Turistiopas: kelvolliset kaupungit (24.9.2026, Fablen pyynnöstä — EI VIELÄ SISÄLTÖÄ)

Käyty läpi kaikki kohdan 3 71 kaupunkia (N2/N4/N5/N6:n 20 sisältyvät jo
tähän 71:een — ks. kohta 8 lista, kaikki nimet löytyvät kohdan 3
luokituksesta). Kriteerit (Fable 24.9.): 1) oikea, käytännössä
vierailtava paikka (ei asumaton saari), 2) turvallinen — ei käynnissä
olevaa asevoimaista konfliktia, 3) todennäköisesti riittävästi PD/CC-
matkailuaineistoa. Arvio on tämän session yleistiedon varassa (ei
reaaliaikaista uutishakua) — merkityt kohdat kannattaa tarkistaa vielä
kertaalleen ennen sisällön tilaamista.

### Hylätty — käynnissä oleva konflikti tai vakava turvallisuusriski (9)

- **darfur** (Sudan) — sisällissota, El Fasher piiritetty (jo Fablen
  oma esimerkki 4.3:sta).
- **suakin** (Sudan) — sama sisällissota koko maassa; lisäksi paikka on
  jo raunioitunut satamakaupunki, ei toimivaa infraa oppaalle.
- **gao** (Mali) — islamistinen kapina jatkunut 2012 lähtien, alue
  aktiivisen konfliktin piirissä (huom: kohdekartta tehtiin, mutta
  vain 1400–1500-luvun historiasta — turistiopas neuvoisi
  nykyvierailua, eri riski).
- **murzuk**, **alkufra** (Libya) — Libya epävakaa 2011 lähtien,
  Fezzanin alue lisäksi turvattomampi (samat kaupungit hylätty jo
  kohdekartasta puuttuvan toisen kohteen takia, kohta 5.5).
- **bahrelghazal** (Etelä-Sudan) — käynnissä oleva
  levottomuus/konflikti.
- **rashafun** (Ras Hafun, Somalia/Puntland) — al-Shabaabin alue,
  korkea turvallisuusriski koko maassa.
- **tshadjarvi** (Tšadjärvi) — Boko Haramin toiminta-alue Nigerian,
  Tšadin, Nigerin ja Kamerunin rajaseudulla vuodesta ~2009.
- **kamerun** (Kamerunvuori/Buea) — vuori sijaitsee Kaakkois-Kamerunin
  englanninkielisellä alueella, jota Ambazonia-konflikti koskettaa
  vuodesta 2016.

### Hylätty — ei todellinen vierailtava kohde (1)

- **sanambrosio** — asumaton saari (Fablen oma esimerkki 4.3:sta).

### Epävarma — tarkistettava, mitä paikkaa/maata teksti tarkalleen kuvaa (4)

- **kongo** — nosto kuvaa koko Kongojokea (4700 km); jos kohde
  rajataan jokisuulle/Kinshasa–Brazzavillelle, riski on maltillinen,
  mutta koko DR Kongo on matkailuvaroituksissa korkeampi riski kuin
  monet muut kohteet listalla.
- **sahara** — riippuu, minkä maan kautta aavikkoa lähestytään
  (Marokko/Tunisia turvallisia, Libya/Mali/Algerian eteläosat eivät).
- **tanganjika** (Tanganjikajärvi) — Tansanian ja Sambian rannat
  turvallisia, DR Kongon ja Burundin rannat eivät.
- **ahaggar** (Algeria) — Saharan syvä eteläosa lähellä Sahelin
  levottomuusvyöhykettä; matalampi luottamus kuin Pohjois-Algerian
  matkailukohteisiin.

### Sopii konseptiin, todennäköisesti riittävästi aineistoa (56)

Loput kohdan 3 kaupungeista/kohteista — mukaan lukien kaikki 20
N2/N4/N5/N6-kaupunkia paitsi Sahara ja Kongo (ks. yllä): managua,
noumea, puertomontt, sanjuan, saoluis, ouropreto, bermuda, norfolk,
churchill, cayenne, broome, santarem, geraldton, joaopessoa,
campogrande, exmouth, birdsville, cooberpedy, kalgoorlie, mountisa,
nome, portovelho, kimberley, sitka, falkland, sthelena, angola, bali,
hawaii, madagaskar, mosambik, robinsoncrusoe, sierraleone, appalakit,
bananal, boavista, caphorn, galapagos, grandcanyon, iguazu, kappalmas,
karthago, kilimandzaro, labrador, machupicchu, milfordsound,
mountrushmore, namib, nullarbor, orjarannikko, sepik, titicaca, uluru,
viktoria, viktorianputoukset, yellowstone.

(Laskuhuomio: kohdan 3 "kaupunki/taajama (30)" -otsikko listaa
todellisuudessa 29 nimeä — yksi puuttuu jo alkuperäisestä listasta.
Kokonaismäärä tässä (9 hylätty + 1 hylätty + 4 epävarma + 56 sopii =
70) heijastaa siis kohdan 3 todellista nimimäärää, ei otsikoiden
summaa. Ei korjattu tässä, koska ei kuulu tämän tehtävän piiriin.)

Kolme kevyt huomautus mukaan otetuista: **noumea** (Uuden-Kaledonian
levottomuudet 2024 ovat laantuneet, ei enää aktiivinen konflikti),
**sierraleone** (sisällissota päättyi 2002, nyt vakaa ja yhä
enemmän matkailtu), **mosambik** (saari itse Nampulan maakunnassa
etelämpänä kuin Cabo Delgadon islamistikapina pohjoisessa — turvallisempi
kuin maa yleisesti).

Ei toimenpidettä vielä — tämä on vain luokittelu, ei sisältötilaus.
