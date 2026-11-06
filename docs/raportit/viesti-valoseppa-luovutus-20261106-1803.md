# Valosepän luovutus 6.11.2026 klo 18.03, täydentää -1736:n (sen kohdat 2–4 pätevät) ja korvaa sen kohdan 1

Syy: konteksti 26 %, ja kaikki odottaa KS:n ajoa. Ajoja ei ole käynnissä minulta.
Raamatun luvun 2 linssikohdat, 7.1–7.6 ja 10.3–10.6 luettu. Luvun 7 viestikohdat ja 10.7 eteenpäin lukematta.

## 1. KOVAT VARJOT: KOODI VALMIS, KUVAT ODOTTAVAT KS:N AJOA
`0ca5f68f6`, natiivi-backup `linssiseppa2/kovat-varjot`, 3d78ea440:n päällä, työpuu `/Users/Shared/Claude/wt/proto-linssiseppa2-k17`. Koe, ei junaan. Sha ja kuvalista KS:lle 18.01 (toimitettu), PT:lle 18.01.
Tarkistettu: Kartta-testit KovaVarjo 8/8, OhjelmaKohde 19/19, unity-tarkistus 0 virhettä. Varjostinta ei ole käännetty, eikä tulosta ole nähty pelissä. `tarkista.sh` antaa rc 1 valovahdista ja liikevahdista: TaloKerros ja OhjelmaKohteet "vari 1". Ne eivät tule tästä muutoksesta, mutta en ajanut vertailua 3d78ea440:llä.

Tapa: `KovaVarjoGeometria.Tee` litistää mallin kolmiot maahan latauksessa kerran; `KovaVarjo` tekee verkon ja yhteisen materiaalin; `Resources/KovaVarjo.shader` kertoo kartan musteella (peitto 0,42), sapluunabitti 32, usva kuten malleilla. Malleilla varjo on `m.T`:n lapsi, joten ei ruutupäivitystä. Pois: kameraan kääntyvä soikio (`AsetaMallinVarjo`), `PehmeaVarjoVerkko`, `VarjonPeitto`, `PaivitaUsva` ohjelmakohteilta, `VarjoUsvaRaja`. Jonot: pohja 2992 ja alle, varjo 2993, talot ja ohjelmakohteet 2994.
"Nykyisen muodon mukainen varjo" oli vain ohjelmakohteilla, ja sekin pehmeä ruudukko; malleilla oli pelkkä soikio.

Omat ratkaisut, PT ja KK voivat kumota:
- Suunta kiinteästi kartalla, 115° (itäkaakko). Valo mallin pinnalla on edelleen kameran mukana, joten kameraa kääntäessä varjo ja valoisa sivu eivät aina täsmää. Kuva `kv-louvre-180` näyttää tämän. Vaihtoehto olisi kameran mukana liukuva varjo, joka vaatisi varjostimen litistyksen.
- Pituus 30 × (1 − e^(−0,2 h / 30)) m: Riemukaari 21, Opéra 13, torni alle 30. Peitto 0,42. Arvioita, viritys: `PituusKerroin`, `PituusKatto`, `KovaVarjo.Peitto`.
- Sacré-Cœurin mäki sai varjon (VarjoKerroin 0 pois).

Tunnetut riskit, katso ajosta:
- Kirkon varjo jää mäen alle, koska varjo on tasossa y = 0. Sama koskee mallin omaa pihaa tai kiveystä: malli piirtyy varjon päälle, ja varjo näkyy vain mallin ulkopuolella. Tämä voi näyttää lähiympäristön vialta.
- Mobile_RPAsset MSAA 1: kova reuna on iPadilla porrastettu. Sama kuin mallien reunoilla; näkyy vain laitteella.
- Sapluuna: jos syvyyspuskurissa ei ole sapluunaa, päällekkäiset kolmiot näkyvät tummempina kuvioina. Linssit käyttävät sapluunaa, joten tämän ei pitäisi tapahtua.

iPadin hinta (arvio, ei laitemittaus), `$D/varjotilasto.py`, malleista laskettu: varjokolmiot 247 000 / mallit 470 000. Eiffel 48 500 (937 kt), muut 1 600–27 000, kukin puu noin 490 eli sama kuin vanha soikio. Muisti enintään noin 4 Mt, jos kaikki alueet ovat ladattuina. Ruutulaskenta vähenee, koska soikion sijoitus poistui. Latausaika kasvaa, mittaamatta. Jos Eiffel on liian kallis, sen ristikko kannattaa korvata yksinkertaisemmalla varjoverkolla.
`D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/kovat-varjot`; `varjot-ylhaalta.png` on esikatselu ylhäältä, tehty ennen pituuden lyhennystä 40 → 30 m (muoto ja suunta oikein, kaikissa sama suunta).

## AJON JÄLKEEN
1. Kuvat `kv-*` (kuvalista `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/sk-kovat-varjot.txt`, tuottaja `$D/tee-sk.py`). Lokista `MATKAKIRJA maavarjot` ja `KovaVarjo`-virheet.
2. Kuva KK:lle: kaikki kohteet samasta kuvakulmasta, ja lähiympäristön viat kohteittain omalla listallaan. Niitä EI korjata ennen KK:n sanaa.
3. Tulos PT:lle: sha, polku, arvio ja iPadin hinta edeltä. Ei iPad-ajoa ilman PT:n sanaa.

## SEURAAVAKSI
Ajo 26 ja Louvre: -1736 kohta 2 (KS lähettää kansion ja sha:n). Kovat varjot tulevat vasta seuraavassa yhteisessä ajossa, joten Louvren usvan tulos ja varjot eivät ole samassa kuvassa.
Worktreet: k17 on nyt haarassa kovat-varjot (`raystas-jalusta` on natiivi-backupissa 84872eaa9), k30 usva-jalka.
`tarkista.sh` muuttaa tyylikirjan generoidut tiedostot: `git restore` ennen committia, `git add` polulla.
