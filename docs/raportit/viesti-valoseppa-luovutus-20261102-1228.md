# Valosepän luovutus 2.11.2026 klo 12.28

Syy: konteksti 29 % (pehmeä raja, kontekstivahti). Edellinen: viesti-valoseppa-luovutus-20261102-0540.md (pysyvät työtavat
-20261101-2124.md ja -2220.md voimassa). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (02.11. 05.47–06.12).
Apuskriptit tässä sessiossa scratchpadissa; kopioitu `_tyo/linssiseppa2/skriptit-20261031/`: varjoero.py (varjot 1/0 -maski, sininen),
rae.py (rappauksen pintavaihtelu kaistoittain), rajaa.py.

## VALMIS: rivi 52 räystäsvarjo seinällä → EI VIKAA (PT:lle 06.12, kuittaus ei vielä tullut)
- varjo4 (esikatselu-20261102-054720, runko 218 3431485b8): korkea aurinko seinän edestä (60°/75°) → räystään varjo piirtyy seinille
  elävänä (01 vasemmat seinät, 05 porttiosan seinä friisistä sokkeliin). Varjoketju (ShadowCaster, JUOKSU_HAIVYTYS, bias) toimii.
- varjo5 (esikatselu-20261102-060658, oletusaurinko 45°/318°, leivonta oikeassa järjestyksessä): nauha seinällä sekä elävänä että
  leivottuna (01 friisin kohta 143/74/55 → 118/61/52). Havainteen 01 lähikuvassa seinä räystään alla myös valaistu.
- varjo3:n "puute" = 25°:n testiaurinko (nauha = ulkonema · 0,57 osuu turkoosiin friisiin, jolla tasainen _Raystas-varjo) + 05:n
  takaseinä on oletusauringolla itse varjon puolella. varjo1:n e1/e3 olivat leivottuja (leivonta 0 ilman valo 1:tä).
- Koonti raystasvarjo-koonti.jpg (esikatselu-20261102-060658) → PT. Ei koodimuutosta, ei NS-pyyntöä, ei LAV-riviä.

## KESKEN: rivi 52 rappausrae (aloitettu 12.2x, ei koodia vielä)
- Palatsin punaiset seinät = V4_red → laji 10 → JuoksuLattia.shader rappaushaara (`_Laji < 10.5`); k21 RappausKorkeus (4 mm, kohinat
  3,1/m ja 11/m) + reliefi `clamp((nb·L − n·L) × 2,5, ±0,25)` rivillä ~545 (vain aurinkoiselle).
- Mittaus rae.py (havainne-editori-20261102-040855, kuvat 1448 px leveinä; 3–10 px ≈ 3–12 cm, 10–30 px ≈ 12–35 cm 03:n etäisyydellä):
  03 vasen seinä peli pienet .019 keski .010 isot .023 vs havainne .025 / .031 / .051; oikea .018/.008/.014 vs .026/.026/.039;
  02 oikea peli .028/.013/.009 vs havainne .021/.013/.013. Väri täsmää (03 168/66/58 vs 165/63/53).
  → havainteessa "lastan jäljet" 3–35 cm ~2–3 × voimakkaampia; hienorae ei puutu.
- SUUNNITELMA: uusi globaali `_JuoksuRappausRae` (x korkeuden kerroin, y vaste 2,5, z raja 0,25, w albedon läikkä 5–20 cm:n
  kohinasta, vaikuttaa myös varjossa) + QA `valo savy rae k v r a` (Valopohja.QaSavy-ketjuun) + ValoKohteet-oletus = nykyinen
  (1, 2,5, 0,25, 0). Ajo r0 nyk. / r1 k2 r.35 / r2 a.12 / r3 k2 r.35 a.12 / r4 k2,5 a.2 kohdissa 02 03 01, mittaus rae.py:llä.
  Sävy- ja pintamuutos → PT:n kuittaus (valo hyväksytty 1.11. 22.4x; vain selviä havainne-eroja).
- Haara proto linssiseppa2/rae-218 luotu (= runko 218 52ba93dea, ei committeja) worktreessä wt/proto-linssiseppa2-seinat218.

## Worktreet (proto-3d)
- wt/proto-linssiseppa2-seinat218: nyt haarassa linssiseppa2/rae-218 (= runko). Haara seinat-218 (9fa1eee3e) rungossa.
- wt/proto-linssiseppa2-vahti216: linssiseppa2/leivontakynnys-218 (rungossa). wt/proto-linssiseppa2-varjo216 → poistettavissa.
- wt/proto-linssiseppa2-k17 jää.
