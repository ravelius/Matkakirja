# Julkaisija: luovutus 2.11.2026 klo 07.15 (Macin kello) – konteksti 25 %

Rooli: Julkaisija (JU). Työkalut /Users/Shared/Claude/julkaisija-tyokalut/. Edellinen: viesti-julkaisija-luovutus-20261101-1100.md.

## Kesken / odottaa
- **rakennukset-v94** (LAV bugi 14, juna 218, PT:n pysyvä kuittaus): vie-paketti.sh käynnistetty 07.1x
  (_valmiit/juoksupeli-kk-lavastaja-rakennukset-v94-vienti-20261102, SHA256SUMS dc517ef5e9c9, 546 tiedostoa → kielletty-rakennukset-v94/).
  Tarkista `tail -1 julkaisija-tyokalut/vie-paketti.log`: jos "viety 546 … virheitä 0" → "VIETY" PK:lle (local_91a1bc27-6870-46aa-9886-66fd33b68880),
  NS:lle ja LAV:lle + asemataulun Juna 218 -rivi. Jos kesken jäi, aja uudelleen (luettelo ohittaa viedyt, 412 = jo ämpärissä).
- Ei muita ajoja. Simut vapaat, Unity-esikatselu vapaa (PK:n tallenne-218e valmis).
- Juna 218: LAV:n korjauspaketit tulevat NS:n ja LAV:n kautta (PT:n pysyvä kuittaus) → vie heti, kuittaa PK + NS (+ LAV). TF 218 vasta NS:n
  lukitusviestistä + PT:n/omistajan luvasta.

## Tehty 1.–2.11. (tämä vuoro)
- **TF 216** 1.11.: runko b1909a35b (NS), muutosloki #5902 (7b410b90d). iOS TF 41343502518 → sisäinen 21.59 → ulkoinen + beta-arvio 22.07 →
  vanhennus 215. Mac-TF 41344522035 (mac-tf-216.zsh). Ennen TF:ää Pariisin laatat: KS:n hill-paketti juureen 21.39 (korvasi 64-sarjan, haitaton)
  ja NS:n versiokansio piirroskartta/pariisi/hill-20261101/ 21.43 (koodi hakee tästä).
- **TF 217** 2.11. (omistajan yölupa 1.11. 23.29, PR 5920; PT 03.4x): runko 60bd5c356 (tagi natiiviseppa/runko-217-tf), muutosloki #5935
  (eb2b5dbf5). iOS TF 41374197778 → sisäinen 04.07 → ulkoinen + beta-arvio 04.14 → vanhennus 216 (04.15). Mac-TF 41374949327 (mac-tf-217.zsh).
- Viennit (vie-paketti.sh, kaikki virheitä 0): rakennukset-v92/v93, tausta-v91…v98, c2-v32/v33/v34, muurikate-v38, osamallit791-v7…v10.
- Vuorot: NUI (iPad13), KS (iPad11), PK:n esikatselut peitto-218, sk-218a/b, tallenne-218d/e – kaikki VAPAA.

## OPIT
- TF-ketju: tf-kaynnista.sh <N> <proto-sha> <muutosloki-merge> + muistiajo-<N>.txt ("OHITETTU <peruste> JU", kun omistaja: ilman testejä).
  Muutosloki: tools/vienti/muutosloki-natiivi.json uusi rivi ylös (oma worktree + PR, ei checkejä → merge). Mac: mac-tf-<N>.zsh (sed edellisestä).
- vie-paketti.sh ei ylikirjoita: saman nimen korvaus vaatii oman skriptin (vie-pariisi-hill-v2.zsh) – parempi: versiokansio (NS:n tapa).
- vie-paketti hylkää, jos LAHTEET.md ei mainitse lisenssiä → pyydä tekijää lisäämään rivi (SHA256SUMS ei muutu).
- Viestiraja: 10 SendMessagea → varakanava mcp__ccd_session_mgmt__send_message (CLAUDE.md), toimii heti.
- NS ja LAV pyytävät usein saman paketin kahdesti: tarkista vie-paketti.log ennen uutta ajoa.
