# Karttaseppä: luovutus 11.11.2026 klo 09.26 (KS)
Syy: konteksti (kuvat + pitkä erä), uusi iso työ (pallo) alkaa puhtaalta pöydältä. Korvaa -0906:n; taustat: `git show b8d70a057:docs/raportit/viesti-karttaseppa-luovutus-20261111-0906.md`
(ja sen ketju: tyyliohje, testikomennot, KARKEA ESIKATSELU zpiirra.py, raivausputki, Monitor-vahti).
HUOM kello: aja `date` ennen jokaista aikaleimaa. KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a, PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, NUI local_4b84cd90-123f-46c5-bc07-75760ed4c80b, Postivahti local_1f31f830-9df5-41c1-8992-172e100af57f.
Worktree /Users/Shared/Claude/wt/proto-karttaseppa-koodijuna, haara karttaseppa/grand-palais-1-1 = c087371b5 + GP 807817075 + Orsay 6fbb10774 + GP-kierros f4205a4c4 + MONTPARNASSE 8348e4eac; puhdas, pushattu natiivi-backupiin.
HUOM: worktreen upstream on natiivi-backup/julkaisija/juna-224 – ÄLÄ `git push` ilman refspeciä; aina `git push natiivi-backup HEAD:refs/heads/<haara>`.
Vahti: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min) – viritä uudelleen.
Testit (proto-worktreessä): `sh Kartta-testit/kaanna.sh` (grand-palais-1-1: 757), `sh Peli-testit/kaanna.sh` (912), `sh Peli-testit/unity-tarkistus.sh` (aina sh).

## Tehty 09.06–09.26
- KJ35 (GP-kierros) katsottu → parit KK:lle 09.18 (_tyo/karttaseppa/kj35-grand-palais/). KK 09.2x: OK → JUNAAN.
- GP JUNAEHDOKAS 77e2a7d72 (natiivi-backup karttaseppa/gp-juna = juna-224 kärki 494595623 + cherry-pick 301d7fab9/2fbba2c15 + "grand-palais" Oletukseen
  + KoodimallienAvaimet-rivi + talot pariisi v12). Talot v12 = palat-v36-sc-lovi (GP-raivaus + SC-lovi; v11→v12 2 palaa 1,1 Mt), paketti
  _tyo/karttaseppa/koodijuna/talot-paketti-pariisi-v12 (tyokalut/talot_paketti.py pariisi <palat> 12 <ulos> --edellinen <v11>/julisteet/talot/pariisi/v11/hakemisto.json --buildiin <repo>).
  Testit 755/912/unity 0. JU 09.24: v12 ämpärissä, 77e2a7d72 → MR56 → 224.63, ODOTTAA PT:n pt-ok:ta. Seuraa linkkiin asti. SEURAAVA PAKETTI = v13.
- "Palais de l'Industrie" -★ puuttui: isäntä = Tripo-mallin kyltti (NostotKartalla.TahtienIsannat "malli" "Grand Palais"); koodimallilla ei kylttiä → ★-teksti
  omalle paikalleen mallin päälle → piiloon. KK 09.2x: NUI:n työ (kaikille koodimalleille ilman mallikylttiä). NUI kirjasi luovutukseensa 953229438. Ei sinun.
- TOUR MONTPARNASSE 8348e4eac: OhjelmaKohdePariisiMontparnasse.cs (+meta), Kohde Korvaa "montparnasse", origo = Tripo-alueen 48.84211 2.32197, akseli 47, MaaH 45.
  OSM way/16406633 (height 210, flat): pohja 63 × 39 m (ala 2096 m² ≈ 120 000 m² / 59 kerrosta, eli OSM oikein; Structurae "leveys 32 m" = päätyjen kohdalla),
  kupera suunnikas kaarevin pitkin sivuin, lasirunko 203 m + kerrosvyöt 3,5 m, päätyjen raot, katto + lasikaide 205,5 + tekniikka 208/210. Nahtavyysalue:
  montparnasse PohjaPoisKoodilla + PuutPoisKoodilla = "montparnasse" (Tripo-ajan väistöpuut pois koodilla). Testi MontparnassenMitat.
  Pohja: _tyo/karttaseppa/koodijuna/tee-montparnasse-pohja.py [way] [kulma]. Esikatselu montparnasse-vienti/mp-esikatselu.png.
- Talot v38 = v37 (Orsay-talo pois) + Montparnassen 1:1-raivaus: raivaus-1-1-montparnasse/ (tee-maskit.py pohjana GP:n korvaus-11.json, korvaus-11.json,
  aja-palat-v38.sh, kokoa-v38.py) → palat-v38-montparnasse (v37 + 1 pala 15_16595_11275, 3 taloa takaisin; maski K 2 42 857 m² → 1:1 3 207 m²).
- KJ36 JU:lla (pyydetty 09.2x): sk-mac-montparnasse-kj36.txt → lokit/karttaseppa-montparnasse-kj36-8348e4eac, 11 kuvaa mp36-tripo-* | mp36-koodi-*
  (suunta 313 = kaakon pitkä julkisivu, 223 = itäpääty, kallista 65 = matala). JU ajaa KJ34:n (Orsay) ensin.
- OVERTURE (PT:n lupa 09.2x: ODbL sallittu, vain mittaukseen, ei peliin/ämpäriin; lisenssi + lähde raportin alkuun): _tyo/karttaseppa/overture/
  venv (duckdb 2.0.0), hae-pariisi.py (release 2026-10-21.0, anonyymi S3-secret, ala EPSG:2154) → pariisi-buildings.parquet (47 Mt):
  224 675 rakennusta, height 18 062, num_floors 77 887, roof_shape 6 873; sarake lahde = sources[1].dataset. Mittaus (osuudet lähteittäin vs. talokoneen OSM) TEKEMÄTTÄ.

## Jono (järjestys)
1) KJ34 Orsay → katso → pari KK:lle (kopio PT; kamerat 205 = Seine, 115 = länsipääty). OK → junaan: "orsay" Oletukseen + talot v13 = palat-v37-orsay (--edellinen v12).
   HUOM juna-ehdokas tehdään juna-224:n kärjen päälle cherry-pickillä (6fbb10774), kuten GP (ks. 77e2a7d72).
2) KJ36 Montparnasse → katso → pari (mp36-tripo-kaakko | mp36-koodi-kaakko) + lahi-pari + lähin pelikamera SUORAAN KK:lle, kopio PT.
   OK → junaan: cherry-pick 8348e4eac + "montparnasse" Oletukseen + talot (Orsay hyväksytty → v38-pohjalta; muuten tee v38 uudelleen v36:n päälle).
3) KIINNITETTY KUUMAILMAPALLO (PT 09.2x, omistaja 09.23: "kuumailmapallo ei pysy paikallaan kun karttaa liikuttaa … kiinteä paikka … raivata pieni alue …
   kori … maassa kiinni köydellä"). Paikka päätetty: Tuileries (Raamattu 2.216). SINULLE: pallo KOODIMALLINA + raivaus. Työlistan rivi "Kiinnitetty kuumailmapallo: raivattu kenttä, kori, köysi".
   - Ankkuri nyt UI-pallossa: KaupunkiPallot.cs PallonMaapiste "pariisi" (48.8646, 2.3268) (Tuileries'n pohjoisosa). Pallon PAIKAN vika (UI-kuva liikkuu kartan mukana)
     on NUI:lla (2233e740c); NUI nollautuu → sovi seuraajan kanssa: sama ankkuri, ja piilottaako UI-pallo itsensä, kun 3D-pallo on (napautus ennallaan?).
   - Tavoite: pyöreä hiekkakenttä 40–50 m (puut ja istutukset pois, ei taloja lähellä), keskellä ankkuri; pallo leijuu matalalla, alla punottu kori, köysi suoraan
     ankkuriin (+2–3 ohutta sivuköyttä, jos lukeutuvat); keinuu hyvin vähän; ankkuri ja varjo maassa. Lukeutuu lähimmästä pelikamerasta ja yleisnäkymästä,
     kyltti ennallaan, koko uskottava Louvreen nähden. Yksi yhteinen pallo+kori+köysi, kaupunkikohtainen raivaus (Pariisi ensin, myöhemmin Lontoo).
   - Luonnos: Kohde Korvaa "kuumailmapallo" (kytkin), Lat/Lon = ankkuri, MaaH 45 (Louvren alue MaanpintaH 90). Kenttälevy r 23 m hiekan värinen y 0,15 (peittää nurmen),
     tummempi varjoellipsi, ankkurilohko, köysi 0,25 m ankkurista korin pohjaan (~22 m), kori 3 × 1,8 × 3 m (paju 0x9C7A4A, nahkareuna 0x5A3A22), 4 ripustusköyttä,
     kupu Pyora-lohkoina (12 lohkoa, punainen/kerma vuorotellen, alku/vali-parametrit), profiili suu r 2,5 y 28 → max r 10 y 40 → huippu y 50.
     Värit kannattaa sovittaa olemassa olevaan malliin: Resources/KaupunkiPallo/ilmapallo_keski.bytes (LR:n ilmapallo-v1, glb; _valmiit/ilmapallo-v1/).
     Keinunta: koodimalli on staattinen verkko – selvitä, tarvitaanko oma transform (kysy PT, jos vaatii uutta mekanismia).
   - SELVITTÄMÄTTÄ: mistä Tuileries'n puut/istutukset pelissä tulevat (ei Karttaesineet; ei Nahtavyysalue.Puut ankkurin kohdalla?; ehkä piirros-/striimilaatat tai
     LouvrenPuut-taulukko, Nahtavyysalue.cs rivi ~105). Raivaus sen mukaan (laatat versioituna uuteen kansioon + TasoVersio, ks. muisti "Piirroslaatat versioituina").
   - Esitys suoraan KK:lle (kopio PT): ennen | jälkeen samasta kulmasta + lähin pelikamera + yleisnäkymä; junaan vasta KK:n katsottua.
4) Overture-mittaus (yksi kaupunki: height / num_floors / roof_shape -osuudet lähteittäin vs. talokoneen OSM), raportti docs/raportit/ tai posti.
5) KK 09.2x: Petit Palais on Grand Palais'n vieressä tavallinen ruskea talomassa → ylisuurten/puuttuvien listan perään (Montparnassen jälkeen), ei nyt.
Hylätyt, ÄLÄ vie: talot-paketti-pariisi-invalidit-vain-hylatty, -invalidit-v8-hylatty. Ämpärin versionumeroa ei käytetä uudelleen.

## LISÄYS 09.3x
- NUI: ★-isäntä tehty af1f62bd4 (natiivi-ui/napautus-lento, natiivi-backup; NostotKartalla.TahdenIsanta): mallikyltin puuttuessa isäntä = kartan nimi "Grand Palais".
  Testaa seuraavassa KJ-ajossa, jossa GP-koodi päällä (cherry-pick af1f62bd4 koehaaraan; KJ35-kuvissa nimi "Grand Palais" näkyi mallin alla, joten pitäisi toimia).
  Jos ★ "Palais de l'Industrie" ei silti näy → kerro NUI:lle (tekee isännäksi koodimallin rajat). Ei estä junaa.
- JU 09.3x: 224.63 = 79b04e870 LINKISSÄ (Grand Palais + talot v12 77e2a7d72). GP valmis; seuraava paketti v13.
