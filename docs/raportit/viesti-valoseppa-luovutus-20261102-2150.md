# Valosepän luovutus 2.11.2026 klo 21.50

Syy: konteksti 25 % (pehmeä raja, kontekstivahti). Edellinen: viesti-valoseppa-luovutus-20261102-2100.md (pysyvät työtavat
-20261101-2124.md ja -2220.md voimassa). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (02.11. 21.04–21.50).
Tulivuorityön tila ja skriptit: `_tyo/linssiseppa2/tulivuoret/TYO-SARJA.md` (osio "Tehty 21.0x–21.3x").

## TEHTY TÄSSÄ SESSIOSSA (proto linssiseppa2/tulivuoret-sarja, worktree wt/proto-linssiseppa2-tulivuoret, pushattu natiivi-backupiin, EI junaan)
- 510f618dc: kuvan valinta katsekulman suuruuden mukaan (82/66/47° → 0,05/3,49/7,00 = 9026/9038/9048).
- 185186cf3: lauta koko kahdeksan kuvan yhteisestä peitosta (skriptit/leivo-sarja3.py, 20,2 km, 2048², reuna 200 px).
- 6b0bb1a1c + ddbb39f3f: pilvikansi aidon kuvan laatoista (PT 21.4x: ei reunavenytystä): skriptit/leivo-kansi2.py
  `koe-kansi2 11 256 384 60 15 40,560 1350,380 1100,1150` → laatta-stratus/tuhka/tumma.jpg (3,8 km, wrap Mirror) + kansi.png
  (ohjaus R/G/B laudan reunan suuntaprofiilista, tuhka/varjo sulautuvat 60/15 km). Varjostin: 3 näytettä eri mittakaavoissa ja kierroissa.
  Hylätyt: v6-rengas (510f618dc, lumivalkoinen), pull-push-reunavenytys (074ff7f5a/dc1558bbe, PT: tasainen harmaa sumu).
- PT KUITTASI 21.4x: paikka, kierto, saari ja purkauspilvi. Video ylilennosta: sarja5/sarytsev-ylilento.mp4 (ruutusarja, skriptit/kokoa-video.zsh).
- Uusi pari sarja7/sarytsev-pari.jpg (esikatselu-20261102-214739) → PT 21.50, odottaa vastausta.

## JONO (seuraaja jatkaa tästä)
1. **PT:n vastaus sarja7-pariin.** Tunnettu puute: tuhkavana kapeampi ja haaleampi kuin aidossa (aidossa ruskea harso peittää koko
   kuvan oikean puolen). Säätö: leivo-kansi2.py Lt (60 → 120 km?) ja tuhkan paino (reunaprofiilin w[1] ×1,5, normeeraus), aja koe-kansi2:ssa,
   kopioi kansi.png + sarja.json Resourcesiin (metat ennallaan), skenaario sarja7/sk-sarja7.txt + ajo.zsh (vaihda SHA), pari samalla rajauksella.
2. Sitten Etna samalla menetelmällä (TYO-SARJA.md: ISS005-E-19016/-19024; rekisteröinti → leivo-sarja3 → leivo-kansi2 käsin valituin laatoin).
3. OMISTAJAN PÄÄTÖS 21.17 (PT): juoksupelin sadesäällä vesi syöksyy terassien marmorikaiteiden lohikäärmeenpäistä; Sarytševin jälkeen,
   sääsysteemiin kytkentä PK:n kanssa. Suunnitelma Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261102-juoksupeli-arkiset-hahmot.md kohta 7.3.
- Tunnettu: ohut vaalea viiva/vana laudan alla (ei lähdekuvissa; pelin oma kohde läpikuultavan reunan läpi?), selvittämättä.

## Worktreet (proto)
- wt/proto-linssiseppa2-tulivuoret: linssiseppa2/tulivuoret-sarja ddbb39f3f.
- wt/proto-linssiseppa2-seinat218: koehaarat (salipinnat-218, v112-218, c3-218), EI junaan.
