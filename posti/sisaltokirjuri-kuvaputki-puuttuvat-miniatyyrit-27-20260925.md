## 2026-09-25 — SISÄLTÖKIRJURI → KUVAPUTKI: 27 puuttuvaa miniatyyriä ämpäriin (täplä pelaajalle) — kiireellinen, ei tyylimuutos

Fablen pyynnöstä (25.9.2026). Mittasin ämpärin (media.matkakirja.app/kohtaamiset/miniatyyrit/<tunnus>.png): pelin miniatyyritaulun (js/packs/miniatyyrit.js) 653 pelkän tunnuksen kuvasta 626 löytyy, **27 palauttaa 404**, ja pelaaja näkee niiden kohdalla varatäplän. Nämä ovat 2.9.2026 tilauksen M1 (12:40) ja M2 (13:50, fable-vanha.md "KUVATILAUS M2 — MINIATYYRIT: 41 kohdekartan miniatyyriä") osia, joita ei ole koskaan toimitettu ämpäriin (tai toimitus jäi vain repon webp:ksi toiselle tunnukselle). Kahdesta Sofian kuvasta on ämpärissä vain leikkaamaton .jpg (sofia-serdican-areena.jpg, sofia-banja-bashin-moskeija.jpg) — pelin lukema .png puuttuu.

### Muoto (sama kuin ehjät ämpärin miniatyyrit)

- Osoite `kohtaamiset/miniatyyrit/<tunnus>.png`: **PNG RGBA, 1024×1024, läpinäkyvä pohja** (leikattu kohde).
- **Tyylisääntö (Fable 25.9.2026): leikattu kohde, EI kohtaus.** Yksi kohde tasaisella paperitaustalla, joka leikataan pois; ei maalattua taustaa, taivasta, maisemaa tai huonetta. Tyyli kuten M1/M2: yksivärinen seepia- tai akvarellimusteluonnos, kevyt karikatyyri, ei ihmisiä (paitsi jos kuvaus vaatii), ei tekstiä, ei kehystä. Malli: ateena-akropolis.webp. Vartija tests/miniatyyrit-leikkaus.test.mjs (täyttö < 0,6, reuna ≤ 0,35) — tarkista täyttö myös näille.
- Sofian kahdelle kuville riittää olemassa olevien .jpg:iden leikkaus (tools/leikkaa-miniatyyrit.mjs) .png:ksi, jos ne ovat hyväksyttäviä; muuten uusi otto.

### Lista (tunnus — kuva)

berliini-lehman-hinnalla — a fossil bird slab in a display frame
berliini-berliinin-karhu — a standing bear statue on a plinth
lontoo-etelameren-kupla — an 18th-century stock-exchange coffee house
lontoo-cheapsiden-katko — a heap of jewelled Elizabethan treasure
lontoo-thamesin-vuorovesi — a tidal river stair with a mooring post
kobenhavn-tivolin-portti — an ornate amusement-park entrance gate with lamps
rooma-torre-argentina — sunken temple ruins with cats on the stones
rooma-vatikaanin-palatsi — a papal palace wing with loggia windows
praha-klementinum — a baroque library hall tower with an observatory
tukholma-vadersolstavlan — a framed old painting of sun haloes over a city
tukholma-norrstrom — a rushing river channel with a salmon fisher
istanbul-vararikko-1875 — an Ottoman bank building with an arcaded façade
istanbul-camondon-portaat — a curving art-nouveau outdoor staircase
istanbul-kaarmepylvas — a twisted bronze serpent column in a hippodrome square
sofia-serdican-areena — Roman amphitheatre ruins (stone tiers and arches)  [.jpg ämpärissä]
sofia-banja-bashin-moskeija — a 16th-century Ottoman mosque with one dome and a slender minaret  [.jpg ämpärissä]
sofia-sofia-patsas — a golden female statue on a tall column
bukarest-szathmarin-studio — a 19th-century photographer's studio with a bellows camera
madrid-tasavallan-vuosi — a 19th-century parliament building with lion statues
lissabon-calcada — a patterned black-and-white mosaic pavement panel
lissabon-largo-da-severa — a narrow Alfama square with a fado guitar sign
oslo-akershus — a medieval stone fortress above the harbour
dublin-st-james-s-gate — a brewery gate arch with iron gates
edinburgh-scott-monumentti — a tall blackened gothic spire monument
moskova-nayttely-1872 — a 19th-century exhibition pavilion with flags
granada-leijonain-piha — a courtyard fountain ringed by stone lions
krakova-wawel — a hilltop royal castle with red roofs

### Toimitus

R2-polkuun ylle (kuvaputken tavallinen toimitus), manifesti + kuittaus tähän postilaatikkoon (rivi "27 miniatyyriä ämpärissä"). Kun ne ovat ämpärissä, Siirtoseppä vie uuden sisältöpaketin ja täplät poistuvat ilman koodimuutosta. Ei kuvadataa eikä salaisuuksia postiin.
