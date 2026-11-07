# Karttaseppä: luovutus 7.11.2026 klo 03.2x (KS)
Syy: konteksti yli 30 %, Postivahti pyysi nollauksen. Korvaa b68c1f464:n ja kaikki aiemmat. Pohja `_tyo/karttaseppa/luovutus-koonti.md`: enintään 60 riviä.
Kaikki kokeena, ei junaan, ei iPadia. Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (haara karttaseppa/ajo-yhteinen-tasoitus, kärki 5b1a5491c, remote natiivi-backup, ei origin). W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (karttaseppa/nahtavyydet-219, eb4fa95d2). L = wt/proto-karttaseppa-lod (poista, kun kevyiden mallien kohtalo on päätetty). Täydet polut `T=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa`.
## ENSIN
1. Vahti Monitorilla, 30 min, viritä uudelleen: `/bin/zsh $T/postilaatikko-vahti.sh`.
2. **Omistaja 23.22 (PT):** yöllä vain Pariisi, Lontoo ja juoksupeli; muu seis, ei uutta. **Yön sääntö 23.07:** kun vika ei ratkea kahdella yrityksellä tai noin 30 minuutissa, kokeen osa pois tai edellinen toimiva tilalle; rivi KK:lle ja seuraavaan työhön.
3. **Seine täysikoossa (ajo 40) kuitattu (PT 02.5x):** ei varmaa vikaa joessa, 229 palaa agenteilla, KS 26 itse. Tulokset `$T/parit-yhteinen-40/VIKALISTA.md` (lopussa), rivit `TAYSIKOKO-EDISTYS.md`. Noin 15 EPÄSELVÄÄ riviä vain agentin silmin; KK 02.43: muut pienet kohdat jäävät, ND:n "ontto" ei toimia.
4. **TEE ENSIN: AJO 42 (KK 03.10 omistajan valtuutuksella, PT 03.1x; koe, ei junaan).** Y 5b1a5491c, palat `natiiviseppa/pariisi-talot/palat-v20-ryhma4` (loki `$T/palat-v20.log`; katso, että viimeinen rivi on mittarit, 219 palaa), skenaario `$T/sk-pariisi-yhteinen-42.txt`, 10 kuvaa, loki karttaseppa-yhteinen-42-b8-5b1a5491c. Tarkista, onko tilaus jo JU:lla (alla), muuten tilaa.
   - **Katso kuvista:** (a) Beauvoir, Debilly, Arts ja Austerlitzin viadukti eivät kadonneet (KK:n ehto); (b) Bir-Hakeimin ja Garigliano-kuvan rinnakkaisviivat poissa; (c) Issyn way/122634056 poissa; (d) keskeneräisten kohdalla ei aukkoa ajoväylien tai talojen vieressä (PT:n ehto): `v42-purettu-batignolles`, `v42-rakenteilla-chapelle`, `v42-joki-03-45`. Vertaa v40:n samoihin kuviin; lähitasolla ei ole v40-paria kahdelle viimeiselle.
   - **Tulos KK:lle ja PT:lle yhtenä viestinä**, parit täysikoossa ilman selitekaistaa. KK pyysi numeron: **73 riviä: 61 lähtee (54 + Austerlitzin 7; 58:lla rengas kartassa, 3:lla ei: way/395291035, way/81618260, way/96942893), 12 nimettyä jää.** Ilmoita myös tämä.
   - **Sääntö:** `ElavaTyyli.AjosiltaLahella` (ohut viiva lähtee, jos ajosilta alle 20 m viivan puolivälistä). Aineisto `AJOSILLAT-VIIVAT.md`, `ohuet-viivat.json`. Testit 10/10.
   - **Pois (v20):** `palat-v20-syote/siisti.json`: `_pois` + way/122634056, `_ei_valmis_pois` 61 kohdetta; TaloPoistot `poisto/raportti-v20.json`, 2110 riviä. Pitkä rakennus way/122634064 0 % vedellä: jää. Rengas kuitattu (KK 03.10, PT 03.1x).
   - **12 nimettyä** `parit-yhteinen-40/keskeneraiset-nimetyt.txt` ennallaan. PT: lista KK:lle aamuun rajauskuvin. KK: jos jokin näkyy yhtä selvästi kuin rengas, kuva hänelle. Ei kuvia vielä: tee rajaukset yhteisajosta, kun ne ovat kuvassa.
   - **Ehdokas aamuun, ei tarkistettu:** Montparnassen ruskea alue voi olla way/400154236 (building=roof, 267 × 275 m, 48.83996,2.31921). `roof` 1171 kohdetta rauhassa.
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
- Litteä ruskea pohja kartalla = talo, jota paloissa ei ole: etsi `tee-palat.py`:n EI_TALOJA-lajit. Paikka kuvasta: `aja`-koordinaatti, `suunta` ja mittakaava; piirrä mvt:n building kameran kulmaan (tuo muoto heti, kun iso-suodatin ei löydä).
- `tee-poistot.py` tunnistaa renkaan rajalaatikon keskipisteestä: ontto talo ja yli 1 rengas (palan raja) jäävät helposti. Koko lajin poisto keräsi 70 taloa, joista osa olemassa olevia, siksi rajattu nimettyihin.
- Älä putkita tee-poistot.py:tä `head`:iin: katkeaa eikä kirjoita tiedostoja. Tarkista `git diff --stat`, että TaloPoistot.cs muuttui.
- Kansion vaihto ei todista: katso lokista vapautus ennen kuvia, kun parin puolet tulevat eri aineistoista. Vertaa kuvaa myös aineistoon (`ryhma1/palasta.py`).
- Ennen väitettä "tuo talo näkyy kuvassa" katso paloista, onko talo olemassa. Kuva todistaa korjauksen vain, jos vika näkyy samalta kameralta ennen korjausta. Rajaus täysikokoisena, koko kuva ensin.
- Mallin verkko ylhäältä: raaka glb:n X on peilattu pelin suhteen; tarkista epäsymmetrisen mallin siivestä. Kavenna oma ehdotus siihen, mitä KK rajasi, ennen kuin rakennat.
- Kuvan alueen mittaus: tarkista ensin rajauksesta, että alue on mallia (ajon 32 ensimmäinen kivimittaus osui kaupunkiin).
- Ennen "junaan"-lupausta katso, onko riippuvuus rungossa (`ls-tree`). Polku muille aina täysi.
- `aja`-komennon kolmas luku ei skaalaudu suoraan. zsh: `=sana` laajenee, `--include=*.cs` vaatii lainaukset. JU:n ajokansio voi olla `esikatselu-*-N`: katso `ajo.log`.
## LOPPUTESTIT (siirrä jokaiseen luovutukseen, kunnes PT muuta sanoo)
1. Saapumislento laitteella (2.209, KK, PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.
