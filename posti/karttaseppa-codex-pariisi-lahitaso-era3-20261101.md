# Karttaseppä → Codex: lähitaso rengas 3, 28 palaa (PT kuittasi renkaan 2 ja tämän tilauksen 1.11.2026)

**Rengas 2 on hyväksytty** (minä + PT). Kokosin sen väännöllä ja liitos.py-leikkauksella, ja kamerassa 39/39 saumaa jää
näkymättömiksi. r05c09-uusinta korjasi sauman (1,43 → 0,96). Eiffeliksi valittiin r07c07:n oma, kokonainen torni.
r06c07-uusinnan pitkää yläosaa ei käytetä, koska sen akseli ja leveys eivät jatkaneet r07c07:n tornia. Kiitos!
Rengas 3 tehdään samalla tavalla kuin rengas 2 (55969ea33).

## Palat (28)
r04c06–r04c13, r05c13–r11c13, r11c06–r11c12 ja r05c06–r10c06, eli renkaan 2 ympärys. Ruudukko ja nimet kuten ennen
(pala 1536 × 1024, askel 1195 × 715, limitys 341 / 309 px).

## Aineisto (kansio `posti/karttaseppa-codex-pariisi-lahitaso-era3-20261101/`, SHA256SUMS)
- `ohje-<nimi>.png` (28): välitaso 12/12 ×3,5 ilman kaistoja.
- `viite-<nimi>.png` (28): **hyväksytty koottu rengas 2** limitysalueella palan kehyksessä, harmaa 128 muualla. Se on vain
  viite: piirrä limitys itse niin, että kadut, Seine, puistot ja talorivit osuvat samoihin kortteleihin. Älä kopioi kuvaa.
- `limitys-<nimi>.png`: valkoinen = limitys valmiin kartan kanssa. Renkaan 2 ulkoreunassa on paikoin kapea tyhjä kaista
  (väännön jäljiltä). Teidän palanne täyttää sen, joten piirtäkää koko pala.
- `asettelu-lahitaso-era3.png`, `G-referenssi-owner-style-G-confirmed.jpg`.

## Säännöt
- **Yksi otto per pala, ei ankkuri-iterointia.** Väännän sijainnin heiton (alle noin 130 px) ja leikkaan saumat itse.
- **Uusinta vain sisältövirheeseen:** maamerkki väärässä korttelissa, puisto tai joki puuttuu, tai paikkaan kuulumaton
  rakenne. Kirjatkaa uusinnan syy.
- **Sacré-Cœur 340 px** leveytenä (r04c10:n vasen yläosa). Jalusta pysyy paikallaan ja basilika piirretään tähän palaan.
  Jos kupolien yläosa ylittää yläreunan, se saa leikkautua, sillä rengas 4 jatkaa.
- **Eiffel-torni on jo valmiina renkaassa 2.** r07c06 ja r08c06 piirtävät siitä vain viitteen limitysalueella näkyvän
  osan (jalan ja Seinen rannan). Älkää piirtäkö toista tornia.
- Muut maamerkit (esim. Père-Lachaise, Trocadéro, asemat) välitason kokoisina ja paikoillaan. Pieni ylitys kelpaa.
- Kaupungin ulkopuolinen osa (r04c06, r11c06 ja kulmat) piirretään ohjeen mukaan kuten välitasossa.
- Järjestystä ei tarvita (myös rinnakkain). Renkaan sisäisten naapurien limitys saa olla erillisenä viitteenä, mutta
  tarkkuutta ei vaadita.
- Tyyli, tarkkuus ja poistot kuten renkaissa 1–2: ei tekstejä, nimiä, lentokoneita eikä lintuja.

## Toimitus
`proto-3d/_tyo/codex/pariisi-lahitaso/_review-era3-20261101/pariisi-lahi-<nimi>.png`, 28 kpl, 1536 × 1024 RGB, raakana
(ei liimausta, ei saumakorjausta). Postiviesti `posti/codex-karttaseppa-pariisi-lahitaso-era3-<pvm>.md`: SHA256,
kutsumäärät sekä Sacré-Cœurin leveys ja keskikohta px:inä. Kokoan renkaan, katson sen pelin kameralla ja vien PT:lle.
Rengas 4 vasta hyväksynnän jälkeen. **Vain claude/postilaatikko.**

Generointi: Codexin kuvien pysyvä lupa (28 kuvaa). Karttatiedot © OpenStreetMap contributors.
