# Karttaseppä: luovutus 11.11.2026 klo 07.50 (KS)
Syy: konteksti 27 % (hook, pehmeä raja, Raamattu 7.37). Korvaa -0252:n; taustat ja työkalut: `git show 443da8f26:docs/raportit/viesti-karttaseppa-luovutus-20261111-0252.md`
(ja sen ketju -0223, -0132, -0105, -0010: tyyliohje, worktree, testikomennot, Monitor-vahti).
HUOM kello: aja `date` ennen jokaista aikaleimaa. KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a, PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd.
Worktree /Users/Shared/Claude/wt/proto-karttaseppa-koodijuna, nyt haarassa karttaseppa/grand-palais-1-1 (= juna-224 c087371b5, puhdas, ei committeja vielä).
Vahti: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min) – viritä uudelleen.
Testit (proto-worktreessä): `sh Kartta-testit/kaanna.sh` (754), `sh Peli-testit/kaanna.sh` (912), `sh Peli-testit/unity-tarkistus.sh` (aina sh). Valmis skripti:
`sh <scratchpad>/testit.sh` katoaa – kirjoita uudelleen (kolme riviä + `cd` worktreehen).

## Tehty 06.56–07.50 (kaikki KK:n katsomat, junaehdokkaat PT:llä)
1) EIFFEL v10 (8 väistötaloa takaisin): KJ28 → KK OK → e92c3462a → JU: 224.58 = juna-224 c087371b5 (v10 ämpärissä 07.27).
2) EIFFEL v11 (KK 07.1x/07.5x: puutarhan siisteys): siisti-v33 (+19 koppia/kioskia alle 150 m², 200 m tornista, + TDF-keskus way/335260394
   kiinni olevine koppeineen) → siisti-v34 (+ matala laatta relation/1084162 376 m², Champ de Marsin reunan kioskit way/69034495, 106451232, 106451239).
   Kansio raivaus-1-1-sacre-coeur/: aja-palat-v33/v34.sh, kokoa-v33/v34.py → palat-v34-eiffel-laatta. KJ29/KJ31 parit (parit-kj29/, parit-kj31/).
   JUNAEHDOKAS f8076d690 (natiivi-backup karttaseppa/eiffel-juna-v11 = c087371b5 + talot v11). v11 ÄMPÄRISSÄ 07.40 (JU). Odottaa PT:n pt-ok:ta.
3) RIEMUKAARI (VS:n huomio KK:n kautta: ylhäältä vaalea "kansi"): RkKatto = Vari.H(0x8E8C86), kaide/attika vaaleat. KJ30 (parit-kj30/, kolme kulmaa)
   → KK 07.5x OK → JUNAEHDOKAS 3e64b03db (natiivi-backup karttaseppa/riemukaari-katto = 7b7e12bfd + 1 commit, vain .cs; ei talopakettia). Odottaa pt-ok:ta.
4) KK:n vastaus irtorakennuksista lähetetty; "JONO TYHJÄ" PT:lle 07.4x (ennen KK:n uutta työtä).
Seuraava talopaketti = v12 (--edellinen = v11-hakemisto; huom. jos f8076d690 ei vielä juna-224:ssä, ota pariisi.json haarasta karttaseppa/eiffel-juna-v11).

## UUSI TYÖ (KK 07.5x, kopio PT): Pariisin loput Tripo-ajan nähtävyydet 1:1-koodimalleiksi, yksi kerrallaan
1) GRAND PALAIS – lasikatto ja kupoli, julkisivun pylväikkö. 2) MUSÉE D'ORSAY – pitkä holvikatto, kaksi kellotornia joen puolella.
3) Sitten KK:lle YKSI lista jäljellä olevista ei-1:1-kohteista (nimi + nykyinen mittakaava). Nahtavyysalue.cs:ssä Tripona enää: grand-palais
   (TodPituus 240) ja montparnasse (K 2 -maski "korostus K 2 +150 m"). ORSAYLLÄ EI Tripo-aluetta: tarkista ensin mikä "tumma ylisuuri malli" on
   (OSM-palan talo? way-haku osm.json:sta 48.8600 2.3266 ympäriltä; PiirrosKerros.Tahdet "palais-dorsay" = kadonnut Palais d'Orsay -tähti, ei malli).
Jokaisesta: raivaus mallin omaan pohjaan, ympäristö takaisin, talot kansio -vaihto (talot 0 ensin); karkea pari (vanha | uusi, sama kulma ja rajaus)
+ lähikuva Opéran reseptillä + lähin pelikamera SUORAAN KK:lle ennen junaa. Sacré-Cœurin mäen korkeutta EI aloiteta ilman KK:n sanaa.

### Grand Palais – tähän asti
- OSM: way/56185523 "Grand Palais" (277 pistettä). Palais de la Découverte way/188108997 erillinen talo lännessä (jää OSM-taloksi).
- Pohjamittaus: _tyo/karttaseppa/koodijuna/tee-grand-palais-pohja.py (`python3 -I … [way] [kulma]`), origo Tripo-alueen keskipiste 48.86616 2.31223.
  Hallitseva kulma 85,5 → +x ≈ pohjoinen, +z ≈ länsi (−z = itä = pääjulkisivu, Av. Winston Churchill). Nave x −112…+113 (päädyt pyöristyvät x ±119),
  z −72,6…+18,7; etuportaikko x −28…+32 z −80; poikkisiipi (Palais d'Antin) x −51…+51.7 z 18,7…+81; pohjoisosa z:llä 70–81 vain x 6…51.
  Tripo: TodPituus 240, TodKorkeus 45, Suunta −0,9, X/Y 768/512, Pohja grand-palais-pohja-r6 (1 m/px).
- RAIVAUS: _tyo/karttaseppa/koodijuna/raivaus-1-1-grand-palais/ (tee-maskit.py, K2 = raivaus-1-1-sacre-coeur/korvaus-11.json):
  `tee-maskit.py 4 grand-palais:way/56185523` ajettu → grand-palais-maski-11.png, -tarkistus.jpg (KATSO), korvaus-11.json. K 2 poisti 3, 1:1 poistaa 2 (palaavia 1).
- SEURAAVAT: (a) aja-palat-v35.sh (kopio raivaus-1-1-sacre-coeur/aja-palat-v34.sh, KORVAUS = tämän kansion korvaus-11.json, SIISTI = ../raivaus-1-1-sacre-coeur/siisti-v34.json,
  cd tähän kansioon) → ulos-v35; kokoa-v35.py (P = palat-v34-eiffel-laatta, A = ulos-v34, O = ulos-v35 → palat-v35-grand-palais-1-1; md5-ero).
  (b) Koodi OhjelmaKohdePariisiGrandPalais.cs (malli: OhjelmaKohdePariisiOpera.cs + .meta (uusi guid), OhjelmaKohteet.cs Kohde-rivi Korvaa = "grand-palais",
  Nahtavyysalue: GpKoodi + PohjaPoisKoodilla kuten OpKoodi, testi GrandPalaisinMitat OhjelmaKohdeGeometriaTestit.cs:hen, Kartta-testit/kaanna.sh += tiedosto).
  Ehdotettu rakenne: kivirunko 20 m pylväikköineen (itäjulkisivu, pariloidut ionialaiset), lasinen tynnyriholvi navella (jousi 20 m, harja ~35 m,
  z ≈ −55…+5) ja poikkisiivellä, kupoli risteyksessä (~45 m + lipputanko), Récipon'n kvadrigat koillis- ja kaakkoiskulmissa;
  lasi vaalean vihertävänharmaa (rauta "réséda"), rivat tummemmat. Kivi TaloKivi × 1,12 kuten Opéra. MaaH 45.
  (c) Mac-ajot JU:lla: koe-käännös + `koodimallit grand-palais 1` + talot kansio palat-v35; pari Tripo | koodi samasta kulmasta → KK.
- KK:n OK jälkeen junaehdokas: "grand-palais" Koodimallit.Oletukseen + testin oletusrivi + talot v12 (--edellinen v11).

## Jono
Odottaa: f8076d690:n ja 3e64b03db:n pt-ok + linkkikuittaus (JU). Työ: Grand Palais (yllä) → Orsay → lista KK:lle.
Hylätyt, ÄLÄ vie: talot-paketti-pariisi-invalidit-vain-hylatty, -invalidit-v8-hylatty. Ämpärin versionumeroa ei käytetä uudelleen.
