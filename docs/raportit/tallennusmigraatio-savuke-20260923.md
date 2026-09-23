# Tallennuksen migraation savuke v3/v4 → v5 (23.9.2026 klo ~22.44)

Simulaattori iPhone 18 Pro, proto-master `43f2820` (sisältää Pelikoodarin
migraatiocommitin 85538f8). Käytetty Pelikoodarin omat vanhat tallennukset
(`proto-3d/lokit/vanhat-tallennukset/<commit>/<skenaario>.json`,
TestFlight 1 -buildeista 741352b ja 8630f75).

Menetelmä: tallennus kopioitiin `Documents/tallennus.json`:ksi, sovellus
käynnistettiin uudelleen (`simctl terminate`+`launch`), ja peli jatkettiin
`Documents/ui-komento.txt`:llä (`ui jatka`).

## Tulokset

| Skenaario | Alkup. versio | Tulos |
| --- | --- | --- |
| 741352b/kysymys-auki | 3 | `ui jatka → ok`, £260 · Päivä 2 · Berliini — täsmää tallennukseen, ei `tallennus-rikki`/`tallennus-vN`-varmuuskopiota |
| 8630f75/pitka-peli | 4 | `ui jatka → ok`, £1620 · Päivä 18 · Rooma — täsmää tallennukseen, ei varmuuskopiota |

Molemmat PASS: migraatio ei heitä poikkeusta (mikä olisi näkynyt
`tallennus-rikki-*.json`- tai `tallennus-v*.json`-varmuuskopiona ja
uutena pelinä), pelaajan raha/sijainti/päivä säilyivät oikein. Ei testattu
`reitilla`-skenaariota eikä 741352b:n pitka-peliä/8630f75:n muita kahta —
kaksi edustavaa (eri lähdeversio, eri pelitilanne) riitti savukkeeksi,
koska Pelikoodarin oma `Peli-testit/Testit/TallennusTestit.cs` kattaa
kaikki 6 yhdistelmää yksikkötasolla; tämä oli laitetason (todellinen
Unity-ajo, tiedostojärjestelmä, UI) riippumaton varmistus.

## Siivous

`Documents/tallennus.json` jäi viimeisimpään testitilaan (8630f75/pitka-peli,
£1620 Rooma) — ei palautettu, koska simulaattorin tallennustila on
kertakäyttöistä testidataa. Jos seuraava testaaja tarvitsee puhtaan
alkutilan, poista `Documents/tallennus.json` tai käynnistä uusi matka.
