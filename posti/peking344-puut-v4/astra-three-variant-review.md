# Astra: #344, kolmen puuvärihaaran vertailu

16.10.2026 · **Suosittelen green-moderate-haaraa seuraavan V4-simulaattoritestin väriehdokkaaksi teknisen QA:n jälkeen.** Tämä on visuaalinen ehdokasvalinta, ei lopullinen pelivärin tai toimitetun paketin hyväksyntä.

Katsoin kaikki 18 uutta 1600 × 900 PNG:tä ja V3:n kuusi lähtökuvaa, yhteensä 24 alkuperäiskuvaa. Kaikkien kuvien SHA256:t täsmäävät render-todisteisiin. Kolmen haaran kaikki 216 GLB-tiedostoa täsmäävät variant-proofiensa pinneihin ja niiden lähtöviitteet V3:n 72 tiedostoon. Kunkin kuvasarjan 24 actual LOD0 -tuonnin pinnit täsmäävät kyseisen haaran GLB-tiedostoihin. Render-indexin proof-pinnit sekä render-proofien variant-proof-viitteet täsmäävät. Geometrian ja BIN-sisällön semanttista auditointia en toistanut; se jää Solin/päätekijän tarkistukseen. Vain LOD0:n ulkoasu on tässä katsottu.

**Green-moderate on tasapainoisempi vihreä vaihtoehto.** Se nostaa latvusten vihreän V3:a selvemmäksi ja säilyttää hillityn suhteen harmaisiin kortteleihin sekä kultaisiin ja punaisiin rakennuksiin. Green-strong parantaa myös vihreän näkyvyyttä, mutta vaaleat latvuskerrokset ja laajat metsäalueet korostuvat voimakkaammin. Se ei näytä teknisesti rikkinäiseltä; sitä ei vain tarvita ensimmäiseksi valinnaksi ilman näyttöä pelivalaistuksen vaatimasta lisäkompensaatiosta.

Midpoint vaalentaa puita, mutta säilyttää maltillisemman harmaanvihreän vaikutelman. Tasainen kerroin ei sisällä #343:ssa pyydettyä erillistä vihreän kylläisyyden lisäystä, joten en suosittele sitä seuraavaksi toimitettavaksi testiväriksi.

| Näkymä | Havainto |
|---|---|
| ilma | Vihreiden haarojen muutos näkyy puistoissa ja puuriveissä laajassakin kuvassa. Moderate sopii hillitymmin harmaisiin kortteleihin ja kultakattoihin; strong nostaa puualueita enemmän esille. |
| taihedian | Palatsin kattokulta, rakennusmassat ja etualan maa pysyvät silmämääräisesti samoina. Sävyero näkyy erityisesti taustan metsässä. Tämä kuva ei osoita pelin illan kattosävyn korjausta. |
| aukio | Vihreät haarat erottavat aukion reunan puurivit hieman paremmin. Moderate säilyttää aukion ja portin visuaalisen pääosan. Sommittelussa tai maassa ei näy uutta poikkeamaa. |
| beihai | Moderate vahvistaa saaren kasvillisuuden vihreää ilman että se hallitsee punaisten rakennusten ja valkoisen tornin suhdetta yhtä paljon kuin strong. Strong on käyttökelpoinen voimakkuusvertailu, ei todettu tekninen virhe. |
| jingshan | Suuri metsäalue näyttää moderate-versiossa V3:a vihreämmältä ja selkeämmältä. Strong tekee laajasta latvusmassasta voimakkaammin ja tasaisemmin vihreän; moderate on tasapainoisempi. Syvät varjot ja tasokorttien kerroksellisuus jäävät kaikissa. |
| hutong_ilma | Moderate lisää näkyvää vihreää latvusten vaaleille pinnoille ja säilyttää vaihtelun. Strong korostaa vaaleiden latvuskerrosten vihreää enemmän; midpoint jää hillitymmäksi harmaanvihreäksi. |

Syvät mustat varjot ja puukorttien kerroksellisuus säilyvät kaikissa kolmessa haarassa. Värivalinta ei korjaa tai hyväksy näitä ominaisuuksia. Katoissa, maassa tai rakennusten asettelussa ei näy uutta muutosta näissä kuudessa kuvassa; tämä silmämääräinen havainto ei korvaa lukittujen tietojen teknistä tarkistusta.

Preflightin mukaan kaikkien ehdokkaiden LOD0-albedon lineaarinen keskimääräinen Y on noin 0,175058. Keskimääräisestä lineaarisesta RGB:stä lasketut chromaRatio-luvut ovat midpoint 0,489, moderate 0,621 ja strong 0,708. Ne eivät ole näiden renderien tai pelin pikselikylläisyyksiä. Moderate-kertoimet ovat RGB [0,7103449105; 0,7991380243; 0,5919540921], alpha 1. Sama laskennallinen albedokirkkaus ei takaa samaa koettua kirkkautta eri sävyillä tai pelin valaistuksessa. JSONissa on lisäksi kahden saman renderialueen RGB-keskiarvot vertailun tueksi, erillään albedoluvuista.

#343:n klo 13/18 JPEG-yhdistelmäkuvat ovat eri todistusaineistoa. Niissä havaittu illan siniharmaa/tumma siluetti ei ratkea tämän Blender-sarjan perusteella, koska pelin normaalivaste ja valaistus eroavat. Seuraavassa testissä vertaa valittua actual-V4-pakettia samoilla peli-, kamera-, valotus- ja sääasetuksilla klo 13 ja klo 18; tarkista latvusten vihreys, kirkkaus ja yksityiskohtien säilyminen erikseen. Lähtöraportin JPEG-ROI:t kohdistetaan uudelleen tarvittaessa. Päivän onnistuminen ei yksin hyväksy iltaa, eikä tumman illan korjausta päätellä pelkästä kylläisyysluvusta.

Päätekijä voi teknisen QA:n jälkeen valmistella yhden uuden, erikseen pinnitetyn 72 GLB:n testipaketin suositellusta haarasta. Tämä raportti ei väitä sellaista toimitetuksi. V3:a ei lähetetä sellaisenaan uudelleen eikä #342-hutongkoetta yhdistetä tähän. Kattokulta/303, lähdekorkeudet, maa, DEM/origo, maskit, geometria, alkuperäiskuvat ja kamerat pysyvät lukossa. Kattokullan iltasävy kuuluu vastaanottajan valaistustyöhön. Ion-maskit ja 0,30 m väli, 221 vesikontaktia, liikkuva LOD, laitemuisti/FPS ja omistajan kokonaislaadun hyväksyntä jäävät erillisiksi.

Kirjoitettu vain tämä MD/JSON-raporttipari. Ei Blender-ajoa, delegointia, kuva- tai mallimuutoksia. Tarkat tiedostopinnit ovat rinnakkaisessa JSONissa.
