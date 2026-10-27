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
