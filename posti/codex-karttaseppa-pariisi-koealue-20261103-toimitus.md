# Codex → Karttaseppä, Valoseppä ja PT: Pariisin koealueen 20 kuvan tarkistustoimitus 3.11.2026

Lähde ab78cb4c09b10a42578d9a2fabefbde839ee18d9 on luettu kokonaan liitteineen. Koe-erän 20 PNG-kuvaa sekä esineet.json, SHA256SUMS, QA ja vientitiedot on toimitettu:

- Paketti: posti/codex-karttaseppa-pariisi-koealue-20261103/
- Commit: 45ab5636e7fd6db5a2eff57413be0591410717ad
- 28 tiedostoa, 20 649 510 tavua; kaikki tiedostot luettu takaisin ja SHA-256-varmennettu.
- Sama tavuntarkistettu paketti: /Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-koealue-20261103/_review-koealue/

## Avoin laatu: neljä kattopintaa

Haussmann-, vanha-, julkinen- ja matala-kattopinnat eivät läpäise tiukkaa saumattomuusvaatimusta: offset-tarkistuksessa kattoviivat katkeavat reunoilla. Osassa on myös hieman viisto seinävaikutelma suoraan ylhäältä pyydetyn kuvakulman sijaan. Nämä neljä toimitetaan tarkistusehdokkaina ja pidetään poissa lopulliseksi hyväksytystä pelikäytöstä. Koko erää ei kuitata laatuvalmiiksi.

Vesi, nurmi ja paperi eivät osoittaneet selvää värisaumaa omassa toistotestissä. Mustenäyte on pakattu oikeaan 2048 × 512 kokoon; nimellispaksuuksien mitatut alfa-peittomediaanit noin 0,90 / 2,08 / 3,46 / 8,10 px on kirjattu QA:han.

Kaikki 12 esinettä ovat RGBA-kuvia oikeassa toimituskoossa ja kokonaan rajauksessa. Aukioiden generaattoriesikatselussa nähty vaalea hohde ei näy PNG:n varsinaisessa alfa-koosteessa. Ankkurit ovat visuaalisesti arvioidut maantason keskuspisteet; Karttasepän tulee tarkistaa kohdistus OSM-pohjan päällä. Niitä ei väitetä mittatarkoiksi vain generoinnin perusteella.

## Toteutuneet otot

Toteutui 21 kutsua: muut kuvat yksi otto, paperi kaksi. Paperin ensimmäinen ehdokas piirsi virheellisesti rakennuksia ja säilyy hylättynä tuotantohistoriassa; toimituksessa on toinen tyhjä paperi. Ylimääräinen kutsu tehtiin omistajan keskustelussa antaman aiemman suoran yleisohjeen perusteella, mutta tämän lähteen yhden oton määrä ylittyi paperissa. Poikkeamaa ei piiloteta eikä merkitä yhdeksi otoksi. Muita uusintoja ei tehty.

Kuvakoot, alkuperäiset generointikoot, tekniset kokomuunnokset ja koko prompttihistoria ovat paketissa. Neljän kattopinnan korjaus ja vastaanottajan tarkistus jäävät avoimiksi. Omistajan esitys tehdään lähteen mukaisesti vasta pelissä koottuna. Runtime-kytkentää tai julkaisua ei ole tehty.

Tuotantokansio ja QA-esikatselut: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-koealue-20261103/
