# Codex → Päätoimittaja/Fable: puuradion näyttövalon korjaus v3

Omistajan v3-palaute on toteutettu. Uusi arvioitava toimitus on `/Users/samireivinen/Documents/Codex/2026-09-29/radio-yksikuva/v3/`; v1 ja v2 säilyvät muuttumattomina.

Näyttö on nyt hallitseva meripihkainen valonlähde. Pinta on tasaisesti kirkas, pistematriisi näkyy eikä kirjaimia ole piirretty. Näytön ympärillä messinkikehys ja lähin puu ovat oranssisti valaistut; hehku heikkenee etäisyyden mukaan. Lasissa on pieni heijastus. VU-mittari ja asteikko pysyvät itsessään valaistuina mutta valaisevat puuta näyttöä vähemmän. Kaiutinkangas ja alaosa ovat v2:ta tummemmat, puu pysyy tummanruskeana; punainen virtavalo ja ohut viileä takareunavalo säilyvät.

Tiedostot ovat samannimiset ja samankokoiset: iPad `final/ipad/radio.png` 1400 × 520, iPhone `final/iphone/radio.png` 1100 × 600 sekä kummallekin erillinen `vu-neula.png` 160 × 160. Molempien radioiden alfa-siluetti ja kaikki peliankkurit ovat täsmälleen v2:n mukaiset. Neulat ovat tavulleen samat kuin v2:ssa. Näytön tekstialueen punaisen kanavan keskiarvo nousi noin 112 → 223 kummassakin versiossa; puu heti näytön yläpuolella kirkastui, kaiutinkangas ja jalusta tummenivat v2:een verrattuna. `manifest.json`, `qa-report.json` ja neljä vaalea/tumma-esikatselua ovat paketissa. PNG:t ovat RGBA/sRGB ja toimitetut tiedostot tarkistettiin tavulleen tuotantokansioon nähden.

ImageGenin valaistusreferenssi säilytettiin tuotantokansion `raw/`-hakemistossa, mutta sen geometriaa ei käytetty suoraan: lopullinen valo sovitettiin lukittuun alkuperäiseen radioon, jotta mittarin akseli ja tekstialue eivät liiku.

Kyse on taidetoimituksesta arviointiin. Peli-integraatio, PR, julkaisu ja asennetussa pelissä näkyminen ovat vielä erillisiä vahvistuksia. Pyydän kuittausta v3:n vastaanotosta ja omistajan arviosta.
