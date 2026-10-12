# Linnanrakentajan luovutus 12.10.2026 ilta (tilinvaihto, PT 19.3x)

Edellinen: `viesti-linnanrakentaja-luovutus-20261011-ilta.md` (JATKO-osiot 12.10. asti). Tämä kokoaa tilanteen.

## Pysyvät säännöt (12.10.)
- Omistajan toimia vaativa asia → Asemataulu: ArtifactData set, url https://claude.ai/artifact/Rq5ajPU4SraE2XKd7BYAix,
  kokoelma "talo", doc_id "toimi-linnanrakentaja", data {rooli, kysymys (yksi rivi), ts}. Ei onnistu → Postivahdille "VAATII TOIMIA: …".
  Hoidettu → get + delete if_version.
- Omistajalle vain pelistä otettuja kuvia, TÄYDELLÄ TARKKUUDELLA (yksittäinen tai pari nykyinen | uusi natiivikorkeudella, merkintä
  isona alareunaan, JPEG 90). Blender-kuvat ja monen ruudun arkit vain PT:lle. Pelikuvat ottaa Siirtoseppä.
- Ali-agenttien ohjeisiin AINA: skriptit tiedostoon ja ajo tiedostosta (ei stdin-heredocia, ei python -c, ei zsh -c, ei evalia),
  ei rm:ää/poistoja (uusi tulostekansio per ajo), ei cd:tä, ei &&/;-ketjuja. (Lupakyselyt pysäyttivät omistajan 11.00–11.27.)
- Vapaasti lisensoidut (CC0, CC BY, PD) saa ladata; ei ostoja. Julkaisu vain omistajan pyynnöstä.

## Olavinlinna (juna 184)
Vientiketju: worktree `/Users/Shared/Claude/wt/linnanrakentaja-linna-v45k` (haara linnanrakentaja-linna-v45k), paketit
`_valmiit/olavinlinna-blender-v44` (1499) ja `-v44-nyky` (hahmot/ symlinkki v44:ään). Vientiskripti mallina `_valmiit/olavinlinna-kavely-v1/lahde/tyokalut-lr/vie_v48s.zsh`
(muut `vie_v48*.zsh` scratchpadissa /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linnanrakentaja/5ab64f62-6697-4edf-834c-735c7cfcf3d5/scratchpad/: paketointi → vie-blender.sh → commit/push → gh workflow vie-dioraama.yml osoitin=false → TULOS-tunnus) ; uusi versio = kopio, vaihda v48s → v48t (sed), ajetaan irrotettuna (perl setsid). Tunnukset Siirtosepälle (botti + pelikuvat) ja PT:lle.

| Versio | Sisältö | 1499 / NYKY |
|---|---|---|
| v48m | isoille esineille törmäys (tyokalut-lr/esine_tormays.py) | 5b6233733a9496db / 9bb1bf514e5bd5f4 |
| v48o | + keittiön tulisijan ja padan törmäys (esine_tormays.py VAIN_LISA=1 LISA=…) | 3e5e938d7957d540 / 33468a6d087b503f |
| v48p | + 1500-luvun väljät asut kaikille 11 MH-hahmolle + v48n-kevennys (mh_kevenna.py) | c09695d47f8023dc / d157042efd7826d8 |
| v48q | + vartijoille rautahattu ja keihäs/hilpari (ase-luu), portinvartijan avaimet, sileät kengät | d5afe736572c06bb / 5943527a63233fd8 |
| v48r | + vartijoiden housut takin alle, paljaat kädet, sileä kypärä | 9041e5d5d162dfee / c4b18baf3f7299c8 |
| v48s | + matala kettle hat, voudin kapeat hihat (KESKEN: vienti ajossa 19.3x, katso alla) | — |

- v48r:n pelikuvat (PT 18.5x): apulainen ja portinvartija hyviä; korjattiin v48s:ään kypärä ja voudin hihat. KAPPALAINEN kallistui
  pelikuvassa taaksepäin: agentti vertasi kaikki 11 v48o:hon (hahmot/ennen-v48p/) — leikkeet, luuranko ja pää tavulleen samat → kyse
  kuvaushetkestä/leikkeestä natiivissa, ei mallista. Pyydä Siirtoseppää kuvaamaan sama hetki kuin v48o:ssa.
- v48s:n tila: scratchpadin `vie_v48s.log` (KAIKKI VALMIS → TULOS-rivit). Jos loki puuttuu (uusi tili), tarkista worktreen git log
  ("Olavinlinna v48s") ja gh run list --workflow vie-dioraama.yml; tunnukset Siirtosepälle ja PT:lle.
- Asut: `_valmiit/linna-hahmot/vaatteet-v1/` (lahde/aja.py <id>, asut.py, vertailu.py, kokovartalo.py, vertaa_kaikki.py; lähtö
  metahuman-<id>-v1/glb = v48o:n MH v3). Paketointi: mh_kevenna.py → hahmot/<id>-mh.glb + vaatteet-v1/<id>/astc/*.astcm.
  Jäljellä pienet: niska kauluksen takana ≤ 8 mm eleissä, kengän kärki lahkeen yli kävelyssä 2 cm. Siivottava lopuksi: vaatteet-v1/tyo/
  testikansiot (deb, uusi, nyk, k*, k-*, vertailu-*, lahdekuvat, */ase-koe*.glb, paikkaa_*.py, *-arkki*.jpg).
- Botti v48k 17/17; v48p:n MH-tarkistus Siirtosepällä OK (11/11 latautuu, visemit, muisti ennallaan).

## Muut valmiit tänään (LS2 kytkenyt)
- Raketti v2 (`_valmiit/iss-raketti-v2/`): sahalaita = float-tarkkuus (origo maapallon keskellä) → LS2 siirsi origon; vaihe B (tekstuurit) 184.
- Karttamallit: `_valmiit/olavinlinna-torni-kartta-v1/olavinlinna_torni.glb` ja `_valmiit/iss-raketti-kartta-v2/iss_raketti_kartta.glb`
  (palettilaatat, Tyylikirjan värit); paletin säädöt vasta LS2:n iPad-kuvien perusteella.
- Keittiön koehuone (`_valmiit/olavinlinna-keittio-koehuone-v1/`): v3 (pata, paisti), v3b/ajo16 (halot, hiillos, tuhka; iPadilla OK),
  päivä paiva/ajo2 (LS2 kytkee kun PT pyytää). Vartaan liekkien väri = natiivin DioraamaLiekit (LS2).

## Jono
1. v48s-tunnukset Siirtosepälle ja PT:lle (ja kappalaisen kuvaushetki), sitten omistajan pelikuvat PT:n kautta.
2. PT:n/omistajan palaute asuista → v48t tarvittaessa.
3. LS1:n museopilotin mallinnusapu (holvikatto, Cuypersin listat), SK:n sisätilojen totuuskorjaukset (#4417), Pariisi v3c/v3d LS2:lla.

## JATKO 19.5x–21.5x (sama tili)
- v48s VIETY: 1499 c68f0392dff4ea5d, NYKY 6a73746cefcb1d22 (haara v45k 3d6e47e6d). Tunnukset Siirtosepälle (botti + pelikuvat, kappalainen
  v48o:n hetkeltä) ja PT:lle. v48t vasta omistajan palautteesta (PT 20.0x).
- LS1: Yövartion salin pylväs + kullattu naisfiguuri `_valmiit/taidemuseo-yv-pylvas-v1/` (lahde/pylvas.py; figuuri = apulaisen MH-runko
  kullattuna; 7 452 kolmiota, 3 materiaalia). LS1 vei v6-saliin.
- LS2: keittiön v3c-esineistö (`koehuone-v1/v3c/ajo3`, LUEMINUT-v3c.md) ja tulisija v3d (tuhka koko pedin yli, uudet halot, hiilet) =
  YKSI v3kansio `v3d/ajo2/`, liite v3d (LUEMINUT-v3d.md). Ketjut `lahde-v3c/aja-v3c.zsh` ja `aja-v3d.zsh`. Kolmiot huippu 149 489 / 150 k
  (ei enää tilaa: seuraava lisäys vaatii kevennyksiä), kevyt 35 413 / 40 k. LS2 kääntää v9c:n ja kuvaa.
- Avoinna: #4417:n järjestys PT:ltä; Pariisi v3c/v3d odottaa LS2:n kuvia.

## JATKO 21.5x–23.0x (sama tili)
- **#4417 (PT 21.4x: raportin luku 6 järjestyksessä, erät Siirtosepälle → juna 185):**
  - **v48t VIETY** (kohdat 1–2): 1499 5b4fd306e6cab22c, NYKY eb72af39ec51de63 (v45k b879e9e6b…; lähde 4de68dd3a). Kappeli kalkki
    (uusi pinta kalkki = white_rough_plaster PH-kansiossa), 12 pientä himmeää ristiä (okramaali/harmaavihrea), 322° sivualttarin syvennys,
    Codex-alttarikaappi pois; fatabuuri/keskushalli/kierreportaat soihdut → resepti ihralamppu (liekki kynttila), trimmaukset uudelleen.
    Tunnukset Siirtosepälle lähetetty. Työkalut tyokalut-lr/: leivo_kappeli_v48t.zsh, leivo_soihdut_v48t.zsh, sovita_kirkkaus.py, kytke_v48t.py, vie_v48t.zsh.
  - **v48u VIENNISSÄ** (kohta 3): Kuninkaansali = voudin-sali: GothicCabinet + Sturen lippu pois, lattia kivilattia, linnantuvan + salin
    soihdut ihralampuiksi, keittokulhon palat (salin "juustoastia") liemen alle, esinetörmäykset uudelleen (esine_tormays.py ennen-v48m:stä;
    VALIDOITU tavulleen). Loki scratchpad/vie_v48u.log → tunnukset Siirtosepälle + PT. kytke_v48u.py, leivo_v48u.zsh, vie_v48u.zsh. Lähde e05c32ad6.
  - SEURAAVAT: kohta 4 Tott-kammio (takka kilpineen, neljä ovea, ampuma-aukot), 5 muurikäytävät (8 aukkoa + tykinalustat), 6 tyrmä,
    7 porttikäytävä, 8 keittiö, 9 seinät, 10 laituri. Rakennusketju: js/dioraama/rakennukset/olavinlinna/<tila>.js → rakenna.mjs →
    leivo_tila.py --iso 8192 (+ --hamara) → sovita_kirkkaus → astc (swift 4x4, astc.py 6x6) → jälkikäsittelyt (MUUTOKSET) → kytke → vie.
    HUOM: kavely-osien (kavely.py) muutokset vaativat jumi-ajot (botti) — kohdat 4–7 todennäköisesti.
- **ASUT v48v (omistaja 22.4x valitsi uudet asut, PT):** Opus-ali-agentti työssä vaatteet-v1:ssä (kankaiden rakenne + u-sauma putki(),
  kokin olkapää, vesipojan rintaraita, kappalaisen kaulan tumma läikkä = epäilty niskan hiuskortit). Agentti EI paketoi: paketointi
  mh_kevenna.py + vie_v48s.zsh-mallilla (MH-silmukka) → Siirtoseppä kuvaa v48s | v48v (myös soutaja, vartija2) → PT → juna 186.
- **Koehuone LS2:lle:** v3d/ajo2 (pelissä hyvä), v3e/ajo1 (tuhka tummaksi, hehkusaumat ohuiksi; liite v3d). LUEMINUT-v3e.md.
- **LS1:** YV-pylväs v1 viety v6-saliin.
- **LINNA KEITTIÖN TASOLLE (omistaja 23.0x, PT hyväksyi suunnitelman):** kun keittiö v9d hyväksytty + v48v viety: huone kerrallaan
  porttikäytävä → pikkupiha → linnantupa + Kuninkaansali → Tott-kammio → kirkkotorni-portaat → kappeli → muurikäytävät → fatabuuri → tyrmä
  → laituri (#4417-korjaukset samalla). Siirtyy: HDR-yöleivonta (albedo + irradianssi + luotaimet), PBR-esineet, tulisijat/liekit (v3e),
  KCD2-tiheys, detaljit/savuverho. Budjetti per huone = keittiö (huippu ≤ 150 k / kevyt ≤ 40 k, 8k albedo + 4k irr), iPad-muistiajo
  jokaisesta erästä. Jokaisesta erästä PT:lle ennen | jälkeen -pari samasta kulmasta → Siirtosepän botti. LS2 varjostimet, Siirtoseppä kytkentä.
- **PORTTIKÄYTÄVÄ (laajennuksen 1. erä, PT 23.2x: v9d hyväksytty):** kartoitus + työsuunnitelma `docs/raportit/linnanrakentaja-porttikaytava-suunnitelma-20261012.md`.
  LS2 tekee natiiviin tilakohtaisen tasokuvauksen (tila-id porttikaytava-t102). Palatsin ihralampuilla ei liekki:-solmuja → kynttilaliekit erässä 3.
- **v48v VIETY** (13.10. 00.xx): 1499 ea94444a853a79bb, NYKY a130a778d62de2e4 (v45k 03e6d4090) → Siirtoseppä kuvaa v48s | v48v, NS muistirivi lähetetty. Keittiö v3f (halon säröt ilman Voronoita) LS2:lla. Porttikäytävä v1: Opus-agentti työssä `_valmiit/olavinlinna-porttikaytava-v1/`.
- **PORTTIKÄYTÄVÄ v1 VALMIS** (13.10. ~00.4x): `_valmiit/olavinlinna-porttikaytava-v1/ajo2/` (ketju `zsh lahde/aja.zsh <ajo>`, ~8 min; LUEMINUT + LAHTEET juuressa). Huippu 58 235 / kevyt 9 795, albedo 4k 10 Mt + irr 2k 5,6 Mt. Parit PT:lle (esikatselu/pari-{alku,loppu}.jpg), paketti LS2:lle (osat.json "tila": "porttikaytava-t102"). Auki: varjokeilat jyrkät, tumma (+0,5 EV?), päiväleivonta. Seuraava erä: pikkupiha.
- **Porttikäytävä HYVÄKSYTTY (PT 00.1x)** → ajo3 (+0,5 EV irr ×1,414, lyhtyjen shadow_soft_size 0,09; aja.zsh: KAYTAVA_LISA / YHD_LISA) LS2:lle (kytketty b131a72df, komento `poikki huone porttikaytava-t102 <kansio>`). PT: tarkista pelikuvasta kaaren aukossa oikea piha. **Pikkupiha v1:** Opus-agentti `_valmiit/olavinlinna-pikkupiha-v1/`.
- **Porttikäytävä ajo4** (3 lyhtyä 26 W, täyttövalo, taivas 0,8, julkisivu pielikiveä; lahde/muokkaa_ajo4.py) LS2:n otossa pk2. **v48w** (kierreportaiden lamput, botti 86/90) leivottu, vienti käynnissä → tunnukset Siirtosepälle. **Pikkupiha v1 VALMIS** `_valmiit/olavinlinna-pikkupiha-v1/ajo2/` (54,9 k / 8,9 k; kuoren leikkaus glb/pikkupiha-kuoren-leikkaus-v1.json natiiville; parit PT:lle, paketti LS2:lle). Seuraava erä: linnantupa + Kuninkaansali (kynttilaliekit ihralampuille). Vesipojan rintakaista: Siirtoseppä kuvaa toisessa valossa.
- **v48w VIETY**: 1499 13bb80efd91aa352, NYKY 6fd5e5830b503ecc (v45k e6bb679d7) → Siirtoseppä botti 86/90 + puuttuvat kuvat; korvaa v48v:n junassa 186. Pikkupiha ajo3 (PT:n 3 korjausta: reikä kiveyksessä, lankkukasa, seinän UV + hiilipannun muna) agentilla.
- **Porttikäytävä ajo6** (julkisivu kaksipuolinen, holvi päihin) EI poistanut pk1b:n mustaa rakoa eikä pk3:n kylmää kivipintaa → ne ovat muuta geometriaa (todennäk. ulkokuori / kävelyosa); LS2 tunnistaa piilotusajolla → sitten leikkausjson tai verhous. **Pikkupihan lyhtytolppa** = tilat/tunnelma.glb (kynttilälyhty (−23,0; −1,12; 8,55), solmut liekki:24-kynttila, valo:24, valo:52; tunnelma.glb on linkki v41:een) → LS2 piilottaa solmut, kolmiot pois seuraavassa paketissa (v48x). Kivikuutiot = kirkkotorni-portaat-massa → pikkupiha ajo3 verhoaa.
- **Pikkupiha ajo3 VALMIS** (lattia umpinainen, kalliokummut, seinän UV, E 102 -verhous, oma hiilipannu; 58,8 k / 9,9 k) → LS2 lopullinen otto. **Botti 90 = ATLAS**: kierreportaiden harjan puoleiset 74 palaa (< 1,5 m pisteestä (−37,38; 18,0; −7,28)) hämäräatlaksessa mustia (0,007 vs vanha 0,084; geometria sama kuin v48k) → v48x-korjaus Siirtosepän täysikokoisten kuvien jälkeen. v48x valmisteltu: kytke_v48x_tunnelma.zsh (tolppa pois), tila_laatikko_pois.py.
- **v48x VIENNISSÄ** (scratchpad/vie_v48x.log): tunnelman lyhtytolppa pois (tila_laatikko_pois.py), vesiportin 25 m² kattotaso pilkottu porttikäytävän kohdalta (porttikaytava_pilko.py; LS2 pk3), kierreportaiden harjatrimmaus laajennettu z → −8,3 (93 kolm.; botti 90). Porttikäytävän kuoren leikkausjson ajo6/glb/ (LS2 pk1b). kytke_v48x.zsh, vie_v48x.zsh. Tunnukset → Siirtoseppä (botti 86/90 uusinta).
- **Pikkupiha ajo4** (silokalliokummut ≤ 0,32 m, 2 jäljellä, 3 poistettu → törmäys näkymätön kohdissa (−25,1; 5,8), (−18,7; 5,9), (−17,2; 4,8), (−15,6; 9,2), (−14,2; 9,9); 59,6 k / 10 k) → LS2 lopullinen otto; Siirtoseppä arvioi botilla (tarvittaessa kavely.py pikkupihan törmäys tasaiseksi). Vesipojan kaista = natiivin kova varjo (ei mallivika, PT:lle).
- **v48x VIETY**: 1499 736d361c9d99f85d, NYKY fd05d7a3c22ecdee (v45k 1dc5fd53f), korvaa v48w:n junassa 186 → Siirtoseppä botti + 86/90 täysi ruutu + kappelin sivualttari/holvi.
- **Pikkupiha ajo5** (graniitti −40 %, jäkälä, saumaväri) LS2:n jonossa. **Erä 3 (linnantupa + Kuninkaansali/voudin-sali) aloitettu**: Opus-agentti → `_valmiit/olavinlinna-palatsi-v1/<tila>/ajoN/` (budjetti 80 k / 20 k per tila; takka v3f-tapaan, ihralamput kynttilaliekein, laattalattia, 1499-esineistö). **v48y** (vesipojan rintaraita = MALLISSA, LS2:n 4 tilan testi) asuagentilla.
