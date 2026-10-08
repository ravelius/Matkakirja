## 2026-10-08 — SISÄLTÖKIRJURI → CODEX: kuumailmapallon latauskuva UUDESTAAN KAHTENA KERROKSENA (heiluva pallo; PÄIVITETTY: KOLME KERROSTA, ks. päivitys alla)

Omistaja (Päätoimittajan välittämänä 8.10.2026 klo ~08.5x) haluaa latauskuviin kevyen animaation: **pallo heiluu hitaasti**. Siksi PR #4143:n latauskuva (kuumailmapallo, fotorealistinen havainnekuva; kolme rajausta samasta masterista) tehdään uudestaan **kahtena kerroksena**, joiden päällekkäin asettelu antaa saman kuvan kuin #4143:ssa. Tyyli, paletti, sävyt, kuvakulma, valo ja turvavyöhykkeet kuten `posti/sisaltokirjuri-havainnekuva-latauskuva-kuumailmapallo-20261007.md` ja toimitus `posti/codex-fable-latauskuva-kuumailmapallo-20261007.md`. FOTOREALISTINEN, ei tekstiä, ei ihmisiä, ei kehystä; PNG Description/Source: "Havainnekuva. Tekoälyllä tuotettu, ei valokuva."; sRGB. **Vain Eurooppa/yleinen aihe: ei nimikohteita.**

## PÄIVITYS 8.10.2026 (Päätoimittaja, Natiivi-UI:n tarkennus): KOLME KERROSTA, ei kahta

Kerroksia on **kolme** (kaikki kolme rajausta kuten nykyisissä: iPhone 1290 × 2796, iPad pysty 2048 × 2732, iPad vaaka 2732 × 2048; sama rajaus kuin #4143:ssa, kerrokset osuvat toisiinsa pikselilleen):
- **(a) Tausta ilman palloa** (kuten alla "Kerros 2").
- **(b) Kupu alfalla** (RGBA PNG): vain pallon kupu eli kuori, verkko ja vaakarengas sekä kantorengas/alareunan rengas. **Ilman koria ja ilman köysiä.**
- **(c) Kori alfalla** (RGBA PNG): vain kori, **ilman köysiä ja ilman kupua**. Kori on omana kerroksenaan, koska peli piirtää **4 köyttä vektoreina korin neljästä kulmasta kuvun alareunaan**; köysiä ei piirretä kuviin (ei myöskään ankkuriköyttä).
- Kupu ja kori sijaitsevat kuvassa täsmälleen samassa paikassa ja asennossa kuin yhdistelmänä #4143:ssa, mutta niiden väliin jää (köysien kohdalle) tyhjä läpinäkyvä väli; älä täytä sitä. Korin neljä yläkulmaa ja kuvun alareunan reuna näkyvät selvästi niin, että niihin voi kiinnittää viivat.
- Kummankin alfakerroksen ympärillä noin 3 % läpinäkyvää marginaalia heilahdusta varten. Aito alfa, siistit reunat (ei haloa/värireunusta; tarkista tumman ja vaalean taustan päällä).
- Generointimäärä: **3 kerrosta samasta masterista**, koot teknisellä rajauksella ja skaalauksella; ei lisävariantteja.
- Manifestiin per rajaus: kummankin alfakerroksen sijainti (x, y, leveys, korkeus), **korin 4 yläkulmaa** ja **kuvun alareunan 4 köysikiinnityskohtaa** pikseleinä (Sisältökirjuri mittaa ne uudelleen ja muuntaa osuuksiksi 0–1) sekä esikatselu, jossa kolme kerrosta on koottu päällekkäin ja kupu ja kori heilahtavat eri asentoihin.

Alla oleva alkuperäinen kahden kerroksen kuvaus on voimassa muuten, paitsi että "kerros 1" (pallo ja kori yhdessä) korvataan kerroksilla (b) ja (c).

---

### Kerros 1: pallo ja kori ilman taustaa (aito alfa)
- Pallo (kuori, verkko, vaakarengas, kantorengas) ja kori kokonaan, **ilman köyttä** (peli piirtää köyden viivana; ei ankkuriköyttä, ei roikkuvia naruja kuvaan), ilman varjoa maahan/taivaalle, ilman savua tai muuta ympäristöä.
- **Aito alfakanava** (RGBA PNG, ei pelkkää mustaa/valkoista taustaa eikä "läpinäkyvyyttä" shakkikuviona kuvassa). Reunat siistit: ei haloa, ei värireunusta (decontaminate / ei taustan väriä reunoilla), pehmeä mutta tarkka reuna; verkon ohuet langat saavat olla puoliläpinäkyviä, mutta eivät saa jättää taustan väritystä. Tarkista reunat sekä tumman (`#1d1610`) että vaalean taivaan päällä.
- Pallon ympärille **noin 3 % läpinäkyvää marginaalia** (kuvan leveydestä/korkeudesta) heilahdusta varten; älä rajaa pallon reunaa kiinni kuvan reunaan.
- Sama muoto, väritys, koko ja valo kuin #4143:n pallossa (valo tulee samasta suunnasta; sama pallon sijainti ja mittakaava masterikuvassa).

### Kerros 2: tausta ilman palloa
- Sama kuva kuin #4143:n tausta mutta **pallo ja kori poistettuna**: sama kuvakulma, sama valo, samat pilvet ja kaupungin siluetti, sama tumma alaosa. Pallon kohdalla taivas jatkuu uskottavasti (pilvet/taivas rakennettuna pois poistetun pallon tilalle), jotta pallolle jää tilaa heilua ±(noin 4–6 % kuvan leveydestä) ilman että taustassa näkyy jälkiä, aukkoa tai vääristymää.
- Ei köyttä taustassa (köysi poistettu myös taustasta, jos se oli #4143:ssa).
- Pääkohteen turvavyöhykkeet ja tumma latausalue (alin 15 % L* ≤ 12) kuten #4143:ssa.

### Koot ja asettelu (sama koko ja kuvasuhde kuin #4143:ssa)
- Jokaiselle kolmelle rajaukselle sekä tausta että pallokerros: iPhone 1290 × 2796, iPad pysty 2048 × 2732, iPad vaaka 2732 × 2048. **Sama rajaus kuin #4143:ssa**, jotta kerrokset osuvat toisiinsa pikselilleen. Pallokerros annetaan joko täysikokoisena läpinäkyvänä PNG:nä (koko kuin tausta, pallo täsmälleen samassa paikassa kuin #4143:ssa) tai tiiviinä spritenä + manifestiin pallon vasemman yläkulman sijainti ja mittakaava (x, y, leveys, korkeus pikseleinä per rajaus). Kerro valittu tapa manifestissa; täysikokoinen täysi-RGBA on ensisijainen jos tiedostokoko pysyy kohtuullisena, muuten sprite + sijainti.
- Pallon **kiinnityspiste** (kohta jossa köysi lähtee korin alta/pallon alta, pikseleinä per rajaus) ja pallon **heilahduksen pivot-piste** (pallon ylin kohta tai köyden kiinnityskohta) manifestiin, jotta peli osaa heilauttaa pallon ja piirtää köyden viivana.
- Generointimäärä: **2 kerrosta samasta masterista** (kerros 1 ja kerros 2); koot saadaan teknisellä rajauksella ja skaalauksella kuten #4143:ssa, ei uusia luovia generointeja. Lisävariantteja ei.

### Toimitus
R2 `julisteet/latauskuva-kuumailmapallo-kerrokset/20261008/…png`, esikatselu (pallo tausta päällä + testi heilahduksesta, esim. kolme asentoa vierekkäin), manifesti `posti/kuvatoimitus-latauskuva-pallo-kerrokset-20261008.json` (url, r2Key, sha256, mitat, pallon sijainti/kiinnityspiste/pivot per rajaus, generationPrompt, viitteet), kuittaus `posti/codex-fable-latauskuva-pallo-kerrokset-20261008.md`. Ei main-mergeä, versionnostoa eikä julkaisua Codexilta; Sisältökirjuri tarkistaa alfan, reunat ja valon silmin ja välittää polut Natiivi-UI:lle ja Linssisepälle.
