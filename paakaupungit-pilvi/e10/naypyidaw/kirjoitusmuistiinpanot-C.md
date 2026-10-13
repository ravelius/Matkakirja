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


## Task118 korjaus 13.10.2026
Kaikki pelaajatekstikentät luettu ja sovellettu otoksen yleissäännöt. Lähdepohja, C-muistio sekä nykyiset Commons-lähdetiedot tarkistettu. Meta- ja täytelauseita korvattu kaupungin omilla faktoilla; vihjeet ja houkuttimet täsmennetty. Nykyiset kuvat, pisteet ja sää säilytetty; niiden puutteet ovat erillisiä portteja. Tuore mainin js/data-haku tehty ennen kirjoittamista. Ei Git, kuvia, pelikytkentää tai julkaisua.


```text
VIRHE naypyidaw: kansikuva 2: tiedosto puuttuu
VIRHE naypyidaw: kansikuva 3: tiedosto puuttuu
VIRHE naypyidaw: kansi nosto 2: tiedosto puuttuu
VIRHE naypyidaw: kansi nosto 3: tiedosto puuttuu
VIRHE naypyidaw: kansi nosto 4: tiedosto puuttuu
VIRHE naypyidaw: matkailijalle.kuva: tiedosto puuttuu
VIRHE naypyidaw: opas jakso 1: tiedosto puuttuu
VIRHE naypyidaw: opas jakso 2: tiedosto puuttuu
VIRHE naypyidaw: opas jakso 3: tiedosto puuttuu
VIRHE naypyidaw: opas jakso 4: tiedosto puuttuu
VIRHE naypyidaw: opas jakso 5: tiedosto puuttuu
VIRHE naypyidaw: teemasivu tiede nosto 1: tiedosto puuttuu
VIRHE naypyidaw: teemasivu tiede nosto 2: tiedosto puuttuu
VIRHE naypyidaw: teemasivu tiede nosto 3: tiedosto puuttuu
VIRHE naypyidaw: teemasivu tiede nosto 4: tiedosto puuttuu
VIRHE naypyidaw: juttu National Herbal Park kuva 1: tiedosto puuttuu
== naypyidaw: 16 virhettä, 2 varoitusta, 3 kuvaa
YHTEENSÄ 1 kaupunkia: 16 virhettä, 2 varoitusta
```
SHA256 8ed706527d140d7fc71bb48a88034f3c3b2d28933f5502baa7a52e6b326e0d70

Lopullinen Task118-tarkistus: kuvatiedostot/creditit, koordinaatit, rajat, sää ja vastausindeksit täsmälleen baselinen mukaiset. Tiedostohash a059f2eb68bb70c2baa07177e943a009e084bd0a3c92062b7787a226dc669d8f. Muuttuvat ohjeet keskitetty, kuvatekstitoisto ja merkistövirheet tarkistettu.

```text
VAROITUS naypyidaw: kohteita 1 (pohjataso 6; perustele RAPORTTI.md:ssä)
VAROITUS naypyidaw: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
```
