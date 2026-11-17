# Vuosirivit jokaiselle kertojan sanomalle vuodelle (SK 18.11.2026)

Tilaus: omistaja 17.11. 23.15 (P-261117-116, S-15): viiden rivin katto pois, vuosirivi jokaiselle vuodelle, jonka kertoja sanoo; rivit käsin tekstiä vasten. Pohja: main 542758fa9c. Viisi kaupunkia (Pariisi, Lontoo, Amsterdam, Wien, Rooma) + 6 hetkeä.

## Mitä tehtiin
- **+28 riviä 23 nostoon** (`js/packs/nahtavyysjutut.js`), tekstin järjestyksessä, selite ≤ 3 sanaa ja ≤ 20 merkkiä, kohta tasan kerran. Mikään teksti ei muuttunut.
- **Raja 5 → 12** (`tools/sisalto/noston-vuodet.mjs` RIVEJA_ENINTAAN, jaksotesti, vuositestin 6→13 rivin koe): vain järkevyysraja; sisällöllistä kattoa ei ole. Suurin nosto nyt 9 riviä.
- Testit: noston-vuodet + noston-jaksot vihreät.

## Lisätyt rivit (vuosi, selite)
- Panthéon: 1780 Soufflot kuoli · 1995 Curie siirrettiin
- Notre-Dame: 1944 de Gaulle kiitti
- Orsay: 1876 Renoirin maalaus
- Grand Palais: 1855 vanha näyttely
- Saint-Eustache: 1969 tori Rungisiin
- Bizet 1875: 1876 Bryssel · 1878 Lontoo, New York
- Old St Paul's: 1314 kirkko valmistui
- Westminster Abbey: 1745 länsitornit · 1300 kruunajaistuoli · 1996 kivi Skotlantiin · 1920 tuntematon sotilas
- British Museum: 1997 kirjasto muutti
- Victoria Memorial: 1924 valmistui kokonaan
- Albert Memorial: 1998 korjaus valmistui
- Timanttihiomo: 1879 hiomo valmistui
- Kissalaiva: 1966 kissoja kotiin
- Yövartio: 1946–47 lakkaa poistettiin
- Vanha Burgtheater: 1741 teatteri alkoi
- Belvedere: 1781 galleria avattiin
- Schönbrunn: 1805 Napoleon majoittui · 1809 Napoleon taas
- Klimtin maalaukset: 1884 yliopisto avattiin
- Lipizzanit: 1798 Piber perustettiin
- Beethoven 1824: 1870 teatteri suljettu
- Praterin jättiratas: 1937 Rotunde paloi
- Espanjalaiset portaat: 1723–1725 portaat rakennettiin
- Meta Sudans: 1858–1890 valokuvia · 1936 purku

## Jätetty pois (KK päättää)
Lähdetarkistus 17.11. ei tukenut vuotta tai se oli yhden lähteen varassa; rivi toistaisi tekstin väitteen otsikkotasolla, joten jätin:
- Panthéon 1758 (CMN: peruskivi 1764) · Saint-Eustache 1846–1854 (korjausvuodet eroavat), 1649 ja 1655 (ei varmistettu) · Pompidou 1970–1971 (alkuvuosi ei vahvistunut) · Piaf 1946/1947 (levytys 1946, single 1947) · Monet 1872 (yksi lähde)
- Vanha London Bridge 1758–1761: lähteet sanovat yleensä 1758–1762 (huomaus tekstille, ei riville)
- Nasone 1872: teksti itse epäilee ("yksi lähde antaa vuodeksi 1872")
- Lavoisier/Arsenaali 1770: väärä osuma ("1770-luvuilla", vuosikymmen)
- Jo kenttänä olevat tai muut kuin vuodet: Tower n. 1078, Cheapsiden n. 1600, Maitotyttö n. 1660, Jättiratas 1928/1985 ja Saliera 1540–1543 ja Lipizzanit 1729–1735 (välirivi kattaa), Schönbrunn "1441" (huoneiden määrä), Royal Observatory 1940-luku (vuosikymmen)

## Jaksomuotoiset nostot (Tuileries, Louvre, Bastilji, Eiffel, Sainte-Chapelle, Trevi)
Kertojan vuodet on jo riveinä. Ainoa puuttuva on isoisän päiväkirjan päiväys "Pariisi, 1873." / "Rooma, 1873." koukussa (isoisän ääni, ei kertoja; vanhoissa nostoissa 1873 on rivi "isoisän matka"). Tulkinta KK:lle: lisätäänkö? Ei lisätty. Bastiljin "ei 1789:stä" toistaa jo rivinä olevan vuoden.

## Ehto
EI yhdistetä ennen kuin NUI:n vieritystuki (max 4 riviä näkyvissä, vierii kerronnan mukana) on pelissä: 9 rivin nosto ylittäisi lapun.
