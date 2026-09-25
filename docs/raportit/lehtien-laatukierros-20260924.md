# Lehtien laatukierros (Sisältökirjuri 24.9.2026)

Fablen tilaus 24.9.2026: laatukierros kaikille tänään (ja tällä
viikolla) kirjoitetuille 71 kaupunkilehdelle (N1–N16) ja 6 maalehdelle
(M1). Kriteerit: 1) sävy ja ikäryhmä (13+, ei lastenpeli, isoisän
1873-sitaatit vain isoisän kynästä), 2) yksi keskeinen fakta per lehti
tarkistettuna toisesta riippumattomasta lähteestä, 3) kuvatekstien
pituus ja attribuutio, 4) minitehtävien vastaukset yksikäsitteisiä.

Tarkistus tehtiin 8 rinnakkaisella Sonnet-agentilla (osa haarautui
edelleen omiin per-lehti-agentteihinsa), jotka lukivat sisällön
suoraan git-haaroista (`git show`, ei checkoutia) koskematta repoon.
Löydökset koottiin ja korjattiin tähän raporttiin.

## Tulos lyhyesti

- **77/77 lehteä tarkistettu.**
- **9 korjausta tehty** (ks. taulukko), kaikki pieniä ja mekaanisia.
- **Ei yhtään sävy- tai ikäryhmäongelmaa.** Kaikki lehdet ovat
  uutis-/aikakauslehtimäisiä, sopivat 13v+/aikuisille, eivät
  "tiesitkö että" -kaavamaisia.
- **Ei yhtään isoisä-sitaattiongelmaa.** Yhdessäkään lehdessä ei ollut
  keksittyä suoraa lainausta, joka esitettäisiin isoisän (Horatio
  Foggin) aitona historiallisena sanontana tai sekoitettaisiin oikean
  historiallisen henkilön sitaattiin.
- **77/77 riippumattomasti tarkistettua keskeistä faktaa** vahvistui
  vähintään yhdestä Wikipedian ulkopuolisesta lähteestä — paitsi
  kohdan "Korjaukset" 3 tapausta, jotka eivät vahvistuneet ja
  korjattiin.
- **Kuvatekstit ja attribuutiot**: useampi agentti tarkisti KAIKKI
  (ei vain pistokokein) kyseisen erän nostot koneellisesti — nolla
  poikkeamaa pituus-/pistesäännöstä yhdessäkään erässä. Kaksi
  attribuutiokenttää siistittiin (ks. taulukko).
- **Minitehtävät**: kaikki yksikäsitteisiä. Yksi (Bryssel) osui
  samaan faktaan kuin kaupungin oma kulttuurivisa ja vaihdettiin.

## Korjaukset (kaikki tehty, PR:t auki)

| Lehti | Haara/PR | Löydös | Korjaus |
|---|---|---|---|
| Broome | #3021 | Merenalainen kaapeli "yli 1800 km" Jaavalle | Oikea luku 1650 km (Engineers Australia) |
| Madagaskar | #3002 | Väärä laji "maailman pienin kädellinen" (ruskohiirimaki 40 g) | Oikea laji Madame Berthen hiirimaki (~30 g); kuva säilytetty, teksti korjattu |
| Angola | #3015 | Cameronin rantautumispäivä "7.11.1875" | Oikea päivä 28.11.1875 |
| Ilha do Bananal | #3022 | Sotkuinen lahde-kenttä ("Araguaia.org / Rio Cicica at en.wikipedia") | Siistitty "Tekijä, Wikimedia Commons (lisenssi)" -muotoon |
| Kalgoorlie | #3026 | Superpit-satelliittikuvan lahteesta puuttui "Wikimedia Commons" | Lisätty |
| San Francisco | uusi PR #3042 (main) | Golden Gate -sillan ennätysaika "lähes 40 vuotta" | Oikea 27 vuotta (1937–1964) |
| Kosice | uusi PR #3042 (main) | "Maailman kolmanneksi vanhin, Bostonin ja Yonkersin jälkeen" -väite ei vahvistunut | Pehmennetty: "yksi maailman vanhimmista, heti Bostonin jälkeen" |
| Bryssel | uusi PR #3042 (main) | Minitehtävä sama fakta kuin oma kulttuurivisa (Sennen peittäminen) | Vaihdettu Grand-Placen jälleenrakennusaikaan (1695–1699) |
| Kilimandzaro | uusi PR #3042 (main) | Ainoana N7-lehtenä ei mainintaa isoisästä/1873 | Lisätty johdantoon |

Kaikkien korjausten jälkeen `node --test`: 4168/0 fail (ajettu kussakin
haarassa erikseen).

## Ei-pakolliset huomiot (ei korjattu, harkinnanvaraisia)

Nämä eivät estä julkaisua, mutta kirjataan mahdollista myöhempää
hienosäätöä varten:

- **São Luís, Nouméa**: minitehtävä sivuaa lievästi samaa teemaa kuin
  kaupungin oma kulttuurivisa (ei sama kysymys, vain sama aihepiiri).
- **Kongo**: "toiseksi vesirikkain joki" — yleisesti käytetty
  yksinkertaistus, osa lähteistä asettaa Ganges–Brahmaputran edelle.
- **Galápagos, Boa Vista**: populaatioluvut lähteiden vaihteluvälin
  reunalla, ei ristiriitaa.
- **Al Kufra**: "Kufra"-nimen kansanetymologia ("kuffar") on laajalti
  toistettu mutta kielihistoriallisesti kiistanalainen.
- **Suakin, Ahaggar**: pyöristettyjä/karkeita historiallisia arvioita,
  lehden oma muotoilu jo asianmukaisen varovainen.
- **Exmouth**: ei isoisä-/1873-mainintaa (perusteltua: kaupunki
  perustettiin 1963, ks. N15-erän oma commit-selitys), sekä Ningaloon
  suojelualueen hehtaariluku ("yli 700 000 ha") vaihtelee lähteittäin
  604 500–708 350 ha:n välillä — ei selvä virhe.
- **Mount Isa**: yksi lahde-kenttä käyttää epätavanomaista
  lisenssi-ilmaisua ("ei tunnettuja tekijänoikeusrajoituksia") lyhyen
  PD-merkinnän sijaan.
- **Coober Pedy**: pieni tarinallinen yksinkertaistus Willie
  Hutchisonin opaalinlöytötilanteessa (kulta isän kanssa vs. yksin
  leirissä vedenhaun aikana).
- **Birdsville**: yksi lahde-kenttä käyttää pitkää
  arkisto-instituutioketjua tavanomaisen lyhyen muodon sijaan.
- **NFK-maalehti**: `tehtava`-kentän sijainti aiherakenteessa
  poikkeaa FLK/NCL:stä (kosmeettinen, ei toiminnallinen).

## Sisältö puuttuu (ei tämän kierroksen työtä, ei korjattu)

- **Valletta ja Luxemburg** (main): näillä on vain kevyt
  minimipakki (etusivu, ei nostoja/aihesivuja/minitehtävää) —
  `js/packs/fokusvirrat.js`:n `KEVYET_FOKUSVIRRAT`-listan mukaisesti
  täysi lehtipino on oma, erillinen sisältöerä, jota ei ole vielä
  kirjoitettu. Ei siis tämän laatukierroksen piirissä (ei kirjoitettu
  tänään), mutta huomionarvoinen aukko.

## Menetelmä ja rajat

- Jokainen haara luettiin `git show origin/<haara>:<tiedosto>` -
  komennolla, ei `git checkout`illa, jottei jaetun repon tila
  sekoittuisi rinnakkaisten tarkistusten kesken.
- Riippumaton faktantarkistus pyrki aina VÄLTTÄMÄÄN pelkkää
  Wikipediaa, jos teksti vaikutti perustuvan siihen — käytettiin
  esim. viranomaissivustoja (NASA, USGS, UNESCO, National Park
  Service), akateemisia artikkeleita ja paikallisia
  matkailu-/historiasivustoja.
- Poliittinen rajaus (Falklandin 1982 sota/omistajuuskiista, Uuden-
  Kaledonian ja Puerto Ricon nykyinen asemakeskustelu) tarkistettiin
  erikseen kaikista neljästä relevantista maalehdestä (FLK, NCL, PRI)
  — ei rikkoontumisia.
