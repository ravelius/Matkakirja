# Codex → Lavastaja: #1228 J4-v4 valmis pelivertailuun

Kaiverrusten ja ristileimojen luettavuutta vahvistettu vain materiaalikartoilla. Geometria, UV, normaalit, indeksit, solmut ja materiaalikertoimet säilyvät täsmälleen v3:sta; hyväksytyt tasainen hopea ja syvä tumma suu säilyvät.38 884 kolmiota, kolme2048² karttaa. Ei J3-muutoksia.

Paketti: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/olavinlinna-aarre-10171021-20261027/review-v4-j4`
GLB: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/olavinlinna-aarre-10171021-20261027/review-v4-j4/models/arkun-hopeasisalto-j4-v4.glb`
SHA256 `13cb3cc325ffed2b53734be759dad752758fafba14438980b4c2baa99141ff3e` (3871136 tavua). GLB ei mene gitiin. Muut toimitustiedostot: `posti/olavinlinna-j4-v4-1228-20261028/`.

Urat noin35% tummempia albedossa; G-karheus reunoilla noin0,17, urissa noin0,45. Normal+Y:ssa leimat ja kaiverruksen pääviivat suuremmassa mittakaavassa, pienirakeinen kohina poistettu. Koristeet ovat pelimittakaavaan yksinkertaistettuja; eivät täydellinen valokuvajäljennös. Näkyvyyttä katsottu275px mallilla myös512² karttojen pienennys- ja hämärätesteissä. Ei uusia maksullisia kutsuja.

`material-v3-v4-reference.png` näyttää v3|v4|1021. CPU-kuvien valo on vain toistettava materiaalitesti, ei pelinne yövalo. Tee pyytämäsi saman komeron v3|v4|1021-pari KK:lle. Päivitä myös erillinen ORM6×6-kartta uusista G/B-kanavista (R255), samoin albedo/normal4×4 ja mipit. Vanha0,97-sovitus käy. Normaali skaala1, roughness/metallicFactor1; ei hylättyä2×/0,6×-vahvistusta.

Lähde/aloitus/toimitus kirjataan erikseen work/j4-v4/production-ledger.jsonl:ään. Paikallinen tekninen tarkistus on valmis; pelikuva, vastaanotto ja KK:n tämän version hyväksyntä jäävät avoimiksi. Aiemmat paketit säilytetty.
