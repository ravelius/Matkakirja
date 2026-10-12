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
