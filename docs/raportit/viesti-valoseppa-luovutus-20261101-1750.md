# Valosepän luovutus 1.11.2026 klo 17.50

Syy: konteksti 25 % (pehmeä raja). Edellinen: viesti-valoseppa-luovutus-20261101-1715.md (PYSYVÄT TYÖTAVAT voimassa:
pitkä Unity-ajo taustalla valmis + kuolema -ilmoituksella; jokainen valmis kuva-ajo HETI omistajalle SendUserFilella + polku PT:lle;
omistajan kuvissa ei sääntöikkunaa eikä poltettua kaistaa, teksti captioniin).
Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 17.29–17.47). Skriptit: `_tyo/linssiseppa2/skriptit-20261031/`.
Worktree `wt/proto-linssiseppa2-varjo216` on haaralla linssiseppa2/ilmakuva-216.

## TEHTY
- **Läikät 03 KORJATTU, PT KUITTASI, NS:lle viety**: koe `lokit/esikatselu-20261101-172952` (l03-keski.jpg): läikät katosivat vain kiilto pois
  (heijastus 0 / k8 0 / leivonta 0 eivät) → syy JuoksuLattia: kiilto = 0,05 + 0,22 × kuluma (~3 m:n kohina) × laattakiilto 3.
  Korjaus **7bec74dfa**: 0,09 + 0,06 × kuluma (keskikiilto ennallaan, omistajan 27.10. kiilto säilyy). Koonti
  `lokit/havainne-editori-20261101-173638` (03-ennen-jalkeen.jpg + koonti.png 01/02/03/05, ei taantumia), omistajalla.
  04: ei läikkiä enää (salikorjaus 990497d2f).
- **07 raita + usva KORJATTU, PT KUITTASI**: **aa0b299f9** (7bec74dfa:n alla): taivaan alapuoli usvan sävyyn 1,5°:ssa (v3-palat vain
  yläpuolisko → alin rivi venyi pystyraidaksi korkealta kameralta); usvan matka × 30 m / kameran korkeus kun kamera > 30 m
  (Valopohja.JuoksuIlmakuvaUsvaM, ValoKohteet.JuoksuIlmakuvaUsvaM, QA `valo ilmakuvausva m` + `valo 1`; pelikamera ei muutu).
  Koonti `lokit/esikatselu-20261101-173258/i07-koonti.jpg` omistajalla.
- Haara proto **linssiseppa2/ilmakuva-216 7bec74dfa** (= 73f3288e7 + 2) viety NS:lle runkoon 216 (17.4x). Tarkista NS:n runko-SHA.

## AVOIN (PT 17.4x: jonon seuraavat, ellei LAV:lla vettä – LAV:n raporteissa ei vesityötä)
1. **07 vallihauta harmaa** (85/116/148 vs havainne 56/124/156): koe `lokit/esikatselu-20261101-174031/vesi07-koonti.jpg` –
   `valo savy avovesi r g b w` ei juuri muuta (86/120/155, 76/112/147) → syy muualla: JuoksuLattia.shader Vesi() _Uoma 2:
   taivasAvo = JuoksuTaivasVari(rv) (vaalea horisontti), frAvo, syvaAvo × valaistus, JuoksuUsva. Seuraavaksi: koodista mikä termi
   dominoi (esim. väliaikainen QA-tila vain syvä / vain heijastus), sitten korjaus. Vesi on VS:n (JuoksuV4Maailma.Vesi).
2. **07 taivas valkoinen** = kamera: testikamera 270 140 20.25 35 → kuvan yläreuna −2,75° (horisontin alla). 17°/15° näyttää taivaan,
   mutta pilvet horisontin lähellä PYSTYRAITOINA (p15/p17 samassa koonnissa) → selvitä (v3-palojen alarivit / v = korkeus/90:n
   venymä 22 px/° vs ruutu 59 px/°). Kameran rajaus on PT:n/PK:n päätös; kerro PT:lle vaihtoehdot.
3. 06 = geometria (LAV), ei Valosepän.
