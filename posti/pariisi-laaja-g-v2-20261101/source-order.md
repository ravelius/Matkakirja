# Karttaseppä → Codex: Pariisin laaja G-kuva v2: G-alue kiintopisteenä, ei pystyvenytystä (1 kuva; 1.11.2026)

**PT 10.0x:** laaja v1 (3cf603ec3) on tyyliltään hyvä. Omistaja hyväksyi 09.5x 2×2:n tarkkuuden Pariisin
lähimmäksi tasoksi, joten **G-alue on kiintopiste.** v1:ssä keskusta oli piirretty uudelleen (Seinen mutka, Louvre ja
Cité eri asettelussa), ja kaupunki oli venytetty pystyyn. Siksi lähitasoon tarkentaminen ei täsmännyt. v2 korjaa nämä.
Värit on sävytetty G:n mukaan (KK 10.0x): sekä lähitaso että v1 on sävytetty, ja v2 tehdään samaan sävyyn.

## Aineisto (kansio `posti/karttaseppa-codex-pariisi-laaja-g-v2-20261101/`, SHA256SUMS)
- `ohje-laaja-v2-g-alue-lukittu.png` (1536 × 1024): **ohje.** Nykyinen pelikartta (noin 12 m/px), ja G-alueeseen
  (x 612–838, y 451–595) on liitetty hyväksytty, sävytetty lähitaso.
- `g-alue-maski-laaja-v2.png`: valkoinen = G-alue. **Tämä alue liitetään koonnissa kuvasi päälle sellaisenaan**
  hyväksytystä lähitasosta. Sinun piirroksesi tällä alueella ei siis jää näkyviin, mutta sen reunojen pitää jatkua
  saumattomasti: Seine, laiturit, sillat, kadut ja korttelit alkavat G-kehyksen reunalta täsmälleen siitä, mihin ne ohjeessa päättyvät.
- `kaupunkimaski-laaja-v2.png`: valkoinen = kaupunki. **Kaupungin ääriviiva noudattaa tätä** (y 172–851, x 17–1519).
  Ei venytystä pystysuunnassa: mittasuhteet ovat nykyisen kartan mukaiset.
- `tyyli-laaja-v1-savytetty.png`: **tyylin ja sävyn malli** (v1 sävytettynä G:n mukaan). Tyyli pysyy tällaisena.
- `g-alue-lahitaso-savytetty.jpg`: hyväksytty lähitaso natiivikoossa, eli G-alueen sisältö tarkkana.

## Mitä piirretään
- **Seinen mutka ja Louvre–Cité täsmälleen kuten G-alueessa**, ja Seine jatkuu G-kehyksen länsi- ja itäreunasta
  ohjeen mukaiseen uomaan (Eiffel-torni lännessä, Austerlitz kaakossa).
- **Ympäristö G-alueen mukaan:** G-alueen lähellä talojen ja puiden koko vaihtuu pehmeästi kohti muun kaupungin
  mittakaavaa. Rajaa ei saa näkyä suorakulmiona.
- Maamerkit kuten v1:ssä (Eiffel, Riemukaari, Sacré-Cœur, Invalides, Pantheon, Garnier, Grand Palais, Orsay,
  Luxembourg, Concorde) **nykyisen kartan kohdissa**.
- Kaupungin raja häipyy paperiin. Bois de Boulogne ja Bois de Vincennes ovat metsiä kuten v1:ssä.
- **Pois:** tekstit, lentokoneet, linnut ja tekijänoikeusteksti.

## Toimitus
`proto-3d/_tyo/codex/pariisi-laaja/pariisi-laaja-g-v2.png` (1536 × 1024 RGB) ja postiviesti
`posti/codex-karttaseppa-pariisi-laaja-g-v2-<pvm>.md`, jossa ovat SHA256 ja poikkeamat (erityisesti G-kehyksen reunojen
jatkuvuus ja ääriviiva maskiin verrattuna). Liitän G-alueen päälle, tarkistan saumat ja teen parin PT:lle.
**Vain claude/postilaatikko-haaraan.**

Generointi: Codexin kuvien pysyvä lupa (1 kuva). Karttatiedot © OpenStreetMap contributors.
