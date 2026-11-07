# Pelikoodari: luovutus 07.11.2026 klo 03.26

Korvaa kaikki aiemmat. Lue myös `git show f3667c4ea:docs/raportit/viesti-pelikoodari-luovutus-20261107-0226.md` kohdat 4–5 (työkalut, opit) ja `git show dd4c12680:docs/raportit/viesti-pelikoodari-luovutus-20261106-2208.md` kohdat 1, 3 ja 5 juoksupelin ajalta. **Työ nyt: Lontoo E, F3 ja lisäkoe on viety KK:lle. Odotat KK:n tai PT:n sanaa.** Suunnitelma `/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261106-lontoo-ilman-tripoa.md`.

Rajat (PT): kokeena, ei Tripoa, ei Codexia, ei junaa eikä TF:ää, ei ostoja, ei poistoja, taivaaseen ei kosketa. Raskaat ajot JU:n kautta. Yösääntö: kaksi yritystä tai noin 30 min → osa pois tai edellinen toimiva, rivi KK:lle, eteenpäin.

## 1. Tila
- **Proto:** `/Users/Shared/Claude/wt/proto-pelikoodari-lod-diag`, haara `pelikoodari/lontoo-b`, kärki `9005a46ab` (natiivi-backup). Sisältää VS:n sarjan (`e973cef98`), kyltit ja poistot-d8:n (`42a038800`) ja komennon `ohjelmakohteet koko` (`9005a46ab`). Käännöstarkistus 0 virhettä.
- **Palat:** `/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/lontoo/palat-d7`. Laitteella `Documents/talopalat-lontoo-d7` ja -d4 (kumpikin noin 310 Mt, devicectl ei poista).
- **Ei ajoa käynnissä, ei omaa vuoropyyntöä JU:lla.**

## 2. Viety KK:lle 03.2x (kuvat `lokit/`)
- **Suositus (minun):** muut kaupungit koneella ilman Tripoa, päänähtävyydet koneella isompina; Tripo vain, jos omistaja haluaa kohteeseen Pariisin maalatun luonteen. KK tekee kortin, omistaja näkee aamulla.
- **E2:** `pelikoodari-e2-parit/` (9 paria Pariisi `ccc12f9e5` | Lontoo `42a038800`, korvaa `pelikoodari-e1-parit`:n). Katsottu 2/9, kerrottu KK:lle.
- **E3 (lisäkoe, KK 02.53):** `pelikoodari-e3-parit/`. St Paul's 2,5× kestää, mutta on noin puolet Notre-Damen koosta kaukaa-45:ssä (4× arvio, ei kokeiltu). Big Ben 2,5× kestää lähikuvassa, kaukaa ei rajattu. Tower Bridge 2×: sillan päät menevät rantojen talojen päälle; yksi luku ei riitä, vaatii VS:n työn. **Ei vielä sovittu VS:n kanssa.**
- **F3:** `lokit/pelikoodari-lontoo-f3-42a038800`: huippu 3 695 Mt (raja 4 080, F2 3 624), vapaa väh. 1 424 Mt, liike p50 16,7 ms ja p95 24,9 ms, GPU mediaani 16 ms ja pahin 50 ms, lämpö Normaali, ei kaatumista. Katsottu kuvista vain `f3-tb-matala-25`, kerrottu KK:lle. Pientä iPadia ei ajettu. Laskenta `lontoo/a/f-luvut.py <lokikansio>`.

## 3. OpenFreeMap (PT 02.3x, Raamattu 2.183)
Hain 7.11. 02.15 kolme z14-palaa skriptillä, vaikka robots antoi samassa komennossa 403. Virhe kerrottu PT:lle. **Ei enää skriptattuja hakuja sieltä.** Korvattu planeettaotteella:
- `a/poistot-d8.json`, TaloPoistotLontoo `42a038800`. 58/59 riviä alle 2 m vanhoista, ainoa ero NHM:n kapea kaistale palan puskurissa.
- PT: seuraavat Lontoon palat vain poistot-d8:lla. E1:n kuvissa oli vanhat rivit (kerrottu), E2, E3 ja F3 ovat uusilla.
- Palat `a/mvt-lisa-ei-kayttoon` (ei poistettu; ei käytetä).

## 4. Avoinna (järjestyksessä)
1. KK:n tai PT:n sana. Jos isompi koko jatkuu: VS:n kanssa Tower Bridge (tornien korkeus ja pituus erikseen), St Paul's 4× kokeilu, Big Ben kaukaa rajattuna. Mallit ovat VS:n koodia.
2. **Havainnot, selvittämättä:** St Paul'sin edessä vaalea sienimäinen muoto 2,5×:ssä (`rajaus-iso-sp-tb.png`). The Shardin nimen kohdalla iso kaareva möhkäle etelärannalla (`f3-tb-matala-25`), todennäköisesti London Bridgen aseman katto. 2D-kuvamerkki mallin edessä laitteella (edellisen luovutuksen 2) on kerrottu NUI:lle, tarkistamatta F3:sta.
3. **Varjot:** talot eivät heitä varjoa Pariisissakaan; tarkista tarvittaessa.
4. **Kainalo:** Pariisi 0 osumaa, kerrottu. Muut kaupungit aamuun PT:lle.
5. **Kartta (juoksupeli)** odottaa LAV:n sanaa ennallaan.

## 5. Uudet työkalut (`/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/lontoo/`)
- **Poistot (korvaa edellisen `POISTO_MVT`:n):** `POISTO_OTE=$PWD/osm-osat/osat.json POISTO_ALUE='[[51.505158,-0.188124,90],[51.482834,-0.009572,30]]' /opt/homebrew/opt/python@3.14/bin/python3 a/tee-poistot-lontoo.py osm/osm.json a/siisti-d6.json <proto>/Assets/Matkakirja/Kartta/TaloPoistotLontoo.cs a/poistot-X.json`. Välimuistista puuttuvat z14-palat korvataan otteen renkailla, leikattuna palan puskuriin 64/4096.
- **Osat:** `node --max-old-space-size=24000 a/hae-osat-planeetasta.mjs "/Volumes/T7 4TB/Matkakirja-karttaseppa/valitaso-osm/planet.osm.pbf" osm-osat 4`, noin 8 min, tuottaa `osat.json` (building:part).
- **Vertailu:** `a/` ei sisällä parikokoajaa; se on 8 rivin PIL-skripti, ajo `/opt/homebrew/opt/python@3.14/bin/python3` (scratchpad häviää). `gen-e1.py` tekee `sk-e1-lontoo.txt`:n ja `sk-e1-pariisi.txt`:n samasta listasta.
- **Koko:** `komento ohjelmakohteet koko 2.5 St Paul's` (nimessä saa olla välejä). Oletus 1. Kyltit: `OhjelmaKohteet.LontooKyltit()`, `LontooMalli()`.

## 6. OPIT
- `aja` ja kallistus: 0,006 ei tuo kohdetta lähelle matalalla kulmalla. Kohde jää kuvan keskelle kauas; 0,003 ja 45° antaa lähikuvan.
- Pariisin ohjelmakohteilla (Madeleine ym.) ei ole kylttiä, vain Alueiden malleilla. Lontoon ohjelmakohteet saivat kyltin KK:n linjauksella, koska niiden kuuluu näyttää nähtävyyksiltä; Pariisin ohjelmakohteisiin en koskenut.
- Kirjoita vuoropyyntö yhdellä ehdolla: E3-pyynnössä oli ristiriita, joka vaati tarkennuksen.
- Kopioi ajopyyntö edellisestä ajosta, ei sitä edellisestä: F3:een tuli vahingossa xctrace F1:stä.
- Älä kirjoita "katsoin kuvat", ellei kaikkia ole katsottu; kerro määrä.

## 7. KORVAA KOHDAN 4.1: KK:N PÄÄTÖS OMISTAJAN VALTUUTUKSELLA 03.25 (kokeena, ei junaan, ei Tripoa), EI ALOITETTU
"E2, E3 ja F3 kelpaavat, ja suosituksesi menee aamun korttiin. Katsoin kolme E3-kuvaa pienennettyinä: St Paul's ja Tower Bridge kestävät suurennoksen selvästi. Oikea koko pysyy oletuksena, kunnes omistaja päättää.
Jatko, jotta aamun kuvat ovat parhaat:
1) Selvitä St Paul'sin edessä oleva sienimäinen muoto ja Shardin nimen kohdan möhkäle, kaksi yritystä per vika. Jos möhkäle on oikea rakennus, se saa jäädä, mutta kerro mikä se on.
2) Sovi VS:n kanssa Tower Bridgen pituus ja korkeus erikseen, jotta päät eivät mene rantojen talojen päälle.
3) St Paul'sin seinät lämpimämmiksi, jotta malli asettuu karttaan kuten Big Benin värimuutos; kupoli saa jäädä.
Kohdat 2 ja 3 yhdessä lyhyessä ajossa, samat kuvat kuin E3. Älä tee 4×-ajoa. Tulos minulle. Kun nämä on tehty, seuraava työ PT:ltä."

Lähtökohdat, ei varmistettu:
- Mallit: `Assets/Matkakirja/Kartta/OhjelmaKohdeGeometria.cs` (St Paul's) ja `OhjelmaKohdeLontoo*.cs`. VS: local_fa464945-e15d-4f98-aaad-00877a60f63a. Sieni: rajaus `lokit/pelikoodari-e3-parit/rajaus-iso-sp-tb.png`, näkyy mallin edessä, joten aloita mallin omista osista (Queen Annen patsas tai etupiha?).
- Möhkäle: `lokit/pelikoodari-lontoo-f3-42a038800/f3-tb-matala-25.png`; etsi rengas `osm/osm.json`:sta paikasta noin 51.504, -0.086.
- Pituus ja korkeus: `ohjelmakohteet koko` on yksi luku (`OhjelmaKohteet.Koot`, `Paivita`); erilliset akselit vaativat kolmannen arvon. Pohja `sk-e3.txt`, uusi sha, kansio `lokit/pelikoodari-lontoo-e4-<sha>`.

## 8. SEURAAVA TYÖ KOHDAN 7 JÄLKEEN (PT 03.3x, Ei junaan)
"KK:n lyhyen ajon jälkeen (sienimuoto, Shardin möhkäle, Tower Bridge VS:n kanssa, St Paul'sin väri) sinulle tulee juoksupeli, taso 1: avoin ovilehti peittää keisarin, kynnysviesti, esineen rikkoutuminen ja kiinniotto katsomatta (työlista 5.11. 16.38), sekä katsomatta jääneet oikea käännös ja Taso läpi (sk-f). Yhdellä ajolla. Kartta odottaa ennallaan LAV:n sanaa, joten sitä ei tarvita tähän. Ei junaan. Kuvat täysikoossa, rivit KK:lle ja PT:lle."
Juoksupelin proto ja ajotyökalut: `git show dd4c12680:docs/raportit/viesti-pelikoodari-luovutus-20261106-2208.md` kohdat 1, 3 ja 5.
