# Kreikan virtuaalikierrokset — kartoitus pelin multimedia-merkkejä varten

Tarkistettu 26.8.2026. Kaikki otsakkeet mitattu `curl -sSI` (Chrome-UA) HTTPS-proxyn
läpi. Repoon ei koskettu.

---

## 1. TÄRKEIN LÖYDÖS: acropolisvirtualtour.gr:n oikea avaustapa on LINKKI, ei iframe

Pelissä on nyt iframe-yritys + linkkivarareitti. **Varareitin pitää olla pääreitti.**

**Tekninen tarkistus (sallii):**

```
curl -sSI https://www.acropolisvirtualtour.gr/
HTTP/2 200 ... server: cloudflare
→ X-Frame-Options:            EI OTSAKETTA
→ Content-Security-Policy:    EI OTSAKETTA
→ <meta http-equiv="CSP">:    ei HTML:ssä
```

Eli **teknisesti upotus onnistuisi** — koodin kommentti js/fokuskohteet.js:ssä
pitää tältä osin paikkansa.

**Luvallisuustarkistus (ESTÄÄ):** sivusto on Ακρόπολης-αναστήλωσης-yksikön
(YSMA, Υπηρεσία Συντήρησης Μνημείων Ακρόπολης) sovellus. YSMA on Kreikan
kulttuuriministeriön (ΥΠΠΟΑ) yksikkö, ja www.ysma.gr linkittää sovellukseen
osoitteessa https://acropolisvirtualtour.gr/. YSMA:n/ΥΠΠΟΑ:n käyttöehdot
(https://www.ysma.gr/wp-content/uploads/2022/03/OROIXRHSHS_YSMA.pdf, kohta 8
"Υπερσυνδέσεις προς τον Δικτυακό Τόπο") sanovat sanatarkasti:

> «Το ΥΠΠΟΑ ενθαρρύνει τους χρήστες στη δημιουργία υπερσυνδέσεων προς το
> διαδικτυακό του τόπο www.ysma.gr και οι χρήστες δεν υποχρεούνται να ζητούν
> την άδεια του ΥΠΠΟΑ για να δημιουργήσουν τέτοιες συνδέσεις. **Ωστόσο, δεν
> επιτρέπεται να φορτώνονται σελίδες του ΥΠΠΟΑ μέσα σε πλαίσια (frames) άλλων
> δικτυακών τόπων. Κάθε ιστοσελίδα του ΥΠΠΟΑ στην οποία αναφέρεται
> υπερσύνδεση άλλου δικτυακού τόπου, θα πρέπει να φορτώνει στο δικό της
> παράθυρο.**»

Suomeksi: *"Kulttuuriministeriö kannustaa käyttäjiä tekemään linkkejä
sivustolleen eikä lupaa tarvitse pyytää. **Ministeriön sivuja ei kuitenkaan saa
ladata muiden sivustojen kehyksiin (frames). Jokaisen ministeriön sivun, johon
toiselta sivustolta linkitetään, on latauduttava omaan ikkunaansa.**"*

Sama ehtoteksti on ΥΠΠΟΑ:n yleisboilerplate, joka koskee ehtojen oman
sanamuodon mukaan ministeriön "διάφορους ψηφιακούς κόμβους" (eri digitaalisia
solmuja) — siis myös sen alaisia kierrossovelluksia.

**SUOSITUS: AVAA LINKKINÄ.** Poista iframe-yritys Akropolis-kohteesta ja avaa
kierros suoraan laitteen selaimeen (`target=_blank`, `rel=noopener`; kuoressa
ulkoinen selain). Ehtojen kielto on nimenomainen, joten "kokeillaan iframea ja
pudotaan varareitille" ei ole tässä oikea ratkaisu — kehysyritys itsessään on
ehtojen vastainen, vaikka palvelin sen teknisesti sallisikin.

**Sivä tarkistus:** lähdemaininta pelissä on oikein. Sivu on virallinen
(YSMA/kulttuuriministeriö), vaikka sivun oma schema.org-julkaisijakenttä sanoo
vain "Acropolis Virtual Tour" — vahvistus tulee ysma.gr:n linkityksestä.
Sovelluksen teki YSMA:n dokumentointitoimisto yhdessä Culturplayn kanssa.
Tekniikka on HTML5-panoraama (ei Flashia), responsiivinen, `last-modified`
3.11.2025 → aktiivisesti ylläpidetty.

---

## 2. Ehdokastaulukko

| # | URL | Ylläpitäjä | Sisältö | XFO / CSP frame-ancestors | Ehdot upotuksesta | Suositus | Pelin kohde |
|---|-----|-----------|---------|---------------------------|-------------------|----------|-------------|
| 1 | https://www.acropolisvirtualtour.gr/ | YSMA / Kreikan kulttuuriministeriö | 360° panoraamat koko Akropoliin kalliolta, historiatiedot, opetussisältö. HTML5, mobiili. | **ei kumpaakaan → SALLII UPOTUKSEN** | **KIELTÄÄ kehystämisen nimenomaisesti** (ΥΠΠΟΑ ehdot k. 8) | **AVAA LINKKINÄ** | akropolis |
| 2 | https://acropolisvirtualtour2014.ysma.gr/ | YSMA / kulttuuriministeriö | Vuoden 2014 versio: gigapikselipanoraamat, pöllölogo-siirtymät. Vanhentunut mutta toimii. | ei kumpaakaan → sallii | sama ΥΠΠΟΑ-kielto | **ÄLÄ KÄYTÄ** (nro 1 korvaa) | — |
| 3 | https://embed.culturalspot.org/embedv2/streetview/1wHvAr1PHfUbDw | Google Arts & Culture / Akropolis-museo | Parthenon-galleria, Street View -panoraama. Akropolis-museo itse upottaa juuri tämän osoitteen sivulleen. | XFO ei; CSP ilman frame-ancestors → **SALLII UPOTUKSEN** | Googlen virallinen embed-päätepiste on tarkoitettu upotettavaksi; museo julkaisee iframe-koodin itse | **UPOTA** (tai linkki) | akropolis / ateena |
| 3b | https://embed.culturalspot.org/embedv2/streetview/VgGUWDq9_Uo1pg | sama | Akropoliin rinteiden galleria | sama | sama | **UPOTA** | akropolis |
| 3c | https://embed.culturalspot.org/embedv2/streetview/KwH9HX2-0bOSJg | sama | Museon alla oleva arkeologinen kaivaus | sama | sama | **UPOTA** | akropolis |
| 4 | https://www.theacropolismuseum.gr/en/multimedia/virtual-tour-parthenon-gallery | Akropolis-museo | Ylläolevien isäntäsivu, museon oma esittely | **XFO: SAMEORIGIN → ESTÄÄ** | "© 2018 Acropolis Museum. All rights reserved." | **AVAA LINKKINÄ** | akropolis |
| 5 | https://delphi.culture.gr/digital-tour/3d-halls/ | Fokiin antiikkiviranomainen (ΕΦΑ Φωκίδας) / kulttuuriministeriö | 13 museosalin 3D-kierros (Matterport-upotukset sivun sisällä), 3D-esineet, videokierros, esteettömyys. HTML5, responsiivinen, ei Flashia. | ei kumpaakaan → sallii | Ehdoissa **ei mainintaa kehystämisestä**. Copyright: "content ... made available to its visitors/users for **personal use** ... may not be wholly or partly marketed, copied, modified, reproduced, **retransmitted, or transmitted or distributed in any way**" → epäselvä | **AVAA LINKKINÄ** (epäselvä + virallinen laitos) | delfoi |
| 6 | https://virtualtour.heraklionmuseum.gr/en/ | Iraklionin arkeologinen museo / kulttuuriministeriö | Museon oma 360°-kierros; minolainen kokoelma eli Knossoksen löydöt. Museo upottaa sen itse iframeen sivulleen heraklionmuseum.gr/en/virtual-tour/. | ei kumpaakaan → sallii | Ehdot **kannustavat** opetuskäyttöön: "The Museum encourages private use ... as well as use for educational or research purposes ... reproduction or storage of individual pages or data is permitted, with the necessary condition of indicating their origin ... It is strictly forbidden to ... republish, transmit or distribute ... **for commercial purposes**". Ei kehyskieltoa. | **AVAA LINKKINÄ** (upotus olisi luvallinen, mutta ks. varoitus alla) | knossos |
| 7 | https://alexanderthegreatmuseum.gr/doc/en/ | Imathian antiikkiviranomainen (ΕΦΑ Ημαθίας) / kulttuuriministeriö | Virtuaalimuseo "Aleksanteri Suuri: Aigaista oikoumeneen" — 8 lukua, dokumentteja, esineitä. Verkkopohjainen, ei Flashia. | ei kumpaakaan → sallii | Sama malli kuin Iraklionissa: opetuskäyttö sallittu, kaupallinen kielletty, ei kehyskieltoa | **AVAA LINKKINÄ** | vergina / aigai |
| 8 | https://www.olympiacommongrounds.gr/ | Kulttuuriministeriö + Microsoft | "Ancient Olympia: Common Grounds" — 27 monumentin 3D-rekonstruktio | **HTTP 521 (origin alhaalla) + XFO: SAMEORIGIN → ESTÄÄ** | — | **ÄLÄ KÄYTÄ** (sivu ei toimi) | — |
| 9 | https://ds.namuseumlive.gr/en/ | Kansallinen arkeologinen museo (Ateena) | Digitaalinen kierros 36 salissa, 86 esinettä (yhteistyö PostScriptum) | **HTTP 403 + XFO: SAMEORIGIN + Cloudflare-haaste → ESTÄÄ** | — | **ÄLÄ KÄYTÄ** (botti-haaste kaataa myös linkin usein) | — |
| 10 | https://www.hh.gr/en/digital-experiences/ | Kulttuuriministeriö + ΟΔΑΠ ("Hellenic Heritage", helmikuu 2026) | Virallinen 350 kohteen portaali. AR- ja VR-kierrokset ovat **vain mobiilisovelluksina** (App Store / Play). | XFO ei | — | **ÄLÄ KÄYTÄ kierroksena** (ei selainkierrosta); kelpaa korkeintaan lisätietolinkiksi | — |
| 11 | https://www.hellenic-cosmos.gr/en/olympia-360 | Foundation of the Hellenic World (FHW, säätiö) | "Virtual Tour of Ancient Olympia" on **paikan päällä oleva VR-installaatio** Hellenic Cosmos -keskuksessa, ei verkkokierros | XFO ei | — | **ÄLÄ KÄYTÄ** | — |
| 12 | https://www.ysma.gr/en/ | YSMA / kulttuuriministeriö | Akropoliin restaurointipalvelun sivusto (taustatieto, ei kierros) | **XFO: SAMEORIGIN → ESTÄÄ** | kehyskielto ehdoissa | **AVAA LINKKINÄ** jos halutaan lähdesivu | akropolis |

### Tarkistetut mutta tyhjät

| Kohde | Tulos |
|-------|-------|
| **Meteora** | Ei virallista verkkokierrosta. Luostareilla ei ole 360°-sivustoa; kaikki löydetty on kaupallisia matkasivuja ja sovelluksia. |
| **Mykene ja Epidauros** | Argoliin antiikkiviranomaisen sivustolla (argolisculture.gr) ei ole virtuaalikierrosta. odysseus.culture.gr on pelkkä tietokanta. |
| **Akrotiri / Santorini** | Ei virallista Efori-kierrosta. National Geographic Deutschlandin Panotour-sivu (laserkeilaus 2013–14, LBI ArchPro) on kolmannen osapuolen tuotanto, osoitetta ei saatu varmistettua eikä ehtoja tarkistettua → **ÄLÄ KÄYTÄ**. |
| **Thessaloniki** | amth.gr:llä on "digital tour guide" ‑sovellus ja kuvagalleriat, ei selaimessa toimivaa 360°-kierrosta. |
| **Vergina/Aigai (aigai.gr)** | Museon omalla sivulla ei kierrosta; kierros on erillisessä alexanderthegreatmuseum.gr:ssä (rivi 7). |
| **searchculture.gr** | **XFO: DENY** — ei upotettavissa; on muutenkin metadatahaku, ei kierros. |

---

## 3. Suositusten perustelut lyhyesti

**Yleisperiaate jota sovellettiin:** linkittäminen on aina sallittua; iframe-upotus
vaatii sekä teknisen luvan (ei XFO/CSP-estoa) että ehtojen luvan. Jos ehdot
kieltävät tai asia jää epäselväksi ja kyseessä on virallinen kulttuurilaitos →
linkki.

1. **Kreikan kulttuuriministeriön oma ehtoboilerplate kieltää kehystämisen.** Tämä
   löytyi vain YSMA:n PDF:stä, mutta se on ministeriön yleisteksti. Käytännön
   linjaus: **kaikki `*.culture.gr`- ja ministeriön yksikköjen kierrokset avataan
   linkkinä**, vaikka palvelin ei otsaketta lähettäisikään.
2. **Ainoa turvallinen upotus on Google Arts & Culturen `embed.culturalspot.org`.**
   Se on nimenomaan upotusta varten rakennettu päätepiste, ja Akropolis-museo
   julkaisee itse sen iframe-koodin sivullaan. Tämä on ainoa ehdokas, jossa
   upottaminen on sekä teknisesti sallittu että selvästi tarkoitettu.
3. **Iraklionin museon kierros olisi luvallinen upottaa** (ehdot kannustavat
   opetuskäyttöön lähdemaininnalla, ei kehyskieltoa, museo upottaa sen itsekin),
   mutta **virtualtour.heraklionmuseum.gr:n TLS-varmenneketju on epätäydellinen** —
   `curl` kaatuu virheeseen `SSL certificate problem: unable to get local issuer
   certificate` sekä järjestelmän että proxyn CA-bundlella. Useimmat selaimet
   korjaavat tämän AIA-haulla, mutta WKWebView ja tiukat asetukset eivät
   välttämättä. Siksi suositus on linkki, ja upotus vasta jos ketju korjaantuu.
4. **Olympia jää ilman kierrosta.** Ainoa virallinen (olympiacommongrounds.gr) on
   tällä hetkellä rikki (HTTP 521) ja estää kehystämisen muutenkin. Älä lisää
   Olympiaan multimediamerkkiä ennen kuin sivu palaa.

---

## 4. Valmiit datarivit pelin multimedia-merkkityypille

Muoto seuraa `js/packs/fokuskohteet-grc.js`:n `kierros`-oliota. Lisätty kenttä
`avaustapa`, jotta koodi tietää yrittääkö iframea vai ei — nykyinen "yritä
iframea, pudota linkkiin" ei riitä, koska osassa kohteita kehysyritys itsessään
on ehtojen vastainen.

```js
/* AKROPOLIS — korvaa nykyinen kierros-olio (avaustapa: linkki, EI iframea) */
kierros: {
  url: 'https://www.acropolisvirtualtour.gr/',
  otsikko: 'Akropolis 360°',
  nappi: 'Avaa virtuaalikierros',
  lahde: 'Acropolis Virtual Tour — YSMA, Kreikan kulttuuriministeriö',
  avaustapa: 'linkki',
  varaTeksti: 'Kierros avautuu laitteen omassa selaimessa. Kreikan '
    + 'kulttuuriministeriön käyttöehdot kieltävät sen näyttämisen toisen '
    + 'sivuston kehyksessä.',
},

/* AKROPOLIS-MUSEO — Parthenon-galleria (ainoa turvallinen upotus) */
kierros: {
  url: 'https://embed.culturalspot.org/embedv2/streetview/1wHvAr1PHfUbDw',
  otsikko: 'Parthenon-galleria 360°',
  nappi: 'Astu galleriaan',
  lahde: 'Akropolis-museo / Google Arts & Culture',
  avaustapa: 'upotus',
  ulkoinen: 'https://www.theacropolismuseum.gr/en/multimedia/virtual-tour-parthenon-gallery',
  varaTeksti: 'Kierros ei aukea pelin sisällä. Se avautuu laitteen omassa selaimessa.',
},

/* AKROPOLIS-MUSEO — rinteiden galleria */
kierros: {
  url: 'https://embed.culturalspot.org/embedv2/streetview/VgGUWDq9_Uo1pg',
  otsikko: 'Akropoliin rinteet 360°',
  nappi: 'Astu galleriaan',
  lahde: 'Akropolis-museo / Google Arts & Culture',
  avaustapa: 'upotus',
  ulkoinen: 'https://www.theacropolismuseum.gr/en/multimedia/virtual-tour-gallery-acropolis-slopes',
},

/* AKROPOLIS-MUSEO — kaivaus museon alla */
kierros: {
  url: 'https://embed.culturalspot.org/embedv2/streetview/KwH9HX2-0bOSJg',
  otsikko: 'Kaivaus museon alla 360°',
  nappi: 'Laskeudu kaivaukselle',
  lahde: 'Akropolis-museo / Google Arts & Culture',
  avaustapa: 'upotus',
  ulkoinen: 'https://www.theacropolismuseum.gr/en/multimedia/virtual-tour-archaeological-excavation',
},

/* DELFOI */
kierros: {
  url: 'https://delphi.culture.gr/digital-tour/3d-halls/',
  otsikko: 'Delfoin museon 3D-salit',
  nappi: 'Kierrä museon salit',
  lahde: 'Delfoin arkeologinen museo — Fokiin antiikkiviranomainen, '
    + 'Kreikan kulttuuriministeriö',
  avaustapa: 'linkki',
  varaTeksti: 'Kierros avautuu laitteen omassa selaimessa.',
},

/* KNOSSOS (löydöt Iraklionin museossa) */
kierros: {
  url: 'https://heraklionmuseum.gr/en/virtual-tour/',
  otsikko: 'Iraklionin arkeologinen museo 360°',
  nappi: 'Katso Knossoksen aarteet',
  lahde: 'Iraklionin arkeologinen museo, Kreikan kulttuuriministeriö',
  avaustapa: 'linkki',
  varaTeksti: 'Kierros avautuu laitteen omassa selaimessa.',
},

/* VERGINA / AIGAI */
kierros: {
  url: 'https://alexanderthegreatmuseum.gr/doc/en/',
  otsikko: 'Aleksanteri Suuri — Aigaista oikoumeneen',
  nappi: 'Avaa virtuaalimuseo',
  lahde: 'Imathian antiikkiviranomainen, Kreikan kulttuuriministeriö',
  avaustapa: 'linkki',
  varaTeksti: 'Virtuaalimuseo avautuu laitteen omassa selaimessa.',
},
```

### Huomio koodimuutoksesta

Nykyinen `js/fokuskohteet.js`:n `avaaKierros` yrittää aina iframea ja putoaa
10 sekunnin jälkeen linkkiin. Ehdotus: lue `kierros.avaustapa` ja
- `'upotus'` → nykyinen logiikka (iframe + 10 s varapolku + "Avaa selaimessa"),
- `'linkki'` (oletus jos kenttä puuttuu) → älä rakenna iframea lainkaan; näytä
  pergamentti-ikkunassa kierroksen otsikko, lähdemaininta, lyhyt selitys ja iso
  "Avaa selaimessa" -nappi.

Näin ehtojen kehyskielto tulee noudatetuksi eikä sitä jätetä palvelimen
otsakkeiden varaan.

### Lähdemainintojen tarkistus

- Kaikki suositellut ovat virallisia kulttuurilaitoksia (kulttuuriministeriö tai
  sen alainen efori/museo) — ei kaupallisia mainossivustoja eikä satunnaisia
  YouTube-upotuksia.
- Kaikki toimivat ilman Flashia ja ovat HTML5-pohjaisia, responsiivisia.
- Kohta 3 (culturalspot) on Googlen alusta, mutta sisältö on Akropolis-museon ja
  museo julkaisee itse tämän upotusosoitteen — lähdemaininnassa on syytä mainita
  molemmat.

---

## 5. Testikomennot uusintatarkistukseen

```bash
for u in \
  https://www.acropolisvirtualtour.gr/ \
  https://delphi.culture.gr/digital-tour/3d-halls/ \
  https://virtualtour.heraklionmuseum.gr/en/ \
  https://embed.culturalspot.org/embedv2/streetview/1wHvAr1PHfUbDw \
  https://alexanderthegreatmuseum.gr/doc/en/ ; do
  echo "=== $u"
  curl -sSI --max-time 25 -A "Mozilla/5.0" "$u" \
    | grep -iE '^HTTP/|x-frame-options|content-security-policy'
done
```
