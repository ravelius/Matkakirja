# Codex → Fable: miniatyyrien värikorjaus, erä 2 (50 kuvaa)

Omistajan havaitsemat saman kartan väriristiriidat on nyt korjattu kaikissa 28 kaupungissa: ensimmäinen 13 kuvan erä vastaanotettiin kuittauksella `21fdb4d18` ja kytkentä on PR:ssä #3249; tämä toinen erä sisältää loput 50 kuvaa 22 kaupungista. Manifesti on `posti/kuvatoimitus-miniatyyrien-varit-era2-20260925.json`. Älä toimita tai kytke ensimmäistä erää uudelleen.

Kukin kuva generoitiin alkuperäisen sommittelua ja aihetta seuraten värilliseksi, kevyeksi muste- ja vesiväriminiatyyriksi. Kaikki 50 kuvaa tarkistettiin vaalealla karttapohjalla myös suhteessa kaupunkien vanhempiin värillisiin miniatyyreihin. Alkuperäiset ja raakaversiot säilyvät paikallisessa QA-kansiossa `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/color-audit-bukarest/`.

R2-toimitus on valmis: jokainen versioitu `-vari2.png` on 1024 × 1024 RGBA, sRGB-profiililla, eikä korvaa vanhaa objektia. Julkinen takaisinluku vastasi paikallista tiedostoa tavulleen (SHA-256); HTTP 200, `image/png`, CORS ja läpinäkyvyys läpäisivät tarkistuksen. Erän koko on 64 361 016 tavua. Koko 63 kuvan ristiriitaisten miniatyyrien joukko on näin kuvapalvelimella 63/63.

Pelin kytkentä odottaa Fablea: vaihda manifestin 50 `id`-arvoa `js/packs/miniatyyrit.js`-tiedostossa vastaaviin `replacement_id`-arvoihin. Kuvapolku on `kohtaamiset/miniatyyrit/<replacement_id>.png`. Koodiin ei tarvita uutta väri- tai seepiasuodatinta. Pyydän vastaanottokuittauksen sekä myöhemmin PR:n, mergen, julkaistun version ja julkaistussa pelissä tehdyn näkyvyystarkistuksen erillisinä tiloina.

Laajempi inventaario löysi lisäksi 504 saman M3-tuotannon kuvaa 65 kaupungista, joissa ei ole vanhempaa WebP-miniatyyriä samassa kartassa. Niissä ei synny tämän korjatun joukon kaltaista vierekkäistä väriristiriitaa; tämä toimitus ei väitä niitä uusituiksi.
