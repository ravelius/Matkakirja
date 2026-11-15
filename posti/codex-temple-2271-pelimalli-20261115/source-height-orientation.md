# Temple #2271 — korkeuden ja ilmansuunnan rajattu lähdetarkistus

15.11.2026. Vain Temple; Turun halkaisu #2270 peruttu. Luettu aiempi lähdepaketti, H-LAHTEET osa 3, H-PAIKAT Temple-osuus ja rekisteröintivaraus. Ei Blenderiä, mallimuutoksia, generointia, Finnaa/APIa tai lähetystä.

| Asia | Ratkaisurivi | Tila |
|---|---|---|
| Korkeus | **Noin 50 m on Curzonin ilmoittama kokonaiskorkeusarvio; 39 m on hänen kerrosluettelonsa laskettu summa, ei toinen riippumaton kokonaismittaus. Ristiriita jää ratkaisematta.** | 50 m voidaan esittää vain kyseiseen lähteeseen perustuvana likiarvona; täsmällistä pelimallin pystyskaalaa tai kerrosasemointia ei vahvistettu. |
| Suunta | **Rakennuksen neliöakselien paras aiempi paikallinen arvio on noin 32°/122° ±5°, mutta portaikon ja nykyisen halkaisumallin maantieteellinen rekisteröinti jää avoimeksi.** | Arvio johdannaiskartasta, ei alkuperäislehden uusi mittaus. Nelinkertainen neliösymmetria sekä pohjien kätisyysvaraus estävät valitsemasta nykyisen mallin yaw'ta pelkän akseliluvun perusteella. |

## Korkeus: mitä alkuperäinen sivu todella sanoo

Henri de Curzon, *La Maison du Temple de Paris*, 1888, **s.116**: [sivunäkymä](https://archive.org/details/lamaisondutempl00curzgoog/page/n137/mode/1up), [alkuperäissivun JPG](https://archive.org/download/lamaisondutempl00curzgoog/page/n137.jpg). Paikallinen `sources/curzon-1888-p116.jpg` katsottu uudelleen tässä tarkistuksessa. 50 m, kerrosluvut ja 45 m kulmatornit ovat painetussa sivussa: kyse ei ole OCR:n numerovirheestä.

Luettelo on 7 + 6,5 + 6 + 4,5 + katto/ullakko pyramideineen 15 = **39 m**, kun kokonaiskorkeudeksi annetaan noin **50 m**. Teksti erottaa guette-tason [s.117](https://archive.org/details/lamaisondutempl00curzgoog/page/n138/mode/1up), mutta ei anna sille korkeutta. Neljä holvattua salia ja ullakko mainitaan jo [s.115](https://archive.org/details/lamaisondutempl00curzgoog/page/n136/mode/1up).

Alin luettelokerros on tekstin mukaan muuttunut maantasoksi maanpinnan kohoamisen vuoksi. Puuttuvaa 11 m:ä ei siis voi selittää lisäämällä erillinen pohjakerros. Välipohjien/holvien paksuus, jalusta tai guette voivat olla hypoteeseja, mutta niiden 11 m summaa ei lähde vahvista. **H-LAHTEET.md:159:n 35 m kehäkäytävä/räystäs on aiemman selvityksen päättelyä, ei Curzonin mittaluku.**

Curzonin s.115 alaviite ohjaa Bourlan 1793 leikkaukseen, jota säilytti A. Lenoir ja joka painettiin myös Chantelauze 1884:ssä. Aiempi lähdepaketti paikansi sen [kuvalaattaan 6 / n123](https://archive.org/details/louisxviisonenf00louigoog/page/n123/mode/1up), mutta skannista puuttuu itse piirros. Tässä ei löydetty uutta riippumatonta mittaa. **Nykyisen rakennekokeen 39 m eikä mahdollinen 50 m:iin skaalaus muutu tällä tarkistuksella lähdevarmaksi malligeometriaksi.**

## Suunta: akseliarvio ei vielä sido portaikkoa maailmankoordinaatteihin

`sources/H-PAIKAT.md:23–47` raportoi aiemman katuverkkosovituksen ja noin 30 pikselin tornijäljestä saadun 32°/122° ±5° akseliarvion. Se käyttää Bruno Belhosten vuoden 2022 karttaa: [tiedostosivu](https://commons.wikimedia.org/wiki/File:Paris_Verniquet_1789_color.jpg). Tiedostosivun metadata vahvistaa tämän olevan **Verniquet'n pohjalta laadittu myöhempi kartta**, tekijän oma työ; se ei ole alkuperäislehden skannaus. Aiemman sovituksen laskentaa ei ajettu uudelleen.

`H-PAIKAT.md:46–47` sitoo Petite Tourin NNE-puolelle Curzonin pohjoisseinä-maininnasta päättelemällä. Samassa selvityksessä todetaan, ettei Petite Tour erotu johdannaiskartan tornijäljestä. Curzon s.116 sijoittaa portaikon koilliseen ja s.117 lisäosan pohjoisseinään. **`sources/geometry-registration-check.md:4` kirjaa, etteivät nämä molemmat sidonnat sovi säilytettyjen huonepohjien kätisyyteen pelkällä kierrolla.** Tätä ei ratkaista peilaamalla.

Alkuperäisen Verniquet-atlaksen annettu [Gallica-tunnus btv1b53243704g](https://gallica.bnf.fr/ark:/12148/btv1b53243704g) yritettiin avata; tulos 403. Oikeaa Temple-lehteä eikä siitä saatavaa portaikon/nimettyjen sivujen orientaatiota ei varmennettu. Haun sivutuloksia ei käytetty uusina mittafaktoina. H-LAHTEET.md:172:n vanha 0°/38° vaihtoehto ei korvaa myöhempää H-PAIKAT-akseliarviota, mutta kumpikaan ei yksin ratkaise mallin nimettyjen puolien rekisteröintiä.

## Rootin synteesiä varten

Pidä näkyvästi erillään **50 m lähdearvio**, **39 m koerakenteen luettelosumma**, **32°/122° akseliarvio** ja **avoimeksi jäävä portaikon/leikkauspuolen maantieteellinen yaw**. Älä merkitse korkeus- ja suuntaporttia lähdevarmaksi tämän tarkistuksen perusteella. Mahdollinen havainnollistava sijoittelupäätös on kirjattava päätökseksi ja arvioksi, ei tutkimuksella ratkaistuksi historiaksi. Ei uusia kerroksia tai tarinallisia käyttötarkoituksia.

Tarkat tiedostot, riviviitteet, lähde-URL:t ja SHA256:t ovat `evidence.json`:ssä.

## Rootin ehdottaman teknisen toimituksen arvio

**Ehdotus on rehellinen KK:lle**, kun se nimetään seuraavasti: suhteet säilyttävä kevennetty tekninen malli, jonka kokonaiskorkeuden **nimellinen työmitta on noin 50 m** Curzonin nimenomaisen kokonaisarvion perusteella. Tämä on sijoittelua palveleva valinta ristiriitaisesta lähteestä; se ei todista kerroskorkeuksia eikä ratkaise 39/50 m ristiriitaa. Puuttuvaa 11 m kerrosta ei luoda. Maantieteellinen yaw jää lukitsematta, paikallinen leikkausnäkymä ja kätisyys säilyvät peilaamatta. Näillä merkinnöillä teknisen mallin voi toimittaa arvioitavaksi väittämättä historiatarkkuutta. Pelikäyttö ei seuraa toimituksesta automaattisesti: KK:n ja NS:n hyväksyntä jää erilliseksi portiksi.
