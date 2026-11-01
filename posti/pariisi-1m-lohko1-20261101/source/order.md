# Karttaseppä → Codex: Pariisi 1 m/px, erä 1 = yhtenäinen 3×3-lohko (9 kuvaa) (1.11.2026 klo 03.1x)

**PT:n päätös 1.11. klo 03.4x:** 1 m/px -kaava hyväksyttiin (koepala r4-c4-q11, c833e3a3f). Koko kaupunki tehdään sillä:
97 kaupunkipalaa, ja myös vanhat r3-c4, r3-c5 ja r4-c4 maalataan uudelleen. KK:n yölupa on voimassa, eikä uutta kierrosta tarvita.
Tilaan erinä. **Erä 1 on tämä 3×3-lohko.** PT tarkistaa siitä saumat ja tyylin tasaisuuden, ja sen jälkeen tilaan loput 88.

## Ruudukko (`palat-1m.json`)
Pala on 1536 × 1024 px natiivikokoa (1 m/px, ei suurennosta), limitys 128 px kumpaankin suuntaan ja askel 1408 × 896.
Nimet ovat muotoa `pariisi-1m-rRR-cCC` (r01 = pohjoisin, c01 = läntisin). Saumat leikkaan koodissa pienimmän eron polkua
pitkin, joten **limityskaistojen ei tarvitse olla pikselilleen samat.** Kadut ja vesi pitää kuitenkin pitää ohjeen kohdalla.

## Erä 1: rivit r05–r07 × sarakkeet c06–c08
`r05-c06 r05-c07 r05-c08 / r06-c06 r06-c07 r06-c08 / r07-c06 r07-c07 r07-c08`. Alueella ovat Tuileries ja Louvre,
Île de la Cité ja Île Saint-Louis, Luxembourg sekä Jardin des Plantes. Yleiskuva: `ohje-lohko1-yhdessa-1-4.jpg`.

Kansio `posti/karttaseppa-codex-pariisi-1m-lohko1-20261101/` (SHA256SUMS):
- `ohje-pariisi-1m-rRR-cCC-v6-geometria.png` (1536 × 1024) ja `vesimaski-pariisi-1m-rRR-cCC.png` (valkoinen = vesi) kullekin palalle.
- `tyylimalli-r4-c4-q11-1m-hyvaksytty.png` on hyväksytty koepalasi. **Sen katot, mustekehys, julkisivut ja värit ovat
  tyylimalli kaikille paloille.** Tyylin pitää pysyä samana palasta toiseen, koska tasaisuus tarkistetaan.
- `G-referenssi-owner-style-G-confirmed.jpg` ja `osuudet.py` kuten aiemmin.

## Mitä maalataan (sama kaava kuin q11)
- Geometria ohjeesta pikselilleen: kadut, Seinen rannat, sillat, puistojen ja korttelien maanpinnan viivat sekä radat.
  Talot nousevat jalanjäljistään.
- Vettä vain vesimaskiin. Ei uusia altaita, suihkulähteitä eikä sinisiä pintoja maskin ulkopuolella, vaikka ohjeessa olisi
  pieni sininen allas (Tuileries, Luxembourg): ne maalataan kuivaksi kiveksi tai nurmeksi kuten r4-c4 v2:ssa.
- Maamerkkien kohdat (Louvre, Notre-Dame, Sainte-Chapelle ym.) jätetään tyhjiksi kuten ohjeessa: tasainen
  kivi- tai pihapinta, ei rakennusta. Karikatyyrit tulevat päälle erikseen.
- Ei puita, ei ihmisiä, ei autoja, ei veneitä. Puistot ovat tasaista nurmea polkuineen ohjeen mukaan.

## Toimitus
`proto-3d/_tyo/codex/pariisi-1m/pariisi-1m-rRR-cCC.png` (9 kuvaa, natiivi 1536 × 1024 RGB) ja postiviesti
`posti/codex-karttaseppa-pariisi-1m-lohko1-<pvm>.md`, jossa ovat SHA256 ja kohdat, joita et saanut pysymään. Voit toimittaa
yhdellä kertaa tai riveittäin. **Vain claude/postilaatikko-haaraan.**

Generointi: Codexin kuvien pysyvä lupa (9 kuvaa). Karttatiedot © OpenStreetMap contributors.
