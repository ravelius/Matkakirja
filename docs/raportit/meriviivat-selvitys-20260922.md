# Meriviivat: mikä on liian voimakas ja mikä hyppii (v2106, omistajan tuntumatesti)

Karttaseppä 22.9.2026. Omistaja: *"tietyillä zoomitasoilla meriviivat jäävät
aivan liian voimakkaiksi"* ja zoomatessa *"meriviivojen hyppiminen"*.

## 1. Mitä mitattiin

Tuotannon pallolaatat (`julisteet/pallo/laatat/2026-09-22-pohja-20260922a`)
haettiin ämpäristä kolmelta merialueelta (Lioninlahti 43,0 N 5,5 E; Biskaja
45,0 N −4,0; Tyrrhenanmeri 40,0 N 12,0 E) tasoilta z4–z8 ja niistä laskettiin
musteen osuus meripikseleistä (pikseli selvästi ympäristöään tummempi):

| Alue | z4 | z5 | z6 | z7 | z8 |
| --- | --- | --- | --- | --- | --- |
| Lioninlahti | 70 % | 55 % | 42 % | 19 % | 12 % |
| Biskaja | 38 % | 43 % | 43 % | 25 % | 6 % |
| Tyrrhena | 71 % | 54 % | 52 % | 21 % | 10 % |

Kaappaussarja samalta maa-alalta z5 → z8:
`docs/raportit/kuvat/meriviivat-pallo-z5-z8-20260922.jpg` — z5:ssä rannikon
myötäinen tumma viivanippu, z8:ssa muutama ohut viiva. Viivojen paino siis
putoaa portaittain joka tasonvaihdossa, ja juuri se vaihtuu silmissä
zoomatessa.

## 2. Juurisyy: viivat eivät ole isobaatteja vaan rannikon vesiviivoitus

Poltossa on kaksi eri merimerkintää:

- **`--syvyyskayrat 200,1000,3000`** = oikeat isobaatit
  (`tools/fokuskartta/maailmapiirto.js`, vyöhykkeen raja musteena).
- **`--vesiviivoitus tumma`** = patinan rannikkoviivoitus
  (`tools/patina.mjs` `VESIVIIVAT_TUMMA`: **6 viivaa**, voima 0,42,
  aloitus 4, väli 4,5, kasvu 2,2 — paperivakioina).

Vedos samasta laatasta (pyramidi z7, Lioninlahti) `--vesiviivoitus tumma`
päällä ja pois: `docs/raportit/kuvat/meriviivat-tumma-vs-ei-20260922.jpg`.
**Koko raskas viivanippu on vesiviivoitusta.** Kun se otetaan pois, jäljelle
jää rantaviiva ja vaimeat isobaatit. Todennettu myös niin, että
`--syvyyskayrapeitto 0` ja `--syvyyskayrapeitto 1` antavat tavulleen saman
laatan kuin oletus (md5 sama) — isobaattien peitto ei siis ole se, mikä
näkyy vahvana.

Ja juuri vesiviivoitus on se, joka hyppii: viivat piirretään **etäisyydestä
rantaviivaan**, paperivakioina, laatan omassa pikseliruudukossa. Karkealla
tasolla vyö on muutaman pikselin levyinen ja viivat sulavat yhdeksi tummaksi
nauhaksi; syvällä tasolla sama vyö levittäytyy kymmenille pikseleille ja
vaimenee. Repo on itse kirjannut tämän passin ongelmat 30.8.2026, jolloin
omistaja otti sen pois päältä (`tools/patina.mjs`, VESIVIIVOITUS = null):
*"nykyinen vesiviivoitus on geneerinen ja se saa jäädä pois kunnes se
pohjautuu oikeaan dataan"* — viivat eivät kerro syvyydestä mitään, koska
ainoa muuttuja on etäisyys rantaan. Pohjapolttoon 22.9. se palautettiin
`tumma`-muodossa isobaattien rinnalle.

## 3. Nopea korjaus poltossa

Ei uutta koodia — polton lippu vaihdetaan:

1. **`--vesiviivoitus tumma` pois** (tai `ohut`: 4 viivaa, voima 0,2).
   Tämä poistaa nipun ja sen hyppimisen kokonaan.
2. Jos meri jää tyhjäksi, isobaattien oma peitto nostetaan
   (`--syvyyskayrapeitto` 0,55 → 0,7) — se on vaimeana omalla paikallaan
   eikä nouse yhtä tasoriippuvaisesti, koska se seuraa syvyyttä.

**Ennen ajoa tarkistettava:** vedoksessa `--vesiviivoitus ohut` tuotti
tavulleen saman laatan kuin lipun puuttuminen (md5 d85fd69…), eli `ohut` ei
tuottanut viivoja lainkaan. Jos omistaja haluaa kevyen viivoituksen eikä
täyttä poistoa, tämä on selvitettävä ensin.

**Polton kesto:** pohja z0–z8 + viivat + ranta 75 min (114 shardia, mitattu
21.9. `aja-1.log`), sen jälkeen nostot + nimiöt + pallon sarja ~50 min
(`aja-2.sh`), eli **noin 2 h + vienti ämpäriin**. Per laatta muutos ei maksa
mitään (vedoksissa 14,5 s tasolla 7 sekä ennen että jälkeen).

## 4. Korjaisivatko isobaattivektorit tämän?

**Eivät tätä.** Hyppivät viivat eivät ole isobaatteja vaan rannikon
vesiviivoitusta, joten vektorit eivät koske niihin. Vektorit korjaisivat
isobaattien oman puolen: yksi maantieteellinen murtoviiva piirrettäisiin
vakiolevyisenä ruudulla joka tasolla, jolloin syvyyskäyrä ei vaihda paksuutta
eikä paikkaa tasonvaihdossa — ja silloin vesiviivoitus voitaisiin jättää
pysyvästi pois, kuten 30.8.2026 oli tarkoituskin. Järjestys on siis:
ensin vesiviivoitus pois (tunnit), sitten omistajan päätös vektoreista
(viikko + pohjapoltto).

## Toisto

Ämpärin laattojen mittaus: hae `julisteet/pallo/laatat/<versio>/<z>/<x>/<y>.jpg`
ja laske musteen osuus meripikseleistä. Vedos: `PW_CHROMIUM=… node
tools/generoi-laattapyramidi.mjs <ulos> --tasot 7 --alue 3.5,41.5,5.5,43
--data <gshhs> --korkeuspalat <palat> --joet-pohjaan [--vesiviivoitus tumma]
--syvyyskayrat 200,1000,3000 --syvyyskohina lauta --resepti-json
'{"syvyys":{"litistys":0.8}}' --rannikon-harvennus 0.004 --laatu 0.9
--patina kevyt` (14,5 s, 4 laattaa).
