# Natiivi-UI: luovutus 11.11.2026 klo 09.51 (kontekstivahti 25 %; korvaa -0910:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KS local_7b57e35a-3a8e-4943-aba1-c960b9eb4671,
NS local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a.
TYÖTAPA: näkyvän työn tallenteet suoraan KK:lle, PT kopiona; junaan vasta KK:n katsottua. Tallenteesta ei leikata tunnettua vikaa.
Taustatiedot (A–D-työt, testikomennot, push-ohje): edellinen luovutus viesti-natiivi-ui-luovutus-20261111-0910.md (haara natiivi-ui/luovutus-20261111-0910).

## 1. ENSIMMÄINEN: OMISTAJAN PALLOVIKA 09.23 (PT ja PV: ensimmäiseksi)
"kuumailmapallo ei pysy paikallaan kun karttaa liikuttaa". Työlista: "Kuumailmapallo liikkuu, kun karttaa liikutetaan".
- SYY (lähetetty KK:lle ja PT:lle 09.5x): kaupunkipallon MaaM oli 0 → ankkuri korkeuskertoimella 2 ~156 m Pariisin pinnan alla;
  irtoaa eniten kierrossa ja kallistuksessa, vähemmän zoomissa ja vierityksessä. Sama vika korjattiin 14.10. karttaesineille.
- KORJAUS bd7f0ea44 = oma haara natiivi-ui/pallo-maa (natiivi-backup) = juna-224 79b04e870 + 1; worktree /Users/Shared/Claude/wt/proto-nui-pallo.
  (Sama muutos myös natiivi-ui/napautus-lento-haarassa d5c003d92.) KaupunkiPallot.PallonMaapiste (lat, lon, MaaM): Pariisi 48.8646 2.3268
  MaaTuileriesM 78 (uusi KaupunkiPalloMitat-vakio), Lontoo MaaLontooM 51. Muut kaupungit yhä 0 (ei korkeusdataa; mainitse KK:lle, jos kysyy).
  Vertailukomento `ui kaupunkipallot maa 0|1` (0 = 224.56:n vika). Unity 0 virhettä, testit 755/912.
- AJO JU:lla (pyydetty ENSIN): nui-pallo-maa-1, skenaario _tyo/natiivi-ui/sk-pallo-maa-1.txt → lokit/nui-pallo-maa-1-bd7f0ea44.
  Kaksi 15 s:n tallennetta: e-ennen.mp4 (maa 0) ja j-jalkeen.mp4 (maa 1): veto, nipistys sisään/ulos, kierra 90, kallista 60/35.
  KATSO: j:ssä köyden pää pysyy samassa puutarhan kohdassa; e:ssä irtoaa. Sitten j-jalkeen.mp4 (+ e vertailuksi) KK:lle, kopio PT,
  ja PT:lle 3 riviä. KK OK → bd7f0ea44 junaan (JU, haara natiivi-ui/pallo-maa; ei riipu A–E:stä).
- KS:lle lähetetty ankkuri (kiinnitetty pallo: kenttä, kori, köysi): sama piste ja MaaTuileriesM; jos KS haluaa toisen pisteen, siirrä
  PallonMaapiste siihen. Odota KS:n vastausta.

## 2. Napautus-esitys (haara natiivi-ui/napautus-lento, worktree /Users/Shared/Claude/wt/proto-nui-paisuu, uusin 6449cd2e3)
Commitit 0910:n jälkeen: af1f62bd4 ★-isäntä (alla), 569de90bb työ E, d5c003d92 pallo (kopio), 6449cd2e3 Eiffel-huippu.
- katse-1 (237e44e6f) KK katsonut 09.4x: ISO PARANNUS (SC ylhäältä viistosti, keskellä, kokonaan; ei ristiä; ei hyppypiikkiä). Ennen junaa:
  1) SC:n vaaleat vinot levyt 12–25 s: KK hyväksyy vasta, kun katse-2 ajettu talot pariisi v12:lla (KJ33). Jos levyt yhä näkyvät → syy paisutuksessa → NUI.
  2) Eiffelin huippu yläpalkkiin lähimmässä: KORJATTU 6449cd2e3 (NahtavyysEsittely.Lahin: max(h × 0,7, NahtavyysRajaus.EtaisyysPysty palkin
     alareuna + 12 pt … symmetrisesti); Pinnaus.PalkinAla; testi LahinPystyHuippuPalkinAlle; Kartta 756/756, Peli 912, Linssit 2289, unity 0).
  3) Sulun 1,8 s liuku (5ce4232cd): KK katsoo katse-2:sta.
  Näiden jälkeen A+B junaan KK:n sanalla.
- katse-2 JU:lla pallo-maa-1:n jälkeen: sha 6449cd2e3, sk-napautus-katse-2.txt (= katse-1 + `ui kaupunkinapit` a1/a5/b1:n jälkeen), TALOT PARIISI v12
  → lokit/nui-napautus-katse-2-6449cd2e3. JU:lle meni useita korjausviestejä (af1f62bd4 → 569de90bb → 6449cd2e3): tarkista, mikä sha ajettiin.
  Katso: SC ilman levyjä, Eiffelin huippu palkin alla b2:ssa, sulku a5/b5 ilman piikkiä (video 22–30 s), Lehti palkin vasemmalla a1/b1, pillerin vasemmalla a5.
- matkaopas-1 (237e44e6f) valmis 09.29: lokit/nui-matkaopas-1-237e44e6f (4 kuvaa) – EI VIELÄ KATSOTTU eikä lähetetty KK:lle. Katso m2 (sisallys-ala vieritys).
- Lähtöviive mitattu katse-1:stä: palkki ilmestyy ja kamera liikkuu 1–2 kuvan sisällä (SC 101→102, Eiffel 73→74 @50 fps); 0,8 vs 0,2 s oli testikomennon
  saapumisaika, ei lennon vika. Ei korjattavaa (voi mainita KK:lle).
- Työ E 569de90bb (koe, omistaja 08.19): Lehti-nappi ylärivillä pillerin / kiinnitetyn palkin vasemmalla, palkki ja kuva eivät siirry, pitkä otsikko
  lyhenee (Pinnaus.Asettele vasen += Karttaselite.LehtiRivinLeveys). `ui kaupunkinapit vasen 0|1`. Kuva KK:lle katse-2:sta.
- ★-isäntä af1f62bd4 (KS:n pyyntö): "malli"-isäntä → kartan samanniminen nimi, kun mallikylttiä ei näy (GP-koodimalli ilman kylttiä).
  KS testaa omassa ajossaan (cherry-pick); jos kartalla ei ole "Grand Palais" -nimeä, isännäksi koodimallin rajat (KS kertoo).

## SEURAAVA
1) pallo-maa-1 tulokset → KK. 2) matkaopas-1 kuvat → KK. 3) katse-2 → KK. 4) KK:n palaute. Sitten saapumisen intro (NS johtaa, NUI auttaa:
Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261111-saapuminen-kaupunkiin.md). Myöhemmin iso iPad 0f0f950a6 / KS 599b0150d JU:n vuorolla.

## LISÄYS 09.5x (ennen nollausta)
- KS kuittasi ankkurin (sama piste kentälle, korille, köydelle). Pyynnöstä ee1c731cd (natiivi-ui/pallo-maa, bd7f0ea44:n päällä): julkiset vakiot
  KaupunkiPalloMitat.TuileriesLat/TuileriesLon, PallonMaapiste viittaa niihin; ei toiminnan muutosta → pallo-maa-1:n bd7f0ea44-ajo pätee, junaan ee1c731cd.
- KS ehdotti: UI-pallo piiloon niillä zoomeilla, joilla KS:n 3D-pallo näkyy, napautus ennallaan. NUI vastasi: sopii periaatteessa, KK päättää kuvasta;
  KS lähettää näkyvyysrajan, kun malli valmis → tee kytkimellä (`ui kaupunkipallot …`) ja kuva KK:lle. TEKEMÄTTÄ.
- katse-2: JU:n mukaan 569de90bb ei sisältänyt talot v12:ta → merge juna-224 79b04e870 napautus-lentoon = 2c75bcf22 (Kartta 757, Peli 912, unity 0).
  JU ajaa katse-2:n sha 2c75bcf22 pallo-maa-1:n jälkeen → lokit/nui-napautus-katse-2-2c75bcf22. (af1f62bd4-ajo peruttu.)
