# Ciudad de la Paz — C-lähdetäydennys 12.10.2026, sessio 14

Nykyinen tila: päätekstien C-luonnos, **8/8 nostoa ja 5/5 kirjoitettua opasjaksoa**. Kokonainen kaupunkipaketti on yhä osittainen. Työ vain e06/ciudaddelapaz-kansiossa ja NASin valiaikainen/ciudaddelapaz-taydennys/-hakemistossa. Ei Git-operaatioita, uusia agentteja, kuvahakuja, säämuutoksia, pelikytkentää tai julkaisua.

## Säilytetty osaluonnos ja muutoksen rajaus

Sessio 30:n alkuperäinen sisalto.json (6 nostoa, 3 kirjoitettua opasjaksoa), konteksti, faktapohja ja C-muistio kopioitu ennen muutoksia hakemistoon `/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/valiaikainen/ciudaddelapaz-taydennys/alkuperainen-20261012-103030/`. Kopion SHA tarkistettu lähdetiedostoa vasten. Alkuperäinen JSON-SHA `fd259f2aff651818e96dd39227eb5116c12e083280cd9ef58fd6651ea90613a3`.

Lähdehaun aikana yhteen nimiaiheen nostoon tuli ulkopuolinen sanamuotokorjaus. Tallennusvahti pysäytti lisäyksen; nykyisestä versiosta tehtiin toinen SHA-varmistettu kopio `ennen-taydennysta-20261012-103933/`, JSON-SHA `aeba6c488c750f694be5ebc00c638f0d01706214b2d1207ede2fb972097ad2e9`. Tämä korjaus säilytettiin. Molemmat lähtöversiot löytyvät muuttumattomina väliaineistosta, manifestit alkutila.json ja muutoslahtotila.json.

Lisätty vain kaksi uutta teemanostoa, teksti kahteen tyhjään opaspaikkaan ja lyhyt uusiin viranomaislähteisiin perustuva kuljetusohje matkailijalle-/Perille-teksteihin. Päivitetty toimitushuomiot. Alkuperäinen artikkeli, kuusi aiempaa nostoa, viisi kysymystä, kolme tietoa, minitehtävä, kaupungin rivi, konteksti, kartta, nähtävyysjutut, sää ja kuvat säilyvät vertailtuina välittömään muutoslähtöversioon. Ei aiempien tekstien mielivaltaista uudelleenkirjoitusta. Faktapohjaan lisätty uusi lähdeluku; aiempi A-teksti säilyy.

## Kirjoitetut lisätekstit ja lähteet

- **Nuori kaupunki saa myös yliopiston**, 500 merkkiä: AAUCA:n pääkampus, 2000-luvun institutionaalinen historia ja todelliset koulutusalat. Faktapohjan C7/C8/C9: yliopiston oma nykyinen etusivu/hakusivu sekä oma Wikipedia-artikkeli.
- **Kokouspaikka metsän keskellä**, 505 merkkiä: Grand Hotel Djiblohon kongressi-/majoituskokonaisuuden käyttötavat, kokoushuoneet, auditorio ja muunneltava juhlasali. C10/C11/C12: hotellin oma nykyinen sivusto/historia/Meetings & Events. Ei tapahtuma-, osallistuja- tai valmistumisvuosiarvauksia, superlatiiveja tai modernin sisustustaiteen kuvausta.
- **Mitä täällä syödään**, 303 merkkiä: Mariposan buffet ja à la carte, L’Incanton italialainen painotus ja LOMin afrikkalaiset maut. C10/C13, hotellin omat ravintolasivut. Rajaus hotellin ruokailupaikkoihin; ei omaa kaupunkiruokaa tai ravintolaa keksitty.
- **Opiskelu ja kokousmatka**, 354 merkkiä: todelliset koulutus-/kokouspalvelut ja järjestelyt niitä tarjoavien laitosten kautta. C7/C8/C12. Korvaa tyhjän sää-/ajankohtapaikan uudella lähteistetyllä aiheella; ei kampuskiertoa, yleisöpääsyä tai varmaa tapahtumakalenteria luvattu.
- Lyhyt kuljetusohje: C14 GOV.UK Safety and security, ennalta sovitut kuljetukset/pimeän maantiesiirtymien välttäminen. Ei nyky-/juntta-/konfliktipolitiikkaa tai rikostilastoja.

Kaikki kahdeksan lisälähdettä haettu yhteisen sallittu_haku.py:n kautta, robots sekä redirectit tarkistettu. HTML/teksti/metadata/SHA NASilla. Varsinainen sisältö luettu, ei PDF-kiertoa tai hakukatkelman käyttöä lopullisen väitteen ainoana lähteenä. Yksilähteiset luvut ja vuodet jätetty pois; 1873 vain ennestään hyväksytty pelin vertailuvuosi. Ei uutta väestölukua tai modernia kohdetta/kuvaa.

## Nykyiset määrät

Intro 758 merkkiä, jatko 811; kannessa 4 nostoa, historia-teemassa 4. Nostot 454–505 merkkiä, kaikki tavoitealueella. Opas 5 jaksoa, kaikissa teksti (229/155/154/303/354 merkkiä). Kysymykset 5, tiedot 3, minitehtävä 1. Karttapisteet 0 ja kohdejutut 0. `parasta:[]`; `hyvaTietaa`-rivejä 3. Kuvat 0; kaikkien 18 kuvaroolin tiedosto/lyhyt/selite/lahde tyhjiä. `saatiedot:null`.

Viittä itsenäistä käyntisuositusta ei vahvistettu. Samaa hotellia ei jaettu viideksi nähtävyydeksi täyttämään listaa. Uudet laitosten toimintoja kuvaavat nostot eivät hyväksy suojattuja nykyisiä rakennuksia kartta- tai kuvakohteiksi. Vierailujen nykyinen saatavuus ja matkailupalvelujen laajuus on yhä rajatusti lähteistetty.

## Alkuperäinen paikallinen tarkistin

`node paakaupungit-pilvi/tyokalu.mjs tarkista e06 ciudaddelapaz --lyhyt` ja varoitukset näyttävä paikallinen ajo, **exit 1; 21 virhettä, 2 varoitusta, 0 kuvaa**.

Virhetyypit:

- 18 × `tiedosto puuttuu` (valokuva 1, kansi 3, nostot 8, matkailijalle 1, opas 5).
- `kohdekartta.esittely puuttuu`.
- `kohdekartta.rajat { pohjoinen > etela, ita > lansi }`.
- `kohteita 0 (1–15)`.

Varoitukset: `oppaasta puuttuu matkailu { parasta, hyvaTietaa }` (Parasta-lista tyhjä; Hyvä tietää -rivit olemassa) ja `saatiedot puuttuu`. Aiemmat teemasivun nostomäärän ja kahden tyhjän opasjakson tekstivirheet poistuivat. Tarkistinta ei muutettu eikä avoimia karttavirheitä peitetty keksityllä aineistolla.

Lokit ja poistumiskoodit: valiaikainen/ciudaddelapaz-taydennys/tarkistus-lyhyt.txt, tarkistus-taysi.txt ja tarkistus-ajot.json. Muutosrajauksen vertailu ja lisäväitteiden C7–C14-sidokset muutostodiste.json. Tuotantotiedostojen lopulliset SHA-256-tunnukset SHA256SUMS.txt ja varmennus.json; varmuuskopioiden omat manifestit alkuperäisissä kansioissa.

Avoimet portit: kartan esittely/rajat/pisteet, suojattujen teosten oikeusketju, kuvaputki/B, sääauditointi (48/48 primäärivarmennus puuttuu), viisi käyntisuositusta, riippumaton D, tarvittava E ja pääsession F/hyväksyntä. Ei pelikytkentää tai julkaisua. Kahdeksan nostoa ja viisi opasjaksoa ovat nyt kirjoitettuna, mutta koko kaupunki ei ole toimitusvalmis.
