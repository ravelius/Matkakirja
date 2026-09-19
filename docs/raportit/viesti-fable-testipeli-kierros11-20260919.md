# Testipeli, kierros 11 (Sonnet local, 19.9.2026 klo 19.36–19.53 Suomen aikaa)

Tuotanto v1962 (päivitysikkuna 19.37), kehittäjätila, iPhone 18 Pro -simulaattori (Safari), 390 px -näkymä, yksi välilehti. Äänet: kartan kulmassa mykistyskuvake näkyy (ääni pois); **ratasvalikon liukusäätimet näyttivät kuitenkin 100 % / 90 % / 35 %** (19.50), eli mykistys ei ollut liukusäätimillä vaan toisaalla, tai peli latautui uudelleen 19.47 ja säätimet palasivat oletukseen. Ääniä ei kuulunut eikä MediaRemote-kaatumisia. "Maailma"-kytkin PÄÄLLÄ 19.37 → 19.52 (samassa jaksossa Amsterdam/Varsova/Pariisi/Praha; en kääntänyt sitä pois välillä, koska hypyt Puolaan ja Prahaan sitä vaativat), POIS 19.52 (varmistettu valikosta: "maailma POIS"). Haara `sonnet-local-kierros-11`, kuvat `docs/raportit/kaappaukset/kierros11-20260919/01–09-*.jpg`.

## 1. Rahavisat (Puola, 390 px)

Gouda/Leiden/Texel-polku ei toteutunut (hyppy maailma-kytkimellä Varsovaan). Visat testattu Puolan nostoilla: **Białowieża** (kuvat 01–03) ja **Grunwald** (kuva 04). HUOM tarkkuus: kuvat 01–03 ovat Białowieża-kortista (en tallentanut tarkkaa vaihtoehtoa, jonka napautin väärin), kuva 04 Grunwaldista.

- **Laatikko näkyy**: "LUKIJAN KYSYMYS · vastaus löytyy tästä jutusta · +25 puntaa", kysymys ja neljä vaihtoehtoa täysleveinä painikkeina, kuvan ja tekstin jälkeen, ennen pulun kysymyksiä (kuva 01, Białowieża). **v1960:n puuttuva laatikko on korjattu.**
- **Väärä vastaus (Białowieża, 19.41):** raha £0 → £0, oikea vastaus paljastuu (kuva 02). **Toimii.**
- **Uudelleenavaus väärän jälkeen (Białowieża):** kortissa on **yhä vaihtoehdot ja kysymys** (kuva 03), ei "jo vastattu" -tilaa. Toisin sanoen kysymys on uudelleen vastattavissa väärän vastauksen jälkeen, eli seuraava vastaus voi maksaa. **Onko tarkoitus? Kirjaan ilman arviota; koodin kommentti (js/fokusnosto.js) sanoo "jo vastattu" -tilan vaativan kirjatun vastauksen.**
- **Oikea vastaus (Grunwald, 19.42):** 3. vaihtoehto ("Se kesti Malborkin piirityksen, mutta ei toipunut"): raha **£0 → £25 (+25)**, laatikossa vihreä "Oikein! +25 puntaa. …" (kuva 04). **Toimii.**
- **Uudelleenavaus oikean jälkeen (Grunwald):** laatikko näyttää kysymyksen ja vihreän "Oikein!" -tuloksen, ei uusia vaihtoehtoja: **ei voi maksaa toista kertaa.** (Samasta kortista tarkistettu 19.42; kuva 04.)
- **Ulkoasu 390 px:** laatikko täysleveä, kaksoisreunus, vaihtoehtopainikkeet korkeita ja luettavia; oikean alakulman pulu peittää yhden vaihtoehtopainikkeen oikeaa reunaa hieman (kuva 01).
- Aiemmat kolme napautusta osuivat kortin ulkopuolelle laskuvirheeni takia ja sulkivat kortin ilman vastausta; tuloksiin ne eivät vaikuta.

## 2. Annonay/Montgolfier (Ranska)

Avattu Pariisista (kartan "Montgolfierin…"-merkki): **kortti: pystykuva (1/2) keskitetty vaalealla marginaalilla, ei tummaa paneelia; kuvateksti kuvan alla; pulu oikeassa alakulmassa EI tekstin päällä (kuva 05)**. LISÄÄ avaa laajan kortin (TEKNIIKKA, "Kuningas katsoi, kun kori nousi taivaalle"), kuva 1/2 sama pystykuva: **pulu on kuvatekstin ja leipätekstin oikeassa laidassa, ja 6. rivillä ("huomasi, että tulen yllä kuivuva") pulu peittää sanan oikeaa reunaa** — vähäinen limitys. Kuva 2/2 (patsas, kuva 06): **tumma ruskea paneeli oikealla** (n. 130 px levy, täyttää kuvan oikean reunan), koska kuva on vaakaa vähemmän leveä kuin kehys — juuri se "tumma paneeli", jota v1962 piti poistaa pystykuvilla (1/2 OK; **2/2 ei**). Nuolet (‹ ›) näkyvät kuvan reunoilla, oikea nuoli "›" on tummalla paneelilla; **hover-tahmeutta en havainnut** (kosketuslaitteella ei hoveria). Vakavuus 1–2.

## 3. Ihmisen matka -linssi

Aktivoitu matkalaukusta (jalanjälkikuvake, "Ihmisen matka"), Käynnistä → tarinaruutu → aikajana. Aikajanan napautus siirsi 300 000 v → 69 000 v → 46 300 v (Altai, Denisova). **Siperia/Denisova-nosto avautui napautuksella:**

- Otsikko "Kolme ihmisryhmää, yksi luola", Denisovan luola Altai, **kaksi aitoa kuvaa** (luola + sormus) (kuva 07), teksti, lähde en-Wikipedia "Denisova Cave", "Lue lisää", **"KYSY PULULTA": 2–3 valmista kysymystä** ("Miten denisovalaiset tunnistettiin pelkästä DNA:sta?", "Mitä sekoittumisesta jäi meihin?", + kolmas alempana).
- **Napautus kysymykseen EI antanut vastausta eikä lähdettä**: kysymys himmeni (harmaantui), mutta vastausteksti ei ilmestynyt kortille eikä pulun kuplaan; en nähnyt lähdettä. Kaksi kysymystä kokeiltu.
- **Sulkunappi (X) ei sulkenut korttia** (tap 19.47 — kortti pysyi, X korostui) ja **"Jatka" ei jatkanut aikajanaa**; linssi jäi jumiin 41 338 v -kohtaan. Vapautin sivun latauksella (peli säilyi £25/Pariisi). Vakavuus **2–3** (linssi jumiin pulun kysymyksen napautuksen jälkeen, mahdollisesti yhteys kysymyksen vastausketjuun). Kuva 08.
- Clovis-lisänostoa en ehtinyt.

## 4. Astronautin kamera (zoomikatto, Egypti)

Avattu Pariisin pelistä. Alkuperäinen pallo: vihreä-sininen, NASA-pilvet, kohdepisteet; **Egyptiä en saanut zoomattua keskelle** (nipistys osui Kaukasukseen ja sitten Siperiaan; 19.50). Max-zoomissa (kuva 09, Mustameri + Kaukasus) näkyvä leveys on suunnilleen Mustanmeren itäosa–Kaukasus (arvio silmällä, **ei mitattu**, ei vertailukelpoinen k10:een, joka oli Kreeta). **Ei nimiöitä ruudulla** (nimiöt on tarkoituksella pois lähellä?). Astronautin kameran hidas lataus näkyy: pohjoisen suuntaan panoroitaessa maasto on hetken pikselöityä/vaaleaa. Nimiölimityksestä ei havaintoa (nimiöitä ei näkynyt).

## 5. Uudet maat

- **Puola/Varsova:** Białowieża **avautui** (LISÄÄ toimii, visa kortilla, ks. kohta 1). Pszczynan linna (kulttuurinosto) avautuu kortilla. Grunwald OK.
- **Belgia/Bryssel/Tervuren: EI TESTATTU, EI NÄKYNYT KARTALLA.** Euroopan yleiskartalla (kuva 19.51) Bryssel-merkkiä ei näkynyt (Amsterdam ja Pariisi kyllä, ja välissä vain rajaviiva). Voi olla että Belgian kohdemaa ei ole vielä kartalla tässä versiossa tai että Bryssel puuttuu pallolaudasta. Ei nähty; kirjaan puutteena.
- **Tšekki/Praha:** Praha avautui (maailma-hyppy 19.52): **kartalla Tšekki, mutta ei Karlovy Varyä**; nähtävissä Děčín, Jablonec, Labe, Kutná Hora, Tábor, Boubín, Český Krumlov, Vltava, Hevosrautatie, Karlštejn, Prazdroj, Jáchymov, Edward Kelley, Siiseli. **Karlovy Vary ei löytynyt kartalta (länsiosa)**; Prahan kartan yläreunassa Saksan raja. Vakavuus 1–2.

## Muuta

- Peli latautui itsestään uudelleen 19.47 (ilmeisesti versiopäivitys, kortti Pariisin saapumisesta näkyi uudelleen, Ohita+Liiku eri paikoissa).
- Ohita, Liiku ja pulun paneeli: ei häiriöitä.
- Simulaattorin tila: Praha, Tšekin kartta, £25, Päivä 1 keskipäivä, maailma POIS, yksi Safari-välilehti.
