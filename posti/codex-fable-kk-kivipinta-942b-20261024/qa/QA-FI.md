# 942b / tehtävä 945: kivipinnan QA

Kaikki kolme valittua karttaa ovat **1254 × 1254 natiivisti**. Ei suurennosta, atlasleikkausta, saumojen jälkikorjausta tai karttojen kanavamuutoksia. Kuvapinta esittää yhtä jatkuvaa vaaleaa harmaabeigeä kalkkikiveä; kattavuus 1 × 1 m. Ladonta ja saumat kuuluvat erilliseen pelivarjostimeen.

**Koko PBR-erä ei läpäise tuottajan QA:ta.** Väripinnan natiivikoko, 50 % / 50 % offset ja 4 × 4 -toisto läpäisivät visuaalisen tarkistuksen. Normaali- ja karheuskartat ovat arvioehdokkaita seuraavin avoimin puuttein:

- Normaalin toisessa versiossa on 2 negatiivisen Z:n pikseliä (ensimmäisessä 24). Pelkkä normalisointi ei korjaa niiden suuntaa. Kartassa on myös keskimääräinen XY-kallistuma ja pituusvaihtelua. Y+ pyydettiin promptissa; fyysistä korkeuspintaa vastaan mitattua kalibrointia ei ole.
- Karheuden toisessa versiossa on edelleen valokuvamaisia tummia huokosia ja reunakontrastia. RGB-kanavat poikkeavat enintään 10/255. R-kanavan mediaani on 0,702, 1–99 prosenttipisteet 0,600–0,769 ja minimi 0,302. Tätä ei esitetä kalibroituna karheusmittauksena.
- Karttojen rajaus ja tunnistettavat huokosryhmät vastaavat visuaalisesti toisiaan; pikselintarkkaa fysikaalista yhteyttä ei ole varmennettu.
- Reunapikselit eivät ole identtisiä. Offset/toiston silmämääräinen arvio ja reunojen numeerinen ero ovat eri mittareita.

`QA.json`, `attempt001-metrics.json` ja `retry-map-metrics.json` sisältävät tarkat havainnot. Offsetkuvat ovat alkuperäisen ympäri siirtoja, eivät korjauksia. `normal-lit-left.png` ja `normal-lit-right.png` ovat pelkkiä laskennallisia QA-valotuksia; niissä vektorit normalisoitiin laskentaa varten, toimitettavaa normaalikuvaa ei muutettu. `same-uv-crops.png` näyttää saman 300 × 300 pikselin alueen järjestyksessä väri / normaali / karheus.

Viisi sisäänrakennetun image_gen-työkalun kokonaista generointia: yksi väri, kaksi normaalia ja kaksi karheutta. Lähde ei asettanut kutsukiintiötä; tämä erä rajattiin yhteen kohdistettuun uusintaan kummallekin epäonnistuneelle datakartalle. Ei uusia automaattisia yrityksiä. Kaikki alkuperäiset ja promptit säilyvät.

Toimitus on PT/Valoseppä-arvioon. Vastaanottajan hyväksyntä, omistajan hyväksyntä, R2, pelin runtime-kytkentä ja julkaisu ovat avoinna. Vanhan 942:n hylkäystä ei kumota.

Lopputarkistus: normaalin 50/50-offsetissa erottuu läheltä katsottaessa myös kapea pystysuuntainen liitosraja. Normaalikartan saumattomuutta ei hyväksytä. Karheudessa ei näy voimakasta kirkkausristiä, mutta valokuvamainen huokosten varjostus jää QA-puutteeksi.
