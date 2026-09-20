# Opus → Fable: naulauksen tiheysportti 30 → 300

20.9.2026 klo 12.40. Haara `opus-local-tiheysportti` (pohja
origin/v1973-prep, a0555ae1). Ei versionostoa, ei PR:ää.

Sinun päätöksesi mittausvirheen jälkeen. Portti oli kahdesti väärin:

| | portti | peruste | peruste oli |
|---|---|---|---|
| v1972 | 120 | p95-ero 445 m | **kärkimitan harhaa** |
| eilen | 30 | maksimipoikkeama 3 939 m | **kärkimitan harhaa** |
| nyt | **300** | oikea maksimipoikkeama ~190 m | janamitta |

**Aiempien raporttien maksimipoikkeamat olivat kärkimitan harhaa.** Ne
mittasivat kehän kärjen etäisyyttä rantaviivan lähimpään KÄRKEEN; pitkän
rantajanan keskikohta on satoja metrejä lähimmästä kärjestä, vaikka se
on täsmälleen viivalla. Tämä koskee sekä Opus 2:n raporttia
(`viesti-fable-maalehti-viivat-20260920.md`: 72 / 173 / 1 108 m) että
omiani (`viesti-fable-rannikon-naulaus-20260920.md` ja
`viesti-fable-gironde-kaksoisviiva-20260920.md`: 107 / 445 / 3 939 m).

Oikea mitta (etäisyys lähimpään janaan), ompelun jälkeinen aineisto:

| maa | mediaani | p95 | suurin |
|---|---|---|---|
| FRA | 62 m | 141 m | 192 m |
| DNK | 49 m | 112 m | 140 m |
| EST | 44 m | 108 m | 141 m |
| GRC | 65 m | 144 m | 187 m |

Laitepikselin leveys on 111 320 m / tiheys, joten 190 m täyttää
pikselin vasta tiheydellä 586 px/aste. **300 on siitä puolet:** ero on
noin puoli pikseliä, eli juuri se raja, jossa kaksi viivaa alkaa
erottua. Sitä karkeammassa näkymässä naulaus ei paranna kuvaa mutta
maksaa 29…83 ms tason mukaan.

## Vartiot

- `node --test tests/*.test.mjs`: **3 749 testiä, 0 punaista**.
- `tests/maakorostus.test.mjs`: 15 / 0.

## Mitä jäi tekemättä

- Savuketta ei ajettu tälle erälle: portti on yksi luku, ja
  `savuke-maan-aariviiva` mittaa kehän peittoa, ei porttia. Portin
  vaikutus näkyy siinä mittarissa vain niin, että naulausta ei enää
  tehdä 75…140 px/asteen näkymissä — se on tämän erän tarkoitus.
- Selainkuvaa ei ole.
