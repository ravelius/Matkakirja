# Päätoimittaja → Codex: Pulun avaruuskävely realistiseksi — robottikäsi ja jalkatuki (omistajan tilaus 1.10.2026)

Omistaja 1.10.2026 Cupolan lopullisesta päiväkoonnista
(proto-3d/lokit/linssiseppa-yovalot-20261001-iphone/koonti-ikkuna-paiva.jpg): "Onko tuo pulun avaruuskävely
realistisen näköinen, vai pitäisikö siinä olla joku toisenlainen käsi kiinni pulussa tai jotain vastaavaa?"

Päätoimittaja: ei aivan. Turvaköysi päättyy tyhjään (se kaartuu vain pulun oman kuvan reunaan, ja peli sijoittaa pulun
ikkunan keskelle), ja pulu leijuu vapaana. Oikeassa avaruuskävelyssä astronautti on aina kiinni asemassa, ja usein hän
seisoo aseman robottikäden päässä jalkatuessa. Robottikättä ohjataan juuri Cupolasta. Omistaja hyväksyi robottikäden.

## Mitä pyydetään

1. **Robottikäden uloin varsiosa**, ranne ja pään tarttuja sekä siihen kiinnitetty **jalkatuki** (kääntyvä jalkalevy
   jalkapidikkeineen). Varsi tulee kuvan reunasta (alhaalta tai sivulta), ja pulu seisoo jalkatuessa ikkunan keskellä.
   Valkoinen varsi, harmaat nivelet, muutama kaapeli ja kiinnike, ei tekstiä eikä logoja. Mittasuhteet: pulu on
   astronautin kokoinen varteen nähden.
2. **Pulun asento:** jalat kiinni jalkatuessa (pystyasento, ei vapaata leijuntaa). Toinen siipi saa pitää varren
   kaiteesta, toinen on vapaa. Nykyinen avaruuskävelyasu, kypärä, ilme ja valot pysyvät ennallaan.
3. **Turvaköysi** kulkee pulun vyötäröltä robottikäden kiinnityskoukkuun. Vapaata päätä ei ole.
4. **Valaistus kerroksina** kuten 30.9. tilauksessa: (a) perus varjossa, (b) kasvovalo, (c) kypärälamput, (d) Maan
   sininen heijastusvalo alhaalta. Varrelle ja jalkatuelle omat kerrokset: varsi-perus ja varsi-reunavalo.
5. **Toimitusmuodot:**
   - natiivi: PNG-kerrokset läpinäkyvällä taustalla 2x, pulu samassa koossa kuin nykyiset 5 kerrosta (304 × 608);
     varsi omana pitkänä kerroksenaan (noin 1600 px), jotta peli voi sijoittaa sen ikkunan reunasta pulun jalkoihin
   - web: `js/livia-eva.js` -tilana samoin kuin avaruuskävelyasu
6. **Liike:** pulu ei enää leiju. Korkeintaan hento keinunta jalkojen ympäri (±2°, jakso noin 6 s); varsi pysyy
   paikallaan.

## Rajat

- Vain oma piirros, ei kolmannen osapuolen kuvia. Kuviin ei tule tekstiä eikä NASA-logoja.
- Täysin peittävien pikselien alfa on 255 (ei 245–254, ne vuotavat pelissä).
- Ei versionostoa eikä PR:ää: toimita haaraan `codex-pulu-robottikasi` ja kerro postikansioon tiedostolla
  `codex-fable-pulu-robottikasi-<pvm>.md`.
- Natiivin Cupolaan kytkee Linssiseppä 2 (avaruuskävelyasun kytkijä), webin kytkennän järjestää Päätoimittaja.
