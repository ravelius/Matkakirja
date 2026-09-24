# 3D-prototyyppi: kosketusohjaus, napakannet ja ensimmäinen laitekäännös (23.9.2026)

Tekijä: 3D-selvittäjä (Opus 5.5). Jatkoa raportille 3d-proto-virstanpylvas1-20260923.md.
Unity-projekti on edelleen repon ulkopuolella: `/Users/Shared/Claude/proto-3d/Matkakirja-proto`,
paikallinen git, commit 6607bb3.

## Tulos

- **Kosketusohjaus:** yhden sormen veto pyörittää palloa. Irrotuksen jälkeen pallo liukuu
  ja liuku hiipuu pehmeästi (aikavakio 0,35 s). Nipistys zoomaa, ja kahden sormen
  keskipisteen siirto pyörittää samalla. Pallo pyörii itsestään vain ensimmäiseen
  kosketukseen asti. Koodi: `PalloKierto.cs`.
- **Laitteella:** Samin iPhone 17 Pro (iOS 27.0), Release-käännös, **120 Hz** (ProMotion).
  Omistajan palaute: *"pallo pyörii ihanan pehmeästi unityllä"*.
- **Napahattu:** korjattu omilla kaloteilla (`NapaKannet.cs` ja shader `Matkakirja/Napakansi`).
- **Allekirjoitus:** omistajan Personal Team F72JLS57C5 on kirjattu pysyvästi Unityn
  iOS-asetuksiin, ja automaattinen allekirjoitus on käytössä. Asennus on voimassa
  7 päivää.

## Kehysajat

Mittari `KehysMittari.cs` kirjoittaa viiden sekunnin jaksot tiedostoon
`Documents/kehysajat.jsonl`. Tiedosto haetaan kaapelin kautta komennolla
`xcrun devicectl device copy from --domain-type appDataContainer …`. Liike tarkoittaa
kehyksiä, joiden aikana sormi on ruudulla tai liuku on käynnissä. Veto, liuku ja
nipistys lasketaan yhteen, ei erikseen.

| Mittaus | Kehyksiä | p50 | p95 | p99 | max | yli 1,5× tavoite |
|---|---|---|---|---|---|---|
| iPhone 17 Pro, liike (omistajan eleet) | 1885 | 8,33 ms | 8,46–8,61 ms | 9,0–15,9 ms | 16,75 ms | 15 (0,8 %) |
| iPhone 17 Pro, lepo (itsestään pyöriminen) | 2886 | 8,33 ms | 8,40 ms | 8,44 ms | 8,6 ms | 0 |
| Simulaattori iPhone 18 Pro, liike (60 Hz, Development) | noin 1000 | 16,67 ms | ≤ 17,2 ms | ≤ 33 ms | 33,3 ms | 0–1 / jakso |

Tavoite on laitteella 8,33 ms (120 Hz) ja simulaattorissa 16,67 ms (60 Hz).
Laitteen ylitykset ovat yksittäisiä yhden vsyncin ohituksia (16,7 ms), eivät pidempiä
nykäyksiä. Käynnistyksen ensimmäinen jakso sisältää yhden 175 ms:n kehyksen
(Development-käännöksessä).

**Vertailu verkkopeliin (Fablen tiedot, iPad, v2148):** paljaan kartan p95 on 21–23 ms ja
täysien tilojen 27–40 ms. Unity-pallon p95 on laitteella 8,5–8,6 ms, eli noin 2,5–4,5 kertaa
lyhyempi. Vertailu on suuntaa antava: laitteet eroavat (iPad ja iPhone 17 Pro), ja Unity-pallossa
ei vielä ole kaupunkeja, nimiöitä eikä pelin käyttöliittymää.

**Simulaattori ei kerro laitteen sulavuudesta.** Se piirtää Macin GPU:lla, näytön taajuus on
60 Hz, ja kosketukset tulevat synteettisinä. Simulaattorilla todennetaan vain, että ohjaus
toimii ja ettei koodissa ole ilmeistä pullonkaulaa. Sulavuus mitataan aina laitteella.

## Napakannet

Web Mercator -laatat päättyvät 85,05°:een. Sen yläpuolelle Cesium jättää paljaan
ellipsoidin, joka näkyi vaaleana kiekkona ja viuhkakuviona. Kokeillut ratkaisut:

1. Tasakulmainen pohjakuva toiseksi raster-kerrokseksi (`materialKey` 0/1): **ei toiminut**.
   Punaisiksi värjätyt navat eivät näkyneet, eli Cesium ei piirtänyt kerrosta navoille.
   Kokeilu hylättiin.
2. **Oma kalotti kummallekin navalle** 1,5 km:n korkeudella, kuten verkkopelin
   `asennaNapakannet`. Kalotti on täysi 84°:sta napaan ja häivytetään kärkipisteen
   alfalla 82,5°:een. Syy: laattojen oma yläreuna (noin 83–85°) on tumma rengas,
   mitattu sävy noin (188, 175, 145). Sävy sovitettiin kuvakaappauksen pikseleistä
   (pohjoinen #bab6a6, etelä #dcd6c6).

Jäljelle jää heikko reuna ja laattojen omat samankeskiset syvyyskäyrät napaa kohti.
Käyrät ovat poltetuissa laatoissa, eivät Unityssä. **Karttasepälle:** pallolaattojen
(julisteet/pallo/laatat/…) ylimmät rivit, noin 83–85° N, ovat tummempi rengas, jonka
syvyyskäyrät kiertävät napaa. Jos rivit poltetaan navan merisävyllä ilman käyriä, kalotin
häivytys voidaan kaventaa ja reuna katoaa.

## Esteet ja opit

- Unity rajaa iOS:n oletuksena 30 kehykseen sekunnissa. Nyt `Application.targetFrameRate`
  asetetaan näytön taajuuteen, ja ProMotion on päällä (`appleEnableProMotion: 1`
  ProjectSettingsissä, koska API:ta ei ole).
- Mallipohjan asetus `EditorUserBuildSettings.development` oli päällä, joten kaikki
  käännökset olivat Development-tilassa. Nyt käännös pakotetaan Release-tilaan.
  Tämän raportin laiteluvut ovat Release-käännöksestä.
- Editorissa laskettu kameran korkeus tallentui kohtaukseen väärällä kuvasuhteella.
  Korkeus lasketaan nyt käynnistyksessä laitteen kuvasuhteesta.
- Xcode ei hae tiimilistaa ennen kuin Accounts-näkymä on avattu. Tiimi-ID löytyy sen
  jälkeen komennolla `defaults read com.apple.dt.Xcode IDEProvisioningTeamByIdentifier`.
- Xcode-käännös laitteelle kestää noin 2 min. Unityn kylmä vienti kestää enimmillään
  5,5 min (IL2CPP), lämmin alle minuutin. Sovelluksen koko on 163 Mt (ei ohennettu).

## Avoimet asiat

- **Burst-linkkeri** kaatuu editorissa (9 virhettä jokaisessa käännöksessä), mutta
  laitekäännös toimii. Tutkitaan, kun Burstia tarvitaan (Jobs, Burst-koodi).
- Kehityskonsolissa näkyi Development-käännöksessä virhe "Touch was already deallocated"
  (Input Systemin EnhancedTouch). Release-käännöksessä ei ole tarkistettu, toistuuko se.
- Veto, liuku ja nipistys pitää mitata erikseen, jotta eleet voi vertailla toisiinsa.
- Siirtosepän sisältöpaketti v1 (sisalto/1/uusin.json, kaupungit.json) on valmis.
  Seuraava luonteva askel on kaupunkimerkinnät palloon ja lähestyminen yhteen kohteeseen.
