# Siirtosepän luovutus 12.10.2026 aamu ~07.00 (Opus 5.5, high)

## ALOITUSVIESTI SEURAAJALLE

Olet Siirtoseppä (Opus, high). Lue tämä, CLAUDE.md ja Raamatun Ydinajatus kohta 2. Edellinen: viesti-siirtoseppa-luovutus-20261011-ilta2.md.
Linnahaara /Users/Shared/Claude/wt/proto-siirtoseppa-kello, haara **siirtoseppa/laituri-varoitus**, kärki **fa8fb26d1**
(= linnapaketti v48k c58921fcb9d82780 / nyky 0ed22c60646dbba2 + LS2:n keittiögrafiikka V3 + NS:n MetaHuman-materiaali 64ec7994f + botin korjaukset).
Pakettihaarat wt/proto-siirtoseppa-v47g: siirtoseppa/v47t … v48k (27c65bfc1 + nyky 13dd72d86). Kiinnitys: proto-3d/tyokalut/siirtoseppa-ajot/kiinnita-paketti.sh.
Olavinlinna junaan 183 (PT): **BOTTI 17/17 v48k:lla** (koostettu: täysi ajo 15/17 06.02 + uusinnat muuriportaat 06.24, sali 06.49; kaatumiset kuormaa).

## JATKOKOHTA
1. **LT:n 8. kierros** käynnistetty 06.57 (app proto-3d/lokit/olavinlinna-auto-1012-0645, A/B-osajako). Tulokset LT:ltä → löydökset korjattaviksi.
   Kun LT puhdas: **tunnus NS:lle** (linnahaara fa8fb26d1 / paketti c58921fcb9d82780) ja PT:lle.
2. PT: myöhemmät MH-erät (vain hahmoja) → botti 17/17 + pelikuvat, ei LT-kierrosta. Kuvat: skenaario mh-hahmot (poikki kavely katso <hahmo> 1.1 / 3.2).
   MH v2 -kuvat v48k: proto-3d/lokit/siirtoseppa-botti-v48k/mh-pelikuvat-v2/ (vartijoista ja vesipojasta puuttuu kasvokuva – partioivat).
3. Irralliset ajot: proto-3d/lokit/siirtoseppa-botti-<tunnus>/odota-ja-aja.sh (odottaa vahdin KÄÄNNÖS+VALMIS → botti A + B DBA3A288).

## YÖN OPIT
- Botin katseen kääntö kulkusuuntaan pitää palauttaa kuvan jälkeen (pysyvä kääntö toi jumin 55). Yksivärinen ruutu = vika vain silmä pinnassa
  (pisteet ja aloitus), musta aina. Kävelyraja 60 s (sali 72 ~34–39 s).
- Jumien juurisyyt olivat datassa: kaistaleveys < 0,9 m (NavMesh r 0,3), askelma 0,37 > 0,35 (16), holvi 2,2 m < kapselin 1,81 m + askel (55/61),
  näkyvä ilman törmäystä (harja). NavMesh-seinäkokeet (r 0,2 ja 0,3) heikensivät → pois. NavMesh: solu 0,05, korkeus 1,75.
- Perustaso 182:n v47f nykybotilla 7/17 (61 läpäisi v47f:llä → korjattu v48g/i).
- CC: height 1,75, radius 0,30, skin 0,03, step 0,35, slope 40.

## PÄIVITYS 12.10. ~11.15
- Linnahaara **95f30c4c3**, paketti **v48o** (siirtoseppa/v48o 5a3228a37, pala 3e5e938d7957d540 / nyky 33468a6d087b503f). BOTTI 17/17 yhdellä ajolla
  (käännös b03c72a06, app proto-3d/lokit/olavinlinna-auto-1012-1058). LT:n uusinta 3 käynnissä samalla appilla → puhdas = tunnus NS:lle + PT:lle.
- LT 8 (0/17) → korjaukset: aloitussuunta ≥ 4 m (681b5d212), pelaajan jatko samalla säännöllä (JatkonKohta), armo liikkeeseen asti, komero/pako sisään;
  REITTIPAIKKA (078b01dd7, 2290ae9d4, 06a83291d): aloitus/jatko reitin ensimmäiseen kohtaan eteen ≥ 4 m ja sivut ≥ 1 m, katse mitattuun suuntaan
  (ensiaskel-ehdolla), ei hahmon 1 m:n sisälle, kiipeilyn loppu reitille (komero → 94). Pako EI siirry (köysilasku komerosta; 6b5151e9f peruttu).
- Botin kävelyraja 120 s (napautuskävely hiipii, kun vartija ei partiossa). MH v3 -kuvat lokit/siirtoseppa-botti-v48l/mh-pelikuvat-v3/.
- Omistajan palaute 09.38: apulaisen asu outo ja vaatteet tiukkoja → LR korjaa (183 tavoite).
- UUSI SÄÄNTÖ (omistaja 12.10. 10.3x, Raamattu ASEMATAULU: VAATII TOIMIA, PR #4489): omistajan toimia vaativat asiat heti Asemataululle:
  ArtifactData set url https://claude.ai/artifact/Rq5ajPU4SraE2XKd7BYAix kokoelma "talo" doc_id "toimi-siirtoseppa" {rooli, kysymys, ts};
  epäonnistuessa Postivahdille "VAATII TOIMIA: Siirtoseppä: …"; hoidettuna dokumentti pois.
- SÄÄNTÖ (omistaja 12.10. 11.1x, sitova): omistajalle kuvat TÄYDELLÄ TARKKUUDELLA, yksittäin tai kuvapari nykyinen | uusi natiivikorkeudella;
  EI pienennettyjä monen ruudun arkkeja (PT:lle tarkistukseen saa). Merkintä isona alareunaan.

## PÄIVITYS 12.10. ~12.00 (PT:n korjauslista: EI 183:een ennen näitä)

- **a9705f172** linnahaaraan (tarkista.sh 0, Linssit 1540/1540 puhtaalla kopiolla): aloitus- ja jatkonäkymä keskialueen syvyys ≥ 4 m tai
  paras mahdollinen (24 suuntaa, `NakymaKorjaus`); botti hylkää "aloituksessa katsoo seinään". Köysilasku/ote-kiipeily: 6 s paikallaan →
  seuraava ote kimaltaa (valovihje, `PakotaKohteeseen`; teksti vaatisi UI-pohjan → PT:ltä). fd7ed85fe: kiipeily 1. persoonassa.
- Botti a9705f172 + v48o irrallisena: lokit/siirtoseppa-botti-nakyma/ (yhteenveto.txt). Vanha fp-odottaja lopetettu.
- Punaiset konsolirivit = Unityn "multisampled texture … non-multisampled sampler" (kartan ElavaKerros). Korjaus 8cffad7da vain juna 183:ssa
  (natiiviseppa/msaa-183), ei masterissa 182 → PT:lle ehdotettu vahdin listaan.
- Seuraavaksi: botti 17/17 → Julkaisijalta hiljainen ikkuna (ennakkoilmoitettu) → LT-uusinta → PT. LT:n menetelmä (napautuskävely, ovet, vedot) 184.
- Tarkistus puhtaalla kopiolla vaatii `git init -q` kopioon (Linssit-testit/kaanna.sh käyttää git rev-parsea).

## PÄIVITYS 12.10. 14.15: BOTTI 17/17 (669e31396 + v48p)

- Linnahaara **669e31396** (kaikki tarkistettu puhtaalla kopiolla): e15ac178e ahdas aloitus → reitillä ≥ 1,5 m; 4c7476569 botin takakuvavika vain
  kiipeilyssä (K3-kaukokuva ei vika); 41c6d58dc näkymäsuunta vain EnsiVika-turvallinen; 669e31396 kiipeilyn lopussa (komero, pako) ilman ensiaskelehtoa.
- Paketti **siirtoseppa/v48p fb151114c** (LR: väljät asut + kevennys, pala c09695d47f8023dc, nyky d157042efd7826d8), vahdissa v48o:n tilalla.
  MH-tarkistus: 11/11 hahmoa, puhe/ilmeet ok, muisti ~1344 Mt ennallaan (lokit/siirtoseppa-botti-v48p/mh-yhteenveto.txt).
- natiiviseppa/msaa-183 vahdissa → kehittäjäkonsolin MSAA-rivit 0.
- **LT-appi** lokit/olavinlinna-auto-1012-1346 → Julkaisija järjestää hiljaisen ikkunan. LT:n jälkeen tunnus NS:lle **junaan 184** (183 lähti ilman linnaa).
- PT: köysilaskun valovihje riittää, ei tekstikehotetta.

## PÄIVITYS 12.10. 18.3x (KÄYTTÖRAJA — seuraaja jatkaa tästä)

- Linnahaara kärki **21822a7ea** (kavely seis -testikomento, pään luu). Worktreessä **staged, EI committia**: ampumakäytävän kohteen
  näkyvyystarkistus, hahmot rajaavat näkymän syvyyttä (keittiön vartija), alaviistot säteet esineille (tott-kammion pöytä). Tarkistettu
  puhtaalla kopiolla (tarkista.sh 0, Linssit 1540/1540). Commit VASTA kun Julkaisija ilmoittaa MH-käännökset (21822a7ea + v48r ja + v48o) valmiiksi.
- MH-ajo odottaa: lokit/siirtoseppa-mh-omistaja/aja2.sh (irrallaan); käynnistyy, kun molemmat käännökset valmiit JA `touch lokit/siirtoseppa-mh-omistaja/lupa`
  (Julkaisijan SIMU NYT 2). Parit: scratchpad-skripti mh-parit.py (kopioi) → natiivikorkeus, JPEG 90 → itsetarkistus → PT/omistaja.
- Botti aeb2108de + v48r 16/17 (ampumakäytävä; korjaus staged). Askel 0 -arkki PT:llä (8/10 ok); uusi arkki commitin + botin jälkeen → PT kuittaa LT 5:n.
- Lyhty (4eccb3a27): varoitus 2,5 s + askeleet/narina + valopiiri + epäily 1,5 s + liiketapin korostus. Äänittäjältä tulossa lyhty-lahestyy.
- v48p fb151114c, v48r 78f2f37d3 kiinnitetty (vahdissa v48r). NUI:n kuulto-napit yhdistetty (3f178beb2).
- Botin askel kompensoi kuorman (DtMax 0,05 s, aeb2108de).

## PÄIVITYS 12.10. 19.1x

- Linnahaara **986f1b23e** (kaikki tarkistettu puhtaalla kopiolla): 167be0bfc näkymä (näkyvyys, hahmot, matalat esineet), c62e3727f katso v:<henkilö>,
  986f1b23e kohde reitin suunnassa + botin syvyys ilman liikkuvia hahmoja. Botti 986f1b23e + v48r odottaa (lokit/siirtoseppa-botti-nakyma, A+B peräkkäin 1 simulla).
- **ajo-botti-osat.sh** ajaa nyt todistusajon omasta linnahaaran työpuusta (TYOPUU; proto-natiiviseppa-tyokalut poistettiin).
- **MH-kuvat omistajalle**: PT ei vielä lähetä (LR v48s: kypärä, voudin hihat, kappalaisen asento). Vertailupuoli v48o = lokit/olavinlinna-mh-v48o-1012-1848
  (c62e3727f + v48o + msaa, säilytetty). Kun v48s viety: kiinnitä (kiinnita-paketti.sh v48s v48r …), Julkaisija vaihtaa vahtiin, sitten skenaario
  **mh-koko** (veneyö-soutaja + 10 hahmoa + istuva vartija, kavely seis 300) molemmilla apeilla rinnakkain (65 s väli) → mh-parit.py (raakakuvat, kuvat/raaka)
  → itsetarkistus → koko sarja PT:lle. 16 hyvää v48r-paria: lokit/siirtoseppa-mh-omistaja/omistajalle/ (vanhentuvat v48s:n myötä).
- Askel 0 -arkki: PT:llä 1729-versio (8/10); uusi arkki 986f1b23e-botista (scratchpad askel0-arkki.py).

## PÄIVITYS 12.10. 20.3x (uusi tili)

- BOTTI 17/17 986f1b23e + v48r (A 1934, B 1952; B uusittu, launchd_sim kaatui kuormassa). Askel 0 -arkki lokit/siirtoseppa-askel0/askel0-arkki-986f.jpg
  7/10: kirkkotorni ja tott-kammio = KÄDESSÄ OLEVA TARJOTIN peitti ruudun (ei pöytä), keittiö = partiovartija kävelee 0,7 m:n päähän.
- Linnahaara **34cdce650** (puhdas kopio 1540/1540): TarjotinSiirto + KantoHeti, SeikkailuVartijat.TulevaKatseessa (4 s), lyhty v2
  (aanet/olavinlinna-lyhty-v2/manifest.json). Kaikujen CC BY -nimeäminen webin lahteet.js:ään → PT.
- **v48s** siirtoseppa/v48s f8c27b0fe (pala c68f0392dff4ea5d, nyky 6a73746cefcb1d22), vahdissa. MH-appi lokit/olavinlinna-mh-v48s-1012-2005.
- Odottajat irrallaan: lokit/siirtoseppa-mh-omistaja/aja4.sh (`touch lupa4` = SIMU NYT 2) → kansiot4.txt → mh-parit.py <v48o> <v48s> <out> v48o v48s;
  lokit/siirtoseppa-botti-nakyma/odota-ja-aja.sh (34cdce650 + v48s, `touch lupa` = SIMU NYT 1) → yhteenveto.txt → uusi askel 0 -arkki → PT → LT 5.
- Tarkistusskripti: scratchpad tarkista-puhdas.sh <repo> <puu|commit> <kohde> (git write-tree indeksistä ennen committia).

## PÄIVITYS 12.10. 22.5x

- **Juna 184** sai linnan 34cdce650 + v48s f8c27b0fe + lyhty v2 (omistaja: testit TF:n jälkeen). BOTTI 17/17 34cdce650 + v48s, askel 0 -arkki 9/10.
- Linnahaara **9f41b0fcb** (junaan 186, kun koko botti läpi): d233a28bb vartijat-lokirivit, 6ec8a24e0 ReittiPaikka ohittaa partion pysähdyspisteen
  (< 0,8 m; keittiön aloitus → pelaaja-14, askel 0 puhdas, PT tarkisti), 9f41b0fcb katso v: näkyvään malliin (vartija2).
- **MH**: omistaja valitsi 22.4x UUDET ASUT (v48s); parit lokit/siirtoseppa-mh-omistaja/parit5/ (20). Seuraavaksi LR v48v (PT: t ja u ovat kappeli- ja salierä) → kiinnitä (kiinnita-paketti.sh v48v v48s …)
  → parit v48s2 (vahdin klooni 9f41b0fcb + v48s) | v48v + uusinnat soutaja ja vartija2 (mh-koko: odota 10 s veneessä).
- Odottaja lokit/siirtoseppa-botti-nakyma/odota-ja-aja.sh (9f41b0fcb + v48s, `touch lupa` = SIMU NYT 1) → yhteenveto.txt + askel0-arkki → PT + NS.
- Julkaisijan jono: TF 185 → NS → LS1 → vahti 9f41b0fcb; simut: LT 185 (60–90 min) → botti → MH.

## PÄIVITYS 12.10. 23.5x

- Linnahaara **4b9f577af** = 0c96d8f40 (omistaja: monivalinnoissa vain a-vaihtoehto) + merge master 0c68947bd (BUILD 184.1; sonniss-aanet-v6,
  PuuttuvatAanetTestit repliikit-lapi-v3). Puhdas kopio 1669/1669.
- Paketit: **v48t** 8fe620546 (kappeli, ihralamput; rekvisiitta 57), **v48u** b0847d347 (Kuninkaansali ilman kaappia/lippua, laattalattia,
  keittokulho; rekvisiitta 55, merkit 372). Vahdissa v48u.
- Odottaja lokit/siirtoseppa-botti-nakyma/odota-ja-aja.sh (4b9f577af + v48u, `touch lupa`) → botti A+B → skenaario v48t-kuvat (kappeli, lamput,
  partiot pimeässä, keittokulho, sali) → yhteenveto.txt (KUVAT-rivi) → askel 0 -arkki + kuvat PT:lle, NS:lle (186) ja LR:lle.
- LR:n v48v (asut) tulossa → kiinnitä v48u:n päälle → MH-parit v48s2 (lokit/olavinlinna-mh-v48s2-1012-2256) | v48v + soutaja + vartija2.

## PÄIVITYS 13.10. 01.1x

- PT kuittasi linnahaaran **cbad45ba9** junaan 186 (koodi). Paketti: **v48w** (LR: v48v + kierreportaiden valokorjaus) kun botti 17/17, varalla v48s.
  v48v 953be516b HYVÄKSYTTY (PT omistajan puolesta, parit6 → omistajalle aamulla).
- Botti 4b9f577af + v48u 15/17: muurikäytävä 86 ja harja 90 mustia (v48t:n ihralamput pimensivät leivotun valon) → LR v48w tulossa.
- Kun LR:n v48w-tunnukset tulevat: kiinnitä (kiinnita-paketti.sh v48w v48v …) → Julkaisija vaihtaa vahtiin → yksi simuvuoro: botti A+B (17/17 → PT + NS),
  skenaariot mh-tarkistus (vartija2 K3:n jälkeen, istuva vartija, vesipoika hetkillä 300/90/200: rintakaista varjo vai malli) ja v48tu-kuvat3
  (kulho tuvassa ja kädessä, kappelin holvi ja sivualttari taka-suunnasta).
- Uusi testikomento katso p:x,y,z [d] [taka] (cbad45ba9). Vartija2:n vika: siirto muurikäytävään käynnistää kaukokuvan K3.
- Porttikäytävän äänimaisema: Linssiseppä 2 kytkee (ei linnahaaraan), omistaja ei vielä kuunnellut.

## PÄIVITYS 13.10. 03.2x

- Paketit: v48w 401545643 (lamput 0,85/1,9), **v48x 1f6c43ec4** (pikkupihan lyhtytolppa pois, vesiportin katto, harjan trimmaus 90). Vahdissa v48x.
- Botti cbad45ba9 + v48w 15/17 (86, 90) → cbad45ba9 + v48x **16/17**: 90 korjaantui (vanhan dioraaman seinäpalat kameran edessä).
  Jäljellä muurikäytävä **86**: täysi ruutu (lokit/siirtoseppa-v48tu-kuvat/v48x-botti-86-ruutu.png) vasen kolmannes täysin musta → LR selvittää.
  186:n paketti auki: v48x kun 86 korjattu (tai PT:n päätös), varalla v48s.
- Vesipojan rintakaista = varjo (kolme valoa), ei mallia; LR vie pehmennyksen PT:lle. Vartija2: siirto muurikäytävään käynnistää K3:n (mh-tarkistus
  odottaa 12 s); vartija2-kuva yhä huono, istuva vartija ok.
- Skenaariot: botti-mustat (täysi ruutu botin saapuessa 86/90), mh-tarkistus, v48x-kappeli; odottajapohja lokit/siirtoseppa-botti-nakyma/odota-v48x.sh.

## PÄIVITYS 13.10. 05.0x — JUNA 186 KUITATTU

- **Olavinlinna junaan 186 (PT kuittasi 04.5x):** linnahaara **cbad45ba9** + paketti **siirtoseppa/v48z 87cd75e03** (pala f8dc4a8cddbb4245,
  esittely e63eed0f1149d99a; v48v-asut + kuuden tilan uudelleenleivonta). BOTTI 17/17 (olavinlinna-auto-1013-0427 abe73f861), askel 0 -arkki 10/10
  (lokit/siirtoseppa-askel0/askel0-arkki-cbad-v48z.jpg). NS:lle ilmoitettu.
- Piste 86 korjaantui (LR: v48t–x leivottu ilman fotogrammetriakuorta). Kappelin kuvat lokit/siirtoseppa-v48tu-kuvat/v48z-*.
- Seuraavaksi: LR:n laajennuserä 3 (linnantupa, Kuninkaansali) LR:n ja LS2:n tahdissa; vartija2-MH-kuva yhä auki (K3 + agentti/malli);
  porttikäytävän äänimaisema LS2:lla (omistaja ei vielä kuunnellut).

## PÄIVITYS 13.10. 06.2x

- **Juna 186: paketti v49a** (siirtoseppa/v49a 0429ee8b2, pala b8b9489b12ee5576, esittely 7264551e1a39e864) korvaa v48z:n PT:n ehdollisella
  kuittauksella: botti 17/17 cbad45ba9 + v49a (olavinlinna-auto-1013-0554) ja LS2:n holvikuva (todistus-kh2-20261013-0553). NS ja Julkaisija tietävät.
- Seuraavaksi LR:n erä 3 (linnantupa, Kuninkaansali; uudet lattiaesineet tarvitsevat glb-extras tormays/koko) → kiinnitys + botti.
- Odottajapohja: lokit/siirtoseppa-botti-nakyma/odota-v49a.sh (vaihda SHA:t sedillä, tarkista `zsh -n`).
