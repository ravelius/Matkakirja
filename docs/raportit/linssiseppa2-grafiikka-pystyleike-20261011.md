# Grafiikan pystyleike: Olavinlinnan keittiö (LS2, 11.10.2026)

Tilaus: PT 11.10. 16.5x (omistaja: "miten grafiikkaa saataisiin oleellisesti paremmaksi … vuoden 2026 verrokit").
Ennen-kuva: lokit/todistus-botti-osat-B-20261011-1630/kuvat/a-keittio.png (iPad vaaka, 72e8d4cc).

## Nykytila (siirtoseppa/v47t 8feefe8ca, LR v47v)
- Valo leivottu Blenderin Cyclesillä YHTEEN atlakseen (albedo × valo × AO), UV1, ~150 px/m, **LDR**: AgX-näyttömuunnos on
  leivottu kuvaan, ASTC 8-bit. Pinta on valaisematon (DioraamaLeivottu.shader): ei kiiltoa, ei normaalivastetta tuleen.
- Detalji: triplanaarinen albedo-overlay + normaali/karheus (Poly Haven 1k, toisto 1,5 m) kertoo vain "valoa".
- Jälkikäsittely: Bloom (kynnys 1,2) + Neutral; ei värimäärittelyä, ei vinjettiä. HDR-sisältöä ei ole, joten bloom tarttuu vain liekkiin.
- Ei light/reflection probeja, ei decaleja. Hahmot valaistaan reaaliaikaisilla pistevaloilla → eri "maailma" kuin seinät.

## Miksi näyttää vanhalta (a-keittio.png)
1. Tasainen oranssi sävy koko kuvassa: ei valon ja varjon kontrastia, ei lämmin–kylmä-vastakohtaa (tuli vs. ikkunan päivä).
2. Kivipinnat eivät reagoi tuleen (ei kiiltoa, ei normaalikartan varjoja) → "maalattu tapetti".
3. LDR: tulen ympärys ei hehku, ikkunasta ei tule valokiilaa, ilmassa ei ole savua/pölyä.
4. Hahmot irrallaan valosta (eri valaistusmalli).
5. Geometriaviat (seinän raot, ikkunan sirpale) — LR:n rekvisiitta- ja geometriatyö.

## Suunnitelma (vaiheet, jokaisesta kuvapari samasta kulmasta)
**V1 (LS2, vain Unity, ei uutta leivontaa):**
- DioraamaLeivottu: liekkien GGX-kiilto detaljinormaalilla ja -karheudella (lepattava valo liikkuu kivellä), normaalin
  itsevarjostus (cavity) leivotun valon päälle.
- Keittiön Volume: ACES-sävykartoitus + valotus, värimäärittely (lämpimät valot, viileät varjot), vinjetti, bloom tulelle,
  ikkunan valokiila + pölyhiukkaset (DioraamaKeila on jo), kevyt korkeussumu katon rajaan (savu).
**V2 (LR leipoo, LS2 lukee):** keittiö uudelleen **HDR-valona**: Standard-näyttömuunnos (ei AgX), EXR → RGBM-ASTC
  (tai ASTC HDR), valon ja värin erotus (irradianssiatlas 1k + albedo omana karttana), noki/kuluma-maski tulisijan yllä.
  Valosuunnitelma: tuli 1900 K pääavain, ikkuna 6500 K kylmä keila, nurkat saavat pimetä.
**V3:** heijastusluotain (Blenderistä leivottu kuutio) märälle kivelle ja kuparille; hahmoille sama valo (luotaimet atlaksesta).

## Mittaus
Natiiviseppä: iPad (M) ja iPhone fps + GPU ms + muisti keittiössä ennen/jälkeen. Raja: ≤ +0,3 ms GPU / ominaisuus
(Mobile-taso), iPad ≥ 60 fps.

## Ostettavat
Ei tarvita: Blender Cycles + Poly Haven/ambientCG (CC0) riittävät. (Bakery vaatii Windows/NVIDIA; Unityn LightBaker vain Intel.)
