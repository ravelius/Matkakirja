# Natiivisepän luovutus 23.9.2026 ilta (2)

Luovuttaja: Natiiviseppä (Opus 5.5, Macin käyttäjä koodaus). Syy: konteksti 71–75 %.
Edellinen: viesti-natiiviseppa-luovutus-20260923.md (haara 3d-selvittaja-luovutus-ilta).
Rooli: natiivin pääkehittäjä, proto-gitin masterin ainoa mergeääjä, Unity-editorin ja
iPad-/simulaattorikäännösten ajaja.

## Lue ensin

1. `CLAUDE.md`, Raamatun Ydinajatus kohta 2 ja kohta NATIIVI PELI ETUSIJALLE.
2. `/Users/Shared/Claude/proto-3d/TYOTAPA.md` (kirjoittajat, haarat, laitevuorot).
3. `proto-3d/Matkakirja-proto/Assets/Matkakirja/RAJAPINTA.md` (luvut 1–4, 7, 10).
4. `docs/raportit/natiivi-ajantasaisuus-20260923.md` (Fablen tarkastus: B3, B12, B16, B17 olivat minun).

## Tila

- Proto-master **284c798** (`/Users/Shared/Claude/proto-3d/Matkakirja-proto`, paikallinen git, ei remotea).
- **TestFlight build 3** = master d29971b, `Build/testflight-3`, fi.matkakirja.peli 1.0.0 (3),
  Julkaisijalla ladattavana. Signing: Release, app-store-connect-vienti, DEVELOPMENT_TEAM
  ohitetaan workflowssa (projektissa Personal Team F72JLS57C5), CFBundleVersion PlistBuddyllä.
  Build 1 hylättiin, build 2 = 6cdde82 (Build/testflight-2).
- Tuotannon sisältöpaketti v11 (skeema 1.10) sisältää offline.json, maarajat, karttavalot;
  koepaketit `/Users/Shared/Claude/sisalto-koe/` (v16 tulossa, Natiivi-UI:n skeema115 mergetty).
- iPad (00008142-0019686E02F3801C) oli Laitetestaajalla, asennuksena 52e714f.

### Tänä iltana tehty ja iPadilla varmistettu

| Aihe | Tiedostot | Tulos |
|---|---|---|
| Lehden peitto | PalloKierto.NakymaPeitetty, KehysMittari "peitto" | levon ylitykset 44–47/jakso → 1–4/ajo |
| Maasto 23b oletukseksi, ruutukrediitti piiloon | Rakennus, KarttaKerrokset.Tekijatiedot | ei kiiloja; attribuutio Natiivi-UI:n tekijätiedoissa |
| Laattapalvelin 127.0.0.1 | Kartta/Laattapalvelin.cs | offline → välimuisti (600 Mt LRU) → verkko, 0 virhettä |
| Offline maittain | Kartta/Alueet.cs, Scripts/Kartta/OfflineSilta.cs | LUX 27 Mt 20 s, luetaan ilman verkkoa |
| Maatila (vertailu/maatiedot) | Kartta/MaaKartta.cs, Shaders/MaaTaytto | R8-tunnuskartta, napautus → ISO3 |
| Maakunnat B17 | MaaKartta (rajaus Eurooppa), Scripts/Kartta/MaakunnatSilta.cs | 122 aluetta, ~1,2 km/teksel |
| Aihevalot + napautus | Kartta/AiheValot.cs, Shaders/Valopiste, KarttaValotSilta | 2672 valoa, valo → nostokortti |
| Pelinappula B16 | Kartta/Nappula.cs, Shaders/Nappula, PalloKierto.Seuraa | Pelikoodari kytki Matkalla-tilaan |
| Aarrepiste B3 | Kartta/Karttapisteet.cs | sykkivä, Pelikoodari kytki |
| Radio-API, App Store -määrite | KaupunkiMerkit.NaytaVain/Korosta, IosTestFlight | soitto vain sallittu-luokalle (Linssiseppä) |
| Koekansio | Sisalto.HaePaketista: Documents/sisalto-koe/ | osoittimen vaihto ei riko kokeita |

## Kesken — tee nämä ensin

1. **Merge-pyynnöt ilman pyyntöä haaroissa:** pelikoodari/sahke eeff782, pelikoodari/linssiomistus
   b165dba — kysy ennen mergeä, ovatko valmiita.
2. **100–150 ms piikki nappulan ajon alussa** (kehysajat.jsonl, "liike" max 99–149 ms).
   Epäily: Cesium lataa kerralla uuden alueen laatat kameran Seuraa-hypyssä, tai ensimmäinen
   Tee()-kutsu. Mittaa `tyokalut/ipad.sh konsoli` + `nappula aja …` -komennolla.
3. **Ranskan rajan korkeusporras (Karttaseppä):** kuvaa 23b:n raja Espanjaan/Saksaan/Italiaan
   kallistuksessa ja kerro Karttasepälle.
4. Radion AVPlayer + ATS -testi, kun Siirtoseppä antaa sallitun testiaseman koekansioon.

## Odottaa päätöstä

- UI Toolkitin lineaarinen sekoitus (Natiivi-UI kompensoi alfa^2,2 kohde kerrallaan) — yleistä
  keinoa ei löydetty; projektin värimaailma pysyy Linear.

## Voimassa olevat työtavat

- Merge: `git merge --no-ff`, sitten **`tyokalut/tarkista.sh`** (paluukoodi 1 virheistä —
  Peli-testit/unity-tarkistus.sh palauttaa aina 0!), sitten `luo`, ja .metat + kohtaus
  omaan committiin. Omat muutokset haarassa `/Users/Shared/Claude/wt/proto-natiiviseppa`.
- Jokaisen viennin jälkeen `git checkout ProjectSettings/ProjectSettings.asset` (iPhoneSdkVersion heiluu).
- Unity-ajot aina `tyokalut/unity-vahti.sh <loki> <args>` (jumissa sample → proto-3d/lokit/vienti-jumi-*).
- iPad: `tyokalut/ipad.sh asenna | kaynnista | peli <skripti> <s> <kansio> | hae <kansio> |
  konsoli <s> <tiedosto> | versio`. Konsoli = Unityn loki laitteelta (devicectl --console).
- Aloitusnäkymä estää pelin itsekäynnistyksen: skripteissä ensin ui-komento.txt `ui aloita pariisi` tai `ui jatka`.
- `kuva` tallentaa kehyksen lopussa → `odota 1` perään.
- Testikomennot (komento.txt): maat, maakunta, valot [osoita id], napauta x y, nappula,
  piste, offline|alue, palvelin, maasto, kallista, mittaus.
- TestFlight: `MATKAKIRJA_KANSIO=Build/testflight-N MATKAKIRJA_BUNDLE_ID=fi.matkakirja.peli
  MATKAKIRJA_VERSIO=1.0.0 MATKAKIRJA_BUILD=N [MATKAKIRJA_APPSTORE=1] tyokalut/unity-vahti.sh
  tulokset/testflight-N.log -batchmode -quit -projectPath . -buildTarget iOS -executeMethod
  Matkakirja.Editori.Rakennus.IosTestFlight`. Kansioon ei kosketa ennen Julkaisijan kuittausta.
- Fablen linjaus: ei vanhan pelin kuoria (WKWebView-lehti pois natiivilehden myötä),
  radio soittaa vain sallittu-luokan asemia myös kehittäjätilassa.

## Velat ja opetukset

- Velat: 1) Burst-linkkerin 9 virhettä jokaisessa viennissä (laite toimii). 2) Laatat piirtyvät
  lähellä porrastuneina maakuntien rajoilla vain rajauksen ulkopuolella. 3) Kaupunkien
  SampleHeightMostDetailed pois (latasi 47 s) — korkeus paketista, maastoKorkeudet-kytkin.
- Opetukset: unity-tarkistus.sh:n paluukoodi 0 päästi kaksi käännösvirhettä masteriin →
  tarkista.sh. NapaKannet käyttää Cull Offia, joten sen kolmiokiertoon ei voi nojata (maakuori
  piirsi takapuolen). ECEF-säteen ellipsoiditesti meni ohi → pallotesti Unity-avaruudessa.
  Paletti lineaarisena tekstuurina haalisti sRGB-värit.

## Aloitusviesti uudelle sessiolle

> Olet Natiiviseppä (Opus), natiivin Unity + Cesium -pelin pääkehittäjä ja proto-gitin
> master. Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja NATIIVI PELI ETUSIJALLE,
> docs/raportit/viesti-natiiviseppa-luovutus-20260923-ilta2.md (haara selvittaja-3d-luovutus),
> proto-3d/TYOTAPA.md ja Assets/Matkakirja/RAJAPINTA.md. Proto-master 284c798. Tee
> "Kesken"-lista järjestyksessä ja mergeä muiden pyynnöt tarkista.sh + luo -kaavalla.
