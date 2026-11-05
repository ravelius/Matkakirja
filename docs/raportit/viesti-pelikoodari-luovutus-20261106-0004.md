# Pelikoodari: luovutus 6.11.2026 klo 00.04: ovipari KK:lla, 51 tilaa LAV:lla, odotan seiniä

Täydentää -2215:tä; sen kohdat 0, 0b ja 0c ovat tässä korvattu, muut pätevät. Proto-worktree `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`, haara `pelikoodari/tarkastelu-219`, kärki yhä `35140432d`: tässä sessiossa ei muutettu pelikoodia eikä ajettu Unityä. Ei junaan. **Taso 1 on yhä pääasia.**

7.47: Raamatusta luettu vain 7.37 hakuna, lukulista ja periaatteet lukematta. Seuraaja: lue ne ensin.

## 0. Sitovat päätökset (KK 23.57 ja 00.00, PT 23.5x ja 00.0x)
1. **Ovet: oletus sisäänpäin, ei junaan.** Omistaja päättää; KK näyttää parin hänelle aamulla kortilla. Koodin oletus on yhä ulos (`LehdetSisaan` false), joten ajoissa `ovikoe lehdet sisaan`. Älä vaihda oletusta ennen omistajan vastausta.
2. **Rajaviesti `35140432d` JÄÄ** kohtiin, joissa keisari pysähtyy ilman seinää. **Ei poistoa:** PT:n viesti "poista, kun seinät ovat aukoissa" on PT:n itsensä oikaisema. Ei junaan.
3. **Suljetaan seinällä:** 41 tilaa + 10 lisää = 51 tilaa, 76 aukkoa. LAV tekee, 41 voi aloittaa heti. Seinät LAV:lle ohjeena, ei omaa mallia.
4. **Tila, jolta puuttuu koko sivu, ei ole kuisti** (KK).

## 1. Odottaa muita
- **KK:** kaistaleet (−147,7; 244,3) ja (−186,5; 497,6) (3 m syviä, pitkä sivu auki). Oma suositus: kuisteiksi, rajaviesti jää. Vastaus LAV:lle.
- **LAV:** seinät. Viesti 00.0x oli jonossa, ei vielä luettu lähetyshetkellä. LAV:n nollaus oli tulossa; tarkista, että lista `docs/raportit/viesti-pelikoodari-aukot-20261105.md` päätyi sen aloitukseen. LAV kertoo vientiversion.

## 2. Kun seinät tulevat
1. Kartta ja `tyokalut/kulkukartta-rajat.py` uudelleen (`Resources/JuoksuKulkuRajat.bytes`): suljetut aukot putoavat rajoilta itsestään. Testi `KynnysViestiYltaaRajoille` (399/408) pitää tarkistaa.
2. Puuttuuko joltain talolta ovi: sama ovi samalla säännöllä, ei uutta sääntöä (KK). 41 tilalla 51:stä ei ole ovea 3 m:n sisällä; kauempaa ei tarkistettu.
3. **Kuva sama kamera ennen ja jälkeen KK:lle täysikoossa katsottuna.** Ennen: ajon 220320 `x1-kuja-pohjoisesta.png`; sama kamera `_tyo/pelikoodari/vapaa-1/sk-r.txt` rivi 77:n edeltä.
4. Rajaviesti ajon mukana pelistä: ei ole vielä nähty. Mahdollinen virhe: viesti seinällä 3 m:n sisällä rajasta (ei mitattu).
5. Koko 20 pisteen lista yhdellä ajolla seuraavan LAV-viennin jälkeen (`viesti-pelikoodari-tarkastelu-20-pistetta-20261106.md`, `0c436ec6b`). Ei ajoa pelkästään tätä varten.

## 3. Ovipari: mitä nähtiin (ajo `lokit/esikatselu-20261105-221417`, kuvat katsottu täysikoossa)
- Lehti tunnistuu sisäänpäin: ristikko näkyy o1, o3, o6; rengas o3, himmeä o6; o1:ssä rengas jää karmin taakse (päätelty). `valo` ennallaan.
- **Laikut vanhoja, mitattu:** o4 vs. o5 ero 0,3–0,7/255. `OvetPois` tuhoaa koko verkon, jossa täyte on, joten eivät täytteestä (`b0cbcfa3a`). Tarkempi syy mittaamatta.
- **Karmin kulma:** karmin oma; `dc38e2ddc` ei muuta karmia, sama q6:ssa (214330).
- Muut, KK:lle kerrottu: lehden reunan tummat piikit vain ulos-versiossa (samat q6:ssa, syy ei tiedossa), ristikon pieni kolmio o3/o6 (todennäköisesti mallin, ei tarkistettu), kivijalan vaalea läikkä myös ilman ovia.

## 4. Aukkolista: mitä mitattiin (`c4525a69b`, `8e8aa74b9`)
Kartta v19. Kaikki 172 kohtaa ryhmitelty 115 alueeseen; ryhmittely alueen reunan avoimesta osuudesta (alle 30 % = aukko). Kuistit katsottu ylhäältä kaikki 34; ei pelikuvia kuin kuja.
- **Auki:** 19 vinoreunaista katon alaa ilman seinälinjaa (`kuistit-1.png`, `-2.png`): rajaviesti jää, mutta kate ulottuu vinosti ilman syytä. Voi olla kartan tai taustan vika; selvitä, näyttääkö se pelissä näkymättömältä seinältä keskellä avointa. Ei kerrottu syytä, koska sitä ei tiedetä.
- **Auki:** sali (1,5; 0,9) on oikean talon pohjalla 96 %. 321 talon pohjalla olevaa kohtaa on tarkistamatta, ja samanlaisia voi olla. KK tietää.
- **Auki:** (125,0; 338,8) näyttää katon alalta talon ympärillä, on 41:ssä; LAV:lle sanottu.

## 5. Avoimet
-2215 kohdat 3 (ympärikäännös ei todistettu, älä toista odota-peli-tiheänä), 4 ja 5 pätevät: koonti KK:lle kuvien jälkeen, rikkoutuminen ja omena, LAV:n koristeet, `huuto yleinen ""`, lattian valkoiset katkoviivat, kaiteen raidoitus.

## 6. Työkalut
Scratchpad `/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-pelikoodari/d52661bb-bb66-4469-a0db-378be8d56266/scratchpad/`: `aukot.py`, `aukot2.py`, `aukot3.py`, `aukot4.py`, `kuistit.py`, `lisalista.py`, `ero_o4_o5.py`. **numpy ja scipy vain `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python`:ssa.** Alueet myös raportin `.json`:ssa.

## OPIT
- Ensimmäinen luokittelu (aukko vs. alueen leveys) kuulosti järkevältä, mutta kuvista näkyi, ettei se erota tiloja kiiloista. Katso otos ennen kuin lähetät luvun.
- Rajalla oleva luku on arvio: kerro raja ja rajatapaukset samassa viestissä. KK löysi niistä säännön korjauksen.
- `SendMessage` ei löydä nimellä PT:tä tai KK:ta: käytä `mcp__ccd_session_mgmt__send_message`ä id:llä.
- Peruutettu käsky voi tulla seuraavassa viestissä: kirjaa uusin päätös, ei ensimmäistä.
