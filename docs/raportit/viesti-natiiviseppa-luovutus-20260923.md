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

## Kesken (tee nämä ensin)

1. **iPad-käännös b9847ea**: lokit `tulokset/laite.log` ja `tulokset/xcode-ipad.log`. Jos
   BUILD SUCCEEDED → `xcrun devicectl device install app --device 00008142-0019686E02F3801C
   Build/dd-laite/Build/Products/Release-iphoneos/Matkakirja3D.app`, käynnistä, aja
   `Peli-testit/silmukka-30s.txt` (Documents/peli-komento.txt) ja lähetä Fablelle 8 riviä
   (ensimmäinen pelattava versio omistajalle). Käytä aina lippua
   `DEBUG_INFORMATION_FORMAT=dwarf`, koska dsymutil jäi kerran jumiin 10 minuutiksi.
2. **Maaston saumat**: Karttasepän maasto
   (media.matkakirja.app/julisteet/maasto/2026-09-23a/layer.json) latautuu, mutta alueen
   rajalla (lon noin 10° E, Sisilia) on mustia kiiloja. Karttaseppä tutkii reunaindeksit ja
   helmat. Maasto on siihen asti pois (Rakennus: FromEllipsoid). Kytkin toimii komennolla
   `maasto paalle` (Komennot) tai `KarttaKerrokset.Nakyvyys("maasto", true)`.
3. **Linssisepän haara** linssiseppa/linssirunko (209b873) odottaa KarttaKerroksia, joka on
   nyt masterissa (b9847ea), sekä Karttasepän reliefisarjaa (arvio klo 21). Mergeä, kun
   hän pyytää. Signatuurit vastaavat hänen tynkäänsä.
4. **Pelikoodarin ISyoteEsto**: lisää `ISyoteEsto` PalloKierron otsikkoriville, kun hänen
   Sopimukset.cs-muutoksensa tulee (pelikoodari/kysymys-ui). Pelikoodari ei muokkaa
   PalloKierto.cs:ää.
5. **Natiivi-UI** (UI Toolkit, Assets/Matkakirja/UI) kytkee UiKerros.PeittaaPisteen
   → `PalloKierto.UiPeittaa`.

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
