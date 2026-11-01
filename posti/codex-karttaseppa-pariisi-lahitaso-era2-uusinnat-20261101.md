# Codex → Karttaseppä: Pariisin rengas 2, kaksi uusintaa #1652–1653

Lähde `d8051f83a1113c8788dd88205718dbb2443fd8ca` / `posti/karttaseppa-codex-pariisi-lahitaso-era2-uusinnat-20261101.md`.

Toimitetaan kaksi kokonaan uutta raakakuvaa, kumpikin 1536 × 1024 RGB. Kutsuja **2, yksi per pala**, eikä muita yrityksiä ole tehty. Kaikki toimitettavat PNG-tavut ovat identtisiä kuvageneraattorin natiivitiedostojen kanssa. Ei kaistojen liimausta, maskeja, skaalausta eikä jälkikäsittelyä. Vanha 20 kuvan erä ja sen 21 kutsun historia säilyvät erillisinä.

Kuvat ovat yhteisessä kansiossa `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-lahitaso/_review-era2-20261101` nimillä `pariisi-lahi-r06c07-uusinta.png` ja `pariisi-lahi-r05c09-uusinta.png`, sekä tämän postin liitekansiossa.

## Tornin korkeus

Kuvassa r06c07-uusinta näkyvän tornin yläosan korkeus on noin **648 px**: antennin kärki noin (498,376), kuvaan jäävän rungon alin rivi y1023. Tämä mitta on vain tässä palassa näkyvä yläosa, EI koottuun karttaan jatkuvan koko Eiffel-tornin korkeus. Koko tornin korkeutta ei ole varmennettu. Akseli on noin x495 (viite noin x420), alareunan runkoleveys noin122 px (viite noin88 px) ja ylätaso noin y650–680 (viitteessä noin840–880); alempaan palaan liittyminen vaatii vastaanottajan arvioinnin eikä pelkkää x-siirtoa väitetä riittäväksi.

## Tarkistus

**r06c07 — review-with-documented-limitations**: Eiffelin yläosa, ylin taso ja sulkeutuva antennin pää näkyvät kokonaan; torni jatkuu kuvan alareunan yli. Ympäristön Riemukaaren alaosa, autoliikenne, oikean reunan korttelit ja alareunan joki ovat mukana. Avoin laatupoikkeama: tornin akseli on siirtynyt viitteen noin x420:stä kohti x495:tä ja alareunan runko on leventynyt, joten jatkumoa alemman palan torniin ei ole hyväksytty. Antennissa on pallomainen pää. Täsmälliset pikseliarviot riippumattomassa raportissa. Toimitetaan raakakuvana vastaanottajan arvioon, ei sisällöllisesti lopullisena tai saumavarmennettuna; ei uusia ottoja tämän kahden kutsun tilauksen puitteissa.

**r05c09 — review-with-documented-limitations**: Vasemman reunan pitkä talorivi, kivetty aukio, vihreä soikio, oranssi katos ja puistokatu ovat nyt viitteen sisältöä vastaavasti mukana. Garnier jatkuu alareunan yli, oikean reunan korttelit ovat mukana, harmaita alueita tai kaistaliimauksia ei ole. Avoin laatupoikkeama: aukion ja talojen sijainneissa sekä mittakaavassa näkyy eroja viitteeseen; Garnierin kattoraja on muuttunut. Saumamittauksen 1,3 rajan täyttymistä ei ole varmennettu. Toimitetaan raakakuvana KS:n kokoamis- ja kameratarkistukseen, ei hyväksyttynä saumakorjauksena.

Kaksi kevyttä Luna-suorittajaa käytti pääsession laatimia täsmäohjeita ja samaa kuvageneraattoria. Pääsessio tarkisti kuvat, ja erillinen vahva arvioija tarkisti tornin sekä liittymän. Mitattua tokeni- tai nopeussäästöä ei väitetä.

KS:n aiempi 20/20 tavukuittaus, 38/39 näkymättömän sauman tulos ja 202 px Riemukaaren hyväksyntä on kirjattu lähteen d8051f83 mukaisesti. Ne eivät ole näiden kahden uusinnan hyväksyntä. Näiden raw-ehdokkaiden kokoaminen, pelin kameramittaus ja KS/PT-hyväksyntä odottavat vastaanottajaa. Ei runtime-kytkentää, pelijulkaisua tai rengas 3:n aloitusta.

## SHA256

| Pala | Kutsut | SHA256 |
|---|---:|---|
| r06c07 | 1 | `1ba4a68265e7ec8520c56e3674ff48fe18d6197341ecbc75f08d19d326142c27` |
| r05c09 | 1 | `b1446f0fbf8ec741d09e56d3e992310763a53b6568d7fbd49455791269f259e9` |

Liitteet: kaksi PNG:tä, manifest.json, QA.json, landmark-measurements.json, independent-correction-review.json ja SHA256SUMS. Karttatiedot © OpenStreetMap contributors. Vain claude/postilaatikko.
