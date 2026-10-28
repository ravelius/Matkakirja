# Codex / Matkakirjan kuvat → Lavastaja, PK, PT: kivipinnat v5 toimitukseen

Lavastajan 5658e3dfb-tilaus on toteutettu tässä kuvasessiossa. Uusi kivipohja ja metrinen kivijako, vanha v4 säilytetty.

- **Lattialaatat-v02:** pitkä sivu kujan poikki, 0,65–0,70 m × 0,33–0,34 m, kuusi poikittaista riviä 2 × 2 metrillä. Eri saumasiirtymät riveittäin. Uusi vaalea kermanharmaa/harmaa marmorijuonne, yhtä suuri metrikohtainen skaala molemmissa suunnissa; ei v4:n venytystä.
- **Sokkeli-v02:** 8 × 0,15 m kerrokset, 0,45–0,55 m pitkät erimittaiset kivet. Yläpinta ja pilarit samassa jaossa; kulman jatkuvuus tarkistettu.
- **SEAMS.json:** todelliset rivirajat ja pystysaumojen keskilinjat kaikille uusille pinnoille, sekä PNG- että glTF-V-suunnan selitys. Reunalla jatkuvan kiven koko jakso mukana. VS voi laskea tästä reunapyöristyksen; vältettävä saman pyöristyksen kaksinkertaistamista nykyisen normal-kartan kanssa.
- Reunakivi-v01: kaikki neljä karttaa tavutarkasti samat kuin v4. Omistajan lukitusta ei muutettu.

Paketti: `posti/juoksupeli-kujakivet-20261028/stone-surfaces-v5/`

T7: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-kujakivet-11911194-20261027/stone-surfaces-v5/`

20 uutta karttaa + 4 muuttumatonta reunakivikarttaa = **24 PNG**. Mukana albedo (sRGB), normal-opengl (+Y), roughness ja height (16-bit, aiempi dekoodaus), SHA256SUMS, MATERIALS.json, KAYTTO.md, saumakartta ja kaksi esikatselua. Koot ja fyysiset mitat säilyvät v4:stä; uusien pintojen versiotunnus v02.

QA PASS: 24 karttaa avattu takaisin; koot, bittisyys, normalien pituudet, albedon/heightin/roughnessin/normalien toistorajat, kulman jatkuvuus, yläpinnan saumajako, saumakartan vastaavuus oikeisiin laastikeskuksiin ja reunakiven SHA:t tarkistettu. Esikatselussa laatat ovat vaakaan ja kiven rakenne on luonnollinen. Pelissä otettu v5-vertailu on vielä avoin.

Yksi uusi sisäänrakennettu ImageGen-kutsu; 1254 × 1254 alkuperäinen ja täysi kehote mukana. Tripo 0. Saumat ja PBR-kartat ovat uuden metrisen materiaaligraafin leivonta, eivät v4-kuvan venytys. Mallien geometriaa tai pelin koodia ei muutettu.

Lavastaja: kokoa v5 samoille UV-pinnoille, U kujan poikki ja V kujan suuntaan ilman erillistä venytystä. Ota tavoitteen kanssa pari samoista kameroista KK:lle. Lopullinen pelisävy, vastaanotto, integraatio ja omistajahyväksyntä ovat erillisiä kuittauksia.

Tripo 3D -sessio jatkaa Puyin käsipitoa, liidon asentoa ja J4-hopeaa. Niitä ei sisälly tähän toimitukseen.
