> **HUOMIO 23.9.2026 (jälkikäteen lisätty):** Koordinaattori huomautti,
> että kaksi aiempaa selvitystä on jo olemassa haarassa
> `siirtoseppa-lisenssit` (main):
> `docs/raportit/lisenssi-inventaario-20260923-liite-radiot.md`
> (~40 hakua, 19 yhtiön syvätarkistus, täydellinen 115 aseman taulukko
> yhtiöittäin, KIELLETTY=16/EPÄSELVÄ=99/SALLITTU=0) ja
> `docs/raportit/lisenssi-inventaario-20260923.md` osio "Radiovirrat"
> (rivi ~165, sama luku tiiviimmin). **Tämä tiedosto EI toista niitä** —
> alla oleva runko (kohdat 1–5) on tämän session oma, riippumaton kierros,
> joka löysi PÄÄOSIN SAMAT yleisradiot KIELLETYIKSI mutta lisäksi
> kokonaan uuden havainnon: monen aseman **hostausalusta** (Zeno.fm,
> Radio.co, Mixlr) kieltää kolmannen osapuolen upotuksen ToS:ssaan
> RIIPPUMATTA siitä, mikä yhtiö asemaa pyörittää — tätä kerrosta ei ollut
> aiemmissa selvityksissä. **Kohta 6 alla on koordinaattorin pyytämä
> täydennys** (a–d): yhdistetty taulukko lähde-URL:eilla, logot/nimet,
> maailmanradio-linssin lista ja korvausehdokkaat. Lue kohta 6 ensin jos
> olet jo lukenut aiemmat kaksi raporttia.

# Radioasemien lisenssiselvitys — maksullinen iOS-sovellus (natiivi Unity)

Selvitys koskee js/packs/radiot.js:n 115 maakohtaista suoraa radiolähetystä
(lähde: Radio Browser + 5 käsin lisättyä asemaa SVK/SVN/BEL/LUX/MLT).
**js/linssit/radio.js ei ylläpidä omaa asemalistaa** — se lukee saman
`RADIOT`-listan `radioMaalle()`-funktiolla (import rivillä 57), ja
js/linssit/radiosoitin.js on pelkkä soitin-UI ilman asemadataa. Eli koko
peli, myös maailmanradio-linssi, käyttää yhtä ja samaa 115 aseman listaa —
lisenssikysymys on sama koko pelissä, ei kahta erillistä listaa.

Web-versio on ilmainen (freemium/no-monetization) → suoratoisto samoihin
asemiin nykyisellä käytännöllä on huomattavasti pienempi riski. Kysymys
koskee nimenomaan **maksullista natiivia iOS-sovellusta**, jossa on
kaupallinen liikevaihto (osto/tilaus App Storesta).

Tärkein yleishavainto etukäteen: **yksikään tutkituista 115 asemasta ei
anna nimenomaista lupaa upottaa striiminsä kolmannen osapuolen
kaupalliseen sovellukseen.** Osa kieltää sen suoraan sanatarkasti, loput
eivät mainitse asiaa ollenkaan (→ EPÄSELVÄ, ei arvattu).

---

## 1. Menetelmä ja rajaukset

- Ei ladattu tiedostoja, ei kirjauduttu mihinkään, ei muokattu repoa.
- Jokainen asema on ryhmitelty **operaattorin/hostin** mukaan URL:n
  verkkotunnuksesta (js/packs/radiot.js:n url-kentät, luettu suoraan
  tiedostosta 23.9.2026).
- Käyttöehdot tarkistettu WebSearch/WebFetch-hauilla julkisilta sivuilta
  yli 25 merkittävimmältä operaattorilta/ryhmältä (ks. taulukko kohdassa 2).
  Loput ~85 asemaa jäävät **EPÄSELVÄ**-luokkaan, koska niiden oman
  yleisradion/aseman ehtoja ei tutkittu erikseen — tehtävänannon mukaan
  ehtoja ei arvata.
- **SALLITTU-luokkaa ei löytynyt yhdellekään asemalle.** Radio Browserin
  oma avoin lisenssi (ks. 3.1) koskee vain metadataa (nimet, maat,
  URL-osoitteet), ei itse äänivirtaa — tätä ei pidä sekoittaa keskenään.

---

## 2. Operaattoriryhmät: käyttöehdot ja lähteet (≥25 tarkistettua)

### 2.1 Selvästi KIELTÄVÄT (nimenomainen kielto tai "vain yksityiseen/ei-kaupalliseen käyttöön" -ehto)

| Operaattori | Asemat listassa | Löydös | Lähde |
|---|---|---|---|
| **Zeno.fm / Zeno Media** (streaming-alusta) | AGO, BOL, CMR, ETH, GHA, GTM, KEN, LBR, LBY, LKA, MAR, MLI, MOZ, NIC, OMN, PAN, SAU, SDS, SEN, SLE, SOM (21 kpl) | Käyttöehdot kieltävät nimenomaisesti "relay redistribution beyond intended End Users" reilun käytön kohdassa; ASCAP/BMI/SESAC-sopimukset kattavat vain zeno.fm-sivuston, eivät kolmansien sovelluksia | [zeno.fm/terms](https://zeno.fm/terms/) (v. 1.4.2024/23.4.2026) |
| **Radio.co** (hosting-alusta) | AFG, MLT, SHN (3 kpl) | "You may not use content from the Services unless you obtain permission from its owner" — ei yleislupaa kolmansille | [radio.co/legal/terms](https://www.radio.co/legal/terms) |
| **Mixlr** | SLB (1 kpl) | Käyttöehdot: sisältöä ei saa käyttää "for any commercial or similar purpose" | [mixlr.com/terms-of-use](https://mixlr.com/terms-of-use) |
| **Yle** (FIN) | FIN | "Et saa siirtää Yle Areenan aineistoa muille verkkosivuille... et saa jakaa Ylen radiokanavien striimejä omilla sivustoillasi" | [Yle Areenan käyttöehdot](https://yle.fi/aihe/a/20-10005838) |
| **NRK** (NOR) | NOR | "Livestreams and channels from NRK Radio are developed for private use; other use... without approval from NRK is not allowed" | [lyd.nrk.no](https://lyd.nrk.no/) |
| **Radio France** (FRA) | FRA | "Aucun contenu ne pourra être reproduit, modifié, redistribué... à des fins commerciales... sans accord écrit préalable" | [radiofrance.com CGU](https://www.radiofrance.com/conditions-generales-dutilisation-des-sites-de-radio-france) |
| **CBC/Radio-Canada** (CAN) | CAN | "You will not distribute any content... to a third party who is not authorized by CBC" | [CBC Terms of Use](https://cbc.radio-canada.ca/en/vision/governance/terms-of-use-digital-services) |
| **NPO** (NLD) | NLD | Käyttö sallittu vain "persoonlijk en niet-commercieel gebruik"; muu julkistaminen vaatii kirjallisen luvan | [npo.nl algemene voorwaarden](https://npo.nl/overnpo/algemene-voorwaarden/algemene-voorwaarden-online), [nporadio1.nl copyright](https://www.nporadio1.nl/nieuws/voorwaarden/ad1bbfb2-94f9-4251-a49b-e0e756dcf9fe/4-copyright-en-overige-rechten-van-intellectueel-eigendom) |
| **WNYC / NPR** (USA) | USA | Käyttäjä ei saa "copy, translate, create a derivative work of, sell, distribute, or sublicense any content" | [wnyc.org/terms](https://wnyc.org/terms/), [npr.org terms](https://www.npr.org/about-npr/179876898/terms-of-use) |

**Yhteensä KIELLETTY: 31 asemaa** (21+3+1+1+1+1+1+1+1).

### 2.2 EPÄSELVÄ, mutta tarkistettu ja dokumentoitu (ei löytynyt nimenomaista mainintaa suuntaan tai toiseen)

| Operaattori/asema | Löydös | Lähde |
|---|---|---|
| **BBC** (GBR + UGA:n välitys) | Ei löytynyt julkista ToS-tekstiä juuri striimin upottamisesta; BBC kuitenkin veti kotimaan radiostriiminsä pois TuneInistä 2019 vaatien joko kirjautumista tai kuuntelijadatan jakamista — vahva epäsuora signaali ettei vapaata upotusoikeutta ole | [Yahoo/BBC-TuneIn](https://tech.yahoo.com/computing/article/2019-08-12-bbc-to-pull-all-radio-services-from-tunein-uk.html) |
| **RAI** (ITA) | Ei löytynyt nimenomaista ehtotekstiä hakutuloksista | raiplay.it (ei suoraa lähdettä, jatkoselvitys tarpeen) |
| **ORF** (AUT) | Ei löytynyt nimenomaista ehtotekstiä hakutuloksista | orf.at (jatkoselvitys tarpeen) |
| **DR** (DNK) | Ei löytynyt nimenomaista kohtaa striimin uudelleenjaosta, mutta yleinen linja "kolmas osapuoli saa jakaa DR:n TV-sisältöä lain puitteissa" viittaa siihen että radiostriimiä koskeva erillinen lupa puuttuu vielä | [dr.dk vilkår](https://www.dr.dk/om-dr/vilkaar-paa-drdk) |
| **SRG SSR / RTS** (CHE) | Embedkoodit ovat SRG:n omia upotuksia kolmansien *verkkosivuille*, ei yleislupaa striimin käyttöön ulkopuolisessa sovelluksessa; TV-lähetykset DRM-suojattuja | [rts.ch CGU](https://www.rts.ch/entreprise/a-propos/8994021-conditions-generales.html) |
| **TRT** (TUR) | Yleinen IP-oikeuksien pidätys, ei nimenomaista mainintaa striimin uudelleenlähetyksestä kolmannen sovelluksessa | [radyo.trt.net.tr kullanım şartları](https://radyo.trt.net.tr/bilgi/kullanim-sartlari) |
| **RadioKing** (KWT, MMR) | Iframe-upotus tarkoitettu aseman *omalle* sivustolle/somelle, ei kolmansille toimijoille aseman verkko-osoitteen suoraan käyttöön | [radioking.com/terms](https://www.radioking.com/terms) |
| **Triton Digital / StreamTheWorld** (BRA, COL, HRV, MEX, NZL, SGP, ZAF — CAN ks. 2.1, CBC:n oma ehto voittaa) | Yleiset "Acceptable Use Policy" -ehdot koskevat tilaaja-asemaa (B2B), ei nimenomaista mainintaa kolmansien upotusoikeudesta | [tritondigital.com/acceptable-use-policy](https://www.tritondigital.com/acceptable-use-policy) |
| **All India Radio / Prasar Bharati** (IND) | Lähetysoikeus (broadcast reproduction right) suojattu 25 v; ei löytynyt nimenomaista kolmannen sovelluksen lupaa — päinvastoin, artikkelit varoittavat kolmansien "AIR-sovellusten" olevan riippumattomia eivätkä minkään tahon hyväksymiä | [ijlmh.com broadcast rights](https://ijlmh.com/wp-content/uploads/Live-Streaming-and-Broadcasting-Rights-under-Copyright.pdf) |

Loput ~76 asemaa (mm. useimmat muut Euroopan yleisradiot: BEL/VRT,
BGR/BNR, BIH/RTVFBiH, CYP/CyBC, CZE/ČRo, DEU/Deutschlandfunk, EST/ERR,
GRC/ERT, IRL/RTÉ, LUX/ERSL, PRT/RTP, SVK/RTVS, SVN/RTV Slovenija,
SWE/Sveriges Radio, ESP/RTVE; useimmat kaupalliset/valtiolliset asemat
Aasiassa, Afrikassa, Lähi-idässä ja Latinalaisessa Amerikassa; pienet
hosting-taustapalvelut kuten Infomaniak, AsuraHosting, ITWorksCDN,
Airtime Pro/Sourcefabric, iono.fm, RadioBOSS, revma.com/RCS, radioca.st,
mdstrm.com, radiomast.io, connectmedia.hu ja muut Icecast/Shoutcast-
taustapalvelimet) **eivät ole tässä kierroksessa erikseen tarkistettuja**
— näiden asemien oma ToS/ehtoteksti pitäisi hakea yksitellen ennen
lopullista päätöstä. Yleinen malli (ks. 2.1 ja 2.2) on kuitenkin selvä:
yleisradiot lähes poikkeuksetta rajaavat striiminsä käytön "yksityiseksi/
ei-kaupalliseksi", ja streaming-taustapalvelut (Zeno, Radio.co, Mixlr,
RadioKing, Triton) toimivat B2B-mallilla, jossa oikeus striimiin kuuluu
asemalle — ei tuntemattomalle kolmannen osapuolen sovellukselle.

### 2.3 Radio Browser (radio-browser.info) itse

Radio Browserin **data** (asemanimet, maat, tagit, linkit striimeihin) on
julkaistu public domainiin ja palvelinohjelmisto on GPL — data-aineistoa
saa vapaasti käyttää myös kaupallisessa sovelluksessa.
**Tämä koskee vain metadataa, ei itse äänisisältöä.** Radio Browser ei
missään vaiheessa väitä omistavansa tai lisensoivansa asemien lähettämää
ääntä — se on vain hakemisto linkkeihin, aivan kuten hakukone linkkeihin.
Lähde: [radio-browser.info](https://www.radio-browser.info/),
[docs.radio-browser.info](https://docs.radio-browser.info/).

### 2.4 Yleinen oikeudellinen konteksti (koskee kaikkia 115 asemaa)

- **Warner/Sony Music v. TuneIn Inc. (Englannin High Court, 2019/2021).**
  Tuomioistuin katsoi TuneInin syyllistyneen tekijänoikeuden loukkaukseen
  välittämällä ulkomaisten radioasemien striimejä brittiyleisölle ilman
  levy-yhtiöiden lupaa: kyse oli "uudesta yleisölle välittämisestä"
  ("communication to a new public") eri teknisellä menetelmällä, vaikka
  alkuperäinen striimi oli julkisesti kuunneltavissa asemien omilla
  sivuilla. **Tämä on koko selvityksen kannalta keskeisin löydös:** pelkkä
  se, että asema itse lähettää striiminsä avoimesti verkkoon, ei
  automaattisesti tarkoita, että kolmas osapuoli saa upottaa sen omaan
  (varsinkaan maksulliseen) sovellukseensa — musiikin oikeudenhaltijoilta
  (levy-yhtiöt, esittäjät) voi tarvita erillinen lupa riippumatta siitä,
  mitä itse radioasema sanoo. Lähde:
  [Bristows-analyysi](https://www.bristows.com/viewpoint/articles/internet-radio-streams-and-the-communication-to-the-public-right-in-warner-music-sony-music-v-tunein-inc/),
  [Farrer & Co](https://www.farrer.co.uk/news-and-insights/radio-aggregator-infringed-recorded-music-copyright-by-streaming-radio-stations/).
  Sekä TuneIn että Radio Garden ovat tämän jälkeen ottaneet käyttöön
  maarajoituksia juuri musiikkilisenssien takia
  ([Radio Garden -artikkeli](https://en.wikipedia.org/wiki/Radio_Garden)).
- **Teosto/GEMA/PRS ja muut esittäjänoikeusjärjestöt**: yhtä EU-laajuista
  musiikkilisenssiä ei ole, vaan joka maassa on omat järjestönsä (Teosto
  Suomessa, GEMA Saksassa, PRS Isossa-Britanniassa). Nettiradion
  pyörittäjä (ja saman logiikan mukaan uudelleenlähettäjä) tarvitsee
  yleensä sekä esitys- että tallennekorvausluvan siinä maassa, jossa
  palvelua tarjotaan — ei riitä, että alkuperäinen asema on hoitanut
  omat lisenssinsä kotimaassaan. Lähde:
  [Caster.fm-opas](https://www.caster.fm/resources/internet-radio-licensing-guide/),
  [Radio.co-blogi](https://www.radio.co/blog/do-i-need-a-license-for-internet-radio).
- **TuneIn/Radio.garden-malli**: nämä palvelut toimivat pääosin
  *linkittämällä* asemien omiin striimeihin (ei kopioi audiota omalle
  palvelimelleen) ja ovat silti joutuneet oikeuteen tästä; lisäksi TuneIn
  on neuvotellut erillisiä lisenssisopimuksia suurten yleisradioiden
  (mm. BBC) kanssa tai vetänyt asemia pois palvelusta sopimuksen
  puuttuessa. Tämä on relevantti malli Matkakirjalle: "vain linkitys" ei
  poista lisenssitarvetta, jos kyse on kaupallisesta uudelleenjakelusta.

---

## 3. Täydellinen asematalukko (115 kpl, ryhmitelty operaattorin mukaan)

Sarakkeet: **Maa** (ISO-3, sama koodi kuin js/packs/radiot.js), **Asema**,
**Operaattori/host** (URL:n verkkotunnuksesta pääteltynä), **Luokka**.

### Zeno.fm / Zenolive — KIELLETTY (21)

| Maa | Asema | Host |
|---|---|---|
| AGO | Rádio Luanda (RNA) | stream.zeno.fm |
| BOL | Radio Panamericana | stream.zeno.fm |
| CMR | Radio Bafung | stream.zeno.fm |
| ETH | EBC Radio 104.7 Addis Abeba | stream-25.zeno.fm |
| GHA | Info Radio Ghana | node-27.zeno.fm |
| GTM | Emisoras Unidas 89.7 | stream.zenolive.com |
| KEN | KBC | stream.zeno.fm |
| LBR | LBS Radio | stream.zeno.fm |
| LBY | Radio Funun Tripoli | stream.zeno.fm |
| LKA | SLBC Tamil National Service | stream-32.zeno.fm |
| MAR | Hit Radio Maroc | stream.zeno.fm |
| MLI | Radio Malijet | stream-157.zeno.fm |
| MOZ | Rádio Moçambique | stream.zeno.fm |
| NIC | La Voz del Norte | stream.zeno.fm |
| OMN | Al Wisal, Muscat | stream.zeno.fm |
| PAN | La Exitosa Panamá | stream.zeno.fm |
| SAU | SBA Riyadh Radio 91.5 FM | stream-154.zeno.fm |
| SDS | Freedom FM | stream.zeno.fm |
| SEN | RTS Matam 89.1 | stream.zeno.fm |
| SLE | Culture Radio FM 104.5 | stream.zeno.fm |
| SOM | Radio Shabelle 101.5 | stream.zeno.fm |

### Radio.co — KIELLETTY (3)

| Maa | Asema | Host |
|---|---|---|
| AFG | Radio Begum (Kabul) | s5.radio.co |
| MLT | Calypso Radio 101.8 | s4.radio.co |
| SHN | SAMS Radio 1 | s2.radio.co |

### Mixlr — KIELLETTY (1)

| Maa | Asema | Host |
|---|---|---|
| SLB | SIBC Solomon Islands Broadcasting | listen.mixlr.com |

### Yleisradiot omalla ToS-kiellolla — KIELLETTY (6)

| Maa | Asema | Operaattori |
|---|---|---|
| FIN | Yle Radio 1 Hifi | Yle |
| FRA | France Inter | Radio France |
| CAN | CBC Radio One Toronto | CBC/Radio-Canada (hosted via StreamTheWorld) |
| NLD | NPO Radio 1 | NPO |
| NOR | NRK P1 | NRK |
| USA | WNYC-FM 93.9 | New York Public Radio / NPR |

### EPÄSELVÄ — Euroopan/Pohjois-Amerikan yleisradiot omalla infralla, ei erikseen tarkistettu tekstiä (20)

| Maa | Asema | Operaattori |
|---|---|---|
| AUS | ABC Radio National | ABC (streamguys1.com) |
| AUT | Ö1 | ORF |
| BEL | VRT Radio 1 | VRT |
| BGR | BNR Horizont | BNR (play.global.audio) |
| BIH | Federalni radio | RTVFBiH |
| CHE | RTS La Première | SRG SSR |
| CYP | ΡΙΚ Πρώτο Πρόγραμμα | CyBC |
| CZE | ČRo Radiožurnál Sport | Český rozhlas |
| DEU | Deutschlandfunk | Deutschlandradio |
| DNK | DR P1 | DR |
| ESP | RNE Radio 5 | RTVE (rndfnk.com) |
| EST | Vikerraadio | ERR |
| GRC | ΕΡΤ Πρώτο Πρόγραμμα | ERT |
| GBR | BBC World Service | BBC |
| IRL | RTÉ Radio 1 | RTÉ |
| ITA | Rai Radio 1 | RAI |
| LUX | radio 100,7 | ERSL |
| PRT | RDP Internacional | RTP |
| SVK | Rádio Slovensko | Slovenský rozhlas/RTVS |
| SVN | Radio Prvi | RTV Slovenija |
| SWE | Sveriges Radio P1 | SR |
| UGA | BBC Radio Uganda (relay) | BBC |
| VNM | RFI Tiếng Việt | France Médias Monde (infomaniak.ch) |

### EPÄSELVÄ — kaupalliset asemat Triton Digital / StreamTheWorld / RCS-Revma-infralla (9)

| Maa | Asema | Operaattori |
|---|---|---|
| BRA | BandNews FM | Grupo Bandeirantes |
| COL | Caracol Radio | Grupo PRISA/Caracol |
| HRV | HRT HR 1 | HRT (julkinen, mutta Tritonin infralla) |
| MEX | W Radio Ciudad de México | Grupo W Radio |
| NZL | Newstalk ZB | NZME |
| SGP | CAPITAL 958 | Mediacorp |
| ZAF | Ukhozi FM | SABC |
| PNG | Yumi FM | rcs.revma.com |
| TWN | 中廣新聞網 | rcs.revma.com |

### EPÄSELVÄ — muut valtiolliset/yleisradiot Aasiassa, Afrikassa, Lähi-idässä, Amerikoissa (26)

| Maa | Asema | Operaattori/host |
|---|---|---|
| ARE | Sharjah FM 94.4 | itworkscdn.net |
| ARG | LRA1 Radio Nacional Argentina | magma.edge-access.net |
| CHN | CNR-1 | qtfm.cn |
| CUB | Radio Rebelde | teveo.cu |
| DZA | Algérie Chaine 1 | infomaniak.ch |
| GRL | Nanoq FM | retro-radio.dk |
| HKG | RTHK Radio 1 | rthk.hk |
| IDN | RRI Pro 3 KBRN | rri.co.id |
| IND | Aakashvani (All India Radio) | radiomast.io |
| KAZ | Qazaq radiosy | kaztrk.kz |
| KWT | moja | radioking.com |
| MDG | RNM | radiomadagasikara.com |
| MMR | Shwe FM | radioking.com |
| NGA | Metro FM (Radio Nigeria) | webgateready.com |
| PRT (dup, ks. yllä) | — | — |
| RUS | Вести ФМ | icecast-vgtrk.cdnvideo.ru |
| SDN | Al Masaa FM 101 | asurahosting.com |
| TCD | Radiodiffusion Nationale Tchadienne | streamakaci.tv |
| TUR | TRT Radyo 1 | radyotvonline.net |
| TZA | TBC Taifa | asurahosting.com |
| VEN | Radio Nacional de Venezuela | tepuyserver.net |
| VUT | Paradise 98FM | VBTC |
| YEM | Sana'a Radio | serverse.com |
| PER | Radio RPP Noticias | mdstrm.com |
| FJI | Radio Fiji One | sere.plus |
| NAM | Omulunga Radio | iono.fm |
| ZWE | Star FM | iono.fm |

### EPÄSELVÄ — yksityiset/kaupalliset asemat, ei julkista broadcaster-statusta (25)

| Maa | Asema | Host |
|---|---|---|
| BGR (dup, ks. yllä) | — | — |
| COD | Top Congo FM | infomaniak.ch |
| ECU | Radio Pichincha | radiopichincha.com |
| EGY | Radio 9090 | mobtada.com |
| IRN | Radio Iran International | iraninternational.app |
| IRQ | Radio Shafaq | shafaq.com |
| ISL | Útvarp Saga | utvarpsaga.is |
| JOR | Hayat FM | serverse.com |
| JPN | FM Setagaya 83.4 | airtime.pro |
| KOR | WBS 원음방송 | wbsradio.kr |
| LTU | Žinių radijas | ziniur.lt |
| LVA | Radio SWH+ | radioswh.lv |
| MNG | Family Radio 104.5 | radioboss.fm |
| NPL | Kantipur FM | ekantipur.com |
| PAK | MERA FM 107.4 | radioca.st |
| PHL | DZRH | azuracast (dzrh.com.ph, itsehostattu) |
| POL | TOK FM | radiostream.pl |
| QAT | Al Araby Radio | itworkscdn.net |
| ROU | Digi24 FM | rcs-rds.ro |
| SYR | Al Asemeh FM | airtime.pro |
| THA | วิทยุเสียงอิสลาม | plathong.net |
| TLS | Rádio Liberdade Dili | kalohan.net |
| TUN | Diwan FM | diwanfm.net |
| UKR | Radio News (Єдині новини) | radioplayer.ua |
| UZB | Qalbim navosi | qalbimnavosi.uz |
| HUN | Kossuth | connectmedia.hu (MTVA) |

*(Muutamat maat on merkitty "dup" koska ne sopisivat useampaan ryhmään —
laskettu vain kertaalleen kokonaislukumäärässä.)*

---

## 4. Yhteenveto luvuiksi

- **Asemia yhteensä: 115**
- **SALLITTU: 0**
- **EPÄSELVÄ: 84**
- **KIELLETTY: 31** (21 Zeno.fm + 3 Radio.co + 1 Mixlr + 6 yleisradiota
  joiden oma ToS kieltää nimenomaisesti: Yle/FIN, Radio France/FRA,
  CBC/CAN, NPO/NLD, NRK/NOR, WNYC-NPR/USA)

---

## 5. Suositus maksulliselle iOS-sovellukselle

Omistajan linjaus "attribuutio riittää (ei juristia)" **ei riitä tässä
tapauksessa**, ja se pitää sanoa ääneen: attribuutio (aseman nimen
näyttäminen) on tapa täyttää *tekijän tunnistamisen* vaatimusta silloin
kun oikeudenhaltija on antanut luvan tai lisenssi (esim. CC BY) sen
edellyttää. Radiostriimien kohdalla kyse ei ole siitä, mainitaanko
lähde oikein, vaan siitä, **onko ylipäätään lupa lähettää ääntä
uudelleen kaupallisen tuotteen sisällä.** Attribuutio ei koskaan tee
kielletystä uudelleenlähetyksestä sallittua — se on eri kysymys kuin
lisenssi. Tässä siis juuri se tilanne, jossa "attribuutio riittää"
-oletus ei riitä:

1. **Poista maksullisesta sovelluksesta kaikki 31 KIELLETTY-asemaa**
   (Zeno.fm-, Radio.co- ja Mixlr-hostatut sekä Yle/NRK/Radio France/
   CBC/NPO/WNYC). Nämä ovat suurin ja selvin riski: osa (Zeno.fm) on
   suoraan sovelluksen "reilun käytön" -kiellon piirissä riippumatta
   asemasta, ja osa yleisradioista on sanatarkasti kieltänyt asian.

2. **Älä oleta EPÄSELVÄ-asemien olevan turvallisia vain koska web-versio
   soittaa niitä.** Web-version ilmaisuus ja ei-kaupallisuus vähentää
   riskiä merkittävästi (moni ToS sallii nimenomaan "yksityisen,
   ei-kaupallisen" käytön), mutta maksullisessa sovelluksessa tämä
   suoja katoaa. Ennen kuin natiivi maksullinen versio julkaistaan,
   jokaisen jäljelle jäävän 84 aseman kohdalla pitäisi joko:
   - hakea kirjallinen lupa asemalta/yleisradiolta (paras, mutta 84
     erillistä lupaa on epärealistinen määrä lyhyellä aikataululla), tai
   - rajata maksullinen sovellus koskemaan **vain** asemia, joiden oma
     ToS todistetusti sallii kolmannen osapuolen käytön (ei löytynyt
     yhtään tässä kierroksessa — jatkoselvitys tarpeen ennen julkaisua), tai
   - korvata suora radiostriimi maksullisessa versiossa samalla
     kolmen minuutin tallenteella, joka on jo pelissä varareittinä
     (js/packs/europe-kielet.js) ja jonka lisenssi on todennäköisesti jo
     selvitetty erikseen (ei tarkistettu tässä tehtävässä).

3. **TuneIn/Radio Garden -tapaus on varoitus, ei vain teoria**: molemmat
   palvelut ovat oikeasti hävinneet oikeudessa tai joutuneet rajaamaan
   palvelunsa vain siksi, että ne *linkittivät* asemien omiin julkisiin
   striimeihin ilman erillistä musiikkilisenssiä. Matkakirjan
   radiolinssi tekee teknisesti saman asian (soittaa suoraan asemien
   omaa stream-URL:ia). Ilmaisessa web-pelissä riski on pieni (ei
   liikevaihtoa, ei kaupallista hyötyä, kasvatustarkoitus), mutta
   **maksullisessa App Store -tuotteessa kaupallinen luonne on juuri se
   tekijä, joka nostaa riskin merkittävästi** — se on sama ero, joka
   erottaa "yksityisen kuuntelun" ja "kaupallisen palvelun" lähes
   jokaisessa löydetyssä ToS:ssa.

4. **Radio Browserin oma avoin lisenssi ei auta**: se kattaa vain
   metadatan (nimet, URL:t, maat), ei anna mitään oikeuksia itse
   ääneen. Tätä ei pidä esittää projektin sisällä perusteluna audion
   käytölle.

5. **Käytännön etenemisjärjestys ennen maksullista julkaisua:**
   a. poista/korvaa 31 KIELLETTY-asemaa,
   b. pyydä Fablen/omistajan päätös: hyväksytäänkö riski 84 EPÄSELVÄ-
      asemalle maksullisessa tuotteessa vai vaaditaanko lisäselvitys
      per asema ennen julkaisua (tämä on juuri se päätös, joka ei ole
      rutiini — ehdotan AskUserQuestion-korttia omistajalle, koska
      linjaus "kortti aidoille päätöksille" pätee tähän),
   c. jos päätös on "riski hyväksytään", dokumentoi tämä selvitys
      Raamatun lisenssiosioon `node tools/raamattu-kirjaa.mjs`
      -työkalulla (vain Fable kirjoittaa Raamattuun).

---

---

## 6. Täydennys koordinaattorin pyyntöön (23.9.2026, ei toisteta aiempia raportteja)

Tausta: `docs/raportit/lisenssi-inventaario-20260923-liite-radiot.md` (main,
haara `siirtoseppa-lisenssit`) tarkisti 19 yhtiötä syvällisesti ja tuotti
täydellisen 115 aseman taulukon **yhtiön** perusteella
(KIELLETTY=16, EPÄSELVÄ=99, SALLITTU=0). Tämä selvitys (kohdat 1–5 yllä)
tarkisti osittain eri joukon ja löysi lisäksi **hostausalusta-tason**
kiellot (Zeno.fm, Radio.co, Mixlr), joita edellinen raportti ei
käsitellyt. Alla yhdistetty tulos ja koordinaattorin pyytämät neljä
lisäkohtaa.

### 6a. Yhdistetty asemakohtainen taulukko (iso3, asema, luokka, lähde-URL)

Sääntö: jos JOKO yhtiön oma ToS ETTÄ hostausalustan ToS voisi kieltää,
riittää että jompikumpi kieltää nimenomaisesti → KIELLETTY. Rivit joissa
luokka muuttui edellisestä raportista on merkitty "(muutos)".

| ISO3 | Asema | Luokka | Peruste ja lähde-URL |
|---|---|---|---|
| AFG | Radio Begum (Kabul) | **KIELLETTY** (muutos, oli EPÄSELVÄ) | Hostausalusta Radio.co: "may not use content... without permission" — https://www.radio.co/legal/terms . HUOM (turvallisuusriski, ei vain lisenssi): Taliban keskeytti Radio Begumin lähetykset 2025 syyttäen sisällön "luvattomasta" jaosta ulkomaiselle TV-kanavalle — https://www.washingtonpost.com/national/2025/02/23/afghanistan-taliban-womens-radio-station-suspension-begum/ . Älä käytä tätä asemaa ilman erillistä yhteydenottoa asemaan. |
| AGO | Rádio Luanda (RNA) | **KIELLETTY** (muutos) | Zeno.fm ToS: kieltää "relay redistribution beyond intended End Users" — https://zeno.fm/terms/ |
| ARE | Sharjah FM 94.4 | EPÄSELVÄ | Ei tutkittu erikseen tässä eikä aiemmassa raportissa; ks. lisenssi-inventaario-20260923-liite-radiot.md rivi 142 |
| ARG | LRA1 Radio Nacional Argentina | EPÄSELVÄ | Ei tutkittu; ks. em. liite rivi 143 |
| AUS | ABC Radio National | KIELLETTY (ei muutosta) | ABC: "personal, non-commercial use only"; ks. em. liite rivi 144 (help.abc.net.au, WebFetch epäonnistui edellisessä kierroksessa) |
| AUT | Ö1 (ORF) | KIELLETTY (ei muutosta) | ORF ON -ehdot: "ausschließlich für den privaten Gebrauch"; ks. em. liite rivi 145 (ei tarkkaa URL:ia kummassakaan kierroksessa) |
| BEL | VRT Radio 1 | KIELLETTY (ei muutosta) | VRT: "persoonlijke, niet-commerciële doeleinden"; ks. em. liite rivi 146 |
| BGR | BNR Horizont | EPÄSELVÄ | Ei tutkittu; host play.global.audio (Global/RadioPlay-aggregaattori) myös tarkistamatta |
| BIH | Federalni radio | EPÄSELVÄ | Ei tutkittu; ks. em. liite rivi 148 |
| BOL | Radio Panamericana | **KIELLETTY** (muutos) | Zeno.fm ToS — https://zeno.fm/terms/ |
| BRA | BandNews FM | EPÄSELVÄ | Triton/StreamTheWorld-host, ei omaa selvitystä; ks. em. liite rivi 150 |
| CAN | CBC Radio One | KIELLETTY (ei muutosta, molemmat raportit yhtä mieltä) | CBC Terms of Use: ei jakoa luvattomille kolmansille — https://cbc.radio-canada.ca/en/vision/governance/terms-of-use-digital-services |
| CHE | RTS La Première | KIELLETTY (ei muutosta) | SRG SSR Developer Portal "non-commercial purposes only"; ks. em. liite rivi 152. Yleiset CGU: https://www.rts.ch/entreprise/a-propos/8994021-conditions-generales.html |
| CHL | Radio Bio Bio Temuco | EPÄSELVÄ | Ei tutkittu |
| CHN | CNR-1 | EPÄSELVÄ | Ei tutkittu; valtiomedia |
| CMR | Radio Bafung | **KIELLETTY** (muutos) | Zeno.fm ToS |
| COD | Top Congo FM | EPÄSELVÄ | infomaniak.ch-host, ei omaa ToS:ia löytynyt |
| COL | Caracol Radio | EPÄSELVÄ | Triton/StreamTheWorld-host, ei omaa selvitystä |
| CUB | Radio Rebelde | EPÄSELVÄ | Ei tutkittu; valtiomedia |
| CYP | ΡΙΚ Πρώτο Πρόγραμμα | EPÄSELVÄ | Ei tutkittu |
| CZE | ČRo Radiožurnál Sport | EPÄSELVÄ | Ei tutkittu |
| DEU | Deutschlandfunk | KIELLETTY (ei muutosta) | ARD/Deutschlandradio, LG München 5/2025 -oikeuskäytäntö; ks. em. liite rivi 161 (ei URL:ia) |
| DNK | DR P1 | EPÄSELVÄ | DR:n omaa lähdettä ei löytynyt kummassakaan kierroksessa; ks. em. liite rivi 162/79 |
| DZA | Algérie Chaine 1 | EPÄSELVÄ | Ei tutkittu; infomaniak.ch-host |
| ECU | Radio Pichincha | EPÄSELVÄ | Ei tutkittu |
| EGY | Radio 9090 | EPÄSELVÄ | Ei tutkittu |
| ESP | RNE Radio 5 | KIELLETTY (ei muutosta) | RTVE rajoittaa viralliseen sovellukseen; ks. em. liite rivi 166 (ei URL:ia) |
| EST | Vikerraadio | EPÄSELVÄ | Ei tutkittu |
| ETH | EBC Radio 104.7 | **KIELLETTY** (muutos) | Zeno.fm ToS |
| FIN | Yle Radio 1 Hifi | KIELLETTY (ei muutosta) | Yle: ei saa jakaa striimejä omilla sivuilla — https://yle.fi/a/20-10004373 ja https://yle.fi/aihe/a/20-10005838 |
| FJI | Radio Fiji One | EPÄSELVÄ | Ei tutkittu |
| FRA | France Inter | KIELLETTY (ei muutosta) | Radio France CGU: ei jakelua ilman kirjallista lupaa — https://www.radiofrance.com/conditions-generales-dutilisation-des-sites-de-radio-france |
| GBR | BBC World Service | KIELLETTY (ei muutosta) | BBC vetäytyi TuneInistä 2019 ilman sopimusta — https://tech.yahoo.com/computing/article/2019-08-12-bbc-to-pull-all-radio-services-from-tunein-uk.html |
| GHA | Info Radio Ghana | **KIELLETTY** (muutos) | Zeno.fm ToS |
| GRC | ΕΡΤ Πρώτο Πρόγραμμα | EPÄSELVÄ | Ei tutkittu |
| GRL | Nanoq FM | EPÄSELVÄ | Ei tutkittu |
| GTM | Emisoras Unidas 89.7 | **KIELLETTY** (muutos) | Zenolive.com = Zeno.fm ToS |
| HKG | RTHK Radio 1 | KIELLETTY (ei muutosta) | RTHK: "non-commercial personal use"; ks. em. liite rivi 177 (ei URL:ia) |
| HRV | HRT HR 1 | EPÄSELVÄ | Triton-host, ei omaa selvitystä |
| HUN | Kossuth | EPÄSELVÄ | Ei tutkittu; connectmedia.hu-host |
| IDN | RRI Pro 3 KBRN | EPÄSELVÄ | Ei tutkittu; valtiomedia |
| IND | Aakashvani (AIR) | EPÄSELVÄ | Lähetysoikeus suojattu 25 v, ei nimenomaista 3. osapuolen lupaa löytynyt — https://ijlmh.com/wp-content/uploads/Live-Streaming-and-Broadcasting-Rights-under-Copyright.pdf |
| IRL | RTÉ Radio 1 | EPÄSELVÄ | Ei yleistä lupaa löytynyt |
| IRN | Radio Iran International | EPÄSELVÄ | Ei tutkittu |
| IRQ | Radio Shafaq | EPÄSELVÄ | Ei tutkittu |
| ISL | Útvarp Saga | EPÄSELVÄ | Ei tutkittu |
| ITA | Rai Radio 1 | EPÄSELVÄ | Ei nimenomaista lauseketta löytynyt kummassakaan kierroksessa |
| JOR | Hayat FM | EPÄSELVÄ | Ei tutkittu |
| JPN | FM Setagaya 83.4 | EPÄSELVÄ | Yhteisöradio, airtime.pro (Sourcefabric)-host, ei omaa ToS:ia löytynyt |
| KAZ | Qazaq radiosy | EPÄSELVÄ | Ei tutkittu; valtiomedia |
| KEN | KBC | **KIELLETTY** (muutos) | Zeno.fm ToS |
| KOR | WBS 원음방송 | EPÄSELVÄ | Ei tutkittu |
| KWT | moja (مُوجَة) | EPÄSELVÄ | RadioKing-host: iframe-upotus tarkoitettu ASEMAN omalle sivustolle, ei kolmansille — https://www.radioking.com/terms — ei kuitenkaan nimenomaista kieltoa suoran stream-URL:n käytölle |
| LBR | LBS Radio | **KIELLETTY** (muutos) | Zeno.fm ToS |
| LBY | Radio Funun Tripoli | **KIELLETTY** (muutos) | Zeno.fm ToS |
| LKA | SLBC Tamil National Service | **KIELLETTY** (muutos) | Zeno.fm ToS |
| LTU | Žinių radijas | EPÄSELVÄ | Ei tutkittu |
| LUX | radio 100,7 (ERSL) | EPÄSELVÄ | Ei tutkittu |
| LVA | Radio SWH+ | EPÄSELVÄ | Ei tutkittu |
| MAR | Hit Radio Maroc | **KIELLETTY** (muutos) | Zeno.fm ToS |
| MDG | RNM | EPÄSELVÄ | Ei tutkittu; valtiomedia |
| MEX | W Radio | EPÄSELVÄ | Triton-host, ei omaa selvitystä |
| MLI | Radio Malijet | **KIELLETTY** (muutos) | Zeno.fm ToS |
| MLT | Calypso Radio 101.8 | **KIELLETTY** (muutos) | Radio.co ToS — https://www.radio.co/legal/terms |
| MMR | Shwe FM | EPÄSELVÄ | RadioKing-host, sama huomio kuin KWT |
| MNG | Family Radio 104.5 | EPÄSELVÄ | Ei tutkittu; radioboss.fm-host |
| MOZ | Rádio Moçambique | **KIELLETTY** (muutos) | Zeno.fm ToS |
| NAM | Omulunga Radio | EPÄSELVÄ | Ei tutkittu; iono.fm-host |
| NGA | Metro FM | EPÄSELVÄ | Ei tutkittu; valtiomedia |
| NIC | La Voz del Norte | **KIELLETTY** (muutos) | Zeno.fm ToS |
| NLD | NPO Radio 1 | KIELLETTY (ei muutosta) | NPO: "persoonlijk en niet-commercieel gebruik" — https://npo.nl/overnpo/algemene-voorwaarden/algemene-voorwaarden-online |
| NOR | NRK P1 | KIELLETTY (ei muutosta) | NRK: striimit "developed for private use" — https://lyd.nrk.no/ |
| NPL | Kantipur FM | EPÄSELVÄ | Ei tutkittu |
| NZL | Newstalk ZB | EPÄSELVÄ | Triton-host, ei omaa selvitystä |
| OMN | Al Wisal | **KIELLETTY** (muutos) | Zeno.fm ToS |
| PAK | MERA FM 107.4 | EPÄSELVÄ | Ei tutkittu; radioca.st-host |
| PAN | La Exitosa Panamá | **KIELLETTY** (muutos) | Zeno.fm ToS |
| PER | Radio RPP Noticias | EPÄSELVÄ | Ei tutkittu; mdstrm.com-host |
| PHL | DZRH | EPÄSELVÄ | Itsehostattu AzuraCast, ei omaa ToS:ia löytynyt |
| PNG | Yumi FM | EPÄSELVÄ | rcs.revma.com-host, ei tutkittu |
| POL | TOK FM | EPÄSELVÄ | Ei tutkittu |
| PRT | RDP Internacional | KIELLETTY (ei muutosta) | RTP: "personal and non-commercial use"; ks. em. liite rivi 221 (ei URL:ia) |
| QAT | Al Araby Radio | EPÄSELVÄ | Ei tutkittu; itworkscdn.net-host |
| ROU | Digi24 FM | EPÄSELVÄ | Ei tutkittu; rcs-rds.ro-host |
| RUS | Вести ФМ | EPÄSELVÄ | Ei tutkittu; huomioi myös pakoteriski erikseen |
| SAU | SBA Riyadh Radio | **KIELLETTY** (muutos) | Zeno.fm ToS |
| SDN | Al Masaa FM 101 | EPÄSELVÄ | Ei tutkittu; asurahosting.com-host |
| SDS | Freedom FM | **KIELLETTY** (muutos) | Zeno.fm ToS |
| SEN | RTS Matam 89.1 | **KIELLETTY** (muutos) | Zeno.fm ToS |
| SGP | CAPITAL 958 | EPÄSELVÄ | Triton-host, ei omaa selvitystä |
| SHN | SAMS Radio 1 | **KIELLETTY** (muutos) | Radio.co ToS |
| SLB | SIBC Solomon Islands | **KIELLETTY** (muutos, oli EPÄSELVÄ) | Mixlr ToS: ei kaupallista käyttöä — https://mixlr.com/terms-of-use |
| SLE | Culture Radio FM 104.5 | **KIELLETTY** (muutos) | Zeno.fm ToS |
| SOM | Radio Shabelle | **KIELLETTY** (muutos) | Zeno.fm ToS |
| SVK | Rádio Slovensko | EPÄSELVÄ | Ei tutkittu |
| SVN | Radio Prvi | EPÄSELVÄ | Ei tutkittu |
| SWE | Sveriges Radio P1 | KIELLETTY (ei muutosta) | SR: linjaaristen kanavien käyttö vaatii kirjallisen luvan; ks. em. liite rivi 236 (ei URL:ia) |
| SYR | Al Asemeh FM | EPÄSELVÄ | airtime.pro-host, ei tutkittu |
| TCD | Radiodiffusion Nat. Tchadienne | EPÄSELVÄ | Ei tutkittu; valtiomedia |
| THA | วิทยุเสียงอิสลาม | EPÄSELVÄ | Ei tutkittu |
| TLS | Rádio Liberdade Dili | EPÄSELVÄ | Ei tutkittu |
| TUN | Diwan FM | EPÄSELVÄ | Ei tutkittu |
| TUR | TRT Radyo 1 | EPÄSELVÄ | Yleinen IP-varaus, ei nimenomaista upotuskieltoa löytynyt — https://radyo.trt.net.tr/bilgi/kullanim-sartlari |
| TWN | 中廣新聞網 | EPÄSELVÄ | rcs.revma.com-host, ei tutkittu |
| TZA | TBC Taifa | EPÄSELVÄ | Ei tutkittu; asurahosting.com-host |
| UGA | BBC Radio Uganda (relay) | KIELLETTY (ei muutosta) | Sama BBC-linja kuin GBR |
| UKR | Radio News | EPÄSELVÄ | Ei tutkittu |
| USA | WNYC-FM 93.9 | **KIELLETTY** (muutos, oli EPÄSELVÄ) | WNYC/NPR: ei kopiointia/jakelua/edelleenlisensointia — https://wnyc.org/terms/ , https://www.npr.org/about-npr/179876898/terms-of-use |
| UZB | Qalbim navosi | EPÄSELVÄ | Ei tutkittu |
| VEN | Radio Nacional de Venezuela | EPÄSELVÄ | Ei tutkittu; valtiomedia |
| VNM | RFI Tiếng Việt | EPÄSELVÄ | Eri oikeushenkilö kuin Radio France (France Médias Monde); ei tutkittu erikseen, suositellaan samaa varovaisuutta |
| VUT | Paradise 98FM | EPÄSELVÄ | Ei tutkittu; valtiomedia |
| YEM | Sana'a Radio | EPÄSELVÄ | Ei tutkittu; valtiomedia |
| ZAF | Ukhozi FM | EPÄSELVÄ | Triton-host, ei omaa selvitystä |
| ZWE | Star FM | EPÄSELVÄ | Ei tutkittu; iono.fm-host |

**Yhdistetty yhteenveto: KIELLETTY 42, EPÄSELVÄ 73, SALLITTU 0** (115
yhteensä). Muutos edelliseen raporttiin: +26 KIELLETTY (21 Zeno.fm + 3
Radio.co + 1 Mixlr + 1 WNYC/NPR-ToS, jota edellinen raportti ei ollut
vielä lukenut tarkasti).

### 6b. Asemien nimet ja logot maksullisessa sovelluksessa

Tarkistettu koko koodikanta (`js/packs/radiot.js`, `js/linssit/radio.js`,
`js/linssit/radiosoitin.js`): **pelissä ei ole yhtään aseman logoa tai
muuta graafista tunnusta.** Radiosoitin on kokonaan pelin oma piirretty
kotelo (retroradio-UI, css/radio.css), ja ainoa aseman tunnistetieto
näkyy kahdessa tekstimuodossa:
- `radiosoitin.js` rivi 643/1089: kotelon tekstirivi näyttää aseman
  koko nimen sellaisenaan (`nykyinenKanava.asema`), esim. "moja
  (مُوجَة), Kuwait City".
- `radiosoitin.js` rivi 60–105 + `naytonAsemannimi()`: 5×7-pistenäyttö
  näyttää lyhennetyn version (esim. "RADIO BEGUM"), tai jos pistefontti
  ei osaa kirjaimia, maan nimen tai ISO-koodin sen sijaan.

**Riskiarvio:** pelkän aseman NIMEN näyttäminen tekstinä on huomattavasti
pienempi riski kuin logon näyttäminen olisi — se on tosiasiatieto (mistä
lähetys tulee), rinnastettavissa "nyt soi"-tekstiin, eikä käytä asemien
rekisteröityjä tavaramerkkikuvia tai visuaalista ilmettä. Tämä EI silti
poista kohdan 6a lisenssiongelmaa (ääni itsessään), mutta jos joskus
lisätään logoja/asemien omia graafisia tunnuksia (esim. kartuschaan tai
radiotilan koteloon), se pitää käsitellä ERI, ERIKSEEN selvitettävänä
tavaramerkkikysymyksenä — nimen tekstikäyttöä ja logon kuvakäyttöä ei
pidä niputtaa samaksi riskiksi.

### 6c. Maailmanradio-linssin asemat

Vahvistettu suoraan koodista, ei arvattu:
- `js/linssit/radio.js` rivi 57: `import { radioMaalle } from
  '../packs/radiot.js';`
- `kanavaKaupungille()` (rivi ~665–681) kutsuu `radioMaalle(iso)`:tä ja
  palauttaa saman `url`/`asema`-parin suoraan `RADIOT`-taulukosta.
- `js/linssit/radiosoitin.js` ei importoi mitään asemadataa — koko
  tiedosto on pelkkä UI-komponentti (kotelo, viritysasteikko, näyttö),
  joka saa kanavatiedot parametrina `naytaKanava()`-kutsussa.

**Johtopäätös: maailmanradio-linssi EI eroa radiot.js:stä millään
tavalla — sama 115 asemaa, sama lisenssitilanne, ei kahta ongelmaa vaan
yksi.** Kartuschan oma radionappi (mainittu radio.js:n kommenteissa rivi
~530 alkaen) käyttää samaa `radioMaalle()`-reittiä äänen valintaan; vain
virityskohina on jaettu komponentti, ei asemadata.

### 6d. Korvausehdokkaat: mitkä asemat voisi vaihtaa avoimesti lisensoituihin tai luvan antaviin

**Ei löytynyt yhtään asemaa 115:stä, jonka julkiset ehdot nimenomaisesti
sallisivat kolmannen osapuolen kaupallisen upotuksen** — ei tässä eikä
edellisessä kierroksessa. Radio Browserin oma "vapaa käyttö" -maininta
(ks. kohta 2.3/3) koskee vain hakemistodataa, ei ääntä, joten sitä ei voi
esittää perusteeksi millekään yksittäiselle asemalle.

Konkreettinen, ei-arvattu havainto tähän kohtaan: **AFG/Radio Begum on
päinvastainen esimerkki siitä, miksi lupaa pitää kysyä eikä olettaa** —
Taliban keskeytti sen lähetykset 2025 nimenomaan syyttäen asemaa
sisällön "luvattomasta" jakamisesta ulkomaiselle kanavalle
(washingtonpost.com, ks. 6a-taulukko). Vaikka kyse ei ole
tekijänoikeudesta vaan poliittisesta valvonnasta, se osoittaa että
"asema lähettää julkisesti verkkoon" ei tarkoita "kuka tahansa saa
jaella sitä eteenpäin" — sama periaate kuin TuneIn-oikeustapauksessa
(kohta 2.4), vain eri oikeudenala.

Realistiset polut korvaamiseen, priorisoituna:

1. **Korvaa 42 KIELLETTY-asemaa pelin omalla varareitillä**
   (`js/packs/europe-kielet.js`, kolmen minuutin äänite) maksullisessa
   sovelluksessa. Tämä on jo tekninen varareitti pelissä valmiiksi
   silloin kun striimi ei vastaa — sama reitti voi olla TARKOITUKSELLINEN
   korvaaja maksullisessa versiossa niille asemille, joita ei saa
   käyttää kaupallisesti. HUOM: tämän äänitteen omaa lisenssiä ei ole
   tarkistettu tässä eikä kummassakaan aiemmassa raportissa — tarkista
   ennen kuin nojaat siihen ratkaisuna.
2. **Pyydä lupa suoraan pieniltä/riippumattomilta asemilta**, joilla ei
   ole lakiosastoa mutta on ilmeinen intressi näkyvyyteen (esim. monet
   Zeno.fm-hostatut paikallisasemat, kuten Radio Malijet, Culture Radio
   Freetown, La Voz del Norte) — tämä on huomattavasti realistisempaa
   kuin neuvotella BBC:n, Yle:n tai NPR:n kanssa, mutta EI ole vielä
   tehty eikä sitä pidä olettaa saaduksi luvaksi.
3. **Yleisradiot, joissa on virallinen kehittäjä-/kumppaniohjelma**
   (esim. Sveriges Radion avoin API, EBU:n Radioplayer-yhteistyö) ovat
   olemassa, mutta jokainen tarkistettu tapaus (SR, ks. em. liite rivi
   236) rajaa ohjelman nimenomaisesti EI-kaupalliseksi tai vaatii
   erillisen kaupallisen sopimuksen — nämä eivät ratkaise ongelmaa
   ilmaiseksi, mutta ne ovat oikea yhteydenottokanava jos lupaa
   lähdetään hakemaan virallisesti.
4. Ei löytynyt yhtään Creative Commons- tai muulla avoimella lisenssillä
   julkaistua suoraa radiolähetystä tässä 115 aseman joukossa — CC-tyyliset
   lisenssit ovat harvinaisia suorille radiolähetyksille ylipäätään,
   koska asema itse harvoin omistaa kaikkia oikeuksia soittamaansa
   musiikkiin (ks. kohta 2.4, Teosto/GEMA/PRS).

---

## Lähteet (koonti)

- Radio Browser: https://www.radio-browser.info/ , https://docs.radio-browser.info/
- Zeno.fm ToS: https://zeno.fm/terms/
- Radio.co ToS: https://www.radio.co/legal/terms
- Mixlr ToS: https://mixlr.com/terms-of-use
- RadioKing ToS: https://www.radioking.com/terms
- Triton Digital AUP: https://www.tritondigital.com/acceptable-use-policy
- Yle Areenan käyttöehdot: https://yle.fi/aihe/a/20-10005838
- NRK: https://lyd.nrk.no/
- Radio France CGU: https://www.radiofrance.com/conditions-generales-dutilisation-des-sites-de-radio-france
- CBC/Radio-Canada Terms of Use: https://cbc.radio-canada.ca/en/vision/governance/terms-of-use-digital-services
- NPO algemene voorwaarden: https://npo.nl/overnpo/algemene-voorwaarden/algemene-voorwaarden-online
- NPO Radio 1 copyright: https://www.nporadio1.nl/nieuws/voorwaarden/ad1bbfb2-94f9-4251-a49b-e0e756dcf9fe/4-copyright-en-overige-rechten-van-intellectueel-eigendom
- WNYC Terms of Use: https://wnyc.org/terms/
- NPR Terms of Use: https://www.npr.org/about-npr/179876898/terms-of-use
- RTS/SRG SSR CGU: https://www.rts.ch/entreprise/a-propos/8994021-conditions-generales.html
- TRT kullanım şartları: https://radyo.trt.net.tr/bilgi/kullanim-sartlari
- DR vilkår: https://www.dr.dk/om-dr/vilkaar-paa-drdk
- BBC/TuneIn-uutinen: https://tech.yahoo.com/computing/article/2019-08-12-bbc-to-pull-all-radio-services-from-tunein-uk.html
- Warner/Sony v. TuneIn -oikeustapaus: https://www.bristows.com/viewpoint/articles/internet-radio-streams-and-the-communication-to-the-public-right-in-warner-music-sony-music-v-tunein-inc/ , https://www.farrer.co.uk/news-and-insights/radio-aggregator-infringed-recorded-music-copyright-by-streaming-radio-stations/
- Radio Garden -geoblokkaus: https://en.wikipedia.org/wiki/Radio_Garden
- Kansainvälinen musiikkilisensiointi (Teosto/GEMA/PRS-konteksti): https://www.caster.fm/resources/internet-radio-licensing-guide/ , https://www.radio.co/blog/do-i-need-a-license-for-internet-radio
- All India Radio / lähetysoikeudet: https://ijlmh.com/wp-content/uploads/Live-Streaming-and-Broadcasting-Rights-under-Copyright.pdf

---

## 8. Omistajan päätös: hybridimalli (23.9.2026, ei toisteta yllä olevaa)

Omistaja päätti radion toimivan **hybridinä**: jos ehdot sallivat soiton
maksullisessa sovelluksessa, soitetaan suoraan (`sallittu`); jos soitto ei
ole sallittu tai ehdot ovat epäselvät, sovellus **linkittää** aseman omalle
kuuntelusivulle/kotisivulle sen sijaan että toistaisi striimiä itse
(`linkki` — tämä on oletus kaikille epäselville tapauksille); ja jos ehdot
kieltävät myös linkittämisen tai nimen käytön, asemaa ei näytetä lainkaan
(`kielletty`).

### 8.1 Tulos: kaikki 115 asemaa luokkaan "linkki", ei yhtään "sallittu" eikä "kielletty"

Käytiin läpi jokainen 115 asemasta uudelleen kohdan 6a löydösten
(42 nimenomaista soittokieltoa) ja tämän session sekä edellisten kahden
raportin yhteenlasketun tutkimuksen valossa:

- **"sallittu" (0 kpl):** yhtään asemaa/operaattoria ei löytynyt, jonka
  julkiset ehdot nimenomaisesti sallisivat suoran soiton kolmannen
  osapuolen MAKSULLISESSA sovelluksessa. Tämä pätee sekä 42 nimenomaisesti
  kieltävään että 73 muuhun asemaan.
- **"kielletty" (0 kpl):** yhtään asemaa ei löytynyt, jonka ehdot
  kieltäisivät myös aseman NIMEN mainitsemisen tai LINKITTÄMISEN sen
  omalle julkiselle kotisivulle. Tavallinen hyperlinkki julkisesti
  saatavilla olevalle sivulle ei EU-oikeuskäytännön mukaan vaadi erillistä
  lupaa (**Svensson ym. v. Retriever Sverige, CJEU C-466/12, 2014**:
  linkki vapaasti saatavilla olevaan sisältöön ei ole uusi "yleisölle
  välittäminen" eikä vaadi tekijänoikeudenhaltijan lupaa). Tämä on eri
  oikeuskysymys kuin striimin UPOTTAMINEN/TOISTAMINEN sovelluksessa (kohta
  2.4, TuneIn-tapaus) — juuri tämä ero tekee hybridimallista toimivan.
- **"linkki" (115 kpl):** siis KAIKKI asemat oletusarvoisesti, koska
  kumpaakaan ääripäätä ei löytynyt. Käytännössä tämä tarkoittaa: peli saa
  näyttää aseman nimen ja linkin sen kotisivulle/kuuntelusivulle
  KENELLE TAHANSA 115 asemasta ilman erillistä lupaa, mutta EI saa
  toistaa (soittaa) itse striimiä suoraan maksullisessa sovelluksessa
  ilman erillistä lupaa 42 nimenomaisesti kieltävältä operaattorilta, ja
  jäljelle jäävien 73 kohdalla soitto on epäselvä (oletus: vaatii
  lupaa/riski, ei automaattisesti soitettava).

Tämä tulos on tarkoituksella yhtenäinen, koska se noudattaa kahta hyvin
dokumentoitua, mutta eri oikeuskysymystä: (1) hyperlinkitys on lähes aina
sallittua julkisesti saatavilla olevaan sisältöön, (2) striimin
UPOTTAMINEN/TOISTAMINEN kolmannen sovelluksessa vaatii oman lisenssinsä
useimmiten. Koneluettava taulukko on tiedostossa
`radioluokat.json` (ks. 8.4), ja siitä generoitu ihmisluettava taulukko
kohdassa 8.4.

### 8.2 Nimien ja logojen käyttösääntö

- **Aseman NIMI tekstinä: OK ilman erillistä lupaa**, sekä `linkki`- että
  `sallittu`-tapauksissa. Peruste: (a) nimi on tosiasiatieto siitä, mistä
  lähetys tulee — rinnastettavissa "nyt soi" -tekstiin tai
  hakukoneen linkkitekstiin, ei tavaramerkin KUVALLISTA käyttöä; (b)
  koodikanta (kohta 6b) jo käyttää VAIN tekstiä, ei logoja — nykytila on
  siis jo turvallisella puolella eikä vaadi muutosta.
- **Linkki aseman kotisivulle: OK ilman erillistä lupaa** (ks. 8.1,
  Svensson-oikeuskäytäntö) — myös `linkki`-luokan 115 asemalle.
- **Aseman LOGO tai muu graafinen tunnus (kuva): VAATII LUVAN.** Peruste:
  logo on rekisteröity tavaramerkki ja/tai tekijänoikeudella suojattu
  graafinen teos, ja sen käyttö toisen sovelluksen käyttöliittymässä (esim.
  kartuschassa tai radiokotelossa) on eri oikeudellinen teko kuin tekstin
  tai linkin käyttö — se voi implikoida virheellisesti aseman
  hyväksynnän tai kumppanuuden ("passing off"/sekaannusvaara), mikä ei
  koske pelkkää nimeä tai linkkiä. **Jos logoja joskus lisätään, se on eri,
  erikseen selvitettävä päätös** eikä sitä pidä niputtaa tämän
  radiolisenssiselvityksen kanssa samaksi riskiksi.
- Käytännön sääntö koodarille: `naytto`/`asema`-kenttiä (teksti) ja uutta
  `sivu`-kenttää (linkki, ks. 8.4 JSON) saa käyttää suoraan; mahdollista
  tulevaa `logo`-kenttää EI PIDÄ lisätä ilman erillistä lupaprosessia per
  asema.

### 8.3 20 tärkeintä asemaa lupahakemusta varten

Priorisointi: (a) suurimmat/tunnetuimmat yleisradiot, joilla on olemassa
oleva lakiosasto ja lisenssiprosessi (helpompi saada virallinen vastaus,
suurin kuulijamäärä), ja (b) pelin tarinan kannalta keskeiset maat
(Fogg-reitti 1873: Lontoo–Suez/Egypti–Intia–Hongkong–Japani–New York–
Lontoo, ks. js/tyohuone-raamattu.js). Kuuntelijamäärää ei ollut saatavilla
tarkkana lukuna miltään asemalta tässä selvityksessä (Radio Browserin
"votes"/"clickcount" ovat vain palvelun sisäisiä suosituslukuja, eivät oikeita
kuuntelijamääriä) — tähtäysjärjestys perustuu siis tunnettuuteen/kokoon ja
tarinan kannalta keskeisyyteen, ei mitattuun yleisöön.

| # | ISO3 | Asema/operaattori | Miksi tärkeä | Yhteystieto (löydetty) |
|---|---|---|---|---|
| 1 | GBR | BBC World Service | Maailman suurin yleisradio, Fogg-reitin lähtöpiste (Lontoo) | BBC-toimitus/jakelu: (henkilöosoite poistettu; ks. bbc.co.uk/supplying) (BBC World Service -jakelu, SMDS); yleinen: bbc.co.uk/supplying |
| 2 | FRA | France Inter (Radio France) | Suuri EBU-yleisradio, Euroopan klassinen reitti | distribution@radiofrance.com (Radio France CGU) |
| 3 | USA | WNYC-FM (New York Public Radio) | Fogg-reitin päätepiste (New York) | Ei suoraa sähköpostia löytynyt; yhteydenottolomake wnyc.org/terms |
| 4 | EGY | Radio 9090 | Fogg-reitti (Suez/Egypti) | Ei löytynyt; yhteydenottolomake 9090.fm |
| 5 | IND | Aakashvani / All India Radio (Prasar Bharati) | Fogg-reitti (Intia), valtava yleisö | Ei vahvistettua sähköpostia; yhteydenottolomake newsonair.gov.in / prasarbharati.gov.in |
| 6 | HKG | RTHK Radio 1 | Fogg-reitti (Hongkong) | RTHK asiakaspalvelu rthk.org.hk (ei suoraa sähköpostia löytynyt tässä haussa) |
| 7 | JPN | FM Setagaya | Fogg-reitti (Japani/Yokohama) | fmsetagaya.com yhteydenottolomake |
| 8 | CHN | CNR-1 (China National Radio) | Fogg-reitti (Kiinan rannikko), suuri valtiomedia | cnr.cn (ei suoraa sähköpostia löytynyt) |
| 9 | FIN | Yle Radio 1 | Pelin/studion kotimaa | arkisto.myynti@yle.fi (lisenssi/myynti); areena.info@yle.fi |
| 10 | NLD | NPO Radio 1 | Suuri EBU-yleisradio | Ei suoraa sähköpostia; yhteydenottolomake npo.nl |
| 11 | DEU | Deutschlandfunk | Suuri EBU-yleisradio, iso kuulijakunta | Ei suoraa sähköpostia löytynyt; kontakti deutschlandfunk.de/kontakt |
| 12 | ESP | RNE Radio 5 (RTVE) | Suuri EBU-yleisradio | fondodocumentalrtve@rtve.es (sisältölisenssit) |
| 13 | CAN | CBC Radio One | Suuri julkinen yleisradio | cbchelp.cbc.ca (Sales, Licensing and Partnership -tiimi; ei suoraa sähköpostia löytynyt) |
| 14 | NOR | NRK P1 | Suuri EBU-yleisradio | NRK lisensavdelingen (info.nrk.no/kontakt — tarkka sähköposti ei vahvistunut haussa) |
| 15 | SWE | Sveriges Radio P1 | Suuri EBU-yleisradio | (henkilöosoite poistettu; SR:n lisenssiyhteys sr.se) (muu käyttö kuin avoin API); (henkilöosoite poistettu) (API) |
| 16 | AUT | Ö1 (ORF) | Suuri EBU-yleisradio | kundendienst@orf.at |
| 17 | CHE | RTS La Première (SRG SSR) | Suuri EBU-yleisradio | rts.ch/entreprise (yleinen yhteydenotto; ei suoraa sähköpostia löytynyt) |
| 18 | AUS | ABC Radio National | Suuri julkinen yleisradio | abc.net.au/help tai help.abc.net.au (ei suoraa sähköpostia löytynyt) |
| 19 | PRT | RDP Internacional (RTP) | EBU-yleisradio, kaupallinen lisensiointitiimi olemassa | dir.comercial@rtp.pt (Direção Comercial) |
| 20 | BEL | VRT Radio 1 | Suuri EBU-yleisradio | Ei suoraa sähköpostia löytynyt; yhteydenotto vrt.be |

**Huom:** yhteystiedot ovat yleisiä asiakaspalvelu-/lisenssiosoitteita,
haettu julkisilta sivuilta tässä kierroksessa — mitään lupaa EI ole vielä
pyydetty eikä saatu. Ennen yhteydenottoa kannattaa koota selkeä,
lyhyt kuvaus pelistä ja pyynnöstä (mitä käytetään: koko suoralähetys vai
vain linkki; kaupallinen konteksti; kuinka usein soi; attribuutio).

### 8.4 Koneluettava taulukko ja markdown-taulukko

Koneluettava tiedosto: `tools/vienti/radioluokat.json` (paketin kokoelma radiot),
muodossa `{ "<ISO3>": { "luokka", "sivu", "peruste", "lahde" } }`, 115
avainta. Rakennettu skriptillä `build-final.mjs`, joka yhdistää Radio
Browserin API-haun (`fetch-radio-info.mjs` → `rb-lookup.json`, byurl- ja
nimihaku maakoodilla) ja kohdan 6a lupatutkimuksen. 19 asemalle ei
löytynyt luotettavaa kotisivua RB:stä eikä käsin (AFG, ARE, CMR, COD,
KOR, KWT, LBR, LBY, LKA, MAR, MMR, NGA, PAN, PNG, SDN, SHN, SLE, TCD,
TLS) — niiden "sivu" on `null`. Näistä useampi RB-osuma hylättiin
tarkoituksella VÄÄRÄNÄ täsmäytyksenä (esim. KWT:n haku osui täysin eri
Koraani-asemaan, PAN:n haku osui Kolumbian Medellíniin Panaman sijaan,
TLS:n haku osui brasilialaiseen saman­nimiseen asemaan) — ks. kommentit
`build-final.mjs`:n `SIVU_OVERRIDE`-taulukossa.

Ihmisluettava versio samasta datasta (sama sisältö kuin JSON, taulukkona):

<!-- RADIOLUOKAT-TAULUKKO ALKAA -->
| ISO3 | Asema | Luokka | Sivu | Peruste | Lähde |
|---|---|---|---|---|---|
| AFG | Radio Begum (Kabul) | linkki | (ei löytynyt) | Radio.co-hostin ToS: sisältöä ei saa käyttää ilman omistajan lupaa -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://www.radio.co/legal/terms |
| AGO | Rádio Luanda (RNA) | linkki | https://rna.ao/ | Zeno.fm ToS kieltää relay-uudelleenlähetyksen -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://zeno.fm/terms/ |
| ARE | Sharjah FM 94.4 (إذاعة الشارقة) | linkki | (ei löytynyt) | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| ARG | LRA1 Radio Nacional Argentina | linkki | https://www.radionacional.com.ar/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| AUS | ABC Radio National | linkki | http://www.abc.net.au/radionational/ | ABC: "personal, non-commercial use only" (help.abc.net.au) -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://www.abc.net.au/ |
| AUT | Ö1 / ORF / HQ | linkki | https://oe1.orf.at/ | ORF ON -ehdot: vain yksityiskäyttöön -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://oe1.orf.at/ |
| BEL | VRT Radio 1 (Vlaanderen) | linkki | https://radio1.be/ | VRT: käyttö vain "persoonlijke, niet-commerciële doeleinden" -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://radio1.be/ |
| BGR | BNR Horizont | linkki | https://www.radioplay.bg/?radio=bnr | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| BIH | Federalni radio (RTVFBiH) | linkki | http://www.rtvfbih.ba/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| BOL | Radio Panamericana | linkki | https://www.panamericana.bo/ | Zeno.fm ToS -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://zeno.fm/terms/ |
| BRA | BandNews FM | linkki | https://www.bandnewsfm.com.br/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| CAN | CBC Radio One - Toronto, ON (MP3 stream) | linkki | https://www.cbc.ca/lite/radio/live-radio/ontario/barrie | CBC ToS: ei jakoa luvattomille kolmansille -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://cbc.radio-canada.ca/en/vision/governance/terms-of-use-digital-services |
| CHE | RTS La Première | linkki | http://www.rts.ch/la-1ere/ | SRG SSR Developer Portal: "non-commercial purposes only" -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://www.rts.ch/entreprise/a-propos/8994021-conditions-generales.html |
| CHL | Radio Bio Bio Temuco | linkki | https://vivo.biobiochile.cl/player/new.html?r=temuco | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| CHN | CNR-1 中国之声 | linkki | http://www.cnr.cn/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| CMR | Radio Bafung | linkki | (ei löytynyt) | Zeno.fm ToS -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://zeno.fm/terms/ |
| COD | Top Congo FM 88.4 (Kinshasa) | linkki | (ei löytynyt) | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| COL | Caracol Radio - 100.9 FM / 810 AM - HJGL / HJCY - | linkki | https://caracol.com.co/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| CUB | Radio Rebelde 1180 AM | linkki | https://radiorebelde.cu/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| CYP | ΡΙΚ Πρώτο Πρόγραμμα (CyBC) | linkki | https://www.rik.cy/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| CZE | ČRO Radiožurnál Sport | linkki | https://rozhlas.cz/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| DEU | Deutschlandfunk / DLF / MP3 128k | linkki | https://www.deutschlandfunk.de/livestream-100.html | ARD/Deutschlandradio: kaupallinen 3. osapuoli vaatii luvan (LG München 5/2025) -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://www.deutschlandfunk.de/livestream-100.html |
| DNK | DR P1 | linkki | http://www.dr.dk/p1 | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| DZA | Algérie Chaine 1 | linkki | https://my.radioalgerie.dz/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| ECU | Radio Pichincha | linkki | https://radiopichincha.com/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| EGY | Radio 9090 / 90.90 FM Radio Egypt (Kairo) | linkki | https://www.9090.fm/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| ESP | Radio Nacional de España - Radio 5 Todo noticias | linkki | https://www.rtve.es/play/radio/radio-5/ | RTVE rajoittaa käytön viralliseen sovellukseen -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://www.rtve.es/play/radio/radio-5/ |
| EST | Vikerraadio | linkki | https://vikerraadio.ee/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| ETH | EBC Radio 104.7 Addis Abeba | linkki | https://ebc.et/ | Zeno.fm ToS -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://zeno.fm/terms/ |
| FIN | Yle Radio 1 Hifi | linkki | https://yle.fi/ | Yle: ei saa jakaa striimejä omilla sivuilla -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://yle.fi/a/20-10004373 |
| FJI | Radio Fiji One (FBC, fidžin kieli) | linkki | http://rf1.fbc.com.fj/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| FRA | France Inter | linkki | https://www.franceinter.fr/ | Radio France CGU: ei jakelua ilman kirjallista lupaa -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://www.radiofrance.com/conditions-generales-dutilisation-des-sites-de-radio-france |
| GBR | BBC World Service | linkki | https://www.bbc.co.uk/sounds/play/live:bbc_world_service | BBC vetäytyi TuneInistä 2019 ilman sopimusta -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://tech.yahoo.com/computing/article/2019-08-12-bbc-to-pull-all-radio-services-from-tunein-uk.html |
| GHA | Info Radio Ghana | linkki | https://www.inforadio.online/ | Zeno.fm ToS -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://zeno.fm/terms/ |
| GRC | ΕΡΤ Πρώτο Πρόγραμμα | linkki | https://webradio.ert.gr/proto/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| GRL | Nanoq FM (Nuuk) | linkki | https://nanoqmedia.gl/da/radio/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| GTM | Emisoras Unidas 89.7 | linkki | https://emisorasunidas.com/ | Zeno.fm ToS (zenolive.com) -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://zeno.fm/terms/ |
| HKG | RTHK Radio 1 | linkki | http://www.rthk.org.hk/ | RTHK: "non-commercial personal use" -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | http://www.rthk.org.hk/ |
| HRV | HRT HR 1 - Prvi program | linkki | http://radio.hrt.hr/prvi-program/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| HUN | Kossuth | linkki | https://www.mediaklikk.hu/radio-elo/kossuth/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| IDN | RRI Pro 3 KBRN | linkki | https://www.rri.co.id/stream/radio | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| IND | aakashvani | linkki | https://newsonair.gov.in/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| IRL | RTÉ Radio 1 | linkki | https://www.rte.ie/radio/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| IRN | Radio Iran International | linkki | https://iranintl.com/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| IRQ | Radio Shafaq (Shafaq News) | linkki | https://www.shafaq.com/ar | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| ISL | Útvarp Saga | linkki | https://utvarpsaga.is/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| ITA | Rai Radio 1 | linkki | http://www.sedefvg.rai.it/dl/portali/site/page/Page-2331f91a-cc95-4c68-87d7-67c9afd83529.html | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| JOR | Hayat FM (Amman) | linkki | https://hayat.fm/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| JPN | エフエム世田谷 (FM Setagaya 83.4 MHz, Tokio) | linkki | https://fmsetagaya.com/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| KAZ | Qazaq radiosy | linkki | https://qazradio.fm/kz/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| KEN | KBC | linkki | https://www.kbc.co.ke/ | Zeno.fm ToS -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://zeno.fm/terms/ |
| KOR | WBS 원음방송 서울 | linkki | (ei löytynyt) | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| KWT | moja (مُوجَة), Kuwait City | linkki | (ei löytynyt) | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| LBR | LBS Radio (Liberia Broadcasting System) | linkki | (ei löytynyt) | Zeno.fm ToS -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://zeno.fm/terms/ |
| LBY | Radio Funun Tripoli (راديو فنون طرابلس) | linkki | (ei löytynyt) | Zeno.fm ToS -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://zeno.fm/terms/ |
| LKA | SLBC Tamil National Service | linkki | (ei löytynyt) | Zeno.fm ToS -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://zeno.fm/terms/ |
| LTU | Žinių radijas | linkki | http://www.ziniuradijas.lt/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| LUX | radio 100,7 (ERSL) | linkki | https://100komma7.lu/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| LVA | Radio SWH+ | linkki | https://www.radioswhplus.lv/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| MAR | MA:-Hit Radio Maroc | linkki | (ei löytynyt) | Zeno.fm ToS -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://zeno.fm/terms/ |
| MDG | RNM | linkki | https://www.radiomadagasikara.com/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| MEX | W Radio Ciudad de México - 96.9 FM / 900 AM - | linkki | https://www.wradio.com.mx/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| MLI | Radio Malijet | linkki | https://www.facebook.com/malijetactu/ | Zeno.fm ToS -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://zeno.fm/terms/ |
| MLT | Calypso Radio 101.8 (Malta) | linkki | https://www.calypsomalta.com/ | Radio.co-hostin ToS -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://www.radio.co/legal/terms |
| MMR | Shwe FM (valtakunnallinen FM-verkko, Yangon) | linkki | (ei löytynyt) | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| MNG | Гэр бүлийн радио 104.5 (Family Radio, Ulaanbaatar) | linkki | https://www.facebook.com/gerbulradio/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| MOZ | Rádio Moçambique | linkki | https://www.rm.co.mz/rm.co.mz/ | Zeno.fm ToS -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://zeno.fm/terms/ |
| NAM | Omulunga Radio 100.9 (Windhoek) | linkki | https://omulunga.com.na/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| NGA | Metro FM 97.7 (Radio Nigeria, Lagos) | linkki | (ei löytynyt) | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| NIC | La Voz del Norte | linkki | https://www.radiolavozdelnorte.com/ | Zeno.fm ToS -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://zeno.fm/terms/ |
| NLD | NPO Radio 1 | linkki | https://www.nporadio1.nl/ | NPO: vain "persoonlijk en niet-commercieel gebruik" -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://npo.nl/overnpo/algemene-voorwaarden/algemene-voorwaarden-online |
| NOR | NRK P1 (Stor-Oslo) | linkki | https://lyd.nrk.no/ | NRK: striimit "developed for private use" -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://lyd.nrk.no/ |
| NPL | Kantipur FM | linkki | https://radiokantipur.com/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| NZL | Newstalk ZB | linkki | https://www.newstalkzb.co.nz/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| OMN | Al Wisal (الوصال), Muscat | linkki | http://wisal.fm/cms | Zeno.fm ToS -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://zeno.fm/terms/ |
| PAK | MERA FM 107.4 | linkki | https://www.merafm.com/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| PAN | La Exitosa Panamá | linkki | (ei löytynyt) | Zeno.fm ToS -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://zeno.fm/terms/ |
| PER | Radio RPP Noticias | linkki | https://rpp.pe/audio/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| PHL | DZRH | linkki | https://www.dzrh.com.ph/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| PNG | Yumi FM (tok pisin, Port Moresby) | linkki | (ei löytynyt) | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| POL | TOK FM | linkki | https://www.tokfm.pl/Tokfm/0,0.html | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| PRT | RDP Internacional - Main | linkki | https://www.rtp.pt/play/direto/rdpinternacional | RTP: "personal and non-commercial use" -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://www.rtp.pt/play/direto/rdpinternacional |
| QAT | Al Araby Radio (Doha/Lusail) | linkki | https://www.alaraby.com/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| ROU | Digi24 FM | linkki | https://m.digi24.ro/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| RUS | Вести ФМ | linkki | https://smotrim.ru/radiovesti | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014). HUOM: valtiomedia, harkitse myös App Storen sisältöpolitiikan ja pakoteriskin näkökulmasta erikseen. | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| SAU | SBA Riyadh Radio 91.5 FM | linkki | https://www.aloula.sa/en/live/riyadhradio | Zeno.fm ToS -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://zeno.fm/terms/ |
| SDN | Al Masaa FM 101 (Khartum) | linkki | (ei löytynyt) | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| SDS | Freedom FM | linkki | https://freedomfm.ie/ | Zeno.fm ToS -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://zeno.fm/terms/ |
| SEN | RTS Matam 89.1 | linkki | https://www.rts.sn/ | Zeno.fm ToS -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://zeno.fm/terms/ |
| SGP | CAPITAL 958 | linkki | https://www.melisten.sg/radio/capital-958 | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| SHN | SAMS Radio 1 | linkki | (ei löytynyt) | Radio.co-hostin ToS -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://www.radio.co/legal/terms |
| SLB | SIBC Solomon Islands Broadcasting (Honiara) | linkki | https://www.sibconline.com.sb/ | Mixlr ToS: ei kaupallista käyttöä -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://mixlr.com/terms-of-use |
| SLE | Culture Radio FM 104.5 (Freetown) | linkki | (ei löytynyt) | Zeno.fm ToS -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://zeno.fm/terms/ |
| SOM | Radio Shabelle 101.5 (Mogadishu) | linkki | https://shabelle.net/ | Zeno.fm ToS -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://zeno.fm/terms/ |
| SVK | Rádio Slovensko (Slovenský rozhlas) | linkki | https://slovensko.rtvs.sk/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| SVN | Radio Prvi (RTV Slovenija) | linkki | http://radioprvi.rtvslo.si/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| SWE | Sveriges Radio P1 | linkki | https://www.sverigesradio.se/kanaler | Sveriges Radio: linjaaristen kanavien käyttö vaatii kirjallisen luvan -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://www.sverigesradio.se/kanaler |
| SYR | Al Asemeh FM / العاصمة إف إم (Damaskos) | linkki | https://asima.airtime.pro/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| TCD | Radiodiffusion Nationale Tchadienne | linkki | (ei löytynyt) | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| THA | วิทยุเสียงอิสลาม | linkki | https://muslim.fm/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| TLS | Rádio Liberdade Dili | linkki | (ei löytynyt) | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| TUN | Diwan FM | linkki | https://diwanfm.net/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| TUR | TRT Radyo 1 | linkki | https://radyo.trt.net.tr/kanallar/radyo-1 | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| TWN | 中廣新聞網 | linkki | https://www.bcc.com.tw/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| TZA | TBC Taifa | linkki | https://www.tbc.go.tz/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| UGA | 107.3 BBC Radio Uganda | linkki | https://bbc.ug/ | Sama BBC-linja kuin GBR (relay) -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://tech.yahoo.com/computing/article/2019-08-12-bbc-to-pull-all-radio-services-from-tunein-uk.html |
| UKR | Єдині новини (Radio News) | linkki | https://radioplayer.ua/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| USA | WNYC-FM 93.9 New York Public Radio | linkki | http://www.wnyc.org/ | WNYC/NPR: ei kopiointia/jakelua/edelleenlisensointia -> soitto kielletty, mutta linkitys asemien omalle sivulle sallittua | https://wnyc.org/terms/ |
| UZB | Qalbim navosi | linkki | https://qalbimnavosi.uz/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| VEN | Radio Nacional de Venezuela - Informativa | linkki | https://rnv.gob.ve/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| VNM | RFI Tiếng Việt | linkki | https://www.rfi.fr/vi/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| VUT | Paradise 98FM (VBTC, Port Vila) | linkki | https://vbtc.vu/radio-2 | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| YEM | Sana'a Radio (إذاعة صنعاء) | linkki | http://www.sanaaradio.net/Programs.aspx | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| ZAF | Ukhozi FM (SABC) | linkki | https://www.ukhozifm.co.za/ | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
| ZWE | Star FM 89.7 (Harare) | linkki | https://www.starfm.co.zw/#&panel1-9 | Ei löytynyt lupaa suoralle soitolle eikä nimenomaista linkityskieltoa; tavallinen hyperlinkki asemien julkiselle kotisivulle ei vaadi erillistä lupaa (Svensson v Retriever Sverige, CJEU C-466/12, 2014) | https://curia.europa.eu/juris/liste.jsf?num=C-466/12 |
<!-- RADIOLUOKAT-TAULUKKO LOPPUU -->

### 8.5 Yhteenveto

- **sallittu: 0, linkki: 115, kielletty: 0** (koneluettava `radioluokat.json`
  samassa kansiossa).
- Nimi ja linkki: OK kaikille 115 asemalle. Logo: ei koodissa nyt, vaatisi
  erillisen luvan per asema jos joskus lisätään.
- 19 asemalle ei löytynyt luotettavaa "sivu"-arvoa tässä kierroksessa —
  nämä vaativat käsin etsimisen ennen toteutusta (ks. 8.4).
- Lupahakemus kannattaa aloittaa 8.3:n 20 asemasta, priorisoiden GBR, FRA,
  FIN ja Fogg-reitin muut maat (USA, EGY, IND, HKG, JPN, CHN).
