# Brisbane-faktapohjan riippumaton tarkistus

Tarkistettu 23.8.2026 en-Wikipedian raakatekstistä (`action=raw`,
`NODE_USE_ENV_PROXY=1`) seuraavista artikkeleista: **Brisbane**, The Old
Windmill Brisbane, Commissariat Store Brisbane, Queensland, **Parliament
House Brisbane**, Turrbal, Jagera people, **Brisbane City Botanic
Gardens**, Brisbane River, Mount Coot-tha Queensland, Kangaroo Point
Queensland, Story Bridge, **Customs House Brisbane**, Queen Street Mall,
World Expo 88, South Bank Parklands, Queensland Art Gallery, Capsize of
the ferry Pearl. Koordinaatit luettu jokaisen artikkelin infobox-
`{{coord}}`-mallineesta suoraan (ei API-hakua); etäisyydet ja
kompassisuunnat laskettu itse (haversine + bearing, Node) faktapohjan
vertailupisteestä (Commissariat Store, 27,4732°S 153,0242°I).

**Yleisarvio: faktapohja on erittäin huolellisesti koostettu, ja
laajimmat, task-kohtaisesti korostetut väitteet (parlamenttitalon
rakennusvaiheet 1868/1878, Walter Hillin virkakausi 1855–1881, makadamia
1858, Expo 88:n kävijälukujen käsittely) osoittautuivat kaikki
täsmällisesti oikeiksi.** Kaikki yhdeksän ensisijaisen kohdekartan
koordinaattia (plus kaksi vertailu-/lisäkoordinaattia) täsmäävät
Wikipedian infobox-arvoihin desimaalin tarkkuudella. Löysin kuitenkin
kaksi todellista **asiavirhettä**, joista toinen on suora käännösvirhe ja
toinen toistuu kahdessa eri nostossa sekä proosassa että
fakti-laatikossa, sekä yhden **suunnan laskuvirheen** kohdekartan
taulukossa. Turrbal/jagera-sanamuodot arvioitiin erikseen pilarin 3
kannalta lopussa (kohta E).

Tarkistin yhteensä n. 95 yksittäistä väitettä (4 johdantoa, 16 nostoa
faktoineen, 5 jaksoa, 11 koordinaattia, useita osion 7 huomioita).

---

## A. VIRHE — Tullitalon (Customs House) julkisivun eläin: emu, ei kotka

**Väite (T2, nosto JA fact-laatikko):** "Julkisivussa on kotkan ja
kengurun väliin sijoitettu kilpi, vaikka Australialla ei vielä siihen
aikaan ollut virallista vaakunaa." Fact-laatikko: "Julkisivussa on kilpi
kotkan ja kengurun välissä, vaikka maalla ei vielä ollut virallista
vaakunaa... — en-Wikipedia 'Customs House, Brisbane'"

**Ongelma:** Lähde sanoo suoraan: "the building features a depiction on
its facade of a shield between an **emu** and kangaroo" — eläin on
**emu**, ei kotka. Tämä on kansallistunnuseläin (emu ja kenguru ovat
Australian vaakunan kannattelijat), joten sekaannus ei ole
merkityksetön yksityiskohta vaan suora käännösvirhe alkuperäisestä
sanasta "emu" suomeksi "kotka". Virhe toistuu identtisenä sekä nosto-
proosassa että sitä tukevassa fact-laatikossa, joka silti nimenomaisesti
siteeraa "Customs House, Brisbane" -artikkelia — koostaja on siis
lukenut lähteen väärin molempiin paikkoihin, ei vain jättänyt
laatikkoa proosan kanssa ristiriitaiseksi.

**Suositus:** "kotkan" → "emun" (K3:n emu-käännös, ei kotka)
molemmissa paikoissa, sekä nosto-proosassa että fact-laatikossa.
PAKOLLINEN korjaus.

---

## B. VIRHE — Vanhan tuulimyllyn rakennusvuosi: 1828, ei 1824–1828

**Väite (K1 fact-laatikko):** "Vanha tuulimylly (rakennettu 1824–1828
vankityövoimalla) on Queenslandin vanhin säilynyt rakennus..."
**Väite (H1, nosto JA fact-laatikko):** "vankityövoima rakensi sen
1824–1828 jauhamaan siirtolan viljaa..." / "Vanha tuulimylly
rakennettiin 1824–1828 vankityövoimalla Wickham Terracelle..."

**Ongelma:** Tuulimyllyn oma, koostajan itsensä valitsema päälähde
("The Old Windmill, Brisbane") antaa infoboksissa `built = 1828` ja
luokittelee artikkelin luokkiin "Windmills completed in 1828" ja "1828
establishments in Australia". Artikkelin rakennushistoria on
yksityiskohtainen: Superintendentti suositteli polkukonetta 1827,
perustuksen kaivaminen alkoi heinäkuussa 1828, ensimmäinen jauhatus
tapahtui 31.10.1828, ja sailit tuotiin paikalle vasta marraskuussa
1828. Mikään kohta artikkelissa ei viittaa rakentamisen alkaneen 1824.

Vuosiluku 1824 näyttää olevan sekaannus infoboksin toisesta kentästä:
`beginning_date = 1824–1841 (convict settlement)`, joka kuvaa
rangaistussiirtolan koko olemassaoloaikaa TÄLLÄ paikalla (Wickham
Terrace / Spring Hill -alueella yleensä), ei itse myllyrakennuksen
rakennusaikaa. Myös pääartikkeli "Brisbane" itse sanoo virheellisesti
"built by convict labour in **1824**" — Wikipedia-sisäinen ristiriita
pääartikkelin ja tuulimyllyn oman, huomattavasti yksityiskohtaisemman
artikkelin välillä. Koostaja on ilmeisesti yrittänyt sovitella nämä
kaksi lähdettä yhteen väliaikamuodolla "1824–1828", mutta tarkemman ja
yksityiskohtaisemman lähteen (dedikoitu artikkeli, jota molemmat
nostot muutenkin siteeraavat) mukaan oikea vuosi on yksinkertaisesti
1828.

Virhe toistuu KOLME kertaa: K1:n fact-laatikossa, H1:n proosassa ja
H1:n fact-laatikossa.

**Suositus:** "1824–1828" → "1828" kaikissa kolmessa kohdassa. Jos
koostaja/kirjoittaja haluaa mainita konstruktion suunnittelun
alkaneen jo 1827, sekin on lähteen mukainen lisäys, mutta "1824" pitää
poistaa myllyn rakennusvuotena. PAKOLLINEN korjaus.

---

## C. VIRHE — Kohdekartan taulukko: Parliament House -suunta väärin

Laskin itse kaikki 11 etäisyyttä ja kompassisuuntaa (haversine +
bearing) faktapohjan omasta vertailupisteestä (Commissariat Store,
27,4732°S 153,0242°I) samoilla koordinaateilla kuin faktapohjan
taulukossa:

| Kohde | Koostajan luku | Oma laskelma | Kompassisuunta (oma) |
|---|---|---|---|
| Brisbane (hallinnollinen) | ~0,71 km koilliseen | 0,713 km | NNE (lähellä, pyöristys) |
| **Parliament House** | **~0,37 km koilliseen** | **0,368 km** | **SE (kaakkoon), EI koilliseen** |
| City Botanic Gardens | ~0,60 km itään | 0,605 km | ESE (lähellä, pyöristys) |
| The Old Windmill | ~0,89 km pohjoiseen | 0,893 km | N (täsmää) |
| Customs House | ~1,10 km koilliseen | 1,103 km | NE (täsmää) |
| Queen Street Mall | ~0,41 km pohjoiseen | 0,412 km | N/NNE-raja (lähellä) |
| South Bank Parklands | ~0,62 km etelään | 0,625 km | S (täsmää) |
| Kangaroo Point (keskus) | ~1,43 km itään | 1,430 km | E (täsmää) |
| Queensland Art Gallery/GOMA | ~0,57 km länteen | 0,569 km | W (täsmää) |
| Story Bridge (11. ehdokas) | ~1,57 km koilliseen | 1,573 km | NE (täsmää) |

**Etäisyydet täsmäävät kaikki metrin tarkkuudella — koostajan
laskentamenetelmä on luotettava.** Mutta Parliament House -rivillä
suunta on todella väärä, ei vain pyöristetty karkeammaksi: laskettu
todellinen kompassisuunta on 130,7° eli **kaakkoon (SE)**, ei
**koilliseen (NE, 45°)** kuten taulukko väittää — ero on lähes 90
astetta, siis eri ilmansuuntaneljännes kokonaan. Tarkistin syyn
maantieteellisesti: Parliament House sijaitsee Gardens Pointissa,
niemekkeen kaakkoisessa kärjessä lähellä jokea, kun taas
Commissariat Store (vertailupiste) on North Quayn kupeessa
niemekkeen luoteisosassa — Parliament House ON siis todellisuudessa
kaakkoon vertailupisteestä, mikä vahvistaa laskelman.

Muut taulukon suunnat (Brisbane hallinnollinen piste NNE→koilliseen,
City Botanic Gardens ESE→itään, Queen Street Mall raja-arvo)
ovat samaa lievää yhden pykälän pyöristystä kuin aiemmissa
faktapohja-tarkistuksissa on nähty — ei virheitä, vain karkeampia
ilmaisuja. Parliament House on ainoa, jossa suunta on todella väärä.

**Suositus:** Parliament House -rivin suunta "~0,37 km koilliseen" →
"~0,37 km kaakkoon". Etäisyysluku (0,37 km) on oikein, vain sana
"koilliseen" pitää vaihtaa. PAKOLLINEN korjaus, koska suunta on
suoraan väärä eikä vain pyöristetty.

---

## D. Tarkennuksia (ei pakollisia korjauksia)

1. **Mount Coot-tha / "ku-ta"-hunajasana: kansa-attribuutio
   ristiriitainen lähteiden välillä.** L4:n fact-laatikko siteeraa
   "Turrbal"-artikkelia: "Turrbal people would go to Mount Coot-tha to
   collect honey (ku-ta) from the bees there; it is the place of the
   honey-bee dreaming." Mutta koostajan toinen lähde, "Mount Coot-tha,
   Queensland" -artikkeli, attribuoi saman asian eri kansalle: "Before
   the Moreton Bay penal settlement, Mount Coot-tha was the home of
   the **Yugara** Aboriginal people... The Aboriginal people came to
   the area to collect ku-ta, the **Yugarabul** word for honey..."
   Yugara/Yugarabul viittaa jagera-kansaan (koostaja itse käyttää
   "jagerat (myös yuggerat)" -nimitystä K4:ssä), ei turrbaleihin.
   Kyseessä on siis Wikipedia-sisäinen ristiriita SIITÄ, kumman
   kansan perinnettä Mount Coot-tha ja "ku-ta"-sana edustavat.
   Faktapohja valitsi Turrbal-artikkelin version mainitsematta
   ristiriitaa. Ei vaadi pakollista korjausta (kumpikin lähde on
   validi ja kansat ovat läheisiä naapureita/mahdollisia saman kansan
   osia, kuten K4 itse toteaa), mutta kirjoittajan kannattaa tietää
   ristiriidasta, jos aiheesta halutaan mainita täsmällisemmin.
2. **Signaalimiehen mökin rakennusvuosi: 1881 vai 1883?** H1:n
   fact-laatikko sanoo "signaalimiehen mökki rakennettiin noin 20
   vuotta myöhemmin (n. 1881)" — tämä perustuu artikkelin JOHDANNON
   muotoiluun ("Twenty years later a cottage for the signalman was
   constructed", 1861+20=1881). Mutta artikkelin oma leipäteksti
   ("Signal station and observatory" -osio) sanoo tarkasti: "A cottage
   for the signalman was constructed **in 1883**." Pieni
   Wikipedia-sisäinen ristiriita johdannon ja leipätekstin välillä;
   koostajan "n. 1881" on hyvin lähellä mutta ei täysin täsmää
   tarkempaan lukuun. Koska koostaja käytti approksimaatiomerkintää
   "n.", tätä ei tarvitse pitää virheenä — mutta jos halutaan tarkka
   vuosiluku, 1883 on artikkelin yksityiskohtaisempi tieto.
3. **T2: "Australialla ei vielä ollut virallista vaakunaa" —
   epätäsmällinen kansallisuusviittaus.** Lähde puhuu tarkemmin
   Queenslandin (osavaltion) vaakunasta: "Heraldic scenes... were
   precursors to the official **Queensland** coat of arms, which was
   not granted until 1893." Vuonna 1889 Australiaa liittovaltiona ei
   ollut vielä olemassakaan (federaatio 1901), joten "Australialla ei
   ollut virallista vaakunaa" on anakronistinen ilmaisu — kyse oli
   nimenomaan Queenslandin osavaltion vaakunasta. Lähteen laajempi
   lause ("no government in the country having a coat of arms at the
   time") tukee koostajan yleistystä väljästi, mutta tarkkuutta
   parantaisi "Queenslandilla ei vielä ollut virallista vaakunaa".
4. **H4: "kiinalainen kauppiasyhteisö" — sana "kauppias" ei ole
   suoraan lähteessä.** Lähde sanoo vain "a Chinese quarter at Frog's
   Hollow", ei erikseen mainitse kauppaa. Historiallisesti Frog's
   Hollow'n kiinalaisyhteisö tunnetaan osin kauppiaista ja
   puutarhaviljelijöistä, joten lisäys ei ole väärä, mutta se ei ole
   suoraan lähteen sanoma — pieni tarkennus, ei virhe.
5. **Visakysymysten läheisyys (osion 7 huomio 5 arvioitava
   uudestaan):** Jakso 5:n avausvirke — "Brisbanen ilmasto luokitellaan
   **lämpimäksi ja kosteaksi** subtrooppiseksi (Köppen: Cfa)" — toistaa
   lähes sanatarkasti visakysymyksen 5 OIKEAN vastauksen tekstin
   ("**lämmin ja kostea** ympäri vuoden"). Koostaja vältti onnistuneesti
   visan fact-kentän muotoilun ("talvellakin yli 20 astetta"), mutta ei
   huomannut, että itse vastausvaihtoehdon kaksi keskeistä adjektiivia
   toistuvat jakson ensimmäisessä virkkeessä. Samoin Jakso 3
   (CityCat) — "Joki mutkittelee niin paljon, että vesibussi on usein
   nopein tapa siirtyä kaupunginosasta toiseen" — on asiasisällöltään
   hyvin lähellä visakysymyksen 3 fact-kenttää ("kaupunginosat ovat
   usein veden eri puolilla. Jokilaivat ovat osa joukkoliikennettä"),
   vaikka sanamuoto on eri. Kumpikaan ei anna monivalintavastausta
   suoraan, mutta kirjoittajan kannattaa harkita Jakso 5:n avausvirkkeen
   muotoilua uudelleen (esim. "subtrooppinen Cfa-ilmasto" ilman
   "lämmin/kostea"-parin toistoa), koska osumaa on lähempänä kuin
   koostajan oma itsearviointi antaa ymmärtää.

---

## E. Turrbal/jagera-sanamuodot ja Raamatun pilari 3 — arvio

Pilari 3 (Raamattu): "KUNNIOITUS: jokainen maa asukkaidensa silmin.
Ei stereotypioita, pilkkaa, säälittelyä eikä pelkkiä turistikliseitä."
Lisäksi spec-mantereet.md:n Oseania-osio: "Australian alkuperäiskansat:
historia... kerrotaan suoraan mutta hienotunteisesti ja ilman
yksityiskohtaista kärsimyskuvausta."

**Vahvuudet:**
- K4 esittää turrbalit ja jagerat selkeästi nykyisinä, toimivina
  kansoina eikä "kadonneena kansana" — nimenomaisesti todetaan "Kansat
  elävät ja vaikuttavat kaupungissa yhä".
- Tutkijoiden erimielisyys kansojen rajoista todetaan rehellisesti
  eikä keksitä valetarkkuutta.
- Siirtomaahistorian ankarammat osat (Patrick Loganin maine, "War of
  Southern Queensland" 1843–1855, blackbirding) mainitaan tapahtumina
  yhden virkkeen tasolla ilman uhrilukuja tai kärsimyksen
  yksityiskohtia — noudattaa spec-mantereet.md:n sääntöä täsmälleen.
  Frontier wars -osavaltiotilastot (66 680 kuollutta) jätettiin
  tietoisesti pois oikealla perusteella (osio 7.3) — hyvä päätös.
- H4:n blackbirding-kuvaus ("nykyhistorioitsijat pitävät käytäntöä
  orjuuden kaltaisena pakkotyönä") on suora, rehellinen eikä vähättele,
  mutta ei myöskään mässäile.

**Pohdinnan arvoinen kohta (ei virhe):** K4 päättyy natiivioikeus-
vaatimusten HYLKÄÄMISEEN sekä 2015 että 2017 (liittovaltion oikeus
kielsi native title -oikeuden koko Brisbanen alueelta), ja siirtyy
sen jälkeen suoraan väitteeseen "Kansat elävät ja vaikuttavat
kaupungissa yhä", jonka ainoana konkreettisena esimerkkinä on äskettäin
(tammikuu 2026, siis aivan tuoreena tapahtumana) kuollut vanhin ja
oopperalaulaja Maroochy Barambah. Tämä yhdistelmä — oikeudellinen
tappio + muistokirjoitusviite — saattaa lukijalle näyttäytyä enemmän
elegisenä kuin voimaannuttavana, varsinkin verrattuna esimerkiksi
Vancouver-faktapohjan vastaavaan kohtaan, joka käytti nykyistä,
elävää taloudellista toimijuutta (Musqueam Capital Corporation,
kiinteistöomistus, UBC:n katukyltit) ja kansan VOITTAMAA
oikeusprosessia esimerkkinä. Tämä ei ole tekninen virhe eikä vaadi
korjausta — Brisbanen native title -tarina on todellisuudessa erilainen
(hylätty, ei voitettu) kuin monen muun kaupungin, eikä sitä pidä
vääristää — mutta kirjoittajan kannattaa harkita, löytyykö toinen,
selvästi nykyhetkeen ja toimijuuteen keskittyvä esimerkki K4:n
loppuun Barambah-viitteen rinnalle tai sen sijaan, jotta "kansat
elävät ja vaikuttavat" ei jää vain väitteeksi ilman vahvaa nykyistä
ankkuria.

**Yhteenveto pilarista 3:** Sanamuodot ovat pääosin hyvin linjassa —
ei löytynyt stereotypioita, pilkkaa tai kärsimyksen mässäilyä. Yllä
mainittu K4:n lopetuksen sävy on ainoa asia, joka on syytä ottaa
harkintaan, muttei ole virhe.

---

## F. Muut tarkistetut ja VAHVISTETUT faktat (ei virheitä)

- **K1 (siirtolan historia):** Redcliffe 1824 → North Quay 1825 (Brisbane-
  pääartikkeli, sanatarkasti), Patrick Loganin maine ankarimpana
  rangaistuslaitoksena, siirtola suljettu 1842 — kaikki täsmää.
  Commissariat Store (1828, William Street, viljavarasto) täsmää
  sanatarkasti.
- **K2 (nimistö):** John Oxley nimesi joen 1823 kuvernööri Thomas
  Brisbanen mukaan; Meanjin/Magandjin-tulkinnat ("piikkipaikka" tai
  tulppaanipuu) täsmäävät sanatarkasti "Brisbane"-artikkelin
  Toponymy-osioon. Mianjin/Meanjin todetaan MOLEMPIEN kansojen
  (Yuggera/Turrbal) käyttämäksi nimeksi "Jagera people" -artikkelissa
  — täsmää K4:n väitteeseen.
- **K3/H2 (parlamenttitalo, tarkistettu erityisen huolella):**
  6.6.1859 kuningatar Viktorian kirje erotti Queenslandin — täsmää.
  Peruskivi 14.7.1865, laski Sir George Bowen — täsmää sanatarkasti.
  George Streetin julkisivu valmistui 1868 — täsmää. Pylväskäytävät
  ja holvikaaret George Streetillä valmistuivat **1878**; Alice
  Streetin siipi **1889** — täsmää TÄYDELLISESTI molemmissa nostoissa.
  Joshua Jeaysin omat louhokset, lasimaalaukset Birminghamista —
  täsmää sanatarkasti. Parlamentti kokoontui 1860 entisessä
  vankibarakissa ennen uutta rakennusta — täsmää.
- **K4 (turrbal/jagera):** rajat pohjoinen/eteläinen epäselvä, tutkijat
  eri mieltä — täsmää Ford & Blake -viittaukseen. Native title 1998
  (turrbal) / 2011 (jagera) / yhdistetty 2013 / hylätty tammikuussa
  2015 / valitus hylätty 25.7.2017 — täsmää sanatarkasti sekä
  Turrbal- että Jagera people -artikkeleihin. Maroochy Barambah,
  turrbal- ja gubbi gubbi -taustainen oopperalaulaja — täsmää
  sanatarkasti.
- **H1 (tuulimylly, pl. rakennusvuosi ks. kohta B):** mylly lakkasi
  jauhamasta 1845, signaaliasemana vuodesta 1855, vuoden 1861
  kunnostuksessa aikapallo — kaikki täsmää sanatarkasti.
- **H3 (tulva):** 1893 suurtulva vei ensimmäisen Victoria Bridgen —
  täsmää. Pearl-lautan uppoaminen 13.2.1896, arviolta puolet 80–100
  matkustajasta kuoli — täsmää sanatarkasti. 1974 (osin hurrikaani
  Wandan seurausta), 2011, 2022 -tulvat — täsmää.
- **L1 (kasvitieteellinen puutarha, tarkistettu erityisen huolella):**
  perustettu 1825 ruokaviljelmäksi, 1828 valittu julkiseksi puutarhaksi
  — täsmää. Walter Hill kuraattorina **1855–1881** — täsmää
  TÄYDELLISESTI ("a position he held until 1881"). Maailman
  ensimmäinen viljelty makadamiapähkinäpuu **1858** Hillin toimesta —
  täsmää TÄYDELLISESTI. Ensimmäinen granuloitu sokerierä huhtikuussa
  1862 — täsmää. Yhdeksän tulvaa 1870–2011, Mount Coot-than puutarha
  avattu 1970-luvun puolivälissä — täsmää.
- **L2 (Brisbane-joki):** turrbal-nimi Maiwar, "kulttuurisen,
  taloudellisen ja seremoniallisen elämän keskus" — täsmää
  SANATARKASTI Brisbane-pääartikkelin Indigenous prehistory -osioon.
  344 km pitkä, suolainen Mount Crosbyn padolle asti, "Brown Snake"
  -lempinimi, keuhkokala ja härkähai — kaikki täsmää.
- **L3 (Kangaroo Point):** turrbalien asuttama ennen siirtokuntaa,
  kiveä louhittu rakennuksiin, Kuninkaallisen laivaston varasto →
  Australian armeija 1959–1984, nyt seikkailuyrityksen käytössä —
  kaikki täsmää sanatarkasti.
- **L4 (Mount Coot-tha, pl. kansa-attribuutio ks. kohta D):** korkeudet
  226 m (Mount Coot-tha), 263 m (Constitution Hill), 287 m (The
  Summit) täsmäävät desimaalintarkasti; "korkein kohta Brisbanessa"
  todetaan harhaanjohtavaksi täsmälleen kuten lähdekin toteaa;
  esteetön näköala naapurihuippuihin verrattuna täsmää sanatarkasti;
  planetaario ja kasvitieteellinen puutarha samalla alueella — täsmää.
- **T1 (Story Bridge):** Australian pisin ulokepalkkisilta, malli
  Jacques Cartier -sillasta (1930) — täsmää. 40 m syvät perustukset,
  nelinkertainen ilmanpaine, lähes 2 h dekompressio, 65
  painetautitapausta — täsmää sanatarkasti. 1,25 miljoonaa niittiä,
  kolme kuollutta rakentamisen aikana — täsmää. Avattiin 6.7.1940,
  kiipeilyt alkoivat 2005 — täsmää.
- **T3 (Queen Street Mall):** suljettiin liikenteeltä 1981, avattiin
  9.8.1982 Kuningatar Elisabet II:n toimesta Kansainyhteisön kisoihin
  ajoitettuna — täsmää. ~500 m, yli 700 liikettä, 40 000 m², kuusi
  kauppakeskusta — täsmää desimaalintarkasti. Laajennettiin 1988
  Expo 88:n tahtiin — täsmää. Maanalainen bussiasema kadun alla —
  täsmää.
- **T4 (Expo 88, kävijäluvun ristiriita tarkistettu erityisen
  huolella):** infoboksi 18 574 476 vs. leipäteksti "yli 15 760 000
  kävijää, jotka ostivat lippuja 175 miljoonalla dollarilla" —
  ristiriita VAHVISTETTU todelliseksi. Wikipedia itse selittää eron
  muualla leipätekstissä: korkeampi luku sisältää henkilökunnan ja
  VIP-vieraat ("more than 18 million visitors, including staff and
  VIPs"), matalampi on pelkkä lipunostajaluku. Koostajan valinta
  käyttää tarkempaa, lipputuloihin sidottua lukua (15,7 miljoonaa) on
  perusteltu ja johdonmukainen ratkaisu — EI virhe. South Bank
  Corporation 1989, Parklands avattu 20.6.1992, Streets Beach 2000 m²
  betonia + 2000 m³ hiekkaa + 70 t/vuosi Rous-kanavalta, puolet
  täytemaalla — kaikki täsmää desimaalintarkasti.
- **Jakso 1 (liikenne):** TransLink, go card, Roma Street/Central/
  Fortitude Valley -asemat, yksityisauto suosituin — täsmää.
- **Jakso 2 (maantiede):** Meanjin "piikinmuotoinen paikka" joen
  mutkan vuoksi — täsmää.
- **Jakso 4 (Fitzgerald-tutkintakomissio):** Bjelke-Petersenin kauden
  kokoontumisrajoitukset, katumielenosoitusten tosiasiallinen kielto,
  Fitzgerald-uudistusten yhteys kulttuurilaitosten laajentumiseen ja
  perinnönsuojeluun — täsmää lähes sanatarkasti.
- **Jakso 5 / säätiedot (pl. avausvirkkeen visaläheisyys ks. kohta D):**
  Köppen Cfa, keskimäärin alin 16,6 °C / ylin 26,6 °C, toiseksi
  kuumin pääkaupunki Darwinin jälkeen — täsmää. Ennätyskuumin 43,2 °C
  Australia Day 1940 — täsmää. Ennätyskylmin −0,1 °C heinäkuussa 2007,
  ensimmäinen kerta pakkasen puolella — täsmää. Vuorokausisade-
  ennätys 465 mm 21.1.1887 — täsmää.
- **Koordinaatit (kaikki 11, ks. myös kohta C etäisyyksistä):**
  Commissariat Store, Brisbane (hallinnollinen), Parliament House,
  City Botanic Gardens, Old Windmill, Customs House, Queen Street
  Mall, South Bank Parklands, Kangaroo Point, QAG/GOMA ja Story Bridge
  — JOKAINEN koordinaatti täsmää Wikipedian infobox-`{{coord}}`-
  mallineeseen desimaalin tai kaariminuutin tarkkuudella.
- **Kohdekartan tiiviysväite:** "kaikki kymmenen kohdetta mahtuvat n.
  1,5 km:n säteelle" — vahvistettu, suurin etäisyys (Kangaroo Point,
  1,430 km) alittaa rajan.

---

## Yhteenveto korjattavista kohdista

1. **[PAKOLLINEN, Virhe] T2 (Tullitalo):** "kotkan" → "emun" —
   julkisivun eläin on emu, ei kotka. Väärin sekä proosassa että
   fact-laatikossa.
2. **[PAKOLLINEN, Virhe] K1 ja H1 (Vanha tuulimylly):** "1824–1828" →
   "1828" — mylly rakennettiin 1828, ei 1824 alkaen. Väärin kolmessa
   kohdassa (K1:n fact-laatikko, H1:n proosa, H1:n fact-laatikko).
3. **[PAKOLLINEN, Virhe] Osio 4, kohdekartan taulukko:** Parliament
   House -rivin suunta "koilliseen" → "kaakkoon". Etäisyys (0,37 km)
   on oikein, suunta on väärä lähes 90 asteen verran.
4. **[Tarkennus] L4/Mount Coot-tha:** "ku-ta"-hunajasanan ja
   Mount Coot-than kansa-attribuutio vaihtelee lähteiden välillä
   (Turrbal-artikkeli: turrbalit; Mount Coot-tha-artikkeli:
   Yugara/jagera) — ei vaadi korjausta, mutta hyvä tietää.
5. **[Tarkennus] H1:** signaalimiehen mökin rakennusvuosi "n. 1881" on
   artikkelin johdannon mukainen, mutta leipäteksti antaa tarkemman
   luvun 1883 — pieni Wikipedia-sisäinen ristiriita, koostajan "n."-
   merkintä on riittävän varovainen.
6. **[Tarkennus] T2:** "Australialla ei vielä ollut virallista
   vaakunaa" → tarkempaa olisi "Queenslandilla", koska Australia
   liittovaltiona ei ollut olemassa 1889, ja lähde puhuu nimenomaan
   Queenslandin vaakunasta.
7. **[Tarkennus] H4:** "kiinalainen kauppiasyhteisö" — sana "kauppias"
   ei ole suoraan lähteessä ("a Chinese quarter"), pieni lisäys.
8. **[Huomio, ei virhe] Jakso 5 ja Jakso 3:** Jakso 5:n avausvirke
   toistaa visakysymyksen 5 vastaustekstin kaksi keskeistä adjektiivia
   ("lämmin ja kostea"); Jakso 3 on asiasisällöltään lähellä
   visakysymyksen 3 fact-kenttää. Ei suoraa vastauksenantoa, mutta
   lähempänä kuin koostajan oma itsearviointi (osio 7.5) antaa
   ymmärtää — kirjoittaja voi halutessaan etäännyttää sanamuotoa.
9. **[Huomio, ei virhe] K4 ja pilari 3:** natiivioikeusvaatimusten
   hylkääminen (2015/2017) + äskettäin kuolleen vanhimman muisto
   nykyisyyden ainoana esimerkkinä voi lukea elegisenä — harkitse
   vahvempaa, suoraan nykyhetkeen ankkuroituvaa esimerkkiä K4:n
   loppuun (ks. kohta E).

## Vahvistettu erityisen huolella (tehtävänannon painotukset)

- **Parlamenttitalon rakennusvaiheet (1868 avaus, pylväiköt 1878):**
  molemmat vuosiluvut täsmäävät TÄYDELLISESTI, samoin peruskivi 1865
  ja Alice Streetin siipi 1889 — **ei virheitä**.
- **Walter Hillin virkakausi 1855–1881:** täsmää TÄYDELLISESTI lähteen
  kanssa ("a position he held until 1881") — **ei virheitä**.
- **Ensimmäinen viljelty makadamia 1858:** täsmää TÄYDELLISESTI
  ("The world's first cultivated macadamia nut tree was planted in
  1858 by Walter Hill") — **ei virheitä**.
- **Expo 88:n kävijäluku:** koostajan tarkempaan, lipunmyyntiin
  sidottuun lukuun (yli 15,7 miljoonaa) perustuva valinta on
  perusteltu ja Wikipedian oma selitys (henkilökunta/VIP-vieraat
  korkeammassa luvussa) vahvistaa ratkaisun järkevyyden.
- **Kohdekartan koordinaatit:** kaikki 11 koordinaattia täsmäävät
  Wikipedian infoboksiin — **ei virheitä**. Etäisyyslaskelmat
  täsmäävät kaikki metrin tarkkuudella. Yksi suunta (Parliament
  House) on kuitenkin väärä, ks. kohta C.
- **Turrbal/jagera-sanamuodot ja pilari 3:** vahvasti linjassa —
  nykyisyys, toimijuus ja rehellinen mutta hienotunteinen
  siirtomaahistoria kaikki täyttyvät. Yksi harkinnan arvoinen
  sävykohta K4:n lopetuksessa (ks. kohta E), ei virhe.
