# Wilton's Music Hall: rajattu lisähaku toiselle lähteelle (15.11.2026)

Tila: vain docs, ei koodimuutoksia eikä committia. Pohja: lontoo-9-hakukierros-6-20261115.md kohta 3. Siellä kaikki väitteet olivat yhden lähteen varassa (wiltons.org.uk/heritage/history/ ja siitä riippuva Wikipedia).

## Pääsy ja robots.txt (tarkistettu ennen jokaista sivustoa, UA MatkakirjaResearch/1.0)

| Sivusto | Tulos |
|---|---|
| database.theatrestrust.org.uk (Theatres Trust -tietokanta) | EI YHDISTÄ. Kokeilin kerran uudelleen: robots.txt-pyyntö aikakatkaistiin 20 s jälkeen (IPv4 95.138.176.53:443, "Connection timed out"). Robots.txt:tä ei saatu, joten itse sivua ei avattu. Kirjattu, ei käytetty. |
| arthurlloyd.co.uk | ESTETTY. robots.txt: `User-agent: anthropic-ai` / `Disallow: /`. Sivua ei avattu, eikä estoa kierretty. Aikalaislehtilainauksia (The Era, Building News 1859) ei siis saatu tätä kautta. |
| surveyoflondon.org (UCL, Survey of London: Whitechapel) | SALLITTU. robots.txt puuttuu (404), joten rajoituksia ei ole. Käytetty: https://surveyoflondon.org/map/feature/1392/detail/ (Wilton's Music Hall, 1 Graces Alley) sekä kohteen haku rajapinnasta /map/api/features/. |
| british-history.ac.uk | Sallittu (`User-agent: *`, vain /core/ ja /profiles/ kielletty). Ei tarvittu, koska Survey of Londonin Whitechapel-teksti löytyi suoraan surveyoflondon.orgista. |

Ohjeita: avatulla Survey of London -sivulla ei ollut minulle osoitettuja ohjeita.

Lähteen luonne ja riippumattomuus: Survey of London -teksti on Survey of Londonin oma (merkintä "Contributed by Survey of London", 7.12.2018). Se nojaa arkistoihin: London Metropolitan Archives, MBW:n pöytäkirjat, Tower Hamlets Archives, The Builder, The Era, Building News 1859, Daily News 1877 ja John Earlin suojelusuunnitelma 1999. Teksti viittaa wiltons.org.uk:hon vain kahdessa alaviitteessä muiden lähteiden rinnalla (tulipalo, pelastus). Siksi lasken sen itsenäiseksi toiseksi lähteeksi. Teksti näyttää painetun Whitechapel-osan luonnokselta (siinä on kohta "see p.xx").

## Tulokset

Lähde 1 = wiltons.org.uk/heritage/history/ (+ Wikipedia), lainaukset hakukierros 6:sta. Lähde 2 = Survey of London (SoL), https://surveyoflondon.org/map/feature/1392/detail/

| Väite | Tulos | Lähteet |
|---|---|---|
| (a) John Wilton rakensi salin 1859 pubinsa (Mahogany Bar) taakse | KAKSI LÄHDETTÄ | Wilton's: "replaced it with his 'Magnificent New Music Hall' in 1859". SoL: "rebuild ambitiously in 1858–9"; "reopened in March 1859 as Wilton's Magnificent New Music Hall"; sali rakennettiin "across the gardens of 1–4 Graces Alley" (talojen taakse). Mahogany Bar: SoL "advertised the establishment as the Mahogany Bar public house" (1820-luvulta). Vivahteet: virallinen nimi oli Prince of Denmark, ja Wiltonilla oli jo 1853 pienempi konserttisali, joten vuoden 1859 sali oli uusi ja suurempi. "Rakennettiin 1858–59 / avattiin 1859" on tarkin muoto. |
| (b) Metodistit ostivat talon, ja siitä tuli lähetysasema (1888) | KAKSI LÄHDETTÄ (vuosi 1888 ja metodistien lähetys); järjestön nimi ja ostotapa eroavat | Wilton's: "In 1888 Wilton's was bought by the East London Methodist Mission". SoL: "sold in 1887 to John Watson, a Methodist preacher"; myi edelleen "London Wesleyan Methodist Mission (later the East End Mission)"; muutostyö lähetyssaliksi "in early 1888"; "generally known as the Mahogany Bar Mission". Loppu: SoL "up to 1956 when … it sold up" (sama kuin Wilton's, 1956). Kirjoitettavissa: "Vuonna 1888 talosta tuli metodistien lähetysasema (1888–1956)". Ei kirjoiteta järjestön tarkkaa nimeä "East London Methodist Mission" eikä "ostivat 1888", koska SoL:n mukaan kauppa tehtiin 1887 välikäden kautta. |
| (c) Talo pelastui purulta 1960-luvulla (purkusuunnitelmat; 1964) | KAKSI LÄHDETTÄ (purkusuunnitelmat ja pelastuminen 1960-luvulla); vuoden 1964 tapahtuman laatu eroaa | Wilton's: "early 1960s … plans for demolition"; "public meeting held in 1964 … Wilton's was spared". SoL: "Compulsory Purchase Order of 1963 included the former Wilton's Music Hall"; "A public enquiry in September 1964"; "the GLC formally decided not to demolish the building" (elokuu 1967). Vivahteet: SoL puhuu julkisesta kuulemisesta (public enquiry), ei yleisökokouksesta, eikä vuosi 1964 vielä ratkaissut asiaa (päätös olla purkamatta 1967). Turvallinen muoto: "1960-luvulla talo oli määrä purkaa, mutta kampanja pelasti sen". Myös Earlin ja Betjemanin rooli täsmää kummassakin (SoL: "Earl … led the way with Sir John Betjeman"). |
| Tulipalo 1877, uudelleenrakennus/avaus 1878 | KAKSI LÄHDETTÄ | Wilton's: "In 1877 a serious fire in the hall left just the four walls". SoL: "in August 1877 when fire broke out"; "reopening in September 1878". |
| Suojelu 1971 | EI KAHTA, RISTIRIITA | Wilton's: "grade 2* listed in 1971". SoL: "Listing followed in November 1965". En tiedä, onko kyse eri asioista (esim. ensimmäinen suojelu ja myöhempi luokan nosto), enkä arvaa. Vuotta ei kirjoiteta. Jos suojelu mainitaan, muoto on "talo suojeltiin" ilman vuotta. |

Kruunun lukuja ja Milliganin osuutta ei haettu (rajattu pois). Sivuhuomio, ei käytettäväksi: SoL mainitsee Milliganin vasta BBC2:n ohjelmassa 1970, mikä tukee hakukierros 6:n havaintoa.

## Suositus

**Ydin täyttyy (a, b, c kaikki kahdesti): KYLLÄ**, kun käytetään näitä muotoja:
- (a) "John Wilton rakensi 1858–59 Mahogany Bar -pubinsa taakse uuden music hallin, joka avattiin 1859."
- (b) "Vuonna 1888 talosta tuli metodistien lähetysasema" (ei järjestön nimeä, ei "ostivat 1888").
- (c) "1960-luvulla talo oli määrä purkaa, mutta se pelastettiin." Ei "yleisökokous 1964 pelasti": SoL:n mukaan 1964 pidettiin julkinen kuuleminen, ja purkamatta jättämisestä päätettiin vasta 1967.
- Lisäksi kirjoitettavissa: tulipalo 1877 ja avaus uudelleen 1878.
- EI kirjoiteta: suojeluvuotta 1971 (lähteet ristiriidassa: 1971 / 1965).

Lähde 2:n rajaus: Survey of London on tässä verkkosivuston teksti, ei painettu osa. Theatres Trust ja arthurlloyd.co.uk jäivät saamatta (yhteys ei auennut / robots-esto).
