# Pulu CHE: raportti

- Vastauksia: vaihe 1 = 200 (40 kohtaa × 5), vaihe 2 = 382; yhteensä 582.
- Kesto: noin 36 min (vaihe 0 alusta pakettiin, 2 agenttia rinnakkain).
- Agenttien tokenit yhteensä: noin 1,97 milj. (vaihe 1 noin 0,95 milj., 10 ajoa; vaihe 2 noin 1,01 milj., 5 ajoa; Sonnet, effort low). Summa lasketaan agenttien raportoimista käyttöluvuista, joten se on likimääräinen.
- Tarkistuksen virheet:
  - Vaihe 1 (tarkista-era): 17 käsitemäärävirhettä (1 käsite, vaaditaan 2–5) ja yksi virheellinen jatkokysymys (31.5); kaikki korjattu → 0.
  - Erä 2:n ensimmäinen ajo jätti paikat n.1 ja n.2 vastaamatta; täydennettiin.
  - Vaihe 2: 1 käsitemäärävirhe (matterhorn / Cervin, #24); korjattu → 0.
  - tarkista-valmis: 0 virhettä, 2 varoitusta (Egypti Mooseksen yhteydessä, Yhdysvallat ARPANETin yhteydessä), luettu silmin: ainoastaan tavallista tekstiä, ei linkkejä, hyväksytty.
- Faktojen pistokoetta (30 vastausta) ei tehty, koska verkkoa käytetään vain gitiin ja datan lataukseen; faktat ovat agenttien aineisto- ja muistinvaraisia. Pistokoe jää Päätoimittajalle.
- Paketti: pulu-esigenerointi/CHE/CHE.json (40 kohtaa, 200 kysymysvastausta, 382 linkkivastausta). maat.json päivitetty (vain CHE:n rivi).
