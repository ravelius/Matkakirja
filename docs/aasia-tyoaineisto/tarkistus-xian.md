# Xi'an-faktapohjan riippumaton tarkistus

Tarkistin `faktapohja-xian.md`:n jokaisen faktaväitteen hakemalla en-Wikipedian
raakatekstit uudelleen itse (`action=raw`, `NODE_USE_ENV_PROXY=1`-vastaava
suora curl, ei proxyongelmia) 12 artikkelista: Xi'an, Terracotta Army,
Fortifications of Xi'an, Bell Tower of Xi'an, Drum Tower of Xi'an, Giant Wild
Goose Pagoda, Great Mosque of Xi'an, Chang'an, Mausoleum of Qin Shi Huang,
Shaanxi History Museum, Silk Road. Lisäksi laskin kaikki yhdeksän
kohdekarttakohteen etäisyydet keskustasta itse uudelleen haversine-kaavalla
(en pallogeometrian yksinkertaistuksella kuten kokoaja).

**Yleisarvio: faktapohja on erittäin huolellisesti tehty.** Lähes kaikki
tarkistamani yksittäiset luvut, päivämäärät, mitat ja lainaukset täsmäävät
sanatarkasti lähteisiin. Löysin yhden todellisen sourcing-virheen (kohta 1),
yhden merkittävän statuskorjauksen (kohta 2, Kellotorni avautuikin), ja pari
pientä tarkennushuomiota (kohdat 3–4). Ei yhtään sisältölinjausongelmaa.

---

## 1. VIRHE: "Kolmentoista dynastian pääkaupunki" ei löydy lähteestä

**Väite:** Sivu A:n johdanto (osio 1) ja sitä tukeva ajatus toistuu läpi
koosteen: *"Kolmentoista dynastian pääkaupunki, jota isoisän aikaan
kutsuttiin vielä usein nimellä Chang'an..."* Tälle väitteelle ei ole omaa
faktat-ja-lähteet-riviä, mutta koko dokumentin metodologia ("kaikki tiedot
haettu en-Wikipediasta") implikoi sen olevan Wikipedia-peräinen.

**Tarkistus:** Hain en-Wikipedian "Xi'an"-artikkelin (action=raw, 20.8.2026)
kokonaan läpi haulla "thirteen"/"13 dynast*" — ei osumia. Artikkeli sanoo
ainoastaan:

> "Xi'an is one of China's Five Great Ancient Capitals, having held the
> position under several of the most important dynasties in Chinese
> history, including the Western Zhou, Qin, Western Han, Sui, Northern Zhou
> and Tang." — en-Wikipedia "Xi'an"

Tämä nimeää kuusi dynastiaa, ei kolmeatoista, eikä anna mitään
kokonaislukua "13". "Chang'an"-artikkelissa ei myöskään mainita lukua 13.

**Oikea tieto:** "13 dynastian pääkaupunki" on yleinen matkailumarkkinoinnin
ja kiinalaisten lähteiden luku Xi'anille, mutta se ei ole tämän kokoosteen
ilmoittaman lähteen (en-Wikipedia, haettu 20.8.2026) tukema. Joko väite
pitää poistaa/muotoilla uudelleen ("yksi Kiinan viidestä suuresta muinaisesta
pääkaupungista", mikä ON sourcetettu), tai sille pitää etsiä erillinen,
eksplisiittisesti mainittu lähde ennen julkaisua.

**Lähde:** en-Wikipedia "Xi'an", Lead-osio (haettu 20.8.2026).

---

## 2. STATUSKORJAUS: Kellotornin artikkeli avautuu — ei pysyvä este

Osio 7 kohta 1 väittää Kellotornin oman artikkelin ("Bell Tower of Xi'an")
epäonnistuneen toistuvasti kolmella otsikkomuodolla ja Wikimedia-virhesivun
palautuneen joka kerta.

**Tarkistus:** Hain `https://en.wikipedia.org/w/index.php?title=Bell_Tower_of_Xi%27an&action=raw`
yhdellä yrityksellä ilman uudelleenyrityksiä — artikkeli palautui heti
täydessä pituudessaan (167 riviä, {{Infobox building}}). Tämä oli siis
todennäköisesti tilapäinen verkko-/istuntokohtainen häiriö kokoajan
työkalussa, ei pysyvä saatavuusongelma.

**Poimitut faktat (uusia, eivät faktapohjassa):**
- Koordinaatit: **34.261°N, 108.942°E** — 24 metrin päässä faktapohjan
  taulukon rivistä 1 ("Xi'an, kaupungin keskipiste", 34,26111°N 108,94222°E).
  Ero on niin pieni, ettei Overpass-ristiintarkistusta tarvita
  (kynnysarvo 100 m ei ylity).
- Valmistui 1384, Hongwu-kauden 17. vuonna, alun perin n. 1 km:n päässä
  nykyisestä paikastaan; siirrettiin nykyiselle paikalleen 1582 Shaanxin
  tarkastaja Gong Yuxianin toimesta.
- Korkeus n. 36–40 m (artikkeli antaa molemmat luvut eri kohdissa: "close
  to 40 m" johdannossa, "36 metriä" arkkitehtuuriosiossa — pieni sisäinen
  epäjohdonmukaisuus itse Wikipedia-artikkelissa).
- Alkuperäinen Jingyun-kello (Tang-kaudelta) siirrettiin Stele Forest
  -museoon 1953; nykyinen kello on 1997 valmistunut jäljennös.

**Suositus:** Koska koordinaatti on nyt saatavilla ja se osuu lähes
täsmälleen samaan pisteeseen kuin rivi 1, Kellotorni kannattaa lisätä omaksi
kohdekartan kohteekseen ennen julkaisua — sille on jo faktapohja K4-nostossa
odottamassa, ja koordinaatti on nyt varmistettu Wikipediasta, ei tarvitse
turvautua "tiedetään yleisesti sijaitsevan lähellä" -arvaukseen.

---

## 3. Etäisyyslaskelmien riippumaton uudelleentarkistus (haversine)

Laskin kaikki koordinaattiparit uudelleen tarkalla haversine-kaavalla
(R = 6371,0088 km), en kokoajan käyttämällä yksinkertaistetulla
tasogeometrialla. Tulokset:

| Kohde | Kokoajan luku | Oma haversine-luku | Ero | Arvio |
|---|---|---|---|---|
| Rumpitorni | ~0,3 km L | 0,338 km, atsimuutti 280,5° | ~0,04 km | OK |
| Suuri moskeija | ~0,6 km LP | 0,590 km, atsimuutti 294,7° | ~0,01 km | OK |
| Kaupunginmuurin keskipiste | ~0,9 km E | 0,854 km, atsimuutti 179,3° | ~0,05 km | OK |
| Suuri villihanhipagoda | ~4,9 km ES | 4,852 km, atsimuutti 161,1° | ~0,05 km | OK |
| Shaanxin museo | ~4,1 km ES | 4,073 km, atsimuutti 168,1° | ~0,03 km | OK |
| Terrakotta-armeija | ~33 km KI | 33,359 km, atsimuutti 65,5° | ~0,4 km | OK |
| Qin Shi Huangin mausoleumi | ~31 km KI | 31,605 km, atsimuutti 64,8° | ~0,6 km | OK |

**Kaikki etäisyydet täsmäävät** kokoajan laskelmiin muutaman kymmenen–
sadan metrin tarkkuudella — ero johtuu yksinomaan menetelmäerosta
(yksinkertaistettu tasoapproksimaatio vs. tarkka pallogeometria) eikä ole
merkityksellinen kartan mittakaavassa. **Etäisyyslaskelmat ovat luotettavia.**

Pieni tarkennushuomio suunnista: atsimuutti 65° (terrakotta-armeija ja
mausoleumi) on lähempänä itäkoillista (ENE) kuin puhdasta koillista;
Villihanhipagoda ja Shaanxin museo (atsimuutti 161–168°) ovat lähempänä
etelä-kaakkoa kuin tasaista "etelä-itää". Tämä ei muuta karttarajauksen
johtopäätöstä, mutta suuntakirjaimet (KI, ES) kannattaa tarkistaa
kompassiruususta ennen kuvatekstien kirjoittamista, jos niitä käytetään
sellaisenaan.

**Karttarajausehdotus (osio 4):** Kannatan kokoajan omaa arviota — kohteet
1–6 muodostavat todella tiiviin n. 5×5 km:n keskustarajauksen, ja
terrakotta-armeija/mausoleumi (~31–33 km) ovat selvästi oma retkensä. Kahden
kartan malli (vaihtoehto A) on linjassa Medinan Uhud-ennakkotapauksen kanssa
ja teknisesti perustellumpi kuin yhden 33 km:n kartan venyttäminen. Jos
"kainalokartta"-malli (Wien/Budapest-tyyppinen pieni sivukartta samalla
sivulla) on käytettävissä, se sopisi tähän erinomaisesti — pieni
terrakotta-armeijan aluekartta pääkartan kainalossa yhdistäisi molempien
vaihtoehtojen edut (tiivis pääkartta + löydettävyys ilman 33 km:n
venytystä).

---

## 4. Muut tarkistetut faktat — kaikki täsmäsivät sanatarkasti

Seuraavat väitteet tarkistin suoraan lähteestä; kaikki täsmäsivät ilman
poikkeamaa (luvut, päivämäärät, nimet, syy-seuraussuhteet):

- Terrakotta-armeija: löytöpäivä 29.3.1974, Yang Zhifa + 5 veljeä + Wang
  Puzhi, 1,5 km hautakummusta; 2007 arvio 8000+ sotilasta, 130 vaunua,
  520 hevosta (+150 ratsuhevosta, mainittu vain lähdeluettelossa, ei
  virhe); vuosisatojen ajan raportoituja savenpalasia/tiilenpaloja ennen
  löytöä; museo rakennettu löytöpaikan päälle. — "Terracotta Army"
- Kaupunginmuuri: 1370, Hongwu-keisari, 8 vuoden rakennustyö, Sui/Tang-
  muurien päälle, 14 km pitkä, 12 m korkea, 12–14 m/15–18 m leveä,
  vallihauta, kävelytie n. 4 h, 1937–1940 Japanin pommitukset, ~1000
  pommisuojaa (>15 m paksussa perustassa). — "Fortifications of Xi'an"
- Nimihistoria: Chang'an suurimman osan historiaa, yksi "viidestä suuresta
  muinaisesta pääkaupungista"; Sui-keisari Wen perusti Daxingin 582; Tang
  nimesi Chang'aniksi 618; nimi Xi'an otettiin käyttöön 1369 Ming-kaudella;
  jesuiitat kirjasivat Si-ngan/Si-ngan-fou; Wade-Giles Hsi-an. — "Xi'an",
  "Chang'an"
- Weiyang-palatsi: Liu Bang 202 eaa Chang'an-piirikuntaan, palatsi 2 vuotta
  myöhemmin, 4,8 km², 6,7× Kielletty kaupunki, 11× Vatikaani; alkuperäinen
  muuri aloitettu 194 eaa, valmis 4 vuodessa, 25,7 km. — "Xi'an"
- Tang-Chang'an: Sui/Tang-nimeäminen kuten yllä; yksi maailman suurimmista
  Konstantinopolin/Bagdadin ohella; 8 pääkatua, 9 lohkoa, 160 muurattua
  1×1 li -korttelia, 50–100 perhettä/kortteli; Läntinen tori, persialainen
  basaari, viini/tee/leivonnaiset. — "Chang'an"
- Silkkitie: pohjoinen reitti alkoi Chang'anista; reitti vakiintui n. 1.
  vuosisadalla eaa Han Wudin lopetettua paimentolaisten häirinnän; Yhdeksän
  toria oli itäinen päätepiste; koillis-/luoteisportit, luoteinen yhdisti
  muuhun Kiinaan, koillinen sillan yli pohjoisiin esikaupunkeihin. —
  "Silk Road", "Chang'an"
- Villihanhipagoda: Xuanzang 600-luvun puolivälissä käännöskoulu; pagodi
  alkoi 652 Da Ci'en -temppeliin, sutrien/patsaiden säilytys; alkuperäinen
  torni viisikerroksinen, tiili+savi/maa, 60 m; vaurioitui rikkaruohosta
  tiilisaumoissa; Wu Zetian rahoitti jälleenrakennuksen
  seitsenkerroksiseksi. — "Giant Wild Goose Pagoda"
- Suuri moskeija: alkuperäinen 742 (Tang), nykyinen 1392 (Ming); täysin
  kiinalainen arkkitehtuuri, ei minareettia; suunnattu länteen (Mekka),
  itäinen sisäänkäynti, rikkoo pohjois-etelä-akselin; pääsali 1000
  rukoilijaa. — "Great Mosque of Xi'an"
- Rumpitorni: valmistui 1380 Hongwu-kaudella; Kello-/Rumpitorni yhdessä
  ajanmerkkinä vuosisatojen ajan — kellot aamulla, rummut illalla ("the
  bells signifying morning and the drums signifying evening" — sanatarkka
  vastine); 24 pientä rumpua alaterassilla, 24 aurinkotermiä (kalenteri).
  — "Drum Tower of Xi'an"
- Metro/kaupunkirakenne: linjat kuten faktapohjassa (Banpo L1, Kello-/
  Rumpitorni L2, kaupunginmuuri L2, Villihanhipagoda L3&4, Shaanxin museo
  L2/3/4); ali-/ylikulkusillat erityisesti Kellotornin ympäristössä. —
  "Xi'an"
- Maantiede: Guanzhong-tasanko, eteläkeskinen Shaanxi, 8 joen/puron
  tulva-alue; Qinling etelässä, Wei-joki pohjoisessa; Hua Shan n. 100 km
  itään; Loessi-tasanko pohjoisessa. — "Xi'an"
- Ilmasto: Köppen Cwa/Dwa-rajatapaus, kuumat/kosteat kesät, kylmät/kuivat
  talvet, kuivemmat välikaudet; suurin osa sadannasta heinä–lokakuussa;
  lumi ei pysy pitkään; hiekkamyrskyt maalis–huhtikuussa. — "Xi'an"
- Korkeus 405 m (infoboksin `elevation_m`). — "Xi'an"
- Chang'anin tuho 904: sotapäällikkö Zhu Wen määräsi rakennukset purettavaksi
  ja materiaalit Luoyangiin; asukkaat + keisari Zhaozong pakotettiin
  muuttamaan; kaupunki ei toipunut Tang-huipustaan täysin, osa monumenteista
  säilyi; nimi vaihtui Jingzhaosta Xi'aniksi Ming-kaudella. — "Chang'an"

---

## 5. Sisältölinjaus: ei jäänteitä nykypolitiikasta

Kävin läpi kaikki kahdeksan nostoa, viisi jaksoa ja molemmat sivujohdannot.
**En löytänyt mitään nykypolitiikkaan tai nykysotaan viittaavaa** noston tai
jakson leipätekstissä — 1936 Xi'an-välikohtaus, 2012 Japanin-vastaiset
mielenosoitukset ja 2022 koronasulku on todella jätetty kokonaan pois, kuten
kokoaja väittää. Tarkistin myös, että nämä tapahtumat todella *ovat*
lähdeartikkelissa (eli poisjättö on tietoinen valinta eikä keksitty
epävarmuus): "Xi'an"-artikkeli käsittelee kaikkia kolmea suoraan omissa
kappaleissaan, samoin 1911 Manchu-verilöylyn. Kokoajan osion 7 kohta 5
kuvaus on siis tarkka.

**Uskonto:** islam ja buddhalaisuus käsitellään nostoissa ainoastaan
arkkitehtuurin/historian kautta (moskeijan rakennusvuodet ja suunta,
Xuanzangin pyhiinvaellus ja pagodi) — ei nykyisiä uskonnollisia rajoituksia.
Osio 7 kohta 7 mainitsee Dungan-kapinan (1862–1877) ja
kulttuurivallankumouksen-aikaisen moskeijan sulkemisen vain
epävarmuusosiossa, ei nostoissa — tarkistin, että Dungan-kapina todella
mainitaan "Great Mosque of Xi'an" -artikkelissa (rivi 133, "certain
restrictions on the practice of Islam occurred after the Dungan Revolt");
poisjättö nostoista on siis perusteltu eikä kadota mitään olennaista
Wikipedia-tietoa.

**Johtopäätös: sisältölinjaus on toteutettu johdonmukaisesti ja tarkasti.**

---

## Yhteenveto

| # | Löydös | Vakavuus | Toimenpide |
|---|---|---|---|
| 1 | "Kolmentoista dynastian pääkaupunki" ei löydy en-Wikipedia-lähteestä (artikkeli nimeää 6 dynastiaa "Five Great Ancient Capitals" -kokonaisuudessa, ei mainitse lukua 13) | **Virhe (sourcing)** | Korjaa/poista väite tai etsi eksplisiittinen lähde ennen julkaisua |
| 2 | Kellotornin artikkeli avautuu itse asiassa normaalisti (koordinaatti 34,261°N 108,942°E, 24 m keskustapisteestä) | Korjaus, ei virhe kokoajan sisällössä | Lisää Kellotorni omaksi kohdekartan kohteeksi ennen julkaisua |
| 3 | Kaikki 7 etäisyyslaskelmaa täsmäävät riippumattomaan haversine-laskelmaan (~0,03–0,6 km eroa, menetelmäero) | Ei virhe | Etäisyydet ja karttarajausehdotus (kahden kartan malli) kelpaavat sellaisenaan |
| 4 | Kaikki muut tarkistetut faktaväitteet (n. 40 kpl eri artikkeleista) täsmäsivät sanatarkasti | Ei virhettä | — |
| 5 | Sisältölinjaus (ei nykypolitiikkaa, uskonto historiallis-kulttuurisena) toteutuu johdonmukaisesti nostoissa/jaksoissa | Ei virhettä | — |

Faktapohja on julkaisukelpoinen sen jälkeen, kun kohta 1 on korjattu ja
Kellotornin koordinaatti (kohta 2) on joko lisätty kartalle tai
tietoisesti jätetty pois perustellulla syyllä.
