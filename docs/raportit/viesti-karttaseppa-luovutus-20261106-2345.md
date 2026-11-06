# Karttaseppä: luovutus 6.11.2026 klo 23.45 (KS)
Syy: Postivahdin nollaus, ajo 37 jonossa. Korvaa 9a2cecc0f:n ja kaikki aiemmat. Pohja `_tyo/karttaseppa/luovutus-koonti.md`: enintään 60 riviä.
Kaikki kokeena, ei junaan, ei iPadia. Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (haara karttaseppa/ajo-yhteinen-tasoitus, kärki eec08f293, remote natiivi-backup, ei origin). W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (karttaseppa/nahtavyydet-219, eb4fa95d2). L = wt/proto-karttaseppa-lod (poista, kun kevyiden mallien kohtalo on päätetty). Täydet polut `T=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa`.
## ENSIN
1. Vahdit Monitorilla, 30 min, viritä uudelleen: `/bin/zsh $T/postilaatikko-vahti.sh` ja `/bin/zsh $T/ajovahti-37.sh`.
2. **Omistaja 23.22 (PT):** yöllä vain Pariisi, Lontoo ja juoksupeli; muu seis, ei uutta. **Yön sääntö 23.07:** kun vika ei ratkea kahdella yrityksellä tai noin 30 minuutissa, kokeen osa pois tai edellinen toimiva tilalle; rivi KK:lle ja seuraavaan työhön.
3. **Ajo 36 valmis, PT kuitannut kokeena:** arvio `$T/parit-yhteinen-36/ARVIO.md`, parit `kk/`, lokikansio NS:llä. Poistosääntö toimii: Eiffelin läiskät, Montparnassen ruskea ja Tuileries'n ruskeat pisteet poissa. 14d: PT, Louvren jäävät renkaat eivät häiritse.
   - **KK:lla:** Louvren maski poistaa way/54188994 Jeu de Paume ja way/54188996 Musée de l'Orangerie (OSM varmistettu), nyt myös jäljet kartasta. Nimi "Jeu de Paume" jää ilman taloa: `rajaukset/jeu-de-paume-nimi.jpg`. Ei korjattu, odottaa KK:n sanaa.
   - **14b ei ratkennut:** ajossa 36 kamera oli paljon ajoa 34 matalampi, beige ala kuvan ulkopuolella (`rajaukset/gr8-34-36.jpg`). Toinen yritys: `p2-gr-8-m` ajossa 37 (0.012). Jos ei toistu, rivi PT:lle ja seuraavaan. Ajon 36 pienempi vaihto 104→105 = kartan tarkempi taso.
4. **Ajo 37 tilattu, JU jonossa L2:lla Lontoo B2:n jälkeen (23.45):** Y eec08f293 (8d6d72a1d + VS dac44e3d9, 386945015 ja NUI f29ff0335 poimittuina; työntö natiivi-backup), `$T/sk-pariisi-yhteinen-37.txt`, generaattori `$T/tee-sk-37.py`, 32 kuvaa `uo-*`, `r2-*-v13|v16`, `pc-*`, `pv-*`, `kk-*` + 9 tallennetta. Loki `lokit/karttaseppa-yhteinen-37-b8-eec08f293`. Testit: KylttiUiEste 7/7, TaloAlue 8/9. Täyttä käännöstä poiminnoille ei ole ajettu: ajo 37 on ensimmäinen.
   - Valmistuttua: lokista 'talot: vapautettu' ennen v16:ta. Parit `parit-yhteinen-37/` (malli `parit-yhteinen-36/tee-parit-36.py`) PT:lle. **KK 23.38:** Invalidit v13 | v16 ja Grand Palais -parit KK:lle PT:n kautta; KK arvioi Invalidit uudelleen ennen aamua. Ajojen 35 ja 36 Invalidien r2-kuvia ei näytetä omistajalle. Polku VS:lle (local_fa464945), lokikansio NUI:lle (local_43962c89). Kuittaus PT:lle.
5. **Ryhmä 2, KK 23.26 (omistajan valtuutuksella, EI omistajan hyväksyntä):** v13 ja 25 m kelpaavat kokeena; irtotalot pois (Panthéon 2 kohtaa, Opéra 1); jatka seuraaviin kohteisiin samalla säännöllä; ei junaan. KK näyttää Opéran parin omistajalle aamulla. Panthéonin luoteen tyhjä ala on aamun kysymys, ei korjata yöllä. Arvio `$T/parit-yhteinen-35/ARVIO.md`, parit `kk/` (PT vei KK:lle).
6. **Y 8d6d72a1d, ajossa 37:** palat `natiiviseppa/pariisi-talot/palat-v16-ryhma2`, pohjat `*-pohja-r5` (pantheon, opera, invalides, grand-palais), `TaloPoistot.cs` v16-syötteestä (`POISTO_SYOTE=palat-v16-syote tee-poistot.py`). Lista `lahialue-20261106/ryhma2/irto/irto-kk.json`. v14 ja v15 käyttämättä levyllä: ei poistoja ilman sanaa, kerro PT:lle, jos tilaa tarvitaan.
7. **Oma virhe korjattu:** `ryhma2/tee-ryhma2.py` mittasi mallin peilikuvana (Unity tuo glb:n X:n peilattuna). Invalidit: 64954996 pois, 64955038 palaa; ajojen 35 ja 36 r2-kuvissa väärin päin. Muut työkalut tarkistettu, PT tietää.
8. **Grand Palais (ryhmä 3), r5 ja v16, ajossa 37:** verkko 253 x 380 m, 42/47 palaa, mm. Petit Palais 28 m ja teatterit. Parit ajosta 37 PT:lle; irtotalot `ryhma2/irto/etsi-irto.py`:n kaavalla (lisää grand-palais sen listaan), nimettyjä oikeita rakennuksia ei poisteta. Seuraavat kohteet KK:n säännöllä sen jälkeen: `nahtavyyssarja/alueet/` riemukaari, sacre-coeur, montparnasse, eiffel; katso ensin onko niillä jo oma päätös.
9. **Odottaa KK:n sanaa, oletus jäävät:** Opéran kauppa 69226766 (125 m²) ja Invalidien 68568749, 103202696, 103202709, 1272602675. Jäävät joka tapauksessa: Hôtel Biron, Galerie des Marbres, Aérogare.
10. **IenanSilta-testi:** kaatuu myös pohjalla 1282a6327 (7/8), vika ei tule poistosta. PT: yksi katsaus ajon 36 jälkeen, jos silta on Pariisin työtä; muuten rivi KK:lle ja seuraavaan. `TaloAlue` muuten 8/9.
11. **VS:** kadun katkos (2,2907°) on VS:llä, varmistus `sk-katkos.txt` ajossa 37. Sacré-Cœurin lähikuva pois, Louvren usvapari ei todista. Ajon 37 polku VS:lle (local_fa464945), lokikansio NUI:lle (local_43962c89).
12. Etäyhteys vain KK:lla. Hookin työlistarivit ovat PT:n työkalulla, en päivitä. Session id:t osoitekirjasta.
13. Ajon 33 ja 31 arviot NUI:lta ja VS:ltä PT:lle. Eiffelin pikkutalot: palat v12. ND #2184 s85 oletus Y 6eefdbbb1, ajojen 34 ja 34b ND:n varjo peilissä. Omistaja 22.15: maalattu taivas kelpaa kokeena, vain Pariisissa. Kuva: `sv-sacre-coeur` ja `sv-invalidit` ajosta 35 ovat PT:llä KK:lle vietäväksi.
## AJO 32 (arvio `parit-yhteinen-32/ARVIO.md`, parit `parit-yhteinen-32/kk/`)
- Ryhmä 1 oikein: `talot 0`, odota, `talot kansio v11`, `talot 1` (pelkkä kansio ei vapauta ladattuja paloja, ajon 31 r1 kelvoton, `parit-yhteinen-31/kk/ei-kelpaa-v10-molemmilla`). Eiffel: jalka vapaa. Montparnasse: juuri näkyy; **puiden alla ruskea tasainen alue, syy tutkimatta** (kartan rakennuspinta?).
- ND #2184: Y `NotreDameKoe/lod5-20261106` (092fee5bb, `codex-lod-20261106/tee-lod-v5.py`). Leveneminen 1,247, nykyinen 1,174, tilaus 1,25; fleche vihreä. Kivi julkisivulla Y: nykyinen 0,416; 100 % 0,473; 85 % 0,425; 72 % 0,382. Piirrosjälki ja isot vaaleat tasanteet omistajan nähtäviksi. Kuittaus Codexille ad9c139e5: SHA, päätös erikseen. Nykyinen pysyy, kunnes omistaja on nähnyt.
- Pont d'Iéna: pyöreä pää poissa, PT kelpuutti, KK:lla `parit-yhteinen-31/kk/silta-iena-etela-4x.jpg`. Vain Y:ssä. Muut kaksi pyöreää päätä = Quai Branlyn tunnelin suut (81 m), ei vika (LUOKITUS.md).
## OMISTAJAN JA PT:N PÄÄTÖKSET VOIMASSA
- **ND 20.58:** kevyt eteenpäin kolmella korjauksella; tavoite istuu kartalle Sainte-Chapellen rinnalla, liioittelu säilyy, mittari G-kuva.
- **Eiffelin reuna 18.49 "Kelpaa":** haiv2 oletus W 0ab14d552 ja Y 1ab552a69. Avoin juna on runko 603d4213a, jossa ei ole Eiffeliä eikä Nahtavyysalue.cs:ää; häivytys lähtee samalla kun mallit menevät runkoon. Ei omaa vientiä.
- **Riemukaari #2172 "Kelpaa" 18.09:** oletus lod3, kokeena. Viat 1–6 Codexilla. Korjattu versio uuteen kansioon.
- **Pont d'Iéna "Vaalea kaista" 18.09**, muut neljä viivaa pois.
- 16.46: Seinen litteät muodot "Kaikki pois"; oikea rakennus ei lähde, epäselvä KK:lle kuvan kanssa. 17.08: Off Paris Seine lähtee. 17.24: Seinen kävely- ja metrosillat ohuina viivoina, pienet kadut pois, kuva ennen junaa.
- Lopputulos junaan (e23, -pariisi3, mallit) vain KK:n ja omistajan kuvan jälkeen. Malleista muuta Tripolle tai Codexille vain KK:n sanalla.
## ODOTTAA KK:LTA (kuvat `parit-yhteinen-26/kk/`, ellei toisin mainita)
- **Sillat:** -austerlitz, -beauvoir, -national, sillat-lista.txt (48/63 palaa). **Katettu vesi:** katettu-vesi.jpg. **Laivat:** `parit-yhteinen-25/kk/`, jos KK pyytää. **ND vesi1:** `parit-yhteinen-29/kk/raita-yla.jpg`.
## MUUT ODOTTAVAT
- VS: parit ja arvio ajoista 26, 28, 30.
- PT: koti-haaran tiedostot. Seuraamattomat omat luovutukset + `.claude/settings.local.json.ennen-kevennysta` (ei committiin, ei poisteta). Ei poistoja ennen sanaa.
- h=40 (48.83891,2.37506) jää joesta tunnistamatta. Raita (`laikka-vesi-20261106/syy.md`) jää. Posti #2174/#2178: KK, VS, Codex.
## AUKI, MUIDEN KÄSISSÄ TAI EI KIIREELLINEN
Louvren haamu PT ja VS. Eiffel 85b VS. NUI:n kylttisyy NUI. Kärkilaskenta iPadilla mittaamatta. Tuileries'n ruskeat pisteet (pn-matala-2, noin 590,1437 ja 920,1432) tutkimatta. Pohjakirja: rannan kadun mukaan rajattu Eiffelin reuna vain KK:n sanalla.
## TYÖTAVAT
- Ajotilaus JU:lle: UNITY b8, Y + kärki, skenaario, loki karttaseppa-yhteinen-NN-b8-<sha>, 1 rivi "ratkaisee". Laske kuvamäärä, älä muuta skenaariota alkaneen ajon jälkeen; ennen alkua uusi tilaus korvaa. Muiden lisät: lue lista, NUI:n kamerat viimeisenä. Kerronta: `odota 120`, ennen kuin "ui liiku: esiin" on tullut.
- Parit samasta ajosta: `koemalli` malleille, `koepohja <alue> <kuva>` pohjakuville. Talot: ks. ajo 32. Parityökalu `parit-yhteinen-32/tee-parit-32.py`, ND-koonti `tee-nd-32.py`, malli asennukseen `codex-lod-20261106/tee-lod-v5.py`.
- Kartta-testit `sh kaanna.sh <nimi>`. Python /opt/homebrew/bin/python3 (numpy, PIL). Kuvat 2752 × 2064. Pelin mvt: /private/tmp/*/Matkakirja/*/laatat/elava/mvt/<z>/<x>/<y>.pbf. Kohteet paikalta `laikka-vesi-20261106/tasot-paikka.py lat lon sade_m`; ilmakuva `hae-orto.py`. OpenFreeMapin robots 403: ei hakua.
- Parit KK:lle ilman selitekaistaa, samassa vuorokaudenajassa. Lähteen tyylikirjamuutos vaatii `node tools/tyylikirja.mjs`.
- Codex-posti: worktree karttaseppa-postilaatikko, `checkout --detach origin/claude/postilaatikko`, commit, `push origin HEAD:claude/postilaatikko`.
- Luovutus committiin ilman checkoutia: väliaikainen indeksi (`GIT_INDEX_FILE`), `read-tree origin/main`, `update-index --add --cacheinfo`, `write-tree`, `commit-tree`, push uuteen haaraan.
## OPIT
- Kansion vaihto ei todista: katso lokista vapautus ennen kuvia, kun parin puolet tulevat eri aineistoista. Vertaa kuvaa myös aineistoon (`ryhma1/palasta.py`).
- Ennen väitettä "tuo talo näkyy kuvassa" katso paloista, onko talo olemassa. Kuva todistaa korjauksen vain, jos vika näkyy samalta kameralta ennen korjausta. Rajaus täysikokoisena, koko kuva ensin.
- Mallin verkko ylhäältä: raaka glb:n X on peilattu pelin suhteen; tarkista epäsymmetrisen mallin siivestä. Kavenna oma ehdotus siihen, mitä KK rajasi, ennen kuin rakennat.
- Kuvan alueen mittaus: tarkista ensin rajauksesta, että alue on mallia (ajon 32 ensimmäinen kivimittaus osui kaupunkiin).
- Ennen "junaan"-lupausta katso, onko riippuvuus rungossa (`ls-tree`). Polku muille aina täysi.
- `aja`-komennon kolmas luku ei skaalaudu suoraan. zsh: `=sana` laajenee, `--include=*.cs` vaatii lainaukset. JU:n ajokansio voi olla `esikatselu-*-N`: katso `ajo.log`.
## LOPPUTESTIT (siirrä jokaiseen luovutukseen, kunnes PT muuta sanoo)
1. Saapumislento laitteella (2.209, KK, PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.
