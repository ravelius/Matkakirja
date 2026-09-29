# Natiivi-UI:n luovutus 29.9.2026 (af), NOLLAUS klo 05.1x

Jatkaa luovutusta (ae). Päätoimittaja = local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31. Proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto. Worktreet: wt/proto-natiivi-ui-pulupuhe (natiivi-ui/mallin-nimiot, mergetty),
wt/proto-natiivi-ui-iss (natiivi-ui/iss-nahka, KÄRKI). Skriptit proto-3d/lokit/natiivi-ui-1035/skriptit/. Simulaattorit
FB234D08 ja iPad 503000D1 SAMMUTETTU. Käännös- ja laitevuorot Julkaisijalta ("NYT"), yksi simulaattori kerrallaan.

## KÄRKI: ISS-säätöpaneeli natiiviin Codexin nahalla (Päätoimittaja 29.9., omistaja "Kyllä, kytke" + "Kelpaa")
- Web on malli: siirtoseppa-iss-paneeli 19037db35 (css/satelliitti.css). Kuvaparit ja hyväksytty pari:
  proto-3d/lokit/siirtoseppa-iss-paneeli-20260929/pari-paneeli-{iphone,ipad}.jpg (+ v2, v3). Rivi 1 lukema + kutistus
  (× → +), rivi 2 Nopeus | Kohde | Olosuhteet, rivi 3 valinnan mukaan; leveys 320 / iPad 360; 9-slice panel 20, readout 10,
  button-row 12, segment 10; peitto web iPhone kutistettu 6,6 %, Olosuhteet 27,3 %.
- Codex-paketti: /Users/samireivinen/Documents/Codex/2026-09-28/iss-saatopaneeli/ (README, sprites.json, assets).
- KOODI ON VALMIS (Linssiseppä 2): linssiseppa2/iss-paneeli a3926649 (pohja kyyti-saatimet 54cb193a). Tiedostot
  UI/Linssit/IssOhjaus.cs, UI/Linssit/IssKyytiNakyma.cs, UI/Resources/MatkakirjaUI/Linssit.uss (ISS-paneeli),
  UI/Resources/IssOhjaus/*.png, Linssit/Unity/LinssiOhjain.cs. Komento `astro kyyti paneeli 0|1|2|kutista|avaa|nahka
  perus|codex` (peitto lokiin).
- MINUN HAARANI: natiivi-ui/iss-nahka 78ead6ca = a3926649 + master BUILD 41 (IssKyytiNakyma.cs-ristiriita ratkaistu:
  paneelin kentät + leveys JA Cupola 3:n kupu/katto/valot/PaivitaKupu), unity 0. EI VIELÄ KÄÄNNETTY.
- KÄÄNNÖSPYYNTÖ JONOSSA Julkaisijalla: `proto-kaanna.sh natiivi-ui/iss-nahka FB234D08`, järjestys TF 1.0.40 → TF 1.0.41 →
  Linssiseppä 2 (saatimet4 + radio1) → iss-nahka; Julkaisija lähettää NYT. Sen jälkeen iPad 503000D1 ~10 min.
- Tehtävä: laitekuva iPhone + iPad (Nopeus / Kohde / Olosuhteet / kutistettu), peiton mittaus (komento lokiin),
  liukusäätimen uran ja nupin asemointi (Linssiseppä 2: tarkista kuvasta), web–natiivi-kuvapari (versio + laite +
  kuvakulma kuvaan) Päätoimittajalle, merge-pyyntö Natiivisepälle. Jos Linssiseppä 2:n saatimet4 muuttaa 54cb193a:ta,
  hän ilmoittaa → yhdistä.
- ISS-kyytiin pääsy komennoilla: selvitä LinssiOhjain.cs:stä (`astro kyyti …`, linssi-komento.txt); simulaattorin tap vaatii
  `attach`in laitteelle ensin (ks. muistio uitk-kosketusvalimuisti).

## VALMIS TÄLLÄ VUOROLLA
- 1.0.40: kortti-napautus b3046146 + lukijan valikko 7247e31a, luenta-jatko e667523e (Play() nollasi time-arvon → pala
  alusta), kosketus-valimuisti 36e6447f (UI Toolkitin Panel.Pick-välimuisti samassa pikselissä; mitätöinti
  ClearCachedElementUnderPointer + PickAll). iPad 0/60 (503000D1 ja Laitetestaaja 3B4CDACB).
- 1.0.41 (BUILD 41, Laitetestaaja 4/4 PASS): maakuntakortti 0c05cb3b (maakuntatila v2 + nostokortin kokoinen kortti,
  kuva kokoruutuun, kuvausruutu kehyksetön, iPadilla 1,4× ja 420 pt) ja mallien nimiöt v2b f6ab7911 (oma laatikko
  avaimella, kaupungin viereinen malli, lukittu ylä/ala ruudulla, oma malli ei peitä merkkiä, ei hehkua mallin päällä).
- Birka Tukholman alla: Linssiseppä ja Päätoimittaja hyväksyivät, SULJETTU.

## AVOIN
- Isoisän luennan / saapumisnimen puuttuva alku (omistaja 1.0.39): simulaattorissa äänitteet alkavat oikein (alkumittari
  haarassa natiivi-ui/luenta-alku 20fa7572, ei mergetä). Epäily laitteen reitti (Bluetooth); ei mitattu laitteella.

## OPIT
- Sonnet-ali-agentit rajattuihin tehtäviin (omistaja 28.9. 23.3x): ei simulaattoreita eikä käännöksiä; rooli todentaa.
- `ui napauta` myös PAINAA; mittaa `ui puu` (Documents/ui-puu.json). iPadin karttakomennon `napauta x y` y alhaalta.
- Simulaattorin tap ei mene laitteelle ennen `attach`ia; ensimmäinen tap attachin jälkeen voi kadota.
- proto-kaanna.sh: älä ketjuta `&&`-komentoihin (kaksoisjono); tarkista `ps` ettei samaa haaraa ole jonossa kahdesti.
