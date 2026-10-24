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

| # | Havainnekuvassa | Peli nyt | Tekotapa (optimoitu) | Tekijä | h |
|---|---|---|---|---|---|
| 1 | **Pienet vaaleat laatat limittäin** (01, 02, 05: ~0,6 × 0,4 m, limitys, saumat, kuluma) | 1,2 m:n rivit, vaaleanharmaa, isot laatat | Pintakuvio maailman koordinaateissa: laattakoko 0,6 × 0,4, limitys ½, sauma 1,5 cm + syvyysvarjostus (parallax/normaali saumasta), sävyhajonta per laatta. 0 kolmiota | VS | 3 |
| 2 | **Korotetut kivireunat seinien vierellä** (01, 02: ~0,5 m leveä, 15 cm korkea reunus, viiste) | taustassa osin, avoimissa ei | Geometria: reunus muurikatteen jaksoihin (muurit) ja huoneiden ulkoseinille (avoimet) yhtenä nauhana; LOD0 tausta-paloissa. ~6 k kolmiota | LR | 3 |
| 3 | **Portaat ovien edessä** (01: 1–2 askelmaa + kivilaatta) | ei | Geometria avoimiin ovipaneeleihin (jaettu verkko, instanssit): 2 askelmaa 2,4 m leveä; törmäys ei muutu (askelma 12 cm, juoksija ylittää) | LR (+PK: reitin korkeus tarkistus) | 2 |
| 4 | **Kivijalat** (kaikki: vaalea lohkokivi, ~1/4 korkeus, ulkoneva kansi) | 1,1 m / 1,0 m, harmaa, kivi.jpg | Korkeus valmis (v24/v20). Vaaleus × 1,28 ja lohkosaumat syvyysvarjostuksella (VS:n k13). Kansi 12 cm ulkonevaksi listaksi viisteellä | VS + LR | 2 |
| 5 | **Kultaiset kattotiilet ja kourut** (01, 05: puolipyöreät kourutiilet, tiilipäät räystäällä) | sileä keltainen kate (Codexin katot, muurikate) | Pintakuvio + syvyysvarjostus kateen (kourut 0,2 m välein katon lappeen suuntaan, UV:ttomana kolmitasoprojektiona); räystäälle tiilipäät instansseina (nyt LOD0:ssa 40 k laatikkoa → 1 instanssiverkko) | VS (kuvio) + LR (tiilipäät) | 4 |
| 6 | **Harjakoristeet** (chiwen-päätteet, eläinrivit räystäskulmissa) | puuttuu (VS:n pyyntö 23.10.) | Codex/Tripo: chiwen + eläinrivi (≤ 3 k kolmiota) → instanssit jokaisen harjan päähän ja räystäskulmaan (sijainnit taustan harjoista luodattuina) | Codex (malli) + LR (sijoitus) | 3 + Codex |
| 7 | **Koristevyöt** (leveä sinivihreä palkkimaalaus kultareunoin, konsolit) | valmis muureissa ja huoneissa (#923), taustan halleissa ohut turkoosi raita | Taustan hallien V4_teal-vyöhön sama palkkimaalaus (UV kolmitasoprojektiona varjostimessa) | VS | 2 |
| 8 | **Nuppiovet** (05: portin 9 × 9 nastaa; 01: huoneen puuovet renkain) | portti valmis (v15), huoneiden ovet kiinni (v21, PK avaa) | Valmis; lisäksi taustan hallien ovikohtiin sama puuovi pintakuvana (ei aukkoja) | LR | 2 |
| 9 | **Ikkunaristikot** (菱花, ruskea kehys syvennyksessä) | huoneissa alfa-ristikko (#924); taustan halleissa 5 + 5 rimaa geometriana (260 k kolmiota!) | Taustan halleihin sama alfa-ristikko yhtenä nelikulmiona → −250 k kolmiota LOD0:sta, ulkoasu sama | LR | 2 |
| 10 | **Puut muurien takana** (01, 02, 07: pyöreälatvaiset lehtipuut pihoilla) | taustan lehvästöpallot (Codex), harvassa | Codex/Tripo: 2–3 puulajia (≤ 2 k kolm.) + kuvalehvästö kaukana (billboard LOD2); sijoitus pohjan pihoille tiheydellä kuten 07 | Codex + LR | 3 + Codex |
| 11 | **Lämmin matala valo, lehvästön varjot** (01, 02, 05: aurinko ~30°, terävät varjoreunat, puiden varjokuviot) | VS:n k13: aurinko 200°/30° | Valmiiksi laskettu valo: muurien ja talojen varjot leivottuina valokarttaan staattisille osille (aurinko kiinteä) + reaaliaikainen varjo vain keisarille ja lähimmille; lehvästön varjo projisoituna kuviona (gobo) | VS | 6 |
| 12 | **Taivas** (syvä sininen, kumpupilvet) | VS:n päivätaivas (#919) | Valmis VS:llä | VS | – |
| 13 | **Aukiot ja portaat** (03, 06: marmoriterassit, kaiteet, keskiportaiden kaiverrettu laatta) | marmori tasavärisenä, kaiteet osin (muurikate v4 jalustat) | Kaiteet ja portaat tarkkoihin malleihin (G, F) Lavastajan v-sarjaan; kaiverrus pintakuviona | LR + VS | 4 |
| 14 | **Meridiaaniportin edusta** (06: kilpihuomio, U-muuri, paviljongit) | malli A v15 | Paviljonkien räystäille harjakoristeet (kohta 6), U-muurin palkkivyö (kohta 7) | LR + VS | 1 |

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

## 3. Järjestys ja kokonaisarvio (OMISTAJA 14.55: kaikki 14 kohtaa samaan junaan 211, ei jakoa)

Kokonaisarvio **LR ~33 h + leivonnan laskenta ~4 h, VS 23–29 h** (VS:n erittely: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/
juoksupeli-identtinen-valo-ja-pinnat-20261024.md), Codex-toimitukset (harjakoristeet, puut, kaiverrus; tilaus b2b8d8eac) rinnalla.
Kalenteriaika 2–3 päivää; jos venyy, rivi PT:lle heti.

Järjestys:
1. 9 ristikot alfakuvaksi (LR, tehty), 2 kivireunat ja 3 portaat (LR, tehty), 1 laatat (VS, tehty k14), 11 aurinko ja reaaliaikaiset varjot (VS, tehty k13)
2. 4 kivijalka: VS saumojen syvyysvarjostus + LR kansi ulkonevaksi listaksi (LR 1 h)
3. 7 hallien palkkivyö: LR antaa taustan V4_teal-vyölle UV:n ja palkkimaalauskuvan glb:ssä (LR 2 h)
4. 8 hallien ovikuvat (LR 2 h)
5. 5 muurien tiilipäät instansseiksi ja kourukuvion tarkistus (LR 2 h, VS tarkistus)
6. 11 valon leivonta: LR leipoo Blenderissä (Cycles) pelkän valon (aurinko 200°/30°, päivätaivas, maan heijastus, nurkka- ja auringon
   varjot) RGBM-atlakseen TEXCOORD_1:lle: taustan LOD0-palat, rakennukset, avoimet, muurikate; VS lukija + varjostimet (LR 8 h + laskenta ~4 h)
7. 13 aukiot ja portaat (LR 4 h + VS kaiverrus), 14 Meridiaaniportin edusta (LR 1 h), 5 hallien tiilipäät (LR 2 h)
8. 6 harjakoristeet ja 10 puut heti Codexin toimituksesta (LR 3 + 3 h)

**Codex-tilaukset (b2b8d8eac):** chiwen-harjapääte + eläinrivi (≤ 3 k kolm.), 2–3 lehtipuuta + kaukolehvästön kuva, kaiverrettu keskiportaan laatta.

**Riippuvuudet:** reunat ja askelmat ovat vain kuvaa (ei törmäystä, PK tiedoksi). Pelikuvaparit kaikista kolmesta kulmasta (sääntö 7.32).

## Tila (Lavastaja)
- 24.10. 15.1x: kohdat 9, 2, 3 tehty – tausta-v26 (ristikot alfakuvana MASK, LOD0 1,45 M → ~1,15 M kolmiota; kivireunus muurien ja
  hallien vierellä), avoimet-v22 (kivireunus + ovien askelmat). Proto lavastaja/muoto-210 9759132af (tarkista.sh 0). Paketit
  _valmiit/juoksupeli-kk-tausta-peking-v26-vienti-20261024 (9196a1055309), juoksupeli-avoimet-v22-vienti-20261024 (e4322cf65806).
  Kuva: /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/tavoiteluuppi-k1/identtisyys-2-3-9.jpg. PK: reunus ja askelmat ovat vain kuvaa
  (ei törmäystä), juoksija voi astua niiden päälle näkyvästi.
- Seuraavaksi: 8 hallien ovikuvat, 5 muurien tiilipäät instansseiksi.

- 24.10. 16.0x: kohdat 4 (listakivi), 7 (palkkimaalaus halleissa ja tarkoissa malleissa, sinivihreä), 11 (valon leivonta, LR:n osa),
  13 (Taihemenin sivuportaat) tehty; VS:n palaute: muurin kate V4_gold, kivireunus seinään. Proto lavastaja/muoto-210 66eefd9ae
  (tarkista.sh 0). Paketit _valmiit/: tausta-v29 (a465bc355be5; LOD0 + valo_rgbm, yhteensä 200 Mt, v28 140 Mt), rakennukset-v16
  (ccb981cfe37d), muurikate-v10 (8972900ac9eb), avoimet-v23 (2f8ea1c1312e). Kuvat tavoiteluuppi-k1/taihemen-v16-portaat.png,
  valoatlas-kk-tausta-1-3-esikatselu.png. Kohta 8: hallien julkisivut koko korkeuden puupaneeleja → ei ovikuvaa (portti + kujan ovet valmiit).
  Kohta 5 tiilipäät: geometriana LOD0:ssa (V4_gold), instansointi vaatisi pelikoodia – jätetty, kolmiot LOD0:ssa ok.
- Jäljellä LR: 14 (Meridiaaniportin edusta: harjakoristeet Codexilta), 6 harjakoristeet ja 10 puut Codexin toimituksesta; leivonta rakennuksille/avoimille (jos VS haluaa).
- 24.10. 16.1x: kohta 14 tehty (rakennukset-v17: Meridiaaniportin kivijalka 2,4 m, eteläaukot suorakaiteina, harjalle marmorikaide);
  proto lavastaja/muoto-210 2d52792bc, paketti juoksupeli-kielletty-rakennukset-v17-vienti-20261024 (82cbd4384b38).
  Kuva tavoiteluuppi-k1/meridiaaniportti-v17.png. Jäljellä LR: 6 harjakoristeet ja 10 puut Codexin toimituksesta (b2b8d8eac).
- 24.10. 16.4x: 14 korjattu PT:n tarkistuksen mukaan (v17b: suorakaideaukot syvennetyin kehyksin, kivijalka 3 m, ovet aukkojen sisään) ja
  11 jatkettu malleihin: rakennukset-v18 (kaikki 12 mallia leivottuna, valo_rgbm TEXCOORD_1). Proto lavastaja/muoto-210 13536f62e (tarkista.sh 0).
  Paketti juoksupeli-kielletty-rakennukset-v18-vienti-20261024 (6aad2f72cb16; korvaa v17:n vientiin). Kohta 5 (PT hyväksyi): tiilipäät
  geometriana taustan LOD0:ssa (V4_gold), kourut VS:n KattoTiilet-varjostimella; instansointi jätetty (vaatisi pelikoodia, ulkoasu sama).
  Avoimet: leivonta myöhemmin JSON-tasolla (VS: ei kiireellinen). Jäljellä LR: 6 ja 10 Codexin toimituksesta.
- 24.10. 16.2x: 6 osittain ja 13 tehty Codexin toimituksista: avoimet-v24 (huoneiden katoille chiwen #928 harjan päihin ja harjaeläimet #929
  kulmaharjoille, katto-solmun lapsina), rakennukset-v19 (keskiluiskien kaiverrettu laatta #934; F ja G-jalusta leivottu uudelleen).
  Proto lavastaja/muoto-210 0d311faab (tarkista.sh 0). Paketit juoksupeli-avoimet-v24-vienti-20261024 (e43d0117a2de),
  juoksupeli-kielletty-rakennukset-v19-vienti-20261024 (0f099e84be34). Kuvat tavoiteluuppi-k1/harjakoristeet-avoimet-v24.png, keskiluiska-v19.png.
  Jatkossa 6: chiwen/eläimet myös tarkkojen mallien halleihin (nyt laatikkopäätteet) ja taustan halleihin; 10 puut odottavat uutta Tripo-koetta.
