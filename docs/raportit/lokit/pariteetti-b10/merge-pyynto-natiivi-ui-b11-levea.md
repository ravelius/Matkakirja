# Merge-pyyntö: natiivi-ui/nostokortti-levea d664f5e (lehti-otsikot 69f4cde:n päällä), Natiivi-UI 24.9.2026

Testit: unity-tarkistus 0 virhettä, uss ok.

## Mitat (webin koodi, tuotanto)
- js/nostokuva.js jaadytaLeveys + nostokuvanVakioleveys + ui-apurit.js suurennoksenMitat: kuva edellä -kortin leveys on
  min(vakioleveys + reunat, min(ruutu − 24, 760)), jossa vakioleveys on 3:2-kuvan leveys ruudulla (0,99 tai 0,82 × leveys − 44,
  korkeus 0,94 × korkeus − 150), enintään 760 − 48 = 712. Sama leveys molemmissa vaiheissa. Mitattu web: iPad 834 → 748
  (Chromiumin vierityskaista 3,6 mukana, iOS:llä 0), iPhone 393 → 369 (web-nostokortti-mitat-b11.txt).
- css/styles.css .lehtipalsta: @container ≥ 600 px → column-count 2, väli 1,4 rem, vasen tasaus, p 0 0 .65em;
  pitkä = ≥ 600 merkkiä tai ≥ 2 kappaletta (ui-apurit.js onPitkaNostoteksti).
- Kortin täyte 13,6/15,2/15,2 molemmissa vaiheissa (mitattu).

## Jää seuraavaan
- ≥ 1100 pt:n kuva/teksti-taitto (iPad vaaka), tyyppikuvake.

## Kuvaparit (testi/b11c e82e92d = 73a2c5e)
- kuvapari-b11c-nostokortti-iphone.jpg: kortti on 369 leveä kuten webissä (vaihe 1 ja 2). Selitteen väri täysresoluutiolla on 71,67,60,
  eli sRGB-yhdistelmä toimii (b11a: 117).
- kuvapari-b11c-nostokortti-ipad.jpg: Millau, kortti on webin levyinen molemmissa vaiheissa, ja vaiheessa 2 teksti on kahdella palstalla anfangin kanssa.
  VIKA b11c:ssä: anfangin kolmas viereinen rivi osui alaosan päälle. Syy oli, että rivin väli mitattiin yhden rivin
  korkeutena. Korjaus on d664f5e, ja se tarkistetaan testikäännöksessä b11d ennen mergeä.
- b11d (7f11b12 = d664f5e): kuvapari-b11d-nostokortti-ipad.jpg ja -iphone.jpg sekä täysresoluutioinen rajaus
  natiivi-b11d-anfangi-ipad-rajaus.png. Anfangin vieressä on kaksi riviä ilman päällekkäisyyttä, ja palstat ovat tasan. iPhone on ennallaan (369).
