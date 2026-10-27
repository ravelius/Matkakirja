# Valosepän luovutus 27.10.2026 klo 17.04 (juoksupeli, KK johtaa)

Lue ensin: tämä, sitten loki `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 27.10. 16.08 →).
Worktree `/Users/Shared/Claude/wt/proto-linssiseppa2-p11`, haara `linssiseppa2/seinat-211` (natiivi-backup, pushattu), kärki **a75966b7e**
(= juna 212 31601c9e7 + alla olevat). Esikatselut L2:lla.
**KUVAPARIT:** käytä `editori-vs.sh`:ta (kopio: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/tyokalut/editori-vs.sh` (samassa kansiossa savykoe.zsh, mittaa2.py, glb_uv.py, glb_kaikki.py)),
EI worktreen `tyokalut/havainne/editori.sh`:ta: jälkimmäinen ei vie MALLIT-riviä skenaarioon → kuvat junan oletusmalleilla (ajot 163054/163357/164242 hylätty).
Tarkista aina, että `skenaario.txt`:ssä on rivi `ui juoksupeli palatsi mallit …`.

## Tehty tänään 16.03 jälkeen (seinat-211)
- **OMISTAJA 16.03 (loki PR 5356): kaikki kivet samaa sävymaailmaa, reunakivi pitkinä yksittäisinä kivinä.**
  - 408f2682a / 617af4400: `_JuoksuKiviSavy` (laji 11), `_JuoksuReunusSavy` + **V4_kivireunus → laji 18 ReunusKivi** (Lavastajan UV0: u = metrit pituussuuntaan;
    kivet 1,6 m ± 0,2 m, sauma 8 mm vaalea, kivisävy + raidoitus). QA `valo savy laatta|kivi|reunus r g b`.
  - b57097f24: sävyt laatta 0,89/0,92/0,91, kivi 0,71/0,70/0,69, reunus 0,63/0,59/0,49 (kaikki ~25°, kylläisyys ~0,07; kivijalka tummempi kuten havainne).
    Sävykokeet `proto-3d/lokit/havainne-editori-savykoe-20261027-160725` ja `-161740` (skripti `_tyo/linssiseppa2/tyokalut/savykoe.zsh`). PT: sävymaailma hyvä.
  - 2d9a1e8e7: yläreunan viiste sävytyksenä (LR v82m+: yläpinnan glTF-v = 0 kadun puolella; tuonti kääntää → 1 − uv.y). a9e1f7676: laji 18 lattiatasolla (y < 0,05) kivetyksenä.
- **Väreily (PT: tavoite ~0 %):** LT:n iPad-mittari 31601c9e7: kuja02-3 vihreät 10,5 % (oli 15,9), keski52 0,86 → 0,17. Syy: `Texture.mipMapBias` ei vaikuta Metalissa.
  34ea8094d: mip-siirtymä varjostimessa (JuoksuMaailma `SAMPLE_TEXTURE2D_BIAS`, `_JuoksuKuvaBias` 1,0, ei MASK; QA `valo kuvabias b`).
- **Taivaan porrastus (PK/PT):** a75966b7e: panoraama `Compress(true)` (oli nopea karkea) + ±½/255 ditheröinti JuoksuTaivas-varjostimeen.

## Kesken (seuraava Valoseppä)
1. **Kujien reunakivi ei näy juuri-v84m-pareissa** (`havainne-editori-20261027-164641` ja `-165718`, kuvat `_tyo/linssiseppa2/reunakivi-20261027/v84m-*`):
   kujalla 02/05 on pientiililattia + isojen laattojen kaista portaineen, reunakiveä ei näy. LR (16.5x): mallissa kuja-0-3:n reunus y 0,20 x ≈ −249,0 ja −242,7,
   ei mitään kujan päällä → pelin oma geometria (reitin kaista / ympäristömoduuli / Palatsi.cs-täyte) tai LOD. Selvitä QA `valo lodtieto` ja `valo pintatieto`
   kohdassa (−247; 330), tarvittaessa PK:n kanssa. Sitten KK-pari 02/01/05/03 (havainne | peli) → KK ≤ 3 riviä.
2. **LT:n mittaus a75966b7e:llä** (väreily kuja02-3 myös `kuvabias 0` ja `2`, sekä taivas aukio03/keski52), JU:n asennus + PT:n vuorovahvistus. Jos vihreät eivät lähes 0 %:
   kokeile isompaa biasta tai friisikuvien (1058/1067) mip-tasojen esisumennusta; raportti PT:lle.
3. **NS-merge:** PT 16.4x: video ei tarvita, seinat-211 NS:lle KK-parin jälkeen. **RIIPPUVUUS:** laji 18 vaatii LR:n reunakivi-UV-mallit (yksikerros-v79+);
   junan vanhoilla malleilla reunus piirtyy siruina → vie junaan vain yhdessä LR:n mallipaketin kanssa (kerro NS:lle ja LR:lle).
4. Ennen NS:ää: `tyokalut/metal-tarkistus.sh` (uudet: ReunusKivi, SAMPLE_TEXTURE2D_BIAS, taivaan dither) tai NS:n METAL/PIPELINE-testit.

## Päätetty ja kuitattu (ei avata)
- Reunakiven kivijako UV:stä varjostimessa (LR 16.3x), muoto ja UV:t LR:llä; sävyt VS.
- Simuvideota väreilystä ei tarvita (PT 16.4x), mittari riittää.

## Huomiot
- Esikatselun lokin `POIKKEUS ArgumentOutOfRangeException` ennen juoksua näkyy kaikissa ajoissa (ei tämän erän).
- KK:lle ja PT:lle ≤ 3 riviä. Viestiraja → `mcp__ccd_session_mgmt__send_message`.
