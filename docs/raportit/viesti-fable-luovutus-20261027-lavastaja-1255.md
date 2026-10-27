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
