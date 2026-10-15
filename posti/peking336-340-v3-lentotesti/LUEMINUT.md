# Peking PT336–340: source51-pohjainen yksityinen lentotestipaketti v3

**Tila: valmis Valosepän rajattuun yksityiseen lentotestiin.** Solin riippumaton 72 tiedoston tekninen loppuarvio ja Astran 20 kuvan loppuarvio on luettu. Maasauma, puiden harmaantuminen ja uudet float32-normaalivirheet on suljettu tämän version paikallisen näytön osalta. Ionin vähintään 0,30 m korkeusehto ja muut alla nimetyt pelitestit jäävät avoimiksi.

Paketti: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/peking-codex-20261013/production-root/peking/peking-testikaupunki-20261016-native51-v3-lentotesti`

24 laattaa × 3 LOD-tasoa, **72 itsenäistä GLB:tä**. Todellinen summa **156 529 080 tavua ja 1 377 183 kolmiota**. Aiemmat kokonaiskatot 164326250 tavua ja 1397383 kolmiota alittuvat. Luvut eivät ole lopullisen 96 tiedoston toimituksen tai KTX2-paketoinnin mittaus.

## Muutokset

**Oma maa ja jatkuvat liittymät.** Olemassa olevat maa-, nurmi-, tie-, polku- ja kiveyspinnat säilyvät. Näyttökorjaus käyttää yhtä globaalia, 25 m solmuvälin kolmioittaista lineaarista korkeuslisäkenttää; valitut solmuarvot ovat 0 tai 0,31 m. Pinta jaetaan saman kentän rajoilla ennen korotusta, joten viereisille pinnoille ei muodosteta toisistaan riippumattomia korkoja. Tämä on tekninen näyttökorjaus, ei uusi DEM tai maastomittaus. Lähde-DEM, rakennuskorkeudet, terassit, portaat, rampit ja 37,9 m ellipsoidiorigo säilyvät.

Lähteen vaarassa olevat kivikontaktit suojataan. 25 m solun lävistäjää suurempi tekninen solmujen turvaetäisyys tekee kentästä nollan kaikkialla alkuperäisten kontaktisuojien kohdalla sekä ulkoreunan ympärillä. Kentässä on 150 korotettua solmua ja 484 mahdollisesti ei-nollaa kolmiota. Muuttuneiden maakolmioiden suunta ja normaalit lasketaan vasta lopullisista float32-koordinaateista; romahtavat nollapintaiset suikaleet poistetaan kirjattuna. Uusia päällekkäisiä kokonaisia maakerroksia ei lisätty.

**Sisävedet säilytetään Ionille.** Palatsin historiallinen relation/9511883 ja vallihaudan way/4845030 sisärantaketju yhdistetään; sisärannan eteläportin sulku jää tekniseksi arvioksi. Alkuperäisestä OSM-snapshotista käytetään yhdeksää kelvollista sisävesipolygonia (5647,589 m²) ja 12 ei-tunneliksi/katetuksi merkittyä vesilinjaa. Linjoille varataan **10 m/puoli tekninen Ion-säilytyskäytävä; tämä ei ole mitattu kanavaleveys**. Vesipolygonien ja käytävien unioni on noin 39621,217 m². Oma maapinta ja Ion-rajain jättävät tämän alueen pois. Omaa uutta vesipintaa, veden korkeutta tai syvyyttä ei keksitä.

**Lataa kaikki 12 GeoJSON-Featureä** tiedostosta `palatsialue-leikkaus-wgs84.geojson`. Osat ovat kelvollisia suljettuja vastapäiväisiä Polygoneja ilman sisäreikiä, koordinaattijärjestys longitude,latitude. Osat muodostavat yhdessä noin 762504,534 m² maa-alueen. Niillä piilotetaan vain Ion-taustaa; omia rakennuksia tai laattarajan yli ulottuvia massoja ei leikata. `palatsialue-leikkaus-wgs84-reikaversio.geojson` on sama alue sisäreikineen vertailua varten. Pelkän ensimmäisen Featuren lataus on virhe.

**Puut tummemmiksi vihreys säilyttäen.** Kaikille puubineille ja LOD-tasoille sama lineaarinen RGB-kerroin 0,55 säilyttää alkuperäisen värisuhteen. Opaque-texelit alpha≥0,5: LOD0 meanRGB noin (0.103836, 0.135831, 0.069433), lineaarinen luminanssiY 0.124235; LOD1/2 Y 0.123307. Tavoite 0,10–0,14 tarkoittaa tummuutta/luminanssia, ei jokaisen RGB-kanavan alarajaa. G on suurin. Alkuperäiset albedo-/alpha-/normaalipayloadit, geometria, MASK0,5, kaksipuolisuus ja neljän skaalabinin normaalikompensaatio säilyvät.

**Moderni tausta** käyttää vain modernien facade/roof-solumateriaalien lineaarista RGB-kerrointa [0,90;0,88;0,86]: lämpimämpi ja lineaariselta luminanssiltaan 10–14 % tummempi. Geometria ja korkeudet säilyvät.

**Native51-massat** ovat mukana: Museo relation/8607825 ja Kansankongressitalo relation/8848388 hyväksyttyine kivisävyineen, muuttumaton vaalea Hero relation/8847722 sekä Mao relation/8848142. Maon erillinen materiaalipohja on 1,04× muiden kahden massan lämmin kivi, sokkeli 15 % ja katto 12,5 % pohjaa tummempi. 1,5 m sokkelikaista on arvioitu materiaalijako; se ei muuta vanhaa 0,8 m alinta porrastieria, XYZ-rajoja tai kokonaiskorkeutta. Massojen koko geometria ja Great Hallin aukko säilyvät omistajalaatan yli ulottuvine osineen.

**PT303-kattokulta on lukittu.** Alkuperäiset kuvat ja suojatut ei-maapintojen geometria-/UV-/normaalipayloadit säilyvät. Uusi BIN rakennetaan muuttumattoman v2-etuliitteen päälle: välimallien käyttämätöntä geometriadataa ei monisteta. Kaikki muuttumattomat vanhat accessor/bufferView-viitteet säilyvät. V1/v2, native51 ja hylätyt väliehdokkaat jäävät alkuperäisinä talteen.

## Tarkistusnäyttö

72 GLB:n rakenteet, todelliset indeksit, upotetut kuvat, koordinaatit ja deltat luettu takaisin. 76 775 maa-alueella testattua kivi-/ramppipinnan kulma- ja keskipistenäytettä: 0 uutta aiemmin näkyneen pinnan hautautumista, 0 kontaktisuojan nostoregressiota. 221 vesivarauksen kohdalla olevaa näytettä siirtyy Ion-testille. Maapeiton symmetrinen ero varausten ulkopuolella noin 0.003366 m² ja float32-reunasuikaleiden vesivarausleikkaus noin 0.003798 m². Tämä ei ole kaikkien pintojen vesitiiviys- tai Ion-korkeusmittaus.

`QA/actual-glb-reimport/`: **20 alkuperäistä PNG:tä** — kuusi muuttumatonta kaupunkikameraa, kolme aiempaa diagnostiikkaa, kaksi vesivarausten lähikuvaa ja yhdeksän tile2–3-kuvaa kolmella LOD-tasolla. 24 LOD0-laattaa ja kaksi lisä-LOD-tiedostoa, 26 eri GLB:tä; kaikkia 72 ei kuvattu erikseen. Render-proof sitoo 27 tuontiriviä ja kaikki PNG:t SHA256:lla. 64 näytettä, tuore Metal-prosessi, neutraali valkoinen valaistus. Harmaat aukot näyttävät tekniset Ion-varaukset; ne eivät ole pelin vesi.

## Avoimet vastaanottajan portit

**Vähintään 0,30 m korkeuseroa Ion-maastoon ei ole mitattu eikä kuitata täytetyksi.** Oma tekninen 0…0,31 m lisä ei todista sitä; kontaktisuojissa lisä on nolla. Ionhide ei sekään ole pre-clip-korkeuseron mittaus. Valoseppä tarkistaa oikean maan/veden peiton, varausalueiden rakenteiden ja puuston kannatuksen sekä tarvittavat korkeuskohdat samalla kameralla. Käytävät ovat väliaikaisia teknisiä säilytysalueita, eivät uusia mitattuja vesirajoja.

Solin front/back-fixture erottaa nykyisen impostorin geometrisen N-peilauksen fyysisen lehden täydestä vastanormaalista. Neljän binin 3,88245° teoreettinen raja ei kata pikseleitä, mippejä, impostoriesitystä tai runtimea. Pelin molempien puolien varjostus, puiden päivänvalon väri, iltavalo, vesitehosteet, liikkuva LOD sekä laitteen FPS/muisti ja omistajan hyväksyntä jäävät pelitestille. Puukorttien tähtimäisyys/hyllymäisyys ja vanha LOD-ilmeen vaihdos eivät poistu tästä paketista.

Valoseppä paketoi, lentotestaa ja vaihtaa median oman suunnitelmansa mukaisesti. Pyydetty näyttö: sama päiväkamerapari kuin aiemmin, aukion kulma, kanava/lammet ja maan liittymät sekä päivä/ilta/LOD. Codex ei ole muuttanut Unityä, R2:ta, päähaaraa tai julkaisua. Tämä on **yksityinen osapaketti**, ei uusi canonical native52 tai koko kaupungin korkean laatutavoitteen valmistuminen.
