# Louvren lähikuvat v2 — paikallinen QA ja maskivertailu

Uusi omistajan lupa 16.10.2026 klo 13.34: **tasan 3 kokonaan uutta generointia**, yksi per L1–L3. Käytetty **3/3** sisäänrakennettua image_gen-kutsua. Native-PNG:t 1536 × 1024; ei skaalausta, rajausta, vääntöä, retusointia tai osakorjausta. Vanha 40acbaf43-erä ja vanhat K-kuvat eivät olleet generoinnin pohjia. K42:n oma pelikuva sitoi kuvakulman; sen maski sitoi ulkoreunoja, Commons-kuvat yksityiskohtia ja materiaalia.

| Kulma | Raaka K42-maskin IoU | Alkuperäisen LiDAR-maskin IoU | Paikallinen geometria | Sisältö-QA |
|---|---:|---:|---|---|
| L1 |96,54%|93,48%|95% raja ylittyy K42:een|Arvioitavaksi vastaanottajalle/PT:lle.|
| L2 |96,73%|96,00%|95% raja ylittyy kumpaankin|HYLÄTTY julkisivun yksityiskohdan takia.|
| L3 |89,78%|95,64%|95% raja ylittyy alkuperäiseen LiDAR:iin|Arvioitavaksi vastaanottajalle/PT:lle, patsas-/materiaalivaraus.|

## Maskien alkuperä ja epävarmuus

Kaikki kolme omaa maskia on johdettu UUSIEN PNG-kuvien rakennusrajoista. Kattoraja eroteltiin taivaaseen kytketyistä RGB-alueista ja tarkistettiin kuvan päälle piirretyllä peitolla; kiiltävien lyijylistojen pienet taivaaksi tulkitut osat korjattiin natiivikuvasta luetuilla rajapisteillä. Julkisivun/maan kontaktiraja piirrettiin natiivikuvan näkyvistä kontakteista. Patsas ja maa rakennusten alaosan ulkopuolella jätettiin mustaksi, rakennus täytettiin patsaan takaa siluettikonvention mukaisesti. Ikkunoihin ja arkadeihin ei leikattu sisäreikiä. Kaikki omat maskit katsottiin ja niiden SHA:t jäädytettiin **ennen kahden vertailumaskin lukemista vertailuvaiheessa**. Mittaustuloksen perusteella niitä ei viritetty. Alkuperäisiä lähdemaskeja ei muutettu, kopioitu tulokseksi tai skaalattu.

Rajauksen arvioitu epävarmuus on noin ±3px. Konservatiiviset IoU-välit K42:een/LiDAR:iin: L1 94,42–97,90% / 91,50–94,90%; L2 93,70–97,94% / 93,34–97,54%; L3 86,55–91,41% / 92,62–97,99%. Nämä ovat paikallisia siluettimittauksia, eivät vastaanottajan päätös tai lupaus jokaisen yksityiskohdan pikselitäsmällisyydestä. Peittokuvat, kummankin raakatavoitteen erokuvat, SHA:t, pikselilukumäärät, rajapisteet ja toistettava derive_masks.py mukana.

## L3:n lähdemaskin ristiriita

Lähdeteksti sanoo ”patsas ei kuulu maskiin”, mutta toimitettu K42-maski sisältää valkoisen ratsastajapatsaan ja jalustan. Raaka vertailu on yllä säilytetty 89,78%:na. Erillinen DIAGNOSTINEN vertailu, jossa vain maskin alareunan ulkopuolelle työntyvä patsasosa poistettiin omaan kopioon, antaa 95,89%; poistettu alue 30 433px, poistorajaus dokumentoitu. Se **ei korvaa raakamittausta eikä ole vastaanoton hyväksyntätavoite**. L3:n varsinainen paikallinen 95% läpäisy tulee sallitusta, muokkaamattomasta alkuperäisestä LiDAR-maskista (95,64%). Vastaanottajan kannattaa korjata K42-maskin ja tekstin ristiriita omaan lähdeaineistoonsa.

## Sisältötarkistus

Jokainen näkyvä holvi, läpikulku ja taustarako tarkastettiin sekä tekijän että riippumattoman arvioijan toimesta. Pyramideja, ruudutettuja kolmioita, metallisia pyramidikehikkoja tai altaita ei havaittu. L2:n keskiholvi on nyt tumma eikä siinä näy edellisen kuvan lasikolmiota. Vanhoja rosoisia LiDAR-kattolohkoja ei havaittu.

**L2:n sisällössä on uusi olennainen virhe:** Sully/Horloge-paviljongin ylimpään suureen julkisivukenttään tuli umpinainen veistos-/reliefiseinä. Lähteen Cour Carrée -valokuvassa siinä ovat kolme korkeaa kaari-ikkunaa ja karyatidit, ja kellon suhde niihin on toinen. Generointi seurasi liikaa K42:n sisäistä jäsentelyä. Geometriarajan ylitys tai pyramidin poistuminen ei tee tästä historiallisesti oikeaa julkisivutavoitetta. **Suositus: älä lukitse L2:ta mallin tavoitteeksi.** Ei osakorjausta tai neljättä kutsua.

L1/L3:n kivi, liuskekatot ja suuri laattakiveys näyttävät pääosin valokuvamaisilta; L2:ssa hiekkapiha. L3:n kulumalaikut ovat paikoin voimakkaita, patsaan/jalustan pää/base hieman laajenee lähteestä ja tarkan Ludvig XIV/Bernini-vastaavuuden sekä materiaalin varmennus jää avoimeksi. Arkkitehtonisten pienkoristeiden lukumäärää tai kaikkien veistosten täsmällistä muotoa ei varmenneta. L3:n kamera perustui JSON82,95°/−9,68°/46°/9m ja K42-pelikuvaan, ei tekstin89°-ristiriitaan. Pieni havainnekuva-merkintä näkyy kaikissa.

**L1 ja L3 ovat vastaanottajan/PT:n arvioitavia ehdokkaita; L2 on paikallisesti sisältöhylätty.** Mikään ei ole vielä vastaanottaja-/omistajahyväksytty. Ei mallikierroksia, pelikytkentää, R2-toimitusta tai julkaisua tässä toimeksiannossa. Kolme sallittua kutsua käytetty, tuotanto pysähtyy tähän erään.
