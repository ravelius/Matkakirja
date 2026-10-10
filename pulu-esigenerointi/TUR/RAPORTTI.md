# TUR: Pulun valmiit vastaukset (pilviajo 10.10.2026)

- Vastauksia: vaihe 1 = 145 (29 kohtaa × 5), vaihe 2 = 335 (linkkitaso), yhteensä 480.
- Kesto: noin 70 min vaiheesta 0 paketin koontiin (agentit enintään 2 rinnakkain), sitä ennen datan korjaus noin 20 min.
- Agenttien tokenit yhteensä: noin 2,0 milj. (vaihe 1 noin 0,72 milj., vaihe 2 noin 1,29 milj.; sis. uusinnat).
- Poikkeama vaiheessa 0: `lataa-data.sh` antoi 404 (ämpärin v625 ei löytynyt). Kokoelmat ja `*-tur.json`-paketit rakennettiin paikallisesti `tools/vienti/vie-sisalto.mjs`:llä repon lähteistä ja kopioitiin kansioon `pulu-esigenerointi/data/` (ei commitoitu).
- Tarkistus: `tarkista-era.mjs` vaihe 1: 4 virhettä (käsitemäärä 1: 12.3, 12.4, 14.2, 22.3), kaikki korjattu → 0. Vaihe 2: 0. `tarkista-valmis.mjs`: aluksi 1 virhe (huutomerkki, Hagia Sofia) ja vaiheen 2 erä 4 oli kirjoitettu kehystettynä (ohjeen vastaisesti) → erä kirjoitettiin uudelleen kehyksettömänä → 0 virhettä, 23 varoitusta (ulkomainen maininta tekstissä: Egypti, Irak, Intia ym.; Eufrat-, Suez- ja heettiläisaiheissa perusteltuja, ei luettu yksitellen).
- Tekemättä: faktojen pistokoe (30 vastausta) — faktat ovat muistinvaraisia, agentit eivät tarkistaneet lähteitä. Agentti-ilmoitukset nostivat tarkistettaviksi mm. vaihe 1 -paikat 23.3, 23.5, 24.1–24.3 (Irak/Mesopotamia, linkkien taivutukset) sekä vaiheen 2 kohdat 2, 3, 9, 41, 46, 57, 262, 265, 272, 279, 289, 290, 297, 298, 305, 306, 308, 314.
- Paketti: `pulu-esigenerointi/TUR/TUR.json` (29 kohtaa, 145 + 335 vastausta); `pulu-esigenerointi/maat.json` päivitetty (TUR-rivi).
