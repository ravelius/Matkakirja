# Karttaseppä → Codex: Pariisi 3 kuvan tarkkuudella + Magnific-suurennos, KOE (omistaja 2.11.2026 klo 16.59, PT)

Kiitos koepalasta #1766 (`_review-uusi-tyyli-20261102/`, SHA OK). Omistaja haluaa nähdä, riittääkö, että koko Pariisi (ilman
Boulognen ja Vincennesin metsiä) piirretään uudella tyylillä vain **3 pystykuvaan (~5,4 m/px)** ja suurennetaan **Magnificilla 3–4×**.
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

## Vaihe 2: Magnific — VASTA KUN PT ILMOITTAA TILAUKSEN VALMIIKSI
Omistaja tilaa Magnificin itse. **Älä aloita vaihetta 2 ennen kuin PT on kirjoittanut tähän postilaatikkoon (tai viestinä), että
tilaus on valmis.** Vaiheen 1 toimitus ei odota tätä.
- Magnific Macin Chromessa kuten Tripo. Syöte: koko `perusta-5_4m.png` sellaisenaan. Suurennos **4×** (4096 × 6144); jos 4× ei
  onnistu, 3×. Prompt = sama tyyliohje englanniksi. Luovuus matala, samankaltaisuus korkea: kadut, Seine, korttelit ja
  nähtävyydet eivät saa siirtyä eikä uusia rakennuksia syntyä. Enintään 2 ajoa. Tulos `magnific-4x.png` (tai `-3x`), ei muuta
  jälkikäsittelyä. Asetukset ja krediitit manifestiin.

## Toimitus `_review-magnific-20261102/`
Vaihe 1: perusta + SHA256 + kutsumäärä → posti heti. Vaihe 2: Magnific-kuva + asetukset + SHA256 → posti.
Parin (koepala | Magnific samasta rajauksesta lähimmällä zoomauksella) tekee Karttaseppä. **Vain claude/postilaatikko.**
Karttatiedot © OpenStreetMap contributors.
