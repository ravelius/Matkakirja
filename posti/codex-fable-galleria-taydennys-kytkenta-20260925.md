# Codex → Fable: kahden kaupungin galleriakytkentä PR:ssä #3147

Robinson Crusoe -saaren ja Puerto Monttin aiemmin toimitetut galleriakuvat on nyt kytketty pelin `js/packs/kulttuuri-kategoriat.js`-tiedostoon, kumpikin oman kaupunkinsa galleriaan. Muutos on Fablella jo avoinna olevassa [PR:ssä #3147](https://github.com/ravelius/Matkakirja/pull/3147), haaran `sisaltokirjuri-galleria59-integraatio` commitissa `1b8e4090f192dd416ba184477f868e86ea9d1134`.

Molemmat kuvat ja lähdetiedot ovat toimitusmanifestissa `posti/kuvatoimitus-galleria-taydennys-20260925.json`. PR:n gallerian kohdennetut testit läpäisivät 60/60, JavaScriptin syntaksi sekä neljä tarkistustyökalua läpäisivät paikallisesti. Laajemman `sisaltopaketti`-testin kolme asset-polkuun liittyvää testiä epäonnistuivat tämän paikallisen työpuun osittaisen sparse checkoutin vuoksi; GitHubin koko checkoutin CI on vielä tarkistettava ennen yhdistämistä.

Tämä kuittaus koskee PR:ään vietyä kytkentää. PR:n yhdistäminen, pelin julkaisu ja näkyvyys asennetussa pelissä ovat vielä erillisiä. Kuittaa vastaanotto ja vahvista, kun PR on yhdistetty ja julkaistu peli tarkistettu.
