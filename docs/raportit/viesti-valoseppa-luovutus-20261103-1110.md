# Valosepän luovutus 3.11.2026 klo 11.10

Syy: konteksti (pehmeä raja 28 %). Edellinen: viesti-valoseppa-luovutus-20261103-0940.md (PR 6114; pysyvät työtavat -20261101-2124.md,
-2220.md voimassa). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (B alla = tämä kansio). Python:
`$B/tulivuoret/venv/bin/python -I`. Esikatselu vain JU:n "ESIKATSELU NYT L<n>" -viestillä → `LINJA=<n> zsh <ajo>.zsh`; heti valmistuttua
"VAPAA L<n>" JU:lle. Haarojen yhdistelmä ilman worktreeta: `git merge-tree --write-tree A B` + `git commit-tree` (ks. alla).

## Tehty: KONTAKTIVARJO hahmolle ja kalusteille (PT 09.3x), kaikki JONO.md:ssä
- Worktree **wt/proto-linssiseppa2-kontakti218**, haara **linssiseppa2/kontakti-218** (juna-218 8d18d7047:n päällä, natiivi-backup):
  6b35d0405 (k1) → 32bac65ec (k2) → **64b1db7e4 (k3)**. Ajoversio linssiseppa2/kontakti-218y **ea148b13a** = valo-218y b03eff6ef
  (218y-salit + juna-218) + 64b1db7e4 (PT-kuittausta varten; juna-218:ssa ei ole 218y-saleja).
- Varjostin JuoksuValo.hlsl `JuoksuKontakti(p, n)`: hahmojen pallot (`_JuoksuKontaktiPallo[8]`, Quilez cos·r²/d²) + 16 lähintä
  kalustetta (`_JuoksuKontaktiLaatikko[16]` xz-keskus/puolikoot, `_JuoksuKontaktiAla[16]` alapinta) lattialle (0,35 m reuna, 0,5 m korkeus,
  vain n.y > 0,5); kerrotaan ao:hon JuoksuValaistus*-funktioiden alussa (ambient täysi, aurinko 35 %). JuoksuHahmo.shader: JUOKSU_EI_KONTAKTIA.
- CPU JuoksuV4Maailma.Kontakti.cs: pallot Puyi, takaa-ajaja, 2 lähintä vartijaa (lantio y 0,5 r 0,32, jalat y 0,15 r 0,22, × pallokerroin);
  kalusteet KeraaKalusteet (PaivitaKappaleet:n lopussa) = MeshRendererit + JuoksuKontaktiLaatikot-komponentit; valinta joka ruutu
  (alapinta Puyin lattiatasolla −3…+0,3 m, ≤ 30 m). QA `valo kontakti 0|1 [voima [pallokerroin]]`, `valo kontakti tieto`.
- JuoksuKontaktiLaatikot.cs: Lisaa (avointen huoneiden glb-solmut esineittäin, syvyys 1) ja Saaret (sokkelon rakennusten "runko"+"palkit"
  = yksi verkko → irralliset palat, kärkien hitsaus 1 mm, taustasäie; changchungong 97 palaa → 46 kalustetta). Toisen tiedostoon
  JuoksuSokkeloMaailma.Palatsi.cs +2 riviä (AvoinValmis-rivin edellä ja rakennusten LOD0:n rakennaSolmut-rivin jälkeen).
- Ajot: k1 100716, k2 104533, k3 105845 (B/kontakti218/: sk-k3.txt, ajo-k3.zsh, kooste3.py, pari-k3.jpg, tulos-k3.md).
  k3: kalusteet ja hahmo saavat varjon, ei vaalenemista (py 11,5 % tummui k2-asetuksella). **Pari ja tulos lähetetty PT:lle 11.08**.

## SEURAAVAKSI
1. PT:n vastaus: voima 0,55 vai 0,8 × 1,3 (k2) → oletukset KontaktiVoima/KontaktiPalloK 64b1db7e4:n päälle, uusi koe-merge
   (`T=$(git merge-tree --write-tree b03eff6ef <sha>)`; `printf … | git commit-tree $T -p b03eff6ef -p <sha>`; `git branch -f linssiseppa2/kontakti-218y`).
2. Hinta: GPU (8 palloa + 16 laatikkoa per pikseli) ja CPU (kalustelista ~3 600, valinta joka ruutu) iPadilla – LT/JU:n mittausvuoro
   tai `valo kontakti 0|1` + `ui lasi mittaa` -pari. Jos valinta kallis: jaksota 0,1 s:n välein.
3. Junaan vasta PT:n kuittauksella (yhdistettävä haara linssiseppa2/kontakti-218, ei -218y).

## Worktreet
- wt/proto-linssiseppa2-kontakti218: linssiseppa2/kontakti-218 64b1db7e4 (puhdas). wt/proto-linssiseppa2-tulivuoret: pimennys-aito 53b918b3a.

## LISÄYS 11.15: PT KUITTASI k3 64b1db7e4, valinta 0,8 × 1,3
- Oletukset **836b12440** (KontaktiVoima 0,8, KontaktiPalloK 1,3) linssiseppa2/kontakti-218:ssa; koe-merge kontakti-218y **54d316302**.
- SEURAAVAKSI (PT 11.1x, ennen junaa): GPU- ja ruutuhinta isolla iPadilla, fps ennen/jälkeen (`valo kontakti 0|1` samasta kohdasta,
  salikohta py/pch + piha), JU:n vuorolla → PT. Vasta sitten junaan (haara linssiseppa2/kontakti-218).
