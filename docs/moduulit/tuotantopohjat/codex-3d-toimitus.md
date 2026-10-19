# Codexin 3D-toimitus: yksi toimitusmuoto

*(Linnanrakentaja 19.10.2026, PT:n tilaus. Omistaja 19.10. klo 08.28: "Pidetään codex kuitenkin kaiken grafiikan työstäjänä …
Tee jatkossa kaikki tripo mallit pyytämällä ne codexilta." Codex tekee uudet 3D-mallit; Linnanrakentaja vastaanottaa, tarkistaa ja
viimeistelee. Muoto on koottu juoksupelin hahmo- ja maailmatoimitusten (18.–19.10.) ja omien mallien vientiportin opeista. Jos tämä ja
Raamattu ovat ristiriidassa, Raamattu voittaa. Pohjan muutokset hyväksyy PT.)*

**Tavoitteen muoto (Raamattu 4.21, omistaja 19.10.2026 klo 15.32):** ennen työtä tavoite määritellään yhtä selvästi kuin grafiikassa havainnekuvalla. Tässä putkessa: GRAFIIKKA havainnekuva tilauksen liitteenä; vastaanotossa havainnekuva ja pelikuva täysikokoisina rinnakkain (9.11). Omistajalle tuodaan vain uudet asiat ja makuvalinnat; muut tavoitteet hyväksyy PT.

**Portti:** `node tools/codex-3d-tarkistus.mjs <toimituskansio>` — paluuarvo 0 = vastaanotettu, 1 = hylätty (VIRHE-rivit
kertovat syyn). HUOM-rivit ovat tiedoksi eivätkä hylkää. Codex voi ajaa saman komennon itse ennen toimitusta.
Kaikki alla oleva, jonka perässä on **[portti]**, tarkistetaan koneellisesti; muut kohdat tarkistaa vastaanottaja.

## 1. Tiedosto

| Asia | Vaatimus |
|---|---|
| Muoto | **GLB (glTF 2.0, binääri)**, kaikki upotettuna: puskurit ja tekstuurit glb:n sisällä, ei ulkoisia tiedostoja **[portti]** |
| Ei kelpaa | FBX, OBJ, BLEND, erillinen .gltf + .bin, DAE, USDZ **[portti]**; Draco- tai meshopt-pakkaus (pura ennen vientiä) **[portti]** |
| Nimi | pienet kirjaimet `a–z`, numerot, `-` ja `_`, enintään 48 merkkiä + `.glb`; ei välilyöntejä, ääkkösiä eikä versionumeroa nimessä (versio on kansiossa) **[portti]** |
| Koko | yksi glb enintään 15 Mt **[portti]** |
| Vienti Blenderistä | glTF 2.0 -vienti, +Y ylös (oletus), "Apply Modifiers", vain näkyvä kohde; ennen vientiä Ctrl+A → All Transforms |

## 2. Mittakaava, akselit ja pivot

- **Yksikkö metri.** 1 yksikkö = 1 m todellisessa koossa. Esineen pisin sivu 0,01–1000 m **[portti]** (cm/mm-vienti jää kiinni).
- **Akselit glTF:n mukaan:** +Y ylös, hahmon kasvot kohti **+Z**, oikea käsi kohti −X. Blenderin oletusvienti (+Y ylös) tekee tämän,
  kun hahmo katsoo Blenderissä −Y-suuntaan (eteen).
- **Hahmon pivot jalkojen välissä lattiatasossa:** alin piste y = 0 ± 3 cm, pohjan keskikohta enintään 20 cm origosta **[portti]**.
  Korkeus 0,5–2,5 m **[portti]**. Lepoasento T- tai A-asento.
- **Esineen pivot** pohjan keskellä lattiatasossa (y = 0), ellei tilaus sano muuta. **Maailman osat** (rata, salit) maailman
  koordinaateissa yhteisellä origolla, kuten juoksupelin maailma v4: kaikki saman toimituksen osat asettuvat paikoilleen ilman siirtoa.
- **Skaala sovellettuna:** juurisolmun skaala 1. Soveltamaton skaala (esim. `MatkakirjaScaleRoot` 1,37) on HUOM **[portti]**: malli
  toimii, mutta pelin skaalaus kertautuu.

## 3. Hahmot (luuranko ja animaatiot)

- **Yksi luuranko**, enintään 150 luuta **[portti]**, Mixamo-nimet etuliitteellä `mixamorig:`. Pakolliset luut **[portti]**:
  `Hips, Spine, Spine1, Spine2, Neck, Head` ja kummallekin puolelle (`Left…`/`Right…`) `Shoulder, Arm, ForeArm, Hand, UpLeg, Leg, Foot, ToeBase`.
  Sormet, `HeadTop_End` ja lisäluut (viitta `cape_*`, kaapu `robe_*`, letti `braid_*`) ovat sallittuja.
- **Animaatiot samassa glb:ssä**, nimet pienillä `a–z`, `0–9`, `_` (ei `Armature|Run`) **[portti]**. Pakollinen `idle` **[portti]**;
  pelin tarvitsemat nimet tilauksessa (juoksupeli: `run`, `jump`, `slide`, `stumble` …). Silmukat alkavat ja päättyvät samaan asentoon.
- Neljä luuvaikutusta pistettä kohden (Unityn oletus), painot normalisoitu.

## 4. Mobiilirajat

| Raja | Hahmo | Esine tai maailman osa |
|---|---|---|
| Kolmiot | ≤ 40 000 **[portti]** | ≤ 100 000 tiedostossa **[portti]** |
| Primitiivit (≈ piirtokutsut) | ≤ 300 **[portti]**, tavoite 1–3 | ≤ 300 **[portti]**: yhdistä saman materiaalin kappaleet yhdeksi meshiksi |
| Materiaalit | ≤ 32 **[portti]**, tavoite 1 | ≤ 32 **[portti]** |
| Tekstuurit | PNG tai JPEG, sivu kahden potenssi, ≤ 2048 px **[portti]**, enintään 8 kuvaa tiedostossa **[portti]** | sama |

Tekstuurit: väri sRGB, normaali- ja ORM-kartat lineaarisina; hahmolle yksi 1024–2048 px:n atlas riittää. ASTC-pakkaus tehdään
vastaanotossa (älä toimita KTX2:ta).

## 5. Toimituskansio ja manifesti

```
<aihe>-v<N>/                  esim. juoksupeli-hahmot-v2/
  SHA256SUMS                  sha256sum-muoto: "<64 heksaa>  <suhteellinen polku>"   [portti: pakollinen, jokainen .glb listassa ja täsmää]
  LAHTEET.md                  tekijä, työkalu (Tripo-tili, Blender), lisenssi, lähdekuvat ja niiden oikeudet
  <osa>/<nimi>.glb            suhteelliset polut kuten ämpärissä
  esikatselu/<nimi>.png       valinnainen: edestä, sivulta ja 3/4-kulmasta
```

- Toimitus postilaatikkoon (`posti/codex-<vastaanottaja>-<aihe>-<pvm>.md`: polku tai zip ja zipin SHA-256), kuten tähänkin asti.
- Manifesti `SHA256SUMS` tai `SHA256SUMS.txt`. Tiedosto, joka puuttuu listasta tai jonka tiiviste ei täsmää, hylätään.
- Uusi versio = uusi kansio (`-v3`); vanhaa ei ylikirjoiteta.
- Erilliset kuvat (havainne- ja referenssikuvat, tekstuurit; Työkaluseppä 19.10.): PNG tai JPEG, listassa ja tiiviste täsmää
  (paitsi `esikatselu/`) **[portti]**; `tekstuurit/`-kansion kuvat kahden potenssi ja ≤ 2048 px **[portti]**. Pelkät kuvat
  sisältävä toimitus kelpaa. LAHTEET.md puuttuu = HUOM **[portti]**. Koko putki ennen junaa: `tuotantoputken-tarkistukset.md`.

## 6. Vastaanotto (Linnanrakentaja)

1. `node tools/codex-3d-tarkistus.mjs <kansio>` → 0. Hylätystä yksi viesti PT:lle (VIRHE-rivit), PT välittää Codexille.
2. Havainnekuva ja pelikuva rinnakkain täysikokoisina ennen hyväksyntää (Raamattu 9.11, omistaja 19.10.2026 klo 15.21); hylätty ei mene ämpäriin eikä junaan.
   Kuvateksti omalla raidallaan kuvan ylä- tai alapuolella, ei kuvan päällä (omistaja 18.10.2026 klo 12.14).
3. Silmämääräinen tarkistus: suunta (+Z eteen), animaatioiden silmukat, materiaalit Unityssä, ja hahmon koko pelissä muihin verrattuna.
   Katselulista (opit 17.–18.10.2026): kuva avataan täysikokoisena, ei pienestä esikatselusta ("Katso itse", pyramidi
   17.10. klo 20.21); varjosta tarkistetaan kontakti, eli ei vaaleaa rakoa esineen ja varjon välissä (pyramidi leijui, 17.10.
   klo 23.46); hahmosta katsotaan edestä, sivulta ja takaa kasvot (silmät, nenä, profiili), kädet ja saumat jokaisesta
   kulmasta erikseen (Tripo-hahmon hiukset peittivät silmät sivukuvassa, PT ohitti, 18.10. klo 11.41), ja liikevideo ennen
   peliä (omistaja 18.10. klo 11.34). Lähde: loki "PAATOKSET 18.10.2026 klo 11.34"; muisti pt-kuvan-tarkistus-taysikokoisena.
4. Viimeistely (LOD, ASTC, törmäysmuodot) ja vientipaketti `_valmiit/<aihe>-vN-vienti-<pvm>/` → Julkaisija `vie-paketti.sh`.

## 7. Valmiin vastaanoton tarkistuslista

- [ ] `node tools/codex-3d-tarkistus.mjs <kansio>` → 0 ENNEN kuin toimitus kytketään peliin (VIRHE-rivit PT:lle → Codex).
- [ ] Manifesti (SHA256SUMS tai MANIFEST.json) kattaa jokaisen glb:n ja kuvan; LAHTEET.md tai Codexin lähdeinventaario mukana.
- [ ] Silmämääräisesti täysikokoisena: suunta +Z eteen, animaatioiden silmukat, materiaalit Unityssä, hahmon koko muihin nähden.
- [ ] Havainnekuva ja pelikuva rinnakkain täysikokoisina (tavoitteen muoto).
- [ ] Viimeistely (LOD, ASTC, törmäysmuodot) ja vientipaketti `_valmiit/<aihe>-vN-vienti-<pvm>/`; `tyokalut/ennen-junaa.sh` OK ennen junaa.
- [ ] Opit kirjattu tämän pohjan opit-osioon (luku 8).

## 8. Opit ja retrospektiivi (ensimmäinen ajo 19.10.2026, juoksupeli)

- **hahmot v1** (puyi, puyi-perus, vartija): kaikki läpi; 40 000 kolmiota, 1 piirto, 113–114 luuta, korkeudet 1,35 / 1,35 / 1,75 m.
  HUOM kaikissa kolmessa: juurisolmun skaala soveltamatta (1,37–1,79).
- **maailma v4** (10 osaa): 9 läpi; **sisapiha.glb hylätty**: 1 721 primitiiviä (1 707 erillistä meshiä penkeille, patsaille ja
  portille) > 300. Saman materiaalin kappaleet yhdistetään ennen seuraavaa toimitusta.
- **maailma v4 ennen porttia:** v4 vietiin peliin ennen tuontiportin ajoa (08.28 vs 08.41), ja portin hylkäämä
  `sisapiha.glb` oli yhä junassa 204 (`JuoksuV4Maailma.cs:28`). Portti ajetaan ennen kuin toimitus kytketään peliin
  (KK-katselmus 19.10., 3D V2).
- **Hahmojen referenssikuvien tilaus (18.10.):** kuvat edestä, sivulta ja takaa (Louvren ihmiset: ei oikeiden ihmisten
  valokuvia; juoksupelin Puyi ja vartija: kädet irti vartalosta, tasainen valo, harmaa tausta). Lähde: loki "PAATOKSET 18.10.2026
  klo 09.04" ja "klo 11.34".
- **Luvat ja tilaukset (K4):** Codexin havainne- ja Tripon pohjakuvat pysyvällä luvalla (omistaja 19.10. klo 08.42); Tripo-mallit,
  ElevenLabs ja muut maksulliset generoinnit luvalla. Tripo Max -kuukausitilaus (omistaja 18.10., voimassa noin 18.11. asti,
  selaimella; API-saldo 0, API-krediittejä ei osteta) on olemassa oleva tilaus eikä uusi osto (Raamattu 12.24). Lähde: loki
  "PAATOKSET 19.10.2026 klo 08.42–08.46", "TRIPO: SELAIMELLA, EI RAJAPINTAA", "TARKENNUS 19.10.2026 klo 15.06".
- **Googlen laattoja sisältäviä pelikuvia ei anneta Codexille pohjaksi eikä referenssiksi** (Googlen ehdot): referenssi
  omasta aineistosta (OSM-vesimaski, oma renderi); omien 3D-näkymien kuvat käyvät. Tilauksen sääntölistaan rivi: ei
  tekijänoikeudella suojattuja teoksia (tekijän kuolemasta alle 70 v, Espanjassa 80); kohde jätetään pois ja mainitaan
  kuittauksessa. Lähde: muisti ei-googlen-3d-laattoja-codexille, codex-tilaus-ei-suojattuja-teoksia.
