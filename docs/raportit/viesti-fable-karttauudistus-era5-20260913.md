# Karttauudistus erä 5: Pariisin kaupunkilehden sivut nostoiksi

*(Opus-työsessio → Fable, 13.9.2026. Haara
`claude/karttauudistus-era5-pariisi`. Ei versionostoa, ei dist/:iä.
Lähteet: tehtävänanto, docs/raportit/karttauudistus-suunnitelma-
20260913.md luvut 1.6, 1.7, 4.5–4.7, docs/raportit/
karttauudistus-suunnitelma-pallo-20260913.md luvut 1.3, 3.0, 3.4 ja
luku 4 (riskit), viesti-fable-karttauudistus-era4- ja -era6-, Raamattu
"Kaupungit" KARTTAUUDISTUS + PAATOKSET 1–5, docs/moduulit/
kaupunkilehti.md.)*

## 0. Lyhyesti

Pariisin kaupunkilehden kolmen sivun nostot ovat nyt **kuusi
klikattavaa karttapalaa**, joista jokaisella on oma piste
kaupunkilehden kohdekartalla. Tekstit siirtyivät **merkki merkiltä
samoina** — koneellisesti todennettuna, ei silmämääräisesti. Ranskan
merkkimäärät ovat rajoissa: **pääkartalla 20 (raja 21), kohdekartalla
17 (raja 17)**. `npm test` 3295/0, savuke 25/25 vihreänä ja punainen
vastakoeajo kirjattu.

**Kaksi asiaa vaativat Fablen päätöksen** (luku 7): suunnitelman rivi
"Patonki → pääkartta" törmää omistajan omaan sääntöön 2.9.2026 ja
ratkesi kohdekartan hyväksi, ja luvun 4.5 lähizoomiportti (`nosto.lahi`)
**ei ole olemassa** — sitä ei rakennettu, kuten tehtävänanto ohjeisti.

## 1. LÖYDÖS, JOKA MUUTTI LUVUN 4.7 TAULUKON TULKINTAA

**Historia-osaston KAIKILLA seitsemällä nostolla oli jo karttapaikka.**
Suunnitelma oletti, että kolme pitää vielä viedä kartalle; mitattuna
kuusi oli kohdekartalla ja yksi pääkartalla:

| lehden nosto | karttapaikka jo ennen tätä erää |
| --- | --- |
| Tuileriain rauniot seisoivat yksitoista vuotta | kohdekartta `syvennys-pariisi-tuileriat` |
| Piiritetyn kaupungin posti kulki kyyhkyillä | kohdekartta `syvennys-pariisi-kyyhkyposti` |
| Nimi, joka oli alun perin pilkkaa | kohdekartta `syvennys-pariisi-impressionistit` |
| Kirahvi käveli Marseillesta Pariisiin | kohdekartta `nosto-kirahvin-kavelymatka` |
| Kaulanauha, joka ei koskaan päätynyt kuningattarelle | **pääkartta** `skandaali-kaulanauhajuttu-1785` (`kattoVapaa`) |
| Kleopatra kirjoitti ranskaksi — ja akateemikko uskoi | kohdekartta `skandaali-vrain-lucas-kirjevaarennokset` |
| Mies myi Eiffel-tornin romuraudaksi | kohdekartta `nosto-lustig-eiffel` |

Luvun 4.7 rivi *"kolme parasta kohdekartan pisteiksi + loput neljä
yhdeksi nostoksi"* toteutui siis näin: **kolmikko oli jo pisteinä**, ja
loput neljä käsiteltiin sisällön mukaan (luku 3). Kolmikon
valintaperuste ei ole tämän session maku vaan osaston oma johdanto,
joka nimeää juuri ne kolme: *"Samat vuodet jättivät kaupunkiin
kyyhkypostin, palatsin rauniot ja maalaussuunnan, jonka nimi oli alun
perin pilkkaa."*

## 2. Jakotaulukko toteutuneena (luku 4.7, rivi riviltä)

| Luvun 4.7 rivi | Toteutus | Missä nyt |
| --- | --- | --- |
| **Pariisi** (kansi), 4 nostoa → neljä erillistä nostoa | **tehty** | `pariisin-72-nimea` (Eiffel-torni), `guimardin-metro` (Abbesses), `notre-damen-kukko` (Notre-Dame), `pariisin-patonki` (Élysée) — kaikki kohdekartalla, ks. luku 7.1 patongista |
| **Musiikki**, 3 nostoa → yksi nosto "Pariisi soi" (Opéra) | **tehty** | `pariisi-soi`, kohdekartta Palais Garnier; kaksi kappaletta, kolmas oli kaksoiskappale (luku 3) |
| **Historia**, 7 nostoa → 3 karttapistettä + 1 nosto | **tehty** | kolme pistettä olivat jo olemassa (luku 1); `pariisin-vuosisadat`, kohdekartta Panthéon |
| **Historian hetki** × 6 → ei tehdä mitään | **ei tehty mitään** | koskemattomat |
| **Menovinkit** → maan lisää-valikkoon | **EI TEHTY — ei tämän erän tiedosto** | Sivu lainataan maapaketista kaupunkilehteen js/lehti.js:314–331:ssä; poisto kaupunkilehdestä on yhden rivin muutos js/lehti.js:ään, joka on tehtävänannossa kielletty (rinnakkaiset erät). Sivu on jo nyt maalehden sivu, joten sisältö ei ole missään vaarassa |
| **Maaosasto** (etusivun lohko) → pois | **EI TEHTY — ei tämän erän tiedosto** | Etusivun lohko latoutuu js/lehti.js:ssä; sama kielto |
| **Etusivu, Matkailijalle, Sää, Kulttuurivisa** → iso pop-up | **tehty jo erässä 4** | js/kaupunkinosto.js |

Lisäksi: kansi-, musiikki- ja historiaosaston `nostot`-listat ovat nyt
tyhjiä (patonkia lukuun ottamatta, luku 7.2). **Osastoja ei poistettu**,
koska lehtitehtävät on ankkuroitu SIVUNUMEROON eikä osaston tunnukseen
(`lehtitehtavat: [{ sivu: 2 … }, { sivu: 3 … }]`,
js/packs/fokusvirta-pariisi.js) — poisto olisi siirtänyt aarteen
avaavan tehtävän ja julistetehtävän hiljaa väärille sivuille. Sivut 2
ja 3 avautuvat yhä johdantoineen ja tehtävineen (savukkeen vartio 6,
kuva `karttauudistus-5-lehden-sivu.png`).

## 3. VANHA/UUSI — kaikki kahdeksan siirtoa, merkki merkiltä

Siirto todennettiin ohjelmallisesti: kunkin lehden noston `teksti`
`origin/main`-versiosta verrattiin uuden noston `lunastus`-kappaleeseen
`===`-vertailulla. **Kaikki kahdeksan ovat identtisiä, eroja 0.**

| lehden nosto (VANHA) | mrk | uusi karttanosto (UUSI) | tulos |
| --- | ---: | --- | --- |
| kansi / "Tornissa on 72 nimeä kullalla" | 537 | `pariisin-72-nimea`.lunastus[0] | SAMA |
| kansi / "Metron sisäänkäynti koottiin palasista" | 500 | `guimardin-metro`.lunastus[0] | SAMA |
| kansi / "Kukko putosi ja löytyi seuraavana päivänä" | 537 | `notre-damen-kukko`.lunastus[0] | SAMA |
| kansi / "Paras patonki valitaan sokkona" | 580 | `pariisin-patonki`.lunastus[0] | SAMA |
| musiikki / "Édith Piaf lauloi ensin kadulla" | 491 | `pariisi-soi`.lunastus[0] | SAMA |
| musiikki / "Kaksi sormea riitti" | 484 | `pariisi-soi`.lunastus[1] | SAMA |
| historia / "Kaulanauha, joka ei koskaan päätynyt kuningattarelle" | 790 | `pariisin-vuosisadat`.lunastus[0] | SAMA |
| historia / "Kleopatra kirjoitti ranskaksi — ja akateemikko uskoi" | 630 | `pariisin-vuosisadat`.lunastus[1] | SAMA |

Sama todennus ajetaan **myös selaimessa**: savukkeen vartio 4b avaa
jokaisen kuuden kortin ja vertaa kortin koko leipätekstin
lähdetekstiin merkki merkiltä (537/537, 500/500, 537/537, 580/580,
976/976, 1421/1421).

**Otos tehtävänannon pyytämällä työkalulla.**
`node tools/vertaa-sisaltodiff.mjs origin/main HEAD
js/packs/fokusvirta-pariisi.js FOKUSVIRTA_PARIISI 5` ja sama
`js/packs/nahtavyysjutut.js NAHTAVYYSJUTUT` antavat molemmat
**"Muuttuneita kenttiä: 0"** — eli yhtäkään olemassa olevaa
nosto- tai juttutekstiä ei muutettu, kaikki on lisäystä. Sama komento
`js/packs/kulttuuri-kategoriat.js KULTTUURI_KATEGORIAT` antaa kaksi
paria, mutta ne ovat **työkalun indeksiharha**, ei sisältömuutos: kun
kansiosaston kolme ensimmäistä nostoa poistuivat, `nostot[0]` on nyt
patonki, ja työkalu vertaa indeksiä eikä otsikkoa. Ylläoleva taulukko
on siksi se, mitä pistokokeessa kannattaa lukea.

## 4. Pudotettu aines — mitä jäi pois ja miksi se ei ole asiatietoa

Kuusi lehden nostoa pudotettiin siirtämättä. **Jokainen niistä on
sivuversio nostosta, jonka oma karttakortti sisältää sivuversion
jokaisen faktaväitteen ja enemmän.** Pelaaja ei siis menetä yhtään
faktaa, vaan lyhennelmän.

| pudotettu sivuversio | mrk | kartalla oleva vastine (laajempi) |
| --- | ---: | --- |
| musiikki / "Carmen kaatui ensi-illassaan" | 602 | `carmenin-ensi-ilta` (kohdekartta, 2 kappaletta) |
| historia / "Tuileriain rauniot seisoivat yksitoista vuotta" | 584 | `syvennys-pariisi-tuileriat` |
| historia / "Piiritetyn kaupungin posti kulki kyyhkyillä" | 651 | `syvennys-pariisi-kyyhkyposti` |
| historia / "Nimi, joka oli alun perin pilkkaa" | 655 | `syvennys-pariisi-impressionistit` |
| historia / "Kirahvi käveli Marseillesta Pariisiin" | 659 | `kirahvin-kavelymatka` |
| historia / "Mies myi Eiffel-tornin romuraudaksi" | 740 | `lustig-eiffel` |

Lisäksi pois jäivät **musiikki- ja historiaosaston johdannot** noston
sisältönä (sivuilla ne ovat yhä paikallaan). Ne eivät esitä yhtään
faktaa, jota yllä olevissa korteissa ei ole: musiikin johdanto tiivistää
Piafin kadun, Djangon asuntovaunuleirin ja Carmenin ensi-illan, ja
historian johdanto nimeää kyyhkypostin, rauniot ja pilkkanimen.

Kaksi kaulanauha- ja Vrain-Lucas-sivuversiota EI pudotettu, vaikka
molemmilla on oma skandaalikortti: niiden sivuversioissa on faktoja,
joita kortissa ei ole (kaulanauhan **647 timanttia** ja ensimmäisen
maksuerän erääntyminen elokuussa; Vrain-Lucasin lähettäjänimet
Aristoteles ja Kaarle Suuri sekä englantilaisten huomautus siitä, että
**Newton oli kirjeiden päiväyksen aikaan lapsi**). Juuri siksi ne ovat
"Pariisin vuosisadat" -kortissa sanatarkasti.

## 5. Minikysymykset (erän 6 datamalli)

Pooli on nyt yhdeksän nostoa, joten kiintiö "joka kolmas" on kolme
kysymystä. Yksi oli ennestään (erä 6), kaksi on uutta — poolin
kuudennessa ja yhdeksännessä nostossa.

| # | nosto | visa |
| --- | --- | --- |
| 3 | `carmenin-ensi-ilta` | erä 6 (ennallaan) |
| 6 | `notre-damen-kukko` | **uusi** |
| 9 | `pariisin-vuosisadat` | **uusi** |

**`notre-damen-kukko`** — *"Tornin huipulla seisonut kuparinen kukko
luultiin ensin tuhoutuneeksi. Miten sille kävi?"* Vaihtoehdot: *Se
löytyi seuraavana päivänä maasta lommoilla* (oikea) · *Se sulaa
löydettiin holvin raunioista* · *Siitä jäi jäljelle vain
pyhäinjäännökset*. Fakta: *"Onnea oli muutenkin: kuusitoista
kuparipatsasta oli nostettu katolta korjattavaksi neljä päivää ennen
paloa."* Vastaus on saman kortin tekstissä sanatarkasti (*"Ensin sitä
luultiin tuhoutuneeksi, mutta se löytyi seuraavana päivänä maasta
lommoilla."*), ja fakta on saman kappaleen loppu.

**`pariisin-vuosisadat`** — *"Vrain-Lucas myi kirjeitä, joiden
lähettäjiksi oli merkitty muun muassa Kleopatra ja Julius Caesar. Mikä
niissä oli pielessä?"* Vaihtoehdot: *Kaikki oli kirjoitettu 1800-luvun
ranskaksi* (oikea) · *Ne oli päivätty samalle viikolle* · *Paperissa ei
ollut lainkaan vesileimaa*. Fakta: *"Englantilaiset tutkijat
huomauttivat lisäksi, että Newton oli kirjeiden päiväyksen aikaan
lapsi. Väärentäjä tuomittiin helmikuussa 1870 kahdeksi vuodeksi
vankeuteen."* Vastaus ja fakta ovat molemmat kortin toisessa
kappaleessa sanatarkasti.

Kummassakin **väärät vaihtoehdot eivät ole faktaväitteitä** vaan
uskottavia arvauksia — sama kaava kuin PIAF_VISAssa ja erän 6
Carmen-kysymyksessä. Kumpikin on ymmärrettävä ensilukemalla (yksi
lause, ei sivulauseketjuja) ja 13+ -sopiva.

## 6. Merkkimäärät ja karttapisteet

`node tools/laske-karttanostot.mjs`:

| | ennen | jälkeen | raja |
| --- | ---: | ---: | ---: |
| Ranska pääkartalla | 20 | **20** | ≤ 21 |
| Ranska kohdekartalla | 11 | **17** | ≤ 17 |
| kulttuurinostot (kul) | 9 | 15 | — |

Kuusi uutta karttapistettä js/packs/maakartat.js:n `KAUPUNKIKARTAT.pariisi`:

| piste | lat / lon | peruste |
| --- | --- | --- |
| 72 nimeä | 48,85822 / 2,2945 | Eiffel-torni, sama piste kuin `lustig-eiffel`illa |
| Metron sisäänkäynti | 48,8844 / 2,3382 | Abbesses'n asema, yksi jäljellä olevista Guimardin sisäänkäynneistä (jo pelin kuvapaketissa, js/packs/europe-valokuvat.js) |
| Notre-Damen kukko | 48,853 / 2,3499 | sama piste kuin kartan oma Notre-Dame |
| Paras patonki | 48,8703 / 2,3167 | Élysée-palatsi; kortin oma teksti nimeää presidentinpalatsin leivät palkinnoksi |
| Pariisi soi | 48,8719 / 2,3317 | Palais Garnier (suunnitelman "kohdekartta (Opéra)") |
| Pariisin vuosisadat | 48,8462 / 2,3464 | Panthéon; kummankaan tarinan oma osoite ei ollut vapaana (Vrain-Lucasilla on jo piste, Versailles on rajauksen ulkopuolella) |

**Koordinaatteja ei keksitty.** Neljä pistettä istuu kartan omissa
pisteissä, Abbesses ja Élysée ovat julkisia osoitteita, ja piste on
aina paikkatietoa — ei kortin väite. Päällekkäisyys hoidetaan talon
tavalla `nimiPuoli`- ja `siirto`-kentillä, ei koordinaattia siirtämällä
(js/nahtavyydet.js:456: *"KOORDINAATTIA EI SIIRRETÄ"*).

`node tools/tarkista-karttapisteet.mjs pariisi`: kaikki 31 pistettä
maalla, mittajana vapaana, exit 0. Numeroympyröiden peitto raportoi
"HARKITSE KOHTEEN VAIHTOA" Eiffel-tornin pinolle (torni, Torni
romuraudaksi, Torni 1888, 72 nimeä) — **sama tila kuin ennen erää**,
sillä pino oli jo 100 % päällekkäinen kahdella pisteellä, eikä luku
vaikuta työkalun paluuarvoon. Kirjattu havaintona, ei korjattu.

## 7. AVOIMET — kaksi asiaa Fablen päätettäväksi

### 7.1 Patonki: suunnitelma sanoi pääkarttaa, omistajan oma sääntö sanoi ei

Luku 4.7 sijoitti patongin **pääkartalle kaupungin viereen**. Tein sen
ensin niin (paikaksi Pariisin oma laatta, jolloin js/fokusniput.js
siirtää merkin katkoviivan päähän kaupungin viereen — juuri omistajan
kuvaama liike). **`npm test` kaatui**: omistajan sääntö 2.9.2026
(*"nuo karttanostot jotka ovat kohdekaupunkien kohdalla piti viedä pois
pääkartalta"*) on koneellistettu tests/nostot-kartalla.test.mjs:ään
ehdoksi *"kaupungin kohdalla pääkartalle jäävien luku saa laskea muttei
kasvaa"* (49 > 48).

Ratkaisin sen **kohdekartan hyväksi**, koska omistajan kolmesti
sanottu sääntö painaa enemmän kuin suunnitelman yksi ehdotusrivi, ja
koska vaihtoehto olisi ollut heikentää vartiota, joka on juuri sitä
sääntöä varten. Jos omistaja haluaa sen sittenkin pääkartalle, muutos
on kaksi riviä:

1. poista js/packs/maakartat.js:stä `KAUPUNKIKARTAT.pariisi.kohteet`
   -rivi `{ nimi: 'Paras patonki', … nosto: 'nosto-pariisin-patonki' }`;
2. vaihda js/packs/fokusvirta-pariisi.js:ssä `pariisin-patonki`in
   `paikka.laudat` Pariisin omiin lautakoordinaatteihin
   (`maailmankartta: { x: 5911.1, y: 1440.1 }`, `europe: { x: 256, y: 609 }`),
   jolloin syy on kirjattu *"ankkuri on kaupungin laatta"*;
3. **ja nosta tests/nostot-kartalla.test.mjs:n luku 48 → 49** perustelun
   kanssa. Sitä en tehnyt omin päin.

Sivuvaikutus, joka jäi: pääkartan merkkimäärä Ranskassa on 20 eikä 21,
eli tehtävänannon budjetista jäi yksi merkki käyttämättä.

### 7.2 Kansisivun patonki jäi lehteen — kulttuurivisa vaatii sen

Pariisin **kulttuurivisa** (*"Mitä pariisilainen leipuri saa
palkinnoksi, jos voittaa kaupungin patonkikilpailun?"*,
js/packs/europe-kulttuuri.js) **avaa aarteen**, ja
tests/lehdet.test.mjs vaatii, että visan vastaus löytyy kansisivun
jutuista. Kun tyhjensin kansisivun, testi kaatui. Jätin siksi tuon
yhden noston kansisivulle; sama teksti on nyt myös kartalla nostona
`pariisin-patonki`. Kaksoiskappale purkautuu itsestään sinä päivänä,
kun kansisivu jää pois ja visa siirtyy ison pop-upin loppuun
(suunnitelman luku 4.7) — se on js/lehti.js -työtä eikä tämän erän.

### 7.3 Muut avoimet

4. **Lähizoomiportti puuttuu yhä.** Suunnitelman luku 4.5 ehdotti
   kenttää `nosto.lahi`. Sitä ei ole: portti on koko kerroksen portti
   (`LEHDEN_VAHIN_OSUUS = 0.5`, js/fokuskohteet.js:3924 ja
   `paivitaNakyvyys` :4012; pallolla sama js/pallolauta/nostot.js:255–259,
   461). Per-nosto-porttia ei löydy mistään. **En rakentanut sitä**,
   kuten tehtävänanto ohjeisti — kirjaan sen tähän. Käytännössä uudet
   nostot ovat kohdekartalla, joten ne eivät ole pääkartan
   ruuhkaongelma tällä erällä.
5. **Nostotasoa ei poltettu uudelleen.** Suunnitelman riski 2 ja luku
   3.4 sanovat, että nostotaso on poltettava samassa PR:ssä, jos nostot
   ovat poltettuja laattoja. **Tämän erän nostot eivät ole pääkartalla
   lainkaan** (kaikki kuusi ovat kohdekartalla), joten pääkartan
   nostotasoon ei tullut yhtään uutta merkkiä eikä R2-ajoa tarvita.
   Varmistin sen savukkeella: pallon osumissa Pariisin päällä ovat
   `millaun-silta, chambord, loire, carcassonnen-linnoituskaupunki,
   lascaux, chartresin-katedraali, skandaali-kaulanauhajuttu-1785,
   elaintaky-FRA, elaintaky-DZA` — ei yhtään uutta. Jos 7.1 ratkaistaan
   pääkartan hyväksi, **silloin nostotaso on poltettava**, ja täsmälliset
   syötteet ovat: pakka `maailmankartta`, maa `FRA`, uusi merkki
   `nosto-pariisin-patonki` (symboli `ruoka`, nimiö "Paras patonki").
6. **"Pariisin vuosisadat" on kuvaton kortti.** Lehden kummankin jutun
   kuva on R2-ämpärin kuvajonossa
   (`skandaali-kaulanauhajuttu-1785.jpg`,
   `skandaali-vrain-lucas-kirjevaarennokset.jpg`), eikä nostokortin
   kuvakenttä kelpuuta sitä: `osoite` on repon oma tiedosto
   (tests/fokusvirta.test.mjs lukee levyn) ja `tiedosto` on
   Commons-nimi (js/fokusnosto.js `asetaNostonKuva`). Kokeilin
   `ampari`-kenttää — se kaataa `asetaNostonKuva`n. Kuvaton nosto
   aukeaa suoraan tekstikorttina (js/fokusnosto.js:1062) ja näyttää
   hyvältä (kuva `karttauudistus-5-nosto-vuosisadat.png`). Kuvan
   lisääminen on kuvatyötä, ei tämän erän työtä.
7. **Sivujen 2 ja 3 lehtitehtävien vastaukset eivät ole enää samalla
   sivulla.** Piaf-kysymys (sivu 2, AARTEEN AVAUS) ja Guimard-kysymys
   (sivu 3, JULISTE) ovat paikallaan ja toimivat, mutta niiden
   vastaukset ovat nyt korteissa `pariisi-soi` ja `guimardin-metro`
   kartalla. Se on uudistuksen tarkoitus (lehti tyhjenee kartalle),
   mutta jos Fable haluaa vastauksen pysyvän lukuetäisyydellä, tehtävät
   kannattaa siirtää ison pop-upin loppuun samalla kertaa kuin
   kulttuurivisa (7.2).
8. **Marseille on yhä ohut** (2 osastoa, 5 nostoa) — suunnitelman luku
   4.6:n oma huomio, ei tämän erän työtä.

## 8. Savukeajot

`tools/savukkeet/savuke-pariisin-nostot.mjs` (uusi; rivi lisätty
tools/savukkeet/README.md:hen). Vartiot 0–3 ajetaan Nodessa pelin
omilla funktioilla (tools/tarkista-nostopaikat.mjs), 4–6 selaimessa
pallolaudalla, ruutu 390 × 844, deviceScaleFactor 2.

### Vihreä ajo (koodi sellaisenaan)

```
INFO  Ranska pääkartalla / kohdekartalla: 20 / 17
OK    0a. pääkartan merkkejä Ranskassa ≤ 21
OK    0b. kohdekartan merkkejä Ranskassa ≤ 17
INFO  uusia nostoja: 6 (pariisin-72-nimea, guimardin-metro, notre-damen-kukko, pariisin-patonki, pariisi-soi, pariisin-vuosisadat)
OK    1. jokaisella uudella nostolla on kohdekarttapiste
OK    1b. yksikään uusi nosto ei ole pääkartalla
INFO  Pariisin nostot / minikysymykset: 9 / 3
OK    2. minikysymys joka kolmannessa nostossa
INFO  vastakoe: ilman pistettä pää / kohde: 20 / 16
OK    3. VASTAKOE: kohdekarttapisteen poisto vie nostolta karttapaikan
OK    3b. piste palautui ajon jälkeen
OK    pallolauta aukesi
OK    1c. yksikään uusi nosto ei ole pallon osumissa
INFO  pariisin-72-nimea: kappaleita 2, merkkejä 537/537, visa ei
OK    4b. pariisin-72-nimea: kortin teksti täsmää lähteeseen sanatarkasti
INFO  guimardin-metro: … merkkejä 500/500 · notre-damen-kukko: 537/537, visa on
INFO  pariisin-patonki: 580/580 · pariisi-soi: 976/976 · pariisin-vuosisadat: 1421/1421, visa on
OK    4b. (kaikki kuusi) kortin teksti täsmää lähteeseen sanatarkasti
INFO  kaupunkilehden kohdekartta: pisteitä 31, selitteitä 31
OK    5. kaupunkilehti avautuu ja kohdekartta piirtää pisteensä
INFO  kaupunkilehden sivu 2: {"nostoja":0,"tehtava":true,"tekstia":18729}
OK    6. sivu 2 avautuu ilman nostoja mutta tekstin ja tehtävän kanssa
INFO  kaupunkilehden sivu 3: {"nostoja":0,"tehtava":true,"tekstia":18831}
OK    6. sivu 3 avautuu ilman nostoja mutta tekstin ja tehtävän kanssa
OK    ei sivuvirheitä

25/25 läpi
```

### Punainen ajo (VASTAKOE: yksi kohdekarttapiste poistettu datasta)

Muutos: js/packs/maakartat.js:stä poistettiin `Metron sisäänkäynti`
-piste. Muuta ei koskettu; tiedosto palautettiin heti ajon jälkeen
(`node tools/laske-karttanostot.mjs` todentaa palautuksen).

```
INFO  Ranska pääkartalla / kohdekartalla: 21 / 16
FAIL  1. jokaisella uudella nostolla on kohdekarttapiste — guimardin-metro
FAIL  1b. yksikään uusi nosto ei ole pääkartalla — guimardin-metro
FAIL  1c. yksikään uusi nosto ei ole pallon osumissa — nosto-guimardin-metro, …
```

Kolme vartiota kaatuu ja muut pysyvät vihreinä: **karsintasääntö
todella palautti noston pääkartalle** (20 → 21), eli savuke mittaa
juuri sen, mitä väittää mittaavansa. Savukkeen oma vartio 3 tekee
saman kokeen ajossa toisella nostolla (`pariisin-patonki`), jossa
kaupunkinostojen katto pitää noston poissa pääkartaltakin — nosto
menettää karttapaikkansa kokonaan.

### Erän 6 savuke yhä vihreä

`savuke-nostovisa.mjs`: **10/10 läpi** — kiintiövartio kestää poolin
kasvun kolmesta yhdeksään (3 visaa ≥ ⌊9/3⌋).

## 9. Portit

| portti | tulos |
| --- | --- |
| `npm test` | `# pass 3295`, `# fail 0`, skipped 13 (3308 testiä) |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `node tools/tarkista-niputus.mjs` | 388 moduulia, 4192 julistusta, ei törmäyksiä |
| `node tools/tarkista-savukkeet.mjs` | 1562 ui-viittausta, ei puuttuvia nimiä |
| `node tools/tarkista-nostopaikat.mjs --lyhyt` | ilman karttapaikkaa 0, exit 0 |
| `node tools/tarkista-karttapisteet.mjs pariisi` | 31 pistettä maalla, exit 0 |
| `node tools/build-standalone.mjs` | dist/matkakirja.html 31 832 kt (ei committoitu) |
| `grep -rn '^<<<<<<<' js css tests tools` | tyhjä |

## 10. Kuvakaappaukset

- `docs/raportit/kuvat/karttauudistus-5-kohdekartta.png` (149 kt) —
  Pariisin kohdekartta kaupunkilehdessä, 31 pistettä.
- `docs/raportit/kuvat/karttauudistus-5-nosto-vuosisadat.png` (71 kt) —
  uusi kortti "Pariisin vuosisadat" auki, otsake HISTORIA.
- `docs/raportit/kuvat/karttauudistus-5-lehden-sivu.png` (253 kt) —
  tyhjennetty sivu 2 (Musiikki): masto, johdanto ja lehtitehtävä
  paikallaan, ei nostoja.

## 11. Muutetut tiedostot

| tiedosto | muutos |
| --- | --- |
| `js/packs/fokusvirta-pariisi.js` | kuusi uutta `takynostot`-riviä (3 → 9), kaksi uutta `visa`-kenttää. `lehtitehtavat` ennallaan |
| `js/packs/maakartat.js` | kuusi uutta `KAUPUNKIKARTAT.pariisi.kohteet`-riviä |
| `js/packs/nahtavyysjutut.js` | kuusi uutta `pariisi`-juttua, teksti = noston `lunastus` `\n\n`-liitoksena (tests/nostot-kartalla.test.mjs vertaa merkki merkiltä) |
| `js/packs/kulttuuri-kategoriat.js` | `pariisi`: kansiosaston nostot 4 → 1 (patonki, ks. 7.2), musiikin 3 → 0, historian 7 → 0; perustelut kommentteina. Osastoja, johdantoja eikä tehtäviä ei poistettu |
| `tools/savukkeet/savuke-pariisin-nostot.mjs` | uusi savuke |
| `tools/savukkeet/README.md` | yksi rivi |
| `docs/raportit/kuvat/karttauudistus-5-*.png` | kolme kaappausta |

**Mitä EI tehty** (tehtävänannon rajat pidetty): js/pollo.js,
js/livia-*.js, js/lehti.js, js/fokusmitat.js, js/pallolauta/lauta.js,
js/pallolaatat.js, js/laattapyramidi.js, js/ui.js, js/rules.js,
js/game.js, js/fokusvirta.js ja js/fokuspiste.js ovat koskemattomia.
Karsintasääntöä (js/fokuskohteet.js) ei muutettu. Versiota ei nostettu,
dist/:iä ei committoitu.
