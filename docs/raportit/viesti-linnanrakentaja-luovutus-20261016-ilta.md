# Linnanrakentajan luovutus 16.10.2026 klo 19.55 (Linnanrakentaja, Opus) – Postivahdin kova raja 35 %

Edellinen: `viesti-linnanrakentaja-luovutus-20261016-iltapaiva.md`. Viestit AINA id:llä (`/Users/Shared/Claude/osoitekirja.md`): PT local_5df52e10…,
Valoseppä local_c238f4af…, Postivahti local_a24c43c0…. PT:lle ≤ 3 riviä.

## 1. SEURAAVAKSI
**PT 19.5x ensimmäisenä:** Louvre k52: L2:n varjopuoli ~25 % tavoitetta tummempi → selvitys Valosepän kanssa (valo vai malli; työnjako alla);
L1-arkit jatkossa AINA L1b-kamerasta; k51-paketti `v6k18-lv2f-k51s` EI tuotantoon (tuotannossa k48 = v6k20).
1. **Louvre k52s (Valoseppä kuvaa):** k52 = luuppi-vienti/glb (md5 224accaf/28db1999/fb031cec). Sovittu työnjako 19.5x: minä kivi +7 %
   (tehty), Valoseppä L2:n varjopuoli ~+25 % (taivas/maa) + AO koloihin; arkki L1b + L2 + L3 vs Codex. Kun arkki tulee
   (`_tyo/linssiseppa2/louvre1/lahi-L1-L3/k52s/`): mittaa sävyt (L1 tavoite 136,121,100; L2 125,110,91; mittausrajat kuten
   VERTAILU.md:n k49s/k51s-riveillä) → arvio yhdellä rivillä PT:lle omistajaa varten. Mainitse: Pariisin omat mallit valaistaan
   kiinteästi 300°:sta → L2:n itäjulkisivu aina varjossa, Codexissa auringossa (osa erosta on tavoitekuvan valo).
2. **Raketin alusta (juna 196, Valosepän luuppi):** valaisinpäät kirkkaiksi odottaa yhä Valosepän pyyntöä (ks. edellinen luovutus kohta 1).
3. Seuraava Louvre-paketti = k52 (ei k49/k50/k51) – Valosepällä tiedossa.

## 2. TEHTY TÄNÄÄN (13.3x–19.55)
- **Louvre L1–L3:** Codexin 1. erä hylätty (IoU 84/95/64, pyramidi) → omistaja 13.34 lupa 3 uuteen → tilaus 2 (posti 5db401c7f,
  k42-kulmakuvat) → Codex v2 291423c06 → tarkistettu (L1 96,5 / L2 96,7 / L3 95,6 %, ei pyramidia), vastaus 1bc3913c2 →
  **omistaja 16.28 "Kelpaavat, kaikki kolme"** (L2:n Horlogen ylin kenttä valokuvien mukaan). Tavoitteet `tavoite/codex-lahi/`.
- Luuppi k37–k52 (kirjanpito `_valmiit/louvre-v1/VERTAILU.md`): Lemercier +2,8 m, Sully −2 m, lasikatot pyramideiksi, paviljonkien
  pylväät/kapiteelit/attikat/päätykolmioiden hahmot, Turgot'n kattoikkunat, ratsastajapatsas, Cour Carréen sora + AO-ruudukko,
  ikkunasyvennys 0,6 m, kivisävy lämpimäksi (k52: kivi 211,180,139). Muoto codex-lahi-tavoitteisiin 96 %.
- **Omistaja 18.27 "Junaan 197 nyt": k48** asennettu `_valmiit/louvre-v1/glb` (md5 578ace47…, = Valosepän lahde-k48), ohje
  `INTEGRAATIO-k48.md`; k36 talteen `glb-k36/`. NS:n SHA = Valosepän varjopuolikorjaus f23d46f7f. Ei natiivikoodia minulta.
- **Luupin viennit** nyt `_tyo/linnanrakentaja/louvre/luuppi-vienti/` (LOUVRE_ULOS), EI `_valmiit/glb`:hen. `_valmiit/lahde/` = luupin kärki.
- **L1b** (`tavoite/louvre-vertailukulmat.json`, 65 m, pyramidi kuvan alla): omistajan arkkeihin L1:n tilalle (Googlen pyramidin
  rypistynyt lähipinta). Kamerajsoneissa `pysakki: Louvre`. Kuvaajan maski ilman patsasta; L-kulmat aina `--eevee`.

## Opit
- Luupin vienti `_valmiit/glb`:hen ylikirjoitti hyväksytyn paketin lähteen → erillinen vientikansio heti luupin alussa.
- Pelin kamera ei katso ylöspäin (max 5° alas): lähikulma ilman edustan esteitä = korkeammalta, ei lähempää.
- Pariisin omien mallien valo on kiinteä 300° (KaupunkiIlmakeha.OmaAtsimuutti): itäjulkisivujen sävyä ei voi sovittaa albedolla.
- Blender-esikatselu ei kerro pelin sävyä: sävyt vain Valosepän pelikuvista mitaten.
