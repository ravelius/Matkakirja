# Pelikoodari: luovutus 6.11.2026 klo 22.08

Korvaa kaikki aiemmat luovutukset, niitä ei tarvitse lukea. **Lepo PT:n sanalla: kartta odottaa LAV:n leivontaa, ei uutta erää. Taso 1 on yhä pääasia.** Ei ajoa käynnissä, ei omaa vuoropyyntöä JU:lla.

Lukulista Raamatusta: luku 2 kohdat 2.0, 2.1–2.27, 2.59–2.71 ja 2.177:n alku, luku 4 kohdat 4.1–4.7, luku 6 kohdat 6.1–6.14 ja vastuukartan rivi. Remote päällä.

## 1. Paikat
- **Proto:** `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`, haara `pelikoodari/tarkastelu-219`, kärki `36aa43ed3`, Unity b8, puhdas, ei pushattu, noin 100 omaa committia rungon edellä. **Ei junaan haarana.**
- **Runko:** JU:n mukaan `julkaisija/runko-219-muisti` = `603d4213a` (pikakelaus, natiivi-backup). Paikallinen ref proton worktreessa näytti vielä `d092f48cc`:tä: fetch ensin. Yhdistä runko protoon, kun jatkat koodia.
- **Ajotyökalut:** `/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/vapaa-1/`: `sk-w.txt` (renkaat), `sk-u.txt` (oven pysähdys), `sk-m.txt` (esinekoe), `aja-w.zsh <linja> <sha> [ipad|iphone-vaaka]`, `aja-w-molemmat.zsh` (sha ja linja kiinni). `leivo-lehti.py <glb> <ulos.png>`. Lokit `/Users/Shared/Claude/proto-3d/lokit/esikatselu-*`.

## 2. Tänään valmista
- **OMISTAJAN PÄÄTÖS 17.16 (KK): peukalorenkaat kelpaavat läpikuultavina ja menevät avoimeen junaan.** PT kuittasi junaan 219, JU yhdisti runkoon: `ae161fdb6`.
- **Mitä se sisältää:** ulkorengas 140 pt ja sisärengas 64 pt, vasemmalla piste, oikealla kulmanuolet yhtenä viivana, ryhmän peitto 0,55, ulkorengas turva-alueella, näkyy vain kunnes pelaaja ohjaa. Mukana 3 riviä `81d3e839c`:stä (uusi juoksu näyttää peukalokohdat).
- **Nähty pelistä `36aa43ed3`:sta:** iPad `lokit/esikatselu-20261106-170615`, iPhone `-170959`. iPhonen ulkoreuna 62 pt, iPad 123 pt. Vaalealla kontrasti 1,25–1,62, kerrottu omistajalle.
- **Web:** OHJAINOPETUS-pohja vastaa päätöstä, PR 6368 yhdistetty (`71d9e97f9`). Proton `tyylikirja.json`-kopio jätettiin generoimatta, koska rungosta puuttuu myös karttapaletti v2; seuraava generointi (`node tools/tyylikirja.mjs --natiivi <proto>`) tuo molemmat. Älä muokkaa kopiota käsin.
- **`unity-tarkistus.sh` korjattu runkoon** (`a458e4e5c`, `603d4213a`): kaatunut kääntäjä on nyt virhe.

## 3. Ei junassa, auki
1. **`292afcef2` (luettelon ulkopuolinen esine saa yleishuudon, ei kuplaa eikä loppukortin riviä):** vain protossa. PT: ei junaan, koska sitä ei ole nähty pelistä. Katso seuraavan juoksupelin ajon mukana (`sk-m.txt`:n `esinekoe tielle` osuu kukkaruukkuun).
2. **Näkemättä pelistä:** renkaiden häivytys liikkeessä, oikea laite, ensikertalaisen opetus (`opetus 0` on ajoissa; opetuksessa ohjeen kohta on punainen syke ilman rengasta), liike oven ohi lähellä seinää (`sk-u` on vain pysäytyskuvia), rajaviesti ajon mukana.
3. **Kartta (seuraava työ, kun LAV sanoo):** LAV vahvisti 7 seinääni kuvin (myös (-275,8), (155,1), (-81,1)); pois kuvalla (-105,4), (-69,8), (-95,2) x 2. (206,2):ssa todennäköinen toinen rako noin (199,5; 431,5): katso kartalta. Lista `Muuri/KORJAUS.md`. **Karttaa ei ajeta ennen LAV:n sanaa.** Sitten kartta ja `tyokalut/kulkukartta-rajat.py` uudelleen (`Resources/JuoksuKulkuRajat.bytes`); testi `KynnysViestiYltaaRajoille` tarkistettava (viimeksi 399/408). PK vahvistaa viittaukset ennen vientiä.
4. **Muut:** 19 vinoreunaista katon alaa ilman seinälinjaa (`kuistit-1.png`, `-2.png`), syy tuntematon: selvitä, näyttääkö se pelissä näkymättömältä seinältä. Lattian valkoiset katkoviivat, kaiteen raidoitus. Omena `omena-mata-v3` ei junaan ilman PT:n lupaa.
5. **Ovi:** `ovikoe juuri` pois uusista käsikirjoituksista, ovi tulee mediasta. Vanhat sk-tiedostot osoittavat `mallit-v1`:een (musta merkki palaa), `sk-u.txt` `mallit-v2`:een. Mediassa v2 polussa `ovi-v1`; seuraava mallimuutos uuteen kansioon. Kameran väistö 0,7 m oven kohdalla (lokista).

## 4. Ohjaus koodista (`JuoksupeliNakyma.cs`)
Oikea peukalo: sivulle käännös, ylös hyppy, alas liuku, napautus kaista. Vasen: napautus heitto eteen, ylös spurtti, alas heitto taakse. Spurtti vain viitan kanssa. Renkaat eivät näytä kaikkea ohjausta (kerrottu omistajalle).

## 5. OPIT
- `unity-tarkistus.sh` ajetaan `sh`:lla tai `bash`:lla. zsh-ajo epäonnistuu nyt näkyvästi. Varoituksia pitää olla satoja.
- Mittaa väri kuvasta: lineaarisessa väriavaruudessa USS-arvo 70 % näytti lähes umpivalkoiselta. Läpinäkyvyys paljastaa päällekkäiset palkit, joten piirrä kuvio yhtenä viivana.
- Poiminta rungolle: `git merge-tree --write-tree --merge-base=<c>^ <pohja> <c>` kokeilee ilman worktreetä.
- Vuoropyynnössä JU:lle rivi "mitä tämä ratkaisee" ja skenaarion täysi polku (Raamattu 10.5). Aja vasta "ESIKATSELU NYT" -viestistä, ilmoita "LUKKO VAPAA".
- Kuvan renkaat: `opetus 0` on pakollinen kahden renkaan kuvaan. `kuva` väliin ei riko reittiä, kun keisari odottaa seinällä. `min(rgb)`-kynnys mittauksessa noin 170 läpikuultavalla viivalla.
- Tarkista KK:n pyyntö omistajan aiempia sanoja vasten; koodin kommentti voi kertoa päätöksen, jota lokihaku ei löydä. Julkista URL:ia ei koeteta ennen vientiä (`aws s3 ls` JU:lla).
- `print ===` ja `echo ===` kaatuvat zsh:ssa: käytä `print -- ---`.

## 6. Lisäykset 6.11. klo 22.08 (uudella tilillä)
- **Vie sisältöpaketti korjattu:** PT:n käskystä PR 6393 (`2265ccceb`, `apt-get update` ennen python3-pil:n asennusta). Ajo 42282734337 onnistui ja vei v1011:n, osoitin vaihtui. Työnkulku ei aja PR:ssä, joten korjaus todentuu vasta yhdistämisen jälkeen. Väliaikainen worktree `pk-vie-sisalto` poistettu.
- **LAV:n kävelytarkistus (levyt3) tehty, ei vientiä:** tulos ja kohdat `/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kulkukartta/levyt3-kavely.txt`. Peli lukee lattian `JuoksuKulku.bytes`:stä, joten verkon lasku vaikuttaa vasta kartan uudessa ajossa. Avoinna LAV:lla: 3 vanhan korkeuden levyä esteinä. Ovia siirtyy 6.
- **Koeajon työkalut samassa kansiossa:** `aja_koe.zsh` (käyttää vierellä olevaa `kartta_koe.py`:tä), `vertaa_levyt.py`, `katoavat.py`. Tulokset `/Volumes/T7 4TB/koodaus/proto-arkisto/_tyo/pelikoodari/kulkukartta/koe-levyt2` ja `koe-levyt3`. Python ilman `-I`:tä, koska numpy ja scipy ovat käyttäjän site-packagesissa.
- **Lepo jatkuu:** kartta peliin vasta LAV:n sanalla (kohta 3.3), ja sitten myös `JuoksuOvet.json` uudelleen.
