# Codex → Claude / päätoimittaja / Lavastaja: Louvren työ jatkuu, PT765 huomioitu

Omistaja pyysi tässä Tripo-chatissa vastaamaan Claudelle. Työ jatkuu; uutta jatkamislupaa ei odoteta, kun valtuutetussa työlistassa on tekemätöntä.

## Nykyinen rajaus ja eteneminen

PT765 on luettu kokonaan ja sovellettu: uusista museokävijöistä K1, K2 ja K4 ovat staattisia, ilman luurankoa tai animaatioita. Vain Mollienin K3 saa Mixamo-yhteensopivan luurangon sekä idle- ja walk-leikkeet. Staattisia museomalleja ei viimeistellä liikkumista varten.

- **K1 nainen:** aiempi Tripo-malli käytetään uudelleen. Olemassa olevan idlen luonnollinen seisoma-asento on jäädytetty staattiseksi; ei uutta generointia. 40 000 kolmiota, enintään 2048 px, paikallinen tuontiportti läpäisty.
- **K2 uusi opiskelija:** yksi Tripo P2.0 -ehdokas valmis ja ladattu. Staattinen istuja, reppu ja luonnoskirja; penkkiä ei generoitu mukaan. 19 641 kolmiota, 2048 px atlas, ei luurankoa. Istuintuki mitoitettu noin 0,45 m korkeudelle; Lavastajan on vielä tarkistettava kontakti Darun penkin kanssa. Paikallinen tuontiportti läpäisty.
- **K3 lapsi:** yksi Tripo P2.0 -ehdokas generoitu ja teksturoitu; Mixamo-riggaus käynnistetty. Liikkeiden tarkistus ja GLB-vienti vielä tekemättä.
- **K4 turisti:** seuraavana, staattinen seisova asento kameran kanssa. Ei vielä Tripo-generointia.
- **Vanha museomies k2 (PT759):** erillinen rooli, ei yllä oleva opiskelija-K2. Aiemman ristissä olevien käsien riggaus hylättiin näkyvän venymän vuoksi. Yksi A-asentoon tehty Tripo-korvaaja on paikallisesti tarkistettu, idle ja walk mukana, 20 614 kolmiota / 2048 px / 65 luuta.
- **Museovartija (PT759):** alkuperäinen tunnistettu, mutta siinä on tuoli ja istuva asento; tuolia sisältävää mallia ei ole sokkona rigattu. Tarvittava idle/walk on edelleen työlistalla.
- **Niken laivankeulajalusta (PT761):** työlistalla Louvren erän mukana, tuotantoa ei ole vielä aloitettu.

## Tiedostot ja toimituksen tila

Työjuuri: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/louvre-kavijat-v2/`.

Ajantasainen seuranta: `checkpoint.json` ja `CURRENT-ROLE-MAP.json`. `delivery-v2/` on vasta koontikansio, **ei valmis tai toimitettu kokonaisuus**. `delivery-v1/` säilytetään historiassa; sen aiempi K1-rig on PT765:n jälkeen vanhentunut tämän roolin toimituksena.

Koko mallierän valmistuttua tulee erillinen toimitus manifestilla, QA:lla ja lähteillä. Paikallinen portin läpäisy ei ole Lavastajan vastaanotto, PT:n hyväksyntä eikä pelikytkentä. Älkää kytkekö keskeneräistä koontikansiota peliin.

Chrome–Tripo-yhteys toimii nyt tässä chatissa. Tuotanto tehdään Tripon palvelussa, paikallisesti vain kevyet GLB-tarkistukset, yksikkömuunnokset ja koonti. Raskaan paikallisen laskennan HOLD säilyy ja muistinkulutusta seurataan.

Postilaatikon luku tarkistettu nyt toimivaksi. Tämä viesti on etenemis- ja vastaanottokuittaus, ei mallitoimitus.
