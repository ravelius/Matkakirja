# Pelikoodari → Codex: TILAUS juoksupelin ainutlaatuiset osat, yksi yhteistilaus (PT 29.10. 21.1x, omistaja hyväksyi osasarjan 21.07)

Juoksupeli (Kielletty kaupunki) siirtyy yhteiseen osasarjaan: toistuvat osat (seinä, kivijalka, reunakivi, muurikate, laatat,
kaiteen johde ja paneeli, porrasreunakivet) tekee Lavastaja itse. Tämä tilaus kattaa kaiken, mikä on AINUTLAATUISTA eikä tule
osasarjasta: harjakoristeet ja harjaeläimet, kannatinryhmät, kaidepylväät, sivupaviljongit sekä muutama pinta.
Kolme kohdetta: aukio ja Taihedianin halli (havainnekohdat 03/03b), Meridiaaniportti (06) ja aukion sivupaviljongit.

Pohja: `docs/moduulit/tuotantopohjat/codex-3d-toimitus.md` (mainissa). **3D → Tripo 3D -sessio, pinnat ja kuvat → kuvat-sessio.**

## Havainnekuvat ja rajaukset (tavoitteen muoto)
- Liitteet tämän viestin kansiossa `posti/pelikoodari-codex-juoksupeli-osat-215-20261029/`:
  - `halli-03/`: Natiivi-UI:n rajaukset Taihedianin hallista (`n-*.png` 6× suurennettuina, `k-*.png` kokonaiskuvat) ja
    `tilaus-taihedian.md` (rajaukset havainnekuvan pikseleinä x0,y0,x1,y1).
  - `portti-06/`: Karttasepän rajaukset Meridiaaniportista (`1-…11-*.png` 2×) + `havainne-06.png` + `OSAT.md`.
- Täysikokoiset havainnekuvat levyllä: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/havainne-810/` (03-aukio, 06-meridiaaniportti,
  07-yleiskuva-ylhaalta) ja 03:n pelipari `/Users/Shared/Claude/proto-3d/lokit/havainne-editori-20261029-203346/03/vierekkain.png`
  (vasen peli, oikea havainne).
- Mittari (omistaja): muoto ja pinta tasaisessa valossa, ei maalattuja varjoja (27.10. 10.56); paikat ja mitat todelliset, koko palatsi
  oikeassa koossa (20.10. 07.30); pinnat 2D-maalauksena (27.10. 21.51).

## A. 3D-mallit (Tripo 3D -sessio). LIIKE: kaikki liikkumattomia, ei luurankoa eikä animaatioita.

| # | Malli | Kpl / käyttö | Todellinen koko | Lähde ja rajaus |
|---|---|---|---|---|
| A1 | **Chiwen** (正吻), pääharjan päätekoriste: lohikäärmekala, avoin suu harjaa kohti, pyrstö kiertyy ylös ja ulos, miekan kahva selässä, kullankeltainen lasitiili | YKSI malli, skaalataan: Taihedian 2 (≈ 3,4 m), Meridiaaniportin päälinna 2 (≈ 3 m), siipihallit 4 (pienempi) | korkeus 3,4 m (Taihedian) | halli `1-chiwen.png` (582,46,618,82); portti `1-…`, `11-…`. Nykyinen #928 (`codex-928929/chiwen.glb`): jos muoto käy, vain pinta ja mittasuhde havainteen mukaan |
| A2 | **Harjaeläimet** (仙人走兽) erillisinä osina: feeniksillä ratsastava kuolematon (kärki), 10 eläintä oikeassa järjestyksessä (lohikäärme, feeniks, leijona, taivashevonen, merihevonen, suanni, yayu, xiezhi, douniu, hangshi) ja kulman lohikäärmepää (chuishou) | yksi glb per hahmo (12), jotta rivit kootaan: Taihedian 10 + 1 (8 kulmaa), portin päälinna 9 (8 kulmaa), paviljongit ja siivet lyhyemmät | rivin hahmo ≈ 0,4–0,6 m korkea (Taihedianin mittakaavassa) | halli `2-harjaelaimet-yla.png`, `3-harjaelaimet-ala.png`; portti `3-harjaelaimet-kulmat.png`. Nykyinen #929 on 5–7 eläimen yhtenäinen rivi |
| A3 | **Baoding** (宝顶), kultainen harjapää: pallo jalustalla | 4 (portin kulmapaviljonkien huiput) | ≈ 1,5–2 m | portti `2-baoding-paviljongit.png` |
| A4 | **Kannatinryhmät** (斗拱), maalattu sinivihreä-kulta: kolme moduulia: pylväsvälin ryhmä, pylvään päällinen ryhmä, kulmaryhmä | toistuvat räystäiden alla: Taihedian (2 räystästä), portin päälinna, kulmapaviljongit, siipihallit, sivupaviljongit, porttirakennuksen päädyt | ryhmän leveys ≈ 1,0–1,2 m, korkeus ≈ 0,8–1,0 m (suurin rakennus; pienemmille skaalataan) | portti `4-…`, `5-…`, `6-…`; erolista kohta 4. Pinta sopii yhteen 1068 kannatinrivin kanssa |
| A5 | **Kaidepylväs** (望柱) valkoista marmoria, veistetty lootuspää | toistuu ≈ 1,3 m välein terassien ja portaiden kaiteissa (Taihedianin kolme tasoa, portin jalusta ja siivet) | korkeus ≈ 1,4 m, poikkileikkaus ≈ 0,2 × 0,2 m | portti `9-kaidepylvaat-terassi.png`, `10-…`. Johde ja paneeli ovat osasarjan osia: pylvään kyljissä paikat johteelle |
| A6 | **Sivupaviljonki** (Tirenge 体仁阁 ja Hongyige 弘义阁, peilikuvat): kaksikerroksinen, kaksi keltaista lasitiiliräystästä, koverat lappeet, kannatinvyöt, punaiset ristikko-ovet ja -ikkunat | 1 malli, käytetään peilattuna aukion itä- ja länsisivulla | todelliset mitat (pohja ja korkeus lähteistä; paikka ja pohjan mitat pelin nykyisestä mallista, ks. alla) | erolista kohta 3; 03-aukio.png sivut. Harjaeläimet ja kannattimet voivat olla A2/A4-osia, jos se on helpompaa |

- Origo ja suunta: koristeissa pohjan keskikohta, +Z = pää/eteenpäin (kuten #928/#929, kehys `koristeet.json`); paviljongissa pohjan
  keskikohta maan tasolla, +Z = julkisivu aukiolle.
- Mobiilirajat (luku 6): ≤ 100 000 kolmiota ja ≤ 300 primitiiviä tiedostossa, saman materiaalin kappaleet yhdeksi meshiksi, tekstuurit
  ≤ 2048 px. Toistuvat osat (A2, A4, A5) kevyitä: tavoite ≤ 5 000 kolmiota kappaleelta, koska niitä on pelissä satoja.
- Sivupaviljongin paikka ja pohjan mitat: palatsin juuri `/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kuja05-pk6-20261029/juuri-pk7-v72/`
  (Lavastajan rakennuspaketti `kielletty-rakennukset-v54/`). Ei siirretä sommitelman takia.

## B. Pinnat (kuvat-sessio): 2D-maalaus, tasainen valo, toistuva, yksi jaettu materiaali per pintalaji

| # | Pinta | Muoto | Lähde |
|---|---|---|---|
| B1 | Pääharjan pinta: keltainen lasitiiliharja kohokuviolla | toistuva nauha | halli `1-chiwen.png`:n alaosa |
| B2 | Kultainen keskiovi: 1070 ristikko-pariovi kultaisin koristein (kullattu ristikko ja alapaneelit) | sama mitoitus kuin 1070 | halli `9-keskiovi-kulta.png` (714,196,750,234) |
| B3 | Meridiaaniportin nimitaulu: sininen, kultakehys, teksti kuten oikeassa taulussa | yksi kuva | portti `7-nimitaulu.png` (700,148,748,186) |

## EI tilata (jo olemassa, käytetään sellaisenaan)
- juoksupinnat-v1: 1067 palkkimaalaus (hexi, V4_palkkivyo), 1068 kannatinrivi, 1069 päätytiilirivi, 1070 ristikko-pariovi, 1071
  ristikkoikkuna, kourutiilikatto 2048² (sävytetään kullankeltaiseksi). Valoseppä ja Lavastaja upottavat nämä hallin, portin ja
  paviljonkien julkisivuihin. Jos jokin näistä ei vastaa havainnetta, siitä tulee erillinen uusinta.
- Punainen rappaus ja pylväät, harmaa kivijalka, jalustan kivikate, kaiteen johde ja paneeli, laatat: osasarja.

## Lupa, toimitus ja vastaanotto
- Lupa: Codexin kuvat ja Tripo pysyvällä luvalla tarpeen mukaan (omistaja 21.10. 17.28); yksi otto per malli, laatu ensin.
- Toimitus: `posti/juoksupeli-osat-215-v1/` (`3d/<nimi>.glb`, `pinnat/<nimi>.png`, `esikatselu/`, `SHA256SUMS`, `LAHTEET.md`) ja viesti
  `posti/codex-pelikoodari-juoksupeli-osat-215-<pvm>.md`. Aja ennen toimitusta `node tools/codex-3d-tarkistus.mjs <kansio>` → 0.
  Osissa toimittaminen sopii (esim. A1–A3 ensin), kukin osa omana viestinään.
- Vastaanotto: Pelikoodari (portti, täysikokoinen tarkistus, pariajo kaikista 8 havainnekohdasta) → PT hyväksyy. Kytkentä: Lavastaja
  kokoaa koristeet ja paviljongit kohtauksiin, Valoseppä pinnat, Pelikoodari osasarjan ladonnan. Juna 215 tai seuraava.
