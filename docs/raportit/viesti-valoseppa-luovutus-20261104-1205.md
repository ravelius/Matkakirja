# Valosepän luovutus 4.11.2026 klo 12.05

Syy: konteksti yli pehmeän rajan (Raamattu 7.37). Edellinen: viesti-valoseppa-luovutus-20261104-1032.md (Työkalut, tiedot ND-datasta). Loki: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md.

## Linja nyt
- KK 10.2x ennallaan: k55 lukittu, peliin, ei junaa. JU:n iso iPad: Pariisi z11–z17, vieritys, muisti, palan aika, Lontoo, Helsinki, Alppien laikut z13. Kuvat ja mitat KK:lle.
- PT 11.56 (omistajan pyyntö, suunnitelma MUUTOS 4): vene näkyy vain kartan vesipinnalla. Koe Pariisissa, ei junaan. Kuva sillan kohdalta KK:lle lähetetty (viesti jonossa 12.05), rivi PT:lle lähetetty.

## Tila
- linssiseppa2/striimi-vari e4180ac69 (natiivi-backup): z17:n raidat korjattu, Pariisin piirros pois, kulu komennossa elavakartta. 603/603. JU ajaa: lokit/julkaisija-striimi-iso-e4180ac69 (elava-rivit.txt, vieritys/). Laitteella Documents/kartta-osat 79/79, joten ämpäripolut eivät todistu. Tuloksia ei ole vielä katsottu.
- linssiseppa2/striimi-vesi d34cacd08 (edellisen päällä, natiivi-backup, wt /Users/Shared/Claude/wt/proto-linssiseppa2-k30 tässä haarassa): 604/604. Unity ja laite todistamatta; JU ei ole vielä saanut riviä.
- Tiedot: pariisi-tyyli/striimi/TULOS.md ja pariisi-tyyli/vesi/TULOS.md.

## SEURAAVAKSI
1. Kun JU ilmoittaa e4180ac69:n ajon valmiiksi: katso kuvat täysikoossa, mitat ja z ≤ 10:n kulu. Kuvat ja mitat KK:lle. Kermahuntu (z3–z8) ja Alppien laikut katsottava erikseen.
2. Rivi JU:lle d34cacd08:sta seuraavaan koeajoon: lokista "vesikerros"-rivi (aika), komento veneet kohtaan i lat lon + aja sillan kohdalle (Pont Neuf 48.8570, 2.3413 on laskettu, tarkista), kuva. Ei ennen edellistä ajoa.
3. Avoin päätös KK:lle: reitti oikaisee Île Saint-Louis'n yli (88,2 % tiedossa olevasta osasta vedessä), vene katoaa saaren kohdalla. Reittiä ei ole muutettu. Kapean uoman sääntö (KORJAUSLISTA 5) on erikseen, sama kerros kertoo uoman leveyden.
4. Jos koe jää pysyväksi: NUI:n mukaan NS:n 2f9dd10c3 (leikkaus OSM-silloilla) ja b6d478a40 menevät samoille riveille; sovi NS:n kanssa. Komento veneet kohtaan on kopioitu NS:ltä.

## Vahvistamatta
Lontoo z15–z16 vain mitattu, kuvia ei katsottu kokonaan. Lähin zoom Pariisissa palaa elävän kartan arvoon, kun piirros on pois; laitteella katsomatta. sk-striimi.txt:n kaaret z9–z13 laskettu, ei ajettu.

## Opit
- z ≥ 13 pohjan väristä ei pidä päätellä vettä tai tietä: suurennettu kokonaislukuväri ja kapea raja tekevät raitoja. Vesi vektorista.
- Metsän pehmennys on palautettu kaikille tasoille lukituksen takia; k55:n heikkous 7 on yhä mukana.
- PiirrosKerros luodaan aina, kytkin oletuksena päällä: piirros pois vain Karikatyyri-ehdolla, ei poistamalla kerrosta, koska animaatiot ovat siinä.
- NS:n piirtokulu 8dee95d57:stä (TeeTalotus, KoealueKoostus) ei koske striimi-varia.

## Työkalut
pariisi-tyyli/striimi/ (p6–p8, vrt.py, ero.py, sk-striimi.txt, ajo/), pariisi-tyyli/vesi/ (p1–p3, reitti.py, silta.py <V> <S> <W> <kuvat> [kohta]). ELAVA_VESI=1 tuottaa cs/v<z>_<x>_<y>.pgm. Veneiden kuvat _tyo/natiivi-ui/animaatiot-20261102/.

## LISÄYS 12.06 (PT)
PT katsoi d34cacd08:n ja kuvan: leikkaus toimii, laitetodistus puuttuu, koe, ei junaan. JU-rivi (SEURAAVAKSI 2) lähetetään vasta e4180ac69-ajon jälkeen. Reittikorjaus (KORJAUSLISTA 5) tehdään nollauksen jälkeen, ei ennen: kohta 3 ei ole enää vain KK:n päätös.
