# ISS-kohtauksen laitemittaus 30.9.2026 (Linssiseppä)

Päätoimittajan erä: ISS-kohtauksen laitekierros fyysisellä iPadilla. Mitattiin fps, muisti ja lämpö koko kyydin ajan ja
etsittiin pahin pullonkaula.

## Laite ja käännös

- iPad Pro 12.9" (5. sukupolvi, iPad13,8), UDID 00008103. Laite oli laturissa, akku 100 %.
- Kehityskäännös `fi.matkakirja.peli.kehitys`, juna 8f04fa16 (29.9. klo 23.45, Release). Linssiseppä 2 asensi sen, eikä
  sitä vaihdettu.
- Skriptit ovat kansiossa `proto-3d/tyokalut/linssiseppa-ajot/`: `iss-laitemittaus.sh` (koko kyyti) ja
  `iss-cupola-ab.sh` (Cupolan A/B). Pohjana on Natiiviseppän `lampojakso2.sh`.
- Mittarit:
  - pelin LampoMittari 30 s välein: thermalState, fps ja tavoite-fps;
  - raakakehysajat vaiheittain (`mittaus alku|loppu`);
  - xctracen Activity Monitor (muisti ja CPU).
- Lokit: `proto-3d/lokit/iss-laite-20260930/` ja `iss-cupola-ab-20260930/`.

## Tulokset (ajo 1, 00.36–00.51)

| Vaihe | Kehysaika, mediaani | p95 | fps (tavoite) | Huom. |
|---|---|---|---|---|
| Kartta | 33,3 ms | 33,5 | 31,7 (30) | Kartan katto on 30 fps, tarkoituksella |
| Astronautin kamera, kauko | 16,7 | 16,8 | 60,0 (60) | |
| Seuranta (1200 km, kallistus 55°, fov 50) | 16,7 | 16,8 | 60,0 (60) | |
| **Cupola (532 km, kallistus 38°, fov 66)** | **25,0** | **33,4** | **37,1 (60)** | 222 kehystä yli 33 ms |
| Avaruuskävely | 16,7 | 25,2 | 53,1 (60) | |

- **Lämpö:** thermalState nousi arvoon 2 (serious) klo 00.46,9, noin 10 minuuttia alusta ja Cupolan ja kävelyn jälkeen.
  LampoMittari kuristi tavoitteen 30 fps:iin, ja tila palasi nollaan klo 00.49,4 kartalla. Ajon 2 alussa laite oli yhä
  lämmin (aloitus klo 00.53), ja **pelkkä Cupola nosti tilan kakkoseen noin neljässä minuutissa** (klo 00.57).
- **Muisti (xctrace, ajo 2):** physical footprint oli kartalla 1,9 GiB. Astronautin kamerassa ja Cupolassa se oli
  2,57–2,67 GiB ja pysyi tasaisena, eli vuotoa ei ole. Iso iPad kestää tämän. 4 Gt:n laitteilla (jetsam-raja noin
  2 GiB) 2,6 GiB on riski, ja se kannattaa mitata erikseen.
- **CPU:** 35–55 % (8 ydintä), hetkellisesti 177 % kyytiin siirryttäessä. Kuorma on GPU-sidonnainen, ei CPU.

## Cupolan A/B (ajo 2, keskeytyi)

Päätoimittaja keskeytti ajon klo 01.01, koska Macin kuorma oli noin 560. Ennen kuristusta mitattiin vain perustila ja
pölyt pois:

| Tila | Mediaani | fps |
|---|---|---|
| Perus | 24,2 ms | 44,7 |
| Pölyt (polyt) pois | 25,0 ms | 39,6 |

Pölyt eivät ole syy. Muut kytkimet mitattiin kuristetussa tilassa (30 fps), joten niiden tulokset eivät kelpaa: kellunta,
reunavalo, ajelehdus, taivas, tarkat pilvet, päivän pilvet ja valot.

## Pahin pullonkaula: Cupola (GPU, lämpö)

Cupola on ainoa vaihe, jossa fps jää selvästi tavoitteesta (37 vs. 60), ja se kuumentaa laitteen serious-tilaan
minuuteissa. UI-tehosteet (pölyt) eivät selitä eroa. Seurannan kamera 1200 km:ssä ja fov 50:llä pysyy 60 fps:ssä, mutta
Cupolan kamera on matalalla (532 km), vinossa (38°) ja laajalla kuvakulmalla (fov 66), jolloin näkyvissä on horisonttiin
asti ulottuva maa. Hypoteesi on, että näkyvien laattojen määrä ja ilmakehä kuormittavat GPU:ta.

## Korjausehdotus (mitataan, kun kuorma sallii)

1. Cupolan (KyydinTila.Ikkuna) A/B viileällä laitteella, kukin 60 s:
   - laattojen SSE (`maasto sse 24|32` Cupolan ajaksi);
   - renderScale 0,8 (valmis kytkin: `lampo kuuma` = renderScale 0,7, bloom pois ja 30 fps);
   - fov 66 → 58.
2. Toteutetaan halvin, joka nostaa Cupolan ≥ 55 fps:iin ja pitää thermalStaten 0–1:ssä 5 minuutin ajan. Varalla on
   Cupolan tavoite 30 fps (näkymä liikkuu hitaasti, eikä omistaja erota), mikä puolittaa GPU-työn.
3. Muistimittaus pienellä laitteella (4 Gt), jos sellainen on käytettävissä.

## Jatko: juurisyy löytyi (ajot 3–5, klo 01.06–02.07)

- **Kamera-A/B** (`iss-cupola-kamera-20260930`): kapeampi fov 56° ei nopeuttanut (40 vs. 47 fps). Laite lämpeni tilaan 2
  kolmessa minuutissa, joten loput tulokset eivät kelpaa. Kamera ei ole syy: avaruuskävely on samoin matala ja laaja,
  ja se pyörii 53 fps:ssä.
- **Vuorotellen tehty UI-A/B** (`iss-cupola-ui-20260930` ja `-ui2-`, 20 s jaksot, thermal 0 koko ajan):

| Tila | Mediaani |
|---|---|
| Cupola, perus | 24,7–25,0 ms |
| Vanha 1.0.35-kehys (ei reunavaloja) | 16,9 ms |
| Neljä tehostetta pois | 17,7 ms |
| **Pelkkä reunavalo pois** | **16,8 ms** |
| Ajelehdus pois | 24,8 ms |
| Pölyt pois | 24,9 ms |
| Seuranta | 16,7 ms |

- **Juurisyy: Cupola 3:n kolme reunavaloa** (sun-nw, sun-ne, sun-sw). Ne ovat kolme koko ruudun 2732 × 2048 -kuvaa UI
  Toolkitissa, ja kukin sekoitetaan koko ruudulta, vaikka näkyviä pikseleitä on vain 2–3 %. Hinta on noin 8 ms kehyksessä.
- **Korjaus** (proto linssiseppa/cupola-fps 28f3e947): varjostin `CupolaValot` yhdistää kolme valoa painoineen puolikokoiseen
  RT:hen vain painojen muuttuessa, ja UI piirtää yhden kerroksen. Kompositio on sama. A/B-komento on `astro kyyti valot1 0|1`.
  Laitemittaus odottaa laite-release-käännöstä (Natiiviseppä).

## KORJAUS EDELLISEEN: juurisyy ei ollutkaan reunavalot (ajo 6, klo 03.36–03.46, korjauskäännös 28f3e947)

Vuorotellen tehty A/B korjauskäännöksellä (`iss-cupola-valot1-20260930`, 20 s jaksot, thermal 0 koko ajan):

| Jakso (järjestyksessä) | Mediaani |
|---|---|
| yksi kerros (korjaus) | 16,8 ms |
| kolme kerrosta (ennen) | 18,5 ms |
| yksi | 23,3 ms |
| kolme | 24,7 ms |
| yksi | 23,0 ms |
| reunavalo kokonaan pois | 23,7 ms |
| yksi | 24,8 ms |

- **Yhdistetty kerros säästää noin 1,5 ms** (7 %) samalla ulkonäöllä. Se on pieni, mutta johdonmukainen molemmissa pareissa.
- **Päätelmä "reunavalo = 8 ms" oli ajan sekoittama.** Kaikissa ajoissa Cupola on 30–40 s nopea (~17 ms) ja hidastuu sitten
  noin 24 ms:iin riippumatta kytkimistä: reunavalo pois myöhään = 23,7 ms. Aiemmat nopeat jaksot sattuivat alkuun.
- **Syy on Cupolan kokonaiskuorma lähellä GPU:n rajaa.** Kun SoC lämpenee (kellotaajuus laskee jo ennen kuin thermalState
  muuttuu), Cupola putoaa 60:stä noin 40 fps:iin ja lopulta kuristukseen 30 fps. Seuranta pysyy samassa lämmössä 60 fps:ssä,
  koska sen näkymä on kevyempi. Piirtokutsuja on tasaisesti noin 107, eli laattoja ei kerry.
- Suositus ja päätös, ks. viesti Päätoimittajalle: Cupolaan 30 fps:n tavoite (tasainen ja viileä, näkymä liikkuu hitaasti)
  ja yhdistetty kerros mukaan.
