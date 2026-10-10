# Pulu MKD: raportti

- Vastauksia: vaihe 1 = 35 (7 kohtaa × 5), vaihe 2 = 66; yhteensä 101.
- Kesto: noin 11 min (data, 3 agenttia: 2 rinnakkain vaiheessa 1, 1 vaiheessa 2).
- Agenttien tokenit yhteensä: noin 364 000 (74 706 + 93 879 + 195 521), Sonnet, effort low.
- Tarkistukset:
  - tarkista-era vaihe 1: 4 virhettä (käsitemäärä 0–1 neljässä vastauksessa: 6.2, 6.5, 7.2, 7.3); korjattu lisäämällä [[linkit]], uusinta 0 virhettä.
  - tarkista-era vaihe 2: 4 virhettä (käsitemäärä 1: kohdat 3, 4, 5, 26); korjattu, uusinta 0 virhettä.
  - tarkista-valmis: 0 virhettä, 0 varoitusta (lopuksi). Ennen vaihetta 2 näkyneet "ei lisaa-avainta" -virheet johtuivat vain puuttuvasta vaiheesta 2.
- Faktojen pistokoetta (30 vastausta) ei ajettu tässä ajossa.
- Huomio: lataa-data.sh:n v625 antoi 404 (vanhentunut), data haettu versiosta v653 (skriptiä ei muutettu repossa). fokuskohteet-mkd.json ei ole olemassa (skripti ohittaa).
- Paketti: pulu-esigenerointi/MKD/MKD.json (päivitti myös pulu-esigenerointi/maat.json, vain MKD-rivi).
