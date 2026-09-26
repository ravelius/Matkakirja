# Linssisepän luovutus 26.9.2026 aamulla (f)

*Linssiseppä (Opus), sessio 15ddf057 (local_45a869de), 26.9. klo 00.47–05.3x. Edellinen: -e.md (sama sessio).
Postivahti 05.3x: viikkokiintiö 90 %, tilinvaihto lähestyy.*

## Tila

- **Build 18 (master 43a6347c):** II:n 151/152/148, pariteettiäänet, laattaesilataus ja radion esikuuntelu.
- **Build 19 -juna:** linssiseppa/tehoste-rekisteri 859b937a (keksinto ja vuosi Pelikoodarin tehosteväylällä).
- **Elävä kartta:** omistaja hyväksyi videon suunnan 26.9. klo 05.0x. Pelattava versio tehdään build 19:ään kohta
  kohdalta, ja kohta 1 (saapuminen) on ensin. Fable pyytää kuvaparin omistajalle jokaisesta erästä.

## Elävä kartta, kohta 1: saapuminen (haara linssiseppa/elava-kartta 899ff2f5, wt/proto-linssiseppa-elava)

- Profiilit (Ydin/Elava/ElavaProfiili): video 18,5 s ja saapuminen ≤ 5 s. Saapumisessa:
  - huntu 0–1,6 s
  - joet ja rajat 0,4–2,5 s
  - maakunnat 2,0–3,2 s
  - nostot 2,6–3,8 s
  - aurinko laskee ja nousee kartan valoon 0–4,2 s
  - luovutus pysyville kerroksille 4,3–4,8 s
- Laukaisu: PeliOhjain.MatkaPerilla, kun maa on uusi (Pelaaja.Kaydyt). Kohdemaan joet haetaan lennon noustessa
  (Karttasepän julisteet/pallo/vektorit/joet-2026-09-26b/<ISO>.geojson). Maakuntarajat ja karttavalot jäsennetään kerran
  taustalla. Napautus ohittaa, ja vähennetty liike ohittaa kokonaan.
- Komennot (linssi-komento.txt): `elava saapuminen <kaupunki>` (Natiivisepän saapumisajo + kohtaus), `elava saapumiset 0|1`,
  `elava kaikki 0|1` (testi) sekä videon `elava kreikka | kuva <s> | saato | ui | pois | tila`.
- **Sovittu Natiivisepän kanssa** (hänen luovutuksensa g; koukut Ytimessä: Linssit/Ydin/Elava/ElavaPallo.cs). Pallon puolen
  toteuttaa seuraava Natiiviseppä:
  - ElavaPallo.Paljastus / PaljastusPois → Varitaso.Paljastus / PaljastusPois
  - PysyvatKerrokset → MaaKartta.Saapuminen / NostoKerros.Saapuminen
  - IlmoitaSaapuminenAlkaa / Paattyi → PalloKierto.AjaSaapumisnakymaan
  Asettamattomina toimivat paikkamerkit: verkkohuntu, ja maakunnat piilotetaan MaaKartta.Linssit-portilla.
- Testit 314/314, tarkista 0 virhettä. **Käännös käynnissä 05.31** (scratchpad kaanna.sh saapuminen …), sen jälkeen
  `ajo-saapuminen.sh`:
  - automaattinen laukaisu Marseillessa (FRA)
  - Ateenan testiajo: kuvat 0,9 / 1,8 / 2,9 / 3,6 / 5,4 s ja video
  → kuvapari (2,9 s ja 5,4 s) omistajalle ja Fablelle → merge-pyyntö Natiivisepälle.
- Seuraavaksi kohdat 2–3: maakunta herää. Pelikoodarin pelilogiikka on jo junassa: tapahtumat MaakuntaHeraa ja
  NostoLoytyi sekä NostonMuste. Natiivi-UI tekee kartussin. Sen jälkeen kohdat 4–5 (yövalomaski sekä laiva ja boidit).

## Muut

- Scratchpad 15ddf057: kaanna.sh, ajo-elava.sh, media-elava.sh, ajo-im2.sh, ajo-saapuminen.sh, mittaa-klikit.sh,
  ajo-esilataus-im2.sh + apu.sh (zsh: `${=VAR}`, apufunktioissa `local`).
- Effortia ei voi vaihtaa omasta sessiosta. Fable voi vaihtaa sen: set_session_effort local_45a869de… high.

## Päivitys klo 06.5x

- **Elävä kartta, kohta 1** on build 19 -junassa (linssiseppa/elava-kartta ed136705, juna/b13 b2a5fb4a).
  - Natiivisepän pallopuoli (natiiviseppa/elava-saapuminen) on mergetty ja kytketty.
  - Huntu on saapumismaahan rajattu verkkohuntu. Laattahunnun kahden sarjan sekoitus on build 20+:ssa.
  - Simulaattori:
    - aloituslennon saapuminen käynnistyy itsestään
    - valmistelu 0,8 s testin pikakäynnistyksessä ja 0,2 s välimuistista
    - kehysajan mediaani 18 ms
    - lepopiirto palaa: `pallo lepo` → lepää
- **Linssien aineisto pois kylmästä käynnistyksestä** on build 19 -junassa (linssiseppa/lykatty-data 0693c0d8 +
  natiivi-ui/linssit-heti dc66cd26, juna d706da81).
  - Aineiston lataus alkoi 15,2 s:n kohdalla joutilaana kartalla ja valmistui 17,2 s:ssa.
  - LinssiSisalto käyttää Sisalto.HaePaketista-funktiota.
  - Valitsin kutsuu LataaAineistoHeti.
- **Seuraavaksi kohta 3 (maakunta herää).** Ehdotus Natiivisepälle klo 06.5x:
  - minä: MaakuntaHeraa → ≤ 2,5 s:n herätys, jossa väri valuu, käsialanimi ja merkit tulevat ja lopuksi luovutus
  - Natiiviseppä: MaaKartta piirtää heränneet täysin sävyin ja muut paperina sekä Herata(maakunta, piilossa)
  - Natiivi-UI: kartussi

## Päivitys klo 07.0x

- **Kohta 3 (maakunta herää)** on merge-pyynnössä: linssiseppa/maakunta-heraa d7395a81 (wt/proto-linssiseppa-elava),
  mukana natiiviseppa/maakunta-heraa.
  - Sisältö: MaaKartta.Heraannyt musteesta ja ElavaHerays (≤ 2,4 s), joka käynnistyy MaakuntaHeraa-tapahtumasta, kun
    kartta on vapaa. Komento `elava herata <ISO:tunnus>`.
  - Simulaattori: Occitanie herää, ja pallo lepää lopuksi.
  - **Avoin:** pelin pysyvä maakuntatäyttö ei näy pelinäkymässä (oletuksena vain rajat), joten heränneen värin pitää
    näkyä, vaikka täyttö olisi pois. Korjaus kysytty Natiivisepältä. Kuvapari omistajalle vasta sen jälkeen.
- Kohta 2 (nostojen kokoluokat ja himmeät jäljet) on Natiivisepän ja Pelikoodarin NostoKerros-työtä. Minulta ei
  vielä pyydetty mitään. Kohdat 4–5 (yövalomaski sekä laiva ja boidit) ovat seuraavaksi.

## Päivitys klo 07.2x

- **Kohta 3** on build 19 -junassa: linssiseppa/maakunta-heraa c05835ef + Natiivisepän korjaus, juna/b13 6697be58.
  Herännyt maakunta näkyy täysin sävyin myös oletusrajoilla.
- **JUMI (data):** paketin karttavaloista puuttuu "maakunta"-kenttä, joten muste sanoo "nosto:marathon (ei maakuntaa
  0/0)" eikä MaakuntaHeraa laukea. Asia on Fablella: Siirtoseppä vie kentän, tai Pelikoodari laskee sen ajossa.
  Kun data on paikallaan, testaa `vari GRC` + `aja 38.4 23.4 7 1.5` + peli-komento `muste loyda nosto:marathon`
  (skripti ajo-herays.sh) ja lähetä kuvapari omistajalle.
- Seuraavaksi kohdat 4–5 (yövalomaski käydyille sekä laiva ja boidit) Fablen järjestyksessä.

## Päivitys klo 07.3x

- **Kohta 3 on todennettu koko ketjuna** (juna/b13 fdc47632, paketti v151, tuore asennus `PUHDAS=1`). Data-JUMI on purettu:
  karttavalon tunnus on `kohde:marathon`, ja Siirtosepän korjaukset ovat junassa.
  - Ketju: löytö → GRC:Attiki 1/14 → herätys (tulva 83 km, käsialanimi) → Attika jää herääneeksi (herännyt 1,
    uinuva 13) → lepo.
  - Kuvapari on lähetetty omistajalle ja Fablelle: lokit/linssiseppa-herays-20260926/omistajalle/.
- Seuraavaksi kohdat 4–5 Fablen järjestyksessä.

## Päivitys klo 07.5x: kohta 2 (nostojen kokoluokat ja himmeät jäljet, build 20)

- **Jako (Natiiviseppä ja Natiivi-UI, sovittu):**
  - NostoKerros.Muste on Natiivisepän (natiiviseppa/nosto-muste 77bcaed4).
  - Merkit, koot 1,0 / 0,67 / 0,44 ja hehku piirtää Natiivi-UI (NostotKartalla, UI Toolkit).
  - Minä teen jäljen ulkoasun ja löydön käyrän.
- **Haara linssiseppa/muste-jaljet fcbdb97f** (wt/proto-linssiseppa-elava, juna fdc47632 + nosto-muste):
  - MusteJaljet.Hae(valoId): 10 muunnelman pooli, 128², suora alfa, mipmapit.
  - Lisäksi Hehku() ja Loyto(t).
  - NostoKerros.Muste on kytketty Pelikoodarin musteesta (ElavaHerays).
  - Testit 316/316.
  - Natiivi-UI mergeää haaran omaansa, ja ne kulkevat yhdessä build 20:een. Simulaattorikuvapari tulee, kun Natiivi-UI:n
    merkit käyttävät jälkiä.
- Seuraavaksi kohta 4 (reitti kynänjälkenä, luonnokset käydyissä kaupungeissa, yövalot vain käydyissä: Karttasepän
  yövalosarja) ja viimeisenä kohta 5 (elävät hetket).

## Päivitys klo 08.0x (viikko 95 %, lepokäsky 98 %:ssa; työ jatkuu tilinvaihdon jälkeen)

- **Kohta 2:** muste-jaljet fcbdb97f on mergetty Natiivi-UI:n haaraan natiivi-ui/nosto-muste fed603b9. Siinä merkit
  käyttävät jälkiä (Hae, kierto ja peilaus), hehkua ja Loyto-käyrää. Natiivi-UI tekee yhteisen merge-pyynnön kuvineen
  build 20:een. NostoKerros.Muste kytketään vain ElavaHeraysissa.
- **Kohta 4, jako hyväksytty (Fable 08.0x):**
  - Pelikoodari: webin kuljettu reitti natiiviin (PeliOhjain.KuljettuReitti, lista (kaupunki, kulkutapa) ja
    tapahtuma KuljettuReittiKasvoi). Pyydetty 08.0x, vastausta odotetaan.
  - MINÄ: reitti kynänjälkenä (Kynaviiva, uusi osuus piirtyy noin 1 s saapumisen jälkeen, levossa staattinen). Lisäksi
    käytyjen kaupunkien hehku kaukana pallolla (Pehmeapiste, staattinen, säde löydösten mukaan, häipyy lähelle
    zoomatessa). Hehku on väliaikainen, ja Natiivisepän yövalomaski korvaa sen.
  - Natiivi-UI: luonnokset (Karttasepän miniatyyrit) käytyjen kaupunkien merkeissä.
- **Kohta 5 viimeisenä:** elävät hetket, eli laivat 1873-reiteillä (paketti 1.46), lintuparvet, junan savu ja sade.
  Lepopiirto säilyy, ja tapahtuma herättää piirron vain 3 s:ksi.
- Worktreet: wt/proto-linssiseppa (lykatty-data, junassa), wt/proto-linssiseppa-aanet (tehoste-rekisteri, junassa),
  wt/proto-linssiseppa-elava (muste-jaljet). Mergetyt haarat voi poistaa, kun build 19 on masterissa.

## Päivitys klo 08.3x: kohta 4, oma osuus koodattu (build 19 = master 41dd79c7)

- **Haara linssiseppa/kirjoitettu-maailma 89b054e8** (wt/proto-linssiseppa-elava, juna/b13 427e1a1a:n päällä):
  - Linssit/Unity/ElavaMatka.cs: kuljettu reitti Kynaviiva-kynänjälkenä (punainen muste, isoympyräkaaret). Uusin osuus
    piirtyy 1,1 s:ssa, kun reitti kasvaa. Muuten viiva on staattinen, ja PallonLepo herää vain piirron ajaksi.
  - Hehku: käydyt kaupungit hehkuvat kaukana (Pehmeapiste lisäävänä). Hehku alkaa 2 500 km:stä ja on täysi 6 000 km:ssä,
    ja takapuoli karsitaan. Viiva häipyy alle 25 km:n korkeudella.
  - Kynaviiva: valinnainen horisonttirajaus `_Keskus.w = 1`. Videon viivat ovat ennallaan.
  - Komento: `elava reitti <kaupungit…> | pois`.
  - ElavaMatka.Reitti (Func) odottaa Pelikoodarin KuljettuReittiä, joka on pyydetty 08.0x. Ilman sitä hehku tulee
    joukosta Pelaaja.Kaydyt.
- **Käännös:** jonossa TestFlight-lukon (08.28) ja junan 427e1a1a jälkeen. Taustalla ketjutettuna on scratchpad
  `ajo-matka.sh`, joka ottaa kuvat kaukaa, Euroopasta, piirtymisestä, läheltä, takapuolelta ja pois-tilasta
  (lokit/linssiseppa-matka-20260926/). Sitten kuvapari omistajalle ja Fablelle, .meta Unitylta ja merge-pyyntö.

## Päivitys klo 08.5x: kohta 5 (elävät hetket) koodattu kohdan 4 päälle

- **Haara linssiseppa/elavat-hetket 89d0d258** on pinottu kohdan 4 päälle (kirjoitettu-maailma 89b054e8). Merge-pyyntö
  koskee koko haaraa, tai kohta 4 ensin.
  - Ydin/Elava/Hetket.cs (puhdas, testattu):
    - HetkiAjastin: ensimmäinen hetki 45–120 s:n kuluttua, sitten 2–5 min välein. Varattuna lykkäys 20 s.
    - HetkenValinta: laji niistä, joilla on näkyvä kohde, eikä sama laji peräkkäin. Radat 1873-viivoja pitkin
      (laiva 5 % ja juna 8 % näkymän halkaisijasta), parvi maakunnan yli ja sade länsituulessa.
    - Reitti1873.Jasenna lukee paketin kokoelman reitit1873 (alkiot, viivat [lon, lat]).
  - Ydin/Aanet/HetkienAanet.cs: syntetisoidut hiljaiset äänet eli tuuli, kaukainen laivan kello, sade ja junan
    puhallukset. Huiput 0,02–0,06, keksinnön kilahduksen luokkaa. Ei äänitiedostoja eikä lisenssejä.
  - Unity/ElavatHetket.cs:
    - 3 s:n hetki ruutupisteinä: videon Laiva-varjostin, vana ja savu; veturi ja vaunut; 11 linnun V-parvi;
      kuuro ja juovat.
    - Ehdot: vain maa- ja maakuntanäkymässä (15–2 500 km), kun kartta on vapaa, kamera on ollut levossa 5 s ja
      sitä on liikutettu viimeisen 10 min aikana. Ei hetkiä vähennetyllä liikkeellä.
    - Lepopiirto: PallonLepo.Animoi (ei joutosykkeen aktiivisuutta), loppuun Valmistui.
    - Komennot `elava hetki [laiva|juna|parvi|sade]` ja `elava hetket 0|1|tila`.
  - Testit 321/321, tarkista 0 virhettä.
- **Käännös:** scratchpad `kaanna.sh hetket linssiseppa/elavat-hetket` odottaa junan (3f2db11b) käännöstä. Taustalla
  ketjutettuna `ajo-matka.sh` ajaa kohdan 4 ja kohdan 5 lajit (laiva, parvi ja sade Kreikassa, juna Lontoossa)
  sekä `pallo lepo`. Kuvat tulevat hakemistoon lokit/linssiseppa-matka-20260926/, ja niistä kuvapari omistajalle ja
  Fablelle. Unityn .metat (ElavaMatka, ElavatHetket, Hetket, HetkienAanet) otetaan käännöksen -metat-kansiosta.

## Päivitys klo 09.3x (uusi sessio f0b4fec1, Fable local_5df52e10)

- Kohtien 4+5 ajo (bc093f2f = master 41dd79c7 + elavat-hetket 26d13476): 0 poikkeusta, lepo toimii, reitti
  piirtyy ja hehku näkyy, laiva erottuu. Parvi, sade ja juna olivat 334 km:n näkymässä liian pieniä → suurennettu
  (5f50d3f2) ja .metat lisätty (f9bf44ed). Ensimmäisen ajon kuvat: lokit/linssiseppa-matka-20260926-v1/.
- Käännös `kaanna.sh hetket2` ja uusi `ajo-matka.sh` ketjutettuna taustalla (vanha scratchpad 15ddf057) →
  kuvapari omistajalle ja Fablelle → merge-pyyntö Natiivisepälle (build 20).

## Päivitys klo 10.4x

- **Merge-pyyntö Natiivisepällä (build 20):** linssiseppa/usva-159 16c9ee36 (wt/proto-linssiseppa) = natiiviseppa/usva-153
  + elavat-hetket (kohdat 4+5, omistaja hyväksyi kohdan 5) + löydös 159 (Horisonttiusva.hlsl Kynäviivaan, Vanaan, Laivaan,
  Pehmeapisteeseen) + juna 12679a12 koemergettynä (MusteJaljet-metat junasta).
- Testit: Peli 288/288, Linssit 321/321, unity-tarkistus 0. Simulaattori cc198e66: usva toimii, 0 poikkeusta
  (lokit/linssiseppa-usva159-20260926/).
- **Reitin väri (omistaja 09.5x: tummanpunainen, läpikuultava, leveä):** 5,5 pt. Ensimmäinen versio (0,45, 0,07, 0,06, 0,5)
  näytti kermalla ruskehtavan roosalta, joten oletus on nyt (0,50, 0,02, 0,03, 0,65). Komento
  `elava reitti vari r g b a [pt]`. Vaihtoehtojen A/B/C käännös ja ajo ovat taustalla (scratchpad f0b4fec1 ajo-vari.sh →
  lokit/linssiseppa-reittivari-20260926/) → kuvapari Fablelle ja omistajalle.
- **Elävä kerros:** Natiivisepän rajapinta on lukittu (proto-3d/lokit/elava-kerros-rajapinta.md, 6 tarkennustani hyväksytty),
  ja toteutus tulee build 20:n jälkeen. Siirrä PallonLepo.Animoi-kutsut ElavaKerros.Animoi-kutsuiksi, kun haara tulee.
- **Elävät elementit:** omistaja hyväksyi selvityksen docs/raportit/elavat-elementit-selvitys-20260926.md. Järjestys on myllyt →
  karuselli → pallo → gondolit → Lontoo (pyörä + siipiratashöyry) → köysirata + Etna, ja kokeilut alkavat build 20:n
  jälkeen. AIKA-sääntö: kartta elää nykyajassa, joten 1873-tarkistusta ei tehdä.
- Lipputanko 161: liehunta on Natiivisepän Liput.Aaltoile. Minulta tarvitaan vain ajastus, kun hän pyytää.

## Päivitys klo 11.1x

- **Build 20 = TF 1.0.20** (master 1a57cc39). Siinä on usva-159 7f5291f4: kohdat 4+5, löydös 159 ja reitin väri A.
- **Build 21 -junassa** juna/b13 4ae6df79: usva-159 1308bfec, jossa on omistajan valitsema väri B (0,50, 0,02, 0,03,
  peitto 0,65), katkoviiva (Kynäviivan _Katko, jakso noin 16 pt kahden potenssiin, viivaa 60 %) ja
  ElavaMatka.NakyvissaKysely. Natiivi-UI:n kytkin "Kuljettu reitti" on haarassa natiivi-ui/kuljettu-kytkin.
  Simulaattorissa f88d9378 toimivat usva, piilotus ja lepo, poikkeuksia 0. Kuvat: lokit/linssiseppa-katko-20260926/.
- Testikomennot: `elava reitti vari r g b a [pt]` ja `elava reitti nakyy 0|1|oletus`.
- **Valkoinen neliö Mont Blancilla** (Natiivisepän pariteettiajo): ei tule linsseistä. Todennäköisesti se on Natiivi-UI:n tason 1
  kuvamerkki merkki-vuori.png, jonka tekstuuri on tyhjä. Erottelukomennot on annettu Natiivisepälle.
- **Karttaseppä:** polkudatan muoto on sovittu (tools/vienti/elavat-polut.json.gz, reitit1873-rakenne + pysakit + kulku).
  Järjestys: Canal Grande → Thames → köysirata Chamonix. Budapest on varapaikka, ja Afrikan kolme aluetta tulevat myöhemmin.
- **Seuraavaksi:** build 20:n PASS ja Natiivisepän ElavaKerros-haara → siirrä PallonLepo.Animoi-kutsut → myllyt
  (kokeilu 1). Worktree wt/proto-linssiseppa-elava (elavat-hetket) poistetaan, kun build 21 on masterissa.

## Päivitys klo 14.5x

- **Löydös 162 (saapuminen luennan jälkeen)** on build 21:ssä (4b52b8f0 = juna 64887a7a). Haara
  linssiseppa/saapuminen-luennan-jalkeen: 64f7625d, sitten kuvapakan korjaus 2d850f73, jossa Natiivi-UI:n Hiljeni(0).
  - ElavaKartta: Vaihe.Odottaa (kohtaus ajassa 0). Käynnistyy, kun ElavaHerays.HiljaisuudenEste() == null on ollut
    voimassa 0,6 s. Esteet: luento, SaapumisluentaKesken (Pelikoodari 23f262bf), Puhe.Soi, KorttiAukiKysely
    (Natiivi-UI 5662eab5), kuvasumennus, portti ja linssi. Kun vain kuvasumennus on jäljellä, KuvapakkaLahtee →
    viive 0,2 s.
  - Sama ehto koskee elävät hetket ja maakunnan herätyksen.
  - Todennettu (lokit/linssiseppa-162-20260926/): luento → 0,2 s, Ohita → 0,6 s, ääni pois + kortti → ≤ 1 s.
  - Testikomento `elava saapuminen <kaupunki> odota`. Skriptit scratchpadissa f0b4fec1: ajo-162d.sh.
  - HUOM: Marseillen saapumispuhe kestää vain 3,5 s, joten testiskriptin "FAIL: soi luennan aikana" on virhehälytys.
- **ISS-linssin suunnitelma** docs/raportit/iss-linssi-suunnitelma-20260926.md odottaa omistajan kuittausta (poissa 2 pv).
  Toteutus vasta build 22:n ja myllyjen jälkeen.
- **Seuraavaksi:** Natiivisepän ElavaKerros-haara → siirrä PallonLepo.Animoi-kutsut → myllyt (kokeilu 1).

## Päivitys klo 15.3x

- **Myllyt (elävät elementit, kokeilu 1)** merge-pyynnössä Natiivisepälle build 22:een: linssiseppa/myllyt 383b6d04
  (wt/proto-linssiseppa). Sisältö:
  - Linssit/Unity/ElavatElementit.cs: proseduraalinen mylly, 220 kolmiota. MyllyGeometria: runko ja siivet.
  - Linssit/Resources/Varjostimet/Malli.shader.
  - Pop-up-asento (ruudun ylös, kameraa kohti 25°, nosto 0,45 × koko) ja koko 34 pt. Näkyy 15–600 km, häivytys 450 km:stä.
  - Siivet ElavaKerros.Animoi 30 fps:llä, pysähtyvät kun Staattinen tai vähennetty liike.
  - Komento `elava myllyt tila|0|1`.
  - Samassa haarassa ElavatHetket ja ElavaMatkan kynänpiirto on siirretty ElavaKerrokselle (Elava-layer).
  - Kuvat ja video omistajalle: lokit/linssiseppa-myllyt-20260926/omistajalle/.
- **ElavaKerros** on masterissa (build 21, Natiiviseppä df65ba85): Animoi(käynnissä, nimi, fps, pohja), Taso, Staattinen.
- **Cupola-kehys** on ämpärissä (karttanostot/20260926/iss-cupola-*, 6 tiedostoa, manifesti postissa bf8a6101d).
  Kehys peittää noin 40 % ruudusta. Sovitus ja omistajan kuvapari tehdään ISS-toteutuksessa.
- **Polton aika 26.–27.9.:** yksi käännös kerrallaan, ei koekäännöksiä, ja rivi Karttasepälle ennen jokaista käännöstä.
- **Seuraavaksi:** omistajan kuittaus myllyistä → Kööpenhaminan karuselli (kokeilu 2) → pallo → gondolit (Karttasepän
  polku elavat-polut-2026-09-26b) → Lontoo → köysirata ja Etna. Sen jälkeen ISS (SGP4 + kaukonäkymä ensin, TLE-Actions
  Siirtosepälle).

## Päivitys klo 17.0x

- **Myllyt:** omistaja hyväksyi ne 15.2x, ja ne ovat build 22:ssa.
- **Karuselli (kokeilu 2)** on build 23:ssa (7533a651, juna 1356e216). Haara linssiseppa/karuselli 7c943071, jonka
  worktree wt/proto-linssiseppa on vielä olemassa.
  - ElavatElementit on yleistetty: Aihe (paikka, KokoPt, yksilöt, Runko, Roottori, Lapsi, LastenPaikat, Animoi(roottori,
    lapset, t)), MalliRakenne (VaippaRaidat) ja MalliVarit.
  - Näkyvyys vaatii nyt myös ruudun (RuutuVara 12 %), ja se on todennettu build 23:ssa.
  - Komento `elava elementit|myllyt tila|0|1`.
  - Kuvapari ja video on lähetetty omistajalle. Omistajan kuittaus odottaa, ja sen jälkeen tulee kokeilu 3: Pariisin
    kiinnitetty ilmapallo (Tuileries, nousu ja lasku 24 s, kori heiluu 5 s, terrakotta).
- **ISS-suunnitelma** on hyväksytty. Siihen on lisätty Cupola-ikkuna 420 km:stä, Kuvaputken tilaus (toimitettu ämpäriin
  karttanostot/20260926/iss-cupola-*) ja Astronautin kameran jatkoideat 1–4.
- **Siivous:** proto-worktree wt/proto-linssiseppa-elava poistettu, simulaattorit D0D2… ja 903C… tyhjennetty (erase), ja
  main on pullattu (sallinnat #3329).
