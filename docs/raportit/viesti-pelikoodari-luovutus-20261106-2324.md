# Pelikoodari: luovutus 06.11.2026 klo 23.24

Korvaa kaikki aiemmat, mutta lue myös edellinen `git show dd4c12680:docs/raportit/viesti-pelikoodari-luovutus-20261106-2208.md` kohdat 1, 3 ja 5 juoksupelin ajalta (kartta odottaa LAV:n sanaa ennallaan). **Työ nyt: LONTOO kohdat A ja B (OMISTAJAN PÄÄTÖS 22.58, PT).** Suunnitelma `/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261106-lontoo-ilman-tripoa.md`, lue kokonaan. Remote päällä.

Rajat (PT): ei Tripoa, ei Codexia, ei junaa eikä TF:ää, ei ostoja, ei poistoja, Pariisin taivasta ei Lontooseen. Omistaja 23.07: vika ei ratkea kahdella yrityksellä tai noin 30 minuutissa → kokeen osa pois tai edellinen toimiva tilalle, rivi KK:lle (vika, mitä kokeiltu, suositus), eteenpäin. Omistaja 23.22: yöllä vain Pariisi, Lontoo ja juoksupeli. Aika alkoi 22.59 (PT:llä).

## 1. Tila
- **A valmis ja KK:n kuittaama 23.11:** `/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/lontoo/a/kohdelista.md` (15 kohdetta, pois-lista, laki, data, rajaus; kohta 7 = KK:n päätös: pois-listan talot talokerrokseen yhtenä suorana laatikkona, ei kerrospaloja; London Eye ja Millennium Bridge eivät mukaan; Peter Harrison -planetaario pois).
- **B odottaa kuvia:** JU ajaa L1:llä `71b6e26ec` itse (ipad, 0.465, 6 kuvaa), kansio `lokit/pelikoodari-lontoo-b1-71b6e26ec`; JU kuittaa. Älä ota lukkoa. Edellä NUI ja neljä NS-ajoa.

## 2. Kun kuvat tulevat
1. Katso kaikki kuusi täysikoossa. Tarkista lokista `pistekerroin 0.465`, `MATKAKIRJA talot: alue`, `talot tila` (palat > 0), `maasto siirtyma tila` ja `ohjelmakohteet: luotu, 2 verkkoa`.
2. Tarkista: talot kartan pinnalla (eivät leiju, eivät uppoa), joki näkyy, kadut näkyvät, Big Ben ja Abbey oikeilla paikoillaan ja oikein päin, alueen reuna ei näy rajana, ei Pariisin taivasta.
3. Kelpaa → kuvat KK:lle (polku ja yksi rivi; 2.214:n tapa, kopio PT:lle). PYSÄHDYS suunnitelmasta: lelumainen tai kadut peittävä = tyyli ensin, ei koko Lontoota; KK päättää yöllä omistajan puolesta.

## 3. Paikat
- **Proto:** `/Users/Shared/Claude/wt/proto-pelikoodari-lod-diag`, haara `pelikoodari/lontoo-b`, kärki `71b6e26ec` (natiivi-backup), pohja KS:n `karttaseppa/ajo-yhteinen-tasoitus` `caead582a`. Tarkistus `sh Peli-testit/unity-tarkistus.sh` 0 virhettä. Muutokset: `TaloAlue.cs` (rajaus ja MaaLisays staattisina, oletus Pariisi), komento `talot alue la0 la1 lo0 lo1 lisays`, `OhjelmaKohteet.cs` (Lontoon oma lista), uusi `OhjelmaKohdeLontoo.cs` (Big Ben ja Abbey lohkoina, vain B:n kuvaan; C tekee oikeat).
- **Työkalut** `_tyo/pelikoodari/lontoo/`: `a/hae-planeetasta.mjs` (ote planeetasta 6 workerilla, 486 s, ei verkkohakua), `osm/` (osm.json 594 000 talotietä alueelta 51.42–51.58, -0.35–0.10; muut.json; puut.json 155 033), `a/hae-lidar.py` (EA DSM ja DTM 500 m:n ruudut, `lidar/`), `a/bng.py`, `a/maasto.py` (pelin oma maasto z12), `a/tee-lontoo-kopio.py` → `a/tee-palat-lontoo.py` (tehdään NS:n tee-palat.py:stä; aja kopio uudelleen, jos NS muuttaa sitä), `palat-b1/`, `sk-b1.txt`.
- **Palojen ajo:** `LONTOO_RAJA=51.4950,51.5040,-0.1350,-0.1205 LONTOO_LIDAR=$PWD/lidar /opt/homebrew/opt/python@3.14/bin/python3 a/tee-palat-lontoo.py $PWD/osm $PWD/palat-b1 $PWD/a/korvaa-tyhja.json $PWD/a/siisti-b.json`, 6 s. Muutos aina uuteen kansioon. `siisti-b.json` poistaa Elizabeth Towerin ja Abbeyn OSM-talot mallien alta.

## 4. Mitattua
- Palat: 543 taloa, 31 463 kolmiota, 1,8 Mt/km² tiheimmällä kohdalla (Pariisi 351 Mt / 118 km² = 3 Mt/km²). Korkeus LiDARista 521 talolle, matala 16, muu 6.
- Maa: palan maa on pelin oma maasto, ei LiDARin DTM, joten `talot alue`:n lisäys on 0. Pelin maasto vaihtelee Westminsterissä 2–15 m (×2 kartalla).
- Koordinaatit: `bng.py` osui London Eyen huippuun (LiDAR E 530603, N 179949), ei siirtoa.
- Akselit OSM:stä: Abbey -5,1°, palatsi 79,8° → Big Ben -10,2°. Abbeyn akseli on kärkipisteiden painotus; tarkista kuvasta.

## 5. OPIT
- Geofabrik (`*.osm.pbf`, `*.shp.zip`), BBBike (`*.pbf`), planet.openstreetmap.org, download.openstreetmap.fr ja openstreetmap.org/api ovat robots-kiellossa. ftp.fau.de sallii; planeetta on jo T7:llä (3.11.). PT kuittasi Pariisin Geofabrik-otteen löydöksen: NS korjaa hakuskriptin, KK vie aamun kysymykseen.
- OSM:n `building:part` ei ole tee-palat.py:ssä mukana, joten suojatut tornit tulevat jo nyt yhtenä laatikkona; laatikon korkeus on LiDARin mediaani, ei huippu. Tarkista tämä kohdassa D (KK:n kuva tornista).
- Suojattuja kohteita ei saa jäädä "epäselvä pois" -tulkinnalla pois talokerroksesta: Raamattu 11.8 sanoo laatikot (KK 23.11 korjasi suositukseni).
- WCS palauttaa pakkaamattoman float32-tiffin, jonka PIL lukee tilassa F. Pelin striimikartta hakee pohjan OpenFreeMapista ajon aikana kuten Pariisissa; omat haut eivät koske sitä.
