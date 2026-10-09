# Pulu SWE: raportti (pilviajo 9.10.2026)

- Vastauksia: vaihe 1 = 255 (51 kohtaa × 5), vaihe 2 = 628 linkkivastausta; yhteensä 883.
- Kesto: noin 81 min (vaihe 0 alusta pakettiin).
- Agentit: Sonnet, effort low, enintään 2 rinnakkain; 11 + 8 erää ja 4 korjausagenttia. Tokenit yhteensä noin 3,34 milj. (vaihe 1: 1,14 milj. + korjaukset 0,20 milj.; vaihe 2: 1,81 milj. + korjaukset 0,19 milj.).
- Tarkistus (tarkista-era.mjs):
  - Vaihe 1: 36 virhettä (33 liian vähän [[käsitteitä]], 3 puuttuvaa vastausta paikoissa 41.3–41.5, 1 kelpaamaton uusi kysymys 33.3) → kaikki korjattu, lopuksi 0 virhettä.
  - Vaihe 2: 78 virhettä (kaikki liian vähän [[käsitteitä]]; erät 6 ja 7) → kaikki korjattu, lopuksi 0 virhettä.
- tarkista-valmis.mjs: 2 "virhettä" ovat metalausehälytyksiä sanasta "ohjeiden" (pyhän Birgitan ohjeet, Vadstenan luostari; ei viittaa kehotteeseen), jätetty ennalleen. 5 varoitusta (ulkomainen maininta: Australia, Egypti, Intia, Meksiko, Yhdysvallat) ovat tavallista tekstiä, ei linkkejä; ei muutettu.
- Faktojen 30 vastauksen pistokoetta ei ole tehty; faktat ovat muistinvaraisia ja tarkistamatta.
- Paketti: `pulu-esigenerointi/SWE/SWE.json` (51 kohtaa, 255 kysymysvastausta, 628 linkkivastausta); `pulu-esigenerointi/maat.json` päivitetty (vain SWE-rivi).
