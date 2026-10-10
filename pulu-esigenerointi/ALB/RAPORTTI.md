# Pulu ALB: raportti

- Vastauksia: vaihe 1 = 35 (7 kohtaa × 5), vaihe 2 = 73 (linkkitaso). Yhteensä 108.
- Kesto: noin 16 min (vaihe 0 – paketti).
- Agentit (Sonnet, effort low): 3 kpl, tokenit yhteensä 404 976 (erä 1-1: 95 876; 1-2: 73 758; 2-1: 235 342).
- Tarkistus: tarkista-era.mjs vaihe 1 antoi alussa 2 virhettä (1.4 jatkokysymys yli 70 merkkiä; 6.3 käsitteitä 1 ja lause pienellä jäännöksen jälkeen "jkr."). Molemmat korjattu käsin. Vaihe 2: 0 virhettä. tarkista-valmis.mjs: 0 virhettä, 3 varoitusta (Egypti/Intia tavallisena tekstinä, hyväksytty).
- Faktapoiminta: hakuvaihe riskisanoille (suurin/ensimmäinen/vanhin, pyöreät luvut, metalauseet) ei löytänyt ongelmia; täyttä 30 vastauksen pistokoetta ei tehty.
- Huomio: lataa-data.sh:n kovakoodattu sisältöversio v625 antoi 404; data ladattiin versiolla v653 (uusin saatavilla). Skriptiä ei muutettu.
- Paketti: pulu-esigenerointi/ALB/ALB.json (7 kohtaa, 35 kysymysvastausta, 73 linkkivastausta); maat.json päivitetty (vain ALB-rivi).

## Pistokoekorjaukset 10.10.

Päätoimittajan ohjeen (Sisältökirjurin pistokoe) viisi korjausta tehty sanatarkasti kaikkiin toistuviin kohtiin (vaihe 1, vaihe 2 ja jatkot), vain taivutus ja lauseyhteys sovitettu:
1. Beratin linna, kirkkojen määrä: 1-1 (kirkkokysymys), 2-1 (Kalaja, linna, Berat) – 4 kohtaa.
2. Beratin perustaminen: 1-1 (perustaja), 2-1 (Antipatreia, Berat, Kassandros); Osmanien valtaus 1417 kirjoitettu "1400-luvun alussa, yleensä ilmoitetun mukaan vuonna 1417" myös 1-1 (osmanit), 2-1 (ottomaanikausi).
3. Valbona: 1-1 (perustaminen ja koko; metsäprosentti 89 poistettu pyöreänä lukuna), 2-1 (Albanian Alpit: yhdistäminen 2022).
4. Krujë: museo (avattu 1982) ja 5000 lekin seteli: 1-1 (museo, raha), 2-1 (Krujë, kansallismuseo, lek).
5. Butrint: 1-2 (loistoaika, raunioina), 2-1 (Rooma: "vesijohto ja foorumi").
Kysymystekstejä ei muutettu (ohjeessa ei annettu korjattuja kysymyksiä).
Tarkistukset: tarkista-era vaihe 1 ja 2: 0 virhettä; tarkista-valmis: 0 virhettä, 3 varoitusta (kuten ennen). Paketti ALB.json koottu uudelleen (7 kohtaa, 35 + 73 vastausta).
