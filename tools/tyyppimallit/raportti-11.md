# Raportti 11 (Valoseppä 15.11.2026 klo 07.xx): KK 06.20 päätös B – asemahallit pohjan sisään, yleinen sääntö

## Mitä muuttui
- hallit.py (4e35c01086) laskee jokaiselle asemalle OSM-pohjasta: akseli (julkisivu −x kohti pelin origoa, ±10°), mallin keskipiste
  (merkki siirretään pohjan suorakaiteen keskelle), L, W, kaistat halleja…5 ja kunkin kaistan alku/loppu; halli pois, jos pätkä < kaistan leveys.
- vie.py: tyyppi 7 = (7, a = halleja | julkisivukaistat << 3, b, c, L, W, kattoväri, p3 RAAKOINA tavuina, varattu); merkin x z = enu(keski) + siirto,
  akseli hallit.py:stä. Muut rivit ja merkit tavulleen ennallaan (Pariisi 271, Lontoo 429; vain 5 + 4 asemamerkkiä ja asemarivit muuttuivat).
  Pariisi 13717a05…, Lontoo e5cb3e60…; poisOsm ennallaan (sama kuin KS:lle 06.2x).
- Peli: MerkkiTiedosto.Malli.P3Bitit/Varattu; TyyppiMalli(…, p3Bitit, varattu); MalliAsema purkaa kaistat; uusi TyAsema(halleja, leveys, alku[], loppu[],
  julkisivu[], lisa, katto): julkisivu vain julkisivukaistojen eteen, kellopääty keskimmäisen julkisivukaistan kohdalla, muilla kaistoilla lasipääty
  molemmissa päissä, sivuseinät kaistoittain. Vanha TyyppiAsema kutsuu TyAsemaa: TAVULLEEN SAMA.

## Löydös (syy läpi pistäviin kattoihin)
Vanha asemamalli EI OLLUT KESKITETTY: x = −16 … L − 16, merkki pohjan keskellä → hallit puoli pituutta sivussa; Saint-Lazaressa julkisivu lisäksi väärässä päässä.

## Asemat (pituudet m kaistoittain, – = pois)
Saint-Lazare [–,194,182,176,–] | Lyon [179,179,175,54,–] | Austerlitz [108,261,261,101,–] | way/63197091 [153,153,154,154,–] | way/280670907 [72,168,154,–]
St Pancras [228,425,425,–] | King's Cross [224,–] (lista 2) | Paddington [–,200,214,225,–] | way/4959629 [–,202,202,202,–]. Tarkemmin: tulos/vienti-<k>.json 'asemat'.

## Testit (nimeltä)
- testi_hallit.py (uusi; geometria hallit.pura():sta + merkin akseli/paikka .bytes:stä, talolähteet, pois oma talo ja poisOsm, näytteet 2 m):
  naapuritaloja hallien + julkisivun alla UUSI / VANHA m²:
  Lyon 0 / 1 852, way/280670907 0 / 1 956, Austerlitz 0 / 4 856, way/63197091 24 / 156, Saint-Lazare 0 / 13 488,
  King's Cross 0 / 7 608, St Pancras 0 / 11 364, way/4959629 0 / 7 724, Paddington 0 / 14 068.
  Toleranssi 30 m² ja syvyys 0,5 m / asema: way/63197091 24 m² on reunakosketus Gare du Nordin rakennukseen (way/63195471), syvyys 0,40 m
  (pohjan 0,1 m:n pyöristys + 1 m:n rasteri + u8-kvantisointi). LÄPI 9/9. tulos/testi-hallit.json.
  Saint-Lazaren OMAN pohjan sisällä on kolme muuta OSM-rakennusta (maanalaiset liikkeet Calzedonia 52 m² ja Pierre Hermé 24 m², kävelysilta
  Passerelle Eugénie 12 m²): eivät naapureita, raportoidaan erikseen ('sisalla').
- Kartta-testit TyyppimallitTestit.AsemahallitKaistojenSisalla (uusi): pelin tiedostojen 9 asemariviä, verkon jokainen kärki kaistan/julkisivun sisällä
  ±1,5 m (z:ssa + ripojen ulkonema 0,04 × kaista/2, vanha malli samoin). Kartta 855/855.
- Linssit-testit TyyppiMerkitTestit: P3Bitit/Varattu-purku (JasennysJaPaikka) ja asemarivien kaistatavut (PelinTiedostot). 2340/2340.
- Tiiviste (Luonnos.dll tiiviste tulos/mallirivit-b.tsv): 43 verkkometodia + 48 pelin MK01-riviä + 8 lisäasemariviä = 99/99 tavulleen samat
  ennen/jälkeen; 28 luonnos-OBJ:ia samat. testi_kattovari OK (P #949EAA, L #A88C74). unity-tarkistus 0 virhettä.
