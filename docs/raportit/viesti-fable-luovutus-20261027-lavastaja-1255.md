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

## LISÄYS 31 klo 08.3x (28.10.): kujakivet v4 pelissä, VS:n sävy kesken; LUOVUTUS (konteksti 30 %)
- Codexin v4 (3a6fae6f4, vain v01, SHA 39/39) → K/kujakivi-pinnat-v4. aja_ketju_v86.zsh: PINNAT-muuttuja; ajo
  `SK=0.625 PINNAT=$K/kujakivi-pinnat-v4 VV_SOKKELI=v01 VV_PILARI=v01 VV_LATTIA=v01 zsh K/tyokalut/aja_ketju_v86.zsh v01` (~1 min).
- kujakivi_pinnat.py (vanha: kujakivi_pinnat-v86.py.bak): SK = sokkelikuvan mittakaava (PT 08.2x: näkyvä kivijalka ~0,75 m → 0,625 = kerta 9,4 cm, ~8 kertaa kuten havainne);
  reunakiven päätypinnoille oma UV (kujan 01 ruskea juova pois).
- Parit (aja_v86_pari.zsh 02 05 01): 081218 (v4, REF 67afc1220), 081743 (SK + päädyt), 082215 (VS d425c5378: kivijalka vaalea lämmin harmaa, vaihtelu puoleen).
  Lähikuvat kunkin kansion kk-lahikuva-kivijalka/-lattia.png + 02/kk-v3-v4-, kk-v4a-v4b-, kk-v4b-v4d-havainne.png.
- AVOIN: d425c5378 toi lattiaan ja reunakiven kylkeen vaaleat vaakaviirut (081743:ssa ei) → VS:lle 08.3x, odottaa korjattua REF:iä. Sitten
  `REF=<VS> zsh K/tyokalut/aja_v86_pari.zsh 02 05 01` → lähikuvat → PT → KK (kokonaispari ennen omistajaa). Lattia yhä tummempi ja ruskeampi kuin havainne,
  laatat isommat/litteämmät; 01:n reunakiven päädyt hieman kellertävät.
- J4: odottaa Codexin J4-v3:a (LISÄYS 30; KK:n mukaan tulossa c5108dc70).
- Ei taustaajoja käynnissä.

## LISÄYS 32 klo 09.2x (28.10.): kujakivet v4d pelissä, KK:n "pidä nämä"; odotetaan Codexin v5:tä
- KK 09.2x (pari 091657, VS REF 003221b36): laattakoko (~1,5 × hartiat, 5–6 poikki), sävy kivittäin, kivijalka ~8 kertaa ja ohuet saumat OK → pidä.
  Seuraava: Codexin v5 (tilaus claude/postilaatikko 5658e3dfb: lattialaatat-v02 vaakalaatat 2:1 + marmorijuonne, sokkeli-v02 pitkät eripituiset kivet,
  saumojen paikat JSON:na VS:lle) → koko pari 02/05/01 + 2× → KK → omistaja ennen junaa. Uusille kuville uusi nimi (-v02-), VS lisää jaon varjostimeen.
- Työkalut (K = …/kielletty-rakennukset/tyokalut): kujakivi_tasaa.py (kivittäinen sävy SATU, ohut sauma SAUMA_PX/SAUMA_SAVY/REUNUS, reunat jatkuvat
  toiston yli, TUMMA=0 koska VS tummentaa reunan) ja kujakivi_pinnat.py (SK, LK/LKU/LKV). Toisto keskeytyksestä:
  `SATU=0.05 SAUMA_PX=1.5 TUMMA=0 python3 K/kujakivi_tasaa.py K/../kujakivi-pinnat-v4 K/../kujakivi-pinnat-v4d`
  `SK=0.82 LKU=1.25 LKV=1.0 PINNAT=K/../kujakivi-pinnat-v4d VV_SOKKELI=v01 VV_PILARI=v01 VV_LATTIA=v01 zsh K/aja_ketju_v86.zsh v01`
  `REF=003221b36 zsh K/aja_v86_pari.zsh 02 05 01` (lähikuvat: samat rajaukset kuin 082215; v5:llä venytys pois → LKU = LKV).
- J4: odottaa yhä Codexin J4-v3:a (LISÄYS 30). Ei taustaajoja käynnissä.

## LISÄYS 33 klo 13.0x (28.10.): palatsipinnat vaiheet 1–2 (katot, friisit) pelissä; LUOVUTUS (konteksti 30 %)
- PT 12.3x: Codexin palatsipinnat-v1 (postilaatikko 57e58354f, SHA 122/122) → K/palatsipinnat-v1. Järjestys katot → friisit → seinä (omistaja 21.54).
- Työkalut (T = K/tyokalut): palatsi_pinnat.py (VAIHEET=katto,friisi[,rappaus]; materiaalit V4_palatsi_katto/-friisi/-kultalista, metrinen UV0, UV1 säilyy),
  palatsi_varjostus.py (normaalikartan varjostus albedoon: Codexin kattoalbedo on tasainen, tiilet vain normaalissa → kattotiili-v01b/-v01c),
  aja_ketju_v87.zsh (yksikerros-v86 → v87, muurikate pari-v87, avoimet-v59k, hallit rakennukset-v87p) ja aja_v87_pari.zsh (juuri-v94m).
  Jatko keskeytyksestä: `VAIHEET=katto,friisi VV_FRIISI=v02 KATTO_M=1.6 VV_KATTO=v01c zsh T/aja_ketju_v87.zsh` →
  `REF=003221b36 zsh T/aja_v87_pari.zsh 02 05 01` (~4 min). Viimeisin pari lokit/havainne-editori-20261028-125559 (KK:lla, 2× 01/05 kk-katto-friisi-2x.png).
- Mitat: katto 1 × 1 m kuva → KATTO_M 1,6 (tiilirivi ~0,4 m); friisi 4,13 × 1,03 → pelin palkkivyöt 0,45 m: v = kaista koko korkeudelta, u kuvasuhteen mukaan
  (toisto 1,80 m), hallien > 1,2 m sulautuneet kaistat ennallaan (FRIISI_MAX); kultalista vain ≤ 0,10 m nauhat.
- VS 12.5x: V4_palatsi_* piirtyy tavallisella reitillä (albedo + normaali); metallicRoughness-kuvaa EI lueta (kultalista matta), alalika-maskia ei lueta → leivo
  albedoon. Sävy (sitruuna vs. havainteen oranssinkulta) VS:llä.
- KK 12.5x katot: 1) rivit näkyviin (tehty v01c), 2) sävy VS, 3) 01:n oikean katon siniset/turkoosit ruudut + punavihreä vinoraita: EI palkkivyö (friisi ei
  muuttanut) → todennäköisesti C1-räystäsosa (kielletty-c1-v3 → c1-v4) tai hallin V4_teal; SELVITÄ. 4) Räystäs: pyöreät päätetiilet ja harjan koristeet,
  mittarin räystäslinja 0,33 vs. havainne 0,18 → geometriaerä (olemassa olevat mallit tai PK tilaa Codexilta), ennen friisien lukitsemista.
- SEURAAVA: KK:n vastaus pariin 125559 → (3)+(4) → vaihe 3 rappaus (V4_red, rappaus-vNN 4 × 4 m, alalika leivottuna albedoon 1,20–1,70 m).
- Kujakivet: odottaa Codexin v5:tä (LISÄYS 32). J4: odottaa J4-v3:a. Ei taustaajoja käynnissä.

## LISÄYS 34 klo 13.1x (28.10.): KK:n palaute pariin 125559 (katot + friisit), seuraavan erän järjestys
- Ei vielä omistajalle. Tiilirivit erottuvat viiruina, eivät pyöreinä kourutiilinä. Friisivyö liian korkea ja kirkas, koska räystään ulkonema ja varjo puuttuvat
  (havainteessa kapea, tummempi sinivihreä, räystään varjossa).
- JÄRJESTYS: 1) räystäs + pyöreät päätetiilet + 01:n siniset ruudut (geometriaerä PK:n kanssa), 2) VS:n sävy, 3) friisivyön korkeus ja kirkkaus uudelleen
  räystään alla → pari 01/02/05 + 2× KK:lle. Rappaus vasta tämän jälkeen.

## LISÄYS 35 klo 13.07 (28.10.): VS:n palatsikattojen sävy valmis (järjestyksen kohta 2)
- REF ac8b06780 (seinat-211, natiivi-backup); METAL 395/0 ja PIPELINE 392/0 ajettu 41c4e55b3:lle, ac8b06780 muuttaa vain C#-dataa.
- V4_palatsi_katto: oma kerroin _PalatsiKatto 0,53/0,40/1,0. VS:n pari 130055 (juuri-v94m): sävy 34–36° (havainne 31–32°, ennen 40–42°), 01:n kirkkaus = havainne.
- Jäljellä valo-/varjopuolen ero (R-suhde peli 1,56, havainne 2,23). Valo tauolla: jos KK haluaa varjopuolet oranssinruskeammiksi, LR syventää kourujen varjoa
  albedossa; kokeilu QA:lla `valo savy palatsikatto r g b`.
- Seuraavat parit (kohta 3, friisi räystään alla) aina REF ac8b06780:llä. Kohta 1 (räystäs + päätetiilet + 01:n siniset ruudut, PK) yhä auki.

## LISÄYS 36 klo 13.54 (28.10.): 01:n siniset ruudut korjattu, päätetiilet avoimiin huoneisiin (järjestyksen kohta 1, osa)
- SELVITYS (värikokeet havainne-editori-20261028-131949 ja -134157): sini-violetit ruudut = avointen huoneiden (juhlasali, puutarha, tyohuone, varasto)
  räystäsvyö "Katto raystas" (0,925 m palat, tasainen sinivihreä → pelin räystästunnistus sävytti paloittain); yläpuolinen 1069-nauha V4_paattotiili.
  Hallien V4_teal/V4_palkkivyo/V4_konsoli EIVÄT ole lähde. Normaalien käännös ei auttanut.
- KORJAUS: K/tyokalut/paatetiilet.py (avoimet): 1069-nauha tummaksi varjoksi, 3D-päätetiilet (kiekko R 0,085, väli 0,25, ulkonema 0,04, materiaali
  V4_palatsi_katto-kopio → VS:n _PalatsiKatto-sävy), räystäsvyö → V4_palkkivyo → palatsi_pinnat friisi v02, alapinnan ruoteet × 0,45.
  avoimet-v60k, juuri-v95m. Jatko keskeytyksestä: `zsh K/tyokalut/aja_v95_pari.zsh [01 05 02]` (~4 min, REF oletus ac8b06780).
- PARI lokit/havainne-editori-20261028-135114 (01/05/02) + 01/kk-raystas-ennen-jalkeen-2x.png → KK.
- AUKI: taustapalojen (lähimmät kujakatot) päätetiilet (leivottuja: uusi primitiivi ilman UV1:tä omaan ryhmäänsä, pohjaväri 0,999 – tarkista),
  räystään ulkonema ja friisivyön korkeus/kirkkaus (kohta 3). PK: harjakoristeet ovat jo 3D (koristeet.json), päätetiilistä ei Codex-tilausta.

## LISÄYS 37 klo 15.5x (28.10.): Codexin kujakivet v5 pelissä, pari KK:lla
- PT 15.4x: Codexin v5 (claude/postilaatikko posti/juoksupeli-kujakivet-20261028/stone-surfaces-v5, SHA 39/39) → K/kujakivi-pinnat-v5. Kuittaus Codexille b4603a3e8.
- K/tyokalut/kujakivi_vaihda.py: vaihtaa valmiiden glb:iden V4_kujakivi_*-kuvat v02:ksi (reunakivi v01 ennallaan) ja kertoo lattian UV0.u:n 1,25:llä (LKU 1,25 → 1,0, ei venytystä).
  v5:n kivijalassa sama 8 kerran jako kuin v4d:ssä → SK 0,82 ennallaan. Ketju + pari: `zsh K/tyokalut/aja_v97_pari.zsh [02 05 01]` (~4 min; yksikerros-v87 → v89,
  avoimet-v60k → v61k, muurikate pari-v87 → pari-v89, juuri-v97m = v95m + nämä; REF oletus ac8b06780).
- Pari havainne-editori-20261028-154243 (+ lähikuvat 091657:n rajauksilla) → KK. Sonnet: lattia vaaka-asennossa ja venymätön (parannus), mutta 05/01 laatat kapeat ja
  saumojen vieressä vaalea kaksoisviiva (VS:n v4-saumajako → VS:lle SEAMS.json 15.5x); kivijalassa 05/01 9–10 kerrosta, kivet ohuet.
- SEURAAVA: KK:n vastaus (ehdotettu: kerrokset Codexin mittaan SK 1,0 + VS:n saumat) → uusi pari. Sitten kohta 3 (räystään ulkonema + friisivyö).

## LISÄYS 38 klo 16.1x (28.10.): KK hyväksyi kujakivet (kohdat 1–3), poikkiviiva korjattu, reunakivi työn alla
- KK 16.0x: kivijalka Codexin 0,15 m:iin (SK 1,0) ja lattiarivit syvemmiksi → kujakivi_vaihda.py SKALA-kertoimet (aja_v98/v99_pari.zsh). v99 (lattia v ÷ 1,8,
  VS REF 65b736b1b = OpenGL-normaali) pari 160220 → KK 16.2x: kohdat 1–3 HYVÄKSYTTY, näytetään omistajalle keskeneräisenä. 2× lähikuvassa juonne ei veny → ei Codex-tilausta.
- Poikkiviiva (VS): kujan lattia on erillisiä poikkikaistoja, liitoksissa raot (raot.py) → K/tyokalut/lattia_alusta.py (tumma alusta lattian alle, toistettava).
  aja_v100_pari.zsh (juuri-v100m = v99m + alusta); testi 05: havainne-editori-20261028-160928, viiva poissa.
- KK 16.2x seuraavat: a) REUNAKIVI vaalea, korotettu, pitkäkivinen (LR muoto; tumma etupinta = valo → VS, albedo vaalea); b) kivijalan pystyjuovat (VS);
  c) lattia lämmin kerma (VS). VS:lle viestit 16.2x ja 16.3x.
- KÄYNNISSÄ (16.13): `zsh K/tyokalut/aja_v101_pari.zsh` (~40 min; jatko keskeytyksestä: aja uudelleen): aja_ketju_v85r.zsh (= v85, REUNA_H 0,25, URA_L 0,012,
  URA_VIISTE 1) → yksikerros-v85r → v5-pinnat suoraan (SK 1, LKU 1, LKV 1,8) + palatsipinnat (katto+friisi) + alusta → yksikerros-v93, juuri-v101m, pari REF 65b736b1b.
  Sitten lähikuvat (lahi.py 091657:n rajauksin) + 05:n reunakivirajaus → KK.
- 16.5x: KK 16.3x tarkennus (kampa = liian tiheät saumat) → REUNA_JAKSO 0,7 → 1,4, HAJ 0,4, urat ohuina ennallaan (URA_L 0,006, URA_VIISTE 0), REUNA_H 0,25;
  kujakivi_pinnat.py raja(k) nyt REUNA_JAKSO/REUNA_HAJ-muuttujista (varmuuskopio .ennen-jakso). v101 valmis 16.46 (ei virheitä). VS REF 8885a9f54 (kivijalka sävy kivittäin,
  lattia lämpimämpi, reunakiven etupinta vaalea, ReunusRaja 1,4/0,4). Pari havainne-editori-20261028-164951 + lähikuvat + 05/kk-reunakivi-ennen-jalkeen-2x.png → KK 16.5x.
  Lähikuvatyökalu nyt K/tyokalut/lahi.py (python3 lahi.py <vanha-pari 091657> <uusi-pari>). SEURAAVA: KK:n vastaus, sitten kohta 3 (räystäs + friisivyö).

## LISÄYS 39 klo 17.1x (28.10.): Codexin J4-v3 pelissä, pari KK:lla
- PT 16.5x: Codexin J4-v3 (posti 20447bcf2; T7 review-v3-j4, SHA 19/19, GLB 350cfb6b…) → olavinlinna-j4/v3/. Kuittaus Codexille 189539926.
- Kokoaminen sellaisenaan (ei j4_hopea.py:tä): j4_arkkuun.py (0,97) → j4_siivous.py → astc-mip.swift vari/normaali 4 → kavely-j4/ (vanhat talteen kavely-ennen-v3/).
  Ajo: cd wt/proto-lavastaja-havainne; PROTO_LINJA=2 zsh tyokalut/esikatselu.sh 2855d8478 olavinlinna-j4/sk-komero-j4-lahi.txt ipad --batch (~7 min) → esikatselu-20261028-170508.
- Pari KK:lle: kk-pari-v2-v3-j4h-2x.png (+ j4h/j4g/j4i). Halo ja läikät pois, kannun suu syvä; lautasen kaiverrus himmeämpi, kiilto litteämpi. Odottaa KK:ta.
- 17.3x Codex kysyi MR-kartasta (PT välitti): peli lukee täyden kartan vain <glb>-orm-6x6.astcm:stä (SeikkailuEsineet.cs ~745, R AO / G karheus / B metalli),
  muuten keskiarvon. olavinlinna-j4/j4_orm.py (R = 255) + proto-3d/tyokalut/astc6.py → kavely-j4/esine-arkun-hopeasisalto-orm-6x6.astcm. Vastaus Codexille 0c521ec46.
  VIENNISSÄ: orm-6x6.astcm mukaan paketin manifestiin (AstcSaatavilla vaatii manifestin muualla kuin file://).
  Uusi pari esikatselu-20261028-180956 (kk-pari-v2-v3-*.png) → KK 18.1x (korvaa 170508:n). Ero pieni.
- 18.2x KK: J4-v3 EI VIELÄ (kohta 2: leimat/kaiverrukset ja kiilto, mittari Codexin 1021-kuva). Pelin puolen koe (j4_normaali.py VOIMA=2 SUMENNUS=0,
  j4_orm.py KG=0.6; esikatselu-20261028-184846) → läikät ja kohina, kaiverrus ei lukeudu → kavely-j4 palautettu v3-karttoihin (v3/*.astcm).
  Codex-tilaus J4-v4 postissa 991b58c76 (cavity albedoon, kiiltävät harjat, selkeämpi relief). Kun tulee: sama ketju kuin v3 (j4_arkkuun → j4_siivous →
  astc-mip vari/normaali + j4_orm + astc6) → kavely-j4 → esikatselu → pari v3 | v4 | 1021-kuva → KK.

## LISÄYS 40 klo 18.58 (28.10.): OMISTAJA hyväksyi kivet; SEURAAVA = katot alas ja kiinni (LUOVUTUS, aloita tästä)
- KK välitti OMISTAJAN PÄÄTÖKSEN klo 18.57 (pari 164951), sanatarkasti: "Kivet Ok mutta katot näyttävät olevan irti ja liian korkealla".
  → kujakivet v5 (reunakivi, kivijalka, lattia) HYVÄKSYTTY sellaisenaan: mallit juuri-v101m (yksikerros-v93, avoimet-v64k, muurikate pari-v92), VS REF 8885a9f54.
- TEHTÄVÄ NYT (KK): kujien 01/02/05 katot alas ja kiinni: räystäs lepää suoraan friisin ja seinän päällä kuten havainteessa (nyt friisin ja katon välissä rako,
  katto korkealla; ks. 164951/01/vierekkain.png). Vasta sitten valo (VS aurinko + LR:n leivonta). Pari havainne | peli (01, 02, 05) → KK.
- Alkuhavainto (18.5x, ei vielä varmistettu): 01:n oikealla lähin rakennus = avoimet juhlasali (peli peilaa x:n). juhlasali.glb (avoimet-v64k): katto_raystas
  (= friisi V4_palkkivyo/V4_palatsi_friisi) y 2,98–3,52, päätetiilet 3,08–3,62, katto (Katto lasitiili / V4_palatsi_katto / alapinta) y 3,11–7,51, harjakoristeet
  3,70–8,86. Pelikuvassa friisinauhan yllä näkyy keltainen kalteva pinta, sitten punaista seinää ja vasta ylempänä iso katto teal-nauhoineen → selvitä x/z-paikoista,
  onko iso katto juhlasalin oma (sisempänä/korkeammalla kuin friisi) vai takana olevan hallin (rakennukset-v54 / taustapalat). Mittaustyökalu:
  K/tyokalut/yrange.py <glb> [ymin] (y-välit solmu+materiaali); seuraava askel: sama x/z-bboxeilla ja katon alareunan etäisyys friisin ulkopinnasta.
- J4: Codex-tilaus J4-v4 991b58c76 odottaa toimitusta (ks. lisäys 39). Ei taustaajoja käynnissä.

## LISÄYS 41 klo 19.3x (28.10.): kujan 01 katot alas ja kiinni (avoimet-v65k), pari PT:lle → KK
- SYY (värikoodikoe havainne-editori-20261028-191657, K/tyokalut/varikoodi_koe.py): iso katto ON huoneen oma ja häivytys ei vaikuta
  (koe katto_nimi_koe.py, 190902: sama kuva). "Irti"-vaikutelma = kannatinnauha (V4_kannatin y 2,74–3,29, 0,55 m punainen nauha seinän
  friisin 2,24–2,80 ja katon välissä) + muurin harjakate (2,87–3,16) nostivat katon alapinnan seinälinjalla 3,31:een.
- KORJAUS K/tyokalut/avoimet_katto_alas.py: katto + katto_raystas + paatetiilet DY −0,45 (räystäs 3,13 → 2,68, alapinta seinälinjalla 2,86
  = seinän yläreuna), kannatinnauha ja katon alle jäävät *_harjakate pois (solmut jäävät ilman verkkoa, lapsi-indeksit ennallaan).
  avoimet-v64k → avoimet-v65k (juhlasali, työhuone, puutarha, varasto). juuri-v102m = v101m + avoimet-v65k.
  Ajo + pari: `zsh K/tyokalut/aja_v102_pari.zsh [01 02 05]` (~5 min, REF oletus 8885a9f54).
- PARI lokit/havainne-editori-20261028-192305 + 01/kk-katot-ennen-jalkeen-havainne.png (ennen | jälkeen | havainne): katot lepäävät friisin
  päällä, punainen rako poissa. Mittarin räystäs 0,19 vs havainne 0,33 = kameran korkeus (havainne ylempää, katot näkyvät päältä), ei malli.
- AUKI: 02 (kujamuurit: havainteessa muurin päällä katettu räystäs + friisi, pelissä ohut harjakate) ja 05 (taustapalan räystäs oikealla 0,62
  vs 0,17) eivät muuttuneet tässä erässä; KK:n vastaus ensin. Sitten valo (VS aurinko + LR:n leivonta). J4-v4 odottaa Codexia.


## LISÄYS 42 klo 20.0x (28.10.): KK 19.48 -vastaus: 01 ohut nauha, 02/05 kujamuurien kate + friisi, havainnekamera; J4-v4 vastaanotettu
- 01 K/tyokalut/avoimet_nauha.py (avoimet-v65k → v66k): julkisivun friisi puristettu ohueksi nauhaksi 2,20–2,38, pilarien palkinpäät
  (V4_konsoli) pois, seinät ja talopilarit leikattu 2,38:aan, katto −0,47 (yhteensä −0,92: räystäs 2,21, alapinta seinälinjalla 2,39).
  Katkeava friisi = end_door0- ja side_door-1-julkisivut olivat seinän SISÄpinnalla (kaikissa 4 huoneessa) → peilattu ulos omana verkkonaan.
- 02/05 K/tyokalut/kuja_kate.py: kujan (x ≈ −246, z 292–396) 4,5 m:n muureille muurikatteen profiili (friisi 4,05–4,50 suoraan harjan alle,
  V4_gold-räystäs 0,45 m kujan yllä, harjapalkki); seinät luodattu taustasta 0,5 m:n välein, 7 jaksoa → muurikate pari-v93. Korkeus ennallaan.
- Ketju: `zsh K/tyokalut/aja_v103_pari.zsh` (juuri-v103m = v102m + avoimet-v66k + muurikate pari-v93).
- HAVAINNEKAMERA: editori-lr.sh hyväksyy nyt TESTIKAMERA_<kohta>="K T A F" (pelin QA-testikamera). Havainteen kamera arvioitu kuvasta
  (keisarin pää/jalat + katoamispiste): 4 m, 6,5 m taakse, 16° alas, 45°. Arvio, ei mitattu; havaintokuva näyttää matalammalta → tarkennettava.
- PARIT: pelikamera lokit/havainne-editori-20261028-195528, havainteen kamera …-195925; kummassakin <kohta>/kk-oikea-ylakulma-2x.png.
- HAVAINTO: korkealta 01:n räystäät (ulkonema 1,67 m, nyt 2,2 m:ssä) peittävät seinät enemmän kuin havainteessa → ehdotus KK:lle:
  ulkonema ~0,8 m:iin. 05:n portin sivumuurien friisi + räystäs ovat portin mallissa (rakennukset), eivät muuttuneet.
- J4-v4 #1228 vastaanotettu: GLB SHA 13cb3cc3…41ff3e täsmää, posti SHA256SUMS 22/22 → olavinlinna-j4/v4/ (models + posti). Kuittaus Codexille
  b80de59a5. SEURAAVA: v3:n ketju (j4_arkkuun 0,97 → j4_siivous → astc-mip vari/normaali 4 + j4_orm R255 + astc6) → kavely-j4 → pari v3 | v4 | 1021 → KK.

## LISÄYS 43 klo 20.4x (28.10.): J4-v4 pelikuntoon, pari seis (linja 2 sumea), katot-42-haara tarpeeton
- J4-v4 ketju ajettu: j4_arkkuun (0,97) → j4_siivous → astc-mip vari/normaali 4 → j4_orm + astc6 → olavinlinna-j4/v4/peli/ (glb 3732820f…, sha1).
  kavely-j4 palautettu v3:een (tunnettu tila, = v3/*); v4 kopioidaan kavely-j4:ään ennen paria.
- PARI SEIS: esikatselulinja 2 (2855d8478, ipad --batch) kuvaa koko ruudun sumeana myös v3:lla (seinän terävyys 2,22 → 1,25; 184846 ok, 202114/202821/203710
  sumeat). PT: VS käytti linjaa 2 19.22–19.55 → pysyvä ajonaikainen asetus, VS korjaa ja ilmoittaa. EI ajeta linjaa 2 ennen sitä.
  Sitten: v4 kavely-j4:ään, sk-komero-j4-lahi.txt, pari olavinlinna-j4/j4_pari.py (vaihda V4-kansio): j4h täysi 600×540 rajaus (1240,696) v3 (180956) | v4 | 1021 → PT → KK.
  j4i (kannu) kelvoton (alkuvalikko peittää) → pois parista.
- lavastaja/katot-42: ei mainista puuttuvaa (vain luovutuksen vanhempi versio ilman lisäystä 41) → ei tarvita.
- Katto-parit 195528/195925 odottavat edelleen KK:ta.

## LISÄYS 44 klo 21.1x (28.10.): linja 2 korjattu (pistekerroin 1), J4-v4-pari → KK hylkäsi kohdat 1–3 → J4-v5 Codexille; katto-parit uusittu
- Sumeuden syy (VS/PT): Macista irtosi näyttö 19.07 → editorin pistekerroin 2 → 3D puolella resoluutiolla. NUI:n korjaus b48ecd7f8 poimittu:
  proto-haarat lavastaja/kerroin-2855d8478 (e367204e2, J4) ja lavastaja/kerroin-8885a9f54 (46c0add3c, katot); työpuu wt/proto-lavastaja-kerroin.
  editori-lr.sh: T=${HAVAINNE_PUU:-wt/proto-lavastaja-kerroin}; aja_v103_pari.zsh REF oletus 46c0add3c. Kuvan unity.log: "pistekerroin 1".
- J4-v4-pari esikatselu-20261028-205424 (kavely-j4 = v4). KK 21.0x: kannu OK; 1) kolikot vaaleat/litteät, 2) välit vaaleat (arkun pohja näkyy),
  3) kulhon kaarinauha ei näy. → Codex-tilaus J4-v5 posti 221f04d6d (AO R-kanavaan, leima + reunarengas jokaiselle kolikolle, välit kiinni / tumma
  alusta, kulhon nauha). Kun tulee: sama ketju (v4/peli-malli) → pari v4 | v5 | 1021 → PT → KK. Ei omistajalle ennen KK:n OK:ta.
- Katto-parit terävinä: pelikamera havainne-editori-20261028-210105, havainteen kamera …-210656 → PT → KK (korvaavat 195528/195925). Odottaa KK:ta.

## LISÄYS 45 klo 21.2x (28.10.): KK 21.2x: 01 seinät havainteen korkeuteen + kapea räystäs, 02 tiiliräystäs + hillitty nauha → juuri-v104m
- 01 K/tyokalut/avoimet_korkea.py (avoimet-v66k → v67k): seinien, julkisivujen, puupaneelien, pilarien ja palkistojen juurisolmut y × SK 1,48
  (ovi 1,83 → 2,71 ≈ 2 × keisari 1,35; ikkunat 1,61–2,95; seinä 3,52; nauha 3,26–3,52); lattiat/kalusteet ennallaan. Katto: alapinta seinälinjalla
  = seinän yläreuna, lape × LOIVA 0,75, ulkonema 1,75 → ULK 0,8 (vyöhykkeen puristus + nosto kaltevuudella), harjakoristeet samalla kuvauksella.
- 02 kuja_kate.py ympäristömuuttujat NAUHA_MAT/LAPE_MAT/NOUSU/OTSA (oletukset = v93): v94 = VYO 0,30 V4_palkkivyo, RAYS 0,75, V4_palatsi_katto
  -lape (u 0,625/m, v 0,6/m), NOUSU 0,55, OTSA 0,14 → muurikate pari-v94. Auki: vasemman lähimmät isot kirkkaat friisipalat = pilarien hatut taustassa.
- 05: ovet ovat 3D-lehtiä (ovi_V/ovi_O), peli avaa 90° (PorttiOviKulma); havainteessa ~65° → Pelikoodarin koodi, PT:lle ehdotettu.
- Ketju `zsh K/tyokalut/aja_v104_pari.zsh` (REF 46c0add3c, ~3 min/ajo); havainteen kamera TESTIKAMERA_0x="4 6.5 16 45".
  Parit: pelikamera havainne-editori-20261028-211708, havainteen kamera …-211930 → PT → KK. Omistajalle vasta, kun 01 näyttää havainteelta.

## LISÄYS 46 klo 21.5x (28.10.): 01 v105 (tiilirivit + koristevyö), 02/05 friisi kesken, porttiovi-pari uusittu tausta-v62:lla — LUOVUTUS, ALOITA TÄSTÄ
- KK 21.4x: v104m 01 iso parannus, ovi 2,71 OK. Pyynnöt: 1) katon tiilirivit ja päätetiilet näkyviin, 2) räystään alle koristevyö kannakkeineen,
  sitten 02/05 keltatiilinen räystäs + hillitty nauha. PT 21.5x: porttipari riittää; parit KK:lle (juoksupeli = KK johtaa).
- 01 TEHTY (aja_v105_pari.zsh, juuri-v105m): avoimet_nauha.py v65k:sta NAUHA_YLA 2,55 DY −0,31 KONSOLI=1 (uusi env: palkinpäät jäävät)
  → avoimet_korkea.py YLA=2,55 (uusi env; myös katon normaalit loivennuksen mukaan) → avoimet_katto_uv.py (UUSI: V4_palatsi_katto-lappeet
  1 UV = 1 m Codexin palatsipinnat-v1 KAYTTO:n mukaan, u räystään suunta, v alamäkeen; oli 0,38/m) → avoimet-v68k. Vyö 3,26–3,77, kannakkeet
  3,03–3,25, ovi 2,71. Parit: pelikamera havainne-editori-20261028-212548, havainteen kamera …-212741 (PT:lle 21.4x). Tiilirivit näkyvät.
  AUKI 01: vyö kirkkaampi kuin havainteen tumma sinivihreä, kannakkeet ruskeat (V4_konsoli) eikä sinivihreät kuten havainteessa.
- 02/05 KESKEN: kuja_friisi_hillitty.py (UUSI) siirsi taustan kk-tausta-0-3-lod0:n kujan friisikolmiot (8 kpl) V4_palkkivyöhön → yksikerros-v94
  (APFS-klooni v93:sta), juuri-v105m:n kielletty-tausta-v57 → v94. Parit 212952 / 213940: vasemman lähimmät isot kirkkaat friisipalat EIVÄT
  muuttuneet → lähde muualla (tutki: rakennukset-v48 porttirakennelmat / muurikate / solmut joilla rotation/scale — friisihaku-skripti ohitti ne).
- PORTTIOVET 65° (PT 21.3x, PK 21a8962da): ensimmäinen pari 213543/213715 oli virheellinen: junan 213 koodi lukee kielletty-tausta-v62:ta, jota
  koejuuressa ei ollut → kuja 05 aukealla. Korjattu: juuri-v104m ja -v105m: kielletty-tausta-v62 → _valmiit/juoksupeli-kk-tausta-peking-v62-
  vienti-20261027/juoksupeli/maailma-v4/kielletty-tausta-v62. Uusinta ajossa (REF 907f7b752 = 213 + pistekerroin, 2f58aa5bc = porttiovi-65 +
  pistekerroin; kohta 05 molemmat kamerat) → kk-ovet-90-vs-65.png KK:lle. HUOM: VS-runko 46c0add3c:ssa ei ole porttiovia lainkaan.
- J4-v5: Codex aloitti (posti 6fd2e5bfd, 21.08, arvio 30–60 min). Kun toimitus tulee: v4/peli-ketju (j4_arkkuun → j4_siivous → astc-mip 4 →
  j4_orm (HUOM: v5:ssä R = AO, j4_orm.py asettaa R = 255 → muuta säilyttämään R) + astc6) → kavely-j4 → j4_pari.py (v4 205424 | v5 | 1021) → KK.
- Proto-haarat (wt/proto-lavastaja-havainne): lavastaja/kerroin-2855d8478, -8885a9f54, -60a42b4f0 (907f7b752), -porttiovi65 (2f58aa5bc).

## LISÄYS 47 klo 22.0x (28.10.): KK 21.5x v105-vastaus (01 katto + tiilirivit OK) → SEURAAVAT TEHTÄVÄT kujaan 01 tässä järjestyksessä
1) koristevyö havainteen sävyyn: tummempi, himmeämpi sinivihreä, kuviointi pienemmäksi kultaisiksi koukeroiksi (nyt kirkas turkoosi, isot
   sinikeltaiset kukat vievät katseen seinältä); 2) kannakkeet (V4_konsoli) sinivihreä-kultaisiksi kuten havainteessa (nyt ruskeat palikat);
3) räystään päätetiilet isommiksi pyöreiksi kiekoiksi tippatiilineen (havainteen lähiräystäs; nyt pienet litteät kaaret);
4) muodon loput ennen valoa: kiviportaat ovien eteen ja ristikko ikkunoihin.
→ pari KK:lle kun 1–3 valmiit (havainteen kamera + pelikamera, terävyys tarkistettu: unity.log "pistekerroin 1"). Ovet 65° hyväksytty seuraavaan
  junaan (PK 21a8962da), ei toimia. Porttiparin uusinta: havainne-editori-20261028-215135/215403 (oikea kuja, tausta-v62 linkitetty).
- J4-v5 (Codex 6c2cc9edd, GLB SHA 58547e56…ba69 täsmää, posti 20/22 + GLB ja CLAUDE-TOIMITUS.md eivät postissa) → olavinlinna-j4/v5/{models,posti,peli};
  j4_orm.py AO=1 säilyttää R:n (R ka 160,6); kavely-j4 = v5. Esikatselu ajossa (scratchpad j4v5.log) → pari j4_pari.py:llä v4 205424 | v5 | 1021 → PT.

## LISÄYS 48 klo 22.3x (28.10.): kuja 01 v108 — KK:n 47/1–2 + 22.2x-korjaukset ja portaat, pari KK:lle (odottaa vastausta)
- Ketju tyokalut/aja_v108_pari.zsh (kielletty-rakennukset): avoimet-v68k → v71k = avoimet_raystas_havainne.py VAIHEET=1 (vyö: friisi-v01 × 0,8,
  UV × 2, wrapT repeat) → avoimet_raystas_v2.py (UUSI: lähin räystäsrivi putkitiilinä 'Katto lasitiili' -lipan yli, pystykiekko jokaisen
  kansitiilirivin päähän u ≡ 0,205 mod 0,25 Codexin kattokuvan mukaan, tippatiilet väleissä; kannakkeet 40/70/75 %, friisipinta + kultainen
  riippu) → avoimet_ovi_portaat.py (UUSI: alempi askelma + poskikivet ovien eteen, V4_kivireunus). Apuri avoimet_glb.py. juuri-v108m.
- Parit (pistekerroin 1): havainteen kamera havainne-editori-20261028-222711, pelikamera -222457 → KK 22.3x. Hylätyt: v106 (kiekot isot,
  lautasina; tasainen sinivihreä sävyttyi pelissä sini-violetiksi → teksturoitu friisi käyttöön), v107 (vain porrastesti).
- AUKI: ikkunaristikko (V4_ristikko on jo pelissä; kysytty KK:lta mitä muutetaan); valo vasta muodon jälkeen (omistaja 27.10. 10.56).

## LISÄYS 49 klo 22.4x (28.10.): kuja 01 v109 — KK 22.4x (vyö tummaksi, putket erottumaan, ikkunat ruudukoksi), pari KK:lle
- aja_v109_pari.zsh: avoimet-v72k = vyö FV 0,55 FS 3 → avoimet_raystas_v2.py (LIPPA 0,5, KULTA 0,6, putket RP 0,07 nostettu RP/2; tumma
  V4_paattotiili_varjo-nauha poistettu, se peitti putket) → portaat → avoimet_ikkunaristikko.py (UUSI: V4_ristikko-kuva → 6 × 8 rimat +
  sisäkehys V4_ikkunakehys). juuri-v109m. Parit 223834 (havainne) / 223629 (peli) KK:lle 22.4x.
- KK:n seuraava: 01:n muoto lukkoon → valo (VS aurinko + leivonta). Huom: ohut vaalea rako kiekkojen ja vyön välissä.

## LISÄYS 50 klo 22.5x (28.10.): kuja 01 MUOTO HYVÄKSYTTY (KK) alapinnan tummennuksen jälkeen; 02/05 aloitettu — LUOVUTUS, ALOITA TÄSTÄ
- KK 22.5x: v109 ok → viimeinen kohta räystään alapinta (vaalea rako kiekkojen ja vyön välissä) tummaksi; VALOA EI NYT (omistaja 27.10. 10.56:
  ensin kaikki rakennukset ja elementit havainteen mukaisiksi). Pari tasaisessa valossa (46c0add3c:ssä VS:n vertailuvalo oletuksena) KK:lle →
  omistajalle. aja_v110_pari.zsh (avoimet-v73k, juuri-v110m): avoimet_raystas_v2.py + tumma alalaatta lipan alle (V4_raystas_alapinta_varjo),
  ruoteet × 0,2 (v110 224407 / 225106: rako näkyy YHÄ vaaleina raitoina kiekkojen välissä → ei ruoteet). Koe: tumma taustalevy kiekkojen
  taakse (225904) peitti koko räystään (yt = lipan max y nousee nurkkien kaarteissa) → poistettu skriptistä. SEURAAVA: taustalevy riveittäin
  (yt = paikallinen reunan y + RP·(NOSTO+1)) tai selvitä raidan lähde (lipan reunapinta / putkien avoin alapuoli); aja aja_v110_pari.zsh ja
  TESTIKAMERA_01="4 6.5 16 45" → kun rako tumma, pari KK:lle (muoto hyväksytty, KK vie omistajalle). PARIA EI VIELÄ LÄHETETTY.
- 02/05 (KK: friisi → keltatiilinen räystäs + hillitty nauha; sitten porttikujan sivumuurit ja lattia): aja_v111_pari.zsh (UUSI muuri_raystas.py:
  kiekot + tippatiilet muurikatteen V4_palatsi_katto-lappeiden alareunoille, 740 kpl kujan alueella; vyökäsittely FV 0,55 FS 3 muurikatteeseen
  ja tausta 0-3/1-3 lod0:aan; muurikate muurikate-v19/pari-v111-v16-nimella, tausta yksikerros-v95, juuri-v111m = juuri-v110m + nämä).
  Pari 224621 EI KELPAA: pelikameran muurit paljon korkeammat kuin havainteessa → harja jää kuvan yläpuolelle; 05:n vasen yläkulma yhä kirkas
  nauha ilman kiekkoja (lähde ei muurikate? tutki skannerilla scratchpad friisihaku.py -mallilla: ikkuna x/z kujan 05 kohdalle, kaikki
  pelin lataamat paketit: muurikate-v16, rakennukset-v48, tausta-v57). Havainteen kamera kujille 02/05 puuttuu (TESTIKAMERA_02/_05).

## LISÄYS 51 klo 23.3x (28.10.): kuja 01 räystään rako KORJATTU (v110e), pari KK:lle; 02/05 havainteen kameralla ajossa
- Värikoe (UUSI tyokalut/varikoodi_raystas.py + aja_v110_koe.zsh, juuri-v110k; materiaalit emissiovärein, doubleSided ennallaan): 1) v110:n
  alalaatta oli koko lappeen kokoinen ('Katto lasitiili' ulottuu harjaan asti) ja päätysivujen laatta y 3,72 leikkasi pitkien sivujen räystäät
  (231251) → avoimet_raystas_v2.py: alalaatta RIVI-levyisinä paloina paikallisella reunalla (d ∈ [dmx − ALA 1,0, dmx − 0,02], y = yo − 0,04).
  2) vaalea rako = lippa ('Katto lasitiili') kiekkojen välissä (231836). Peli EI huomioi lipan baseColorFactoria (LIPPA 0,15 ei näkynyt 232122)
  → lipalle oma materiaali V4_raystas_lippa_varjo (0,09 0,05 0,02). Vanha skripti: avoimet_raystas_v2-v110.py.bak.
- aja_v110_pari.zsh (LIPPA 0,15 oletus, vaikutukseton): parit havainteen kamera havainne-editori-20261028-232618, pelikamera -233124 → KK 23.3x.
- 02/05: aja_v111_pari.zsh TESTIKAMERA_02/_05="4 6.5 16 45" ajossa (havainteen kamera puuttui). Auki yhä: pelikameran muurit korkeammat kuin
  havainteessa (harja kuvan yläpuolella), 05:n vasemman yläkulman kirkas nauha (lähde selvitettävä; värikoe varikoodi_raystas.py-mallilla).

## LISÄYS 52 klo 23.4x (28.10.): 02/05 pari havainteen kameralla KK:lle; pakettivärikoe → muurit tausta-v57:ssä, harjat muurikate-v16:ssa
- aja_v111_pari.zsh TESTIKAMERA_02/_05="4 6.5 16 45" → havainne-editori-20261028-233608 (harja kuvassa, kiekot näkyvät 02:n muurilla) → KK 23.4x.
- UUSI tyokalut/varikoodi_paketti.py + aja_v111_koe.zsh (juuri-v111k, koe-v111/): paketti kerrallaan tasavärillä. Tulos 234526: lattia + muurit =
  kielletty-tausta-v57 (yksikerros-v95), muurin harjat + pilasterit = kielletty-muurikate-v16, portit = kielletty-rakennukset-v48. Ladatut paketit
  unity.logista: ulkorengas-v5, tausta-v57, rakennukset-v48, lahipuut-v6, kulmatorni-v1b (+ muurikate).
- OPPI: peli KORVAA tunnetut materiaalinimet omillaan → baseColorFactor-muutokset tunnetuille nimille eivät näy (koe ilman nimenvaihtoa 234252
  ei muuttunut lainkaan). Sävymuutos = oma materiaalinimi (kuten V4_raystas_lippa_varjo). Tarkista tämä myös aiemmista FV/LIPPA/KULTA-säädöistä.
- Auki: pelikameralla (ilman TESTIKAMERAa) muurit yhä korkeammat kuin havainteessa; 02:n vasemmat pilasterihatut kirkkaat (muurikate-v16).

## LISÄYS 53 klo 06.3x (29.10.): KUJA 01 LUKITTU (omistaja 06.20, v112); 02/05 v115 parit KK:lla — LUOVUTUS, ALOITA TÄSTÄ
- Omistaja 06.09 v110e:hen "Liikaa vihreä" → aja_v112_pari.zsh (avoimet-v74k, juuri-v112m): UUSI avoimet_vyo_kapea.py (julkisivun vyöfriisi +
  palatsi_kultalista puristettu alaosaansa KAPEA_VYO 0,5, palkkivyö ja katto_raystas → oma materiaali V4_raystas_alus_puu). Parit 061008 (havainne)
  / 061212 (peli). OMISTAJA 06.20: "Kelpaa" → kuja 01 LUKITTU muodoltaan. Valo vasta, kun kaikki rakennukset hyväksytty.
- 02/05 (KK 06.1x: vihreä hillityksi, kivijalka korkeammaksi, portit): UUSI muuri_vyo_kapea.py (friisi ryhmittäin xz 1 cm → alaosaan × 0,5,
  palkkivyö + kultalistat → V4_raystas_alus_puu) muurikatteeseen, taustapaloihin 0-3/1-3 lod0 (pilarihatut ja keltaiset tolpat olivat taustassa,
  värikoe varikoodi_materiaali.py 061808) ja porttien p-kujaportti{,-2,-3}-lod{0,1}:een (rakennukset-v115 = v87p:n klooni). UUSI sokkeli_korkea.py
  (KUJA-alueella sokkelin yläreuna + seinän alareuna y 1,1–1,36 → +0,6 m; reunakivet säilyvät). Ketju aja_v115_pari.zsh → juuri-v115m.
  Parit: havainne-editori-20261029-062648 (havainne) / -062901 (peli) → KK 06.3x.
- PK 06.3x: rata ei sido muotoa (JuoksuPalatsiVerkko pohja.json:n avoimista tiloista). 02:n päähän porttirakennus käy (läpikulku auki); 05:n taakse
  kuja käy, kun KS muuttaa pohja.json:n → PK tarkistaa radan. Kysytty KK:lta, tehdäänkö. Auki: pelikameralla muurin harja kuvan yläpuolella.

## LISÄYS 54 klo 06.4x (29.10.): 02:n portti v116 KK:lla; 05:n jatko pk4:n mukaan KESKEN — LUOVUTUS, ALOITA TÄSTÄ
- KK 06.3x: v115 kivijalka + harja OK. 02:n pää: nykyinen porttirakennus p-kujaportti-2 muokataan havainteen mukaan (KK 06.4x, ei uutta rakennusta):
  UUSI portti_havainne.py (paloittain lineaarinen y: aukko 3,15 → 3,7, ovien yllä punainen nauha puristuu, friisi + katto −0,35; V4_teal → tumma puu)
  → aja_v116_pari.zsh (rakennukset-v116, juuri-v116m). Parit: havainne-editori-20261029-063350 (havainne) / -063606 (peli) → KK 06.4x.
- 05:n jatko (KK 06.3x/06.4x: pk4 pk2:n päälle, ~4,5 m, aukko kuja-29:lle; pk3:n 12 m EI, se perustui mittausvirheeseen): KS:n VALMIS
  proto-3d/_tyo/karttaseppa/kk-pohja-pk4/kk-pohja-v1d-pk4/pohja.json (+ SHA256SUMS, pohja_pk4.py). Muutokset: way/42509056 (kuja-40 länsimuuri)
  (−248,03; 290,37) → (−252,61; 403,38) → (−253,52; 425,15); entinen länsihaara omaksi muuriksi way/42509056-aukio (−252,61; 403,38) →
  (−268,56; 402,89) → (−333,11; 399,69) → (−329,01; 287,54); porttiaukko kuja-29:lle keski (−252,90; 410,20) leveys 4,0; paksuus 0,8, korkeus 4,0.
  PK vaihtaa JuoksuV4Maailma.PalatsiTiedosto → pk4 ja esto-leivonnan, ja tarkistaa radan.
- SEURAAVA (Lavastaja): uusi muurijakso (−252,61; 403,38) → (−253,52; 425,15) aukkoineen muurirungoksi (V4_red + V4_sokkeli kivijalka 1,8 m kuten
  sokkeli_korkea, paksuus 0,8, korkeus 4,0) taustaan yksikerros-v99/kk-tausta-?-3-lod0 (tarkista mihin palaan z 403–425 osuu) tai omaksi glb:ksi;
  aukion puu = kielletty-lahipuut-v6 (poista/siirrä se puu); sitten muurikate: kk_muurikate.py hakee muurit TAUSTASTA säteellä (osuma 3–6,5 m),
  joten runko ensin → uusi kate jaksolle (tai kopioi kujan 05 katejakso muuri_raystas + muuri_vyo_kapea -käsittelyineen). Parit 05 molemmilla
  kameroilla → KK, PK:lle tieto radan tarkistukseen.
- OPPI: pelikameran kuvat vaihtelevat ajoittain (hahmon kohta) → vertailu aina TESTIKAMERAlla; peli korvaa tunnetut materiaalinimet (lisäys 52).

## LISÄYS 55 klo 06.42 (29.10.): OMISTAJA 06.41 — KUJA 02 KAVENNETAAN HAVAINTEEN LEVYISEKSI — LUOVUTUS, ALOITA TÄSTÄ
- Omistajan kortti 06.41 (KK:n välitys, sanatarkasti): "Kavennetaanko kuja 02 havainnekuvan levyiseksi?" → "Kavennetaan (suositus)"
  (selite: "Korkeat muurit ympäröivät juoksijaa kuten havainnekuvassa."). Kuva havainne-editori-20261029-063350 / 02; mittari: kattojen väli
  yläreunassa peli 0,70 vs havainne 0,54 kuvan leveydestä → kavennus noin 0,54/0,70 ≈ 0,77 nykyisestä (tarkista TESTIKAMERAlla).
- Työnjako: KS kaventaa pohjan (pohja.json kujan 02 muurit sisään) → Lavastaja siirtää/rakentaa muurit (runko taustassa → kk_muurikate.py
  hakee katteen uudelleen, muuri_raystas + muuri_vyo_kapea + sokkeli_korkea uudelleen) ja sovittaa 02:n pään portin v116 (portti_havainne.py)
  kapeampaan aukkoon → PK tarkistaa radan ja esto-leivonnan. Parit 02 (havainne / peli, TESTIKAMERA) → KK.
- KUJA 05 PYSYY NYKYISELLÄ LEVEYDELLÄ (omistaja 06.41). 05:n jatko pk4:n mukaan (lisäys 54, SEURAAVA) on yhä kesken ja tehdään samassa
  erässä; molempiin sama KS-pohja, joten pyydä KS:ltä kujan 02 kavennus pk4:n päälle (yksi pohja.json, ei kahta rinnakkaista).
- Järjestys: 1) KS pohja (pk4 + 02 kapea) 2) Lavastaja 05:n uusi muurijakso + 02:n muurit 3) parit 02 ja 05 → KK 4) PK rata.

## LISÄYS 56 (29.10.): PK:n RATAEHTO KUJIEN 02 JA 05 LEVEYDELLE — sitoo lisäyksen 55 kavennusta
- PK 29.10. (viesti LR:lle ja KS:lle): vapaa leveys muurista muuriin ≥ 2,4 m, muuten rata katkeaa (JuoksuPalatsiVerkko ei näe kujaa).
  Kaksi kaistaa tulee yli 1,5 m leveälle osalle; suositus ≥ 3 m. Tarkista kuja 02:n kavennuksen (≈ 0,77 × nykyinen) jälkeen, että vapaa
  leveys pysyy ≥ 3 m (vähintään 2,4 m); jos havainteen leveys alittaa sen, kysy KK:lta ennen kuin kavennat rajan alle.
- Kun pohja (KS) ja muurit (LR) ovat valmiit, ilmoita PK:lle (Pelikoodari): PK tekee ratatarkistuksen ja parin KK:lle.

## LISÄYS 57 klo 07.00 (29.10.): KUJA 02:n KAVENNUS SEIS — MITTARIN SARAKKEET OLIVAT KÄÄNTEISET (JUMI PT:lle)
- H/vertailu-lr.sh (editori-lr.sh:n vertailu) antoi mittarille peli.png:n ensin → mittari.txt:n "havainne"-sarake = peli. Kortin 06.41
  "0,70 vs havainne 0,54" oli väärin päin: havainne 0,70, peli 0,54 → pelin kattojen väli on jo KAPEAMPI. Korjattu (havainne ensin, 07.00).
  Aiempien parien mittari.txt:t (editori-lr-ajot) ovat samaa käänteistä järjestystä: lue ne sarakkeet vaihdettuina.
- Malli ≠ pohja (mittaa.py, V4_red-kasvot, yksikerros-v99): 02 z 316–340 vapaa 6,7–6,9 m (25.10. levennys, itämuuri pohjasta +2,30 m),
  pohja pk4 4,4–4,6, KS:n pk5 3,4–3,6; 05 z 384–400 malli 8,9–9,1 m (länsimuuri x −255,2…−255,9), pohja 5,1–5,3.
  PT 06.5x: yksi totuus = malli; KS piirtää pohjan LR:n muurilinjoista (myös 05:n jatko mallin kulmasta x ≈ −256); pk4/pk5 vedetty pois.
- Koe: UUSI K/tyokalut/kuja02_kavennus.py (kuja40_levennys.py:n pohjalta, SIIRTO env, --muurit linjat KS:lle) + aja_v117_pari.zsh
  → yksikerros-v100, muurikate pari-v117, juuri-v117m. SIIRTO −1,5: vapaa 5,2–5,4 m, mutta peli 0,54 → 0,47 (testikamera
  TESTIKAMERA_02="4 6.5 16 45": parit havainne-editori-20261029-065520 ennen / -065711 jälkeen). EI viedä eteenpäin.
- SEURAAVA: odota omistajan uutta päätöstä (PT → KK kortti oikeilla luvuilla). Jos leveys pidetään: muurilinjat nykyisestä mallista
  (kuja02_kavennus.py SIIRTO=0 --muurit, tai mittaa.py) KS:lle → pohja → PK rata (≥ 2,4 m, suositus ≥ 3) → parit KK:lle; sitten 05:n jatko.
  Mittausskripti: K/tyokalut/kuja40_mittaa.py <tausta-kansio> <pohja.json> [<pohja2.json>] (python3 ilman -I: numpy).

## LISÄYS 58 klo 07.15 (29.10.): MITTARIN SARAKEVAHTI, KUJA 02 = KAMERAERO, KUJA 05:n JATKO MALLISSA (v118m) — LUOVUTUS, ALOITA TÄSTÄ
- H/vertailu-lr.sh: mittari havainne ensin + SARAKEVAHTI (mittaa havainnekuvan itseään vastaan; väärä järjestys → "SARAKEVAHTI VIRHE",
  exit 3; testattu 0,70 = 0,70 / 0,47 ≠ 0,70). proto-3d/_tyo ei ole git-repo → ei SHA:ta.
- Kuja 02 (PT 07.1x: leveys ennallaan -suositus KK:n korttiin): hahmon kohdalta reunakivestä reunakiveen hahmon korkeuksina havainne 4,5 |
  peli ≥ 4,3 → sama leveys. Kattojen väli riippuu kamerasta: testikamera 16° → 0,54, havainteen pakopisteeseen sovitettu (3,3 m, 6,88 m,
  10°, 45°) → 0,84; havainne 0,70. editori-lr.sh: TESTIKAMERA 02 = "3.3 6.88 10 45" oletuksena, 02:n paikka kujan keskelle x −245,44
  (oli −246,4, keisari 1 m keskeltä länteen). Pari -070615/02. Muurin korkeutta/räystäitä EI muutettu (ei mittaria, joka sitä vaatisi).
- Kuja 05 (KK:n 0,60 vs 0,36): ero tulee porttirakennuksen katosta pelikuvan yläreunassa; leveys hahmon kohdalla lähes sama.
- Kuja 05:n JATKO: UUSI K/tyokalut/muuri_jatko05.py (v1 mallin linjassa = .v1, hylätty: havainteessa portin takana portin levyinen kuja;
  pk4-linja olisi peittänyt portin aukkoa 0,8 m). Portti p-kujaportti (−251,33; 400,03), aukko 3,4 m x −253,0…−249,6. Jatko z 403,4–424,3,
  LEVEYS 4,5 (vapaa 4,5–4,75) aukon keskelle: länsimuuri (kloonattu 05:n länsimuurista z 385–401) + aukko kuja-29:lle z 408,4–412,4
  (pielissä kansi), UUSI itämuuri (kloonattu itämuurista z 361–382). Ketju aja_v118_pari.zsh → yksikerros-v101, muurikate pari-v118,
  juuri-v118m (02 ennallaan; v117 = hylätty 02-kavennus). Pari -070823/05 ja /05p KK:lla. Muurilinjat KS:lle:
  yksikerros-v101/kuja05-muurilinjat.json (pohja.json-kehys). Apuvälineet: kuja40_mittaa.py, alue_seinat.py, vyo_materiaalit.py.
- SEURAAVA: KK:n palaute 05-pariin (lähipuu näkyy muurin yli: kielletty-lahipuut-v6, poista tarvittaessa; 05:lle testikamera kuten 02);
  KS:n pohja v101-linjoista → PK rata (≥ 2,4 m, suositus ≥ 3) → vienti. Kuja 02: odota omistajan korttia (suositus leveys ennallaan).

## LISÄYS 59 klo 07.30 (29.10.): KUJAN 05 JATKO v119 + VIENTIPAKETTI v63 — LUOVUTUS, ALOITA TÄSTÄ
- v118 hylätty: uusi itämuuri peitti puolet pohjoisen t-portti-424:n aukosta (malli: jambit x −251,4 / −247,0, t-portti-424 paikka
  (−249,15; 425,25)). muuri_jatko05.py v3 (v1/v2 .v1/.v2): jatko aukosta aukkoon, LEVEYS 4,5 vakio, kallistus ~4,5° (leikkaus: x-siirto
  z:n mukaan): länsi (−253,98; 403,4) → (−252,35; 424,3) + aukko kuja-29:lle keski (−253,43; 410,4) 4 m; itä (−248,68; 403,4) →
  (−247,05; 424,3) vanhaan itämuuriin. aja_v119_pari.zsh → yksikerros-v102, muurikate pari-v119, juuri-v119m. Parit -072341/05 ja
  05j-peli.png (editori-lr.sh: uusi kohta 05j "-251.0 407 -1.0"; vertailu kaatuu 05j:lle, koska havainnekuvaa ei ole → kuva esikatselu-kansiosta).
- KS: pk6 (bf2dbd78) = malli ±0,01 (LR tarkisti kuja40_mittaa.py:llä; vanhat muurit +2,30 / −3,80), pk7 (e8a5b232) = v102:n linjat +
  way/42509088 t-porttiaukko (−249,2; 425,19) 4,4 m. PK: pk6-ratatarkistus OK (haara pelikoodari/pk6-214 7e9c8473c), pk7:n tarkistus odottaa.
- VIENTIPAKETTI: /Users/Shared/Claude/proto-3d/_valmiit/juoksupeli-kk-lavastaja-v63-vienti-20261029 (SHA256SUMS-tiedoston SHA 6e94cd84…,
  298 tiedostoa, LAHTEET.md): kielletty-tausta-v63 (= yksikerros-v102), kielletty-muurikate-v20/kk-muurikate-v20-pohja.glb (= pari-v119),
  kielletty-rakennukset-v49 (= rakennukset-v116), avoimet-v51 (= avoimet-v74k, kuja 01 v112). Pelin nykyiset (pk6-214): tausta-v62,
  muurikate-v19/kk-muurikate-v19-pohja.glb, rakennukset-v48, avoimet-v50. Versiot PK:lle ilmoitettu; JU:n ämpärivienti PT:n luvalla (kysytty).
- JUMI (PT:lle kysytty): t-portti-424:n aukko on taustassa UMPINAINEN (muuri + kivijalka z 424,4–426,5, x −253…−246,4) myös pelin v62:ssa,
  mutta pk7:n rata kulkee siitä kuja-39:ään → jos PT/PK vahvistaa, leikkaa aukko (x −251,4…−247,0, alle aukon yläreunan) taustaan ja
  uusi paketti (v64). Tarkistus: K/tyokalut/aukko_este.py <tausta> <z0> <z1> (tulostaa esteet y < 2,5 alueella x −253…−245,5).
- Auki: kuja-29:n aukon pielien kansi vaalea (UV lähimmästä kärjestä ei osu) → kopioi pieliin muurin pinnan UV tai V4_red-materiaali;
  KK:n palaute 05-pariin; omistajan kortti kuja 02 (suositus leveys ennallaan). VIESTIRAJA täynnä → varakanava send_message.

## LISÄYS 60 klo 07.35 (29.10.): OMISTAJA 07.26 — KUJA 02 HAVAINNEKUVAN LEVYISEKSI, RAKENNUKSET ENNALLAAN — LUOVUTUS, ALOITA TÄSTÄ
- Loki paatokset-2026-10.md:3164. PT: jäljellä oleva ero ~0–5 % (havainne 4,5 | peli ≥ 4,3 hahmon korkeutta reunakivestä reunakiveen,
  hahmon jalkojen kohdalla), mittarina kujan leveys sovitetulla kameralla (editori-lr.sh: TESTIKAMERA 02 "3.3 6.88 10 45" ja paikka
  x −245,44 ovat nyt oletuksena), EI kattojen väli. Työnjako: LR muurit → KS pk8 (= pk7 + kuja 02) → PK rata → parit KK:lle.
- TEE: 1) aja 02 uudella oletuspaikalla juuri-v119m:llä ja mittaa leveys hahmon korkeuksina (havainne | peli) molemmista reunakivistä
  (pelin oikea reunakivi oli -065520:ssä kuvan ulkopuolella). 2) levennä itämuuria kuja02_kavennus.py:llä POSITIIVISELLA SIIRROLLA
  (esim. SIIRTO=0.3 → +0,3 m itään z 315–340, liukumat 311–315/340–344; pohjana yksikerros-v102 ja muurikate pari-v119, EI v99/v116,
  muuten 05:n jatko katoaa: muuta aja_v117_pari.zsh:n polut → aja_v120_pari.zsh). 3) parit KK:lle, --muurit-linjat KS:lle (pk8),
  PK:lle. 4) uusi vientipaketti (tausta-v64, muurikate-v21; rakennukset-v49/avoimet-v51 ennallaan) samaan junaan pk8:n kanssa.
- JUMI yhä PT:llä: t-portti-424 umpinainen (lisäys 59). Viestiraja täynnä → mcp__ccd_session_mgmt__send_message.
- PT:N PÄÄTÖS 29.10. (JUMI ratkaistu): t-portti-424 → KYLLÄ, leikkaa aukko taustaan x −251,4…−247,0, alle aukon yläreunan
  (malli + way/42509088 = totuus); tarkista aukko_este.py:llä. Tee samaan v64-pakettiin kuja 02 -levennyksen kanssa (TEE-kohta 4).
  v63:a EI viedä ämpäriin erikseen (v64 korvaa, yksi juna). PK tarkistaa pk7/pk8:n radan kuja-39:ään vasta v64:llä (ilmoitettu).

## LISÄYS 61 klo 07.55 (29.10.): t-portti-424:n AUKKO TEHTY (yksikerros-v103) — LUOVUTUS, ALOITA TÄSTÄ (+ lisäyksen 60 kuja 02)
- PK/PT 07.4x: aukko tarvitaan (reittiverkko x −251…−249,5 z 421 → 427,5 kuja-39:ään; myös nykyinen esto v12 läpäisee). UUSI
  K/tyokalut/avaa_tportti.py: poistaa pielien välistä ei-lattiakolmiot laatikossa x −251,48…−246,98, z 423,9–426,7, y ≤ 3,35, paitsi
  ±x-normaaliset pielipinnat → yksikerros-v103 (aukko_este.py: vapaa x −251,2…−247,8 = 3,4 m; reunoilla pielet ja uuden itämuurin pää).
  aja_v120_pari.zsh → juuri-v120m, kuva 05j ajettu taustalla (lokit/esikatselu-20261029-07xx*/havainne-05j.png) — TARKISTA kuva (ei
  katsottu ennen nollausta): pielet ehjät, ei reikiä seinän sisään, muurikate (pari-v119) aukon yllä ok.
- PT 07.5x: v63 EI ämpäriin; lopullinen v64 = v103 + lisäyksen 60 kuja 02 -levennys (pohjaksi yksikerros-v103 ja muurikate pari-v119).
  Keskeneräinen paketti (vain aukko): K/paketti-v64-kesken (ei _valmiit-kansiossa). Tee lopullinen _valmiit/juoksupeli-kk-lavastaja-v64-
  vienti-<pvm> kun kuja 02 valmis; versiot PK:lle (haara pelikoodari/pk7-214, hän leipoo palatsi-esto-v13), PT kuittaa koko nipun ennen JU:ta.
- KS odottaa kuja 02:n muurilinjoja (pk8 = pk7 + 02; KS:n oma +2 m pk8 peruttu). KK:lle kerrottu: mittari = leveys hahmon kohdalta, ei 0,70.

## LISÄYS 62 klo 07.43 (29.10.): v64 VALMIS PT:N KUITTAUKSEEN — KUJA 02 ENNALLAAN — LUOVUTUS, ALOITA TÄSTÄ
- Kuja 02 mitattu TESTIKAMERA 02:lla (juuri-v120m, havainne-editori-20261029-073622/02): hahmon jalkojen kohdalta reunakivestä
  reunakiveen havainne 4,49 | peli 4,71 hahmon korkeutta = peli jo +4,9 % leveämpi. Koe SIIRTO=−0,3 (yksikerros-v104, juuri-v121m,
  aja_v121_pari.zsh, -074024/02) antoi 4,77 = mittausvirheen (±0,1) sisällä. PT 07.4x: tavoite (+0–5 %) täyttyy, kuja 02 ENNALLAAN.
- t-portti-424: kuva 05j (esikatselu-20261029-073622/havainne-05j.png) tarkistettu: pielet ja lattia ehjät, ei reikiä.
- VIENTIPAKETTI _valmiit/juoksupeli-kk-lavastaja-v64-vienti-20261029 (SHA256SUMS sha256 1bfef18a7714d938…, -c OK): tausta-v64 =
  yksikerros-v103, muurikate-v20-pohja = pari-v119, rakennukset-v49, avoimet-v51. PK:lle versiot (jonossa), KS:lle: pk8:aa ei tarvita.
- SEURAAVAKSI: PT kuittaa nipun → JU vie. v104/v121m ovat vain koe (ei vientiin).

## LISÄYS 63 klo 08.0x (29.10.): 05-PARI SOVITETULLA KAMERALLA, v64 ENNALLAAN — LUOVUTUS, ALOITA TÄSTÄ
- 05-pari TESTIKAMERA_05="3.3 6.88 10 45" (sama kuin 02) v120m:llä: havainne-editori-20261029-075824/05 (keisari samankokoinen). Parit
  02 (-073622) ja 05 (-075824) KK:lla.
- KK/PT: havainteen kaukoportti t-portin takana → pohja.json: kuja-39 jatkuu t-portista vain z 425→436,7 ja kääntyy länteen, muuri 210:n
  kulma z 445,6; ei porttia eikä suoraa jatkoa → PT 08.0x: v64 ENNALLAAN (havainne = ulkoasu, mitat oikeat).
- Nippu JU:lle vasta PK:n reittiverkkokorjauksen (kuja 40b) jälkeen; PT kuittaa.

## LISÄYS 64 klo 08.3x (29.10.): KK:N 05-SOVITUS + PORTTI KAPEAMMAKSI (EI VIELÄ PAKETISSA) — LUOVUTUS, ALOITA TÄSTÄ
- editori-lr.sh: PAIKKA_<k>="x z suunta°" ja PELIKAMERA=1 (pelin oma kamera); 05 oletus: paikka −251,6 393 −3, TESTIKAMERA 05 "3.0 5.3 16 45"
  (kynnys y 0,47 vs havainne 0,45, KK). 02: puu oikealla = itäpihan puuryhmä (lahipuut-v6), poisto vain pyynnöstä.
- 05:n portti p-kujaportti (PT:n 24.10. havaintoportti, ei OSM): rakennukset-v117 = teal → tumma puu (portti_teal_puuksi.py, KK: friisi
  hillitään), rakennukset-v118 = aukko 6,68 → 5,14 m + ovilehdet × 0,77 + törmäys (portti_kapea.py K=0.77). juuri-v122m (v117), v123m (v118),
  aja_v122_pari.zsh / aja_v123_pari.zsh. Parit KK:lla: -081457/-081719 (02), -082716/-082929 (05).
- AUKI: KK:lle kysytty aukon/lehtien korkeus 4,55 → ~3,5 m (yhä ~1,3× havainnetta). Kun valmis: uusi paketti v65 (rakennukset-v50 =
  rakennukset-v118+, tausta-v64, muurikate-v20, avoimet-v51) → PK (törmäys muuttui: aukko 5,14 m, reitti 2,4 m mahtuu) → PT kuittaa.

## LISÄYS 65 klo 09.0x (29.10.): v65 (LATTIAVÄLKE KORJATTU) PK:LLA; 05-PORTTI v119 KK:LLA → v66 — LUOVUTUS, ALOITA TÄSTÄ
- PT/PK: v64:ssä kujan 05 portilla ja jatkolla (pohja −250,8; 411 → 407,8) marmori ja kivetys päällekkäin. Syy (peitto2-ruudukko): emopalan
  0-3 V4_lattia (y −0,004…−0,01) < 3 cm kujapalan alustasta (−0,03), kujakivestä ja 1-3:n lattiasta (0). UUSI tyokalut/lattia_paallekkain_pois.py
  (VARA=0.8 LASKU=0.03 ALUSTA=-0.07) → yksikerros-v104 (vanha v104-koe korvattu). Kuvat -085534/06 (etelään) ja esikatselu-085128/05j puhtaat.
- PAKETTI _valmiit/juoksupeli-kk-lavastaja-v65-vienti-20261029 (SHA256SUMS f44c5207ca7628bc…, -c OK): tausta-v65 = yksikerros-v104, muu = v64.
  PK ajaa parin; PT:ltä kysytty v64-paketin poisto.
- 05-portti: rakennukset-v119 = v118 + portti_havainne.py AUKKO=4.55 AUKKO2=3.5 FRIISI=5.2 LASKU=0 (aukko 5,14 × 3,5 m). Ovilehtien kääntö
  (portti_ovet_kaanto.py, v120) HYLÄTTY: KK halusi leveät nastapinnat → rakennukset-v120 = v119. Parit -083428 (sovitettu) ja -083705 (pelikamera)
  KK:lla → KK:n OK:lla v66 = v65 + rakennukset-v50 (= rakennukset-v119) → PK läpikulku + pari → PT.

## LISÄYS 66 klo 09.1x (29.10.): LUOVUTUS (konteksti 30 %) — ALOITA TÄSTÄ
- TILA: v65 _valmiit/juoksupeli-kk-lavastaja-v65-vienti-20261029 (PT tarkisti, SHA256SUMS f44c5207…); v64- ja v63-kansiot poistettu (PT).
  PK otti v65:n (pelikoodari/pk7-214 20c32559f), pari pk7v65 JU:n jonossa → PK ilmoittaa tuloksen.
- ODOTTAA KK:TA: 05-portti rakennukset-v119 (aukko 5,14 × 3,5 m, friisi hillitty; parit -083428 / -083705). PT: jos KK hyväksyy ennen
  kuin PK:n v65-pari on puhdas → tee suoraan v66 (= v65 + kielletty-rakennukset-v50 = rakennukset-v119/kielletty-rakennukset-v54) ja v65
  jää ämpäristä pois (yksi juna). Tee kuten v65.py (scratchpad-malli: cp -c -R edellinen paketti, vaihda kansio, SHA256SUMS, LAHTEET) →
  PK (törmäys muuttui: aukko 5,14 m, läpikulku todennettava) → PT.
- Jos KK hylkää: v65 ennallaan, PK:n pari ratkaisee.
- Työkalut tällä erää: editori-lr.sh (PAIKKA_<k>, PELIKAMERA=1, 05-oletuskamera), portti_teal_puuksi.py, portti_kapea.py, portti_ovet_kaanto.py
  (hylätty), lattia_paallekkain_pois.py; ajot aja_v121…v126_pari.zsh. KK:lle vastattu 02:n puusta (itäpihan puuryhmä, poisto vain pyynnöstä).

## LISÄYS 67 klo 10.0x (29.10.): KUJA 05:N LATTIAVÄLKE KOKONAAN (v106) → v66 VALMIINA, ODOTTAA KK:N 05-OK:TA — ALOITA TÄSTÄ
- PK pk7v65 (283/283): harmaa laikku p-kujaportin kohdalla. Syyt: (1) kujapalan V4_kujakivi_lattia jatkui portin (z 400,03) ohi z 406:een
  ilman marmoria alla; (2) emopalan 0-3 LOD1/2-lattia (iso kolmiointi, kärjet jaettu reunakiven yläpinnan y 0,15 kanssa) jäi kujakiven tasoon
  tai yli, kun peli näyttää emopalasta LOD1:n ja kujapalasta LOD0:n (v104:ssä 162 pistettä < 1 cm).
- UUDET työkalut (K/tyokalut): kujakivi_rajaa.py (kujakivi leikataan z = ZMAX, yli menevä osa V4_lattia-marmoriksi UV x/8, 1 − z/8);
  lattia_paallekkain_pois.py KOKO=1 (peite kaikista LODeista, kolmio kokonaan alas; järjestys kujapala 0 > 1-3 −0,015 > 0-3/0-4 −0,03).
- yksikerros-v103 → v105a (rajaa) → v106 (KOKO=1 VARA=0.1 LASKU=0.03 ALUSTA=-0.07). Kerrosskannaus x −262…−240, z 380…432, kaikki
  LOD-yhdistelmät: 0 pistettä < 1 cm. juuri-v128m, aja_v128_pari.zsh; kuvat havainne-editori-20261029-095444/06 ja -095711/06 (pelikamera).
- v66 = v65 + kielletty-rakennukset-v50 (= rakennukset-v119) + kielletty-tausta-v66 (= v106): K/tyokalut/paketti_v66.py valmis, EI AJETTU
  ennen KK:n 05-portin OK:ta (kysytty PT:ltä). v65 jää paikalleen, kunnes PK vaihtaa (PK: ilmoita ennen viennin poistoa).

## LISÄYS 68 klo 10.2x (29.10.): PORTIT 02/05 + T-PORTTIEN LATTIA (rakennukset-v123) → KK; v66 AJETAAN KK:N OK:LLA — ALOITA TÄSTÄ
- KK hylkäsi 05-portin v119 (lehdet kameraa kohti, 2× leveät, kirkkaanpunaiset) → K/tyokalut/portti_lehdet.py: vanhat lehdet (V4_portin_ovi +
  V4_wood y > 0,4) pois, uudet: sarana pielessä z HZ, kääntö KULMA° sisään poispäin kamerasta, leveys = puoli aukkoa, V4_ovilehti_viini +
  V4_nasta_kulta-kuvut (NASTA=16). Lehdet ovat staattista geometriaa (vain p-kujaportti-3:lla PK:n ovisolmut). 05: A=2.57 HZ=-0.85 KULMA=70 9×5;
  02: A=1.64 HZ=-0.9 KULMA=75 9×4 (reitti 2,4 m mahtuu). Törmäys ennallaan.
- 02:n katto: portti_katto_kapea.py (SX 0,83 SZ 0,8 NOSTO 0,5; koristeet kappaleina, scipy). t-portit 120/m15/m216: tportti_lattia.py
  (vaakasuora V4_marmori → V4_lattia; PK: peli teksturoi nimen mukaan, marmori näkyi dronesta harmaana).
- rakennukset-v123 = v119 + nämä; juuri-v130m, aja_v130_pari.zsh; parit -101640 (sovitettu) / -101857 (pelikamera) KK:lla.
- paketti_v66.py (v65 + rakennukset-v123 + tausta v106) valmis → aja KK:n OK:lla → PK + PT.

## LISÄYS 69 klo 10.3x (29.10.): KK:N v123-PALAUTE (seuraavalle; PT: viikkoraja 97 %) — ALOITA TÄSTÄ
- KK: ovilehtien väri ja kupunastat (1/16) HYVÄT. Ennen omistajaa vielä:
  1) 02:n portin katto yhä ~2,1 × portin seinän levyinen (havainne ~1,2 ×): aja portti_katto_kapea.py rakennukset-v119:n kopioon SX ≈ 0,83 × 0,57 ≈ 0,47
     (kaarevat räystäät ja harjaeläimet säilyvät), muut vaiheet kuten lisäys 68.
  2) 05: havainteessa sivumuurien keltaiset räystäät ja friisi näkyvät yläkulmissa (räystään alareuna 0,17 kuvan korkeudesta, ~kamanan
     korkeudella); pelissä muurit jatkuvat yläreunan yli. Selvitä, tuleeko 05:n lähimuurien korkeus datasta (pohja/OSM) → jos ei, laske portin
     lähimuurit (muurikate-pohja, kuja 05) havainteen räystäskorkeuteen; jos tulee, kerro KK:lle. Samalla aukko + ovilehdet korkeammiksi:
     aukko 0,36 → 0,42 kuvan korkeudesta (~× 1,17: portti_havainne.py AUKKO2 3,5 → ~4,1 ja portti_lehdet.py H 3,45 → ~4,05).
  Sitten parit 02 + 05 (sovitettu + pelikamera) → KK → OK:lla paketti_v66.py (päivitä R ja LAHTEET).

## LISÄYS 70 klo 11.05 (29.10., PT): OMISTAJA 11.02 — LATTIALAATAT JA REUNAKIVET HAVAINNEKUVIEN MUKAISIKSI (kaikki kujat ja aukiot)
- Sanatarkasti: "lattialaatoista pitää tehdä samalla tavalla isompia ja erikokoisia kuin havainnekuvissa. reunakivet pitää olla matalampia,
  leveämpiä ja pidempia, kuten havainnekuvissa." Kuva: docs/raportit/kaappaukset/omistaja-20261029/lattialaatat-reunakivet-1102.webp (kuja 02, v123 -101640).
- KK:n mittaus sovitetulla kameralla (docs/raportit/kaappaukset/omistaja-20261029/lattia-reunakivi-vertailu-kk-1102.png, ylhäällä havainne):
  laatta keisarin kohdalla ~1,5–2 × pelin pituus ja ~1,4 × syvyys, pituudet vaihtelevat ~1:2, limittäin. Reunakivi: ~½ pelin korkeudesta,
  ~2–2,5 × leveämpi päältä, kivet ~2 × pidempiä; sama harmaa kivi kuin kivijalka (omistaja 27.10. 15.43).
- TEE v66:n jälkeen (älä sotke v66:n porttikorjauksiin): lattian laattajako + reunakiven muoto. Jos laattapinta vaatii uuden eripituisen
  laattasarjan, kerro PK:lle (Codex-tilaus; KK:n 28.10. v4d-hyväksyntä ei koskenut tätä). Pari kuja 02 → KK → omistaja, sitten muut kujat.
- Viikkokäyttö 97 % (tauko 2.11. klo 03 asti): ei agentteja eikä raskaita ajoja ennen nollausta.

## LISÄYS 71 klo 11.08 (29.10., PT): OMISTAJA 11.04 — MYÖS KIVIJALAN KIVET MATALIKSI (jatko lisäykseen 70)
- Sanatarkasti: "myös kivet seinällä ovat nyt liian korkeita."
- KK (docs/raportit/kaappaukset/omistaja-20261029/kivijalka-vertailu-kk-1106.png, vasen havainne, kuja 02 oikea muuri): pelissä kivet
  pystymallisia (korkeus ~1,4 × leveys); havainteessa kivi ~0,4 × pelin kiven korkeus ja ~2,2 × pituus (~3–4 × korkeuttaan pidempi),
  matalina pitkinä kerroksina limittäin. Kivijalan kokonaiskorkeus pysyy (täsmää havainteeseen). Kaikki kujat ja aukiot.
- Samaan pariin 02 lattian ja reunakiven kanssa → KK → omistaja. Kivisarjan uusinta Codexilla PK:n kautta, jos tarvitaan.

## LISÄYS 72 klo 13.4x (29.10.): LISÄYS 69 TEHTY (rakennukset-v124/v125), 05:N SIIVET, REUNUSKIVET (v107) — LUOVUTUS, ALOITA TÄSTÄ
- Python: /opt/homebrew/bin/python3 ILMAN -I:tä (numpy on käyttäjän site-packagesissa; -I estää sen). K on symlinkki T7:lle.
- rakennukset-v124 (K/tyokalut/rakenna_v124.zsh, v119:stä, toistaa v123:n tavulleen kun SX02=0.83 AUKKO2=3.5 H05=3.45):
  02: lehdet + katto SX 0,47 (~1,2 × portin seinä, KK OK) + UUSI portti_chiwen.py (harjakoristeet harjan päihin); 05: aukko 3,5 → 4,1 m
  (portti_havainne.py toinen kierros AUKKO=3.5 AUKKO2=4.1) + lehdet H 4,05; t-portit v123:sta. KK kuittasi 02 + 05-aukon.
- 05:n "sivumuurit" = portin oma runko (12,4 m × 5,9 m; ei dataa: havaintoportti, pohja.json muurit oletus 4,0 m). KK 13.2x: tee ennen
  v66:ta. UUSI portti_siivet.py (rakenna_v125.zsh: v124 + siivet + katto_kapea SX 0,645 SZ 1): runko leikataan x = ±3,54 (torni jää),
  sivuista y ≤ W; siipiin friisi, räystään alus, kultareuna, tiilirinteet, harja (UV sovitettu portin friisistä ja katosta).
  W=2,75 (havainteen mittari 0,17) jätti kujan 05 omat muurit (räystäs 3,84–5,15 m, länsipuolella rakennuksia) siipien yläpuolelle →
  NYT W=3.9 FH=0.4 RH=0.75 (siipien räystäs samaan linjaan kujan muurien kanssa = KK:n "räystään alareuna kamanan korkeudella").
  Pari 05 W=3.9: -134428/05 (sovitettu), -134650/05 (pelikamera; friisi juuri yläreunassa, muurien kanssa samassa linjassa) → KK:lla
  parien 02 (-133647/02, -134120/02) kanssa 13.5x. W=2.75-parit: -133647/05, -134120/05 (siivet irti muureista).
- PT 13.5x (KK, dronevideo 129–132 s): portin yläpinta tasainen harmaa taso, josta pystyy punaisia pilareita (näkyy katon häivytyksessä,
  näyttää rikkinäiseltä). Selvitä mikä portti (videon kohta) → kansi katon alle (esim. V4_red/V4_raystas_alus_puu) ennen v66:ta.
- Lisäys 70 (reunuskivet, LR:n osuus): UUSI reunakivi_matala.py → yksikerros-v107 (= v106 + 960 kujan reunakiveä × 0,5 korkeus,
  892 × 2,25 leveys ulospäin muurista; 68 ilman sokkelia vain matalaksi). Pari 02 -133647 näyttää matalan leveän reunuksen.
- Lisäykset 70–71, varjostin (laattakoko, kivijalan lohkot, ReunusRaja ~1,4 m) = PK (PK:n luovutus PR 5589); pari 02 yhdessä PK:n kanssa.
- juuri-v133m = v130m + rakennukset-v125 + tausta v107; ajo: J=v133m KOHDAT="02 05" zsh K/tyokalut/aja_v132_pari.zsh.
- SEURAAVAKSI: 05-parin tarkistus (siivet, myös LOD1/2 ok?) → KK → paketti_v66.py: vaihda R rakennukset-v125:ksi ja tausta
  yksikerros-v107:ksi + LAHTEET (nyt osoittaa v124:ään ja v106:een) → aja → PK (läpikulku 05, reunukset kavensivat kujaa ~0,5 m/puoli) → PT.

## LISÄYS 73 klo 13.5x (29.10.; PT kirjasi KK:n viestistä): KUJA 05 = MATALA SIIPI + LÄHIMUURIT SAMAAN RÄYSTÄSLINJAAN
- KK: v125:n korkeat siivet (W=3.9, -134428/05) EIVÄT täytä palautetta: räystäs ja friisi jäävät kuvan yläreunan yli (havainteessa
  friisin alareuna 0,17 kuvan korkeudesta). VALITAAN MATALA siipi (W=2.75, -133647/05: friisi 0,17, oikein).
- Samalla kujan 05 lähimuurit (kuvan reunoilla siipien takana nousevat punaiset seinät) LASKETAAN samaan räystäslinjaan siipien kanssa,
  niin että friisi jatkuu yhtenäisenä kuten havainteessa. Muurien korkeus ei tule datasta (LR 13.3x) → noudatetaan ulkoasua, ei
  selitystä omistajalle. Länsipuolen rakennukset saavat jäädä taakse omine kattoineen.
- 01 (lukittu) ja 02 ennallaan. 02:n uudet reunakivet ja katto OK (KK) → pari 02 odottaa PK:n laattoja ja kivijalan kiviä.
- Järjestys: 05 matala siipi + muurit → pari 05 → KK → paketti_v66.py (lisäyksen 72 SEURAAVAKSI-kohta, R = uusi rakennukset-versio).

## LISÄYS 74 klo 14.09 (29.10.): LISÄYS 73 TEHTY — 05 MATALA SIIPI + LÄHIMUURIT SIIPIEN RÄYSTÄSLINJAAN + YHTENÄINEN FRIISI (juuri-v134m)
- rakennukset-v126 = rakenna_v125.zsh V=126 W=2.75 FH=0.55 RH=0.75 (siiven friisi 2,75–3,30, räystäs 3,30; muuten = v125).
- UUSI K/tyokalut/muuri_laske05.py: kujan 05 muurinauhan kärjet (keskilinjasta ≤ 1,4 m; itä x = −245,03 − (z − 354,6)·0,02907, länsi
  polyline 362 → 401,8; y 1,9…5,2) paloittain: runko 1,9–3,90 → 1,9–2,75, friisivyö 3,90–4,12 → 2,75–3,30, kate −0,82 (harja 5,15 → 4,33).
  Liukuma etelässä z 366–372 (ZS0/ZS1), pohjoisraja z 401,8 (siiven sisällä). Rakennukset (länsi z 365–375, itä x −244,4 z 386–390,
  t-rakennus z 402,3) jäävät nauhan ulkopuolelle.
  - PEITE=1 (tausta): taustan V4_red oli samassa tasossa kuin friisi (y 3,3–4,5) → V4_red ≤ 2,745, räystään alus ≥ 3,30.
  - FRIISI=1 (muurikate): muureissa ei ollut kujan puolella friisiä (vain z 389–393) → uusi V4_palatsi_friisi-nauha 2,75–3,30 molempien
    muurien kujanpuoleisille pinnoille z 372 → 398,28 (24 paneelia, UV muurikatteen friisin mukaan).
- Ketju: yksikerros-v108 (= v107 + PEITE=1 muuri_laske05; vain kk-tausta-0-3-lod0/1/2 muuttuivat), muurikate-v19/pari-v134-v16-nimella
  (= pari-v119 + FRIISI=1), juuri-v134m (= v133m + nämä + rakennukset-v126). Ajo: J=v134m KOHDAT="05" zsh K/tyokalut/aja_v132_pari.zsh.
- Parit 05: lokit/havainne-editori-20261029-140559 (sovitettu) ja -140748 (pelikamera). Friisi jatkuu siivestä muureihin molemmin puolin,
  räystäs samassa linjassa; mittari räystäs 0,11–0,12 (havainne 0,17; siiven friisi 0,17 kuten KK:n valitsemassa -133647:ssä).
- Huomiot KK:lle/PT:lle: muurin friisin kuva (muurikatteen friisi-v01) on hieman eri kuin siiven (friisi-v02); kujan 05 jatko portin
  pohjoispuolella (z 403–424) ja muurit etelään z < 366 ennallaan (liukuma 366–372 näkyy loivana laskuna).
- SEURAAVAKSI: KK → paketti_v66.py: R = rakennukset-v126, tausta yksikerros-v108, JA UUSI muurikate (pari-v134; v66 ei aiemmin
  päivittänyt muurikatetta → lisää kielletty-muurikate-v21 pakettiin + LAHTEET) → aja → PK (läpikulku 05) → PT.

## LISÄYS 75 klo 14.2x (29.10.): DRONEVIDEON 129–132 s "HARMAA TASO + PUNAISET PILARIT" = T-PORTIN TUNNELIN TERASSI (jo korjattu v123:ssa)
- Video: lokit/todistus-drone214n-8289a55fe-20261029-1334/drone214n.mp4 (pelin rakennukset-v48 = rakennukset-v116). 127–132 s hahmo juoksee
  t-portin tunnelin läpi; katon häivytys paljastaa tunnelin päällä olevan terassin (t-portti-m15/m216: vaakasuora runko-pinta y 2,5,
  ~520 m², josta nousevat paviljongin punaiset pilarit). Pinta oli V4_marmori → peli näytti tasaisen harmaana.
- Korjaus on jo tehty: tportti_lattia.py (lisäys 68, rakennukset-v123+) muutti terassin V4_lattiaksi (kivilaatta); mukana rakennukset-v126:ssa
  → v66. Ei uutta kantta. Tarkistus: PK:n seuraava drone v66:lla samasta kohdasta (terassin pitää näkyä kivilaattana).

## LISÄYS 76 klo 14.4x (29.10.): KK OK 05 (v126), PARIT 02 + 05 PK:N kivikoko-214:LLÄ — JUMI: KAMERA VÄÄRÄSSÄ PAIKASSA
- KK 14.1x: kuja 05 v126 KELPAA muodon osalta (friisi 0,19 ≈ 0,17, yhtenäinen). Portin läpi näkyvä kapea käytävä ei ole palautetta (v64-linjaus).
- PK: REF pelikoodari/kivikoko-214 = 9c0477cb6 (vihreä; laatat 0,6 m rivit 0,67–1,33 m, kivijalka 7,6 cm × 0,26–0,38 m, ReunusRaja 1,4/0,4).
  Reunakiven geometria on jo 1,4/0,4 (aja_ketju_v85r.zsh 28.10. → v93 … v108), uutta taustaa ei tarvita (kerrottu PK:lle).
- juna-214 lataa eri nimet: tausta-v65, rakennukset-v49, muurikate-v20/kk-muurikate-v20-pohja.glb → UUSI juuri-v134p = v134m + nämä nimet
  (v65 → yksikerros-v108, v49 → rakennukset-v126, v20 → muurikate-v19/pari-v134-v20-nimella). Ajo: REF=9c0477cb6 J=v134p KOHDAT="02 05"
  zsh K/tyokalut/aja_v132_pari.zsh.
- JUMI (PK:lle 14.4x): 9c0477cb6:llä esikatselun kamera osuu väärään paikkaan (kohta 05 → (-144,0; 3,4; -233,7), 46c0add3c:llä
  (239,7; 2,4; -786,0)) → parit -141358, -142519 (ja -141931, -143323) käyttökelvottomia. Odota PK:n korjausta tai kohtakehystä, aja uudelleen → PT.
- JUMI RATKAISTU (PK 14.4x): juna-214 hakee pohjan pk7 ämpäristä (404 → loputon sokkelo). Ajo: ESIKOM="ui juoksupeli palatsi url
  file:///Users/Shared/Claude/proto-3d/_tyo/karttaseppa/kk-pohja-pk7/kk-pohja-v1d-pk7/pohja.json" REF=9c0477cb6 J=v134p KOHDAT="02 05"
  zsh K/tyokalut/aja_v132_pari.zsh. Parit 02 + 05: lokit/havainne-editori-20261029-143933 (sovitettu), -144114 (pelikamera) → PT 14.4x.
  Havainto: lattia ja kivijalka näkyvät pelissä selvästi havainnetta vaaleampina (marmorimainen valkoinen) — PK:n varjostin/valo.

## LISÄYS 77 klo 14.5x (29.10.): UUSI TEHTÄVÄ PT:LTÄ — KUJAKIVIEN LAATTA- JA KIVIJALKAJAKO UV:LLA (LUOVUTUS, ALOITA TÄSTÄ)
- Tila: muoto OK (PT 14.4x: 05 matala siipi + friisi, 02 reunakivet + katto). 05:n mittari selitetty PT:lle (keisari 0,20 = pelikamera;
  sovitettu 0,15; räystäs-mittari mittaa lähimuurin tiiliä, friisin alareuna 0,18–0,19 vs 0,17).
- PT 14.5x: valkoinen lattia = VS:n _KujaKivi (seinat-211) puuttuu PK:n REFistä 9c0477cb6. Kujien kivikoko tulee LR:n UV-mitoista
  (kujakivi_pinnat.py: LKU/LKV lattia, SK sokkeli), ei PK:n k22:sta. Omistajan sanat (11.02/11.04, lisäykset 70–71): "lattialaatat noin
  1,5–2 kertaa nykyistä pidemmät ja eripituiset"; "kivijalan kivet matalina pitkinä kerroksina, kivijalan kokonaiskorkeus ennallaan"
  (KK: kivi ~0,4 × korkeus, ~2,2 × pituus).
- TEE: kujakivet UV:lla REF-linjalla 46c0add3c (VS:n kujakivet mukana; EI 9c0477cb6). Nykyiset arvot (aja_v101_pari.zsh, säilyneet v93 → v108):
  SK=1.0 LKU=1.0 LKV=1.8, pinnat K/../kujakivi-pinnat-v5 (VV_SOKKELI/PILARI/LATTIA=v02), lattia UV0 = PCA-tasoprojektio / 2,0 m.
  Kokeile lattiaan pidempi kivi (LKV/LKU) ja sokkeliin matala pitkä kerta (u- ja v-skaala erikseen; kokonaiskorkeus ennallaan). Aja
  kujakivi_pinnat.py yksikerros-v108:n KOPIOON (→ v109; tarkista, että skripti tunnistaa jo muunnetut V4_kujakivi_*-materiaalit, tai lähde v107:stä ennen
  pinnat-vaihetta). Eripituisuus ei onnistu pelkällä UV-skaalalla → jos tarvitaan, tilaa Codexin kuvat-sessiolta kujakivitekstuurin uusinta
  (pysyvä lupa; ks. osoitekirja) ja kerro PT:lle.
- Parit: juuri-v135m (= v134m + uusi tausta), `REF=46c0add3c J=v135m KOHDAT="02 05" zsh K/tyokalut/aja_v132_pari.zsh` → PT.
  seinat-211 + v66 menevät junaan 214 yhdessä (omistaja hyväksyi kujakivet 28.10. 18.57).
- v66-paketti (paketti_v66.py) yhä tekemättä: R = rakennukset-v126, tausta = uusin (v108 tai v109), muurikate pari-v134 (v21, uusi pakettiin).

## LISÄYS 78 klo 15.0x (29.10.): LISÄYS 77 TEHTY UV:LLA (juuri-v135m) + CODEX-TILAUS v6 ERIPITUISISTA KIVISTÄ — ALOITA TÄSTÄ
- PT 14.5x korjaus: mittari on omistajan sana ("isompia ja erikokoisia kuin havainnekuvissa"; "kivet seinällä liian korkeita"), koko mitataan
  havainteesta 02/05, ei kertoimella.
- UUSI K/tyokalut/kujakivi_skaalaa.py: skaalaa jo muunnettujen V4_kujakivi_lattia/_sokkeli/_sokkeli_yla UV0:n (LKU_K, LKV_K, SKU_K, SKV_K;
  sokkelin wrapT → REPEAT). Ketju K/tyokalut/aja_v135_pari.zsh: yksikerros-v108 → v109, muurikate-v19/pari-v134 → pari-v135, juuri-v135m, parit.
- Mitattu pareista -145253 (02) ja -140559 (05) samalla kameralla: lattia rivit ~0,65 m, laatat ~1,0 m poikki (yhteensä LKU 1,5, LKV 1,95);
  kivijalka ~7 kertaa (0,14 m), kivet ~1,1–1,3 m (SK u 2,4, v 0,93). Parit v135: lokit/havainne-editori-20261029-145807 (sovitettu),
  -150021 (pelikamera). Koko lähellä havainnetta; laatat/kivet yhä samanmittaisia (v02-kuva 0,65–0,70 / 0,45–0,55 m).
- Codex-tilaus claude/postilaatikko cac6ea6ab: stone-surfaces-v6 (lattialaatat-v03 rivit 0,6–0,7 m, laatat 0,6–1,4 m; sokkeli-v03
  8–9 kertaa, kivet 0,7–1,4 m), UV 1:1. Tultua: kujakivi_pinnat.py VV_LATTIA=v03 VV_SOKKELI=v03 SK=1 LKU=1 LKV=1 → uusi tausta + parit.
- PT:ltä kysytty 15.0x: v66-paketti nyt v109:llä vai v6-kuvien jälkeen. v66: R = rakennukset-v126, tausta v109 (tai uusin), muurikate pari-v135.

## LISÄYS 79 klo 15.1x (29.10.): v66 VIETY _valmiit/juoksupeli-kk-lavastaja-v66-vienti-20261029 — ALOITA TÄSTÄ
- PT 15.1x: v109-koot ok (harmaa kivi, koot lähellä havainnetta); puuttuu "erikokoisia" + kivijalan matalat kerrokset (02:ssa vielä isoja kiviä)
  → v6-kuvat; omistajan kortti vasta v6:n parien jälkeen. v66 tehty nyt: K/tyokalut/paketti_v66.py (vanha luonnos paketti_v66-luonnos.py.bak):
  tausta-v66 = yksikerros-v109, rakennukset-v50 = rakennukset-v126, muurikate-v21/kk-muurikate-v21-pohja.glb = muurikate-v19/pari-v135 (korvaa v20),
  avoimet-v51; 299 tiedostoa, SHA256SUMS OK (4398edaa…). PK:lle ilmoitettu (drone: t-portin terassi kivilaattana). Junaan 214 vasta kortin jälkeen.
- SEURAAVAKSI: Codexin stone-surfaces-v6 (cac6ea6ab) → T7/postista K:hon, SHA → kujakivi_pinnat.py v03-kuvilla (UV 1:1; kivijalka mataliksi
  kerroksiksi PT:n mukaan) uuteen taustaan + muurikatteeseen → parit 02/05 → PT → kortti omistajalle → v67.

## LISÄYS 80 klo 15.2x (29.10.): KUJAKIVET v6 PELISSÄ (juuri-v136m), PARIT PT:LLÄ — ALOITA TÄSTÄ
- Codex stone-surfaces-v6 (b87e361c2; PT hyväksyi fb05f9217) → K/kujakivi-pinnat-v6 (SHA OK). lattialaatat-v03 (3 riviä/2 m, laatat 0,60–1,40 m),
  sokkeli-v03 (8 × 0,15 m, kivet 0,70–1,30 m), sokkelin-ylapinta-v03; pilarit/reunakivi ennallaan.
- kujakivi_skaalaa.py sai KUVAT=<pinnat> UUSI=v03 (vaihtaa upotetut kuvat nimen mukaan). K/tyokalut/aja_v136_pari.zsh: yksikerros-v108 → v110,
  muurikate pari-v134 → pari-v136, UV 1:1 (lattia LKV_K 0,5556, sokkeli jo 1:1), juuri-v136m, parit (EI_PARIA=1 = vain rakennus).
- Parit REF 46c0add3c: lokit/havainne-editori-20261029-152020 (sovitettu), -152247 (pelikamera) → PT 15.2x. Kivijalassa pystyjuovat ~0,3 m
  välein (myös v02:ssa) = valo/varjostin → ilmoitettu PT:lle (VS/PK).
- SEURAAVAKSI: PT:n kuittaus → v67 = v66 + tausta-v67 (yksikerros-v110) + muurikate-v22 (pari-v136) (kopioi paketti_v66.py → paketti_v67.py) → PK.
  Junaan 214 vasta omistajan kortin jälkeen (seinat-211 + kujakivet v6).

## LISÄYS 81 klo 15.3x (29.10.): v67 VIETY (kujakivet v6) — ALOITA TÄSTÄ
- PK 15.2x: v66 drone OK (t-portin terassi kivilaattana; pari _tyo/pelikoodari/parkour-20261027/tarkistus-drone214v66/).
- PT 15.3x: lattia ok; kivijalan pystyjuovat → Valoseppä (seinat-211 _KujaKivi), ajaa parit uudelleen aja_v136_pari.zsh:llä.
- v67 = K/tyokalut/paketti_v67.py: _valmiit/juoksupeli-kk-lavastaja-v67-vienti-20261029 = v66 + tausta-v67 (= yksikerros-v110) + muurikate-v22
  (= pari-v136, korvaa v21) ; rakennukset-v50, avoimet-v51 ennallaan; 299 tiedostoa, SHA OK (3f913976…). PK:lle ja PT:lle ilmoitettu.
  EI ämpäriin eikä junaan ennen omistajan korttia (PT).
- SEURAAVAKSI: odota PT:n/VS:n viestejä; avoimet työt lisäyksen 77 alta ja EROLISTA (T-risteys, aukion sivuhallit, 04, 06, 07, C1 Taihedian-korjaukset).

## LISÄYS 82 klo 15.4x (29.10.): v67:ään t-porttien askelten nousupinnat kiveksi (rakennukset-v127) — ALOITA TÄSTÄ
- PT 15.4x: PK:n drone v66 110 s: harmaa katkoviiva tunnelin suulla (proto-3d/_tyo/pelikoodari/parkour-20261027/tarkistus-drone214v66/
  pari-terassi-n129-vs-v66.png, alarivin 4. ruutu; myös arkki-v66-104-112.png 7. ruutu).
- Syy: tportti_lattia.py teki askelmat (vaaka) V4_lattiaksi, mutta 0,15 m nousupinnat (z ±11,4–11,8 / ±15–16) jäivät V4_marmoriksi.
  UUSI K/tyokalut/tportti_askel.py (|n.y| < 0,3, −0,1 ≤ y ≤ 0,85 → V4_lattia, UV (seinän suunta, y)/8): rakennukset-v127 = v126 + tämä
  (t-portti-120 5 kolm., m15/m216 16 kolm. LOD0–1; 424 ei askelia).
- v67 rakennettu uudelleen samaan polkuun (paketti_v67.py): + kielletty-rakennukset-v51 (= v127, korvaa v50); SHA OK c6402a2f…. PK:lta pyydetty
  drone 110 s v67:llä → PT. Ei ämpäriin/junaan ennen omistajan korttia.

## LISÄYS 83 klo 15.4x (29.10.): LUOVUTUS (konteksti 35 %) — KIVIJALAN PYSTYJUOVAT KORJATTU UV:LLA (v137m), TUNNELIN KATKOVIIVA AUKI → v68 — ALOITA TÄSTÄ
1. KIVIJALAN PYSTYJUOVAT (PT 15.4x): kaksi syytä, molemmat korjattu.
   - UV (LR): sokkelin ja pilarien wrapT CLAMP, mutta kivijalka sokkeli_korkea.py:n jälkeen > 1,20 m (taustassa v 0…2,09) → alin pikselirivi
     venyi pystyjuoviksi; muurikatteen sokkeli/pilari v 0…1 koko 1,8 m:lle (kerros 22,5 cm). Korjaus kujakivi_skaalaa.py TOISTO_T=1 + PILV_K
     (pilarit) + muurikatteeseen v × 1,5 → K/tyokalut/aja_v137_pari.zsh: yksikerros-v111, muurikate-v19/pari-v137, juuri-v137m (+ rakennukset-v127).
     UV-suunta tarkistettu oikeaksi (u 0,5/m seinän suuntaan, v 0,833/m). Pari ilman pilarikorjausta: lokit/havainne-editori-20261029-152930 (juovat poissa).
     Pilarikorjauksen kanssa: -153540 (sovitettu) + pelikamera (ajossa 15.39).
   - Varjostin (VS 633d70948 seinat-211, natiivi-backup): sokkeli-v03 lisätty KiviJakoon. Ajo jonossa: REF=633d70948 J=v137m KOHDAT="02 05"
     (taustatehtävä; tulos uusimmat lokit/havainne-editori-20261029-15xx). → TARKISTA kuvat, lähetä polku VS:lle (local_3b36fe96…) ja PT:lle.
2. TUNNELIN SUUN KATKOVIIVA (PT 15.4x: korjaa v68:aan, tarkista pelikameralla, SHA + pari PT:lle, vienti PK:lle): EI korjautunut v67:n
   tportti_askel.py:llä (PK drone v67b 111,5 s: proto-3d/_tyo/pelikoodari/parkour-20261027/tarkistus-drone214v67b/zoom-katkoviiva.png,
   kaista ~0,3 m levyinen, laattakuvio pilkkoutunut = todennäköisesti kaksi päällekkäistä laattapintaa eri UV:lla tai ohut pinta).
   Poissuljettu: t-porttimallien (120/424/m15/m216 LOD0) sisäiset päällekkäiset vaakapinnat (0); taustan lattia porttien 120/m15/m216 suilla y = 0
   (askelmat 0,15/0,30 paikallisesti, rakennukset.json lattia_y 120: 0,3, m15/m216: 2,5, 424: 0). Drone-lokissa ei sijaintia (polku.tsv tyhjä) →
   PK:lta pyydetty x/z. SEURAAVAKSI: selvitä portti (arkki-v67b-100-150.png, video lokit/todistus-drone214v67b-9bbf39e25-20261029-1532/drone214v67.mp4,
   käännä 90° vastapäivään), sitten taustan + rakennuksen + avoimien lattiat maailmakoordinaateissa samassa kohdassa (lattia_y-siirto huomioiden)
   → päällekkäinen poistetaan/lasketaan (vrt. lattia_paallekkain_pois.py). Rakennuksen V4_lattia UV = x/8 paikallisesti, taustan oma → eri kuvio.
3. v67 (_valmiit/juoksupeli-kk-lavastaja-v67-vienti-20261029, SHA c6402a2f…) sisältää yhä yksikerros-v110 + pari-v136 (JUOVAT). v68 =
   paketti_v67.py kopioksi paketti_v68.py: tausta-v68 = yksikerros-v111 (tai uudempi katkoviivakorjauksella), muurikate-v23 = pari-v137,
   rakennukset-v51/v52 → SHA → PT + PK (drone). Ei ämpäriin ennen omistajan korttia.
4. Luovutus-PR 5598 (haara lavastaja/luovutus-75) auki, lisäykset 76–83.
- PK 15.4x (katkoviivan sijainti, lisäys 83 kohta 2): konsoli-stdout.log "Puyi (x, z)" -rivit: tunneli pelin t 87,2–89,2, Puyi (81,6…82,2;
  −383,4…−368,3), juoksu +z; video ≈ t + 21,7 s → viiva 111,5 s ≈ t 89,8, Puyi ≈ (82,3; −364), viiva 4–8 m edessä: PELIN z ≈ −360…−356,
  x ≈ 80–84 (pelin kehys; muunna pohja-/glTF-kehykseen ennen hakua). Reitin 2. portti (1. = t-portti-120 U-käännöksen jälkeen). Huom.
  rakennukset.json: a-meridiaaniportti paikka_pohja (13,2; −380,9) → tarkista myös Meridiaaniportin holvitunnelit, ei vain t-portit.
- 15.4x: parit valmiit. Pilarikorjaus REF 46c0add3c: -153540 (sovitettu), -153759 (pelikamera). VS:n 633d70948 + v137m: -154037 (sovitettu),
  -154302 (pelikamera): kivijalassa EI pystyjuovia, pilarit kiveä, kerrokset + pitkät kivet näkyvät → lähetetty VS:lle ja PT:lle.
  VS 15.4x: seuraava REF de0aeca40 (= 633d70948 + lattialaatat-v03 sävy kivittäin) → käytä seuraavissa pareissa ja v68:n tarkistuksessa.

## LISÄYS 84 klo 16.26 (29.10.): TUNNELIN SUUN KATKOVIIVA KORJATTU (rakennukset-v128, juuri-v138m) → v68 VIETY — ALOITA TÄSTÄ
- Paikka: drone v67b:n 2. portti = t-portti-m15 (puomiloki "t-portti-m15 S-N"); drone ajaa sokkelomaailmassa omilla koordinaateillaan (pelin z ≈ −pohja z − 390),
  V4-maailmassa malli on rakennukset.json:n paikassa (−80,55; −14,75). Editorin "06 x z suunta" = V4/pohja-kehys, suunta asteina (0 = pohjoinen).
- TODELLINEN SYY: terassikannen (V4_lattia y 2,5; 120: y 0,3) kiilarako ylimmän askelman reunassa molemmilla suilla (m15 pohj. z 10,64–10,83,
  leveys 0 → 0,19 m, puuttuva kolmio Codexin mallissa) → raosta näkyi 2,5 m alempi katulattia eri kuviolla. Sama vika t-porteissa 120/m15/m216 (LOD0–2).
- UUSI K/tyokalut/kansi_raot_umpeen.py (näytteistys 0,02 m, rako = peittämätön kansien välissä ≤ RAKO; paikka = suorakaide miinus kolmiot, UV0 x/8, 1 − z/8,
  muut attribuutit lähimmästä kansikolmiosta, kierto normaalin mukaan) + UUSI lattia_limitys_pois.py (limittäiset samantasoiset kansikolmiot pois; ei ollut
  syy, mutta poistaa z-taistelun) + tportti_askel.py YMAX=2,55 (kaikki nousupinnat kiveksi, ei vain alimmat 5). Pieniä 2–4 cm rakoja jää askelmien
  sivupäihin (kaiteen alla). Tarkistus: lattiakolmiot 0 nurin, attribuutit ehjät.
- rakennukset-v128 = v127 + yllä; H/juuri-v138m = v137m + v128. Pelikamera REF de0aeca40, editori 06 −80 −5 0: lokit/havainne-editori-20261029-160432 (v137m,
  katkoviiva näkyy) vs -162116 (v138m, poissa); pari-katkoviiva-v137m-vs-v138m.png + zoom-katkoviiva-ennen-jalkeen.png -162116-kansiossa.
- v68 = K/tyokalut/paketti_v68.py: _valmiit/juoksupeli-kk-lavastaja-v68-vienti-20261029 = v67 + tausta-v68 (yksikerros-v111) + muurikate-v23 (pari-v137)
  + rakennukset-v52 (v128); 299 tiedostoa, SHA256SUMS OK (4fc4da42…). EI ämpäriin/junaan ennen omistajan korttia. PT:lle ja PK:lle (drone v68) ilmoitettu.
- SEURAAVAKSI: PK:n drone v68 → PT; avoimet työt lisäyksen 81 alta (EROLISTA: T-risteys, aukion sivuhallit, 04, 06, 07, C1 Taihedian-korjaukset).

## LISÄYS 85 klo 18.1x (29.10.): v69 = 02:n FRIISI YHTENÄISEKSI + 05:n PORTIN PIELTEN KIVIJALKA → PT + PK
- PK:n drone v68 OK (katkoviiva poissa), PT kuittasi v138m.
- PT 18.0x: 02:n vasemman seinän vihreä vyö irrallisina paloina. Syy: muurikatteen friisi (V4_palatsi_friisi y 3,90–4,12) vain muurikatteen
  2–3 m pätkissä; välissä taustan V4_red-kujaseinä ilman friisiä (vanha vika, näkyi jo junan 214 rungolla). UUSI K/tyokalut/kuja_friisi_jatko.py:
  taustan lod0-pystykolmiot muurikatteen friisilinjassa (n·n > 0,995, taso ±0,25 m, linjaa pitkin ≤ 20 m) → friisikaista 1,5 cm seinän eteen,
  muurikatteen jo peittämä s-väli pois, UV0 lähimmän friisipinnan sovituksesta, UV1 barysentrisesti. yksikerros-v112 = v111 + tämä (~4 400 kolmiota;
  kuja-0-3/1-3 ja aukio-1-1 ilman friisimateriaalia ohitettu, lod1/2 ennallaan).
- PT 18.2x (KK): 05:n portin pielten kivijalka samoiksi isoiksi kiviksi kuin seinässä. Pinta oli p-kujaportin V4_stone (0–1,2 m), EI V4_sokkeli.
  UUSI K/tyokalut/portti_kivijalka.py KORKEUS=1.8: V4_stone → V4_kujakivi_sokkeli (pysty, u 0,5·s, v 1−0,57·y) / _yla (vaaka), materiaalit ja kuvat
  taustan ruudusta, yläpinta 1,2 → 1,8 m (4 kivikertaa kuten muurissa); lod0+lod1. rakennukset-v129 = v128 + tämä.
- Parit (pelikamera REF de0aeca40): v138m -180507, v139m (friisi) -180714, v140m (friisi + kivijalka) -180933; H/juuri-v139m, juuri-v140m.
- v69 = K/tyokalut/paketti_v69.py: _valmiit/juoksupeli-kk-lavastaja-v69-vienti-20261029 = v68 + tausta-v69 (yksikerros-v112) + rakennukset-v53 (v129);
  299 tiedostoa, SHA256SUMS OK (d609a102…). PT:lle ja PK:lle (05-pari) ilmoitettu. EI ämpäriin/junaan ennen omistajan korttia.
- SEURAAVAKSI: PK:n 05-pari v69 → PT; avoimet työt lisäyksen 81 alta (EROLISTA: T-risteys, aukion sivuhallit, 04, 06, 07, C1 Taihedian-korjaukset).

## LISÄYS 86 klo 18.3x (29.10.): v70 = KAIKKI MUURIEN V4_sokkeli → KUJAN ISOT KIVET (juna 214:n este) → PT + PK
- PT kuittasi v69 (18.1x). PT 18.2x (KK 18.21): 05:ssä 1) oikean seinän kivijalan harmaa pikkutiiliyläreuna, 2) portin takaisen kujan päätyseinä
  ja kulma, 3) vino harmaa levy; etsi kaikki jäljellä olevat V4_sokkeli-pinnat.
- portti_kivijalka.py laajennettu: VANHA (oletus V4_stone), YMIN (vain kolmiot, joiden yläreuna ≥ YMIN; muut jäävät), PIENENNA (kuvat lod1/2:lle),
  materiaalit kopioidaan vain jos muutettavaa on. Pinnan valinta: kuvan oikea/vasen on pohjakehykseen nähden peilattu (oikea = itä).
- yksikerros-v113 = v112 + lod0 VANHA=V4_sokkeli YMIN=1.7 (~1 500 pysty + 535 vaaka; hallien 1,2 m jalustat ennallaan) + lod1/2 V4_sokkeli ja
  V4_sokkeli_kansi kokonaan (PIENENNA=256): 05:n päätyseinä oli lod1 (~42 m). muurikate-v20/pari-v138 = pari-v137 + YMIN=1.7 (18 kolmiota).
  3) vino levy = vanhan itämuurin (x ≈ −247, z 424,7–425,9) 14° vino V4_sokkeli-päätypinta (muuri_jatko05:n jäänne), nyt samaa kiveä.
- Parit H/juuri-v141m: lokit/havainne-editori-20261029-180933 (v140m) vs -182804 (v141m), 02 ennallaan.
- v70 = K/tyokalut/paketti_v70.py: _valmiit/juoksupeli-kk-lavastaja-v70-vienti-20261029 = v69 + tausta-v70 (yksikerros-v113) + muurikate-v24
  (pari-v138); 299 tiedostoa, SHA256SUMS OK (677bca43…), koko ~1,0 Gt (+~30 Mt). PT:lle ja PK:lle ilmoitettu. EI ämpäriin ennen omistajan korttia.
- SEURAAVAAN JUNAAN (PT, ei este): 02:n vasemman seinän räystään alta pistää sinivihreä kannatinpala (havainne-peli x≈1720–1810, y≈145–185).
- SEURAAVAKSI: PK:n sovitettu 05-pari v70 → PT/KK; sitten 02:n kannatinpala; EROLISTA (lisäys 81).

## LISÄYS 87 klo 18.3x (29.10.): LUOVUTUS (konteksti 30 %) — ALOITA TÄSTÄ
- PT kuittasi v70 (05 ei pikkutiiltä, päätyseinä ja vino pinta isoa kiveä); JU vie ämpäriin.
- JU hylkäsi v70:n ensin: kielletty-rakennukset-v53/p-kujaportti-3-lod0.glb.tuplavahennys (vanha varmuuskopio, periytyy K/rakennukset-v12x-kansioista).
  Poistettu paketista + SHA256SUMS:sta → 298 tiedostoa, tiiviste a64166c9…; JU:lle lähetetty. SEURAAVAA PAKETTIA VARTEN: poista
  *.tuplavahennys (ja muut ei-pelitiedostot) uudesta paketista ennen SHA256SUMS:ia (paketti_v70.py ei sitä vielä tee).
- Kesken / seuraavaksi: (1) JU:n vienti v70 (odota kuittaus); (2) seuraava juna: 02:n vasemman seinän räystään alta pistävä sinivihreä
  kannatinpala (havainne-peli x≈1720–1810, y≈145–185; todennäköisesti taustan tai muurikatteen V4_konsoli); (3) EROLISTA (lisäys 81).
- Työkalut tältä erää (K/tyokalut): kuja_friisi_jatko.py, portti_kivijalka.py (VANHA, YMIN, KORKEUS, PIENENNA), paketti_v69.py, paketti_v70.py.
  Uusimmat: yksikerros-v113, muurikate-v20/pari-v138, rakennukset-v129, H/juuri-v141m; paria varten editori-lr.sh 02 05 PELIKAMERA=1 REF=de0aeca40.

## LISÄYS 88 klo 18.46 (29.10.): v71 = 02:n KANNATINPALA POIS → PT + PK — ALOITA TÄSTÄ
- Syy (Blender-tunnusvärikuva pelin 02-kamerasta, scratchpad tunnisteet.py; pelikuva on peilattu, oikea = itä): kujan 02 LÄNSImuurin mutkassa
  (z ≈ 321–323, muuri x −248,4 → −249,3) taustan (0-3 lod0) ja muurikatteen V4_konsoli-rivit kulkevat mutkan poikki ja näkyvät räystäänalusen raosta.
- UUSI K/tyokalut/konsoli_pois.py (BOX "x0 x1 z0 z1 y0 y1", MAT): kolmiot pois; BOX "-250.2 -248.3 320.6 323.2 4.2 4.8" → tausta 48, muurikate 40.
  yksikerros-v114, muurikate-v21/pari-v139, H/juuri-v142m (K/tyokalut/aja_v142_pari.zsh). Pari REF de0aeca40: lokit/havainne-editori-20261029-184302
  (02/zoom-kannatin-ennen-jalkeen.png: vasen PK:n -183139, oikea v142m; pala poissa, C3-räystäs yhtenäinen).
- v71 = K/tyokalut/paketti_v71.py: _valmiit/juoksupeli-kk-lavastaja-v71-vienti-20261029 = v70 + tausta-v71 + muurikate-v25; 298 tiedostoa,
  ei-pelitiedostot poistetaan nyt ennen SHA256SUMS:ia; SHA256SUMS OK (tiiviste 6161f49c…). Seuraavaan junaan; EI ämpäriin ennen PT:n kuittausta.
- PT KUITTASI v71 (18.5x): junaan 215 (214 lukitaan v70:llä); JU vie ämpäriin TF 214:n jälkeen.
- SEURAAVAKSI: EROLISTA (lisäys 81: T-risteys, aukion sivuhallit, 04, 06, 07, C1 Taihedian-korjaukset).

## LISÄYS 89 klo 20.59 (29.10.): v72 AUKIO 03 + v73-pinnat VS:lle + OSASARJA (LUOVUTUS, konteksti 31 %)
- Tehtävät PT:ltä: 20.5x aukio 03 (kivijalka + reunakivet), 21.0x KK:n erolista /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/
  erolista-aukio-03-03b-20261029.md (LR: 1 hallin katto kovera + nurkat ylös + harjakoristeet/-eläimet, 3 Tirenge/Hongyige kaksikerroksisiksi
  todellisilla paikoilla, 4 porttirakennuksen päätyihin lasitiilikatto + kannatinvyö, 5 terassikaiteet erillisiksi pylväiksi/johteiksi; mitat oikeat;
  Codex-osat pysyvällä luvalla, hae ensin vanhat: K/codex-mallit-v2, K/c1-v*, K/c2-v*), 21.3x OSASARJA (spesi …/keskustelukanava/osasarja-juoksupeli-20261029.md).
- AUKIO 03 = Taihemenin (f-taihemen, paikka_pohja 7,337 / −216,159, rakennukset.json) pohjoiset porttimuurit (paikalliset x −9,2…−7,2 ja 5,0…7,0,
  z 21…41,7 = maailma −195…−174,5). Kivijalka oli V4_stone (ei V4_sokkeli). Rakennusmallit ovat PAIKALLISESSA kehyksessä (tunnistekuva:
  scratchpad-työkalu tunnisteet2.py tiedosto@x,z). PELI PIIRTÄÄ F:n LOD0:n C2-paketin f-taihemen-lod0-kaiteeton.glb:stä (unity.log "LOD0 kaiteeton")
  → muutokset myös sinne. Kaukana LOD1.
- UUSI K/tyokalut/aukio_reunakivi.py (kujan reunakiven profiili 0,25 × 0,32, viiste 0,02, V4_kujakivi_reuna, kivet 0,7 ± 0,1, UV kuten kujissa,
  kiertosuunta normaalin mukaan) + portti_kivijalka.py KORKEUS=1.8. Ketju K/tyokalut/aja_v143_pari.zsh: rakennukset-v130/kielletty-rakennukset-v54
  (lod0+lod1), yksikerros-v115 (taustan 2-1 poikittainen kivireuna z −192,6 pois: konsoli_pois.py MAT=V4_kivireunus/V4_marmori), c2-v5/kielletty-c2-v4.
- v72 = K/tyokalut/paketti_v72.py: _valmiit/juoksupeli-kk-lavastaja-v72-vienti-20261029 = v71 + rakennukset-v54 + tausta-v72 + kielletty-c2-v4;
  314 tiedostoa, SHA256SUMS OK (tiiviste d3af58a6…). Pari havainne-editori-20261029-205230 (03/03b, juuri H/juuri-pk7-v72 = PK:n juuri-pk7-v71
  + linkit). Kivijalka/reunakivi näkyvät lämpiminä (valokartta) → VS. PT:lle ja PK:lle ilmoitettu; EI ämpäriin ennen PT:n kuittausta.
  PK: koodiin tausta-v72, rakennukset-v54, MuurikateC2Kansio "kielletty-c2-v4/".
- TARKISTUS PT:lle: porttimuurit z −195…−174,5 eivät ole OSM:ssä (Taihemenin alusta päättyy z −200, portaat −188) → PT:n päätös, ei muutettu.
- v73-POHJA (VS 21.3x, erolista 2): K/tyokalut/hallit_pinnat.py (V4_wood ← Codex 1070 ristikko-pariovi, u-toisto max(1, round(w/(h·0,37))),
  kapeat < 0,6 m vakio-UV kehykseen; V4_palkkivyo ← 1067 u/(4·vmax)); ketju aja_v144_pari.zsh → rakennukset-v131/kielletty-rakennukset-v55
  (a–d, f, g-*, l, m, n, o, u; ei p-, t-) + c2-v6/kielletty-c2-v5, juuri H/juuri-pk7-v73. VS ajaa parin; paketti v73 vasta VS:n/PT:n jälkeen
  (paketti_v72.py mallina: rakennukset-v55, c2-v5).
- OSASARJA: PT hyväksyi suunnitelman (12 osaa, 0,1 m ruudukko / 2 m moduuli, origo alareunan keskellä seinälinjalla, +Z pituus, +X kadulle,
  metrinen UV kujakivien tiheydellä; lähde kujien v71). MUOTO = PK:n: kielletty-osasarja-vN/ osat.glb (nimetyt osat) + ladonta.json (polut
  pohja.json-kehyksessä). PK lähettää esimerkin (yksi aukion muuri) → sovittu muoto 1 rivillä PT:lle → ensimmäinen osaerä + B-kirjaus
  (docs/tuotanto/tekotavat/3d-ja-kuvat.md "Juoksupelin osasarja": osat, ruudukko, Splines-ladonta, jaettu pintasarja, pintatarkistus) SAMASSA PR:ssä.
- SEURAAVAKSI: (1) PT:n kuittaus v72 / VS:n pari v73; (2) PK:n osasarjaesimerkki → osasarja v1; (3) erolistan 1, 3, 4, 5 rinnakkain.
- PT KUITTASI v72 (21.1x): junaan 215; JU vie TF 214:n jälkeen.
- PT:N TAIHEMEN-PÄÄTÖS (21.1x, omistaja 20.10. 07.30): tekaistut pohjoiset porttimuurit (f-taihemen paikalliset z 21…41,7 = maailma −195…−174,5;
  V4_red + kivijalka + reunakivi + muurikate/C3 niiden päällä) POIS v73:ssa; käytävä päättyy todelliseen kohtaan (alusta −200, portaat −188).
  ENNEN POISTOA: varmista PK:lta, ettei juoksurata/törmäykset (f-taihemen-tormays.glb)/botti nojaa niihin; jos nojaa, PK korjaa samassa erässä.
  Poisto kaikista: rakennukset lod0/lod1/lod2 + tormays, c2:n kaiteeton LOD0, muurikatteen/C3:n palat muurien päällä (tarkista tunnistekuvalla).

## LISÄYS 90 klo 21.2x (29.10.): TAIHEMENIN MUURIT POIS (v132), LOD1-KORISTEET (v133), LOD1/2-PINNAT (v134), PIKKUTIILI (v148 ajossa) — LUOVUTUS (konteksti 30 %), ALOITA TÄSTÄ
K = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/kielletty-rakennukset, H = …/havainne-kuja40.
- PK 21.2x: pohjoismuurit EIVÄT nojaa reittiin/bottiin/avauslentoon; törmäys esto.bin:stä → PK leipoo eston v73:lla samassa erässä.
- rakennukset-v132/kielletty-rakennukset-v56 + c2-v7/kielletty-c2-v6 (K/tyokalut/aja_v145_taihemen.zsh, konsoli_pois.py nyt ohittaa tyhjät
  primitiivit): f-taihemen paikalliset x −9,6…−6,8 / 4,6…7,4, z 20,9…42,2 kaikki muurin pinnat pois lod0/1/2 + törmäys + C2:n kaiteeton LOD0;
  V4_marmori (portaiden pää) ja C2-pylväs (12,07; −194,53) jäävät. Muurikatteessa/taustassa ei muurien paloja. Kuvat K/taihemen-v145/.
- Erolista 1 (KATTO): pelin 03-kamera on 150–450 m:n päässä → LOD1 (PK:n rajat Lod1 150, Lod2 450). LOD1:stä puuttuivat chiwen ja harjaeläimet.
  UUSI K/tyokalut/kopioi_koristeet.py (LOD0:n katto-solmun V4_chiwen/V4_harjaelain → LOD1) + tausta_koristekortti.py → siluettikortit;
  ketju aja_v146_koristeet.zsh → rakennukset-v133/kielletty-rakennukset-v57 (16 mallia; t-portit pois, niissä jo kortit). LOD0:n alakatto on JO
  kovera ja nurkat nousevat ~1 m (räystäs y 18,82 → 19,81, ulos 2,2 m) → muotoa ei muutettu. Väri = VS (41a2eac22 kullankeltainen).
  JAKO (PT 21.3x): NUI tekee g-taihedianin LOD1-katon muodon, julkisivun LOD1-UV:t ja kaiteet osasarjan osista; LOD1-tiedoston vuoro annettu
  NUI:lle (älä kirjoita g-taihedian-lod1/2:een ennen kuin NUI palauttaa polun).
- VS 21.3x: hallit_pinnat.py myös LOD1/2:een → rakennukset-v134/kielletty-rakennukset-v58 (aja_v147_lod12.zsh; palkkivyö kaikkiin, ovia LOD1/2:ssa
  vain o:ssa). Taustan 20 palaa EI (V4_wood kaukona usein umpiseinää) – VS:lle kerrottu, odottaa vastausta.
- Erolista 3 (Tirenge/Hongyige): taustassa (2-1 / 1-1) jo kaksikerroksiset LOD0:ssa ja LOD1:ssä todellisilla paikoilla (103,9; −105,8 /
  −99,4; −114,0); 03-kamerasta ~49° sivulla eli kuva-alan ulkopuolella; kuvan reunojen matalat rakennukset ovat sivukäytäviä. Kuvat K/tirenge/.
- Erolista 4 (porttirakennus etualalla) = juuri poistetut tekaistut porttimuurit (03:n molemmat reunat, 03b oikea) → ratkeaa PT:n poistopäätöksellä.
- Erolista 5 (kaiteet): F/G:n C2-palat piirtyvät vain rakennuksen LOD0:n kanssa (< 150 m) → 03:sta Taihedian on LOD1 ja kaide litteä.
  Ratkaisu PK/PT: C2-LOD1-palat myös LOD1-etäisyydelle (G 4 598 palaa) tai NUI:n osasarjakaide. EI vielä kerrottu PT:lle → kerro.
- PIKKUTIILI (PT 21.2x, PK:n palatsipinnat.py): K/tyokalut/aja_v148_pikkutiili.zsh (portti_kivijalka.py VANHA=V4_stone/V4_sokkeli/V4_sokkeli_kansi,
  ei KORKEUS/YMIN, lod1/2 PIENENNA=256) → rakennukset-v135/kielletty-rakennukset-v59, yksikerros-v116/kielletty-tausta-v58,
  muurikate-v22/kielletty-muurikate-v26 (kk-muurikate-v26-pohja.glb), c2-v8/kielletty-c2-v7, juuri H/juuri-pk7-v77 (vanhoilla nimillä).
  AJOSSA luovutushetkellä (loki /private/tmp/claude-502/lr/v148.log; valmis = "VALMIS v148m"). Tarkista: python3 -I tyokalut/havainne/palatsipinnat.py
  (natiivirepo, PK) juurelle juuri-pk7-v77 → 0 kiellettyä. AVOIMET (kuja 01, omistajan lukitsema; juhlasali/puutarha/tyohuone/varasto
  V4_sokkeli + _kansi ~900 kolm.) EI muutettu → kysy PT:ltä. V4_jalkakivi ei vielä laskettu. Huom. palatsi-pinnat.json: V4_stone-jalustan
  korvaaja voi olla V4_marmori; nyt kaikki → kujakivi (a-meridiaaniportti 208, m-puutarha 910 kolm.) → tarkista kuvalla.
- PARI: H/juuri-pk7-v75 REF=41a2eac22 MALLIT=file://…/juuri-pk7-v75/ → lokit/havainne-editori-20261029-211347: 03-kuva EI KELPAA (kamera
  kujassa, ei aukiolla; tieto.txt:ssä ei paketit-riviä) → selvitä (MALLIT-polku / 03:n sijoitus) ja aja uudelleen v77:llä. Juoksun aikana
  odota muiden editoriajot (pgrep -f Esikatselu.Aja).
- v73-PAKETTI: K/tyokalut/paketti_v73.py valmiina mutta osoittaa v132/c2-v7:ään → päivitä v135 / c2-v8 / tausta-v58 (nimellä kielletty-tausta-v73)
  / muurikate-v26 + PK:lle uudet kansionimet; EI ämpäriin ennen PT:n kuittausta.
- OSASARJA v1 (omistaja hyväksyi 21.07; PK:n muoto natiivirepo f88ee94e7 tyokalut/osasarja/MUOTO.md + esimerkki-ladonta.json): EI ALOITETTU.
  Mitat kujien v71:stä (kuja 02 länsimuuri): kivijalka 0–1,8 (V4_kujakivi_sokkeli, ulkonee ~0,08–0,24), V4_red 1,86–3,84, friisi
  V4_palatsi_friisi 3,90–4,12, räystäänalus V4_raystas_alus_puu 3,84–4,35, V4_konsoli 4,30–4,52, C3 1057 (2,06 × 0,514 × 1,8; K/codex-mallit-v2)
  4,53–5,05. Esimerkki: yksi aukion 03 muuri (seina-2m, kulma-ulko, kulma-sisa, paaty + profiilit kivijalka ja reunakivi 0,25 × 0,32) →
  K/osasarja-v1/kielletty-osasarja-v1/osat.glb + ladonta.json → PK:lle; polku ja nimet myös NUI:lle ja Karttasepälle (PT 21.1x).
- SEURAAVAKSI: (1) v148 valmis + palatsipinnat-tarkistus; (2) pari v77 (03/03b); (3) PT:lle 3 riviä (muurit pois, LOD1-koristeet, kohdat 3–5,
  pikkutiili, avoimet-kysymys); (4) paketti v73; (5) osasarja v1.
- 21.2x: v148 VALMIS ("VALMIS v148m"); oma laskenta (V4_stone/V4_sokkeli/_kansi) = 0 rakennukset-v135, tausta-v58, muurikate-v26, c2-v7. Avoimet ja V4_jalkakivi tarkistamatta. PT:lle ilmoitettu 21.2x.
- PT 21.3x KUITTASI v148 + Taihemenin muurien poiston (kuvat taihemen-v145, tirenge katsottu). AVOIMET (kuja 01) EI muuteta nyt (omistajan hyväksymät 18.22, juna 214); osasarja korvaa ne myöhemmin pariajolla todennettuna. Kohdat 3 ja 4 ok selityksin; kohta 5 (kaiteet LOD0 < 150 m) → NUI.

## LISÄYS 91 klo 21.4x (29.10.): OSASARJA v1 + LOD2, PAKETTI v73, PORTTI 06 ODOTTAA PK:N VASTAUSTA (LUOVUTUS, konteksti 30 %) — ALOITA TÄSTÄ
K = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/kielletty-rakennukset, H = …/havainne-kuja40.
- OSASARJA v1 (PT kuittasi, PK kuittasi 03d1603fa, PR 5619 B-kirjaus mergetty): K/osasarja-v1/kielletty-osasarja-v1/ osat.glb, osat-lod1.glb,
  osat-lod2.glb (vain kaide-pylvas 10 kolm. V4_marmori + kaide-johde-1.5m kortti V4_marmorikaide MASK, NUI:n pyyntö), ladonta.json ("osat"-taulu:
  pituus/vahennys; profiilit kivijalka, -kansi, reunakivi + -taka), LAHTEET.md, SHA256SUMS. Tekijä K/tyokalut/osasarja_v1.py, ladontakoe
  osasarja_koe.py (koekuvat K/osasarja-v1/koe-*.png), johde_kortti.py (1062:n etukuva). Muuri 0,72; kulmat 90° (sama pilari, vähennys 0,72/0),
  päädyt paaty-alku/-loppu 0,88. Codex-pinnat PT 21.5x: C3_muurikate, C2_marmorikaide_pylvas, C2_marmorikaide_johde, C2_vesisylkija
  (VS materiaalit pintasarja.json:iin, PK sallittuihin; viestit lähetetty). PK latoo (juuri-pk7-v72, 8 kohdan pari → PT); koe-* rajataan pois.
- PT:n päätökset 21.5x: kaiteet LOD1-etäisyydelle = NUI:n osasarjakaide (ei C2-LOD1-paloja); tripo_mat_* vain Codexin A-osien omissa glb:issä.
- PAKETTI v73 (PT KUITTASI): _valmiit/juoksupeli-kk-lavastaja-v73-vienti-20261029 (paketti_v73.py): rakennukset-v59 (= v135), c2-v7 (= c2-v8),
  tausta-v73 (= yksikerros-v116), muurikate-v26; 314 tiedostoa, SHA OK; kielletyt vain avoimissa (kuja 01, PT: ei muuteta). PK:lle ja VS:lle ilmoitettu.
- PARI 03/03b v77: taustalla odottaa NUI:n editoriajoa (scratchpad-skripti pari_v77.zsh: REF=41a2eac22 MALLIT=…/juuri-pk7-v77/ PELIKAMERA=1
  editori-lr.sh 03 03b) → tulos proto-3d/lokit/havainne-editori-<aika>/03. Vanha 211347-kuva ei ollut kameravika: keisari tekaistujen
  pohjoismuurien välissä (poistettu v132:ssa). Katso uusin havainne-editori-*-kansio; jos ei ole, aja uudelleen samoilla arvoilla (pgrep ensin).
- PORTTI 06 (KS, juna 215): KS muotoili a-meridiaaniportin (/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/portti06-215/vie-k4/ lod0–2 + tormays
  + rakennukset.json). LR LUPASI ajaa rakennukset-v136 = v135 + uusi portti, muut ennallaan; EI omia muotomuutoksia porttiin. Vaiheet
  (a-:n hash muuttui v54, v87p, v131, v133, v134, v135): 1) c1_raystaat2.py uudesta katosta → uusi c1-v5/a-meridiaaniportti.json +
  c1_vanha_leikkaus.py (aja_c1_vanha_v54.zsh mallina) + c1_sijoitukset.py → uusi kielletty-c1-paketti; 2) palatsi_pinnat.py VAIHEET=katto
  (aja_ketju_v87.zsh); 3) hallit_pinnat.py lod0/1/2; 4) kopioi_koristeet.py + tausta_koristekortti.py; 5) portti_kivijalka.py ×3 (v148); pintatarkistus.
  ESTE: vie-k4:ssä ei TEXCOORD_1/2 eikä valo_rgbm (leivonta seis, omistaja 27.10. 10.56) → kysytty PK:lta 21.4x, miten varjostin toimii ilman
  (neutraali / UV1 = UV0 + neutraali kuva?). Aloita PK:n vastauksella; kuvat + pari 06 → KS ja PT.
- VS 21.3x: taustaan ei ovia; palkkivyö 1067 taustaan vain, jos ei sini-violetti. VS ajaa parin juuri-pk7-v76:lla.
- SEURAAVAKSI: (1) PK:n valovastaus → v136 portti 06; (2) pari 03 v77 → PT; (3) erolista (lisäys 81): T-risteys, aukion sivuhallit, 04, 07,
  C1 Taihedian-korjaukset; NUI palauttaa g-taihedian-lod1-polun (älä kirjoita siihen ennen).
- 21.4x KS: portin glb:t valmiit (vie-k4, paikka/mitat/huippu ennallaan, vain katot ja räystäät). PT: KS:n parametrit palautetaan LR:n
  kk_wumen.py:hyn samassa paketissa (KS:n kopio …/portti06-215/K/tyokalut/kk_wumen.py rivit 32–40 KS06-lohko, oletukset …/portti06-215/
  k4-parametrit.json; KS kirjoittaa ne lohkon oletuksiksi) → kopioi lohko K/tyokalut/kk_wumen.py:hyn v136:n yhteydessä (diff ensin).
- 21.4x PK: v73 koodissa (osasarja-215 5c924489e), esto leivottu uudelleen → palatsi-esto-v16 (_tyo/pelikoodari/kuja05-pk6-20261029/).
  C3_/C2_-nimet sallituissa; osasarja juuri-pk7-v73:ssa. Pintatarkistus v73 0 vikaa, mutta VANHAT PINNAT (LR:n, ennen 'vika'-tilaa):
  ulkorengas-v5 (V4_stone, 24 lod2), kulmatorni-v1b (V4_stone, 1), muurikate-v18:n C3-vanha kate kk_muurikate_vanha_* (V4_sokkeli/_kansi, 2)
  → portti_kivijalka.py VANHA=… (lod2 PIENENNA=256) näille + uudet versiot PK:lle. Avoimet-v51 (8) lukittu, ei.
- 21.4x PK VASTASI (ESTE POISTUI): aja rakennukset-v136 ILMAN leivontaa; älä lisää UV1:tä eikä valo-kuvaa (peli: vertailuvalo, valo_rgbm ei
  lueta; JuoksuV4Maailma.cs:536). TÄRKEÄ: ÄLÄ aja lisaa_valo.py:tä uudelle portille (aja_c1_vanha_v54.zsh tekee sen) – valo_rgbm ilman UV1:tä
  = atlasta luetaan kohdasta (−1, −1). Tarkista lopuksi, ettei a-meridiaaniportti-lod*.glb:ssä ole valo_rgbm-kuvaa.

## LISÄYS 92 klo 22.0x (29.10.): PORTTI 06 = rakennukset-v136, A3/A5 PORTTIIN, JÄÄNTEET, PAKETTI v74 — ALOITA TÄSTÄ
K = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/kielletty-rakennukset, H = …/havainne-kuja40.
- PORTTI 06: K/tyokalut/aja_v149_portti06.zsh (LAHDE = KS:n vie-k4) = c1_raystaat2.py (INSET 0.15 NALAS 0.35, UUSI DZPARI=1.0) → c1_vanha_leikkaus.py
  → palatsi_pinnat.py (VAIHEET=katto,friisi VV_FRIISI=v02 KATTO_M=1.6 VV_KATTO=v01c = v87p) → hallit_pinnat lod0 → kopioi_koristeet + tausta_koristekortti
  → hallit_pinnat lod1/2 → portti_kivijalka ×3 (v148). EI lisaa_valo/UV1 (tarkistettu: ei valo_rgbm). REGRESSIO: KOE=1 LAHDE=rakennukset-v52 → geometria,
  UV ja materiaalit = v135 (lod0/1/2 SAMA). Tulos K/portti06-v149 → rakennukset-v136/kielletty-rakennukset-v60 (rakennukset.json a- KS:n arvoilla).
  kk_wumen.py ← KS:n KS06-lohko (vanha talteen portti06-v149/kk_wumen.py.ennen-ks06).
- C1 (c1-v5, kielletty-c1-v5, juuressa nimellä kielletty-c1-v3): uusien kulmien nousu → nurkan ketjupäiden ero 0,82 m > 0,8 → c1_raystaat2.py:hyn DZPARI
  (oletus 0,8 = ennallaan). Löytyy päälinna 2 + paviljongit 8 rengasta (756 × 1055, 40 paria). SIIPIHALLIT ILMAN C1:TÄ: niiden räystäs on avoin ketju
  (paviljongit peittävät päädyt) → vaatii avoimen ketjun tuen; vanha reuna siivissä ehjä (leikkaus vain C1:n alta). Kuvat c1-v5/*.png. AVOIN.
- A3/A5 (PT 21.5x): K/tyokalut/a3a5_portti.py → K/a3a5-v1/: A5 ×499 vanhojen pylväs+nuppi-parien tilalle (väli 1,47), A3 ×4 paviljonkien huipuille (z 30,86,
  KS:n kultaisen harjapään päälle); A5:n aukko vain z 0,89–0,95 → vanhat vaakajohteet jäävät (ei osasarjan johdetta). Kuvat a3a5-v1/v1-*.png.
  Paketti c2-v9/kielletty-c2-v8 = c2-v7 + a3/a5 glb + a3a5-sijoitukset.json + a-meridiaaniportti-lod0-kaiteeton.glb.
- JÄÄNTEET (PK 21.4x): aja_v150_jaanteet.zsh → K/jaanteet-v150/kielletty-ulkorengas-v6, -kulmatorni-v1c, -muurikate-v27 (0 V4_stone/sokkeli, paitsi törmäys).
- PAKETTI v74: paketti_v74.py → _valmiit/juoksupeli-kk-lavastaja-v74-vienti-20261029 (362 tiedostoa, SHA OK, SHA256SUMS ab066ec5). PK:lle ja PT:lle ilmoitettu 22.0x;
  EI ämpäriin ennen PT:n kuittausta.
- PARI: scratchpad pari_v78.zsh (REF=41a2eac22 MALLIT=H/juuri-pk7-v78 PELIKAMERA=1: 03 03b, sitten 06) jonossa; tulos proto-3d/lokit/havainne-editori-<aika>/.
  Odotussilmukka ajetaan TIEDOSTOSTA (zsh pari.zsh): komentorivillä oleva "Esikatselu.Aja" saa pgrepin odottamaan itseään.
- SEURAAVAKSI: (1) parit 03/03b/06 → PT + KS; (2) PT:n kuittaus v74; (3) siipihallien C1 (avoin ketju); (4) erolista: T-risteys, sivuhallit, 04, 07.

## LISÄYS 93 klo 22.1x (29.10.): PT:N v74-PALAUTE KORJATTU → PAKETTI v75 — LUOVUTUS (konteksti 30 %), ALOITA TÄSTÄ
- PT 22.1x (v74 EI ämpäriin): 1) kaide läpikuultava/ilman paneelia, 2) c1-kuvassa vanhat pylväät, 3) baodingin jalusta tasavärinen laatikko.
- KORJATTU a3a5_portti.py v2 → K/a3a5-v2/: 1062-paneelit pylväsväleihin (493; naapuri 1,0–1,8 m, lähin per suunta, pylvään pinnasta pintaan, sx = väli/1,5),
  vanhan kaiteen vaakaosat pois (32 saarta), harjapää (V4_gold ≤ 1 m huipusta) → V4_palatsi_katto laatikko-UV 1,6 m. Pylvään tunnistus pienimmällä
  rajauslaatikolla (pisin vaakasärmä = kolmion lävistäjä → 0 osumaa). Kuvat a3a5-v2/v2-{kaide,huippu,yleis}.png (esikatselu: scratchpad a3a5_kuva.py).
  2) = c1-v5-kuva on lähdemallista ilman sijoituksia (selitetty PT:lle).
- c2-v10/kielletty-c2-v9 = c2-v9 + v2-tulokset. PAKETTI v75 (paketti_v75.py): _valmiit/juoksupeli-kk-lavastaja-v75-vienti-20261029, 362 tiedostoa, SHA OK
  (8fb4dc3d), MuurikateC2Kansio "kielletty-c2-v9/". PT:lle ja PK:lle ilmoitettu 22.1x; v74 vanhentunut. EI ämpäriin ennen PT:n kuittausta.
  Pelissä A3/A5/1062 näkyvät vasta PK:n a3a5-sijoitukset-luvulla → PT:n "kaide samasta kulmasta" -kuva PK:n pariajosta.
- PARI 03/03b/06 (juuri-pk7-v78; rakennukset-v136 + c1-v5, EI A3/A5): pari_v78.zsh taustalla odottaa editorijonoa (PK ja NUI ajoivat 22.0x).
  Jos sessio nollautui ennen tulosta: tarkista uusin havainne-editori-*-kansio (esikatselu.txt: REF 41a2eac22) tai aja uudelleen
  `zsh <scratchpad>/pari_v78.zsh` (sisältö lisäyksessä 92). Kuvat → PT + KS (local_ddd980b0-2760-4c5d-a0c8-d65ad1ecb757).
- SEURAAVAKSI: (1) pari → PT + KS; (2) PT:n kuittaus v75; (3) siipihallien C1 (avoin ketju); (4) erolista: T-risteys, sivuhallit, 04, 07.

## LISÄYS 94 klo 22.3x (29.10.): SIIPIHALLIEN C1 (v76 ÄMPÄRIIN), TAKASEINÄT 1070/1071, NIMITAULU (vie-k5), PARI v79 — LUOVUTUS (konteksti 30 %), ALOITA TÄSTÄ
K = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/kielletty-rakennukset, H = …/havainne-kuja40.
- SIIPIHALLIEN C1: c1_raystaat2.py v6, lippu AVOIN=1 (ilman lippua tavulleen ennallaan, tarkistettu c1-v5:tä vasten). Siiven räystäs = kaksi ristikkäistä
  U-ketjua (mallissa päädyissä kaksi räystäsviivaa 0,9 m:n välein; huippu = nostettu nurkka) → rengas = A kokonaan + B huipusta A:n alkua lähimpään
  pisteeseen; sisäketjujen keskusta AVOIN-tilassa rakennuskohtainen (_rak). Tulos: portti 1126 palaa, 48 nurkkaparia. Kuvat K/c1-v6/kuvat/siipi-koonti.png.
- PAKETTI v76 (PT KUITTASI ämpäriin 22.2x, JU:lle SHA caab69f6…): _valmiit/juoksupeli-kk-lavastaja-v76-vienti-20261029 (paketti_v76.py; aja_v151_siipi_c1.zsh):
  kielletty-rakennukset-v61 (= rakennukset-v137), -c1-v6, -c2-v10 (MuurikateC2Kansio). PK:lle ilmoitettu.
- PT 22.2x: siipien pylväikön takaseinä ruskea → havainne-06:n punaiset ristikko-ovet ja -ikkunat. K/tyokalut/portti_takaseinat.py: V4_woodin metriset
  jänteet (siivet 2 × 11 à 5 × 4,7 m, päälinnan etuseinä 5, paviljongit 4) omiin primitiiveihin: keskeltä vuorotellen OVI (V4_wood ← 1070, u-toisto kuten
  hallit_pinnat) ja IKKUNA (V4_ristikko ← 1071, 0,9 m kuten avoimet_pinnat); muut V4_wood-kolmiot karmivakioon. Kuvat K/takaseinat-v152/v1-koonti.png.
- KS 22.3x: nimitaulu vie-k5:ssä (V4_nimitaulu, UV 0–1); KS:n kk_juoksu/vie/kk_wumen-muutokset kopioitu K/tyokalut/:iin (vanhat *.ennen-nimitaulu).
  nimitaulu_kuva.py upottaa 1270:n (clamp). aja_v153_nimitaulu.zsh → K/rakennukset-v139/kielletty-rakennukset-v63 (= v137 + portti vie-k5:stä
  C1 + takaseinät + nimitaulu; rakennukset.json a- = vie-k5) + c1-v7 (sijoitukset tavulleen c1-v6).
- VS 22.2x: V4_paaharja = 1268 (pääharjan nauha, U toisto, V 0–1), V4_keskiovi = 1269 (→ NUI välitetty), V4_nimitaulu = 1270 (→ KS, tehty). Pääharja LR:n
  palatsi_pinnat-ketjuun: AVOIN (seuraava iso työ). PK: Codexin A2 #1250–1252 tullut (3/12), harjarivit vasta kun 12.
- PARI v79 (scratchpad pari_v79.zsh: H/juuri-pk7-v79 = v78 + kielletty-rakennukset-v53 → rakennukset-v139, kielletty-c1-v3 → c1-v6; 06 ensin, sitten 03 03b)
  odottaa editorijonoa. Jos nollautui: uusin havainne-editori-*/06 (esikatselu REF 41a2eac22) tai aja uudelleen (sisältö: kuten pari_v78 lisäyksessä 92,
  MALLIT juuri-pk7-v79, kohdat 06 ja 03 03b). 06-kuva PT:lle + KS:lle (havainne-06:n kulma = editorin kohta 06).
- SEURAAVAKSI: (1) pari 06 → PT + KS; (2) PAKETTI v77 = v76 + kielletty-rakennukset-v63 (rakennukset-v139) + c1-v7 + c2: a3a5_portti.py uudesta lod0:sta
  (kuten aja_v151_siipi_c1.zsh:n C2-osa) → PT:n kuittaus; (3) V4_paaharja 1268; (4) erolista: T-risteys, sivuhallit, 04, 07.

## LISÄYS 95 klo 22.4x (29.10.): PAKETIT v77 JA v78 (PÄÄHARJA 1268), PARI v79 AJOSSA — ALOITA TÄSTÄ
K = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/kielletty-rakennukset, H = …/havainne-kuja40.
- PARI v79 kuoli nollauksessa → ajettu uudelleen (scratchpad pari_v79.zsh, sama sisältö: 06 ensin, sitten 03 03b; odottaa editorijonoa).
  Tulos uusimmassa proto-3d/lokit/havainne-editori-*/06 (esikatselu REF 41a2eac22, paketit-rivillä juuri-pk7-v79). 06-kuva → PT + KS.
- C2 uudesta portin lod0:sta: tyokalut/aja_v154_c2.zsh → a3a5-v4 + c2-v12/kielletty-c2-v11 (sijoitukset = v3, vain lähdepolku).
- PAKETTI v77 (paketti_v77.py) = v76 + kielletty-rakennukset-v63 (= rakennukset-v139) + c1-v7 + c2-v11: 357 tiedostoa, SHA OK. KORVATTU v78:lla.
- PÄÄHARJA 1268 (VS 22.2x, pintasarja V4_paaharja: U toisto, V clamp, PintaKiinni 1): UUSI tyokalut/paaharja.py – pääharja = V4_gold-laatikko
  (10 kolm.: 4 pystykylkeä + kansi, korkeus 0,8–3 m, pituus ≥ 4 m); kyljet → V4_paaharja, v = yläreunasta 0–1, u = vaakamatka / (4 · korkeus); kansi jää.
  aja_v155_paaharja.zsh → rakennukset-v140/kielletty-rakennukset-v64 (a, b, c, d, f, g-baohedian, l (2 harjaa), u lod0/1; g-taihedian vain lod0,
  LOD1 NUI:lla – NUI:lle työkalu kerrottu) + c2-v13/kielletty-c2-v12 (a-/f-kaiteettomat LOD0). lod2:ssa ei laatikoita. Koekuva K/paaharja-koe/g-taihedian-harja.png.
  Ei mukana (harja ei laatikko): g-zhonghedian (pyramidi), m, n, o, t-katokset, tausta → PT:ltä kysytty, halutaanko.
- PAKETTI v78 (paketti_v78.py) = v77 + rakennukset-v64 + c2-v12 (MuurikateC2Kansio "kielletty-c2-v12/"): 357 tiedostoa, SHA OK, SHA256SUMS 7aec46c5.
  PT:lle, PK:lle, NUI:lle ja VS:lle ilmoitettu 22.4x. EI ämpäriin ennen PT:n kuittausta.
- SEURAAVAKSI: (1) pari 06 → PT + KS; (2) PT:n kuittaus v78 (+ vastaus muiden harjojen kysymykseen); (3) erolista: T-risteys, sivuhallit, 04, 07.

## LISÄYS 96 klo 22.5x (29.10.): v78/v80 KUITATTU, OVET, ULKORENGAS-v7 (KERROSTALOT → PUUT), PARIT 06 JA 07 JONOSSA — ALOITA TÄSTÄ
- PT KUITTASI v78 (22.42) → JU hylkäsi (alikansion A3A5-LAHTEET.md) → K/tyokalut/paketti_md_juureen.py siirsi .md:n juuren LAHTEET.md:hen;
  pakettiskripteihin .md-suodatus. v79 (= v78 + Taihedianin ovet, aja_v156_ovet.zsh: NUI:n ovet_uv.py g-taihedian-lod0:aan → rakennukset-v141/
  kielletty-rakennukset-v65) nimetty v80:ksi korjauksen kanssa: _valmiit/juoksupeli-kk-lavastaja-v80-vienti-20261029, SHA256SUMS 29901808.
  PT KUITTASI v80 JU:lle vientiin. NUI ajoi pääharjan g-taihedianin LOD1:een itse.
- EROLISTA (PT 22.5x): T-risteys ja 04 OHI (kuja 01 lukittu 18.22). 07: UUSI K/tyokalut/rengas_puistoksi.py (kerrostalot = ruudut 4 m, joiden
  V4_harmaa/V4_teal yli 8 m; julkisivut helma_*-solmuissa; laajennus 2 ruutua + leijuvat kultakatot 4 ruudun säteellä; SUOJA: V4_red yli 9 m ja
  punainen ala ≥ harmaa/teal 3 × 3 ruudussa → Tiananmen/Duanmen säilyvät) + rengas_puurivi.py (vallihaudan eteläranta z −499/−507, portti auki).
  Ketju aja_v157_ulkorengas.zsh → K/ulkorengas-v7/kielletty-ulkorengas-v7. Koekuvat K/rengas-koe/ (v7-koe.png, etu-pari.png, 41-pari.png).
- PARIT: scratchpad pari_v79.zsh (06, 03, 03b; juuri-pk7-v79) ja pari_v80_07.zsh (07; H/juuri-pk7-v80 = v79 + ulkorengas-v7 nimellä
  kielletty-ulkorengas-v5 + rakennukset-v141 + c1-v7 + c2-v13) taustalla editorijonossa. Nollauksen jälkeen: uusin havainne-editori-*/06 ja */07;
  puuttuvat ajetaan uudelleen samoilla arvoilla. 06 → PT + KS (nimitaulu + takaseinät); 07 → PT (tasainen vertailuvalo).
- SEURAAVAKSI: (1) parit → PT; (2) PT:n kuittaus ulkorengas-v7 → paketti v81 (= v80 + kielletty-ulkorengas-v7); (3) loput 07:stä (muuri/kulmatornit
  tarkistus) ja 06 (portin etupiha) pariajon perusteella.

## LISÄYS 97 klo 22.5x (29.10.): LUOVUTUS (konteksti 35 %) — PAKETTI v81 SEURAAVAKSI, ALOITA TÄSTÄ
K = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/kielletty-rakennukset, H = …/havainne-kuja40.
- NUI:n g-taihedian LOD1/2 (halli-215/v3; PT kuittasi halli 215:n) → aja_v158_nui_lod12.zsh → K/rakennukset-v142/kielletty-rakennukset-v66
  (= v141 + ne). H/juuri-pk7-v80:n kielletty-rakennukset-v53 osoittaa nyt v142:een (pari 07 käyttää sitä).
- PT 22.5x: PAKETTI v81 = v80 + kielletty-ulkorengas-v7 (ulkorengas-v7, aja_v157) + kielletty-rakennukset-v66 (v142) + NUI:n kaiteet
  /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/halli-215/halli-kaiteet-v2/ (osat.glb, ladonta.json; kysy NUI:lta/PK:lta kansionimi pelissä,
  esim. kielletty-halli-kaiteet-v2) + KORJAUS: kaiteen johde näkyy kirkkaan valkoisena nauhana 03/03b:ssä (PT:n kuvat-pari5) → johteen sävy samaksi
  marmoriksi kuin pylväät (vertaa johteen ja pylvään materiaalien baseColor/kuva osat.glb:ssä; johde_kortti.py teki osasarjan kortin 1062:sta).
  Pohja paketti_v79.py (nimeä paketti_v81.py, A = v80-kansio, .md-suodatus mukana). Ulkorengas-v7 ensin (pari 07 PT:lle), sitten kaikki samaan v81:een.
- PARIT taustalla (scratchpad pari_v79.zsh, pari_v80_07.zsh; prosessit voivat kuolla nollauksessa): tarkista uusin havainne-editori-*/06 ja */07,
  aja puuttuvat uudelleen (lisäys 96). 06 → PT + KS, 07 → PT.

## LISÄYS 98 klo 22.58 (29.10.): VS:N PYYNTÖ — PÄÄHARJA MYÖS g-taihedian LOD2:EEN (rakennukset-v143), JUURI juuri-pk7-v81
- VS 22.5x: v78:ssa (rakennukset-v64) V4_paaharja vain g-taihedian-lod0:ssa; 03/03b piirtää hallin LOD1:nä → harja tasainen keltainen.
  LOD1:ssä harja on jo v142:ssa (NUI:n halli-215/v3). LOD2:ssa ei ollut harjaa lainkaan (katto päättyy 33,35:een).
- UUSI K/tyokalut/harja_lod2.py (LOD1:n katto-meshin V4_paaharja-primitiivi + kultakansi → LOD2:n katto-mesh, tekstuuri mukana) +
  aja_v159_harja_lod2.zsh → K/rakennukset-v143/kielletty-rakennukset-v67 (= v142 + g-taihedian-lod2 harja: 8 kylki- + 2 kansikolmiota).
- H/juuri-pk7-v81 = v80, kielletty-rakennukset-v53 → v143. VS:lle ilmoitettu (saumatarkistus v81-juurella).
- PAKETTI v81 (lisäys 97): käytä kielletty-rakennukset-v67:ää (v143) v66:n sijaan.

## LISÄYS 99 klo 23.0x (29.10.): PAKETTI v81 VALMIS (PT:N KUITTAUS), PARIT v81 AJOSSA — ALOITA TÄSTÄ
- K/tyokalut/paketti_v81.py → _valmiit/juoksupeli-kk-lavastaja-v81-vienti-20261029 (358 tied., SHA256SUMS 00386116) = v80 + kielletty-ulkorengas-v7
  + kielletty-rakennukset-v67 (v143) + kielletty-halli-kaiteet-v2 (NUI:n halli-kaiteet-v2 + johde_savy.py: V4_marmorikaide baseColorFactor
  0,78/0,72/0,61; kuvat-pari5: nauha ~247/244/239 vs terassi ~222/210/192). Pelissä kaiteet = OsasarjaKaiteetKansio (oletus tyhjä → PK asettaa).
  PT:lle ilmoitettu; kysytty, vaihdetaanko NUI:n halli-kaiteet-v3:een (+ porrasjohteet, NUI:n pari 6). EI ämpäriin ennen kuittausta.
- PARIT: scratchpad pari_v81.zsh (juuri-pk7-v81, REF 41a2eac22, PELIKAMERA=1): 06 → 07 → 03 03b editorijonossa (vanhat pari_v79/v80_07 kuolivat).
  Kaiteet eivät ole pariajossa (vaatii REF b49275c00 + ESIKOM osasarja-kaiteet, ks. NUI:n ajo-pari-6.zsh). Tulokset → 06 PT+KS, 07 PT, 03/03b VS.

## LISÄYS 100 klo 23.3x (29.10.): v81 KUITATTU, PAKETTI v82 (vie-k6 + V4_jalusta_lohkokivi), 07-PARI AJOSSA — ALOITA TÄSTÄ
- PT kuittasi v81 (00386116) → JU. Kaiteet-v3 vasta, kun PT kuittaa NUI:n parin 6 (sama johde_savy.py siihen). Kaidekansion kytkentä = NUI:n haara (PK).
- 06-palaute (KS:n pari -231732): 1) pääharja sitruuna = VS:n pintasarja (glb-tekstuuri jo kattotiilen sävy) → PT välitti VS:lle; 2) U-jalustan
  kivijalka 0–3 m oli jo mallissa (V4_kujakivi_sokkeli, piirtyy vaaleana) → PT 23.1x: oma nimi V4_jalusta_lohkokivi (VS tekee harmaan pinnan, PK sallii nimen).
- UUSI tyokalut/jalusta_lohkokivi.py + aja_v160_k6.zsh: KS:n vie-k6 (kulmapaviljongin kerrosväli) v153-ketjulla + paaharja + jalusta → rakennukset-v144/
  kielletty-rakennukset-v68, c1-v8 (sijoitukset muuttuivat), a3a5-v5, c2-v14/kielletty-c2-v13.
- PAKETTI v82 (paketti_v82.py) = v81 + rakennukset-v68 + c1-v8 + c2-v13: 358 tied., SHA256SUMS 9734c828 → PT:lle ja KS:lle. EI ämpäriin ennen kuittausta.
- 07-PARI (PT: vain 07, 06 ajaa PK): scratchpad pari_v81.zsh (juuri-pk7-v81, REF 41a2eac22) editorin jonossa; editori-lr.sh ajetaan zsh:lla (ei suoritusoikeutta),
  ÄLÄ odota pgrep-silmukalla (muiden ajot vuorottelevat → nälkiintyy). Valmis kuva → KK + PT (tasainen vertailuvalo).

## LISÄYS 101 klo 23.5x (29.10.): v82 JA v83 KUITATTU (JU vie), TAIHEMENIN MUURIT TAKAISIN, PARIT 07 + 03/03b AJOSSA — ALOITA TÄSTÄ
- PT kuittasi v82 (9734c828) ja v83 (6840ade5). v83 = v82 + Taihemenin porttimuurit takaisin (PT 23.5x kumosi 21.3x-kuittauksen: 03/03b-havainteen
  reunaseinät = portin omat sivut): UUSI tyokalut/muurit_takaisin.py + aja_v161_muurit.zsh → rakennukset-v145/kielletty-rakennukset-v69, c2-v15/kielletty-c2-v14
  (kivijalka V4_jalusta_lohkokivi). PK leipoo eston.
- editori-lr.sh KORJATTU: MALLIT-ajoon lisätään "palatsi url ${MALLIT}kk-pohja-v1d-pk7/pohja.json" (POHJA=/POHJA_OFF=1), muuten palatsi ei lataudu
  (pohja.json median URL:sta puuttuu → loputon sokkelo; 07-ajo -233152 oli tyhjä).
- PARIT taustalla: scratchpad pari_v81.zsh (07, juuri-pk7-v81) ja pari_v83_03.zsh (03 03b, H/juuri-pk7-v83 = v81 + rakennukset-v145 + c1-v8 + c2-v15).
  Valmiit vierekkäiskuvat → KK + PT. Codex-osat (A2 12/12, A4, A1) PK:n kansiossa proto-3d/_tyo/pelikoodari/codex-osat-215/ → harjarivit PT:n luvalla.

## LISÄYS 102 klo 23.58 (29.10.): LUOVUTUS (konteksti 30 %) — v84 = PT:N 07-LINJAUKSET, ALOITA TÄSTÄ
K = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/kielletty-rakennukset, H = …/havainne-kuja40. Viimeisin paketti v83 (6840ade5, PT kuittasi, JU vie).
- 07-PARI v81 (lokit/havainne-editori-20261029-234039/07): PT: kerrostalojen poisto OK. PT:N LINJAUKSET v84:ään:
  1) Meridiaaniportin eteen EI vallihautaa eikä siltoja (todellinen paikka = Duanmenin piha); pihan pinta kiveksi/puistoksi, ei harmaita pihakaistoja.
  2) TÄRKEIN: palatsin ulkomuuri todelliseen korkeuteen (~10 m) ja paksuuteen punaisena + kulmatornit näkyviin (kielletty-kulmatorni-v1c, muurikate/tausta?).
  3) Sisäpihoille puita havainteen tiheyteen siellä, missä todellisuudessa on puita.
  Vesi on VS:n 3dc45d778:ssa (ei LR:n työ). v84 → pari 07 PT:lle (PT välittää KK:lle; roolit eivät viesti KK:lle, osoitekirja).
- PARI 03/03b v83 (scratchpad pari_v83_03.zsh, juuri H/juuri-pk7-v83, muurit takaisin) oli luovutushetkellä editorijonossa: tarkista uusin
  lokit/havainne-editori-*/03 (paketit-rivillä juuri-pk7-v83) → PT:lle; jos puuttuu, aja: cd H; REF=41a2eac22 MALLIT=file://H/juuri-pk7-v83/ PELIKAMERA=1 zsh ./editori-lr.sh 03 03b.
- Avoimet: Codex-osat A2 12/12, A4, A1 (proto-3d/_tyo/pelikoodari/codex-osat-215/) → harjarivit PT:n luvalla; kaiteet-v3 (NUI pari 6) seuraavaan pakettiin
  PT:n kuittauksella + johde_savy.py; V4_paaharja-sävy ja V4_jalusta_lohkokivi-pinta = VS.

## LISÄYS 103 klo 00.2x (30.10.): v84 VALMIS (PT:LLE), v165 = KS:n vie-k7, 03 KOHTA 4 JA A6 v2 JONOSSA — ALOITA TÄSTÄ
K = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/kielletty-rakennukset, H = …/havainne-kuja40.
- Pari 03/03b v83 (havainne-editori-20261030-000236) → PT; KK HYVÄKSYI 00.05.
- PAKETTI v84 (tyokalut/paketti_v84.py, SHA256SUMS 9effe35e) PT:lle, EI ämpäriin ennen kuittausta:
  1) tyokalut/ulkomuuri.py + aja_v162_ulkomuuri.zsh → rakennukset-v146/kielletty-rakennukset-v70: 80 mallia v-ulkomuuri-NNN (pohja.json ulkomuuri.sivut
     + Itäportin–kaakkoistornin pätkä, ≤ 40 m pätkät, kivijalka −2…1,2, V4_red, kansi 9,0, sakarat 10,0, tornijalustat). Taustan muuri oli 9,14 m ja
     eteläsivut puuttuivat kokonaan. Vallihauta muurin edessä jää (PT hyväksyi), etuhauta/sillat ei.
  2) tyokalut/piha_kiveksi.py + aja_v163_duanmen.zsh → duanmen-v163/kielletty-tausta-v74 + kielletty-ulkorengas-v8 (Duanmenin pihan maa → V4_lattia).
  3) tyokalut/puut_tihenna.py → puut-v164/kielletty-lahipuut-v7 (PT:n linja A: saavuttamattomat pihat + saavutettavien reunat 0,8–1,5 m; maskitarkistus
     peking/puut-maski-v46.npz, ettei puu nouse katosta).
  Pari 07 (+06): lokit/havainne-editori-20261030-001034, juuri H/juuri-pk7-v84.
- KS:n vie-k7 (etelän aukot korkeiksi): tyokalut/aja_v165_k7.zsh → rakennukset-v147/kielletty-rakennukset-v71 (= v146 + k7), c1-v9, c2-v16/kielletty-c2-v15,
  a3a5-v6 (sijoitukset muuttuivat hieman). Juuri H/juuri-pk7-v85; KS ajaa 06-parin. Paketti v85 vasta PT:n/KS:n kuittauksen jälkeen.
- SEURAAVAKSI (PT 00.1x): (1) 03 erolista kohta 4: Taihemenin porttimuurien (f-taihemen BOXIT muurit_takaisin.py:ssä, x −9,6…−6,8 ja 4,6…7,4,
  z 20,9…42,2, korkeus 4,0; nyt V4_gold-kate 4,0–4,48 + V4_teal + friisi 3,6–4,0) päälle porttirakennuksen keltainen tiilikatto (V4_palatsi_katto) +
  kannatinvyö; juuren reunakivi V4_kujakivi_reuna (0–0,25, ruskea) → V4_marmori. LOD0 on valoleivottu (TEXCOORD_1) → uudet osat joko omana mallina
  rakennukset.json:iin (kuten v-ulkomuuri, ei leivontaa) tai C1-räystäinä (c1-sijoitukset). Pari 03 KK:lle + PT:lle.
  (2) Codex A6 v2 sivupaviljonki (e6e88e541; T7 …/output/juoksupeli-osat-215-20261029/partial-a6-v2, SHA OK): Tirenge (+Z länteen) ja Hongyige
  (peilattuna, +Z itään; tarkista winding) omaan pakettiin → PK:n samankameran pari. V1 ei peliin.

## LISÄYS 104 klo 00.3x (30.10.): 03 KOHTA 4 TEHTY (v166, PARI AJOSSA), A6 v2 SIJOITETTU (v167 → PK:N PARI) — LUOVUTUS (konteksti 35 %), ALOITA TÄSTÄ
- 03 kohta 4: tyokalut/taihemen_siipikatto.py (oma malli f-taihemen-siipikatot: palkkivyö 1067-kuvalla 3,70–4,15, kannattimet V4_teal/V4_gold 0,8 m välein,
  keltainen tiiliaumakatto V4_palatsi_katto (UV 0,625/m), räystäs 4,50, harja 5,70) + tyokalut/taihemen_reunakivi.py (V4_kujakivi_reuna → V4_marmori
  f-taihemen lod0/1 + c2:n kaiteeton LOD0), ketju aja_v166_siipikatto.zsh → rakennukset-v148/kielletty-rakennukset-v72 + c2-v17/kielletty-c2-v16.
  Vanha V4_gold-muurikate jäi katon alle (piilossa). Esikatselu scratchpad (Blender) ok. Juuri H/juuri-pk7-v86 (= v85 + v148 + c2-v17).
  PARI 03/03b: scratchpad pari_v86_03.zsh taustalla → tulos lokit/havainne-editori-<aika>/03 → PT (PT välittää KK:lle). Jos kuoli: cd H;
  REF=41a2eac22 MALLIT=file://H/juuri-pk7-v86/ PELIKAMERA=1 zsh ./editori-lr.sh 03 03b.
- A6 v2: tyokalut/a6_sijoitus.py (Tirenge −91,97°, Hongyige peilattu 88,02°, paikat pohja.json:n päärakennussuorakaiteesta, materiaali V4_sivupaviljonki,
  LOD0–2 sama verkko, törmäys 9 m laatikko; apuri ulkomuuri_laatikko.py) + tyokalut/tausta_poista_alue.py (taustan vanhat paviljongit pois, maa jää),
  ketju aja_v167_a6.zsh → a6-v167/kielletty-rakennukset-v73 (= v148 + h-tirenge/h-hongyige) + a6-v167/kielletty-tausta-v75 (= tausta-v74 − paviljongit).
  Juuri H/juuri-pk7-v87 → PK:lle pyydetty samankameran pari + V4_sivupaviljonki pintalistaan.
- PAKETIT: v84 PT:llä (9effe35e). Seuraava paketti (v85) vasta kuittausten jälkeen: k7 (KS:n 06-pari, v147), siipikatto (03-pari, v148), A6 (PK:n pari, v167;
  PT: "omaan pakettiin" → tee A6 erilliseksi versioksi siipikaton/k7:n jälkeen tai niiden kanssa PT:n ohjeen mukaan). paketti_v84.py mallina.
- Jono muuten: erolista T-risteys, sivuhallit, 04; Codex-osat A2/A4/A1 (PK:n kansio) PT:n luvalla; kaiteet-v3 (NUI pari 6).

## LISÄYS 105 klo 00.3x (30.10.): PT:N KORJAUKSET ENNEN 03 KOHTAA 4 — LUOVUTUS, ALOITA TÄSTÄ (sitova järjestys)
- v84 / pari 07 HYVÄKSYTTY (KK omistajan puolesta 00.23) → JU voi viedä v84:n (PT ilmoittaa).
- 1) PARIT JATKOSSA REF=d0d7677dd (juna 215, VS:n pinnat 3dc45d778 mukana), EI 41a2eac22 (vesi näkyi tummanvihreänä). Myös scratchpadin pari_v86_03.zsh
  (41a2eac22) on vanhentunut: aja 03/03b uudelleen: cd H; REF=d0d7677dd MALLIT=file://H/juuri-pk7-v86/ PELIKAMERA=1 zsh ./editori-lr.sh 03 03b.
- 2) ENNEN 03 KOHTAA 4: v85 = Duanmenin piha ja sen molemmin puolin (Zhongshanin puisto länsi, Taimiao itä; ulkorengas-v8:n laatat kk-ulkorengas-2/3-*,
  x ≈ −300…+300, z ≈ −480…−900): valkoiset kattomattomat laatikot ja ruskea maa → periaate 9: poista laatikot (tai oikeiksi rakennuksiksi katoin),
  puistoalueille puustoa kuten havainteessa (rengas_puistoksi.py / rengas_puurivi.py mallina; ruskea maa = V4_kujakivi_sokkeli_yla/V4_harmaa → nurmi/kivi).
  Pohja: duanmen-v163/kielletty-ulkorengas-v8 (+ tausta-v74 jos laatikoita taustassa; tarkista alue_mat-tyyppisellä analyysillä: valkoinen = V4_lattia/V4_marmori
  pystypinnat ilman V4_gold-kattoa). Tee paketti v85 (paketti_v84.py mallina) = v84 + korjattu ulkorengas(/tausta), juuri H/juuri-pk7-v84 + uusi ulkorengas,
  pari 07 REF=d0d7677dd → PT:lle (kuva + sha, ≤ 3 riviä).
- 3) Sitten 03 kohta 4 (v166 valmis, pari uudella REF:llä), A6 (v167, PK:n pari), k7 (v165, KS) kuten LISÄYS 104.
- 00.3x JU hylkäsi v84:n (lahipuut-v7 oli symlinkki v6-vientiin) → puut-v164/kielletty-lahipuut-v7 oikeiksi tiedostoiksi, paketti v84 rakennettu uudelleen:
  685 tiedostoa, SHA256SUMS 72bb9983 (PT:lle ja JU:lle ilmoitettu). Symlinkin kautta oli ylikirjoittunut _valmiit/juoksupeli-kielletty-lahipuut-v6-vienti-20261025
  puut.json + SHA256SUMS → palautettu tavulleen (f0ffb6e2, viennin SHA256SUMS OK). OPPI: tarkista `find -type l` ennen kuin kirjoitat kopioituun kansioon
  (cp -c -R kopioi symlinkin linkkinä); paketeissa find $B -type l tyhjä ennen PT:lle lähetystä.
- PT 00.4x (VS:n huomio): f-taihemen-lod0/-lod1:ssä sokkeli-v03-kuva kahdesti (toinen nimetön; muurit_takaisin.py:n mat_b kopioi V4_kujakivi_sokkeli-
  kuvan V4_jalusta_lohkokivelle) → v85:ssä nimetön kopio pois: V4_jalusta_lohkokivi osoittamaan olemassa olevaan sokkeli-v03-albedo-tekstuuriin, ylim. image
  + bufferView pois (koskee myös c2:n f-taihemen-lod0-kaiteeton.glb:tä, tarkista).

## LISÄYS 106 klo 01.02 (30.10.): v85–v88 VALMIIT, 03 KOHTA 4 -PARI PT:LLÄ — ALOITA TÄSTÄ
K = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/kielletty-rakennukset, H = …/havainne-kuja40. REF NYT 362182ba5 (PT 00.4x; juna 215 -runko = d0d7677dd + VS:n lohkokivi).
- REF 362182ba5 lukee paketin v83 kansionimet (kielletty-tausta-v73, -rakennukset-v69, -ulkorengas-v7, -c2-v14, -c1-v8, -lahipuut-v6, palatsi-esto-v18):
  juuri tehdään näillä nimillä osoittamaan uusiin (malli H/juuri-pk7-v89 → paketti v85; H/juuri-pk7-v90 = v89 + rakennukset-v148 + c2-v17/kielletty-c2-v16 + c1-v9).
  Vanhat juuret (v53-/c2-v2-nimet) näyttävät 362182ba5:llä tyhjää maailmaa.
- v85 (af84b96e) = v84 + kielletty-ulkorengas-v9 (puistot-v168, tyokalut/duanmen_puistot.py + aja_v168_puistot.zsh: Duanmenin molemmin puolin laatikot pois,
  ruskea maa nurmeksi/kiveksi, 1 158 puuta) + kielletty-rakennukset-v74 / kielletty-c2-v17 (tuplakuva-v169, tyokalut/tuplakuva_pois.py + aja_v169: f-taihemenin
  nimetön tuplasokkelikuva pois; viittaamattomat kuvat kuten valo_rgbm jäävät, peli lukee nimellä). Pari 07: lokit/havainne-editori-20261030-004241 → PT.
- v86 (1c21f84c) = v85 + kielletty-halli-kaiteet-v3 (halli-kaiteet-v3m, tyokalut/johde_marmori.py: johteen 1062-kuva valkoiseksi marmoriksi). KK hyväksyi 01.0x.
- v87 (a2a5e849, c2-v18 = 1061-pylväät valkoisiksi) HYLÄTTY (PT: koko palatsin muutos, peli lukee c2-v7:ää) — EI ämpäriin.
- v88 (4f671194) = v86 + kaiteet-v3:n kaide-pylvas → V4_marmorikaide_pylvas (halli-kaiteet-v3p, tyokalut/pylvas_marmori.py; peli korvaa V4_marmorin kermalla).
  NUI ottaa 06-zoomin. Ensimmäinen v88 (v87:n päällä) siirretty K/hylatty-v88a-c2v18. v86/v87 eivät ämpäriin.
- 03 kohta 4: aja_v166_siipikatto.zsh ajaa nyt myös tuplakuva_pois.py:n; pari 03/03b juuri-pk7-v90: lokit/havainne-editori-20261030-004912 → PT.
- SEURAAVAKSI: PT:n kuittaukset (v85, v88, 03-pari) → paketti k7 (v147) + siipikatto (v148) + A6 (v167, PK:n pari) PT:n ohjeen mukaan (paketti_v88.py mallina,
  kansiot v74:n päälle uusin numeroin: rakennukset-v75+, c2-v18 on varattu hylätylle → käytä c2-v19). Jono: T-risteys, sivuhallit, 04; Codex A2/A4/A1.

## LISÄYS 107 klo 01.10 (30.10.): 03-KANNATINVYÖ KORJATTU MALLISSA, VYÖN SININEN = PELIN PUOLI (PK) — LUOVUTUS, ALOITA TÄSTÄ
- PT 01.0x: 03-parin (004912) vyö karkea. Korjattu tyokalut/taihemen_siipikatto.py: kannattimet 0,30 m välein kapeat V4_teal-konsolit + kultareuna,
  kulta = V4_konsoli_kulta (PK: rakennusten V4_gold = pelissä kattotiilipinta 14; V4_goldia vain kattoon; puuttuva materiaali luodaan tasavärinä).
  aja_v166_siipikatto.zsh ajettu uudelleen (+ tuplakuva_pois) → rakennukset-v148/kielletty-rakennukset-v72, c2-v17/kielletty-c2-v16 (H/juuri-pk7-v90 osoittaa näihin).
- Pari 03 (REF 362182ba5, LISA="ui juoksupeli valo kuvabias 0"): lokit/havainne-editori-20261030-010632/03 → PT. Vyö (V4_palkkivyo, 1067, UV oikein,
  friisin edessä 6 cm) piirtyy yhä tasaisen tummansinisenä myös kuvabias 0:lla → epäily pelin _PalatsiKatto 2 / _JuoksuPalatsiVyoSavy; PK:lle välitetty.
- v88 (4f671194) = v86 + kaiteet-v3 kaide-pylvas → V4_marmorikaide_pylvas; EI c2-v18:aa (PT luki ensin vanhan v88:n; vastattu). NUI ottaa 06-zoomin.
- SEURAAVAKSI: PT:n kuittaus 03-pariin / PK:n vyökorjaus → paketti (v88:n päälle): k7 (v147) + siipikatto (v148) + A6 (v167, PK:n pari) PT:n ohjeen mukaan;
  REF 362182ba5 -juuret v89/v90-mallilla (pelin odottamat v83-kansionimet). Jono: T-risteys, sivuhallit, 04; Codex A2/A4/A1.

## LISÄYS 108 klo 01.37 (30.10.): PT:N TÄYDENNYS + SIVUHALLIT v171 (中右门/中左门) — LUOVUTUS (konteksti 32 %), ALOITA TÄSTÄ
- PT 01.1x (voittaa LISÄYKSEN 107): A6 (v167) EI pakettiin ennen Codexin 7-välistä yläkerrosta (posti 23.54, e48669603); vyön tummansininen = VS:n
  shader (korjattu linssiseppa2/vyo-215 a67a2ba20); v88 odottaa NUI:n 06-zoomia + KK:ta → ei rakenneta v88:n päälle ennen kuittausta. 03-pari 010632
  kuitattu kannattimien osalta; lopullinen 03-pari REF 362182ba5 + a67a2ba20 → PT → KK; paketti (k7 v147 + siipikatto v148) vasta kuittauksen jälkeen.
- PT 01.3x: "siipimuurien V4_palkkivyo-UV osuu 1067-kuvan tummansiniseen reunaan, korjaa v 0–1" → TARKISTETTU: f-taihemen-siipikatot-lod0 V4_palkkivyo
  UV on jo v 0–1 (ala 1, ylä 0), u = pituus/(0,45·4), kuva 1067-palkkimaalaus 2048×512 → vastattu PT:lle, että vika on pelin puolella (VS:n
  UV-käsittely, ehkä metrinen v/vmax). Odota PT:n vastaus ennen lopullista 03-paria.
- SIVUHALLIT (PT 01.2x "tee odotellessa havainteen 03/03b mukaan: mittasuhteet, katot, pylväsrivit; paikat oikeat; pari 03b → PT; sitten Codex A2/A4/A1"):
  03b:n sivuilla näkyvät kulmaportit 中右门 (t-portti-m15, x −80,6 z −14,8) ja 中左门 (taustassa, Codexin 32 m möhkäle). UUSI K/tyokalut/
  sivuhalli_taihemenista.py: Taihemenin valmis 重檐歇山-halli (pinnat, friisit, chiwen, harjaeläimet, UV1-valo) akselikehykseen (−2,03°), 2 jännettä/puoli
  pois pylväiden keskitasoissa x ±8,246…±18,844 (9 → 5 jännettä), skaalaus m15:n seinälinjoihin (x 0,904, y 0,849, z 0,729; lattia 2,5), kierto takaisin;
  'peili' = peilaus akselikehyksessä. Apuvälineet: peilaa_akselilla.py, poista_osat.py, glb_tiivista.py, glb_info.py, alue_laske.py, aukio_kuvat.py
  (Blender-esikatselu; Blenderissä katot näyttävät leijuvilta myös alkuperäisessä Taihemenissa = renderöintiero, ei vika).
  Ketju K/tyokalut/aja_v171_sivuhallit.zsh → K/sivuhallit-v171/kielletty-rakennukset-v76 (= rakennukset-v148 + h-zhongyoumen, h-zhongzuomen (78,4; −9,7 =
  OSM-keskikohta), t-portti-zhongzuomen (m15:n runko peilattuna, reitit/lapikulku peilattu); m15 ilman kattoa ja V4_red-seiniä, törmäys ennallaan)
  + kielletty-tausta-v76 (= duanmen-v163 tausta-v74 − 中左门-alue, alueet.json; 左翼门 x ≥ 100,4 säilyy). Juuri H/juuri-pk7-v91 (= v90 + nämä v69/v73-nimillä).
  Esikatselut K/sivuhallit/v1-*.png (03b, lahi-lansi, lahi-ita). PARI 03/03b AJOSSA 01.3x (REF 362182ba5, LISA="ui juoksupeli valo kuvabias 0"), loki
  scratchpad pari-v171.log → uusin proto-3d/lokit/havainne-editori-20261030-01xx…/03b → TARKISTA ja PT:lle (kuva + polku, ≤ 3 riviä).
  Huom: h-zhong*-lod0 7,0 MB, lod1 4,2, lod2 2,5 (Taihemenin kuvat mukana) → mainitse PT:lle; törmäys vain sisälaatikko y 7–12 (PK tarkistaa).
  Seuraavat sivuhallit: pitkät sivukäytävät 院墙5/院墙8 (x ±100, z −209…−145) ja 侧墙5 (läns) / peilaus itään (侧墙6 poistui 中左门:n mukana).
- LÖYDÖS (PT:lle ilmoitettu): Hongyigen (弘义阁, x −117…−93, z −146…−82) katto puuttuu taustasta yksikerros-ketjusta v57 lähtien (vaaka_yksi_kerros.py)
  → valkoinen laatikko; A6 korvaa.
- SEURAAVAKSI: (1) pari v171 → PT; (2) PT:n vastaus vyön UV:sta → lopullinen 03-pari; (3) Codex A2/A4/A1 (PK:n kansio proto-3d/_tyo/pelikoodari/codex-osat-215/).

## LISÄYS 109 klo 02.08 (30.10.): PAKETIT v89–v92, avoimet-v52, A1/A2 LÄHIKORISTEET (lahipuut-v8) — LUOVUTUS (konteksti 30 %), ALOITA TÄSTÄ
K = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/kielletty-rakennukset, H = …/havainne-kuja40, V = /Users/Shared/Claude/proto-3d/_valmiit.
- Sivuhallit v171 pari 014144 (03/03b) HYVÄKSYTTY (KK 01.4x). v174 = sama erikseen v85:n päälle (aja_v174_sivuhallit_v85.zsh → K/sivuhallit-v174/rakennukset-v77).
- PAKETIT (kaikki tyokalut/paketti_v8x/v9x.py; ei symlinkkejä):
  - v89 = v85 + rakennukset-v77 (sivuhallit) + tausta-v76: V/juoksupeli-kk-lavastaja-v89-vienti-20261030, SHA256SUMS 94a9e403. PT kuittasi JU:lle.
  - v90 = v89 + kielletty-halli-kaiteet-v4 (johde + kaide-pylväs V4_marmori = jalustan marmori 16; kaide_jalustan_marmori.py, K/halli-kaiteet-v4j): SHA 92c12c73.
    ODOTTAA NUI:n 06-zoom-paria (PT 01.5x). v86/v87/v88 EIVÄT ämpäriin.
  - v91 = v89 + avoimet-v52 (korvaa v51): SHA 1ac4ef78. Sali 04 hyväksytty (KK 01.5x). VS voi pyytää ruoteille oman materiaalinimen (sininen sävy) → uusi versio.
  - v92 = v91 + rakennukset-v78 (K/sivuhallit-v175, aja_v175_sivuhallit_215.zsh: rakennukset-v148/v72 = k7 + siipikatot + reunakivi + tuplakuva, + sivuhallit)
    + kielletty-c2-v19 (= K/c2-v17/kielletty-c2-v16; korvaa c2-v17; c2-v18 varattu hylätylle): SHA 02aeacd7, 701 tied. 03 kohta 4 HYVÄKSYTTY (KK 02.0x, pari 015223).
    c1-v9 = c1-v8 tavulleen → ei mukana. Peli: rakennukset-v78, MuurikateC2Kansio "kielletty-c2-v19/" (PK). EI A6:ta eikä kaiteita v4.
- avoimet-v52 (K/ruoteet-v173/avoimet-v52, ruoteet_palkkimaalaus.py): "Katto alapinta ruoteet" 0,09 → 1,0 + V4_palkkivyo:n 1067-kuva juhlasali/puutarha/
  tyohuone/varasto. PK:lle ilmoitettu (04-pari + yksi muista).
- A1/A2 LÄHIKORISTEET (PT 01.2x lupa; PT 01.5x: pysyvät lahipuut-kansiossa, ei uutta vakiota): tyokalut/a2_koristeet.py → K/a2-v172/kielletty-lahipuut-v8
  (= lahipuut-v7 + koristeet.json: chiwen → A1 (sama mittasuhde), jokainen #929-rivi → kuolematon + 3/5/7/9 eläintä pituuden mukaan + chuishou pystyssä
  harjalinjalla, hahmo 0,7 × vanha korkeus, rivi ≤ 1,6 × vanha pituus; kuvat A2 512 px, A1 1024 px; hangshi pois (vain Taihedianin 10-rivi)) + 8 riviä
  Taihemenin siipikattojen aumaharjoille (siipikatto_rivit.py → K/a2-v172/siipikatto-rivit.json, KK:n kohta 3 / PT 02.0x). 24 944 koristetta, peli latasi
  (unity.log "lähikoristeet: 24904 … lajeja 12" ennen siipikattorivejä). Juuri H/juuri-pk7-v92 (= v91 + lahipuut-v6 → a2-v172/kielletty-lahipuut-v8).
  Blender-lähikuva K/a2-v172/kuvat/rivi-iso.png (esikatsele_a2.py) OK. Parit: 014544 (02/05/01) HYLÄTTY: pk7-juuren kujakamerat kattojen yllä, ei näyttöä;
  020403 (03b): siipikattojen kulmat kuvan ulkopuolella. AJOSSA: pari 06 −5 −200 −120 (aukio, ~21 m riviin) → scratchpad pari-v172b.log →
  lokit/havainne-editori-20261030-02xx/06 → tarkista lähikuvasta, näkyvätkö A2-hahmot → PT. Siipikattorivien todennus vaatii kameran, joka katsoo
  etelään/sivuille 03b:stä (esim. 06 6.43 −182 180 tai sivulle 90/−90).
- SEURAAVAKSI: (1) A2-pari → PT (kuva + polku); (2) Taihedianin oma 10+1-rivi (rakennuksen V4_harjaelain, lod0 3800 kolmiota, vain ylempi räystäs) –
  ehdota PT:lle (LOD0:aan kevennetyt A2:t vai koristeet.json + upotetut pois); (3) A4 kannattimet räystäisiin c1-sijoitukset.json:n linjoista (lähikoristeina);
  (4) PT:n vastaus 03-vyön UV:sta; (5) NUI:n pari → v90.
- 02.1x: pari 06 −5 −200 −120 (lokit/havainne-editori-20261030-015328/06) EI KÄYTETTÄVÄ: 06-tila nostaa kameran Taihemenin katolle ja kääntää etelään
  (Meridiaaniportti). A2-hahmojen pelitodennus yhä auki → käytä 03/03b-paikkaa ja kääntöä (esim. lisää PAIKKA-kohta editori-lr.sh:iin) tai pyydä PK:lta
  kamera lähelle taustan riviä (y < 15 m, ≤ 25 m vaakaan; esim. rivit (−22, −210) ja (36, −211) aukion etelälaidalla).

## LISÄYS 110 klo 03.0x (30.10.): PAKETTI v93 + SIIPIKATOT v2 (rakennukset-v79) — ALOITA TÄSTÄ
- 109b:n A2-pari 06 (v172b) valmistui ennen nollausta (EI käytettävä). PT (02.2x): harjaeläinten pelikuva Taihemenin kattokulmaan, REF 3b9485eb8.
- JUURI H/juuri-pk7-v93 = v92-linkit + V/…v92-vienti/juoksupeli/maailma-v4 -kansiot (junan 215 nimet) + kielletty-lahipuut-v7 → K/a2-v172/kielletty-lahipuut-v8
  + kielletty-halli-kaiteet-v4. v92-juuressa EI ollut junan 215 nimiä (rakennukset-v78, tausta-v76, c2-v19, avoimet-v52) → pelikuva tyhjä aukio.
- EDITORI: K/tyokalut/editori-lr.sh (PAIKKA_<k>/TESTIKAMERA_<k>-ohitukset, EI pohja-url-riviä → anna ESIKOM="ui juoksupeli palatsi url <juuri>/kk-pohja-v1d-pk7/pohja.json");
  H/editori-lr.sh (pohja-url, EI ohituksia). Pari-skripti: kamera PAIKKA_03="6.43 -203 -2.03" TESTIKAMERA_03="4 6 0 60" (PELIKAMERA ei saa olla asetettu).
- Pari lokit/havainne-editori-20261030-023400/03 (rajaukset) HYVÄKSYTTY (KK 02.4x).
- PAKETTI v93: V/juoksupeli-kk-lavastaja-v93-vienti-20261030, SHA256SUMS 478549fe, 713 tied. (= v92 + lahipuut-v8 (korvaa v7) + halli-kaiteet-v4; tyokalut/paketti_v93.py).
  PT:lle ilmoitettu; PK: lähipuiden kansio v7 → v8.
- KK:n 3 huomiota siipikattoihin → taihemen_siipikatto.py v2 (ohut 1268-pääharja 0,16 × 0,30, tiili 1,0/m), aja_v176_siipikatto2.zsh → K/siipikatto-v176/
  kielletty-rakennukset-v79; kiila = Taihemenin jalustan marmorireunakivi (ei poistettu). Pari lokit/havainne-editori-20261030-025421/03 (juuri-pk7-v94) → PT 03.0x.
- SEURAAVAKSI: PT:n kuittaus → paketti v94 (= v93 + rakennukset-v79 korvaa v78; peli: rakennukset-kansio v79, PK). Sitten 109:n lista (Taihedianin 10+1-rivi, A4, 03-vyön UV, NUI → v90).

## LISÄYS 111 klo 03.2x (30.10.): v94 VIETY, A4 KESKEN, TAIHEDIANIN RIVIT HYVÄKSYTTY TEHTÄVÄKSI — LUOVUTUS (konteksti 30 %), ALOITA TÄSTÄ
- PAKETTI v94 (V/juoksupeli-kk-lavastaja-v94-vienti-20261030, SHA256SUMS 7db5735e, = v93 + rakennukset-v79) PT kuittasi JU:lle.
- Aumalappeiden raidat: PT päätti, että VS vaalentaa kattotiilen kourun kaikille katoille; LR:lle ei v95-työtä siitä.
- TEE ENSIN (PT 03.1x HYVÄKSYTTY): upotetut harjaeläimet pois g-taihedianista (katto-solmun V4_harjaelain, y 26,3–28,35, 11 400 kärkeä; myös lod1/lod2
  ja c2:n/taustan kopiot, jos niissä) ja Taihedianin 10+1-rivit ylä- ja alaräystään aumaharjoille koristeet.json:iin A2:na. Rivit #929-muodossa
  ("harjaelaimet": keskikohta, +Z kärki räystääseen, kallistus = harjan kaltevuus; mallina siipikatto_rivit.py) → a2_koristeet.py:hin 10 eläimen
  sääntö (A2-listan 11. = hangshi vain Taihedianille; nykyinen sääntö enintään 9). Pari 03 ennen/jälkeen samalla kameralla → PT.
- A4 (PT: ok sillä välin): UUSI tyokalut/a4_kannattimet.py (+ a2_koristeet_apu.py = pienenna()): dougong-intercolumn/-corner (Codex #1263/1265, kuvat 512 px)
  V4_palkkivyo-/V4_palatsi_friisi-vöiden yläreunaan räystään alle (ylin vyö per suunta, skaala vyön korkeus/1,25, räystään alapinta rajaa, f-taihemen-
  siipikatot ohitetaan). → K/a4-v177/kielletty-lahipuut-v9 (= lahipuut-v8 + 6 552 kannatinta, 20 rakennusta; u-jingshan 1318, o-palatsi 1053,
  a-meridiaaniportti 1046 epäilyttävän paljon → tarkista ennen pakettia). Blender-koe scratchpad a4koe2.png: Taihedianin alaräystään rivi näyttää oikealta.
  Juuri H/juuri-pk7-v95 (= v94 + lahipuut-v7 → a4-v177/…-v9). Pari havainne-editori-20261030-030942: 03b-kamera (7 −195 178, "8 8 0 60") osui
  Taihemenin pohjoisportaille, räystäät eivät näy → EI käytettävä. Uusi kamera: keisari ≤ 25 m rakennuksesta, räystäs kuvassa (esim. Taihedianin
  eteläpuoli 0 −40 suunta 0, testikamera "6 6 0 60"), koristeraja 40 m.
- Pari-skriptit (scratchpad häviää): REF=3b9485eb8 MALLIT=file://H/juuri-pk7-vNN/ ESIKOM="ui juoksupeli palatsi url file://H/juuri-pk7-vNN/kk-pohja-v1d-pk7/pohja.json"
  LISA="ui juoksupeli valo kuvabias 0" PAIKKA_03=… TESTIKAMERA_03=… zsh K/tyokalut/editori-lr.sh 03 [03b] (PELIKAMERA ei asetettu).
- Muu jono (109): 03-vyön UV (PT:n vastaus), A6 odottaa Codexin 7-välistä GLB:tä.

## LISÄYS 112 klo 03.44 (30.10.): TAIHEDIANIN RIVIT TEHTY (v178), A4 KORJATTU (v179), PARI AJOSSA — ALOITA TÄSTÄ
K = …/kielletty-rakennukset, H = …/havainne-kuja40.
- v178 (tyokalut/aja_v178_taihedian.zsh, taihedian_rivit.py): K/taihedian-v178/kielletty-rakennukset-v80 = v79 − g-taihedian V4_harjaelain (lod0 11 400 kärkeä,
  lod1 kortit; lod2:ssa ja c2/taustassa ei kopioita) + kielletty-lahipuut-v10 = a2_koristeet.py (lahipuut-v7 + siipikatot 8 + Taihedian 8 riviä; korvaa v8:n).
  Taihedian: 4 kulmaa × ylä- ja alaräystäs, kuolematon + 10 eläintä (10. = hangshi) + chuishou; harja kulmassa lähes vaakasuora → a2_koristeet.py:hin
  rivikentät 'elaimia', 'karki', 'profiili' (hahmot harjan yläpinnalle). Yläkaton kärki 3,6 m kulmasta (harjakaistale alkaa siitä), alakatolla ei harjaa → 2,5 m.
  25 040 koristetta (v8 + 96, v8:n rivit tavulleen). Blender-tarkistus OK (scratchpad).
- v179 (aja_v179_a4.zsh): a4_kannattimet.py korjattu: samassa tasossa erilliset vyöt omiksi sivuikseen (Jingshanin paviljongit yhdistyivät 263 m:n sivuksi
  aukkojen yli), kolmion oma normaali (keskipisteestä kääntö käänsi Meridiaaniportin salin pohjoissivun sisään), yli 2,5 m korkea ≠ vyö (Meridiaaniportin seinä).
  → K/a4-v179/kielletty-lahipuut-v11 = v10 + 4 913 kannatinta (ennen 6 552; Jingshan 1318 → pieni, Meridiaaniportti 641, o-palatsi 1078 ja l-palatsi 796 = kokonaisuuksia).
- Juuret: H/juuri-pk7-v96 (= v94, rakennukset-v78 → v80, lahipuut-v7 → v10), H/juuri-pk7-v97 (= v96, lahipuut-v7 → v11).
- Pari: PAIKKA_03="-14 -46 0" EI toiminut (keisari z −341, tyhjä aukio; lokit/havainne-editori-20261030-032631 ja -033508). Ajossa PAIKKA_03="1 -30 -65"
  TESTIKAMERA_03="6 6 0 70" v94/v96/v97 (scratchpad pari178b.log). PT 03.4x: PK tekee kameran → pyyntö PK:lle lähetetty (Taihedianin lounaiskulma, juuret v94/v96/v97).
- SEURAAVAKSI: pari (ennen/jälkeen) → PT; kuittauksen jälkeen paketti v95 (= v94 + rakennukset-v80 korvaa v79 + lahipuut-v11 (tai v10, jos A4 ei vielä) korvaa v8;
  peli: kansiot PK). Sitten 03-vyön UV (PT), A6 (Codexin GLB).

## LISÄYS 113 klo 04.20 (30.10.): MUURIKATE v180, KELTARAITA EI POISTUNUT — ALOITA TÄSTÄ
- PK ajaa Taihedianin lounaiskulman parin itse (editori.sh 06 -49 -29.5 66.7 8.13, LAHIKUVA "1.5 8 -20 70", REF 41604ddef; juuret v97, v94, v96)
  ja lähettää lokikansiot. PAIKKA_03 ei sovi Taihedianille (03 kiinteä, ilman QA-lattiaa keisari jää terassiin). Oma pari178b pysäytetty.
- PT 04.1x (VS:n löydös): v180 (aja_v180_muurikate.zsh, taihemen_muurikate_pois.py) → K/muurikate-v180/kielletty-rakennukset-v81 = v80 − f-taihemen
  lod0/lod1 vanha porttimuurin kate (V4_gold 40), friisi (16), teal (4); V4_red-yläpinta jää. Juuri H/juuri-pk7-v98 (= v97, rakennukset → v81).
  Pari v97→v98 03s-kamera (PAIKKA_03="6.43 -203 -2.03" TESTIKAMERA_03="4 6 0 60"): lokit/havainne-editori-20261030-040102 / -041415,
  rajaus 041415/03/muurikate-ennen-jalkeen.png: keltaiset raidat JÄÄVÄT → ne ovat siipikattojen oma kannatinvyö (V4_konsoli_kulta + V4_teal y 4,15–4,5).
  PT:lle ilmoitettu (04.19), kysytty VS/PK:n pinnasta. Odottaa PT:n linjausta (mallin materiaali vai pelin pinta).
- Paketti v95 tulossa: rakennukset-v81 (sis. v80) + lahipuut-v11 (tai v10), kun PT kuittaa parit.

## LISÄYS 114 klo 04.4x (30.10.): LUOVUTUS (konteksti 30 %) — YLÄKULMAN PARI AJOSSA, v95 VALMIINA KOOTTAVAKSI, ALOITA TÄSTÄ
- PT 04.2x: v81 (muurikate pois) pidetään; kannatinvyön pinta (keltaraita) VS:lle. Paketti v95 kootaan, kun Taihedianin rivien pelipari hyväksytty:
  `python3 K/tyokalut/paketti_v95.py` (valmis, EI ajettu) = v94 + rakennukset-v81 (korvaa v79) + lahipuut-v11 (korvaa v8); LAHTEET.md päivittyy.
  Sitten PT:lle SHA256SUMS-tiiviste; PK: kansiot "kielletty-rakennukset-v81/" ja "kielletty-lahipuut-v11/".
- PK:n pari (REF 41604ddef, editori.sh 06 -47 -28.5 67 8.13, LAHIKUVA "1.5 6 -20 60", PK:n skripti _tyo/pelikoodari/kuja05-pk6-20261029/aja-lr-taihedian-lounas.zsh):
  v94 lokit/havainne-editori-20261030-040421, v96 -041015, v97 -035637; kooste 035637/06/taihedian-v94-v96-v97.png → PT (04.4x).
  A4 näkyy v97:ssä molempien räystäiden alla. Harjaeläinrivit EIVÄT näy alakulmasta (katto peittää).
- AJOSSA (LR, 04.4x): sama paikka ylhäältä LAHIKUVA "22 6 15 60", juuret v97 ja v94 (scratchpad th-yla.zsh → th-yla.log; tulos uusimmat
  lokit/havainne-editori-20261030-04xxxx/06/peli.png kahdesta ajosta). Tarkista: näkyvätkö rivit kulman aumaharjoilla (ylä- ja alaräystäs) → PT (kuva + polku).
  Jos skripti hävinnyt: kopioi PK:n skripti, vaihda LAHIKUVA ja `set -- 97 94`.
- PK: pintatarkistus hylkää hangshi-pbr, dougong-corner-pbr, dougong-intercolumn-pbr → PT:lle kerrottu (lisätään listaan PT:n kautta).
- Muu jono: 03-vyön UV (PT), A6 (Codexin GLB).

## LISÄYS 115 klo 04.5x (30.10.): c2-v20 (KELTARAITA POIS), KUVAT PT:LLÄ — LUOVUTUS, ALOITA TÄSTÄ
- PT 04.5x (VS): peli käyttää C2:n f-taihemen-lod0-kaiteeton.glb:tä → v181 (aja_v181_c2.zsh; taihemen_muurikate_pois.py nyt <kansio> [tiedostot],
  MAT + V4_palkkivyo) → K/muurikate-v181/kielletty-c2-v20 (= v94-paketin c2-v19 − vanha kate 40, friisi 16, teal 4). Juuri H/juuri-pk7-v99 (= v98, c2-v19 → v20).
  Pari 03s v98→v99: lokit/havainne-editori-20261030-044024/03/c2-v20-ennen-jalkeen.png – isot keltaraidat poissa (kapeat = konsoli_kulta, VS:n pinta).
- Taihedianin yläkuva (LAHIKUVA "22 6 15 60", PK:n paikka): lokit/havainne-editori-20261030-042633/06/taihedian-yla-v94-v97.png + taihedian-yla-v97-lahikuva.png
  – rivit molemmilla aumaharjoilla. (v97-ajo kaatui pintatarkistukseen → raakakuva esikatselu-20261030-042115/havainne-06.png.) Molemmat PT:lle 04.5x.
- paketti_v95.py päivitetty: v94 + rakennukset-v81 + lahipuut-v11 + c2-v20 (korvaa c2-v19; peli MuurikateC2Kansio "kielletty-c2-v20/"). AJA PT:n kuittauksella.
- Taustaajoja ei ole.

## LISÄYS 116 klo 05.0x (30.10.): v95 VIETY; AUMAKATTOJEN LAPPEET v182, PARI PT:LLÄ — ALOITA TÄSTÄ
- Paketti v95 ajettu (SHA256SUMS cf36f386), PT:lle ilmoitettu.
- PT (ennen junaa 215): tiilirivien suunta vaihtui kolmioittain kaarevilla lappeilla (palatsi_pinnat.py projisoi kolmion omalla normaalilla).
  UUSI tyokalut/lappe_uv.py: V4_palatsi_katto-UV lapeittain (katon yhtenäiset palat, pääsuunnat 4-kertaisesta keskikulmasta, alamäki lukittu
  lähimpään, yksi taso per lape, mittakaava nykyisestä UV:sta; pyöreät/8-kulmaiset palat ennallaan). aja_v182_lappeet.zsh →
  K/lappeet-v182/kielletty-rakennukset-v82 (= v81) + kielletty-c2-v21 (= c2-v20). Blender-tarkistus tyokalut/lappe_kuva.py.
  Avoimet-v52: lappeet jo tasaisia → ei muutosta.
- Juuret H/juuri-pk7-v100 (= v99 + rakennukset-v79 → v81; ca3a1b7ad lukee v79:ää) ja -v101 (v78/v79 → v82, c2-v19 → v21).
  Pari (PK:n paikka 06 -47 -28.5 67 8.13, LAHIKUVA "22 6 15 60", REF ca3a1b7ad): lokit/havainne-editori-20261030-045358 (ennen) / -045619 (jälkeen),
  kooste 045619/06/lappeet-v100-v101-lahikuva.png → PT 05.0x. Rivit yhtenäiset; alaräystään kulmassa laikukas varjostus (valo, ei UV).
- SEURAAVAKSI: PT:n kuittaus → `python3 K/tyokalut/paketti_v96.py` (valmis, EI ajettu: v95 + rakennukset-v82 + c2-v21) → SHA256SUMS-tiiviste PT:lle;
  PK: kansiot "kielletty-rakennukset-v82/" ja "kielletty-c2-v21/". Huom: runko nyt 3aac603dc (v81-nimet).
- Muu jono: 03-vyön UV (PT), A6 (Codexin GLB).

## LISÄYS 117 klo 05.1x (30.10.): v96 KOOTTU MUTTA KORVAUTUU; LAIKUT KORJATTU v183, PAKETTI v97 VALMIINA — ALOITA TÄSTÄ
- PT: lappeet v101 HYVÄKSYTTY (KK) → paketti v96 ajettu (SHA256SUMS 4c2fb2ec), PT:lle. Pari myös rungolla 3aac603dc (juuret v102/v103, v95-nimet): lokit/havainne-editori-20261030-050008 / -050225.
- KK: alaräystään kulman laikut z-fightingia? EI: Taihedianissa ei päällekkäisiä kattopintoja, taustassa ei kopiota. Laikut = lähes vaakasuorat V4_gold-kolmiot
  (|n.y| 0,97–0,99, nousevat kulmat) keskellä kattoa → lappe_uv.py v2: liita() siirtää kattoon rajautuvat loivat kultakolmiot (|n.y| ≥ 0,9, ≥ 2 yhteistä kärkeä,
  toistuvasti) katon primitiiviin; lappe paikasta (rajauslaatikon lähin reuna = aumaharja 45°), normaali vain jos > 60° erossa. 30 612 kolmiota liitetty
  (Meridiaaniportti 8 023, Baohedian 2 641 …); Blenderissä harjat säilyvät. aja_v183_lappeet.zsh → K/lappeet-v183/kielletty-rakennukset-v83 + kielletty-c2-v22.
- Juuri H/juuri-pk7-v104 (v103 + v83/c2-v22 kaikilla nimillä). Pari v102→v104 (3aac603dc): lokit/havainne-editori-20261030-050810/06/lappeet-v102-v104-lahikuva.png → PT.
- SEURAAVAKSI: PT:n kuittaus → `python3 K/tyokalut/paketti_v97.py` (valmis, EI ajettu: v96 + rakennukset-v83 + c2-v22) → tiiviste PT:lle; v96 EI JU:lle.
  PK: kansiot "kielletty-rakennukset-v83/", "kielletty-c2-v22/". Muu jono: 03-vyön UV (PT), A6 (Codexin GLB).

## LISÄYS 118 klo 05.1x (30.10.): PAKETTI v97 AJETTU — ALOITA TÄSTÄ
- PT: lappeet v104 HYVÄKSYTTY (KK) → paketti v97 (V/juoksupeli-kk-lavastaja-v97-vienti-20261030, SHA256SUMS 61a8547c, 716 tied.) ajettu, PT:lle ilmoitettu.
  PK: "kielletty-rakennukset-v83/", "kielletty-c2-v22/". v96 korvautunut.
- Muu jono: 03-vyön UV (PT:n vastaus), A6 (Codexin 7-välinen GLB).
- 05.2x PT: 03-vyön UV -kohta SULJETTU (siipimuurien vanha kate/friisi poistettu c2-v20/v22, 03-parit hyväksytty). Jono: vain A6 (Codexin 7-välinen GLB).

## LISÄYS 119 (30.10. 07.45): Meridiaaniportin sivuaukot avoimiksi (PT 07.2x, KK:n havainto parissa 051707/06)
- Syy: "punaiset ovet" eivät olleet ovia. Sivutunnelit (x ±21, 4 m × 27,5 m) olivat suoria, joten U-pihalta (~80 m, ~24 m sivussa)
  aukosta näkyi vain tunnelin punainen sisäseinä ja auki käännetty ovilehti.
- Korjaus: sivutunnelit leikattu (shear) U-pihan akselipisteeseen (reitin S-N alku 3,5/−99): pohjoispää ~7 m ulospäin, etelän julkisivu,
  ovet ja keskitunneli ennallaan; törmäysmallin laatikot samalla säännöllä (kulku auki). K/tyokalut/meridiaani_aukot.py + aja_v184_aukot.zsh
  → K/aukot-v184/kielletty-rakennukset-v84 (lod0/1/2 + tormays) ja kielletty-c2-v23 (lod0-kaiteeton). Apuluokka lappe_uv_g.py
  (lappe_uv.py:n tuonti ajoi sen päärutiinin; v183-työkopion lod0 palautettiin v97-paketista, sha täsmää).
- Pari rungolla c0b59f6b0, kohta 06 (16.4 −474 −2.03, testikamera 2.5 6.2 3 51; keisari 0,12 = havainne):
  ennen lokit/havainne-editori-20261030-073943/06, jälkeen lokit/havainne-editori-20261030-074212/06 (vierekkain.png).
- Hyväksynnän jälkeen: paketti v98 = v97 + rakennukset-v84 + c2-v23; PK: kansiot "kielletty-rakennukset-v84/" ja "kielletty-c2-v23/".

## LISÄYS 120 (30.10. 08.0x): pari 074212 hylätty (omistaja 07.49 "liian kapealle, sisäosa syvemmälle") – mitat vs. havainne, PT:lle ennen työtä
Mittaus samasta rajauksesta (keisari 0,12 molemmissa; peli 074212 vs. havainne):
1. AUKKOJEN KOKO: havainteessa keskiaukko ~20 % leveämpi ja ~15 % korkeampi kuin mallin 6,0 × 7,6 m, ja jokaisen aukon ympärillä on
   syvä suorakaiteinen kehyssyvennys (~1,3 × aukon leveys), joka saa aukot näyttämään leveiltä. Pelissä auki käännetyt punaiset ovilehdet
   näkyvät pielissä ja kaventavat aukkoa. OMA RISTIRIITA: rakennukset.json:n reitin huomautus "sivutunnelit x ±21 (5,0 m)", mutta mallin
   sivuaukko on 4,0 m. Todellisia aukkomittoja en saanut varmistettua (ei lähdettä haulla); 6 m / 5 m ovat mallin omat arvot.
2. SYVYYS KESKIAUKOSTA: aukon takana näkyy Taihemen ja Kultaisen veden sillat. OSM-paikoilla Taihemen on ~150 m tunnelin pohjoispään
   takana (todellinen etäisyys ~130–150 m); se täyttää aukon, koska se on ~60 m leveä. Havainteen "pitkä kivetty käytävä, jonka päässä
   pieni portti" ei ole todellinen: väliin kuuluvat sillat ja joki, ja Taihemen näkyisi pienenä vain ~2 × todellisella etäisyydellä.
   → RISTIRIITA todellisuuden kanssa; ei muutettavissa ilman paikkojen siirtoa.
3. SIVUAUKOT: todellisuudessa suorat sivutunnelit (27,5 m) eivät ole U-pihalta läpinäkyviä; v84:n kääntö (7 m) poikkeaa todellisesta.
Ehdotus todellisuuden rajoissa: (a) kehyssyvennykset aukkojen ympärille havainteen tapaan, (b) ovilehdet pieliin upotettuina (ei kavenna),
(c) sivuaukot 5,0 m (json:n arvo), (d) v84-kääntö pois tai pidetään omistajan valinnan mukaan; keskiaukon syvyys jää todelliseksi.

## LISÄYS 121 (30.10. 08.1x): v185 kehyssyvennykset + upotetut ovet + kääntö (PT 07.5x ALOITA)
- Korjaus omaan LISÄYS 120:een: sivuaukot OVAT jo 5,0 m (malli ~2° kierrossa; luin akselinsuuntaisia rajoja) → leveyttä ei muutettu.
- meridiaani_syvennys.py: kolmeen aukkoon syvennys (aukko + 1,07 m sivuille, + 1,6 m ylös, 1,0 m syvä; vanhat ulkonevat pilarikehykset
  jäävät sisään ja poistuvat), sokkelikivi < 3 m, ovilehdet ja karmit syvennyksen taakse pieliin (sisäpinta ~1 cm seinästä), kynnykset
  takareunaan. meridiaani_aukot.py: kääntö mallin kehyksessä syvennyksen takaseinästä. aja_v185_syvennys.zsh → K/syvennys-v185/
  kielletty-rakennukset-v85 + kielletty-c2-v24 (lod1/lod2 vain kääntö: syvennys näkyy < 150 m).
- Pari runko c0b59f6b0, kohta 06, keisari 0,12: lokit/havainne-editori-20261030-075838/06.
- Havainto: havainteessa portin jalusta ja aukot ovat ~1,2 × suhteessa salirakennukseen (aukko 8,9 vs 7,6 m, sokkeli 3,9 vs 3,0 m
  samalla keisarilla). Kokeilupari 14 m lähempää (080449/06) ei auta: sali kasvaa liikaa (räystäät 0,17/0,13 vs 0,27). Ero on
  havainteen mittasuhteissa, ei kamerassa; todelliset mitat pidetty.

## LISÄYS 122 (30.10. 08.1x): v186 suorat sivutunnelit + syvennykset + tunnelien kivisokkeli (PT 08.0x)
- Kääntö pois ("edestä kolme, takaa viisi": etujulkisivun kolme aukkoa suoria). meridiaani_tunnelisokkeli.py: tunnelien seinät alle 3 m
  sokkelikiveä (V4_jalusta_lohkokivi). aja_v186_suorat.zsh → K/suorat-v186/kielletty-rakennukset-v86 + kielletty-c2-v25 (lod1/2, tormays = v83).
- Pari runko c0b59f6b0, kohta 06: lokit/havainne-editori-20261030-080919/06 (keisari 0,11).
- SILMÄNKORKEUSLASKU (todelliset mitat): kamera ~85 m etelän aukosta (testikamera 6,2 m keisarin takana), aukon yläreuna 7,6 m (pohjoispään
  holvi 10,45 m ei rajaa), Taihemen huippu 23,7 m ~258 m:ssä. Näkyvä yläraja Taihemenin kohdalla = h + (7,6 − h)·258/85 → h = 2,5 m: 17,5 m.
  Taivas näkyisi vain, jos h < −0,4 m (silmä maan alla) tai kamera < 55 m aukosta (silloin sali kasvaa, ks. 080449). Sivuaukoista ei näe
  läpi suorilla tunneleilla mistään U-pihan kohdasta, joka on yli ~2,5 m sivussa tunnelin akselista. → Havainteen kohdat 2 ja 3 eivät
  ole saavutettavissa todellisilla mitoilla ja paikoilla.

## LISÄYS 123 (30.10. 08.3x): v187 valoisat tunnelit (OMISTAJAN PÄÄTÖS 08.27: todelliset mitat, "syvät kehykset, ja valon varjot tuovat syvyyttä")
- Suorat tunnelit, kehyssyvennykset 1,4 m (MERIDIAANI_SYV), ovet ja kynnykset takareunan taakse, tunnelien seinät koko korkeudelta
  vaaleaa sokkelikiveä (TUNNELI_KIVI_Y=20) → sivuaukoista näkyy valoisa tunnelin pinta. aja_v187_valoisa.zsh → K/valoisa-v187/
  kielletty-rakennukset-v87 + kielletty-c2-v26 (lod1/2, tormays = v83). Pari runko c0b59f6b0, kohta 06, keisari 0,12:
  lokit/havainne-editori-20261030-083011/06. Syvennysten varjot valon vaiheessa (VS).
- Hyväksynnän jälkeen: paketti v98 = v97 + rakennukset-v87 + c2-v26; PK: kansiot "kielletty-rakennukset-v87/" ja "kielletty-c2-v26/".
  Hylätyt/väliversiot (v84/v85/v86, c2-v23/24/25) eivät mene pakettiin; K/_roska/ = keskeneräiset v187-ajot.

## LISÄYS 124 (30.10. 08.4x): v188 punaiset sisäpinnat (omistaja 08.39 hylkäsi 083011) – EI LÄHETETTY PARINA, ristiriita PT:lle
- aja_v188_punainen.zsh → K/punainen-v188/kielletty-rakennukset-v88 + kielletty-c2-v27 (v187 ilman kivisisustaa). Pari 084035/06
  (keisari 0,12): sivuaukot näyttävät taas samalta kuin alkuperäinen valitus 051707 ("punaiset ovet"): suora tunneli + punainen seinä.
- 074212 näytti luontevalta vain, koska sivutunnelit oli käännetty (läpi näkyi valoa); todellisilla suorilla tunneleilla U-pihalta
  näkyy aina tunnelin sivuseinä. Vaihtoehdot: (a) kääntö takaisin (poikkeaa mitoista), (b) suora + punainen ja syvyys valon varjoista,
  (c) suora + sisäpinta tummempi/varjossa valon vaiheessa (VS), jolloin aukko lukeutuu käytäväksi eikä paneeliksi.

## LISÄYS 125 (30.10. 09.0x): (c) hämärät käytävät – pari VS:n koodilla (KK valitsi (c), PT 08.4x)
- VS teki hämärän peliin (linssiseppa2/kaytava-215 81169914c, korjaa 34cb7210c:n LOD0-ehdon): käytävät tunnistetaan LOD0:n V4_lattia-
  lattioista, sisäpinnoille taivas/aurinko vain suuaukoista. Glb:hen EI kärkiväriä eikä uutta materiaalia (VS: tummentaisi kahdesti).
- Geometria = v188 (suorat tunnelit, punaiset sisäpinnat, syvennykset 1,4 m, upotetut ovet): K/punainen-v188/kielletty-rakennukset-v88
  + kielletty-c2-v27. Pari REF 81169914c, kohta 06, keisari 0,11: lokit/havainne-editori-20261030-090240/06 (34cb7210c-ajo 08xx ilman hämärää).
- Hyväksynnän jälkeen: paketti v98 = v97 + rakennukset-v88 + c2-v27; PK: kansiot "kielletty-rakennukset-v88/", "kielletty-c2-v27/"; VS:n
  kaytava-215 junaan samaan aikaan.

## LISÄYS 126 (30.10. 09.1x): Meridiaaniportti PYSÄYTETTY (OMISTAJAN PÄÄTÖS 09.11) – odottaa todellisin mitoin tehtyä julkisivupiirrosta
- Omistaja 09.06: sivukäytävät suorat, hämärä (c) peruttu (VS:n kaytava-215 ei junaan). Tehty v189 (aja_v189_porras.zsh → K/porras-v189/
  kielletty-rakennukset-v89 + kielletty-c2-v28): porrastettu kehys (ulompi +1,07/+1,6/0,7 m, sisempi +0,5/+0,8/1,4 m), kivijalka 3 m kehyksen
  ympäri ja käytävään, käytävän punaisen UV julkisivun kartoituksesta (tummat raidat pois), ovet pieliin piiloon, kynnykset lattian alle.
  Pari 090823/06 (ennen UV-korjausta): KK:n lista 1 ✓, 2 ✗ (tumma/raitainen → korjattu UV), 3 ✓, 4 vain yläreunan viivat (0,7 m porras
  ~3 px tästä kulmasta). UV-korjattu pari ajettiin (scratchpad pari190b.log) mutta PT 09.1x: ÄLÄ TEE PORTTIPARIA NYT.
- 09.11: Meridiaaniportin 3D-kierrokset odottavat hyväksyttyä julkisivupiirrosta (PK tilaa Codexilta, todelliset mitat); sitten osat
  ladotaan piirroksen ruudukkoon ja verrataan ortokuvin ylhäältä ja edestä. Työkalut valmiina: meridiaani_syvennys.py (env MERIDIAANI_*),
  meridiaani_tunnelisokkeli.py (TUNNELI_KIVI_Y), meridiaani_aukot.py (kääntö, EI käytössä), apu: meridiaani_syvennys_apu.py, lappe_uv_g.py.
- Väliversiot v84–v88 / c2-v23…27 eivät mene pakettiin. Paketti v97 on yhä uusin vienti.

## LISÄYS 127 (30.10. 09.2x): LUOVUTUS (konteksti 36 %) — ALOITA TÄSTÄ
- Jono tyhjä (PT:lle "JONO TYHJÄ: LAV" 09.2x): ulkomuuri 10 m + kulmatornit v1c tehty (paketti v97); A6 odottaa Codexin 7-välistä GLB:tä;
  Meridiaaniportti odottaa hyväksyttyä julkisivupiirrosta (LISÄYS 126). UV-korjatun v189:n pari ajettiin valmiiksi 091047/06, ei lähetetty.
- Ei taustaajoja kesken.

## LISÄYS 128 (30.10. 12.3x): MERIDIAANIPORTTI v190 PIIRROKSEN MITOIN TEHTY + UUSI JONO (Taihemen, sivuhallit) — ALOITA TÄSTÄ
- OMISTAJAN PÄÄTÖS 12.18 (PT): julkisivupiirros v2 hyväksytty → v190 tehty: K/tyokalut/meridiaani_piirros.py (+ _json.py), ketju aja_v190_piirros.zsh
  → K/piirros-v190/kielletty-rakennukset-v90 (= v89) + kielletty-c2-v29 (= c2-v28); juuri H/juuri-pk7-v112 (= v111, linkit v83/c2-v22 → v90/c2-v29).
  Keskiosa 27,0 m (w-kuvaus, päälinna siirtyy ehjänä +1,63), aukot 5,4×5,4 (holvi r 2,7) ja 5,1×4,6 ±14,3 suorina, kehys +0,5/+0,4/0,7, kivijalka 3 m,
  otsapalkit V4_gold, päälinnan y-kuvaus [K]-korkeuksiin (Y_VANHA→Y_UUSI), lappe_uv + glb_tiivista. Kello/rumpu: piirroksessa paikka avoin → ei lisätty.
- Ortovertailu (PK:n orto_glb.py + vertaa.py; orto.sh EI aja: orto-215 vaatii Unity b6, joka poistettu 09.35, b7 tilalla):
  proto-3d/lokit/orto-glb-v190-20261030-1228/ (LUE.md). Pari 06: lokit/havainne-editori-20261030-122828/06 (REF aea0353cd = juna-216/b7;
  c0b59f6b0 ei enää käänny). Pari-skripti: PAIKKA_06="16.4 -474 -2.03" TESTIKAMERA_06="2.5 6.2 3 51" MALLIT/ESIKOM juureen, K/tyokalut/editori-lr.sh 06.
  PT:lle ilmoitettu 12.3x, odottaa kuittausta. Hyväksynnän jälkeen paketti v98 = v97 + rakennukset-v90 + c2-v29.
- UUSI JONO (OMISTAJAN PÄÄTÖKSET 12.28, PT 12.3x): (1) Taihemen 3D: piirrokset-20261030/kortti/taihemen-*-codex-v3.png (+ taihemen-mitat.json):
  pylväät ja alaräystäs [K]-korkeuksiin, keskijänne 7,9 m, sivuportaat akselille symmetrisesti, pronssileijonat x ±19 m.
  (2) Sivuhallit 3D: kortti/sivuhalli-*-codex-v2.png (+ sivuhallit-mitat.json): harja 14,7 m (nyt 19,2), pylväät 6,7 m, leveys 21,0 m, kaksi kattoa.
  Jokaisesta ortovertailu (orto_glb.py/vertaa.py; kohteet f = Taihemen) ja pari PT:lle. Taihedian myöhemmin omistajan hyväksynnän jälkeen.
  Mallina meridiaani_piirros.py: kehys(), y-kuvaus paloittain, laatikon leikkaus (miinus_laatikko), uudet pinnat UV-sovituksella.

## LISÄYS 129 (30.10. 12.5x): TAIHEMEN + SIVUHALLIT v191 TEHTY, PARIT SOVITETTAVA; ENSIN MERIDIAANIN KORJAUS — LUOVUTUS (konteksti 34 %) — ALOITA TÄSTÄ
- JÄRJESTYS (PT 12.5x): 1) Meridiaaniportin korjaus (KK palautti parin 122828/06, PT 12.4x), 2) Taihemen ja sivuhallit SOVITETUIN parein,
  3) Taihedian 3D (OMISTAJAN PÄÄTÖS 12.36: julkisivu v3 hyväksytty: kortti/taihedian-*-codex-v3.png; terassi 3 tasoa 3,1 / 5,3 / 8,13 m, kaiteet,
  御路-ramppi ±1,5, keski- ja sivuportaat ±10,5…16,0, halli 63,96 m, pylväät ja räystäät [K]-korkeuksiin, nyt 2,9–3,6 m liian korkealla).
- 1) MERIDIAANI (K/tyokalut/meridiaani_piirros.py, ketju aja_v190_piirros.zsh → tee v192 omaan kansioon):
  a) sivukäytävien sisäseinissä kivijalan ja rappauksen tekstuuri pystyraitoina (peli-raaka x 940–1110 ja 1650–1820, y 840–990): tunnelin
     seinät (taso_u, laji 'wy') saavat UV:n UVK-matriisista, joka on sovitettu julkisivulle (u, y) → todennäköisesti suunta/mittakaava väärin
     (myös vanhojen sivuseinien UV voi näkyä). Tavoite: harmaassa kivijalassa vaakasuorat kivikerrokset, punainen rappaus tasainen
     (docs/raportit/kaappaukset/omistaja-20261030/portti06-sivuaukko-havainne.png).
  b) keskiaukko: koko 5,4 × 5,4 -suorakaide auki, holvi syvemmällä tunnelin sisällä (nyt suun takaseinän kaarenpuoliskot näkyvät punaisena
     seinänä 1,7 m:n syvyydessä). Helpoin: HOLVI_SISA 1,0 → esim. 4–5 m (suorakaiteinen suu syvemmälle). Jos valokuvan mukaan aukko on
     holvikaari, perustele PT:lle.
  Uusi pari 06 (pari-skripti LISÄYS 128) PT:lle.
- 2) TAIHEMEN v191 (OMISTAJAN PÄÄTÖKSET 12.28): K/tyokalut/taihemen_piirros.py (+ _json.py), sivuhalli_piirros.py, ketju aja_v191_taihemen.zsh
  → K/taihemen-v191/kielletty-rakennukset-v91 (= v90 + f-taihemen + h-zhongyoumen/h-zhongzuomen) + kielletty-c2-v30 (= c2-v29 + Taihemenin
  kaiteeton, 1063-portaat, c2-sijoitukset r=1). Juuri H/juuri-pk7-v113 (= v112, linkit v83/c2-v22 → v91/c2-v30). Ketju ajettu sivuhallien kanssa.
  Taihemen: y-kuvaus [3,9 10,3 12,25 14,2 16,82 23,62] → [3,9 8,0 9,8 14,3 15,45 23,8]; pylväät ±3,3/8,6/13,9/19,2/22,8 → ±3,95/9,34/14,49/19,67/22,91;
  portaat keski ±5,5→±3,3 (御路 ±1,85 jäykkä), sivut ±(14,5…19,5)→±(5,4…8,85); leijonat ±11→±19; jalustan pitkien sivujen kaide (lod0/lod1)
  ja C2-palat 1061/1062/1064 uudelleen jaolla ≈1,47 uusien aukkojen väliin; porraspylväät ja 1063 siirtyvät reunan mukana. Malli on
  paikallisessa kehyksessä symmetrinen, 0,34 m akselista länteen (jätetty, alle ±1 m).
  Sivuhallit: x 21,0/22,075 keskikohdan ympäri + pylväät jakoon 2,4·5,0·6,1·5,0·2,4; y [2,5 7,93 9,59 11,24 13,46 19,24 20,34] → [2,5 6,7 8,15 10,3 10,9 14,7 15,7].
  ORTOVERTAILU: proto-3d/lokit/orto-glb-v191-20261030-1254/ (LUE.md; taihemen/ ja sivuhalli/ *-paalle.png, *-reunat.png, *-ero.txt, vanha-*-ero.txt):
  Taihemen julkisivu IoU 0,44 → 0,67, pohja 0,86; sivuhalli julkisivu 0,28 → 0,63, pohja 0,88 → 0,84. Tehty orto_glb.py + vertaa.py
  (piirros-png:n json = piirrokset-20261030/<nimi>.json kopioituna nimelle *-codex-v3.json / *-codex-v2.json). PT 12.3x: PK:n orto.sh toimii taas
  b7:llä (haara pelikoodari/orto-216) → aja vertailu sillä uudelleen.
  PARIT: Taihemen 124833/03 (v112) / 125108/03 (v113), kamera PAIKKA_03 "8.6 -252 -2.03", TESTIKAMERA_03 "6 12 0 60" → PT 12.5x HYLKÄSI:
  sovittamaton (keisari 0,05 vs havainne 0,12, kuvakulma eri: havainteessa 03 Taihedian aukion takana). Tee uusi pari sovitetulla kameralla
  (keisari 0,12, sama horisontti kuin havainteessa 03) ja liitä ortovertailun päällekkäiskuvat (julkisivu + pohja) PT:lle. Sama sivuhalleille:
  sivuhallien pari 03s-kameralla (PAIKKA_03 "6.43 -203 -2.03", TESTIKAMERA_03 "4 6 0 60") oli ajossa luovutushetkellä (uusin lokit/havainne-editori-*
  13.0x) – ei lähetetty; tarkista sovitus samoin.
- Hyväksynnän jälkeen paketti v98 = v97 + rakennukset-v91 + c2-v30 (sisältää myös Meridiaanin v90:n; Meridiaanin korjaus tekee v92:n → ketjuta).

## LISÄYS 130 (30.10. 13.2x): MERIDIAANI v192 + SOVITETUT PARIT (Taihemen, sivuhallit) PT:lle — ALOITA TÄSTÄ
- 1b) Keskiaukko: meridiaani_piirros.py HOLVI_SISA env:stä (oletus 1,0); ketju aja_v192_meridiaani.zsh (HOLVI_SISA=4,5) ajaa Meridiaanin
  v189:stä ja vaihtaa sen taihemen-v191:n päälle → K/meridiaani-v192/kielletty-rakennukset-v92 (= v91 + Meridiaani) + kielletty-c2-v31 (= c2-v30
  + Meridiaani); json = v91. Juuri H/juuri-pk7-v114 (= v113, linkit v83/c2-v22 → v92/c2-v31). Pari 06 (REF aea0353cd, kamera kuten LISÄYS 128):
  lokit/havainne-editori-20261030-130227/06 – 5,4 × 5,4 suu suorakaiteena, holvi 5,2 m syvemmällä (kaari näkyy pienenä käytävän päässä).
- 1a) Sivukäytävien pystyraidat EIVÄT ole UV-virhe: tunnelin kivijalan UV = julkisivun (2,0 m/u pitkin käytävää, 1,75 m/v pystyyn, tarkistettu glb:stä),
  V4_red:llä ei UV:ta (JuoksuLattia.shader SokkelonPinta piirtää maailmakoordinaateissa, valumat pystysuuntaisia). Raidat syntyvät loivassa
  kulmassa varjostimessa (saumat häipyvät fwidth:n mukaan, kivittäiset sävyt jäävät pystyjuoviksi) → VS:n alue; kerrottu PT:lle. Sama näkyy v189:ssä (091047/06).
- 2) Sovitetut parit (havainteen 03 kamera: TESTIKAMERA_03 "3.5 5.7 17 51", keisari 0,11–0,12; juuri v114):
  Taihemen PAIKKA_03 "7.34 -340 -2.03": lokit/havainne-editori-20261030-132135/03 (Taihemen aukion takana kuten Taihedian havainteessa; horisontti 0,13).
  Sivuhallit 03-oletuspaikalta lokit/…-131743/03 (sivuhallit lähimuurien takana, ei näy) → oma kulma PAIKKA_03 "55 -60 25", TESTIKAMERA_03 "3.5 5.7 12 51":
  lokit/…-132419/03 (中左门 terassin takana). Ortopäällekkäiskuvat: proto-3d/lokit/orto-glb-v191-20261030-1254/{taihemen,sivuhalli}/{julkisivu,pohja}-paalle.png.
  PK:n orto.sh (pelikoodari/orto-216) ei ajettu: haaraa ei löytynyt fetchillä proto-lavastaja-kerroin-puusta.
- Hyväksynnän jälkeen paketti v98 = v97 + rakennukset-v92 + c2-v31. Seuraavaksi: 3) Taihedian 3D (LISÄYS 129).

## LISÄYS 131 (30.10. 13.5x): TAIHEDIAN v193 PIIRROKSEN v3 MITOIN — PT:lle, odottaa kuittausta
- PT 13.0x jono: 1b/2/3 = LISÄYS 130. orto.sh (PK, proto-3d/_tyo/pelikoodari/piirrokset-20261030/orto.sh, JUURI_K=juuri): Taihemen lokit/orto-20261030-133011
  (f ok); 06 lokit/orto-20261030-132733 kuvaa väärää kohdetta (mäki + pohjoisportti) → PK:n työkalu. 1a kysytty PT:ltä: geometrinen kierto
  (1 cm kerrossaumat kivijalkaan + käytävän rappaukselle tasavärimateriaali) vai VS varjostimeen.
- K/tyokalut/taihedian_piirros.py (+ _json.py), ketju aja_v193_taihedian.zsh → K/taihedian-v193/kielletty-rakennukset-v93 (= v92 + g-taihedian,
  g-jalusta, g-jalusta-etu) + kielletty-c2-v32 (= c2-v31 + kaiteeton, 1063-portaat, C2-palat r=2). Juuri H/juuri-pk7-v115 (= v114, linkit → v93/c2-v32).
  Halli: runko x × 1,051, z × 1,086 (63,96 × 37), y 8,95–16,51 → 8,95–13,6; katto-verkko x/z paloittain (yläkerros 57,6, alapalkkivyö 65,4,
  räystäs ±34,5 × ±20,6), palkkivyöt 13,6–16,3 / 20,1–21,3, katto 15,5 → 20,2 / 20,8 → 33,45, harja 35,05, 螭吻 37,7.
  Terassi: tasot 2,71/5,42/8,13 → 3,1/5,3/8,13 (isot palat paloittain, pienet jäykkinä pohjansa tai tason mukana); etelän portaat
  ±1,55/4,5/10,4/15,3 → ±1,5/3,8/10,5/16,0 (z' < −59,3, 垂带 jäykkinä); C2: 1061/1062 pohjan mukaan, 1064 tason mukaan, 1062 sx porrasvälissä.
- Ortovertailu (orto.sh g + vertaa.py): proto-3d/lokit/orto-v193-taihedian-20261030-1351/ julkisivu IoU 0,76, pohja 0,78 (*-paalle.png).
  Pari 03 havainteen kameralla (TESTIKAMERA_03 "3.5 5.7 17 51", keisari 0,12): lokit/havainne-editori-20261030-134256/03; pelin oletuskamera 134650/03.
- Hyväksynnän jälkeen paketti v98 = v97 + rakennukset-v93 + c2-v32 (sisältää v90–v92).

## LISÄYS 132 (30.10. 13.5x): LUOVUTUS (konteksti > 30 %) — ALOITA TÄSTÄ. Uusi jono PT 13.3x/13.50 (sitova)
- KUITATTU: Meridiaani v192 keskiaukko OK. 1a pystyraidat → VS korjaa varjostimeen (PT 13.3x: ÄLÄ tee uutta materiaalia eikä geometrista kiertoa).
  Taihedian v193 (LISÄYS 131) lähetetty, mutta PT:n järjestys: ensin alla olevat Taihemen- ja sivuhallikorjaukset, sitten Taihedian (v193 jää odottamaan).
- PK 13.4x: orto.sh 06 korjattu (syvyysraja, bd3240620); uusi kuva juurella v114: proto-3d/lokit/orto-20261030-133445/06-{edesta,ylhaalta}.png.
- JONO (PT 13.3x + 13.50, piirrokset proto-3d/_tyo/pelikoodari/piirrokset-20261030/kortti/{taihemen-*-codex-v3,sivuhalli-*-codex-v2}.png,
  ortot nyt lokit/orto-glb-v191-20261030-1254/{taihemen,sivuhalli}/julkisivu-vierekkain.png):
  1) SIVUHALLI (sivuhalli_piirros.py, h-zhongyoumen/h-zhongzuomen): yläkatto on pystyseinäinen laatikko → kaksi kaltevaa kattoa piirroksen
     mukaan; julkisivuun ikkunaristikot ja ovijako (5 jännettä 2,4·5,0·6,1·5,0·2,4); jalusta harmaa möhkäle → matala valkoinen marmorijalusta.
  2) TAIHEMEN (taihemen_piirros.py): yläkatto leveämmäksi (ylälappeen leveys piirroksen mukaan); harjan päällä harmaa nauha pois; alakaton
     nurkkakaarre loivemmaksi; keskijänne (7,9 m) tumma tyhjä aukko → ovet piirroksen mukaan.
  3) Uusi ketju v194 (pohja: K/taihedian-v193 sisältää jo v193:n Taihedianin; jos Taihedian halutaan erikseen, pohjaksi meridiaani-v192 ja v193 päälle
     myöhemmin). Ortot: orto_glb.py + vertaa.py (kuten LUE.md lokit/orto-glb-v191-…) ja orto.sh f; vierekkäiskuvat todisteeksi.
  4) PARIT: kamera, jossa kohde näkyy (132135/03 näytti Kultaisen veden siltoja). Ehdotus: Taihemen keisari siltojen pohjoispuolelle
     (esim. PAIKKA_03 "7.34 -262 -2.03", orto.sh:n SIJ[f] = 9.2 −259.8) ja TESTIKAMERA_03 "3.5 5.7 12 51"; sivuhallille PAIKKA_03 "55 -60 25" (132419/03 näytti 中左门).
     Pari-ajo: K/tyokalut/editori-lr.sh, REF=aea0353cd MALLIT=file://<juuri>/ ESIKOM="ui juoksupeli palatsi url file://<juuri>/kk-pohja-v1d-pk7/pohja.json".
     Uusi juuri: cp -a H/juuri-pk7-v115 → v116 ja linkit kielletty-rakennukset-v83 / kielletty-c2-v22 uuteen versioon.
  5) Valmis erä PT:lle ≤ 3 riviä; sitten Taihedian (v193 valmiina: ortot orto-v193-taihedian-20261030-1351, pari 134256/03) uudelleen PT:lle.
- Ei taustaajoja kesken. Hyväksytyt paketin osat: v92 (Meridiaani). v98-paketti vasta kaikkien kuittausten jälkeen.

## LISÄYS 133 (30.10. 14.0x): PT 13.58 – JÄRJESTYS MUUTTUI: TAIHEDIAN v193 KORJAUKSET ENSIN, sitten Taihemen + sivuhallit (LISÄYS 132)
- Ortosta lokit/orto-v193-taihedian-20261030-1351/julkisivu-vierekkain.png:
  1) alakaton räystäskulmista ohuet kaarevat "viikset" kauas sivuille → pois; räystään kaari piirroksen mukaan. (Todennäköisesti katto-verkon
     kulmakoristeet/nurkkaköydet, jotka ulottuvat yli 34,32: KATTO_X/KATTO_Z jatkuvat päiden yli siirtona → tarkista osat |x| > 34,3 tai |z| > 20,9
     lod0:ssa ja leikkaa/skaalaa räystään sisään.)
  2) alakatto näkyy ohuena nauhana; piirroksessa leveä näkyvä lape 15,5–20,1 → ylä-/alakaton erotus: yläräystäs 20,8 peittää alakaton,
     koska yläkaton räystäs ulottuu x ±31,6 (yläräystäs pitää olla piirroksen mukaan kapeampi tai alakatto ulommas/loivemmin näkyviin).
  3) terassin kolme tasoa (3,1/5,3/8,13) ja sivuportaat eivät erotu edestä, näkyy yksi tasainen muuri → tarkista orto.sh g -kuvan kamera
     (EDE[g] z' −95,5, y 22) ja tasojen etureunat (z' −76,4 / −66,9 / −59,5); tarvittaessa tasojen etuseinät/kaiteet erottuviksi.
- Sen jälkeen uusi orto (orto.sh g + vertaa.py) + pari 03 → PT; sitten LISÄYS 132:n jono.

## LISÄYS 134 (30.10. 14.3x): v194 TAIHEMEN + SIVUHALLIT TEHTY, C1-VIIKSET KORJATTU (c1-v10) — LUOVUTUS (konteksti 34 %), ALOITA TÄSTÄ
- Postivahdin välittämä PT:n ohje (voittaa LISÄYS 133:n järjestyksen): ensin Taihemen + sivuhallit, sitten Taihedian v193:n kolme korjausta.
- TEHTY v194: K/tyokalut/aja_v194_taihemen_sivuhallit.zsh (taihemen_v194.py, sivuhalli_v194.py, v194_json.py) → K/taihemen-sivuhallit-v194/
  kielletty-rakennukset-v94 (= v93 + Taihemen + sivuhallit + jalustat) + kielletty-c2-v33 (= c2-v32 + Taihemenin kaiteeton). Juuri H/juuri-pk7-v116.
  Yksityiskohdat ja kuvat: /Users/Shared/Claude/proto-3d/lokit/orto-glb-v194-20261030-1403/LUE.md (koonti-v93-v94.png, c1-ennen-sininen-jalkeen-punainen.png).
  sivuhalli_v194.kattokapenee(g, cx, kp) = yleinen "pystyseinäinen yläkatto → kalteva" -työkalu (x-skaala korkeuden mukaan ääriviivasta).
- C1 (Taihedianin viikset, PT 13.58 kohta 1): pelin kielletty-c1-v8:n f-taihemen/g-taihedian-palat olivat vanhojen räystäiden kohdalla (1,5–3 m liian
  ylhäällä v191/v193:n jälkeen). c1_raystaat2.py ei toimi enää (vanha kultareuna leikattu malleista) → K/tyokalut/c1_muunna.py muuntaa palat katon
  pistekuvauksella (Jacobin + paikka) → K/c1-v10/kielletty-c1-v10 (peli lukee nimeä kielletty-c1-v8: juuressa v116 linkki c1-v8 → c1-v10).
  Paketissa kansio pitää viedä nimellä, jota peli lukee (kielletty-c1-v8 → uusi versio vaatii PK:n nimimuutoksen TAI sisällön korvauksen; kysy PT).
- Parit (juuri v116, REF aea0353cd, scratchpad pari_v194.zsh): sivuhalli 中左门 lokit/havainne-editori-20261030-140636/03 (PAIKKA_03 "55 -60 25");
  Taihemen etäämpää TESTIKAMERA_03 "7 28 10 51" PAIKKA_03 "7.34 -262 -2.03" → PARI_TAIHEMEN (lähin kamera 140419/03 näytti ovet oikein, katto rajautui).
- PT:LLE LÄHETETTY: v194 (3 riviä) — odottaa kuittausta. Hyväksynnän jälkeen paketti v98 = v97 + rakennukset-v94 + c2-v33 + c1-v10.
- PT 14.2x (SITOVA, ENSIN ennen Taihemenin/Taihedianin jatkoa): MERIDIAANIPORTTI v192, KK palautti parin 140135/06. Portin kivijalka beige
  (≈218/186/164) ja sivukäytävien sisäpinnat eri sävyä (≈176/153/141); OMISTAJAN PÄÄTÖS 27.10. 16.03: kivijalka = kujien harmaa (pari 053411/03).
  Korjaa: 1) portin kivijalan ulkopinta + kaikkien käytävien sisäpinnat samaksi materiaaliksi kuin kujien kivijalka (V4_kujakivi_sokkeli? tarkista
  kujamuurien materiaali; meridiaani_piirros.py / meridiaani_tunnelisokkeli.py, nyt V4_jalusta_lohkokivi?); 2) vaaleat pystykivet aukkojen reunoihin
  havainteen mukaan (docs/raportit/kaappaukset/omistaja-20261030/portti06-sivuaukko-havainne.png). Pohjana VS:n raitakorjaus linssiseppa2/loiva-216
  84d490f44 (pari-ajon REF). Uusi pari 06 (LISÄYS 128:n pari-skripti) + sävymittaus kivijalasta (peli-raaka.png pikselit) → PT ≤ 3 riviä.
- C1-pari: viimeisin ajo (scratchpad pari_v194.zsh: Taihemen 03 etäältä + orto.sh g juurella v116) oli kesken luovutuksessa → uusin
  lokit/havainne-editori-*/03 ja lokit/orto-*/g-edesta.png. Tarkista: Taihemenin C1-rivi räystään reunalla yhtenäisenä (ei litteinä palleroina katolla,
  kuten 141211/03; korjattu: c1_muunna.py pystysuunta jäykkänä) ja Taihedianin viikset poissa. Jos rivi on yhä katolla, säädä YLA_SX/YLA_SZ tai
  tarkista palan pivot (1055: takayläreuna z 0, etuhuuli z 0,5).
- SEURAAVAKSI (Meridiaanin jälkeen): TAIHEDIAN v195 (PT 13.58, kohdat 1–3), pohja taihemen-sivuhallit-v194 → kielletty-rakennukset-v95:
  1) viikset = C1 (korjattu c1-v10:ssä; glb-ortossa ei viiksiä). Jos v195 muuttaa Taihedianin kattoa, lisää kuvaus c1_muunna.py:n taihedian_F:ään.
  2) alakatto "ohut nauha": pelin orton (orto-v193-taihedian-20261030-1351) mittaus x 0/±25: alakatto näkyy 15,6–20,2 m = piirroksen 15,7–20,1 m;
     kapeaksi sen sai näyttämään vanhojen C1-palojen viiva 18,6–18,9 m:ssä. Aja orto.sh g juurella v116 ja tarkista ennen kuin muutat kattoa.
  3) terassin tasot: geometria oikein (C2-kaiteet 3,1/5,3/8,13, glb-orto näyttää tasot), mutta pelissä valkoinen kaide valkoista seinää vasten ei erotu
     (havainne 134256/03 zoomattuna: kolme kaiderivia heikosti). Ehdotus: tasojen pystypinnat V4_jalusta_lohkokivi (jalusta_lohkokivi.py, käytössä
     Taihemenin jalustassa ja Meridiaanissa; piirroksessa tasoissa kivikerrokset) → kaiteet erottuvat. Sivuportaat (±10,5…16,0) näkyvät pelissä.
     Tämä on materiaalivalinta olemassa olevasta → tee, ellei PT toisin sano; pari 03 + orto.sh g → PT.

## LISÄYS 135 (30.10. 14.3x): PT 14.3x – JÄRJESTYS UUDELLE LAV:LLE (sitova)
1) Meridiaanin kivijalka (PT 14.2x, LISÄYS 134). 2) v116:n "kiilat/siirtymät" parissa 140636/03: aukiolla kolmiomaiset kiilat + harmaa laatta,
   valkea terassi vasemmalla. HUOM (LR): 140636/03 oli tarkoituksella sivuhallin oma kulma (PAIKKA_03 "55 -60 25", ei havainteen kulma) ja 141211/03
   kaukokamera (TESTIKAMERA_03 "7 28 10 51" → keisari 0,02 tarkoituksella). Selvitä silti kiilat: ovatko ne jo v115:ssä (aja sama kulma juurella v115)
   vai v194:n (sivuhalli_v194 / jalustan materiaali / t-portti-zhongzuomen) – todennäköisesti t-portti-zhongzuomenin portaat tai C2/垂带-palat.
   Aja sitten 03 havainteen kulmalla (TESTIKAMERA_03 "3.5 5.7 17 51", oletuspaikka) uudelleen. 3) Taihemenin yläkaton nurkissa kaksinkertainen porras
   (todennäköisesti C1 1056-kulmat + mallin oma nurkka, c1_muunna.py:n YLA_SX/YLA_SZ) → yksi siisti räystäs kuten piirroksessa.
   EI PAKETTIA ennen kuin 03 on ehjä.

## LISÄYS 136 (30.10. 15.1x): MERIDIAANI v195 KUITATTU, KIILAT POIS (tausta-v77), C1 v11 KESKEN — LUOVUTUS (konteksti 33 %), ALOITA TÄSTÄ
- 1) MERIDIAANI v195 (PT 14.2x; PT 14.5x KUITTASI: "pidä v195:n materiaalit ja pystykivet", sävyn korjaa VS yhteiseen _JuoksuKujaKiviSokkeli-sävyyn):
  K/tyokalut/aja_v195_meridiaani.zsh (pohja taihemen-sivuhallit-v194) → K/meridiaani-v195/kielletty-rakennukset-v95 + kielletty-c2-v34.
  Kivijalka + käytävien kivijalka V4_jalusta_lohkokivi → V4_kujakivi_sokkeli (kivijalka_kujakivi.py, UV jo 2,0/1,75 m), aukkojen pielissä
  V4_marmori-pystykivet (meridiaani_piirros.py PYSTYKIVI; varmuuskopio meridiaani_piirros-v192.py.bak). Pari 06: lokit/havainne-editori-20261030-142633/06 (LUE.md, sävymittaus).
- 2) KIILAT (PT 14.3x): EIVÄT v194:stä — näkyvät jo v114:ssä (132419/03) ja v115:ssä (144935/03). Lähde: taustapalojen kk-tausta-2-1/2-2 (ja peilipuoli
  1-1/1-2) vanhat kivijalkaseinät sivuhallien kohdalla, joista suorakaiteen toinen kolmio oli leikattu → pystyt kolmiokiilat. K/tyokalut/tausta_kiilat.py
  poistaa orvot pystykolmiot (V4_kujakivi_sokkeli/V4_marmori, sivuhallien laatikot) → K/kiilat-v196/kielletty-tausta-v77 (= v92-paketin tausta-v76 + korjaus,
  kaikki LODit). Juuri H/juuri-pk7-v119 (linkki kielletty-tausta-v76 → v77). Ennen/jälkeen: lokit/havainne-editori-20261030-150048/03/kiilat-ennen-jalkeen.png
  (kamera PAIKKA_03 "55 -60 25", TESTIKAMERA_03 "3.5 5.7 12 51"). AVOIN: harmaa laatta + ohuet harmaat pystypalat oikealla (sama kuva) – ei vielä paikannettu.
  Havainteen kulma 03 (v117, TESTIKAMERA_03 "3.5 5.7 17 51", oletuspaikka): lokit/havainne-editori-20261030-143817/03 – ei kiiloja, ehjä.
  PT:lle EI VIELÄ LÄHETETTY kiiloista erillistä viestiä (rivi lähetetty luovutuksen yhteydessä).
- 3) TAIHEMENIN YLÄKATON NURKAT (kaksoisporras): syy = C1-palat. v194 kavensi yläkattoa (sivureuna |x| 22,13, nurkka 22,38/9,95/y 16,66), mutta c1-v10:n
  sivurivi ja 1056-kulmat olivat |x| 22,95 → leijuivat 0,8 m katon ulkopuolella. c1_muunna.py v11 (--taihemen-jalkeen <v194 f-taihemen-lod0>; varmuuskopio
  c1_muunna-v10.py.bak): etupalat v10:n syvyys/korkeus, x skaalattu nurkkaan; sivupalat x = sivureuna + 0,1, y reunan mukaan; kulmat nurkkaan.
  Toisto: `python3 c1_muunna.py <v97-paketin kielletty-c1-v8/c1-sijoitukset.json> <ulos> K/taihemen-sivuhallit-v194/kielletty-rakennukset-v94/rakennukset.json
  --taihemen-ennen K/taihedian-v193/kielletty-rakennukset-v93/f-taihemen-lod0.glb --taihedian v193 --taihemen-jalkeen K/taihemen-sivuhallit-v194/kielletty-rakennukset-v94/f-taihemen-lod0.glb`
  (ilman --taihemen-jalkeen tuottaa tavu tavulta c1-v10:n). Tulos K/c1-v11/kielletty-c1-v11 (juuret v118/v119: linkki kielletty-c1-v8 → c1-v11).
  Pari (TESTIKAMERA_03 "7 28 10 51" PAIKKA_03 "7.34 -262 -2.03"): lokit/havainne-editori-20261030-150720/03/c1-ennen-jalkeen.png: etureuna ehjä, nurkka siistimpi,
  MUTTA SIVURIVI YHÄ IRTI katon alapuolella (näkyy erillisenä vinona rivinä vasemmassa nurkassa). Seuraavaksi: tarkista c1_muunna.py:n taihemen_reuna/reuna(2,0,z)
  – katon sivureunan y ja |x| (V4_palatsi_katto, y 14,5–19 voi poimia alemman pinnan); vertaa pala-y:tä reunan y:hyn z-kohdittain; tavoite sivurivi kuten etu.
  HUOM: keskellä yläkattoa näkyvä lyhyt vihreä rivi = taempien rakennusten (Taihedian) C1 kaukaa, ei Taihemenin.
- EI PAKETTIA ennen kuin 03 on ehjä (PT 14.3x). Sitten Taihedian v196+ (LISÄYS 134 "SEURAAVAKSI"; rakennukset-v95 on nyt Meridiaani → Taihedian seuraava vapaa numero).
- Paketin osat valmiina: rakennukset-v95 + c2-v34 (meridiaani-v195), tausta-v77 (kiilat-v196), c1-v11 (kesken). Ei taustaajoja käynnissä.

## LISÄYS 137 (30.10. 15.1x): PT 15.1x uudelle LAV:lle (sitova jono)
1) Harmaa laatta oikealla + muurin edessä kaksi harmaata pystylaattaa (150048/03 jälkeen-kuva) → paikanna (taustan kk-tausta-2-1/2-2? tausta_kiilat.py:n
   orvot.py-tyyppinen haku muille materiaaleille, esim. V4_harmaa/V4_marmori vinot) ja poista/korjaa.
2) Kamerat: LAV:n 03-pareissa näkymä vinossa terassiin päin, kun VS:n 145925/03 (sama kohta) katsoo suoraan Taihedianiin → tarkista kamera/juuri ennen kuin
   parit kelpaavat todisteeksi. (Huom. 144935/145156/150048 ajettiin tarkoituksella sivuhallin kulmasta PAIKKA_03 "55 -60 25"; havainteen kulma oli 143817/03 –
   vertaa VS:n 145925/03:n skenaario.txt:n "valo sijoita"/"testikamera"-rivejä omiin.)
3) Taihemenin C1-sivurivi (LISÄYS 136 kohta 3).
Paketti v98 (Meridiaani) vasta KK:n Kyllän jälkeen.

## LISÄYS 138 (30.10. 15.2x): PT 15.2x – ENSIMMÄISEKSI ennen LISÄYS 137:n jonoa (KK pidätti Meridiaanin kortin)
1) KIVIJALAN KORKEUS: 3,0 m (meridiaani_piirros.py KIVI = 3.0) on piirroksessa [A]-arvio ("varmennettava ennen 3D-työtä"). Lähdekuvissa
   (commons/orig-Meridian_Gate_center.JPG, wumen-center*) punainen seinä alkaa ihmisten silmien tasolta (~1,6 m) ja lipunmyyntikojun räystään alta
   → kivijalka ≤ ~1,6 m. Mittaa todellinen korkeus kuvasta, jossa seinän alaosa ja mittakaava (ihminen/ovi) näkyvät; kirjaa lähde + laskelma
   LUE.md:hen; korjaa malli (ulkopinta + käytävät): KIVI env-muuttujaksi meridiaani_piirros.py:hyn ja aja aja_v195_meridiaani.zsh uutena versiona
   (huom. siivet/U-jalusta v189:stä: tarkista myös niiden kivijalan korkeus, jalusta_lohkokivi-pinnat 0–3 m).
2) PIELIEN PYSTYKIVET eivät erotu VS:n parissa 145925/06 → näkyviksi (leveys ja sävyero havainteen mukaan; nyt 0,5 m V4_marmori syvennyksen
   takaseinässä, PYSTYKIVI-muuttuja). Uusi pari 06 pohjana VS 4b0476ca0 (REF=4b0476ca0) + lähikuva sivuaukosta → PT ≤ 3 riviä.
Sitten LISÄYS 137 (laatat, kamera, C1-sivurivi).

## LISÄYS 139 (30.10. 15.2x): LISÄYS 138 TEHTY (Meridiaani v197), PT KUITTASI 1,6 m — LUOVUTUS (konteksti 30 %), ALOITA TÄSTÄ
- v197: K/tyokalut/aja_v197_meridiaani.zsh (KIVI=1.6, pohja taihemen-sivuhallit-v194) → K/meridiaani-v197/kielletty-rakennukset-v96 + kielletty-c2-v35;
  juuri H/juuri-pk7-v120 (= v119, linkit kielletty-rakennukset-v83 / kielletty-c2-v22 → v96 / c2-v35). meridiaani_piirros.py: KIVI env; pystykivet
  (V4_marmori) 0,5 m × kivijalan korkeus takaseinään + syvennyksen sivuseiniin (v195:ssä ehto b1 ≤ h ei täyttynyt → kiviä EI ollut mallissa;
  varmuuskopio meridiaani_piirros-v195.py.bak). Uusi kivijalka_korkeus.py: siipien/U-jalustan v189-kivijalka 3,0 → KIVI, v = 1 − 0,57·y.
- Mittaus + parit: proto-3d/lokit/kivijalka-v197-20261030-1520/LUE.md (horisonttimenetelmä wumen-center2-ccbysa.jpg), pari 06 + lähikuva
  lokit/havainne-editori-20261030-151749/{06,07} (REF 4b0476ca0; 07 = sivuaukon lähikamera PAIKKA "30.7 -405 -2.03", TESTIKAMERA "1.7 6 0 45").
- PT 15.2x: "1,6 m pätee (mitat todelliset, havainne vain ulkoasu)". v197 KK:n kortilla; PAKETTI v98 VASTA KK:N KYLLÄN JÄLKEEN
  (v98 = v97 + rakennukset-v96 + c2-v35 + tausta-v77 (kiilat-v196) + c1 (kesken)). PK:lle portti06-mitat.json "harmaa kivisokkeli" 3,0 → 1,6 (PT välittää tarvittaessa).
- LISÄYS 137: 1) harmaat laatat EIVÄT LAV:n malleissa → pohja.json muurit[338] / 侧墙6 (≈101, −15) → PT välittää PK:lle. 2) 03-parit VS:n kameralla
  (sijoita 6.43 −190.73, TESTIKAMERA_03 "3.65 6.88 14.5 45"). 3) SEURAAVAKSI (PT: "Jatka C1-sivuriviä"): Taihemenin yläkaton C1-sivurivi.
  Analyysi: v11:n sivupalat jo 0,11 ulos / 0,12 alas reunasta kuten etu (reuna |x| 22,13–22,47, y 15,46–16,6). c1_muunna.py C1_SIVU=v12 (reunakäyrä
  |z|-lokeroittain, varmuuskopio c1_muunna-v11.py.bak) → K/c1-v12 ≈ v11 (EI juuressa). Irtonaisuus siis muusta: tee lähikamera nurkasta (Taihemen
  pohja ~ (7.34, −262)), tarkista 1055-palan pivot/suunta sivulla (L-sarake 2 = ulos +x) ja kuva 150720/03/c1-ennen-jalkeen.png (sivurivi
  erillinen vino rivi soffitin alla). Mahdollisesti sivurivi pitää nostaa katon pinnalle tai kallistaa lappeen mukaan.
- Ei taustaajoja kesken.

## LISÄYS 140 (30.10. 16.2x): v98c VIETY, C1 v13 + TAIHEDIAN v198 TEHTY, KOOSTE PT:LLÄ — LUOVUTUS (konteksti 30 %), ALOITA TÄSTÄ
- PAKETIT: v98 (koko juuri v120) HYLÄTTY (PT 15.5x: mukana kuittaamattomat v194 + c1-v11) → _valmiit/…-v98-HYLATTY-…; v98b = v97 + VAIN Meridiaani v197
  (a-meridiaaniportti ×4 + rakennukset.json a-rivi + c2 kaiteeton) + kiilat (tausta-v77) → JU: ämpäri EI YLIKIRJOITA olemassa olevia polkuja → v98c =
  v98b UUSILLA KANSIONIMILLÄ kielletty-rakennukset-v84 / -c2-v23 / -tausta-v77 (c1-v8 ym. ennallaan). PT kuittasi v98c, JU vie (pelin viittaukset PK/NS).
  Skripti: scratchpad paketti_v98b.zsh / paketti_v98c.zsh (kopioi tähän tarvittaessa). Varmistus: Taihemen 03 v98b vs v97 23 px ero
  (lokit/havainne-editori-20261030-154010/03/ero-v97-v98b.png), 06 kivijalka 154010/06.
  SÄÄNTÖ JATKOSSA: jokainen muuttunut kansio uudella nimellä (seuraavat vapaat: rakennukset-v85, c2-v24, tausta-v78, c1-v9).
- C1 v13 (PT 16.1x "hyvä, rivi kiinni"): K/tyokalut/c1_muunna.py C1_SIVU=v13 (oletus; varmuuskopio c1_muunna-v12.py.bak): sivupalat luokitus palan suunnasta
  (keskiosa |x| 22,47 < 22,5 oli etuluokassa → v12 ei koskenut niihin), sivupivot SIVU_ULOS −0,25 (palat roikkuivat reunan ulkopuolella → taivasrako),
  reunakäyrät ±0,5 m lokeroin, etu reunakäyrän mukaan (keskellä = v10 9,19/15,34), palat kallistettu reunan nousuun (h 0,52), kulmien 8 päällekkäistä
  päätypalaa pois (vihreä kärki). Ajo kuten LISÄYS 136, sisään v97-paketin kielletty-c1-v8 → K/c1-v13/kielletty-c1-v13.
- TAIHEDIAN v198 (PT 13.58 kohta 3): K/tyokalut/terassi_kivi.py + aja_v198_taihedian.zsh (pohja meridiaani-v197) → K/taihedian-v198/kielletty-rakennukset-v97
  + kielletty-c2-v36: terassin tasojen seinät (tason reunalla ≤ 0,8 m, tason korkeuden alla; reunat tasapinnoista, z portaiden ulkopuolelta |x| > 20)
  V4_marmori → V4_kujakivi_sokkeli; kaiteet/portaat marmoria. Kohdat a (viikset) ja b (alakatto) jo kunnossa (orto 155812).
- JUURET: v121 = v120 + c1-v13; v122 = v98b-paketti; v123-v97 = v97-paketti; v124 = v121 + taihedian-v198 (rakennukset-v83 → v97, c2-v22 → v36).
- KOOSTE PT:LLE LÄHETETTY 16.1x: proto-3d/lokit/kooste-v198-20261030-1615/koonti.png + LUE.md (Taihemen+sivuhallit v194, C1 v13, Taihedian v198) → kortille.
  Kyllän jälkeen paketti v99 = v98c + rakennukset (taihedian-v198 R, sis. v194 + v193) nimellä rakennukset-v85, c2-v36 → c2-v24, c1-v13 → c1-v9
  (pelin viittaukset!), SHA256SUMS → PT → JU. Ei taustaajoja kesken.

## LISÄYS 141 (30.10. 16.2x): PYSYVÄ SÄÄNTÖ – TARKISTUKSET ENNEN PARIA/KORTTIA (PT 16.2x, omistaja 16.0x, Raamattu 2.177)
Ennen kuin yksikään pari tai kortti lähtee PT:lle, mukana AINA:
1) Edestä otettu orto piirroksen päälle: vierekkäin + päällekkäin, IoU-luku.
2) Automaattinen tarkistus: materiaalien värit havainteeseen ja omistajan päätöksiin + lähikuvat jokaisesta muutetusta kohdasta.
3) Piirroksen [A]-mitat varmennettu kuvista ennen 3D-työtä (lähde + laskelma LUE.md:hen).
Puuttuva kohta = palautus. Koskee myös v99:n jälkeisiä eriä. Jono: tyhjä, v99 odottaa omistajan korttia (LISÄYS 140).

## LISÄYS 142 (30.10. 17.2x): v199 TEHTY (PT 16.4x + 16.5x), KOOSTE PT:LLE — JONO
- v199: K/tyokalut/aja_v199.zsh → K/v199/{kielletty-rakennukset-v98, kielletty-c2-v37, kielletty-tausta-v78}, juuri H/juuri-pk7-v125
  (= v124, linkit rakennukset-v83 → v98, c2-v22 → c2-v37, tausta-v76 → tausta-v78). Pohja meridiaani-v197 (v198:n terassi_kivi POIS = seinät marmoria).
  Uudet työkalut: kaide_paksu.py (C2 1061 ×1,5/×1,15, 1062 paksuus ×2), yulu_kuva.py + yulu.py (keskiluiskat V4_yulu; valinta |x| ≤ 1,81, jänne ≥ 2,5,
  nousu ≥ 1; VAALEUS 0,9 – 1,22 paloi puhki), tausta_jalusta_lattiaksi.py (2-1 vaaka-V4_marmori y > 0,9 → V4_lattia), lattia_kiilat_tasaa.py (2-0 lod0 kiilat → y 0).
- Kooste: proto-3d/lokit/kooste-v199-20261030-1715/koonti.png + LUE.md (sääntö 2.177: IoU Taihedian 0,77 / Taihemen 0,72, värimittaus, lähikuvat).
  Kortille 3 kysymystä: Taihemen (1–2), sivuhallit (3–4), Taihedian (5–7); 8 = sauma (virheen korjaus).
- Avoin: yulu-kohokuvio on koodilla tehty väliaikainen kuvio (Codex voi tehdä aidon). Pelissä terassin seinä on yhtä vaalea kuin kaiteet (havainteessa
  seinä on varjossa tummempi).
- JONO: kortin Kyllän jälkeen paketti v99 = v98c + rakennukset-v85 (R v98), c2-v24 (C v37), tausta-v78, c1-v9 (C1 v13) → SHA256SUMS → PT → JU.
  Sen jälkeen osasarja-v2 (PK:n vaatimukset proto-3d/_tyo/pelikoodari/piirrokset-20261030/VAATIMUKSET-osasarja-v2.md; omistajan päätös 16.20),
  paketti PT:n kuittauksella.

## LISÄYS 143 (30.10. 17.4x): OMISTAJA 17.26 HYVÄKSYI v199 → PAKETTI v99 TEHTY, PT:N SHA-KUITTAUS ODOTTAA
- _valmiit/juoksupeli-kk-lavastaja-v99-vienti-20261030 (K/tyokalut/paketti_v99.zsh): v98c − rakennukset-v84/c2-v23/tausta-v77/c1-v8 +
  rakennukset-v85 (= K/v199 R v98), c2-v24 (= C v37), tausta-v78, c1-v9 (= c1-v13). 720 tiedostoa, SHA256SUMS 76817d1b6284, 1,3 Gt; kansioiden SHA:t OK.
  V4_yulu-kuva paketissa ka. sRGB 165/160/149 (= VAALEUS 0,9, ei puhki palanutta 1,22-koetta).
- KK (1) harmaa vino levy kuvassa 4: ei LAV:n malleissa (alueella vain h-zhongzuomen + t-portti, tausta ei); näkyy samana jo v124:ssä → pelin pohja.json
  muurit[338] (x ≈ 100, kuten LISÄYS 139) = PK/KS:n alue.
- Seuraavaksi: PT kuittaa → JU vie (pelin viittaukset PK/NS). Sitten osasarja-v2 (VAATIMUKSET-osasarja-v2.md).

## LISÄYS 144 (30.10. 17.5x): OSASARJA-v2 KESKEN – ketju ja työkalut valmiit, kuja 02 -koe lähes ennallaan, 2 korjausta auki — LUOVUTUS (konteksti 30 %), ALOITA TÄSTÄ
- v99 odottaa yhä PT:n SHA-kuittausta (ei viestiä tullut). Ei taustaajoja käynnissä.
- Työkansio K/osasarja-v2 (K = …/kielletty-rakennukset). Koko ketju: `cd K/osasarja-v2 && ../tyokalut/aja_osasarja_v2.zsh > aja.log 2>&1`
  (kolme ensimmäistä vaihetta kommentoitu pois – jaksot.json/raot.json/polut-keski.json/polut-puolet.json ovat valmiina; puolet-ajo 26 s, raot 20 s).
  Lähtö = v99-paketin maailma-v4. Tulokset: kielletty-osasarja-v2 (osat = v1:n osat + pelin c2-v24:n paksunnetut 1061/1062/1064, LOD2-pylväs 0,394 × 1,265),
  kielletty-tausta-v79 (kaikki LODit), kielletty-muurikate-v28 (v27 + v26-pohja leikattuina, c3-sijoitukset 2455 → 1173), kielletty-c2-v25
  (c2-sijoitukset ilman r0/r1, kaiteeton pohja leikattu). Tiivistys glb_tiivista.py ketjun lopussa.
- Työkalut (tyokalut/): osasarja_v2_polut.py (C3-palat → jaksot), _yhdista.py (kulmat suorien leikkaukseen ≤ 1,6 m; suorat raot ≤ 1,2 m, tai ≤ 8 m jos
  taustan runko jatkuu = raot.json:n 51 C3-katteen rakoa), _raot.py, _puolet.py (KD-näytteet 1 m välein: runko/sokkeli/reuna/friisi/leveä; HUOM 'v' = +n =
  (−dz, dx) = PK:n OIKEA), _ladonta.py (muuripolku oikealla pinnalla, reunakivet omina pursotuspolkuinaan; vain v1-profiilin muurit: friisi 4,0 m
  molemmin puolin eikä leveää runkoa → 75 polkua 2 667 m / 5 005 m, loput polut-muurit-pois.json), osasarja_v2.py (osat + ladonta.json + kaiteet
  r0/r1 1:1 NUI:n halli-kaiteet-v4-tavalla), _leikkaa.py (Sutherland–Hodgman-leikkaus polkukohtaisin laatikoin, attribuutit interpoloiden; laskurit.json
  polku → poistetut), _c3c2.py, _lahteet.py (LAHTEET.md + kolmiovertailu; EI VIELÄ AJETTU), _orto.py (Blender Workbench ennen/jälkeen: yla/viisto/silma),
  _laatat.py, _ylakuva.py, _leikkaus.py, _kartta.py. osasarja_koe.py päivitetty v2:lle (y, valinnaiset kulmat/toisto; v1-varmuuskopio .bak).
- KOE kuja 02 (koe/aja_orto_kuja02.zsh, ikkuna x −275…−225, z 290…350, silmä "-245 330 90"): koe/vierekkain-{yla,viisto,silma}.png.
  Korjattu jo: sivuvirhe (muurit 0,72 m kujaan). AUKI:
  1) Vasemman muurin pilasterit: punainen yläosa katoaa (runkokäytävä ±0,50 keskilinjasta leikkaa ulkonevat pilasterit) → RAJA['runko'] o ±0,42
     (o0 −0,78, o1 0,06), jolloin pilasterin ulkoneva osa jää; tarkista sama kate-luokalle (±0,60 → friisi/konsoli ulkonee 0,08).
  2) Oikean muurin mutka (kujan 02 itämuuri, polku z 300–350 x ≈ −245): jälkeen-kuvassa suora jatke + punainen laatikko lopussa → tarkista
     polut-muurit.json ja kartta (osasarja_v2_kartta.py) – mutkan C3-jakso jäänyt pois (profiili?) tai yhdistetty väärin.
  Sitten: muut havainnekohdat 01–08 samalla orto-skriptillä (PK:n hyväksymisehto), kaiteet (koe/koe-kaiteet.glb, ikkuna x −135…−80, z −80…−35),
  _lahteet.py → SHA256SUMS → paketti _valmiit/juoksupeli-kk-lavastaja-osasarja-v2-vienti-<pvm> (vain 4 kansiota) → PT:n kuittaus (≤ 3 riviä) + kopio PK:lle
  (local_601d33fc-1c61-4ccd-8389-fa425417fafb; LAHTEET.md kertoo yhteen kuuluvat versiot: peli vaihtaa TaustaKansio v79, MuurikateTiedosto + C3Kansio v28, C2 v25).
- Tiedossa olevat rajaukset (kerro PK:lle): ~2,3 km C3-muureja jää vanhoiksi (leveät teal-katteiset, friisittömät, korkeat) – v3 tarvitsee niille omat
  osat; aitojen aukkojen päihin tulee paaty-pilari; reunakivipolkuja 223 (taustan reunakivi katkeilee).

## LISÄYS 145 (30.10. 18.2x): OSASARJA v2 VALMIS JA KUITATTU (JU vie), OSASARJA v3 ALOITETTU — LUOVUTUS (konteksti 30 %), ALOITA TÄSTÄ
- v100 (vain kielletty-tausta-v79, aukion 03 levy pois) kuitattu, JU vie. Osasarja-v2:n oma tausta nimetty kielletty-tausta-v80 (pohja = v100:n tausta-v79;
  aja_osasarja_v2.zsh: P100, varmuuskopio aja_osasarja_v2-v99pohja.zsh.bak).
- OSASARJA v2 = _valmiit/juoksupeli-kk-lavastaja-osasarja-v2-vienti-20261030 (SHA256SUMS 34406d75d65d, 107 tied., Lisenssi-rivi LAHTEET.md:ssä).
  PT 18.2x: KUITATTU, JU vie; kolmiot +9,2 % LOD0 hyväksytty (a) junaan 216. Kooste proto-3d/lokit/kooste-osasarja-v2-20261030-1813/LUE.md.
  Korjaukset: osasarja_v2_leikkaa.py runko ±0,42 (pilasterit; .bak v1), osasarja_v2_ladonta.py LOIVA = 40° (loivissa solmuissa polku katkaistaan
  osapoluiksi -b, -c … ilman kulmaosaa; vain muuri-lansi-pohj-33; .bak v1). Uudet työkalut: osasarja_v2_koe_ikkuna.py (koe-glb ikkunan poluista),
  osasarja_v2_kohdat.zsh (ennen/jälkeen-ortot havainnekohdissa 01–07+03b, VARJOT=0 + C2-kaiteet), paketti_osasarja_v2.zsh.
  osasarja_v2_orto.py: env VARJOT=0 (Workbenchin varjotilavuus piirtää ei-umpinaisista osista pystyraitoja = EI geometriaa) ja C2=<kansio>.
- PT:N JONO (sitova): OSASARJA v3 = (b) päätyjen ja kulmien C3 LEIKATTUINA + omat osat ~2,3 km:n jäljelle jääneille C3-muureille
  (osasarja-v2/polut-muurit-pois.json). Muista LAHTEET.md:n Lisenssi-rivi, ei alikansioiden SHA256SUMS, muuttuneet kansiot uusin nimin.
  Seuraavat vapaat nimet: osasarja-v3, tausta-v81, muurikate-v29, c2-v26.
- v3 TEHTY: (b) K/tyokalut/osasarja_v3_osat.py → K/osasarja-v3/kielletty-osasarja-v3/{osat,osat-lod1,osat-lod2}.glb (kulma 5632 → 2054, pääty 2850 → ~1400;
  pääty = 1057:n luonnollinen pää 0,88 m, kulma = keskiosa 0,72 m ×2, leikkaus pilkkoen). ladonta.json = v2:n kopio (osien nimet samat).
  Lähikuva v2 vs v3: K/osasarja-v3/koe/pk14-v2-v3.png (muuri-lansi-pohj-14: pääty + kulma) – sama ulkoasu, tiilikuvio ei enää puristettu.
- v3 KESKEN: jäljelle jääneiden muurien profiilit. Työkalu K/tyokalut/osasarja_v3_profiilit.py → K/osasarja-v3/analyysi/profiilit.{json,txt}
  (rungon/kivijalan/friisin/katteen sivusiirrot ja korkeudet polkua kohden). Leikkauskuvat analyysi/leikkaukset.png (p3 leveä 2,5 m; p92/p20/p38/p77).
  ALUSTAVA TULOS: suurin osa (~1,5 km) näyttää v1-profiililta (friisi 3,84–4,52, C3) mutta kivijalka 0–1,30 (kansi 1,20–1,30, ei 1,8) ja rungon
  paksuus ~0,76–1,0. VAROITUS: polkujen keskilinja on C3:n keskilinja, ei muurin keskellä (p8: V4_red pinnat o −0,68 ja +0,08 → T ≈ 0,76, keskikohta
  −0,30), ja tausta + muurikatteen pohja ovat päällekkäin (useita pintoja). "Leveä"-luokitus johtuu usein viereisen rakennuksen punaseinästä.
  SEURAAVAKSI: 1) tarkka mittaus pinnoittain (V4_red-tasot pystykolmioiden normaalien mukaan, ei centroid-prosentiileja) muutamalle polulle;
  2) ryhmät: (A) v1-profiili + kivijalka 1,30 → v1-osat sellaisinaan (T 0,72?) + uudet pursotusprofiilit kivijalka-13/-kansi/-taka, jos T täsmää,
  muuten osat T-parametrilla (osasarja_v3_osat.py: rakenna-lähteen T vaihto + nimiin pääte); (B) yksipuoliset (runko 0,1–0,24 = rakennusta vasten),
  (C) ilman runkoa/friisiä (135, 24, 61 aidat), (D) erikoiset (54/53 kivijalka 1,9, 31/75 friisi korkealla, 144/136/141/142/143/7 vain kate) →
  ehdota PT:lle mitkä jäävät vanhoiksi. 3) ladonta v3 = v2:n polut + uudet, leikkaus/C3/C2 kuten aja_osasarja_v2.zsh (uusi aja_osasarja_v3.zsh),
  ortot osasarja_v2_kohdat.zsh:lla, kolmiot _lahteet.py, paketti → PT (≤ 3 riviä) + kopio PK:lle.
- Ei taustaajoja käynnissä.

## LISÄYS 146 (30.10. 18.3x): PT – OSASARJA v3:N LISÄVAATIMUS (PK:n huoli) + v2-paketin korjaus
- v3:ssa kaukonipuille osat-lod2 myös SEINILLE, KULMILLE JA PÄÄDYILLE (v2:n LOD1-kaukoniput yhteensä ≈ 785 000 kolmiota, vanhan taustan kaukomuurit
  muutama tuhat) → yhtä kevyet kuin vanha tausta (esim. laatikko/kortti: red-runko + friisivyö + katekiila, muutama kolmio/osa). Nyt osat-lod2.glb:ssä
  vain kaiteet (osasarja_v1.rakenna_lod2). Kooste-LUE.md:hen kaukonippujen kolmiot ENNEN ja JÄLKEEN.
- v2-paketti: JU:n kuiva-ajo hylkäsi alikansion LAHTEET.md:n → poistettu, SHA256SUMS uusittu 60c0547ffea6 (106 tied.); paketti_osasarja_v2.zsh poistaa
  jatkossa alikansioiden .md:t. JU vie.

## LISÄYS 147 (30.10. 18.3x): OSASARJA v3 VALMIS → PT:N KUITTAUS ODOTTAA (kopio PK:lle) — ALOITA TÄSTÄ
- Paketti _valmiit/juoksupeli-kk-lavastaja-osasarja-v3-vienti-20261030, SHA256SUMS 77f02f0fc384 (106 tied., 438 Mt): kielletty-osasarja-v3,
  tausta-v81, muurikate-v29, c2-v26. Kooste proto-3d/lokit/kooste-osasarja-v3-20261030/LUE.md (kuvat, luvut). Ketju K/tyokalut/aja_osasarja_v3.zsh
  (ajo K/osasarja-v3:ssa, ~4 min; tasot-vaihe kommentoitu, analyysi/tasot.json valmiina). Paketti: tyokalut/paketti_osasarja_v3.zsh + juuren
  LAHTEET.md = LAHTEET-paketti.md + kielletty-osasarja-v3/LAHTEET.md (alikansion .md poistetaan paketista).
- LOD2 (LISÄYS 146 tehty): tyokalut/osasarja_v3_lod2.py (seinä 22, kulma 38, pääty 39 kolmiota; pinta C3_muurikate_kauko). Muurien kaukoniput
  LOD1 ≈ 1,14 M → LOD2 ≈ 65 000. Vesisylkijällä ei LOD2:ta. Kuvat tyokalut/osasarja_v3_lod2_kuva.py.
- Jäljelle jääneet muurit: osasarja_v3_tasot.py (pinnoittain) → osasarja_v3_ryhmat.py: A 52 jaksoa 2 050 m (osat -t80, paksuus 0,80, päätypilari 1,20),
  C 7 jaksoa 198 m (-t80-aita: punainen 0–4,30 + konsoli + C3), D 15 jaksoa ~92 m jää vanhaksi. osasarja_v3_ladonta.py (polut 'muuri3-',
  keskilinja mitattuun keskikohtaan, profiilit kivijalka-12 …), osasarja_v3_ladonta_json.py, osasarja_v3_leikkaa.py (muuri3: runko ±0,58, kate ±0,80
  keskeltä), osasarja_v3_c3c2.py (C3 2455 → 61). osasarja_v3_osat.py tekee muunnelmat (MUUNNELMAT, PH). LOD0 +3,1 %.
- Ortot: tyokalut/osasarja_v3_kohdat.zsh (lisäkohdat a20, a92, a77, c135). Ei taustaajoja käynnissä.
- SEURAAVAKSI: PT:n kuittaus → JU vie; jos PT/PK palauttaa, korjaa ja aja ketju + paketti uudelleen (uusi kansio, vanha nimi varattu).

## LISÄYS 148 (30.10. 18.5x): v3 KUITATTU (JU vie), PINTALISTA + OSASARJA v4 (KIVIPINNAT) PT:LLÄ — LUOVUTUS (konteksti 30 %), ALOITA TÄSTÄ
- PT kuittasi osasarja-v3:n (paketti 77f02f0fc384), JU vie.
- Pintalista: C3_muurikate_kauko sallituksi, natiivi lavastaja/pintalista-kauko-216 = 548440f01 (juna-216 8d3bf122f:n päällä; worktree
  /Users/Shared/Claude/wt/proto-lavastaja-pintalista-216), osoitinrivi NS:lle lähetetty.
- OSASARJA v4 (PT kiireellinen, PK:n pelipari: kivijalka liila, reuna/kansi vaaleat): syy = osissa ei V4_kujakivi_sokkeli-pintaa (peli:
  JuoksuOsasarjaKokoaja.EtsiPinta hakee profiilin pinnan osien verkoista) + kivikuvat tausta-v58:sta ilman images[].name (KiviJako).
  Korjaus K/tyokalut/osasarja_v4_osat.py (kääre v3:n päälle: kujakivipinnat tausta-v81:stä nimineen, pintanäytteet kivijalka-1m ja LOD2 reunakivi-1m).
  Paketti _valmiit/juoksupeli-kk-lavastaja-osasarja-v4-vienti-20261030 (vain kielletty-osasarja-v4), SHA256SUMS 9c781f204aa2, kopio PK:lle.
  Kooste proto-3d/lokit/kooste-osasarja-v4-20261030/LUE.md. ODOTTAA PT:n kuittausta.
- Avoin (PT): LOD1/LOD2-vaihtorajan sävy pelikuvasta, kun PK:n pari tulee. Ei taustaajoja käynnissä.

## LISÄYS 149 (30.10. 19.35): LEIVONTAKETJU (valosuunnitelma vaihe 4) VALMISTELTU – VS:n/PK:n vastaus ja PK:n v4-parin hyväksyntä odottavat
- PT:n ohje: valmistele Blender-leivontaketju VS:n kanssa; varsinainen leivonta vasta, kun PK:n osasarja-v4-pari on hyväksytty.
- Rajapintaluonnos /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/leivonta-216/SOPIMUS.md (lähetetty VS:lle ja PK:lle 19.2x; ei vielä
  vastausta; VS teki sen jälkeen luovutuksen 59754848f, joten uusi VS lukee sen sieltä). Pohja VS d420087dc (_LeivottuST, _LeivottuKarki,
  tyylikirja/leivonta-aurinko.json 169,97°/30°; kopio leivonta-216/leivonta-aurinko-d420087dc.json).
- Työkalut K/tyokalut: leivonta_lado.py (pelin Lado/Ladot-järjestys, v4: 3194 sijoitusta, 86 ruutua = pelin luku), leivonta_uv1.py
  (UV1: xatlas + tasoprojektio tiilikatolle/konsoleille/C2:lle, 16 px/m; --lod1 siirto), leivonta_atlas.py (ruutujen 1024²-atlakset,
  ST pelin UV1-kehyksessä v ylös → valo.json), leivo_osasarja.py (Blender ruuduittain, varjostajat, aukkotulpat, KUVA=1 tarkistuskuvat),
  leivonta_karki.py (kaukonippujen RGBM-kärkivärit karki.bin), aja_leivonta_osasarja.zsh (koko ketju). venv: _tyo/linnanrakentaja/venv-leivonta (xatlas).
- Koeajo leivonta-216/koe/osasarja (v4:n kopio): ruudut -5,-4 / -5,-1 / -3,-5 leivottu 32 näytteellä, tarkistuskuvat valo/tarkistus-*.png.
- AUKI: pursotukset (PK: valmis glb vai kaava), taustan + rakennusten uusintaleivonta osasarja varjostajana, valon voimakkuudet VS:ltä.
- Ei taustaajoja käynnissä.

## LISÄYS 150 (30.10. 19.4x): PK KUITTASI LEIVONNAN RAJAPINNAN
- (1) k-järjestys + tarkiste OK, (2) kärkivärit karki.bin:nä, (3) pursotukset LAV:lta valmiina pursotukset.glb:nä (UV1 + valo_rgbm). Kirjattu
  leivonta-216/SOPIMUS.md "PK:N KUITTAUS". SEURAAVAKSI: pursotukset.glb-työkalu (pelin JuoksuOsasarja.Pursota-vastine, osasarja_koe.py:n
  pursotusosa pohjana; huom. pelin järjestys/jiiri/kannet JuoksuOsasarja.cs:stä) + leivonta leivo_valo.py-tyyliin. VS:n vastaus yhä auki.

## LISÄYS 151 (30.10. 19.4x): VALON YHDISTELMÄ (PT 19.5x) – UUSINTALEIVONTA NYKYISELLÄ PUTKELLA — LUOVUTUS, ALOITA TÄSTÄ
- PT hyväksyi 19.5x yhdistelmän (VS:n luovutus 59754848f, docs/raportit/viesti-valoseppa-luovutus-20261030-1930.md kohta "Työn alla 1"):
  ruutuatlakset ja kärkivärit ODOTTAVAT (tehdään vain, jos iPad-mittaus tai pari vaatii; työkalut valmiina, LISÄYS 149). PT 19.4x: kuitattu.
- LAV:N TEHTÄVÄ NYT (VS 19.5x): leivo UUDELLEEN nykyisellä putkella (leivo_valo.py / leivo_malli.py, valo_rgbm, M = 8) TAUSTA, RAKENNUKSET
  ja MUURIKATTEEN POHJA: aurinko AZ=169.97 EL=30 (tyylikirja/leivonta-aurinko.json, kopio leivonta-216/leivonta-aurinko-d420087dc.json);
  osasarja-v4 ladottuna + pursotukset VARJOSTAJANA; aukkotulpat. Uudet versionimet (tausta-v82?, rakennukset-v86?, muurikate-v30? – tarkista
  vapaat), samaan junaan; ilmoita VS:lle (local_3b36fe96-…), joka tekee parit 02/03/06.
- TEHTY: varjostaja leivonta-216/osasarja-v4-varjostaja.glb (osasarja_koe.py v4:stä, 360 Mt, kaikki polut + pursotukset). leivo_valo.py ja
  leivo_malli.py lukevat OSASARJA_VARJ=<glb,...> (.ennen-osasarjavarj-varmuuskopiot).
- AUKKOTULPAT (VS:n kuittaus /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/leivonta-216-vs-kuittaus.md kohta 6): aukkokohtainen taso 2–5 cm
  aukon sisäpuolella (ovi- ja ikkuna-aukot), albedo = sisätilan keskisävy, ei emissiota; sisägeometria pois ulkoleivonnasta; kupera kuori vain,
  jos pysyy ulkovaipan sisällä. EI VIELÄ TOTEUTETTU leivo_valo/leivo_malli-skripteihin (leivo_osasarja.py:ssä on kupera kuori -versio,
  funktio tulppa()). Aukkojen tunnistus avoimista huoneista (avoimet-v52, sijoitus tausta-v81/avoimet-sijoitus.json) on ensimmäinen työ.
- PARAMETRIT edellisestä täysleivonnasta (aja_ketju_v73.zsh): UV_EROTUS=1, TAIVAS_VARI=0.45,0.46,0.50, TAIVAS=1.8, KIMPOAMISET=4,
  NAYTTEET=128, koko 2048 → valo_pakkaa.py 1024, glb_alfa_mask.py V4_puukortti, kuja/aukio-palat SAARIVARA=0.004 + LISAVARJ, lod1/2-kopiot,
  tausta_lattia_uv0.py, tausta_json.py, tarkistus VS:n tarkista_leivonta.py. Rakennukset: aja_rakennukset_v35_leivonta.zsh-malli (leivo_malli.py
  src-kansiosta, NAYTTEET 256, 1024). Lähteet: tausta = osasarja-v3/kielletty-tausta-v81 (uusin, leivottu; leivo_valo purkaa UV1:n uudelleen),
  rakennukset-v85 (_valmiit/juoksupeli-kk-lavastaja-v99-…/kielletty-rakennukset-v85; selvitä sen src-kansio), muurikate-v29
  (osasarja-v3/kielletty-muurikate-v29, pohja-glb), avoimet-v52. MUURIKATTEEN POHJAN leivontaskripti: etsi (grep "pohja" + leivo) ennen ajoa.
- Huom: Blender-ajo tauon/hiljaisen tunnin säännöt; pitkät ajot taustalle. Ei taustaajoja käynnissä.

## LISÄYS 152 (30.10. 20.0x): UUSINTALEIVONTA AJOSSA — ALOITA TÄSTÄ
- Ajo (taustalla, nice 10): /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/leivonta-216/uusinta/aja_uusinta.zsh (yhteiset.zsh = lähteet ja
  env): `tausta` → kielletty-tausta-v82 (24 palaa, 2048/128 → valo_pakkaa 1024 + glb_alfa_mask), sitten `muurikate` → kielletty-muurikate-v30
  (= v29 + leivottu kk-muurikate-v26-pohja.glb, sama tiedostonimi; leivo_valo.py KOHDE_GLB=…, varjostajina kaikki taustapalat), `rak 1/2` ja
  `rak 2/2` → kielletty-rakennukset-v86 (136 mallia, leivo_malli 1024/256; valmiit merkitään rak-valmiit/<malli>, uudelleenajo jatkaa).
  Lokit ajo-tausta.log, ajo-rak1.log, ajo-rak2.log. Lähteet: tausta-v81 (osasarja-v3), rakennukset-v85 (v99-paketti), muurikate-v29, avoimet-v52.
- AUKKOTULPAT tehty: tyokalut/aukkotulpat.py (env AUKKOTULPAT=1 leivo_valo/leivo_malli): avoimen huoneen sisätila pois (kuori = seinät,
  julkisivut, sokkelit, harjakatteet, katto, räystäs, harjakoristeet, palkisto, talopilarit), jokainen side_door/end_door-aukko tasolla 3 cm
  seinän sisäpuolella, albedo TULPPA_ALBEDO 0.18,0.15,0.12. 21 huonetta × 4 tulppaa.
- KORJAUS: Blender 5.2:n pack_islands(margin_method='FRACTION') pakkaa moniolio-UV1:n yli 0–1:n → leivo_malli leipoi tyhjää (max 0). leivo_malli.py
  ja katto_uv1.py → 'SCALED' (.ennen-blender52 / .ennen-aukkotulpat). leivo_valo (yksi olio) toimii FRACTIONilla (UV1 max 0,999).
- Vienti tarkistettu (vertaa.py koe): materiaalit, kuvien nimet, samplerit säilyvät (erot vain glTF-oletuksia); remove_doubles −1 % kolmioita.
  Kujien/aukion lod1/lod2 jäävät v81:n leipomattomiksi (kuten v81). tausta*.json ennallaan v81:stä.
- SEURAAVAKSI: tarkista VALO-rivit (max > 0), VS:n tarkista_leivonta.py (/Users/Shared/Claude/wt/proto-linssiseppa2-p11/tyokalut/) tausta-v82:lle,
  paketti _valmiit/juoksupeli-kk-lavastaja-leivonta-v1-vienti-20261030 (LAHTEET.md juuressa, SHA256SUMS, ei alikansioiden .md) → PT (≤ 3 riviä)
  + VS (local_3b36fe96-0199-4b17-9eb4-46a882ce7399) tekee parit 02/03/06. VS ja PT on jo ilmoitettu ajon alusta.

## LISÄYS 153 (30.10. 21.2x): LUOVUTUS (konteksti 32 %) — ALOITA TÄSTÄ
- ETUSIJA 1 (PT 21.2x, juna 216 ennen lähtöä; jos ei ehdi, osasarja-v4 pois junasta): osasarja-v4 toi regression kujille 02 ja 05: VASEMMAN
  muurin kivijalkaan porras ja vaalea nauha (05:ssä selvä askelma), v3:ssa ei. Kuvat /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/
  piirrokset-20261030/v4-parit-5/v2-02-peli-pari.png ja v2-05-peli-pari.png. Korjaa geometria (osasarja_v4_osat.py / kivijalkaprofiilit;
  rakennusleivonta saa jatkua taustalla), oma tarkistus lähikuvin, sitten PK kokoaa ja tekee sovitetun parin. PT odottaa ARVIOTA valmistumisesta
  heti nollauksen jälkeen (≤ 3 riviä).
- RAKENNUSLEIVONTA AJOSSA (1 Blender, PT: EI kahta Blenderiä, swap täynnä): leivonta-216/uusinta/aja_uusinta.zsh rak 1/1 → ajo-rak.log,
  ~3,7 min/malli, 8/136 valmiina 21.19 → valmis ~05.30. Ei uudelleenkäynnistystä tarvita; rak-valmiit/<malli> jatkaa keskeytyksestä.
- TAUSTAN UUSINTA (PT: VASTA rakennusten jälkeen, ketjuun): tausta-v82 + muurikate-v30 leivottu, mutta tarkista_leivonta VIKA 3520
  (TILA.md samassa kansiossa; v70: 13228). PT:n ehto: 0 vikaa ennen VS:n paria. Suunnitelma:
  1) TUPLAT=1 leivo_valo-ajoon (palojen sisäiset päällekkäiset V4_lattia-kasvot pois; tummat tuplat 2528). Lisää aja_uusinta.zsh tausta-
     haaran env:iin TUPLAT=1, aja tausta + kujat.zsh uudelleen rak-ajon perään, sitten tarkistus kuten tarkistus-tausta-v82.txt.
  2) Kujan 1-3 lattia: aukot (17) ovat TARKISTIMEN artefakti (1 cm:n reunasääntö), oma peitto.py = 0 tyhjää. T-liitokset 220: uusi
     tyokalut/lattia_tliitokset.py (hitsaus 2,5 mm + reunan jako, pelkkä Python) → 3 jäljellä (2 mm:n pyöristysrajalla; TOL 3 mm karkasi).
     Ajettava kujan v81-lähteelle ENNEN leivontaa (lähde kopioksi, TS osoittamaan siihen). Kerro VS:lle aukkoartefaktista (pyydä reunasäännön
     korjausta) ja 3 jäljellä olevasta T:stä.
  3) Palojen saumojen reiät / väliset tuplat eivät ole ehtoalueilla (tiedoksi), mutta PT:n ehto "0 vikaa" → kysy PT:ltä, koskeeko koko
     karttaa vai ehtoalueita (KK 03.17: PUHDAS-ehto ehtoalueittain).
- VS (19.4x/21.2x): --valo lukee osasarja_varj:n; aukkotulpat EI mallinnu tarkistimessa (kerro, jos oviaukoista tummia vikoja → VS lisää).
  VS haluaa paketti-ilmoitukseen palat + alueet (x0 x1 z0 z1) ja <pala>-varjostajat.json:t.
- Apu: leivonta-216/uusinta/{vertaa.py, peitto.py, uv1_kopio.py}. Paketti vielä tekemättä (nimi _valmiit/juoksupeli-kk-lavastaja-leivonta-v1-
  vienti-<pvm>, LAHTEET.md juureen, SHA256SUMS, ei alikansioiden .md), muurikate-v30 + tausta + rakennukset-v86 samaan.

## LISÄYS 154 (30.10. 21.5x): KIVIJALKAREGRESSIO 02/05 – SELVITYS KESKEN — LUOVUTUS, ALOITA TÄSTÄ
- PT 21.23: jatka ETUSIJA 1 (LISÄYS 153). PT:lle luvattu ARVIO ~00.30 (korjaus + lähikuvat + paketti osasarja-v5 PK:lle). PT: "0 vikaa" koskee
  vain EHTOALUEITA (KK 03.17); palojen saumat muualla tiedoksi.
- Kuvat (oikea = v4): 02:ssa vasemman muurin kaukana kivijalan päällä vaalea nauha + porras (kivijalka ulkonee, takana korkeampi);
  05:ssä vasen muuri: matala ulkoneva askelma + vaalea yläpinta. Ero v3→v4: 02 12,4 %, 05 9,2 % (ylä 0,6–0,7 %), muut ≤ 1,7 %.
- Työkalu leivonta-216/uusinta/leikkaus.py <glb> <z> <x0> <x1>: kolmiot tason z läpi (materiaali, x/y-väli). osasarja-v4-varjostaja.glb
  = koko v4 koottuna (yksi solmu 'ladonta', polut eivät erotu → tee polkukohtainen leikkaus ladonta.json:n solmuista + profiileista).
- Havainnot: osat (seina-2m, -t80) EIVÄT sisällä kivijalkaa (V4_red 0–3,84); kivijalka tulee vain pursotuksista. Profiilit: v1-polut
  kivijalka 1,8 (+kansi 1,86), v3-ryhmä A ('muuri3-…', esim. muuri3-lansi-pohj-06/07 kujan 05 länsipuolella x ≈ −251…−255, z 365–393)
  kivijalka-12 = 1,2 m (+kansi 1,26) ja paksuus 0,80. Itäpuoli kujalla 05/02: muuri-lansi-pohj-33-* (1,8). Reunakivi 0,25 × 0,32 kaikilla.
  Epäily: porras = 1,2 m:n (muuri3) ja 1,8 m:n kivijalan saumat näkyvissä + v4:n kansipinta (V4_kujakivi_sokkeli_yla) nyt vaalea. Tarkista
  v3-kuvasta (vasen), oliko v3:ssa 1,2-kivijalka näkyvissä; jos ei, syy on v4-käärimessä (osasarja_v4_osat.py) → vertaa v3/v4 ladonta.json
  + osat.glb. Ehdotus: muuri3-ryhmän kivijalka 1,8:ksi (profiilit kivijalka/-kansi, taka -t80 1,8) kujille näkyviltä osin, ellei havainne näytä 1,2:ta.
- SIVULÖYDÖS: muurikate-v26-pohja.glb:ssä on kate (palatsi_katto y 3,71–4,34) muuri3-lansi-pohj-07:n kohdalla z 388 (osasarjan C3 4,58–5,03)
  → pohjaa ei leikattu muuri3-poluille? Tarkista (tuplakate).
- Rakennusleivonta jatkuu (ajo-rak.log), älä pysäytä.

## LISÄYS 155 (30.10. 21.3x): KIVIJALKAKORJAUS osasarja-v5 VALMIS PK:LLE — ALOITA TÄSTÄ
- Rakennusleivonta oli pysähtynyt nollaukseen (21.26, 13/136) → käynnistetty uudelleen 21.29 (aja_uusinta.zsh rak 1/1 >> ajo-rak.log, 1 Blender).
- SYY: kuja 05 kulkee muuri3-lansi-pohj-06/-07(-b/c/d) (ryhmä A, kivijalka 1,20, -t80) ja muuri-lansi-pohj-33-j:n (1,80) välissä. v3:ssa kivijalalla
  ei ollut pintaa; v4:n kivijalka-1m-pintanäyte teki 1,20 m:n kivijalasta näkyvän → matala askelma + vaalea kansi. Havainteen kujamuureissa 1,80.
- KORJAUS osasarja-v5 (K/osasarja-v5/kielletty-osasarja-v5): vain 5 kujaa rajaavaa muuri3-polkua (osasarja_v5_kujamuurit.py: kujalattia
  V4_kujakivi_lattia 1 m:n päässä; muut 57 muuri3-polkua rajaavat aukioita → ennallaan) → pursotus kivijalka/-kansi 1,80 + uudet takaprofiilit
  kivijalka-taka-t80/-kansi-taka-t80 (−0,84); päädyt paaty-alku/-loppu-t80-18 (pilari 1,80). Ryhmä on suljettu (portti 2,8 m, päädyt) → ei 1,2/1,8-saumoja.
  Muut 1104 polkua ja v4:n osat tavulleen ennallaan (tarkistettu). Työkalut K/tyokalut/osasarja_v5_{osat,osat_pohja,ladonta,kujamuurit}.py, paketti_osasarja_v5.zsh.
- PAKETTI _valmiit/juoksupeli-kk-lavastaja-osasarja-v5-vienti-20261030 (maailma-v4/kielletty-osasarja-v5, SHA256SUMS 29551b4a10f3). PK: OsasarjaKansio
  kielletty-osasarja-v5, kokoa ja tee sovitettu pari 02/05.
- LÄHIKUVAT: Blender varattu leivonnalle (PT: 1 Blender) → oma lähikuva vasta leivonnan jälkeen; PK:n pelipari on ensimmäinen kuvatarkistus.
- HUOM leivonta: rakennusleivonnan varjostaja on osasarja-v4-varjostaja.glb (5 muurin kivijalka 1,20) – ero vain kujan 05 länsimuurin juurella;
  tee osasarja-v5-varjostaja (osasarja_koe.py) ennen taustan uusintaa (TUPLAT=1, LISÄYS 153).
- SIVULÖYDÖS (LISÄYS 154) muurikate-v26-pohjan tuplakate muuri3-lansi-pohj-07:llä yhä tarkistamatta.

## LISÄYS 156 (30.10. 22.0x): osasarja-v5 JUNAAN 216 (omistaja 21.55) – TAUSTAN UUSINTA KETJUSSA v5-VARJOSTAJALLA — ALOITA TÄSTÄ
- PT 21.55: omistaja hyväksyi osasarja-v5:n junaan 216; taustan uusinta (TUPLAT=1, rakennusten jälkeen) v5-muureilla, ei v4/v3.
- TEHTY: leivonta-216/osasarja-v5-varjostaja.glb (osasarja_koe.py v5:stä, ei Blenderiä; leikkaus z 388: kivijalka 1,80 vs v4 1,20).
  uusinta/yhteiset.zsh: OSASARJA_VARJ → v5, TS → uusinta/tausta-v81-lahde (= v81 APFS-kopiona + kujien 0-3/1-3 lod0 lattia_tliitokset.py:llä,
  LISÄYS 153 kohta 2). aja_uusinta.zsh tausta + kujat.zsh: TUPLAT=1. Varmuuskopiot *.ennen-v5.
- KETJU: uusinta/ketju-v5.zsh (pid 25357, odottaa myös lattia_tliitokset-ajon, loki ajo-ketju-v5.log) odottaa rak-ajon (pid 65713) loppuun, tarkistaa T-liitoskorjauksen (muuten
  keskeyttää), sitten tausta → kujat.zsh → muurikate (muurikatteenkin varjostaja v5). Rak ~05.00, ketju arviolta ~06.30.
- Rakennukset-v86 leivotaan loppuun v4-varjostajalla (ajo alkoi 21.29 ennen v5:tä); ero vain kujan 05 länsimuurin juurella, kerro PT:lle jos merkitsee.
- SEURAAVAKSI ketjun jälkeen: tarkista_leivonta (ehtoalueet kuten v73 / tarkistus-tausta-v82.txt, PT: 0 vikaa ehtoalueilla), VS:lle
  aukkoartefakti + jäljelle jäävät T:t (LISÄYS 153), paketti _valmiit/juoksupeli-kk-lavastaja-leivonta-v1-vienti-<pvm> (tausta-v82, muurikate-v30,
  rakennukset-v86; LAHTEET.md juureen, SHA256SUMS, ei alikansioiden .md) → PT ≤ 3 riviä + VS (parit 02/03/06, palat + alueet + varjostajat.json:t).

## LISÄYS 157 (30.10. 22.1x): OSASARJAN LEIVONTA v6 (PK, juna 217) KETJUSSA
- PK 22.0x: pelipuoli koodattu (proto-haara pelikoodari/leivonta-217 8732a8a1c), koe/osasarja läpäisi tarkisteen. Tarvitaan leivottu paketti v5:stä
  uudella nimellä; Blender vasta nykyisten leivontojen jälkeen.
- TEHTY ilman Blenderiä: K/osasarja-v6/kielletty-osasarja-v6 = v5 + leivonta_uv1 (osat, lod1) + leivonta_atlas (valo.json, 3194 sijoitusta, 86 ruutua).
- KETJU: leivonta-216/uusinta/ketju-osasarja-v6.zsh (pid 25370, loki ajo-osasarja-v6.log) odottaa ketju-v5:n (pid 25357) → leivo_osasarja.py kaikki 96
  → leivonta_karki.py. Pursotukset.glb EI tässä (työkalu tekemättä, LISÄYS 150) → peli pursottaa itse.
- SEURAAVAKSI valmistuttua: paketti _valmiit/juoksupeli-kk-lavastaja-osasarja-v6-vienti-<pvm> (paketti_osasarja_v5.zsh-malli, maailma-v4/kielletty-osasarja-v6,
  LAHTEET-paketti.md v6-otsikolla) → kansio PK:lle (local_601d33fc-…) + PT ≤ 3 riviä.
- PT 22.27 (omistaja): valo junaan 216, juna lähtee vasta kun valo valmis → rakennukset, tausta TUPLAT=1 ja osasarja-v6 ovat junan 216 lähtöehto.

## LISÄYS 158 (30.10. 22.46): LEIVONTA PYSÄYTETTY LEVYN TAKIA — ALOITA TÄSTÄ
- Postivahti (PT:n ohje): levy 86 Gi → rak-ajo pysäytetty mallin t-katos-26 jälkeen (45/136), ketju-v5 ja ketju-osasarja-v6 pysäytetty. Ei Blenderiä
  ennen kuin levy > 95 Gi. Jatko (kansio leivonta-216/uusinta, kaikki taustalle nohup): 1) `zsh aja_uusinta.zsh rak 1/1 >> ajo-rak.log` (jatkaa
  rak-valmiit/:sta) 2) `zsh ketju-v5.zsh <rak-zsh:n pid> >> ajo-ketju-v5.log` 3) `zsh ketju-osasarja-v6.zsh <ketju-v5:n pid> >> ajo-osasarja-v6.log`.
- Kujien T-liitoskorjaus (lattia_tliitokset.py → tausta-v81-lahde) saa jatkua (pelkkä Python); ketju-v5 odottaa sen.
- PT 22.5x (UUSI EHTO, korvaa 95 Gi:n): jatka heti, kun NS:n laitekäännös päättyy; pysäytä vain jos levy < 82 Gi; 1 Blender, ei Unityn kanssa.
  → uusinta/jatka-ns-jalkeen.zsh (pid 61196, loki ajo-jatka.log) odottaa NS-käännöksen (pid 45361) ja Unityn loppuun, käynnistää rak → ketju-v5 →
  ketju-osasarja-v6 (pid:t lokissa) ja valvoo levyä (< 82 Gi → kaikki pois, jatko kuten yllä).

## LISÄYS 159 (31.10. 01.2x): LEVYVAHTI PYSÄYTTI 01.13 — ODOTTAA PT:N JATKOLUPAA — ALOITA TÄSTÄ
- jatka-ns-jalkeen.zsh käynnisti 22.52 (NS-käännös päättyi); levyvahti pysäytti 01.13 (81 Gi < 82): rakennukset-v86 105/136, tausta ja osasarja-v6
  ajamatta. Oma leivontakansio vain 1,4 Gt → levyä täyttää muu. PT:lle ja Postivahdille ilmoitettu; jatko PT:n luvalla tai kun > 82 Gi (LISÄYS 158 -ohje,
  tai uudelleen `nohup zsh jatka-ns-jalkeen.zsh 1 >> ajo-jatka.log &` kansiossa leivonta-216/uusinta).
- T-LIITOKSET: kuja 0-3:n korjaus jumittui (> 3 h, 1 T-liitos) → keskeytetty, 0-3 = v81 ennallaan. Kuja 1-3 korjattu sekunneissa (220 jakoa) →
  tausta-v81-lahde valmis. ketju-v5.zsh tarkistaa nyt vain 1-3:n.
- Meridiaani 404 (JU 31.10.): a-meridiaaniportti-1063-portaat.glb:tä ei kuulu olla (kaiteet a3a5-sijoitukset.json:ssa c2-v11:stä asti, 1063-portaat
  vain f-taihemen/g-jalusta) → pelin haku PK:lle; JU ja PT tietävät.
- Lahipuut-v12 (kuja 02:n puut pois): PK tekee (sovittu 30.10. 23.0x).
- 01.2x: omat wt/lavastaja-* (4) poistettu → levy 87; PT 01.2x raja tilapäisesti 78 Gi (uusinta/levyvahti.zsh <raja> <pid:t>; palaa 82:een leivonnan jälkeen).
  wt/proto-lavastaja-* (4, ~1,9 G) EI poistettu: haarat eivät proto-masterissa, havainteessa 2 tallentamatonta muutosta (Postivahdille kerrottu).

## LISÄYS 160 (31.10. 12.4x): YÖN TULOKSET + JATKOAJO — ALOITA TÄSTÄ
- VALMIINA (uusinta/): rakennukset-v86 135/136 (02.22), tausta-v82 uudelleen TUPLAT=1 + v5-varjostaja + kujat.zsh + muurikate-v30 (03.19).
- VIAT JA KORJAUKSET: (1) leivo_osasarja.py kaatui 27/86 ruudun jälkeen KeyError 'kaide-johde-1.5m' (nimi katkesi pisteestä) → nimi_() poistaa vain .001-päätteen;
  lisätty JATKA=1 (leivotut ruudut ohi). (2) f-taihemen kaatui joka kerta ('palkit' ilman kasvoja → smart_project) → leivo_malli.py kohteet vain
  kasvollisista verkoista. Varmuuskopiot .ennen-nimikorjaus / .ennen-tyhjat.
- JATKOAJO 12.34: aja_uusinta.zsh rak 1/1 (pid 40767, vain f-taihemen) → ketju-osasarja-v6.zsh (pid 40768, JATKA=1, 59 ruutua ~8 min/kpl → ~20.30)
  → leivonta_karki.py; levyvahti 78 Gi (lokit ajo-rak.log, ajo-osasarja-v6.log, ajo-jatka.log).
- TARKISTUS ajossa: tarkista_leivonta tausta-v82 ehtoalueilla kuten v73 (−248.8 −244.2 298 360 | −255 −246.8 361 403 | −138.6 −133.0 340 437)
  → uusinta/tarkistus-tausta-v82b.txt. PT: 0 vikaa ehtoalueilla.
- SEURAAVAKSI: (a) tarkistus → jos 0: paketti _valmiit/juoksupeli-kk-lavastaja-leivonta-v1-vienti-20261031 (tausta-v82, muurikate-v30, rakennukset-v86
  kun f-taihemen valmis; LAHTEET.md juureen, SHA256SUMS, ei alikansioiden .md) → VS (local_3b36fe96-…: palat + alueet + varjostajat.json:t, parit 02/03/06)
  + PT ≤ 3 riviä. (b) osasarja-v6 valmis → paketti _valmiit/juoksupeli-kk-lavastaja-osasarja-v6-vienti-<pvm> → PK + PT. (c) levyraja takaisin 82.

## LISÄYS 161 (31.10. 12.5x): LEIVONTA v1 -PAKETTI VIETY — ALOITA TÄSTÄ
- f-taihemen leivottu 12.37 → rakennukset-v86 136/136. Tarkistus tausta-v82 (uusinta/tarkistus-tausta-v82b.txt): ehtoalueilla kuja-0-3 T-liitos 1 ja kuja-1-3
  "aukko" 28 ruutua (tarkistimen reunasääntö); muualla tiedoksi (tummat tuplat 2405).
- PT 12.5x: paketti nyt, poikkeamat LAHTEET.md:hen → _valmiit/juoksupeli-kk-lavastaja-leivonta-v1-vienti-20261031 (tausta-v82, muurikate-v30, rakennukset-v86;
  SHA256SUMS 6c040967e35a; uusinta/paketti_leivonta_v1.zsh + LAHTEET-leivonta-v1.md). VS, PK ja PT ilmoitettu.
- KUJA 0-3: T-liitoskorjaus onnistui MATERIAALI=V4_kujakivi_lattia (8 jakoa; reunamateriaalin kanssa jumittui) → tausta-v81-lahde. uusinta/kuja03.zsh (pid 69838,
  ajo-kuja03.log) odottaa osasarja-v6:n (pid 40768) → tausta-v83 = v82 + kuja-0-3 uudelleen + tarkistus (tarkistus-tausta-v83.txt). Sitten pieni paketti
  (_valmiit/juoksupeli-kk-lavastaja-tausta-v83-vienti-<pvm>, vain kielletty-tausta-v83) → VS + PK + PT.
- OSASARJA-v6: ~2 min/ruutu (33/86 klo 12.49) → valmis ~14.40; sitten karki.bin, paketti _valmiit/juoksupeli-kk-lavastaja-osasarja-v6-vienti-<pvm> → PK + PT.
- Kaiken jälkeen levyvahdin raja takaisin 82 (PT 01.2x).

## LISÄYS 162 (31.10. 16.1x): OSASARJA-v6 JATKUU, KUJA 0-3 T-LIITOS RAJATULLA KORJAUKSELLA — LUOVUTUS, ALOITA TÄSTÄ
- 13.34 levyvahti pysäytti osasarja-v6:n (< 78 Gi, 41/86); kuja03.zsh tulkitsi pid:n katoamisen valmistumiseksi ja teki tausta-v83:n (13.35–13.49),
  jossa T-liitos yhä 1 (tarkistus-tausta-v83.txt, piste (−254,92; 0,25; 382,77) = reunakiven yläpinta). v83:A EI PAKATA.
- KK 15.46 (juoksupelin ohjat): jatka osasarja-v6, korjaa 0-3 T ennen pakettia. TEHTY 15.48: ketju-osasarja-v6.zsh 999999 (pid 35472, JATKA=1) +
  levyvahti.zsh 78 35472 (pid 35473). Valmistuttua karki.bin, sitten paketti _valmiit/juoksupeli-kk-lavastaja-osasarja-v6-vienti-<pvm>
  (paketti_osasarja_v5.zsh-malli; LAHTEET-paketti.md v6-otsikolla) → PK + PT (+ KK).
- T-LIITOS: lattia_tliitokset.py sai env:t ALUE="x0 x1 z0 z1" ja KIERROKSET (.ennen-alue). MATERIAALI reunan kanssa koko palassa karkaa (jaot kasvavat).
  ALUE "-256 -254 381.5 384" HITSI=0 KIERROKSET=1 korjaa pisteen (oma tarkistin scratchpad tpiste.py → 0 säteellä 1,5 m), mutta jättää 1 uuden T:n
  (−254,82; 0; 383,0) lattiassa (luultavasti kolmio, jonka keskipiste alueen ulkopuolella). Koe isommilla alueilla ajossa (tasks bd1arqag0).
  Lähde nyt: tausta-v81-lahde/kk-tausta-kuja-0-3-lod0.glb (lattia-korjattu, 8 jakoa); korjattu tulos kopioidaan sen päälle ja kuja03.zsh ajetaan
  uudella nimellä tausta-v84 (muuta TU-rivi, tarkistin uusinta/tarkista_leivonta-be65cd9ee.py = VS:n reunasääntökorjaus) osasarja-v6:n jälkeen.
- VS sai LEIVONTA v1:n (SHA OK), sovitettu pari kun PK vapauttaa Unityn. Levyraja takaisin 82, kun kaikki valmista.

## LISÄYS 163 (31.10. 16.3x): LUOVUTUS (konteksti 37 %) — JONO JÄRJESTYKSESSÄ, ALOITA TÄSTÄ
JONO (KK 16.2x + PT 16.2x): 1) osasarja-v6 loppuun → paketti PK + PT (+KK). 2) kuja 0-3 T-liitos → tausta-v84 → pieni paketti VS + PK + PT.
3) AUKIOIDEN LEIVONTAKORJAUS (PT): VS:n leivottu pari (koehaara c9455d902, LAV v1, kerroin 1 paras): aukio 06 palaa puhki 26,5 % pikseleistä (juna-216 2,6 %),
   03 8,9 % → korjaus leivontaan (kerroin ei korjaa). Kuvat /Users/Shared/Claude/proto-3d/lokit/havainne-editori-20261031-155856/{03,06}/ (vierekkain.png).
   Tee 1–2:n jälkeen; pieni paketti → VS uusi pari.
- OSASARJA-v6: 50/86 klo 16.3x, ajossa (pid 35472, levyvahti pid 35473, 78 Gi).
- KK:N EHTO: v84-ajo (kuja03.zsh-malli) saa käynnistyä vasta, kun ajo-osasarja-v6.log:iin tulee rivi "OSASARJA-V6 VALMIS" (EI pid:n katoamisesta – levyvahdin
  pysäytys 13.34 käynnisti v83:n liian aikaisin). Muuta kuja03.zsh:n odotus: `until grep -q "^$(date +%H)…OSASARJA-V6 VALMIS"` → käytännössä odota, että lokin
  VALMIS-rivien määrä kasvaa aloitushetken määrästä (nyt 1 vanha rivi 06.51), ja TU=…/kielletty-tausta-v84.
- T-LIITOS (kuja 0-3, ehtoalue −255 −246,8 361 403): alkuperäinen T (−254,92; 0,25; 382,77) reunakiven yläpinnassa. Työkalu uusinta/tpiste.py <glb> x z säde
  (tulostaa jokaisen T:n kahdesti → todellinen määrä = luku/2…/3). Kokeet (lähde tausta-v81-lahde/kk-tausta-kuja-0-3-lod0.glb, HITSI=0):
  ALUE "-256 -254 381.5 384"/"-257 -253 381 385" KIERROKSET=1–2 → alkuperäinen poistuu, mutta 1 uusi T (−254,82; 0; 383,0) lattiassa (lattian kärki toisen
  vaakakolmion reunalla); isompi alue (−258 −252 380 386) → 10 T:tä; ilman ALUEtta reunan kanssa jako karkaa (jaot kasvavat 51→123→1864).
  Seuraava kokeilu: selvitä, minkä kolmion reunalla (−254,82; 0; 383,0) on (materiaali, y ≈ 0; mahdollisesti V4_lattia, joka ei ole MATERIAALI-listassa →
  lisää MATERIAALI=V4_kujakivi_lattia,V4_kujakivi_reuna,V4_lattia ALUE-rajauksella) tai jaa se yksittäin. Tavoite tpiste.py = 0 säteellä 8 m.
- Levyvahdin raja takaisin 82, kun jono valmis (PT 01.2x).

## LISÄYS 164 (31.10. 16.4x): AJOKETJU KÄYNNISSÄ (osasarja-v6 → v84 → leivonta v2) — ALOITA TÄSTÄ
Kansio /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/leivonta-216/uusinta (U). Kolme irrallista ajoa peräkkäin, kukin odottaa edellisen lokirivin:
1) ketju-osasarja-v6.zsh (pid 35472, levyvahti 35473 / 78 Gi) → ajo-osasarja-v6.log "OSASARJA-V6 VALMIS" (16.31: 51/86 atlasta, ~5 min/ruutu).
2) kuja04.zsh (pid 73580, loki ajo-kuja03.log) odottaa UUTTA VALMIS-riviä (KK:n ehto) → tausta-v84 + tarkistus-tausta-v84.txt → "KUJA03-V84 VALMIS".
3) polvi.zsh (pid 75240, loki ajo-polvi.log) odottaa v84:n → tausta-v85 / rakennukset-v87 / muurikate-v31 = polvi → "POLVI VALMIS".
- T-LIITOS RATKAISTU: jäljelle jäänyt T oli ison kolmion reunalla (keskipiste ALUEen ulkopuolella) ja työkalu käytti ehdokkaina reunakiven pystypintojen
  kärkiä (tarkistin ei) → lattia_tliitokset.py: ALUE_LAATIKKO=1, VAAKA=1, HITSI=0 ohittaa hitsauksen (oli neliöllinen). Lähde tausta-v81-lahde/
  kk-tausta-kuja-0-3-lod0.glb korvattu (tpiste.py ehtoalueella 0; vanha .ennen-tliitos-vaaka).
- AUKIOT 03/06: puhki palaa lattia; aukion aurinkoinen V4_lattia valokartassa 0,95–1,0 (kujat 0,5–0,7). Korjaus tyokalut/valo_polvi.py 0,65 0,4
  (0,95 → 0,77, kujat 0,70 → 0,67). Osasarja-v6 jo alle polven → ei muutosta.
- PAKETIT (U/paketti_yleinen.zsh <nimi> <LAHTEET> <kansiot…>): osasarja-v6 (LAHTEET-osasarja-v6.md, kansio kielletty-rakennukset/osasarja-v6/
  kielletty-osasarja-v6) → PK + PT (+KK); tausta-v84 (LAHTEET-tausta-v84.md, jos tarkistus 0) → VS + PK + PT; leivonta-v2 (LAHTEET-leivonta-v2.md,
  kielletty-tausta-v85 kielletty-rakennukset-v87 kielletty-muurikate-v31) → VS uusi pari 03/06 + PT. Lopuksi levyvahdin raja 82.
- JONO 4 (PT 31.10. 17.5x, valotöiden 1–3 jälkeen, ei estä junaa 216): Pariisin omat Cesium-mallit (mallit.json). Notre-Damen oma maa nd_maa (409×269 m)
  näkyy vaaleana laikkuna → aukion kivetys + puutarhan nurmi/polut havainnetyyliin; sakariston valkoinen tekstuuriton osa tekstuuriin; sama tarkistus 5 muulle
  Pariisin mallille. Leveä leikkaus pidetään (peittää Googlen restaurointityömaan). Ennen-kuva proto-3d/_tyo/natiiviseppa/nd-leikkaus/pari-K1-notre-dame.png
  (ylempi). Codexin tekstuurit tarvittaessa (pysyvä lupa). Vienti NS:n kautta, jälkeen-kuva NUI:n simulla → PT.
- HERÄTYS: CronCreate d22878f3 (:07/:22/:37/:52, KK 17.4x) vie paketit 1–3; poistetaan paketin 3 jälkeen (session muistissa, nollaus hävittää → aseta uudelleen).

## LISÄYS 165 (31.10. 19.3x): VALOJONO 1–3 VIETY — ALOITA TÄSTÄ (seuraavaksi jono 4: Pariisin Cesium-mallit, LISÄYS 164)
VIEDYT (_valmiit/juoksupeli-kk-lavastaja-<nimi>-vienti-20261031; ajot ja skriptit leivonta-216/uusinta):
- osasarja-v6 (SHA 12ea93377fe7) → PK + PT + KK. Leivonnan hidastuminen 5 → 13 min/ruutu johtui siitä, että objects.remove() kävi läpi kertyneet
  materiaalit → leivo_osasarja.py: batch_remove + orphans_purge ruutujen välissä, osat-verkot use_fake_user (25 s/ruutu; vertailuruutu tavulleen sama).
- leivonta-v2 (polvi 0,65/0,4, 01af37c39009) ja leivonta-v3 (0,65/0,3: tausta-v86, rakennukset-v88, muurikate-v32, 79b448a1d5f3) → VS. Tyokalut/valo_polvi.py
  (glb ja valoatlas.png). VS:n parit: puhki 06 26,1 → 8,3 → 6,3 %, 03 8,8 → 5,3 → 5,0 %; 06 lattian mediaani 199 / havainne 200, p95 234 / 222.
- tausta-v87 = v86 + kuja-0-3 (v84, hitsaus 2,5 mm, polvi), ehtoalueilla 0 vikaa (a1e090c344ac) → VS + PK + PT.
- leivonta-k06 (koekohtaus 06, aurinko f4df529a6 45°/pohja 39,97°; tausta 1-0/2-0, muurikate, 6 rakennusta, 5 osasarjan ruutua, polvi 0,65/0,3;
  koe06.zsh; 3dddcd3d20f7) → VS (pari 06 + puhki-% pyydetty) + PT. Jos VS pyytää säätöä: valo_polvi.py uudelleen *-k06-kopioihin tai koe06.zsh uudella PO/KU:lla.
- Levyvahti päättynyt (18.39), herätykset poistettu. Työkalumuutokset: lattia_tliitokset.py (ALUE_LAATIKKO, VAAKA, HITSI=0), leivo_osasarja.py (siivous).

## LISÄYS 166 (31.10. 19.4x): JONO 4 SELVITYS (Notre-Dame) — ALOITA TÄSTÄ
- Mallit: R2 omat-mallit <versio>/mallit.json; paikallinen v6k26 = _valmiit/omat-mallit-vienti-20261017-v6k26/kartta/omat-mallit/v6k26/ (Pariisi: notre-dame,
  concorde, prefektuuri, banque-de-france, quai-branly, louvre). NS:n ehdokas v6k27 (_tyo/natiiviseppa/nd-leikkaus/v6k27, muut linkkeinä v6k26:een) poisti
  notre-damen maan (vain nd_rakennus + spiira) → PT: leveä leikkaus pidetään → pohjaksi v6k26:n notre-dame (solmut maa, nd_puut, nd_rakennus, spiira).
- ND v6k26 lod0: maa-mesh materiaalit nd_maa (kuva maa_v9c, 27 912 kolmiota) + nd_kalkkikivi (940, rantamuurit); nd_atlas (nd_atlas_lod0, 130 589 kolmiota).
  Lähteet _valmiit/notre-dame-v1 (lahde/maa.py, parvis_v9.py = IGN-orto retusoituna; tekstuurit/maa_v9c.jpg 2048², maa.json rajat x −205…208, y −292…121,
  UV = rajat koko kuvaan). Omistaja 10.10. (parvis_v9): "vähemmän keinotekoinen" → ortokuvan kivetys, ei 2 m:n ruudukkoa. maa_v9d = v9c × 0,57 (hylätty: tummensi).
- KYSYTTY PT:ltä 19.4x: mikä on "havainnetyylin" kuva Pariisille (ei löydy). Ehdotus: v6k26:n maa + Pekingin havainteen tyyli, laikku tummemmaksi Googlen
  jalkakäytävien tasolle, parvis selkeiksi laattavyöhykkeiksi, nurmen polut ennallaan. Sakaristo: etsi nd_atlasista valkoinen tekstuuriton alue (UV-saari ilman
  atlasta) → tekstuuri (kivi_nd tai Codex). 5 muuta Pariisin mallia: sama tarkistus (maa/valkoiset osat). Vienti NS:n kautta, jälkeen-kuva NUI:n simulla PT:lle.

## LISÄYS 167 (31.10. 19.5x): LUOVUTUS (konteksti 37 %) — JONO 4 KESKEN, ALOITA TÄSTÄ
- Valojono 1–3 VIETY (LISÄYS 165). Ei ajoja käynnissä, ei herätyksiä. Odottaa: VS:n pari k06 (puhki-%) → säätö tarvittaessa (LISÄYS 165).
- PT:n VASTAUS kysymykseen "havainnetyyli Pariisille" (lähetetty 19.4x) — jos et näe sitä, kysy PT:ltä uudelleen yhdellä rivillä.
- Notre-Dame v6k26 lod0: kuvat ovat KTX2 (KHR_texture_basisu) → purku: "/Volumes/T7 4TB/koodaus/linssiseppa2-tyokalut/ktx/bin/ktx" extract
  <in.ktx2> <out.png> (puretut maa_v9c.png ja nd_atlas_lod0.png 2048²/… ovat Lavastajan scratchpadissa, tee uudelleen). Uudelleenpakkaus:
  Matkakirja-proto/tyokalut/omat_mallit_ktx2.py --portti <paketti> (gltf-transform + toktx, T7-polut). Paketin rakennusmalli
  _tyo/linnanrakentaja/louvre/rakenna-v6k26.py (uusi versio v6k28 tms. → ei ämpärin ylikirjoitusta; NS vie R2:een).
- Solmut: maa (mesh 0: nd_maa 27 912 kolmiota + nd_kalkkikivi 940 rantamuurit), nd_puut (instanssit), nd_rakennus (mesh 'ikkunat', materiaali nd_atlas,
  130 589 kolmiota, yksi atlas nd_atlas_lod0). Sakariston valkoista osaa EI löytynyt atlasnäytteistä (kolmioiden keskipisteissä ei valkoista
  > 215 kuin 9 kolmiota, rajat x −10…18 z −37…7) → selvitä renderöimällä (Blender, lod0 ylhäältä kaakosta) tai NUI:n simukuvasta: voi olla
  UV-saari atlaksen täyttämättömällä alueella (näytä keskipisteen sijaan koko kolmion alue) tai maa-meshin kalkkikivi.
- Notre-dame-v1 (lähteet): lahde/maa.py (IGN-orto 2018 retusoitu), parvis_v9.py (omistaja 10.10.: vähemmän keinotekoinen), maa.json rajat, UV = rajat.
