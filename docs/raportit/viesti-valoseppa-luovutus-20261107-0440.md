# Valosepän luovutus 7.11.2026 klo 04.40. Itsenäinen: vanhoja ei tarvitse lukea

Syy: konteksti yli 30 %. Tili vvi@vvi.fi. Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup`. Kuvat vain JU:n vuorolla (`local_06f8c680-4618-42bd-a730-9b6a3e17e0b7`), ei omaa ajoa. Mikään ei mene junaan. Ei skriptattuja hakuja OpenFreeMapista (2.183).

## 1. TYÖ NYT, PT 04.4x (ALOITTAMATTA)
Juoksupelin rappauksen laikut, KOLMAS JA VIIMEINEN yritys, vain kerroin. PT:n sanat: "kolmas ja viimeinen yritys, vain kerroin 1,58 0,39 0,35, muuta ei." Jatkaja ajaa JU:lta, parit A ja B samasta rajauksesta, kerro keskisävy nyt-kuvaan verrattuna. "Jos ero jää, 710cc220e tai uusin jää kokeeksi KK:n aamun koontiin; ei neljättä. Seinän ristiviiva ei kuulu tähän."
Tee: haara `linssiseppa2/rappaus-laikut` (710cc220e, pohja 36aa43ed3, worktree k31): muuta `ValoKohteet.JuoksuK11RappausSavy` arvoon (1.58, 0.39, 0.35) ja kommentti, commit ja push `natiivi-backup`. Kopioi `_tyo/linssiseppa2/rappaus/sk-rappaus-2.txt` nimelle sk-rappaus-3 (vaihda sha 1. riville ja kuvien y2 -> y3; nyt-vaihe saa jäädä). Ajo JU:lta, 6 kuvaa, noin 4 min, sama tapa, kansio `lokit/linssiseppa2-rappaus-3-<sha>`. Mittaus: kopioi `mittaa-2.py`, vaihda kansio ja y2 -> y3; se tekee luvut ja parit (kamerat A ja B, sama rajaus). Katso parit, kirjaa MITTAUS.md:hen, raportoi PT:lle keskisävy koko punaisella seinällä nyt-kuvaan verrattuna.
Nykytila 710cc220e: vakiot `JuoksuK11Rappaus` 0/0/0, rae-laikku 0, sävy 1,62 0,47 0,545; lisäksi QA `valo savy k11rappaus l v h 1`. Laikut poissa silmin ja mitattuna (A 5,9 -> 4,7 %, B 4,1 -> 2,2 %). Keskisävy ei pysynyt: punainen pysyy, vihreä +12 %, sininen +21 % lineaarisesti koko punaisella seinällä.
Luvut ja johto: `_tyo/linssiseppa2/rappaus/MITTAUS.md`; parit `rappaus/parit/pari-A-nyt-y2.jpg`, `pari-B-nyt-y2.jpg`; ajot `lokit/linssiseppa2-rappaus-1-5a025fc69`, `-2-710cc220e`. Laikku on 6 m:n kohinaa, joten yhden kameran rajaus ei ole seinän keskiarvo (A haalea, B tumma): vertaa koko punaiseen seinään. Ei katsottu liikkeessä eikä iPadilla. Seinän B:n ristiviiva ja A:n reunakivi eivät kuulu tähän (LAV).

## 2. TEHTY
Lähiympäristöt kuitattu (KK 04.28): valinnat `974a75318` (`linssiseppa2/lahiymparistot`, pohja da0a6ae6b, koe, ei junaan): Sacré-Cœur r8 ja mäki lahi-r8, Panthéon r8, Opéra r9, Invalidit r9 ilman oliiviraitoja, Notre-Dame ennallaan. Nimetty PT:lle ja KS:lle seuraavaan yhteiseen ajoon, kerrottu poistettavat koepohja-rivit. EI ole ajettu oletuksina. Arvio `_tyo/linssiseppa2/lahiymparistot/parit/ARVIO.md`.

## 3. AVOIN, AAMUUN (PT 04.3x)
Litteät ruskeat palat Opéran itä-, Sacré-Cœurin länsi- ja Panthéonin lounaispuolella, kun pohjaa kavennetaan. Tulkinta: kartan rakennustason renkaita, joita TaloPoistot ei poista; ei todennettu. Sacré-Cœurin kaista ja Panthéonin aukion leveys vaativat talojen palautusta: KS:n palatyö, pyydetty KS:ltä, ei paloja itse.
Vanhasta: iPad-mittaus ääriviivoista ennen junaa, ei yöllä. PT:n sana, viedäänkö pariisi-valo Y:hyn (KS otti valomuodon ajoon 43). Lontoo: sarja kelpaa (e973cef98, `linssiseppa2/lontoo-c`, k32), heikot KK:lla.

## TEKNIIKKA
Python + PIL `/opt/homebrew/bin/python3`; numpy, cv2 `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I`. `sh ./unity-tarkistus.sh` kansiosta `Linssit-testit/` (ei tarkista varjostimia). Worktreet k17, k31, k32 kansiossa `/Users/Shared/Claude/wt/proto-linssiseppa2-kNN`; k31 on haarassa rappaus-laikut. Juoksupelin ajo: JU käyttää LAV:n tapaa (tarkastelu-worktree, koejuuri-seina2). JU kuittaa ajot, mutta kuvia ei arvioi. Seuraamattomat `.claude/settings.local.json.ennen-kevennysta` ja `waveletNoiseTile.bin`: ei koskettu. Kotihaara on jäljessä: luovutus plumbingilla. Viestit: SendMessage, varakanava `mcp__ccd_session_mgmt__send_message`.
