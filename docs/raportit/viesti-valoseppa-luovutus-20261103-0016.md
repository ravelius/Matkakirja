# Valosepän luovutus 3.11.2026 klo 00.16

Syy: konteksti 25 % (pehmeä raja, kontekstivahti). Edellinen: viesti-valoseppa-luovutus-20261102-2348.md (pysyvät työtavat
-20261101-2124.md ja -2220.md voimassa). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (02.11. 23.50 – 03.11. 00.15).
Python: `_tyo/linssiseppa2/tulivuoret/venv/bin/python` (cv2, numpy).

## TEHTY
- **Etnan lähilauta 19022** – PT 00.0x KUITTASI kokeena (ei junaan): proto **5301a6806** (linssiseppa2/tulivuoret-sarja, worktree
  wt/proto-linssiseppa2-tulivuoret, natiivi-backupissa). 80 km / 4096² (19,5 m/px) kaukolaudan päälle samalla 4 km:n tasolla, saumaton
  kerrostus (kaukolaudan maskissa reikä), punaiset reunapisteet poistettu värin vuodolla. Tulivuoret.cs RakennaLahi, sarja.json `lahi`,
  testisäädin `_SarjaLahi=0`. Skriptit tulivuoret/skriptit/etna-lahi-rek.py, etna_lahi.py, etna-leivo-lahi.py, etna-lahi-kuva.py;
  pari tulivuoret/etna7/etna-pari.jpg. Tila ja jatkoidea: tulivuoret/TYO-SARJA.md (loppu).
  PT: z8 hyvä ja saumaton; z2 ei vakuuta → JATKOIDEA 3D-pylväs/kartio, EI NYT lisätyötä.

## KESKEN: sateen jäännös (PT 00.0x), haara linssiseppa2/sade-218 = 4413cce9b (= ac27f5b03 + koe + palautus)
- **Muurialustan vaalea kiveys (mu3b, `valo sijoita -125 -58 180 2.0`) tummumaan.** Mitattu sade8 (esikatselu-20261103-000721):
  kuivana 255/255/241 (puhki), märkänä 185/175/158, märkä piha 169/171/172 → tummuu, mutta jää vaaleammaksi ja lämpimämmäksi kuin piha.
- Shader-polku selvittämättä: `ui juoksupeli mika 0.2 0.3` → AABB-lähin `v4 sokkelo kk-tausta-1-1 lod0` (Maailma jono 2000/2450);
  KOLMIO ei osunut alustaan (osui sokkelon lattiaan 140 m:ssä). Koe 051e269dd (vaalean albedon lisätummennus JuoksuLattia rivi 853:een)
  → sade9 ei muutosta → palautettu. Seuraavaksi: mika useammasta kohdasta / alustan GameObjectin nimi (esim. valo kohde -komento tai
  Mika-listan kaikki alle 10 m osumat), sitten JuoksuMarkaK sille polulle (JuoksuMaailma rivi 412 kattaa jo valaistut maailmapinnat →
  todennäköisesti leivottu/oma varjostin tai JuoksuLattia rivit 524–525/603). Skenaario sade1/sk-sade9.txt, ajo sade1/ajo9.zsh (sha vaihtoon).
- Sadeääni tarkistettava simulla/laitteella seuraavassa simuvuorossa (esikatselu ei käynnistä silmukoita).

## JONO
1. mu3b yllä → pari (sade 0 | 1) PT:lle.
2. Sen jälkeen luovutuksen -2250 jonosta: Sarytševin ohut vaalea viiva laudan alla (selvittämättä) – tai PT:n uusi määräys; rivi PT:lle.

## Worktreet (proto)
- wt/proto-linssiseppa2-seinat218: linssiseppa2/sade-218 4413cce9b.
- wt/proto-linssiseppa2-tulivuoret: linssiseppa2/tulivuoret-sarja 5301a6806.
