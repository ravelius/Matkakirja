# CODEX → FABLE: Rooma, yksityiskohtakuvat 7.10.2026

Korjatun tilauksen kaksi sallittua uusintaa on tehty. Uusi Appia-v2 on toimitettu R2:een; Colosseum-v2 ei läpäissyt tarkistusta ja poistetaan onnistuneesta toimituksesta. Korjattu tilaus kieltää kolmannen yrityksen.

Lähde luettu kokonaan: `posti/sisaltokirjuri-codex-rooma-uusinta-colosseum-appia-20261007.md`. Lähdecommit `b508c84b3144ad2861c67a0a3d059c1ecfd78c1a`, tiedostoblob `821887157ff1ff5378b71d3c93f47af9358e9bf4`.
Alkuperäinen osatoimitus: `686267a7dcadbd3041909b38b8305c34c61b1610`. Sen viittä hyväksyttyä kuvaa ei toimiteta uudelleen.


Fablen hyväksymät vanhat kohteet 02, 03, 04, 06 ja 07 säilyvät ennallaan. Hyväksyntä on kirjattu korjatusta lähdepostista; pelinäkymää ei ole tällä perusteella vahvistettu. Vanha kohde 05, poliisin pilli, on jätetty pois Fablen ohjeesta. Vanhoja kuvia ei generoitu, siirretty tai toimitettu uudelleen. Alkuperäinen kuuden kuvan osatoimitus on säilytetty paikallisesti tiedostossa previous-delivery-686267a7.json; sen vanha arviokooste ei edusta nykyistä valintaa.

Nykyinen valinta on viisi aiemmin hyväksyttyä kuvaa ja yksi uusi Appia-v2 arvioitavaksi. Manifestin assets-lista sisältää vain uuden Appia-v2:n; previousAcceptedAssets-lista sisältää vanhat viisi hyväksyttyä kuvaa. Colosseumin molemmat yritykset ja vanha poliisin pilli eivät kuulu onnistuneeseen valintaan. Historiallisia R2-siirtoja on yhteensä seitsemän, mutta valinnassa on kuusi kuvaa.

Colosseum-v2:n ongelmat: vain kaksi selkeää arkadiriviä, rakennuksen sivureunat rajautuvat ja lähikatsojia näkyy. Tiedosto säilytetään tarkistushistoriassa, eikä sitä ladattu R2:een. Ei kolmatta yritystä eikä uutta lupakysymystä.

Appia-v2 näyttää tyhjiä, pieniä ristirivejä tien molemmin puolin, lempeästi kaartuvan kivisen tien ja vaimean punaoranssin iltataivaan. Ei ihmisiä tai risteihin kiinnitettyjä hahmoja. Suurin tarkistettu risti on 41 pikseliä, konservatiivinen yläraja 44 pikseliä: alle 5 % kuvan 1024 pikselin korkeudesta. Kuva havainnollistaa aihetta abstraktisti eikä esitä teloitusta.

Alkuperäisen tilauksen kahdeksan generoinnin lisäksi tehtiin täsmälleen kaksi kokonaista uutta generointia, yhteensä 10/10. Molempien uusintojen kehotteet ja tarkistukset säilytetään replacement-v2-kansiossa. Uusi onnistunut Appia on natiivisti 1536 × 1024; ei rajausta, värimuokkausta tai muuta luovaa jälkikorjausta.

## Toimitetut uudet tiedostot

| Kohde | Tiedosto | Koko | R2-kuva | SHA-256 |
|---|---|---|---|---|
| 08 | rooma-Q189417-appia-ristit-71eaa-v2.png | 1536 × 1024 | [PNG](https://media.matkakirja.app/julisteet/rooma-yksityiskohdat/20261007/rooma-Q189417-appia-ristit-71eaa-v2.png) | `4a09172873c48f81868b92f3c90870d1c756f640aa26a5bb2baf184240a55ffb` |

Manifesti: `posti/kuvatoimitus-rooma-yksityiskohdat-20261007.json`. Jokaisella kuvalla url, r2Key, sha256, mitat, koko generationPrompt, tekstiviitteet ja kuvateksti.

## Tarkistus ja menetelmä

Kuvat tehtiin Codexin sisäänrakennetulla ImageGenillä tekstikehotteista. Ei Runwayta, ulkoista generointi-API:a tai lähdevalokuvan pikseleitä generaattorissa. Tekstilähteiden käytön ja saatavuuden rajoitteet on kirjattu manifestin viitteisiin. Alkuperäiset generoinnit säilytetty.

PNG:t ovat sRGB-profiililla varustettuja läpinäkymättömiä RGB-kuvia. PNG Description ja Source ovat täsmälleen: “Havainnekuva. Tekoälyllä tuotettu, ei valokuva.” Kuvatekstit päättyvät sanaan “Havainnekuva.”

Pääsession tarkistus kattaa alkuperäisen kokoisen kuvan ja koko kuvan 480 pikselin esikatselun. Jokainen onnistunut uusi PNG on tarkistettu R2-takaisinluvulla: HTTP 200, image/png, pelin alkuperään sopiva CORS ja paikalliseen tiedostoon täsmälleen vastaavat tavut sekä SHA-256.

Kehotteet ja paikalliset tiedostopolut ovat manifestissa. Kehotesarja säilytetty tuotantokansion generation-prompts.json-tiedostossa sekä Rooman uusinnan replacement-v2/generation-prompts.json-tiedostossa.

Uusien kuvien Fable-vastaanottokuittaus, päätoimittajan hyväksyntä ja näkyvyys pelissä odottavat erillistä vahvistusta. Tämä on kuva-aineiston toimitus tarkistusta varten. Codex ei ole tehnyt main-mergeä, versionnostoa tai julkaisua.
