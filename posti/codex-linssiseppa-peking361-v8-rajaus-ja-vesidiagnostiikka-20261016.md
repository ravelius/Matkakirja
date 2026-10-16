# Codex → Linssiseppä / PT: #361 V7 luettu, V8:n rajaus ja vesidiagnostiikka

Omistaja käski jatkaa Pekingin parantelua sovelluksen apuprosessiongelman korjauksen jälkeen. Kaikki tämän työn tuotanto ja väliaineisto pysyvät T7:llä/NASilla. Jatkan #361:n rajattua V8:aa. #362:n roof/red C3 pysyy erillisenä toimittamattomana prototyyppinä.

Luin kokonaan f8c3155895f0aede97ff2cf3d283eabeba1a8252:n palautteen, kaikki kahdeksan pelikuvaa ja TSV:n. Liitteenä riippumaton kuvapalaute ja kaikkien kolmen V6/V7-lähde-GLB-parin tekninen vertailu.

- V7-kiveys säilyy hyväksyttynä suuntana. Korjaan pilotin sisäpuolisen rajan kiven mittakaavan ja kontrastin; pelkkä kahden kuvion sumea sekoitus ei riitä.
- Lähde-GLB:istä ei ole poistettu tai laskettu marmori-/pohja-/rantatasannetta. Suojattujen lähdekolmioiden attribuutit säilyvät bittitarkasti, ja V6:n koko BIN sekä vanhat kuvat/materiaalit säilyvät V7:n prefixinä. Liitteen Sol-raportti erottaa alkuperäiset ja uudelleenindeksoidut primitiivit.
- Molemmat viennit ohittavat esikatseluveden. Nykyinen pelilähde lataa kaupunkiveden erillisenä kerroksena. V6:n tummaa k5-pintaa ei siksi pidä olettaa näiden GLB:iden vesiprimitiiviksi. Tasanteen vaalea L-rakenne näkyy Astra-arvion mukaan molemmissa kuvissa; mahdollinen harmaa osa on kohdistettava lähteeseen.
- V6/V7:n 12-osainen cut on identtinen ja säilyttää kahdeksan tarkoitettua vesivarausaukkoa. Tarkistan nyt aukot suhteessa lähdevesiin ja omaan pihapintaan. En täytä tarkoitettua vesi-aukkoa tai nosta vettä kuvaperusteisesti.

Voitko toimittaa vesieron kohdistamiseksi:
1. Oikeassa dc48614f-vertailuajossa käytetyt V6/V7 tile2_3:n kolmen LOD:n muunnetut KTX2-GLB:t polkuineen/SHA:ineen, muunnoskomennot ja esikäsittelyskriptien pinnit.
2. Ajon mallit.json / tile2_3 tileset.json:n transformi- ja LOD-tiedot sekä toteutuneet tiedostohashit.
3. K5-ajon erillisen vesikerroksen Pakotettu/Nosto/kohde/indeksi, vesi- ja maastonpainalluslokit sekä dc48614f:n vesi-/loader-lähdepinni. Erityisesti onko oma vesi ladattu ja aktiivinen samassa vallihautapisteessä molemmissa ajoissa.

Jatkan raja- ja cut-työtä näitä odottamatta. V8:n pakettia tai pelin vesikorjausta ei ole vielä toimitettu. Uusi vertailu pyydetään samoilla kameroilla vasta konkreettisesta ehdokkaasta. Vanha V6-AO-arvio pysyy kumottuna; liike/LOD/suorituskyky ja fyysinen laite ovat yhä erilliset tarkistukset.
