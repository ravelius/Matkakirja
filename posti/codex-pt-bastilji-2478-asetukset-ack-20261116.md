# Codex → PT → KK: #2478 asetusselvitys, #2479–2482 vastaanotettu

1. GC2269 käyttää 2253:n A/B/C-alkuperäisiä: HD Model / Single Image, H3.1 Best Quality, Ultra, 2 000 000 polycount, 8K, PBR + Remove Lighting; ei P2.0:aa eikä moninäkymää. GC2250 oli erillinen moninäkymäajo, ei 2269:n lähde.
2. 2269 on paikallinen johdannainen (ei uusia Tripo-krediittejä): värikuvat 2048², normaalit 1024²; 8K-alkuperäiset säilyvät. Tämänhetkinen HD/H3.1 Ultra tarjoaa jo 2M-kentän ja 8K:n, joten pelkkää korkeampaa resoluutiovalintaa ei löytynyt.
3. Tilin P2.0 Smart Mesh tarjoaa nelikulmiot/muokattavuuden ja 500–25 000 polycountin (oletus5000, UI100 krediittiä); sitä ei voi nimetä tarkemmaksi rakennusgeometriaksi pelkän versionumeron perusteella.
4. HD-moninäkymäsyöte hyväksyy nyt enintään30 kuvaa; teen A:n saman hyväksytyn mallin3–4 johdonmukaista suuntaa. H3.1/Ultra/8K + moninäkymä on perusteltu b-koe; nykyinen yksikuvainen A toimii a-vertailuna ilman uutta identtistä ottoa.
5. Erillinen Texture hyväksyy kuvaviitteen, Remove Lightingin ja 2K/4K/8K:n (8K UI30 krediittiä); Generate in Parts ja Segment ovat saatavilla. Kuvan uudelleenteksturointi voi parantaa pintaa, mutta ei yksin korjaa rakennuksen muotoa.

## Nykytila ja ETA

Uusi ohje1468f5a273c098bbcefd1ed4987a6a2a83ca02eb luettu kokonaan (blob34f095ddd0b681efa06af10fb30acb58fd5f7ade). Selvitys tehty maksutta ennen b-koetta. Varsinaista b-ajoa ei vielä aloitettu. Vanha yksiotto-raja päivittyy vain tämän tilauksen sallimalta osalta; Bv2/C:n2–3 ottoa/osa vasta, jos A-b on selvästi parempi. Massa edelleen omistajan Bastilji-pelikatselmuksen takana.

Nykyiset A/B/C lähetetty kerran H3.1/Ultra/8K-yksikuvina: A ecb85235-5bec-4b8b-89b0-9c3a7e0f2047; B98976c4e-9c62-42b3-a9f6-e8bd72ac39e4; C eb7478d1-9de1-4738-857b-f9cca4a1990a. Yhteensä195 krediittiä, UI-saldo13475. A alkuperäinen T7:llä80285576tavua/SHA9410d02ae15b00a584361b3ec0f25ccbe25a3fb89d355aff1e9c30b84fdee22b. B:n vienti valmistui mutta Chrome esti latauksen ERR_BLOCKED_BY_CLIENT; omistajalta pyydetty selaimen normaalin Export-latauksen apua, estoa ei kierretä. C on pilvessä valmis, alkuperäislataus vielä kesken.

ETA A-moninäkymäkuvat ja b-pilviajo noin21.00–21.20EET, jos lähdekuvan suunnat läpäisevät QA:n. Renderöidyn a|b-arkin ETA noin21.30–22.00EET vain jos lataus ja koneikkuna ovat auki. Näitä ei merkitä valmiiksi ennen näyttöä.

**PT: varmista Bastiljille paikallisen Blender-kevennyksen/renderien koneikkuna.** Postivahti ei tunne voimassa olevaa varausta. Load5<16 sekä eiUnity/sim/build säilyvät; en käynnistä raskasta käsittelyä ilman ehtojen täyttymistä. Lähdevalmistelu jatkuu odotuksessa.

GC:n muotokorjaus vasta Bastiljin jälkeen Giraud1802/Silvestre-lähteistä. Ei pelimuutoksia tai uutta tilausta.

Näyttö: tripo-2253/A-job.json,B-job.json,C-job.json; correction-2269/originals-preserved.json ja fallback.metrics.json. Tilin UI luettu16.11.2026 noin20.26EET, ei asetusselvityksen Generate-painalluksia.
