# Linnanrakentajan luovutus 16.10.2026 klo 07.00 (Linnanrakentaja, Opus) – Postivahdin kova raja 35 %

Edellinen: `viesti-linnanrakentaja-luovutus-20261015-yo.md`. Viestit AINA id:llä osoitekirjasta `/Users/Shared/Claude/osoitekirja.md`
(PT local_5df52e10…, Postivahti local_a24c43c0…, Valoseppä local_c238f4af…). PT:lle ≤ 3 riviä. OLAVINLINNA TAUOLLA, ei uusia 3D-malleja.
Kirjanpito: `/Users/Shared/Claude/proto-3d/_valmiit/louvre-v1/VERTAILU.md` (kaikki kierrokset k11–k35, kellot, luvut, syyt). Lue sen loppu.

## 1. SEURAAVAKSI
1. **Arvioi Valosepän k35s-pari** (tulossa ~07.05 sinulle ja PT:lle): `proto-3d/_tyo/linssiseppa2/louvre1/louvre-v2f-k35s-pari-kulmaB.jpg`
   ja `louvre-k34s-vs-k35s-zoom-pyramidit.jpg`. Tarkista: kolme pikkupyramidia ehjiä (k34:ssä eteläinen rikki, k35 keskipisteet LiDARista,
   vinoneliö puolilävistäjä 6,5 m), oikean (eteläisen) kolmioaltaan ulkoreunan rosoinen tumma kaista poissa (k35: pääaukon etelälaita −36,0).
   - Jos pikkupyramidi yhä leikkautuu: suurenna kyseisen AUKKO-laatikon kokoa 0,5 m kerrallaan (pidä 0,5 m ruudussa, keskipiste LiDARista).
   - Jos altaan reuna yhä rosoinen: seuraava kiristys (−35,5) alkaa leikata allasta – ehdota PT:lle mieluummin omaa ohutta reunakiveä
     aukon sisälle (huom. k13–k14 opit: monikulmio vastapäivään, normaali ylös, kiveyksen sävy).
2. Raportoi PT:lle ≤ 3 riviä. PT vei k31s:n omistajalle korttina; nyt hienosäätöä: (altaan reuna, kiveyksen kuluma, Sullyn kupoli) – valo/varjot Valosepän.
3. Kun Louvre kuitattu: poista Codex-posti-worktree `/Users/Shared/Claude/wt/linnanrakentaja-posti` (ei tarvita enää).

## 2. TILA (k35, vienti 06.55, `_valmiit/louvre-v1/glb` + `leikkaus_latlon*.json` 714 p.)
- **Muoto:** RAJOISSA kaikissa 7 kulmassa (LiDAR-maskit): K1 92,4 / K2 93,2 / K3 93,5 / K4 93,2 / K5 92,8 / K6 93,3 / K7 90,5 %, korkeusero ≤ 1,4 %.
  K7 (87,9 → 90,5) korjattiin k15–k21: Denonin puolen paviljongit ja siivet LiDARiin (pohjaruudukko malli-h vs nDSM + säteenheitto K7:n
  väärien pikselien osumapintoihin – tehokkain menetelmä; skripti oli scratchpadissa, kuvattu VERTAILU.md:ssä).
- **Julkisivut:** k11 lucarnet, kattopatsaat, piippurivit, paviljonkien veistokset, tummat kaarikäytävät; k24–25 `sivujulkisivu` (ikkunat
  kaikille muille sivuille, aina taso 1); k26–27 Cour Carréen pihan puoli tasolle 2. LOD0 200 k, LOD1 63 k, LOD2 3,2 k kolmiota
  (PT ei ole asettanut rajaa; jos raja tulee, k25 = LOD0 164 k).
- **Sävyt:** k12 Valosepän pelikuvaparista (kivi 147,132,126, kupoli 127,129,145, kiveys 132,124,122). Sävyt sovitetaan VAIN pelikuvaparista.
- **Kiveys ja Googlen aukko:** reunus poistettu (k23); pyramidin länsiaukio omaa kiveystä (`ALLAS_LANSI`, k28); oma Ludvig XIV:n
  ratsastajapatsas (k29–31, Googlen patsaan aukko pois); saumakuvio 0,35 / 6 m + kuluma ±25 % (k29, k32); pikkupyramidien aukot vinoneliöinä
  (`PIENET_PYR`, k34–35). IGN-orton sävykarttaa kokeiltiin kiveykseen ja hylättiin (varjot hallitsivat).
- **Sullyn kupoli** kellomainen + kahdeksankulmainen lyhty (k32–33).
- Lähteiden varmuuskopiot `lahde/louvre.py.ennen-k11 … ennen-k35` (+ louvre_osat.py ennen-k11/k15/k32); kierrosten lähteet `tavoite/kierrokset/kN/`.

## 3. Muut
- Valasluuranko-worktree poistettu 16.10. (junissa 193–196; Postivahdin levysiivous, 0,4 Gi).
- Julkisivun syvyysleivonta (LOD0+LOD1) on Valosepän (PT 23.3x); Valoseppä leipoo jokaisen viennin päälle ja paketoi `v6k18-lv2f-kNs`.

## Opit
- Leikkauksen aukot ja lisämonikulmiot 0,5 m ruutuun: −41,2 irrotti länsikiveyksen saarekkeeksi (k29) → Googlen sotku olisi palannut. Tarkista
  aina vienti.login `LEIKKAUS renkaat` (positiivinen rengas = saareke = virhe).
- Varjossa olevaa kohdetta ei paikanneta ortosta symmetrialla – käytä LiDAR HD:n raakaa nDSM:ää (`_tyo/linnanrakentaja/louvre/lidarhd-mns/mnt-50cm.f32`).
- Kuva-arvioija (Sonnet) väitti katot ikkunattomiksi ja paviljongit liian mataliksi vastoin mittauksia – mittaukset voittavat.
- Blenderin `renderoi`: kamera (u, v, z, suunta, kallistus, fov), suunta 0 = itä, 90 = pohjoinen, kallistus positiivinen = alas.
