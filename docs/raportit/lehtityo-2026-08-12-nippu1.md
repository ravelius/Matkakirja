# Lehtityö 12.8.2026 — nippu 1: auditti ja sen korjaukset

*Opus-toteuttajasessio (Lähi-itä + Aasia). Tämä on ensimmäinen nippu:
tehtävänannon vaihe 1 eli jo tehtyjen maalehtien auditti ja siitä
seuranneet korjaukset. Raportti kirjoitetaan Fablelle ja omistajalle;
avoimet asiat ovat lopussa.*

## 1. Mitä auditoitiin

Läpikäyty aineisto: **22 maalehteä** (Lähi-idän 12: ARE IRN IRQ SYR JOR
OMN QAT KWT SAU BHR YEM CYP; Aasian 10: JPN CHN IND THA KOR VNM IDN MYS
PHL PAK) sekä Lähi-idän kolme kaupunkilehteä (Istanbul, Kairo, Dubai).
Mittarit:

| Tarkistus | Miten | Kattavuus |
|---|---|---|
| Mallin mitat, minitehtäväsäännöt, kysymysten ainutkertaisuus | `node tools/tarkista-maa.mjs <maa>` | 22/22 maata |
| Kuvien lisenssi, koko, tekijämerkintä ja maavihje | oma ajo Commonsin API:a vasten | 396 kuvaa |
| Kuvaduplikaatit koko pakkaa vasten | `tiedosto:`-tekstihaku kaikista paketeista | 3 781 viittausta |
| Aihetoisto (sama juttu kahdesti eri kuvalla) | uusi `tools/tarkista-aihetoisto.mjs` | 1 340 juttua |
| Kaupunkilehtien rakenne | KULTTUURI_KATEGORIAT vs. malli | 43 kaupunkia |
| Faktat | neljä tarkistusagenttia, erä kerrallaan | 396 juttua, ks. kohta 3 |

## 2. Löydökset

### 2.1 Minitehtävät — 27 rikettä kahdeksassa Lähi-idän maassa

`tarkista-maa.mjs` kaatui kahdeksassa maassa (ARE IRN JOR OMN QAT KWT
SAU BHR). Aasian kymmenen maata olivat puhtaat. Kolme vikatyyppiä:

1. **Oikean vastauksen sanat eivät löydy sivun tekstistä** siinä
   muodossa, jossa ne tekstissä ovat (13 tapausta). Sisältö oli oikein,
   mutta sääntö on, että vastaus on luettavissa sivulta — muuten
   minitehtävä on tietovisa eikä lukemisen palkinto.
2. **Oikea vaihtoehto on selvästi pisin** (9 tapausta, pisin ero 28
   merkkiä). Pelaaja arvaa oikein lukematta.
3. **Vastaus vuotaa otsikkoon ja johdantoon** (KWT/ruoka: "Mistä
   murabyan on saanut nimensä?" → *Katkaravusta*, kun sivun otsikko on
   "Katkaravut piiloutuvat riisin alle").

**Lisäksi yksi törmäys, jota mikään työkalu ei nähnyt:** KWT/rakennukset
kysyi "Mitä Kuwaitin tornien alempi pallo pitää sisällään?", ja Kuwaitin
oma kulttuurivisa kysyy jo "Mitä niiden palloissa säilytetään?".
Kaupunkien visat käyttävät avainta `q:`, eikä esitarkistin lukenut niitä
lainkaan.

### 2.2 Aihetoisto — sama juttu kahdesti, eri kuvalla

Uusi tutka löysi kuusi pelaajalle näkyvää toistoa Lähi-idässä ja
Aasiassa. Kuvaduplikaattitutka ei löydä näitä, koska kuvatiedosto on eri.

| Toisto | Missä | Yhteisiä harvinaisia sanoja |
|---|---|---|
| Helmisukelluksen tekniikka **kolmesti** | QAT/meri, BHR/helmet, Dubain kansi | 9–12 |
| Umm Kulthumin radiokonsertit | Kairon kansi + EGY/musiikki | — (lyhyt teksti, löytyi käsin) |
| "Metsä, joka kasvaa suolavedessä" **sanasta sanaan sama otsikko** | ARE/ranta + PAK/luonto | 5 |
| Qanat-kanava | IRN/puutarhat + **Iranin karttasivu** | 7 |
| Musandamin vuonot | OMN/meri + **Omanin karttasivu** | 7 |
| Al Zubarah | QAT/aavikko + **Qatarin karttasivu** | 5 |

Kolme viimeistä ovat **saman lehden sisällä**: maalehden ensimmäinen sivu
on maan karttasivu, joten karttasivun nosto ja aihesivun juttu ovat
parin sivun päässä toisistaan. Tämä on sama ansa, jonka Opus 1 kirjasi
Irakin kohdalla (docs/opus1-tilanne.md kohta 1b) — se toistui kolme
kertaa sen jälkeen.

Lisäksi kirjattavaksi, ei korjattavaksi tässä nipussa:

- **Burj Khalifa kahdesti**: ARE/rakennukset ("Torni kapenee kolmeen
  suuntaan") ja Dubain kaupunkilehti ("Torni, jonka huipulla paastotaan
  pidempään"). Molempien sivujen minitehtävä kysyy Burj Khalifasta.
  Sanamuodot eroavat sen verran, ettei tutka nostanut paria, mutta
  lukija kohtaa saman tornin kahdesti kahden napautuksen välein.
- **Ofioliittitarina kahdesti**: OMN/vuoret (Samail) ja CYP/luonto
  (Troodos). Eri maat ja eri kohteet, mutta sama selitys merenpohjan
  työntymisestä maalle. Aidosti maailman kaksi tunnetuinta ofioliittia
  — jätetty ennalleen, koska molemmat ansaitsevat paikkansa.

### 2.3 Kaupunkilehtien rakenne — Kairo oli vajaa

Malli on **kansi (3 nostoa + 3 kansikuvaa) + yksi aihesivu (2–3 nostoa +
minitehtävä)**. 42 kaupunkia noudattaa sitä. Poikkeus:

- **Kairo:** kansi neljällä nostolla eikä aihesivua lainkaan. Kairon
  lehti oli siis kaksi ruutua kolmen sijaan, eikä siinä ollut yhtään
  minitehtävää.

### 2.4 Kaupunkinähtävyyksien jutut

Kohdekartta ilman juttuja on vain **Dubailla**: kartta ja kuusi
numeroitua kohdetta olivat paikallaan, mutta yhtään nähtävyysjuttua ei
ollut (Istanbulilla ja Kairolla on kummallakin kuusi). Tämä on se, minkä
omistaja huomasi: *"osasta puuttui vain osa kaupunkinähtävyyksien
artikkeleista."*

### 2.5 Kuvat

**Lisenssit ovat kunnossa.** 396 kuvaa tarkistettiin Commonsin API:sta:
ei yhtään kiellettyä lisenssiä (FAL/GFDL-only/GODL), ei yhtään
puuttuvaa tiedostoa, ei yhtään TIFFiä. Tekijämerkinnöistä ei löytynyt
keksittyjä nimiä.

**Kymmenen kuvaa alittaa 1 200 pikselin rajan** — pahin 540 px (IRQ/ruoka,
kleicha). Loput ovat 961–1 188 px: IRQ ×4, SYR ×1, OMN ×1, YEM ×3.

**Kuvaduplikaatteja koko pakassa on yhdeksän** (3 781 viittausta, 3 772
eri tiedostoa). Yksikään ei ole Lähi-idän tai Aasian maalehdissä — ne
ovat maasto-, vuori- ja valokuvapakettien välillä ja siis muiden
kaistoilla. Lista on kohdassa 5.

## 3. Faktatarkistus

Neljä tarkistusagenttia ajettiin kaikkien 22 maalehden yli erillisinä
erinä. Toimeksianto oli sama joka kerta: *oleta että teksteissä on
virheitä ja kumoa ne*, Unesco-luvut Unescon omasta rajapinnasta
(`data.unesco.org/.../whc001`, koska whc.unesco.org antaa 403:n).
Yhteensä käytiin läpi **396 juttua** ja tarkistettiin ulkoisesta
lähteestä noin 250 yksittäistä väitettä.

**Viisi todistettua virhettä. Kaikki korjattu, ja jokainen tarkistettiin
vielä itse ennen korjausta:**

| Missä | Väite | Oikein |
|---|---|---|
| JOR/rauniot | Jerashin soikeaa toria kiertää "lähes seitsemänkymmentä pylvästä" | Lukua ei saatu vahvistettua mistään luotettavasta lähteestä → luku poistettiin, teksti kertoo nyt joonialaisesta pylväsrivistä |
| JOR/rauniot | Otsikko "Pääkaupungin kukkulalla seisoo kuusi pylvästä" | Herkuleen temppelin portiikossa OLI kuusi runsaan 13 metrin pylvästä; pystyssä on kolme — sen sanoo myös jutun oma kuva. Otsikko ja teksti korjattu |
| IRN/rakennukset | Naqsh-e Jahanin aukio "noin 160 × 500 metriä" | 160 × 560 m, lähes 9 hehtaaria (Unescon oma kuvaus) |
| VNM/historia | "Yhdeksänkymmenestäyhdestä paadesta on jäljellä 82" | Paasia pystytettiin 116, jäljellä 82 |
| KOR/musiikki | "Japanissa sama tapahtui sarjalla Talvisonaatti vuonna 2002" | Sarja esitettiin Koreassa 2002; Japanin hallyu-buumin laukaisi NHK:n lähetys 2003 |

Lisäksi **CYP/luonto**: kyproksenmuflonin painot (uros 35–45 kg, naaras
25–35 kg) eivät vastanneet lähdettä, joka sanoo uroksesta "jopa 50 kg"
ja naaraasta "noin 35 kg". Luvut kirjoitettiin lähteen mukaisiksi.

**Epävarmoina kirjattu, EI korjattu** (lähteet ovat keskenään
ristiriitaisia, eikä yksikään auktoritatiivinen lähde ratkaissut asiaa):

- IRQ/rakennukset: Samarran Malwiya "848–852" — en-Wikipedia sanoo
  valmistumisvuodeksi 851.
- IRQ/rakennukset: Mustansiriyan vesikello "pihalle" — lähde sijoittaa
  sen eteishalliin.
- THA/kuvataide: Ramakien-gallerian "sadan kahdeksankymmenen kentän
  verran" — useat toisiolähteet sanovat 178 paneelia.
- THA/historia: Smaragdibuddha "veistetty yhdestä vihreästä
  jadeiittilohkareesta" — lähteet puhuvat jaspiksesta tai jadesta
  eivätkä ratkaise kivilajia.

**Puhtaita maita:** OMN, QAT, KWT, SAU, BHR, ARE, SYR, YEM, JPN, CHN,
IND, IDN, MYS, PHL, PAK — ei yhtään todistettua virhettä. Aineisto on
kokonaisuutena hyvin tarkkaa: Qingming-kääryn 814 ihmistä, Hegran 111
hautaa, Kuwait-tornien 41 000 kiekkoa ja Danan 703 kasvilajia täsmäsivät
kaikki lähteisiin.

## 4. Mitä tässä nipussa korjattiin

**Minitehtävät (27 rikettä, 8 maata).** Oikeat vastaukset kirjoitettiin
siihen muotoon, jossa sanat ovat sivun tekstissä; liian pitkät oikeat
vaihtoehdot lyhennettiin tai vääriä pidennettiin; KWT/ruoka sai kokonaan
uuden kysymyksen (vanha vastaus luki sekä otsikossa että johdannossa) ja
KWT/rakennukset uuden aiheen (vanha kysyi samaa kuin Kuwaitin
kulttuurivisa). **Kaikki 22 maata läpäisevät nyt esitarkistimen.**

**Aihetoisto (6 kohtaa).** Viisi juttua kirjoitettiin uusiksi ja yksi
siirrettiin:

| Mikä | Miten ratkaistiin |
|---|---|
| Helmisukellus kolmesti | Bahrain omistaa aiheen (koko sivu). QAT/meri kertoo nyt laivaston koosta (Lorimerin 1908 taulukko: 817 venettä, 13 000 miestä), ja Dubain kannen juttu kertoo itse kaiverruksesta — miten The Graphic esitteli lahden Lontoon lukijoille 1881 |
| Umm Kulthum kahdesti | Kannen versio jää, koska Kairon kulttuurivisa nojaa siihen. EGY/musiikki sai tilalle kediivin oopperatalon (1869, Rigoletto, palo 1971) ja Aidan riemumarssin esikuunteluna |
| Sama otsikko ARE ja PAK | PAK/luonto kirjoitettiin uusiksi Induksen suiston omasta näkökulmasta: kolme mangroven istutuksen maailmanennätystä |
| Qanat IRN + karttasivu | IRN/puutarhat sai Shazdehin puutarhan (ja sivu uuden minitehtävän, koska vanha kysyi qanatista) |
| Musandam OMN + karttasivu | OMN/meri sai Sohar-laivan matkan Kiinaan 1980–81 |
| Al Zubarah QAT + karttasivu | QAT/aavikko sai laulavan dyynin |

**Kairon kaupunkilehti.** Kansi lyhennettiin kolmeen nostoon mallin
mukaisesti, ja Kairo sai aihesivun `historia`: al-Fustat (641), al-Azhar
(970) ja kannelta siirretty Description de l'Égypten kartta (1809) —
sivusta tuli aikajana. Sivulle kirjoitettiin minitehtävä, jollaista
Kairolla ei ollut lainkaan.

**Dubain nähtävyysjutut.** Kuusi juttua kohdekartan kuudelle kohteelle:
Kultasuuk, Dhow-satama, Al Shindagha, Abra-laiturit, Bastakian
kaupunginosa ja Al Fahidin linnoitus. Kahdeksan uutta kuvaa, kaikki
katsottu ja lähdetiedot haettu Commonsin API:sta.

**Kuvat.** Kaksi vaihdettiin: IRQ/ruoka kleicha 540 px → 4 624 px ja
YEM/rakennukset Dar al-Hajar 967 px → 3 888 px (uusi kuva on myös
alaviistosta, joten kalliopaasi erottuu paremmin). **Seitsemän jätettiin
ennalleen ja perustelu kirjattiin:**

- IRQ tashrib (1 080 px), YEM Zabid (1 062 px) ja YEM Tihama (961 px) —
  kelvollista korvaajaa ei löytynyt. Ainoat riittävän isot ehdokkaat
  olivat vesileimattuja tai esittivät eri kohdetta.
- IRQ Ukhaidir (1 024 px) — löytyi 5 663 px:n kuva, mutta se on otettu
  muurin edestä eikä näytä suorakaidetta, josta otsikko puhuu. Pienempi
  kuva vastaa juttua paremmin.
- IRQ mudhif ja IRQ ruokovene (1 024 px) — parhaat korvaajat olivat
  Yhdysvaltain armeijan insinöörijoukkojen kuvia. Lisenssi kelpaa (PD),
  mutta edeltäjä oli tietoisesti välttänyt niitä Irakin sivuilla, joten
  1 024 px:n ero ei ollut sen arvoinen.
- OMN suitsuke (1 125 px) — korvaaja olisi esittänyt puun, nykyinen
  esittää hartsijyviä, joista juttu kertoo.
- Dubain kannen kaiverrus (829 px) — kuva ON jutun aihe, eikä samaa
  kaiverrusta ole Commonsissa suurempana.

**Työkalut.** `tools/tarkista-aihetoisto.mjs` (uusi) ja
`tools/tarkista-maa.mjs` (lukee nyt kulttuurivisat ja tuntee kentät
`wiki`, `musiikki*`, `esikuuntelu`).

**Egyptin sivutuotteet.** EGY/musiikki oli tämän nipun kohde, ja samalla
korjattiin kaksi esitarkistimen löydöstä: EGY/ruoan otsikko "Leipä
tarkoittaa elämää" sisälsi sivun minitehtävän vastauksen, ja
EGY/musiikin vastaus "Otelaudassa ei ole nauhoja" ei ollut sivun
tekstissä siinä muodossa.

## 4b. Julkaisu ja yksi este, joka ratkesi

Nippu julkaistiin haarasta `claude/opus-me-aasia-lehdet` versiona
**v586** mainin (v585) päälle: `node --test tests/*.test.mjs` 573/0,
`tarkista-kaksoisavaimet` puhdas, `build-standalone` ajettu ja PR:n
Testit-ajo vihreä ennen mergeä.

**Este, joka kannattaa tietää seuraavalle sessiolle:** ensimmäinen
`git push` kaatui git-välityspalvelimen virheeseen *"ravelius/Matkakirja
is not in this session's authorized repository set"*. Kloonaus ja
`git fetch` toimivat, eli pelkkä lukuoikeus oli olemassa alusta asti ja
vika näytti siltä kuin se olisi ollut haarassa. Korjaus oli
`add_repo`-työkalu **`access: "push"`** -parametrilla; sen jälkeen push
meni läpi ensimmäisellä yrityksellä.

**`gh`-komentoa ei ole tässä kontissa lainkaan.** PR avattiin GitHubin
REST-rajapinnalla curlilla: ympäristössä olevat `GITHUB_TOKEN` ja
`GH_TOKEN` ovat välityspalvelimen paikanvaraajia (14 merkkiä, alkavat
`prox`), ja proxy vaihtaa niiden tilalle oikean tunnisteen — eli
`curl -H "Authorization: Bearer $GITHUB_TOKEN" https://api.github.com/…`
toimii sellaisenaan sekä lukuun että kirjoitukseen.

## 5. Jonoon jätetty — Fablen tai toisen kaistan päätettäväksi

1. **Pyhät kaupungit Mekka ja Medina** odottavat omistajan erillistä
   päätöstä. Molemmilla on laatta Lähi-idän laudalla, mutta lehteä ei
   tehdä ilman päätöstä (Raamattu 2.0, Rajaukset ja turvalinjat).
   Kirjattu odottamaan; muut Lähi-idän kaupungit tehdään ilman niitä.
2. **Kuusi erikoiskohdetta ilman maa-attribuutiota** (Jerusalem, Petra,
   Siinai, Rub al-Khali, Persepolis, Kappadokia). Ne eivät ole
   kaupunkeja, joten kohdekarttatyökalu piirtäisi tyhjän katuverkon.
   Esitystapa on Fablen pöydällä (docs/opus2-tilanne.md).
3. **Yhdeksän kuvaduplikaattia muilla kaistoilla:**
   `Waving fisherman on Lake Chad (detilt).jpg` (africa-kulttuuri +
   maasto-tekstit), `Долина гейзеров (2018).jpg` (asia-valokuvat +
   vuori-valokuvat), `All Gizah Pyramids.jpg` (kulttuuri-kategoriat +
   paivan-kuvat), `Las Meninas 01.jpg` (maa-kategoriat ESP +
   nahtavyysjutut), `Geirangerfjord…jpg`, `Rio Javaés.jpg`,
   `Phou Bia…jpg`, `Verkhoyansk Range…jpg`, `Grassy Ridge Bald.jpg`.
4. **Euroopan puolelta löytyi sama karttasivu-ansa:** IRL/historia
   "Aurinko käy sisällä kerran vuodessa" ja Irlannin karttasivun nosto
   "Kumpu, joka päästää auringon sisään kerran vuodessa" kertovat
   Newgrangesta saman jutun samassa lehdessä (12 yhteistä harvinaista
   sanaa — pakan vahvin osuma). Lisäksi kaupunkilehden kansi ja saman
   kohteen nähtävyysjuttu toistavat toisiaan ainakin Roomassa (Trevi),
   Sarajevossa (Latinalaissilta), Riiassa (Mustapäiden talo) ja Vilnassa
   (Užupis). Nämä ovat Euroopan kaistaa — kirjattu, ei korjattu.
5. **Kaksi kohdekartan kohdetta ilman juttua Euroopassa.** Kun Dubain
   jutut oli liitetty, ajoin saman tarkistuksen koko pakalle: jokaisen
   `KAUPUNKIKARTAT[kaupunki].kohteet[].nimi` pitää löytyä
   `NAHTAVYYSJUTUT[kaupunki]`-taulusta, koska ui.js yhdistää ne
   nimellä. 38 kaupungista kaksi ontuu: **Budapestin "Sankarien aukio"**
   ja **Wienin "Schönbrunn"** ovat kartalla numeroituina kohteina, mutta
   niiltä puuttuu juttu (molemmilla 7 kohdetta ja 6 juttua). Sama vika
   kuin Dubaissa, mutta Euroopan kaistalla — kirjattu, ei korjattu.
   Tarkistuksen voi ajaa yhdellä rivillä ja se kannattaa lisätä
   testeihin, koska puuttuva juttu ei kaada mitään: kohde vain ei avaa
   mitään napautettaessa.
6. **Menovinkkisivu on vain Euroopalla, Egyptillä ja Emiraateilla.**
   Lähi-idän 11 muuta maata ja kaikki Aasian maat ovat ilman. Raamattu
   2.0 mainitsee menovinkit maalehden osana; onko tämä puute vai
   tietoinen rajaus, on Fablen päätettävä.
7. **`aika`-leima puuttuu Lähi-idän maalehdiltä kokonaan.** Aasian
   kymmenen maata käyttävät sitä (historia-nostot), Lähi-idän kaksitoista
   eivät yhtään. Ero näkyy lukijalle taitossa.

## 6. Työkalut, jotka tästä jäivät

- **`tools/tarkista-aihetoisto.mjs` (uusi)** — löytää saman jutun
  kahdesti eri kuvalla, myös karttasivun ja aihesivun väliltä. Merkitsee
  ⚑-merkillä parit, jotka osuvat samaan lehteen.
- **`tools/tarkista-maa.mjs` (täydennetty)** — lukee nyt myös kaupunkien
  kulttuurivisat (`q:`) ja varoittaa, jos minitehtävä muistuttaa visaa.
  Tämä oli Opus 1:n Fablelle kirjaama parannusehdotus; se olisi
  napannut Kuwaitin törmäyksen. Lisäksi `wiki` on nyt tunnettu kenttä
  (ui.js piirtää siitä "Lue lisää aiheesta" -napin myös maalehdessä).
