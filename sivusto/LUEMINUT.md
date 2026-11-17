# Esittelysivusto

Pelin julkinen esittelysivu. Ei riippuvuuksia, ei rakennusvaihetta, ei verkkokirjasimia.

## Tiedostot
- `esittely.html` (repon juuressa): suomenkielinen etusivu. Julkaisussa tästä tulee `index.html` ja pelistä `pelaa.html` (sama kansio, polut eivät muutu).
- `en/index.html`: englanninkielinen etusivu (sama rakenne ja kuvat, tekstit käännetty). Kun suomenkielistä sivua muutetaan, sama muutos tehdään englanninkieliseen.
- `sivusto/sivusto.css`, `sivusto/sivusto.js`: molempien kielten yhteiset tyylit ja skripti. Skripti valitsee päivälaskurin sanan sivun `lang`-attribuutista.
- `sivusto/kuvat/`: pienennetyt kuvat; `TIEDOSTOT.md` kertoo jokaisen lähteen.

## Esikatselu
```
python3 -m http.server 8791 --bind 127.0.0.1
```
Avaa http://127.0.0.1:8791/esittely.html tai http://127.0.0.1:8791/en/.

## Linjat
- Sivulla ei ole linkkiä web-peliin. Yläpalkissa lukee "Tulossa App Storeen". Ei päivämääriä, hintoja eikä lupauksia.
- Pelin nimi ei käänny: englanninkielisellä sivulla "Matkakirja" ja alaotsikko "and the Forgotten Treasure".
- Kieli vaihdetaan yläpalkin lipuista (Suomi, Britannia); liput on piirretty koodilla (SVG), ei kuvatiedostoja.
- Artikkelit eivät ole vielä sivulla; ne lisätään, kun tekstit ja kuvien oikeudet on hyväksytty.
- Uusi kuva lisätään vasta, kun sen lähde ja lisenssi on tarkistettu ja kirjattu alaosan kohtaan Kuvien lähteet.
