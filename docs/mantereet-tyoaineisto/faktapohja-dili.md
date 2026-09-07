# Dili — faktakoostaja, uusi kaupunkilehti (Oseanian lauta)

Lauta-id `oceania`, kaupunki-id `dili`, maa TLS (Itä-Timor), en-Wikipedia
"Dili" ellei toisin mainita. Kaikki tiedot haettu en-Wikipediasta
**7.9.2026** (`action=raw`; `NODE_USE_ENV_PROXY=1`; User-Agent
`Matkakirja/1.0 (https://github.com/ravelius/Matkakirja)`). Jokainen haettu
otsikko tarkistettu #REDIRECT-rivin varalta — **kolme ohjausta löytyi**:
"Ataúro" → "Atauro", "Tetum language" → "Tetun language", "Palácio do
Governo (Dili)" → "Government Palace, Dili". Neljä otsikkoa palautti 404:n
eikä niitä käytetä lainkaan: "Arquivo & Museu da Resistência Timorense"
(oikea otsikko on "Timorese Resistance Archive and Museum"), "Farol, Dili",
"Dili Lighthouse" ja "Uma lulik".

Luettu ennen työtä: `js/tyohuone-raamattu.js` (Perustuslaki, Kuvat ja
lähteet), `docs/aasia-tyoaineisto/lehtityo-resepti.md`,
`docs/moduulit/kaupunkilehti.md`, `docs/mantereet-tyoaineisto/
spec-mantereet.md`, mallina `docs/mantereet-tyoaineisto/faktapohja-cairns.md`
ja sen tarkistus. Luettu myös kaikki, mitä pelissä jo on Itä-Timorista ja
Dilistä — ks. osio 7.

**Tehtävän erityispiirre:** tämä on raaka-aine kirjoittajalle ja
tarkistajalle. Lehtitekstejä, kuvia tai js/packs-muutoksia ei tehty tässä
vaiheessa.

**SISÄLTÖLINJAUS (tehtävänanto 7.9.2026 + Raamatun pilarit 3 ja 4):**
Itä-Timorin historia kerrotaan asiallisesti, mutta **nykypolitiikkaa ja
nykyväkivaltaa ei käsitellä** (Myanmar-linja). Käytännössä tämä sulkee
pois: Indonesian miehityksen väkivallan yksityiskohdat, Santa Cruzin
verilöylyn 1991, vuoden 1999 kriisin, vuoden 2006 kriisin, vuoden 2008
murhayritykset, nykyiset puolueet ja nykyiset johtajat. Miehityskausi
1975–1999 ja itsenäistyminen 2002 saavat esiintyä **päivämäärinä ja
kehyksenä**, eivät tapahtumakuvauksina. Toinen maailmansota kerrotaan
tapahtumana kuten Cairnsin ja Darwinin lehdissä: se on kahdeksankymmenen
vuoden takaista historiaa, ei nykyväkivaltaa.

**Isoisän matkan vuosi 1873:** Dili oli jo olemassa ja oli ollut
Portugalin Timorin pääkaupunki vuodesta 1769. Osuma on silti tarkka:
kaupunkia oli juuri tuolloin rakennettu uudelleen. Vuoden 1866 tulipalo
tuhosi linnoituksen ja suuren osan kaupungista, uuden jalkaväkikasarmin
(nykyinen Casa Europa) rakentaminen alkoi 1871, sataman merikartta
julkaistiin 1870 ja uusi kuvernöörin palatsi rakennettiin 1874–1881.
Vuonna 1873 kaupunki oli siis rakennustyömaa.

---

## 1. Sivuehdotukset

### Sivu A — id `kaupunki`, nimi "Dili"

**Johdanto:** Dili on ollut Portugalin Timorin pääkaupunki vuodesta 1769,
ja isoisän matkan aikaan se oli rakennustyömaa: tulipalo oli syönyt
linnoituksen ja puolet kaupungista, ja uutta nousi ruutukaavaan
kuivatun suoalueen päälle.

### Sivu B — teemasivu, id `luonto`, nimi "Vuorten ja meren välissä"

**Perustelu:** kaupunkisivu on historiapainotteinen, ja aineisto kantaa
selvästi toisen teeman: Dili on puristettu kapealle rantatasangolle
vuorten ja meren väliin, ja koko kaupungin ongelmat ja rikkaudet
seuraavat siitä. Vakioaihe `luonto` on AIHE_IKONIT-taulussa.

---

## 2. Kahdeksan nostoehdotusta (4 + 4)

### Sivu `kaupunki`

**K1 — "Pääkaupunki vieraan kuninkaan maalla" (1769).**
Vuonna 1769 Portugalin Timorin kuvernööri António José Teles de Meneses
siirsi hallinnon ja 1 200 ihmistä itään ja perusti uuden pääkaupungin.
Alun perin oli tarkoitus asettua kauemmas itään Vemasseen, mutta
edullisen maaston takia asutus perustettiin Diliin. Paikka kuului
Motaelin kuningaskuntaan, jonka johtaja oli portugalilaisten ystävä.
Kuvernööri otti haltuunsa paikalla olleen linnoitetun rakennuksen ja
alkoi Motaelin johtajan avulla rakentaa uutta asutusta. Ympäristö oli
vuorilta tulevien jokien ruokkimaa kosteikkoa ja sopi riisinviljelyyn.
Rannikkokaupungin ja sen eteläpuolisten soiden väliin rakennettiin muuri.
Alkuperäinen asutus jakautui kolmeen väestöön: yksi pääosin
portugalilainen, yksi mestitsien ja muista Portugalin siirtomaista
tulleiden (siitä tuli Bidau) ja yksi joukoille, jotka olivat kotoisin
kuningaskunnasta, jonka arvellaan olleen Floresilla.
*Lähde: "Dili", osio "Initial Portuguese settlement".*

**K2 — SIGNAATTI-1873: "Kaupunki, joka rakennettiin uudelleen tuhkasta".**
Kuvernööri José Maria Marques saapui 1834 ja rakensi asutuksen uudelleen
ruutukaavaan. Kaupunki levisi rantaa pitkin ja etelään, kun vanhan
kaupungin ja Lahanen välinen kosteikko kanavoitiin ja kuivattiin; tie
vietiin Lahaneen ja Dareen. Uudelleenrakennus keskitti asutuksen sen
satamaan: satamanpuoleiseen ytimeen tulivat kauppatilat, kirkkorakennukset,
sotilasrakennukset, hallintorakennukset, kuvernöörin ja hänen sijaisensa
asunnot, Motaelin kuningaskunnan edustajan asunto ja Manatuton kuningattaren
asunto. Näistä vain kirkko ja valtiovarainhoitajan talo olivat kivestä.
Idässä oli Bidau ja kiinalaisten asuinalue, lännessä Motaelin
kuningaskunnan pääasutus. — Vuonna 1866 tulipalo tuhosi linnoituksen ja
suuren osan kaupungista; nykyisen Casa Europan rakentaminen linnoituksen
raunioille alkoi 1871 ja pääosa työstä tehtiin 1884–1899. — Vuonna 1870
julkaistiin T. Andrean ja T. Machadon kartta *Plano do Porto e Cidade de
Dilly*, joka osoittaa sataman merenmittauksen valmistuneen: ankkuripaikkaa
suojasi toisella puolen majakka ja toisella Carqueton linnake, ja kartassa
näkyy Dom Luís I:n mukaan nimetty laituri. — Uusi kuvernöörin virka-asunto
rakennettiin 1874–1881 ja uusi kirkkorakennus 1877.
*Lähteet: "Dili" (Initial Portuguese settlement); "Casa Europa" (History);
"Port of Dili" (Portuguese colonial era); "Government Palace, Dili" (The
old palace).*

**K3 — "Neutraali satama kahden sotajoukon välissä" (1941–1945).**
Portugali ja sen siirtomaat pysyivät toisessa maailmansodassa
puolueettomina, mutta liittoutuneet pitivät Itä-Timoria mahdollisena
japanilaisten kohteena. Kun Tyynenmeren sota alkoi 1941, australialaisia
ja hollantilaisia joukkoja lähetettiin Diliin Portugalin vastalauseista
huolimatta; 400 miehen yhdistetty osasto miehitti Portugalin Timorin 17.
joulukuuta 1941, ja kuvernööri julisti itsensä vangiksi säilyttääkseen
puolueettomuuden näön. Japanilaiset nousivat maihin Dilissä 19.–20.
helmikuuta 1942. Australialaiset komppaniat vetäytyivät vuorille ja
tekivät sieltä iskuja timorilaisten oppaiden, kantajien ja vuoriponien
avulla. Kun Japani antautui syyskuussa 1945, Dili ja etenkin sen
keskusta oli molempien osapuolten pommitusten jäljiltä raunioina.
Casa Europa säilyi, koska siinä oli japanilaisten esikunta.
*Lähteet: "Dili" (Destruction, reconstruction, and Indonesian rule);
"Battle of Timor" (Background, Japanese invasion); "Government Palace,
Dili" (The old palace); "Casa Europa" (History).*

**K4 — "Torin tetum" (Tetun Prasa).**
Tetum levisi keski- ja itä-Timorille kontaktikielenä jo 1400-luvulla
Wehalin kuningaskunnan aikana. Portugalilaiset asettuivat pääosin länteen,
jossa puhuttiin dawania, ja vasta kun pääkaupunki siirrettiin 1769
Lifausta Diliin, he alkoivat edistää tetumia siirtomaansa alueiden
väliseksi kieleksi. Timor oli yksi harvoista Portugalin siirtomaista,
joissa lingua francaksi tuli paikallinen kieli eikä portugalin muunnos —
syynä oli epäsuora hallinto paikallisten kuninkaiden kautta. Dilissä
syntyi siirtomaa-aikana muoto **Tetun Prasa** ("torin tetum",
portugalin sanasta *praça*, tori) eli **Tetun Dili**, joka on
kieliopiltaan yksinkertaisempi ja täynnä portugalilaisia lainasanoja;
Ethnologue luokittelee sen tetum-pohjaiseksi kreoliksi. Ethnologuen mukaan
Itä-Timorissa oli 2004 noin 50 000 äidinkielistä ja noin 370 000
toisen kielen puhujaa. Vakioitu oikeinkirjoitus tuli voimaan
hallituksen asetuksella 1/2004 14. huhtikuuta 2004. Kaupungissa
kadunnimet ovat portugaliksi, opastekyltit tetumiksi.
*Lähteet: "Tetun language" (Names/dialects, History); "Dili"
(Demographics, Transport → Land).*

### Teemasivu `luonto` — "Vuorten ja meren välissä"

**L1 — "Tasainen maa loppuu yhdeksässä kilometrissä".**
Dili on Timorin pohjoisrannikolla pienellä tasaisen maan alueella,
jota vuoret ympäröivät. Kaupungin ydin on alle sadan metrin
korkeudella. Kaupunkialue ulottuu neljään Dilin kunnan hallintopostiin
(Cristo Rei, Dom Aleixo, Nain Feto, Vera Cruz), ja niiden 18 kaupunkimaisen
sucon yhteispinta-ala on 17 862 hehtaaria — mutta vain noin 37 prosenttia
eli 6 698 hehtaaria on riittävän tasaista rakentamiseen. Comoro-joki
virtaa kaupungin länsiosan läpi; sen valuma-alue ulottuu yhdeksän
kilometrin päähän sisämaahan, missä vuoret ovat 900 metriä korkeita, ja
joen yli vie vain kaksi ajoneuvosiltaa.
*Lähde: "Dili", osio "Geography" ja "Infrastructure".*

**L2 — "Kaksi vuodenaikaa, ei muuta".**
Dilin ilmasto on trooppinen savanni-ilmasto (Köppen Aw). Sadekausi
kestää marraskuusta huhtikuuhun ja kuiva kausi toukokuusta lokakuuhun.
Vuosien 2005–2013 mittausten mukaan sateisin kuukausi oli joulukuu
(keskimäärin 170 mm) ja kuivin elokuu (5,3 mm), ja vuosikeskiarvo oli
902 mm — vuosien välinen vaihtelu on suurta. Keskilämpötilat ovat
26–28 astetta, ja vuorokauden sisäinen vaihtelu on 10,8–13,8 astetta:
minimit noin 20 asteessa, maksimit yli 33 asteessa. Suurin mitattu
lämpötila vuoteen 2013 mennessä oli 36 astetta marraskuussa 2011 ja pienin
14 astetta elokuussa 2013.
*Lähde: "Dili", osio "Climate".*
**Sääruudun luvut (lentokentän asema, normaalikausi 1991–2020):** ylin
keskilämpötila 30,7–32,7 °C, alin 21,1–24,2 °C; sade tammikuussa 175,2 mm,
elokuussa 6,5 mm, syyskuussa 5,2 mm; sadepäiviä tammikuussa 14,2 ja
syyskuussa 0,9.

**L3 — "Kolme suojelualuetta kaupungin rajojen sisällä".**
Dilin alueella on kolme suojeltua luonnon monimuotoisuuden aluetta:
Behau, Cristo Rein suojelualue ja Tasitolu. Cristo Rein alue on
vuoristossa, joka erottaa keskustan Herasta. Tasitolu on Dilin ja
Liquiçán kuntien rajan tuntumassa lännessä ja kattaa maata ja
rannikkovesiä; sitä kehitetään virkistysalueeksi ja pyhänä pidetyksi
paikaksi. Behau kattaa suuren osan itäisen Dilin edustan merestä sekä
rannikkoalueita Herassa ja siitä itään; se on ehdotuksista uusin ja
hallitus harkitsee sen korvaamista pienemmillä alueilla. BirdLife
International on määrittänyt Cristo Rein suojelualueen ja Tasitolun
tärkeiksi lintualueiksi. **Pinta-alalukuja ei käytetä: ks. tarkistus,
kohta C.**
*Lähde: "Dili", osio "Ecology".*

**L4 — "Meriruoho, dugongit ja valaat".**
Dilin ympäristö tuottaa luontaisesti kuivaa lehtimetsää. Rannikon
mangrovelajeihin kuuluu silmälläpidettävä *Ceriops decandra*.
Meriruohoniityt elättävät dugongeja ja merikilpikonnia, ja edustan
avovesillä liikkuu delfiinejä ja valaita.
*Lähde: "Dili", osio "Ecology".*

---

## 3. Matkaoppaan jaksoehdotukset

1. **Perille ja liikkeelle.** Presidente Nicolau Lobato -lentoasema on
   maan ainoa toimiva kansainvälinen lentokenttä; säännölliset lennot
   Darwiniin, Denpasariin ja Singaporeen. Kiitotie on 1 850 × 30 metriä
   ja 8 metriä merenpinnan yläpuolella, eikä siinä ole valoja, joten
   kenttä toimii kuudesta kuuteen. Kiitotietä rajoittavat meri ja
   Comoro-joki. Vuonna 2014 kentän kautta kulki 198 080 matkustajaa.
   Kaupungissa liikutaan mikroletilla (kymmenen hengen pikkubussi,
   ei aikatauluja, harvoja pysäkkejä, maksu 0,25 dollaria) tai
   ilmastoiduilla sinisillä takseilla, joiden kuljettajien odotetaan
   puhuvan tetumia ja englantia.
2. **Vanha kaupunki ja satama.** Kaupungin vanha kortteli on nykyisen
   kaupungin itäpuoliskossa. Tärkeimmät hallintorakennukset ovat
   sataman ympärillä; keskusta (Bairro Central) on kivirakenteisin ja
   siinä on eniten portugalilaisajan arkkitehtuuria. Portugalilaisajan
   rakennuksia on eniten Motaelin, Gricenforin ja Bidau Leciderén
   sucoissa, usein vanhan kaupungin pääkadun varrella. Sataman
   konttiliikenne siirtyi 30.9.2022 Tibar Bayn satamaan, ja vanha
   satama palvelee nyt kotimaan matkustajalaivoja ja risteilijöitä.
3. **Torit.** Alkuperäinen kaupungin torihalli (Mercado Municipal,
   nykyään Dilin kongressikeskus) oli ensimmäinen kolmesta
   itsenäisyyttä edeltäneestä julkisesta torista; se avattiin
   1960-luvulla. Nykyiset torit ovat Taibesissa, Becorassa ja
   Comorossa.
4. **Milloin kannattaa tulla.** Sadekausi marraskuusta huhtikuuhun,
   kuiva kausi toukokuusta lokakuuhun (ks. L2 luvut).
5. **Käytännön varaukset.** Vedenjakelu on rajallista: vuonna 2018 vettä
   oli saatavilla keskimäärin 4–8 tuntia, ja veden keittämistä
   suositellaan. Sähkö on ollut Dilissä ympärivuorokautista maan
   ensimmäisenä paikkana. Lautta Atauroon kulkee kerran viikossa ja
   Oecusseen kahdesti viikossa; lautat purkavat matkustajat ja ajoneuvot
   luiskalle eikä varsinaiseen laituriin.
*Lähde: "Dili", osiot "Transport", "Buildings and monuments",
"Utilities"; "Port of Dili"; "Municipal Market of Dili".*

**Parasta-listaehdotus:** vanha kortteli ja portugalilaisajan julkisivut;
Tasitolun kosteikko; sataman rantabulevardi; torihallin rakennus;
Atauron lautta.

---

## 4. Kahdeksan kohdekartan kohdetta

Koordinaatit en-Wikipedian geosearch-rajapinnasta 7.9.2026. Kaikki
välit mitattu uudelleen (haversine); pienin väli on 285 metriä
(hallituspalatsi–BNU-pankkitalo). Rajausehdotus:
pohjoinen −8,5495, etelä −8,5625, länsi 125,5655, itä 125,5825
(1,87 × 1,44 km). `meri: true`.

| # | Kohde | lat | lon | Artikkeli |
|---|-------|-----|-----|-----------|
| 1 | Motaelin kirkko | −8,550833 | 125,570556 | Motael Church |
| 2 | Dilin satama | −8,551667 | 125,576389 | Port of Dili |
| 3 | Hallituspalatsi | −8,554310 | 125,578600 | Government Palace, Dili |
| 4 | BNU-pankkitalo | −8,554811 | 125,576053 | Banco Nacional Ultramarino building, Dili |
| 5 | Tuomiokirkko | −8,558333 | 125,567500 | Immaculate Conception Cathedral, Dili |
| 6 | Kansallisstadion | −8,558056 | 125,580556 | National Stadium (Timor-Leste) |
| 7 | Kansallisarkisto | −8,559444 | 125,573889 | National Archives of Timor-Leste |
| 8 | Kaupungin torihalli | −8,560110 | 125,579060 | Municipal Market of Dili |

**Pudotetut ehdokkaat ja syyt:**
- *Casa Europa* (−8,553241/125,579808): 178 m hallituspalatsista eli alle
  200 metrin säännön, ja se on lehden noston K3 aihe.
- *Toko Lay* (−8,554500/125,576970): 107 m BNU-talosta, ja artikkeli on
  kokonaisuudessaan vuoden 1975 joukkosurman todistajakertomus —
  Myanmar-linja sulkee sen pois.
- *Liceu Dr. Francisco Machado* (−8,555775/125,576340): 112 m BNU-talosta.
- *Vastarintamuseo* (−8,555583/125,577556): 182 m hallituspalatsista.
- *Palácio das Cinzas* (−8,561900/125,575300): rakennuksen koko tarina on
  presidentin virkatoimitiloista eli nykypolitiikkaa.
- *Balide Comarca* (−8,565389/125,577722): entinen vankila, miehitysajan
  väkivallan muistopaikka — ei käsitellä.
- *Cristo Rei*: on jo pelin karttanosto (js/packs/maastokohteet-tls.js),
  eikä se mahtuisi tiiviiseen rajaukseen (6 km itään).

**Kohteiden juttusisältö lyhyesti (ei toista lehden nostoja):**
1. Maan vanhin katolinen kirkko, ensimmäinen rakennus paikalle noin 1800
   liurain lahjoittamalle maalle, jälleenrakennus 1901 alkaen, nykyinen
   rakennus 1955; yli 500 porrasta ristintien päässä.
2. Satama on ollut Portugalin pysähdyspaikka ainakin vuodesta 1726;
   Crawfurd kirjoitti 1820, että 10–12 englantilaista laivaa käväisi
   Dilissä vuosittain Molukkien miehityksen aikaan 1810–1814; ensimmäinen
   kunnollinen laituri valmistui vasta 1964, sitä ennen lastattiin
   proomuilla; konttiliikenne siirtyi Tibariin 2022.
3. Nykyinen palatsi on kolme kaksikerroksista rakennusta, jotka yhdistää
   yksi pylväskäytävä; ne rakennettiin eri aikoina 1953–1969. Vanha
   palatsi 1874–1881 oli pitkä yksikerroksinen pylväsjulkisivuinen talo,
   ja se lakkasi olemasta virka-asunto 1886, kun Lahanen palatsi valmistui
   vuorille. Palvelurakennus 1882–1886 (yleiset työt ja posti) ja
   varainhoidon talo 1890 (käytettiin väliaikaisesti sairaalana 1909 asti).
4. BNU perustettiin 1864 ja avasi Dilin konttorin 1912; se laski liikkeeseen
   Portugalin Timorin rahan, ensin patacan ja myöhemmin escudon.
   Modernistinen talo rakennettiin 1966–1968, se seisoo pilareilla,
   julkisivussa on betoniritilä aurinkosuojana ja rakennus on suunnattu
   itä–länsi jäähdytystä varten. Suunnittelija Fernando Schiappa de Campos.
5. Tuomiokirkon suunnittelu alkoi 1984, tontti 10 000 m², rakennus
   1 800 m², 2 000 hengelle; vihittiin käyttöön 2.11.1988 ja sitä
   pidettiin Kaakkois-Aasian suurimpana. Sitä ennen Motaelin kirkko oli
   Dilin prokatedraali.
6. Kansallisstadionissa on kaksi katsomoa ja nurmivallit; kapasiteetti
   noin 9 000. Jalkapallo on maan suosituin urheilulaji.
7. Kansallisarkisto: kaupungin arkistot tuhoutuivat 1779, 1890, 1975 ja
   1999. Nykyinen arkisto perustettiin 1999 kolmen kansainvälisen
   työntekijän voimin, ensimmäiset paikalliset palkattiin heinäkuussa
   2000, kaksi työntekijää sai puolen vuoden koulutuksen Lissabonin
   historiallisessa arkistossa 2001, rakennus saatiin 2004 ja
   kunnostus kesti 2007 asti. Vuonna 2018 työntekijöitä oli 56.
8. Torihalli: portugalilaistyylinen, tontti noin hehtaari, ristinmuotoinen
   kaksikerroksinen rakennus, neljä siipeä ja niiden väliin jäävät
   neljä puolipatiota, harjakatto ja koko siiven mittaiset kattolyhdyt,
   kapeat kuistit julkisivujen edessä. Pääsisäänkäynti on itäsiiven
   päässä puoliympyräportaalina, jonka yllä lukee "Mercado Municipal de
   Dili" ja sen päällä Portugalin vaakunan armillaaripallo ja kilpi.

---

## 5. Kuva-aiheet (Commons-kategoriat)

Buildings and structures in Dili; Government Palace, Dili; Motael Church;
Immaculate Conception Cathedral, Dili; Dili Market building; Port of Dili;
Views of Dili; Tasitolu; Atauro; History of Dili.
**Kierrettävä:** js/packs/oceania-valokuvat.js:n dili-lohkon viisi
tiedostoa (KITLV A828 …, Tais Market …, Fish market Bebonuk …,
Arquivo & Museu …, Cristo Rei of Dili.jpg) — sama tiedostonimi saa
esiintyä kaupungissa vain kerran.

---

## 6. Säätiedot

Säärivejä (js/packs/saatiedot.js) EI tehdä (tehtävänannon poikkeama 2).
Oppaan sääjakso nojaa en-Wikipedian sääruutuun ja sanoo sen ääneen.

---

## 7. Päällekkäisyyksien välttäminen

Luettu ja tietoisesti kierretty:
- **js/packs/maa-kategoriat.js, TLS-maalehti:** saaren nimi, liuraiden
  kaksoisvalta, Oecussen eksklaavi, kielet ja murteet, Tatamailau,
  vuorten synty, kääpiönorsut, santelipuu, kahvi, ruoat, tais,
  krokotiilitaru, mangonkuoren väri, uma lulik, tanssi, rummut ja gongit,
  korut. **Lehti ei toista yhtäkään.** Tetum-nosto K4 kertoo eri asian
  kuin maalehden kielinosto: maalehti luettelee viralliset kielet ja
  murreluvut, K4 kertoo Dilin oman kielimuodon synnyn.
- **js/packs/maastokohteet-tls.js:** Cristo Rei, Maubara, Balibo, Lailin
  luola, Baucau, Baguia, Viqueque, Nino Konis Santana, Matebian, Ataúro,
  Timorinmeri. **Ataúro ja sen 3 500 metrin salmi ovat jo käytetty
  aihe — lehti mainitsee Atauron vain lauttayhteytenä oppaassa.**
- **js/packs/skandaalit.js TLS:** Lifaun pako (topassit ajoivat
  kuvernöörin pois ja pääkaupunki siirrettiin), päävero ja kapina,
  konsuli joka kaivoi saaren tyhjäksi, saari joka myytiin kahdesti.
  **K1 kertoo Dilin perustamisesta eikä toista Lifaun tarinaa.**
- **js/packs/elaintakyt.js TLS:** timorinpeippo. Ei toistoa.
- **js/packs/oceania-saapumiset.js `dili`:** nuori maa, itsenäistyminen
  vuosituhannen alussa, puolet kansasta alle parikymppisiä, kalastajat,
  patsas vuorella, santelipuu. **Lehti ei toista santelipuuta eikä
  patsasta.**
- **js/packs/oceania-valokuvat.js `dili`:** Rua do Comércio noin 1900,
  tais-tori, Bebonukin kalatori, vastarinnan museo, Cristo Rei.
- **js/packs/oceania-artikkelit.js `Itä-Timor`:** maaintro (timur,
  Tatamailau, santelipuu, 1859 jako, portugali virallisena, kahvi).
  Kaupunkiartikkeli `Dili` kirjoitetaan tästä erilliseksi.

---

## 8. Ristiriidat ja huomiot

1. **Sadekauden rajat.** Artikkelin leipäteksti sanoo marraskuu–huhtikuu,
   mutta sen oma HTML-kommentti huomauttaa, että lähde Pinto2016 sanoo
   joulukuu–toukokuu. Käytetään leipätekstin muotoa ja pidetään se
   väljänä.
2. **Suojelualueiden pinta-alat.** Artikkeli kirjoittaa "the
   {{convert|18.1|km|mi}} Cristo Rei Protected Area", "the
   {{convert|3.8|km|mi}} Tasitolu area" ja "the large
   {{convert|274.9|km|mi}} Behau protected area" — yksikkö on kilometri,
   ei neliökilometri, mikä on ilmeinen kirjoitusvirhe artikkelissa.
   **Lukuja ei käytetä lainkaan.**
3. **Perustamisvuosi.** Infobox sanoo "Capital of Portuguese Timor 1769",
   ja leipäteksti kertoo saman. Satama-artikkeli lisää, että paikalla oli
   portugalilaisten pysähdyspaikka jo 1726. Molemmat pitävät paikkansa,
   ja ne on erotettava toisistaan.
4. **Casa Europan rakennusvuodet.** Artikkeli sanoo, että rakentaminen
   alkoi 1871 ja "most of the building work was carried out between 1884
   and 1899", ja lisäksi että talo otettiin käyttöön kasarmina 1895
   ennen valmistumistaan. Kaikki kolme mainitaan, jotta lukija ei luule
   taloa yhden vuoden työksi.
5. **Väestöluvut.** Vuoden 2022 laskennassa Dilin KUNNAN väkiluku oli
   324 269; kaupungin oma luku on eri asia eikä artikkelissa suoraan.
   Kunnan luku on merkittävä vain kunnan lukuna.
