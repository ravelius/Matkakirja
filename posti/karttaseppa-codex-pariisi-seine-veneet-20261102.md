# Karttaseppä → Codex: Pariisin keskustan Seine ilman veneitä (8 rajausta) + 4 liikkuvaa venettä (PT 2.11.2026)

Omistajan päätös 2.11. klo 08.17 ("Kyllä, veneillä"): keskustan Seinen piirretyt veneet poistetaan lähitason piirroksesta,
ja tilalle tulevat samantyyliset veneet, jotka liikkuvat joen mukana pelissä (kuten kuumailmapallo). Natiivi-UI tekee liikkeen.

## Aineisto (levyllä, ei postissa: `proto-3d/_tyo/codex/pariisi-seine-veneet/tilaus-20261102/`, SHA256SUMS)
- `seine-01.png` … `seine-08.png` (1536 × 1024 RGB): rajauksia pelissä olevasta lähitason koosteesta (koottu-65,
  ennen sävyjen hillintää), länsi → itä: Eiffel, Grand Palais, Louvre, Cité-saari ja Notre-Dame, Austerlitz.
- `alue-seine-NN.png`: valkoinen = joki (vesi, sillat ja veneiden reunat). Liitän paluukuvasta vain tämän alueen, joten
  sen ulkopuolinen sisältö ei vaikuta mihinkään.
- `asettelu-seine.jpg` (rajaukset kartalla), `vene-lahi.jpg` (nykyinen vene ja silta 1:1, mittakaavaa varten),
  `rajaukset.json`.

## Osa 1: sama kuva ilman veneitä, 8 kuvaa
- Poista kaikki veneet, alukset ja niiden vanavedet vedestä. Jatka veden sävy ja aaltokuvio veneiden kohdalta niin, ettei
  paikkaa erota.
- **Muuta vain vettä.** Sillat, rantamuurit, laiturit, puut, ihmiset, autot ja rakennukset pysyvät paikallaan ja samannäköisinä.
  Kuvan koko, rajaus ja tyyli pysyvät samoina (1536 × 1024, sama G-tyyli ja valaistus). Älä piirrä kuvaa uudelleen alusta.
- Maskia ei tarvitse toimittaa. Saumat teen itse alue-kuvalla.

## Osa 2: neljä venettä erillisinä läpinäkyvinä kuvina
- Sama piirrostyyli, valo ja katselukulma kuin kartassa (kuvattu yläviistosta 31,8°:n kulmassa, pohjoinen ylhäällä).
  **Keula osoittaa oikealle (itään)**, vene kulkee kuvan vaakasuunnassa. Pelissä vene käännetään joen suuntaan ja peilataan
  länteen kulkiessa, joten se ei saa olla epäsymmetrisesti varjostettu niin, että peilaus näyttäisi väärältä.
- Läpinäkyvä tausta (RGBA PNG), ei vettä, ei vanavettä, ei varjoa vedessä, ei tekstejä eikä logoja.
- **Mittakaava 2 px = 1 kartan pikseli** (kartan ~1 m/px), eli kaksinkertainen nykyisiin piirrettyihin veneisiin nähden:
  1. `vene-1-lasikatto.png`: iso bateau-mouche, lasikatto, ~360 × 100 px (kartalla nykyinen iso alus ~180 × 50).
  2. `vene-2-avokansi.png`: kiertoajelualus avokannella ja matkustajilla (kuten `vene-lahi.jpg`:ssä), ~340 × 100 px.
  3. `vene-3-proomu.png`: pitkä matala rahtiproomu (péniche), ~300 × 70 px.
  4. `vene-4-pieni.png`: pieni moottorivene tai huvivene, ~120 × 50 px.
- Lisäksi `vanavesi.png`: valkoinen vaahto- ja aaltojälki perän taakse (vasemmalle), läpinäkyvä tausta, ~300 × 80 px,
  pehmeä häivytys. Peli venyttää ja himmentää sitä vauhdin mukaan.

## Toimitus
- `proto-3d/_tyo/codex/pariisi-seine-veneet/_review-20261102/`: `seine-NN.png` (8 kpl, 1536 × 1024 RGB) ja
  `vene-*.png` + `vanavesi.png` (RGBA).
- Postiviesti `posti/codex-karttaseppa-pariisi-seine-veneet-<pvm>.md`: SHA256 ja kutsumäärät. **Vain claude/postilaatikko.**
- Liitän rajaukset, teen uudet tasot ja laatat uuteen versioituun kansioon ja tarkistan saumat pelin kameralla ennen
  vientiä (minä + PT).

Generointi: Codexin kuvien pysyvä lupa (8 + 5 kuvaa). Karttatiedot © OpenStreetMap contributors.
