# Pulu SRB: raportti

- Vastauksia: vaihe 1 = 45 (9 kohtaa, 2 erää), vaihe 2 = 96 (2 erää), yhteensä 141.
- Kesto: noin 14 min (vaihe 0 alusta pakettiin, agentit enintään 2 rinnakkain).
- Agenttien tokenit yhteensä: noin 513 700 (97 309 + 98 828 + 94 836 + 222 683), Sonnet, effort low.
- Tarkistus: tarkista-era.mjs alussa 2 käsitemäärävirhettä vaiheessa 1 (7.5, 8.3), agentti korjasi; lopussa vaihe1 0 virhettä, vaihe2 0 virhettä. tarkista-valmis.mjs: 0 virhettä, 0 varoitusta (vaihe 1 -lisaa-avain-virheet poistuivat vaiheen 2 jälkeen).
- Faktojen pistokoetta (30 vastausta) ei tehty tässä ajossa: tehtävä Päätoimittajalle/silmin.
- Huomio: lataa-data.sh viittaa vanhaan versioon v625 (404). Ajettu kopiolla, jossa v654 (uusin.json). Skriptiä ei muutettu repossa. fokuskohteet-srb puuttui ämpäristä (skripti ohittaa sen).
- Paketti: pulu-esigenerointi/SRB/SRB.json. maat.json päivittyi (SRB-rivi).

## Pistokoekorjaukset 10.10.

Päätoimittajan jatko-ohjeen (Sisältökirjurin pistokoe) kuusi korjausta tehty vastaukset-1-1/1-2/2-1/2-2.txt-tiedostoihin ja paketti koottu uudelleen:
1. Belgradin linnoituksen korkeus 125,5 m poistettu (V1, kohta 1.x).
2. Golubac: kunnostus 2014-2019, avattu juhlallisesti maaliskuun lopussa 2019 (V1 ja V2).
3. Felix Romuliana: rakentaminen alkoi noin vuonna 298 Sassanidien voiton jälkeen (V1 ja V2, kaksi V2-vastausta).
4. Manasija: alun perin noin 2 000 m² maalauksia, säilynyt noin kolmannes (V1 ja V2).
5. Smederevo: rakennus vuodesta 1428, sisälinnoitus 1430, Suuri kaupunki 1439, 25 tornia (V1 kolme vastausta, V2 yksi).
6. Smederevon räjähdys 1941: satoja, arvioiden mukaan jopa 2 500 kuollutta; vaurioitti kaupunkia, torneja ja muuria (V1 ja V2).
Yhteensä 14 lauseenkorvausta 12 vastauksessa; muuta ei muutettu. Tarkistukset: tarkista-era vaihe 1 ja 2 sekä tarkista-valmis, 0 virhettä. Kysymystekstejä ei tarvinnut korjata (korjattuja kysymyksiä ei annettu).
