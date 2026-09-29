# Linnanrakentajan äänitilaus, erä 3 (Olavinlinna: 7 uutta tilaa), 29.9.2026

Pelikoodarille suoraan (sama käytäntö kuin keittiön tilauksessa `linnanrakentaja-tilaukset-aanet-faktat-20260929.md`).
Speksi: pelin repon `docs/raportit/dioraama-rajapinnat-era3-20260929.md` (haara `linnanrakentaja-linna-3`).
Tyyli ja tekniikka kuten keittiön 31 ääntä: ElevenLabs Sound Effects (CC0, oma tuotanto) ja Text-to-Speech,
mp3, silmukat saumattomia (8–30 s). **mp3:t eivät tule repoon**: toimitus kansioon `dioraama/olavinlinna/aanet/<id>.mp3`
(Julkaisija vie ämpäriin polkuun `dioraama/olavinlinna/aanet/v1/`) ja kestot taulukkona id → kesto_s.
Olemassa olevia (linna-tuuli, jarvi-laineet, lokit, kellot-kaukaa, askel-kivi, askel-puu, ovi-puu) käytetään uudelleen.

## A. Äänitehosteet (voi tehdä heti)

| id | laji | kuvaus |
|---|---|---|
| `laituri-laineet` | silmukka | laineet loiskivat puupaaluja ja veneen kylkeä vasten, vene narisee kevyesti |
| `airot` | kerta | 2–3 airovetoa, loiske |
| `koysi-narina` | kerta | köysi narisee paalua vasten |
| `vartiotupa-ambienssi` | silmukka | pieni tulisija rätisee, kaksi miestä juttelee hiljaa (ei erottuvia sanoja) |
| `noppa-1`, `noppa-2` | kerta | nopat heitetään puupöydälle |
| `keihas-kolahdus` | kerta | keihään puuvarsi kopsahtaa kivilattiaan |
| `fatabuuri-ambienssi` | silmukka | viileä kiviholvi, hiljainen huonesävy, kaukainen tippuminen |
| `tippa` | kerta | yksittäinen vesipisara kaikuvassa holvissa |
| `tynnyri-kansi` | kerta | puinen tynnyrinkansi lasketaan paikalleen |
| `sakki-lasku` | kerta | raskas viljasäkki lasketaan kivilattialle |
| `porras-kaiku` | silmukka | ontto kiviportaikko, heikko tuuli ampumaraoista |
| `askel-porras-1`, `askel-porras-2` | kerta | askeleet nousevat kiviportaita, kaiku |
| `muuri-tuuli` | silmukka | kova tuuli muurinharjalla, lippu lepattaa |
| `kappeli-ambienssi` | silmukka | hiljainen kivikappeli, pitkä kaiku, kynttilän hiljainen ritinä |
| `laulu-kaukaa` | kerta 6–10 s | kaukainen latinankielinen gregoriaaninen laulu (ei selviä sanoja) |
| `kello-kappeli` | kerta | pieni kappelin kello, 3 lyöntiä |
| `sivu-kaanto` | kerta | pergamenttisivu kääntyy |
| `keskushalli-ambienssi` | silmukka | iso sali, monen ihmisen syömisen sorina (ei sanoja), penkit narisevat |
| `takka-ratina` | silmukka | suuri avotakka |
| `pikari-1`, `pikari-2` | kerta | puu- ja tinapikarit kolahtavat |
| `penkki` | kerta | penkki raapii lattiaa |

## B. Taulujen puhe (Pulu, eleven_v4, Pulun ääni; voi tehdä heti — Sisältökirjuri tarkisti faktat 29.9.)

Tagisääntö: ei [softly]/[whispers], yksi tunnetagi virkettä kohden. Äänen id = datan id.

| id | teksti |
|---|---|
| `laituri-kohta-0` | Riihisaarta sanottiin 1550-luvulla Kavassisaareksi; linnan kavassisatama oli sen tuntumassa. |
| `laituri-kohta-1` | Linnalla oli 1550-luvulla peräti yhdeksän suurta kuljetusvenettä, kavassia. |
| `laituri-kohta-2` | Rakennusaikana proomuja suojasi 12–15 haarniskaan ja miekkoihin varustautunutta miestä. |
| `vartiotupa-kohta-0` | Linnasta vartioitiin kriisin aikana saarilla: Vahtisaari ja Vartijasaari valvoivat reittejä. |
| `vartiotupa-kohta-1` | Hämeen linnan palvelusväkeen kuului portinvartija, joka vahti ulkoporttia ja päästi väkeä sisään. |
| `vartiotupa-kohta-2` | Keskushallin alakerran väentupa oli sotaväen ruoka- ja oleskelutila – lähin dokumentoitu vartiotupa. |
| `fatabuuri-kohta-0` | Fatabuuri on suojainen, vaikeapääsyinen varastotila, jonka holvikatto näyttää muurareiden taidon. |
| `fatabuuri-kohta-1` | Kalaa syötiin katolisen paaston vuoksi 229 päivänä vuodessa – suolakala tarvitsi varastotilaa. |
| `fatabuuri-kohta-2` | Hämeen linnassa fatabuuria hoiti naispuolinen fatabuurinhoitaja, joka vastasi ruokavarastosta. |
| `kierreportaat-kohta-0` | Kellotornissa oli viisi kerrosta; ylin asuttu oli kolmas, neljäs avoin puolustuskäytävä. |
| `kierreportaat-kohta-1` | Kapeat kierreportaat suosivat oikeakätistä puolustajaa hyökkääjää vastaan. |
| `kierreportaat-kohta-2` | Kehämuurit ja esilinnan muurit kohosivat 13 metrin korkeuteen. |
| `muurinharja-kohta-0` | Tornin neljännessä kerroksessa oli avoin puolustuskäytävä, ylhäällä muurin harjalla. |
| `muurinharja-kohta-1` | Ennen tuliaseita linnaa puolustettiin nuolilta, kivenheitolta ja piiritysportailta – harja ratkaisi. |
| `muurinharja-kohta-2` | Vuonna 1495 vouti Kylliäinen torjui hyökkäyksen 150 miehen ja talonpojan voimin. |
| `kappeli-kohta-0` | Kappeli mainitaan jo 1499; seinää kiertää 12 vihkimisristiä, apostolien merkkinä. |
| `kappeli-kohta-1` | Viereisestä hagioskooppikammiosta rikolliset ja sairaat seurasivat messua pienestä aukosta. |
| `kappeli-kohta-2` | Holvikaton maalauksista näkyy vielä lehti- ja kukka-aiheita sekä vaakunoita. |
| `keskushalli-kohta-0` | Keskushallin alakerrassa oli väentupa, sotaväen ruokasali; toisessa kerroksessa voudin asunto. |
| `keskushalli-kohta-1` | Vouti ja seurue söivät ylhäällä Kuninkaan salissa, sotilaat ja käsityöläiset Linnantuvassa. |
| `keskushalli-kohta-2` | Linnaa lämmitettiin avotakoin; keittiön lämmin ilma nousi hormia pitkin Kuninkaan saliin. |

## C. Repliikit ja Pulun reaktiot (myöhemmin)

Tulevat erä 3:n tilatiedostoista, kun Sisältökirjuri on tarkistanut ne (noin 7 × 3 repliikkiä + reaktiot, 10 uutta
puhujaa: vartija, portinvartija, kirjuri, fatabuurinhoitaja, tynnyrintekijä, kappalainen, vouti, soutaja, renki,
talonpoika). Lähetän erillisen listan.
