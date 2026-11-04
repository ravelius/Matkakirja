# Natiivisepän luovutus 4.11.2026 klo 16.58 (konteksti 25 %, 7.37)

Korvaa luovutuksen -1630. Id:t: /Users/Shared/Claude/osoitekirja.md. Cron Unity-beeta: luo uudelleen ("4 9 * * *", muisti unity67-paivitysseuranta). Vuoro aina JU:lta.
Työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-maskik4 haarassa natiiviseppa/maakuntarajat-katko (35b6ee8b4), puhdas. Luovutushaara natiiviseppa-luovutus-2052 (PR 6215), työpuu wt/natiiviseppa-luovutus-2052.
Python, jossa numpy ja PIL: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/tulivuoret/venv/bin/python.

## Työ 1: maakuntarajat katkoviivaksi (35b6ee8b4): odottaa KK:n arviota, ei korjausta ilman sanaa
- **Lue:** _tyo/natiiviseppa/maakuntarajat/tulos.md, kaksi viimeistä osiota. Ei videota, ei junaan.
- **iPad-kuvat:** lokit/julkaisija-maakuntarajat-35b6ee8b4 (14/14, huippu 3827/4080 Mt, 0 varoitusta). Katsottu täysikokoisina rajauksina (ipad-rajaukset/, yksi rajaus per kuva; kolme kuvaa myös kokonaan). iPadilta ei ole ennen-kuvaa, parit vain Macilta (parit2/).
- **Tulos:** katkoviiva ehjä, jakso 17–18 px (laskettu 18), karkeat poissa z12:lla (häive 0,00), Suomen viiva selvä.
- **PT vei tuloksen KK:lle vikoineen.** KK arvioi. Italia z10:ssä viiva häviää paikoin varjoihin (makuasia).
- **Säädöt tarvittaessa:** Viivaleveys.AluerajaJaksoPx, ElavaTyyli.AluerajaKatko/Vali, AluerajaLeveys, AluerajaEnintaanPx. Älä vie maakuntarajat.json.gz:ää ilman PT:n sanaa.

## PT:n pyytämät kaksi syytä: vastattu PT:lle 16.5x, ei korjausta ilman sanaa
1. **z12:n reunan "pykälä":** ei laattojen välinen siirtymä. Z12 yläpuolella, z13 alapuolella (jakso 22 / 11 px); vaakapätkä on z13-palan oma. Reitin alkuperä aineistossa jäi varmistamatta: pala ei ole Macin välimuistissa, eikä sitä haettu (openfreemapin robots.txt 403). ElavaMaski.Viiva lukematta (Kartta/ElavaMaski.cs-polkua ei ole; luokka on muualla). Aukko z12-viivan ja vaakapätkän välissä selvittämättä.
2. **Iso MARSEILLE:** KaupunkiMerkit, pelin kaupungin nimi × ZoomKerroin 5,5. Macilla piilossa NimiLadonta.cs:953:n takia (laskettu, ei ajettu). Pieni kursiivi on Nimikerroksen suurkaupunki, eli nimi kahdesti. Ei tästä työstä (diff tyhjä kolmelle tiedostolle). Muita pelin kaupunkeja ei katsottu.
Sivuhuomio ilman selvitystä: r-fin-z10:ssä järvet kahtena sävynä suorakulmaisella alueella.

## Työ 2: kallistusajo f0e256d9b (natiiviseppa/tasainen-striimi-3): ei uusia ajoja (PT ja KK 16.3x)
Portti odottaa, haara säilyy, ei junaan. KK päättää VS:n iPad-parin jälkeen. Tiedot _tyo/natiiviseppa/striimi-sauma/tulos.md. Kameran syy: fyysinen kosketus iPadiin noin 16.13.47–16.15.40 (päätelty). Riski: kortin sulkeutuminen alle 600 s:ssa saapumisesta ajaa kameran saapumisnäkymään.

## Työ 3: h-z13-sauma: ei korjausta ilman sanaa
Veden väriloikka z ≤ 11 | z ≥ 12 (ElavaTyyli.cs:490, :564). Korjaussuunta, jos PT pyytää: z ≤ 11:n vesi tasaiseen SVesi-sävyyn poistaa vain veden sauman, ei maan läiskäeroa.

## Huom
Yhdistelmä tasainen-striimi-3 + maakuntarajat-katko ei ole tehty.

## LISÄYS 18.1x (KK:n kysymys; vastattu KK:lle ja PT:lle, odottaa sanaa)
- **Tasot:** karkea viiva tasoon 10,5 asti, sen yllä elävän palan viiva. 35b6ee8b4:ltä kuvat vain 10,41 ja 11,34, väli 10,5–11,3 todistamatta. VS:n t104 on arviolta taso 10,6, vanha runko.
- **VS:n 38ec22a25 (`if (Striimi || ...) continue`) poistaa koko boundary-silmukan:** tasolta 10,5 ylöspäin ei maakunta- eikä valtionrajoja, myös katkoviivani. Yhdistelmää ei saa tehdä sellaisenaan; git voi yhdistää sen hiljaa (ei kokeiltu).
- **Suositus, ei tehty:** ehdosta pois `Striimi ||`, ja JU:n iPad-kuvat tasoilta 10,5–11,3. Rivi JU:lle vain sanalla. Tiedot tulos.md:n loppu.

## LISÄYS 18.2x (KK 18.1x: sama väri ja jakso kynnyksen molemmin puolin; VS yhdistää ja poistaa `Striimi ||`)
- **Tehty:** b2101b95e natiiviseppa/maakuntarajat-katko (35b6ee8b4 + 1): palan viiva muste 70,48,29, alfa 0,6, leveys 1,3, jakso 11 laattapx, e18. Laskettu, ei ajettu; odotus huippu z13 noin 77, z12 noin 59 (karkea 76). Mittari _tyo/natiiviseppa/maakuntarajat/mittaa.py.
- **Ei onnistu yhdellä säännöllä:** z- ja z+1-palan välissä jakso kaksinkertainen (10 / 20 px). Poisto vaatisi viivan omaksi kerrokseksi palan päälle. Kerrottu KK:lle.
- **Odottaa:** VS ottaa committin samaan ajoon, kuvat KK:lle. Ei junaan ennen PT:n koerunkoa.
- **JU:n r-fin d9cde0f50:** ei vika. Kerros näyttää pelaajan maan (Komennot.cs:1387), ja listasta puuttui `maakunta maa FIN`. Tasolta 10,5 ylöspäin palan viiva näkyy kaikissa maissa; ero kerrottu KK:lle.
