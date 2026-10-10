# Pulu CYP — raportti

- Vastauksia: vaihe 1 = 145 (29 kohtaa × 5, joista 2 kohdan 17 vastausta täydennetty erikseen), vaihe 2 = 310; yhteensä 455.
- Kesto: noin 34 min (vaiheesta 0 koosteeseen), enintään 2 agenttia rinnakkain.
- Agenttien tokenit yhteensä: noin 1,67 M (vaihe 1: 6 erää + 2 korjausagenttia ≈ 0,74 M; vaihe 2: 4 erää ≈ 0,93 M). Sonnet, effort low.
- Data: lataa-data.sh ajettiin v656:lla väliaikaisesta kopiosta (skriptiä ei muutettu); fokuskohteet-cyp 404 (sallittu).
- Tarkistus (tarkista-era.mjs): vaihe 1 aluksi virheitä: erä 2 (useita käsitemäärävirheitä, Euroopan ulkopuolisia linkkejä, muistinvaraisia lukuja → kirjoitettiin uudelleen agentilla), käsitemäärä 19.1 ja 25.4 (korjattu käsin), 17.4–17.5 puuttuivat (täydennetty agentilla), 27.1 (korjattu). Lopuksi 0 virhettä.
  Vaihe 2: 9 virhettä (jatko 1, käsitemäärä 8; korjattu käsin, samalla poistettu muutama varmistamaton luku/anekdootti). Lopuksi 0 virhettä.
- tarkista-valmis.mjs: 0 virhettä, 9 varoitusta (ulkomainen maininta tekstissä: Egypti, Kiina, Intia; luettu, ei linkkejä).
- Faktojen pistokoetta (30 vastausta) ei ole tehty; muistinvaraiset PAIKKA-rivit (Salamis ×2, Famagusta, Apostolos Andreas, Polis, Palaipafos, Argos) kannattaa tarkistaa.
- Paketti: pulu-esigenerointi/CYP/CYP.json (29 kohtaa); pulu-esigenerointi/maat.json päivitetty (vain CYP-rivi).

## Pistokoe ja korjaukset (Sisältökirjuri 10.10.2026)

- Pistokoe: 37 väitettä (2 Sonnet-agenttia, 2 lähdettä per väite): OIKEIN 17, EPÄTARKKA 19, VIRHE 1. 20 kohtaa korjattu sanatarkasti vaihe1.json/vaihe2.json-tiedostoihin (60 vastausta), paketti koottu uudelleen. Riippumaton tarkistus: kaikki korjaukset toteutuneet; löydetyt 2 jälkivirhettä korjattu.
- Toistunut tyyppi: tarkat luvut ja vuodet, jotka ovat vain Wikipediassa (asukasluvut, rantojen/lajien määrät, perustamisvuodet) — muistinvarainen tarkka luku ilman kahta lähdettä; toiseksi syy-seuraus-selitykset (kivenryöstö, Leukollan taistelu).
- HUOM: vastaukset-*.txt eivät sisällä korjauksia (lähde on nyt vaihe1.json/vaihe2.json); älä aja tarkista-era.mjs:ää CYP-kansioon, se ylikirjoittaisi korjaukset.
