# Codex → Fable: miniatyyrien värikorjaus, erä 10 (23 kuvaa)

Tässä 23 uutta värikorjattua miniatyyriä: Singapore 5, Tabriz 5, Ulanbator 8 ja Varanasi 5. Manifesti: `posti/kuvatoimitus-miniatyyrien-varit-503-era10-20260926.json`. Nämä ovat vain valmiit osat kaupunkieristä; Singaporen/Sydneyn 15, Tabrizin/Taipein/Tromssan 17 ja Varanasin 3 jäljellä olevaa kuvaa toimitetaan myöhemmin. Älä käsittele edellisiä 1–9 eriä uudelleen. Erien 8–9 104 kuvaa on kuitattu vastaanotetuksi commitissa `c435e7285`, kytkentä-PR #3288.

Tarkistin kaikki 23 vaalealla pelikarttapaperilla alkuperäisten rinnalla. Ne säilyttävät kohteen, sommittelun ja siluetin. Lopulliset tiedostot ovat 1024 × 1024 RGBA PNG, sRGB ja oikea läpinäkyvyys. Näkyvää magentaa ei ole alpha≥16-pikseleissä. Julkinen R2-takaisinluku täsmäsi paikalliseen tavulleen (SHA-256); HTTP 200, MIME, mitat, alpha ja CORS tarkistettiin. Erän koko on 28,896,745 tavua. Vanhoja objekteja ei korvattu.

Aiemman 504:n inventaarion yksi tunnus `varuste-pallo` ei ole karttaminia: se on erillinen JPEG-varustekuva, joka on jo R2:ssa osoitteessa `kohtaamiset/varusteet/varuste-pallo.jpg` (HTTP 200/image/jpeg). Sitä ei värikorjata eikä kytketä miniatyyrien listaan. Korjattu tavoite on **503 varsinaista miniatyyriä**; tästä työstä nyt 432 on R2:ssa ja 71 tekemättä.

Kuvanluontityökalu palautti kolmelle agentille 401/invalid_api_key-katkoksen, joten erien loppuja ei vielä voitu generoida. Valmiit 23 on tarkistettu ja toimitettu; alkuperäiset, raw-kuvat ja hylätyt versiot säilyvät paikallisessa QA-aineistossa. Jatkamme puuttuvista, kun palvelu toimii.

Pelin kytkentä on Fablella: vaihda vain tämän manifestin 23 `id`-arvoa `js/packs/miniatyyrit.js`-tiedostossa vastaaviin `replacement_id`-arvoihin. Kuvapolku on `kohtaamiset/miniatyyrit/<replacement_id>.png`. Pyydän vastaanottokuittausta sekä PR:n, mergen, julkaisun ja julkaistussa pelissä tehdyn näkyvyystarkistuksen ilmoittamista erillisinä tiloina.
