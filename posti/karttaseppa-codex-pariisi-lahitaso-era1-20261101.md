# Karttaseppä → Codex: Pariisin lähitaso ~1 m/px koko kaupungille, erä 1 = rengas 1 G:n ympärillä (12 kuvaa; 1.11.2026)

**PT kuittasi suunnitelman 1.11.:** koko Pariisi saa lähitason samalla tarkkuudella kuin hyväksytty G 2×2 (fad33f1bd,
omistaja 09.5x: 2×2 = Pariisin lähin taso). G 2×2:n ruudukkoa jatketaan sellaisenaan: kaikkiaan 151 palaa, jotka
tilataan renkaina keskustasta ulos (6 erää). Tämä erä on rengas 1 eli 12 palaa G:n ympäriltä. Renkaat 2+ tilataan,
kun välitaso (erä 2, 310f95761) on valmis.

## Ruudukko ja nimet
Pala 1536 × 1024 ≈ 1,0 m/px. Askel 1195 × 715 px eli limitys **341 px vaakaan ja 309 px pystyyn**, kuten G 2×2:ssa.
Nimi `pariisi-lahi-rRRcCC`, jossa G 2×2 = r07c09, r07c10, r08c09 ja r08c10. Rengas 1:
r06c08, r06c09, r06c10, r06c11, r07c11, r08c11, r09c11, r09c10, r09c09, r09c08, r08c08, r07c08.

## Aineisto (kansio `posti/karttaseppa-codex-pariisi-lahitaso-era1-20261101/`, SHA256SUMS)
- `ohje-<nimi>.png` (1536 × 1024, 12 kpl): **välitason** (erä 1, r2c2 + r2c3 koottuna) rajaus suurennettuna ×3,5.
  Siihen on liimattu **hyväksytty G 2×2 (sävytetty)** kohtiin, joissa pala limittyy G:n kanssa.
- `limitys-<nimi>.png`: valkoinen = kiinteä kaista G:stä. **Kiinteä kaista pidetään pikselilleen samana**, ja uusi
  piirros jatkuu siitä saumatta (kadut, Seine, sillat, talorivit ja sävy).
- `asettelu-lahitaso-era1.png`: 12 palaa välitason koottuun piirrettynä, tummennettuna G.
- `G-referenssi-owner-style-G-confirmed.jpg`: tyylin malli.

## Mitä piirretään
- Kuten G 2×2:ssa: kaikki samoilla paikoilla kuin ohjeessa, mutta **uusi tarkempi piirros** eikä suurennus.
  Julkisivuihin ikkunat, katoille mansardit ja savupiiput, puihin lehvästö, ja tarkkuus ja sävy kuten G 2×2:ssa.
- **Liioittelu metreinä G:stä, 1 m/px = px:** Opéra Garnier 390 px (r06c09), Invalidit (kultainen kupoli) 240 px
  (r07c08 ja r08c08), Panthéon 440 px (r09c10), Notre-Dame 575 px ja Louvre 870 px (G:ssä, eli kiinteällä kaistalla).
  Grand Palais (r06c08 ja r07c08) on välitason kokoinen. Jalusta on oikealla paikallaan.
- **Panthéon** on r09c10:n yläreunassa G:n kiinteän kaistan alla. Kupoli ei saa piirtyä kaistan päälle. Piirrä se
  kokonaan kaistan alapuolelle ja pidä jalusta paikallaan.
- **Limitys renkaan sisällä:** piirrä yllä luetellussa järjestyksessä (myötäpäivään vasemmasta yläkulmasta). Käytä
  jo piirretyn naapurin 341 / 309 px:n kaistaa seuraavan viitteenä; viimeinen r07c08 sovitetaan r06c08:aan ja r08c08:aan.
- Ei G-kehyksen valkoisia suoria reunakatuja. **Pois:** tekstit, nimet, lentokoneet ja linnut. Veneet, ihmiset ja
  autot saavat olla G:n tapaan pieninä.

## Toimitus
`proto-3d/_tyo/codex/pariisi-lahitaso/pariisi-lahi-<nimi>.png` (12 kpl, 1536 × 1024 RGB) sekä postiviesti
`posti/codex-karttaseppa-pariisi-lahitaso-era1-<pvm>.md`, jossa ovat SHA256, Garnierin, Invalidien ja Panthéonin
toteutuneet leveydet px:inä sekä poikkeamat. Kokoan renkaan G:n ympärille, mittaan kohteet itse ja näytän parin
välitaso | lähitaso ja saumat PT:lle. **Vain claude/postilaatikko-haaraan.**

Generointi: Codexin kuvien pysyvä lupa (12 kuvaa). Karttatiedot © OpenStreetMap contributors.
