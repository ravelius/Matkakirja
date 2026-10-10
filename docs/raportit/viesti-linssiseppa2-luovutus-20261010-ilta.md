# Linssiseppä 2 – luovutus 10.10.2026 ilta (18.0x, PT:n nollaus)

Rooli, työkalut ja simu kuten aiemmin (viesti-linssiseppa2-luovutus-20261010-paiva.md alkuosa). PT = PÄÄTOIMITTAJA (Opus, max),
Julkaisija jakaa käännös- ja simuvuorot (SendMessage "Julkaisija (Opus, high)"). Proto-worktree `wt/proto-linssiseppa2-muisti`,
skriptit `proto-3d/_tyo/linssiseppa2/skriptit-20261009/`, arkit `docs/raportit/kaappaukset/linssiseppa2-177-20261010/`.

## KESKEN (järjestys)
1. **LATTIAHEIJASTUS SIIRTYI LS1:LLE** (PT 18.2x: LS1:n peilikamera 45e35e9e6 kytketty v2f-varjojen kanssa). Havainnot lähetetty LS1:lle
   (karheus² → mip, katse lattiaan, skenaariot museo-lattia/sk-lattia-*.txt). Oma haara linssiseppa2/museo-lattia 50071113d (kuutio kerran
   per huone, ~0,9 Mt) talteen varaksi, jos peili on iPadilla liian raskas. Käännösvuoro peruttu.
2. **ND v6k14 VIETY** (Julkaisija 18.0x: 41 tiedostoa, portti 0, uusin-4 → v6k14). LR jatkaa v5c:llä → sama arkki (arkit-nd5b.py-malli, vuoro-nd5b.sh-malli; tekijärivi The wub CC BY-SA 4.0
   lisättävä käsin mallit.jsoniin; mittaa-julkisivu.py tavoite L 150–160, mittaa-parvis.py lyijy).
3. **PEKING-PARI ILMAKEHÄ PÄÄLLÄ VALMIS** 18.33 (junan 179 .app lokit/juna-1.1.179-75fcc2b1, kuvat lokit/linssiseppa2-peking179):
   arkki kaappaukset/linssiseppa2-179-20261010/peking-179-ilmakeha.jpg → PT. Vallihauta 27/47/60 (ennen 17/38/35, oikea 54/80/68):
   ilmakehä sinistää. PT päättää oman vesivärikertoimen tarpeesta.

4. **PEKINGIN PUUT** (PT 19.2x, ennen omistajaa): proto linssiseppa2/kaupunki-puut **243aa94ef** (2c2305012 päällä; KaupunkiPuut +
   KaupunkiPuu.shader + Ydin KaupunkiPuuData, CesiumKaupunki kytkentä, asetukset puut/puukirkkaus; unity 0, L 1347). Peili
   _tyo/linssiseppa2/puut-peili (puut-peking, puukortit Olavinlinnan v44, maa-peking DTM). KÄÄNNÖS JA SIMU VASTA KUN KIIRE OHI (PT):
   skriptit-20261009/kaanna-puut.zsh → aja-pekingpuut.zsh (PUUT-peili, kulmat pko) → arkit-pekingomistaja.py:n malli → PT. Punerrus
   raportoitu PT:lle (vihreä puuttuu, ilmakehä sinistää). Peking v4 -kattojen vienti odottaa PT:n päätöstä (v6k15, muisti).
5. **ND v5d -PARI** kun LR toimittaa (v5c peruttu: säleet ja pyörteet). Malli vuoro-nd5b.sh + arkit-nd5b.py, tekijärivi käsin.
6. **"JOS MAA LAKKAISI PYÖRIMÄSTÄ"** prototyyppi proto linssiseppa2/maa-ei-pyori **b2583090f** (NUI a51a8955d päällä; MeriTasapaino
   Karttasepän taulukolla A 11 004,5 m, MaaEiPyoriKuori + MaaEiPyori.shader + MaaEiPyoriSovitin, komennot maa nopeus|peili|tila;
   unity 0, L 1350). Aineisto Karttasepän (_tyo/karttaseppa/pyoriminen-20261010; gzip peiliin _tyo/linssiseppa2/maa-ei-pyori/peili/).
   Käännös + simu pyydetty: maa-ei-pyori/kaanna-maa.zsh, sitten aja-maa.zsh <SHA> (sk-maa-ipad/-puhelin: 100/50/0/150 %, Atlantti +
   Tyynimeri) → arkki PT:lle. Vertaa vesirajaa KS:n vesimaski-f***-4096.png. Muisti: korkeus R16 16 Mt + BMNG 43 Mt.

## TÄNÄÄN VALMISTA (iltapäivä–ilta)
- Junaan 179 (PT kuittasi, SHA:t Natiivisepälle): ilmakeha-kaikkialla d3885f6d1 (omistaja 16.4x), peking-vesivari efc88563c
  (ämpäri vesi/vari-v1 0dd206f9). PT:n huomio: Prahan etuala viilenee → jos säädät, vain lähietäisyys.
- Kupola: nykyinen jää (PT 16.1x), haara linssiseppa2/cupola3d-koe 503682973 talteen.
- Peking v3 paketti peking3/ktx (oma maa + vesikaivanto + maahelma N/E 400 m), arkit peking-v3-vs-google, peking-sauma-helma,
  peking-v3-vesi-helma400, peking-vesivari.
- Huom: `opas kamera` -komennon katseKorkeus on ELLIPSOIDIkorkeus (Pariisin maa ≈ 79 m); kamera-vapaa 35 m portaalikulma kääntyy
  → portaalit rajataan f40:stä. kuvat-utu.sh: kaksi kaupunkia samassa ajossa voi jäädä aloitusruutuun → yksi kaupunki per ajo.
