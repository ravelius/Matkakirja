# Pelikoodari: luovutus 5.11.2026 klo 16.02: avaus ja ensimmäinen käännös toimivat; seuraavaksi loppukortin kamera ja "Taso läpi!"

Korvaa -1516:n tilan. -1413:n kohdan 3 kohdat 3–4, -1337:n kohta 3 (avoimet päätökset) ja -1225:n kohdat 1, 2 ja 5 pätevät edelleen. Proto-worktree `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`, haara `pelikoodari/tarkastelu-219`, kärki `6fac582b7` (pushattu natiivi-backupiin). Juoksutestit 192/192, unity-tarkistus 0 virhettä `f57b79db0`:lla; `6fac582b7` muuttaa vain vakion, ja sille on ajettu juoksutestit. Ei iPad-ajoja, ei junaan mitään. Ei ajoa käynnissä, ei vuoropyyntöä jonossa (L1 vapautettu JU:lle 16.00).

## 1. Tehty ja todennettu
- `c97861a9a`: ovelta lähdettäessä takaa-ajaja lähtee vasta pelaajan ensimmäisestä käännöksestä (`AjajaOdottaaEnsiKaantoa`, `LahtoOvelta`). Ennen eunukki juoksi 9 m seisovan keisarin luo 1,6 pelisekunnissa, ja ajo 4c4d6f297 päättyi seinälle. Ajossa c97861a9a keisari odotti seinällä, opetus pysyi näkyvissä ja juoksu jatkui.
- Kuvista katsottu (a12 täysikokoisena, muut koostekuvina; täysikokoinen katselu tekemättä): keisari kuvassa koko avauksen lopun, eunukki kurkistaa, laskenta 3-2-1, oikean pyyhkäisyn ohje seinällä.
- Oikea käännös toimii ajossa f57b79db0 (lokissa paikka (−138,7; 441,6), suunta (0, 1)), koostekuvat k01–k02: keisari juoksee kujaa pitkin pohjoiseen ilman heilahdusta. Kameran 1,2 s:n sekoitusta ei ole katsottu täysikokoisena.
- `f57b79db0` + `6fac582b7`: `JuoksuOpetus.TaukoS` 1,5 s. Oikean pyyhkäisyn jälkeen vasemman ohje tuli samassa ruudussa ja hidasti peliä uudelleen. Seinän edessä ohje tulee heti. Ajettu vain 3 s:n arvolla, jolloin seuraavan kulman (13 m käännöksen jälkeen, s 23) ohje tuli vasta seinällä. **1,5 s:a ei ole katsottu pelistä.**
- `sk-f.txt` jätti 3,2 pelisekuntia ilman syötettä käännöksen jälkeen, joten kiinniotto kulmassa s 23 (k05–k08) ja "rimpuili irti" johtuivat käsikirjoituksesta, eivät ole pelin vika. Hidastettuna pelaajalla on kulmassa noin 6 s.

## 2. Seuraavaksi, järjestyksessä
1. **Loppukortin kamera (vika, ei korjattu):** kortin aikana kamera ei pysy paikallaan. Ajossa f57b79db0 keltainen möykky kasvaa koko kuvaan (e60–e62, kamera ajautuu keisarin sisään); ajossa c97861a9a kamera nousi keisarin yläpuolelle (e59–e60, kamera (213,8; 10,8; −748,6)), eikä keisaria näkynyt. Aloita `JuoksuV4Maailma.cs` kohdasta `if (s.Uupui)` (noin rivi 2861) ja katso, mikä kameraa liikuttaa, kun `s.Ohi`. Lokissa samaan aikaan toistuu `porttitunneli`, `näkölinja peitossa` ja `PELAAJA PIILOSSA`. Tee ensin testi tai varmista lokista, älä arvaa.
2. **`sk-f.txt` korjattava ennen seuraavaa ajoa:** `ui juoksupeli elinvoima 100` on e30:n jälkeen, ja se tuli liian myöhään: peli oli jo päättynyt uupumiseen ajassa 139 s. Rimpuilu kuluttaa elinvoimaa nopeammin (`RimpuiluKulutus`). Siirrä komento alkuun (e05 paikkeille) tai toista se, ja anna botin ottaa käännöksen jälkeen ohjaus heti, ettei kiinniotto syö aikaa. Taso vaatii 240 s (`TasoAikaS`).
3. **Ei vielä nähty:** "Taso läpi!", kynnysviesti, esineen rikkoutuminen, sivulta tuleva eunukki varmasti tunnistettuna. Kummassakaan ajossa ei lokissa näy omenan poimintaa, aarteita 0. **Selvitä, saako botti omenoita ja saako pelaaja:** taso vaatii niitä (200 s elinvoimaa, 240 s:n taso), mutta en tarkistanut, loppuuko botilta elinvoima siksi, ettei se ohjaudu omenille vai siksi, ettei niitä ole reitillä.
4. Vuoro JU:lta (`esikatselu.sh`, worktreen polku, `PROTO_LINJA` JU:n viestistä, ajo taustalla, rivi JU:lle kun valmis).
5. **Rivi ja kuvat KK:lle, kun taso 1 on näytettävässä kunnossa** (KK 15.06), mukaan -1337 kohdan 3 päätökset. Täysikokoiset itse katsottuina, ei selitekaistaa.

## 3. Avoimet pienet
- **Oma linjaus, kerro KK:n rivillä:** odotuksella seinällä ei ole aikarajaa, joten ensimmäisellä seinällä voi seistä uhatta myös ilman opetusta. Silmäile, tuntuuko se oikealta.
- **Lavastajalle viety 15.4x (ei vastausta vielä):** ruskea lankku puun rungon vieressä (ajo 153233: e12, e30, e52) ja vino kelluva kivipalkki, jonka läpi keisari juoksee (e58, pohja noin (−225; 353)). Juurisyy selvittämättä.
- **Eunukki e36 (ajo 153233):** näyttää juoksevan poispäin keisarista. Luultavasti botin siksak: takaa-ajajan paikka ja suunta luetaan reitiltä `S − etäisyys`, ja reitti kääntyi juuri. Ei varmistettu.
- **Botti** kiersi ajossa 153233 yhtä korttelia noin minuutin; siemen 11 ajossa f57b79db0 kulki laajemmin.
- **Liikevahti punainen ennen junaa:** kuten -1516:n kohdassa 3, ratkaistaan, kun kamera on hyväksytty. `tyokalut/tarkista.sh` pysähtyy siihen, joten aja myös `Peli-testit/unity-tarkistus.sh` erikseen.
- **`tyokalut/tarkista.sh` muuttaa tyylikirjan tiedostoja:** älä committaa, `git checkout --` kuten -1516.
- KÄÄNNÖSNYKÄYS-rivit noin 900 ms:n ruuduista ovat tässä ajossa kuvakaappausten aiheuttamia (2 s:n välein), eivät pelin nykäyksiä. Tätä ei ole erikseen mitattu ilman kuvia.

## OPIT
QA-käsikirjoitus vaikuttaa tulokseen kuten koodi: `kaanna` + `botti 1` samalla rivivälillä kumosi käännöksen, ja myöhästynyt `elinvoima` jätti tason näkemättä. Lue käsikirjoitus lokia vasten ennen kuin kirjaat vian peliin. Testissä opetus käynnistetään vasta, kun keisari on seinällä, koska pelissäkin opetus alkaa ohjauksen siirtyessä; muuten ohjeet näyttävät väärältä.
