# Phnom Penh — C-tekstiluonnos 12.10.2026

Rinnakkaistehtävä 10. Luettu yhteisohje, paikallinen AGENTS/CODEX, PILVIOHJE 3/4/7/13/LISÄSÄÄNTÖ, lehtityöresepti, kaupunkilehden nimetyt mitat/kuvat/virheet sekä alueiden speksien linjaukset ja Dakar-rakenne. Ei Git-operaatioita, pelitiedostoja, uusia agentteja/sessioita eikä kuvatyötä.

## Kirjoitettu

- Kaupungin artikkeli: intro 898 merkkiä / 2 kappaletta / 8 virkettä / 2 lihavointia; teksti 817 merkkiä / 3 kappaletta.
- Kansi + `historia`-teema, neljä nostoa kummassakin. Nostot 441, 499, 493, 504, 535, 514, 486, 527 merkkiä (kaikki tavoitevälillä 440–660).
- Matkailijalle-kappale, viisi oppaan jaksoa, viisi parasta-riviä ja neljä hyvä tietää -riviä.
- Viisi kysymystä (tasot 1/2/2/3/2), kolme tietoa ja yksi teeman oma minitehtävä.
- Yksi varmennettu karttapiste, Kambodžan kansallismuseo, sekä oma kahden kappaleen nähtävyysjuttu. Kartta partial, 1/6; muiden pisteitä ei arvattu.

## Alkuperäinen paikallinen tarkistin

Ajettu NAS-kloonissa `node paakaupungit-pilvi/tyokalu.mjs tarkista e10 phnompenh --lyhyt`. Todellinen exit code **1**. Tulos **19 virhettä, 3 varoitusta, 0 kuvaa**. Todiste: `valiaikainen/nopea-e10-phnompenh/tarkistus-lyhyt.txt`.

Kaikki 19 virhettä ovat alkuperäisen tarkistimen **tiedosto puuttuu** -tyyppiä: valokuva 1, kansikuvat 3, nostot 8, matkailijalle 1, oppaan kuvat 5 ja museojutun kuva 1. Jokaisen roolin neljä kuvakenttää jätetty tietoisesti tyhjiksi omistajan uuden ohjeen mukaisesti. Tarkistinta ei muokattu eikä virheitä piilotettu. Tekstien/rakenteen virheitä ei jäänyt. Varoitusten perusteet alkuperäisestä tarkistimesta: kysymys 4:n source on aidosti väitteen tukeva Wikivoyage eikä Wikipedia; kartassa alle kuusi kohdetta; säädata puuttuu.

## Faktavalinnat ja riippumattoman tarkistuksen kohteet

Rajattu A-kooste `faktapohja.md` sisältää väite–lähde-kartan. Palatsin 1865/1866-ero yleistetty 1800-luvuksi. Kansallismuseon avaus- ja rakennusvaiheita ei niputettu yhdeksi tarkaksi vuodeksi. Napoleon-paviljongin keisarin lahja/Suezin avajaiset -tarina ja dokumentoimaton purku/uudelleenkokoaminen poistettu. Torin rakennuspaikka kosteikko, ei järvi. Tarkat määrät/vuodet, väestö, hinnat, aukioloajat ja etäisyydet jätetty pois. 1873 vain pelin vertailukehys: ei fiktiota.

D tarkistaa erityisesti kuyteav-artikkelin lisälähdetarpeen, paviljongin tilaushistorian ja museon tekijänoikeusrajan/nykyiset lisäykset ennen kuvia. Museon oma verkkosivun etusivu palautti HTTP 200 mutta pelkkää Index-sisältöä: sitä ei käytetty faktatodisteena. MRC-etusivun HTTP 200 ei myöskään todista joen yksittäistä hydrologista väitettä. Lentoaseman nimi KTI/Techo löytyy luetusta ajantasaisesta Wikivoyagesta; toimijan verkkosivun yritys epäonnistui DNS-nimiselvitykseen (URLError Errno 8), todiste haku.log:ssa, eikä yhtä nimi/IATA-tunnusta esitetä kahtena riippumattomana varmistuksena.

## Avoinna

- B: kaikki 19 kuvaroolia, ei katsottuja/valittuja kuvia eikä lähdecredittejä.
- A/kartta: vähintään viisi muuta tekijänoikeuksiltaan kelpoista kohdetta omine pisteineen ja juttuineen. Palatsin ja Ounalomin nykyvaiheiden tekijäketjut puuttuvat. Keskusmarkkinat eivät ole tämän luonnoksen kuva-/karttatilaus.
- Sää: `saatiedot:null`, yhteinen primääriauditointi puuttuu; `saa.json` koskematon.
- D/E/F, hyväksyntä, pelikytkentä ja julkaisu tekemättä. Tämä on tekstiluonnos, ei valmis kaupunki/erä.

## Tiedostot ja SHA

Omistetut tuotokset vain tässä kaupungissa: `faktapohja.md`, `sisalto.json`, tämä muistio. SHA256-kuitit ja lähde-/robots-todisteet tallennetaan omassa NAS-väliaineistossa `SHA256SUMS.txt`, `lahdetodisteet.jsonl` ja `mittaus.json`. Viimeinen kuitti tehdään lopussa tiedostojen uudelleenluennan jälkeen.


## Task118 korjaus 13.10.2026
Kaikki pelaajatekstikentät luettu ja sovellettu otoksen yleissäännöt. Lähdepohja, C-muistio sekä nykyiset Commons-lähdetiedot tarkistettu. Meta- ja täytelauseita korvattu kaupungin omilla faktoilla; vihjeet ja houkuttimet täsmennetty. Nykyiset kuvat, pisteet ja sää säilytetty; niiden puutteet ovat erillisiä portteja. Tuore mainin js/data-haku tehty ennen kirjoittamista. Ei Git, kuvia, pelikytkentää tai julkaisua.


```text
VIRHE phnompenh: kansikuva 2: tiedosto puuttuu
VIRHE phnompenh: kansikuva 3: tiedosto puuttuu
VIRHE phnompenh: kansi nosto 1: tiedosto puuttuu
VIRHE phnompenh: kansi nosto 2: tiedosto puuttuu
VIRHE phnompenh: kansi nosto 3: tiedosto puuttuu
VIRHE phnompenh: kansi nosto 4: tiedosto puuttuu
VIRHE phnompenh: matkailijalle.kuva: tiedosto puuttuu
VIRHE phnompenh: opas jakso 1: tiedosto puuttuu
VIRHE phnompenh: opas jakso 2: tiedosto puuttuu
VIRHE phnompenh: opas jakso 3: tiedosto puuttuu
VIRHE phnompenh: opas jakso 4: tiedosto puuttuu
VIRHE phnompenh: opas jakso 5: tiedosto puuttuu
VIRHE phnompenh: teemasivu historia nosto 1: tiedosto puuttuu
VIRHE phnompenh: teemasivu historia nosto 2: tiedosto puuttuu
VIRHE phnompenh: teemasivu historia nosto 3: tiedosto puuttuu
VIRHE phnompenh: teemasivu historia nosto 4: tiedosto puuttuu
VIRHE phnompenh: juttu Kambodžan kansallismuseo kuva 1: tiedosto puuttuu
== phnompenh: 17 virhettä, 4 varoitusta, 2 kuvaa
YHTEENSÄ 1 kaupunkia: 17 virhettä, 4 varoitusta
```
SHA256 7668b57324ce0350cb2a86330b0fbfff77333d2f7d9dc85083becc5a4ac18d6a

Lopullinen Task118-tarkistus: kuvatiedostot/creditit, koordinaatit, rajat, sää ja vastausindeksit täsmälleen baselinen mukaiset. Tiedostohash 197d94dcf0ee3ee1786bc36d29a4e1c3f48567fe86adf78fa2f48a8873a1cc65. Muuttuvat ohjeet keskitetty, kuvatekstitoisto ja merkistövirheet tarkistettu.

```text
VAROITUS phnompenh: kysymys 4: source ei ole Wikipedia-artikkeli
VAROITUS phnompenh: kansi nosto 1: teksti 417 mrk (440–660)
VAROITUS phnompenh: kohteita 1 (pohjataso 6; perustele RAPORTTI.md:ssä)
VAROITUS phnompenh: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
```
