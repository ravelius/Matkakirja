# Merge-pyyntö: natiivi-ui/nosto-levea 43b70aa (ec91ce9 + havainne 77f71a3 + master 6ff16f3 + ui kierto) (masterin 82e1e8d päällä), Natiivi-UI 24.9.2026

Testit: unity-tarkistus 0 virhettä (1 vanha varoitus Pistenaytto.cs), uss-tarkistus ok.
Koskee vain ruutuja, joiden leveys on ≥ 1100 pt (iPad vaakana: 11" 1194, 13" 1366). iPhone ja iPad pystyssä ovat
ennallaan, koska koodi kulkee alle 1100 pt:n kohdalla vanhaa polkua.

## Mitat (web tuotannosta, Millaun silta, tools/.natiivi-ui-b12-nostoleveä.mjs Laitetestaajan checkoutissa)
Koodi: js/nostokuva.js (NOSTOKUVA_LEVEA_RAJA 1100, LEVEA_KATTO 1100, KUVAPALSTA_OSUUS 0,5, PYSTY_OSUUS 0,32,
KUTISTUS_MS 260, nostoPalstoiksi, kutistaNakyvasti) ja css/fokusnosto.css osio 13 (flex, align-items flex-start,
gap 1,5 rem, kuvapalsta enintään 50 % ja pystykuvalla 34 %).

| | 1194 × 834 | 1366 × 1024 |
|---|---|---|
| vaihe 1: kortti / kuva | 986 / 934 × 622 | 1127 / 1076 × 716 |
| vaihe 2: kortti | 986 (pohja 934) | 1100 (katto, pohja 1052) |
| kuvapalsta / väli / tekstipalsta | 467 / 24 / 444 | 525 / 24 / 501 |
| palstojen yläreuna | otsikon alla, sama molemmissa | sama |
| yläpuolella koko leveydellä | luokka (TEKNIIKKA) + otsikko | sama |
| tekstipalstassa | leipä yhtenä palstana (< 600), kysy pululta, kysymykset, reaktiot | sama |

Chromiumin mittauksessa on 15 px:n vierityskaista, jota iOS:ssä ei ole (kortti 986 = 934 + 32,4 + 3,2 + 15).
Natiivi käyttää samaa kaavaa ilman kaistaa. Natiivi vähentää turva-alueen ruudun korkeudesta kuten web
nostokuvaRuutu, joten 11":n iPadilla kuva on korkeuskaton takia hieman webin headless-kuvaa pienempi.

Kuvat: web-nosto-levea-v1-1194x834.png, -v2-1194x834.png, -v1-1366x1024.png, -v2-1366x1024.png

## Toteutus (UI/Nostokortti.cs, Kartta.uss)
- MitoitaKuvaEdella: ≥ 1100 → vaihe 1 vakioleveys ilman 712:n kattoa, vaihe 2 pohja min(vakioleveys, 1052), kortti
  min(pohja + 32,4, ruutu − 24, 1100).
- Palstoiksi (web nostoPalstoiksi): kuvasarja vasemmalle, kaikki sen jälkeen oikealle. Pinoksi palauttaa pinon
  kierrossa alle rajan.
- Kuvapalsta pohja × 0,5 (pystykuva × 0,32). Kehys on palstassa kuvan oman muotoinen, enintään korkeuskattoon.
- Kutista (web FLIP 260 ms): kuva liukuu vaiheen 1 paikasta palstaansa, ja teksti on heti paikallaan.

## Kuvaparit
- b11n (a377d05 = master 6ff16f3 + 43b70aa), iPad vaakana (`ui kierto vaaka`):
  kuvapari-b11n-nostolevea-v1-1194x834.jpg ja -v2-1194x834.jpg. Vaiheessa 1 on iso kuva ja LISÄÄ. Vaiheessa 2
  luokka ja otsikko ovat koko leveydellä, kuva ja kuvateksti vasemmalla palstalla, ja teksti alkaa samalta
  yläreunalta oikealla. Natiivin kuva on noin 900 pt (webin headless-kuva 934), koska turva-alue pienentää
  korkeuskattoa samalla kaavalla.
- b11m (373d0a8): iPadin pystyasennon nostokortti on ennallaan (natiivi-b11m-nostokortti2-ipad.jpg), ja iPhonen
  Havainnekuva-merkintä jatkaa viimeistä riviä (natiivi-b11m-nostokortti-iphone.jpg).
- Jää erilaiseksi: webin vaiheen 2 kortti on ruudun korkuinen (maxHeight ruutu − 24, ylhäällä 12). Natiivin kortti on
  keskitetty ja enintään 88 %, kuten pystyasennossa b11:ssä.
- Testikomento `ui kierto vaaka|pysty|auto` on tullut lisää (UiKomennot).

## Lisäys 77f71a3: Havainnekuva-merkintä (Fable 24.9. klo 20.3x)
Web js/havainnekuva.js lisaaHavainnekuvaMerkki + css/fokusnosto.css .kuvateksti-havainne, mitattu fokusnosto.css
ladattuna (web-havainne-css-*.png): American Typewriter 9,14 px, versaali, harvennus 0,73, täyte 0/3,2, reunus 1 px
rgb(196,187,171), pyöristys 3, vasemmalla 4,11, korkeus 14,3, teksti rgb(119,104,86) (sRGB-yhdistelmät). Kohdekortin
paljas teksti (web-havainne-*.png) on webin bugi, joka on ilmoitettu Pelikoodarille. Sanaväli on Iowan 13,44 px = 3,73 px.
