# Valosepän luovutus 7.11.2026 klo 01.52. Itsenäinen: vanhoja ei tarvitse lukea

Syy: konteksti 33 %, pehmeä raja. Tili vvi@vvi.fi. Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup`. Kuvat vain JU:n vuorolla, ei omaa ajoa. Mikään ei mene junaan. PT:n rajat yöllä: vain Pariisi, Lontoo, juoksupeli. Jumi: kaksi yritystä tai noin 30 min, sitten rivi PT:lle tai KK:lle.

## 1. LONTOON SARJA (KK 01.19 omistajan valtuutuksella; kokeena, ei junaan, ei Tripoa)
Päätös: Tower Bridge ja St Paul's sellaisenaan. Big Ben: muoto ja koko kelpaavat, kivi lämpimäksi, palatsille sama kivi. Abbey: tornit ja julkisivu tunnistuvat matalasta kulmasta, enintään kaksi yritystä. Loput kohdelistan mukaan (`_tyo/pelikoodari/lontoo/a/kohdelista.md`). Joen katkos on PK:lla. PARIT KK:LLE SARJAN JÄLKEEN, EI YKSITELLEN.

Haara `linssiseppa2/lontoo-c`, kärki bd977fc11, työpuu `/Users/Shared/Claude/wt/proto-linssiseppa2-k32`. Koodi `Assets/Matkakirja/Kartta/OhjelmaKohdeLontooWestminster.cs` (palatsi, Abbey) ja `OhjelmaKohdeLontooA–D.cs` (14 mallia, Opus-agentit), rekisteri `OhjelmaKohteet.cs` LontoonKohteet(). Mitat 11/12 (`ConcordenAukionMitat` kaatuu pikakäännöksessä, ei liity Lontooseen). Aineisto `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/lontoo-e/`: `aja-geometria.sh` (testit + OBJ kansioon obj/), `sk-e1.txt`, `sk-f1.txt`, `poistot-sarja.md`, `ARVIO-e1.md`, `LAHTEET.md`, `viite/`; agenttien kansiot a, b, c, d (`esi/`, `viite/`, `LAHTEET.md`). Esikatselu kansiosta lontoo-e: `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I ../ohjelmakohteet/esikatsele.py obj esi <nimi> <kallistus> <suunnat> <leveys>`.

Tehty ja pelissä nähty (ajo e1, `lokit/linssiseppa2-lontoo-e1-1e27c8a69`, arvioitu): Abbey tunnistuu matalasta kulmasta ensimmäisellä yrityksellä, palatsi jokisivulta, Big Benin kivi lämmin.
Tehty, EI PELISSÄ NÄHTY: 14 mallia, kärki bd977fc11: Westminster Bridge, Trafalgar Square, Cutty Sark, Lontoon Tower, British Museum, Natural History Museum, Buckinghamin palatsi, Victoria Memorial, Royal Albert Hall, Albert Memorial, Kensingtonin palatsi, Royal Observatory, Old Royal Naval College, Queen's House.

SEURAAVA:
1. PK:lta tulee viesti: palat-d6 ja yhdistetty sha (pyydetty 01.5x, lista `poistot-sarja.md`). Jos sitä ei tule kohtuullisessa ajassa, kysy PK:lta rivillä.
2. Yhdistä PK:n sha kärkeen, push. Tarkista `sk-f1.txt`:n `talot kansio` (palat-d6). Pyydä JU:lta ajo f1: 26 kuvaa, noin 15 min, ESIKATSELU_PISTEKERROIN=0.465, lokikansio `linssiseppa2-lontoo-f1-<sha>`, "käännä kärjestä omassa työpuussasi".
3. Arvioi täysikokoisina rajauksina (keskipiste noin 1376,1000; ×2). Yksi korjauskierros heikoimmille, sitten parit: pelikuva vasemmalla, valokuva oikealla, ei tekstejä, sama kohde kokonaan. Valokuvat agenttien `viite/`-kansioissa. Mukaan c2:n Tower Bridge ja St Paul's (`lontoo-c/ajo-c2/pari-tb.png`, `pari-sp.png`) ja e1:n Abbey, palatsi ja Big Ben. Koko ruudun Big Ben ajetaan uudelleen, jos KK sen haluaa: `lokit/linssiseppa2-lontoo-e1-1e27c8a69/e1-bb-lahin-45.png` on valmis lämmin versio.
4. Parit KK:lle (`local_37f7c945-e1a0-4638-90b8-93c389a36fbe`) ja rivi PT:lle. Jos jokin ei tunnistu, kuva aamun kysymykseksi.

TUNNETUT VIAT, KATSO PELISSÄ:
- Maa: MaaH on otettu seinien matalimmasta kohdasta. Rinteessä malli on maan alla: Naval College (länsipuoli noin 11 m), Buckinghamin takaosa (noin 10 m), Trafalgarin terassi voi näkyä askeleena.
- Queen's House: kolonnadien pylväät näyttävät roikkuvan katosta (tummempi lattia), katolla katkoviiva (`Laatikko -18.1…18.1` samassa tasossa; kaksi sivulaatikkoa).
- Victoria Memorial heikoin: hahmot möhkäleitä; Buckinghamin portin kultainen koriste kartiona, poista. Kensington tunnistuu vain etelärintamasta.
- Westminster Bridge: kaarten väli kirjavoituu 1,1 px/m:ssä, lyhdyt voivat välkkyä. Cutty Sarkin mastot ja raakapuut alle 1,5 m; ilman lasikatosta (rajaus) kupari näkyy maahan asti.
- Trafalgar: `NimiEste` koko aukiolla voi väistää nimiä laajalti.
- NHM:n tornin korkeus 47,8 m kuvasta, muistissa noin 58 m: tarkista. British Museumin lukusali (Sydney Smirke) on mukana.
- Muistista otetut mitat on merkitty agenttien tiedostojen kommentteihin ja LAHTEET.md:iin.
- Exception-rivit 11: editorin omat (Cesium ion app data, SearchInit). Lue f1:n rivit samoin.

## 2. PALAIS BOURBONIN PIHA
PT: ei saa viivyttää Lontoota. `sk-pb-piha.txt` pc-etela, pc-pohjoinen ajossa 37 (`lokit/karttaseppa-yhteinen-37-b8-eec08f293`) on katsomatta; KS:n ajo 38.

## 3. JONOSSA (vasta Lontoon jälkeen)
Rosoisuus; mallin valo kääntyy kameran mukana, varjo ei; 65°:n yläreunan vyö, La Défensen läpikuultavat tornit, maan viiva 75°; `git show origin/linssiseppa2/luovutus-20261106-1826:docs/raportit/viesti-valoseppa-luovutus-20261106-1826.md` kohta 6. Ääriviivojen iPad-mittaus ennen junaa (PT).

## TEKNIIKKA
Python + PIL `/opt/homebrew/bin/python3`; numpy, cv2 `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I`. `sh ./unity-tarkistus.sh` kansiosta `Linssit-testit/` (sh, ei zsh). Maasto `_tyo/pelikoodari/lontoo/a/maasto.py`: `korkeus(la, lo, 12)[0]`. Commons-haku `lontoo-e/hae.py "hakusana"`; 429:llä hitaasti yksi kerrallaan. Seuraamattomat `.claude/settings.local.json.ennen-kevennysta` ja `waveletNoiseTile.bin`: ei koskettu. Kotihaara on jäljessä: luovutus plumbingilla (väliaikainen GIT_INDEX_FILE, read-tree origin/main, hash-object, update-index, write-tree, commit-tree, push). SendMessage voi pysähtyä: varakanava `mcp__ccd_session_mgmt__send_message`. Lisää uudelle kohteen .cs:lle .meta ja rivi `Kartta-testit/kaanna.sh`:hon.
