# Merge-pyyntö: natiivi-ui/ei-webissa 42c5015 (build 10), Natiivi-UI 24.9.2026 klo 16.4x

Fablen päätös Ei webissä -listasta (kaikki webin mukaan paitsi E2 ja E6). Testit: unity-tarkistus 0, kaanna 261/261,
uss-tarkistus ok. Kuvattu testi/b10 (6f2acd5) ja testi/b10b (aa17f73 = ecc5d2a). 42c5015 = ecc5d2a + tehosteäänten esilataus.

## Nostokohdat build 10:ssä (Fablen kysymys)
- E10–E11 ryhmämerkki: levy r 3,4 ilman sisäsymbolia (paperi .95, aiheväri .5, rengas #4b3a1c 1,1 px .85), nimiö vain
  lähizoomissa (NostoKerros.Lahella, sama portti kuin lahizoom-nostoilla) — NostoKerros.cs:ään lisätty vain Lahella-ominaisuus.
- E3 nostokortti: kuvaton kohde ja lisäkaupunki napautuspisteen viereen ilman himmennystä, raahattava (8 px), napautus
  tekstiin sulkee; kuvallinen kortti keskelle kuten webin kuva edellä. Lisäkaupunki .kaupunkipopup-mitoin.
- Ei vielä: löydös 27 (hytinä panoroinnin jälkeen) — seuraava erä.

## Kuvaparit (vasen web tuotannosta, oikea natiivi) kansiossa pariteetti-b9/kuvapari-b10-*.jpg
| Kohta | Kuvapari | Mitat (web → natiivi) |
|---|---|---|
| E10–E11 | E10-11-ryhmamerkki-iphone | maan näkymässä ryhmät pelkkinä levyinä, nimiöt vain yksittäisillä |
| E3 | E3-lisakaupunki-iphone, -ipad | iPhone web x 18 w 362 / natiivi min(544, 92 %) reuna 10; iPad web x 21 w 544 y 172 = natiivi (napautus 496,677) |
| E1 | E1-kaupunkikortti-iphone | natiivissa ei Sulje-nappia; web-kuva jäi kartaksi (liuskan napautus kankaalle ei osunut) |
| E5 | E5-matkavalinta-iphone | rivit 44 px, väli 6,4, pohja .72, 18,4 px; kuvan natiivi b10:stä (ikoni korjattu ecc5d2a:ssa bussiksi) |
| E9 | E9-luelisaa-iphone | "Lue lisää aiheesta" ilman nuolta, pisteviiva .45 |
| E13 | E13-postikortti-iphone, -ipad | vinous −4,5°/+4°, laskuri i/n, lähde tekstin perässä; iPad 720 / kuva min(52vh, 500). Web Pariisi, natiivi Kairo |
| E4 | natiivi-b10b-selite-*.jpg | ✕ SVG:nä (web .fokuskohde-sulje 30 × 30) |

Ei kuvaparia (käytös tai ei testitilaa): E7 versiorivi, E8 kertojakytkin, E12 wiki-kuva, E14 lipun tarkennus (FRA:lla ei
versioita), E15–E20. Poikkeamat alustan takia: UITK:ssa ei blur-suodatinta (E14 häivytys 0,3) eikä box-shadow'ta (postikortti).

## Muuta
- Tietoja: lennon pinnan attribuutiot (Natiivisepän tilaus).
- Aanet: efekti-*.mp3 esiladataan muistiin ja suojaan (Linssisepän sulkupiikki 45–50 ms).
