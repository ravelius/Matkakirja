# Pulu MKD: raportti

- Vastauksia: vaihe 1 = 35 (7 kohtaa × 5), vaihe 2 = 66; yhteensä 101.
- Kesto: noin 11 min (data, 3 agenttia: 2 rinnakkain vaiheessa 1, 1 vaiheessa 2).
- Agenttien tokenit yhteensä: noin 364 000 (74 706 + 93 879 + 195 521), Sonnet, effort low.
- Tarkistukset:
  - tarkista-era vaihe 1: 4 virhettä (käsitemäärä 0–1 neljässä vastauksessa: 6.2, 6.5, 7.2, 7.3); korjattu lisäämällä [[linkit]], uusinta 0 virhettä.
  - tarkista-era vaihe 2: 4 virhettä (käsitemäärä 1: kohdat 3, 4, 5, 26); korjattu, uusinta 0 virhettä.
  - tarkista-valmis: 0 virhettä, 0 varoitusta (lopuksi). Ennen vaihetta 2 näkyneet "ei lisaa-avainta" -virheet johtuivat vain puuttuvasta vaiheesta 2.
- Faktojen pistokoetta (30 vastausta) ei ajettu tässä ajossa.
- Huomio: lataa-data.sh:n v625 antoi 404 (vanhentunut), data haettu versiosta v653 (skriptiä ei muutettu repossa). fokuskohteet-mkd.json ei ole olemassa (skripti ohittaa).
- Paketti: pulu-esigenerointi/MKD/MKD.json (päivitti myös pulu-esigenerointi/maat.json, vain MKD-rivi).

## Pistokoekorjaukset 10.10.

Sisältökirjurin pistokokeen yhdeksän korjausta (Päätoimittajan jatko-ohje) tehtiin sanatarkasti kaikkiin vaiheen 1 ja 2 vastauksiin ja jatkoihin, joissa fakta toistui; taivutus ja lauseyhteys sovitettu:

1. Ohridinjärven ikä (1,4 milj. vuotta; vaihe 1: 1.1, vaihe 2: #2).
2. Ohridin Unesco-merkintä 1979/1980/2019 (1.5, #4, #6, #9).
3. Pyhän Andreaksen luostari 1300-luvun loppu, 1388/1389 (2.2, #12, #13).
4. Stobin municipium 69 jaa., Vespasianus; kysymys 3.3 korjattu (3.3, #24).
5. Herakleian narteksin mosaiikki 400-luvun loppu–500-luvun loppu (4.4, #38, #39).
6. Mavrovo: Medenica 2 160 m, kansallispuisto 1949/1952 (5.3, 5.4, 5.5, #43, #45).
7. Kokino 1 013 m, Kumanovon koillispuolella (6.3, #49).
8. Skopjen vanha rautatieasema (valmistui 1940, travertiinijulkisivu, pylväikkö) (7.1).
9. Scupi, Vardar ja Kale (7.5, #14, #40, #46, #66; Justinianus-väite poistettu, "lähes kokonaan" poistettu Scupin yhteydestä, #26 vastaavasti).

Sivuvaikutukset: linkit säilytetty vaiheen 1 lisaa-avaimiin sopiviksi (esim. [[Kumanovosta]], [[Mavrovon kansallispuistoon]], [[Jugoslavian]]); yksi vaiheen 2 jatkokysymys ("Justinianus I:n hallitus") vaihdettu muotoon "Mitä Scupista tiedetään?".
Tarkistukset korjausten jälkeen: tarkista-era vaihe 1 ja 2: 0 virhettä; tarkista-valmis: 0 virhettä, 0 varoitusta. Paketti MKD.json koottu uudelleen.
