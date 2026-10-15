# Petřín #274 — viisi lisäkierrosta valmiit, paras ja viimeisin M15 palautteelle

**M11–M15 on tehty M09:n pohjalta. Viiden lisäkierroksen raja täyttyi; mallinnus on pysäytetty. M16:ta ei ole valtuutettu eikä aloitettu.** Lähde on `e8a797c5e3aaf2360c8bbd39db375a7a1fdf3fde`, blob `b93049955540c0e6bf5ff853eb66d58b54be9840`. M09 on PT:n hyväksymä lähtöpohja, ei lopullinen malli.

## Paras ja viimeisin

M15 on sekä paras että viimeisin. Se on mukana kerran kansiossa `M15/`: todellinen `.blend`, kaikki viisi natiivia renderiä, geometrian alfa ja näkyvät/täytetyt maskit, ääriviivavertailut, tarkat perspektiivikamerat, konfiguraatio, rakentamis-/analyysi-/auditointikoodi ja tallennetun mallin uudelleenavausauditointi.

Valintakriteeri säilyi samana: maksimoi viiden näkymän heikoin raja-arvoon suhteutettu natiivi renderi-IoU; keskiarvo ratkaisee tasan. Vertailuun sisältyy myös M09-pohja. `history/` säilyttää M11–M14:n todelliset mallit, kamerat, luvut ja arkit. M01–M10:n toimitushistoria ja M09-pohja säilyvät aiemmassa paketissa `posti/petrin-malliluuppi-273/`, commit `43fd25c05e83b47a07b34a767def3caf223e4274`.

## Todellinen natiivi renderi-IoU, prosenttia

| Kierros | K1, raja 85 | K2, raja 90 | K3, raja 90 | K4, raja 90 | K5, raja 90 | Keskiarvo |
|---|---:|---:|---:|---:|---:|---:|
| M09 pohja | 83.629 | 91.547 | 89.133 | 89.364 | 86.247 | 87.984 |
| M11 | 83.639 | 91.559 | 89.230 | 89.455 | 86.175 | 88.011 |
| M12 | 84.741 | 91.855 | 90.083 | 90.338 | 86.358 | 88.675 |
| M13 | 84.696 | 91.848 | 90.040 | 90.265 | 86.656 | 88.701 |
| M14 | 85.620 | 91.848 | 90.040 | 90.272 | 86.656 | 88.887 |
| M15 | 85.781 | 91.989 | 90.152 | 90.356 | 86.823 | 89.020 |

**M15:n K1–K4 läpäisevät. K5 jää 86,823 prosenttiin ja alittaa 90 prosentin rajan 3,177 prosenttiyksiköllä. Koko malli ei läpäise eikä ole lopullisesti hyväksytty.** Siluetin läpäisy ei ratkaise detaljien tai lähdevarmennuksen puutteita.

Kaikkien viiden uuden kierroksen 25 natiivinäkymän leikkaus-/unionipikselit ja IoU laskettiin uudelleen tallennetuista maskeista. Lisäksi geometrian natiivialfasta muodostettiin täytetty maski eri toteutuksella (Pillowin nelinaapurinen ulkotaustan täyttö), ja tulos vastasi jokaista tallennettua maskia täsmälleen. Kaikkien kohdekuvien, kohdemaskien, kameroiden, renderien ja mallien SHA:t täsmäävät. Viisi tallennettua `.blend`-tiedostoa avattiin erikseen auditointiin; jokaisessa on kahdeksan jalkakenkäkomponenttia eikä tavoitekuvia tekstuureina. Näytöt ovat `final-numerical-verification.json`-tiedostossa. Tämä on tuottajan numeerinen tarkistus; erillinen arvioija kertoo oman tarkistuksensa rajat omassa raportissaan.

## Geometria ja sitovat mitat

M11: yläkopin lähtösäde muuttui 3,70 metriin, umpinainen alavyö 1,40 metriin ja alapuolisen viisteen alapiste 50 metriin. Alatasanteelle lisättiin todelliset vinotuet ja niiden sidokset, halliin punaiset fyysiset ikkunaluukut. Kaiteen ristikkorytmi tiheni. Yksityiskohdat ovat rekonstruktiota, eivät mitattua rakennusfaktaa.

M13/M15: kopin XY-leveyttä, olkakohtaa, epävarmaa mastokorkeutta ja alageometrian leveyttä sovitettiin rajatusti samaan todelliseen 3D-malliin. M15:n kopin XY-kerroin on 0,967, katon olkapiste 56,648m ja epävarma maston kärki 67,7575m. M15:ssa alatasanteen XY-kerroin on 0,9592 (uloke 4,08 % pienempi kuin M14:ssä); sen vinotukien ankkureita ei siirretty. Kokeet ja täsmälliset arvot säilyvät `optimization/`-lokeissa. Alageometrian kerroin 0,9978 vaimenee tasolle 20 m; hallin seiniä ei vinoonnettu. Maston sallittu arvioalue 66,5–71 m säilyi.

**58,7 m rungon/katon yläpinta, 20 m alatasanteen lattia ja 51 m ylätasanteen lattia säilyvät kaikissa viidessä tallennetussa mallissa.** Auditoinnin liukulukupoikkeama on alle 0,0001 m. Generoitujen tavoitteiden eri tasannepaikkoja ei kopioitu muuttamalla näitä korkeuksia. Malli ei sisällä erillistä maalaattaa tai sorakiekkoa.

Alkuperäisen konfiguraation vanhat `lattice_pitch`-tyyppiset kentät eivät kaikki ole aktiivisia: todellisen ristikon tasoluettelo ja sauvapaksuudet määräytyvät kierroskohtaisesta `build_and_render.py`-koodista ja tallennetusta geometriasta. Tämä toimitus ei väitä mitattua kaikkien säteiden, aukotusten tai K4:n pohjoisdetaljien totuutta.

## Kamerasovitus erikseen

M12–M15: todelliset perspektiivikamerat sovitettiin samoista Blender-objekteista vietyihin 40 696 kärkeen ja 66 952 kolmioon. Ulkotaustatäyttö ja täyden tornin kuvassa pysymisen tarkistus estävät siluetin keinotekoisen rajaamisen. Kuvia tai tavoitemaskeja ei venytetty, väännetty tai maalattu. Lopullinen taulukko perustuu aina todellisiin Blender-natiivirendereihin, ei sovittimen ehdotuksiin.

M15:n natiivissa ohjelmistoprojektiossa suurin ero Blender-IoU:hun on 0,004423 prosenttiyksikköä. Puoliresoluutiota käytettiin vain diagnostiikkaan; optimointi tehtiin natiivikoossa. Hakurajat M09:n kameroihin nähden: atsimuutti ±6°, etäisyys ±15 %, silmän korkeus 85–115 % ja ylärajan 0,25 m lisä, pitch ±3°, pystynäkökenttä ±12 % ja pääpiste ±30 px. Tarkat rajat/evaluoinnit ovat jokaisen kameran lokissa. Nämä ovat sovituksen rajoja, eivät mitattuja kuvauspaikkojen virherajoja.

| Kamera | Atsimuutti°, M09→M15 | Etäisyys m | Silmän korkeus m | Pitch° | Pystynäkökenttä° |
|---|---:|---:|---:|---:|---:|
| K1 | 195.14 → 189.14 | 196.22 → 183.95 | 74.23 → 63.10 | -13.29 → -10.62 | 32.96 → 34.17 |
| K2 | 186.42 → 185.83 | 49.55 → 51.04 | 1.55 → 1.71 | 24.03 → 23.35 | 64.65 → 63.29 |
| K3 | 273.37 → 274.81 | 100.61 → 99.02 | 1.36 → 1.52 | 15.28 → 15.28 | 39.78 → 39.78 |
| K4 | 6.17 → 8.18 | 80.34 → 79.56 | 1.37 → 1.56 | 20.61 → 20.63 | 47.03 → 46.95 |
| K5 | 95.59 → 93.22 | 125.69 → 125.78 | 120.70 → 120.98 | -37.21 → -37.23 | 30.26 → 29.81 |

## Sävy ja avoimet erot

Vihreä maanheijastus ja sävytetty taivas korvattiin harmaalla maalla ja valkoisella päivänvalolla. Teräs on tumma sinertävänharmaa (`60758A`), halli vaalea kerma (`EFE4D0`) ja luukut punaiset (`A34F45`); nämä ovat materiaaliestimaatteja. M13:sta lähtien esikatselun valotus on +0,25 EV. Ympäristö on neutraali esikatselu.

**Sitova materiaalivärin ΔE on edelleen `null`.** Pikseli-ΔE sisältää muoto-/kohdistus-/valaistusvirheitä eikä ole materiaalivärin läpäisy. M13:n tuore erillinen välitarkistus ja tämän toimituksen uusi loppuarvio on säilytetty. Yläkopin/maston yksityiskohdat, hallin aukotus ja jalkojen/kaarien liitokset sekä alatasanteen reunat ja tuenta jäävät osin tavoitetta kaavamaisemmiksi. K5:n ulkoraja ei täyty. K5:n peittyvä maapiste on edelleen arvio; hyväksytty v2-maski ei ole riippumaton pikselisertifikaatti. K4:n pohjoisdetaljit ovat varmentamaton rekonstruktio.

## Tila ja toistettavuus

Kaikki viisi tavoitekuvaa ja niiden aktiiviset maskit ovat PT-hyväksyttyjä. Niiden hyväksyntä ei ole tämän mallin hyväksyntä. #274:n rajattu työ päättyy tähän toimitukseen ja PT:n palautteen odotukseen; koko mallin loppuhyväksyntä on avoin. Ei uusia AI-kuvia (0; aiemmat 7 kutsua ennallaan), ei R2-vientiä, peli-integraatiota, main-yhdistämistä tai julkaisua. Peking/Pulu ja muut tilaukset eivät kuulu tähän toimitukseen.

Blender 5.2.1 LTS, Cycles/Metal. Erillisessä kopiossa luo `renders/` ja `qa/`, suorita mallihakemiston `build_and_render.py`, sitten `analyse_round.py` NumPy/Pillow-Pythonilla ja `audit_saved_model.py` Blenderissä. Sovituksen C++-lähde ja apuskriptit ovat `scripts/`; ne käyttävät tuotantoroottina NAS-polkua, joka on vaihdettava erillisessä toisintoympäristössä. C++-kirjasto rakennetaan `clang++ -O3 -std=c++17 -dynamiclib project_mesh.cpp -o libproject_mesh.dylib`. Kohdehavainnekuvien alkuperäisten lähdevalokuvien tekijät, URL:t ja lisenssit säilyvät `source-licenses.json`-tiedostossa. Malli ei käytä tavoitekuvia tekstuureina.
