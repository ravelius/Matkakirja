# Savukierros: build 17 (juna/b13 d04841a0, käännös 6fd19114), iPhone + iPad

26.9.2026 03.5x–04.1x. PASS-commit ehdotus: **d04841a0** (juna/b13; käännös 6fd19114) —
HUOM. yksi FAIL (lepopiirto) ja yksi osittainen (143), ks. alla. Kehittäjätila
päällä, kuvat pysäytyskuvia (ruutu).

## PASS
- **Kylmä käynnistys → aloitusnäyttö → Uusi matka → valinta (82):** valintanäkymässä
  vain Lontoo (nasta) + Moskova/Istanbul/Ateena/Kairo, ei muita pisteitä/nimiä. Kuvat 1–2.
- **Aloituslento:** kone kuvassa, Ohita näkyy koko ajan, ~12–13 s verhoon "ATEENA · Päivä 1/80". Kuva 3.
- **Ateena + nostosymbolit webin mukaan (125):** ^ vuoret, jalanjäljet, tähti; postikortti auki. Kuva 4.
- **Postikortti 146 / nostot 130–139:** nimiön napautus (Patras) → kortti avautuu HETI (pysäytyskuva
  heti napautuksesta), iso kuva, ei (x)-nappia, vaalea kortti + "LISÄÄ". Kuva 5.
- **Ihmisen matka II (`linssi ihmisen-matka-2`):** soitin ⏮ ⏸ ⏭ palkissa, ☰-valikko:
  Aloita alusta / Kertoja / Taustamusiikki / Tekstitys (pois) — CC nyt ☰:ssa. Kuva 6.
- **Lämpö/fps:** levossa fps=30, lepo.p50=33,3 ms; `ruutu` kirjautuu nyt "ok" (VIRHE-vika korjattu).
- **Löydös 141 (iPad, kartussi kiinni, BIH):** nimi 30,4 → **26,8 pt** (0,88), alarivi 16 → **14,1 pt**
  (0,88), nimen laatikon korkeus 35,5 → 31,5 (0,89) — kuten Natiivi-UI odotti. Kuva 7.
- **Maakunnat iPad:** vain oma maa (Britannia), "Pois" ensimmäisenä; Englanti värittää, Pois poistaa. Kuvat 9–11.

- **Rajat 126–128 (iPad, kuva 11):** rantaviiva pois; ainoa näkyvä raja on maa–maa (Pohjois-Irlanti–Irlanti), ei rantaviivaa saarten ympärillä — PASS. Maakuntien oletusrajat näkyvät kun maakunta valitaan (Englanti, kuva 10).

## FAIL / avoinna
1. **Lepopiirto (lämpövartija) FAIL:** levossa (taysi=0, 80 s + 65 s) `paikallaan`=0, `piirretty`=`kehyksia`
   (150/150; b16: 2–3/151). `ruutu`: "tila Lepo (ui)", ei "Paikallaan". Vaatimus ≤ 3/150 ei täyty.
   Mahdollinen syy: "jatkuva idle-syke" (Natiiviseppä) pitää piirtoa käynnissä — Natiiviseppä/Pelikoodari
   ratkaisevat onko tarkoituksellista (silloin vartijaehto päivitettävä).
2. **Löydös 143 osittain:** `ui kartuscha BIH auki` (iPad): lippu + radio ylärivillä ✓, palkit
   porrastuvat ✓, mutta nimi rivittyy KOLMELLE riville — "BOSNIA JA / HERTSEGOVIN / A" (sana katkeaa kesken).
   Odotus 2 riviä. Kuva 8.
3. **Uudet vartijat eivät vielä junassa:** `nostokuvat GRC 60` ja `vieritys [koe]` → "tuntematon
   komento" (pelikoodari/loydos149 ei mukana d04841a0:ssa). Ajetaan kun haara junassa.

## Ei ajettu
iPadin CC-kytkin (☰ Tekstitys) ja iPadin soitin — iPhonella ☰ todettu; iPad ei erikseen.

## Kuvat
`docs/raportit/kaappaukset/savukierros-b17-20260926/` (1–11). Simulaattorit sammutettu.
