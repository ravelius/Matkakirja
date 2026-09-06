# Itä-Timor-maalehti (ISO-3: TLS) — lyhyt faktapohja

*Koonnut Opus-lehtiagentti 6.9.2026. Kaikki faktat haettu samana päivänä
en-Wikipedian raakatekstistä (`api.php?action=query&prop=extracts&
explaintext=1`, `NODE_USE_ENV_PROXY=1`, User-Agent
`Matkakirja/1.0 (https://github.com/ravelius/Matkakirja)`). Lyhyt
faktapohja: vain ne luvut, päiväykset ja nimet, jotka päätyivät
`js/packs/maa-kategoriat.js`:n TLS-lohkoon, sekä ristiriidat. Rakenteen
sitova lähde docs/moduulit/maalehti.md.*

Aiheet (5 × 4 nostoa): **Historia, Luonto, Ruoka, Kuvataide, Musiikki.**
Minitehtävä on Kuvataide-sivulla.

**Rajaus.** Itä-Timorilla ei ole yhtään kaupunkilehteä (Dili on
laudalla, mutta `KULTTUURI_KATEGORIAT`-lohkoa sillä ei ole), joten
päällekkäisyyttä kaupunkitasolle ei ole. Karttanostot rajaavat sen
sijaan paljon: `js/packs/maastokohteet-tls.js` kattaa Cristo Rein,
Maubaran, Balibon, Lailin luolan, Baucaun, Baguian linnakkeen,
Viquequen, Nino Konis Santanan kansallispuiston, Matebianin, Ataúron ja
Timorinmeren; `js/packs/skandaalit.js` Lifaun topassit (1702–1769) ja
Manufahin kapinan (1911–1912); `js/packs/elaintakyt.js` timorinpeipon.
**Maalehti ei koske yhteenkään näistä** — siksi historiassa ei kerrota
Dilin perustamisesta 1769 eikä topasseista, luonto-osiossa ei ole
Ataúroa, Matebiania eikä kansallispuiston lintuja (keltatöyhtökakadu,
timorinviherkyyhky), ja santelipuu käsitellään kasvina eikä
kauppahistoriana. **Tatamailau on lehden oma aihe juuri siksi**, että se
pudotettiin karttamerkeistä liian lähellä Dili-laattaa olevana
(maastokohteet-tls.js:n otsikkokommentti).

**Herkät aiheet.** Vuoden 1975 jälkeisestä miehityksestä,
itsenäistymisprosessista ja nykypolitiikasta ei kirjoiteta lainkaan
(M3:n Myanmar-linja). Historia päättyy siirtomaakauden rajanvetoon
(1859–1916) ja kielivalintaan. Kahvinostosta on jätetty pois lähteen
maininta miehityksen aikaisesta tuotannon romahduksesta;
tais-nostoista on jätetty pois Santa Cruzin muistokangas ja vuoden 1999
väkivaltaisuudet, jotka en-Wikipedian "Tais"-artikkeli mainitsee.

## 1. Historia

- **Ti-wu ja saaren nimi** (en-Wikipedia "Timor", osiot "History" ja
  johdanto; "Timor-Leste", osiot "Name" ja "Prehistory and Classical
  era"): vanhin tunnettu maininta on **1200-luvun kiinalainen Zhu Fan
  Zhi**, jossa saari on **Ti-wu** ja se tunnetaan **santelipuustaan**.
  **1300-luvun jaavalainen Nagarakretagama, canto 14**, luettelee
  **Timurin** Majapahitin valtapiiriin. Timor liitettiin **1300-luvulla**
  kaakkoisaasialaisiin, kiinalaisiin ja intialaisiin kauppaverkkoihin ja
  vei **santelipuuta, hunajaa ja vahaa**. Nimi on muunnos malaijin
  sanasta **timur, itä**, koska saari on Pienten Sundasaarten itäisin.
  Portugalinkielinen **Timor-Leste on siis tautologia, "Itä-itä"**;
  tetumiksi **Timór Lorosa'e**, kirjaimellisesti "missä aurinko nousee".
- **Liurai ja rai nain** (en-Wikipedia "Timor-Leste", osio "Prehistory
  and Classical era"): saarella oli tapaoikeuden hallitsema verkosto
  pieniä valtioita. Pienin yksikkö oli **yhden pyhän talon ympärille
  kokoontuva yhteisö**, näistä muodostuivat **sucot** ja niistä
  **kuningaskunnat**, joita johti **liurai**. Valta oli **kahdella
  henkilöllä**: liuraille kuului maallinen ja **rai nainille**
  hengellinen puoli, ja jälkimmäinen liittyi kuningaskunnan
  tärkeimpään pyhään taloon. Liittosuhteet vaihtuivat, mutta moni
  kuningaskunta säilyi **1500-luvun ensimmäisistä eurooppalaisista
  kuvauksista Portugalin vallan loppuun**.
- **Oecussen eksklaavi** (en-Wikipedia "Oecusse", osiot "Overview",
  "Toponymy" ja "History"): **Lissabonin sopimus 1859** jakoi saaren —
  länsi Alankomaille (istuin Kupang), itä Portugalille (istuin Dili) —
  ja jätti **Oecussen ja Noimutin** enklaaveiksi hollantilaisen alueen
  sisään. Pinta-ala **813,6 km²**; maaraja **noin 300 km**, rannikko
  **noin 50 km**; muu maa on **58 km** itään (maanteitse **yli 70 km**).
  Nimi tulee baikenon (uab meton) sanoista **oe** (vesi) ja **kussi**,
  joka yhdistetään perinteiseen saviruukkuun — "vesiruukku".
  *(RISTIRIITA LÄHTEISSÄ, ks. alla: rajan lopullisen vahvistuksen vuosi
  on eri artikkeleissa 1912, 1914 ja 1916. Lehteen on kirjoitettu
  "Haagissa vasta puoli vuosisataa myöhemmin" ilman vuosilukua.)*
- **Kielet** (en-Wikipedia "Timor-Leste", osiot "Language" ja
  "Education"): viralliset kielet **portugali ja tetum**; Itä-Timor on
  **Aasian ainoa suvereeni valtio, jossa portugali on virallinen**.
  Perustuslaki nimeää **englannin ja indonesian työkieliksi**.
  Alkuperäiskieliä on **enintään 19 ja murteita jopa 30**, kahdesta
  kielikunnasta: **austronesialaiset** (tetum, mambai, tokodede,
  baikeno, kemak) ja **papualaiset** (bunak, makasae, fataluku).
  Vuoden **2015 laskennassa** yleisin äidinkieli oli **Tetum Prasa
  30,6 %**, sitten **mambai 16,6 %**, makasae 10,5 %. Portugalinkielisiä
  alakouluja oli **2001 8,4 %** ja **2005 81,6 %** (yläkoulut 6,8 % →
  46,3 %). *(Artikkelin johdanto sanoo "30 indigenous languages";
  Language-osio "up to 19 indigenous languages with up to 30 dialects".
  Lehteen on kirjoitettu osion tarkempi muotoilu.)*

## 2. Luonto

- **Tatamailau** (en-Wikipedia "Tatamailau", johdanto sekä osiot
  "Environment", "Access" ja "Geology"): **2 963 m**, maan ja koko
  Timorin saaren korkein kohta, **noin 70 km Dilistä etelään** Ainaron
  kunnassa. Nimi on **mambaita ja tarkoittaa "kaikkien isoisää"**;
  **Ramelau** on massiivin nimi. **1900-luvulla sitä pidettiin
  Portugalin korkeimpana vuorena**, koska emämaan korkein huippu on
  matalampi. Huipulla **kolmimetrinen Neitsyt Marian patsas**, valettu
  **Italiassa**, pystytetty **1997**; vuosittainen pyhiinvaellus
  **Marian ilmestyspäivänä 25. maaliskuuta**. Nousu **Hato Builicosta
  neljä tuntia**, **Aimetasta kuusi**; nousua **noin 910 m**. **Huippu
  voi olla pakkasella kuivalla kaudella.** 1980-luvun alussa vuori oli
  vanhan vuoristometsän peitossa ja BirdLifen tärkeä lintualue; nyt
  puustoa on vain harvoja laikkuja, alarinteet ovat ruohoa ja
  ylärinteillä kasvaa eukalyptusvesakkoa.
- **Geologia** (en-Wikipedia "Timor", osiot "Geography" ja "Geology";
  "Tatamailau", osio "Geology"; "Timor-Leste", osio "Geography"): Timor
  on **Bandan kaaren etuosa (forearc)**, joka syntyy **Australian
  mannerlaatan reunan törmätessä** kaareen — saaren kivet ovat
  **Australian mannerreunaa kaaren päälle kaavittuna**, ja **aktiivinen
  tulivuorikaari jää pohjoiseen** (Flores). Ramelaun huippu on
  **permikautista Maubissen muodostumaa**, saaren vanhimpia yksikköjä,
  ja se lepää **triaskautisen Aitutun kalkkikiven päällä**:
  duplex-työntö nosti vanhan kerroksen päällimmäiseksi ja siten
  korkeimmalle. **Lähes puolella maan pinta-alasta rinteen kaltevuus on
  vähintään 40 %.**
- **Wallacea ja sukupuuttoon kuolleet jättiläiset** (en-Wikipedia
  "Timor", osio "Flora and fauna"): Timor kuuluu **Timorin ja Wetarin
  lehtimetsien ekoregioniin** ja **Wallacean läntiseen osaan**, jossa
  **aasialaiset lajit ovat enemmistönä**. **Pleistoseenikaudella**
  saarella eli **komodonvaraanin kaltaisia jättiläisvaraaneja** sekä
  **kääpiöstegodoneja**, norsujen sukulaisia — kuten Floresilla,
  Sumballa ja Sulawesilla. Kotoperäisiä nykylajeja ovat mm. **Timorin
  päästäinen ja Timorin rotta**; **kuskus** on australialaisperäinen
  pussieläin, **ilmeisesti tuotu**. **Lintulajeja 250, niistä 24
  kotoperäisiä.** Puut ovat **kokonaan tai osittain lehtensä
  pudottavia** kuivan kauden ajaksi. *(Uhanalaisten lintujen luettelo —
  keltatöyhtökakadu, timorinviherkyyhky — on jätetty pois: ne ovat
  kansallispuiston karttakortilla.)*
- **Valkosantelipuu** (en-Wikipedia "Santalum album", johdanto sekä
  osiot "Taxonomy", "Uses" ja "Cultivation"): **4–9 m korkea
  ainavihanta**. **Loispuu**, jonka juurissa on **imujuuria
  (haustoria)**; se ottaa isännältä **fosforia, typpeä ja kaliumia sekä
  varjoa** ilman suurta vahinkoa isännälle. **Isäntälajeja jopa 300.**
  **Hedelmiä kolmen vuoden, itämiskykyisiä siemeniä viiden vuoden
  ikäisenä**, ja **linnut levittävät siemenet**. **Vain sydänpuu
  tuoksuu** (kellanruskea, öljyinen, kestävä, veistoon sopiva);
  **pintapuu on hajuton** ja valkoinen tai keltainen. Puu on ollut
  **lahoamattomana pidetty rakennusmateriaali**. **Timor kuuluu lajin
  alkuperäiseen levinneisyysalueeseen** (Indonesian osuus mainitaan
  osiossa "Cultivation").

## 3. Ruoka

- **Kahvi** (en-Wikipedia "Cuisine of Timor-Leste", osio "Coffee";
  "Timor-Leste", osio "Economy"): kahvi on **90 % kaikesta muusta kuin
  fossiilisen polttoaineen viennistä 2013–2019**, ja koko tämä vienti on
  **noin 20 milj. USD vuodessa**. Kahvia on kasvatettu **vuosisatoja**,
  ja **1800-luvun lopulla se oli puolet siirtomaan kaupasta**.
  **46 000 kahvitilaa** työllistää **viidesosan väestöstä**, ja
  **46 % kotitalouksista** saa tulonsa yksinomaan kahvista; arvo
  **10 milj. USD vuodessa**. Tarhoja on hoidettu vähän, ja siksi ne ovat
  **torjunta-aineettomia ja lannoittamattomia** — luomukahvin ostajille
  valtti. Nimitys **"maatalouden kultainen prinssi"**. *(Lähteen
  maininta miehityksen aikaisesta romahduksesta on jätetty pois.)*
- **Batar daan ja perusruoat** (en-Wikipedia "Cuisine of Timor-Leste",
  johdanto ja osio "East Timorese dishes"; "Timor-Leste", osio
  "Economy"): **batar daan = maissi, mungpavut ja kurpitsa**. **Riisi**
  on laajimmin viljelty; muut perusruoat **bataatti, maissi, maniokki ja
  taro**, täydentäjinä **pavut, kaali, pinaatti, sipuli ja lehmänpapu**.
  Kotitaloudet kasvattavat itse **siipikarjaa, sikoja ja vuohia**.
  **66 % perheistä** saa osan ruoastaan omasta tuotannosta, mutta maa
  **ei tuota tarpeeksi ruokaa itselleen vaan tuo osan**.
- **Ikan sabuko ja budu** (en-Wikipedia "Cuisine of Timor-Leste", osio
  "East Timorese dishes"; "Timor-Leste", osio "Economy"): **ikan
  sabuko** = **kuninkaanmakrilli tamarindimarinadissa basilikan ja
  paprikan kanssa**; **budu** = **tomaatti, minttu, lime ja sipuli**.
  **Kalastus on maatalouden jälkeen toiseksi tärkein elinkeino**, ja
  **94 % kotimaisesta saaliista tulee merestä**. Muita ruokia
  **fuuntaul tong ja gailong** (punaisia papuja, naudanlihaa, salaattia,
  kananmunaa, riisiä) ja **tapai**, käytetty riisi, joka on **makea,
  hapan ja hitusen alkoholinen**.
- **Portugalilainen perintö** (en-Wikipedia "Cuisine of Timor-Leste",
  johdanto sekä osiot "East Timorese dishes" ja "Desserts"):
  **feijoada** (possu, cannellini-pavut, chorizo), **caril** (mieto
  kanacurry, jonka pohja on paahdetusta paprikasta ja kookoksesta
  tehty tahna), **pastel de nata** ja **bibingka** (grillattu
  kerroksellinen kookoskakku). Makuja on tullut **muistakin Portugalin
  siirtomaista**, koska **niistä tuotiin sotilaita Timorille**.

## 4. Kuvataide

- **Tais vaihdon välineenä** (en-Wikipedia "Tais", johdanto ja osio
  "History and social role"): **vaihdon väline**, jolla on maksettu
  **karjasta ja muista arvoesineistä**. Seremoniassa taisin kanssa
  käytetään **sulkia, korallia sekä kultaa ja/tai hopeaa**. **Katolinen
  kirkko** on ottanut taisin omiin menoihinsa. **Kutominen on
  yksinomaan naisten työtä**, ja tekniikat siirtyvät **suullisena
  perintönä**. **Kauneimpiin kankaisiin kääritään vainaja hautaan**, ja
  tais kuuluu **avioliittojärjestelyihin ja sukusiteisiin**.
  Vastasyntyneestä käytetään ilmausta **"tuo langan ja puolan"**.
- **Kuviot ja alueet** (en-Wikipedia "Tais", osiot "Designs" ja
  "Regional variations"; "Timor-Leste", osio "Culture"): kuvasto
  vaihtelee alueittain ja kertoo paikasta tai tapahtumista;
  **eläinaiheista tavallisin on krokotiili, johon saaren syntytaru
  perustuu**. Geometrinen kuvio on **kaif**. **Tais mane** = miesten
  vyötärölle kiedottava, tupsuilla viimeistelty kangas; **tais feto** =
  naisten putkimekko; **selendang** = kaulahuivi. Alueet: **Oecusse**
  portugalilaisvaikutteinen, kukka- ja uskonnollisia aiheita, vaimeat
  musta, oranssi ja keltainen; **Dili** kirkkaat värit ja umpipaneelit
  kaupallisuuden takia; **Ermera** mustavalkoinen, perinteisten
  päällikkösukujen mukaan; **Manufahi** lisko ja sika. Artikkeli sanoo
  **kolmetoista distriktiä** (nykyisin kuntaa).
- **Valmistus** (en-Wikipedia "Tais", osiot "Production" ja "History
  and social role"): **puuvillaa**, tehdään **kuivalla kaudella lähes
  kokonaan käsin**. Puuvilla on **Portugalin siirtomaakauden perua**;
  nykyään mukana **raionia, akryyliä ja polyesteriä**. **Yhteen taisiin
  menee päivistä vuoteen.** Väriaineet kasveista: **taun, kinur, teka**
  sekä **mangonkuori, perunanlehti, kaktuksenkukka ja kurkuma**;
  taitavaa sekoittajaa **verrataan alkemistiin**. **Punainen on
  yleisin**, koska se liitetään **pitkään ikään ja rohkeuteen** ja on
  lipun pohjaväri. Yleisin väline on **vyökangaspuu (back-strap loom)**,
  jonka **hihnan paine tekee työstä kivuliasta**. **1970-luvulla
  kankaisiin alettiin kutoa kirjoitusta**, aluksi indonesiaksi;
  **1999 jälkeen** myös englanniksi, portugaliksi ja tetumiksi.
- **Uma lulik** (en-Wikipedia "Timor-Leste", osio "Culture"):
  **pyhä talo** on yhteisön keskus ja sen tunnus. **Rakennustyyli
  vaihtelee maan osasta toiseen.** Talo on **käsitteenä laajempi kuin
  rakennus**: se ulottuu ympäröivään yhteisöön, ja **sukulaisuus
  lasketaan talojen sisällä ja välillä**. Ajatus on laajennettu koko
  maahan niin, että **parlamenttia on kuvattu kansalliseksi pyhäksi
  taloksi**. Taustalla on **lulik, pyhyys**; pyhää voi olla myös esine,
  esimerkiksi **suvussa periytynyt portugalilainen lippu**. Taidemotiivit
  ovat läpi maan **suuria eläimiä ja tiettyjä geometrisia kuvioita**, ja
  osa taiteesta on **sukupuolittain jakautunutta** (tais on naisten).

## 5. Musiikki

- **Likurai ja tuontivaikutteet** (en-Wikipedia "Music of Timor-Leste",
  johdanto): **laajimmalle levinnyt kansanmusiikin muoto oli likurai**,
  **naisten tanssi, jolla sodasta palaavat miehet otettiin vastaan**.
  Tanssijoilla oli **pieni rumpu**, ja kulkueissa kannettiin toisinaan
  **vihollisen päitä**; **nykyversio on naisten kosiskelutanssi**.
  Portugali ja Indonesia toivat saarelle **gamelanin ja fadon**.
  Siirtolaisyhteisöt **Australiassa ja Portugalissa** ovat vieneet
  timorilaista kansanmusiikkia maailmalle, ja **Portugalin
  pakolaisleireillä** se sekoittui **Angolan ja Mosambikin**
  tyyleihin.
- **Babadok ja dadir** (en-Wikipedia "Music of Timor-Leste", osio
  "Instruments"): **babadok** on **pieni kartiomainen puurumpu**,
  **30–50 cm pitkä**, **läpimitta noin 15 cm**, ja sitä lyödään
  **vuorotellen molemmilla käsillä**. **Dadir** (dadil, gong, gon) on
  **noin 25 cm läpimittainen metallirengas**, jota lyödään
  **puukapulalla**; sillä on **määrittelemätön sävelkorkeus eikä sitä
  voi virittää**. **Molempia soittavat naiset.** Ohjelmistossa myös
  **violat ja sopraanohuilut**, länsimaisia tulokkaita. **Kitara** on
  **siirtomaavallan tuoma**, mutta saarella on **omia
  kielisoittimia**.
- **Neljä lajia** (en-Wikipedia "Music of Timor-Leste", johdanto ja osio
  "Instruments"): ohjelmisto jakautuu **neljään selvärajaiseen lajiin:
  tebe, tebedai, dansa ja cansaun**. Kaikki nojaavat **suulliseen
  perinteeseen** ja ovat siirtyneet **sukupolvelta toiselle**.
  **Musiikki ja tanssi ovat perinteisissä lajeissa erottamattomat**, ja
  **soittimet, puvut ja korut** kuuluvat samaan esitykseen. **Laulun
  sanat tetumiksi tai portugaliksi**, maan kahdella virallisella
  kielellä. Ulkomaisia vaikutteita ovat myös **rock, hiphop ja
  reggae**.
- **Puku ja korut** (en-Wikipedia "Music of Timor-Leste", osio
  "Instruments"): miehet kietovat **tais manen** vyötärölle, naiset
  asettavat **tais feton** kainaloiden alle. Miehen päähuivin päälle
  tulee **kaibauk**, **metallinen kuunsirppi**, jossa on pieniä kyynel-
  ja korvakoristeita; **suurin ja koristeellisin kuului liuraille**.
  Miehen asuun kuuluvat **surik** (soturin miekka) ja **belak**
  (rinnalle ripustettava metallikiekko). Naisilla kaibaukin lisäksi
  **ulum suku** (hiuskoriste), **sasuit** (pitkäpiikkinen kampa) ja
  **mortene** (kaulanauha) sekä **valkoinen liina vyötäröllä**.
  **Lokum/kelui** on metallirannerengas (miehillä olkavarressa,
  naisilla kyynärvarressa). **Kaikki esiintyvät paljain jaloin**,
  olkapäillä **salenda-huivi**.

## Ristiriidat lähteissä

1. **Rajan lopullinen vahvistus.** en-Wikipedia "Timor" (osio
   "History") sanoo, ettei rajaa **"formally resolved until 1912"**;
   "Timor-Leste" (osio "Portuguese era") sanoo, että sen vahvisti
   **Permanent Court of Arbitration 1914**; "Oecusse" (osio "History")
   sanoo, että **"the definitive border was drawn by The Hague in
   1916"**. Lehteen on kirjoitettu vain "Haagissa vasta puoli
   vuosisataa myöhemmin" — vuosilukua ei väitetä.
2. **Alkuperäiskielten määrä.** "Timor-Leste" -artikkelin johdanto
   sanoo **30 alkuperäiskieltä**, mutta saman artikkelin
   Language-osio **enintään 19 kieltä ja enintään 30 murretta**.
   Lehteen on otettu osion tarkempi muotoilu.
3. **Pinta-ala.** "Timor-Leste" -artikkelin johdanto sanoo
   **15 007 km²**, Geography-osio **14 874 km²**. Lehdessä ei käytetä
   kumpaakaan lukua.
4. **Oecussen etäisyys.** Artikkeli antaa linnuntien **58 km** ja
   maantien **yli 70 km**; lehdessä molemmat on kerrottu erikseen,
   jotta lukua ei sekoiteta toiseen.

## Uutislähde

**Tatoli** (tatoli.tl), tetum. Testattu 6.9.2026: syötteessä kymmenen
juttua; artikkelisivun ensimmäisestä `<article>`-lohkosta jäsentyy kuusi
yli 60 merkin kappaletta ja `og:image` löytyy. Osoite on **ilman
www:tä**, koska `www.tatoli.tl` vastaa 301:llä eikä worker seuraa
uudelleenohjauksia. Tatoli on **valtiollinen uutistoimisto**, ja se
valittiin vasta kun yksityiset kaatuivat artikkelisivutestiin (Timor
Post, The Dili Weekly). MyMemory kääntää tetumista suomeen
(`langpair=tet|fi` vastasi 200:lla), joten kieleksi on merkitty `tet`.
Hylätyt lähteet on lueteltu `js/packs/uutislahteet.js`:n
TLS-kommentissa.

## Tunnusluvut

MAATIEDOT-riviä ei ole, ja TLS on lisätty
`tests/maatiedot.test.mjs`:n `VIELA_ILMAN_TUNNUSLUKUJA`-listalle.
Tunnuslukuja ei tehty tässä erässä.
