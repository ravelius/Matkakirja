# Viesti Fablelle: hahmotelman 12 varastokohdetta kartalle (PAATOKSET 33 + 34)

Opus-erä 18.9.2026, haara `claude/bold-ride-vow4ki-hahmotelma-12`, base
`claude/bold-ride-vow4ki` (main v1944 + Raamattu 8967a169). Versiota ei nostettu,
nostotasoa ei poltettu, PR:ää ei avattu — uudet nostot ovat eläviä.

## 1. Mitä tehtiin

`js/packs/hahmotelma-fra.js` sai ne **12 kohdetta**, jotka edellinen erä jätti
varastoon (docs/raportit/viesti-fable-ranska-hahmotelma-20260917.md, osio 4).
Pakan muoto on sama kuin 15 aiemmalla rivillä: vain `nimi` ja yhden rivin `nappi`,
leipätekstinä `runko(alaotsikko)` eli "… Sisältö tulossa.", `hahmotelma: true`,
`lahi: true`. **Ei kuvia, ei visoja, ei sisältötekstiä, ei omia faktaväitteitä** —
jokainen alaotsikko on yksi lyhyt, historiallisesti turvallinen rivi vuoden 1873
näkökulmasta.

Jokaiselle vietiin **lukittu ankkuri** `js/packs/nostoankkurit-fra.js`:ään samalla
työkalulla kuin ennen: `node tools/lukitse-nostoankkurit-maalle.mjs`
(12 uutta, 0 siirrettyä). Taulussa on nyt **62 ankkuria** (oli 50).

## 2. Lisätyt kohteet

Asteet en-Wikipedian rajapinnasta (`action=query&prop=coordinates`, haettu
18.9.2026), laudan luvut pelin omalla kaavalla (`tools/johda-maastokohteet.mjs`
`laudat`). Yksikään ei ole arvattu. Kaikki osuvat Ranskan lehden rajaukseen
(`osuuLehteen`), kaikki ovat maamaskin mukaan maalla (`tools/maamaski.mjs`),
eikä yksikään ole minkään Ranskan kaupungin sisäpuolella (`onKaupunginSisainen`,
11 keskusta: Pariisi, Marseille, Lyon, Bordeaux, Lille, Strasbourg, Nizza,
Toulouse, Nantes + siirtomaat).

| nimi | tyyppi | lat | lng | lähde (en-Wikipedia) | alue | ankkurin etäisyys omasta pisteestä |
| --- | --- | --- | --- | --- | --- | --- |
| Mont Ventoux | vuori | 44,17444444 | 5,27888889 | "Mont Ventoux" | Provence | 0,1 km (lauta→asteet -pyöristys) |
| Puy de Sancy | vuori | 45,52833333 | 2,81416667 | "Puy de Sancy" | Massif Central | 0,2 km |
| Amboisen linna | kulttuuri | 47,41368 | 0,98603 | "Château d'Amboise" | Loire | 0,1 km |
| Nîmesin areena | historia | 43,835 | 4,36 | "Arena of Nîmes" | Languedoc | 0,1 km |
| Rouenin tuomiokirkko | kulttuuri | 49,4402 | 1,095 | "Rouen Cathedral" | Normandia | 0,1 km |
| Rocamadour | historia | 44,8003 | 1,6186 | "Rocamadour" | Quercy | 0,0 km |
| Saint-Émilion | ruoka | 44,8936 | −0,1547 | "Saint-Émilion" | Akvitania | 0,1 km |
| Cognac | ruoka | 45,7 | −0,33 | "Cognac, France" | Charente | 0,1 km |
| Vichy | historia | 46,1278 | 3,4267 | "Vichy" | Bourbonnais | 0,2 km |
| Biarritz | meri | 43,48 | −1,56 | "Biarritz" | Baskimaa | 0,1 km |
| Canal du Midi | tekniikka | 43,35071 | 1,81862 | "Seuil de Naurouze" | Lauragais | 0,1 km |
| Le Puy-en-Velay | historia | 45,04444444 | 3,88472222 | "Le Puy-en-Velay" | Velay | 0,2 km |

Ankkuri on kunkin noston OMA datapaikka (työkalun `omasta paikasta` -haara);
etäisyys tulee vain siitä, että ankkuri luetaan laudan koordinaateista takaisin
asteiksi. Yksikään ei osunut mereen, joten yhtään ei tarvinnut siirtää.

### Kaksi paikkapäätöstä, jotka tein harkinnalla

- **Biarritz on rannalla, ankkuri on maalla.** `tools/maamaski.mjs` hyväksyi
  kaupungin oman pisteen (43,48 / −1,56) maapisteeksi sellaisenaan, joten siirtoa
  ei tarvittu. Vartio 2 (yksikään ankkuri ei ole merellä) on vihreä.
- **Canal du Midi ei ole Toulousessa.** Kanavan omalla en-artikkelilla ei ole
  `prop=coordinates`-lukua, ja kanavan päätepiste Toulousessa olisi osunut
  Toulousen kaupunkimerkin päälle. Piste on siksi kanavan vedenjakajalla
  **Seuil de Naurouzessa**, Toulousen ja Carcassonnen välissä (42,4 km
  Toulousesta, 47 km Carcassonnen linnoituskaupungista) — täsmälleen se väli,
  jonka pyysit. Carcassonne ei siis vie paikkaa.

### Otsikkorivit sellaisina kuin ne ovat kortilla

Mont Ventoux *"Provencen tuulinen huippu, 1 910 m"* · Puy de Sancy *"Massif
Centralin korkein huippu"* · Amboisen linna *"Kuninkaiden linna Loiren yllä"* ·
Nîmesin areena *"Roomalainen amfiteatteri yhä pystyssä"* · Rouenin tuomiokirkko
*"Normandian goottilainen katedraali"* · Rocamadour *"Pyhiinvaelluskylä
kallioseinämässä"* · Saint-Émilion *"Viinikylä ja kallioon hakattu kirkko"* ·
Cognac *"Charenten kaupunki, joka antoi nimen polttoviinille"* · Vichy
*"Kylpyläkaupunki kivennäislähteiden äärellä"* · Biarritz *"Merikylpylä
Biskajanlahden rannalla"* · Canal du Midi *"Kanava, joka yhdistää kaksi merta"* ·
Le Puy-en-Velay *"Kaupunki tulivuorenneulojen keskellä"*.

Jos jokin rivi ei istu kaanoniin, se on yhden merkkijonon vaihto pakassa — riviä
käytetään sekä napissa että kortin leipätekstissä.

## 3. Mittaus

Mittari `tools/savukkeet/savuke-ranskan-nostot-lukossa.mjs` (Mac, Chrome for
Testing, dpr 2, portti 8812). Ajot: **jälkeen** molemmilla ruuduilla, **ennen**
1400 px:llä vertailuksi (pakat palautettuna hetkeksi mainin tilaan).

```
                                   ENNEN            JÄLKEEN
Ranskan pääkartan rivejä           77               89
kaupungin ULKOPUOLISIA nostoja     48               60     (datassa, pelin oma sääntö)
  näistä hahmotelmapakan osuus     15               27
lukittuja ankkureita taulussa      50               62
  ankkureita merellä               0                0
1400 px DOM-merkkejä               40               40
1400 px nostopisteitä              44 (polt. 12)    44 (polt. 11)
1400 px puuttuvia (ei riviä
  eikä aihemerkin jäsenenä)        4                16
1400 px kaupunkimerkkejä           7                7
390 px nostopisteitä               —                43 (polt. 8)
390 px kaupunkimerkkejä            —                5  (PÄÄTÖKSET 17, korkeuteen sovitus)
vedossa liikkuvia (200 px)         0                0   (molemmat ruudut)
nimiön ruutuvektori vedon yli      sama ±1 px       sama ±1 px
```

**Savuke: 10/10 vartiota läpi** (jälkeen-ajo, 390 px + 1400 px). Ennen-ajo
1400 px: 7/7. Tehtävänannon luku "43 → 55" toteutuu raportin 17.9. määritelmällä
(17 maastokohdetta + 11 maalehtinostoa + 27 hahmotelmaa = 55); pelin oma laajempi
sääntö (`paakartanNostot` miinus kaupunkipisteet miinus `onKaupunginSisainen`)
antaa 48 → 60. Molemmat ovat sama muutos, +12.

### Se, mikä EI toteutunut: kartan nostopisteet eivät nousseet yli 50:n

Tavoite oli 1400 px ≥ 50 nostopistettä. **Mitattu 44 ennen ja 44 jälkeen.**
Juurisyy on `NOSTOJEN_KATTO = 40` (js/pallolauta/nostot.js rivi 81, viite
karttapallo.md luku 6): pallolla piirtyy enintään **40 elävää merkkiä
kerrallaan**. Mittaus todistaa sen suoraan — DOM-merkkejä oli 40 sekä ennen että
jälkeen, ja "puuttuvia" nousi 4 → 16. Uudet kaksitoista eivät siis lisää kartalle
pisteitä, vaan syrjäyttävät yhtä monta vanhaa (mm. Pic du Midi, Canigou, Verdon,
Saint-Malo, Pointe du Raz, Étretat, Bonifacio, Ajaccio ja itse Biarritz jäivät
1400 px:n jälkeen-ajossa listan ulkopuolelle).

Katon nosto on koko pallon linjaus (se koskee jokaista maata, ja se on
karttapallo.md:n dokumentoitu luku), joten **en muuttanut sitä omin päin** —
tämä on sinun päätöksesi. Kaksi huomiota päätöksen tueksi:

1. Poltettu muste ei kuulu kattoon: kun nostotaso poltetaan uudelleen (kohta 5,
   PAATOKSET 33 TARKENNUS 2), näistä 12:sta tulee mustetta, ja katto vapautuu
   samalla määrällä eläville. **Poltto siis ratkaisee tämän ilman kattomuutosta.**
   Juuri siksi jätin nostotason polttamatta, kuten pyysit — mutta se tarkoittaa,
   että 12 uutta pistettä näkyy kartalla vasta poltton jälkeen.
2. Jos haluat ne näkyviin jo ennen polttoa, katto pitää nostaa (esim. 40 → 60)
   ja mitata uudelleen limitys ja ladonta-aika. Tämä on oma eränsä.

Päivitin savukkeen rajan **35 → 40** (ei 50), koska raja on mittari eikä toive:
mitattu pohja on 43 (390 px), ja 40 jättää kolmen pisteen marginaalin. Perustelu
ja kattoviite ovat savukkeen kommentissa.

## 4. Testit ja tarkistukset

- `node --test tests/*.test.mjs`: **# pass 3625, # fail 0**, skipped 13
  (3638 testiä). Yksi punainen syntyi matkalla ja korjattiin: `vanha-maailma`
  ä/ö-vartio tarttui kommenttiin kirjoitettuun tiedostonimeen
  `nakyvat-kaupungit-fra.js` → kommentti kirjoitettiin ilman tiedostonimeä.
- `node tools/tarkista-kaksoisavaimet.mjs`: **ei kaksoisavaimia**.
- `node tools/build-standalone.mjs`: **ok**, `dist/matkakirja.html` 32 656 kt.
  (dist/ ei mene committiin.) Pakka oli jo `sw.js`:n SHELL-listalla ja
  build-standalonen MODULES-listalla edellisestä erästä, joten niihin ei tarvinnut
  koskea.

## 5. Viereiset havainnot (en korjannut)

1. **`NOSTOJEN_KATTO = 40` on nyt sitova pullonkaula Ranskassa** — ks. osio 3.
   Sama katto odottaa jokaista maata, johon hahmotelmamalli monistetaan
   (PAATOKSET 33 kohta 4).
2. **390 px:llä kaupunkimerkkejä on 5, ei 7** (Strasbourg ja Nizza jäävät
   korkeuteen sovitetun saapumisnäkymän ulkopuolelle). Tämä on jo kirjattu
   sinulle raportissa `viesti-fable-nostot-lukko-k17-20260918.md` eikä muuttunut.
3. **Ankkuritaulun `NOSTOANKKURIT_FRA_KEHYS` sanoo `ruutu: '390x844'`**, mutta
   nämä 12 riviä (kuten edellisen erän 14) eivät tule ruutuvientistä vaan noston
   omasta datapaikasta. Kehysrivi on siis osittain harhaanjohtava; korjaus olisi
   yhden kentän lisäys (`lahde: 'oma paikka' | 'vienti'`) ja kuuluu omaan erään.
4. **Poltettujen määrä vaihteli 12 → 11** 1400 px:n ajojen välillä, vaikka
   laattaa ei poltettu uudelleen. Syy on osumalistan koostumuksen muutos (mikä
   rivi ylipäätään on ruudulla), ei muste. Ei toimenpiteitä, mutta selittää
   miksi pistemäärä pysyi tasan 44:ssä.

## 6. Muutetut tiedostot

- `js/packs/hahmotelma-fra.js` — 12 uutta riviä, `koordinaatinLahde` sai
  hakupäivä-parametrin (kaksi erää, kaksi päivää), otsikkokommentit ajan tasalle.
- `js/packs/nostoankkurit-fra.js` — 12 uutta lukittua ankkuria (50 → 62),
  kirjoitettu `tools/lukitse-nostoankkurit-maalle.mjs`:llä.
- `tools/savukkeet/savuke-ranskan-nostot-lukossa.mjs` — `PISTEITA_VAHINTAAN`
  35 → 40, perustelu ja kattoviite kommenttiin.
