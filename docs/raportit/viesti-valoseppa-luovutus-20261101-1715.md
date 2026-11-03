# Valosepän luovutus 1.11.2026 klo 17.15

Syy: konteksti 25 % (pehmeä raja). Edellinen: viesti-valoseppa-luovutus-20261101-1650.md (PYSYVÄT TYÖTAVAT voimassa:
pitkä Unity-ajo taustalla/Monitorilla valmis + kuolema; jokainen valmis kuva-ajo HETI omistajalle SendUserFilella + polku PT:lle;
omistajan kuvissa ei sääntöikkunaa eikä poltettua kaistaa, teksti captioniin).
Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 17.00–17.1x). Skriptit: `_tyo/linssiseppa2/skriptit-20261031/`.

## TEHTY
- **Sali 04 VALMIS, RUNGOSSA**: syy ei ollut materiaali – salin sisäkamera (PT 29.10.) pitää katon näkyvissä kameran ollessa
  salissa → katon elävä varjo peitti koko lattian (ei pylväs- eikä Puyin varjoa). Korjaus proto `linssiseppa2/sali-216`
  **990497d2f** (02a7743af + 1): salin oma aurinko 45°/70° salin akseleista (2732b6172:n logiikka kirjoitettu uudelleen rungolle,
  cherry-pick ei käynyt), juhlasalin katto + palkisto ei heitä elävää varjoa keisarin ollessa salissa (`JuoksuV4Maailma.EiHeita`),
  QA `valo saliaurinko 0|1 [k a]` ja `valo salikattovarjo 0|1`. Vahdit ok.
  Koonti `proto-3d/lokit/esikatselu-20261101-170006/sali04b-koonti.jpg` (s0 uusi / s1 katto heittää / s2 leivonta 0 / s3 saliaurinko 0);
  s0+s1 omistajalla. **PT kuittasi**, NS:n runko 216 **73f3288e7** (testit vihreät).
- Ajo: `sali04b.zsh` + `sali04b-skenaario.txt`.

## AVOIN (järjestys)
1. Läikät 03/04.
2. 07 usva + taivassauma.
3. 06 = geometria (LAV), ei Valosepän.
