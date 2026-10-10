# Pulu GBR: raportti (pilviajo, haara pulu-gbr-pilvi)

- Vastauksia: vaihe 1 = 210 (42 kohtaa x 5), vaihe 2 = 476 (linkkitaso). Yhteensä 686.
- Kesto: noin 43 min (vaihe 0 -> paketti), kun enintään 2 agenttia oli rinnakkain.
- Agentit: Sonnet, effort low. Tokenit yhteensä noin 2,49 M (vaihe 1: 9 erää 0,88 M + korjaukset 0,19 M; vaihe 2: 6 erää 1,24 M + korjaukset 0,19 M).
- Tarkistuksen virheet ja korjaukset:
  - Vaihe 1 ensimmäinen ajo: 52 virhettä (10 puuttuvaa vastausta erässä 6, 42 käsitemäärävirhettä) -> korjattu agenteilla, lopuksi 0.
  - tarkista-valmis, vaihe 1: 50 rivinvaihtovirhettä (useampi kappale tai yksittäinen \n ennen Livian lisäystä) -> korjattu skriptillä (lisäys omaksi kappaleeksi), 0 jäljellä.
  - Vaihe 2 ensimmäinen ajo: 34 käsitemäärävirhettä + 1 huutomerkki (Oliver Twist) -> korjattu agenteilla, 0 jäljellä.
  - Lopputulos: tarkista-era vaihe1 0 virhettä, vaihe2 0 virhettä; tarkista-valmis 0 virhettä, 2 varoitusta (Yhdysvallat, Kiina; luettu, kelpaavat, ei linkkejä).
- Faktojen pistokoetta (30 vastausta) ei ajettu tässä ajossa; se jää Päätoimittajalle.
- Paketti: pulu-esigenerointi/GBR/GBR.json (42 kohtaa, 210 + 476 vastausta). maat.json päivitetty (vain GBR-rivi).
