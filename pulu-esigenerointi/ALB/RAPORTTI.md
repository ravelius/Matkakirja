# Pulu ALB: raportti

- Vastauksia: vaihe 1 = 35 (7 kohtaa × 5), vaihe 2 = 73 (linkkitaso). Yhteensä 108.
- Kesto: noin 16 min (vaihe 0 – paketti).
- Agentit (Sonnet, effort low): 3 kpl, tokenit yhteensä 404 976 (erä 1-1: 95 876; 1-2: 73 758; 2-1: 235 342).
- Tarkistus: tarkista-era.mjs vaihe 1 antoi alussa 2 virhettä (1.4 jatkokysymys yli 70 merkkiä; 6.3 käsitteitä 1 ja lause pienellä jäännöksen jälkeen "jkr."). Molemmat korjattu käsin. Vaihe 2: 0 virhettä. tarkista-valmis.mjs: 0 virhettä, 3 varoitusta (Egypti/Intia tavallisena tekstinä, hyväksytty).
- Faktapoiminta: hakuvaihe riskisanoille (suurin/ensimmäinen/vanhin, pyöreät luvut, metalauseet) ei löytänyt ongelmia; täyttä 30 vastauksen pistokoetta ei tehty.
- Huomio: lataa-data.sh:n kovakoodattu sisältöversio v625 antoi 404; data ladattiin versiolla v653 (uusin saatavilla). Skriptiä ei muutettu.
- Paketti: pulu-esigenerointi/ALB/ALB.json (7 kohtaa, 35 kysymysvastausta, 73 linkkivastausta); maat.json päivitetty (vain ALB-rivi).
