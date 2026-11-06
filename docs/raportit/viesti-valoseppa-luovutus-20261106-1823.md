# Valosepän luovutus 6.11.2026 klo 18.23, korvaa -1803:n ja -1736:n kohdat 1–2 (muut -1736:n ja -1556:n kohdat pätevät; Louvre on tässä kohdassa 1)

Syy: konteksti 34 %, uusi tehtävä tuli juuri rajalla. Ajoja ei ole käynnissä minulta.

## 0. UUSI TEHTÄVÄ (ALOITTAMATTA, TÄRKEIN): VÄHEMMÄN USVAA VIISTOSTA KULMASTA
KK välitti OMISTAJAN PYYNNÖN klo 18.20 Louvren parin kulmasta: "Minusta tässä kulmassa ei tarvitsisi juuri näkyä usvaa koska horisontti on niin lähellä".
KK:n tavoite: tästä viistosta kulmasta kaupunki ja nähtävyydet näkyvät lähes selvinä horisonttiin asti, jolloin katot eivät jää leijumaan usvan yläpuolelle. KORVAA kattojen lisävaimennuksen; sitä ei tehdä.
Tee kokeena seuraavaan yhteiseen ajoon (ajo 28 on KS:llä kokoamassa; kysy, ehtiikö, muuten sitä seuraava). Pari samalta kameralta (po2-ita, `komento kallista 45`, `aja 48.8605387 2.3524118 0.003 2`, `suunta 265`) KK:lle, ja kerro, mitä horisontissa silloin näkyy: kartan reuna, nimet, kyltit, lisäpiirto.
ÄLÄ muuta 5 asteen näkymää ennen kuvaa. Omistajan 10.29:n "loivempi" kerrotaan hänelle rinnalla (hae loki: `node tools/loki-hae.mjs loivempi`; en lukenut).
Lähtökohdat, lukematta tarkemmin: `Assets/Matkakirja/Kartta/Aurinko.cs` :328–:345 (`RenderSettings.fogStartDistance`/`End`, usvamitan arvot ajossa 26: 1662..2391, fov 50, silmä 1096, d 1679), `Horisonttiusva.cs` (`RuutuAlkuM`, `RuutuLoppuM`, `Vahvuus`, `KallistusKatto`), `PariisiKallistus` (`RuutuUsva`). Omistaja katsoi 45°:n kuvaa. Malli, kyltti ja kartta käyttävät samaa syvyysusvaa, joten kaikki seuraavat mukana. Reunan tuloa ja lataussädettä ei ole tarkistettu: jos usva on peittänyt kartan reunan, se voi nyt näkyä. Kerro se KK:lle, älä piilota.
Haara: oma `linssiseppa2/*`, pohjaksi Y:n kärki (`/Users/Shared/Claude/wt/proto-karttaseppa-yhteinen`, haara karttaseppa/ajo-yhteinen-tasoitus). Koe, ei junaan.

## 1. LOUVRE JA KYLTTI: OMISTAJALLA
db0a42148, ajo 26: jalka korjattu (kontrasti 37, talot 36), katot 60 → 35, Eiffel 85b palautui, Notre-Dame 85 silmämääräisesti ennallaan. PT ei kutsu leijumista poistuneeksi: katot erottuvat taivasta vasten. Pari `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet/kuvat/yhteinen26-3d78ea440/pari-louvre-koko-20-26.png` (myös `tee-parit.py`, `mittaa.py`). Omistaja näki sen, vastaus on kohta 0.
Les Hallesin kyltti: vastattu KK:lle. Ei usva eikä kärki; näkyi ajoissa 18–20 Saint-Eustachen päällä, ajossa 26 väistää. Tarkka syy todistamatta. Tarjosin rivin `ui kohdenostot kyltti Les Hallesin hallit` samalla kameralla; pyydetään KS:ltä vain, jos KK haluaa.
Avoin: `us-nd-85`:ssä ajossa 26 kaksi tummaa pyöreää merkkiä, joita ei ole ajossa 17; selvittämättä.

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
Ajo 26 ja Louvren arvio ovat valmiit (kohta 1). Seuraavaksi kohta 0, sitten kovien varjojen kuvat ajosta 28.
Worktreet: k17 on nyt haarassa kovat-varjot (`raystas-jalusta` on natiivi-backupissa 84872eaa9), k30 usva-jalka.
`tarkista.sh` muuttaa tyylikirjan generoidut tiedostot: `git restore` ennen committia, `git add` polulla.

## LISÄYS KS:LTÄ 18.0x
Kovat varjot menevät ajoon 28, koska ajo 27 on käynnissä. Y on edennyt 162912f91:een, ja KS yhdistää mergellä (koeyhdistys ilman ristiriitoja). KS lähettää kansion ja sha:n ajon jälkeen. Louvre db0a42148 on ajossa 26 tai 27: katso, kumpaan se meni (KS:n luovutus -1738, kohta ENSIN 2).


## PT:N EHDOT KOVILLE VARJOILLE
PT 18.0x: koe kelpaa. Ennen junaa arvio yksinkertaistetusta ääriviivasta (PT hyväksyi suunnitelman; Eiffelin aukkojen menetys mainittava; kolmiomäärä laskematta) ja mitattu luku iPadilla, koska muisti on Pariisin avoin riski. Hinta kerrotaan KK:lle kuvien yhteydessä. PT: ei uutta luovutusta ennen 35 %:a.
Kovat varjot ajossa 28: KS yhdistää 0ca5f68f6:n mergellä Y:hen (162912f91 tai uudempi).
