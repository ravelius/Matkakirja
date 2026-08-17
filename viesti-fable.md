# Viesti Fablelle: M5c valmis (v820) — M5 on kokonaan paketissa

Fable Max raportoi. M5:n kolmas ja viimeinen osa — maalehti ja sisällys —
on siirretty uuteen moduuliin.

## Mitä tehtiin

- **js/maalehti.js (uusi, 756 riviä):** ui.js:stä siirrettiin mallin B
  mukaan kaksi aluetta, yhteensä 11 funktiota: tunnusluvut, mediarivit,
  kielinäyte ja V-Dem-info (naytaMaaTunnusluvut, paivitaMediarivit,
  naytaKieliNappi, naytaVdemInfo) sekä maasivujen piirto
  (piirraMaaEtusivu, piirraMaaNumerotSivu, sisallysTiedot,
  rakennaSisallysLista, piirraVinkkilista, aiheenOtsikko,
  piirraKategoria).
- **js/ui.js:** 13 912 → 13 182 riviä (remontin alusta 19 167 → 13 182,
  **−31,2 %**). Turhentuneet tuonnit (KIELET, MAATIEDOT, LIPPUTIEDOT,
  karttapiste, radioMaalle, avaaLippuikkuna, piirraLeipa,
  poimiNostoVirke) siivottu.
- sw.js SHELL ja MODULES-lista päivitetty: maalehti.js niputetaan ennen
  lehti.js:ää, koska lehti tuo sen piirtäjät (yksisuuntainen riippuvuus,
  ei kehää). lukija.test.mjs:n kommenttipolku päivitetty.

## Ratkaisut katselmointiin

1. **Ei uusia delegaattoreita.** Kaikki ulkoiset kutsujat ovat ui.js ja
   lehti.js, jotka tuovat funktiot suoraan. Savukeauditti (kaikkien
   savukkeiden ui.X-kutsut vs. UI-luokan metodit) ajettu: ei puuttuvia.
2. **naytaTutkiSivu kutsutaan maalehdestä ui-delegaattorin kautta**
   (2 kohtaa rakennaSisallysLista-koodissa) — suora tuonti lehti.js:stä
   tekisi kehän lehti → maalehti → lehti.
3. **Kulttuurinostojen piirto jäi ui.js:ään** (piirraKulttuuriNostot,
   varustaNostonKuva, kaariNostoGalleria ym.) — maalehti kutsuu niitä
   ui-olion kautta. Ne ovat kaupunki- ja maalehden yhteistä koneistoa;
   luonteva koti ratkeaa M6:n visa/luenta-jaon yhteydessä.
4. Dynaaminen `import('./maakayrat.js')` muutti mukana — käyttäytyy
   yhden tiedoston versiossa kuten ennenkin (kohtelias verkkoyhteysrivi).

## Portit

- `node --test tests/*.test.mjs`: **# pass 739 / # fail 0**
- tarkista-kaksoisavaimet: ei kaksoisavaimia
- tarkista-niputus: 108 moduulia, ei törmäyksiä
- build-standalone: OK; savuke-dist 5/6 (tunnettu pöllö-FAIL)
- Savukkeet: maaselain 6/6, lehtiotsikko 17/17, kehittajalehti 4/4,
  lukijan-seuranta 9/9, vuosisaa 8/8; esilataus ja lehtiasettelu
  näyttävät täsmälleen samat neljä vanhaa FAILia kuin
  pre-M4-vertailuajo (todettu M5b:ssä).
- Silmätarkistus Playwrightilla: maalehti aukeaa, sivut kääntyvät,
  kategoriasivu renderöityy oikein, ei sivuvirheitä.

## M5 yhteenveto ja seuraavaksi

M5a+M5b+M5c yhdessä: ui.js keveni 2 280 riviä kolmessa PR:ssä, lehden
koneisto asuu nyt lehti.js:ssä (1 557 r) ja maalehti.js:ssä (756 r).
Suunnitelman valinnainen jatkoaskel (arrival*/tutki*-kenttien kokoaminen
lehtitila-olioksi) on yhä auki — omistajan päätettäväksi.

Seuraavaksi suunnitelmassa **M6**: visa (renderQuiz, renderDuel,
tiimalasi) ja luenta (playDiaryVoice ym.) omiksi moduuleikseen. Aloitan
kun tämä on mainissa.

Muista poistaa viesti-fable.md ennen squashia.
