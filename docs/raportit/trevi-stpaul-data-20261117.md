# Trevi ja St Paul dataksi (SK 17.11.2026, KK:lle)

Pohja: P-261117-96 (KK 20.00) ja S-14 (P-261117-90). Teksti, vuosirivit, visat ja lähdetaulukot: `docs/raportit/trevi-stpauls-tarinaluonnos-20261117.md` (PR 7086, tekstiin ei koskettu). Malli: Tuileries ja Eiffel-torni (`js/packs/fokuskohteet-fra.js`).

## Mitä tehtiin

**Trevi** (uusi kohde `trevi`, `js/packs/fokuskohteet-ita.js`): nimi + esittely + isoisän koukku + 4 kertojan jaksoa, 5 kuvaa, vuosirivit 1732 / 1751 / 1762, visa ennallaan (Caritas), Pulun 3 kysymystä ennallaan. Yhdistyvät yhteen merkkiin: täkynosto `rooman-kolikko` (poistettu `fokusvirta-rooma.js`), nähtävyysjuttu "Trevin suihkulähde" ja juttu "Kolikko olan yli" (poistettu `nahtavyysjutut.js`). Kohdekartan piste avaa `['trevi', 'nosto-aqua-virgo']`: Aqua Virgo jää omaksi lyhyeksi tarinaksi.

**St Paul** (olemassa oleva kohde `st-paulin-katedraali`, `js/packs/fokuskohteet-gbr.js`): nimi + 4 kertojan jaksoa, 3 kuvaa, vuosirivit 1561 / 1666 / 1675 (1710 EI, KK 15.36), uusi visa (palaneelle torninhuipulle tehtiin: ei rakennettu uudelleen), nappi ei paljasta vastausta. Vanha `teksti` poistettu, se lasketaan jaksoista (sama silmukka kuin FRA:ssa).

**Äänitysjono**: 10 riviä (`tarkista.mjs --lisaa`: Trevi 6, St Paul 4). Ei äänitystä: odottaa KK:n sanaa AJA. **Ei Codex-kuvia.**

## Poikkeamat luonnoksesta (KK:n tiedoksi)

1. **Vuosirivi "19 eaa." pois** (Trevi): jaksotesti sallii vain numeromuotoisen vuoden. Ruudulla vuosirivejä kolme.
2. **Trevin jaksoilla 2 ja 4 ja St Paulin jaksolla 2 ei ole kuvaa**, koska Codex-tilauksia ei tehdä (P-96); edellinen kuva jää näkyviin. Kuvat on valittu vapaista lähteistä (Commons, lisenssit luettu rajapinnasta 17.11.).
3. **St Paulin Hollar-palokuva (1666, CC0) jäi pois**: testi vaatii viimeisen jakson pääkuvaksi valokuvan, ja `lisakuva` ei kelpaa siihen. Jos halutaan, palokuva voi tulla jaksoon 4 pääkuvaksi, kun NUI höllentää testin.
4. **Kuvalaji "kaiverrus"** ei ole jaksotestin lajeissa; kaiverrukset on merkitty lajiksi `piirros` (KK 15.36: kaiverrus periaatteessa kyllä, toteutus NUI:lla).
5. **St Paulin kolmas Pulun kysymys on uusi**: nostolla pitää olla tasan kolme. "Miten Lontoon suuri palo levisi vanhaan St Pauliin?" (lähde: Leicesterin erikoiskokoelmat, rakennustelineet levittivät tulen). Pulun vastauksia ei ole kirjoitettu (vanhat avaimet ja nämä kaikki).
6. **Trevin ääninäyte menetettiin**: vanhan täkynoston `aani` (Rolf Yngve, "Walking to Pantheon", public domain) ei kulje kohdekortille, koska kohde ei kanna `aani`-kenttää. Testi "ääninosto saa mediarivin" poistettu (ainoa esimerkki oli tämä nosto), rivi poistettu 5 musiikkinoston listalta.
7. **Trevin jaksojen osa-merkinnät**: jakso 2 `tapahtuma` (luonnoksessa "koukku"), koska nostolla on yksi koukku.
8. **St Paulin pääkuvan teksti** (`kuva.lyhyt` / `selite`, "valmistui 1710") on koskematta: se on kohdekortin vanhaa hyväksyttyä tekstiä. Se on ristiriidassa päätöksen "1710 EI vuosirivillä" kanssa vain siltä osin, että vuosi on kuvatekstissä; KK päättää, vaihdetaanko.
9. **St Paulin nähtävyysjuttu "Pyhän Paavalin katedraali"** (Wrenin kupoli, 1940-valokuva) ja Old St Paul's -kadonneen ihmeen piste jäivät ennalleen (L5: yhdistäminen on erillinen asia).

## Tarkistukset

`npm test` vihreä, `tools/aanitysjono/tarkista.mjs --lisaa`: OK. Jaksotesti (`tests/noston-jaksot.test.mjs`) kattaa molemmat kohteet (jaksojen määrä, pituudet, vuosirivit, vastaus ei näy ruudulla, Pulun kysymykset kolme).

## KK:n luettavaksi ennen AJA:a

Puheteksti = luonnoksen taulukot (sama teksti, nimi- ja esittelyjakso lisätty). Ääntämislista: Nicola Salvi, Giuseppe Pannini, Oceanus, Caritas / Caritakselle, Aqua Virgo, Christopher Wren / Wrenin, Ludgate Hillillä, St Paul / St Paulin. Riippumatonta tarkistajaa ei ole ajettu; teksti on sama kuin luonnos, jonka KK luki 15.36.
