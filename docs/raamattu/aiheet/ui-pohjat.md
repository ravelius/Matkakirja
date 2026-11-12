# ui-pohjat · vastuu NUI · tarkistettu 12.11.2026

TAVOITE: Pelaaja oppii ikkunat, napit ja valikot kerran, ja ne toimivat samoin kaikkialla. Käyttöliittymä on kevyt eikä peitä karttaa, ja tausta kertoo valinnan panoksen.

SÄÄNNÖT:
1. Jokainen ikkuna, kortti, paneeli ja valikko kootaan kirjaston pohjista; omaa tyyliä ei tehdä. Puuttuva pohja kysytään PT:ltä omistajalle, hyväksytty pohja käy vastaaviin kysymättä. [R-4.1] [R-4.2] [R-4.11]
2. Malli on natiivi; web-kuvaa tai -mittoja ei tarvita. [R-6.6]
3. Kelluvan pinnan palat ovat ylärivi, otsikko, leipä, kysymysrivi, nappirivi, huomautukset ja lähderivi. Päänappi etenee tai on peruuttamaton, sivunappi on sivuvalinta, viivarivi listavalinta. [R-4.8]
4. Kortti on kohteen vieressä ja peittää enintään 45 % ruudusta; ei koristeita eikä turhaa tyhjää. [R-4.4]
5. Tausta kertoo panoksen: selailussa ei tummennusta, harkinnassa kevyt sumennus, panoksessa reunoilta tumma sumennus. [R-4.9]
6. Selailupinta sulkeutuu rastista ja ohinapautuksesta, harkintapinta napeista ja ohinapautuksesta (valintaa pyytävä vain napeista), panospinta vain omasta toiminnostaan. Nosto ja Pulun chat sulkeutuvat ✕:stä tai asetuksen mukaan kartan napautuksesta. [R-4.10]
7. Nostossa ja Pulun chatissa on pin. Pinnattu (yksi kerrallaan) pienenee kartan liikkuessa palkiksi oikealle ylös, puhe jatkuu; pinnaamaton suljettu katoaa. [R-4.12]
8. Pinta avautuu napautuksen ruudulla avaajan suunnasta ja sulkeutuu samaa reittiä; siirtymät alle 250 ms ilman hyppyjä. Avatun koko ja paikka pysyvät, ja pienennetty kutistuu sisältönsä kokoiseksi. [R-4.15] [R-4.14] [R-4.16]
9. Puhetta ei kirjoiteta ruudulle, paitsi pelaajan valitsemana tekstityksenä. Nimikyltti näkyy saavuttaessa hetken; info- ja nimilaput vain napautuksesta. [R-4.13] [R-2.70]
10. Näkymän säädöt (aika, vuodenaika, LIVE, nimet, pilvet, sää) ovat vain ⚙:ssä. [R-2.73]
11. ☰ on sama kaikilla laitteilla ja asennoissa, ja siinä ovat vain pelin ympärykset; linssit ja pelit avataan Linssit-napista tai laukusta. Keskeneräinen ja työhuone näkyvät vain kehittäjälle. [R-4.32] [R-2.62] [R-2.74] [R-13.51]
12. Luennassa näkyy vain kaiutin ja mini-☰. Kaiutin on otsikkorivin oikeassa reunassa, VU kaarissa; tauolla se vilkkuu ja jatkaa samasta, ja ei luentaa -tila on vino viiva. Mini-☰:ssä ovat kappaleet, kelaus, äänet sekä Auto ja Nostojen ohjaus (oletus pois). [R-5.23] [R-5.25] [R-2.194] [R-2.31]
13. Oman maan kartussi on aina vasemmassa alakulmassa eikä estä vieritystä; napautus avaa maakortin. [R-2.149] [R-2.148]
14. Ulkoasua ei muuteta saavutettavuusohjeiden vuoksi; sallittuja ovat vain VoiceOver-nimet ja laajempi osuma-ala. [R-1.14]

EI VIKA:
- ISS-kohdevalikko peittää koko näkymän.

TEKOTAPA:
- Pohjavahti ennen merge-pyyntöä (lähtötaso saa vain pienentyä).
- Värit, fontit, kuvat ja liikkeen tyyli: tyylikirja. Linssin kehys: museot-ja-linssit.
