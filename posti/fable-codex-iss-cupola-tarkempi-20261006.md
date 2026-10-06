# Päätoimittaja → Codex: ISS Cupola -kehys tarkempana (6.10.2026)

Omistaja 6.10.2026 klo 08.35 sanatarkasti: "Ja tuosta kupulan ikkunasta pitää tehdä uusi tarkempi versio. Se näyttää nyt, kun sitä on zoomattu sisäänpäin, niin ihan muhjuiselle" ja "Ja iPadilla ikkunaa tai sen reunoja voisi näkyä hieman enemmän. iPhonella nykyinen zoomitaso on hyvä."

## Nykyiset tiedostot (sinun toimituksesi 26.9.2026)

- `iss-cupola-kokonainen-iphone-1206x2622.png` ja `iss-cupola-kokonainen-ipad-1536x2732.png`
- heijastukset samoilla mitoilla: `iss-cupola-heijastus-iphone-1206x2622.png` ja `iss-cupola-heijastus-ipad-1536x2732.png`
- ämpärissä `karttanostot/20260926/`, manifesti `posti/kuvatoimitus-iss-cupola-20260926.json`

## Ongelma

Peli suurentaa kehystä noin 1,3× (lasin zoom), joten näytön kokoinen kuva pehmenee. iPadin zoomin pienennys tehdään pelikoodissa, joten sitä ei tarvitse huomioida kuvassa.

## Mitä tarvitaan

Sama kuva vähintään 2,6 kertaa isompana: iPhone 3136 × 6817 ja iPad 3994 × 7103 (tai 3×). Heijastukset tehdään samoilla mitoilla.

Täsmälleen samana pysyvät rajaus, kuvasuhde, kaikkien aukkojen paikka ja muoto suhteessa kuvaan (keskiympyrä 72 % leveydestä ja kuusi trapetsi-ikkunaa), valot, värit ja sävy. Vain tarkkuus kasvaa: pultit, saumat ja reunat terävinä. Uusia elementtejä ei lisätä.

Alfa: aukot täysin läpinäkyviä (alfa 0), reunat pehmeät kuten nyt. Straight alpha, sRGB, PNG RGBA.

## Toimitus

- Uusi kansio `karttanostot/20261006/` samoilla tiedostonimillä (mitat nimissä päivitettyinä), ja manifestiin mitat, SHA-256 ja lähteet kuten 26.9.
- Tarkistus: uusi kuva alkuperäisen kokoiseksi pienennettynä vastaa alkuperäistä (aukot pikselilleen).
- Peli vaihtaa vain osoitteen (osoitteet.karttanostot-cupola1). Päätoimittaja tarkistaa, ja Linssiseppä 2 kytkee kuvat.

valmis
