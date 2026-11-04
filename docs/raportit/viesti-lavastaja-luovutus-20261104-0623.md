# Lavastajan luovutus 4.11.2026 klo 06.23 — LUE TÄMÄ, ÄLÄ VANHOJA

Edellinen: viesti-lavastaja-luovutus-20261104-0056.md (historia, työkalut; viimeinen lisäys 05.4x on tämän tausta). Id:t: osoitekirja. M = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri, L = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/katot-v125. Kaikki mittaukset, korjaukset ja rajaukset: M/KORJAUS.md (lue loppuosa). Omat python-skriptit: /opt/homebrew/bin/python3 ILMAN -I:tä. EI vientiä ennen PT:n lupaa.

## Koejuuret (kloonattu ketjuna, jokainen edellinen + muutos)
koejuuri-muuri (muuri, kuvat JU:lta ok) → koejuuri-silta (kaiteet lod0) → koejuuri-puut (puut.json) → koejuuri-porras (portin sokkeli, lohko).
_valmiit-pakettia ei ole rakennettu; paketoi-v125.zsh ei toista ketjua. Vienti yhtenä pakettina: tausta, rakennukset (portti, sillat), lahipuut. Pelikoodi: selvitä lahipuut-versio (v15 vs. v16), v16:ta ei tarkistettu.

## Odottaa JU:ta (viestitetty, ei vielä kuittausta valmiista)
1. M/sk-seinat.txt → M/seinat/ (seina-01…20; seinat-20.json). Kuvat PK:lle ja PT:lle, ≤ 3 riviä. Ei massakorjausta.
2. M/sk-silta-ennen.txt + -jalkeen.txt → M/silta-kuvat/. Pari samasta kamerasta PT:lle: lovet poissa? (itä ja länsi)
3. M/sk-puut-vanha.txt + -uusi.txt → M/puut-kuvat/ (5d ja lähi). Pari PT:lle: täplät poissa?
4. M/sk-muuri-porras.txt → M/porras-kuvat/. Vertaa M/kuvat/muuri-*-jalkeen.png:hen: porras ja ääriviiva poissa? Tummuuko portin runko? Jos valo tumma, jätä tämä pois paketista; PT: ei este.

## PT:n ehdolliset käskyt
- Jos 3:ssa täplät poissa: korjaa 181 puuta (M/puut-lavistavat.txt) koejuuressa pienimmällä siirrolla, joka vie latvuksen irti katosta; poista vain jos ei mahdu. Mittaa korjauksen jälkeen, ettei lävistäviä jää (puut_siirra.py:n loppuosa), kerro poistetut. Jos täplät eivät lähde, älä korjaa, etsi syy. −146;225 siirtyi vain 2 m, voi jäädä; 13 runkopuuta jo tehty, ks. M/puut-rapotti.txt.
- Toinen tumma lohko (PK:n M/../../pelikoodari/muuri-koe/todistus/pari-kauko-vanha-uusi.jpg, x ~1050–1150): 1-0 V4_red x −100,9…−91,6, z ≈ −383,7, normaali −z. Ei 73:ssa, on 719:ssä. Vain todennäköisesti sama vika. Tee korjaus muurin tapaan (muuri_korjaa.py on kiinnitetty muurin koordinaatteihin: tee vastaava kierto + normaali +z, leivo.zsh JU:n vuorolla, muuri_valo.py kopioi lohkon tekselit, lohkon rajat). Tarkista myös naapurit x −103…−91 (myös sokkeli).
- Kun koejuuri on valmis (porras, täytöt, puut, lovet, tämä lohko jos sama vika): ilmoita PK:lle ja PT:lle koejuuren polku; PK ajaa yhden todisteen kaikesta.

## Jono sen jälkeen
5d: irrallinen punainen levy (pikseli 0,262; 0,29, syy ei nimetty; rajaus: 2752 px x 640–1100, y 440–800), päätyjen porrastumma, holvin vasen yläkulman punainen kiila. Kaiteen tumma yläpinta: syy auki. Sivuholvi, pylväiden laikut.

## Huomiot
- Reitin kamerat aliarvioivat näkyviä seiniä (PK:n lohko). PT:lle mainittu nyt.
- T7:llä tyhjä kansio proto-arkisto/_tyo/linnanrakentaja/muuri/leivottu, ei poistettu.
- Levy: 4 koejuurta kloonina (cp -c), uudet tiedostot vievät vain muutoksen.
