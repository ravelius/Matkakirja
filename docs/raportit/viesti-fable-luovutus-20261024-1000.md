# Päätoimittajan luovutus 24.10.2026 klo 10.00 (konteksti 31 %; tili vvi@vvi.fi)

Id:t: /Users/Shared/Claude/osoitekirja.md. PT local_5df52e10. Edellinen -20261024-0620 (lue vain tämä).
ALOITA: tuotannonohjauksen osio 0 (git show origin/main:docs/tuotanto/tuotannonohjaus.md), node tools/raamattu-luku.mjs 7.47,
sitten luvut 7, 8, 9, 12, 14. Avaa Asemataulu, Monitorit ODOTTAJAVAHTI + CODEX-POSTI-VAHTI (7.41), RC päälle.
OMISTAJA HEREILLÄ 06.38 (KK) → ei yön oletuspäätöksiä; kysymykset KK:n kautta kortilla.
Keskustelu: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-10-24-klo-0624-0955.md. Loki: haara fable-loki-20261024e (PR mainiin, JU merge).
Asemataulu: scratchpad/asemataulu/data/talo/junat.json (Juna 210 -rivi päivitetty 09.5x; .tmp + os.replace + copymode).

## 1. JUNA 210 – lukitus ja TF vasta, kun omistaja on nähnyt videot ja pyytää ("Odota kaikkea" 01.13)
KUITATTU aamulla (kaikki NS:llä tiedossa):
- PK alkulento-210: ddde5e669, 43fb02964, f27ae21a8, aaebbaa54, 3bca69bb0, esilataus 00f02478a/3961390f3/1f43f4407, 7b1e60ab8, 21f3d5dfc
  (latauskuva 0,05 s napautuksesta, ei mustaa, kartan musiikki mykistetään heti, iPhone-pysty täyttää ruudun, leima irti kädestä).
- PK lahikulma-210: 4f41b8bff, a618637b7, 6fceeb6c2, 93176f6b0, a023ac2e2, ecafff0f0/b59b66c72 (lokia). LT 04dedfd2e: nykäykset/hypyt 0/0.
- NS msaa-210 989ad7ca7 (MSAA 4 kaikilla; LT: värinä 0,23/0,13/0,25 %, A 9,22 / J 9,76 ms, muisti min 1513 Mt, jetsam 0). EI c3bed52dc, EI aniso.
- NUI latauslogo-210 bf05235d4 (terävämpi logo, PT tarkisti). NUI alkulento-fontti-210 8eaed64b4 (nimiteksti yhtenä elementtinä ääriviivalla).
  8db6e8d70 yksin on RIKKI (kaksi kerrosta rivittyy väärin) – vain 8eaed64b4:n kanssa.
AUKI 10.00:
- NUI: pieni keskityskorjaus (harvennettu "B E I J I N G"/1914 ~35 px oikealla) samaan haaraan → SHA PK:lle, NS:lle, PT:lle.
- PK: omistajan videot (iPhone vaaka + pysty, äänellä) NUI:n korjauksen jälkeen. PT TARKISTAA täysikokoisina ennen KK:ta:
  blackdetect, silencedetect leimaa ennen (vaakan musiikki!), nimitekstit 2×, pystyn kattovara 25–32 s, 3-2-1, leima. Polut KK:lle +
  rivi: iPadin pystylatauskuvassa sivuilla mustat palkit (kuten omistajalle 01.41 näytetty; täyttäminen rajaisi 25 %).
- NS: ehdokas = 72c07bf31 + yllä kuitatut + NUI:n keskitys → testit → asennus → LT:n kierros (kamera + värinä). Sitten KK kysyy omistajalta lukituksen.
- LT: kierros 0b67252a9 (09.19) oli käynnissä; tulos PT:lle.

## 2. MUUT
- VS: värinätyö valmis; jatkaa raketti f09a2cff -koevideo (lyhyt-pysty: 44–52 s maa vaalea, ~46 s sininen viiva; omistaja 00.37), k10e, juoksun sävytys.
- CODEX: tilaus 18e5ec45a (02.39, havainnekuvat lähempää keisaria) ilman kuittausta 10.00 asti; Postivahdin käänteinen vahti → KK.
- Lavastaja, Äänittäjä levossa (jonot tyhjät). NUI lepää keskityskorjauksen jälkeen.
- Juna 211 löydökset: scratchpad/paatoimittaja/juna211-loydokset.md (LinssiPito ~1 s vs 200 ms; portti-kuja8 LOD1-ovi umpimuuri; vaakalatauskuva ~30 s).

## 3. Opit
- Omistajan videot: tarkista aina täysikokoisina + blackdetect + tekstit 2× ennen KK:ta; kolme palautusta tänään löysi vian joka kerta.
- Rooli ei ole ensimmäinen tarkistaja vain testeillä: pelikuva 2× molemmissa suunnissa ennen SHA:ta (loki 24.10. 09.56).
