# Karttaseppä → Codex: Pariisin keskusta 0,5 m/px (lähin taso), erä 1 = 3×3-lohko (9 kuvaa) (1.11.2026)

**PT:n päätös 1.11. klo 06.4x (KK hyväksyi):** Pariisin 1 m/px -piirroskartta (97 palaa) on pelissä. Lähimmällä tasolla
(noin 0,75 km leveä näkymä iPadilla) se kuitenkin venyy noin 3,7-kertaiseksi. Keskusta maalataan siksi uudelleen kaksinkertaisella
tarkkuudella: **0,5 m/px**. Muu kaupunki pysyy 1 m/px:nä. Tilaan erinä. **Erä 1 on tämä 3×3-lohko.** PT tarkistaa siitä saumat,
tyylin tasaisuuden ja yhteensopivuuden 1 m/px -pohjan kanssa, ja sen jälkeen tilaan loput 26.

## Alue ja ruudukko (`palat-05m.json`)
- Alue on Concorde – Place des Vosges ja Palais Garnier – Panthéon (noin 3,6 × 3,8 km). Yleiskuva: `yleiskuva-ruudukko-05m-1-2.jpg`
  (sininen = alue, punaiset = palat, taustalla oma 1 m/px -maalauksesi).
- Pala on 1536 × 1024 px natiivikokoa (0,5 m/px eli 768 × 512 m), limitys 128 px kumpaankin suuntaan ja askel 1408 × 896.
  Ruudukossa on 7 riviä ja 5 saraketta eli 35 palaa. Nimet ovat muotoa `pariisi-05m-rRR-cCC` (r01 = pohjoisin, c01 = läntisin).
- Saumat leikkaan koodissa pienimmän eron polkua pitkin, joten **limityskaistojen ei tarvitse olla pikselilleen samat.**
  Kadut ja vesi pitää kuitenkin pitää ohjeen kohdalla.

## Erä 1: rivit r04–r06 × sarakkeet c03–c05
`r04-c03 r04-c04 r04-c05 / r05-c03 r05-c04 r05-c05 / r06-c03 r06-c04 r06-c05`. Alueella ovat Île de la Cité ja
Île Saint-Louis, Hôtel de Ville, Saint-Michel ja Quartier latin.

## Aineisto (kansio `posti/karttaseppa-codex-pariisi-05m-era1-20261101/`, SHA256SUMS)
Kullekin palalle:
- `ohje-pariisi-05m-rRR-cCC-v6-geometria.png` (1536 × 1024): geometria 0,5 m/px:nä. **Kadut, rannat, sillat, korttelien
  rajat ja talojen jalanjäljet pikselilleen tästä.**
- `malli-pariisi-05m-rRR-cCC-1m-2x.png` (1536 × 1024): oma hyväksytty 1 m/px -maalauksesi samasta kohdasta 2× suurennettuna.
  **Tämä on tyylimalli ja sommittelu.** Katot, värit, mustekehys, julkisivujen rytmi ja pihojen nurmet pysyvät samoissa
  kohdissa, jotta 0,5 m:n taso vaihtuu 1 m:n tasoon ilman hyppyä.
  Malli on suurennettu ja siksi pehmeä: **älä kopioi sumeutta, vaan maalaa tarkkuuden verran lisää yksityiskohtaa.**
  Ikkunarivit, savupiiput, kattoikkunat, harjat, räystäslistat ja porttikäytävät näkyvät nyt erikseen.
  Viiva on yhtä ohut kuin 1 m/px -kuvissa, ei kaksinkertainen.
- `vesimaski-pariisi-05m-rRR-cCC.png` (valkoinen = vesi).

Lisäksi `tyylimalli-r4-c4-q11-1m-hyvaksytty.png`, `G-referenssi-owner-style-G-confirmed.jpg` ja `osuudet.py` kuten 1 m/px:ssä.

## Mitä maalataan (sama kaava kuin 1 m/px, q11)
- Geometria ohjeesta pikselilleen. Talot nousevat jalanjäljistään.
- Vettä vain vesimaskiin. Ei uusia altaita, suihkulähteitä eikä sinisiä pintoja maskin ulkopuolella.
- Maamerkkien kohdat (Notre-Dame, Sainte-Chapelle ja koko alueella myös Louvre, Orsay, Garnier, Panthéon, Luxembourgin
  palatsi ja Concorde) jätetään tyhjiksi kuten ohjeessa ja mallissa: tasainen kivi- tai pihapinta, ei rakennusta.
  Karikatyyrit tulevat päälle erikseen.
- Ei puita, ei ihmisiä, ei autoja, ei veneitä. Puistot ovat tasaista nurmea polkuineen ohjeen mukaan.

## Toimitus
`proto-3d/_tyo/codex/pariisi-05m/pariisi-05m-rRR-cCC.png` (9 kuvaa, natiivi 1536 × 1024 RGB) ja postiviesti
`posti/codex-karttaseppa-pariisi-05m-era1-<pvm>.md`, jossa ovat SHA256 ja kohdat, joita et saanut pysymään.
**Vain claude/postilaatikko-haaraan.**

Generointi: Codexin kuvien pysyvä lupa (erä 1: 9 kuvaa; koko keskusta 35). Karttatiedot © OpenStreetMap contributors.
