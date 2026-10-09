# Pulu DEU: raportti (pilviajo, haara pulu-deu-pilvi-b)

- Vastauksia: vaihe 1 = 325 (65 kohtaa x 5), vaihe 2 = 796 (10 erää), yhteensä 1 121.
- Kesto: syote.json commitoitu n. 16:25 UTC, viimeinen erä valmis n. 19:55 UTC (n. 3,5 h, kahden pilvisession yli). Jatkoajo (erät 2 kesken–10, tarkistukset) n. 19:25–20:00 UTC.
- Agentit: Sonnet, effort low. Tämän jatkosession agenttien tokenit yhteensä 1 658 301 (9 agenttia: erät 2 ja 3 jatko, erät 4–10). Edellisen session agenttien tokeneja (vaihe 1, erä 1 ja osa erää 2–3) ei ole tallessa, joten kokonaismäärä on suurempi.
- Tarkistus (tarkista-era.mjs): vaihe 1 virheitä 0; vaihe 2 aluksi 16 (kaikki käsitteitä 1 < 2), korjattu lisäämällä toinen [[käsite]]; lopuksi 0.
- Tarkistus (tarkista-valmis.mjs): aluksi 7 virhettä. Korjattu: 4 x "lause alkaa pienellä kirjaimella" (lyhenne "jKr." -> "jKr", vaihe 1 erä 7 ja vaihe 2 erä 6) ja 1 x huutomerkki (Romanian ateneum -lainaus). Jäljellä 3 virhettä: "Euroopan ulkopuolinen linkki [[Chilehaus]]" / [[Chilehausineen]] (Elbe, Hampuri x2). Väärä positiivinen: Chilehaus on Hampurin Kontorhaus-alueen rakennus, joten linkit ovat Euroopassa ja jäävät. 9 varoitusta (ulkomainen maininta: Brasilia, Kiina, Chile, Japani, Yhdysvallat) luettu: sopivat asiayhteyteen.
- Faktat: ei pistokoetta tässä ajossa (30 vastausta, muistinvaraiset); agentit hedgasivat epävarmat luvut. Pistokoe jää Päätoimittajalle.
- Erä 2 ja 3 jatkettiin keskeltä; agentit saivat "Neljä virhettä" -tekstin viestinä vasta ajon aikana, ja erä 3:n kohdat 201–208 kirjoitettiin uudelleen.
- Paketti: pulu-esigenerointi/DEU/DEU.json (65 kohtaa, 325 kysymysvastausta, 796 linkkivastausta). maat.json päivitetty (vain DEU-rivi).
