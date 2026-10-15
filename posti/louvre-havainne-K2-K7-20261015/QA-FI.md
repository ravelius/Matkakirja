# Louvre K2–K7 — tuotanto ja natiivimaskien tarkistus

Kaikki kuvat ovat sisäisen työkalun kokonaan uusia 1536 × 1024 PNG -natiiveja. K1 v2 säilyy hyväksyttynä erillisenä valintana.

**K2 ja K3 eivät täytä 85 %:n mittarajaa.** Ne toimitetaan lähdeohjeen mukaisina parempina kahdesta ehdokkaasta. K2:n taustassa on myös ylimääräinen pyöreä allas. Näitä puutteita ei ole hyväksytty eikä korjattu osamuokkauksella. PT:n koko erän arvio on vielä avoin.

| Kulma | Valinta | IoU | Yrityksiä |
|---|---|---:|---:|
| K2 | v2 | 58.5047 % | 2 |
| K3 | v1 | 17.4349 % | 2 |
| K4 | v1 | 85.4642 % | 1 |
| K5 | v1 | 90.0028 % | 1 |
| K6 | v1 | 97.1306 % | 1 |
| K7 | v1 | 92.8839 % | 1 |

IoU on palatsin kuvasta käsin piirretyn maskin ja vastaanottajan natiivimaskin pikselivertailu. Ei skaalausta, rekisteröintiä tai kohdistusta. Käsin segmentoinnin semanttista epävarmuutta ei ole poistettu. Alle 85 %:n ensimmäiselle kuvalle tehtiin vain yksi kokonaan uusi yritys; valinta on kahdesta parempi myös silloin, kun molemmat jäävät alle rajan. PT:n hyväksyntä ja fysikaalisen kameran varmentaminen ovat erillisiä.

## Havaitut erot ja mallinnusohjeet

### K2 v2
- Vertical composition remains too high: far right pavilion near row 280 vs target 340, near central pavilion near 490 vs 529
- Far facade and courtyard openings differ from LiDAR
- Near roof wells have invented geometry; do not copy into physical model
- Cour Carree on screen left and Tuileries screen right are directionally consistent
- Extra dense city detail is unverified reconstruction; Seine not established in this framing
- Independent review found a round basin at extreme upper-right despite no-pools instruction. This is a known residual deviation; do not copy it into model. Both authorized attempts already used, no third generation allowed.

### K3 v1
- Palace displaced upward: far roofline about row180 vs target343; foreground wing bottom about640 vs732
- Courtyard shape and inner facade placement differ from source
- Near roof courtyard proportions and central pavilions are illustrative reconstruction
- Seine foreground south, Rivoli far north, Cour Carree right and Tuileries left are directionally consistent
- Equestrian statue appears in Cour Carree; position not verified and must not drive model

### K4 v1
- Fine roof, dormer and facade details remain generated reconstruction; use LiDAR for mass and physical dimensions
- Near wing widths and small courtyard apertures require native contour measurement
- Seine on screen left/south, Tuileries beyond/west are directionally consistent
- Unrequested green oval in western court/axis is not a modeling reference
- Equestrian statue added in near Cour Carree: location is unverified and should not drive model
- Eastern church placement in distant right context is unverified background reconstruction
- Independent review flags generated river bend behind far-left wing; retain source/map river course rather than tracing photograph.
- Measured 85.4642 percent is near the 85-percent policy boundary; hand-trace uncertainty is retained and receiver review remains necessary

### K5 v1
- Right near facade-ground boundary appears lower than measured base; quantify with native mask
- Fine facade sculptures, dormers and distant skyline remain generated reconstruction
- Enclosed courtyard view contains no misplaced river
- Equestrian statue present but its exact position/identity is unverified; LiDAR/map determines placement

### K6 v1
- Main near/far roof bands visually follow base; fine roof, dormer, facade and aperture details are generated reconstruction
- Seine beyond far south wing; no water through courtyard
- Equestrian statue present on paving; exact position/identity remains unverified and must follow map/source

### K7 v1
- Principal diagonal near/far masses visually follow base; fine glass roof, lightwell, facade and dormer details remain generated reconstruction
- Independent review: opened rectangular roof well where source shows roof mass; preserve LiDAR roof mass in model
- Independent review: minor downward drift of far-right facade footline
- Rivoli/city behind northern far wing, Seine outside this crop are directionally consistent
- Statue present on courtyard; exact coordinates/identity not verified and must use source/map

Mallinnuksessa mitat, kamerat ja palatsimassat otetaan alkuperäisistä LiDAR-pohjista; generoidun kuvan havaittuja siirtymiä tai keksittyjä yksityiskohtia ei siirretä geometriaan. Valokuvat toimivat ulkoasun referensseinä. Oikea palatsin Wikidata on Q1075988; lähde-JSONin vanha Q19675-merkintä on säilytetty muuttamattomana.

Ei API:a, CLI:tä, R2:ta, pelimuutoksia, main-yhdistämistä tai julkaisua.
