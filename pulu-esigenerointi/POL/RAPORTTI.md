# Pulun vastaukset: POL (Puola), pilviajo

- Vastauksia yhteensä 695: vaihe 1 = 225 (45 kohtaa × 5), vaihe 2 = 470 (linkkitaso "Kerro lisää").
- Kesto: noin 49 min (vaiheen 0 alusta pakettiin; sisältää vaiheen 1 ja 2 ajot, enintään 2 agenttia rinnakkain).
- Agentit: 15 Sonnet-agenttia (effort low), tokenit yhteensä noin 2,27 milj. (vaihe 1: 9 agenttia ≈ 0,90 milj.; vaihe 2: 6 agenttia ≈ 1,36 milj.).
- Tarkistus (tarkista-era.mjs, tarkista-valmis.mjs):
  - Alussa virheitä: vaihe 1 yhteensä 19 käsitemääräversiota + 1 rivinvaihto, vaihe 2 yhteensä 15 (13 käsitemäärää, 1 huutomerkki, 1 Euroopan ulkopuolinen linkki).
  - Korjattu: rivinvaihto (V1 kohta Pszczyna), jäännöstekstit ("Nyt muistan:.", "tähän osaan vastata", tuplavälilyönti), Heineken- ja Soła-vastausten 0 linkkiä (lisätty linkit; poistettu epävarma "suurimmista" ja kaupungin siirtoväite), huutomerkki Pan Tadeusz -lainauksesta, Hollannin Itä-Intian kauppakomppania -linkki tavalliseksi tekstiksi.
  - Jäljellä: 19 (V1 ja V2 yhteensä) vastausta, joissa on vain yksi [[käsite]] (omistaja sallii yksittäisen käsitemääräveän), ja 4 varoitusta (ulkomainen maininta tekstissä: Intia, Egypti, Kiina; luettu, kuuluvat aiheeseen).
- Faktat: ei pistokoetta (30 vastausta) tässä ajossa; muistinvaraiset ensin -pistokoe jää Päätoimittajalle. Agentit raportoivat koordinaatit (Częstochowa, Zamość, Westerplatte, Lublin) muistinvaraisiksi; PAIKKA-rivit pitäisi tarkistaa.
- Paketti: `pulu-esigenerointi/POL/POL.json` (45 kohtaa, 225 + 470 vastausta). `pulu-esigenerointi/maat.json` päivitetty (vain POL-rivi).
