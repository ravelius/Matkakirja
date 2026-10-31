# Sibeliuksen puisto — karttaminiatyyri #1324

Kuva: `assets/kartat/miniatyyrit/helsinki-sibeliuksen-puisto.webp`. 1024 × 1024, häviötön WebP ja todellinen läpinäkyvä alfa. SHA256 `4b2c955bd09149bc806ce784db3d88bfa8e7dd1b031872492b5f7d8501cc730b`. 968888 tavua.

Kallioinen rantapuisto tiiviinä saarekkeena: silokallio, koivut ja männyt, nurmi, polku, puistonpenkki ja kapea yhtenäinen merenkaistale. Ei ihmisiä, monumenttia, putkiveistosta, kasvoreliefiä, nuottitelinettä, tekstiä, taivasta tai maisemataustaa. Kuva on tiivistetty havainnekuva, ei puiston mittapiirros.

## Lähde ja mallit

Tilaus `posti/karttaseppa-codex-helsinki-sibeliuksen-puisto-20261031.md`. Molemmat versiot luettu ja lähdeblobit varmennettu: `7c83e66be32af07d67f7816e657a25a7bb1df011` ja korjaus `493f3e6c93dad54dd39929314e5b928a6a908859`. Käytetyt mallit ovat korjauksen mukaiset repon WebP-tiedostot: `helsinki-kaisaniemen-puisto.webp`, `helsinki-tuomiokirkko.webp`, `helsinki-uspenskin-katedraali.webp`. Kaikkien kolmen tavut, SHA256 ja blobit tarkistettu. Malleista käytettiin tyyliä, kuvakulmaa ja valoa; niissä näkyviä rakennuksia ei kopioitu kuvaan.

## Tuotanto ja vienti

Yksi kokonaan uusi generointi sisäänrakennetulla ImageGenillä. Alkuperäinen PNG säilytetty. Vain mittasuhteet säilyttävä koonmuunnos ja 48 pikselin läpinäkyvä ulkoreuna ennen häviötöntä WebP-vientiä. Ei rajausta, retusointia, alfan avaintamista, kirkastus-, kontrasti- tai värisäätöä. Kaikki alfaarvot ja näkyvät RGB-arvot vastaavat koonmuunnettua PNG:tä; täysin läpinäkyvien pikselien näkymätön RGB voi normalisoitua WebP-pakkauksessa.

Katsottu vaalealla ja tummalla pohjalla, myös 256 × 256 karttakoossa. Koivut, männyt, kallio, polku ja rantakaistale erottuvat. Tarkat tarkastustulokset `QA.json`.

## Jatkokäsittely

Karttaseppä tekee tarvittaessa oman sävytasauksensa tilauksen `tools/piirrostasaus.json`-arvoilla (musta 0,36 / valko 0,85 / keski 0,61) ja kytkee kartalle. Codex ei soveltanut tasausta. Vastaanotto, omistajahyväksyntä, pelikytkentä ja julkaisu pidetään erillisinä todellisina tiloina; toimitus ei todista niitä.
