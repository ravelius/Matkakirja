# ui-pohjat · vastuu NUI · tarkistettu 12.11.2026

TAVOITE: Pelaaja oppii ikkunat, napit ja valikot kerran, ja ne toimivat samoin kaikkialla. Käyttöliittymä on kevyt eikä peitä karttaa, ja tausta kertoo valinnan panoksen.

SÄÄNNÖT:
1. Jokainen ikkuna, kortti, paneeli ja valikko kootaan kirjaston pohjista; omaa tyyliä ei tehdä. Puuttuvasta pohjasta päättää KK, ja hyväksytty pohja käy vastaaviin kysymättä. [R-4.1] [R-4.2] [R-4.11] [P-261111-5]
2. Kultainen päänappi etenee tai on peruuttamaton, haamunappi on sivuvalinta, viivarivi listavalinta. [R-4.8]
3. Kortti on kohteen vieressä ja peittää enintään 45 % ruudusta; pitkä sisältö vierii kortin sisällä. [R-4.4] [R-4.15]
4. Tausta kertoo panoksen: selailussa ei tummennusta, harkinnassa kevyt sumennus, panoksessa reunoilta tumma sumennus. [R-4.9]
5. Selailupinta sulkeutuu rastista ja ohinapautuksesta, harkintapinta napeista ja ohinapautuksesta (valintaa pyytävä vain napeista), panospinta vain omasta toiminnostaan. Nosto ja Pulun chat sulkeutuvat ✕:stä tai asetuksen mukaan kartan napautuksesta. [R-4.10]
6. Nosto pinnataan aina itsestään, Pulun chatissa on pin. Pinnattu (yksi kerrallaan) pienenee kartan liikkuessa palkiksi oikealle ylös: otsikko ja tauko/jatka, napautus palauttaa, ✕ sulkee, puhe jatkuu. Uusi luenta tai linssi päättää pinnauksen. [R-4.12] [P-261109-3]
7. Pinta avautuu napautuksen ruudulla avaajan suunnasta ja sulkeutuu samaa reittiä; siirtymät alle 250 ms ilman hyppyjä. Pienennetty kutistuu sisältönsä kokoiseksi. [R-4.15] [R-4.14] [R-4.16]
8. Puhetta ei tekstitetä, paitsi pelaajan valitsemana linsseissä ja peleissä; matkakirjan sivu on tekstiä, ei tekstitystä. Nimikyltti näkyy saavuttaessa noin 3 s; info- ja nimilaput vain napautuksesta. [R-4.13] [R-2.70]
9. Näkymän säädöt (aika, vuodenaika, LIVE, nimet, pilvet, sää) ovat vain ⚙:ssä. [R-2.73]
10. ☰ on sama kaikilla laitteilla ja asennoissa, ja siinä ovat vain pelin ympärykset; linssit ja pelit avataan Linssit-napista tai laukusta. Keskeneräinen ja työhuone näkyvät vain kehittäjälle. [R-4.32] [R-2.62] [R-2.74] [R-13.51]
11. Luennassa näkyy vain kaiutin ja mini-☰. Kaiutin on otsikkorivin oikeassa reunassa, VU kaarissa; tauolla se on himmeä taukomerkin alla ja jatkaa samasta, ja ei luentaa -tila on vino viiva. Mini-☰:ssä ovat kappaleet, kelaus, nopeus, äänet sekä Auto ja Nostojen ohjaus (oletus pois). [R-5.23] [R-5.25] [R-2.194] [R-2.31]
12. Kaupungissa oman maan kartussi on vasemmassa alakulmassa eikä estä vieritystä; napautus avaa maakortin. Linssissä sitä ei näy. [R-2.149] [R-2.148]
13. Ulkoasua ei muuteta saavutettavuusohjeiden vuoksi; sallittuja ovat vain VoiceOver-nimet ja laajempi osuma-ala. [R-1.14]
EI VIKA:
- ISS-kohdevalikko peittää koko näkymän.

TEKOTAPA:
- Pohjavahti ennen merge-pyyntöä (lähtötaso saa vain pienentyä).
- Mallina natiivin toteutus; web-kuvaa tai -mittoja ei tarvita.
- Värit, fontit, kuvat ja liikkeen tyyli: tyylikirja. Linssin kehys: museot-ja-linssit.
