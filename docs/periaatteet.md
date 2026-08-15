# Pelin periaatteet

Tämä on projektin "perustuslaki": lyhyt ja pysyvä arvopohja, jonka varassa
arvioidaan, sopiiko lisätty sisältö — kysymys, tieto, kaupunki tai kokonainen
lauta — peliin. Yksityiskohtaiset tekemisen ohjeet ovat tiedostossa
[CONTRIBUTING.md](../CONTRIBUTING.md); ne saavat elää ja tarkentua, mutta
näitä viittä pilaria muutetaan vain yhteisellä päätöksellä.

## Miksi tämä peli on olemassa

Edistämme nuorten ja aikuisten tietoa eri maiden elinoloista, kulttuurista,
maantieteestä, geopolitiikasta ja poliittisesta tilanteesta — ja ylipäätään
ymmärrystä siitä, että maailma on suurempi kuin oma ympäristö. Väline on
koukuttava ja mielenkiintoinen peli, jonka kanssa pidetään hauskaa; oppiminen
syntyy sivutuotteena.

## Laatu on aina tärkein prioriteetti

Omistajan linjaus 15.8.2026, ja se käy kaiken muun edellä: kun laatu ja
mikä tahansa muu tavoite — vauhti, määrä, kustannus, aikataulu — ovat
vastakkain, laatu voittaa. Mieluummin vähemmän ja viimeisteltyä kuin
paljon ja puolivillaista: yksi hyvin kirjoitettu juttu, tarkistettu kuva
ja mitattu ääni kerrallaan. Tämä ei kumoa pilareita alla, vaan on niiden
lukuohje.

## Viisi pilaria

### 1. Peli edellä

Tämä on seikkailupeli, jonka sivutuotteena opitaan — ei oppikirja, johon on
liimattu noppa. Sisältö, joka ei ole hauskaa pelata, ei kuulu peliin, vaikka
se olisi kuinka opettavaista. Laudan pitää olla tasapainoinen ja jännittävä,
ja kysymyksen pitää olla kiinnostava myös silloin, kun vastaa väärin.

### 2. Totuus ja lähteet

Jokainen pelin väittämä on tarkistettavissa. Epävarmaa ei väitetä, ja
kiistanalaista ei esitetä varmana. Kysymykseen tai tietoon voi liittää
lähteen, ja pull requestissa kerrotaan, mistä faktat on tarkistettu.
Erimielisyydet ratkaistaan lähteillä, ei äänekkyydellä.

### 2b. Paikka ennen lajia

Ääni ja kuva haetaan aina niin läheltä kuin mahdollista:

1. **kaupungista itsestään** — juuri siellä nauhoitettu ääni, juuri sen
   kadulta otettu kuva
2. **maasta**, jos kaupungista ei löydy
3. **vasta sitten lajista** (basaari, satama, sademetsä)

Lajikohtainen ääni on varamies, ei oletus. Sama basaarinauha kolmessa
kaupungissa kertoo pelaajalle, että paikat ovat vaihtokelpoisia — ja se
on vastoin periaatetta 3: jokainen paikka kuvataan omana itsenään.
Marrakechin tori ei kuulosta Isfahanin torilta, ja juuri se ero on osa
sitä mitä peli opettaa.

Sääntö koskee myös kuvia: kaupungin oma valokuva ennen yleistä
maisemakuvaa.

### 3. Kunnioitus ja tasapuolisuus

Jokainen maa ja kaupunki kuvataan asukkaidensa silmin, ei ulkopuolisen
kummasteluna:

- ei stereotypioita, pilkkaa eikä säälittelyä
- ei pelkkiä turistikliseitä — myös arkea, ruokaa, kieltä ja elinkeinoja
- kulttuurit ja uskonnot esitetään niiden omilla ehdoilla
- geopolitiikka ja politiikka **kuvataan, ei tuomita**: kerrotaan mitä on ja
  miksi, ei kenen pitäisi voittaa. Kiistanalaiset alueet ja jaetut kaupungit
  kuvataan toteavasti molempien osapuolten olemassaolo tunnustaen.

### 4. Ikäsopivuus

Peli on suunnattu 13 vuotta täyttäneille ja aikuisille — se on
seikkailupeli, jossa samalla oppii, ei lastenpeli — ja tulevaisuudessa
se sovitetaan myös koulukäyttöön (13+). Sisältö sopii tälle yleisölle:
vaikeita aiheita — sotaa, köyhyyttä, sortoa — ei kaunistella eikä
kauhistella, vaan ne käsitellään ikätasoisesti, tarvittaessa vain
vaikeammilla kysymystasoilla. Yhtään sisältöä ei lisätä pelottelemaan
eikä järkyttämään. (Kohderyhmä täsmennetty omistajan päätöksellä
10.8.2026.)

### 5. Avoimuus

Sisältö on vapaasti lisensoitua, jotta kenenkään panos ei voi kadota
suljetuksi. Päätökset tehdään julkisesti pull request -keskusteluissa.
Automaattiset testit ovat osa perustuslakia: ne valvovat koneellisesti
mitattavan osan (laudan eheys, kysymysten muoto), jotta ihmisten arviointi
voi keskittyä siihen, missä ihmistä tarvitaan — pilareihin 1–4.

## Etukäteispuskurin periaate

Omistajan linjaus 15.8.2026: **jokainen pelin vaihe lataa seuraavan
askeleen sisällön valmiiksi taustalla heti, kun se on tiedettävissä.**
Pelaaja ei koskaan odota sisältöä, jonka peli olisi voinut arvata.

Sovellus nykyisiin toimintoihin:

- Kaupunkiin saavuttaessa ladataan molempien lehtien (kaupunki ja maa)
  etusivut kokonaan taustalla — kuvat, lippu, kartta — ja generoidaan
  lukijaäänen ensimmäinen pala kumpaankin lehteen valmiiksi.
- Lehteä luettaessa VIEREISET sivut ladataan aina kokonaan valmiiksi
  heti, kun nykyinen sivu on auki — seuraava ja myös edellinen, jos se
  ei jo ole ladattu (omistajan tarkennus 15.8.2026: sisällysluettelon
  kautta voi hypätä keskelle lehteä, jolloin kumpikaan naapuri ei ole
  käynyt näytöllä).
- Sama koskee kaikkia UUSIA toimintoja jatkossa: kun toiminto lisätään,
  siihen suunnitellaan samalla etukäteispuskuri (mitä seuraavaksi
  todennäköisesti tarvitaan ja mistä hetkestä sen voi alkaa ladata).
  PR-kuvauksessa kerrotaan, mitä puskuroidaan ja milloin — tai miksi
  puskuroitavaa ei ole.

Rajat: puskurointi ei saa tukkia yhteyttä (lataukset jonossa muutama
kerrallaan, ks. ui.js esilataaOsoitteet) eikä kuluttaa generointikiintiöitä
sisältöön, jota pelaaja tuskin tarvitsee — puskuroidaan todennäköinen
seuraava askel, ei kaikkea mahdollista.

## Uuden laudan hyväksyminen

Lauta hyväksytään, kun molemmat puolet ovat kunnossa:

**Koneellisesti valvottava osa** (`npm test` on vihreä):

- reittiverkko on yhtenäinen ja jokaiseen kaupunkiin pääsee
- laivareitit kulkevat veden päällä ja kaupungit ovat maalla
- laattoja on täsmälleen yksi jokaiseen aarrekaupunkiin, tähtiä tasan yksi
- jokaisella aarrekaupungilla on kysymyksiä ja jokaisella kaupungilla
  Tiesitkö että -tietoja; vihjeet eivät paljasta vastausta
- botit pystyvät pelaamaan laudalla kokonaisen pelin loppuun

**Ihmisen arvioima osa** (pilarit 1–4):

- pelaako lauta hyvin: onko reiteissä valinnanvaraa, ovatko etäisyydet
  tasapainossa, onko meri- ja lentoreiteillä merkitystä?
- ovatko faktat tarkistettuja ja lähteet kerrottu?
- kuvataanko alue kunnioittavasti ja monipuolisesti — myös arkea?
- ovatko kiistanalaiset asiat toteavasti ja tasapuolisesti esitettyjä?
- sopiiko sisältö pelin yleisölle (13+) ja onko vaikeustasoja käytetty
  oikein?

Sama lista pienemmässä koossa koskee yksittäistä kysymystä tai kaupunkia.
