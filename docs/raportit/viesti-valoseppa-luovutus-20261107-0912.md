# Valosepän luovutus 7.11.2026 klo 09.12. Itsenäinen: vanhoja ei tarvitse lukea

Syy: konteksti yli 25 %, PT 09.1x "tee luovutus nyt". Tili vvi@vvi.fi. Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup`. Kuvat vain JU:n vuorolla (`local_06f8c680-4618-42bd-a730-9b6a3e17e0b7`), ei omaa ajoa. Ei skriptattuja hakuja OpenFreeMapista (2.183).

## 1. TYÖ NYT
Ei aloittamatonta työtä. Odotetaan PT:n ja KK:n (omistajan) vastausta kiviin. Mikään kivihaarasta ei mene junaan ilman PT:n sanaa.

## 2. MUURIN KIVET (omistaja 08.30 ja 08.54; haara `linssiseppa2/kivisivu`, pohja 3ba5bb57e, worktree k31; ei junaan, ei TF 219)
Omistajan sanat: sivut tummenevat parin oikean puolen tapaan (kuvat-kivisivu1/pari-perus-tumma-050.png), kivi asettuu lattiaan, kuvio näkyy; saumat, viivat ja sävy korjataan tämän jälkeen. 08.54: muurien juuren pitkät vaaleat reunakivet tummenevat samaan tapaan, kokeena (PT vahvisti, loki PR 6438).
Commitit: 138220e77 sivut (kerroin 0,424 0,463 0,526, koska parin QA 0,5 korvasi sävyn 1,18 1,08 0,95); 352e3f98f reunakivi (`_JuoksuKujaKiviReuna`, `ValoKohteet.JuoksuKujaKiviReuna` 0,5, QA `valo savy kujakivireuna r g b 1`, JuoksuMaailma `_KujaKivi 3`, koko kivi); e1b8a1091 sauma tummenee kiven mukana ja sivun kerroin tasainen 0,46, sävy pysyy lämpimänä.
Ajot, kansio `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/kivisivu/`, luvut `MITTAUS.md` samassa:
- kivisivu2 (138220e77, 7o): sivu = tumma-050, lin. 1,000.
- kivisivu3 (352e3f98f, koejuuri-kivisivu2): kamera A reunakivi 201 188 196 -> 145 132 138; B ja 0-2 eivät näytä kiveä.
- kivisivu4 (e1b8a1091, 7o): sivu 125 118 112, luminanssi 1,003; sauma 81 71 60 -> 51 44 36.
- kivisivu5 (e1b8a1091 + LAV:n koejuuri-kivisivu2, PT:n sana): vaalea viiva ja lattian hiusviiva poissa, sauma tumma. Uusin pari KK:lla: `kuvat-kivisivu5/pari-paaty-ennen-jalkeen.png`, `pari-pelia-ennen-jalkeen.png`.

## 3. AVOIN
- PT 09.1x: yläpintojen ero (rako0) auki. `kuvat-kivisivu5/pari-rako0-ennen-jalkeen.png`: sininen yläpinta ei tummene; vaalea ruskea vyö ja laventeli yläreunassa tummenevat. Arvio reunakiven kerroin, materiaalia ei tunnistettu. Vertailu ei puhdas: LAV:n rako0-perus on QA `savy reunus 1 1 1 1`. Puhdas ennen-kuva saa reunakiven osalta QA:lla `kujakivireuna 1 1 1 1`.
- Tumma kolmio lattialla jää (LAV: valo-UV ja leivonta, ei tästä). Irrallinen vaalea laatta reunakiven vieressä ei tummene (ei `_KujaKivi 3`).
- Ei katsottu: muut paikat, liike, iPad. Koejuuren kivisivu2 mallikorjaus on LAV:n, koskee vain 0-1 lod0:aa, eikä koko muuria saa sanoa korjatuksi (`muuri/KORJAUS.md`).
- Viimeinen sivukerroin on laskettu ja mitattu vain paaty-kamerasta. Sävyä ei ole verrattu havainnekuvaan.

## 4. MUUT TEHDYT 7.11.
Rappaus, kolmas ja viimeinen (PT: ei neljättä): 2e1d2b87d, `linssiseppa2/rappaus-laikut`, kerroin 1,58 0,39 0,35, keskisävy y3/nyt lin. 1,012 0,992 0,994 painotettuna, kameroittain heittää 2-12 %. PT hyväksyi ja vie itse KK:n aamun koontiin. Luvut `_tyo/linssiseppa2/rappaus/MITTAUS.md`.
Lähiympäristöt 974a75318 ajossa 44 (KS, b58c19ea9): 45°-kuvat täysikoossa, ei uutta rikkoutumaa. Panthéonin haamumuodot eivät tule pohjakuvasta r8; lähde kartan puolella, taso selvittämättä, KS:n palatyö. Korjaus arvioon: r8:ssa heikko kuvioreunus jää rakennuksen ympärille.

## 5. VANHAA AVOINTA
Sacré-Cœurin kaista ja Panthéonin aukio vaativat talojen palautusta (KS). iPad-mittaus ääriviivoista ennen junaa, ei yöllä. PT:n sana, viedäänkö pariisi-valo Y:hyn (KS otti valomuodon ajoon 43). Lontoo: sarja kelpaa (e973cef98, `linssiseppa2/lontoo-c`, k32), heikot KK:lla.

## TEKNIIKKA
Python + PIL `/opt/homebrew/bin/python3`; numpy, cv2 `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I`. `sh ./unity-tarkistus.sh` kansiosta `Linssit-testit/` (ei tarkista varjostimia). Worktreet `/Users/Shared/Claude/wt/proto-linssiseppa2-kNN`: k17 pariisi-valo, k31 kivisivu, k32 lontoo-c. Ajotapa: `_tyo/linssiseppa2/kivisivu/aja-kivisivu5.zsh <linja> <sha>` JU:lta. HUOM varjostimessa: `if (kujaKivi) ... else` -rivin väliin ei saa lisätä riviä. Seuraamattomat `.claude/settings.local.json.ennen-kevennysta` ja `waveletNoiseTile.bin`: ei koskettu. Kotihaara on jäljessä: luovutus plumbingilla. Viestit: SendMessage pysähtyi viestirajaan tässä sessiossa; varakanava `mcp__ccd_session_mgmt__send_message` toimi.
