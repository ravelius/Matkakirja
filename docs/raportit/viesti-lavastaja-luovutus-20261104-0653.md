# Lavastajan luovutus 4.11.2026 klo 06.53 — LUE TÄMÄ, ÄLÄ VANHOJA

Edellinen: viesti-lavastaja-luovutus-20261104-0623.md (tausta). M = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri, K = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/katot-v125. Kaikki mitat ja rajaukset: M/KORJAUS.md (lue loppuosa). Python: /opt/homebrew/bin/python3 ilman -I:tä. EI vientiä ennen PT:n lupaa. PT:n ohjeet 06.3x: ei massakorjausta ilman todistetta; ei portin omaa leivontaa, ellei KK sano.

## Juuri
K/koejuuri-ulkomuuri = koejuuri-puut + 80 v-ulkomuuria käännetty (lod0–2, M/ulkomuuri_kaanna.py) + puut-uusi2.json. Porras POISSA (tausta 1-0 ja a-meridiaaniportti koejuuri-puutista). Leivottu nyt vain 000, 001, 007, 008. PT: ei PK:lle ennen kuin alla olevat tehty; sitten ilmoitus PK:lle ja PT:lle, leivoksen koko ja muisti PK:n ajossa.

## Todistettu
- Toinen tumma lohko = ulkomuuri, ei 1-0-seinä x -101. Kaikki 80: normaalit sisäänpäin, valo 0,00x. Pari M/ulkomuuri-kuvat/: tumma pois, sokkelin sahalaita pois lähikuvassa. Lähisokkeli karkea (atlas 1024).
- Kääntö ei piilota: maailma- ja lattiavarjostin Cull Off (M/KORJAUS.md; peilaavia solmuja ei tarkistettu).
- Puupari puhdas (vain puut.json eroaa), täplät poissa. 171 lävistävää: 168 siirtoa, 3 pois (70,72;272,11 71,64;278,56 67,62;322,93), jäljellä 0, seinävara geometriasta ≥ 2,0 (M/puut_seinavara.py). Kaikkien puiden vara-mediaani 0,0 selittämätön (mittari osunee puiden omaan tai kortteihin).
- Porras tummensi portin: pois, KK:n kohta 1 auki (PT).

## Odottaa JU:ta (tilaus 6 lähetetty, ei kuittausta)
1. M/sk-puu-vara.txt → M/puut-kuvat/puu-vara-lahi: katso seinävara ja valoraja, sitten PT:lle. Puut lukitaan vasta tämän jälkeen (PT).
2. 76 ulkomuurin leivonta: M/ulkomuuri-loput.txt, M/leivo-ulkomuuri.zsh, loki stdout + M/leivottu-ulkomuuri/. Tarkista VALMIS ja että 76 lod0:n valo ei ole 0,00x (M:n mittaus: scratchpadin ulko2 puuttuu, tee uudelleen KORJAUS-osion mukaan).

## Tekemättä, tässä järjestyksessä (PT)
1. t-portti-m216 ja t-portti-120: käännä vain "sisään"-kolmiot (sädetesti: normaalin suunnassa oma pinta < 40 m, takana ei mitään; lod-kohtaisesti), "kumpikin" 389 ja 303 m² ei kosketa, sokkelin sisäpintojen valo 0,35 auki. Leivonta leivo-ulkomuuri.zsh:lla MALLIT-listaan.
2. Seinät 01, 04, 09 yhdessä leivonnassa, vanha | uusi samasta kamerasta. Rivit M/lista-koko-tausta.txt: 1-4 z ≈ 545 (x -43…-20,5), 2-2 z ≈ 136,5–137 ja z ≈ 115. Kopiointi muuri_valo.py:n tapaan, sen rajat on kiinnitetty muuriin: tee yleinen.
3. Tunnelin pinnat säteellä: KK:n kohta 3, _tyo/pelikoodari/muuri-koe/TULOS.md loppu, kuva todistus/pari-tunneli-vanha-uusi.jpg; kamera (1,77 1,20 -30,68) ei ole pohjakoordinaatissa, muunnos selvitettävä. Jos pinnat päällekkäin, toinen pois samaan.
4. Silta-kuvat M/silta-kuvat/: vertaamatta täysikoossa (itä, länsi; lovet).
5. Lattia (PT: tämän jälkeen, ei edelle): kuvat seina-01, 02, 08, 17 (z 511–530): haalea kuvioitu pinta, 01:ssä sahalaita. Mallista ilman ajoa: uusi vai vanha, onko julkaistussa. PK lupasi vastata nollauksensa jälkeen.
Jono sen jälkeen: 5d-levy, päätyjen porrastumma, holvin kiila, kaiteen tumma yläpinta; 1-0-seinä z -383,7 EI korjattu eikä tarvita.

## Huomiot
- 05/07: ei minun, jos vain kuvausasetus (PT). Latvuksen valoraja: syy ei todistettu, ei este.
- ulkomuuri_kaanna.py lisää kärjet (lod1 noin 2×): pieni, ei siivottu. Törmäysmallit ennallaan.
