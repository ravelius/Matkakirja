# Tuotantopohja: kertojan teksti ja ääni

*(17.10.2026, läpikäyntikunnossa 20.10.2026 (PT hyväksynyt). Äänittäjä, PT:n toimeksianto. Raamattu 4.21 TUOTANTOPOHJAT ja
TUOTANTOPOHJIEN SANASTO. Tähän on koottu nykyisten ohjeiden ja luovutusten opit. Opeista polkuun nostetut kohdat ovat
PT:n hyväksymiä pohjan muutoksia (Raamattu 4.21 ja 8.2), eivät uusia Raamatun linjauksia. Jos tämä ja Raamattu ovat
ristiriidassa, Raamattu voittaa. Pohjan omistaa Äänittäjä (ääni) ja Sisältökirjuri (teksti), PT hyväksyy muutokset.
Pohja kuuluu Raamatun 4.21:n pohjaluetteloon (`docs/moduulit/tuotantopohjat/<tyyppi>.md`). Omistajalle avoin kohta on
luvussa 7.)*

**Tavoitteen muoto (Raamattu 4.21, omistaja 19.10.2026 klo 15.32):** ennen työtä tavoite määritellään yhtä selvästi kuin grafiikassa havainnekuvalla. Tässä putkessa: ÄÄNI mallinäyte ja lyhyt kuvaus siitä, miltä pitää kuulostaa (Gemini vertaa valmista ääntä mallinäytteeseen sokkona, 9.11); UUDET TEKSTITYYPIT muutama esimerkki pelinäkymässä ennen koko erää. Omistajalle tuodaan vain uudet asiat ja makuvalinnat; muut tavoitteet hyväksyy PT.

**Napit, tyylit ja toimintalogiikka (omistaja 20.10.2026 klo 22.58; Raamattu 2.70 ja kohta 2 UI-POHJAT):** pohja ei kuvaa omia nappeja, värejä eikä sisään- ja ulostuloa. Käytä tyylikirjaa (`tools/tyylikirja.mjs`, `tyylikirja/`) ja yhteisiä linssien ja pelien sääntöjä (2.70, 2.201). Käytä ensin yhteistä osaa; uusi osa tehdään yhteiseksi kaikille (omistaja 23.25), ja puuttuva pohja kysytään PT:ltä.

**Koko työ ideasta junaan (omistaja 20.10.2026 klo 22.53, Raamattu 4.21):** pohja kattaa työn ideasta junaan. Työ alkaa tavoitteesta: äänessä mallinäyte ja kuvaus, uudessa tekstityypissä esimerkit pelinäkymässä. Ääneen sovitettuna omistaja kuulee mallinäytteen ja valmiin oton peräkkäin KK:n kautta ennen junaa. Tämä koskee vain uusia asioita ja makuvalintoja (esim. uusi ääni, uusi hahmo, uusi tekstityyppi); tavallisen erän tutulla äänellä ja tutulla tyypillä hyväksyy PT (Raamattu 4.21).

**Julkaisu (Raamattu 10.2 ja 9.11):** valmis ääni menee avoimeen junaan (yksi juna kerrallaan). Lukitus ja TestFlight tehdään vain omistajan pyynnöstä ("OMISTAJA PYYSI JULKAISUA"). Simulaattoria käytetään vain selvästi uuteen tekniikkaan, omistajan pyytämiin kuviin ja yöjunan laitekierrokseen; tavallinen ääni- tai tekstierä kulkee automaattisten tarkistusten jälkeen suoraan junaan ilman simukuvia.

Tämä pohja kattaa kaiken, minkä pelissä lukee ääneen kertoja (isoisä, William, Pulu): kaaritekstit, kaupunkien ja museoiden
kertomukset, historiaosiot, selitteet, Pulun vastaukset ja kutsut. Se ei kata musiikkia, tehosteita eikä askelia
(`aanipohja.md`; musiikki aina Lyrialla, Raamattu 5.15) eikä pelikytkentöjä (kytkijän oma työ).

## Tarkista ennen (ääniosuus; AINA ennen kuin generoit tai kysyt omistajalta)

- **5.1 / 5.2 lupa ja määrä:** AINA: lupa KK:n suoralla "OMISTAJAN PÄÄTÖS klo …" -rivillä, tarkka ottomäärä ja merkkimäärä (tagit ja luvut sanoina mukaan); hyväksytyllä ElevenLabs-äänellä lupa vain kun ajo ylittää 3 % kuukauden krediiteistä (ajokohtainen raja), kertojaäänten pysyvä lupa PT:n hyväksymille teksteille. EI: uutta henkilöä tai ääntä ilman lupaa; EI: uusintaa omin päin (ottomäärä sitoo, uusinta = uusi lupa KK:n kautta).
- **5.22 / 5.12 ääni ja otto:** AINA: William `oae6GCCzwoEbfc5FHdEu` / Pulu / isoisä oman reseptinsä mukaan (`speed` vain asetuksena, ei atempoa); yksi otto per teksti, dialogi yhtenä ottona. EI: puheen jälkisäätöjä (nopeutus, venytys).
- **5.13 / 5.11 / 9.11 talteen ja tarkistus:** AINA: raaka talteen heti ennen käsittelyä; `language_code: fi` rungossa; ääniportti ja Gemini-sokkokuuntelu ennen vientiä (omistaja ei ole ensimmäinen kuuntelija). EI: ämpärin ylikirjoitusta (uusi polku).
- **7.27 tekstit omistajalle:** AINA: huudot, repliikit ja käsikirjoitukset numeroituna listana tavallisena viestinä; tagit näkyviin mukana (koko prompti). EI: tekstejä kysymyskortille.
- **Ennen kysymystä omistajalle:** onko jo päätetty (`grep -ri "<aihe>" docs/raamattu-loki`), noudattaako ehdotus tätä pohjaa ja Raamattua, ja yksi suositus ensin.

## 1. Tuotantoputki ja roolit

```
Tavoite: mallinäyte + lyhyt kuvaus (ääni) / esimerkit pelinäkymässä (uusi tekstityyppi)
  → Sisältökirjuri: teksti (hyväksytty, faktat tarkistettu)
  → Äänittäjä: lukutarkistus + ämpärin manifestin tarkistus
  → PT: merkkimäärä + ottomäärä + lupapyyntö → KK → omistajan lupa nimetylle erälle (tekstinä, ei korttia)
     (kertojaäänten pysyvä lupa: ks. kultainen polku 4)
  → Äänittäjä: otto (ElevenLabs) + mittaus
  → Gemini: sokkokuuntelu mallinäytettä vasten (ennen omistajaa)
  → ääniportti (pakollinen vaihe vie-paketti.sh:ssa)
  → ämpäri (vie-paketti.sh, ei ylikirjoita)
  → kytkentä (Pelikoodari / Linssiseppä / Projektiseppä / Natiivi-UI) + ilmoitus Äänittäjälle
  → uusi asia tai makuvalinta: omistaja kuulee mallinäytteen ja valmiin oton peräkkäin KK:n kautta
  → avoin juna (lukitus ja TestFlight vain omistajan pyynnöstä)
```

| Vaihe | Rooli | Tulos |
|---|---|---|
| 0. Tavoite | Äänittäjä (ääni), Sisältökirjuri (uusi tekstityyppi); hyväksyy PT, uudet asiat ja makuvalinnat omistaja | Mallinäyte ja lyhyt kuvaus siitä, miltä pitää kuulostaa; uudessa tekstityypissä muutama esimerkki pelinäkymässä |
| 1. Lukutarkistus | Äänittäjä + kytkijä | Selvillä, tarvitaanko tiedostoa lainkaan ja onko ääni jo ämpärissä (kultainen polku 1) |
| 2. Teksti | Sisältökirjuri (kaanon: PT) | Hyväksytty teksti, pituusbudjetin sisällä, tagit lisätty |
| 3. Lupapyyntö | PT → KK → omistaja | Sanatarkat tekstit, palvelu, leikemäärä, ottomäärä, merkkimäärä; "OMISTAJAN PÄÄTÖS klo …" |
| 4. Otto | Äänittäjä | Raaka-otot talteen, mp3, aikaleimat |
| 5. Sokkokuuntelu | Äänittäjä (Gemini) | Gemini kuunnellut oton mallinäytettä vasten; poikkeama = uusinta, joka vaatii uuden luvan |
| 6. Portti | Äänittäjä | `aaniportti.py` läpi |
| 7. Vienti | Äänittäjä | Ämpäri + `LAHTEET.md` + SHA256SUMS + manifestirivit |
| 8. Kytkentä | Kytkijä | Manifestirivit pelissä, mykistykset pois |
| 9. Omistajan kuuntelu | KK (vain uudet asiat ja makuvalinnat) | Mallinäyte ja valmis otto peräkkäin tiedostoina; palaute tekstinä |
| 10. Juna | Kytkijä → avoin juna | Automaattiset tarkistukset läpi; lukitus ja TF vain omistajan pyynnöstä |
| 11. Retrospektiivi | Äänittäjä | Kirjaus tämän pohjan opit-osioon |

Äänittäjä ei tee pelikytkentöjä eikä kirjoita tarinatekstiä. Kanavat: viestit `send_message` session id:llä
(osoitekirja), PT:lle enintään 3 riviä; yksityiskohdat tiedostoon (paketin `LAHTEET.md`, luovutus).

## 2. Kultainen polku (oletustapa)

0. **Tavoite ensin.** Ääni: mallinäyte ja lyhyt kuvaus siitä, miltä pitää kuulostaa (ikä, sävy, tempo, tunne).
   Mallinäytteeksi käy aiempi hyväksytty otto samasta tyypistä; uuden mallinäytteen tekeminen on generointia ja
   tarvitsee luvan (kohta 4). Uusi tekstityyppi: muutama esimerkki pelinäkymässä ennen koko erää. PT hyväksyy
   tavoitteen; omistajalle tuodaan vain uudet asiat ja makuvalinnat (Raamattu 4.21).
1. **Tarkista ensin, lukeeko peli tekstin jo itse ja onko ääni jo olemassa.** Jos `KortinLukija` / `Puhe.Lue` lukee
   tekstin workerin kautta (kuvaselitteet, nostokortit, lehdet, kaupunkikartan esittelyt, museon ympyrät), esiäänitystä
   ei tarvita (Raamattu 5.3). Älä valmistele tekstejä äläkä pyydä lupaa ennen kuin kytkijä on vahvistanut, että tiedosto
   todella tarvitaan. Tarkista myös ämpärin manifesti ennen lupapyyntöä: jos sama repliikki on jo ämpärissä, uutta
   ottoa ei pyydetä (opit 19.10. Olavinlinna; Louvren ympyrät 17.10.).
2. **Teksti ensin valmiiksi, ääni viimeisenä.** Kaikki korjaukset ovat ilmaisia ennen ensimmäistä generointierää ja
   maksullisia sen jälkeen (tarinakaari.md, luku 7). Auditit ja faktatarkistus tehdään tekstivaiheessa.
3. **Ruututeksti = luentateksti sanasta sanaan.** Lisätään vain tunnetagit ja kirjoitusasun sovitukset (SUURAAKKOSET
   pienennetään, luvut sanoiksi). Tagit 2–5 per luenta, alku ja loppu eri sävyssä.
4. **Lupa ennen jokaista generointia** (Raamattu 5.1 ja 5.2).
   - Uusia ääniä ei generoida ilman omistajan lupaa. Lupapyynnössä on sanatarkat tekstit, palvelu, tarkka leikemäärä,
     ottomäärä ja merkkimäärä. Määrän päättää omistaja; PT tuo pyynnön KK:lle, ja KK esittää sen omistajalle tekstinä,
     ei kortilla ("Sano ok, niin Äänittäjä tekee nämä"; Raamattu 7.27, ÄÄNISTÄ EI KORTTEJA).
   - Lupa tulee vain KK:n suoralla "OMISTAJAN PÄÄTÖS klo …" -rivillä; PT:n välittämä ei riitä, vaan Äänittäjä pyytää
     vahvistuksen KK:lta.
   - **Ottomäärä sitoo kuten merkkimäärä** (5.2, OTTOMÄÄRÄ SITOO): uusinta on uusi otto ja vaatii uuden luvan KK:n
     kautta (tekstinä), vaikka merkkejä jäisi; jäljelle jääneitä merkkejä ei käytetä. Rooli ei hyväksy uusintaa itse, vaan
     lähettää KK:lle lupapyynnön aineiston (merkit, ääni, syy). Jokainen lisäys tai ylitys vaatii uuden luvan.
   - Lupa lasketaan teksteistä; jos lupa on annettu pelkille teksteille, tageja ei lisätä (opit 20.10.).
   - **Kertojaäänten pysyvä lupa** (5.1, omistaja 12.10.2026): koskee PT:n hyväksymiä käsikirjoituksia, noin enintään
     10 000 merkkiä per kokonaisuus ja yksi otto per teksti. Äänittäjä generoi suoraan, ja PT kertoo omistajalle
     jälkikäteen yhdellä rivillä. Suuri erä vaatii omistajan sanatarkan lauseen, jossa generointi tai määrä mainitaan,
     ja se ajetaan pieninä paloina kuittauksin. Pulun repliikit ja uudet isoisän tekstit tarvitsevat ensin omistajan
     tekstihyväksynnän (`paakaupungin-avaus.md`, luku 5), joten PT ei yksin tee niistä pysyvän luvan käsikirjoitusta.
   - Vanhoja julkaistuja ottoja ei uusita eikä vaihdeta ilman omistajan päätöstä (5.6; opit 19.10.).
5. **Luvut sanoiksi ENNEN merkkimäärän laskemista.** Numerot kasvattavat tekstin pituutta puhuttuna (esim. +662 merkkiä
   yhdessä erässä), joten lupapyynnön merkkimäärä lasketaan puhutusta muodosta. Muuten lupa ylittyy ja tarvitaan uusi.
   Kustannusarvio lasketaan lähetetyistä merkeistä tageineen (5.2, KUSTANNUSARVIO).
6. **Ääni ja malli oikein.**
   - Isoisä: AINA `eleven_v3` (omistaja 14.10.), text-to-dialogue, yksi otto, loppufade 150 ms + hiljaisuus.
   - Kertoja William (`oae6GCCzwoEbfc5FHdEu`): `eleven_v4_turbo`, nopeus vain ElevenLabsin `speed`-asetuksella (ei atempoa, omistaja 19.10. klo 10.19). Pelin lukijana workerin avaimessa on
     `eleven_v4` (säilöavain sha256 `malli|ääni|ohje|teksti`).
   - Pulu (`piI8Kku0DcvcL6TTSeQt`): `eleven_v4_turbo`, stability 0,5, `language_code fi`, −17,2 LUFS (Raamattu 5.9),
     ei ffmpeg-nopeutusta (`livia-aani.md`).
   - **Muut hahmot äänipankista** (Raamattu 5.8): eri hahmo = eri ääni pankista, eikä sama ääni puhu kahta henkilöä
     samassa paikassa. Vanhalle tai uudelle hahmolle etsitään ensin sopiva pankista (esim. `mies-80-hauras-vanhus`);
     uutta ääntä ei suunnitella, jos pankista löytyy sopiva.
   - Kahden tai useamman äänen keskustelu yhtenä dialogiottona, ei repliikki kerrallaan.
   - **Kieli aina pakotettu suomeksi: pyynnön rungossa `"language_code": "fi"` JOKAISELLE äänelle (William, isoisä, Pulu).**
     Ilman sitä vieraat nimet (esim. "Louvre" ensimmäisessä lauseessa) vievät lukijan ranskaan ja suomi äännetään vieraalla
     aksentilla (omistajan havainto 17.10.2026 klo 22.54; vanhat ranska-*-skriptit). Tarkista rungosta ennen ajoa.
     Whisper-kielitunnistus ei erota aksenttia (suomi 0,99 myös aksentilliselle otolle), joten tarkistus on rungossa, ei äänessä.
   - Ei jälkisäätöjä puheeseen: nopeus, sävelkorkeus ja tunne vain ElevenLabsin omilla keinoilla (`speed`, tagit,
     äänen asetukset); tasoitus, leikkaus ja häivytys ovat sallittuja (Raamattu 5.7).
   - Raaka tallennetaan heti: uusintaa ei tehdä, jos raaka kelpaa.
7. **Ääniportti ennen vientiä** (`proto-3d/tyokalut/aaniportti.py`, ajetaan `vie-paketti.sh`:ssa automaattisesti):
   true peak enintään 0 dBTP, lyhyiden kertaäänten kovuus. Puheelle ajetaan ilman `--puhe`-valitsinta (Whisper antaa
   suomelle vääriä hylkäyksiä).
8. **Vienti uusilla nimillä.** Ämpäri ei ylikirjoita ja objektit ovat muuttumattomia. Korjaus = uusi nimi (`-v2`, `-v3`, `-b`)
   sekä täysi ajat- ja manifestirivi-tiedosto; ilmoita kytkijälle, mikä rivi vaihtuu. Kansion nimessä on `-vienti-`.
9. **Mykistys.** Kun hyväksytty tekstimuutos viedään dataan, vanha luenta merkitään `mykistetyt`-kenttään, kunnes uusi
   on generoitu ja kytketty. Peli ei koskaan soita vanhoilla sanoilla.
10. **Gemini kuuntelee sokkona ennen omistajaa** (Raamattu 5.11 ja 9.11, omistaja 19.10. klo 15.21; korvaa 11.10.
    linjauksen "kuuntelematta saa viedä"): omistaja ei ole ensimmäinen kuuntelija. Gemini vertaa jokaista puheottoa
    mallinäytteeseen sokkona (aksentti, ääneen luetut tagit, ikä, sävy). Poikkeama = uusinta ennen omistajaa, ja uusinta
    vaatii uuden luvan (kohta 4). Whisper-base/small ja Gemini paljastavat myös heikon kirjaimen (esim. "Mahesteetti").
    Whisper-vertailu (sanasuhde) on tiedoksi, ei tuomari: vieraat nimet se kirjoittaa suomalaisittain.
11. **Omistajan kuuntelu vain uusissa asioissa ja makuvalinnoissa** (Raamattu 4.21, omistaja 20.10. klo 22.53): KK
    lähettää mallinäytteen ja valmiin oton peräkkäin kuunneltaviksi tiedostoina ennen junaa, ja omistaja kommentoi
    tekstinä (äänistä ei kysymyskortteja, Raamattu 7.27). Muut erät hyväksyy PT.
12. **Juna** (Raamattu 10.2 ja 9.11): kytketty ääni menee avoimeen junaan automaattisten tarkistusten jälkeen. Lukitus ja
    TestFlight vain omistajan pyynnöstä. Ei simukuvia tavalliselle ääni- tai tekstierälle.
13. **Avaimet.** `source ~/.zshrc` samaan komentoon (ELEVEN_API_KEY); avainta ei koskaan repoon, lokiin eikä viestiin.

## 3. Valmiin määritelmä (tarkistuslista)

Paketti ei ole valmis ennen kuin kaikki kohdat täyttyvät:

- [ ] Tavoite määritelty: mallinäyte ja lyhyt kuvaus (ääni) tai esimerkit pelinäkymässä (uusi tekstityyppi); PT hyväksynyt,
      uudet asiat ja makuvalinnat omistaja.
- [ ] Varmistettu, ettei peli lue tekstiä jo workerin kautta (`KortinLukija` / `Puhe.Lue`) eikä ääni ole jo ämpärissä
      (manifesti tarkistettu ennen lupapyyntöä).
- [ ] Teksti hyväksytty ja pituusbudjetin sisällä (saapuminen ≤ 380, kohtaaminen ≤ 260, aarre ≤ 220, kohde ≤ 800 merkkiä).
- [ ] Lupa on KK:n suoralla rivillä (tai kertojaäänten pysyvä lupa pätee), ja leikemäärä, ottomäärä ja merkkimäärä
      (puhutussa muodossa) pitävät. Jokaiselle uusinnalle on oma uusi lupa.
- [ ] Luvut ja lyhenteet sanoiksi: tarkistettu 100–199 ("sata…", 104 = sataneljä), "eaa./jaa." lauseen lopussa saa pisteen,
      vuosiluvut yhteen, taivutukset oikein.
- [ ] Oikea ääni ja malli (isoisä `eleven_v3`, kertoja turbo, nopeus vain `speed`-asetuksella, Pulu oma resepti, muut
      hahmot äänipankista); kieli `fi`.
- [ ] Vieraiden nimien ääntämysvihjeet tehty (esim. `orsay-rf-2027b`); Whisper-poikkeamat luettu.
- [ ] Gemini kuunnellut jokaisen oton sokkona mallinäytettä vasten; poikkeamat uusittu (uudella luvalla) ennen omistajaa.
- [ ] Taso mitattu: kaari −14,6 LUFS, fokus −17 LUFS, Pulu −17,2 LUFS (Raamattu 5.9), muut tyypin mukaan; fade ja
      hiljainen häntä.
- [ ] Aikaleimat tehty, jos peli ajoittaa niillä (huudahdukset, tekstin eteneminen).
- [ ] Ääniportti läpi, vienti ok, `LAHTEET.md` (lisenssi ja tekijä) ja SHA256SUMS mukana.
- [ ] Manifestirivit toimitettu kytkijälle ja kytkijä kuitannut; `mykistetyt` poistettu.
- [ ] Uusi asia tai makuvalinta: omistaja kuullut mallinäytteen ja valmiin oton peräkkäin KK:n kautta ennen junaa.
- [ ] Avoimessa junassa; lukitusta eikä TestFlightiä ole tehty ilman omistajan pyyntöä; ei simukuvia ilman syytä (9.11).
- [ ] Raaka-otot talteen `_tyo/<aihe>-<pvm>`-kansioon (ei poisteta).
- [ ] Retrospektiivi kirjattu tämän pohjan opit-osioon (luku 5).

## 4. Poikkeaminen

Poikkeus kultaisesta polusta vain PT:n hyväksynnällä; poikkeama kirjataan joko uudeksi poluksi tai jätetään pois.
Vanhojen julkaistujen ottojen uusiminen tai äänen vaihto (esim. isoisän turbo-teksti uusitaan `eleven_v3`:lla) on
omistajan päätös, ja uusi otto vaatii uuden luvan (Raamattu 5.2 ja 5.6).

## 5. Opit ja retrospektiivi (kirjataan jokaisen työn lopussa)

Muoto: päivä, työ — mikä toimi, mikä hidasti, mikä muuttuu pohjassa.

*(Rivit 19.10.2026 on siirretty lokista ja muistista omistajan päätöksellä 19.10. klo 15.35. Opeista sääntöinä toimivat
kohdat on nostettu kultaiseen polkuun 20.10.2026; rivit jäävät tähän taustaksi.)*

- **20.10.2026, juoksupelin avaus (4 + 2 ottoa).** Hidasti: musiikiksi otettiin "valmiista lähteestä" Freesoundin erhu vastoin linjausta
  (omistaja: "ääni oli huono"); yhden oton "Majesteetti!" litteroitui "Mahesteetti" (heikko j), ja kahden huudon piti kuulostaa kahdelta
  ihmiseltä, vaikka kaikki otot olivat 35–45-vuotiailla äänillä. Muuttuu: musiikki aina Lyrialla (Raamattu 5.15, rajaus pohjan alussa),
  lupa lasketaan teksteistä (polku 4), eri hahmo = eri ääni äänipankista (polku 6), Whisper ja Gemini paljastavat heikon kirjaimen
  (polku 10), luvan ottomäärä on yläraja ja uusinta kuluttaa sen (polku 4; 06:n uusinta ylitti luvan, PT:n virhe). Lähde: luovutus 20.10. 17.52.
- **20.10.2026, vienti uudelle polulle.** `vie-paketti.sh` ei ylikirjoita; korvaava otto tai käsitelty versio tulee uudella nimellä
  (`-pitka`, `-v2`) ja kytkijä vaihtaa polun. Huutojen venytys on avoin omistajalle (luku 7).
- **19.10.2026, omistaja ei ensimmäinen kuuntelija (J1).** Hidasti: puheessa omistaja löysi virheet ensin (ranskan aksentti
  17.10.). Muuttuu: Gemini kuuntelee otot sokkona ennen omistajaa (polku 10). Lähde: loki "OMISTAJAN PÄÄTÖS 19.10.2026 klo 15.21".
- **19.10.2026, ei jälkisäätöjä puheeseen.** Hidasti: nopeutus ffmpeg-atempolla (17- ja 20-ääni) kuulosti omistajasta
  huonolta. Muuttuu: nopeus ja tunne vain ElevenLabsin `speed`-asetuksella (natiivisti noin 1,2:een), tageilla ja äänen
  asetuksilla; tasoitus, leikkaus ja häivytys sallittuja (polku 6). Pohjan vanhat "tempo 1,10×" -rivit korjattu (PT 19.10.); vanhat julkaistut otot eivät muutu ilman omistajan päätöstä. Lähde: loki "PAATOS 19.10.2026 klo 10.19
  (kortti)"; muisti puhe-ei-jalkisaatoja.
- **19.10.2026, äänistä ei kysymyskortteja.** Muuttuu: otot lähetetään omistajalle tiedostoina ja palaute tulee tekstinä (polku 11).
  Generointiluvan määrä, merkit ja tekstit esitetään tekstinä, ei kortilla (polku 4).
  Lähde: muisti aanet-ei-kysymyskortteja; Raamattu 7.27.
- **19.10.2026, Olavinlinnan M-osa (KK-katselmus).** Hidasti: 16 repliikkiä oli jo ämpärissä kolmena versiona, mutta lupa
  pyydettiin "ääntä ei ole" ja generoitiin silti 20 (a60da1d3c, ac29287f5). Muuttuu: ämpärin manifesti tarkistetaan ennen
  lupapyyntöä (polku 1; KK:n katselmuksen suositus, PT hyväksyi pohjaan 20.10.). Lähde: scratchpad putket-lapikaynti-20261019, ääni V5.
- **17.10.2026, Louvren alut ilman `language_code: fi`.** Hidasti: lähestymispuhe ja salien avaukset äännettiin ranskan
  aksentilla; 47 riskiottoa (24 411 mrk) jätettiin uusimatta omistajan päätöksellä ja uusittiin vain Louvren lähestymispuhe
  ja salien avaukset (louvre-inv-* ennallaan). Muuttuu: kultainen polku 6 (suomi aina pakotettuna, testi kaatuu ilman
  `fi`:tä). Lähde: loki "AANIGENEROINTI: SUOMI AINA PAKOTETTUNA; LOUVREN ALUT UUSITAAN (17.10.2026 klo 23.05)".
- **17.10.2026, maalehtierä 831 (luennat).** Hidasti: kustannusarvio 0,226 × 369 643 = ~83 500, toteutui 90 067
  (374 867 lähetettyä merkkiä). Muuttuu: arvio 0,240 kr / lähetetty merkki, `[pause]`-tagit (+8 mrk/pala) mukaan lukien.
  Lähde: muisti aanityksen-hinta-0240-tagit-mukaan.
- **28.9.2026, Pulun tagit.** Hidasti: `[softly]` kuulosti omistajasta liian surulliselta (sävel ja taso laskevat loppua
  kohti). Muuttuu: Pulun teksteissä ei `[softly]`/`[whispers]`; tilalle `[warmly]`, `[amused]`, `[mischievously]`, yksi tagi
  per virke. Lähde: muisti pulun-tagit-ei-softly.
- **17.10.2026, Louvren ympyrät.** Hidasti: tekstit ja skriptit valmisteltiin ennen kuin tiedettiin, että peli lukee ne
  suoralla lukijalla. Muuttuu: kultainen polku 1, lukutarkistus ensin.
- **17.10.2026, luvut sanoiksi.** Hidasti: merkkimäärä kasvoi puhutussa muodossa (+662), joten lupapyyntö olisi ylittynyt.
  Muuttuu: merkkimäärä lasketaan puhutusta tekstistä (kohdat 5 ja valmiin määritelmä).
- **16.10.2026, Ateena ja Ranska.** Luvut 100–199 ja "eaa." lauseen lopussa korjattiin jälkikäteen (5 uutta ottoa).
  Muuttuu: lukutarkistus on valmiin määritelmän kohta. "eaa." korvataan vain sanarajalla (`\beaa\.`), koska "makeaa."
  rikkoutui kerran.
- **16.10.2026, Ranskan 51 kertomusta.** Whisper löysi yhden nimen (Orsay), jota ääntämysvihje korjasi; faktakorjaukset
  maksoivat 6 uutta ottoa. Muuttuu: faktatarkistus ennen lupaa (kultainen polku 2).
- **15.10.2026, ISS-selitteet.** Pelin säilön avain sisältää mallin, joten vanhat xAI-ajan äänet eivät kelvanneet.
  Muuttuu: tarkista säilöavain (`malli|ääni|ohje|teksti`) ennen kuin laskee puuttuvat.
- **14.10.2026, ElevenLabs-aikaleimat.** Sopivat lauseajoitukseen, mutta eivät iskun rytmitykseen. Muuttuu: mittaa
  energia-alku, kun ajoitus on tarkka.
- **Ämpärin muuttumattomuus.** Ylikirjoitus samaan nimeen ei onnistu; korjaus aina uudella nimellä ja kytkijälle ilmoitus.

## 6. Lähteet

`docs/moduulit/tarinakaari.md` (luvut 4, 7, 8), `docs/moduulit/livia-aani.md`, `docs/moduulit/aanipohja.md`,
`docs/moduulit/tuotantopohjat/paakaupungin-avaus.md` (luku 5, hyväksyntäpolku),
Raamattu: 4.21 TUOTANTOPOHJAT, 5.1 UUSIA ÄÄNIÄ EI GENEROIDA ILMAN OMISTAJAN LUPAA, 5.2 MÄÄRÄN PÄÄTTÄÄ OMISTAJA,
5.3 LUVAN RAJAT, 5.6 ÄÄNIVALINTA, 5.7 MALLI, 5.8 ÄÄNIPANKKI, 5.9 PULUN ÄÄNI, 5.11 ÄÄNIPORTTI, 5.12 DIALOGIT YHTENÄ OTTONA,
5.15 ÄÄNET JA MUSIIKKI, 7.27 KYSYMYKSET, 9.11 OMISTAJA EI ENSIMMÄINEN TARKISTAJA, 10.2 JUNA JA YKSI JUNA;
Äänittäjän luovutukset 14.–17.10.2026 (`docs/raportit/viesti-aanittaja-luovutus-*.md`).

## 7. Omistajalle myöhemmin (avoimet)

- **Huutojen venytys jälkikäteen (atempo).** Saako huutoja venyttää jälkikäteen? Suositus: ei, koska pidempi huuto
  generoidaan suoraan ohjeella, ja se on uusi otto ja uusi lupa (Raamattu 5.7, ei jälkisäätöjä puheeseen). Tuodaan
  omistajalle ääninäytteen kanssa.
