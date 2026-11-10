# Karttaseppä: luovutus 10.11.2026 klo 20.42 (KS)
Syy: konteksti 25 % (hook, pehmeä raja, Raamattu 7.37). Korvaa -2018:n (lue sen "Muut tulokset" ja "LISÄYS 20.4x" tarvittaessa: git show 399b5f4a5:docs/raportit/viesti-karttaseppa-luovutus-20261110-2018.md).
HUOM kello: aja `date` ennen jokaista aikaleimaa. Tila myös: /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/koodijuna/tila.md.

## TEHTY: PT 20.5x "Pariisi koodimalleihin" -junahaara 599b0150d
- proto, haara karttaseppa/pariisi-koodimallit (natiivi-backup); worktree /Users/Shared/Claude/wt/proto-karttaseppa-koodijuna
  (worktree on nyt haaralla karttaseppa/louvre-koodi, ks. alla; junahaara = 599b0150d).
- = 0f0f950a6 (kestävä luonti + NUI 2592bf839 + kontrasti f4ddf1655) + 67a009aaf (191aaeaf2:n peruutus: korostus K 2, -k2-pohjat, talot v2)
  + b8971b839 (Tripo-mallit 224.35-koossa, MallitEnnallaan) + c1a15236d (koodimallit RK/ND/Eiffel, VS c1e811eed).
- Ristiriidat ratkaistu: Nahtavyysalue (PohjaNyt + PohjaPoisKoodilla, MallitEnnallaan, Vapauta: Aariviiva + pohjaAvaimet), Korostus (oletus 2),
  Komennot (yksi korostus-tapaus), testit.
- Uutta: Koodimallit.Oletus = riemukaari, notre-dame:Notre-Dame, eiffel (Sainte-Chapelle ja muut Tripona); komento "koodimallit oletus";
  "koodimallit kaikki 0" = Tripo-vertailu. ND:n korvaustaloja EI oletuksena (kuten k2b-ajossa, jonka PT/KK näkivät).
- Testit 747/747, unity-tarkistus (sh) 0 virhettä.
- PT:lle ilmoitettu 20.3x. JU:lle ajopyyntö 20.29: /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/koodijuna/ajopyynto.md
  KJ1 Mac oletustila (sk-mac-oletus-koodi.txt, 9 kuvaa, loki lokit/karttaseppa-koodijuna-mac-599b0150d) → KATSO PARI, rivi PT:lle.
  KJ2 iso iPad samalla käännöksellä + kaupunginvaihto-2 vasta KS:n kuittauksen jälkeen (korvaa 0f0f950a6:n iPad-ajon JU:n jonossa).

## TEHTY: Louvre koodina c735240ae (koe, ei junaan; KK:n lista)
- proto, haara karttaseppa/louvre-koodi (= 599b0150d + 1 commit, natiivi-backup). OhjelmaKohdePariisiLouvre.cs: OSM relation/3262297
  (osm.json natiiviseppa/pariisi-talot), Akseli 70,5 alueen keskipisteessä (+x ≈ pohjoinen, +z länsi); Cour Carrée + Horloge 46 m, Denon/Richelieu
  pihoineen, Grande Galerie, Flore, Marsan, vino Rivolin siipi, pyramidi 21,65 m + 3 pientä. Alle 40 000 kolmion yleisrajan (julkisivu kevennetty).
  Kytkin "koodimallit louvre:Louvre 1" (pohja louvre-pohja-talot3 pois koodilla). Testi LouvrenMitat; 748/748, unity 0.
- JU:lle 20.41 lisäys KJ3 Mac tripo|koodi (sk-mac-louvre.txt, 8 kuvaa, loki lokit/karttaseppa-louvre-koodi-c735240ae) → pari KK:lle täysikoossa.
- Huom: korostus K 2 koskee koodimalleja (OhjelmaKohteet.KorostusKoko): Louvren korkeus × 2, vaaka katolla +150 m. Omistajan 17.45 linja.
- Pohjan mittausskripti: _tyo/karttaseppa/koodijuna/tee-louvre-pohja.py (vaaka-/pystyleikkaukset, kuva).

## SEURAAVAKSI
1. KJ1-parin katsominen (JU:n kuittaus) → PT:lle 3 riviä; KJ2 iPad-pyyntö JU:lle. KJ3 Louvre-pari → KK.
2. Sacré-Cœur koodina (ALOITETTU vain selvitys): OSM way/23762981 (height 84), Tripo-alue "sacre-coeur" Lat 48.8862 Lon 2.3431 MaanpintaH 186
   + PohjanKorkeudet 9×9 (mäki). Pohja Akselilla 4,5 (x ≈ itä, z ≈ pohjoinen): x −26…24,4, z 18,5…114,6 (kirkko 67 m alueen keskipisteestä pohjoiseen);
   portikko z 19…27,5 (x −11…8), runko x −26…24 z 33…74, kuori säteiskappeleineen z 74…106, kampanile z 105…114,6 (x −9…6).
   AUKI: MaaH (kirkon maan korkeus): ohjelmakohteiden MaaH mitattu _tyo/linssiseppa2/ohjelmakohteet/maa/:sta (OhjelmaKohteet.cs rivi 138);
   pelkkä 186/2 = 93 ei huomioi PohjanKorkeuksia. Selvitä ennen geometriaa. Skripti scratchpadissa ei säily: tee uudelleen tee-louvre-pohja.py:n mallilla.
3. Sitten Panthéon, Invalides, Opéra, Sainte-Chapelle. Pariisi-pino 7 (kirkon poisto) raukesi suunnitelmassa (kirkko palaa taloksi koodilouvren viereen).

## Vahdit (uusi sessio virittää)
- Postilaatikko: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).

## LISÄYS 20.4x (PT: OMISTAJAN PÄÄTÖS 20.23)
- Kunnes iso iPad toimii, Pariisin koodimalliversio (599b0150d) saa linkkiin Mac-oletustilan parilla (KJ1) ILMAN iPad-ajoa; omistaja testaa itse.
- KJ1-parin mukana PT:lle yksi rivi omistajalle "kokeiltava: …" (mitä omistaja katsoo laitteella: RK, ND ja Eiffel koodimalleina oletustilassa,
  korostus K 2, talot ämpäristä; Tripo-vertailu komennolla koodimallit kaikki 0). KJ2 (iPad) ei ole linkin ehto.

## LISÄYS 20.5x: PT:n este "beige aukko Panthéonin ympärillä" (om1853-2 ac292ac12) = LATAUSAJOITUS, EI PAKETTI
- Paketti v2 (talot-paketti-pariisi-v2 = palat-v23-k2b) täydellinen: 219 palaa, 21 muuttunutta ei tyhjiä (Panthéonin 16597/11273–11274 kasvoivat).
- Ajossa -2: om-yleis rivillä 2595, "talot lataus: pariisi kokonaan levyllä, 219/219" vasta rivillä 2841; alussa "21 vanhaa palaa pois" =
  224.35- ja 224.36-ajot vuorottelevat samassa Mac-välimuistissa ja hakevat 21 palaa joka kerta uudelleen. Laitteella sama kerran ensihaussa
  ilman latausmerkkiä (omistajan 18.53?). PT:lle ja JU:lle kerrottu.
- KJ1b (sk-mac-oletus-koodi-2.txt: om-yleis + om-lahi + KJ1:n 9, odota 300) korvaa KJ1:n, jos KJ1:ssä 219/219 tuli kuvien jälkeen. Tarkista KJ1:n loki ensin.
- Mahdollinen jatko (PT päättää): talojen latausmerkki tai odotus ensihaussa (SaapumisOdotus koskee vain karttalaattoja).
