# Päätoimittaja → Codex: ISS-ohjaamon grafiikka, tekninen liite (omistajan tilaus 4.10.2026)

Omistaja tilaa ISS-ohjaamon ohjainten graafiset elementit Codexilta ja välittää sisällön itse (4.10.2026 klo 16.4x).
Tämä tiedosto on tekninen liite, jotta osat kytkeytyvät suoraan peliin (Natiivi-UI, Unity UI Toolkit).

## Tyyli
- Omistaja: nykyinen versio "ei näytä yhtään avaruusaluksen ohjaimilta vaan halvan tietokonepelin ohjaimilta".
  Tavoite on aito avaruusaluksen laitteisto (ISS:n Cupolan robottityöasema), ei sarjakuvamainen.
- Materiaalit samaan sävyyn kuin pelin Cupolan kehys: anodisoitu tai harjattu metalli, ruuvit, hienovarainen kuluma.
  Valo yläviistosta, kuten kehyksessä. Merkinnät suomeksi stensiilinä (esim. KAMERA, AIKA).
- Ei tekstiä kuviin muuten kuin stensiileinä. Sijaintiteksti ja numerot piirtää peli.

## Mitat
- Paneeli pystypuhelimessa enintään 128 pt korkea ja noin 360–380 pt leveä (peitto ≤ 15 %). iPadilla sama paneeli skaalataan.
- Toimitus PNG:nä läpinäkyvällä taustalla @3x (ja @2x). Paneelin pohja mieluiten 9-slice-reunoin skaalautuvana.

## Osat ja tilat
1. Paneelin pohjalevy kehyksineen.
2. Ohjaussauva (vasemmalla, plus-suuntainen): jalusta ja sauva. Tilat: lepo, ylös, alas, vasen, oikea (sauva kallistuneena; painettu suunta näkyy).
3. Kaasuvipu (oikealla): 4 asentoa (1×, 10×, 100×, 1000×) eri kulmissa. Vivun juuren pyöreä kolo erillisenä kuvana.
4. Numerorumpu: pystysuora liuska, jossa 1×, 10×, 100×, 1000× SELKEÄLLÄ fontilla (ei seitsensegmenttiä). Peli vierittää liuskaa kolon takana.
5. Kameranappi (kaasun vasemmalla puolella): suojattu painike, normaali ja painettu.
6. LCD-kehys (keskellä): kehys ja lasi pieneen näyttöön sekä laajennettuun isoon näyttöön (peittää muut ohjaimet). Peli piirtää vihreän tekstin lasin taakse.
7. Mininäytön kehys: yksirivinen pieni LCD.

## Lisenssi ja toimitus
- Oma tuotanto (CC0 tai omistajan oikeudet). Ei kolmansien osapuolten kuvia jäljiteltynä. NASA:n public domain -kuvia saa käyttää viitteenä.
- Toimitus haaraan `codex-iss-ohjaamo-grafiikka`, kansioon `iss-ohjaamo/` + LAHTEET.md. Ilmoitus tähän postikansioon tiedostolla `codex-fable-iss-ohjaamo-grafiikka-<pvm>.md`.
