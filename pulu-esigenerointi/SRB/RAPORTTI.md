# Pulu SRB: raportti

- Vastauksia: vaihe 1 = 45 (9 kohtaa, 2 erää), vaihe 2 = 96 (2 erää), yhteensä 141.
- Kesto: noin 14 min (vaihe 0 alusta pakettiin, agentit enintään 2 rinnakkain).
- Agenttien tokenit yhteensä: noin 513 700 (97 309 + 98 828 + 94 836 + 222 683), Sonnet, effort low.
- Tarkistus: tarkista-era.mjs alussa 2 käsitemäärävirhettä vaiheessa 1 (7.5, 8.3), agentti korjasi; lopussa vaihe1 0 virhettä, vaihe2 0 virhettä. tarkista-valmis.mjs: 0 virhettä, 0 varoitusta (vaihe 1 -lisaa-avain-virheet poistuivat vaiheen 2 jälkeen).
- Faktojen pistokoetta (30 vastausta) ei tehty tässä ajossa: tehtävä Päätoimittajalle/silmin.
- Huomio: lataa-data.sh viittaa vanhaan versioon v625 (404). Ajettu kopiolla, jossa v654 (uusin.json). Skriptiä ei muutettu repossa. fokuskohteet-srb puuttui ämpäristä (skripti ohittaa sen).
- Paketti: pulu-esigenerointi/SRB/SRB.json. maat.json päivittyi (SRB-rivi).
