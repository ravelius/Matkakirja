# Kuumailmapallo ja Unreal Engine 5: maisema ja pallo (Karttaseppä ja Linssiseppä, 8.10.2026)

Omistaja 20.0x: "Miten kipin eli kuumailmapallon grafiikkaa saisi parannettua unreal enginen tasolle?"
Omistaja 19.5x: "Tee ja ota käyttöön kaikki mahdolliset grafiikan parannukset ja lisää muistin käyttöä niin paljon kuin pystyy."
Tilaaja Päätoimittaja. Karttaseppä kirjoitti maiseman ja kartan osuuden, Linssiseppä pallon osuuden (viimeinen osio).
Nykytila on luettu natiivin koodista (proto-3d/Matkakirja-proto, juna 167). **(EPÄVARMA)** = ei todennettu ensisijaisesta lähteestä tai laitteella.

## Vastaus lyhyesti

UE5:n tunnetuimmat edut, Lumen ja Nanite, eivät toimi iPadilla (ks. 3d-unreal-vs-unity-20260923.md). UE5:n ja Flight Simulatorin
"tason" tekevät pallonäkymässä muut asiat, ja ne kaikki voi tehdä URP:llä:
1. fysikaalinen ilmakehä (taivas ja ilmaperspektiivi)
2. pilvet ja niiden varjot maassa
3. vesi, joka heijastaa taivasta
4. terävät laatat lähellä
5. hallittu värisävytys.

Meiltä puuttuvat nyt kohdat 1–3 kokonaan, ja kohdat 4–5 ovat varovaisilla oletuksilla. Arvio: noin 3 viikon työllä maiseman
puolella päästään iPadilla lähelle Cesium for Unreal + Google 3D Tiles -näkymää.
Mihinkään ei tarvitse ostaa lisäosaa. Ainoa harkittava ostos on tilavuuspilvet (Altos, 41,40 €), jos omat kevyet pilvet eivät riitä.

Rajaa ei voi ylittää kummallakaan moottorilla: Googlen fotogrammetrian valo ja varjot ovat kuvauspäivältä. Rakennusten varjoja
ei voi kääntää auringon mukaan (sama UE5:ssä ja Flight Simulatorissa, jotka käyttävät valmiiksi valaistua kuvaa).

## Nykytila (kaupunkinäkymä pallosta, `Linssit/Unity/KaupunkiKuva.cs` ja `CesiumKaupunki.cs`)

| Osa | Nyt | Lähde |
|---|---|---|
| Maisema | Google Photorealistic 3D Tiles (Cesium ion 2275207, kehitys/testi); varalla World Terrain + Bing + OSM Buildings | CesiumKaupunki.cs |
| Laattatarkkuus | Googlen SSE 16 (muistikatto 5.10.: SSE 12 → RSS 5,3 Gt, SSE 8 → 7,7 Gt simussa). Välimuisti 256 Mt. iPad-kerroin näytön korkeudesta. Kaksivaiheinen tarkennus | CesiumKaupunki.cs r. 28–60 |
| Taivas | Kameran taustaväri (SolidColor). Taivaskupoli (DioraamaTaivas-gradientti) on olemassa, mutta oletuksena pois (`Kupoli = false`) | KaupunkiKuva.cs r. 44 |
| Sumu | Lineaarinen `RenderSettings.fog` (vain FOG_LINEAR säilyy buildissa), oletuksena pois (`Sumu = false`) | KaupunkiKuva.cs, Aurinko.cs |
| Pilvet | Ei pilviä kaupunkinäkymässä. Lennolla Blue Marble -pilvikuori (2D). Pilvien varjot vain ISS-kyydissä | PilviKerros.cs, Yokuori.shader |
| Sää | Sade, lumi ja salama koko ruudun peittokerroksena (juna 166) | PalloSaaKerros.cs |
| Vesi | Googlen fotogrammetrian vesi sellaisenaan (valokuva, ei heijastusta eikä aaltoja) | — |
| Kuva | MSAA 4×, anisotropia 8–16, renderScale 0,8 (Mobile), ei skaalainta, ei syvyystekstuuria. Volume (sävytys) oletuksena pois. Vuorokauden WhiteBalance ja ColorAdjustments päällä | KaupunkiKuva.cs, Mobile_RPAsset |
| Yö | Black Marble -valot kaupunkikuvaan | KaupunkiYovalot.cs |
| Muistioikeus | `increased-memory-limit` on julkaisukäännöksissä (Rakennus.cs r. 991–1005) | Rakennus.cs |

## Vertailu: UE5 (Cesium for Unreal + Google 3D Tiles), Flight Simulator 2024 ja meidän iPad

| Ominaisuus | UE5 työpöydällä | MS Flight Simulator 2024 | Meillä nyt | iPadilla URP:llä saavutettava |
|---|---|---|---|---|
| Taivas ja ilmakehä | Sky Atmosphere (fysikaalinen sironta, aurinko, kajo) | Fysikaalinen ilmakehä | Tasaväri | Esilaskettu sirontataulukko (LUT) kupoliin, sama kuin UE:n mobiilissa |
| Ilmaperspektiivi | Exponential Height Fog + ilmakehän sironta | Kyllä | Lineaarinen sumu, pois päältä | Koko ruudun vaihe syvyydestä: korkeus- ja etäisyysriippuva sironta |
| Tilavuuspilvet | Volumetric Clouds, varjot maahan | Kyllä, sää elävänä | Ei | Kevyt 2.5D-pilvikerros tai Altos ¼-resoluutiolla **(EPÄVARMA: iPadin hinta mitattava)** |
| Pilvien varjot maassa | Kyllä | Kyllä | Ei | Valon cookie-tekstuuri (URP:n päävalo), halpa |
| Vesi | Water-lisäosa, SSR- ja Lumen-heijastukset | Aallot, heijastukset | Valokuva | Vesimaski + oma varjostin: taivasheijastus, Fresnel, aallot normaalikartalla, auringon kimallus |
| Laattojen tarkkuus | Nanite ei koske Cesium-laattoja; SSE ja muisti ratkaisevat | Oma suoratoisto | SSE 16, 256 Mt | Laitekohtainen SSE 8–12 ja välimuisti 1–2 Gt (Natiiviseppä) |
| Reunanpehmennys ja skaalaus | TSR | DLSS/FSR/TAA | MSAA 4×, renderScale 0,8 | STP (Unity 6) tai TAA, jolloin fotogrammetrian välke vähenee |
| Sävytys | Filmic (ACES) ja automaattivalotus | Kyllä | Vuorokauden WB ja CA, ei tonemappausta | Kevyt LUT per vuorokaudenaika ja utukorjaus |
| Globaali valaistus | Lumen (ei iOS:llä) | Kyllä | — | Ei tarvita: fotogrammetria on valmiiksi valaistu |

## Parannuslista (maisema), tärkeysjärjestyksessä

Kehysaika enintään 18,3 ms (p95, 60 Hz). Muistiarvio on lisäys nykyiseen; iPad-mittaus vain omistajan luvalla (ABAB).

| # | Parannus | Vaikutus | Työ | Muisti / GPU | Osto |
|---|---|---|---|---|---|
| 1 | **Fysikaalinen taivas**: Rayleigh/Mie-sironnan LUT kupoliin (nykyinen kupoli + uusi varjostin), aurinko, aamu- ja iltakajo | Suuri: taivas on puolet kuvasta | 2 pv | LUT 256×64 RGBA16F ≈ 0,1 Mt; < 0,2 ms | Ei (oma; mallina avoimet PBSky for URP ja MinimalAtmosphere, lisenssi tarkistetaan ennen koodin lainaamista) |
| 2 | **Ilmaperspektiivi ja korkeusutu**: koko ruudun URP-vaihe, sama LUT kuin taivaassa, tiheys korkeuden mukaan (korvaa lineaarisen sumun) | Suuri: syvyys ja mittakaava, horisontti sulautuu taivaaseen | 2 pv | Syvyystekstuuri vain kaupunkinäkymän ajaksi ≈ 15 Mt; 0,5–1 ms | Ei |
| 3 | **Pilvien varjot maassa**: vierivä pilvitekstuuri päävalon cookieksi, samasta sääkerroksesta kuin pilvet | Suuri: liikkuvat varjot herättävät maiseman | 1 pv | 1024² ≈ 4 Mt (ASTC 1 Mt); < 0,2 ms | Ei |
| 4 | **Laattojen tarkkuus lähellä**: laitekohtainen SSE ja välimuisti, `os_proc_available_memory` avauksessa | Suuri lähellä (julkisivut, kadut) | 1 pv (Natiiviseppä) | iPad Pro 16 Gt: SSE 8–10, välimuisti 1–1,5 Gt **(EPÄVARMA: RSS mitattava)**; iPhone 8 Gt: SSE 12, 512 Mt | Ei |
| 5 | **Vesi**: vesimaski (OSM- ja NE-vesialueet, Karttaseppä tekee aineiston) omana meshinä veden pinnalle, varjostimessa taivasheijastus, Fresnel, aallot normaalikartalla, auringon kimallus ja rannan häivytys | Suuri meren ja järvien kohteissa (Tukholma, Venetsia, Istanbul) | 3–4 pv | Maski ja normaalikartat 10–30 Mt; 0,5 ms | Ei (vaihtoehto UWS 2, $65) |
| 6 | **Pilvet**: (a) kevyt 2.5D-pilvikerros (2–3 pilvitasoa, kohina, valaistus auringosta) | Keskisuuri–suuri | 3 pv | 8–16 Mt; 1 ms | Ei |
|   | (b) tilavuuspilvet Altoksella ¼-resoluutiolla A/B-kokeena | Suuri, jos iPad jaksaa | 3–5 pv | 30–60 Mt **(EPÄVARMA)**; 2–4 ms **(EPÄVARMA)** | Altos 41,40 € |
| 7 | **Skaalain ja reunat**: STP tai TAA renderScalella 0,8–0,9, KaupunkiTerava päälle | Keskisuuri: välke pois, terävämpi | 1 pv | Historiapuskurit ≈ 30 Mt; 0,5 ms | Ei |
| 8 | **Sävytys**: LUT per vuorokaudenaika, kevyt utukorjaus (Googlen kuvissa utua), bloom vain auringolle ja liekille (Linssisepän kanssa) | Keskisuuri | 1 pv | LUT 32³ ≈ 0,1 Mt | Ei |

Yhteensä noin 14–17 työpäivää maiseman puolella (kohta 6b lisäksi, jos se valitaan). Linssisepän pallon osuus on 8–10 pv.
Ehdotettu järjestys: 1 + 2 + 3 (ensimmäinen kuvapari), sitten 4 + 7, sitten 5, sitten 6a, sitten 8. 6b vain, jos 6a ei riitä.

**Työnjako (ehdotus PT:lle):**
- Karttaseppä: vesimaskiaineisto ja pilvitekstuurit (aineistot ämpäriin), sekä taivaan ja ilmaperspektiivin LUT-laskenta (työkalu).
- Linssiseppä: varjostimet ja KaupunkiKuva-kytkennät (hänen koodiaan).
- Natiiviseppä: muistibudjetti (kohta 4).

## Ostettavat lisäosat (Unity Asset Store, Standard EULA, Single Entity -lisenssi)

| Lisäosa | Hinta (haettu 8.10.) | URP | iOS | Suositus |
|---|---|---|---|---|
| **Altos** – Volumetric Clouds, Skybox, Weather (OccaSoftware) | 41,40 € (v. 7.18.0, 17.8.2026) | Kyllä | Ei mainintaa **(EPÄVARMA)** | Harkittava kohtaan 6b; Unity 6.3 -yhteensopivuus tarkistetaan ennen ostoa |
| Enviro 3 – Sky and Weather (H. Haupt) | Hintaa ei saatu | Kyllä (kaksikerroksiset tilavuuspilvet) | Ei mainintaa | Altoksen vaihtoehto |
| COZY: Stylized Weather 3 + Plume-pilvet | $50 (COZY Pro -paketti $50, sis. Plume) | Kyllä | Ei mainintaa | Tyylitelty, ei UE-realismia; projektissa mainittu A/B-ehdokkaana |
| UWS 2 – Universal Water System 2 for URP | $65 | Kyllä | "Mobile ready" (valmistajan mukaan) | Vain, jos oma vesi (kohta 5) ei riitä |
| Crest Water 5 | 220,81 € (v. 5.10.2, 30.9.2026) | Kyllä | Ei mainintaa | Ei: valtameren simulaatio, raskas, iOS vahvistamatta |
| KWS2 Water | $79,50–159 | Kyllä | Ei mobiilia | Ei |
| Cesium for Unity | Ilmainen (Apache 2.0) | Käytössä 1.25.1 | Kyllä | — |

Hinnat ovat kauppasivuilta 8.10.2026 ilman veroja ja voivat muuttua. Ilmaisia "ladattavia" kopioita (unityassetcollection ym.) ei käytetä.

## Riskit

- **Googlen 3D-laattojen lisenssi EU:ssa:** EEA-ehdoissa 3D-laatat eivät ole saatavilla. Ion-polku on ehdollinen (ks. 3d-google-laatat-eu-20260923.md). Nykyinen ion-asset on merkitty kehitys- ja testikäyttöön.
  Jos julkaisu vaatii vaihdon World Terrain + Bing + OSM Buildings -dataan, kohdat 1–3 ja 5–8 hyödyttävät sitäkin. Kohta 5 on silloin vielä tärkeämpi, koska Bing-vesi on tummaa.
- **Muisti:** iPad Pro kaatui 6.10. kohteen latauksessa. Kohta 4 nostetaan vain mitatusti (Natiivisepän budjetti, RSS-raja laitteittain).
- **Kehysaika:** kohdat 2, 6b ja 7 maksavat eniten. Lämpövahti (Lampo.cs) karsii ne ensimmäisenä.

## Lähteet

- 3d-unreal-vs-unity-20260923.md ja 3d-google-laatat-eu-20260923.md (3D-selvittäjä)
- [Altos (Asset Store)](https://assetstore.unity.com/packages/tools/particles-effects/altos-sky-and-clouds-for-urp-221227) ·
  [Crest Water 5](https://assetstore-fallback.unity.com/packages/tools/particles-effects/crest-water-5-oceans-rivers-lakes-268614) ·
  [UWS 2](https://assetstore.unity.com/packages/vfx/uws-2-universal-water-system-2-for-urp-mobile-ready-273861) ·
  [KWS URP](https://assetstore-fallback.unity.com/packages/tools/particles-effects/kws-water-system-urp-rendering-203144) ·
  [COZY 3](https://assetstore.unity.com/packages/tools/utilities/cozy-stylized-weather-3-271742) ·
  [Enviro 3 (Unity-foorumi)](https://discussions.unity.com/t/released-enviro-3-sky-and-weather-system/930064)
- [PBSky for URP](https://discussions.unity.com/t/open-source-physically-based-sky-for-urp/1610859) ·
  [MinimalAtmosphere](https://github.com/Fewes/MinimalAtmosphere)
- [Map Tiles API: käyttö ja laskutus](https://developers.google.com/maps/documentation/tile/usage-and-billing) ·
  [Cesium for Unity: Photorealistic 3D Tiles](https://cesium.com/learn/unity/unity-photorealistic-3d-tiles)
- [Increased Memory Limit -oikeus](https://developer.apple.com/tutorials/data/documentation/bundleresources/entitlements/com.apple.developer.kernel.increased-memory-limit.md) ·
  [Unity AddIncreasedMemoryLimit](https://docs.unity.cn/ja/ScriptReference/iOS.Xcode.ProjectCapabilityManager.AddIncreasedMemoryLimit.html)

## Pallo (Linssiseppä)

**Nykytila (juna 167)**
- Kori: Linnanrakentajan kori_nakyma.glb ja oma varjostin (PalloKori.shader): baseColor × kiinteä yläviisto valo. Ei normaalikarttaa, varjoja eikä ympäristövalaistusta, joten kori näyttää samalta päivällä, yöllä ja sateessa. Kori piirretään omalla kameralla puolella resoluutiolla, noin 2 px:n sumennuksella ja tummennuksella 0,85 ("pehmeä kori", omistaja 7.10.). Ei MSAA:ta, HDR:ää eikä jälkikäsittelyä.
- Köydet: kaksi mallin köyttä heiluu jäykästi viiveellä (KoriLiike: keinunta noin 1° / 5 s, jousi kiihdytyksissä). Fysiikkaa ei ole.
- Kupu: ei näy. Kuva on korin sisältä, ja köydet nousevat kuvan yli.
- Poltin: vain ääni (humahdus nousun alussa). Liekkiä, valoa ja lämmön väreilyä ei ole.
- Jälkikäsittely kaupunkikuvassa: ColorAdjustments (valotus, kontrasti, saturaatio) ja valinnainen Neutral-sävytys. Bloom vain, jos Hehku > 0, eli ei oletuksena.

**Mitä "UE5-taso" tarkoittaisi pallossa**
- Lumen: epäsuora valo ja heijastukset kankaassa ja punoksessa. Ei toimi iOS:llä.
- Nanite: ei iOS:llä.
- Niagara: liekki ja kipinät.
- Lämmön väreily refraktiona.
- Chaos Cloth / Cable: kupu ja köydet.
- Substrate-materiaalit: punos, nahka ja läpikuultava kangas.
- TSR-skaalaus.

iPadilla UE:n mobiilirenderöijä toimii ilman Lumenia ja Naniteä, joten URP voi päästä pallossa samaan (ks. 3d-unreal-vs-unity-20260923.md). Ero syntyy materiaaleista, valaistuksesta ja tehosteista, ei moottorista.

**Suositus URP:llä iPadin budjetissa, tärkeysjärjestyksessä**
1. Korin ja köysien valaistus kaupungin valosta (noin 1 pv). Aurinko, taivaan ambient ja KaupunkiKuvan valotus, jolloin päivä, yö ja sää näkyvät korissa. Lisäksi normaali- ja karheuskartta punokselle ja nahalle; Linnanrakentaja paistaa, jos niitä ei ole mallissa. Kustannus on pieni, koska kori piirretään puolella resoluutiolla.
2. Polttimen liekki ja valo nousuissa (noin 2 pv). Varjostinliekki (vierivä kohina -billboard) tai kevyet partikkelit kuvan yläreunaan ja lämmin valo korin reunaan. Liekki näkyy vain pallon noustessa (fysiikkasääntö). Ääni on jo valmiina, joten ne tahdistetaan.
3. Lämmön väreily (noin 1 pv). Rajattu refraktio liekin yläpuolella vain liekin aikana, URP-renderöijän lisävaiheena. Muistikustannus mitataan iPadilla.
4. Kupu näkyviin (2–3 pv, vaatii mallin Linnanrakentajalta). Kuvun suu ja kangaspaneelit näkyvät, kun kamera kallistuu ylöspäin. Kangas läpikuultaa auringon puolelta (taustavalo), ja tuuli aaltoilee sitä varjostimella ilman fysiikkaa.
5. Köysien fysiikka (noin 1 pv). Verlet-köysi puhtaana C#:na (Ydin, testattava): köydet taipuvat ja värähtelevät kiihdytyksissä.
6. Terävyys (0,5 pv). MSAA 4× korin kameralle (pieni pinta) tai täysi resoluutio iPad Prolla, jos omistaja luopuu pehmeästä korista.
7. Jälkikäsittely (Karttasepän kanssa): bloom vain liekille ja kevyt vinjetti korin reunaan.

**Rajat ja arvio**
- Kehysaika p95 enintään 18,3 ms (60 Hz). iPad-mittaus vain omistajan luvalla, ABAB.
- Kupu vaatii uuden mallin. Generointia ei tehdä ilman lupaa.
- Yhteensä noin 8–10 työpäivää. Ensin kohdat 1 ja 2, joista tulee suurin näkyvä hyöty: valaistu kori ja polttimen liekki.
