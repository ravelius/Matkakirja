# Merge-pyyntö: natiivi-ui/radio-loydokset 22d04c9 (master f02376b), Natiivi-UI 24.9.2026

Fablen radiolöydökset 39, 40 ja 42 (Linssisepän välittämä, omistajan build 9 -kuva). Testit: unity-tarkistus 0 virhettä.

## Mitat (web tuotannosta, .natiivi-ui-b11-radio.mjs, Marseille, radio auki 0,4 s ja 3 s)
- iPhone 393: .radiosoitin z 60 (0,742,393×110), kotelo 6,747,380×105; pulun nappi .pollo-nappi z 40 (287,743,48×48), eli kotelo peittää pulun.
  .karttaselite-nappi 338,71 40×40 näkyy. Sulkupilleriä ei radiossa ole.
- iPad 834: .radiosoitin z 60, kotelo 178,1072,478×122; pulu 728,1088 kotelon oikealla puolella. Selite 777,78.
- Web piilottaa selitteen vain body.aikajana-paalla- (aikajana.js) ja body.linssi-satelliitti-tiloissa (css/styles.css:12042–12052).

## Muutokset
- 40: radion kotelo kerrokseen 36 (LinssiUi.RadioKerros) pulun (35) päälle; radion karttanapit pysyvät kerroksessa 25.
- 42: Karttaselite.NaytaNappi linssin aikana, paitsi keksinnöissä, ihmisen matkassa ja astronautin kamerassa; taikalasit pysyvät selitteen alla (+48).
- 39: ei muutosta. b10:n linssisulun jälkeen ✕ on oikeassa yläkulmassa yläpalkin alla (kuvapari-b11-radio-ennen.jpg).

## Kuvaparit
- Ennen: kuvapari-b11-radio-ennen.jpg (web · natiivi b11b, iPhone ja iPad).
- Jälkeen: kuvapari-b11c-radio.jpg (testi/b11c e82e92d). iPhone: kotelo peittää pulun, ja selite on oikeassa yläkulmassa ✕:n oikealla puolella (web 338,71). iPad: pulu on kotelon oikealla puolella, selite ylhäällä ja taikalasit sen alla, kuten webissä.
