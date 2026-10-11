# Natiiviseppä: luovutus 11.10.2026 klo 12.4x (PT:n nollaus 50 %)

Edellinen: viesti-natiiviseppa-luovutus-20261010-ilta.md (TILA-osiot 10.10. 20.0x – 11.10. 10.48: BUILD 180, akkumittaus, BUILD 181, linja 2).
Proto /Users/Shared/Claude/proto-3d/Matkakirja-proto (Unity 6000.7.0b4). Junaworktree /Users/Shared/Claude/wt/proto-natiiviseppa-j175 (haara natiiviseppa/juna-182).
Skriptit: /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/ (palautettu NAS:lta 11.10.; EI lokit/-kansioon, jonka joku siivoaa NAS:lle).
Kaavat 180/181: scratchpad /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-3d-selvittaja/d669b7e8-ea9b-4d78-804d-673f1bef6617/scratchpad/
{lukitse181-a.sh, lukitse181-b.sh, build181-viesti.txt, laite181.sh, ketju181.sh, muisti181.sh, mac181.sh, akku-ajo.sh, akku-analyysi.py}.

## ENSIMMÄISEKSI
1. **Unity-beetaseuranta**: CronCreate "4 9 * * *" (cron katoaa nollauksessa) + aja kerran
   `python3 /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py` (tyhjä = ei uutta; nähdyt 6000.7.0b1–b4).
2. **JUNA 182** jatkuu (alla). **LUKITUS VASTA OMISTAJAN SANASTA PT:n kautta** (omistaja 11.5x: tavoite ensimmäiset beta-testaukset tänään).
3. **Pallohehkukoe F0/F1** (alla), jos ei vielä tulosta.

## BUILD 181 = a93ce987f48bc35e4b2554990427573d51947d1c (master; juna/b13 dc89bb5d6 = natiiviseppa/juna-181-2)
TF 181 iOS (Julkaisija 38121309251, sisäinen → Arvioijat + Beta-testaajat) + Mac KÄÄNNETTY a93ce987 10.39 (lokit/natiiviseppa-mac-tf-181-a93ce987).
Simu-.app lokit/juna-1.1.181-a93ce987. Muistiajo 181 OK (51bd68d8b) + puiden Pariisi-portti OK (c1de4d7f3: A 0,69 / B 0,73 Gt).

## JUNA 182 = natiiviseppa/juna-182 c85a13ef7 (pohja BUILD 181 a93ce987f; peili peili/proto/natiiviseppa/juna-182)
Kuitatut sisällä: LS1 kippi-leveat-pysty af7314a19 (e71176416 oli jo 181:ssä), LS2 museo-182 7a6051553 (⊃ NUI 79fbb7a35; LISÄÄ MUISTIA: LS2:n
iPad-ajo fp ≤ 2615 Mt, vapaa ≥ 2504 Mt), NUI lahtokohteet-182 3b2d97f6d, Pelikoodari pulla-turvaverkko-182 61c412e0d, LS1 alkulento-kaupungit-182
8b6ac5542 (⊃ 6a1068db8), Pelikoodari iss-radio-182 235b230ba (äänet aanet/iss-v1/radio/ Julkaisijan vientijonossa: tarkista aws s3 ls ennen VIE:tä). PERUTTU: NUI linna-tekstit 25f332fe1 (merge 4ea8c02df revertattu a5e0a4c7b; omistaja: vanhat tekstit takaisin).
Testit 0a1f489a6: K468/P490/L1439, tarkista ok.
TULOSSA (PT 12.4x): LS1 aloitusintro-182 (⊃ 8b6ac5542), NUI Pulu-jakso + linna-kyltit (+ kortiston Takaisin pienenä committina), LS2 kehys + zoom,
KIIRE: LS1 Pariisin saapumisesitys, Pelikoodari alkulennon horisontti, NUI Pulun alku. Olavinlinna v12 -yhdistelmä (Julkaisija) kun 7. kierros läpi.
LUKITUS: muistiajo (museo lisää muistia → ketju181.sh-kaava, museo-muisti-ipad.sh 33 pysähdystä), muutosloki PT:lle, lukitse181-a/-b -kaava
(master nyt a93ce987f, juna/b13 dc89bb5d6 → vaihda 182:lle), Mac (mac-kaanna.sh, APPSTORE=1), kopioi-juna-app.sh 1.1.182.

## PALLOHEHKUT MUURIEN LÄPI (PT: etusijalla ennen MSAA:ta, Siirtosepän kanssa)
Siirtoseppä poisti volumetriset pallohehkut 7deab1a28 (SeikkailuValot.PalloHehku = false), koska hän luuli syyksi MSAA-varoitusta. MSAA-varoitusta
EI tule linnassa (koe A: 0 riviä 45 s), joten syy on toinen. Epäily: Volumetric Lightsin syvyys käännettynä linnan RT-kameralla (Kronnectin oma
varoitus, flipDepthTexture), TAA-värinä tai puuttuva syvyys. Koehaarat (EI junaan): natiiviseppa/hehku-koe-f0 81ebe2f66 (PalloHehku = true),
hehku-koe-f1 77415b7fa (+ flipDepthTexture = true myös kuunsäteelle). Ajot: scratchpad hehku-koe.sh (linja 2 -käännökset → lokit/natiiviseppa-hehku-f0|f1)
+ hehku-sim.sh (odottaa käännöksiä ja porttitiedostoa scratchpad/hehku-simu-nyt; luo se Julkaisijan SIMU NYT -luvalla: `touch …/hehku-simu-nyt`).
Skenaario Siirtosepän proto-3d/tyokalut/siirtoseppa-ajot/skenaariot/pallo-a1.txt, vertailu lokit/todistus-laituri-a1-20261011-0540/kuvat/a1-00.png
(ruskea pallo laiturilla). Tulokset lokit/todistus-pallo-a1-f0|f1-*. Jos F1 poistaa pallon muurin läpi → korjaus = flipDepthTexture linnan kameralle
ja PalloHehku takaisin (PT:n kuittaus). Simu natiiviseppa-iPad13 D61642C8 (oma, T7-sarja, Ultra).

## MSAA-VAROITUS (myöhemmin, ei junaan 182; PT 12.4x)
"multisampled texture … Texture2DMS" vain kehitysversion konsolissa käynnistyksen kartalla (3–7 riviä). Poissuljetut: B Ultra ForcePrepass
(natiiviseppa/msaa-koe-prepass a7d52a9ca), C kaupunkipallot ilman MSAA:ta (msaa-koe-c ac24288f5). Seuraava: D Ultra SSAO pois, E Ultra MSAA 1×.
Skenaariot tyokalut/natiiviseppa-ajot/sk-msaa-linna.txt, sk-msaa-kaynnistys.txt.

## TOINEN KÄÄNNÖSLINJA (PT 10.2x, käytössä)
`PROTO_LINJA=2 proto-3d/tyokalut/proto-kaanna.sh <haarat> [simut]` → kopio proto-3d/Matkakirja-proto-linja2 (→ /Volumes/T7 4TB/koodaus/proto-linja2),
lukko /tmp/matkakirja-kaannospalvelu-2.lukko, nice 15 + xcodebuild -jobs 6, loki *-l2.log. burst-jit.sh viitelaskettu (haltijat
/tmp/matkakirja-burst-jit-haltijat/<pid>). Viennin uusinta myös "Interrupted system call" (T7 EINTR). Varmuuskopiot tyokalut/*.ennen-linja2-20261011.
Juna, linnavahti, laite- ja Mac-käännökset linjalla 1. Laiteskripteistä (laite*.sh) pgrep-odotus poistettu (odotti myös linjaa 2).

## MUUT
- Säästökatot (omistaja 00.0x) junassa 181: KuvataajuusPaatos (pallo 40/30 fps, lämmin-katto, kartan lepo 10 Hz). Uusinta: kuuma 2 min 10 s → 4 min 50 s.
  iPad Pro 13 hyppää 0 → 2 (lämmin-sääntö ei laukea). Johdoton akkuajo tiistaina omistajan ollessa paikalla (raportti natiiviseppa-akku-lampo-180.md).
- Levy: omat vanhat kopiot ovat jo NAS:lla (Matkakirja-arkisto/lokit, joku siirsi). ÄLÄ poista mitään (omistaja hylkäsi rm -rf:n 00.4x).
- Opittu: hylätty lupa estää vain sen komennon → JUMI PT:lle, muu jono jatkuu (muisti luokitin-esto-ei-pysayta-jonoa).
- PT on kahdella nimellä (paikallinen + Remote Control): SendMessage-virheessä käytä [ref]-tunnistetta listauksesta.
