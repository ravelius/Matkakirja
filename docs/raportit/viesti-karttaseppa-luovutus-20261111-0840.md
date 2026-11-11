# Karttaseppä: luovutus 11.11.2026 klo 08.40 (KS)
Syy: konteksti 25 % (hook, pehmeä raja, Raamattu 7.37). Korvaa -0750:n; taustat: `git show 2247b8ce9:docs/raportit/viesti-karttaseppa-luovutus-20261111-0750.md`
(ja sen ketju -0252 … -0010: tyyliohje, worktree, testikomennot, Monitor-vahti).
HUOM kello: aja `date` ennen jokaista aikaleimaa. KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a, PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, NUI local_4b84cd90-123f-46c5-bc07-75760ed4c80b.
Worktree /Users/Shared/Claude/wt/proto-karttaseppa-koodijuna, haara karttaseppa/grand-palais-1-1 = c087371b5 + 807817075 (puhdas, natiivi-backup).
Vahti: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min) – viritä uudelleen.
Testit (proto-worktreessä): `sh Kartta-testit/kaanna.sh` (755), `sh Peli-testit/kaanna.sh` (912), `sh Peli-testit/unity-tarkistus.sh` (aina sh).
Karkea oma esikatselu OBJ:sta (ei pelin valoa; painterin järjestys sotkee holvit): `OHJELMAKOHTEET_VIENTI=<kansio> sh Kartta-testit/kaanna.sh` → <kansio>/<nimi>.obj;
piirto matplotlibilla (python3 ilman -I:tä, numpy vain käyttäjän site-packagesissa) – skripti katosi scratchpadin mukana, kirjoita tarvittaessa uudelleen.

## Tehty 08.23–08.40
- JU 08.31: 224.61 = f2f38180a LINKISSÄ (Eiffel + talot v11 f8076d690). Riemukaaren katto 3e64b03db → 224.62 seuraavana (JU). Seuraava talopaketti = v12 --edellinen v11.
- GRAND PALAIS 1:1 KOODINA 807817075 (proto karttaseppa/grand-palais-1-1, natiivi-backup): OhjelmaKohdePariisiGrandPalais.cs (+ .meta), OhjelmaKohteet Kohde Korvaa = "grand-palais",
  Nahtavyysalue GpKoodi + PohjaPoisKoodilla, testi GrandPalaisinMitat, kaanna.sh. 9008 kolmiota; x ±120,8, z −82,4…81,8, huippu 54 (lipputanko), kupoli 45.
  Rakenne: OSM-kehä (GpKeha, myötäpäivään) 20 m kivi + sinkkikatto, Palais d'Antin 21 m; itäjulkisivun pylväikkö (pariloidut, 2 × 9), pääportiikki x −28…32 z −80 kolmella kaarella,
  kulmapaviljongit x ±92…106 + kvadrigat (pronssi); naven lasiholvi x −78…78, z −55…5 (jousi 20, harja 35) + apsidit puolikupoleina, rivat 9,75 m; poikkisiipi z −25…45 (harja 33);
  kupoli r 22 (rumpu 30–37,4, huippu 45) + lyhty + trikolori 51–53,6 m. Värit: kivi TaloKivi × 1,12, lasi 0xA9B9B2, rivat 0x5C7266.
- RAIVAUS: raivaus-1-1-grand-palais/aja-palat-v35.sh + kokoa-v35.py → palat-v35-grand-palais-1-1 (= v34 + 1 pala 15_16594_11271; Tripo-alueella 2 taloa pois, 1 palaa).
- KJ32 JU:lla 08.3x: sk-mac-grand-palais-kj32.txt → lokit/karttaseppa-grand-palais-kj32-807817075 (10 kuvaa: gp32-tripo-ita/yleis/kaukaa/lahi | gp32-koodi-samat + lahin-pelikamera(-lansi)).
  SEURAAVAKSI: katso kuvat; karkea pari (tripo | koodi, sama kulma ja rajaus) + lähikuva + lähin pelikamera SUORAAN KK:lle, kopio PT:lle. Korjaa KK:n huomiot.
  KK OK → junaehdokas juna-224:n kärjen (nyt sis. f8076d690) päälle: "grand-palais" Koodimallit.Oletukseen + KoodimallienAvaimet-testin oletusrivi + talot v12 (--edellinen v11; palat v36, ks. alla).
- SAINTE-CHAPELLEN PAPERISEINÄT (KK NUI:n kautta 08.3x; kuva _tyo/natiivi-ui/seinapalat/sainte-chapelle-seinapalat-rajaus.png, ajo lokit/nui-napautus-lento-2-50565c427 a1):
  SYY: tee-talot-nd.py:n ks_paloittele leikkasi Palais de Justicen (relation/536982) SC:n suorakaiteella; leikatut sisäpihat (mm. SC:n piha 3622 m²) jäivät REIKINÄ
  osan reunaan → leikkausviivalle kaksi päällekkäistä vastakkaista seinää (paperiseinä pihan aukossa). KORJAUS: koodimallit/tee-talot-nd.py uusi lovita(): suunnatut särmät,
  vastakkaiset kumoutuvat, piha lovena (varmuuskopio tee-talot-nd-ennen-lovi.py). Ala säilyy (osat 5212,7 / 15705,8 / 3764,2 / 2197,1 m² ennen = jälkeen).
  palat-v36-sc-lovi (kokoa-v36.py) = v35 + 15_16597_11273; Palais de Justice nyt 6 osaa. KJ33 JU:lla (KJ32:n jälkeen): sk-mac-sc-lovi-kj33.txt → lokit/karttaseppa-sc-lovi-kj33-807817075
  (6 kuvaa sc33-ennen-lounas/koillinen/yla | sc33-jalkeen-*). Katso → pari KK:lle (kopio PT, NUI tiedoksi). OK → mukaan talot v12:een (v36 sisältää myös GP:n v35:n).
  Huom: a1-kuvassa itse kappeli puuttuu (Sainte-Chapelle-kyltti tyhjällä) – napautuskierros piilottaa nostot? NUI:n asia, mainitse KK:lle jos näkyy myös omassa parissa.

## Jono
1) KJ32 ja KJ33 kuvat → KK. 2) MUSÉE D'ORSAY: EI Tripo-mallia; nykyään OSM-talo way/63178753 (building train_station, height 35, levels 5, 13 605 m²) = "tumma ylisuuri malli".
   Pohja: _tyo/karttaseppa/koodijuna/tee-orsay-pohja.py (origo 48.86000 2.32661; keskipiste 48.86012 2.32683), kulma 65,5: +x ≈ pohjoinen/Seine, +z ≈ länsi;
   x −47,5…30,2, z −89…84 (+ länsipään uloke z 84…99 x −35,6…0,9). Tee: talo pois (siisti-json _pois + way/63178753 → palat v37) ja koodimalli
   (pitkä holvikatto z-suunnassa, lasinauha harjalla, kaksi kellopaviljonkia Seinen puolella z ≈ −89 ja +84, päätyjen suuret kaari-ikkunat). Kohde ilman Tripoa: Korvaa = "orsay"?
   Tarkista OhjelmaKohteet/Koodimallit: toimiiko Korvaa ilman Tripo-aluetta (muuten aina päällä -kohde kuten Palais Bourbon, NimiEste).
3) Lista KK:lle ei-1:1-kohteista (nimi + mittakaava); Tripona vielä montparnasse (K 2). Sacré-Cœurin mäkeä EI ilman KK:n sanaa.
Hylätyt, ÄLÄ vie: talot-paketti-pariisi-invalidit-vain-hylatty, -invalidit-v8-hylatty. Ämpärin versionumeroa ei käytetä uudelleen.
