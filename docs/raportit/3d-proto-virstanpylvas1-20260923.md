# 3D-prototyyppi, virstanpylväs 1: pergamenttipallo iOS-simulaattorissa (23.9.2026)

Tekijä: 3D-selvittäjä (Opus 5.5). Tilaaja: Fable. Omistajan päätökset: Unity 6.3 + Cesium,
ei Googlen 3D-laattoja.

## Tulos

Unity 6.3 + Cesium for Unity -sovellus pyörittää maapalloa iOS-simulaattorissa. Pallon pinta
tulee pelin omista pallolaatoista, joten Googlea tai Cesium ionia ei käytetä. Kamera kiertää
itään kuusi astetta sekunnissa 25° N leveydellä. Pallo mahtuu pystynäytön leveyteen.
Kuvakaappaukset on tallennettu kansioon `/Users/Shared/Claude/proto-3d/lokit/`
(`sim-1.png`, `sim-2.png`, `sim-3.png`). Laite oli iPhone 18 Pro, iOS 27.0 -simulaattori.

## Missä mikäkin on (ei tässä repossa)

- Unity-projekti: `/Users/Shared/Claude/proto-3d/Matkakirja-proto`. Sillä on oma paikallinen
  git (3 committia), ja Library/ ja Build/ ovat gitignoressa.
  - `Assets/Matkakirja/Editor/Rakennus.cs` rakentaa kohtauksen koodista (`LuoPallo`) ja
    tekee iOS-käännökset (`IosSimulaattori`, `IosLaite`).
  - `Assets/Matkakirja/Scripts/PalloKierto.cs` hoitaa kameran kierron ECEF:stä
    georeferenssin kautta. Etäisyys lasketaan kapeammasta kuvakulmasta.
  - `aja.sh luo | sim | xcode-sim | asenna-sim <UDID> | kaikki <UDID>` on koko ketju
    komentoriviltä (batchmode, ei ikkunoita).
  - `tyokalut/simulaattorimerkinta.py`, ks. alla.
- Pallon pinta: `CesiumUrlTemplateRasterOverlay` (Web Mercator, z0–8, 256 px)
  osoitteessa `https://media.matkakirja.app/julisteet/pallo/laatat/2026-09-21-pohja-20260921a/{z}/{x}/{reverseY}.jpg`.
  Se on sama kansio kuin js/pallo.js:n `PALLO_LAATAT`. Slippy-rivi 0 on pohjoisin, Cesiumin
  `{y}` taas lasketaan etelästä, joten osoitteessa on `{reverseY}`. Pohjana on
  `Cesium3DTileset` asetuksella `FromEllipsoid`.

## Versiot ja mitat

| Asia | Arvo |
|---|---|
| Unity | 6000.3.24f1 (Apple silicon) + iOS Build Support, 10 Gt |
| Projektipohja | com.unity.template.3d-cross-platform (URP 17.3.0) |
| Cesium for Unity | 1.25.1 (scoped registry unity.pkg.cesium.com) |
| Xcode | 27.0 (27A266a), Metal Toolchain asennettu |
| Unityn iOS-vienti | 18–51 s (lämmin ja kylmä) |
| Xcode-käännös simulaattorille | noin 2 min (Release, arm64) |
| Sovelluksen koko (simulaattori) | 233 Mt (Release, ei ohennusta) |
| Levy | Library 5,3 Gt, Build 5,6 Gt |

## Esteet ja ratkaisut

1. **Cesium for Unityssä ei ole iOS-simulaattorikirjastoja.** Sen 141 staattista
   kirjastoa on käännetty vain laitteelle (LC_BUILD_VERSION platform 2). Ratkaisu on
   `simulaattorimerkinta.py`, joka vaihtaa simulaattorikäännöksen kopiossa kentän
   paikallaan arvoon 7 (IOSSIMULATOR). Muutos koskee 2764 objektia. Apple siliconin
   simulaattori ajaa samaa arm64-konekoodia. Pakettiin ja laitekäännökseen ei kosketa.
   **Tämä on prototyypin kiertotie.** Pysyvä ratkaisu on joko Cesiumin
   natiivikirjastojen oma simulaattorikäännös tai laitetestaus oikealla iPhonella.
2. **Unityn simulaattoriajoaika oli oletuksena x86_64.** Ratkaisu on asetus
   `PlayerSettings.iOS.simulatorSdkArchitecture = ARM64`.
3. **Unity-lisenssi.** Personal-lisenssi vaatii omistajan kirjautumisen Hubiin
   käyttäjänä koodaus. Se on tehty.

## Avoimet asiat

- **Burst-linkkeri editorissa:** `burst-lld-21-hostmac` kaatuu Macilla (AotLinkerException).
  Editori jatkaa ilman Burstia. Unityn käännösyhteenveto näyttää 9 virhettä, vaikka
  käännös onnistuu. Tutkitaan ennen laitekäännöstä, koska laitteella Burst ajetaan
  AOT-käännöksenä.
- **Napahattu:** Web Mercator päättyy 85°:een, ja pohjoisnavalla näkyy vaalea kansi.
  Sama ilmiö ratkaistiin verkkopelissä. Täällä korjaus on navan täyttö tai oma
  napakerros.
- **Laite:** allekirjoitusidentiteettejä on 0. Laitekäännös (`IosLaite`) tarvitsee
  Xcoden tiimin ja Apple Developer -tilin (ks. 3d-xcode-20260923.md).
- **Koko ja suorituskyky:** fps, muisti ja käynnistysaika mitataan vasta oikealla
  laitteella. Simulaattorin luvut eivät kerro laitteen suorituskyvystä.
- Seuraavaksi, jos Fable niin päättää: kosketusohjaus (pyöritys ja zoomi), napahattu,
  laitekäännös ja lähestyminen yhteen kohteeseen (ensimmäinen 3D-malli).
