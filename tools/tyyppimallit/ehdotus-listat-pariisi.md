# Pariisin ASEMAT- ja PALATSIT-listaehdotus (Valoseppä 14.11.2026, KK 23.25 työ B)

Periaate (KK 23.25): harvinaiset tyypit vain nimilistalta; säännön löytämät, listan ulkopuoliset = ei sovi (perustalo jää).
Lista on tyypitys.py:n NIMILISTAT['pariisi'] -sanakirjassa merkinnällä "ehdotus"; KK:n hyväksynnän jälkeen tila → "hyväksytty".
Sivusuhde = pienimmän suorakaiteen pituus / leveys, täyttö = ala / suorakaide.

## ASEMAT (malli: hallikatto pitkän akselin suuntaan + julkisivu)
| ehdotus | OSM | ala m² | pohja m | sivusuhde | sopiiko pohja |
|---|---|---|---|---|---|
| Gare d'Austerlitz | way/62380197 | 25 311 | 289 × 119 | 2,43 | kyllä |
| Gare de l'Est (halli; OSM-pohja nimetön, 48,8770 / 2,3594, round_gabled) | way/280670907 | 18 511 | 202 × 114 | 1,77 | kyllä |
| Gare du Nord (halli; nimetön pohja 48,8810 / 2,3554, gabled) | way/63197091 | 23 629 | 185 × 137 | 1,35 | melkein: halli leveämpi kuin malli |

EI listalle:
- Gare Saint-Lazare (way/727994377, 249 × 247, 1,01) ja Gare de Lyon (way/1161318094, 217 × 181, 1,20): leveä hallikortteli, yksi 60 m:n halli ei täytä.
  EHDOTUS myöhemmin: asemamallille parametri halleja (1–3 rinnakkaista kaarta), kuten tornin parametrit; sitten molemmat listalle.
- Gare du Nord -julkisivurakennus (way/63195471, täyttö 0,23): ei sovi; halli yllä kantaa aseman.
- Montparnasse (halli 1, 2, 3; 1969) ja Bercy: moderneja, ei hallikattoa.
- 72 pientä asemaa ja metroasemaa (Glacière, Metro Nationale, Villejuif, Saint-Denis–Pleyel, Petite Ceinture -asemat …): pientä asemamallia ei ole;
  hallimalli olisi väärä. Perustalo. Petite Ceinturen vanhat asemat (Pont Cardinet, Avenue Henri-Martin, Neuilly–Porte Maillot, Montrouge-Ceinture,
  Vaugirard-Ceinture) ovat ehdokkaita, jos KK haluaa pienen asematyypin.

## PALATSIT (malli: suorakaide, mansardi, kulmapaviljongit, keskirisaliitti)
| ehdotus | OSM | ala m² | pohja m | sivusuhde | huom. |
|---|---|---|---|---|---|
| Palais Bourbon | relation/1019368 | 17 054 | 192 × 132 | 1,45 | iso, pihallinen |
| Palais du Luxembourg | relation/975955 | 12 095 | 150 × 119 | 1,26 | |
| Hôtel de Ville | relation/284089 | 11 728 | 144 × 89 | 1,62 | sääntö ei löytänyt (civic) |
| Palais de l'Élysée | relation/1060803 | 8 108 | 122 × 106 | 1,14 | pihallinen hôtel |
| Hôtel de la Marine | relation/1060822 | 5 636 | 94 × 65 | 1,44 | Concorden pari |
| Palais de la Légion d'Honneur (Hôtel de Salm) | relation/1002192 | 4 196 | 84 × 70 | 1,19 | |
| Palais Cambon (Cour des comptes) | relation/542460 | 4 176 | 85 × 57 | 1,51 | |
| Hôtel de Matignon | relation/1076880 | 3 747 | 74 × 62 | 1,21 | |
| Hôtel de Crillon | relation/1060804 | 2 747 | 91 × 32 | 2,83 | Concorden pari |
| Quai d'Orsay (ministère) | way/448794899 | 2 198 | 78 × 39 | 2,00 | |
| Château de la Muette | way/83203039 | 1 785 | 54 × 51 | 1,06 | |
| Hôtel de Lassay | way/175448743 | 1 234 | 58 × 22 | 2,61 | |

EI listalle: Palais de Justice (35 990 m², koko saari-kortteli), Palais de Chaillot, Alma, Iéna, Tokyo, Porte Dorée (1930-luku tai epäsäännöllinen),
Palais des Congrès ×2, Palais des Sports ×7, Palais de la Femme, Hôtel Élysée Palace (hotelli), Palais Galliera, Hôtel de Sens (keskiaikainen),
Château de Réghat, Banque de France (21 595 m², kortteli), Bourse de Commerce (pyöreä). Palais Brongniart → PYLVÄSTEMPPELI (työ C).

## PYLVÄSTEMPPELI (työ C; ehdotus samalla periaatteella)
| Madeleine | way/54180046 | 5 562 | 129 × 43 | 2,97 | harja, 8 päädyssä |
| Palais Brongniart | way/54657155 | 4 798 | 79 × 72 | 1,11 | attika; pohja lähes neliö → pylväskehä sovitetaan pohjaan |

## Huomio KK:lle
- PALAIS-ROYAL (relation/3300400, building=palace, 14 340 m²) on ohitettu IKONINA, koska se on Louvren ikonisäteen (320 m) sisällä.
  Jos Louvren koodimalli ei kata sitä, säde pitää pienentää tai Palais-Royal lisätä palatsilistalle. (Ei muutettu.)
- Institut de France ei ole enää ehdokas lainkaan (building=public, ei listalla) → perustalo jää, kuten KK päätti.
