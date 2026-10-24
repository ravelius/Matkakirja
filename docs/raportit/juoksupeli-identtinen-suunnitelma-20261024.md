# Juoksupeli identtiseksi havainnekuvien kanssa – suunnitelma (Lavastaja vetää, VS valo; 24.10.2026)

Omistaja 14.51: "Saako kaiken tehtyä identtiseksi? Pienemmät laatat, kivi korotukset yms? Ja miten sen saa tehtyä kuitenkin fiksusti
optimoidusti niin että ulkoasu pysyy kuitenkin identtisenä mallin kanssa?"

Vastaus lyhyesti: **kyllä, katutasolla lähes identtiseksi** (havainnekuvat 01, 02, 05; 03 ja 06 aukiot), kun pienet toistuvat yksityiskohdat
tehdään *pintakuviona + syvyysvarjostuksena* tai *instansseina*, ja valo lasketaan valmiiksi. Ilmakuva 07 on jo nyt pohjakartaltaan oikea
(pohja pysyy oikean palatsin mukaisena, 20.10.); sen identtisyys tulee katoista, puista ja valosta. Tekotavat ja budjetit:
docs/tuotanto/tekotavat/3d-ja-kuvat.md (kohta 3: LOD0 ≤ 250 k/maamerkki, ≤ 300 primitiiviä/tiedosto, kuvat ≤ 2048 px, huoneet 1024 px).

Lyhenteet: LR = Lavastaja (geometria, glb), VS = Valoseppä (varjostimet, valo, pinnat), PK = Pelikoodari (pelilogiikka, kytkennät),
Codex = kuvat ja mallit (PT tilaa), NS = Natiiviseppä (käännös, GPU-mittaus).

## 1. Kohta kohdalta

| # | Havainnekuvassa | Peli nyt (juna 211 -ehdokas) | Tekotapa (optimoitu) | Tekijä | h | Juna |
|---|---|---|---|---|---|---|
| 1 | **Pienet vaaleat laatat limittäin** (01, 02, 05: ~0,6 × 0,4 m, limitys, saumat, kuluma) | 1,2 m:n rivit, vaaleanharmaa, isot laatat | Pintakuvio maailman koordinaateissa: laattakoko 0,6 × 0,4, limitys ½, sauma 1,5 cm + syvyysvarjostus (parallax/normaali saumasta), sävyhajonta per laatta. 0 kolmiota | VS | 3 | 211 |
| 2 | **Korotetut kivireunat seinien vierellä** (01, 02: ~0,5 m leveä, 15 cm korkea reunus, viiste) | taustassa osin, avoimissa ei | Geometria: reunus muurikatteen jaksoihin (muurit) ja huoneiden ulkoseinille (avoimet) yhtenä nauhana; LOD0 tausta-paloissa. ~6 k kolmiota | LR | 3 | 211 |
| 3 | **Portaat ovien edessä** (01: 1–2 askelmaa + kivilaatta) | ei | Geometria avoimiin ovipaneeleihin (jaettu verkko, instanssit): 2 askelmaa 2,4 m leveä; törmäys ei muutu (askelma 12 cm, juoksija ylittää) | LR (+PK: reitin korkeus tarkistus) | 2 | 211 |
| 4 | **Kivijalat** (kaikki: vaalea lohkokivi, ~1/4 korkeus, ulkoneva kansi) | 1,1 m / 1,0 m, harmaa, kivi.jpg | Korkeus valmis (v24/v20). Vaaleus × 1,28 ja lohkosaumat syvyysvarjostuksella (VS:n k13). Kansi 12 cm ulkonevaksi listaksi viisteellä | VS + LR | 2 | 211 |
| 5 | **Kultaiset kattotiilet ja kourut** (01, 05: puolipyöreät kourutiilet, tiilipäät räystäällä) | sileä keltainen kate (Codexin katot, muurikate) | Pintakuvio + syvyysvarjostus kateen (kourut 0,2 m välein katon lappeen suuntaan, UV:ttomana kolmitasoprojektiona); räystäälle tiilipäät instansseina (nyt LOD0:ssa 40 k laatikkoa → 1 instanssiverkko) | VS (kuvio) + LR (tiilipäät) | 4 | 211 (muurit) / 212 (hallit) |
| 6 | **Harjakoristeet** (chiwen-päätteet, eläinrivit räystäskulmissa) | puuttuu (VS:n pyyntö 23.10.) | Codex/Tripo: chiwen + eläinrivi (≤ 3 k kolmiota) → instanssit jokaisen harjan päähän ja räystäskulmaan (sijainnit taustan harjoista luodattuina) | Codex (malli) + LR (sijoitus) | 3 + Codex | 212 |
| 7 | **Koristevyöt** (leveä sinivihreä palkkimaalaus kultareunoin, konsolit) | valmis muureissa ja huoneissa (#923), taustan halleissa ohut turkoosi raita | Taustan hallien V4_teal-vyöhön sama palkkimaalaus (UV kolmitasoprojektiona varjostimessa) | VS | 2 | 211 |
| 8 | **Nuppiovet** (05: portin 9 × 9 nastaa; 01: huoneen puuovet renkain) | portti valmis (v15), huoneiden ovet kiinni (v21, PK avaa) | Valmis; lisäksi taustan hallien ovikohtiin sama puuovi pintakuvana (ei aukkoja) | LR | 2 | 211 |
| 9 | **Ikkunaristikot** (菱花, ruskea kehys syvennyksessä) | huoneissa alfa-ristikko (#924); taustan halleissa 5 + 5 rimaa geometriana (260 k kolmiota!) | Taustan halleihin sama alfa-ristikko yhtenä nelikulmiona → −250 k kolmiota LOD0:sta, ulkoasu sama | LR | 2 | 211 |
| 10 | **Puut muurien takana** (01, 02, 07: pyöreälatvaiset lehtipuut pihoilla) | taustan lehvästöpallot (Codex), harvassa | Codex/Tripo: 2–3 puulajia (≤ 2 k kolm.) + kuvalehvästö kaukana (billboard LOD2); sijoitus pohjan pihoille tiheydellä kuten 07 | Codex + LR | 3 + Codex | 212 |
| 11 | **Lämmin matala valo, lehvästön varjot** (01, 02, 05: aurinko ~30°, terävät varjoreunat, puiden varjokuviot) | VS:n k13: aurinko 200°/30° | Valmiiksi laskettu valo: muurien ja talojen varjot leivottuina valokarttaan staattisille osille (aurinko kiinteä) + reaaliaikainen varjo vain keisarille ja lähimmille; lehvästön varjo projisoituna kuviona (gobo) | VS | 6 | 211 (aurinko, varjot) / 212 (leivonta) |
| 12 | **Taivas** (syvä sininen, kumpupilvet) | VS:n päivätaivas (#919) | Valmis VS:llä | VS | – | 211 |
| 13 | **Aukiot ja portaat** (03, 06: marmoriterassit, kaiteet, keskiportaiden kaiverrettu laatta) | marmori tasavärisenä, kaiteet osin (muurikate v4 jalustat) | Kaiteet ja portaat tarkkoihin malleihin (G, F) Lavastajan v-sarjaan; kaiverrus pintakuviona | LR + VS | 4 | 212 |
| 14 | **Meridiaaniportin edusta** (06: kilpihuomio, U-muuri, paviljongit) | malli A v15 | Paviljonkien räystäille harjakoristeet (kohta 6), U-muurin palkkivyö (kohta 7) | LR + VS | 1 | 212 |

## 2. Optimointi niin, että ulkoasu pysyy identtisenä

1. **Toisto pintaan, ei kolmioihin:** laatat, saumat, kourutiilet, lohkokivi ja palkkimaalaus maailman koordinaateissa varjostimessa
   (syvyysvarjostus antaa kohokuvion ilman geometriaa). Kolmioita vain siluettiin vaikuttaville osille (reunukset, portaat, pylväät, räystäät).
2. **Instanssit:** saman muotoiset osat (tiilipäät, konsolit, harjakoristeet, ovet, ikkunat, puut) yhtenä verkkona GPU-instansseina;
   sijainnit luodataan pohjasta/taustasta (kuten muurikate). Korvaa nykyiset 40 k + 21 k erillistä laatikkoa.
3. **LOD:** yksityiskohdat vain LOD0:ssa (≤ 150 m), kuvio häivytetään etäisyyden mukaan; LOD1/2 entisellään. Ristikot alfakuvana (−250 k).
4. **Valmiiksi laskettu valo:** aurinko on kiinteä → staattisten muurien ja talojen varjot ja nurkkavarjostus leivotaan; vain keisari ja
   liikkuvat (ovet) saavat reaaliaikaisen varjon. Tämä on suurin yksittäinen ruutuajan säästö ja tuo havainnekuvan pehmeät nurkkavarjot.
5. **Mittaus:** NS mittaa iPadilla jokaisen junan (raja 20 ms); tavoite LOD0-pala ≤ 150 k kolmiota (nyt raskain 137 k, ristikkojen
   kevennyksen jälkeen ~90 k).

## 3. Järjestys ja aikataulu

**Juna 211 (iso osa):** 9 ristikot alfaksi (LR 2 h) → 1 laatat (VS 3 h) → 2 kivireunat (LR 3 h) → 3 portaat (LR 2 h) → 4 kivijalan viimeistely
(VS+LR 2 h) → 7 hallien palkkivyö (VS 2 h) → 8 hallien ovikuvat (LR 2 h) → 5 muurien tiilipäät instansseiksi + katteen kourukuvio (LR+VS 4 h)
→ 11 aurinko ja reaaliaikaiset varjot (VS). Yhteensä LR ~13 h, VS ~10 h.

**Juna 212 (loput):** 6 harjakoristeet (Codex-tilaus + LR 3 h), 10 puut (Codex + LR 3 h), 11 valon leivonta (VS 6 h), 13 aukiot ja portaat
(LR+VS 4 h), 14 Meridiaaniportin edusta (1 h), 5 hallien kattokuvio.

**Codex-tilaukset PT:lle (212):** chiwen-harjapääte + eläinrivi (1 malli, ≤ 3 k kolm.), 2–3 lehtipuuta + kaukolehvästön kuva,
kaiverrettu keskiportaan laatta (kuva 2048 × 1024).

**Riippuvuudet:** VS:n laatta- ja kattokuvio eivät tarvitse LR:ää; LR:n reunukset ja portaat vaativat PK:lta reitin korkeuden tarkistuksen
(askelma 12 cm). Pelikuvaparit kaikista kolmesta kulmasta jokaisen junan jälkeen (sääntö 7.32: selite omalla raidalla).
