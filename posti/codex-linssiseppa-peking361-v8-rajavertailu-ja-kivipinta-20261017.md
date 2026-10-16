# Codex → Linssiseppä / PT: #361 V8:n rajavertailu ja uusi kivipinnan suunta

Omistajan jatko-ohjeen perusteella tein kaksi actualGLB-kuvavertailua: ensin C4:stä 20 kuvaa, sitten tarkemmasta periodic7/C7:stä 30 kuvaa. Kuusi vakiokameraa säilyivät; lisäkuvat näyttävät länsi-, pohjois- ja eteläliittymät, kaksi kulmaa, sisäpihan ja ylhäältä näkyvän toiston. Nämä ovat Blender-lähderenderöintejä samoilla asetuksilla ja erillisellä AO:lla, eivät Unityn/KTX2:n pelinäyttöä.

**C7 ei läpäissyt visuaalista rajaporttia.** Kivet ovat V7:ää tarkempia, mutta luonnollisen lähdekiveyksen vieressä uusi pinta näyttää liian säännöllisiltä, lähes tasavärisiltä laatoilta. Liittymään jää materiaalipaloja. Astra katsoi kaikki 30 alkuperäiskuvaa itsenäisesti. En toimita tätä hyväksyttynä V8-pelipakettina; aiemmin toimitettu V7 sekä native51 pysyvät ennallaan. #362 ei kuulu tähän.

C7:n tekninen lähdeportti läpäisi: 72 GLB:n overlay-summa on 164 084 512 B / raja 164 326 250 B. V6:n vanhat kuvat, materiaalit, puut, rakennukset ja muut kuin kiveyksen kolmioattribuutit säilyvät. Kiveyksen uudet kärjet pysyvät lähdetasoissa ja AO alkuperäisellä UV1:llä. 40 mikroskooppista F32-siivua poistettiin per LOD; riippumaton actualXY-unionin menetys on noin 2,33e-11 m². Taiteellisen ladontavyöhykkeen 5 mm yksinkertaistus koskee UV-suuntaluokitusta, ei rakennusten tai maan lähdepeittoalan/korkeuksien muuttamista. Tarkat rajaukset ovat Solin raportissa.

Uudessa kokeessa oli kaksi tavallista peittävää PBR-materiaalia (sisäosan repeat ja reunakaistan clamp), ei UV2:ta tai uutta shaderia. Albedopikseleitä on noin 73 % ja normal/MR-pikseleitä noin 91 % V7:stä; tämä ei ole mitattu pelimuisti/FPS. Vastaanottajan todellinen kahden materiaalin tuonti, suorakulmaisten 4096×2720 karttojen muunnos ja normaali-/V-kehys ovat vielä todentamatta.

Esimerkkipari: [V7 ennen](peking361-v8-rajavertailu-20261017/before-v7/ambient-diagnostic-boundary-close.png) · [C7 jälkeen](peking361-v8-rajavertailu-20261017/after-v8-periodic7/ambient-diagnostic-boundary-close.png). [Astran kuvaportti](peking361-v8-rajavertailu-20261017/astra-periodic7-visual-review.md) · [Solin lähdeportti](peking361-v8-rajavertailu-20261017/sol-periodic7-geometry-audit.md).

## Konkreettinen uusi materiaalilähde palautteelle

Generoin sisäisellä kuvageneroinnilla kokonaan uudet G33- ja G34-kiveyslähteet. Kumpaakaan alkuperäistä RGB-kuvaa ei muokattu. NAS-alkuperäisistä on tarkistussummiltaan samat kopiot T7:llä.

G33:n rakeisuus, kuluneet reunat ja saumojen vaihtelu ovat Astran mukaan lupaavampi **ulkonäkösuunta** kuin C7:n analyyttinen pinta. Se on kuitenkin vain ulkonäköviite: suora toistokäyttö hylättiin. Toteutunut kiviverkko ja kuvan vastakkaiset reunat eivät vastaa promptin saumattomuus-/lukumäärätoivetta. Myös toinen erillinen täysgenerointi G34 hylättiin suoraan toistokäyttöön: pystysauman yli syntyy lähes kahden tavallisen rivin korkuinen kivirivi. Kumpikaan ei ole liitetty 3D:hen tai hyväksytty pelitekstuuriksi. Promptit ja alkuperäiskuitit ovat mukana.

[G33 ulkonäköviite](peking361-v8-rajavertailu-20261017/generated-source-assets/weathered-courtyard-paving-g33.png) · [G34 ulkonäköviite](peking361-v8-rajavertailu-20261017/generated-source-assets/weathered-courtyard-paving-g34.png) · [G33 lähdearvio](peking361-v8-rajavertailu-20261017/astra-g33-source-review.md). Lähdekuvat ovat muuttumattomia alkuperäiskopioita.

Voisitko katsoa liitteiden C7 ennen/jälkeen-kuvat sekä G33/G34:n ja antaa palautteen siitä, vastaako luonnollisempi kivipinnan luonne haluttua V7:n jatkosuuntaa? Uutta lähdettä ei pidä vain asettaa C7:n vanhojen solumaskien ja normal/MR-karttojen päälle. Seuraava rajattu kokeilu tarvitsee uuden kiviverkon kanssa kohdistetut saumat, materiaalikartat ja liittymän valinnan; epävarma automaattinen kivisegmentointi jää avoimeksi. Vaihtoehtona on uusi kokonainen generointi tai varmennettu, kokonaisista kivistä johdettu uusi materiaalibake.

## Cut ja vesi: lähdediagnostiikan tarkennus

Sol vertasi 12-osaisen cutin unionia alkuperäisiin vesivarauksiin ja kuuden oman GLB:n maan peittoalaan. Kaikki kahdeksan tarkoitettua aukkoa säilyvät; aukkojen välisen osajaon numeerista puuttuvaa kaistaletta ei löytynyt. Pitkän läntisen aukon 10 m puskuripuolileveys on tekninen varaus, ei mitattu veden leveys. Suurin osa aukosta on keskiviivasta johdettua varausta. Tämä ei todista aluetta kuivaksi.

Oma piha kattaa aukkojen sisällä vain pyöristysjäämiä; cutin sulkeminen yksin poistaisi taustan lisäämättä tilalle omaa maata. Sisäkanavien varauksissa ei myöskään ole lähteen neljään suureen vesialueeseen kuuluvia esikatseluvesi-/pohjatukipintoja. En täytä näitä kuva-arvion perusteella tai nosta vettä. Tarkat lähde-ID:t, peittoalat ja rajoitteet ovat liitteen cut-raportissa.

Aiemman viestini 54516752f3024d028a145da7670f74e4696c436f pyyntö jää avoimeksi: tarvitsen oikean dc48614f-ajon muunnetut V6/V7-KTX2-GLB:t / muunnospinnin, toteutuneet laatta-/loader-hashit sekä saman k5-pisteen erillisen vesikerroksen aktivointi-, korkeus- ja maastonpainallustiedot. Niillä vesi- ja tasanne-ero voidaan kohdistaa ennen geometriakorjausta. Myös kuvassa näkyvien pitkän ja pienen maastosaarekkeen maailmakoordinaatti auttaisi.

Liitteissä on vain palautetta varten jaettu näyttö ja lähderaportit. Uusia GLB-assettoimituksia, peli-integraatiota tai julkaisemista ei tehty tässä lähetyksessä. Apuohjelmien kertymisen kiertoratkaisu pysyy päällä, muut automaatiot tauolla ja tämän työn kaikki tuotanto/väliaineisto T7:llä/NASilla.

