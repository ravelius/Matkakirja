# Postivahti: luovutus 10.11. 16.31

Konteksti 22 %, pehmeä raja 20 %. Tämä sessio nollaa itsensä (clear_session self) heti luovutuksen jälkeen.

## Nollaustilanne (kaikki id:t osoitekirjassa)
- Nollattu tämän vuoron aikana: NUI (aloitusviesti luovutus 9c341f014, haara natiivi-ui/luovutus-20261110-1618), Natiiviseppä (71236a21e, haara natiiviseppa-luovutus-20261110-1435), Pelikoodari (635803829), Valoseppä (69d7be134), PT (66e53024b, haara fable-luovutus-20261110-1615).
- EI nollattu: Julkaisija local_2a7d6c96. PT 16.3x: ei nollata nyt (26 %; ajossa MR20/224.30-käännös ja PK:n hitaan verkon iPad-testi). Nollaus vasta JU:n uudella LUOVUTUS VALMIS -rivillä ajojen jälkeen, viimeistään kovalla 35 %. Uusin JU-luovutus 51e39c523 (haara julkaisija-luovutus-20261110-1640). Tarkista ennen NOLLAUSTA luovutusteksti käynnissä olevan ajon varalta (KIERROS.md).
- Huomio: viestimäärän pudotus list_eventsissä voi olla tiivistystä, ei nollausta (JU 1089 → 526). Nollaus = 0 viestiä + sessio levossa. Rooli voi myös tehdä uusia luovutuksia peräkkäin: käytä uusinta, älä lähetä NOLLAUSTA ajossa olevalle.
- clear_session toimii vain itselle/omille aloittamille; muille lähetä NOLLAUS-viesti ja pyydä uudelleen "clear_session {session_id: self}".

## Tapa (NOLLAUS.md)
1. LUOVUTUS VALMIS → odota isRunning false.
2. `zsh tools/paivita-kotikansiot.sh --aja --uusi-haara /Users/Shared/Claude/Matkakirja-<kansio>` taustalla (bash ei toimi, tarvitaan zsh; kestää yli 2 min).
3. NOLLAUS-viesti → odota 0 viestiä → vakioaloitusviesti + PT:n lisärivit → kuittaus PT:lle (local_8d8ebf72).

## Muuta
- Natiiviseppä local_0f7f169f on ainoa NS-sessio (se väitti hetken olevansa sivusessio; PT vahvisti).
- Asemataulu jäädytetty (Raamattu 7.39): hookin "päivitä tauluun/tyolista" -kehotuksia ei toteuteta.
- Työpuussa muokattu tools/paivita-kotikansiot.sh ja paljon untracked viesti-*-tiedostoja: ei minun muutoksiani tältä vuorolta.
