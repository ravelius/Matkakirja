# Porto Alegre — faktakoostaja, uusi kaupunkilehti (Etelä-Amerikan lauta)

Lauta-id `southamerica`, kaupunki-id `portoalegre`, maa BRA, en-Wikipedia
"Porto Alegre" ellei toisin mainita. Kaikki tiedot haettu en-Wikipediasta
**24.8.2026** (`action=raw`, `NODE_USE_ENV_PROXY=1`; jokainen haettu otsikko
tarkistettu #REDIRECT-rivin ja täsmennyssivun varalta — mm. "Kaingang
people" ohjautuu artikkeliin "Kaingang", "Guarani people" artikkeliin
"Guaraní people", "Grêmio" artikkeliin "Grêmio FBPA", "Sport Club
Internacional" artikkeliin "SC Internacional" ja "Guaíba River"
artikkeliin "Guaíba (water body)"; "Mercado Público (Porto Alegre)" ei
ollut olemassa sellaisenaan, oikea otsikko haettiin hakurajapinnalla ja
löytyi nimellä "Porto Alegre Public Market", samoin "Parque Farroupilha"
löytyi nimellä "Farroupilha Park" ja Porto Alegren tuomiokirkko nimellä
"Metropolitan Cathedral of Our Lady Mother of God, Porto Alegre".
Useat haut osuivat Wikipedian API:n 429-rajoitukseen — työympäristössä
ajaa rinnakkain useita muidenkin kaupunkien faktakoostajia samaan aikaan
— odotin kasvavan viiveen (3 s → 4,8 s → …) ja yritin uudelleen
resepti-ohjeen mukaisesti, aina onnistuen. Malli ja mitat luettu
tiedostoista `docs/aasia-tyoaineisto/lehtityo-resepti.md` (SITOVA) ja
`docs/moduulit/kaupunkilehti.md`, sekä mallitiedostona
`docs/mantereet-tyoaineisto/faktapohja-christchurch.md` (rakenne
kopioitu siitä tarkasti, osiot 1–8). Luin myös
`docs/mantereet-tyoaineisto/spec-mantereet.md` (E-Amerikka-osio ja
kaikkia kolmea uutta mannerta koskevat viisi linjausta) ja
`js/packs/southamerica-questions.js` (vienti `SOUTHAMERICA_QUESTIONS`,
kohta `portoalegre`, viisi kysymystä: sijainti/talvet, mate-juoma,
Guaíba-laguuni, gaúchot, chimarrão) sekä `SOUTHAMERICA_FACTS.portoalegre`
(kolme faktaa + isoisän repliikki) — ks. osio 8 siitä, miten
päällekkäisyyksiä on vältetty.

**Tehtävän erityispiirre:** En kirjoittanut lehtitekstejä, en ladannut
kuvia enkä koskenut js/packs-tiedostoihin — kaikki alla on raaka-ainetta
kirjoittajalle ja riippumattomalle tarkistajalle.

**Sisältölinjaus (tehtävänanto + spec-mantereet.md + Raamattu pilari 3):**
isoisän matkan vuosi 1873 osuu Rio Grande do Sulin saksalais- ja
italialaissiirtolaisuuden keskelle — saksalaiset ovat asuttaneet aluetta
vuodesta 1824 (São Leopoldon siirtokunta), italialaiset vasta vuodesta
1875 alkaen (ks. osio 7, huomio 3: Porto Alegren oma pääartikkeli antaa
tästä harhaanjohtavan kuvan). Farroupilha-kapina 1835–1845 ja kaupungin
kolme piiritystä (1836, 1837–1838, 1838–1840) sekä niistä seurannut
"Uskollinen ja Urhea" -arvonimi 1841 käsitellään tapahtumina ja
vuosilukuina toteavasti. Vuoden 2024 tulvat mainitaan tapahtumana ja
luppuina — EI uhrien kärsimyksen kuvailua, EI nykypolitiikkaa (poliitikkojen
lausunnot on jätetty tästä koosteesta kokonaan pois, vaikka lähteet
niitä siteeraisivatkin). Kaingang ja mbyá-guaraní kuvataan nykyisinä,
elävinä kansoina omilla nimillään; charque-kuivalihatalouden orjatyö
(Rio Grande do Sulin mustan väestön osuus 50 % v. 1822:sta 5,2 %:iin v.
2005) käsitellään toteavasti lukuineen. Ei nykysotaa, ei nykypolitiikkaa
(mm. World Social Forum, osallistuva budjetointi ja sotilasdiktatuuri
1964–1985 on jätetty tästä koosteesta pois kokonaan).

---

## 1. Sivuehdotukset

Tehtävänanto salli 1–3 teemasivua. Käytin kaksi: aineisto kantoi kaksi
selvästi erillistä, päällekkäisyydetöntä teemaa (kapina/siirtolaisuus-
historia sekä Guaíba-järvi/alkuperäiskansat/luonto), ja kolmas teema
(mate/gaúcho-kulttuuri) on jo niin vahvasti katettu olemassa olevissa
`SOUTHAMERICA_QUESTIONS`- ja `SOUTHAMERICA_FACTS`-riveissä, ettei sille
löytynyt riittävästi PÄÄLLEKKÄISYYDETÖNTÄ uutta ydinsisältöä omaksi
sivukseen — sen sijaan mate/gaúcho-aihe jatkuu K2-nostossa (jalkapallo)
ja L1-nostossa (Redenção-puiston sunnuntai-chimarrão) sekä matkaoppaan
jaksoissa.

### Sivu A — id `kaupunki`, nimi "Porto Alegre"

**Johdanto (230 merkkiä):**

> "Iloinen satama" nousi 1752 asutetusta atsoorilaissiirtokunnasta
> osavaltion pääkaupungiksi. Vuoden 1872 väestönlaskennassa, juuri
> ennen isoisän matkaa, asukkaita oli jo 43 998 — ja kivinen
> markkinahalli vasta nelisen vuotta vanha.

### Sivu B — teemasivu, ehdotettu id `historia`, nimi "Kapina, siirtolaiset ja charque"

**Perustelu valinnalle:** Farroupilha-kapina on tehtävänannon mukaan
"kaupungin identiteetin ydin", ja saksalais-/italialaissiirtolaisuus on
lehden 1873-ankkuri — nämä kaksi juonnetta kietoutuvat myös suoraan
toisiinsa charque-talouden kautta (kapinan taloudellinen syy oli juuri
kuivalihan hintakilpailu, ja rauhansopimus päätti sen tullilla).
Yhtenäinen sivu kantaa koko kaaren atsoorilaisperustamisesta kapinan
kautta siirtolaisaaltoihin ja orjatyöhön saakka.

**Johdanto (233 merkkiä):**

> Kaupunki jonka kapinalliset valtasivat kerran mutta eivät koskaan
> uudelleen, sai kestettyään sen jälkeen kolme piiritystä keisarilta
> arvonimen "Uskollinen ja Urhea". Sama vuosikymmen toi ensimmäiset
> saksalaissiirtolaiset osavaltioon.

### Sivu C — teemasivu, ehdotettu id `luonto`, nimi "Guaíba, puistot ja kansat"

**Perustelu valinnalle:** Vakioaihe `luonto` sopii suoraan tehtävänannon
nimeämiin ydinaiheisiin (Guaíba-järven auringonlasku, Parque
Farroupilha/Redenção) ja tuo samalla kaingang- ja mbyá-guaraní-kansat
esiin osana kaupungin elävää nykyisyyttä (pilari 3) sekä vuoden 2024
tulvat luonnonilmiönä ja sen jälkeisenä nykytilana — kaikki neljä nostoa
kietoutuvat Guaíba-järven ja sen rantojen ympärille.

**Johdanto (197 merkkiä):**

> Neljäkymmentä kukkulaa ja laaja Guaíba-järvi muovaavat kaupunkia yhä.
> Kaingang ja mbyá-guaraní asuivat rannoilla kauan ennen atsoorilaisia,
> ja vuonna 2024 järvi näytti, kuinka äkisti se voi nousta.

---

## 2. Kaksitoista nostoehdotusta (4 × 3 sivua)

### Sivu `kaupunki` — 4 nostoa

**Nosto K1 — "Halli joka selvisi neljästä tulipalosta" (602 merkkiä)**

> Torikauppiaat saivat kivisen kotinsa, kun Mercado Público avattiin
> keskustassa 3. lokakuuta 1869 – rakennustyö oli alkanut viisi vuotta
> aiemmin, elokuussa 1864, arkkitehti Frederico Heydtmannin
> suunnitelmalla, jota muokattiin ja suurennettiin matkan varrella.
> Isoisän saapuessa kaupunkiin 1873 halli oli siis jo auki nelisen
> vuotta. Rakennus on sittemmin selvinnyt tulipalosta 1912, suurtulvasta
> 1941 ja tulipaloista 1976, 1979 ja 2013 – viimeisimmässä paloi noin
> kolmannes rakenteista. Yhä toimivat 101 vuotta täyttänyt Bar Naval ja
> jäätelökioski nimeltä Banca 40, ja hallissa on nykyään 109 liikettä.

Faktat ja lähteet:
- Markkinahallin rakentaminen alkoi 29.8.1864 arkkitehti Frederico
  Heydtmannin suunnitelmalla, jota muutettiin ja suurennettiin
  huomattavasti; avajaiset olivat 3.10.1869. — en-Wikipedia "Porto
  Alegre Public Market"
- Vuoden 1872 väestönlaskennassa Porto Alegressa oli 43 998 asukasta
  — lähin saatavilla oleva väestöluku isoisän 1873-matkan ajalta. —
  en-Wikipedia "Timeline of Porto Alegre"
- Rakennus koki tulipalon 1912 (tuhosi sisäpihan kojut), sai toisen
  kerroksen 1913, kärsi suurtulvasta 1941 sekä tulipaloista 1976, 1979
  ja 2013 (6.7.2013, noin 30 % rakenteista paloi). — en-Wikipedia
  "Porto Alegre Public Market"
- Hallissa on noin 109 liikettä, mukaan lukien 101-vuotias Bar Naval
  -baari ja Banca 40 -jäätelökioski; 1990-luvun restaurointi maksoi
  9 miljoonaa realia. — en-Wikipedia "Porto Alegre Public Market"

**Nosto K2 — "Kaksi klubia, kaksi Porto Alegrea" (636 merkkiä)**

> Kun Brasilian vanhin jalkapallojoukkue Sport Club Rio Grande pelasi
> näytösottelun Porto Alegressa 7. syyskuuta 1903, pallo puhkesi kesken
> pelin – ja kaupungin ainoa pallonomistaja, liikemies Cândido Dias,
> lainasi omansa. Kahdeksan päivää myöhemmin hän perusti 32 muun kanssa,
> valtaosin saksalaissiirtolaisyhteisöstä, Grêmion. Kuusi vuotta
> myöhemmin Poppen veljekset perustivat Internacionalin selvästi
> vastakkaisella periaatteella: demokraattinen instituutio ilman
> ennakkoluuloja. "Grenal"-ottelu on siitä lähtien yksi maailman
> suurimmista paikallisderbeistä, ja 1983 Grêmio voitti maailmanmestaruus-
> ottelun Hampurin SV:tä vastaan 2–1.

Faktat ja lähteet:
- Sport Club Rio Grande, Brasilian vanhin jalkapalloseura, pelasi
  näytösottelun Porto Alegressa 7.9.1903; Cândido Dias lainasi
  puhjenneen pallon tilalle omansa, koska oli kaupungin ainoa
  jalkapallon omistaja, ja keskusteli sen jälkeen paikallisten kanssa
  seuran perustamisesta. — en-Wikipedia "Grêmio FBPA"
- Grêmio Foot-Ball Porto Alegrense perustettiin 15.9.1903 32 miehen
  toimesta Cândido Dias da Silvan johdolla; suurin osa perustajista
  kuului kaupungin saksalaissiirtolaisyhteisöön, ensimmäinen presidentti
  oli Carlos Luiz Bohrer. — en-Wikipedia "Grêmio FBPA"
- Sport Club Internacional perustettiin 4.4.1909 Poppen veljesten
  toimesta "demokraattiseksi instituutioksi ilman ennakkoluuloja";
  värit punainen-valkoinen, kannattajat "Colorados". — en-Wikipedia
  "SC Internacional"
- Grêmio–Internacional-ottelu "Grenal" on FourFourTwo-lehden listalla
  maailman kahdeksanneksi suurin paikallisderbi; Grêmio voitti
  maailmanmestaruusottelun (Intercontinental Cup) 1983 Hampurin SV:tä
  vastaan 2–1. — en-Wikipedia "SC Internacional" / "Grêmio FBPA"

**Nosto K3 — "Hiilivoimala josta tuli auringonlaskupaikka" (563 merkkiä)**

> Nimestään huolimatta Usina do Gasômetro ei koskaan tuottanut kaasua –
> se oli hiilikäyttöinen voimala, joka sai nimensä läheisen kaasutehtaan
> mukaan nimetystä kaupunginosasta. Amerikkalaisomisteinen yhtiö käytti
> sitä sähköntuotantoon vuodesta 1928 vuoteen 1974, minkä jälkeen
> kaupunki aikoi purkaa sen tien tieltä. Kansalaisjärjestöjen painostus
> pelasti rakennuksen, ja restauroinnin jälkeen 1991 siitä tuli
> kulttuurikeskus. Nykyään paikalliset kokoontuvat sen edustalle
> aurinkoisina sunnuntaina Guaíban rannalle – yhtä lailla kuin
> Redenção-puiston kirpputorille.

Faktat ja lähteet:
- Usina do Gasômetro vihittiin käyttöön 11.11.1928 amerikkalaisen
  Electric Bond & Share -yhtiön tytäryhtiön Companhia Brasil de Força
  Elétrican päävoimalana; se oli hiilikäyttöinen huolimatta nimestään,
  joka viittaa lähialueen ("Volta do Gasômetro") nimeen. — en-Wikipedia
  "Usina do Gasômetro"
- Voimala toimi sähköntuottajana vuoteen 1974, jolloin se
  deaktivoitiin; kaupunki aikoi purkaa sen kehätien jatkeeksi, mutta
  kansalaisjärjestöjen säilytyskampanja pelasti rakennuksen. —
  en-Wikipedia "Usina do Gasômetro"
- Eletrobras luovutti maa-alueen kaupungille 1982; rakennus suojeltiin
  kaupungin toimesta 1982 ja osavaltion toimesta 1983, restauroitiin
  1988 ja avattiin kulttuurikeskuksena 1991. — en-Wikipedia "Usina do
  Gasômetro"
- "Aurinkoiset sunnuntait Gasômetrolla tai Brique da Redençãon
  kirpputorilla" mainitaan Porto Alegren kaupunkihistoriassa
  esimerkkinä nykyisistä yhteisöllisistä perinteistä. — en-Wikipedia
  "History of Porto Alegre"

**Nosto K4 — "Museo jonka portugalilainen mestari rakensi järven rantaan" (496 merkkiä)**

> Kun maalari Iberê Camargo kuoli 1994, hänen nimeään kantava säätiö
> perustettiin jo vuotta myöhemmin – aluksi taiteilijan entiseen kotiin.
> Vuonna 2008 säätiö sai oman rakennuksen Guaíba-järven rannalle:
> Pritzker-palkitun portugalilaisarkkitehti Álvaro Sizan suunnitteleman
> museon, jonka valkoiset kaarevat rampit kiertyvät toistensa lomaan.
> Säätiön kunniapresidenttinä toimii taiteilijan leski Maria Coussirat
> Camargo, ja museo on nykyään yksi kaupungin tunnetuimmista
> nykytaiteen kiintopisteistä.

Faktat ja lähteet:
- Iberê Camargo Foundation perustettiin 1995, vuosi maalari Iberê
  Camargon (1914–1994) kuoleman jälkeen; se toimi aluksi taiteilijan
  entisessä kodissa. — en-Wikipedia "Iberê Camargo Foundation"
- Säätiön nykyinen päärakennus, Guaíba-järven rannalla, suunnitteli
  Pritzker-palkittu portugalilaisarkkitehti Álvaro Siza; se avattiin
  toukokuussa 2008. — en-Wikipedia "Iberê Camargo Foundation"
- Säätiön kunniapresidenttinä toimii taiteilijan leski Maria Coussirat
  Camargo. — en-Wikipedia "Iberê Camargo Foundation"

### Teemasivu `historia` — 4 nostoa

**Nosto H1 — "Satakuusikymmentä paria jotka perustivat kaupungin" (485 merkkiä)**

> Madridin sopimus 1750 vaihtoi alueita Portugalin ja Espanjan kruunujen
> välillä, ja korvaukseksi menetetystä Sacramenton siirtokunnasta
> Portugali toi 60 atsoorilaisparia perustamaan uusia siirtokuntia
> Rio Grande do Sulin koilliskulmaan. Maanjako venyi vuosia, ja
> atsoorilaiset asettuivat lopulta pysyvästi Porto de Viamãoon –
> kaupungin ensimmäiseen nimeen. Virallinen perustamispäivä on 26.
> maaliskuuta 1772, ja vuotta myöhemmin, 24. heinäkuuta 1773, kylästä
> tuli maakunnan pääkaupunki.

Faktat ja lähteet:
- Vuoden 1750 Madridin sopimuksen (13.1.1750) mukaisesti Portugali toi
  60 atsoorilaisparia perustamaan siirtokuntia Rio Grande do Sulin
  koillisosaan, joka luovutettiin Portugalille vastineeksi Sacramenton
  siirtokunnasta Platajoen rannalla; maanjako kesti vuosia, ja
  atsoorilaiset asettuivat pysyvästi Porto de Viamãoon, kaupungin
  ensimmäiseen nimeen. — en-Wikipedia "Porto Alegre"
- Kaupungin virallinen perustamispäivä on 26.3.1772 (Manuel Sepúlveda
  perusti Freguesia de São Francisco do Porto dos Casaisin, nimettiin
  vuotta myöhemmin uudelleen Nossa Senhora da Madre de Deus de Porto
  Alegreksi). — en-Wikipedia "Porto Alegre"
- 24.7.1773 Porto Alegresta tuli maakunnan pääkaupunki, kun Manuel
  Sepúlveda (peitenimellä José Marcelino de Figueiredo) aloitti
  hallintonsa virallisesti. — en-Wikipedia "Porto Alegre"

**Nosto H2 — "Kaupunki joka kesti kolme piiritystä" (595 merkkiä)**

> Kenraali Bento Gonçalves valtasi Porto Alegren 20. syyskuuta 1835 ja
> käynnisti näin Farroupilha-kapinan. Keisarikunnan joukot valtasivat
> kaupungin takaisin 15. kesäkuuta 1836 – mutta kapinalliset eivät
> luovuttaneet: he piirittivät kaupunkia kolmesti (1836, 1837–1838 ja
> 1838–1840) onnistumatta kertaakaan valtaamaan sitä uudelleen.
> Uskollisuudestaan kaupunki sai 19. lokakuuta 1841 keisari Pedro II:lta
> arvonimen "Uskollinen ja Urhea" (Leal e Valorosa) – se lukee yhä
> kaupungin vaakunassa. Sota päättyi 1. maaliskuuta 1845 Vihreän
> Ponchon sopimukseen, joka toi kapinallisille täyden armahduksen.

Faktat ja lähteet:
- Kenraali Bento Gonçalves valtasi Porto Alegren 20.9.1835, minkä
  jälkeen kapinalliset ("farrapos") valitsivat uudeksi presidentiksi
  Marciano José Pereira Ribeirón; maakunnan presidentti pakeni Rio
  Grandeen. — en-Wikipedia "Ragamuffin War"
- Porto Alegre oli kapinallisten hallinnassa 15.6.1836 asti, jolloin
  keisarikunnan majuri Manoel Marques de Souza (myöh. Porto Alegren
  kreivi) valtasi kaupungin takaisin. Kaupunki kesti tämän jälkeen
  kolme piiritystä (yksi 1836, toinen 1837–alkuvuosi 1838, kolmas
  kesäkuu 1838 – joulukuu 1840) menettämättä sitä enää kertaakaan. —
  en-Wikipedia "History of Porto Alegre" / "Timeline of Porto Alegre"
- Uskollisuudestaan kaupunki sai keisari Pedro II:lta arvonimen
  "Uskollinen ja Urhea" (Leal e Valorosa) 19.10.1841; nimi on yhä
  kaupungin vaakunassa ja tunnuslauseessa. — en-Wikipedia "History of
  Porto Alegre" / "Porto Alegre" (infobox: motto)
- Sota päättyi Vihreän Ponchon sopimukseen (Tratado de Poncho Verde)
  1.3.1845 Dom Pedritossa: täysi armahdus, kapinallisten liittäminen
  keisarilliseen armeijaan, Riograndensen tasavallan velkojen maksu ja
  25 %:n tulli tuontikuivalihalle. — en-Wikipedia "Ragamuffin War"

**Nosto H3 — "Kaksi siirtolaisaaltoa, viisikymmentä vuotta erillään" (641 merkkiä)**

> Keisari Pedro I käski maaliskuussa 1824 perustaa São Leopoldon
> siirtokunnan turvaamaan Rio Grande do Sulin rajaseutua – 25. heinäkuuta
> samana vuonna ensimmäiset 39 saksalaissiirtolaista asettuivat Rio dos
> Sinosin rannalle. Italialaiset odottivat vuoroaan puoli vuosisataa:
> ensimmäiset italialaissiirtolaiset saapuivat osavaltioon vasta 1875,
> valtaosin köyhiä talonpoikia Trentinosta ja Venetosta, jotka
> asettuivat viininviljelyyn Serra Gaúchan vuoristoon. Vuoteen 1914
> mennessä heitä oli tullut 100 000. Isoisän matkan vuosi 1873 osuu siis
> juuri saksalaisasutuksen vakiintuneeseen vaiheeseen – italialaisaalto
> oli vielä kahden vuoden päässä.

Faktat ja lähteet:
- Keisari Pedro I käski maaliskuussa 1824 Rio Grande do Sulin
  maakunnan presidenttiä perustamaan São Leopoldon siirtokunnan;
  ensimmäiset 39 saksalaissiirtolaista asettuivat Rio dos Sinosin
  eteläiselle rannalle 25.7.1824. — en-Wikipedia "German Brazilians"
- Italialaissiirtolaiset alkoivat saapua Rio Grande do Suliin 1875,
  valtaosin köyhiä talonpoikia Trentinosta ja Venetosta; siirtolaisuus
  jatkui vuoteen 1914 asti, ja alueelle asettui yhteensä 100 000
  italialaista, enimmäkseen viininviljelyyn Serra Gaúchan vuoristoon.
  — en-Wikipedia "Rio Grande do Sul"
- Vuoden 1940 väestönlaskennassa 393 934 osavaltion asukasta (11,86 %)
  ilmoitti saksan ensikielekseen ja 295 995 (8,91 %) italian. —
  en-Wikipedia "German Brazilians"
- **HUOM (ks. osio 7, huomio 3):** Porto Alegren pääartikkeli itsessään
  sanoo harhaanjohtavasti, että "vuonna 1824 alkoi saapua siirtolaisia
  kaikkialta maailmasta, erityisesti saksalaisia, italialaisia,..." —
  tarkemmat erikoisartikkelit antavat italialaisille selvästi
  myöhemmän, 1875 alkavan vuoden.

**Nosto H4 — "Kuivaliha joka ruokki orjia ja sytytti kapinan" (640 merkkiä)**

> Rio Grande do Sulin talous nojasi 1800-luvulla charqueen – suolattuun,
> kuivattuun naudanlihaan, jota valmistettiin orjatyöllä Pelotasin
> seudulla ja jota käytettiin halpana ruokana orjille muualla
> Brasiliassa. Mustien osuus osavaltion väestöstä oli 50 % vielä 1822,
> ja suurin osa heistä oli tuotu Angolasta. Kun Uruguayn ja Argentiinan
> vapaan työvoiman tuottama halvempi kuivaliha alkoi syrjäyttää
> gaúcho-tuottajia 1830-luvulla, tyytymättömyys ruokki suoraan
> Farroupilha-kapinaa – ja rauhansopimus 1845 palkitsi kapinalliset
> juuri 25 %:n tuontitullilla. Mustien osuus laski sittemmin hitaasti:
> 25 %:iin 1858, 5,2 %:iin vuoteen 2005 mennessä.

Faktat ja lähteet:
- Charqueadat (kuivalihatehtaat) syntyivät Etelä-Brasiliaan Pelotasin
  seudulle 1777 Cearán kuivuuden jälkeen; halpaa kuivalihaa käytettiin
  yleisesti orjatyövoiman ruokana muualla Brasiliassa. — en-Wikipedia
  "Ragamuffin War"
- Mustien osuus Rio Grande do Sulin väestöstä oli 50 % vuonna 1822,
  25 % vuonna 1858 ja enää 5,2 % vuonna 2005; suurin osa heistä oli
  tuotu Angolasta charqueadojen orjatyöhön. — en-Wikipedia "Rio Grande
  do Sul"
- 1830-luvulta lähtien Uruguayn ja Argentinan vapaan (ei-orja-)
  työvoiman tuottama halvempi ja parempilaatuinen kuivaliha alkoi
  syrjäyttää gaúcho-tuottajia; tämä taloudellinen tyytymättömyys oli
  yksi Farroupilha-kapinan taustasyistä. — en-Wikipedia "Ragamuffin
  War" / "Rio Grande do Sul"
- Sotaa päättänyt Vihreän Ponchon sopimus (1845) sisälsi 25 %:n tullin
  tuontikuivalihalle — suora vastaus kapinan taloudelliseen
  alkusyyhyn. — en-Wikipedia "Ragamuffin War"

### Teemasivu `luonto` — 4 nostoa

**Nosto L1 — "Suoalue josta tuli vapautuksen kenttä" (650 merkkiä)**

> Redenção-puiston paikalla oli 1800-luvun alussa tulvivaa suoaluetta
> kaupunginportin ulkopuolella. Farroupilha-kapinan aikana alue jäi
> linnoitusten ulkopuolelle; myöhemmin sitä käytettiin nahan
> kuivatukseen ja jätteen kaatopaikkana. Vuonna 1884 kadun nimi
> muutettiin "Campos da Redençãoksi" – Vapautuksen kentiksi – juhlistaen
> kaupungin varhaista orjuuden lakkautusta, vuosia ennen koko Brasilian
> vuoden 1888 lakkautusta. Nykyinen puisto muotoutui 1935 Farroupilha-
> kapinan satavuotisjuhliin ranskalaisarkkitehti Alfred Agachen
> suunnitelmalla, ja sunnuntaisin siellä kokoontuu yhä väkeä Brique da
> Redenção -kirpputorille juttelemaan ja juomaan mateta.

Faktat ja lähteet:
- Puiston paikalla oli tulviva Várzea do Portão -suoalue vanhan
  kaupunginportin ulkopuolella; kaupunginvaltuusto pyysi sen
  lahjoittamista julkiseen käyttöön 23.2.1807, mittaus tehtiin vasta
  1820–1825. Farroupilha-kapinan aikana alue jäi kaupungin
  linnoitusten ulkopuolelle. — en-Wikipedia "Farroupilha Park"
- Aluetta käytettiin nahan kuivatukseen, kärrykokoontumispaikkana ja
  kunnan jätteen kaatopaikkana noin vuoteen 1890 asti; 1872 alueen
  kaakkoisosaan valtuutettiin sotilaskasarmin rakentaminen (nykyisen
  Colégio Militar de Porto Alegren alku). — en-Wikipedia "Farroupilha
  Park"
- Vuonna 1884 kadun nimi muutettiin "Campos da Redençãoksi"
  juhlistamaan kaupungin varhaista orjuuden lakkauttamista. —
  en-Wikipedia "Farroupilha Park"
- Nykyinen puisto (Parque Farroupilha) muotoutui 1935 Farroupilha-
  kapinan satavuotisjuhliin ranskalaisarkkitehti Alfred Agachen
  suunnitelmalla; sunnuntaisin kello 9 alkaen käynnissä on Brique da
  Redenção -kirpputori käsitöineen, ja puistossa kävellään, jutellaan
  ja juodaan matea erityisesti aurinkoisina aamuina. — en-Wikipedia
  "Farroupilha Park"

**Nosto L2 — "Kansa jonka kaksi puoliskoa maalaavat itsensä eri tavoin" (656 merkkiä)**

> Kaingang-kansaa elää nykyään noin 51 000 henkeä Paranán, Santa
> Catarinan, Rio Grande do Sulin ja São Paulon osavaltioissa – oma jê-
> kieliperheen kieli erottaa heidät naapuriguaraníista selvästi. Yhteisö
> jakautuu kahteen puoliskoon, kamé ja kanhru, jotka symboloivat
> maailman kahta alkuperäistä puoliskoa, luontoa ja ihmisyyttä: kamé-
> väki maalaa kasvonsa ja vartalonsa suorin viivoin ja siksak-kuvioin,
> kanhru-väki pistein ja ympyröin. Kansa on myös nykypäivän poliittinen
> toimija: 2006 Paranán Apucaraninha-reservaatin kaingangit pakottivat
> valtion sähköyhtiön maksamaan 6,5 miljoonaa dollaria korvausta
> pienvesivoimalasta uhkaamalla tuhota sen koneiston.

Faktat ja lähteet:
- Kaingang-kansaa elää noin 51 000 henkeä (2022) Paranán, Santa
  Catarinan, Rio Grande do Sulin ja São Paulon osavaltioissa; kieli
  kuuluu jê-kieliperheeseen ja on selvästi erillinen naapuriguaraníen
  kielestä. — en-Wikipedia "Kaingang"
- Yhteisö jakautuu kahteen eksogamiseen puoliskoon, kamé ja kanhru
  (kairu), jotka edustavat maailmankuvassa maailman kahta
  alkuperäispuoliskoa, luontoa ja ihmisyyttä; kamé-jäsenet maalaavat
  suoria viivoja ja siksak-kuvioita, kanhru-jäsenet pisteitä ja
  ympyröitä; merkintä periytyy isältä. — en-Wikipedia "Kaingang"
- Marraskuussa 2006 Brasilian valtionyhtiö Copel suostui maksamaan
  6,5 miljoonan dollarin korvauksen kaingang-yhteisölle
  pienvesivoimalan käytöstä Apucaraninha-reservaatissa sen jälkeen,
  kun yhteisö oli uhannut tuhota voimalan koneiston. — en-Wikipedia
  "Kaingang"

**Nosto L3 — "Kansa joka näkyy Porto Alegren kaduilla nykyään" (655 merkkiä)**

> Mbyá-guaraníta – guaraníen omaa haaraa, jolla on oma murteensa ja
> kaksi johtajaa: hengellinen karaí ja poliittinen mburuvichá – elää
> Brasiliassa noin 8 400 henkeä, suurin osa Atlantin metsän kukkuloilla
> ja rannikolla sekä tienvarsileireissä Rio Grande do Sulissa,
> Paranássa ja Santa Catarinassa. Heitä näkyy myös Porto Alegressa
> itsessään: Wikimedia Commonsin kuva-arkistossa on valokuva
> mbyá-guaraníta myymässä käsitöitä Bom Fim -kaupunginosan
> tienvarressa ja toinen kaupungissa valokuvatusta kyltistä, joka lukee
> "Mbyá-guaraníen vastarinta". Guaraníen oma tarina kertoo, että
> mate-pensas syntyi naisesta nimeltä Ka'a Jarýi, joka muuttui pyhäksi
> yrtiksi.

Faktat ja lähteet:
- Mbyá-guaraníta elää Brasiliassa noin 8 400 henkeä (Instituto
  Socioambiental), keskittyen etelä- ja kaakkoisosien Atlantin metsän
  kukkuloille ja rannikolle sekä tienvarsileireihin Paranán, Santa
  Catarinan ja Rio Grande do Sulin osavaltioissa erityisesti
  BR-101- ja BR-116-teiden varsilla. — en-Wikipedia "Mbyá Guaraní
  people"
- Yhteisöä johtaa tyypillisesti kaksi henkilöä: hengellinen johtaja/
  shamaani ''karaí'' ja poliittinen johtaja/päällikkö ''mburuvichá'';
  pysyviä kyliä kutsutaan nimellä ''tekoa''. — en-Wikipedia "Mbyá
  Guaraní people"
- Wikimedia Commonsin kuva-arkistossa on valokuva mbyá-guaraníta
  myymässä käsitöitä Porto Alegren Feira do Bom Fim -tienvarrella
  sekä valokuva kaupungissa nähdystä kyltistä "Resistência Mbyá
  Guarani" ("Mbyá-guaraníen vastarinta"). — en-Wikipedia "Mbyá
  Guaraní people" (kuvatekstit)
- Guaraníen tarustossa Ka'a Jarýi oli nainen, josta tuli pyhä yrtti
  yerba (mate-pensas). — en-Wikipedia "Guaraní people"

**Nosto L4 — "Järvi joka nousi ennätykseen" (645 merkkiä)**

> Huhti–toukokuussa 2024 ilmakehän jumiutunut painekuvio kaatoi
> Porto Alegren alueelle sateen, jonka määrä toukokuun ensimmäisten
> 12 päivän aikana – 333 mm – oli lähes kolminkertainen 1991–2020
> toukokuun keskiarvoon verrattuna. Guaíba nousi 5,31 metriin, mikä
> rikkoi vuoden 1941 tulvan ennätyksen 4,76 metriä. Koko osavaltiossa
> tulvat tappoivat 181 ihmistä, yli 580 000 joutui kodittomaksi ja
> vahingot nousivat 19 miljardiin realiin. Porto Alegressa lentokenttä,
> metro ja linja-autoasema tulvivat täysin, ja sekä Grêmion että
> Internacionalin kotistadionit joutuivat pitkäksi aikaa pois käytöstä
> – ottelut siirrettiin muihin kaupunkeihin viikoiksi.

Faktat ja lähteet:
- Ilmakehän jumiutuma esti tavanomaisten säärintamien liikkeen
  huhti-toukokuussa 2024; Porto Alegren alueella sateen määrä
  toukokuun ensimmäisten 12 päivän aikana oli jopa 333,1 mm, lähes
  kolminkertainen 1991–2020 toukokuun keskiarvoon (113 mm) verrattuna.
  — en-Wikipedia "2024 Rio Grande do Sul floods"
- Guaíba-järvi nousi Porto Alegressa 5,31 metriin, mikä ylitti vuoden
  1941 tulvan ennätyksen 4,76 metriä. — en-Wikipedia "2024 Rio Grande
  do Sul floods"
- Koko osavaltiossa tulvat aiheuttivat 181 kuolemaa (tilanne
  7.7.2024 mennessä; artikkelin leipäteksti mainitsee myös luvun 169 —
  ks. osio 7, huomio 4), yli 580 000 ihmistä joutui kodittomaksi ja
  vahingot arvioitiin 19 miljardiksi realiksi (3,7 mrd USD); tulva oli
  Brasilian pahin yli 80 vuoteen. — en-Wikipedia "2024 Rio Grande do
  Sul floods"
- Porto Alegren lentokenttä, metro (Trensurb) ja linja-autoasema
  tulvivat kokonaan ja keskeyttivät toimintansa; Grêmion, Internacionalin
  ja Juventuden kotistadionit olivat käyttökelvottomia, ja Brasilian
  jalkapalloliitto siirsi otteluita viikoiksi eteenpäin. — en-Wikipedia
  "2024 Rio Grande do Sul floods"

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

Faktat on valittu niin, etteivät ne toista osion 2 nostoja tai
kulttuurivisan vastauksia sanasta sanaan.

**Jakso 1 — "Pampan portilla"**

Porto Alegre on Brasilian eteläisin osavaltion pääkaupunki ja pampa-
alueen luonnollinen portti — sama tasankokulttuuri jatkuu Uruguayhin ja
Argentiinaan. Kaupungin nimi tarkoittaa "iloista satamaa", ja se
sijaitsee viiden joen yhtymäkohdassa syntyneen suistoalueen partaalla.
Isoisän matkan aikoihin, vuoden 1872 väestönlaskennassa, kaupungissa
asui jo lähes 44 000 ihmistä.

Faktat ja lähteet:
- Porto Alegre on Rio Grande do Sulin, Brasilian eteläisimmän
  osavaltion, pääkaupunki ja maan eteläisin osavaltion pääkaupunki. —
  en-Wikipedia "Porto Alegre"
- Nimi tarkoittaa kirjaimellisesti "iloista satamaa"; kaupunki
  sijaitsee delta-alueella, joka on syntynyt viiden joen (Guaíba ja sen
  neljä sivujokea) yhtymäkohtaan. — en-Wikipedia "Porto Alegre"
- Vuoden 1872 väestönlaskennassa kaupungissa oli 43 998 asukasta. —
  en-Wikipedia "Timeline of Porto Alegre"

**Jakso 2 — "Neljäkymmentä kukkulaa ja outo otsoniaukko"**

Porto Alegre on maan eteläisin sijaintinsa ansiosta Brasilian
vuodenaikaisesti ääripäisin pääkaupunki: joulukuussa valoisaa aikaa on
14 tuntia, kesäkuussa vain 10. Neljäkymmentä kukkulaa rikkovat muuten
tasaista maisemaa Guaíba-järven rannalla. Lunta sataa äärimmäisen
harvoin — kirjattuja lumisadetapauksia on vain kuudesta vuodesta koko
historian aikana — mutta Etelämantereen otsoniaukon vaikutuksesta
alueella mitataan ajoittain poikkeuksellisen voimakasta UV-säteilyä.

Faktat ja lähteet:
- Kaupungin eteläinen sijainti muihin Brasilian pääkaupunkeihin
  verrattuna tuottaa maan suurimman vuodenaikaisvaihtelun; valoisaa
  aikaa on joulukuussa 14 tuntia, kesäkuussa 10. — en-Wikipedia "Porto
  Alegre" (Climate-osio)
- Lumisadetapauksia on kirjattu vain vuosina 1879, 1910, 1984, 1994,
  2000 ja 2006, ja harvoin ne ovat kertyneet maahan; usein kyse on
  räntäsateesta. — en-Wikipedia "Porto Alegre" (Climate-osio)
- Etelä-Brasilian ja Uruguayn yllä havaitun otsonikerroksen
  poikkeuksellisen suuren aukon vuoksi väestö altistuu ajoittain
  vaarallisen voimakkaalle UV-säteilylle. — en-Wikipedia "Porto
  Alegre" (Climate-osio)

**Jakso 3 — Arjen ilmiö: kaupunginosien yökulttuuri**

Porto Alegre tunnetaan Brasiliassa monipuolisesta yöelämästään.
"SoHo"-lempinimen saanut korttelinpätkä kokoaa baareja ja klubeja
yhteen, Cidade Baixa ("Alakaupunki") -kaupunginosan historiallinen
João Alfredo -katu tarjoaa kaiken brasilialaisesta popmusiikista
rockiin, ja Moinhos de Vento -kaupunginosa tunnetaan kahviloistaan,
baareistaan ja ylellisistä liikkeistään.

Faktat ja lähteet:
- "SoHo"-alueella on korttelillinen baareja, ravintoloita ja klubeja.
  — en-Wikipedia "Porto Alegre" (Nightlife-osio)
- Cidade Baixa ("Lower City") -kaupunginosan historiallisella João
  Alfredo -kadulla on lukuisia diskoja brasilialaisesta popista
  (MPB) rockmusiikkiin. — en-Wikipedia "Porto Alegre" (Nightlife-osio)
- Moinhos de Vento -kaupunginosa tunnetaan vilkkaasta
  yhteiskuntaelämästään, kahviloineen, baareineen, ylellisine
  liikkeineen ja yökerhoineen. — en-Wikipedia "Porto Alegre"
  (kuvateksti, Nightlife-osio)

**Jakso 4 — Historian käännekohta: vapautuksen kentät**

Kun Brasilia lakkautti orjuuden vasta 1888, Porto Alegressa muistutettiin
asiasta jo neljä vuotta aiemmin: 1884 kaupungin nykyisen suurpuiston
paikalla kulkeva katu nimettiin uudelleen "Vapautuksen kentiksi"
juhlistamaan kaupungin varhaista orjuuden lakkautusta. Muistona toisesta
1900-luvun mullistuksesta, vuoden 1941 tuhoisasta tulvasta, historiallisen
keskustan suojaksi rakennettiin vahva penger ja viemäröintijärjestelmä —
sama rakennelma esti pahimman vahingon 2024 tulvissa jyrkän Guaíba-nousun
vuoksi muualla kaupungissa.

Faktat ja lähteet:
- Vuonna 1884 Redenção-puiston paikalla kulkeva katu nimettiin
  "Campos da Redençãoksi" ("Vapautuksen kentiksi") juhlistamaan
  kaupungin varhaista orjuuden lakkautusta — vuosia ennen koko
  Brasilian vuoden 1888 lakkautusta. — en-Wikipedia "Farroupilha Park"
- Vuoden 1941 tuhoisan tulvan jälkeen historiallisen keskustan
  suojaksi rakennettiin viemäröintijärjestelmä ja penger (Muro da
  Mauá), joka on sittemmin estänyt vastaavan vahingon toistumisen
  keskustassa. — en-Wikipedia "Porto Alegre" (Climate-osio)

**Jakso 5 — Milloin kannattaa tulla**

Porto Alegressa on kostea subtrooppinen ilmasto selkein vuodenajoin.
Talvi on leuto mutta tuulinen ja sateinen (10–19 astetta, pakkasennätys
-4,0 astetta heinäkuulta 1918), kesä helteinen ja aurinkoinen (jopa
30–40 astetta, ennätys 40,7 astetta tammikuulta 1943). Toisin kuin
pohjoisemmissa Brasilian kaupungeissa, sadanta huipentuu täällä talveen,
ei kesään; vuosisadanta on noin 1 500 mm. Syyskuun 20. päivä on hyvä
ajankohta saapua: se on Farroupilha-kapinan vuosipäivä ja
juhlaviikon huipennus.

Faktat ja lähteet:
- Köppen-luokka Cfa (kostea subtrooppinen ilmasto), talvi 10–19 °C
  (pakkasennätys -4,0 °C 11.7.1918), kesä usein 30 °C, joskus 40 °C
  (virallinen ennätys 40,7 °C 1.1.1943, epävirallinen 42,6 °C). —
  en-Wikipedia "Porto Alegre" (Climate-osio)
- Toisin kuin Brasília, São Paulo ja Rio de Janeiro, joissa sadanta
  huipentuu kesään, Porto Alegressa sadannan huippu on talvella;
  vuosisadanta noin 1 425 mm (1981–2010) / 1 498 mm (1991–2020). —
  en-Wikipedia "Porto Alegre" (Climate-osio)
- **HUOM:** kuten muissakin tämän sarjan kaupungeissa, yllä olevat
  luvut ovat en-Wikipedian Climate-osiosta EIVÄTKÄ ole sama asia kuin
  pelin `saatiedot.js`-riville tarvittava ERA5 1991–2020 -normaali.
  Tarkat kuukausinormaalit haetaan kirjoitusvaiheessa
  `tools/hae-saanormaalit.mjs`-työkalulla.
- Farroupilha-kapinan alkamispäivä 20.9.1835 on nykyään vuosittainen
  juhlapäivä ("Farroupilha Week" -juhlaviikon huipennus). —
  en-Wikipedia "History of Porto Alegre"

---

## 4. Kahdeksan kohdekartan kohdetta (+ vertailupiste)

Koordinaatit poimittu Wikipedian `action=query&prop=coordinates`
-rajapinnasta (Mercado Público: infobox `{{coord}}`-parametrit
raakatekstistä asteina/minuutteina/sekunteina, muunnettu desimaaliksi;
Iberê Camargo Foundation: koordinaatti puuttui itse artikkelin
infoboxista, haettu sen Wikidata-tietueesta Q4175872). Etäisyydet ja
suunnat OMIA LASKELMIANI koordinaattieroista (asteet × 111 km,
pituusasteille kerrottu cos(30,034°) ≈ 0,866), tarkistettu
Node-skriptillä — sama menetelmä kuin faktapohja-christchurch.md:ssä.

**Vertailupiste on Praça da Matriz / Catedral Metropolitana, Porto
Alegren ruutukaavan historiallinen keskus** (spec-mantereet.md sääntö
4: kartan keskusta valitaan historiallisen ytimen mukaan, ei
hallinnollisen koordinaattipisteen). Tässä kaupungissa valinta on
poikkeuksellisen selkeä: tuomiokirkko, osavaltion hallintopalatsi
(Palácio Piratini) ja Theatro São Pedro -teatteri sijaitsevat kaikki
saman aukion tuntumassa, ja Wikipedian oma "Porto Alegre" -pääartikkelin
infobox-koordinaatti (-30,03306°, -51,23°) osuu käytännössä samaan
pisteeseen — poikkeuksellisesti hallinnollinen piste JA historiallinen
ydin osuvat siis tässä kaupungissa yksiin.

| # | Nimi | Koordinaatit (desimaali) | Lähdeartikkeli | Etäisyys/suunta vertailupisteestä |
|---|---|---|---|---|
| 1 | Praça da Matriz / Catedral Metropolitana (vertailupiste) | 30,03361°S 51,23000°W | "Metropolitan Cathedral of Our Lady Mother of God, Porto Alegre" | (vertailupiste) |
| 2 | Palácio Piratini | 30,03389°S 51,23083°W | "Piratini Palace" | ~0,09 km länsilounaaseen |
| 3 | Theatro São Pedro | 30,03204°S 51,23036°W | "São Pedro Theatre" | ~0,18 km pohjoiseen |
| 4 | Cais Mauá | 30,02750°S 51,23194°W | "Mauá Wharf" | ~0,68 km pohjoiseen |
| 5 | Mercado Público | 30,02754°S 51,22809°W | "Porto Alegre Public Market" | ~0,70 km pohjoiseen |
| 6 | Usina do Gasômetro | 30,03410°S 51,24100°W | "Usina do Gasômetro" | ~1,06 km länteen |
| 7 | Parque Farroupilha (Redenção) | 30,03667°S 51,21583°W | "Farroupilha Park" | ~1,40 km itään |
| 8 | Estádio Beira-Rio (Internacional) | 30,06556°S 51,23611°W | "Estádio Beira-Rio" | ~3,59 km etelään |
| 9 | Fundação Iberê Camargo | 30,07800°S 51,24595°W | Wikidata Q4175872 (ks. yllä) | ~5,16 km etelään |

Ilmansuunnat korjattu 24.8.2026 riippumattoman tarkistuksen
bearing-laskennan mukaisiksi (alkuperäiset oli päätelty pelkistä
koordinaattien etumerkeistä; etäisyydet olivat oikein alusta asti) —
ks. tarkistus-portoalegre.md kohta E.

Kahdeksan varsinaista kohdetta (rivit 2–9) täyttää pyydetyn 8–10
kohteen välin vertailupisteen (rivi 1) lisäksi. Kohteet 8 ja 9 ovat
selvästi kauempana ydinklusterista (3,6 km ja 5,2 km) kuin loput —
molemmat ovat kuitenkin tehtävänannon nimeämiä ydinaiheita
(jalkapallo, nykytaide), joten pidin ne mukana ydinlistassa toisin
kuin täysin ulkopuoliset kohteet alla.

**Yksi vielä kauempana oleva kohde, koordinaatti talteen mutta EI
taulukossa:**

- **Arena do Grêmio** (Grêmio-jalkapalloseuran kotistadion, K2-nosto),
  29,97333°S 51,19444°W — n. 7,5 km koilliseen vertailupisteestä,
  Humaitán kaupunginosassa. Liian kaukana ydinklusterista samalle
  kohdekartalle; kirjoittaja päättää, mainitaanko se leipätekstissä
  Internacionalin Beira-Rio-stadionin vastapainona.

---

## 5. Kuva-aiheet (Commons-kategoriat)

Kategoriat tarkistettu OLEMASSA OLEVIKSI JA KUVIA SISÄLTÄVIKSI Commonsin
`action=query&prop=categoryinfo`-kutsulla 24.8.2026 — pelkkä
olemassaolo- ja kuvamäärätarkistus, SISÄLTÖÄ EI ole silmäilty, se on
kirjoittajan työ kuvasääntöjen mukaisesti. Useat arvatut kategorianimet
osoittautuivat vääriksi (mm. "Category:Kaingang" → oikea on
"Category:Kaingangs"; "Category:Guarani people" → oikea on
"Category:Guaraní"; "Category:SC Internacional" → oikea on
"Category:Sport Club Internacional"; "Category:Guaíba" viittaa
Guaíban KAUPUNKIIN, ei järveen — järven oikea kategoria on "Category:Rio
Guaíba"; "Category:Chimarrão" ja "Category:Yerba mate" ovat olemassa
mutta TYHJIÄ, oikeat kategoriat mate-juomalle ovat "Category:Mate-based
beverages", "Category:Guampa" ja "Category:Bombillas") — tarkistin siis
jokaisen kategorianimen erikseen `list=search`-haulla ennen hyväksymistä,
resepti-ohjeen varoituksen mukaisesti.

**Avauskuvat (3):**
1. `Category:Porto Alegre` (1073 kuvaa) — laaja katunäkymä tai
   ilmakuva keskustasta ja Guaíbasta.
2. `Category:Catedral Metropolitana de Porto Alegre` (114 kuvaa) —
   tuomiokirkko ja Praça da Matriz.
3. `Category:Rio Guaíba` (136 kuvaa) — järvimaisema, mahdollisesti
   auringonlasku.

**Kansikuvat (3, LAAJOJA YLEISKUVIA — ei yksityiskohtia):**
1. `Category:Porto Alegre` — kaupungin siluetti Guaíban yli.
2. `Category:Cais Mauá` (91 kuvaa) — satamalaiturin ja keskustan laaja
   näkymä.
3. `Category:Parque Farroupilha` (437 kuvaa; HUOM Commons-kategorian
   nimi on portugaliksi — `Category:Farroupilha Park` EI ole olemassa)
   — puiston laaja ilmakuva.

**Nosto-/jaksokuvat, sivuittain:**

*Kaupunki:*
- `Category:Mercado Público de Porto Alegre` (218 kuvaa, K1)
- `Category:Sport Club Internacional` (63 kuvaa) ja `Category:Grêmio
  Foot-Ball Porto Alegrense` (109 kuvaa) sekä `Category:Grenal`
  (8 kuvaa) (K2)
- `Category:Usina do Gasômetro` (283 kuvaa, K3)
- `Category:Fundação Iberê Camargo` (160 kuvaa, K4)

*Historia:*
- `Category:São Leopoldo` (66 kuvaa, H3 — saksalaissiirtokunta)
- `Category:Serra Gaúcha` (18 kuvaa, H3 — italialaisasutuksen
  vuoristo) — TARKISTA kirjoitusvaiheessa löytyykö tarkempi
  siirtolaisuusaiheinen alakategoria
- H1 (atsoorilaisperustaminen) ja H2 (Farroupilha-kapina/piiritykset)
  ja H4 (charque/orjatyö): ei kaupunkikohtaista Commons-kategoriaa
  löytynyt tässä koosteessa — kirjoittajan kannattaa hakea
  Farroupilha-kapinan yleiskategoriasta `Category:Ragamuffin War`
  (29 kuvaa, historialliset kartat/maalaukset) H2:lle; H1:lle ja
  H4:lle todennäköisesti vain 1800-luvun yleiskuvia tai maalauksia
  Porto Alegren pääkategoriasta.

*Luonto:*
- `Category:Parque Farroupilha` (L1 — nimi portugaliksi, ks. yllä)
- `Category:Kaingangs` (69 kuvatiedostoa, L2 — huom. monikkomuoto;
  kategorian kokonaiskoko 82 sisältää 13 alikategoriaa)
- `Category:Guaraní` (235 kuvaa) tai tarkemmin `Category:Mbya
  Guarani` (31 kuvatiedostoa, L3; kokonaiskoko 49 sisältää 18
  alikategoriaa)
- `Category:2024 Rio Grande do Sul floods` (29 kuvaa, 16 kuvatiedostoa,
  L4) — TARKISTA huolella kuten Christchurch-mallissa: valitse
  neutraali, ei-järkyttävä kuva (esim. tulvinut katu tai
  pelastustyötä ilman uhrikuvia), resepti-ohjeen "LINJAUSMUUTOS
  20.8.2026" mukaisesti.

*Kohdekartta (täydentäviksi, ei nostoa varten):*
- `Category:Palácio Piratini` (6 kuvaa)
- `Category:Theatro São Pedro (Porto Alegre)` (134 kuvaa)
- `Category:Arena do Grêmio` (225 kuvaa)
- `Category:Estádio Beira-Rio` (190 kuvaa)

---

## 6. Säätiedot

Ks. osio 3, Jakso 5 — samat luvut, sama lähde (en-Wikipedian
Climate-osio, EI ERA5). Lisäksi lumisadetapaukset ja UV-huomio osiossa
3, Jakso 2.

---

## 7. Ristiriidat, epävarmuudet ja huomiot

1. **Ei löytynyt yhtä ainoaa vahvaa 1873-tapahtumaa Porto Alegrelle**
   toisin kuin Christchurchin katedraalitapauksessa. Lähin tarkka
   kiinnekohta on vuoden 1872 väestönlaskenta (43 998 asukasta,
   "Timeline of Porto Alegre"), joka on vain vuoden isoisän matkaa
   varhaisempi ja siksi käyttökelpoinen "näin suuri kaupunki isoisä
   näki" -ankkurina (käytetty sivun `kaupunki` johdannossa ja K1-
   nostossa). Toinen mahdollinen kiinnekohta on Redenção-puiston 1872
   sotilaskasarmin rakennuslupa (L1-nosto). Suosittelen kirjoittajalle
   jompaakumpaa näistä ensisijaiseksi 1873-ankkuriksi, koska
   kalenterivuotta 1873 itseään ei mainita kummankaan artikkelin
   raakatekstissä.
2. **Kaupungin statusmuutosten vuodet vaihtelevat artikkelista
   toiseen.** "Porto Alegre" -pääartikkeli antaa viralliseksi
   perustamispäiväksi 26.3.1772 (freguesia) ja pääkaupunkistatukselle
   24.7.1773; "History of Porto Alegre" -artikkeli mainitsee lisäksi,
   että kylästä tuli virallisesti "cidade" (kaupunki) vasta
   14.4.1822 keisari Pedro I:n asetuksella, ja "Timeline of Porto
   Alegre" -artikkeli antaa kaupunkistatukselle myös vuoden 1822
   mutta "vila"-statukselle 1803. Nämä eivät ole keskenään
   ristiriitaisia — kyse on kolmesta eri hallinnollisesta portaasta
   (freguesia 1772 → vila 1803 → cidade 1822) — mutta kirjoittajan on
   syytä olla tarkka siitä, mitä sanaa ("perustettiin", "sai
   kaupunkioikeudet") käyttää mistäkin vuodesta.
3. **Porto Alegren pääartikkeli antaa harhaanjohtavan kuvan
   italialaissiirtolaisuuden alkamisvuodesta.** Pääartikkelin History-
   osio sanoo: "In 1824, immigrants from all over the world started
   arriving, especially German, Italian, Spanish, Polish, Jewish, and
   Lebanese" — tämä lukee kuin italialaiset olisivat saapuneet jo
   1824, saksalaisten kanssa samaan aikaan. Sekä "Rio Grande do Sul"-
   että "Italian Brazilians" -erikoisartikkelit ovat kuitenkin
   yksiselitteisiä: italialaissiirtolaisuus osavaltioon alkoi vasta
   1875. Käytin H3-nostossa ja tehtävänannon vaatimaa täsmällisempää
   1875-vuotta erikoisartikkeleista, en pääartikkelin epätarkkaa
   muotoilua — tämä on tässä kaupungissa KESKEINEN ero, koska
   tehtävänanto nimeää juuri nämä kaksi vuosilukua lehden ankkuriksi.
4. **Vuoden 2024 tulvien kuolonuhrimäärä esiintyy kahtena eri lukuna
   samassa artikkelissa.** "2024 Rio Grande do Sul floods" -artikkelin
   infobox antaa 181 kuollutta (tilanne 7.7.2024, RS:n osavaltion
   hallinnon ja YK:n lähteet), mutta artikkelin leipätekstin "Victims"-
   osio sanoo "at least 169 people were killed" viitaten toukokuun
   alun uutislähteisiin. Käytin L4-nostossa infobox-lukua 181, koska
   se on tuoreempi ja virallisempi (RS-hallinto + YK, heinäkuu 2024)
   kuin toukokuun alun kesken-tulvan uutisluku 169, mutta kirjasin
   ristiriidan avoimesti tekstiin kuten reseptin ennakkotapaukset
   (v925, v932, v937) neuvovat.
5. **"Timeline of Porto Alegre" -artikkeli antaa saksalaissiirtolaisten
   saapumisvuodeksi 1825**, kun taas "German Brazilians" -
   erikoisartikkeli (ja tehtävänannon oma linjaus) antavat täsmällisen
   päivämäärän 25.7.1824. Käytin H3-nostossa erikoisartikkelin
   tarkempaa ja lähteistetympää päivämäärää 1824.
6. **Farroupilha-kapinan piiritysten tarkat päivämäärät poikkeavat
   hieman lähteestä toiseen** ("History of Porto Alegre" antaa
   kaupungin takaisinvaltauspäiväksi 15.6.1836, "Timeline of Porto
   Alegre" ja "Porto Alegre"-pääartikkeli eivät anna tarkkaa päivää
   vaan pelkän kuukauden "June 1836"); käytin H2-nostossa tarkempaa
   päivämäärää.
7. **Guaíba on virallisesti sekä "järvi" että "joki"** — Wikipedia
   itse toteaa asian kiistanalaiseksi ja viittaa siitä käytyyn
   paikalliseen tieteelliseen keskusteluun ("Manual para saber porque
   o Guaíba é um lago"). Kirjoittajan kannattaa käyttää "järvi"-sanaa
   johdonmukaisesti (kuten olemassa olevat SOUTHAMERICA_FACTS/
   -QUESTIONS jo tekevät), mutta tietää taustalla olevan tämä
   epäselvyys.
8. **En löytänyt en-Wikipediasta suoraa lähdettä "Guaíban
   auringonlasku on kaupungin ylpeys" -väitteelle**, joka on jo
   olemassa olevassa `SOUTHAMERICA_QUESTIONS.portoalegre`-kysymyksessä
   3. En siis toistanut tätä väitettä uutena faktana K3-nostossa, vaan
   käytin sen sijaan tarkistetun lähteen ("sunny Sundays at the
   Gasometer") lähellä samaa teemaa mutta eri, todennettua sisältöä.
9. **Kaikki tiedot haettu ainoastaan en-Wikipediasta ja sen
   raakatekstistä (action=raw)**, paitsi Commons-kategorioiden
   olemassaolo- ja kuvamäärätarkistukseen (osio 5) sekä yhden
   koordinaatin (Fundação Iberê Camargo) hakuun Wikidatasta, koska
   koordinaatti puuttui itse en-Wikipedia-artikkelin infoboxista. Ei
   muita ulkopuolisia hakuja tämän faktapohjan sisältöön.

---

## 8. Päällekkäisyyksien välttäminen

**`js/packs/southamerica-questions.js`, kohta `portoalegre` (5 kysymystä)
ja `SOUTHAMERICA_FACTS.portoalegre` (3 faktaa + isoisän repliikki) on
luettu, eikä niiden sanamuotoa ole toistettu tässä faktapohjassa:**

- **Kysymys 1 / Fakta 1–2** (Rio Grande do Sulin pääkaupunki, Brasilian
  eteläkulma, viileimmät talvet, lumi ylängöillä): tämä yleistieto
  toistuu Jakso 1:n ja Jakso 2:n johdannoissa mutta EI-TOISTAVIN
  sanamuodoin — uudet yksityiskohdat (40 kukkulaa, 14 h/10 h valoisan
  ajan ero, tarkat lumisadetapausvuodet 1879–2006, otsoniaukko-UV-
  huomio, pakkas- ja lämpöennätysten päivämäärät) eivät ole missään
  olemassa olevassa faktassa tai kysymyksessä.
- **Kysymys 2 / Kysymys 5 / Fakta 3** (mate/chimarrão: kurpitsakuppi,
  metalliputki bombilla, guaraní-alkuperä, yhteinen astia): tämä
  perustieto EI toistu uusissa nostoissa sanasta sanaan. L3-nosto
  syventää guaraní-yhteyttä täysin uudella yksityiskohdalla (Ka'a
  Jarýi-alkuperämyytti, jota olemassa olevat FACTS/QUESTIONS eivät
  mainitse), ja K3/L1-nostot mainitsevat mate-juonnin vain sivuten
  osana Gasômetro-/Redenção-sunnuntaikulttuuria, eivät juoman
  valmistustapaa itseään.
- **Kysymys 3** (Guaíba-laguuni, auringonlasku kaupungin ylpeytenä):
  ks. osio 7, huomio 8 — auringonlasku-väitettä ei toistettu, koska
  sille ei löytynyt en-Wikipedia-lähdettä; sen sijaan L4-nosto tuo
  Guaíbaan täysin uuden, ajallisesti tuoreen näkökulman (2024 tulvan
  ennätyskorkeus) ja K3-nosto sunnuntaikokoontumisen Gasômetron
  edustalla.
- **Kysymys 4 / isoisän repliikki** (gaúchot pampan karjapaimenina;
  isoisän repliikki laguunista, satamasta ja paimenista, teen
  kiertämisestä): gaúcho-kulttuuri ei saa omaa nostoaan tässä
  koosteessa juuri siksi, että perusmääritelmä on jo katettu — sen
  sijaan gaúcho-teema jatkuu K2-nostossa aivan eri kulmasta
  (jalkapalloseurojen perustamishistoria ja luokkaerot) ja H4-
  nostossa (charque-talouden orjatyö, joka on gaúcho-kulttuurin
  historiallinen tausta mutta ei koskaan mainita QUESTIONS/FACTS-
  riveissä).

**Yleinen periaate, jota noudatin:** kaikki 12 nostoa ja 5 jaksoa
tuovat joko (a) täysin uuden aiheen, jota olemassa olevat rivit eivät
käsittele (Mercado Público, Farroupilha-kapina ja piiritykset,
saksalais-/italialaissiirtolaisuuden tarkat vuodet, charque/orjatyö,
kaingang, mbyá-guaraní, Iberê Camargo, jalkapalloseurat, Gasômetro,
Redenção-puiston historia, 2024 tulvat) tai (b) saman yleisaiheen
(Guaíba, mate, gaúcho) mutta täysin eri, tarkistetun yksityiskohdan
kuin jo olemassa oleva rivi.

## Korjaushistoria 24.8.2026 (tarkistus-portoalegre.md:n jälkeen, Fable)

1. Osio 5: `Category:Farroupilha Park` → `Category:Parque Farroupilha` (Commons-kategorian oikea nimi; en-Wikipedian artikkelinimi "Farroupilha Park" lähdeviitteissä on edelleen oikein).
2. Kaingangs- ja Mbya Guarani -kategorioiden luvut korjattu kuvatiedostoiksi (69 ja 31; aiemmat 82 ja 49 sisälsivät alikategoriat).
3. Osio 4: kuusi kahdeksasta ilmansuunnasta korjattu tarkistuksen bearing-laskennan mukaisiksi (alkuperäiset päätelty pelkistä etumerkeistä; etäisyydet olivat oikein).
