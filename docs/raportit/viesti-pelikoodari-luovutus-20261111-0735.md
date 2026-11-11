# Pelikoodari: luovutus 11.11.2026 klo 07.35 (konteksti 27 %)

Edellinen: viesti-pelikoodari-luovutus-20261111-0315.md (5cd3123c2). TÄMÄ KORVAA SEN JONON.
Natiivityöpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu, haara pelikoodari/seinat-taso1, kärki **060fa6ac8** (tausta v132 + kulkukartta).
Työkansio /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/seinat-taso1/. Parikuvat: scratchpadin pari.py-tapa (vierekkäin ≤ 2000 px); itse katsottaessa sips -Z 1000.

## TEHTY
- P1B katsottu, parit KK:lle. KK 07.2x: ovilehdet kelpaa (j1: 5 cm:n raja koskee oikeaa lehteä, rajaus p1b/rajaus-j1-oikea-lehti.png),
  e1–e6 ennalleen, e7 selvitettävä (ks. avoimet).
- Porraskivi2 katsottu (tummennus toimii), KK 07.3x KELPAA JUNAAN → pt-ok-pyyntö PT:lle:
  natiivi-backup **pelikoodari/porraskivi2 = 2e7b93cf6** = juna-224 7b7e12bfd + b6cceaeb7 + 028ec1d6f + 96c6632e4 (912/912, unity 0). ODOTTAA PT:tä.
  KK:n jatkohuomio (ei estä): askelmat erottuvat heikosti; päällisiin hieman vaaleampi sävy myöhemmin, jos tarve.
- Tausta v132 (PT 07.0x): TaustaKansio → v132, `kulkukartta_ajo.py ... --vie` (loki _tyo/pelikoodari/kulkukartta/v132.log). Commit 060fa6ac8.
  Vertailu: kulkutavu eroaa 2352 m² (suurin 1490 m² kohdassa 18,3; 262,6 = lattia7), ovet 245 → 245, 中宫殿 siirtyi 38 m (peitto → nakyva),
  戏衣库 3 m; P1:n kivijalkaovet ennallaan. Mac-pari (JU 07.26, seinat-taso1/v132/ennen|jalkeen, parit v132/pari-*.jpg) katsottu: kaikki OK.
  pt-ok-pyyntö PT:lle: natiivi-backup **pelikoodari/tausta-v132-juna = f7a8e14e7** (= porraskivi2 + v132). Edellyttää v132:ta ämpärissä
  (JU vie, hidas verkko; tarkista curl -sI .../kielletty-tausta-v132/tausta.json = 200 ennen junaa). ODOTTAA PT:tä.
- Koejuuri /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/seinat-taso1/koejuuri-v132 (symlinkit: v129, v132, lähipuut v17, rakennukset v127, ...).

## AVOIMET (järjestyksessä)
1. **e7 房子18 (KK 07.2x "selvitä, älä jätä")**: SELVITETTY, ei vikaa: ovi avautuu pohjoiseen 3,5 m:n kaistalle talon (seinä z 550,3) ja palatsin
   ulkomuurin (v-ulkomuuri-061, z ≈ 555) välissä; kaista kuljettava (z 551–554,5). P1B:n ja v132-ajon kamerat olivat muurin takana.
   JU:n jonossa: seinat-taso1/e7/aja-e7.zsh 2 (2 kuvaa kaistalta: e7-lannesta, e7-idasta) → kun "E7 AJETTU", katso ja lähetä KK:lle
   (pyysi "yksi kuva kauempaa, koko ovi + seinä"). Jos ovi ei näy kaistaltakaan → korjaa (KK: näkymätön kulkuaukko on vika).
2. **LAV:n palauttamat kohdat (07.15/07.2x) M4, M5, M8, E4, E1, M6** – "pelin sokkelo, teidän". v132-ajon mika-rivit (unity.log jalkeen/ennen):
   - E1 (−85,6; 296,6): osumat taustan V4_red-seinä (z 291) ja V4_kujakivi_sokkeli_yla y 1,2; säteellä 5,4–5,6 m myös
     **"v4 palatsi osasarja pursotukset"** ja muurikate → vino harmaa levy + puulattia ovat todennäköisesti osasarjan PURSOTUKSIA (pelin koodi,
     JuoksuSokkeloMaailma.Osasarja; eivät ole kulkukartan osasarja-v15.bin-kolmioissa, joten offline-haku ei löydä niitä).
   - M6: vasemman reunan pystykaista = taustan V4_puukortti-kolmio (pystysuora korttipuu 11 m, (-92,1; 425,9)-(-94,99; 433,81)) → LAV:n/puiden asia, kerro LAV:lle.
   - M4/M5/M8/E4 ylhäältä: keskiosumat taustan lattiaa; katso kuvat v132/jalkeen/m4-*, m5-*, m8-*, e4-* ja etsi mika-listoista pursotukset.
   Seuraava askel: QA:lla pursotukset pois/päälle samasta kamerasta (etsi komento JuoksupeliNakyma.cs "pursot") → jos levy katoaa, korjaa pursotus.
3. **LAV M1** (07.15): kun LAV:n koejuuri-m1 (kk-tausta-1-4 itäseinä 1,3 m länteen) menee junaan → kulkukartta + esto uudelleen, tarkista raja
   x ≈ −87,3 → −88,7 (z 472,7…489). LAV ilmoittaa junashan.
4. ENNALLAAN: B1 bottijumi (−85; 500), eteläosan kartoitus; isolla iPadilla aukiovideo ja renkaiden uusinta.

Ei uusia lupia tarvittu. Asemataulu jäädytetty (ei päivitetty).

## LISÄYS 08.1x
- v132 ämpärissä varmistettu 100/100 sha256 = SHA256SUMS (PK), PT ja JU tietävät.
- JU 08.07: porraskivi2 2e7b93cf6 JUNASSA 224, linkki 224.59 (a4ef0d609) – VALMIS. Tausta v132 f7a8e14e7 pt-ok, menossa 224.60:aan.
- JU 08.21: tausta v132 f7a8e14e7 JUNASSA 224, linkki 224.60 (f4811cf75) – VALMIS (tehtävä A).
