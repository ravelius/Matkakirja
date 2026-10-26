# Astronautin kameran valkoiset palkit pois — kaikki kuvat (1.10.2026)

Omistajan tilaus 30.9.2026 klo 23.5x (Everglades ISS015E08920; sama tilaus 20.9.) ja Päätoimittajan kiireellinen erä.

- Käsitelty: kaikki aineiston havainnot (`js/linssit/satelliitti-data.js`): 229 havaintoa, 458 kuvatiedostoa (kuva + pikku).
- Palkillisia: 40 havaintoa (80 tiedostoa), joista 12 oli rajattu jo 20.–21.9. (vanha juurikansio) ja **28 uutta (56 tiedostoa)** rajattu nyt. Kaikilla palkki oli alareunassa, ~2,7 % korkeudesta (35–36 px isossa, 11–12 px pikkukuvassa).
- Uudet rajatut kuvat ämpärissä: `linssit/astronautin-kamera/20261001/<id>~large|small.jpg` (immutable, HEAD 200, sha täsmää, `content-type: image/jpeg`, CORS kunnossa). Alkuperäiset pysyvät NASAn CDN:ssä.
- Viittaukset päivitetty: `satelliitti-data.js` (56 riviä) ja `tools/hae-satelliittihavainnot.mjs` (`KUVAPOIKKEUKSET` on nyt Map id → versiokansio, joten uudelleengenerointi ei palauta palkkeja).
- Natiivi: lukee saman sisältöpaketin `satelliitti-data.json`:n URL:t sellaisenaan (Linssiseppä 1.10.), joten rajatut kuvat tulevat mukaan seuraavassa sisältöviennissä ilman koodimuutosta; uusi versiokansio ohittaa laitteen välimuistin.
- Tuleville kuville: `tools/astro-palkki.mjs` (tunnistus + rajaus), `tools/astro-palkit-tarkistetut.json` (kirjanpito), generointityökalu kieltäytyy kirjoittamasta aineistoa, jos havainto on tarkistamatta, ja `tests/astro-palkki.test.mjs` hylkää tarkistamattoman tai palkillisen NASA-osoitteen.
- Tunnistin: alimman 9 %:n rivit, ≥ 78 % lähes valkoisia, kaistan korkeus 1,5–4,5 %, ja siinä on leimatekstin tummia pikseleitä (muuten suolatasanko ISS012E06456 tulkittaisiin palkiksi — tunnistettu väärä hälytys ja suljettu pois).
- Kuvapari: `docs/raportit/kuvat/astro-palkki-everglades-ennen-jalkeen-20261001.jpg`.
