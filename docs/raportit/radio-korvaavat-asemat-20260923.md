# Korvaavat radioasemat 16 maalle (yleisradio kieltää upotuksen)

Päivätty 2026-09-23 (klo 21.36). Tausta: `docs/raportit/lisenssi-inventaario-20260923-liite-radiot.md`
(origin/main), jonka mukaan 16 maan nykyinen asema on yleisradio, joka kieltää
striimin käytön kolmannen osapuolen kaupallisessa sovelluksessa (DR oli
inventaariossa EPÄSELVÄ, mutta se on tässä mukana tehtävänannon mukaisesti).

## Menetelmä ja luokat

- Ehdokkaat haettiin Radio Browserin API:sta (`de1.api.radio-browser.info`) ja
  asemien omilta sivuilta; ehdot tarkistettiin WebSearch/WebFetchillä ja
  sivujen tekstistä curlilla.
- Jokainen taulukon stream-URL tarkistettiin 23.9.2026 yhdellä GET-pyynnöllä
  (`curl -sL -m 6–10`, kirjattu HTTP-koodi ja Content-Type). "OK" tarkoittaa
  200/206 ja äänen MIME-tyyppiä (audio/mpeg, audio/aac(p) tai HLS-soittolista).
- **Luokat:**
  - **sallittu** = aseman oma sivu julkaisee striimiosoitteen käytettäväksi
    muissa soittimissa tai sovelluksissa, eikä kieltoa löytynyt.
  - **epaselva** = kieltoa ei löytynyt, mutta avointa jakoa ei myöskään
    (tai ehtoja ei saatu luettua). Yhteisöradioilla tämä on lievä epäselvyys,
    kaupallisilla mediayhtiöillä vahvempi.
  - **kielletty** = ehdot kieltävät sisällön käytön ilman kirjallista lupaa tai
    sallivat vain yksityiskäytön.
- **Tärkeä rajaus:** yksikään löydetty asema ei myönnä nimenomaisesti
  *kaupallisen* sovelluksen upotusoikeutta. "Sallittu" tarkoittaa, että asema
  kutsuu käyttämään striimiä muissa soittimissa ja sovelluksissa (esim. 3RRR:
  "in your web browser or preferred media player"). Suositus: lähetä jokaiselle
  valitulle asemalle lyhyt sähköposti ja pyydä kirjallinen kuittaus. Pienet
  yhteisöradiot vastaavat yleensä myöntävästi. Musiikin
  Teosto/Gramex-kysymys (inventaarion kohta 4) koskee näitäkin asemia.
- **iOS-huomio:** App Transport Security estää pelkät http-osoitteet ilman
  poikkeusta. Taulukossa on https-osoite aina kun sellainen toimi. Ogg-striimit
  (Radio FRO, Radio Panik .ogg) hylättiin, koska iOS ei soita niitä
  luotettavasti. Radio Panikille löytyi mp3-versio.

## Maakohtaiset ehdokkaat

### FIN (Yle Radio 1)

| Asema | Kaupunki | Luonne, kieli | Stream-URL (formaatti) | Toimii | Ehdot | Luokka |
|---|---|---|---|---|---|---|
| Radio Helsinki 98,5 | Helsinki | Itsenäinen kaupallinen asema: puhe, kulttuuri, laatumusiikki, uutisia; suomi. Toimiluvan haltija Livelaboratorio Oy (Muusikkojen liiton omistama) | https://stream.radiohelsinki.fi/stream (MP3 256k) | OK 200 audio/mpeg | Kieltoa ei löydetty. Suora striimilinkki on aseman omalla etusivulla. [radiohelsinki.fi](https://www.radiohelsinki.fi/), [omistus fi.wikipedia](https://fi.wikipedia.org/wiki/Radio_Helsinki) | epaselva |
| Radio Moreeni 98,4 | Tampere | Tampereen yliopiston asema: puhe, tiede, kulttuuri, klassinen; suomi | https://moreenistream.tuni.fi/moreeni.mp3 (MP3) | OK 200 audio/mpeg | Kieltoa ei löydetty. Striimi on yliopiston omalla palvelimella. [radiomoreeni.fi](https://radiomoreeni.fi/) | epaselva |

### GBR (BBC World Service)

| Asema | Kaupunki | Luonne, kieli | Stream-URL (formaatti) | Toimii | Ehdot | Luokka |
|---|---|---|---|---|---|---|
| Resonance 104.4 FM | Lontoo | Taide- ja yhteisöradio: puhe, kulttuuri, kokeellinen; englanti | https://stream.resonance.fm/resonance (MP3 192k) | OK 200 audio/mpeg | Kieltoa ei löydetty. Asema on itse jakelussa TuneInissa ja Radioplayerissa. [resonancefm.com](https://www.resonancefm.com/), [media.info](https://media.info/radio/stations/resonance1044fm/listen) | epaselva |
| Times Radio | Lontoo | Kaupallinen uutis- ja puheradio (News UK); englanti | https://timesradio.wireless.radio/stream (AAC 128k) | OK 200 audio/aac | Omia striimiehtoja ei löydetty. Suuri mediakonserni, joten kielto on todennäköinen. [thetimes.co.uk/radio](https://www.thetimes.co.uk/radio) | epaselva |

### UGA (BBC Radio Uganda -relee)

| Asema | Kaupunki | Luonne, kieli | Stream-URL (formaatti) | Toimii | Ehdot | Luokka |
|---|---|---|---|---|---|---|
| Bukedde FM 100.5 | Kampala | Uutiset, puhe, musiikki; luganda (Vision Group, ei UBC) | https://stream.hydeinnovations.com:2020/stream/bukeddefm/stream (MP3 128k) | OK 200 audio/mpeg | Ehtoja ei löydetty. [bukedde.co.ug](https://www.bukedde.co.ug/) | epaselva |
| Akaboozi 87.9 FM | Kampala | "Uganda's Luganda news talk station": uutiset, puhe, keskustelu; luganda | http://162.244.80.52:8732/stream.mp3 (MP3 64k, **vain http**) | OK 200 audio/mpeg (https ei vastaa) | Kieltoa ei löydetty. Sama osoite on aseman omalla sivulla. [akaboozi.com](https://www.akaboozi.com/) | epaselva |

(Varalla: Capital FM Uganda https://capitalfm.cloudrad.io/stream, OK 200, mutta englanninkielinen kaupallinen musiikkiasema.)

### FRA (France Inter)

| Asema | Kaupunki | Luonne, kieli | Stream-URL (formaatti) | Toimii | Ehdot | Luokka |
|---|---|---|---|---|---|---|
| Radio Campus Paris 93,9 | Pariisi | Opiskelija- ja yhdistysradio: puhe, kulttuuri, musiikki; ranska | https://www.radiocampusparis.org/stream/ (MP3 128k) | OK 200 audio/mpeg | Kieltoa ei löydetty. Striimi on aseman omalla domainilla. [radiocampusparis.org](https://www.radiocampusparis.org/) | epaselva |
| Radio Nova | Pariisi | Kaupallinen kulttuuri- ja musiikkiradio; ranska | https://novazz.ice.infomaniak.ch/novazz-128.mp3 (MP3 128k) | OK 200 audio/mpeg | nova.fr:n ehtoja ei saatu luettua (JS-sivu). [nova.fr](https://www.nova.fr/) | epaselva |

(Hylätty: Sud Radio, jonka CGU sallii vain "usage personnel et privé" eikä muuta käyttöä ilman kirjallista lupaa, joten **kielletty**. [sudradio.fr/cgu](https://www.sudradio.fr/conditions-generales-dutilisation-cgu))

### DEU (Deutschlandfunk)

| Asema | Kaupunki | Luonne, kieli | Stream-URL (formaatti) | Toimii | Ehdot | Luokka |
|---|---|---|---|---|---|---|
| ByteFM | Hampuri | Kuratoitu laatumusiikki ja toimitetut ohjelmat; saksa | https://uplink.byte.fm/bytefm-main/mp3-128/ (MP3 128k; asema jakaa sen m3u:ssa https://www.byte.fm/stream/bytefm.m3u) | OK 200 audio/mpeg | Asema ohjeistaa syöttämään striimiosoitteen "in einen anderen Player Ihrer Wahl". Kieltoa ei löydetty. [byte.fm: Wie kann man ByteFM hören?](https://www.byte.fm/blog/news/wie-kann-man-bytefm-hoeren-2-87580/) | sallittu |
| Radio Corax 95,9 | Halle | Vapaa radio: puhe, paikallispolitiikka, kulttuuri; saksa | https://streaming.fueralle.org/corax_192.mp3 (MP3 192k) | OK 200 audio/mpeg | Kieltoa ei löydetty. [radiocorax.de](https://radiocorax.de/) | epaselva |

(Varalla: Radio Dreyeckland, Freiburg, https://stream.rdl.de/rdl, OK 200.)

### ESP (RNE Radio 5)

| Asema | Kaupunki | Luonne, kieli | Stream-URL (formaatti) | Toimii | Ehdot | Luokka |
|---|---|---|---|---|---|---|
| Radio Vallekas 107.5 | Madrid | Yhteisöradio (AMARC-jäsen): uutiset, keskustelu, kulttuuri; espanja | https://radio.radiobot.org/listen/rvk/rvk.mp3 (MP3 128k) | OK 200 audio/mpeg | Kieltoa ei löydetty. [radiovallekas.org](https://www.radiovallekas.org/), [es.wikipedia](https://es.wikipedia.org/wiki/Radio_Vallekas) | epaselva |
| Cuac FM 103.4 | A Coruña | Yhteisöradio: puhe ja musiikki; galicia/espanja | https://streaming.cuacfm.org/cuacfm-128k.mp3 (MP3 128k) | OK 200 audio/mpeg | Kieltoa ei löydetty. [cuacfm.org](https://cuacfm.org/) | epaselva |

(Hylätty: Cadena SER (PRISA). Aviso legal kieltää "reproducción, distribución, comunicación pública … sin autorización previa por escrito", joten **kielletty**. Onda Cero ja COPE ovat suuria konserneja samalla linjalla, eikä niitä tutkittu erikseen.)

### NOR (NRK P1)

| Asema | Kaupunki | Luonne, kieli | Stream-URL (formaatti) | Toimii | Ehdot | Luokka |
|---|---|---|---|---|---|---|
| Radio Nova 99,3 | Oslo | Ei-kaupallinen opiskelijaradio (1982): puhe, kulttuuri, musiikki; norja | https://stream.radionova.no/mp3 (MP3 256k) | OK 200 audio/mpeg | Kieltoa ei löydetty. Asema julkaisee xspf-soittolistan osoitteessa stream.radionova.no. [radionova.no](https://radionova.no/), [xspf](http://stream.radionova.no/mp3.xspf) | epaselva |
| P4 Lyden av Norge | Oslo | Kaupallinen valtakunnallinen asema: uutiset ja pop; norja | https://p4.p4groupaudio.com/P04_MM (MP3 128k) | OK 200 audio/mpeg | Omia striimiehtoja ei löydetty. Kaupallinen konserni. [p4.no](https://www.p4.no/) | epaselva |

### SWE (SR P1)

| Asema | Kaupunki | Luonne, kieli | Stream-URL (formaatti) | Toimii | Ehdot | Luokka |
|---|---|---|---|---|---|---|
| Radio AF 99,1 | Lund | Pohjoismaiden suurin opiskelijaradio: uutiset, puhe, viihde, musiikki; ruotsi | https://stream.rcs.revma.com/e3tha8v4dkhvv (MP3) | OK 200 audio/mpeg | Kieltoa ei löydetty. Osoite on aseman oman sivun soittimessa. [radioaf.se](https://www.radioaf.se/en), [studentradion.se](https://studentradion.se/en_gb/project/radio-af/) | epaselva |
| Radio Sydväst 88,9 (närradio) | Tukholma | Yhdistysten lähiradio: puhe, uutiset, musiikki. **Osin monikielinen** (ruotsi, arabia, persia, espanja) | http://radiosydvast.duckdns.org:12932/stream (MP3 116k, **vain http**) | OK 200 audio/mpeg | Kieltoa ei löydetty. [radiosydvast.se](https://radiosydvast.se/) | epaselva |

(K103 Göteborg ei kelvannut, koska sen julkista suoraa striimiä ei löytynyt, vain Zeno.fm-sivu.)

### DNK (DR P1)

| Asema | Kaupunki | Luonne, kieli | Stream-URL (formaatti) | Toimii | Ehdot | Luokka |
|---|---|---|---|---|---|---|
| Radio4 | Kööpenhamina | Valtakunnallinen puhe- ja uutisradio (public service -luvalla, ei DR); tanska | https://netradio.radio4.dk/radio4 (MP3 128k) | OK 200/206 audio/mpeg | Ehtoja ei löydetty (JS-sivu). [radio4.dk](https://radio4.dk/) | epaselva |
| Radio Viborg | Viborg | Paikallisradio: paikallisuutiset, pop; tanska | https://webradio.radioviborg.dk/viborg (MP3 192k) | OK 200 audio/mpeg | Ehtoja ei löydetty. [radioviborg.dk](https://radioviborg.dk/) | epaselva |

### AUT (Ö1)

| Asema | Kaupunki | Luonne, kieli | Stream-URL (formaatti) | Toimii | Ehdot | Luokka |
|---|---|---|---|---|---|---|
| ORANGE 94.0 | Wien | Vapaa yhteisöradio: puhe, kulttuuri, musiikki; saksa (osin monikielinen) | https://securestream.o94.at/live.mp3 (MP3) | OK 200 audio/mpeg | Asema ilmoittaa virallisen striimiosoitteen "für die Einbindung" ja kertoo striimin olevan "in vielen Streaming-Apps" (hakutulos sivulta o94.at/de/hoeren, jota WebFetch ei saanut auki: 404). [o94.at](https://o94.at/de) | sallittu |
| Radio Helsinki 92,6 | Graz | Vapaa radio: puhe, kulttuuri, musiikki; saksa | https://live.helsinki.at:8088/live160.mp3 (MP3 160k) | OK 200 audio/mpeg | Kieltoa ei löydetty. [helsinki.at](https://helsinki.at/) | epaselva |

(Radio FRO Linz hylättiin, koska vain Ogg-muoto toimi ja mp3-osoite palautti 404.)

### CHE (RTS La Première)

| Asema | Kaupunki | Luonne, kieli | Stream-URL (formaatti) | Toimii | Ehdot | Luokka |
|---|---|---|---|---|---|---|
| Radio RaBe 95,6 | Bern | Kulttuuriradio ilman mainoksia: puhe, kulttuuri, musiikki; saksa | https://stream.rabe.ch/livestream/rabe-mid.mp3 (MP3 192k; myös rabe-hd.mp3 320k) | OK 200 audio/mpeg | Aseman sivu listaa striimiosoitteet ja kertoo, että RaBea voi kuunnella "auf Radioapps wie … TuneIn". Rajoituksia ei mainita. [rabe.ch/empfangen](https://rabe.ch/empfangen), [stream.rabe.ch](https://stream.rabe.ch/) | sallittu |
| Radio Vostok | Geneve | Yhdistysradio: kulttuuri, musiikki; ranska (korvaa ranskankielisen RTS:n kieliryhmän) | https://radiovostok.ice.infomaniak.ch/radiovostok.aac (AAC+ 96k) | OK 200 audio/aacp | Kieltoa ei löydetty. [radiovostok.ch](http://www.radiovostok.ch/) | epaselva |

(Varalla: Radio LoRa, Zürich, https://livestream.lora.ch/lora.mp3, OK 200.)

### NLD (NPO Radio 1)

| Asema | Kaupunki | Luonne, kieli | Stream-URL (formaatti) | Toimii | Ehdot | Luokka |
|---|---|---|---|---|---|---|
| BNR Nieuwsradio | Amsterdam | Kaupallinen uutis- ja talousradio (FD Mediagroep); hollanti. Vastaa sisällöltään parhaiten NPO Radio 1:tä | https://stream.bnr.nl/bnr_mp3_128_20 (MP3 128k; myös AAC 96k) | OK 200 audio/mpeg | BNR julkaisee artikkelin "BNR stream-URL's voor losse devices", jonka mukaan striimiä voi käyttää "in je favoriete app". Rajaehtoja ei nähty, koska sivu palautti WebFetchille 403. [bnr.nl](https://www.bnr.nl/nieuws/media/10429287/bnr-stream-urls-voor-losse-devices) | sallittu |
| Concertzender | Utrecht | Klassinen, vanha musiikki ja jazz, toimitettu; hollanti | http://streams.greenhost.nl:8080/bach (MP3 128k, **vain http**) | OK 200 audio/mpeg (https ei vastaa) | Ehtoja ei löydetty. [concertzender.nl](https://www.concertzender.nl/) | epaselva |

### BEL (VRT Radio 1)

| Asema | Kaupunki | Luonne, kieli | Stream-URL (formaatti) | Toimii | Ehdot | Luokka |
|---|---|---|---|---|---|---|
| Urgent.fm 105.3 | Gent | Yhteisöradio: puhe, kulttuuri, musiikki; hollanti (flaami) | https://urgentstream.radiostudio.be/live (MP3) | OK 200 audio/mpeg | Kieltoa ei löydetty. Striimilinkit (/live, /aac) ovat aseman etusivulla. [urgent.fm](https://urgent.fm/) | epaselva |
| Radio Campus Bruxelles 92.1 | Bryssel | Yliopiston yhteisöradio: puhe, kulttuuri, musiikki; ranska | https://www.radiocampus.be/stream/stream.mp3 (MP3 128k) | OK 200 audio/mpeg | Kieltoa ei löydetty. Mp3-, aac- ja ogg-linkit ovat aseman etusivulla. [radiocampus.be](https://www.radiocampus.be/) | epaselva |

(Varalla: Radio Panik, Bryssel, https://streaming.domainepublic.net/radiopanik.mp3, OK 200.)

### PRT (RDP Internacional)

| Asema | Kaupunki | Luonne, kieli | Stream-URL (formaatti) | Toimii | Ehdot | Luokka |
|---|---|---|---|---|---|---|
| RUC – Rádio Universidade de Coimbra 107.9 | Coimbra | Portugalin vanhin yliopistoradio: puhe, kulttuuri, musiikki; portugali | https://stream.ruc.pt/high (MP3) | OK 200 audio/mpeg | Kieltoa ei löydetty. [ruc.pt](https://ruc.pt/) | epaselva |
| Rádio Renascença | Lissabon | Katolinen kaupallinen valtakunnallinen: uutiset, puhe; portugali | http://playerservices.streamtheworld.com/api/livestream-redirect/RADIO_RENASCENCA.mp3 (MP3 64k) | OK 206 audio/mpeg | Ehtoja ei tarkistettu. Iso mediayhtiö, joten kielto on todennäköinen. [rr.sapo.pt](https://rr.sapo.pt/) | epaselva |

(Hylätty: Rádio Observador, jonka ehtojen mukaan sisältöä "não pode ser utilizado sem o consentimento … exceto para os fins de utilização privada", joten **kielletty** ([observador.pt/termos-e-condicoes](https://observador.pt/termos-e-condicoes/)). Hylätty myös TSF Rádio Notícias (Global Media Group), joka kieltää lähetyksen "commercial or non-commercial" ilman lupaa, joten **kielletty** ([tsf.pt/termos-e-condicoes](https://www.tsf.pt/termos-e-condicoes/)).)

### CAN (CBC Radio One)

| Asema | Kaupunki | Luonne, kieli | Stream-URL (formaatti) | Toimii | Ehdot | Luokka |
|---|---|---|---|---|---|---|
| CFRO Vancouver Co-op Radio 100.5 | Vancouver | Osuuskuntaradio: puhe, yhteiskunta, kulttuuri; englanti | https://listen-coopradio.sharp-stream.com/coopradio.mp3 (MP3 128k) | OK 200 audio/mpeg | Kieltoa ei löydetty. Suora mp3-linkki on aseman etusivulla. [coopradio.org](https://www.coopradio.org/) | epaselva |
| CKUT 90.3 | Montreal | McGillin kampus- ja yhteisöradio: uutiset, puhe, musiikki; englanti ja ranska | https://ckut.out.airtime.pro/ckut_a (MP3 192k) | OK 200 audio/mpeg (delray.ckut.ca:8001 ei vastannut) | Kieltoa ei löydetty. [ckut.ca/listen-live](https://ckut.ca/listen-live/) | epaselva |

(Varalla: CIUT 89.5 Toronto, https://ice23.securenetsystems.net/CIUT, OK 200 audio/aacp, mutta vain 32k.)

### AUS (ABC Radio National)

| Asema | Kaupunki | Luonne, kieli | Stream-URL (formaatti) | Toimii | Ehdot | Luokka |
|---|---|---|---|---|---|---|
| 3RRR Triple R 102.7 | Melbourne | Itsenäinen yhteisöradio: puhe, kulttuuri, musiikki; englanti | https://ondemand.rrr.org.au/getstream?id=wsmq (MP3 128k; myös AAC id=wshq) | OK 200 audio/mpeg | Aseman sivu "Other ways to listen" antaa suorat osoitteet: "should allow you to select one of our streams to play in your web browser or preferred media player". Kieltoa ei löydetty. [rrr.org.au/streaming-apps](https://www.rrr.org.au/streaming-apps) | sallittu |
| 3CR 855 AM | Melbourne | Yhteisöradio: puhe, yhteiskunta, kulttuuri; englanti | https://playerservices.streamtheworld.com/api/livestream-redirect/3CR.mp3 (MP3 128k) | OK 206 audio/mpeg | Kieltoa ei löydetty. [3cr.org.au](https://www.3cr.org.au/) | epaselva |

(2SER Sydney hylättiin, koska sen Radio Browser -osoite on kolmannen osapuolen relee eikä aseman sivua saatu auki: 403/429.)

### HKG (RTHK Radio 1)

| Asema | Kaupunki | Luonne, kieli | Stream-URL (formaatti) | Toimii | Ehdot | Luokka |
|---|---|---|---|---|---|---|
| D100 | Hongkong (internetradio) | Itsenäinen puheradio (Albert Cheng): ajankohtaiset, keskustelu; kantoninkiina | https://streaming.live365.com/a91285 (MP3 192k, Live365-alusta) | OK 200 audio/mpeg | Ehtoja ei löydetty. Asema jakaa striiminsä TuneInissa ja Radio Gardenissa. [d100radio.com](https://www.d100radio.com/), [en.wikipedia](https://en.wikipedia.org/wiki/D100_Radio) | epaselva |
| Metro Plus 1044 (新城) | Hongkong | Kaupallinen: uutiset, viihde, osin englanti; kantonin | http://162.220.162.10:8011/stream (MP3 128k, **vain http, IP-osoite**) | OK 200 audio/mpeg | Ehtoja ei löydetty. Metro on aiemmin vaatinut kirjautumisen striimiin, eikä IP-osoitteen virallisuutta voitu varmistaa. [metroradio.com.hk](https://www.metroradio.com.hk/) | epaselva |

(Hylätty: Commercial Radio 881/903, koska Radio Browserin osoite on epävirallinen välityspalvelin (fishtv.dpdns.org). Sen käyttö olisi käytännössä **kielletty**.)

## Yhteenveto

Luokat 32 päätaulukon ehdokkaalle:

- **sallittu: 5.** ByteFM (DEU), ORANGE 94.0 (AUT), Radio RaBe (CHE), BNR Nieuwsradio (NLD) ja 3RRR (AUS). Nämä asemat jakavat striimiosoitteensa itse muita soittimia tai sovelluksia varten.
- **epaselva: 27.** Kieltoa ei löytynyt. Näistä noin 20 on yhteisö-, opiskelija- tai yliopistoradioita (lievä epäselvyys) ja noin 7 kaupallisen mediayhtiön asemia (Times Radio, Radio Nova FR, P4, Radio4, Renascença, Metro, Radio Helsinki).
- **kielletty: 0** päätaulukossa. Hylätyt kielletyt vaihtoehdot: Sud Radio, Cadena SER, Rádio Observador, TSF ja CRHK:n epävirallinen välitys.
- Kaikki 32 päätaulukon striimiä vastasivat 23.9.2026. Http-only-osoitteita on neljä (Akaboozi, Radio Sydväst, Concertzender, Metro Plus). Ne tarvitsevat iOS:ssä ATS-poikkeuksen.

Suositus per maa (ensisijainen asema, luokka):

| Maa | Suositus | Luokka |
|---|---|---|
| FIN | Radio Helsinki 98,5 | epaselva (kysy lupa sähköpostilla) |
| GBR | Resonance 104.4 FM | epaselva (yhteisöradio, kysy lupa) |
| UGA | Bukedde FM (luganda, https) | epaselva |
| FRA | Radio Campus Paris | epaselva (yhdistysradio) |
| DEU | ByteFM | sallittu |
| ESP | Radio Vallekas | epaselva (yhteisöradio) |
| NOR | Radio Nova Oslo | epaselva (opiskelijaradio) |
| SWE | Radio AF Lund | epaselva (opiskelijaradio) |
| DNK | Radio4 | epaselva (kysy lupa) |
| AUT | ORANGE 94.0 | sallittu |
| CHE | Radio RaBe | sallittu |
| NLD | BNR Nieuwsradio | sallittu |
| BEL | Urgent.fm | epaselva (yhteisöradio) |
| PRT | RUC Coimbra | epaselva (yliopistoradio) |
| CAN | CFRO Co-op Radio | epaselva (osuuskuntaradio) |
| AUS | 3RRR | sallittu |
| HKG | D100 | epaselva (heikoin maa, ei luotettavaa vaihtoehtoa) |

Seuraava askel: yksi lyhyt englannin- tai paikalliskielinen lupapyyntö 17
suositusasemalle ("kaupallinen iOS-peli soittaa suoraa julkista striimiänne
sellaisenaan, nimellä ja linkillä, ilman tallennusta"). Kirjallisen
kuittauksen jälkeen luokka nousee sallituksi.
