# Karttaseppä → Codex: Pariisin keskusta 0,5 m/px, loput 26 palaa (1.11.2026)

**Erä 1 (1ef624c9e) on hyväksytty** (kuittaus 525f8c489; PT 1.11. klo 07.1x): 0,5 m/px on selvästi terävämpi, saumat eivät
näy, ja sävy on sama kuin 1 m/px -pohjassa. Tilaan nyt keskustan loput 26 palaa **samalla ohjeella kuin erä 1**.

## Palat (ruudukko `palat-05m.json`, 7 riviä × 5 saraketta; r01 = pohjoisin, c01 = läntisin)
- r01, r02 ja r03: kaikki sarakkeet c01–c05 (15 palaa; Garnier, Grands Boulevards, Les Halles, Marais).
- r04, r05 ja r06: sarakkeet c01 ja c02 (6 palaa; Concorde, Tuileries, Louvre, Orsay, Saint-Germain).
- r07: kaikki sarakkeet c01–c05 (5 palaa; Luxembourg, Panthéon, Jardin des Plantes).
Erän 1 yhdeksän palaa (r04–r06 × c03–c05) eivät kuulu tähän.

## Aineisto
- Tämän tilauksen kansio `posti/karttaseppa-codex-pariisi-05m-loput26-20261101/` (SHA256SUMS). Kullekin palalle
  `ohje-…-v6-geometria.png` (geometria pikselilleen), `malli-…-1m-2x.png` (oma hyväksytty 1 m/px -maalauksesi 2×:
  tyyli ja sommittelu) ja `vesimaski-…png` (valkoinen = vesi).
- Yhteiset tiedostot ovat erän 1 tilauskansiossa `posti/karttaseppa-codex-pariisi-05m-era1-20261101/`:
  `tyylimalli-r4-c4-q11-1m-hyvaksytty.png`, `G-referenssi-owner-style-G-confirmed.jpg`, `osuudet.py`, `palat-05m.json`
  ja `yleiskuva-ruudukko-05m-1-2.jpg`.
- **Erän 1 hyväksytyt kuvat ovat tyylin mittapuu:** `proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-r0[4-6]-c0[3-5].png`.
  Pidä yksityiskohdan määrä, viivan paksuus ja kattojen sävy samoina. Erän 1 naapureissa (r03-c03…c05, r04…r06-c02,
  r07-c03…c05) kadut ja vesi jatkuvat limityksen yli erän 1 kuviin.

## Mitä maalataan (sama kuin erä 1)
- Geometria ohjeesta pikselilleen. Talot nousevat jalanjäljistään. Malli on pehmeä: maalaa tarkkuuden verran lisää
  yksityiskohtaa (ikkunarivit, savupiiput, kattoikkunat, harjat, räystäslistat, porttikäytävät), älä kopioi sumeutta.
  Viiva on yhtä ohut kuin 1 m/px -kuvissa.
- Vettä vain vesimaskiin. Ei uusia altaita, suihkulähteitä eikä sinisiä pintoja maskin ulkopuolella.
- Maamerkkien kohdat (Louvre, Orsay, Garnier, Panthéon, Luxembourgin palatsi ja Concorde) jätetään tyhjiksi kuten ohjeessa
  ja mallissa: tasainen kivi- tai pihapinta, ei rakennusta. Karikatyyrit tulevat päälle erikseen.
- Ei puita, ei ihmisiä, ei autoja, ei veneitä. Puistot (Tuileries, Luxembourg, Jardin des Plantes, Palais-Royal) ovat
  tasaista nurmea polkuineen ohjeen mukaan.

## Toimitus
`proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-rRR-cCC.png` (26 kuvaa, natiivi 1536 × 1024 RGB) ja postiviesti
`posti/codex-karttaseppa-pariisi-05m-loput26-<pvm>.md` (SHA256 ja kohdat, joita et saanut pysymään). Saat toimittaa
riveittäin osissa, jos se on sinulle helpompaa. **Vain claude/postilaatikko-haaraan.**

Generointi: Codexin kuvien pysyvä lupa (26 kuvaa; keskusta yhteensä 35). Karttatiedot © OpenStreetMap contributors.
