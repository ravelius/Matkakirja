# Lavastajan luovutus 2.11.2026 (tiivis) — LUE TÄMÄ, ÄLÄ VANHOJA

Edellinen viesti-lavastaja-luovutus-20261102-1755.md on vain viite. Uudet lisäykset TÄHÄN.

## Rooli ja tapa
- Lavastaja: palatsin rakennukset, tausta, esto, lähikoristeet. Työ /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/, paketit proto-3d/_valmiit/.
  Viestit send_messagella id:llä (osoitekirja); PT:lle ≤ 3 riviä. Kulku: PT nimeää → tee → pari PT:lle → kuittaus → paketit → JU-vientipyyntö
  (local_06f8c680-4618-42bd-a730-9b6a3e17e0b7) + PK-kytkentärivi (local_91a1bc27-6870-46aa-9886-66fd33b68880).
- Esto leivotaan worktreessä /Users/Shared/Claude/wt/proto-lavastaja-esto-2f (zsh esto-vNN.zsh; "1/1 läpi"). Pakettiin LAHTEET.md + SHA256SUMS (v35:n mallina).
- Vientiskriptit käyttävät hakemistoja -vienti-20261102: jos edellinen paketti tehtiin eri päivänä, korjaa A=/polut skriptissä.

## Tila 2.11. 21.0x
| asia | tila |
|---|---|
| 承乾宫 c3 nokareet (kuori_c 3a-v4: seinän alaosa y < 1,2 pois, sokkeli oviaukosta maahan) | PT kuittasi, mukana rakennukset-v114:ssä |
| 钟粹宫 z3 (sisatilat-3b/, LUE.md) | PT kuittasi; VIETY JU:lle 21.0x: tausta-v110 (fc97e844da9d), rakennukset-v114 (0dbdcfd73ad5), esto v35 (2a63953384cf, = v34); PK-rivi lähetetty → varmista vienti + kytkentä |
| VS:n tarkistus c3:sta | OK (pelin valossa ei mustia viiruja) |

## 钟粹宫 (sisatilat-3b) lyhyesti
- Halli laattojen 2-3 ja 2-4 rajalla (osin samat kolmiot kummassakin → kuori_z.py ottaa 2-4:stä vain uudet; tausta_pois_z poistaa molemmista). kehys_z.py: KULMA 0,2°, PAIKKA = hallin keskipiste, LATTIA 0,36.
- 6 jännettä, keskipylväs akselilla → 3 huonetta 2+2+2, keskipylväs pois ovilta, ovet 1,5 m (ikkunoiden välissä). Lava C01 3,2 m ja sermi 3,6 m (reittikaista ≥ 1,46 m).
- Reitti merkinta_z.py: puutarha-kuja-338-3-pohjoinen kulma → u 27,0 → etupiha w 1,0 → pääovi → u 11,6 lavan länsipuolelta → sermin takaa w 9,59 → takaovi → w 12,0 → u 27,0 → juhlasali-kuja-338-4-etela kulma.
- z-v1/: kokoa.zsh (pipefail; VAIHE=kokoa ei leivo, mutta tarkista.zsh vaatii leivotun), valmistele.zsh, leivo.zsh, kuvapari.zsh, tausta-v110.zsh, rakennukset-v114.zsh, esto-v35.zsh.
- Opit: valokuva_v.py vaatii leivotun glb:n (valo_rgbm); sisa_z:n vakiorivejä muokatessa varo saman rivin ';'-jatkoja (SERMI_H putosi kerran).

## SEURAAVAKSI (PT 20.5x)
1. Varmista JU:n vienti ja PK:n kytkentä (v110/v114/v35).
2. 永和宫 (sitten 景阳宫): seuraava-sali/hallit.py + reittikartta.png; tee sisatilat-3c/ 3b:n mallilla (kopioi tyokalut/*_z.py, uusi kehys: OSM-pohja → seinat_z.py-analyysi, laatat, jännemäärä,
   keskipylväs?, ikkunat → ovet; reitti lähimmistä kujaliitoksista, reittiesteet_z.py). Pohjana tausta-v110 ja rk = z-v1/rk + z3 leivottu.
- 21.0x 钟粹宫 KYTKETTY: PK 7127ca0c3 (797/797, umpikujia 0). JU:n vientikuittaus odottaa.
