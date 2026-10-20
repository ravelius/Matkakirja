# Vientipakettien ja ämpärin vertailu (Äänittäjä 21.10.2026, yöjono kohta 9, korvaava tarkistus)
Natiivin pelin manifestit ovat Unity-puolella (PK), joten tässä on vain `_valmiit/*-vienti-*`-pakettien SHA256SUMS-polkujen HEAD-tarkistus osoitteessa media.matkakirja.app: 6 186 polkua, 5 155 vastaa 200, 1 031 vastaa 404 (581 glb, 185 json, 126 astcm, 107 mp3, 24 jpg, 6 png). 404 voi tarkoittaa vientiä, joka tehtiin eri avaimelle (paketin sisäinen polku ≠ ämpärin avain, esim. `./esineet/…`-alipolut), vanhaa pakettia ennen nykyistä vientitapaa tai viemättä jäänyttä; ei virheelliseksi todettu ilman tapauskohtaista tarkistusta.

## Paketit, joissa mp3/ääni-json 404 (tarkista Julkaisijan kanssa)
- taidemuseo-kertoja-ranska-kohdat-vienti-20261014: 103 (esim. aanet/taidemuseo-kertoja-ranska-kohdat-v1/ajat/louvre-inv-142.json)
- juoksupeli-aanet-v3-vienti-20261020: 22 (esim. ./esineet/kaaretaulu-repeaminen-3.mp3)
- iss-kupoli-johdanto-vienti-20261013: 13 (esim. aanet/iss-kupoli-johdanto/johdanto/iss-johdanto-1-cupola.mp3)
- taidemuseo-kertoja-ranska-vienti-20261013: 13 (esim. aanet/taidemuseo-kertoja-ranska/ajat/paasali/ranska-sali2-avaus.json)
- iss-lahtolasku-vienti-20261013: 9 (esim. aanet/iss-lahtolasku/iss-lahtolasku-kaksi.mp3)
- shakki-wien-aanet-vienti-20261012: 9 (esim. aanet/shakki-wien-v1/shakki-kahvila-kuppi-01.mp3)
- taidemuseo-kertoja-yovartio-vienti-20261013: 9 (esim. aanet/taidemuseo-kertoja-yovartio/ajat/paasali/mauritshuis-146.json)
- raketti-andoya-alku-vienti-20261014: 3 (esim. aanet/raketti-andoya-alku/manifest.json)

## Tarkistetut näytteet
- `juoksupeli-aanet-v3-vienti-20261020`: SHA256SUMS-polut alkavat `./` → väärä positiivinen; `juoksupeli/aanet-v3/esineet/metalli-2.mp3` = 200.
- `iss-kupoli-johdanto-vienti-20261013`, `iss-lahtolasku-vienti-20261013`, `shakki-wien-aanet-vienti-20261012`, `raketti-andoya-alku-vienti-20261014`, `taidemuseo-kertoja-ranska(-kohdat)-vienti-…`, `…-yovartio-…`: näytetiedostot 404 → ämpärissä ei ole näillä poluilla (vienti-lokissa vastaavat myöhemmät paketit, esim. `iss-kupoli-v1/v2-vienti-20261014`, ja Ranskan kertojat on viety uudelleen v2-/manifest-paketteina). Näitä ei voi käyttää peliin ilman, että pelin manifesti viittaa nykyisiin avaimiin – PK vahvistaa.
