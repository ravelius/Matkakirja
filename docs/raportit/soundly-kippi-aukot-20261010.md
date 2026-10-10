# Kipin (pallon kaupunkiäänet) Soundly-erät eristysportissa (Pelikoodari 10.10.2026 klo 22.5x)

Erät: NAS `aanet/soundly/era1-pallo` (9.10., 98 WAV) ja aukkohaku `aanet/soundly/erapallo2` (10.10. 22.09–22.16, 15 WAV,
haut `_tyo/soundly-erat/tyolista.tsv` erä pallo2). Portti: `_tyo/soundly-erat/pallo-portti.py` (Sonniss-portin ehdot +
aihekohtaiset lisäehdot; `ERA=pallo2` toiselle erälle). Tulokset `pallo-portti.json` ja `pallo2-portti.json` (+ .log).
Kellojen käsintarkistus: `lyonnit-kasin.py`. Omistaja 22.0x: puuttuvia ääniä EI osteta.

## Yhteenveto aiheittain (portin läpi / ladattu)

| aihe | erä 1 | pallo2 | käyttöön (LS1, juna 181) | huomio |
|---|---|---|---|---|
| Lokit | 10/12 | 1/2 | SND71958, SND71960, SND70834, SND80473, SND139146 (Tromssa, yksittäiset huudot) | erä 1:n 5 "Arctic Bird Island" -tiedostoa ovat etualalla merimetso (shag), lokit taustalla → EI lokkeina; SND50159 on varis → EI |
| Kyyhkyt ja siivet | 11/17 | – | kujerrus SND158213, SND1473, SND1616; siivet SND1800, SND1804 (häkki, siivet + kujerrus) | kansiossa myös lokkitiedostoja (myöhästyneet) → ei kyyhkyinä; SND103656 taustalla kukko, SND14470 pieni lintu |
| Tuuli (puhdas) | 0/22 | 0/8 | — AUKKO | ks. alla |
| Lyödyt kellot | 6/12 | 3/5 | tuntilyönnit SND91715 (11 lyöntiä, kaukainen, hiljainen yö), SND91623 (9 lyöntiä), SND44145 (Oslon kaupungintalo); yksittäiset lyönnit käsin: SND166807 (Unkari, 1 lyönti, soi 13,5 s, tausta −78 dB), SND76786 (iso kello, soi 7,4 s, tausta −74 dB); soitot SND63925, SND36819, SND162026, SND162022, SND102464/5 | portin "ei erottuvia tapahtumia" kaataa yksittäiset lyönnit (tunnistin hakee toistuvia iskuja) → käsintarkistus; putkikellot SND44525/30 ja huonekellot SND117928/9 eivät ole tornikelloja |
| Raitiovaunun kello | 5/15 | – | SND163543, SND89488, SND89417, SND89416 (sama vanha raitiovaunun kello eri mikrofoneilla → käytä 1–2), SND162015 | ohiajot (moottori/kiskot) hylätty kuten pitää |
| Pyörän kello | 7/8 | – | SND33601, SND34167, SND162019, SND162018, SND60571, SND105805 | SND53470 on Segway → EI |
| Laivan torvi | 8/12 | – | SND80459, SND54008, SND58480, SND148324, SND107400, SND4589, SND4590, SND4591 | kaukaiset 5, lähi 3 |

## Tuuli: 0/30 portin läpi

Hylkäyssyyt: mikrofonijyrinä (alle 80 Hz > 0,15), lehtien kahina (Rustling leaves ≥ 0,05), AST ei tunnista suunniteltua
"tonal/designed" -tuulta tuuleksi, ja puuskaiset tiedostot eivät täytä puhtaiden ikkunoiden ehtoa. Lähimmät:
- SND115731 "Steady Wind, Light Movement, Cold" (146 s): vain lehdet 0,06 (raja 0,05). Paras ehdokas.
- SND163829 / SND163830 "Hardelot, Airy, Steady Wind Noise": alle 80 Hz 0,18 / 0,21 ja puhtaita ikkunoita 5–6/40.
  80 Hz:n ylipäästö poistaisi jyrinän; ikkunaehto jäisi.
- SND1464 / SND1466 (aavikon raju tuuli): vain alle 80 Hz 0,82 / 0,80, mutta liian raju kipin taustaksi.
Ehdotus PT:lle: joko SND115731 poikkeuksena (lehdet 0,06) tai tuuli jää kipistä pois. Ei uusia ostoja (omistaja 22.0x).

## LISENSSI (Soundly SFX License 4.11.2024, luettu PDF:stä)

Pelikäyttö sallittu, ja julkaistu tuotanto pysyy lisensoituna. MUTTA: "If you create a video game Production, only the
version(s) … produced during the term … will be licensed": tilauksen päätyttyä pelin uusista PÄÄVERSIOISTA on poistettava
Soundly-äänet. Pelin jatkuva kehitys → joko tilaus jatkuu niin kauan kuin peliä kehitetään, tai Soundly-äänet vaihdetaan
ennen tilauksen loppua. Raakaäänien erillistä jakelua ei sallita (ämpäri ok osana peliä). Kaikki ladatut ovat Soundlyn omia
(SND-tunnus), ei Freesound-lisäkirjastoa. Peliin viemättömät tiedostot poistetaan NAS:lta, jos tilaus lopetetaan
(era1-pallo/LAHTEET.md).
