# tilit-ja-kiintio · vastuu PT · tarkistettu 18.11.2026

TAVOITE: Peli etenee täyttä vauhtia joka päivä: kiintiö ei hidasta työtä, eikä tilin vaihto katkaise sitä. Jokainen rooli tekee työnsä kevyimmällä riittävällä mallilla, joten kiintiö riittää pidemmälle.

SÄÄNNÖT:
1. Omistajalla on kolme Claude-tiliä, joita käytetään vuorotellen; yksi tili kestää noin kolme päivää. Päätilillä on myös omistajan muuta käyttöä. [P-261110-10]
2. Viikko- tai viiden tunnin raja ei ole syy hidastaa, laskea tasoa tai rajata työtä. Kulutusta pienennetään tehostamalla: ei tiedoksi-kopioita, ei välitysviestejä. [P-261111-11]
3. Tili käytetään 100 %:iin, kun omistajalla on sille reset; vaihtoa ei valmistella eikä rooleja luovuteta 90 %:ssa, vaan 99 %:ssa KK antaa omistajalle yhden rivin. Siirtoprompti pidetään varalla. [P-261113-15] Kun omistaja tekee päätilille resetin, raja 92 % ei pysäytä: roolit jatkavat samalla tilillä ilman tilinvaihtoa, ja 99 %:ssa KK saa rivin, jos reset ei vielä näy. [P-261118-1] [P-261118-3]
4. Tilin vaihtaa omistaja antamalla uuden tilin PT:lle siirtopromptin. Kirjautumisohjeita ei anneta, eikä komentorivin kirjautumista pyydetä. [R-12.23]
5. Uuden tilin käyttöraja kysytään vain tilinvaihdossa, ei nollauksen tai tiedon korjauksen takia. [R-12.21]
6. Vanhat sessiot jatkavat nollattuina samoilla tunnuksilla. Jos se ei onnistu, luodaan uudet ja vanhat arkistoidaan kysymättä. [R-12.23]
7. Vaihdossa sallinnat ja hookit palautetaan, avaimia ei kysytä omistajalta, ja tilin yli siirtyvät vain Raamattuun kirjatut luvat. Vaihto kirjataan lokiin. [R-12.23] [P-261117-59]
8. Vaihto on valmis vasta, kun tarkistus on puhdas ja ohjeiden koe läpi; silloin KK saa yhden rivin. [R-12.23]
9. Koodaavat Opus-roolit ajetaan high-tasolla; Julkaisija, Lavastaja ja PT medium. Postivahti, Sisältökirjuri, Laitetestaaja ja Äänittäjä ajetaan Sonnetilla. [R-7.9] [R-7.4]
10. Max vain uuden kokonaisuuden suunnitteluun ja juurisyyhyn, johon yksi yritys ei riittänyt; toteutus highilla. Julkaisija high vain CI-vian ajan. [R-7.9]
11. KK:n mallin ja tason valitsee omistaja; taso säilyy nollausten yli. Kokeena medium vuorokauden, sitten omistaja päättää. [P-261111-12] [P-261116-17]
12. Lisäosat ovat apuna, Raamattu ja koodin tyyli voittavat. Unityn komentorivi vain Natiivisepän kautta; uusia lisäosia ja pilvisessioita vain omistajan päätöksellä. [R-7.13]
13. Voimassa olevan tilauksen käyttö ei ole ostamista. Generointiluvat: omistajan-kanssa ja grafiikan-tuotanto. [R-12.24]
14. Omistajan pyytämien korjausten julkaisuun asti krediittejä saa käyttää: 90 %:n raja ei pysäytä työtä, rooleja eikä vaihda tiliä; julkaisun jälkeen 90 % palaa voimaan. [P-261119-34]

EI VIKA:
- Täysi työtahti viikon lopulla, vaikka tilin kiintiö hupenee.

TEKOTAPA:
- Vaihdon menettely ja roolitaulukko: docs/tilinvaihto.md. Puhtaus: tools/tyotavat/tilinvaihto-valmis.mjs.
- Mallit, tasot ja tunnukset: osoitekirja.
