# Karttaseppä: luovutus 7.11.2026 klo 00.15 (KS)
Syy: konteksti 31 %, pehmeä raja. Päivitetty 00.2x, ajo 38 tilattu. Korvaa 76b8c3e4a:n ja kaikki aiemmat. Pohja `_tyo/karttaseppa/luovutus-koonti.md`: enintään 60 riviä.
Kaikki kokeena, ei junaan, ei iPadia. Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (haara karttaseppa/ajo-yhteinen-tasoitus, kärki f6625e82d, remote natiivi-backup, ei origin). W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (karttaseppa/nahtavyydet-219, eb4fa95d2). L = wt/proto-karttaseppa-lod (poista, kun kevyiden mallien kohtalo on päätetty). Täydet polut `T=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa`.
## ENSIN
1. Vahdit Monitorilla, 30 min, viritä uudelleen: `/bin/zsh $T/postilaatikko-vahti.sh` ja `/bin/zsh $T/ajovahti-38.sh`.
2. **Omistaja 23.22 (PT):** yöllä vain Pariisi, Lontoo ja juoksupeli; muu seis, ei uutta. **Yön sääntö 23.07:** kun vika ei ratkea kahdella yrityksellä tai noin 30 minuutissa, kokeen osa pois tai edellinen toimiva tilalle; rivi KK:lle ja seuraavaan työhön.
3. **Ajo 38 tilattu JU:lta (PT:n sana):** UNITY b8, Y f6625e82d, `$T/sk-pariisi-yhteinen-38.txt` (generaattori `tee-sk-38.py`, 25 kuvaa `v17-<kohde>-<kulma>-v16|v17` + `v17-opera-70-pohjoisesta`), loki `karttaseppa-yhteinen-38-b8-f6625e82d`. Täyttä käännöstä v17:n kärjestä ei ole ajettu: ajo 38 on ensimmäinen.
   - Valmistuttua: lokista 'talot: vapautettu' ennen v17:ää. Parit `parit-yhteinen-38/` (malli `parit-yhteinen-37/tee-parit-37.py`) PT:lle. Kohteet: Riemukaari, Sacré-Cœur, Grand Palais (PT: parit samalta kameralta), Concorde (Jeu de Paume, Orangerie). Katso Opéran kuva: ajon 37 Opéra 70 ei todistanut, koska Louvre oli edessä.
4. **Ajo 37 valmis, 32/32 + 9/9, arvio `$T/parit-yhteinen-37/ARVIO.md`, parit `kk/`.** PT kuittasi kokeena, myös peilikorjauksen 8d6d72a1d. Katsottu pienennettyinä myös Panthéon 70 ja ylhäältä sekä Opéra ylhäältä, ei uutta vikaa. Invalidit | Grand Palais KK:lle PT:n kautta (KK 23.38); Grand Palais'lta ei paria, vain v16. Polku VS:lle ja NUI:lle lähetetty. 14b ei toistunut, jätetty.
5. **Palat v17 (`natiiviseppa/pariisi-talot/palat-v17-ryhma4`, 127 992 taloa, syöte `palat-v17-syote`):** v16 + Louvren maskiin reiät Jeu de Paume, Orangerie, Café des Marronniers + Riemukaari 16 ja Sacré-Cœur 90 taloa KK:n säännöllä (`lahialue-20261106/ryhma4/`, `tee-ryhma4.py`) − Grand Palais 5 nimetöntä (`ryhma3/irto-kk.json`, way/230227014 on Pont Alexandren pylväs, kaksoiskappale: height 17, mallin sokkeli päällekkäin noin 7 m:n päässä, lähtee; sisar 230227013 oli jo pois) ja Sacré-Cœurin 11 m²:n talo. Pohjat r6: riemukaari, sacre-coeur, grand-palais. `TaloPoistot.cs` v17:stä.
6. **KK 23.47 (omistajan valtuutuksella, ei omistajan hyväksyntä):** nimetty oikea rakennus, ei mallia, yli 25 m mallista → palaa; alle 25 m jää pois, lista aamuun. Ei koske omistajan päätöksiä (Eiffel ja Montparnasse 22.20, Monoprix, Seinen laivat, Notre-Damen saari). **Lista `lahialue-20261106/nimetyt/nimetyt-luokiteltu.txt`, PT:llä:** 9 palaa, 36 aamuun, 22 mallin omia, 41 päätöksiä, 1 liian pieni. Louvren verkko peittää yhtenäisen 300 000 m²:n suorakaiteen: Saint-Germain-l'Auxerrois 32 % sen alla, palautus vaatisi mallin muutoksen, KK:n kysymys.
7. **Montparnasse ja Eiffel eivät kuulu ryhmään 4:** omistaja kuittasi lähialueen 22.20. Kaikki KK:n seuraavat kohteet ovat siis v17:ssä; jos jono tyhjenee, rivi PT:lle "JONO TYHJÄ: Karttaseppä".
8. **KK 23.26 ryhmä 2:** v13 ja 25 m kelpaavat kokeena, ei junaan. KK näyttää Opéran parin omistajalle aamulla. Panthéonin luoteen tyhjä ala on aamun kysymys, ei korjata yöllä. v14 ja v15 käyttämättä levyllä: ei poistoja ilman sanaa.
9. **Odottaa KK:n sanaa, oletus jäävät:** Opéran kauppa 69226766 (125 m²) ja Invalidien 68568749, 103202696, 103202709, 1272602675. Jäävät joka tapauksessa: Hôtel Biron, Galerie des Marbres, Aérogare.
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
