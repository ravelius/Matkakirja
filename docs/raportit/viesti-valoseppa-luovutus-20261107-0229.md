# Valosepän luovutus 7.11.2026 klo 02.29. Itsenäinen: vanhoja ei tarvitse lukea

Syy: konteksti 26 %, pehmeä raja, luonteva tauko. Tili vvi@vvi.fi. Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup`. Kuvat vain JU:n vuorolla, ei omaa ajoa. Mikään ei mene junaan. PT:n rajat yöllä: vain Pariisi, Lontoo, juoksupeli. Jumi: kaksi yritystä tai noin 30 min, sitten rivi PT:lle tai KK:lle.

## 1. LONTOON SARJA: VALMIS
KK 02.28 omistajan valtuutuksella, kokeena, ei junaan: sarja kelpaa. Heikkoihin (Observatory, Victoria Memorial, Kensington) ei enempää yöllä; KK kertoo ne omistajalle. KK: seuraava työ PT:ltä.
Haara `linssiseppa2/lontoo-c`, kärki e973cef98, työpuu `/Users/Shared/Claude/wt/proto-linssiseppa2-k32`. Palat `pelikoodari/lontoo/palat-d7`. Ajot `lokit/linssiseppa2-lontoo-f1-39951594b` ja `-f2-e973cef98`. Parit `_tyo/linssiseppa2/lontoo-e/parit/`, tekijä `tee-parit.py`. NHM:n tornit 58 m (22680f8c6, Historic England).
Tower Bridge ja St Paul's on ajettu viimeksi c2:ssa, ei nykyisillä paloilla.

## 2. Z14-PALAT: PT RATKAISI 02.3x (Raamattu 2.183)
OpenFreeMapin ehdot kieltävät automaattisen datan keruun. EI skriptattuja hakuja sieltä, myös k22:n, k52:n ja k54:n hae-työkalut. Parit KK:lla pysyvät kokeena. PK korvaa kolme palaa (`pelikoodari/lontoo/a/mvt-lisa/14/`) planeettaotteesta; se on PK:n työ, ei sinun.

## 3. SEURAAVA: PARIISI VALMIS -LISTA (PT 02.3x, TÄSSÄ JÄRJESTYKSESSÄ)
Kuhunkin kaksi yritystä tai noin 30 min, sitten rivi KK:lle (`local_37f7c945-e1a0-4638-90b8-93c389a36fbe`: vika, kokeiltu, suositus) ja seuraavaan. Kuvat täysikoossa, ei junaan, parit PT:lle. Älä jää odottamaan KK:ta ennen seuraavaa kohtaa. Ei lepoa ennen kuin lista on käyty.
1. Palais Bourbonin piha ajosta 37/38, EI uutta ajoa. `sk-pb-piha.txt` pc-etela, pc-pohjoinen ajossa 37 (`lokit/karttaseppa-yhteinen-37-b8-eec08f293`) on katsomatta; KS:n ajo 38.
2. Kohta 2: mallin valo kääntyy kameran mukana, mutta varjo ei; Sacré-Cœurin varjo ja mäen ohut tumma kaari (syy varmistamatta).
3. Kohta 5: saumat ja laikut; metsä ennallaan.
4. 65°:n yläreunan vyö, La Défensen läpikuultavat tornit, maan viiva 75°.
Taustaa: `git show origin/linssiseppa2/luovutus-20261106-1826:docs/raportit/viesti-valoseppa-luovutus-20261106-1826.md` kohta 6.

## 4. MUUTA JONOSSA (LISTAN JÄLKEEN)
Rosoisuus. Ääriviivojen iPad-mittaus ennen junaa (PT).

## TEKNIIKKA
Python + PIL `/opt/homebrew/bin/python3`; numpy, cv2 `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I`. `sh ./unity-tarkistus.sh` kansiosta `Linssit-testit/` (sh, ei zsh). Geometria `_tyo/linssiseppa2/lontoo-e/aja-geometria.sh`: 11/12, `ConcordenAukionMitat` kaatuu pikakäännöksessä, ei liity Lontooseen. Seuraamattomat `.claude/settings.local.json.ennen-kevennysta` ja `waveletNoiseTile.bin`: ei koskettu. Kotihaara on jäljessä: luovutus plumbingilla (väliaikainen GIT_INDEX_FILE, read-tree origin/main, hash-object, update-index, write-tree, commit-tree, push). SendMessage voi pysähtyä: varakanava `mcp__ccd_session_mgmt__send_message`.
