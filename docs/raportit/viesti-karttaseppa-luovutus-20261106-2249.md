# Karttaseppä: luovutus 6.11.2026 klo 22.49 (KS)
Syy: Postivahdin nollauspyyntö; sen mainitsema 9fec1ace0 oli vanhentunut (ajo 35 oli jo tehty), joten tämä korvaa sen ja kaikki aiemmat. Pohja `_tyo/karttaseppa/luovutus-koonti.md`: enintään 60 riviä.
Kaikki kokeena, ei junaan, ei iPadia. Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (haara karttaseppa/ajo-yhteinen-tasoitus, kärki 7914d5423, remote natiivi-backup, ei origin). W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (karttaseppa/nahtavyydet-219, eb4fa95d2). L = wt/proto-karttaseppa-lod (poista, kun kevyiden mallien kohtalo on päätetty).
## ENSIN
1. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).
2. Ajo 33 valmis 22.16 (`lokit/karttaseppa-yhteinen-33-b8-5ec6922a5`, 1/1 + 20/20, PUUTE 0), kansio NUI:lla; arvio NUI:lta. Poikkeusrivit Cesium + hakuindeksi, ei pelikoodia.
3. **Omistaja 22.20 tehty:** ND #2184 s85 oletus Y 6eefdbbb1 (varjon ääriviiva uusittu), Codexille 4a5580043. Ryhmä 1 kelpaa kokeena, Monoprix mukana. Ajamatta.
4. **Ajo 34 alkoi L2:lla 22.27 (JU):** Y 02546574c, `sk-pariisi-yhteinen-34.txt`, 33 kuvaa + 24 tallennetta, raja 75 min, loki `karttaseppa-yhteinen-34-b8-02546574c`. Valmistuttua: kuvien polku VS:lle, lokikansio NUI:lle, parit PT:lle (`r1b-*-nyt|uusi`, `nd-*`; PT: KK näyttää omistajalle, kolmas talo way/54031857 mainitaan). Tarkista lokista: ei varjovaroitusta notre-damelle, 'talot: vapautettu' ennen v12:ta. **Ajon 34 Notre-Damen varjo on vielä peilissä:** parista ei arvioida varjoa, kerro PT:lle parien mukana.
   **Ajo 34b valmis 22.47, hoidettu:** 14/14, polku VS:lle lähetetty, poikkeus vain Cesium.
   **Ajo 35 jonossa L2:lla JU:lla, lähtee itsestään 34:n jälkeen:** Y 7914d5423, `sk-pariisi-yhteinen-35.txt` (`tee-sk-35.py`), 25 kuvaa, raja 45 min, loki `karttaseppa-yhteinen-35-b8-7914d5423`. Sisältö: ryhmä 2 `r2-<pantheon|opera|invalidit>-<45|70|yla>-<nyt|uusi>`, NS:n 98180b82d (Y:ssä 66b9b9ba8) `kn-opera-45-kadut`, VS:n `sv-*`. Valmistuttua: parit PT:lle, viimeinen sana KK:lta; sv-polku VS:lle, Sacré-Cœur ja Invalidit korjattuina KK:lle (PT 22.4x); lokikansio NS:lle. Tarkista lokista 'talot: vapautettu' ennen v13:a ja kolme koepohja-riviä.
   **Ryhmä 2 tehty, kuvat katsomatta:** `lahialue-20261106/ryhma2/RYHMA2.md`. Talo pois alle 25 m mallin verkosta (kokeen arvo, ei omistajan sana): Panthéon 169→38, Opéra 50→17, Invalidit 72→22. `palat-v13-ryhma2`, koepohjat `*-pohja-r2`, oletus ennallaan. Muutin `tee-palat.py`:tä: korvaus-json koskee myös sarjan kohteita, ilman avainta sama kuin ennen. Katso: orpo talo Panthéonin lounaispuolella, pohjan reunan sauma, Panthéonin pohjoisen isot rakennukset. Ryhmä 3 (Grand Palais, mittaa verkko ensin) vasta ajon 35 jälkeen.
   **NS:n erillistä nimilistaa ei ole tullut;** PT:lle kerrottu, ajo ei odota sitä. PT:n mainitsema VS eb92b5e44: 9/10 varjotiedostoa samat kuin Y:ssä, notre-dame eroaa (772cb9670 uusi #2184:lle, sisältöä ei vertailtu erikseen). Seuraavat ajot kärjestä 7914d5423.
   **Ajo 34b jonossa L1:llä LAV:n levyt7b:n jälkeen (JU 22.33):** Y 32872638e (a64444662 poimittu), `sk-pariisi-yhteinen-34b.txt`, 14 kuvaa `uk-*`, loki `karttaseppa-yhteinen-34b-b8-32872638e`. VS:n usva, omistaja 22.17 ja 22.18. Polku VS:lle. Seuraavat ajot tästä kärjestä.
   **Ajoon 35 NS:ltä:** poimi 98180b82d (natiivi-backup natiiviseppa/oleelliset-nimet, pohja 32872638e): kadunnimet oletuksena pois (omistaja 22.20, PT; koe, ei junaan). Kadut mukaan: `ui kerros nimirajaus 0`. Kaduttomat kuvat: vähemmän nimiä, muut nimet voivat siirtyä. Ei vielä ajettu; lokikansio NS:lle.
   **Ajoon 35 VS:ltä:** varjon ääriviivat korjattu Y 772cb9670 (peilivirhe; 10 tiedostoa `varjot/`, eb92b5e44 ei poimittu). Kuvat `lisa-varjo-peili-35.txt` (6 kuvaa sv-*), polku VS:lle. **Ajojen 34 ja 34b Notre-Damen varjo on vielä peilissä:** parista ei arvioida varjoa, kerro PT:lle parien mukana. Arvio `_tyo/linssiseppa2/kovat-varjot/aariviiva-arvio-peili.md`. Seuraavat ajot kärjestä 772cb9670 + NS:n 98180b82d.
5. Ajon 31 kansio `lokit/karttaseppa-yhteinen-31-b8-08f5ea7bf` on VS:llä ja NUI:lla; arviot heiltä PT:lle. Varjo 3d6e35696 ei kaatanut mitään.
6. **Eiffelin pikkutalot, syy löytyi:** way/54108364 (etummainen), way/54108369, way/54031857 (sama tapaus, ei kuvassa): oikeita OSM-katastereja, pohja 3–4 m kartan yläpuolella, varjon irtoamista ei vielä varmistettu kuvasta. Pois: `palat-v12-ryhma1b` (v11 + 3 taloa). Omistaja 22.15: maalattu taivas kelpaa kokeena, vain Pariisissa, ei junaan. **Montparnassen ruskea:** pohjakuva, 96 % poistettujen alasta rakennuksen väriä; `montparnasse-pohja-r1` Y 980fe4bb6 (`ryhma1/mp-pohja-r1.py`), oletus ennallaan, koepohjalla; oletukseksi vain KK:n sanalla parin jälkeen. Pohjoiskulmaan jäi pieni jäännös, katso parista.
7. Etäyhteys vain KK:lla. Hookin työlistarivit ovat PT:n työkalulla, en päivitä. Session id:t osoitekirjasta.
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
