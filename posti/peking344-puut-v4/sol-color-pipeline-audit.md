# Task344: puiden väriputken read-only-auditointi

**V2→V3:n todellinen puumuutos on lineaarinen baseColorFactor1→0,55. Tekstuureissa, normaalikartoissa tai puugeometriassa ei ole tätä harmaantumista selittävää deltaa. Tarkistetusta importer-/shader-polusta ei löytynyt ylimääräistä faktorille tehtävää sRGB-muunnosta tai erillistä puukohtaista harmaannusta. Pelissä näkyvän harmauden täsmällinen syy ei silti ratkea ilman saman ruudun runtime-arvoja.** Shaderin lisättävä heijastus/ilmasironta ja ympäristö-/jälkiväri ovat todellisia mahdollisia vaikutusmekanismeja, eivät mitattu yksittäinen juurisyy.

#343:n koko alkuperäinen MAIL-viesti luettiin ja commit/blob/paikallinenkopio varmennettiin. Vastaanottaja kertoo p340v3:n klo13/18-simussa palatsin/maan/korkeuksien toimivan ilman kaatumisia ja pyytää puiden kirkkautta v2/v3:n väliin sekä selvästi vihreämpää kylläisyyttä. Iltakattojen sävy on vastaanottajan valoputken asia. Tämä on vastaanottajan havainto, ei tämän auditin oma simutesti tai koko pelin hyväksyntä.

## Oikea koodi ja vastaanottajan aineisto

Pelin fyysinen read-only-juuri on **/Users/Shared/Claude/proto-3d/Matkakirja-proto**, paikallinen /System/Volumes/Data-kansio, ei T7-symlinkki. Kaikki tämän työn kirjoitukset pysyivät kahdessa T7-raportissa.

Nykyinen pelirepoHEAD **64e1efcd1f6f6d697edf33ed4d75590f4bfdf06f**. Vastaanottajan ARVIO-p340v3 nimeää simusovelluksen commitin **dda9e145ff2196c60f1545c5fb10457f969f53d6**. OmaMalli.shader,Ilmakeha.hlsl,KaupunkiKuva,KaupunkiIlmakeha,KaupunkiValo jaYmparistoValo ovat tavusamaiset näiden commitien välillä ja luetussa workingtreessä. CesiumOmatMallit eroaa piilopaketin reitityksessä/leikkauksessa; materiaalivalinta ja väriglobalien asetus ovat samat. Siksi nykyisen haaran latausreititystä ei esitetä simun täsmälleen samaksi reitiksi.

Asennettu Cesium-paketti on1.25.1. Sen saatavilla oleva paikallinen native-lähde onv1.25.1, muuttumaton luetuista kohdista. Tarkistus on versioon sidottu lähdekoodiketju; nativepluginia tai Unityä ei ajettu eikä shaderuniformeja luettu GPU:lta.

## Actual-v2/v3 ja KTX2: faktorimuutos säilyy

Kaikki72 alkuperäistä GLB-paria luettiin ja manifestoituSHA varmennettiin. **276 puumateriaali-/primitiiviesiintymää**. V2:ssa baseColorFactor puuttuu eli oletus1; V3:ssa [0,55;0,55;0,55;1]. Puumateriaalien muu JSON, MASK0,5, kaksipuolisuus, metalli0, karheus0,7799999714 ja normalScale-oletus1 säilyvät. Puun POSITION/NORMAL/UV/indeksitaulukot sekä upotetut albedo-/alfa-/normaalikuvat ovat tavutarkasti samat.

Myös vastaanottajan **p284v2/ktx ja p340v3/ktx** luettiin:144 todellistaGLB:tä. Kaikkien72 parin puufaktorit1/0,55 säilyvät; puiden **pakattujenKTX2-albedo- ja normaalipayloadien tavut sekä converted-geometry/UV/normal/index-taulukot ovat samat**. Pelkän KTX2-portin0virhettä sijaan tätä deltaa verrattiin itse. Pakattujen pikselien absoluuttista RGB:tä ei purettu, mutta pakkaus ei ole näiden kahden version asset-ero.

TreeCOLOR_0 puuttuu sekä lähtö- että KTX2-paketeista molemmissa versioissa. Shader käyttääv.c.rgb:tä; puuttuvan streamin GPU-oletusta ei mitattu tässä. Se ei ole V2/V3-asset-delta, eikä puuttumista julisteta todistetuksi virheeksi tai valkoiseksi streamiksi. Vastaanottajan runtime-luku voi varmistaa tämän kerran.

Opaque-texelien(alpha≥0,5) alkuperäinenLOD0-lineaarinen keskiarvo on(0,188792857;0,246965286;0,126242056),Y=0,225881611. V3:nY=0,124234886. **Uniform0,775 on lineaarisen albedon vertailupuoliväli**, RGB(0,146314464;0,191398097;0,097837594),Y=0,175058248. LOD1/2-referenceY=0,173750955. Tämä ei ole valmiiksi valaistun tai sRGB-kuvan puoliväli eikä lopullinen vihreä tintti.

## GLB→materiaali→shader

|Vaihe|Luettu toteutus|
|---|---|
|Oman mallin materiaali|CesiumOmatMallit.cs:52–55,210 lataa Resources/OmaMalli-shaderin ja asettaa sen tileset.opaqueMaterialiksi. Ei puukohtaista tinttiä taiMaterial.color-säätöä tässä reitissä.|
|glTF-faktori|Cesium native UnityPrepareRendererResources.cpp:1119–1122 käyttää **Material.SetVector(_baseColorFactor,rawglTFvalues)**. Se ei käytä Material.color/SetColor-/gamma-korjausta tässä faktorinsiirrossa. Native kloonaa opaqueMaterialin:1570 ja täyttää glTF-parametrit.|
|Kuvien väriavaruus|BaseColorloadTexture(...true), normal(...false):1135,1199. TextureLoader.cpp:89 käyttää Texture2D(...linear=!sRGB). ProjectSettingsm_ActiveColorSpace=1, lineaarinen projektiokäytäntö. Albedo näytteistyy sRGB-tekstuurina, normaali datana.|
|Albedo|OmaMalli.shader:105–107: textureRGB×_baseColorFactorRGB×vertexCOLOR_RGB. Ei ylimääräistä sRGB→linear/linear→sRGB-kutsua eikä puukohtaista desaturation-haaraa.|
|Normaali|:108–118 kääntää geometrisenN:n vastapuolella ja laskee derivative-TBN:n. Normaali ohjaa auringon/SH:n ja heijastuksen väriä; se ei itsessään vaihda baseColoria vihreästä harmaaksi.|

V2/V3:n normaalikompensaatio ja kuvat ovat samat myös vastaanottajan paketeissa. Aiempi80fixturen näyttö ei ratkaise pelin fyysisen vastanormaalin tavoitetta tai toteutunutta runtime-vastetta; tästä ei tehdä shaderkorjauskäskyä.

## Miksi tummennettu vihreä voi näyttää harmaalta/sinertävältä

- **Varjon diffuusi heikkenee, lisättävä heijastus ei skaalaudu samalla kertoimella.** Shader:129–142 käyttää suoraa valoa ja SampleSH(n)-ympäristöä; dielektrisellä puulla metalli0,F0=0,04. GGX-aurinkoheijastus ja SH-ympäristöheijastus lisätään erikseen. Viileä/vaalea heijastus voi siten korostua0,55-albedossa. Kiinteillä näytteillä, valoilla ja normaleilla ennen jälkikäsittelyä malli on C(f)=f·A+B. AdditiivisenB:n suhde diffuusiin kasvaa1/0,55≈1,818-kertaiseksi. Tämä on koodista johdettu mekanismi, ei kuvista sovitettu B-arvo.
- **Ympäristö on suunnittain eri värinen.** YmparistoValo.cs:13–33 muodostaa Trilightin alkuambientin luminanssista: päivän taivas suosii sinistä(0,80;0,92;1,18), horisontti on viileänneutraali(0,97;0,99;1,04), maa lämmin(1,08;0,98;0,85). SampleSH(n) ja reflect(d,n) näytteistävät eri suuntia. Vastapuoli ja normaalikartta vaikuttavat siksi myös koettuun sävyyn.
- **Ilmasironta on additiivinen.** OmaMalli:151–154 jaIlmakeha.hlsl:76–85 yhdistävät värillisen läpäisyn ja lisättävän sironnan. Tumma albedo voi lähestyä taivaan/udun väriä. Molempien simuaikojen logit ilmoittavat mitatun peking/syksy-udun latauksen epäonnistuneen ja Resources-LUT-fallbackin; tämä ei todista LUT-vikaa tai sen väriosuutta.
- **Jälkikäsittely ja sää voivat vähentää väriä.** KaupunkiKuva.cs:562–577 asettaa sävyn, ja Harmaus voi lisätä−45·harmaus-saturaation,−1EV:n ja−12-lämpötilan. Hetken todellista Harmaus-/SH-/materiaalidata-arvoa ei tässä mitattu.

Mitään näistä vaikutuksista ei erotettu vastaanottajan pikselimittauksena. Lähdekorjaus voi parantaa tulosta, mutta ei pidä peittää todettua importer- tai runtime-konfiguraatiovirhettä tintillä, jos sellainen myöhemmin löytyy.

## Päivä13 ja ilta18: mitkä selitykset eivät sovi suoraan

Testiskripti asettaa vainvuorokausi1 ja pakotetun tunnin13/18. Lokeissa13:ssa0EV/lämpötila0;18:ssa noin−0,07EV/lämpötila11. Lähdeavaimista ennen sääkorjausta13:n saturaatio on+8, kontrasti8 ja valkoinen suodin.18:ssa päivä→ilta-liuku0,6 tuottaa saturaation−1,6, kontrastin9,2,EV−0,072,WB10,8/tint2,4 ja suotimen(1;0,958;0,91). Peking ei ole kaupunkikohtaisen Lampimat-poikkeuksen jäsen; vainAteena löytyy luetusta taulukosta.

Illan SplitToning-varjot voivat sinertyä: KaupunkiKuva.cs:599–602 käyttää viileää varjoväriä(0,45;0,55;0,75), ellei kaupungin poikkeus neutraloi sitä. Slot-arvo ei ole sama kuin pikselin suora RGB-kerroin.

**Eksplisiittistä sinisen hetken(0,55;0,60;0,78)-kerrointa ei pidä nimetä näiden kahden pakotetun tunnin syyksi:** tarkistetussa tuntikaavassa auringonkorkeus13:ssa noin53,126° ja18:ssa0°, joten _IlmHamara.x:n−2…−7°-haara jää nollaksi. Liveglobalia ei luettu, mutta lähde ei tue tämän efektin aktiivisuutta tässä testissä.

Myöskään Neutral-tonemappaus ei ole näytetty selitys: nykyinen ja simucommitin Savytys-oletus onfalse, ja LuoVolyymi valitsee tällöin None. Vuorokausi voi silti luoda Volumen ja aktivoida ColorAdjustments/WB/SplitToningin myöhemmin, vaikka avausloki sanoo ”eiVolumea”. Vanha lähdekommentti Neutralista ei ole toteutunut arvo.

## Vastaanottajan mahdollinen mittaus ja päätöksenteko

Raakakuvat ja tarjottu sRGB-mittausdata kannattaa sitoa samaan kameraan/LOD:iin ja samoihin peittäviin puu-ROI:hin. Näyttö-sRGB:tä ei verrata suoraan lineaariseen PNG-albedokeskiarvoon. Tarkistettavat runtime-arvot: _baseColorFactor,_metallicRoughnessFactor,_normalMapScale,tekstuurin väriavaruus ja puuttuvanCOLOR-streamin oletus; samasta ruudusta _OmaValo,_OmaAurinko,SH/ambient,_IlmParam,_IlmHamara,_IlmMaailma sekäVolume/WB/split jaHarmaus. JPEG-kuvasta ei arvata näitä uniformeja.

**Auditissa ei löytynyt vahvistettua faktorinsiirron tai sRGB-ketjun bugia.** Kirkkauden0,775-reference ja vihreämmän faktorin vertaaminen on siksi perusteltu erillinen materiaalikoe. Offline-testiehdokkaan tekninen tarkistus ja valinta eivät odota koko compiled-appin todentamista; lopullinen pelissä näkyvä väri jää vastaanottajan13/18-testille. Lopullista tinttiä ei valittu tässä. EiUnity-/shader-/katto-/normal-/geometriamuutoksia; #342ei tule mukaan automaattisesti.

Ainoastaan tämän pipeline-auditin MD/JSON kirjoitettiin. Ei Unityajoa, Blenderiä, peli-/GLB-/source-edittejä, yhteydenottoja, lisädelegointia tai hyväksyntää Ion/sourcewater/deviceLOD/TBN/FPS/omistajaportteihin.

Rajaus: luetut koodipinnit ja paikallisetKTX2-faktorit ovat tämän lähdeauditin näyttö. Compiled-appin efektiivisen shaderin/valotuksen täysi todentaminen on vastaanottajan pelitesti, ei uusi offline-materiaalipaketin portti. Tässä ei rakenneta sovellusta tai rekonstruoida Unity-tuontia pidemmälle.
