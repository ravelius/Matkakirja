# Valosepän luovutus 7.11.2026 klo 03.40. Itsenäinen: vanhoja ei tarvitse lukea

Syy: konteksti 27 %. Tili vvi@vvi.fi. Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup`. Kuvat vain JU:n vuorolla (`local_06f8c680-4618-42bd-a730-9b6a3e17e0b7`), ei omaa ajoa. Mikään ei mene junaan. Ei skriptattuja hakuja OpenFreeMapista (2.183).

## 1. TYÖ NYT, PT 03.4x (ALOITTAMATTA, VAIN KATSOTTU)
PT:n sanat: "kohta 1 lähiympäristöt, oma LISTA.md (kovat-varjot/ajo28). Katso ensin KS:n ajo 40/42:sta, mikä on jo poissa, ja tee vain jäljellä olevat: Sacré-Cœurin mäen terävä soikio ja vaalea rengas; Panthéonin ja Opéran laaja laatoitus; Invalidien vaalea laikku Rodinin yli; Notre-Damen tornin tumma raita. Kaksi yritystä per kohde, yksi yhteinen ajo. Kokeena, ei junaan; ei paloja, jos KS:n syöte riittää, ja sano KS:lle, mitä tarvitset. Parit täysikoossa PT:lle."

Ajot 40 ja 42 eivät näytä näitä kohteita (joki ja sillat). Tuoreimmat kuvat: `lokit/karttaseppa-yhteinen-38-b8-f6625e82d/v17-sacre-coeur-45-v17.png`, `-37-b8-eec08f293/r2-pantheon-45-v16.png`, `-39-b8-22339908e/v39-opera-45-v18.png`, `-39-b8-22339908e/v39-invalidit-45-v18.png`, `-35-b8-00dea49d1/sv-notre-dame.png`. Arvio vain näistä, ei uudesta ajosta:
- Sacré-Cœur: soikio jäljellä, reuna terävä. Vaalea rengas jäljellä, kapeampi kuin ajossa 28.
- Panthéon: laatoitus yhä laaja, etenkin pohjoisessa; taloryhmä ei enää leikkaa. Opéra: laatoitus kapeni selvästi, katuviivat kulkevat yhä sen yli. Opéra ehkä riittää; päätä täysikoossa.
- Invalidit: laikku jäljellä, Rodinin rajaus (kaksi oliiviraitaa).
- Notre-Dame: tumma tyvi tornin alareunassa jäljellä myös mallissa lod5 (#2184). Rajaus `_tyo/karttaseppa/lahialue-20261106/notre-dame-tyvi-2x.jpg` on vanhemmasta mallista.

Ehdotetut keinot, yhtäkään ei kokeiltu:
- Pohjat ovat PNG:itä, 1536 × 1024, RGBA: `Assets/Matkakirja/Kartta/Resources/NotreDameKoe/<id>-pohja-rN.png` (uusimmat invalides r7, pantheon r5, opera r7, sacre-coeur r6). Alfan alle jää kartta. Uusi versio uuteen tiedostoon (r8), ja ajoon rivi `komento koepohja <id> NotreDameKoe/<id>-pohja-r8`; koodia tai paloja ei tarvita. Kuvan pieni osa on peitetty (alfa > 10: invalides 17,6 %, pantheon 6,9, opera 4,6, sacre-coeur 9,5).
- Invalidit: laikku on pohjan oikea alakulma, noin x 860–990, y 690–965 (katsottu pienoiskuvasta, tarkista). Häivytä alfa sieltä; oliiviraidat ovat Rodinin puutarhaa, joten pidä ne tai kysy KK:lta.
- Panthéon ja Opéra: pienennä peittoa mallin ympärille pehmeällä alfalla. Opérassa viivat ovat pohjan omia tai kartan (tarkista).
- Mäen soikio: malli `paletti-v2/sacre-coeur-maki` (6 909 kärkeä, y −24,8…74,5, x ±125, z −229,5…249,5, oma jpeg-atlas), jono MakiJono 3078. Väripassi on jo sekoittava (`Blend SrcAlpha`), joten yritys 1: varjostimeen materiaaliarvo `_MakiReuna` (oletus 0 = ei vaikutusta), joka häivyttää alfaa mallin korkeuden mukaan alareunassa. Vaatii object y:n väliarvoon `NotreDameKirkkoYhteinen.hlsl`:ssä. Rajat katsottava: mäen reuna ei ole y = 0:ssa. Yritys 2: pelkkä väri, atlas kohti kartan pohjaa reunalla.
- Rengas: KS:n hypoteesi `_tyo/karttaseppa/parit-yhteinen-39/ARVIO.md` kohta 2: 25 m:n raja poisti 171 taloa (`lahialue-20261106/ryhma4/d25b/talot.json`). Jos pohjan alfa ei riitä, se on KS:n palatyö: kysy KS:ltä, älä tee paloja itse. Ei ole sama kuin ohut tumma kaari.
- Notre-Dame: mittaa ensin, onko tummuus atlaksessa (keskivalo y < 2 m vs. y 5–10 m). Jos on, nosto varjostimessa tai atlaksessa; malli on KS:n/Codexin, joten kerro heille.

Kaksi yritystä per kohde, sitten yksi yhteinen ajo JU:lla. Lista: alku `_tyo/karttaseppa/sk-pariisi-yhteinen-43.txt` riville `odota 120` asti; siinä koepohjat ja palat `palat-v20-ryhma4`. Pohjaksi KS:n `karttaseppa/ajo-yhteinen-43` (477d31ed9; sisältää valomuodon ac508f55e), mutta tarkista ensin, valmistuiko ajo 43. Parit samalla kameralla (nykyinen | koe), täysikoossa, kohde kokonaan, ensin PT:lle.

## 2. TEHTY TÄLLÄ VUOROLLA
- Rosoisuus suljettu, PT kuitannut: `_tyo/linssiseppa2/rosoisuus/TULOS.md`. Notre-Damen portaat ovat kuvien mukaan mallin tukipilarit (ei mitattu), ei laskentavika.
- Testi c94e6ce51 (`linssiseppa2/pariisi-valo`, k17, pushattu `natiivi-backup`, ei Y:ssä): `AariviivaVastaaPelinLukemaaMallia`. Kartta-testit 697/697. Raja 0,93, Sacré-Cœur 0,85 (korkeus mäen pinnasta, 0,87). Notre-Dame 0,937: syy todennäköisesti tasoitus, ei varmistettu.
- Tower Bridge sovittu PK:n kanssa: `ohjelmakohteet akselit`, PK:n fdbf8a0ef, kuvat PK:n ajosta. Huomautin: y 2,0 nostaa pohjoispään noin 2,9 m ilmaan, ja x 1,15 vie päät noin 24 m talojen päälle. Kuvia ei ole nähty; mallikoodia ei muutettu.
- Pariisi valmis -lista käyty: `linssiseppa2/pariisi-valo` ac508f55e, EI Y:ssä erikseen. Usva 12 km pysyy (KK 03.28), 16 km kytkimen takana (`usvakauas 1500 16000`), pari aamun kysymykseen. Saumat: ei ratkennut, ei jatkoa ilman sanaa. Mäen kaaren syy todistamatta.

## 3. AVOIN
iPad-mittaus ääriviivoista EI yöllä (PT 03.4x, linjaus 23.45): ennen junaa. PT:n sana, viedäänkö pariisi-valo Y:hyn (KS otti valomuodon ajoon 43). Lontoo: sarja kelpaa (e973cef98, `linssiseppa2/lontoo-c`, k32), heikot KK:lla. Listan jälkeen JONO TYHJÄ -rivi PT:lle.

## TEKNIIKKA
Python + PIL `/opt/homebrew/bin/python3`; numpy, cv2 `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I`. `sh ./unity-tarkistus.sh` kansiosta `Linssit-testit/` (ei tarkista varjostimia; Shader error JU:n ajosta). `sh Kartta-testit/kaanna.sh [nimi]` ilman editoria. Worktreet k17, k31, k32 (enintään 3) kansiossa `/Users/Shared/Claude/wt/proto-linssiseppa2-kNN`. JU kuittaa ajot, mutta kuvia ei arvioi: varmista aina, että kuvat ovat kartalta. Seuraamattomat `.claude/settings.local.json.ennen-kevennysta` ja `waveletNoiseTile.bin`: ei koskettu. Kotihaara on jäljessä: luovutus plumbingilla (GIT_INDEX_FILE, read-tree origin/main, hash-object, update-index, write-tree, commit-tree, push). Viestit: SendMessage, varakanava `mcp__ccd_session_mgmt__send_message`.
