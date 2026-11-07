# Pelikoodari: luovutus 07.11.2026 klo 02.26

Korvaa kaikki aiemmat. Lue myös `git show 5575ad5ee:docs/raportit/viesti-pelikoodari-luovutus-20261107-0122.md` kohdat 4–6 (työkalut, opit) ja `git show dd4c12680:docs/raportit/viesti-pelikoodari-luovutus-20261106-2208.md` kohdat 1, 3 ja 5 juoksupelin ajalta. **Työ nyt: Lontoo, kokeena, ei junaan. Odotat Valosepän (VS) sarjaa, sitten kohta E.** Suunnitelma `/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261106-lontoo-ilman-tripoa.md`.

Rajat (PT): ei Tripoa, ei Codexia, ei junaa eikä TF:ää, ei ostoja, ei poistoja, taivaaseen ei kosketa. Raskaat ajot JU:n kautta. Yösääntö: kaksi yritystä tai noin 30 min → osa pois tai edellinen toimiva, rivi KK:lle, eteenpäin. Levy 48 Gi vapaana, mitoita ennen ajoa.

## 1. Tila
- **Proto:** `/Users/Shared/Claude/wt/proto-pelikoodari-lod-diag`, haara `pelikoodari/lontoo-b`, kärki `6551ecaa3` (natiivi-backup, ei Matkakirjan originissa). Sisältää VS:n `bd977fc11`:n. Unity-tarkistusta ei ajettu `4a32bac2b`:n jälkeen; VS:n ajo f1 (`39951594b`) kääntyi JU:lla, `6551ecaa3` muuttaa vain poistotaulukkoa.
- **Palat:** `/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/lontoo/palat-d7` (siisti-d6, puut-d7, osm-d6), 146 715 taloa, 309 Mt, 7,26 M kolmiota. Annettu VS:lle uusinta-ajoon, ei vielä nähty kuvissa.
- **Tehty ja kuvissa nähty:** Abbey Road ja Greenwichin palatsi oikein (D6), avauskortti lapuksi (D7, D8), joen katkos ei toistu Lontoo-aloituksella (D8 Mac, F2 iPad). KK 01.44: katkosta ei tutkita enempää, ei aamun kysymys. Syy jäi varmistamatta; c2 oli Pariisi-aloitus.

## 2. Kohta F tehty: tulos kerrottu KK:lle ja PT:lle 02.24 (`lokit/pelikoodari-lontoo-f2-4a32bac2b`)
Iso iPad (12,9" 5. suk., 8 Gt), äppi `4a32bac2b`, palat-d4, `sk-f2.txt`, 13 min, ei kaatumista eikä muistivaroituksia, lämpö Normaali koko ajan.
- Muisti: huippu 3 624 Mt, maan näkymässä ilman taloja 3 271 Mt (noin +350 Mt), vapaa vähintään 1 495 Mt, raja 4 080 Mt. Ladattuna 52–73 palaa, 54–110 Mt.
- Ruutuaika: liike p50 16,7 ms, p95 25–50 ms; lepo p50 22–33 ms; GPU ilman taloja 9–11 ms, taloilla 14–35 ms, pahin Tower Bridgen matala kulma.
- Sumeutta (25 s) ja katkosta ei näy laitteella. Kuvat `f1-*.png`, nimet tarkoituksella f1.
- **Alaraja:** ei VS:n sarjan 14 mallia eikä palatsia. Pientä iPadia ei ajettu. Mittauksen laskenta: `/private/tmp/.../scratchpad/f2a.py` on kadonnut nollauksessa; merkit.txt + muisti-tarkka.log + konsolin kehysajat-rivit, kohdat merkkien väliltä.
- Laitteelle jäi `Documents/talopalat-lontoo-d4` (310 Mt); devicectl ei poista. Runko palautettu.
- Havainto, ei vielä kerrottu: laitteella Tower Bridgen ja St Paul'sin kohdalla näkyy 2D-kuvamerkki 3D-mallin edessä (f1-tb-matala-25, f1-ensimmainen-25). Mac-ajoissa samassa kohdassa on pallo. Kuuluu kylttiasiaan (kohta 3.2), katso VS:n kanssa.

## 3. Avoinna (järjestyksessä)
1. **VS:n uusinta-ajo** `palat-d7` + `6551ecaa3` (VS, local_fa464945-e15d-4f98-aaad-00877a60f63a, nollautumassa; seuraaja jatkaa samassa sessiossa). Hän kertoo, näkyykö litteitä taloja tai puita malleilla. Jos näkyy, korjaukset kohdan 4 mukaan.
2. **Kyltit:** `Nahtavyysalue.Kylttikohteet`/`MalliKyltit`: saavatko Lontoon ohjelmakohteet saman kyltin? Tarkista VS:n ja NUI:n kanssa. Sama kuin kohdan 2 havainto.
3. **Kohta E (KK 01.21): Pariisi | Lontoo samoilta etäisyyksiltä, hinta ja aika, kun VS:n sarja on mukana.** Pohja `sk-d8.txt` (oikea järjestys ja aloitus). Pariisin kuvat samoilla etäisyyksillä ja kulmilla (kaukaa 0,06, keski 0,02, matala 68–78°). Hinta: palat 309 Mt + F2:n luvut; aika alkoi 22.59 (PT kirjaa).
4. **Malleilla uusi iPad-kierros?** F2 on alaraja. Ehdotin KK:lle tarkistusta samalla tavalla, kun sarja on valmis; KK ei vielä vastannut. Käytä `sk-f2.txt`:ää, palat ovat laitteella d4:nä (uudet kopioitava omaan kansioon).
5. **Varjot:** tarkista VS:n kuvasta. Talot eivät heitä varjoa Pariisissakaan.
6. **Kainalo:** Pariisi 0 osumaa, kerrottu. Muut kaupungit aamuun PT:lle, ei yöllä.
7. **Kartta (juoksupeli)** odottaa LAV:n sanaa ennallaan.

## 4. Uudet työkalut (`/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/lontoo/`)
- **Palat:** `LONTOO_PUUT=$PWD/osm/puut-d7.json LONTOO_RAJA=51.465,51.535,-0.215,0.015 LONTOO_LIDAR="/Volumes/T7 4TB/koodaus/proto-arkisto/_tyo/pelikoodari/lontoo-d/lidar" /opt/homebrew/opt/python@3.14/bin/python3 a/tee-palat-lontoo.py $PWD/osm-d6 $PWD/palat-X $PWD/a/korvaa-tyhja.json $PWD/a/siisti-d6.json`, noin 1 min 20 s. Aina uuteen kansioon.
- **Lista:** `a/tee-siisti-d6.py <poistot-sarja.md> osm/osm.json a/siisti-d5.json a/siisti-d6.json a/lisatalot-d6.json`: lukee VS:n listan; museoista ääriviiva leikattuna laatikoihin (`osm-d6/osm.json` = osm + lisatalot; muut symlinkkejä).
- **Puut:** `a/tee-puut-d7.py osm/puut-d4.json osm/osm.json a/siisti-d6.json osm/puut-d7.json`: pois _pois-renkaista ja Albert Memorialin 40 m:ltä. Ei tunne mallin jalanjälkeä.
- **Pyyhintä:** `POISTO_MVT=$PWD/a/mvt-lisa POISTO_ALUE='[[51.505158,-0.188124,90],[51.482834,-0.009572,30]]' /opt/homebrew/opt/python@3.14/bin/python3 a/tee-poistot-lontoo.py osm/osm.json a/siisti-d6.json <proto>/Assets/Matkakirja/Kartta/TaloPoistotLontoo.cs a/poistot-d7.json`. `POISTO_ALUE` (Kensington, Cutty Sark) pyyhkii säteen sisällä myös OSM:n ulkopuolelta ja tulostaa lähirenkaat. `a/mvt-lisa`: 3 itse haettua z14-palaa (robots.txt antoi 403; tarkistin sen samassa komennossa eikä ennen hakua, kerrottu VS:lle). `Komennot.cs`: `talot kansio` hyväksyy suhteellisen polun Documentsista.

## 5. OPIT
- **Laitteella peli lukee komento.txt:n kerran sekunnissa, ja seuraava lähetys kirjoittaa päälle:** peräkkäiset `komento`-rivit vaativat `odota 2` myös kommenttirivien yli. Macin esikatselussa ei ongelmaa. F1 meni hukkaan: `talot 1` ei perillä, joten tarkista `talot tila` ennen lukuja.
- `ui matkakirja pieni` pienentää avauskortin, mutta vapauttaa samalla saapumisen maan näkymään, joka nollaa kallistuksen: aja se + odota 12 ENNEN kallistusta ja ajaa. `ui sulje` ja `ui luento <k> loppu` eivät auta.
- Laitteen skenaariossa `kuva X` on vain merkki (`ruutu`); kuva: `komento kuva X`, tiedosto Documents/X.png.
- Vertaa koko skenaariota ennen kuin kutsut ajoa toistoksi: luovutuksessa 78° oli väärin, c2 oli 68°, ja D6 ei siksi testannut katkosta.
- Skenaarion vaihto `os.replace`:lla ei vaikuta jo alkaneeseen ajoon: JU:n ajo pitää aloittaa uudelleen.

## 6. Sivussa
- JU:n kaksi vuoronäppäilyä katkaisivat F:n (lukko päästää saman roolin läpi); `vanha/` ja `vanha2/` eivät ole muistituloksia. JU korjasi.
- Viestiraja: `SendMessage` pysähtyi kymmenen viestin jälkeen → `mcp__ccd_session_mgmt__send_message` session-id:llä.
