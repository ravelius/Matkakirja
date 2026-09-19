# Viesti Fablelle: Maltan ja Kyproksen hahmotelmanostojen kohdelista (vaihe 1)

19.9.2026, Sonnet-sisältösessio "Matkakirja Sonnet nostot", haara `sonnet-nostot-mlt-cyp`
(pohja origin/main 39f1a2ee, v1965). **Kypros: 11 ehdotusta. Malta: 11 ehdokasta, mutta MALTA EI OLE PELIN KARTALLA (ks. alla). Odotan päätöstä ennen vaihetta 2.**
Sisältöjä ei ole vielä kirjoitettu. Vaiheessa 2 mukaan tulevat myös rahavisat (~10 Kypros, ~4 Malta) uuden visakielisäännön mukaan.

## Miten lista tarkistettiin

- Koordinaatit haettu en-Wikipedian rajapinnasta (`prop=coordinates`, 19.9.2026); artikkeli taulukossa. Yhtään lukua ei ole arvattu. Mosta Rotundan piste on Mostan kaupungin artikkelista (Rotunda of Mosta 35,9101 / 14,4259).
- **Pelikaupungit** (`cityCountry`): Kypros: **Nikosia** (ainoa; merkki 6945,3 / 1989,5); Malta: ei pelikaupunkia. Valletta ja muut kaupungit ovat siis sallittuja kohteita, kunhan Maltan karttakysymys ratkeaa.
- **Paketit**: `js/packs/*-mlt.js` ja `*-cyp.js`: vain `maastokohteet-cyp.js` (maastokohteet, ei hahmotelmaa). Uudet pakat `hahmotelma-cyp.js` ja `hahmotelma-mlt.js` tehdään vaiheessa 2.
- **MALTA EI OLE PELIN MAA**: `MAAILMANKARTTA.countryShapes` ei sisällä MLT:tä (134 maata, MLT puuttuu), `FOKUS_POHJAT` ei sisällä MLT:tä (ei fokuslehteä; `osuuLehteen('MLT')` antaa null), eikä koodissa ole yhtään MLT-mainintaa. Luxemburg, Slovenia ja Kypros ovat mukana; Malta ei. Mitat: saaristo on laudalla ~17 yksikköä leveä, ja Maltan kohteet ovat 0,5–2 yksikön päässä toisistaan (Valletta – Birgu 0,5, Ħaġar Qim – Sininen luola 0,5, Marsaxlokk – Għar Dalam 0,6), joten pääkartalla ne olisivat täysin päällekkäin ilman omaa fokuslehteä. **Maltan nostot tarvitsevat siis ensin Opus-työn**: MLT countryShape maailmankarttaan, fokuslehti (FOKUS_POHJAT MLT + `MLT.webp`) ja tarvittaessa pelikaupunki. Ehdotan: teen Maltan paketin valmiiksi (11 nostoa), mutta en rekisteröi sitä (`KOHDE_MAAT.MLT`) ennen kuin maa on kartalla; tai jätän Maltan pois tästä erästä.
- Laudat ja fokuslehden osuma laskettu pelin omalla työkalulla (`tools/johda-maastokohteet.mjs` `laudat`, `osuuLehteen('CYP')`): **Kypros 11/11 osuu Kyproksen fokuslehteen.**

## KYPROS (CYP)

- **Kyproksella on jo 13 nostoa** (`nostojenKarttapaikat()`): Olympos (Troodos), Pediaios, Levantinmeri, Paphoksen mosaiikit, Palaipafos, Kourion, Khirokitia, Asinoun kirkko, Kykkoksen luostari, Kapgreco, Apostolos Andreas sekä kaksi skandaalia (Cesnolan kokoelma, Kypros myydään). Siksi **Troodos/Kykkos, Pafos (mosaiikit), Kourion ja Kap Greco ovat jo pelissä eivätkä ole listalla**.
- **Pudotettu liian lähellä nykyisiä (< 4,5 lautayksikköä) tai pelikaupunkia (< 7)**: Famagusta (1,8 Pediaiosista), Salamis (0,8 Pediaiosista), Larnaca (0,0 Cesnolan kokoelma -skandaalista), Hala Sultan Tekke (1,3 samasta), Larnacan suolajärvi, Omodos (3,8 Olymposta), Lefkara/Pano Lefkara (3,0 Khirokitiasta), Kolossi (1,5 Kourionista), Petra tou Romiou (2,5 Palaipafosista), Limassol (2,0 skandaalista), Tombs of the Kings (0,3 Pafoksen mosaiikeista), Amathus, Ayia Napa (2,1 Kap Grecosta), Trooditissa (1,3 Olymposta), Kakopetria (2,2 Olymposta), Kalopanayiotis (2,4 Olymposta), Tochni (0,9 Khirokitiasta), **Bellapais (5,7 Nikosiasta) ja Buffavento (5,3 Nikosiasta) ovat pelikaupungin kohdalla (< 7)**, Latchi (1,3 Polisista).
- **Valitut**: etäisyys nykyisiin ≥ 4,6, Nikosiaan ≥ 7,1, keskenään ≥ 3,7.
- **1873**: Kypros on osmanien vallan alla (Kyproksen saari; britit tulevat vasta 1878: nappi "vasta muutaman vuoden kuluttua"). Kyproksen pohjoisosan kohteet käsitellään historiallisina paikkoina ilman nykypolitiikkaa.

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Etäisyys nykyiseen / Nikosiaan | Miksi |
|--:|----|------|--------|-----------|--------------|------|-------|
| 1 | hahmotelma-kyrenia | Kyrenia | historia | 35,3403 / 33,3192 | Kyrenia (linna 35,3414 / 33,3222) | 15,3 Asinou / **7,1 Nikosia** | Satama ja Kyrenian linna (Bysantti, Lusignan, venetsialaiset); 1873 osmanien kaupunki. |
| 2 | hahmotelma-kantara | Kantaran linna | historia | 35,4064 / 33,9233 | Kantara Castle | 9,1 Pediaios / 21,1 | Pentadaktylos-vuorten itäpään bysanttilainen linna. |
| 3 | hahmotelma-akamas | Akamas | vuori | 35,04 / 32,32 | Akamas | 10,7 Pafos / 34,9 | Kyproksen luoteiskärki: luonnonpuisto, Avakas-rotko. |
| 4 | hahmotelma-polis | Polis (Chrysochous) | historia | 35,0333 / 32,4333 | Polis, Cyprus | 10,0 Pafos / 31,3 | Muinainen Marion/Arsinoe, Chrysochoun lahti. Akamas 3,7. |
| 5 | hahmotelma-karpas | Karpaasin niemimaa | vuori | 35,5278 / 34,2773 | Karpas Peninsula | 11,0 Apostolos Andreas / 33,7 | Kyproksen "pannunvarsi", villiaasit, Apostolos Andreaksen lähellä. |
| 6 | hahmotelma-kormakitis | Kormakitis | kulttuuri | 35,3428 / 33,0108 | Kormakitis | 10,4 Asinou / 13,5 | Maroniittikylä ja Kyproksen arabian erikoismurre. |
| 7 | hahmotelma-lapithos | Lapithos | historia | 35,3367 / 33,1742 | Lapithos | 12,0 Asinou / 9,2 | Pohjoisrannikon muinainen kaupunki (Lambousa). Kyrenia 4,9. |
| 8 | hahmotelma-soli | Soli ja Vouni | historia | 35,14 / 32,811 | Soli, Cyprus | 6,3 Kykkos / 18,3 | Muinaisen Solin rauniot Morphoun lahdella. |
| 9 | hahmotelma-stavrovouni | Stavrovounin luostari | historia | 34,8859 / 33,4355 | Stavrovouni Monastery | 4,6 Khirokitia / 10,5 | Kalliovuoren luostari (keisarinna Helena). |
| 10 | hahmotelma-chrysorrogiatissa | Chrysorrogiatissa | kulttuuri | 34,9101 / 32,6186 | Chrysoroyiatissa Monastery | 5,0 Kykkos / 26,4 | Pafoksen vuorten luostari (1152), viini. |
| 11 | hahmotelma-morphou | Morphou | ruoka | 35,1981 / 32,9939 | Morphou | 5,0 Asinou / 12,3 | Sitrushedelmäviljelmien tasanko. |

## MALTA (MLT) — vain ehdokkaat, odottaa karttapäätöstä

Pelissä ei ole Maltaa; alla 11 ehdokasta (koordinaatit haettu), mutta ne voi rekisteröidä vasta, kun MLT on kartalla. Etäisyydet keskenään 1,1–17 yksikköä (Malta on pieni; fokuslehti tarvitaan).

| # | id | nimi | tyyppi | lat / lon | en-Wikipedia | Miksi |
|--:|----|------|--------|-----------|--------------|-------|
| 1 | hahmotelma-valletta | Valletta | historia | 35,8983 / 14,5125 | Valletta | Ritarikunnan kaupunki (1566), 1873 brittiläisen Maltan pääkaupunki. |
| 2 | hahmotelma-mdina | Mdina | historia | 35,8858 / 14,4031 | Mdina | "Hiljainen kaupunki", muurien ympäröimä entinen pääkaupunki. |
| 3 | hahmotelma-hagar-qim | Ħaġar Qim ja Mnajdra | historia | 35,8278 / 14,4422 | Ħaġar Qim | Megaliittitemppelit, Sininen luola (0,5) samassa nostossa. |
| 4 | hahmotelma-ggantija | Ġgantija | historia | 36,0472 / 14,2692 | Ġgantija | Gozon temppelit (3600–3200 eaa.). |
| 5 | hahmotelma-marsaxlokk | Marsaxlokk | merenkulku | 35,8417 / 14,5447 | Marsaxlokk | Kalastajasatama, luzzu-veneet. |
| 6 | hahmotelma-comino | Comino | saari | 36,0114 / 14,3367 | Comino | Vain muutaman asukkaan saari, Sininen laguuni. |
| 7 | hahmotelma-dingli | Dinglin kalliot | vuori | 35,8603 / 14,3814 | Dingli | Maltan korkein kohta (253 m), kalliot. |
| 8 | hahmotelma-mosta | Mostan rotunda | historia | 35,9101 / 14,4259 | Mosta | Kupoli (rakennettu 1833–60: 1873 valmis). |
| 9 | hahmotelma-hypogeum | Ħal Saflieni | historia | 35,8696 / 14,5068 | Ħal Saflieni Hypogeum | Maanalainen temppeli (löydetty vasta 1902). |
| 10 | hahmotelma-ta-pinu | Ta' Pinu | kulttuuri | 36,0618 / 14,2148 | Ta' Pinu | Gozon pyhiinvaelluskirkko (basilika 1920-luku). |
| 11 | hahmotelma-birgu | Vittoriosa (Birgu) | historia | 35,8881 / 14,5225 | Birgu | Ritarikunnan ensimmäinen kaupunki, Fort St. Angelo (0,5 Vallettasta: vaihtoehto Vallettalle). |

## Huomiot Fablelle

1. **Malta ei ole pelin kartalla**: en rekisteröi Maltaa, ennen kuin MLT-maa (countryShape + fokuslehti) on olemassa. Vaihtoehdot: (a) teen Maltan paketin nyt ja se odottaa Opus-työtä (rekisteröinti erillisessä pienessä muutoksessa), (b) jätän Maltan pois tästä erästä.
2. **Kypros on tiheä**: 13 nykyistä nostoa ja pelikaupunki (Nikosia) rajaavat listan 11:een; useat pyytämäsi (Famagusta, Salamis, Larnaca, Lefkara, Omodos, Hala Sultan Tekke) ovat 0–3,8 yksikköä nykyisistä (Pediaios, Cesnolan kokoelma -skandaali, Khirokitia, Olympos). Jos haluat jonkin näistä, voin korvata nykyisen noston nimen kanssa keskustelemalla tai sallia tiiviimmän välin (esim. Famagusta 1,8, Larnaca 0,0 ovat samalla paikalla kuin skandaalimerkit).
3. **Pohjois-Kypros** (Kyrenia, Kantara, Karpaasi, Kormakitis, Lapithos, Morphou): kerrotaan historiallisina paikkoina; ei nykypoliittisia väitteitä.
4. **Rahavisat** (vaihe 2): Kypros ~10, Malta ~4 uuden visakielisäännön mukaan (vaihtoehdot ≤ 40 merkkiä, kysymys ≤ 95).
5. **Rekisteröinti** (vaihe 2): `hahmotelma-cyp.js` samaan tapaan kuin muut; Kyproksella `KOHDE_MAAT.CYP` on jo olemassa (maastokohteet), joten liitos `[...(KOHDE_MAAT.CYP ?? []), ...HAHMOTELMA_CYP]`.
