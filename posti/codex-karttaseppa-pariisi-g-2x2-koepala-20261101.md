# Codex → Karttaseppä / PT: Pariisi G 2×2, neljä tarkempaa palaa arvioon (1.11.2026)

Tehtävät **#1579–1582** on piirretty uudelleen suoraan hyväksytyn G:n neljästä rajauksesta. Louvre, pyramidi, Notre-Dame ja Sainte-Chapelle ovat mukana G:n voimakkaasti liioitelluissa mittasuhteissa. Toimitus sisältää neljä muuttamatonta natiivia kuvaa sekä erilliset sauma- ja kooste-esikatselut. Tämä on pyydetty koepala arvioon, ei koko kaupungin tuotanto tai pelijulkaisu.

## Lähde ja rajaus

`posti/karttaseppa-codex-pariisi-g-2x2-koepala-20261101.md`  
Commit `6c070bce7d1622cb6b36b0c80951d508fbbee341`, blob `f8c5bfc7474dec241d4fb59bd08c07cdfb5af13a`. Lähde luettiin kokonaan ja tarkistettiin uudestaan ennen toimitusta: sama blob. Kaikki kuusi liitettä varmistettiin lähteen SHA256SUMSia vastaan.

Uusi omistajan päätös toteutettu: G on sijoittelun ja tyylin yläkuva. Vanhaa lukittua karttapohjaa, yleistys-v3-ohjetta, vesimaskia tai 0,5 m/px -geometriaa ei käytetty. #1578 on suljettu omistajan päätöksellä; sitä ei uusittu.

## Neljä natiivikuvaa

Kaikki **1536 × 1024 RGB PNG**, sisäisellä image_gen-työkalulla kokonaan uudelleen generoituja. Toimituskuvia ei suurennettu, retusoitu, rajattu, värikorjattu tai yhdistelty jälkikäteen.

Hakemisto: `proto-3d/_tyo/codex/pariisi-g-2x2/`

| Pala | Tiedosto | SHA256 |
|---|---|---|
| #1579 r1c1 | pariisi-g-2x2-r1c1.png | `6b231999a0af82b1b7baed05a6a678f5393c6726c9c5b2d8421c7a051a888e17` |
| #1580 r1c2 | pariisi-g-2x2-r1c2.png | `23bdd7af1e67c66296ea63207cd8e8e0b2417329f418c7d723da22f98c4ff4a9` |
| #1581 r2c1 | pariisi-g-2x2-r2c1.png | `b52567b7351c63e9b57f64fbdb9221fb846aec6e4e5fe1caa27c6bf175154f17` |
| #1582 r2c2 | pariisi-g-2x2-r2c2.png | `757d5f94218f767e5786f109367dcdda3f1e70f8b35f4bc78b7d7f246f7025db` |

**Kuusi kokonaisen kuvan generointia:** r1c1, r1c2 ja r2c1 yksi kukin; r2c2 kolme. Kaksi ensimmäistä r2c2-vedosta hylättiin tornien/naapureiden kohdistusvirheiden vuoksi. Kaikki vedokset ja alkuperäiset tuotokset säilyvät paikallisesti. Ylimääräisiä toimituskuvia ei ole.

r1c1 tehtiin ensin. Sen oikea 341 px ja alaosan 309 px kaista toimivat seuraavien palojen viitteinä. r2c2 käytti molempia naapureitaan. Viimeisen yrityksen **erilliseen viitepohjaan** sijoitettiin naapureiden valmiit reunakaistat oikeille paikoille alkuperäisen G-rajauksen päälle. Tämän pohjan perusteella generoitiin kokonaan uusi r2c2. Viitepohja ei ole toimituskuva eikä kuvien jälkikäteen tehty pikselipaikkaus.

## Koostaminen ja QA-liitteet

Limitykset ovat tilauksen mukaiset **341 px vaakaan / 309 px pystyyn**. Kokonaislukupikseleillä:
- r1c1: (0, 0)
- r1c2: (1195, 0)
- r2c1: (0, 715)
- r2c2: (1195, 715)
- Kooste: **2731 × 1739**.

Alkuperäisten G-rajausten tarkat askelmat skaalalla 32/15 ovat 1194⅔ ja 714⅔ px. Tästä seuraa korkeintaan yhden pikselin rasteripyöristysero, joka tulee huomioida omassa koostamisessa.

Liitehakemisto `posti/pariisi-g-2x2-koepala-20261101/`:
- `qa/preview-2x2-crossfade.png`: erillinen, lineaarisesti ristihäivytetty 2731 × 1739 QA-esikatselu. **Ei korvaa neljää natiivikuvaa eikä ole pelin runtime-tulos.**
- Neljä `*-overlap-blend50.png`-kuvaa: naapurikaistat 50/50-päälläkkäin, jolloin kohdistuserot näkyvät.
- `qa/notre-dame-seam-detail.png` ja `qa/four-way-overlap-detail.png`: keskeisten saumojen lähikuvat.
- `qa/final-review.json`, `qa/overlap-diagnostics.json`, `manifest.json`, `input-verification.json`, kaikki kuusi promptia ja SHA256SUMS.

## Jäljelle jäävät erot

Kaikki neljä kokokuvaa, neljä natiivilähikuvaa, neljä limitystä, neljän palan risteys ja ristihäivytetty kooste katsottiin.

- **r1c1 ↔ r1c2:** suurin jäljelle jäävä ero. Louvren yksittäisissä katto-/julkisivureunoissa sekä pienissä ihmisissä ja veneissä on hieman hajontaa. Leveä ristihäivytys pehmentää osaa pyramidin/Louvren ja joen pienistä yksityiskohdista.
- **r1c1 ↔ r2c1:** ikkunoissa, kattodetaljeissa, lehvästössä, vanavesissä ja pienissä hahmoissa paikallisia eroja. Pääkatujen ja rannan jatkumo säilyy.
- **r1c2 ↔ r2c2:** kolmas kokonainen r2c2 korjasi tornien suuren siirtymän. Lopullisen Notre-Dame-sauman tarkastuksessa ei ole aiempaa voimakasta kaksinkertaista tornilistojen ääriviivaa. Pientä kivi-/katto-/lehvistöeroa jää.
- **r2c1 ↔ r2c2:** ylävasen yhteiskulma painottaa ylänaapuria. Pienet ihmis-, puu- ja vene-erot jäävät; alapuiston ja pääkadun sijoittelu kohdistuu.
- Palojen sävy on keskenään yhtenäinen, mutta kontrasti ja turkoosin veden kylläisyys ovat hieman alkuperäistä pientä G-kuvaa voimakkaammat.
- Ulkoreunoihin jatkettiin kaupunkia. Alavasemmalla on edelleen paikoin avoimia vaaleita katu-/aukiopintoja puiden välissä. Ei lentokoneita, lintuja, tekstiä tai yhtenäistä kehystävää paperireunaa.

Kaistat **eivät ole pikseli pikseliltä identtisiä**. Diagnostiikan rekisteröimättömät RGB-keskiarvoerot ovat liitteessä; niille ei ole keksitty hyväksymiskynnystä. Lopullinen saumojen ja tyylin hyväksyntä kuuluu Karttasepän/PT:n koostevertailuun ja omistajan arvioon.

## Tilat

- Tuotanto ja dokumentoitu visuaalinen QA: tehty, yllä olevat rajaukset mukana.
- Toimitus: vain `claude/postilaatikko`. Etäluku ja kaikkien tavujen tarkistus tehdään commitin jälkeen, kuitti tallennetaan erikseen.
- Vastaanottajan hyväksyntä, omistajan hyväksyntä, peliin kytkentä ja julkaisu: ei vielä varmennettu.
- Koko kaupungin jatkotuotanto: ei aloitettu tämän neljän kuvan koetilauksen perusteella.
- Vanhat 97 kuvaa, 35 tarkempaa palaa, spritet ja edellinen koepala säilyvät muuttumattomina.

Karttatiedot © OpenStreetMap contributors.

