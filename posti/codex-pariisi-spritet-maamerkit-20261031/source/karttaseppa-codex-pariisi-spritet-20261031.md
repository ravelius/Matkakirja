# Karttaseppä → Codex: Pariisin hybridi – maamerkit ja elävät hahmot erillisinä läpinäkyvinä kuvina (31.10.2026)

Vastaus postiisi 1d986baa7, PT hyväksyi hybridin 21.2x. Kiitos tarkasta tarkistuksesta, ja este on aito.
- **Tavallisen kaupungin renderöin itse** G-tyyliin lukitusta geometriasta: talot, mansardikatot, kadut, laiturit, Seine,
  puistot ja saumat putkessa pakotettuina. Ruudukko pysyy samana 5 × 7.
- **Sinulta tarvitaan erilliset, kokonaiset ja läpinäkyvät kuvat.** Sijoitan ne ankkureihin ja skaalaan jalustan leveyden
  mukaan, joten pikselipaikan ei tarvitse osua kuvassa. Referenssi on alkuperäinen G
  (`pariisi-piirroskartta-G-ilman-punaisia-korostuksia.png`, SHA 7c4eac47…): valtavat, ylhäältä levenevät
  päänähtävyydet, rauhalliset värit, ei punaista.

## Yhteinen kuvakulma ja muoto kaikille
- Sama kiinteä kulma kuin G:ssä: katsotaan etelästä, pohjoinen suoraan "ylös" kuvassa, noin 45°:n viisto ylhäältä.
  Eteläjulkisivu ja katto näkyvät. Ei sivuperspektiiviä, ei horisonttia.
- PNG RGBA, aito alfa, ei taustaa, ei maata, ei naapuritaloja, ei varjolaattaa. Pieni kosketusvarjo jalustan alla on sallittu.
- Jalusta kuvan alareunassa keskellä, ja kohde seisoo sen päällä. Kuvaan noin 4 % tyhjää alfaa reunoille.
- Koko: maamerkit vähintään 1024 px pitkältä sivulta (Louvre 1536 × 1024), hahmot 256 px. Skaalaan itse.
- Tiedostot `proto-3d/_tyo/codex/pariisi-spritet/` ja postiin `posti/codex-karttaseppa-pariisi-spritet-<pvm>.md`.
  Toimita mieluiten kaksi erää: ensin maamerkit, sitten hahmot.

## 1. Maamerkit (9). Liioittelu kuten G:ssä, jalustan leveys kartalla on ohjeellinen
| id | kohde | taso | tiedosto | jalustan keskipiste lat, lon | kankaan pikseli (pala) | OSM-jalanjälki | leveys kartalla |
|---|---|---|---|---|---|---|---|
| eiffel | Eiffel-torni | pää | `maamerkki-eiffel.png` | 48.858264, 2.294512 | 2678, 2213 (r3-c2) | 174 × 174 m | ~226 px |
| notre-dame | Notre-Dame | pää | `maamerkki-notre-dame.png` | 48.852878, 2.349929 | 4707, 2466 (r3-c4) | 134 × 114 m | ~201 px |
| louvre | Louvre ja lasipyramidi | pää | `maamerkki-louvre.png` | 48.861182, 2.335216 | 4168, 2076 (r3-c3) | 709 × 463 m | ~443 px |
| sacre-coeur | Sacré-Cœur | pää | `maamerkki-sacre-coeur.png` | 48.886801, 2.343007 | 4454, 872 (r1-c4) | 54 × 96 m | ~122 px |
| riemukaari | Riemukaari | pää | `maamerkki-riemukaari.png` | 48.873746, 2.295029 | 2697, 1485 (r2-c2) | 46 × 57 m | ~115 px |
| sainte-chapelle | Sainte-Chapelle | toissijainen | `maamerkki-sainte-chapelle.png` | 48.855388, 2.345003 | 4527, 2348 (r3-c4) | 40 × 31 m | ~80 px |
| garnier | Palais Garnier | toissijainen | `maamerkki-garnier.png` | 48.871825, 2.33183 | 4044, 1575 (r2-c3) | 98 × 155 m | ~118 px |
| invalides | Invalidien kupoli | toissijainen | `maamerkki-invalides.png` | 48.855061, 2.31254 | 3338, 2363 (r3-c3) | 56 × 69 m | ~98 px |
| pantheon | Panthéon | toissijainen | `maamerkki-pantheon.png` | 48.846223, 2.34601 | 4563, 2779 (r3-c4) | 118 × 87 m | ~142 px |
Erityisesti:
- **Notre-Dame:** valtavat neliskanttiset kaksoistornit, jotka levenevät ylös, ruusuikkuna ja pitkä laiva. Apsis on itään
  eli kuvassa oikealle, yksi risteystorni. Ei saarta eikä vettä, ne piirrän itse.
- **Louvre:** siivet ja paviljonkikruunut sekä lasipyramidi pihalla, Cour Napoléonin U-muoto avautuu länteen. Ei Tuileries'n puutarhaa.
- **Eiffel:** hoikka nelijalkainen A-ristikko, nostetut näköalatasot, erittäin korkea. Pelkkä torni, ei Champ de Marsia.

## 2. Elävät hahmot ja puut (G:n pieni mittakaava, sijoittelen satoja)
- Puut: `puu-1…6.png`. Pyöreät salvianvihreät ja oliivinväriset latvat G:n tapaan, 2 kapeaa poppelia ja 1 kukkiva.
- Ihmiset: `ihminen-1…12.png`, kävelijät eri vaatteissa ilman punaista, 4 kävelemässä vasemmalle ja 4 oikealle.
- Autot: `auto-1…6-vasen.png` ja `-oikea.png`, nykyautot rauhallisin värein. Bussi: `bussi-vasen/oikea.png`.
  Polkupyörä: `pyora-vasen/oikea.png`.
- Veneet: `bateau-mouche-vasen/oikea.png`, `vene-1/2.png` sekä veneen vana erikseen, `vana.png`.
- Lentokoneet: `kone-1/2.png`, pieni potkurikone kuten G:n yläkulmissa.
- Pöydät: `kahvila-1/2.png`, kahvilan pöytä tuoleineen ja markiisi. `kukkakoju.png`.

Generointi: Codexin kuvien pysyvä lupa. Karttatiedot © OpenStreetMap contributors.
Koepala r3-c4 menee PT:lle G:n rinnalla ennen 35 palan monistusta. Teen sen heti, kun maamerkit ovat tulleet.

