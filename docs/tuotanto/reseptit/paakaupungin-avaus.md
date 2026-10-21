# C Resepti: pääkaupungin avaus

*(Sisältökirjuri 21.10.2026, studiojako (Raamattu 4.21). Lyhyt tuotetyypin kooste. Suunta: `docs/tuotanto/suunta/kerronta.md`; tekotavat: `docs/tuotanto/tekotavat/tekstit.md`; vaiheet, portit ja luvat: `docs/tuotanto/tuotannonohjaus.md`. Voimassa oleva täysi pohja siirtymäajan: `docs/moduulit/tuotantopohjat/paakaupungin-avaus.md`.)*

## Tuote

Kaikki, mitä pelaaja saa, kun pääkaupunki avataan: kaupunkikartan esittely, oppaan pallolentoesittely (avaus + 8 kohdetta), historiaosiot, lehti (kaupunkilehti ja maalehti tai kevyt maakortti), kohtaaminen ja aarretehtävä sekä Pulun repliikit. Ei sisällä 3D-maamerkkiä (oma resepti) eikä uuden maanosan kaaritekstejä (`tarinakaari.md`).

## Rajaus ja avaamisen ehto

- Uusi sisältö Euroopalle; muut maanosat vain omistajan päätöksellä (Raamattu 1.13, MUUT MAANOSAT VÄHITELLEN).
- Avataan vasta, kun esittelyt ovat valmiit ja pääkaupungin 3D-mittaus on läpäisty (Varsova, Tallinna, Sarajevo ja Vaduz eivät 16.10. läpäisseet).
- Minivaltiot (Andorra, Liechtenstein, Monaco, San Marino, Vatikaani): kevyt sisältö, 3–5 lauseen esittely, ei maalehteä (Raamattu 1.13).

## Tuotokset ja polut

| Tuotos | Polku tai kenttä | Määrä |
|---|---|---|
| Faktapohja | `docs/kohtaukset/kaupunkiesittelyt/<id>.json` (teksti, lähteet, pudotetut, ristiriidat) | kaksi lähdettä per väite |
| Kartan esittely | `KAUPUNKIKARTAT.<id>.esittely` | 600–720 merkkiä, kaksi kappaletta; alku "Kartan alue on …", loppu "Kartan kohteista pääsee lukemaan lisää napauttamalla." |
| Oppaan esittely | `docs/kohtaukset/oppaan-esittelyt/<id>.json` (`aaneton: true`) | avaus 3–5 virkettä + 8 kohdetta (teksti 500–750, lyhyt 220–380, yksi syventävä kysymys, 5 jatkokysymystä, `isoisa: false`) |
| Lehti | `kaupunkilehti.md`, `maalehti.md` | kansi, nostot (440–660 merkkiä), minitehtävä, kohtaaminen; tai kevyt maakortti |
| Aarretehtävä ja kysymykset | `tarinakaari.md` luvut 4–6 | saapuminen ≤ 380, kohtaaminen ≤ 260, aarre ≤ 220, kohde ≤ 800 |
| Pulun repliikit | Tekstit-osasto | vain hyväksytyt rivit ja tyyli (`livia-aani.md`) |

## Reseptikohtaiset säännöt

- Kohteet tulevat Karttasepän kierrosjärjestyksessä; `nimi` on Karttasepän Wikidata-nimi, kerronta käyttää vakiintunutta suomalaista nimeä; `koko_m` on rajausneliö, ei kohteen pituus.
- Pulun hyväksyttyä riviä ei muokata; sanatarkka toisinto (vain kaupungin nimi vaihtuu) ei vaadi uutta rastia.
- Tarkista aina kaupungin oma kulttuurivisa (`kysymys`-kenttä) ennen minitehtävää.
- Jerusalem ilman kannanottoa; Päiväntasaajan Guinean pääkaupunki on Ciudad de la Paz (mainitse Malabo).
- Kuvat vain PD/CC, katsottu silmin; yksi kuva kerran per kaupunki.

## Valmis kun

- [ ] Euroopassa (tai omistajan päätös), 3D läpi, kohdelista saatu.
- [ ] Faktapohja ja pituudet rajoissa; koneellinen tarkistus (`oppaan-esittelyt/tyokalut/tarkista.mjs`) läpi.
- [ ] Riippumaton tarkistus tehty (B tekstit kohta 6), KORJAA-rivit korjattu.
- [ ] Lehti tai maakortti Raamatun linjauksen mukaan; kysymykset eivät osu kaupungin visaan.
- [ ] Luovutusraportti ja retrospektiivi (pohjan opit-osioon, kunnes opit on siirretty).

Vaiheet, hyväksyjät (PT ilman omistajan rastia esittelyille; omistajan rasti Pulun ja isoisän uusille riveille) ja luvat: tuotannonohjaus.
