# Karttaseppä: luovutus 6.11.2026 klo 22.20 (KS)
Syy: konteksti yli pehmeän rajan, luonteva tauko ajon 33 ja KK:n vastausten odotuksessa. Korvaa kaikki aiemmat. Pohja `_tyo/karttaseppa/luovutus-koonti.md`: enintään 60 riviä.
Kaikki kokeena, ei junaan, ei iPadia. Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (haara karttaseppa/ajo-yhteinen-tasoitus, kärki 5ec6922a5, remote natiivi-backup, ei origin). W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (karttaseppa/nahtavyydet-219, eb4fa95d2). L = wt/proto-karttaseppa-lod (poista, kun kevyiden mallien kohtalo on päätetty).
## ENSIN
1. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).
2. **Ajo 33 JU:lla, alkoi 22.04:** loki `lokit/karttaseppa-yhteinen-33-b8-5ec6922a5`, 1 kuva + 20 tallennetta (`parit-yhteinen-33/tee-skenaario.py`). Kun valmis: lokikansio NUI:lle (kyltti33-*, merkin hyppy f4ad1b95b, kuva mc-eiffel-85-kyltti-invalidit). Ei omaa arviota, NUI arvioi; katso kuva ehjäksi.
3. **KK:n vastaus odottaa** (viesti ~22.1x, ajo 32): ND #2184 ja ryhmä 1. Omistajan sana ND:stä → kuittaus Codexille; hyväksytty = koemalli + sävy suositus 85 % (`1.466 1.491 1.064`). Monoprix KK:n päätös.
4. **Ajo 34 kokoamatta (3D-ajojen jälkeen):** VS `_tyo/linssiseppa2/sk-sillan-paa.txt` (6 kuvaa, poimi c1afa18de, natiivi-backup linssiseppa2/sillan-paa) + `sk-saumat-g.txt` (11 kuvaa, ei koodia, palauttaa lopussa). Kuvien polku VS:lle. Mukaan ryhmä 2 (`lahialue-20261106/LUOKITUS.md`, yksi lähialueryhmä per ajo), kun PT ei muuta sano. VS lähettää myöhemmin Palais Bourbonin kameran.
5. Ajon 31 kansio `lokit/karttaseppa-yhteinen-31-b8-08f5ea7bf` on VS:llä ja NUI:lla; arviot heiltä PT:lle. Varjo 3d6e35696 ei kaatanut mitään.
6. Etäyhteys vain KK:lla. Hookin työlistarivit ovat PT:n työkalulla, en päivitä. Session id:t osoitekirjasta.
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
- Kuvan alueen mittaus: tarkista ensin rajauksesta, että alue on mallia (ajon 32 ensimmäinen kivimittaus osui kaupunkiin).
- Ennen "junaan"-lupausta katso, onko riippuvuus rungossa (`ls-tree`). Polku muille aina täysi.
- `aja`-komennon kolmas luku ei skaalaudu suoraan. zsh: `=sana` laajenee, `--include=*.cs` vaatii lainaukset. JU:n ajokansio voi olla `esikatselu-*-N`: katso `ajo.log`.
## LOPPUTESTIT (siirrä jokaiseen luovutukseen, kunnes PT muuta sanoo)
1. Saapumislento laitteella (2.209, KK, PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.
