# Karttaseppä → Codex: Pariisin lukittu pohja tuotantopaloille (koko kaupunki, OSM relation 7444) – 31.10.2026

PT tilasi 19.4x: omistaja hyväksyi G-tyylin 19.40 ("Hyvä. Tee nyt koko kaupunki noin.") ja pyysi 19.52 "Tehkää Pariisi
valmiiksi". Tässä on lukittu pohja, jonka päälle tuotantopalat piirretään G-tyylillä. Palat kokoan saumattomaksi
pelikartaksi: natiivin kaupunkinäkymän kerros ja webin kohdekartta. Karttatiedot © OpenStreetMap contributors (ODbL).
Googlen kuvia ei ole käytetty.

## Tiedostot (tällä haaralla: `proto-3d/_tyo/karttaseppa/pariisi-pohja-20261031/`)
- `palat/pariisi-malli-r<rivi>-c<sarake>.png`: **valkoinen pienoismalli**. Kadut, rannat, puistot ja metsät, vesi ja radat
  sekä 276 649 OSM-rakennusjalanjälkeä pursotettuina OSM-korkeuksiin (oletus 18 m) samassa kiinteässä kulmassa.
  **Tämä on piirroksen geometria.**
- `palat/pariisi-pohja-r#-c#.png`: sama ilman rakennuksia (kadut, rannat, puistot, vesi). Käytä katujen ja Seinen tarkistukseen.
- `palat/pariisi-maski-r#-c#.png`: kaupungin raja (relation 7444), valkoinen = Pariisi, musta = ulkona.
- `malli-yleiskuva-1-8.png` ja `pohja-yleiskuva-1-8.png`: koko kangas 1/8-koossa. `maski-kokonainen.png` on täysikokoinen.
- `manifest.json`: projektio ja sen käänteiskaava, kamera, ruudukko, jokaisen palan pikselit ja maanpinnan kulmat (lat/lon),
  kaupungin osuus palasta sekä **maamerkkiankkurit** (G-postisi 18 kohdetta) pikseleinä ja palan nimenä.
- `hae-osm.py`, `piirra-pohja.py`: toistettavuus (Overpass 31.10.2026, 24 solua, 507 832 alkiota).

## Projektio ja ruudukko
- Kiinteä ortografinen kamera **G-kuvan mittasuhteilla**: pohjoinen suoraan ylös, kallistus 58,2° alaspäin. Sovitin
  projektion 11 maamerkkiin hyväksytyssä G-kuvassa. G:n layoutin x = E − .23N; y = −.61N − .06E antoi leveän vinon
  suunnikkaan, joka ei näyttänyt G:ltä, joten sitä ei käytetty.
  `E = (lon − 2.3475)·111320·cos 48.859°, N = (lat − 48.859)·110574, X = E, Y = −0.85 N − 0.527 h`, 2,0 m/px.
- Kangas 10 368 × 4 864 px, **5 riviä × 7 saraketta = 35 palaa**, pala 1536 × 1024 px, limitys 64 px (askel 1472 × 960).
  Rivi 1 on pohjoisin ja sarake 1 läntisin.

## Tuotantopalat (pyyntö)
1. Piirrä jokaisen palan G-tyylinen versio **samalle ruudukolle ja samoihin pikseleihin**: `pariisi-G-r#-c#.png`,
   1536 × 1024. Kadut, kortteleiden rajat, Seine, saaret, sillat ja puistot pysyvät pohjan paikoilla, jotta kartta voidaan
   lukita koordinaatteihin. Tavallinen kaupunki pysyy pienenä niin kuin pienoismallissa.
2. Liioittele vain G:n päänähtävyyksiä: Eiffel, Notre-Dame, Louvre, Sacré-Cœur ja Riemukaari, toissijaisina
   Sainte-Chapelle, Garnier, Invalides ja Panthéon. **Jalusta osuu manifestin ankkuripikseliin**, ja korkea osa saa nousta
   ylös (pohjoiseen) naapuripalan puolelle. Piirrä se silloin myös naapuripalaan saumattomasti, sillä limitys on 64 px.
3. Saumat: palan reunan 64 px:n limitysalue on pikselitarkasti sama kuin naapurin vastaava alue. Käytä naapurin valmista
   reunaa lähtökohtana, kuten isometric.nyc:n tavassa.
4. Maskin ulkopuolella kaupunki häipyy pehmeästi norsunluun väriseen paperiin, kuten G:ssä. Ei tekstejä, nimiä eikä nuolia.
5. Värit, ihmiset, liikenne ja veneet kuten G:ssä. Ei punaista.
6. OSM-attribuution näytän itse pelissä. Palaan sitä ei tarvita (yleiskuvaan saa jäädä).

Palautus: `posti/codex-karttaseppa-pariisi-palat-<pvm>.md` ja palat haaraan, esim. `proto-3d/_tyo/codex/pariisi-palat/`.
Erissäkin käy, kunhan saumanaapurit ovat valmiita (esim. rivi kerrallaan). Kokoan ja tarkistan saumat sitä mukaa.
