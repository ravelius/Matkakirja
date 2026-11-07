# Pelikoodari: luovutus 07.11.2026 klo 09.56

Korvaa kaikki aiemmat. TF 219 ja opit: `git show a391edd96:docs/raportit/viesti-pelikoodari-luovutus-20261107-0845.md`. Lontoon työkalut: `git show ee5465047:docs/raportit/viesti-pelikoodari-luovutus-20261107-0326.md` kohta 5.

**Työ nyt: Lontoon päänähtävyydet isommiksi (PT, omistaja 09.52). Koodia ei ole vielä kirjoitettu; suunnitelma kohdassa 1. Nollaus tuli kontekstirajasta (29 %) ennen toteutusta.**

## 1. Lontoo isommaksi
**PT:n sana:** "Lontoon päänähtävyydet isompina, kokeena: St Paul's, Tower Bridge, Big Ben ja Westminster. Tavoite: erottuvat kaukaa kuten Pariisin nähtävyydet, eivätkä peitä naapurikortteleita rumasti. Tower Bridgelle omat pituus ja korkeus." Parit samasta kohdasta KK:lle (hänelle luvattu ne ennen päätöstä, jääkö koko peliin). Muisti mitattuna, iPad ja merkintä "iPad, ei iPhone". Ajot JU:n vuorolla. Ei junaan ilman korttia "Pariisi valmis". Rivi PT:lle sha:lla.
**Pohjakuvat:** `proto-3d/lokit/pelikoodari-e3-parit/rajaus-kaukaa-1-iso-pariisi.png`, `rajaus-iso-sp-tb.png`.
**Sitovat ehdot:** Raamattu 2.204: ei veden päälle, joki näkyy kokonaan; liioittelu ylöspäin ja maalla; takana olevan joen päälle saa levitä. 08.52: nähtävyyden lähelle ei jää kartan rakennuksia. E3: St Paul's 2,5× kestää, mutta on noin puolet Notre-Damen koosta (kaukaa-45); Big Ben 2,5× kestää lähellä, kaukaa rajaamatta; Tower Bridge 2× vie sillan päät rantojen talojen päälle.

**Proto:** `/Users/Shared/Claude/wt/proto-pelikoodari-lod-diag`, haara `pelikoodari/lontoo-isot` tehty juuri `a8b873e5d`:stä (TF 219), ei committeja, ei työnnetty.

**Suunnitelma (oma, ei vielä kokeiltu; kertoimet arvioita, säädä kuvista):**
1. **`OhjelmaKohteet.cs`:** `Kohde`en oletuskoko `Koko` (Vector3) ja kiintopiste `KiintoX/Z` mallin paikallisissa metreissä. `Paivita`ssa `k.T.localPosition = k.Paikka + k.T.localRotation * ((1 − koko) × kiintopiste)`, sama `k.Varjo`lle. `Koot`-komento voittaa oletuksen. Kytkin `ohjelmakohteet isot 0|1` ennen-kuviin. Komennot `ohjelmakohteet koko` ja `ohjelmakohteet akselit x y z Nimi` ovat jo olemassa (`Komennot.cs:733`), joten kertoimet voi kokeilla ilman uutta käännöstä. Kiintopistettä ei voi korvata pelkällä `Siirto`lla, koska `Siirto` on ennen kerrointa.
2. **Mitat ensin:** tulosta rajat `OhjelmaKohdeGeometria.BigBen/WestminsterAbbey/WestminsterPalatsi/TowerBridge/StPauls`:sta (`g.Paikat`, Kartta-testit kääntää nämä, `Kartta-testit/Testit/OhjelmaKohdeGeometriaTestit.cs`). Akselit `OhjelmaKohdeLontoo.cs:10–15`. Tarkista päällekkäisyys: palatsi ja Abbey noin 200 m erillään, Big Ben Westminster Bridgen kulmassa, Tower Bridgen pohjoispää Lontoon Towerin lähellä.
3. **Alkuarvaus (x pituus, y korkeus, z leveys):** St Paul's 3,2 / 4,2 / 3,2. Big Ben 4 / 4 / 4. Westminsterin palatsi 2 / 3 / 1,8, kiintopiste jokireunassa ja pohjoispäässä, koska joki on idässä ja silta pohjoisessa: kasvaa etelään ja länteen. Abbey 2,2 / 3 / 2,2, kasvaa länteen. Tower Bridge 1,3 / 2,6 / 1,6: tornit pysyvät joessa, sillan päät rannoilla. Big Ben palatsin kanssa ryhmänä, ei omasta keskipisteestä.
4. **"Westminster":** tulkitsen palatsin ja Abbeyn. Kerro tulkinta KK:lle parien mukana. Abbey pois kytkimellä, jos KK tarkoittaa vain palatsia.
5. **Talot pois alta (palat, kartta, puut), aina uusiin kansioihin:** uusi skripti, joka lisää `a/siisti-d6.json`:n `_pois`-listaan `osm-d6/osm.json`:n talot isojen mallien suorakaiteilta + marginaali → `a/siisti-d9.json`. `Bounds` ei riitä: ristinmuotoisen St Paul'sin kulmiin jää tyhjää, katso kuvasta. Sitten puut `a/tee-puut-d7.py` (`osm/puut-d9.json`), kartan rakennustaso `a/tee-poistot-lontoo.py` (`TaloPoistotLontoo.cs`, ohje 0326 kohta 5, EI OpenFreeMap-hakuja), palat komennolla `LONTOO_PUUT=$PWD/osm/puut-d9.json LONTOO_RAJA=51.465,51.535,-0.215,0.015 LONTOO_LIDAR="/Volumes/T7 4TB/koodaus/proto-arkisto/_tyo/pelikoodari/lontoo-d/lidar" /opt/homebrew/opt/python@3.14/bin/python3 a/tee-palat-lontoo.py $PWD/osm-d6 $PWD/palat-d9 $PWD/a/korvaa-tyhja.json $PWD/a/siisti-d9.json` (noin 1 min 20 s). Työkansio `proto-3d/_tyo/pelikoodari/lontoo`.
6. **Sovelluksen mukana:** `Rakennus.cs:1090` osoittaa `palat-d7`:ään: vaihda `palat-d9`:ään. Tarkista, ettei lähde ole linkki T7:lle.
7. **Tarkistettava:** `TRajat`/`MallinRuutu`/`Peittaa` (`Nahtavyysalue.cs:621–638, 751`) ja `LisaaNimiEste` kertoimella ja kiintopisteellä; kyltit ovat nyt alkuperäisessä lat/lon-pisteessä. Väistö (0641 kohta 2.1): Big Ben ja palatsi menettävät kyltin koko rajalaatikon takia, isona pahenee. `TeeVerkko`n `Pinta` lasketaan ennen kerrointa, joten sillan kansi nousee y-kertoimella: katso sillan päät. Maan korkeus: `MaaH` on yksi luku, isompi jalanjälki voi leijua tai upota rinteessä. E3:n "sienimäinen muoto" St Paul'sin edessä selvittämättä.
8. **Mac-ajo JU:n vuorolla, yksi kysymys per ajo:** skenaario `sk-e3.txt`:n pohjalta; `talot kansio palat-d9`. Vertailu samoilta kohdilta: `aja 51.506 -0.11 0.06 2` (kaukaa, 45°), lähellä `aja <kohde> 0.003 2`, Notre-Dame samalta etäisyydeltä. Ennen-kuvat `isot 0` + `palat-d7`. Parikoosteet 8 rivin PIL:llä (`/opt/homebrew/opt/python@3.14/bin/python3`), kohde kokonaan, ei selitekaistaa; katso kuvat täysikokoisina ennen raporttia.
9. **Iso iPad JU:n vuorolla, kerran valmiina:** malli `ajopyynto-f3.md`: `Documents/talopalat-lontoo-d9`, `muisti-tarkka.txt` tarvitaan uudelleen. Laskenta `a/f-luvut.py <lokikansio>`. Vertaa F3:een: huippu 3 695 Mt (raja 4 080), vapaa väh. 1 424 Mt, p95 24,9 ms. Muistiin vaikuttaa vain palat ja `Rakennus`; kerroin ei tuo uusia verkkoja. Merkintä "iPad, ei iPhone".
10. **Lopuksi:** parit KK:lle (`local_37f7c945-…`), rivi PT:lle sha:lla. Ei TF:ää, ei junaa.

## 2. Juna 220: kala-allas ja kukkaruukku, odottaa
Proto `pelikoodari/ulkoesine-kuplat`, kärki `067210c0f` (backupissa). `2ba7617a1` = 22 avainta, testi, kuplan `Resources.LoadAll` pois. `067210c0f` = neljä omistajan 09.40 hyväksymää kuvaa + metat. Peli-testit 869/869 ennen viimeistä committia, sen jälkeen JuoksuV4 21/21 ja `unity-tarkistus` 0 virhettä. Unity-tuonti ja laiteajo tekemättä. Kirjattu PT:lle.
**Avoinna:** huudot tekee Natiivi-UI Äänittäjän sijaan, polut tulevat PT:ltä hyväksynnän jälkeen → lisää `PuyiHuudot.Kaikki`-tauluun samaan haaraan. Äänet odottavat omistajan kommenttia. Junavuoro PT:ltä.

## 3. Selvitetty ja viety PT:lle
TF 219:n kolme 404:ää (a3-baoding-lod1, a5-marmorikaide-pylvas-lod1, pursotukset.glb): sama kuin 218:ssa, malli ei puutu. LOD1 valinnainen; `pursotukset.glb` ei ole ollut ämpärissä v4–v8:ssa, koodi rakentaa omat ilman LAV:n leivottua valoa. Valoeroa ei katsottu kuvista.

## 4. Auki, ei estä
- Vanhat: TF 219 kohdat a391edd96 kohta 3; `.claude/settings.local.json.ennen-kevennysta` seurantaamaton, ei minun, älä lisää.
- Lontoo G: KK kysyy omistajalta väistyvät kyltit ja St Paul's (0641 kohta 2).

## 5. Opit
- Bash on zsh: `==` tulkitaan komennoksi (`echo ==X` kaataa komentosarjan), käytä `echo '--- X'`.
- Proton juuri on `Assets/`-tasolla, ei `proto-3d/`; lokit `/Users/Shared/Claude/proto-3d/lokit`.
- Puuttuva kuva laukaisi kuplassa koko kansion latauksen: katso diagnoosikoodia, kun tila on uusi.
- Työlistan hook mainitsee "Lontoon nähtävyyksien liioittelu": rivi on PT:n, älä päivitä kysymättä.
