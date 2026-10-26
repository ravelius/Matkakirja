# Merge-pyyntö: natiivi-ui/kirjainvali 239fa84 (sisältää natiivi-ui/aihesivu 40992cb), Natiivi-UI 25.9.2026

Testit: unity-tarkistus 0 virhettä, uss ok, kirjainvali --tarkista 0. Testikäännökset b12o ja b12p (FB234D08).
Pohjana pariteetti-b12-2 730f984 ja intro-palstat 83e75d5, jotka ovat jo junassa; mergettävä niiden jälkeen.

## 1. Kirjainväli (koko UI, Pelikoodarin mittaus 25.9.)
UI Toolkitin letter-spacing ei ole px vaan TextCoren characterSpacing, jonka yksikkö on em/100. Webistä kopioidut arvot
antoivat noin 1/6 harvennuksesta, esimerkiksi JATKA MATKAA oli 123 px leveä, kun webissä 155.
- tyokalut/kirjainvali.py muunsi 153 USS-arvoa: webin X px → X / fonttikoko × 100, ja webin arvo jää kommenttiin
  (`letter-spacing: 15px; /* web 2.4px */`). Merkityt rivit ohitetaan, joten työkalun voi ajaa uudelleen.
- C#: lehden nimiö (0,1 / 0,06 em → 10 / 6) ja paljastuksen nimi (0,05 em → 5).
- tyokalut/tarkista.sh varoittaa merkitsemättömistä arvoista, mutta ei pysäytä käännöstä.
- Aloitusjuliste puhelimella webin `@media (max-width: 700px)` -mitoin (mk-juliste--kapea): nimi 38,85, yla 17,69,
  ala 16,08 ja harvennus 0,18 / 0,14 / 0,1 em. Työpöydän arvoilla harvennus rivitti MATKAKIRJA-sanan.

## 2. Aihesivu (#35, sama rakentaja kaupunki- ja maalehdessä kuten webissä)
Mitat: web-maalehti-aihe-mitat.txt.
- johdanto: riviväli 1,5 ja esisekoitettu #584632
- aikamerkki reunallisena merkkinä, joka rivittyy otsikon alle oikeaan reunaan
- kohdeotsikko American Typewriter Bold #46331f yhdellä rivillä
- kappaleväli 11,2 + rivivälin puolileading (TextCore ei lisää sitä viimeisen rivin alle)
- noston alaväli 22,4 / 17,6 ja lähde 10,56

## Kuvaparit (pariteetti-b12/)
kuvapari-b12p-maalehti-aihe1-iphone.jpg ja natiivi-b12p-aloitus-iphone.jpg (juliste yhdellä rivillä).
