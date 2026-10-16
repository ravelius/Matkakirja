# #361/#362 – vastaanottoportin tekninen delta

Raportti koskee vain peking_2_3-pilotin suunnittelua V6:n päälle. Aiempi #361-preflight säilyi ennallaan. Uusi hyväksytty suunta on kokonaan uusi epäjaksollinen, piha-/käytävägeometriaan rajattu albedo/normal/MR-leivonta; pelkkä kontrastin vaimennus ei korjaa jaksoa. AO pysyy erillään eikä sitä leivota albedoon. Tässä ei toteutettu muutoksia.

## Vastaanottajan nykyinen lähde

Vain luettu juuri: /Users/Shared/Claude/proto-3d/Matkakirja-proto. Nykyinen HEAD: **64e1efcd1f6f6d697edf33ed4d75590f4bfdf06f**. Tarkastettujen shader-/porttitiedostojen git status oli tyhjä. OmaMalli.shaderin SHA256 on sama kuin aiemmassa preflightissa: UV-valinta on edelleen itsenäinen albedolle, normalille, MR:lle ja AO:lle; normal käyttää oman UV-kanavansa derivaattikehystä. KHR_texture_transform.rotation ei auta, koska shaderissa on vain ST-skaala/siirto. Lähdetiedostojen täydet polut ja SHA256:t ovat viereisessä JSONissa.

Portti: tyokalut/omat_mallit_ktx2.py:109–132,142–161,232–234. Värit ja muut ei-normal-slotit ovat ETC1S, oletuslaatu 192; **normalit ovat UASTC**, eivät ETC1S. Lähdepostin 1024-raja on annettava eksplisiittisesti --normaali-max 1024: CLI:n oletus on 0 eli ei kokorajaa. Mipit generoidaan vientiin. Tämä on vastaanottajan vientilinja, ei tämän auditin suorittama muunnos.

## Todelliset 72 GLB:tä

Vastaanottajan portti_glb-funktion nykyinen AST-poiminta suoritettiin muistissa vain JSON-metatiedoille, ilman moduulin käynnistystä, muunnoksia tai CLI-ajoa. V6 ja täsmällinen V5-pohja luettiin tiedostoista.

| Mitta | V5 | V6 |
|---|---:|---:|
| Portin hylkäämät GLB:t | 69/72 | 69/72 |
| Jaetut teksturoidut materiaaliryhmät | 180 | 180 |
| Solmu × primitiivi × tekstuurislotti -latausarvio | 4760 | 4766 |

Vain peking_3_5_lod0/1/2 läpäisevät. Jaettua teksturoitua meshiä useassa solmussa ei löytynyt. Kaikki nykyiset normal-viittaukset ovat enintään 256 px: uusia 1024-rajan ylityksiä ei siis ole vanhassa aineistossa. JSONissa on tiedostokohtainen porttitulos ja ryhmien node/mesh/primitive-tunnisteet.

V6:n ryhmät tiedostoittain: stage5_earth 66, stage5_grass 48, stage5_footway 36, owner_square_paving 9, stage5_paving 15, owner_hutong_ground 3 ja meidän stage5_paving_owner360_groundAO_probe 3. Kyseessä ovat ryhmien esiintymät GLB:issä, eivät materiaalien maailmanlaajuiset uniikkimäärät.

Pilotin jokaisessa LOD:ssa portti löytää earth×2, grass×3 ja AO-paving×2. V5:ssä paving oli jo kolmella primitiivillä; V6 irrotti niistä kaksi AO-klooniin ja jätti kolmannen alkuperäiselle materiaalille. AO-kloonin kaksi käyttöä on meidän vastuullamme korjattava, vaikka se ei lisännyt hylättyjen tiedostojen määrää. AO lisäsi kaksi slottikäyttöä per LOD, yhteensä kuusi.

| Pilotin ryhmä | LOD0-primitiivit | LOD1/2-primitiivit |
|---|---|---|
| earth | 25,33 | 24,32 |
| grass | 26,27,36 | 25,26,35 |
| AO-paving | 28,29 | 27,28 |

## Pienin oikea yhdistäminen – suunnitelma

Yhdistä saman materiaalin, tilan ja attribuuttiasettelun primitiivit **samassa solmussa ja nykyisessä paikallisessa koordinaatistossa**. Liitä alkuperäiset attribuuttitaulukot ja offsetoidut indeksit uusiin BINin loppuun tuleviin accessoreihin; jätä vanha BIN kokonaisena prefixiksi. Säilytä jokaisen alkuperäisen kolmion järjestetyt kulma-POS/NORMAL/UV0 ja tarvittava UV1 täsmälleen. Poista vain vanhat piirrettävät primitiivilinkit ja korvaa ne yhdellä; vanhat tavut jäävät. Ei weldiä, uudelleennormalisointia, kolmioiden poistoa tai materiaalikloonien tekemistä portin kiertämiseksi. Metadata/extras-roolit säilytetään erillisessä provenienssissa; toisistaan poikkeavia piirto-/näkyvyysrooleja ei niputeta sokeasti.

AO-parin suora concat on kussakin LOD:ssa 6213 kärkeä ja 6843 indeksiä / 2281 kolmiota. Float POS+NORMAL+UV0+UV1 on 248520 B; UINT16-indeksit 13686 B: **262206 B/LOD**, yhteensä **786618 B** ennen paddingia/JSONia. Tämä on toteutussuunnitelman payload-arvio, ei rakennettu tiedosto. Accessorien mahdollinen uudelleenkäyttö voi pienentää sitä. Kolmiot eivät lisäänny. Earth/grass-yhdistämisen ja uusien kuvien tavut lasketaan erikseen budjettiin.

AO-parin yhdistäminen vähentäisi pilotin slottiarvion 68→64/LOD; myös earth ja grass yhdistämällä 68→61/LOD. Pelkkä AO-pari ei läpäise koko pilotin porttia. Pilotin kolmen GLB:n jälkeen muille ruuduille jäisi 66 hylättävää tiedostoa; ne ovat erillinen koko paketin vastaanottotyö: yhden pilotin korjausta ei nimetä 72 GLB:n porttihyväksynnäksi eikä muiden ruutujen muuttamiseen ole tässä lupaa.

Vastaanottajan yleinen omat_mallit_instanssit.mjs:54–91 jo yhdistää materiaaliryhmiä, mutta leipoo maailmanmuunnoksia, prunettaa ja kirjoittaa uudelleen. Sen oma vartio vertaa kolmioiden määrää ja 1 cm:n scene-rajoja; se **ei todista BIN-prefixiä tai kulma-attribuuttien täsmällistä säilymistä**. Siksi lähdepilotin rajattu append-yhdistäminen ja erillinen kulmareadback ovat oikea suunnitelma.

## Muistivaikutus ja AO-raja

Etukäteisarviot, eivät mitattua VRAMia/FPS:ää: täysi mipketju ≈4/3; ETC1S RGB ≈0.5 B/px, UASTC-normal ≈1 B/px. Esimerkiksi yksi yhdistetty primitiivi, albedo 2048² + MR 2048² + normal 1024²: noin **6.99 MB** PBR-tekstuuria; jakaminen kahdelle primitiiville voisi nostaa arvion noin **13.98 MB:iin**. AO on erikseen. Alfan, transkoodausformaatin, mip-lohkojen, CPU-kopioiden ja streamingin todellinen kustannus tarkastetaan vastaanotossa.

AO-parin yhdistäminen poistaa yhden ylimääräisen AO-slottilatauksen per LOD. V6:n 2048/1024/512-kuville yhden kopion RGBA8+mip-arvio on yhteensä 29.36 MB, ETC1S RGB -skenaario noin 3.67 MB. Lisäksi säästyy yksi vanhan albedo/normal/MR-sarjan lataus. Näitä ei vähennetä suoraan uusien kuvien siirtotavuista: pakettikuvat olivat jo jaettuja. ETC1S-laatu192 ei määrää KTX2-tiedostokokoa; mitataan todelliset siirto- ja pakettitavut. Budjettivara 5670242 B / 12283 tri ei ole kulutuslupa.

Lähdepaketin AO-kuvapayload, UV1 ja strength säilytetään V6:n mukaisina. Vastaanottajan ETC1S-muunnos vaihtaa kuvatavut ja voi muuttaa dekoodattua AO:ta: KTX2:n AO-arvot/mipit tarkastetaan erikseen, eikä pakattua tulosta väitetä byteilleen samaksi AO:ksi. Normalin uusi tangenttikehys ja MR:n G/B-kanavat pidetään uuden kivijaon kanssa yhtenäisinä.

## #303: täsmällinen lukko

Guardin lähde: tämän hakemiston **round51/source/data/owner-trial.json:379–383,392**, imperialGlazedRoofTint=[1,1.08,.9] ja **roofHueExplicitlyAccepted303DoNotRetune=true**. Tämä on deklaratiivinen ohje-/konfiguraatiolukko, ei itsessään toteutuva poikkeuksen heittävä vartio. **round51/source/LAHTEET.md:17:** “PT303 hyväksyy kultakaton nykyisen kertoimen[1,1.08,.9]. Sitä ei muuteta.” Stage8_scene.py:35 kuluttaa juuri tätä tinttiä. Myös valmis V6:n katto säilytetään.

Uuden lähdepostin posti/linssiseppa-codex-peking361-362-aloita-20261016.md:27–29 pyytää ±5–8 % / 4–8 varianttia, mutta määrää kysymään ennen suojauksen ohittamista. Commit addcc8ac14ddc4c2aeaef16261ba81fbbfa6a34b, blob 607a0c51bea367fef8a0d7c62b9259da17f946f1 luettiin postityöpuun Git-objektista.

**Rakennuskohtaiset ±5–8 % base-factorit jäävät lukon taakse, vaikka keskiarvo säilyisi.** Lukko koskee nykyisen sävyn uudelleensäätöä eikä vain bitmapin editointia. Tässä saa suunnitella erillistä diagnostiikkaa raporttina; erillinenkin muuttunut kattoassetti tarvitsee nimenomaisen poikkeusluvan ennen toteutusta. Kattoa ei muuteta eikä diagnostista varianttia tulkita automaattiseksi poikkeukseksi. Parent voi jatkaa #361:tä sekä erikseen rajattua muuta #362-suunnittelua; #303:n poikkeus ratkaistaan erikseen lähdepostin ehdon mukaan.

Vain nämä uudet MD/JSON-raportit kirjoitettiin. Python T7-wrapperin kautta nice15:llä, väliaineisto RAMissa. Ei Blenderiä, asset-/generaattori-/Unity-/Git-muutoksia, asennuksia tai delegointia. Alkuperäiset RGB:t, puut, lähdegeometria, DEM/origot/maskit/saumapeitot säilyvät. V6 on lähdepostin mukaan vastaanotettu ja pelitestissä, ei runtime-hyväksytty; peli-/vesi-/valo-/omistajaportit jäävät avoimiksi.
