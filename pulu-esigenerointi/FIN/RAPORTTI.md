# Pulu FIN: raportti

- Vastauksia: vaihe 1 = 245 (49 kohtaa × 5), vaihe 2 = 550 (linkkitaso); yhteensä 795.
- Kesto: noin 59 min seinäkelloa (vaihe 0 alusta pakettiin), sisältäen konttiuudelleenkäynnistyksen, jossa vaiheen 2 erät 1–2 jouduttiin ajamaan uudelleen.
- Agentit: 17 Sonnet-agenttia (effort low), 10 vaiheen 1 erää ja 7 vaiheen 2 erää, enintään 2 rinnakkain. Tokenit yhteensä noin 2,59 milj. (vaihe 1 noin 1,04 milj., vaihe 2 noin 1,55 milj.); uudelleenkäynnistyksessä menetettyjen kahden ajon tokeneita ei lasketa mukaan.
- Tarkistukset:
  - `tarkista-era.mjs vaihe1`: 0 virhettä. Agentit korjasivat itse noin 15 virhettä (pääosin liian vähän [[käsitteitä]]).
  - `tarkista-era.mjs vaihe2`: 0 virhettä. Agentit korjasivat itse noin 40 virhettä (sama syy), mm. kohta 98 (outo lause).
  - `tarkista-valmis.mjs`: 0 virhettä, 0 varoitusta (vaihe 1 + vaihe 2).
- Ei tehty: faktojen pistokoe (30 vastausta) jää tekemättä. Agentit ilmoittivat epävarmoja kohtia: 9.3 (Petäjäveden kellotapuli, epävarmuus sanottu vastauksessa). PAIKKA-rivit (Rovaniemi, Hämeenlinna, Kotka, Punkaharju, Uusikaupunki, Vaasa, Kajaanin linna) tarkistettu silmin ja koordinaatit täsmäävät.
- Paketti: `pulu-esigenerointi/FIN/FIN.json` (49 kohtaa, 245 + 550 vastausta). `pulu-esigenerointi/maat.json` päivitetty (vain FIN-rivi).
