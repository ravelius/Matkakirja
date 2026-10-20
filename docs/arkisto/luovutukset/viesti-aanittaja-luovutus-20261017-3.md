# Äänittäjän luovutus 17.10.2026 klo ~11.15 (Postivahti: kova raja 35 %)

Lue ensin: viesti-aanittaja-luovutus-20261017-2.md (+ -20261017.md, -20261016.md: säännöt, työkalut). Osoitteet: /Users/Shared/Claude/osoitekirja.md. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_dfa7296a-d3d3-41ef-a2b1-dbc42a652589, Postivahti local_a24c43c0-8094-4141-b734-90b9555f5044, SS local_86d0c984-aeeb-430d-bc85-3112f27b9437, LS local_771b401b-80a3-4ada-a0d9-d17c6cb9c2c4. Viestit PT:lle ≤ 3 riviä.

## TEHTY 17.10. 01.48–11.15 (kaikki ämpärissä, CDN 200, raportit docs/raportit/)
- **Euroopan luennat VALMIIS** (2 342 yhteensä): oppaat + kaupunkilehdet (257, manifesti v5), maalehtien osajoukko FRA DEU ITA ESP NLD AUT GRC (256, v6; luentokatto 1 505 ylittyi 6:lla, ilmoitettu), loput 831 maalehteä omistajan luvalla klo 07.06 (v7, 9 241 palaa; SS kytki f7977522a). Raportit: luennat-era4-oppaat-kaupunkilehdet-, luennat-maalehdet-jaljella-20261017.md.
- **HINTA (PT 17.10.): kaikki kustannusarviot 0,240 kr / LÄHETETTY merkki, [pause]-tagit mukaan** (831-erä: arvio 83 500, toteutui 90 067). Muistissa: aanityksen-hinta-0240-tagit-mukaan.md.
- **Katto-tarkistus ajossa**: `proto-3d/_tyo/luennat-laskelma-20261017/vienti-0200/kuiva.py lehdet <erä> --aja` vaatii env `RAJA` (mrk) ja `KATTO` (luentoja yhteensä; VIETY oletus 1 511, nyt 2 342 → uusi ajo vaatii uuden luvan). `kuiva.py` vertaa man-v6/v7-tyyppiseen manifestiin (polku scratchpadissa, päivitä).
- **Kiinan dynastiat -kertoja** (30 tekstiä, 7 038 mrk): `aanet/kiina-kertoja-v1/` (LS kytki 20604d573). **Rodinin 8 veistosta** (4 274 mrk): `aanet/taidemuseo-kertoja-v2/ranska/rodin-*.mp3`; LS:n manifest-199 viety.
- **Louvren lähestymisäänet** (ulkosilmukka 60 s + sisäänmeno 12 s, omasta kirjastosta): `aanet/taidemuseo-louvre-v1/` (SS kytki 180761d6e).
- **Tivoli-äänet** (8 kerrosta, Freesound CC0/CC BY, EI kytketty; kytkentä LR/PK vaihe 5): `aanet/tivoli-v1/manifest-v2.json` (karuselli 55.67318/12.56807). CC BY -nimeäminen (YleArkisto 513923, klankbeeld 192092): paketin `nimeamiset-ehdotus.json` → data/aanilahteet.json kytkiessä. **Isoisän Tivoli-lähitarina** (1 luenta/170 mrk, KK klo 11.08): `aanet/tivoli-v1/tivoli-lahitarina-jarvi.mp3`.
- Tuotantopohja uusi-linssi.md:n Äänittäjä-osio (PR #4771, 90d554441).

## KESKEN / SEURAAVAKSI
1. Tivoli: LR/PK kytkee; mahdolliset kuuntelun jälkeiset vaihdot (Himmelskibet ja torni ovat yleisiä kirkunoita; vaihtoehdot `_valmiit/tivoli-v1/kuuntelu/` ja haku/finalistit.json). Hyväksymättömät maalehti-/muu generointi vaatii KK:n "OMISTAJAN PÄÄTÖS" -rivin.
2. i-kortin faktat (134 kpl, 13 415 mrk): ehdolliset Natiivi-UI:n vahvistukselle; muu maailma ja isoisän saapumistekstit (215) odottavat omistajaa (ei nyt).
3. Vanhat avoimet: Kipin v2 ym. äänisivun valinnat, Soundly-lataus GUI:lla, muiden kaupunkien Pulu-kutsut PT:n käskystä, äänipohjan tasot, Ranskan 51 kertomuksen nimien ääntämys (kuuntelematta).
4. Oikeita ottoja ei kuunneltu (kuuntelu ei ole portti).

## OPITUT (uusia)
- ElevenLabs-hinta mitattu 0,240/lähetetty merkki (aiemmin 0,226–0,230); syy epäselvä. Usage: `/v1/usage/character-stats?...&breakdown_type=voice` (UTC-tunnit) paikantaa ajon kulutuksen; `/v1/user/subscription` jää välillä jälkeen.
- Freesound-haku on konjunktiivinen: yli 3 hakusanaa → 0 osumaa; käytä 1–2 sanaa. Actions-ajo `gh workflow run 326102787 -f tila=ehdokkaat -f haku=… -f lahteet=freesound -f maara=12` (yksi kerrallaan); esikuuntelut curlilla (hidas, ~1/min; `while read` jättää viimeisen rivin, jos tiedostossa ei ole loppurivinvaihtoa).
- vie-paketti.sh hylkää paketin ilman LAHTEET.md/MANIFEST.md; ämpäri ei ylikirjoita → korjaus = uusi nimi (manifest-v2.json).
- Paketointipohja: `luennat-laskelma-20261017/paketoi.py` (kumulatiivinen manifesti), `kiina-kertoja-20261017/tee.py` ja `rodin-kertoja-20261017/tee.py` (kertoja yhdellä otolla + tempo 1,10×), `louvre-lahestyminen-20261017/tee.py` ja `tivoli-aanet-20261017/tee.py` (numpy-miksaus; ajettava ilman -I).
- Tili 17.10. 11.xx: character_count ~280 000 / 887 977.
