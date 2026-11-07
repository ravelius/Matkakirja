# Valosepän luovutus 7.11.2026 klo 02.29. Itsenäinen: vanhoja ei tarvitse lukea

Syy: konteksti 26 %, pehmeä raja, luonteva tauko. Tili vvi@vvi.fi. Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup`. Kuvat vain JU:n vuorolla, ei omaa ajoa. Mikään ei mene junaan. PT:n rajat yöllä: vain Pariisi, Lontoo, juoksupeli. Jumi: kaksi yritystä tai noin 30 min, sitten rivi PT:lle tai KK:lle.

## 1. LONTOON SARJA: VALMIS
KK 02.28 omistajan valtuutuksella, kokeena, ei junaan: sarja kelpaa. Heikkoihin (Observatory, Victoria Memorial, Kensington) ei enempää yöllä; KK kertoo ne omistajalle. KK: seuraava työ PT:ltä.
Haara `linssiseppa2/lontoo-c`, kärki e973cef98, työpuu `/Users/Shared/Claude/wt/proto-linssiseppa2-k32`. Palat `pelikoodari/lontoo/palat-d7`. Ajot `lokit/linssiseppa2-lontoo-f1-39951594b` ja `-f2-e973cef98`. Parit `_tyo/linssiseppa2/lontoo-e/parit/`, tekijä `tee-parit.py`. NHM:n tornit 58 m (22680f8c6, Historic England).
Tower Bridge ja St Paul's on ajettu viimeksi c2:ssa, ei nykyisillä paloilla.

## 2. AVOIN PT:LLÄ: Z14-PALAT
PK haki kolme palaa (`pelikoodari/lontoo/a/mvt-lisa/14/{8183/5448,8191/5449,8191/5450}.pbf`) "samalta palvelimelta kuin peli"; robots.txt antoi 403. Isäntä on päätelmä, todennäköisesti kolmannen osapuolen `tiles.openfreemap.org` (`Laattapalvelin.Elava.cs:27`); tarkka polku vain PK:lta. Palat vaikuttavat todennäköisesti e973cef98:n poistoihin. PT 02.2x: jos isäntä on kolmannen osapuolen, palat eivät mene aineistoon ennen selvitystä. Vastasin PT:lle, en muuttanut mitään. Jos PT käskee poistaa, se on PK:n aineistoa.

## 3. SEURAAVA: PT:LTÄ
Tarjosin PT:lle Palais Bourbonin pihaa, ellei se määrää muuta (ei kuittausta luovutushetkellä). `sk-pb-piha.txt` pc-etela, pc-pohjoinen ajossa 37 (`lokit/karttaseppa-yhteinen-37-b8-eec08f293`) on katsomatta; KS:n ajo 38. PT: ei saa viivyttää Lontoota.

## 4. JONOSSA
Rosoisuus; mallin valo kääntyy kameran mukana, varjo ei; 65°:n yläreunan vyö, La Défensen läpikuultavat tornit, maan viiva 75°; `git show origin/linssiseppa2/luovutus-20261106-1826:docs/raportit/viesti-valoseppa-luovutus-20261106-1826.md` kohta 6. Ääriviivojen iPad-mittaus ennen junaa (PT).

## TEKNIIKKA
Python + PIL `/opt/homebrew/bin/python3`; numpy, cv2 `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I`. `sh ./unity-tarkistus.sh` kansiosta `Linssit-testit/` (sh, ei zsh). Geometria `_tyo/linssiseppa2/lontoo-e/aja-geometria.sh`: 11/12, `ConcordenAukionMitat` kaatuu pikakäännöksessä, ei liity Lontooseen. Seuraamattomat `.claude/settings.local.json.ennen-kevennysta` ja `waveletNoiseTile.bin`: ei koskettu. Kotihaara on jäljessä: luovutus plumbingilla (väliaikainen GIT_INDEX_FILE, read-tree origin/main, hash-object, update-index, write-tree, commit-tree, push). SendMessage voi pysähtyä: varakanava `mcp__ccd_session_mgmt__send_message`.
