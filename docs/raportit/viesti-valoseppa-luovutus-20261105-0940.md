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

## Lisäys 1 (09.5x): Mac-kuvat katsottu osin. KORVAA SEURAAVAKSI-kohdat 1 ja 2
Parit: pariisi-tyyli/striimi/jarvet/parit/pari-<t105|t110|t113|t115|s110|s113>.png (ylärivi tapa 1, alarivi tapa 2; vasen nykyinen, oikea koe) ja -pieni.jpg. Katsottu vain t113 ja t115 pienennettyinä. Muut katsomatta, täysikoossa ei yhtään.
TULOS: PARI EI KELPAA, EI LÄHETETTY KK:LLE.
- Koepohja oli käytössä (unity.log koe1 ja koe2), mutta koe näyttää nykyistä sekavammalta kummallakin tavalla: vanhat järvimuodot jäävät tummina, niiden päälle tulee oranssi maa, ja uudet järvet näkyvät haaleina haamuina.
- Tapa 2: t105, t110, t113, s110 ja s113 ovat täysin samat kuin nykyisessä (ero 0,00). Vain t115 eroaa (6,66). Tapa 1: ero 2,07-12,82.
- Hakuloki Suomesta: tapa 2 nykyinen z6 4, z7 12, z8 20, z9 9; koe sama ilman z9:ää. Tapa 1 nykyinen z9 45, z10 101. Koepohjan palvelemat palat eivät näy lokissa. Luvut koskevat koko ajoa. Tulkinta: tapa 2 ei näissä kuvissa yllä z9-z10:een, joten järvet tulevat z8:sta tai alempaa.
- Väri: kuvien tumma vesi on oliivinharmaa (mitattu aiemmin 176,172,139), pohjan vesi 203,204,191. Haalea haamu sopii pohjan veteen, joten tummat muodot näyttävät tulevan muualta.
HYPOTEESI, EI TESTATTU: tummat muodot tulevat toisesta tasosta, joko pohjan z<=8:sta tai kermatasosta julisteet/pallo/kerma/2026-10-27-p060/_maailma (Varitaso.cs; haettu 101 kertaa koe2:ssa). Tämä voi selittää myös vyöt (TULOS.md: vaalea kun pohja on maata, tumma kun pohja on vettä). Oranssin maan syy on auki.
SEURAAVAKSI:
1. Katso, mitä z8- ja kerma-palat sisältävät Keski-Suomessa (pala suoraan levyltä tai ämpäristä, ei ajoa). Etsi Varitaso.cs:stä ja varjostimesta, miten kerma sekoitetaan pohjaan. Kevyt koe: kerma pois näkyvistä samassa näkymässä.
2. Korjaa koe sen mukaan: koepolttoon z<=8 ja tarvittaessa kerma. Koepohja-komento ottaa nyt mukaan kaikki pohjan polun tasot, jos palat ovat kansiossa; kerma vaatii oman polun. Uusi Mac-vuoro JU:lta.
3. Parin voi lähettää KK:lle vasta, kun se täyttää KK:n ehdot tai kun tulos on selvä. Jos KK kysyy aiemmin: koe ei vielä korjaa, koska kartassa on toinen vanhoja järviä piirtävä lähde; syy varmistetaan.
Muistettavaa: koepohjan palvelemat palat puuttuvat hakulokista (paluu ennen lokiriviä). Mac ja iPad eroavat: Macin nyk1-t113:ssa on sileät möykyt, iPadin s-t113:ssa z11-sekoitus. Pelkkä Mac ei riitä lopulliseen päätökseen.
