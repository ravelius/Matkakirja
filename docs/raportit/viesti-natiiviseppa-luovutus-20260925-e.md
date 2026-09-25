# Natiivisepän luovutus 25.9.2026 klo 18.5x (e)

Luovuttaja: Natiiviseppä (Opus 5.5, Macin käyttäjä koodaus). Syy: konteksti ~73 % (Fablen käsky). Edellinen: -d.md (klo 15.5x).
Löydöslista: docs/raportit/omistajan-loydokset-b13-20260925.md (Fablen haara). Raamattu: NATIIVI PELI ETUSIJALLE → ESILATAUSPOLITIIKKA
ja LÄMPÖ JA VIRRANKULUTUS NATIIVISSA (uudet tänään).

## Tila

- **Build 15** = proto-master **6ab9d45c** (merge juna c7091b7c) = TF 1.0.15 (käännöspalvelun 4a813e60, sama puu).
- **juna/b13 3d2fad7c** = build 16 -juna (nimi yhä juna/b13). Viimeksi käännetty eebb08f4 (juna f71aa4af, 18.27); 3d2fad7c
  kääntyy vahdilla. Junassa build 15:n jälkeen: pelikoodari/valot-kohdemaa 3cd5259c (117), natiiviseppa/maakunnat-taytto
  f163d393 (viiden sävyn täyttö 34 % + 113 ohuet seepiarajat vain pelaajan maassa, sisäiset departementtirajat pois),
  natiivi-ui/intro-118 b84c8a55 + pelikoodari/intro-118 dfe71370 (avausääni StreamingAssets/mukana), natiivi-ui/maakunnat-114-116
  c875cf31, pelikoodari/esilataaja-1 61f8e258, natiiviseppa/valokeila 07104206 (Valokeila + Linssisiirto) ja
  natiivi-ui/ihmisen-matka-2 15827520 (Linssisepän video: URP-virheet 0, p99 27 ms).
- BUILD 16 -merge masteriin vasta Laitetestaajan savukierroksen jälkeen (sama puu kuin käännöspalvelun testikäännös, SHA Fablelle +
  Julkaisijalle). Unity kiinni viennin ajan.

## Odottavat haarat (EI junassa) — järjestys: lämpöerä ennen 119/120 (Fable)

1. **natiiviseppa/lampo** (agentti työssä worktreessä wt/proto-natiiviseppa-nimikerros): PallonLepo.Lepaa(out syy)/Herata(s)
   (kamera levossa + laatat valmiit + kartan animaatiot) Pelikoodarin lepopiirrolle, `hdr pois|paalle|tila`, päävalon varjot vain
   maamerkkien näkyessä (`varjot …`), accelerometerFrequency 0, Debug.Log vain kehittäjätilassa / simulaattorissa /
   Documents/loki.txt. EI koske KehysMittariin, PalloKierto.PaivitaPeittoon eikä PalloSumennukseen (Pelikoodarin
   pelikoodari/lampo: Ruudunpaivitys omistaa targetFrameRaten ja renderFrameIntervalin; PalloSumennus.PerusSkaala). Kun valmis:
   testikäännös, HDR- ja varjokuvapari (portti, kartta, lento auringolla, radion yövalot), sitten junaan. Ilmoita Pelikoodarille SHA.
2. **natiiviseppa/pohja-buildiin 43eb7ade** (worktree wt/proto-natiiviseppa-saapuminen, vapaa): laattapaketti buildiin (19,5 Mt:
   pohja Z0–Z5, maasto, bmng Z0–Z4, vektorit, napakalotit; Build/laattapaketti, ei gitissä, Rakennus.Kaanna lataa ja kopioi
   Data/Raw:iin), verho-valmius (Valmius.Tasaantunut ≥ 90 % + tasaantunut 300 ms, kevennys verhon ajaksi, diagnostiikka
   `valmius seuraa|auto`), kamera porttiasentoon heti verhon takana + verho odottaa porttia ≤ 5 s (c176137a), lennon pinta
   (Blue Marble) valmiiksi näkymättömänä valintanäkymässä, lähikuvan katto 0,6 s, maasto esilataukseen (e1a888c5; kutsu
   UI/Aloitusnakyma.AloitaPallovalinta → LentoPohjaValmiiksi — Natiivi-UI:n tiedosto, 2 riviä, kerro heille). Käännös
   **9bccbb04** tehty; KYLMÄ MITTAUS TEKEMÄTTÄ: `KYLMA=1 APP=… lokit/natiiviseppa-skriptit/valmius2.sh <kansio>`
   (ui aloitus valinta → ui aloita ateena). Tavoite kylmänä aloitus ≤ 3 s, musta ≤ 2 s. Ennen: 8,0 / 5,0 s; verhot ilman
   pakettia ja esilämmitystä: 4,6 / 3,2 s (lokit/verho-ennen, verho-jalkeen). Videopari mustan kestosta Fablelle.
3. **natiiviseppa/maakunnat-oletus 701e12a5** (113 oletusrajat + 114 Pois): kohdemaan ohuet rajat oletuksena ilman täyttöä,
   täyttö ja korostus valinnasta, MaakunnatSilta antaa MaaKartta.OletusPois = Maakunnat.Pois. Natiivi-UI katselmoi (ok).
   Todennus: käännös juna/b13+natiiviseppa/valokeila+natiiviseppa/maakunnat-oletus oli jonossa (scratchpad keila3), kuvaus
   `APP=… keila.sh <kansio>` → 0-oletusrajat.jpg (koekansio v107 lokit/sisalto-koe-v107: tuotanto yhä 1.41 v117, jossa GRC:llä
   ei maakuntia). Sitten junaan ja SHA Natiivi-UI:lle (todentaa `ui maakunnat …` + Pois).
4. **natiiviseppa/lento-spline f9d785c9** (löydös 120, omistaja arvioi): yksi C2-spline 10 s (kvinttinen Hermite): syöksy
   etuviistoon P(100) kuminauhalla, lähi 1, kaarto nokan edestä P(125→180→235), lähi 2, kiihtyvä irtautuminen, matka, kierto.
   Videopari lähetetty omistajalle: lokit/lento-spline/videopari-ennen-jalkeen-20260925.mp4; käyrät kanavat-ennen-jalkeen.png.
   Fable vei videoparin omistajalle arvioon: ÄLÄ mergeä ennen omistajan vastausta. Merge vasta omistajan/Fablen OK:n jälkeen (Raamatun "kone 2/3 ruudusta" vs löydös 110 "puolet koneesta": nyt 1,9).
5. **natiiviseppa/reiat-119 2c8eafa9** (+ agentti työssä wt/proto-natiiviseppa-loydos46: POHJAPALLO eli pergamentinvärinen
   umpinainen varapinta −3 km maaston alle): maastolaattojen uusinta (`palvelin maastouusinta`, Cesium ei itse yritä uudelleen
   eikä aseta aikakatkaisua), laattarajojen laajennus (`pallo rajat`), `pallo tausta magenta`, `palvelin loki`. Koe
   `KYLMA=1 APP=… reiat.sh <kansio>`: lokit/reiat-119/koe1 — halkeama Alpeilla laattatasojen saumassa (reikarajaus.jpg);
   magentaprosentit sisältävät taivaan, laske pinnan sisäiset (skripti python-osa, taivaskaista pois). Pohjapallon jälkeen
   uusi koe (magenta piilottaa pohjapallon) ja kuvapari. Fable hyväksyi varapallon (18.5x).
6. **natiiviseppa/s2-orbit 517f3f5d** (pysäköity): pilvetön s2-orbit-sarja 19 kaupunkiin; orbitin laatat eivät ehdi Cesiumiin
   ~2 s:ssa (forbidHoles); agentin korjaus lämmitti mustan takana +3 s → ristiriidassa verhotavoitteen kanssa. Suunnittele
   pohja-buildiin-verhotyön jälkeen (esim. esilämmitys valintanäkymässä kuten Blue Marble).

## Lämpöerän laitemittaus (Fable: Natiivisepälle, iPad Pro 13 00008103, Linssiseppä ei käytä)

- Build 15 + pelikoodari/lampo-mittari de8fbec8 (testihaara proto-gitissä **testi/b15-lampo dd6a0237**, poista kun valmis):
  lokit/lampo/b15-ipad13 — 11 min thermal 2 (serious) alusta loppuun, akku 85 % "Charging", kehysaika 60–70 ms myös levossa.
  EI VERTAILUKELPOINEN: laite.sh tekee **Development**-käännöksen (MATKAKIRJA_KEHITYS=1) ja laite oli kuuma + kaapelissa.
- Seuraavaksi: Release-laitekäännös (laite.sh ilman MATKAKIRJA_KEHITYS=1, tee muunnelma) build 15 + mittari ja build 16 +
  lämpöerät, laite jäähtyneenä (thermal 0–1 alussa), `lampojakso.sh lampo/<nimi>` (10 min: aloitus, Ateena, lehti 3 min,
  radio 2 min, lepo). Rivit "MATKAKIRJA lampo {…}" konsolista. Fable 18.5x: kaapeli saa jäädä, mittarit thermalState ja
  kehysaika, akkuprosentti pois. Tulos: docs/raportit/lampo-mittaus-20260925.md (60–70 ms levossa kirjattu löydökseksi).

## Avoimet

- Siirtoseppä: 1.42 tuotantoon (Fablen lupa 17.58, ei vielä tuotannossa: v117 = 1.41) ja 1.43 = maakuntarajojen alueisiin
  `vari` webin <ISO>.json:sta (kysyy kuittauksen ennen tuotantoa); natiivi lukee kentän (maakunnat-taytto).
- Linssiseppä: Ihmisen matka II erän 4 äänimaisemat (6d16dbe1) tulevat merge-pyyntönä; sumu (KarttaKerrokset.Sumu: korkeudet,
  tiheys, kesto, ajelehtiminen, väri) on luvattu erikseen valokeilan jälkeen.
- Pelikoodari: PallonLepo junaan (lupaus), mittari de8fbec8 voi mennä junaan.
- ±180° maakuntasauma: Karttasepän datakorjaus myöhemmin (Fable), ei koodilla.
- Opit: proto-kaanna.sh ei yhdistä testiajurien LAHTEET-listoja (juna-merge.sh yhdistää) → yhdistelmäkäännös kaatuu kaanna.sh-
  ristiriitaan; mergeä juna haaraan ensin. Älä jonota omia testikäännöksiä junan kääntämättömän commitin edelle (vahti väistää
  10 min). Laitteen komennot: peli-komento `lue-lehti <kaupunki>`, `puhe ohita` (saapumisen kuvasarja), linssi-komento
  `linssi radio`, `radio aani 0`.

## Skriptit (proto-3d/lokit/natiiviseppa-skriptit)

b15kuvat.sh, maakuntakuvat.sh, keila.sh (valokeila + linssisiirto + oletusrajat), reiat.sh (magenta, KYLMA=1), valmius.sh /
valmius2.sh (verhot kylmänä, video), orbitvideo.sh, lampojakso.sh (laite), laite.sh (Development!). Scratchpadin .app-kopiot
katoavat sessiosta: käännä uudelleen (proto-kaanna.sh, kopioi .app talteen heti).

## Worktreet (katto 3)

wt/proto-natiiviseppa-nimikerros (lampo-agentti), -loydos46 (pohjapallo-agentti, reiat-119), -saapuminen (pohja-buildiin, vapaa).
Unity-työkopio Matkakirja-proto: master puhdas.
