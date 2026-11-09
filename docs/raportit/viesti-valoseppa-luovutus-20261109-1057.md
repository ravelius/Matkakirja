# Valosepän luovutus 9.11.2026 klo 10.57. Itsenäinen: vanhoja ei tarvitse lukea (korvaa 20261108-0855:n)

Syy: konteksti 25 % (pehmeä raja). Tili sami.reivinen@vvi.fi (vaihtui 9.11. 09.5x). Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup`. Omat worktreet: k31 = `/Users/Shared/Claude/wt/proto-linssiseppa2-k31` (haara `linssiseppa2/vesikerros`, puhdas, pushattu), k32 = `/Users/Shared/Claude/wt/proto-linssiseppa2-k32` (haara `linssiseppa2/kohokartta-rae`, puhdas, pushattu). Kuvat vain JU:n vuorolla Macilla (Raamattu 12.26: iPadille vain muisti, nopeus, kosketus, junan tarkistus). Id:t tämän tilin sessioista (osoitekirja on vanhan tilin): PT `local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31` ≤ 3 riviä; JU `local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd`; NS `local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870`; NUI `local_4b84cd90-123f-46c5-bc07-75760ed4c80b`; KK `local_d5f31591-21fa-4cb0-bab3-bcd3435d075a` (roolit eivät viesti KK:lle, kuvat PT:n kautta).

## TEHTY 9.11.
- Merenpohja 97b4f29a9 ja kohokartan ketju 20045ae66 ovat junassa 223 (kärki 4e972eeed). 8.11. posti (viestirajan takia lähettämättä) välitetty PT:lle 10.0x.
- KOHOKARTTA, OMISTAJA 10.54 "Kelpaa": ilma **b2f1407d6** (sinertävä ilma beigen tilalle), valo **2f675d74b** (aurinko kiinteästi luoteessa 315°/35°, ei ristivarjoja kierrossa), rae **90711141e** (Valopohja.KohokarttaRae: kyydin Medium4 0,2, vaste 0,5, ei käyrää/valotusta; kartan kameralla EI ollut jälkikäsittelyä → rae kytkee sen ja nollaa oletusprofiilin käyrän, hehkun ja vinjetin; värien ka-ero ≤ 0,3/255; A/B `valo rae 0|1`, tila `valo tila`). JU poimii 3 committia junaan 223 (merge-tree puhdas). Seuraa, että ne tulevat junaan; muuta ei tarvita.
- Omistajan parit (9.10-raidat): `/Users/Shared/Claude/proto-3d/lokit/linssiseppa2-kohokartta-omistajalle/`; tekotapa scratchpad omistajapari.py (PIL, Arial, otsikkoraita + versioraita). Idästä (s270) Alpit tummat kiinteän luodeauringon takia: kerrottu PT:lle, ei vika.

## ENSIN: VESIKERROS SELVEMMÄKSI (OMISTAJAN PÄÄTÖS 8.11. 08.24)
- Päätös: kimallukset ja hohde kuten kuumailmapallossa, erottuu myös 45°:sta; kerrosmalli säilyy; uusi pari (koko keskusta 45°, Pont Neuf lähi, kauko) KK:lle PT:n kautta ennen junaa. Kauko-beige ratkaistu (Macin 640×480-tasot), mainitse parin yhteydessä.
- Toteutus `Kartta/Resources/StriimiVesiKerros.shader` (k31). 92f93a82f (Mac 10.04): Pont Neufilla yhä tiheää kohinaa ja vaakasuoria vaaleita raitoja (aaltojen kallistama keila; aallon mittakaava vf:stä, 45°:ssa pystyyn puristunut).
- **edc2820a3**: hohde sileästä normaalista n (aallot vain kimallusten tiheyteen), tod 0,0006 + 0,010·sp⁴⁰, rantasolujen kimallus step 0,993 (oli 0,975). JU:n ajo sk-vesikerros2.txt → `lokit/linssiseppa2-vesikerros2-edc2820a3` JONOSSA (ketju BC, alkoi kohoraen jälkeen ~10.50; JU lähettää rivin VS:n sessioon — seuraaja: tarkista kansio, ja jos puuttuu, kysy JU:lta).
- Tee: Shader-error 0; pn-on1/pn-on2 vs pn-pois 2× rajauksina (Pont Neuf 1150,800,1450,1000; koko 1150,780,1750,1180), kk (joki kuvan alaosassa, y ≈ 1350–1500), ka. Jos raidat poissa ja kimallukset harvat: omistajaparit 9.10-raidoilla (pois vas | on oik, kohde kokonaan + rajaus) PT:lle → KK, sitten junaversio (yksi commit junan kärjen päälle) vasta kuittauksen jälkeen. Jos kimallukset liian harvat 45°:sta: nosta sp-keilan kerrointa (0,010 → 0,02), ei uutta tekniikkaa.

## SITTEN: AURINKO JA ANAMORFINEN HEIJASTUS KOHOKARTAN TAIVAALLE (PT 11.1x, OMISTAJA 9.11. 10.56; koe, EI JUNAAN)
- Omistajan sanat ja suunnitelma (osa 1 on VS:n): `/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261109-topo-aurinko-ja-avaruus.md`. Lue se kokonaan.
- Tee: aurinko + vain anamorfinen heijastus (ydin, hehku, vaakajuova; EI säteitä eikä haamuja, omistaja 16.10. 12.01) uudelleenkäyttäen NousuFlare.cs + KyydinFlare-varjostinta, kohokartan taivaalle valon suuntaan (luode 315°), maaston takana piilossa (syvyys/peitto). Pohja 90711141e (k32, haara linssiseppa2/kohokartta-rae). Valo/volyymit Valopohjan kautta (valovahti).
- HUOM: valon korkeus 35° (2f675d74b). Kohokartan kuvissa 55°:ssa horisontti on kuvan yläneljänneksellä, joten 35°:n aurinko jää todennäköisesti kuvan yläpuolelle myös vaakatasossa. Mittaa ensin kameran pystykenttä; jos ei näy, tuo PT:lle YKSI suositus kuvan kanssa (suunnitelma sallii), ei numerovaihtoehtoja.
- Parit PT:lle: kohokartta vaakatasossa luoteeseen (aurinko näkyy) | kaakkoon (ei aurinkoa), iPhone pysty + iPad-koko, Macilla (12.26), 9.10-raidat.

## MUUT AVOIMET
- Filmirae (a) PT:n päätöksellä tehty; kartan filmi 50436a1c4 pysyy erillisenä kokeena.
- Merenpohjan syvyyden puristus 97b4f29a9:n #if-haaraan, kun KS:n koko maailma on poltettu ja parit 1–5 kuvataan (PT 8.11.). Todennus KS:n koelaatoilla (Puerto Rico, Mariaanit), kun JU on vienyt ne ja NUI:n Topografia osoittaa niihin.
- KS:lle avoin kysymys 8.11.: onko kohokartan poltettu varjostus luoteesta 315°? (Kuvissa näyttää yhtenevältä.)

## TEKNIIKKA
Numpy, cv2 `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I`; PIL `/opt/homebrew/bin/python3 -I`. `sh`, ei zsh. Tarkistus `sh Linssit-testit/unity-tarkistus.sh` worktreessä (varjostimet kääntyvät vasta ajossa). Muokkaukset python-skriptillä (.tmp + os.replace + copymode) tai Edit. Valo, sävy ja volyymit vain Valopohjan kautta (tyokalut/valovahti.py; KartanElama.cs ja KaupunkiPuu.shader ylittävät lähtötason jo ennestään, eivät VS:n). Kuvat 2752×2064. Skenaariot `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/pallon-osat/` (uusi sk-kohokartta-rae.txt). Luovutus plumbingilla edellisen luovutushaaran päälle.

## LISÄYS 11.0x: VESI edc2820a3 AJETTU (JU 10.57, Shader-error 0), EI KORJANNUT
- 2× rajaus Pont Neuf (92f93a82f | edc2820a3): `/Users/Shared/Claude/proto-3d/lokit/linssiseppa2-vesikerros2-edc2820a3/vrt-92f93a82f-vs-edc2820a3-pn-2x.png`. Vaakaraidat ja tiheät pisteet lähes ennallaan, vaikka hohde on nyt sileästä normaalista ja tod ~10× pienempi → lähde EI ole hohde eikä keilan tod.
- Epäillyt: (a) silmukan kimallus (kc-solut S·2, step 0,993) tai kaiverrusviivat `viiva` (rannan suuntaiset, joki tässä vaakasuora → vaakaraidat), (b) ElavaKerroksen kaappaus/kerroinsekoitus. Tee ensin diagnoosiajo: väliaikainen komento tai globaali, joka nollaa yhden termin kerrallaan (viiva, kimallus, valke, hohde) samasta kulmasta → yksi Mac-ajo, sitten korjaus. Ei arvailua useilla ajoilla.
