# Aloituslento, suositeltu versio (Natiiviseppä 27.9.2026 klo 22.5x)

Haara proto natiiviseppa/aloitusrata 00a2e941 (junan b13 päällä, EI vielä junassa). Video: aloituslento-natiivi-v7.mp4 (iPhone 17 Pro -simulaattori, oikea polku Uusi matka → Valitse aloituskaupunki → Ateenan napautus pallolla), vertailu aloituslento-pari-web-natiivi.mp4 (web vasemmalla, molemmat napautuksesta).

Aikajana 15 s (+ enintään 1,5 s paikallaan napautusnäkymässä, jona aikana kone käynnistyy):
0–2 s syöksy napautusnäkymästä koneeseen Lontoossa (ei leikkausta, kamera lähtee levosta) · 2–3,4 s lähikuva (kone nousee Thamesin yllä, 28–32 km, katse 30° alas) · 3,4–7 s kamera nousee ja kääntyy koneen taakse: 7 s:ssa Lontoo alhaalla, punainen jälki, katkoviivareitti ja Ateena ylhäällä, pallon kaarevuus ja horisontti · 7–11 s rajaus seuraa jäljellä olevaa matkaa · 11–15 s lasku Akropolikselle, kosketus 14,3 s (ääni ennallaan).

Perustelut:
1. Omistajan kaksi toivetta: lähtö täsmälleen napautetusta näkymästä ja laaja matkanäkymä. Web leikkaa kahdesti pergamenttiarkin alla (3,7–5,5 s), natiivi jatkaa samasta kuvasta.
2. Kaari on klassinen lentoreittianimaatio (zoom ulos, reitti ja zoom sisään, van Wijk): ruudulla on aina yksi asia. Ensin kone, sitten matka (lähtö, reitti, kohde), sitten kohde. Kanavat ovat jatkuvia (Hermite5, ei yliheilahdusta), ja rajaus lasketaan pallomallilla.
3. Web on malli: punainen jälki kasvaa koneen perässä ja katkoviiva edessä kuten webissä, kone on kaukana symbolikokoinen ja kartta on pelin oma pergamentti. Kallistus 35–60° tuo korkeuden tunteen, jota webin suora ylänäkymä ei anna.
4. Laatat: Lontoon lähikuva ladataan Cesiumiin jo valintanäkymässä ennakkokameralla, kohde ja käytävä odotuksessa (292 laattaa). 0 poikkeusta.

Mittaus (web, agentti): alku 4 488 km → huippu 5 680 km (35 %) → loppu 1 795 km, suoraan alas. Natiivi: 7 600 km (napautus) → 28–32 km → 3 120 km (7 s) → 1 390 km (9 s) → 220 km (11 s) → 60 km.
Kytkin A/B: `lento v3 aloitusrata 0|1` (0 = vanha v3-otos). Testit: Kartta 341/341, unity-tarkistus 0.
