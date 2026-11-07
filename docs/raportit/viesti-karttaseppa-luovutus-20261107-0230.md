# Karttaseppä: luovutus 7.11.2026 klo 02.3x (KS)
Syy: konteksti yli 30 %, pehmeä raja 25 %, kova 35 %; PT:n täysikokoinen läpikäynti ei mahdu tähän sessioon. Korvaa 7be4cf865:n ja kaikki aiemmat. Pohja `_tyo/karttaseppa/luovutus-koonti.md`: enintään 60 riviä.
Kaikki kokeena, ei junaan, ei iPadia. Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (haara karttaseppa/ajo-yhteinen-tasoitus, kärki ccc12f9e5, remote natiivi-backup, ei origin). W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (karttaseppa/nahtavyydet-219, eb4fa95d2). L = wt/proto-karttaseppa-lod (poista, kun kevyiden mallien kohtalo on päätetty). Täydet polut `T=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa`.
## ENSIN
1. Vahti Monitorilla, 30 min, viritä uudelleen: `/bin/zsh $T/postilaatikko-vahti.sh`.
2. **Omistaja 23.22 (PT):** yöllä vain Pariisi, Lontoo ja juoksupeli; muu seis, ei uutta. **Yön sääntö 23.07:** kun vika ei ratkea kahdella yrityksellä tai noin 30 minuutissa, kokeen osa pois tai edellinen toimiva tilalle; rivi KK:lle ja seuraavaan työhön.
3. **PT 02.3x, TEE TÄMÄ (Pariisi kohta 7, koko Seine, ajo 40 valmis):** katso ITSE täysikoossa kaikki kuvat `v40-joki-*-yla`, `v40-joki-*-45` ja `v40-silta-*`, ei ruudukkona, ei agentilla. "Puolikoko ei todista Seineä." Sitten yksi rivi PT:lle: varmat viat tai "ei vikaa täysikoossa, N kuvaa". Ei uutta ajoa ilman löydöstä.
   - **Valmis aineisto:** `$T/parit-yhteinen-40/taysikoko/<kuva>__<x>_<y>.jpg`: 1:1-palat 1000 × 760, 229 kpl, joki ja ranta 70 px:n reunalla (`palat40.py`, luettelo `luettelo.json`). Palojen ulkopuolelle jää kaupunkia ilman jokea. Täysikuvat `lokit/karttaseppa-yhteinen-40-b8-ccc12f9e5/`. Lue palat Read-työkalulla yksitellen, nimi kertoo kuvan.
   - **Kirjaa edistys `$T/parit-yhteinen-40/TAYSIKOKO-EDISTYS.md` kuva kerrallaan**, jotta seuraava jatkaa rajalla. Yksi pala kuluttaa noin 1 000 poletta; jos raja tulee vastaan, luovuta jäljellä olevat, älä lyhennä läpikäyntiä sanomatta.
   - **Jo katsottu 1:1 (KS):** joki-08-45:n juova: pehmeä ruskea sumu rantakadulla, ei joessa, syy tutkimatta. Arcole ja Au Change ylhäältä (joki-05-yla): molemmat yhtenäiset, päät kiinni; Pont Notre-Dame jää Notre-Damen tornin alle tästä kamerasta.
   - **Sama sumu muuallakin:** Austerlitz, Alexandren rannat, Quai de Gesvres. Jos se on sama asia, yksi rivi, ei monta vikaa. Tutki syy (`laikka-vesi-20261106/tasot-paikka.py lat lon sade`), jos jokin lista sen vaatii.
4. **Vikalista `$T/parit-yhteinen-40/VIKALISTA.md` (02.3x, puolikoon läpikäynti).** PT katsoi Alexandren parin: pylväät poissa, kelpaa. Iéna = ajon 31 kuitattu kaista. KK:lla kuvin: Issyn joen reunan nimettömät rakennukset (way/122634056 ja lähin 122634064), Bir-Hakeimin kaksi tummaa viivaa. Älä poista ennen KK:n sanaa. Agenttien "autosillat ohuita" ei ole vika: koodissa ajosillat ovat vaalea kaista, ja 3D-mallin saaneet ovat leveitä. Hiusviivat: OhutSilta-sääntö (omistaja 17.24).
5. **Mittakaava:** `aja` 0.006 → 1,46 px/m; 0.0015 → noin 1,9 px/m, ei lähikuvaa. Rajaa täysikuvasta.
6. **Palat v19 (`natiiviseppa/pariisi-talot/palat-v19-ryhma4`, 127 984 taloa, syöte `palat-v19-syote`):** v18 − Pont Alexandren pylväät way/230227015, way/64959941. TaloPoistot Y ccc12f9e5. **v19 on nyt uusin.**
7. **Kaukaiset erot ja Sacré-Cœur: kuitattu** (`$T/parit-yhteinen-39/ARVIO.md`). Palan maan mediaani selittää v16 | v17:n lohkot; 0,2–1 m pyöristys ei vaadi korjausta (PT). Sacré-Cœurin kaistan rivi PT:llä KK:lle. Tumma kaari on VS:llä. Panthéonin luoteen ala, Montparnassen ruskea alue ja 25 m:n raja odottavat aamua.
8. **KK 23.47 (valtuutuksella):** nimetty oikea rakennus, ei mallia, yli 25 m mallista → palaa; alle 25 m jää pois, lista aamuun `lahialue-20261106/nimetyt/nimetyt-luokiteltu.txt`. Ei koske omistajan päätöksiä (Eiffel ja Montparnasse 22.20, Monoprix, Seinen laivat, Notre-Damen saari). Louvren verkon Saint-Germain-l'Auxerrois: KK:n kysymys.
9. v14 ja v15 käyttämättä levyllä: ei poistoja ilman sanaa. Jäävät: Hôtel Biron, Galerie des Marbres, Aérogare. VS: kadun katkos 2,2907°. Etäyhteys vain KK:lla. Hookin työlistarivit ovat PT:n työkalulla, en päivitä. Omistaja 22.15: maalattu taivas kokeena vain Pariisissa. ND #2184 s85 oletus Y 6eefdbbb1.
10. **PT 02.3x (Raamattu 2.183): OpenFreeMapin ehdot kieltävät automaattisen datan keruun; robots 403. Ei skriptattuja hakuja sieltä.** tee-poistot.py ja `laikka-vesi-20261106/`-työkalut lukevat vain pelin omaa mvt-välimuistia, eivät hae verkosta; tee-palat.py ei käytä OpenFreeMapia. Riippuvuus PT:llä.
11. Kun lista on tyhjä: rivi PT:lle "JONO TYHJÄ: Karttaseppä". Seuraava ajo vasta, kun v19:ään tulee muuta tai PT sanoo.
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
- Älä putkita tee-poistot.py:tä `head`:iin: katkeaa eikä kirjoita tiedostoja. Tarkista `git diff --stat`, että TaloPoistot.cs muuttui.
- Kansion vaihto ei todista: katso lokista vapautus ennen kuvia, kun parin puolet tulevat eri aineistoista. Vertaa kuvaa myös aineistoon (`ryhma1/palasta.py`).
- Ennen väitettä "tuo talo näkyy kuvassa" katso paloista, onko talo olemassa. Kuva todistaa korjauksen vain, jos vika näkyy samalta kameralta ennen korjausta. Rajaus täysikokoisena, koko kuva ensin.
- Mallin verkko ylhäältä: raaka glb:n X on peilattu pelin suhteen; tarkista epäsymmetrisen mallin siivestä. Kavenna oma ehdotus siihen, mitä KK rajasi, ennen kuin rakennat.
- Kuvan alueen mittaus: tarkista ensin rajauksesta, että alue on mallia (ajon 32 ensimmäinen kivimittaus osui kaupunkiin).
- Ennen "junaan"-lupausta katso, onko riippuvuus rungossa (`ls-tree`). Polku muille aina täysi.
- `aja`-komennon kolmas luku ei skaalaudu suoraan. zsh: `=sana` laajenee, `--include=*.cs` vaatii lainaukset. JU:n ajokansio voi olla `esikatselu-*-N`: katso `ajo.log`.
## LOPPUTESTIT (siirrä jokaiseen luovutukseen, kunnes PT muuta sanoo)
1. Saapumislento laitteella (2.209, KK, PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.
