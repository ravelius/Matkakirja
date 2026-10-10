# Pulu SVK: pilviajon raportti (10.10.2026)

- Vastauksia: vaihe 1 = 165 (33 kohtaa x 5), vaihe 2 = 360 (linkkitaso), yhteensä 525.
- Kesto: noin 38 min (lataus, 7+5 erää, korjaukset, tarkistukset).
- Agentit (Sonnet, effort low, enintään 2 rinnakkain): 7 erää vaihe 1, 5 erää vaihe 2, 2 korjausagenttia. Tokenit yhteensä noin 1 914 000 (vaihe 1: 675 722; korjaus 1: 73 607; vaihe 2: 1 095 997; korjaus 2: 69 075).
- Tarkistus (tarkista-era.mjs): vaihe 1 aluksi 20 virhettä (18 kohdassa alle 2 käsitettä, 2 puuttuvaa vastausta 17.4 ja 17.5) → korjattu, 0 virhettä. Vaihe 2 aluksi 10 virhettä (9 kohdassa 1 käsite, 1 kelpaamaton jatko kohdassa 222) → korjattu, 0 virhettä.
- tarkista-valmis.mjs: aluksi 2 virhettä (huutomerkki, jatkot) → korjattu; lopuksi 0 virhettä, 1 varoitus (Kiina-maininta ruudin historiassa, Banská Štiavnica; jätetty, koska ruudin alkuperän maininta on asiayhteydessä).
- Poikkeama: lataa-data.sh:n kovakoodattu v625 ei enää ollut ämpärissä (404); käytettiin versiota v647 (uusin, jossa kokoelmat olivat). fokuskohteet- ja maastokohteet-paketteja ei SVK:lle ole (404, valinnaiset).
- Faktapistokoetta (30 vastausta) ei ole tehty; agentit eivät ajaneet omia tarkistuksiaan, faktat ovat muistinvaraisia pehmennyksineen. Suositus: pistokoe ennen vientiä.
- Paketti: pulu-esigenerointi/SVK/SVK.json (33 kohtaa, 165 + 360 vastausta); pulu-esigenerointi/maat.json päivitetty (vain SVK-rivi).

## Pistokoekorjaukset 10.10.

- Štrbské Pleso: väite "ensimmäinen hiihtokoulu perustettiin 1899" (vain yksi lähde) poistettu kaikista kuudesta vastauksesta (vaihe 1: 31.3 ja 31.5; vaihe 2: kohdat 326, 330 ja yksi Rautatie-vastaus vastaukset-2-4.txt:ssä). Kohta 31.5 oli kysymys hiihtokoulusta, joten sen kysymys ja vastaus korvattiin kysymyksellä "Kuka rakensi hirsimajan Štrbské Pleson rannalle?" (hirsimaja 1872, avattu matkailijoille 1873, valtio osti 1901; ei hiihtokoulua). Kohtiin 326 ja 330 lisättiin yksi [[käsite]] (linkkimäärän minimi 2).
- Muut Štrbské Pleso -faktat (hirsimaja 1872/1873, hammasratarata 1896, valtion osto 1901) säilytettiin. Muihin vastauksiin ei koskettu.
- Tarkistukset uudelleen: tarkista-era.mjs vaihe 1 ja 2: 0 virhettä; tarkista-valmis.mjs: 0 virhettä, 1 varoitus (ennallaan). SVK.json koostettu uudelleen (ei merkintöjä "1899" tai "hiihtokoul").
