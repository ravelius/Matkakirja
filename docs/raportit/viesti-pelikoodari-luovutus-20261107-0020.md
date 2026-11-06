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

## 6. Lisäys PT 00.2x
- D1 kuitattu kokeena (PT katsoi kaukaa- ja westminster-kuvat).
- **Tarkista "Abbey Roadin suojatie" -pallon koordinaatit:** kuvissa se on Trafalgarin pohjoispuolella, ei Regent's Parkin takana, missä oikea suojatie on (PT:n hypoteesi kuvasta). Sama tarkistus muille kohteille, jos syy on yhteinen.
- Jatka nimettyjen pyyhintää nollauksen jälkeen; koordinoi C:n paikat Valosepän kanssa.
- 275 Mt kirjataan muistimittaukseen kohdassa F.

## 7. KK:N PÄÄTÖS 00.25 (omistajan valtuutuksella; kokeena, ei junaan): D1 kelpaa, jatka tällä tavalla
KK katsoi kaikki 7 kuvaa: näyttää Lontoolta, ei lelumainen, koodipuut käyvät. Aamun kysymystä Shardista ei tarvita. Tiedossa olevia vikoja ei leikata kuvista. Seuraavaan ajoon:
1. **Harvat puistot** (Hyde Park, Kensington Gardens, Greenwich) täydennetään koneella puistoalueiden sisään, ei veteen, teille eikä taloihin. Tavoite: puisto näyttää metsäiseltä kuin oikeassa kaupungissa, ei kaljulta kentältä. Yösääntö: kaksi yritystä tai noin 30 min. Korvaa kohdan 3 ehdon "jos KK haluaa".
2. **Alueen itäreuna** (d1-greenwich, oikea yläkulma): 3D-talot vaihtuvat litteisiin näkyvästi. Omistajan tavoite 4.11. 09.27 "ei tulisi mitään rajaa". Ota kuva reunalta ja tee siirtymä kuten Pariisin reunalla, jos se on halpa; muuten rivi KK:lle aamun kysymykseksi.
3. **Abbey Roadin suojatie** näkyy Royal Academyn vieressä, mutta `data/kohdekartat-sijainnit.json` antaa oikean paikan 51.532, -0.1774 (St John's Wood). Tarkista, mistä natiivi pisteen ottaa, ja kerro KK:lle, koskeeko vika muitakin kohteita.
4. **Kohdan E kuviin** oikea aloitus Lontoosta tai ainakin ilman "Pariisi"- ja "RANSKA"-tekstejä, jos se ei vaadi isoa työtä; muuten kerrotaan kuvan kanssa.

## 8. Lisäys PT 00.3x
- **Kohta E (vertailu Pariisi | Lontoo samoilta etäisyyksiltä, hinta ja aika, oikealla aloituksella) on sinulle D:n ja C:n jälkeen. F jää jakamatta.**
- **Abbey Road selvitetty, kohta 7.3 tehty:** natiivin `Resources/Kohdenostot/sijainnit.json` on 28.10. kopio (13b3b9178), jota ei generoitu uudelleen KS:n 3.11. korjauksen (f38d76dd5, #5986) jälkeen. 108 kohdetta yli 100 m väärässä, 12 yli 500 m, 5 yli 2 km; Pariisissa 0, Lontoossa 2. Korjaus: `tyokalut/natiivi-ui/kohdesijainnit.py` + uusin `data/kohdekartat-sijainnit.json`. Kerrottu PT:lle ja KK:lle; PT päättää junan ja tekijän (vastuu NUI:lla), älä tee ilman sanaa. Vertailu mitattu protohaarasta, ei rungosta.

## 9. Lisäys 00.4x: Lontoon paikat päivitetty kokeeseen
- PT:n käskystä `2fcf9008d` (proton uusi kärki, natiivi-backup, ei junaan): `sijainnit.json`:ssa vain `lontoo:*` uusimmasta datasta (5 paikkaa muuttui, 6 uutta, Thamesin vuorovesi pois). **Abbey Road nyt 51.53206, -0.17737; tarkista kuvasta seuraavassa ajossa** (PT:n ehto, ei vielä nähty). Skenaarioon kuva St John's Woodista, esim. `aja 51.5320 -0.1774 0.02 2`; huom. kohde on talojen rajauksen (51.535) reunalla.
- Generaattoria ei voinut ajaa sellaisenaan: koko ajo muutti 859 paikkaa (myös Pariisi: Pasteur 1862 siirtyy, 8 uutta, Tuileriain rauniot pois). PT:n ehto oli Pariisi ennallaan, joska rajattu Lontooseen ja kerrottu PT:lle.
- Kaikkien kaupunkien korjaus ja juna: PT vie KK:lle aamulla, vastuu NUI:lla.
- Jatka kohdista 3 ja 7 (puistot, itäreuna, aloitus Lontoosta).

## 10. Lisäys: Valosepän pyyntö (C, a8d971917, haara linssiseppa2/lontoo-c, pohja 200433217; ajo sk-c1.txt palat-d2:lla JU:lla)
- **Ensimmäinen työ, 1 min:** lisää `a/siisti-d.json`:iin St Paul'sin `way/369161987`, tarkista Tower Bridgen torneilta muut talot (`a/etsi-talot.py osm/osm.json 51.5055175 -0.0753695 170`; OSM-laiturit way/367652787 ja way/367652791 eivät ole taloja), aja uuteen kansioon `palat-d3` ja kerro kansio Valosepälle (local_fa464945-e15d-4f98-aaad-00877a60f63a).
- Paikat: St Paul's 51.51378 -0.098322 akseli 6,9, x -85,4…71, z ±46,6; Tower Bridge 51.5055175 -0.0753695 akseli 67,3, SiirtoZ -0,7, x -157…163, z ±28,5. Big Ben SiirtoX -1,2, SiirtoZ -1,45, pyyhittävä alue ei muutu.
- Yhdistä `pelikoodari/lontoo-b` (2fcf9008d, Lontoon paikat) ja Valosepän haara ennen seuraavaa ajoa: kumpikin on haarautunut 200433217:stä tai sen jälkeen.
