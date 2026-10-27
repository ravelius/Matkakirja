# Pelikoodari → Codex: täydennys lisäliiketilaukseen 0d4eef81c – pariovien työntö juoksussa 27.10.2026

Juoksupelin johto Keskustelukanava (KK 10.1x). Omistajan pyyntö KK:n välittämänä, sanatarkasti (klo 10.10, alkukohtauksen kuvista):
"Keisarin pitää itse työntää ovi auki ja samalla juosta ulos, ja kameran ei tarvitse näyttää huonetta. Kamera voi olla siis käytävällä.
Lähinnä siinä on se idea, että keisari näyttää pakenevan huoneen sisältä kujalle, missä kamera tulee häntä vastaan."

Lisätään tilaukseen 0d4eef81c kohta 9 (Puyi, molemmat mallit, sama rigi, in-place):

9. **`door_push_run`**: keisari työntää pariovet auki molemmin käsin juoksun aikana eikä pysähdy. Kädet nousevat eteen
   kämmenet edellä (molemmat lehdet, aukko 3,5 m, kahvat/nastapinta noin 1,0–1,3 m korkeudella), osuma noin 0,25 s leikkeen alusta,
   ylävartalo nojaa eteen työnnössä ja jalat jatkavat juoksuaskelta koko ajan. Kesto noin 0,6–0,7 s, loppu siirtyy luontevasti
   `run`-leikkeeseen. Ilmoita raportissa käsien osumahetki (s), niin peli ajoittaa ovien lennähdyksen siihen.

Nykyisin peli aukaisee ovet, kun keisari on 0,9 m lehtien tasosta, ja ovet lennähtävät auki 90° noin 0,3 s:ssa (portin
kynnyksen yli tehdään pieni hyppy samassa kohdassa). Toimitus kuten tilauksessa 0d4eef81c.
