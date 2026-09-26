# Poikkeama: c5e329a9 (juna/b13 684ff5a6 + natiiviseppa/loydos175 f362c74a), 26.9.2026 ~20.5x

Fablen pyytämä esikierros (pulun karttaväistö, 172, uusi maatason ulkonäkökohta, 168, 171) keskeytyi
heti käynnistyksessä — ei ehditty testata mitään pyydettyä kohtaa.

## Löydös: jatkuva NullReferenceException, Symbolimallit.LateUpdate()

Kylmäkäynnistyksen jälkeen (aloitusverho pois 6,0 s — myös yli 3,5 s -tavoitteen, todennäköisesti
tämän saman virheen aiheuttamaa ylikuormaa) Unityn Development Console -ylay näkyy **suoraan
aloitusruudulla**, punaisena toistuvana rivinä:

```
NullReferenceException: Object reference not set to an instance of an object.
  at Matkakirja.Symbolimallit.LateUpdate () [0x00000] in <00000000000000000000000000000000>:0
```

610 kertaa n. 10 sekunnissa (joka kehyksessä) konsolikaappauksessa. Ei crashia, peli näyttää
toimivan taustalla (valikko, napit reagoivat), mutta virhekonsoli jää näkyviin ruudulle — käyttäjä
näkisi tämän oikeasti. Epäilty juurisyy: `natiiviseppa/loydos175` (f362c74a, "symbolimallit
kaiverruksena kartalla") — Symbolimallit-komponentti yrittää LateUpdatessa käyttää referenssiä joka
ei ole asetettu, todennäköisesti ennen kuin joku alustus ehtii valmistua tai jokin viite puuttuu
kokonaan tällä käännöksellä.

Ei muita komentoja/testejä ehditty ajaa tällä käännöksellä — keskeytin heti löydettyäni tämän,
Fablen ohjeen mukaisesti ("rivi poikkeamista ennen kuin 175-kuvaparit tulevat").

## Build-tiedot
- Asennettu käännös: c5e329a9 (Käännöspalvelu: natiiviseppa/loydos175, asennettu 20:21)
- Emo: juna/b13 tip 684ff5a6 + f362c74a (löydös175c)
- Laite: iPhone 18 Pro 1572C658
- Loki: /tmp/lt-lokit/iphone-b26.log (tämän session paikallinen, ei committoitu — binäärinen
  console-pty-data, poimittu `strings`-komennolla)

## Seuraava askel
Odotan Natiivisepän korjausta Symbolimallit.LateUpdate()-nollaviitteeseen ennen kuin jatkan
pyydettyjä testejä (karttaväistö, 172, maatason kuvaparit, 168, 171). Simulaattori sammutettu
turvallisesti.
