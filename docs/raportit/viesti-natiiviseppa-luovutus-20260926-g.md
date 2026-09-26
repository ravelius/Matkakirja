# Natiivisepän luovutus 26.9.2026 (g)

Luovuttaja: Natiiviseppä (Opus 5.5, Macin käyttäjä koodaus). Syy: viikkokiintiö ~86–90 % (Fablen käsky: luovutus valmiiksi 90 %:ssa).
Edellinen: -f.md. Löydöslista: docs/raportit/omistajan-loydokset-b13-20260925.md (Fablen haara; rivimerkinnät Fablelle VIESTINÄ).

## Tila

- **BUILD 17** = proto-master **6a65ead1** (merge juna/b13 d04841a0; puu 6648d8e9 = käännös 6fd19114) = TF **1.0.17**
  (Fablen päätös: lähtee sellaisenaan; Laitetestaajan lepopiirto-FAIL ja löydös 143 build 18:aan). SHA lähetetty Fablelle
  ja Julkaisijalle (pyydetty merkitsemään yo-testflight-viimeisin).
- **BUILD 18 -juna** juna/b13 **4bdab584** (+ natiivi-ui/sumea-132 37316c6c ja 150, kartussi-143b b499b6ef; 99eaf8d9 + Linssisepän esilataus 05e54878, ihmisen-matka-2 2850ac37 (II 5, 148/151/152), pariteettiaanet c46ff6e6; testit 278/279/300) (koemerge: unity-tarkistus 0 virhettä, testit Kartta 278 / Peli 279 / Linssit 259):
  linssiseppa/radio-esikuuntelu 9434b244, pelikoodari/loydos149 0e534bef (+ vieritys 059f7709), pelikoodari/tehoste-rekisteri
  ba1547ba, siirtoseppa/paketti-paivitys 99f049ec (simulaattoriloki lokit/siirtoseppa-paketti-paivitys-20260926.txt).

## Omat haarat (proto-git, masterista bf70290d, kaikki 0 käännösvirhettä, EI vielä junassa)

1. **natiiviseppa/sumea-132 9e6c488a** (wt/proto-natiiviseppa-loydos46): löydös 132 pallon puoli. enum KuvaSumennus
   {Ei, Kortti, Kokoruutu}; PalloKierto.KuvaTaso (KuvaSumea yhteensopiva bool), kokoruutuSumennusPt 4 pt. Kokoruutu + täysi
   sumennus → PalloSumennus.Kaappausvaihe (AfterRenderingPostProcessing, pieni sRGB-RT) → PalloKierto.Pysaytyskuva +
   PysaytysValmis, Peitetty → Ruudunpaivitys sammuttaa kameran. Purku: kamera päälle, 1 piirretty kehys (endCameraRendering,
   katto 0,5 s) → PysaytysPoistui. UiNakymat.KuvaTaso/KuvaTasoMuuttui/PakotaKuvaTaso runkona; testi `ui kuvasumea kokoruutu`.
   Natiivi-UI kuittasi rajapinnan: laskee Kokoruudun (Kuvasuurennos.Kokoruutu, löydös 150, natiivi-ui/kuva-150 bed66d98),
   taustaelementti PysaytysValmis→PysaytysPoistui, tummennus 0,86 → 0,6. Merge yhdessä Natiivi-UI:n haaran kanssa, kun
   kuvapari (simulaattori) on otettu. LAITTEELLA TESTAAMATTA: kaappaus Metalilla (isActiveTargetBackBuffer-ohitus, värit).
2. **natiiviseppa/liput-144 8324a291** (wt/proto-natiiviseppa-nimikerros; agentti): Liput.Aaltoile(Texture, w, h) → Aalto
   {Kuva, Paivittyi, Nakyy}, Liput.Vapauta; Kartta/Resources/Lippuaalto.shader (Blit, 2 aaltoa, ~3 s, 4 %), lippu 92 % RT:stä
   (Liput.Reuna), kello Joutosyke (asettuu levossa suoraksi 3 s:ssa), PallonLepo-animaatio "liput", komento `liput tila|jatkuva|
   syke|koe <nimi> [aika]` (koe → Documents/<nimi>.png), RAJAPINTA.md 3e. Varjostin kääntämättä. SEURAAVAKSI: `liput koe`
   simulaattorissa → pysäytyskuvat/koevideo Fablelle ja omistajalle ENNEN tuotantoa; kysy omistajalta, sopiiko levossa suoristus.
   Natiivi-UI kytkee kartussiin omassa haarassaan.
3. **natiiviseppa/lepo-suspend 651ad27b** (wt/proto-natiiviseppa-saapuminen): BUILD 18 kohta 5. PallonLepoTauko
   (execution order −10000): suspendUpdate kaikille tileseteille, kun PallonLepo lepäsi edellisessä kehyksessä ja kehystä ei
   piirretä; PallonLepo.Aseta kumoaa heti, kun ei levätä; pudonnut tileset vapautetaan. `pallo tauko pois|paalle` (A/B),
   `pallo lepo` näyttää osuuden. SEURAAVAKSI: A/B-mittaus (Pelikoodarin cpu-mittari/kehys-cpu) levossa ennen mergeä.
   Huom: saapuminen-worktreen vanha haara natiiviseppa/lento-esilataus 34d31dbd on ennallaan (ei mergetty).

## Selvitykset

- **Lennon MUSTA VERHO** (kohta 6): lokit/verho-b16/TULOS.md loppuun kirjattu. Verhoa pitää PALLO (katto:pallo, aste 39–64 %),
  EI reitti (278/278 aina). ESIKAMERAn "100 %" oli yksi ajo, jossa aste täyttyi vasta katossa. Pääepäilty: Sentinel (s2, Z11)
  luodaan verhon takana (OtaValmisPinta, "s2 luotu nyt"), koska kerma varaa paikan 2 valinnassa (tilesetissä 3 paikkaa); uusi
  raster-kerros nollaa asteen. KOE: sama kylmä ajo huntu pois (pinta "bmng+s2" valmiina). Korjausvaihtoehdot TULOS.md:ssä.
- **Napakansi hämärässä** (kohta 7): Linssisepän elävän kartan kuva lokit/linssiseppa-elava-20260926/omistajalle/
  elava-kartta-iphone-18.3.png: pohjoisnavalla tummempi harmaa kiekko. Hämärä = ElavaKartta → KarttaKerrokset.PallonSavy
  (_pallonTummuus), jonka Napakansi.shader jo ottaa huomioon → ero on muualla: kannen Lambert (valo·NdotL + SH) vs. laattojen
  URP Lit, ja kannen kerma vain maalle. SEURAAVAKSI: simulaattorissa pikseliarvot kansi vs. viereinen laatta tummuudella 0 ja
  0,62 → säädä kannen valaistus laattojen mukaiseksi.
- **Elävä kartta** (kohta 4): Pelikoodarin musterajapinta pelikoodari/elava-kartta (a323f110, tippi nyt 3069bb9a):
  PeliOhjain.NostonMuste(valoId) → {Luokka Paakohde|Kohde|Pieni, Loydetty, Nakyy, Salaisuus}, tapahtumat MusteValmis,
  NostoLoytyi, MaakuntaHeraa, MaakuntaValmis; komennot `muste tila|loyda|maakunnat`. Katselmoi ennen mergeä; pallon 7
  rajapintaa sovitaan Linssisepän kanssa (linssiseppa/elava-kartta cf5d21e0 käyttää paikkamerkkinä Huntu.shaderia).

## Jono (build 18)

Pelikoodarin elava-kartta; omat 1–3 yllä;
verhokoe; napakansi; Elävän kartan pallon rajapinnat. Omistajan valinnat 127/128 odottavat yhä (ks. -f).

## Käytännöt

Kuten -f (koemerge, jumivahti, simulaattorin mutex ja ikkunalippu, vientilippu /tmp/natiiviseppa-vienti-tulossa oli päällä
03.45 alkaen). Worktreet (3/3 käytössä yllä olevilla haaroilla). Unity-työkopio Matkakirja-proto: puhdas master 6a65ead1.

**Alin rivi:** build 17 masterissa (6a65ead1), BUILD 18 -juna LEIKATTU 541092d9 (Fable 04.4x). Seuraavaksi: 144-koekuvat, suspend-A/B,
132 yhdessä Natiivi-UI:n kanssa, verhokoe huntu pois, napakansi.

## Päivitys klo 04.2x

- 132 + 150 junassa (Natiivi-UI todensi laitteella). 144: natiivi-ui/liput-144 a6da2b0a (sisältää 8324a291:n, Komennot-ristiriita
  ratkaistu OK) odottaa Fablen koevideon hyväksyntää → sitten koemerge.
- LEPOPIIRRON FAIL -juurisyy (Natiivi-UI): nostomerkkien hehkusyke (125) seuraa Joutosykettä, joka on jatkuva (Lampopaatos.SykeJaatyy
  = false); kerros 12 likainen 230/244. Päätös Fablella (sama kello ohjaa lippuja).
- Taustalla yhdistelmäkäännös juna + sumea-132 + liput-144 + lepo-suspend (odottaa vahdin junakäännöstä) → FBBD41D7 (vuoro
  Julkaisijalta kuitattu ~30 min): suspend-A/B `pallo tauko pois|paalle` levossa.
- Siirtosepän 1.47 (maakuntasalaisuudet omana kokoelmana) kuitattu OK natiiville.
- Klo 04.25: Fablen päätös SykeJaatyy = true (natiiviseppa/syke-jaatyy 5367e436, juna/b13 d5285af0) + pelikoodari/elava-kartta
  3ef13a97 (pelilogiikka, tallennuskenttä nostotLoydetty) → juna/b13 **622f99f3** (testit 278/284/300). Fable pyysi mittaamaan
  lepopiirron (tavoite build 16:n 2–3/151) → yhdistelmäkäännöksen simulaattorikierroksella `ruutu`/`pallo lepo` levossa.
  Natiivi-UI kääntää liput-144:n junan päälle ja mittaa lipun hiljaisuuden, sitten merge-pyyntö (Fable hyväksyi 144 lepoehdolla).
  Saapuminen-worktree on nyt haarassa natiiviseppa/syke-jaatyy.
- Klo 04.3x: natiivi-ui/liput-144 fc0bbc93 junaan → juna/b13 **541092d9** (testit 278/284/300). Lepopiirto mitattu (Natiivi-UI,
  käännös 688e1f5c, lokit/natiivi-ui-b18-lepo/merge-pyynto-144.md): kartta 247/247 kaikki UI-kerrokset 0 → Paikallaan; kartussi
  + lippu auki Paikallaan. SHA Fablelle. Laitetestaajan kierros ja BUILD 18 vasta Fablen ohjeesta (omistajan herättyä, kiintiö).
  Omista haaroista jäljellä vain lepo-suspend 651ad27b (A/B yhdistelmäkäännöksellä taustalla).
- **Klo 04.4x BUILD 18 LEIKATTU juna/b13 541092d9** (Fablen käsky: kiintiö täyttyy ~05.00). Juna ei ota muuta ennen kierrosta.
  Vahdin käännös 04.31 oli 622f99f3 (ilman liput-144:ää); 541092d9:n käännös käynnistetty juna-ajo.sh:lla sen perään (jonottaa
  lukkoa) → Laitetestaajan ja pariteetin simulaattorit. JOS KESKEN: tarkista lokit/kaannospalvelu/juna.log viimeinen
  "KÄÄNNETTY <käännös> juna/b13" -rivi, varmista käännöksen toinen vanhempi = 541092d9 (git -C Matkakirja-proto-kaannos log -1
  --format=%p <käännös>), ilmoita käännös-SHA Laitetestaajalle ja Fablelle. Master-merge vasta PASSin jälkeen (puu = käännöksen puu).
  Yhdistelmäkäännös (suspend-A/B) peruttu; lepo-suspend 651ad27b odottaa build 19:ää.
- **Klo 04.38 BUILD 18 KÄÄNNETTY e85255cd** (= master 6a65ead1 + juna 541092d9, puu d3206794), asennettu Laitetestaajan ja pariteetin
  simulaattoreihin; SHA Laitetestaajalle ja Fablelle. SEURAAVAKSI: Laitetestaajan PASS → Matkakirja-proto: `git merge --no-ff
  juna/b13` (tarkista puu = d3206794) → SHA Fablelle + Julkaisijalle.
- Build 19 -jono (Pelikoodarin mittaus, lokit/kohta1-kaynnistys-20260926.md; ESILATAUSPOLITIIKKA kohta 1): verkosta haetaan kylmänä
  nostotyyppien kuvakkeet (8 kpl, jopa 1,4 s), pulun livia-astronauttikypara-2x.png, aloitusdata (kaupungit, reitit, maarajat 984 kt,
  aluenimet, ui-tekstit, maamaa.geojson 913 kt) ja bmng-bathy Z5 (9 laattaa puuttuu laattapaketista). Ehdotettu jako Fablelle:
  Natiiviseppä 1–3 tilannekuvana buildiin + 4 Karttasepän kanssa; Pelikoodari yhteinen haku (kaupungit.json 4× rinnakkain) ja
  uusin.json taustalle (estää 1,3–1,4 s, kohta 2). Tarkista efektiäänten (Aanet) latausreitti.
- Build 19 -merge-pyynnöt (junaan heti build 18 -master-mergen jälkeen, koemergellä): natiivi-ui/im2-ohjaus d56afbd5 (II:n soitin
  Linssisepän Ohjaus-rajapinnalla; todennettu 911791cc, kuvat lokit/natiivi-ui-b19-ohjaus/), natiiviseppa/lepo-suspend 651ad27b
  (A/B ensin).
- **BUILD 18 PASS** (Laitetestaaja, savukierros-b18-20260926.md 6e344dd41: lepopiirto 2–3/150 Paikallaan, 143b, 132/150, II,
  esilataus 1,0 s, nostokuvat 60/60, vieritys) → **proto-master 43a6347c** (puu d3206794 = käännös e85255cd). SHA Fablelle ja
  Julkaisijalle (TF 1.0.18 Fablen ohjeesta; aseta /tmp/natiiviseppa-vienti-tulossa kun vienti alkaa, poista kun valmis).
  Avoinna build 19: 144 aaltoilu videotodennus; löydös "laajennettu nostokortti jää auki linssin avauksen yli" (Natiivi-UI).
  Build 19 -merget (im2-ohjaus, lepo-suspend) junaan vasta 1.0.18-viennin JÄLKEEN, ettei vahdin käännös viivästytä vientiä.
- **Build 19 -juna juna/b13 4586288e** (Fable: juna auki): pelikoodari/verkko-raja bd27ed1d, pelikoodari/humina-muunnelmat 7d41a3df,
  natiivi-ui/im2-ohjaus d56afbd5 (testit 278/284/300). Odottaa: natiivi-ui/linssi-sulkee-s3 198ecc30 (S3-korjaus) laitetodennuksen
  jälkeen; lepo-suspend 651ad27b A/B:n jälkeen. 144-video lokit/natiivi-ui-b18/k144-lippu-rajattu-4x-silmukka.mp4. TF 1.0.18 -vienti
  käynnissä 04.52 (vientilippu päällä → poista, kun Julkaisija ilmoittaa valmiiksi).
- linssiseppa/tehoste-rekisteri 859b937a (linssien kilahdus/naksahdus tehosteväylälle) → juna/b13 **923be3b0** (testit 278/284/300).
- Klo 05.00 TF 1.0.18 valmis (master 43a6347c), vientilippu poistettu.
- pelikoodari/osoitin-taustalle b74983a6 (uusin.json taustalle lämpimässä käynnistyksessä; ajoitusmittaus uusitaan) → juna/b13 **f190521b**.
- natiivi-ui/linssi-sulkee-s3 198ecc30 (S3, todennettu 506b198c) → juna/b13 **bbb8583b**.

## Omistajan päätökset 05.0x (Fablen kautta) — SEURAAJAN TYÖJONO build 19

1. **127** maarajan paino KEVYT = nykyinen oletus, ei muutosta.
2. **128** kermahuntu **p060** → `Kermasarja.Oletus = p060` build 19 -junaan. Karttaseppä polttaa kermahunnun 26-pohjasta p060:lla;
   vaihda sarja vasta kun se on ämpärissä (kysy Karttasepältä versionimi).
3. **Elävä kartta hyväksytty → pelattava versio build 19.** Sovi rajapinnat Linssisepän kanssa (pallon puoli: hunnun kuivuminen
   saapumiskaupungista, vektoriviivojen piirtoanimaatio, maakuntavärien syttyminen, yövalot/Black Marble -maski), **kohta 1
   saapuminen ensin**. Pohja: linssiseppa/elava-kartta cf5d21e0 (Huntu.shader paikkamerkkinä Natiivisepän Paljastus(keskus, säde,
   t) -rajapinnalle), Pelikoodarin musterajapinta (junassa, PeliOhjain.NostonMuste + tapahtumat), suunnitelma
   docs/raportit/elava-kartta-suunnitelma-20260926.md. Tapahtumaohjattu, lepopiirto säilyy (SykeJaatyy/PallonLepo.Animoi).
4. **Kohta 1 -paketointi** samaan junaan (lokit/kohta1-kaynnistys-20260926.md): nostotyyppien kuvakkeet, pulun kuva, aloitusdatan
   ja paketin osoittimen tilannekuva buildiin (StreamingAssets), bmng-bathy Z5 laattapakettiin (Karttaseppä). Pelikoodari tekee
   yhteisen haun; osoitin-taustalle on jo junassa.

Juna nyt **bbb8583b** (build 19). Kiintiö 89 % klo 05.0x → luovutus tähän; seuraaja jatkaa tilinvaihdon jälkeen.

### Elävä kartta, kohta 1 (saapuminen) — SOVITTU RAJAPINTA Linssisepän kanssa 05.1x (älä muuta ilman häntä)

Linssiseppä (linssiseppa/elava-saapuminen): ElavaSaapuminen käynnistyy PeliOhjain.MatkaPerilla-tapahtumasta, kun maa on uusi.
Aikajana on ≤ 5 s, ja napautus ohittaa sen lopputilaan 0,3 s:ssa. PallonLepo.Animoi on päällä vain ajon aikana. Linssiseppä
pitää omat kerroksensa (kynäviivat, syttymistäytön ja läikkäpudotukset), häivyttää ne lopuksi pysyviin kerroksiin ja ajaa
Aurinkoa kentillä Atsimuutti/KorkeusAst.
NATIIVISEPÄN TOTEUTETTAVAT:
1. `Varitaso.Paljastus(lat, lon, sadeKm, reunaKm)` + `PaljastusPois()`: saapumismaan kermahunnun radiaalinen kuivuminen
   varjostimessa kohinareunalla (tileset-varjostimen globaalit + Napakansi.shader samat), säde joka kehys Linssiseppältä.
2. `MaaKartta.Saapuminen(bool)` ja `NostoKerros.Saapuminen(bool)`: täyttö, rajat ja nostot piiloon saapumisen ajaksi,
   paluu 0,3 s:n häivytyksellä.
3. `PalloKierto.SaapuminenAlkaa(float kestoS)` + `SaapuminenPaattyi` -tapahtumat AjaSaapumisnakymaan-ajon ympärille
   (PalloKierto.cs ~1167); kamera pysyy Natiivisepällä.
Kohdat 4–5 (yövalomaski, laiva, boidit) myöhemmin.
- **Klo 05.3x elävän kartan saapumisen pallopuoli koodattu**: natiiviseppa/elava-saapuminen **98d0db40** (wt/proto-natiiviseppa-loydos46,
  juna bbb8583b:n päällä, unity-tarkistus 0): 013499fd MaaKartta/NostoKerros.Saapuminen + PalloKierto.SaapuminenAlkaa/Paattyi;
  98d0db40 Varitaso.Paljastus/PaljastusPois (tee_tileset.py → kaaviot generoitu, Napakansi.shader, komento `huntu paljastus`).
  Käännöspalvelu käännöksessä 05.3x (shadergraphin käännös todentamatta ennen sitä). SEURAAVAKSI: simulaattorikuva
  `huntu paljastus 37.98 23.73 150 40` (Ateena) Kreikassa → kuva Linssisepälle/Fablelle → merge Linssisepän
  linssiseppa/elava-saapuminen -haaran kanssa.
- **Klo 05.5x juna/b13 d2e21ee0** (testit 278/284/300): natiiviseppa/kerma-p060 071b7127 (**128 TEHTY**: Kermasarja.Oletus =
  2026-09-26-p060, Karttaseppä poltti 26-pohjasta; lyhyet p080/p045 eivät nyt löydy 26-pohjasta), natiiviseppa/kohta1-mukana
  6b382f35 (**kohta 1 osat 1, 2, 4**: 11 nostotyyppikuvaketta + pulun kuva StreamingAssets/mukana/, Mukana PNG:t, Kuvat.Hae
  katsoo ensin; bmng Z5 laattapakettiin BmngMax 5, Varmista rakentaa uudelleen tasomuutoksesta → käännöspalvelun ja TF:n
  ensimmäinen käännös lataa ~6 Mt lisää), pelikoodari/yhteinen-haku 7875bd13. KOHTA 1 OSA 3 (aloitusdatan tilannekuva) TEKEMÄTTÄ:
  kytkeytyy Siirtosepän paketinpäivitykseen (PakettiPaivitys/osoitin) → sovi Siirtosepän kanssa.
- natiiviseppa/elava-saapuminen: + 041b98b4 MaaKartta.MaakunnanKeskus (Natiivi-UI:n elava-kartussi). Linssisepän koukut
  (Linssit/Ydin/Elava/ElavaPallo.cs, linssiseppa/elava-kartta 899ff2f5): kytkentä yhdellä commitilla, kun molemmat junassa:
  ElavaPallo.Paljastus/PaljastusPois → Varitaso, PysyvatKerrokset → MaaKartta/NostoKerros.Saapuminen(!n),
  PalloKierto.SaapuminenAlkaa/Paattyi → ElavaPallo.IlmoitaSaapuminenAlkaa(kesto)/IlmoitaSaapuminenPaattyi().
- juna/b13 **827248ed**: + kohta1-mukana afe25e63 (tehosteäänet 19 efekti + 4 freesound buildiin, Aanet käyttää Mukana-polkua).
- Linssiseppä kytki ElavaKartan suoraan rajapintoihini haarassa linssiseppa/elava-kartta 8e5eef7c (sisältää elava-saapuminen 98d0db40) → erillistä kytkentäcommitia EI tarvita. Mergejärjestys: natiiviseppa/elava-saapuminen (tippi 041b98b4) ensin, sitten linssiseppa/elava-kartta, kun Linssiseppä ilmoittaa simulaattorikuvat.
- **Klo 06.0x juna/b13 fd29a2ae**: + natiiviseppa/elava-saapuminen 041b98b4 (käännös e3f50cbc; HUNTU TODENNETTU simulaattorissa
  lokit/huntu-paljastus-b19/izmir/vertailu.jpg: Izmir 60/200/450 km, aaltoileva reuna, pois palauttaa; skripti
  natiiviseppa-skriptit/huntu.sh) + natiivi-ui/elava-kartussi d525ec5e (laitteella todennettu, lepo 0). Seuraavaksi
  linssiseppa/elava-kartta (8e5eef7c+), kun Linssiseppä ilmoittaa simulaattorikuvat. Huom Linssisepälle: pelaajan oma maa ei ole
  hunnun alla → saapumismaan kuivuminen näkyy vain, jos Varitaso peittää sen.
- KOHTA 1 OSA 3 SOVITTU Siirtosepän kanssa 06.0x: StreamingAssets/sisalto/tilannekuva/ (osoitin.json, hakemisto.json, tiedostot/<sha256>),
  tiedostot kaupungit, reitit, maarajat, aluenimet, ui-tekstit. Siirtoseppä: lukupuoli (PakettiPaivitys/Valitse) + node-työkalu
  tools/vienti/tilannekuva.mjs --versio N --ulos <kansio> (Matkakirja-repo). NATIIVISEPPÄ: buildivaihe laattapaketin tapaan (ei gitiin;
  Build/tilannekuva/ käännöksen alussa uusin.jsonin versiolla → Data/Raw/sisalto/tilannekuva/ PostProcessBuildissa, ks.
  LaattapakettiRakennus.Varmista/KopioiBuildiin) + maamaa.geojson Mukana-kansioon (Maaraja lukee sen; ei paketissa). 1.48 kuitattu ok.
- natiiviseppa/kohta1-maamaa **30056ed0** (juna fd29a2ae:n päällä): maamaa.geojson laattapakettiin sarjana "maarajat" (Editor + mjs). Käännöspalvelu todentaa Editor-käännöksen ja paketin uudelleenrakennuksen (Z5 + maarajat) → sitten junaan. unity-tarkistus EI käännä Editor-kansiota.
- Linssiseppä 06.1x: build 19:n saapuminen käyttää saapumismaahan rajattua VERKKOHUNTUA (92feb808), koska laattojen Paljastus paljastaisi naapurit. MaaKartta/NostoKerros.Saapuminen ja SaapuminenAlkaa käytössä. JATKOEHDOTUS (build 20+): Paljastus sekoittaa säteen sisällä saapumismaan kermasarjan (naapurit hunnussa, oma maa reikänä) ja ulkona edellisen maan sarjan → laattahuntu korvaa verkkohunnun (ranta täsmälleen). Vaatii kaksi kermasarjaa yhtä aikaa (raster-paikat 1/2) → suunnittele kermaväistön kanssa.
- juna/b13 **3fec84c7**: + kohta1-maamaa 30056ed0 (käännös 19099766 todensi Editor-koodin; laattapaketti 27,3 Mt: Z5 + maarajat).
- juna/b13 **05d68639**: + natiivi-ui/maakunta-keskus a3fa7854 (MaakunnatSilta → MaakunnanKeskus, todennettu 39a99aea).
- juna/b13 **99162d67**: + pelikoodari/lehdet-perassa 0bdb771b (+ natiivi-ui/kortti-lehdet; kaupunkilehdet perään, kylmä aloitusverho 5,3 s).
- juna/b13 **4f34ca3b**: + siirtoseppa/tilannekuva 8603b496 (tilannekuvan lukupuoli + taustapäivityksen osoitinkorjaus).
- natiiviseppa/tilannekuva-build **03860cc4**: Editor/TilannekuvaRakennus.cs (tilannekuva.mjs:n muoto C#:na, ei Nodea) + Rakennus-kutsut
  (Varmista ennen vientiä, KopioiBuildiin PostProcessBuild 185). Käännöspalvelussa 06.2x → tarkista Build/tilannekuva/ (5 tiedostoa)
  ja .app/Data/Raw/sisalto/tilannekuva/, vertaa node tools/vienti/tilannekuva.mjs --ulos <tmp> -tulokseen → junaan.
- juna/b13 **0249a248**: + natiiviseppa/tilannekuva-build 03860cc4 (**KOHTA 1 OSA 3 VALMIS**: käännös d7927c6c tuotti v145-tilannekuvan 1,9 Mt, tavu tavulta sama kuin tilannekuva.mjs; .app/Data/Raw/sisalto/tilannekuva/). Kohta 1 kokonaan junassa.
- Siirtoseppä 06.3x: skeema 1.46 tuotannossa (1.x v146, 2.0 v87), uusi kokoelma **reitit1873** (4 laivalinjaa + 1364 rataa, CC0) → elävän kartan kohta 5 (1873-laiva) voi lukea sen. 1.47 maakuntasalaisuudet Julkaisijalla seuraavana.
- Pelikoodari 06.3x: elävän kartan logiikka todennettu v146-datalla (lokit/elava-kartta-v146/): 2 963 nostoa, GRC 14 maakuntaa, Olympos Paakohde → "Kentriki Makedonia 1/6, herää". Nostomerkkien piirto kokoluokittain voi käyttää NostonMuste(valo).Luokka/Loydetty (Natiivi-UI/Linssiseppä). Salaisuudet 1.47:ssä; siihen asti Nakyy = true.
- Siirtoseppä 06.4x: 1.47 tuotannossa (1.x v149, 2.0 v89), kokoelma maakuntasalaisuudet (14) → Natiivi-UI:n/Pelikoodarin salaisuus-nostot saavat datan. 1.48 (kaupunkilehdet kaupungeittain) seuraavana.
- juna/b13 **b2a5fb4a**: + linssiseppa/elava-kartta ed136705 (**ELÄVÄ KARTTA KOHTA 1 KOKONAAN JUNASSA**: saapuminen ≤ 4,8 s ohitettava, verkkohuntu, kynäviivat, syttyminen, nostopudotukset; simulaattori 189c9f36 mediaani 17,7 ms; testit 278/284/314). Laitetestaajan kierroksella: lepopiirto animaation jälkeen.
- juna/b13 **d4f3fa25**: + linssiseppa/lykatty-data 0693c0d8 (linssien ~20 aineistoa joutilaaseen, ei kylmään käynnistykseen; LinssiOhjain.LataaAineistoHeti Natiivi-UI:lle).
- juna/b13 **d706da81**: + natiivi-ui/linssit-heti (Linssivalitsin.Avaa → LataaAineistoHeti).
- Linssiseppä: lepo todennettu saapumisen jälkeen (pallo lepää 1 s ja 7 s animaatiosta). ELÄVÄ KARTTA KOHTA 3 (maakunta herää, build 20):
  jako sovittu. natiiviseppa/maakunta-heraa **29beca06** (EI junassa, menee Linssisepän haaran kanssa): MaaKartta.Heraannyt (Func<string,bool?>,
  uinuva × 0,3), PaivitaHeraaminen(), Herata(avain, piilossa) 0,3 s. Linssiseppä: herätysanimaatio ≤ 2,5 s MaakuntaHeraa-tapahtumasta;
  Natiivi-UI: kartussin leima ja merkit.
- natiiviseppa/pohja-26 **c4c46662** (wt/proto-natiiviseppa-saapuminen): pohjasarja 2026-09-26-pohja-20260926 (Karttaseppä 06.57, 349 525 laattaa). Kuvapari käynnissä 07.0x: lokit/pohja-26/{b13,pohja-26}/ (pohjakuvat.sh, 7 näkymää) → Fablelle → junaan hyväksynnän jälkeen.
- maakunta-heraa **9d9eb1bd**: herännyt näkyy aina (myös oletusrajoilla), uinuva paperina ilman täyttöä; diagnostiikkarivi "maakunnat: herääminen …". Linssisepän linssiseppa/maakunta-heraa (d7395a81) mergeää tämän uudelleen ja tarkistaa avainmuodon (MusteMaakunnat vs ISO:tunnus) → merge-pyyntö; molemmat junaan yhdessä.
- **juna/b13 e5ed36bd**: + siirtoseppa/siivous-korjaus 13e5bcf4 (KRIITTINEN: TF 1.0.18:n taustapäivitys poisti ladatun uuden version → laite jumissa vanhassa sisällössä). Fablelle ehdotettu build 19:n leikkausta tästä (ilman pohja-26:ta ja maakunta-heraata).
- Pohja 26 kuvapari valmis 07.1x: lokit/pohja-26/kuvapari.jpg (+ täydet kuvat); ero hienovarainen, ei regressiota → Fablelle päätettäväksi (build 19 vai 20).
- juna/b13 **6697be58**: + linssiseppa/maakunta-heraa c05835ef (sis. natiiviseppa/maakunta-heraa 9d9eb1bd). Ilman dataa inertti: paketin karttavaloista puuttuu "maakunta"-kenttä (diagnostiikka FRA: 0/0/13) → Fable/Siirtoseppä/Pelikoodari.
- juna/b13 **fdc47632**: + pelikoodari/lehti-kaupungeittain 3779473c (1.48: lehti 81 kt kaupungittain, kylmä aloitusverho 4,1 s).
