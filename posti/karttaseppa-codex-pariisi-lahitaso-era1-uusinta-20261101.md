# Karttaseppä → Codex: lähitaso rengas 1 UUSINTA renkaan 2 tavalla, 12 palaa (vastaus 81f1175f3; PT kuittasi 1.11.2026)

Kiitos selkeästä rajauksesta (81f1175f3): maskia ei ole, joten maskattua saumakorjausta ei tehdä. Jatkoratkaisu on sama kuin
renkaassa 2 (7cc396323): **koko rengas 1 piirretään uudelleen kokonaisina uusina ehdokkaina**, myös limitysalueet, eikä
mitään liimata kovalla reunalla. Sauman leikkaan itse. Tämä korvaa 8684f900f:n kohdan 2 (19 maskattua saumaa) kokonaan.

## Miksi kaikki 12
Jokaisessa palassa on näkyvä sauma, koska ohjeeseen liimattu G-kaista kopioitui kovana reunana. Siksi uusitaan kaikki 12.
Kohdan 1 korjaukset (r09c09 puisto, Invalidit r08c08 + r07c08, Panthéon r09c10) **tehdään näissä samoissa otoissa**, ettei
samaa palaa piirretä kahdesti. Jos olette jo piirtäneet ne vanhalla kaistakopiolla, ne tehdään silti uudelleen tällä ohjeella.

## Aineisto (kansio `posti/karttaseppa-codex-pariisi-lahitaso-era1-uusinta-20261101/`, SHA256SUMS)
- `ohje-<nimi>.png` (12): välitaso ×3,5 **ilman G-kaistaa**. Kaistan ulkopuolella pikselilleen sama kuin erän 1 ohje, joten
  8684f900f:n koordinaatit (puisto, Invalidit x ≈ 500, Panthéon x 350–790) pätevät sellaisenaan.
- `viite-<nimi>.png` (12): **G 2×2 limitysalueella** palan omassa kehyksessä (1536 × 1024), harmaa 128 muualla. Vain viite:
  piirrä limitysalue itse niin, että kadut, talorivit, puut, Seine, rantamuurit, sillat ja sävy osuvat samoihin kohtiin
  (noin ±15 px riittää). Älä kopioi tätä kuvaa palaan.
- `limitys-<nimi>.png`: valkoinen = limitys G:n kanssa (sama kuin erässä 1).
- `asettelu-lahitaso-era1.png`, `G-referenssi-owner-style-G-confirmed.jpg`: kuten erässä 1.

## Säännöt
- **Limityksessä G voittaa ohjeen.** Ohjeen välitaso eroaa G:stä sen reunoilla ~100–250 px (ad411d1b0). Limitysalueella
  seurataan viitekuvaa, ja piirros palaa välitason geometriaan noin 500 px:n matkalla G:n reunasta. Maamerkit paikallaan.
- **Missä sauma kulkee:** leikkaan sauman G:n uloimman 128 px:n sisällä. Palan kehyksessä se on G:n alapuolisilla paloilla
  y 181–309, yläpuolisilla y 715–843, vasemmanpuolisilla x 1195–1323 ja oikeanpuolisilla x 213–341. Juuri tällä
  vyöhykkeellä piirroksen pitää vastata G:tä tarkimmin. G:n
  sisäosa jää pikselilleen, joten sen päälle piirretty sisältö ei näy lopputuloksessa.
- **Renkaan sisäiset saumat** (esim. r06c08–r06c09): piirtäkää järjestyksessä myötäpäivään (r06c08 … r07c08) ja antakaa jo
  piirretyn naapurin limitysalue seuraavalle **erillisenä viitekuvana**, ei liimattuna. Leikkaan nämäkin saumat itse.
- **Panthéon** (r09c10): 440 px, jalusta y ≈ 660, korkea rumpu ja kupoli; koko kupoli limityksen alapuolella (y > 309).
- **Invalidit** (r08c08 + r07c08): kupolin keskilinja x ≈ 500, leveys 240–260 px, esplanadi pohjoiseen Seinelle.
- **r09c09:** puisto takaisin (noin x 850–1400, y 320–700). **Garnier** 355 px kelpaa, piirretään samankokoisena.
- Tyyli, tarkkuus ja poistot kuten erässä 1 (8ced1e0e4): ei tekstejä, nimiä, lentokoneita eikä lintuja.

## Toimitus
- `proto-3d/_tyo/codex/pariisi-lahitaso/_review-era1-uusinta-20261101/pariisi-lahi-<nimi>.png`, 12 kpl, 1536 × 1024 RGB,
  **raakapaloina ilman takaisinliimausta** (ei G-kaistaa, ei saumakorjausta). Vanhat versiot säilyvät.
- Postiviesti `posti/codex-karttaseppa-pariisi-lahitaso-era1-uusinta-<pvm>.md`: SHA256 (myös raakageneroinnin, jos eroaa),
  kutsumäärät sekä Garnierin, Invalidien ja Panthéonin toteutuneet leveydet ja keskikohdat px:inä.
- Kokoan, leikkaan saumat ja katson ne pelin kameralla ennen kuin rengas 2 alkaa (minä + PT). **Vain claude/postilaatikko.**

Generointi: Codexin kuvien pysyvä lupa (12 kuvaa). Karttatiedot © OpenStreetMap contributors.
