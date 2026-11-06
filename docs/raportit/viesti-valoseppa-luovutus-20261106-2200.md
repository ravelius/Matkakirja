# Valosepän luovutus 6.11.2026 klo 22.00. Itsenäinen: vanhoja ei tarvitse lukea

Syy: konteksti 25 %, pehmeä raja. Tili vvi@vvi.fi, sessio local_fa464945. Kuvat vain KS:n yhteisessä ajossa, ei omaa ajoa; käännös JU:n vuorolla. Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup`. Ajoja ei ole käynnissä minulta.
Työpuut (enintään 3): `wt/proto-linssiseppa2-k17` varjo-aariviiva, `-k31` saumat-y, `-k32` maalattu-taivas. Mikään ei mene junaan.
Järjestys (PT): SAUMAT JA LAIKUT → SILLAN PÄÄ + PALAIS BOURBON → ÄÄRIVIIVAT → iPad-mittaus (omistajan 19.57 "ei iPad-mittauksia": kysy PT:ltä ennen). Kuvat PT:lle ennen KK:ta; saumoista etenemiskuvat heti PT:lle, koko kohde.
Ajo 31 valmis: `lokit/karttaseppa-yhteinen-31-b8-08f5ea7bf`, 08f5ea7bf, sisältää 9af846cec, f9fb1893d ja 3d6e35696. Shader error 0 (KS).

## TEHTY, EI TOISTETA
- Usvakoe: omistaja 20.58 "kelpaa kokeena näin vähäisellä usvalla", b3bff978f, koe, ei junaan, ei lisätyötä. Arvio `_tyo/linssiseppa2/usva-arvio-ajo30-20261106.md`.
- Taivas v2 #2182: arvio PT:llä, `_tyo/linssiseppa2/taivas-v2-arvio-ajo31-20261106.md`. Codex-kuittaus edb8eb9a3 postilaatikossa. Odottaa omistajan sanaa pelikuvasta. Etelä ja iPad kuvaamatta, koko 2,3 Mt yhä laskettu.
- Pont d'Iéna vaalea kaista on omistajan päätös 18.09, ei vika (KS). Kävely- ja metrosillat ohuina: omistaja 17.24.

## 1. SAUMAT JA LAIKUT (omistaja 19.57): PORTAAT F EI POISTANUT RAJAA
Tavoite: "Pariisin kartalla ei näy reunaa tai laikkua, jossa kartan pala selvästi vaihtuu toiseen." Raamattu 2.215.
RAJAT: metsän heikennys ennallaan (jos laikku vaatisi metsää, rivi PT:lle, älä muuta). Mäkien varjostus ei kuulu tähän. Ei iPad-mittauksia. 3D-rakennusten ajot edelle. Lukitus (arvot oletukseksi, ElavaTyyliVersio uusi, SHA:t KS:lle ENNEN) vain sanalla.
Koodi `f9fb1893d`, `linssiseppa2/saumat-y`, työkopio k31, oletus ennallaan. EI otettu: c430bcd40 (metsän alfa) eikä rinnevaloa (f028eb320, 5645d3afc, 8abcf1931). `rel` on `ReliefiOsuus(z)`, joten portaan 10 arvo ei enää vaikuta; `elavakartta portaat` ottaa yhä 11 lukua. HUOM: portaat 9 tuo maanpeitteen z11:lle; siinä on myös metsän väri: tarkista ennen lukitusta.
Mittaus 21.58, `se-45-laaja` (ennen) ja `sf-45-laaja` (portaat f 0.18 0.20 0.10 0.55 0.72 0.72 0.8 0.9 0.5 1 1): vaakaraja on molemmissa samalla rivillä y=950 (2752×2064). Rivien mediaanin hyppy koko leveydellä 4,5 → 9,0 /255, keskialueella x 760–1930 12 → 15 /255. Raja ei siis heikentynyt vaan kasvoi tällä mittarilla, vaikka kuvassa takana oleva alue näyttää vaaleammalta. Takana korttelit loppuvat, ja alue on vaaleampi. Mittasin vain tämän kuvan. KATSOMATTA: `se-z12..z16`, `sf-z12..z16`. Kirjoitin tämän PT:lle.
TODENNA syy paloista: kuvien .txt ja `loki.txt` (pyyntöloki päällä se-kuvissa). 5.11. havainto: z13:n keskialue erottuu, koska z12:lla ei ole rakennuksia; seuraava kokeilu katot z13 0,5, massa z13 0,12. Jos ei riitä, z12:lle rakennuskuvio z13:n datasta (kysy PT:ltä kulusta). 5.11. läiskien syy oli rinnevalo, joka on rajattu pois: jos jäljellä oleva laikku on sitä, rivi PT:lle.
Pystysauma: ehdokkaat 2,1095° ja 2,4611° (z10-sarake 518, z13:ssa), 2,2852° ja 2,4609° (z11-sarake 1037, z14:ssä), 2,373° (z12, z15). KS 5.11.: 2,3291° (z13-raja 4149), 45°:ssa hyppy 15–20 px. KS 20.0x: maastopalojen reunat eroavat x-rajalla 4149 enintään 9,5 m (kertoimella 19 m), samoin 2,2852° (7 m) ja 2,3730° (9,5 m); yhteys kuvaan epävarma. Tasainen kartta on oletuksena Y:ssä (1303df5fc: 10 km / 14 km / 90 m), joten reunaeron pitäisi kadota säteen sisällä. Montmartren reiän liukuvyöhykkeellä (noin 1 km keskipisteestä) se voi näkyä: katso. Tausta `pariisi-tyyli/striimi/pariisi-viat/TULOS-tikkaat-a5323cf4e.md`. Vanha kuva `lokit/esikatselu-20261105-211044/sauma-45-laaja.png`.

## 2. SILLAN PÄÄ JA PALAIS BOURBON (PT 20.1x): SEURAAVAAN AJOON, EI ALOITETTU
Tee, kun saumat on arvioitu, ennen ääriviivojen arviota: lyhyempi liuku kokeena. Ohuet sillat ennallaan. Pari nykyinen | uusi vähintään kahdesta sillasta, koko silta. Palais Bourbonille kamera samaan listaan; syy mitattuna ennen korjausta. KS:n yhteisessä ajossa, ei junaan. KS tietää, että lista on tulossa: lähetä hänelle.
Syy: `OhjelmaKohdeSillat.cs:444` (`1f - k`) ja `OhjelmaKohdeGeometria.cs:155` (`Sekoita(ajo, KatuKartta, Maa)`), asemat `SillanLasku`. Mitattu yhdestä sillasta (ajo 30 uv-nd-45-koe): kansi #b7a78a, kärki #e1c89a, ranta #e0c590. Väri ei ole väärä, liuku tekee haalean pään.
Palais Bourbon: harjakatto `Liuske` `OhjelmaKohdeRakennukset.cs:238-240`, kommentin mukaan tarkoituksella harmaa (a/viite/Palais Bourbon-6, -0). Todentamatta; `av-palais-bourbon.png` ajossa 31 voi jo näyttää sen.

## 3. KOVAT VARJOT: ÄÄRIVIIVAN KUVAT VALMIINA, ARVIOIMATTA
`3d6e35696`, `linssiseppa2/varjo-aariviiva`, työkopio k17. KS: varjostin ei kaatanut käännöstä eikä kuvia, koontia ei arvioitu. Kuvat `av-*` ajossa 31; parit ajon 28 `lokit/karttaseppa-yhteinen-28-b8-33ea85e3b/kv-*` samalla rajauksella (kv-eiffel, -sacre-coeur, -notre-dame, -sainte-chapelle, -grand-palais).
KK haluaa mukaan: kaikkien kohteiden kolmiot 233 265 → 1 467 (mallien varjot, tiedostot 27 kt; puut, pyramidit, ohjelmakohteet yhä ajossa). Eiffel 48 477 → 279, 5,1 kt, 28 aukkoa, 89 % aukkojen alasta. Keskusta on umpinainen jo mallissa. KK oikaisee omistajalle väitteen, että kevyt muoto vie aukot, kun kuva on tämän nähnyt: kerro kuvan tulos.
Sacré-Cœur: kärjet mäen pinnalla, mäki jono 3078, varjo 3079, kirkko 3080, sapluuna Always. Tarkista: kirkon varjo mäellä, ei nimien päällä. Mäen puiden varjot jäävät mäen alle, jos puita on (tarkistamatta).
Työkalu `_tyo/linssiseppa2/kovat-varjot/tee-aariviivat.py <työpuu> --kuvat <kansio>`. Aloittamatta (järjestys KK:lta): rosoisuus; Louvren ja Invalidien heikko varjo; mallin valo kääntyy kameran mukana, varjo ei. Hinta on arvio: junaan vasta mitatulla luvulla ja omistajan sanalla.

## 4. VANHAT JONON LOPUSSA
`git show origin/linssiseppa2/luovutus-20261106-1826:docs/raportit/viesti-valoseppa-luovutus-20261106-1826.md` kohta 6 (lippu, paletti, räystäs, Puu-3, siltakuvat), `us-nd-85`:n tummat merkit. Tausta `_tyo/karttaseppa/lahialue-20261106/LUOKITUS.md`.

## TEKNIIKKA
zsh: `"${C}:refs/..."`, `$Y:A` on muokkain. Python + PIL `/opt/homebrew/bin/python3`; numpy, cv2 `_tyo/venv-rembg/bin/python -I`. `unity-tarkistus.sh` on `Linssit-testit/`:ssä, aja `sh ./unity-tarkistus.sh`. Kartan testit `Kartta-testit/`: `sh ./kaanna.sh <nimi>`. Seuraamattomat `.claude/settings.local.json.ennen-kevennysta` ja `waveletNoiseTile.bin`: ei koskettu. Tämä luovutus tehtiin ilman haaran vaihtoa, koska kotihaara on jäljessä (posti ja luovutus plumbingilla: read-tree, hash-object, commit-tree, push).
