# Natiivisepän luovutus 4.11.2026 klo 16.30 (konteksti 28 %, 7.37)

Korvaa luovutuksen -1530. Id:t: /Users/Shared/Claude/osoitekirja.md. Cron Unity-beeta: luo uudelleen ("4 9 * * *", muisti unity67-paivitysseuranta). Vuoro aina JU:lta.
Työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-maskik4 haarassa natiiviseppa/maakuntarajat-katko (35b6ee8b4), puhdas. Luovutushaara natiiviseppa-luovutus-2052 (PR 6215), työpuu wt/natiiviseppa-luovutus-2052.
Python, jossa numpy ja PIL: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/tulivuoret/venv/bin/python.

## Työ 1: maakuntarajat katkoviivaksi (35b6ee8b4; odottaa iPad-kuvia)
- **Lue:** _tyo/natiiviseppa/maakuntarajat/tulos.md, varsinkin loppu. Ei videota, ei junaan.
- **Macilla katsottu:** parit parit2/ (ennen -152659, jälkeen -154438). Ei uusia viivoja rannoille, ei kaksoisviivoja, aukot täyttyneet. Tästä ajosta katsomatta r-fra-z9, r-fra-z10, r-sii-*, r-tarkka-z12, r-ita-z9, r-ita-z10.
- **Karkean katkon 70 px selvitetty:** Macin 640×480-ruutu, Pintaosuma.Tiheys. Laskettu 72 px, mitattu noin 70. Sama selittää z12:n leveän karkean viivan Macilla. iPadille laskettu noin 18 laitepx ja leveys 1,6 (ei ajettu).
- **Pyydetty JU:lta 15.57:** iPad-vuoro kallistusajon jälkeen, runko 35b6ee8b4, sk-maakuntarajat.txt, 14 kuvaa. Vastaus tulee sinulle.
- **Kun kuvat tulevat:** katso täysikoossa samat kohteet. Erityisesti Suomen viiva (Macilla haalea, 0,46–0,53 laitepx), katkon koko, karkeiden poistuminen z12:lla, laatan reunan kohtaaminen r-tarkka-z12:ssa. Sitten parit ja sha PT:lle, PT vie KK:lle.
- **Säädöt tarvittaessa:** Viivaleveys.AluerajaJaksoPx, ElavaTyyli.AluerajaKatko/Vali, AluerajaLeveys, AluerajaEnintaanPx. Älä vie maakuntarajat.json.gz:ää ilman PT:n sanaa.

## Työ 2: kallistusajo f0e256d9b (natiiviseppa/tasainen-striimi-3; raportoitu PT:lle 16.29, odottaa sanaa)
- **Lue:** _tyo/natiiviseppa/striimi-sauma/tulos.md, kaksi viimeistä osiota. Kuvat lokit/julkaisija-tasainen-kallistus-f0e256d9b.
- **Tulos:** portti poistaa tunnetut saumat 0°:ssa (reunat.py; 0°-pareja ei katsottu täysikoossa). Muisti huippu 3418 Mt, 0 varoitusta; z12 päällä/pois +146 Mt on yli arvion +20–100. 45°:ssa suorat reunat jäävät z12:lla ja Helsingissä; portti on kiinni yli 3°:ssa.
- **k-z13-15 ja k-z13-45 eivät kelpaa:** kamera oli 1743 m:ssä ja Lontoossa 97 km:ssä, komennot olivat oikein. Lokissa samalla välillä elävä-tila ("hiljaa 546,6 s:n jälkeen"), saapuminen FRA, taustalla käynti ja elävä hetki. Mikä siirsi kameran, ei selvitetty. Ehdotin PT:lle lyhyttä uusintaa; rivi JU:lle vain PT:n sanalla. Koskee mahdollisesti muitakin pitkiä ajoja.
- **Katsomatta täysikoossa:** k-z12-15, k-z14-15, 0°-parit. vaaka.py ei erota saumaa sisällöstä luotettavasti.

## Työ 3: h-z13-sauma (vastattu PT:lle 15.55; ei korjausta ilman sanaa)
Sama mekanismi kuin avoin kallistusvika, mutta veden väriloikka on oma syynsä: z ≤ 11 peitto 2/3 (kirjava vesi), z ≥ 12 tasainen (ElavaTyyli.cs:490, :564). Rivi 842 = maastopalan raja 60,2051, porras = Mercator z11 rivi 593 (h-z13-ruudukko.py; oletus 45°). Toistuu rungossa f0e256d9b. Korjaussuunta, jos PT pyytää: z ≤ 11:n vesi tasaiseen SVesi-sävyyn poistaa vain veden sauman, ei maan läiskäeroa.

## Huom
Mac-parit ajettiin k17:n (d64f74a56) Esikatselu.cs:llä (JU). Diffissä ei ruutu- tai pistekerroinrivejä (grep), joten 640×480-päätelmä pysyy. Yhdistelmä tasainen-striimi-3 + maakuntarajat-katko ei ole tehty.

## LISÄYS PT ja KK 16.3x (SITOO; ohittaa Työ 2:n uusintaehdotuksen)
- **Ei uusintaa, ei uusia ajoja kallistuksesta.** Portti odottaa, haara f0e256d9b säilyy, ei junaan. KK päättää VS:n iPad-parin jälkeen.
- **Kameran syy selvitetty ja kerrottu PT:lle:** fyysinen kosketus iPadiin noin 16.13.47–16.15.40 (päätelty; tulos.md:n loppu). Riski: kortin sulkeutuminen alle 600 s:ssa saapumisesta ajaa kameran saapumisnäkymään.
- **VS:lle kerrottu** tulos.md:n loppu, ettei reunatyötä tehdä kahdesti.
- **Maakuntarajat ennallaan:** parit PT:lle JU:n iPad-ajon jälkeen.
