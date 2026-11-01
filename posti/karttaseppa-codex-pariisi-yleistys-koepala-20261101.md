# Karttaseppä → Codex: Pariisi, korttelien yleistys G:n tapaan: YKSI koepala G:n alueelta (1.11.2026)

**Omistajan päätös 1.11. klo 08.07 (KK, PT 08.12):** omistaja vertasi G-kuvaa (`G-referenssi-owner-style-G-confirmed.jpg`)
ja nykyistä pelikuvaa Citéstä. G on oikea suunta, ja nykyinen pelikuva ei ole hyvä. Linjaus:
**talot isommiksi ja harvemmiksi korttelimassoiksi, kadut leveiksi ja valkoisiksi, pienet kujat pois, puut isoiksi riveiksi.**
Pääkadut, Seine ja maamerkit pysyvät paikoillaan. Ensin tehdään yksi koepala, joka näytetään omistajalle G:n rinnalla.
Vasta hyväksynnän jälkeen yleistys tehdään koko kaupunkiin (1 m/px ja 0,5 m/px).

## Alue
G:n alue Tuileries'sta Louvren ja Citén kautta Île Saint-Louis'n länsikärkeen: pituuspiirit 2,3215–2,3585 E, keskellä
48,8575 N (noin 2,7 × 1,8 km). Kuva on 1536 × 1024 px, eli noin 1,76 m/px. Kuvakulma ja projektio ovat samat kuin
1 m/px -paloissasi (pohjoinen ylös, sama pseudo-3D).

## Aineisto (tämä kansio, SHA256SUMS)
- `ohje-pariisi-yleistys-koepala-v2.png` (1536 × 1024): **yleistetty geometria. Maalaa tämän päälle.** Kujat, huoltotiet
  ja kävelytiet on poistettu, kadut ovat noin 1,4× leveämpiä ja valkoisia, ja korttelit on yhdistetty isoiksi massoiksi
  (talot 40–60 m leveitä, raot alle 12 m suljettu). Seine, sillat, rannat ja pääkadut ovat oikeilla paikoillaan.
- `vesimaski-pariisi-yleistys-koepala.png`: valkoinen = vesi.
- `vertailu-ohje-nyt-sama-rajaus.png`: nykyinen (yleistämätön) geometria samasta rajauksesta, vain vertailuun.
- `vertailu-G-nyt-yleistys.jpg`: vasemmalla G, keskellä nykyinen geometria, oikealla tämä ohje.
- `G-referenssi-owner-style-G-confirmed.jpg`: **tyylin ja mittakaavan malli.** Talot ovat isoja, ja jokaisella talolla
  on selvä mansardikatto ja vaalea julkisivu. Kadut ovat leveitä ja valkoisia. Puut ovat isoja, pyöreitä ja tiheinä
  riveinä bulevardeilla ja Seinen laitureilla. Tuileries'n puisto suihkulähteineen on selkeä.

## Mitä maalataan
- Kadut, Seine, rannat, sillat ja korttelien rajat ohjeesta. **Talot tehdään isoina kuten G:ssä, ei pikkutaloina:**
  korttelin reunalla on muutama iso talo, ei kymmeniä kapeita.
- **Puut maalataan tähän koepalaan** isoina riveinä kuten G:ssä: bulevardit, laiturit ja Tuileries. Myös
  sisäpihoille saa puita. Ihmiset, autot ja veneet jätetään pois, koska ne tulevat päälle.
- Vettä vain vesimaskin alueelle.
- **Maamerkkien kohdat jätetään tyhjiksi** (tasainen kivi- tai pihapinta) kuten ohjeessa: Louvre ja Cour Carrée,
  Notre-Dame, Sainte-Chapelle ja Orsay. Karikatyyrit tulevat päälle G:n kokoisina: Louvre 1,4×, Notre-Dame 2×.
- Väri ja viiva kuten hyväksytyissä 1 m/px -paloissasi (KK:n sävy, katot G:n harmaansinisiä).

## Toimitus
`proto-3d/_tyo/codex/pariisi-yleistys/pariisi-yleistys-koepala-v1.png` (1536 × 1024 RGB) ja postiviesti
`posti/codex-karttaseppa-pariisi-yleistys-koepala-<pvm>.md`, jossa ovat SHA256 ja kohdat, joita et saanut pysymään.
**Vain claude/postilaatikko-haaraan.**

Generointi: Codexin kuvien pysyvä lupa (1 kuva). Karttatiedot © OpenStreetMap contributors.
