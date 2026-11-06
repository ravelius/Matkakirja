# Natiivi-UI: luovutus 6.11.2026 klo 15.50 (pehmeä kontekstiraja 26 %, 7.37)

Korvaa -1510:n työlistan. -1510:n kohdat "Mitä muutin" ja "Opit" sekä -1306:n Havainnot ja -1150:n ja -1140:n avoimet ovat voimassa. Lukulista 7.47: lue itse.

## Lue ensin
proto-3d/lokit/nui-ui-61cbc0856/tulos-nui.md (uusinta 61cbc0856 ja kaatokoe: A, C, D kunnossa; B ja E auki; ei liitosta)

## Tila
Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-vesinimi, haara natiivi-ui/ui-sarja-219, kärki 88e2d1eb5 (peilissä natiivi-backup), ei muutoksia. KÄÄNTÄMÄTTÄ JA AJAMATTA.
Uudet commitit 61cbc0856:n päällä:
- 24ce342cb B: LinnaValikko.SovitaKorkeus lukee yläreunan asetetusta style.topista, ei resolvedStylestä. Lokiin "ui linnavalikko: <näkymä> yläreuna X (laskettu Y), raja Z".
- 88e2d1eb5 E, vain diagnostiikkaa: Kuvat.Lataa kirjaa "ui kuva hidas: <nimi> vuoro x s, lataus y s (purkuja, kesken)" yli 0,5 s:n latauksista. Asettelutesti kirjaa rajan ylittyessä "-- kuvat <nimi>: purkuja N/2, kesken M: <nimet>". Ei raja- eikä toleranssimuutosta.

Kaatokoehaara natiivi-ui/ui-sarja-219-kaatokoe (fd07faea6) on luettu, tulos odotettu. Se on poistamatta; -1510 pyysi poistoa, kun koe on luettu. Poista haara omasta checkoutista, jos estettä ei ole.

## JU:n ajo pyydetty 15.48 (viesti oli vielä jonossa; tarkista, että JU otti sen)
88e2d1eb5, sama käännös, kansio lokit/nui-ui-88e2d1eb5/:
1. pallo keskitys iphone-pysty x3: pysty-keskitys-N.txt
2. pallo iphone: pallo-iphone.txt
3. linna iphone: linna-iphone.txt
JU kertoo rivit ja rinnakkaiset ajot sekä sen, onko runko yhä d092f48cc.

## PT, sellaisenaan
15.4x: "sopii: E:hen Kuvat.Lataan vaiheiden kestot lokiin, vain diagnostiikkana, ei raja- tai toleranssimuutosta. Ajo B:n korjauksen kanssa samassa varauksessa JU:n vuorolla: iPhone pysty keskitys x3 ja vaaka-iPhone, ei omaa ajoa kummallekin. E:n ehto ennallaan: hajonta = E auki, ei liitosta. B: syy ja korjaus asetteluun, ei toleranssia."
Tarkennus 15.1x: "PT:n luovutuksen 14.58 mukaan runko on julkaisija/runko-219-muisti = d092f48cc (84872eaa9 + taivaan dither, 1 tiedosto) … Varmista silti JU:lta ennen liitosta. Liitos omana haarana: diff --stat PT:lle, JU yhdistää."
Lisäksi -1510:n PT 15.0x -ehdot ovat voimassa.

PT:n ohjeesta puuttuu yksi aiempi viesti ("tarkennus edelliseen" ei löytynyt mistään). PT:lle kerrottu, sisältöä ei ole lähetetty uudelleen.

## Kun ajo on luettu
B:
- Lue "ui linnavalikko" -rivit vaaka-iPhonelta. Kelpaa, jos "laskettu" eroaa yläreunasta ja linnan äänet menee läpi. Akustiikka voi silloin olla osin vierityksen takana, ja testi rajaa sen ikkunaan.
- Jos arvot ovat samat tai VIKA jää, syy on väärä: se oli vain koodista luettu. Selvitä, miksi ScrollView ei kutistu, ennen uutta korjausta. Ei toleranssia.
- Vierityspalkki on piilossa, joten katso kuvasta, näkyykö, että rivejä on lisää, jos PT pyytää kuvaa.

E:
- Lue kaikki kuvan odotukset ja "kuva hidas" sekä "-- kuvat" -rivit. Vertaa myös rinnakkaisiin ajoihin.
- Hypoteesi, ei todistettu: PurkujaKerralla = 2 (Kuvat.cs), ja hitaat lataukset pitävät molempia vuoroja, jolloin intron kuva jää odottamaan. Tämä on vain koodista päätelty: 10 s:n vika ei kerro, kumpi vaihe kesti. Jos "vuoro" on pieni ja "lataus" suuri, hypoteesi ei pidä.
- Jos kestot hajoavat tai raja ylittyy, E on auki, eikä liitosta tehdä. Tulos ja syyehdotus PT:lle, korjaus vain PT:n sanalla.
- Vaakavika tuli pallo iphone -varauksessa (15.21–15.25), ei pystyn keskitysvarauksessa.

Kun jäljellä on vain D:
- Aja JU:lla uudelleen ne kaatuneiden varauksista, joita korjaukset koskevat. Kuvat.cs on jaettua koodia, mutta muutos on vain lokia. Kysy PT:ltä, riittääkö tämä, vai ajetaanko koko 15 ennen liitosta (PT 15.0x: jaettu koodi = koko 15).
- Runko JU:lta, liitos omana haarana. Kuiva yhdistys d092f48cc:n kanssa ei tehnyt ristiriitoja 61cbc0856:lla: tee se uudelleen uusimmalla kärjellä. Rungon 5 committia ovat Valosepän. Niiden viesteissä lukee "ei junaan", joten PT:lle kerrottu kysymyksenä, ja vastaus puuttuu.
- git diff --stat PT:lle. JU yhdistää.
- PT:lle 3 riviä + polku.

## Havainnot
- A: uusia elementtejä kuva 6, selain 10, auto 10, luenta 10, napautus 10 (a8c94fbe0: 6, 6, 2, 0, 2). Tukee ennen-joukon hypoteesia, ei todista.
- OpasValikko.cs:2982 lukee yläreunan samalla tavalla kuin LinnaValikko luki. Ei muutettu, koska sen varauksissa ei ole tästä vikaa. Jos B:n syy vahvistuu, kerro PT:lle rivillä.
- "kuva ei latautunut" 44 kpl (firenze-miniatyyrit -kk ja ilman) pallo iphone -ajossa: ei tutkittu, yhteys E:hen auki.
- "PÄÄLLEKKÄIN iphone-vaaka: maakortti Ranska" ei ole VIKA eikä uusi.
- Metrolinjan laatikko on 1 pt eri kuin a8c94fbe0:ssa (146×175, oli 145×174). Sama vika D.

## Ei todennettu
88e2d1eb5 kääntymättä. B:n syy. E:n syy. C:n "x 62,0" lukuna (lokissa ei tekstin x:ää). Lukemani Raamatusta: luvut 4 ja 6, 7.23–7.25; koko luku 7 ei. -1414:n Ei todennettu -lista on voimassa.

## Muuta
Remote Control ei päällä: vain omistajan pyynnöstä.
Hook listasi työlistalta rivit "Concorden aukio kokeena" ja "Nähtävyyksien lähialue puhtaaksi". En tunnistanut niitä omikseni, en päivittänyt.

## Odottaa, aloittamatta
Tappien lasku vaakapuhelimelle (-1510:n kohta "Odottaa"): vasta, kun UI-sarja on yhdistetty.
