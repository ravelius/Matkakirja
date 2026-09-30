# ISS-kytkinpöydän lähteet ja lisenssit (Linnanrakentaja 30.9.2026)

Cupola-näkymän alareunan kytkinpöytä on mallinnettu Blenderissä (`tools/linssit/blender/iss_paneeli.py`) ja
renderöity Cyclesillä kuvakerroksiksi (`iss_paneeli_render.py`). Kerrokset ovat kansiossa
`proto-3d/_valmiit/iss-paneeli/<versio>/`, ja Linssiseppä kokoaa ne natiivin UI:hin.

## Muotoreferenssit (NASA, public domain)

| Kuva | Mitä siitä otettiin |
|---|---|
| iss059e021364, Destinyn Robotics Work Station ([Commons](https://commons.wikimedia.org/wiki/File:ISS-59_Anne_McClain_trains_with_the_robotics_workstation_inside_the_Destiny_lab.jpg)) | Display and Control Panel: mattamusta konsoli, valkoiset ryhmäkehykset, taustavalaistut neliöpainikkeet, harmaat kartiomaiset kiertonupit, teräsvipukytkimet lankakaarella |
| iss050e052148, Cupolan RWS ennen CRS-10:n kaappausta ([Commons](https://commons.wikimedia.org/wiki/File:ISS-50_Cupola_prior_to_the_robotic_capture_of_SpaceX_CRS-10.jpg)) | Cupolan RWS:n kokonaisuus, vihreät merkkivalot, meripihkan hehkuiset painikkeet |
| iss026e020937, Cupola ja robottityöasema ([Commons](https://commons.wikimedia.org/wiki/File:ISS-26_Cupola_with_robotic_workstation.jpg)) | Cupolan valaistus ja värit: tummat seinät, viileä ikkunavalo |
| iss023e039983 ([images.nasa.gov](https://images.nasa.gov/details/iss023e039983)) | DCP:n sijoittelu Cupolassa |

Kaikki NASA-kuvat ovat Yhdysvaltain liittovaltion teoksina public domainia ({{PD-USGov-NASA}}). Kuvia ei ole
käytetty tekstuureina, vaan ainoastaan muodon, värien ja yksityiskohtien referensseinä.

## Pintareferenssi

Codexin 2D-tutkielmat (`~/Documents/Codex/2026-09-30/iss-kytkimet-3d-referenssit/`, pelin omaa työtä): kulunut
grafiittimetalli, pronssiin kuluneet särmät, messinkisaranat, kuusiokoloruuvit, asteikkorengas ja merkkivalon
messinkikaulus. Tutkielmia käytettiin vain referenssinä, eikä niitä ole kuvissa mukana.

## Materiaalit

Kaikki materiaalit ovat proseduraalisia Cycles-varjostimia (Principled BSDF, Bevel-reunat, kohinakuoppa ja
särmämaskiin perustuva kuluma). Kuvatekstuureja ei käytetä, joten kolmannen osapuolen tekstuurilisenssejä ei ole.

## Fontti

**Barlow Condensed SemiBold**, SIL Open Font License 1.1, © 2017 The Barlow Project Authors
(<https://github.com/jpt/barlow>, Google Fonts `ofl/barlowcondensed`). Kopio ja lisenssiteksti ovat kansiossa
`proto-3d/_lahteet/fontit/barlow-condensed/` (`OFL.txt`). Fontilla on painettu kiinteät otsikot (NOPEUS, PILVET,
KUUKAUSI, KOHDE, OMA PAIKKA, POISTU, LIVE/PALAA), NOPEUS-asteikko ja painikkeiden legendat (LENNÄ, POISTU).
Renderöidyt kuvat eivät sisällä fonttitiedostoa. OFL sallii tämän käytön ilman ehtoja, ja lähde mainitaan
tekijätiedoissa.
