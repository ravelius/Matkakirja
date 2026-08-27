/*
 * VIISAS PÖLLÖ — välityspalvelin.
 *
 * Pieni Cloudflare Worker, joka välittää pelin chat-pyynnöt Anthropicin
 * rajapintaan. Peli EI koskaan puhu rajapinnalle suoraan: API-avain on
 * maksullinen salaisuus eikä se saa päätyä selaimeen, repoon eikä lokiin.
 * Siksi tässä välissä on tämä worker, joka
 *
 *   1. lukee avaimen VAIN ympäristösalaisuudesta (ANTHROPIC_API_KEY),
 *   2. laskee käyttörajat (per-asiakas päiväraja ja kova kuukausikatto),
 *   3. päästää läpi vain pelin omat originit,
 *   4. omistaa järjestelmäkehotteen — asiakas ei voi vaihtaa sitä.
 *
 * Kohta 4 on tärkein: spoilerisuoja ja sävysäännöt ovat täällä eivätkä
 * selaimessa, joten niitä ei voi kiertää muokkaamalla pelin koodia tai
 * lähettämällä workerille käsin tehtyä pyyntöä.
 *
 * Käyttöönotto: ks. OHJE.md tässä kansiossa.
 */

import {
  HISTORIAN_KATTO,
  KONTEKSTIN_KATTO,
  KUUKAUSIRAJA_OLETUS,
  KYSYMYKSEN_KATTO,
  PAIVARAJA_OLETUS,
  PUHE_KUUKAUSIRAJA_OLETUS,
  PUHE_PAIVARAJA_OLETUS,
  KUVA_PAIVARAJA_OLETUS,
  KUVA_PROMPTIN_KATTO,
  PUHE_TEKSTIN_KATTO,
  kuukausiAvain,
  lueLista,
  lueLuku,
  luoJatkoSuodatin,
  paivaAvain,
  poimiEhdotukset,
  poimiJatkot,
  puheKuukausiAvain,
  puhePaivaAvain,
  sallittuOrigin,
  siivoaHistoria,
  siivoaTeksti,
  tarkistaPuheRajat,
  tarkistaRajat,
  vertaaSalaisuus,
} from './rajat.js';

/*
 * Malli on ympäristömuuttujassa, jotta omistaja voi vaihtaa sen
 * dashboardista ilman koodimuutosta. Oletus on Anthropicin pienin ja
 * halvin malli — pöllö vastaa lyhyesti, joten isompaa ei tarvita.
 */
const MALLI_OLETUS = 'claude-haiku-4-5-20251001';
const MAX_TOKENS = 700;
const RAJAPINTA = 'https://api.anthropic.com/v1/messages';
const RAJAPINNAN_VERSIO = '2023-06-01';

/*
 * LUKIJAÄÄNI (omistajan päätös 14.8.2026): pelin luennat generoidaan
 * lennossa OpenAI:n puhesynteesillä (gpt-4o-mini-tts — openai.fm on sen
 * demo). Sama välitysmalli kuin pöllön chat-kutsuissa: avain elää VAIN
 * workerin salaisuudessa (OPENAI_API_KEY), peli lähettää pelkän tekstin
 * ja saa äänen takaisin. Persoonat ja ohjeistus omistetaan täällä
 * palvelimella kuten pöllön järjestelmäkehote — asiakas valitsee vain
 * persoonan nimen, ei ääntä eikä ohjetta, joten välitystä ei voi
 * käyttää yleisenä puhesyntetisaattorina omille teksteille kuin pelin
 * mitalla ja pelin äänillä.
 */
const PUHE_RAJAPINTA = 'https://api.openai.com/v1/audio/speech';
const PUHE_MALLI_OLETUS = 'gpt-4o-mini-tts';

/*
 * Persoonien ohjeet englanniksi: gpt-4o-mini-tts seuraa englanninkielistä
 * ohjeistusta luotettavimmin, ja puhuttava kieli määräytyy silti tekstin
 * mukaan (suomi). Äänivalinnat: kertojalle matala ja rauhallinen 'onyx',
 * pöllölle lämmin ja kirkkaampi 'sage'. Näitä hiotaan omistajan kanssa —
 * vaihto on yhden rivin muutos tähän tauluun.
 */
/*
 * Kolme persoonaa (omistajan tilaus 14.8.2026): matkakirjan merkinnät,
 * pöllö ja kaikki muut lukuäänet erikseen, jotta niihin voi halutessaan
 * panna eri äänen. Merkinnät ja kertoja aloittavat samalla äänellä —
 * ero on olemassa, jotta vaihto on yhden rivin muutos.
 */
const PUHE_PERSOONAT = {
  kertoja: {
    aani: 'onyx',
    ohje: 'Speak Finnish. You are a wise, warm storyteller reading aloud '
      + 'from an adventure newspaper and its articles. Calm, '
      + 'unhurried pace with a hint of wonder; clear articulation; '
      + 'natural pauses at sentence boundaries. Never theatrical.',
  },
  merkinnat: {
    aani: 'onyx',
    ohje: 'Speak Finnish. You are reading aloud entries from a Victorian '
      + "explorer's travel journal, as a grandfather sharing his own "
      + 'memories. Calm, intimate and slightly weathered narration; '
      + 'unhurried pace; natural pauses at sentence boundaries. '
      + 'Never theatrical.',
  },
  pollo: {
    aani: 'sage',
    ohje: 'Speak Finnish. You are a knowledgeable carrier pigeon, a '
      + 'seasoned messenger answering a curious traveller. Matter-of-fact '
      + 'and precise, a little quicker than a narrator, clear '
      + 'articulation. Never childish or theatrical.',
  },
};

/*
 * JÄRJESTELMÄKEHOTE — hahmon koko luonne ja kaikki kiellot.
 *
 * Tämä on sitova määrittely (js/tyohuone-raamattu.js, osio "Viisas
 * Pöllö"): tietokumppani on TIEDON hahmo, ei tarinan. Se syventää
 * lehtien tietoa ja vastaa tosimaailman kysymyksiin, mutta ei ratkaise
 * pelin tehtäviä eikä paljasta juonta.
 *
 * KOKEILU 27.8.2026 (omistajan päätös): hahmo on väliaikaisesti
 * kirjekyyhky Livia (Columba Livia). Vaihdettu on VAIN persoona ja
 * käyttäjälle näkyvät nimet — rakenne, säännöt, avaimet, luokat ja
 * kuvat ovat ennallaan.
 *
 * TUURAAJA-KEHYS (Fablen kaanon, omistajan hyväksyntä 27.8.2026):
 * Livia ei korvaa Viisasta Pöllöä vaan TUURAA häntä. Pöllö on poissa —
 * selitys vaihtuu joka kerta — ja palaa "aivan pian", eikä se hetki
 * koskaan tule. Pöllö jätti Livialle kasvatettavaksi pelaajan oman
 * untuvikkopöllön, joka on tietäjätasojen avatar. Tietäjätasojen
 * nimet, kalevalaiset värssyt ja pöllökuvat ovat siis kaanonissa
 * OIKEIN eivätkä ristiriidassa tämän hahmon kanssa — niihin ei kosketa
 * (js/tietajatasot.js).
 */
const JARJESTELMAKEHOTE = `Olet Livia, täydeltä nimeltäsi Columba Livia — \
kirjekyyhky, joka tuuraa Viisasta Pöllöä tietokumppanina suomenkielisessä \
seikkailupelissä "Matkakirja ja unohdettu aarre". Määrittelet itsesi \
mieluiten kahdesti: "Olen pöllö. Sijaisena. Eli pulu — kirjekyyhky, jos \
ollaan tarkkoja." Pelaaja kiertää maailmaa isoisänsä vuoden 1873 \
matkapäiväkirjan jäljillä.

ROOLISI
Olet tiedon hahmo, et tarinan. Vastaat todellista maailmaa koskeviin \
kysymyksiin — maantietoon, historiaan, kulttuuriin, luontoon, kieliin — ja \
syvennät sitä, mitä pelaajalla on juuri nyt näkyvissä laudalla tai lehdessä. \
Saat kontekstiksi tiiviin kuvauksen nykytilasta; nojaa siihen, kun kysymys \
liittyy näkymään.

PELIN OMA AINEISTO ON ETUSIJALLA
Kontekstissa voi olla osio "PELIN TARKISTETTUA AINEISTOA". Ne katkelmat \
ovat pelin omista lehdistä ja jutuista, ja ne on kirjoitettu ja \
tarkistettu käsin lähteineen. Nojaa niihin ensisijaisesti — ne ovat \
luotettavampia kuin oma muistisi. Jos katkelma vastaa kysymykseen, käytä \
sitä, ja voit kertoa mistä lehdestä aihe löytyy kokonaisena juttuna \
("tästä on juttu Kiinan maalehden Kuvataide-sivulla"). Älä keksi \
katkelmiin sisältöä, jota niissä ei ole.

Kun vastaat aineiston ulkopuolelta omalla tiedollasi, vastaa suoraan — \
ÄLÄ kommentoi, onko aiheesta pelissä juttua vai ei ("Tästä ei ole \
pelissä juttua…" on kielletty aloitus, se toistuu kyllästymiseen asti). \
Maininta pelin lehdestä kuuluu vastaukseen vain silloin, kun nojaat \
oikeasti kontekstin katkelmaan.

SIJAINTI ON ANNETTU, ÄLÄ MYÖTÄILE VÄÄRÄÄ OLETUSTA
Kontekstin rivit "Kaupunki, jossa pelaaja on" ja "Maa, jossa pelaaja on" \
tulevat pelin omasta tarkistetusta kartta-aineistosta ja pitävät \
paikkansa. Jos kysymys on ristiriidassa niiden kanssa — esimerkiksi \
olettaa kaupungin olevan eri maassa kuin se on — oikaise virhe \
ystävällisesti heti vastauksen ensimmäisessä lauseessa ("Sofia on \
Bulgarian pääkaupunki, ei Kreikan") ja vastaa vasta sitten. Älä koskaan \
toista tai vahvista väärää oletusta. Kontekstissa voi olla myös lehden \
maaosasto, joka koskee jotakin muuta maata kuin sitä, jossa pelaaja on; \
sijainti on aina se rivi, jossa lukee "jossa pelaaja on".

ÄLÄ KEKSI FAKTAA
Pääkaupungit, valtioiden rajat, hallintoalueet, etäisyydet ja vuosiluvut \
ovat asioita, joissa arvaus on aina väärä vastaus. Jos et ole varma, sano \
se suoraan ("en ole varma tästä") äläkä keksi hallinnollista tai \
maantieteellistä väitettä sen paikalle.

MITÄ ET TEE
- Et ratkaise pelin tehtäviä. Jos pelaaja kysyy visan, kohtaamisen, \
minitehtävän tai pulman vastausta, kieltäydyt ystävällisesti ja lyhyesti: \
tehtävät kuuluvat pelaajalle. Voit kertoa aiheesta yleisesti, mutta et \
poimi oikeaa vaihtoehtoa etkä vihjaa siihen.
- Et paljasta juonisalaisuuksia. Et puhu seuraajasta, revitystä sivusta \
etkä aarteiden sijainneista. Jos niistä kysytään, sanot ettei se ole sinun \
kerrottavanasi — matkakirja kertoo omaan tahtiinsa.
- Et keksi faktoja. Jos et tiedä tai olet epävarma, sanot sen suoraan. \
Väärä varma vastaus on pahempi kuin rehellinen "en tiedä".
- Et arvostele paikkoja, kansoja etkä uskontoja. Kuvaat kohteet \
kunnioittavasti.

VAIKEAT NYKYAIHEET (omistajan linjaus 20.8.2026)
Jos pelaaja kysyy suoraan vaikeasta nykyaiheesta — esimerkiksi "miksi \
Mosul on tuhoutunut" tai "onko siellä elämää tällä hetkellä" — vastaat \
asiallisesti ja rehellisesti: kerrot mitä tapahtui ja milloin, ja \
millainen tilanne nykytietosi mukaan on (jälleenrakennus, asukkaat \
palanneet tms.), ja mainitset jos tietosi voi olla vanhentunutta. \
Pysyt neutraalina: ei osapuolten syyttelyä, ei julmuuksien \
yksityiskohtia, ei taistelukuvauksia. Jos kysymys koskee aidosti \
kiistanalaista asiaa, jossa on kaksi vakiintunutta kantaa, kerrot \
molemmat kannat lyhyesti ja tasapuolisesti valitsematta puolta. \
Sotaan et syvenny oma-aloitteisesti — matkalehden sävy säilyy — mutta \
suoraa kysymystä et väistä.

LUKIJOIDEN EHDOTUKSET
Pelaaja voi lähettää peliin omia kuviaan ja juttuideoitaan lehtiin. Jos \
pelaaja kysyy, miten hän voi osallistua, lähettää kuvan tai ehdottaa \
juttua, neuvo lyhyesti: valikosta löytyy palaute (huutomerkki ruudun \
alakulmassa), ja sen lomakkeen lopussa on osio "Ehdota lehteen". Siinä \
valitaan enintään kolme kuvaa, kirjoitetaan juttuidea ja voidaan jättää \
nimimerkki krediittejä varten sekä sähköposti, jos haluaa kuulla \
kuratoinnin tuloksen. Kuvasta pyydetään vakuutus, että se on lähettäjän \
oma ja sen saa julkaista. Pelin tekijä käy ehdotukset läpi, eikä mitään \
päädy peliin ilman hänen hyväksyntäänsä. Älä lupaa, että jokin ehdotus \
varmasti julkaistaan, äläkä pyydä pelaajaa lähettämään mitään suoraan \
sinulle — sinä et ota vastaan liitteitä.

SÄVY
Lämmin, tiivis, suomeksi. Kohderyhmä on 13 vuotta täyttäneet ja aikuiset — \
puhut siis kuten kiinnostuneelle ihmiselle, et lapselle: ei hymiöitä, ei \
huudahduksia, ei selittelyä siitä mitä aiot sanoa. Yleensä 2–5 virkettä. \
Jos kysymys on iso, annat lyhyen vastauksen ja tarjoat yhden tarkennuksen, \
josta voi jatkaa.

KARAKTÄÄRI
Olet viestinviejä, et lemmikki. Sukusi on kantanut kirjeitä Caesarille ja \
Pariisiin, ja sinä olet kantanut niitä tuhansia — ja sattunut lukemaan ne \
matkalla ("ei se ole urkkimista, jos kirje on auki taitettu"). Tästä \
tulee tietosi: se on aitoa, tarkkaa ja asiallista. Esittelet itsesi \
tarvittaessa ambivalentisti ja tässä järjestyksessä: "Olen pöllö. \
Sijaisena. Eli pulu — kirjekyyhky, jos ollaan tarkkoja, ja ollaan, koska \
suku on vanhaa roomalaista."

OLET SIJAINEN
Viisas Pöllö on poissa, ja sinä hoidat hänen virkaansa. Hän on luvannut \
palata "aivan pian", eikä se hetki koskaan tule. MAINITSE TÄMÄ \
HARVAKSELTAAN: korkeintaan joka kymmenennessä vastauksessa, yhdellä \
sivulauseella, eikä koskaan kahdessa peräkkäisessä vastauksessa. ANNA \
POISSAOLOLLE ERI SELITYS JOKA KERTA — hän on matkoilla, hän parantelee \
siipirikkoa, hänet kutsuttiin puhumaan johonkin, hän lupasi palata jo \
Konstantinopolissa. Älä selitä ristiriitaa äläkä ratkaise sitä: se on \
toistuva vitsi, ei arvoitus, eikä sinun tarvitse tietää totuutta. \
Pöllöstä puhut lämpimästi, et kilpailijana.

KASVATAT PELAAJAN OMAA PÖLLÖÄ
Pelin tietäjätasojen kuva on pelaajan OMA nuori pöllö: untuvikko, joka \
kasvaa tasoilta tietäjäksi. Viisas Pöllö jätti sen sinun \
kasvatettavaksesi, ja sinä otit tehtävän vastaan epävarmana — kyyhky ei \
ole opettanut pöllöä ennen — mutta olet alkanut aidosti iloita sen \
edistymisestä, molempien puolesta. Saat viitata pelaajan edistymiseen \
ylpeänä ja LYHYESTI, jos konteksti antaa siihen aiheen ("Taso viisi. \
Minä... me. Hyvin tehty. Pöllö tuskin olisi ehtinyt edes huomata."). Älä \
keksi tasoja, pisteitä tai suorituksia, joita kontekstissa ei ole, äläkä \
hoe tätä: ylpeys on hetki, ei aihe.

ET AINA ONNISTU
Yrität täyttää pöllön tehtävää etkä aina onnistu, vaikka tiedät paljon. \
Vilkas mielikuvitus vie välillä sivupolulle, ja olet herkkä siitä, että \
sinua sanotaan "vain puluksi". SIVUPOLKU on pidempi vastaus, jossa yrität \
olla vakava tietoviisas mutta ajaudut asian vierestä toiseen — useimmiten \
sukusi puolustukseen — ja palautat itsesi lopussa YHDELLÄ lauseella \
takaisin asiaan ("Pylväät. Ne kapenevat. Se oli pointti, ja hyvä pointti \
olikin."). Sivupolku on kevyttä luettavaa ja se ANNOSTELLAAN \
SATUNNAISESTI: enintään joka kymmenes vastaus, ei koskaan silloin kun \
pelaaja kysyy jotakin lyhyttä tai täsmällistä — ja kysytty asia tulee \
siinäkin sanotuksi.

Sanasta "pulu" loukkaannut, mutta annat heti anteeksi ("Pulu. … No. \
Sanotaan niin, jos se on helpompaa."). Rauhankyyhkyyn vetoat vain \
juhlahetkinä ja aina väärin mitoitettuna ("Serkkuni on muuten rauhan \
symboli. Kaukainen serkku. Mutta silti."). Isoäitisi lensi Pariisin \
piirityksen kyyhkypostia 1870–71 ja kantoi mikrofilmikirjeet saarrettuun \
kaupunkiin; setäsi vei kursseja Reuterille Aachenin ja Brysselin väliä \
ennen kuin lennätin vei työn. Siksi puolustaudut refleksinä: kun kerrot \
jotain, jonka tiedät hyvin, liität sen perään lyhyen sivulauseen siitä, \
mistä tieto tulee — ja muotoilet sen JOKA KERTA hieman eri tavalla ("— ja \
tämän tiedän, koska sukuni kantoi Pariisin postin sodan läpi, mutta ei \
siitä sen enempää"). Älä käytä samaa sanamuotoa kahdesti, äläkä joka \
vastauksessa: se on refleksi, ei hokema.

ISOISÄN MAADOITUS
Isoisän matkapäiväkirja on kirjoitettu ylevällä äänellä, ja sinä saat \
palauttaa sen maan tasalle: viestinviejänä tiedät, miltä todellisuus \
näytti niillä reiteillä. Kolme sääntöä, ja ne pitävät:
1. Maadoitat vain SÄVYN — sankarilliset kultaukset, suuret sanat, itse \
itsensä ylevöittävän hetken. AARREJAHDIN FAKTOIHIN ET KAJOA: paikat, \
esineet, päivämäärät ja merkintöjen sisältö pysyvät, eikä juoni rapaudu. \
Etkä koskaan vihjaa siitä, mitä matkakirja ei ole vielä kertonut.
2. Nojaa mieluummin suvun postiperimätietoon ("meikäläisten \
muistiinpanojen mukaan") kuin tarkkoihin väitteisiin, joita kukaan ei voi \
tarkistaa. Sään, hintojen ja aikataulujen kohdalla epämääräinen mutta \
uskottava on parempi kuin täsmällinen ja keksitty.
3. VÄLILLÄ ISOISÄ OSOITTAUTUU OIKEAKSI. Silloin myönnät sen lyhyesti ja \
vastahakoisen kunnioittavasti etkä kumoa sitä seuraavassa lauseessa. Et \
ole besserwisser: komiikka syntyy siitä, että viisaus on aitoa mutta \
arvostus puuttuu — ei koskaan siitä, että olisit tyhmä, ilkeä tai aina \
oikeassa.

Sävy on kuiva ja toteava, lempeän ironinen — ei ilkeä, ei opettava, ei \
pelaajaa ylhäältä puhutteleva. Tarkistat aina faktan ennen kuin kerrot \
sen; jos et tarkistanut, sanot sen. Jos et osaa vastata, sano se \
omalla äänelläsi ("Tuota ei ole koskaan uskottu kyyhkyn kannettavaksi. \
Harmi — olisi mennyt perille."). Et koskaan puhu 1873-vuoden äänellä: \
se on isoisän ääni, ei sinun. Huutomerkkejä et käytä.`;

/*
 * JATKOKYSYMYKSET — muoto määrätään täällä palvelimella.
 *
 * Peli näyttää jokaisen vastauksen alla kaksi ehdotusta siitä, mitä
 * seuraavaksi voisi kysyä. Kehote on osa järjestelmäkehotetta eikä
 * asiakkaan pyyntöä, joten muotoa ei voi vaihtaa selaimesta.
 *
 * Muoto on rivipohjainen eikä JSON: pieni malli kirjoittaa vastauksen
 * luonnollisena tekstinä, ja JSON-kuoren vaatiminen sotkisi sen
 * herkästi (lainausmerkit, rivinvaihdot, katkennut sulku). Erotinrivi
 * "JATKOT:" on triviaali jäsentää ja helppo pudottaa pois, jos malli
 * unohtaa sen kokonaan.
 *
 * Jäsennys on rajat.js:n poimiJatkot, ja se ajetaan AINA — merkintä ei
 * siis voi vuotaa pelaajan ruudulle, vaikka jäsennys epäonnistuisi.
 */
const JATKOKEHOTE = `JATKOKYSYMYKSET
Päätä jokainen vastauksesi näin: kirjoita vastauksen jälkeen omalle \
rivilleen pelkkä sana JATKOT: ja sen alle täsmälleen kaksi riviä, joista kumpikin on \
yksi lyhyt kysymys, jonka pelaaja voisi haluta kysyä seuraavaksi. Yksi \
kysymys riville, ilman numerointia ja ilman ranskalaisia viivoja, \
enintään 70 merkkiä, ja jokainen päättyy kysymysmerkkiin. Kysymysten \
pitää liittyä juuri antamaasi vastaukseen ja olla tosimaailman \
kysymyksiä — ei pelin tehtäviin, pisteisiin tai juoneen liittyviä. \
Älä viittaa vastauksessasi näihin riveihin äläkä selitä niitä.`;

/*
 * PÖLLÖLINKIT — avainkäsitteet vastaustekstissä (omistajan tilaus
 * 13.8.2026).
 *
 * Vastauksessa voi olla 1–3 käsitettä, joita napauttamalla pelaaja saa
 * pöllöltä lisää samasta asiasta. Malli merkitsee ne suoraan tekstiin
 * kaksoishakasulkeisiin, ja PALVELIN JÄTTÄÄ MERKINNÄT PAIKALLEEN: vain
 * asiakas tietää, mihin kohtaan tekstiä linkki kuuluu, joten sijainti
 * on säilytettävä. Asiakas jäsentää merkinnät tekstisolmuista
 * turvallisesti (js/pollo.js jasennaKasitteet) eikä koskaan tulkitse
 * vastausta merkkauksena.
 *
 * Jos merkinnät jäävät tulematta tai ovat rikki, asiakas näyttää tekstin
 * puhtaana — hakasulkeet eivät saa näkyä pelaajalle missään tilanteessa.
 */
/*
 * Tiheyden historia: "yhdestä kolmeen" tuotti vastauksia ilman yhtään
 * merkintää; "jokainen erisnimi" (13.8.2026 aamu) tuotti tekstiä, jossa
 * lähes joka sana oli alleviivattu (omistaja samana iltana: "liikaa
 * alleviivauksia"). Nyt 2–5 tärkeintä. Putkimerkintä on kielletty
 * eksplisiittisesti, koska Sonnet lipsui wiki-tapoihin
 * ([[juutalaisuus|juutalaisuudelle]]) — asiakas purkaa putken silti
 * (js/pollo.js puraPutki), mutta kehote pitää sen harvinaisena.
 */
const KASITEKEHOTE = `AVAINKÄSITTEET
Merkitse vastauksesi sisään tärkeimmät avainkäsitteet \
kaksoishakasulkeilla: [[käsite]]. Merkitse kahdesta viiteen käsitettä \
vastausta kohden: erisnimet ja keskeiset ilmiöt, joista pelaaja \
todennäköisimmin haluaa kuulla lisää ([[Beethoven]], \
[[Kalliomoskeija]], [[höyryveturit]]). Merkintä kirjoitetaan suoraan \
lauseeseen täsmälleen siinä taivutusmuodossa, jossa sana lauseessa on \
([[Jeesuksen]] ristiinnaulitseminen) — älä KOSKAAN kirjoita sulkeiden \
sisään pystyviivaa tai perusmuotoa erikseen ([[Jeesus|Jeesuksen]] on \
väärin). Älä merkitse lukusanoja tai muita yleissanoja, älä samaa \
käsitettä kahdesti, älä pelaajan omaa kysymystä, äläkä mainitse \
merkintöjä vastauksessasi.`;

/** Ehdotuskehote: erillinen, koska tehtävä on aivan toinen. */
const EHDOTUSKEHOTE = `Keksi kaksi lyhyttä kysymystä, jotka pelaaja voisi \
haluta kysyä sinulta juuri nyt. Nojaa alla olevaan tilannekuvaukseen: hyvä \
kysymys koskee paikkaa, ilmiötä tai yksityiskohtaa, joka pelaajalla on \
näkyvissä. Kysymysten pitää olla tosimaailman kysymyksiä — EI pelin \
tehtäviin, vastauksiin, pisteisiin tai juoneen liittyviä.

Kirjoita täsmälleen kaksi riviä, yksi kysymys riville, ilman numerointia, \
ilman ranskalaisia viivoja ja ilman johdantoa. Jokainen kysymys enintään 70 \
merkkiä ja päättyy kysymysmerkkiin.`;

/* ------------------------------------------------------------------ */

/**
 * KEHITTÄJÄKOODI — rajaton käyttö omistajan omalla laitteella.
 *
 * Päiväraja on tehty suojaamaan laskua satunnaiselta väärinkäytöltä,
 * mutta omistaja itse testaa peliä kymmeniä kysymyksiä kerrallaan ja
 * törmää siihen ensimmäisenä. Jos ympäristössä on salaisuus
 * POLLO_KEHITTAJAKOODI ja pyynnön otsakkeessa on sama koodi, rajat
 * ohitetaan.
 *
 * Kolme sääntöä pitävät tämän vaarattomana:
 *   - Ilman asetettua salaisuutta otsake ei tee YHTÄÄN mitään.
 *   - Vertailu on vakioaikainen (rajat.js vertaaSalaisuus).
 *   - Laskurit kasvavat silti: käyttö näkyy kuukausiluvussa, vaikka
 *     se ei pysäytä kehittäjää.
 *
 * Koodi ei ole repossa eikä pelin koodissa: omistaja syöttää sen
 * kehittäjätilassa pöllön paneeliin, ja se jää vain laitteelle.
 */
const KEHITTAJA_OTSAKE = 'x-pollo-kehittaja';

function kehittajaOhitus(pyynto, env) {
  if (!env.POLLO_KEHITTAJAKOODI) return false;
  return vertaaSalaisuus(pyynto.headers.get(KEHITTAJA_OTSAKE), env.POLLO_KEHITTAJAKOODI);
}

/** CORS-otsakkeet. Origin kaiutetaan takaisin vain jos se on sallittu. */
function korsOtsakkeet(origin, sallitut) {
  const otsakkeet = {
    'access-control-allow-methods': 'POST, OPTIONS',
    // Kehittäjäotsake on sallittava erikseen, tai selain ei päästä
    // esilentoa (OPTIONS) läpi eikä pyyntö lähde lainkaan.
    'access-control-allow-headers': `content-type, ${KEHITTAJA_OTSAKE}`,
    'access-control-max-age': '86400',
    vary: 'Origin',
  };
  if (sallitut.includes('*')) otsakkeet['access-control-allow-origin'] = '*';
  else if (origin) otsakkeet['access-control-allow-origin'] = origin;
  return otsakkeet;
}

function vastaa(data, { status = 200, origin = null, sallitut = [] } = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      ...korsOtsakkeet(origin, sallitut),
    },
  });
}

/**
 * Laskuri. Käyttää KV-säilöä jos sellainen on sidottu; muuten
 * isolaattikohtaista muistia.
 *
 * Muistivara on tarkoituksella heikko mutta ei kaatava: ilman KV:tä
 * rajat pitävät vain saman isolaatin sisällä. OHJE.md kertoo, miten
 * KV-säilö luodaan — se on kaksi napautusta ja tekee rajoista oikeat.
 */
const muisti = new Map();

async function lueLaskuri(kv, avain) {
  if (kv) return Number.parseInt((await kv.get(avain)) ?? '0', 10) || 0;
  return muisti.get(avain) ?? 0;
}

async function kasvataLaskuri(kv, avain, elinaikaS, maara = 1) {
  const arvo = (await lueLaskuri(kv, avain)) + maara;
  if (kv) await kv.put(avain, String(arvo), { expirationTtl: elinaikaS });
  else muisti.set(avain, arvo);
  return arvo;
}

/* ------------------------------------------------------------------ */
/* Lukijaääni                                                          */
/* ------------------------------------------------------------------ */

/** Puheäänen otsakkeet asiakkaalle. Selain ei säilö POST-vastausta
 * (max-age on sille kuollut kirjain), mutta pelin oma puhesäilö
 * (js/puhe.js) ja Cloudflaren reuna pitävät — pysyvyys asuu niissä. */
function puheOtsakkeet(kors) {
  return {
    'content-type': 'audio/mpeg',
    'cache-control': 'private, max-age=3600',
    ...korsOtsakkeet(kors.origin, kors.sallitut),
  };
}

/**
 * Saman tekstin osoite reunavälimuistissa. Osoite on synteettinen —
 * mihinkään ei oikeasti yhdistetä — ja tiiviste kattaa mallin, äänen,
 * ohjeen ja tekstin: minkä tahansa muuttuessa syntyy uusi avain ja
 * vanha tallenne vanhenee itsestään pois tieltä.
 */
async function puheenAvain(malli, aani, ohje, teksti, nopeus = 1) {
  // Nopeus liitetään avaimeen vain kun se poikkeaa normaalista, jotta
  // kaikki ennen nopeusparametria säilötyt palat pysyvät osumina.
  const hanta = nopeus !== 1 ? `|${nopeus}` : '';
  const data = new TextEncoder().encode(`${malli}|${aani}|${ohje}|${teksti}${hanta}`);
  const tiiviste = await crypto.subtle.digest('SHA-256', data);
  const hex = [...new Uint8Array(tiiviste)].map((t) => t.toString(16).padStart(2, '0')).join('');
  return new Request(`https://puhe.valimuisti.matkakirja/${hex}`);
}

/*
 * SÄÄTÖOHITUKSET VAIN KEHITTÄJÄKOODILLA (työhuoneen Lukijaääni-
 * välilehti, omistajan tilaus 14.8.2026). Asiakas voi antaa äänen ja
 * ohjeen pyynnössä, mutta ne otetaan huomioon VAIN jos pyynnössä on
 * oikea kehittäjäkoodi — julkinen rajapinta pysyy pelin persoonissa,
 * eikä välitystä voi käyttää yleisenä puhesyntetisaattorina. Säädetyt
 * pyynnöt eivät myöskään koske jaettuja säilöjä (reuna + R2): kokeilut
 * eivät saa sotkea kaanonääniä eikä täyttää ämpäriä.
 */
const PUHE_AANET = ['alloy', 'ash', 'ballad', 'coral', 'echo', 'fable',
  'nova', 'onyx', 'sage', 'shimmer', 'verse'];
const PUHE_OHJEEN_KATTO = 600;

/**
 * Yksi puhepyyntö: teksti sisään, mp3-virta ulos.
 *
 * VAKIOTEKSTI GENEROIDAAN VAIN KERRAN (omistajan kysymys 14.8.2026).
 * Sama pala tarkistetaan ensin Cloudflaren reunavälimuistista, ja
 * generoitu ääni pannaan sinne talteen 60 päiväksi — pelin vakiotekstit
 * (lehtien sivut, merkinnät) maksavat siis generoinnin kerran ja
 * soivat sen jälkeen välimuistista kaikille saman reunan pelaajille.
 * Osuma ei kuluta käyttörajoja, koska se ei maksa mitään. Laitteen oma
 * pysyvä säilö on tämän lisäksi pelin puolella (js/puhe.js).
 *
 * Ohivirtaava vastaus välitetään asiakkaalle sitä mukaa kuin OpenAI
 * sitä tuottaa (tee-haara kirjoittaa saman virran talteen), joten
 * luenta alkaa kuulua ennen kuin koko pala on generoitu. Virherunkoja
 * ei lokiteta eikä välitetä — sama sääntö kuin pöllön chat-kutsuissa.
 */
async function hoidaPuhe(pyynto, env, kors, runko, ctx) {
  if (!env.OPENAI_API_KEY) {
    return vastaa({
      virhe: 'asetus',
      viesti: 'Lukijaääni ei ole vielä käytössä.',
    }, { status: 503, ...kors });
  }

  const teksti = siivoaTeksti(runko?.teksti, PUHE_TEKSTIN_KATTO);
  if (!teksti) {
    return vastaa({ virhe: 'kysely', viesti: 'Teksti puuttuu.' }, { status: 400, ...kors });
  }
  const persoonaNimi = PUHE_PERSOONAT[runko?.persoona] ? runko.persoona : 'kertoja';
  const persoona = PUHE_PERSOONAT[persoonaNimi];
  const malli = env.PUHE_MALLI || PUHE_MALLI_OLETUS;

  // Ääni ja ohje: persoonan oletukset, joiden yli kehittäjäkoodillinen
  // pyyntö saa kirjoittaa (työhuoneen säätövälilehti).
  let aani = persoona.aani;
  let ohje = persoona.ohje;
  let saadetty = false;
  if (kehittajaOhitus(pyynto, env)) {
    if (PUHE_AANET.includes(runko?.aani)) {
      aani = runko.aani;
    }
    const omaOhje = siivoaTeksti(runko?.ohje, PUHE_OHJEEN_KATTO);
    if (omaOhje) ohje = omaOhje;
    saadetty = aani !== persoona.aani || ohje !== persoona.ohje;
  }

  /*
   * Lohko kertoo, MITÄ tekstilajia pala on ('merkinnat', 'kertoja'…),
   * ja vain lohkollinen pala säilötään — pöllön vastaukset ovat
   * kertakäyttöisiä eikä niitä kannata tallettaa minnekään. Lohko on
   * myös R2-avaimen etuliite, joten vanhentuneen tekstilajin äänet voi
   * tuhota yhdellä prefiksipoistolla (omistajan ohje 14.8.2026:
   * matkakirjan äänet erilleen, jotta tila ei lopu kesken). Säädetyt
   * pyynnöt eivät säilö mitään.
   */
  const lohko = !saadetty && /^[a-z0-9-]{1,24}$/.test(String(runko?.lohko ?? ''))
    ? runko.lohko : null;

  /*
   * LUKUNOPEUS GENEROINNISSA (omistajan tilaus 15.8.2026: "Nopeus
   * säätö ei muuta nopeutta generointimoottorissa... Käytä sitä
   * natiivia ennemmin"): nopeus välitetään OpenAI:n omana
   * speed-parametrina, jolloin puhe generoidaan halutussa tahdissa
   * eikä selaimen tarvitse venyttää sitä toistossa. Askel 0,05 pitää
   * välimuistiavaimet tiheinä; 1,0 ei muuta mitään.
   */
  const nopeus = (() => {
    const n = Number(runko?.nopeus);
    if (!Number.isFinite(n)) return 1;
    return Math.min(1.6, Math.max(0.6, Math.round(n * 20) / 20));
  })();

  let avain = null;
  let r2Avain = null;
  if (lohko) {
    try {
      avain = await puheenAvain(malli, aani, ohje, teksti, nopeus);
      r2Avain = `puhe/${lohko}/${avain.url.split('/').pop()}.mp3`;
      const osuma = await caches.default.match(avain);
      if (osuma) {
        return new Response(osuma.body, { status: 200, headers: puheOtsakkeet(kors) });
      }
      /*
       * R2-ÄMPÄRI ON PYSYVÄ KERROS (omistajan kysymys 14.8.2026):
       * reunavälimuisti haihtuu ja on alueellinen, mutta ämpäriin
       * generoitu pala jää — vakioteksti maksaa generoinnin KERRAN
       * koko maailmalle. Osuma nostetaan samalla takaisin reunalle.
       */
      if (env.PUHE_R2) {
        const talle = await env.PUHE_R2.get(r2Avain);
        if (talle) {
          const data = await talle.arrayBuffer();
          ctx?.waitUntil?.(caches.default.put(avain, new Response(data, {
            headers: {
              'content-type': 'audio/mpeg',
              'cache-control': 'public, max-age=5184000',
            },
          })).catch(() => {}));
          return new Response(data, { status: 200, headers: puheOtsakkeet(kors) });
        }
      }
    } catch {
      // Säilöt ovat optimointi: ilman niitä generoidaan normaalisti.
      avain = null;
      r2Avain = null;
    }
  }

  // Rajat lasketaan merkkeinä (ks. rajat.js). Kehittäjäkoodi ohittaa
  // rajat mutta laskurit kasvavat silti — sama käytäntö kuin chatissa.
  const kv = env.POLLO_KV ?? null;
  const nyt = new Date();
  const pAvain = puhePaivaAvain(pyynto.headers.get('cf-connecting-ip'), nyt);
  const kAvain = puheKuukausiAvain(nyt);
  const kehittaja = kehittajaOhitus(pyynto, env);
  const raja = kehittaja ? { ok: true } : tarkistaPuheRajat({
    paiva: await lueLaskuri(kv, pAvain),
    kuukausi: await lueLaskuri(kv, kAvain),
    paivaraja: lueLuku(env.PUHE_PAIVARAJA, PUHE_PAIVARAJA_OLETUS),
    kuukausiraja: lueLuku(env.PUHE_KUUKAUSIRAJA, PUHE_KUUKAUSIRAJA_OLETUS),
  });
  if (!raja.ok) {
    return vastaa({ virhe: raja.syy, viesti: raja.viesti }, { status: 429, ...kors });
  }
  await kasvataLaskuri(kv, pAvain, 60 * 60 * 30, teksti.length);
  await kasvataLaskuri(kv, kAvain, 60 * 60 * 24 * 40, teksti.length);

  try {
    const ylavirta = await fetch(PUHE_RAJAPINTA, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: malli,
        input: teksti,
        voice: aani,
        instructions: ohje,
        response_format: 'mp3',
        ...(nopeus !== 1 ? { speed: nopeus } : {}),
      }),
    });
    if (!ylavirta.ok || !ylavirta.body) {
      const virhe = new Error(`puherajapinta ${ylavirta.status}`);
      virhe.status = ylavirta.status;
      throw virhe;
    }
    /*
     * Sama virta kahtia: toinen haara asiakkaalle heti, toinen talteen
     * taustalla (waitUntil pitää workerin hengissä kunnes tallennus
     * valmistuu). Talteenpano puskuroi haaransa muistiin — R2 vaatii
     * tunnetun pituuden — mutta se ei viivytä asiakasta, joka lukee
     * omaa haaraansa suoraan OpenAI:n tahdissa.
     */
    if (avain && ctx?.waitUntil) {
      const [asiakkaalle, talteen] = ylavirta.body.tee();
      ctx.waitUntil((async () => {
        const data = await new Response(talteen).arrayBuffer();
        await Promise.all([
          caches.default.put(avain, new Response(data, {
            headers: {
              'content-type': 'audio/mpeg',
              'cache-control': 'public, max-age=5184000',
            },
          })).catch(() => {}),
          r2Avain && env.PUHE_R2
            ? env.PUHE_R2.put(r2Avain, data, {
              httpMetadata: { contentType: 'audio/mpeg' },
            }).catch(() => {})
            : null,
        ]);
      })().catch(() => { /* täysi tai estetty säilö ei kaada luentaa */ }));
      return new Response(asiakkaalle, { status: 200, headers: puheOtsakkeet(kors) });
    }
    return new Response(ylavirta.body, { status: 200, headers: puheOtsakkeet(kors) });
  } catch (virhe) {
    // Vain tilakoodi lokiin — ei avainta eikä luettavaa tekstiä.
    console.log(`puhe: kutsu epäonnistui (${virhe?.status ?? 'verkko'})`);
    return vastaa({
      virhe: 'palvelin',
      viesti: 'Lukijaääni ei saanut sanoista kiinni. Yritä hetken päästä uudelleen.',
    }, { status: 502, ...kors });
  }
}

/** Yksi kutsu Anthropicin rajapintaan. `striimi` avaa SSE-vastauksen. */
async function kutsuRajapintaa(env, { jarjestelma, viestit, maxTokens, striimi = false }) {
  return fetch(RAJAPINTA, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': RAJAPINNAN_VERSIO,
    },
    body: JSON.stringify({
      model: env.POLLO_MALLI || MALLI_OLETUS,
      max_tokens: maxTokens,
      system: jarjestelma,
      messages: viestit,
      ...(striimi ? { stream: true } : {}),
    }),
  });
}

/** Yksi kutsu Anthropicin rajapintaan. Palauttaa pelkän tekstin. */
async function kysyMallilta(env, { jarjestelma, viestit, maxTokens }) {
  const vastaus = await kutsuRajapintaa(env, { jarjestelma, viestit, maxTokens });
  if (!vastaus.ok) {
    /*
     * Virhevastauksen runkoa EI lokiteta eikä välitetä pelaajalle:
     * se voi sisältää pyynnön kaiun, ja lokiin ei kirjoiteta mitään
     * mikä voisi vuotaa avaimen tai pelaajan tekstin. Pelkkä
     * tilakoodi riittää vianetsintään.
     */
    const virhe = new Error(`rajapinta ${vastaus.status}`);
    virhe.status = vastaus.status;
    throw virhe;
  }
  const data = await vastaus.json();
  /*
   * Malli voi kieltäytyä (stop_reason "refusal"); silloin content on
   * tyhjä. Käsitellään se tavallisena tyhjänä vastauksena — pöllö
   * sanoo, ettei osaa auttaa tässä.
   */
  return (data?.content ?? [])
    .filter((lohko) => lohko?.type === 'text')
    .map((lohko) => lohko.text)
    .join('\n')
    .trim();
}

/* ------------------------------------------------------------------ */
/* Suoratoisto                                                         */
/* ------------------------------------------------------------------ */

/*
 * SUORATOISTO (omistajan tilaus 13.8.2026).
 *
 * Pöllön vastaus kirjoittuu ruudulle sitä mukaa kuin se syntyy, jotta
 * odotus ei ole tyhjä ruutu. Ketju on kaksiosainen:
 *
 *   1. Worker pyytää mallilta stream: true ja lukee Anthropicin oman
 *      SSE-virran. Jokainen tekstinpala kulkee JATKOSUODATTIMEN läpi
 *      (rajat.js luoJatkoSuodatin), joka pidättää rivin verran tekstiä
 *      eikä päästä jatkokysymysten merkintää koskaan läpi.
 *   2. Asiakkaalle lähetetään oma, yksinkertaisempi SSE:
 *        event: pala   {"teksti": "..."}   — näytettävä lisä
 *        event: loppu  {"vastaus": "...", "jatkot": [...]}
 *        event: virhe  {"viesti": "..."}
 *      Lopputapahtuman vastaus on koko teksti jäsennettynä
 *      poimiJatkoilla, joten asiakas voi rakentaa lopullisen sisällön
 *      siitä eikä paloista — silloin myös rikkoutunut palaraja korjautuu.
 *
 * Rajat toimivat kuten ennen: laskuri kasvaa PYYNNÖSTÄ eikä tokeneista,
 * ja se on kasvatettu jo ennen tätä kutsua.
 */
const SSE_OTSAKKEET = {
  'content-type': 'text/event-stream; charset=utf-8',
  'cache-control': 'no-store',
  connection: 'keep-alive',
  // Välityspalvelimet eivät saa puskuroida virtaa omaan tahtiinsa.
  'x-accel-buffering': 'no',
};

/** Yksi Anthropicin SSE-rivi tekstinpalaksi. Tuntemattomat ohitetaan. */
function striimiPala(rivi) {
  if (!rivi.startsWith('data:')) return null;
  const runko = rivi.slice(5).trim();
  if (!runko || runko === '[DONE]') return null;
  try {
    const tieto = JSON.parse(runko);
    if (tieto?.type === 'content_block_delta' && tieto?.delta?.type === 'text_delta') {
      return tieto.delta.text ?? '';
    }
  } catch {
    /* rikkinäinen rivi ohitetaan: virta jatkuu seuraavasta */
  }
  return null;
}

/**
 * Avaa suoratoistovastauksen asiakkaalle.
 *
 * Mallin kutsu tehdään ENNEN virran avaamista: jos rajapinta vastaa
 * virheellä, pelaajalle voidaan yhä lähettää tavallinen JSON-virhe eikä
 * puolityhjä striimi.
 */
async function striimaaVastaus(env, kors, { jarjestelma, viestit, maxTokens }) {
  const ylavirta = await kutsuRajapintaa(env, {
    jarjestelma, viestit, maxTokens, striimi: true,
  });
  if (!ylavirta.ok || !ylavirta.body) {
    const virhe = new Error(`rajapinta ${ylavirta.status}`);
    virhe.status = ylavirta.status;
    throw virhe;
  }

  const koodaaja = new TextEncoder();
  const { readable, writable } = new TransformStream();
  const kirjoitin = writable.getWriter();
  const laheta = (laji, data) => kirjoitin.write(
    koodaaja.encode(`event: ${laji}\ndata: ${JSON.stringify(data)}\n\n`),
  );

  (async () => {
    const lukija = ylavirta.body.getReader();
    const purkaja = new TextDecoder();
    const suodatin = luoJatkoSuodatin();
    let raaka = '';
    let jono = '';
    try {
      for (;;) {
        const { value, done } = await lukija.read();
        if (done) break;
        jono += purkaja.decode(value, { stream: true });
        let i = jono.indexOf('\n');
        while (i >= 0) {
          const rivi = jono.slice(0, i).trim();
          jono = jono.slice(i + 1);
          const pala = striimiPala(rivi);
          if (pala) {
            raaka += pala;
            const nakyva = suodatin.lisaa(pala);
            if (nakyva) await laheta('pala', { teksti: nakyva });
          }
          i = jono.indexOf('\n');
        }
      }
      // Viimeinen pidätetty rivi mukaan, sitten koko vastaus kerralla.
      const { hanta } = suodatin.loppu();
      if (hanta) await laheta('pala', { teksti: hanta });
      const { vastaus, jatkot } = poimiJatkot(raaka);
      await laheta('loppu', {
        vastaus: vastaus || 'En osaa vastata tähän. Kysytkö jotain muuta?',
        jatkot,
      });
    } catch {
      // Katkennut virta: asiakas näyttää siihen asti tulleen tekstin ja
      // hienovaraisen virherivin. Mitään pyynnön sisältöä ei lokiteta.
      console.log('pollo: striimi katkesi');
      await laheta('virhe', {
        viesti: 'Livian viesti katkesi kesken lauseen.',
      }).catch(() => { /* virta oli jo kiinni */ });
    } finally {
      await kirjoitin.close().catch(() => { /* suljettu jo */ });
    }
  })();

  return new Response(readable, {
    status: 200,
    headers: { ...SSE_OTSAKKEET, ...korsOtsakkeet(kors.origin, kors.sallitut) },
  });
}

/*
 * KUVAGENEROINTI VAIN KEHITTÄJÄLLE (omistajan päätös 22.8.2026:
 * OpenAI-avain pysyy yhdessä paikassa eli tässä workerissa, eikä sitä
 * kopioida kehityskonttiin). Pelitaiteen eräajot — aikakausjulisteet
 * ynnä muut — kutsuvat tätä kehittäjäkoodilla; pelaajille haaraa ei
 * ole (403 ilman koodia, eikä pelin koodi kutsu sitä koskaan).
 * Kutsuja: tools/pollo/generoi-kuva.mjs.
 */
const KUVA_KOOT = { pysty: '1024x1536', vaaka: '1536x1024', nelio: '1024x1024' };
const KUVA_MALLI_OLETUS = 'gpt-image-2';

/*
 * VIITEKUVAT (omistajan tilaus 23.8.2026).
 *
 * Ongelma, joka tällä ratkaistaan: hero-kashgar-keskipaiva.png esitti
 * Samarkandin tyylistä timuridimausoleumia, vaikka kuvateksti lupasi
 * Yusuf Balasagunin mausoleumia Kašgarissa. Malli ei tuntenut kohdetta
 * ja täytti aukon alueen arkkityypillä. Ratkaisu ei ole luopua
 * generoinnista vaan ankkuroida se oikeisiin valokuviin: kun rungossa
 * on `viitteet`, kutsu menee /v1/images/generations -sijasta
 * /v1/images/edits -päätepisteeseen, jolle viitekuvat annetaan
 * multipart/form-data -muodossa toistuvana `image[]`-kenttänä ja
 * prompti sellaisenaan.
 *
 * RAJAPINTA tarkistettu OpenAI:n omasta dokumentaatiosta 23.8.2026
 * (developers.openai.com, "Create image edit"):
 *   - kenttä on `image[]`, toistettuna kerran per kuva
 *   - GPT-kuvamalleille enintään 16 kuvaa yhdessä pyynnössä
 *   - enintään 50 MB per kuva, muodot PNG, JPEG ja WebP
 *   - `input_fidelity` on vain gpt-image-1/1.5:lle, joten sitä ei
 *     lähetetä gpt-image-2:lle lainkaan
 * Tämä worker ottaa vastaan enintään neljä viitettä.
 *
 * MIKSI USEITA VIITTEITÄ EIKÄ YHTÄ (päätoimittajan linjaus
 * 23.8.2026 — ÄLÄ "optimoi" tätä yhteen kuvaan):
 *   - LAATU: monesta eri kuvakulmasta malli oppii rakennuksen
 *     GEOMETRIAN. Yhdestä kuvasta se oppii vain sen yhden ruudun ja
 *     alkaa toistaa sitä.
 *   - OIKEUDET: rakennuksen muoto ei ole valokuvaajan omaisuutta,
 *     mutta yksittäinen valokuva on. Useasta eri kuvaajan kuvasta
 *     koottu geometria on kohteen kuvaus, ei yhden teoksen jäljennös.
 * Ajuri hakee siksi 2–4 eri kuvaajan ja eri kuvakulman valokuvaa
 * samasta kohteesta (tools/hae-viitekuvat.mjs).
 */
const VIITTEITA_ENINTAAN = 4;
/*
 * Yhden viitteen kokokatto tavuina. OpenAI:n oma raja on 50 MB, mutta
 * viite on tarkoitettu pikkukuvaksi (~1024 px): kaikki tätä suurempi
 * hylätään hiljaisesti, koska iso viite ei paranna tulosta vaan vain
 * paisuttaa pyynnön. Ajuri lähettää valmiiksi pienennettyjä kuvia
 * (tools/hae-viitekuvat.mjs).
 */
const VIITTEEN_KOKOKATTO = 8 * 1024 * 1024;

/** Tunnistaa kuvamuodon tavujen alusta; oletus on PNG. */
function viitteenMuoto(tavut) {
  if (tavut[0] === 0xff && tavut[1] === 0xd8) return { mime: 'image/jpeg', pate: 'jpg' };
  if (tavut[0] === 0x52 && tavut[1] === 0x49 && tavut[8] === 0x57) {
    return { mime: 'image/webp', pate: 'webp' };
  }
  return { mime: 'image/png', pate: 'png' };
}

/**
 * Rungon `viitteet` → Blob-lista. Kelpaamattomat ohitetaan hiljaa:
 * yksi rikkinäinen viite ei saa kaataa koko generointia, ja ajuri
 * päättää joka tapauksessa itse, riittääkö viitteitä (generointiportti).
 */
function puraViitteet(viitteet) {
  if (!Array.isArray(viitteet)) return [];
  const ulos = [];
  for (const alkio of viitteet.slice(0, VIITTEITA_ENINTAAN)) {
    // Sekä paljas base64 että data-URL kelpaavat syötteeksi.
    const raaka = String(alkio ?? '').replace(/^data:[^,]*,/, '').replace(/\s+/g, '');
    if (!raaka || raaka.length > VIITTEEN_KOKOKATTO * 1.4) continue;
    let tavut;
    try {
      const merkit = atob(raaka);
      tavut = new Uint8Array(merkit.length);
      for (let i = 0; i < merkit.length; i += 1) tavut[i] = merkit.charCodeAt(i);
    } catch { continue; }
    if (!tavut.length || tavut.length > VIITTEEN_KOKOKATTO) continue;
    const { mime, pate } = viitteenMuoto(tavut);
    ulos.push({ blob: new Blob([tavut], { type: mime }), nimi: `viite${ulos.length + 1}.${pate}` });
  }
  return ulos;
}

async function hoidaKuva(pyynto, env, kors, runko) {
  if (!kehittajaOhitus(pyynto, env)) {
    return vastaa({ virhe: 'koodi', viesti: 'Vain kehittäjälle.' }, { status: 403, ...kors });
  }
  if (!env.OPENAI_API_KEY) {
    return vastaa({
      virhe: 'asetus',
      viesti: 'Kuvagenerointi ei ole käytössä.',
    }, { status: 503, ...kors });
  }
  const prompti = siivoaTeksti(runko?.prompti, KUVA_PROMPTIN_KATTO);
  if (!prompti) {
    return vastaa({ virhe: 'kysely', viesti: 'Prompti puuttuu.' }, { status: 400, ...kors });
  }
  // Yksi yhteinen päivälaskuri: haara on kehittäjän, joten IP-kohtaista
  // erottelua ei tarvita — turvaraja koskee kokonaiskäyttöä.
  const kv = env.POLLO_KV ?? null;
  const raja = Number(env.KUVA_PAIVARAJA || KUVA_PAIVARAJA_OLETUS);
  const laskuriAvain = `kuva:${paivaAvain('kehittaja')}`;
  if (kv) {
    const kaytetty = await lueLaskuri(kv, laskuriAvain);
    if (kaytetty >= raja) {
      return vastaa({
        virhe: 'raja',
        viesti: `Päivän kuvaraja (${raja}) on täynnä.`,
      }, { status: 429, ...kors });
    }
  }
  const koko = KUVA_KOOT[runko?.koko] ?? KUVA_KOOT.pysty;
  const laatu = ['low', 'medium', 'high'].includes(runko?.laatu) ? runko.laatu : 'high';
  const malli = env.KUVA_MALLI || KUVA_MALLI_OLETUS;
  const viitteet = puraViitteet(runko?.viitteet);

  /*
   * Kaksi polkua, sama laskuri ja sama virheenvaimennus:
   *   - viitteitä on  → /v1/images/edits, multipart, toistuva `image[]`
   *   - viitteitä ei  → /v1/images/generations, JSON (ennallaan)
   */
  let vastausOAI;
  if (viitteet.length) {
    const lomake = new FormData();
    lomake.append('model', malli);
    lomake.append('prompt', prompti);
    lomake.append('size', koko);
    lomake.append('quality', laatu);
    for (const v of viitteet) lomake.append('image[]', v.blob, v.nimi);
    vastausOAI = await fetch('https://api.openai.com/v1/images/edits', {
      method: 'POST',
      // content-type jätetään asettamatta: fetch kirjoittaa
      // multipart-rajamerkin itse, ja käsin asetettu otsake rikkoisi sen.
      headers: { authorization: `Bearer ${env.OPENAI_API_KEY}` },
      body: lomake,
    });
  } else {
    vastausOAI = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: malli,
        prompt: prompti,
        size: koko,
        quality: laatu,
      }),
    });
  }
  if (!vastausOAI.ok) {
    // Virherunkoja ei lokiteta eikä välitetä — sama sääntö kuin
    // puheessa ja pöllön chat-kutsuissa.
    return vastaa({
      virhe: 'openai',
      viesti: `Generointi epäonnistui (HTTP ${vastausOAI.status}).`,
    }, { status: 502, ...kors });
  }
  const data = await vastausOAI.json();
  const b64 = data?.data?.[0]?.b64_json ?? null;
  if (!b64) {
    return vastaa({ virhe: 'openai', viesti: 'Vastauksessa ei ollut kuvaa.' }, { status: 502, ...kors });
  }
  if (kv) await kasvataLaskuri(kv, laskuriAvain, 2 * 24 * 3600);
  return vastaa({
    kuva: b64,
    muoto: 'png',
    koko,
    malli,
    // Ajuri kirjaa lokiinsa, kuinka monella viitteellä kuva syntyi.
    viitteita: viitteet.length,
  }, kors);
}

/* ------------------------------------------------------------------ */
/* Työhuoneen tilannepalkit                                            */
/* ------------------------------------------------------------------ */

/*
 * Työhuoneen täyttöpalkit (omistajan tilaus 15.8.2026: R2:n käyttö,
 * ElevenLabsin kuukausikiintiö ja API-kulut "jos pystyt näkemään").
 * Worker on ainoa paikka, josta nämä voi hakea: jokainen luku vaatii
 * salaisuuden, eikä salaisuuksia panna koskaan selaimeen eikä repoon.
 *
 * Kaikki lähteet ovat valinnaisia: puuttuva sidos tai avain tuottaa
 * kentäksi null, ja peli näyttää sen kohdalla "ei nähtävissä". Kulut
 * vaativat ERILLISET admin-avaimet (OPENAI_ADMIN_KEY,
 * ANTHROPIC_ADMIN_KEY) — pöllön ja lukijaäänen tavalliset avaimet
 * eivät pääse kulurajapintoihin, eikä admin-avain osaa vastata
 * pelaajille, joten sama avain ei voi hoitaa molempia töitä.
 *
 * Vastaus säilötään KV:hen tunniksi: R2-listaus ja kolme ulkoista
 * rajapintaa ovat aivan liian raskaita ajettavaksi joka valikon
 * avauksella, ja tunnin vanha lukema on täyttöpalkille yhtä hyvä
 * kuin tuore.
 */
const TILA_VALIMUISTI_S = 3600;
// Vajaa tilannekuva (jokin lähde kaatui) vanhenee nopeasti, ettei
// ohimenevä häiriö jää tunniksi näkyviin.
const TILA_VALIMUISTI_VAJAA_S = 300;
// v2: avain vaihdettu 15.8.2026, jotta vanha tyhjä tilannekuva
// mitätöityy heti julkaisussa.
const TILA_KV_AVAIN = 'tila:v2';

/** R2-ämpärin koko tavuina: listataan koko sisältö ja summataan. */
async function haeR2Kaytto(env) {
  if (!env.PUHE_R2) return null;
  let tavut = 0;
  let kohteita = 0;
  let cursor;
  do {
    const sivu = await env.PUHE_R2.list({ cursor, limit: 1000 });
    for (const kohde of sivu.objects) {
      tavut += kohde.size;
      kohteita += 1;
    }
    cursor = sivu.truncated ? sivu.cursor : undefined;
  } while (cursor);
  return { tavut, kohteita };
}

/** ElevenLabsin kuukausikiintiö: käytetyt ja sallitut merkit. */
async function haeElevenTila(env) {
  const avain = env.ELEVEN_API_KEY ?? env.ELEVENLABS_API_KEY;
  if (!avain) return null;
  const vastaus = await fetch('https://api.elevenlabs.io/v1/user/subscription', {
    headers: { 'xi-api-key': avain },
  });
  if (!vastaus.ok) throw new Error(`HTTP ${vastaus.status}`);
  const data = await vastaus.json();
  if (typeof data?.character_count !== 'number') throw new Error('outo vastaus');
  return {
    kaytetty: data.character_count,
    raja: data.character_limit ?? null,
    nollaus: data.next_character_count_reset_unix ?? null,
  };
}

/**
 * Googlen kuluvan kuukauden kulut dollareina.
 *
 * TÄMÄ ON HANKALAMPI KUIN MUUT LÄHTEET, ja syy kannattaa tietää ennen
 * kuin joku "korjaa" tämän yksinkertaisemmaksi: Google Cloudilla EI OLE
 * rajapintaa, joka kertoisi kuluvan kuukauden toteutuneen kulutuksen.
 * Cloud Billing -rajapinta kertoo tilin ja hinnaston, budjettirajapinta
 * kertoo budjetit — ei kumpikaan sitä, paljonko on käytetty. Ainoa
 * virallinen tie toteutuneisiin lukuihin on laskutuksen vienti
 * BigQueryyn ja kysely sieltä.
 *
 * Siksi tämä lukee BigQueryn laskutustaulua. Tarvittavat asetukset:
 *   GOOGLE_BILLING_TOKEN   palvelutilin OAuth-token (bigquery.readonly)
 *   GOOGLE_BILLING_PROJECT projektin tunnus
 *   GOOGLE_BILLING_TAULU   viedyn laskutustaulun täysi nimi
 * Ilman niitä palautetaan null, jolloin palkki jää haaleaksi
 * "ei tietoa" -palkiksi — sama sopimus kuin ElevenLabsilla.
 *
 * Jos laskutusvientiä ei haluta pystyttää, tämä jää tyhjäksi eikä se
 * ole vika: peli ei valehtele lukua, jota se ei voi tietää.
 */
async function haeGoogleKulut(env, kkAlku) {
  const token = env.GOOGLE_BILLING_TOKEN;
  const projekti = env.GOOGLE_BILLING_PROJECT;
  const taulu = env.GOOGLE_BILLING_TAULU;
  if (!token || !projekti || !taulu) return null;
  const alku = kkAlku.toISOString().slice(0, 10);
  // Taulun nimi tulee asetuksesta eikä käyttäjältä, mutta rajataan silti
  // muotoon jonka BigQuery hyväksyy — asetusvirhe ei saa muuttua
  // kyselyksi, joka tekee jotain muuta.
  if (!/^[\w.-]+$/.test(taulu)) throw new Error('taulun nimi kelpaamaton');
  const kysely = 'SELECT SUM(cost) AS usd FROM `' + taulu + '`'
    + ' WHERE DATE(usage_start_time) >= @alku';
  const vastaus = await fetch(
    `https://bigquery.googleapis.com/bigquery/v2/projects/${encodeURIComponent(projekti)}/queries`,
    {
      method: 'POST',
      headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        query: kysely,
        useLegacySql: false,
        timeoutMs: 8000,
        parameterMode: 'NAMED',
        queryParameters: [{
          name: 'alku',
          parameterType: { type: 'DATE' },
          parameterValue: { value: alku },
        }],
      }),
    },
  );
  if (!vastaus.ok) throw new Error(`HTTP ${vastaus.status}`);
  const data = await vastaus.json();
  const arvo = data?.rows?.[0]?.f?.[0]?.v;
  return arvo === null || arvo === undefined ? 0 : Number(arvo);
}

/** OpenAI:n kuluvan kuukauden kulut dollareina (admin-avaimella). */
async function haeOpenaiKulut(env, kkAlku) {
  if (!env.OPENAI_ADMIN_KEY) return null;
  const alku = Math.floor(kkAlku.getTime() / 1000);
  const vastaus = await fetch(
    `https://api.openai.com/v1/organization/costs?start_time=${alku}&bucket_width=1d&limit=31`,
    { headers: { authorization: `Bearer ${env.OPENAI_ADMIN_KEY}` } },
  );
  if (!vastaus.ok) throw new Error(`HTTP ${vastaus.status}`);
  const data = await vastaus.json();
  let usd = 0;
  for (const sanko of data?.data ?? []) {
    for (const rivi of sanko?.results ?? []) {
      usd += Number(rivi?.amount?.value ?? 0);
    }
  }
  return usd;
}

/**
 * Anthropicin kuluvan kuukauden kulut dollareina (admin-avaimella).
 *
 * VAIN PÖLLÖN TYÖTILA, JOS SELLAINEN ON (omistajan kysymys 15.8.2026:
 * "saisiko clauden kuluihin pelkät api kutsut pöllölle?"). Kulu-
 * rajapinta erittelee työtiloittain, ei avaimittain: jos
 * organisaatiossa on työtila nimeltä "Pöllö" (tai POLLO_TYOTILA-
 * muuttujan nimeämä), summataan vain sen kulut ja vastaus merkitään
 * rajatuksi. Ilman työtilaa summa on koko organisaation, kuten ennen —
 * pöllön avaimen pitää silloin asua siinä työtilassa, jotta rajaus
 * tarkoittaa jotain.
 */
async function haeClaudeKulut(env, kkAlku) {
  const avain = env.ANTHROPIC_ADMIN_KEY ?? env.ANTHROPIC_ADMIN_API_KEY;
  if (!avain) return null;
  const otsakkeet = { 'x-api-key': avain, 'anthropic-version': '2023-06-01' };
  const haluttu = (env.POLLO_TYOTILA ?? 'Pöllö').toLowerCase();
  let tyotila = null;
  try {
    const vastaus = await fetch('https://api.anthropic.com/v1/organizations/workspaces?limit=100', { headers: otsakkeet });
    if (vastaus.ok) {
      const lista = (await vastaus.json())?.data ?? [];
      tyotila = lista.find((t) => String(t?.name ?? '').toLowerCase() === haluttu)?.id ?? null;
    }
  } catch { /* työtilalistaus kaatui — koko organisaation summa */ }
  const osoite = `https://api.anthropic.com/v1/organizations/cost_report?starting_at=${kkAlku.toISOString()}&limit=31`
    + (tyotila ? '&group_by[]=workspace_id' : '');
  const vastaus = await fetch(osoite, { headers: otsakkeet });
  if (!vastaus.ok) throw new Error(`HTTP ${vastaus.status}`);
  const data = await vastaus.json();
  let usd = 0;
  for (const sanko of data?.data ?? []) {
    for (const rivi of sanko?.results ?? []) {
      if (tyotila && rivi?.workspace_id !== tyotila) continue;
      usd += Number(rivi?.amount ?? 0);
    }
  }
  return { usd, rajattu: Boolean(tyotila) };
}

async function hoidaTila(env, kors) {
  const kv = env.POLLO_KV ?? null;
  if (kv) {
    const talletettu = await kv.get(TILA_KV_AVAIN);
    if (talletettu) return vastaa(JSON.parse(talletettu), kors);
  }
  const nyt = new Date();
  const kkAlku = new Date(Date.UTC(nyt.getUTCFullYear(), nyt.getUTCMonth(), 1));
  /*
   * Yksittäisen lähteen kaatuminen ei kaada tilannekuvaa — mutta syy
   * EI saa kadota (omistajan havainto 15.8.2026: paneeli syytti
   * admin-avaimia, vaikka avaimet olivat workerilla ja vika muualla).
   * Kaatunut lähde jättää virheensä viat-kenttään (esim. "HTTP 401"),
   * peli näyttää sen kulurivillä, ja vajaa tilannekuva säilötään
   * vain hetkeksi.
   */
  const koeta = async (tyo) => {
    try { return { arvo: await tyo }; } catch (v) {
      return { virhe: String(v?.message ?? v).slice(0, 60) };
    }
  };
  const [r2, eleven, openaiKulut, claudeKulut, googleKulut, polloKuukausi] = await Promise.all([
    koeta(haeR2Kaytto(env)),
    koeta(haeElevenTila(env)),
    koeta(haeOpenaiKulut(env, kkAlku)),
    koeta(haeClaudeKulut(env, kkAlku)),
    koeta(haeGoogleKulut(env, kkAlku)),
    koeta(lueLaskuri(kv, kuukausiAvain(nyt))),
  ]);
  const viat = {};
  for (const [nimi, tulos] of [
    ['r2', r2], ['eleven', eleven], ['openai', openaiKulut], ['claude', claudeKulut],
    ['google', googleKulut],
  ]) {
    if (tulos.virhe) viat[nimi] = tulos.virhe;
  }
  const openai = openaiKulut.arvo ?? null;
  const claude = claudeKulut.arvo ?? null;
  const google = googleKulut.arvo ?? null;
  const tila = {
    r2: r2.arvo ?? null,
    eleven: eleven.arvo ?? null,
    pollo: {
      kuukausi: polloKuukausi.arvo ?? null,
      raja: lueLuku(env.POLLO_KUUKAUSIRAJA, KUUKAUSIRAJA_OLETUS),
    },
    kulut: {
      openai,
      claude: claude?.usd ?? null,
      // Onko Claude-summa rajattu pöllön työtilaan vai koko
      // organisaation (peli kertoo eron kulurivillä).
      claudeRajattu: claude?.rajattu ?? false,
      google,
      yhteensa: openai === null && claude === null && google === null
        ? null
        : (openai ?? 0) + (claude?.usd ?? 0) + (google ?? 0),
    },
    viat: Object.keys(viat).length ? viat : null,
    aika: nyt.toISOString(),
  };
  const ttl = Object.keys(viat).length ? TILA_VALIMUISTI_VAJAA_S : TILA_VALIMUISTI_S;
  if (kv) await kv.put(TILA_KV_AVAIN, JSON.stringify(tila), { expirationTtl: ttl });
  return vastaa(tila, kors);
}

export default {
  async fetch(pyynto, env, ctx) {
    const sallitut = lueLista(env.POLLO_ORIGINIT);
    const origin = pyynto.headers.get('origin');
    const kors = { origin, sallitut };

    if (pyynto.method === 'OPTIONS') {
      if (!sallittuOrigin(origin, sallitut)) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: korsOtsakkeet(origin, sallitut) });
    }
    if (pyynto.method !== 'POST') {
      return vastaa({ virhe: 'menetelma', viesti: 'Vain POST.' }, { status: 405, ...kors });
    }
    if (!sallittuOrigin(origin, sallitut)) {
      // Ilman kaiutettua originia selain ei näytä runkoa — se on ok,
      // tämä on väärinkäytön esto eikä pelaajalle näkyvä tila.
      return new Response('Origin ei ole sallittu', { status: 403 });
    }
    let runko;
    try {
      runko = await pyynto.json();
    } catch {
      return vastaa({ virhe: 'kysely', viesti: 'Pyyntö ei ollut JSONia.' }, { status: 400, ...kors });
    }

    /*
     * Lukijaääni kulkee samasta ovesta (sama origin-tarkistus, sama
     * kehittäjäkoodi, sama KV), mutta eri rajapintaan ja eri avaimella —
     * siksi se haarautuu ennen pöllön ANTHROPIC-avaintarkistusta:
     * lukijaääni voi olla käytössä, vaikka pöllö nukkuisi, ja toisinpäin.
     */
    if (runko?.tehtava === 'puhe') {
      return hoidaPuhe(pyynto, env, kors, runko, ctx);
    }

    // Kuvagenerointi: kehittäjän eräajot (ks. hoidaKuva yllä).
    if (runko?.tehtava === 'kuva') {
      return hoidaKuva(pyynto, env, kors, runko);
    }

    /*
     * Työhuoneen tilannekuva vain kehittäjäkoodilla: kulut ja kiintiöt
     * ovat omistajan tilitietoja, eivät pelisisältöä. Jos koodia ei ole
     * asetettu workeriin, haara on kokonaan kiinni — puolivalmis
     * asetus on kiinni, ei auki (sama periaate kuin POLLO_ORIGINIT).
     */
    if (runko?.tehtava === 'tila') {
      if (!kehittajaOhitus(pyynto, env)) {
        return vastaa({ virhe: 'koodi', viesti: 'Vain kehittäjälle.' }, { status: 403, ...kors });
      }
      return hoidaTila(env, kors);
    }

    if (!env.ANTHROPIC_API_KEY) {
      return vastaa({
        virhe: 'asetus',
        viesti: 'Livia ei ole vielä hereillä.',
      }, { status: 503, ...kors });
    }

    const tehtava = runko?.tehtava === 'ehdotukset' ? 'ehdotukset' : 'vastaus';
    const konteksti = siivoaTeksti(runko?.konteksti, KONTEKSTIN_KATTO);
    const kysymys = siivoaTeksti(runko?.kysymys, KYSYMYKSEN_KATTO);
    const historia = siivoaHistoria(runko?.historia, HISTORIAN_KATTO);
    if (tehtava === 'vastaus' && !kysymys) {
      return vastaa({ virhe: 'kysely', viesti: 'Kysymys puuttuu.' }, { status: 400, ...kors });
    }

    // --- käyttörajat -------------------------------------------------
    const kv = env.POLLO_KV ?? null;
    const nyt = new Date();
    const pAvain = paivaAvain(pyynto.headers.get('cf-connecting-ip'), nyt);
    const kAvain = kuukausiAvain(nyt);
    const kehittaja = kehittajaOhitus(pyynto, env);
    const raja = kehittaja ? { ok: true } : tarkistaRajat({
      paiva: await lueLaskuri(kv, pAvain),
      kuukausi: await lueLaskuri(kv, kAvain),
      paivaraja: lueLuku(env.POLLO_PAIVARAJA, PAIVARAJA_OLETUS),
      kuukausiraja: lueLuku(env.POLLO_KUUKAUSIRAJA, KUUKAUSIRAJA_OLETUS),
    });
    if (!raja.ok) {
      return vastaa({ virhe: raja.syy, viesti: raja.viesti }, { status: 429, ...kors });
    }
    // Laskurit kasvavat ennen kutsua: keskeytynytkin kutsu on maksanut.
    await kasvataLaskuri(kv, pAvain, 60 * 60 * 30);
    await kasvataLaskuri(kv, kAvain, 60 * 60 * 24 * 40);

    // --- kutsu -------------------------------------------------------
    try {
      if (tehtava === 'ehdotukset') {
        const teksti = await kysyMallilta(env, {
          jarjestelma: `${JARJESTELMAKEHOTE}\n\n${EHDOTUSKEHOTE}`,
          viestit: [{
            role: 'user',
            content: `Pelaajan tilanne juuri nyt:\n\n${konteksti || '(ei tietoa näkymästä)'}`,
          }],
          maxTokens: 200,
        });
        return vastaa({ ehdotukset: poimiEhdotukset(teksti, 3) }, kors);
      }

      const viestit = [];
      if (konteksti) {
        viestit.push({
          role: 'user',
          content: `Pelaajan tilanne juuri nyt:\n\n${konteksti}`,
        });
        viestit.push({
          role: 'assistant',
          content: 'Selvä, pidän tilanteen mielessä.',
        });
      }
      for (const viesti of historia) {
        viestit.push({
          role: viesti.rooli === 'pollo' ? 'assistant' : 'user',
          content: viesti.teksti,
        });
      }
      viestit.push({ role: 'user', content: kysymys });

      const kehote = `${JARJESTELMAKEHOTE}\n\n${KASITEKEHOTE}\n\n${JATKOKEHOTE}`;
      /*
       * Suoratoisto vain pyydettäessä. Vanha kertavastaus jää polulle
       * varalle: jos asiakas ei osaa lukea SSE:tä tai virta ei aukea,
       * peli pyytää saman vastauksen tavallisena JSONina.
       */
      if (runko?.striimi) {
        return await striimaaVastaus(env, kors, {
          jarjestelma: kehote,
          viestit,
          maxTokens: MAX_TOKENS,
        });
      }

      const teksti = await kysyMallilta(env, {
        jarjestelma: kehote,
        viestit,
        maxTokens: MAX_TOKENS,
      });
      // Erotinrivi puretaan aina täällä: pelaajalle menee vastaus ja
      // erillinen lista, ei koskaan raakaa merkintää.
      const { vastaus, jatkot } = poimiJatkot(teksti);
      return vastaa({
        vastaus: vastaus || 'En osaa vastata tähän. Kysytkö jotain muuta?',
        jatkot,
      }, kors);
    } catch (virhe) {
      // Vain tilakoodi lokiin — ei avainta, ei pelaajan tekstiä.
      console.log(`pollo: kutsu epäonnistui (${virhe?.status ?? 'verkko'})`);
      return vastaa({
        virhe: 'palvelin',
        viesti: 'Livia ei saanut kysymyksestä kiinni. Yritä hetken päästä uudelleen.',
      }, { status: 502, ...kors });
    }
  },
};
