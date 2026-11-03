# Valosepän luovutus 2.11.2026 klo 14.45

Syy: konteksti 26 % (pehmeä raja, kontekstivahti). Edellinen: viesti-valoseppa-luovutus-20261102-1355.md (pysyvät työtavat
-20261101-2124.md ja -2220.md voimassa). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (02.11. 14.0x–14.4x).
Skriptit `_tyo/linssiseppa2/skriptit-20261031/` (ajot *-ajo.zsh + *-skenaario.txt). Mittarit tämän session scratchpadissa kopioituna
alle (punap.py, juova.py, musta.py) → kirjoita uudelleen tarvittaessa; ne ovat 10-rivisiä:
- punap.py: punainen maski (h −12…16°, s > .4, max > .08), luminanssin p20–30 ja p85–95 mediaaniväri.
- juova.py: lattia-alue (1024×768: y 420–768, x 100–920), juova = L > j0:n L + 25; osuus, juovan ja muun mediaaniväri.
- musta.py: max-kanava < 25 osuus.

## VALMIS JA RUNGOSSA (PT kuittasi 14.4x, NS: runko 218 23b37d035 = + linssiseppa2/sali-218 b1a8aa3da, ancestry tarkistettu)
1) 04 sali: `JuoksuSaliKattoVarjo` true + piilotettu salin katto heittää (ShadowsOnly; JuoksuV4Maailma.VainVarjo/AsetaVainVarjo/Heittotila,
   JuoksuSokkeloMaailma.Sovella saliKattoJoukko). Valojuovat valokuviona (JuoksuValo.hlsl JuoksuSaliJuova, AsetaSaliJuova: lähimmän salin
   katon suorakaide, juova auringon vaakasuunnassa, jakso 3,5 m, täyttö 0,3, QA `valo salijuova v [jakso täyttö pehmeys vaihe]`).
   Mittaus: lattia p50 208 → 167 (hav 163), juovaa 23 % (hav ~25 %). Pari _tyo/linssiseppa2/sali04h/sali-pari.jpg. 01 02 05 ennallaan.
2) Maavalo varjoseinille 0,3 (JuoksuSeinaMaavalo, QA `valo seinamaavalo k`): punaisen p25 02 122→152 (hav 163), 03 142→170 (156),
   05 103→139 (128), p90 alle havainteen. Samalla kohta 2 (mustat, max < 25): 02 1,06→0,39 % (hav 0,11), 03 0,85→0,06 (0,06),
   05 1,45→0,15 (0,01). Pari _tyo/linssiseppa2/maavalo1/maavalo-pari.jpg.

## PT:N PÄÄTÖKSET 14.4x–14.5x
- Kohta 4 (06 lattia) SULJETTU: lattia = pihan laatta (_JuoksuLaattaSavy); omistajan 27.10. "lämmin harmaa" pätee, ei muuteta.
- Puyin varjo valojuovassa katoaa: luonnollinen, ei korjata.
- SEURAAVA: salin varjon sävy lämpimämmäksi (nyt 158/161/174 vs havainne 159/148/152), pari PT:lle.

## KESKEN: salin varjon sävy (haara linssiseppa2/salilampo-218, wt/proto-linssiseppa2-seinat218)
- c47376e49: QA `valo salilampo k` (JuoksuValo.hlsl JuoksuSaliSisalla + JuoksuTaytto: salissa täyttö _JuoksuMaa:sta, ei ulkovarjon sävyä).
  salilampo1 (esikatselu-20261102-143715): EI VAIKUTUSTA (0,6 % pikseleistä) → täyttö on elävässä varjossa vain ~0,2 lattiasta.
- bab15c4a6: sama kerroin lattian ympäristöheijastukseen (JuoksuLattia: ymp → _JuoksuMaa · 0,35 salissa); epäilty sinertävyyden lähde =
  taivaan/kuution heijastus. salilampo2 (esikatselu-20261102-144323): EI VAIKUTUSTA (muu 159/160/173 → 160/162/173) → sinertävyys ei tule
  täytöstä eikä Lattian heijastuksesta. Kaksi committia (c47376e49, bab15c4a6) ovat siis turhia; poista tai korvaa.
- Jatko: selvitä ensin, mikä piirtää salin lattian 04:ssä (QA `valo pintatieto 4` keisarin sijainnissa -147.6 420.5: juhlasalin
  juhlasali_floor Maailma-varjostimella vai sokkelon Lattia) ja mistä sininen tulee: leivottu atlas × varjotaso (_JuoksuLeivonta.z),
  ympäristöheijastus Maailmassa tai jälkikäsittely (QA-vaihdoilla eristäen). Mittari juova.py (muu = varjon väri; tavoite ~159/148/152).
  Oletus ValoKohteet.JuoksuSaliLampo
  (nyt 0) mittauksen mukaan, rebase runkoon 218 23b37d035, pari (ennen | nyt | havainne, sama rajaus) PT:lle kuittaukseen.

## Muuta
- Runko 218 vaihtui pakettiversioihin (kielletty-tausta-v100, -rakennukset-v98); havainne-editori varoittaa vanhemmilla REF:eillä.
- Jono tämän jälkeen tyhjä → JONO TYHJÄ: Valoseppä PT:lle.
