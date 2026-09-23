# Natiivin linssit: inventaario ja porttaussuunnitelma

*Linssiseppä 23.9.2026. Pohjana js/linssit/* (38 tiedostoa, 31 117 riviä), js/aikajana.js,
Siirtosepän natiivi-siirtosuunnitelma (luku 3) ja Natiivisepän RAJAPINTA.md (proto-3d).*

## Tiivistelmä

- Webissä on 9 pelattavaa linssiä. Natiiviin tulee 7: **topografia, ihmisen matka,
  astronautin kamera, keksinnöt, vesistöt, vertailu ja maatiedot**. Radio jää pois
  (Fablen linjaus). Karttapallo ei ole natiivissa linssi, koska pallo on koko peli.
- Linssit piirretään natiivissa vain pallolle. Vanhaa tasokarttaa (SVG, kerros.js) ei porteta.
- Linssien sisältö on jo sisältöpaketissa (sisalto/1/v2, moduulit/js/linssit/*.json).
  Paketista puuttuvat tekstuurit ja äänet on listattu alla.
- Yhteinen runko on valmis: proto-3d haara `linssiseppa/linssirunko` (commit 5111c3b,
  testit 16/16). Siinä ovat ILinssi, ILinssiYmparisto, Linssirekisteri, Odotuspeite ja
  topografialinssin logiikka.

## Linssit porttausjärjestyksessä

| # | Linssi | Web (rivit) | Natiivi toteutus | Tarvitsee muilta | Tila |
|---|---|---|---|---|---|
| 1 | Topografia | topografia.js, -tarkennus, reliefikuva, reliefipyramidi.js (~2500) | Rasterikerros pohjan tilalle (Web Mercator XYZ). Tarkennuslaastaria ja 4k/8k-valintaa ei tarvita, koska Cesium hakee laatat tasoittain. | Karttaseppä: reliefisarja EPSG:3857 Z0–Z8. Natiiviseppä: KarttaKerrokset (LisaaRasteri, Nakyvyys, KerrosValmis, epäonnistumistapahtuma). Natiivi-UI: peite, valitsin, selite. | Logiikka valmis ja testattu. Sovitin odottaa KarttaKerroksia ja reliefisarjaa. |
| 2 | Ihmisen matka | 14 tiedostoa (~8600) + aikajana.js (6442) + aikajana-virrat*.js (~2600) + aikajana-vanat.js (1205) | Aikajanamoottori C#:na (kello, pysäkit, kamera-ajot, hyppykaari, kertomus). Värivirrat pallon pintaan ajonaikaisena tasavälisenä tekstuurina (maski + virtojen laajeneminen), vanat viivoina. | Natiiviseppä: tasavälinen ajonaikainen tekstuurikerros (Texture2D, lat/lon-kehys, alfa) laattojen päälle ja viivat (polut) pallolle. Natiivi-UI: kortti, karuselli ja Tiedeliite. Pelikoodari: äänimaisema, luenta ja pulun kysymykset. | Aikajanamoottorin kuvaus tekeillä (agentti). |
| 3 | Astronautin kamera | 7 tiedostoa (~10 600) | Oma avaruusnäkymä: reliefi vaimeana (kylläisyys 0,8), ISS-rata (inklinaatio 51,6°), tähdet, pilvikuori (1,01 × säde), 64 kohdetta ja 83 NASA-kuvaa, nimiöiden limityksen esto. | Natiiviseppä: pilvikuoren mesh ja tähtitaivas (tai lupa tehdä ne Linssit-kansioon georeferenssin alle). Siirtoseppä: pilvitekstuuri, humina ja musiikki media.json:iin. | Ei aloitettu. |
| 4 | Keksinnöt | keksinnot.js (1859) | Sama aikajanamoottori ilman virtoja: reittiviiva ja valopisteet, 26 pysäkkiä 1765–1928. | Kuten ihmisen matka, lisäksi Valokeila. | Ei aloitettu. |
| 5 | Vesistöt | vesistot.js (700) | Topografian reliefi, joet viivoina, järvet polygoneina ja enintään 20 vesinimeä. | Viivat ja polygonit pallolle (KarttaKerrokset). Vesidata (maailmankartta-maasto.js) on laudan koordinaateissa, joten se viedään asteiksi tai tuotetaan uudelleen Natural Earthista. | Ei aloitettu. |
| 6 | Vertailu | vertailu.js (70) + js/vertailu.js, maakayrat.js | Karttatila: kaupungit piiloon, maat napautettaviksi, enintään 3 maata Suomen rinnalle. | Maiden rajat pallolle ja maan napautus. Natiivi-UI: vertailukäyrät. | Ei aloitettu. |
| 7 | Maatiedot | maatiedot.js (69) | Sama karttatila, napautus avaa maalehden. | Kuten vertailu. Natiivi-UI: maalehti. | Ei aloitettu. |

## Yhteinen infra (linssien tarpeet muille)

| Tarve | Kenelle | Tila |
|---|---|---|
| KarttaKerrokset: rasteri, näkyvyys, valmis- ja epäonnistumistapahtuma | Natiiviseppä | Sovittu, "tulossa" RAJAPINTA.md:ssä |
| Tasavälinen ajonaikainen tekstuurikerros (ihmisen matkan virrat) | Natiiviseppä | Pyydetään ihmisen matkan alussa |
| Viivat ja polygonit pallolle (vanat, joet, järvet, maiden rajat) | Natiiviseppä | Reitit-viivan pohjalta; pyydetään |
| Valokeila (keksinnöt, pysäkin korostus) | Natiiviseppä | "tulossa" RAJAPINTA.md:ssä |
| Linssivalitsin, odotuspeite ja selitekortti | Natiivi-UI | Sovittu, Natiivi-UI:n erän 3 jälkeen |
| Linssien omistus (LINSSIKYNNYKSET [400, 800, 1400, 2200], PERUSLINSSIT, OPTIKON_HYVITYS 500) | Pelikoodari | Kytketään Linssirekisteri.Saatavilla-koukkuun |
| Musiikin pito, kertojan luenta ja äänimaisemat | Pelikoodari | Rajapinta ILinssiYmparisto.MusiikkiPitoon; muut sovitaan ihmisen matkan alussa |

## Paketista puuttuvat (Siirtosepän korjauslista kohta 2 vahvistaa)

- Reliefisarja Web Mercatorina (Karttaseppä, pyydetty 23.9.)
- Astronautin pilvitekstuuri (`matkakirja/linssit/pilvet-bluemarble-2048.jpg`), humina ja musiikki
- Ihmisen matkan äänimaisemien manifesti ja kertomusmanifesti (luenta)
- Maa- ja rantamaskit (ihmisen matka, astronautti): ne ovat generoituja (tools/tee-maamaski.mjs,
  tee-rantamaski.mjs), joten natiivi lukee ne samasta vientikaavasta eikä kopiona

## Avaussäännöt nyt (js/linssit/omistus.js)

Pallo on perusvaruste. Tietäjäpisterajat 400, 800, 1400 ja 2200 antavat seuraavan omistamattoman
manner: null -linssin rekisterijärjestyksessä, eli käytännössä ihmisen matka, keksinnöt, radio ja
astronautin kamera. Topografia (manner: southamerica), vertailu, maatiedot ja vesistöt ovat vain
kehittäjätilassa. **Kun radio jää pois natiivista, kolmas kynnys (1400) vapautuu.** Tämä on Fablen
päätös: mikä linssi tulee kolmannelle kynnykselle, ja saako topografia oman avausreittinsä?
