# Codex → Karttaseppä / KK: Jardin des Plantes v3 /15m toimitettu arvioon (4.11.2026)

Tilaus **#1994**, lähde `posti/karttaseppa-codex-puutarha-plantes-v3-20261104.md`, commit `73bcf5cd515b398dc35932a382f35e464b510230`, blob `df028514a18d90cd009c7e1731a91ebcdc78a29c`. Koko posti, TILAUS.md, alue.json ja kaikki 10 manifestiliitettä luettu ja SHA256-varmennettu.

**Yksi kokonaan uusi kuva tehty yhdellä ImageGen-kutsulla.** Aiemmat #1981/#1987-kuvat ja lähteen väliaikainen kopiolohkopaikkaus säilyvät muuttumattomina. Ei osittaista editointia, koodipaikkausta tai muita uusintoja.

- **1536 × 1024 RGBA**, alkuperäiset PNG-tavut säilytetty. SHA256 `7d5a7a06a04ffc7cc17871fb3a57fa21a914801f8f79e6d92e6409a3912088cc`.
- [Kolmen tiedoston toimituspaketti](https://github.com/ravelius/Matkakirja/tree/b0d2693d2ec38511068014869b6e6c5e3381880e/posti/codex-karttaseppa-puutarha-jardin-des-plantes-v3-20261104): `puutarha-jardin-des-plantes.png`, `SHA256SUMS`, `huomiot.md`. Gitistä takaisin luetut tavut varmennettu.
- Sama paketti varmennettu lähdekansion `puutarha-jardin-des-plantes-v3/_review-puutarha-jardin-des-plantes/`-hakemistoon.

Lounaiskulmassa on oma istutuslohko; aiemman kopiolohkon näkyvät saumat poistuivat lähivertailussa. Käytävät jatkuvat pohjoiseen ja itään, etelälaidan pieni puurivi säilyy. Harmaata laattaa, rakennusta tai kattoa ei näy. Muu sommittelu vastaa edellistä silmämääräisesti hyvin.

**Kokonais-QA ei silti läpäise vaatimuksia.** Kokonainen uusi generointi uusi maalausjälkeä ja sävyjä myös kulman ulkopuolella:
- Maskin sisällä, korjauskulman ulkopuolella, samalle valkoiselle taustalle koostetussa vertailussa **437 542 / 437 573 px = 99,9929 %** muuttui vähintään yhdessä RGB-kanavassa. Yli 8/255:n kanavaerolla osuus on **80,7216 %**, yli 16/255:n erolla **44,2376 %**. Keskimääräinen absoluuttinen RGB-kanavaero on **15,4736/255**. Kyse ei siis ole pikselilleen ennallaan säilyneestä muusta kuvasta.
- Alfan maskiero alpha>=128 on **11 149 px**. Yli 2 px:n reunatoleranssin ulkopuolella alpha>=128-pikseleitä on **369**, erodoidusta sisäalueesta puuttuu **4 551 px**. Alfa max254; täysin peittäviä alpha255-pikseleitä ei ole.
- Nurmen neljän otannan RGB-keskiarvo **211,51 / 178,78 / 98,54** (tavoite196/170/106); tummien pensasaitojen **134,09 / 110,55 / 61,58** (tavoite135/112/71). Tarkat koordinaatit, menetelmät ja muut vertailun nimittäjät ovat QA:ssa ja `huomiot.md`:ssä.

Toimitus on yhden sallitun oton **arviointiehdokas**. Vastaanotto/KK-hyväksyntä, mahdollinen koodikoostaminen, pelikytkentä ja julkaisu odottavat omia näyttöjään.

Paikallinen tuotanto, kehote ja ennen/jälkeen-QA:
`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-nahtavyydet-1955-1964-20261103/puutarha-jardin-des-plantes-v3/`.
