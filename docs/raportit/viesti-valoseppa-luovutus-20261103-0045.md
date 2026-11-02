# Valosepän luovutus 3.11.2026 klo 00.45

Syy: konteksti 26 % (pehmeä raja, kontekstivahti). Edellinen: viesti-valoseppa-luovutus-20261103-0016.md (pysyvät työtavat
-20261101-2124.md ja -2220.md voimassa). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (03.11. 00.21–00.45).
Python: `_tyo/linssiseppa2/tulivuoret/venv/bin/python` (cv2, numpy).

## TEHTY
- **Sade: muurialustan vaalea kiveys (mu3b)**: PT 00.4x KUITTASI kokeena (ei junaan). Haara linssiseppa2/sade-218 **77a5679a1**
  (worktree wt/proto-linssiseppa2-seinat218, natiivi-backupissa). Alusta on Maailma-varjostimen polkua (verkko ei ole luettava, joten
  mikan KOLMIO ohitti sen). JuoksuValo.hlsl: JuoksuMarkaKA (vaalea kivi tummuu enemmän, × 0,7 asti) ja JuoksuMarkaKiilto (Fresnel × taivas,
  vaakapinnat); _JuoksuMarka.z = sateen voima (Valopohja). JuoksuMaailma: ei korttipuihin eikä MASK-pintoihin (sade10:ssä puissa oli
  harmaita pystyjuovia). Mika listaa 48 osumaa. Mittaus: märkä alusta 154–163, piha 176. Pari sade1/sade11-mu3b.jpg.
- PT:n jatkohuomio (kirjattu, ei tehty): sateessa hahmon varjo on yhä selvä ja terävä; pilvisellä sään pitäisi poistaa se lähes kokonaan.
- PT 00.3x: mergetty worktree valoseppa-luovutus-20261102-1740 poistettu.

## KESKEN: Sarytševin ohut vaalea viiva (tulivuoret, haara linssiseppa2/tulivuoret-sarja = d783fb93d)
- d783fb93d = 5301a6806 + testitila `tulivuori _SarjaUv=1|2|3` (1 = frac(uv) + floor(uv.x), 2 = alfa/maski/kansi, 3 = floor(uv.y);
  asetetaan livenä ilman uudelleenrakennusta). Testitila on vain koetta varten, eikä se mene junaan.
- Todettu: viiva näkyy vain laudan kanssa (viiva1: v6:ssa ja ilman tulivuorta ei). Se näkyy myös ilman kantta, mutta ei peitolla 0
  (viiva2). Tekstuureissa (kuvat, maski, kansi, laatat) ei ole viivoja (skriptit/etsi-viiva.py). viiva3 (esikatselu-20261103-004225):
  viiva osuu **uv.y = 1 -rajalle** (kuvaneliön yläreuna). Rajan molemmin puolin alfa on 1 ja maski 0, eli viiva on kannen alueella.
  Raja ei ole verkon solun reuna.
- Seuraavaksi TulivuoriSarja.shaderissa: (a) kuvien ja maskin näyte vain, kun sisalla > 0 (NaN/Inf × 0?), tai clamp uv:hen,
  (b) kuvien wrapMode Clamp (metat), (c) koe yksi kerrallaan viiva3-skenaariolla (`viiva3/sk-viiva3.txt`, ajo `viiva3/ajo.zsh`, sha vaihtoon).
  Vertailu: `skriptit/kontrasti.py <png> <ulos> 0.2 0.0 0.75 0.2` (ylipäästö). Sitten pari PT:lle.
- HUOM ajoskripteistä: E-polku luetaan aina oman ajon lokista (ajo9/ajo11 lukivat vahingossa vanhan lokin).

## JONO
1. Sarytševin viiva yllä → pari PT:lle.
2. Sateen hahmon varjo heikoksi ja pehmeäksi sateen voiman mukaan (PT:n huomio), jos PT määrää; muuten PT:n uusi määräys.

## Worktreet (proto)
- wt/proto-linssiseppa2-seinat218: linssiseppa2/sade-218 77a5679a1.
- wt/proto-linssiseppa2-tulivuoret: linssiseppa2/tulivuoret-sarja d783fb93d (natiivi-backupissa).
