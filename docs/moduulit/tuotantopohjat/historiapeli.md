# Tuotantopohja: historiapeli

*(LUONNOS 17.10.2026, Sisältökirjuri, PT:n toimeksianto. Raamattu, TUOTANTOPOHJAT ja TUOTANTOPOHJIEN SANASTO. Tähän on koottu
vain nykyisten ohjeiden ja luovutusten opit (Olavinlinna "Aarnivalkea", Kielletyn kaupungin juoksupeli, Kiinan dynastiat -linssin
faktatyö); uusia sääntöjä ei ole. Jos tämä ja Raamattu ovat ristiriidassa, Raamattu voittaa. Sisältö-osuuden omistaa
Sisältökirjuri; muut osat täydentävät tekijänsä otsikoilla "TÄYDENTÄÄ: <rooli>". PT hyväksyy muutokset. Ei vielä
dokumenttikartalla.)*

Historiapeli = pelattava historiallinen kohde maan tasalta (Raamattu, HISTORIALLISET KOHTEET SEIKKAILUINA): Olavinlinna vuoden
1499 linnana, Kielletty kaupunki (kesä 1923 ja lapsi-Puyin juoksupeli noin 1914) ja Gizan historiallinen versio.
Pohja kattaa tarinan, faktapohjan, repliikit, arvoitukset ja tietokerroksen sekä niiden tarkistuksen; pelimekaniikka,
rakennus ja ääni ovat omissa osissaan (luvut 7–9). Ei kata historiaa kertovaa linssiä (esim. Kiinan dynastiat, jonka
faktatyö on tässä esimerkkinä) eikä kertojan tekstiä yleisesti (`kertojan-teksti-ja-aani.md`).

**Rajaus:** työ etenee yksi kohde kerrallaan omistajan käskyllä. Olavinlinna on toistaiseksi tauolla (13.10.: vain viisi
keittiön tasoista tilaa peliin, ei uusia tiloja); Kielletyn kaupungin juoksupeli aloitetaan harmaasta pelattavasta
versiosta heti (omistaja 17.10. 22.17, Codexin Pekingiä ei odoteta; tuotantoputki Raamatussa, JUOKSUPELIN LINJAUS); Giza vasta Olavinlinnan ja Kielletyn kaupungin jälkeen. Euroopan ulkopuoliset kohteet ovat omistajan
nimetyt poikkeukset (muut maanosat vasta omistajan aloituspäätöksellä); uutta kohdetta ei aloiteta ilman hänen päätöstään.

## 1. Tuotantoputki ja roolit

```
PT + omistaja: kohde, hetki ja sävy (kortti)
  → Sisältökirjuri: faktapohja (2 lähdettä per väite, merkinnät) → anakronismi- ja kieltolista
  → tarina: hetki, hahmot, arvoitus (totta vs. FIKTIO eroteltuna) → repliikit → tietokerroksen kortit
  → riippumaton lähdetarkistus (omat haut, alkuperäislähteet) → PT:n tarkistus
  → Tekstit-osasto → omistajan rasti (uudet repliikit ja Pulun tekstit) → äänet vain luvalla
  → Pelikoodari / Natiivi-UI / Linnanrakentaja: rakennus ja kytkentä → botti ja läpipeluu → junaan
```

| Vaihe | Rooli | Tulos |
|---|---|---|
| 0. Hetki ja kohde | PT → KK → omistaja | kortti; tilanne, vuosi, sävy, rajaukset |
| 1. Faktapohja | Sisältökirjuri (Sonnet-tutkijat) | `docs/raportit/faktapohja-<kohde>.md` tai `docs/kohtaukset/<kohde>/…-faktat.md` |
| 2. Tarina | Sisältökirjuri / Opus | ehdotus (reitti, arvoitus, totta ja FIKTIO), PT valitsee |
| 3. Repliikit | Sisältökirjuri | repliikkitaulukko (id, vaihe, teksti, äänen ohje, merkkimäärä) |
| 4. Tietokerros | Sisältökirjuri | kortit (40–70 sanaa), lähteet, varmuus |
| 5. Tarkistus | tarkistaja-agentit | lähdetarkistus, sukupuoli- ja käännettävyystarkistus |
| 6. Äänet | Äänittäjä | vain luvalla |
| 7. Rakennus ja kytkentä | Linnanrakentaja, Pelikoodari, Natiivi-UI | `TÄYDENTÄÄ`-osat |
| 8. Retrospektiivi | Sisältökirjuri | kirjaus luvun 10 oppeihin |

Sisältökirjuri ei kytke eikä kirjoita proto-gitiin; löydökset ja valmis erä PT:lle viestinä (enintään 3 riviä), yksityiskohdat
tiedostoon. Agentit vain Opus ja Sonnet.

## 2. Kultainen polku (oletustapa)

1. **Faktapohja ensin, kuvaukset ja ääni viimeisenä.** Tutkimus, ei generointia. Osat: henkilöt, tapahtumat ja paikan kunto
   pelin hetkellä, arki, esinetarkistus, legendat, kuvalähteet; lopuksi epävarmojen tarkistus, joka ohittaa osien alkuperäiset
   merkinnät. Faktapohja on tausta ja valinnainen tietokerros, ei pelin aikana opetettavaa.
2. **Merkinnät joka väitteelle.** [V]/[1L]/[EPÄVARMA] ja [FIKTIO/LEGENDA] sekä tutkimuksessa [EI LÖYDETTY], [EI PELIIN]
   (totta mutta ei sovi sävyyn: väkivalta, kurinpito). Pelitekstiin menevät vain faktat ilman [EPÄVARMA]-merkintää; PYSYVÄSTI
   EPÄVARMA ei käy pelitekstiin. Kaksi itsenäistä lähdettä; yksi lähde → muotoile varovasti tai pois. Kiistanalaiset kohdat
   kirjataan, ei luokitella virheiksi.
3. **Aikaikkuna ja anakronismit.** Määritä hetken ikkuna ennen kirjoittamista (Olavinlinna noin 1495–1510, lapsi-Puyi 1912–1918)
   ja kirjaa kielletyt asiat: Olavinlinnassa omena (ensimmäinen varma istuttaja Suomessa 1539), haarukka, peruna, tomaatti,
   mekaaninen kello, lasi-ikkuna ja markkakolikko; juoksupelissä polkupyörä (1922), englanti ja Johnston (1919–), silmälasit
   ja letin leikkaus (1922). Turvallisten esineiden lista kirjataan myös (puulusikka, nauris, kaali, ruisleipä, talikynttilä).
   Aineistoaukko kirjataan avoimesti (Olavinlinnan omat tilit alkavat vasta 1539–43), ja analogiat merkitään arvioksi.
4. **Totta ja FIKTIO erikseen.** Jokaisessa tarinassa on kirjattu, mikä on historiaa ja mikä keksittyä (aarre, kätkeminen, kiinnijäänti);
   tietokerros sisältää kortin "Mikä oli keksittyä?" (kortti 12), jolloin pelaaja ei sekoita sepitettä faktaan.
   Elokuvan tai romaanin tuoma virhe merkitään "elokuva ≠ historia".
5. **Pelaaja astuu suoraan toimintaan.** Peli ei aloita historian esittelyllä (tornien nimet, vuosiluvut): tehtävä on arvoitus
   tai aarre, ja historia opitaan pelatessa; pelin aikana ei opeteta eikä kysellä. Arvoitus nojaa todellisiin yksityiskohtiin
   (Olavinlinna: 13 vaakunalaattaa, umpeen muuratut komerot, ikkunaton kappeli), ei luettelon muistamiseen.
6. **Repliikit.** Lyhyt, luonteva puhe, aikakauden mukainen mutta ymmärrettävä; 13+, ei kiroilua; ei väkivaltaa ihmisiä vastaan
   (irtipääsy, köyden katkaisu, töytäisy matalaan veteen), ei verta eikä aseita ihmisiä vastaan. Taulukko: id, huone,
   vaihe (esim. rauha, epäily, tutkii, etsii, hälytys, kiinni), repliikki, äänen ohje, merkkimäärä; yksi otto per rivi.
   Ei kaanonmuutoksia (ei uusia hahmoja ilman PT:tä).
7. **Pelaaja on sukupuoleton.** Pelaajaa puhutellaan "sinä"; englanniksi Fogg / you / they, ei he/she missään kohtauskuvauksessa,
   alt-tekstissä, kortissa tai vihjeessä. Sukupuoli vain toisten hahmojen nimikkeissä, joissa kanoni on selvä (vouti, kappalainen).
   Tarkista suomi ja englanninnettavuus erikseen (esim. "pikku vintiö", "varas" ovat sukupuolettomia).
8. **Pulun osuus ja tietokerros.** Vain hyväksytyt Pulun rivit (`livia-aani.md`); Pulun reunakuvaa, vihjelentoja tai äännähdyksiä ei ole
   Olavinlinnan pelissä (Raamattu, KAMERA JA VIHJEET). Tietokerros (drone-näkymä, lähteet) tarjotaan vasta lopussa tai pyydettäessä,
   eikä pelin aikana opeteta mitään (Raamattu, HISTORIALLISET KOHTEET 7.10.); pyyntönappia ei ole päätetty, ja nappi kuuluu
   Pelikoodarin osaan (luku 7). Uudet Pulun tekstit vaativat omistajan rastin Tekstit-osastossa.
9. **Lähdetarkistus paikallisesti ja alkuperäislähteistä.** Kun verkko tai botinsuoja estää sivun, ei kierretä: lataa vapaa
   PDF tai kokoteksti (esim. arkeologinen selvitys, Project Gutenberg) ja lue se; kirjaa sivunumerot tai rivit. Hakutulos-
   tiivistelmä merkitään "hakutulos". Tekoälyn tuottamia sivuja (esim. "AI-generated"-merkitty wikisivu) ei käytetä todisteena.
10. **Ikä ja ajanlasku oikein.** Muistelmien iät voivat olla kiinalaisia (vuosi = 1 v): "11 vuotta" = 9–10 v. Vuosiluvut
    gregoriaanisina, aina vuosi, johon fakta pätee (1912–1918 vs. myöhemmin). Luvut, jotka vaihtelevat lähteittäin: haarukka
    tai "noin".
11. **Historiaa kertova linssi: yksi virke per vuosi.** Esimerkkinä Kiinan dynastiat: kolme tarkistajaa kävi läpi 19 vuotta
    (nimet, pääkaupunki, tarinarivi, rajat); rivit hiottiin tarkistuksen jälkeen ("lähes neljän vuosisadan jälkeen" pois, koska
    laskutapa vaihtelee; "Tiibet valtaa Silkkitien ja Tarimin" liian vahva). Muutossarake kertoo, mitä tarkistus vaati.
12. **Riippumaton tarkistaja ennen PT:tä** (kultainen polku muista pohjista): tarkistaja ei näe kirjoittajan perusteluja, hakee omat
    lähteet ja ajaa tehtävän "oleta että jotain on pielessä". Raportti KORJAA / EPÄVARMA / OK väitteittäin.

## 3. Valmiin määritelmä (tarkistuslista)

Sisältö-osuus ei ole valmis ennen kuin kaikki kohdat täyttyvät:

- [ ] Kohde ja hetki omistajan kortilla; aikaikkuna, anakronismi- ja kieltolista kirjattu.
- [ ] Faktapohja: kaksi lähdettä per väite, merkinnät, [EPÄVARMA] ja [EI PELIIN] eritelty, aineistoaukot kirjattu.
- [ ] Tarina: totta ja FIKTIO eroteltu; arvoitus nojaa todellisiin yksityiskohtiin; ei historian esittelyä alussa.
- [ ] Repliikit taulukossa, merkkimäärät laskettu, sävy (13+, ei väkivaltaa ihmisiä vastaan) ja kaanon tarkistettu.
- [ ] Sukupuoli- ja käännettävyystarkistus tehty (suomi, englanti: Fogg / you / they).
- [ ] Tietokerroksen kortit (40–70 sanaa, lähteet, varmuus) ja kortti "Mikä oli keksittyä?".
- [ ] Riippumaton lähdetarkistus tehty, KORJAA-rivit korjattu, EPÄVARMA pehmennetty tai pois.
- [ ] PT:n tarkistus; uudet repliikit ja Pulun tekstit Tekstit-osastossa ja hyväksytty.
- [ ] Puheen merkkimäärä (puhutussa muodossa) ilmoitettu PT:lle; ääniluvat KK:n suoralla rivillä.
- [ ] Luovutusraportti: tiedostopolut, heikoimmat kohdat, pudotetut väitteet, huomiot kytkijöille.
- [ ] Retrospektiivi kirjattu luvun 10 oppeihin.

## 4. Poikkeaminen

Poikkeus kultaisesta polusta vain PT:n hyväksynnällä; poikkeama kirjataan joko uudeksi poluksi tai jätetään pois.

## 5. Hyväksyntäpolku

| Sisältö | Hyväksyjä | Perusta |
|---|---|---|
| Uusi kohde, hetki, sävy, rajaukset | omistaja (kortti PT:n kautta) | Raamattu, HISTORIALLISET KOHTEET SEIKKAILUINA |
| Tarinaehdotus (reitti, arvoitus) | PT valitsee, omistaja kortilla | Aarnivalkea (omistaja 7.10.) |
| Faktapohja ja tietokerros | PT riippumattoman tarkistuksen jälkeen | Raamattu; Päätoimittaja tarkistaa vaakunat ja historian ennen kytkentää |
| Uudet repliikit, Pulun tekstit | omistaja (Tekstit-osasto, "Odottaa hyväksyntääsi") | ei pysyvää lupaa uusille teksteille; PT:n 17.10. linjaus: sanatarkka toisinto ei rastia |
| Äänet | omistaja (KK:n "OMISTAJAN PÄÄTÖS" -rivi); kertojalla pysyvä lupa PT:n hyväksymiin | `kertojan-teksti-ja-aani.md` |
| Sääntöjen muutos | PT → omistaja | Raamattu |

## 6. Tyypilliset virheet (tarkistajan lista)

1. **Anakronismi** (omena Savossa 1500, polkupyörä 1914, englanti 1914): tarkista jokainen esine ja tapa kieltolistaa vasten.
2. **Muistelma ≠ historia:** muistelma tai elokuva levittää virheen (imettäjän karkotus, Longyun rooli, "Pujie kertoo tasavallasta"):
   tarkista toisesta lähteestä ja merkitse "elokuva ≠ historia".
3. **Kiinalainen ikälaskenta** sekoitettu länsimaiseen.
4. **Yksi lähde esitetty varmana** ([1L] tai hakutulos pelitekstissä): pehmennä tai pois.
5. **FIKTIO esitetty faktana** (kätketty kalkki, hopea, komero): merkitse tietokerroksessa.
6. **Pelin aikana opetetaan** (vuosilukuja, nimiluetteloita repliikeissä): siirrä tietokerrokseen.
7. **Väkivalta tai verinen kuvaus** (kiinniotto, kurinpito, rautahiekkakakut): [EI PELIIN] tai pehmennys.
8. **Sukupuolitettu viittaus pelaajaan** englanninnoksessa (he/she).
9. **Yliveto** (laajuus: "valtaa Silkkitien ja Tarimin", "yksi suurimmista"): käytä lähteen sanaa tai "noin".
10. **Korjaus äänen jälkeen:** jokainen faktakorjaus äänitetyn rivin jälkeen maksaa uusintaotoksen; tarkista ennen lupaa.

## 7. TÄYDENTÄÄ: Pelikoodari (avausnappi; ei reunakuvaa)

*(pelimekaniikka ja ohjaus (esim. juoksupelin pyyhkäisyt, Olavinlinnan hiiviskely), tallennus kynnyksillä, anteeksiantava
vaikeus, kehittäjätilan aloituskohdat, botin läpäisy ennen läpipeluuta, tietokerroksen kytkentä. Avausnappi (ei reunakuvaa):
tietokerros tarjotaan lopussa tai pyydettäessä; nappia ei ole päätetty. Täydentää Pelikoodari.)*

## 8. TÄYDENTÄÄ: Natiivi-UI

*(ruudulla vain liikkumistappi, toimintonappi kontekstikuvakkein ja tauko; tietokerroksen kortit tyylikirjan pohjalla; alku- ja
loppunäkymät; muistiraja. Täydentää Natiivi-UI.)*

## 9. TÄYDENTÄÄ: Äänittäjä

*(kertoja William ja hahmojen äänet (esim. eleven_v4_turbo, yksi otto per repliikki), ääniportti, hiiviskelyssä ei musiikkia,
kantele löydössä ja lopussa, äänitehosteet CC0-lähteistä, vienti ja mykistetyt. Täydentää Äänittäjä; ks.
`kertojan-teksti-ja-aani.md`.)*

## 10. Opit ja retrospektiivi (kirjataan jokaisen työn lopussa)

Muoto: päivä, työ — mikä toimi, mikä hidasti, mikä muuttui pohjassa.

*(Rivit 19.10.2026 on siirretty lokista ja muistista omistajan päätöksellä 19.10. klo 15.35; uusia sääntöjä ei ole.)*

- **19.10.2026, Puyin huudot (juoksupeli).** Omistajan linjaus: huudot lyhyiksi (esim. "Voi ei! Maljakko maksoi miljoonia!"),
  usein sidottuna kuplan tarinaan, samalle esineelle useita versioita ja hinta vain harvoin; puhuja on juokseva lapsi, joten
  vaihtelu ja hauskuus painavat enemmän kuin täydellinen faktatieto; toistuvalle esineelle lyhyt yleishuuto ("Voi ei taas").
  Hidasti: omistaja ei ymmärtänyt huutoa ilman kuplan sisältöä. Muuttuu: huutorivin mukana näytetään aina uneksinnan
  (kuplan) teksti ("Uni: …, teksti: dynastia + vuosi"); uusia huutoeriä ei ennen kuin erät 1–2 on testattu pelissä. Lähde:
  loki "PAATOS 19.10.2026 klo 09.41", "PYYNNOT 19.10.2026 klo 10.2x–10.27", "PAATOKSET 19.10.2026 klo 12.11–12.23"; muisti
  huudot-uneksinnan-teksti-mukaan.
- **19.10.2026, Puyin ääni.** Hidasti: koeäänet kuulostivat liian vanhoilta (6 oli lähimpänä); lapsi juoksee huutaessaan,
  joten tunnetagi huomioi sen. Valittu 08 Kavya (bA58y3FqVI6b6gTNh0oT), tagi `[shouting] [panicked]`, `speed` 1,2 natiivisti,
  suomi pakotettuna, ei jälkikäsittelyä; huudon alut ("Oho!", "Auts!", "Hoplaa!", "Noin!", "Katos vaan!", "Hups!", "Sori!"
  iloisena kiljahduksena) valitsi omistaja kuuntelemalla. Hahmoäänille ei ole omaa pohjaa. Lähde: loki "PAATOKSET
  19.10.2026 klo 11.08–11.23" ja "klo 11.41–11.45"; muisti aanet-ei-kysymyskortteja.
- **19.10.2026, muistokuplan kuvatilaus (Codex).** Hyväksytty tyyli: realistinen värivalokuva, esine ja hahmo keskimmäisellä
  noin 60 %:lla, reunoilla vähintään 20 % rauhallista taustaa (peli häivyttää yhdellä soikiomaskilla, ei alfaa kuvaan),
  vaaleat ilmavat sävyt, oikea ympäristö, läheltä (pehmeä syväterävyys) ja kevyt vastavalo, paljon harmaantuneita
  vanhoja opettajia; muistotyypit vaihtelevat (sali ja jalustalla esine ilman ihmisiä, oppitunti, lahja, juhla). Hidasti:
  kuplatilaus "läheltä" ilman mittaa → 10 uusintaa (A-erä 10/12 hylättiin PT:n katselmuksessa). Muuttuu: tilaukseen mitta ja
  pohjakuva. Lähde: loki "PAATOKSET 19.10.2026 klo 09.36–09.37", "klo 09.47", "klo 09.5x–10.03", "klo 10.58–11.02";
  KK-katselmus (scratchpad putket-lapikaynti-20261019, kuvat).
- **19.10.2026, kiinankieliset kirjoitukset.** Muuttuu: pelissä näkyvä kiinankielinen kirjoitus vain tarkistetuista oikeista
  teksteistä (SK:n lista Codexille), ei generoituja merkkejä; kiinan ilmaukset (shifu) sivuhuomiona. Lähde: loki "PAATOS JA
  PYYNNOT 19.10.2026 klo 10.38".
- **19.10.2026, juoksupelin äänitehosteet.** Hidasti: aanet-v1 (61) ja v1.1 (7) leikattiin koneellisesti Freesoundin
  esikuuntelu-mp3:ista AST-tunnistimen valinnalla, kukaan ei kuunnellut, ja omistaja kuuli virheet ensin (puuaskel =
  korkokengät, jade = lusikka kivimukissa). Muuttuu: Soundly Pro ja Sonniss ensin, Freesound vain aukkoihin alkuperäisinä,
  valmiit yksittäiset tehosteet, tekoäly kuvaa jokaisen äänen sokkona ennen peliä (Raamattu 5.27). Pohjan luvun 9 rivi
  "äänitehosteet CC0-lähteistä" on tämän vastainen; PT päättää korjauksesta. Lähde: loki "OMISTAJA: ÄÄNITEHOSTEIDEN
  OLETUSTAPA HYVÄKSYTTY (19.10.2026 klo 14.35)"; muisti aanitehosteet-kuuntelu-ennen-omistajaa.
- **16.10.2026, lapsi-Puyin faktapohja 1912–1918.** Neljä Sonnet-tutkijaa; noin 120 riviä merkittiin [EPÄVARMA], koska muistelmaa
  ja Johnstonia ei saatu kokotekstinä; vain merkinnätön kelpaa peliin. Muuttuu: aikaikkuna ja ikälaskenta kirjataan ennen tutkimusta
  (kultainen polku 3 ja 10).
- **16.10.2026, Kiinan dynastiat (19 vuotta, 3 tarkistajaa).** Rivit hiottiin tarkistuksen jälkeen; AI-merkitty wikisivu jätettiin
  todisteista pois. Muuttuu: yksi virke per vuosi ja muutossarake (kultainen polku 11).
- **9.10.2026, Olavinlinnan repliikit (16 uutta, 552 merkkiä).** PT korjasi yhden bluffaavan repliikin; ääntä ei generoitu ennen lupaa.
  Muuttuu: repliikkitaulukon muoto (id, vaihe, ääniohje, merkkimäärä) on vakio.
- **7.10.2026, Olavinlinnan lähdetarkistus.** Pilvisessio ei avannut lähdesivuja; paikallinen tarkistus luki arkeologisen
  selvityksen PDF:n ja Härön artikkelin OCR:llä. Muuttuu: estetty sivu ei ole este, jos vapaa PDF tai kokoteksti on saatavilla
  (kultainen polku 9).
- **7.10.2026, Olavinlinnan sukupuoli- ja käännettävyystarkistus.** Suomeen ei tarvittu muutoksia; englanninnoksen vaaranpaikat
  löytyivät (he/she, hahmoetiketit). Muuttuu: tarkistus kuuluu jokaiseen historiapeliin (kultainen polku 7).
- **7.10.2026, Olavinlinnan faktapohja.** Anakronismit (omena, haarukka, peruna) löytyivät vasta tutkimuksessa. Muuttuu: kielto-
  ja turvalliset-lista tehdään heti alussa (kultainen polku 3).

## 11. Lähteet

`docs/raportit/ehdotus-olavinlinna-seikkailu.md`, `faktapohja-olavinlinna-1500.md`, `olavinlinna-tietokerros-kortit.md`,
`olavinlinna-tietokerros-lahdetarkistus.md`, `olavinlinna-repliikit-puuttuvat-20261009.md`,
`olavinlinna-repliikit-sukupuoli-kaannettavyys-20261007.md`, `pelattavuusmalli-olavinlinna.md`,
`kiinan-dynastiat-faktatarkistus-20261016.md`, `docs/kohtaukset/kiinan-dynastiat/tarinarivit-20261016.md`,
`docs/kohtaukset/juoksupeli/puyi-lapsuus-faktat.md`, `docs/kohtaukset/oppaan-esittelyt/tyokalut/ohje-puyi-agentille.txt`,
`docs/moduulit/tuotantopohjat/kertojan-teksti-ja-aani.md`; Raamattu: HISTORIALLISET KOHTEET SEIKKAILUINA, OLAVINLINNAN PELIN
TOTEUTUS, OLAVINLINNA OIKEANA VUODEN 1499 LINNANA, OLAVINLINNA TAUOLLA, HETKET JA TARINAT, MUUT MAANOSAT VÄHITELLEN, TUOTANTOPOHJAT,
TUOTANTOPOHJIEN SANASTO; loki: KIELLETYN KAUPUNGIN JUOKSUPELI (16.10. 18.18).
