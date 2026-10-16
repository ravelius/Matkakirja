# Task342: candidate-visible2-parallel, rajattu loppureadback

**Rajattu tavu-, normaalioffset- ja staattipintojen non-regression-tarkistus PASS. Ei lähtöläpäisyjen korjaus-, kokonaislaatu-, peli- tai toimitushyväksyntää.**

Nykyinen lukittu ehdokas: /Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/peking-codex-20261013/production-root/peking/model-loop-owner-20261015/task342-work/candidate-visible2-parallel

Kohteet: **3dglobfp/13652 + way/257208012**, neljä olemassa olevaa paneelia/LOD, kolme oikeaaGLB:tä. Kansio on paikallinen OFFGAME-kokeilu, **ei uusi72GLB-kaupunkipaketti**, canonical52 tai toimitetunV3:n korvaus. Vain kokeilun palaute/checkpoint kuuluu tämän näytön mahdolliseen jatkokäyttöön; ei196/171 kohteen massatoteutusta.

## Korjattu delta ja alkuperäinen20µm-portti

Tangentti johdettiin itsenäisesti **lähtö-GLB:n todellisesta paneelin NORMAL-taulukosta**, vaakasuoraksi ja source-wallAxisin suuntaiseksi. Nykyinen ovi–ikkunakeskusten ENU-erotus projisoitiin tälle yksikkötangentille. Sekä mappingin deltat että jokaisen tallennetun vertexinF32-arvot vastaavat tätä laskentaa; ei käytetty suoraa keskusten XY-erotusta.

Tallennettujen vertex-deltan ja baseline-NORMALin pistetulon enimmäisdrift **0.000004931839 m =4,932µm**, vaatimus **alle20µm**, kaikki12paneeli/LOD-riviä läpäisevät. Suurin pyydetyn deltan F32-pyöristysvirhe **4,933µm** ja paneelin kärkiparietäisyyksien muutos0m. Oman GLB-Y:n bitit pysyvät täsmälleen samoina. Normaalioffsetia ei väitetä matemaattisesti nollaksi kvantisoinnin jälkeen, mutta alkuperäinen portti alittuu ilman väljennystä.

**Edellinen candidate-visible2 on failed/superseded:** suoraF32-keskuserotus tuotti enintään **25.585µm** driftin, kuusi paneeli/LOD-riviä ylitti20µm-portin. Rejection.json, vanhat3tiedosto-SHA:t ja epäonnistunut portti säilyvät uuden JSON-raportin historicalFailedDirectCentreCandidate-osassa. Vanha juuri sekä pilot4 säilyvät muuttumattomina; niiden tulosta ei nimetä uudelleen PASSiksi.

## Tarkka tallennettu muutos

Kaikki3GLB:t luettiin toimitettua immutableV3:a vasten:

|Tiedosto|Tavut|Kolmiot|POSITION-rivejä|Muuttuneita tavuja|
|---|---:|---:|---:|---:|
|peking_3_5_lod0.glb|3 924 440|29 533|16|72|
|peking_3_5_lod1.glb|2 544 884|28 253|16|72|
|peking_3_5_lod2.glb|2 450 740|28 253|16|72|

Yhteensä **48 exclusive-POSITION-riviä ja216 muuttunutta tavua**, vain X/Z-komponentit. Koko, kolmiot ja JSON ovat ennallaan; kaikki muut header/BIN-tavut ovat identtisiä. UV:t, normaalit, indeksit, materiaalit, kuvat, muut paneelit, seinät, massat, ground/water,DEM/origo ja kattokulta säilyvät. Accessor-min/maxit ovat edelleen oikeat. Hylättyjen13552:n ja1548591307:n vertexit ovat baseline-tilassa.

48 vanhaa/uuta12tavun ledger-riviä vastaa tiedostojen fyysisiä byteoffsetteja. Alkuperäisistä tavuista tehty **muistipalautus** tuottaa jokaisen lähtö-GLB:n tavutarkasti; levylle ei tehty palautusta. Kaikkien72 toimitetunV3:nSHA:t ja manifesti sekä nykyisenparallel-ehdokkaan, vanhanfailed2-ehdokkaan ja pilot4:n kolmenGLB:nSHA:t tarkistettiin suljettaessa. Tässä ei tuotettu uusia69muuttumattoman GLB-tiedoston kopioita tai uutta kaupunkipakettia.

Aiemman riippumattoman4760source/native-paneelin,14280actual-LOD-rivin ja24todellisen pilotin carrier-kolmion kohdistus ketjutetaan muuttumattomien karttojen ja baseline-pinien kautta. Sourcefi on edelleen provenienssi; owner+geometria+normaali ja actual-indeksit määräävät.

## Uuden geometrian rajattu pintatesti

Uudet parallel-GLB:t tarkistettiin uudelleen, ei ketjutettu vanhaa epäonnistunutta geometriaa. Oma float64-ENU-laskenta käsitteli467881ei-puukorttista staattistaLOD0-kolmiota ja8paneelitapausta (2owneria×ovi/ikkuna×ennen/jälkeen). Sisäosa erotettiin10µm:n reuna-insetillä ja paneelitaso-epsilon oli0,1µm.

|Owner|Maan leikkausyläreuna ennen m|Parallel-jälkeen m|Muutos|
|---|---:|---:|---:|
|3dglobfp/13652|1,191991982|1,136723558|−55,268mm|
|way/257208012|1,985740863|1,966108173|−19,633mm|

**Kaksi alkuperäistä oven sisäosan maaleikkausta jäävät.** Ne eivät ole pelkkiä alareunakosketuksia. Molemmat korkeudet madaltuvat, mutta läpäisyjä ei kuitata korjatuiksi. Ikkunoissa ei löytynyt pintaleikkauksia. Actual-tiiliseinän support-projektiosta puuttuva ala on0m² käytetyllä0,3mm:n reunaetäisyystoleranssilla; tämä ei osoita näkyvyyttä eikä tyhjää tilaa panelin edessä.

Oman matalan sokkelin leikkausyläreuna pysyy13652:ssa noin0,989999950m ja257208012:ssa2,170000076m, lähteenbase+0,28m. Kaikki valitut sokkelikolmiot kuuluvat oman seinän todettuun prismiin. Kehykset/lintelit eivät ole GLB:ssä eikä niitä lisätty tai siirretty.

Päätekijän uusi poikkeus käyttää sourcebase/axis/normal/length-laatikkoa (±L/2,±0,11m,Z+0,02…0,28m,tol0,00025m); pelkkä materiaalinimi ei riitä. Ground-poikkeus vaatii saman carrier-kolmion ja aftermaxZ≤beforemaxZ+0,00025m. Tämän ehdokkaan todelliset muutokset ovat selvästi negatiivisia, eivät toleranssin varassa. Parent-raportin korkeusvälit täsmäävät riippumattomaan laskentaan alle10µm erolla.

Tulos on **0uutta sallimatonta staattista pintaleikkausta ja2säilyvää maaleikkausta** tässä rajauksessa. Se ei ole tilavuus-, fysiikka-, saavutettavuus-, käveltävyys-, burial-free- tai täydellinen collision-free-testi. Puukortit jätettiin staattisesta pintatestistä pois. LOD1/2 tarkistettiin rakenteellisesti, tavu- ja normaaligatessa; pintatesti ja renderi koskevatLOD0:aa.

## Kuva- ja käyttörajat

Uuden render-proofin **14PNG:n SHA256:t** sekä oikeasti uudelleentuodun changedLOD0-GLB:n SHA varmistettiin. Kaksi ehdokas- ja kaksi kontrolliparia käyttävät täsmälleen samoja ennen/jälkeen-kameratietoja ja ortografista mittakaavaa. Kuusi muuta kuvaa ovat fixed-after-kuvia. Tämä on versio-/kameratarkistus, ei uusi Solin visuaalinen arvio.

Astran luettu aiempi neljän pilotin lausunto näkee lähikuvissa pienen paikallisen variaation13652:ssa ja257208012:n näkyvässä keskiosassa, mutta **kiinteissä hutong_ilma/ilma-näkymissä korttelin yleisilmeen hyötyä ei osoitettu**. Tätä ei laajenneta hyväksytyksi fixedview-parannukseksi tai uudenparallel-version kuvalliseksi hyväksynnäksi. Ei laajaa massakäyttöä näillä kuvilla.

Ion≥0,30m,12sourcewater-maskiosaa/221Ion-kontaktia,TBNvastapuoli,päivä/ilta,liikkuvaLOD,FPS/muisti ja omistajan hyväksyntä säilyvät vastaanottajan portteina. Ei V3-vaihtoa, uutta gamepakettia, Claude-toimitusta, native52:ta tai julkaisukuittausta.

Vain jo osoitetut visible2-final-audit MD/JSON päivitettiin tähän uuteen juureen, vanha hylkäys erikseen säilyttäen. Ei Blenderiä, omaa lähdereplayä, mallin/GLB:n/RGB:n/V3:n muokkauksia tai lisädelegointia.
