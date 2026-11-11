# Codex → Natiivi-UI: tarinamerkkien viisi vaihtoehtoa (11.11.2026)

Tehtävät #2212–2216, uusin lähde 3a45ca51369ee9c33d2c07aac884b70a6456a582 / 106fa1c709b7ddcaebf32a378cad43fd6a86dc6c. Korjaukset #2219 (yksinkertaistus) ja #2220 (kuvat vain Codexilta) toteutettu.

Toimituspaketti: [_review-tarinamerkit-20261110](../_review-tarinamerkit-20261110/LUE.md).
Vertailu: [arkki.png](../_review-tarinamerkit-20261110/arkki.png).
Jaettu paikalliskopio: `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-kadonneet-ihmeet/_review-tarinamerkit-20261110/`.

Viisi RGBA PNG:tä 256 × 256: kirja, taskukello, sulka, lyhty, tiimalasi. Näkyvän aiheen korkeus 169–171 px, kiinteä keskitys. Täytetty tumma seepiasiluetti ja ohut pergamenttireuna; ei pikkuyksityiskohtia, hehkua, tekstiä, numeroita tai kahta esinettä. Sulka ilman pulloa.

Arkissa kaikki viisi sekä v2-tähti 001 näkyvät täysikokoisina ja 48 px:n koossa saman puhtaan karttaleikkeen päällä. Lisäksi paikallinen 40 px:n tarkistus sekä vaalea/tumma alfa-QA läpäistiin. Tähtiviite varmennettiin alkuperäisen #1759-toimituksen SHA256:lla; sitä ei tuotettu uudelleen.

**ImageGen-kutsut:** kirja 2, taskukello 1, sulka 1, lyhty 1, tiimalasi 1 = **6 yhteensä**. Kirjasta valittiin toinen, kompaktimpi otto. Lähteen enintään kaksi ottoa per aihe säilyi. Kuvat tehty sisäänrakennetulla ImageGenillä; tekninen pienennys/keskitys ja vertailuarkki ImageMagickilla. Alkuperäiset ja valitsematon otto säilyvät tuotannossa.

Tekninen ja visuaalinen QA PASS. Tämä on kuvatiedostotoimitus: vastaanottokuittaus, omistajan yhden merkin valinta, Natiivi-UI:n pelikierros ja julkaisu ovat erillisiä. Natiivi-UI voi nyt tehdä tilauksen mukaisen testikierroksen. Ei uusia drone-toimia.

## SHA256SUMS

```text
c6ec2d0bd826f275eb129c12877b9ed9ba8e3800d41788887e1352cac14282ed  LUE.md
1a45000f4db317f0fd9574f4eb02d5950af16f0a0446684da6f8892c50f97bd5  PROMPTS.txt
41cadf482af85f4db503808a16c2ad221b93239e1cbd8d99c117184a398a4f7c  PROVENANCE.json
3313b954ff8594906d3c485f8db1967c16cb2261ef47742cab37f0f560eda576  QA.json
360a6a32f8707539bdc5d0507d6e5543b5e0a32cc735581e2acd249bc172b6fe  arkki.png
78bf83e55552426f56d0f448ee090d62526e60bca7ec75b78b628a9c34d22a72  tarina-kirja.png
c075b0e9cdee2568e9136bb9da6593fda0331871e93a62ea42530ac5e3545b7d  tarina-lyhty.png
a482d7dabda01d8cdfc4f9b6a635e81dfa3d014eceedda5f4039c5b57602ccb5  tarina-sulka.png
97f9527cf5c58a2f50e5b5d1d6da5c796ac78aa0a9d58b49edbc34a435c8a79a  tarina-taskukello.png
ae365623a588446edb441f13c7290457aad80e8ccf4e7f398fb3414b24dd91ac  tarina-tiimalasi.png
```
