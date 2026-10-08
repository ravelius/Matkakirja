# CODEX → FABLE: Tower Bridge ja Christian IV:n kruunu, 8.10.2026

Kaksi jäljellä ollutta kuvaehdokasta tehty ja toimitettu R2:een. Lontoon aiempien yhdeksän kuvan lisäksi on nyt bussikuva (10 ehdokasta yhteensä); Kööpenhaminan aiempien kahden lisäksi avoin kruunu (3 ehdokasta yhteensä). Uusien kuvien vastaanotto, toimituksellinen hyväksyntä ja näkyvyys pelissä odottavat erillistä vahvistusta.

Korjattu lähde `posti/sisaltokirjuri-codex-tower-christian-historiallinen-20261008.md` luettu kokonaan. Lähdecommit `3c64c291e23040a8ef51ca68db30735d59da9331`, tiedostoblob `2e31bfaf046497e3b89dfcf24f069ee16e9aefb8`. Tämä lähde ratkaisee näiden kahden kohteen aiemmat päätöspyynnöt. Aiemmin luetut Lontoon ja Kööpenhaminan kuvasäännöt säilyvät. Ei liitteitä.

## Kaksi erillistä täydennystä

| Aiempi tehtävä | Kohde | Uusi tiedosto | R2-kuva | SHA-256 |
|---|---|---|---|---|
| #4 `lontoo-yksityiskohdat-10-20261007` | Q83125 | `lontoo-Q83125-tower-bridge-bussihyppy-1952.png` | [PNG](https://media.matkakirja.app/julisteet/lontoo-yksityiskohdat/20261008/lontoo-Q83125-tower-bridge-bussihyppy-1952.png) | `ab736d38672b0056cc830cfc333d1426df79a533a3b5c20e9d573077f9c8e9b9` |
| #6 `koopenhamina-yksityiskohdat-3-20261007` | Q206101 | `koopenhamina-Q206101-christian-iv-kruunu-1596-avoin.png` | [PNG](https://media.matkakirja.app/julisteet/koopenhamina-yksityiskohdat/20261008/koopenhamina-Q206101-christian-iv-kruunu-1596-avoin.png) | `0f7eabf423514f839667121a3364b4ba8f20524b03a6bb624895664c2afc56dd` |

Molemmat PNG:t ovat natiivisti 1536 × 1024, sRGB-profiililla varustettuja ja läpinäkymättömiä RGB-kuvia. PNG Description ja Source ovat täsmälleen “Havainnekuva. Tekoälyllä tuotettu, ei valokuva.” Kuvatekstit päättyvät sanaan “Havainnekuva.” Manifestissa ovat URL, r2Key, SHA-256, mitat, koko generationPrompt, tekstiviitteet sekä kuvakohtaiset tarkistusmerkinnät.

## Tarkistus ja arvioitavat rajoitteet

Bussikuvassa näkyvät punainen aikakauden RT-tyyppinen bussi ja ruskeat sillan metalliosat. Pohjoinen läppä nousee vain vähän ja eteläinen on lähes tasainen; ei jyrkkää lentoa tai suurta joen yli avautuvaa aukkoa. Kapea keskisauma näkyy alkuperäisen kuvan yksityiskohtaisessa tarkistuksessa ja etupyörät ovat eteläisellä puolella. Etualan kaide peittää takapyörien irtoamisen: hetkellinen ilmassakäynti ei erotu varmuudella. Tornien huiput osuvat yläreunaan tai rajautuvat sen yli. Näitä rajauksen rajoitteita ei ole korjattu uudella variantilla.

Bussikuva noudattaa tilauksen harmaata päivänvaloa. Sillan julkaisemassa aikalaislehtitekstissä tapahtuma sijoittuu iltaan, joten kuvateksti käsittelee kuvaa havainnollistuksena eikä väitä sitä tapahtumahetken arkistokuvaksi. Raon leveys ja läppien tarkat kulmat ovat kuvituksellisia, eivät mitattuja. [Tower Bridgen tapahtumahistoria](https://www.towerbridge.org.uk/stories/bus-jump), [värityksen historia](https://www.towerbridge.org.uk/stories/royal-connections-to-tower-bridge).

Kruunukuvassa on avoin kultainen kehä, erillisiä lehtimäisiä koristekärkiä, helmiä ja vaimeita jalokivisävyjä. Ei kaaria, valtakunnanomenaa, ristiä, kupua tai kangaslakkia. Kruunu on tummalla samettipatjalla lämpimässä museovalossa. Kuva rajautuu tilausta tiukemmin: kruunun leveys on noin 83 % kuvasta tilauksen noin kahden kolmasosan sijaan, mutta koko kruunu mahtuu kuvaan. Jalokivien sijoitus ja pienet reliefit ovat kuvituksellisia, eivät museoesineen mittatarkka jäljennös. [Kuninkaallisen kokoelman esinetiedot](https://denkongeligesamling.dk/en/the-collection/objects/christian-iv-s-crown/).

Molemmat alkuperäiset ja 480 pikselin esikatselut katsottu pääsessiossa. Ei luettavaa tekstiä, tunnistettavia henkilöitä, verta tai väkivaltaa. Fotorealistinen, luonnollisen valon ja vaimeiden värien mukainen ilme.

## Generoinnit ja toimitus

Täsmälleen kaksi Codexin sisäänrakennetun ImageGenin kutsua, yksi per kohde; ei Runwayta tai ulkoista generointi-API:a. Käytettiin aiemmista tilauksista jäljellä olleet generoinnit: Lontoo 9 + 1 = 10/10, Kööpenhamina 2 + 1 = 3/3. Ei lisävariantteja. Vanhoja kuvia ei generoitu, muokattu tai toimitettu uudelleen. Tekstilähteet luettu, mutta lähdevalokuvan pikseleitä ei avattu tai syötetty generaattoriin.

Alkuperäiset generoinnit säilytetty muuttumattomina. Lopullisiin tiedostoihin lisättiin vain sRGB-profiili ja pakolliset tekstimetatiedot; RGB-pikselit säilyivät samoina. Tekninen 480 pikselin pienennös ja bussin saumakohdan suurennos ovat vain tarkistusta varten. Ei luovaa jälkimuokkausta.

R2-takaisinluku molemmille: HTTP 200, image/png, pelin alkuperään sopiva CORS sekä tavuilleen ja SHA-256:ltaan sama tiedosto. Manifesti: `posti/kuvatoimitus-tower-christian-yksityiskohdat-20261008.json`. Kehotteet myös paikallisessa `output/tower-christian-yksityiskohdat-20261008/generation-prompts.json`-tiedostossa.

Aiempi yhteinen osatoimitus säilyy: `c10aa3fe55984b325d52f3bd4e766bffe1c0a335`. Sen 9 Lontoon ja 2 Kööpenhaminan kuvaa pysyvät ennallaan; tämä manifesti sisältää vain kaksi täydennystä. Praha/Wienin päätöksiä tai Euroopan 50 kohteen yleistä kuittausta ei ratkaista tällä toimituksella. Codex ei ole tehnyt main-mergeä, versionnostoa tai julkaisua.
