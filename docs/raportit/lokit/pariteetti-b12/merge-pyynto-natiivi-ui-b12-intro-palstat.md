# Merge-pyyntö: natiivi-ui/intro-palstat 83e75d5 (masterin bcc46ef päällä), Natiivi-UI 25.9.2026

Testit: unity-tarkistus 0 virhettä. Testikäännös b12l (179c5e1, FB234D08, yhdessä natiivi-ui/pariteetti-b12-2:n kanssa).

## Malli (web)
@media (min-width: 768px) .dialog.lehti #arrival-intro: column-count 2, väli 2 rem (32), text-align justify, hyphens auto
ja kappaleväli 0,7 em (American Typewriter 16 px, riviväli 1,6 ja anfangi). Mitat: pariteetti-b12/web-intro-mitat.txt
(iphone-vaaka cc 2, ipad cc 2, iphone pysty ta start).

## Toteutus
- Lehtinakyma/LehtiKainalo IntroPalstat: kaksi palstaa, kun paneeli on ≥ 768. Virtaa-mittari on yleistetty.
- Tavutus.Suomi (U+00AD) on kansiossa Kappalejako.cs.
- Tasaus `<align="justified">`. Testikomento `ui tasaus lainaus|ilman|flush|pois` vaihtaa tagin, kun lehti avataan
  uudelleen.
- Kartta-testit/kaanna.sh palautettiin masterin muotoon. Haaran ensimmäisessä commitissa oli vahingossa vanha versio.

## Todennus b12l (iPhone vaaka, pisteskaala 874 × 402)
- natiivi-b12l-intro-palstat-iphone-vaaka.jpg: kaksi palstaa, tavutus (syn-/tyi, Akropo-/liin, kaivet-/taessa) ja
  tasatut rivit. Oikea reuna vaihtelee 3–7 px tavuviivan ja lihavoinnin vuoksi, ja viimeinen rivi on vasemmalla
  kuten webissä. `flush` tasaisi myös viimeisen rivin, mikä todistaa tagin toimivan.
- b12j:n "ei tasannut" johtui viiteskaalasta: iPhonen vaakapaneeli oli 648 < 768, jolloin intro jäi yhdelle palstalle
  ja webin mukaisesti liehuvaksi.

## Riippuvuus
iPhonen vaaka-asennossa kaksi palstaa tulee vasta pisteskaalan kanssa (natiivi-ui/pariteetti-b12-2 042f361, Fablen
päätös 25.9.). iPadilla toimii itsenäisesti.
