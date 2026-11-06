# Karttaseppä: luovutus 7.11.2026 klo 00.15 (KS)
Syy: konteksti 35 %, kova raja. Päivitetty 00.5x: ajo 39 jonossa; v18 valmis, ajo 39 on sen ensimmäinen. Korvaa 76b8c3e4a:n ja kaikki aiemmat. Pohja `_tyo/karttaseppa/luovutus-koonti.md`: enintään 60 riviä.
Kaikki kokeena, ei junaan, ei iPadia. Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (haara karttaseppa/ajo-yhteinen-tasoitus, kärki 22339908e, remote natiivi-backup, ei origin). W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (karttaseppa/nahtavyydet-219, eb4fa95d2). L = wt/proto-karttaseppa-lod (poista, kun kevyiden mallien kohtalo on päätetty). Täydet polut `T=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa`.
## ENSIN
1. Vahdit Monitorilla, 30 min, viritä uudelleen: `/bin/zsh $T/postilaatikko-vahti.sh` ja `/bin/zsh $T/ajovahti-39.sh`.
2. **Omistaja 23.22 (PT):** yöllä vain Pariisi, Lontoo ja juoksupeli; muu seis, ei uutta. **Yön sääntö 23.07:** kun vika ei ratkea kahdella yrityksellä tai noin 30 minuutissa, kokeen osa pois tai edellinen toimiva tilalle; rivi KK:lle ja seuraavaan työhön.
3. **Ajo 39 jonossa JU:lla L1:llä (22339908e, `$T/sk-pariisi-yhteinen-39.txt`, generaattori `tee-sk-39.py`, 18 kuvaa `v39-*`, loki `karttaseppa-yhteinen-39-b8-22339908e`).** Valmistuttua: lokista 'talot: vapautettu' kummankin kansiovaihdon edellä, parit `parit-yhteinen-39/` (malli `parit-yhteinen-38/tee-parit-38.py`) PT:lle: Grand Palais v13 | v17 aamun koontiin (sama kuin v13 | v18, v18 ei muuta Grand Palais'ta; PT tietää), Invalidit ja Opéra v17 | v18. Vahti `/bin/zsh $T/ajovahti-39.sh`.
   - **KK 00.34: palat v17 kelpaavat kokeena; 25 m:n raja jää omistajan kortille.** Ajon 38 PT katsoi Concorde 45, Grand Palais 45, Sacré-Cœur 45.
   - **PT 00.3x, tee nämä, ei omaa ajoa:**
     - **Pylväät way/230227015 ja way/64959941 mukaan seuraavaan palaversioon v19**, sama sääntö kuin 230227014 (height 17, 8,5 m mallin sokkeleista). Ovat maskin ulkopuolella: `_pois`-listalle `siisti.json`:iin.
     - **Kaukaiset erot v16 | v17 (Riemukaaren koillinen, Sacré-Cœur): ÄLÄ kirjaa lataukseksi.** Varmista ajon 39 kuvista täysikokoisella rajauksella: v17 | v18 eroaa vain Invalidien ja Opéran paloissa, joten kaukana näkyvä ero todistaa lataustason; jos eroa ei näy, sano se. Tiedossa: v16 | v17 vain 12/219 palaa eroaa, kaikki kohteiden lähellä.
     - **Sacré-Cœurin tyhjä kaista mäen ympärillä: ei korjausta yöllä.** Täysikokoinen rajaus (`parit-yhteinen-38/kk/sacre-coeur-yla.jpg`, Sonnet-agentin näkemä) ja rivi KK:n aamun koontiin 25 m:n listan rinnalle, syy hypoteesina (25 m:n raja). Tarkista samalla, onko sama kuin VS:n ohut tumma kaari.
   - Ajon 38 loput kuvat katsoi Sonnet-agentti, ei KS: ei rikkinäistä; PT:lle raportoitu.
4. **Ajo 37 valmis, 32/32 + 9/9, arvio `$T/parit-yhteinen-37/ARVIO.md`, parit `kk/`.** PT kuittasi kokeena, myös peilikorjauksen 8d6d72a1d. Katsottu pienennettyinä myös Panthéon 70 ja ylhäältä sekä Opéra ylhäältä, ei uutta vikaa. Invalidit | Grand Palais KK:lle PT:n kautta (KK 23.38); Grand Palais'lta ei paria, vain v16. Polku VS:lle ja NUI:lle lähetetty. 14b ei toistunut, jätetty.
5. **Palat v17 (`natiiviseppa/pariisi-talot/palat-v17-ryhma4`, 127 992 taloa, syöte `palat-v17-syote`):** v16 + Louvren maskiin reiät Jeu de Paume, Orangerie, Café des Marronniers + Riemukaari 16 ja Sacré-Cœur 90 taloa KK:n säännöllä (`lahialue-20261106/ryhma4/`, `tee-ryhma4.py`) − Grand Palais 5 nimetöntä (`ryhma3/irto-kk.json`, way/230227014 on Pont Alexandren pylväs, kaksoiskappale: height 17, mallin sokkeli päällekkäin noin 7 m:n päässä, lähtee; sisar 230227013 oli jo pois) ja Sacré-Cœurin 11 m²:n talo. Pohjat r6: riemukaari, sacre-coeur, grand-palais. `TaloPoistot.cs` v17:stä.
6. **KK 23.47 (omistajan valtuutuksella, ei omistajan hyväksyntä):** nimetty oikea rakennus, ei mallia, yli 25 m mallista → palaa; alle 25 m jää pois, lista aamuun. Ei koske omistajan päätöksiä (Eiffel ja Montparnasse 22.20, Monoprix, Seinen laivat, Notre-Damen saari). **Lista `lahialue-20261106/nimetyt/nimetyt-luokiteltu.txt`, PT:llä:** 9 palaa, 36 aamuun, 22 mallin omia, 41 päätöksiä, 1 liian pieni. Louvren verkko peittää yhtenäisen 300 000 m²:n suorakaiteen: Saint-Germain-l'Auxerrois 32 % sen alla, palautus vaatisi mallin muutoksen, KK:n kysymys.
7. **Montparnasse ja Eiffel eivät kuulu ryhmään 4:** omistaja kuittasi lähialueen 22.20. Kaikki KK:n seuraavat kohteet ovat siis v17:ssä; jos jono tyhjenee, rivi PT:lle "JONO TYHJÄ: Karttaseppä".
8. **KK 23.26 ryhmä 2:** v13 ja 25 m kelpaavat kokeena, ei junaan. KK näyttää Opéran parin omistajalle aamulla. Panthéonin luoteen tyhjä ala on aamun kysymys, ei korjata yöllä. v14 ja v15 käyttämättä levyllä: ei poistoja ilman sanaa.
9. **KK 00.22 (valtuutuksella, kokeena): Invalidit v16 kelpaa. Palat v18 (`palat-v18-ryhma4`, 127 986 taloa), pohjat r7 opera ja invalides, Y 22339908e, ajamatta:** Invalidien 68568749, 103202696, 103202709, 1272602675, 64955038 ja Opéran koju 69226401 (13 m², nimetön) pois. Kauppa 69226766 jää. **Ajo 39 (v17 | v18, tilaus PT:n sanalla):** Invalidit ja Opéra + PT: Grand Palais 45, 70, ylhäältä kansiolla v13 parina aamuun (koepohja grand-palais oletus; v13:ssa ei Grand Palais'n maskia). PT tietää. Jäävät: Hôtel Biron, Galerie des Marbres, Aérogare.
   - PT: sisar way/230227013 on jo pois v16:ssa ja v17:ssä; katso molemmat sillan kulmat ajon 38 Grand Palais'n kuvista.
10. **IenanSilta-testi korjattu:** testi oli vanhentunut (oma d8af34b86), Y 7940b98c0, TaloAlue 9/9.
11. **VS:** kadun katkos (2,2907°) on VS:llä, varmistus `sk-katkos.txt` ajossa 37. Etäyhteys vain KK:lla. Hookin työlistarivit ovat PT:n työkalulla, en päivitä. Session id:t osoitekirjasta.
12. Omistaja 22.15: maalattu taivas kelpaa kokeena, vain Pariisissa. ND #2184 s85 oletus Y 6eefdbbb1.
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
