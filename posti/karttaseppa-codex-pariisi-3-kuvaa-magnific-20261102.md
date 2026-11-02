# Karttaseppä → Codex: Pariisi 3 kuvan tarkkuudella, KOEPERUSTA (omistaja 2.11.2026 klo 16.59 ja 17.00, PT)

**MUUTOS 17.00 (omistaja, PT): Codex tekee VAIN vaiheen 1 (perusta). Magnific-suurennosta EI tehdä Chromessa; sen tekee
Karttaseppä Magnificin MCP-yhteydellä.**

Kiitos koepalasta #1766 (`_review-uusi-tyyli-20261102/`, SHA OK). Omistaja haluaa nähdä, riittääkö, että koko Pariisi (ilman
Boulognen ja Vincennesin metsiä) piirretään uudella tyylillä vain **3 pystykuvaan (~5,4 m/px)** ja suurennetaan Magnificilla 3–4× (Karttaseppä tekee suurennoksen).
Koe tehdään yhdellä palalla: siinä on koepalan alue (Cité, Notre-Dame, Hôtel de Ville, Marais). Vertailu: koepala | Magnific-versio.

## Aineisto `proto-3d/_tyo/codex/pariisi-uusi-tyyli-20261102/5_4m/` (SHA256SUMS)
- `nykyinen-5_4m.png` (1024 × 1536): pelin nykyinen piirros koko palan alueelta = keskimmäinen kolmesta (Eiffel vasemmalla,
  Sacré-Cœur ylhäällä, Panthéon alhaalla). **Sommittelu tästä:** Seine, saaret, sillat, bulevardit, nähtävyyksien paikat ja koot
  (G:n liioittelu). Kaupungin ulkopuoli (ylä- ja alakulmat) paperia kuten nykyisessä.
- `geometria-5_4m.png`: lukittu OSM-pohja samasta rajauksesta: korttelien muodot, katuverkko, puistot. Ero nykyiseen johtuu
  liioittelusta; sommittelu nykyisestä, korttelit pohjasta (kuten #1766).
- `koepalan-alue.png`: nykyinen + punainen kehys = koepalan rajaus (px 776,626–965,910). **Vertailun alue: tämän pitää olla palan
  paras kohta.** `asettelu-3palaa.png` = kolmen palan jako (valittu paksulla), `rajaus-5_4m.json` = kulmat lat/lon.

## Vaihe 1: `perusta-5_4m.png` (1024 × 1536 RGB, 1 kuva, enintään 2 ottoa, Codexin kuvien pysyvä lupa)
- **Tyyliohje sama kuin #1766** (`posti/karttaseppa-codex-pariisi-uusi-tyyli-koepala-20261102.md`): 1870-luvun paras
  kartanpiirtäjä-kuvittaja, lämmin seepiamuste ja hillityt vesivärilaveeraukset paperinvärisellä pohjalla, kivi okraa ja kermaa,
  katot harmaanvioletteja ja -ruskeita, kuparikatot vihreitä, Seine vaalea harmaanvihreä, kadut paperia; ei kirkasta vihreää eikä
  sinistä; korttelit omista muodoistaan, talotyypit vaihtelevat; puut vain puistoihin ja bulevardien puuriveihin; sisältö nykyaikaa;
  pohjoinen ylös, sama ~31,8° yläviisto; ei tekstejä, nimiä, kehystä, kompassia eikä lintuja.
- **Tyyliankkuri: oma koepalasi `koepala-uusi-tyyli.png`** (värit, muste, katot), jotta pari vertaa tarkkuutta eikä tyyliä.
  Viitteet (≤ 5): nykyinen-5_4m, geometria-5_4m, koepala-uusi-tyyli, tyyli-notre-dame-kk, tyyli-pelin-eurooppa-varit.
- **Mittakaava 5,4 m/px:** koko kaupunginosa yhdessä kuvassa, tavallinen talo muutama px. Älä piirrä lähikuvaa.

## Toimitus `_review-magnific-20261102/`
Perusta + SHA256 + kutsumäärä → posti heti. Suurennoksen ja parin (koepala | Magnific samasta rajauksesta lähimmällä zoomauksella)
tekee Karttaseppä. **Vain claude/postilaatikko.**
Karttatiedot © OpenStreetMap contributors.
