# Esittelysivusto

Pelin julkinen esittelysivu. Ei riippuvuuksia, ei rakennusvaihetta, ei verkkokirjasimia.

## Tiedostot
- `esittely.html` (repon juuressa): suomenkielinen etusivu. Julkaisussa tästä tulee `index.html` ja pelistä `pelaa.html` (sama kansio, polut eivät muutu).
- `sivusto/sivusto.css`, `sivusto/sivusto.js`: tyylit ja skripti.
- `sivusto/kuvat/`: pienennetyt kuvat; `TIEDOSTOT.md` kertoo jokaisen lähteen.

## Esikatselu
```
python3 -m http.server 8791 --bind 127.0.0.1
```
Avaa http://127.0.0.1:8791/esittely.html.

## Linjat
- Sivulla ei ole linkkiä web-peliin. Yläpalkissa lukee "Tulossa App Storeen". Ei päivämääriä, hintoja eikä lupauksia.
- Artikkelit eivät ole vielä sivulla; ne lisätään, kun tekstit ja kuvien oikeudet on hyväksytty.
- Uusi kuva lisätään vasta, kun sen lähde ja lisenssi on tarkistettu ja kirjattu alaosan kohtaan Kuvien lähteet.
