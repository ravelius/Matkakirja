# Kuvatekstikorjaukset koodissa (SK 11.11.2026 klo 22.xx)

KK:n päätökset: `Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261111-kuvatekstikorjaukset-paatokset.md`. Muutos: `js/packs/kulttuuri-kategoriat.js` (avauskuvat, 66 kuvaa lyhyt/selite; kentät kirjoitettu yhdeksi merkkijonoksi, lähteenä ehdotus-JSON `kuvatekstikorjaukset-ehdotus-20261111.json`, jossa nyt KK:n lopulliset sanamuodot). Äänitystä ei tarvita. Testit (354 kpl: avauskortti, hero-viitteet, lehdet, sisaltopaketti, vienti ym.) läpi.

## Kuva katsottu (ei vain tiedostonimi tai Commonsin luokka) – kuva ≠ teksti -korjaukset
Katsottu itse kuva mediasta: Madrid #9, Berliini #8, #10, Barcelona #8, Lontoo #7, Dublin #9 ja #11, Istanbul #11 ja #12, Lissabon #5, #8, #9 (ja #4), Rooma #9. Kaikissa teksti vastaa nyt kuvaa. Poikkeus: Barcelona #8: kuva näyttää Ciutat Vellan kattoja, Ramblaa, satamaa ja merta (ei Eixamplen ruudukkoa), joten KK:n hyväksymän "Eixample kasvoi vanhan kaupungin ympärille" -tekstin sijaan: "…Kuva on otettu katolta, ja näkymä aukeaa vanhan kaupungin kattojen yli satamaan ja merelle." KK katsoo, jos haluaa toisin.
Wien #6 Kahlenberg: kuva katsottu: näkyvät Tonava, Tonavatorni (vasemmalla) ja Tapanin tuomiokirkon torni (oikealla keskellä): kuvateksti pitää, EI muutosta. Lontoo #7: georgiaaninen asuinkatu sateessa, kaasulyhdyt: teksti sopii.
Lissabon #4 (Kauppatori, kuvassa Baixan korttelit): selitteeseen lisätty "Jälleenrakennetun alakaupungin taloihin rakennettiin joustava puuhäkki, joka tärisee muttei kaadu." Metrofakta pois.

## Krakova 1764 → 1734
- `js/packs/kulttuuri-kategoriat.js` Krakova #1: lyhyt ja selite → "vuoteen 1734 asti".
- `js/packs/fokusvirta-krakova.js` rivi 660 (kommentti): 1764 → 1734.
Muita Wawelin kruunajaisvuoden 1764 esiintymiä ei löytynyt (git grep js, data, tests).

## Lisäyksiä
- Edinburgh #9 ja Istanbul #9: lyhyt kuvateksti puuttui kokonaan; kenttä lisätty ("Edinburghin linnan muureilta näkyy uusikaupunki, jonka rakentaminen alkoi 1767." / "Süleymaniyen moskeija kohoaa vanhankaupungin kolmannella kukkulalla Kultaisen sarven yllä."). Tukholma #4 ja #6 puuttuvat yhä lyhyt-kentästä (ei tässä erässä).
- Introrivi Dublin #3: "Pyhän Patrickin katedraali · 1220–1260" (ei n.). Dublin #2 1854, Marseille #2 1852–1893, Varsova #2 "1619, uudelleen 1984" olivat jo oikein.
