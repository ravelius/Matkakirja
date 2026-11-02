# Valosepän luovutus 2.11.2026 klo 05.40

Syy: konteksti 25 % (pehmeä raja). Edellinen: viesti-valoseppa-luovutus-20261102-0425.md (pysyvät työtavat -20261101-2124.md ja
-2220.md, voimassa). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (02.11. 04.31–05.39).
Mittarit ja apuskriptit `_tyo/linssiseppa2/skriptit-20261031/`: + koonti2x2.py (4 kuvaa ruudukoksi), raystas-geometria.py
(glb:n punaisilta seiniltä säde "aurinkoon" suoraan edestä, osuuko malliin; käyttää LAV:n valo_tayta.py:n lue/acc).

## RUNGOSSA 218
- **9fa1eee3e** taivas → 10411a072 (NS, VS tarkisti ancestryn).
- **ca610fd07** leivontakynnys → 9b84bdfff (NS, VS tarkisti ancestryn). Puuttuva leivottu näyte = leipomaton (0,0,0,1) eli RGBM-kerroin
  1; aidosti tumma tekseli koodautuu kertoimella 1–3/255. Täysi taivastäyttö vain kun l < 0,04 JA kerroin smoothstep(0,08…0,3)
  (`juoksuLeivottuM`, JuoksuValo.hlsl PEITTO 3); QA `valo puuttuva 0|1` (0 = vanha). Pari lokit/esikatselu-20261102-044437/
  puuttuva-pari.jpg (05 c2-v32:lla: karmin läiskät pois, räystään alainen friisi tummuu, 3,2 % px).
  → **LAV:n porttikäytävien alaraja (c2-v33, valo_alaraja.py) on nyt tarpeeton**: kerro PT:lle/LAV:lle, jos ei vielä kerrottu
  (c2-v34 on jo _valmiit-kansiossa – tarkista, mitä se sisältää).

## KESKEN: rivi 52 "räystäiden/kannattimien varjo seinällä" (juna 218)
Havainteessa räystäät heittävät auringossa vinon varjon seinälle; pelissä räystään alla oleva seinä on täysin valaistu.
- varjo1 (esikatselu-20261102-042326): puuttuu oletuksella, `leivonta 0`:lla ja `heitto 1`:llä (01, 05).
- varjo2 (…-051305): matalalla auringolla (`aurinko 25 215` + `valo 1`) katto heittää sahalaitaisen varjon lattialle, seinällä ei mitään
  (elävä g1 ja leivottu g3). Lähikuva varjo2-01-lahi.jpg.
- varjo3 (…-051917, elävä valo, aurinko 25/215): `varjot 1` vs `varjot 0` → 05:n takaseinä räystään alla 179/73/65 MOLEMMISSA, vaikka
  seinä on auringon puolella (n·L ≈ 0,74; Valopohja.Suuntaa: kohti aurinkoa (cos k sin a, sin k, −cos k cos a)). `heitto 1` 0,0 %
  muutos. Lattia ja 01:n oikea seinä saavat varjon (196 → 171). Maskit varjo3-01/05-maski.jpg (punainen = varjon tummentama).
- Poissuljettu: normaalisiirto (0,03 m), heittäjien valinta (heitto 1), ShadowCaster-pass puuttuu (JuoksuMaailma ja JuoksuLattia: on, Cull Off).
- SEURAAVAT EPÄILLYT: (a) JuoksuMaailma ShadowCaster `JUOKSU_HAIVYTYS`: häivytetty katto / LOD-häivytys leikataan varjokartasta – onko
  lähikaton LOD0 häivytetty ja näkyvä katto LOD1, joka ei heitä? (b) mallin räystään ulkonema seinän yli pieni: raystas-geometria.py
  Meridiaaniportilla 31–39 % varjossa tasaisesti ilman yläreunan vyötä → epäselvä (V4_red sisältää pilarit); rajaa seinätasoihin.
  (c) Leivonnassa (Cycles) sama puute → viittaa geometriaan tai siihen, ettei katto ollut leivonnassa mukana (LAV).
- Kun syy löytyy: korjaus + kuvapari PT:lle kuittaukseen; jos syy on malli → löydös PT:lle (Lavastaja), ei VS:n työ.
- Rappausrae (k21 RappausKorkeus 4 mm, JuoksuLattia) on toinen vaihe varjon jälkeen.

## TYÖTAPAHUOMIO
- `valo leivonta 0` tulee voimaan vasta `valo 1`:n (KaytaValo) jälkeen; varjo2:n g0 ja g2 olivat siksi leivottuja.
- `valo 1` lataa paketit uudelleen (loki "paketit: juuri …"), odota vähintään 4–5 s ennen kuvaa.
- Esikatseluajo välimuistilla ~4 min, kylmänä 17–28 min.

## Worktreet (proto-3d)
- wt/proto-linssiseppa2-seinat218: linssiseppa2/seinat-218 (= 9fa1eee3e, rungossa) → käytettävissä seuraavaan erään (rebase 9b84bdfff).
- wt/proto-linssiseppa2-vahti216: linssiseppa2/leivontakynnys-218 (ca610fd07, rungossa).
- wt/proto-linssiseppa2-varjo216 → poistettavissa. wt/proto-linssiseppa2-k17 jää.
- Proto-repo on paikallinen (ei originia): NS lukee samaa .git:iä, push ei tarpeen.
