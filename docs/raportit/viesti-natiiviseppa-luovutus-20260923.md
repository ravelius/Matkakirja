# Natiivisepän (ent. 3D-selvittäjä) luovutus 23.9.2026 ilta

Luovuttaja: 3D-selvittäjä / Natiiviseppä (Opus 5.5, Macin käyttäjä koodaus). Syy: konteksti on
yli 65 %:ssa. Edellinen luovutus: viesti-3d-selvittaja-luovutus-20260923.md (aamu).
Rooli (Fable 23.9. ilta): natiivin pääkehittäjä ja proto-gitin masterin ainoa mergeääjä.
Alueet: kamera, laatat ja kerrokset, Cesium, maasto, merkit, reitit, käännökset,
suorituskyky, iPad-asennukset.

## Lue ensin

1. `CLAUDE.md` ja Raamatun Ydinajatus kohta 2 (viestit Fablelle ≤ 8 riviä).
2. `/Users/Shared/Claude/proto-3d/TYOTAPA.md`: neljä kirjoittajaa, haarat, merge-säännöt,
   laitevuorot.
3. `…/Matkakirja-proto/Assets/Matkakirja/RAJAPINTA.md`: sovittu rajapinta ja sen tila.
4. Raportit tässä järjestyksessä: 3d-proto-virstanpylvas1, 3d-proto-kosketus-laite,
   3d-proto-kaupungit (docs/raportit, 23.9.).

## Tila

- Unity-projekti: `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, paikallinen git,
  master **b9847ea**. Ketju `./aja.sh luo | sim | xcode-sim | asenna-sim <UDID>`.
  Laitekäännös: `Rakennus.IosLaite` → `Build/laite` → xcodebuild (komento alla).
- iPadilla (iPad Pro 11" M5, 00008142-0019686E02F3801C, 120 Hz) on c7b2f60 + maasto päällä
  (VP3–VP4 + Pelikoodarin erä 3). Uusi käännös b9847ea (maasto pois oletuksena) oli
  taustalla ajossa luovutushetkellä. Tarkista ja asenna se ensin (alla).
- Valmiit virstanpylväät:
  - VP1: pallo omilla laatoilla.
  - Kosketus: veto, liuku ja nipistys.
  - Napakannet: oma kalotti, häive 84–82,5°.
  - VP2: 266 kaupunkia sisältöpaketista, nimiöiden harvennus.
  - VP3: napautus → lento (webin pehmennys, 1,4 s) → nimikortti; EB Garamond (OFL);
    lähin zoomi 3,6°; laatat 22c.
  - VP4: reitit verkkopelin polkukaavalla (ReittiGeometria), korostus, naapurit.
  - Kallistus: kahden sormen pystyveto, alle 3000 km.
  - Pelikoodarin erät 1–3 mergetty: pelattava silmukka (napautus, matkavalinta, ajo,
    saapuminen, lehti WKWebView, tallennus). 30 s:n skripti ajettu iPadilla, 6/6 tilaa ok.
- Kehysajat iPadilla, kaikki alle 12,5 ms:n kynnyksen:
  - lenkki 960 kehystä, p95 8,55 ms;
  - eleet 1141 kehystä, p95 8,49 ms, max 10,3 ms.
- iPhone 17 Pro: liike p95 8,5–8,6 ms.

## Kesken (tee nämä ensin) — päivitetty klo 17.40

Proto-master on **ab8098e**:
- b9847ea (kartta omaan asmdefiin, KarttaKerrokset, UiPeittaa, kallistus, maastokytkin),
- a5148ec (Aja + pehmennyskäyrä),
- Pelikoodarin erä 4 kysymys-ui fc1938b ja luennat d08df08.

`./aja.sh luo` kääntyy. iPadilla on **b9847ea**: silmukka-30s ajettu klo 17.30, kaikki
rivit ok. Liike 807 kehystä, p95 8,79 ms, max 12 ms. Levossa 94 ylitystä (max 42 ms),
todennäköisesti WKWebView-lehden aikana. Tutki.

1. **iPad-käännös ab8098e** (erä 4 ja luennat): IosLaite → xcodebuild (dwarf) → asennus →
   Peli-testit/silmukka-kysymys.txt (odotetut k1…k8 README-silmukka.md:ssä) ja silmukka-30s.txt
   (1-alku on nyt vaihe Toiminta). Luennat: `luento intro`, `odota 3`, `tila puhe`, ja
   tuloksena puhe.soi true.
   **Unityn vienti jäi kahdesti jumiin** (CopyFiles noin 3300/3333, CPU 0 %). Tapa ja aja
   uudelleen. Luo-ajo jää joskus kiinni sulkeutumiseen: tarkista luo.log ja käytä
   `timeout 600` ja pkill.
2. **Natiivi-UI:n merge-pyyntö** natiivi-ui/tilarivi 2a09c4c (pohja kysymys-ui). Editorissa
   tarvitaan kaksi asiaa:
   - Panel Settings -asset polkuun Assets/Matkakirja/UI/Resources/MatkakirjaUI/Paneeli.asset
     (tee Rakennus.cs:ään ScriptableObject.CreateInstance<PanelSettings>() + CreateAsset);
   - UI-kansion .metat (logo.png: Default, ei mipmappeja).
   Hän pyytää sim-kuvat (UI-testit/README.md) ja lokirivin "MATKAKIRJA ui: Kone = …".
   Offline: toteuta IOfflineLataus (UI/UiPalvelut.cs) → RAJAPINTA Alueet.
3. **Maasto 23b** (Karttaseppä, noin klo 18, korjattu RTIN-kaarevuus, z0–z6 koko maailma):
   vaihda Rakennus.MaastoUrl polkuun …/2026-09-23b/layer.json, kokeile `maasto paalle`
   iPadilla (kiilat pois?) ja tee siitä oletus.
4. **Linssisepän haarat** linssiseppa/linssirunko ja linssiseppa/aikajana: mergeä pyydettäessä
   (KarttaKerrokset on masterissa). Sovittu: vanat, valot ja tähtitaivas Linssit-kansioon,
   Piste-materiaali viittauksena.
5. Pelikoodari poisti ISyoteEsto-rajapinnan: SyoteLukko kirjoittaa suoraan
   PalloKierto.SyoteEstetty-kytkimeen ja UiPeittaa-koukkuun. PalloKiertoon ei tarvita muutoksia.

## Seuraavat (Fablen ketju)

- VP5-loput: maasto korjattuna, nimiöt pinnalle (Cesium3DTileset.SampleHeightMostDetailed),
  kallistuksen hienosäätö maaston kanssa, dynaaminen auringonvalo korkeusmallista
  (myöhemmin, sidottuna kellonaikaan).
- RAJAPINTA.md, tulossa-osat: Valokeila, Sumu, Alueet (offline-lataus, omistajan linjaus:
  binaari pieni, kaikki striimataan), KaupunkiMerkit.NaytaKaupungit/Korosta ja Reitit.Polku.
- Siirtosepän skeema 1.5 (lauta{x,y}, tarkeys, reitit.via) ämpäriin → vaihda Reitit.cs ja
  KaupunkiMerkit lukemaan päätason kentät. Koepaketti: /Users/Shared/Claude/sisalto-koe/.
- Karttasepän z9–z10 (Ranska) → lähizoomin raja (`PalloKierto.minKaari`) alemmas.
- Burst-linkkeri kaatuu editorissa (9 virhettä jokaisessa käännöksessä), mutta laite toimii.
- Käynnistyksessä on yksi 100–240 ms:n kehys paketin latauksesta.

## Tärkeät komennot

```
cd /Users/Shared/Claude/proto-3d/Matkakirja-proto
./aja.sh luo                      # kohtaus (Unity jää joskus jumiin sulkeutuessa: tarkista luo.log, kill)
"/Applications/Unity/Hub/Editor/6000.3.24f1/Unity.app/Contents/MacOS/Unity" -batchmode -quit -projectPath . -buildTarget iOS -executeMethod Matkakirja.Editori.Rakennus.IosLaite -logFile tulokset/laite.log
xcodebuild -project Build/laite/Unity-iPhone.xcodeproj -scheme Unity-iPhone -configuration Release -destination 'id=<UDID>' -derivedDataPath Build/dd-laite -allowProvisioningUpdates CODE_SIGN_STYLE=Automatic DEVELOPMENT_TEAM=F72JLS57C5 DEBUG_INFORMATION_FORMAT=dwarf build
xcrun devicectl device copy to|from --device <UDID> --domain-type appDataContainer --domain-identifier app.matkakirja.proto3d --source … --destination Documents/…
```
zsh ei pilko muuttujia sanoiksi, joten kirjoita devicectl-komennot kokonaan.

## Laitteet ja tilit

- Personal Team F72JLS57C5 on kirjattu Unityyn. Koodaus-Xcoden tililista oli välillä tyhjä
  ("No Accounts"). Omistaja korjasi sen tekemällä Runin GUI:sta iPadille.
  Developer Program on olemassa (webkuori), ja TestFlight-vaiheessa omistaja kirjautuu
  maksullisen tiimin Apple ID:llä. Julkaisija valmistelee putken.
- Simulaattorin ainoa käyttäjä on Laitetestaaja ("simulaattori vapaa?" / "simulaattori pois").
  iPad on jaettu, ja käytäntö on sama. Laitetestaaja pyysi simulaattoriin uuden version
  (Pelikoodarin silmukan savuke): `./aja.sh sim && ./aja.sh xcode-sim && ./aja.sh asenna-sim
  1572C658-6455-4E55-8C05-3F88CB3C32F6`.

## Opit

- Cesium for Unityssä ei ole iOS-simulaattorikirjastoja. `tyokalut/simulaattorimerkinta.py`
  merkitsee kopion (aja.sh tekee sen itse).
- Unityn iOS: targetFrameRate näytön taajuuteen, ProMotion ProjectSettingsissä, Release-käännös
  pakotetaan, simulaattorin arkkitehtuuri on ARM64.
- Napa: raster-kerros ei piirry navoille, joten oma kalotti ja häive.
- Merkit: kameraan käännetty neliö leikkautuu pintaan, joten merkki siirretään 30 %
  näkösädettä pitkin kameraa kohti.
- Laitteen kuvakaappaus: komento `kuva` (ScreenCapture). WKWebView-lehti ei näy kuvassa.
