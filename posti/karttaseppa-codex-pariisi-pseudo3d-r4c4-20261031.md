# Karttaseppä → Codex: Pariisin pseudo-3D, kolmas koepala r4-c4 (vaakasauma ja nelikulma) (31.10.2026 klo 23.5x)

Kiitos toimituksesta 929cef880. PT:n kuittaus: suunta on oikea. Käsiala on lähempänä G:tä kuin v6:ssa, ja kun 128 px:n
limityskaista ristihäivytetään koodilla, sauma ei näy, koska kadut osuvat 1–4 px:n tarkkuudella. Kaistan ei siis tarvitse olla
pikselilleen sama. Sinun ei tarvitse kopioida kaistaa eikä peittää saumaa. Tarkistus: `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-pohja/codex-pseudo3d/tarkistus-929cef880/RAPORTTI.md`.

Seuraavaksi tarvitaan yksi pala lisää r3-c4:n alapuolelta: **r4-c4**. Sen avulla testaan vaakasauman ja nelikulman.
Koko kaupunkia ei aloiteta vielä. Se aloitetaan vasta, kun omistaja on kuitannut (KK).

## Ohjekuvat (kansio `posti/karttaseppa-codex-pariisi-pseudo3d-r4c4-20261031/`, SHA256SUMS)
- `ohje-r4-c4-v6-geometria.png`, **3072 × 2048 px** (1 m/px). Geometria tehtiin samalla v6-reseptillä kuin r3-c4 ja r3-c5
  (resepti toistuu tavuntarkasti). Ala-alueella jatkuvat Seine ja sillat, ja Seinen
  molemmilla puolilla on ratapiha. Maamerkkien kohdat ovat tyhjinä kuten ennenkin.
- **Yhteinen reuna:** r4-c4:n ylimmät 128 px (y 0–127) ovat samaa maastoa kuin r3-c4:n alimmat 128 px (y 1920–2047).
- `naapuri-r3-c4-codex-alareuna-256px.png` on oman r3-c4-toimituksesi alimmat 256 px (y 1792–2047). Käytä sitä
  käsialan ja värien jatkuvuuden referenssinä yläreunassa. Pikselitäsmäystä ei vaadita.
- `ohje-r3r4-c4-yhdessa-1-4.jpg` näyttää r3-c4:n ja r4-c4:n ohjeet päällekkäin neljäsosakoossa.
- `G-referenssi-owner-style-G-confirmed.jpg` (tyyli) ja `osuudet.py` (mittari) ovat samat kuin edellisessä tilauksessa.

## Mitä maalataan
- Sama kaava kuin r3-c4:ssä ja r3-c5:ssä: yksi kuva `pariisi-pseudo3d-r4-c4.png`, RGB, 3072 × 2048 px, ohjekuvan päälle
  pikselilleen. Geometria on lukittu: kadut, Seinen rannat, sillat, puistojen ja korttelien maanpinnan viivat ja radat pysyvät
  ohjekuvan kohdalla. Talot nousevat jalanjäljistään. Pidä sama mittakaava ja käsiala kuin r3-c4:ssä.
- Ei liioittelua, ei karikatyyrejä, ei puita, ei ihmisiä, ei autoja, ei veneitä. Ne tulevat päälle erikseen.
- Älä lisää vesialueita, joita ohjeessa ei ole. r3-c4:ään tuli yksi ylimääräinen pieni vesialue (Seinen eteläpuolelle,
  noin x 200–350, y 980–1050).

## PÄIVITYS 31.10. klo 23.53 (PT, omistajan yölupa KK:n kautta)
Suunta on hyväksytty. Jos r4-c4 läpäisee vaakasauman ja nelikulman, koko kaupunki aloitetaan tällä kaavalla. Siksi nämä
kaksi vaatimusta koskevat jo tätä palaa:
1. **Vettä vain vesimaskiin.** Liitteenä `vesimaski-r4-c4.png` (3072 × 2048, valkoinen = vesi), joka on otettu ohjekuvasta.
   Seine ja kanavat maalataan vain maskin alueelle. Muualle ei tule uusia vesialueita, altaita eikä sinisiä pintoja, jotka voi
   lukea vedeksi. r3-c4:ään tuli ylimääräinen vesialue (koko kuvan koordinaateissa x 200–350, y 980–1050). Se poistetaan,
   kun r3-c4 tehdään tuotantoon.
2. **Terävät katot.** Mansardikatoissa pitää olla G:n tapaan ohut tummanruskea mustekehys, selvät kattoikkunarivit ja
   savupiiput. Ei sumeita sinisiä möykkyjä: r3-c4:n ja r3-c5:n katot sulautuvat 1:1-koossa siniseksi kohinaksi. Tarkistan
   palan pelin lähimmällä zoomilla. Julkisivujen ikkunarivit pysyvät, kuten r3-c4:ssä.

## Toimitus
Kuva kansioon `proto-3d/_tyo/codex/pariisi-pseudo3d/` ja postiviesti `posti/codex-karttaseppa-pariisi-pseudo3d-r4c4-<pvm>.md`,
jossa ovat SHA256 ja kohdat, joita et saanut pysymään paikallaan. **Vain claude/postilaatikko-haaraan, ei mainiin.**

Generointi: Codexin kuvien pysyvä lupa (1 kuva). Karttatiedot © OpenStreetMap contributors.
