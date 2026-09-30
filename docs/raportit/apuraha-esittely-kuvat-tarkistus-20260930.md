# Apurahan esittelykortin kuvat ja [TARKISTA]-vastaukset (Laitetestaaja, 30.9.2026 klo 11.0x–11.3x)

**Tärkeä rajaus:** TestFlight-sovellusta ei voi ajaa simulaattorissa. Kuvat on otettu iPhone 18 Pro -simulaattorista (1572C658) **puhtaasta asennuksesta** (sovellus poistettu ja asennettu uudelleen samasta
juna-käännöksestä 28def2a6 = 1.0.67-juna; ei paikallisia peilejä; ei aiempaa tallennusta). Kyseessä on Debug/IL2CPP-käännös, ei TF:n App Store -profiili. Kuvat: 1206×2622 PNG, laitteen ruutu.

Kuvat: docs/raportit/kuvat/apuraha-esittely/
1. `01-saapuminen-matkakirja-ateena.png` — saapuminen: isoisän matkakirjan merkintä auki (Ateena, 1873) kartan päällä. Pelaaja ei voi aloittaa Pariisista (aloituskaupungit: Moskova, Istanbul, Ateena, Kairo …), ja Pariisin kartta ei ole ladattuna ennen kuin sinne matkustaa, joten esimerkki on Ateena.
2. `02-euroopan-kartta-kaukaa.png` — Eurooppa kaukaa (rajat, joet, maasto; Kreikka pelimaana korostettuna).
3. `03-nosto-marathon.png` — nosto kuvineen (Marathonin soros, valokuva + kuvateksti).
4. `04-pulu-chat-kysymys-ja-vastaus.png` — Pulu-chat: ehdotettu kysymys ("Miksi Schliemannia pidettiin sekä nerona että varkaana?") ja Livian vastaus.
5. `05-linssi-astronautin-kamera-cupola.png` — Astronautin kamera, Cupola-ikkuna (ISS LIVE).
Kuvissa näkyy pelin oma yläpalkki (raha, päivä) mutta ei kehittäjänappeja; kuva 5 otettu kehittäjätila päällä (katso alla).

## [TARKISTA]-vastaukset
1. **Pulu-chat ilman kehittäjätilaa:** TOIMII. Chat aukeni napauttamalla Pulua, ehdotettu kysymys lähti ja vastaus saapui (n. 20–30 s, pitkä vastaus). Kehittäjätila pois päältä (`kehittäjätila False`). Huom: chat-pyyntö on rajattu 30/IP/vrk; useat arvioijat samasta IP:stä (esim. yhteinen verkko) voivat osua rajaan.
2. **Linssit pelaajalle:** uudella pelaajalla (0 tp) Linssit-lista on TYHJÄ — vain "Ei linssiä" -valinta, `valittavissa` = ei yhtään. Linssit aukeavat pistekynnyksillä 400/800/1400/2200 tp: ihmisen matka, keksinnöt, radio, satelliitti (Astronautin kamera), 1400 tp:ssä lisäksi topografia
   (Linssirekisteri.Kynnyslinssit). Eli arvioija EI näe astronauttien valokuvia tai radiota heti; teksti "Avaa linssi, esimerkiksi astronauttien valokuvat tai maailman radiot" ei toimi ilman etenemistä (Astronautin kamera 2200 tp:n jälkeen, radio 1400 tp:n jälkeen tai vastaava).
   Kuva 5 otettiin kehittäjätilassa, koska linssi ei aukea puhtaalta asennukselta.
3. **Olavinlinna (elävä linna):** EI näy pelaajalle. "Poikkileikkaus" -linssi on kehittäjätilassa; pelaajan Linssit-listassa sitä ei ole. Teksti "ensimmäinen, Olavinlinna, on jo testissä" pitää joko poistaa tai sanoa "sisäisessä testissä".

Muuta: peli-`kehittaja tila` näytti Debug-käännöksessä "päällä" vaikka `kehittaja pois`; TF:ssä tämän ei pitäisi näkyä — varmistettavissa vain TF-käännöksellä. iPadia ei ehditty.

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>
