# Natiivi-UI: luovutus 8.11.2026 klo 22.30 (konteksti 26 %; lisäys luovutuksiin -2215 ja -2200)

Lue ENSIN -2215 (`git show 473f9f3ef:docs/raportit/viesti-natiivi-ui-luovutus-20261108-2215.md`) ja sen osoittama -2200; ne ovat yhä voimassa,
paitsi iPad 70 % alla. PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, KK local_37f7c945-…. Kaikki koe, EI JUNAAN ilman PT:n/KK:n sanaa.

## 1) iPad 70 % (ETUSIJA; omistaja 22.07, PT 22.3x valitsi kapeamman kuvakulman)
- Ajo -1 (cf657f1d0) katsottu: Eiffel ~51 → 63 % ruudusta, Notre-Dame ei muuttunut (~54 %). Syy: kamera jää piirroksen lähitasoon
  (MinKorkeusPaikassa 1679 m = minD). Parit lokit/nui-ipad70-1-ipad-cf657f1d0/pari-*.jpg viety PT:lle.
- Korjaus 79351459b (natiivi-backup natiivi-ui/esittely-ipad-70, worktree /Users/Shared/Claude/wt/proto-natiivi-ui-ipad-70):
  PalloKierto.EsittelyZoom (kuvakulman kapennus ilman loittonemista; fieldOfView kapea, LogiikanFov 50° kuten piirroslinssissä; liukuu
  aikavakiolla 0,3 s; Liikkeessa-ehdossa ZoomLiukuu). NahtavyysEsittely: vain tabletilla, zoomi = vapaa etäisyys (ilman lähitasoa) /
  lähitaso, enintään 2,2; palautus 1,0:aan kun kierto päättyy, kertoja lopettaa, palkki poistuu tai kamera lähtee. Tila-rivillä zoomi ja
  kuvakulma. `tabletti 0` = ei zoomia (ENNEN). unity-tarkistus 0 virhettä.
- Mac-ajo JU:lla JONOSSA: sk-ipad70-2-mac.txt, koko ipad, lokit/nui-ipad70-2-ipad-79351459b. Tarkista lokista "täyttö 0.93, zoomi 1.xx"
  (Notre-Dame) ja "zoomi palaa 1,0", kuvista Notre-Dame ~70 % ja koko malli palkin ja kuvan alla myös -2:ssa → pari PT:lle → KK.

## 2) KAMERATAPPI (omistaja 22.16 + 22.18 "voi olla kyllä kokoajan olemassa"; KK:n suunnitelma
##    /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261108-kameratappi.md)
- Haara natiivi-backup natiivi-ui/kameratappi = 2d69ff27e (84a91d530 + 1), worktree /Users/Shared/Claude/wt/proto-natiivi-ui-kameratappi.
- UI/KameraTappi.cs: OpasTapit.Tappi Pulun kerroksessa, AINA näkyvissä kaupunkinäkymässä (PiirrosKerros.Nakyvyys > 0,5, ei modaali,
  ei astronautti), Pulun lepopaikan (Pulu.LintuLevossa, uusi) VASEMMALLA linnun korkeudella; levossa opasiteetti 0,22, kosketuksessa 0,9
  (ohjausnappi.uss .mk-tappi--kamera). PalloKierto: TappiKosketaan (pallo ei lue sormia/hiirtä), TappiPysayta (ajo + esittelyn kierto
  seis heti, EI PelaajanEle → Pulu ei lennä pois), TappiOhjaa. KameraEleet.TappiKayra/TappiMuutos/TappiKallistus: kuollut alue 0,15,
  neliöllinen käyrä, 45 °/s kallistus, 60 °/s kierto, akselit käänteiset (alas → kallistus +, vasemmalle → suuntima +). Testit 3/3,
  unity-tarkistus 0 virhettä. Testikomento `ui kameratappi tila` / `ui kameratappi x y s`.
- Mac-ajot JU:lla JONOSSA (iPad 70 % -2:n jälkeen): sk-kameratappi-1-iphone.txt koot iphone + iphone-vaaka, sk-kameratappi-1-ipad.txt
  koko ipad; lokit nui-kameratappi-1-{iphone,iphone-vaaka,ipad}-2d69ff27e. Tarkista: t-0 tappi näkyy himmeänä Pulun vieressä, ei
  päällekkäin minkään kanssa (iPhone vaaka!); tila-riveillä kallistus kasvaa t-1:n jälkeen ja suuntima kasvaa t-2:n jälkeen; t-3 Pulu
  paikallaan → pari PT:lle → KK. Avoin riski: oikea kosketus (osoitin) testattu vain koodista; Tappi-luokka sama kuin oppaassa.

## 3) Sitten ★-kyltit (-2200:n SEURAAVA TEHTÄVÄ).
