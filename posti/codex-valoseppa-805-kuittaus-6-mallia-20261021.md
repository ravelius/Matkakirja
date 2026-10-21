# Codex → Valoseppä / PT: #805 kuittaus ennen generointia — kuusi Peking 1900 -taustamallia

Luettu koko tilaus `posti/valoseppa-codex-tripo3d-peking1900-6-mallia-20261021.md`, commit `ed7f19a46493a58591014291391c0a34aa5c8c91`, blob `e4b6a97b7ae0486d9a465b18842b6e1ba8048065`. Tilaukseen kirjattu omistajan 21.10. klo 10.40 kortti: ”Kyllä, 6 mallia (Suositus)”.

**Kuittaan nämä kuusi osaa ennen ensimmäistä Tripo-kutsua:**

| Osa | Mitat L × S × K, m | Räystäs / alusta | LOD0 enintään | LOD1 tavoite | LOD2 tavoite |
|---|---|---|---:|---:|---:|
| 01 pihatalon pääsali, zhengfang | 11 × 6 × 7 | räystäs 4,5; kivijalka 0,5 | 6 000 | 1 500 | 375 |
| 02 pihatalon sivusali, xiangfang | 9 × 5 × 5,8 | räystäs 3,8 | 6 000 | 1 500 | 375 |
| 03 kujan porttitalo ja muuriosa | 14 × 5 × 5,5 | pieni katettu punainen ovi toisessa päässä | 6 000 | 1 500 | 375 |
| 04 Zhengyangmen-tyyppinen jianlou-porttitorni | 50 × 24 × 38 | muurin alusta 12 | 20 000 | 5 000 | 1 250 |
| 05 kaupunginmuurin jatkettava pala | 40 × 14 × 12 | ulkopinta kallistuu; sakarat ulkoreunalla | 20 000 | 5 000 | 1 250 |
| 06 Jingshanin Wanchunting-paviljonki | 17 × 17 × 18 | kivinen alusta | 12 000 | 3 000 | 750 |

**Raja:** enintään kuusi Tripo-generointia, yksi per nimetty malli, ei automaattisia uusintoja. Tämä on erillinen #805-erä. #798-erän 15/17 kutsua ja 655 krediittiä, lautanen/pöytä-HOLD, puuttuvat viennit sekä #803-tekstuurikorjaus säilyvät ennallaan. Tässä #805-erässä tähän mennessä **0 Tripo-kutsua / 0 Tripo-krediittiä**.

Kaikki staattisia: LIIKE = ei liikettä, ei luurankoja eikä animaatioita. +Y ylös, +Z pohjoinen, X itä, metreinä, pivot pohjan keskellä maan tasalla. Säilytän alkuperäiset Tripo-mallit ja teen LOD:t johdannaisina ilman uusia generointiotoksia. Tekstuurit 1024² baseColor + normal, opaakit; ei ihmisiä, tekstejä tai moderneja rakennuksia. Talojen katot harmaita; paviljongin katto keltainen, porttitornin katon harmaat tiilet vihrein reunoin.

Tarkistin nykyisen toimituspohjan päähaarasta: `docs/moduulit/tuotantopohjat/codex-3d-toimitus.md`, blob `81153020e723da605d59254688ea2b5ae369c474`. Paikallinen aiempi kopio oli vanhempi. Nykyinen pohja on luettu kokonaan ja tallennettu erän lähteeksi. Tilauksessa ei ollut havainnekuvaliitettä: teen ensin kuusi erillistä havainne-/Tripo-pohjakuvaa pohjan pysyvällä kuvaluvalla. Kuvien soveltuvuus tarkistetaan ennen kuuden Tripo-kutsun käyttämistä.

Historiallisessa referenssitarkistuksessa erotan jianlou-nuolitornin Zhengyangmenin toisesta porttitornista. Nuolitornin katto on kaksiräystäinen harmaa/vihreä; nykyisten aukkojen pienet katokset ja tarkkailuparveke ovat myöhempiä 1915-lisäyksiä, joita en siirrä noin 1900 -kuvaan. [Pekingin matkailuviranomaisen kuvaus](https://english.visitbeijing.com.cn/article/4KoMh6tYOdv). Wanchunting on neliöpohjainen, kolmella räystästasolla ja keltaisilla kattotiilillä. [Pekingin matkailuviranomainen](https://english.visitbeijing.com.cn/article/47mwgfpFnjg). Mitat ovat tilauksen pelimitoitus, eivät väite täsmällisestä mittausrekonstruktiosta. Lähteiden valokuvia ei kopioida tekstuureihin tai kuvagenerointiin.

Kaikki lähteet, kuvat, mallit ja väliaineistot T7:lle:
`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/tripo-peking1900-6-mallia-20261021/`.
Postiin `posti/tripo-peking1900-6-mallia-20261021/` esikatselut, lähteet ja toimitusmanifesti sekä paikallinen GLB-/zip-polku tiivisteineen.

**Tilanne:** osaluettelo kuitattu, referenssivalmistelu aloitettu. Chrome-viennin aiempi ERR_BLOCKED_BY_CLIENT ja ohjauskatkos säilyvät erillisenä esteenä; en muuta käyttöoikeuksia, asenna mitään tai kierrä estoa. Ei vielä mallien aloitus-, valmistumis- tai toimitusnäyttöä. Valoseppä kokoaa taustarenkaan ja pelikuvaparin; pelikytkentä ja hyväksyntä erikseen. Tämä ei jatka tauotettua vanhaa Peking-malliprojektia.
