# Opus 1 → Fable: ME-erä C valmis, jään valmiuteen (10.8.2026)

**v501 (Oman + Qatar) ja v507 (Egypti) mainissa; Kuwait (v511) on
PR #745:ssä ja mergeän sen heti kun CI on vihreä** — se on erän
viimeinen toimenpide, ei kesken jäävä työ.
`# tests 578 / # pass 577 / # fail 0`. Erä B:n raportti jäi haaralleni
rebasessa, joten sen ydin on tässä mukana. Jatkokohta on kirjattu
**docs/opus1-tilanne.md**:hen niin että toisen tilin uusi Opus voi
jatkaa suoraan siitä. **En aloita uusia eriä — jään valmiuteen.**

## Erä B: Oman ja Qatar (v501)

**Oman** — *Vuoret*: Jebel Shamsin rotko, Jebel Akhdarin terassikylät ja
ruusuvesi, suitsukehartsi. *Meri*: Surin dhow-telakka, vihreän
merikilpikonnan poikaset Ras al Jinzissä, Musandamin vuonot.
**Qatar** — *Aavikko*: Khor Al Adaidin sisämeri, Zekreetin sienikalliot,
hiekan alle jäänyt Al Zubarah. *Rakennukset*: kansallismuseon
aavikkoruusu, Souq Waqif, Islamilaisen taiteen museo.

Kirjoitin ensin Qatar-aiheen Omanin sivulle ja siirsin sen. Kirjaan
tämän, koska houkutus lainata naapurimaan aihetta kasvaa mitä
pienemmästä maasta on kyse.

## Erä C: Egypti (v507) ja Kuwait (v511)

**Egypti** oli jo seitsemän aihesivun maa, joten katsoin ensin mitä
puuttuu: **Eläimet** (Suezinlahden lintupullonkaula, dugongi
meriheinäniityllä, egyptinkilpikonna) ja **Käsityöt** (khayamiyan
ompelijoiden katu, Tunisin savenvalajakylä, nubialaiskylien maalatut
seinät).

**Kuwaitilla** ei ollut yhtään aihesivua. Nyt: **Linnut** (2–3 miljoonaa
läpimuuttavaa lintua vuodessa, Kubbarin 380 metriä leveä tiirasaari,
Al-Jahran ruovikko) ja **Aavikko** (Mitribahin 53,9 °C, talvisateen
jälkeinen kukinta ja arfaj, beduiinien sadu-kudonta).

## Kuwaitin sotaherkkyys: mitä tein ja miksi

Tutkimusvaiheessa nousi kolme kytkentää: Bubiyanin saarelle tehtiin
aseellinen maihinnousu 1.5.2026, Kubbarilla on kuusi vuoden 1991
sotahautaa, ja arfaj on noussut kestävyyden vertauskuvaksi tämän vuoden
iskujen aikana. Linjasi on **ei sotasisältöä**, joten:

- **Pudotin Bubiyanin kokonaan pois.** Kolmas lintujuttu olisi ollut sen
  vuorovesiuomista — aihe on hieno, mutta saarella on käynnissä olevan
  sodan tapahtumia. Tilalle tuli Al-Jahran kosteikko.
- **Kubbar jäi**, koska juttu kertoo tiirakoloniasta ja saari on
  luontokohde. Vuosi 1991 ei esiinny tekstissä.
- Hylkäsin myös kuvan, jossa muuttolinnut lensivät Vapaudentornin yli:
  torni on 1991-monumentti, ja se oli kuvan hallitsevin kohde.

Yksikään juttu ei mainitse sotaa, eikä maalehden nostoissa ole
wiki-linkkejä, joten lapsi ei päädy linkkiä seuraamallakaan
sota-artikkeliin. **Jos haluat Kuwaitin pois kokonaan tai Kubbarinkin
vaihtoon, sano — se on yhden erän työ.**

## Yksi asia, joka vaatii sinun päätöksesi

**Kirjoitin kuuden kuvan tekijän nimen muistista ja sain kaikki kuusi
väärin.** Kuwaitin `lahde`-kentissä oli keksittyjä mutta uskottavan
näköisiä nimiä. Sama vika oli lipsahtanut Egyptiin kahdesti, ja yksi
lisenssi oli merkitty public domainiksi, vaikka tiedoston wikitekstissä
lukee CC BY 4.0 (API:n `extmetadata` väittää siitä eri asiaa kuin sivun
oma lisenssimalline). Korjasin omani ja tein työkalun, joka kirjoittaa
kentän suoraan API:sta.

Tekijänmerkintä on CC BY:n **lisenssiehto**, joten väärä nimi on
rikkomus siinä missä puuttuvakin. `tools/lisaa-tekijat.mjs` täydentää
vain PUUTTUVAN tekijän eikä katso niitä rivejä, joissa nimi jo on —
siis juuri niitä, joissa tämä vika piilee. Lisäsin repoon
**`tools/tarkista-tekijat.mjs`**, joka vertaa olemassa olevat nimet
Commonsiin. Ajoin sen `maa-kategoriat.js`:lle: omat rivini ovat
puhtaita, ja jäljelle jää parikymmentä riviä, jotka ovat tahallisia
(suomennetut laitosnimet, translitteroinnit).

**Päätettäväksesi: ajanko työkalun kaikkien pakettien yli?** En koskenut
muiden sessioiden kirjoittamiin lähdemerkintöihin ilman lupaa. Ajo on
nopea ja tulos on lyhyt lista silmäiltäväksi.

## Seuraavaksi jonossa (ei aloitettu)

**Erä D = Saudi-Arabia ilman Mekkaa ja Medinaa + Bahrain.** Rajaukset,
aihe-ehdokkaat ja koko työtapa ovat docs/opus1-tilanne.md:ssä.

---

# Sonnet 2 → Fable: erä 13 valmis — EUROOPPA TÄYSIN KATETTU, jään valmiuteen (10.8.2026)

Varareitti käytössä pysyvästi (ei create_trigger- eikä
send_later-työkalua).

**Erä 13 (Vilna/Oslo/Kööpenhamina, 18 kohdetta) valmis**: v508
mainissa, PR #742 squash-mergetty itse CI:n mentyä vihreäksi
(Monitor-työkalulla). Versiokollisio v507→v508 hoidettu itse
(toinen PR ehti mergetä v507:n ensin — sama kaava kuin erässä 10).
Amalienborg-disambiguointi tarkistettu (Tanskan kuninkaanlinna, ei
pelin virheellisesti linkittämä ruotsalainen panimo). Haara nollattu
tuoreeseen mainiin.

**TÄLLÄ EUROOPPA ON TÄYSIN VALMIS**: kaikki 37 `maakartat.js`:n
Euroopan kohdekarttakaupunkia ovat saaneet nähtävyysjutut (tarkistettu
ohjelmallisesti diffaamalla `KAUPUNKIKARTAT`-avaimet
`NAHTAVYYSJUTUT`-avaimiin — täsmällinen osuma, ei puuttuvia eikä
ylimääräisiä). Ainoa `maakartat.js`:n kaupunki ilman nähtävyysjuttua
on Dubai, joka on Lähi-idän kaupunki eikä kuulu Eurooppa-tehtävään.

Kirjoitin täsmällisen jatko-/luovutusdokumentin `docs/sonnet2-
tilanne.md`:ään toista tiliä varten (kaikki 13 erää versionumeroineen
ja PR-numeroineen, lukittu sisältömalli ja uusi monikuvalinja
kriteereineen, koko toimiva prosessiputki vaihe vaiheelta, yleiset
wiki-disambiguointikuviot, "ei sotasisältöä" -linja Venäjän/Ukrainan
kohteissa, viestintärajoitus (ei create_trigger/send_later),
kontinkierrätyksen selviytymisohje). Tarkoitus on, että uusi sessio
voi jatkaa suoraan siitä ilman tätä keskustelua.

**En aloita erää 14 tai Lähi-idän töitä** — jään valmiustilaan kuten
pyysit. Odotan uutta kuittausta.

**Erä 12 (Tromssa/Dubrovnik/Riika) valmis** (edellinen raportti):
v502 mainissa, PR #733. Ei sotasisältöä -linja sovellettu.

---

# Opus 1 → Fable: ME-erä A valmis (10.8.2026)

**v499 mainissa** (#729). `# tests 571 / # pass 570 / # fail 0`.

## Mitä tuli

**Emiraatit, kolmas sivu "Ranta ja rata"** — mangrovemetsä, joka kasvaa
suolavedessä ja hengittää juurillaan; flamingot Ras Al Khorin lahdella
keskellä kaupunkia; kamelikilpailut, joissa ratsastajana on
radio-ohjattu robotti. Minitehtävä robotista.

**Jordania, maan ensimmäiset sivut.**
- *Vedet*: Kuollutmeri kannattelee kelluvaa, ranta siirtyy kauemmas
  pinnan laskiessa noin metrin vuodessa, ja maan 27 kilometrin
  merenranta Akabassa on korallien peitossa.
- *Rauniot*: Jerashin soikea tori, Ammanin Herkuleen temppeli ja
  Qusayr Amran aavikkolinna tähtitaivaskupoleineen.

Petraan ja Wadi Rumiin en koskenut, myöskään kuvissa.

## Kolme havaintoa

**1. Esitarkistin päivitetty** (hyväksyntäsi mukaan): 2–4 aihesivua,
kolme juttua kullakin. Sisältötarkistukset löysivät tästä erästä yhden
aidon vian — kamelitehtävän vastaus vuoti jutun otsikkoon — ja otsikko
kirjoitettiin uusiksi.

**2. Jordanialla ei ole menovinkkisivua**, eikä sitä ole muillakaan
tulevilla ME-mailla (vain ARE:lla ja EGY:llä on). Maalehti toimii ilman,
mutta viimeinen sivu jää nyt aihesivuksi. Sano jos haluat menovinkit
mukaan samoihin eriin — silloin lisään ne kunkin maan kohdalla, mikä
kasvattaa erän kokoa noin kolmanneksella.

**3. Kuvien maakohtaisuus vaati tarkkuutta.** Kuolleenmeren ja knafehin
parhaat Commons-kuvat ovat Israelin puolelta, ja sääntömme on että kuva
on siitä maasta, jota sivu käsittelee. Vaihdoin molemmat: Kuollutmeri
esitetään nyt jordanialaiselta rannalta, ja ruoka-aihe jäi kokonaan pois
tästä erästä, koska jordanialaisia ruokakuvia ei löytynyt riittävästi.
Jordanialle voi siis myöhemmin tehdä kolmannen sivun (ruoka tai Danan
luonnonpuisto), jos etsin kuvat erikseen.

## Seuraavaksi

Jatkan jonoa ilman eri lupaa: **erä B = Oman + Qatar**. Raportoin
samalla tavalla.
