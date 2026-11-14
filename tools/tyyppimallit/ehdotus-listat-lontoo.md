# Lontoon ASEMAT-, PALATSIT- ja PYLVÄSTEMPPELI-listaehdotus (Valoseppä 15.11.2026; luovutuksen "SITTEN", malli ehdotus-listat-pariisi.md)

Periaate (KK 23.25): harvinaiset tyypit vain nimilistalta. Rajaus: talojen alue (taulu-uusi.json 'lontoo' raja 51,465–51,535 / −0,215–0,015).
Rivit ovat tyypitys.py:n NIMILISTAT['lontoo']:ssa merkinnällä 'odottaa' (ehdotus), joten vientiin (.bytes, poisOsm) ne eivät mene ennen KK:n sanaa;
nykyinen vienti on tavulleen sama (L 405). Sovitus on laskettu samalla koodilla (palatsin_sovitus, AsemanHallit). Sivusuhde = pienin suorakaide.

## ASEMAT (malli: kaarihallit pitkän akselin suuntaan + julkisivu; halleja leveydestä 35–65 m per halli)
| ehdotus | OSM | ala m² | pohja m | sivusuhde | halleja | huom. |
|---|---|---|---|---|---|---|
| Paddington | way/947381552 | 30 205 | 346 × 139 | 2,49 | 3 | Brunelin kolme kaarihallia: oikea määrä |
| St Pancras | way/4256246 | 45 418 | 450 × 120 | 3,76 | 2 | oikeasti YKSI 73 m:n Barlow-halli + punatiilinen hotellijulkisivu; 2 hallia on lähin malli (yli 65 m ei sallita) |
| King's Cross | way/260720558 | 33 408 | 256 × 164 | 1,56 | 2 (lista) | kaksi hallia; sääntö antaisi 3, koska pohjassa länsihalli (2012) |
| Liverpool Street | way/4959629 | 22 888 | 239 × 120 | 2,00 | 2 | halli, OSM-pohja nimetön (51,5180 / −0,0817) |

EI listalle: Waterloo (445 × 244) ja Victoria (166 × 165): epäsäännöllinen pohja (täyttö 0,54 ja 0,46), lisäksi sahakatto eikä kaarihalli.
Cannon Street, Charing Cross ja Fenchurch Street: hallit purettu, toimistot raiteiden päällä; kaarihalli olisi väärä. Marylebone (90 × 32): pieni tiiliasema,
pientä asemamallia ei ole. Euston, London Bridge ja Blackfriars ovat moderneja. Muut 100 pientä asemaa ja metroasemaa jäävät perustaloiksi.

## PALATSIT (malli: palatsi-piha; umpipiha tai U, julkisivu käsin)
| ehdotus | OSM | ala m² | pohja m | sivusuhde | piha | julkisivu | huom. |
|---|---|---|---|---|---|---|---|
| Foreign Office | relation/78291 | 18 324 | 204 × 100 | 2,03 | umpi | itä (Whitehall), arvio | italialainen, sisäpihat |
| County Hall | relation/1789966 | 19 814 | 227 × 100 | 2,27 | umpi | länsi (Thames), arvio | Edwardian, kaareva jokijulkisivu ei näy mallissa |
| Somerset House | way/372841786 | 8 932 | 152 × 104 | 1,46 | U (+z auki) | pohjoinen (Strand) | paras ehdokas: klassinen sisäpiha |
| Burlington House | relation/3848545 | 8 616 | 128 × 73 | 1,75 | umpi | pohjoinen (Piccadilly) | Royal Academy, kunniapiha |
| St James's Palace | relation/545040 | 8 261 | 144 × 89 | 1,61 | umpi | pohjoinen (porttitorni) | TUDOR-TIILI: tyyli ei vastaa mallia (harkittava) |
| Old Admiralty | relation/20350084 | 6 638 | 102 × 99 | 1,03 | U (+x auki) | länsi, arvio | |
| Horse Guards | way/133153176 | 3 189 | 94 × 51 | 1,85 | umpi | itä (Whitehall) | keskikupoli ei näy mallissa |
| Lancaster House | way/4266524 | 1 972 | 48 × 47 | 1,02 | umpi | länsi, arvio | |
| Mansion House | way/33695114 | 1 957 | 66 × 30 | 2,20 | ei | itä (portiikki), arvio | pylväsportiikki ei näy |
| Spencer House | relation/16057566 | 1 272 | 50 × 37 | 1,35 | ei | länsi (Green Park) | |
| Marlborough House | way/161800467 | 1 290 | 39 × 36 | 1,08 | ei | pohjoinen, arvio | |
| Apsley House | way/120316250 | 893 | 36 × 30 | 1,20 | ei | itä, arvio | pieni |
| Banqueting House | way/140470549 | 852 | 42 × 21 | 1,99 | ei | itä (Whitehall) | pieni |
| Clarence House | way/54478457 | 762 | 30 × 30 | 1,02 | ei | etelä, arvio | pieni |

EI listalle: Lambeth Palace (kaksi sivua auki; keskiaikainen tiili), Wimbourne House (pieni), Bank of England (ikkunaton muuri), Guildhall (gotiikka).
Buckingham ja Kensington ovat ikoneita (ohitettu).

## PYLVÄSTEMPPELI
| Royal Exchange | way/367646970 | 3 714 | 83 × 54 | 1,52 | attika | huom: oikeasti portiikki vain länsipäädyssä, malli kiertää pylväät ympäri |

## Huomio KK:lle
- Palatsimalli on pariisilainen (mansardi, kulmapaviljongit). Lontoon palatseilla on matala katto ja kaide. Ehdotan katto-parametria (attika kuten pylvästemppelissä)
  toiselle kierrokselle. Ennen sitä mansardi näkyy kaikissa yllä olevissa.
- Hyväksyttäessä: 'odottaa' pois hyväksytyiltä riveiltä → tyypitys + vie.py → uusi .bytes ja poisOsm (KS:lle vasta lopullisesta).
