# #2261: riippumaton rajattu visuaalinen QA

Katsottu `qa/01-north.png`, `06-upper-oblique-full.png` ja niiden `*-guide.png`-vastineet. Luettu `qa/opening-rays.json` ja `source-geometry.md`. Ei mallimuutosta, renderiä, generointia, uutta sovitusta tai lähetystä.

**Kokonaisarvio: FAIL. Korjausyritys ei tuota siistiä hyväksyttävää rakennemallia. STOP säilyy.**

| Kohta | Arvio | Havainto / raja |
|---|---|---|
| SW-paviljonki: kulmikas runko ja telttakatto | **PARTIAL** | Yläviistossa suoraseinäinen runko ja telttakatto säilyvät tunnistettavina. Ei selvää paluuta pyöreään tornimuotoon. Mittakaavaa,26m huippua ja liittymän eheyttä ei kuvista vahvisteta. |
| Länsipiha avoin | **PASS otospaikoissa / PARTIAL mitoissa** | Yläviistossa piha näkyy edelleen avoimena. Neljä kirjattua pystysädettä ovat esteettömiä, samoin lähteessä. Ei todista167m² pinta-alaa tai kaikkia pihan rajoja. |
| Kaksi E–W-harjaa ja siistit kattosaumat | **FAIL** | A:n kattopinta lähestyy nyt lähteen kahden harjan suuntaa, mutta kuvassa on useita toistuvia vaaleita raitoja, epäjatkuvaa liuskekuviointia ja raa'an näköisiä sahaavia/porrastuvia liitosreunoja. Pohjoisen räystään ja päätyjen leikkauksissa näkyy paljaita kolmiopintoja ja venynyttä kivitekstuuria. Nämä poikkeavat selvästi harmaaverkon rauhallisista kahdesta lappeesta. Kuvista ei päätellä raitojen täsmällistä UV-/materiaali-/topologiasyytä; näkyvä lopputulos ei ole siisti. |
| Portti läpi ja oikea visuaalinen paikka | **FAIL** | Pohjoiskuvassa vanha koristeltu kaari jää suljetuksi ja sen oikealle puolelle ilmestyy erillinen uusi leikkausaukko. Aukko, kaarikoristelu ja julkisivu eivät muodosta yhtä johdonmukaista porttia. Lisäksi kaikki6koesädettä osuvat edelleen LIGHT_A:han: Blender-Y noin-1,40…-1,88m, lähteen z→Blender-Y-käytävän3…31 eteläpuolella. Lähteessä samat6sädettä ovat esteettömät. Pelkkä leikkurin paikallinen onnistuminen ei siis avannut koko kulkureittiä. Sädeloki luettu, testiä ei uusittu. |
| NE-torni suurin/korkein pyöreä torni | **PARTIAL** | Suurin pyöreä torni on edelleen pohjoiskuvan vasemmalla ja hallitsee pieniä pyöreitä torneja.17/25m-mittoja tai kaikkia korkeussuhteita ei varmenneta kuvista. SW-paviljonki26m on lähteen korkein kokonaispiste; NE:n ei pidä olla koko rakennuksen korkein. |
| Porttitornien konsolit | **PARTIAL** | Molemmat kapenevat kannakkeet säilyvät näkyvinä ja tornit ovat ulokkeisia.5,5–7,5m korkeusalue ja yhteys nyt kahdeksi eriytyneeseen porttimuotoon eivät ole hyväksyttävästi varmennettuja. |

## C:n suunta ja liittymät

Yläviistossa C:n suorakulmainen savupiippu näkyy pitkän portinpuoleisen haaran päässä ja paviljonki lyhyen SW-haaran toisessa päässä. Tämä järjestys vastaa lähdemuistion kahta epäsymmetristä ankkuria eikä näytä aiempaa180asteen vaihtoa. **PARTIAL:** yksittäisen savupiipun tunnistus ja haarojen järjestys tukevat kätisyyttä, mutta eivät vielä vahvista C:n kaikkia siirtoja, kulmaa, katon liittymiä tai saumojen sulkeutumista.

## Rajaus ja päätös

Avoin piha ja C:n tunnistettavampi suunta ovat säilyneitä onnistumisia. Ne eivät kumoa portin sulkeutumista, kahdentunutta visuaalista porttia tai katon epäsiistejä saumoja ja pintaraidoitusta. Tämän yhden korjausyrityksen jälkeen ei merkitä rakennetta, kokoonpanoa tai peliin vientiä hyväksytyksi. Tässä QA:ssa ei ehdoteta eikä käynnistetä uutta korjaus- tai generointikierrosta.
