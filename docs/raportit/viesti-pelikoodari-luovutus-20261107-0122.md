# Pelikoodari: luovutus 07.11.2026 klo 01.22

Korvaa kaikki aiemmat. Lue myös `git show 80d883ea4:docs/raportit/viesti-pelikoodari-luovutus-20261107-0020.md` kohdat 4–5 (työkalut, opit) ja `git show dd4c12680:docs/raportit/viesti-pelikoodari-luovutus-20261106-2208.md` kohdat 1, 3 ja 5 juoksupelin ajalta. **Työ nyt: Lontoo kohdat D:n loput ja E, kokeena, ei junaan.** Suunnitelma `/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261106-lontoo-ilman-tripoa.md`.

Rajat (PT): ei Tripoa, ei Codexia, ei junaa eikä TF:ää, ei ostoja, ei poistoja, taivaaseen ei kosketa. Raskaat ajot JU:n kautta, ei päällekkäin planeetta-ajon kanssa. Yösääntö: kaksi yritystä tai noin 30 min → osa pois tai edellinen toimiva, rivi KK:lle, eteenpäin. F jää jakamatta.

## 1. Tila
- **Proto:** `/Users/Shared/Claude/wt/proto-pelikoodari-lod-diag`, haara `pelikoodari/lontoo-b`, kärki `5c69b50f8` (natiivi-backup). Sisältää Valosepän `e031ce161`:n ja Lontoon paikat `2fcf9008d`. Unity-tarkistus 0 virhettä, kartan testit 694/695.
- **Palat:** `palat-d4` = `siisti-d3` + `osm/puut-d4.json`. 310 Mt, 7,27 M kolmiota, 146 802 taloa.
- **D4 ajettu `8569f9be7`:llä ja kuvat KK:lla (01.2x, viesti jonossa, ei vielä sanaa):** `lokit/pelikoodari-lontoo-d4-8569f9be7`, 8 kuvaa.
  - Puistot kelpaavat kuvissa: 50 374 uutta puuta (LiDARin latvukset + täyte ryhminä).
  - Itäreunalla ei näy rajaa (`TaloKerros.RajaLontooM` 600 m, Pariisi 200 m). Tämän takia Abbey Roadin talot ovat noin 330 m:n päässä reunasta hieman matalia.
  - Pyyhintä kartasta toimii St Paul'sin, Abbeyn ja Big Benin kohdalla (täysikokoiset rajaukset katsottu). **Tower Bridge ei ollut kuvassa, ei nähty.** Kolme liian suurta rengasta jäi kartalle (`a/poistot-d4.json`, hylätty), joten siellä voi näkyä litteä talo.
  - Aloitus Lontoosta: `uusi-peli 5` ilman kaupunkia antaa "Lontoo, joulukuussa 1873" ja ISO-BRITANNIA.

## 2. Abbey Road: EI SAA SANOA KORJATUKSI ENNEN KUVAA (PT 01.2x)
- Syy: kainalokohteen x/y on julisteen kainalossa, ja `Kohdekartta.Paikka` on lineaarinen, joten piste osuu julisteen kulmaan. `Kohdenostot.cs:471` (EpaileM 1 km) palauttaa sen. Laskettu piste 51.5209, -0.1593 vastaa kuvasta arvioitua paikkaa.
- Korjaus `5c69b50f8`: ehto ohitetaan vain, kun `LontooKoe` ja kaupunki on lontoo. **Ajamatta.** PT: varmistetaan seuraavassa Lontoo-ajossa E:n yhteydessä, ei omaa ajoa ennen sitä. Yleistä korjausta ei yöllä.
- Datatarkistus tehty: `_tyo/pelikoodari/lontoo/a/kainalo-epaile.md` (skripti ei talletettu, vain tulos). Pariisi 0 osumaa, kaikkiaan 24/28 kainalokohdetta uusimmalla datalla; nykyisellä natiivin tiedostolla 6 (Lontoossa 2, Budapest, Helsinki, Taipei, Wien). Vain laskenta, ämpärin paketti voi olla vanhempi. Rivi lähetetty PT:lle, muut aamuun.
- Tarkista E-ajon kuvista: pallo Abbey Road 51.53206, -0.17737 ja Greenwichin palatsi 51.48222, -0.00667. D4:ssä Abbey Roadin kuvassa ei näkynyt palloa lainkaan.

## 3. Avoinna (järjestyksessä)
1. **Odota Valosepän C:tä** (ajo `lokit/linssiseppa2-lontoo-c2-e031ce161`, kuvat olemassa; sana häneltä, local_fa464945-e15d-4f98-aaad-00877a60f63a). Viimeksi hänelle kerrottu `8569f9be7`, ei vielä `5c69b50f8`:aa. Fetch ennen koodia.
2. **Kohta E (PT 00.3x): Pariisi | Lontoo samoilta etäisyyksiltä, hinta ja aika, oikealla aloituksella.** Lontoon skenaarion pohja `sk-d4.txt`; `uusi-peli 5` ilman kaupunkia. Pariisin kuvat otettava samoilla etäisyyksillä ja kulmilla (kaukaa 0,06, keski 0,02, matala 78°). Hinta: palat 310 Mt + `talot tila`; aika alkoi 22.59 (PT kirjaa).
3. **Avauskortti peittää kuvan vasemman yläkulman** Lontoo-aloituksessa. `sk-d5.txt`:ssä kokeiltavana `ui sulje` juuri ennen kuvaa, ei vielä nähty toimivan. Jos ei auta, kerrotaan kuvan kanssa (KK 00.25 sallii).
4. **Kuumailmapallo £200** näkyy Abbeyn edessä Westminsterin kuvassa. Kuuluu Lontoon peliin, ei vikana; KK:lle kerrottu.
5. **Kyltit:** `Nahtavyysalue.Kylttikohteet`/`MalliKyltit`: saavatko Lontoon ohjelmakohteet saman kyltin? Tarkista C:n jälkeen Valosepän ja NUI:n kanssa.
6. **Varjot:** tarkista C:n kuvasta. Talot eivät heitä varjoa Pariisissakaan.
7. **Kartta (juoksupeli)** odottaa LAV:n sanaa ennallaan.

## 4. Uudet työkalut (`/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/lontoo/`)
- **Puistopuut, 25 s:** `LONTOO_RAJA=51.465,51.535,-0.215,0.015 PUU_KOHTEET=<proto>/Assets/Matkakirja/UI/Resources/Kohdenostot/sijainnit.json /opt/homebrew/opt/python@3.14/bin/python3 -W ignore a/tee-puistopuut.py osm "<T7>/lontoo-d/lidar" osm/puut-X.json [kuva.png]`. Säätö: `PUU_LATVUS` 11, `PUU_TAYTE` 15, `PUU_OSUUS` 0,55, `PUU_GMIN` 800 m², `PUU_EI_TAYTETTA` Blackheath. Kuva on tarkistuskartta: vihreä uudet, sininen OSM:n puut.
- **Pyyhintä:** `a/tee-poistot-lontoo.py osm/osm.json a/siisti-d3.json <proto>/Assets/Matkakirja/Kartta/TaloPoistotLontoo.cs a/poistot-d4.json`. Lukee mvt-välimuistin `/private/tmp/*/Matkakirja/*/laatat/elava/mvt`. Uusi kohde: lisää siisti-listaan ja aja palat ja tämä uudelleen.
- **Palojen ajo:** kuten edellisessä luovutuksessa, mutta `LONTOO_PUUT=$PWD/osm/puut-d4.json`, siisti `a/siisti-d3.json`, uusi kansio.

## 5. OPIT
- `uusi-peli 5` ilman kaupunkia on Lontoon aloitus; `pariisi` oli D1:ssä kopiojäämä.
- OpenFreeMapin rakennustasossa suojellut talot ovat satoina pieninä renkaina (Abbey 330, St Paul's 112), joten 919 riviä 14 talolle on oikein.
- LiDARin latvukset antavat puistolle oikean rakenteen; täyte tarvitaan vain aukeille, joita KK ei halua kaljuiksi.
- `git push natiivi-backup` antoi kerran Internal Server Errorin; uudelleenyritys riitti.

## 6. Sivussa
- Kartta-testin `IenanSiltaJatkuuPohjoisessaEikaEtelassa` hylkäys: PT 01.2x: KS korjasi vanhentuneen testin omassa haarassaan (Y 7940b98c0), todennäköisesti tämä, ei varmistettu; älä koske.
- D5-vuoro peruttu JU:lta; kuittausta ei vielä tullut. Jos kansio `lokit/pelikoodari-lontoo-d5-5c69b50f8` silti syntyy, katso kuvat ja kerro PT:lle, muuten ei jatkotoimia.
- Valmis-kuittauksen "11 Exception-riviä" on yhä sama kuin ennen: Cesium ja Unityn haku.
