# Astra: paketti 336, globaalin maakentän lopullinen kuvakatselmus

16.10.2026 · OFFGAME · **Hyväksytty rajattuun yksityiseen lentotestiin. Aiempi tumma maasauma ja puiden harmaantuminen on korjattu tämän kuva-arvion laajuudessa.** Vastaanottajan Ion-, peli- ja omistajaportit jäävät avoimiksi.

Kohde: `peking-testikaupunki-20261016-native51-v3-lentotesti`. Katsottu henkilökohtaisesti kaikki 20 uutta alkuperäiskuvaa: kuusi kiinteää kaupunkinäkymää, viisi diagnostiikkaa ja tile 2–3:n kolme kameraa kaikilla kolmella LOD-tasolla. Arvio muodostettiin uusista kuvista ennen päätekijän myöhempää omaa kuvakuittausta. Vanhoja raportteja ei muutettu.

## Maasauma: Q336-ground-seam suljettu kuva-arviossa

Taihedianin vasemman etualan tumma vaakasauma on poissa samassa 1600×900-kuvan kohdassa x=0–239, y=724–734. Kiveys jatkuu yhtenäisen näköisenä. Pikseli (200,729) on nyt **122/116/108**; pre-water- ja vesiversiossa se oli **17/12/4**, v2:ssa **122/116/107**.

Sauma-alueen [120,728,230,732) RGB-keskiarvo palautuu vesiversion 67,77/64,03/56,68:sta arvoon **115,32/111,18/103,95**, lähes v2:n 115,33/111,23/103,98 tasolle. Viereinen kontrollialue säilyy. Näkyvä muutos korjaa paikallisen tumman reunan; en havainnut vastaavaa uutta repeämää muissa tarkastetuissa maa-/lähikuvissa. Tavallisia tekstuuri- ja rajaviivoja jää näkyviin, joten arvio ei väitä kaikkia maan rajoja näkymättömiksi.

Tuottajan ratkaisu on 25 metrin jaolla määritelty jatkuva, paloittain lineaarinen 0–0,31 m lisäkorkeuskenttä. Luettu actual-new-ground-float32-normal-readback raportoi 72 tiedostolle nolla uutta romahtanutta kolmiota ja nolla uutta normaali/geometriaristiriitaa; kaikkien kolmen LOD:n maa-XYZ/normaalit/UV ovat sen mukaan samat per laatta. Tämä on tuottajan tekninen auditointi, jonka tiedoston identiteetti tarkistettiin. En toistanut geometriatestiä tai päättele kaikkien normaalien oikeellisuutta kuvista. Vanhoja perittyjä maavirheitä ei tämän perusteella julisteta korjatuiksi.

## Puut: Q336-tree-green korjattu rajatussa värivertailussa

Jingshanin ja hutongin latvukset ovat nyt selvästi vihreämmät ja vähemmän harmaat kuin pre-water-/vesiversiossa. Väri lähestyy v2:n vihreää sävyluonnetta, mutta pysyy v2:ta tummempana. Avasin lisäksi Jingshanin ja hutongin v2- sekä vesiverrokit uudelleen. Vihreä identiteetti on riittävästi palautunut rajattua lentotestiä varten.

| Renderöity alue | Vesiversion RGB | Uusi RGB |
|---|---:|---:|
| Hutongin vaalea latvusosa [916,399,941,415) | 27,19 / 36,16 / 25,41 | 31,33 / 42,18 / 16,62 |
| Hutongin koko latvusalue [861,338,1007,439) | 30,03 / 34,19 / 24,31 | 31,80 / 37,59 / 19,64 |
| Jingshanin sekapuusto [50,520,550,800) | 19,01 / 23,82 / 16,36 | 20,95 / 27,41 / 11,96 |

Nämä ovat valaistun kuvan sRGB-koodiarvoja, eivät materiaalialbedoa. Sekapuustoalue sisältää myös varjoja ja taustaa. Syvät varjot ovat yhä hyvin tummia; vaakakortit, kulmikkuus ja LOD0→1:n ilmeen muutos säilyvät ennestään tunnettuina rajoina. Tämä ei ole puuston kokonaislaadun hyväksyntä.

Nykyisten GLB-tiedostojen tuottajatosite `current-effective-tree-albedo-readback.json` ilmoittaa tasakertoimen 0,55, LOD0:n lineaarisen RGB:n **0,103836 / 0,135831 / 0,069433** ja luminanssin **Y=0,124235**. Tummuustavoite 0,10–0,14 koskee tässä Y:tä; sininen kanava ei ole sillä välillä. Kertomaton lähtöatlas ja efektiivinen nykyalbedo ovat eri tietoja. Pelin normaalikannan, molempien puolien varjostuksen ja päivä-/iltavalon vaikutukset tarkistetaan vastaanottajalla.

## Vesivaraukset ja maan tuki

Sisäkanavan ja lampien molemmissa lähikuvissa tarkoitukselliset aukot säilyvät. Ne näkyvät myös palace-inner-bank-kuvassa sekä tile 2–3:n ylä-/viistokuvissa kaikilla LOD-tasoilla. Harmaa/vaalea world-tausta ei ole pelivettä eikä itsessään uusi maarepeämä.

Vesivaraussuunnitelma ja molemmat WGS84-GeoJSON-tiedostot ovat SHA256-tarkistuksessa tavulleen samat kuin aiemmin katsotussa vesiversiossa. Tuottajan lähderajaus on edelleen yhdeksän vesipolygonia, 12 ei-tunneliksi merkittyä keskilinjaa ja 12 reikävapaata maskiosaa. Keskilinjan 10 m/puoli on tekninen Ion-säilytyskäytävä, ei mitattu vesileveys.

Taihedianin alimmat näkyvät portaat, terassireunat ja lähikuvien maa–kivi-liittymät säilyvät ilman uutta näkyvää hautautumista. Tuottajan 76 775 varausten ulkopuolista kontaktinäytettä raportoi nolla uutta hautautumista ja nolla suojaregressiota. **221 varausten kohdalla olevaa kivinäytettä on edelleen siirretty Ion-tarkistukseen.** Aukkojen kohdalla tai reunoilla olevien puiden, muurien ja jalustojen kannatusta ei voi hyväksyä harmaasta offline-taustasta.

## Muut suojatut kohteet ja kolme LOD-tasoa

Kultakattojen keltakulta ja kuviointi säilyvät. Taihedianin kattoruudun keskiarvo muuttuu vesiversion 181,854/132,615/45,463:sta käytännössä samaan 181,852/132,615/45,466 arvoon. Aiempi kattodiagonaalin korjaus säilyy. Ei kultasävyn uussäätöä.

Museo ja Kansankongressitalo säilyttävät lämpimän kivisävyn. Mao säilyttää vaalean lämpimän ilmeen, sokkelikaistan ja yhden räystäsviivan; Hero säilyy vaaleana. Modernin taustan aiempi lämpeneminen ja tummennus säilyvät. Tarkkoja korkeuksia, sokkelimittoja tai materiaalikertoimia ei päätellä kuvista.

Tile 2–3:n yhdeksässä kuvassa ei havaittu uutta katon, arkkitehtuurin, portaiden tai varausten regressiota. Aiempi terassikaiteiden ja yksityiskohtien poistuminen sekä puiden kortti-/varjostusmuutos LOD0→1 säilyvät. Liikkuvia tarkkuustasovaihtoja ei testattu.

## Todisteet ja hyväksynnän raja

Kaikki **20 PNG:tä**, render-proofin **27 tuontiriviä / 26 eri GLB:tä** sekä **72 lopullista GLB:tä** täsmäävät SHA256-tositteisiin. Lopullinen binary-readback täsmää render-proofin viitteeseen. Paketti on 156 529 080 tavua; binary-readback raportoi 1 377 183 kolmiota. Myös 20 vesiverrokin, 18 pre-water-verrokin ja 15 v2-verrokin kuvatunnisteet tarkistettiin; kaikki oli katsottu aiemmissa katselmuksissa, neljä puuverrokkia avattiin tällä kierroksella uudelleen. Tämä ei tarkoita kaikkien 72 GLB:n erillistä visuaalista tarkastamista.

Kuva-arvion portti yksityiselle lentotestille on suljettu hyväksyttynä. Vastaanottajalle jäävät Ion-maskin toiminta, sisäkanavan/lampien pelikuva, vesi- ja maareunat sekä varausten rakenteiden tuki, **todellinen vähintään 0,3 m Ion-korkeusero (edelleen null/mittaamatta)**, puiden pelivarjostus ja päivä-/iltavalo, liikkuva LOD, laitesuorituskyky ja omistajahyväksyntä. Tekninen 0–0,31 m korotus ei ole Ion-korkeuseron mittaus. Ei väitettä pelissä toimimisesta, suoritetusta toimituksesta, integraatiosta, julkaisusta tai kokonaislaatutavoitteen saavuttamisesta.
