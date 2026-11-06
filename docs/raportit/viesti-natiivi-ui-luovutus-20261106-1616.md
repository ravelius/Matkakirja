# Natiivi-UI: luovutus 6.11.2026 klo 16.16 (PT 16.1x: nollaus, kun commit tehty ja ajo JU:lla)

Korvaa -1612:n kohdat "Tila", "Odottaa PT:n vastausta" ja "Kun PT on vastannut". -1612:n "Tähtikyltit", "Havainnot" ja "Odottaa, aloittamatta" ovat voimassa, samoin -1510:n "Mitä muutin" ja "Opit", -1306:n Havainnot sekä -1150:n ja -1140:n avoimet. Lukulista 7.47: lue itse.

## Tila
Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-vesinimi, haara natiivi-ui/ui-sarja-219, kärki 13dab1aac (Unity b8, fcce6131f:n päällä, EI d092f48cc:n), ei muutoksia. Peilissä natiivi-backup molemmat refit (natiivi-ui/ui-sarja-219, peili/proto/natiivi-ui/ui-sarja-219): ls-remote näytti 13dab1aac.
13dab1aac on KÄÄNTÄMÄTTÄ ja ajamatta.

## Ajo JU:lla
Pyydetty 16.1x (viesti ja oikaisu jonossa JU:lla, kuittausta ei vielä tullut): koko 15 varausta, ei kuvia, haara sellaisenaan. Tulos lokit/nui-ui-13dab1aac, rivit julkaisija-tyokalut/nui-13dab.log. JU lähettää valmistumisesta rivin tälle sessiolle. Jos JU ei ole ottanut ajoa jonoon, tarkista list_eventsillä ja kysy yhdellä rivillä.

## PT, sellaisenaan (16.1x)
"1) Kyllä: tee E:n diagnostiikkacommit (reitti ja tavut "kuva hidas" -riville), ei raja- eikä toleranssimuutosta. E on auki, kunnes reitti on mitattu.
2) Koko 15, samalla varauksella diagnostiikan kanssa, JU:n vuorolla (jaettu koodi; linna keskitys iphone on ajamatta B:n jälkeen).
3) Voit liittää niiden päälle: fcce6131f..d092f48cc ovat räystäs ja dither, PT:n kuittaamia ja junassa 219; viestien "ei junaan" on vanhentunut. Liitos silti vasta, kun vain D on jäljellä.
4) OpasValikko.cs:2982 jätetään ennalleen, koska varauksissa ei ole vikaa."
Voimassa myös -1612:sta: 15.4x "E:n ehto ennallaan: hajonta = E auki, ei liitosta. B: syy ja korjaus asetteluun, ei toleranssia." ja 15.1x "Varmista silti JU:lta ennen liitosta. Liitos omana haarana: diff --stat PT:lle, JU yhdistää." sekä -1510:n PT 15.0x -ehdot.

## Mitä 13dab1aac muutti (vain Kuvat.cs, diagnostiikka)
Rivi: `ui kuva hidas: <nimi> vuoro X s, lataus Y s, reitti <r>, tavut <n> (purkuja, kesken)`. Lataukseen ei muutosta.
- reitti: mukana, levy, verkko tai "ei tavuja". Viimeisin lähde voittaa: rikkinäinen levykuva ja sitten verkko = verkko.
- tavut: tiedoston koko hitaalla rivillä, verkosta saatu määrä; -1 = ei tiedossa.
- Rajaus: "lataus" sisältää yhä pienennyksen (muunna) ja Esilataaja.Hae-jonon. Reitti ei erota näitä. Jos levyreitti on hidas, purku ja pienennys jäävät auki.

## Kun JU on ajanut
1. Varmista lokista, että "kuva hidas" -riveillä on reitti ja tavut, eli 13dab1aac oli ajossa. Kääntymätön varaus = oma vika, korjaa ensin.
2. Lue E:n reittirivit ja intro-odotukset. Mittaa ja vertaa: tulos sekä syyehdotus PT:lle. Korjaus vain PT:n sanalla.
3. Katso, menikö linna keskitys iphone läpi (B) ja onko D yhä samat kolme riviä.
4. Jos vain D on jäljellä: varmista runko JU:lta (viimeksi d092f48cc), kuiva yhdistys uusimmalla kärjellä, git diff --stat PT:lle, JU yhdistää omana haarana.

## Havainto, ei mitattu
"kuva ei latautunut", 44 .webp (-1612): Kuvat.cs:n LataaWebp palauttaa muualla kuin iOS-laitteella null (`#else valmis(null)`). Jos varaus ajettiin Macilla, rivit ovat koodin mukaan odotettuja eivätkä lataushäiriö. Ajotapaa ei tarkistettu tätä varten.

## Ei todennettu
13dab1aac:n kääntyminen. E:n syy. Vaakavian syy. Tähtikylttien syy. B kuvasta. linna keskitys iphone 24ce342cb:n jälkeen. Luvusta 12 luin vain 12.9:n ja muiden kohtien alut. -1414:n Ei todennettu -lista on voimassa.

## Muuta
Remote Control ei päällä: vain omistajan pyynnöstä.
Hookin rivit "Concorden aukio", "Nähtävyyksien lähialue" ja "Pariisin saumat" eivät tunnistu omikseni, en päivittänyt.
