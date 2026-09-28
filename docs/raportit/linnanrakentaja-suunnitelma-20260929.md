# Linnanrakentajan suunnitelma: elävä linna (Poikkileikkaus-linssi), 29.9.2026

Linnanrakentaja (Opus, max). Erä 0. Pohjana omistajan toive 28.9. klo 23.53 ("jumalattoman hienon näköisen ja
monistettavan konseptin"), Päätoimittajan aloitusviesti ja kuuden Sonnet-ali-agentin selvitykset (natiivin linssit,
web ja Pulu, URP-renderöinti, datamalli ja glTF, web-polku, Codexin tarvelista).

## Polku Päätoimittajalle

1. Linssin nimi on **Poikkileikkaus** (id `poikkileikkaus`, katalogin E11) ja moottori **dioraama**. Nimi "Elävä" on jo
   Elävän kartan käytössä (`Linssit/Ydin/Elava/`). Olavinlinnan näkymän otsikko on "Olavinlinna – elävä linna".
2. Kirjaa poikkeus Raamatun sääntöön UUSIA LINSSEJÄ EI ALOITETA ENNEN PARITEETTIA (omistajan aloitus 29.9. klo 00.0x).
3. Codex-tilauksen osa 1 (kohta 8.1) on valmis lähetettäväksi nyt. Osa 2 lähtee erän 1 jälkeen harmaan keittiön kuvien kanssa.
4. Välitä nämä: Natiiviseppä, näyttämörajapinta (8.4). Pelikoodari, äänet, repliikit ja äänisilmukat (8.2).
   Sisältökirjuri, faktat (8.3).
5. Pulu esiintyy nykyisenä Puluna, jotta hahmo pysyy tunnistettavana. Maalattu Pulu tilataan vain, jos erä 2 näyttää tyyliristiriidan.
6. Erä 1 (harmaa keittiö) alkaa heti. Kun se on valmis, lähetän kuvat ja videon.

## 1. Tavoite

Pelaaja avaa linssin, ja Olavinlinna aukeaa dioraamana, jonka kaikki kerrokset ovat auki. Kamera liukuu huoneesta toiseen
syväterävyydellä. Tarkennettu huone herää: ihmiset työskentelevät, liike lisääntyy ja äänimaisema tarkentuu. Pulu liitää
paikalle ja laskeutuu. Hän esittää opetustaululla ensin linnan 3 ydinasiaa ja sitten huoneen 3 kohtaa. Henkilöillä on
1–2 repliikkiä, joihin Pulu reagoi. Tyyli on Codexin konseptin maalattu, lämmin ja tiheä kuvitus: 3D-palikat maalatuin
pinnoin ja maalatut hahmokortit silmukka-animaatioin. Tyyli ei ole realistista 3D:tä.
Huoneiden sijainnit ovat tulkintaa, ja se sanotaan pelaajalle ("tulkinta").

Näyttävyys syntyy kuudesta asiasta (erät 2–3):
1. Linna aukeaa: suljetun linnan seinäkannet liukuvat pois ja valot lämpenevät.
2. Miniatyyrin syväterävyys ja lämmin valo.
3. Porrastettu herääminen.
4. Kameran nosturiliike, jonka mukana Pulu liitää.
5. Ympäristön elämä: savu, liput, lokit, veneet ja vesi.
6. Äänimaisema, joka tarkentuu huoneeseen.

## 2. Arkkitehtuuri

```
PELIN REPO (lähde, Linnanrakentaja)              ÄMPÄRI media.matkakirja.app/dioraama/<rakennus>/<hash>/
  js/dioraama/rakennukset/olavinlinna.js           tilat/<tila>.glb   pinnat/*.png   hahmot/*.png   aanet/*.mp3
  js/dioraama/pankit/{palikat,henkilot,aanet}.js         ▲
  tools/dioraama/rakenna.mjs (RAKENNUSKONE) ─────────────┘  sama .glb natiiville ja webille (sha256 datassa)
        │ tools/vienti (LISAMODUULIT)
        ▼
  sisältöpaketti moduulit/js/dioraama/*.json ──► natiivi: LinssiSisalto.HaePaketista (sama paketti kuin webillä)
                                              └► web: import()
```

- **Yksi moottori, rakennus datana.** Moottori ei tunne linnoja. Rakennus koostuu tiloista, palikoista, henkilöistä,
  äänistä, tauluista ja aikakerroksista, ja moottori piirtää ne kaikki samalla tavalla.
- **Rakennuskone** (Node, deterministinen, `node --test`) tekee reseptien ja rakennusdatan pohjalta jokaiselle tilalle
  oman `.glb`:n. Geometria tehdään kerran, ja natiivi ja web lukevat saman tiedoston, joten pariteetti syntyy
  rakenteesta. Kahta rinnakkaista generaattoria (C# ja JS) ei ylläpidetä. Unityyn ei tarvita uutta pakettia: natiivin
  lukija on oma osajoukkolukija, jonka pohja on Pelikoodarin `Peli/GlbLukija.cs`. Rekvisiitta on samaa glb-muotoa, joko
  reseptistä tai myöhemmin CC0- tai omana mallina.
- **Kohtaus ajan funktiona** (Elävän kartan `ElavaKohtaus` -malli): kameran, herätyksen ja käsikirjoituksen tila
  lasketaan puhtaassa C#:ssa ajasta ja pelaajan valinnoista. Unity vain piirtää sen. Siksi pysäytyskuvat voi ottaa
  mistä hetkestä tahansa, ja testit ajetaan ilman editoria. Samat testivektorit (JSON) ajetaan webin node-testissä.
- **Pikakehityssilmukka:** `rakenna.mjs` → `Documents/dioraama/` simulaattoriin (ohittaa paketin) → `poikki lataa`.
  Uudelleenkäännöstä ei tarvita. Webissä kehitystila rakentaa geometrian lennossa samalla koodilla.

## 3. Datamalli

**Koordinaatisto:** metrit. +X on itä, +Y ylös ja +Z etelä. Järjestelmä on oikeakätinen ja sama kuin glTF:ssä ja three.js:ssä.
Unityssä sijainti on (x, y, −z), joten +Z osoittaa pohjoiseen kuten `Kartta/Erikoismallit/Olavinlinna.cs`:ssä, ja
kolmioiden kiertosuunta käännetään. Kierrot tehdään vain pystyakselin ympäri kompassiasteina (0 = katse pohjoiseen).
Siksi Euler- ja kvaternioerot eivät synny.

- **Rakennus** (`olavinlinna.js`): `id, nimi, versio, lahteet[], geoAnkkuri {lat, lon, suuntima}, aikakerrokset[]`
  (erässä 1 yksi, "1500-luvun alku, tulkinta"), `yleiskamera {vaaka, pysty}`, `taulu` (linnan 3 ydinasiaa: teksti,
  lähde, tila `luonnos|tarkistettu`) ja `tilat[]`.
- **Tila:** `id, nimi, rajat (AABB), glb {tiedosto, sha256}, naapurit[], kannet[]` (avautuvat seinät, erä 3),
  `kamera {kohde[x,y,z], atsimuutti, korkeus, etaisyys, fov, aukko}` (kiertorata; tarkennus = etäisyys),
  `pulu {laskeutuminen[x,y,z], taulupuoli}`, `taulu` (3 kohtaa), `hahmot[]`, `aanet[]`, `kasikirjoitus[]`,
  myöhemmin `etsittavat[]` ja `tehtavat[]`.
- **Hahmo:** `id, henkilo` (pankki), `paikka, suunta, peilattu, silmukka, reitti? {pisteet, nopeus, tauko}`,
  `heraa` (tila, jossa animoituu: 0/1/2), `repliikit[{id, teksti, aani}]`, `reaktio {id, teksti, aani}` (Pulun).
- **Palikkapankki:** reseptit (id → muoto + parametrit + pinnat) ja pinnat (tekstuuri, toistomitta metreinä,
  leikkausnauha). **Henkilöpankki:** atlas, ruutu, sarakkeet, pivot, `korkeus_m`, silmukat {idle, tyo, kavely,
  puhe: rivi, ruudut, fps}, kortti (512² muotokuva), lisenssi. **Äänipankki:** tiedosto, silmukka|kerta,
  voimakkuus, kesto_s, lisenssi. Puuttuva ääni tai kuva on hiljaisuus tai harmaa korvike, ei virhe.
- **Validointi:** skeemat tiedostoissa `tools/vienti/skeema/dioraama-*.schema.json`, ja ne ajetaan nykyisellä `validoi.mjs`:llä.
  Portti on vientiportti ja `tests/dioraama.test.mjs`. C#-ydin jäsentää samat testiaineistot (synkkaskripti kopioi ne Linssit-testeihin).
- **Versio:** `versio` + sisältöhash. Molemmat moottorit kirjaavat lokiin, minkä hashin ne latasivat.
- Keittiön esimerkkiluonnos (Sonnet): scratchpadissa `keittio-esimerkki.json`, ja se viedään erässä 1 repoon
  muunnettuna yllä olevaan kiertorata- ja suuntimamuotoon.

## 4. Natiivi (Unity 6000.3, proto-git)

Omat tiedostot ovat Linssit-kansiossa kuten muiden linssiroolien (Linssiseppä 2:n `Ydin/Vuosi/`-malli). Haarat nimetään
`linnanrakentaja/<aihe>` masterin pohjalta, ja merge-pyyntö menee Natiivisepälle (testit: `Linssit-testit/kaanna.sh`
ja `Peli-testit/unity-tarkistus.sh`).

- `Linssit/Ydin/Dioraama/` (puhdas C#, `Matkakirja.Linssit.Ydin`): `DioraamaData`, `DioraamaGlb`
  (osajoukko: POSITION, NORMAL, TEXCOORD_0, COLOR_0, nimetyt solmut ja primitiivi pintaa kohden), `Kameraliike`,
  `Heratys`, `Ohjaaja` ja `PoikkileikkausLinssi` (`LinssiTiedot.Kesken = true` eikä kynnysriviä, joten linssi on hiomassa
  ja näkyy vain kehittäjätilassa).
- `Linssit/Unity/Dioraama*.cs`: sovitin (`ILinssi`), näyttämö (oma kamera, oma kerros, Volume ja tausta),
  rakennus (glb → Mesh + materiaalit), hahmot (kortit + UV-animaatio), äänet, Pulu-ankkuri ja komennot.
- `Linssit/Resources/Varjostimet/Dioraama{Maalattu,Hahmo,Hehku}.shader`.
- `UI/Linssit/Dioraama{Taulu,Kohteet}.cs`: opetustaulu ja huoneiden napautusalueet.
- `LinssiOhjain.cs`: kaksi riviä (rekisteröinti ja komentohaara `poikki`). Tiedosto on yhteinen, joten ilmoitan Linssisepälle.
- **Näyttämö:** linssillä on oma kamera ja kerros kaukana pallosta. Pallon kamera ja Cesium-päivitys pannaan tauolle
  **Natiivisepän rajapinnalla** (8.4). Erässä 1 rajapintaa ei vielä ole: oma kamera piirtää pallon päälle, ja pallon
  kameran hukka mitataan. Linssi avataan ja suljetaan `Peite`llä (0,3 s). Erässä 3 avaukseen tulee lento Savonlinnaan
  ja linnan avautuminen.
- **Renderöinti** (Mobile_RPAsset: Forward, renderöintiskaala 0,8, SRP Batcher):
  - Maalattu varjostin: unlit, jossa on 20–30 % pehmeää suuntavaloa, verteksi-AO (rakennuskone laskee sen) ja
    vaaleampi leikkausnauha seinien katkaisupinnoissa. Aikavärisävy on globaali vektori.
  - Ei MaterialPropertyBlockia, ja float4x4-arvot vektoreina Propertiesissä (talon kaksi aiempaa SRP-bugia).
  - Hahmot: alpha-cutout, joten lajittelua ei tarvita.
  - Hehku: additiiviset liekkikortit.
  - Valot: enintään 1 reaaliaikainen pistevalo, ja vain herätetyssä huoneessa. Ei varjoja; hahmojen alla on maalattu läiskävarjo.
  - **Syväterävyys:** URP:n Gaussian DoF kuten `Kartta/Filmipino.cs`:ssä (koko pino 3–5 ms iPhonella, DoF arviolta
    1–2 ms). Syvyystekstuuri on vain linssin kamerassa. Tarkennus on kameran etäisyys kohteeseen. Yleisnäkymässä
    loiva miniatyyriterävyys, huoneessa voimakas taustan sumennus.
- **Pulu:** nykyinen Pulu (`UI/Livia`, UI Toolkit) ankkuroidaan laskeutumispisteen ruutupaikkaan. Lento on kaari
  ruudulla, ja koko määräytyy syvyydestä. Puhe tulee `Pulu.Sano`sta (ääni ja kuplat). Opetustaulu on Pulun vieressä:
  3 kohtaa yksi kerrallaan, peitto enintään 45 %, animaatio alle 250 ms, ei koristeita.
- **Äänet:** linssisopimuksen `Tehoste`/`Taustaaani` ei riitä useaan silmukkaan, joiden voimakkuus muuttuu. Tarvitaan
  Pelikoodarin rajapinta (8.2). Tasot 0/1/2 → voimakkuus 0 / 0,25 / 1, ja liuku kestää 1,2 s.
- **Testikomennot** (`linssi-komento.txt`): `linssi poikkileikkaus`, `poikki yleis|tila <id>`, `poikki aika <s>`
  (pysäytys), `poikki taso <tila> <0-2>`, `poikki dof 0|1`, `poikki lataa`, `poikki mittaus`. Kuvat otetaan
  `komento.txt`:n komennolla `kuva <nimi>`.

## 5. Kamera, herätys ja käsikirjoitus

- **Kamera = kiertorata:** kohde + atsimuutti + korkeuskulma + etäisyys + fov.
  - Siirtymässä kohde kulkee Catmull-Rom-käyrää (välipiste valinnainen). Kulmat ja etäisyys muuttuvat smootherstepillä.
  - Nosturiliike: etäisyyteen lisätään 0,25 · |Δkohde| · sin(πt).
  - Kesto T = clamp(1,6 + 0,35·√|Δ|; 2,0; 3,8) s.
  - Luvut ovat datassa, joten web ja natiivi liikkuvat identtisesti (testivektorit).
- **Huoneessa:** veto kääntää ±20° vaakaan ja ±10° pystyyn, nipistys 0,75–1,3× etäisyydestä. Nipistys rajan yli
  vie yleisnäkymään. Maalatut hahmokortit näyttävät oikeilta tällä kaarella (kiinteä 3/4-kuvakulma).
- **Pysty ja vaaka:** yleisnäkymällä on kummallekin oma asento. Huoneen asento toimii molemmissa.
- **Herätys:**
  - Tasot: 0 uni (pysäytyskehys tai 4 fps), 1 torkku (idle puolinopeudella, ambienssi 25 %) ja 2 hereillä
    (kaikki silmukat, reittihahmot tulevat sisään, tehosteäänet, tulen lepatus).
  - Kohdehuone saa tason 2, datan naapurit tason 1 ja muut tason 0. Yleisnäkymässä kaikki ovat tasolla 1 ja animaatio
    kulkee 6 fps:llä, joten linna hengittää.
  - Herääminen alkaa, kun siirtymästä on kulunut 60 %. Hahmot heräävät 0,15–0,3 s:n välein.
  - Taso toimii samalla suorituskyvyn LOD:na.
- **Käsikirjoitus (data):** askeleet `pulu-lenna`, `taulu`, `kohta n`, `repliikki`, `reaktio`, `odota` ja `kamera`.
  Napautus vie eteenpäin, ja puheen loppu jatkaa itsestään. Kun hahmoa napautetaan, hahmo sanoo repliikkinsä ja Pulu reagoi.
- **Avaus:** yleisnäkymä → Pulu liitää → linnan taulu (3 ydinasiaa) → huoneiden napautusalueet näkyviin (pelaaja
  valitsee, tai "Seuraava" vie kiertueella eteenpäin).

## 6. Suorituskykybudjetti

| | iPhone 15–17 | iPad Pro (M) |
|---|---|---|
| Ruudunpäivitys | 60 fps, GPU p95 ≤ 12 ms | 60 fps (120 kokeiluna), GPU p95 ≤ 10 ms |
| Renderöintiskaala | 0,8 | 0,8–1,0 |
| Piirtokutsut / kolmiot | ≤ 150 / ≤ 250 k | ≤ 200 / ≤ 350 k |
| Tekstuurimuisti | ≤ 120 Mt (PNG → RGBA32, erät 1–2); tavoite ≤ 80 Mt (ETC2 `Compress` tai ASTC) | ≤ 200 Mt |
| Täysin animoidut hahmot | ≤ 10 herätetyssä huoneessa, muut 0–6 fps | ≤ 15 |
| Äänilähteet | ≤ 12 | ≤ 16 |
| Syväterävyys | ≤ 2 ms | ≤ 1,5 ms |
| Avaus välimuistista / tilan ensilataus | ≤ 2 s / ≤ 5 Mt | ≤ 2 s / ≤ 8 Mt (@2x) |

Mittaus tehdään talon omalla `Kartta/KehysMittari.cs`:llä (`kehysajat.jsonl`: p50/p95/p99, GPU ms ja lämpö).
`poikki mittaus` ajaa jaksot yleisnäkymä 10 s, siirtymä 10 s ja herätetty keittiö 10 s. Simulaattori ei kerro GPU:sta,
joten laitemittaus tehdään erässä 2 Laitetestaajan tai Natiivisepän laitevuorolla.

## 7. Web-versio (Siirtoseppä) samasta datasta

- Siirtoseppä aloittaa, kun natiivin erä 3 on valmis, ja web valmistuu ennen kuin linssi avataan pelaajille.
- **three.js:** webissä ei ole omaa three.js:ää (se on Globe.gl:n UMD-paketin sisällä). Siksi ämpäriin viedään oma kopio
  `vendor/three-<versio>/` (moduulikäännös, GLTFLoader, EffectComposer), ja se ladataan dynaamisella importilla kuten `js/geo.js`.
- **Moduulit:** `js/linssit/poikkileikkaus.js` (rekisteririvi `tila: 'hiomassa'`) ja `js/dioraama/*`. Data-,
  kamera-, herätys- ja käsikirjoituslogiikka on puhdasta JS:ää, ja node-testit ajetaan samoilla testivektoreilla kuin C#.
- **Piirto:** glb:t ovat samat kuin natiivissa. Materiaali on `MeshBasicMaterial` + `onBeforeCompile` (leikkausnauha, sävy).
  Hahmot piirretään InstancedMeshinä UV-ruuduin ja alphaTestillä, hehku additiivisina kortteina.
- **Syväterävyys:** oletuksena halpa jäljitelmä (tarkentamattomat tilat himmenevät), BokehPass vain tehokkaille laitteille.
  Porrastus: ei DoF:ää → matalampi DPR → vähemmän hereillä olevia hahmoja. `prefers-reduced-motion` huomioidaan.
- **Äänet ja Pulu:** äänet kulkevat nykyisten ääniputkien kautta (id + kesto kuten `LIVIAN_KESTOT`). Pulu ja kuplat
  käyttävät webin nykyistä Pulua kuten ISS-kyydissä.
- **Pariteetti:**
  - Numeeriset testivektorit (kamera-asennot näytteinä, herätys ja käsikirjoitus).
  - Kuvaparit kultaisista asennoista, kuvakulma ja SHA merkittynä kuvaan.
  - Skeematesti tarkistaa, että kaikki id:t löytyvät pankeista.
- Työmäärä on arviolta 5–6 erää: data ja testit → maalatut tilat ja kamera → hahmot → hehku, DoF ja suorituskyky
  → äänet ja Pulu → pariteetti.

## 8. Tarvelista

### 8.1 Codex (Päätoimittajan kautta)

**Osa 1: voidaan tilata heti, ei riipu geometriasta**
- **Pinnat:** jokainen on oma, saumattomasti toistuva tekstuuri (tarkistus 2×2-esikatselulla), 1024² PNG sRGB.
  Ulkomuurin kivi, leikkausnauha (vaaleampi täytekivi ja ohut tumma ääriviiva, 2048×512), rapattu sisäseinä,
  lankkulattia, palkki/pylväs (trim), liuskekivikatto, tornin tiilivyö (2048×512), kallio ja vesirajanauha.
  Valo tulee ylhäältä vasemmalta noin 45°. Valo on lämmin ja AO pehmeä. Heittovarjoja ei maalata, koska moottori ei piirrä varjoja.
  Paletti mitattiin konseptista:
  `#ad9f8c` kivi, `#caa678` lankku, `#5c5652` katto, `#9c7b6a` tiili, `#d38c41` liekki, `#e7d7bd` rappaus,
  `#465e68` vesi, `#34281d` varjo.
- **Koehahmo: kokki** (hämmentää pataa), jotta tyyli hyväksytään ennen muita.
  - Kiinteä 3/4-kuvakulma edestä ylhäältä (korkeuskulma 30°), yksi suunta, peilaus sallittu.
  - Ruutu 256×384 px (iPad; iPhone skaalataan puoleen), pivot jaloissa, alfa, 2048²-atlas.
  - Silmukat: idle 8, työ 12 ja puhe 6 ruutua, 10 fps. Lisäksi henkilökortti, 512² rintakuva.
- **Opetustaulun kehys:** kevyt 9-slice (ohut maalattu puukehys tai liuskekivi), tekstialue tyhjä, ei koristeita,
  @2x/@3x ja 9-slice-rajat merkittyinä.
- **Hehkukortit:** tulisijan liekki, kynttilä ja soihtu, 4–8 ruudun silmukka additiiviseen piirtoon.
- Toimitus: `~/Documents/Codex/<pvm>/dioraama-osa1/`, jossa `final/`, `previews/` ja `manifest.json` (sha256) kuten
  konseptitoimituksessa. Kaikki on omaa kuvitusta. Konsepti on tyylireferenssi, ei kopioitava malli.

**Osa 2: erän 1 jälkeen, mukaan harmaan keittiön kuvat ja rakennuskoneen UV-pohjat**
- Keittiön uniikki tulisija ja huuva.
- Apulainen (pilkkoo ja vaivaa taikinaa) ja vesipoika (kävely 8 ruutua + kanto).
- Rekvisiitta matalapolygonisena glb:nä tai tekstuureina: pöydät, penkit, tynnyrit, padat ja säkit.
- Sen jälkeen muut 7 tilaa erissä.

### 8.2 Pelikoodari

- **Äänet** (CC0/CC BY, `lisenssiKelpaa`):
  - Keittiö: ambienssi, tulen rätinä, padan poreilu, pilkkominen, vaivaaminen, askeleet puulla ja kivellä, vesisanko, ovi.
  - Koko linna: tuuli, järven laineet, lokit ja kaukaiset kellot.
- **Puhe:**
  - Repliikit äänitettyinä: 3 hahmoa × 1–2 repliikkiä, jokaisella oma ääni.
  - Pulun reaktiot ja taulujen puhe (3 + 3 kohtaa).
  - Tagisääntö: ei [softly]/[whispers], yksi tunnetagi virkettä kohden.
  - Luonnosrepliikit kirjoitan erässä 1, ja Sisältökirjuri tarkistaa ne.
- **Natiivin rajapinta:** linssin silmukat, esimerkiksi `ILinssiYmparisto.Silmukka(tunnus, url) → kahva {Voimakkuus,
  Lopeta}`, tai lupa linssin omille AudioSourceille Aanisoittimen mikserin alla.

### 8.3 Sisältökirjuri

- Faktantarkistus ennen kuin ääni tehdään: linnan 3 ydinasiaa (1475, Erik Axelsson Tott, itärajan puolustus,
  säilyneisyyden sananmuoto, museo ja oopperajuhlat) ja keittiön 3 kohtaa (tuli, ruoka ja säilöntä, työväki).
- Repliikkien aikalaisuus: ammatit, ruoat ja sanasto.
- Tornien nimet: Kellotorni, Kirkkotorni ja Kijlin torni.
- Huoneiden tulkinnallisuus ja sen merkintä.
- Lähteet: Kansallismuseo, Museovirasto ja Finna.
- Linssikatalogin E11 (haara `sisaltokirjuri-linssi-e11`) tilaksi "työn alla".

### 8.4 Natiiviseppä ja muut

- **Natiiviseppä:**
  - `ILinssiYmparisto.Nayttamo(bool)`: pallon kamera ja Cesium-päivitys tauolle, 60 fps:n pyyntö, ja
    `Ruudunpaivitys` sekä `KehysMittari` seuraavat linssin kameraa.
  - Vapaa kerrosnumero (layer) linssille.
  - Merge-junat.
- **Natiivi-UI (erä 2, valinnainen):** Livian lentoeleet natiiviin (glideIn ja flyAway ovat nyt vain SVG:ssä).
- **Linssiseppä:** tiedoksi, että `LinssiOhjain.cs`:ään tulee kaksi riviä.
- **Julkaisija (erä 2):** `js/dioraama/*` vientiin (`LISAMODUULIT`) ja ämpäriin kansio `dioraama/`.
- **Laitetestaaja:** laitemittaus erässä 2.
- **Siirtoseppä:** web erästä 4 alkaen.

## 9. Erät

0. **Suunnitelma** (tämä).
1. **Harmaa keittiö -pystyleike** (natiivi, omat simulaattorit Linnanrakentaja-iPhone ja -iPad):
   - Rakennuskone v0 tekee keittiön ja linnan karkean massan.
   - Glb-lukija, näyttämö, kamera yleisnäkymästä keittiöön ja herätys.
   - 3 paikkamerkkihahmoa, joilla on silmukat.
   - Pulu laskeutuu, ja taulussa on 3 kohtaa (luonnos). Linssi on hiomassa.
   - Omistajalle PNG:t iPhonesta pystyssä ja iPadista vaakana (kuvakulma ja SHA kuvassa) ja video siirtymästä ja heräämisestä.
2. **Näyttävä keittiö:** Codexin pinnat ja hahmot, DoF, hehku, äänet ja repliikit sekä laitemittaus. Omistaja arvioi tyylin.
3. **Linna auki:**
   - Kaikki 8 tilaa harmaina, ja linna aukeaa.
   - Kulku tilasta toiseen ja Pulun kiertue.
   - Ympäristön elämä.
4. **Maalatut tilat:** kaikki tilat maalataan (Codex erissä), repliikit ja faktat valmistuvat, ja web-siirto alkaa.
5. **Pelaajille:** webin pariteetti ja suorituskyky. Omistajan OK:n jälkeen linssi avataan pelaajille natiivissa ja webissä samaan aikaan.
6. **Pelaajan tekeminen ja monistus:**
   - Pelaajan tekeminen: etsintä, aikaliukusäädin (1475 → rauniot → museo ja oopperajuhlat, AIKA),
     avunpyynnöt, henkilökortit Matkakirjaan ja Kysy Pululta (huoneen konteksti PuluChatiin).
   - Seuraavat rakennukset: katedraali, Hansa-satama, Falunin kaivos ja Vasa. Jokainen on dataa, uusia
     reseptejä (holvi, runko, kuilu, nosturi), Codexin pinnat ja hahmot sekä äänet, arviolta 3 erää rakennusta kohden.

**Erän 1 työnjako.** Sonnet max -ali-agentit tekevät rinnakkain rajatut osat, eivätkä ne käytä simulaattoreita,
käännöspalvelua tai workeria:
- A1: rakennuskone ja sen testit.
- A2: datamoduulit, skeemat ja node-testit.
- A3: C#-ydin (data, glb, kamera, herätys ja käsikirjoitus) ja yhteiset testivektorit.
- A4: varjostimet ja Unity-puoli (A3:n rajapinnan päälle).
- A5: paikkamerkkihahmojen atlas.
- A6: mittauskomento ja ajoskripti.

Minä määrittelen rajapinnat ja kokoan osat. Lisäksi hoidan käännöksen (`proto-kaanna.sh`, nice -n 15 ja
`tools/gpu-vapaa.sh` ennen sitä), simulaattorit, kuvat ja merge-pyynnöt.

## 10. Riskit

- Pallon kamera piirtää linssin alla ja syö budjettia. Korjaus: näyttämörajapinta (8.4), ja erässä 1 hukka mitataan.
- Tekstuurimuisti (PNG → RGBA32). Korjaus: iPhonelle puolet pienemmät tekstuurit, ETC2-pakkaus latauksessa, myöhemmin ASTC offline.
- Codexin hahmoista voi tulla epäyhtenäisiä (kuvakulma, valo, mittakaava). Korjaus: koehahmo ensin, ja osa 2 tilataan
  harmaan leikkeen kuvilla.
- Vektori-Pulu voi riidellä maalatun dioraaman kanssa. Arvioidaan erässä 2.
- Historiallinen tulkinta. Tilat merkitään "tulkinnaksi", ja Sisältökirjuri tarkistaa ennen ääntä.
- Yhteiset tiedostot (`LinssiOhjain.cs`, `ILinssiYmparisto`). Muutokset pidetään pieninä, ja rajapinnat tulevat
  Natiivisepän ja Pelikoodarin kautta.
