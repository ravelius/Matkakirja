# Lavastajan luovutus 27.10.2026 klo 12.55 (jatkaa luovutusta -20261027-lavastaja-1235, f21603ac9; lue sen LISÄYS-osio)

Kansio K = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/kielletty-rakennukset, H = …/linnanrakentaja/havainne-kuja40.
OMISTAJAN PÄÄTÖS 27.10. 10.56 voimassa: valon leivonta SEIS, muoto havainteen mukaan alue kerrallaan.

## Tehty
1. Codexin vastausposti claude/postilaatikko 011601c04 (posti/lavastaja-codex-c2-portaiden-kaltevuus-vastaus-20261027.md):
   C2 1063 kulmat (Taihemen 27,6°; G-jalusta 8,7–24,3°, askel 0,15 m), toive 3 versiota 10°/20°/28° + pystyleikkaus ±4°,
   pystykorkeus 0,72 m kuten 1062, vaakapituus ≈ 1,21 m; 1056 = 90° ulkonurkan 45° jiiripuolikas.
2. Codexin pinnat K/codex-pinnat-v2 (1068/1069/1071 postista 77e5cde51-paketin pinnat/, SHA OK; 1058/1067 VS:n friisit-v2, SHA OK).
3. avoimet-v56 (K/tyokalut/avoimet_pinnat2.py, avoimet-v55:stä): Katto paatylaatta POIS → V4_paattotiili-nauha 1069 laattojen
   keskipisteiden kautta (0,25 m yksikkö, kaartuu kulmissa, kallistus 30°, u oikealle ulkoa katsoen); V4_palkkivyo ← 1067 (kuvasuhde
   korkeuden mukaan). juhlasali/puutarha/tyohuone/varasto.
4. Taustapalat K/yksikerros-v75 (K/tyokalut/tausta_pinnat.py, yksikerros-v73:sta, kaikki palat): V4_palkkivyo ← 1067 (u × 2,86/4,13),
   V4_harmaa → V4_teal, 1069-nauha kaikkiin lod0-räystäisiin (V4_goldin kaltevien kolmioiden alimmat vaakasärmät, tallennettu normaali,
   ny 0,3–0,995). 1068 EI taustapaloihin (niissä V4_konsoli-geometria). Ketju: K/tyokalut/aja_ketju_v75.zsh.
5. H/juuri-v75m = v74m + avoimet-v56 (avoimet-v50-linkki) + yksikerros-v75 (kielletty-tausta-v57-linkki). VS:lle ilmoitettu 12.5x.
6. C1/C3-sovitus (K/tyokalut/c1c3_sovitus.py, kuvat K/c1c3-sovitus/v1-{c3,c1c3}-{sivu,viisto,paaty,alta}.png): kujan 01 itäpään
   poikkimuuri (muurikate-v16, z 355,15–356,38, x −118,2…−111,1). Löydökset:
   - C3 1057 sopii sellaisenaan vanhan kultakatteen + harjan tilalle: pohja 4,53, korkeus 0,514 = vanha 4,53–5,05; istuu konsolinauhan
     päälle, ei z-fightingia (vanhat pinnat poistettu alueelta). 2 m:n saumat näkyvät harjassa pieninä kyhminä (hyväksyttävä).
   - Muurin pituus ei ole 2 m:n monikerta (7,1 m) → viimeinen pala ylittää päädyn 0,9 m: tarvitaan pään leikkaus/skaalaus.
   - C1 1055 muurin kyljissä C3:n alla (pohja 4,18) = kaksinkertainen räystäs, ei havainteen näköinen → C1 kuuluu rakennusten
     räystäisiin, ei muureihin (ehdotus PT:lle; ei vielä sovitettu rakennukseen).

## Seuraavaksi
1. PT:n kuittaus C1/C3-linjaan → C3 koko muurikatteeseen (muurikate-v17: kulta+harja → 1057-toisto muurilinjoja pitkin, päät leikaten,
   vinot muurit z 453,7–456,5 kiertäen) → juuri-v76m → NUI:n parit.
2. C1 rakennusräystääseen sovitus (taustapalan räystäsärmät löytyvät tausta_pinnat.py:n särmähausta).
3. T-risteys (−134; 294) havainteen mukaan (linja edellisessä luovutuksessa), aukion sivuhallit, 04, 06, 07 (H/EROLISTA-20261027.md).
4. 1058 muurifriisi muurin harjan alle: odottaa VS:n vastausta (kysytty 12.5x).

## LISÄYS klo 12.53: tulleet viestit (sitovat; lue ennen "Seuraavaksi"-listaa)
- PT KUITTASI: C3 1057 muurikatteeksi sellaisenaan, C1 1055 vain rakennusräystäisiin (= Codexin C5-suunnitelma). TEE MUURIKATE-V17
  (pohja: /Users/Shared/Claude/proto-3d/_valmiit/juoksupeli-kk-muurikate-v16-vienti-20261026/…/kielletty-muurikate-v16/kk-muurikate-v16.glb;
  yksi solmu, materiaalit V4_gold + V4_lasitiili_harja = vanha kate 4,53–5,05 → 1057-toisto 2 m muurin keskilinjalle, päät leikaten).
  Sovituksen malli: K/tyokalut/c1c3_sovitus.py (poisto materiaalin ja alueen mukaan bmeshillä, palojen sijoitus glTF → Blender).
- VS: 1058 muurifriisi KUULUU NYT samaan erään: havainteen 02 punamuureissa (kujat 02 ja 05) heti keltaisen katteen ylityksen alla
  turkoosi friisi kultakuvioin. Muurin molemmille kujapuolille ≈ 0,5 m vyö katteen alareunasta alaspäin, yksi kuva ≈ 4 m
  (K/codex-pinnat-v2/1058-muurifriisi.png, SHA 04801a3c…). Muurin yläosa on muurikatteen glb:ssä (V4_palkkivyo 3,9–4,35 ja
  V4_konsoli 4,30–4,52 nykyisin kujan 01 poikkimuurissa): päätä, korvaako 1058 palkkivyön vai tuleeko sen alle; havainne ratkaisee.
- VS: 1068 taustapaloihin EI (hyväksytty). VS ajaa parit juuri-v75m:llä (tulokset VS:ltä).
- PK: Taihedianin jalustan LOD korjattu be88e5c99 (proto, haara pelikoodari/juoksu-taso1-212, JuoksuSokkeloMaailma.Palatsi.cs; etäisyys
  kamerasta rajauslaatikon lähimpään pisteeseen). Aukio 03: kaiteet ja tasot näkyvät (proto-3d/lokit/havainne-editori-20261027-123635/03/).
  Pareihin REF=be88e5c99 tai cherry-pick; juurta ei vaihdeta. → Aukion 03/1–2 muotoa ei tarvita.
- PT/Codex 6c7b903bd: C2 pylväs 1061 (1,10 m), paneeli 1062 (1,50 × 0,72 × 0,12, origo vasen alapää), vesisylkijä 1064 (ulkonema 0,45 m,
  origo takakiinnitys) SOVITUKSEEN: T7 …/Matkakirja 2/output/juoksupeli-rakennusmoduulit-20261027/review-c2-v1/ (SHA OK). Kohde: G-jalustan
  ja Taihemenin marmorikaiteet (pelissä V4_marmorikaide; muurikate-v16:ssa x −131…−87, z −73…−42). 1063 PROVISIONAL odottaa Codexilta
  versioita mittojemme (011601c04) mukaan. C5-SUUNNITELMA.md: arvioi sovituksen jälkeen (moduulit nykyisiin runkoihin). 1066 → VS.

## Seuraavaksi (päivitetty 12.53)
1. muurikate-v17: C3 1057 + 1058-friisi → juuri-v76m → NUI/VS parit.
2. C2-sovitus (1061/1062/1064) jalustan kaiteisiin, sivukamerat → PT:lle; C5-arvio.
3. C1 rakennusräystäisiin, T-risteys, aukion sivuhallit, 04, 06, 07.

## LISÄYS 2 (VS:n v75m-parit, proto-3d/lokit/havainne-editori-20261027-125052)
- 1067-palkkivyö toimii hyvin.
- V4_konsoli (ruskea 0,14/0,06/0,03) → havainteessa kannattimet turkoosia ja kultaa: väriksi V4_tealin sävy (0,04/0,19/0,17) tai
  etupintaan 1068:n yksi kannatin. Koskee taustapaloja (tausta_pinnat.py) ja muurikatetta (v17).
- Kujan 01 kuvan oikeassa yläreunassa ylempien rakennusten räystäillä yhä sini-violetteja laattoja ja kultaisia kiekkoja. VS arvelee
  LOD1/2:ta, MUTTA tausta_pinnat.py teki V4_harmaa → teal jo lod1/lod2:een (1069 vain lod0). Todennäköisempi lähde: rakennukset-v51
  (vanha Katto paatylaatta + harmaat laatat, ei vielä 1069:ää; luovutuksen 12.35 kohta 4) – tarkista materiaalit ja tee sama sarja
  (avoimet_pinnat2.py toimii samoille materiaaleille) → rakennukset-v52; varmista lod1/2.
- 1058-muurifriisi kujiin 02/05 (kuten LISÄYS 1).

## LISÄYS 3 klo 13.03: muurikate-v17 tehty (K = …/kielletty-rakennukset)
- 1057/1055 kopioitu T7:ltä (Codex review-modules-v2) K/codex-mallit-v2, SHA OK (825c57aa…, d21bffe3…).
- K/tyokalut/muurikate_v17.py (+ aja_muurikate_v17.zsh, kuvat muurikate_v17_kuvat.py): v16:sta jaksot harjapalkeista (253 jaksoa,
  kaarevat polylinjoina), vanha kulta+harja pois VALITUILTA jaksoilta, 1057 n = round(L/2) palaa venytettynä jaksoon (ei ylitystä),
  1058 palkkivyön kuvaksi kaikkiin muureihin (UV u×3/8 → ≈ 3,6 m/kuva; korvaa vyön, havainteessa yksi friisi), V4_konsoli → teal.
- KEVENNYS EI KÄY: decimate 0,15/0,25 → piikit ja UV hajoaa (kuvat muurikate-v17/d015-*, d025-*; täysi d1-*). Täysi kate 2455 palaa
  ≈ 6,9 M kolmiota → v17 = C3 vain 60 m havaintopisteistä 01/02/05/03 (30 jaksoa, 314 palaa, 0,88 M kolm., 38,5 Mt), muualla v16-kate.
  Kaikkien palojen sijoitukset K/muurikate-v17/c3-sijoitukset.json (PK:n instansointiin). PT:lle ehdotettu: PK instansoi + Codex LOD1.
- H/juuri-v76m = v75m + kielletty-muurikate-v16 → K/muurikate-v17/peli-v16-nimella (v17 pelin v16-nimellä). VS:lle parit pyydetty 13.0x.
- Seuraavaksi: C2-sovitus (1061/1062/1064); V4_konsoli teal myös taustapaloihin (tausta_pinnat.py); rakennukset-v52 (1069 + V4_harmaa → teal, lod1/2).

## LISÄYS 4 klo 13.22: C2 v1 + LOD1-tilaus; LUOVUTUS (konteksti 30 %)
- PT 13.0x: PK instansoi 1057:n; Codex-tilaus 1057 LOD1 postissa claude/postilaatikko 4cff934a1 (~300 kolm., sama siluetti/UV, ei Tripoa,
  toimitus T7 …/review-lod1-v1/).
- Codex 675899501: 1063 10°/20°/28° ja 1056 A + B-peilattu (älä peilaa B:tä uudelleen, aina parina) → K/codex-review-lr-fit-v1 (SHA OK);
  1061/1062/1064 → K/codex-review-c2-v1 (SHA OK). C1/1056 vain rakennusräystäisiin (PT kuittasi) – EI VIELÄ TEHTY.
- K/tyokalut/c2_sovitus.py: muurikatteen portin jalusta + terassit (kk_muurikate JALUSTAT) → 1061 alajuoksun päälle, 1062 väleihin
  venytettynä, 1064 reunalistaan K − 0,24. K = vanhojen sylkijöiden alapinta + 0,36 (jalusta 1,96–2,12, terassit 0,96/1,12).
  Tulos K/muurikate-v17/kk-muurikate-v17c2.glb (EI vielä juuressa; juuri-v76m:ssä v17 ilman C2:ta).
- K/tyokalut/c2_kaidesaaret.py: rakennusmallien kaide (kk_rakennelmat.kaide / kk_portit.portaskaide LOD0) tunnistetaan V4_marmori-
  saarista (pylväs+nuppi-parit, alalaatta, tuki, käsijohde, sylkijä, vinot laatat; akseli pienimmästä rajauslaatikosta) → C2-palat;
  1063 pylväsväleihin (n = round(L/1,45)), lähin 10/20/28° + pystyleikkaus. Sijoitukset K/c2-rakennukset/<malli>.json, esikatselut
  <malli>-c2-lod0.glb + kuvat (c2_kuvat.py). Ketju K/tyokalut/aja_c2_v1.zsh.
  Määrät: Taihemen 146/80/48 porraspalaa 28°/92; G-jalusta-etu 855/845/860; G-jalusta 1708/1430/1460 → G ≈ 13,9 M kolmiota
  (sylkijä 2840 kolm./kpl) → ei juureen; PT:lle 13.2x: PK:n instansointi + LOD1 myös 1061/1062/1064 (kysytty, tilataanko Codexilta).
- Löydöt: G-jalustan portaiden kaiteita ei ole v51-malleissa (0 vinoa laattaa) – selvitä kk_rakennelmat.jalusta_g_koko vs vie.py;
  Meridiaaniportissa 499 pylväs+nuppi-paria ilman paneeleita (eri kaidetyyppi) – jätetty pois.

## Seuraavaksi (13.22)
1. PT:n vastaus C2-LOD1:een → Codex-tilaus postiin (kuten 4cff934a1). VS:n v76m-parien tulokset → korjaukset.
2. C1 1055 + 1056-kulmapari rakennusräystäisiin (tausta_pinnat.py:n särmähaku; ulkonurkat A+B samaan pisteeseen).
3. LISÄYS 2: V4_konsoli teal taustapaloihin (tausta_pinnat.py) ja rakennukset-v52 (1069 + V4_harmaa → teal, myös lod1/2).
4. T-risteys, aukion sivuhallit, 04, 06, 07 (H/EROLISTA-20261027.md).

## LISÄYS 5 klo 13.25: PT:n vastaus (sitova; korvaa Seuraavaksi-kohdan 1)
- PT hyväksyi: C2-LOD1 tilattu Codexilta claude/postilaatikko 895e80507 (1061/1062/1064, sylkijä ≤ 300 kolm., 1063-kulmat jos onnistuu).
  PT välittää sijoitukset (K/c2-rakennukset/*.json, K/muurikate-v17/c3-sijoitukset.json) PK:n instansointiin.
- PT: G-jalustan portaille lisää 1063-porraskaiteet sopivalla kulmalla (puuttuvat v51:stä): portaat kk_rakennelmat.jalusta_g_koko
  (PX = mitat.PORTAAT_X, kulmat 8,7–24,3°, taulukko postissa 011601c04) → lähin 10/20/28° pystyleikkauksella (c2_kaidesaaret.py:n 1063-osa,
  pivot alapään alareuna, palat pylväsväleihin 1,45 m). Tee seuraavaksi.
- PT: Meridiaaniportin paneelittomat pylväät pois = ok.

## LISÄYS 6 klo 13.45: muurikate-v18, C2 v2 (portaat korjattu), C2-sijoitukset PK:lle, juuri-v77m, 1057 LOD1 -vastaus (K = …/kielletty-rakennukset)
- K/muurikate-v18/kielletty-muurikate-v18/ (PK:n pyyntö; K/tyokalut/muurikate_v18.py + aja_muurikate_v18.zsh, EI_C3=1, VANHA=…): pohja = v17:n friisi +
  teal-konsoli, vanha kate (V4_gold + harja) pois kaikilta 253 jaksolta, ei C3-paloja; -vanha.glb = poistettu kate 90 ruutusolmuna
  kk_muurikate_vanha_<ix>_<iy> (floor(x/64), floor(−z/64)); c3-sijoitukset.json (tavulleen v17) + 1057. PK käytössä (proto 0913e1581).
- H/juuri-v77m = v76m + kielletty-muurikate-v18 (PK:n GPU-mittaus, polku PK:lle ja JU:lle).
- C2 v2 (PT 13.4x): G-jalustan v51-mallissa ei vinoja laattoja → c2_kaidesaaret.py PORRASPYLVAAT=1: 1063 porraspylväsketjuista (36 lentoa,
  8,7–24,3°), palat todellisten pylväsvälien mukaan, lähin 10/20/28° pystyleikkauksella; pylväät + paneelit 0,15 m 垂带-palkin keskelle
  (säteenheitolla suunta; ennen ±0,131-pylväs ylitti 0,45-palkin sisäreunan askelmille). Sonnet-tarkistus: ei roiku, ei rakoja
  (K/c2-rakennukset-v2/g-portaat-*.png, c2_porraskuvat.py). Taihemen samalla menetelmällä (12 lentoa).
- K/c2-v2/kielletty-c2-v1/ (K/tyokalut/aja_c2_v2.zsh, c2_sijoitukset.py, lisaa_valo.py): c2-sijoitukset.json 5138 palaa juuren glTF-kehyksessä
  {m, r (0 muurikate 222 / 1 f 318 / 2 g 4598), p, kierto_y_deg, sx}; kaiteettomat LOD0-pohjat (PK ei tarvitse), f/g-1063-portaat.glb.
  PK: muurikatteen kaiteet ensin; F/G-palat vasta Codexin C2-LOD1:n jälkeen (rakennusten LOD0 150 m:iin). Avoin: valo_rgbm kopioitu
  takaisin kaiteettomiin, TEXCOORD_1-järjestystä ei varmistettu.
- Codexille vastattu claude/postilaatikko 866782d0a (3e90c530d): 1057 LOD0 < 25 m, LOD1 25–60 m; pala 33 px (2048) / 17 px (1080) 25 m:ssä;
  PT:n linja (ulokkeet tekstuuriin, siluetti/rajat/pivot, 400 kolm.; 356-koe käy). PK toteuttaa vaihdon 25 m:ssä LOD1:n tultua.

## Seuraavaksi (13.45)
1. C1 1055 (1,03 × 0,35 × 0,51) + 1056 A/B (ulkonurkka, aina parina) rakennusräystäisiin: tausta_pinnat.py:n räystässärmähaku
   (V4_goldin kaltevien kolmioiden alimmat vaakasärmät, lod0) → palat särmille, kulmiin A+B; ensin sovituskuvat kujan 01 taustapaloihin.
2. LISÄYS 2: V4_konsoli teal taustapaloihin; rakennukset-v52 (1069 + V4_harmaa → teal, lod1/2).
3. T-risteys, aukion sivuhallit, 04, 06, 07 (H/EROLISTA-20261027.md).

## LISÄYS 7 klo 14.15: Codexin LOD1:t hyväksytty; jono
- Codex b72c20705: 7 LOD1-mallia (1057 398 kolm., 1061/1062/1063×3/1064 298) → K/codex-lod1-v1 (SHA OK), Sonnet-tarkistus: rajat 0 mm,
  pivot sama. Kuitattu 673145b37; 1057 v2 (17481567d, tekstuurikorjaus, sama geometria) HYVÄKSYTTY 1339c9a6d, tilaus 1102 suljettu.
  Peliin: kielletty-muurikate-v18/1057-c3-muurikate-2m-lod1-v2.glb, kielletty-c2-v1/*-lod1.glb; PK kytkee 25 m:n vaihdolla
  (LOD1:llä oma UV ja 512 px kartat).
- JONOSSA (PT 14.1x, EI nyt, juoksupeli ensin): Olavinlinnan palatsi-v2.glb (NS hyväksyi a9d10880f) kohtaukseen kokoamiseen; alasalin
  kivi tavoitekuvaa tummempi → korjaus valolla/rappauksella kohtauksessa.

## LISÄYS 8: C1 v1 Taihedianiin (kesken; LUOVUTUS, konteksti 31 %)
- K/tyokalut/c1_raystaat.py (+ c1_kuvat.py): katto-solmun V4_goldin kaltevien pintojen alimmat reunasärmät → ketjut; avoimet päät
  (kaarevan räystään nurkissa särmiä puuttuu) yhdistetään saman renkaan (|dz| < 0,8) toiseen päähän nurkkapisteen kautta tai suoraan
  (< 6 m); räystäs = uloin rengas (rengas pois, jos isompi on alle 2 m alempana). Silmukat vastapäivään, nurkat tasosuunnan
  käänteestä > 45° (2,5 m ikkuna). 1055 suorille (pituus- ja nousuleikkaus, pivot = reuna − 0,514 h, z = reuna − DZ 0,25), 1056 A+B
  samalla matriisilla nurkkaan (pivot = nurkka − 0,514 u1 − 0,514 h1). Orientaatio tarkistettu: 1055 glTF +z ulos, takayläreuna z 0.
- Tulos K/c1-v1/g-taihedian-c1-lod0.glb + g-taihedian.json (1055 404, 1056-pareja 8; 2 räystästä: 70,4 × 44,6 z 18,8 ja 63,9 × 38,2 z 24,5),
  kuvat K/c1-v1/v1-*.png. Sonnet: suunta oikein, suorat yhtenäiset ja kaarevat nurkat seurataan; KORJATTAVAA:
  1. nurkkapari laatikkomainen koukku ulkona kaarevan kulmakärjen ohi; rako ja päällekkäisyys viereisen suoran kanssa → nurkka
     todelliseen kärkeen (nyt yhdistyssärmän pää), 0,3–0,5 m sisemmäs/alemmas, kierto kaaren suuntaan, suorien päät sovitettava;
  2. vanha räystäsreuna näkyy uuden rivin takana/alla (kaksinkertainen) → DZ/ulkonema +0,05–0,1 tai vanha reunanauha pois;
  3. kuva v1-nurkka-yla-alta: kamera katon sisällä → kamerapaikka korjattava.
- EI vielä juuressa eikä pelissä (548 k kolmiota → PK:n instansointi kuten C2, sijoitukset jo json:ssa Blender-kehyksessä).

## Seuraavaksi (LISÄYS 8)
1. C1 v2 korjaukset (yllä), sitten muut hallit (Zhonghe/Baohe, Taihemen, Meridiaaniportti) ja PK:lle sijoitukset c2_sijoitukset.py-tyyliin.
2. LISÄYS 2: V4_konsoli teal taustapaloihin; rakennukset-v52.
3. Jonossa: Olavinlinnan palatsi-v2.glb kohtaukseen (NS a9d10880f; alasalin kivi tummempi → valo/rappaus kohtauksessa; kokki + portinvartija
   ARKit-morphit NS:n posti 5c37d8709, luunimien sovitus pelin rigiin ja vertailukoko kokoamisessa).

## LISÄYS 9 klo 15.5x: C1 v3, konsoli-teal, C1-sijoitukset PK:lle (K = …/kielletty-rakennukset)
- K/tyokalut/c1_raystaat2.py (+ aja_c1_v2.zsh: MALLI, INSET, NALAS, ULKO, C1KANSIO, KUVAT; kuvat c1_kuvat2.py, ylemmän nurkan alakuva
  alemman katon ulkopuolelta): nurkka = kärki (korkein piste 4 m:n säteellä) INSET sisemmäs lävistäjää pitkin ja NALAS alemmas; nurkkaparin
  akselit sivujen suorista osista (ei kaarevan kärjen suunnasta → koukku poissa); suorat palat sivun pääsuunnan projektiolla nurkkaparien
  päiden väliin (ei rakoa/päällekkäisyyttä); ULKO 0,08 ulos; avoimet päät parittain globaalisti halvimmasta (samansuuntaiset eivät yhdisty).
- Taihedian v3 (INSET 0,15, NALAS 0,35; K/c1-v3/v3-*.png), Sonnet: sauman porras < 0,1 m, kamera korjattu; JÄLJELLÄ: vanhan kultakatteen
  kaartuva kärki näkyy 0,3–0,8 m uuden nurkan ulkopuolella/yläpuolella ja vanha reuna ohuena (0,05–0,1 m) juovana rivin alla → seuraava
  askel: vanha reunanauha + kärki pois (bmesh, alueena rivin alla) tai PT/VS:n arvio "kärki = luonteva nousu". Rivit yhtenäisiä kaikilla sivuilla
  (sijoituksista tarkistettu; "puuttuva alarivi" sivukuvassa = kuvakulma).
- Muut (Sonnet: rivi ulkona oikein päin, sama kärkiasia 0,3–0,5 m): Zhonghedian (1 räystäs, 4 nurkkaa) kunnossa; Meridiaaniportti
  päälinna kunnossa, MUTTA siipikattojen räystäiltä rivi puuttuu kuvissa (16 × 69 -renkaat löytyivät, tarkista); Taihemen VAIN alempi räystäs. EI VIELÄ: Baohedian
  (歇山-katto: ylempi rengas kiertää päädyn kautta z 22,6–27,2, alemman renkaan päät pariutuvat väärin sisärenkaan kanssa) ja Taihemenin ylempi.
- K/c1-v3/c1-sijoitukset.json (K/tyokalut/c1_sijoitukset.py): 1364 palaa (1055 1332, 1056-pareja 32), juuren glTF-kehys, TÄYSI matriisi
  (venytys + kallistus, ei TRS), 1056 = A + B samalla matriisilla. PK:lle PT:n kautta.
- LISÄYS 2: K/tyokalut/konsoli_teal.py → K/yksikerros-v76 (= v75 + V4_konsoli teal, 20 palaa) ja K/rakennukset-v52 (= v51 + konsoli teal, 1 malli).
  rakennukset-v51:ssä EI ole V4_harmaata eikä Katto paatylaattaa → VS:n sini-violetit laatat/kultakiekot eivät tule rakennusmalleista; lähde
  selvittämättä (avoimet ≤ v55 tai muu pala?). Juurta ei vielä päivitetty (v76/v52 eivät juuressa).

## Seuraavaksi (LISÄYS 9)
1. PT:n linja Taihedianin vanhaan kärkeen; Baohedian + Taihemen ylä (rengashaun korjaus: renkaan valinta z-tasoittain ja päätypoikkeamat pois).
2. juuri-v78m = v77m + yksikerros-v76 + rakennukset-v52 → VS:n parit; sini-violettien laattojen lähde.
3. T-risteys, aukion sivuhallit, 04, 06, 07; jonossa Olavinlinnan palatsi-v2.

## LISÄYS 10 klo 16.3x: vanha kultareuna pois C1:n alta, reunakivet, juuri-v78m
- PT 16.0x: vanha reunanauha + kultakärki pois C1:n kohdalta (periaate 9). K/tyokalut/c1_vanha_leikkaus.py (+ aja_c1_vanha.zsh, lisaa_valo.py):
  katto-solmun V4_gold pilkotaan kunkin C1-palan päätytasoilla ja huulitasolla (huuli − 0,10 m), poisto vain palan kohdalta huulen ulkopuolelta;
  nurkissa ulkokvadrantti (kärki). Ääretön taso + clear_outer (v1) puhkaisi kulmat → hylätty. Sonnet (c1-v3/leikattu/v3m-*): ei reikiä, kärki ja
  juova poissa, ei rakoa. K/rakennukset-v53 = v52 + leikkaus (Taihedian, Zhonghedian, Meridiaaniportti, Taihemen; kulta 2210 → 7243 kolm. jne.).
  v53 VAIN yhdessä C1-instansoinnin kanssa (ilman C1:tä räystäät paljaat) → PK.
- Omistaja 15.43 (KK): reunakivet ovat malleissa jo V4_kivireunusta (yläpinta, kyljet, päät; tarkistettu kaikki palat) → vika oli sävyttimessä,
  VS korjasi (17168ea22). Friisien väreily = suodatus, VS korjasi (aniso 8, mip-siirtymä 0,4). EROLISTA 01/5 korjattu, 01/9 uusi + korjattu.
- H/juuri-v78m = v77m + yksikerros-v76 (konsoli teal) + rakennukset-v52 (konsoli teal); v53 ei juuressa.
- Sini-violetit laatat: eivät näy havainteessa (vain VS:n peliruudussa) eivätkä tule rakennusmalleista → ei Codex-tilausta; lähde auki.

## LISÄYS 11 klo 16.5x: sini-violetit laatat = 1067 taustapaloissa → juuri-v79m
- Sonnet (VS:n parit 125052/135856, kuja 01): "sini-violetit laatat" = räystään alla oleva palkkivyö ylempien rakennusten räystäslinjassa;
  havainteessa vihertävä turkoosi. Lähde: 1067-palkkimaalaus taustapaloissa (tausta_pinnat.py, v75). PT 16.4x: havainne mittarina,
  korvataan olemassa olevalla → K/yksikerros-v77 (K/tyokalut/aja_ketju_v77.zsh: v73 + tausta_pinnat EI_1067=1 + konsoli_teal) = palkkivyö
  takaisin palkkimaalaus-teal-1536 (kuten rakennuksissa), 1069-nauha, harmaa→teal ja konsoli teal pysyvät. Avoimissa 1067 pysyy (VS hyväksyi).
- H/juuri-v79m = v78m + yksikerros-v77. VS:lle parit pyydetty (01 oikea yläkulma).
- Avoinna: C1 Baohedian, Taihemen ylä, Meridiaaniportin siivet; PK: rakennukset-v53 + c1-sijoitukset samaan erään (PT välitti).

## LISÄYS 12 klo 16.0x: C1 PK:lle
- K/c1-v3/kielletty-c1-v3/ (c1-sijoitukset.json + 1055 + 1056-A/B + SHA256SUMS); H/juuri-v80m = v79m + kielletty-rakennukset-v48 → rakennukset-v53
  + kielletty-c1-v3. PK:lle vastattu: LOD0 = v53:n <nimi>-lod0.glb (c1-v3:n -c1-lod0.glb vain esikatselu). VS (nollautuu) ajaa v79m-parit JONO.md:n kautta.

## LISÄYS 13 klo 16.2x: reunakivi pitkinä kivinä (omistaja 16.03, KK) → UV, juuri-v81m
- Sonnet (havainnepari 02 1558): havainteessa pitkiä yksittäisiä kiviä 1,2–2 × 0,35–0,4 × 0,15–0,2 m, ohuet vaaleat saumat, pitkän yläreunan viiste,
  ei lohkoja; pelissä 0,3–0,6 m lohkoja 2–3 rivissä (VS:n kivijalkakuvio) ja kolme eri sävyä. EROLISTA 01/5 päivitetty.
- K/tyokalut/kivireunus_uv.py: V4_kivireunus TEXCOORD_0 → u = metrit pituussuuntaan (komponentin tasopääakseli tai kohtisuora, kolmioittain
  napsautettu; ylä- ja sivupinnat yhtenäiset), v = metrit poikki/korkeus; kolmiot omiksi kärjikseen, muut attribuutit (valo TEXCOORD_1) kopioitu.
  K/yksikerros-v78 (= v77 + UV, 132 586 kolm.) ja leivottu-sali/avoimet-v57 (= v56 + UV). H/juuri-v81m = v80m + nämä.
- PT:lle uudelle VS:lle: kivet floor(u/1,6), sauma fract(u/1,6) < ~0,01, sävy hash(kivi), ei lohkokuviota; lattia/reunus/kivijalka samaan harmaaseen.
  Kysytty PT:ltä: reunus 0,5 → 0,4 m (havainne 0,35–0,4)? Pari KK:lle VS:n sävytyksen jälkeen.

## LISÄYS 14 klo 16.3x: reunakivi 0,4 m + UV v2, juuri-v82m; ketju v79 käynnissä
- PT 16.3x: reunus 0,5 → 0,4 m (havainne mittarina); PK: törmäys/juoksulinja pohja.json-rasterista, leveyttä ei lueta → vapaa. PK: C1 koodissa
  9b97dc324 (juuri-v80m), editorikuvat PK:lta.
- VS 617af4400 (seinat-211): V4_kivireunus = laji 18, kivet UV0.u:sta 1,2–2 m (1,6 ± 0,2), sauma 8 mm, oma sävy/raidoitus, ei lohkoja; viiste
  tarvitsee yläpinnan v = 0 kadun puoleisesta reunasta. Sävyt (lattia/kivijalka/reunus) VS:llä, pari KK:lle VS:ltä.
- kivireunus_uv.py v2 (VS: yläpinnan u kulki poikki, neliökolmioiden lävistäjä): yläpinta saa u:n viereisiltä pitkittäisiltä sivuilta, v = etäisyys
  kadun puoleisesta sivupinnasta. K/yksikerros-v78b + leivottu-sali/avoimet-v57b → H/juuri-v82m (reunus vielä 0,5). VS:lle ilmoitettu.
- KÄYNNISSÄ: K/tyokalut/aja_ketju_v79.zsh (v73:n muoto-osa REUNA_W=0.4 [kuja_reunakivi2.py ALUEET + kuja01_reunakivi2.py W ympäristömuuttujasta]
  → tausta_pinnat EI_1067 → konsoli_teal → kivireunus_uv v2) → K/yksikerros-v79/kielletty-tausta-v57; loki scratchpadissa (alkoi 16.07).
  Valmistuttua: H/juuri-v83m = v82m + kielletty-tausta-v57 → yksikerros-v79; VS:lle ja KK:lle (pari). Jos ketju kaatui: aja uudelleen samalla skriptillä.
- Avoinna: viisteen v:n negatiiviset (≈ −0,2) harvat kolmiot; C1 Baohedian, Taihemen ylä, Meridiaaniportin siivet.

## LISÄYS 15 klo 16.5x: yksikerros-v79 valmis, juuri-v83m/v84m
- Ketju v79 valmis 16.44: K/yksikerros-v79 (reunus 0,4 m, kuja 02 etureuna −0,1 m tarkistettu; UV v2; teal-1536 palkkivyö; konsoli teal).
- PK: F-ristiriita C1 + C2 → K/c2-v3/kielletty-c2-v2 = kielletty-c2-v1 + v53-pohjainen f-taihemen-lod0-kaiteeton.glb (sijoitukset ennallaan,
  osat 146/80/92 samat); PK kytki (proto 77f5abf6f). H/juuri-v83m = v82m + kielletty-c2-v2; H/juuri-v84m = v83m + yksikerros-v79 (UUSIN).
- VS: sirukuvio kujalla 02 EI mallista (sama v81m:llä; epäilee ympäristöheijastusta, tarkistaa). VS ajaa KK-parin juuri-v84m:llä.
- Seuraavaksi: C1 Baohedian (歇山), Taihemen ylä, Meridiaaniportin siivet; T-risteys, aukion sivuhallit, 04, 06, 07 (EROLISTA); jonossa Olavinlinna.

## LISÄYS 16 klo 16.5x: LUOVUTUS (konteksti 33 %)
- PK: C1 pelissä varmistettu (9b97dc324, juuri-v80m; kuvat proto-3d/lokit/esikatselu-20261027-164304/ g-c1/g-c0, a-c1/a-c0): rivi räystäällä,
  nurkat kaaren mukaan, ei leijuvia/rakoja/z-taistelua; ero hienovarainen 20–30 m:stä.
- VS: kujan 02 sirut = editori.sh ei ladannut juurta (junan oletusmallit). JUNARIIPPUVUUS (PT:lle kerrottu): seinat-211 laji 18 + yksikerros-v79
  (reunakiven UV) junaan YHDESSÄ. VS ajaa KK-parin juuri-v84m:llä.
- Seuraava Lavastaja: lue LISÄYKSET 9–16. Jono: VS:n KK-parin palaute (reunakivi); C1 Baohedian (歇山: ylempi rengas kiertää päädyn kautta,
  alemman renkaan päät pariutuvat sisärenkaan kanssa; c1_raystaat2.py:n parihaku), Taihemen ylä, Meridiaaniportin siivet → c1_vanha_leikkaus +
  c1_sijoitukset (kaikki mallit kerralla) → rakennukset-v54 + kielletty-c1-v4 PK:lle (myös F kaiteeton uudelleen c2_kaidesaaret.py:llä);
  viisteen v < 0 harvat kolmiot; T-risteys, aukion sivuhallit, 04, 06, 07 (EROLISTA); jonossa Olavinlinnan palatsi-v2.

## LISÄYS 17 klo 17.1x: kujan 02 vastaus VS:lle, Meridiaaniportin kattoläikät → katon UV1 (ei leivontaa)
- VS (kuja 02, juuri-v84m): yksikerros-v79 rasteroitu x −254…−237, z 320…345. Kuja seinästä seinään x −249,3…−242,2, kujapala
  peittää sen, reunakivi y 0,20 molemmilla reunoilla. rakennukset.015:n V4_lattia ja V4_kivireunus ovat muurien ulkopuolella
  (kujalle vain portin pilarit z 344–345). Pientiilialue, isojen laattojen kaista ja porras tulevat pelin omasta geometriasta
  → VS tarkistaa PK:n kanssa (raycast −247; 330). Mallissa ei ole korjattavaa.
- PK/PT: Meridiaaniportin kultakaton tummat lohkoläikät (esikatselu-20261027-165404/d-perus.png) = LOD0:n valo_rgbm, ei
  esikatselu. Sama vika on ollut v50:stä asti, eli C1 ei aiheuta sitä. SYY: leivo_malli.py:n smart_project teki jokaisesta tiilestä
  oman saarekkeen (2 tekseliä/m², 78 % katon kolmioista alle tekselin; atlaksen täyttävät ~50 000 pikkusaareketta marginaaleineen),
  joten naapurisaarekkeiden ja tyhjän alueen valo vuotaa katolle. Laitekuva (aukio 03) ilman läikkiä: LOD1/2:ssa ei ole valokarttaa.
- KORJAUS ILMAN LEIVONTAA (PT 17.0x: omistajan 10.56-päätös voimassa): K/tyokalut/katto_uv1.py, kytketty leivo_malli.py:hyn
  (KATTO_UV=1 oletus, varmuuskopio .ennen-kattouv). Ylöspäin osoittavat V4_gold-pinnat jaetaan 1 m:n kuutioista lapealueiksi
  (naapurinormaalit, pistetulo > 0,8), jokainen alue projisoidaan keskinormaalinsa suunnasta yhdeksi saarekkeeksi (merge_overlap);
  muut pinnat smart_projectilla. Lappeiden mittakaava × VAHV, jotta katolle tulee KATTO_OSUUS (0,5) atlaksesta.
  Tarkistus VAIN_UV=<npz> (ei leivontaa): Meridiaaniportti 20 lapealuetta, katto 2,1 → 17 tekseliä/m², muut 2,4 → 3,0,
  päällekkäisyys katto/muut 0,01 %.
- JONO: rakennukset-v54:n leivonta (kaikki mallit leivo_malli.py:llä, uusi UV1) vasta muotoerien jälkeen, kun valo otetaan taas
  työn alle. Sama vika voi olla taustapaloissa (leivo_valo.py, 1,6 tekseliä/m²): katto_uv1 sinne samalla.

## LISÄYS 18 klo 17.3x: C1 v4 kaikkiin hallirakennuksiin, rakennukset-v54, juuri-v85m, tausta.json (LUOVUTUS)
- K/tyokalut/c1_raystaat2.py v4 (varmuuskopio .ennen-v4; aja aina INSET=0.15 NALAS=0.35 kuten v3):
  1. Sisäketjut pois haaroittain (aste ≠ 2 -kohtien välit): avoin haara, jonka ≥ 70 % pisteistä on 0,3–2,5 m ulomman haaran sisäpuolella
     (|dz| < 1,2), poistetaan ennen parien hakua. Lisäksi pois tasaiset irtoketjut (z-vaihtelu < 5 cm) ja jäänteet (avoin haara < 6 m).
  2. Renkaat: kattonauha pudotetaan vain, jos se on ison renkaan sisällä ja kutistunut tasaisesti (_nauha), eli Meridiaaniportin
     kulmapaviljongit jäävät. Tasaiset renkaat (z-vaihtelu ≤ 0,1) eivät ole räystäitä.
  Regressio: Taihedian ja Zhonghedian palalleen samat kuin v3. Uudet räystäät: Baohedian 2 (歇山 ylä ja ala), Taihemen ylä ja ala
  (alempi korjattu), Meridiaaniportti +8 paviljonkirengasta. Sonnet tarkisti kuvat c1-v4/*.png (Taihemenin alanurkan koukku korjattu ja
  tarkistettu itse). DEBUG=1, SEGS=<json> ja PAAZ/PAAZ0 ovat vianetsintään.
- K/c1-v4/kielletty-c1-v4: c1-sijoitukset.json 2280 palaa (1055 2204, 1056-pareja 76; 5 mallia) + 3 glb + SHA256SUMS.
- K/rakennukset-v54 (aja_c1_vanha_v54.zsh / aja_c1_v4.zsh): v52 + vanha kultareuna leikattu c1-v4:n alta 5 mallista, valo_rgbm v52:sta
  (EI uutta leivontaa). HUOM: kun valo leivotaan uudelleen (katto_uv1), leivontanimi on v55 tai uudempi, ei v54.
- K/c2-v4/kielletty-c2-v3 = c2-v2 + f-taihemen-lod0-kaiteeton v54:stä (c2-sijoitukset ennallaan, tarkistettu samaksi).
- H/juuri-v85m = v84m + kielletty-rakennukset-v48 → rakennukset-v54, kielletty-c1-v3 → c1-v4, kielletty-c2-v2 → c2-v3 (pelin nimet).
- VS 17.2x: yksikerros-v79:n tausta.json ei listannut kujapaloja → peli ei ladannut uutta reunakiveä. K/tyokalut/tausta_json_taydenna.py
  ajettu paikallaan (vanha .ennen-taydennys), 23 palaa. LISÄÄ TÄMÄ JOKAISEN TAUSTAKETJUN LOPPUUN.
- SEURAAVAKSI: PK:n tarkistus juuri-v85m:llä (C1 Baohedian, Taihemen, paviljongit); viisteen v < 0; T-risteys, aukion sivuhallit, 04,
  06, 07 (EROLISTA); jonossa Olavinlinnan palatsi-v2; valon uusi leivonta (katto_uv1, myös leivo_valo) vasta omistajan luvalla.

## LISÄYS 19 klo 19.59: reunakivi yksittäisinä kivinä, tausta-v59 ja -v60 viety (LUOVUTUS, konteksti 30 %)
- VIETY: tausta-v59 (= yksikerros-v79 + tausta.json; JU vei, NS junaan 212 ff39153ac). tausta-v60 (= yksikerros-v83) JU:lle 19.59
  (_valmiit/juoksupeli-kk-tausta-peking-v60-vienti-20261027, SHA256SUMS b0b11ab458e1), osoitin lavastaja/tausta-v60-212 9805ef7c5
  (proto-repo, worktree wt/proto-lavastaja-muoto). KK 19.1x: muoto hyväksytty; lovettoman parin 195504 KK:lle ja PT:lle.
- REUNAKIVI (PT/KK 17.4x–19.1x, omistajan 16.03 "pitkiä yksittäisiä kiviä"): 0,30 × 0,20 m (REUNA_W/REUNA_H), kivet geometriassa
  K/tyokalut/reunakivi_kivet.py (kuja_reunakivi2.py ja kuja01_reunakivi2.py kutsuvat): yläpinnan V-urat 2 × 6 mm / 3 cm, viiste 2 cm,
  REUNA_URA_VIISTE=0 (viiste ja etupinta ehjät). Urat kohdissa u = k·0,7 + (frac(k·0,618034) − 0,5)·0,2 = VS:n ReunusRaja (seinat-211
  2cb23fc37→); TiivisteK ei kelpaa rajoihin (float32 kaoottinen). UV0.u = urien pituus-u, v = ±1000 merkkinä → kivireunus_uv.py säilyttää u:n
  (oma PCA-akseli erosi ~1e-4 → x ≈ −247 siirsi u:ta 2–30 cm = v88m:n valkoiset viivat); uraseinät ja päädyt vakio-u. Ketju aja_ketju_v83.zsh.
- KORJATTU: kuja01_reunakivi2.py:stä puuttui import os (v79:ssä kujan 01 reunakivi puuttui kokonaan; 01:n "penkki" hävisi korjauksella).
- Havainneparit: AINA VS:n pinnalla REF=<VS:n seinat-211 SHA, nyt 3985a20cf> MALLIT=file://<juuri>/ zsh _tyo/linssiseppa2/tyokalut/editori-vs.sh
  02 01 05 03; juureen sekä kielletty-tausta-v57 ETTÄ -v59 (ja jatkossa -v60) samaan yksikerros-kansioon (juna-212 lataa v59/v60). Uusin H/juuri-v89m.
- PK 18.1x: C1 v4 OK pelissä; epävarma: Meridiaaniportin itäpaviljongin alakaton vasen nurkka portaikkoinen.
- SEURAAVAKSI: rakennukset-v54 + c1-v4 + c2-v3 vienti PK:n linjan kanssa (rakennukset-v54 vaatii C1-koodin); T-risteys, aukion sivuhallit,
  04, 06, 07 (EROLISTA); Olavinlinna 3c pako-v2 ja 3d tyrma-e101-v2 (NS 19.0x: PT kirjannut LR:lle koottaviksi, tiedostoja ei vielä löytynyt);
  valon uusi leivonta vasta omistajan luvalla.

## LISÄYS 20 klo 20.05: reunakiven muoto ja väri LUKOSSA (omistaja 20.05, KK:n kortti)
- OMISTAJA 20.05 "Kyllä (Suositus)": reunakiven muoto ja väri hyväksytty (pari 195504, tausta-v60), koskee myös kujia 01, 05 ja 03.
  Seuraavaan junaan (213) PT:n kautta: tausta-v60 on JU:lla (SHA256SUMS b0b11ab458e1, osoitin lavastaja/tausta-v60-212 9805ef7c5).
- Pinnan rosoisuuden viimeistely VS:llä (varjostin/pinta); Lavastaja EI muuta reunakiven geometriaa (REUNA_W/H, urat, viiste) ilman uutta päätöstä.

## LISÄYS 21 klo 21.0x: muurin yläreuna kiveksi (omistaja 20.06 "Kivimuurin yläreunasta puuttuu tekstuuri"; VS sopi työnjaon)
- Syy: sokkelin päällä V4_sokkeli_kansi (tasaväri, yläpinta 1,2–1,3 m, 8–10 cm etureuna) ulkoni 6 cm sokkelin pinnasta.
- K/tyokalut/kansi_seinaan.py (ketjussa marmori_pystyt_sokkeliin-askeleen jälkeen, K/tyokalut/aja_ketju_v84.zsh → yksikerros-v84):
  kannen pystyreunat sokkelin tasoon (mitattu 6 cm → 0), litteät alapinnat pois, kaikki kansi → V4_sokkeli (VS: laji 11 kivikerta myös vaakapinnalle).
  Matalat marmoripystyt → V4_sokkeli vain, jos ≤ 1,45 m ja sokkelin vieressä (lähes ei osumia).
- Parit: lokit/havainne-editori-20261027-205842 (02 01 05, VS:n REF 77417f7e4, H/juuri-v90m = v89m + tausta-v57/59/60 → yksikerros-v84), VS:llä.
- AVOIN: pilarien beiget kulmakivet ovat jo V4_sokkelia → sävy VS:n varjostimesta (VS:lle 21.0x). v84 EI vielä vientinä (tausta-v61), odottaa VS:n lähikuvaa ja KK:ta.
- VS 21.1x: kulmakivet mitattu samaa harmaata kuin sokkeli (186/177/170 vs 177/170/163), ei erottelua. VS tekee KK:lle yhdistelmäparin (rosoisuus a1d79e26e + juuri-v90m); KK:n kuittauksen jälkeen v84 → tausta-v61 JU:lle.
- VS 21.3x: beige kulmakivi = auringon puoleisten pystypintojen valo, korjattu VS:n varjostimessa 1158e9df0 (ei nimenvaihtoa; pilarit ovat taustassa 0-3, eivät avoin-paloissa). Geometriaa ei tarvita lisää.
- KK 21.2x: välikorjaus loppuun → tausta-v61 = yksikerros-v84 (_valmiit/juoksupeli-kk-tausta-peking-v61-vienti-20261027, SHA256SUMS c24b05fa9218),
  osoitin lavastaja/tausta-v61-213 da2a83a50 (proto, wt/proto-lavastaja-muoto). Vienti JU:lle + osoitin NS:lle, kun KK kuittaa VS:n yhdistelmäparin. Kansi muutettu vain LOD0:ssa.
- KK 21.2x: Codex tekee kujien kivet havainteen mukaisina paloina (PK tilaa); mitat PK:lle 21.3x (reunakivi 0,30 × 0,20 × 0,6–0,8; sokkeli 1,20 ilman kansilistaa;
  pilari ~0,4 ulos × 0,6; lattia kuja ~6,8, laatat 0,6–1,2 × 0,4–0,6). SEURAAVAKSI: kun palat tulevat, LR kokoaa ne nykyisten kivien tilalle → pari KK:lle.

## LISÄYS 22 klo 22.1x: v85 + muurikate-v19 (KK 21.5x pari 211947: suikale ja pilarien harmaat katteet), pari 221009 KK:lla
- Suikale = taustan 1,30 m:n kaistan etupinta siirtyi v84:ssä 7 cm (yläpinta T-liitoksin pilkottu, ei siirtynyt) → kansi_seinaan.py KANSI_YLA=1.205
  (aja_ketju_v85.zsh → yksikerros-v85). tausta-v61 (v84) EI käyttöön.
- Pilarien katteet = muurikatteen V4_sokkeli_kansi (0,22 × 0,95 m, 1,20–1,26) → muurikate_kansi.py (seinän tasoon 5422 reunaa, kansi → V4_sokkeli,
  nimet tarkoiksi). Junan v18-pohjasta K/muurikate-v19/kielletty-muurikate-v19/kk-muurikate-v19-pohja.glb (+ 1057-c3 ja c3-sijoitukset kopioina);
  parin v16-nimelle v17:stä K/muurikate-v19/pari-v17-v16-nimella. HUOM: juna 213 MuurikateTiedosto = kielletty-muurikate-v18/kk-muurikate-v18-pohja.glb.
- Pari: lokit/havainne-editori-20261027-221009/02 (H/juuri-v92m, REF 1158e9df0). VS:n editori-vs.sh viittaa poistettuun wt/proto-linssiseppa2-p11:een →
  oma kopio T=wt/proto-lavastaja-havainne/tyokalut/havainne.
- Kuittauksella: tausta-v62 (= v85) + muurikate-v19 paketit JU:lle, osoitin (TaustaKansio v62, MuurikateTiedosto v19-pohja) NS:lle.
- Codexin 2D-pinnat (omistaja 21.51/21.54): kivien ja kattojen/friisien/rappauksen pintamitat PK:n postissa bba13fd6b ja 7eb80206c; muodot ja UV:t LR.
- KK 22.2x: pari 221009 ok, omistajan kortilla. VALMIINA: _valmiit/juoksupeli-kk-tausta-peking-v62-vienti-20261027 (SHA256SUMS eb30ccc2f8fb) ja
  _valmiit/juoksupeli-kk-muurikate-v19-vienti-20261027 (6afb0652f35f; vanha C3-kate jää v18-kansioon). Osoitin lavastaja/tausta-v62-213 5ca3e2d4b
  (natiiviseppa/juna-213:n päällä, wt/proto-lavastaja-muoto). NS:lle ja JU:lle VASTA kun KK välittää omistajan Kyllän.
- OMISTAJA 22.23 (KK): Kyllä → tausta-v62 + muurikate-v19 JU:lle ja osoitin 5ca3e2d4b NS:lle junaan 213 (lähetetty 22.2x). SEURAAVAKSI: Codexin 2D-pinnat (kivet, sitten katot/friisit/rappaus) → muodot + metriset UV:t → pari KK:lle.
- JONO (PT 22.3x): Pekingin kivet ja 2D-pinnat ensin; sitten Olavinlinnan aarteet J3/J4 (Codex 0cba769bd, NS:n tekninen vastaanotto OK) arkkuun ja käteen, NS:n havainnot (J4-kannun kahvan venynyt tekstuuri, arkkujen laakeat sävyt) pelin valossa → pari KK:lle; korjauspyyntö Codexille vasta sen jälkeen.

## LISÄYS 23 klo 22.5x: Codexin kujakivien 2D-pinnat kokoamiseen (LUOVUTUS, aloita tästä)
- TILA: juna 213:ssa tausta-v62 (= yksikerros-v85) + muurikate-v19 (NS 5ca3e2d4b, JU vienyt). Pohja seuraavalle: K/yksikerros-v85, K/muurikate-v19.
- PINNAT: claude/postilaatikko c56b5c011, posti/juoksupeli-kujakivet-11911194-20261027/stone-surfaces-v3/ (myös T7, SHA 110/110). LUE KAYTTO.md:
  reunakivi 0,70 × 0,52 clamp (yläpinta 0–0,30 | viiste 0,30–0,32 | etu 0,32–0,52 kuvan yläreunasta), sokkeli 2,00 × 1,20 X-toisto (yläreuna = ylin kerta),
  sokkelin-ylapinta 2,00 × 0,10 (y=0 etureuna), pilarin-etu 0,60 × 1,20 ja -sivu 0,40 × 1,20 clamp (etu OIKEA reuna = sivu VASEN reuna samassa ulkokulmassa),
  lattialaatat 2 × 2 toisto (kuvan pysty = kujan suunta). Normaali OpenGL +Y, PNG:n rivit alas. Valitse SAMA vNN kaikille (aloita v01).
- VS 22.5x SOPI (A): LR tekee metriset UV0:t + omat materiaalit V4_kujakivi_reuna / _sokkeli / _sokkeli_yla / _pilari_etu / _pilari_sivu / _lattia,
  kuvat glb:hen baseColorTexture + normalTexture (EI karheutta). Peli piirtää laji 0 -polulla (JuoksuMaailma.shader: albedo + JUOKSU_NORMAALI + leivottu UV1).
  UV1 (valo_rgbm) säilyy, koska vain materiaali ja UV0 muuttuvat (leivonta seis, omistaja 10.56). VS lisää myöhemmin kohokuvion leivottuun valoon ja rajaa
  JuoksuMaaKivi-sävytyksen V4_kujakivi_*:sta, jos tarpeen. VS odottaa REF/juuri-tietoa parille 02/01/05.
- TOTEUTUS (ehdotus): Blender-askel kujakivi_uv.py ketjuun kansi_seinaan.py:n jälkeen (aja_ketju_v86.zsh → yksikerros-v86):
  (1) kuja-palat kk-tausta-kuja-0-3/1-3: V4_kivireunus → _reuna, UV0.u = kiven sisäinen 0–0,70 (kivirajat u = k·0,7 + (frac(k·0,618034) − 0,5)·0,2,
  nykyinen UV0.u on jo urien pituus-u → u_kivi = (u − alku)/(loppu − alku)·0,70), UV0.v = poikkileikkauksen kaari 0–0,52 (kivireunus_uv.py:n v ±1000 -merkki
  kertoo puolen; tarkista). V4_lattia kujapaloissa → _lattia, UV0 = kujan akselin suuntainen tasoprojektio / 2,0 m.
  (2) Taustan V4_sokkeli-pystypinnat kujapalojen alueella (bbox + 3 m) → _sokkeli, u = seinän suuntainen etäisyys / 2,0, v = z / 1,20; yläpinnat → _sokkeli_yla.
  (3) Muurikatteen pilarien sokkelilohkot (V4_sokkeli, 0–1,20 m, kansi 0,22 × 0,95) → _pilari_etu (leveät pinnat) / _pilari_sivu (kapeat), u venytetään pinnan leveyteen.
  Sitten python-askel kujakivi_kuvat.py (tausta_pinnat.py:n mallilla, JSON + numpy): kuvat ja materiaalit glb:hen. Pari 02/01/05 omalla editori-kopiolla
  (/private/tmp ei säily → kopioi _tyo/linssiseppa2/tyokalut/editori-vs.sh ja vaihda T=/Users/Shared/Claude/wt/proto-lavastaja-havainne/tyokalut/havainne),
  REF = VS:n uusin (1158e9df0 tai uudempi, kysy), juuri = H/juuri-v92m + tausta → v86, muurikate pariin v17-v16-nimella-kopio samalla käsittelyllä.
- MUUT KUVAT TULOSSA: katot/friisit/rappaus (mitat postissa 7eb80206c): katto 1 × 1 m, friisi 4,13 × 1,03 m (nykyinen UV0 jo valmis), kultalista 1 × 0,06, rappaus 4 × 4 m + likajuova.
- JONO: Olavinlinnan aarteet: J4 (Codex 0cba769bd) voi edetä, J3 vasta Codexin korjatulla (ee62a9541: kaksi ylimääräistä kilpeä); NS:n havainnot (J4-kannun kahvan
  venynyt tekstuuri, arkkujen laakeat sävyt) pelin valossa → pari KK:lle, korjauspyyntö Codexille vasta sitten.
- TYÖKALUT tänään: K/tyokalut/kansi_seinaan.py (KANSI_YLA), muurikate_kansi.py, aja_ketju_v84/v85.zsh, aja_v84_juuri.zsh, aja_v85_pari.zsh. Proto-osoittimet
  wt/proto-lavastaja-muoto: lavastaja/tausta-v62-213 5ca3e2d4b (junassa); lavastaja/tausta-v61-213 da2a83a50 EI käytössä.
- HUOM: tämän checkoutin haara vaihtui kesken session koti-haaraan (joku muu sessio?) → tarkista git branch ennen committia.

## LISÄYS 24 klo 23.2x: kujakivien 2D-pinnat v01 kujapaloihin (yksikerros-v86), pari VS:llä
- PINNAT: postista c56b5c011 kansioon K/kujakivi-pinnat-v3 (SHA256SUMS 110/110 OK). Valittu v01 kaikille.
- K/tyokalut/kujakivi_pinnat.py (pelkkä python, v85:n valmiiden glb:iden päälle; UV1 ja muu geometria ennallaan). Ketju K/tyokalut/aja_ketju_v86.zsh [vNN]
  → K/yksikerros-v86 = v85 + pinnat:
  (1) kujapalat kk-tausta-kuja-0-3/1-3: V4_kivireunus → V4_kujakivi_reuna (UV0.u = kiven sisäinen 0–1 kivirajoista raja(k), v = avattu poikkileikkaus
  0–0,52 / 0,52; etupinnan taso interpoloidaan pituus-u:n mukaan, koska kujan 02 oikea nauha ei ole suora, ks. v86:n 1. pari 230352). V4_lattia → V4_kujakivi_lattia
  (kujan PCA-akseli, 2 m toisto, kaikki lodit).
  (2) taustapalojen V4_sokkeli kujapalojen bbox + 3 m: pystypinnat → V4_kujakivi_sokkeli (u seinän suuntaan / 2, v = (1,20 − y) / 1,20), yläpinnat y > 1,1 → _sokkeli_yla.
  Osumat vain 0-3 (kuja 02); kujan 01 seinät ovat avoimet-palojen rakennuksia → kujan 01 sokkeli EI vielä (avoimet-v5x, oma askel).
  Kuvat glb:hen (albedo + normal, ei karheutta), samplerit KAYTTO.md:n mukaan (reuna clamp, sokkeli X-toisto, lattia toisto).
- PARI: K/tyokalut/aja_v86_pari.zsh (H/juuri-v93m = v92m + tausta-v57/59/60 → yksikerros-v86; oma editori-kopio K/tyokalut/editori-lr.sh, T = wt/proto-lavastaja-havainne).
  Tulos proto-3d/lokit/havainne-editori-20261027-231817 (02 01 05, REF 1158e9df0). Sonnet-tarkistus: pinnat latautuvat, reunakiven venyminen korjattu;
  lattia ~40 % havainnetta vaaleampi ja kylmä, valoa/varjoa ei näy (kujapaloissa ei UV1:tä) → VS:lle 23.2x (laji 0 -polun sävy). KK:lle pari vasta VS:n REF:n jälkeen.
- 23.3x: (3) pilarit → V4_kujakivi_pilari_etu / _sivu (saman tason pinnat, leveys ≤ 0,70: > 0,45 etu, muuten sivu, u venytetty leveyteen). Näkyvät pilarit
  ja muurisokkeli ovat MUURIKATTEEN V4_sokkelissa: ketju tekee myös K/muurikate-v19/pari-v86-v16-nimella (LISA=…glb), juuri-v93m:n kielletty-muurikate-v16 → siihen.
  Pari proto-3d/lokit/havainne-editori-20261027-232729 (02 05): pilarit kerroskuvioisia, ei venymää; kivijalka havainnetta vaaleampi ja tasaisempi (VS).
  VIENTIIN myöhemmin: tausta-v63 = yksikerros-v86 ja muurikate-v20 = junan v19-pohja samalla käsittelyllä (EI vielä tehty; pari käytti v17-v16-nimella-kopiota).
- AVOIN: kujan 01 sokkeli avoimet-paloissa; 01:n reunakivet
  näyttävät irrallisilta kermanvalkoisilta laatoilta (tarkista pelin valossa VS:n korjauksen jälkeen). Olavinlinna J4: arkun glb:tä ei löytynyt _tyo/_valmiit-hauilla → kysy NS:ltä polku.
- JATKO (Macin uudelleenkäynnistys): ei pitkiä taustaajoja kesken. Uusinta: zsh K/tyokalut/aja_ketju_v86.zsh (≈ 1 min, myös muurikatteen parikopio), pari: zsh K/tyokalut/aja_v86_pari.zsh [kohdat]
  (REF=<VS:n uusi SHA> ympäristössä).

## LISÄYS 25 klo 23.4x: Olavinlinna J4 arkkuun (valmisteltu, ei vielä pelissä)
- NS 23.3x: arkku = kavely/merkit.json esine:arkku-komero (_valmiit/olavinlinna-blender-v44/kavely, paikka (−50,397; 14,8; −5,381), kierto_y −1,7453), Kellotornin komero.
- Mitattu runko: sisäpohja y 0,05, sisäseinät x ±0,275, z ±0,200 (sisätila 0,55 × 0,40), reuna 0,361. J4 0,476 × 0,223 × 0,400 → skaala 0,97 juurisolmuun.
- _tyo/linnanrakentaja/olavinlinna-j4/: j4_arkkuun.py, esine-arkun-hopeasisalto.glb (T7-lähde SHA 96a0674a…), merkki.json (esine:arkun-hopeasisalto, paikka y +0,051).
- AVOIN: merkki kavely-pakettiin + mahdollinen ASTC (glb_kuvat_astc6) + vienti JU:lle vasta pelin valon parin ja KK:n jälkeen; kannun kahvan venymä (Codexin J4-four-views) ja
  arkkujen laakeat sävyt arvioidaan samassa kuvassa; korjauspyyntö Codexille vasta sitten. J3 odottaa Codexin korjattua (ee62a9541).

## LISÄYS 26 klo 00.0x (28.10.): KK-pari kujakivistä
- VS 23.5x: sävykorjaus 67afc1220 (seinat-211; V4_kujakivi_* kerroin 0,52/0,49/0,45). Pari KK:lle: proto-3d/lokit/havainne-editori-20261027-235149 (02 05 01, linja 2).
- Worktree wt/proto-lavastaja-havainne: tyokalut/esikatselu.sh + lokikansio.zsh 69bc67131:stä (linja 2, JU/PT 15.5x); ajo: REF=67afc1220 zsh K/tyokalut/aja_v86_pari.zsh.
- Kuja 01: näkyvä sokkeli (0,7 m) ja reunus ovat avoimet-v57b:n rakennuksissa (paikalliset, instansoidut meshit; V4_sokkeli/V4_kivireunus) → kujakivi_pinnat.py ei käsittele;
  oma askel (instanssikohtainen maailmakoordinaatti tai paikallinen UV), KK:n vastauksen jälkeen.
- J4: NS kuvaa `linssi poikki kavely data file://…/olavinlinna-j4/kavely-j4/` -komennolla (aloitus pako, arkku auki); kuvat tulossa NS:ltä.

## LISÄYS 27 klo 00.2x (28.10.): KK:n linja, Codex-tilaus v4, kuja 01 mukana, välipari
- KK 00.0x: suunta oikein, EI vielä omistajalle eikä junaan. Kivijalassa havainteessa ~8 kerrosta pieniä tiiliä, sävy tiilittäin ja kuluneet reunat; lattiassa
  tyynylaatat porrastetusti ilman kiemuroita; reunakivi ennallaan; aurinko/varjo vasta leivonnassa. Omistaja näkee parin ennen junaa.
- Codex-tilaus postissa f0766ed58 (posti/lavastaja-codex-kujakivet-v4-tarkennus-20261028.md; worktree wt/lavastaja-posti): stone-surfaces-v4, samat mitat ja UV-sopimus.
- Väliaikaisesti VV_SOKKELI=v02, VV_PILARI=v02, VV_LATTIA=v04 (Sonnet: lähimmät), reuna v01 (aja_ketju_v86.zsh; per-laji VV_* kujakivi_pinnat.py:ssä).
- Kuja 01: AVOIMET=1 YTOP=0.70 → leivottu-sali/avoimet-v58k (avoimet-v57b + pinnat; juuri-v93m:n avoimet-v50 → v58k). Välipari havainne-editori-20261028-001129
  (02 05 01, REF 67afc1220): 01:n kivijalassa kivikuvio, ei venymää; kaksi vaaleaa vanhaa palaa (01: x≈1360 y≈620 ja x≈105 y≈590, todennäk. taustan pala) ja
  01:n reunakivissä ruskehtava pinta (ei uusi) → tarkista seuraavalla kierroksella.
- SEURAAVAKSI: Codexin v4 → K/kujakivi-pinnat-v4 (SHA) → aja_ketju_v86.zsh pinnat-kansio v4:ksi → pari + 2× lähikuvat KK:lle. J4: NS:n komerokuvat.
- J4 (NS 00.5x): pelin valossa komerossa arkku auki proto-3d/lokit/esikatselu-20261028-005705/ (paras j4g-ylhaalta-y81.png; juna-213 5f80444a5, `poikki kavely data file://…/kavely-j4/`,
  skenaario proto-3d/tyokalut/natiiviseppa-ajot/sk-komero-j4.txt). Sovitus OK (pohjalla, ei törmäyksiä). Hopea himmeä beige: DioraamaValaistu ei käytä metallisuutta/karheutta
  (SeikkailuEsineet.cs:762) → PT:lle päätös esineiden metallituesta ennen Codex-korjausta; kahvan venymää ei voi arvioida.
- PT 01.0x: metallituki ensin (VS kujakivien sävytyksen jälkeen, NS avustaa); Codexilta EI J4-sävykorjausta ennen sitä; J4-kuvaa EI KK:lle ennen metallitukea. Jatka kujakivillä.

## LISÄYS 28 klo 01.4x (28.10.): J4 hopeaksi metallituella; LUOVUTUS (konteksti 30 %)
- VS 01.1x: metallituki REF 33acd68dd (linssiseppa2/esineet-metalli-213; glb:n metallisuus/karheus, kartan keskiarvo M 0,73 / K 0,49; täysi kartta <glb>-orm-6x6.astcm myöhemmin).
- Ajot (oma: cd wt/proto-lavastaja-havainne; PROTO_LINJA=2 zsh tyokalut/esikatselu.sh 33acd68dd <skenaario> ipad --batch, ~6 min):
  012404 Tripon väri (pronssi/sepia), 013011 hopea 0,25 + 1,35·L (liian vaalea, liitumainen), 013631 hopea 0,08 + 1,25·L, sävy (0,94, 0,97, 1,00) + lähikuvat j4h/j4i
  (skenaario _tyo/linnanrakentaja/olavinlinna-j4/sk-komero-j4-lahi.txt). 013631 (Sonnet): hopeaa muistuttava viileä harmaa (kolikot ~140, kulho ~105), ei liian vaalea, mutta litteä: tarvitsee kontrastia ja kirkkaita heijastuksia
  (karheus alas? VS:n täysi ORM-kartta) → kysy VS:ltä ennen seuraavaa säätöä. j4h näyttää sisällön hyvin; j4i katsoo seinään (kamerapaikka uusiksi); kahva sileä silmukka j4h:ssa.
- Työkalu olavinlinna-j4/j4_hopea.py (VAL0/VAL1 tiedoston alussa): esine-arkun-hopeasisalto-pronssi.glb (= skaala 0,97, Tripon väri) → esine-arkun-hopeasisalto.glb
  (+ kopio kavely-j4:ään). Vanha JPEG-kuva jää käyttämättömänä bufferiin (12 Mt) → siivoa ennen vientiä (tai ASTC glb_kuvat_astc6).
- SEURAAVAKSI: J4-pari (ennen/jälkeen) KK:lle vasta, kun hopea näyttää hopealta (PT 01.0x: ei beigeä KK:lle); kahvan venymä lähikuvasta → Codex-korjaus vasta sitten.
  Kujakivet: odota Codexin stone-surfaces-v4 (tilaus f0766ed58) → K/kujakivi-pinnat-v4 (SHA) → aja_ketju_v86.zsh (pinnat-kansio v4, VV_*) → pari + 2× lähikuvat KK:lle;
  kujan 01 kaksi vaaleaa sokkelipalaa ja ruskea reunakivi (välipari 001129) tarkista.
- Checkout on haarassa lavastaja/luovutus-lisays24 (PR 5392). Ei käynnissä olevia taustaajoja.

## LISÄYS 29 klo 02.5x (28.10.): J4 hopea KK:lle (PT välitti)
- VS:n linja: metallin perusväri = F0 (hopea sRGB ~225–235); komerossa EI valoluotaimia → VS:n korjaus 5681793be (esineet-metalli-213: ilman luotainta taivas heijastuksessa × 0,35).
  Pääsyy huntuun oli glb: metallicFactor puuttui → metalli = MR-kartan B ≈ 0,73. j4_hopea.py nyt: VAL0/VAL1 0,40/1,15 (albedo ka ~224), roughnessFactor 0,35, MR-kartan B = 255.
- Ajot (sk-komero-j4-lahi.txt, linja 2): 015103 → 015815 → 020611 → 021342 → 022852 → 024427 (REF 5681793be, hyväksytty). Pari: proto-3d/lokit/esikatselu-20261028-024427/j4-pari-kk.png (+ -ylhaalta, cmp7).
- PT:n huomio KK:lle: kiilto hyvä, sävy lämpimän ruskea ja kolikot tummia → mahdollinen palaute sävystä (viilennys: tint j4_hopea.py:n rivillä np.array([0.94, 0.97, 1.0])).
- AVOIN J4: KK:n palaute; vanhat JPEG-kuvat jäävät bufferiin (glb 14 Mt) → siivous/ASTC ennen vientiä; merkki kavely-pakettiin; kahvan venymä (Codex) vasta KK:n jälkeen.
- Kujakivet: Codexin v4 (f0766ed58) ei vielä postissa → ohjeet LISÄYS 28.
- JATKO (Macin uudelleenkäynnistys): ei taustaajoja. J4-uusinta: python3 _tyo/linnanrakentaja/olavinlinna-j4/j4_hopea.py esine-arkun-hopeasisalto-pronssi.glb esine-arkun-hopeasisalto.glb (+ kopio kavely-j4/),
  ajo: cd wt/proto-lavastaja-havainne; PROTO_LINJA=2 zsh tyokalut/esikatselu.sh 5681793be <sk-komero-j4-lahi.txt> ipad --batch.

## LISÄYS 30 klo 05.0x (28.10.): J4 odottaa Codexin J4-v3:a; kujakivet edelle
- Kierros KK:n kanssa (v4 j4-kk-3 → v5 j4-kk-5, lokit/esikatselu-20261028-044256): kirkkaus +29 % VS:n metallivalolla (vain metallille), normaalit ja väri ASTC:nä
  (NS:n AstcSaatavilla f047065df rungossa). KK 04.4x: EI JUNAAN (halo, läikät, mustat kolikot, leimat puuttuvat, kannun suu). PT 04.5x: vain pelin viat pelissä,
  mallin viat Codexille, seuraava pari vasta korjatulla mallilla.
- Codex-pyyntö postissa 23b9fa03b + cb81d74ed (posti/lavastaja-codex-j4-hopea-korjaus-20261028.md + liitteet): albedo tasaiseksi (atlaksen saarten läikät), kohokuviot
  normaaliin, MR B = 1, kannun suun umpikiekko (5 cm syvyydellä) → syvä tumma aukko. Nimi J4-v3.
- PELIN PUOLI: VS:n halo-rajaus (metallin ulostulo ≤ 0,92) = esineet-metalli-213 f7fd394da / pari-haara linssiseppa2/j4-pari 2855d8478 (sisältää f047065df).
  EI f3bee5e07 eikä komeron heijastustäytettä (PT kielsi). Arkun metallivalo 1,2 (SeikkailuKomero.ArkkuValoVoima) on haarassa.
- J4-v3:n tultua: j4_hopea.py (SAVY viilennys yökuvan SplitToningia vastaan, KARHEUS 0,35, MR-B 255; albedon tasoitus TASO/KOR/SUM vain jos Codexin albedo ei tasainen)
  → j4_siivous.py <glb> <ulos> <kuvakansio> → astc-mip.swift vari/normaali (j4_normaali.py VOIMA/SUMENNUS) → kavely-j4/ → pari REF 2855d8478 sk-komero-j4-lahi.txt
  (j4h + j4g) + 2×-rajaukset + vastakoe-esineet rekvisiitta-brass_pot_01 ja -wooden_crate_01 (VS) → PT → KK.
- kavely-j4 palautettu 044256-tilaan (glb + astcm; tasoituskoe sivussa esine-arkun-hopeasisalto-tasoitettu-koe.glb, ajo -045352, ei arvioitu).
- Ei taustaajoja käynnissä. Kujakivet: Codexin v4 (f0766ed58) ei vielä postissa → LISÄYS 28.
