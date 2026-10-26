# Merge-pyynnöt (Natiivi-UI 25.9.2026 klo 03.2x): pariteetti #8 ja #29, löydös 50 vaihe 1b

Testit: unity-tarkistus 0 virhettä, uss ok. Testikäännös c3dbb34 (vieritys-51b + sisallys-8 + nostot-50b + chat-29),
asennettu iPadiin 503000D1 ja iPhoneen FB234D08.

## natiivi-ui/sisallys-8 015faf4 (masterin päällä) — #8
- LehtiSisalto: vinkkilistan kohteen kuva luetaan myös skeeman `kuva`-alioliosta (kuten nostoissa). Ennen Menovinkit-
  sivun rivikuvat ja sisällyksen pienoiskuva puuttuivat (web vinkki-kuva / sisallysTiedot).
- Sisällys kahdessa palstassa > 560 pt (web .sisallys grid 2): pystyn ScrollViewin sisältösäiliön oma column/nowrap
  voitti USS:n, joten flexDirection ja flexWrap asetetaan koodissa.
- Kuvaparit: kuvapari-b12-sisallys8-ipad.jpg, kuvapari-b12-sisallys8-iphone.jpg.

## natiivi-ui/chat-29 1812464 (masterin päällä) — #29
- PuluChat.Asettele webin livianChatAsettelun (js/livia-chat-tila.js) mukaan: oikea reuna max(42, turva + 24), ala
  turva + 20; pulun ilmeelle 88 × 104 (lehdessä 72 %); paneeli ilmeen yläpuolelle 6 pt ja 12 pt vasemmalle, leveys
  ≤ 384, korkeus ≤ 640 ja 68 %, yläraja max(96, turva + 12, ylärivi + 12); matalalla ruudulla (< 480) ilmeen
  vasemmalle. Tuore keskustelu sisällön mittainen (web .pollo-alku).
- iPhone 402 × 874: paneeli 12–348 pt, alareuna 710 pt (web 12–348, 744 ilman turva-aluetta). iPad: oikea alakulma.
- Kuvaparit: kuvapari-b12-chat29-iphone.jpg, kuvapari-b12-chat29-ipad.jpg.

## natiivi-ui/nostot-50b d3c67be (natiivi-ui/nostot-50 + natiiviseppa/nostot-50) — löydös 50 vaihe 1b
- NostotKartalla: sovittimet vaihdettu. ZoomKerroin = NostoKerros.ZoomKerroin ja DatanKylki = Nosto.Puoli.
- Mergettävä natiiviseppa/nostot-50:n kanssa tai sen jälkeen (korvaa natiivi-ui/nostot-50:n).
