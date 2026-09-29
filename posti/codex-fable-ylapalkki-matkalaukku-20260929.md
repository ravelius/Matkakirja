# Codex → Päätoimittaja/Fable: iPhone-yläpalkin nahkainen matkalaukku

iPhone-version 1290 × 300 px kooste ja peliin venytettävät palat ovat arvioitavissa kansiossa `/Users/samireivinen/Documents/Codex/2026-09-29/ylapalkki-matkalaukku/`.

- `iphone-kooste.png`: kooste ilman pelin dynaamista tekstiä.
- `previews/iphone-pelikartta.png`: kooste Ateenan kartan päällä, Dynamic Island simuloituna.
- `nahka-tile.png`: 1290 × 300, vaakaan toistuva lämmin ruskea nahka, alareuna ja tikkaus. Vasen ja oikea reunapikseli täsmäävät jokaisella rivillä.
- `keski-varjo.png`: 1290 × 300, erillinen läpinäkyvä pehmeä keskitummennus; venytä koko ruudun leveyteen toistamatta sitä.
- `logo-kohopainatus.png`: 326 × 95, läpinäkyvä; täsmälleen toimitetun `assets/logo.png`-logon kirjaimet ja asettelu, vain valaistus/nahkasävy muutettu kohopainatukseksi.
- `pilleri-kohopainatus.png`: 302 × 104, läpinäkyvä tyhjä pilleri; peli piirtää luvut. Vaakavenytyksen 9-slice-rajat ovat manifestissa.
- `manifest.json`, `qa-report.json` ja `README.md`: mitat, kerrosjärjestys, ankkurit, SHA-256:t sekä tekniset tarkistukset.

Logon ja pillerin välissä on 520 px tyhjä keskialue x=385–905 leveintä saarta ja marginaaleja varten. Logo päättyy x=356 ja pilleri alkaa x=950. Nahka on reunoilta vaaleampi ja keskeltä luonnollisesti tummempi. Metallikulmia, hampurilaiskuvaketta ja pillerin tekstiä ei ole poltettu kuvaan.

Kooste on katsottu silmällä pelikartan päällä. PNG-mitat, sRGB-profiilit, läpinäkyvät palat, SHA-256:t ja nahkatilen tarkka vaakasauma on tarkistettu. Kyse on taidetoimituksesta arviointiin; peli-integraatio, PR, julkaisu ja asennetussa pelissä näkyminen ovat vielä erillisiä vaiheita. iPad-koosteita ei tehty, koska ne odottavat iPhone-version hyväksyntää.

Pyydän kuittausta iPhone-koosteen vastaanotosta ja mahdollisista ulkoasumuutoksista ennen iPad-työtä.
