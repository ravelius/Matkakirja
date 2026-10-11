# Omistajan hyväksymä lähdekanavapoikkeus

11.10.2026 omistaja hyväksyi robots-sallitut tavalliset alkuperäiset Wikipedia- ja Commons-sivut estettyjen API-polkujen sijaan. Lähde- ja kuvatarkistusten sisällölliset vaatimukset säilyvät. Estettyjä /w/ ja /api/ pyyntöjä ei tehty.

NAS-väliaineiston sallittu_haku.py tarkistaa Claude-User ja Matkakirja-robotin säännöt jokaiselle polulle ja uudelle domainille myös redirectissä, tallentaa lähteen/hash/lokin sekä käyttää yhteistä välimuistia ja1/s yhteislukkoa. Verkkotarkistus käyttää valiaikainen/lahdesovitus.mjs:ää alkuperäisen tyokalu.mjs:n edessä: vain verkkotransportti korvataan sallitun lähdesivun sisällöllä. Alkuperäinen tarkistin ja ilmastotaulukon numeroalgoritmi säilyvät muuttumattomina.

Commons-tieto poimitaan sallitun File-sivun alkuperäiskoosta, Artist/Author-kentästä ja licensetpl_short-kentistä. Usean lisenssin tiedostolla valitaan sivulla todella tarjolla oleva tehtävän sallimaCC-variantti; alkuperäisen GFDL+CC-monilisenssin ensimmäisenGFDL:n automaattinen poiminta oli sovitusvirhe, joka korjattiin ennen lopullistaF-porttia. D tarkisti jokaisen23kuvan C:ssä käytetyn version itse alkuperäisiltä sivuilta. Pelkkä poiminta ei korvaa kuvan ja kuvatun kohteen tarkistusta.

Säätyökalulle syötetään sallittu kaupungin Wikipedia-HTML ja sen oikea revisio. Säärivistä ei käsin kirjoiteta lukuja. Artikkeli lukittiin kaupungin omaan otsikkoon, jotta maan fallback-taulukko ei valitse toisen kaupungin asemaa. Algerin ristiriitainen taulukko hylättiin alkuperäisillä tarkistuksilla.

## SVG:n alkuperäismittojen lähdesivumuoto

Yhteinen File-sivun lukija tukee nyt myös MediaWikin muotoa “Original file (SVG file, nominally 5,300 × 4,600 pixels)”. Arvot poimitaan todelliselta sivulta; niitä ei muuteta tai arvioida. Plan type bastion Vauban.svg: 5300×4600, Ludwig Dupas, CC BY-SA 4.0, revisio 1180048003; D varmisti itsenäisesti. Sama lukija tarkistettiin myös Interior da Fortaleza de São José de Amura, Bissau.jpg -rasterilla: 4608×2592, Joehawkins, CC BY-SA 4.0, revisio 1021029034. Alkuperäinen tarkistin ja sen 1200 px / lisenssi- / muotosäännöt ennallaan.
