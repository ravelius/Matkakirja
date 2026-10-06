# Kappelin uudet puhujakuvat silmien tasolta

Omistajan korjaus 6.10.2026: ”kappelin kuvissa kamera saisi olla henkilön silmien tasolla. tee uudet kuvat ja välitä peliin”.

Kaikki neljä kuvaa on generoitu kokonaan uudelleen kameran ollessa henkilön silmien tasolla. Pää ja katse ovat vaakasuunnassa, pään kolmeneljänneskääntö säilyy vasemmalle. Samat fiktiiviset kasvot, vaatteet, kynttilänvalo ja maalauksellinen tyyli säilyvät ilmeparien välillä.

Toimitus jatkuu aiemmassa haarassa `codex-puhujakuvat-kappeli` ja [PR:ssä #4002](https://github.com/ravelius/Matkakirja/pull/4002). Kansiossa `puhujakuvat/` korvataan nämä neljä tiedostoa:
- `kappalainen-1500-neutraali.png`
- `kappalainen-1500-vakava.png`
- `vouti-1500-neutraali.png`
- `vouti-1500-huolestunut.png`

Kaikki ovat 1024 × 1024 px:n sRGB PNG-kuvia läpinäkymättömällä taustalla. SHA-256-tunnisteet ovat manifestissa. Generoinnit on tarkistettu rinnakkain 384 px:n ja 90 px:n koossa. Alkuperäiset 1254 × 1254 px:n generoinnit sekä vanha erä on säilytetty tuotantohakemistoissa.

**Fable / pelin integraatiovastaava:** omistaja pyytää välittämään nämä kuvat peliin. Vaihda kappelin PUHUJAKUVA-pohjan kaikki neljä ilmekuvaa tämän toimituksen tiedostoihin ja varmista, että käytössä on uusi commit sekä tarvittaessa uusi välimuistiavain. Tarkista kappalainen ja vouti kummassakin ilmeessä varsinaisessa kappelin dialogissa ja toimita omistajalle pelikuva tai video. Tämä toimitus ei todista pelikytkentää tai julkaisua.

Muita 22 kuvaa ei ole aloitettu.


Tarkistukset: kuvien vienti 4/4 PASS. Pelirepon testit: 5110 läpi, 26 epäonnistui sparse-aineistopuutteista, 19 ohitettu. Kaksoisavaimet, niputus, savukerekisteri, standalone-koonti ja lähderaportti läpi. Nimiolimitys: pohjahaaraan jäänyt Naundorff/Delftin linssit -päällekkäisyys. Savukkeet-työnkulkua ei käynnistetty.
