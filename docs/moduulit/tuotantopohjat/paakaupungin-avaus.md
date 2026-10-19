# Tuotantopohja: pääkaupungin avaus

*(LUONNOS 17.10.2026, Sisältökirjuri, PT:n toimeksianto. Raamattu, TUOTANTOPOHJAT ja TUOTANTOPOHJIEN SANASTO. Tähän on koottu
vain nykyisten ohjeiden ja luovutusten opit; uusia sääntöjä ei ole. Jos tämä ja Raamattu ovat ristiriidassa, Raamattu voittaa.
Teksti-osuuden omistaa Sisältökirjuri; kartta, natiivi ja äänet täydentävät omat osansa otsikoilla "TÄYDENTÄÄ: <rooli>".
PT hyväksyy muutokset. Ei vielä dokumenttikartalla.)*

**Tavoitteen muoto (Raamattu 4.21, omistaja 19.10.2026 klo 15.32):** ennen työtä tavoite määritellään yhtä selvästi kuin grafiikassa havainnekuvalla. Tässä putkessa: KAMERA viitevideo tai kuvakäsikirjoitus ennen koodausta; UUDET TEKSTITYYPIT muutama esimerkki pelinäkymässä ennen koko erää; KÄYTTÖLIITTYMÄ kuvakaappaus, johon muutos on piirretty. Omistajalle tuodaan vain uudet asiat ja makuvalinnat; muut tavoitteet hyväksyy PT.

Pääkaupungin avaus = kaikki, mitä pelaaja saa, kun pääkaupunki avataan: kaupunkikartan esittely, oppaan pallolentoesittely
(avaus + 8 kohdetta), historiaosiot, lehti (kaupunkilehti ja maalehti tai kevyt maakortti), kohtaaminen ja aarretehtävä sekä
Pulun repliikit. Pohja kattaa tekstin ja sen tarkistuksen; kartan, natiivin ja äänen työ on omissa osissaan (luvut 7–9).
Se ei kata 3D-maamerkkiä (oma pohja), eikä uuden maanosan kaaritekstejä (`tarinakaari.md`).

**Rajaus (Raamattu, MUUT MAANOSAT VÄHITELLEN ja KAIKKI MAAT JA PÄÄKAUPUNGIT):** uusi pääkaupunkisisältö tehdään Euroopalle; muille
maanosille vain omistajan erillisellä päätöksellä. **Avaamisen ehto:** esittelyt ovat valmiit ja pääkaupungin 3D-mittaus on
läpäisty (esim. Varsova, Tallinna, Sarajevo ja Vaduz eivät 16.10. läpäisseet 3D-laatua, joten niiden avausta ei aloiteta).

## 1. Tuotantoputki ja roolit

```
Karttaseppä: kohdelista (8 kohdetta, Q-id, luokka, koko, katse) + 3D-mittaus läpi
  → Sisältökirjuri: faktapohja (kaksi lähdettä per väite) → kartan esittely + oppaan esittely + lehti + kysymykset + Pulun rivit
  → riippumaton tarkistus (agentti, Sonnet/Opus, ei näe kirjoittajan perusteluja)
  → PT: tarkistus (tosiasiat, kaanon, Williamin ääni, pituus) ja korjaukset
  → Tekstit-osasto (näyttöteksti) → hyväksyntäpolku (luku 5)
  → Pelikoodari / Natiivi-UI: kytkentä; Äänittäjä: äänet vain luvalla; Julkaisija: vienti → juna
```

| Vaihe | Rooli | Tulos |
|---|---|---|
| 0. Kohdelista ja 3D | Karttaseppä | `kohteet.json` (8 kohdetta/kaupunki) ja mittaus läpi |
| 1. Faktapohja | Sisältökirjuri | `docs/kohtaukset/kaupunkiesittelyt/<id>.json` (teksti, lähteet, pudotetut, ristiriidat) |
| 2. Oppaan esittely | Sisältökirjuri | `docs/kohtaukset/oppaan-esittelyt/<id>.json` (äänetön, `aaneton: true`) |
| 3. Lehti | Sisältökirjuri | kansi, nostot, minitehtävä, kohtaaminen (`kaupunkilehti.md`, `maalehti.md`) tai kevyt maakortti |
| 4. Pulun rivit | Sisältökirjuri | saapuminen ja muut repliikit Tekstit-osastoon |
| 5. Riippumaton tarkistus | tarkistaja-agentti | KORJAA / EPÄVARMA / OK -lista lähteineen |
| 6. PT:n tarkistus | PT | korjaukset tai hyväksyntä; omistajalle yksi rivi, kun kaupungit ovat auki |
| 7. Kytkentä ja vienti | kytkijä, Julkaisija | `TÄYDENTÄÄ`-osat |
| 8. Retrospektiivi | Sisältökirjuri | kirjaus tämän pohjan opit-osioon |

Sisältökirjuri ei kytke eikä vie; löydökset ja valmis erä ilmoitetaan PT:lle viestinä (enintään 3 riviä, yksityiskohdat
tiedostoon `docs/raportit/`). Agentit vain Opus ja Sonnet.

## 2. Kultainen polku (oletustapa)

1. **Tarkista ensin, mitä pelissä jo on.** Kevyellä pääkaupunkipisteellä on maakortti ja pääkaupunkirivi; lehti avautuu
   siitä. Älä kirjoita lehteä, jos Raamatun linjaus on kevyt sisältö (3–5 lauseen esittely, ei maalehteä: minivaltiot).
   Tarkista myös `docs/kohtaukset/kaupunkiesittelyt/` ja `oppaan-esittelyt/`, ettei kaupungille ole jo aineistoa, ja
   `node tools/loki-hae.mjs <kaupunki>` ettei työtä ole peruttu tai tehty.
2. **Faktapohja ensin, teksti sen päälle.** Jokainen väite saa kaksi itsenäistä lähdettä (Wikipedia ja toinen: Britannica,
   UNESCO, museo, kaupunki, tutkimus). Vain yksi lähde, ristiriitaiset luvut tai kiistanalainen perustamisvuosi: pudota tai
   muotoile varovasti ("noin", vuosikymmen, "kerrotaan"). Pudotetut ja ristiriidat kirjataan aineistotiedostoon.
   Hakutulos-lähteet (sivu antoi 403/404) merkitään `huom: "hakutulos"`.
3. **Kartan esittely** (`KAUPUNKIKARTAT.<id>.esittely`): 600–720 merkkiä, kaksi kappaletta, alku "Kartan alue on …",
   loppu "Kartan kohteista pääsee lukemaan lisää napauttamalla."
4. **Oppaan esittely** (ohje `docs/kohtaukset/oppaan-esittelyt/tyokalut/ohje-agentille.txt`, tarkistus `tarkista.mjs`):
   - avaus 3–5 virkettä: "Tervetuloa …", maisema ylhäältä, yksi tuulivirke (fysiikka oikein: noste lämpötilaerosta,
     vaakaliike tuulesta), lopuksi "Kierros alkaa …".
   - 8 kohdetta Karttasepän kierrosjärjestyksessä: teksti 500–750 merkkiä (4–6 faktaa), lyhyt 220–380 merkkiä (muut faktat
     kuin tekstissä, muuten `null`), yksi syventävä kysymys, 5 jatkokysymystä, `isoisa: false`.
   - `nimi` on Karttasepän Wikidata-nimi, kerronta käyttää vakiintunutta suomalaista nimeä; jos peli vertaa nimiä, PT päättää.
   - `koko_m` on rajausneliö, ei kohteen pituus; älä käytä sitä faktana.
5. **Lehti** (resepti `maalehti.md` "Lehtimaan monistusohje" ja `kaupunkilehti.md`): kansi (3 kansikuvaa, 3 nostoa; ensimmäinen
   nosto taiteilijagalleria), maan aiheet 5 × 4 nostoa (440–660 merkkiä), minitehtävä, kohtaaminen, maan intro. Kuvat vain
   PD/CC, katsottu silmin ja `katsottu`-kenttä kuvaa sisällön omin sanoin. Yksi kuva kerran per kaupunki.
6. **Aarretehtävä ja kysymykset** (`tarinakaari.md` luvut 4–6): kysymys nousee kaupungin omasta kohtauksesta, oikea ei ole
   ainoa selittävä vaihtoehto, väärät eivät ole puolitosia, vastauksen sanatarkka rivi ei saa olla tekstissä. Tarkista aina
   kaupungin oma kulttuurivisa (`kysymys`-kenttä) ennen kuin hyväksyt minitehtävän. Pituusbudjetti: saapuminen ≤ 380,
   kohtaaminen ≤ 260, aarre ≤ 220 merkkiä, kohde yhteensä ≤ 800.
7. **Pulun repliikit:** vain nykyiset hyväksytyt rivit ja tyyli (`livia-aani.md`; Pulu aloittaa suoraan asiasta, ei
   isoisän lukua aloituskaupungissa). Uudet rivit ovat omistajan sanatarkkoja päätöksiä: älä muokkaa hyväksyttyä riviä;
   epäselvä viittaus kirjataan huomiona, ei korjata itse. Luvut sanoiksi ennen merkkimäärän laskemista.
8. **Ei väitettä 1873:sta** muuten kuin historiallisena tosiasiana; kartta on nykyajassa, estetiikka vanha (AIKA).
   Ei nykytaidetta eikä poliittisesti kiistanalaisia arvioita; Jerusalem ilman kannanottoa, Guinean pääkaupunki Ciudad de la
   Paz (esittelyssä mainitaan Malabo) kuten Raamatussa.
9. **Riippumaton tarkistaja ennen PT:tä.** Anna tarkistajalle vain tekstit ja lähteet, ei perusteluja, ja sano "oleta että
   jotain on pielessä". Kirjoittajan oma tarkistus ei löydä tyypillisiä virheitä (luku 6). Raportti: KORJAA / EPÄVARMA / OK
   väitteittäin; korjaus tehdään varovaisemmaksi muotoiluksi, ei uudeksi väitteeksi.
10. **Koneellinen tarkistus** ennen luovutusta: pituudet, kierros = kohteiden id:t samassa järjestyksessä, kaksi lähdettä
    per väite, 5 kysymystä, 8 kohdetta (`oppaan-esittelyt/tyokalut/tarkista.mjs`).

## 3. Valmiin määritelmä (tarkistuslista)

Pääkaupungin teksti-osuus ei ole valmis ennen kuin kaikki kohdat täyttyvät:

- [ ] Kaupunki on Euroopassa (tai omistajan erillinen päätös), 3D-mittaus läpäisty ja kohdelista saatu.
- [ ] Faktapohja: kaksi lähdettä per väite, pudotetut ja ristiriidat kirjattu, hakutulos-lähteet merkitty.
- [ ] Kartan esittely 600–720 merkkiä, kaksi kappaletta, alku ja loppu vakiolauseet.
- [ ] Oppaan esittely: avaus + 8 kohdetta, pituudet rajoissa, koneellinen tarkistus läpi.
- [ ] Lehti tai kevyt maakortti Raamatun linjauksen mukaan; kuvat tarkistettu silmin, tekijämerkinnät kirjoitettu juuri
      kuten Commons antaa (ei käyttäjänimen takaa arvattua nimeä).
- [ ] Aarretehtävä ja kysymykset: pituusbudjetti, ei osu kaupungin omaan visaan, oikean vastauksen pituus ei paljasta.
- [ ] Pulun repliikit vain hyväksytyt; luvut sanoiksi; merkkimäärä puhutusta muodosta.
- [ ] Riippumaton tarkistus tehty ja kaikki KORJAA-rivit korjattu; EPÄVARMA-rivit varovaisemmaksi tai pois.
- [ ] PT:n tarkistus (tosiasiat, kaanon, Williamin ääni, pituus) tehty.
- [ ] Esittelyt Tekstit-osastossa ja hyväksyntäpolku kuljettu (luku 5).
- [ ] `TÄYDENTÄÄ`-osat (kartta, natiivi, äänet, vienti) täytetty ja kuitattu.
- [ ] Luovutus: aineistopolut, heikoimmat kohdat ja pudotetut väitteet raportissa `docs/raportit/`.
- [ ] Retrospektiivi kirjattu tämän pohjan opit-osioon (luku 10).

## 4. Poikkeaminen

Poikkeus kultaisesta polusta vain PT:n hyväksynnällä; poikkeama kirjataan joko uudeksi poluksi tai jätetään pois.

## 5. Hyväksyntäpolku

| Sisältö | Hyväksyjä | Perusta |
|---|---|---|
| Pääkaupunkien esittelyt (kartta, opas) ja niihin liittyvät historiaosiot | PT riippumattoman tarkistuksen jälkeen, ilman omistajan rastia | Raamattu, PÄÄKAUPUNKIEN ESITTELYT ARVIOIDAAN ITSE (omistaja 16.10. 19.51); omistajalle yksi rivi, kun kaupungit ovat auki |
| Pulun repliikit ja uudet isoisän tekstit | omistaja (Tekstit-osasto, "Odottaa hyväksyntääsi") | ei pysyvää lupaa; vaativat rastin, paitsi Pulun rivin sanatarkka toisinto (vain kaupungin nimi vaihtuu, ks. alla) |
| Äänet | omistaja (lupa KK:n "OMISTAJAN PÄÄTÖS" -rivillä) | `kertojan-teksti-ja-aani.md` luku 2, kohta 4 |
| Uusi sääntö tai poikkeus kaanoniin | PT → omistaja | Raamattu, vain Päätoimittaja kirjaa |

Tekstit-osasto (äänisivu) on näyttöteksti: tunnus, teksti ja tila. Hyväksytty teksti viedään dataan vasta hyväksynnän jälkeen.
**Pulun rivin toisinto (PT 17.10.):** sanatarkka toisinto jo hyväksytystä rivistä, jossa vain kaupungin nimi vaihtuu, ei tarvitse uutta rastia; viittaus alkuperäisen rivin hyväksyntään riittää. Mikä tahansa muu sanamuodon muutos vaatii omistajan rastin.

## 6. Tyypilliset virheet (tarkistajan lista)

Toistuvat samoina eri kaupungeissa; tarkista jokaisesta erästä erikseen:

1. **Yksi lähde tai lähteet ristiriidassa** (esim. "yksi maailman suurimmista", perustamisvuosi, siltojen pituudet).
   Korjaus: "noin", haarukka, vuosikymmen tai pois.
2. **Lähdevirke sanasta sanaan tai lisätty syy-yhteys** (sidesana vaihdettu, "X johtuu Y:stä" vaikka lähde ei sano niin).
3. **Kysymys osuu kaupungin omaan visaan** tai oikea vastaus on aina pisin vaihtoehto.
4. **Nimiristiriita:** Wikidata-nimi, kartan nimi ja vakiintunut suomalainen nimi eroavat; kirjaa, kumpi viedään.
5. **Koko tai pituus väärästä kentästä** (`koko_m` rajausneliö, ei pituus).
6. **Tyhjä tai muodollinen `katsottu`-kenttä:** kuvaa ei ole katsottu; kirjaa mitä kuvassa näkyy.
7. **Käyttäjänimen takaa arvattu tekijä** CC BY -kuvassa.
8. **Poliittinen tai kiistanalainen lisä** (lempinimet, patsaat, rajat, pääkaupunkikiista): pois tai symmetrisesti.

## 7. TÄYDENTÄÄ: Karttaseppä

*(kohdelista, 3D-mittaus ja laatukynnys, kartan kohteet ja nimet (nimi_pelissä), pääkaupunkipiste ja laudan rivi, maakortin
pääkaupunkirivi, havainnekuvat. Täydentää Karttaseppä.)*

## 8. TÄYDENTÄÄ: Pelikoodari ja Natiivi-UI

*(kytkentä: `KAUPUNKIKARTAT.<id>.esittely`, `aineistot.js` esittely_polut, oppaan polku `opas/esittely-v2a/<id>.json`, kytkimet,
natiivin näkymä, lehden avautuminen maakortista, testit. Täydentää Pelikoodari ja Natiivi-UI.)*

## 9. TÄYDENTÄÄ: Äänittäjä ja Julkaisija

*(äänet vain luvalla: kertoja ja Pulu, katso `kertojan-teksti-ja-aani.md`; `mykistetyt`; vienti `vie-paketti.sh`, ämpäri,
junaan liittäminen. Täydentää Äänittäjä ja Julkaisija.)*

## 10. Opit ja retrospektiivi (kirjataan jokaisen työn lopussa)

Muoto: päivä, työ — mikä toimi, mikä hidasti, mikä muuttuu pohjassa.

*(Rivit 13.–19.10.2026 on siirretty lokista, muistista ja KK:n katselmuksesta omistajan päätöksellä 19.10. klo 15.35; uusia sääntöjä ei ole.)*

- **19.10.2026, nostojen Kysy-kysymykset ja tekstin luku pelinäkymässä.** Hidasti: Kysy-kysymyksistä tarkistettiin vain
  pituus (ja kysymysmerkki), ja omistaja huomasi vastaukset suoraan tekstissä; 147/256 kysymystä vaihdettiin (#4947).
  Omistajan linjaus: Kysy-kysymykset eivät saa olla tekstistä vastattavia, vaan antavat lisätietoa monesta suunnasta. Muuttuu:
  tekstit luetaan pelinäkymässä (tuore agentti) ennen PT:tä, omistaja ei ole ensimmäinen lukija. Lähde: loki "PAATOKSET
  19.10.2026 klo 12.11–12.23" ja "OMISTAJAN PÄÄTÖS 19.10.2026 klo 15.21".
- **17.–19.10.2026, nykypaikan kuvan aitous (Kööpenhamina, Tivoli).** Omistaja hylkäsi Codexin Tivoli-kuvat A1–A2 ja C1–C6
  ("Ei näytä aidoille, ei käytetä"); käyttöön tuli Commonsin CC-valokuva (Tivoli at night, Leif Jørgensen, CC BY-SA 4.0).
  Opetus: todellisen nykypaikan kuvan pitää näyttää aidolta valokuvalta; ylikylläiset värit, liika valo (jokainen lamppu
  palaa), liian täydelliset istutukset ja kiiltävä pinta paljastavat tekoälykuvan, ja tarkistuksessa kysytään paikan
  oikeellisuuden lisäksi "Uskoisiko tätä valokuvaksi?". Tivoli v2 hyväksyttiin pohjakuvalla (18.10.), mutta k8 (pagodi
  illalla, 19.10.) tilattiin ilman v2:n aitousvaatimuksia ja arvioija näki samat viat (KK-katselmus). Muuttuu: nykypaikan
  tilaukseen pohjakuva ja aitousvaatimus. Lähde: loki "TIVOLIN CODEX-KUVAT EI KAYTETA (17.10.2026 klo 22.13)", "TIVOLIN
  ILTAKUVA", "PAATOKSET 18.10.2026 klo 10.14"; muisti nykypaikan-kuva-aito-valokuva, codex-kuvat-fotorealistiset.
- **13.10.2026, pääkaupunkikuvat Commonsista.** Omistaja: nykyiset voi jättää, jatkossa vain Commons, ja riittää tarkastaa
  ensin osa. Muuttuu: pistokoe kuvatyypeittäin (ruoka, luonto, nähtävyydet, Commons) ennen kytkentää; vasta toistuva vika
  laajentaa tarkistusta. Lähde: muisti paakaupunkikuvat-commons-pistokoe.
- **16.10.2026, 7 pääkaupungin oppaan ja kartan esittelyt** (Monaco, Bern, Belgrad, Zagreb, Bratislava, Tirana, Podgorica).
  Hidasti: PT:n riippumaton tarkistus löysi faktakorjauksia kaikista seitsemästä (Tiranan moskeijan ajoitus ja Taiwan-lempinimi,
  Monacon aukiolo, Bernin kukko-esitys, Bratislavan raatihuone, Belgradin Skadarlija, Zagrebin Lotrščakin torni).
  Muuttuu: riippumaton tarkistaja ajetaan ennen PT:tä (kultainen polku 9), ei vasta jälkikäteen.
- **12.10.2026, 14 Euroopan pääkaupunkilehden pistokoe** (75 väitettä): 62 OK, 2 KORJAA (Tiranan pyramidin ala, Monacon asema),
  11 EPÄVARMA; kysymystaulut: 4 KORJAA, 8 EPÄVARMA. Muuttuu: luvut, vuosiluvut ja "suurin/ensimmäinen" tarkistetaan aina
  kahdesta lähteestä jo kirjoitusvaiheessa (kultainen polku 2).
- **Elokuu 2026, lehtityön toistuvat viat** (`kaupunkilehti.md`): arvattu tekijä, minitehtävä osuu omaan visaan, lähdevirke
  sellaisenaan; kahdeksasta uudesta minitehtävästä kaikki hylättiin ensimmäisellä kierroksella. Muuttuu: virhelista luvussa 6.

## 11. Lähteet

`docs/moduulit/kaupunkilehti.md` ja `docs/moduulit/maalehti.md` (voimassa olevat osat), `docs/moduulit/tarinakaari.md`
(luvut 4–6, 8), `docs/moduulit/livia-aani.md`, `docs/moduulit/tuotantopohjat/kertojan-teksti-ja-aani.md`,
`docs/kohtaukset/oppaan-esittelyt/tyokalut/ohje-agentille.txt`, raportit `docs/raportit/oppaan-esittelyt-7-20261016.md`,
`kaupunkiesittelyt-7-20261016.md`, `paakaupunkilehdet-pistokoe-20261012.md`, `paakaupunkikysymykset-pistokoe-20261012.md`;
Raamattu: PÄÄKAUPUNKIEN ESITTELYT ARVIOIDAAN ITSE, KAIKKI MAAT JA PÄÄKAUPUNGIT, MUUT MAANOSAT VÄHITELLEN, AIKA, TUOTANTOPOHJAT,
TUOTANTOPOHJIEN SANASTO.
