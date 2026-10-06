# Linna valmiiksi — priorisoitu lista (Siirtoseppä 7.10.2026 klo 01.5x)

Omistajan päätös 7.10. klo 01.3x (Päätoimittajan kautta): "Tehdään linna loppuun mahdollisimman hyväksi (eleet yms.)".
Vetäjä Siirtoseppä, mallipuoli Linnanrakentaja. Järjestys = hyöty pelaajalle / työ. Työmäärä: S = alle ilta, M = 1–2 iltaa, L = enemmän.

| # | Kohta | Hyöty pelaajalle | Kuka | Työ |
|---|-------|------------------|------|-----|
| 1 | **Eleet puheen tahdissa** (koodi): kertaeleet lauseiden ja painotusten alkuun (ei vain vuoron alkuun), kuulijan nyökkäys lauseen lopussa, puhuja katsoo kuulijoita vuorotellen, idle-mikroliike (pään harhailu, hengitys) | Hahmot näyttävät keskustelevan, eivät toista silmukkaa — suurin yksittäinen elävyysparannus | Siirtoseppä | M |
| 2 | **Kohdistus rakennus.jsoniin** (aanet[id].kohdistus ElevenLabsin raaka-alignmentista, raaka/*-vastaus.json) | Huulet tavuista (nyt voimakkuudesta), eleet ja nyökkäykset tavuihin ja lauseiden loppuihin | Linnanrakentaja | S |
| 3 | **Lisää eleleikkeitä**: jokaiselle puhujalle ≥ 3 puhe-elettä + kuulijan reaktiot (nyökkäys, pään kallistus, käsi rinnalle); portinvartijalla nyt 0, monella 1 | Ei toistoa, hahmot eroavat toisistaan | Linnanrakentaja (+ Siirtoseppä kytkentä) | M |
| 4 | **Final IK**: haara 9 buildia jäljessä → BUILD 154:ään, Grounder (jalat portaissa ja lattiassa), kädet esineisiin (kadet-data) | Jalat eivät leiju, kädet tarttuvat oikeasti | Siirtoseppä + Linnanrakentaja (data) | M, iPad ABAB |
| 5 | **Akustiikka (Steam Audio)**: keittiö ja piha valmiina kokeena (peili 2147deef) → kaikki huoneet | Kivilinnan kaiku: tilat tuntuvat oikean kokoisilta | Siirtoseppä | M, iPad-mittaus |
| 6 | **Valaistus**: AO-B (b58f0ac9) + soihtujen/takkojen välkkyvä valo ja ikkunoiden iltahehku | Syvyys ja tunnelma, erityisesti hämärässä | Linnanrakentaja + Siirtoseppä | S–M |
| 7 | **Sää ja taivas (COZY)**: pilvet linnan yllä (cozy-linna 24eacd5a, koe valmis) → kuvapari + iPad-mittaus | Elävä taivas, ei staattinen kupoli | Siirtoseppä | S |
| 8 | **Äänimaisema**: ulkona järvi, tuuli, linnut; askeleet pinnan mukaan; huoneambienssien tasot | Ulkotila elää, siirtymät huoneisiin kuuluvat | Pelikoodari (äänet) + Siirtoseppä | S |
| 9 | **Jakson kuva** (jakso.kuva luetaan jo, näyttö puuttuu, kuva Codexilta) | Kertojan jaksoihin kuva | Siirtoseppä | S |
| 10 | **Lataus ja suorituskyky**: Brotli (554d7870), ensilataus iPadilla | Nopeampi aukeaminen | Linnanrakentaja + Natiiviseppä | M |

**Aloitus: kohta 1** (koodi ilman uusia malleja; toimii nykyisillä leikkeillä ja kohdistuksen puuttuessa puheen voimakkuudesta).
Ensimmäinen koe äänellisenä videona: kappeli ja keittiö, sama appi eleet pois/päällä (poikki eleet 0|1).
