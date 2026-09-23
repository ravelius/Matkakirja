# Kaupunkilehti natiivissa kuoressa (osa C) — kytkentä Unity-projektiin

Lehti on verkkopelin oma kaupunkilehti (`https://matkakirja.app/index.html?lehti=<id>`,
verkkopelin PR #2942) WKWebView-näkymässä Unityn päällä. Natiivi puoli avaa ja sulkee;
sivu kertoo viestillä `matkakirja` milloin lehti aukesi ja milloin pelaaja sulki sen.

## Tiedostot Assets/-puuhun

| Tästä kansiosta | Unity-projektiin (esim.) | Huom. |
|---|---|---|
| `Unity/Plugins/iOS/MatkakirjaLehti.mm` | `Assets/Plugins/iOS/MatkakirjaLehti.mm` | Kansio `Plugins/iOS` → Unity merkitsee iOS-liitännäiseksi ja kopioi UnityFramework-kohteeseen |
| `Unity/Scripts/Peli/LehtiKuori.cs` | `Assets/Matkakirja/Scripts/Peli/LehtiKuori.cs` | Ajonaikainen; tarvitsee `Matkakirja.Peli`-koodin (alla) |
| `Unity/Editor/LehtiKuoriXcode.cs` | `Assets/Matkakirja/Editor/LehtiKuoriXcode.cs` | Pakko olla `Editor/`-kansiossa (tai editori-asmdef:ssä) |
| `Peli/Sopimukset.cs`, `Peli/LehtiOsoite.cs` | `Assets/Matkakirja/Peli/` (asmdef `Matkakirja.Peli`) | Puhdas C#; jos asmdef on käytössä, LehtiKuoren assemblyn pitää viitata siihen |

Tarkista .mm:n Inspectorista: *Select platforms for plugin* = vain iOS (Unity asettaa tämän
`Plugins/iOS`-kansiolle itse).

## Näkymään

- Peliolio **nimeltä täsmälleen `MatkakirjaLehti`**, jossa komponentti `LehtiKuori`.
  Liitännäinen kutsuu `UnitySendMessage("MatkakirjaLehti", "LehtiSuljettu", kaupunki)`,
  ja se löytää vastaanottajan nimen perusteella. Voit myös jättää olion pois ja kutsua
  `LehtiKuori.Hae()`, joka luo sen (DontDestroyOnLoad). Väärä nimi korjataan Awakessa.
- Käyttö: `ILehti lehti = LehtiKuori.Hae(); lehti.Suljettu += k => ...; lehti.Avaa("pariisi");`
- `Suljettu` herää täsmälleen kerran per `Avaa`: pelaajan sulkiessa, `Sulje()`-kutsusta,
  uudesta `Avaa`-kutsusta tai heti seuraavassa ruudussa, jos tunnus on kelvoton.
- Osoitepohjan voi vaihtaa Inspectorissa (`osoitePohja`, esim. esikatselupalvelin).
  Sallittu: `https://…?lehti=` tai `…&lehti=`; `http` vain `localhost`/`127.0.0.1`.
- Editorissa ja muilla alustoilla lehti "sulkeutuu" seuraavassa ruudussa; ruksi
  `avaaSelaimessaEditorissa` avaa sen lisäksi selaimeen.

## iOS-käännösasetukset

- **WebKit.framework on linkitettävä erikseen.** Unityn Xcode-pohjan UnityFramework-kohteessa
  ei ole `CLANG_ENABLE_MODULES`-asetusta, joten `#import <WebKit/WebKit.h>` ei linkitä
  kehystä automaattisesti (tarkistettu 6000.3.24f1:n Trampoline/project.pbxproj:sta ja
  `xcodebuild -showBuildSettings`). `Editor/LehtiKuoriXcode.cs` lisää sen
  `[PostProcessBuild]`-vaiheessa (`PBXProject.AddFrameworkToProject`). Vaihtoehto: .mm:n
  Inspector → iOS → *Framework dependencies* → WebKit.
- **ARC**: UnityFramework-kohteessa `CLANG_ENABLE_OBJC_ARC = YES`; .mm pysäyttää
  käännöksen `#error`-rivillä, jos ARC puuttuu (silloin Inspectoriin *Compile flags* `-fobjc-arc`).
- **ATS**: tuotanto-osoite on https, joten Info.plistiin ei tarvita poikkeuksia
  (Player Settings → *Allow downloads over HTTP* voi pysyä *Not allowed*). Paikallinen
  `http://localhost`/IP-osoite on ATS:n ulkopuolella simulaattorissa.
- iOS-minimi: liitännäinen vaatii iOS 15:n (UIButtonConfiguration); proto on 17.0.
- Unity-funktiot (`UnityGetGLViewController`, `UnitySendMessage`) julistetaan .mm:ssä
  samoin allekirjoituksin kuin `Classes/Unity/UnityInterface.h` (Prefix.pch tuo sen);
  ristiriita näkyy Xcoden käännösvirheenä.

## Toiminta laitteella

- Näkymä peittää koko ruudun (tausta `#2a241c` kuten verkon `body.lehtikuori`), ja web-näkymä
  on safe arean sisällä. Luenta ja media soivat ilman erillistä elettä (inline).
- Varareitti: latausvirhe, web-prosessin kaatuminen tai 12 s ilman `lehti-auki`-viestiä →
  "Sulje lehti" -nappi, joka sulkee ja ilmoittaa Unitylle kuten normaali sulkeminen.
- Viestit hyväksytään vain pääkehyksestä ja lehden omasta isännästä; ulkoiset linkit ja
  `target=_blank` avautuvat Safariin.
- Näkymä on Safarin Web Inspectorilla tarkasteltavissa (iOS 16.4+, `inspectable`). Unityn
  UnityFramework-kohde ei määrittele `DEBUG`-lippua, joten tarkastin on oletuksena päällä;
  App Store -julkaisussa pois määrittelyllä `MATKAKIRJA_EI_TARKASTINTA`.

## Tarkistukset ilman Unityä

```sh
xcrun --sdk iphonesimulator clang -fsyntax-only -fobjc-arc -x objective-c++ \
  -isysroot $(xcrun --sdk iphonesimulator --show-sdk-path) -target arm64-apple-ios15.0-simulator \
  Unity/Plugins/iOS/MatkakirjaLehti.mm
./kaanna.sh LehtiOsoite
```
