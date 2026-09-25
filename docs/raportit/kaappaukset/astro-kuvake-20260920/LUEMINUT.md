# Astronautin kameran kuvake — kolme ehdokasta (20.9.2026)

Omistaja 20.9.2026 klo 14.50: *"tee astronautin kameralle uusi kuvake,
missä on astronautti ja kamera"*. Fable valitsee; EI käytössä ennen
valintaa (laukussa on yhä js/mapart.js:n vektorikuvake).

Generoitu Macilla `VARUSTE_ULOS=<kansio> node tools/generoi-varustekuvat.mjs`
(gemini-3-pro-image, sama pergamenttikääre kuin muilla varusteilla,
512 × 512 jpg). Promptit tools/generoi-varustekuvat.mjs EHDOKKAAT.

- astro-1.jpg — astronautti kokovartalona, kamera kohti katsojaa, Maa linssissä. Pieni hahmo: 64 px:ssä Maa on pikselin pilkku.
- astro-2.jpg — astronautti leijuu, kuvaa karttaa alaspäin; kuvattu kohta on värillinen Maa. Lukee kohtalaisesti pienenä.
- astro-3.jpg — kypärän lähikuva, Maa visiirissä, kamera edessä. Lukee parhaiten 64 px:ssä (yksi iso aihe, vahva sininen aksentti). Pelikoodarin suositus.

esikatselu-64px.png näyttää kaikki kolme laukun kokoisina pyöreinä.

Käyttöönotto valinnan jälkeen: kopioi valittu `assets/varusteet/varuste-satelliitti.jpg`:ksi
ja poista js/ui.js linssiLiuska-metodin `onSatelliitti`-poikkeus (varasolu jää vektorikuvakkeeksi).
