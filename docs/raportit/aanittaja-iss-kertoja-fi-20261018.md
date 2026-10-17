# ISS-kertojan repliikit uudelleen suomi pakotettuna (Äänittäjä 18.10.2026 klo 01.2x)

Lupa: omistajan päätös 18.10. klo 01.13 (KK:n kortti), enintään 37 ottoa / 4 723 merkkiä. Käytetty **31 ottoa, 3 863 merkkiä**, yksi otto kustakin, William oae6GCCzwoEbfc5FHdEu, eleven_v4_turbo, language_code fi, tempo 1,10×, käsittely kuten ennen.
Viety ämpäriin vie-paketti.sh:lla (64 tiedostoa, ääniportti 0 hylättyä), uudet nimet `<id>-2.mp3`, vanhat säilyvät. Paketti `proto-3d/_valmiit/iss-kertoja-fi-vienti-20261018`, työ `_tyo/iss-kertoja-fi-20261018` (k.json, tee.py, radio_fi.py), raakamasterit T7 `Matkakirja-aanimasterit/iss-kertoja-fi-20261018`.

## Mitä viety (vain pelissä käytössä olevat)
- **Kupoli** (17): `audio/iss-kupoli-v1/<id>-2.mp3` (+ `iss-kupoli-v1-ajat/<id>-2.json`): v1-paikka, -nopeus, -kierros, -auringonnousut, -lansi, -yo, -ilmakeha, -aika, v2-kiihdytys/kelaus/perilla/ei-ylilentoa/nyt, v3-kuva-paikka/paiva/yo, telakointi. **Uusi manifesti `audio/iss-kupoli-v3.json`** (rakenne = v2, polut -2) → KupoliAanet.Manifestit: v3 ensin.
- **Loppu** (7): `audio/iss-loppu-v1/iss-loppu-*-2.mp3`, manifesti `audio/iss-loppu-v2.json`.
- **Kamera** (3): `audio/iss-kamera-v1/iss-kamera-{kertomus,kysymys-3,vastaus-kamera}-2.mp3`, manifesti `audio/iss-kamera-v2.json` (kysymys-uusi → iss-loppu-kysymys-a-2). KupoliAanet.cs:n kiinteät `audio/iss-192/iss-kamera-*.mp3` -polut vaihdettava koodissa (tai lukea manifestista).
- **Kuun telekuva**: `audio/iss-fakta-v1/iss-kuu-telekuva-kuvan-synty-2.mp3` (kiinteä polku KuuKuvaTiedosto).
- **Ohje + aika**: `audio/iss-192/ohje-ohjauspaneeli-2.mp3`, `audio/iss-192/v1-aika-v2-2.mp3` (kiinteät OhjeTiedosto, AikaV2Tiedosto).
- **Lähtölasku**: `audio/raketti-lahtolaskenta-v3.mp3` (8,1 s, T0 5,0 s, iskut 0…6 s ennallaan) → raketin manifestiin v14 `"lahtolaskenta"`.

## Jätetty pois (ei pelissä)
iss-johdanto-1-cupola, 4 × iss-raketti-fakta-* (alusta/nousu/toinen-vaihe/telakointi): koodissa ei viittauksia. Muut ISS-selitteet (277) ja Pulun otot olivat jo fi pakotettuja.

## Tarkistus
Whisper-small (puhuttu vs. tunnistettu): 27/31 ≥ 0,8. Kaksi heikompaa kuin vanha otto: `v1-auringonnousut-2` (0,61, "vuorokahodessa") ja `iss-loppu-vastaus-ohjaus-a-2` (0,71, "lennan minne haluet"); vanhat tunnistuivat puhtaasti. Oikeita ottoja ei kuunneltu. Uusintaotto kummastakin vaatii omistajan luvan (yksi otto kustakin) – mahtuu lupaan (6 ottoa / 860 mrk jäljellä), jos PT/KK kysyy.

## Avoin löydös
Raketin selostusraita (`raketti-selostus-v8.mp3`, Williamin osuudet: alusta…cupola) ei ollut KK:n listalla; tarkistan tee-skriptistä, onko fi pakotettu, ennen kuin ehdotan mitään.
