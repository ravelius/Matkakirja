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
- **Pikkupiha ajo6/ajo6b** kumpujen pinta "kallio" → "silokallio" (`lahde/pinta_nimeksi.py`; natiivin detalji "kallio" kirkasti kummut; "rauta" jää). **Vesipoika**: LS2:n erotteluajo → tunikan itsevarjo, korjattu natiivissa (04f0109e6); asuun EI muutosta, v48y peruttu.
- **BOTTI 86 = VÄÄRÄT LEIVONTALIPUT (13.10. 03.2x)**: v48t/v48u/v48w-leivontani ajettiin ilman `--kuori` → varjostajana proseduraalinen massa → ulkopinnat atlaksessa nollaa (kierreportaiden ulkoseinä muurikäytävälle). OIKEAT LIPUT (paistot.sh 7.10.): `--leivo --leikkaa --naytteet 256 --kuori olavinlinna-blender-v44/ulkokuori/ulkokuori_normaali.glb --iso 8192`, hämärä `--hamara --tavoite`. Koe: piste 86 keskiarvo 0,080 (v48s 0,078, v48x 0,036). **v48z** = kuusi tilaa (kierreportaat, fatabuuri, keskushalli, kappeli, voudin-sali, linnantupa) uudelleen: `tyokalut-lr/leivo_v48z.zsh <ulos>` (kavely-v1/v48z-leivo) → `kytke_v48z.py <ulos>` → `vie_v48z.zsh <loki>` → tunnukset Siirtosepälle (botti 86 + 90 + yleiskierros). Palatsiagentille (erä 3) lähetetty samat liput.
- **v48z VIETY** (13.10. ~04.3x): 1499 f8dc4a8cddbb4245, NYKY e63eed0f1149d99a (v45k e33fe9a34) → Siirtoseppä botti 86/90 + kappelin kuva (kalkki kirkkaampi); korvaa v48x:n junassa 186. Pikkupihan pp4-oviaukon mustat palat = kirkkotorni-portaat-kävelyosa → LS2 rajaa ajo6-jsonin laatikot_xz:llä natiivissa (e6e4fea53), ei verhousta. LS2 tekee pikkupihan lopullisen oton v48z:lla.
- **Pikkupiha lopullinen otto v48z + ajo6** (LS2 lokit/todistus-pp8-20261013-0426, tolppa poissa, oviaukko puhdas). LS2 pp2: keittiön G 102 julkisivu tummempi/sinertävämpi (oma tila ilman pihan valoja) → **ajo7** Opus-agentilla: julkisivuverhous 2,5 cm (muuri, pihan valoilla, ovi + ristikkoikkuna auki, kuten E 102). Kysytty LS2:lta, kumpi keittiön glb pelissä piirtää julkisivun.
- **Erä 3 ajo3 valmis** (`_valmiit/olavinlinna-palatsi-v1/{linnantupa,voudin-sali}/ajo3/`; tupa 74 k / 19 k, sali 66 k / 14 k; laattalattia, kalkkiseinät, huuvatakat, Tottin vaakuna; poistolista natiiville LUEMINUT:ssa). Tarkistuksessa tulipesät valkoisina laatikoina ilman tulta → agentilla **ajo4** (nokiset tulipesät + v3d-tuli, salin sauma y 10,1, sininen läikkä, kevyt esikatselu). Sen jälkeen parit PT:lle + paketti LS2:lle.
- **v48z BOTTI 17/17** (Siirtoseppä, PT kuittasi junaan 186). Kappelin kalkki ei pala puhki. Holvin lakipisteen musta viuhka (jo v48x:ssä) EI ole leivonnassa (atlas 0,84, ei mustia kolmioita) → LS2 testaa kattokruunun varjonheiton pois. Erä 3:n paketoinnissa: uusien lattiaesineiden (halkopinot, jalkakynttilänjalka, salin arkku) törmäys (esine_tormays.py-malli) + natiivin poistolista → botti kerran.
- **v49a VIETY** (13.10. ~05.4x): 1499 b8b9489b12ee5576, NYKY 7264551e1a39e864 (v45k 960600464) = v48z + kappelin holvin musta viuhka pois. Syy: kavely/kappeli-kavely.glb solmun kappeli-kavely-rappaus 115 ohutta lakikolmiota UV1 atlaksen tyhjään kohtaan; tila ei kata tätä holvikenttää (leikkaus jättäisi reiän) → `tyokalut-lr/uv1_mustat_naapuriin.py` (omat kärjet, UV1 lähimmän valoisan kohtaan), kytke_v49a.zsh, vie_v49a.zsh. LS2 tarkistaa holvin, ei bottia. Ajot: pikkupiha ajo7 (keittiön julkisivu) + erä 3 ajo4 (tulipesät, törmäys-extras) agenteilla.
- **Erä 3 VALMIS** (13.10. ~06.xx): `_valmiit/olavinlinna-palatsi-v1/linnantupa/ajo6/` (74,6 k / 19,7 k) ja `voudin-sali/ajo5/` (67,7 k / 14,7 k); nokiset tulipesät + v3d-tuli, salin sauma pois, törmäys-extras (halkopino, jalkakynttilänjalka, vaatearkku, tynnyri). Parit PT:lle, paketti LS2:lle (pelikuvat + iPad-muistiajo) → PT-kuittaus → Siirtosepän botti. Auki: päiväleivonta, tuvan UV1-täyttö 45 %. Seuraava huone: Tott-kammio.
- **Erä 4 aloitettu** (Tott-kammio A 101 + kirkkotornin portaat; #4417 kohta 4: takka Tott–Sture-kilvin, neljä ovea, kaksi ampuma-aukkoa, kiveys, palkkikatto): Opus-agentti → `_valmiit/olavinlinna-tott-kammio-v1/` (budjetti 80 k / 20 k, tila-id ehdotus tott-kammio). Totuusraportti = origin/main docs/raportit/olavinlinna-sisatilat-totuus-20261011.md (#4417).
- **v49a holvi ilman viuhkaa** (LS2 lokit/todistus-kh2-20261013-0553/holvi-v48z-v49a.png, PT + Siirtoseppä saivat). KAPPELIN ERÄÄN MUISTIIN: holvi on yhä tilkkutäkki — tilan kalkkikenttä, kävelyosan kappeli-kavely-rappauksen harmaa kenttä ja kuoren/vanhan rappauksen kenttä vierekkäin → kappelin erässä koko holvi yhdeksi kalkituksi ristiholviksi ja kävelyosan rappaus pois holvialueelta. PT: erä 3:n yötaso = porttikäytävä ajo4 / pikkupiha (LS2 mittaa kertoimen, skaalaan irradianssin ilman leivontaa) + Tottin vaakunakuva.
- **Pikkupiha ajo7 VALMIS** (`_valmiit/olavinlinna-pikkupiha-v1/ajo7/`, 61,5 k / 10,3 k): keittiön julkisivuverhous z 10,125 (v3f-mittojen mukaan; ovi + 2 ristikkoikkunaa auki), pihan leivonta → LS2 pp2-pelikuva. Auki: hiilipannu 14 cm verhouksen sisällä (siirto 0,2 m pihalle jos näkyy), sininen pala vasemmassa yläkulmassa. lahde/odota.zsh odottaa nyt myös muiden leivo.py-ajoja.
- **Erä 3 pal1** (LS2 lokit/todistus-pal1-20261013-0605): toimii HDR:llä, muisti 1058–1067 Mt (+~10 Mt), tuvasta 6 vanhaa pois; natiivin sisätilarajaus leikkasi ikkunasyvennykset → LS2 korjasi (9e6f87f75), pal2 jonossa. Valotaso pelissä (lin. mediaani): tupa 0,004, sali 0,009–0,019, pikkupiha 0,005–0,007, porttikäytävä pk2 0,041 → **sali ajo5b** (irr × 0,5, `palatsi-v1/lahde/sali_ajo5b.zsh`, ei leivontaa); porttikäytävän ja pikkupihan siirtymä mitataan pal2:ssa. pp2 ajo7 kuitattu (pannu ei näy seinän läpi). Vaakuna oikein. Myöhemmin: kuoren yläosan mustat palat pikkupihan yllä.
- **Erä 3 pal2/pal3 OK** (ikkunasyvennykset, vaakuna, sali ajo5b 0,0044–0,0082, muisti 1057–1070 Mt; LS2 koodi koehuonehaarassa 7b88c2751 + 19449982b, ei junaan). Porttikäytävä 5–7 × pikkupiha → PT:ltä kysytty suositus irr × 0,35 (≈ 2 × piha). Palatsiagentti: tupa ajo7 + sali ajo6 = porraskuilun ja tuvan takaovenpielen sinisten palatsi.glb-pintojen verhous.
- **PT 13.10. ~06.3x:** erä 3 kuitattu koehuoneeseen. Korjaukset: (1) **porttikäytävä ajo6b** (irr × 0,35, kerroin 1,414 → 0,495, `porttikaytava-v1/lahde/ajo6b.zsh`) → LS2 pk1-alku + siirtymäkuva PT:lle omistajan aamuun; (2) porraskuilun/takaovenpielen verhous + (3) Tottin vaakuna kivireliefiksi (leveä kivikehys, himmeät värit, lamppu lähelle) → palatsiagentti tupa ajo7 + sali ajo6 → LS2:n pelikuvat.
- **Porttikäytävä ajo6b pelissä** (LS2 pk6b): pk2 0,041 → 0,012 (≈ 2 × piha), mutta yläpään pieli 0,036 = reaaliaikainen valo:2 (voima 1,0, säde 4,5) leivotun päällä → **ajo6c** (valo:0–2 voima × 0,35, `porttikaytava-v1/lahde/valovoima.py` + `ajo6c.zsh`). HUOM kaikille tiloille: valo:-solmujen voima lisää leivotun päälle — skaalaa ne samalla kertoimella kuin irradianssi.
- **KORJAUS edelliseen:** valo:-solmut valaisevat pelissä VAIN reaaliaikaisia kohteita (esineet, hahmot; DioraamaValot.LisaaTyhja), eivät leivottuja tiloja (LS2 pk6c). Ajo6c:n 0,35 pidetään (esineet samaan tasoon), samoin salin × 0,5. Porttikäytävän yläpään pielen (0,035) piirtää jokin muu malli → LS2:n osuma-komento (os1) kertoo mallin/alimeshin.
- **Siirtymän hyppy = keittiön länsikulma** (LS2 os1: Tila:kavely:keittio-G102 vanha valoatlas, ajo7-verhouksen ulkopuolella). Porttikäytävä ajo6b/6c taso OK (pk2 0,012 ≈ 2 × piha) → käytetään **ajo6c**. Pikkupiha **ajo8** agentilla: verhous keittiön kulman ympäri + muut pihalta näkyvät keittio-G102-pinnat → LS2 siirtymäkuva b → PT.
- **Erä 3 täydennys:** linnantupa **ajo8** (kuilun alatasanne + askelmat 0–9 verhottu, pilasteri z −11,7 asti, oma ihralamppu; 78,3 k / 16,1 k) ja voudin-sali ajo7 (ylätasanne + askelmat 10–19, irr 0,707 + valo:-voima × 0,5, vaakuna v2). Kuoren leikkausjsonit `glb/<tila>-kuoren-leikkaus-v1.json` (kuori pisti kuiluun 159 kolm.) → natiiviin. Vaakuna v2 näytti yhä taulunkehykseltä → agentilla **sali ajo8** (tott-vaakuna-v3: paksu kulunut kivilaatta, kilpi reliefinä, himmeät maalijäänteet, sivuvalo). Sitten tupa ajo8 + sali ajo8 LS2:lle → PT. Botti kerran (kuilun verhous 2–2,5 cm kävelyn yllä).
- **Pikkupiha ajo8 VALMIS** (61,7 k / 10,4 k): keittiön vanhan laatikon (kavely/keittio-G102.glb) länsipääty, kaista, räystäs ja pielet verhottu, pääty porttikäytävän alimman lyhdyn valossa → LS2 siirtymäkuva b (ajo8 + porttikäytävä ajo6c) → PT. Kysytty LS2:lta: piirtyykö Tila:kavely:keittio-G102 koehuoneen keittiön kanssa (sisäseinät ja katto läpi) → piilotus natiivissa olisi varsinainen korjaus.
- **Siirtymä KUITATTU** (LS2 lokit/todistus-pp-ajo8-20261013-0758, PT:llä): pikkupiha **ajo8** + porttikäytävä **ajo6c** = lopulliset; kulma 0,0021, piha 0,0046, pk2 0,012, ei hyppyä; vanha keittio-G102 verhouksen takana. Kävelyosa piirtyy natiivissa vain ulkokuorena (37 kolm., sisätilalaatikko leikkaa), joten sitä ei voi piilottaa ennen kuin verhous kattaa katon. LS2 ajaa vielä osuman keittiön sisältä (läpipistoepäily).
