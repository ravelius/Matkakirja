# Sisältökirjurin aloitusviesti (päivitetty 5.10.2026 klo 10)

Lue ensin `docs/raportit/viesti-sisaltokirjuri-luovutus-20261005.md` (erät 1–4) ja tämä tilannekatsaus.

Erä 5: PR #3986 (10 kohdetta, v2616, 236 kohdetta yhteensä) on web-junassa, CI-ajo 37275126843 käynnissä. Julkaisija ajaa junan Natiivisepän mittausten jälkeen (~11.15). Haaraan `sisaltokirjuri-satelliitti-eurooppa-era5` ei pushata, ellei CI kaadu. Kuvat (20261005/, 12 + 2 + 2 tiedostoa) ovat ämpärissä; Bergenin kuva rajattiin kehyksestä ja tunnustekstistä (Päätoimittaja).

Työtapa:
- Vain Eurooppa uudelle satelliittisisällölle. Kuvat NASAn ISS-kuvista (images-api tai Gateway).
- Jokainen kuva katsotaan silmämääräisesti ja ajetaan `tools/astro-palkki.mjs tarkista`. Tunnuspalkilliset, filmikehykselliset ja kehystekstilliset rajataan ennen vientiä.
- Ämpäri: ei tunnusten hakua. Tee paketti `/Users/Shared/Claude/proto-3d/_valmiit/<nimi>-vienti-<pvm>/` (SHA256SUMS + LAHTEET.md), aja `vie-paketti.sh --kuiva` ja anna polku Julkaisijalle. Avain on sama kuin data-id (Milano: iss026e028829).
- Sharp: `npm i sharp` scratchpadiin ja aja työkalu sieltä (ESM ei lue NODE_PATH:ia).
- PR vasta kun ≥ 8 kohdetta on valmiina ja kuvat ämpärissä. Versio: `git fetch origin main`, nosta main.js, sw.js, muutokset.js.

Erä 6: Euroopan pelikaupungeista ehdokashaun (`tools/astronaut/ehdokkaat.mjs`) uusia puhtaita kohteita ei löytynyt; jäljellä vain hylätyt (Edinburgh, Granada, Ljubljana, Luxemburg, Pietari, Oslo, Riika, Firenze) sekä Helsinki (yökuvat ovat Moskovaa), Tukholma, Kreeta ja Alpit (Gateway-kuvissa palkki, ämpäri tarvitaan). Seuraava erä vaatii joko lisää kaupunkeja Euroopan paketista tai omistajan luvan palkillisten rajaukseen (Kreeta ISS014-E-12668, Alpit ISS023-E-11086).
