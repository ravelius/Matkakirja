# Peking: yksityinen 24 laatan lentotestipaketti, native50

PT284/PT305. Paikallinen väliversio Valosepän kehittäjätestiin. Tämä ei ole lopullinen kaupunkimalli tai julkaisu.

**Tila: valmis luovutettavaksi rajattuun yksityiseen lentotestiin.** Solin tekninen 72 GLB:n auditointi läpäisty; Astra katsoi kaikki 15 tarkistuskuvaa ja hyväksyi välitestin alla kirjatuin rajoituksin. Tarkistuskuvat sisältävät 26 eri GLB:tä, eivät kaikkien 72 tiedoston erillisiä kuvakulmia.

Paketti on fyysisesti T7:llä:
`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/peking-codex-20261013/production-root/peking/peking-testikaupunki-20261015-native50`

## Sisältö ja siirto

- `glb-v4/laatat.json`: sama 24 rivin glb-v4-rakenne ja samat koordinaatit kuin aiemmin; vain kuvaus ja toteutuneet tavukoot päivitetty.
- `glb-v4/peking_i_j_lodN.glb`: i=0–3, j=0–5, N=0–2; yhteensä 72 GLB:tä. Kaikki kuvat ovat upotettuina tiedostoihin. Erillisiä kuvatiedostoja ei tarvita.
- Jokaisella GLB:llä on rinnakkainen `-proof.json`. `manifest-sha256.json` yksilöi luovutettavat tavut, kun tarkistus on suljettu.
- `QA/actual-glb-reimport/`: todellisista lopullisista GLB:istä kootun kaupungin kuusi vakiokuvaa sekä laatan 2,3 kolme kuvakulmaa kaikilla kolmella LOD-tasolla. Nämä ovat Blenderin neutraaleja vertailukuvia, eivät pelin kuvia.
- `QA/global-ownership-and-source-geometry-readback.json` ja `glb-v4/independent-binary-readback.json`: rakenteen ja toteutuneen geometrian tarkistukset.
- `QA/profile-source/`: käytetyt vienti- ja jälkikäsittelyversiot. Kanonisen lähteen vientivarmistuksia ei poistettu.

Valoseppä tekee PT305:n mukaisen yksityisen integraation `Kehittäjä > Kokeet > Peking` -kytkimen taakse ja vertaa Ion/oma samasta kamerasta. Codex ei ole muuttanut Unityä, R2:ta, päähaaraa tai julkista peliä. Tavallinen `omat_mallit_tileset.py` lukee `glb/sijainnit.json`-muotoa; tämä paketti säilyttää erikseen tilatun `glb-v4/laatat.json`-muodon ja tarvitsee vastaanottajan käyttämän laattasovittimen. Älä syötä manifestia suoraan väärään muuntimeen.

## Mitatut määrät

| Taso | GLB | Tavua | Kolmioita |
|---|---:|---:|---:|
| LOD0 | 24 | 75 797 516 | 546 799 |
| LOD1 | 24 | 40 262 208 | 414 355 |
| LOD2 | 24 | 38 296 428 | 413 023 |
| Yhteensä | 72 | **154 356 152** | **1 374 177** |

72 tiedostoa alittaa konservatiivisesti sovelletut rajat 164 326 250 tavua ja 1 397 383 tallennettua kolmiota. Tämä ei osoita lopullisen 96 tiedoston paketin alitusta, ajonaikaista muistinkulutusta tai kuvataajuutta. QA-kuvat ja raportit eivät sisälly GLB-tavusummaan.

Jokaisessa GLB:ssä on kaksi erillistä mesh-solmua: yhdistetty staattinen geometria ja yhdistetyt puut. Ei `EXT_mesh_gpu_instancing`-laajennusta, saman meshin solmualiaksia tai ulkoisia kuva-URI:ja. Materiaalit käyttävät glTF:n perus-PBR:ää. Puusto on MASK 0,5 / double-sided. Valosepän mahdollinen KTX2-muunnos kuuluu vastaanottovaiheeseen.

## Paikka, korkeudet ja omistus

Samat 550 × 500 metrin laatat ja origo_latlon-kentät kuin glb-v4:ssä. Koko testialue on ENU `[-1100,-1750,1100,1250]`. Korkeusorigo on jokaisessa rivissä **37,9 m ellipsoidista**. GLB:ssä `(E−cx, paikallinenZ, −(N−cy))`, +Y ylöspäin, metrit. Muunnos on leivottu kärkiin.

Jokaisessa LOD-kokonaisuudessa on 7 992 eri puuta ja 223 rakennettua alkuperäisen 225 rakennuksen luettelon jäsentä. `3dglobfp/9094` ja `way/149216919` ovat edelleen rakentamatta. Alkuperäinen luettelo, lähdekorkeudet ja jalanjäljet säilyvät. Native50:n erillinen pohjoinen konteksti y=1250–2000 ja sen 1 000 puuta jäävät tämän 24 laatan testin ulkopuolelle.

Neljä PT278:n mukaista lisämassaa ovat alkuperäisen 225 luettelon ulkopuolella: Kansallismuseo relation/8607825, sankarimuistomerkki relation/8847722, Maon muistohalli relation/8848142 ja kansantalo relation/8848388. Jokainen kuuluu yhteen laattaan; museon ja kansantalon koko geometria jatkuu tarvittaessa nimellisen j=0-laatan pohjoisrajan yli. Omia massoja ei saa leikata nimelliseen laattarajaan. `leikkaus_latlon` on taustalla olevan Ion/Google-aineiston peittämiseen tarkoitettu raja, ei omien mallien geometrialeikkuri. Muuntimen bounding volume on laskettava koko GLB:n toteutuneista POSITION-rajoista.

PT295 valitsi toimitukseen nykyiset Taihedianin noin 36,65 m ja way/688124109:n noin 8,1 m mallikorkeudet. Vanhoja laskennallisia toleranssipoikkeamia säilytetään historiassa; kyse ei ole riippumattomasta maastomittauksesta. Arvo 29,7 m oli malliarvio, ei raaka OSM-korkeustagi. Ellipsoidiorigoa tai DEM:iä ei siirretty.

## Pelin vesi ja valo

Testialueen kaikki 15 `VESI_`-esikatselupintaa on jätetty vientilaatoistaan pois materiaalin ja vesiroolin perusteella. Native50:n kokonaismallin kaksi muuta esikatseluvesipintaa jäävät pohjoisen testirajan ulkopuolelle. Myös vanha piilotettu, liian matala maapohja jäi pois. Pelin oma vesi, aurinko, taivas, sumu, iltavalo ja jälkikäsittely kuuluvat Valosepän peliin. Uusi puualbedo ei sisällä leivottua aurinkoa, taivasta tai varjoja.

Vientiin jäävät uudet pohjat, rantatuet ja kuivan rannan alkuperäinen XY-raja. Veden alapuolinen tuki on vähintään noin 1,10 m; se on esitystekninen arvio, ei järven mitattu syvyys. Neljä erillistä paikallista vedenkorkeutta säilyvät:

| Vesistö | Veden paikallinen Z | Pohjan paikallinen Z |
|---|---:|---:|
| Vallihauta way/4845030 | −2,25 | −3,35 |
| Beihai relation/5451458 | −3,05 | −4,15 |
| Zhonghai relation/68127 | −3,05 | −4,15 |
| Nanhai relation/3531212 | −2,55 | −3,65 |

Puuston tangenttinormaalit on korjattu nykyisen OmaMalli.shaderin kotangenttiperustan ja neljän lähdeskaalaryhmän mukaan. Pelkän ryhmittelyn teoreettinen maksimipoikkeama on noin 3,88 astetta; luku ei sisällä 8-bittistä tallennusta, mippejä, korttiesitystä tai pelin todellista valoa. Blenderin normaaliperusta eroaa pelistä, joten liitteen vertailukuvat eivät validoi tätä pelivalossa.

## Välitestin tunnetut rajat

- Puusto käyttää mallista renderöityjä ristikkäisiä kortteja: LOD0:ssa neljä pystysuuntaa ja yläkortti, LOD1/2:ssa kaksi pystysuuntaa ja yläkortti. Läheltä ja ylhäältä näkyy kulmikkuutta. Puut eivät ole lopullinen laatuhyväksyntä.
- LOD0→1 poistaa kaiteita, pronssiesineitä ja muuta pientä geometriaa; saman kameran vertailussa muutos näkyy. Oikeat vaihtomatkat ja liike arvioidaan lentotestissä.
- Hutongien kattopinnat ja historiallisten kattojen segmentointi ovat tässä kevennettyjä. Jalanjäljet, siipien sijoittelu ja huippukorkeudet säilyvät. Tavallisten taustatalojen julkisivu käyttää toistuvaa kokonaista seinä-UV:tä aiemman tiheän paneeliverkon sijaan.
- Aukion ympäröivien leveiden tiekaistojen materiaalivaste on uudelleentuontikuvissa native50:n neutraalireferenssiä vaaleampi. Syy on vielä avoin. Vietyjen baseColor/PBR-kytkentöjen ja kohdeshaderin vaste tarkistetaan pelivertailussa; havainto ei avaa PT303:n kattosävyä uudelleensäätöön.
- Pohjoisen alueen rajalla kokonaisina säilyvien rakennusten alta maapinta voi leikkautua näkyvästi. Sisäisten laattojen kuudessa yleisnäkymässä ei havaittu suurta puuttuvaa laattaa tai leveää avointa saumaa; tämä ei tarkista kaikkia rajapintoja tai naapurilaattojen eri LOD-tasoja.
- Non-tree normaalikuvat ja karheus/metallisuuskuvat pienennettiin 128 px:iin LOD0:ssa ja 64 px:iin alemmilla tasoilla. Kaikki väri- ja alfakuvien sekä korjattujen puunormaalien kuvatavut säilyivät täsmälleen; geometria, UV:t ja solmut säilyivät tässä jälkikäsittelyssä täsmälleen.
- Taihedianin laatan kaikkien kolmen LOD:n katon ja alapinnan eri diagonaaleista johtunut läpityöntymä korjattiin samaksi eksplisiittiseksi kolmiojaoksi. Muiden 69 GLB:n tavut säilyivät tässä korjauksessa.
- PT303:n hyväksymä kattosävy säilyy. PT304:n museon ja kansantalon tummempi lämmin kivi, kattokaista ja 1,5 m sokkelikaista valmistellaan erikseen native51:een; ne eivät kuulu tähän PT305:n kiireelliseen native50-testiin.

Koko kaupungin korkea laatutavoite, lopullinen 96 GLB:n vienti, pelin lento- ja muistimittaukset, veden ja rannan saumat sekä tavallisen/iltavalaistuksen hyväksyntä jäävät avoimiksi. Tämä paikallinen paketti ei ole julkaisu- tai omistajahyväksyntä.
