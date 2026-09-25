# Opus → Fable: kuvalähteet, loput pinnat (19.9.2026)

Erä `opus-local-kuvalahteet-2`, Matkakirja Opus local (Mac Studio), 21.44–22.05 Suomen aikaa.
Pohja origin/main (e707f884, v1966). Omistajan linjaus 19.9.2026: "Havainnekuva ja lähteet
saa näkyä vasta kun kuva klikataan isoksi. Tsekkaa kaikkialta läpi".

## Tulos, 390 × 844 (savuke-kuvalahteet)

| Pinta | Kortilla (ennen → jälkeen) | Suurennoksessa (ennen → jälkeen) |
| --- | --- | --- |
| Historian hetki | 0 → 0 | 1 → 1 (havainnekuvaselite) |
| Eläintäky FIN (yksi kuva ja karusellit, 3 kutsua) | 0 → 0 | **0 → 1** (korjattu) |
| Kaupunkilehti Pariisi: kansikuvakaruselli | 0 → 0 | 1 → 1 |
| Kaupunkilehti Pariisi: galleria ennen/nyt (2 kuvaa) | 0 → 0 | 1 → 1 kumpikin |
| Kaupunkilehti Pariisi: Matkailijalle-kuva | 0 → 0 | 1 → 1 oppaan kautta (kuva avaa Matkaoppaan, omistaja 16.8.; oppaan kuvan suurennoksessa lähde) |
| Aikajanan avauskuva | – | ei käytössä: yksikään linssi ei anna `esittely.kuva`-kenttää |
| Fokusvirran täkynosto | – | ei käytössä: `FOKUSVIRTA_KORTIT = false`, `avaaFokusvirta` palauttaa false |
| Astronautin kameran havaintoikkuna | 0 (koodista) | lähdeketju (Aineisto, Lisenssi, NASAn kuvasivu) lisätiedoissa väkäsen takana |

Astronautin kamerassa havaintoikkuna on itse koko ruudun valokuvanäkymä. NASA-rivi siirtyi
16.9. lisätietoihin (js/linssit/satelliitti.js), ja lisätiedot ovat oletuksena piilossa.
Tämä rivi on koodista luettu: en mitannut sitä tällä savukkeella (vaatii pallon ja linssin),
mutta savuke-satelliittilinssi mittaa jo lisätietojen lähdeketjun.

## Korjaus

`js/elaintaky.js`, kolme `avaaKohdeSuurennos`-kutsua (yksi kuva, kaksivaiheinen kortti,
karuselli): suurennokselle välitettiin vain `{ osoite, selite }`, joten suurennoksen
lähderivi (`fokuskohteet.js` `.fokuskohde-zoomlahde`, lukee `kuva.lahde`) jäi tyhjäksi.
Kortilla lähde oli jo piilossa (`kortinKuvalahde`), joten lähde ei näkynyt missään.
Nyt suurennos saa `lahde`n samalla oletuksella kuin kortin rivi
("Matkakirjan havainnekuva") sekä `tekijaId`/`tekija`.

## Savuke (`tools/savukkeet/savuke-kuvalahteet.mjs`)

- Uudet pinnat: historian hetki, eläintäky ja kaupunkilehti. Lehdessä jokainen näkyvä kuva
  napautetaan erikseen. Matkailijalle-kuvassa reitti on opas → suurennos.
- **Mittarin korjaus**: kuva napautetaan `pointerdown`in ja `click`in parilla. Pelin
  `napautuksesta` (js/ui.js) hylkää pelkän `click()`in vierityksenä, joten vanha tapa ei
  avannut lehden kuvia.
- Suurennos on nyt "napautuksen jälkeen näkyviin tulleet lähderivit missä tahansa", koska
  lehden suurennos avautuu dialogin sisään.
- `RIVI` laajeni: Commons, (PD), Library of Congress.
- `PINNAT_VAIN=regex` rajaa ajon.

| Ajo | Tulos |
| --- | --- |
| Vastakoe (vanha elaintaky.js) | eläintäky: suurennoksessa FAIL |
| Korjattu | **21/21** |

`node --test tests/*.test.mjs`: pass 3698, fail 0.

## Jäi tekemättä

- Astronautin kameran havaintoikkunaa en mitannut tällä savukkeella (katso yllä).
- Maalehti, nähtävyyslehti ja Tutki-sivun wiki-galleria: jo mitatut kohdekortit ja
  maalehtinosto kattavat saman apurin, mutta maalehden ja nähtävyyslehden omat galleriat
  ovat mittaamatta.
