# Karttaseppä: luovutus 11.11.2026 klo 02.52 (KS)
Syy: konteksti 25 % (hook, pehmeä raja, Raamattu 7.37). Korvaa -0223:n; taustat ja työkalut: `git show f340e0fbb:docs/raportit/viesti-karttaseppa-luovutus-20261111-0223.md`
(ja sen ketju -0204, -0132, -0105, -0010: tyyliohje, worktree, testikomennot, Monitor-vahti).
HUOM kello: aja `date` ennen jokaista aikaleimaa. KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a, PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd.
Worktree /Users/Shared/Claude/wt/proto-karttaseppa-koodijuna, nyt haarassa karttaseppa/sacre-coeur-kj26 (puhdas, natiivi-backup).
Vahti: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min) – viritä uudelleen.

## Tehty 02.31–02.52
1) SACRÉ-CŒUR RAIVAUS 1:1: _tyo/karttaseppa/koodijuna/raivaus-1-1-sacre-coeur/ (tee-maskit.py = louvre-kansion kopio, pohjana raivaus-1-1-louvre/korvaus-11.json;
   `tee-maskit.py 4 sacre-coeur:way/23762981`): jalanjälki 3945 m², maski 5101 m², poistaa 3 taloa (ennen 169). Square Louise-Michelin sisällä vain OSM:n pienet
   (funikulaarin asemat way/29403454 ja 29403485, way/1108254353, way/1363126868) – todellisia, jätetty. aja-palat.sh (KSC 1) → ulos-sc26 (exit 0).
   palat-v30-sacre-coeur-1-1 = v29 + Montmartren 8 palaa (kokoa-v30.py; ulos-sc26:n 15_16594_11273 = Invalidien pala vanhalla maskilla, EI otettu).
2) PORTAAT JA TERASSI KOODINA 41e41430d (proto karttaseppa/sacre-coeur-kj26 = 8fdafec2e + 1 commit, natiivi-backup): Tripon erilliset portaat
   (Resources NotreDameKoe/sacre-coeur-portaat, 52 m leveä, alkoi 88 m keskipisteestä etelään) piiloon koodikirkon kanssa: Nahtavyysalue portaat-Malli
   KoodiAvain = "sacre-coeur:Sacré-Cœur". Koodiin ScTerassiJaPortaat: terassi z −30…19 x −30…27 (kaide), 14 m portaat z −30 → −155 (puiston alalaita lat 48.8848),
   askel 1,25 m mäen harjaa myöten (ScRinne luettu Tripon mäen verkosta lahi-r8/sacre-coeur-maki: mäen y − 75 = koodin y; mäen kehys = koodikehys 180° käännettynä).
   Testi SacreCoeurinMitat päivitetty (portaat harjalla, eivät nouse). Kartta 754/754, Peli 911/911, unity (sh) 0. EI junaan ennen KK:n katsomista.
3) KJ26 JU:lla (lähetetty 02.4x): sk-mac-sacre-coeur-kj26.txt → lokit/karttaseppa-sacre-coeur-kj26-41e41430d, 7 kuvaa: sc26-koodi-lahi-006/-009 (KJ24:n kulmat),
   -006-keski/-009-keski (tähtäys 48.8876 2.3416, ~200 m kameran suuntaan: arvaus, tarkista osuiko), -ylhaalta, sch26-koodi-lahi-0035/-004 (Sainte-Chapelle korkeammalta).
   KATSO ITSE täysikokoisina: portaat kiinni terassissa ja mäen pinnalla (ei kellu/uppoa), rinteen korttelit takaisin, puisto nurmena, Tripo-portaat poissa.
   Hyvä → KK:lle kuvat (006-pari sc24 | sc26) + kopio PT:lle. KK:n OK → junaehdokas: talopaketti v9 = palat-v30 (--edellinen talot-paketti-pariisi-v8),
   "sacre-coeur:Sacré-Cœur" Koodimallit.Oletukseen (+ testin oletusrivi: nyt odottaa Sacré-Cœuria Tripona) → PT:lle.
4) F-JALANJÄLKI SELVITETTY, rivi KK:lle 02.51 (kysytty: teenkö korjauksen?): Palais-Royal relation/3300400 eteläsiivet leikattu 3D:stä NS:n 6.11. säännöllä
   (_leikkaa palat-v22-lahi-syote/siisti.json, tee-palat-v10-valmistelu.py: väisti 2× Tripo-Louvrea, linja 48.86463 2.33161 → 48.86195 2.34262); kartan rengas jää
   litteäksi F:ksi. Todistus: scratchpad-skriptit (katoavat) – f-kattoruudut.py: OSM-renkaan sisällä ruudukko 3D-katto kyllä/ei palasta; eteläosa ilman 3D:tä.
   KORJAUS KK:n kyllällä: kopio siisti.json:sta ilman _leikkaa raivaus-1-1-sacre-coeur-kansioon, tee-talot-nd-k.py:hin SIISTI-ympäristömuuttuja
   (vaihda "P + '/palat-v22-lahi-syote/siisti.json'" kuten KORVAUS; merkkijono esiintyy kerran tee-talot-nd.py:ssä), ajo → vain Palais-Royalin palat (z15 x 16596
   y 11271–11272, tarkista md5-erolla) v30:n päälle = v31. Raivausta EI muuteta. Mac-kuva lv22-lahi-lansi -kulmasta (aja 48.8608 2.3368 0.0075, suunta 110) KK:lle.

## Jono
KJ26-kuvat → KK → (OK) junaehdokas · F-korjaus KK:n vastauksen mukaan · jono sen jälkeen tyhjä → "JONO TYHJÄ: Karttaseppä" PT:lle.
Hylätyt, ÄLÄ vie: talot-paketti-pariisi-invalidit-vain-hylatty, -invalidit-v8-hylatty. Ämpärin versionumeroa ei käytetä uudelleen (seuraava paketti v9).

## LISÄYS 02.58 (sama sessio)
- KJ26 ajettu (JU 02.53, 7/7; kansio latautui, unity.log r. 2649). Katsottu: portaat kiinni terassissa ja mäen pinnalla, Tripo-portaat poissa, OK.
  VIKA: terassi z −30…19 x −30…27 ulottui laen reunan yli ja leijui → b8aaa83fa (z −8…19, x −24…21; 754/754, unity 0). sc26-ylhaalta epäonnistui (kallista 80 = lähes vaaka).
  Rinteen korttelit ovat datassa, mutta Tripon mäki (75 m) peittää ne: mäen asia, KK: ei nyt.
- KK 02.5x KYLLÄ F-korjaukselle + "poista samat 6.11. väistöt muiden 1:1-nähtävyyksien ympäriltä ja luettele". Tehty: raivaus-1-1-sacre-coeur/siisti-v31.json
  = palat-v22-lahi-syote/siisti.json − _leikkaa (Palais-Royal relation/3300400) − _pois Panthéon way/56799487, way/56799509, way/98024961 ja Opéra way/69226799
  (6.11. v14 "irtotalot" Tripo-raivauksessa, tee-palat-v14/v15-*.zsh). ND, Sainte-Chapelle, Invalidit: ei väistöjä (Invalidien lähin _pois way/230227015 + 64959941 on
  Grand Palais'n kohdalla, jätetty). EIFFEL (1:1, ei KK:n listalla): 8 väistöä _pois-listalla (v11 "etujalan kortteli" way/69034120/126/149/153/173, v12 way/54108364,
  54108369, 54031857) – EI muutettu, kerro KK:lle ja kysy. tee-talot-nd-k.py: uusi SIISTI-ympäristömuuttuja. aja-palat-v31.sh → ulos-v31; kokoa-v31.py →
  palat-v31-vaistot-pois-1-1 = v30 + 3 palaa (16596_11272 Palais-Royal, 16596_11270, 16597_11274). Palais-Royal tarkistettu: koko relaatio 3D:nä.
- KJ27 JU:lle (b8aaa83fa, sk-mac-vaistot-kj27.txt, 2 kuvaa lv27-koodi-lahi-lansi + sc27-koodi-lahi-006-keski) → lokit/karttaseppa-vaistot-kj27-b8aaa83fa.
  Katso: F poissa (Palais-Royalin eteläsiivet), terassi laella. Sitten KK:lle: lv22 | lv27 -pari + sc27 + lista väistöistä (yllä) + Eiffel-kysymys; kopio PT:lle.
  KK:n OK → junaehdokas: b8aaa83fa:n Sacré-Cœur oletukseen + talopaketti v9 = palat-v31 (--edellinen v8).
- JU 02.57: 224.54 = 4b3ff1b63 linkissä (Sainte-Chapelle + talot v8, 8fdafec2e). Sacré-Cœurin junaehdokas tehdään juna-224:n kärjen päälle (merge b8aaa83fa), paketti v9 --edellinen v8.
- 03.07: KJ27 katsottu (kansio latautui r. 3269): F poissa, terassi laella OK. KK:lle ja PT:lle parit _tyo/karttaseppa/koodijuna/parit-kj26-27/ + Eiffel-kysymys (8 väistöä). Odotetaan KK:n OK → junaehdokas.

## LISÄYS 03.12 (sama sessio, nollaus tämän jälkeen)
- KK 03.1x: Sacré-Cœur + talot v9 JUNAAN; F ✓. JUNAEHDOKAS dbb2bc643 (natiivi-backup karttaseppa/sacre-coeur-juna-v9 = juna-224 4b3ff1b63 + merge b8aaa83fa
  + "sacre-coeur:Sacré-Cœur" Oletukseen + talot pariisi.json v9). Paketti talot-paketti-pariisi-v9 (v8→v9 11 palaa 8,6 Mt, SHA256SUMS ok). 754/911/unity 0.
  PT:lle ja JU:lle 03.11. Seuraava paketti = v10. Seuraa: PT:n pt-ok, JU:n ämpäri + MR-numero; kuittaa kun linkissä.
- KK: SEURAAVIIN PAREIHIN sama kulma ja rajaus molemmille puolille (sc24 | sc27 olivat eri kulmista).
- SEURAAVA TYÖ (KK 03.1x, erillinen pieni muutos, ei pidätä Sacré-Cœuria): EIFFELIN 8 VÄISTÖÄ takaisin = poista siisti-v31.json:n _pois-listalta
  way/69034120, 69034126, 69034149, 69034153, 69034173 (v11 "etujalan kortteli") ja way/54108364, 54108369, 54031857 (v12 lounaispuolen pikkutalot).
  EHTO: yksikään ei saa osua tornin jalkojen tai kaarien alle eikä Champ de Marsin nurmelle – ne jätetään pois ja luetellaan KK:lle (tarkista jalanjäljet
  eiffel-maski-11.png:tä ja Champ de Marsin OSM-nurmea vasten; way/54108364:n viereinen < 8 m² way/54108363 on tee-poistot.py:ssä). Tee siisti-v32.json →
  aja-palat-v31.sh-tyyliin (SIISTI=…) → kokoa v32 = v31 + vain muuttuneet palat (md5-ero ulos-v31:een). Yksi tarkistuskuva viistosti: torni + jalat + palautetut
  korttelit (sama kulma myös ennen-kuvaan nykyisillä paloilla v31 → pari samasta kulmasta), KK:lle ennen junaa. Junaan vasta KK:n OK:lla (paketti v10).
- JU 03.31: 224.56 = 16ae5cc48 LINKISSÄ (MR49, Sacré-Cœur + talot v9, dbb2bc643; v9 ämpärissä 03.12). Sacré-Cœur SULJETTU. SÄÄSTÖ (PT, viikko 98 %): lepo; Eiffel odottaa.
- 06.5x (PT 06.5x: tee Eiffel-pari): siisti-v32.json = v31 − Eiffelin 8 _pois; kaikki ≥ 128 m tornin jalanjäljestä ja ≥ 200 m Champ de Marsin akselista sivuun (Suffrenin takana) → ei yhtään jätetty pois. palat-v32-eiffel-1-1 = v31 + 15_16592_11273 (kaikki 8 3D:nä, tarkistettu). KJ28 JU:lla (sk-mac-eiffel-kj28.txt, ei28-ennen | ei28-jalkeen samasta kulmasta, dbb2bc643) → KK:lle pari + kopio PT:lle; OK → junaehdokas juna-224:n kärkeen, talot v10 (--edellinen v9).
