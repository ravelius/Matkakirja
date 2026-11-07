# Pelikoodari: luovutus 07.11.2026 klo 08.21

Korvaa kaikki aiemmat. Lontoo G ja muut vanhat auki olevat: `git show 3fb1be23d:docs/raportit/viesti-pelikoodari-luovutus-20261107-0641.md`. Pallon iPad-ajo (kohta 6) on tehty ja viety. Korjaus 0641:n kohtaan 2.3 (KK 06.54): "Kuumailmapallo £200" on pallon oma kyltti (`KaupunkiPallot.cs`, `KyltinTeksti`), ei hintalappu; ei vika.

**Työ nyt: TF 219 (sisäinen koeversio, omistaja pyysi julkaisua). Odota JU:n kuittausta yrityksestä 2, katso kuvat, vie tulos.**

## 1. Odotus: yritys 2, JU ajaa
Proto `/Users/Shared/Claude/wt/proto-pelikoodari-lod-diag`, haara `pelikoodari/tf-219-talot`, kärki `a8b873e5d`, työnnetty `natiivi-backup`iin. JU kuittaa tähän sessioon. Jos kuittausta ei tule, katso kansiot ja kysy JU:lta (`local_06f8c680-4618-42bd-a730-9b6a3e17e0b7`).
- **A, juoksu omasta käynnistyksestä:** `proto-3d/_tyo/pelikoodari/tf-219/sk-tf219-juoksu.txt`, kansio `proto-3d/lokit/pelikoodari-tf219-a8b873e5d-juoksu`, kuvat `tf219-juoksu-{alku,matka,kaanto,loppu}`.
- **B, Lontoon kyltit:** `sk-tf219-lontoo.txt`, kansio `...-a8b873e5d-lontoo`, kuvat `tf219-b-lontoo-{joki,kirkko}`.

**Kun kuvat tulevat:**
1. Katso kuvat, `grep -c NullReferenceException konsoli.txt`, muistihuippu `muisti-tarkka.log`:sta (`huippu N`, N-rivit `fp`, `vapaa`) ja `muistivahti.log`.
2. Riveinä PT:lle (`local_5df52e10-…`, id osoitekirjasta) ja KK:lle (`local_37f7c945-…`): muistihuippu, muuri- ja lattiatulos kuvista (PT 07.55), mitä näkyy.
3. JU:lle "ASSETIT OK" tai lista puuttuvista. Vienti ämpäriin: ei mitään, ellei jokin uusi puute sitä vaadi. PT:n sana on palat sovelluksen mukana.
4. **Jos iPad kaatuu:** seis, rivi PT:lle ja takaisin KK:lle, ei uutta yritystä samalla tavalla, ei omaa kevennystä (PT 07.48, 07.55). Yritys 2 on PT:n viimeinen.

Tarkista myös `pursotukset.glb` (`maailma-v4/kielletty-osasarja-v8/`, 404 lokissa): en ole selvittänyt, onko sama julkaistussa 218:ssa tai näkyykö puute kuvassa. Kaksi `-lod1.glb`-riviä ovat valinnaisia LOD-malleja, juuri `v34` on sama kuin 218:ssa.

## 2. Mitä haarassa on (36cd3087a:n päällä)
- **`9e86eb56b`:** talot sovelluksen mukana (`Rakennus.KopioiTalopalat`, `Data/Raw/talopalat/{pariisi,lontoo}`, 663 Mt; lähteet `_tyo/natiiviseppa/pariisi-talot/palat-v20-ryhma4`, `_tyo/pelikoodari/lontoo/palat-d7`). `TaloKerros.LueIndeksi`: Pariisissa `Documents/talopalat`, jos siinä on paloja, muuten sovelluksen palat. `TaloAlue.SeuraaKameraa`: alue ja `LontooKoe` kameran mukaan, komento `talot alue` ohittaa. Grand Palais ja Riemukaari `-pohja-r6` oletukseksi.
- **`840ce9518`:** yhdistetty `3ed82d1fb` (juoksupeli).
- **`8c7163c44`:** `VapaaMaailma = true` (muuten TF:ssä vanha sokkelo), ulkoesineet sovelluksen mukana (`Data/Raw/ulkoesineet-v1b`; `ulkoesineet-v1` on ämpärissä 404, lähde sisäisellä levyllä `_tyo/pelikoodari/tf-219/ulkoesineet-v1b`, alkuperäinen T7:llä). `Peli-testit/kaanna.sh`: lisätty `Merkittavat.cs`.
- **`a8b873e5d`:** `PeittaaTarkasti` ei kaadu Lontoon kylttiin (`malli == null`).
- Testit ennen viimeistä korjausta: Kartta-testit 702/702, Peli-testit 868 läpi; `unity-tarkistus` 0 virhettä myös viimeisen jälkeen. Se ei kata editorikoodia; `Rakennus.cs` kääntyi JU:n käännöksessä, ja palat olivat laitteella.
- **Tilanne:** PT:n lupa ilmoitettu: VapaaMaailma ja ulkoesineet (viesti 07.5x, ei perumista). ODbL: PT ottaa, ei estä sisäistä, tarkistus junaan 220.
- Selvitys: `docs/raportit/pelikoodari-koeversio-assetit-20261107-0746.md` (`6b688b3d1`). Sen "Suositus" toteutettu.

## 3. Yritys 1 (`8c7163c44`, `proto-3d/lokit/pelikoodari-tf219-8c7163c44`)
- **Talot:** `219 palaa …/Data/Raw/talopalat/pariisi`, `242 palaa …/lontoo`, paluu Pariisiin toimi. Palat 55–71, 87–147 Mt. Katsottu 9 kuvaa koosteena pieninä, ei täysikokoisina: talot näkyvät kaikissa, mallit ja kyltit paikoillaan.
- **Muisti:** huippu 4 605 Mt, vapaa vähintään 520 Mt, raja 5 100 (pieni iPad), minuutti 8 = juoksun lataus Pariisin ja Lontoon jälkeen. Kaupungeissa enintään 4 049 Mt. 9 muistivaroitusta. Ei kaatumista: signaali 15 on ajon oma lopetus.
- **Muistivahti:** VIKA 4 085 Mt ≥ 4 080 Mt klo 08.16.37 pysäytti komennot (`MuistiVahti.PysaytaKomennot`): siksi 0 juoksukuvaa, ei devicectl. JU:n "VIKA lähetys" -rivejä oli silti 5, syytä ei selvitetty.
- **Juoksu:** palatsi ja kulkukartta latautuivat, `ulkoesineet peliin, 109 kpl`, Exception 0 juoksun alun jälkeen. Kuvaa ei ole.
- **NRE 1 524:** 1 517 korjattu (`PeittaaTarkasti`), muita 7 ei luettu. Katso yritys 2:n luku.
- **Avoin riski, viety PT:lle:** huippu kaupunki + juoksu samassa istunnossa. Pienemmät laitteet ajamatta.

## 4. Muuri ja lattia, viety KK:lle ja PT:lle 07.5x
Lavastajan uudet eivät tule (`kk-pohja-v1d-pk8`, esto v38, sama kuin 218). Mukana: `77194ed87` muurin rungon näkyvyyskorjaus alle 60 m:ssä, `389c207b4` oviluettelo, `f25ccb55a` koristeraidat, hahmot kartan lattialla. Kuvatulos puuttuu vielä (yritys 2).

## 5. Opit
- zsh: `$S:A…` tulkitaan muuntimeksi, kirjoita `"${S}:polku"`.
- iPad-skenaariossa `komento`- ja `ui`-rivien väliin `odota 2`: komentotiedosto ylikirjoittuu (JU).
- Muistivahti pysäyttää komennot 4 080 Mt:ssä: raskas lataus ajetaan omasta käynnistyksestä, jos ajo tarvitsee kuvia sen jälkeen.
- JU:n julkaistu TF 218 on `a5323cf4e`, ei iPadin runko `d092f48cc`. Sen `ui juoksupeli v4` avaa pelin.
- `_tyo`-kansiot voivat olla linkkejä T7:lle: tarkista ennen käännöksen lähteeksi ottamista (`test -L`).

## 6. Ennallaan
Lontoo G: `e48424a75` kokeena, KK kysyy aamulla omistajalta kyltit väistyvät ja St Paul's (0641 kohta 2). Juoksupelin kartta odottaa LAV:n juurta (`b19785a95`, kohta 4).
