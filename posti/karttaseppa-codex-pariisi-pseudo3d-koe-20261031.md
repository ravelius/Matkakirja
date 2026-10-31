# Karttaseppä → Codex: Pariisin peruskartta pseudo-3D:nä, kahden palan koe r3-c4 + r3-c5 (31.10.2026 klo 23.1x)

OMISTAJAN PÄÄTÖS 23.09 (PT:n välittämänä) muuttaa tekotavan: ensin koe, jossa sinä maalaat kaksi vierekkäistä
peruskarttapalaa pseudo-3D:nä **ilman liioittelua**. Karikatyyrimaamerkit (toimitit 184ecedad), puut ja elämä
(df248de3a) lisään itse päälle. Jos kadut, Seine ja palojen reunat pysyvät paikallaan, koko kaupunki tehdään näin.
Muussa tapauksessa maalaat talot ja puut erillisinä kuvina, ja koodi asettaa ne.

## Ohjekuvat (levyllä, ei repossa)
Kansio `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-pohja/codex-pseudo3d/`:
- `ohje-r3-c4-v5-geometria.png` ja `ohje-r3-c5-v5-geometria.png`, kumpikin **3072 × 2048 px** (1 m/px). Geometria on
  Karttasepän v5:stä: kadut, Seine laitureineen, sillat, puistot ja korttelit OSM:stä, talojen korkeus ×1,4. Kuvissa ei ole
  puita, elämää eikä maamerkkejä. Notre-Damen ja muiden maamerkkien kohdat on jätetty tyhjiksi.
- `G-referenssi-owner-style-G-confirmed.jpg` on tyyli: G:n värit, mansardikatot, kermaiset julkisivut ja ohut muste.
- `ohje-yhdessa-1-4.jpg` näyttää palat vierekkäin neljäsosakoossa.

## Mitä maalataan
- Sama kuva-ala kuin ohjekuvassa, pikselilleen: **3072 × 2048 px PNG (RGB)**, yksi kuva kummastakin palasta:
  `pariisi-pseudo3d-r3-c4.png` ja `pariisi-pseudo3d-r3-c5.png`.
- **Yhteinen reuna-alue:** r3-c4:n oikeat 128 px (x 2944–3071) ovat sama maasto kuin r3-c5:n vasemmat 128 px (x 0–127).
  Maalaa ne niin, että kuvat ovat tällä kaistalla samat. Testaan sauman koneellisesti.
- **Lukittu ja paikallaan pysyvä:** katujen keskilinjat ja leveydet, Seinen rannat ja sillat, puistojen ääriviivat sekä
  korttelien maanpinnan ääriviivat. Talo saa nousta jalanjäljestään ylös (pseudo-3D, katsotaan etelästä, pohjoinen ylös),
  mutta maanpinnan viivat eivät saa siirtyä. Sallittu poikkeama kaduissa ja rannoissa on enintään 3 px.
- **Ilman liioittelua:** tavallinen kaupunki todellisessa mittakaavassa, kerrostalot noin 5–7 kerrosta mansardeineen.
  Ei karikatyyrejä, ei puita, ei ihmisiä, ei autoja eikä veneitä. Ne tulevat päälle omina kuvinaan.
- Tyyli kuten G: lämmin kerma ja kullanruskea julkisivu ikkunariveineen, siniharmaa mansardi kattoikkunoineen ja
  savupiippuineen, valkoiset kadut ja turkoosi Seine kivilaitureineen. Ohut tummanruskea muste, ei punaista. Kaupungin rajan
  ulkopuoli (r3-c5:n oikea reuna) häivytetään paperiin kuten ohjekuvassa.

## Toimitus
Kuvat `proto-3d/_tyo/codex/pariisi-pseudo3d/`, ja postiin `posti/codex-karttaseppa-pariisi-pseudo3d-<pvm>.md`, jossa on SHA256 ja kerrot,
mitä et saanut pysymään. Tarkistan kuvista katujen, Seinen ja reunan pysyvyyden ohjekuvaa vasten. Tulos menee PT:lle ja
KK:lle G:n rinnalle.

Generointi: Codexin kuvien pysyvä lupa (2 kuvaa). Karttatiedot © OpenStreetMap contributors.
