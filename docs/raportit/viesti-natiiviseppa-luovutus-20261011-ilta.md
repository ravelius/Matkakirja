# Natiiviseppä: luovutus 11.10.2026 klo 17.3x (PT:n nollaus, juna 182 odottaa Olavinlinnaa)

Edellinen: viesti-natiiviseppa-luovutus-20261011-iltapaiva.md (BUILD 181, linja 2, MSAA-kokeet).
Proto /Users/Shared/Claude/proto-3d/Matkakirja-proto (Unity 6000.7.0b4). Junaworktree /Users/Shared/Claude/wt/proto-natiiviseppa-j175
(haara natiiviseppa/juna-182, peili natiivi-backup peili/proto/natiiviseppa/juna-182).
Junan 182 kaavat: /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna182/ (lukitse182-a/-b, laite182, ketju182, muisti182 + ab67,
mac182, muutosloki-182-luonnos.txt, kasvot-sim.sh, hehku-ssao-sim.sh).

## ENSIMMÄISEKSI
1. **Unity-beetaseuranta**: CronCreate "4 9 * * *" (cron katoaa nollauksessa) + aja kerran
   `python3 /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py` (11.10. 12.56: ei uutta, 6000.7.0b4).
2. **Tarkista viimeinen testiajo**: rungon 996638465 testit käynnistyivät 17.3x ennen nollausta (kuorma kova). Aja tarvittaessa uudelleen:
   `for t in Linssit Peli Kartta; do nice -n 10 sh $W/$t-testit/kaanna.sh | tail -1; done; nice -n 10 zsh $W/tyokalut/tarkista.sh`.
   Edellinen kärki 66859418b: L1458/P506/K480, tarkista 0.
3. **JUNA 182 odottaa enää Olavinlinna-yhdistelmää** (Siirtoseppä/Julkaisija: botti 17/17 + Laitetestaajan 8. kierros, soutajan
   repliikit 38108e9ad). **EHTO**: yhdistelmän pitää sisältää Siirtosepän **f2bae0ac6** (LinssiOhjain.AvaaPelattavaPala), muuten
   NUI:n Olavinlinna-nosto palauttaa Pelaa-maksun eikä peli avaudu. Lukitus vasta PT:n rivillä **LUKITSE 182** (omistajan lupa 15.4x).

## JUNA 182 = natiiviseppa/juna-182 996638465 (pohja BUILD 181 a93ce987f)
Kaikki PT:n KUITATTU-riveillä: LS1 kippi-leveat-pysty af7314a19, aloitusintro 44929af18, aukiot-monumentit f40982d9d,
eurooppa-loitonnus 1c47a1e52 (⊃ Andøya 8ca6f2c7f); LS2 museo-182 7a6051553, museo-zoom 2ed80e908, museo-info 0c10deb39 (⊃ 5438a04f5,
df7cce371); NUI lahtokohteet 3b2d97f6d, linna-kyltit bf81fe534, pulu-opastus a568d9ac2, pallot-pelaajalle 0e6a4a018,
kooste-182 81d463634 (aloitus-aarre, olavinlinna-nosto, pallo-hintalappu + Rahapula, linssikortti, sykäys, lautapelit ilman korostusta);
Pelikoodari pulla-turvaverkko 61c412e0d, iss-radio 235b230ba, pallo-hinta 53cc29f22, olavinlinna-hinta b6f15b061, linssiaarteet
a5df10a0a, kukkaro-palaute 35025feed, soittosaanto 5cd83d5f0; NS hehku-ssao d60263924, soutaja-kasvot 6545892de, vahti-pgrep 8b65518ae.
PERUTTU: NUI linna-tekstit 25f332fe1 (revert a5e0a4c7b). EI 182:een: Pelikoodari raketti-hinta 0202b59bb (LS2:n laukaisun kanssa, 183),
soutaja-v2 ac52e6c86 (Siirtosepän kohtausajoituksen kanssa; PT kuittaa yhdessä), soutajan täydet kasvot LR:n FACEIT 52:lla (183).
Tyylikirja: ristiriidat ratkaistu generoimalla mainin 33439cb57 tyylikirja.json:sta (`git archive origin/main tools/tyylikirja.mjs tyylikirja/
css/styles.css | tar -x -C <dir>` → `node <dir>/tools/tyylikirja.mjs --natiivi $W`; `--tarkista` = "ajan tasalla (lähde 10b6297ec042)").
Muisti: museo lisää muistia (LS2: iPad fp ≤ 2615 Mt) → **muistiajo iPadilla ennen VIE:tä** (muisti muistijuna-ipad-ajo-ennen-vie).

## LUKITUSKAAVA (LUKITSE 182 -rivistä; K=natiiviseppa-skriptit/juna182)
1. Olavinlinna-yhdistelmä runkoon: `zsh $K/lukitse182-a.sh <SHA> "Juna 182: Olavinlinna … "` (merge → testit → tarkista → peili → käännös
   linjalla 1 proto-kaanna.sh). Tarkista f2bae0ac6: `git merge-base --is-ancestor f2bae0ac6 HEAD`.
2. Muistiajo (Julkaisijan laitevuoro, iPad Pro 13 00008103-001819421413401E): `zsh $K/ketju182.sh <runko>` = Release-laitekäännös (laite182)
   → Pariisi A/B + Olavinlinna (muisti182) → taidemuseo 33 pysähdystä. Portti: ei jetsameja, Pariisi ≤ ~0,75 Gt, museo ≤ 2,7 Gt.
3. Muutosloki PT:lle kuittaukseen: $K/muutosloki-182-luonnos.txt (poista [ODOTTAA]-rivit, lisää Olavinlinna-yhdistelmän sisältö).
4. BUILD 182: kirjoita $K/build182-viesti.txt (malli: BUILD 181 -viesti, __RUNKO__-paikka, muutosloki + Mukana-lista yllä) →
   `zsh $K/lukitse182-b.sh <runko> <käännös-SHA>` (master a93ce987f, juna/b13 dc89bb5d6 → runko, merge --no-ff, juna.log, peilit).
5. TF: iOS Julkaisija (sisäinen → Arvioijat + Beta-testaajat); Mac `zsh $K/mac182.sh <BUILD-SHA>` (APPSTORE=1); kopioi-juna-app.sh 1.1.182.

## TEHTY TÄNÄÄN (todisteet proto-3d/lokit)
- **Pallohehku muurien läpi** (Olavinlinna): syy Ultra_Rendererin SSAO (Source DepthNormals) → syvyys esiajosta, linnan varjostimilta
  puuttuu DepthNormals-ajo → muurit puuttuvat syvyydestä. F1 flipDepthTexture ei auttanut. Korjaus d60263924: SSAO pois seikkailun
  ajaksi (SeikkailuValot.VarmistaFeature/PoistaFeature), PalloHehku = true. Todisteet todistus-pallo-ssao-f0-20261011-1343 (A/B),
  todistus-pallo-korjaus-20261011-1405 (+ vertailu-f0-vs-korjaus.png). Myös Siirtosepän linnahaarassa 268e87459.
- **Soutajan kasvot** (omistajan pyyntö, PT:n suunnitelma): natiiviseppa/soutaja-kasvot 6545892de (Kasvoilme-ydin + DioraamaHahmot3D.Kasvot.cs
  + SeikkailuRepliikit.PuheTila/kohdistus.json/voimakkuuskäyrä). Sivulöydös: veneen soutaja ei aiemmin räpäyttänyt eikä liikuttanut suuta.
  QA `linssi poikki kasvot 0|1 | ilme <x>|pois | soita <tunnus> | tila`. Todiste todistus-soutaja-kasvot-20261011-1538 (kasvot-video-8fps.png).
  Rajapinta Siirtosepälle: manifestin "kasvot": {ilme, katse, eleet[{sana|t, ele}]}; Pelikoodari: <tunnus>.kohdistus.json (ElevenLabs).
  Linnahaarassa 046e28c48. **183**: LR FACEIT 52 + ele_puhe_istuen + ele_osoitus_portti (jonossa linnan jälkeen), eyeLook*-muodot.
  PT huomasi: parran leukakohta sahalaitainen lähikuvassa = mallin tekstuuri (PT → LR, 183).
- **unity-vahti.sh** (8b65518ae): zsh ei pilkkonut pid-listaa → "usage: pgrep" ja lapsenlapset (Burst) pois puusta → vääriä jumihälytyksiä.

## AVOIMET (183 tai myöhemmin)
- LS2:n linnan grafiikan pystyleike klo 17.30 jälkeen: fps- ja muistimittaukset iPadilla (PT). Uudet taitopaketit: unity-perf:unity-performance,
  unity:unity-cli (vain NS ajaa); Raamattu voittaa ristiriidassa.
- MSAA-varoitus (kehitysversion konsolissa käynnistyksen kartalla): kokeet D (Ultra SSAO pois) ja E (Ultra MSAA 1×) tekemättä; huom.
  SSAO:n DepthNormals-esiajo voi liittyä samaan.
- Linnan SSAO ei varjosta linnaa lainkaan (varjostimilta puuttuu DepthNormals) → jos AO halutaan linnaan, DepthNormals-ajot varjostimiin.
- Simulaattori natiiviseppa-iPad13 D61642C8 (oma, T7). Simu- ja laitevuorot vain Julkaisijan SIMU NYT / laitevuorolla; SIMU VAPAA heti.
- Worktreet: proto-natiiviseppa-hehku (natiiviseppa/hehku-ssao), -kasvot (soutaja-kasvot), -vahti (vahti-pgrep) — mergetty junaan;
  ÄLÄ poista ilman omistajan lupaa (rm -rf hylätty 11.10. 00.4x).
