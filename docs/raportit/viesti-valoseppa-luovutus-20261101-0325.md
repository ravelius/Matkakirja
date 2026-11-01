# Valosepän luovutus 1.11.2026 klo 03.25

Syy: konteksti 27 % (pehmeä raja). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 02.4x–03.2x).
Edellinen: viesti-valoseppa-luovutus-20261031-2348.md (työtavat voimassa). Proto-repo on vain paikallinen.

## VALMISTA
- **Valopaketti piha 06 = o3**: proto `linssiseppa2/k17-piha06-216` **114fcc7cf** (juna-216 513998a40 + koe67 + k17 + rappaus
  + sumu pois + tausta-v89d + rakennukset-v90 + o3:n lattia-arvot oletuksiksi: KiiltoLattia 0,25, JuoksuLaattaSavy 0,93/0,95/1,0).
  k06u ilman komentoja: p5 67, muuri 150/64/57, lattia 197/200, puhki 5,5 %. **PT ja KK kuittasivat suunnan reitille (yölupa).**
  Runkoon vasta reitin koosteiden ja KK:n kuittauksen jälkeen. Taulukko `_tyo/linssiseppa2/k06u-tulos.md`.
- **003c9fd38** (sama haara): QA `valo paivataivas-polku <url/>|0` (päivätaivaan kansio ämpärin sijaan).
- Taivaan 2 palan koe (k06v): sauma OK (PT katsoi), terävyys 760 → 843 (tavoite 1400; 4096 px/360° liian harva).
  **PT 03.5x: 8192-ruudukko, 12 palaa** → Codex-tilaus postilaatikossa **9cf6e7062** (a1–a6 y 1161–2048, b1–b6 y 364–1251,
  x0 0/1366/…/6830, kääre). `_tyo/linssiseppa2/taivas-v3-koe-tulos.md`.

## AVOIMET (järjestys)
1. **Reitin valo**: LAV:n leivonta v4 (koko reitti, aurinko 45°/318°, polvi 0,6/0,3, tausta-v90, rakennukset-v91 uudella
   solu_uv1:llä, osasarja-v7) ajossa (`_tyo/linnanrakentaja/leivonta-216/uusinta/ajo-leivonta-v4.log`) → vienti
   `_valmiit/juoksupeli-kk-lavastaja-leivonta-v4-vienti-<pvm>`. Sitten: uusi juuri (juuri-k06f + v4:n kansiot nimillä
   kielletty-tausta-v89d / kielletty-rakennukset-v90 jne.) → PK:n c4-skenaario (`_tyo/linssiseppa2/reitti-v89/sk-v89.txt`,
   mallit-rivi uuteen juureen) rungolla 513998a40 ja valopaketilla 114fcc7cf → koosteet 0/35/70 % → PT → KK.
2. **Räystäiden alusvarjot (PT:n kohta 2)**: `_tyo/linssiseppa2/raystas-tulos.md`. Rakennusten UV1-atlas oli tyhjä (LAV korjasi
   solu_uv1:llä, nollat 81 % → 8 %), mutta k06w:ssä julkisivu ei muuttunut: varjopuolen leivottu valo ~0 (mediaani 0,021) →
   täyttö on tasainen (JuoksuValo.hlsl 184–185). Selvitä, onko 0,021 oikein (LAV:lta atlaksen kuva), muuten täyttö
   leivonnan taivasnäkyvyydellä kerrottuna → koe → o3-pari.
3. **Taivas**: kun Codexin 12 palaa saapuu, toteuta palojen ristihäivytys koodissa (vaaka + pysty + kääre; 8192 × 2048
   yläpuolisko) ja **varmista iPadin GPU-muisti ennen runkoehdotusta** (PT): PNG ladataan nyt pakkaamattomana (Kuva()),
   8192 × 2048 RGBA = 64 Mt + mip → tarvitaan pakkaus tai palat erillisinä tekstuureina.

## Työtavat (lisäykset)
- Ajot: `_tyo/linssiseppa2/skriptit-20261031/pari-k06u.zsh` (oletukset) / `pari-k06v.zsh` (taivas) / `pari-k06w.zsh` (juuri-k06w).
- Työkalut: `_tyo/linssiseppa2/tyokalut/keskipiste.py <glb>` (leivotun valon nollat kolmioittain + UV1-ala), `nollat.py`.
- _valmiit-kansioita siirtyy NAS:lle (JU palauttaa; rivi JU:lle local_06f8c680-4618-42bd-a730-9b6a3e17e0b7).
- Levyraja ajoille 82 Gi (skripti odottaa enintään 60 min).
