# Natiivi-UI: luovutus 18.10.2026 klo 13.35 (Postivahti: kova raja 35 %)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Korvaa -0930:n (sen "Opit" yhä voimassa). Id:t /Users/Shared/Claude/osoitekirja.md
(PT local_cf5b4eca-…, JU local_1325b8e8-…, NS local_04e2850b-…, VS local_ee961a2d-…). Simu VAIN JU:n SIMU NYT -viestistä; ajon jälkeen
app pois + simu kiinni + SIMU VAPAA. Udidit: iPhone 123B4B25-36B7-4A76-B677-905621CD8F5A, iPad F7513985-C8BC-4E97-8D29-9C9BD420E962.
OMISTAJAN PÄÄTÖS 09.37 (PT): työn alla vain ISS, Louvre ja aamun pyynnöt; vanhat (lasipohja, maakunnan Lue lisää, kaupunki-intro) TAUOLLA.
OMISTAJA 12.14: kuvatekstit AINA kuvan ulkopuolelle → `kolmikko.py ulos.png kuva.png=Teksti …` tekee valkoisen raidan kuvan alle (korjattu).

## AVOIN (ENSIN): ALOITUSLOGO "LOGO HETI" (omistaja 11.20 PT:n kautta, kumoaa 6.10. mustan alun)
Tavoite: napautuksesta logo heti, sama logo samassa paikassa ja koossa pelin logoon asti, ei mustaa välähdystä, ei hyppäystä; iPhone + iPad,
tumma + vaalea. Video napautuksesta peliin KK:lle VASTA kun logo näkyy heti; kuvat täysikokoisina tarkistettuna. Sitten SHA NS:lle ja PT:lle.

Haara **natiivi-ui/aloituslogo-korjaus-202** (wt /Users/Shared/Claude/wt/proto-natiivi-ui-aloituslogo-korjaus-202), kärki **2b944e920**:
- fcde3ccb3 Unityn splash pois (97775f95b:n taantuma: 40 s mustaa) — NS yhdisti junaan 202 (dc682cda3).
- 50e3d066e LaunchScreen-logo (neliökuva Kartta/Aloitusruutu-logo-ios.png 720×720, #c9b48f); Aloitusverho iOS:llä logo alpha 1 heti.
- 46e8dd36d / bc68251d4 / cb4e07c3f: Rakennus.LogoLaunchScreen (PostProcessBuild 197, korvasi MustaLaunchScreenin) kirjoittaa OMAN
  LaunchScreen-Logo-iPhone/-iPad.storyboardin (musta + keskitetty logo ≤ 0,3 × lyhyt sivu) ja kuvan Images.xcassets/MatkakirjaAloitusLogo.
- **2b944e920** Plugins/iOS/MatkakirjaKaynnistysPeite.mm: +load → UIWindowDidBecomeVisibleNotification → käynnistysruudun kopio
  UnityView'n alinäkymäksi; Aloitusverho kutsuu MatkakirjaKaynnistysPeite_Poista() 2. kehyksessä (logoAlku) ja OnDisablessa; varakatto 60 s.
  NS tarkisti ok. EI VIELÄ SIMUSSA.

SYY (todistettu testiappeilla 13.19–13.29): pelin käynnistysruutu + Info.plist + Assets.car näyttävät logon testiappissa myös pelin
bundle-id:llä (C, D) → ei välimuisti. Unity tuo mustan ikkunansa näkyviin heti (createUI → makeKeyAndVisible ennen startUnityä) ja se
peittää käynnistysruudun ~9 s ennen 1. pelikehystä. Peite korjaa tämän.

SEURAAVA: JU kääntää 2b944e920 RELEASE L1:llä (~13.40–13.55) → _tyo/julkaisija/juna202-logo-release-app; JU antaa SIMU NYT (iPhone + iPad
~7 min). Ajossa:
1. Testiappit ensin (30 s): `zsh /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/kaynnistysruutu-testi/aja.zsh E F`
   (E = Unityn kaltainen ilman peitettä → pitäisi olla musta; F = peitteen kanssa → logo; ruudut tulos-E/F/ruudut, katso r009–r012).
2. `zsh /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/ajo-logo-heti-202.zsh <_tyo/julkaisija/juna202-logo-release-app> <_tyo/julkaisija/juna202-kuva1-app>`
   (iPhone vaalea/tumma + NYK, iPad vaalea/tumma; lokit proto-3d/lokit/logo-heti-*; ruudut 4/s, aika = (i−1)·0,25 − 2 s käynnistyksestä).
   Vaiheet: python-luokittelu (K peli m>60, L logo keskialueella max>100 ja m<20, M musta) — katso logon pitää näkyä jo ~0,25 s:ssa.
3. Jos logo heti: kuvat täysikokoisina (kolmikko.py kuvatekstit raidalle) + videot (video.mp4 kustakin) → KK (osoitekirja) + rivi PT:lle;
   SHA NS:lle (NS yhdistää simutodiste + KK + PT kuittaus). Jos ei: ajattele peitteen ajoitus (UIWindowDidBecomeVisible tulee
   makeKeyAndVisiblessa; vaihtoehto UnityAppController-alaluokka IMPL_APP_CONTROLLER_SUBCLASS + willStartWithViewController).
Mittauksia: Release-peli logo(verho) ~9 s → musta 0,5 s → peli 11,8–13,5 s; NYK (Development kuva1) peli 15–29 s (simu vaihtelee paljon).
Development-käännöksessä Unity jättää mustan hetken (startUnity viivästetty) → todisteet aina RELEASE (ei MATKAKIRJA_KEHITYS=1).

## Muut
- Louvren Pulu-chat 27f4c89df (natiivi-ui/museo-pulu-chat-202) VS:llä yhdistettäväksi/todistettavaksi; ei toimia NUI:lta ellei VS pyydä.
- Siivous: _tyo/natiivi-ui:ssa 2 .app (ratas-201, maakunta-201) = rajassa. Testiappit 4,8 Mt tyokalut/natiivi-ui-ajot/kaynnistysruutu-testi.
- Worktreet (proto): aloituslogo-korjaus-202 (avoin, yllä), museo-pulu-202 (VS), mergetyt: kehysnapit-opas-202, aloituslogo-202.

## Opit
- simctl recordVideo jäätyy joskus (09.39 NYK logoon 23 s, vaikka peli auki) → aja rinnalla kuvakaappaukset 0,5 s välein; kaappaukset
  eivät näytä logoa (aloitusverho), video näyttää. Kuvien luokittelu kirkkauden mukaan nopein tapa löytää vaiheet.
- Unityn splash (SplashScreen.show) pitää ensimmäisen kohtauksen käynnistymättä koko logon keston.
- Unityn suhteelliset LaunchScreen-storyboardit: iPhonen vaaka-ScaleView on asennettuna pystyssäkin (läpinäkyvä); taustan
  pakottaminen mustaksi peittää logon. iPad mitoittaa korkeuden mukaan. → oma storyboard (ibtool --compile tarkistaa ilman simua).
- Käynnistysruudun voi testata simussa minimiappilla (swiftc/clang + ibtool + actool + codesign -s -) ~30 s:ssa ilman Unity-käännöstä.
- kaanna-editori.sh Rakennus.cs: 14 ympäristövirhettä (Xcode-viittaukset) on pohjataso; vertaa HEAD:in kopioon.
