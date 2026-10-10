# Pulu MDA: raportti (10.10.2026)

- Vastauksia: vaihe 1 = 35 (7 kohtaa × 5), vaihe 2 = 61 linkkivastausta; yhteensä 96.
- Kesto: noin 10 min agenttiajoa ensimmäisestä erästä loppuun (vaihe 0 ja paketointi päälle).
- Agentit (Sonnet, effort low): vaihe 1 kaksi erää (91 557 + 72 156 tokenia), vaihe 2 yksi erä (166 009), vaiheen 2 käsitekorjaus (64 137). Yhteensä 393 859 tokenia.
- Tarkistukset: vaihe 1 `tarkista-era` 2 virhettä (käsitteitä 1, kohdat 3.2 ja 4.3), korjattu; vaihe 2 22 virhettä (käsitteitä 0–1), korjattu. Lopuksi `tarkista-era` 0 virhettä ja `tarkista-valmis` 0 virhettä, 0 varoitusta. Faktapistokoetta (30 vastausta) ei ole tehty.
- Huomio: `lataa-data.sh` osoitti poistettuun versioon v625 (404); päivitetty versioon v653. `fokuskohteet-mda` ei ole paketissa.
- Paketti: `pulu-esigenerointi/MDA/MDA.json`; `pulu-esigenerointi/maat.json` päivitetty (MDA 202610101504).

## Pistokoekorjaukset 10.10.

Päätoimittajan jatko-ohjeen 11 korjausta (Sorokan linnake, Iacob, Mileștii Mici, Cricova ja Göring, Țipova, Căpriana, Ostrog, Orheiul Vechi) tehtiin kaikkiin vaiheen 1 ja 2 vastauksiin kolmella Sonnet-agentilla (effort low; vaiheen 1 kaksi tiedostoa ja vaihe 2, yhteensä noin 167 000 tokenia).
- Vaihe 1: 21 vastausta korjattu. Kysymystekstit muutettu kohdissa 1.1 ja 1.5; jatkokysymykset muutettu kohdissa 2.5 ja 7.2 (poistuneet maininnat).
- Vaihe 2: 28 vastausta korjattu; kysymys- tai jatkoteksteihin ei tarvinnut koskea.
- Uudet [[linkit]], joille ei ole lisaa-vastausta (Tapani Suuren, Guinnessin ennätyskirjan, kalkkikivikaivoksina, Petru Rarešin, luolaluostari), muutettiin tavalliseksi tekstiksi. Käsitemäärän pitämiseksi 2–5 kohtiin 2.1, 3.1 ja 7.2 jätettiin tai lisättiin linkit, joilla on lisaa-avain (Chișinăusta, geto-daakialainen).
- Jäljellä ei ole vanhoja väitteitä (1499-puulinnake, 129 pulloa, 430 ha, 1665, 900–1100-luku, 1950-luvun louhos).
- Lopputulos: tarkista-era 0 virhettä (vaihe 1 ja 2), tarkista-valmis 0 virhettä ja 0 varoitusta; MDA.json koottu uudelleen.
