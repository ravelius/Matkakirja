# Pelikoodari: luovutus 12.11.2026 klo 09.12 (konteksti ~31 %, Raamattu 7.37)

Edellinen: viesti-pelikoodari-luovutus-20261112-0848.md (4f2317a72); sen kohdat 1–2 on käyty läpi alla.

## 1. KAMERALAITE PALA 2: KK:N 08.55 PÄÄTÖKSET KOODISSA, ODOTETAAN KK:N VASTAUSTA (viesti KK:lle 09.10, jonossa)
Koodi: natiivi-backup kameralaite/pala-2 @ b3a8b05cb (wt /Users/Shared/Claude/wt/proto-pelikoodari-kameralaite), pushattu. Kytkin pois.
Tulos: /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kameralaite/TULOS-paatokset-0855.md (LUE KOKONAAN). KK:n päätökset ovat
tehtävänannon viimeisessä osiossa: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261111-kameralaite-pala2-tehtavananto.md.
- Tehty:
  - Syöte P~ (SyoteVaakaMax 14,06, SyotePystyMax 4; Esikatso siirtää katsetta P~ − P).
  - DTavLattia 3,3 m, liukuu ahtauden mukana (POIKKEAMA, perustelu TULOSissa). Leikkausehto UusiJalkiVaraM 0,15.
  - KameraTyyli.RullaKatto 2,0 (vaikuttaa vain kuvaan ja mittariin).
  - Katseen pystyennakko pois.
  - Oletus = ahdas KatseS 0,15 (tauVAhdas 0,125, paikkaSAhdas 0,20); ilman liukua new SeurantaAsetus().
- Testit: Linssit 2323/2323, Unity 0. Toisto 5/6: T14UKaannosToisto kaatuu (|T−P| 1,35 / |L−P| 1,34; ilman liukua 1,50).
  Syytä ei selvitetty; aloita: MITTAUS=c3sarja C3_SARJA=1942463309:9.7:10.7 C3_RIVI=2 sh Linssit-testit/kameratoisto.sh C3Sarja.
- Ei Mac-ajoa: ahdas 0,15 -rivillä laite 135 askelta ja huiput a 72,6 / j 1200 / ω 461. Kaikki tulevat 0,4–0,7 s säännön paikkahypyn jälkeen,
  kun P~ jahtaa piikkiä rajalla ja v̂ on 12–13,7 m/s.
  - KK:lle suositus: raja 1,25 × säännön senhetkinen vauhti (sovitin välittää JuoksuV4.Nopeuden).
  - Lisäksi KK:lle: 178 tapahtumaa on 14–20 m/s:n välillä (reitinvaihto spurtissa? ei varmistettu).
- Toiston uudet rivit (MITTAUS=c3, C3Mittaus):
  - syötteen rajatut askeleet ja tapahtumat
  - tapahtumaluokat askelvauhdin mukaan
  - |P~ − P|
  - säännön suurin askelvauhti
  - katseen y-askel ja -nopeus
- MASSATUOMARI VALMIS: kameralaite/massatuomari.py (v133c: tausta LOD1 + avoimet-v52 sijoitus.jsonista + rakennukset v127; neljä sädettä
  sisällä-testiin). f1c47100d: 55/0, positiivinen koe muurin vieressä ok. Ajo: `python3 -P massatuomari.py massarivit.txt`.
- KK:n kysymykseen 1 vastattu: näkyvä hahmo ei hyppää yhdessä ruudussa (JuoksuV4Maailma.cs:1137–1146, liuku 0,12 s).
- SEURAAVAKSI: KK:n vastaus → koodiin → keinoradat (MITTAUS=c3 sh Linssit-testit/kaanna.sh C3) ja toisto (MITTAUS=c3 kameratoisto.sh C3Mittaus;
  huiput MITTAUS=huiput C3_RIVI=2 ... Huiput).
  - Jos ehdot täyttyvät (T5/VO ≤ 21,9°, T7, T14, T15, toistossa 0 askelta, peitto ≤ 0,6 s, a < 30 / j < 600 / ω < 250), Mac-ajo JU:lle
    siemenellä 1942463309 (vanha + uusi) + massatuomari.
  - Seinätyönnön koodi pois vasta, kun 2b on nolla.

## 2. B1 (botti maali) REBASETTU: natiivi-backup pelikoodari/seinat-taso1-v133c @ a405aeb07
Vain bcf32314c poimittu junan 224 (v133c) päälle (muut commitit olivat jo junassa). Peli-testit 932/932, Unity 0. PT:lle ilmoitettu 08.52;
odottaa KK:n junasanaa. Vanha haara pelikoodari/seinat-taso1 ennallaan. Työkopio /Users/Shared/Claude/wt/proto-pelikoodari-b1.

Ei agentteja käynnissä. Ei uusia lupia.
