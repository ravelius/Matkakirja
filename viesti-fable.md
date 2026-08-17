# Fable max → päätoimittaja: M4 valmis katselmoitavaksi

17.8.2026, haara `claude/fable-max-m4` (O6-ilmoituksesi jälkeen).

## M4 (v817): opas ja nähtävyydet omiksi moduuleiksi

- UUSI js/nahtavyydet.js (1 246 r): kohdekartta piirroskohteineen,
  nähtävyysdialogi paluupinoineen, Matkailijalle-paneeli,
  karusellit ja kuva-apurit.
- UUSI js/opas.js (428 r): Matkailijan oppaan jaksotaitto,
  laatikot, säägraafi, kainalot.
- ui.js: 17 071 → 15 462 riviä (lähtötasosta 19 167 → −19,3 %).
- Ristikytkös ratkaistu ilman tuontisykliä: opas tuo kuva-apurit
  nähtävyyksistä (yksisuuntainen), ja nähtävyysdialogin opastaitto
  kulkee ui.taitaOpas-delegaattorin kautta (ainoa delegaattori,
  perustelu kommentissa).
- ui-parametrin tarve laskettiin transitiivisesti: 14 funktiota
  saa ui:n, 8 on puhtaita.
- KYYTIMUUTOS LUVATUSTI: 45 koodikommenttipolkua päivitetty
  (docs/tutki-aiheet.md → moduulit/kaupunkilehti tai maalehti;
  docs/linssit-suunnitelma.md → moduulit/linssit) — kuolleita
  polkuja ei ole enää yhtään js-kansiossa.

## Todennus (kuuma alue → tavallista raskaampi)

1. 739/739 · kaksoisavaimet · niputusvartija (106 moduulia) ·
   standalone käynnistyy (5/6, vanha pöllö-FAIL).
2. VISUAALINEN: Playwright-ajolla Pariisin saapuminen →
   Matkailijalle-paneeli piirtyy → Matkaopas aukeaa nauhasta —
   kaappaus KATSOTTU: jaksotaitto, kainalotaulu tähtineen,
   säägraafi käyrineen ja lämmin paperi kunnossa. (Kuvat tyhjiä
   kontissa — R2/Commons estetty — ei koodivika.)
3. savuke-karttazoom: LÖYSI AIDON REGRESSION — muunnoksen jäljiltä
   jäi yksi paljas `this` (kytkeKarttaZoom-kutsu), joka rikkoi
   tuplanapautuksen. KORJATTU; uusinta-ajo 21 ok + vain tunnettu
   vastaskaalaus-EI. Huomio: savuke on kontissa EPÄVAKAA
   (kuvalataukset estetty) — puhdas main antoi samassa ympäristössä
   21 ok + VIISI EI-riviä ja kaatui eri kohdassa eri ajoilla, eli
   haara on vähintään baseline-tasolla. Savukkeen vakautus kirjattu
   jo aiemmin työjonoosi.

## Seuraavaksi

M5 (lehtikoneisto, suurin askel — jaan 2–3 PR:ään) alkaa kun M4
on mainissa. M6–M7 sen perään; D7 vasta M-sarjan lopussa. Muista
poistaa tämä tiedosto ennen squashia.
