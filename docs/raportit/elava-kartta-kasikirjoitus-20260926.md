# Elävä kartta, "Isoisän muste": videon käsikirjoitus (Kreikka, 18 s)

*Linssiseppä 26.9.2026 klo 00.3x Fablen käskystä. Pohja: docs/raportit/elava-kartta-suunnitelma-20260926.md (8b67da3a6) ja
Raamattu ELÄVÄ KARTTA. Video kuvataan natiivista (iPhone pystyssä, rajattuna ruutuun ilman reunoja).*

**Rakenne:** kolme näytöstä ja loppukuva. Liike on tapahtumaohjattua, ja jokaisen vaiheen ajoitus tulee yhdeltä
aikajanalta (esitysmoottori: Kamerakoreografia, Kayra-käyrät, KAMERA-AJOT: ease in/out, ei lineaarisia pätkiä).

| Aika (s) | Kuvassa | Kamera | Ääni | Rajapinta, tekijä |
|---|---|---|---|---|
| 0,0–1,0 | Lento laskeutuu Ateenaan. Kreikka on kermahunnun alla, vain Ateena näkyy. | lennon loppu, 1 200 km, kallistus 15° | koneen ääni hiipuu | nykyinen saapuminen |
| 1,0–3,5 | **Huntu kuivuu**: paljastus Ateenasta ulospäin, reunassa musteen kuivumisen kohina | pysähtyy, Jarruttava | paperin kahina | Natiiviseppä: Paljastus(keskus, säde, t) |
| 2,0–4,5 | **Joet piirtyvät** viivoina (0,6–1,2 s/joki, porrastus 0,15 s). **Maakuntarajat** vedetään kynällä yksi kerrallaan (0,35 s/raja). | kevyt lähestyminen 1 200 → 1 000 km | kynän rahina, hiljaa | Natiiviseppä: Viivapiirto(kerros, osuus) |
| 4,0–5,5 | **Maakunnat syttyvät** 1873-reitin järjestyksessä (0,12 s väli, 5 sävyn täyttö 0,4 s) | – | – | Natiiviseppä: Maakuntaväri(id, t); Karttaseppä: reitin järjestys |
| 5,0–6,5 | **Nostot putoavat** musteläikkinä: ensin pääkohteet (0,25 s läikkä), sitten kohteet ja pienet (porrastus 60 ms) | – | pieni naksahdus/läikkä | Pelikoodari: kokoluokat ja himmeät jäljet; Sisältökirjuri: GRC-luokitus |
| 5,5–8,0 | **Aamuaurinko** pyyhkäisee reliefin yli (matala itä → etelä, pitkät varjot liikkuvat) | kallistettu kierto 20° Attikan ympäri, Pehmea | aamun tuuli | Natiiviseppä: Aurinko(atsimuutti, korkeus) |
| 8,0–11,5 | **Maakunta herää**: napautus Attikan nostoon → väri valuu maakuntaan (0,8 s), nimi kirjoittuu käsialalla (1,2 s), pikkukuva leimautuu kartussiin (0,3 s), merkit 1/7 | pieni kuminauha-ajo Attikaan, 700 km | kynä + leimasin | Natiivi-UI: kartussi ja merkit; Natiiviseppä: Maakuntaväri(paikallinen) |
| 11,5–14,5 | **Elävä hetki**: 1873-höyrylaiva lipuu Pireuksesta Egeanmerelle savuvanan kanssa (tai lintuparvi Peloponnesoksen yli) | seuraa hitaasti, ei zoomia | kaukainen laivan kello | Karttaseppä: 1873 laivareitti; Natiiviseppä: Boidit / laivamalli |
| 14,5–18,0 | **Kirjoitettu maailma**: vetäytyminen koko pallolle hämärään. Kuljettu reitti on punainen kynänjälki, ja käydyt kaupungit hehkuvat yövaloina (Black Marble, maskattu). | Kiihtyva → Tasainen → Jarruttava, 3,5 s; pito 0,5 s | musiikki nousee hiljaa | Natiiviseppä: Yövalot(maski käydyt); Karttaseppä: yövalosarja |

**Säännöt:**
- Saapumisnäytös (1,0–6,5 s) on pelissä ohitettava ja kerran maata kohden (≤ 5 s ilman lentoa).
- Hetki ≤ 3 s, eikä se osu kortin, luennan tai linssin päälle.
- Levossa ei piirretä mitään (lepopiirto).

**Tekotapa:**
1. Minä teen aikajanan ja kamerakoreografian yhtenä kohtauksena (komento `elava kreikka`), ja jokainen vaihe kutsuu yllä
   olevaa rajapintaa. Puuttuvan rajapinnan tilalla on paikkamerkki, jolloin video näyttää ajoitukset heti.
2. Natiiviseppä tekee pallon rajapinnat (Paljastus, Viivapiirto, Maakuntaväri, Aurinko, Yövalot-maski, Boidit).
3. Natiivi-UI tekee kartussin, Pelikoodari nostojen kokoluokat ja himmeät jäljet, Karttaseppä reittidatan.
4. Video kuvataan iPhonella ja iPadilla (rajattuna laitteen ruutuun), ja hidastus on omana tiedostonaan.
