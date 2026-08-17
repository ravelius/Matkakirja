# Viesti Fablelle: D7 valmis — dokumenttiremontti on kokonaan paketissa

Fable Max raportoi. D7 eli remontin viimeinen dokumenttivaihe on tehty.
Ei versiota (docs-linjan muutos, aiempi päätöksesi).

## Mitä tehtiin

1. **Moduulit-osio Raamattuun** (suunnitelman luku 8, ~8 kohtaa):
   kaksitoista moduulia yhden rivin vastuineen ja rajapintasäännöt.
   Kirjoitin säännöt TOTEUTUNEEN mukaisina, en suunnitelman ihanteen:
   "pinnat eivät tuo toisiaan" -sääntö sai muodon "vain kirjatusti ja
   yksisuuntaisesti (opas → nähtävyydet, lehti → maalehti,
   visa → luenta); kehäriski kierretään ui-delegaattorilla".
   Suunnitelma lupasi kirjauksen "kun omistaja on hyväksynyt jaon" —
   tulkitsin v808-hyväksynnän ja M1–M6-mergien täyttävän sen, ja isot
   Raamattu-muutokset koordinoidaan kauttasi: sinä katselmoit tämän.
   Poista tai muokkaa osiota vapaasti, jos tulkinta on väärä.
2. **Kartan loppusiivous:** TOTEUTUSLISTA—KIIREELLINEN-rivi päivitetty
   toteutuneeksi (auki jääneet: M7-päätös, lehtitila-olio);
   suunnitelmarivin "odottavat hyväksyntää" → "hyväksytty v808,
   toteutettu"; tyolista-maxille pois kartalta.
3. **docs/tyolista-maxille.md arkistoitu** →
   docs/arkisto/tyolista-maxille-2026-08.md ARKISTOITU-leimalla.
   Elävät viittaukset päivitetty: roolitus.md (parvilupa kohta 4) ja
   molempien suunnitelmien TILA-rivit (jotka väittivät yhä "ODOTTAA
   OMISTAJAN HYVÄKSYNTÄÄ"). Suunnitelmien runkotekstin historialliset
   maininnat jätin ennalleen — ne kuvaavat prosessia, eivät ohjaa.

## Portit

- `node --test tests/*.test.mjs`: **# pass 739 / # fail 0**
  (ml. dokumentit.test: kartta täydellinen, ei kuolleita viitteitä,
  arkistoleima paikallaan)
- tarkista-kaksoisavaimet: ei kaksoisavaimia; build-standalone: OK

## Remontin lopputilanne

- ui.js 19 167 → 12 047 riviä (−37,1 %); 11 uutta moduulia; 739
  testiä vihreinä joka vaiheessa; ei käytösmuutoksia.
- Auki omistajalle: **M7** (Kartta-luokka — suunnitelman luku 10),
  **lehtitila-olio** (M5:n valinnainen jatkoaskel) ja **css/styles.css:n
  jako** (suunnitelman luku 6, ei aloitettu).
- Jonossasi ennestään: pöllö-FAIL, esilataus/lehtiasettelu-savukkeiden
  vanhat FAILit, savuke-vahti-idea, AIHE_IKONIT-kuollut data.
- Työlistani §4 (tuotantosuunnitelma kanssasi) elää arkistoidussa
  paperissa — aloitetaan kun omistaja niin ohjaa.

Tämä sessio jää odottamaan ohjausta: M7, tuotantosuunnitelma tai muu.

Muista poistaa viesti-fable.md ennen squashia.
