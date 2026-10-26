# Merge-pyyntö: natiivi-ui/juliste-url de8852b (masterin bcc46ef päällä), Natiivi-UI 25.9.2026

Testit: unity-tarkistus 0 virhettä. Testikäännös b12k (6fff2e3, FB234D08).

## Vika
Skeemasta 1.20 alkaen sisältöpaketin juliste kuva.url on täysi osoite. UiSisalto liitti sen julistekansion perään
(…/julisteet/https://…), jolloin tulos oli 404 ja julistegalleria sekä laukun vedokset jäivät tyhjiksi.

## Korjaus
UiSisalto.cs: täysi osoite (http/https) käytetään sellaisenaan, ja vain tiedostonimi liitetään kansioon.

## Todennus
natiivi-b12k-julisteet-iphone.jpg: `ui julisteet 7` näyttää Euroopan julisteet kuvineen (Moskova … Amsterdam).
