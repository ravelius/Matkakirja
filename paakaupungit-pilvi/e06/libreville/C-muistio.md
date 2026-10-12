# Libreville — C-kirjoitusmuistio

SHA-256: `5882f74d38eb31a2dbb4c4c7031a43db987f5f71ab3401e776a9ba117d7591b0`.

Omistajan nimenomainen uusi ohjaus: C-tekstit ennen kuvien valmistumista, havainnekuvat erillisen kuvaputken tehtäväksi. B ei ole valmis eikä kuvia haettu/generoitu/tekaistu tässä työssä. Kaikki puuttuvat kuvaruudut ovat neljän tyhjän kentän olioita, myös oppaan viisi kuvaruutua. Tyhjät oliot eivät tarkoita kuvavaatimusten läpäisyä.

Tekstit: pääartikkeli (intro 872 / lisäteksti 893 merkkiä),8 lehtinostoa,5 opasjaksoa,5 kysymystä,3 tietoa,2 lähdepisteeseen sidottua kohdejuttua.

## Koneelliset mitat

| Nosto | Merkkejä |
|---|---:|
| Vapaus jäi kaupungin nimeen | 506 |
| Veden äärellä on monta rantaa | 492 |
| Metsä, jolla on tutkimustehtävä | 511 |
| Torin kauppa jatkuu ympärillä | 507 |
| Mangrove pitää rantaa paikallaan | 503 |
| Talvi vie kahlaajat lietteelle | 494 |
| Pongara koostuu monesta maisemasta | 498 |
| Ranta on lisääntymispaikka | 489 |

## Lähdepohja ja rajaukset

Paikalliset CODEX/PILVIOHJE C/3/4/7/13/LISÄSÄÄNTÖ, reseptin mitat, kaupunkilehden sidotut kohdat ja speksin yleissäännöt sekä Dakar-rakennemalli luettu yhteisesti. Kaupungin faktapohja0–9 ja konteksti luettu. Lähdemuistiinpanot ja A:n tallennetut alkuperäislähteet ovat lähtöaineisto; tämä ei ole riippumaton D-tarkistus.

- Omistajan C-ennen-kuvia-ohjaus: kaikki kuvaruudut tyhjinä; ei B-hyväksyntää, havainnekuvat erilliseen kuvaputkeen.
- Sää null: alkuperäinen sarja hylättiin kuukausisumman ja vuosiluvun ristiriitaan. Ei sääauditoinnin ohittamista tai saa.json-muokkausta.
- Kartalla vain kaksi kaupungin sisäistä lähdepistettä: Mont-Bouët ja Sibang. A:n estuaarin/Pointe Denisin/Akandan/Pongaran laaja retkikartta ei ole hyväksytty keskustapoikkeus, joten nämä pysyvät teksteissä ja oppaassa kartan ulkopuolella. Vähimmäiskohdemäärä jää vajaaksi.
- Mont-Bouët on fyysinen markkinapaikka; aukio-tyyppi on A:n toimituksellinen sovitus ja jää D/F-tarkistettavaksi, ei modernin rakennuksen teoshyväksyntä.
- Tarkka1849 on A:ssa kahden riippumattoman lähteen tukema. Muut historialliset vuodet/määrät vuosisadaksi tai pois; väestön eri laajuuksia ei sekoiteta ja väestöluku jätetty pelaajatekstistä pois.
- Pointe Denis vain vastaranta, ei A:n ristiriitaista itäsuuntaa. Puistojen pinta-alat ja Sibangin lajimäärät jätetty pois. Mont-Bouët:n nykyistä paikkaa ei ajoiteta1873:een.
- FCDO:n luettu yleissivu ei anna riskittömyyslupausta; UM:n palauttamaa yleissivua ei käytetty Gabonin turvallisuustodisteena. Ei nykyisiä rikos-/politiikkatarinoita.

## Kuvapuutteet

- Kolme kansikuvaa, kahdeksan nostokuvaa, matkailijapysty, oppaan vähintään kolme tuoretta kuvaa, valokuva ja jokaisen karttakohteen kuva puuttuvat.
- Viisi oppaan tyhjää kuvaruutua ylittää enintään kahden kuvattomuuden rajan sisällöllisesti, vaikka vanha kone laskee olion olemassaolon. Tätä ei kutsuta läpäisyksi.

## Alkuperäinen paikallinen tarkistin

```text
VIRHE libreville: valokuva: tiedosto puuttuu
VIRHE libreville: kansikuva 1: tiedosto puuttuu
VIRHE libreville: kansikuva 2: tiedosto puuttuu
VIRHE libreville: kansikuva 3: tiedosto puuttuu
VIRHE libreville: kansi nosto 1: tiedosto puuttuu
VIRHE libreville: kansi nosto 2: tiedosto puuttuu
VIRHE libreville: kansi nosto 3: tiedosto puuttuu
VIRHE libreville: kansi nosto 4: tiedosto puuttuu
VIRHE libreville: matkailijalle.kuva: tiedosto puuttuu
VIRHE libreville: opas jakso 1: tiedosto puuttuu
VIRHE libreville: opas jakso 2: tiedosto puuttuu
VIRHE libreville: opas jakso 3: tiedosto puuttuu
VIRHE libreville: opas jakso 4: tiedosto puuttuu
VIRHE libreville: opas jakso 5: tiedosto puuttuu
VIRHE libreville: teemasivu luonto nosto 1: tiedosto puuttuu
VIRHE libreville: teemasivu luonto nosto 2: tiedosto puuttuu
VIRHE libreville: teemasivu luonto nosto 3: tiedosto puuttuu
VIRHE libreville: teemasivu luonto nosto 4: tiedosto puuttuu
VIRHE libreville: juttu Mont-Bouët'n tori kuva 1: tiedosto puuttuu
VIRHE libreville: juttu Sibangin arboretum kuva 1: tiedosto puuttuu
== libreville: 20 virhettä, 2 varoitusta, 0 kuvaa
YHTEENSÄ 1 kaupunkia: 20 virhettä, 2 varoitusta

```

Kirjoitus tallennettu; kuva-/kartta-/sää-/D/E/F-valmius ja julkaisu erillisiä. Kuvista johtuvat konevirheet säilyvät. Ei Git-operaatioita tai A/B/D-tiedostomuutoksia.
