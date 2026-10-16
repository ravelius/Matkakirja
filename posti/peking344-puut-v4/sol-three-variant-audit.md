# Task344: kolmen puusävyhaaran riippumaton tekninen auditointi

**Tulos: PASS kaikille 216 GLB:lle.** Tarkastetut haarat ovat midpoint, green-moderate ja green-strong, jokaisessa 24 laattaa ja kolme LOD-tasoa eli 72 GLB:tä. Auditointi ei valitse haaraa eikä hyväksy pelin lopullista väriä.

Vertailupohja on toimitettu native51-v3-lentotesti. Sen manifestin SHA256 on `8192a5dc7ee7cc0bf7a729d3d9ea88b22d35e40afc1cdd0aced136b04d0aa277`. Tarkastus luettiin varsinaisista GLB-tiedostoista riippumattomalla lukijalla. Tuottajan tarkastusskriptiä ei käytetty tuloksen muodostamiseen.

## Tarkastetut muutokset

Jokaisen tiedoston koko BIN-lohko on tavuntarkasti sama kuin V3-pohjassa. JSON-arvot ovat semanttisesti samat lukuun ottamatta puumateriaalien baseColorFactor-kertoimen kolmea RGB-komponenttia; alfa säilyy arvossa 1. Geometria, normaalit, UV:t, indeksit, upotetut tekstuurikuvat, kultakatot, maa, vesi ja DEM eivät muutu. Task342:n muutoksia ei ole mukana.

Tarkastuksessa purettiin kaikkien primitiivien positiot, normaalit, UV:t ja indeksit: äärellisyys, indeksirajat, kolmioiden lukumäärät ja accessor-rajojen vastaavuus toteutuivat. Suurin normaalin yksikköpituusvirhe oli noin 1,33e-7. Kaikkien 24 laatan sijainnit, alueet ja muut metatiedot säilyvät, ja 72 kokomerkintää vastaavat todellisia tiedostoja.

Puumateriaali-ilmentymiä muuttuu 276 haaraa kohti, yhteensä 828. Tämä vastaa todellisia materiaaleja ja muodollisia todisteita. Tiedostokohtaiset SHA256-, koko-, kolmio- ja pohjaversiotunnisteet vastaavat tuotantotodisteita. Lopuksi kaikkien 216 tiedoston sekä 72 V3-pohjatiedoston SHA256 luettiin uudelleen: ei muutoksia.

## Mitattu albedo ja budjetti

| Haara | RGB-kerroin | GLB-tavut yhteensä | LOD0 lineaarinen Y | Keskimääräisen RGB:n chroma-suhde |
|---|---|---:|---:|---:|
| midpoint | 0.775000000, 0.775000000, 0.775000000 | 156540688 | 0.175058248246 | 0.488827 |
| green-moderate | 0.710344910, 0.799138024, 0.591954092 | 156540688 | 0.175058248246 | 0.621353 |
| green-strong | 0.627899739, 0.824118408, 0.470924804 | 156540956 | 0.175058248246 | 0.707901 |

Jokaisessa haarassa on 1 377 183 kolmiota. Sovellettu aiemmin delegoitu v4+10 % -budjetti on 164 326 250 tavua ja 1 397 383 kolmiota. Tämä on auditoinnin budjettikäytäntö, ei PT284:n ilmoittama laiteraja. Midpoint- ja green-moderate-haaroille jää 7 785 562 tavua, green-strong-haaralle 7 785 294 tavua; kaikille jää 20 200 kolmiota. V3:een verrattu kasvu on 11 608 / 11 608 / 11 876 tavua ja tulee kokonaan JSON-lohkosta.

Albedo mitattiin varsinaisista upotetuista PNG-kuvista: sRGB purettiin lineaariseksi, alfa vähintään 128, ja RGB kerrottiin haaran materiaalikertoimella. LOD0:ssa kaikki haarat toteuttavat saman Y-tavoitteen 0,175058248246. V3:n vastaava Y oli 0,124234885852. Green-moderate ja green-strong lisäävät vihreän suhteellista osuutta samalla LOD0-luminanssilla.

Chroma-suhde tarkoittaa (max(meanRGB)-min(meanRGB))/max(meanRGB). Se ei ole pelin HSV-kylläisyys eikä ennuste renderöidystä pikselistä. LOD1/2:n Y on midpointissa 0,173750954634, moderatessa 0,173749472064 ja strongissa 0,173747771423. Pienet erot syntyvät alempien LOD-kuvien eri pikselikeskiarvosta; vain LOD0-tavoite on täsmälleen yhteinen. Alkuperäisiä kuvia ei muokattu.

## Väriputken päätelmän rajaus

Erillinen task344-väriputkiauditointi ei löytänyt vahvistettua gamma- tai faktorinsiirtovirhettä. Cesium siirtää materiaalikertoimen SetVector-kutsulla; vastaanottajan V2/V3-KTX2-puualbedot ja normaalit ovat tavusamat. Shaderin albedosta riippumaton heijastus sekä ilmakehä- ja valaistusosuudet voivat korostua albedoa tummennettaessa. Tämä on koodista johdettu mekanismi, ei mitattu selitys vastaanottajan kuvien harmaudelle.

Käännetyn sovelluksen efektiivisen shaderin, uniformien ja valaistuksen täysi todentaminen kuuluu vastaanottajan pelitestiin. Se ei ole uusi offline-ehdokkaan valinnan portti. Astra vastaa visuaalisesta arviosta ja omistaja haaran valinnasta. Tämä auditointi ei tee Unity- tai shader-muutoksia, rakenna mallia, toimita pelipakettia eikä anna klo 13/18 värille hyväksyntää.

Tiedostokohtaiset 216 tulosta, albedomittaukset ja todisteiden SHA256-tunnisteet ovat rinnakkaisessa JSON-raportissa.
