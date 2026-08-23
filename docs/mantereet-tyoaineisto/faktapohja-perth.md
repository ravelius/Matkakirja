# Perth — faktakoostaja, uusi kaupunkilehti (Oseanian lauta)

Lauta-id `oceania`, kaupunki-id `perth`, maa AUS, en-Wikipedia "Perth"
(ellei toisin mainita — HUOM: hakusana "Perth, Western Australia" on
UUDELLEENOHJAUS artikkeliin "Perth", tarkistettu). Kaikki tiedot
haettu en-Wikipediasta **23.8.2026** (`action=raw`,
`NODE_USE_ENV_PROXY=1`; #REDIRECT tarkistettu jokaiselle haetulle
otsikolle). Malli ja mitat luettu tiedostoista
`docs/aasia-tyoaineisto/lehtityo-resepti.md` (SITOVA),
`docs/moduulit/kaupunkilehti.md` sekä esimerkkinä
`docs/mantereet-tyoaineisto/faktapohja-melbourne.md` (rakenne ja
tarkkuustaso, sama lauta ja sama putki). Lisäksi luin
`docs/mantereet-tyoaineisto/spec-mantereet.md` — se on SITOVA koko
Oseanian laudalle ja koskee suoraan juuri sitä kunnioitus-vaatimusta,
joka tehtävänannossa erikseen korostettiin. Kulttuurivisa tarkistettu
tiedostosta `js/packs/oceania-questions.js` (kohta `perth`, kolme
faktaa + isoisän repliikki: eristyneisyys/etäisyys lähimpään
miljoonakaupunkiin, läheisyys Jakartaan verrattuna Sydneyhin,
Fremantle Doctor -merituulen nimi ja syy) — ks. osio 7, huomio 1,
miten näiden ydinsisältöä on vältetty.

**Tehtävän erityispiirre:** En kirjoittanut lehtitekstejä, en ladannut
kuvia enkä koskenut js/packs-tiedostoihin — kaikki alla on
raaka-ainetta kirjoittajalle ja riippumattomalle tarkistajalle.

**Sisältölinjaus (spec-mantereet.md, Oseania + Raamattu pilari 3):**
whadjuk-noongarit kuvataan nykyisenä, elävänä kansana omalla nimellään
— ei "kadonneen kansan" romantiikkaa eikä museokehystä. Kings Parkin
(Mount Elizan, whadjukiksi Kaarta Gar-up / Mooro Katta) ja Swan-joen
(Derbarl Yerrigan) merkitys kerrotaan kansan omasta näkökulmasta: miksi
Perth on juuri siinä missä on (Goonininup-lähde), mitä paikat
merkitsivät ja merkitsevät yhä. Siirtomaahistoria (rangaistus-
siirtolaisuus 1850–1868, maan menetys, Yaganin kuolema ja pään kohtalo)
kerrotaan tapahtumina neutraalisti ilman kummankaan osapuolen
sankarikehystä, ja nykyaikainen tunnustus (maaoikeussopimus 2021,
Yaganin pään uudelleenhautaus 2010, Yagan Square 2018) saa näkyä yhtä
vahvasti kuin menneisyys. Tästä syystä koostukseen ehdotetaan oma
teemasivu whadjukeille sivuhuomautuksen sijaan — ks. osio 1, sivu D.

Vankisiirtolaisaika (1850–1868) ja sitä seurannut rakennusbuumi osuvat
suoraan isoisän 1873 matkan vuoteen: Perthin ainoa vankityövoimalla
rakennettu kaupungintalo valmistui 1870, koko rangaistuslaitoshallinnon
viimeinen virka (Comptroller General of Convicts) lakkautettiin 1872,
ja Kings Parkin (silloin Perth Park) 432 eekkerin suojelualue
perustettiin 1871 — kaikki 1–3 vuotta ennen matkaa.

---

## 1. Sivuehdotukset

### Sivu A — id `kaupunki`, nimi "Perth"

**Johdanto (232 merkkiä):**

> Lähteen äärelle whadjuk-noongarien mailla 1829 perustettu Perth on
> nykyisin maailman eristyneimpiä suurkaupunkeja. Isoisän matkan
> vuonna kaupunki oli vielä rangaistusvankien rakentama, ja
> siirtolaisjärjestelmä oli juuri lakkaamassa.

### Sivu B — teemasivu, ehdotettu id `historia`, nimi "Historia"

**Perustelu valinnalle:** Perth on ainoa Australian siirtokunta, joka
itse PYYSI itselleen rangaistusvankeja työvoimapulan takia — ja
vankityövoimalla rakennetut julkiset rakennukset (kaupungintalo,
kuvernöörintalo) valmistuivat juuri isoisän matkan kynnyksellä. Koko
rangaistusjärjestelmän hallinto purettiin vasta 1872, vuosi ennen
matkaa, ja seuraukset (itsehallintopyynnön hylkääminen 1874, häpeän ja
myöhemmän ylpeyden kaari) jatkuivat pitkälle sen jälkeen.

**Johdanto (213 merkkiä):**

> Länsi-Australia pyysi itselleen rangaistusvankeja 1850, kun muu
> Australia oli jo lopettanut kuljetukset. Vangit rakensivat kaupungin
> julkiset rakennukset, ja järjestelmä purettiin vasta isoisän matkan
> kynnyksellä.

### Sivu C — teemasivu, ehdotettu id `luonto`, nimi "Luonto"

**Perustelu valinnalle:** Kings Park (silloin Perth Park) rauhoitettiin
suojelualueeksi 1871, kaksi vuotta ennen isoisän matkaa — vahva
1873-osuma samaan tapaan kuin Melbournen Guilfoyle-nimitys. Sivu
yhdistää tämän Swan-joen whadjuk-nimeen ja Wagyl-luomistarinaan sekä
whadjukien kuuteen vuodenaikaan, jotka kertovat suhteesta maahan ilman
päällekkäisyyttä historia- tai whadjukit-sivun kanssa.

**Johdanto (218 merkkiä):**

> Kaupunkia reunustava puisto rauhoitettiin luonnonsuojelualueeksi
> kaksi vuotta ennen isoisän matkaa. Sen alla mutkitteleva Swan-joki
> kantaa yhä whadjukien nimeä Derbarl Yerrigan ja tarinaa
> käärmeolennosta, joka loi sen.

### Sivu D — teemasivu, ehdotettu id `whadjukit`, nimi "Whadjukit"

**Perustelu valinnalle:** Tehtävänanto korosti erikseen kunnioitus-
vaatimusta (pilari 3), ja aineisto kantaa oman sivun: siirtomaa-ajan
alku (neljä asuinaluetta, ensikohtaaminen), Yaganin tarina (kuolema
1833, pään historia Englannissa, uudelleenhautaus 2010) ja
nykytunnustus (maaoikeussopimus 2021, Yagan Square 2018) muodostavat
kaaren menneisyydestä nykyhetkeen — juuri sen, mitä spec-mantereet.md
vaatii ("kansan oma ääni ennen siirtomaanimiä").

**Johdanto (216 merkkiä):**

> Whadjuk-noongarit ovat asuneet Swan-joen varrella tuhansia vuosia ja
> asuvat siellä yhä. Heidän historiansa kantaa sekä siirtomaa-ajan
> raskaimmat vuodet että viime vuosikymmenten oikeuden ja tunnustuksen
> palautumisen.

**HUOM sivumäärästä:** tehtävänanto salli 1–3 teemasivua; käytin
kaikki kolme samalla perusteella kuin Melbourne-mallissa (osio 7,
huomio 2, kertoo miksei mikään näistä kolmesta ole karsittavissa ilman
merkittävää sisältöhävikkiä).

---

## 2. Kuusitoista nostoehdotusta (4 × 4 sivua)

### Sivu `kaupunki` — 4 nostoa

**Nosto K1 — "Kaupunki joka syntyi lähteen ympärille" (494 merkkiä)**

> Kun kuvernööri James Stirling etsi 1829 paikkaa uudelle
> siirtokunnalle, ratkaisu oli yksinkertainen: Mount Elizan
> etelärinteellä pulppusi seudun ainoa ympärivuotinen makean veden
> lähde. Whadjuk-noongarit olivat käyttäneet lähdettä sukupolvien ajan
> ja tunsivat sen nimellä Goonininup. Sama vesi oli houkutellut jo
> hollantilaisen Willem de Vlaminghin retkikunnan täydentämään
> varastojaan paikalla vuonna 1697. Stirling nimesi kummun Eliza
> Darlingin mukaan ja perusti kaupungin juuri sen juurelle.

Faktat ja lähteet:
- Kennedy Spring (Goonininup) Mount Elizan etelärinteellä tarjosi
  ympärivuotista vettä alkuperäisasukkaille ja ensimmäisille
  eurooppalaisille vierailijoille, mukaan lukien Willem de Vlaminghin
  retkikunta 11.1.1697. — en-Wikipedia "Kings Park, Western Australia"
- James Stirling valitsi Perthin sijainnin juuri tämän — seudun ainoan
  lähteen — vuoksi ja nimesi kummun Eliza Darlingin mukaan Mount
  Elizaksi. — en-Wikipedia "Kings Park, Western Australia"

**Nosto K2 — "Nimi Skotlannista, nimi joka oli jo olemassa" (470 merkkiä)**

> Kaupunki sai nimensä Perthistä, Skotlannista, kunnianosoituksena
> siirtomaaministeri George Murraylle: nimi luettiin ääneen
> Fremantlessa 18. kesäkuuta 1829. Kapteeni Charles Fremantlen
> päiväkirjan mukaan paikka "nimettiin Perthiksi Sir George Murrayn
> toiveiden mukaisesti". Whadjukeilla alueella oli kuitenkin jo oma
> nimensä, Boorloo — se on 2020-luvulla noussut uudelleen käyttöön
> kaupungin rinnakkaisnimenä kartoissa, matkailumainonnassa ja
> yliopistojen tervehdyksissä.

Faktat ja lähteet:
- Perth sai nimensä Perthistä, Skotlannista, kunnioittaakseen
  siirtomaaministeri George Murraytä; Stirlingin julistus siirtokunnan
  perustamisesta luettiin Fremantlessa 18.6.1829. — en-Wikipedia
  "Perth" (Toponymy-osio)
- Charles Fremantlen päiväkirjamerkintä 12.8.1829: paikka "nimettiin
  Perthiksi Sir George Murrayn toiveiden mukaisesti". — en-Wikipedia
  "Perth"
- Noongar-nimi "Boorloo" Perthin keskustan alueelle on saanut
  viimeaikoina jalansijaa rinnakkaisnimenä (Tourism WA, City of Perth,
  yliopistot). — en-Wikipedia "Perth"

**Nosto K3 — "Kaupunki joka pyysi itselleen vankeja" (535 merkkiä)**

> Kun muu Australia oli jo lopettanut rangaistusvankien tuonnin,
> Länsi-Australia teki 1850 päinvastoin: se pyysi Britannialta vankeja
> työvoimapulan helpottamiseksi. Ehtona oli aluksi, ettei naisia,
> poliittisia vankeja tai vakavien rikosten tekijöitä lähetettäisi —
> ehdot höltyivät vuosien mittaan. Seuraavan kahdeksantoista vuoden
> aikana 43 laivaa toi 9 721 vankia, enemmän kuin siirtokunnassa oli
> vapaita uudisasukkaita, noin 7 300. Yksi ehdoista piti läpi koko
> ajanjakson: Länsi-Australiaan ei tuotu koskaan yhtään naispuolista
> vankia.

Faktat ja lähteet:
- Länsi-Australia avattiin rangaistusvangeille 1850 siirtokunnan
  omasta pyynnöstä työvoimapulan vuoksi, samaan aikaan kun kuljetukset
  itäisiin siirtokuntiin olivat jo loppuneet. — en-Wikipedia "Perth"
- Ehdot: ei naispuolisia vankeja, ei poliittisia vankeja, ei vakavien
  rikosten tekijöitä; naiskielto piti koko ajanjakson, muut ehdot
  löystyivät vuosien mittaan. — en-Wikipedia "Convict era of Western
  Australia"
- 9 721 vankia saapui 43 laivalla 1850–1868, enemmän kuin
  siirtokunnan n. 7 300 vapaata uudisasukasta. — en-Wikipedia "Perth"

**Nosto K4 — "Kaupunki joka kahdeksankertaistui parissakymmenessä vuodessa" (535 merkkiä)**

> Isoisän matkan aikoihin koko Länsi-Australian väkiluku oli vasta
> noin 23 000. Kun kultaa löytyi Coolgardiesta ja Kalgoorliesta
> 1890-luvulla, luku kasvoi 180 000:een vuosisadan loppuun mennessä, ja
> Perthistä tuli kultakenttien huoltokeskus. Osa uudesta rikkaudesta
> valui Perth Mintiin, joka avattiin 1899 lyömään kolikoita ja ostamaan
> kaivostyöläisten kultaa — Kuninkaallisen rahapajan sivutoimipisteenä
> Lontoosta käsin. Vuoteen 1931 mennessä rahapaja oli lyönyt yli 106
> miljoonaa kultasovereignia koko Brittiläisen imperiumin käyttöön.

Faktat ja lähteet:
- Länsi-Australian väkiluku kasvoi n. 23 000:sta 1869 180 000:een
  1900, Coolgardien, Kalgoorlien ja Murchisonin kultalöytöjen
  vetämänä. — en-Wikipedia "Perth Mint"
- Perth Mintin peruskivi muurattiin 1896 John Forrestin toimesta;
  virallinen avaus 20.6.1899 Lontoon Kuninkaallisen rahapajan
  sivutoimipisteenä; lyöi kolikoita ja osti kultaa pienkaivostyöläisiltä.
  — en-Wikipedia "Perth Mint"
- 32 vuoden aikana vuoteen 1931 mennessä rahapaja löi yli 106
  miljoonaa kultasovereignia ja lähes 735 000 puolisovereignia
  Brittiläisen imperiumin käyttöön. — en-Wikipedia "Perth Mint"

### Teemasivu `historia` — 4 nostoa

**Nosto H1 — "Kaupungintalo jonka ikkunat kertovat vankeudesta" (643 merkkiä)**

> Perth Town Hall on Australian ainoa vankityövoimalla rakennettu
> kaupungintalo. Rakennustyöt alkoivat 1867 ja valmistuivat 1870 —
> valmistuessaan se oli kaupungin korkein rakennus. Tiilet poltettiin
> East Perthin savesta, ja koristeluun kätkeytyy suoria viittauksia
> rakentajien asemaan: ikkunat on muotoiltu vankien univormuissa
> käytetyn nuolimerkin (broad arrow) muotoon, ja osa koristeista
> muistuttaa hirsipuun köyttä. Rakennus seisoo yhä samalla kulmalla,
> Hay Streetin ja Barrack Streetin risteyksessä, ja sen jarrahpuisen
> portaikon seinillä riippuvat jokaisen Perthin ylipormestarin
> muotokuvat aina ensimmäisestä, George Shentonista, lähtien.

Faktat ja lähteet:
- Perth Town Hall on Australian ainoa vankityövoimalla rakennettu
  kaupungintalo; rakennettu 1867–1870, valmistuessaan kaupungin
  korkein rakennus; sijaitsee Hay Streetin ja Barrack Streetin
  kulmassa. — en-Wikipedia "Perth Town Hall"
- Ulkoseinien tiilet poltettiin East Perthin savesta; koristelussa
  vankien univormun nuolimerkin (broad arrow) muotoisia ikkunoita ja
  hirsipuun köyttä muistuttavia koristeita. — en-Wikipedia "Perth Town
  Hall"
- Jarrahpuisen portaikon seinällä on jokaisen Perthin ylipormestarin
  (Lord Mayor) muotokuva alkaen George Shentonista. — en-Wikipedia
  "Perth Town Hall" (kuvateksti)

**Nosto H2 — "Kuvernöörintalo samalla kulmalla kuin ensimmäinen teltta" (603 merkkiä)**

> Nykyinen Government House valmistui 1864, suureksi osaksi
> vankityövoimalla, samalle paikalle Barrack Streetin ja St Georges
> Terracen kulmaan, jossa kuvernööri Stirling asui teltassa jo 1829.
> Peruskivi muurattiin 1859, ja kuvernööri John Hampton muutti taloon
> 1863 vielä ennen sen valmistumista. Rakennus on siis lähes
> tismalleen niin vanha kuin isoisän matkakin — vain vajaat kymmenen
> vuotta. Vuosikymmeniä myöhemmin, 1890-luvulla, taloon lisättiin
> juhlasali hallituksen arkkitehti Hillson Beasleyn suunnitelmien
> mukaan – saman arkkitehdin, joka suunnitteli useita muitakin
> Perthin julkisia rakennuksia.

Faktat ja lähteet:
- Ensimmäinen kuvernööri Stirling asui perheineen teltoissa Barrack
  Streetin ja St Georges Terracen kulmassa 1829; nykyinen Government
  House rakennettiin suurelta osin vankityövoimalla, peruskivi
  17.3.1859, kustannus 15 000 puntaa. — en-Wikipedia "Government
  House, Perth"
- 1890-luvulla taloon lisättiin juhlasali hallituksen arkkitehti
  Hillson Beasleyn johdolla; Beasley suunnitteli useita muitakin
  Perthin julkisia rakennuksia. — en-Wikipedia "Government House,
  Perth"
- Kuvernööri John Hampton muutti taloon 1863, ennen sen valmistumista
  1864. — en-Wikipedia "Government House, Perth"

**Nosto H3 — "Vuosi jolloin rangaistusjärjestelmä lakkasi olemasta" (519 merkkiä)**

> Viimeinen vankilaiva Hougoumont saapui 1868 mukanaan 62 irlantilaista
> fenian-vankia — siihen päättyi kuljetus, muttei järjestelmä. Vielä
> vuoden 1868 lopussa siirtokunnassa oli 3 158 tuomiotaan suorittavaa
> vankia. Vasta 1872, vuosi ennen isoisän matkaa, Britannia lakkautti
> koko rangaistushallinnon viimeisen viran, vankien pääjohtajan
> (Comptroller General of Convicts) toimen. Yksi tunnetuimmista
> jälkiseurauksista, kuuluisa Catalpa-pakopako, tapahtui silti vasta
> 1876 – kahdeksan vuotta kuljetusten loppumisen jälkeen.

Faktat ja lähteet:
- Viimeinen vankilaiva Hougoumont saapui 10.1.1868 mukanaan 62
  irlantilaista fenian-vankia (Irish Republican Brotherhood);
  kuljetukset päättyivät, mutta järjestelmä ei loppunut heti. —
  en-Wikipedia "Convict era of Western Australia"
- Catalpa-pakopako, yksi rangaistuskauden tunnetuimmista tapahtumista,
  toteutui vasta 1876, kahdeksan vuotta kuljetusten päättymisen
  jälkeen. — en-Wikipedia "Convict era of Western Australia"
- Vuoden 1868 lopussa siirtokunnassa oli yhä 3 158 vankia. —
  en-Wikipedia "Convict era of Western Australia"
- Vuonna 1872 vankien pääjohtajan (Comptroller General of Convicts)
  virka lakkautettiin, mikä puri rangaistusjärjestelmän hallinnon
  loppuun. — en-Wikipedia "Convict era of Western Australia"

**Nosto H4 — "Häpeästä ylpeydeksi" (657 merkkiä)**

> Vielä 1874 — isoisän matkan jälkeisenä vuonna — Länsi-Australian
> lakiasäätävä neuvosto pyysi Britannialta itsehallintoa, mutta pyyntö
> hylättiin osittain siksi, että entisten vankien osuus väestöstä oli
> liian suuri. Vuosikymmeniä vankitausta oli häpeä, josta ei puhuttu,
> eivätkä jälkeläiset usein edes tienneet siitä. Vasta viime
> vuosikymmeninä siitä on tullut monelle ylpeyden aihe ja
> sukututkimuksen suosituin puheenaihe. Julkiset virat pysyivät
> entisiltä vangeilta lähes tyystin suljettuina – ainoana poikkeuksena
> koulunopettajan toimi, johon palkattiin runsaasti entisiä vankeja,
> koska matalat palkat eivät houkutelleet koulutettuja vapaita
> siirtolaisia.

Faktat ja lähteet:
- Vuonna 1874 Länsi-Australian lakiasäätävä neuvosto pyysi
  Britannialta vastuunalaista itsehallintoa, mutta pyyntö hylättiin
  osittain entisten vankien liian suuren väestöosuuden vuoksi. —
  en-Wikipedia "Convict era of Western Australia"
- Julkiset virat olivat entisiltä vangeilta lähes kokonaan suljettuja,
  poikkeuksena koulunopettajan toimi: matalat palkat eivät
  houkutelleet koulutettuja vapaita siirtolaisia, joten moni
  ex-vanki-koulunopettaja sai viran. — en-Wikipedia "Convict era of
  Western Australia"
- Vankitausta oli pitkään häpeä, josta ei puhuttu; viime aikoina siitä
  on tullut monille ylpeyden aihe ja sukututkimuksen suosittu kohde. —
  en-Wikipedia "Convict era of Western Australia"

### Teemasivu `luonto` — 4 nostoa

**Nosto L1 — "Puisto joka rauhoitettiin kaksi vuotta ennen matkaa" (445 merkkiä)**

> Mount Elizan rinteillä oli hakattu jarrah-puuta siirtokunnan
> ensimmäisestä vientierästä lähtien 1835, kunnes maanmittaaja Malcolm
> Fraser suostutteli kuvernööri Frederick Weldin rauhoittamaan alueen
> 1871 — 432 eekkeriä julkiseksi puistoksi nimeltä Perth Park. Vasta
> 1901 puisto nimettiin uudelleen King's Parkiksi kuningas Edward
> VII:n valtaannousun kunniaksi. Whadjukeille rinne oli kauan sitä
> ennen Kaarta Gar-up tai Mooro Katta, "iso kukkula".

Faktat ja lähteet:
- Jarrah-puun hakkuu Mount Elizalla jatkui siirtokunnan ensimmäisestä
  vientierästä (1835) vuoteen 1871, jolloin maanmittaaja Malcolm
  Fraser suostutteli kuvernööri Weldin rauhoittamaan 432 eekkeriä
  julkiseksi puistoksi nimeltä Perth Park. — en-Wikipedia "Kings Park,
  Western Australia"
- Puisto nimettiin uudelleen King's Parkiksi 1901 kuningas Edward
  VII:n valtaannousun kunniaksi. — en-Wikipedia "Kings Park, Western
  Australia"
- Mount Eliza on tunnettu noongareille nimillä Mooro Katta, Kaarta
  Gar-up ja Kaarta Koomba ("iso kukkula"). — en-Wikipedia "Kings Park,
  Western Australia"

**Nosto L2 — "Joki jonka käärmeolento loi" (548 merkkiä)**

> Whadjukit tuntevat Swan-joen nimellä Derbarl Yerrigan. Heidän
> mukaansa Darling Scarpin jyrkänne on Wagylin, käärmemäisen
> Uneaikaisen olennon, ruumis, ja juuri Wagyl loi mutkitellessaan joen,
> järvet ja vesireitit. Hollantilaiset antoivat joelle toisen nimen
> 1697 sen mustien joutsenten mukaan — Swarte Swaene-Revier, "musta
> joutsenjoki" — kun Willem de Vlaminghin retkikunta purjehti sitä
> pitkin Heirisson-saarelle asti. Myös ranskalainen Nicolas Baudinin
> retkikunta purjehti jokea ylös vuonna 1801, kolmekymmentä vuotta
> ennen brittiläistä asutusta.

Faktat ja lähteet:
- Joen whadjuk/noongar-nimi on Derbarl Yerrigan. — en-Wikipedia "Swan
  River (Western Australia)" (infobox, other_name)
- Ranskalainen Nicolas Baudinin retkikunta purjehti jokea ylös vuonna
  1801. — en-Wikipedia "Swan River (Western Australia)" (European
  exploration)
- Noongarit uskovat Darling Scarpin olevan Wagylin (myös Waugal),
  käärmemäisen Uneaikaisen olennon, ruumis; Wagylin uskotaan luoneen
  Swan-joen mutkitellessaan. — en-Wikipedia "Swan River (Western
  Australia)"
- Willem de Vlamingh nimesi joen Swarte Swaene-Revieriksi ("musta
  joutsenjoki") 1697 alueen mustien joutsenten mukaan; retkikunta
  purjehti Heirisson-saarelle asti. — en-Wikipedia "Swan River
  (Western Australia)"

**Nosto L3 — "Kuusi vuodenaikaa, ei neljä" (454 merkkiä)**

> Eurooppalaisen neljän vuodenajan sijaan whadjukit jakavat vuoden
> kuuteen kauteen, jotka seuraavat kasvien kukintaa, tuulten suuntaa ja
> eläinten liikkeitä eivätkä kalenteripäiviä. Birak (marras-joulukuu)
> on kuivien, kuumien itätuulten aikaa, jolloin poltettiin pensaikkoa
> mosaiikkina metsästyksen helpottamiseksi ja kasvun edistämiseksi;
> bunuru (tammi-helmikuu) on vuoden kuumin ja kuivin kausi, jolloin
> perheet siirtyivät rannikon jokisuille kalastamaan.

Faktat ja lähteet:
- Whadjukit (kuten muutkin noongar-kansat) jakavat vuoden kuuteen
  vuodenaikaan neljän sijaan, ekologisten merkkien eikä
  kalenteripäivien mukaan. — en-Wikipedia "Whadjuk"
- Birak (marras-joulukuu): kuumat, kuivat itätuulet; pensaikon
  mosaiikkipoltto metsästyksen ja kasvun helpottamiseksi. —
  en-Wikipedia "Whadjuk"
- Bunuru (tammi-helmikuu): vuoden kuumin ja kuivin kausi; perheet
  siirtyivät rannikon jokisuille kalaa ja meriäyriäisiä pyytämään. —
  en-Wikipedia "Whadjuk"

**Nosto L4 — "Joki jota muokattiin muotoonsa" (471 merkkiä)**

> Vuoden 1862 poikkeuksellisen sateinen talvi tulvitti laajoja
> alueita, ja seuraavina vuosikymmeninä jokea ruopattiin
> systemaattisesti syvempien väylien ja kuivan maan saamiseksi — juuri
> isoisän matkan aikoihin, 1872, Länsi-Australian ensimmäinen
> ämpäriruoppaaja Black Swan aloitti työnsä ja jatkoi sitä lähes neljä
> vuosikymmentä. Joen "todellinen" osa päättyi alun perin
> mutatasangoksi nykyisen Heirisson-saaren kohdalla, ennen kuin
> ihmiskäsi muokkasi rantaviivan uusiksi.

Faktat ja lähteet:
- Poikkeuksellisen sateinen talvi 1862 aiheutti laajaa tulvimista,
  jota maan täyttötyöt pahensivat. — en-Wikipedia "Swan River (Western
  Australia)"
- Länsi-Australian ensimmäinen ämpäriruoppaaja Black Swan aloitti
  toimintansa 1872 ja jatkoi väylien ruoppausta ja maan täyttöä
  vuoteen 1911. — en-Wikipedia "Swan River (Western Australia)"
- Joen "todellinen" osa päättyi historiallisesti mutatasangoksi
  nykyisen Heirisson-saaren kohdalla. — en-Wikipedia "Swan River
  (Western Australia)"

### Teemasivu `whadjukit` — 4 nostoa

**Nosto Y1 — "Neljä ryhmää yhden joen varrella" (443 merkkiä)**

> Ennen siirtokuntaa whadjuk-noongarit jakautuivat Swan- ja
> Canning-jokien mukaan neljään asuinalueeseen: beeliar lounaassa,
> beeloo joen eteläpuolella, mooro pohjois- ja länsipuolella
> Yellagongan johdolla, sekä nimeämätön "vuoristokansa" joen
> yläjuoksulla. Kun Stirlingin miehistö kohtasi Yellagongan
> perheineen nykyisen Crawleyn rannalla 1829, kohtaaminen oli vielä
> rauhallinen — vasta seuraavina vuosina maan haltuunotto ajoi
> suhteet kriisiin.

Faktat ja lähteet:
- Whadjukit jakautuivat Swan- ja Canning-jokien mukaan neljään
  asuinalueeseen: Beeliar, Beeloo, Mooro (Yellagongan johdolla) ja
  nimeämätön Upper Swanin "vuoristokansa". — en-Wikipedia "Whadjuk"
- (Myöhempi) luutnanttikuvernööri Irwinin vene tapasi Yellagongan
  perheineen nykyisen Crawleyn rannalla, lähellä nykyistä Länsi-
  Australian yliopistoa. — en-Wikipedia "Whadjuk"

**Nosto Y2 — "Soturi jonka pää matkasi maailman ympäri" (519 merkkiä)**

> Yagan, beeliar-päällikkö Midgegooroon poika, puolusti kansansa
> oikeuksia väkivalloin sen jälkeen, kun uudisasukkaat olivat ampuneet
> aboriginaaleja karjan keihästämisestä. Hänet tapettiin heinäkuussa
> 1833 kahden tuntemansa nuorukaisen toimesta, ja hänen päänsä
> savustettiin, vietiin Lontooseen "antropologisena kuriositeettina"
> ja asetettiin näytteille yksityisjuhlissa egyptiläismumioiden
> rinnalla. Pää päätyi lopulta Liverpoolin museon kokoelmiin ja
> haudattiin sieltä 1964 muiden hylättyjen näyttelyesineiden joukossa.

Faktat ja lähteet:
- Yagan, Midgegooroon (beeliar-johtajan) poika, ryhtyi kostotoimiin
  sen jälkeen, kun siirtolaiset olivat ampuneet aboriginaaleja
  mielivaltaisesti karjan keihästämisen vuoksi; tapettiin 11.7.1833
  kahden tuntemansa nuoren siirtolaisen toimesta. — en-Wikipedia
  "Yagan"
- Pää savustettiin ja vietiin Lontooseen; kirurgi Thomas Pettigrew
  esitteli sitä yksityisjuhlissa avattujen egyptiläismumioiden
  rinnalla. — en-Wikipedia "Yagan"
- Pää päätyi Liverpoolin museoon ja haudattiin sieltä huhtikuussa
  1964 yhdessä perulaismuumion ja māori-pään kanssa. — en-Wikipedia
  "Yagan"

**Nosto Y3 — "177 vuoden jälkeen kotona" (471 merkkiä)**

> Noongar-vanhimmat aloittivat pään etsinnän 1980-luvun alussa:
> aboriginaalijohtaja Ken Colbung sai apua Lontoon yliopiston
> arkeologeilta, ja hauta paikannettiin 1993. Pään luovutus viivästyi
> vuosia lupaprosesseissa ja yhteisön sisäisissä kiistoissa, kunnes se
> lopulta luovutettiin noongar-valtuuskunnalle Liverpoolin
> kaupungintalossa elokuussa 1997. Uudelleenhautaus tapahtui vasta
> 2010, lähellä Yaganin kuoleman 177. vuosipäivää, uuteen Yagan
> Memorial Parkiin Belhusissa.

Faktat ja lähteet:
- Pään etsintä alkoi 1980-luvun alussa; arkeologi Cressida Fforde
  jäljitti sen joulukuussa 1993. — en-Wikipedia "Yagan"
- Kallo luovutettiin noongar-valtuuskunnalle seremoniassa Liverpoolin
  kaupungintalossa 31.8.1997. — en-Wikipedia "Yagan"
- Uudelleenhautaus tapahtui 10.7.2010 Belhusissa, vastikään avatussa
  Yagan Memorial Parkissa, lähellä hänen kuolinpäivänsä vuosipäivää. —
  en-Wikipedia "Yagan"

**Nosto Y4 — "Tunnustus jota mitataan vuosina, ei vuosisadoilla" (492 merkkiä)**

> Vuonna 2006 liittovaltion tuomioistuin totesi, että noongarien
> alkuperäinen maaoikeus oli säilynyt koko Perthin metropolialueella —
> ratkaisu, joka johti vuosien neuvottelujen jälkeen Etelä-Länsi-
> Australian maaoikeussopimukseen ja siihen sisältyvään whadjukien
> maankäyttösopimukseen, jotka vahvistettiin lopullisesti joulukuussa
> 2021. Vuonna 2018 avattu Yagan Square keskustassa, jonka 9-metrinen
> Wirin-patsas on nimetty Yaganin mukaan, tekee historiasta osan
> jokaisen kadulla kulkijan arkea.

Faktat ja lähteet:
- Liittovaltion tuomioistuin totesi 19.9.2006 (Bennell v State of
  Western Australia), että noongarien alkuperäinen maaoikeus oli
  säilynyt Perthin metropolialueella; valitusten jälkeen Etelä-Länsi-
  Australian maaoikeussopimus (sis. whadjukien maankäyttösopimuksen)
  vahvistettiin liittovaltion tuomioistuimessa 1.12.2021. —
  en-Wikipedia "Perth"
- Yagan Square, Perthin keskustan aukio, avattiin 3.3.2018; sen
  9-metrinen patsas "Wirin" on nimetty Yaganin mukaan. — en-Wikipedia
  "Yagan"

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

Faktat on valittu niin, etteivät ne toista osion 2 nostoja tai
kulttuurivisan vastauksia.

**Jakso 1 — "Perille ja liikkeelle"**

Perthin satama on yhä Fremantlessa, 19 kilometrin päässä lounaassa
Swan-joen suulla — juuri siellä, missä ensimmäiset siirtolaiset
nousivat maihin kesäkuussa 1829 laivoista Parmelia ja Sulphur.
Kapteeni James Stirling piti näkymää "yhtä kauniina kuin mikään
näkemänsä". Nykyisin Fremantle on Länsi-Australian tärkein kontti- ja
matkustajasatama, ja matka sinne kaupungin keskustasta on luonteva
tapa aloittaa tutustuminen.

Faktat ja lähteet:
- Fremantle, 19 km lounaaseen Swan-joen suulla, on Perthin tärkein
  kontti- ja matkustajasatama. — en-Wikipedia "Perth" (Transport/Sea)
- Ensimmäiset siirtolaiset saapuivat 1829 laivoilla Parmelia
  (Stirling) ja Sulphur; Stirling kuvaili näkymää "yhtä kauniiksi kuin
  mikään näkemänsä". — en-Wikipedia "Perth"

**Jakso 2 — Alueen rakenne**

Kaupungin keskusta kiertyy Perth Waterin, Swan-joen levenevän lahden,
pohjoisrannalle — St Georges Terrace ja sitä risteävä Barrack Street
ovat olleet ydinalue siitä lähtien, kun Stirlingin väki pystytti
ensimmäiset telttansa juuri tälle kulmalle. Länsipuolella Mount Eliza
(Kings Park) kohoaa jyrkästi joen yli ja tarjoaa näköalan koko
keskustaan ja Darling-jyrkänteeseen asti idässä.

Faktat ja lähteet:
- Perthin keskusta sijaitsee Swan-joen (Perth Waterin) pohjoisrannalla;
  Government House seisoo Barrack Streetin ja St Georges Terracen
  kulmassa, Stirlingin alkuperäisen 1829 telttaleirin paikalla. —
  en-Wikipedia "Government House, Perth"
- Kings Park Mount Elizalla katsoo Perth Waterin ja keskustan yli,
  näköalalla Darling-jyrkänteeseen. — en-Wikipedia "Kings Park,
  Western Australia"

**Jakso 3 — Arjen ilmiö: Kings Parkin kukkanäyttely**

Syyskuussa Kings Park täyttyy kukista: puisto järjestää Australian
suurimman villikukkanäyttelyn ja -festivaalin, kun yli 320
alkuperäistä kasvilajia puhkeaa kukkaan lyhyen sadekauden jälkeen.
Puisto on Länsi-Australian suosituin yksittäinen matkailukohde, yli
5,8 miljoonaa kävijää vuodessa — enemmän kuin osavaltion koko
väkiluku 1900-luvun alussa.

Faktat ja lähteet:
- Kings Park järjestää syyskuussa Australian suurimman
  villikukkanäyttelyn ja -festivaalin; puistossa yli 324 alkuperäistä
  kasvilajia. — en-Wikipedia "Kings Park, Western Australia"
- Länsi-Australian suosituin yksittäinen matkailukohde, yli 5,8
  miljoonaa kävijää vuodessa (2012). — en-Wikipedia "Kings Park,
  Western Australia"

**Jakso 4 — Historian käännekohta: kaupunki vuonna 1870**

Melbournelaistoimittaja kuvaili Perthiä 1870 — kolme vuotta ennen
isoisän matkaa — "hiljaiseksi pikkukaupungiksi, jossa asuu noin 3000
ihmistä hajanaisissa tonteissa aina rantaan asti, puutarhojen ja
pensasaitojen keskellä, puoliksi maalaismainen ilmeeltään".
Pääkadut olivat sorapäällysteisiä, mutta sivukadut ja useimmat
jalkakäytävät olivat paljasta hiekkaa. Isoisä näki siis kaupungin
juuri ennen kultaryntäyksen muuttamaa vuosikymmentä.

Faktat ja lähteet:
- Melbournelaistoimittajan kuvaus Perthistä 1870: "a quiet little town
  of some 3000 inhabitants spread out in straggling allotments down to
  the water's edge, intermingled with gardens and shrubberies and half
  rural in its aspect ... main streets are macadamised, but the
  outlying ones and most of the footpaths retain their native state
  from the loose sand." — en-Wikipedia "Perth" (siteeraa lehteä The
  Perth Gazette and West Australian Times, 18.3.1870)

**Jakso 5 — Milloin kannattaa tulla**

Perthin ilmasto on kuuman kesän Välimeren-tyyppiä (Köppen: Csa): kesät
ovat kuumia ja kuivia, talvet leudompia ja sateisia. Kaupunki on
Australian aurinkoisin osavaltion pääkaupunki, keskimäärin 3 200
tuntia auringonpaistetta vuodessa. Ennätyskuumin mitattu lämpötila
keskustassa on 46,2 astetta (23.2.1991), kylmin -0,7 astetta
(17.6.2006). Iltapäivän merituuli, jota on kutsuttu Fremantle
Doctoriksi jo 1870-luvulta lähtien — siis isoisän omalta ajalta —
tunkeutuu parhaimmillaan 100 kilometriä sisämaahan asti Yorkiin
saakka.

Faktat ja lähteet:
- Köppen Csa (kuuman kesän Välimeren-ilmasto); n. 3 200
  auringonpaistetuntia vuodessa, Australian aurinkoisin osavaltion
  pääkaupunki. — en-Wikipedia "Perth" (Climate-osio)
- Korkein mitattu lämpötila keskustassa 46,2 °C (23.2.1991); alin
  -0,7 °C (17.6.2006). — en-Wikipedia "Perth" (Climate-osio)
- Termi "Fremantle Doctor" oli käytössä jo 1870-luvulla; merituuli voi
  tunkeutua jopa 100 km sisämaahan, saavuttaen Yorkin illalla. —
  en-Wikipedia "Fremantle Doctor"
- **HUOM:** samoin kuin Melbourne-mallissa, yllä olevat luvut ovat
  en-Wikipedian Climate-osiosta EIVÄTKÄ ole sama asia kuin pelin
  `saatiedot.js`-riville tarvittava ERA5 1991–2020 -normaali. Tarkat
  kuukausinormaalit haetaan kirjoitusvaiheessa
  `tools/hae-saanormaalit.mjs`-työkalulla. En myöskään käyttänyt
  suoraan kulttuurivisan kysymyksen 3 ydinperustelua ("viilentää
  helteisen päivän") — tässä jaksossa Fremantle Doctorista kerrotaan
  vain UUDET faktat (1870-luvun termi, 100 km:n ulottuvuus), ks. osio
  7, huomio 1.

---

## 4. Kymmenen kohdekartan kohdetta

Koordinaatit on haettu kahdella tavalla. Government House ja Perth
Town Hall -artikkeleiden raakatekstissä oli valmis desimaalikoordi-
naatti `{{coord|...}}`-mallineessa. Muiden kohteiden infobox käyttää
Wikidata-viittausta (`{{wikidata|property|P625}}`) eikä anna
desimaalilukua suoraan raakatekstissä — niille haettiin koordinaatti
MediaWikin `action=query&prop=coordinates`-rajapinnasta 23.8.2026
(sama Wikidata-arvo, vain eri hakutapa; ei arvattu eikä laskettu).
Etäisyydet ja suunnat OMIA LASKELMIANI koordinaattieroista (asteet ×
111 km, pituusasteille kerrottu cos(31,957°) ≈ 0,848), tarkistettu
Node-skriptillä — sama menetelmä kuin faktapohja-melbourne.md:ssä.

**Vertailupiste on Government House, ei Wikipedian hallinnollinen
kaupunkipiste** (spec-mantereet.md sääntö 4: kartan keskusta valitaan
historiallisen ytimen mukaan). Government House seisoo Barrack
Streetin ja St Georges Terracen kulmassa — paikassa, jossa kuvernööri
Stirling asui teltassa jo elokuussa 1829, ennen kuin nykyinen
rakennus (valmis 1864, suureksi osaksi vankityövoimalla) nousi samalle
tontille. Wikipedian oma "Perth"-artikkelin infobox-koordinaatti on
poikkeuksellisen epätarkka (`-32, 115.9`, käytännössä vain kahden
desimaalin tarkkuudella) eikä kelpaa vertailupisteeksi sellaisenaan —
se osuisi karkeasti n. 5 km päähän Government Housesta, mutta tarkkaa
etäisyyttä ei kannata laskea näin karkeasta luvusta.

| # | Nimi | Koordinaatit (desimaali) | Lähdeartikkeli | Etäisyys/suunta Government Housesta |
|---|---|---|---|---|
| 1 | Government House (vertailupiste, alkuperäinen 1829 telttaleiri) | 31,957035°S 115,861443°I | "Government House, Perth" | (vertailupiste) |
| 2 | Perth Town Hall | 31,955°S 115,860556°I | "Perth Town Hall" | ~0,24 km pohjoiseen |
| 3 | St George's Cathedral (Fanny Balbukin syntymäpaikan päällä) | 31,955753°S 115,861292°I | "St George's Cathedral, Perth" | ~0,14 km pohjoiseen |
| 4 | Perth Cultural Centre | 31,949699°S 115,860761°I | "Perth Cultural Centre" | ~0,82 km pohjoiseen |
| 5 | Elizabeth Quay | 31,9575°S 115,857°I | "Elizabeth Quay" | ~0,42 km länteen |
| 6 | Perth Mint | 31,9573°S 115,8692°I | "Perth Mint" | ~0,73 km itään |
| 7 | WACA Ground | 31,95985°S 115,8795°I | "WACA Ground" | ~1,73 km itään |
| 8 | Heirisson Island | 31,9657807°S 115,8820498°I | "Heirisson Island" | ~2,17 km kaakkoon |
| 9 | Old Swan Brewery (Goonininup-lähde, Kennedy Spring) | 31,96527778°S 115,84055556°I | "Old Swan Brewery" | ~2,17 km lounaaseen |
| 10 | Kings Park (Mount Eliza / Kaarta Gar-up) | 31,962135°S 115,831712°I | "Kings Park, Western Australia" | ~2,86 km länteen |

**Rajausehdotus:** kaikki kymmenen kohdetta mahtuvat n. 2,9 km
säteelle Government Housesta — samaa tiiviysluokkaa kuin Melbournen
2,4 km:n ja Sydneyn 1,4 km:n ryppäät.

**Yhdestoista ehdokas jätetty pois taulukosta, koordinaatit kuitenkin
talteen:** Fremantle Prison (H1-nostoon ja whadjukit-sivun taustaan
liittyvä UNESCO-maailmanperintökohde, rakennettu vangeilla 1850-luvun
alussa), 32,055014°S 115,753487°I, n. 14,9 km lounaaseen Government
Housesta — selvästi liian kaukana kompaktiin kohdekarttaan, mutta
tärkeä mainita esimerkiksi omana päiväretkikohteenaan matkaoppaassa.

---

## 5. Kuva-aiheet (Commons-kategoriat, ei hakusanoja)

Kategoriat tarkistettu OLEMASSA OLEVIKSI Commonsin
`action=query&titles=Category:...`-kutsulla 23.8.2026 (pelkkä
olemassaolotarkistus — SISÄLTÖÄ EI ole silmäilty, se on kirjoittajan
työ kuvasääntöjen mukaisesti). Yksi kategoria (St George's Cathedralin
oma) EI ollut olemassa täsmällisellä nimellä — ks. huomautus kohdassa.
Alkuperäiskansakuvissa sama arki- ja ylpeyskuvasto kuin muuallakin
pelissä (spec-mantereet.md, Kuvalinjat) — ei kurjuuskuvastoa, ei
pelkkiä seremoniaklišeitä; whadjukit näytetään nykykulttuurina
(esim. Yagan Square, nykyiset kulttuuritapahtumat), ei vain
historiallisina valokuvina.

**Avauskuvat (3):**
1. `Category:Perth, Western Australia` — laaja yleiskuva keskustan
   siluetista Swan-joen yli, esim. Kings Parkin näköalapaikalta.
2. `Category:Kings Park, Western Australia` — puisto ja näköala.
3. `Category:Swan River, Western Australia` — jokinäkymä mustine
   joutsenineen.

**Kansikuvat (3, LAAJOJA YLEISKUVIA — ei yksityiskohtia):**
1. `Category:Perth, Western Australia` — keskustan siluetti joen
   toiselta puolelta (South Perth tai Kings Park).
2. `Category:Elizabeth Quay` — rantaraitin ja keskustan yleiskuva.
3. `Category:Fremantle, Western Australia` — sataman/vanhankaupungin
   yleiskuva.

**Nosto-/jaksokuvat, sivuittain:**

*Kaupunki:*
- `Category:Kings Park, Western Australia` (K1 — Kennedy Spring/
  Goonininup, jos kategoriasta löytyy erikseen kuvattu lähdekohta)
- `Category:Perth, Western Australia` (K2 — yleiskuva/vanha kartta)
- `Category:Convicts in Western Australia` (K3)
- `Category:Perth Mint` (K4)

*Historia:*
- `Category:Perth Town Hall` (H1 — erityisesti nuolimerkki-ikkunat
  lähikuvassa)
- `Category:Government House, Western Australia` (H2)
- `Category:Fremantle Prison` (H3 — EI vankeja/kasvoja, rakennus ja
  selli-/pihakuvat)
- `Category:Convicts in Western Australia` (H4)

*Luonto:*
- `Category:Kings Park, Western Australia` (L1)
- `Category:Swan River, Western Australia` (L2, L4)
- `Category:Noongar` (L3 — nykykulttuuria, ei historiallista
  kurjuuskuvastoa)

*Whadjukit:*
- `Category:Noongar` (Y1 — nykykulttuuria ja -tapahtumia)
- `Category:Yagan` (Y2, Y3 — patsaat ja muistomerkit, EI historiallisia
  "kuriositeettikuvia" päästä)
- `Category:Yagan Square` (Y4)

*Kohdekartta (täydentäviksi, ei nostoa varten):*
- `Category:WACA Ground`
- `Category:Heirisson Island`
- `Category:Old Swan Brewery`
- `Category:Perth Cultural Centre`

**St George's Cathedralin kategoria EI ollut olemassa täsmälleen
tällä nimellä** (`Category:St George's Cathedral, Perth` palautti "ei
ole") — kirjoittajan pitää hakea oikea kategorianimi Commonsista
erikseen (todennäköisesti jokin muu muotoilu, esim. ilman pilkkua tai
eri sanajärjestyksessä) ennen kuvavalintaa kohdekartan kohteelle 3.

---

## 6. Säätiedot

Ks. osio 3, Jakso 5 — samat luvut, sama lähde (en-Wikipedian
Climate-osio, EI ERA5).

---

## 7. Ristiriidat, epävarmuudet ja huomiot

1. **Kulttuurivisan (`oceania-questions.js`, kohta `perth`) ydintä on
   vältetty tietoisesti.** Visan kolme faktaa ovat: (a) eristyneisyys
   — lähin miljoonakaupunki yli 2000 km päässä, (b) läheisyys
   Jakartaan verrattuna Sydneyhin, (c) Fremantle Doctorin nimi ja syy
   ("viilentää helteisen päivän"). En tehnyt yhtään nostoa kohteista
   (a) tai (b) — isolaatiofaktaa ei mainita missään osiossa 2 tai 3.
   Fremantle Doctor mainitaan VAIN jakso 5:ssä, ja silloinkin vain
   UUSILLA faktoilla (termi käytössä jo 1870-luvulla, ulottuu 100 km
   sisämaahan) ilman visan "viilentää helteisen päivän" -perustelun
   toistoa — samalla varovaisuudella kuin Melbourne-mallissa
   (faktapohja-melbourne.md, osio 7, huomio 6) vältettiin visan
   ydinperusteluiden toistoa.
2. **Kolme teemasivua, ei yhtä tai kahta.** Aineisto kantoi selvästi
   kolme erillistä, päällekkäisyydetöntä teemaa: historia (convict-era
   rakennukset ja hallinto), luonto (Kings Park/Swan-joki luonnon-
   ympäristönä) ja whadjukit (kansan oma historia Yaganista
   nykytunnustukseen). Näistä mikään ei olisi karsittavissa ilman
   merkittävää sisältöhävikkiä — erityisesti whadjukit-sivu on
   suoraa vastausta tehtävänannon erikseen korostamaan
   kunnioitus-vaatimukseen (pilari 3), enkä halunnut typistää sitä
   sivuhuomautukseksi jollekin toiselle sivulle.
3. **Government House vertailupisteenä, ei Wikipedian hallinnollinen
   piste.** Ks. osio 4 — Wikipedian "Perth"-artikkelin
   infobox-koordinaatti on epätavallisen karkea (`-32, 115.9`, vain
   kahden desimaalin tarkkuudella), joten sitä ei käytetty edes
   vertailulukuna taulukossa (toisin kuin Melbournen mallissa, jossa
   Wikipedian hallinnollinen piste oli tarkka ja kelpasi
   vertailuriviksi).
4. **Koordinaatit haettu kahdella tavalla** — osa suoraan artikkelin
   raakatekstin `{{coord|desimaali|desimaali|...}}`-mallineesta
   (Government House, Perth Town Hall), osa MediaWikin
   `action=query&prop=coordinates`-rajapinnasta, koska artikkeleiden
   infobox käytti Wikidata-viittausta eikä desimaalilukua näkynyt
   raakatekstissä suoraan (Kings Park, Perth Mint, Elizabeth Quay,
   Fremantle Prison, WACA Ground, St George's Cathedral, Perth
   Cultural Centre, Heirisson Island, Old Swan Brewery). Kumpikin
   reitti palauttaa saman Wikidata-arvon — kyse on vain siitä, missä
   muodossa se on julkisesti näkyvissä — joten en pidä tätä
   fakta-arvona vaan vain hakutavan kirjauksena.
5. **Verkkokutsut kohtasivat toistuvasti 429-rajoituksia**
   (Wikimedian "Too many requests"), erityisesti MediaWiki-
   koordinaattihauissa ja Commons-kategoriatarkistuksissa. Kaikki
   uusittiin kasvavalla viiveellä (8 s → 64 s) resepti-ohjeen
   mukaisesti, eikä yksikään haku palautunut tyhjänä tai arvattuna —
   vain hitaammin.
6. **Fremantle Doctor -termin ja lähdejoen (Derbarl Yerrigan) ero.**
   Fremantle Doctor -sanan alkuperästä ei ole varmaa yksittäistä
   selitystä (en-Wikipedian artikkeli toteaa alkuperän olevan
   tuntematon, vain käyttöajan 1870-luvulta olevan tiedossa) —
   EPÄVARMA-merkintä kirjoittajalle: älä keksi tarkkaa alkuperä-
   tarinaa, vain toteamus "nimen alkuperä ei ole tarkkaan tiedossa,
   käytössä viimeistään 1870-luvulta".
7. **Yaganin kuolinvuosipäivä ja uudelleenhautauspäivä eivät ole
   täsmälleen sama päivä** (kuolema 11.7.1833, uudelleenhautaus
   10.7.2010, siis päivää ennen 177. vuosipäivää, ei sinä päivänä) —
   tarkistin tämän erikseen, koska ensimmäinen lukukerta antoi
   virheellisen vaikutelman täsmäosumasta; nosto Y3 on korjattu
   sanomaan "lähellä" vuosipäivää, ei "sinä päivänä".
8. **Sukupolvien erottaminen (Stolen Generations) ja 1927 Perth
   Prohibited Area -kielto eivät nouse tässä koosteessa** yksityis-
   kohtaisesti — samalla ratkaisulla kuin faktapohja-melbourne.md:ssä:
   nämä 1900-luvun tapahtumat (mm. Aboriginaalien pääsykielto suuriin
   osiin Perthiä 1927–1954) kuuluvat myöhempään aikaan kuin tämän
   1873-painotteisen kaupunkilehden luonteva aikahaarukka, mutta
   niitä ei ole myöskään kielletty käyttämästä — jos kirjoittaja
   haluaa syventää whadjukit-sivua, 1927 Perth Prohibited Area on
   valmiiksi lähteistetty en-Wikipedian "Perth"-artikkelin
   Federation-osiossa.
9. **`docs/mantereet-tyoaineisto/spec-mantereet.md` luettiin
   omatoimisesti**, koska se on SITOVA koko Oseanian laudalle eikä
   sen lukematta jättäminen olisi ollut turvallista annetun
   kunnioitus-vaatimuksen kannalta — sama perustelu kuin
   faktapohja-melbourne.md:ssä.
10. **Vain en-Wikipediaa ja sen raakatekstiä (action=raw) tai
    MediaWiki-rajapintaa (action=query, samaa Wikidata-arvoa hakien)
    käytetty kaikkiin faktoihin ja koordinaatteihin**, paitsi Commons-
    kategorioiden olemassaolotarkistukseen (osio 5), joka käytti
    Commonsin `action=query`-rajapintaa vain kategorianimien
    vahvistamiseen — EI kuvasisällön tarkistamiseen. Ei ulkopuolisia
    hakuja tämän faktapohjan sisältöön.
11. **Kaikki nostot ja jaksot on kirjoitettu valmiiksi suomenkieliseksi
    tekstiksi** merkkimäärävaatimusten mukaan (johdannot 213–232 mrk,
    nostot 443–657 mrk, kaikki 440–660 mrk:n sisällä) ja tarkistettu
    koneellisesti Node-skriptillä, joka laskee jokaisen lainausosion
    merkkimäärän tiedostosta erikseen — merkinnät otsikoissa ovat
    skriptin mittaamia todellisia arvoja, ei arvioita.
