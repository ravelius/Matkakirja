# Merge-pyyntö: natiivi-ui/kartuscha-reuna b3cca79 (masterin 6ff16f3 päällä), Natiivi-UI 24.9.2026

Testit: unity-tarkistus 0 virhettä, uss ok. Testikäännös b11o (f965bf4).

## Mitat (web tuotannosta, Pariisi, tools/.natiivi-ui-b12-maakortti.mjs ja -liiku-sana.mjs)
- .maapaneeli-kortti kiinni: täyte 0. iPhone x 20,2, oikea reuna 157,3. Liikun nousuraja on 393/2 − 34 = 162,5, joten
  Liiku ei nouse (--liiku-pohja tyhjä). Natiivissa 8 pt:n täyte vei reunan noin 173:een, ja Liiku nousi kortin päälle.
- Liiku (css erä 19): nappi 44 × 36 on läpinäkyvä, ilman reunusta ja kompassia. Sana American Typewriter 600 11,5 px,
  harvennus 1,15, #46331f, peittävyys 0,65, kerman hehku 2 px / 5 px. Natiivissa peittävyys on läpinäkymätön
  sRGB-väri rgb(128, 111, 88). iPhonella on kevyt reuna (Raamattu NATIIVIN iPHONE-ASETTELU, hyväksytty poikkeama).

## Kuvaparit (b11o)
- kuvapari-b11o-liiku-iphone.jpg: Liiku on alhaalla keskellä kortin vieressä kuten webissä (ennen b11m:ssä kortin
  päällä). Kartuschan vasen reuna on 20 kuten webissä.
- kuvapari-b11o-liiku-ipad.jpg: Liiku on pelkkä sana alhaalla keskellä kuten webissä.
