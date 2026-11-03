# A2 erä 1 k2 — tarkistus 3.11.2026

**Koevedokset toimitetaan; kokonaislaatu ei läpäise.** Kaksi uutta kokonaista kuvaa, yksi sisäänrakennetun imagegenin generointikutsu kumpaankin. Ei puun eikä Notre-Damen uusintaa tässä erässä.

## Kortteli-haussmann-k2.png — 1024 × 1024 RGB
Tiheys parani ja laajat paperivälit poistuivat. Ei katuja, puita, nurmea tai ulkoreunaa. Eteläjulkisivut näkyvät myös sisällä. Suurennoksessa niissä on kuitenkin tyypillisesti 2–3 näkyvää ikkunariviä eikä pyydettyä noin viittä/kuutta kerrosta. Näkyvien pitkien julkisivusegmenttien talorajojen erottuminen ei riitä varmistamaan 10–20 px:n yksittäisiä taloja; osa segmenteistä on selvästi suurempi. 8–16 metrin taloleveys EI varmennettu.
**Saumat eivät läpäise:** 2×2- ja offset-tarkistuksessa katot ja seinät katkeavat. Vastakkaisten reunojen keskimääräinen RGB-ero X 28,910 ja Y 29,438 /255; sisäiset vierekkäiset 24,483 ja 18,480. Tämä on numeerinen havainto, ei itsenäinen hyväksyntäraja.
Natiivi 1254×1254 → suhteet säilyttävä 1024×1024-vienti. Ei reunan maalausta, peilausta tai sekoitusta.

## Julkisivu-haussmann-k2.png — 2048 × 128 RGBA
Natiivi on 1586×992; siinä on yksi yhtenäinen vaakasuora talorivi läpinäkyvällä taustalla. Tilaus sallii koostamisen leveämmästä kuvasta. Poimin tästä samasta rivistä jakson [193,427,1561,598], pienensin sen suhteet säilyttäen 1024×128:aan ja toistin kaksi kertaa. **Ei neljän rivin atlasta.** Leikkauspari valittiin pienimmän reunaeron perusteella ja liitos katsottiin suurennoksesta. Keskellä on yksi toistoliitos x=1024 ja sama liitos ulkoreunalla; räystäs/parvekekorkeudet jatkuvat eikä vanhaa neljän paneelin porrastusta ole. Yksittäisten koristeiden täydellistä jatkuvuutta ei silti merkitä varmennetuksi. RGBA-reunaeron keskiarvo 8,154/255.
Seinä alkuperäisen noin y=461 räystäästä y=597 maantasoon → **101,8 px**, tavoite noin102 px saavutettu viennissä. Katon alaosa säilyy; osa savupiippujen huipuista rajautuu yläreunaan (noin9 natiivipikseliä). Ei erillistä katon venytystä.
**Kerrokset eivät läpäise:** näkyy maantasokerros + kolme ylempää ikkunariviä + mansardi, ei kuutta julkisivukerrosta. Parvekkeiden sijaintia 2./5. kerroksessa ei siksi hyväksytä.
**Alfa 0/255 -vaatimus ei läpäise:** alfa0-pikseleitä on3138, alfa255-pikseleitä730 ja osittaisia258276. Näistä249858 on lähellä peittävää (240–254), mutta läpikuultavuutta esiintyy myös seinän sisällä eikä vain1–2px reunassa. Taustan aiempi peittävä vaalea laatta poistui; taustalla on silti pieniä lähes näkymättömiä alfajäämiä. Alkuperäinen alfa säilytetty; ei kynnystystä, maalausta tai taustanpoistoa jälkikäteen.

## Lähde ja tila
Lähdeposti 85d668272983bf5f3267a97b0744b0626fc385bc / blob d87648e7be9f52b6b9f7a05937067d3c9d7b6bb6. TILAUS.md SHA256593ef4c2f19e98dc064bbc175d07be56cd1a7d3f6d15a903e5fbaddf33bd7ad4. Myös ../TILAUS.md luettu; kaikki10 manifestiliitettä varmennettu. K1:n vikakuvat ja mitta-/tyyliviitteet katsottu.
Lopulliset promptit ja alkuperäiset kuvat säilytetty tuotantokansiossa. Kaksi generointia yhteensä; ei uusia lisäottoja. Karttasepän/KK:n hyväksyntä ja jatkotilaus avoinna. Ei pelikytkentää eikä julkaisua.
