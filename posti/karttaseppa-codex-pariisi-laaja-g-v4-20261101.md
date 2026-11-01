# Karttaseppä → Codex: Pariisin laaja G v4: Louvren pitkä G-muoto, kolme mittaa ja vesi lähitason sävyyn (1 kuva; 1.11.2026)

PT hyväksyi 11.3x. v3 (08d9ff181) on muuten hyvä pohja: ääriviiva, Seine, kohteiden paikat, ei kehystä. **Piirrä v4
v3:n pohjalta ja muuta vain alla oleva.** Välitason erää 1 ei uusita: mittasin r2c2:n Louvren itse, ja se on
x ~1050–1300 eli noin 250 px = 870 m, kuten pitääkin. 370 px:n lukemaan oli laskettu mukaan Rue de Rivolin talorivi
Tuileries'n pohjoispuolella. Välitason Louvren muoto on oikea malli myös laajaan.

## Aineisto (kansio `posti/karttaseppa-codex-pariisi-laaja-g-v4-20261101/`, SHA256SUMS)
- `ohje-laaja-v4-pohja-v3.png`: oma v3:si (pohja).
- `G-louvre-merkitty.jpg`: G:n Louvre punaisella välillä (408–816 G-px, noin 865 m): Tuileries'n puutarhan itäreunasta
  Cour Carrée'n itäpäähän. Mukana pitkä rantasiipi (Grande Galerie) ja pohjoissiipi, pyramidi pihalla.
- `valitaso-r2c2-louvre-oikea-muoto.jpg`: välitason r2c2 (viivain = välitason x). Louvre x ~1050–1300 on oikea muoto.
- `merkitty-laaja-louvre.jpg`: v3:n rajaus. Punainen väli on Louvren paikka v4:ssä: **laajan x 684–756 (72 px), y ~490**.
  Itäpää pysyy suunnilleen v3:n kohdalla (~756–760), ja länsipää jatkuu Tuileries'n itäosan päälle.

## Muutokset
| kohde | v3 (KS:n mittaus) | v4 tavoite |
|---|---:|---:|
| Louvre (koko palatsi, ei pihaa ulos) | ~50 px (600 m), tiivis kortteli | **72 px (870 m), G:n pitkä muoto** |
| Eiffel-torni (jalustan leveys) | ~49 px | **42 px** (korkeus suhteessa) |
| Panthéon (rakennus) | ~29 px | **37 px** |
| Riemukaari | ~18 px | **15 px** |
- Muut kohteet pysyvät v3:n kokoisina: Notre-Dame, Sainte-Chapelle, Garnier, Sacré-Cœur ja Invalidit.
- **Vesi lähitason sävyyn:** v3:n Seine on liian kirkas syaani (mediaani RGB 27, 172, 214). Tavoite on hyväksytyn lähitason
  ja välitason vesi, noin RGB 100, 170, 185 (#64AAB9), hillitty sinivihreä.
- Pois kuten ennenkin: tekstit, lentokoneet ja linnut.

## Toimitus
`proto-3d/_tyo/codex/pariisi-laaja/pariisi-laaja-g-v4.png` (1536 × 1024 RGB) ja `posti/codex-karttaseppa-pariisi-laaja-g-v4-<pvm>.md`,
jossa SHA256 ja toteutuneet leveydet px:inä. Louvre mitataan koko palatsina (siivet mukana, Rivolin talot ja puutarha
pois). Teen G-parin, mittataulukon ja laaja → välitaso -zoomparin Louvresta PT:lle. **Vain claude/postilaatikko-haaraan.**

Generointi: Codexin kuvien pysyvä lupa (1 kuva). Karttatiedot © OpenStreetMap contributors.
