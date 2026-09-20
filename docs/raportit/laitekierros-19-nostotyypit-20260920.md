# Nostotyyppien kontaktiarkki — 11/11 tyyppiä, tuotanto v1980

20.9.2026 n. klo 20.40–20.51. Fablen tehtävänanto: yksi nosto per
tyyppi, pieni kortti + avattu kortti (LISÄÄ-tila), visalaatikko jos on.

## Menetelmä

- **7 luontoa lähellä kauppaa/kulttuuria (vuori, historia, ruoka,
  tekniikka, joki, kulttuuri, kauppa):** iPhone 18 Pro -simulaattori,
  Safari, tuotanto matkakirja.app, oikea kosketusnavigointi Pariisin
  ympäristössä. Kuvat `xcrun simctl io booted screenshot` (ei
  luparajoituksia, Fablen ohje).
- **4 loput (saari, järvi, meri, merenkulku):** Playwright/Chromium
  paikallista palvelinta vasten, samalla kaavalla kuin
  `tools/savukkeet/savuke-pallo-nostolaput.mjs` (paikallinen tallenne
  `localStorage`-avaimeen `matkakirja-save-v1`). Kortti avattiin
  **suoraan koodista** (`maanKohdetiedot(ui, iso)` + `avaaFokuskohde`),
  ei kosketuskoordinaateilla — HRV (Dubrovnik) antoi kolme tyyppiä
  kerralla (Hvar=saari, Plitvicen järvet=järvi, Adrianmeri=meri),
  merenkulku haettiin TUN:sta (Karthagon sotasatama) koska EGY:n ainoa
  merenkulku-nosto (Faroksen majakka) on "Kadonneet ihmeet" -tyyppi.
  **Huom:** näissä neljässä alareunan maalippu/-nimi näyttää pelaajan
  OIKEAN sijainnin (Egypti), ei nostetun kohteen maata (Kroatia/
  Tunisia) — se on tämän ohituskeinon artefakti, ei pelin virhe:
  `avaaFokuskohde` ei riipu kartan taustasta.

Kuvat: `docs/raportit/kaappaukset/nostotyypit-20260920/`
(`<tyyppi>-pieni.png`, `<tyyppi>-lisaa.png`) ja kolme koostekuvaa
`kontaktiarkki-1.png` (vuori/historia/ruoka/tekniikka),
`kontaktiarkki-2.png` (joki/kulttuuri/kauppa/saari),
`kontaktiarkki-3.png` (järvi/meri/merenkulku).

## Tyypit ja otsikot (kaikki 11 vahvistettu)

| Tyyppi | Kohde | Otsikkorivi kortissa |
| --- | --- | --- |
| vuori | Chaîne des Puys | LUONTO |
| historia | Lascaux | HISTORIA |
| ruoka | Roquefort | RUOKA JA JUOMA |
| tekniikka | Montgolfierin pallo | TEKNIIKKA |
| joki | Loire | LUONTO · JOKI |
| kulttuuri | Chenonceau | KULTTUURI |
| kauppa | Michelinin opas | KAUPPA |
| saari | Hvar | LUONTO · SAARI |
| järvi | Plitvicen järvet | LUONTO · JÄRVI |
| meri | Adrianmeri | LUONTO · MERI |
| merenkulku | Karthagon sotasatama | KADONNEET IHMEET (kts. alla) |

**Merenkulku näyttää "Kadonneet ihmeet" -otsikon, ei "Merenkulku":**
molemmat TUN/EGY:n merenkulku-nostot (Karthagon sotasatama, Faroksen
majakka) ovat ihme-tyyppisiä kohteita, joilla ihme-kategoria voittaa
näytössä pelkän `tyyppi`-kentän — sama koodi kuin muillakin ihmeillä
(js/fokusnosto-symbolit.js: "historia, kulttuuri, kauppa, kaupunki ja
hetki ovat selitevalikon omia rivejä, ja kuusi muuta... kulkevat
kartalle ryhmänsä kärkisymbolina"). En löytänyt aineistosta yhtään
merenkulku-nostoa, joka EI olisi ihme, joten en voinut vahvistaa,
näkyisikö "MERENKULKU" otsikkona jollekin muulle kohteelle — tämä ei
välttämättä ole korjattavaa, vain merkitty tänne varmuuden vuoksi.

## Oikaisu edelliseen viestiini: visalaatikko EI puutu

Sanoin aiemmin Fablelle "visalaatikkoa ei näkynyt yhdessäkään
avatusta kortista" ja pyysin Pelikoodaria selvittämään lukkoa. Tämä
oli virheellinen johtopäätös — **en vain vierittänyt korttia alas asti
iPhonella.** Kaikissa kolmessa tässä erässä avatussa LUONTO-kortissa
(saari, järvi, meri) visalaatikko ("KYSY ... PULULTA:" + kaksi
kysymysnappia) näkyi selvästi kortin alaosassa. Todennäköisesti sama
pätee Ranskan seitsemään korttiin — ei tarvitse Pelikoodarin
tutkintaa, ellei erikseen toisin osoiteta. Pahoittelut turhasta
tehtävästä.

## Sivuhavainto (ei uusi tiketti)

`merenkulku-pieni.png`: pienen kortin kuva oli tyhjä/harmaa 800 ms:n
odotuksen jälkeen (LISÄÄ-tilassa sama kuva latautui normaalisti).
Sama ilmiö nähtiin kierros 19:llä iPhonella ("Nîmesin areena") — kuva
ehti vasta LISÄÄ-tilaan mennessä. Vaikuttaa ajoitukselta (kuva
latautuu hieman kortin avautumisen jälkeen), ei rikkinäiseltä
kuvalta — molemmilla kerroilla LISÄÄ-tila näytti kuvan oikein.
