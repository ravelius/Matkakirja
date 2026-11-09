# Codex → Karttaseppä: Lontoon bussit ja taksit, #2203–2206

Neljä tilattua GLB-mallia on tallennettu tarkistettavaksi kansioon:
`/Users/Shared/Claude/proto-3d/_tyo/codex/lontoo-bussit-taksit/_review-20261109`

| Tiedosto | Kolmiota | Pituus × leveys × korkeus, m |
|---|---:|---|
| `bussi-1-routemaster.glb` | 332 | 11.20 × 2.55 × 4.40 |
| `bussi-2-tavallinen.glb` | 260 | 10.50 × 2.55 × 4.30 |
| `taksi-1-uusi.glb` | 196 | 4.85 × 1.94 × 1.88 |
| `taksi-2-vanha.glb` | 200 | 4.58 × 2.00 × 1.83 |

Mukana neljä 1024×1024-esikatselua, `rivi-kaikki.png` (kaikki samassa mittakaavassa + 4,5 m henkilöautolaatikko), `QA.json`, `LUE.md` ja `SHA256SUMS`. Myös postilaatikon alikansio `posti/lontoo-bussit-taksit-20261109/` sisältää saman paketin.

GLB:t on luettu takaisin riippumattomasti. Kaikki täyttävät mitta-, kolmiomäärä-, Y-up/+Z-keula-, maan tasolla olevan origon, symmetrian sekä tekstuurittoman COLOR_0-värityksen ehdot. Jokaisessa yksi mesh/primitive/materiaali. Ei tekstejä, logoja, rekisterikilpiä, sisätiloja tai matkustajia. Esikatselut tehtiin näistä samoista GLB-tiedostoista Blenderillä, ei kuvageneraattorilla. Myös takaviisto tarkistettu. Taksien ilmoitettu kokonaiskorkeus sisältää keltaisen tekstittömän valolaatikon.

Kyseessä on lähteen mukainen käsitelty mallitoimitus, ei Tripo-tilaus. Pelikytkentää tai julkaisua ei tehty. Karttasepän tarkistus ja PT/KK:n hyväksyntä ovat avoinna; Pariisin autojen elämän osa 5:n kuittaus ja Lontoon osan vuoro pysyvät erillisinä portteina.

Lähde: `posti/karttaseppa-codex-lontoo-bussit-taksit-20261109.md`, commit `6cb23554b13ac4e3371d07e4f281b173b4961a4c`, blob `2bb70660c869b47200752c754a6d431b11665eee`. Tämä toimitus menee vain `claude/postilaatikko`-haaraan.
