# Karttaseppä: luovutus 11.11.2026 klo 00.10 (KS)
Syy: konteksti 26 % (hook, pehmeä raja, Raamattu 7.37). Korvaa -20261110-2335:n (taustat: git show f484d183f:docs/raportit/viesti-karttaseppa-luovutus-20261110-2335.md).
HUOM kello: aja `date` ennen jokaista aikaleimaa. Tyyliohje (KK, sitova): /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261110-pariisin-nahtavyydet-tyyliohje.md
NÄKYVÄ TYÖ: karkea kuva KK:lle (local_d5f31591-21fa-4cb0-bab3-bcd3435d075a) suoraan, kopio PT:lle; junaan vasta KK:n katsottua. Ruudukko Tripo | koodi + kaukaa.
Worktree: /Users/Shared/Claude/wt/proto-karttaseppa-koodijuna (remote natiivi-backup), nyt haarassa karttaseppa/nahtavyydet-1-1 (puhdas).
Työkansio: /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/koodijuna/ (ajopyynto.md = JU:n jono, LISÄYKSET 23.59, 00.1x, 00.3x).
Testit: `sh Kartta-testit/kaanna.sh` (753) ja `sh Peli-testit/kaanna.sh` (911), `sh Peli-testit/unity-tarkistus.sh` (aina sh). Python numpy-skriptit ILMAN -I:tä.

## TEHTY tässä sessiossa (23.46–00.10)
1) MR39b KORJATTU: 440d3e8d6 (natiivi-backup karttaseppa/pantheon-juna-v5) = juna-224:n kärki 474826dd7 + merge Panthéon b8fed770e (ei konflikteja)
   + talot pariisi.json v5 + "pantheon:Panthéon" Koodimallit.Oletukseen (PUUTTUI 321324163:sta: KJ10 ajettiin komennolla → pelissä olisi ollut Tripo-Panthéon
   1:1-raivauksessa). Paketti _tyo/karttaseppa/koodijuna/talot-paketti-pariisi-v5 (v3→v5 5 palaa 3,2 Mt, SHA256SUMS ok). v4:n SISÄLTÖ OLI KUNNOSSA
   (palat-v25-pantheon-1-1 = kolme-1-1 + 5 Panthéonin palaa; RK/ND/Eiffel-raivaus mukana) – vika oli vain git-historia. Lähetetty JU:lle ja PT:lle.
   Lähin 2,7× rebasattu: ea9e6c633 (karttaseppa/lahin-2-7x-v5); NUI:lle lähetetty (tarkistuskuvat KK:lle NUI:n kautta; vastausta ei vielä).
   AVOIN: palat-ok 224.47:lle v5:stä, kun JU vie v5:n ämpäriin (tarjottu JU:lle; JU kirjoittaa itse tai pyytää).
2) OPÉRA JUNAEHDOKAS 15c8e4f93 (karttaseppa/opera-juna-v6 = 440d3e8d6 + Opéra f9daa9b32 (konflikti ratkaistu: vain OpKoodi) + "opera:Opéra" oletukseen
   + talot v6). Palat raivaus-1-1-opera/palat-v26-pantheon-opera-1-1 = v25-pantheon + Opéran 3 palaa (ei Invalideja). Paketti talot-paketti-pariisi-v6
   (v5→v6 3 palaa 2,1 Mt). Testit 753/911/unity 0. PT:lle lähetetty; numerointi ja Mac-oletustarkistus PT/JU.
3) ND-PUISTO 0aad16c3f (karttaseppa/nd-puisto-2 = 440d3e8d6 + d7d781e53 + 5f00b2ee6 + korjaus): puut 1:1 – koko = metrit / puuverkon korkeus
   (puu-1..4 = 80/51/68/86 m; ENNEN ~70 m = tornien korkuiset): iso 15–18, pieni 10,5–13, kukkiva 8,5–10 m. Parvis avoin: puut vain x > 770 ja
   (y > 785 tai x > 905 ja y > 715) eli kirkon etelä- ja itäpuoli (38 puuta). Eiffelin puut samaan mittakaavaan (koko × 0,35 / × 0,41).
   tee-puisto.py päivitetty. KJ17 JU:lla (7 kuvaa nd17-*, + E-varjon diagnoosi: nd17-e-talot | e-poisto0 | e-eitaloja).
   E-VARJO (parviksen länsiosa, nd12-lahi-lansi): EI OSM-talo (parviksella vain 3 m:n toimisto way/1204309380). Ehdokkaat: kartan rakennustason rengas
   (mvt z14, ks. scratchpadin parvis.py-malli: tee-poistot.py:n pura/latlon; talot poisto 1 poistaa vain TaloPoistot.cs:n renkaat), talojen KovaVarjo tai
   puiden varjo (puut olivat 70 m). KJ17:n kolme kuvaa ratkaisevat: häviää talot 0:lla → talojen varjo; poisto0:lla muuttuu → rengas.
4) INVALIDIT (karttaseppa/nahtavyydet-1-1): 56398fc69 seinät NahtavyysKivi.Kerro(0,96) (ei enää TaloKivi × 1,12), kupoli 24 → 27 m, lyhty 3,4, kultainen
   obeliski + risti 107 m:iin, Dômen eteläportikko OsaPylvasPaaty(..., suunta −1) (uusi valinnainen parametri; Panthéon ennallaan), etublokki −126.
   1c5ddb667 = + d7d781e53-infra (cherry-pick 1aadd9369) + maa: OSM-nurmet palana in-koodi-maa (X 602 Y 56 389 × 1073, 124 458 m², VIHREA 180,168,116,
   vain koodilla) – _tyo/karttaseppa/koodijuna/invalides-maa/ (hae-invalides.mjs IDF-otteesta, tee-maa.py, esikatselu.jpg).
   Talot: raivaus-1-1-invalides-2/palat-v27-invalides-1-1 = v26 (Panthéon + Opéra) + Invalidien 5 palaa; etukentän majat way/64954996, way/64955038
   maskiin (lisaa-majat.py), poistot 5 → 7. KJ18 (56398fc69) ja KJ19 (1c5ddb667, korvaa KJ18:n jos ei alkanut) JU:lla.
   AVOIN: "haalea varjolaikku kentällä" (in13-koodi-lahi-dome: kaksi sumeaa pystyvyöhykettä Dômen edessä) – katso KJ19:stä, peittävätkö nurmet.

## JU:N JONO (ajopyynto.md) → katso täysikokoisina, ruudukko Tripo | koodi KK:lle, kopio PT:lle
- KJ12–16 (vanhat, 23.35-luovutus): KJ13 Opéra katsottu (KK OK); KJ14 Louvre, KJ15 SC, KJ16 Sainte-Chapelle (4eed281af) katsomatta.
- KJ17 ND-puisto 0aad16c3f → lokit/karttaseppa-nd-puisto-kj17-0aad16c3f. Hyvä → KK:lle (pari nd12 | nd17), KK:n OK → PT:lle junaehdokas (nd-puisto-2 on
  440d3e8d6:n päällä, EI Opéraa → PT/JU yhdistää; puisto ei tarvitse talopakettia).
- KJ18/KJ19 Invalidit → lokit/karttaseppa-invalidit-kj19-1c5ddb667 (tai kj18-56398fc69). Pari in11-tripo | in19-koodi KK:lle; tarkista kupoli
  (in19-koodi-kupoli: lyhty, risti), portikko, seinien sävy vs Opéra, nurmet, majat poissa, laikku.

## AVOIMET
- Lähikuvaresepti (KK): lahizoomi 8, kallista 40, etäisyys 0,0025, etuviistosta (op13-koodi-lahi). Käytetty KJ17/18/19:ssä.
- NUI: lähin 2,7× tarkistuskuvat (ea9e6c633) – varmista NUI:lta, että ajo on JU:n jonossa (kysytty 23.5x, ei vastausta).
- NUI:n paisunta-haara natiivi-ui/nahtavyys-paisuu (kärki 714266606, kylttikorjaus 7b1605f21): KS katsoo ennen junaa, kuittaus NUI:lle (EI VIELÄ TEHTY).
- Panthéonin KK-huomiot (aukion kiveys/reunaviiva; pylväiden välit tummanruskea seinä + ovi) seuraavaan kierrokseen.
- Sacré-Cœur: mäki ratkaistava ennen raivausta (KK/PT). Louvre/SC/Sainte-Chapelle: katot samaan PnKatto 0x8E979D-sävyyn (KK 23.3x) – tarkista KJ14–16:sta.
- Palojen ketju nyt: kolme (v3) → pantheon (v5, juna) → pantheon-opera (v6) → invalides (v27-kansio; paketti tehdään vasta KK:n OK:lla, --edellinen = v6).
- Jono tyhjä KJ19:n jälkeen → KK:n palautteiden korjaukset, sitten "JONO TYHJÄ: Karttaseppä" PT:lle.

## Vahdit (uusi sessio virittää)
- Postilaatikko: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min).

## LISÄYS 00.1x
- NUI vastasi: lähimmän 2,7× tarkistusajo JU:n jonossa eiffel-valon jälkeen shalla ea9e6c633 (nui-lahin-2-7x-2-ea9e6c633; skenaario korjattu aja 0,0012). NUI-kohta SULJETTU; kuvat tulevat NUI:n kautta KK:lle.
- JU/PT 00.1x: talot v5 ämpärissä + palat-ok kirjoitettu (JU). pt-ok: 224.49 = 440d3e8d6 (MR42), 224.50 = Opéra 15c8e4f93 (paketti v6 → ämpäriin + palat-ok, JU).
  PT/KK: Louvren 3 committia saavat mennä (Louvre ei oletuksessa). Koodi-Louvre oletukseen vasta, kun KK on nähnyt parin Tripo | koodi 1:1 Opéran lähikuvareseptillä.
- KJ14 Louvre → lokit/karttaseppa-louvre-kj14-4eed281af (10/10) ja KJ15 SC → lokit/karttaseppa-sacre-coeur-kj15-4eed281af (7/7) VALMIIT, katsomatta.
  KJ19 korvasi KJ18:n; jonossa KJ16 → KJ17 → KJ19.

## LISÄYS 00.2x–01.1x (sama sessio, ei nollausta)
- JU 00.1x: 224.49 = 069be563b linkissä (MR42 Panthéon + talot v5), testit läpi. MR43 Opéra → 224.50 käynnissä; v6-paketin polku muistutettu JU:lle.
- JU: v6 ämpärissä 00.06 (virheitä 0), 224.50.palat-ok kirjoitettu. Pakettikohta SULJETTU.
- JU 00.2x: 224.50 = adccf01fa linkissä (MR43 Opéra + talot v6), testit läpi. MR43 SULJETTU.
- NUI 00.45: lahin-2-7x ei lähentynyt – striimikartalla piirros pois, lähin = ElavaLahinLeveys 0,625 (ea9e6c633 ei vaikuttanut). Korjaus 684895857 (karttaseppa/lahin-striimi, pohja ea9e6c633; testit 754/754, unity 0) NUI:lle uusintaan, odotus 640×480 lähin 0,524 km. Ei vielä junassa.
- PT 01.0x: lähin 0,231 (= KK:n pari, striimin 0,625/2,7) → c032134e7 (karttaseppa/lahin-striimi, korvaa 684895857; 754/754). NUI uusii, odotus lähin 0,620 km / leveys ~0,78 km. Junaan vasta NUI:n kuvien jälkeen.
- JU 00.53: KJ16 Sainte-Chapelle VALMIS → lokit/karttaseppa-sainte-chapelle-kj16-4eed281af (7/7), katsomatta. Jonossa KJ17 → KJ19.
- 01.2x: KJ14–16 katsottu, ruudukot Tripo | koodi → KK (kopio PT): _tyo/karttaseppa/koodijuna/parit-kj14-16-4eed281af/. Lähikuvat epäonnistuivat: SC tyhjä (kamera mäen sisällä), Sainte-Chapelle peittyy oikeuspalatsin taloihin (malli näkyy ~70 px tähtäyspisteen pohjoispuolella) → uusinta, kun tähtäys korjattu. Odottaa KK:n vastausta.
