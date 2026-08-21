# Taipei — faktantarkistus

Lähteet tarkistettu 21.8.2026 en-Wikipediasta (`action=raw` + `prop=coordinates`
API, Taipei 101 -artikkeli luettu kokonaan rivi riviltä osiosta "Structural
design" ja kerrostaulukosta).

## 1. Virheet ja korjaukset

Ei löytynyt asiavirheitä nostojen/jaksojen tekstisisällöstä. Kaksi kohtaa
tarkistettu erikseen faktakoostajan omasta pyynnöstä (osio 7, huomio 1):

| Väite | Tulos | Lähde |
|---|---|---|
| Massavaimennin painaa 660 tonnia | **Oikein.** `{{Convert|660|t|ST|0|sp=us}}` — 660 metristä tonnia (short ton -muunnos vain esitystapa). | en-Wikipedia "Taipei 101", osio "Structural design" |
| Massavaimennin sijaitsee n. 87.–92. kerroksen välissä | **Oikein, pienellä tarkennuksella.** Leipäteksti sanoo pallon riippuvan "92nd to the 88th floor"; kerrostaulukossa "Tuned Mass Damper" -rivi kattaa kerrokset 92–87 (rowspan 6). Wikipedian oma teksti ja taulukko eivät ole täysin yhtä mieltä (88 vs. 87 alarajasta), mutta molemmat tukevat nostotekstin "noin 87.–92. kerroksen" muotoilua — ei tarvitse muuttaa. | en-Wikipedia "Taipei 101" |

Muut tarkistetut yksityiskohdat, jotka pitivät paikkansa sellaisenaan:
- "Formosa" on todellakin `#REDIRECT [[Geography of Taiwan]]` — koostaja on
  toiminut oikein käyttäessään kohdeartikkelia.
- Rover-haaksirikko 1867 ja Mudan-tapaus 1871 vastaavat "History of Taiwan"
  -artikkelin tapahtumakuvausta.

## 2. Etäisyydet — oma haversine-laskelma

Vertailupiste: Wikipedian "Taipei"-artikkelin infobox-koordinaatti
25,0375°N 121,5625°E (25°02′15″N 121°33′45″E). Kaikki kohdekoordinaatit
tarkistettu myös MediaWiki-APIsta — ne täsmäävät koostajan taulukkoon,
joten poikkeamat alla johtuvat koostajan omasta käsinlaskennasta, ei
väärästä lähdekoordinaatista.

| Kohde | Koostajan arvio | Oma laskelma (haversine) | Huomio |
|---|---|---|---|
| Taipei 101 | ~0,5 km SE | 0,49 km | OK |
| Chiang Kai-shek -muistosali | ~4,1 km L | 4,13 km | OK |
| Presidentinlinna | ~5,1 km L | 5,10 km | OK |
| Pohjoisportti | ~5,2 km L | 5,29 km | OK (pieni pyöristysero) |
| Ximending | ~5,6 km L | 5,57 km | OK |
| Bangka Lungshan -temppeli | ~6,4 km L | 6,35 km | OK |
| **Dalongdong Baoan -temppeli** | **~5,6 km LP** | **6,17 km** | **Virhe: ~0,57 km / ~10 % liian pieni.** Suunta (luode) on oikea. |
| Shilinin yömarkkinat | ~6,8 km LP | 6,62 km | Pieni ero (0,18 km), ei vaadi korjausta |
| Kansallinen palatsimuseo | ~7,3 km P | 7,33 km | OK |

**Ainoa korjattava luku:** Dalongdong Baoan -temppelin etäisyys on
Wikipedian kaupunkipisteestä n. **6,2 km**, ei 5,6 km. Tämä ei muuta
rajausehdotuksen (osio 4) sisältöä — kohde on joka tapauksessa yksi
"kaukaisemmista" nähtävyyksistä.

## 3. A/B-rajaus

Koostajan analyysi pitää paikkansa: Wikipedian kaupunkipiste osuu
Xinyin/Taipei 101 -alueelle, ja historiallisesti kiinnostavat kohteet
(Pohjoisportti, Presidentinlinna, Ximending, Lungshan-temppeli) ovat
4–6,4 km tästä länteen — vahvistettu omalla laskelmalla yllä. Vaihtoehto
A (keskitä kartta vanhaan kaupunkiin, esim. 25,044°N 121,512°E) on
perusteltu suositus: se tuo suurimman osan historiallisista kohteista
3–4 km:n sisään, ja Taipei 101 sekä palatsimuseo jäävät luontevasti
"kaukaisemmiksi" nähtävyyksiksi. Ei syytä muuttaa suositusta.

## 4. "Antaa olla" -linjan toteutuminen

Käytiin läpi kaikki sivuehdotukset, nostot ja jaksot: hallinnon vaiheet
(1875 prefektuuri, provinssin pääkaupunki, 1895 luovutus Japanille, 1949
väliaikainen pääkaupunki) esitetään kaikki pelkkinä päivämäärinä ja
hallintomuutoksina, ilman nykytulkintaa. Sanoja kuten "de facto
pääkaupunki" tai suvereniteettikiistaa koskevaa sanastoa ei esiinny
missään nostossa, jaksossa tai johdannossa. **Linjaus toteutuu.**

## Yhteenveto

Taipei-faktapohja on pääosin luotettava. Yksi konkreettinen korjaus:
Dalongdong Baoan -temppelin etäisyys keskustasta on n. 6,2 km (ei 5,6 km)
— suunta oikea, vain matka pyöristetty liian pieneksi. Massavaimentimen
luvut (660 t, 87.–92. kerros) varmennettu oikeiksi Taipei 101 -artikkelista.
"Antaa olla" -linjaus toteutuu koko koosteessa; A-rajausehdotus on
perusteltu ja suositeltava sellaisenaan.
