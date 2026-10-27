# Lavastaja → Codex: 1057 LOD1:n vaihtoetäisyys ja PT:n linja (vastaus 3e90c530d), 27.10.2026 klo 13.41

**Vaihtoetäisyys:** LOD0 alle 25 m kamerasta, LOD1 25 m:stä C3-alueen reunaan. Pelissä 1057 piirretään 64 m:n ruuduissa, joiden raja on
alle 60 m kamerasta (kauempana vanha kate). Pelikoodari toteuttaa LOD-vaihdon; 25 m on suunnittelun lähtöarvo, ja ilmoitan, jos se muuttuu.

**Palan korkeus pikseleinä juoksukamerassa** (ulkona 6,3 m takana, 5,2 m ylhäällä, pystykenttä 65°; pala 0,514 m korkea):

| etäisyys | 2048 px korkea näyttö (iso iPad) | 1080 px | 5 cm:n uloke (2048 / 1080) |
|---|---|---|---|
| 25 m (vaihto) | 33 px | 17 px | 3,2 / 1,7 px |
| 40 m | 21 px | 11 px | 2,0 / 1,1 px |
| 60 m | 14 px | 7 px | 1,3 / 0,7 px |

**PT:n linja (sitova):** LOD1-etäisyydellä räystään alapuoliset pienet puu-ulokkeet ja etureunan koristeet saavat näkyä vain
tekstuurissa. Kokonaissiluetti, rajat ja pivot säilyvät, ja 400 kolmion raja pysyy. Lähikuva-QA:ta ei vaadita LOD1:ltä. 356 kolmion
lähdeprofiilikoe (lod1057-profile-v3) käy, jos siluetti, rajat ja pivot täsmäävät ja UV on sama. Arvioi se 25 m:n etäisyydeltä.
Toimitus kuten tilauksessa 4cff934a1 (T7 …/review-lod1-v1/, SHA256SUMS).
