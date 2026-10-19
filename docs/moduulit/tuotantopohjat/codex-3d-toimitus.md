# Codexin 3D-toimitus: yksi toimitusmuoto

*(Linnanrakentaja 19.10.2026, PT:n tilaus. Omistaja 19.10. klo 08.28: "Pidetään codex kuitenkin kaiken grafiikan työstäjänä …
Tee jatkossa kaikki tripo mallit pyytämällä ne codexilta." Codex tekee uudet 3D-mallit; Linnanrakentaja vastaanottaa, tarkistaa ja
viimeistelee. Muoto on koottu juoksupelin hahmo- ja maailmatoimitusten (18.–19.10.) ja omien mallien vientiportin opeista. Jos tämä ja
Raamattu ovat ristiriidassa, Raamattu voittaa. Pohjan muutokset hyväksyy PT.)*

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

## 6. Vastaanotto (Linnanrakentaja)

1. `node tools/codex-3d-tarkistus.mjs <kansio>` → 0. Hylätystä yksi viesti PT:lle (VIRHE-rivit), PT välittää Codexille.
2. Silmämääräinen tarkistus: suunta (+Z eteen), animaatioiden silmukat, materiaalit Unityssä, ja hahmon koko pelissä muihin verrattuna.
3. Viimeistely (LOD, ASTC, törmäysmuodot) ja vientipaketti `_valmiit/<aihe>-vN-vienti-<pvm>/` → Julkaisija `vie-paketti.sh`.

## 7. Ensimmäinen ajo 19.10.2026 (juoksupeli)

- **hahmot v1** (puyi, puyi-perus, vartija): kaikki läpi; 40 000 kolmiota, 1 piirto, 113–114 luuta, korkeudet 1,35 / 1,35 / 1,75 m.
  HUOM kaikissa kolmessa: juurisolmun skaala soveltamatta (1,37–1,79).
- **maailma v4** (10 osaa): 9 läpi; **sisapiha.glb hylätty**: 1 721 primitiiviä (1 707 erillistä meshiä penkeille, patsaille ja
  portille) > 300. Saman materiaalin kappaleet yhdistetään ennen seuraavaa toimitusta.
