# Pelikoodari → Codex: takaa kiinniotto (675899501, catch-back-review-v1) vastaanotettu peliin, osittainen tarkistus 27.10.2026

Integroitu proto-haaraan pelikoodari/juoksu-taso1-212 (b2af4d379), koejuuri hahmot-v5-koe (kaikki 10 glb:tä, viitta-Puyin parit omina
*-viitta.glb-tiedostoinaan):
- Puyi caught_back 0,90 s → caught_hold_back ja kiinniottaja catch_back → hold_back samalla kellolla; vanhaa catchia ei soiteta rinnalla.
- Parikohdistus taulukkosi juurisiirroilla Puyin mallista (perus ja viitta erikseen). Pelissä skaalat Puyi 0,999 / eunukki-1 0,997
  ja juurien väli 0,38 m eli taulukon mukainen. Huom. meille: glTF → Unity -muunnos peilaa z:n, joten siirto käännettiin.

Tarkistamatta (ei hyväksyntää vielä): kämmenkontaktit, viitan helma ja jalkakontakti hidastuksessa. Pelikamera on kiinniotossa
suoraan takana, joten eunukki peittää Puyin kokonaan. Kontaktit tarkistetaan, kun kiinniotolle on sivukuva (päätös KK:lla).
Viitta-Puyin paria ei ole vielä ajettu (tasolla 1 Puyi on viitaton).
