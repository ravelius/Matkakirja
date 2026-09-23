# Googlen fotorealistiset 3D-laatat vanhan EU-projektin kautta (3D-selvittäjä, 23.9.2026)

Kysymys (omistaja Fablen kautta): omistajalla on ennen 8.7.2025 luotu Google Cloud -projekti
ja API-avain. Voiko sen kautta käyttää Photorealistic 3D Tiles -laattoja uudessa iOS-pelissä?
Lähteet haettu 23.9.2026; Googlen EEA-sivut on päivitetty viimeksi 17.9.2026.
**(EPÄVARMA)** = ei todennettu ensisijaisesta lähteestä.

## Vastaus: EI vanhan projektin kautta. EHDOLLISESTI Cesium ionin kautta.

Vanha projekti säilyttää vanhat ehdot vain niin kauan kuin se on "Unmodified State" -tilassa.
Googlen oma FAQ luettelee muutoksiksi juuri ne asiat, joita uusi iOS-peli vaatii: uuden
palvelun käyttöönoton ja laajentamisen uudelle alustalle. Kun muutos tehdään, projekti siirtyy
EEA-ehtoihin, ja niissä 3D-laatat "are not available" (API palauttaa 403).

## 1. Mitä "Unmodified State" tarkoittaa

Googlen EEA-FAQ ([developers.google.com/maps/comms/eea/faq](https://developers.google.com/maps/comms/eea/faq)):

> "Your existing integration is considered in an 'unmodified state' as long as it is not
> materially modified on or after 8 July 2025."

Muutos on "material", kun asiakas käyttää "new functionality of a new or existing General
Availability Google Maps Platform Service" tai muuttaa kolmansien osapuolten palveluiden
käyttöä integraation kanssa.

| Toimenpide | Kumoaako vanhat ehdot? | Lähde |
|---|---|---|
| Uuden GA-palvelun käyttöönotto (esim. Map Tiles API, jos ei ollut käytössä) | **Kyllä** | FAQ |
| Laajennus uudelle alustalle (esimerkkinä Android) | **Kyllä** | FAQ |
| Uusien API-metodien tai vastauskenttien käyttö | **Kyllä** | FAQ |
| Kartan lisääminen tai korvaaminen toisella | **Kyllä** | FAQ |
| Laskutusmallin vaihto, projektin siirto toiselle laskutustilille | Ei | FAQ |
| Värien ja fonttien muutokset, tietoturva- ja virhekorjaukset | Ei | FAQ |
| Uuden API-avaimen luonti, avainrajausten muutos, omistajan vaihto | Ei mainita **(EPÄVARMA)** | — |
| Projekti siirretty EU:n ulkopuoliselta laskutustililtä EU-tilille | Ei oikeutta vanhoihin ehtoihin | FAQ (agentin lukema) |

Lisäksi Googlen ehdot määrittelevät projektin yhden asiakassovelluksen resursseiksi ("for a
particular Customer Application", [Maps Platform Terms](https://cloud.google.com/maps-platform/terms)).
Uusi peli on uusi sovellus ja uusi alusta, joten se on muutos, vaikka Map Tiles API olisi jo
käytössä. Tekninen toiminta ilman EEA-ehtojen hyväksymistä on **EPÄVARMA** eikä ehtojen mukaista.

Määräaikaa vanhojen ehtojen päättymiselle ei ole julkaistu, mutta Google voi muuttaa määritelmää.

## 2. Käyttäjäraportit

- Blosm #644 (7/2025): uusien EU-projektien katkos ([GitHub](https://github.com/vvoovv/blosm/issues/644)).
- Blosm #669 (10/2025): 403 uudella avaimella ja laskutus päällä ([GitHub](https://github.com/vvoovv/blosm/issues/669)).
- Cesium-foorumi (12/2025, Unity-käyttäjä): 3D-laatat lakkasivat toimimasta 403-virheeseen
  ([Cesium Community](https://community.cesium.com/t/google-map-tiles-for-3d-no-longer-working/44599)).
- Yhtään vahvistettua raporttia vanhasta EU-projektista, joka yhä saisi 3D-laattoja, ei löytynyt
  **(EPÄVARMA kumpaankin suuntaan)**.

## 3. Käyttöehdot pelissä (jos laatat saataisiin)

[Maps Platform Terms](https://cloud.google.com/maps-platform/terms) (muutettu 26.8.2026) ·
[Map Tiles policies](https://developers.google.com/maps/documentation/tile/policies)

- **Välimuisti ja offline**: sisältöä ei saa tallentaa välimuistiin muuten kuin ehtojen
  sallimalla tavalla, ja offline-käyttö on kielletty. Laitteen välimuisti vain Cache-Controlin
  `max-age`-rajoissa; offline-paketit ja laitteelle tallennus eivät ole sallittuja.
- **Attribuutio**: Googlen logo muuttamattomana ja näkyvissä (ei Cesiumin logon alla) sekä
  laattojen tekijätiedot ruudulla. Jos kohtauksessa on omia malleja, pitää selvästi näkyä,
  mikä osa on Googlen dataa. Pelin ehdoissa viittaus Googlen käyttöehtoihin ja tietosuojaan.
- **Omat laatat samassa näkymässä**: yleiset ehdot kieltävät Core Services -palvelujen käytön
  "with or near a non-Google Map" (3.2.3(e)); Map Tiles API on Core Service
  ([Maps Services](https://cloud.google.com/maps-platform/terms/maps-services)). **Tämä osuu
  suoraan pergamenttipallon ja Google-näkymän yhdistelmään.**
- **Tyylittely (seepia, pergamentti)**: ei nimenomaista kieltoa eikä lupaa; logoa ei saa
  muuttaa, ja Google-sisällöstä ei saa johtaa uutta sisältöä (3.2.3(c)) → **harmaa alue (EPÄVARMA)**.
- **Pelikäyttö ja kaupallisuus**: nimenomaista pelikieltoa ei löytynyt. Mainosvideot enintään
  30 s ja merkinnällä "for promotional purposes only".
- **EU-ehdot**: niissä 3D-laatat eivät ole saatavilla lainkaan
  ([EEA Map Tiles](https://developers.google.com/maps/comms/eea/map-tiles),
  [EEA Service Terms](https://cloud.google.com/terms/maps-platform/eea/maps-service-terms)).

## 4. Hinnoittelu (9/2026)

[Pricing](https://developers.google.com/maps/billing-and-pricing/pricing) ·
[Usage and billing](https://developers.google.com/maps/documentation/tile/usage-and-billing)

- Laskutus juuritileset-pyynnöistä (root tileset request); yksi pyyntö kattaa noin 3 tunnin
  istunnon, jonka laattapyynnöt eivät maksa erikseen.
- 1 000 pyyntöä/kk ilmaiseksi; sitten 6,00 $/1 000 (100 000 asti), porrastettuna 2,40 $:iin
  yli 5 miljoonassa. Kiintiö 10 000 juuripyyntöä/vrk.
- **Arvio**: 1 000 pelaajaa × 1 istunto/pv ≈ 30 000 pyyntöä/kk → (30 000 − 1 000) × 6 $/1 000
  ≈ **174 $/kk (~2 100 $/v)**. Jos peli lataa tilesetin uudelleen kohtauksittain, hinta
  moninkertaistuu.
- **Cesium ion**: Community ilmainen vain ei-kaupalliseen käyttöön (1 000 juurilaattaa/kk);
  Commercial 149 $/kk (5 000/kk); Premium 499 $/kk (10 000/kk)
  ([ion pricing](https://cesium.com/platform/cesium-ion/pricing/)). 1 000 pelaajan käyttö
  ylittää nämä → käytännössä Custom-sopimus **(EPÄVARMA)**. Palveleeko ion Googlen laattoja
  EU-asiakkaalle ja kattaako lisenssi julkisen App Store -pelin: **EPÄVARMA, kysyttävä
  Cesiumilta kirjallisesti.**

## 5. Riski

- Google voi muuttaa ehtoja 30 päivän varoituksella, lain vaatiessa heti (ehdot 1.3(b)); palvelun
  lopetus vaatii normaalisti 12 kk, mutta lakisyyt ovat poikkeus (1.3(c)). Heinäkuun 2025
  EU-muutos tuli uusille projekteille voimaan heti.
- Vuoden 2026 aikana EU-saatavuutta ei ole palautettu; EEA-ehtoja päivitettiin 23.6. ja
  26.8.2026 (sisältöä ei vertailtu **(EPÄVARMA)**).
- Pelille, jota myydään vuosia, riippuvuus palvelusta, jonka saatavuus EU:ssa on jo kerran
  katkaistu, on suuri. Google-näkymä kannattaa suunnitella **valinnaiseksi kerrokseksi**, jonka
  puuttuminen ei riko peliä.

## 6. Mitä omistajan pitää tarkistaa Google Cloud Consolesta (ei mitään muutoksia!)

1. **Projektin luontipäivä**: IAM & Admin → Settings / Resource Manager. Oltava ennen 8.7.2025.
2. **Laskutustilin osoite**: Billing → Account management. Onko EU/ETA (Suomi), ja onko projekti
   joskus siirretty EU:n ulkopuoliselta tililtä.
3. **Käytössä olevat API:t**: APIs & Services → Enabled APIs. Oliko Map Tiles API käytössä ennen
   8.7.2025, ja näkyykö 3D-laattojen käyttöä (Metrics / Billing reports)?
4. **Ehtojen tila**: onko EEA-ehdot hyväksytty (Google Maps Platform → Support / ilmoitukset)?
   Jos on, projekti ei ole enää vanhoilla ehdoilla.
5. **Lukutesti**: yksi pyyntö `https://tile.googleapis.com/v1/3dtiles/root.json?key=…`
   (avainta ei lokiin eikä repoon). 403 = ei pääsyä. **Älä ota API:a käyttöön äläkä hyväksy
   ehtoja testin aikana**, koska se kumoaa vanhat ehdot pysyvästi.
6. **Projektin alkuperäinen käyttötarkoitus**: uuden iOS-pelin rakentaminen sen päälle on joka
   tapauksessa FAQ:n mukainen muutos.

## Suositus

Moottorisuunnitelma ei riipu Googlesta: pergamenttipallo omista laatoista, kallistettu näkymä
maastosta ja kohdekohtaiset 3D-mallit aarrepaikoille. Jos fotorealismi halutaan, seuraava askel
on kirjallinen kysely Cesiumille (EU-asiakas, julkinen iOS-peli, arvioitu käyttö), ei vanhan
Google-projektin käyttö.
