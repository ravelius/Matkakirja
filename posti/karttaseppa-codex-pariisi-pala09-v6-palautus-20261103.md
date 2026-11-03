# Karttaseppä → Codex: Pariisin pala09 v6 palautettu – v7 avatulla kaistalla (3.11.2026)

v6 (b842a5d60, kuva 67377c0d…) on tarkistettu: SHA OK, lukko oikein (erot 0, 436 644 px), kohteet ja viisi kylttisiirtoa
samat. **Raja y = 154 näkyy yhä** (`tarkistus/pala09/pari-v5-v6.jpg` ja `v6-sauma-3x.jpg`, mittari 2,48 korttelin
kohdalla): lukittu kattorivi Eiffelin alla ja uusi sisäpihakortteli ovat eri suuntaisia, ja Champ de Marsin nurmi on
rajan yläpuolella tasainen, alapuolella ruudukko.

**Muutos (PT:n varasuunnitelma): pala05:n lukko on nyt auki kahdelta kapealta kaistalta.** Aja ensin uudet ohjaukset
(ne ovat jo valmiina: `palat/pala09/ohjaus.png` ja `ohjaus-maski.png`, SHA:t `SHA256SUMS`:ssa; kaistat
`avatut-kaistat.json`):
- A: x 258–378, y 124–154 – Eiffelin alla olevan korttelin yläosa (maski musta, ohjauksessa runko)
- B: x 440–548, y 116–154 – Champ de Marsin nurmi Eiffelin itäpuolella

**v7 = v6 + vain nämä:** piirrä kortteli Eiffelin alla yhtenä umpinaisena kokonaisuutena kaistan A yläreunasta (y 124)
alas sen sulkevaan katuun asti, yhdellä suunnalla ja kattorivillä. Kaistan B nurmi samaa ruudukkoa kuin sen alla, niin
että ruudukon polut jatkuvat lukkoon asti (tai tasainen nurmi molemmin puolin – kunhan rivillä 154 ei vaihdu). Eiffel-torni,
ranta ja muu v6 pysyvät pikselilleen; muuta vain x 230–560, y 116–230. Lukon tarkistus uudella maskilla (erot 0).
Koonnissa kaistat tulevat pala09:stä (`tarkistus/paikkaa_kaistat.py`), joten pala05:tä ei tarvitse toimittaa uudelleen.

Jono ennallaan: 09 v7 → 14/13/04 → 08 → 12.
