# Riippumaton tarkistus: PR 6780 (Baird 1926, Sähkötin 1837) – 15.11.2026

Kohde: haara sk/lontoo-baird-sahkotin (c0b42ce9b2), tiedostot nahtavyysjutut.js, fokusvirta-lontoo.js, maakartat.js, miniatyyrit.js, data/kohdekartat-sijainnit.json ja data/aanitysjono.tsv. Koodia ei muutettu. Lunastus (fokusvirta) ja nähtävyysteksti ovat merkki merkiltä samat (tarkistettu), joten jokainen korjaus koskee molempia.

## Pääsy ja robots (tarkistettu ennen jokaista sivustoa)
- en.wikipedia.org ja en.wikisource.org: `*` saa /wiki/-polut, /w/ (myös api.php) on kielletty. Haut tehtiin vain /wiki/-poluilla, User-Agent MatkakirjaResearch/1.0.
- archive.org: sallittu (/metadata, /download). Luettu Moseley 1930, Larner 1928, Dunlap 1932, Munro 1891 ja Cooke–Wheatstone 1856 (djvu-teksti).
- bbc.co.uk: /history/ ei ole kielletty. Luettu Historic Figures: John Logie Baird.
- britannica.com: robots sallii, mutta palvelin antoi Cloudflare-haasteen ("Just a moment"). Haastetta ei kierretty, eikä lähdettä käytetty.
- nominatim.openstreetmap.org: /search ja /reverse ovat robotsissa kiellettyjä, joten niitä ei käytetty. Karttapisteet tarkistettiin Wikipedian koordinaateista.
- Yksikään sivu ei sisältänyt minulle osoitettuja ohjeita.

Lyhenteet: **WP** = englanninkielinen Wikipedia (John Logie Baird, Nipkow disk, Paul Gottlieb Nipkow, Frith Street, Bar Italia, Cooke and Wheatstone telegraph, William Fothergill Cooke, Charles Wheatstone, Euston railway station). **Times** = The Times 28.1.1926, luettu Moseleyn lainauksena (WP:n viite 2 vahvistaa, että juttu on olemassa). **BBC** = bbc.co.uk/history/historic_figures/baird_logie.shtml. **EB1911** = Wikisource, "Wheatstone, Sir Charles". **DNB** = Wikisource, "Cooke, William Fothergill (DNB00)".

---

## A. Baird 1926

| Väite (pelaajalle näkyvä) | Lähde 1 | Lähde 2 | Verdikti |
|---|---|---|---|
| Tammikuussa 1926 Baird esitteli laitettaan Royal Institutionin jäsenille | Larner 1928: "in January 1926, he demonstrated true television to members of the Royal Institution" | Moseley 1930 ja Times: "Members of the Royal Institution…"; WP: 26.1.1926 | OK |
| Laboratorio oli yläkerran huoneessa Frith Streetillä Sohossa | Times (Moseleyssa): "a laboratory in an upper room in Frith Street, Soho" | WP: "laboratory at 22 Frith Street in the Soho district"; BBC: "an attic room in central London" | OK |
| Vieraat näkivät liikkuvan kuvan siirtyvän huoneesta toiseen | Times: "then on a portable receiver in another room" | Moseley omin sanoin: "between one room and another" | OK (molemmat samassa kirjassa, mutta Times on ensikäden teksti ja Moseleyn kertomus erillinen) |
| The Times kirjoitti esityksestä 28. tammikuuta | Moseley: "The Times of 28th January, 1926" | WP viite 2: The Times, Thursday 28 January 1926, s. 9 | OK |
| Esitystä pidetään ensimmäisenä todellisen television esityksenä | Larner: "the first demonstration of true television ever given"; Moseley | BBC: "the world's first demonstration of true television"; WP | OK sisällöltään. Kielessä **pehmennä**: "Sitä" viittaa kieliopillisesti edellisen virkkeen The Timesiin (ks. korjaus A1) |
| Bairdin televisio oli mekaaninen | Larner: "using a purely mechanical exploring mechanism" | WP: "the world's first mechanical television system" | OK |
| Sen ytimessä oli pyörivä kiekko, Nipkow'n keksimä | Moseley: vuoden 1926 laitteessa "the same disc, with a spiral arrangement of holes (the Nipkow disc)"; "the rotating Nipkow disc" | WP: "Baird experimented using the Nipkow disk" | OK |
| Nipkow oli saksalainen ja keksi kiekon 1884 | Dunlap: "BACK IN 1884.— Paul Nipkow of Germany… He introduced the device in 1884" | WP: patenttihakemus 6.1.1884 (myönnetty 15.1.1885, takautuvasti 1884) | OK |
| Kokeissa kuvattavana oli vatsastapuhujan nuken pää | Times: "the head of a ventriloquist's doll was manipulated as the image" | Dunlap: "the head of a ventriloquist's dummy"; WP | OK (Times lisää, että myös ihmiskasvot näytettiin; teksti ei väitä muuta) |
| Nukkea kutsuttiin Stooky Billiksi | Dunlap: "Stokie Bill" (kirjoitusasu vaihtelee) | WP: "Stooky Bill" | OK |
| Kuvaamiseen tarvittiin kirkkaita lamppuja, joiden alla ihmisen oli tukala olla | Dunlap: "intensely brilliant illumination, which caused considerable discomfort to the person being televised" | Moseley ("Overcoming Personal Discomfort"): "The persons who sat before the scanning disc suffered considerable discomfort" | OK. Nyt kaksi lähdettä; SK:lla oli vain Dunlap. Teksti on jo pehmeä eikä väitä syy-yhteyttä nukkeen |
| 1873 Baird ei ollut edes syntynyt | BBC: "born on 14 August 1888 in Helensburgh" | WP: 13.8.1888 (päivä eroaa, vuosi sama) | OK. Vuosi 1888 täyttää nyt KK:n ehdon (toinen lähde on BBC). Virke voi jäädä, ja halutessaan siihen voi lisätä vuoden (ks. A3, valinnainen) |
| Nipkow'n kiekon keksimiseen oli vielä 11 vuotta | 1884 − 1873 = 11 (Dunlap + WP) | | OK |
| Kuvateksti: Baird 1917, "lähes vuosikymmen ennen" | WP:n kuvateksti "Baird in 1917" | 1926 − 1917 = 9 | OK |

KK:n rajaukset: tammikuu 1926 ilman päivää on kunnossa. Frith Street on mainittu ilman numeroa ja yläkerran huone on mukana. Bar Italiaa ja sanaa "langattomasti" ei ole. "Pidetään ensimmäisenä" on omana virkkeenään. Lamput on kerrottu pehmeästi. 1888 ei esiinny numerona, ja "ei ollut syntynyt" -virkkeelle on nyt kaksi lähdettä. **Kaikki rajaukset on noudatettu.**

### Korjausehdotukset, Baird
- **A1 (pakollinen, kieli):** "Sitä pidetään ensimmäisenä todellisen television esityksenä." → **"Tätä tilaisuutta pidetään ensimmäisenä todellisen television esityksenä."**
- **A2 (lahde-kenttä, suositus):** "ei ollut syntynyt" -virkkeen toinen lähde on BBC, joten se kannattaa nimetä. Korvaava teksti: **"Matkakirjan oma teksti · lähteinä The Times (1926), Moseleyn ja Barton Chapplen Television To-day and To-morrow, Larnerin Practical Television, Dunlapin The Outlook for Television, BBC ja Wikipedia"**. Sama muutos tehdään molempiin tiedostoihin.
- **A3 (valinnainen, KK päättää):** "…eikä Baird ollut edes syntynyt." → "…eikä Baird ollut edes syntynyt: hän syntyi vasta 1888." Lähteinä BBC ja WP. Ilman tätä tekstikin on oikein.

## B. Sähkötin 1837

| Väite (pelaajalle näkyvä) | Lähde 1 | Lähde 2 | Verdikti |
|---|---|---|---|
| Toukokuussa 1837 Cooke ja Wheatstone sopivat yhteistyöstä | Munro: "In May they agreed to join their forces" | DNB: "duly entered into in May 1837"; 1856-kokoelma (Wheatstonen puoli): "formed in May" | OK |
| **Kesäkuussa** he saivat yhteisen patentin | 1856, Cooke: "granted… on the 12th June, 1837"; First Pamphlet: "taken out in the preceding June" | **Ristiriita:** WP (molemmat artikkelit): "In May 1837 Cooke and Wheatstone patented"; DNB: patentti "in the same month" kuin kumppanuus eli toukokuussa; 1856-kokoelman sisällä lainattu teksti: "In May, 1837, Messrs. Cooke and Wheatstone took out a joint English patent" | **Pehmennä.** Vuosi 1837 on varma (EB1911: "in their joint names in 1837" ja kaikki muut). Kuukausi on lähteissä kiistanalainen: hakemus toukokuussa, myöntäminen kesäkuussa |
| Heinäkuussa 1837 laitetta kokeiltiin London and Birmingham -radalla Eustonin ja Camden Townin välillä | Munro: "between the Euston terminus and Camden Town… on July 25, 1837"; 1856, Cooke: "experimental telegraph to Camden Town… London and Birmingham Railway" | WP: "between Euston and Camden Town… between London and Birmingham… demonstrated on 25 July 1837"; First Pamphlet: heinäkuu | OK |
| **Sähköttimessä oli viisi neulaa** (tekstissä heti Eustonin kokeen jälkeen) ja visa: "Montako neulaa oli sähköttimessä, jota Cooke ja Wheatstone **kokeilivat Eustonissa** 1837?" → Viisi | Munro: patenttiin sisältyi "the five-needle telegraph", ja Eustonin linjalla oli "a sixth return wire" (viittaa viiteen neulaan) | **Ristiriita:** WP, Cooke and Wheatstone telegraph: "**A four-needle system** was installed between Euston and Camden Town"; DNB puhuu viidestä neulasta yleisesti, ei Eustonin kokeesta | **Pehmennä teksti ja vaihda visa.** Kaksi lähdettä tukee vain sitä, että patentin tai suositellun mallin sähköttimessä oli viisi neulaa (Munro + WP: "The patent recommended a five-needle system"; DNB). Eustonin laitteen neulojen määrä on kiistanalainen, joten visa ei saa kysyä sitä |
| Myöhemmin GWR otti sähköttimen käyttöön Paddingtonista | Munro: "from the Paddington terminus" | 1856: "on the Great Western, from Paddington to Slough"; WP: "Paddington station to West Drayton" | OK sisällöltään. Kielessä **pehmennä**: "Paddingtonin asemalta alkaen" voi lukea myös ajanilmauksena (ks. B3) |
| 1873 kokeesta oli kulunut 36 vuotta | 1873 − 1837 = 36 | | OK |
| Kuvateksti: Laurencen piirros 1868, "kolme vuosikymmentä Eustonin kokeen jälkeen" | WP: "Sketch of Wheatstone by Samuel Laurence, 1868" | 1868 − 1837 = 31 | OK |
| (Ei tekstissä) Cooke ja Wheatstone olivat elossa 1873 | EB1911: Wheatstone "(1802-1875)… died on the 19th of October 1875", Cooke "(1806-1879)" | WP: Wheatstone kuoli 19.10.1875, Cooke 25.6.1879 | **Kaksi lähdettä kummallekin täyttyy.** KK:n ehto täyttyy, joten virkkeen voi lisätä (B4) |

KK:n rajaukset: toukokuu ja kesäkuu 1837 ovat mukana, ja kesäkuu kannattaa pehmentää (B1). Koe Eustonin ja Camden Townin välillä heinäkuussa 1837 on oikein. Viisi neulaa on mukana, mutta se pitää sitoa patenttiin, ei Eustonin laitteeseen (B2). GWR Paddingtonista on oikein. Köysiveto, West Drayton, "välinpitämättömästi" ja miesten paikat on jätetty pois. Radan nimi on London and Birmingham. "Elossa 1873" ei ole tekstissä. **Rajauksia on noudatettu, mutta kaksi kohtaa (kesäkuu ja Eustonin viisi neulaa) kaatuu riippumattomassa vertailussa.**

### Korjausehdotukset, Sähkötin
- **B1 (pakollinen):** ensimmäinen kappale →
  **"Toukokuussa 1837 William Cooke ja Charles Wheatstone sopivat yhteistyöstä, ja samana vuonna he saivat sähköttimelleen yhteisen patentin. Heinäkuussa 1837 laitetta kokeiltiin London and Birmingham -radalla Euston-aseman ja Camden Townin välillä."**
- **B2 (pakollinen):** toinen kappale →
  **"Patentin sähköttimessä oli viisi neulaa. Ne osoittivat taululta kirjaimia: kaksi neulaa kääntyi osoittamaan samaa kirjainta. Myöhemmin Great Western Railway otti sähköttimen käyttöön radallaan, joka lähti Paddingtonin asemalta."**
  Lähteet: neulat ja kirjaimet Munro ("a letter was literally pointed out by the current deflecting two of the needles towards it") ja WP ("needles on a board that could be moved to point to letters of the alphabet"). Lause vastaa myös kysymykseen "Miten neulasähkötin välitti viestin?".
- **B3 (sisältyy B2:een):** "Paddingtonin asemalta alkaen" → "radallaan, joka lähti Paddingtonin asemalta".
- **B4 (valinnainen, suositus pituuden vuoksi):** kolmas kappale →
  **"Isoisäsi matkavuonna 1873 Eustonin kokeesta oli kulunut 36 vuotta. Molemmat keksijät olivat vielä elossa: Wheatstone kuoli 1875 ja Cooke 1879."**
- **B5 (pakollinen, visa):**
  kysymys → **"Montako neulaa oli Cooken ja Wheatstonen vuonna 1837 patentoimassa sähköttimessä?"** (vaihtoehdot ja oikea: ennallaan)
  fakta → **"Patentin sähköttimessä oli viisi neulaa. Heinäkuussa 1837 sähkötintä kokeiltiin Euston-aseman ja Camden Townin välillä."**
- **B6 (lahde-kenttä):** SK:n lähdemuistiinpanossa yksikään sähköttimen väite ei nojaa Wikipediaan, joten "ja Wikipedia" on nyt perusteeton. Jos B2 ja B4 otetaan käyttöön, Wikipedia on aidosti toinen lähde, ja kenttä voi jäädä ennalleen. Jos niitä ei oteta, korvaava teksti on: **"Matkakirjan oma teksti · lähteinä Cooken ja Wheatstonen kiistakirjoitukset (1856), Munron Heroes of the Telegraph, Dictionary of National Biography ja Encyclopaedia Britannica (1911)"**.

## C. Karttapisteet
| Piste | PR | Vertailu | Ero | Verdikti |
|---|---|---|---|---|
| Baird 1926 | 51,5135 / −0,1317 | WP Bar Italia (= Frith Street 22): 51,51339 / −0,13135; WP Frith Street (kadun keskikohta): 51,51417 / −0,13194 | noin 13 m talosta 22 | OK. Kommentin "kadun eteläpää" pitää paikkansa, koska talo 22 on kadun eteläpuoliskolla |
| Sähkötin 1837 | 51,5282 / −0,1337 | WP Euston railway station: 51,5284 / −0,1331 | noin 45 m, aseman alueen sisällä | OK |

OSM-tarkistusta ei tehty, koska Nominatimin haku on robotsissa kielletty. Laudoille annettuja x/y-arvoja ei tarkistettu.

## D. Lahde-kentät
Kummassakaan kentässä ei ole sisäisiä merkintöjä (ei SK, KK, kortti- tai kohtanumeroita), ja muoto on "Matkakirjan oma teksti · lähteinä … ja Wikipedia". Sisällön korjaukset ovat kohdissa A2 ja B6. Huomio: The Times on luettu vain Moseleyn lainauksena. Nimeäminen on hyväksyttävää, koska WP vahvistaa jutun päivän ja sivun.

## E. Kieli, sävy ja pituus
- Sävy on asiallinen ja 13-vuotiaalle sopiva. Liioittelua ei ole, ja varovaisuus ("pidetään") on paikallaan. "Nipkow'n" on oikein, koska nimi ääntyy vokaaliloppuisena.
- Pituus sanoina: Händel 90, Johnson 82, Punch 102, **Baird 97** (mallien haarukassa), **Sähkötin 52** (selvästi lyhyin). B2 ja B4 nostavat sähköttimen noin 80 sanaan.
- Rakenne on mallien kaltainen: kolme kappaletta, ja viimeinen alkaa "Isoisäsi matkavuonna 1873".

## F. Äänitysjono
- Jonoon on lisätty kahdeksan riviä: kolme kappaletta kummastakin nähtävyystekstistä ja yksi täkynostorivi kummastakin. Koska kohdat A1, B1, B2 (ja B4) ja B5 muuttavat tekstiä, **rivit vanhenevat**. Ne pitää luoda uudelleen korjausten jälkeen, ennen kuin mitään äänitetään.
- Kommentit sanovat "Äänityslupa vasta KK:n hyväksyttyä tekstin", mutta rivit ovat jo jonossa. Jonon käsittelijän on hyvä tietää tämä.

---

## Yhteenveto
- **Baird:** kaikki faktaväitteet täyttävät kahden lähteen säännön. Lamppuvirke ja 1888 ovat nyt vahvempia kuin SK:n raportissa, koska Moseley ja BBC tulivat toisiksi lähteiksi. Korjattavaa on vain kielessä: "Sitä" → "Tätä tilaisuutta" (A1). Lahde-kenttään kannattaa lisätä BBC (A2).
- **Sähkötin:** kaksi virhettä, jotka on syytä korjata ennen äänitystä.
  1. Patentin kuukausi "kesäkuussa" on kiistanalainen (WP ja DNB sanovat toukokuu, Cooke 12.6.). Korjaus: "samana vuonna" (B1).
  2. Viisi neulaa on sidottu Eustonin kokeeseen sekä tekstissä että visassa, mutta WP:n mukaan Eustonissa oli neljän neulan laite. Viisi neulaa on varma vain patentin sähköttimestä. Korjaus: B2 ja B5.
- Sähkötinteksti on mallitarinoita lyhyempi (52 sanaa). Täydennykset B2 ja B4 on lähteistetty kahdesti ("elossa 1873" täyttää nyt KK:n ehdon: EB1911 ja WP). "Ja Wikipedia" sopii lahde-kenttään vain, jos nämä otetaan käyttöön (B6).
- Karttapisteet ovat kunnossa: noin 13 m ja noin 45 m.
- Äänitysjonon rivit pitää luoda uudelleen korjausten jälkeen.
