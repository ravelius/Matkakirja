# Livian ääni (pulun puhe)

> VALMIS SIIRRETTÄVÄKSI `docs/moduulit/livia-aani.md`:ksi. Tiedostoa EI
> committoitu repoon, koska `tests/dokumentit.test.mjs` vaatii jokaiselle
> `docs/`-ohjeelle rivin Raamatun ohjedokumenttikartalla, ja Raamattuun
> kirjoittaa vain päätoimittaja. Fable: lisää kartalle rivi
> `docs/moduulit/livia-aani.md — pulun ääni: ElevenLabs-resepti, tagit,
> kaiku, manifesti ja repliikkien pituusraja.` ja siirrä tämä tiedosto
> paikalleen — testi menee silloin läpi.

Omistajan tilaus 6.9.2026 aamupäivä, sanatarkasti:

- *"Pululle täytyy etsiä eleveniltä oma ääni joka vähän käheä ja nopea
  puhumaan. Generoidaan kaikki valmiiksi kirjoitetut repliikit puheeksi.
  Pidetään vain huoli että ne ovat mahdollisimman lyhyitä. Pitää varmaan
  vielä lyhentää niitä."*
- *"Voidaan käyttää myös pulun ääneen efektejä (kaiku alussa kun tulee ja
  aloittaa jo huutelemaan viestiä ennenkuin on edes ehtinyt kokonaan
  perille). Kaiku voidaan sitten feidata pois kun pulu 'perillä' ja
  nostaa äänitasoa hieman."*
- *"Tehdään pulusta hyvin vokaalinen ja elävä vastakohta kertojan
  monotoonisuuteen. Paljon elävöitystageja elevenin generointiin."*

## Osat

| Tiedosto | Tehtävä |
| --- | --- |
| `js/livia.js` | repliikkien kaanoni ja kuplien ajoitus (vain päätoimittaja kirjoittaa) |
| `js/liviapuhe.js` | tiedostonimet, soitin, kaikuversion valinta, kaupunkilähteet |
| `js/fokusvirta.js` | Ateenan ja Sofian kuplat: mistä ääni lähtee |
| `tools/generoi-pulu.mjs` | ääniehdokkaat, generointi, kaiku, manifesti, vienti |
| `.github/workflows/generoi-pulu.yml` | ajo (avain on vain secretissä) |
| `tests/livia-aani.test.mjs` | nimet, kaiku, tiivisteet, manifestin muoto, kytkentä peliin |
| `tools/savukkeet/savuke-pulu-ateena.mjs` | selainsavuke: Ateenan rytmi ja lehtivinkki |

## Ääni

- Malli `eleven_v3` (`/v1/text-to-speech/{voice_id}`), `mp3_44100_128`.
- `stability 0.0` (Creative — tottelee tageja; kertoja on 0.5),
  `similarity_boost 0.75`, `style 0.6`, `use_speaker_boost true`.
- Nopeus tehdään ffmpegillä (`atempo`, oletus 1.08): eleven_v3:ssa ei ole
  nopeussäädintä, ja ffmpeg on deterministinen. Lippu `--tempo`.
- Taso −17 LUFS, sama perhe kuin kertojan luennoilla.
- Ääntä EI ole vielä valittu. Työnkulun toiminto `aanet` listaa ehdokkaat
  (omat `/v1/voices` + jaetut `/v1/shared-voices`) piirteillä
  raspy · hoarse · gravelly · husky · rough · energetic · fast · quick ·
  lively · quirky · excited · animated. Valinta on kuuntelupäätös.

## Tagit

Tagit lisätään ohjelmallisesti (`TAGIT`, `puhemuoto`) ankkurisanoihin,
ja ajo kaatuu jos ankkuria ei ole tai tagien poisto ei palauta
kaanonista tekstiä. Kaanonin sanajärjestys ei siis voi muuttua
äänitteessä. Käytössä mm. `[excited] [amused] [proud] [curious]
[quickly] [warmly] [sheepish] [brightly] [reassuring] [modestly]
[squawks] [breathless] [sighs] [flatly] [mutters] [casually]
[helpfully]`.

## Kaupungin kulku: luenta — pulu (omistaja 7.9. ja 8.9.2026)

Raamattu, KAUPUNGIN KULKU: EI KUVIA, PULU - LUENTA - PULU — ja sen
kavennus 8.9.2026, sanatarkasti: *"ota kaikki pulun alustukset pois."*
Saapuminen on kaksi pulun hetkeä, ja kumpikin lukee pakkauksen
`pollo`-lohkosta:

| Kenttä | Milloin | Mitta |
| --- | --- | --- |
| `huudahdus` | luennan **aikana**, `{ kohta, teksti }` | kupla häipyy 2 s:ssa |
| `kommentti` | luennan **jälkeen**, 1–2 kuplaa | kuplan lukuaika kumpikin |

**Isoisä aloittaa.** Alustuskupla ennen luentaa on poistettu joka
kaupungista (`pollo.alustus`, 18 pakkausta), eikä luentaa siksi enää
lykätä pulun takia: se lähtee heti merkinnän piirrosta (`js/ui.js
renderFact` → `asetaMerkinnanLuenta`), ja välihuuto ajastetaan samasta
kohdasta (`fokusvirtaHuudahdus`). Ainoa lykkäys on yhä Ateenan
ensisaapumisen tuurauspaljastus, ja välihuuto odottaa senkin.
**Ateena on ainoa kaupunki, jossa pulu puhuu ennen isoisää** — siellä
puheenvuoro on vanha `pollo.maadoitus`.

Huudahduksen ajoitus tulee luennan äänitteen kestosta kerrottuna
kohdan merkkipaikalla (`kohta` esiintyy `matkakirja.teksti`-kentässä
tasan kerran); ilman äänitettä varapolku on kirjoituskoneen eteneminen.
Välihuuto soi kertojan **päälle** hiljempaa (0,7×) eikä kertoja väisty
(`soitaLivianKaupunkiAani`-asetukset `vaimennus` ja `vaista`).

Kuvia ei näytetä: uuden kulun kaupungin matkakirjakortti on pelkkää
tekstiä, vaikka pakkauksessa olisi vanha `matkakirja.kuva`
(`js/ui.js renderFact` → `fokusvirtaUusiKulku`).

### Luentakuva kartan päällä (omistaja 9.9.2026)

Raamattu, POSTILAATIKOSTA TULEE LUENTAKUVIA KARTAN PAALLE. Kortilla ei
ole kuvaa (yllä oleva sääntö), mutta **kartan päällä** on luennan ajan:
pakin vapaaehtoinen kenttä `matkakirja.luentakuva`
(`js/packs/fokusvirta-<id>.js`) on

```js
luentakuva: {
  ampari: 'luentakuvat/tiedosto.jpg',   // TAI osoite: 'https://media.matkakirja.app/…'
  selite: 'Mitä kuvassa näkyy.',
  lahde: 'Tekijä, Wikimedia Commons (CC BY 4.0)',
},
```

Osoite ratkeaa samalla porrastuksella kuin kortin kuvilla ja `pollo.kuva`:lla
(`osoite` → `ampari` → Commonsin `tiedosto`, `js/fokusvirta.js kuvanOsoite`).
Kuva **esiladataan saapumisesta** (`esilataaLuentakuva`,
`fokusvirtaSaapuminen`) ja **nousee** kartan päälle luennan alkaessa
(`naytaLuentakuva`, css `.fokusvirta-luentakuva`). Napautus kuvaan avaa
saman suurennoksen kuin kortin kuvat, suorassa. Paneeli on karttapinnan
keskikaistalla, jottei se peitä matkakirjakorttia (ylävasen) eikä pulun
kuplia (oikea alanurkka). Ilman kenttää kaupungin kulku on täsmälleen
ennallaan.

#### Ulkoasu: iso, vinossa, ilman laatikkoa (omistaja 9.9.2026 klo 13.50)

Raamattu, LUENTAKUVA ISOMPANA, VINOSSA JA ILMAN LAATIKKOA. Kuva on
kartalla **yksinään**: paneelilla ei ole reunusta, pintaa eikä
sisennystä, ja ainoa ääriviiva on kuvan oma **paperireuna** (ohut
kermakaista ja kevyt varjo). Paneeli on **hieman vinossa** — kulma on
deterministinen kaupungin tunnuksesta (`luentakuvanKallistus`, haarukka
−3,2°…−1,4°) ja kirjoitetaan css-muuttujaan, joten sama kaupunki on aina
samassa asennossa.

Kuvan **alla** on erillinen vaalea laatikko ilman ääriviivoja
(`.fokusvirta-luentateksti`, sama seepia/kerma kuin korteilla, pehmeä
pyöristys), ja siinä on **vain lyhyt kuvateksti**. Lähderiviä
("Matkakirjan havainnekuva") **ei näytetä kartalla** — se kulkee pitkän
kuvatekstin kanssa vasta suurennoksessa (`js/kuvatekstit.js`).

Mitat ovat css-muuttujia yhdessä paikassa (`css/fokusvirta.css`):

| muuttuja | työpöytä (≥ 900 px) | puhelin |
| --- | --- | --- |
| `--luentakuva-leveys` | `min(38vw, 640px)` | `min(80vw, 22rem)` |
| `--luentakuva-korkeus` (kuvan katto) | `min(46vh, 26rem)` | `min(34vh, 15rem)` |
| `--luentakuva-kallistus` | kaupungin oma, −3,2°…−1,4° | sama |
| `--luentakuva-pienennys` | `0.45` | sama |

2000 px:n ruudulla kuva on siis noin 640 px leveä (ennen n. 290 px).

#### Kaksi kokoa: kartan liike pienentää, ei poista

Omistaja: *"jos karttaa liikuttaa kuva saisi pienentyä pienemmäksi mutta
jäädä kartalle niin kauan kuin kyseisessä kaupungissa ollaan."* Kuva
**pienenee** (`pienennaLuentakuva`, luokka `pieni`, mittakaava
`--luentakuva-pienennys`) kahdesta syystä:

1. **kartan liike** — sama `pointerdown`, joka supistaa kuplapinon;
2. **luennan loppu** (`js/luenta.js luennanLoppuun`, ilman äänitettä
   kirjoituskoneen tahti).

Pienennys kutistaa paneelin **alareunaansa kohti** (`transform-origin`),
joten pieni kuva jää siihen kaistaan, josta iso lähti, ja
kuvatekstilaatikko häipyy (lukukelvoton 45 %:n koossa). Pienen kuvan
napautus avaa yhä suurennoksen.

Kuva **poistuu vain kaupungista lähdettäessä**
(`vaiennaLivianKaupunkipuhe` → `piilotaLuentakuva`); paluu samaan
kaupunkiin nostaa ison uudelleen. Testit: `tests/luentakuva.test.mjs`.

Vanha `pollo.maadoitus` on **varapolku** kaupungille, jota ei ole vielä
kirjoitettu uusiksi: se piirtyy kommenttina eli luennan jälkeen kuten
ennenkin.

#### Paikka: kaupungin yläpuolella ja hieman oikealla, ankkuroituna kartan kohtaan (omistaja 9.9.2026 klo 16.10 ja 16.15)

Raamattu, SAAPUMISESSA KAMERA ASETTUU NIIN, ETTA KAUPUNKI ON ALIMMASSA
KOLMANNEKSESSA JA LUENTAKUVA SEN YLAPUOLELLA HIEMAN OIKEALLA sekä
LUENTAKUVAA VOI ITSE LIIKUTTAA, JA SE ON ANKKUROITU KARTAN KOHTAAN.
Omistaja: *"kun tullaan uuteen kaupunkiin, kamera saisi asettua niin
että kaupunki jää alimpaan kolmannekseen ja kuva tulee sen yläpuolelle
ja vähän oikealle, niin että se ei jää matkakirjan tekstin peittoon
varsinkin pienillä näytöillä"* ja *"kuvaa pitää myös voida itse
liikuttaa ja se saisi jäädä paikalleen sen kohdan päälle karttaa missä
se on jos karttaa liikutetaan."*

Kuva ei enää asetu css:n kaistaan vaan **kartan kohtaan**. Kolme osaa:

**1. Sijainti lasketaan** (`js/saapumisasento.js luentakuvanSijainti`,
puhdas funktio ilman DOMia). Se saa karttapinnan mitat, kaupungin
ruutupisteen, matkakirjakortin suorakulmion ja kuvan oman kuvasuhteen,
ja palauttaa **ankkurin** eli paneelin alareunan keskipisteen sekä
paneelin leveyden. Säännöt järjestyksessä:

| ehto | tulos |
| --- | --- |
| kuvan alareuna | kaupungin pisteen yläpuolella (`LUENTAKUVAN_VALI_PX` 20 px + kallistuksen vara) |
| kuvan keskilinja | kaupungista oikealle `LUENTAKUVAN_SIVUSIIRTO` = 15 % näkymän leveydestä |
| kortti tiellä | sama korkeus, mutta kortin **oikealle** puolelle |
| ei sinnekään | kortin **ali tai yli** — kumpi kaista antaa isomman kuvan |
| ei mahdu vieläkään | **kuva pienenee** (pohja `LUENTAKUVAN_VAHIN_PX` 96 px); kortin tekstiä ei peitetä koskaan |

Leveys tulee samasta portaasta kuin css:n `--luentakuva-leveys`
(`luentakuvanPerusleveys`: ≥ 900 px → `min(38 % , 640px)`, muuten
`min(80 %, 352px)`), mutta se **kutistuu** niin paljon kuin kortti
vaatii. Kuvatekstilaatikon korkeus mitataan (se ei kutistu leveyden
mukana) ja kuvasuhde luetaan kuvan omasta `naturalHeight/naturalWidth`
-suhteesta — mitattu laatikko aiheuttaisi takaisinkytkennän.

**2. Ankkuri on laudan piste, ei ruutupiste.** Paneelin ympärillä on
nollan kokoinen ankkurisolmu (`.fokusvirta-luentakuva-ankkuri`), jota
kehyssilmukka siirtää; paneeli sen sisällä hoitaa nousun, kallistuksen ja
pienennyksen. Työnjako on pakko: paneelin `transform` animoituu 400 ms,
ja kehyskohtainen paikanvaihto jäisi ikuisesti siirtymän alle (mitattu
Chromiumilla 9.9.2026 — kuva jäi kartan vasempaan ylänurkkaan).

Ruutupaikka lasketaan **pallon omalla projektiolla**, kun pallolauta on
hereillä (`js/pallolauta/lauta.js asteet` + Globe.gl
`getScreenCoords`/`toGlobeCoords`), ja `ui.nakyvaAlue()`-arviolla vasta
sen puuttuessa. Ero on iso: laudan yksiköt ovat Millerin lieriötä, ja
Lontoossa arvio antoi pisteen 88 px liian alas ja 78 px liian vasemmalle
— kuva olisi noussut kaupungin päälle.

**3. Kuvaa voi raahata.** Sormi tai hiiri siirtää paneelia; ele
katkaistaan paneeliin, joten kartta ei panoroi sen alta eikä kuva
pienene omasta eleestään. Napautus ja raahaus erotetaan liikekynnyksestä
(`onRaahaus`, 6 px): kynnyksen alle jäävä ele avaa suurennoksen, sen
ylittävä vaihtaa **ankkurin** kuvan alla olevaan kartan kohtaan.

Mitattu Chromiumilla 9.9.2026 (repon oma kuva, Lontoo):

| ruutu | karttapinta | kaupunki (x %, y %) | kuvan laatikko | osuuko korttiin |
| --- | --- | --- | --- | --- |
| työpöytä 1600 × 1000 | 1579 × 921 | 41,8 % / 77,8 % | 573, 38 – 1198, 712 | ei (kortti 6, 6 – 346, 278) |
| puhelin 430 × 930 | 414 × 861 | 41,2 % / 77,7 % | 54, 262 – 399, 650 | ei (kortti 6, 6 – 346, 213) |

Kuvan alareuna jää molemmilla noin 5–20 px kaupungin pisteen
yläpuolelle ja keskilinja 13–14 % näkymän leveydestä sen oikealle
puolelle. Raahaus 120 px oikealle ja 60 px ylös siirsi kuvaa 122,6 /
−58,1 px ja vaihtoi ankkurin; kameran panorointi siirsi kuvaa 114 px ja
kaupunkia 116 px samaan suuntaan (ankkuri ennallaan). Kaappaukset:
`saapuminen-kolmannes-tyopoyta.png`, `saapuminen-kolmannes-puhelin.png`.

Ilman karttapintaa tai näkyvää aluetta (testit, laudan avaus kesken)
ankkurointia ei tehdä lainkaan ja paneeli jää css:n omaan kaistaansa.
Testit: `tests/saapumisasento.test.mjs` (puhtaat funktiot neljällä
ruutukoolla) ja `tests/luentakuva.test.mjs` (ankkuri, raahaus, napautus,
kartan siirto).

### PULU-CAM: pulun kuvat pakkana isoisän kuvan päälle (omistaja 9.9.2026)

Raamattu, PULU-CAM: PULUN NYKYAJAN KUVAT PAKKANA ISOISAN KUVAN PAALLE,
YHTEINEN KARUSELLI. Omistaja: *"Yksi tai useampi kuva voisi tosiaan
tulla pelissä isoisän ottaman kuvan päälle ja ne voisivat limittyä
hieman. Eri suuntiin pakan päälle, niin että siinä hahmottaa, että
pakassa on useampi kuva."* ja *"Sitten kun päällimmäistä kuvaa klikkaa,
niin pääsee karuselliin, missä näkyy isoisän kuva isona sekä kaikki muut
pulun kuvat."*

**Tarkennus 9.9.2026 klo 18.50** (Raamattu, PULU-CAM: RAKKAUSKOHTAUS
3-5 KUVAA, KAKSI KUVATEKSTIA MOLEMMILLE, HAVAINNEKUVA-LINKKI PITKAN
LOPUSSA, TARRA YHTENA PNG:NA OMISTAJAN VALINNASTA): tavallinen kohde
saa **1–3** kuvaa ja rakkauskohtaus **3–5** — pakassa on isoisän kuvan
kanssa enintään kuusi kuvaa. PULU-CAM-merkki on nyt **yksi tarra-PNG**,
jossa teksti on jo mukana, ja **kaksi kuvatekstiä** koskee sekä isoisän
että pulun kuvia.

Pakin **vapaaehtoinen** kenttä on `pollo.kuvat`
(`js/packs/fokusvirta-<id>.js`), 1–5 kuvaa **toimituksen
järjestyksessä**:

```js
pollo: {
  kuvat: [
    {
      osoite: 'https://media.matkakirja.app/pulucam/…jpg', // TAI ampari / tiedosto
      lyhyt: 'Yksi virke kartalle.',            // PAKOLLINEN: kartan teksti
      selite: 'Pidempi kertova kuvateksti (300–600 merkkiä) karuselliin.',
      lahde: 'Pulun kamera',
      lahteet: ['https://…'],   // toimituksen tausta-aineisto, ei näy pelaajalle
    },
  ],
},
```

Osoite ratkeaa **samalla porrastuksella** kuin luentakuvalla (`osoite` →
`ampari` → Commonsin `tiedosto`, `js/fokusvirta.js kuvanOsoite`); kuva
ilman osoitetta jätetään pois (`js/pulucam.js pulunKuvat`). Viittä
enempää ei oteta (`PULUCAM_KATTO`).

**Milloin pakka nousee.** Siinä yhdessä kohdassa, jossa pulun
kommenttikupla oikeasti nousee ruudulle (`fokusvirtaSaapumiskupla` →
`nayta`) — sama koukku kuin Etsi aarre -napilla, ei kutsuhetkellä.
Ensimmäinen kuva nousee heti, seuraavat pulpahtavat 0,95–1,15 s välein
pienellä pomppuanimaatiolla (`PULUCAM_VALIT_MS`, css-siirtymä
yliheitolla `cubic-bezier(0.34, 1.56, 0.64, 1)`); viiden kuvan pakka on
kasassa noin 4,3 sekunnissa eli pulun repliikin aikana.

**Missä pakka on.** Luentakuvan paneelin sisällä, kuvan kokoisessa
kuoressa (`.fokusvirta-kuvatila`) — ei sen vieressä. Siitä seuraa
kolme asiaa ilman omaa koodia: pakka **seuraa karttaa**, **raahautuu**
luentakuvan mukana (yksi ele siirtää koko pakan) ja **pienenee** kartan
liikkeestä yhdessä luentakuvan kanssa. Kuori on pakko, koska
`.fokusvirta-kuva` on nappi (nappiin ei ladota nappeja) ja sillä on
`overflow: hidden`, joka leikkaisi juuri ne reunat, joiden pitää näkyä.
Pakan noustessa luennan lopussa tullut **pienennys peruuntuu**: pakka ei
nouse peukalonkynnen kokoisen kuvan päälle.

Asennot ovat deterministisiä (`PULUCAM_ASENNOT`): **viisi** asentoa,
kulmat +4°, −3°, +2°, −6°, +7° ja siirtymä 6–10 % **kortin omasta
koosta** — prosenttia eikä pikseleitä, jotta limitys pysyy samana myös
pienennetyssä pakassa. Neljäs ja viides eivät ole kolmen ensimmäisen
kierrätystä: niiden kulmat ovat jyrkempiä ja siirtymät eri
neljänneksiin, jottei viidenkään kuvan pakka sulkeudu yhdeksi
suorakaiteeksi.

**Ilman luentakuvaa** (kaupungilla on `pollo.kuvat` mutta ei
`matkakirja.luentakuva`) pakka nousee samaan paikkaan ilman pohjakuvaa:
paneeli rakennetaan läpinäkyvällä pohjalaatikolla
(`.pulucam-pohja`, `rakennaLuentakuvanPaneeli` kuvalla `null`), joten
ankkuri, raahaus ja pienennys ovat täsmälleen samat. Kuvatekstilaatikko
ladotaan silloinkin, mutta tyhjänä: pakka täyttää sen ensimmäisen
pulpahduksen kohdalla, ja tyhjä laatikko piiloutuu css:llä.

**Kaupungista lähtö poistaa pakan** (`piilotaLuentakuva` →
`piilotaPuluCamPakka`, joka myös nollaa pulpahdusajastimet).

#### Kaksi kuvatekstiä, molemmille kuville (omistaja 9.9.2026 klo 18.50)

Sama sääntö kuin muuallakin pelissä (`js/kuvatekstit.js`), mutta nyt
sanottuna myös pulun kuville:

| missä | mikä | linkki |
| --- | --- | --- |
| kartalla, **päällimmäisen** kuvan alla | `lyhyt` | ei koskaan |
| karusellissa / koko ruudun näkymässä | `selite` | Havainnekuva-linkki perässä |

**Lyhyt teksti seuraa päällimmäistä kuvaa.** Pakan noustessa isoisän
kuva jää alle, joten kartalla lukee sen kuvan lyhyt teksti, joka on
ruudulla päällimmäisenä: pakka päivittää paneelin kuvatekstin joka
pulpahduksessa (`naytaPuluCamPakka`-asetus `kuvateksti` →
`.fokusvirta-kuvaselite`). **Pitkä teksti vaihtuu karusellissa kuvan
mukana** (`avaaSuurennos` → `nayta`), sekä isoisän että pulun kuvilla.

#### Havainnekuva-linkki pitkän kuvatekstin perässä

Kun kuvan lähde on *"Matkakirjan havainnekuva"* (tai *"Matkakirjan
kuvitus"*), suurennoksen **pitkän kuvatekstin perään** ladotaan
erillinen alleviivattu **Havainnekuva**-linkki, joka avaa pelin oman
havainnekuvaselityksen (`js/havainnekuva.js havainnekuvaLinkki` →
`avaaHavainnekuvaSelite`). Isoisän kuvissa se on käytännössä aina;
pulun kuvissa silloin, kun lähde sen sanoo — yksi ehto, ei kahta
sääntöä.

**Lähderivi säilyy ennallaan.** Rivin oma "Matkakirjan havainnekuva"
-maininta on yhä pisteviivainen selite (`taytaLahderivi` →
`merkitseHavainnekuva`); linkki on sen **lisä**, ei korvaaja, ja
molemmat avaavat saman selitteen. **Kartan lyhyessä tekstissä linkkiä
ei ole koskaan.**

#### PULU-CAM-tarra

Merkki on **yksi RGBA-PNG**, jossa teksti PuluCam on jo mukana
(omistaja 9.9.2026 klo 18.50) — erillistä HTML-tekstiä ja selfie-kuvaketta
ei enää ole. Tarraa **ei polteta kuvaan**: se on yksi elementti kuvan
oikeassa alakulmassa, ja sen leveys on **22 % kuvan leveydestä, katto
160 px** (`PULUCAM_TARRA_OSUUS`, `PULUCAM_TARRA_KATTO_PX`; css
`--pulucam-mitta` on kartalla `--luentakuva-leveys` ja suurennoksessa
js:n laskema kuvan leveys).

Osoite on vakiossa `PULU_CAM_TARRA_OSOITE` (`js/pulucam.js`) — **null**
siihen asti kunnes omistaja valitsee vaihtoehdon A–F. **Null ei ole
varakuvake vaan puhdas kuva**: siihen asti pulun kuvissa ei näy mitään
merkkiä, ei pakassa eikä karusellissa (`puluCamMerkki` palauttaa
`null`, eikä suurennoksen kuvatilan kuorta edes synny).

#### Yhteinen karuselli

Päällimmäisen kuvan napautus (ilman raahausta) avaa **nykyisestä
`avaaSuurennos`-toiminnosta laajennetun** karusellin, ja sama karuselli
avautuu isoisän luentakuvan napautuksesta, kun pakka on päällä.
Järjestys on omistajan sanoma järjestys eikä napautuskohdan mukainen:

1. isoisän luentakuva,
2. pulun kuvat toimituksen järjestyksessä.

Kuvat ovat **suorassa**, yksi kerrallaan kokonaisena; edellinen/seuraava
-nuolinapit (`.fokuszoom-nuoli`), pyyhkäisy ja `js/galleria.js`:n
kaistasääntö toimivat kuten muissakin gallerioissa. Jokaisella kuvalla on
oma **pitkä kuvateksti** (`kuvatekstiPitka`, Havainnekuva-linkki
perässä tarvittaessa) ja **lähderivi** (`taytaLahderivi`), ja kun tarra
on valittu, se näkyy pulun kuvissa myös suurennoksessa
(`.fokuszoom-kuvatila` + `.pulucam-suuri`). Sulkeminen palauttaa kartan
pakkoineen.

**Ilman `pollo.kuvat`-kenttää `avaaSuurennos` toimii täsmälleen kuten
ennen**: karusellin lisäys on valinnainen `pulunKuvasta`-asetus, ja ilman
sitä kuvatilan kuorta ei edes synny.

Testit: `tests/pulucam.test.mjs`. Selainvartio:
`tools/savukkeet/savuke-pulucam.mjs` (repon omat koekuvat, Lontoo,
viiden kuvan pakka; kaappaukset `pulucam-5-pakka.png`,
`pulucam-karuselli-isoisa.png`, `pulucam-havainnekuva-linkki.png`,
`pulucam-karuselli.png`, `pulucam-raahaus.png`, `pulucam-puhelin.png`).

### Etsi aarre -nappi kommentin jälkeen (omistaja 9.9.2026)

Raamattu, PULUN KOMMENTIN JALKEEN KARTALLE NAPPI "ETSI AARRE"
KAUPUNGIN LAATAN VIEREEN. Saapumisen kulku kartalla päättyy siis
nappiin: **luenta (+ luentakuva) → pulun kommentti → nappi**. Nappi
syntyy siinä yhdessä kohdassa, jossa kommenttikupla oikeasti nousee
ruudulle (`fokusvirtaSaapumiskupla` → `nayta`), ei kutsuhetkellä — se ei
siis voi tulla luennan aikana. Nappi on HTML-elementti karttapinnalla
(`js/etsi-aarre-nappi.js`, css `.etsi-aarre-nappi`), se seuraa karttaa
panoroitaessa ja zoomatessa samalla kaavalla kuin pulun paikkamerkki
(`ui.nakyvaAlue()`), ja se toimii sellaisenaan tasokartalla ja
pallolaudalla.

**Nappi avaa kaupunkilehden, ei aarretta** (omistaja 9.9.2026 klo 16.30,
Raamattu ETSI AARRE -NAPPI AVAA KAUPUNKILEHDEN, EI AARRETTA SUORAAN:
*"kun kartalle tulee etsi aarrennappi, niin sen pitäisi avata siis
kaupunkilehti, eikä mennä suoraan aarteeseen. Se on tavallaan
ensimmäinen askel aarteen etsintää, että löytää lehdestä sen.
Aarrekysymyksen, mikä paljastaa aarretta vartioivan henkilön
paikan."*). Painallus kutsuu `ui.avaaTutkinta(city, { ohitaLehtilukko:
true })` — samaa ovea kuin alapalkin Tutki-nappi ja kaupungin laatan
napautus — ja lehti aukeaa aina etusivulle (`rakennaSivut` päättyy
`naytaTutkiSivu(ui, 0)`:aan). Nappi EI kutsu kortin `etsiKatko`-ketjua,
joka sulkee lehden ja hyppää suoraan aarrekysymykseen; kortin oma
"Etsi kätkö" -nappi jäi ennalleen.

**Lehtilukko.** `ohitaLehtilukko` on tämän yhden napin oma reitti:
`js/ui.js openArrival` ohittaa lipun kanssa `fokusvirtaOhittaaLehden`-
portin, koska nappi tulee vasta pulun kommentin jälkeen ja on silloin
pelaajan ensimmäinen askel eteenpäin. Lukko itse jää voimaan kaikkiin
muihin avauskohtiin (tällä hetkellä se on joka tapauksessa auki —
`fokusvirtaOhittaaLehden` palauttaa aina `false`, omistajan linjaus
2.9.2026 — mutta lippu pitää napin toimivana, jos lukko kytketään
takaisin päälle).

**Lehden sulkeutuessa nappi palaa**, jos aarretta ei vielä löytynyt:
lehti oli vain ensimmäinen askel, eikä kartalle saa jäädä umpikujaa,
jos pelaaja selaa lehden kiinni löytämättä aarrekysymystä. Paluu on
kiinni dialogin omassa `close`-tapahtumassa (Esc, taustanapautus ja
sulkunappi laukaisevat sen kaikki) ja jää tekemättä, jos peli on
siirtynyt tietovisaan (`game.phase === 'quiz'`), pelaaja on toisessa
kaupungissa tai kätkö on löytynyt.

Nappi jää pois, jos kaupungissa ei ole enää kätköä etsittävänä
(`ui.tehtavaNapinTila` → `js/game.js tehtavaTarjolla`), ja poistuu
kolmesta syystä: painalluksesta (kunnes lehti suljetaan), kätkön
löytymisestä muuta kautta ja kaupungista lähdöstä (sama koukku kuin
luentakuvalla, `vaiennaLivianKaupunkipuhe`). Selainvartio:
`tools/savukkeet/savuke-etsi-aarre.mjs` (15 vartiota, pallolauta),
kaappaus `etsi-aarre-lehti.png`. Testit:
`tests/etsi-aarre-nappi.test.mjs`.

## Kaupunkikohtaiset lähteet

Raamattu, VAIN EUROOPPA TYÖN ALLA: puhe soi Euroopan kaupungeissa,
joiden tekstit omistaja on hyväksynyt. Lähteen nimi on **kaupungin
tunnus**, ja indeksi tulee kenttälistan ja sen KUPLIEN järjestyksestä
(`js/liviapuhe.js LIVIAN_KAUPUNKILAHTEET`). Rivi on joko kentän nimi
(yksi kupla) tai `[nimi, kuplien määrä]`.

Uuden kulun kaupungeissa kenttälista alkaa **varatulla paikalla**
(`LIVIAN_VARATTU`) ja jatkuu kentillä `huudahdus`, `kommentti`;
Sofiassa niiden perässä ovat vielä sähketehtävän vaiheet `johdanto`,
`vinkki`, `linkkiSaate`, `oikein`, `odotus`, `paluu`.

**Miksi paikka on varattu eikä poistettu.** Numero on tiedostonimessä,
joten poistetun alustuksen rivin poistaminen taulusta siirtäisi
huudahduksen ykköseksi ja kommentin kakkoseksi — peli hakisi jokaisessa
kaupungissa alustuksen äänen kommentin kuplan alle, ja ainoa korjaus
olisi generoida 18 kaupunkia uudelleen. Varattu paikka ei ole minkään
pakkauksen kenttä, joten sillä ei ole tekstiä eikä siihen osu yksikään
haku; ämpärin `livia-<kaupunki>-1.mp3` jää sinne orvoksi.

| Lähde | Kuplia | Merkkejä | Tiedostot |
| --- | --- | --- | --- |
| `ateena` | 1 | 243 | `livia-ateena-1.mp3` (vanha maadoitus, yhä yksi merkkijono) |
| `sofia` | 13 | 5–85 | `livia-sofia-2.mp3` … `livia-sofia-14.mp3` |
| `istanbul` | 4 | 9–83 | `livia-istanbul-2.mp3` … `-5.mp3` |
| `bukarest` | 3 | 10–80 | `livia-bukarest-2.mp3` … `-4.mp3` |
| `sarajevo` | 3 | 12–84 | `livia-sarajevo-2.mp3` … `-4.mp3` |
| `budapest` | 3 | 12–91 | `livia-budapest-2.mp3` … `-4.mp3` |
| `wien` | 3 | 5–81 | `livia-wien-2.mp3` … `-4.mp3` |
| `praha` | 3 | 12–80 | `livia-praha-2.mp3` … `-4.mp3` |
| `krakova` | 3 | 18–86 | `livia-krakova-2.mp3` … `-4.mp3` |
| `varsova` | 3 | 18–90 | `livia-varsova-2.mp3` … `-4.mp3` |
| `pietari` | 3 | 8–85 | `livia-pietari-2.mp3` … `-4.mp3` |
| `moskova` | 3 | 13–91 | `livia-moskova-2.mp3` … `-4.mp3` |
| `kiova` | 3 | 7–85 | `livia-kiova-2.mp3` … `-4.mp3` |
| `odessa` | 3 | 12–90 | `livia-odessa-2.mp3` … `-4.mp3` |
| `helsinki` | 3 | 13–91 | `livia-helsinki-2.mp3` … `-4.mp3` |
| `tampere` | 3 | 11–80 | `livia-tampere-2.mp3` … `-4.mp3` |
| `tallinna` | 3 | 12–93 | `livia-tallinna-2.mp3` … `-4.mp3` |
| `riika` | 4 | 5–68 | `livia-riika-2.mp3` … `-5.mp3` |
| `vilna` | 4 | 9–76 | `livia-vilna-2.mp3` … `-5.mp3` |

Numero 1 puuttuu joka kaupungilta paitsi Ateenalta: se on poistetun
alustuksen varattu paikka (yllä). Tekstit luetaan pakkauksista
(`js/packs/fokusvirta-<id>.js`) — niitä ei kopioida työkaluun eikä
peliin. Järjestystä ei saa muuttaa jälkikäteen:
numero on tiedostonimessä. Uusi kenttä lisätään listan LOPPUUN, ja
kuplien määrän on vastattava pakkausta (ero kaataa
`tools/generoi-pulu.mjs`:n `kaupunginRepliikit`-funktion).

Peli soittaa nämä kutsulla `soitaLivianKaupunkiAani(ui, city.id,
'<kenttä>', { kupla, teksti })`, joka on hiljainen jokaiselle
kaupungille, jota ei ole taulussa. Kutsupaikat ovat `js/fokusvirta.js`:
ssä siellä, missä teksti oikeasti tulee ruudulle (kevyt kulku,
`FOKUSVIRTA_KORTIT = false`): huudahdus `ajastaHuudahdus` ja kommentti
`fokusvirtaSaapumiskupla`, johdanto ja odotus `sahkeSaateKuplaan`,
vinkki ja linkkiSaate pullanapeista, oikein kuittauskortista ja paluu
`aloitaSahkelento`:n kuplasta.

**Yksi kupla = yksi tiedosto.** Kirjoitettu kupla soi omana
äänitteenään, ja `js/pollo.js naytaPuheenvuoro` saa asetuksen `aani`,
jota kutsutaan jokaisen osan ilmestyttyä. Vanha muoto (yksi pitkä
merkkijono, esim. Ateenan maadoitus) pilkkoutuu ruudulla osiin
(`jaaPuheenvuoroksi`) ja on yhä yksi äänite.

**Kupla odottaa puheen loppuun.** Äänitetty repliikki saa asetuksen
`viive` ja etenee kuplan lukuajalla (`js/livia.js
livianKuplanLukuaika`). Samasta syystä sähkelento (`aloitaSahkelento`)
odottaa kuittauksen (`oikein`) kuplien yhteenlasketun lukuajan ennen
paluukuplaa, ja aarteen paljastus odottaa paluusarjan viimeistä kuplaa.

**Lukuaika on vähimmäisaika, äänite voi venyttää sitä (7.9.2026).**
Lukuaika on arvio tekstin pituudesta, ja Dr. Vonin ajossa kymmenen
repliikkiä 85:stä puhui kuplaansa pidempään (esim. 7,37 s puhetta
5,38 s kuplassa) — seuraava kupla häivytti äänen kesken lauseen. Nyt
kuplan ajastin on `max(lukuaika, äänitteen kesto + 400 ms)`, ja kesto
luetaan siitä samasta `<audio>`-elementistä joka soi (`duration`,
metatietojen tultua). Manifestia peli ei lue eikä uutta verkkohakua
tehdä; ilman äänitettä tai mykistettynä aika on tasan entinen, ja
napautus jatkaa yhä heti.

| Missä | Mikä odottaa |
| --- | --- |
| `js/liviapuhe.js` | `LIVIAN_PUHEEN_HANTA_MS`, `livianAanenKesto`, `livianKuplanAika`, `livianKuplanAjastin` |
| `js/livia.js` | avaussarja (`naytaRepliikki`) ja paljastussarja (`paljastusRepliikki`) |
| `js/pollo.js` | `ajastaPuheenvuoro` kysyy `viive`-funktiolta uudestaan, kun metatiedot ovat tulleet (`aaniKahva`) |
| `js/fokusvirta.js` | `livianPuherytmi` (kommentti, sähkevaiheet), `soitaLivianKaupunkiSarja`, `polloKuplasarja`, `fokusvirtaHuudahdus` (välihuuto ajastetaan luennan kestosta) |

Huudahduksen 2 sekunnin kupla EI odota: se on välihuuto kertojan
päällä, ei repliikki omassa vuorossaan. Vartiot:
`tests/livia-aani.test.mjs` (aika ja ajastin) ja
`tools/savukkeet/savuke-pulun-kulku.mjs` (Budapest, äänite mokattu
7 sekunnin mittaiseksi).

**Vanhentunut äänite on hiljainen myös kaupungeissa** (7.9.2026):
kaupunkirepliikit ovat samassa tiivistevartioinnissa kuin `paljastus` ja
`lehtivinkki`, joten ämpärin vanha tiedosto ei voi soida uuden kuplan
alla. Kutsupaikka antaa aina kuplan tekstin.

## Tarkistuskorostus kartalla (väliaikainen)

Omistajan tilaus 7.9.2026: *"voisit merkitä kartalle nuo kaupungit
korostusvärillä, missä on nämä uudet generoinnit käytössä."*

`js/liviapuhe.js livianKorostetutKaupungit()` palauttaa ne kaupungit,
joilla on uuden kulun repliikit **ja** joiden jokaiselle kuplalle on rivi
`LIVIAN_AANITETYT`-taulussa. Lista on johdettu eikä ylläpidetty käsin.
Pallolla kaupunkipiste on kirkkaan kultainen
(`js/pallolauta/lauta.js kaupunkipisteenVari`), tasolaudalla laatan
ympärillä on kultainen kehä (`css .city-tarkistus`). Kehä ei ota
napautuksia vastaan eikä muuta yhtäkään osumapintaa.

Kytkin on `LIVIAN_KOROSTUS_KAYTOSSA` — päätoimittaja kääntää sen
falseksi, kun omistaja on käynyt kaupungit läpi.

## Ateenan rytmi ja lehtivinkki (omistaja 7.9.2026)

Raamattu, PULUN UUSI RYTMI ATEENASSA. Ensimmäinen saapuminen koskaan
kulkee kolmessa osassa (`js/livia.js livianPaljastus`, kolme repliikkiä):

1. kaksi kuplaa ENNEN isoisän luentaa (tuuraus + tervetulotoivotus),
2. isoisän luenta — pulu on hiljaa; luenta on lykätty kuplien taakse
   (`js/ui.js asetaMerkinnanLuenta` portti `luennanLykkays`, jonka
   `aloitaLykattyLuenta` laskee),
3. kolmas kupla vasta luennan päätyttyä (`js/luenta.js luennanLoppuun`;
   ilman luentaa yhden kuplan vähimmäislukuaika).

Kaupungin nimi taipuu apureista: `maahanMuoto` ("Ateenaan") ja uusi
`paikkaaMuoto` ("Ateenaa", `js/ui-apurit.js`). Ilman nimeä toivotus on
"Tervetuloa." ja ohje puhuu "kaupungista".

Lehtivinkki on oma lähteensä (`lehtivinkki`, yksi repliikki
`LIVIAN_LEHTIVINKKI`). Se sanotaan VAIN ENSIMMÄISELLÄ kerralla koskaan
— laitelippu `matkakirja-livia-lehtivinkki` + istuntolippu, sama kaava
kuin paljastuksella — eikä siinä ole enää "Älä näytä jatkossa"
-ruksia (vanha avain `matkakirja-lehtivinkki-pois` on poistettu).

## Pulu ja kertoja eivät puhu päällekkäin (omistaja 8.9.2026)

Omistajan vikailmoitus 8.9.2026 klo 12.55, sanatarkasti: *"jos minulla
on maailma tila päällä kehittäjänä ja menen kuuntelemaan kaupunkeja
joissa pululla äänet, niin pulun ja kertojan äänet menevät päällekkäin
ja pulu selittää ensin jotain ihan väärää juttua."*

**Juurisyy: kaksi rinnakkaista kirjanpitoa.** Kertojan luenta eli
`ui.diaryVoice`-kentässä ja pulun repliikki `ui.liviaAani`-kentässä,
eikä kumpikaan tiennyt toisesta mitään — järjestys syntyi pelkistä
ajastimista (luenta → huudahdus → kommentti). Ajastimet
kysyvät kaupunkia vasta lauetessaan, mutta **kesken jäänyt äänite ei
kysy mitään**: se soi loppuun. Kehittäjän maailmatilassa kaupunkia
vaihdetaan napauttamalla (`js/ui.js doKehittajaSiirto`), jolloin lähtö
osuu keskelle pulun lausetta — edellinen kaupungin repliikki jää soimaan
uuden kaupungin luennan alle. Juuri se on omistajan kuulema *"ihan väärä
juttu"*: se on **toisen kaupungin** lause, ei väärä äänite. (Mitattu
selaimella: hyppy Riiasta Vilnaan → `livia-riika-2.mp3` soi Vilnan kuplan
päällä.)

**Korjaus on yksi vuorokirjanpito, ei kahta.** Sama taulu, joka jo tiesi
kaikki soivat luennat taustan väistöä varten (`js/luenta.js
soivatLuennat`), tietää nyt myös **kuka** puhuu:

| Missä | Mikä |
| --- | --- |
| `js/luenta.js` | `PUHUJA_KERTOJA` / `PUHUJA_PULU`, `merkitsePuhuja(ui, audio, rooli)`, `puhujaAanessa(paitsi)`, `luovutaPuhevuoro(audio)` |
| `js/liviapuhe.js` | `soitaLivianAani` ei aloita, jos kertoja on äänessä (`vaista` päällä); merkintä roolilla `PUHUJA_PULU` |
| `js/luenta.js playDiaryVoice` | kertoja odottaa pulun lauseen loppuun (250 ms välein, katto 15 s) |
| `js/fokusvirta.js` | `vaiennaLivianKaupunkipuhe(ui)` katkaisee kaupungin kaikki pulun ajastimet ja soivan repliikin |
| `js/ui.js` | `vaiennaPaikanPuhe()` = kertojan häivytys + edellinen kutsu; sitä käyttävät noppa, jalan, lento ja kehittäjän hyppy |

Samalla korjattiin kaksi kohtaa, joissa järjestys nojasi kelloon:

- **Välihuudon odotus vartioi kaupunkiaan** (`fokusvirtaHuudahdus`).
  Se odottaa lykättyä luentaa; väärässä kaupungissa lauetessaan se
  ajastaisi edellisen kaupungin välihuudon uuden luennan päälle.
- **Kommentti odottaa myös vasta lähdössä olevaa luentaa.** Kutsu tulee
  kirjoituskoneen lopusta, ja kone voi ehtiä maaliin ennen kertojaa —
  ensisaapumisessa luenta odottaa vielä tuurauspaljastuksen kuplia.
  Silloin `ui.diaryVoice` on vielä tyhjä eikä `luennanLoppuun` tiedä
  luennasta mitään — nyt `ui.luennanLykkays` kertoo sen, ja kommentti
  odottaa (400 ms välein, katto 30 s).
- **Pulun loppuhäivytys lasketaan kellosta eikä askelmäärästä**
  (`pysaytaLivianAani`). Neljä kiinteää askelta venyi ajastimia
  kuristavassa selaimessa sekunniksi ääntä sen jälkeen kun peli jo
  käski vaieta.

Kolme sääntöä, jotka on helppo rikkoa vahingossa:

1. **Välihuuto on tietoinen poikkeus.** `huudahdus` soi kertojan päälle
   hiljempaa (`vaista: false`) eikä varaa vuoroa lainkaan — omistajan
   päätös 7.9.2026, ja portti ohittaa sen.
2. **Häivytys luovuttaa vuoron heti** (`luovutaPuhevuoro`). Lähdön
   0,7 sekunnin loppuhäivytys on hyvästely, ei puheenvuoro; ilman tätä
   se olisi vaientanut seuraavan kaupungin ensimmäisen repliikin.
3. **Portti vaientaa vain äänen.** Kupla näkyy ja etenee kuten ennen —
   sama sopimus kuin puuttuvalla tai vanhentuneella äänitteellä.

Vartiot: `tests/puhevuoro.test.mjs` (vuorokirjanpito, molemmat portit,
välihuudon poikkeus, lähdön vaiennus) ja
`tools/savukkeet/savuke-pulun-vuoro.mjs` (selain: hyppy kaupungista
toiseen kesken pulun lauseen).

**Raja:** striimattu lukija (`js/lukija.js`) ei kulje tämän taulun
kautta, koska se ei ole `<audio>`-elementti. Kaupunkien saapumisluennat
ovat äänitteitä, joten vuoro on niissä aina tiedossa.

## Vanhentunut äänite on hiljainen

Tiedostonimi johdetaan lähteestä ja indeksistä, joten repliikin tekstin
muuttuminen EI muuta nimeä: ämpärin vanha äänite sanoisi eri asian kuin
kupla, eikä mikään kaatuisi. Siksi `js/liviapuhe.js` pitää taulua
`LIVIAN_AANITETYT` (avain → generoidun tekstin tiiviste,
`livianTiiviste`, FNV-1a). Kun kuplan teksti ei vastaa taulua, äänite
jätetään soittamatta.

Taulu kattaa `js/livia.js`:n lähteet (avaus, paljastus, mannerivihje,
lehtivinkki); kaupunkilähteet kulkevat ilman tekstiä eikä niitä
vartioida. Kuiva ajo merkitsee jokaisen repliikin **UUSI**,
**MUUTTUNUT** tai **AJAN TASALLA** ja tulostaa lopuksi valmiin taulun
liitettäväksi — päivitä se ajon jälkeen, muuten peli pysyy hiljaa.

## Kaiku

Saapumisrepliikit (`js/liviapuhe.js LIVIAN_SAAPUMISREPLIIKIT`) ovat
`avaus-1` (Livia lennähtää mukaan), `paljastus-1` (tulee sähkeen
kanssa) ja `sofia-7` (`paluu`: Livia palaa pöllön luota ja aloittaa
raporttinsa jo ilmasta). Muut kaupunkirepliikit sanotaan pelaajan
vieressä, joten niissä kaiulla ei olisi mitään kerrottavaa. Näistä
kolmesta tehdään ffmpegillä oma `-kaiku.mp3`, jossa kaikuinen ja
vaimennettu raita häipyy 1,5 sekunnissa pois ja kuiva raita nousee
täyteen tasoon — pulu huutaa viestiä jo lentäessä ja on perillä reilun
sekunnin kuluttua. Peli soittaa saapumisrepliikistä kaikuversion, muista
kuivan.

Efekti leivotaan tiedostoon eikä tehdä Web Audiolla: kuplaäänet soitetaan
tavallisella `<audio>`-elementillä, ja konvolveri vaatisi koko soittotien
vaihtamisen AudioContextiin kahden repliikin takia.

## Manifesti

`aanet/pulu/manifesti.json` — koko repliikistö, ei vain ajon osa:

```json
{ "versio": 1, "kansio": "aanet/pulu", "paivitetty": "2026-09-06",
  "repliikit": [ { "avain": "avaus-1", "lahde": "avaus", "indeksi": 0,
    "teksti": "…", "merkit": 45, "kuplaSekunteina": 2.8,
    "tiedosto": "livia-avaus-1.mp3", "kaiku": "livia-avaus-1-kaiku.mp3",
    "saapuu": true, "kesto": 3.4, "kaikuKesto": 3.6 } ] }
```

Peli ei lue manifestia (nimi johdetaan koodista); se on ämpärin
sisällysluettelo ja ajon kuitti. Puuttuva tiedosto on hiljainen — kupla
toimii ilman ääntä kuten ennenkin.

## Ajojärjestys

1. `toiminto: aanet` → kuuntele esikuuntelut, valitse `voice_id`.
2. `toiminto: kuiva` → tarkista tekstit, tagit ja kestot.
3. `toiminto: generoi`, `aani: <voice_id>` → generoi ja vie ämpäriin.
4. Kuuntele. Tekstin tai äänen muuttuessa: `pakota: kyllä` (tarvittaessa
   `repliikit: avaus-2,paljastus-1`).

## Pituusraja — repliikit on lyhennettävä

Kuplien rytmi ohjaa ääntä (*"luenta seuraa kuplia"*): kupla vaihtuu
`min(9500, max(3200, merkit × 78))` millisekunnin kuluttua, ja seuraavan
repliikin alkaessa edellinen äänite häivytetään pois. Sarjan VIIMEINEN
repliikki saa puhua loppuun (6.9.2026 muutos). Arvio ei aina osu, ja
7.9.2026 alkaen kuplan ajastin venyy äänitteen todelliseen kestoon
(ks. *Kupla odottaa puheen loppuun*) — lyhyys on silti tavoite, koska
pitkä kupla seisoo ruudulla pitkään.

Nykytila ja ehdotukset (päätoimittaja päättää; kaanonia ei muuteta täällä):

| Avain | Merkkejä | Puhe ~s | Kupla s | Ehdotus (merkkejä) |
| --- | --- | --- | --- | --- |
| avaus-1 | 45 | 3,2 | 2,8 | kelpaa (ero 0,4 s) |
| avaus-2 | 112 | 8,0 | 6,5 | "Minä olen Livia. Pöllö luki isoisäsi kirjan, ja minä kannoin ne sähkeet." (72) |
| avaus-3 | 119 | 8,5 | 6,9 | "Valitse rauhassa mistä aloitat — vaikka se maanosa, joka kutkuttaa eniten." (74) |
| avaus-4 | 120 | 8,6 | 7,0 | "Anteeksi valikoima: pöllö on tarkistanut vasta yhden reitin. Ateenasta se alkaa." (80) |
| avaus-5 | 92 | 6,6 | 5,3 | "Perillä sinua odottaa Viisas Pöllö. Minä olen vain viestinviejä." (64) |
| paljastus-1 | 72 | 5,1 | 5,6 | uusittu 7.9.2026, mahtuu kuplaan |
| paljastus-2 | 77 | 5,5 | 6,0 | uusittu 7.9.2026, mahtuu kuplaan |
| paljastus-3 | 61 | 4,4 | 4,8 | uusi 7.9.2026, mahtuu kuplaan |
| lehtivinkki-1 | 27 | 1,9 | 3,2 | uusi 7.9.2026, mahtuu kuplaan |
| ateena-1 | 243 | 17,4 | 18,9 | pinoutuu ruudulla, mahtuu osien summaan |
| kaupunkien uusi kulku (95 kuplaa) | 5–93 | 0,4–6,6 | 3,2–7,3 | omistajan hyväksymät tekstit 7.9.2026, jokainen mahtuu kuplaansa |
| mannerivihje-1 | 143 | 10,2 | 8,2 | "Kuule — jos tämä maa alkaa tuntua pitkältä, kerää rahaa lentoon. Isosta kaupungista pääsee toiselle mantereelle." (112, viimeinen kupla → saa puhua loppuun) |

Nyrkkisääntö: **enintään noin 85 merkkiä** repliikkiä kohti (≈6 s).
Kuiva ajo laskee jokaiselle repliikille ylityksen merkkeinä.

Ylitys ei enää katkaise lausetta (kupla odottaa puheen loppuun), mutta
se pidentää kuplan seisomista ruudulla — lyhyys on siis yhä tavoite.

## Muut Livian repliikkilähteet (ei vielä äänitetty)

- `js/fokusvirta.js LIVIAN_SAAPUMISET` — 10 kaupunkikohtaista
  saapumisrepliikkiä (Venetsia, Firenze, Dubrovnik, Budapest, Wien,
  Kreeta, Sisilia, Odessa, Marseille, Pariisi), 190–260 merkkiä eli
  2–3 kertaa liian pitkiä puheeksi sellaisenaan.
- `js/packs/fokusvirta-<id>.js` kenttä `pollo.maadoitus` niissä
  kaupungeissa, joita ei ole vielä kirjoitettu uuteen kulkuun — ne
  piirtyvät kommenttina, mutta niitä ei ole äänitetty.
- `js/pollo.js LIVIAN_MIETINNAT` — 52 odotusriviä (yleiset, vastaus,
  pitkat). Lyhyitä (30–60 merkkiä) ja arvottuja: sopisivat äänitettäviksi
  hyvin, mutta niitä on paljon.
- `js/fokustehtavat.js` — pullatarjouksen kelluke- ja kuittausrivit.

Näiden äänittäminen on oma tilauksensa: lähde lisätään
`LIVIAN_AANILAHTEET`-listaan ja tekstit `repliikit()`-funktioon, jolloin
nimeäminen, kaikusääntö, manifesti ja testit pätevät sellaisenaan.

## Kuplien näkymä ruudulla ja Livian loki (7.9.2026)

Omistajan linjaus (Raamattu, *"PULUN KUPLAT: VAIN VIIMEISIN, HISTORIA
CHATISSA"*): kartan päällä näkyy **vain viimeisin kupla**, kelaus
laajentaa näkymän ylöspäin noin kymmeneen tekstiriviin, ja kartan liike
supistaa sen takaisin yhteen — kaikki pehmeästi animoiden. Repliikkien
sanoja, paljastussarjan ajoitusta tai lehtivinkin logiikkaa tämä ei
kosketa; kyse on pelkästä näkymästä.

**Päivitys 8.9.2026** (Raamattu, *"PULUN HUUDAHDUS EI KESKEYTA LUKIJAA,
JA KUPLAPINO NAKYY KAHDEKSAAN RIVIIN ASTI KUNNES KARTTA LIIKKUU"*):
oletus kääntyi päinvastoin. Pino on **auki kahdeksaan riviin asti** heti
(ilman lokin historiaa), kartan liike ja Escape supistavat sen yhteen
kuplaan entisellä liu'ulla ja kurkistuksella, ja seuraava uusi kupla
avaa pinon taas. Tila on siksi kolmiarvoinen `pinoTila`
(`'auki' | 'laaja' | 'supistettu'`), jossa `'laaja'` on pelaajan oma
laajennus — vain se hakee lokin aiemmat puheenvuorot pinoon.

| Osa | Missä |
| --- | --- |
| Pinon tila (`pinoTila`, `laajennaPino`, `supistaPino`, `paivitaPinonKorkeus`) | `js/pollo.js` |
| Kelauksen tunnistus (rulla, sormen veto, nuoli ylös, Escape) | `js/pollo.js varmistaPino` |
| Supistus kartan vedosta (dokumentin `pointerdown`) | `js/pollo.js seuraaSulkemista` |
| Korkeuden liuku, häivytys ja puhelimen katto | `css/styles.css .pollo-kuplapino` |
| Kurkistus edelliseen kuplaan (`PINON_KURKISTUS_REM`, `pidaPinoPohjassa`) | `js/pollo.js`, `css .pollo-kuplapino-kurkistus` |
| Laitteen loki (`matkakirja-livia-loki`, katto 400) | `js/pollo.js lueLivianLoki`, `kirjaaLivianLokiin` |
| Lokin lataus chattiin ja kuplaviestien asu | `js/pollo.js lataaLokiVirtaan`, `css .pollo-kuplaviesti` |
| Selainvartiot | `tools/savukkeet/savuke-pulun-kuplat.mjs` |

Muistettavaa:

- **Supistettu korkeus mitataan, ei arvata.** `paivitaPinonKorkeus`
  asettaa pinon katoksi viimeisimmän kuplan mitan pikseleinä;
  laajennettuna inline-arvo poistuu ja css:n oma katto
  (`min(60vh, 14rem)`, puhelimella `min(45vh, 14rem)`) on taas voimassa.
  Molemmat päät ovat pikseleitä, joten `transition: max-height` liu'uttaa
  niiden välillä. Ensimmäinen kupla ja liikeherkkyys ohittavat liu'un
  (`.pollo-kuplapino-hyppy`).
- **Supistettuna ei tehdä FLIP-siirtoa.** Vanhat kuplat ovat pinon
  leikkauksen takana, joten niiden nousu olisi liikettä jota kukaan ei
  näe — ja se kilpailisi korkeuden liu'un kanssa.
- **Loki on oma avaimensa eikä osa pelitallennusta.** Se saa kadota
  (yksityinen selaus, muisti täynnä) ilman että peli menettää mitään, ja
  uusi peli ei pyyhi sitä. Merkintä on `{ r, t, aika }`, jossa `r` on
  `kupla`, `kayttaja` tai `pollo`. Chattiin loki ladataan **kerran**,
  ensimmäisellä avauksella, istunnon omien viestien yläpuolelle; ladatut
  rivit kantavat luokan `.pollo-historiaviesti` eivätkä siksi estä
  tervehdystä.
- **Chatin tervehdys on kolme virkettä** ja sen ydin lihavoidaan
  (`TERVEHDYS_ALKU` + `TERVEHDYS_YDIN` + `TERVEHDYS_LOPPU`,
  `naytaTervehdys`). Teksti on kaanonia — päätoimittaja kirjoittaa.
- **Laajennus hakee lokista aiemmat kuplat** kartan päälle
  (`taytaPinoHistorialla`, enintään kuusi). Ne ovat lajia `historia`:
  kartan kosketus ei poista niitä, napautus avaa chatin.
- **Edellisestä kuplasta pilkottaa alaosa** (omistaja 7.9.2026 ilta:
  *"pulun kuplassa saisi yläpuolella näkyä vähän sitä aiempaa kuplaa.
  Nyt se jää kokonaan peittoon. Se voisi näkyä niin, että kuplan alaosa
  näkyy ja sitten se feidautuu läpinäkyväksi."*). Supistetun pinon
  katto on viimeisin kupla + `PINON_KURKISTUS_REM` (2.2 rem = kuplien
  väli ja noin puolitoista tekstiriviä), ja yläreuna häivytetään saman
  mitan matkalta. Häivytys on maski, jota ei voi liu'uttaa arvosta
  `none` gradienttiin, joten gradientti on AINA päällä ja sen pituus on
  rekisteröity muuttuja `--kuplapino-haive` (0 px = umpinainen maski).
  Rekisteröinti (`@property`) puuttuu vanhasta iOS-Safarista (< 16.4):
  siellä maski toimii mutta ei liu'u. Yhden kuplan pinossa ei ole
  lisäkorkeutta eikä häivytystä — häivytys söisi ainoan kuplan
  ensimmäisen rivin. "Edellinen" on aina pinon toiseksi viimeinen
  elementti, joten laajennuksesta jäänyt historiakupla kelpaa siksi
  vasta kun se on pinossa.
- **Häipyvä siivu ei ota napautusta vastaan** (`pointer-events: none`
  supistetun pinon ei-viimeisille kuplille): puoliksi leikattu kupla
  avaisi chatin vahingossa. Ele osuu pinoon itseensä, joka ei tee
  mitään eikä päästä sitä kartallekaan (kehys on "sisäpuolta").
- **Supistuksen aikana pino pidetään pohjassa joka kehyksessä**
  (`pidaPinoPohjassa`). Kertavieritys pohjaan tehdään ennen kuin katto
  on ehtinyt kutistua, jolloin selain rajaa `scrollTopin` vielä laajaan
  `clientHeightiin` — ja supistuttuaan ruudulle jäi VANHIN kupla
  uusimman sijaan. Kurkistus teki vian näkyväksi. Laajennuksessa
  pohjaan ei pakoteta: silloin pelaaja on itse kelaamassa.

## Pulun äänitaso on kertojan alapuolella (omistaja 8.9.2026)

Omistaja, sanatarkasti: *"Pulun ääni on vähän voimakkaampi kuin
kertojan, sitä voisi laskea koko pelissä hieman."*

Kertoja soi pelin yleisellä puhevoimalla sellaisenaan (`js/luenta.js
playDiaryVoice`: `audio.volume = puheVoima()`), ja pulu soi samalla
luvulla — mutta käheä, nopea ja tagitettu ääni kuulostaa
voimakkaammalta kuin kertojan tasainen luenta. Nyt kaikki pulun
äänitteet kulkevat yhden kertoimen kautta:

`js/liviapuhe.js` → `LIVIAN_PERUSTASO = 0.8`, ja `soitaLivianAani`
laskee voimakkuuden `puheVoima() × LIVIAN_PERUSTASO × vaimennus`.

Kutsupaikkojen vaimennukset (`HUUDAHDUKSEN_VAIMENNUS`,
`LIVIAN_VALIHUOMION_VAIMENNUS`, kumpikin 0,7) **kertovat** tähän lukuun
eivätkä korvaa sitä, joten välihuuto on yhä suhteessa yhtä paljon
hiljaisempi kuin ennen. Yksi luku kattaa kaikki pulun äänet:
kaupunkirepliikit, välihuomiot linsseissä, avauksen, paljastuksen ja
lehtivinkin.

## Kuplat tyhjenevät uudessa kaupungissa (omistaja 8.9.2026)

Omistaja, sanatarkasti: *"Pulun puhekuplat pitää tyhjentyä kun tullaan
uuteen kaupunkiin."*

Kuplapino jäi ennen ruudulle kaupungin vaihtuessa, ja uuden kaupungin
kuplat kasautuivat edellisen kaupungin puheiden päälle — pinossa oli
kahden kaupungin keskustelu yhtä aikaa. Tyhjennys tehdään
LÄHTÖHETKELLÄ, samassa paikassa jossa lähtö jo vaientaa molemmat äänet:

`js/ui.js vaiennaPaikanPuhe()` = `haivytaLuenta` +
`vaiennaLivianKaupunkipuhe` + `polloKuplatPois()`.

Sitä kutsuvat kaikki neljä lähtötapaa (noppa, jalan, lento, kehittäjän
hyppy). Pino häipyy pehmeästi (`js/pollo.js poistaKuplat`, 200 ms) eikä
räpsähdä pois, ja kaikki sanottu jää chatin historiaan
(`kirjaaKuplaViestiin`) — kelattavaksi kuten ennenkin. Vartiot:
`tests/puhevuoro.test.mjs` (kutsu on yhdessä paikassa) ja
`tools/savukkeet/savuke-pulun-kuplat.mjs` vartio 8 (Riika → Vilna:
Riiassa sanottu ei ole Vilnan pinossa mutta on yhä lokissa).
