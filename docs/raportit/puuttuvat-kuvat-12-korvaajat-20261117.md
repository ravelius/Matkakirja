# 12 datan viittaamaa puuttuvaa kuvaa: korvaava vai data pois (SK 17.11.2026)

Tehtävä: KK 20.0x (työlista "12 datan viittaamaa kuvaa puuttuu"). Vain docs; uusia kuvia ei generoida ilman omistajan lupaa. Puuttuminen todettu: `tools/vienti/mediakuvat.json` (ämpärin kuvaluettelo, 16 820 avainta) ei sisällä yhtäkään näistä 12:sta, ja repossa ei ole tiedostoja. Korvaajaehdokkaat ovat luettelossa olevia tai repon omia kuvia; **ämpärin Commons-kuvia en ole voinut katsoa silmällä** (vain avain ja koko tiedossa), joten ne ovat ehdokkaita eivätkä valmiita.

## A. Seitsemän miniatyyriä (`js/packs/miniatyyrit.js`, ämpäritunnus ilman tiedostoa; puuttuva kuva putoaa varatäpläksi)

| Piste | Tunnus | Korvaaja ehdokkaana | Suositus |
|---|---|---|---|
| Bukinistit 1859 (pariisi) | `pariisi-bukinistit-1859` | ämpärissä `karttanostot/20260919/fra-maalehti-bouquinistit-11d8e477.jpg` (pelin oma lehtikuva) ja Commons `kuvat/paris-75005-quai-de-montebello-bouquinistes-20071014.jpg` (Montebello, ei Quai Voltaire) | Käytä lehtikuvaa (katso silmällä ensin); muuten data pois |
| Punch 1662 | `lontoo-punch-pepys-1662` | `kuvat/near-this-spot-punch-s-puppet-show-was-first-performed-in-england-and-witnessed-by-samuel-.jpg` (muistolaatta: Punch esitettiin ensi kertaa Englannissa ja Pepys näki sen) | **Korvaaja sopii aiheeseen**; katso silmällä |
| Savusumu 1952 | `lontoo-savusumu-1952` | `kuvat/nelson-s-column-during-the-great-smog-of-1952.jpg` | **Korvaaja sopii aiheeseen**; katso silmällä |
| Händel ja Hendrix | `lontoo-handel-hendrix-brook-street` | `kuvat/george-frideric-handel-by-thomas-hudson.jpg` (vain Händel, ei Hendrixiä) | Kelpaa vain, jos merkki saa näyttää toista kahdesta; muuten data pois |
| Johnson 1755 | `lontoo-johnsonin-sanakirja-1755` | `kuvat/statue-of-hodge---dr-johnsons-cat---in-gough-square-4043318307.jpg` (Johnsonin kissa Gough Squarella, ei sanakirja) | Heikko; data pois, ellei KK hyväksy kissapatsasta |
| Baird 1926 | `lontoo-baird-televisio-1926` | ei sopivaa (`kuvat/lascar-fernsehturm-...` on Berliinin tv-torni) | Data pois |
| Sähkötin 1837 | `lontoo-sahkotin-euston-1837` | ei sopivaa (`kuvat/morse-telegraph.jpg` on yleiskuva) | **Data pois: piste poistuu joka tapauksessa** yhdistämisen vaiheessa A (haara `sk/yhdistaminen-a`, tarina siirtyy Euston Archin nostotaulukkoon) |

"Data pois" = miniatyyrimerkintä pois `miniatyyrit.js`:stä; merkki näkyy silti varatäplänä ja tarina avautuu ennallaan. Vaiheen A haarassa miniatyyritesti on muutenkin punaisella, koska poistettujen pisteiden avaimia on (Lustig 1925, Kaulanauha 1785, Sähkötin 1837 jne.); sama kierros siivoaa nämä.

## B. Viisi loistoaika-kuvaa (`js/packs/monumentit-eurooppa.js`, "Koe ihme" -nappi osoittaa `kohtaamiset/ihmeet/<tiedosto>`)

| Kohde | Tiedosto | Korvaaja | Suositus |
|---|---|---|---|
| Wienin Rotunde (`wienin-rotunde`) | `ihme-wienin-rotunde-loistoaika.jpg` | **Repossa on jo** `assets/kartat/nostot/nosto-rotunde-loistoaika.webp` (Rotunden sisus 1873, silmätarkastettu 29.8., katsottu nyt: rautakupoli, suihkulähde, liput ilman tekstiä) | Käytä sitä: joko ihmekentän osoite repon polkuun tai tiedosto ämpäriin `kohtaamiset/ihmeet/`-nimellä (Julkaisija) |
| Paleis voor Volksvlijt (Amsterdam) | `ihme-paleis-voor-volksvlijt-loistoaika.jpg` | ei kuvaa ämpärissä eikä repossa | Data pois (ihmekenttä pois, nappi piiloon) tai uusi kuva omistajan luvalla |
| Rigi Kulmin Grand Hotel Schreiber | `ihme-grand-hotel-schreiber-rigi-kulm-loistoaika.jpg` | ei | sama |
| Tukholman teollisuuspalatsi 1897 | `ihme-industripalatset-stockholm-1897-loistoaika.jpg` | ei | sama |
| Vanha Minsk | `ihme-vanha-minsk-loistoaika.jpg` | ei (ämpärissä vain nykyiset Minskin maakuntakuvat, ei loistoaikaa) | sama |

## Yhteenveto

- **Korvaaja sopii (katso silmällä):** Rotunde (varma, repossa), Punch 1662, Savusumu 1952, Bukinistit 1859 (lehtikuva) = 4.
- **Heikko korvaaja:** Händel ja Hendrix, Johnson 1755 = 2 (data pois, ellei KK hyväksy).
- **Ei korvaajaa:** Baird 1926, Sähkötin 1837 (piste poistuu muutenkin) = 2 miniatyyriä; Volksvlijt, Rigi, Stockholm 1897, Minsk = 4 loistoaika-kuvaa. Yhteensä 6.
- Uusia kuvia tarvittaisiin vain neljälle loistoaika-kohteelle; generointi vain omistajan luvalla.
- Päätettävää KK:lle: (1) kelpaavatko Punch, Savusumu, Bukinistit ja Rotunde silmäyksen jälkeen, (2) Händel ja Johnson korvaajalla vai data pois, (3) neljälle loistoaika-kohteelle ilman kuvaa: "Koe ihme" -nappi piiloon vai kuva tilaukseen.
