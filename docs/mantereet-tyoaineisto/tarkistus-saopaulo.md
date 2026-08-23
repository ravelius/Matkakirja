# São Paulo -faktapohjan riippumaton tarkistus

Tarkistettu 23.8.2026 en-Wikipedian raakatekstistä (`action=raw`, `curl` suoraan
onnistui ilman `NODE_USE_ENV_PROXY`-lippua; MediaWiki-rajapinta `action=query&
prop=coordinates` vastasi useita kertoja "You are making too many requests"
-virheellä samaan tapaan kuin faktapohja itse raportoi — `curl --retry 6
--retry-delay 5` -uusinta korjasi joka kerta) seuraavista artikkeleista:
**São Paulo** (pääartikkeli), São Paulo Railway Company, São Paulo Cathedral,
Paulista Avenue, Immigrant Inn, Liberdade (district of São Paulo), Rua 25 de
Março, Arab Brazilians, Municipal Market of São Paulo, Ibirapuera Park,
Terra roxa (täsmennyssivu). Koordinaatit haettu itse MediaWiki-rajapinnasta
(`prop=coordinates`, `redirects=1`) kaikille yhdeksälle kohdekartan pisteelle,
ja etäisyydet/suunnat/bounding box laskettu itse (haversine + bearing +
suorakulmio, Python). Kaikki 15 merkkimäärää (3 johdantoa + 12 nostoa)
tarkistettu koneellisesti `len()`-funktiolla.

**Yleisarvio: erittäin huolellista työtä, ja kaksi tehtävänannon
erityishuomiota (Santosin rautatien 16.2.1867 ja väkiluvun 31 385) osuvat
molemmat täsmälleen oikein.** Kaikki 12 nostoa, kolme johdantoa, kaikki
yhdeksän kohdekartan koordinaattia ja kaikki 15 merkkimäärää täsmäävät
lähteisiin. En löytänyt yhtään PAKOLLISTA asiavirhettä nostoteksteistä.
Löysin kuitenkin yhden todellisen laskuvirheen (säätiedot, kohta A), yhden
mittausvirheen kartan rajausväitteessä (kohta B), yhden nosto-vs-faktalaatikko
-ristiriidan (kohta C) ja kolme kohtaa, joissa faktapohjan oma
visa-läheisyysarvio on liian optimistinen (kohta D) — nämä kannattaa korjata
ennen julkaisua, mutta mikään ei ole niin vakava että se estäisi laudan
hyväksymistä sellaisenaan.

---

## A. VIRHE (laskennallinen) — Osio 5: "elo-syyskuussa (kuivin) n. 32 mm"

**Väite (osio 5, säätiedot):** "tammikuussa (sateisin kuukausi) keskimäärin
n. 292 mm, elo-syyskuussa (kuivin) n. 32 mm."

**Ongelma:** en-Wikipedian säätaulukko (`São Paulo`, Climate) antaa
kuukausittaiset sademäärät tarkasti: elokuu 32,3 mm, mutta syyskuu 83,3 mm —
lähes kolme kertaa enemmän. Kuivin yksittäinen kuukausi on **pelkkä elokuu**,
ei "elo-syyskuu" yhdessä. Leipäteksti ("decreases in winter, averaging 32 mm")
ei itse nimeä kuukausia, mutta taulukon luku 32 mm osuu täsmälleen elokuuhun
yksinään, ei kahden kuukauden keskiarvoon (mikä muuten olisi (32,3+83,3)/2 ≈
57,8 mm, ei 32 mm).

**Suositus:** "elo-syyskuussa (kuivin) n. 32 mm" → "elokuussa (kuivin) n. 32 mm".
Pieni korjaus, mutta suoraan tarkistettavissa numeroista, joten kannattaa
tehdä ennen kuin luku päätyy `saatiedot.js`-tyyliseen leipätekstiin.

---

## B. Mittausvirhe — Osio 4: "n. 3 km × 3 km" kahdeksalle ensimmäiselle kohteelle

**Väite (osio 4, rajausehdotus):** "Kahdeksan ensimmäistä kohdetta mahtuvat
n. 3 km × 3 km alueeseen historiallisen keskustan (Sé) ympärillä, mutta kohde 9
(Ibirapuera Park) on n. 5,2 km lounaaseen."

**Ongelma:** Laskin itse bounding boxin kohteille 1–8 samoilla koordinaateilla
kuin faktapohjan taulukossa: pohjois-eteläsuunnassa 3,64 km (Luz Stationista
Liberdadeen), itä-länsisuunnassa **4,38 km** (Avenida Paulista/MASP:sta
Immigrant Inniin) — ei 3 km × 3 km. Itä-länsi-ulottuvuus on aliarvioitu lähes
50 %. Etäisyys keskipisteestä yksittäisiin kohteisiin (taulukon oma sarake) on
sen sijaan laskettu oikein jokaiselle pisteelle erikseen — vain kokonaisalueen
rajausväite on pyöristetty liian optimistisesti.

**Suositus:** "n. 3 km × 3 km" → esim. "n. 3,6 km × 4,4 km" tai väljemmin
"noin nelisen kilometriä joka suuntaan". Ei vaikuta itse koordinaatteihin tai
kartan toimivuuteen, vain kirjoittajalle annettuun zoomausohjeeseen.

---

## C. Nosto-vs-faktalaatikko-ristiriita — Jakso 4: Ibirapuera Parkin suunnittelijat

**Nostoteksti (Jakso 4):** "158 hehtaaria vihreää keskellä kivikaupunkia,
suunnittelijoinaan maisema-arkkitehti Roberto Burle Marx ja arkkitehti Oscar
Niemeyer."

**Faktalaatikko (sama jakso):** "suunnittelijoinaan maisema-arkkitehti
Roberto Burle Marx (yleisilme) ja arkkitehti João Felipe Pereira / myöhemmin
Oscar Niemeyerin paviljonkikompleksi."

**Ongelma:** Faktalaatikko on lähteen mukainen ja asiallisesti varovainen —
"Ibirapuera Park" -artikkeli sanoo puiston vuoden 1954 rakennukset
suunnitelleen arkkitehti **João Felipe Pereira**, ja maiseman agronomi
**Otávio Augusto Teixeira Mendes**; Burle Marx mainitaan vain "inspired on
modern drafts from the landscape architect Roberto Burle Marx" (MoMA-lähde,
ts. innoittajana, ei suunnittelijana), ja Niemeyerin nimi liitetään puistoon
vasta kohdassa, joka kertoo rakennuskompleksin kansallismuistomerkki-
rekisteröinnistä 2016 ("the complex of buildings designed by Oscar Niemeyer,
alongside Zenon Lotufo, Hélio Uchôa Cavalcanti, and others"). Itse nostoteksti
kuitenkin pudottaa João Felipe Pereiran kokonaan pois ja esittää Burle Marxin
ja Niemeyerin suoraan alkuperäisen 1954-puiston "suunnittelijoina" ilman
faktalaatikon varauksia — juuri sitä eroa jota tehtävänanto pyysi etsimään
lukemalla nosto ja laatikko erikseen.

**Suositus:** Joko täsmennä nostoteksti faktalaatikon mukaiseksi (esim.
"suunnittelijoinaan mm. arkkitehti João Felipe Pereira, myöhemmin myös Oscar
Niemeyerin paviljongit, ja maisemassa Roberto Burle Marxin vaikutus") tai —
jos merkkimäärä ei riitä — jätä nimet pois nostotekstistä ja säilytä ne vain
faktalaatikossa asianmukaisin varauksin.

---

## D. Osio 7:n visa-läheisyysarvio on optimistisempi kuin todellisuus

Faktapohjan oma osio 7 kohta 1 väittää, ettei mikään nosto anna visan
vastausta "suoraan samalla sanamuodolla." Vertasin jokaista viittä
`southamerica-questions.js`:n `saopaulo`-kysymystä (sekä niiden `fact`-kenttää)
nostoteksteihin sanatarkasti. Kolmessa tapauksessa nosto on lähempänä visan
omaa sanamuotoa kuin osio 7 antaa ymmärtää:

- **SP3 vs. visakysymys 2 (kahvi):** Visan `fact`-kenttä: "...teki alueesta
  **maailman johtavan tuottajan**, ja rikkaus **rakensi** kaupungin." SP3:n
  nosto: "Kahvi **teki São Paulon osavaltiosta maailman johtavan tuottajan**,
  ja rikkaus **valui kaupunkiin**..." — lauserakenne ja sanavalinta
  ("maailman johtava tuottaja") ovat lähes identtiset. Faktapohja on oikeassa
  siinä, ettei terra roxa -sanaa käytetä (ks. faktapohjan oma epävarmuusmerkintä,
  perusteltu), mutta itse ydinväite (kahvi → maailman johtava tuottaja →
  rikkaus) on sama kuin visan omassa faktatekstissä, ei vain visan aiheessa.
- **SP4 vs. visakysymys 1 (eteläinen pallonpuolisko):** Visan `fact`-kenttä:
  "São Paulon metropolialue on **eteläisen pallonpuoliskon väkirikkain**..."
  SP4:n nosto: "...**eteläisen pallonpuoliskon suurin kaupunkialue**." Sama
  väite, lähes sama ilmaus (synonyymipari "väkirikkain"/"suurin"). Faktapohja
  perustelee eron tarkoilla luvuilla (11,9 milj. / 21,5 milj. / 12 %), mikä
  onkin todellinen ero, mutta ydinlause itsessään toistaa visan sanamuodon
  läheisesti.
- **A3 vs. visakysymys 5 (japanilaisyhteisö):** Visan `fact`-kenttä ei anna
  suoraa "suurin Japanin ulkopuolella" -lausetta, mutta visan oma
  vastausvaihtoehto ja kysymysteksti ("suurin Japanin ulkopuolella") toistuu
  A3:n nostossa lähes sanasta sanaan: "...São Paulo on yhä **suurimman Japanin
  ulkopuolisen japanilaisyhteisön koti maailmassa**." Tarkat vuosiluvut
  (1912, 1958: 120 000, 1987: 326 000, 1974) ovat toki visan ulkopuolelta,
  mutta ne on liitetty saman superlatiivin ympärille, ei sen sijasta.

Mikään kirjoitetuista säännöistä (spec-mantereet.md, lehtityö-resepti.md)
ei suoraan kiellä tätä South Americalle — Kulttuurivisa-sääntö
lehtityö-resepti.md:ssä koskee muotoiluttaan middleeast-questions.js-mallia
("minitehtävä EI saa toistaa visaa") eikä sano mitään nostoista. Vancouver-
tarkistuksen ennakkotapaus (kohta 6) käsitteli vastaavaa löydöstä huomiona,
ei pakollisena korjauksena. Käsittelen nämä siis samalla tavalla: **ei
pakollinen**, mutta suosittelen kirjoittajaa etäännyttämään sanamuotoa
hieman (esim. SP3:ssa "maailman johtava tuottaja" → "yksi maailman johtavista
kahvintuottajista" tai painottamalla enemmän vuosilukuja kuin superlatiivia),
koska kolme viidestä visa-aiheesta osuu tässä lähemmäs kuin faktapohjan oma
arvio väittää.

---

## E. Pienet huomiot (ei vaadi korjausta)

- **Köppen-luokka:** en-Wikipedian infoboksi antaa "Cfa", mutta artikkelin
  oma Climate-osio (paremmin lähteistetty, oma viite) sanoo "Cwa". Faktapohja
  käytti Cwa:ta, joka on oikea valinta samalla periaatteella kuin aiemmissa
  tarkistuksissa (tarkempi lähde voittaa) — ei virhe, mutta Wikipedian
  sisäinen ristiriita kannattaa tietää jos infoboksia joskus siteerataan.
- **Brasilian BKT-osuus vaihtelee Wikipedian sisällä:** pääartikkelin
  johdannossa "around 10%", "20th century" -osiossa "11%", Economy-osiossa
  (2010-luku, tarkin lähde) "12.26%". Faktapohja käytti 12,26 %:a oikein
  Economy-osion mukaisesti — ei virhe, mutta selittää miksi luku saattaa
  poiketa muista Wikipedia-kohdista.
- **Infoboksin kaupunkipisteen etäisyys perustamispaikasta:** faktapohja
  arvioi "n. 0,3–0,4 km"; oma haversine-laskelma antaa 0,23 km. Hieman
  aliarvioitu suuntaan "isompi kuin väitetty" pikemmin kuin päinvastoin —
  ei virhe kartan käytön kannalta, koska Pátio do Colégio valittiin joka
  tapauksessa oikein keskipisteeksi spec-mantereet.md:n periaatteen mukaisesti.
- **Kompassisuunnat (3/9 pyöristetty yksi pykälä karkeammaksi):** Sé-katedraali
  (todellinen suunta SSW, faktapohja "lounaaseen"/SW), Avenida
  Paulista/MASP (WSW, faktapohja SW) ja Ibirapuera (SSW, faktapohja SW) —
  sama ilmiö kuin Vancouver-tarkistuksen kohdassa D. Etäisyydet (kaikki
  yhdeksän) täsmäävät alle 30 metrin tarkkuudella omaan haversine-laskelmaani.
- **Avenida Paulista / MASP -rivi kartassa (kohde 5):** taulukko yhdistää
  kaksi eri artikkelia yhteen koordinaattiin; käytetty koordinaatti
  (23,5611°S 46,6558°W) on täsmälleen MASP:n oma piste ("São Paulo Museum of
  Art"), ei Paulista Avenuen oma piste (23,5614°S 46,6564°W, n. 40 m
  kauempana) — ero on merkityksettömän pieni kartalla, mutta rivin otsikko
  mainitsee molemmat lähteet vaikka koordinaatti on vain toisesta.
- **Hospedaria dos Imigrantesin kansallisuusluku (70 vs. 60):** faktapohja
  käytti dedikoitua "Immigrant Inn" -artikkelia ("over 70 nationalities"),
  kun taas pääartikkeli "São Paulo" mainitsee samasta paikasta "60
  nationalities" ja hieman eri aikavälin (1882–1978 vs. 1887–1978). Sama
  ratkaisuperiaate kuin muissakin tarkistuksissa (tarkempi, dedikoitu lähde
  voittaa) — ei virhe, mutta Wikipedian sisäinen ristiriita kannattaa
  tiedostaa.

---

## F. Erityisesti tarkistetut kohdat (tehtävänannon painotukset)

- **Santosin rautatien avausvuosi (16.2.1867):** VAHVISTETTU TÄSMÄLLEEN
  OIKEIN. "São Paulo Railway Company" -artikkelin infobox (`start_year =
  {{start date|1867|02|16}}`) ja leipäteksti ("The São Paulo Railway was
  opened on 16 February 1867") täsmäävät sanatarkasti. Faktapohja käsitteli
  myös oikein pääartikkelin sisäisen ristiriidan (Estrada de Ferro
  Santos-Jundiaí, "from 1869 onward" — tämä on saman radan myöhempi,
  vuoden 1946 kansallistamisen jälkeinen nimi, ei toinen rata) ja valitsi
  perustellusti tarkemman, aiemman ja paremmin lähteistetyn päivämäärän.
  Myös "10 kuukautta etuajassa 8 vuoden sopimuksesta", Daniel Fox / 800 m
  Serra do Mar -nousu, £200 000 budjetti ja 26 mailin (42 km) kiertotie
  täsmäävät kaikki sanatarkasti.
- **Vuoden 1872 väkiluku 31 385:** VAHVISTETTU TÄSMÄLLEEN OIKEIN. Pääartikkelin
  virallinen `{{Historical populations}}`-taulukko: 1872: 31 385, 1890:
  64 934, 1900: 239 820 — kaikki kolme SP3-nostossa käytettyä lukua täsmäävät
  taulukkoon numero numerolta.
- **Siirtolaisyhteisöt (italialaiset, japanilaiset, libanonilaiset) nykyisenä
  elämänä, ei kuriositeettina:** Pilari 3:n hengessä hyvin toteutettu.
  A2 käyttää nykymuotoa ("Nykyään Bixigan, Brásin ja Moocan kaupunginosat
  pitävät perinnettä yllä", "kaupungissa paistetaan päivittäin"). A3 päättyy
  nykyhetkeen ("São Paulo **on yhä** suurimman... koti", "vuodesta 1974...
  **on merkinnyt**" — jatkuva nykyisyys, ei pelkkä historiallinen tapahtuma).
  A4 korostaa eksplisiittisesti nykyisyyttä: "se **on sitä yhä**,
  satakolmekymmentä vuotta myöhemmin, **uusien siirtolaissukupolvien
  pitämänä**." Köyhyyttä (favelat, kodittomuus) tai nykyrikollisuutta
  ("Public security" / "Social challenges" -osiot) ei ole nostettu mihinkään,
  vahvistettu suoraan lähteestä — ainoa poikkeus on yksi neutraali maininta
  jokien saastumisesta (Jakso 2), joka ei liity köyhyyteen tai rikollisuuteen.
  Kuvasäännöissä (osio 6) on myös eksplisiittinen ohje välttää siirtolaisuuden
  esittämistä pelkkänä 1800-luvun kuriositeettina ja tasapainottaa
  nykyaikaisilla kuvilla — pilarin 3 mukainen.
- **`siirtolaisuus`-sivun tekninen perustelu (ei vakioaihe):** vahvistettu
  `js/ui-apurit.js`:n `AIHE_IKONIT`-taulusta — 11 valmista aihetta (historia,
  kuvataide, kirjallisuus, musiikki, ruoka, luonto, tiede, nykytaide, huumori,
  elama, muu), eikä `siirtolaisuus` ole niiden joukossa, joten väite sivun
  piirtymisestä yleiskuvakkeella "muu" pitää paikkansa.
- **Visan suora anto (osio 7 kohta 1):** ks. kohta D yllä — faktapohjan oma
  arvio oli liian optimistinen kolmessa viidestä aiheesta, mutta ei
  pakollinen korjaus.

---

## Yhteenveto korjattavista kohdista

1. **[Korjaus, pieni]** Osio 5: "elo-syyskuussa (kuivin) n. 32 mm" →
   "elokuussa (kuivin) n. 32 mm" (syyskuu on 83,3 mm, ei 32 mm).
2. **[Korjaus, pieni]** Osio 4 rajausehdotus: "n. 3 km × 3 km" kahdeksalle
   ensimmäiselle kohteelle → todellinen bounding box on n. 3,6 km × 4,4 km.
3. **[Korjaus, kohtalainen]** Jakso 4 (Ibirapuera): nostoteksti antaa
   suunnittelijoiksi suoraan Burle Marxin ja Niemeyerin, faktalaatikko
   hedgeaa oikein (João Felipe Pereira alkuperäinen arkkitehti, Burle Marx
   vain innoittaja, Niemeyer liitetty vasta 2016-rekisteröintiin) — yhdenmukaista
   ennen julkaisua.
4. **[Suositus, ei pakollinen]** Osio 7 kohta 1: kolme nostoa (SP3, SP4, A3)
   ovat lähempänä visan omaa sanamuotoa kuin faktapohja itse arvioi —
   harkitse sanamuodon etäännyttämistä, ks. kohta D.
5. **[Ei virhe, huomio]** Kolme kompassisuuntaa (Sé, Avenida Paulista/MASP,
   Ibirapuera) pyöristetty yksi pykälä karkeammaksi — etäisyydet oikein.
6. **[Ei virhe, huomio]** Köppen Cfa/Cwa ja BKT 10 %/11 %/12,26 % ovat
   Wikipedian sisäisiä ristiriitoja; faktapohja valitsi molemmissa
   paremmin lähteistetyn arvon oikein.

## Vahvistettu erityisen huolella (tehtävänannon painotukset)

- **Santosin rautatie 16.2.1867:** ei virhettä, sanatarkka täsmäys, sisäinen
  1869-ristiriita käsitelty asianmukaisesti.
- **Väkiluku 1872: 31 385:** ei virhettä, täsmää viralliseen väestötaulukkoon
  numero numerolta (myös 1890 ja 1900 täsmäävät).
- **Siirtolaisyhteisöt pilarin 3 mukaisina:** vahvasti onnistunut — nykyisyyttä
  korostava kielenkäyttö kaikissa kolmessa nostossa (A2, A3, A4), köyhyys ja
  nykyrikollisuus rajattu pois kokonaan, tekninen `AIHE_IKONIT`-perustelu
  vahvistettu koodista.
- **Kaikki 15 merkkimäärää ja kaikki yhdeksän koordinaattia:** täsmäävät
  konekohtaisesti tarkistettuna — ei yhtään virhettä.
