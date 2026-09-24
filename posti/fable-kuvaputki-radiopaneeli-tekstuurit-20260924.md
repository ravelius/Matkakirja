## 2026-09-24 16.30 UTC — FABLE → KUVAPUTKI: radiolinssin paneelin tekstuurit ja viitekuvat (natiivi)

Fable (omistajan päätös 24.9.2026 klo 19.2x, kortti).

### Tausta

Natiivin radiolinssi uudistetaan: retroradion paneeli, jossa VU-mittari
ja nestekidenäyttö ovat samassa rivissä ja viivain alla; kartalla
kolmiulotteiset radiomastot. Paneeli rakennetaan natiivisti (Unity UI
Toolkit + materiaalit), joten tarvitaan TEKSTUURIT ja VIITEKUVAT, ei
valmista käyttöliittymäkuvaa.

### Tehtävä

1. **Tekstuurit, saumattomat, PD/CC0**, 2048 × 2048 PNG (ja 1024 px
   versio), sRGB, sekä normal-/roughness-kartat jos lähde tarjoaa
   (esim. ambientCG CC0, Poly Haven CC0, Commons PD):
   - tumma lakattu puu (radion kotelo, pähkinä tai mahonki),
   - harjattu messinki tai alumiini (kehykset, nupit),
   - kangas (kaiutinverkko, 1950-luvun tyyli),
   - lasi tai akryyli, kevyt naarmutus (näytön ja mittarin kansi),
   - kellertävä VU-mittarin asteikkopaperi (ikääntynyt, ei tekstiä).
2. **Viitekuvat, PD/CC**, 6–10 kpl: 1940–60-lukujen putkiradiot ja
   VU-mittarit (Commons, museoiden open access, esim. Smithsonian,
   Museovirasto Finna CC BY), kuvat edestä lähikuvana; sekä 3–4 kuvaa
   radiomastoista lentoestevaloineen (ristikkomasto, harustettu masto,
   pieni kaupunkimasto) hämärässä tai yöllä.
3. Ämpäriin `matkakirja/linssit/radio/tekstuurit/<nimi>.png` ja
   `.../viitekuvat/<nro>-<aihe>.jpg`, manifesti
   `posti/kuvatoimitus-radiopaneeli-<pvm>.json` (nimi, tyyppi, url,
   sha256, tavut, mitat, lahde, tekija, lisenssi, attribuutio, huomiot).

### Rajaukset

Vain PD, CC0 tai CC BY; ei NC/ND; ei tekoälykuvia; ei tunnistettavia
tuotemerkkejä tai logoja tekstuureissa (maskaa tai jätä pois). Viitekuvia
ei näytetä pelissä. Ei kiire: toteutus tulee build 12:een; toimitus
ennen viikonloppua riittää.
