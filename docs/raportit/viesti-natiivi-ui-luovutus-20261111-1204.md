# Natiivi-UI: luovutus 11.11.2026 klo 12.04 (kontekstivahti 26 %; korvaa -1143:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KS local_7b57e35a-3a8e-4943-aba1-c960b9eb4671,
NS local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a. TYÖTAPA: näkyvät suoraan KK:lle, PT kopiona.
Natiivikoodi: worktree /Users/Shared/Claude/wt/proto-nui-pallo (remote natiivi-backup; push `git push natiivi-backup HEAD:refs/heads/<haara>`),
nyt haarassa natiivi-ui/napautus-juna. Tarkistus: `sh Peli-testit/unity-tarkistus.sh </dev/null` (taustalle, ~3 min).
Kuvien kelpoisuus: loki.txt "kuva … pelin ruutu 640×480" (Screen 321×578 tallenteen jälkeen ei haittaa korjauksen f2511a80f jälkeen; KK hyväksyi näin).
Taustat: -1143 (esittelyn rajaus, NS kohta 6), -1125, -1027 (haarat natiivi-ui/luovutus-20261111-*).

## 1. NAPAUTUSLENTO JUNAAN (KK 12.0x: A+B HYVÄKSYTTY katse-2:n käytöksellä)
- lento-3-uusinta f62e126c8 ja katse-2-uusinta 24c2e8fa0 katsottu (KK). Junasha 63b09d5a0 (natiivi-ui/napautus-juna) = katse-2 2c75bcf22 + Matkaopas
  (237e44e6f, työ D) PERUTTU (KK 11.38 palautti Matkaoppaan). Turisti-info palaa kartalle. Unity 0 virhettä. PT:lle ja KK:lle nimetty.
- Mukana työ E 569de90bb (Lehti palkin vasemmalla, merkitty "koe"): Turisti-info on nyt sen rivillä → JU kuvaa ETUSIJALLA:
  sk-napautus-juna-1 → lokit/nui-napautus-juna-1-63b09d5a0 (j0 kartta, j1 palkki auki, j2 Turisti-info avaa oppaan).
- SEURAAVAKSI: katso kuvat (päällekkäisyys, rivin paikka). OK → PT:lle "63b09d5a0 junaan" + kuva KK:lle. Vika → korjaa napautus-juna-haaraan.

## 2. MATKAOPAS (KK 11.38 kohta 3) – TEHTY cccae5d87 (natiivi-ui/matkaopas-3, pohja 2c75bcf22), ajo JU:n jonossa
- (a) Etusivun juttu: kuva 34 % vasemmalla (oppaan 1. jakson 1. kuva, sääntö kaikille; Pariisissa Tour Saint-Jacques, ei metroa: jos KK haluaa
  metron, järjestys sisältöön, ei koodipoikkeusta), kappale + "Matkaopas →" oikealla. Lehtinakyma.MatkaopasJuttu.
- (b) Lehtinakyma.AvaaAlasivu(otsikko, rakenna): juttu liukuu samalle paperille omana sivunaan (otsikko MATKAOPAS), lähtösivu jää piiloon
  visibility hidden (scrollOffset säilyy), Edellinen/pyyhkäisy/← palaa samaan kohtaan. Nahtavyysarkki.TaitaOpas(o, isa, levea).
  Lehti kiinni → vanha oma arkki. Testikomento `ui lehti alasivu opas|takaisin|?`.
- Ajo: sk-matkaopas-3 → lokit/nui-matkaopas-3-cccae5d87 (m1 etusivu, m2–m4 opas, m5 paluu; vertaa m1/m5 ja alasivu ?-rivien kohta).
  Katso itse → KK suoraan (kuvat), PT kopio. Junaan vasta KK:n OK:lla; silloin yhdistä napautus-juna-haaran päälle (237e44e6f-revert kumotaan).

## 3. kohteet-arkki-2 (919e7e855) – JU:lla ajossa 11.49 → lokit/nui-kohteet-arkki-2-919e7e855
- KK 11.49: Orsay HYVÄ; Sacré-Cœur EI erikoistapausta (mäki mallissa → mallin puolelta, KK:n saumat ja mäet -suunnitelma, KS). Keskipiste käy,
  jos sama sääntö kaikille. KK katsoo itse: täyttääkö ND 1/3–1/2 lyhyemmästä sivusta.
- SEURAAVAKSI: arkit kuten -1143 kohta 1 (montage 5×3, -1000-kopiot), vertaa arkki-1:een, arvio 12 kohteelle → KK, PT kopio, KS tieto.

## 4. SULUN LOPUN LIIKAHDUS (KK 12.0x, ei este junalle) – syy löydetty, EI KORJATTU
- KK perui alapalkin "napsahduksen" (UI ei hyppää). Mitattu: kuva liikahtaa kerran sulun lopussa (a 23,74–23,94 s, b 24,02–24,22 s; koko ruutu).
- Syy (unity.log katse-2 rivit 4107–4112): kierto hiipuu 1,8 s → ajo = null → PalloKierto.PudotaEsitysKatse (PalloKierto.cs ~2432) pudottaa
  esityksen katseen 128 m yhdessä kehyksessä: silmä paikallaan, mutta etäisyys `korkeus` 115 → 370 m → etäisyyteen sidotut (usva, LOD, nimet) vaihtuvat.
- Korjaus seuraavaan muutokseen: katse liukuu nollaan SULUN AIKANA silmä paikallaan (Pudota pienin askelin joka kehys, tai EsitysKatse NaN jo
  sulun alussa ja PaivitaEsitysKatse ilman rivin 2420 odotusta mutta silmää säilyttäen). Todiste: tallenne sulusta, keskiero ei piikkiä lopussa.

## Avoimet: NS kohta 6 (b) mac-4 lappu (-1143 kohta 2) odottaa NS:ää. Remote Control: ei kytketty (vain omistajan pyynnöstä).

## LISÄYS 12.1x (korvaa kohtien 1, 3 ja 4 tilan)
- JUNASHA NYT b83baccaf (natiivi-ui/napautus-juna) = 63b09d5a0 + juna-224 kärki 17fbf3e35 (PT: pohja juna-224 kärki), unity 0.
- Työ E: KK 12.2x: kuva ennen junaa, täysikokoinen yläpalkin rajaus isolla ja pienellä iPadilla. Iso viety KK:lle (lokit/nui-napautus-juna-1-63b09d5a0/
  j0-kartta-yla.png, j1-palkki-yla.png; siisti, ei päällekkäisyyttä). Pieni iPad JU:lla: napautus-juna-2 b83baccaf → lokit/nui-napautus-juna-2-b83baccaf.
  SEURAAVAKSI: rajaa yläpalkki (`magick X.png -crop <leveys>x<~20 % korkeudesta>+0+0`), katso, vie KK:lle. KK OK → PT:lle "b83baccaf junaan" (PT antaa pt-ok).
  PT 12.1x halusi E:n irti ilman KK:n OK:ta; KK:n ohje (kuva ensin) ratkaisee – jos KK hylkää E:n, peru 569de90bb napautus-juna-haarassa.
- kohteet-arkki-2 VALMIS 12.04 (60/60, NRE 0) → lokit/nui-kohteet-arkki-2-919e7e855: arkit ja arvio tekemättä (kohta 3).
- Sulun liikahdus: KK HYVÄKSYI korjauslinjan (kohta 4). Todiste: KK:n mittaus kummastakin videosta – sulun lopussa yksikään näyte-ero ei ylitä
  edeltävää eikä kirkkaus hyppää. Tee omaan haaraan napautus-juna-haarasta; tallenne vaatii korjatun esikatselun (juna-224 kärjessä mukana).
- matkaopas-3 JU:lla napautus-juna-1:n rinnalla.

## LISÄYS 2, 12.1x: matkaopas-3 katsottu → matkaopas-4
- matkaopas-3 (lokit/nui-matkaopas-3-cccae5d87, arkki-matkaopas-3-1600.jpg): alasivu TOIMII (Lehden paperi, otsikko MATKAOPAS, paluu 1300 → 1300, m1 = m5).
  VIKA: etusivun kuvana yhä Eiffel ja oppaan jaksoista puuttuivat kuvat → päätason jaksoissa kuvat ovat avaimella "kuvat", jäsennin luki vain "kuva".
- Korjattu 23f6f6d07 (natiivi-ui/matkaopas-3 kärki, LehtiSisalto.Opas), unity 0. JU:lla matkaopas-4 (sk-matkaopas-4.txt) → lokit/nui-matkaopas-4-23f6f6d07.
  SEURAAVAKSI: tarkista etusivun kuva (Pariisissa Tour Saint-Jacques, vaaka) ja jaksojen kuvat oppaassa → KK:lle kuvat (m1, m2, m4, m5), PT kopio.
