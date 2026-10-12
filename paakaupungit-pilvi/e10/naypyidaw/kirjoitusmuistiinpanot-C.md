# Naypyidaw — C 12.10.2026

C-tekstiluonnos kirjoitettu oman rajatun A-lähdekoosteen perusteella, Dakar-rakenteella. Ei kokonainen A: kartta partial. B/D/E/F, hyväksyntä, pelikytkentä ja julkaisu avoinna.

## Järjestysportti

Naypyidawin C aloitettiin vasta 12.10.2026 klo 10.10 jälkeen, kun kaikkien viiden tavallisen e10-kaupungin `sisalto.json`, `kirjoitusmuistiinpanot-C.md` ja tilatut tekstiosiot olivat paikallaan. Varmennetut kaupungit: male, vientiane, phnompenh, kualalumpur, bandarseribegawan. Jokaisella artikkelin molemmat tekstit, 8 nostoa, 5 opasjaksoa, 5 kysymystä ja 3 tietoa. Todiste `valiaikainen/nopea-e10-naypyidaw/jarjestysportti.json`, passed true. Tämä osoittaa järjestyksen, ei muiden kaupunkien faktahyväksyntää. Kuvia/D/E/F:ää ei odotettu.

## Kirjoitettu

- Artikkeli: intro 1008 merkkiä, 9 virkettä / 2 kappaletta / 2 lihavointia; lisäteksti 867 merkkiä / 3 kappaletta.
- Kansi 4 nostoa ja tiede 4 nostoa: 524, 527, 531, 514 / 525, 528, 521, 532 merkkiä.
- Matkailijan kappale ja viisiosainen opas; 5 parasta-riviä, 4 hyvä tietää -riviä.
- 5 kysymystä (tasot 1/2/3), 3 tietoa ja teemasivun minitehtävä.
- Kohdejuttu National Herbal Park: 710 merkkiä, 2 kappaletta.

## Koneajo

`node paakaupungit-pilvi/tyokalu.mjs tarkista e10 naypyidaw --lyhyt`

Todellinen exit 1: **19 virhettä, 2 varoitusta**. Kaikki virheet ovat `tiedosto puuttuu`: valokuva 1, kansikuvat 3, kansinostot 4, matkailijalle 1, opasjaksot 5, teemanostot 4, kohdekuva 1. Kaikkien kuvaroolien neljä kenttää ovat tyhjiä uuden työnjaon mukaan. Tavallinen paikallinen tarkistin näyttää varoitukset `kohteita 1 (pohjataso 6)` ja `saatiedot puuttuu`. Teksti-/rakennevirheitä ei jäänyt koneajossa. Tarkistinta ei muutettu. Ei --verkko-kuvakierrosta, kuvia 0. D:n faktantarkistus on tekemättä.

Todisteet: `tarkistus-lyhyt.txt`, `tarkistus-lyhyt-exit.json`, `tarkistus-kaikki.txt`, `tarkistus-kaikki-exit.json`, lähteet ja SHA `valiaikainen/nopea-e10-naypyidaw/`.

## Faktat ja rajaukset

Ei nyky-/juntta-/konfliktipolitiikkaa, sotilaskohteita, siirron syitä tai motiiviarvauksia. Hallinnollinen pääkaupunkiasema neutraalisti. Opas sanoo matkailun nykyisen turvattomuuden lyhyesti, ilman politiikan selostusta, 12.10.2026 luetun UM-tiedotteen turvallisuustason perusteella. Museon osittaista uudelleenavausta tukee 12.3.2026 MDN-artikkeli; lokakuun palvelutilannetta ei luvata. Numeerisia säälukuja, hintoja ja aukioloaikoja ei ole.

Kontekstin väkiluku koskee liittoaluetta: ei kaupungin asukas- eikä pinta-alalukua C:hen. Rakennus-/siirtovuodet, laji- ja kasvimäärät sekä etäisyydet jätetty pois tai yleistetty vuosisadalle. Vuosi 1873 on tilauksen yhteinen kehys: nykyistä kaupunkia ja kasvipuistoa ei ollut. Ei isoisän tekemisiä eikä reittiä.

Museon fossiilit ja Pyu-kaupunkien aineisto on erotettu pääkaupungin paikallisista löydöistä. Ihmisalkuperän lähteetön superlatiivi W2:ssa hylätty. Minitehtävä koskee esihistorian välineiden materiaaleja, ei mitään viidestä tietovisakysymyksestä. Myanmarin maalehden teematarinoita ei toisteta.

## Avoimet portit

- Kartta 1/6, yksi oman WP-pisteen kasvipuisto. Modernin arkkitehtuurin, pagodien, patsaiden, museo-/asemarakennusten ja valoteosten oikeusporttia ei ole osoitettu. Museon modernit pienoismallit/replikat eivät ole kuva- tai kohdeaiheita ilman oikeusauditointia. Järvipatoja ei piiloteta luontokohteen nimen taakse.
- Kaikki 19 kuvaroolia odottavat kuvaputkea. Ei kuvahakua/generointia.
- `saatiedot:null`: 48/48 primääriauditointi avoin; ei saa.json:n muokkausta.
- D/E/F ja toimituksellinen hyväksyntä. Ajantasaiset liikenne- ja vierailupalvelut.

Lähdepoikkeamat: väärä UM-osoite 404 → oikea sallittu osoite onnistui; myanmar.gov.mm:n robots SSL-varmennevirhe → ei sivuhakua eikä käyttöä; museon lyhyt WP-osoite palautti kanonisen artikkelin, nimi kirjattu lähdekoosteeseen. Ei robotseja tai varmenteita ohitettu. Ei Git-operaatioita eikä pelitiedostojen muutoksia.
