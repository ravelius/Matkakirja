# BLR: Pulun vastaukset (pilviajo 10.10.2026)

- Vastauksia: vaihe 1 = 35 (7 kohtaa × 5), vaihe 2 = 88 (linkkitaso), yhteensä 123.
- Kesto: noin 35 min kokonaisuudessaan (agenttien ajat: V1 4,5 + 1 min, V2 8 + 1 min; rinnakkain enintään 2).
- Agenttien tokenit yhteensä: noin 465 000 (73 000 + 112 000 + 75 000 + 204 000), 4 Sonnet-agenttia, effort low.
- Tarkistuksen virheet: V1 2 (käsitemäärä 1: 6.2, 7.3), V2 7 (6 × käsitemäärä 1, 1 × metalause "ohjeisto" kohdassa Venetsian peruskirja). Kaikki korjattu käsin; lopputulos tarkista-era 0 ja tarkista-valmis 0 virhettä. Yksi varoitus (Ramsarin sopimus, Iran) on historiallinen tosiasia ja jätetty.
- Faktojen pistokoetta (30 vastausta) ei tehty; muistinvaraiset kohdat (mm. V2 #42, 51–54, 70, 81–82) kannattaa tarkistaa omistajan pistokokeessa.
- Poikkeama: lataa-data.sh osoitti vanhaan versioon v625 (404); käytettiin v654. fokuskohteet-blr.json puuttuu ämpäristä. Skriptiä ei muutettu repossa.
- Paketti: pulu-esigenerointi/BLR/BLR.json (7 kohtaa, 35 + 88 vastausta); maat.json päivitetty (BLR-rivi).

## Pistokoekorjaukset 10.10.
Päätoimittajan jatko-ohje (Sisältökirjurin pistokoe) toteutettu sanatarkoilla korjauslauseilla, taivutus sovitettu:
1. Mir, getto ja asuntokäyttö: vastaukset-1-1 (kohta 1.2), korvattu "1944–1956" -väite.
2. Njasvižin entisöinti 2004–2012: kaksi vastausta (vastaukset-1-1: Pohjan suuri sota 2.2 ja entisöinti 5.x); V2-vastauksesta (#25) väite oli jo poistettu aiemmin.
3. Njasviž, alue haltuun 1500-luvun alkupuoliskolla (vastaukset-1-1 kohta 2.1; "vuonna 1533" poistettu, valmistumisvuosi 1604 säilytetty).
4. Braslav, "30 järveä" → "kymmeniä järviä": vastaukset-1-1 (kohta 3.1, myös "Kolmekymmentä järveä" -vitsi), vastaukset-2-1 (Snudy, Strusta ×2, kansallispuisto). Kysymysteksti "Kuinka monta järveä…" jätetty, koska korjattua kysymystä ei annettu; Päätoimittajan harkittavaksi.
5. Gomelin palatsi: vastaukset-1-2 (6.1, 6.2), vastaukset-2-1 (Starov, Rumjantsev, Paskevitš).
6. Minsk, pommitus ja tuhoprosentti: vastaukset-1-2 (7.2), vastaukset-2-1 (Minskin tuho), vastaukset-2-2 (Minsk toisessa maailmansodassa); "24.6.1941" ja "80–90 %" poistettu kaikkialta.
Tarkistus: tarkista-era 0 virhettä (V1 ja V2), tarkista-valmis 0 virhettä (1 varoitus: Iran/Ramsar, historiallinen tosiasia). Paketti BLR.json koottu uudelleen.
