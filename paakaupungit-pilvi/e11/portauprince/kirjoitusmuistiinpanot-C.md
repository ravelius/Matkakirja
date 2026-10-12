# Port-au-Prince – C-kirjoitusmuistiinpanot 12.10.2026

Tilanne: rajattu A-lähdekooste ja C-tekstiluonnos kirjoitettu. Ei täyttä A-porttia, B-valintaa, riippumatonta D-tarkistusta, E/F-hyväksyntää, pelikytkentää tai julkaisua.

## Kirjoitettu

- Artikkeli: 927 merkin johdanto (9 virkettä, 2 kappaletta, 2 lihavointia) ja 848 merkin jatkoteksti (3 kappaletta).
- Kansi + ruoka-teemasivu: 4 + 4 nostoa, kaikki 497–531 merkkiä.
- Matkailijalle-osio, viisi opasjaksoa, viisi parasta-aihetta ja kolme hyvä tietää -riviä.
- Viisi lähteellistä kysymystä (tasot 1, 2, 3), kolme tietoa ja yksi erillinen minitehtävä.
- 18 kuvaroolia on olemassa, ja kaikkien `tiedosto`, `lyhyt`, `selite`, `lahde` ovat tyhjiä. Ei keksittyjä kuvaosoitteita.

## Alkuperäinen paikallinen tarkistin

`node paakaupungit-pilvi/tyokalu.mjs tarkista e11 portauprince --lyhyt`

Todellinen lopputulos: **20 virhettä, 1 varoitus, 0 kuvaa; exit 1**. Raakaloki: `valiaikainen/nopea-e11-portauprince/tarkistus-lyhyt.txt`.

- 18 virhettä: kuvaroolin `tiedosto puuttuu` (valokuva, 3 kansikuvaa, 8 nostoa, matkailijalle-kuva, 5 opasjaksoa).
- 1 virhe: `kohdekartta.rajat { pohjoinen > etela, ita > lansi }`, koska `rajat:null`.
- 1 virhe: `kohteita 0 (1–15)`.
- 1 varoitus: sääaineisto puuttuu, tarkoituksellisesti `saatiedot:null`.
- Ei artikkelin, nostojen, kysymysten, oppaan tai minitehtävän rakenne-/mittavirheitä. Tämä koneellinen tulos ei ole faktahyväksyntä.

## Lähteet ja poikkeamat

11 käytettävää lähdesivua luettiin robots-sallitusti ja tallennettiin HTML:nä/tekstinä. Aihekohtaiset WP-sivut, Wikivoyage, UNESCO Joumou soup ja FCDO Haiti travel advice. FCDO:n sivu ilmoitti tilan olevan voimassa 12.10.2026 ja kehotti välttämään kaikkea matkustamista Haitiin. Opas kertoo vaaran suoraan, ilman tapahtuma- tai osapuolikertomusta. Kulttuuriaiheet eivät ole nykyisiä käyntisuosituksia.

UM:n ensimmäinen Haiti-osoite ja WMF:n käytetty osoite palauttivat 404:n. UM:n toinen osoite palautti HTTP 200 mutta vain yleisen sivupohjan ilman Haitin tiedotteen sisältöä. Näitä ei käytetty faktatodisteina. Haku- ja SHA-todisteet ovat `hakutodisteet.json` ja `hakutodisteet-lisa.json` omassa väliaineistossa.

Tarkat perustamis-/rakennusvuodet ja väkiluvut jätetty pois. Väestöarvion kunta/seutu-ero on faktapohjassa. Trooppinen ilmasto kuvataan ilman lämpötila- tai sadelukuja. Sääaineiston 48/48-primäärivarmennus on edelleen auki; `saa.json`:ia ei muutettu.

## Avoimet portit

- D: Kairosta Haitiin päätyneen metallirakennuksen kertomukselle riippumaton uudelleenluku; kaikkien muiden väitteiden, visan ja minitehtävän tavallinen tarkistus.
- Kartta: 6–8 kelpoisen paikan kohdekohtaiset pisteet, historia/1873 ja tekijäketjut; rajausta ei ole arvattu.
- Rautatori: vanhan rungon ja nykyarkkitehdin jälleenrakennustyön oikeusraja avoin. Yksittäisiä piparkakkutaloja ei valita tarkistamatta nykytilaa ja tekijöitä.
- Kuvat: 18 roolia kuvaputkelta, jokaisen sisällön ja oikeuksien erillinen tarkistus. Tap-tap-maalauksissa voi olla suojattuja henkilöhahmoja/teoksia.
- B/D/E/F, ilmaston primääriauditointi, mahdollinen kytkentä ja julkaisu kuuluvat myöhempiin vaiheisiin.

Vain oman kaupungin kolme tuotantotiedostoa kirjoitettu. Väliaineisto ja SHA-manifesti ovat omassa NAS-polussa. Ei Git-operaatioita eikä muiden kaupunkien tai pelitiedostojen muutoksia.
