# Fablen tilanneraportti 8.9.2026 aamu (Suomen aikaa)

Sessio session_01MQjFtJfBFzXPt5QRVkmpS1 (päätoimittaja, 7.9. ilta → 8.9. aamu).
main = **v1683**. Kaikki illan ja yön julkaisut ovat mainissa; haara on nollattu.

## Julkaistu 7.9. ilta – 8.9. aamu

| versio | sisältö |
|---|---|
| v1674 | sessio 2:n lehdet: 18 kaupunkilehteä, MOZ, pienten maiden nostot; Punta Arenasin ja Méridan saapumistekstit korjattu |
| v1675 | kuusi kohtaamisen henkilövaihtoa (Leena, Sigrid, Safa, Danylo, Reetta, Marios); pulun välihuomiot; kertomus-syöte luentatyönkulkuun |
| v1676 | säärivit 65 lehtikaupungille (Lalibela puuttuu: taulukko ilman normaalikautta); kuplapinon vartiot; Raamattu-linjaukset |
| v1677 | Ihmisen matka: yksi palkki, ei karusellia, yksi kortti molemmille nostolajeille, muisti, Tiedeliitteen sisällys; **AGENTIT VAIN OPUS JA SONNET** ensimmäiselle riville, fablemax poistettu |
| v1678 | palkin napit samankorkuisiksi |
| v1679 | tarinan järjestys (Levantti ennen Blombosta, Blombos n. 100 000 v.); kaupunkipisteet piiloon linssin ajaksi |
| worker | pulun katkennut vastaus jatketaan (max_tokens 900 + jatkokutsu) |
| v1680 | vanat rannikkokaistoina, värinä ja helminauha pois |
| v1681 | karttanoston nimilapun teksti ottaa napautuksen (16 px kosketusvara) |
| v1682 | reittien päät kaupunkien pallopisteisiin (generaattori korjattu); 4 pallopistettä Wikidatan mukaan |
| v1683 | aikaselain alareunaan (yhteinen moduuli); avaruusalku: tähtitaivas, pallo tulee pimeydestä luennan aikana Afrikka keskellä |

Ihmisen matkan kertojan 22 jaksoa (Blombos uusittu) ja pulun 4 välihuomiota ovat ämpärissä.

## Päätöstä vaativa asia: laattojen uusintapoltto

Helsingin (ja 218 muun) reitin **poltettu** viivataso ämpärissä on yhä vanhalla
generaattorilla (risteys 34,7 km sisämaassa). Elävä reittikerros on jo oikein.
Korjaus näkyy vasta, kun poltetaan **uusi viivataso** (generoi-pyramidi.yml
`vain-viivataso`, versio 2026-09-07a, viivaversio esim. 2026-09-08a-viivat)
**ja pallon Mercator-sarja** (polta-macilla.yml sarjat=pallo, `--pallotunniste f
--siivoa`) sekä nostetaan js/pallo.js PALLO_LAATTATUNNISTE → 'f'. Pallon sarja on
tuntien ajo Macilla — kysyn kortilla, milloin se ajetaan.

## Odottaa omistajaa

- Laattojen uusintapoltto (yllä).
- SHN:n tikkuri (pudotetaanko yksi saaren 7 merkistä).
- Lalibelan saapumisteksti (KAARETTOMAT-listalta poisto vaatii linjauksen).
- Kohtaamiskuvat kuudelle uudelle henkilölle (kuvaputki generoi; sinä valitset).
- Ihmisen matkan 20 lisänoston kuvituskuvat tulossa kuvaputkelta (tilattu; Fable hyväksyy).

## Seuraavat työt

1. Kuvaputken toimitukset (16 kaupungin miniatyyrit ja nostot, Nuuk/Anchorage etusivut, Ihmisen matkan kuvituskuvat) → kytkentä.
2. Pulun Euroopan seuraava erä (Lontoo, Pariisi, Berliini …) omistajan palautteen jälkeen; Keksintölinssin välihuomiot.
3. Sessio 2:n jäljet: Puerto Montt+João Pessoa, São Luís+Ouro Preto, Kimberley+Managua; kuvitus Dili, Alice Springs, Iqaluit, Santa Fe.
4. Aikaselain keksintölinssiin (jos ei vielä; katso docs/moduulit/ihmisen-matka-vanat.md luku 15).
5. Ihmisen matkan avoimet: leveyskertoimien selittävä teksti pelaajalle (Fable), Tiedeliitteen alanappien pitkät ajoitukset.

## Postilaatikko

Viimeksi käsitelty kuvatoimituksen viesti: 7.9. 13:58 UTC (kaikki vastattu). Omat viestit
postilaatikossa: kaanonratkaisu, v1674/v1675-kuittaukset, tilaukset (16 kaupunkia, 20 lisänostoa), Marios.
