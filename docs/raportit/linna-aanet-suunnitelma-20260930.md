# Olavinlinnan äänimaisema: suunnitelma ja lähteet (Linnanrakentaja 30.9.2026)

Päätoimittajan erä 30.9. Kaikki valmistellaan nyt, mutta **kytkentä peliin vasta omistajan OK:n jälkeen**
(käsikirjoitus `docs/raportit/linna-elava-kasikirjoitus-20260929.md`, kohdat 1–3 ja 6). Äänilähteet ovat vain CC0- tai
PD-lisenssillä, ja kunkin lisenssi ja URL on kohdassa 4. mp3- ja AAC-tiedostot eivät tule repoon: ne kulkevat
ämpäriin polkuun `dioraama/olavinlinna/aanet/v<versio>/<id>.mp3` (VARTIO), ja pankki on `js/dioraama/pankit/aanet.js`.

## 1. Yhteiset säännöt

- **Kerrokset:** (A) huoneen silmukat 1–3 kpl (tilan `aanet[]`), (B) satunnaiset kerta-äänet (`tehosteet[]` +
  `valit_s`) ja (C) puhe (hahmojen repliikit ja Pulu). Puhe painaa silmukat 6 dB alemmas (ducking 0,3 s sisään
  ja 0,6 s ulos).
- **Siirtymät:** kohteen napautus → leikkausikkunalento 0,8–1,2 s. Ulkoäänet laskevat −12 dB:iin 1,0 s:ssa, ja
  huoneen silmukat nousevat nollasta tavoitteeseen 1,2 s:ssa (equal-power). Paluu yleisnäkymään toimii käänteisesti
  1,0 s:ssa. Huoneesta toiseen siirryttäessä ristihäivytys kestää 1,0 s.
- **Voimakkuus:** lineaarisena kertoimena tilan `aanet[].voimakkuus` ja `tehosteet[].voimakkuus` (pankissa 1).
  Tasoitus on sama kuin keittiön toimituksessa 29.9.: silmukat ja laulu −23 LUFS (yksi lineaarinen vahvistus
  mittauksesta, huippu enintään −1 dBFS valmiista mp3:sta) ja kerta-äänet huippu −6 dBFS. Silloin kertoimet ovat
  vertailukelpoisia keittiön äänien kanssa.
- **Silmukat:** 20–30 s, saumaton (loppu ristihäivytetään alkuun 1,5 s, ffmpeg `acrossfade`), ja alku ja loppu
  leikataan nollakohtaan.
- **Mobiilikoodaus:** silmukat ja tehosteet mono mp3 64 kbit/s. Puhe säilyy alkuperäisenä (ks. alla).
  Kappelin laulu on stereona 96 kbit/s. **Puhetta (hahmot, Pulu, kertoja) ei koodata uudelleen** (Päätoimittaja 30.9.):
  alkuperäinen 192 kbit/s tai vähintään 128 kbit/s mono. Keittiön 31 ääntä pysyvät ämpärissä alkuperäisinä.

## 2. Äänimaisema huoneittain

Uudet id:t on **lihavoitu**. Muut ovat pankissa jo (keittiön toimitus 29.9.). Kertoimet ovat lähtöarvoja, jotka
hiotaan laitteella.

| Tila | Silmukat (kerroin) | Kerta-äänet (väli s, kerroin) | Häivytys ja huomiot |
|---|---|---|---|
| Saapuminen (18 s) | jarvi-laineet 0,7 · linna-tuuli 0,5 | lokit t = 4 ja 11 s (0,6) · kellot-kaukaa t = 9 s (0,4) · **soihtu-syttyy** ×3 soihtujen tahdissa (0,4) | laineet nousevat 3 s:ssa, ja lopussa tuuli laskee yleisnäkymän tasolle 2 s:ssa |
| Yleisnäkymä | linna-tuuli 0,45 · jarvi-laineet 0,35 · **soihtu-ratina** 0,15 · **keskushalli-ambienssi** 0,08 | lokit 20–45 (0,5) · **laulu-kaukaa** 45–90 (0,18) · kellot-kaukaa 90–180 (0,3) | "hiljainen laulu kaukaa" ja "valo ja sorina" käsikirjoituksen taulukosta vuotavat hiljaa ulos |
| Keittiö | keittio-ambienssi 1 · tulisija-ratina 0,8 · pata-poreilu 0,6 · vaivaaminen 0,5 | nykyiset (pilkkominen 4–9, askel/ovi/sanko 12–25) | valmis, alkuperäiset 192 kbit/s säilyvät |
| Kappeli | **kappeli-ambienssi** 0,6 · **kynttila-ratina** 0,3 | **laulu-kaukaa** 20–40 (0,35) · **kello-kappeli** 60–120 (0,4) · askel-kivi 25–50 (0,3) | pitkä kaiku lähteessä. Laulu on PD-äänite (kohta 4), ei generoitu |
| Keskushalli ja väentupa | **keskushalli-ambienssi** 0,7 · **takka-ratina** 0,6 | **pikari-1/2** 6–14 (0,5) · **noppa-1/2** 10–20 (0,5) · **penkki** 15–30 (0,4) · askel-puu/kivi 8–18 · ovi-puu 25–50 | sorina ilman erottuvia sanoja. Repliikit duckaavat |
| Vartiotupa | **vartiotupa-ambienssi** 0,7 | **noppa-1/2** 8–16 (0,5) · **keihas-kolahdus** 20–40 (0,4) | pieni tulisija ja hiljainen puhe |
| Fatabuuri (vaate- ja tavara-aitta) | **fatabuuri-ambienssi** 0,6 | **tippa** 6–14 (0,35) · **arkku-kansi** 30–60 (0,4) · **sivu-kaanto** 15–30 (0,35) · askel-kivi 10–22 | era3-tilauksen tynnyri-kansi ja sakki-lasku jäävät pois, koska fatabuuri ei ole ruokavarasto (korjaus 29.9.). Tilalle tulee arkku-kansi |
| Kierreportaat | **porras-kaiku** 0,6 · linna-tuuli 0,3 · **soihtu-ratina** 0,3 | **askel-porras-1/2** 5–10 (0,6) | lyhty ampumaraoissa, ja tuuli kuuluu raoista |
| Muurinharja | **muuri-tuuli** 0,8 · **soihtu-ratina** 0,45 · jarvi-laineet 0,25 | askel-kivi 6–12 (0,5, vartija) · lokit 20–40 (0,5) | ainoa tila, jossa tuuli hallitsee |
| Laituri | **laituri-laineet** 0,8 · linna-tuuli 0,4 | **airot** 15–30 (0,5) · **koysi-narina** 10–25 (0,4) · lokit 20–40 (0,5) | vene narisee laineissa |

**Uusia ääniä 26 kpl:** 9 silmukkaa (keskushalli-ambienssi, takka-ratina, kappeli-ambienssi, kynttila-ratina,
vartiotupa-ambienssi, fatabuuri-ambienssi, porras-kaiku, muuri-tuuli, laituri-laineet), 1 laulu (laulu-kaukaa,
kerta-ääni, noin 30–45 s, soitetaan väleissä), soihtu-ratina (silmukka) ja 15 kerta-ääntä.

## 3. Kokobudjetti (mono 64 kbit/s = 8 kt/s)

| Ryhmä | Kesto | Koko |
|---|---|---|
| 10 uutta silmukkaa (sis. soihtu-ratina) × noin 25 s | 250 s | 2,0 Mt |
| laulu-kaukaa, stereo 96 kbit/s, 40 s | 40 s | 0,5 Mt |
| 15 uutta kerta-ääntä × noin 2,5 s | 38 s | 0,3 Mt |
| Keittiön 31 ääntä alkuperäisinä (192 kbit/s, ei uudelleenkoodausta) | noin 150 s | 4,2 Mt |
| **Uudet yhteensä (mitattu)** | | **2,8 Mt**; keittiön äänet ovat jo ämpärissä |

Puhe (taulujen kohdat, repliikit ja Pulu) ei sisälly tähän, vaan tulee omana eränään, kun tekstit ovat valmiit.
Noin 90 repliikkiä × 5 s × 8 kt/s on noin 3,6 Mt.

## 4. Lähteet ja lisenssit

**Alkuperä (omistajan ehto 30.9.: ei tekoälyllä luotuja):** jokaisen Freesound-sivun kuvaus on tarkistettu 30.9.
Yksikään ei ole tekoälyllä tai generatiivisella työkalulla tuotettu. 20 on äänitetty mainitulla laitteella (Zoom, EM172,
Sony, Tascam ym.), ja muissa ei ole laitemainintaa mutta ne ovat kenttä- tai studioäänitteitä. Kappelin laulu on
Membethin oma äänite. Tänään ei ole generoitu mitään ElevenLabsilla, xAI:lla tai muulla.

Freesound-lähteet ovat **CC0 1.0**. Lisenssi on tarkistettu jokaisen äänisivun lähdekoodista
(creativecommons.org/publicdomain/zero/1.0), ja käytetty tiedosto on sivun HQ-esikuuntelu (cdn.freesound.org/previews).
Kopiot ovat kansiossa `proto-3d/_lahteet/aanet-linna/freesound/<id>.mp3`. CC0 ei vaadi mainintaa, mutta tekijät
luetellaan tässä.

| Oma id | Lähde (tekijä, Freesound-id) | URL | Käsittely |
|---|---|---|---|
| keskushalli-ambienssi | kyles 451600 | https://freesound.org/people/kyles/sounds/451600/ | kaukainen väkijoukko isossa tilassa, alipäästö 900 Hz (vain vokaalien sointi jää, sanat eivät erotu), holvikaiku. hz37 393689 poistettu 30.9., koska tekijän mukaan puhe erottuu osittain |
| takka-ratina | schulmancreative 414298 (eri jakso kuin soihtu-ratinassa) | https://freesound.org/people/schulmancreative/sounds/414298/ | sellaisenaan. 766540 poistettu 30.9., koska se on koostettu kahdesta muusta näytteestä, joiden lisenssejä ei tarkistettu |
| soihtu-ratina | schulmancreative 414298 | https://freesound.org/people/schulmancreative/sounds/414298/ | ylipäästö 250 Hz, kaksivaiheinen kompressori naksahduksille |
| kynttila-ratina | NickTayloe 813328 | https://freesound.org/people/NickTayloe/sounds/813328/ | ylipäästö 400 Hz |
| kappeli-ambienssi | AAEPGranollers 157375 | https://freesound.org/people/AAEPGranollers/sounds/157375/ | kirkon hiljaisuus, ylipäästö 60 Hz |
| vartiotupa-ambienssi | Vrymaa 770108 | https://freesound.org/people/Vrymaa/sounds/770108/ | tulisija kivikaiulla, ei puhetta. 675177 poistettu 30.9. (puhetta, digitoitu elokuva-arkisto) |
| fatabuuri-ambienssi | leonelmail 427862 + xkeril 628404 | https://freesound.org/people/leonelmail/sounds/427862/ · https://freesound.org/people/xkeril/sounds/628404/ | huonesävy + pisarat −10 dB holvikaiulla |
| porras-kaiku | Tonmeister88 557380 | https://freesound.org/people/Tonmeister88/sounds/557380/ | tuuli tyhjässä kivikirkossa, alipäästö 3,5 kHz |
| muuri-tuuli | xkeril 708747 | https://freesound.org/people/xkeril/sounds/708747/ | tornin tuuli |
| laituri-laineet | TRP 573171 + Rmutt 145721 | https://freesound.org/people/TRP/sounds/573171/ · https://freesound.org/people/Rmutt/sounds/145721/ | järven laineet + köysi ja lautta −12 dB |
| kello-kappeli | wuola 144496 | https://freesound.org/people/wuola/sounds/144496/ | keskiaikainen kellosarja, kivikaiku |
| askel-porras-1 / -2 | TRP 616615 · Sadiquecat 811375 | https://freesound.org/people/TRP/sounds/616615/ · https://freesound.org/people/Sadiquecat/sounds/811375/ | voimakkain 3 s:n ikkuna |
| tippa | LordFluffeh 478547 | https://freesound.org/people/LordFluffeh/sounds/478547/ | linnan viemärin pisara |
| noppa-1 / -2 | ekfink 235489 · H_Botha 764367 | https://freesound.org/people/ekfink/sounds/235489/ · https://freesound.org/people/H_Botha/sounds/764367/ |  |
| airot | bruno.auzet 525030 | https://freesound.org/people/bruno.auzet/sounds/525030/ | Schoeps ORTF + Tascam DAP1, Marne 2007. 438846 poistettu 30.9. (digitoitu elokuva-arkisto) |
| koysi-narina | Rmutt 145721 | https://freesound.org/people/Rmutt/sounds/145721/ |  |
| pikari-1 / -2 | Jae-Aye 528898 | https://freesound.org/people/Jae-Aye/sounds/528898/ | kaksi eri kolahdusta, kivikaiku |
| penkki | kyles 637357 | https://freesound.org/people/kyles/sounds/637357/ | vanha puutuoli, kivikaiku |
| sivu-kaanto | esperri 119127 | https://freesound.org/people/esperri/sounds/119127/ | kirjan sivu |
| keihas-kolahdus | loganzsound 774269 | https://freesound.org/people/loganzsound/sounds/774269/ | puutanko lattiaan, kivikaiku |
| arkku-kansi | The_Frisbee_of_Peace 573653 | https://freesound.org/people/The_Frisbee_of_Peace/sounds/573653/ | arkun salvat |
| soihtu-syttyy | DanielVega 479338 | https://freesound.org/people/DanielVega/sounds/479338/ | Torch.wav |
| laulu-kaukaa | Membeth: *Ecce lignum Crucis* (gregoriaaninen, VI sävelmä), Wikimedia Commons, **{{PD-self}}** | https://commons.wikimedia.org/wiki/File:Ecce.lignum.Crucis.ogg | kolme kerrosta (±0,4 % vire, 38 ja 71 ms viive) → pieni schola, alipäästö 2,2–2,6 kHz ja holvikaiku, häivytys 2 s + 4 s |

Keittiön 29.9. äänet (31 kpl, ElevenLabs, oma tuotanto, pankissa merkintä "CC0 (oma tuotanto)") pysyvät ennallaan
alkuperäisinä 192 kbit/s:n tiedostoina (ämpäri tarkistettu 30.9.: md5 = toimitus).

Varalla (ladattu, ei käytössä): kyles 450347 (vanha puuovi, lukko ja salpa), Commonsin Membeth *Rorate* ja
*Veni creator* (PD-self) sekä Bautsch *Factus est repente* (CC0).

**Tuotos:** `proto-3d/_valmiit/linna-aanet/v1/`, jossa `dioraama/olavinlinna/aanet/` sisältää 26 uutta mp3:ta (2,8 Mt),
`aanet.json` ja `kestot.json` 26 uudesta äänestä, ja `kuuntelu/` sisältää 9 tilan 30 s:n koosteet omistajalle.
Skripti: `tools/dioraama/linna-aanet.mjs` (`--koosteet` tekee koosteet).
Ääniä ei ole kuunneltu Clauden toimesta: tasot on mitattu, mutta sisältö (sanojen erottuvuus sorinassa ja
kaikujen luonnollisuus) tarkistetaan korvalla koosteista.

## 5. Pulun repliikit

Nykyinen data (`js/dioraama/rakennukset/olavinlinna/*.js`): jokaisessa tilassa on 3 tarkistettua taulun kohtaa
(Pulun kertomina) ja yksi Pulun reaktio hahmoa kohden, yhteensä 19 reaktiota. Ne tarvitsevat vain äänen.

**Uudet hetket (Päätoimittaja 30.9.):** Pulu sinuttelee Foggia, ja tunnelma välittyy ilman faktoja. Tagi suluissa,
yksi tagi virkettä kohden, ei softly/whispers. Puheet generoidaan vasta omistajan linnakatselmoinnin jälkeen, ja
säästösyistä vain säilöttävät tekstit Pulun oletusäänellä. Id:t ovat ehdotuksia Pelikoodarin kytkentää varten.

| # | Id | Hetki | Enint. | Teksti (tagi) |
|---|---|---|---|---|
| P1 | pulu-saapuminen | saapumislennon loppu, 1. käynti | 6 s | (warmly) Olavinlinna hämärässä. Soihdut sytytettiin juuri meitä varten! |
| P2 | pulu-paluu-linnaan | toinen käynti | 3 s | (amused) Taas täällä! Muurit muistavat. |
| P3 | pulu-yleis-vihje | yleisnäkymä, kohde sykkii, 1. kerta | 5 s | (mischievously) Tuolla jokin sykkii. Minä en kurkistaisi… mutta sinä voit. |
| P4 | pulu-tulo-keittio | huoneeseen tulo, 1. kerta | 4 s | (amused) Täällä tuoksuu savu, leipä ja kiire. |
| P5 | pulu-tulo-kappeli | 〃 | 4 s | (warmly) Täällä jopa minä lasken ääntäni. |
| P6 | pulu-tulo-keskushalli | 〃 | 4 s | (amused) Hälinää, kolinaa ja joku nauraa aina liian kovaa. |
| P7 | pulu-tulo-vartiotupa | 〃 | 4 s | (warmly) Vartijoilla on kylmät jalat ja tarkat silmät. |
| P8 | pulu-tulo-fatabuuri | 〃 | 4 s | (mischievously) Kankaiden keskellä voisi piillä mitä tahansa. |
| P9 | pulu-tulo-kierreportaat | 〃 | 4 s | (amused) Ylös, alas, ympäri – onneksi minulla on siivet. |
| P10 | pulu-tulo-muurinharja | 〃 | 4 s | (warmly) Tuuli tuo järven tuoksun. Tästä näkee kauas. |
| P11 | pulu-tulo-laituri | 〃 | 4 s | (warmly) Laineet ja airot – linnaan tullaan vettä pitkin. |
| P12 | pulu-sinetti-keittio | etsinnän alku (kokin sinetti-repliikin jälkeen) | 5 s | datassa jo: "Keitto ja iltamessu – vouti hoiti sekä vatsan että sielun. Kappeliin siis!". Jos se venyy yli 5,5 s:n: "Vouti kiirehti kappeliin? Seurataan jälkiä!" |
| P13 | pulu-sinetti-kappeli | vihje 2, penkin naarmu | 5 s | (amused) Avaimen jälki penkissä – se sopii fatabuurin lukkoon! |
| P14 | pulu-sinetti-loyto | löytö fatabuurissa, ennen korttia | 6 s | (mischievously) Tuolla, kankaiden välissä! Voudin sinetti – piilossa kaikkien nenän edessä. |
| P15 | pulu-sinetti-aarteisiin | löytökortti suljettu | 4 s | (warmly) Sinetti on nyt Aarteissasi. Hieno löytö! |
| P16 | pulu-paluu-yleis | paluu yleisnäkymään, 1. kerta | 3 s | (amused) Muutkin huoneet odottavat. |
| P17 | pulu-hyvasti | linssin sulku | 4 s | (warmly) Hyvästi, Olavinlinna. Muurit pitävät salaisuutensa. |

**Id-muutos (hyväksytty 30.9.):** keskushallin hahmon repliikit `apulainen-1/2` → `tarjoilija-1/2` ja reaktio
`pulu-apulainen-r1` → `pulu-tarjoilija-r1`, jotteivät ne törmää keittiön apulaisen ääniin pankissa. Hahmon id
(`apulainen`, henkilö `apulainen-1500`) pysyy ennallaan.
