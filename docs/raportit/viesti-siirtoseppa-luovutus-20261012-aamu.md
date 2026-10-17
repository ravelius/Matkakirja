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

## PÄIVITYS 13.10. 16.3x — LINNA TAUOLLE (omistaja 13.10. 09.2x)

- **Viisi tilaa junaan 187:** BOTTI 17/17 LS2:n appilla lokit/linssiseppa2-app-oletus3 (f11de1c12) = linnahaara cbad45ba9 + v49a 0429ee8b2 +
  LS2:n keittio-koehuone dd7fbb2cc (keittiö, porttikäytävä, pikkupiha ajo11b, linnantupa, voudin sali ämpäristä). Tunnus NS:lle 16.3x, PT tietää.
  (12.25 a666aa2d1 oli 15/17: E 102 -käytävä leivottu pimeäksi → LR/LS2 ajo11b.)
- Olavinlinna on nyt TAUOLLA: ei uusia eriä eikä ajoja ilman PT:n/omistajan erillistä päätöstä. Avoimena jää: vartija2:n MH-kuva (K3 + agentti),
  LR:n laajennuserä 3 (linnantupa/Kuninkaansali, uudet lattiaesineet tarvitsevat glb-extras tormays/koko), porttikäytävän äänimaisema (LS2).
- Odottajat: ei käynnissä. Pohjat lokit/siirtoseppa-botti-nakyma/odota-*.sh, skenaariot proto-3d/tyokalut/siirtoseppa-ajot/skenaariot/.

## PÄIVITYS 14.10. 02.0x — MUSEON PINNAT (linna yhä tauolla)

- Rijksmuseum-karttanappi: LS1 teki ja PT kuittasi (linssiseppa/museo-kartta-189 8e9480624); minulta ei tarvittu.
- **Museon kehysten pinnat + rae** (omistaja 14.10. 00.4x PT:n kautta): proto-haara **siirtoseppa/museo-pinnat-189 82b899a05**
  (worktree /Users/Shared/Claude/wt/proto-siirtoseppa-pinnat; juna-189 + LS1 museo-maa-188). MuseoValaistu _Pinta (kehys: syy pituussuuntaan,
  taso: paspartuu) + _Rae (teokset 0), MuseoRakennus.AsetaPinnat (Rae 0,3), QA "museo pinnat 0|1 [rae]". Tekstuurit Resources/Museo/pinnat (ambientCG CC0).
  Käännös 08802f92e, arkit lokit/siirtoseppa-museo-pinnat/pinnat-{ipad,iphone}.jpg → PT:llä kuittausta varten; kuittauksen jälkeen tunnus NS:lle (juna 189).
- Ajot: tyokalut/siirtoseppa-ajot/ajo-museo-pinnat.zsh (kaannos-pinnat.nyt / simu-pinnat.nyt), skenaariot museo-pinnat-{ipad,iphone}.txt, museo-rae-ipad.txt;
  arkit pinnat-arkki2.py. iPhonella näyttely valitaan "Grafiikka- ja valokuvakabinetti" (Kunniagalleria ei ruudulla pystyssä).
- Avoin: kuorma oikealla iPadilla mittaamatta (ehdotettu junan 189 iPad-ajoon "museo pinnat 0/1").

## PÄIVITYS 14.10. 20.5x — RAKETIN VASTAVALO (juna 191)

- Museon pinnat junassa 189 (NS 0201428dd: rae leikataan 1:een HDR-polulla, kalibrointi pätee).
- **Raketin irtoamisen siluetti** (PT, ent. Valosepän kohta 4): proto-haara **siirtoseppa/raketti-valo-191 e823b3bf2** (juna-190 pohja, worktree
  wt/proto-siirtoseppa-raketti): RakettiMalli.Valaistus → heitin-kanavaan VastavaloTaytto 0,35 kun aurinko–kamera 100°→150°, aurinko näkyy, ilma ohut;
  QA "linssi raketti vastavalo <x>". Käännös 7c79a469b. NYK|UUSI lokit/siirtoseppa-raketti-valo/raketti-nyk-uusi.jpg → PT:llä kuittausta varten; sitten tunnus NS:lle.
- Ajo tyokalut/siirtoseppa-ajot/ajo-raketti-valo.zsh (OHITA_KAANNOS=1, LENNOT="0 0.35"; yksi lento per käynnistys — Cupolan latausruutu ei lue komentoja
  lennon jälkeen; mykistys peli-komento.txt:hen ennen käynnistystä; kello siirretään 14.10. 13.52 UTC:hen).
- Viestit session id:llä /Users/Shared/Claude/osoitekirja.md; PT local_74630a27…; simu vain Julkaisijan SIMU NYT -lipulla (ei uusintaa samalla vuorolla ilman lupaa).

## PÄIVITYS 15.10. 01.0x — LEVYSIIVOUS (Julkaisija, PT hyväksyi)

- Raketin vastavalo KUITATTU ja tunnus NS:lle junaan 191 (e823b3bf2).
- Kaikki proto-worktreeni poistettu (wt/proto-siirtoseppa-kello, -v47g, -pinnat, -raketti; puhtaita, masterissa). Haarat jäävät:
  linnahaara siirtoseppa/laituri-varoitus cbad45ba9, paketit siirtoseppa/v47t…v49a. Linnan jatkuessa luo työpuu uudelleen:
  `git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto worktree add /Users/Shared/Claude/wt/proto-siirtoseppa-kello siirtoseppa/laituri-varoitus`
  (ajo-botti-osat.sh TYOPUU ja kiinnita-paketti.sh odottavat näitä polkuja; pakettipuu …-v47g haaralle siirtoseppa/v49a).

## PÄIVITYS 15.10. 16.1x — KOLMEN KIERROKSEN HIONTA (PT kuittasi)

- PT:n erä (omistaja 16.02: Lontoon, Prahan ja Ateenan kierrosten hionta): EI simuajoa (omistajan 09.36 "Ei testejä junaan"). Tulos: 0 jumia.
  Linssit-testit 51540404d:llä 13/13 (KokoKierrosKaikkiPysahdykset: kaikki kolme 8/8 + loppu, 547–586 s); Pelikoodarin ajoloki
  lokit/todistus-pallot-pelaajille-194-20261015-1513 (Praha + Ateena aloitus → 8/8 → loppu, 0 poikkeusta). "ääni ei" saapui-rivillä = kerronta alkaa saapuessa, ei vika.
- AVOIN, odottaa omistajan vastausta PT:n kautta → junaan 195: automaattinen paluu kartalle ~3 s loppuäänen jälkeen. Nyt pelaaja jää
  kiertävään yleiskuvaan (vain ☰ → Poistu linssistä). Toteutus: OpasSovitin.Pallokierros.cs PalloLoppu, "pallokierros päättyi" -rivin jälkeen
  odotus → jos Ok() eikä tauolla / pelaajan toimea → LinssiOhjain.Rekisteri?.Sulje() (sama kuin LinssiUi.SuljeLinssi / QA `linssi linssi pois`);
  AsetaKaupunkitila(null) hoitaa paluukuvan. Testi Ydin-tasolle, jos ehto on puhdasta logiikkaa.

## PÄIVITYS 15.10. 16.2x — OMISTAJAN PÄÄTÖS 16.21 (loki e41fe420c): KIERROKSEN LOPPU → PULU + VAPAA LENTO (junaan 195)

- EI automaattista paluuta kartalle (edellisen päivityksen suunnitelma KUMOTTU). Kertojan loppusanojen jälkeen Pulu kertoo äänellä, että nyt saa
  lentää itse ja kysyä rakennuksista, ja vapaan lennon ohjaimet tulevat esiin. MINUN osani = tämä siirtymä, PARIISI ENSIN. Aloitus vasta kun juna 194 on TF:ssä.
- Ei minun: "Mikä tämä on?" -nappi ja Pulun vastaus = Pelikoodari; Pulun kutsurepliikki = Sisältökirjuri (äänisivun Tekstit-osasto, omistaja hyväksyy ennen äänitystä).
- Lähtökohdat: OpasSovitin.Pallokierros.cs PalloLoppu ("pallokierros päättyi") → OpasSovitin.AloitaVapaaLento() (VapaaLentoKaytettavissa; sama kuin
  OpasValikko vapaaNappi); Pulun ääni klippiavaimella, joka toimii ilman ääntä (repliikki tulee SK:lta myöhemmin). Pariisi ei ole Pallokierros.Kaupungit-listassa
  (praha, lontoo, koopenhamina, ateena) → selvitä ensin Pariisin kierroksen loppu (yleinen opas-esitys / kippi).

## PÄIVITYS 15.10. 16.5x — VAPAA LENTO KIERROKSEN JÄLKEEN TEHTY (juna 195, odottaa PT:n kuittausta)

- Proto-haara **siirtoseppa/vapaalento-195 2468450eb** (BUILD 194 b110dff52 päällä; worktree /Users/Shared/Claude/wt/proto-siirtoseppa-vapaalento).
  Ydin OpasSilmukka.KierrosLoppuun / VapaaLentoLopussaKaytettavissa / AloitaVapaaLentoLopussa; Unity OpasSovitin.VapaaLentoKutsu.cs
  (kutsut kaupungeittain, nyt vain pariisi → aanet/pulu/vapaalento-v1/livia-kutsu-pariisi.mp3; pallokierroksella palloPaattyi-ehto).
  Testit VapaaLentoLopussaTestit 3/3, Linssit 1862/1862, tarkista.sh 0. Kuittauksen jälkeen SHA Natiivisepälle junaan 195.
- Uusi kaupunki: lisää rivi VapaaLentoKutsut-sanakirjaan, kun SK:n teksti on hyväksytty ja Äänittäjä vienyt äänen.
- PK:lle kerrottu kytkentä: "Mikä tämä on?" -nappi näkyy jo vapaassa tilassa (OpasSovitin.VapaaTila); Pulun kutsu Aanet.Soita(Puhe).

## PÄIVITYS 15.10. 19.5x — NOLLAUS (PT + Postivahti, konteksti 36–40 %): ISS:N PARAS HETKI KESKEN

1. **ISS-kohdevalikon paras hetki** (OMISTAJAN PYYNTÖ 19.31; toimeksianto /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/
   iss-paras-hetki-20261015.md, lue kokonaan): proto-haara **siirtoseppa/iss-paras-hetki-196 83229986b** (junan 195 a0a280fd6 päällä; worktree
   /Users/Shared/Claude/wt/proto-siirtoseppa-iss-hetki). Kytkin Iss.IssParasHetki.Kaytossa = false (QA `ui linssi kohdevalikko hetki 1|0`,
   `ui linssi kohdevalikko taivas lappi|pohjois-norja|etelainen-valtameri`, `... kohde <tunnus>`).
   - Data Resources/IssParasHetki/hetket.json (239: 236 kohdetta + 3 taivasta), tuotto `python3 tyokalut/iss_paras_hetki.py <verkkorepon js/linssit/satelliitti-data.js>`
     (säännöt: yökuva talvi-ilta 22.00, revontulet 5.10. 01.00 / etelä 21.6. 00.00, päivä kesä 13.00, tropiikki kuiva kausi 12.00, aavikot talvi 10.00 + nimetyt poikkeukset).
   - Toiminta: valinta → kello KelaaHetkeen(hetki, lähin vuosi), LIVE pois, KupolinValinta.Kausi/Vuorokausi hetkestä; perillä SiirraAlus (Cupolan katse kohteeseen kuten Oma sijainti).
   - **paikat.json: 10 Natural Earth -aikavyöhykevirhettä korjattu** (Praha oli America/Chicago, Cardiff Australia/Sydney, Lagos Europe/Athens, Colombo, Macau,
     Asunción, Bridgetown, George Town, Castries, Tripoli LBN) → myös LCD:n paikallinen kello korjaantuu. Kerro PT:lle rivinä (muiden alue: LS2:n iss_paikat.py).
   - Testit: IssParasHetkiTestit 4/4, tarkista.sh 0. Koko Linssit-sarja 83229986b:llä **1883/1883 läpi** (19.5x).
   - JÄLJELLÄ: (b) KÄÄNNÖS NYT + SIMU NYT Julkaisijalta (local_5cb16c00…) haaralle (c) kuvapari omistajalle (omistajan pyytämä, poikkeus "ei testejä"):
     skenaario /Users/Shared/Claude/proto-3d/tyokalut/siirtoseppa-ajot/skenaariot/sk-iss-paras-hetki-196.txt (Lappi + Pariisi, nykyinen | paras), todistusajo.sh
     (/Users/Shared/Claude/wt/proto-natiiviseppa-tyokalut/tyokalut/todistusajo/todistusajo.sh, malli tyokalut/pelikoodari-ajot/ajo-pallot-pelaajille-194.zsh) →
     NYK|PARAS-parit itse tarkistettuina täydellä tarkkuudella PT:lle (d) kerro NUI:lle (IssKohdevalikko: LennaTaivaalle-alku + Testaa hetki/taivas) ja PK:lle
     (AstronauttiLinssi.LennaParhaaseenHetkeen, PaivitaKyyti ParasHetki → SiirraAlus) (e) SHA PT:lle → junaan 196.
2. **Vapaan lennon kutsut Lontoo/Praha/Ateena**: SK:n tekstit omistajan hyväksyttävinä (pulu-vapaalento-kutsu-*); kun ämpärissä on
   aanet/pulu/vapaalento-v1/livia-kutsu-{lontoo,praha,ateena}.mp3 (curl -I = 200): lisää rivit OpasSovitin.VapaaLentoKutsu.cs:n VapaaLentoKutsut-sanakirjaan
   (haara siirtoseppa/vapaalento-195 2468450eb tai uusi juna-195/196:n päälle) → tarkista.sh + Linssit → SHA PT:lle. Taustaodottaja kuoli nollauksessa.

## PÄIVITYS 15.10. 21.3x — NOLLAUS (Postivahti, kova raja 35 %): ISS PARAS HETKI JUNASSA, KOHOKOHTIEN KUVAT KESKEN

**Valmiit (NS:llä junaan 196):** siirtoseppa/iss-ilmiot-196 **e68ee684f** (= paras hetki -haara b3653fa5c, oletus PÄÄLLÄ omistaja 20.42,
LCD pelkkä nimi, Live piiloon + ilmiöt + kohokohtien data). Uudempi kärki **e776bb186** (vielä NS:lle kertomatta, mukaan seuraavassa SHA:ssa):
- KS:n ilmiot.json (9 hetkeä, avaimet ilmio.*, utc = kiinteä hetki → sama päivä+UTC lähimpänä vuonna), Valosepän tavoitekuva-ajat d570f435e
- Kohokohdat (omistaja 20.27): Resources/IssParasHetki/kohokohdat.json + Ydin Iss.IssKohokohdat (Kaytossa=false, Nakyvat, Ehto(nimi,func), Valitse→Valittu);
  NUI tekee kortit (nimet-196), PK kysymykset chattiin, Valoseppä ehdot (tulivuoret rekisteröity). QA `ui linssi kohdevalikko paras <hetkiavain>` 1567458e0.
- Valitun paikan nimi korostuu: KupoliNimet.Valittu (Linssisepän koodi cherry-pick f9bebf5d4 = dd7fc0b3f; QA-rivi valittu tulee LS:n haarasta) asetetaan
  AstronauttiKerros.Valinnalla, null KupoliLive/PalaaIssNyt (c788f6dc9, 70883ee13). Toimii (kuva 21.29: Pariisi kirkas, muut 0,3).
- e776bb186 = NUI:n c9774e32b cherry-pick (korttikuvien URL:t revontulet + kiinan-muuri). Haara yhdistyy puhtaasti: nimet-196, yotaivas-196-juna, 1cefa0f9b.
- Vapaan lennon kutsut Lontoo/Praha/Ateena: siirtoseppa/vapaalento-195 **473d566ca** → NS runkoon 195, PT kuittasi.

**KESKEN (seuraaja jatkaa):**
1. **Uusinta-simuajo käynnissä 21.32** (Julkaisijan SIMU NYT 8362879F, käännös 673c030b2 = 70883ee13+1cefa0f9b): odottaja pid 43696,
   loki proto-3d/lokit/siirtoseppa-kohokohta2-196.log, skenaario tyokalut/siirtoseppa-ajot/skenaariot/sk-kohokohta2-196.txt → todistus-kohokohta2-196-*.
   **AJO VALMIS 21.38, SIMU VAPAA ilmoitettu** (todistus lokit/todistus-kohokohta2-196-20261015-2132, kuvat tarkistamatta). Seuraavaksi:
   a) **Auringonnousun korttikuva** (PT 20.4x): kuvat k0/k60/k120/km60/k90 (katse 8° alas, suunta = poikkeama maajäljestä). Ajossa 21.29 aurinkoa ei
      näkynyt (katse pohjoiseen). Jos ei näy nyt: hetkeä aikaisemmaksi (asemalta aurinko limbillä kun maassa ~−15…−20°) → laji "aamu"-sääntö
      (−2…15°) estää; tarvitsee esim. lajin "aamunkoitto" testisääntöineen. Kortti JPG 960×640 3:2, aihe keskellä (NUI) → vientipaketti
      _valmiit/iss-kohokohta-auringonnousu-vienti-20261015/kuvat/iss/kohokohta-auringonnousu.jpg (SHA256SUMS, LAHTEET.md) → Julkaisija vie-paketti.sh
      → kohokohdat.json "kuva" = https://media.matkakirja.app/kuvat/iss/kohokohta-auringonnousu.jpg → SHA NUI:lle + NS:lle.
   b) **Pariisi-pari** nimikorostuksella (a2/b2, revontulet oletus): pari iss-hetki-parit.py-tyylillä → omistajalle/iss-paras-hetki-pariisi.jpg → PT.
2. **Lappi-pari** revontulet v6 (kp5) ajosta lokit/todistus-kohokohta-lappi-196-20261015-2122 → PT:lle vasta Valosepän v7:n jälkeen (ei omistajalle).
3. Ajoskripti tyokalut/siirtoseppa-ajot/ajo-iss-paras-hetki-196.zsh: KH (proto-kaanna-arg, a+b), H, ERA, SK, OHITA_KAANNOS ympäristöstä; porttitiedostot
   kaannos-iss-hetki.nyt / simu-iss-hetki.nyt (vain Julkaisijan NYT-viestillä). Worktreet wt/proto-siirtoseppa-{iss-hetki,ilmiot,vapaalento}.


## PÄIVITYS 15.10. 21.4x — PARIISI-PARI VALMIS, AURINGONNOUSU ODOTTAA PT:N PÄÄTÖSTÄ

- Pariisi-pari (nimikorostus) lokit/siirtoseppa-iss-paras-hetki/omistajalle/iss-paras-hetki-pariisi-v2.jpg → PT:llä.
- Auringonnousu: ajossa 21.32 ei aurinkoa (1) hetki oli maan nousu 06.30 → korjattu aseman nousuun 03.28, laji "nousu"
  **73c4aa0a8** (siirtoseppa/iss-ilmiot-196; NS:lle vielä kertomatta, mukaan seuraavassa SHA:ssa) (2) Cupolassa ei piirretä aurinkoa
  (KyydinTaivas: vain kuvaputkessa). PT:ltä kysytty: kiekko Cupolaan (Valoseppä)? Sitten yksi simuajo → kortti 960×640 → vienti.
  Yksityiskohdat lokit/siirtoseppa-iss-paras-hetki/KOHOKOHTA-NOUSU.md.

## PÄIVITYS 15.10. 23.3x — AURINKO NOUSEE CUPOLASSA: NS:LLÄ JUNAAN 196 (siirtoseppa/iss-nousu-196 21f52356f = a4e218839 + 240357565)

- PT 22.3x: korttiin jää Linssisepän NASA-kuva; minun osani = kohokohta vie hetkeen, jossa aurinko todella nousee Cupolassa.
- **siirtoseppa/iss-ilmiot-196 a4e218839** (e776bb186 + 73c4aa0a8 + bae6eee4c + a4e218839): laji "nousu", hetki 21.3. klo 04.33,
  perillä AstronauttiLinssi.KatseAurinkoon (katse oletuskulmaan auringon atsimuuttiin ennen SiirraAlusta → alus ~650 km kohteesta poispäin
  auringosta). Testit IssParasHetki 6/6, Astronautti/Kupoli/IssKyyti/Cupola läpi, tarkista.sh 0.
- Tarvitsee Valosepän kiekon linssiseppa2/aurinko-196 240357565; yhdistelmä + ristiriitojen ratkaisu: siirtoseppa/nousu-kortti-196 085fac1a9.
  Ajo todistus-kohokohta5-196-20261015-2321 (c312aba15): kuvapari omistajalle/iss-kohokohta-auringonnousu-cupola.jpg → PT:llä.
- Opit: asema seisoo ~650 km kohteen takana (Cupolan katse kohteeseen), radan suunta riippuu hetkestä (03.28 koilliseen, 04.18 kaakkoon);
  ISS-kameran kuvaputki piirtää nousun aina, live-Cupola vasta kiekon kanssa. Valoseppä voi säätää kiekon kirkkautta (16).

## PÄIVITYS 16.10. 00.20 — NOLLAUS (Postivahti, kova raja 36 %): MERINIMET NOSTOINA KESKEN (seuraaja jatkaa tästä)

**Valmis:** auringonnousu junassa 196 (siirtoseppa/iss-nousu-196 21f52356f NS:llä, PT kuittasi). Pelikoodarin d0164dd0d (kohokohdat.json
kysymykset) yhdistyy puhtaasti.

**KESKEN: MERINIMET NOSTOINA** (SEURAAJAN ENSIMMÄINEN ERÄ; PT, OMISTAJAN PYYNTÖ 15.10. 23.56, loki 04964505b, "merien nimet pitäisi olla klikattavia nostoja"; VAIN EUROOPPA, kytkin, juna 196,
kuva iPhone + Mac PT:lle; SK luonnostelee Pulun kysymykset rinnalla – älä odota):
- Proto-haara **siirtoseppa/meri-nostot-196 d7d4a89eb** (BUILD 195 master 64e1efcd1; worktree /Users/Shared/Claude/wt/proto-siirtoseppa-meri).
  Nimikerros.MeriOsuma (näkyvän merinimen laatikko + 8 pt) → NostoKerros.MeriNosto (NostoSaannot.MeriVastaa + OnEuroopanMeri, lähin) →
  UiPalvelut.IlmoitaValo → olemassa oleva Nostokortti (NostotKartalla.MeriNapautus kuuntelee PalloKierto.Napautettu). Kytkin
  NostoKerros.MeriNostot (oletus pois); komento `nostot meri 0|1|tila|napauta <id>`. Meri-nostoa ei piirretä merkiksi (Syy.Meri ennallaan).
  Testit Kartta-testit NostoSaannot 19/19, Peli-testit 2/2, unity-tarkistus 0, tarkista.sh 0.
- Sisältö v751: 18 merinimeä saa noston; ILMAN nostoa 11 (englannin-kanaali, riianlahti, kattegat, skagerrak, vienanmeri, keltienmeri,
  lioninlahti, bosporinsalmi, dardanellit, gibraltarinsalmi, juutinrauma) + valtameret → kerro PT:lle (sisältöaukko, SK/web).
- **iPhone-ajo odottaa**: odottaja pid 65296 (tyokalut/siirtoseppa-ajot/ajo-meri-nostot-196.zsh, loki lokit/siirtoseppa-meri-nostot-196.log,
  skenaario skenaariot/sk-meri-nostot-196.txt, siirtoseppa-iPhone 95EEDB48), liput kaannos-meri.nyt + simu-meri.nyt Julkaisijalta (pyydetty 00.0x).
  Valmis → kuvat m0–m3 tarkista (merinimi suomenlahti/tyrrhenanmeri → kortti), SIMU VAPAA Julkaisijalle, kuvat PT:lle.
- **Mac-kuva**: Julkaisijalta kysytty lupa mac-kaanna.sh d7d4a89eb + appi ikkunassa (malli tyokalut/linssiseppa-ajot/mac-merkit.sh, idle-tarkistus).
- PT:n kuittauksen jälkeen SHA NS:lle junaan 196.
- Julkaisija 00.2x: iPhone-liput (kaannos-meri.nyt + simu-meri.nyt) ANNETTU → odottaja 65296 kääntää ja ajaa itse; seuraaja tarkistaa lokin.
  **Mac LUVALLA**: `mac-kaanna.sh d7d4a89eb` vasta iOS-käännöksen jälkeen (L2-lukko, levy > 22 Gi), appi ikkunassa ~5 min vain kun
  omistaja idle ≥ 10 min (ioreg HIDIdleTime), sulje appi heti. Julkaisijalle: SIMU VAPAA + Mac valmis.

## PÄIVITYS 16.10. 00.5x — PULUN 81 MERIVASTAUSTA KYTKETTY (PT 00.4x, omistaja 00.40, loki 83bc3b855)

- **siirtoseppa/meri-nostot-196 f7ffbff4d** (= d7d4a89eb + merge natiiviseppa/juna-196 d3d2b9f98 + merivastaukset): Peli/PuluMeriVastaukset
  (data UI/Resources/PuluMeri/vastaukset.json, tuotto `python3 tyokalut/meri_pulu_vastaukset.py <verkkorepo> --ref origin/main`; tarkistaa kysymykset
  korteista), PuluChat.MeriVastaukset (Kysy-polussa ennen pakettia/workeria: teksti + otto, jatkot saman kortin kysymättömät; kytkin päällä;
  QA `ui chat meri [0|1|kysymys]`). Peli-testit 4/4, unity-tarkistus 0, tarkista.sh ok.
- Äänet: aanet/pulu/meri-v1/pulu-meri-NN.mp3, NN = raportin "### N." (Äänittäjä 00.5x; 79 = kopio 77:n otosta).
  Kun ämpärissä (curl -I 200) → kerro PT:lle; vastaukset 82–103 (11 uutta merinostoa) vaativat omistajan uuden luvan.
- iOS-käännös vaihdettu f7ffbff4d:aan: odottaja pid 41221 (H=f7ffbff4d), skenaarioon lisätty m2b (ui chat meri). Mac-skripti
  tyokalut/siirtoseppa-ajot/mac-meri-nostot-196.sh <.app> <kansio> (idle ≥ 600 s, mac-kaanna.sh f7ffbff4d PROTO_LINJA=2 iOS-käännöksen jälkeen).

## PÄIVITYS 16.10. 02.0x — MERINOSTOT + MERIVASTAUKSET KUITATTU JUNAAN 196

- PT kuittasi f7ffbff4d → NS:lle ilmoitettu. iPhone-todistus lokit/todistus-meri-nostot-196-20261016-0151 (käännös 71e1c19c3): m3 Tyrrhenanmeri-kortti,
  m2b Pulun merivastaus (otto 07 soi 30,1 s). PUUTE-rivit = skenaario (Suomenlahden nimi ei näy zoomilla 9; oleta-rivi), ei vika.
- Tekoälymerkintä chatissa jää (PT). Vastaukset 82–103 (11 uutta merinostoa) vasta omistajan äänityskortin jälkeen: lisää uusi-meri-*.json generaattoriin.
- AUKI: Mac-kuva. Odottaja (scratchpad mac-jonoon.sh) jonottaa `PROTO_LINJA=2 mac-kaanna.sh f7ffbff4d` vasta kun NUI 122169f34 on L2-lukossa
  (Julkaisija 01.5x). Sitten tyokalut/siirtoseppa-ajot/mac-meri-nostot-196.sh <.app> <kansio> (idle ≥ 600 s; napauttaa itameri + tyrrhenanmeri) → PT.

## PÄIVITYS 16.10. 03.3x — MAC-KUVA VALMIS, JONO TYHJÄ

- Mac f7ffbff4d: lokit/siirtoseppa-meri-nostot-196-mac4 (kortti Suomenlahti/Tyrrhenanmeri, merivastaus 07 soi). PT:lle, ei omistajalle.
- MAC-OPIT: konsolissa voi olla toinen macOS-käyttäjä (CGSession kCGSSessionOnConsoleKey=0) → appi "piilossa" (1 fps, Cesium seis), ikkunakuva
  (screencapture -l/-R) jää vanhaksi, System Events -ikkunan siirto kielletty. Toimii: pelin oma `kuva <nimi>` ui-komento.txt:ssä
  (→ persistentDataPath/ui-<nimi>.png, odota ≤ 90 s). Leveässä ikkunassa merinimet näkyvät vasta kaarella ~12 (Itämeri) / 34 (Välimeri).
  Binääri Contents/MacOS/Matkakirja; asetukset app.matkakirja.proto3d (defaults export/import ajon ympärille). Skripti mac-meri-nostot-196.sh v4.
- Jono tyhjä (PT:lle 03.3x). Seuraavat mahdolliset: merivastaukset 82–103 omistajan äänityskortin jälkeen (uusi-meri-*.json generaattoriin).

## PÄIVITYS 16.10. 10.2x — MERIVASTAUKSET 82–103 NS:LLÄ

- **siirtoseppa/meri-vastaukset-2-196 9fa3b99f1** (juna-196 90f1ef54a päällä; worktree wt/proto-siirtoseppa-meri2): 103 vastausta,
  generaattori lukee uusi-meri-1…3.json (nostoittain) ja tarkistaa Äänittäjän manifestit (`--manifest`). L2 KÄÄNNETTY cd082c69e 10.21 → NS + PT.
  Uudet 11 merinostoa näkyvät natiivissa vasta, kun sisältöpaketti sisältää ne (verkko #4691 ilman versionnostoa).
- Levysiivous: worktreet ilmiot/iss-hetki/meri/vapaalento ja meri-196-app/-mac poistettu; todistus-kohokohta*-196 (15.10.) poistettu
  (Lapin revontulipari poistui niiden mukana – tee uusi ajo, jos PT pyytää).
- Jono tyhjä merivastausten jälkeen.

## PÄIVITYS 16.10. 20.5x — NOLLAUS ENNEN ISOA ERÄÄ: ÄÄNIPOHJA (SEURAAJAN ENSIMMÄINEN ERÄ, juna 197)

**Toimeksianto (PT, OMISTAJAN PÄÄTÖS 20.54 "Kyllä, kaikki yhtä aikaa"):** pehmeä liike, ääni ja valo yhteisiksi pohjiksi kuten lasikortit;
parannus pohjaan leviää kaikkiin linsseihin ja peleihin, uudet vain pohjilla. SIIRTOSEPÄLLE ÄÄNIPOHJA (natiivi):
- yhteinen mikseri (ryhmät puhe, musiikki, tehosteet, maisema), tasot, pehmeät häivytykset, musiikin vaimennus kertojan alle, askeleet alustan mukaan
- nyt ei yhtään AudioMixeriä; linssitiedostot luovat omat AudioSourcet → kytke olemassa olevaan jaettuun kertoimeen (MikseriPalvelin,
  worker /mikseri/tasot – säilyy). Tasot ja kuuntelu yhdessä Äänittäjän kanssa.
- automaattinen tarkistus (testi/vahti), joka listaa pohjan ohittavat omat AudioSourcet (vanhat siirtolistana); siirrä vanhat vuorollaan
- JÄRJESTYS: 1) suunnitelma ≤ 1 sivu docs/:iin (esim. docs/moduulit/aanipohja.md, lisää Raamatun karttaan vain PT) + SHA PT:lle,
  2) pohja + ensimmäinen käyttäjä MUSEO (askeleet, kertoja, sellot) → käännös (Julkaisijan KÄÄNNÖS NYT) → PT.
- Lähtökohdat (juna-196 90f1ef54a): UI/Aanet.cs (AaniKanava, Aanet.Soita/Pysayta, Puhesoitin), UI/MikseriPalvelin.cs, UI/Aanentasot.cs,
  Linssit/Ydin/AaniHaivytys.cs, Linssit/Unity/SeikkailuAanet.cs, DioraamaLimitteri.cs, SaumatonSilmukka.cs; `git grep -l "AddComponent<AudioSource>"`
  Assets/Matkakirja → 34 tiedostoa. Muistin ÄÄNI-INDEKSI (memory/indeksi-aanet.md) ennen työtä. UI-POHJAT-sääntö: ei omaa UI:ta ilman PT:tä.

**Tila nyt:** jono muuten tyhjä. Junassa 196: merinostot f7ffbff4d + merivastaukset 82–103 9fa3b99f1 (NS:llä). Revontulten Pulun kysymys tilattu SK:lta
(kytkentä myöhemmin PuluChat.IssVastaukset-malliin + kohokohdat.json kysymykset). Worktree wt/proto-siirtoseppa-meri2 (mergettävissä/poistettavissa
kun 9fa3b99f1 on juna-196:ssa).

## PÄIVITYS 16.10. 21.1x — ÄÄNIPOHJA: SUUNNITELMA PT:LLÄ, POHJA + MUSEO KÄÄNNÖSJONOSSA

- Suunnitelma: verkkorepo haara **siirtoseppa-aanipohja e3e829b24** (docs/moduulit/aanipohja.md). Ei mergetty: dokumenttitesti vaatii
  Raamatun karttarivin → PT lisää ja mergeää (PT:lle kerrottu 20.59).
- Proto **siirtoseppa/aanipohja-197 c4ca8207d** (juna-197 4b6ef2395 päällä; worktree wt/proto-siirtoseppa-aanipohja): Ydin
  Linssit/Ydin/Aanet/Aanipohja.cs (Taso-kaava, PohjaLiuku, PohjaVaisto 0,25/0,6, AskelPankki, AanipohjaVahti), Unity Linssit/Unity/AaniPohja.cs
  (AaniPohja.Lahde → PohjaLahde), museon askeleet + sisäänmeno pohjalla, siirtolista Linssit-testit/aanipohja-siirtolista.txt (32),
  `ui aanet vahti` + "pohjan ohi". Linssit-testit 1935/1935, unity-tarkistus 0, tarkista.sh 0.
- Ajo: odottaja (tyokalut/siirtoseppa-ajot/ajo-aanipohja-197.zsh, loki lokit/siirtoseppa-aanipohja-197.log, skenaario sk-aanipohja-197.txt)
  odottaa Julkaisijan lippuja kaannos-aanipohja.nyt + simu-aanipohja.nyt (pyydetty 21.0x). Valmis → SIMU VAPAA Julkaisijalle, aani/museo-pohja.wav
  verhokäyrä (askeleet kertojan alla vs. ilman; sello ennallaan) → PT. Sitten SHA NS:lle junaan 197 PT:n kuittauksella; siirtolista vuorollaan.
- Meri2-worktree poistettu (9fa3b99f1 on juna-197:ssä).
- PT 21.1x: suunnitelma hyväksytty (koodimikseri säilyy), PT:n PR #4727 (fable-yhteiset-pohjat) karttarivin kanssa → oma haara jää mergeämättä
  (PT:tä pyydetty ottamaan e3e829b24:n polut). **KYTKENTÄ JUNAAN 198, ei 197**: proto-haara rebase natiiviseppa/juna-198:n päälle, kun NS avaa sen.
  Julkaisija antoi liput 21.1x (L2:ssa ensin 231437410).
- 21.5x: NS avasi juna-198 = 4b6ef2395 → **siirtoseppa/aanipohja-198 b9d629780** (c4ca8207d + lattia lokiin). Ajot: todistus-aanipohja-197-20261016-2134
  (askeleet 10–12 dB salin/sellon yli kuten 14.10., sisäänmeno soi; kertoja ei puhunut, lista auki) ja -198b-…-2141 ("museo nayttely kg" ei sulje
  listaa → kertoja tauolla). 3. ajo (198c, lopullinen SHA, skenaario napauttaa "Punainen kabinetti" → Siirry näyttelyyn) odottaa Julkaisijan lippuja.
  Verhokäyrä: scratchpadin verho.py (100 ms RMS) → tee uudelleen, jos nollaus. Vahti: sali-belgrad + musa-URL:t rekisteröimättä (Aanisoitin, ei pohjan).
- 22.0x: L2 seis levyn takia (17,6 Gi, Postivahti) → 198c-odottaja pysäytetty, liput pois. Kun Julkaisija ilmoittaa levy > 26: käynnistä
  `H=b9d629780 ERA=aanipohja-198c nohup zsh tyokalut/siirtoseppa-ajot/ajo-aanipohja-197.zsh` + pyydä KÄÄNNÖS NYT + SIMU NYT.
  Poistettu omat vanhat: _tyo/siirtoseppa/meri2-196-app, lokit/siirtoseppa-app/raketti-valo-191, lokit/siirtoseppa-raketti-valo/{nyk,uusi} (191-kuvat).
- 22.2x: OMISTAJAN PÄÄTÖS 22.24 (PT): juna 198 = juna 197 → äänipohja junaan 197 (b9d629780 yhdistyy juna-197 4b6ef2395:een puhtaasti; haaranimet -197 ja -198 samassa).
- 23.1x: b9d629780-käännös pysähtyi jonon aikarajaan. **PT:N PYYNTÖ 23.06 (omistaja): kaikki ääni pois, kun linssi tai peli käynnistyy** →
  **9db0288e9** (AaniPohja.NakymaVaihtuu: Linssirekisteri.Avautuu + Mylly/Tavli/Shakki Avaa + kipin kaupungin vaihto KatkaisePuhe; PeliOhjainin
  katkaisija → AaniPohja.Katkaisija; muut soivat 0,2 s häivytys, silmukat tauolle → kartalla jatkavat). Haarat siirtoseppa/aanipohja-197 ja -198 = 9db0288e9.
  Ajo 197d odottaa lippuja (loki lokit/siirtoseppa-aanipohja-197d.log; skenaarioon lisätty luenta → kippi → hiljaisuus, luenta → mylly → kartalle).
  Valmis → SIMU VAPAA, verhokäyrät (museo-pohja.wav, nakyma.wav) → PT 1 rivi + SHA NS:lle junaan 197 (tavoite ennen ~01.45).
- 23.4x: 9db0288e9-käännös keskeytetty levyhätään (Julkaisija jonottaa uudelleen PK:n intron jälkeen; ÄLÄ käynnistä itse). Kun KÄÄNNÖS NYT + SIMU NYT: `H=9db0288e9 ERA=aanipohja-197d nohup zsh tyokalut/siirtoseppa-ajot/ajo-aanipohja-197.zsh`. PT:lle tila kerrottu 23.4x.
- 01.0x: ajo 197d (0ecaaaceb) valmis → PT:lle: kippi ja mylly katkaisevat luennan (nakyma.wav −12 dB, loki), museo ennallaan, askelten väistö vain testeissä. Tulos lokit/todistus-aanipohja-197d-20261017-0052/TULOS-AANIPOHJA.md. Odottaa PT:n kuittausta → SHA 9db0288e9 NS:lle (juna 197). Myöhemmin: Aanisoittimen/Puheen klipit rekisteröimättä äänivahdissa; siirtolista vuorollaan.
- 01.0x: PT kuittasi → **9db0288e9 NS:lle junaan 197** (yhdistyy f4908018a:han puhtaasti). SEURAAVA ERÄ (juna 198, PT): äänivahdin rekisteröinnit (Aanisoittimen URL-klipit, MatkakirjaPuhe, sali-belgrad, sello) + siirtolista vuorollaan.
- 01.0x: äänivahti siirtoseppa/aanivahti-198 **fdfb5f6dd** (9db0288e9 päällä, worktree wt/proto-siirtoseppa-aanipohja nyt tällä haaralla): Aanisoitin/Puhe ryhmätasolla. PT:ltä kysytty: siirtolista seuraavaksi?
- 01.0x: NS: 9db0288e9 rungossa 197 = 40c54d8c8 (tarkista 0).

## PÄIVITYS 17.10. 01.0x — NOLLAUS (Postivahti, kova raja 36 %): SEURAAJAN ENSIMMÄINEN ERÄ = ÄÄNIPOHJAN SIIRTOLISTA

**Valmis:** äänipohja + museo + "kaikki ääni pois linssin/pelin avautuessa" **9db0288e9** junan 197 rungossa 40c54d8c8 (NS). Äänivahti
**fdfb5f6dd** (siirtoseppa/aanivahti-198) NS:llä junaan 198. Suunnitelma docs/moduulit/aanipohja.md PT:n PR #4727:ssä.

**SEURAAJAN ERÄ (PT 01.0x): siirtolista pieninä erinä, commit + luovutusrivi + push jokaisesta.**
- Worktree /Users/Shared/Claude/wt/proto-siirtoseppa-aanipohja, nyt haaralla siirtoseppa/aanivahti-198 (fdfb5f6dd). Tee uusi haara
  siirtoseppa/siirto-198-<n> sen päältä (tai natiiviseppa/juna-198:n, kun NS avaa sen).
- Lista: Linssit-testit/aanipohja-siirtolista.txt (32). Pienimmät ensin: SeikkailuKuulija (53 riviä), LuentaSoitin (98), SeikkailuLoppumusiikki,
  EsityksenAani, SeikkailuTyrmaAanet, VeneAanet, SeikkailuSade, PalloAanimaisemaSoitin … AaniKaappaus EI siirretä (kaappaa, ei soita:
  jätä listalle kommentilla tai lisää AanipohjaVahti.Pohja-poikkeuksiin perustellen).
- Kaava (museo mallina, Linssit/Unity/MuseoAskeleet.cs): `AaniPohja.Lahde(isanta, ryhma, id, nimi[, kolmeD])` → PohjaLahde; koodi asettaa
  vain `.Taso`, soittaa `.Soita(klippi, kohta, nousuS, savel)`, lopettaa `.Pysayta(haivytysS)`; omat Voimakkuus/kytkin/mikseri-laskut pois
  (pohja laskee). 3D-lähteissä aseta spatial-asetukset p.Lahde:sta. Poista rivi siirtolistalta → AanipohjaTestit kaatuu, jos unohtuu.
- Tarkistus jokaisen jälkeen: `Linssit-testit/kaanna.sh Aanipohja`, `Linssit-testit/unity-tarkistus.sh` (0). Taso ei saa muuttua (paitsi uusi
  väistö kertojan alla): mittaa simuajossa 100 ms:n verhokäyrällä ennen/jälkeen, kun erä on laitteella (verho.py-malli: wave + array, 0,1 s RMS dB).
- Ajot: tyokalut/siirtoseppa-ajot/ajo-aanipohja-197.zsh (H, ERA, SK ympäristöstä; liput kaannos-aanipohja.nyt / simu-aanipohja.nyt vain
  Julkaisijan NYT-viestillä; yöllä simu 1 kerrallaan). Skenaario sk-aanipohja-197.txt (museo + kippi/mylly-katkaisu).
- Opit: todistusajon tap-teksti löytää vain näkyvät listarivit (Punainen kabinetti, ei Kunniagalleria); "museo nayttely <id>" ei sulje listaa →
  kertoja jää tauolle. Levyhätä pysäyttää L2:n (Julkaisija jonottaa uudelleen, ÄLÄ käynnistä itse). Odottajan zsh voi kuolla kesken jonon →
  tarkista /tmp/matkakirja-kaannospalvelu-2.lukko/kuka ja lokit/kaannospalvelu/*-<sha>-l2.log.
- 01.1x: siirto 1 **583e92029** (siirtoseppa/siirto-198-1, fdfb5f6dd päällä; worktree wt/proto-siirtoseppa-aanipohja): LuentaSoitin pohjalle
  (puhe, id linssi-luenta, taso 1,0 ennallaan, mykistys ennallaan). Lista 31. Seuraavaksi itsenäiset: SeikkailuLoppumusiikki, EsityksenAani,
  SeikkailuSade, VeneAanet. SeikkailuKuulija EI ole pieni: sen Lahde-tehdasta käyttää 6 tiedostoa (SeikkailuAanet, -Esineet, -Kappeli,
  -Repliikit, -TyrmaAanet, -Vartijat), jotka asettavat volumen itse → siirto kutsuja kerrallaan, tehdas viimeisenä.
- 01.1x: siirrot 2–3 samalla haaralla: **75a4cbc20** SeikkailuLoppumusiikki (musiikki/linna, oma liuku + linnan puheen väistö Tasossa),
  **7dccbcd26** EsityksenAani (puhe, id esitys-kertoja, taso 1,0 ennallaan). Lista 29. Aanipohja 6/6, unity 0. Seuraavaksi SeikkailuSade, VeneAanet.
- 01.1x: siirrot 4–5: **eb19b3ba6** SeikkailuSade (silmukat id = tunnus, linna), **dd1532baa** VeneAanet (3D veneen lapsena, pallo, Taso 0,7).
  Lista 27. Linssit 1935/1935, unity 0. Laitemittaus (verhokäyrä) koko erästä kerralla, kun PT/Julkaisija antaa vuoron.
- 01.2x: siirto 6 **2e47edc13** SeikkailuTyrmaAanet (pohja 2D + ohikulun askeleet 3D) + uusi **SeikkailuKuulija.Pohja** (3D-pohjatehdas
  kuulokehyksessä; vanhat Lahde-kutsujat siirtyvät siihen yksi kerrallaan, Lahde poistetaan viimeisenä → SeikkailuKuulija pois listalta). Lista 26.
- 01.2x: siirto 7 **36fa2f5a8** PalloAanimaisemaSoitin (kerta-äänet + omat silmukat, pallo; pohjan väistö pois, oppaan väistö tasossa). Lista 25.
- 01.2x: **56e469f33** SaumatonSilmukka + AaniKaappaus vahdin apureiksi (AanipohjaVahti.Pohja, perustelu koodissa), pois listalta. Lista 23.
  Haaran siirtoseppa/siirto-198-1 kärki 56e469f33 (fdfb5f6dd + 8 committia), Linssit 1935/1935, unity 0. PT:lle kerrottu; laitemittaus odottaa vuoroa.
  Seuraavaksi: IhmisenMatka2Maisema (209), ElavaAaniPankki, RadioAanet, SeikkailuHistoria; SeikkailuKuulija-kutsujat SeikkailuKuulija.Pohjaan.
- 01.3x: siirrot 8–9: **ea023355e** IhmisenMatka2Maisema (Id vaihtuu maiseman mukaan), **69ae8d86e** ElavaAaniPankki (ElavaSilmukka + Pooli,
  UusiLahde korvaa Lahde3D:n; myös RakettiLokit) + uusi **PohjaLahde.OmaKerroin** (siirtymävaihe: kutsuja kertoo mikserin itse, pohja ei toista).
  Lista 21. Linssit 1935/1935, unity 0. HUOM vahti näkee vain AddComponent-rivit: tehtaiden (SeikkailuKuulija.Lahde) kutsujat grepillä.
- 01.3x: siirto 10 **d67584806** RadioAanet (viritin Id klipin mukaan, kohina, kerta-äänet OmaKerroin). Lista 20.
- 01.4x: siirrot 11–12: **dfac4b404** SeikkailuHistorian kertoja (PlayDelayed pohjan lähteellä), **e2d823ed5** kappelin keskustelu + ISS-kupolin
  selostus (puhe/iss, taso 1,0). Lista 17. Linssit 1935/1935, unity 0. Jäljellä: AjattelijatSovitin, PalloKori, SeikkailuKuulija (+5 kutsujaa),
  AvaruuskavelyNakyma, Paljastus, PeliKomennot (testisini: pohjan apuriksi?), PuluRealtime, Puhe/Aanisoitin/Aanet (ryhmätasolla, PT:n linjaus),
  PallokisaOhjain, ShakkiNakyma, ElavaKaupunki, RakettiAanet, DioraamaAanet, KaupunkiAanimaisemaSoitin, OpasSovitin.
- 01.4x: siirrot 13–15: **42e15a658** PalloKori (kerta-äänet), **4a079c1a7** Paljastus (aarremusiikki), **048f59c4f** AvaruuskavelyNakyma
  (tehosteet, hengitys, Pulu puhe-ryhmässä). Lista 14. Kärki 048f59c4f.
- 02.0x: siirto 16 **d02d72c5f**: seikkailun 3D-lähteet (SeikkailuAanet, -Esineet, -Kappeli voudin askeleet, -Repliikit, -Vartijat) SeikkailuKuulija.Pohjaan,
  vanha SeikkailuKuulija.Lahde poistettu. Lista 13. Linssit 1935/1935, unity 0, tarkista.sh 0. Opit: OlavinlinnaTekstitTestit ei tunnista
  Pohja(...)-kutsun nimeä olion nimeksi → "// kieli: ei (äänilähteen olion nimi)". Jäljellä 13: AjattelijatSovitin, DioraamaAanet, ElavaKaupunki,
  KaupunkiAanimaisemaSoitin, OpasSovitin, RakettiAanet, Aanisoitin, PallokisaOhjain, PeliKomennot, Puhe, PuluRealtime, UI/Aanet, ShakkiNakyma.
- 02.1x: siirto 17 **a8196acdf** shakki (humina, kello; lautapelit) + pallokisan poltin. Lista 11. PT:ltä kysytty: Aanisoitin, Puhe, UI/Aanet
  (ydinäänet ryhmätasolla) ja PeliKomennot (testisini) pohjan apureiksi vai siirtoon? Jatkan isoja: ElavaKaupunki, RakettiAanet, DioraamaAanet,
  KaupunkiAanimaisemaSoitin, OpasSovitin, AjattelijatSovitin, PuluRealtime.
- 02.1x: siirto 18 **5a7b25000** ElavaKaupunki (lokit, kerta-äänet, 2D-kerta; UusiLahde/OmaKerroin). Lista 10. Kärki 5a7b25000.
- 02.2x: **b1b64e2cb** PohjaLahde.Tauko/Jatka: näkymän vaihdossa pohjan silmukat pausella ja jatkavat kartalla (kuten vanhat NakymanHaivyttimessä;
  ilman tätä siirretyt silmukat olisivat jääneet hiljaisiksi). **fd2f26e59** KaupunkiAanimaisemaSoitin (kerrokset, varat, raitiovaunu, suhina,
  kellot). Lista 9: AjattelijatSovitin, DioraamaAanet, OpasSovitin, RakettiAanet, PuluRealtime + PT:n kysymys (Aanisoitin, Puhe, UI/Aanet,
  PeliKomennot). Kärki fd2f26e59, Linssit 1935/1935, tarkista.sh 0.
- 02.4x: siirto 20 **8b0b4c02d** DioraamaAanet (8 lähdettä omiksi pohjaolioiksi; PlayScheduled, tauko, GetOutputData pohjan AudioSourcella). Lista 8:
  AjattelijatSovitin, OpasSovitin, RakettiAanet, PuluRealtime + Aanisoitin, Puhe, UI/Aanet, PeliKomennot (PT:n vastaus kesken). Kärki 8b0b4c02d.
- 02.4x: siirto 21 **6f10473a8** PuluRealtime (puhe, taso 1,0, striimi ilman kelausta). Lista 7: AjattelijatSovitin, OpasSovitin, RakettiAanet +
  Aanisoitin, Puhe, UI/Aanet, PeliKomennot (PT). Kärki 6f10473a8.
- 02.5x: siirto 22 **f08681cbe** AjattelijatSovitin (LuoLahde → pohja, AsetaTaso; näytetarkka ajastus ennallaan). Lista 6. Kärki f08681cbe.
- 03.0x: **9deaaa359** AaniPohja.VanhaLahde + AsetaTaso/LueTaso (mekaaninen siirto vanhalle AudioSource-koodille) + uusi klippi peruu kesken
  olevan pysäytyshäivytyksen. **069d29408** OpasSovitin (kertoja, silta, ukkonen, jyrinä, kellot). Lista 5: RakettiAanet + Aanisoitin, Puhe,
  UI/Aanet, PeliKomennot (PT). Kärki 069d29408, Linssit 1935/1935, tarkista.sh 0.
- 03.1x: **e07d9df06** RakettiAanet + RakettiPuhe (VanhaLahde), **0bfc62868** ydinäänet (Aanisoitin, Puhe, UI/Aanet) ja testisini vahdin
  apureiksi (oletukseni PT:n kysymykseen) → **SIIRTOLISTA TYHJÄ**. Yhteenveto: docs/raportit/siirtoseppa-aanipohja-siirtolista-20261017.md.
  SEURAAVA: laitemittaus (verhokäyrä ennen fdfb5f6dd / jälkeen 0bfc62868; seikkailu, pallon kaupunki, radio, raketti+kupoli, museo) PT:n
  vuorolla → sitten SHA NS:lle junaan 198. Haaraa ei yhdistetä ennen PT:n kuittausta.

## PÄIVITYS 17.10. 03.1x — NOLLAUS (Postivahti, kova raja 35 %): SEURAAJAN ENSIMMÄINEN ERÄ = LUENTAMANIFESTI v6

**Valmis:** äänipohjan siirtolista tyhjä, **0bfc62868** (siirtoseppa/siirto-198-1, wt/proto-siirtoseppa-aanipohja). PT kuittasi apurit
(Aanisoitin, Puhe, UI/Aanet, PeliKomennot = pohjan runkoa). Yhteenveto docs/raportit/siirtoseppa-aanipohja-siirtolista-20261017.md.

**SEURAAJAN ERÄ 1 (PT, juna 198, ENNEN muuta): luentamanifesti → v6.** Äänittäjä 03.xx: `osoitteet.luennat-manifesti` =
https://media.matkakirja.app/aanet/luennat/v6/manifest.json (kumulatiivinen 8 410 palaa, ämpärissä 200, korvaa v2–v5; raportti
Äänittäjän haarassa aanittaja-tyo-20261011 c32a62fad docs/raportit/luennat-era4-oppaat-kaupunkilehdet-20261017.md). EI vielä tehty.
- Natiivi (proto): Assets/Matkakirja/Peli/Valmisluennat.cs:22 ManifestiOletus (v1 → v6), UI/NostoluentaVienti.cs:87 oletus-URL,
  Scripts/Peli/Puhe.cs:395 käyttää ManifestiOletusta. Testit Peli-testit/Testit/ValmisluennatManifestiTestit.cs (Kansio v1) ja
  ValmisluennatTestit.cs (v1-syötteet, jätä tai päivitä), kultainen Peli-testit/Kultaiset/tee-valmisluennat-kultainen.mjs (v1 gz).
  PT: "varmista testillä, että museon luenta löytyy v6:sta" → hae v6-manifesti (curl, oma ämpäri), tee kultainen gz kuten v1 ja testi.
- Web: origin/mainissa ei osumaa "luennat-manifesti"/"luennat/v1" (tarkista vielä js/ ja asetukset), joten luultavasti vain natiivi.
- Haara: erillinen pieni erä junaan 198 (NS:n natiiviseppa/juna-198 tai fdfb5f6dd:n päälle) → SHA NS:lle + PT:lle. Älä sotke siirto-198-1:een.
- PT:lle on kerrottava: v6 EI ole mukana 0bfc62868:ssa.

**SEURAAJAN ERÄ 2: laitemittaus 0bfc62868.** Julkaisija 03.xx: siirto-198-1 0bfc62868 L2-jonossa NUI:n 198-erien jälkeen (~03.30), ilman
asennusta → _tyo/siirtoseppa/siirto-198-1-app; Julkaisija kysyy ENNEN SIMU NYT:iä simun (95EEDB48?) ja keston → vastaa hänelle
(session local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914). Mittaus: 100 ms verhokäyrä ennen fdfb5f6dd / jälkeen 0bfc62868 (seikkailu, pallon
kaupunki, radio, raketti + kupoli, museo verrokkina); skenaario tyokalut/siirtoseppa-ajot/sk-aanipohja-197.txt laajennettava, ajo
ajo-aanipohja-197.zsh (H, ERA, SK). Sitten PT:n kuittaus → SHA NS:lle junaan 198.
