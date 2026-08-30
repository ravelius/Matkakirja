# Viesti Fablelle — kaksoisnimien korjaus (30.8.2026)

Haara `claude/pyramidi-pilotti`, rebasoitu tuoreesta `origin/main`
(v1361). Ei versionostoa, ei PR:ää.
**Portit: 1048 pass / 0 fail.**

Haara oli jäljessä ja sisälsi squashatut committit uudelleen. Nollasin
sen `origin/mainiin` — tarkistin ensin, että ero oli pelkkä
versionosto (`js/main.js`, `js/muutokset.js`, `sw.js`), eli mitään
työtä ei kadonnut. Nyt haarassa on tasan yksi uusi commit.

---

## Pareja ei ole kolme vaan KUUSI

Tämä on raportin tärkein kohta. Ohjeessa luki "tasan kolme tuplaa:
Alpit, Ahaggar, Appalakit". Kun tein säännöstä yleisen ja mittasin,
pareja löytyikin kuusi: laskenta oli tehty vain **vuoria** (52) vasten,
mutta myös **järvet** (38) kaksintuvat.

| pari | laji | etäisyys (lautayksikköä) |
| --- | --- | --- |
| Titicaca | järvi | 3,8 |
| Appalakit | vuori | 20,3 |
| Tšad-järvi | järvi | 30,3 |
| Tanganjika | järvi | 54,4 |
| Ahaggar | vuori | 95,6 |
| Alpit | vuori | 114,7 |

Kolmen nimen kovakoodaus olisi korjannut puolet viasta ja jättänyt
kolme järveä kartalle kahdesti. Yleinen sääntö löysi ne itse — juuri
siksi ohjeesi olla kovakoodaamatta oli oikea.

Yksi yksityiskohta, joka olisi kaatanut naiivin toteutuksen: lauta
sanoo **Tšad-järvi**, nimilista **Tšadjärvi**. Tarkka
merkkijonovertailu ei olisi nähnyt niitä samaksi nimeksi. Vertailu
tehdään normalisoituna (ilman tarkkeita, välimerkkejä ja
kirjainkokoa).

## Etäisyysraja on vakuutus, ei viritysruuvi

Raja on 400 lautayksikköä. Mittasin herkkyyden sen sijaan että olisin
valinnut luvun tunnelmalla:

| raja | pareja |
| --- | --- |
| 50 | 3 (liian tiukka) |
| 100 | 5 (liian tiukka) |
| 115 … 6000 | **6** |

Kaikki rajat välillä 115…6000 antavat saman tuloksen, joten luku ei
säädä mitään nykyisellä aineistolla — se estää vain sen, että joku
myöhemmin lisää samannimisen paikan toiselle mantereelle ja menettää
nimiönsä. 400 on yli kolminkertainen pelivara kauimmaiseen aitoon
pariin (Alpit 114,7).

## Kumpi nimiö jää — noudatin näkemystäsi, mutta mittaus tarkensi sitä

Näkemyksesi oli oikea: vuoriston kohdalla oikea esitys on vuorisymboli
ja sen nimi, ja laudan MERKIN on jäätävä. Molemmat merkit jäävät, vain
nimiö yhdistetään.

**Mutta suora vaiennus olisi tehnyt uuden vian.** Maastonimillä on eri
yleistyskynnys kuin kaupunginnimillä. Vuorennimi syttyy samalla
kynnyksellä (0,45) kuin kaupungin nimi — siellä vaiennus on ilmaista.
Järven nimi syttyy vasta 0,9:llä kun tärkeys > 1, ja kaupungin nimi jo
0,45:llä. Jos kaupungin nimiö vaiennettaisiin suoralta kädeltä,
**Titicaca, Tanganjika ja Tšad-järvi jäisivät välillä 0,45…0,9
pisteeksi ilman nimeä — kokonaisen tason ajan.**

Siksi sääntö on tasokohtainen: kaupungin nimiö väistää vasta silloin,
kun maastonimi oikeasti piirtyy tällä tasolla. Sitä ennen kaupungin
nimiö nimeää kohteen itse. Tämän näkee liitteenä olevalta
Sahara-laatalta: Ahaggar on vuorisymbolin nimi, ja Tšad-järvi on
samalla laatalla kaupunkinimiönä, koska järvennimi ei vielä syty z3:lla.

Parillinen nimiö ladotaan **kaupungin tärkeydellä** mutta maastonimen
ulkoasulla ja paikalla — muuten se putoaisi tilanpuutteeseen, koska
maastonimet ladotaan vasta kaupunkien jälkeen.

Ladonta ajetaan kerran tasoa kohti koko arkille, joten päätös on sama
joka lohkossa eikä lohkorajalle synny kaksoisnimeä.

## Todennus

Ajoin z0–z3 (109 laattaa) korjatulla koodilla:

```
ladonta z0  0 nimiötä,  0 pudotettu, päällekkäisyyksiä 0, kaksoisnimiä 0
ladonta z1  0 nimiötä,  0 pudotettu, päällekkäisyyksiä 0, kaksoisnimiä 0
ladonta z2  62 nimiötä, 0 pudotettu, päällekkäisyyksiä 0, kaksoisnimiä 0
ladonta z3  295 nimiötä, 18 pudotettu, päällekkäisyyksiä 0, kaksoisnimiä 0
```

Silmällä pyytämäsi laatat:

- **z3 sarake 5 rivi 3** (Sahara): Ahaggar tasan kerran, vuorisymbolin
  nimenä; kaupunkipiste tallella symbolin alapuolella.
- **z3 sarake 5 rivi 2** (Alpit): Alpit tasan kerran, vuorisymbolin
  nimenä Alppien harjalla.
- **z3 sarake 2 rivi 2** (Appalakit): Appalakit tasan kerran,
  vuorisymbolin nimenä; kaupunkipiste tallella.

## Uusi tarkistus, ja todiste ettei se ole tyhjä

Kaksoisnimi **ei ole päällekkäisyys**. Ahaggar oli kartalla kahdesti
satojen pikselien päässä itsestään, eikä olemassa oleva riippumaton
leikkaustesti nähnyt siinä mitään vikaa — se etsi päällekkäisiä
laatikoita, eikä niitä ollut. Se on oma virheluokkansa ja sai oman
tarkistuksensa: ajo kaatuu, jos sama (normalisoitu) nimi esiintyy
tasolla kahdesti.

Tarkistus, joka ei koskaan laukea, ei todista mitään, joten todensin
sen: kytkin parituksen pois ja ajoin uudelleen. Ajo kaatui odotetusti.

```
ladonta z3  297 nimiötä, 19 pudotettu, päällekkäisyyksiä 0, kaksoisnimiä 2
Error: Ladonta jätti 2 kaksoisnimeä tasolle z3 (esim. ahaggar x2)
       — sama nimi saa esiintyä kartalla vain kerran.
```

Tarkistin myös, että sivulle upotettu säännöllinen lauseke on oikea
selaimessa asti. `\p{L}` olisi template-literaalissa muuttunut
hiljaisesti muotoon `p{L}`; poimin valmiin sivukoodin ja koestin
funktion — `Tšad-järvi` ja `Tšadjärvi` normalisoituvat samaksi, `Wien`
ja `Bonn` eivät.

## Sivuhavainto (en korjannut, kulukuuri)

Sama kaksoisnimi on todennäköisesti myös pelin omassa laudan piirrossa:
`js/mapart.js` kokoaa maastonimet samasta nimilistasta, kaupunkien
nimet tulevat laudalta, eikä niitä verrata toisiinsa siellä
sen enempää kuin täällä. Sen törmäyksenvälttely katsoo vain
päällekkäisiä laatikoita, joten etäällä toisistaan oleva kaksoisnimi
menisi läpi samalla tavalla. En todentanut tätä ajamalla peliä enkä
koskenut siihen.

## Muutetut tiedostot

- `tools/fokuskartta/sisalto.mjs` — pariutus (`parita`,
  `normalisoiNimi`, `PARIN_ETAISYYS`)
- `tools/generoi-laattapyramidi.mjs` — tasokohtainen päätös
  ladonnassa, maastonimen ohitus parillisille, kaksoisnimitarkistus
- `docs/moduulit/laattapyramidi.md` — luku 6c.1

Ei versionostoa, ei PR:ää, ei täysajoa, ei vientiä ämpäriin.
