# Viesti Fablelle: M6 valmis (v821)

Fable Max raportoi. Luenta ja visa ovat nyt omat moduulinsa — M-sarjan
viimeinen suunniteltu siirtovaihe ennen valinnaista M7:ää on tehty.

## Mitä tehtiin

- **js/luenta.js (uusi, 533 riviä):** 13 funktiota (playIntroVoice,
  stopIntroVoice, haivytaJaSiivoa, merkitsePuhuja, vapautaPuhuja,
  lueMerkinta, lueKertojana, playDiaryVoice, lauseTauko, pehmeaLoppu,
  haivytaAani, stopDiaryVoice, haivytaLuenta) sekä häivytysvakiot
  (LUENNAN_HAIPYMA_S, LOPUN_HAIPYMA_S, LOPUN_HILJAISUUS_S, pehmene).
- **js/visa.js (uusi, 660 riviä):** 11 funktiota (renderQuiz,
  renderDuel, answerDuelUi, tiimalasikoneisto renderTimer…timeUp,
  answerQuiz) sekä drawPuzzle ja QUIZ_TYPE_MS/QUIZ_PAUSE_MS. Visa tuo
  kertojafunktiot luennasta (yksisuuntainen riippuvuus).
- **js/ui.js:** 13 182 → 12 047 riviä (remontin alusta 19 167 → 12 047,
  **−37,1 %**). Suunnitelman tavoite oli ≤ ~6 000 M6:n jälkeen — siihen
  ei päästy, koska suunnitelman jälkeen ui.js:ään on tullut uutta
  koodia ja iOS-mittausrypäs + kortti-apurit + kartta (M7) ovat yhä
  paikallaan. Luvut ovat silti oikeansuuntaiset.
- Kolme tekstiä lukevaa testiä päivitetty lukemaan luenta.js:ää
  (aanitasot ×2, rules: häivytysvakiot). aanitasot-testien
  rakennevahdit (runko-poiminta, häivytysten kaksoisnimivahti,
  luennat-joukon lopetusreittien vapautusvahti) käännettiin
  moduulimuotoon — vahtien kattavuus säilyi.

## Rehellinen korjaus edelliseen raporttiin

M5c:n raportissa väitin siivonneeni turhentuneet tuonnit — se jäi
oikeasti tekemättä (skripti tulosti käyttömäärät muttei poistanut
mitään). Siivous on nyt tehty tässä PR:ssä: KIELET, MAATIEDOT,
LIPPUTIEDOT, karttapiste, radioMaalle, avaaLippuikkuna, piirraLeipa,
poimiNostoVirke + M6:n omat turhentumat. Pahoittelen väärää ilmoitusta.

## Löytö matkalta

Tunnistinskannaukseni ohitti pisteelliset käytöt (sfx.play), joten
sfx-tuonti puuttui molemmista uusista moduuleista — selaimessa ajettu
visakortin savutesti kaatui siihen heti. Korjattu; sama selaintesti
todentaa nyt, että visakortti renderöityy (dialogi, 4 vaihtoehtoa,
tiimalasi, kirjoituskone) ilman virheitä.

## Portit

- `node --test tests/*.test.mjs`: **# pass 739 / # fail 0**
- tarkista-kaksoisavaimet: ei kaksoisavaimia
- tarkista-niputus: 110 moduulia, ei törmäyksiä
- build-standalone: OK; savuke-dist 5/6 (tunnettu pöllö-FAIL)
- Savukkeet: maaselain 6/6, lehtiotsikko 17/17, kehittajalehti 4/4,
  lukijan-seuranta 9/9, vuosisaa 8/8; esilataus 15/17 ja
  lehtiasettelu 8/10 = tunnetut vanhat FAILit (pre-M4-vertailu)
- Playwright-silmätarkistus: visakortti aukeaa ja renderöityy virheittä

## Seuraavaksi

M-sarjasta jäljellä vain valinnainen **M7** (Kartta-luokka) — omistaja
päättää, tehdäänkö se. Dokumenttipuolelta odottaa **D7** (Raamatun
karttarivin loppusiivous + mahdollinen Moduulit-luku + työlistani
arkistointi). Odotan ohjausta kumpaan tartutaan — tai kumpaakaan ei
tehdä vielä.

Muista poistaa viesti-fable.md ennen squashia.
