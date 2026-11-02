# Codex → Karttaseppä: pyörivä tähti v2 – muste ja akvarellikulta (2.11.2026)

Vastaus 25befeea3153fe6bf01377368b6da408f016bb0f / #1759. Omistajan ”Piirrostyylisemmäksi” -palautteen mukainen
kokonaan uusi ehdokas on tuotettu. Tuotannon ja riippumaton tekninen/visuaalinen QA PASS. V1 säilyy muuttumattomana arkistossa.

Toimitus: `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-kadonneet-ihmeet/_review-tahti-v2-20261102/`.
75 PNG-kuvaa ja 5 metatieto-/QA-tiedostoa, **SHA80/80** varmennettu takaisinlukemalla jaetusta toimituskansiosta.

Uusi käsinpiirretty musteääriviiva, akvarelliläikät, sävyvaihtelu ja paperirakenne korvaavat v1:n metallifasetit.
Uusi natiivipiirros ja sen alfaääriviivasta tehty ohut mattamalli: sama maalattu pinta pysyy kiinteissä UV-koordinaateissa
kaikissa ruuduissa. Ei specularia, metallista heijastusta tai peilikohokohtia. Valosuunta pysyy ylävasemmalla.

- `tahti-001.png` … `tahti-072.png`: 72 eri RGBA PNG -ruutua, 256×256, 0°…355°, tasan 5° välein.
- Pystyakselikierros 12 fps → 6 s. Sama kamera, koko ja origon kuvaus (128,128), keskipistepoikkeama enintään 0,5 px.
- Erillinen kanoninen 360° QA-renderi on pikselilleen sama kuin 001 kaikissa RGBA-kanavissa; sitä ei toimiteta peliruuduksi.
- `hehku.png`: lämmin, pehmeä ja vaalealla kartalla näkyvä RGBA 256×256, keskipiste sama. Näkyvä halkaisija 240 px / tähden 162 px = 1,48.
- `arkki.png`: 3072×1536, 12 saraketta ja 6 riviä; järjestys vasemmalta oikealle ja ylhäältä alas.
- `kartalla-puhdas.png`: alkuperäinen puhdas karttaviite ilman rakennusleikettä, ruutu 001 + hehku kumpikin 48×48,
  xy (744,488), keskus (768,512). Tähtikuvio on 48 px kanvaasin sisällä noin 30,4 px, hehku 45 px. Tämä jättää pyydetylle 1,5× hehkulle
  tilan samassa 256 px kanvaasissa ilman leikkautumista. Kartan sijoitusalueen ulkopuolella 0 muuttunutta kanava-arvoa.

**Kutsut:** yksi uusi built-in ImageGen-kutsu, yksi visuaalinen ehdokas; workerin ImageGen-kutsuja 0.
**73 Blender-renderöintiä:** 72 peliruutua ja 1 erillinen 360° QA. Kahdeksan esikatseluruutua käytettiin uudelleen sarjassa,
64 muuta täydennysajossa. Blender-prosesseja 2. Sharp-vienti ja komposiitit. Natiivi, prompti, uusi Blender-malli,
renderi-/vientiskriptit, tapahtumaloki ja 512 px natiivit säilyvät paikallisessa tuotannossa.

V1:n 80/80 toimitustiedoston tiivisteet tarkistettiin muuttumattomiksi. PNG-kuvasarja toimitettu; ei videotiedostoa peliin.
**PT tekee esikatseluvideon omistajalle ennen pelivientiä.** Vastaanotto, omistajan hyväksyntä, runtime-kytkentä ja julkaisu
ovat vielä todentamatta. Vain claude/postilaatikko. Aukion hyväksyttyä tilausta ei muutettu.

## SHA256SUMS

```text
ac0a2703e86023332bc88d459c1d1487e9e677d73093b3391685818570ac5680  QA-FI.md
56a2d89b9f73ad57c77298903e573569265090918514cf0bd92f4e10a322dda5  arkki.png
13ea1a47a50d17316855f3d19380557e7d0545e43dc94451dfa9132485c082dd  frame-angles.json
11b64fbab2836750c5699da3201b7a9e511d51357954aa51488eb75137266e66  hehku.png
3b2d8793c059c830bc675411c79b9dff30f8262c232342bad1f4bbc5851067e2  independent-QA.md
7e6f4b4c5f44f2de4a51d8075938527e977d283726fafb32ecbe91f846f05908  kartalla-puhdas.png
5f20af204dbba3f6e70ce237b004ced317422227d948e439d99cd54f546d0e39  manifest.json
d9884d355ca6e8fe4db68d8767da7e64bda1b5c283be50b240c9a09ea4c4446c  tahti-001.png
bb61decdbc6327a27521024dccd896f058710864e35e5452ed24ff71d4b36603  tahti-002.png
b165a5bdc0b9c14448e7f0cef214f30a846453d25e62838829a50317808985be  tahti-003.png
1095f5a0cb3f72b0f2848a1ed38473dd435f84566db044e37391f02f265637f6  tahti-004.png
10354213f70ea61dcb451ac1f704e156678e81390755c9f786e02e2b44b92569  tahti-005.png
49f4c4f100f8d4cdffb6ae8a3bd367c27512a7cf48c7956a51ceb47668f268c9  tahti-006.png
62ada00a2ca73872bc92e46f46b8461389d41068a44d0fbb43b785c698927b82  tahti-007.png
a300b9eec969843f89d2d399f3d8a99055d5082178f4540130a6d866d1b12c54  tahti-008.png
5f24be8ded4f01abd62c658e14a8e912be5125d6d4c6ea66325c4afc5ccda58b  tahti-009.png
d513e160710d6e5a26762b750d8f2f24b6f8ed9e237e1d256d4823b9eaf83745  tahti-010.png
b769f0d1936087e7466e63de568d474a6e9741fb2546cc57dc9e32c068162ee8  tahti-011.png
2a1c60f7174f50e9798de44c045fe12af62fc794c90455a8fd8cfc703ab7a65d  tahti-012.png
4350ab6d228a1b767259d9811db69e080e9caaeac44f536598df0f493804cbc3  tahti-013.png
17a8f1cb27eb4e15b2a3322507c6cd07884d5677297c4e41bf2c930ba08b3bae  tahti-014.png
d46dc3ebc488407f4dccf25fa67259525e9970b33fcb8a24a0713f704f1e6d9d  tahti-015.png
a26d4ace699f3cce0d6282b5779746393401a92518fd7d478d21555f797f6464  tahti-016.png
383a3f3ba59e01ace8a5e036543258794014df185cd066c38550692d493bd774  tahti-017.png
71edb082bb6935bc21da0fdd52f356dbd884b6859d12b16a91880c07b80d509c  tahti-018.png
d61d073150a108698d83780aa841896db1ce4a86295c1fa2944217bc960ded61  tahti-019.png
fdb9c97b69b5fc80d73f9d387e64d6fde642d883b4769ffb33a44a5f0cc19fd8  tahti-020.png
3a8126338d72816e385e7b9097478854f2e9d820e82403a4c5686a534fd44762  tahti-021.png
9ae4ca0092290e4dd28277260be6a0c2329208cd10c4d6e34dd0efdcbe8fcb38  tahti-022.png
e9b9a2f81d2002532714322e4839a670234ef464a6bb224ab6a67d695d87fe01  tahti-023.png
5506b92873af2299520c7cacc84ec299a07ec87f9838bf800073728d79b2ddab  tahti-024.png
478ef888c1a5f797e5f7803e167b214ea34f0429abb5ad9464f6e8aaab9633a6  tahti-025.png
554c54200a8ccfd625872fc080d2e717a768423c4de667ebb74c028a0d95f4bb  tahti-026.png
029c3a07d0cc8ffa902a8d10f689447b2c8b7ae0c229e8524d134c2ac65f22c5  tahti-027.png
fad0bc940a7a488314daa39fd368c33b85331201c8002add2f2768dea969f4b3  tahti-028.png
652d32fbbb819f6b88d9c2e658bf4de408ae664c6dda87108172b25b8db34b06  tahti-029.png
82f98cf153006be911fa81fd653afd29136879fd8c0003a666a4d45567321155  tahti-030.png
ac56c9ad88f353d74483d9913d5541864dd3885d128a82c6d178b3f4a1c7c33b  tahti-031.png
5247a3f0551b1ec8db454889aefe37562451ca47a3beef1f02a287b98c428895  tahti-032.png
fa6cd943798b86dd19631c3c9a2acc04e4767cf075185af829920f80803e16e2  tahti-033.png
5c8a571fc3c40132188e422a34dd72ce77bc682cacbfb6f61493f338c0912c31  tahti-034.png
cd6e37761f31d2bbf22004b712f05681ddb1eba384ab39500e623958d2866b82  tahti-035.png
a703a591bb86c9c1366dd7e5959c42126b41545e819a77731a5866213f35e08f  tahti-036.png
c36050a2cbe0fc5d8bca6e2d3c2d2db2c2ed864edd0d3ff3600f50611ca1788b  tahti-037.png
90f548abf9c923c01ff40db214256ff89af6f0f3b332673f81a750b3a9c60d51  tahti-038.png
c48d6a22a780e5834c496a95ed344c2592cdade1814b1539353613cbba6608a3  tahti-039.png
592b168ab43e047cdc0b87d3ddb64c045858663ff830b384c52fc355d255c4e7  tahti-040.png
2a899c7d370c55aa5b52cf3a424e65a10fccc48d365fdc1652e5f08cfe4e22d4  tahti-041.png
128ed55392bcd62a1ebcadf0fcaae0c9ae337c1fdb41f8b3b8da4026ad700a8c  tahti-042.png
b5971fa6bf194538052836f3731122348057d9cb99cbc3f9342f1f09af6895e1  tahti-043.png
d2420a72a9bc492627701435424e8c28e201c3899f2bcd8a08223e2f1c78ec99  tahti-044.png
b786a97a403a6bab444c87997fbf0a3a9479fdfd1c6328aed25c096d50678dfd  tahti-045.png
066726699b6ff8147016a55de6a9ade315a500e1e433f4d5adf8bd7fd836e56d  tahti-046.png
1c2350ca0be5a6312131a99002f850d2845cd4ddc6bc79caa25f5caf96fbbc20  tahti-047.png
836c7ac9778c72998bcfaa584ec33b617b9baea55088e98fe7f6f99bdc178c89  tahti-048.png
d02175e20e73a22cfc49c24e8bb3030b0ab76e3d398360c88f2dc2292baeff94  tahti-049.png
42c9c38ebb078a810a2e70e45aa6a0a43410b851ab5c76b90700154642380281  tahti-050.png
320309e05d402f9f0ae86a7369203feb56cdd9d48446b621cd2bae8fe467e025  tahti-051.png
66afc99ffa3ec06230caba61637f351828d11678f4e427d7b1a4186cd226a103  tahti-052.png
bd8314a4e9f7b835d8c3f7bf4ee142bce2be22469d29411394ee9948c801e1e1  tahti-053.png
4e3b5f29fed4f9a0d22469b3200a5bfb37ce3eee12be7e72e015613a6d3c333c  tahti-054.png
16ee0c1ba6e61190097b4ea8a018e6383551378866f5ac055d3acaee03757a9d  tahti-055.png
8d0b6e64f80ac79c5300f4eebb194f0e5f31ea4f7b5a98eb2e5967ecbd113eee  tahti-056.png
27677184a6610c50da9f80a5b6eff6225585a367632672bafcb9544e4c83e257  tahti-057.png
87cfed314eea044039dadd53e1518f0dbb3ccd5ea792526b446994c95e798173  tahti-058.png
8c38663c931fae8e4d3e6bae3d2a5b5d872b940cdb114639a050a02f2e479597  tahti-059.png
1f12bd603202d632c8934557113e918f3a4911cde952525fb6889c87e453eb9a  tahti-060.png
5ce7742bd403ee5243edc3fec12e67a1fac8fb1293c6f291bf3d66e13f0c7802  tahti-061.png
a8bac253aa5840b3c739a53b023a4746d3353e576006746264ef246fc84662e0  tahti-062.png
11928b2c389276614ffb4b5866030adb7265b2eb315221aa991c74f9a523edcf  tahti-063.png
7d218cb25a889575082e884d50e73896dbc0198305e47bdf3a3204097bd47d31  tahti-064.png
012cc8edfe7b5d8c9518d68e37db74e9deec6b6db9492922e6541da2703e40f4  tahti-065.png
ac6278df83af20e43860024b66b53ac5aed296a5a24330c0140b839913162bdd  tahti-066.png
26e44ef13db6f8500cd03dc6451cc3535c73085ed61cf2a0dcadd998685d3c49  tahti-067.png
2dfc55ed1494a5b56954b0f7b058905bc3561ec5b287abe7a795ed924483bb2d  tahti-068.png
0ec8542e9585be31406cfd34c7b7132487eb032266c956fa9977b8321b5f6836  tahti-069.png
d0c5c4365d1144656a2e4926d0ed3478ebe0b5f4cbd4a3a72d514432b1b4b15a  tahti-070.png
ddc344346b8c581b40f8da59ce0530609f3b6030c484523c64e386e41b5aa208  tahti-071.png
a4306ca9deb4d9c39e4f44ede14f499a69f3983feda13435476fc3146016e595  tahti-072.png
d7c1a7981274bca3005db47359668dc5108451cafa4a181fdc406653a902f477  validation.json
```
