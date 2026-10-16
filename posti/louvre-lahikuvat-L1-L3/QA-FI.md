# Louvre L1–L3 — loppu-QA, kaikki kolme hylätty tavoitekäytöstä

**3/3 sallittua kokonaisen kuvan image_gen-kutsua käytetty**, yksi per uusi lähikulma. Native1536×1024, ei kuvan skaalausta, rajausta, vääntöä tai retusointia. Vanhoja K1–K7-kuvia tai niiden kutsuja ei avattu. Kuvat ovat sisäisiä mallinnuksen tavoite-ehdokkaita.

| Kulma | Tuloskuvasta johdetun maskin IoU | 95% paikallinen raja | Suositus |
|---|---:|---|---|
| L1 |84,51%|ei|Hylkää geometriatavoitteena: julkisivun alareuna noin50–65px lähdemaskia alempana, välikaton/savupiippujen ääriviiva muuttui.|
| L2 |95,45%|alustavasti kyllä|SISÄLTÖ HYLÄTTY: keskiholvin läpi näkyy kiellettyä lasipyramidia muistuttava ruudutettu kolmiorakenne. Lisäksi katon oudot lohkot näyttävät LiDAR-artefaktin tulkinnalta.|
| L3 |64,39%|ei|Hylkää geometriatavoitteena: rakennusten ala-/yläreunat ja kameravaikutelma poikkeavat selvästi; patsaan sijainti/koko tulkittu.|

Maskit tehtiin **tulos-PNG:n pikseleistä**, ei massamaskia kopioimalla: taivaaseen kytketty sininen/valkea alue erotellaan, kattoraja johdetaan siitä; julkisivun/maan raja piirretty käsin näkyvistä tuloskuvan kontakteista. Ikkunoihin/arkadeihin ei leikata sisäreikiä. Piiloon jäävä palatsi täytetään lampun/patsaan takaa siluettikonvention mukaisesti. Maa, taivas, erilliset lyhdyt, patsas rakennussiluetin ulkopuolella ja kulmateksti eivät kuulu maskiin. Kaikki kolme tulosmaskia viimeisteltiin ennen lähdemaskien lukua vertailuvaiheessa. Toistettava skripti, kuvatun rajauksen koordinaatit, SHA:t, tuloskuvan päälle näyttävä maski ja erovertailut mukana.

Maskien rajauksessa on noin±3px epävarmuus. Konservatiiviset IoU-vaihteluvälit ovat L1 82,44–85,89%, L2 93,05–96,82%, L3 62,74–66,00%. **L2:n95,45% ei ole vastaanottokuittaus tai tarkkuustakuu.** LiDAR-mittausvirheitä ei ole riippumattomasti tunnistettu; generoinnin siirtymiä ei selitetä mittausdatalla.

Kivipinnassa on hunajanbeigeä sävyä, varjostusta ja kulumaa; katot siniharmaita. Julkisivuissa arkadit, pilasterit, veistosaiheet, lucarnet ja listat näkyvät, mutta toistuvien ikkunoiden/reliefien tarkka lukumäärä, veistosten anatomia ja arkkitehtoninen oikeellisuus eivät ole varmennettuja. L1:n etualan kivet ovat pyydettyjä graniittilaattoja pienempiä. L2:n keskiholvin takaa noin x705–800,y645–774 löytyy lasipyramidia muistuttava ruudutettu kolmiorakenne: **nimenomainen pyramidi-/sisältöraja epäonnistui**, ja samaa näkymää diagnostisesti5× näyttävä rajaus on mukana, ei korjattuna tuotantokuvana. L2:n kattolohkot ovat toinen selvä sisältövirhe. L3:n suuret graniittilaatat, saumat ja paikallinen kuluma näkyvät; patsaan lyijymateriaalia tai tarkkaa muotoa ei varmenneta. Selviä altaita ei havaittu, pieni havainnekuva-teksti alaoikealla kaikissa. Eteläauringon tarkkaa suuntaa ei voi todistaa pelkistä tuloksista.

Lähderistiriidat: L3 käytettiin sitovaa JSON82,95° ja sen massaa/maskia, ei tekstin89°; L2 altaan reunaa ei lisätty, koska yleinen nimenomainen allaskielto toistuu ja JSON ei pyydä allasta. Commons-kuvat vain arkkitehtuuri-/materiaaliviitteinä, ei niiden katutason kameroita, ihmisiä, taustoja tai pyramideja. Pelikuvia/Googlea ei käytetty lähteenä. Lähde- ja lisenssiluettelo säilytetty.

**Ei mallikierroksia, pelimuutoksia tai julkaisua. Kaikki kolme hylätään tavoitekäytöstä:** L1/L3 geometrian takia, L2 kielletyn pyramidiaiheen ja kattolohkojen takia. L2:n paikallinen siluettirajan ylitys ei kumoa sisältöhylkäystä. Kolmen kuvan lupa loppuun käytetty, ei uusia yrityksiä ilman uutta valtuutusta. Riippumaton QA mukana.
