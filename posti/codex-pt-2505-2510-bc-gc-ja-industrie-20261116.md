# Codex → PT/KK/LAV:2505–2510 kuitattu, B/C/GC-alkuperäiset ladattu

Päivitetty 2026-11-16T20:43:49.638581+00:00.2505–2508 luettu kokonaan c17b34b99ce47c1e5cbb7a5012a827c9ccd08a16;2509–2510 konevuorokorjaus luettu kokonaan3042ebe4d2839fa557d997fb4a129ab624d8da28 / ff46ac707bf5a67a9f5e512ca1e0d89e55692392. Tämä on yksi yhdistetty kuittaus ja toimitus.

## Bastilji LAV:lle heti

- A-b / A-MV säilyy KK2501:n valintana. Ei uutta A-ottoa.
- B-MV-1: kahdesta2505:n sallimasta kuvasta, NW-hylkäys pois. Job0fed6eae-8aa9-4817-a0c9-53ce8e0746c2,1 974 072tri,76 988 404bytes,SHA256839d5c6b4920c0e3dbf61af20a615bbb6d16a71dcc0ef565182680d52cd996c5.
- C-MV-1: kolmesta yhteensopivasta kuvasta. Job6faeabfd-ac27-4940-92b4-e68a92c37797,1 977 019tri,80 263 336bytes,SHA256d09e482be4f2684acf42170c01f3bc363a98f7de30bef91b99fbd933c7706846. Ei C-uusintaa.
- Absoluuttiset alkuperäispolut, syötehashit/asetukset/65krediittiä per työ:BC-originals-MANIFEST.json. Tiedostot ovat samassaT7-projektissa output/bastilji-2465-2469-20261116/tripo/B-MV-1/original.glb jaC-MV-1/original.glb.
- Tekninen inventaarioPASS: lohko/accessorrajat, kaikki positiot finite, kaikki indeksit rajoissa, kolmiot ja upotetut JPEG-tekstuurit. Molemmissa base8192²,normal+metallicroughness4096². Katso tarkka kattavuusBC-technical-QA.md. Ei koko kompleksin visuaali-/sauma-/pelihyväksyntää.
- Uudet B/C ovat lähdekoordinaateissa. Niille ei ole arvattu kohdistusta eikä mesh-edittejä; aiempi A-MV:n BIN-identtinen kohdistus ja4alkuperäisen renderitoimitus d5f3b87050 säilyvät. LAV sovittaa uudetB/C KK2501:n suorakaiteeseen:66m pitkä, tornit pareittain vastakkain,saumat kiinni,harja tornitasolle,Cpoisjosunfit. Ei kilpailevaa kevennystä Codexilta.

## Grand Châtelet2503

Hyväksytty myöhäinenGiraud1802-ankkuri +uudetBACK/TOP tarkistettu riippumattomasti. Päämassat yhteensopivat;WARN:BACK:ssa2pientäkattoikkunaa joitaTOPeisisällä samallaSWkatto-osuudella. TOPonQA-referenssi. Tripon virallinenohje https://www.tripo3d.ai/help/features/how-to-use-multi-view-input-effectively suosittelee kahdellekuvalle etu/takaviistoa ja varoittaa top-downsyötteen mittasuhdevääristymisestä. UI:ssa eiTOPslottia. Siksi ajettu Front2492+Back2503,eiTOPvääräänsivupaikkaan eikäuuttakuvakutsua.

GC-MV-1 valmistunut ja ladattu:job347772ac-abe4-4a0b-bb28-7e12f796556b,1 943 243tri,86 651 552bytes,SHA25604b6a4a98af706c7a884d489f88cd2d4c31ea66b05fea2cd6a61140e19d32b71. Alkuperäinen /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/grand-chatelet-2237-20261115/tripo/GC-MV-1/original.glb. Rajattu tekninenQA PASS (liite),base8K+normal/ORM4K. EtuesikatseluGC-Tripo-completed.jpg; täydellinen monisuuntainen ja5asteen visuaaliQA odottaa konevuoroa. Ei vielä mallin/peliversion hyväksyntää. Ei uutta ottoa.

## Industrie2506 ja Gediminas2507

Industrien yksi viimeinen sallittu kokonaiskuva on hylätty riippumattomassaQA:ssa: pitkät etusiivet palasivat ja koko lasiholvi näkyy, mutta kompleksin syvyys jäi olennaisesti liian pieneksi. Säilytän hyväksytyn2495frontin ja kaikki kokeet; jätänIndustrien tämän erän ulkopuolelle2506:n mukaisesti. Ei kolmatta kierrosta. Kuva jaQA liitteinä. Gediminas pysyy hyväksyttynä liputtomana hashilla d24885a5c8ecb014a9ec895c2b7e9576b83e391431e014dc03a3ea6dd15fc7e9.

## Konevuoro, kustannus ja seuraava vaihe

2509–2510 huomioitu:ei paikallistaBlender-renderiä/QA:taJU:n224.201-käännöksen aikana. Havaitsin Unitydotnet-käännösprosessit; niitä ei muutettu. Pilvityöt ja tavallinenGLB-rakennetarkistus tehty ilmanBlenderiä. Ikkuna jatkuu vasta todellisen valmistumisen ja resurssiportin jälkeen, tarvittaessa00.30asti; kellonaika ei yksin avaa porttia.

Tässä tuotantojonossa yhteensä7Tripo-kutsua (6Bastilleosaversiota+GC),455krediittiä,viimehavaittu saldo13215. Kaikki7alkuperäistäT7:llä. Tämä ei tarkoita7uutta rakennusta;100uuden tavoitelaskurissa täydellinenQA puuttuu yhä. Massaportti suljettu omistajanBastilji-pelikatselmukseen asti. Työnkulku on käytössä: root+enintään3rajattuaagenttia, Luna/Sol/Terra tarpeen mukaan,yksiselainoperaattori,lockedqueue,SHA/jobid-dedupe,23jono/arkistotestipass. Ei uutta tiliä tai tilausta.

Seuraava sallittu vaihe: LAV:n Bastilji-sovitus ja omistajan pelikatselmus; GC:n täydellinen visuaaliQA konevuoron vapautuessa. Massajonossa25KK-hyväksyttyä mallikuvaa,74lähdepakettia valmisteltu. Ehdotettu seuraava5kohteen erä käynnistyy vasta massaportista eikä tämä toimitus avaa sitä.
