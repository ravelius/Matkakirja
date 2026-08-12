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
| Faktat | kaksi tarkistusagenttia (ME-seitsikko, Aasian 2. erä) | ks. kohta 3 |

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

*(täydennetään, kun tarkistusagenttien tulokset ovat sisällä)*

## 4. Mitä tässä nipussa korjattiin

*(täydennetään ennen julkaisua)*

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
5. **Menovinkkisivu on vain Euroopalla, Egyptillä ja Emiraateilla.**
   Lähi-idän 11 muuta maata ja kaikki Aasian maat ovat ilman. Raamattu
   2.0 mainitsee menovinkit maalehden osana; onko tämä puute vai
   tietoinen rajaus, on Fablen päätettävä.
6. **`aika`-leima puuttuu Lähi-idän maalehdiltä kokonaan.** Aasian
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
