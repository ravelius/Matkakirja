# Pulu HUN: raportti

- Vastauksia: vaihe 1 = 220 (44 kohtaa × 5), vaihe 2 = 472 (linkkitaso); yhteensä 692.
- Kesto: noin 50 min (data + vaihe 1 + korjaus + vaihe 2 + paketti).
- Agentit: Sonnet, effort low, enintään 2 rinnakkain; 9 + 2 korjausagenttia vaiheessa 1, 6 vaiheessa 2.
  Tokenit yhteensä noin 2,42 milj. (vaihe 1: 0,87 milj.; korjaukset: 0,17 milj.; vaihe 2: 1,38 milj.).
- Tarkistus:
  - Vaihe 1: ensimmäisellä ajolla 36 virhettä (liian vähän [[käsitteitä]], yksi puuttuva JATKOT-osio); kaikki korjattu, lopuksi 0 virhettä.
  - Vaihe 2: 3 käsitemäärävirhettä (1 käsite, vaadittu 2–5; kohdat 415, 434, 446), jätetty (omistajan linjaus: yksittäinen käsitemäärävirhe saa jäädä).
  - tarkista-valmis.mjs: 1 virhe (huutomerkki, kohta Egri-viini), korjattu; lopuksi 0 virhettä, 0 varoitusta.
  - Faktojen 30 vastauksen pistokoetta ei ajettu tässä sessiossa; se jää Päätoimittajalle.
- Paketti: pulu-esigenerointi/HUN/HUN.json (44 kohtaa, 220 kysymysvastausta, 472 linkkivastausta). maat.json päivitetty (vain HUN-rivi).
