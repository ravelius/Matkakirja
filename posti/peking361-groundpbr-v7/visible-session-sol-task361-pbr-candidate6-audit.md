# #361 C6 – tekninen delta C4:ään

**Tekninen PASS: kolmen uuden GLB:n prefix, kulmat, rankmap, AO ja nykyinen vastaanottoportti 3/3.** C6:n tarkka koko72-projektio on **163991572 B**, ei viestin noin163991564 B; ero on 8 B. Budjettivaraa jää **334678 B**. C4-raportti on valmis ja säilyi ennallaan. C4 on visuaalisesti hylätty; tämä tarkastus ei hyväksy C6:n ilmettä tai runtimea eikä odottanut renderöintiä.

Kohteet ovat tämän hakemiston task361-362-work/ground-pbr-glb-candidate6 ja ground-pbr-candidate6. V6-pohja luettiin candidate-proofin baseV6Rootista; manifestti-, materiaali- ja layout-pinnit varmennettiin. Lähteenä luettiin kokonainen ground-pbr-candidate6-expanded-recipe.py sekä generate-task361-coherent-ground-pbr6.py / build-task361-ground-glbs6.py. Reseptiä ei suoritettu. Täydet uudet hashit, akselit, tilastot ja readbackit ovat [JSONissa](visible-session-sol-task361-pbr-candidate6-audit.json).

## Säilyvä rakenne ja todellinen kuvadelta

C4:n vertailutiedostojen hashit varmennettiin vanhasta auditista. C4→C6:ssa kaikkien accessorien dekoodatut tavut, primitiivit/meshit, solmut, materiaalit, texture-/sampler-/image-määrittelyt sekä losslessSourcePrimitiveFaceBlocks ovat täsmälleen samat. Kaikki muut BIN-bufferView-payloadit säilyvät; vain kolme uutta materiaalikuvaa/LOD vaihtuu. glTF-JSONin erot rajoittuvat näiden aiheuttamiin bufferOffset-/byteLength-arvoihin ja bufferin pituuteen.

C6:sta varmennettiin lisäksi V6:n koko tavutarkka BIN-prefix ja kaikki vanhat kuva-payloadit. Jokaisen alkuperäisen kolmion järjestetty POS/NORMAL/UV0/UV1 vertailtiin bittitarkasti. Kopioiden np.unique-lähdeindeksijärjestys, searchsorted+offset-remap ja täydet vertex-/index-blockit täsmäävät. Ei weldiä, kolmioiden poistoa tai normal-attribuuttien muutosta. Kopioista pois jätetyt 1130 käyttämätöntä kärkeä/LOD (1115 pavingia) säilyvät alkuperäisissä taulukoissa prefixinä. Seam-coverin face-block-roolit/extras, puut ja katto303 säilyvät.

AO-kuvan tavut, texture-sidonta, UV1 ja strength.6 ovat V6:n mukaiset. Albedo/normal/MR käyttävät UV1:tä ja baseFactor1 / roughnessFactor1 / metallic0 / normal.scale1. Nykyinen portti_glb poimittiin AST:stä ja suoritettiin vain nykyisille glTF-metatiedoille: **3/3 PASS**, 61 slottia/LOD ja jokainen teksturoitu materiaali enintään yhdellä piirrettävällä primitiivillä. Materiaalit/kuvat ovat yhä 36/47,35/47,35/47.

| LOD | C4 GLB B | C6 GLB B | C6−C4 B | Kolmioita |
|---|---:|---:|---:|---:|
| 0 | 12744056 | 13070020 | +325964 | 98042 |
| 1 | 5381724 | 5517040 | +135316 | 50638 |
| 2 | 4434552 | 4476024 | +41472 | 49306 |

Uusien yhdeksän kuvan todellinen koko on **4577675 B**, C4:ään nähden **+502749 B**. GLB-delta on **+502752 B**; kuvien ulkopuolinen erotus on 3 B. Lisäys V6:een on **5335564 B**, josta muu kuin kuva-payload on 757889 B. Alkuperäisten 72 V6-GLB:n todellisten tiedostokokojen summa158656008 B + korvausten lisäys antaa proofin **163991572 B / 1385100 kolmiota**; yläraja164326250 B. Kolmiovaraa on12283.

C5:n erillinen budget-rejection luettiin: ennuste164531089 B ylitti katon **204839 B**; lähdekuittauksen mukaan GLB:itä ei rakennettu. C5:n hylkäystä ei tulkita toimitukseksi tai C6:n hyväksynnäksi.

## Reseptin akselit ja lineaarinen lähdevärijakauma

C6:n kuvioakseli käyttää float32-kaavaa **((angle+π/4) mod (π/2))−π/4**: valitaan seinäakselin mod90-edustaja lähimmäksi alkuperäistä U/+E-akselia. UV0:n/UV1:n metrinen lähdekartta tai GLB-kulmat eivät käänny; vain generoitu kivikuvio kääntyy. Suurimman alueen id11 pinta-ala on105071.063143 m², alkuperäinen kuvioakseli90.0000025° ja uusi −0.000003415° eli float32-tarkkuudessa noin0°. Kaikkien28 alueen akselit ovat JSONissa. Tämä on lähdegeometriasta johdettu materiaalivalinta, ei historiallisesti mitattu kiveyssuunta.

Suunnittelukivi on nyt **.95×.50 m** (C4 1.20×.60 m); rivikohtainen leveys .874…1.026 m. Vaihteleva riviväli, puolen kiven limitys ja pieni rivioffset säilyvät. Albedo, height ja MR käyttävät yhteistä kivi-/saumajakoa. Sama koskematon g31-lähde ja 16×8:n koko kuvan RAM-näytteistys säilyvät; NASin alkuperäisen, oletuspolun ja T7-kopion SHA256 varmennettiin uudelleen: 51a7a2817228a595041fbf30f16b1e0b614624a0d9806d22d436622564114c93.

Uusi kivikohtainen väri tulee **V6:n image14:n lineaarisesta 24×24-värijakaumasta**. Alkuperäinen RGB-image14 hashattiin sourcePBR-pinniin. Ensin sRGB puretaan lineaariseksi ja kerrotaan vanhalla baseFactorilla [1,.98,.93]; kutakin kanavaa BOX-pienennetään float-muodossa. Yksi kivikohtainen deterministinen indeksi valitsee kokonaisen RGB-kolmikon 576 näytteestä, jolloin kanavien yhteisvaihtelu säilyy. PhotoRatios normalisoidaan jakauman omalla keskiarvolla. Tämä ei editoi alkuperäistä rasteria eikä sijoita sen 4.8 m:n kuvajaksoa uudelleen sisäalueelle.

Koskemattomasta lähdekuvasta uudelleen lasketut tilastot vastaavat proofia:

| Lineaarinen tilasto | R | G | B |
|---|---:|---:|---:|
| baseMean | .240177512 | .227266103 | .202671528 |
| lähteen24×24 paletteCV | .137699470 | .115595102 | .099029474 |
| mean-kalibrointikerroin | 1.041947472 | 1.041993216 | 1.042204789 |

CV tarkoittaa keskihajonta/keskiarvoa lähteen alhaisen taajuuden lineaarijakaumassa. Se ei todista lopullisen albedon histogrammin samuutta: grain, saumat, kuluma, zoneTone, kalibrointi ja reunablendi muuttavat lopputilastoja. Aiempi keinotekoinen warm-kerroin ei osallistu värilaskentaan; warm-symboli jää vain käyttämättömäksi laskennaksi reseptiin. Ei makropilviä. Väri kalibroidaan lähde-baseMeaniin ennen edelleen käytössä olevaa **8 m:n vanhan materiaalin reunablendiä**. Sen näkyvyyttä ei julisteta korjatuksi teknisen akselimuutoksen perusteella.

## JPEG83, data-PNG ja samat muistirajat

Albedo on uusi 4096/2048/1024 **JPEG83 4:2:0**, C4:n JPEG88:n sijaan. Jokainen JPEG vastaa tavulleen tallennetusta lineaarisesta raakakentästä tehtyä LOD-keskiarvoistusta, sRGB-muunnosta ja vastaavaa RAM-enkoodausta. Tämä on tiedostoreadback, ei materiaaligeneraattorin uudelleenajo.

Normal/MR ovat yhä1024/512/256 lossless-paletti-PNG:tä: convert('RGB')-dekoodauksessa ei alpha-/gamma-/sRGB-metatietoa, MR R255/B0 ja roughness G:ssä. MR-mipit vastaavat enintään1 LSB:n erolla kvantisoitua keskiarvoa. Normalin käytetyt palettivärit ovat5/4/4 ja MR:n26/17/12. PNG:n palettimenetelmässä ei kvantisoida värejä. Normalin +Y-/gradienttimenetelmä säilyy, ja sisäosan X/Y on yhä127/128; uusi väri- ja akselijakauma ei itsessään vahvista normal-reliefiä. AO:ta ei käytetä albedo-/PBR-laskennassa.

Kuvakoot, GPU-formaattioletukset ja slotit ovat samat kuin C4/C3:ssa, joten mallinnettu C4→C6-GPU-muistidelta on **0**. JPEG83 vaikuttaa siirtotavuihin ja häviölliseen kuvaan, ei samaan dekoodattuun RGBA8- tai KTX-mipketjun kokomalliin. Esikäsitelty V6 ja C6 ovat molemmat61 slottia/LOD: uutta runtime-slottilataussäästöä ei väitetä.

| LOD | RGBA8+mipit MB esikäsiteltyV6→C6 | Lisäys MB | KTX-formaattiarvio MB V6→C6 | Lisäys MB |
|---|---|---:|---|---:|
| 0 | 40.69→140.83 | +100.14 | 6.13→19.34 | +13.21 |
| 1 | 10.17→35.21 | +25.03 | 1.53→4.84 | +3.30 |
| 2 | 4.23→10.46 | +6.23 | .791→1.610 | +.819 |

Kolmen LOD:n yhtäaikainen skenaario on **+131.40 MB RGBA8** tai **+17.33 MB KTX-formaattiarviona** suhteessa esikäsiteltyynV6:een. Oletukset: ETC1S192 RGB .5 B/px (alpha1), UASTC-normal1 B/px, mipkerroin4/3, lataus per node×primitive×slot. Paletti ei tarkoita paletti-indeksien GPU-säilytystä. Luvut eivät ole mitattua VRAMia/FPS:ää tai actual KTX2-siirtotavuja; ajuri/CPU/streaming eivät sisälly.

V6 on vain vastaanottajan rajatun simulaattoritestin hyväksymä pohja. Esikäsittely ratkaisi vanhat porttihylkäykset; muita69 GLB:tä ei korjata niiden vuoksi, toimitusmuoto pysyy kolmen GLB:n deltana. Pinnan omistus (omaGLB/Ion/LOD/shader), JPEG83:n ja KTX2:n visuaalinen vaikutus, kanavat/DFD/mipit, reuna/moire/LOD sekä peli-/vesi-/valo-/fyysisen laitteen/runtime-/omistajaportit jäävät vastaanottajalle. Katto303/puut/geometria/AO säilyvät; #362-poikkeusta ei toteuteta tässä.

Vain nimetyt uudet C6 MD/JSON-raportit kirjoitettiin T7:lle. Python ulkoisen wrapperin kautta nice15, väliaineisto RAMissa. Ei materiaalien uudelleengenerointia, Blenderiä, Gitiä, Unityä, asset-/generaattorieditointeja tai delegointia. Ehdokkaan hashit varmennettiin uudelleen.
