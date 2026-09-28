# Merge-pyyntö: natiivi-ui/iphone-island 6d39af4 (build 9), Natiivi-UI 24.9.2026 klo 16

Haara sisältää bf7af3d:n (UI-lukijat päätaso ensin, pöllön valintavihje, Noppa n -lista pois) + 2cb5a31
(Fablen päätös B: vihje noudattaa tekstipiiloa) + master 543b85f yhdistettynä. Testit: kaanna.sh 261/261,
unity-tarkistus 0 virhettä.

## Kuvaparit (vasen web tuotannosta, oikea natiivi testi/b9-ui ae76378, iPhone 17 FB234D08 / iPad 503000D1)

| Kohta | Kuvapari | Tulos |
|---|---|---|
| Ateena s. 2 "Arki ja tavat" (0fac056 päätason aiheet) | kuvapari-lehti-arki-iphone.jpg, -ipad.jpg | Sisältö sama: otsikko, ingressi, "Souvlaki syödään seisaaltaan", kuva ja lähderivi |
| Sama sivu, tehtävä (tehtava 332 päätasolta) | kuvapari-lehti-tehtava-iphone.jpg, -ipad.jpg | Tehtävä latautuu nyt aihesivulle (ennen puuttui); sama kysymys ja 3 vaihtoehtoa. Otsake AARTEEN AVAUS vs LEHDEN KYSYMYS johtuu tilasta (webin dev-tilassa aarre jo auki, fokustehtavat.js AARRE_AUKI_OTSAKE) |
| Pöllön valintavihje iPad (bf7af3d) | kuvapari-vihje-ipad.jpg (web: noppa-kartalle-web-20260924/noppa-valintavihje-834x1194.png) | Sama teksti, kupla pulun yläpuolella 15 s nopan jälkeen |
| Valintavihje iPhone (2cb5a31) | kuvapari-vihje-iphone.jpg: web (ei kuplaa) · natiivi master 9a5618b 30 s siirtovaiheessa (ei kuplaa) · pulun napautus → chat ja "Näytä puhekuplat" | Sama kuin web. Ennen: natiivi-vihje-iphone.jpg (kupla näkyi) |

## Mitat (web-lehti-mitat.txt, .natiivi-ui-b9-web.mjs)

Webin tehtävärivit iPhone: x 18, w 357, h 44, Iowan 15,68 px, ei taustaa (valintaruutu + rivin erotinviiva).
Alanapit: Edellinen x 132 w 129 h 50, Seuraava x 272 w 106 h 50, American Typewriter 12,48 px.
Kortin sivutäyte 15,2 px. Vihjekupla iPad web: oikea reuna ~59 px ruudun reunasta, hännällä; natiivi ~14 px, ei häntää.

## Havaitut erot (eivät tämän haaran muutoksia, uusiksi ERO-riveiksi build 10:een)

1. Lehden leipäteksti: webissä anfangi ja lihavoitu alku kappaleen alussa + kappalejako ("Vartaan oma nimi…" omana kappaleenaan); natiivissa yksi kappale ilman anfangia, teksti pienempi ja vaaleampi.
2. Tehtävän vastausrivit: webissä valintaruutu + erotinviiva ilman taustaa; natiivissa pyöristetyt valkoiset napit.
3. "Lue lisää aiheesta ›" nuoli (E9, jo listalla).
4. Alanapit: webissä kapiteelit kahdella rivillä laatikossa ("POISTU LEHDESTÄ", "EDELLINEN / ATEENA PINTAA…"); natiivissa pienaakkoset.
5. Vihjekupla iPad: natiivista puuttuu häntä ja kupla on 45 px liian oikealla.
