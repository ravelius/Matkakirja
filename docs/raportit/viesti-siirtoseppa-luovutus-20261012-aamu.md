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
