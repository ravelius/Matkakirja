# C — Vientiane 12.10.2026

Tila: kirjoitettu ja paikallisesti tarkistettu C-tekstiluonnos, ei valmis kokonainen kaupunki/erä, hyväksyntä, pelikytkentä tai julkaisu. Rajattu A-faktapohja kirjoitettu ennen C:tä. Alkuperäistä tarkistinta ei muokattu.

Kirjoitettu: intro 882 mrk / 2 kappaletta; artikkelin lisäteksti 892 mrk / 3 kappaletta; kansi + ruoka-teema, 8 nostoa (557, 580, 547, 480, 497, 514, 526, 541 mrk); 5 opasjaksoa; 5 kysymystä tasoilla 1/2/3; 3 tietoa; yksi karttapiste ja 963 mrk / 3 kappaleen temppelijuttu. Nimen kaksi tulkintaa, temppelin pienet kuvat, poissa oleva nimikkopatsas sekä iltatorin/ruokapöydän yksityiskohdat luetuista lähteistä.

Viimeinen alkuperäinen paikallisajo: `node paakaupungit-pilvi/tyokalu.mjs tarkista e10 vientiane --lyhyt` → exit 1, 19 virhettä, 2 varoitusta, 0 kuvaa. Kaikki 19 virhettä ovat `tiedosto puuttuu`: valokuva, 3 kansikuvaa, 4 kansinostoa, matkailijalle-kuva, 5 opasjakson kuvaa, 4 ruokanostoa ja Wat Si Saketin juttukuva. Kaikki neljä kuvakenttää jätetty tyhjäksi uuden ohjeen mukaan. Teksti- ja rakennemittavirheitä ei havaittu. Koko paikallisajon kaksi varoitusta: karttakohteita 1 (pohjataso 6) ja saatiedot puuttuu. Numeerinen hyväksyntäportti ei mene läpi.

Avoimet: täysi A-minimi, 5–7 lisäkohteen omat WP/WD-pisteet/paikkafaktat/suojaraja; B-kuvat/katselu; sää 48/48 primäärivarmennus; opastiedon ajantasaisuus ja matkustusturvallisuuden erillisauditointi; primäärilähteet sekä riippumattomat D/E/F. `saatiedot:null`; saa.json ei muokattu. Opas käsittelee päivän ja illan rytmiä ilman sääsuositusta.

Robots: tourismlaos.org kielsi molemmille agenteille haun. Sivua ei noudettu eikä käytetty. Muut kuusi HTML-lähdettä noudettu sallittu_haku.py-apurilla. Tarkat rakennusvuodet ja määrät yleistetty tai poistettu, koska kahta riippumatonta primäärivarmennusta ei ole. WP/Wikivoyage eivät automaattisesti ole toisistaan riippumattomia. Väestöluku pois alue-erojen vuoksi. Wat Si Saketin säilymisen epävarmaa syyselitystä ei käytetty; historiallinen alueen päämaja-/majoituskäyttö kerrottu ilman syyväitettä.

Suojaraja: mukana vain historiallinen Wat Si Saket yleiskohteena; pienten kuvien teoskohtaista ikää ei arvata. Haw Phra Kaewin nykyrekonstruktio, That Damin ajoittamaton stupa, Patuxai, Buddha Park ja nykyveistokset eivät kartta-/kuvavalintoja. Haw Phra Kaewista sallittu tekstihistoria; mahdollinen historiallinen PD-kuva vaatii erillisen valinnan ja tarkistuksen. That Damin naga-perinne vain selvästi merkittynä perimätietona kysymyksessä. Ei isoisän toimintaa tai tarkkaa 1873-ulkoasua. Ei Git-operaatioita, pelimuutoksia, kuvahakuja, generointia tai uusia agentteja/sessioita.

Todisteet: `valiaikainen/nopea-e10-vientiane/tarkistus-lyhyt.txt`, `tarkistus-kaikki.txt`, `tarkistus-ajot.json`, `mitat.json`, `rakennetodiste.json`, `sha256.json`, `lahdehaku-omat.jsonl`; lähde-HTML ja tekstipoiminnat samassa kansiossa.


## Task118 korjaus 13.10.2026
Kaikki pelaajatekstikentät luettu ja sovellettu otoksen yleissäännöt. Lähdepohja, C-muistio sekä nykyiset Commons-lähdetiedot tarkistettu. Meta- ja täytelauseita korvattu kaupungin omilla faktoilla; vihjeet ja houkuttimet täsmennetty. Nykyiset kuvat, pisteet ja sää säilytetty; niiden puutteet ovat erillisiä portteja. Tuore mainin js/data-haku tehty ennen kirjoittamista. Ei Git, kuvia, pelikytkentää tai julkaisua.


```text
VIRHE vientiane: kansi nosto 2: tiedosto puuttuu
VIRHE vientiane: kansi nosto 3: tiedosto puuttuu
VIRHE vientiane: matkailijalle.kuva: tiedosto puuttuu
VIRHE vientiane: opas jakso 1: tiedosto puuttuu
VIRHE vientiane: opas jakso 2: tiedosto puuttuu
VIRHE vientiane: opas jakso 3: tiedosto puuttuu
VIRHE vientiane: opas jakso 4: tiedosto puuttuu
VIRHE vientiane: opas jakso 5: tiedosto puuttuu
VIRHE vientiane: teemasivu ruoka nosto 1: tiedosto puuttuu
VIRHE vientiane: teemasivu ruoka nosto 3: tiedosto puuttuu
VIRHE vientiane: teemasivu ruoka nosto 4: tiedosto puuttuu
VIRHE vientiane: juttu Wat Si Saket kuva 1: tiedosto puuttuu
== vientiane: 12 virhettä, 2 varoitusta, 7 kuvaa
YHTEENSÄ 1 kaupunkia: 12 virhettä, 2 varoitusta
```
SHA256 04857b5a00c4fb85166e53ebca552afb1162b66a04a0ab6e77c877431e2c29ac

Lopullinen Task118-tarkistus: kuvatiedostot/creditit, koordinaatit, rajat, sää ja vastausindeksit täsmälleen baselinen mukaiset. Tiedostohash ea0d9dac107a58c9ce0c4b4374c2a3427202c2c630354226258d73a5e55e75ed. Muuttuvat ohjeet keskitetty, kuvatekstitoisto ja merkistövirheet tarkistettu.

```text
VAROITUS vientiane: kohteita 1 (pohjataso 6; perustele RAPORTTI.md:ssä)
VAROITUS vientiane: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
```
