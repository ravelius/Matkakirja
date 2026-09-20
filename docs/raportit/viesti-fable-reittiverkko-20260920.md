# Karttaseppä → Fable: himmeä reittiverkko liftatessa (20.9.2026)

Haara `karttaseppa-himmeat-kaaret` (pohja origin/v1973-prep bec5266b), erä 2.

## Mitä tehtiin

Omistaja 20.9.2026 klo 13.50: *"entä jos piirretaan myos muutkin reitit
mutta himmeammalla"*. Liftatessa (matkasessio, sama ehto kuin kantaman
kaarilla) kaikki laudan 411 kaarta piirtyvät himmeinä kantaman kaarten
alle; muulloin ei.

- `js/ui.js matkareittienValinta`: lippu `verkko = kaupunki && matkalla &&
  naytetaan`, osa avainta.
- `js/pallolauta/reitit.js verkonViivat`: kaikki kaaret [lon, lat] -viivoina
  SAMASTA muistista kuin kirkkaat kaaret (päät kaupunkien pallopisteissä),
  kerran per lauta.
- `js/pallovektorit.js`: neljäs laji `verkko` (asetaVerkko/naytaVerkko):
  rajamuste peitolla 0,3, leveys 0,7–1,1 css-px, yhtenäinen viiva, kiinteä
  harvennus 0,01° (24 538 → 4 585 pistettä, 4 168 janaa palajaon jälkeen),
  olio rakennetaan kerran laudan avaimella, näkyvyys on `visible`-lippu —
  ei häivettä, ei animaatiota. Kirkkaat kaaret ovat reittikerroksessa
  pinnan yläpuolella (REITIN_KORKEUS) ja piirtyvät päälle.
- `js/pallolauta/lauta.js`: valinnan lippu → vektorit.asetaVerkko/naytaVerkko.

"Isoympyröinä": piirretty laudan reittipolyilla (meri- ja maareitit
kulkevat samaa uraa kuin kirkkaat), ei kaupunkiparin isoympyräjänteinä —
jänne ylittäisi maata merireiteillä. Pallon pinnalla polyn välit ovat
isoympyrän kaaria.

## Mittaukset (Chromium, Bryssel, kamera pakotettu Länsi-Eurooppaan)

- Kelttienmeren avomerilaatikko (240 × 240 css-px): tummentuneita pikseleitä
  verkon kanssa 2 665, peruutuksen jälkeen 0.
- Kantaman kaari (Pariisi–Bryssel) tummin 75 vs verkko ~170: kirkas erottuu.
- Toinen heitto: sama olio, sama janamäärä (kerran per lauta).
- Kehysaika ohjelmistopiirrolla (swiftshader): mediaani 372 → 418 ms (+12 %)
  4 168 janalla; ilman harvennusta 24 127 janaa oli 141 → 346 ms (+150 %) —
  siksi kiinteä harvennus. Laitteen fps pyydetty Laitetestaajalta.

## Vartiot

- `tests/reittiverkko.test.mjs` (3 testiä), `tests/pallolauta.test.mjs`
  (verkko-lippu näkyvyyssäännössä), `tests/maakorostus.test.mjs`
  (materiaalitaulu). Koko sarja 3774, 0 fail.
- `tools/savukkeet/savuke-reittiverkko.mjs` 11/11 (harva sarja; polut
  reitit/lauta/pallovektorit).

## Avoimet

1. Laitetestaaja: fps liftatessa Brysselissä ja Ranskassa (heitto → kartta
   laajenee), vertailu ilman verkkoa (`?vektorit=0` sammuttaa koko
   vektorikerroksen, ei vain verkkoa — vertailu kannattaa tehdä versioiden
   välillä).
2. Sävy/peitto (0,3) on Karttasepän valinta — omistaja katsoo laitteella.
3. Verkko näkyy vain pallovektorien ollessa päällä (kytkin), kuten rantaviiva.
