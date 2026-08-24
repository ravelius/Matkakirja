# Herokuvien silmätarkistus, erä 2

Tarkistusvaihe (ei generointia): jokainen tilauksessa nimetyn kaupungin
generoitu herokuva ladattiin peiliämpäristä ja **katsottiin silmin**, ja
sen rinnalle haettiin Wikimedia Commonsista **aitoja valokuvia siitä
kohteesta, jonka kuvateksti nimeää**. Vertailu tehtiin rinnakkain
samaan kuvaan liimattuna (hero vasemmalla, aidot valokuvat oikealla),
jotta muoto, kerrosluku, kupolit, minareetit, materiaali, värit ja
ympäristö on voitu verrata suoraan eikä muistin varassa.

Tausta: `hero-kashgar-keskipaiva.png` esitti Samarkandin tyylistä
timuridimausoleumia, vaikka kuvateksti lupasi Yusuf Balasagunin
mausoleumia Kašgarissa. Malli ei tuntenut kohdetta ja täytti aukon
alueen arkkityypillä. Tämä tarkistus etsii samaa vikaa muualta —
uusiksi generoidaan vain pahimmat, koska generointi maksaa.

## Menetelmä

1. **Poiminta**: `js/packs/kulttuuri-kategoriat.js`, kaikki
   `ampari: 'herokoe/hero-<kaupunki>-*.png'` -kentät ja niiden `selite`.
2. **Herokuva**: ladattu osoitteesta
   `https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/julisteet/<ampari>`,
   pienennetty katselua varten, katsottu ja poistettu heti levyltä.
3. **Viitekuvat**: `tools/hae-viitekuvat.mjs` (kohteen oma Commons-kategoria
   Wikidatan P373:n / commonswiki-sitelinkin kautta, lisenssisuodatin
   PD/CC0/CC BY/CC BY-SA) sekä tarvittaessa suora Commons-tiedostohaku,
   kun kohteen kategoriasta ei löytynyt sopivaa kuvakulmaa (esim.
   Karnakin ilmakuvat). Kaikki viitteet ovat aitoja valokuvia, eivät
   piirroksia — poikkeuksena Karnakin kaksi vuoden 1929 ilmakuvaa,
   jotka ovat valokuvia mutta vanhoja, ja ne kelpaavat tässä koska
   niistä luetaan pelkkä pohjakaava.
4. **Tuomio**: VÄÄRÄ (eri rakennus tai selvästi väärä arkkitehtuuri) /
   EPÄILYTTÄVÄ (tunnistettava mutta jotain pielessä) / OK.
   EI VOIDA ARVIOIDA, jos aitoja vertailukuvia ei löytynyt — tätä ei
   tarvittu kertaakaan, jokaisesta kohteesta löytyi vähintään kaksi.

## Yhteenveto

- Tarkistettuja herokuvia: **21** (7 kaupunkia × 3 vuorokaudenaikaa).
- **VÄÄRÄ: 2** · **EPÄILYTTÄVÄ: 2** · **OK: 17** · EI VOIDA ARVIOIDA: 0.
- Katsottuja aitoja vertailuvalokuvia yhteensä: **57**.

**Tilauksessa oli 13 kaupunkia, mutta kuudella niistä ei ole yhtään
generoitua herokuvaa.** `grep`-haku koko `js/`- ja `tools/`-puusta
osoittaa, ettei `herokoe/hero-sana-*`, `-aden-*`, `-salalah-*`,
`-medina-*`, `-nikosia-*` eikä `-izmir-*` -tiedostoja ole olemassa
missään lähteessä (`hero-*`-nimiä on 84 kaupungille, eivätkä nämä
kuusi ole joukossa). Näitä ei siis voitu tarkistaa, koska
tarkistettavaa ei ole — ei siksi, että tarkistus olisi jäänyt kesken.
**Medina jäi siis kokonaan katsomatta**, vaikka tilauksessa se oli
erikseen mainittu herkkänä kohteena.

## Taulukko

| Tiedosto | Kaupunki | Kuvatekstin lupaama kohde | Aitoja vertailukuvia | Tuomio | Peruste |
|---|---|---|---|---|---|
| `hero-luxor-aamu.png` | Luxor | Karnakin Amonin temppelialue, 134 pylvään sali | 5 | **EPÄILYTTÄVÄ** | Oikea pylonin ja pässisfinksikujan arkkityyppi, mutta pyloni on koristeltu suurin reliefein (Karnakin ensimmäinen pyloni on viimeistelemätön ja koristelematon), pyhä järvi on siirtynyt aivan pylonin taakse ja kuvatekstin lupaama pylvässali ei erotu kuvasta lainkaan. |
| `hero-luxor-keskipaiva.png` | Luxor | Luxorin temppeli, Ramses II:n obeliskipari | 2 | OK | Pyloni, sen edessä istuvat kolossit, yksi jäljellä oleva obeliski portin vasemmalla puolella ja Abu Haggagin moskeija pihan yllä ovat kaikki oikeilla paikoillaan aitoihin valokuviin verrattuna. |
| `hero-luxor-ilta.png` | Luxor | Hatshepsutin muistotemppeli, Deir el-Bahari | 2 | OK | Kolme pilarikäytävin reunustettua terassia, ramppi ja jyrkänteen juuri vastaavat aitoa Deir el-Baharia samasta viistokulmasta, taustalla Niilin laakso oikein. |
| `hero-petra-aamu.png` | Petra | Al-Khazneh (Aarrekammio) | 2 | OK | Alakerran kuusi pylvästä, yläkerran keskellä tholos kartiokatolla ja uurnalla sekä rikottu päätykolmio vastaavat aitoa julkisivua; Siq avautuu oikeassa suunnassa. |
| `hero-petra-keskipaiva.png` | Petra | Ad-Deir (Luostari) | 2 | OK | Massiivinen kaksikerroksinen julkisivu, yksi valtava ovi alakerrassa ja yläkerran tholos uurnineen vastaavat aitoja kuvia, ja rakennus seisoo oikein ylätasanteella. |
| `hero-petra-ilta.png` | Petra | Kuningashautojen rivistö | 3 | **VÄÄRÄ** | Kuvassa on neljä lähes identtistä Ad-Deirin tyylistä tholos-julkisivua peräkkäin, mutta aidot kuningashaudat ovat neljä keskenään täysin erilaista hautaa (Uurna-, Silkki-, Korinttilais- ja Palatsihauta), joista tunnistettavin — kolmikerroksinen Palatsihauta — puuttuu kokonaan. |
| `hero-mekka-aamu.png` | Mekka | Suuri moskeija ja Kaaba | 3 | OK | Soikea mataf, sen keskellä musta Kaaba, ympärillä monikerroksiset galleriat ja vihreähuippuiset minareetit vastaavat aitoja ilmakuvia; esitys on asiallinen, pyhiinvaeltajat nimettömänä valkoisena joukkona eikä pyhää paikkaa ole vääristelty. |
| `hero-mekka-keskipaiva.png` | Mekka | Abraj Al-Bait -kellotorni | 3 | OK | Neliömäinen kellolohko valkoisine kellotauluineen, kultainen puolikuuhuippu ja ympärillä oleva torniryhmä vastaavat aitoja valokuvia, ja Suuri moskeija on oikealla etäisyydellä tornin juurella. |
| `hero-mekka-ilta.png` | Mekka | Jabal al-Nour ja Hiran luola | 3 | **VÄÄRÄ** | Aito Jabal al-Nour on leveä, pyöreähkö kumpare kallioisine lakikohoumineen, mutta kuvassa on terävä kartiohuippu, ja sen laella on valkoinen kupolirakennus, jota siellä ei ole — pyhälle paikalle keksitty pyhäkkörakennus on tässä sekä asiavirhe että kunnioituskysymys. |
| `hero-masqat-aamu.png` | Masqat | Sulttaani Qaboosin suurmoskeija | 4 | OK | Kultainen ristikkokuvioitu pääkupoli, yksi korkea pääminareetti ja neljä kulmaminareettia sekä vaalea hiekkakivi vastaavat aitoja valokuvia; ainoa lisäys on sisäpihan sininen allas, jota aidossa laatoitetussa sahnissa ei ole. |
| `hero-masqat-keskipaiva.png` | Masqat | Mutrahin korniisi ja suq | 3 | OK | Kaartuva rantatie, matalat valkoiset talot, rosoiset ruskeat vuoret vartiotorneineen, sinivihreä lahti ja puiset dhow't vastaavat aitoja kuvia, ja jopa sinihuippuinen minareetti löytyy aidosta viitekuvasta. |
| `hero-masqat-ilta.png` | Masqat | Al Jalalin ja Al Miranin linnakkeet, Al Alamin palatsi | 3 | OK | Kaksi linnaketta kallioilla ja niiden välissä palatsi, jonka leveä litteä katos lepää levenevien sini-kultaisten pylväiden päällä — juuri Al Alamin tunnusomainen julkisivu aidoissa valokuvissa. |
| `hero-dubai-aamu.png` | Dubai | Burj Khalifa | 2 | OK | Kolmilohkoinen kapeneva porrastorni huippupiikkeineen ja sen juurella Downtownin suihkulähdealtaat vastaavat aitoja kuvia. |
| `hero-dubai-keskipaiva.png` | Dubai | Burj Al Arab | 2 | OK | Purjeen muotoinen julkisivu, oma tekosaari ja pengertie rannalta vastaavat aitoja valokuvia, samoin ulokkeena oleva ravintola ja helikopterikenttä. |
| `hero-dubai-ilta.png` | Dubai | Al Fahidin kortteli ja Creekin dhow-satama | 3 | OK | Korallikivenväriset talot, neliömäiset avoinlakiset tuulitornit, Creek dhow'ineen ja takana moderni siluetti vastaavat aitoja Bastakiyan kuvia. |
| `hero-jerusalem-aamu.png` | Jerusalem | Kalliomoskeija | 2 | OK | Kultainen uurrettu kupoli, sinivihreä laatoitettu kahdeksankulmainen rumpu kaari-ikkunoineen, marmorinen alaosa ja aukion Ketjukupoli vastaavat aitoja valokuvia. |
| `hero-jerusalem-keskipaiva.png` | Jerusalem | Daavidin tornin sitadelli, Jaffa-portti | 3 | OK | Pyöreä kapeneva ottomaaniminareetti parvekkeineen ja pienine kupoleineen sekä massiivinen kivilinnoitus vastaavat aitoja kuvia, ja Kalliomoskeija näkyy oikeassa suunnassa taustalla. |
| `hero-jerusalem-ilta.png` | Jerusalem | Pyhän haudan kirkko | 2 | OK | Iso harmaa rotundakupoli, pienempi katolikonin kupoli lyhtyineen ja punakattoinen kellotorni vastaavat kohta kohdalta aitoa ilmakuvaa vanhastakaupungista. |
| `hero-ankara-aamu.png` | Ankara | Anıtkabir | 2 | OK | Suorakaiteinen kalkkikivihalli, ympäri kiertävä nelikulmaisten pilarien pylväikkö, litteä katto ja leveät portaat seremonia-aukiolle vastaavat aitoja valokuvia. |
| `hero-ankara-keskipaiva.png` | Ankara | Hacı Bayramin moskeija ja Augustuksen temppeli | 3 | OK | Tiilikattoinen moskeija, yksi kivinen minareetti, pieni kupolillinen türbe ja kiinni siinä oleva Augustuksen temppelin raunioseinämä vastaavat aitoja kuvia, ja linnavuori on oikealla paikalla taustalla. |
| `hero-ankara-ilta.png` | Ankara | Atakule | 3 | **EPÄILYTTÄVÄ** | Torni on tunnistettavasti Atakule (varsi, pyörivä ravintolakerros, huippupiikki, kauppakeskus juurella), mutta aidon tornin lautasmainen, teräväreunainen kapseli lasikupoleineen on kuvassa muuttunut pulleaksi maljamaiseksi kellotorninpääksi, ja varsi on selvästi liian paksu. |

## VÄÄRÄ-lista tärkeysjärjestyksessä

1. **`hero-mekka-ilta.png`** — Jabal al-Nour ja Hiran luola.
   Kaksi virhettä päällekkäin: vuoren muoto on väärä (terävä kartio
   aidon leveän kumpareen sijaan) ja laelle on keksitty valkoinen
   kupolipyhäkkö, jota siellä ei ole. Tämä on listan kärjessä siksi,
   että kyse on islamin pyhimpiin kuuluvasta paikasta, jossa juuri
   rakennettujen pyhäkköjen olemassaolo on kiistanalainen kysymys —
   keksitty pyhäkkö ei ole vain asiavirhe vaan kunnioitusongelma.
   Uusintageneroinnissa viitekuviksi Commonsin `Category:Jabal al-Nour`
   (18 kelvollista valokuvaa), ja promptiin nimenomaisesti: paljas
   kallioinen kumpare, ei rakennusta laella.
2. **`hero-petra-ilta.png`** — Kuningashautojen rivistö.
   Kuvassa on neljä toistettua Ad-Deirin kopiota, ei yhtään aitoa
   kuningashautaa. Sama vikamekanismi kuin Kašgarissa: malli ei
   tuntenut yksittäisiä hautoja ja täytti aukon alueen tunnetuimmalla
   arkkityypillä. Uusintageneroinnissa viitteeksi
   `Category:Royal Tombs (Petra)` -kuvat, ja promptiin neljä
   **keskenään erilaista** hautaa, tunnistettavimpana kolmikerroksinen
   Palatsihauta.

## Epäilyttävät (eivät vaadi uusintaa, mutta kirjattu)

1. **`hero-luxor-aamu.png`** — Karnak. Pyloni koristeltu (aito on
   koristelematon), pyhä järvi väärällä puolella, pylvässali ei erotu.
   Kuva kelpaa "egyptiläinen temppelialue" -tasolla, mutta ei kerro
   sitä mitä kuvateksti lupaa.
2. **`hero-ankara-ilta.png`** — Atakule. Tunnistettava, mutta
   ravintolakapselin muoto on maljamainen aidon lautasmaisen sijaan.

## Rajoitukset

- Tarkistus koskee vain sitä, esittääkö kuva kuvatekstin nimeämää
  kohdetta. Kuvien tekninen laatu, sommittelu tai vuorokaudenajan
  uskottavuus eivät ole tässä arvioinnin kohteena.
- Viitekuvien kuvakulma ei aina ollut sama kuin herokuvan. Karnakin
  ainoat vapaat ilmakuvat ovat vuodelta 1929, joten niistä on luettu
  pohjakaava (pylonin sijainti, pyhän järven paikka) eikä pintojen
  nykytilaa.
- Kuudelle tilatulle kaupungille (Sana, Aden, Salalah, Medina, Nikosia,
  Izmir) ei ole olemassa yhtään generoitua herokuvaa, joten niitä ei
  ole arvioitu.
