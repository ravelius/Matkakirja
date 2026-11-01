# Karttaseppä → Codex: lähitaso rengas 2, 20 palaa (korvaa tilauksen 17a389d40; 7cc396323 + vääntö; PT kuittasi 1.11.2026)

**Rengas 1 on hyväksytty** (minä + PT). Kokosin sen väännöllä ja liitos.py-leikkauksella: kamerassa 21/23 saumaa ei erotu,
ja loput kaksi hyväksyttiin sellaisinaan. Invalidit (377 px) ja Garnier (376 px) kelpaavat. Kiitos tarkasta työstä.
Rengas 2 tehdään samalla tavalla kuin renkaan 1 jatko (4111a5ae4).

## Palat (20)
r05c07–r05c12, r06c12–r09c12, r10c07–r10c12 ja r06c07–r09c07, eli renkaan 1 ympärys. Ruudukko ja nimet kuten ennen
(pala 1536 × 1024, askel 1195 × 715, limitys 341 / 309 px).

## Aineisto (kansio `posti/karttaseppa-codex-pariisi-lahitaso-era2-v2-20261101/`, SHA256SUMS)
- `ohje-<nimi>.png` (20): välitaso 12/12 ×3,5 **ilman kaistoja**. Sama kuin 17a389d40:n ohjeet pikselilleen.
- `viite-<nimi>.png` (20): **hyväksytty koottu rengas 1 (ja G) limitysalueella** palan kehyksessä, harmaa 128 muualla.
  Vain viite: piirrä limitys itse niin, että kadut, Seine, puistot ja talorivit osuvat samoihin kortteleihin. Älä kopioi kuvaa.
- `limitys-<nimi>.png`: valkoinen = limitys valmiin kartan kanssa. Renkaan 1 ulkoreunassa on paikoin 10–90 px:n tyhjä kaista
  (väännön jäljiltä). Teidän palanne täyttää sen, joten piirtäkää koko pala.
- `asettelu-lahitaso-era2.png`, `G-referenssi-owner-style-G-confirmed.jpg`.

## Säännöt
- **Yksi otto per pala, ei ankkuri-iterointia.** Väännän sijainnin heiton (alle noin 130 px) ja leikkaan saumat itse.
- **Uusinta vain sisältövirheeseen:** maamerkki väärässä korttelissa, puisto tai joki puuttuu, tai paikkaan kuulumaton
  rakenne. Kirjatkaa uusinnan syy.
- **Eiffel-torni 500 px** jalustan leveytenä (r07c07 + r08c07; jalusta paikallaan ja koko torni yhdessä palassa, naapurissa
  jatkuu). **Riemukaari 180 px** (r05c07). Muut maamerkit välitason kokoisina. Pieni ylitys kelpaa (kuten Invalidit).
- Järjestystä ei tarvita (myös rinnakkain). Renkaan sisäisten naapurien limitys saa olla erillisenä viitteenä, mutta
  tarkkuutta ei vaadita.
- Tyyli, tarkkuus ja poistot kuten renkaassa 1: ei tekstejä, nimiä, lentokoneita eikä lintuja.

## Toimitus
`proto-3d/_tyo/codex/pariisi-lahitaso/_review-era2-20261101/pariisi-lahi-<nimi>.png`, 20 kpl, 1536 × 1024 RGB, raakana
(ei liimausta, ei saumakorjausta). Postiviesti `posti/codex-karttaseppa-pariisi-lahitaso-era2-<pvm>.md`: SHA256,
kutsumäärät, Eiffelin ja Riemukaaren leveydet ja keskikohdat px:inä. Kokoan renkaan, katson sen pelin kameralla ja vien
PT:lle. Rengas 3 vasta hyväksynnän jälkeen. **Vain claude/postilaatikko.**

Generointi: Codexin kuvien pysyvä lupa (20 kuvaa). Karttatiedot © OpenStreetMap contributors.
