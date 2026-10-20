# Codexin 3D-toimitus: tilauksesta peliin

*(Lavastaja, entinen Linnanrakentaja, 19.10.2026, PT:n tilaus; korjattu läpikäyntikuntoon 20.10.2026. Omistaja 19.10. klo 08.28:
"Pidetään codex kuitenkin kaiken grafiikan työstäjänä … Tee jatkossa kaikki tripo mallit pyytämällä ne codexilta." Codex tekee
uudet 3D-mallit; Lavastaja vastaanottaa, tarkistaa, viimeistelee ja kokoaa ne kohtauksiksi. Muoto on koottu juoksupelin hahmo- ja
maailmatoimitusten (18.–19.10.) ja omien mallien vientiportin opeista. Pohja ei tee uusia sääntöjä: jokainen linja on Raamatussa,
ja jos tämä ja Raamattu ovat ristiriidassa, Raamattu voittaa. Pohjan muutokset hyväksyy PT.)*

**Tavoitteen muoto (Raamattu 4.21, omistaja 19.10.2026 klo 15.32):** ennen työtä tavoite määritellään yhtä selvästi kuin grafiikassa havainnekuvalla. Tässä putkessa: GRAFIIKKA havainnekuva tilauksen liitteenä (luku 1); vastaanotossa havainnekuva ja pelikuva täysikokoisina rinnakkain (9.11 kohta 4, luku 8). Omistajalle tuodaan vain uudet asiat ja makuvalinnat; muut tavoitteet hyväksyy PT.

**Napit, tyylit ja toimintalogiikka (omistaja 20.10.2026 klo 22.58; Raamattu 2.70 ja kohta 2 UI-POHJAT):** pohja ei kuvaa omia nappeja, värejä eikä sisään- ja ulostuloa. Käytä tyylikirjaa (`tools/tyylikirja.mjs`, `tyylikirja/`) ja yhteisiä linssien ja pelien sääntöjä (2.70, 2.201). Käytä ensin yhteistä osaa; uusi osa tehdään yhteiseksi kaikille (omistaja 23.25), ja puuttuva pohja kysytään PT:ltä.

**Koko työ ideasta junaan (omistaja 20.10.2026 klo 22.53, Raamattu 4.21):** pohja kattaa työn ideasta junaan. Työ alkaa tavoitekuvasta
(havainnekuva), ja ennen junaa omistaja näkee KK:n kautta tavoitekuvan ja pelikuvan rinnakkain. Omistajalle viedään vain uudet asiat
(uusi aihe, uusi hahmo tai kohde) ja makuvalinnat (tyyli); muut hyväksyy PT omistajan puolesta (4.21; 7.15 PT HYVÄKSYY CODEXIN KUVAT).
Omistajalle näytetään vain pelistä otettu kuva, ei Blender- tai mallikuvaa (7.32). Junan lukitus ja TestFlight tehdään vain
omistajan pyynnöstä (10.2 JULKAISUPYYNTÖ); tämä putki vie mallin vain avoimeen junaan.

**Portti:** `node tools/codex-3d-tarkistus.mjs <toimituskansio>` — paluuarvo 0 = vastaanotettu, 1 = hylätty (VIRHE-rivit
kertovat syyn). HUOM-rivit ovat tiedoksi eivätkä hylkää. Codex voi ajaa saman komennon itse ennen toimitusta.
Kaikki alla oleva, jonka perässä on **[portti]**, tarkistetaan koneellisesti; muut kohdat tarkistaa vastaanottaja.

## Linjat, jotka koskevat koko putkea

- **Codex tekee, Claude kokoaa (7.15, 7.19, 11.7):** kaikki kuvat ja 3D-assetit tulevat Codexilta yhdellä toimitusmuodolla (tämä
  pohja). Clauden roolit eivät aja Tripoa itse. Claude tekee kaiken pelissä ajettavan ja tarkistaa toimitukset täysikokoisina ennen peliä.
- **Uudet mallit vain Tripolla (7.15 ja 11.7 VAIN TRIPO, omistaja 20.10.2026 klo 19.25):** kaikki pelin uudet 3D-mallit (hahmot,
  eläimet, esineet, koristeet, kalusteet) tehdään Tripolla Codexin kautta, ei koodilla eikä käsin rakennettuina.
- **Vanhaa mallia ei vaihdeta ilman omistajaa (7.15 ja 11.7, omistaja 20.10.2026 klo 19.28):** pelissä jo olevia malleja ei
  etsitä, kartoiteta eikä korvata Tripo-malleilla. Poikkeus vain omistajan päätöksellä KK:n kautta (7.15).
- **Generointi vain luvalla:** luku 2.
- **Ei uusia ostoja (11.5, 12.24):** Tripo Max on omistajan jo maksama tilaus (voimassa noin 18.11.2026 asti, käyttö selaimella Macin
  Chromessa). Tilauksen käyttö ei ole ostamista, mutta mitään uutta ei osteta: ei API-krediittejä, ei lisäkrediittejä eikä muita
  palveluita, eikä ostoehdotuksia tuoda ennen kuin omistaja itse avaa asian (11.5 TOISTAISEKSI EI OSTOJA). Tripon krediittien
  loppumisesta kerrotaan KK:lle hyvissä ajoin (7.15, 11.7).
- **Videot pelistä, yöllä (4.21 ESIRENDERÖITY VIDEO, 7.32):** pelin kohtausvideot kuvataan pelin omasta Unity-kohtauksesta (Claude).
  Blender-mallivideot ovat roolien sisäisiä työvälineitä eivätkä mene omistajalle. Pitkät renderöinnit ja videot ajetaan öisin.
  Esirenderöidyt kohtausvideot tehdään omalla pohjallaan `esirenderoity-video.md`.

## Putki yhdellä silmäyksellä

1. **Tilaus** (luku 1): tilaaja kirjoittaa tilauksen postiin havainnekuvan kanssa.
2. **Lupa** (luku 2): Tripo-mallien määrälle omistajan lupa kortilla KK:n kautta ennen generointia.
3. **Codex tekee** referenssikuvat ja Tripo-mallit, viimeistelee Blenderissä ja ajaa portin itse (luvut 3–6).
4. **Toimitus** (luku 7): kansio, manifesti ja LAHTEET.md, viesti postiin.
5. **Vastaanotto** (luku 8): portti, täysikokoinen tarkistus, havainnekuva ja pelikuva rinnakkain, PT hyväksyy tai vie omistajalle.
6. **Pelikytkentä ja juna** (luku 9): Lavastaja kokoaa mallin kohtaukseen samassa tai seuraavassa junassa.

## 1. Tilaus

Tilaaja on se rooli, jonka työhön malli tulee (yleensä Lavastaja; pelin rakentaja, jos malli menee tämän peliin). Tilaus kirjoitetaan
postiin `posti/<rooli>-codex-<aihe>-<pvm>.md` (7.18 KÄÄNTEINEN VAHTI: ellei Codex kuittaa 60 minuutissa, Postivahti ilmoittaa KK:lle).
Tilauksessa on:

- **Havainnekuva** liitteenä (tavoitteen muoto). Jos havainnekuvaa ei vielä ole, Codex tekee sen ensin pysyvällä kuvaluvalla (luku 2).
- **Mitä tehdään:** mallit nimineen, tyyppi (hahmo, esine, maailman osa), todellinen koko metreinä ja mobiilirajat (luku 6).
- **Pelin tarpeet:** hahmon animaatioiden nimet (esim. juoksupeli: `run`, `jump`, `slide`, `stumble`), esineen pivot, jos se poikkeaa
  oletuksesta, ja maailman osien yhteinen origo.
- **Kytkijä ja kohtaus:** kuka kytkee mallin peliin ja mihin kohtaukseen (luku 9).
- **Luvan tila:** omistajan kortin aika ja hyväksytty määrä (luku 2). Ilman lupaa Tripo-malleja ei generoida.
- **Referenssikuvien vaatimukset:** hahmoista kuvat edestä, sivulta ja takaa; kädet irti vartalosta, tasainen valo, harmaa tausta;
  ei oikeiden ihmisten valokuvia (loki "PAATOKSET 18.10.2026 klo 09.04" ja "klo 11.34").
- **Kielletyt referenssit:** Googlen laattoja sisältäviä pelikuvia ei anneta Codexille pohjaksi eikä referenssiksi (Googlen ehdot);
  referenssi tehdään omasta aineistosta (OSM-vesimaski, oma renderi), ja omien 3D-näkymien kuvat käyvät.
- **Suojatut teokset:** ei tekijänoikeudella suojattuja teoksia (tekijän kuolemasta alle 70 vuotta, Espanjassa 80); kohde jätetään
  pois ja mainitaan kuittauksessa (luku 11).

## 2. Generointilupa

- **Codexin kuvat pysyvällä luvalla (7.15, omistaja 19.10.2026 klo 08.42):** Codex tekee havainnekuvat ja Tripon pohjakuvat tarpeen
  mukaan ilman määräkorttia, laatu ensin.
- **Tripo-mallit vain omistajan luvalla (7.15, 11.6, 12.24):** generoinnin määrä on omistajan päätös (5.2 MÄÄRÄN PÄÄTTÄÄ OMISTAJA).
  Tilaaja lähettää KK:lle kortin aineiston: montako mallia ja montako ottoa, mihin ne tulevat ja havainnekuva. KK kysyy omistajalta
  kortilla. PT ei anna lupaa itse eikä tulkitse idean hyväksyntää määrän luvaksi.
- **Ottomäärä sitoo, uusinta on uusi kortti (OTTOMÄÄRÄ SITOO, PT 20.10.2026 omistajan linjana, 5.2):** luvassa hyväksytty määrä on
  yläraja. Uusinta on uusi otto ja vaatii uuden kortin KK:n kautta, vaikka krediittejä jäisi. Rooli tai Codex ei hyväksy uusintaa
  itse, vaan tilaaja lähettää KK:lle kortin aineiston (malli, syy, uusintojen määrä).

## 3. Tiedosto

| Asia | Vaatimus |
|---|---|
| Muoto | **GLB (glTF 2.0, binääri)**, kaikki upotettuna: puskurit ja tekstuurit glb:n sisällä, ei ulkoisia tiedostoja **[portti]** |
| Ei kelpaa | FBX, OBJ, BLEND, erillinen .gltf + .bin, DAE, USDZ **[portti]**; Draco- tai meshopt-pakkaus (pura ennen vientiä) **[portti]** |
| Nimi | pienet kirjaimet `a–z`, numerot, `-` ja `_`, enintään 48 merkkiä + `.glb`; ei välilyöntejä, ääkkösiä eikä versionumeroa nimessä (versio on kansiossa) **[portti]** |
| Koko | yksi glb enintään 15 Mt **[portti]** |
| Vienti Blenderistä | glTF 2.0 -vienti, +Y ylös (oletus), "Apply Modifiers", vain näkyvä kohde; ennen vientiä Ctrl+A → All Transforms |

## 4. Mittakaava, akselit ja pivot

- **Yksikkö metri.** 1 yksikkö = 1 m todellisessa koossa. Esineen pisin sivu 0,01–1000 m **[portti]** (cm/mm-vienti jää kiinni).
- **Akselit glTF:n mukaan:** +Y ylös, hahmon kasvot kohti **+Z**, oikea käsi kohti −X. Blenderin oletusvienti (+Y ylös) tekee tämän,
  kun hahmo katsoo Blenderissä −Y-suuntaan (eteen).
- **Hahmon pivot jalkojen välissä lattiatasossa:** alin piste y = 0 ± 3 cm, pohjan keskikohta enintään 20 cm origosta **[portti]**.
  Korkeus 0,5–2,5 m **[portti]**. Lepoasento T- tai A-asento.
- **Esineen pivot** pohjan keskellä lattiatasossa (y = 0), ellei tilaus sano muuta. **Maailman osat** (rata, salit) maailman
  koordinaateissa yhteisellä origolla, kuten juoksupelin maailma v4: kaikki saman toimituksen osat asettuvat paikoilleen ilman siirtoa.
- **Skaala sovellettuna:** juurisolmun skaala 1. Soveltamaton skaala (esim. `MatkakirjaScaleRoot` 1,37) on HUOM **[portti]**: malli
  toimii, mutta pelin skaalaus kertautuu.

## 5. Hahmot (luuranko ja animaatiot)

- **Yksi luuranko**, enintään 150 luuta **[portti]**, Mixamo-nimet etuliitteellä `mixamorig:`. Pakolliset luut **[portti]**:
  `Hips, Spine, Spine1, Spine2, Neck, Head` ja kummallekin puolelle (`Left…`/`Right…`) `Shoulder, Arm, ForeArm, Hand, UpLeg, Leg, Foot, ToeBase`.
  Sormet, `HeadTop_End` ja lisäluut (viitta `cape_*`, kaapu `robe_*`, letti `braid_*`) ovat sallittuja.
- **Animaatiot samassa glb:ssä**, nimet pienillä `a–z`, `0–9`, `_` (ei `Armature|Run`) **[portti]**. Pakollinen `idle` **[portti]**;
  pelin tarvitsemat nimet tilauksessa (luku 1). Silmukat alkavat ja päättyvät samaan asentoon.
- Neljä luuvaikutusta pistettä kohden (Unityn oletus), painot normalisoitu.

## 6. Mobiilirajat

| Raja | Hahmo | Esine tai maailman osa |
|---|---|---|
| Kolmiot | ≤ 40 000 **[portti]** | ≤ 100 000 tiedostossa **[portti]** |
| Primitiivit (≈ piirtokutsut) | ≤ 300 **[portti]**, tavoite 1–3 | ≤ 300 **[portti]**: yhdistä saman materiaalin kappaleet yhdeksi meshiksi |
| Materiaalit | ≤ 32 **[portti]**, tavoite 1 | ≤ 32 **[portti]** |
| Tekstuurit | PNG tai JPEG, sivu kahden potenssi, ≤ 2048 px **[portti]**, enintään 8 kuvaa tiedostossa **[portti]** | sama |

Tekstuurit: väri sRGB, normaali- ja ORM-kartat lineaarisina; hahmolle yksi 1024–2048 px:n atlas riittää. ASTC-pakkaus tehdään
vastaanotossa (älä toimita KTX2:ta).

## 7. Toimituskansio ja manifesti

```
<aihe>-v<N>/                  esim. juoksupeli-hahmot-v2/
  SHA256SUMS                  sha256sum-muoto: "<64 heksaa>  <suhteellinen polku>"   (tai MANIFEST.json, ks. alla)
  LAHTEET.md                  tekijä, työkalu (Tripo-tili, Blender), lisenssi, lähdekuvat ja niiden oikeudet
  <osa>/<nimi>.glb            suhteelliset polut kuten ämpärissä
  esikatselu/<nimi>.png       valinnainen: edestä, sivulta ja 3/4-kulmasta
```

- **Manifesti (yksi sääntö, kuten portti `tools/codex-3d-tarkistus.mjs` sen tarkistaa):** kansiossa on oltava manifesti, joka on
  joko juuren `SHA256SUMS` tai `SHA256SUMS.txt` (suositus) tai Codexin `MANIFEST.json` muodossa `{"files": [{"path", "sha256"}]}`
  (polut oman kansion suhteen; sisäkkäiset MANIFEST.json-tiedostot sallittuja). Jos glb-toimituksesta puuttuu manifesti, se hylätään
  **[portti]**. Jokaisen glb:n ja kuvan on oltava listassa ja tiivisteen täsmättävä; muuten tiedosto hylätään **[portti]**.
- **Lähteet:** `LAHTEET.md` tai Codexin `SOURCE-INVENTORY.json`, `SOURCE-MANIFEST.json` tai `CREDITS.md`; jos kaikki puuttuvat, se
  on HUOM **[portti]**, ja vastaanottaja tarkistaa tekijän, työkalun, lisenssin ja lähdekuvat käsin (luku 11).
- Erilliset kuvat (havainne- ja referenssikuvat, tekstuurit; Työkaluseppä 19.10.): PNG tai JPEG, listassa ja tiiviste täsmää
  (paitsi `esikatselu/` ja `qa/`) **[portti]**; `tekstuurit/`-kansion kuvat kahden potenssi ja ≤ 2048 px **[portti]**. Pelkät kuvat
  sisältävä toimitus kelpaa ilman manifestia, mutta silloin tiivisteitä ei tarkisteta (HUOM). Tilaajan lähettämä viitekuva, jonka
  tiiviste on `GENERATION.json`-tiedoston `referenceSHA256`-kentässä, on viite eikä toimitettava (HUOM).
- Toimitus postilaatikkoon (`posti/codex-<vastaanottaja>-<aihe>-<pvm>.md`: polku tai zip ja zipin SHA-256), kuten tähänkin asti.
- Uusi versio = uusi kansio (`-v3`); vanhaa ei ylikirjoiteta.

## 8. Vastaanotto (Lavastaja)

1. **Portti:** `node tools/codex-3d-tarkistus.mjs <kansio>` → 0. Hylätystä yksi viesti PT:lle (VIRHE-rivit), PT välittää Codexille.
2. **Täysikokoinen tarkistus** (opit 17.–18.10.2026): kuva avataan täysikokoisena, ei pienestä esikatselusta ("Katso itse", pyramidi
   17.10. klo 20.21). Tarkistetaan suunta (+Z eteen), animaatioiden silmukat, materiaalit Unityssä ja hahmon koko pelissä muihin
   verrattuna. Varjosta tarkistetaan kontakti, eli ei vaaleaa rakoa esineen ja varjon välissä (pyramidi leijui, 17.10. klo 23.46).
   Hahmosta katsotaan edestä, sivulta ja takaa kasvot (silmät, nenä, profiili), kädet ja saumat jokaisesta kulmasta erikseen
   (Tripo-hahmon hiukset peittivät silmät sivukuvassa, PT ohitti, 18.10. klo 11.41). Lähde: loki "PAATOKSET 18.10.2026 klo 11.34";
   muisti pt-kuvan-tarkistus-taysikokoisena.
3. **Liikevideo ennen peliä (omistaja 18.10. klo 11.34):** hahmon liike katsotaan videona ennen kuin hahmo kytketään peliin. Video
   kuvataan Unityssä pelin kohtauksesta (Lavastaja), ei Blenderistä (4.21, 7.32). Pitkät renderöinnit ja videot ajetaan öisin.
4. **Havainnekuva ja pelikuva rinnakkain** täysikokoisina ennen hyväksyntää (9.11 kohta 4, omistaja 19.10.2026 klo 15.21).
   Pelikuva otetaan pelistä tai Unityn esikatselusta pelin kohtauksessa. Kuvateksti omalla raidallaan kuvan ylä- tai alapuolella,
   ei kuvan päällä (omistaja 18.10.2026 klo 12.14).
5. **Hyväksyntä:** PT hyväksyy tai hylkää omistajan puolesta ja kirjaa päätöksen postiin
   `posti/fable-codex-<aihe>-hyvaksynta-<pvm>.md` valtuutus mainiten (7.15). Uudet asiat ja makuvalinnat (uusi aihe, tyyli) viedään
   omistajalle KK:n kautta kuvaparina (havainnekuva ja pelikuva rinnakkain), ja omistaja päättää ennen junaa (4.21, 22.53).
   Hylätty ei mene ämpäriin eikä junaan (9.11).
6. **Viimeistely:** LOD, ASTC ja törmäysmuodot; vientipaketti `_valmiit/<aihe>-vN-vienti-<pvm>/` → Julkaisija `vie-paketti.sh`
   (ämpäriin vain paketteina, 11.26).

## 9. Pelikytkentä ja juna

- **Kuka kytkee:** Lavastaja kokoaa Codexin mallit kohtauksiksi (paikat, mittakaava, valo; 7.4) ja hahmot Unityssä (kokoaa, animoi
  ja valaisee; 2.182). Pelikoodin muutokset (esim. pelin oma kohtauskoodi) tekee sen pelin rakentaja, joka on nimetty tilauksessa
  (luku 1).
- **Portti ennen kytkentää:** toimitusta ei kytketä peliin ennen kuin portti on palauttanut 0 ja PT on hyväksynyt sen (opit:
  maailma v4 ennen porttia).
- **Tilattu malli peliin asti (7.15, omistaja 20.10.2026 klo 19.12):** jokainen malli kulkee ketjun tilattu → toimitettu →
  hyväksytty → pelissä. Hyväksytty malli viedään kohtaukseen samassa tai seuraavassa junassa. Automaattinen tarkistus hälyttää, jos
  hyväksytty malli ei ole missään kohtauksessa tai tilaus on ollut toimittamatta yli 48 tuntia.
- **Juna:** malli menee avoimeen junaan (yksi juna kerrallaan, 10.2). Ennen junaa ajetaan `tyokalut/ennen-junaa.sh` (koko putki:
  `tuotantoputken-tarkistukset.md`). Simulaattoria ei tarvita uudelle mallille; omistaja katsoo sen pelistä (9.11 SIMU HARVOIN).
  Lukitus ja TestFlight vain omistajan pyynnöstä (10.2 JULKAISUPYYNTÖ).

## 10. Valmiin työn tarkistuslista

- [ ] Tilaus postissa: havainnekuva, mallit ja mitat, pelin tarpeet, kytkijä ja kohtaus (luku 1).
- [ ] Tripo-mallien määrälle omistajan kortti KK:n kautta ennen generointia; jokainen uusinta omalla kortillaan (luku 2).
- [ ] Uudet mallit Tripolla Codexin kautta; vanhoja malleja ei vaihdettu ilman omistajan päätöstä.
- [ ] `node tools/codex-3d-tarkistus.mjs <kansio>` → 0 ENNEN kuin toimitus kytketään peliin (VIRHE-rivit PT:lle → Codex).
- [ ] Manifesti (SHA256SUMS, SHA256SUMS.txt tai MANIFEST.json) kattaa jokaisen glb:n ja kuvan; LAHTEET.md tai Codexin lähdeinventaario mukana.
- [ ] Täysikokoisena: suunta +Z eteen, animaatioiden silmukat, materiaalit Unityssä, hahmon koko muihin nähden, varjon kontakti.
- [ ] Hahmolla liikevideo Unitystä ennen peliä.
- [ ] Havainnekuva ja pelikuva rinnakkain täysikokoisina; PT:n hyväksyntä postissa; uudet asiat ja makuvalinnat omistajalla KK:n kautta.
- [ ] Viimeistely (LOD, ASTC, törmäysmuodot) ja vientipaketti `_valmiit/<aihe>-vN-vienti-<pvm>/`.
- [ ] Malli kohtauksessa samassa tai seuraavassa junassa; `tyokalut/ennen-junaa.sh` OK ennen junaa.
- [ ] Opit kirjattu tämän pohjan opit-osioon (luku 12).

## 11. Omistajalle myöhemmin ja epävarmat kohdat

Nämä eivät ole sääntöjä. Ne kootaan PT:lle ja tarvittaessa omistajalle KK:n kautta.

- **Rakennusten poikkeus (epävarma, Raamatun sisäinen ero):** 7.15 sanoo, että poikkeus Tripo-linjasta (esim. kokonaiset rakennukset,
  kartan maasto) tehdään vain omistajan päätöksellä KK:n kautta, mutta 11.7 sanoo, ettei rakennuksista kysytä poikkeusta. Pohja
  noudattaa molempia: poikkeusta ei ehdoteta, ja vain omistaja voi sen tehdä. PT selvittää sanamuodon.
- **Ottomäärän sääntö 3D-malleille (epävarma kirjaus):** OTTOMÄÄRÄ SITOO on Raamatussa ääniluvun (5.2) yhteydessä. Pohja soveltaa
  sitä Tripo-malleihin omistajan linjan mukaan (määrä kortilla, uusinta = uusi kortti). PT varmistaa, kirjataanko sama lukuun 7 tai 11.
- **Lyhyt liikevideo päivällä (epävarma):** linja "videot yöllä" koskee pitkiä renderöintejä ja videoita. Onko muutaman sekunnin
  tarkistusvideo Unityn esikatselusta sallittu päivällä, ei ole Raamatussa. Oletus: odotetaan yötä, jos kone on muussa käytössä.
- **Tripo Maxin jatko (omistajan päätös):** tilaus on voimassa noin 18.11.2026 asti. Ennen päättymistä KK:lle kerrotaan krediittien
  tilanne; jatko on uusi osto, joten ehdotusta ei tuoda ennen kuin omistaja itse avaa asian (11.5).

## 12. Opit ja retrospektiivi (ensimmäinen ajo 19.10.2026, juoksupeli)

- **hahmot v1** (puyi, puyi-perus, vartija): kaikki läpi; 40 000 kolmiota, 1 piirto, 113–114 luuta, korkeudet 1,35 / 1,35 / 1,75 m.
  HUOM kaikissa kolmessa: juurisolmun skaala soveltamatta (1,37–1,79).
- **maailma v4** (10 osaa): 9 läpi; **sisapiha.glb hylätty**: 1 721 primitiiviä (1 707 erillistä meshiä penkeille, patsaille ja
  portille) > 300. Saman materiaalin kappaleet yhdistetään ennen seuraavaa toimitusta.
- **maailma v4 ennen porttia:** v4 vietiin peliin ennen tuontiportin ajoa (08.28 vs 08.41), ja portin hylkäämä
  `sisapiha.glb` oli yhä junassa 204 (`JuoksuV4Maailma.cs:28`). Portti ajetaan ennen kuin toimitus kytketään peliin
  (KK-katselmus 19.10., 3D V2). Sääntö on nyt luvussa 9.
- **Referenssikuvat ja kielletyt lähteet** (18.10.; muisti ei-googlen-3d-laattoja-codexille, codex-tilaus-ei-suojattuja-teoksia):
  siirretty tilauksen lukuun 1.
- **Luvat ja tilaukset (K4; loki "PAATOKSET 19.10.2026 klo 08.42–08.46", "TRIPO: SELAIMELLA, EI RAJAPINTAA", "TARKENNUS 19.10.2026
  klo 15.06"):** siirretty lukuun 2 ja linjoihin (ei uusia ostoja).
- **Manifesti (Kööpenhamina ja ISS-ympyräikkuna 19.10.):** Codex toimitti MANIFEST.json-tiedostoja; portti hyväksyy ne, ja pohja
  sanoo nyt saman (luku 7).
