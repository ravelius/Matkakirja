# Pohjapoltto 2026-09-22-pohja (isobaatit) — LÄHTI 21.9. klo 18.35 (Julkaisija: poltto voi alkaa)

Resepti: pohja kuten 21.9. mutta `--syvyyskayrat 200,1000,3000 --syvyyskohina lauta` portaiden tilalla
(muu ennallaan: joet pohjaan, vesiviivoitus tumma, litistys 0,8, GSHHG-ranta
rantatasolla, rannikon harvennus 0,004, laatu 0,9, patina kevyt). Versiot:
pohja 2026-09-22-pohja (UUSI), viivat 2026-09-22-viivat (UUSI, sama sisältö — skripti vaatii), ranta 2026-09-21-ranta,
nostot 2026-09-22-nostot (UUSI, sama sisältö), nimiöt 2026-09-21f-nimiot, pallotunniste 20260922a.
Koodi: haara karttaseppa-maakuntavedos (--syvyyskayrat) on oltava mergetty
työhaaraan ennen ajoa (tai ajo tästä worktreestä).

1. aja-1.sh: pohja z0–z8 + viivat + ranta, ~50 min (114 shardia, 16 ydintä),
   vienti ämpäriin shardeittain.
2. aja-2.sh: nostot + nimiöt + luettelo + pallon sarja 20260922a, ~50 min;
   luettelo jää vientikansioon (--ei-luettelovientia).
3. Julkaisija: js/pallo.js PALLO_LAATTAVERSIO '2026-09-22-pohja',
   PALLO_LAATTATUNNISTE '20260922a' → versio mainiin.
4. Luettelo ämpäriin VASTA kun osoitin on mainissa (edellinen luettelo talteen).

CI-tauko: 2 h (vaiheet 1–2 peräkkäin), sovitaan Julkaisijan kanssa.

Lisäys 21.9. ilta: pohjalippu `--koristeet assets/koristeet/meri/pallo-koristeet.json` (merikoristeet pohjan kalusteina, haara karttaseppa-merikoristeet 83429d8c mergetty työhaaraan 81394252). Ei erillistä nimiö-/pallosarjaerää.

## Seuraava nimiöpoltto: versio h (CHE-siirrot) — EI vielä ajettu (omistaja 22.9.2026)

Nimistö `nimiot-poltto-5.json` (222 riviä = poltto-4 + viisi CHE-siirtoa, muu identtinen):
Luzern 8,108/47,068 → 8,05/46,98 (pois Kapellbrücke-noston päältä, Entlebuchin lohko);
Valais 7,586/46,21 → 8,0/46,27 (pois Matterhorn/Bernhardilainen-nostojen välistä, Rhônen laakso);
St. Gallen 9,283/47,252 → 9,05/47,17 (Toggenburg, tilaa Appenzelleille);
Appenzell Ausserrhoden 9,352/47,367 → 9,25/47,31 (pois Stiftsbibliothek-noston päältä);
Appenzell Innerrhoden 9,402/47,32 → 9,36/47,25 (erilleen Ausserrhodenista ja Vorarlbergista).
Ajo: aja-2.sh `--nimioversio 2026-09-22h-nimiot --nimiot $U/nimiot-poltto-5.json` (~1 min nimiöt +
luettelo), sitten luettelo ämpäriin vie_luettelo-kaavalla. Tarkista vedoksella ennen vientiä:
`node docs/raportit/kaappaukset/maakuntavedos-20260921/vedos4/kokoa-alue.mjs 8 5.6,45.6,10.9,48.0 <ulos.jpg> CHE`
(vaihda kokoa-alue.mjs:n nimiökansio h-versioon). KASIN-taulukko: vedos4/tee-nykyalueet.mjs.
