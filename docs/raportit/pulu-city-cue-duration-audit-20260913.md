# Pulun city-cue-kestoaudit 13.9.2026

## Tulos

Todennettu ongelma: `cityExplain` on kiinteä 6,2 sekunnin seinäkelloanimaatio, mutta `speechCueEnd` katkaisee sen sidecarin cue-ikkunan lopussa. 23 selityscuesta 22 päättyy ennen animaation omaa loppua ja 8 jo alle kolmessa sekunnissa. Lyhyessä cuessa Pulu ehtii vasta askelluksen ja osoituksen alkuun; paluu lepoasentoon tapahtuu katkaisuna.

Pause ja seek lopettavat nykyisen eleen ja jatko käynnistää kohdalle osuvan cuen alusta. `playbackRate` sovittaa cue-id:n uudelleen, mutta ei skaalaa eleen sisäistä vaihetta äänen kelloon.

## Lähde ja toistettavuus

- Tarkastettu head: `origin/main` / `460b4533b355265cc3d5fb0532a30db5e14b34c2` (v1829).
- Täydellinen 160 cuen tulos palautettiin aiemmasta paikallisesta read-only-auditista, jonka noutoaika oli `2026-09-13T05:28:56.355Z`. Uutta verkkohakua ei tehty tätä raporttia varten.
- Auditissa luettu cue-/mapping-sisältö oli commitissa `d3bd7060d50fdbee145e9d5659142740baffd567`; ydintiedostojen diff tähän v1829-headiin oli tyhjä.
- Kaikki 45 versionoitua sidecaria vastasivat alkuperäisessä auditissa; noutovirheitä 0.
- Alkuperäisiä sidecar-tavuja ei säilytetty eikä hajautettu. Siksi `contentSha256` on JSON-raportissa tarkoituksella `null`, ei arvio.

## Koonti

| Joukko | Cueita | <1 s | <2 s | <3 s | <6,2 s | =6,2 s | Min | Mediaani | Max |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Kaikki | 160 | 12 | 44 | 79 | 151 | 9 | 0,640 s | 3,040 s | 6,200 s |
| `cityExplain` / `selittaa` | 23 | 0 | 1 | 8 | 22 | 1 | 1,500 s | 3,240 s | 6,200 s |

## Edustavat selityscuet

| Luokka | Kaupunki | Cue | Aika äänitteessä | Kesto | 6,2 s radasta |
|---|---|---|---:|---:|---:|
| short | tromssa | tromssa.livia.c1 | 1000–2500 ms | 1,500 s | 24,2 % |
| medium | helsinki | helsinki.livia.c1 | 879–4119 ms | 3,240 s | 52,3 % |
| nearFull | granada | granada.livia.c1 | 1220–7139 ms | 5,919 s | 95,5 % |
| full | berliini | berliini.livia.c1 | 1019–7219 ms | 6,200 s | 100,0 % |

## Runtime-lähteet

- `js/livia-svg.js:13,50-57,101-111`: kiinteä 6,2 s rata ja sen askel-, osoitus-, avaus- ja paluuvaiheet.
- `js/livia-puheleet.js:39-101`: audio `currentTime` valitsee cuen; pause, seek ja cue-loppu päättävät eleen.
- `js/livia-eleet.js:279-306,381-388`: eleen vaihe etenee `performance.now()`-seinäkellolla ja cue-loppu palauttaa lepoon.
- `tests/livia-puheleet.test.mjs:31-49`: nykyinen testi vartioi cue-valintaa, ei eleen vaihe-synkkaa.

## Kaikki 45 sidecaria ja 160 cuea

Aikaväli on `alku–loppu` millisekunteina; merkitys on sidecarin `tarkoitus`.

| Kaupunki | Cueita | Cue · merkitys · aikaväli (kesto) | Lähde |
|---|---:|---|---|
| ateena | 4 | ateena.livia.c1 · selittaa · 1500–4199 ms (2699 ms)<br>ateena.livia.c3 · ilo · 4199–6699 ms (2500 ms)<br>ateena.livia.c4 · ilo · 6699–10439 ms (3740 ms)<br>ateena.livia.c5 · ilo · 10439–11679 ms (1240 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/0c684249bcbf/pulu-68f01fabb4a9d7ce6c2b/livia-ateena-3.eleet.json) |
| sarajevo | 4 | sarajevo.livia.c1 · selittaa · 1159–5299 ms (4140 ms)<br>sarajevo.livia.c3 · lammin · 5299–8399 ms (3100 ms)<br>sarajevo.livia.c4 · ilo · 8399–10779 ms (2380 ms)<br>sarajevo.livia.c5 · ilo · 10779–12179 ms (1400 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/0c684249bcbf/pulu-68f01fabb4a9d7ce6c2b/livia-sarajevo-3.eleet.json) |
| helsinki | 4 | helsinki.livia.c1 · selittaa · 879–4119 ms (3240 ms)<br>helsinki.livia.c2 · ilo · 4119–9420 ms (5301 ms)<br>helsinki.livia.c3 · hammentynyt · 9420–12420 ms (3000 ms)<br>helsinki.livia.c4 · miettiva · 12420–14000 ms (1580 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/0c684249bcbf/pulu-68f01fabb4a9d7ce6c2b/livia-helsinki-3.eleet.json) |
| tampere | 5 | tampere.livia.c1 · selittaa · 1259–4679 ms (3420 ms)<br>tampere.livia.c2 · ilo · 4679–7739 ms (3060 ms)<br>tampere.livia.c3 · hammentynyt · 7739–10479 ms (2740 ms)<br>tampere.livia.c4 · ilo · 10479–12039 ms (1560 ms)<br>tampere.livia.c5 · hammentynyt · 12039–12779 ms (740 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/0c684249bcbf/pulu-68f01fabb4a9d7ce6c2b/livia-tampere-3.eleet.json) |
| tallinna | 4 | tallinna.livia.c1 · selittaa · 799–4900 ms (4101 ms)<br>tallinna.livia.c2 · ilo · 4900–8179 ms (3279 ms)<br>tallinna.livia.c3 · lammin · 8179–12819 ms (4640 ms)<br>tallinna.livia.c4 · miettiva · 12819–13659 ms (840 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/0c684249bcbf/pulu-68f01fabb4a9d7ce6c2b/livia-tallinna-3.eleet.json) |
| riika | 4 | riika.livia.c1 · selittaa · 359–4659 ms (4300 ms)<br>riika.livia.c2 · ilo · 4659–7599 ms (2940 ms)<br>riika.livia.c3 · miettiva · 7599–13799 ms (6200 ms)<br>riika.livia.c4 · lammin · 14739–15559 ms (820 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/0c684249bcbf/pulu-68f01fabb4a9d7ce6c2b/livia-riika-3.eleet.json) |
| vilna | 5 | vilna.livia.c1 · selittaa · 1240–4139 ms (2899 ms)<br>vilna.livia.c2 · miettiva · 4139–9539 ms (5400 ms)<br>vilna.livia.c3 · hammentynyt · 9539–13559 ms (4020 ms)<br>vilna.livia.c4 · selittaa · 13559–15659 ms (2100 ms)<br>vilna.livia.c5 · ilo · 15659–16539 ms (880 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/0c684249bcbf/pulu-68f01fabb4a9d7ce6c2b/livia-vilna-3.eleet.json) |
| marseille | 4 | marseille.livia.c1 · selittaa · 519–3339 ms (2820 ms)<br>marseille.livia.c3 · lammin · 3339–7319 ms (3980 ms)<br>marseille.livia.c2 · ilo · 7319–9979 ms (2660 ms)<br>marseille.livia.c4 · miettiva · 9979–11119 ms (1140 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/0c684249bcbf/pulu-68f01fabb4a9d7ce6c2b/livia-marseille-3.eleet.json) |
| venetsia | 6 | venetsia.livia.c1 · selittaa · 819–4519 ms (3700 ms)<br>venetsia.livia.c5 · lammin · 4519–6719 ms (2200 ms)<br>venetsia.livia.c6 · rakkaus · 6719–10519 ms (3800 ms)<br>venetsia.livia.c2 · hammentynyt · 10519–13500 ms (2981 ms)<br>venetsia.livia.c3 · rakkaus · 13500–17020 ms (3520 ms)<br>venetsia.livia.c7 · hammentynyt · 17020–18199 ms (1179 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/0c684249bcbf/pulu-68f01fabb4a9d7ce6c2b/livia-venetsia-3.eleet.json) |
| tukholma | 3 | tukholma.livia.c1 · selittaa · 1279–4519 ms (3240 ms)<br>tukholma.livia.c2 · ilo · 4519–10719 ms (6200 ms)<br>tukholma.livia.c3 · ilo · 11819–13519 ms (1700 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/0c684249bcbf/pulu-68f01fabb4a9d7ce6c2b/livia-tukholma-3.eleet.json) |
| lappi | 5 | lappi.livia.c1 · ilo · 1220–4039 ms (2819 ms)<br>lappi.livia.c2 · ilo · 4039–6599 ms (2560 ms)<br>lappi.livia.c3 · hammentynyt · 6599–9939 ms (3340 ms)<br>lappi.livia.c4 · miettiva · 9939–13359 ms (3420 ms)<br>lappi.livia.c5 · hammentynyt · 13359–14639 ms (1280 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/4ac41585d691/pulu-c8223a43f6c9ab4c7102/livia-lappi-3.eleet.json) |
| tromssa | 5 | tromssa.livia.c1 · selittaa · 1000–2500 ms (1500 ms)<br>tromssa.livia.c2 · selittaa · 2500–8359 ms (5859 ms)<br>tromssa.livia.c3 · ilo · 8359–10840 ms (2481 ms)<br>tromssa.livia.c4 · hammentynyt · 10840–13880 ms (3040 ms)<br>tromssa.livia.c5 · miettiva · 13880–15559 ms (1679 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/4ac41585d691/pulu-c8223a43f6c9ab4c7102/livia-tromssa-3.eleet.json) |
| sofia | 3 | sofia.livia.c1 · myotailee · 1120–5539 ms (4419 ms)<br>sofia.livia.c2 · hammentynyt · 5539–8079 ms (2540 ms)<br>sofia.livia.c3 · huvittuu · 8079–10599 ms (2520 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-4c9887599f47a6c6f89f/livia-sofia-3.eleet.json) |
| istanbul | 3 | istanbul.livia.c1 · myotailee · 59–4279 ms (4220 ms)<br>istanbul.livia.c2 · huvittuu · 4279–9719 ms (5440 ms)<br>istanbul.livia.c3 · myotailee · 9719–11059 ms (1340 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-4c9887599f47a6c6f89f/livia-istanbul-3.eleet.json) |
| bukarest | 3 | bukarest.livia.c1 · myotailee · 959–6539 ms (5580 ms)<br>bukarest.livia.c2 · hammastyy · 6539–9399 ms (2860 ms)<br>bukarest.livia.c3 · huvittuu · 9399–10759 ms (1360 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-4c9887599f47a6c6f89f/livia-bukarest-3.eleet.json) |
| budapest | 3 | budapest.livia.c1 · hammastyy · 680–3220 ms (2540 ms)<br>budapest.livia.c2 · vakavoituu · 3220–9420 ms (6200 ms)<br>budapest.livia.c3 · huvittuu · 9719–10659 ms (940 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-4c9887599f47a6c6f89f/livia-budapest-3.eleet.json) |
| wien | 4 | wien.livia.c1 · miettiva · 99–5359 ms (5260 ms)<br>wien.livia.c2 · ilo · 5359–7960 ms (2601 ms)<br>wien.livia.c3 · miettiva · 7960–11800 ms (3840 ms)<br>wien.livia.c4 · lammin · 11800–13380 ms (1580 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-4c9887599f47a6c6f89f/livia-wien-3.eleet.json) |
| lontoo | 3 | lontoo.livia.c1 · myotailee · 99–5079 ms (4980 ms)<br>lontoo.livia.c2 · myotailee · 5079–10099 ms (5020 ms)<br>lontoo.livia.c3 · myotailee · 10099–11199 ms (1100 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-4c9887599f47a6c6f89f/livia-lontoo-3.eleet.json) |
| pariisi | 3 | pariisi.livia.c1 · myotailee · 1419–5679 ms (4260 ms)<br>pariisi.livia.c2 · myotailee · 5679–11119 ms (5440 ms)<br>pariisi.livia.c3 · huvittuu · 11119–13239 ms (2120 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-4c9887599f47a6c6f89f/livia-pariisi-3.eleet.json) |
| madrid | 3 | madrid.livia.c1 · selittaa · 1480–7259 ms (5779 ms)<br>madrid.livia.c2 · lammin · 7259–9519 ms (2260 ms)<br>madrid.livia.c3 · ilo · 9519–14880 ms (5361 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-4c9887599f47a6c6f89f/livia-madrid-3.eleet.json) |
| berliini | 5 | berliini.livia.c1 · selittaa · 1019–7219 ms (6200 ms)<br>berliini.livia.c2 · ilo · 8939–11319 ms (2380 ms)<br>berliini.livia.c3 · hammentynyt · 11319–15099 ms (3780 ms)<br>berliini.livia.c4 · miettiva · 15099–16659 ms (1560 ms)<br>berliini.livia.c5 · lammin · 16659–17619 ms (960 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-4c9887599f47a6c6f89f/livia-berliini-3.eleet.json) |
| rooma | 3 | rooma.livia.c1 · selittaa · 919–3639 ms (2720 ms)<br>rooma.livia.c2 · ilo · 3639–9839 ms (6200 ms)<br>rooma.livia.c3 · hammentynyt · 10039–11879 ms (1840 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-4c9887599f47a6c6f89f/livia-rooma-3.eleet.json) |
| praha | 5 | praha.livia.c1 · selittaa · 399–3299 ms (2900 ms)<br>praha.livia.c2 · ilo · 3299–7659 ms (4360 ms)<br>praha.livia.c3 · hammentynyt · 7659–10859 ms (3200 ms)<br>praha.livia.c4 · hammentynyt · 10859–12319 ms (1460 ms)<br>praha.livia.c5 · ilo · 12319–13019 ms (700 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-59c0127dcbec81ed4566/livia-praha-3.eleet.json) |
| dublin | 3 | dublin.livia.c1 · hammastyy · 3720–6980 ms (3260 ms)<br>dublin.livia.c2 · myotailee · 6980–9819 ms (2839 ms)<br>dublin.livia.c3 · huvittuu · 9819–12319 ms (2500 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-59c0127dcbec81ed4566/livia-dublin-3.eleet.json) |
| edinburgh | 3 | edinburgh.livia.c1 · hammastyy · 1179–5679 ms (4500 ms)<br>edinburgh.livia.c2 · huvittuu · 5679–10159 ms (4480 ms)<br>edinburgh.livia.c3 · huvittuu · 10159–11479 ms (1320 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-59c0127dcbec81ed4566/livia-edinburgh-3.eleet.json) |
| lissabon | 3 | lissabon.livia.c1 · selittaa · 119–4599 ms (4480 ms)<br>lissabon.livia.c2 · ilo · 4599–10799 ms (6200 ms)<br>lissabon.livia.c3 · huvittuu · 12259–13479 ms (1220 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-59c0127dcbec81ed4566/livia-lissabon-3.eleet.json) |
| barcelona | 3 | barcelona.livia.c1 · selittaa · 1839–4759 ms (2920 ms)<br>barcelona.livia.c2 · ilo · 4759–10959 ms (6200 ms)<br>barcelona.livia.c3 · ilo · 13739–17500 ms (3761 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-59c0127dcbec81ed4566/livia-barcelona-3.eleet.json) |
| sevilla | 3 | sevilla.livia.c1 · selittaa · 1419–4659 ms (3240 ms)<br>sevilla.livia.c2 · ilo · 4659–8920 ms (4261 ms)<br>sevilla.livia.c3 · hammentynyt · 8920–11399 ms (2479 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-59c0127dcbec81ed4566/livia-sevilla-3.eleet.json) |
| amsterdam | 3 | amsterdam.livia.c1 · myotailee · 239–5659 ms (5420 ms)<br>amsterdam.livia.c2 · myotailee · 5659–9139 ms (3480 ms)<br>amsterdam.livia.c3 · huvittuu · 9139–10800 ms (1661 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-59c0127dcbec81ed4566/livia-amsterdam-3.eleet.json) |
| dubrovnik | 3 | dubrovnik.livia.c1 · myotailee · 919–6619 ms (5700 ms)<br>dubrovnik.livia.c2 · hammastyy · 6619–9159 ms (2540 ms)<br>dubrovnik.livia.c3 · huvittuu · 9159–10139 ms (980 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-59c0127dcbec81ed4566/livia-dubrovnik-3.eleet.json) |
| bergen | 3 | bergen.livia.c1 · vakavoituu · 759–6000 ms (5241 ms)<br>bergen.livia.c2 · hammastyy · 6000–10939 ms (4939 ms)<br>bergen.livia.c3 · huvittuu · 10939–12119 ms (1180 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-59c0127dcbec81ed4566/livia-bergen-3.eleet.json) |
| kobenhavn | 3 | kobenhavn.livia.c1 · myotailee · 19–4139 ms (4120 ms)<br>kobenhavn.livia.c2 · huvittuu · 4139–10339 ms (6200 ms)<br>kobenhavn.livia.c3 · myotailee · 10559–11420 ms (861 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-59c0127dcbec81ed4566/livia-kobenhavn-3.eleet.json) |
| krakova | 3 | krakova.livia.c1 · hammastyy · 399–3099 ms (2700 ms)<br>krakova.livia.c2 · myotailee · 3099–9179 ms (6080 ms)<br>krakova.livia.c3 · huvittuu · 9179–10279 ms (1100 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-d3df5cd49362e0f6a952/livia-krakova-3.eleet.json) |
| varsova | 3 | varsova.livia.c1 · hammastyy · 99–2259 ms (2160 ms)<br>varsova.livia.c2 · vakavoituu · 2259–8459 ms (6200 ms)<br>varsova.livia.c3 · myotailee · 8539–10439 ms (1900 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-d3df5cd49362e0f6a952/livia-varsova-3.eleet.json) |
| pietari | 3 | pietari.livia.c1 · hammastyy · 1679–4739 ms (3060 ms)<br>pietari.livia.c2 · myotailee · 4739–8399 ms (3660 ms)<br>pietari.livia.c3 · huvittuu · 8399–9880 ms (1481 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-d3df5cd49362e0f6a952/livia-pietari-3.eleet.json) |
| moskova | 3 | moskova.livia.c1 · hammastyy · 1139–3879 ms (2740 ms)<br>moskova.livia.c2 · huvittuu · 3879–8359 ms (4480 ms)<br>moskova.livia.c3 · huvittuu · 8359–9359 ms (1000 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-d3df5cd49362e0f6a952/livia-moskova-3.eleet.json) |
| kiova | 3 | kiova.livia.c1 · hammastyy · 2980–5460 ms (2480 ms)<br>kiova.livia.c2 · myotailee · 5460–8439 ms (2979 ms)<br>kiova.livia.c3 · vakavoituu · 8439–9279 ms (840 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-d3df5cd49362e0f6a952/livia-kiova-3.eleet.json) |
| odessa | 3 | odessa.livia.c1 · vakavoituu · 1339–4779 ms (3440 ms)<br>odessa.livia.c2 · epailee · 4779–8519 ms (3740 ms)<br>odessa.livia.c3 · vakavoituu · 8519–9699 ms (1180 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-d3df5cd49362e0f6a952/livia-odessa-3.eleet.json) |
| kreeta | 3 | kreeta.livia.c1 · myotailee · 599–5599 ms (5000 ms)<br>kreeta.livia.c2 · huvittuu · 5599–9119 ms (3520 ms)<br>kreeta.livia.c3 · myotailee · 9119–10639 ms (1520 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-d3df5cd49362e0f6a952/livia-kreeta-3.eleet.json) |
| granada | 3 | granada.livia.c1 · selittaa · 1220–7139 ms (5919 ms)<br>granada.livia.c2 · hammastys · 7139–12559 ms (5420 ms)<br>granada.livia.c3 · ilo · 12559–14239 ms (1680 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-d3df5cd49362e0f6a952/livia-granada-3.eleet.json) |
| firenze | 4 | firenze.livia.c1 · selittaa · 479–4039 ms (3560 ms)<br>firenze.livia.c2 · ilo · 4039–8800 ms (4761 ms)<br>firenze.livia.c3 · hammentynyt · 8800–11059 ms (2259 ms)<br>firenze.livia.c4 · miettiva · 11059–11779 ms (720 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-d3df5cd49362e0f6a952/livia-firenze-3.eleet.json) |
| oslo | 3 | oslo.livia.c1 · myotailee · 79–5139 ms (5060 ms)<br>oslo.livia.c2 · hammentynyt · 5139–10539 ms (5400 ms)<br>oslo.livia.c3 · huvittuu · 10539–11779 ms (1240 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-d3df5cd49362e0f6a952/livia-oslo-3.eleet.json) |
| sisilia | 4 | sisilia.livia.c1 · selittaa · 2240–5440 ms (3200 ms)<br>sisilia.livia.c2 · ilo · 5440–9179 ms (3739 ms)<br>sisilia.livia.c3 · hammentynyt · 9179–10800 ms (1621 ms)<br>sisilia.livia.c4 · miettiva · 10800–11859 ms (1059 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-d93f186a007678c0aa11/livia-sisilia-3.eleet.json) |
| islanti | 3 | islanti.livia.c1 · hammastyy · 1139–5480 ms (4341 ms)<br>islanti.livia.c2 · myotailee · 5480–11259 ms (5779 ms)<br>islanti.livia.c3 · huvittuu · 11259–11899 ms (640 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-d93f186a007678c0aa11/livia-islanti-3.eleet.json) |
| alpit | 4 | alpit.livia.c1 · miettiva · 799–4299 ms (3500 ms)<br>alpit.livia.c2 · ilo · 4299–7899 ms (3600 ms)<br>alpit.livia.c3 · hammentynyt · 7899–11880 ms (3981 ms)<br>alpit.livia.c4 · miettiva · 11880–13460 ms (1580 ms) | [sidecar](https://media.matkakirja.app/aanet/pulu/versiot/31ae6dfacd1d/pulu-d93f186a007678c0aa11/livia-alpit-3.eleet.json) |
