# Eiffel 24b, otto 2 – mitattu arviointitoimitus

**Koko sarjan QA: FAIL. Ei vielä Tripolle tai peliin.** Kahdeksan uutta kokonaiskuvaa, yksi kutsu per näkymä. Vanha #2091 säilyy. Ei tämän kierroksen sisäisiä uusintoja. Kaikki tuotanto-PNG:t ovat muuttamattomia natiiveja 1536 × 1024 RGB; vertailu-JPG:t ovat vain QA-aineistoa.

## Sivukuvat
Kaksi jalkaa ja yksi kaari toteutuvat kaikissa neljässä. Pohjoinen, itä ja länsi täyttävät pääleveyden sekä tasannekorkeuksien 5 %:n toleranssin; etelä ei täytä. Alla arvot skaalattu laskennallisesti 900 px korkeuteen, itse kuvia ei skaalattu.
Tavoite: pohjaleveys 340,91 px; tasannekorkeudet 155,45 / 313,64 / 752,73 px maasta.

| Kuva | Pohjaleveys px | Tasanteiden korkeudet px | Näiden neljän suhteen 5 % portti |
|---|---:|---|---|
| etela | 448.63 | 212.46 / 394.83 / 786.02 | FAIL |
| pohjoinen | 330.54 | 159.6 / 319.2 / 763.06 | PASS |
| ita | 332.08 | 158.49 / 318.87 / 761.32 | PASS |
| lansi | 329.84 | 158.32 / 317.59 / 760.52 | PASS |

PASS koskee vain taulukon neljää mitattua suhdetta, ei koko kuvan hyväksyntää. Eteläkuvan pohja ja kaksi alinta tasannetta ovat liian suuria/korkealla, joten sarjan yhteinen geometria ja mittakaava eivät toteudu. Tasanteiden leveydet poikkeavat myös lähteen likimääräisistä 65/40/18 m arvoista; tarkat leveydet ja erot QA.json:ssa. Varsinkin pohjoisen/idän/lännen ensimmäinen tasanne on liian leveä ja kolmas liian kapea. Pieniä ylimääräisiä yläosan kauluksia sekä ristikon yksityiskohtavaihtelua näkyy. Lähteen omaa puolta vasten katsottu kuva korjaa aiemman ilmansuuntatulkinnan.

## Viistokuvat
Ensimmäisen tasanteen kolmesta näkyvästä kulmasta johdettu lävistäjäsuhde:
- lounas noin 0,724 → noin 46,4 astetta
- koillinen noin 0,850 → noin 58,3 astetta
Tavoite sin(65°)=0,906. Takakulma peittyy rakenteen taakse, joten se pääteltiin suunnikkaana. Kulmapisteet ovat silmämääräisiä ±5 px arvioita, eivät kalibroitu kamera. Kulmat ovat yhä liian matalia ja eroavat keskenään. Ei uusia ottoja.

## Yläkuva
Tasanteiden kulmat osoittavat nyt jalkoja kohti. Jalanjäljen sijainti ja koko paranivat, mutta eivät ole täsmälleen lähteen mukaiset. Tarkat bboxit QA.json:ssa ja sininen lähdeääriviiva QA-ylhaalta-jalanjalki.jpg:ssä.

## Maapohja
Suorat symmetriset pitkittäis- ja poikittaiskäytävät toteutuvat; ei kaarevaa Champ-de-Mars-polkuvirhettä tai pystyrakenteita. Kiveys peittää jalanjäljen lähes kokonaan, mutta väriheuristiikka löytää 630 nurmen kaltaista reunapikseliä 75 005 jalanjälkipikselistä (noin 99,16 % peitto). Täyttä peittoa ei hyväksytä varmaksi.
Neljä käytäväleveyden näytettä ovat 12, 13, 14 ja 14 px. Kun 300 m neliöjalanjäljestä johdetaan noin 1,095 m/px, ne ovat noin 13,1–15,3 m: hieman yli pyydetyn 6–12 m. Arvio ±2 px, lähdejalanjäljen mittakaavaolettama dokumentoitu. Kaikkia kadunsuiden liittymiä ei varmennettu.

Maskin ulkopuolella on värimuutoksia. Vastaanottaja koostaa vain maskin sisäosan lähdeohjeen mukaan. Tässä ei tehty tuotantokuvan pikselikoostamista. QA-maapohja-mittaus.jpg: sininen jalanjälki, punaiset nurmen kaltaiset sisäreunapikselit, magenta käytävien näyteleikkaukset.

## Jatko
Tämä on lähdeohjeen sallima yhden kierroksen toimitus poikkeamaraportilla. KK päättää mahdollisesta seuraavasta otosta. Muut seitsemän kohdetta odottavat erillistä postilupaa. Ei suoraa Tripo-toimitusta, R2-latausta, runtime-kytkentää eikä julkaisua. Vastaanotto ja omistajan hyväksyntä ovat erilliset.
