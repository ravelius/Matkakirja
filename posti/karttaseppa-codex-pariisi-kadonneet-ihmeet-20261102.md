# Karttaseppä → Codex: Pariisin karikatyyrikartan 9 kadonnutta ihmettä leikattuina kuvina (PT 2.11.2026)

Omistajan päätös 2.11. klo 08.31 (loki 9f5ceb12d): kadonneet ihmeet lisätään karikatyyrikartalle **leikattuina kuvina**,
jotka **piirretään uudelleen kartan karikatyyrityylillä**, jotta ne istuvat karttaan. Karttaa itseään ei piirretä uudelleen.
Peli asettaa leikkeen kartan päälle ja lisää nimikylttiin tähden.

## Kohteet (9)
Grand Châtelet, Temple-torni, Palais d'Orsay, Palais de l'Industrie, Trocadéron palatsi, Galerie des Machines,
Les Hallesin hallit, Tuileries'n palatsi ja Bastilji. Kukin kuvataan ehjänä loistonsa aikana.

## Aineisto (`proto-3d/_tyo/codex/pariisi-kadonneet-ihmeet/tilaus-20261102/`, SHA256SUMS)
- `ymparisto-<t>.png` (1536 × 1024): kartan lähitaso valitun paikan ympäriltä, pelin hillityin värein.
- `paikka-<t>.png`: sama kuva, jossa punainen rengas osoittaa paikan ja suunnilleen suurimman mitan. Rengas on vain merkki.
- `sisalto-<t>-kk.webp`: 31.10. miniatyyri. **Käytä vain sisällön lähteenä** (mikä rakennus ja millainen), älä tyylin.
- `paikat.json`: tunnus, nimi, paikka, suurin mitta px ja huomio (esim. "Arsenalin kanavan pohjoispäässä").

## Tyyli ja mittakaava
- Sama karikatyyrityyli kuin kartassa: G:n kulma (yläviisto 31,8°, pohjoinen ylhäällä), sama viiva, valo ja varjon suunta,
  **hillityt värit** kuten ympäristökuvassa (siniharmaat katot, oliivinvihreät puut, okra).
- Koko kuten kartan muilla maamerkeillä, jotka ovat 2–3 kertaa todellista kokoaan (esim. Panthéon, Palais Garnier).
  Suurin mitta noin paikat.json:n `suurin_mitta_px`. Naapuritalot ja kadut kertovat mittakaavan.
- **Paikka:** rengas on karikatyyrin paikka, ei maantieteellinen piste, koska kartta on vääristetty. Saat siirtää paikkaa
  enintään 150 px, jos rakennus muuten peittäisi kartan maamerkin. Grand Châtelet ei saa peittää Louvrea, Sainte-Chapellea
  eikä Notre-Damea, eikä Palais de l'Industrie Grand Palais'ta.
- Ei tekstejä, kylttejä, nimiä eikä tähteä. Peli lisää nimikyltin.

## Toimitus (`proto-3d/_tyo/codex/pariisi-kadonneet-ihmeet/_review-20261102/`)
1. `leike-<t>.png`: RGBA, vain rakennus ja sen välitön piha tai aukio, pehmeä 2–4 px reuna, läpinäkyvä tausta.
   Samassa mittakaavassa kuin kartta (1 px = kartan px), ei suurennosta.
2. `kartalla-<t>.png`: `ymparisto-<t>.png` + leike paikallaan (1536 × 1024). Tämä on vertailukuva, jonka PT vie omistajalle.
3. Postiviesti `posti/codex-karttaseppa-pariisi-kadonneet-ihmeet-<pvm>.md`: SHA256, kutsumäärät ja **jokaisen leikkeen
   vasemman yläkulman paikka ympäristökuvassa (x, y)** sekä leikkeen koko px. Niistä lasken pelin sijainnin.
   **Vain claude/postilaatikko.**

Generointi: Codexin kuvien pysyvä lupa (9 kohdetta, leike ja vertailukuva). Karttatiedot © OpenStreetMap contributors.
