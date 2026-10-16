# Task360: worldXY ground AO – riippumaton tekninen auditointi

Rajattu AO-pilotti **läpäisee teknisen rakennetarkastuksen**. Ehdokkaan proof-laskurit on korjattava tulevaan pakettiin. KTX2-, renderi-, pelin reuna-/halo-/LOD- ja omistajan hyväksyntäportit ovat edelleen auki. Tämä ei hyväksy V5:n toimitusta pelissä toimivaksi eikä muodosta uutta toimitusta.

Tarkastettu muuttumaton ehdokas: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/peking-codex-20261013/production-root/peking/model-loop-owner-20261015/task360-370-work/ground-ao-world-candidate1`.
Vertailupohja luettiin suoraan candidate-proof.jsonin `baseV5Root`-kentästä: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/peking-codex-20261013/production-root/peking/peking-testikaupunki-20261016-native51-saumat-v5`.
Bake: `task360-370-work/ao-ground-world-2048-retry1`; receiver: `task360-370-work/top-paving-bake-receiver`.
Koneelliset tulokset ja SHA256-tunnisteet: [audit JSON](visible-session-sol-task360-ground-world-audit.json).

## GLB ja AO

Kaikkien kolmen LOD:n alkuperäinen BIN-prefix on tavulleen sama kuin lähteessä. POSITION-, NORMAL-, UV0- ja indeksiaccessorit säilyvät; vertex-splittejä on nolla. Myös solmut, muut primitiivit, alkuperäiset materiaalit ja upotetut kuvat säilyvät. Kaikkien primitiivien accessorirajat, äärelliset arvot ja indeksit tarkastettiin. Sallittujen lisäysten poistamisen jälkeen koko glTF-JSON vastaa lähdettä.

AO kohdistuu vain kahteen alkuperäiseen stage5_paving-primitiiviin: LOD0:ssa 28/29, LOD1–2:ssa 27/28. Materiaalista on yksi AO-klooni; occlusionTexture käyttää texCoord=1 ja strength=0.6. COLOR_0:aa ei lisätä. Muut PBR-ominaisuudet säilyvät.

UV1 vastaa jokaisessa käytetyssä kulmassa sekä tallennettua float32-loop-karttaa että paikallista ENU-metriikkaa. Blenderin UV on u=(E+277)/554, v=(N+252)/504; GLB:ssä käytetään (u,1−v). Yksi maailmankoordinaattinen kenttä korvaa irralliset atlas-chartit. Päällekkäiset paving-kerrokset saavat tarkoituksella saman XY-kentän.

| LOD | GLB-tavut | Lisäys | Kolmioita | AO |
|---|---:|---:|---:|---|
| 0 | 9 289 480 | 608 572 | 98 042 | 2048² |
| 1 | 4 403 940 | 268 540 | 50 638 | 1024² |
| 2 | 4 034 100 | 110 936 | 49 306 | 512² |

Koko 72 tiedoston projektio on 158 656 008 tavua / 1 385 100 kolmiota. Budjettiin jää 5 670 242 tavua ja 12 283 kolmiota. Pilottimuutoksen lisäys on 988 048 tavua, eikä kolmioita lisätä.

24 bake-lähteen SHA256-pinnejä sekä receiver-, UV-kartta- ja raakafloat-tunnisteita verrattiin nykyisiin tiedostoihin. AO:n float-arvot ovat äärellisiä välillä 0…1. Jokainen upotettu PNG vastaa ulkoista kanonista R8-kuvaa. LOD1/2 ovat peräkkäisiä float32:n 2×2-keskiarvoja; kvantisointi, pystykäännös ja pyöristys vastaavat pikselilleen. PNG:t ovat L-tilassa ilman gamma-/sRGB-tagia. Tarkastuksessa ei löytynyt värisiirtovirhettä.

## Ylimmän paving-pinnan receiver

Receiverin 4 096 apukolmiosta 3 966:lla on yli 1e−12:n XY-ristitulo ja 130 on nollapinta-alaisia tai erittäin pieniä. Nämä ovat vain bake-aputopologiaa. Jokaisen pisteen sourcePrimitiveTriangle-provenienssi ja barysentrinen sijoittuminen lähdekolmiolle tarkastettiin; suurin rekonstruktioero on 6.36e-14 m. Nollakolmioiden epävakaan oman tasoratkaisun sijaan korkeutta arvioitiin varmennetulla lähdekolmion tasolla.

Lähteen ja receiverin unionin pinta-ala on noin 177 476,653786 m². Puuttuva alue on 0; ylimääräinen 2.78e-13 m² ja receiverin sisäinen päällekkäisyys 2.15e-09 m². Audit käytti lähdekolmioiden ylöspäin suuntautumiseen crossZ>1e−10, valmistaja >1e−8: tästä auditin 2 281 ja valmistajan 2 280 kolmiota. Lisänä on yksi erittäin pieni lähdekolmio; unionipeitto säilyy.

**7 cm:n löydöstä ei peitetty korkeustoleranssilla.** Vanhojen kerrosten korkeuseroa näkyy 9 042 leikkausparissa, kun korkeusraja on 11 µm: 8 866 on nollamittaisia reunakontakteja ja 176 positiivisen pinta-alan suikaleita. Suikaleiden parittaisten pinta-alojen summa on 2.19891e-09 m² (yläraja, ei erillinen unionimitta). Suurin on 6.08172e-10 m², eli 9.13579e-09 yhden LOD0-texelin pinta-alasta. Lähteen float32-koordinaatin askel 275 m:n kohdalla on noin 30,5 µm.

Merkittävän leikkauksen rajana käytettiin samaa 1e−8 m²:n pinta-alarajaa, jolla receiver-valmistaja säilyttää polygoneja. Yksikään korkeusrajan ylittävä leikkaus ei saavuta tätä rajaa. JSON sisältää suurimpien suikaleiden lähde- ja receiver-tunnisteet. Tulos hyväksytään tämän AO-pilotin bake-apupinnalle tällä eksplisiittisellä rajauksella; matemaattisesti täysin sliveritöntä ylimmän pinnan leikkausta ei väitetä. Bake lisää vain apupintaan 2 mm:n noston. Alkuperäiset GLB-koordinaatit eivät muutu.

## Resoluutio ja jäljelle jäävät reunariskit

Kartta kattaa paikallisen alueen E −277…277 m / N −252…252 m. Texelin koko E/N on LOD0:ssa 0,2705/0,2461 m, LOD1:ssä 0,5410/0,4922 m ja LOD2:ssa 1,0820/0,9844 m. Nimellinen 2 m:n ulkoreunavara vastaa 7,39/8,13; 3,70/4,06; 1,85/2,03 texeliä. Baken neljän raakatexelin marginaali on noin 1,082/0,984 m ja pienenee LOD1/2:ssa kahteen/yhteen texeliin.

Vanhan probe2:n tummien kolmioiden 5 ja 204 keskipisteiden AO on nyt 1,0 kaikissa kolmessa LOD:ssa. Kolmiolla 214 kanonisen R8:n bilineaarinäyte on noin 0,9086 / 0,9083 / 0,8405. Nämä ovat tiedostonäytteitä; niistä ei johdeta renderi- tai pelihyväksyntää.

Valkoinen tausta, sisäiset aukot, korkeushyppyjen reunat sekä padding ja mip-suodatus voivat yhä vaalentaa tai levittää paikallista AO:ta. XY-projektioltaan nollapintaiset 19 lähdekolmiota eivät saa itsenäistä AO-aluetta; lukua ei pidä tulkita uusiksi geometriavirheiksi. LOD2:n noin metrin texeli ja yhden texelin marginaali edellyttävät liikkuvan LOD:n sekä reuna-/halo-testin pelissä. Sampleri on CLAMP + LINEAR ja mip-suodatusta pyytävä minFilter=9987. Todellinen importer-mipketju ja mahdollinen tekstuurin monistuminen kahden primitiivin vuoksi jäävät vastaanottotestiin.

## Paketin ja vastaanoton avoimet portit

Proofin LOD0-laskurit ovat materiaaleja 34 / kuvia 43; GLB:ssä todelliset luvut ovat **35 / 44**. LOD1–2:n proof on **33 / 43**, GLB **34 / 44**. Korjataan tulevan paketin laskurit suoraan GLB-luennasta ja säilytetään vanhojen lukujen readback. Candidate1 säilytettiin muuttumattomana. Peritty avainnimi sourceAcceptedV5SHA256 on muutettava tulevassa paketissa muotoon sourceDeliveredV5SHA256, koska V5:n toimitus ei ole runtime- tai omistajahyväksyntä.

Tässä ei tuotettu tai hyväksytty AO-KTX2:ta. Vastaanotossa tarvitaan todellisen KTX2:n lineaarinen DFD/R-kanava, dekoodatun AO:n vertailu, UV1 FLOAT/texCoord1, strength 0.6 ja mipketjun tarkastus. Renderien valmistumista ei odotettu eikä niiden perusteella annettu visuaalista hyväksyntää. Unity-importti, pelitestit, kaupungin integraatio, julkaisu ja omistajan hyväksyntä ovat avoinna.

Työ oli lukua ja raportointia: Python ulkoisen wrapperin kautta nice 15:llä; ei Blender-/Unity-/Git-ajoja, generaattori- tai assetmuutoksia. Vain nimetyt audit MD/JSON-tiedostot kirjoitettiin. Kuuden vertailu- ja ehdokas-GLB:n hashit varmennettiin uudelleen ennen raportin sulkemista.
