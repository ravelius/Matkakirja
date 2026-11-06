# Pelikoodari: luovutus 07.11.2026 klo 00.20

Korvaa kaikki aiemmat, mutta lue myös `git show 05ab6aa02:docs/raportit/viesti-pelikoodari-luovutus-20261106-2324.md` kohdat 3–5 (paikat, mitat, opit) ja `git show dd4c12680:docs/raportit/viesti-pelikoodari-luovutus-20261106-2208.md` kohdat 1, 3 ja 5 juoksupelin ajalta (kartta odottaa LAV:n sanaa). **Työ nyt: LONTOO KOHTA D (PT 23.5x), kokeena, ei junaan.** Suunnitelma `/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261106-lontoo-ilman-tripoa.md`. Remote päällä.

Rajat (PT): ei Tripoa, ei Codexia, ei junaa eikä TF:ää, ei ostoja, ei poistoja, taivaaseen ei kosketa. Raskaat ajot JU:n kautta, ei päällekkäin planeetta-ajon kanssa; levy 50 Gi, mitoita ennen ajoa. Aika kirjataan (alku 22.59). Yösääntö: vika ei ratkea kahdella yrityksellä tai noin 30 minuutissa → osa pois tai edellinen toimiva, rivi KK:lle, eteenpäin.

## 1. Jako
- **C (nimetyt, OhjelmaKohdeGeometria): Valoseppä, ei sinä.** Sai haaran ja kohdelistan 23.5x. KK:n toiveet C:n ajoon välitetty.
- **B hyväksytty (KK 23.51).** ArgumentOutOfRangeException on Unityn editorin haku (UnityEditor.Search), ei omaa koodia; kerrottu PT:lle.

## 2. Tila
- **D1 ajettu ja kuvat KK:lla (00.17), odottaa hänen sanaansa:** `lokit/pelikoodari-lontoo-d1-200433217` (7 kuvaa). 124 km², 146 816 taloa, 72 559 puuta, 5,97 M kolmiota, 275 Mt. Hyvä lopputulos: kaupunki näyttää oikealta, kadut näkyvät, matala kulma ja usva toimivat. `talot tila`: keskietäisyydellä 65 palaa, 86 Mt.
- **Proto:** `/Users/Shared/Claude/wt/proto-pelikoodari-lod-diag`, haara `pelikoodari/lontoo-b`, kärki `200433217` (etä `natiivi-backup`, ei Matkakirjan originissa). Valoseppä voi työntää samaan tai omaan haaraan: fetch ennen koodia.
- **Koodi D:ssä:** `PariisiKallistus.LontooKoe` (asettaa `TaloAlue.Aseta`, kun la0 > 50): kallistus ja usva Lontoossa; `PariisinOsuus` pitää taivaan (`Aurinko.cs`) ja maan pinnan (`MaanPinta.cs`) vain Pariisissa.

## 3. Avoinna (järjestyksessä)
1. **Palat `palat-d2` valmiit, ei ajettu:** London Eye pois (`a/siisti-d.json`: Elizabeth Tower, Abbey, Eyen 3 taloa). Vaihda `sk-d1.txt`:n kansio tai tee `sk-d2.txt`.
2. **Kartan rakennustason pyyhintä nimettyjen kohdalta:** kartan oma litteä talo jää nyt palojen poistaman talon alle (Abbey, Big Ben). Mallina KS:n `_tyo/karttaseppa/lahialue-20261106/poisto/tee-poistot.py` (mvt-välimuistista renkaat z13–14 → `TaloPoistot.Pisteet`, `TaloAlue.PoistoPala/PoistoPois`). Lontoolle oma taulukko (esim. `TaloPoistotLontoo.cs`), valinta `PariisiKallistus.LontooKoe`:lla, koska Pariisin taulukko on generoitu eikä sitä muokata käsin. **Lisää `a/siisti-d.json`:iin kohde vasta, kun Valosepän malli on olemassa**, ettei paikalle jää tyhjää. Talot löytyvät: `a/etsi-talot.py osm/osm.json la lo sade`.
3. **Puut puistoihin:** OSM:ssä vain yksittäin merkityt, joten Hyde Park ja Greenwich ovat harvoja. Jos KK haluaa, lisää koneella tiheyttä (`osm/muut.json`:n puistot ja metsät), ei sattumaa katujen päälle.
4. **Kyltit:** Pariisissa `Nahtavyysalue.Kylttikohteet`/`MalliKyltit`. Tarkista C:n jälkeen, saavatko Lontoon ohjelmakohteet saman kyltin; ole yhteydessä Valosepälle ja NUI:lle.
5. **Varjot:** nimetyillä OhjelmaKohteet tekee kovan varjon itse; talot eivät heitä varjoa Pariisissakaan. Tarkista C:n kuvasta.
6. **Sitten E (vertailu) ja F (iPad, muisti kerran):** PT jakaa.

## 4. Työkalut (`/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/lontoo/`)
- **Palojen ajo, 1 min 10 s:** `L="/Volumes/T7 4TB/koodaus/proto-arkisto/_tyo/pelikoodari/lontoo-d"; LONTOO_PUUT=$PWD/osm/puut.json LONTOO_RAJA=51.465,51.535,-0.215,0.015 LONTOO_LIDAR="$L/lidar" /opt/homebrew/opt/python@3.14/bin/python3 a/tee-palat-lontoo.py $PWD/osm $PWD/palat-X $PWD/a/korvaa-tyhja.json $PWD/a/siisti-d.json`. Muutos aina uuteen kansioon.
- **LiDAR:** T7:llä `lontoo-d/lidar` (1 224 ruutua, 4,5 Gt, haku `a/aja-lidar-d.sh` 13 min, ei virheitä).
- **Generaattori:** `a/tee-lontoo-kopio.py` tekee `a/tee-palat-lontoo.py`:n NS:n `tee-palat.py`:stä; aja kansiossa `a/`. **Puut ovat tässä skriptissä** (`PUUT`-lohko): ikosaedri 20 kolmiota + runko, sama verkko, valo, usva ja häivytys kuin taloilla, ei ajonaikaista koodia. Koko ja väri säädetään siellä.
- **Skenaario:** `sk-d1.txt` (7 kuvaa). Vuoro JU:lta: sha, skenaarion täysi polku, kansio, kerroin 0.465, "mitä tämä ratkaisee"; JU ajaa itse ja kuittaa.

## 5. OPIT
- Kamera ei mene noin 2 km:n leveyttä lähemmäs (`ElavaLahinLeveys` 0,625): `aja`-kaari 0,012 ja 0,006 antavat saman kuvan. Keski 0,02, kaukaa 0,06.
- Pelin Big Ben -2D-merkki (`KaupunkiPallot.LinssiMallit`, `pienoismalli-lontoo`) näkyy kääntymättömänä kaikista suunnista: tunnistus billboardiksi. Pois `OhjelmaKohteet.LontooKoe`:lla.
- LiDARin mediaani tekee ei-talosta korkean laatikon, jos OSM sanoo `building=yes` (London Eye): katso kuvista kapeat tornit jokirannoilta. Hyde Parkin kapea torni on oikea (Knightsbridgen kasarmi).
- Valmis-kuittauksen sisältö "11 Exception-riviä" on sama kaikissa ajoissa: Cesium ja Unityn haku.
