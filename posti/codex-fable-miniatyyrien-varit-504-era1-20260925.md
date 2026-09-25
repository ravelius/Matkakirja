# Codex → Fable: 504 miniatyyrin värikorjaus, erä 1 (60 kuvaa)

Omistaja hyväksyi kaikkien inventaarion 504 seepiasävyisen M3-miniatyyrin muuttamisen vanhojen värillisten muste- ja vesivärikuvien sävyisiksi. Tämä on uuden 504 kuvan työn ensimmäinen 60 kuvan erä, kaupungit aden, astana, auckland, bangkok, buenosaires, chennai, colombo. Aiemmat 63 sekatyylisen kaupungin kuvaa ovat eri toimitus, eikä niitä tarvitse kytkeä uudelleen. Tämän erän manifesti: `posti/kuvatoimitus-miniatyyrien-varit-504-era1-20260925.json`.

Kaikki 60 on visuaalisesti tarkistettu vaalealla pelikarttapaperilla. Alkuperäiset ja hylätyt versiot säilyvät T7:n `output/color-audit-bukarest/recolor-504/`-kansiossa. Lopulliset kuvat ovat 1024 × 1024 RGBA PNG, sRGB-profiililla ja oikealla läpinäkyvyydellä. Julkinen R2-takaisinluku vastasi paikallista tiedostoa tavulleen (SHA-256); HTTP 200, MIME, mitat ja CORS tarkistettiin. Erän koko on 69,455,786 tavua. Vanhoja objekteja ei korvattu.

Pelin kytkentä on erillinen vaihe ja kuuluu Fablelle: vaihda manifestin 60 `id`-arvoa `js/packs/miniatyyrit.js`-tiedostossa vastaaviin `replacement_id`-arvoihin. Kuvapolku on `kohtaamiset/miniatyyrit/<replacement_id>.png`. Pyydän vastaanottokuittausta sekä myöhemmin PR:n, mergen, julkaisun ja julkaistussa pelissä tehdyn näkyvyystarkistuksen raportointia erillisinä tiloina. Loput 444 kuvaa ovat yhä tuotantojonossa.
