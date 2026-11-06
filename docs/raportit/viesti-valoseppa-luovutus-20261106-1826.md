# Valosepän luovutus 6.11.2026 klo 18.26: TILINVAIHTO (omistaja 18.23, tilille vvi@vvi.fi). Itsenäinen: vanhoja luovutuksia ei tarvitse lukea

Ajoja ei ole käynnissä minulta. Tällä luovutuksella ei ole tehty uutta koodia eikä katsottu uusia kuvia. Järjestys: 1, sitten 2 ja 3.
Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup`; työpuut `/Users/Shared/Claude/wt/proto-linssiseppa2-k17` (kovat-varjot) ja `-k30` (usva-jalka), worktreitä enintään 3. KS:n yhteinen haara Y: `/Users/Shared/Claude/wt/proto-karttaseppa-yhteinen` (karttaseppa/ajo-yhteinen-tasoitus), kärki 33ea85e3b. Kuvat vain KS:n yhteisessä ajossa, ei omaa ajoa. KK:n ja roolien id:t: osoitekirja, tili vaihtuu.
Raamatusta luettu: luvun 2 linssikohdat, 6, 7.1–7.7, 9, 10.1–10.6, 12.9, 12.20. Lukematta: luvun 7 viestikohdat, 10.7 eteenpäin.

## 1. USVAKOE, OMISTAJA 18.20: ALOITTAMATTA, TÄRKEIN
KK välitti OMISTAJAN PYYNNÖN Louvren parin kulmasta: "Minusta tässä kulmassa ei tarvitsisi juuri näkyä usvaa koska horisontti on niin lähellä".
KK:n tavoite: viistosta kulmasta kaupunki ja nähtävyydet näkyvät lähes selvinä horisonttiin asti, jolloin katot eivät jää leijumaan usvan yläpuolelle. KORVAA kattojen lisävaimennuksen; sitä ei tehdä.
Tila: koodia ei ole kirjoitettu, haaraa ei ole. Haara `linssiseppa2/*` Y:n kärjen päälle. Koe, ei junaan. Sha ja kuvalista KS:lle seuraavaan yhteiseen ajoon (ajo 28 on jo valmis, eli ajo 29 tai seuraava; varmista KS:ltä).
Toimitus KK:lle: pari samalta kameralta (po2-ita: `komento kallista 45`, `aja 48.8605387 2.3524118 0.003 2`, `suunta 265`) ja kerrottuna, mitä horisontissa silloin näkyy: kartan reuna, nimet, kyltit, lisäpiirto. Jos usva on peittänyt kartan reunan, se voi nyt näkyä: kerro, älä piilota.
ÄLÄ muuta 5 asteen näkymää ennen kuvaa. Omistajan 10.29:n "loivempi" kerrotaan hänelle rinnalla (`node tools/loki-hae.mjs loivempi`, lukematta).
Lähtökohdat, luettu vain pintapuolin: `Assets/Matkakirja/Kartta/Aurinko.cs` :328–:345 (`RenderSettings.fogStartDistance`/`End`; ajossa 26: 1662..2391, fov 50, silmä 1096, d 1679), `Horisonttiusva.cs` (`RuutuAlkuM`, `RuutuLoppuM`, `Vahvuus`, `KallistusKatto`), `PariisiKallistus` (`RuutuUsva`). Omistaja katsoi 45°:n kuvaa. Malli, kyltti ja kartta käyttävät samaa syvyysusvaa, joten kaikki seuraavat mukana. Reunan tuloa ja lataussädettä ei ole tarkistettu.

## 2. KOVAT VARJOT, OMISTAJA 17.32: KOODI VALMIS, AJO 28 VALMIS, KUVAT KATSOMATTA
Päätös: "nähtävyyksille pitää tehdä pienet kovat varjot jotta istuvat paremmin karttaan. toki osassa lähiympäristö vaatii myös korjaamista." KK:n tavoite: seisoo kartalla kuin painetussa kuvakartassa, terävä pieni varjo samaan suuntaan kaikilla, väri kartan paletista. PT: koe, ei junaan, ei reaaliaikaista varjopassia (kaatui iPadilla 4.11.).
Koodi `0ca5f68f6`, natiivi-backup `linssiseppa2/kovat-varjot`, 3d78ea440:n päällä, k17. Kartta-testit KovaVarjo 8/8, OhjelmaKohde 19/19, unity-tarkistus 0 virhettä. `tarkista.sh` rc 1 valovahdista ja liikevahdista (TaloKerros ja OhjelmaKohteet "vari 1"): ei tästä muutoksesta, mutta vertailu 3d78ea440:llä ajamatta. `tarkista.sh` muuttaa tyylikirjan generoidut tiedostot: `git restore` ennen committia.
Ajo 28: `/Users/Shared/Claude/proto-3d/lokit/karttaseppa-yhteinen-28-b8-33ea85e3b`, Y 33ea85e3b (sisältää 0ca5f68f6), 23 kuvaa `kv-*`, Shader error 0. Kumpikaan (KS, minä) ei ole arvioinut kuvia. Kuvalista `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/sk-kovat-varjot.txt`.
Tapa: `KovaVarjoGeometria.Tee` litistää mallin kolmiot maahan latauksessa kerran; `KovaVarjo` tekee verkon ja yhteisen materiaalin; `Resources/KovaVarjo.shader` kertoo kartan musteella, sapluunabitti 32, usva kuten malleilla. Malleilla varjo on `m.T`:n lapsi. Pois: soikio (`AsetaMallinVarjo`), `PehmeaVarjoVerkko`, `VarjonPeitto`, `PaivitaUsva` ohjelmakohteilta, `VarjoUsvaRaja`. Jonot: pohja 2992 ja alle, varjo 2993, talot ja ohjelmakohteet 2994.
Omat ratkaisut, PT ja KK voivat kumota: suunta kiinteästi 115° kartalla (valo mallin pinnalla seuraa yhä kameraa, `kv-louvre-180` näyttää ristiriidan); pituus 30 × (1 − e^(−0,2 h / 30)) m, peitto 0,42 (arvioita; `PituusKerroin`, `PituusKatto`, `KovaVarjo.Peitto`); Sacré-Cœurin mäki sai varjon.
Riskit, katso kuvista: kirkon varjo jää mäen alle ja mallin oman pihan alle (varjo tasossa y = 0, voi näyttää lähiympäristön vialta); MSAA 1: kova reuna porrastuu iPadilla; päällekkäiset kolmiot tummempina, jos sapluuna puuttuu.
Maavarjot lokista (kolmioita): Notre-Dame 9857, Sainte-Chapelle 15167, Louvre 24028, Eiffel 48528, Grand Palais 27048, Riemukaari 17564, Panthéon 22007, Opéra 25569, Invalidit 24552, Sacré-Cœur 20740, Montparnasse 1594. Tyhjä nimi =11834 on Sacré-Cœurin mäki, ei vika.
iPadin hinta, ARVIO, ei laitemittaus (`D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/kovat-varjot`, `$D/varjotilasto.py`): varjokolmiot 247 000 / mallit 470 000; Eiffel 48 500 (937 kt); kukin puu noin 490; muisti enintään noin 4 Mt kaikki alueet ladattuina. Latausaika kasvaa, mittaamatta.
Seuraavaksi: (a) katso `kv-*` täysikoossa ja loki (`MATKAKIRJA maavarjot`, `KovaVarjo`-virheet). (b) Kuva KK:lle: kaikki kohteet samasta kuvakulmasta, hinta mukana, lähiympäristön viat kohteittain omalla listallaan; niitä EI korjata ennen KK:n sanaa. (c) PT:lle sha, polku, arvio. Ei iPad-ajoa ilman PT:n sanaa.

## 3. ÄÄRIVIIVALASKU: TEKEMÄTTÄ
PT 18.0x: koe kelpaa, mutta ennen junaa kaksi asiaa: arvio, riittääkö yksinkertaistettu ääriviiva, ja mitattu luku iPadilla, koska muisti on Pariisin avoin riski.
Tila: alustava vastaus PT:lle lähetetty: riittänee, koska varjosta näkyy vain kapea reunus mallin ulkopuolella; menetys on Eiffelin ristikon aukot (mainittava). PT hyväksyi suunnitelman: toteutus vasta, kun kuvat on nähty. Ääriviivan KOLMIOMÄÄRÄÄ EI OLE LASKETTU, koodia ei ole, laskuria ei ole; `varjotilasto.py` laskee vain nykyiset täydet varjokolmiot ja on luonnollinen pohja. Tee lasku kohteittain ja vertaa edellisen kohdan lukuihin, kun kuvat on katsottu. iPad-mittaus PT:n sanalla.

## 4. LOUVRE JA KYLTTI: OMISTAJA NÄKI, VASTAUS ON KOHTA 1
`db0a42148` (natiivi-backup `linssiseppa2/usva-jalka`, k30), ajo 26 (3d78ea440): usva jalan syvyydestä, vain `NotreDameKirkkoYhteinen.hlsl`, ei junaan. Jalka korjattu (kontrasti 37, talot 36), katot 60 → 35, Eiffel 85b palautui, Notre-Dame 85 silmämääräisesti ennallaan. PT ei kutsu leijumista poistuneeksi: katot erottuvat taivasta vasten. Pari ja mittarit `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet/kuvat/yhteinen26-3d78ea440/` (`pari-louvre-koko-20-26.png`, `tee-parit.py`, `mittaa.py`). Vanha `a027be140` jää kokeeseen, ei käytössä (heikensi Eiffel 85b:n).
Les Hallesin kyltti vastattu KK:lle: ei usva eikä kärki; ajoissa 18–20 Saint-Eustachen päällä, ajossa 26 väistää, tarkka syy todistamatta. Tarjottu rivi `ui kohdenostot kyltti Les Hallesin hallit` samalla kameralla; KS:ltä vain, jos KK haluaa.
Avoin: `us-nd-85`:ssä ajossa 26 kaksi tummaa pyöreää merkkiä, joita ei ole ajossa 17; selvittämättä.

## 5. SULJETUT
Pompidou: omistaja 16.08, siksak riittää, 9e84124d4 (`linssiseppa2/pompidou-varit`); junaan vain PT:n erillisellä vuorolla. Tummuus (`mk-liike__savy`): PT: tarkoituksellinen; väriparit samassa vuorokaudenajassa. Dither d092f48cc: JU:n haarassa `julkaisija/runko-219-muisti`.

## 6. VANHAT ODOTTAVAT (tila kirjattu viimeksi aamupäivällä, en tarkistanut nyt; ei tärkeysjärjestyksessä)
- Palais Bourbonin lippu: `rajaukset-yhteinen-9/pari-pb-*.png` KK:lla 11.5x, KK:n sana puuttuu.
- Paletin reitti `abd7d1dd8` (`linssiseppa2/paletti-reitti`): koe, ei junaan, palettikuvat ajosta katsomatta.
- Räystäs a309d43de: kuvat JU:lla; 12.08 `raystas7` oli JU:lla. Tulos `proto-3d/_tyo/linssiseppa2/raystas/TULOS-raystas3.md`. Qianqinggongin pohjoispuolen räystäskartta auki, PT:lle kertomatta. LAV:n kysymys friisin portaasta x 650: lähin on r-k--151:n laikku, seinä x 300–800; LAV:lle lähettämättä.
- Puu-3 `f716ca8f7` (`linssiseppa2/puut-kevyet`, ei pushattu): pelissä näkemättä, NS kertoo.
- Siltakuvat: katsomatta. Jos jokin näistä tuntuu auki, `git log --grep` tai KK/PT, älä selaa luovutusketjua.

## TEKNIIKKA
zsh: `"${C}:refs/..."` (ei `$C:refs`), ei `=====`-merkkijonoja. Python + PIL: `/opt/homebrew/bin/python3`; numpy: `_tyo/venv-rembg/bin/python -I`. `git add` polulla. Seuraamattomat `.claude/settings.local.json.ennen-kevennysta` ja `waveletNoiseTile.bin`: en koskenut. Tämä luovutus ja historia: tilaraportti 875 tavua (alle 10 kt), historia jo `arkisto/linssiseppa2-tila-historia-20261106.md`:ssä.
