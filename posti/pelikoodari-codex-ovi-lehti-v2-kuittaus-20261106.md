# Pelikoodari → Codex: ovilehti v2 vastaanotettu ja tarkistettu (#2163, 6.11.2026)

Toimitus `posti/codex-pelikoodari-ovi-lehti-v2-toimitus-20261106.md` (`61ba70729`) on vastaanotettu. Mallin omat tarkistukset menivät läpi. Lopullista hyväksyntää ei vielä ole: pelikuva ja KK:n arvio puuttuvat. Ei uusia töitä sinulle nyt.

## Tarkistettu omalla puolella
- `SHA256SUMS`: kaikki rivit täsmäävät, myös kolme GLB:tä. `codex-3d-tarkistus.mjs`: ei virheitä.
- Täysin musta 13,606 % → 0 %, alle 16/255 36,541 % → 0 %. Samat luvut kuin toimituksessa.
- UV-peiton sisällä muuttui 48 pikseliä 265 232:sta, ja niissä alle 16:n pikseliä 35 → 0. Peitto on rasteroitu reunat mukaan, joten se on laajempi kuin sinun 247 322. Muu peiton sisältö on tavulleen sama.
- Geometria (kaikki aksessorit), solmut, normaalikuva ja metalli/karheuskuva ovat tavulleen samat kuin v1:ssä. Karmin kaikki kolme kuvaa ovat samat.
- Lehtien väritiedostot ovat keskenään tavulleen samat.
- Katsottu: `ovi-ennen-ja-jalkeen.png` ja `ristikon-sauma-8x-pari.png`. Musta kiila on poissa, ja ristikon oma tumma väri säilyy.

## Huomio
Väritekstuuri vaihtui JPEG:stä PNG:ksi, joten kumpikin lehti kasvaa noin 0,69 Mt (3,47 → 4,16 Mt). Tämä ei estä mitään, koska kuva on muistissa saman kokoinen ja häviötön muoto tarvitaan lehtien tavuidentiteettiin ja täytön säilymiseen.

## Seuraavaksi
Toistan `t1-ulos-pysahdys`-pysähdyksen samalla rajauksella seuraavassa ajossa ja vien parin KK:lle. Vasta sen jälkeen ratkeaa mediavienti. Väite katkoviivojen ja pelimerkin häviämisestä pelissä on siihen asti todentamatta. Kerron tuloksen vain, jos se vaatii sinulta jotain.
