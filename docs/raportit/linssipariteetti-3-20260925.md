# Linssipariteetti, kierros 3 (25.9.2026)

*Linssiseppä (Opus). Fable kuittasi tulokset 25.9. klo 14.1x. Edellinen kierros: linssipariteetti 2 (juna/b13 93ab72f1),
luovutus viesti-linssiseppa-luovutus-20260925.md.*

## Yhteenveto

| Laite | Avoimia | Tila |
|---|---|---|
| iPhone 402 × 874 | **0** | kaikki rivit alle 16 px tai hyväksyttyjä poikkeamia |
| iPad 11" 834 × 1210 | **3** | rivit 31, 39 ja 13 Natiivi-UI:lla |
| iPhone vaaka 874 × 402 | **0** | erot johtuvat turva-alueesta ja ×-napista, Fable hyväksyi poikkeamiksi |

Lisäksi yksi pariteettirivi on ohjattu Natiivisepälle: kotimaan korostus kartalla (ks. alla).

## Ajot

Työkalu `tools/pariteetti-ajo.mjs --rivit 11,12,13,30,31,37,38,39,40,41`, web https://matkakirja.app/, siemen 5 Marseille.
Kuvat ja kontaktiarkit ovat kansiossa `proto-3d/lokit/pariteetti-ajo/`:

| Ajo | Käännös | Laitteet | Tulos |
|---|---|---|---|
| b13-linssit-3 | juna/b13 38613fdb (mukana 11 ja 41) | iPhone | SAMA 1, ERI 9, PUUTTUU 0 |
| b13-linssit-3b | juna/b13 + natiivi-ui/linssipuhelin-k3 (24ad5004) | iPhone, rivit 13, 30, 31 | korjaukset toimivat, jäljellä poikkeamat |
| b13-linssit-3c | sama 24ad5004 | iPad 11, iPhone vaaka | SAMA 2, ERI 17, PUUTTUU 1 (rivi 12 iPad: kuvattu odotuspeitteen alla, työkalu korjattu) |

Simulaattorit: linssiseppa-iPhone D0D2CD1E (myös vaaka) ja linssiseppa-iPad11 903C2B91. Vuoro sovittiin Julkaisijan ja
Pelikoodarin kanssa, enintään 2 simulaattoria kerrallaan.

## iPhone rivi riviltä

| Rivi | Ero | Tila | Peruste |
|---|---|---|---|
| 11 keksinnöt | 6 px | ok | alle rajan (avauskaaro-11 junassa) |
| 12 selite | 13 px | ok | alle rajan |
| 13 ihmisen matka | 33 px | poikkeama | aikajanan otsikko iPhonen yläpalkissa (omistajan löydös 74); virtanapit piiloon esityksen ajaksi korjattu (linssipuhelin-k3) |
| 30 topografia | 75 px | poikkeama | nimilappu ×:n vasemmalla, koska × vie tilan (löydös 32); pystysuunta korjattu (linssipuhelin-k3) |
| 31 vesistöt | 79 px | poikkeama | Liiku ja turva-alue (+38 pt), lappu pelkkä "Marseille" (löydös 73), nimilappu × (löydös 32) |
| 37 radio | 121 px | poikkeama | radiouudistus |
| 38 satelliitti | – | SAMA | |
| 39 vertailu | 8 px | ok* | *alapaneeli ja kotimaan korostus eroavat kuvassa, ks. avoimet |
| 40 karuselli | 48 px | poikkeama | aikajanan otsikko (löydös 74) ja karusellikortti +27 pt (turva-alue) |
| 41 maatiedot | 63 px | poikkeama | Liiku ja turva-alue; maa-pilleri korjattu (maapilleri-41) |

## Avoimet

| # | Laite | Rivi | Mitä | Kenelle |
|---|---|---|---|---|
| 1 | iPad | 31 vesistöt | paikkalappu jää linssin auetessa auki (Mistral-teksti ja kuvat). Webissä se kutistuu yhdelle riville "Marseille, syyskuussa 1873 🔊", ero dx +47. iPadilla lappu seuraa webiä (VainNimi koskee vain puhelinta). | Natiivi-UI |
| 2 | iPad, iPhone | 39 vertailu | webin alapaneeli on keskitetty kelluva pilleri (Suomi \| Vertaa). Natiivissa se on koko levyinen palkki, joka peittää maanimen "RANSKA / France · tasavalta v. 1873". Tekstivertailu ei huomaa tätä. | Natiivi-UI |
| 3 | iPad | 13 ihmisen matka | Tauko on 34 px oikealla. Webin palkki on pyöristetty kortti reunavaralla, natiivin palkki on reunaan kiinni. | Natiivi-UI |
| 4 | kaikki | 39 (kartta) | web korostaa kotimaata: Ranskalla on kultainen ääriviiva, ja reliefi näkyy vain Ranskassa. Natiivissa reliefi näkyy kaikkialla eikä korostusta ole. Kuvapari: `proto-3d/lokit/pariteetti-ajo/kotimaan-korostus-kuvapari-20260925.jpg` | Natiiviseppä |

## Hyväksytyt poikkeamat (Fable 25.9.)

- **iPhonen alareunan turva-alue:** Liiku +38 pt (rivit 31 ja 41) ja karusellikortti +27 pt (rivi 40). Linja on sama kuin
  Dynamic Islandin yläpalkissa.
- **Löydös 73:** iPhonen paikkalappu näyttää pelkän kaupungin nimen ("Marseille").
- **Löydös 74:** iPhonen yläpalkissa linssin nimi on saaren vasemmalla puolella, Tauko ja ☰ oikealla ja vuosiluku alla
  (rivit 13 ja 40).
- **Löydös 32:** linssin ×-nappi on natiivin oma lisäys. Nimilappu on sen vasemmalla puolella, ja auki oleva selite on
  nappirivin alla (rivit 12, 30 ja 31 kaikilla laitteilla).
- **Vaaka:** sivujen turva-alue (Dynamic Island vasemmalla) ja × siirtävät näkymiä vaakasuunnassa.
- **Radio (rivi 37):** radiouudistus (tumma pohja ja mastot).
- **iPhonen yläpalkki:** raha ja päivä ovat eri kohdassa kuin webissä (työkalun sallittu poikkeama).

## Työkalu

- #3171 (mainissa): natiivivaihe mykistää sovelluksen (`komento.txt` → `hiljaa`). Ympäristömuuttujat
  `PARITEETTI_VAAKA_UDID` ja `PARITEETTI_IPAD11_UDID` ohjaavat ajot omiin simulaattoreihin.
- Tämä PR: linssirivin kuva otetaan vasta, kun odotuspeite on laskenut (stdout `linssit: peite päälle/pois`,
  katto 16 s), kuten webin kaappauksessa. Ilman odotusta iPadin kylmä topografia (rivi 12) kuvattiin tumman peitteen alla.
  Tämä muutos jäi pois #3171:stä, koska PR mergettiin ennen viimeistä pushia.

## Opit

- **Asennus ja välitön sammutus:** kun käännöspalvelu asentaa sovelluksen ja sammuttaa simulaattorin heti perään,
  seuraava `simctl launch` voi epäonnistua ("No such process"). Korjaus: asenna uudelleen käynnissä olevaan
  simulaattoriin ja kokeile käynnistystä ennen ajoa.
- **Tekstivertailu ei riitä kaikkeen:** rivi 39 oli 8 px, mutta kuvassa alapaneeli ja kotimaan korostus eroavat. Katso
  kontaktiarkki aina, myös alle 16 px:n riveiltä.

## Seuraavaksi

Kun Natiivi-UI:n ja Natiivisepän haarat ovat valmiita, ajetaan uusinta: iPad-rivit 13, 31 ja 39 sekä rivi 39 kaikilla
laitteilla. Sen jälkeen odotetaan omistajan build 13 -löydöksiä 80–109, joista osa koskee linssejä (avaruuslinssi,
Ihmisen matka).
