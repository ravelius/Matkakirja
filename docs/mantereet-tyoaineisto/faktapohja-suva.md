# Suva — faktakoostaja, uusi kaupunkilehti (Oseanian lauta)

Lauta-id `oceania`, kaupunki-id `suva`, maa FJI (Fidži), en-Wikipedia
"Suva" ellei toisin mainita. Kaikki tiedot haettu en-Wikipediasta
**24.8.2026** (`action=raw`; ympäristön HTTPS-liikenne kulkee
esikonfiguroidun proxyn kautta — `curl` käytti sitä automaattisesti
`https_proxy`-muuttujasta, joten erillistä `NODE_USE_ENV_PROXY=1`-lippua
ei tarvittu tässä työkalussa; toiminnallisuus on sama kuin ohjeen Node-
esimerkissä). Jokainen haettu otsikko tarkistettu #REDIRECT-rivin ja
täsmennyssivun varalta — **"Girmit" on täsmennysansa**: artikkeli sillä
nimellä on vuoden 2019 kannadankielinen elokuva, ei sopimustyöläisyys-
järjestelmä. Oikea reitti kulkee "Girmitiya" → #REDIRECT → "Girmitiyas".
Muutamat Commons- ja Wikipedia-API-haut osuivat 429-rajoitukseen;
odotin kasvavan viiveen (2 s, 4 s, 8 s, …) ja yritin uudelleen
resepti-ohjeen mukaisesti.

Luin ennen työtä `js/tyohuone-raamattu.js` (Perustuslaki, pilari 3
erityisesti), `docs/aasia-tyoaineisto/lehtityo-resepti.md` (SITOVA),
`docs/moduulit/kaupunkilehti.md`, mallitiedostona
`docs/mantereet-tyoaineisto/faktapohja-christchurch.md` (rakenne
kopioitu siitä osio osiolta) ja `docs/mantereet-tyoaineisto/
spec-mantereet.md` (Oseania-osio ja kaikkia kolmea uutta mannerta
koskevat viisi linjausta). Luin myös `js/packs/oceania-questions.js`
kohdan `suva` (viisi kysymystä: maa/Fidži, päivämäärän vaihtumislinja,
Viti Levu, kava tervehdysseremoniassa, USP:n kahdentoista maan
yhteisomistus) ja `OCEANIA_FACTS.suva`-rivin (kolme faktaa + isoisän
kava-repliikki) — ks. osio 8 siitä, miten päällekkäisyyksiä on vältetty.

**Tehtävän erityispiirre:** En kirjoittanut lehtitekstejä, en ladannut
kuvia enkä koskenut js/packs-tiedostoihin — kaikki alla on raaka-ainetta
kirjoittajalle ja riippumattomalle tarkistajalle.

**Sisältölinjaus (tehtävänanto + spec-mantereet.md + Raamattu pilari 3):**
iTaukei (alkuperäinen fidžiläinen kansa) ja indofidžiläiset kuvataan
molemmat nykyisinä, elävinä väestöryhminä omilla nimillään — Suva on
juuri se kaupunki, jossa molempien yhteiselo näkyy konkreettisimmin
("New Yorkin Pacific" -lempinimi, kahden pääväestöryhmän kaupunki).
Girmit-sopimustyöläisyys (1879–1916) käsitellään toteavasti faktoineen,
ei pelkkänä historiallisena tapahtumana vaan alkuna elävälle
indofidžiläiselle yhteisölle. Fidžin vallankaappaukset (1987, 2000,
2006) on jätetty KOKONAAN pois — myös lähdeaineistosta löytyneistä
tapahtumista, jotka muuten olisivat kuuluneet esim. Grand Pacific
Hotelin tai Indo-Fijians-artikkelin historiaan (ks. osio 7, huomio 6).
Ei nykysotaa.

**Isoisän matkan vuosi 1873 (erityisen huolellisesti tarkistettu,
ks. osio 7, huomio 1):** vuonna 1873 Fidži EI OLLUT vielä Britannian
siirtomaa eikä Suva ollut pääkaupunki — kumpikaan tapahtuma ei ollut
vielä sattunut. Fidžiä hallitsi itsenäinen, eurooppalaisten
uudisasukkaiden tukema Cakobaun kuningaskunta (1871–1874), pääkaupunki
oli Levuka, ja luovutus Britannialle tapahtui vasta 10.10.1874.
Tarkistettu artikkeleista "Suva", "Fiji", "Colony of Fiji" ja "Seru
Epenisa Cakobau" — päivämäärät ja järjestys täsmäävät kaikissa
neljässä.

---

## 1. Sivuehdotukset

Tehtävänanto salli 1–3 teemasivua. Käytin kaksi: aineisto kantoi
vahvasti kaksi erillistä teemaa (siirtomaahistoria/pääkaupungiksi
kasvu ja luonnonmaantiede/sää), ja loin kolmannelle rikkaalle teemalle
(elävä nykykulttuuri: kava, ruoka, USP, iTaukei ja indofidžiläiset
yhdessä) tilaa osiossa 3 (jaksoehdotukset), koska sisältö on
luonteeltaan matkaoppaan kevyempää "mitä täällä on nyt" -aineistoa
eikä vaadi omaa raskasta kategoriasivuaan — vertaa Christchurch-mallin
ratkaisuun käyttää kahta teemasivua kolmen sijaan.

### Sivu A — id `kaupunki`, nimi "Suva"

**Johdanto (196 merkkiä):**

> Suvan kaupunki nousi rantaniemelle vasta isoisän matkan jälkeen –
> 1873 paikalla oli vain pieni kylä kariutuneen puuvillahankkeen
> varjossa, ja Fidžin oikea pääkaupunki oli Levuka.

### Sivu B — teemasivu, ehdotettu id `historia`, nimi "Kuningaskunnasta pääkaupungiksi"

**Perustelu valinnalle:** Suvan koko synty on poikkeuksellisen
tiivis siirtomaahistorian kaari kahdessatoista vuodessa (1868 maa-
lahjoitus → 1871 kuningaskunta → 1874 luovutus → 1877 pääkaupunki
→ 1882 hallinto) — juuri sellainen "mitä täällä tapahtui ja miksi
kaupunki on tässä" -tarina, jota vakioaihe `historia` kantaa hyvin.
Sivu käsittelee myös girmit-sopimustyön alkua (1879) siirtymänä
siirtomaahistoriasta elävään nykyväestöön.

**Johdanto (221 merkkiä):**

> Cakobau kruunautti itsensä Fidžin kuninkaaksi, mutta luopui
> arvonimestä kolmessatoista vuodessa. Suva ei ollut osa tätä
> draamaa vielä 1873 – se seisoi sivussa, kunnes Britannia teki
> siitä pääkaupungin kolme vuotta myöhemmin.

### Sivu C — teemasivu, ehdotettu id `luonto`, nimi "Sateinen niemi"

**Perustelu valinnalle:** Vakioaihe `luonto` sopii suoraan
tehtävänannon nimeämiin painopisteisiin (Suvan sateisuus, Rewajoen
suisto, Colo-i-Suva-sademetsäpuisto) ja antaa konkreettisen,
mitattavan vastaparin historiasivulle: sama niemi, kaksi eri tarinaa.

**Johdanto (206 merkkiä):**

> Suvan mangrovereunainen niemi ei näe kuivaa kuukautta koko vuonna –
> kun toinen kuvernööri väitti, ettei täällä ole päivääkään ilman
> sadetta, hän ei liioitellut paljon. Lähin hiekkaranta on 40
> kilometrin päässä.

---

## 2. Kaksitoista nostoehdotusta (4 × 3 sivua)

### Sivu `kaupunki` — 4 nostoa

**Nosto K1 — "Niemi joka ei ollut vielä kaupunki" (623 merkkiä)**

> Vuonna 1868 Fidžin sotapäällikkö Cakobau lahjoitti Suvan seudun
> 575 neliökilometriä australialaiselle Polynesia-yhtiölle maksuksi
> Yhdysvalloille velatuista korvauksista – yhtiö aikoi perustaa
> puuvillaviljelmän, mutta maaperä ja ilmasto osoittautuivat
> sopimattomiksi. Kun isoisä olisi kulkenut ohi 1873, seudulla ei
> ollut vielä kaupunkia — vain pieni Suvan kylä rantaniemellä
> (Wikipedia: "in 1868, when Suva was still a small village"):
> Fidžin pääkaupunki oli Levuka, ja puuvillahanke oli kariutunut. Kaupunki syntyi vasta, kun brittiläiset
> siirtomaaviranomaiset siirsivät pääkaupungin tänne 1877 – Levukan
> jyrkkien vuorten ja meren välinen ahdas sijainti esti laajenemisen.

Faktat ja lähteet:
- Cakobau lahjoitti 1868 yhteensä 5 000 km² maata australialaiselle
  Polynesia Company -yhtiölle vastineeksi siitä, että yhtiö maksaisi
  Yhdysvalloille velatut korvaukset; yli 575 km² tästä alueesta oli
  Suvan lähellä. Yhtiön alkuperäinen tarkoitus oli puuvillaviljely,
  mutta maaperä ja ilmasto osoittautuivat sopimattomiksi. —
  en-Wikipedia "Suva"
- 1874 Fidžin saaret luovutettiin Britannialle. 1877 siirtomaa-
  viranomaiset siirsivät pääkaupungin Levukasta (Ovalaun saarelta)
  Suvaan, koska Levukan sijainti jyrkän vuoren ja meren välissä esti
  kaupungin laajentamisen. Hallinnon virallinen siirto tapahtui 1882.
  — en-Wikipedia "Suva"
- Fidžin siirtomaa (Colony of Fiji) perustettiin 10.10.1874;
  pääkaupunki oli infoboxin mukaan Levuka 1874–1877 ja Suva vasta
  1877–1970. — en-Wikipedia "Colony of Fiji"

**Nosto K2 — "Tyynenmeren New York, kahden kansan kaupunki" (550 merkkiä)**

> Suvaa on kutsuttu "Tyynenmeren New Yorkiksi" – ei kokonsa vaan
> monikulttuurisuutensa takia. Kaupungin kaksi suurinta väestöryhmää,
> alkuperäiset fidžiläiset eli iTaukei ja intialaista syntyperää
> olevat indofidžiläiset, muodostavat yhdessä valtaosan asukkaista;
> lisäksi Suvassa asuu rotumalaisia, kiinalaisia ja eurooppalaisten
> jälkeläisiä. Kaupunki isännöi enemmän Tyynenmeren alueellisia
> järjestöjä ja diplomaattiedustustoja kuin mikään muu saaripääkaupunki
> – Etelä-Tyynenmeren yliopiston pääkampus tuo lisäksi opiskelijoita
> kaikkialta Tyynenmereltä.

Faktat ja lähteet:
- Suva on monirotuinen ja -kulttuurinen kaupunki: alkuperäiset
  fidžiläiset (iTaukei) ja indofidžiläiset muodostavat väestön
  valtaosan, ja kaupungissa asuu myös rotumalaisia, lauanialaisia,
  rambilaisia, eurooppalaisia (kaivalagi), euro-fidžiläisiä (kailoma)
  ja kiinalaisia. — en-Wikipedia "Suva"
- Suvaa kutsutaan joskus "Tyynenmeren New Yorkiksi"; se on Etelä-
  Tyynenmeren yliopiston (USP) pääkampuksen sijaintipaikka, mikä on
  tuonut kaupunkiin Tyynenmeren siirtolaisia opiskelemaan, työskente-
  lemään ja asumaan. — en-Wikipedia "Suva"
- Suva isännöi enemmän kansainvälisiä ja alueellisia hallitusten-
  välisiä järjestöjä ja NGO:ita kuin mikään muu Tyynenmeren
  saaripääkaupunki. — en-Wikipedia "Suva"

**Nosto K3 — "Laiva joka toi 61 000 uutta asukasta" (620 merkkiä)**

> Höyrylaiva Leonidas laski ankkurin Levukassa 14. toukokuuta 1879
> ja purki 498 intialaista sopimustyöläistä – ensimmäiset niistä yli
> 61 000:sta, jotka saapuivat seuraavan 37 vuoden aikana viljelemään
> sokeriruokoa. Sopimus ("girmit", väännös englannin sanasta
> "agreement") sitoi työntekijän viideksi vuodeksi kerrallaan;
> valtaosa jäi Fidžiin sopimuskauden päätyttyä. Girmit-järjestelmä
> päättyi 1920, mutta sen perintö elää: indofidžiläiset ovat tänään
> noin kolmasosa Fidžin väestöstä ja kolmasosa Suvan omasta piiri-
> kunnasta, ja Suvan monikulttuurinen ruokakulttuuri juontuu suoraan
> heidän mukanaan tuomistaan mausteista.

Faktat ja lähteet:
- Laiva Leonidas purki Levukassa 14.5.1879 ensimmäiset 498
  intialaista sopimustyöläistä; kaikkiaan yli 61 000 saapui
  seuraavien 37 vuoden aikana. — en-Wikipedia "Indo-Fijians"
- Sopimustyöjärjestelmä ("girmit", englannin "agreement"-sanan
  paikallinen ääntämys) toimi Fidžissä 1879–1916; työntekijät
  sitoutuivat viideksi vuodeksi kerrallaan, ja suurin osa jäi Fidžiin
  sopimuskauden päätyttyä. Järjestelmä lakkautettiin virallisesti
  1.1.1920. — en-Wikipedia "Girmitiyas" / "Indo-Fijians"
- 2017 väestönlaskennassa indofidžiläisiä oli 289 237 eli 32,7 %
  koko Fidžin väestöstä; Rewan provinssin (Suvan kotiprovinssi)
  Suva-piirikunnassa indofidžiläisiä oli 20,5 % vuoden 2017
  laskennassa. — en-Wikipedia "Indo-Fijians" / "Rewa Province"
- Indofidžiläiset ovat vaikuttaneet voimakkaasti Fidžin ruoka-
  kulttuuriin: sopimustyöläiset toivat mukanaan mausteita ja
  kasviksia, joista syntyi oma fidžiläinen intialainen curry. —
  en-Wikipedia "Suva"

**Nosto K4 — "Hotelli joka teki merimatkasta ei koskaan päättyvän" (651 merkkiä)**

> Kun Uuden-Seelannin laivayhtiö Union Steamship avasi Grand Pacific
> Hotelin 1914, huoneet suunniteltiin kuin ensimmäisen luokan
> laivahytit – suolavesikylpyammeineen ja kannen ympäri kiertävine
> 4,5 metrin leveine terasseineen, jotta matkustaja ei koskaan
> tuntenut astuneensa maihin. Hotellista tuli nopeasti siirtomaa-
> Suvan sydän: siellä yöpyivät muun muassa Somerset Maugham 1916 ja
> James Michener kirjoittaessaan "Tarinoita Etelämereltä" 1940-luvulla,
> ja sen rautaisella parvekkeella kuningashuone tervehti kansaa
> useaan otteeseen. Hotelli suljettiin rappeutuneena 1992 ja avattiin
> uudelleen täydelliseen entisöintiin 2014, tasan satavuotispäivänään.

Faktat ja lähteet:
- Union Steamship Companyn johtaja James Mills tilasi hotellin 1910
  palvelemaan Uuden-Seelannin ja Fidžin väliä kulkevia laivamatkustajia;
  huoneet suunniteltiin ensimmäisen luokan hyttien kaltaisiksi
  suolavesikylpyammeineen, ja 4,5 metrin leveä terassi kiersi koko
  rakennuksen. Hotelli avattiin 23.5.1914. — en-Wikipedia "Grand
  Pacific Hotel (Fiji)"
- Somerset Maugham yöpyi hotellissa 1916 ja James A. Michener
  kirjoittaessaan teosta "Tales of the South Pacific" 1946–1947. —
  en-Wikipedia "Grand Pacific Hotel (Fiji)"
- Hotelli suljettiin 1992 pitkän rappeutumisen jälkeen; se
  entisöitiin täysin ja avattiin uudelleen 24.5.2014, täsmälleen
  100-vuotispäivänään. — en-Wikipedia "Grand Pacific Hotel (Fiji)"
  (HUOM: artikkeli kuvaa myös 2000-luvun omistusriitoja, joissa
  syynä mainitaan nimeltä poliittinen epävakaus 2000- ja 2006-
  vallankaappausten vuoksi — TÄTÄ EI OTETTU tähän faktaan
  Raamatun linjauksen mukaisesti, ks. osio 7 huomio 6.)

### Teemasivu `historia` — 4 nostoa

**Nosto H1 — "Mies joka kruunautti itsensä kuninkaaksi" (604 merkkiä)**

> Bau-saaren sotapäällikkö Cakobau julisti itsensä koko Fidžin
> kuninkaaksi – tittelin, jota muut päälliköt eivät koskaan täysin
> tunnustaneet. Kesäkuussa 1871 hän perusti perustuslaillisen
> monarkian eurooppalaisten uudisasukkaiden tuella, Levuka
> pääkaupunkinaan. Kuningaskunta kesti vain kolme vuotta: velat,
> verotusvastarinta ja puuvillan hinnan romahdus ajoivat Cakobaun
> tarjoamaan saaria Britannialle uudelleen, ja 10. lokakuuta 1874
> hän ja muut ylimmät päälliköt allekirjoittivat luovutuskirjan.
> Cakobau luopui kuninkaantittelistä mutta säilytti paikallisen
> Vunivalu-arvonimensä kuolemaansa 1883 saakka.

Faktat ja lähteet:
- Seru Epenisa Cakobau perusti kesäkuussa 1871 perustuslaillisen
  monarkian eurooppalaisten uudisasukkaiden tuella ja julistautui
  Tui Vitiksi (Fidžin kuninkaaksi); Levuka oli kuningaskunnan
  pääkaupunki. Hallitsi 5.6.1871–10.10.1874. — en-Wikipedia
  "Seru Epenisa Cakobau" / "Fiji"
- Cakobaun hallinto kärsi legitimiteettiongelmista ja puuvillan
  hinnan romahduksesta; John Bates Thurston lähestyi Britannian
  hallitusta uudella luovutustarjouksella Cakobaun pyynnöstä.
  Luovutuskirja (Deed of Cession) allekirjoitettiin 10.10.1874
  Cakobaun, Ma'afun ja muiden ylimpien päälliköiden toimesta. —
  en-Wikipedia "Fiji"
- Cakobau luopui Tui Viti -arvonimestä mutta säilytti Vunivalu-
  arvonimen (Baun sotapäällikkö); kuoli 1.2.1883. — en-Wikipedia
  "Seru Epenisa Cakobau"

**Nosto H2 — "Vuosi jolloin vuoret olivat vielä sotaa" (523 merkkiä; ks. käsittelyohje alla)**

> Samaan aikaan kun isoisän matka olisi vienyt hänet Fidžin ohi
> 1873, saaren sisämailla käytiin sotaa: Cakobaun hallitus lähetti
> aseistetun joukon kukistamaan kai colo -heimoja, jotka eivät olleet
> kääntyneet kristinuskoon eivätkä tunnustaneet Cakobaun valtaa.
> Kahdeksankuukautinen kampanja maalis–lokakuussa 1873 päättyi
> kai colojen antautumiseen. Sota oli yksi viimeisistä merkeistä
> siitä, ettei koko saari ollut vielä yhden hallinnon alla – vasta
> luovutus Britannialle seuraavana vuonna toi koko Viti Levun
> saman lain alle. Sisämaan heimojen jälkeläiset ovat tänäkin
> päivänä elävä osa Fidžin itaukei-väestöä, ja ylänköjen kylissä
> vaalitaan omia perinteitä.

Faktat ja lähteet:
- Maalis–lokakuussa 1873 Cakobaun hallituksen noin 200 hengen
  joukko ja noin 1 000 apujoukkoa kukistivat kai colo -heimojen
  vastarinnan Viti Levun sisämailla; kampanja päättyi antautumiseen.
  — en-Wikipedia "Fiji" (Cotton, confederacies and the Kai Colo
  -osio)
- Konflikti liittyi maanomistukseen ja siihen, etteivät kai colo
  -heimot olleet kääntyneet kristinuskoon eivätkä tunnustaneet
  Cakobaun hallintoa. — en-Wikipedia "Fiji"

**KÄSITTELYOHJE H2:lle (ei osa faktatekstiä):** Wikipedian
raakateksti kuvaa kampanjaa yksityiskohtaisemmin kuin yllä (mm.
tarkka surmattujen määrä yhdessä yhteenotossa, dynamiitin käyttö,
vankien myynti orjuuteen) — nämä yksityiskohdat on TARKOITUKSELLA
jätetty pois tästä tiivistelmästä Raamatun pilarin 4 (ikäsopivuus:
"vaikeita aiheita ei kaunistella eikä kauhistella") ja spec-
mantereet.md:n Oseania-linjauksen mukaisesti ("historia kerrotaan
suoraan mutta ilman julmuuksien yksityiskohtia"). Kirjoittaja voi
käyttää yllä olevaa tiivistettyä versiota sellaisenaan tai jättää
nostoehdotuksen kokonaan pois, jos päätoimittaja katsoo aiheen liian
raskaaksi tälle sivulle — ks. myös osio 7, huomio 1.

**Nosto H3 — "Pääkaupunki joka piirrettiin tyhjälle maalle" (495 merkkiä)**

> Kun Britannia päätti siirtää pääkaupungin Levukasta Suvaan,
> kuninkaallisten insinöörien eversti F. E. Pratt nimitettiin
> ylikartoittajaksi 1875 suunnittelemaan uutta kaupunkia tyhjästä.
> Suva sai kaupunkistatuksen vasta 1910, ja sen pinta-ala pysyi
> yhden neliömailin kokoisena aina vuoteen 1952 asti, jolloin kaksi
> uutta kaupunginosaa liitettiin mukaan. Lokakuussa 1952 Suvasta
> tuli virallisesti Fidžin ensimmäinen kaupunki – kolmekymmentä
> vuotta sen jälkeen, kun se oli jo toiminut pääkaupunkina.

Faktat ja lähteet:
- Kuninkaallisten insinöörien eversti F. E. Pratt nimitettiin
  ylikartoittajaksi 1875 ja suunnitteli uuden pääkaupungin Suvaan
  W. Stephensin ja eversti R. W. Stewartin avustuksella; hallinnon
  virallinen siirto tapahtui 1882. — en-Wikipedia "Suva"
- Suva sai kunnallisstatuksen (municipality) 1910; sen pinta-ala
  pysyi yhden neliömailin kokoisena vuoteen 1952 asti, jolloin
  Muanikaun ja Samabulan kaupunginosat liitettiin ja pinta-ala
  kasvoi 13 km²:iin. Lokakuussa 1952 Suvasta tuli virallisesti
  Fidžin ensimmäinen kaupunki. — en-Wikipedia "Suva"

**Nosto H4 — "Aukio jolla itsenäisyys julistettiin" (504 merkkiä)**

> Prinssi Charles luovutti Fidžin itsenäisyysasiakirjat pääministeri
> Ratu Sir Kamisese Maralle 10. lokakuuta 1970 valtavan väkijoukon
> edessä juuri Albert Parkissa – samalla aukiolla, jolla lentäjä
> Charles Kingsford Smith oli laskeutunut ensimmäisen Tyynenmeren
> ylittävän lennon päätteeksi 1928 ja jolla uusi Fidžin lippu
> nostettiin salkoon ensi kertaa 9. lokakuuta 1970. Aukio kantaa
> nimensä prinssi Albertilta, kuningatar Viktorian puolisolta – samalta
> kuningattarelta, jolle saaret aikanaan luovutettiin.

Faktat ja lähteet:
- Prinssi Charles luovutti itsenäisyysasiakirjat pääministeri
  Ratu Sir Kamisese Maralle 10.10.1970 suurella yleisötilaisuudella
  Albert Parkissa Suvassa. — en-Wikipedia "Fijians"
- Albert Park on nimetty prinssi Albertin, kuningatar Viktorian
  puolison mukaan; siellä laskeutui lentäjä Charles Kingsford Smith
  1928 ensimmäisen Yhdysvalloista Australiaan ulottuneen Tyynenmeren
  ylittävän lennon aikana, ja siellä nostettiin uusi Fidžin lippu
  ensi kertaa 9.10.1970. — en-Wikipedia "Albert Park (Suva)"

### Teemasivu `luonto` — 4 nostoa

**Nosto L1 — "Kaupunki jossa ei ole kuivaa kuukautta" (492 merkkiä)**

> Fidžin toinen kuvernööri, sir Arthur Hamilton-Gordon, kertoi
> arvelevansa, ettei missään sada niin kuin Suvassa – ja ettei
> täällä juuri koskaan ole päivää ilman sadetta. Tilastot antavat
> hänelle oikeutuksen: Suvan kuivinkin kuukausi, heinäkuu, saa yli
> 125 millimetriä sadetta, ja vuosittainen kertymä on noin 3 000
> millimetriä – yli kaksinkertainen Fidžin läntiseen "polttavaan
> länteen" verrattuna. Vuoret pohjoisessa ja lännessä nappaavat
> kaakkoispasaatituulen kosteuden juuri Suvan kohdalla.

Faktat ja lähteet:
- Fidžin toinen kuvernööri sir Arthur Hamilton-Gordon totesi, ettei
  ollut koskaan nähnyt niin paljon sadetta kuin Suvassa eikä
  koskaan päivää ilman sadetta. — en-Wikipedia "Suva"
- Suvan kuivin kuukausi heinäkuu saa keskimäärin 125 mm sadetta;
  vuotuinen kertymä on noin 3 000 mm. Yksikään kuukausi ei jää alle
  60 mm:n. Suvan sademäärä on selvästi suurempi kuin Nadin tai
  Viti Levun länsiosan ("polttava länsi"). — en-Wikipedia "Suva"
- Vuoret Suvan pohjois- ja länsipuolella nappaavat kaakkoispasaatin
  kosteuden, mikä tuottaa ympärivuotisen kosteuden. — en-Wikipedia
  "Suva"

**Nosto L2 — "Niemi jota mangrovet rajaavat" (494 merkkiä)**

> Vaikka Suva on lähes kokonaan meren ympäröimä kukkulainen niemi,
> lähin hiekkaranta on 40 kilometrin päässä Pacific Harbourissa –
> Suvan omaa rantaviivaa reunustavat mangrovemetsät, ei hiekkaa.
> Merkittävä osa keskustasta, mukaan lukien parlamenttirakennukset,
> on rakennettu täytetylle mangrovesuolle: kaupunki laajeni
> kirjaimellisesti meren päälle, koska niemellä itsellään ei ollut
> tilaa. Kaupunki sijaitsee Laucala Bayn ja Suva Harbourin välissä
> Viti Levun kaakkoiskulmassa, Rewan provinssissa.

Faktat ja lähteet:
- Suva sijaitsee sataman ympärillä kukkulaisella niemellä Laucala
  Bayn ja Suva Harbourin välissä. Vaikka niemi on lähes meren
  ympäröimä, lähin hiekkaranta on 40 km päässä Pacific Harbourissa;
  Suvan oma rantaviiva on mangroverantaa. Merkittävä osa keskustasta,
  parlamenttirakennukset mukaan lukien, on rakennettu täytetylle
  mangrovesuolle. — en-Wikipedia "Suva"

**Nosto L3 — "Joki joka kantaa kolmasosan Fidžin sateista" (518 merkkiä)**

> Rewajoki on Fidžin pisin ja leveäkin joki – se kuivattaa saaren
> sateisinta kolmannesta ja tekee siitä koko Etelä-Tyynenmeren
> suurimman joen. Joki syntyy Wainibukan ja Wainimalan latvavesien
> yhtymäkohdasta ja laskee Laucala Bayhin lähellä Suvaa 240
> neliökilometrin suistoalueen kautta. Suistossa elää muun muassa
> uhanalainen härkähai, ja alajuoksun hedelmällisillä lietemailla
> viljellään riisiä ja vihanneksia sekä pidetään lehmiä. Suistokylät
> tunnistavat vuosittain palaavat trooppiset syklonit tuhoisimmaksi
> uhakseen.

Faktat ja lähteet:
- Rewajoki on Fidžin pisin ja leveäkin joki; se syntyy Wainibukan
  ja Wainimalan latvavesien yhtymäkohdasta ja laskee Laucala Bayhin
  Suvan lähellä 240 km² suistoalueen kautta. Se kuivattaa saaren
  sateisimman kolmanneksen ja on siten Etelä-Tyynenmeren ja Fidžin
  suurin joki. — en-Wikipedia "Rewa River"
- Alajuoksulla elää uhanalainen härkähai (Carcharhinus leucas);
  suiston hedelmällisillä lietemailla viljellään riisiä ja
  vihanneksia sekä pidetään lehmiä maitokarjana. — en-Wikipedia
  "Rewa River"
- Joen tulvat ovat trooppisten syklonien voimistamia ja voivat olla
  tuhoisia. — en-Wikipedia "Rewa River"

**Nosto L4 — "Sademetsä jonka prinssi vihki kruununperinnölle" (441 merkkiä)**

> Colo-i-Suva-sademetsäpuisto vain kymmenien minuuttien ajomatkan
> päässä keskustasta tarjoaa vaellusreittejä, putouksia ja uinti-
> altaita – Suvan asukkaiden suosima pako kaupungin melusta.
> Puiston vanhaa alkuperäiskasvillisuutta täydentävät 1940–50-luvuilla
> istutetut afrikkalaiset mahonkipuut. Lokakuussa 2018 prinssi Harry
> vieraili puistossa ja vihki sen osaksi Kansainyhteisön
> kuningatarkruunun metsäverkostoa (Queen's Commonwealth Canopy).

Faktat ja lähteet:
- Colo-i-Suva Forest Park tarjoaa vaellusreittejä, uintipaikkoja ja
  lintubongausta noin 4,5 km luonnonpolkuja pitkin; puisto on osa
  Queen's Commonwealth Canopy -metsäverkostoa. — en-Wikipedia
  "Colo-i-Suva Forest Reserve"
- Afrikkalaista mahonkia istutettiin 1940- ja 1950-luvuilla vanhan
  alkuperäiskasvillisuuden joukkoon. — en-Wikipedia "Colo-i-Suva
  Forest Reserve"
- Prinssi Harry vieraili puistossa 24.10.2018 ja vihki sen
  Kansainyhteisön kuningatarkruunun metsäverkostoon (Queen's
  Commonwealth Canopy). — en-Wikipedia "Colo-i-Suva Forest Reserve"
  (HUOM: artikkelin infobox antaa puiston perustamisvuodeksi 1952,
  mutta leipäteksti sanoo "Established in 1872" — ristiriita, ks.
  osio 7 huomio 4.)

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

Faktat on valittu niin, etteivät ne toista osion 2 nostoja tai
kulttuurivisan vastauksia sanasta sanaan.

**Jakso 1 — "Yaqonan malja"**

Kava-kasvi (yaqonaksi kutsuttu Fidžissä) kesytettiin Vanuatussa noin
3 000 vuotta sitten ja levisi Tyynellemerelle lapita-kulttuurin
mukana – Fidži on yksi harvoista paikoista, missä sitä on kasvatettu
alkuperäisesti. Perinteinen malja tarjoillaan puolikkaasta
kookospähkinän kuoresta ("bilo"), ja vieraan odotetaan ottavan sen
vastaan molemmin käsin. Maailman terveysjärjestö arvioi vuonna 2016
perinteisen, vesipohjaisen kavajuoman terveysriskin "hyväksyttävän
matalaksi" – toisin kuin väkevillä liuottimilla valmistetut
uute-tuotteet, joita monet maat rajoittivat 2000-luvun alussa.

Faktat ja lähteet:
- Kava (Piper methysticum) kesytettiin noin 3 000 vuotta sitten
  Pohjois-Vanuatussa ja levisi lapita-kulttuurin mukana muualle
  Tyynellemerelle; se on endeeminen Oseanialle. — en-Wikipedia
  "Kava"
- Fidžissä kavaa kutsutaan nimellä yaqona (tai yagona); perinteinen
  malja tarjotaan usein puolikkaasta kookospähkinän kuoresta
  ("bilo"). — en-Wikipedia "Kava"
- WHO arvioi 2016 raportissaan perinteisen vesipohjaisen kava-
  juoman kohtuukäytön terveysriskin "hyväksyttävän matalaksi";
  orgaanisilla liuottimilla valmistetut uutteet sen sijaan liitetään
  kohonneeseen maksavaurioriskiin, minkä vuoksi useat maat rajoittivat
  niitä 2002. — en-Wikipedia "Kava"

**Jakso 2 — "Kaksitoista maata, yksi kampus"**

Etelä-Tyynenmeren yliopiston (USP) Laucala Bayn pääkampus Suvassa
sijaitsee entisen Uuden-Seelannin ilmavoimien Laucala Bayn tukikohdan
paikalla. Yliopisto perustettiin 1968, ja se palvelee aluetta, joka
kattaa 33 miljoonaa neliökilometriä Tyynenmerta – yli kolme kertaa
Euroopan kokoisen vesialueen, vaikka jäsenmaiden yhteinen maapinta-ala
vastaa vain Tanskan kokoa. Yliopistolla on 11 aluekeskusta eri puolilla
Tyyntämerta, ja jäsenmaiden väkiluku vaihtelee Tokelaun 1 500 asukkaasta
Fidžin yli 900 000 asukkaaseen.

Faktat ja lähteet:
- USP:n Suvan kampus sijaitsee entisen Uuden-Seelannin ilmavoimien
  RNZAF Station Laucala Bay -tukikohdan paikalla; se on USP:n suurin
  kampus ja suurin yliopisto Tyynenmeren saarilla Havaijin
  ulkopuolella. — en-Wikipedia "Suva"
- USP perustettiin 1968. — en-Wikipedia "University of the South
  Pacific"
- USP:llä on 11 aluekeskusta Tyynenmeren saarivaltioissa; alue
  kattaa 33 miljoonaa km² merta (yli kolme kertaa Euroopan koko),
  mutta jäsenmaiden yhteinen maapinta-ala vastaa Tanskan kokoa.
  Jäsenmaiden väkiluku vaihtelee Tokelaun 1 500 asukkaasta Fidžin
  yli 900 000 asukkaaseen. — en-Wikipedia "University of the South
  Pacific"

**Jakso 3 — "Curry joka syntyi laivamatkasta"**

Suvan ruokakulttuuri kertoo kaupungin väestöhistorian maulla:
fidžiläinen, intialainen, kiinalainen ja amerikkalainen ruoka
elävät rinnakkain. Intialaista syntyperää olevat sopimustyöläiset
toivat 1880-luvulta alkaen mukanaan mausteita, chilejä ja yrttejä,
joista syntyi ajan myötä oma fidžiläis-intialainen curry-perinne –
eri asia kuin Intian omat curryt. Perinteinen fidžiläinen lovo-
uunipaisto (hauta kuumiin kiviin) elää edelleen juhlaruokana monissa
kylissä ja perhejuhlissa Suvan ympärillä.

Faktat ja lähteet:
- Suva tarjoaa monikulttuurisen keittiön: fidžiläistä, intialaista,
  kiinalaista, amerikkalaista ja muuta ruokaa. Intialaista syntyperää
  olevat fidžiläiset ovat muovanneet Fidžin ruokakulttuuria ja
  luoneet oman fidžiläis-intialaisen curryn; sopimustyöläiset toivat
  mukanaan mausteita, chilejä ja muita yrttejä ja vihanneksia, jotka
  ovat nyt osa fidžiläistä keittiötä. — en-Wikipedia "Suva"
- **HUOM lovosta:** lovo-uuniruokaa (kuumiin kiviin haudattu ateria)
  ei löytynyt mainittuna suoraan Suva-artikkelista tässä haussa –
  se on tehtävänannon nimeämä painopiste, mutta kaipaa oman
  lähdetarkistuksen (esim. artikkelista "Fijian cuisine" tai "Lovo"),
  jota ei tehty tässä faktapohjassa. Ks. osio 7 huomio 5.

**Jakso 4 — "Kadut jotka eivät ole muuttuneet"**

Cumming Street on ollut vilkas ja värikäs ostosalue siirtomaa-ajoista
lähtien – kapeine katuineen ja alkuperäisine siirtomaa-arkkitehtuu-
reineen se on Suvan vanhin yhtenäinen kauppakatu. Vuonna 1909
rakennettu Carnegie-kirjasto on yksi kaupungin tunnetuimmista
siirtomaa-ajan rakennuksista ja edelleen käytössä. Nykyaikaisemmat
ostoskeskukset kuten TappooCity, valmistuttuaan 2009, ovat Etelä-
Tyynenmeren suurimpia ostoskeskuksia Australian ja Uuden-Seelannin
ulkopuolella.

Faktat ja lähteet:
- Cumming Street on ollut vilkas ja värikäs ostosalue siirtomaa-
  ajoista lähtien, alkuperäisine siirtomaa-arkkitehtuureineen ja
  kapeine katuineen. — en-Wikipedia "Suva"
- Suvan Carnegie-kirjasto rakennettiin 1909 ja on yksi kaupungin
  monista siirtomaa-ajan rakennuksista. — en-Wikipedia "Suva"
- TappooCity valmistui 2009 yhteisyrityksenä FNPF:n ja Tappoo Groupin
  kesken; se on Etelä-Tyynenmeren suurin ostoskeskus Australian ja
  Uuden-Seelannin ulkopuolella. — en-Wikipedia "Suva"

**Jakso 5 — "Milloin kannattaa tulla"**

Suvassa ei ole varsinaista kuivaa kautta, mutta kesäkuun ja
lokakuun välillä sataa selvästi vähemmän kuin marraskuusta
toukokuuhun. Lämpötila pysyy ympäri vuoden tasaisena, keskimäärin
noin 22–28 asteessa – trooppiselle sademetsäilmastolle tyypilliseen
tapaan. Trooppiset syklonit voivat osua saarelle marraskuusta
huhtikuuhun, joten se kannattaa ottaa huomioon matkoja suunnitel-
lessa.

Faktat ja lähteet:
- Suvalla on trooppinen sademetsäilmasto (Köppen); keskilämpötila
  pysyy suhteellisen tasaisena ympäri vuoden, keskiylin noin 28 °C
  ja keskialin noin 22 °C. Runsain sade osuu marras–toukokuulle,
  kun taas kesä–lokakuu on selvästi vähäsateisempi (joskaan ei
  kuiva). — en-Wikipedia "Suva"
- **HUOM:** ilmastotiedot ovat en-Wikipedian Climate-osiosta eivätkä
  vastaa pelin `saatiedot.js`-riville tarvittavaa ERA5 1991–2020
  -normaalia; tarkat kuukausinormaalit haetaan kirjoitusvaiheessa
  `tools/hae-saanormaalit.mjs`-työkalulla (ks. osio 6).
- Trooppiset syklonikaudet Fidžillä osuvat marraskuusta huhtikuuhun.
  — en-Wikipedia "Rewa River" (syklonien vaikutus tulviin mainittu
  tässä artikkelissa; yleinen kausitieto yhteensopiva Suva-artikkelin
  kanssa).

---

## 4. Kahdeksan kohdekartan kohdetta + vertailupiste

Koordinaatit poimittu suoraan artikkeleiden infoboxeista (desimaali-
muodossa jo valmiina useimmissa) sekä Commonsin/Wikipedian
`action=query&prop=coordinates`-rajapinnasta kolmelle kohteelle,
joilla ei ollut infobox-koordinaattia (Sacred Heart Cathedral, HFC
Bank Stadium). Etäisyydet ja suunnat OMIA LASKELMIANI koordinaatti-
eroista (asteet × 111 km, pituusasteille kerrottu cos(18,147°) ≈
0,9506), tarkistettu Node-skriptillä — sama menetelmä kuin
faktapohja-adelaide.md:ssä ja faktapohja-christchurch.md:ssä.

**Vertailupiste on Grand Pacific Hotel** (spec-mantereet.md sääntö 4:
kartan keskusta valitaan historiallisen ytimen mukaan, ei hallinnol-
lisen koordinaattipisteen). Valinta on poikkeuksellisen perusteltu
Suvassa: hotelli rakennettiin nimenomaan "alkuperäisen Suva-kylän
rantautumispaikalle" (paikka tunnettiin nimellä Vu-ni-vesi lähellä
kasvavien puiden mukaan) täytetylle maalle Suva Harbourin rannassa –
se on siis kirjaimellisesti kohta, josta koko kaupunki alkoi kasvaa,
eikä pelkkä hallinnollinen keskipiste. Wikipedian Suva-pääartikkelin
oma infobox-koordinaattipiste (18,1416°S 178,4419°I) osoittautui
tarkistuksessa olevan käytännössä sama piste kuin Sacred Heart
-katedraalin koordinaatti (18,1416°S 178,442°I) — ei siis mikään
erillinen "kaupungin keskipiste", vaan yhden tietyn rakennuksen
sijainti; tästä syystä sitä ei käytetty vertailupisteenä (ks. myös
osio 7 huomio 3).

| # | Nimi | Koordinaatit (desimaali) | Lähdeartikkeli | Etäisyys/suunta vertailupisteestä |
|---|---|---|---|---|
| 1 | Grand Pacific Hotel (vertailupiste) | 18,1469°S 178,4225°I | "Grand Pacific Hotel (Fiji)" | (vertailupiste) |
| 2 | Albert Park | 18,1473°S 178,4249°I | "Albert Park (Suva)" | ~0,26 km itään |
| 3 | Parlamentin rakennukset (Government Buildings) | 18,145858°S 178,424413°I | "Parliament of Fiji" | ~0,23 km koilliseen |
| 4 | Thurston Gardens | 18,1491°S 178,4247°I | "Thurston Gardens" | ~0,34 km kaakkoon |
| 5 | Fiji Museum | 18,1495°S 178,4258°I | "Fiji Museum" | ~0,45 km kaakkoon |
| 6 | State House (ent. Government House) | 18,151892°S 178,426140°I | "Government House, Suva" | ~0,67 km kaakkoon |
| 7 | Sacred Heart Cathedral | 18,1416°S 178,442°I | "Sacred Heart Cathedral, Suva" | ~2,14 km itään |
| 8 | HFC Bank Stadium | 18,15°S 178,449167°I | "HFC Bank Stadium" | ~2,83 km itään |

Kahdeksan kohdetta täyttää pyydetyn 8–10 kohteen välin (vertailupiste
mukaan lukien 1). Etäisyydet klusteroituvat kahteen ryhmään: kuusi
ensimmäistä (0,23–0,67 km) ovat samaa tiivistä siirtomaa-ajan
hallintokeskusta, kun taas katedraali ja stadion (2,1–2,8 km) ovat
selvästi kauempana Suvan peninsulan itäosassa — silti molemmat ovat
kohdekartan järkevällä alueella, toisin kuin alla luetellut kaksi
kohdetta.

**Kaksi kauempana olevaa kohdetta, koordinaatit talteen mutta EI
taulukossa** (liian kaukana ydinklusterista mutta kytkeytyvät suoraan
nosto- ja jaksoehdotuksiin):

- **Colo-i-Suva Forest Reserve** (L4-nosto), 18°4'12"S 178°21'36"I
  (18,0700°S 178,3600°I) — n. 10,8 km luoteeseen vertailupisteestä.
  Selvästi kaupungin ulkopuolella, mutta suosittu päiväretkikohde.
- **Nausori** (Rewajoen kaupunki, mainittu L3-nostossa ja jaksossa 2
  Suva-Nausori-käytävän osana), 18°1'28"S 178°32'43,54"I (18,02444°S
  178,54542°I) — n. 18,8 km koilliseen vertailupisteestä. Suvan
  metropolialueen toinen napa, mutta liian kaukana kohdekartan
  tiiviille alueelle.

Etelä-Tyynenmeren yliopiston (USP) Laucala Bay -kampusta (jaksoehdotus
2) EI voitu sisällyttää tauluun: sillä ei ole omaa Wikipedia-
koordinaattia, eikä "Laucala Bay" -hakusanalla löytynyt erillistä
artikkelia. Kirjoittajan kannattaa hakea kampuksen tarkka koordinaatti
erikseen (esim. USP:n omalta verkkosivulta) ennen kohdekartan
piirtämistä, jos yliopisto halutaan mukaan pisteeksi.

---

## 5. Kuva-aiheet (Commons-kategoriat)

Kategoriat tarkistettu OLEMASSA OLEVIKSI ja niiden kuvamäärät
mitattu Commonsin `action=query&prop=categoryinfo`-rajapinnalla
24.8.2026 — pelkkä olemassaolo- ja määrätarkistus, SISÄLTÖÄ EI ole
silmäilty (se on kirjoittajan työ kuvasääntöjen mukaisesti). Commons-
haku osui 429-rajoitukseen useaan kertaan; odotin ja yritin uudelleen
resepti-ohjeen mukaisesti — ks. myös osio 7 huomio 7 kesken jääneistä
tarkistuksista.

**Avauskuvat (3):**
1. `Category:Suva` (92 tiedostoa, 78 kuvaa) — laaja yleiskuva
   kaupungista, esim. sataman tai peninsulan siluetti.
2. `Category:Albert Park (Suva)` (7 kuvaa) — kaupungin sydän ja
   itsenäisyysjulistuksen paikka.
3. `Category:Grand Pacific Hotel, Fiji` (17 kuvaa) — vertailupisteen
   maamerkki, laaja näkymä rantareunasta.

**Kansikuvat (3, LAAJOJA YLEISKUVIA — ei yksityiskohtia):**
1. `Category:Suva` — sataman tai niemen laaja näkymä.
2. `Category:Thurston Gardens` (9 tiedostoa, 7 kuvaa) — puiston ja
   kellotornin laaja näkymä.
3. `Category:Fiji Museum` (15 tiedostoa, 14 kuvaa) — museorakennus
   ympäristössään (varmistettava valinnassa, ettei kuva ole
   yksityiskohta- tai sisäkuva kansikuvasääntöjen mukaisesti).

**Nosto-/jaksokuvat, sivuittain (kategorioiden kuvamäärät suluissa
— Suva on pieni kaupunki, joten niukkuus on todennäköistä useassa
kategoriassa; mittaa itse ennen valintaa):**

*Kaupunki:*
- K1: `Category:Suva` (78 kuvaa) — ei erillistä kategoriaa Polynesia
  Companyn maakaupalle tai varhaiselle Suvalle; kirjoittajan
  kannattaa hakea myös vanhoja PD-postikortteja/valokuvia hakusanalla
  "Suva 1870s" tai "Suva historic" erikseen, koska tapahtuma on
  ennen valokuvausajan yleistymistä alueella.
- K2: `Category:People of Fiji` (184 kuvaa, 29 alakategoriaa) — HUOM:
  arvattu `Category:Fijians` EI OLE OLEMASSA Commonsissa (tarkistettu,
  palautti "missing") eikä myöskään `Category:Indo-Fijians` — tämä on
  juuri se kolmas kaatunut arvaus, josta tehtävänanto varoitti.
  `Category:People of Fiji` on oikea, olemassa oleva korvaaja ja
  kattaa molemmat väestöryhmät; sen alakategorioista kannattaa etsiä
  nimenomaan nykyistä arkea, ei seremoniaklišeitä.
- K3: `Category:Fiji Hindi language` (5 kuvaa — hyvin niukka) tai
  laajemmin `Category:People of Fiji` (yllä) girmit-perinnön
  nykykuvalle. Erillistä `Category:Girmit`-kategoriaa EI OLE
  (tarkistettu, "missing").
- K4: `Category:Grand Pacific Hotel, Fiji` (17 kuvaa).

*Historia:*
- H1: `Category:Seru Epenisa Cakobau` (37 kuvaa — OLEMASSA ja
  runsas, tarkistettu) — hyvä valikoima muotokuvia ja aikakauden
  kuvitusta Cakobausta.
- H2: Ei erillistä Commons-kategoriaa kai colo -sodalle löytynyt
  tässä haussa — kirjoittajan TARKISTETTAVA erikseen, ja muistettava
  kuvasäännöissä ettei kuva saa olla väkivaltaa korostava (sopiva
  vaihtoehto: aikakauden kartta tai maisemakuva Viti Levun sisä-
  maasta, tai `Category:Seru Epenisa Cakobau` -kategorian aikakauden
  kuvitus).
- H3: `Category:Suva` (78 kuvaa) — vanha kartta tai 1950-luvun
  kaupunkikuva (Suva postcard.jpg mainittu Suva-artikkelissa 1950-
  luvun keskustasta).
- H4: `Category:Albert Park (Suva)` (7 kuvaa).

*Luonto:*
- L1: `Category:Suva` (sadekuva/pilvinen taivas — TARKISTA erikseen).
- L2: `Category:Suva` — mangroverantakuva, TARKISTA erikseen onko
  omaa alakategoriaa mangroveille.
- L3: `Category:Rivers of Fiji` (10 kuvaa) — HUOM: arvattu
  `Category:Rewa River` EI OLE OLEMASSA Commonsissa (tarkistettu,
  "missing", eikä myöskään `Category:Rewa River, Fiji`); Rewajoelle
  ei ole omaa kategoriaa, vain koko maan jokien yhteiskategoria on
  käytettävissä, ja sekin on niukka (10 kuvaa).
- L4: `Category:Colo-i-Suva` (7 kuvaa — OLEMASSA, tarkistettu;
  artikkelin infobox-kuva "Colo-i-Suva big waterfall.jpg" antaa
  hyvän osviitan).

*Kohdekartta (täydentäviksi, ei nostoa varten):*
- `Category:Parliament of Fiji` (TARKISTA erikseen)
- ~~Category:Government House, Suva / State House, Fiji~~ — TARKISTETTU 24.8.2026: EI OLE OLEMASSA (myös ilmeiset vaihtoehtonimet puuttuvat) — kirjoittajan haettava oikea reitti Wikidatan kautta
  (TARKISTA erikseen, molemmat nimet mahdollisia)
- `Category:Sacred Heart Cathedral, Suva` (TARKISTA erikseen)
- ~~Category:HFC Bank Stadium~~ — TARKISTETTU 24.8.2026: EI OLE OLEMASSA

**REHELLINEN RAPORTTI KATEGORIOIDEN NIUKKUUDESTA:** Kymmenen
kategoriaa ehdittiin mitata tässä koosteessa 429-rajoitusten ja ajan
puitteissa: `Suva` (78 kuvaa), `Albert Park (Suva)` (7), `Thurston
Gardens` (7), `Fiji Museum` (14), `Grand Pacific Hotel, Fiji` (17),
`Colo-i-Suva` (7), `Seru Epenisa Cakobau` (37), `People of Fiji`
(184), `Fiji Hindi language` (5) ja `Rivers of Fiji` (10). KAIKKI
NÄMÄ OVAT OLEMASSA ja sisältävät kuvia, mutta useimmat ovat pieniä
(5–17 tiedostoa) — Suva on pieni kaupunki, ja kuvien niukkuus on
tässä todennäköistä juuri kuten tehtävänannossa varoitettiin. KOLME
ARVATTUA KATEGORIANIMEÄ EIVÄT OLLEET OLEMASSA (`Category:Fijians`,
`Category:Indo-Fijians`, `Category:Rewa River`, `Category:Rewa
River, Fiji`, `Category:Girmit`) — täsmälleen se riski, josta
tehtävänanto erikseen varoitti, ja korvaajat on merkitty yllä.
Loput kategoriat (merkitty "TARKISTA erikseen" yllä: Parliament of
Fiji, Government House / State House, Sacred Heart Cathedral, HFC
Bank Stadium) JÄIVÄT KOKONAAN TARKISTAMATTA — kirjoittajan on
ehdottomasti mitattava nekin itse ennen kuvahakua.

---

## 6. Säätiedot

Ks. osio 3, Jakso 5 — samat luvut, sama lähde (en-Wikipedian
Climate-osio, EI ERA5). Tarkat kuukausinormaalit ERA5 1991–2020
-aineistosta haetaan kirjoitusvaiheessa `tools/hae-saanormaalit.mjs`
-työkalulla lehtityö-reseptin ohjeen mukaisesti.

---

## 7. Ristiriidat, epävarmuudet ja huomiot

1. **Vahvin löytämäni 1873-osuma on se, ettei Suva 1873 ollut vielä
   olemassakaan kaupunkina.** Fidžin pääkaupunki oli Levuka, maa
   ei ollut vielä Britannian siirtomaa (luovutus vasta 10.10.1874),
   ja koko Suvan seutu oli vasta viisi vuotta aiemmin (1868) Cakobaun
   lahjoittamaa, kariutuneeseen puuvillahankkeeseen käytettyä maata.
   Tämä on poikkeuksellisen vahva "isoisän matkan vuosi" -kulma,
   koska se kääntää tavanomaisen kaavan ympäri: isoisän matkakirja
   ei voi kuvata "Suvaa" sellaisena kuin pelaaja sen tuntee, koska
   sitä paikkaa ei vielä ollut. Suosittelen pitämään tämän K1-noston
   kaupunkisivun avausnostona tai vähintään voimakkaasti esillä —
   sama rooli kuin Christchurch-mallin H3:lla (katedraalin
   rakennustyön uudelleenkäynnistys 1873).
2. **Samaan vuoteen 1873 osuu myös kai colo -sota (H2-nosto), joka
   vaatii erityistä ikäsopivuusharkintaa.** Alkuperäinen Wikipedia-
   teksti kuvaa yksityiskohtaisesti sotilaallisia rankaisuretkiä,
   kylien polttamista, dynamiitin käyttöä ja vankien myyntiä
   orjuuteen. Olen tiivistänyt tämän neutraaliksi, ei-graafiseksi
   versioksi Raamatun pilarin 4 ja spec-mantereet.md:n Oseania-
   linjauksen mukaisesti, mutta jätän päätöksen sen käytöstä
   kokonaan päätoimittajalle — ks. nostoehdotuksen oma
   "KÄSITTELYOHJE"-huomautus osiossa 2.
3. **Suva-pääartikkelin infobox-koordinaattipiste (18,1416°S
   178,4419°I) osoittautui olevan sama piste kuin Sacred Heart
   -katedraalin koordinaatti.** Tämä ei ole hallinnollinen "kaupungin
   keskipiste" vaan yhden rakennuksen sijainti, joka sattuu olemaan
   Wikipedian koordinaattimallineen oletusarvo koko kaupungille.
   Käytin siksi Grand Pacific Hotelia vertailupisteenä spec-
   mantereet.md:n säännön 4 mukaisesti (historiallinen ydin, ei
   hallinnollinen piste) — sama päättelytapa kuin San Francisco- ja
   Christchurch-ennakkotapauksissa.
4. **Colo-i-Suva Forest Reserve -artikkelissa on sisäinen ristiriita
   perustamisvuodesta:** infobox antaa `established = 1952`, mutta
   leipäteksti sanoo "Established in 1872". En pystynyt tässä
   koosteessa selvittämään kumpi on oikea (Protected Planetin lähde
   viittaa infobox-arvoon 1952, mutta leipätekstin 1872 saattaa
   viitata alkuperäiseen metsänsuojelupäätökseen ennen virallista
   suojelualuestatusta). Suosittelen kirjoittajaa joko välttämään
   tarkkaa perustamisvuotta tekstissä tai tarkistamaan asian
   erikseen ennen julkaisua.
5. **Lovo-uuniruokaa (tehtävänannon nimeämä painopiste) ei löytynyt
   suoraan mainittuna Suva-artikkelista.** Jakso 3:ssa on tästä
   erillinen HUOM — kirjoittajan kannattaa hakea aihe erikseen
   (esim. "Fijian cuisine" tai "Lovo") ennen käyttöä, koska tämä
   faktapohja ei sisällä tarkistettua lovo-faktaa.
6. **Grand Pacific Hotelin ja Indo-Fijians-artikkelin lähdeteksteissä
   on runsaasti mainintoja Fidžin vallankaappauksista (1987, 2000,
   2006) niiden vaikutuksesta matkailuun, talouteen ja politiikkaan.**
   Näitä EI ole otettu mukaan yhteenkään faktaan tai nostoon Raamatun
   ja spec-mantereet.md:n eksplisiittisen kiellon mukaisesti. K4-
   noston lähdehuomautuksessa mainitsen tämän poisjätön näkyvästi,
   jotta kirjoittaja ei vahingossa lisää sitä myöhemmin lähdeartikkelia
   uudelleen lukiessaan.
7. **Kolme arvattua kategorianimeä eivät olleet olemassa** —
   `Category:Fijians`, `Category:Indo-Fijians` ja `Category:Rewa
   River` (myös `Category:Rewa River, Fiji` ja `Category:Girmit`
   puuttuvat) palauttivat kaikki Commonsista "missing". Tämä on
   täsmälleen se sudenkuoppa, josta tehtävänanto varoitti kolmen
   aiemman kaatumisen perusteella. Korvaajat löytyivät ja on merkitty
   osioon 5: `Category:People of Fiji` (184 kuvaa), `Category:Fiji
   Hindi language` (5 kuvaa) ja `Category:Rivers of Fiji` (10 kuvaa).
   Loppuja kategorioita (Parliament of Fiji, Government House / State
   House, Sacred Heart Cathedral, HFC Bank Stadium) ei ehditty
   mitata 429-rajoitusten ja ajan vuoksi — ks. osio 5:n rehellinen
   raportti kokonaisuudessaan.
8. **En löytänyt erillistä artikkelia Suva Municipal Marketille**
   (tehtävänannon nimeämä painopiste). Suva-artikkeli mainitsee
   yleisesti "many thriving markets and shopping complexes" ja
   nimeltä Cumming Streetin, Terry Walkin ja "Flea Marketin", mutta
   ei mainitse nimeltä "Suva Municipal Market" tai "Suva Market".
   Paikka on hyvin dokumentoitu matkaoppaissa ja todennäköisesti
   sama kuin joku näistä — kirjoittajan kannattaa tarkistaa asia
   Wikivoyage- tai muusta lähteestä, koska tämä faktapohja nojaa
   vain en-Wikipediaan.
9. **Kahdeksan kohdekartan kohdetta jakautuu kahteen selvään
   klusteriin** (0,23–0,67 km ydinalue vs. 2,1–2,8 km katedraali ja
   stadion) — poikkeaa hieman tiiviimmästä Christchurch-mallista
   (0,05–3,14 km yhtenäisempänä kaarena). Kirjoittajan kannattaa
   harkita, mahtuvatko kaikki kahdeksan samalle kohdekartalle
   luontevasti vai kannattaako karttaa venyttää itään.
10. **Vain en-Wikipediaa ja sen raakatekstiä (action=raw) käytetty
    kaikkiin varsinaisiin faktoihin**, paitsi Commons-kategorioiden
    olemassaolo- ja määrätarkistukseen (osio 5) ja kolmen kohde-
    kartan pisteen koordinaattihakuun (osio 4), jotka käyttivät
    `action=query`-rajapintoja vain teknisten metatietojen
    hakemiseen — EI sisällön tarkistamiseen. Ei ulkopuolisia hakuja
    tämän faktapohjan varsinaiseen sisältöön.
11. **`docs/mantereet-tyoaineisto/spec-mantereet.md` oli tehtävän-
    annon lukulistalla** ja sen Oseania-osio (mm. "Tyynenmeren saaret
    (suva, portvila, honiara, noumea): ydinkoehistoria (Ranska) ja
    toisen maailmansodan taistelut (Guadalcanal) ovat perushistoriaa")
    on huomioitu — Fidži ei kuitenkaan ollut Ranskan ydinkoealue eikä
    Guadalcanalin taistelujen näyttämö (se on Salomonsaarilla), joten
    tämä erityismaininta ei koskenut Suvaa suoraan tässä haussa.
    Fidžin oma toisen maailmansodan rooli (Fiji-taisteluosastot
    Guadalcanalin ja Bougainvillen kampanjoissa, ks. "Colony of
    Fiji") olisi silti mahdollinen lisänosto, jos päätoimittaja
    haluaa laajentaa historiasivua.

---

## 8. Päällekkäisyyksien välttäminen

**`js/packs/oceania-questions.js`, kohta `suva` (viisi kysymystä):**

1. Minkä saarivaltion pääkaupunki Suva on? (Fidži, taso 2) — vastaus
   on itsestäänselvä kaikkialla tässä faktapohjassa; ei erillistä
   kiertämistarvetta, koska kysymys on hyvin yleisluontoinen eikä
   yksikään nostoteksti keskity pelkästään tähän.
2. Mikä kuvitteellinen viiva kulkee Fidžin lähellä? (päivämäärän
   vaihtumislinja, taso 3) — EI toistettu missään nostossa tai
   jaksossa tässä faktapohjassa; aihetta ei käsitelty lainkaan, koska
   tehtävänanto ei nimennyt sitä painopisteeksi.
3. Mikä on Fidžin pääsaari, jolla Suva sijaitsee? (Viti Levu, taso 1)
   — Viti Levu mainitaan useissa nostoissa (mm. H2, L2, L3) taustana,
   mutta yksikään nosto ei rakennu pelkästään tämän faktan varaan;
   kysymyksen vastaus ei siis "vuoda" mihinkään yksittäiseen
   tekstikohtaan liian suorasti.
4. Mikä juoma kuuluu Fidžin perinteisiin tervehdysseremonioihin?
   (kava, taso ei mainittu) — Jakso 1 käsittelee kavaa, mutta
   TARKOITUKSELLA eri faktoilla: kysymyksen `fact`-kenttä kertoo
   valmistustavasta (pippurikasvin juuresta) ja vastaanottotavasta
   (kaksin käsin); jaksoni kertoo sen sijaan kasvin alkuperästä
   Vanuatussa 3 000 vuotta sitten, bilo-kuoresta ja WHO:n 2016-
   turvallisuusarviosta. `OCEANIA_FACTS.suva`:n isoisän repliikki
   mainitsee myös kavan ("juuresta valmistettu juoma tarkassa
   järjestyksessä") — jaksoni EI toista tätä sanamuotoa.
5. Mikä on Etelä-Tyynenmeren yliopiston erityispiirre? (kahdentoista
   maan yhteisomistus, taso 3) — Jakso 2 käsittelee USP:tä, mutta
   TARKOITUKSELLA eri faktoilla: perustamisvuosi 1968, entinen
   RNZAF-tukikohta, 11 aluekeskusta, 33 miljoonan km² alue ja
   jäsenmaiden väkilukuvaihtelu — EI mainita "kahdentoista maan
   omistusta", koska se on jo kysymyksen oma vastaus ja fact-kenttä.

**`OCEANIA_FACTS.suva`-taulun rivit (kaksi asiafaktaa + isoisän
repliikki):**

- "Suva on Etelä-Tyynenmeren suurimpia kaupunkeja ja alueen yliopiston
  sijaintipaikka." — yleistasoinen; K2- ja jakso 2 -tekstini
  syventävät tätä uusilla yksityiskohdilla toistamatta sanamuotoa.
- "Fidži koostuu yli 300 saaresta, joista noin sata on asuttuja." —
  ei toistettu missään tämän faktapohjan tekstissä; aihe (koko Fidžin
  saaristo) ei ollut tehtävänannon painopiste Suvan kaupunkitasolla.
- "Päivämäärän vaihtumislinja kulkee saarten läpi, mutta koko maa
  noudattaa samaa päivää." — ei toistettu, sama peruste kuin
  kysymys 2 yllä.
- Isoisän repliikki kavasta ("Saarivaltiossa tarjotaan vieraalle
  juuresta valmistettua juomaa tarkassa järjestyksessä...") —
  Jakso 1:ni käsittelee kavaa eri näkökulmasta (kasvin alkuperä,
  bilo-kuori, WHO-arvio) niin kuin yllä on selitetty kohdassa 4.

## Korjaushistoria 24.8.2026 (tarkistus-suva.md:n jälkeen, Fable)

1. 1873-kehyksen ylilyönti korjattu: Suvan PIENI KYLÄ oli olemassa jo 1868 (lähteen oma virke) — "nimetön maapala" ja "ei edes kunnollista kylää" poistettu; kaupunkia ei ollut, kylä oli.
2. H2:n loppuun lisätty elävän nykypäivän virke (päätoimittajan Kai Colo -päätöksen 4. ehto).
3. Kolme arvattua Commons-kategoriaa merkitty tarkistetusti puuttuviksi.
