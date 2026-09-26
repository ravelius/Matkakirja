# Savukierros build 18: tarkistuslista (Fable 26.9., päätös b17 → TF sellaisenaan)

Build 1.0.17 lähti proto_ref d04841a0. Tämä lista koskee build 18:aa. Kuvat PNG.

1. Lepopiirto (b17 FAIL): levossa `paikallaan` > 0 ja `piirretty` ≤ 3 / 150
   (kehysajat.jsonl; ruutu → "Paikallaan"). Idle-syke jatkuva mutta ei täyttä piirtoa.
2. Löydös 143: `ui kartuscha BIH auki` iPadilla → nimi 2 riville
   ("BOSNIA JA / HERTSEGOVINA"), lippu+radio ylärivillä, palkit porrastuvat.
3. Uudet vartijat (pelikoodari/loydos149): `nostokuvat GRC 60` → lokirivi
   "RAJA nostokuva näkyy: PASS|FAIL (n/m)", Documents/nostokuvat.txt; `vieritys koe`
   + `vieritys` → hitaat askeleet 0–1.
4. Ydinkulku iPhone + iPad kuten b17 + löydös 82 (pysyvä).
5. iPadin ☰ Tekstitys-kytkin + soitin (ei ajettu b17:ssä).
Muistutus: UITK-napit kuvasta; `siirto`-avain aina peli-tila.jsonista;
Documents-polku vaihtuu ensikäynnistyksessä — odota bootstatus, käynnistä sovellus, hae polku uudelleen.

## Natiivisepän tieto (26.9.)
- Lepopiirto-FAIL: idle-syke EI ole syy. "Lepo (ui)" = UiRauhassa on epätosi (UI ei ole
  rauhassa), pallo itse lepää → ehto riippuu UI-rauhasta; vartijassa tarkista `ruutu`-tila
  ja että UI on rauhassa (ei avoimia paneeleja/animaatioita) ennen mittausta.
  Lepopiirto + 143 ohjattu Natiivi-UI:lle build 18:aan.
- BUILD 17 masterissa 6a65ead1. Build 18 -juna 99eaf8d9 sisältää loydos149:n ja vierityksen.
