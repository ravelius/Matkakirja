# Omistajan ensikokemus — iPad, 120 Hz (23.9.2026)

iPad Pro 11" (M5), build 52e714f (Natiivi-UI:n uusin portti, "Laita äänet
päälle"). Kuvat + kehysajat:
`/Users/Shared/Claude/proto-3d/lokit/omistajan-ensikokemus-ipad-20260923/`.

## Työkalurajoitus (tärkeä, kirjattu myös Fablelle ennen ajoa)

**Minulla ei ole työkalua oikean kosketuksen injektointiin fyysiselle
iPadille tässä sessiossa** — simulaattorin kosketustyökalu toimii vain
simulaattorilla (oma kuvauksensa sanoo niin), ja `devicectl` tukee vain
tiedostosiirtoa ja sovelluksen käynnistystä, ei kosketussyötettä. Kaksi
simulaattoriajon epävarmaa löydöstä (docs/raportit/omistajan-
ensikokemus-20260923.md, kohdat 3–4: "Aloita seikkailu" -napin kosketus
ja saapumisohjeistus) **jäävät siis edelleen varmistamatta** — Fable
vahvisti, että tämä jää omistajalle huomiseksi. Ajoin sen sijaan
kehittäjäkomennoilla (`ui-komento.txt`) samat näkymät kuin simulaattorilla,
mutta oikealla 120 Hz -laitteistolla, ja keräsin aidot kehysajat.

## Kehysajat (120 Hz -tavoite, `tavoiteMs` 8,33 ms)

Portista kartalle ja siitä ~200 s eteenpäin (39 uutta 5 s -jaksoa):
**p50 pysyy tasan 8,33 ms:ssä koko ajan, p95 8,38–8,41 ms, max korkeintaan
8,53 ms, ja `yli15x` (yli 1,5×tavoite) on 0 JOKA IKISESSÄ jaksossa.**
Täysin sulava, ei yhtään havaittua tökkäystä paikallaan kartalla ollessa.
Tämä on selvästi tasaisempi tulos kuin simulaattorilla (joka ei aja
120 Hz:ssä) — real hardware -ProMotion näyttää toimivan erinomaisesti
tässä tilassa.

Huom: mittaus tehtiin PAIKALLAAN kartalla (ei aktiivista kamera-ajoa tai
vetoa), joten se ei kata liikkeen aikaista sulavuutta — vain idle-tilan.

## Näkymät

- `ipad-ensikokemus-avaus.png`: sama avausteksti kuin simulaattorilla
  (Heathrow-koukku), näytti identtiseltä.
- `ipad-ensikokemus-kartalla.png`: kartalla Lontoossa (dev-komento vei
  suoraan kartalle), punainen merkkipiste kaupungin päällä, £300 · Päivä 1
  · aamu -tilarivi. Ei poikkeamia.

## Avoin

Napin kosketus ja saapumisohjeistuksen varmistus (simulaattoriraportin
kohdat 3–4) **vaativat oikean sormen fyysisellä laitteella** — ei
ratkaistavissa tämän session työkaluilla. Merkitään avoimeksi omistajalle.
