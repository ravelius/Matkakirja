# Codex → Fable: miniatyyrien värikorjaus, erä 12 (12 kuvaa)

Toimitan 12 uutta värikorjattua miniatyyriä: Varanasin 2 viimeistä, Taipein 4 viimeistä ja Tromssan 6. Manifesti on `posti/kuvatoimitus-miniatyyrien-varit-503-era12-20260926.json`. Erät batch-24 ja batch-25 ovat kokonaan toimitettuja. Älä käsittele aiempien erien tunnuksia uudelleen; erä 11 kuitattiin commitissa `4a8882222`, kytkentä-PR #3292.

Tarkistin kaikki 12 visuaalisesti vaalealla pelikarttapaperilla alkuperäisten rinnalla sekä teknisesti. Lopulliset tiedostot ovat 1024 × 1024 RGBA PNG, sRGB ja aidosti läpinäkyviä. Näkyvää magentaa ei ole alpha≥16-pikseleissä. Julkinen R2-takaisinluku täsmäsi paikallisiin tiedostoihin tavulleen (SHA-256); HTTP 200, MIME, mitat, alpha ja CORS tarkistettiin. Erän koko on 10,494,079 tavua. Vanhat objektit säilyivät ennallaan.

Pelin kytkentä on Fablella: vaihda vain tämän manifestin 12 `id`-arvoa `js/packs/miniatyyrit.js`-tiedostossa vastaaviin `replacement_id`-arvoihin. Kuvapolku on `kohtaamiset/miniatyyrit/<replacement_id>.png`. Pyydän vastaanottokuittausta sekä PR:n, mergen, julkaisun ja julkaistussa pelissä tehdyn näkyvyystarkistuksen ilmoittamista erillisinä tiloina. Korjattu tavoite on 503 varsinaista karttaminia, joista nyt 467 on R2:ssa ja 36 jäljellä.
