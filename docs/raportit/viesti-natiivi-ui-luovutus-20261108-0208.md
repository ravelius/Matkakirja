# Natiivi-UI: luovutus 8.11.2026 klo 02.08 (puut NativeArrayllä iPad-jonossa, valitsimen testikomento korjattu)

Korvaa luovutuksen -0053 (e18bddda2). Kohdat 1–2 ennallaan alla; kohta 3 päivitetty, kohta 4 uusi.
Vanhemmat: Muistin vaihe 1, kartan elämä, varjostinselvitys, kyltit, huudot, opit: ennallaan luovutuksessa -2208 (git show aab93be4f:docs/raportit/viesti-natiivi-ui-luovutus-20261107-2208.md).
PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, KS local_740947d7-aa79-4b1e-948e-1b7dfc734364, Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b. Viestit send_messagella id:llä, PT:lle enintään 3 riviä.
Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto, etäpää natiivi-backup. Työkopio /Users/Shared/Claude/wt/proto-natiivi-ui-lahto-vahvistus (puhdas, haaralla natiivi-ui/linssitnappi-napauta; kartan-puut 3971e6540 ja kohokartta-sulku pushattu). Kääntö sh Peli-testit/unity-tarkistus.sh, linssitestit sh Linssit-testit/kaanna.sh, pohjavahti python3 -I tyokalut/pohjavahti.py. Ajoja ei tehdä itse: vuoro JU:lta.

## 1. Pariisi kohta 8: VALMIS
2c12b920a ajettu (lokit/nui-nimet-reuna-1-2c12b920a) ja katsottu (_tyo/natiivi-ui/nimet-reuna-1-katsottu/, kohta8-auki-20261107.md lopussa). PT kuittasi 00.4x, JU liitti junaan 221 (0ac8cd436). Työlistan rivi päivitetty.

## 2. Kohokartta: ajettu ja katsottu, odottaa PT:n sanaa
- b276782bd ajettu (lokit/nui-kohokartta-kytkin-1-b276782bd, arkki _tyo/natiivi-ui/kohokartta-kytkin-1-arkki.jpg): kytkin ☰:n vasemmalla, kerroin 15 ↔ palautuu, suljettu ok. Kuvat PT:lle (PT vie KK:lle) 00.4x.
- Jatkohaara natiivi-ui/kohokartta-sulku (pohja b276782bd, pushattu), ajamatta, 2255/2255:
  - b7e283c23 (c) MissingReferenceException pelin sulkeutuessa (LinssiOhjain.OnDestroy → Topografia.Sulje → AjaKamera tuhottuun PalloKiertoon; ei linssistä palatessa): AjaKamera ja KokoPallonKorkeus tarkistavat kierron. (d) LinssienEsilataaja: topografia esilataa valitun ulkoasun sarjan ja vaihtaa kytkimen jälkeen.
  - e9045150d (b) Topografia.KohokartanSelite KS:n riveillä (v5) + NykyinenSelite. HUOM: natiivi ei piirrä linssin selitettä missään (vain data).
- (a) KS:n koko maailman sarja v5: file:///Users/Shared/Claude/proto-3d/_tyo/karttaseppa-kohokartta-laatat/v5/{z}/{x}/{y}.jpg (z0–8, 1,1 Gt). Ämpärin osoite JU:lta vasta PT:n kuittauksen jälkeen → silloin KohokarttaSarja-oletus koodiin. Meri vaihtuu v6:ssa, selite pysyy.
- Auki: (e) iPad-ajo suunnitelman kohdassa 7.

## 3. Puut Pariisin kartalle: muistikevennys JU:n jonossa (PT 8.11. 01.5x)
- puut3 (2f9479036) luettu: pois 11/11, lepo Pariisissa 3759 Mt (ajo 8: 3926). Päällä (vain puut, 21 187 / 261 519 piirretään) +105 Mt levossa, +150…186 kierrossa → VIKA 4080 kierto-1-kuvassa. Lisä ei GPU:ssa: Unityn gc varattu 416 → 497 Mt. Raportti /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/raportti-kartan-puut-3-ipad-20261108.md.
- PT: "Kyllä, NativeArray-lataus, bytes-kopio heti pois". Tehty 3971e6540 natiivi-ui/kartan-puut (pushattu natiivi-backup): GetData, sanat NativeArrayhin ja Dispose purun jälkeen, purku NativeArray<PuuGpu>:hin, puuLista NativeArray, PuuRuudukko.Pura(ulong) + Ruudut ilman uutta listaa ([ThreadStatic]), VapautaPuuData odottaa kesken olevan latauksen, OnDestroy. Linssitestit 2251/2251, unity-tarkistus 0.
- puut4 JU:lla (pid 21494 jonossa 02.0x): _tyo/natiivi-ui/sk-kartan-puut-4-ipad-pois|paalla.txt → lokit/nui-kartan-puut-4-ipad-pois|paalla-3971e6540. SEURAAVAKSI: vaiheet python3 -I -skriptillä kuten puut3 (fp-mediaani merkit.txt:n kellonajoista; U-rivin gc varattu, A-rivin anon/alueita), vertailu puut3:een, ≤ 3 riviä PT:lle. Tavoite PT: päällä vähintään 65 Mt kevyempi, koko reitti rajan alle. Jos ei riitä: seuraava vipu PuuMax / kauko tai Bois pois (KS). Ei junaan ilman korttia.

## 4. Valitsimen testikomento (PT 02.03, NS vaihe 1 n1)
Vika testikomennossa, ei pelissä: "ui linssitnappi napauta" lähetti ClickEventin, Kosketusnappi (Button/Clickable) laukeaa vain PointerUpista. Korjaus 3f264fc33 natiivi-ui/linssitnappi-napauta (pohja 6e7981306, natiivi-backup): kutsuu Karttaselite.AvaaLinssit (AvaaNakymaan synkroninen → auki True heti). PT:lle ja NS:lle (local_99130238-aa54-4a29-bcc9-7a023584944b) kerrottu 02.0x; NS poimii 10604363c:n päälle ja ajattaa. Junaan tarvittaessa PT:n kautta.

## Opit (uudet)
- Esikatselun `aja` Pariisissa: kaari alle noin 0,014 = lähin (1,68 km); 0,04 = 4,8 km.
- Kartan elämän koodi elää haarassa ebec14c89; uusi koe kannattaa yhdistää sen päälle uusimpaan junaan (merge meni puhtaasti 40 commitin yli).
- Itse lähetetty ClickEvent ei laukaise Buttonin clicked-tapahtumaa (Clickable kuuntelee osoitintapahtumia); testikomennoissa kutsu käsittelijää.
- Muistin syyt: U-rivin gc x/y (y = varattu) ja A-rivin anon/alueita erottavat hallitun keon kasvun GPU-muistista.
