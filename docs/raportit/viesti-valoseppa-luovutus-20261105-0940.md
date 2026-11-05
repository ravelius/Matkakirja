# Valosepän luovutus 5.11.2026 klo 09.40

Syy: PT 09.38, omistaja käynnistää ohjelman uudelleen. Edellinen: viesti-valoseppa-luovutus-20261105-0113.md (Lisäys 1 voimassa). Loki: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md. Wt k30 (/Users/Shared/Claude/wt/proto-linssiseppa2-k30) on haarassa linssiseppa2/jarvet-koe, puhdas.

## Tehty
- Järvien koe: pariisi-tyyli/striimi/jarvet/koe_poltto.py (_tyo/linssiseppa2/). Vanha vesi ja rantaviiva pois, maa täytetty, OSM:n vesi tilalle (raja 4 px² tasollaan, viiva vain yli 30 px²:n järville). Tulos jarvet/koe/{9,10}/ ja pari-*.png, 81 palaa. Keski-Suomen z10-rajaus katsottu täysikoossa; Saimaa ja z9 katsomatta.
- Runko 6d7dc6471, linssiseppa2/jarvet-koe (natiivi-backup, 2d8ec025c + komento palvelin koepohja, elävät palat omaan versiokansioon). 614/614. Ei junaan.
- Mac-ajot valmiit: lokit/julkaisija-jarvet-6d7dc6471-{nyk1,koe1,nyk2,koe2}, 6 kuvaa kussakin. KUVAT KATSOMATTA. Tuloksesta ei ole sanottu KK:lle mitään.
- Scratchpadit: 3 vanhaa poistettu, kopio T7 Matkakirja-valoseppa/scratch-arkisto-20261105 (myös piirto/). PT tietää.
- Vesisuodatus keskeytetty PT:n pyynnöstä (T7 62 Gi, raja 30 Gi; koko arvioitu, ei mitattu). jarvet.osm.pbf:ää ei ole. alueet-laaja.json ja ketju2.zsh jäivät käyttämättä.

## SEURAAVAKSI
1. Katso kuvat täysikoossa ja tee parit nykyinen | koe: t105, t110, t113, t115 (Keski-Suomi) sekä s110, s113 (Saimaa), kummallakin piirtotavalla. Tarkista lokista, että koepohja oli käytössä. Vertaa KK:n sanoihin: sama järvi joka korkeudella, ei suorakulmiota, ei haamulaikkuja, ei vöitä. Jos vöitä jää, selitä ne vasta sitten.
2. Pari ja tulos KK:lle, myös tieto, näkyykö ero kummallakin tavalla. Ei muistilukuja.
3. Koealue on z10 x 582-587, y 282-286 ja x 589-594, y 287-291. Jos reuna haittaa, täydennä vain Järvi-Suomi ilman planeetan isoa välitiedostoa. T7 ei saa mennä alle 30 Gi:n.
4. KK:n järjestys jatkuu: valtionraja, Alpit, tasorajat; verkon palautus viimeiseksi, yhä ennen seuraavaa junaa.

## Odottaa muita
- Koko Euroopan poltto: vasta kun pari kelpaa, tilaa on ja omistaja on antanut luvan (PT 06.57). Tuotepoltto vaatii uuden kansion, TasoVersion ja erillisen mediavientipäätöksen. iPad-ajo samoin vasta kelpaavan parin jälkeen.

## Muistettavaa
- BackReferenceWriter kirjoittaa välitiedoston sisäiselle levylle (/private/var/folders/.../T/tmp*/back_writer.osm.pbf), ei kohdekansioon: 480 Mt 10 miljoonaa kohdetta kohden. Keskeytetyn ajon kansio poistettu.
- Skriptit ovat _tyo:ssa, eivät gitissä. Levyllä ne säilyvät käynnistyksen yli.
- Asemataulua ei päivitetty: koe ei ole junassa.
