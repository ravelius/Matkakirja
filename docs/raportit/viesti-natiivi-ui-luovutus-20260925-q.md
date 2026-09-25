# Natiivi-UI:n luovutus 25.9.2026 (q), klo 18.3x

Jatkaa luovutusta (o). Proto-git: `/Users/Shared/Claude/proto-3d/Matkakirja-proto` (paikallinen). Työkopio:
`/Users/Shared/Claude/wt/proto-natiivi-ui-sisallys`. Merge-pyyntöjen selostus: `proto-3d/lokit/pariteetti-b12/
merge-pyynto-natiivi-ui-b13-11-41.md` (osio per erä). Kuvat ja videot ovat kansiossa `b13o/`, ja webin mitat kansiossa `b13o/web/`.
Omistajan löydökset: `docs/raportit/omistajan-loydokset-b13-20260925.md` (haara claude/bold-ride-vow4ki). Natiivi-UI:n
korjatut rivit on merkitty (4948a5267).

## Junassa (juna/b13, build 15–16)
- aloitus-81-83 2647976e (Ohita-nappi; verho-ohita dbcc0eb1 Natiivisepältä: Ohita verhon päällä), paikkarivi-89 951c4c93.
- kokoruutu-94 8798fc55, portti-112 51007795, suurennos-102 1a71f32c, luentakuva-90 f640ade3, minipulu-96c 8debbdf3.
  Build 15 on TestFlightissa, ja 94/102/96b on todennettu videolla b13o/video-b15-todennus-94-102-96b-iphone.mp4.
- intro-118 b84c8a55 (+ pelikoodari/intro-118; puhe alkaa 31 ms, avausluenta buildissa), maakunnat-114-116 c875cf31.
- 117: UI-muutosta ei tarvita (pelikoodari/valot-kohdemaa rajaa selitteen luvut). 105-data: moduulissa 142 maata, toimii.
- 95: ei vikaa natiivissa (7 kohtauskuvassa tausta on lähdetiedostossa).

## Kesken
- natiivi-ui/ihmisen-matka-2 5d45d8b2 (linssiseppa/ihmisen-matka-2 f387c824 päällä), käännös 514db4f8 OK, ei vielä
  ajettu. Merge-pyyntö on Natiivisepällä ehdolla, että Linssisepän video toteaa sen. Sisältö: tunniste OnIhmisenMatka,
  CC-nappi Tauon vasemmalla (IhmisenMatkaKerros.CcNappi/AsetaTekstitys/TekstitysMuuttui, AsetaKertomusteksti
  TekstiNakyvissa-portilla), iso kuva KuvanAlue-alueeseen 3:2 contain, maski II (Valokeila, 960 × 640, peitto 70 %).
  Tarkista videolta: palkkien todelliset korkeudet (Linssiseppä olettaa 96 pt ja 104 pt), CC:n asema saaririvillä
  (ohjaimet: CC + Tauko + ☰ samalla rivillä, nimi voi kaventua) ja kuvan koko.

## Jono
1. CC-nappi / KuvanAlue II:lle: Linssisepän palaute ja korjaukset.
2. 115: omat pikkukuvat, kun Sisältökirjuri tuo ne dataan (koodi lukee kuvat[0].pikku, varana .osoite).
3. 113/114 Natiivisepän kanssa: hän tekee oletusrajat kohdemaahan ja kuuntelee Maakunnat.PoisMuuttui / Pois.
   Tarkista yhdessä, että Pois piilottaa myös oletusrajat.

## Opit
- Simulaattorivuoro pyydetään Julkaisijalta ennen omaa kierrosta (raja 2 päällä). Käännöspalvelun boot, install ja
  sammutus ei vaadi ilmoitusta. Jaettu iPad 503000D1: lupa Laitetestaajalta ja vuoro Julkaisijalta. Sammuta UDID:llä
  ja ilmoita lopetus.
- TF-viennin aikana ei käännöksiä eikä äänilaitteen vaihtoa. Scarlettia ei voi mykistää ohjelmallisesti.
- `simctl launch` heti bootin jälkeen antaa usein "No such process". Yritä uudelleen 6–10 s:n välein, ja tarkista
  ennen napautuksia, että konsolilokissa on "aloitusverho: pois".
- Peliasetus `puhe pois` jää simulaattoriin. Aja `puhe paalle`, ennen kuin mittaat luentaa.
- recordVideo lopetetaan vain kill -INT:llä (timeout jättää "Host recording in progress" -jumin).
- UITK ScrollView.scrollOffset rajataan senhetkiseen sisältöön, joten kelaa vasta asettelun jälkeen (StartingIn 60/250).
- Älä aja tyokalut/kirjainvali.py ilman --tarkista proto-gitin pääkopiossa (se muuntaa tiedostot).
- Testikomennot: `ui nahtavyydet ateena`, `ui nosto`, `ui linssi kuva istanbul pulu`, `ui maakunnat AUT:Wien`,
  `ui ohitalento`, `ui luento ateena`. Peli: `uusi-peli 1 wien`, `puhe paalle|pois`.
