# Linssisepän luovutus 25.9.2026 (päivä, tilinvaihto)

*Linssiseppä (Opus). Kirjoitettu Fablen käskystä klo 12.2x, kun omistaja pysäytti sessiot tilinvaihtoa varten. Edellinen
luovutus on viesti-linssiseppa-luovutus-20260925-yo.md. Jatkaja lukee tämän ja aloitusviestin viesti-linssiseppa-aloitus.md.*

## Linjaus nyt (omistaja 25.9. klo 09.3x, Raamattu)

Uusia linssejä ei aloiteta ennen kuin pariteetti on varmasti valmis: ei toteutusta eikä uutta suunnittelua. Maapallon tila,
Taidemuseo ja datalinssit odottavat, ja niiden suunnitelmat ovat mainissa. Linnut (radion hämärään) odottavat myös, koska ne
ovat uutta visuaalia (Fable 10.3x). Työ nyt: olemassa olevien linssien pariteetti natiivissa ja radiouudistuksen
loppuunvienti build 13:ssa. Pariteetti on valmis, kun liikkumislistassa on 0 ERI:ä, pariteettiajossa 0 yli 16 px:n riviä
ja omistajan build-kokeilu ei tuota uusia löydöksiä.

## Tehty 25.9. (kaikki junassa tai mainissa)

| Asia | Haara / SHA | Tila |
|---|---|---|
| Radiopintojen .metat | linssiseppa/radio-paneeli d3acfd1 | juna |
| Sulussa pergamentti heti reliefin alle (2,4 s sumeus pois) | linssiseppa/radio-sulku-pohja 86ac64e | juna, Laitetestaaja vahvisti |
| Viivaimen veto toimimaan (Clickable vei kaappauksen) + vedon irrotus ilman siirtymää | linssiseppa/radio-veto a26b248 | juna, Laitetestaaja vahvisti simulaattorissa |
| Löydös 74 f: "Aloita alusta" nollaa kertojan; 74 e -siivous; testikomennot `esitys kaynnista`, `esitys alusta` | linssiseppa/ihminen-74 5dc65e0 | juna (cfdc127) |
| Löydös 77: radion sulun viimeistely (OnDisable/OnDestroy), laatat palautetaan vain kerran | linssiseppa/radio-sulku-varmistus 2cf6ed9 | juna |
| Löydös 71 (kartuschan radionappi) diagnoosi | Natiivi-UI korjasi natiivi-ui/radio-71 | Natiivi-UI:n |
| Maapallon tila: aineistosuunnitelma (NOAA LSA pysähtynyt → NASA JPL GMSL Zenodo CC BY 4.0) + Fablen päätökset | #3134 | mainissa (#3143) |
| Taidemuseo: täysi suunnitelma + teosluettelo mainiin, luku 4.5 renessanssisalin aineisto esitysmoottorin datana; Leonardon muotokuva vaihdettu (Rijksmuseum RP-P-2022-4655), Pietàn polku | #3145 | mainissa (#3149) |

Videot ja kuvat: proto-3d/lokit/radio-b12-sim-20260925/, loydos74-video-20260925/ (iso 368 Mt `ihmisen-matka.mp4`
omistajan levyskriptiin), musta-20260925/.

## Linssipariteetti (tärkein avoin työ)

Työkalu: Pelikoodarin `tools/pariteetti-ajo.mjs` haarassa origin/pelikoodari-pariteetti-ajo (4f5d1d6e9), oma worktree
`/Users/Shared/Claude/wt/linssiseppa-pariteetti`. Ajo omalla simulaattorilla:

```
cd /Users/Shared/Claude/wt/linssiseppa-pariteetti && git fetch origin pelikoodari-pariteetti-ajo && git reset --hard origin/pelikoodari-pariteetti-ajo
PLAYWRIGHT_JS=/Users/Shared/Claude/Matkakirja-fable/node_modules/playwright/index.js PARITEETTI_IPHONE_UDID=D0D2CD1E-70C7-4140-A972-E615212E8911 \
  node tools/pariteetti-ajo.mjs --build <nimi> --rivit 11,12,13,30,31,37,38,39,40,41 --laitteet iphone --ulos /Users/Shared/Claude/proto-3d/lokit/pariteetti-ajo/<nimi>
```

Asenna ensin tuorein juna: joko `proto-kaanna.sh juna/b13 D0D2CD1E-…` tai kopioi valmis
`/Users/Shared/Claude/proto-3d/Matkakirja-proto-kaannos/Build/dd-sim/Build/Products/Release-iphonesimulator/Matkakirja3D.app`
heti toisen juna/b13-käännöksen jälkeen (`simctl install`). **Simulaattorivuoro sovitaan Julkaisijan kanssa**, ja
`xcrun simctl boot` vain ajon ajaksi, `shutdown` heti perään (muistisääntö).

**Kierros 2 (juna/b13 93ab72f1): SAMA 1, ERI 9, PUUTTUU 1** (proto-3d/lokit/pariteetti-ajo/b13-linssit-2/):

| Rivi | Ero | Kenelle | Mitä |
|---|---|---|---|
| 12 selite | 13 px | ok | alle rajan |
| 39 vertailu | 8 px | ok | alle rajan |
| 38 satelliitti | SAMA | ok | |
| 41 maatiedot | 63 px | Natiivi-UI | korjattu natiivi-ui/maapilleri-41 1a374a68 (maa-pilleri oikeaan yläkulmaan, todennus b13o), ei vielä junassa klo 12.2x |
| 31 vesistöt, 41 | 63–79 px | Natiivi-UI → Fable | lyhyt paikkakupla "Marseille" on hyväksytty iPhone-asettelu (68/73); Liikun korkeus on yleinen asettelu, ero ≈ 38 pt kun webin kuvasta puuttuu kotipalkin turva-alue (Natiivi-UI kirjasi Fablelle avoimeksi) |
| 11 keksinnöt | 100 px | Natiivi-UI | avauskaaro-11 (paperin leveys ja lyhdyt webin mitoin), todennus b13n, ei vielä junassa |
| 40 karuselli | 78 px | Natiivi-UI | korttien korkeus +77 % |
| 13 ihmisen matka | 94 px | työkalu korjattu 4f5d1d6e9 | muisti jatkoi vanhasta; nyt `esitys alusta` |
| 30 topografia | 53 px | työkalu korjattu | selite jäi auki rivistä 12 (nyt siivous `selite kiinni`), webin kaappaus peitteen alla (nyt odottaa) |
| 37 radio | 121 px | hyväksytty poikkeama | radiouudistus (tumma pohja, mastot) |
| 12b | – | poistettu | keksintölinssillä ei webissä selitettä |

Webin säännöt pelikerroksille linssin aikana (Natiivi-UI toteutti natiivi-ui/linssikerrokset bf6e86c1, junassa):
porttilinssit piilottavat kaiken; vertailu piilottaa matkakirjan, toiminnot ja nostot (maapaneeli jää); radio piilottaa
matkakirjan, toiminnot ja kohteet; vesistöt, maatiedot ja isoisä pitävät kerrokset.

**Seuraavaksi:** kierros 3, kun Natiivi-UI:n 41/31/11/40-korjaukset ovat junassa. Sitten iPad ja vaaka (`--laitteet
ipad11,iphone-vaaka`, enintään 2 simulaattoria kerrallaan) ja raportti Fablelle.

## Radio build 13

Minun osani ovat junassa: paneeli, mastologiikka, hämärä, veto, sulku ja varmistukset. Radiouudistus on valmis, kun
paneeli, mastot, hämärä, veto, sulku ja yövalot toimivat webin kaavalla (Fable). **Yövalot odottavat Karttasepän Black
Marble -sarjaa**, ja sekoitus on Natiivisepän. Asukasluvut (Siirtosepän skeema 1.38) ratkaisevat mastojen kokoluokat; ilman
niitä kaikki mastot ovat Keski. Laitteella tarkistamatta: radiopintojen diagnoosirivi (b12i-laitteella pinnat null).

## Muut avoimet

- **74 d2** (kertojan tekstin varjo, natiivi-ui/ihminen-74 f7918f7) ei ole vielä junassa; Natiivi-UI vie sen. "Musta ruutu"
  Natiivi-UI:n todennuksessa oli `ui linssi matka` -testitila, ei bugi: oikea kaava on `linssi ihmisen-matka` → `esitys
  alusta` → `esitys kaynnista`.
- **Vesistöjen tumma ruutu** Natiivi-UI:n kuvassa (lähellä Bukarestia) on todennäköisesti odotuspeite; jos se jää yli 15 s,
  vika on linssin (VesistotLinssi/Odotuspeite).
- **Levy:** `zsh /Users/Shared/Claude/proto-3d/vapauta-levy-linssiseppa-20260924.sh aja` + 368 Mt video omistajalle.
- Worktreet: `/Users/Shared/Claude/wt/linssiseppa-pariteetti` (työkalu) ja proto `/Users/Shared/Claude/wt/proto-linssiseppa`
  (haara linssiseppa/ihminen-74, puhdas).

## Opit

- **Käännöspalvelu:** saman junan tuore .app kopioidaan käännöskopiosta omaan simulaattoriin (`simctl install`), jottei
  samaa käännöstä ajeta kahdesti raskaassa kuormassa.
- **UI Toolkit: lapsen Clickable kaappaa osoittimen**; vanhemman TrickleDown-PointerMove ei silloin saa liikettä
  (viivain). Kaappaa vanhemmassa jo PointerDownissa ja valitse napautettu lapsi osumakohdasta. Sama luokka:
  TrickleDown-StopPropagation vanhemmassa nielee lapsen napautuksen (löydös 71).
- **Esitys on äänikellon varassa:** `IEsityksenAani.Lopeta` nollaa myös tauon, muuten uusi esitys ei kelaa kertojaa.
- **Linssien testitilat:** `ui linssi …` on pelkkä UI-esimerkki; oikea linssi aina `linssi-komento.txt`:n `linssi <id>`.
- **Pariteettiajon muisti:** linssit muistavat tilansa (ihmisen matka, selitteen koko); rivit nollaavat tilan itse.
- **Kone:** sammuta simulaattori kokonaan kun et todenna; kierrosskriptit sammuttavat pelin EXIT-trapissa.
