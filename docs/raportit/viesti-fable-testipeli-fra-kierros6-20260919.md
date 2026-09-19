# Ranskan testipeli, kierros 6 (Sonnet local, 19.9.2026 klo 17.00–17.13 Suomen aikaa)

Tuotanto https://matkakirja.app/ v1956 (päivitysikkuna 17.02: Espanjan 30 hahmotelmanostoa, Astronautin kameran otsikko ja napamittari), kehittäjätila, iPhone 18 Pro -simulaattori (Safari). Omistajan lupa simulaattorin ohjaukseen ja maailma-kytkimeen annettu kortilla; kytkin oli päällä 17.00–17.02 (Bukarest → Pariisi) ja 17.05–17.07 (Pariisi → Madrid), ja kytkettiin heti pois (kuvattu ratasvalikossa). Äänet (Kertoja, Musiikki, Äänimaisema) olivat POIS koko testin ajan (mykistys tehty Sofiassa 15.07 edellisellä kierroksella ja ollut voimassa).

Kuvat: `docs/raportit/kaappaukset/ranska-testi-6-20260919/01–08-*.jpg` (8 kpl).

## Löydöstaulukko

| # | Mitä tehtiin | Odotettiin | Tapahtui | Vakavuus | Kuva |
|---|---|---|---|---|---|
| 1 | Maailma-kytkin päälle Bukarestissa, loitonnus, Pariisin pisteen napautus | Nappula siirtyy Pariisiin | Toimi (17.01). Loitonnetussa Euroopan näkymässä **mustia laattoja** (Kroatia ja Mustameri, kaksi suorakaidetta) — kirjaan. Kuvaa niistä ei ole repossa (ei kuvakaappausta ehditty tallentaa). | 1 | – |
| 2 | Ohita karttatapilla (Marseille ja Pariisi) | Ohita pysyy, kunnes luennat loppuvat tai Ohitaa painetaan | Ohita näkyi luennan alussa ja oli **eri paikassa kuin Liiku** (löydös 3 kierrokselta 5 ei toistu). Molemmilla kerroilla karttatapin kohdalla oli maastokohteen piste (Lascaux 17.10; Roquefavour 17.12), joten napautus avasi noston kortin eikä "tyhjää karttaa". Luentakortti ja Ohita katosivat, kun nostokortti tuli päälle. Sulkiessa kortin Ohita ei ollut näkyvissä. **En pysty erottamaan, päättyikö luenta itsestään (äänet pois → luenta ei kestä) vai poistiko napautus napin.** Ei toisto tyhjään kohtaan. PAATOKSET 43 kohta 10 jää siis **edelleen todistamatta laitteella**. | 2 (jää auki) | 07 |
| 3 | Astronautin kamera v1956: kaukaa, napa lähelle, kohde | Napamittari kunnossa; otsikko mahtuu | Kaukaa: pallo, NASA-pilvet, kohdepisteet (03). Lähelle zoomattu ylhäältä pohjoisnapa: **iso harmaa levy + tummansininen tausta + laattarakoja alareunassa** (04) — kuten kierroksella 5. Otsikko "Italian saapas yöllä — Italia" mahtuu kokonaan (05). Napakuva (04) EI ole korjautunut tältä osin: v1955 "pohjapallo kartan sävyyn + musta laatta -vartija" ei näy tässä kohdassa. | 2 | 03, 04, 05 |
| 4 | Ranskan nostot elävinä pisteinä (Vézelay, Biarritz) | Piste, avaus, 2 kuvaa, lähde, kysymykset | Vézelay: 2 kuvaa (kirkko, portaali), lähde ja CC-linkit, teksti 2 kappaletta, 2 kysymystä (02). Biarritz: 2 kuvaa (kallio, photochrom), lähteet oikein. Vain pikatarkistus; mitään ei jäänyt tyhjäksi. | – | 01, 02 |
| 5 | Espanja: Madrid → Ronda-nosto | Pisteet elävinä, avaus, kuvat ämpäristä | Madridin kartalla ~50 pistettä nimineen; Ronda avautuu 2 kuvalla (silta, härkätaisteluareena), lähteet CC BY 4.0 / CC BY-SA 3.0, teksti 2 kappaletta, 2 kysymystä, lähde en-Wikipedia "Ronda" 19.9.2026 (06). Ainakin Ronda toimii. Muita 29:stä en avannut. | – | 06 |
| 6 | Liftaus Marseillesta noppalla, kohteet | Kohteet ruudulla | Noppa 6, kohteet Pariisi, Alpit, Venetsia, Madrid, Barcelona renkaina ja nimineen, nappula ruudulla, kamera zoomattu ulos (v1953:n korjaus pitää). Pariisin napautus vei siirron ilman tökkimistä. | – | – |
| 7 | Bussi Madridista, Barcelonan saapuminen | Luenta | Saapumiskortti puuttui: 12 s jälkeen kartta oli jo ilman korttia. Tulkitsen: luenta ei kestä, kun äänet ovat pois. **Oletus, ei varmennettu.** | 1 | – |

## Toimii kuten pitää

- Maailma-kytkin ja ilman kytkintä testatut: kytkin PÄÄLLÄ näyttää Euroopan kaikki kaupungit (tila näkyy ratasvalikossa); kytkin POIS palauttaa kaupunkipiilotuksen (Ranskan kartalla vain Lille, Nantes, Bordeaux, Toulouse, Lyon; ei naapurimaiden kaupunkeja).
- Espanjan v1956-nostot latautuvat ämpäristä (Ronda) sekä Ranskan nostot (Vézelay, Biarritz, Lascaux).
- Päivitysikkuna v1956:sta kertoo uudet ominaisuudet oikein.
- Astronautin kameran zoom/otsikko: kaikki näkyi ja reagoi.

## Erien jakoehdotus Opukselle

1. **Ohita (PAATOKSET 43 kohta 10):** Playwright-mittaus, jossa luenta on käynnissä (audio-elementti soi), kartan napautus TYHJÄÄN kohtaan (ei pistettä) ei piilota Ohitaa; napautus pisteeseen avaa noston kortin, mutta Ohita palaa näkyviin, kun kortti suljetaan, kunnes luennat päättyvät. Kirjaa tulos Raamattuun.
2. **Astronautin kameran napa (löydös 3):** v1955:n pohjapallo/vartija-korjaus ei ulotu napa-alueen laattarakoihin — mittaa 390 px:llä napakuva (musta/tummansininen alue alle 2 % ruudusta).
3. **Mustat laatat maailmanäkymässä (löydös 1):** Kroatia ja Mustameri, dev-maailma-kytkimellä loitonnettaessa; tarkista reliefipyramidin puuttuvat laatat.
4. **Testausmenetelmä:** äänet pois -tilassa luenta ei näytä kestävän, joten Ohitan elinkaarta ei voi testata mykistettynä; mitä testaus tarvitsisi: ääni päälle (macOS MediaRemoteUI kaatuu) tai Playwrightin tekaistu audio.

Lopputila: Pariisi, Ranskan kartta, £0, Päivä 1 keskipäivä, ei noppaa ruudulla, maailma-kytkin POIS, äänet POIS (kuva 08).
