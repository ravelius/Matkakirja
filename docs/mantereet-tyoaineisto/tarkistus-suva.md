# Suva-faktapohjan riippumaton tarkistus

Tarkistettu 24.8.2026 en-Wikipedian raakatekstistä (`action=raw`, curl +
proxy, `NODE_USE_ENV_PROXY`-vastaava `https_proxy` oli jo ympäristössä
päällä) seuraavista artikkeleista: **Suva**, Fiji, Colony of Fiji, Seru
Epenisa Cakobau, Grand Pacific Hotel (Fiji), Sacred Heart Cathedral,
Suva, Colo-i-Suva Forest Reserve, Albert Park (Suva), Parliament of
Fiji, Government House, Suva, HFC Bank Stadium, Thurston Gardens, Fiji
Museum, Rewa River, University of the South Pacific, Indo-Fijians,
Girmitiyas, Fijians. Jokainen tiedosto tarkistettu #REDIRECT-rivin
varalta (ei yhtään). Commons-kategoriat tarkistettu MediaWikin
`action=query&prop=categoryinfo`-rajapinnasta 20 kategorialle erikseen
pienissä erissä — kaksi ensimmäistä yritystä osuivat HTTP 200 -runkoon
piilotettuun 429-rajoitukseen ("You are making too many requests..."),
ja onnistuin vasta kasvavalla viiveellä (8 s → 15 s → 20 s) uudelleen
yrittäen, kuten resepti neuvoo — koostajan varoitus tästä täsmälleen
samasta sudenkuopasta oli aiheellinen. Koordinaatit tarkistettu suoraan
artikkeleiden `{{coord}}`-malliteista.

**Yleisarvio: koostaja on tehnyt erittäin huolellista työtä, ja lähes
kaikki yksittäiset faktaväitteet (vuosiluvut, luvut, koordinaatit,
Commons-kategoriat) osoittautuivat riippumattomasti tarkistettuina
oikeiksi.** Löysin kuitenkin yhden **vakavan sisältövirheen**, joka
koskettaa juuri sitä kohtaa, jota tehtävänanto pyysi tarkistamaan
kaikkein huolellisimmin — faktapohjan oma "terävin löydös" osoittautuu
riippumattomassa tarkistuksessa ylimitoitetuksi ja osin ristiriitaiseksi
sen omien lähteiden kanssa. Lisäksi löysin yhden **täyttämättömän
päätoimittajan vaatimuksen** (H2:n "elävä nykypäivän toimija" -ehto) ja
kolme Commons-kategoriaa, jotka koostaja itse merkitsi tarkistamattomiksi
ja jotka riippumaton tarkistus osoittaa **osittain vääriksi arvauksiksi**.

---

## A. VAKAVA VIRHE — "Suvassa ei ollut edes kylää 1873" ei pidä paikkaansa

**Faktapohjan väite (K1-nosto, johdanto Sivu A, osio 7 kohta 1 — kolmeen
kertaan toistettu keskeinen teesi):**

> "Kun isoisä olisi kulkenut ohi 1873, seudulla ei ollut vielä kaupunkia
> eikä edes kunnollista kylää" (K1)
>
> "1873 se oli vielä nimetön maapala kariutuneen puuvillahankkeen
> varjossa" (Sivu A:n johdanto)
>
> "Vahvin löytämäni 1873-osuma on se, ettei Suva 1873 ollut vielä
> olemassakaan kaupunkina." (osio 7, kohta 1)

**En-Wikipedian "Suva"-artikkeli sanoo kuitenkin suoraan, sanasta
sanaan, juuri siinä virkkeessä, jota faktapohja itse siteeraa K1:n
lähteenä:**

> "**In 1868, when Suva was still a small village**, the Bauan
> chieftain, Seru Epenisa Cakobau, granted 5,000 km² of land to the
> Australian-based Polynesia Company..."

Eli Wikipedian oma sanamuoto on "**still** a small village" — ei "ei
vielä kylääkään", vaan päinvastoin: kylä oli jo olemassa vuonna 1868,
**viisi vuotta ennen** isoisän matkaa, ja ilmaisu "still" viittaa
jatkuvuuteen, ei katkokseen. Faktapohja lainaa tästä samasta virkkeestä
vain maakauppaosan ("Faktat ja lähteet" -kohdassa K1) ja **jättää pois
juuri sen alkuosan, joka olisi kumonnut oman pääväitteensä**.

**Tämä ei ole vain ristiriita Wikipedian kanssa vaan myös faktapohjan
sisäinen ristiriita.** Osiossa 4 faktapohja itse siteeraa Grand Pacific
Hotel -artikkelia: hotelli rakennettiin "**alkuperäisen Suva-kylän**
rantautumispaikalle" (paikka tunnettiin nimellä Vu-ni-vesi) — sama
en-Wikipedian ilmaisu on tarkistuksessa sanatarkasti "the landing spot
for **the original Suva village**". Faktapohja siis käyttää osiossa 4
faktaa, joka nimenomaisesti puhuu "alkuperäisestä Suva-kylästä", mutta
osiossa 1/7 väittää samaan aikaan, ettei mitään "kunnollista kylää"
ollut olemassa. Kaksi eri Wikipedia-artikkelia (Suva ja Grand Pacific
Hotel) tukevat siis toisiaan siinä, että Suva-niminen kylä oli olemassa
jo ennen 1873:a — ja faktapohja on itsekin lainannut molempia lähteitä,
mutta ei ole huomannut niiden yhteisvaikutusta.

**Mikä sen sijaan ON riippumattomasti vahvistettu ja täysin oikein:**
Fidžin pääkaupunki oli 1873 Levuka, Fidži ei ollut vielä Britannian
siirtomaa (luovutus vasta 10.10.1874), ja alue oli vasta viisi vuotta
aiemmin ollut kariutuneen puuvillahankkeen kohteena. Nämä kolme asiaa
riittävät jo yksinään vahvaksi "isoisän matkan vuosi" -kulmaksi — mutta
"ei ollut edes kylää" on liian vahva muotoilu, jota lähteet eivät tue.

**Suositus:** Muotoile K1, Sivu A:n johdanto ja osion 7 kohta 1
uudelleen niin, ettei väitetä kylän puuttuneen kokonaan — esim. "Suva
oli 1873 vasta pieni kylä kariutuneen puuvillahankkeen varjossa, ei
Fidžin pääkaupunki eikä osa Britannian siirtomaata" tms. Tämä säilyttää
kulman terävyyden (pääkaupunki oli Levuka, siirtomaakausi ei ollut
alkanut) ilman virheellistä "ei kylääkään" -väitettä.

---

## B. Täyttämätön vaatimus — H2 ei täytä päätoimittajan "elävä nykypäivän toimija" -ehtoa

Päätoimittajan päätöksessä 24.8.2026 (spec-mantereet.md, luettu ennen
tätä tarkistusta) Kai Colo -sotien mukaanotolle asetettiin neljä
sitovaa rajaa: EI surmalukuja, EI dynamiittia, EI vankien orjamyyntiä,
JA "**kansa kuvataan elävänä nykypäivän toimijana, ei kukistettuna
jäänteenä**".

Tarkistin H2-noston tekstin (ja sen KÄSITTELYOHJEEN) tätä neljättä
ehtoa vasten: **kolme ensimmäistä täyttyvät** (ei tarkkoja
surmalukuja, ei dynamiittia, ei vankien myyntiä — tarkistin nämä myös
riippumattomasti en-Wikipedian "Fiji"-artikkelin Kai Colo -osiosta,
joka todella sisältää kaikki kolme yksityiskohtaa: n. 170 hengen
verilöyly Na Korowaiwaissa, dynamiitin käyttö luolataisteluissa Na
Culissa, ja n. 1 000 vangin myynti orjuuteen Levukassa — koostaja on
siis oikeassa siitä, mitä piti jättää pois). **Neljäs ehto ei
kuitenkaan täyty.** H2:n proosateksti päättyy antautumiseen ja
Britannian luovutukseen ("Sota oli yksi viimeisistä merkeistä siitä,
ettei koko saari ollut vielä yhden hallinnon alla") — tekstissä ei ole
ainuttakaan virkettä, joka yhdistäisi tapahtuman elävään, nykypäivän
kai colo -väestöön tai heidän jälkeläisiinsä, toisin kuin esimerkiksi
K3-nosto tekee girmit-sopimustyön kohdalla ("sen perintö elää:
indofidžiläiset ovat tänään noin kolmasosa..."). Faktapohjan oma
KÄSITTELYOHJE mainitsee vain ikäsopivuuden (pilari 4), ei mainitse
päätoimittajan neljättä ehtoa lainkaan.

**Suositus:** Ennen julkaisua H2:een — tai historia-sivun muuhun
tekstiin sen yhteyteen — pitää lisätä virke, joka ankkuroi kai colo
-kansan nykypäivään (esim. se, että vuoristoheimojen jälkeläiset ovat
osa nykyistä iTaukei-väestöä Viti Levun sisämaassa, eivät kadonnut
kansa). Tämä on kirjoittajan/päätoimittajan tarkistettava erikseen
en-Wikipediasta tai muusta lähteestä, sillä tätä yksityiskohtaa ei
löytynyt tässä tarkistuksessa käytetyistä artikkeleista.

---

## C. Huomio — kolme "TARKISTA erikseen" -kategoriaa: kaksi osui, kaksi arvausta puuttuu kokonaan

Faktapohja merkitsi rehellisesti neljä kohdekartan kategoriaa
tarkistamattomiksi ajan/429-rajoitusten vuoksi. Tarkistin kaikki neljä
riippumattomasti `categoryinfo`-kutsuilla:

| Kategoria | Tulos |
|---|---|
| `Category:Parliament of Fiji` | **OLEMASSA**, 17 kuvaa |
| `Category:Sacred Heart Cathedral, Suva` | **OLEMASSA**, 5 kuvaa |
| `Category:Government House, Suva` | **PUUTTUU** ("missing") |
| `Category:State House, Fiji` | **PUUTTUU** ("missing") |
| `Category:HFC Bank Stadium` | **PUUTTUU** ("missing") |

Faktapohja ehdotti "molemmat nimet mahdollisia" Government
House/State House -kohteelle — **kumpikaan ei ole olemassa**. Kokeilin
myös muutamaa ilmeistä vaihtoehtoa (`Category:Government House
(Fiji)`, `Category:State House (Fiji)`, `Category:HFC Bank Stadium,
Suva`, `Category:National Stadium (Fiji)`) — kaikki puuttuvat
myös. Tämä ei ole faktapohjan virhe, koska se merkittiin rehellisesti
tarkistamattomaksi eikä väitetty mitään varmana — mutta kirjoittajan
kannattaa tietää etukäteen, ettei näille kahdelle kohteelle löydy
ilmeistä Commons-kategoriaa arvaamalla: tarvitaan oikea haku (esim.
Commonsin sisäinen hakukone tai kohteen oma Wikidata-linkki), ei lisää
nimivariaatioiden kokeilua.

---

## D. Pieni huomio — "infobox-koordinaattipiste" on teknisesti hieman epätarkka termi

Osion 4/7 huomio 3 väittää, että Suva-artikkelin
"infobox-koordinaattipiste" (18,1416°S 178,4419°I) on sama kuin Sacred
Heart -katedraalin piste. **Itse havainto on oikea** (katedraalin
koordinaatti on 18,1416°S 178,4420°I — ero on alle 15 metriä) — mutta
tarkistuksessa kävi ilmi, että Suva-artikkelin `{{Infobox settlement}}`
-mallineen oma `coordinates`-kenttä on **tyhjä**. Kyseinen piste tulee
artikkelin lopusta erillisestä `{{Coord|...|display=title}}`
-mallineesta, joka tuottaa Wikipedian sivun otsikkorivin
koordinaatin (GeoHack-linkin), ei varsinaisen infoboxin sisältä. Tämä
ei muuta havainnon johtopäätöstä miksikään — piste on silti se, jonka
Wikipedia esittää koko kaupungin koordinaattina, ja Grand Pacific
Hotelin käyttö vertailupisteenä on edelleen perusteltu valinta — mutta
"infobox-piste" kannattaa kirjoitusvaiheessa muotoilla tarkemmin
(esim. "artikkelin otsikkokoordinaatti") jos asiasta tehdään mainintaa
julkaistavassa tekstissä.

---

## E. Vahvistus — Colo-i-Suva 1872/1952-ristiriita on todellinen ja jää ratkaisematta

Tarkistin "Colo-i-Suva Forest Reserve" -artikkelin kokonaan: infobox
sanoo `established = 1952`, leipäteksti sanoo sanatarkasti "Established
in 1872". Kumpaakaan lukua ei artikkelissa selitetä tai soviteta
yhteen, eikä en-Wikipedia-rajauksen puitteissa (tehtävänannon mukainen
lähdepohja) ristiriitaa pysty ratkaisemaan — Protected Planet-viite on
ulkoinen lähde, jota ei tarkistettu tässä. Koostajan oma suositus
(vältä tarkkaa perustamisvuotta tai tarkista erikseen ennen julkaisua)
on edelleen paras neuvo.

---

## Vahvistettu oikeaksi (laaja riippumaton tarkistus)

- **1873-ydinketju:** Cakobaun kuningaskunta 5.6.1871–10.10.1874
  (Cakobaun oma infobox), pääkaupunki Levuka koko kauden, luovutus
  10.10.1874, pääkaupunki siirtyi Suvaan 1877 (Pratt nimitetty
  ylikartoittajaksi 1875), hallinnon virallinen siirto 1882 — kaikki
  neljä tarkistettua artikkelia (Suva, Fiji, Colony of Fiji, Seru
  Epenisa Cakobau) täsmäävät keskenään ja faktapohjan kanssa.
  `Colony of Fiji` -infobox vahvistaa täsmälleen faktapohjan väitteen
  "Levuka 1874–1877, Suva 1877–1970".
- **Kai Colo -sota (H2):** maalis–lokakuu 1873, n. 200 King's Troopsia
  + n. 1 000 apujoukkoa, antautuminen (Ratu Dradra) — vahvistettu
  sanatarkasti en-Wikipedia "Fiji" -artikkelin Kai Colo -osiosta.
  Maanomistus- ja uskontokonteksti ("eivät kääntyneet kristinuskoon
  eivätkä tunnustaneet Cakobaun valtaa") vahvistettu. Poisjätetyt
  yksityiskohdat (surmaluku, dynamiitti, vankien orjamyynti) todella
  löytyvät lähteestä ja on oikein jätetty pois tiivistelmästä.
- **Grand Pacific Hotel:** 1910 tilaus, avaus 23.5.1914, Maugham 1916,
  Michener 1946–47, suljettu 1992, uudelleenavaus 24.5.2014 —
  täsmää. Koordinaatti 18,1469°S 178,4225°I täsmää.
- **Kaikki 8 kohdekartan koordinaattia** (Albert Park, Parliament,
  Thurston Gardens, Fiji Museum, Government House, Sacred Heart
  Cathedral, HFC Bank Stadium, GPH) täsmäävät desimaalin/kaariminuutin
  tarkkuudella artikkeleiden `{{coord}}`-malliteisiin.
- **Kaikki 10 Commons-kategoriaa**, jotka koostaja ilmoitti mitanneensa
  (Suva 92/78, Albert Park (Suva) 7, Grand Pacific Hotel Fiji 17,
  Thurston Gardens 9/7, Fiji Museum 15/14, People of Fiji 213/184/29
  alakat., Fiji Hindi language 8/5, Seru Epenisa Cakobau 37, Rivers of
  Fiji 12/10, Colo-i-Suva 7) — täsmäävät tismalleen riippumattomassa
  `categoryinfo`-haussa.
- **Kaikki viisi väitettyä puuttuvaa kategoriaa** (`Fijians`,
  `Indo-Fijians`, `Girmit`, `Rewa River`, `Rewa River, Fiji`) —
  vahvistettu todella puuttuviksi.
- **Indo-Fijians/girmit-faktat:** Leonidas-laiva, 498 ensimmäistä
  työläistä 14.5.1879, yli 61 000 seuraavien 37 vuoden aikana,
  järjestelmä 1879–1916, lakkautus 1.1.1920 — täsmää sanatarkasti.
  2017 väestönlaskennan luvut (289 237, 32,7 %) täsmäävät.
- **USP-faktat:** perustettu 1968, entinen RNZAF Laucala Bay
  -tukikohta, 11 aluekeskusta, 33 miljoonaa km² merta, jäsenmaiden
  maapinta-ala Tanskan kokoinen, Tokelau 1 500 – Fidži yli 900 000 —
  täsmää sanatarkasti.
- **Sääfaktat:** heinäkuu kuivin kuukausi (125 mm), vuosikertymä
  n. 3 000 mm, ei kuukautta alle 60 mm, Hamilton-Gordonin sitaatti,
  "polttava länsi" -nimitys — täsmää sanatarkasti.
- **Rewajoki:** pisin ja leveäkin, Wainibuka/Wainimala-yhtymä, 240 km²
  suisto, uhanalainen härkähai, riisi/vihannes/lehmätalous alajuoksulla
  — täsmää.
- **Albert Park / H4:** nimetty prinssi Albertin mukaan, Kingsford
  Smithin lasku 1928, lipun nosto 9.10.1970, prinssi Charlesin
  itsenäisyysasiakirjojen luovutus pääministeri Ratu Sir Kamisese
  Maralle 10.10.1970 Albert Parkissa — vahvistettu sanatarkasti
  en-Wikipedia "Fijians"- ja "Albert Park (Suva)" -artikkeleista.
- **Monikulttuurisuus/K2:** "Tyynenmeren New York" -lempinimi,
  iTaukei/indofidžiläiset pääväestöryhminä, Rotuman/Lauan/Rambin/
  Kaivalagi/Kailoma/kiinalaiset mainittu, curry-perinne — täsmää
  sanatarkasti.
- **Osio 8 (päällekkäisyyksien välttäminen):** tarkistin
  `js/packs/oceania-questions.js`:n `suva`-kysymyslohkon ja
  `OCEANIA_FACTS.suva`-rivit — koostajan kuvaus niiden sisällöstä ja
  siitä, miten nostot/jaksot kiertävät niitä eri faktoilla, pitää
  paikkansa.

---

## Kelpaako-tuomio

**Faktapohja ei kelpaa sellaisenaan kirjoittajalle vielä — vaatii yhden
pakollisen korjauksen ennen käyttöä.** Kohdan A virhe koskee juuri
sitä lausetta, joka on todennäköisimmin koko Suva-kaupunkisivun
avausnosto ja -johdanto ("ei edes kunnollista kylää" / "nimetön
maapala") — sitä ei voi julkaista sellaisenaan, koska se on
tarkistettavissa vääräksi kahdesta faktapohjan itsensä käyttämästä
lähteestä. Korjaus on kuitenkin pieni ja tarkka (poista "ei edes
kylääkään" -väite, säilytä muu 1873-kulma), eikä vaadi koko
faktapohjan uudelleentekoa. Kohdan B puute (H2:n "elävä nykypäivän
toimija" -ehto) pitää täyttää ennen kuin H2 käytetään historia-sivulla,
päätoimittajan oman 24.8.2026-päätöksen sitovana ehtona. Kohdan C
tieto (Government House / State House / HFC Bank Stadium -kategorioita
ei löydy arvaamalla) kannattaa antaa kirjoittajalle suoraan, jotta
aikaa ei tuhlaannu samojen arvausten toistamiseen. Loppuosa
faktapohjasta — koordinaatit, Commons-kategoriamäärät, päivämäärät,
väestöluvut ja päällekkäisyyksien välttäminen — kesti riippumattoman
tarkistuksen poikkeuksellisen hyvin.
