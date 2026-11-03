# Valosepän luovutus 1.11.2026 klo 18.15

Syy: konteksti 25 % (pehmeä raja). Edellinen: viesti-valoseppa-luovutus-20261101-1750.md.
PYSYVÄT TYÖTAVAT: pitkä Unity-ajo taustalla (valmis + kuolema -ilmoitus); **jokainen valmis valokoonti: polku + yksi suomenkielinen
rivi SUORAAN KK:lle send_messagella (local_37f7c945-e1a0-4638-90b8-93c389a36fbe), kopio PT:lle** (PT 17.5x: SendUserFile ei näy
omistajalle); kuvissa ei sääntöikkunaa eikä poltettua kaistaa. Värimittaus havainteeseen ennen paria (Raamattu 2.177).
Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (18.1x–). Skriptit: `_tyo/linssiseppa2/skriptit-20261031/`.
Worktree `wt/proto-linssiseppa2-varjo216` on haaralla **linssiseppa2/varjo2-216** (runko 30ab21cdc + 4 committia).

## TEHTY (haara linssiseppa2/varjo2-216, EI vielä NS:llä)
- **Puyin varjo editorikuvissa – SYY LÖYTYI**: havainne-editori ajoi laatutasolla **Mobile** (varjokartta 1024²), iPad **Ultra**
  (4096²; simu 03:n loki `laatutaso: Ultra, iPad17,4`). Puyi heittää (QA `valo hahmotieto`: SMR heitto On, kerros 26).
  **1a60b2499**: Laatutaso.Valitse lukee editorissa MATKAKIRJA_LAATUTASO; esikatselu.sh `ESIKATSELU_LAATU`; editori.sh LAITE=ipad → Ultra.
  Todiste `proto-3d/lokit/esikatselu-20261101-180517/vt-koonti.jpg` (Ultra: Puyin varjo + terävät rakennusvarjot). Koskee KAIKKIEN
  roolien editoripareja → PT tietää.
- **07 pilvien pystyraidat**: **b32c72075** taivaan alapuoli peilikuvana |korkeus|:sta (alin rivi venyi 1,5°:n häivytyskaistassa).
- QA: 15cab6a5f `valo hahmotieto`, `valo varjotaso z` (Valopohja.JuoksuHahmoVarjoTaso, oletus 0,32); 4dd558132 `valo vesitila 0–3`.

## AJOSSA (tulokset seuraajalle)
1. **koonti-ultra.zsh** (editori.sh 01 02 03 05 07, REF 1a60b2499) → `koonti-ultra.log` (KANSIO-rivi). Valmis → tarkista 07 taivas
   (raidat poissa?) ja Puyin varjo → **polku + rivi KK:lle, kopio PT:lle** → PT:n kuittaus → NS:lle 1a60b2499 (sis. b32c72075).
2. **vesi07c.zsh** (savy avovesi c0 nyt / c1 0 0.16 0.26 0.05 / c2 0 0.20 0.30 0.03 / c3 0 0.14 0.20 0.05 + p15 peili) → `vesi07c.log`.
   Mittaa hauta maskilla (b > r+45 ja b > g+15, alempi 2/3) kuten 180027:ssa; tavoite havainne 56/124/156.

## AVOIN
- **Varjojen voima**: havainteen lattiavarjo/aurinko (p8/p85, alempi 40 %) 01 0,39 / 02 0,46 / 03 0,53 / 05 0,46; peli Ultralla
  0,61 / 0,48 / 0,66 / 0,67. `varjotaso` 0,32 → 0,08 muuttaa vain ~0,03–0,05 → syy: täyttö (JuoksuValo.hlsl JuoksuValaistusVarjolla
  `lerp(_JuoksuMaa, _JuoksuTaivas) × ao × JuoksuLeivottuTayttoK()`) ei pienene elävässä varjossa. Ehdotus: täyttö × lerp(k, 1, varjo)
  kun rajaton (vain elävä varjo; leivotun varjon täyttö ennallaan), k ~0,5 → koe 01/03/05. 01: rakennusvarjo puuttuu lattialta
  kokonaan (vain puun läikkä) – auringon suunta / kujan suunta, tarkista ennen voimaa.
- **07 vallihauta**: vesi07b (esikatselu-20261101-180027): normaali 85/116/148 = ilman usvaa (usva EI syy), vain syvä 74/106/132,
  vain heijastus 129/157/213 → syvä sävy liian harmaa/punainen; punaisen pohja ~70 vaikka avovesi R = 0 (jälkikäsittelyn käyrä?).
  Korjaus ValoKohteet.JuoksuAvoVesi vesi07c:n perusteella.
- 06 = geometria (LAV).
