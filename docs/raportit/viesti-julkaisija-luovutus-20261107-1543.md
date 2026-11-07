# Julkaisija: luovutus 7.11.2026 klo 15.43

Rooli: JU. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, R = P/Matkakirja-proto, jonoloki T/jono-20261103-ilta.txt. Korvaa -1448:n; sen ja vanhempien OPIT, SÄÄNNÖT ja YÖN SÄÄNNÖT voimassa (git show dcbd33af7:docs/raportit/viesti-julkaisija-luovutus-20261107-1448.md; tapa ja vahdit git show 02e202344:docs/raportit/viesti-julkaisija-luovutus-20261107-1231.md rivit 18–19).

## ALOITA: Monitor jonolokiin (tail -n 0 -F, grep 'AJO |VIKA|runko takaisin|RUNKO TAKAISIN|ALKOI|SEIS|JONOSSA|PERUTTU|KORJAUS', 30 min), sitten ps pideistä. Kaikki on nohupilla. Kuolleesta iPad-ajosta: runko ja kytkin ensin, oma vanha lukko pois, rivi tilaajalle ja PT:lle, ei uusintaa ilman sanaa. Katso myös /tmp/ju-portti.lukko.

## JONO (kuittaus tilaajalle: kuvat, md5, aika, älä arvioi; jonolokin Exception-luku on pinon rivejä, katso poikkeukset rajaamatta)
PT:n järjestys 15.2x: junan ehdot ensin; junan ajo saa L1:n heti vapauduttuaan. Ajot ottavat vapaan linjan (T/ju-vapaa.zsh).
Ajossa:
- L1: PK i13 5bd4aa484 ALKOI 15.42, sitten i13p 08ca315a4 samasta skriptistä, pid 21208, T/pk-i13-jonossa.zsh, 21 + 9 kuvaa, lokit/pelikoodari-lontoo-{i13-5bd4aa484,i13p-08ca315a4}, aikaraja 45. Junan ehto (Lontoo-nimi), koe, ei junaan ennen kuvia. Kuittaus PK:lle, kun molemmat valmiit; PK lukee lukemat.
- L2: NUI kyltti-korjaus-1 053f58aff, ALKOI 15.38, pid 83805, 7 kuvaa + tallenne. Kuittaus NUI:lle (id osoitekirjasta).
- iPad: KS kumpu 59319f789, ALKOI 15.38, pid 81617, T/ks-kumpu-ipad-b.zsh, vahti päällä, 6 kuvaa per ajo. Kuittaus KS:lle sisältäen rivin "KS kumpu offline:". Junan ehto. Kuittauksen jälkeen: .app pois (lokit/julkaisija-laite-218-59319f789/Matkakirja3D.app; ei runkoa d092f48cc), tarkista ettei ajo käytä.
Odottaa:
1. VS film5 93426d60e pid 21209, i13:n alun jälkeen, Ultra, 14 kuvaa, lokit/linssiseppa2-film5-93426d60e. Kuittaus VS:lle samaan id:hen (laatutaso-Ultra-pakotettu > 0, samat kuvat nimeten). Ei junaan.
2. NUI elämä 5 f7aadccbb pid 98012, kyltin jälkeen, 38 kuvaa + tallenne, lokit/natiivi-ui-kartan-elama-5-f7aadccbb. Kuittaus NUI:lle. Ei junaan.
3. NS julkisivu3 f3d680c47 pid 98014, elämä 5:n jälkeen, 3 ajoa (päällä 24 kuvaa + tallenne; pois ja koodi vain tallenne, 0 kuvaa), lokit/natiiviseppa-julkisivu3-{paalla,pois,koodi}. Skripti tarkistaa palat > 0; muuten SEIS ja rivi NS:lle. Kerro NS:lle "talot: N palaa kansiossa" ja samat kuvat. Ei junaan.

## JUNA 220: julkaisija/juna-220 = 0e7e2cde4, natiivi-backupissa, junarivit kirjattu. Ei käännetty tässä kokoonpanossa.
Lisätty: 1ac096b26 dc02fc5ad 30c33d5b9 (PK Lontoon pallo ja Tower, 3b4ed8814), KS:n 8 committia talot kauemmas, palat, Panthéon, -poisto2 (0e7e2cde4; omistaja 15.21; KS testit Kartta 704/704, Peli 870/870, vahdit ok; ketjua ei ole ajettu kokonaisena).
Ei lähtösanaa. Ei käännöstä viennille ennen PT:n VIE-sanaa. Odottaa ainakin: kumpu, Lontoo-nimi i13, muurin palkki/boordi (PT:n päätös, LAV arvioi). Kun runko on lopullinen: yhteisajo sk-50 + PT 15.3x: RINNALLE yksi kylmä aloitus isolla iPadilla lopullisella rungolla (pohja lokit/natiiviseppa-aloitus-ipad-kylma-2cba21a3e, skripti haettava T:stä natiiviseppa-aloitus-ipad-kylma-ajo-nimellä tai NS:ltä), iPad-kuvat PT:lle; ei ennen kummun ja palkin ajoja. Sen jälkeen yöportti uudelleen (gh workflow run natiivi-yoportti.yml, lue vaiheet).

## LEVY: 32 Gi 15.42. Rajat ja .app-sääntö kuten -1448.

## KUITATTU tällä vuorolla: PK i10, i11, i12; VS film3, film4; NUI elämä 3; KS talot-yla (.app pois); LAV palkki, palkki2; NS julkisivu2-päällä. Peruttu tilaajan sanalla: julkisivu2 pois+koodi, NUI elämä 4 ja elämä 5 1ad1dea49.

## OPIT
- Jonolokin "Exception" laskee pinon rivejä: tämän päivän ajoissa 2 Cesium-riviä + ESIKATSELU POIKKEUS (editorin haku), myös valmiissa ajoissa. Älä rajaa poikkeuslistaa head:lla (oma moka i10-kuittauksessa, oikaistu PK:lle).
- Portti ei noudata järjestystä. Järjestys pakotetaan: odottavat vaihdetaan uusiin skripteihin (uusi tiedosto, ei ajossa olevan muokkausta), ja ajossa olevan portille tuleva vaihdetaan vasta, kun sen ajo on loppu; siihen asti /tmp/ju-portti.lukko kiinni (T/ju-jarjestys-1522.zsh). Muista ketjut: pidiä odottava vapautuu, kun odotettava tapetaan, joten seuraavat vaihdetaan samalla.
- vapaa + ALKOI-rivin odotus voi valita juuri varatun linjan, koska ALKOI tulee ennen lukkoa: lisää sleep 30 (kuten film5) tai odota pid.
- zsh: $N:r on muunnin (työntö meni rikki); käytä täysiä refejä tai ${N}.
- Turvatarkistus esti 15.01 monimutkaisen zsh-komennon (${(j:,:)...}) tulkintakelvottomana, vaikka poistoa ei ollut. Ei kierretty; pidä kill-skriptit tiedostossa ja yksinkertaisina.
- Film3 Ultrana: 39 kuvaa + 583 s odotuksia vei 655 s (film2: 35 kuvaa + 517 s, noin 10 min), joten Ultra ei näyttänyt hidastavan.
