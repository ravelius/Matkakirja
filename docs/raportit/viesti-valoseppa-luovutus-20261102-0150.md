# Valosepän luovutus 2.11.2026 klo 01.50

Syy: konteksti 25 % (pehmeä raja). Edellinen: viesti-valoseppa-luovutus-20261101-2220.md (pysyvät työtavat siellä ja
-20261101-2124.md:ssä, voimassa). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (22.25–01.4x).
Mittarit `_tyo/linssiseppa2/skriptit-20261031/`: + punainen.py (punaiset pinnat h −12…16°, tumma/vaalea puolisko), rappaus-koonti.py.

## SEURAAJAN ENSIMMÄINEN TYÖ (PT 2.11. 01.4x, yö; LAV jumissa nollausta odottaen, estää TF 217:n)
Junan 217 malliviat LAV:n paikannuksesta: `/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/bugit-217/LUE.md` + bugilista
`/Users/Shared/Claude/proto-3d/lokit/bugit-juoksu-217-20261102/RAPORTTI.md`: **11** kk-tausta-1-2 palasauma x −100, **7** t-portti-m216
katto, **6** kattolevy leijuu, **8** valkoinen portaikko, **9** siniset raidat portaissa, **14** valopisteet muurin/sokkelin saumassa,
**15** varjot ilman heittäjää (5 = PK, ei VS). LAV:n tila: luovutus 6f9de66af "LISÄYS 216". Korjaus → SHA NS:lle runkoon 217
(lukitus auki 23.2x) + rivi PT:lle. Aloita lukemalla LUE.md, ei koko RAPORTTIA kerralla.

## RUNGOSSA 217 (NS, VS tarkisti ancestryn)
- **1fe307e5a** varjosävy → 398990c67. Omistaja 22.4x "Valo näyttää hyvälle" → valo hyväksytty nykyisellään (PR 5906):
  aurinko, varjojen sävy ja valotus vain PT:n kuittauksella.
- **feba388b9** punainen rappaus havainteen sävyyn (ValoKohteet.JuoksuK11RappausSavy 1,75/0,25/0,15; h 8° → 4–5°, kyll 0,61 →
  0,65–0,68, ei ylitä havainnetta: omistaja 24.10. "liian räikeän punaisia") → 6ba27bf5b. k21:n harmaannus (lerp luminanssiin 0,78)
  syö punaisen noston → G ja B alas.
- **c9edd5e56** havainne-editorin 06-kamera siipien väliin (keisari z −545, testikamera 2,2/7,9/2°; LAV: U-piha todellinen) → b13cd9caa.

## SELVITETTY, EI VALOTYÖTÄ (PT:lle raportoitu)
- 05 portin ovet mustat = katettu porttikäytävä (havainteessa avoin aukko) → Lavastaja, seuraava juna.
- 07 nurmi = taustamallin väri (Lavastaja); 07 taivas = kamera: k0 jää (PT), havainteen perspektiivi ei fysikaalinen.
- 06 jäljellä: kivijalka ja siipien terassit/kaiteet (malli, Lavastaja; PT: ei mallimuutoksia), siiven varjo = yksi aurinko 318°.

## AVOIN
- Omistajan videosta puuttuvat varjot ja tekstuurit: KK tuo aikaleimat, PT välittää (ei vielä tullut).

## Worktreet (proto-3d)
- wt/proto-linssiseppa2-vahti216: haara linssiseppa2/kamera06-217 (rungossa). Haarat rappaus-217, varjosavy-216 rungossa.
- wt/proto-linssiseppa2-varjo216 (ilma07-216, korvattu) → poistettavissa. wt/proto-linssiseppa2-k17 jää (3 committia ei rungossa).
