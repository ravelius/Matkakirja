# Omien mallien aurinkovarjot: Natiivisepän kustannusarvio (9.10.2026, PT:n pyyntö, LS2:n raportti 8aece5fc5)

Koe: proto `linssiseppa2/google-tyyli` c166e6799. Arvio perustuu RP-assetteihin (juna 173) ja LS2:n mittauksiin, laitemittausta ei ole.

## Korjaus LS2:n muistilukuun
URP:n päävalon varjokartta on YKSI atlas, jossa kaikki kaskadit ovat (4 kaskadia = 4 ruutua samassa atlaksessa), eikä se kerrannu
kaskadien määrällä. Metalilla URP käyttää 16-bittistä varjosyvyyttä. Atlas varataan vain, kun varjoja piirretään, joten kaupunkinäkymän
lisäys on:

| Taso (RP-asset) | Atlas nyt | Kaskadeja | Muisti (D16) |
|---|---|---|---|
| Mobile | 1024² | 1 | 2 Mt |
| PC | 2048² | 4 | 8 Mt |
| Ultra | 4096² | 4 | 32 Mt |

Muisti ei siis ole este millään tasolla. Kaupunkibudjetin marginaali on 1,5 Gt.

## Ruutuaika (arvio laitteelle)
- Varjopassi piirtää omat mallit jokaiseen kaskadiin, joten näkyvät omat mallit × kaskadit. Esimerkiksi KL LOD0 (154 k) + Riddarholmen (31 k)
  + muut näkyvät noin 300–500 k kolmiota × 4 = 1,2–2 M kolmiota pelkkänä verteksityönä.
  Arvio: M-iPad noin 0,5–1 ms, A15/A16-iPhone noin 1–2,5 ms. Simulaattorin 1,2–1,3 ms on Macin GPU:n arvo, ei laitteen.
- Vastaanotto (pehmeät varjot, SoftShadowQuality 3) koskee vain omien mallien pikseleitä, mikä on pieni osa ruudusta. Arvio < 0,3 ms.
- Kaukotason rajaus (12 757 km → ~105 km) parantaa syvyystarkkuutta eikä maksa mitään. Sulje-palautus on välttämätön, koska pallonäkymä
  tarvitsee täyden kaukotason.

## Suositus
1. **Mobile-taso: varjot pois kaupungissa.** 1024² ja 1 kaskadi eivät riitä 1000 m:n varjomatkaan, sillä terävyys olisi noin 1 m/teksel.
2. **PC: 2048², 2 kaskadia, varjomatka 1000 m. Ultra: 4096², 4 kaskadia, 1500 m** (LS2:n arvot). Asetetaan kaupungin avautuessa ja
   palautetaan Sulje-kutsussa. Linnan arvot pysyvät 50 m:ssä.
3. Varjonheittäjiksi riittää LOD1 (ShadowCastingMode.ShadowsOnly LOD1:lle, LOD0 vain vastaanottaa), mikä puolittaa KL:n varjopassin.
4. **Junaan oletuksena pois** (kehittäjäkytkin `omavarjot`), kunnes laitekustannus on mitattu. Mittaus tehdään kevyen testauksen
   linjan mukaan TF:n peliloki-gpuMs:llä kehittäjätilassa (omavarjot 0/1 samassa kulmassa). Erillinen iPad-ajo vain omistajan luvalla.
5. Raja (omat mallit eivät varjosta Googlen maata) vaatii laattavarjostimen muutoksen. Se on erillinen päätös, eikä sitä tehdä tässä.

## Vastaus LS2:lle 9.10. 18.4x (haara linssiseppa2/varjot-173 9acc8d4a7, PT:n päätös: mobiili 2048² / 2 kaskadia / 1000 m, Mac Ultra ennallaan)
- MUISTI KUITATTU: mobiilin atlas 2048² D16 = 8 Mt (ei 16, koska kaskadit ovat samassa atlaksessa), Ultra 32 Mt.
- OLETUS PÄÄLLE: EI KUITATA ennen laitemittausta. iPhone-arvio on 1–2,5 ms, eikä laitteella ole mitattua arvoa. Haara saa tulla
  avoimeen junaan 173 oletus pois (kytkin `omavarjot`). Oletus vaihdetaan, kun TF:n peliloki-gpuMs (omavarjot 0/1 samassa kulmassa,
  iPhone + iPad) näyttää lisäyksen ≤ 1,5 ms 60 Hz:n laitteilla. Mittauksen ajosta päättävät PT ja omistaja (kevyen testauksen linja).
- Ehdotus kustannuksen puolittamiseksi: varjonheittäjäksi LOD1 (ShadowsOnly), LOD0 vain vastaanottaa.
