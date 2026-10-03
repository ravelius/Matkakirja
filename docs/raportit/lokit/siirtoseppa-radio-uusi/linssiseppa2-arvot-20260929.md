# Linssiseppä 2 → Siirtoseppä 29.9.2026: radiolinssin uudistuksen arvot webiin
(PÄÄTOIMITTAJA 29.9. klo 06.3x: EI ALOITETA — web ennallaan, Raamattu RADIOLINSSIN UUDISTUS NATIIVISSA voimassa. Arkistoitu tiedoksi.)

- Mastot eivät vilku. Muut hohtavat tasaisesti 0,32; valittu 0,7 + 0,3·VU meripihkana (#ffd0b0 → #ffb050 → #ff8a30). Muiden halo 5 r (ennen 6,8), valitun 12 r. Pieni masto piirretään Keski-kokoisena. Kanavattomat maat pois.
- Lähialue: näkyvyys = 1 − Pehmeä((matka / kameran etäisyys − 0,33) / (0,52 − 0,33)); matka katsepisteestä pintaa pitkin; valittu aina näkyy.
- Aaltorenkaat (VuRenkaat, Mastot.cs): uusi kun VU ≥ 0,10 hitaan keskiarvon (tau 0,6 s) yli; väli ≥ 0,28 s; ääntä (VU > 0,04) → viimeistään 1,6 s välein. Voima 0,35 + 0,65·VU, kasvu 3,2 s käyrällä Nousu, alfa 0,55·voima·(1 − osuus), max 8.
- Horisonttiusva: radion hämärässä liuku × 2,5.
- Viritys: lukituksen häivytys 2,2 s (ennen 0,9). Asemien välissä kohinasilmukka = voimakkuus · rahina viritysäänen rinnalla. Äänet proto-3d/lokit/radio-aanet/: kytkin päälle + lämpeneminen avatessa, lukittuminen lukitushetkellä (vanha otto), kytkin pois sulkiessa.
- Asteikko: näkymän asemat (lähialueen näkyvyys > 0,3), lännestä itään, soiva aina mukana; reunoilla tyhjää, ei kierrä.
- Aseman paikka: kokoelmat/radiot.json kaupunki+lat+lon (#3589); laudan kaupunki kelpaa ≤ 60 km; pelaajan oma kaupunki säilyy.
- UI: maan nimi ja kartuscha piiloon radion ajaksi; Pulu radion yläpuolelle; punainen nappi = virtakytkin, sulkee linssin; Codexin radio /Users/samireivinen/Documents/Codex/2026-09-29/radio-uusi (13 kerrosta, manifest.json): VU-neula kuvassa −45°, asteikko ±62°, nuppi ±135° taajuuden mukaan; radio ≤ 22 % näkymän alasta; iPad-variantti leveys > 700 pt.
- Napakansi ja usva: natiivin varjostinkorjaus, ei koske webiä.

Siirtosepän kartoitus (webin nykytila): ei mastoja (kaupunkinapit radio.js:1766–1875, pallo 1958–1990), ei etäisyyshäivytystä, ei AnalyserNodea (WebKit + CORS, poistettu 5.8.), LUKITUKSEN_HAIVYTYS_S 0.9 (radio.js:212), asteikko NAAPUREITA_PER_PUOLI 4 kiertää (radiosoitin.js:112, 451), kaupunki per maa radio.js:541–590, .maa-pilleri piilossa radio-tilassa (styles.css:6056).
