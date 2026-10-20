# Pelikoodarin luovutus 20.10.2026 klo 08.37 (Postivahdin KOVA RAJA 38 %)

Edellinen: viesti-pelikoodari-luovutus-20261020-0800.md (sen ENSIN-kohta "palatsi v2" TEHTY). Rooli: Pelikoodari (Opus, high).
Proto-repo paikallinen (ei pushia), worktree /Users/Shared/Claude/wt/proto-pelikoodari-kerattavat-206, haara
**pelikoodari/palatsi-208 = 8b20d8a60** (puhdas; vain Peli-testit/Testit/TilapainenVerkkoVienti.cs seurannan ulkopuolella, EI committia).

## KÄYNNISSÄ NOLLAUSHETKELLÄ
- Ei ajoja. JU kääntää **8b20d8a60** → _tyo/pelikoodari/palatsi-208v2-app (L2, alkaa kun NS:n Mac 207 vapauttaa lukon).
  d4d014576-appia EI ajeta (JU). JU lähettää SIMU NYT -rivin 8b20d8a60:n KÄÄNNETTY-rivin jälkeen.

## ENSIN
1. JU:n SIMU NYT → `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/simu-sokkelo-206/aja-palatsi-208v2.zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/palatsi-208v2-app/Matkakirja3D.app`
   (sk-palatsi-208v2.txt: V1 Meridiaaniportti, V2–V3 juoksu verkossa + video, V4 G:n terassi, V5 asuinpiha 1; mallit ämpäristä = oletus).
   Valmis → **SIMU VAPAA → JU** (VS ajaa samalla appilla perään). Kuvat täysikokoisina läpi: Puyi näkyvissä, rakennukset paikallaan
   (ei kiertovirhettä, ei peilausta), F:n portaat ja G:n terassi korkeudella, ei vettä laattojen päällä. Sitten V1–V5 + video PT:lle (≤ 3 riviä).
2. Jos kuvissa vika: tarkista ensin muunnos JuoksuSokkeloMaailma.Palatsi.cs (pohja → Maailmaan → Unity (x, y, −z), z-peilaus takaisin
   skaalalla (1, 1, −1)) ja LOD-vaihto (PaivitaPalatsi).

## TEHTY TÄLLÄ VUOROLLA (testit 672/672, unity-tarkistus 0)
- 9a814d18b **JuoksuPalatsiVerkko** (Peli, puhdas): pohja rasteriksi 0,5 m → kujien keskilinjat + päärakennusten edustat/oviakselit →
  jatko avoimen tilan läpi → leikkaukset risteyksiksi; muurit ≤ 3 m, ylitys ≤ 5 m automaattisina portteina (46), umpikujat pois, osat ≤ 20 m;
  Lavastajan rakennukset.json:n reitit kaistoiksi ja profiileiksi (F 3,9 m, G 8,1–9,0 m, Taihedianin valtaistuimen kierto lännestä),
  korkealla ei risteyksiä. JuoksuV4Reitti.SokkeloVerkko → JatkaVerkko (osa = solmuväli, sisältö pituuden mukaan, reitillä profiili + kevyt sisältö).
  Oikealla pohjalla 3203 solmua, 97 % vapaasta alasta, 180 ms. Testi JuoksuPalatsiTestit.VerkkoAvoimistaTiloista.
- cbb1e82c0 Unity: JuoksuSokkeloMaailma.Palatsi.cs (partial): kielletty-tausta-v2 (20 palaa) + kielletty-rakennukset-v6 (11 mallia) yhden
  muunnoksen alle, LOD2 ensin, LOD 150/450 m, mallien katot KattoHaivytykseen; v2:ssa ei ruudukkoa eikä rengasta. QA `palatsi v2 0|1`,
  `palatsi mallit <polku>|oletus`, `palatsi kulmatornit 0|1`.
- 10ce186c5 v1-ruudukko: vesi ennen aukiota (VS). d4d014576 käännösääni kaanto-v1 (Äänittäjä; taso = askeleet 0,32, kysytty haluaako 0,45).
- 094481ad2 **kanoninen kulma 2,0335°** (PT 08.3x "Kyllä"; KS:lle kerrottu, KS kirjasi LUEMINUT:iin) → Taihedianin ajautuma 0.
- a56e22c61 merge VS kk-vesi-208 32a3c10a7 (v2: vedet laatoista, maa reiällä, horisontti −4,5) + pinnat-208 1dfc80671.
- 8b20d8a60 kulmatorni v1b koodissa, OLETUKSENA POIS (tausta-v2:ssa Pekingin omat tornit, 25 m); pohja kk-pohja-v1d (muuri 10 m).
- Ämpärissä (JU 08.29/08.31): maailma-v4/kielletty-tausta-v2/, kielletty-rakennukset-v6/, kk-pohja-v1d/.
- Pohjapiirrokset: proto-3d/_tyo/pelikoodari/palatsi-208/pohjapiirros-palatsi-v2.png, -asuinpiha1.png; tila V2-SUUNNITELMA.md:n lopussa.

## AVOIMET
- Lavastaja: tausta-v3 (E:n neljä kulmaa tyhjennetty) → vaihda TaustaKansio ja Kulmatornit = true.
- Äänittäjä: vastaus käännösäänen tasosta (0,32 vai 0,45).
- KS:n 21 "muuria" 8–80 m paksuja (rajattu 3 m:iin); muurien sulkemat yksittäiset kujat puuttuvat verkosta (3 %).
- Nimet (nimet.json) nostoiksi: UI-pohja PT:ltä. 60 fps iPadilla LT:llä (~1M kolmiota ladattuna).
- Juna 208: f6e92d277 (ovet/halli) PT:llä NS:lle; palatsi-208 = palatsi v2 junaan vasta KK:n OK:n jälkeen simukuvista.
- Ennallaan: hurraa-isommat odottaa omistajaa, iPadin loppukortti = PT:n UI-pohjakysymys.
