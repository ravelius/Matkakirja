# Matkakirja — koko Euroopan kuvaohjaus ja kuvatekstit

**9.9.2026 · EUROOPPA-KUVAOHJAUS-20260909-V1.2 · 45 kohdetta · 45 isoisän kuvaa + 58 PuluCam-kuvaa**

Tämä on yksi yhteinen toimitustiedosto: nykyiset luentatekstit tarinayhteydeksi, molemmat kuvatekstit kaikkiin 103 kuvaan, 49 jo käynnistetyn PuluCam-kuvan promptit, kolme paikka-QA:n vaatimaa korvaavaa promptia, aiemmin tilatut viisi omalla ohjauksella tehtävää kuvaa ja yhden säilytettävän Venetsia3-pilottikuvan alkuperäinen kohtausohje sekä isoisän 45 kuvan tarkistus ja neljä korjauspromptia. Koneelliseen käsittelyyn sama sisältö rinnakkaisessa [JSON-tiedostossa](matkakirja-kuvaohjaus-20260909-koko-eurooppa.json).

## Voimassa olevat päätökset

**V1.2-tarkennus:** Lontoo1 sekä Venetsia1/2 korvataan paikka-QA:ssa löydettyjen geometriavirheiden vuoksi. Kolme uutta promptia ovat liitteessä `posti/matkakirja-pulucam-20260909-paikkakorjaukset-v2.md` ja alla. Lontoo käyttää oikeaa rantapenkkiä, Venetsia1 Punta della Doganan avointa kiveystä ja Venetsia2 Ponte dei Pugnin metallikaidetta. Venetsia3 säilyy lintureferenssinä. Aiempi 49 kuvan tilaus jatkuu; nämä ovat kolme lisäkorvausta, eivät rinnakkainen koko sarjan tilaus. Lopullinen kokonaisuus pysyy 58 PuluCam-kuvassa.

**V1.1-tarkennus:** Firenzen historiallisen käsitutkielman V4 sallii kapean viereisen marmorin reunakaistan anatomian säilyttämiseksi. Se korvaa V3:n rajausehdon; PuluCam-tilaus ja määrät eivät muutu. Tarkka uusin liite: `posti/matkakirja-isoisa-20260909-firenze-kasi-v4.md`.

- **PuluCam-kuvat saa toimittaa suoraan peliin kuvatuotannon paikka-, jatkuvuus- ja laatutarkistuksen jälkeen.** Omistaja poisti tämän sarjan aiemman arviointihyväksynnän odotuksen ja pyysi loput heti työn alle.
- **PuluCamissa käytetään vain tämän tekstisession kuvakohtaisen ohjauksen perusteella tehtyjä kuvia.** Pelkän kaupunkirepliikin pohjalta itsenäisesti suunniteltua kuvaa ei muuteta jälkikäteen meidän promptiksemme. Kolmentoista korvaavan peruskuvan uudet promptit ovat alla: Istanbul, Edinburgh, Pariisi sekä kierroksen 3 kymmenen kaupunkia. Pariisin pilotti saa uuden kuvan myös näkölinjan korjaamiseksi; vanhan kuvan puistokatua ei kopioida Avenue de l'Opéraksi.
- Aiemman pilottisarjan **Venetsia3 säilyy** tämän session 12:20/12:50-kohtausohjeen perusteella ja toimii ihastuksen identiteettireferenssinä. Lontoo1 sekä Venetsia1/2 korvataan V1.2:n tarkoilla prompteilla: alkuperäinen tarinaohjaus oli oikea, mutta kuvien paikkageometria ei läpäissyt loppu-QA:ta. Vanhojen kuvien tekijätiedot ja vertailuversiot säilyvät.
- **Isoisäkuvien nykyinen tyyli on hyväksytty ja säilyy.** Kaikki 45 nykyistä kuvaa on visuaalisesti tarkistettu suhteessa luentateksteihin: 41 säilyy, Lontoo/Firenze/Kiova/Tallinna korjataan. Tämä toteuttaa omistajan myöhemmän nimenomaisen säilyttämisohjeen. Historiallisten korjausten arviointi ja erillinen pelitoimitus jatkuvat jo käytössä olevalla reitillä.
- **B-tarra on käyttäjän valinta**, tunniste `pulucam-sticker-B-r20260909-v1`. Se tulee erillisenä RGBA-tasona; teksti `PuluCam` on tarrassa. Ei toista HTML-tekstiä eikä tarraa puhtaisiin JPEG-alkuperäisiin. Kuvatuotanto ilmoitti jo toimittaneensa sen Fablelle.
- **OHJAUS-01:n viittä kuvaa ei tilata uudelleen.** Firenze/1, Rooma/1, Tromssa/1 jatkuvat alkuperäisillä prompteilla. Tampere1/2 ovat liitteen `matkakirja-pulucam-20260909-tampere-v2.md` mukaiset oikean Kattopuutarhan kuvat, jotka kuvatuotanto ilmoitti jo QA:ssa hyväksytyiksi. Vanha tehdaspihan prompti ei ole voimassa.

## Pakka, tekstit ja ajoitus

Lyhyt kuvateksti näkyy kuvan alla; pitkä näkyy vasta kuvan suurennuksessa. Alla olevat lyhyet ovat enintään 100 merkkiä ja pitkät 300–600 merkkiä. Pitkät eivät ole automaattinen lisäosa luentaääneen. Isoisä puhuu vuonna 1873, Livia nykyajassa. Ihmiset ja arkiset hetket ovat tarinan fiktiota todellisessa ympäristössä.

**Isoisän pitkän kuvatekstin viimeiseksi lisätään toimiva Havainnekuva-linkki**, joka avaa pelin olemassa olevan selityksen havainnekuvien luonteesta ja rajallisesta vastaavuudesta todellisuuteen. Ei linkkiä lyhyeen. Kenttä `sourceLine = Matkakirjan havainnekuva` on linkin ohjaus; selitystä ei kirjoiteta isoisän suuhun. `sources` ovat taustalähteitä. Kenttäkartta: `captionShort → lyhyt`, `caption → selite`, `sourceLine → lahde`, `sources → lahteet`.

Isoisän kuva jää pakan pohjalle. Pulun kommentin alkaessa sen päälle tulee kaupungin 1–3 PuluCam-kuvaa lievästi eri asennoissa niin, että alapuolisten reunat näkyvät. Napautus avaa karusellin: isoisän kuva ensin, sitten pulun kuvat numerojärjestyksessä. **Venetsia käyttää viittä pulun kuvaa, joten karusellissa voi olla yhteensä kuusi.** Kuvien määrä valitaan alla olevan taulukon perusteella; älä katkaise viiden sarjaa kolmeen.

Venetsian jo 12:20 toimitettu repliikki (**106 merkkiä**) sovitetaan tähän albumiin:

> Tässä Venetsia. Hetkinen. Nuo ovat yksityisiä. Hän vain sattui jokaiseen hyvään kuvakulmaan. Sulje albumi.

Ensimmäinen kuva on vielä kaupunkikuva; `Hetkinen` käynnistää vahinkopurkan, ja seuraavat tulevat lyhyin välein päälle. Kuva 5 paljastaa lopullisesti ihastuksen. Tarkka rytmi sovitetaan olemassa olevan tai tästä repliikistä esigeneroidun äänen kestoon, ei lisätä käyttäjän suljettavaksi viittä modal-ikkunaa. `Sulje albumi` ei poista pelaajan mahdollisuutta katsella kuvia. Muissa kaupungeissa kuvat 2–3 ovat jatkoa samalle havainnolle, eivät vaihtuvaa satunnaiskuvitusta.

## Tuotanto ja palautus

**49 uuden PuluCam-ruudun tuotanto on jo käynnistetty tästä ohjauksesta:** 36 uutta lisä-/peruskuvaa ja 13 aiemman itsenäisesti suunnitellun kuvan korvausta. Tämä on yhden olemassa olevan tilauksen loppuohjaus, ei rinnakkaistuotanto. V1.2 lisää vain yllä nimetyt kolme vanhan pilottikuvan paikkakorvausta. Näin 52 nyt ohjattavaa kuvaa + viisi aiemmin tilattua OHJAUS-01-kuvaa + yksi säilyvä Venetsia3 muodostavat samat 58 lopullista kuvaa. Ensimmäinen saman paikan kuva tarkistetaan ennen siitä jatkuvaa kuvaa. Jos kuvauskohta ei ole nykyarkkitehtuurissa mahdollinen, palauta konkreettinen ristiriita tekstisessiolle kuten Tampereessa tehtiin; älä keksimällä avaa kattoa, siirrä maamerkkiä tai vaihda aiheen ydintä.

Kuvatuotanto palauttaa per kuva `cityId`, `order`, `url`, `sha256`, `dimensions`, molemmat kuvatekstit, lähteet ja tarkka `promptSource`/`promptId`. Tässä tiedostossa arviointisivun polut ovat vain tunnisteita: **niitä ei tuoda pelin media-URL:iksi**. Pelipalvelun todellinen osoite, latauksen tarkiste ja mitat täytetään vasta toimituksesta. Ei keksittyjä tarkisteita tai väitteitä valmistumisesta. Valmistuneet PuluCam-erät toimitetaan Fablelle pienissä toimituksissa ilman uutta omistajahyväksyntää. Vanhat versiot säilyvät vertailussa.

Nykyajan sarja on luonnollinen värivalokuva, noin **14 mm rectilineaarinen** näkymä, vaihteleva maataso/räystäs/lento. Historiallisen sarjan neutraali vaalea **Giza-paperi, pehmeä piirto, kuitu, taitosuurteet ja vaalea epätasainen reunahäivytys** pysyvät erillisinä. Kummassakaan kuvaaja ei näy omassa valokuvassaan. Venetsian ihastus on toinen lintu. Vain ihastusalbumissa on kasvavat sydän- ja säihkekoristeet reunoilla; keskusta pysyy valokuvana.

## Kohteet ja määrät

| Kohde | cityId | Isoisän kuva | PuluCam-kuvia |
|---|---|---|---:|
| Lontoo | `lontoo` | Uusi aihetta vastaava | 1 |
| Istanbul | `istanbul` | Säilytä | 1 |
| Dublin | `dublin` | Säilytä | 1 |
| Edinburgh | `edinburgh` | Säilytä | 1 |
| Pariisi | `pariisi` | Säilytä | 1 |
| Marseille | `marseille` | Säilytä | 1 |
| Lissabon | `lissabon` | Säilytä | 1 |
| Madrid | `madrid` | Säilytä | 1 |
| Barcelona | `barcelona` | Säilytä | 1 |
| Granada | `granada` | Säilytä | 1 |
| Sevilla | `sevilla` | Säilytä | 1 |
| Amsterdam | `amsterdam` | Säilytä | 2 |
| Berliini | `berliini` | Säilytä | 1 |
| Praha | `praha` | Säilytä | 1 |
| Wien | `wien` | Säilytä | 1 |
| Budapest | `budapest` | Säilytä | 2 |
| Varsova | `varsova` | Säilytä | 2 |
| Krakova | `krakova` | Säilytä | 1 |
| Alpit | `alpit` | Säilytä | 1 |
| Venetsia | `venetsia` | Säilytä | 5 |
| Firenze | `firenze` | Uusi aihetta vastaava | 1 |
| Rooma | `rooma` | Säilytä | 1 |
| Sisilia | `sisilia` | Säilytä | 1 |
| Ateena | `ateena` | Säilytä | 1 |
| Kreeta | `kreeta` | Säilytä | 1 |
| Dubrovnik | `dubrovnik` | Säilytä | 3 |
| Sarajevo | `sarajevo` | Säilytä | 1 |
| Sofia | `sofia` | Säilytä | 1 |
| Bukarest | `bukarest` | Säilytä | 1 |
| Kiova | `kiova` | Uusi aihetta vastaava | 1 |
| Odessa | `odessa` | Säilytä | 1 |
| Moskova | `moskova` | Säilytä | 1 |
| Pietari | `pietari` | Säilytä | 1 |
| Helsinki | `helsinki` | Säilytä | 2 |
| Tampere | `tampere` | Säilytä | 2 |
| Tallinna | `tallinna` | Uusi aihetta vastaava | 1 |
| Riika | `riika` | Säilytä | 1 |
| Vilna | `vilna` | Säilytä | 1 |
| Tukholma | `tukholma` | Säilytä | 1 |
| Oslo | `oslo` | Säilytä | 2 |
| Bergen | `bergen` | Säilytä | 2 |
| Kööpenhamina | `kobenhavn` | Säilytä | 1 |
| Rovaniemi | `lappi` | Säilytä | 1 |
| Tromssa | `tromssa` | Säilytä | 1 |
| Islanti | `islanti` | Säilytä | 1 |

## Lontoo — lontoo

**Isoisän luettava teksti:** Lontoossa on pantu höyryveturi maan alle ja matkustajat sen savuun. Vastapäinen herra luki lehteään, vaikka katosi välillä näkyvistä. Merkillinen kansa, me englantilaiset: jos helvettiin vedettäisiin kiskot, kysyisimme ensimmäiseksi, onko ensimmäisessä luokassa pehmustetut penkit. Perille päästiin nopeasti. Yskä saapui mukana.

**Pulun kaupunkirepliikki (lähtöteksti):** Metro kulkee nyt sähköllä. Minä en vaihtaisi taivasta pehmustettuun penkkiin, Fogg.

### Isoisän kuva / 1

**Päätös:** KORJAA tällä jo toimitetulla aiheella

**Perustelu:** Nykyinen kuva näyttää asemalaiturin, vaikka tekstin vastapäinen sanomalehdenlukija on vaunun sisällä. Omistaja pyysi nimenomaan sisänäkymää.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-lontoo-r20260909-paper-v4`

**Lyhyt kuvateksti (65):** Lontoo, 1873. Vastapäinen herra pysyi lehden puolella savustakin.

**Pitkä kuvateksti (381):** Vaunun ikkuna antoi valoa sen verran, että näin lehden liikahtavan. Lukija itse oli savussa epävarmempi tapaus. Metropolitanin junaa veti höyryveturi, vaikka rata kulki maan alla; uutuuden mukana matkusti siis vanha tuttu hiilensavu. Odotin pysähdyksen ajan kameran takana. Herra odotti uutisten loppumista. Kumpikaan meistä ei näyttänyt pitävän yskimistä syynä keskeyttää työtään.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Jo toimitettu prompti:** `ISOISA-TARINA-V2-lontoo` · `posti/matkakirja-isoisa-20260909-korjauspromptit.md`

Create a believable travel photograph made in 1873, printed as the SAME worn photographic paper style already approved for this series. Use https://media.matkakirja.app/kohtaamiset/isoisa/isoisa-giza-aged-r20260905-v1.jpg as the PAPER-TONE reference: pale neutral natural white, slightly grey, with only an extremely restrained grey-brown photographic image. No yellow or sepia-coloured paper. Soft period lens and print rendering, visibly irregular photographic grain; broad light and shadow shapes remain legible. Natural paper fibres, wear and clear irregular fold grooves continue beneath the uneven PALE edge fading all the way to the edges. Faint scene detail remains at the edges on the same continuous paper, no separate white backing, hard postcard border or dark vignette. True camera photograph with believable depth, light and materials, not drawn outlines or painterly patches. Do not sharpen masonry or fine decoration digitally. Landscape 3:2, 1536x1024, sRGB. Period-appropriate lens, exposure and illumination; no modern snapshots, flash or futuristic wide-angle effect. The grandfather is BEHIND the camera and never visible, even as a substitute foreground traveller. Other people are fictional anonymous locals. Use authentic period photographs or contemporary evidence to reconstruct the specific place, not later architecture. Inside an enclosed Metropolitan Railway passenger compartment in London, December 1873, photographed from the opposite passenger bench. The central subject is an ordinary well-dressed English gentleman absorbed in his spread newspaper on the facing bench, faintly obscured by layers of infiltrating steam-engine smoke. Show actual early wooden compartment construction, facing seats, period window frames and one small side-door portion; the surrounding interior must unequivocally place the CAMERA INSIDE THE CARRIAGE. Natural window and open-door daylight during a stop at an open cutting station makes a supported slow exposure plausible. The man sits still; slight blur at one hand and smoke, no instantaneous action. Haze softens and partly conceals his outline without becoming a blazing fire, magical mist or impenetrable blackness. Modest period upholstery if verified for the chosen pre-1873 carriage class. No locomotive inside, no station bench, modern tube tunnel or long modern central aisle. Use pre-1873 compartment evidence: restored Metropolitan carriage 353 was built in 1892 and coach 400 in 1900, so neither is an exact 1873 interior reference. Avoid copying their later distinctive fittings. Newspaper text may be indistinct; no invented readable headline.

**Kuvatekstin käyttöönotto:** vasta tämän uuden kuvan kanssa. Vanha kuva säilyy siihen saakka.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://www.ltmuseum.co.uk/collections/stories/transport/metropolitan-line)
- [Lähde 2](https://collection.sciencemuseumgroup.org.uk/objects/co8031819/henry-flather-collection-photographs)
- [Lähde 3](https://www.heritagefund.org.uk/news/worlds-oldest-known-underground-carriage-be-restored)

### PuluCam / 1

**Toimi:** KORVAA — aiemman kuvan paikkageometria hylätty, uusi V2-prompti

**PromptId:** `PAIKKA-V2-20260909-lontoo-1`

**Promptin alkuperä:** `posti/matkakirja-pulucam-20260909-paikkakorjaukset-v2.md`

**Tarinallinen havainto:** Pulun oma tärkeysjärjestys: penkin muru etualalla, Westminsterin valtava koneisto oikeassa paikassaan joen takana. Maailma on avoin isoisän savuisen vaunun jälkeen.

**Näkökulma:** Queen's Walk / Albert Embankment, St Thomas' Hospitalin kohdalla Westminster Bridgen eteläpuolella. Kamera noin 10 cm oikean rantapenkin istuimen yläpuolella, kohti joen vastarantaa länteen–luoteeseen.

**Lyhyt kuvateksti (59):** Lontoo: parlamentti jäi taustalle. Penkillä oli tärkeämpää.

**Pitkä kuvateksti (378):** Istuin Thamesin rantapenkin reunalle. Elizabeth Tower näkyy joen toisella puolella parlamentin pohjoispäässä, mutta aivan nokan edessä on muru. Sitä ei ole merkitty yhteenkään karttaan. Westminsterin sillalla punainen bussi vie ihmisiä eteenpäin; minun ei tarvitse lähteä vielä mihinkään. Isoisä valitsi maanalaisen vaunun. Tällä penkillä on parempi ilmanvaihto ja oma tarjoilu.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from Livia's own pigeon-eye camera. Landscape 3:2, 1536x1024, sRGB. Full-frame 14 mm RECTILINEAR ultra-wide lens: strong near/far perspective, natural spatial depth, real materials and believable daylight. No fisheye circle, CGI, painted outlines, synthetic HDR, fake miniature blur or historical paper treatment. The photographer Livia remains behind the camera and is never visible. Use real photographs of the exact named viewpoint to constrain architecture, water edges and railings. Ordinary people and the small incident may be fictional, but architecture must not be invented. Keep the subject and place legible at phone size. Supply the clean colour photograph without text, PuluCam sticker or watermark; the selected B sticker is added separately by the game. Exact setting: a real riverside bench on the Queen's Walk / Albert Embankment opposite St Thomas' Hospital, SOUTH of Westminster Bridge. The camera is about 10 centimetres above the bench seat, not 10 centimetres above the pavement. A few ordinary bread crumbs and the near edge of the real bench dominate the lower foreground. The perspective makes one crumb comically important without turning it into an oversized fantasy object. A passer-by's lower leg may enter a side margin only if it fits this actual bench viewpoint. Look WEST to NORTHWEST across the Thames. Elizabeth Tower is at the RIGHT/NORTHERN end of the Palace of Westminster in this composition; the palace's long river frontage extends LEFT/SOUTH from it. If Victoria Tower fits, it belongs at the far LEFT/southern end. Preserve the real asymmetric outline and the clock tower's position set back from the river front: do not place Elizabeth Tower in the middle of a symmetrical palace, and do not extend a fabricated matching Gothic facade to its right. Westminster Bridge, if included, enters on the RIGHT/northern side, with one small contemporary red double-decker bus on the actual bridge roadway, never on the riverside footpath. Retain the real riverside barrier at its real height; at this deliberately low bench-seat camera position it may legitimately hide the river surface and lower parts of the opposite facade. Do not remove, lower, make transparent or replace the barrier just to show more palace. A partial but geometrically faithful landmark view is wanted. Match bench position, barrier construction, bridge direction and facade relationships to actual current reference photographs before rendering. Livia's amusing observation is the tiny crumb immediately in front of the great clock tower, not a fabricated unrestricted panorama.

**Vertailuun jäävän vanhan kuvan tunniste:** `pulu-cam-lontoo-01-r20260909-v1`

Tämä uusi korvaava prompti on tekstisession kirjoittama. Aiempi kuva säilytetään hylättynä paikkageometrian vuoksi; sen alkuperäisiä tekijätietoja ei muuteta.

**Kuvatekstin käyttöönotto:** vasta tämän uuden kuvan kanssa.

**Paikkatarkistus:** Varmista oikea penkki ja rantasuojan korkeus; kamera on penkin istuimen tasosta 10 cm, ei maasta esteen läpi. Vastarantaa katsottaessa Elizabeth Tower oikealla/pohjoispäässä, pitkä jokijulkisivu vasemmalle/etelään. Älä rakenna tornin oikealle puolelle symmetristä palatsia. Kaide saa peittää alemman näkymän. Bussi vain oikealla Westminster Bridgellä.

**Lähteiden käyttö:** South Bank Londonin Queen's Walk -sivu osoittaa kuvausalueen, Westminster Bridge–Lambeth Bridge -rantakävelyn ja penkit. Parlamentin oma arkkitehtuurisivu ja sen kokonaiskuva määräävät rakennuksen geometrian. Tarkka penkin ja rantasuojan suhde varmistetaan tuotannossa oikeasta paikkakuvasta; alhaisen kameran näkymäesteitä ei poisteta.

**Lähteet:**

- [Lähde 1](https://southbank.london/see-and-do/queens-walk)
- [Lähde 2](https://www.parliament.uk/about/living-heritage/building/palace-westmister-at-150/external-architecture-/)

---

## Istanbul — istanbul

**Isoisän luettava teksti:** Galatan mäessä kantaja laski arkkunsa kivelle ja antoi mäen odottaa. Sen sisään kaivetaan tunnelia, jotta ihmiset pääsisivät ylös istualtaan. Merkillistä, miten paljon työtä tarvitaan työn välttämiseen. Alhaalla salmi oli täynnä laivoja. Kantaja nosti arkun selkäänsä ennen kuin sain niiden mastot lasketuksi. Hänellä oli parempaa tekemistä.

**Pulun kaupunkirepliikki (lähtöteksti):** Tünelin vaunu vie nyt mäen ylös. Isoisä laski mastoja; kantajalta olisin kysynyt, missä saa levätä.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-istanbul-r20260909-paper-v4`

**Lyhyt kuvateksti (57):** Konstantinopoli, 1873. Kantajan tauko ja mäen koko paino.

**Pitkä kuvateksti (389):** Arkun kahvat olivat hioutuneet sileiksi, mutta portaissa riitti vielä kulutettavaa. Kantaja istui kuormansa viereen ja antoi minun valmistella kameran. Galatan korkeuksilta näkyi alhaalla mastoja ja liikettä; jokin osa niistäkin tavaroista oli kannettava tätä mäkeä ylös. Tuleva tunneli lupaa ihmiselle istumapaikan matkaksi. Toivoin, että myös tämän miehen arkulle varattaisiin sellainen.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://www.metmuseum.org/art/collection/search/263021)
- [Lähde 2](https://archives.saltresearch.org/handle/123456789/204674)

### PuluCam / 1

**Toimi:** UUSI OMA PROMPTI — korvaa aiempi tästä sessiosta riippumatta promptattu versio

**PromptId:** `OHJAUS-EU-V1-istanbul-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Istanbul: mäen voi voittaa myös istumalla.

**Näkökulma:** At the verified public pedestrian approach beside Galata Tower in present-day Istanbul, put the camera 10 cm above the paving, close to a seated adult courier's ordinary delivery bag.

**Lyhyt kuvateksti (42):** Istanbul: mäen voi voittaa myös istumalla.

**Pitkä kuvateksti (400):** Galatan mäkeä kiivetään yhä ostosten, laukkujen ja päivän töiden kanssa. Tünel kuljettaa ihmisiä ylöspäin maan sisällä, mutta levähdyspaikka kelpaa sen valmistumisesta huolimatta. Minä tunnistan hyvän pysähdyksen heti: seinä selän takana ja koko kulkureitti näkyvissä. Isoisä laski alhaalla mastoja. Tässä olisi ollut tilaisuus kysyä siltä istuvalta ihmiseltä, miten kaupunki oikeasti kannetaan ylös.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. At the verified public pedestrian approach beside Galata Tower in present-day Istanbul, put the camera 10 cm above the paving, close to a seated adult courier's ordinary delivery bag. The courier rests briefly with relaxed shoes in view while pedestrians climb the real sloping street beyond. Frame the actual tower base and steep street geometry from current references; the bag is prominent by near perspective. Quiet competent recognition between two working couriers, not a tourist postcard. No tram tracks at Galata Tower, no fabricated Bosphorus panorama, no Tünel train on the surface. Warm late-afternoon daylight; a small resting place is the main discovery.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.metro.istanbul/en/Hatlarimiz/HatDetay?hat=T1)
- [Lähde 2](https://visit.istanbul/galata-tower)
- [Lähde 3](https://commons.wikimedia.org/wiki/Category:Galata_Tower_from_the_B%C3%BCy%C3%BCk_Hendek_Street)
- [Lähde 4](https://commons.wikimedia.org/wiki/File:Galata_Kulesi_Street,_viewed_from_Galata_Tower_in_2024.jpg)

---

## Dublin — dublin

**Isoisän luettava teksti:** Guinnessin panimon vuokrasopimus on tehty yhdeksäksituhanneksi vuodeksi. Sellaisen allekirjoittamiseen tarvitaan uskoa joko olueen tai janoon. Portilla tuoksui lämmin mallas, ja kärryille vieritettiin tynnyreitä. Mies pyyhki otsaansa hihalla. Kysyin, loppuuko työ koskaan. Hän katsoi minua pitkään. Olin unohtanut vuokrasopimuksen.

**Pulun kaupunkirepliikki (lähtöteksti):** Guinnessiä pannaan täällä yhä. Yhdeksäntuhatta vuotta? Minä en lupaisi edes istuvani samalla räystäällä.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-dublin-r20260909-paper-v4`

**Lyhyt kuvateksti (41):** Dublin, 1873. Tynnyrit lähtivät, työ jäi.

**Pitkä kuvateksti (390):** Panimon pihassa tynnyrin pyöreys osoittautui hyvin harkituksi ominaisuudeksi. Mies saattoi vierittää kuorman kärryille, mutta joutui nostamaan itsensä jokaisen perässä uudelleen töihin. Pyysin häntä pysähtymään kuvan ajaksi. Hän pyyhki otsansa ja suostui. Guinnessin yhdeksäntuhannen vuoden vuokra näyttää paperilla huvittavalta; tämän pihan työpäivässä siitä näkyy vain pieni, hikinen osa.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://www.dublincity.ie/sites/default/files/2020-10/hoyd-volume-1.pdf)
- [Lähde 2](https://www.dublincity.ie/sites/default/files/media/file-uploads/2018-05/Liberties_LAP.pdf)

### PuluCam / 1

**Toimi:** UUSI OMA PROMPTI — korvaa aiempi tästä sessiosta riippumatta promptattu versio

**PromptId:** `OHJAUS-EU-V1-dublin-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Dublin: vuokrasopimus on pitkä. Minun pysähdykseni ei.

**Näkökulma:** At the real St James's Gate Guinness brewery entrance in Dublin, put a 14 mm camera 9 cm above the pavement beside the actual kerb.

**Lyhyt kuvateksti (54):** Dublin: vuokrasopimus on pitkä. Minun pysähdykseni ei.

**Pitkä kuvateksti (364):** St James's Gatella panimon portti on muuttunut myös matkalaisten kuvauspaikaksi. Työ jatkuu portin takana, ja edessä säädetään puhelimia sopivaan asentoon. Arthur Guinness uskalsi vuokrata paikan yhdeksäksituhanneksi vuodeksi. Minä annoin tälle reunakivelle yhden hetken ja otin kuvan ennen lähtöä. Pitkää sopimusta lyhyempi reitti on joskus ihan hyvä suunnitelma.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. At the real St James's Gate Guinness brewery entrance in Dublin, put a 14 mm camera 9 cm above the pavement beside the actual kerb. Huge near perspective of a visitor's rolling suitcase wheel and a tiny damp leaf; beyond, two ordinary adults adjust a phone to photograph the verified dark brewery gates. Keep enough real gate, brick and street proportions to identify the brewery. One shoe is just lifting to leave, creating a small joke about permanence versus moving on. Current clothing and authentic soft Dublin daylight, not green fantasy lighting. Match the exact entrance reference, not a newly invented brewery street. No invented clear advertisement text or floating beer.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.visitdublin.com/see-do/details/guinness-storehouse)
- [Lähde 2](https://assets-eu-01.kc-usercontent.com/aa24ba70-9a12-01ae-259b-7ef588a0b2ef/777408eb-dc0c-4197-8878-328a7e76c1b3/Guinness%20Storehouse%20Gates%20%282%29.jpg)
- [Lähde 3](https://www.visitdublin.com/guides/art-of-brewing)

---

## Edinburgh — edinburgh

**Isoisän luettava teksti:** Edinburghissa katu saattaa olla toisen kadun katto. Menin portaita alas ja tulin ulos korkealla jonkun ikkunan yläpuolella. Pyykkinaru kulki kujan yli, ja sukat riippuivat kuilun päällä vailla vähäisintäkään huimausta. Linnan musta kallio kohosi kaiken takana. Kaupungin kartoittamiseen tarvittaisiin tavallisen paperin lisäksi toinen arkki päälle.

**Pulun kaupunkirepliikki (lähtöteksti):** Elokuussa täällä on nyt festivaaleja kellareita myöten. Isoisä eksyi kerroksiin; minä valitsen katon.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-edinburgh-r20260909-paper-v4`

**Lyhyt kuvateksti (57):** Edinburgh, 1873. Sukat olivat oppineet asumaan korkealla.

**Pitkä kuvateksti (395):** Asetin kameran kujan portaalle ja huomasin vasta sitten, että ylempänä kulki vielä toinenkin reitti. Pyykit yhdistivät vastakkaisia taloja, vaikka niiden asukkaat joutuivat käyttämään portaita. Linnan kallio näkyi rakennusten lomasta kuin peruste, jonka päälle kaikki nämä mutkat oli kirjoitettu. Kuvaan mahtui enemmän korkeutta kuin olin saanut karttaan. Sukat osasivat asian ilman mittaamista.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://canmore.org.uk/site/52499/edinburgh-old-town)
- [Lähde 2](https://www.historicenvironment.scot/visit-a-place/places/edinburgh-castle/history/)

### PuluCam / 1

**Toimi:** UUSI OMA PROMPTI — korvaa aiempi tästä sessiosta riippumatta promptattu versio

**PromptId:** `OHJAUS-EU-V1-edinburgh-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Edinburgh: löysin kerroksen, jossa ei tarvitse kysyä tietä.

**Näkökulma:** From a real stone roof-edge perch beside Edinburgh's Camera Obscura rooftop, lens 10 cm above that ledge, photograph a documented view toward the Castle and layered Old Town roofs.

**Lyhyt kuvateksti (59):** Edinburgh: löysin kerroksen, jossa ei tarvitse kysyä tietä.

**Pitkä kuvateksti (363):** Edinburghin vanhakaupunki kasvaa sekä pitkin katua että sen päälle. Elokuun festivaaleilla kellaritkin muuttuvat esityspaikoiksi, ja ihmiset etsivät oikeaa ovea ohjelma kädessään. Katolla ovia on vähemmän. Tästä erotan reitit, savupiiput ja sen, kuka pysähtyy väärän talon kohdalle. Isoisän toinen kartta-arkki oli hyvä ajatus. Minun versioni ei tarvitse paperia.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. From a real stone roof-edge perch beside Edinburgh's Camera Obscura rooftop, lens 10 cm above that ledge, photograph a documented view toward the Castle and layered Old Town roofs. Use the operator's actual rooftop photographs to lock direction and foreground stonework. A folded festival programme held by a nearby adult visitor may enter a side edge, while small visitors below search for a street entrance. Strong near/far depth from weathered ledge to chimneys and castle rock. Overcast bright August light. Do not combine Castle, Calton Hill and unrelated roof views into one impossible panorama. No bird photographer visible.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.edinburgh.gov.uk/downloads/file/23848/c2a-camera-obscura-calton-hill)
- [Lähde 2](https://www.camera-obscura.co.uk/home/)
- [Lähde 3](https://www.camera-obscura.co.uk/news/article/Best-Views/)

---

## Pariisi — pariisi

**Isoisän luettava teksti:** Pariisin uusi oopperatalo on yhä kesken, mutta mahtaako sisällä enää tapahtua mitään seinien veroista? Kultaa, pylväitä, marmoria. Kokonainen rakennus parhaissa juhlatamineissaan. Paluumatkalla seurasin kaksi korttelia miestä, joka vihelsi leipä kainalossa. Jos hänelle annettaisiin tuo talo, menisin kuuntelemaan. Toistaiseksi hän esiintyy ilmaiseksi.

**Pulun kaupunkirepliikki (lähtöteksti):** Leipä kainalossa? Olisin seurannut minäkin. Ooppera valmistui, ja nyt pelkästä talon katsomisestakin maksetaan.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-pariisi-r20260909-paper-v4`

**Lyhyt kuvateksti (48):** Pariisi, 1873. Ooppera harjoitteli juhlapukuaan.

**Pitkä kuvateksti (402):** Telineet pitivät vielä kiinni uudesta oopperasta, mutta koristeet näyttivät jo odottavan yleisöä. Garnier'n talossa arki työskentelee parhaillaan juhlan hyväksi: kivipölyä, lautoja ja paljon käsipareja, jotta joku myöhemmin voisi vain astua sisään parhaassa takissaan. Odotin valon siirtymistä pylväälle. Se osasi tehdä rakennukselle enemmän kuin lyhyt vierailuni rakennusmestarina olisi saanut aikaan.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://www.parismuseescollections.paris.fr/en/node/490866)
- [Lähde 2](https://www.parismuseescollections.paris.fr/fr/musee-carnavalet/oeuvres/construction-du-palais-garnier-actuel-opera-national-de-paris-9eme)

### PuluCam / 1

**Toimi:** UUSI OMA PROMPTI — korvaa aiempi tästä sessiosta riippumatta promptattu versio

**PromptId:** `OHJAUS-EU-V1-pariisi-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Pariisi: oopperan paras aitiopaikka jäi ilman samettia.

**Näkökulma:** A present-day camera-pigeon perch on a VERIFIED external roof balustrade or cornice of Palais Garnier, Paris.

**Lyhyt kuvateksti (55):** Pariisi: oopperan paras aitiopaikka jäi ilman samettia.

**Pitkä kuvateksti (397):** Palais Garnier'n yleisö katsoo tavallisesti lavalle tai ylöspäin kohti koristeita. Minä aloitin koristeen vierestä. Katon reunalla kullan rinnalla näkyvät saumat, sadejäljet ja tavallinen kivi: juhla-asu tarvitsee huoltoa siinä missä sulatkin. Isoisä epäili, riittäisikö talon sisään yhtä paljon katsottavaa. Näytän ensin tämän puolen. Aitiopaikastani puuttuu tuoli, mutta siihen olen jo tottunut.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. A present-day camera-pigeon perch on a VERIFIED external roof balustrade or cornice of Palais Garnier, Paris. Lens 10 cm above the stone ledge beside an actual documented gilded ornament. Show the real weathered ornament and roof material large at one edge, and the correct building's smaller roof forms and a modest slice of city beyond. Match museum/operator roof references exactly; do not invent a lyre sculpture in an arbitrary spot. A restrained near architectural study with extraordinary depth and afternoon light, not a giant Louvre backdrop. If Avenue de l'Opéra is visible, it is the real treeless avenue with correct distant geometry, never a tree-lined boulevard. Replace the old pilot whose street/background geography needs correction; do not use it as architectural truth.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.operadeparis.fr/actualites/restauration-de-la-facade-principale-du-palais-garnier)
- [Lähde 2](https://www.parismuseescollections.paris.fr/fr/musee-carnavalet/oeuvres/loggia-et-toit-de-l-opera-garnier-9eme-arrondissement-paris)
- [Lähde 3](https://www.operadeparis.fr/en/enterprises/film-and-spaces-locations)

---

## Marseille — marseille

**Isoisän luettava teksti:** Marseillen satamassa myytiin saippuaa tiiliskivinä. Kauppias vakuutti, että niillä pesisi vaikka koko maailman. Hänen kyntensä olivat mustat, sillä hän oli juuri auttanut laivan köysissä. Ostin palan. Terva, kala ja suolavesi seurasivat minua majataloon. Maailma ei suostunut pesuun yhdellä yrittämällä, mutta käteni olivat jo toista mieltä.

**Pulun kaupunkirepliikki (lähtöteksti):** Marseillen saippuaa tehdään yhä. Sataman lokit eivät ole kuulleetkaan puhtaasta pöydästä.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-marseille-r20260909-paper-v4`

**Lyhyt kuvateksti (64):** Marseille, 1873. Saippuaa merelle lähtevän kaupungin tarpeisiin.

**Pitkä kuvateksti (397):** Saippuaharkot oli ladottu pöydälle kuin pienet rakennuskivet. Niiden lähellä odottivat köydet ja kala, joita vastaan palat oli tarkoitettu, ainakin hajusta päätellen. Marseillen satamassa tavara koskee tavaraan ennen kuin ehtii matkustajan laukkuun. Kauppias jäi kuvan ajaksi paikoilleen ja laski kätensä pöydälle. Mustat kynnet eivät heikentäneet myyntipuhetta: hän tunsi työn, josta lika syntyy.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://collections.musees.marseille.fr/)
- [Lähde 2](https://www.musee-orsay.fr/sites/default/files/2021-10/feuilletage_cinema_2.pdf)

### PuluCam / 1

**Toimi:** UUSI OMA PROMPTI — korvaa aiempi tästä sessiosta riippumatta promptattu versio

**PromptId:** `OHJAUS-EU-V1-marseille-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Marseille: sataman lokki tarkasti myös pöydän alapuolen.

**Näkökulma:** Lens at 8–10 cm above the real paving beneath an open-air café table at Marseille's Vieux-Port, looking toward a verified quay view with moored small boats and genuine opposite frontage.

**Lyhyt kuvateksti (56):** Marseille: sataman lokki tarkasti myös pöydän alapuolen.

**Pitkä kuvateksti (393):** Vanhassa satamassa veneet ovat vaihtuneet moneen kertaan, mutta niiden ympärillä tehdään yhä kauppaa ja syödään. Lokki on järjestänyt itselleen oman tarkastuskierroksen. Katson sen kengän ja tuolin väliin mahtuvaa reittiä ammatillisella kiinnostuksella. Isoisä osti täällä saippuaa. Tälle pöydälle pitäisi ehkä hankkia myös vartija. Olen käytettävissä, kunhan tehtävän tarjoilu sovitaan ensin.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. Lens at 8–10 cm above the real paving beneath an open-air café table at Marseille's Vieux-Port, looking toward a verified quay view with moored small boats and genuine opposite frontage. A real yellow-legged gull strides very close past a chair leg, inspecting a fallen ordinary piece of paper and a few crumbs; one adult hand above retrieves a napkin. The gull's focused eye and long leg near the lens create the visual humour. Do not turn the bird into an aggressive monster. Keep real table placement on the café side, not invented furniture floating on the water or blocking a quay lane. Clear Mediterranean light and natural material detail.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.marseille-tourisme.com/en/discover-marseille/culture-heritage/discover-the-sites-and-monuments-in-marseille/the-old-port/)
- [Lähde 2](https://provence-alpes-cotedazur.com/en/things-to-do/nature-outdoor-activities/in-the-footsteps-of-saint-mary-magdalene/marseille-lestaque-marseille-city-centre-saint-victor/)
- [Lähde 3](https://woody.cloudly.space/app/uploads/crt-paca/2021/06/thumbs/esplanade-vieux-port-marseille-exclu-mm-otcm-1920x960.jpg)

---

## Lissabon — lissabon

**Isoisän luettava teksti:** Baixan kadut vedettiin järistyksen jälkeen suoriksi kuin hallitsijan jakaukseksi. Eksyin silti heti, kun poikkesin Alfamaan. Siellä portailla istuva nainen neuvoi ylöspäin. Ylhäällä toinen neuvoi alas. Kumpikin oli oikeassa: löysin meren molemmista suunnista, vain eri kattojen välistä. Kartta on täällä taskussa kulkeva lohdutus.

**Pulun kaupunkirepliikki (lähtöteksti):** Lissabonissa on nyt hissejä mäkiä varten. Ihmiset eivät saaneet siipiä, joten piti ryhtyä rakennustöihin.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-lissabon-r20260909-paper-v4`

**Lyhyt kuvateksti (45):** Lissabon, 1873. Naisen neuvo jatkui portaina.

**Pitkä kuvateksti (399):** Nainen osoitti ylöspäin niin varmasti, että annoin kamerankin katsoa samaan suuntaan. Alfaman katot peittivät veden ja avasivat sen taas seuraavassa raossa. Alempana Baixan uudelleen rakennetut kadut tottelevat viivoitinta; tämä kaupunginosa näyttää ottaneen käskyt rinteeltä. Portaalla seisojan ei tarvitse tietää koko reittiä neuvoakseen seuraavan käännöksen. Minulle olisi riittänyt aluksi sekin.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://www.patrimoniocultural.gov.pt/wp-content/uploads/2024/08/ER4.pdf)
- [Lähde 2](https://imovel2.patrimoniocultural.gov.pt/detalhes.php?code=19448470)

### PuluCam / 1

**Toimi:** UUSI OMA PROMPTI — korvaa aiempi tästä sessiosta riippumatta promptattu versio

**PromptId:** `OHJAUS-EU-V1-lissabon-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Lissabon: hissin yläpää. Siipiä myydään ilmeisesti pareittain.

**Näkökulma:** From a physically real external perch next to the upper access walkway of Lisbon's Santa Justa lift, camera 10 cm above the ledge.

**Lyhyt kuvateksti (62):** Lissabon: hissin yläpää. Siipiä myydään ilmeisesti pareittain.

**Pitkä kuvateksti (373):** Santa Justan hissi yhdistää Baixan alempia katuja Carmon korkeuksiin. Yhdessä kaupungissa voi siis jäädä jonottamaan pelkkää ylämäkeä. Minä saavuin viereiselle reunalle toisesta suunnasta ja katselin, kuinka matkustajat astuivat ulos. Isoisä löysi veden kattojen välistä. Tästä löytyvät ensin katot ja niiden päältä taas ihmisiä, jotka yrittävät päästä vielä vähän ylemmäs.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. From a physically real external perch next to the upper access walkway of Lisbon's Santa Justa lift, camera 10 cm above the ledge. Use the actual ironwork, Carmo-side connection and sightline shown in current references. The closest iron curves frame a few present-day visitors stepping from the lift toward the walkway; Baixa roofs recede below in their true direction. Play on a pigeon already sitting at the destination while humans need a machine. No bird, no fabricated diagonal railway, no river squeezed into an impossible angle. Bright soft late-afternoon light, believable iron texture and airy ultra-wide depth.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.visitlisboa.com/pt-pt/locais/elevador-de-santa-justa)
- [Lähde 2](https://www.carris.pt/)

---

## Madrid — madrid

**Isoisän luettava teksti:** Pradossa pysähdyin tauluun, jossa pieni prinsessa saa kaiken huomion ja suuri koira makaa välittämättä siitä. Maalari katsoo suoraan minuun. Peilissä seisoo kuningaspari, mutta minä olen saanut parhaan paikan, aivan heidän edestään. Madridin kahviloissa väitellään uudesta tasavallasta. Tässä huoneessa vallanvaihto onnistui ostamatta edes sanomalehteä.

**Pulun kaupunkirepliikki (lähtöteksti):** Las Meninas on yhä Pradossa. Isoisä huomasi vallanvaihdon, minä koiran. Se tiesi, milloin kannattaa maata.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-madrid-r20260909-paper-v4`

**Lyhyt kuvateksti (47):** Madrid, 1873. Maalari huomasi katsojansa ensin.

**Pitkä kuvateksti (364):** Velázquezin maalauksen edessä huoneen järjestys tuntui vaihtuvan katsomisen aikana. Kuvassa on hoviväkeä, peilissä kuningaspari ja maalari itse työnsä ääressä. Koira makaa lattialla velvollisuuksista erillään. Asetin kameran niin, että taulun ja tämän salin väliin jäi tyhjää tilaa. Sitä katsellessa en ollut varma, kummassa huoneessa vierailija oikeastaan seisoo.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://www.museodelprado.es/en/learn/encyclopedia/voice/meninas-las-velazquez/296ac38f-8bf6-439d-b13c-ed22de8c39de)
- [Lähde 2](https://www.museodelprado.es/en/museum/history-of-the-museum)

### PuluCam / 1

**Toimi:** UUSI OMA PROMPTI — korvaa aiempi tästä sessiosta riippumatta promptattu versio

**PromptId:** `OHJAUS-EU-V1-madrid-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Madrid: Pradon taiteeseen johtaa myös varjoisa odotus.

**Näkökulma:** Outside Madrid's Museo del Prado, on a real accessible path beside the verified Villanueva building, photograph from 10 cm above ground beside an ordinary leashed dog resting in tree shade with its owner nearby.

**Lyhyt kuvateksti (54):** Madrid: Pradon taiteeseen johtaa myös varjoisa odotus.

**Pitkä kuvateksti (375):** Las Meninas odottaa Pradossa, mutta minä tarkastan ulkopuolen. Puun varjossa lepäävä koira on löytänyt saman asennon kuin maalauksen kuuluisa edeltäjänsä. Sen ihminen katsoo puhelinta, museovieraat sisäänkäyntiä ja minä koko joukkoa. Madridissa on tällä hetkellä ainakin kolme käsitystä siitä, mikä ansaitsee huomion. Koira vaikuttaa ainoalta, joka ei aio perustella omaansa.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. Outside Madrid's Museo del Prado, on a real accessible path beside the verified Villanueva building, photograph from 10 cm above ground beside an ordinary leashed dog resting in tree shade with its owner nearby. The relaxed dog in the immediate foreground echoes the dog in Las Meninas without copying a painting or becoming a painted dog. The actual Prado façade and a credible current entrance approach recede behind. Lock location and façade orientation from the Prado visitor map, not a generic neoclassical museum. Calm hot-day shade, natural colours, casual visitors. The photographer stays outside; no impossible indoor pigeon photo or forbidden-photo joke.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.museodelprado.es/en/visit/getting-here)
- [Lähde 2](https://www.museodelprado.es/en/visit-the-museum)

---

## Barcelona — barcelona

**Isoisän luettava teksti:** Barcelonan uusista kortteleista on leikattu kulmat pois. Ensin epäilin muuraria, sitten näin kahden kärryn mahtuvan kääntymään. Insinööri Cerdà on piirtänyt kaupunkilaisille tilaa hengittää. Yhden tulevan kadun paikalla kasvoi vielä kaalia. Toivoin sille hyvää satoa: se ei tiennyt, että oli muuttumassa liikenteeksi.

**Pulun kaupunkirepliikki (lähtöteksti):** Cerdàn viistot kulmat ovat yhä paikallaan. Autoja tuli enemmän kuin kaalia. Minä olisin äänestänyt kaalia.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-barcelona-r20260909-paper-v4`

**Lyhyt kuvateksti (49):** Barcelona, 1873. Tuleva katu kasvoi vielä lehtiä.

**Pitkä kuvateksti (409):** Uuden korttelin viisto kulma avasi kärryille tilaa kääntyä. Sen vieressä maa oli yhä käytössä paljon vanhemmalla tavalla: kaalirivit eivät ottaneet osaa insinöörin suunnitelmaan. Kamerassa mahtuivat samaan kuvaan valmiit seinät ja se, minkä niiden odotetaan syrjäyttävän. Cerdàn piirroksessa kaupunki hengittää väljästi. Toivoin, että työn edetessä muistettaisiin myös ne, joiden puutarha hengittää tässä nyt.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://bcnroc.ajuntament.barcelona.cat/jspui/bitstream/11703/101603/1/bcn01engp.pdf)

### PuluCam / 1

**Toimi:** UUSI OMA PROMPTI — korvaa aiempi tästä sessiosta riippumatta promptattu versio

**PromptId:** `OHJAUS-EU-V1-barcelona-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Barcelona: kulma leikattiin pois. Näkymään tuli tilaa.

**Näkökulma:** A low pigeon flight about 8 metres above a documented Eixample chamfered street corner in Barcelona, looking diagonally down past the genuine cut-off corner façade into the junction.

**Lyhyt kuvateksti (54):** Barcelona: kulma leikattiin pois. Näkymään tuli tilaa.

**Pitkä kuvateksti (388):** Eixamplen viistetyt korttelinkulmat avautuvat ilmasta selvästi: talojen väliin syntyy tavallista leveämpi risteys. Cerdàn viiva ei ole kadonnut liikenteen alle, vaikka kaalit ovat väistyneet. Kuvasin juuri sen kohdan, jossa jalankulkija, pyöräilijä ja autoilija kaikki katsovat eri suuntaan. Hyvässä kartassa riittää tilaa heille jokaiselle. Minulla on varmuuden vuoksi vielä tämä kerros.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. A low pigeon flight about 8 metres above a documented Eixample chamfered street corner in Barcelona, looking diagonally down past the genuine cut-off corner façade into the junction. Choose one real current intersection from city mapping/photo references and preserve its actual traffic layout, planted areas and buildings. A pedestrian waits at a crossing while a cyclist and car travel on their proper paths; no collision or fantasy traffic. The 14 mm near façade edge reveals the spatial reason for the chamfer. Ordinary daylight, mild bank, detailed human-scale street, not a high aerial map or all-landmark montage. Do not restore cabbage to the modern road.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.barcelona.cat/imatges/es/29/vistes-de-barcelona/7871/avenida-diagonal-cruce-con-la-calle/)
- [Lähde 2](https://bcnroc.ajuntament.barcelona.cat/jspui/bitstream/11703/101603/1/bcn01engp.pdf)
- [Lähde 3](https://www.barcelona.cat/museuhistoria/sites/default/files/cerda_eng.pdf)

---

## Granada — granada

**Isoisän luettava teksti:** Alhambran palatsi kohoaa Granadan yllä, mutta sen hienoin rakennusaine on vesi. Kapeissa uomissa se kulkee pihalta toiselle ja puhuu niin hiljaa, että minäkin vaikenin. Altaassa näin palatsin toistamiseen. Toinen oli tehty pelkästä valosta ja särkyi, kun kastoin sormeni veteen. Odotin, kunnes se rakentui takaisin.

**Pulun kaupunkirepliikki (lähtöteksti):** Sinä tarvitset nyt pääsylipun palatsiin. Minä käyn vain juomassa sen peilikuvan reunasta.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-granada-r20260909-paper-v4`

**Lyhyt kuvateksti (57):** Granada, 1873. Comaresin torni toisessa rakennusaineessa.

**Pitkä kuvateksti (387):** Myrttipihan altaassa torni jatkui alaspäin, vaikka tiesin maan olevan siellä jo käytössä. Palatsin kaaret ja myrttipensaat asettuivat veteen tarkemmin kuin oma kynäni olisi niitä jäljentänyt. Odotin liikkeen laantumista ennen valotusta. Alhambrassa vesi kuljettaa viileyttä ja ääntä, mutta tällä pihalla se tekee lisäksi kopion koko rakennuksesta. Työ valmistuu aina uudestaan, maksutta.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://www.alhambra-patronato.es/wp-content/uploads/2019/02/Conservacion_y_gestion_cultural.pdf)

### PuluCam / 1

**Toimi:** UUSI OMA PROMPTI — korvaa aiempi tästä sessiosta riippumatta promptattu versio

**PromptId:** `OHJAUS-EU-V1-granada-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Granada: palatsilla on toinen kerros veden alla.

**Näkökulma:** At the Alhambra Patio de los Arrayanes in Granada, camera only 8 cm above the documented long pool's stone rim, aimed down its true long axis toward the Comares tower and portico.

**Lyhyt kuvateksti (48):** Granada: palatsilla on toinen kerros veden alla.

**Pitkä kuvateksti (352):** Alhambran Myrttipihan pitkä allas kantaa Comaresin tornin peilikuvaa. Tuuli ja pienikin veden liike muuttavat sitä, vaikka rakennus pysyy paikallaan. Asetuin reunalle niin matalalle, että melkein koko palatsi mahtui alapuolelleni. Isoisä rikkoi näkymän sormellaan. Minä odotin hetken. Joskus hyvän kuvan tärkein taito on pitää nokkansa erossa aiheesta.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. At the Alhambra Patio de los Arrayanes in Granada, camera only 8 cm above the documented long pool's stone rim, aimed down its true long axis toward the Comares tower and portico. The water reflection fills much of the near frame; one small natural ripple deforms a real reflected column while the corresponding building stays still. Correct pool proportions, myrtle hedges, arches and tower, no blending with the Court of Lions. A few present-day visitors stay on permitted paths as unobtrusive scale. Low lens, natural warm daylight and real reflective water, not mirror-perfect CGI. No drinking pigeon in view and no fabricated pool access steps.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.alhambra-patronato.es/en/edificios-lugares/patio-de-los-arrayanes)
- [Lähde 2](https://www.archnet.org/sites/16021?media_content_id=116790)

---

## Sevilla — sevilla

**Isoisän luettava teksti:** Sevillan tupakkatehdas näyttää palatsilta, mutta sen portista kulkee aamuisin kuningattarien sijasta työväkeä. Nainen sitoi huivinsa, otti viimeisen haukun leivästä ja katosi sisään. Pihalta tuli appelsiininkukkien tuoksu. Olin aikonut kirjoittaa suuresta rakennuksesta. Kirjoitankin siitä, miten pienellä aamiaisella sitä pidetään käynnissä.

**Pulun kaupunkirepliikki (lähtöteksti):** Tupakkatehdas on nyt yliopisto. Portista mennään yhä leipä kädessä. Sivistys alkaa lupaavasti.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-sevilla-r20260909-paper-v4`

**Lyhyt kuvateksti (54):** Sevilla, 1873. Palatsimainen tehdas odotti työväkeään.

**Pitkä kuvateksti (381):** Portin koristeet eivät paljastaneet, kuinka monta aamua sen läpi kannettiin samalla tavoin pieni leipä. Nainen ehti istua ennen työhön palaamista. Pyysin luvan kuvaan ja odotin, että hän sai haukkunsa syödyksi. Tupakkatehtaan suuri rakennus jää varmasti matkakirjoihin. Tahdoin säilyttää myös tämän lyhyen tauon, sillä ilman sen jälkeen alkavaa työtä talo olisi pelkkä komea kuori.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://idus.us.es/bitstreams/c159e9ed-623c-49bb-af82-28de9d825634/download)

### PuluCam / 1

**Toimi:** UUSI OMA PROMPTI — korvaa aiempi tästä sessiosta riippumatta promptattu versio

**PromptId:** `OHJAUS-EU-V1-sevilla-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Sevilla: sama portti, toisenlainen työpäivä.

**Näkökulma:** Ground-level pigeon camera 9 cm above paving at the actual principal entrance of Seville's former Royal Tobacco Factory, now University of Seville.

**Lyhyt kuvateksti (44):** Sevilla: sama portti, toisenlainen työpäivä.

**Pitkä kuvateksti (391):** Sevillan entiseen tupakkatehtaaseen tullaan nyt opiskelemaan. Portin lähellä joku tasapainottaa leipää, puhelinta ja muistikirjaa kahdessa kädessä. Korkeampi koulutus näyttää vaativan kolmannen. Isoisän näkemä työntekijä ehti syödä ennen sisäänmenoa; tämän opiskelijan suunnitelma on vielä kesken. Kuvasin hänet kengänkorkeudelta. Sieltä huomaa ensimmäisenä, jos tärkeä osa aamiaista putoaa.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. Ground-level pigeon camera 9 cm above paving at the actual principal entrance of Seville's former Royal Tobacco Factory, now University of Seville. A contemporary adult student just ahead balances a modest sandwich, phone and closed notebook while pausing before the doorway. Match the real portal sculpture, doors and surrounding stone/brick from university references; no invented Gothic college. Wide perspective makes the entrance tall while hands and everyday juggling remain readable. Orange-tree foliage only where actually present. Quiet morning street life, natural sunlight. No posed model, falling giant sandwich, smoke, cigarette glamour or visible camera bird.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.us.es/laUS/secretaria-general/patrimonio-historico-artistico/edificios/real-fabrica-de-tabacos)
- [Lähde 2](https://www.diariodesevilla.es/sevilla/antigua-fabrica-tabacos-sevilla-edificio-industrial-adquirido-Hispalense-1953_0_1540346167.html)

---

## Amsterdam — amsterdam

**Isoisän luettava teksti:** Amsterdamin kanavan varrella tuoli matkusti kolmanteen kerrokseen talon ulkopuolta. Se riippui katon koukusta, ja kaksi miestä komensi sitä köysillä. Portaat ovat kuulemma liian kapeat. Tuoli meni ikkunasta sisään selkä edellä, arvokkaasti kuin piispa vaunuihin. Näissä kapeissa taloissa täytyy harkita tarkkaan sekä kalustonsa että riitansa.

**Pulun kaupunkirepliikki (lähtöteksti):** Huonekaluja nostetaan ikkunoista edelleen. Lentotaidottomaksi lajiksi olette varsin kekseliäitä.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-amsterdam-r20260909-paper-v5`

**Lyhyt kuvateksti (49):** Amsterdam, 1873. Tuoli saapui omasta ikkunastaan.

**Pitkä kuvateksti (389):** Kattokoukku piti köyttä, köysi piti tuolia ja kaksi miestä piti tilanteesta huolta. Kapeassa kanavatalossa ikkuna oli saanut ulko-oven tehtävän. Tuoli pysähtyi hetkeksi nousunsa aikana, mikä sopi kameralleni paremmin kuin jatkuva liike. Miehet neuvoivat toisilleen suuntaa. Kaluste itse suhtautui kaikkeen hyvin arvokkaasti, niin kuin ei olisi odottanutkaan joutuvansa käyttämään portaita.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://www.rijksmuseum.nl/en/stories/operation-night-watch/story/hoisting-paintings)

### PuluCam / 1

**Toimi:** UUSI OMA PROMPTI — korvaa aiempi tästä sessiosta riippumatta promptattu versio

**PromptId:** `OHJAUS-EU-V1-amsterdam-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Amsterdam: lentokoulun oppilas on tällä kertaa nojatuoli.

**Näkökulma:** From 10 cm above a verified Amsterdam canal-side pavement, photograph a real modern furniture lift set up safely against an actual narrow canal house with a documented accessible window.

**Lyhyt kuvateksti (57):** Amsterdam: lentokoulun oppilas on tällä kertaa nojatuoli.

**Pitkä kuvateksti (373):** Amsterdamin kapeissa taloissa muutto saattaa alkaa kadulta ja päättyä ikkunaan. Nostolaite hoitaa osuuden, johon portaat eivät taivu. Minä seurasin nojatuolin ensimmäistä nousua. Sillä oli lentoasento kohdallaan mutta suuntavaisto täysin köyden varassa. Isoisä näki saman ongelman ratkaistuna kattokoukulla. Olette edistyneet: nykyään tuolilla on matkallaan oma pieni lava.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. From 10 cm above a verified Amsterdam canal-side pavement, photograph a real modern furniture lift set up safely against an actual narrow canal house with a documented accessible window. A modest armchair is strapped to the raised platform, just beginning its ascent above two movers. Match the ladder lift geometry, outriggers, correct road and canal alignment from a current moving-company reference, and use that actual street frontage. Do not invent a floating chair, cut through railings or place the machine in water. Strong low-to-high perspective with a nearby bicycle wheel framing one side. Real overcast light, restrained comedy about furniture learning to fly. This is a replacement made from this exact prompt.

**Jatkuvuus:** Kuva 1 lukitsee todellisen talon, nostimen ja siniharmaan nojatuolin. Kuva 2 seuraa samaa nousua.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.iamsterdam.com/en/travel-stay/getting-around/why-a-canal-cruise-is-the-best-introduction-to-amsterdam)
- [Lähde 2](https://huurverhuislift.nl/ladderlift-amsterdam)
- [Lähde 3](https://huurverhuislift.nl/uploads/pages/283/normal/original/ladderlift-huurverhuislift.nl-amsterdam-4.jpg)
- [Lähde 4](https://fotoamsterdam.com/)

### PuluCam / 2

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-amsterdam-2`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Amsterdam: saavuin ikkunalle ennen huonekaluja.

**Näkökulma:** Second frame of the SAME Amsterdam move, using approved frame 1 plus the actual building reference.

**Lyhyt kuvateksti (47):** Amsterdam: saavuin ikkunalle ennen huonekaluja.

**Pitkä kuvateksti (359):** Ikkunan tasolla nostimen lava näyttää jo melkein laskeutumispaikalta. Sisällä odottaa muuttaja, kadulla toinen katsoo ylöspäin ja tuoli jatkaa heidän välissään. Minä pääsin tänne yhdellä kaarroksella. En maininnut sitä ääneen. Kun joku tekee vaivalla jotakin, minkä itse osaa helposti, pieni hienotunteisuus tekee asiantuntijasta huomattavasti siedettävämmän.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. Second frame of the SAME Amsterdam move, using approved frame 1 plus the actual building reference. The pigeon is in a brief flight at the receiving window's height, about 50–80 cm outside and offset to one side of the lift path, looking obliquely at the SAME strapped blue-grey armchair on the lift platform nearing the window. A mover indoors reaches for the platform handle, not into moving machinery. Show real window depth, lift rails continuing down and a credible narrow slice of the canal street far below. Keep house, workers, chair, equipment and light unchanged. Close bird flight, not drone rooftop panorama, no changed floor number, impossible cutaway façade or visible photographer.

**Jatkuvuus:** Generoi vasta kuvan 1 jälkeen käyttäen sitä jatkuvuusreferenssinä; sama talo ja nostin, sama siniharmaa nojatuoli.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.iamsterdam.com/en/travel-stay/getting-around/why-a-canal-cruise-is-the-best-introduction-to-amsterdam)
- [Lähde 2](https://huurverhuislift.nl/ladderlift-amsterdam)
- [Lähde 3](https://huurverhuislift.nl/uploads/pages/283/normal/original/ladderlift-huurverhuislift.nl-amsterdam-4.jpg)
- [Lähde 4](https://fotoamsterdam.com/)

---

## Berliini — berliini

**Isoisän luettava teksti:** Berliinissä paljastettiin voitonpylväs, jonka koristeina on vallattuja tykinputkia. Niin korkealle nostettu tykki ei ainakaan osu ohikulkijaan. Pylvään juurella poika myi lehtiä, ja katsojat polkivat hänen pudonneen numeronsa mutaan. Ostin senkin. Suuret voitot painetaan paksuin kirjaimin; pieni tappio oli pojan kasvoilla.

**Pulun kaupunkirepliikki (lähtöteksti):** Pylväs siirrettiin myöhemmin Tiergarteniin. Siivekäs huipulla sai paremman puiston. Poikaa mietin minäkin.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-berliini-r20260909-paper-v4`

**Lyhyt kuvateksti (53):** Berliini, 1873. Pylväs katsoi voittoja, poika maahan.

**Pitkä kuvateksti (399):** Voitonpylvään tykinputket olivat päätyneet koristeiksi korkealle, mutta sanomalehti pysyi tukevasti mudassa. Poika kumartui kokoamaan numeroitaan, kun aikuiset jatkoivat pylvään katsomista. Kameran näkökenttä oli tässä hyödyllinen: siihen mahtui sekä suuren juhlan kohde että pieni työ sen juurella. Jälkimmäinen vaati pojalta enemmän välitöntä rohkeutta kuin kukaan ohikulkijoista näytti huomaavan.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://search.smb.museum/object/obj-968409?involved=Anton+von+Werner&page=2)
- [Lähde 2](https://www.smb.museum/nachrichten/detail/schenkung-von-alicja-kwade-skulptur-goldelse-fuer-den-skulpturengarten-der-neuen-nationalgalerie/)

### PuluCam / 1

**Toimi:** UUSI OMA PROMPTI — korvaa aiempi tästä sessiosta riippumatta promptattu versio

**PromptId:** `OHJAUS-EU-V1-berliini-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Berliini: siipien omistaja voi silti viettää koko päivän paikallaan.

**Näkökulma:** A physically plausible close pigeon flight beside the gilded wing of Victoria on Berlin's Siegessäule in its CURRENT Tiergarten location.

**Lyhyt kuvateksti (68):** Berliini: siipien omistaja voi silti viettää koko päivän paikallaan.

**Pitkä kuvateksti (396):** Voitonpylvään kultainen Victoria katsoo nykyään Tiergartenin yli. Pylväs siirrettiin tänne, mutta hahmo ei ole ottanut käyttöönsä yhtäkään uutta lentoreittiä. Kiersin sen vierestä tarkistamassa siiven rakennetta. Näyttävä työ. Oma höyhenpukuni on vähemmän kultainen, mutta pääsen sillä takaisin alas ilman portaita. Isoisän lehtipojasta tämä korkeus ei kerro mitään. Sen puutteen huomaan minäkin.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. A physically plausible close pigeon flight beside the gilded wing of Victoria on Berlin's Siegessäule in its CURRENT Tiergarten location. Camera about 1–2 metres outside the real sculpture, look along a correctly shaped wing with portions of actual figure and upper column visible; the Tiergarten trees and traffic circle recede far below in correct geometry. Reference the real sculpture's pose and scale; do not turn the wing into feathers of a living pigeon or let the figure smile. Natural golden afternoon highlights on weathered metal, ultra-wide depth, modest bank. Not a statue placed near the Reichstag or on an invented roof. No war celebration props.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.visitberlin.de/en/siegessaule)
- [Lähde 2](https://upload.wikimedia.org/wikipedia/commons/3/32/Siegess%C3%A4ule-Berlin-Tiergarten.jpg)

---

## Praha — praha

**Isoisän luettava teksti:** Prahan torin kellossa luuranko soittaa kelloa ja apostolit kulkevat ikkunan ohi. Aioin verrata sitä taskukellooni ja unohdin koko asian. Tässä koneessa oli tilaa auringolle, kuulle ja kuolemalle, mutta minun kellossani vain kiireelle. Ajuri löysi minut samasta paikasta puoli tuntia myöhemmin. Hänellä oli aivan toisenlainen käsitys hukkaan menneestä ajasta.

**Pulun kaupunkirepliikki (lähtöteksti):** Kello kokoaa torille väkeä yhä. Nyt kaikilla on kello puhelimessa, ja silti he katsovat tuota. Ymmärrän.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-praha-r20260909-paper-v4`

**Lyhyt kuvateksti (47):** Praha, 1873. Kiire jäi kellon eteen odottamaan.

**Pitkä kuvateksti (378):** Torin kello ei tyydy numeroihin. Sen kehissä kulkevat taivaankappaleet, ja pienten hahmojen liike saa kokonaisen ihmisjoukon nostamaan päätään yhtä aikaa. Ajurin vaunut odottivat vähän syrjemmässä. Kuvani pysäyttää kellon, mutta ei kerro, kuinka pitkäksi hänen odotuksensa venyi. Minulla oli taskussa tarkempi ajanmittari. Se jäi sillä hetkellä paljon huonommaksi seuralaiseksi.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://prague.eu/en/about-the-old-town-astronomical-clock/)
- [Lähde 2](https://prague.eu/en/objevujte/old-town-hall-with-astronomical-clock-staromestska-radnice-s-orlojem/)

### PuluCam / 1

**Toimi:** UUSI OMA PROMPTI — korvaa aiempi tästä sessiosta riippumatta promptattu versio

**PromptId:** `OHJAUS-EU-V1-praha-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Praha: minua katsotaan harvoin näin yksimielisesti ylöspäin.

**Näkökulma:** From a real reachable exterior stone ledge BELOW and to one side of Prague's astronomical clock, pigeon camera 10 cm above the ledge looking diagonally across the clock façade and down to spectators on Old Town Square.

**Lyhyt kuvateksti (60):** Praha: minua katsotaan harvoin näin yksimielisesti ylöspäin.

**Pitkä kuvateksti (369):** Prahan astronomisen kellon edessä ihmiset nostavat kasvonsa ja puhelimensa samaan suuntaan. Minä istuin hetkeksi kellon alapuoliselle kivireunalle. Oli miellyttävää saada näin suuri yleisö, kunnes tajusin, ettei kukaan odottanut minun esiintymistäni. Kellossa näkyvät taivaan kierrot ja pienet hahmot; torilla näkyy, kuinka monta eri tapaa on yrittää kuvata sama hetki.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. From a real reachable exterior stone ledge BELOW and to one side of Prague's astronomical clock, pigeon camera 10 cm above the ledge looking diagonally across the clock façade and down to spectators on Old Town Square. Include the correct two clock dials and real architectural relationships only if they fit this lens direction; otherwise use the lower dial edge and recognizable wall. Tourists hold phones upward, creating a wry mistaken impression that they photograph the invisible pigeon. Keep authentic clock forms, not invented gears or all twelve apostles outside at once. Bright overcast light, human-scale crowd, no top-down drone view or photographer reflection.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://prague.eu/en/objevujte/old-town-hall-with-astronomical-clock-staromestska-radnice-s-orlojem/)
- [Lähde 2](https://prague.eu/en/objevujte/old-town-square-staromestske-namesti/)

---

## Wien — wien

**Isoisän luettava teksti:** Wienin maailmannäyttelyssä näin koneen painavan sanomalehteä silmieni edessä. Se ei tarvinnut edes aikaa ajatellakseen, mitä kirjoitti. Rotunden kupoli peitti taivaan rautaisella hatulla. Sitten pörssi romahti. Kahvilassa herra taitteli lehtensä hyvin pieneksi, mutta uutinen ei pienentynyt. Tilasin hänelle kahvin. Koneista ei ollut siihen apua.

**Pulun kaupunkirepliikki (lähtöteksti):** Rotunde paloi myöhemmin. Wienin kahvilat jäivät. Isoisä ymmärsi koneita, mutta tuossa hän ymmärsi ihmistä.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Painokone vastaa luettavan tekstin alkukohtausta. Kahvilan myöhempää tekoa ei tarvitse pakottaa samaan kuvaan; kuvateksti erottaa hetket.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-wien-r20260909-paper-v4`

**Lyhyt kuvateksti (48):** Wien, 1873. Kone teki lehteä ilman mielipidettä.

**Pitkä kuvateksti (370):** Painokoneen vierellä miehet tarkkailivat arkin kulkua niin kuin lääkärit potilaan hengitystä. Maailmannäyttelyn hallissa rauta kantoi sekä työkoneen että suuren katon painoa. Kuvasin hetken, jolloin kaikki näytti olevan järjestyksessä. Lehti valmistuu koneelta valmiina, mutta sen lukijan ajatukset eivät. Sen eron huomasin myöhemmin kahvilassa, en tämän koneen ääressä.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://sammlung.wienmuseum.at/en/object/59815-weltausstellung-1873-rotunde-der-ring-vor-der-hebung-nr-3a/)
- [Lähde 2](https://www.technischesmuseum.at/presse/women_at_work)
- [Lähde 3](https://www.technischesmuseum.at/ausstellung/women_at_work)

### PuluCam / 1

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-wien-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Wien: kahvi saapui, vaikka uutinen ei parantunut.

**Näkökulma:** At the real open-air pavement terrace of Café Landtmann in Vienna, camera on a low exterior sill or chair-side ledge, aimed at table height from close beside a folded newspaper.

**Lyhyt kuvateksti (49):** Wien: kahvi saapui, vaikka uutinen ei parantunut.

**Pitkä kuvateksti (370):** Wieniläisessä kahvilassa lehti ja kahvi saavat viipyä samassa pöydässä. Istuin terassin reunalla, kun tarjoilija laski kupin yksin istuvan asiakkaan eteen. Lehti jäi hetkeksi alas. Isoisä tilasi kerran kahvin toiselle ihmiselle, koska mikään hänen näkemänsä kone ei osannut lohduttaa. Minä en tiedä, mitä tämän lehden sivulla luki. Tuon pienen tauon osasin silti kuvata.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. At the real open-air pavement terrace of Café Landtmann in Vienna, camera on a low exterior sill or chair-side ledge, aimed at table height from close beside a folded newspaper. A waiter places one ordinary small coffee cup on a saucer before an adult seated alone; the person's hand has just lowered the paper. Keep the genuine café frontage and current terrace arrangement from official current images, with a correct modest Ringstrasse background. A quiet small act of attention, not a joke at a distressed customer. Natural diffuse daylight, real porcelain and paper, restrained 14 mm perspective. No interior wall removed, giant coffee or fake legible news headline.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.wien.info/en/dine-drink/coffeehouses/top-traditional-coffee-houses-in-vienna-361666)
- [Lähde 2](https://www.wien.gv.at/en/leisure/viennese-coffee-culture)

---

## Budapest — budapest

**Isoisän luettava teksti:** Buda, Pest ja Óbuda on tänä marraskuuna liitetty yhteen. Karttani vanheni kesken aamiaisen. Toisella rannalla kohoaa linna, toisella talot levittäytyvät tasamaalle; välissä Tonava pitää oman suuntansa. Menin Rudasin turkkilaiseen kylpylään miettimään uuden nimen sijoittelua. Kupolin alla oli niin lämmintä, että päätin antaa kaupunkien olla hetken ilman järjestystä.

**Pulun kaupunkirepliikki (lähtöteksti):** Nimi mahtui karttaan. Nykyään Rudasissa kylvetään katollakin. Kerrankin ihmisillä on oikea kerros.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-budapest-r20260909-paper-v4`

**Lyhyt kuvateksti (48):** Budapest, 1873. Kupolin alla kartta sai odottaa.

**Pitkä kuvateksti (405):** Rudasin kylpylän kupoli päästää päivänvalon pieninä kohtina sisään. Niiden alla vesi liikahtaa hitaasti, eikä kukaan näytä tarvitsevan siltä kiireisempää vastausta. Turkkilaisen kylpylän seinät ovat nähneet kaupunkien nimiä ennen tätä marraskuista yhdistämistäkin. Asetin kameran altaan ulkopuolelle. Höyry teki ääriviivoille saman kuin lämmin vesi ajatuksilleni: kumpikaan ei pysynyt aivan yhtä terävänä.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://www.rudasfurdo.hu/en/past-and-present)
- [Lähde 2](https://fortepan.hu/en/photos/?id=252393)
- [Lähde 3](https://fortepan.hu/en/photos/?id=82594)

### PuluCam / 1

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-budapest-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Budapest: kylpylällä on vihdoin lintujen kerros.

**Näkökulma:** At the actual modern Rudas rooftop pool in Budapest, put the pigeon lens 10 cm above a dry exterior coping ledge, looking past the real pool rim toward the correctly positioned Danube and Elizabeth Bridge.

**Lyhyt kuvateksti (48):** Budapest: kylpylällä on vihdoin lintujen kerros.

**Pitkä kuvateksti (369):** Rudasin kattokylpylässä lämmin vesi ja Tonava mahtuvat samaan näkymään. Istuin altaan ulkopuolisella reunalla ja tarkistin, oliko ylin kerros yhtä hyvä kuin olin kuullut. Oli. Isoisä pohti kupolin alla kaupungin nimeä; nämä kylpijät pohtivat lähinnä, tarvitseeko nousta vielä pois. Ihmiset ovat löytäneet kelvollisen yhdistelmän: näköalapaikan, jossa saa samalla istua.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. At the actual modern Rudas rooftop pool in Budapest, put the pigeon lens 10 cm above a dry exterior coping ledge, looking past the real pool rim toward the correctly positioned Danube and Elizabeth Bridge. Match the pool's true shape, railing and rooftop structure from current official references, no fictional infinity pool or exposed dome removed. Two or three ordinary adult bathers in standard swimwear rest quietly, seen at a respectful distance or from behind. Near water reflections and far river establish the two different bodies of water. Natural gentle afternoon light, no intrusive close-up of bodies. The photographer remains outside the water.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.rudasfurdo.hu/)
- [Lähde 2](https://tickets.rudasfurdo.hu/product/b56d483a-364d-4630-8bf5-25ce019cc411)

### PuluCam / 2

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-budapest-2`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Budapest: nimi yhdisti kaupungit. Joki jäi väliin.

**Näkökulma:** Second Budapest frame: a short pigeon flight just outside the same verified Rudas rooftop, about 3 metres above that roof level, looking toward the true Danube crossing and contrasting Buda hillside and Pest waterfront.

**Lyhyt kuvateksti (50):** Budapest: nimi yhdisti kaupungit. Joki jäi väliin.

**Pitkä kuvateksti (367):** Nousin altaan reunalta ja katsoin Tonavaa leveämmältä. Buda kohoaa mäkeen, Pest levittäytyy vastarannalle, ja sillat pitävät yhteyttä. Kartassa nimi peittää tämän kaiken yhdellä sanalla. Lennossa erotan rannat, liikenteen ja joen oman reitin. Isoisän kartta vanheni aamiaisen aikana. Minun kuvani kestää ainakin siihen saakka, kunnes seuraava laiva ehtii sillan alta.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. Second Budapest frame: a short pigeon flight just outside the same verified Rudas rooftop, about 3 metres above that roof level, looking toward the true Danube crossing and contrasting Buda hillside and Pest waterfront. Use frame 1 plus current geographic references. Keep a small recognizable portion of the real rooftop pool at the bottom edge to connect the two photos, while bridges, river traffic and riverbanks dominate. Do not move Parliament or Castle into the wrong sightline; do not combine distant bridges as neighbours. Natural light unchanged, no drone-map angle, no wing of a visible camera bird. Show an ordinary passenger boat moving through the correctly scaled river space.

**Jatkuvuus:** Sama Rudas, sää ja valo kuin kuvassa 1. Kaupunkikuva avautuu aidosti uudesta lentokohdasta.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.rudasfurdo.hu/)

---

## Varsova — varsova

**Isoisän luettava teksti:** Kartassani Varsova kuuluu Venäjälle. Torin leipuri sanoi olevansa puolalainen ja kopautti leipää, jotta kuulisin sen olevan tuoretta. Talot olivat vieri vieressä kuin kuuntelemassa. Viraston kyltissä kirjaimet olivat venäläisiä, mutta aamiaiseni sain puolaksi. Karttaan voi vetää rajan yhdellä liikkeellä. Ihmiset eivät siirry kynän mukana.

**Pulun kaupunkirepliikki (lähtöteksti):** Vanhakaupunki rakennettiin sodan jälkeen uudelleen. Isoisä olisi tunnistanut torin. Se oli rakentajien tarkoitus.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-varsova-r20260909-paper-v4`

**Lyhyt kuvateksti (56):** Varsova, 1873. Leipuri piti kaupungin omalla kielellään.

**Pitkä kuvateksti (369):** Torin talot seisovat lähekkäin, mutta aamun työ mahtuu niiden eteen. Leipurin pöydässä leivät ovat valmiina ennen kuin virastot ehtivät ryhtyä määräämään päivän asioita. Hän katsoi kameraa vain hetken ja palasi asiakkaansa puoleen. Varsovan karttamerkinnöissä minulla on keisarikunnan väri; tässä kuvassa tahdoin säilyttää myös sen, minkä ihmiset tekevät paikasta itse.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://muzeumwarszawy.pl/en/old-town-new-town-in-warsaw/)
- [Lähde 2](https://muzeum.uw.edu.pl/en/the-old-town-square-1916-1918/)
- [Lähde 3](https://muzeumwarszawy.pl/obiekt/rzezba-syreny-fontanny-rynku-starego-miasta/)

### PuluCam / 1

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-varsova-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Varsova: tämän torin tunnistaminen on jonkun tekemää työtä.

**Näkökulma:** From 9 cm above paving beside a real doorway on Warsaw's Old Town Market Square, photograph the actual reconstructed colourful façades rising in ultra-wide perspective.

**Lyhyt kuvateksti (59):** Varsova: tämän torin tunnistaminen on jonkun tekemää työtä.

**Pitkä kuvateksti (376):** Varsovan vanhankaupungin tori rakennettiin sodan jälkeen uudelleen. Värit, mittasuhteet ja talojen omat kasvot palautettiin osaksi kaupunkia, jossa taas asutaan ja käydään kauppaa. Kuvasin talon juurelta ylöspäin: pieni kynnys edessä, kokonainen julkisivu takana. Isoisä olisi etsinyt täältä leipuriaan. Minä katson, kuinka paljon vaivaa tutun paikan säilyttäminen voi vaatia.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. From 9 cm above paving beside a real doorway on Warsaw's Old Town Market Square, photograph the actual reconstructed colourful façades rising in ultra-wide perspective. A local adult carrying an ordinary shopping bag steps through a real doorway; another neighbour holds it open. Use a specific verified side of the square, not a fantasy mixture of Polish townhouses. Near worn threshold, plaster, small daily gesture and readable façade shapes are central. Calm present-day daylight. No ruin overlays, imagined war damage, heroic rebuilding tableau or tourist crowd covering the subject.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://whc.unesco.org/en/list/30/)
- [Lähde 2](https://zabytek.pl/en/obiekty/warszawa-historyczne-centrum-warszawy)

### PuluCam / 2

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-varsova-2`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Varsova: katolta näkyvät myös talojen välit.

**Näkökulma:** Second Warsaw photograph from a physically possible exterior roof-eave perch on the same documented Old Town square frontage.

**Lyhyt kuvateksti (44):** Varsova: katolta näkyvät myös talojen välit.

**Pitkä kuvateksti (388):** Räystään tasolta tori muuttuu tilaksi, jonka talot muodostavat yhdessä. Yhdessä ikkunassa on kukkia, toisessa verho ja kolmannessa ihminen. Uudelleen rakentaminen ei palauttanut vain ulkoseiniä vaan paikkoja aivan tavallisille päiville. Näytän tämän toisen kuvan siksi, ettei ensimmäinen jäisi pelkäksi kauniiksi julkisivuksi. Kaupunki tarvitsee myös sen, mitä ikkunoiden takana tapahtuu.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. Second Warsaw photograph from a physically possible exterior roof-eave perch on the same documented Old Town square frontage. Look diagonally across the real square with a near gutter and neighbouring open window edge in foreground; one adult waters a small window box. Include the correct opposite façades and square's actual proportions. Intimate inhabited city seen by a bird, not a sweeping drone reconstruction. Use frame 1 for colour/weather continuity and location references for the actual reverse view. No cutaway rooms or impossible extra storeys, and no war spectacle.

**Jatkuvuus:** Sama torin sivu, väritys ja päivänvalo kuin kuvassa 1; uusi katselusuunta varmennetaan erikseen.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://whc.unesco.org/en/list/30/)

---

## Krakova — krakova

**Isoisän luettava teksti:** Krakovan Marian kirkon tornista soi torvi ja vaikeni kesken sävelmän. Odotin loppua niin kauan, että torikauppias tarjosi tuolia. Hän oli kuullut saman katkoksen koko ikänsä eikä aikonut odottaa enää. Ostin leivän ja jäin silti. Kun kaupunki jättää jotakin sanomatta, korva ei tahdo lähteä muualle.

**Pulun kaupunkirepliikki (lähtöteksti):** Torvi soi yhä joka tunti neljään suuntaan. Isoisä odotti loppua; minä arvostan soittajaa, joka osaa lopettaa.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Nykykuvassa ovat tekstin toritilanne, kangashalli ja Marian kirkko. Vuoden 1873 kangashallin ulkoasu tarkistettu tuotannossa; ei myöhemmän uudistuksen pakottamista.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-krakova-r20260909-paper-v4`

**Lyhyt kuvateksti (53):** Krakova, 1873. Tuoli odotti, jos sävelmä ei loppuisi.

**Pitkä kuvateksti (366):** Kangashallin luona kauppa jatkuu, vaikka kirkontornin torvi on jo vaiennut. Torikauppias tiesi, ettei minun kannata seisoa odottamassa puuttuvia säveliä, ja tarjosi istuinta. Marian kirkon epätasaiset tornit auttoivat silmää löytämään äänen paikan. Kamerani tallentaa niistä molemmat, mutta antaa saman vastauksen kuin torvensoittaja: jotakin jää kuvan ulkopuolelle.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://ct.mhk.pl/wps/portal/mhmk/main/strona-artefaktu/?artefactId=%7B61040CE7-72DA-4281-A0A3-14D3C075B00B%7D)
- [Lähde 2](https://mnk.pl/en/wystawy/the-sukiennice/)
- [Lähde 3](https://convention.krakow.pl/english/ccb_en/7973%2Cartykul%2Cthe_cloth_hall.html)

### PuluCam / 1

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-krakova-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Krakova: soittajalla on neljä yleisöä ja yksi hengitys kerrallaan.

**Näkökulma:** A momentary pigeon flight immediately outside a VERIFIED hejnał trumpet window in the taller tower of St Mary's Basilica, Kraków.

**Lyhyt kuvateksti (66):** Krakova: soittajalla on neljä yleisöä ja yksi hengitys kerrallaan.

**Pitkä kuvateksti (369):** Marian kirkon tornista soitettava sävelmä lähetetään neljään suuntaan. Minä odotin ikkunan ulkopuolella ja sain poikkeuksellisen läheisen paikan. Vasken pinnassa näkyi valoa, kaupungin katoilla iltapäivä. Isoisä odotti melodian loppua torilla. Tästä huomasi, että soittajalla oli jo seuraava suunta mielessä. Kuuntelin loppuun asti, niin pitkälle kuin loppua annettiin.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. A momentary pigeon flight immediately outside a VERIFIED hejnał trumpet window in the taller tower of St Mary's Basilica, Kraków. Lens offset safely from the opening, looking obliquely past the real stone or timber window frame to an adult trumpeter inside with instrument bell extending toward the exterior. Near brass and window texture contrast with a true slice of Kraków roofs far below. Reproduce actual tower-window position and current ceremonial uniform from authoritative references, not invented costume or a player balancing outside. The frame must not suggest the bird is being blown through a trumpet. Natural daylight, human concentration, no decorative music notes.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://culture.pl/en/article/the-hejnal-trumpet-call-of-krakow-fact-vs-fiction)

---

## Alpit — alpit

**Isoisän luettava teksti:** Grindelwaldin jäätikössä oli sinistä niin syvällä, ettei taivas ylettynyt siihen. Opas sanoi jään liikkuvan. Panin kiven reunalle ja odotin, mutta kivi ei suostunut todistajaksi. Sitten sisältä kuului pitkä rasahdus. Siirsin sekä kiven että itseni kauemmas. Alpeilla on syytä erottaa toisistaan hiljaisuus ja se, ettei vuori vielä puhu.

**Pulun kaupunkirepliikki (lähtöteksti):** Jäätikkö on vetäytynyt kauas isoisän päivistä. Hänen kivensä saattaa olla tallessa; jää sen alta on poissa.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-alpit-r20260909-paper-v4`

**Lyhyt kuvateksti (53):** Grindelwald, 1873. Jään hiljaisuudessa oli halkeamia.

**Pitkä kuvateksti (366):** Opas pysyi sivummalla ja antoi minun katsella jäätikön reunaa. Kallion ja jään raja ei ollut yhtä siisti kuin karttaan piirretty viiva: siinä oli kiviä, vettä ja syvyyksiä, joiden pohjaa en nähnyt. Panin kameran riittävän kauas. Jään sisältä kuuluva rasahdus ei tallennu vedokseen. Sen vuoksi kirjoitan tähän muistutuksen, että kuva oli hiljaisempi kuin paikka itse.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://www.swissinfo.ch/eng/archive-science/scientists-paint-a-glacial-picture/33663410)
- [Lähde 2](https://www.swissinfo.ch/eng/archive-science/marking-glacial-change-on-grindelwald-s-trail/2185012)

### PuluCam / 1

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-alpit-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Grindelwald: kuvasin paikan, josta jää on lähtenyt.

**Näkökulma:** Present-day Lower Grindelwald Glacier Gorge, from a pigeon perched 10 cm above a real walkway railing.

**Lyhyt kuvateksti (51):** Grindelwald: kuvasin paikan, josta jää on lähtenyt.

**Pitkä kuvateksti (381):** Grindelwaldin jäätikkörotkossa kävelyreitti kulkee kallioiden ja veden vierellä. Isoisän suuri jää on vetäytynyt kauemmas; sen jälkiä voi lukea myös paikasta, jossa ei enää seiso jääseinää. Laskeuduin hetkeksi kaiteen viereen ja katsoin veden kulkua. Hänen kivensä ei osannut vastata liikkeeseen. Tämä maisema kertoo hitaasta muutoksesta, vaikka pysyy valokuvassa aivan paikallaan.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. Present-day Lower Grindelwald Glacier Gorge, from a pigeon perched 10 cm above a real walkway railing. Look obliquely along the genuine narrow rock gorge and rushing water, with a few appropriately clothed adult walkers providing scale on the documented fixed walkway. Match current operator imagery exactly. Show ice-free rock where the current gorge is ice-free: do not place a glacier beside today's hotel, invent ice walls or substitute Aletsch. Damp stone large near foreground, cool soft natural light, water motion. A quiet observation of absence, not a sensational disaster image or human falling.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://grindelwald.swiss/en/map/detail/grindelwald-glacier-gorge-aaa98968-c9e4-4a2a-b871-8c25abefc234.html)
- [Lähde 2](https://www.outdoor.ch/en/outdoor-experience/glacier-canyon-grindelwald)

---

## Venetsia — venetsia

**Isoisän luettava teksti:** Venetsiassa oven takana saattaa olla meri. Astuin aamulla majatalon portaille ja olin mennä kaupunkiin uimaan. Gondolieri tuli hakemaan ja piti ilmeensä ihailtavan suorana. Kuljimme palatsien ohi niin hiljaa, että kuulin lusikan osuvan kahvikuppiin yläkerrassa. Täällä taloilla on hienot julkisivut, mutta vesi pääsee kuuntelemaan niiden aamiaista.

**Pulun kaupunkirepliikki (lähtöteksti):** Kanavilla kulkee nyt vesibussejakin. Isoisä kuunteli aamiaista; minä olisin selvittänyt sen ikkunan.

**Albumissa käytettävä aiempi korvaava repliikki:** Tässä Venetsia. Hetkinen. Nuo ovat yksityisiä. Hän vain sattui jokaiseen hyvään kuvakulmaan. Sulje albumi.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-venetsia-r20260909-paper-v5`

**Lyhyt kuvateksti (42):** Venetsia, 1873. Oven kynnys jatkui veteen.

**Pitkä kuvateksti (363):** Portaiden alin askel katosi kanavaan, ja gondolieri odotti sen edessä niin kuin ajuri odottaisi kuivalla kadulla. Yläkerran ikkuna oli auki. Kuului astian kilahdus, sitten vettä vasten osuvan melan ääni. Kuvasin näkymän ovelta ennen veneeseen nousua. Kaupungin palatsit näyttävät mahtavilta, mutta niiden arkeen pääsee kurkistamaan aivan tavallisen kynnyksen yli.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://www.veneziaunica.it/)

### PuluCam / 1

**Toimi:** KORVAA — aiemman kuvan paikkageometria hylätty, uusi V2-prompti

**PromptId:** `PAIKKA-V2-20260909-venetsia-1`

**Promptin alkuperä:** `posti/matkakirja-pulucam-20260909-paikkakorjaukset-v2.md`

**Tarinallinen havainto:** Ihastusalbumin alku näyttää vielä kaupunkia: vesiliikenne ja San Giorgio Maggiore pääosassa, sama paikallinen lintu kuvan sivussa. Riva degli Schiavonin epävarma kaide poistuu vaihtamalla oikeaan kuvauspaikkaan.

**Näkökulma:** Punta della Doganan itäkärjen todelliselta avoimelta rantakiveykseltä noin 10 cm pinnan yläpuolelta itään–kaakkoon kohti San Giorgio Maggiorea.

**Lyhyt kuvateksti (57):** Venetsia: vesibussi ja aivan sattumalta yksi paikallinen.

**Pitkä kuvateksti (376):** Punta della Doganan kärjestä näkyy San Giorgio Maggioren saari ja sen edessä kulkevia vesibusseja. Tarkoitukseni oli näyttää liikennettä. Rannan reunalle sattui paikallinen, joka katsoi juuri oikeaan suuntaan ja osasi olla peittämättä koko näkymää. Se on harvinainen taito. Kuvasin maiseman tietenkin sen vuoksi. Kuvan reunassa oleva sydän on luultavasti jokin kameran asetus.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from Livia's own pigeon-eye camera. Landscape 3:2, 1536x1024, sRGB. Full-frame 14 mm RECTILINEAR ultra-wide lens: strong near/far perspective, natural spatial depth, real materials and believable daylight. No fisheye circle, CGI, painted outlines, synthetic HDR, fake miniature blur or historical paper treatment. The photographer Livia remains behind the camera and is never visible. Use real photographs of the exact named viewpoint to constrain architecture, water edges and railings. Ordinary people and the small incident may be fictional, but architecture must not be invented. Keep the subject and place legible at phone size. Supply the clean colour photograph without text, PuluCam sticker or watermark; the selected B sticker is added separately by the game. Use ONLY the bird in pulu-cam-venetsia-03-r20260909-14mm-v3 as the continuity reference for Livia's crush: the same grey pigeon, orange iris, dark beak with pale cere, green-violet neck iridescence, distinctive irregular white throat patch, two dark wing bars and pink-red feet. Follow the actual reference over this verbal shorthand. Livia is invisible; the visible bird is her crush. Do not copy architecture from rejected Venice 1 or 2 images. Frame 1 of the five-picture accidental crush album. Move the scene to the ACTUAL open stone quay at the EASTERN TIP OF PUNTA DELLA DOGANA, looking EAST to SOUTHEAST across the water towards the island and church of SAN GIORGIO MAGGIORE. Camera about 10 centimetres above the real paving; leave a strip of ordinary quay paving and the real low water edge in the near foreground. San Giorgio's church, dome and campanile must keep their real proportions and mutual positions as seen from this exact tip; do not import the more familiar Riva degli Schiavoni angle. The island is across open water, not attached to this quay. Include one reasonably distant contemporary ACTV-type vaporetto travelling on a credible water route, clear of the foreground bird and shoreline. The same crush from Venice 3 stands naturally on the open paving near the water edge at a side of the composition, about 0.7–1 metre from the camera. His feet stand on paving, not a fabricated balustrade. The city and boat are still the ostensible main subjects. His head happens to turn towards the passing boat, giving Livia a reason to keep him in frame. There is NO long continuous stone balustrade along this open quay: follow the actual tip's edge and any real objects visible in the selected current site reference. Do not copy the temporary statue or protective enclosure visible in older museum photographs. The Dogana and Salute are behind or outside this east-facing camera and must not be magically added to the San Giorgio skyline. Keep daylight and the crush's identity consistent with Venice 3. Add only one or two small pink hand-drawn heart doodles at the outermost picture margins, as a discreet digital album overlay, never in the real scene. No solid border and no doodles over the bird, boat or architecture; the photographic centre remains completely believable.

**Vertailuun jäävän vanhan kuvan tunniste:** `pulu-cam-venetsia-01-r20260909-14mm-v1`

Tämä uusi korvaava prompti on tekstisession kirjoittama. Aiempi kuva säilytetään hylättynä paikkageometrian vuoksi; sen alkuperäisiä tekijätietoja ei muuteta.

**Kuvatekstin käyttöönotto:** vasta tämän uuden kuvan kanssa.

**Paikkatarkistus:** Punta della Doganan itäkärki, kamera itään–kaakkoon. San Giorgio omalla saarellaan veden takana. Ei Rivan pitkää kivikaidetta eikä Saluten kupolia vastarantaan. Avoin kiveys ja vedenreuna oikeasta paikkakuvasta. Vanhojen lähdekuvien vaihtuvaa taideteosta ei kopioida nykyhetkeen. Ihastus sama kuin Venice3.

**Lähteiden käyttö:** Pinault Collectionin paikkasivu vahvistaa San Giorgion näkymän. Sen Matteo De Fina -ilmakuva näyttää avoimen rantakärjen ja rakennusten keskinäisen sijainnin. Vanhempi Thomas Mayerin ulkokuva tukee kiveyksen/vedenreunan rakennetta; siinä näkyvää tilapäistä taidetta ei siirretä nykykuvaan. Ilmakuva on kartallinen lähde, ei tämän matalan otoksen kamerapaikka.

**Lähteet:**

- [Lähde 1](https://www.pinaultcollection.com/palazzograssi/en/punta-della-dogana)
- [Lähde 2](https://www.pinaultcollection.com/palazzograssi/media/styles/big/s3/w_image/golden-hour-1_0.jpg?itok=N1pd3O6K)
- [Lähde 3](https://avm.avmspa.it/en/content/consult-map)

### PuluCam / 2

**Toimi:** KORVAA — aiemman kuvan paikkageometria hylätty, uusi V2-prompti

**PromptId:** `PAIKKA-V2-20260909-venetsia-2`

**Promptin alkuperä:** `posti/matkakirja-pulucam-20260909-paikkakorjaukset-v2.md`

**Tarinallinen havainto:** Ihastusalbumin toisessa kuvassa sama lintu tulee lähemmäs. Oikean Ponte dei Pugnin metallikaide tarjoaa uskottavan lintujen istumapaikan; kanava jää sivurooliin.

**Näkökulma:** Dorsoduron Ponte dei Pugnin todellisella ohuella yläkaiteella, pulun silmien kohdalla noin 10 cm kaiteen yläpuolella. Katse viistosti kaidetta pitkin ja Rio San Barnabaa alaspäin.

**Lyhyt kuvateksti (57):** Venetsia: sama paikallinen. Kaupunki on yllättävän pieni.

**Pitkä kuvateksti (398):** Ponte dei Pugnin alta kulkee Rio San Barnaba. Ihmiset ylittävät kanavan siltaa pitkin, tavara pääsee veneellä. Tästä piti tulla kuva liikenteestä. Paikallinen ehti taas etualalle, tällä kertaa metallikaiteelle. Hän katsoi ensin vettä ja sitten minua. Vaihdoin hieman kuvakulmaa saadakseni kanavan paremmin näkyviin. Jos lintu näyttää edellistä suuremmalta, se johtuu vaativasta paikkatutkimuksesta.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from Livia's own pigeon-eye camera. Landscape 3:2, 1536x1024, sRGB. Full-frame 14 mm RECTILINEAR ultra-wide lens: strong near/far perspective, natural spatial depth, real materials and believable daylight. No fisheye circle, CGI, painted outlines, synthetic HDR, fake miniature blur or historical paper treatment. The photographer Livia remains behind the camera and is never visible. Use real photographs of the exact named viewpoint to constrain architecture, water edges and railings. Ordinary people and the small incident may be fictional, but architecture must not be invented. Keep the subject and place legible at phone size. Supply the clean colour photograph without text, PuluCam sticker or watermark; the selected B sticker is added separately by the game. Use ONLY the bird in pulu-cam-venetsia-03-r20260909-14mm-v3 as the continuity reference for Livia's crush: the same grey pigeon, orange iris, dark beak with pale cere, green-violet neck iridescence, distinctive irregular white throat patch, two dark wing bars and pink-red feet. Follow the actual reference over this verbal shorthand. Livia is invisible; the visible bird is her crush. Do not copy architecture from rejected Venice 1 or 2 images. Frame 2 of the five-picture accidental crush album. Exact bridge: PONTE DEI PUGNI over RIO SAN BARNABA in DORSODURO, by Campo San Barnaba, not the other similarly named bridge in Cannaregio. Reconstruct this small bridge from the real place photographs: a masonry arch and pale stone steps BELOW, but the sides ABOVE THE WALKING DECK are slender dark wrought-iron railings, open vertical bars and curved decorative metalwork with narrow metal top rails and distinct posts. It does NOT have a thick solid stone parapet at bird height. Livia's camera is perched on the actual metal top rail, about 10 centimetres above that perch, looking obliquely along the railing and down the real Rio San Barnaba. The SAME crush as Venice 3 is only about 35–50 centimetres along the rail from the lens. His natural toes grip the narrow metal securely. Keep the real rail thickness and profile; do not enlarge it into a broad stone ledge to support the bird. The bird fills appreciably more of the frame than in Venice 1, roughly a quarter to a third, without a deformed beak or extra toes. He has just turned from the water towards Livia's camera. Beyond him, show the actual small canal, authentic adjacent facades, a partial continuation of the same iron railing, and a modest workboat only where the water route permits. Use a single documented viewing direction; do not put a second whole Ponte dei Pugni in front of the camera when the photographer is sitting on it, and do not insert Rialto, Bridge of Sighs or San Marco monuments into this local canal view. Real bridge steps or stone footprint markers may appear only if this camera can actually see them; they are not mandatory props. Add a few more small pink heart doodles and two tiny sparkle marks to the extreme outer margins than in Venice 1, still less than in Venice 3. They are a separate-looking digital album embellishment, never painted onto the actual bridge. The central image stays an authentic contemporary camera photograph.

**Vertailuun jäävän vanhan kuvan tunniste:** `pulu-cam-venetsia-02-r20260909-14mm-v1`

Tämä uusi korvaava prompti on tekstisession kirjoittama. Aiempi kuva säilytetään hylättynä paikkageometrian vuoksi; sen alkuperäisiä tekijätietoja ei muuteta.

**Kuvatekstin käyttöönotto:** vasta tämän uuden kuvan kanssa.

**Paikkatarkistus:** Tarkasta Dorsoduron oikea silta: kivinen kaari ja askelmat alhaalla, ohuet tummat metallikaiteet ylhäällä. Ei umpinaista kivikaidetta. Linnun jalat tarttuvat todellisen paksuiseen metalliin. Kamera samassa sillassa: koko siltaa ei voi samalla keksiä eteen toiseksi sillaksi. Kanavan rakennukset ja venereitti yhdestä todellisesta katselusuunnasta.

**Lähteiden käyttö:** Venezia Unican virallisen Dorsoduro-reitin Stage 3 yksilöi Rio San Barnaban sillan ja sisältää sen valokuvan. Kaupungin artikkeli erottaa kaksi samannimistä siltaa. Kaiteen ulkoasu on lisäksi katsottu tämän tekstisession toimesta artikkelin aidosta lähikuvasta: https://i0.wp.com/theboutiqueadventurer.com/wp-content/uploads/2021/03/ponte-dei-pugni-venice.jpg?fit=1200%2C800&ssl=1 . Kuvassa metallikaiteen alla oleva kivikaari ei ole kivinen kaide.

**Lähteet:**

- [Lähde 1](https://www.veneziaunica.it/en/content/dorsoduro-art-district-venetian-origins-international-contemporary-art)
- [Lähde 2](https://www.veneziaunica.it/sites/default/files/redazione-turismo/itinerari/immagini/ponte%20dei%20pugni.jpg)
- [Lähde 3](https://live.comune.venezia.it/index.php/it/2025/04/una-calle-una-storia-ponte-dei-pugni)
- [Lähde 4](https://theboutiqueadventurer.com/landmarks-in-venice/)

### PuluCam / 3

**Toimi:** SÄILYTÄ — tämän session aiempi kuvakohtainen ohje, varmennettu lähtökohta

**PromptId:** `ALKUPERAINEN-OHJAUS-20260909-venetsia-3`

**Promptin alkuperä:** `posti/matkakirja-eurooppa-20260909.md (12:20 ja 12:50 kuvakohtaiset ohjeet; Venetsian 14 mm ja sydänreunat omistajan tarkennus)`

**Tarinallinen havainto:** Tekstisession alkuperäinen kolmas ihastuskuva: kahvilatuoli ja sama lintu pääosassa, ympäristö jää vähitellen toiseksi.

**Näkökulma:** Nykyisen visuaalisesti tarkistetun kuvan todellinen lintuperspektiivi.

**Lyhyt kuvateksti (55):** Venetsia: aukion nimi on… tiedän kyllä. Aivan varmasti.

**Pitkä kuvateksti (365):** Campo Santa Margheritan laidalla tuolit, puut ja kahvilapöydät levittäytyvät kaupungin yhteiseen olohuoneeseen. Istuin vain hetkeksi. Paikallinen tuli viereen ja kallisti päätään kellojen kuuluessa. Tässä näkyy siis aukion arkista elämää. Se on tärkeä aihe. Pöydän reunalle jäänyt muru ei selitä, miksi otin samasta linnusta näin monta kuvaa, eikä sen tarvitsekaan.

**Säilytettävän tiedoston tunniste:** `pulu-cam-venetsia-03-r20260909-14mm-v3`

Tämä ei ole uusi generointitilaus eikä väite, että kirjoitin kuvatuotannon teknisen promptilaajennuksen. Kuvakohtainen tilanneohje on tekstisession aiempi. Varmista sen vastaavuus tuotantolokiin ennen pelikytkentää.

**Paikkatarkistus:** Varmista lopuksi kuvassa näkyvän tarkan paikan nimi ja yhteys alkuperäiseen ohjeeseen. Jos alkuperäistä kuvakohtaista ohjausta ei voida osoittaa, älä hyväksy kuvaa automaattisesti; pyydä tekstisessiolta korvaava prompti.

**Lähteet:**

- [Lähde 1](https://www.veneziaunica.it/sites/default/files/redazione-turismo/itinerari/documenti/Classic_Dorsoduro_EN.pdf)
- [Lähde 2](https://www.camposantamargherita.com/bar.htm)
- [Lähde 3](https://www.comune.venezia.it/en/content/venice-and-bycicles)

### PuluCam / 4

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-venetsia-4`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Venetsia: tämä kuva käsittelee kuulemma lentoreittejä.

**Näkökulma:** Fourth photograph of the established Venice crush sequence.

**Lyhyt kuvateksti (54):** Venetsia: tämä kuva käsittelee kuulemma lentoreittejä.

**Pitkä kuvateksti (363):** Kanavan yllä reitti on hetken suoraviivainen: vettä alhaalla ja sillan kaari edessä. Hän nousi tuolilta ja lensi ensin. Minä seurasin, koska paikallinen tuntee ilmavirtaukset. Se on järkevä syy, Fogg. Kuvasta jäi pois osa sillasta, mutta siipien liike onnistui hyvin. Niin hyvin, että säästin ruudun. Sydämiä on reunoilla nyt useampia. Tutkin asetuksia myöhemmin.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. Fourth photograph of the established Venice crush sequence. Use pulu-cam-venetsia-03-r20260909-14mm-v3 ONLY as the bird-identity reference. Use real current place photographs for architecture; never inherit the rejected Venice 1 or 2 geometry. Match the established increasing heart-margin decoration without restarting already generated frames. The photographer Livia is invisible, flying about 2 metres over the real Rio di San Barnaba near the documented Ponte dei Pugni area, about 1–1.5 metres behind and to one side of the SAME grey male-looking crush pigeon. The other bird's natural near wing, orange eye, dark beak with pale cere, green-violet neck sheen, distinctive irregular white throat patch and two dark wing bars remain consistent with the references. Capture a credible brief flight moment, not a hovering bird statue, with actual canal façades and bridge placement receding. The crush dominates but the city remains recognizable. Natural daylight as in the existing sequence. Add a few MORE thin hand-drawn pink hearts, tiny sparkles and one bashful curved arrow at OUTER EDGES ONLY, consistent with frame 3; the centre stays a real colour photograph. No text, sticker or hearts replacing feathers. This romantic edge-decoration instruction is the explicit exception to the series' usual clean-image rule.

**Jatkuvuus:** Sama ihastus kuin Venetsia1–3. Käytä erityisesti kolmannen hyväksytyn kuvan yksilöä ja kaikkien kuvien valkoisen kaulalaikun muotoa. Ei uutta lintuhahmoa.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://live.comune.venezia.it/index.php/it/2025/04/una-calle-una-storia-ponte-dei-pugni)
- [Lähde 2](https://www.veneziaunica.it/sites/default/files/redazione-turismo/itinerari/documenti/Classic_Dorsoduro_EN.pdf)

### PuluCam / 5

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-venetsia-5`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Venetsia: nämä eivät kaikki kuuluneet esitykseen.

**Näkökulma:** Fifth and final Venice crush album photograph, using approved frames 1–3 and generated frame 4 as references for the SAME individual pigeon.

**Lyhyt kuvateksti (49):** Venetsia: nämä eivät kaikki kuuluneet esitykseen.

**Pitkä kuvateksti (362):** Aukion laidalla oli kaksi vierekkäistä kuivaa kohtaa samalla ikkunalaudalla. Hän valitsi toisen ja jätti toisen vapaaksi. Venetsiassa tila on arvokasta; siitä isoisä olisi osannut kirjoittaa pitkän huomion. Minä istuin siihen. Tässä viimeisessä kuvassa kaupunkia näkyy vähän, mutta muistan paikan aivan tarkasti. Hetkinen. Fogg. Kuinka monta näistä sinä jo näit?

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. Fifth and final Venice crush album photograph, using approved frames 1–3 and generated frame 4 as references for the SAME individual pigeon. First-person camera from Livia's place on one end of a real externally accessible wide stone window ledge overlooking Campo Santa Margherita in Dorsoduro; choose a genuine documented ledge and actual view direction. The same crush sits extremely close at the other end, three-quarter profile turned mildly toward the lens, large due to real 14 mm proximity, with natural orange iris, grey plumage, dark beak/pale cere, green-purple neck and identical white throat marking. He is an ordinary real pigeon, no human lips or cartoon grin. A narrow believable background slice of the café square, tree and façades remains. The composition has almost forgotten the landmark, tender and slightly embarrassing. Outer-edge pink hearts, sparkles and small affectionate arrow are the MOST abundant of this five-frame sequence, but do not cover the face or central photographic world. No words or embedded PuluCam sticker. Photographer herself remains unseen; the open ledge space near the lens implies company without a selfie. Continuity clarification V1.2: use pulu-cam-venetsia-03-r20260909-14mm-v3 for the crush bird identity; do not copy architecture from rejected Venice 1 or 2. This is a reference/QA clarification, not an order to regenerate a frame already in production.

**Jatkuvuus:** Kasvot ja höyhenkuvio eivät muutu kuvissa 1–5. Reunakoristeet lisääntyvät asteittain; viimeinen kuva on tahaton paljastus, ei pulun ammattimainen postikortti.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.veneziaunica.it/sites/default/files/redazione-turismo/itinerari/documenti/Classic_Dorsoduro_EN.pdf)
- [Lähde 2](https://www.camposantamargherita.com/bar.htm)

---

## Firenze — firenze

**Isoisän luettava teksti:** Firenzen David seisoo aukiolla ilman rihman kiertämää, ja minä hikoilen liivissä. Patsas aiotaan siirtää sisälle sateelta suojaan. Kolmensadan vuoden jälkeen tämä lienee kohtuullista. Katselin sen suurta kättä ja omaani. Minun käteni osaa lähinnä piirtää käden. Palasin illalla, kun aukiolla oli vähemmän väkeä. Kivi vaikutti silloin vielä enemmän ihmiseltä.

**Pulun kaupunkirepliikki (lähtöteksti):** David pääsi sisälle, aukiolle tuli kopio. Fogg, isoisälläsi oli sentään taskut. Patsaan on pärjättävä ilmeellä.

### Isoisän kuva / 1

**Päätös:** KORJAA tällä jo toimitetulla aiheella

**Perustelu:** Nykyinen yleiskuva tekee Davidista liian pienen. V3-käsitutkielmien anatomia ei läpäissyt kuvatuotannon tarkistusta: oikea käsi on lähellä reittä. V4 sallii kapean viereisen marmorin reunakaistan, jotta lähteen mukainen käsi säilyy oikeassa asennossaan.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-firenze-r20260909-paper-v4`

**Lyhyt kuvateksti (66):** Firenze, 1873. Kivinen käsi näytti osaavan jotakin, mitä omani ei.

**Pitkä kuvateksti (383):** Rajasin kuvaan Davidin suuren käden ja osan käsivarresta. Marmorin rystysissä on niin tarkkaa lepoa, että odotin melkein sormien liikkuvan. Michelangelon patsas seisoo vielä ulkona Palazzo Vecchion edessä. Sen takana palatsin kivi näyttää kiveltä, mutta tämän käden kohdalla asia ei ole yhtä yksinkertainen. Kamerani pystyy ottamaan siitä kuvan. Veistäjän oli ensin saatava se esiin.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Jo toimitettu prompti:** `ISOISA-TARINA-V4-firenze-kasi` · `posti/matkakirja-isoisa-20260909-firenze-kasi-v4.md`

Create a believable travel photograph made in 1873, printed as the SAME worn photographic paper style already approved for this series. Use https://media.matkakirja.app/kohtaamiset/isoisa/isoisa-giza-aged-r20260905-v1.jpg as the PAPER-TONE reference: pale neutral natural white, slightly grey, with only an extremely restrained grey-brown photographic image. No yellow or sepia-coloured paper. Soft period lens and print rendering, visibly irregular photographic grain; broad light and shadow shapes remain legible. Natural paper fibres, wear and clear irregular fold grooves continue beneath the uneven PALE edge fading all the way to the edges. Faint scene detail remains at the edges on the same continuous paper, no separate white backing, hard postcard border or dark vignette. True camera photograph with believable depth, light and materials, not drawn outlines or painterly patches. Do not sharpen masonry or fine decoration digitally. Landscape 3:2, 1536x1024, sRGB. Period-appropriate lens, exposure and illumination; no modern snapshots, flash or futuristic wide-angle effect. The grandfather is BEHIND the camera and never visible, even as a substitute foreground traveller. Other people are fictional anonymous locals. Use authentic period photographs or contemporary evidence to reconstruct the specific place, not later architecture. Florence, May 1873. A tight period photograph of Michelangelo's ORIGINAL DAVID'S HANGING RIGHT HAND, WRIST AND SHORT LOWER FOREARM at the documented outdoor Palazzo Vecchio installation. Attach the exact right-hand detail photograph from Visit Tuscany and the verified 1861–1873 outdoor installation photograph as separate anatomical and location references. Reproduce the original right hand faithfully: its real knuckles, relaxed/curved finger directions, thumb, veins and wrist rotation, with the hand close against the adjacent marble thigh edge as in the reference. The fingers may naturally overlap that narrow stone silhouette. A SLENDER VERTICAL STRIP of the adjacent marble/thigh edge behind the hand is explicitly allowed, aiming at about 5–10 percent of image width. It exists to preserve the real sculptural relationship, not to reveal the whole body. The head, torso, pelvis and genital area remain entirely outside the frame; no full-body statue or erotic framing. Do not rotate, detach or remodel the hand to isolate it against empty background. Do not replace it with a generic open palm, add fingers or props. The hand and wrist dominate the composition, not a distant figure in a square. Use a plausible supported 1873 camera on the public pavement at human chest height, angled modestly upward from a physically possible side position with a longer period focal length; no floating camera at statue height. A small genuine Palazzo Vecchio stone-wall patch fills remaining background where actually visible. Natural late-day side light, soft photographic optics and the SAME approved neutral worn Giza paper. The grandfather remains entirely behind the camera. Anatomical fidelity takes priority over making the marble strip artificially invisible; if the reference cannot fit this restrained crop, report that rather than change the statue.

**Kuvatekstin käyttöönotto:** vasta tämän uuden kuvan kanssa. Vanha kuva säilyy siihen saakka.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://catalogo.beniculturali.it/detail/PhotographicHeritage/0800635892)
- [Lähde 2](https://www.lombardiabeniculturali.it/fotografie/schede/IMM-3a010-0012052/)
- [Lähde 3](https://www.galleriaaccademiafirenze.it/opere/david-michelangelo/)
- [Lähde 4](https://www.galleriaaccademiafirenze.it/la-galleria/)

### PuluCam / 1

**Toimi:** JO TILATTU — jatka nykyistä työtä, ei uusintaa

**PromptId:** `OHJAUS-01-firenze-1`

**Promptin alkuperä:** `posti/matkakirja-pulucam-20260909-ohjaus-era1.md`

**Tarinallinen havainto:** Isoisä tarkastelee Davidin kättä ja omaa taitoaan. Pulu lähestyy samaa aihetta kasvojen kautta: sama ilme joka kuvassa on patsaan ammattitaito. Kuvassa on taideteoksen sivuprofiili lähellä ja nykykaupunki kauempana.

**Näkökulma:** Lyhyt lento aukiolla olevan David-kopion olkapään vierestä, 14 mm, kasvot lähellä. Kuvan etualan patsas on tunnistettavasti kopio ulkona, ei Accademian alkuperäinen.

**Lyhyt kuvateksti (60):** Firenze: Davidin kopio osaa pitää ilmeensä myös lähikuvassa.

**Pitkä kuvateksti (420):** Piazza della Signorian David on kopio. Michelangelon alkuperäinen veistos vietiin vuonna 1873 suojaan Galleria dell’Accademiaan. Aukiolla patsas kuuluu yhä Palazzo Vecchion ympärille levittäytyvään kivisten kertomusten joukkoon. Isoisä vertasi Davidin kättä omaansa. Minä tutkin ilmettä: sama keskittynyt katse joka suunnasta. Malli ei pyytänyt nähdä kuvaa eikä ehdottanut uutta otosta. Arvostan sellaista ammattitaitoa.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. The scene is Piazza della Signoria in Florence, beside the outdoor marble replica of Michelangelo's David at Palazzo Vecchio. Capture a fleeting pigeon flight close beside the statue's shoulder, with the camera at roughly shoulder height and directed toward its face. The correctly shaped marble cheek, intent eye, nose and curls occupy a large near foreground at one side; enough shoulder and neck remain to explain the statue. A physically correct slice of Palazzo Vecchio and present-day square life recedes behind it. Use the real statue's proportions, head direction and installation from references; the 14 mm perspective exaggerates proximity without deforming the sculpture. Late afternoon light brings out pale stone against the warm architecture. Quiet comedy: an intensely serious stone model being photographed absurdly close. No living pigeons, no changed expression on the statue, no new statue features, no gratuitous focus on anatomy. This frame must feel physically made during a brief close pass, not like a portrait composited onto a city.

**Paikkatarkistus:** Piazza della Signorian nykyinen ulkokopio Palazzo Vecchion ovella. Varmista kopion kasvot, suunta ja taustalla oikeasti näkyvä julkisivu nykyvalokuvista. Älä siirrä pronssikopiota Piazzale Michelangelolta tänne.

**Lähteet:**

- [Lähde 1](https://www.galleriaaccademiafirenze.it/opere/david-michelangelo/)
- [Lähde 2](https://portalegiovani.comune.fi.it/urlnews/webzine/46183.html)
- [Lähde 3](https://en.wikipedia.org/wiki/Palazzo_Vecchio)

---

## Rooma — rooma

**Isoisän luettava teksti:** Rooman Pantheonin katossa on pyöreä aukko, josta satoi sisään. Seisoin kuivassa ja katselin, kuinka sade löysi paikkansa lattialla. Näin vanhalle talolle ei kai enää tohdi huomauttaa katosta. Rooma on nyt Italian pääkaupunki; kaduilla on uusia virkamiehiä ja vanhoja keisareita kivisinä. Pantheon päästää yhä taivaan sisään kysymättä sen nimeä.

**Pulun kaupunkirepliikki (lähtöteksti):** Pantheoniin ostetaan nyt pääsylippu. Katon aukko on yhä avoin, mutta minäkin käyttäydyn siellä kuin vieras.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-rooma-r20260909-paper-v4`

**Lyhyt kuvateksti (40):** Rooma, 1873. Katto antoi sateelle luvan.

**Pitkä kuvateksti (382):** Pantheonin katon aukko on avoin taivaalle, ja sen alta lattia saa päivän sään suoraan nähtäväkseen. Seinien syvennyksissä valo pysyy toisenlaisena kuin keskellä salia. Asetin kameran kuivalle kohdalle ja odotin, että sade erottuisi lattian pinnassa. Roomassa rakennuksia on muutettu moneen tehtävään. Tämän talon kirkas pyöreä silmä katsoo edelleen ylöspäin, tehtävästä riippumatta.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://www.pantheonroma.com/en/pantheon-history/)

### PuluCam / 1

**Toimi:** JO TILATTU — jatka nykyistä työtä, ei uusintaa

**PromptId:** `OHJAUS-01-rooma-1`

**Promptin alkuperä:** `posti/matkakirja-pulucam-20260909-ohjaus-era1.md`

**Tarinallinen havainto:** Isoisä katsoo Pantheonin aukkoa alhaalta, pulu katsoo samaa aukkoa ylhäältä. Pulu on utelias mutta kunnioittaa paikkaa ja pysyy ilmassa katon yläpuolella.

**Näkökulma:** Ohilentävä kamera muutaman metrin aukon yläpuolella, vinosti alas. Aito katon pinta ja aukon reuna näkyvät; sisätila ei ole vääristynyt matalaksi kuopaksi.

**Lyhyt kuvateksti (53):** Rooma: isoisä katsoi aukosta ylös, minä katsoin alas.

**Pitkä kuvateksti (399):** Pantheonin kupolin keskellä oleva oculus on avoin taivaalle. Aurinko kuljettaa valoa sen kautta sisään, ja sade pääsee lattialle asti. Ylhäältä aukko näyttää valtavalta silmältä, jonka takana ihmiset liikkuvat pieninä. Isoisä ihmetteli, miksei näin vanhaa kattoa ollut paikattu. Minusta avoimuudessa on puolensa. Lensin vain ohi ja kurkistin: vieraan kuuluu tietää, milloin hän on toisen talon yllä.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. Photograph the real present-day Pantheon in Rome while the pigeon is flying a few metres ABOVE its roof, glancing diagonally downward across the rim of the open oculus. Include the weathered exterior roof surface in the near foreground, the real aperture and rim, and a convincing glimpse deep down to the rotunda floor with a few tiny modern visitors. The interior must have the immense depth of the real building, not resemble a shallow pit or swimming pool. Use correct current roof cladding, ring geometry and floor pattern from reference photographs. The oculus is fully open, without glazing. Natural daylight outside and realistically darker interior, exposure holding both with believable contrast. A slight bank in the framing conveys a passing flight; there is no hovering drone or diagrammatic perfect symmetry. The story is an intimate reverse of a visitor looking up, full of curiosity and quiet respect. No wing, body, camera device or other pigeon in frame.

**Paikkatarkistus:** Pantheonin nykyinen kupolin ulkopinta ja avoimen oculuksen rakenne. Käytä myös todellista ilmakuvaa ja sisätilareferenssiä. Korkea sisätila, ei litteä lattia heti reiän alla; ei lasia oculukseen. Kokemus on kuvitteellinen pulun ohilento, ei väite dokumentoidusta lentokuvasta.

**Lähteet:**

- [Lähde 1](https://www.pantheonroma.com/en/pantheon-history/)
- [Lähde 2](https://www.pantheonroma.com/en/2025/04/24/the-oculus-of-the-pantheon/)

---

## Sisilia — sisilia

**Isoisän luettava teksti:** Palermon palatsikappelissa seinät hohtavat kultaa ja puukatto näyttää puusta veistetyltä luolastolta. Normannien kuningas teetti sen, mutta kädet tulivat monesta maailmasta: kreikkalaisia mosaiikkeja, arabialaista veistotyötä. Katselin ylös, kunnes niska väsyi. Kuninkaan nimi mainittiin monta kertaa. Tekijöiden nimiä olisin kuunnellut kauemmin.

**Pulun kaupunkirepliikki (lähtöteksti):** Kappeli hohtaa yhä. Palermon palatsissa istuu nyt Sisilian parlamentti. Katto ansaitsee edelleen puheenvuoron.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-sisilia-r20260909-paper-v4`

**Lyhyt kuvateksti (54):** Palermo, 1873. Katon tekijät puhuivat monella kädellä.

**Pitkä kuvateksti (405):** Palatinakappelin katon syvennykset tarttuivat valoon eri kohdista, ja seinien mosaiikit vastasivat siihen kullalla. Normannikuninkaan tilaamassa tilassa kohtaavat eri seutujen käsityötaidot. Kamerani joutuu tekemään ilman väriä, mikä on tässä huoneessa selvä puute. Koetin saada puun pienet muodot näkyviin. Yhden katseen nostaminen ylös osoittautui helpoksi; sen palauttaminen alas kesti paljon kauemmin.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://www.federicosecondo.org/cappella-palatina/)

### PuluCam / 1

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-sisilia-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Palermo: tätä kattoa varten kannattaa nostaa nokkaa.

**Näkökulma:** A restrained imagined pigeon-eye photograph from a PHYSICALLY PLAUSIBLE spot just inside the entrance threshold of Palermo's Cappella Palatina, lens 10 cm above the real floor, tilted up at 14 mm.

**Lyhyt kuvateksti (52):** Palermo: tätä kattoa varten kannattaa nostaa nokkaa.

**Pitkä kuvateksti (396):** Palatinakappelin puukaton pienet syvennykset asettuvat päällekkäin kuin huolellisesti rakennettu pesä, jonka tekijä ei ole halunnut lopettaa. Mosaiikkien kulta tuo tilaan toisenlaista valoa. Isoisä kyseli käsityöläisten nimiä. Minä katselin, kuinka monta erilaista taitoa voi mahtua samaan huoneeseen. Palatsissa työskentelee nyt myös Sisilian parlamentti. Katon puheenvuoro on kestänyt kauemmin.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. A restrained imagined pigeon-eye photograph from a PHYSICALLY PLAUSIBLE spot just inside the entrance threshold of Palermo's Cappella Palatina, lens 10 cm above the real floor, tilted up at 14 mm. Show true muqarnas wooden ceiling, mosaic walls and part of a genuine column in their correct relationships, using official interior references and current restoration layout. This is low-angle wonder, not an invented nest on sacred decoration. No architecture cut away to let a bird enter, no fake hole in the ceiling, no flash, no people performing worship staged for comedy. Keep any current scaffolding if it lies in the verified field of view; choose a documented unobstructed angle instead of erasing it.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.federicosecondo.org/la-cappella-palatina/)
- [Lähde 2](https://www.federicosecondo.org/cenni-storici/)

---

## Ateena — ateena

**Isoisän luettava teksti:** Ateenassa puhuttiin Troijasta löydetystä kullasta kuin jokainen olisi ollut kaivamassa. Kahvilan isäntä piti Schliemannia nerona, asiakas varkaana. Kummallakaan ei ollut kultaa näyttää. Akropoliin pylväät kohosivat pölyn takaa; ne eivät tarvinneet enää mainosta. Kaivoin taskustani kolikon kahvia varten. Sen alkuperästä isäntä ei kysynyt mitään.

**Pulun kaupunkirepliikki (lähtöteksti):** Schliemannin myöhempi talo on nyt rahamuseo. Isoisä etsi aarretta; minä tarkistan ensin kahvilan pihan.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-ateena-r20260909-paper-v4`

**Lyhyt kuvateksti (50):** Ateena, 1873. Kultakeskustelu jatkui ilman kultaa.

**Pitkä kuvateksti (386):** Kahvilan pöydän ääressä kädet tekivät suurempia liikkeitä kuin kupit. Schliemannin Troijan löydöt olivat antaneet kaupunkiin uuden puheenaiheen, ja kumpikin keskustelija vaikutti tuntevan asian päästä päähän. Pyysin heitä pysähtymään hetkeksi kuvaan. Akropolis ei tarvinnut pyyntöä. Otin mukaan myös sen, jotta näkyisi, kuinka lähellä kahvipöytää täällä on jo valmiiksi vanhaa maailmaa.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://www.theacropolismuseum.gr/en)

### PuluCam / 1

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-ateena-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Ateena: kultaa sisällä, hyvä varjo puutarhassa.

**Näkökulma:** At the actual garden café of the Numismatic Museum, Iliou Melathron, Athens, lens 9 cm above a real garden-path surface under a café chair.

**Lyhyt kuvateksti (47):** Ateena: kultaa sisällä, hyvä varjo puutarhassa.

**Pitkä kuvateksti (362):** Schliemannin myöhempi kotitalo Ateenassa toimii rahamuseona. Puutarhakahvilassa kolikot ovat saaneet tavallisen tehtävänsä takaisin: niillä maksetaan kahvi. Istuin tuolin alla, kun pöydällä vaihdettiin kuppi ja pieni lautanen eri kohtiin. Isoisä kuuli täällä väittelyä aarteesta. Minä löysin paikan, jossa kukaan ei väitellyt varjon arvosta. Se kelpasi kaikille.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. At the actual garden café of the Numismatic Museum, Iliou Melathron, Athens, lens 9 cm above a real garden-path surface under a café chair. A patterned patch of tree shade, chair feet and a modest cup being set on a table create an inviting near foreground, while a verified slice of the mansion and actual garden planting identifies the place. No generic Acropolis café or ruins in the garden. Contemporary casual visitors, quiet summer light. The photographer is investigating shade and conversation, not stealing from a plate. Use current official garden photos to retain real wall, path and table positions.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.nummus.gr/en/refreshment-room-cafe/)
- [Lähde 2](https://www.nummus.gr/en/iliou-melathron/)

---

## Kreeta — kreeta

**Isoisän luettava teksti:** Hanian sataman majakan aloittivat venetsialaiset ja korjasivat egyptiläiset. Nyt kaupunki kuuluu sulttaanille. Kalastaja selvitti minulle kaikki kolme ja paikkasi samalla verkkoaan. Kun kysyin, kenen majakka siis on, hän osoitti merelle. Niiden, jotka tarvitsevat sitä. Piirsin karttaani valon ilman valtakunnan väriä.

**Pulun kaupunkirepliikki (lähtöteksti):** Kreeta kuuluu nyt Kreikkaan, majakka seisoo yhä. Kalastaja vastasi paremmin kuin isoisän kartta.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-kreeta-r20260909-paper-v4`

**Lyhyt kuvateksti (62):** Hania, 1873. Verkko vaati korjausta valtakunnasta riippumatta.

**Pitkä kuvateksti (374):** Kalastajan sormet löysivät verkosta rikkinäisen kohdan nopeammin kuin silmäni. Sataman toisella puolella majakka seisoi venetsialaisten aloittamassa ja egyptiläisten muuttamassa hahmossaan. Kreeta on nyt sulttaanin aluetta, mutta veneen paluu riippuu valosta ja verkon kunto sen korjaajasta. Kuvasin nämä kaksi työtä samaan näkymään. Mies ei pitänyt kumpaakaan arvoituksena.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://www.chaniatourism.gr/monument/the-egyptian-lighthouse/)
- [Lähde 2](https://chaniahistory.gr/en/lighthouse/)
- [Lähde 3](https://www.chaniatourism.gr/neighborhood/venetian-harbor/)

### PuluCam / 1

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-kreeta-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Hania: majakkaa tarvitaan siltäkin puolelta, josta sitä ei kuvata.

**Näkökulma:** A close low pigeon flight 1.

**Lyhyt kuvateksti (66):** Hania: majakkaa tarvitaan siltäkin puolelta, josta sitä ei kuvata.

**Pitkä kuvateksti (365):** Hanian majakka seisoo pitkän aallonmurtajan päässä. Sataman suulta sen tehtävä on helppo ymmärtää: valon paikka kertoo, missä kova reuna alkaa ja avoin vesi jatkuu. Lensin matalalta ohi juuri kun pieni vene palasi suojaan. Isoisän kalastaja sanoi majakan kuuluvan sitä tarvitseville. Kuvan alakulmaan jäi vene. Pidin sen mukana, sillä siinä oli koko vastauksen syy.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. A close low pigeon flight 1.5–2 metres above water on the navigable harbour side of Chania's lighthouse breakwater, looking past an actual stone edge toward the lighthouse and a small fishing boat entering the real harbour mouth. Correct lighthouse silhouette: documented octagonal base, later polygonal and circular sections, real pale stone and proportions. Keep true breakwater curve and harbour entrance, no Venetian gondola or invented island. Lens tilt and near wave texture create unusual bird-scale depth without putting the camera underwater. Natural late-afternoon sea light, no visible photographer or dramatic storm.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.chaniatourism.gr/monument/the-egyptian-lighthouse/)
- [Lähde 2](https://www.chaniatourism.gr/neighborhood/venetian-harbor/)

---

## Dubrovnik — dubrovnik

**Isoisän luettava teksti:** Ragusan muureilta näkee, kuinka huolellisesti meri on pidetty ulkona. Portin sisällä vesi kuitenkin tulee vastaan vanhan suihkukaivon kivikasvoista. Join yhden suusta ja toisenkin, sillä ne näyttivät olevan eri mieltä mausta. Sama vesi. Kaupunki on rakentanut janolleen kuusitoista puhuvaa päätä, ja jokainen neuvoo ottamaan vielä kulauksen.

**Pulun kaupunkirepliikki (lähtöteksti):** Onofrion suihkukaivo antaa vettä yhä. Isoisä maistoi kahdesti; minä olisin laskenut nokat ennen juomista.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-dubrovnik-r20260909-paper-v4`

**Lyhyt kuvateksti (42):** Ragusa, 1873. Kivikasvot puhuivat vedellä.

**Pitkä kuvateksti (363):** Suuren Onofrion kaivon sivuissa kasvot antavat veden ohikulkijan ulottuville. Kaupunki on johtanut juotavan veden muurien sisään, vaikka muuten se on nähnyt paljon vaivaa pitääkseen ulkopuolen ulkona. Asetin kameran yhden naamion eteen. Se pysyi vakavana koko valotuksen, mikä helpotti työtäni. Vesi ei pysynyt, mutta sen liike näyttää kuuluvan tähän kasvokuvaan.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://tzdubrovnik.hr/lang/en/get/spomenici/5535/onofrios_fountains.html)

### PuluCam / 1

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-dubrovnik-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Dubrovnik: laskenta alkoi yhdestä märästä nenästä.

**Näkökulma:** At the LARGE Onofrio fountain near Pile Gate in Dubrovnik, pigeon camera on a real dry stone edge about 10 cm above that ledge.

**Lyhyt kuvateksti (50):** Dubrovnik: laskenta alkoi yhdestä märästä nenästä.

**Pitkä kuvateksti (376):** Suuren Onofrion suihkukaivon kivikasvot ovat janon asialla. Ihmiset kumartuvat veden ääreen, mutta minulle sopiva katselukorkeus on valmiiksi juuri tässä. Kuvasin yhden naamion läheltä. Sen ilme oli vakava siihen nähden, että koko työpäivä kuluu veden sylkemiseen. Isoisä vertaili makuja. Minä päätin ensin selvittää, kuinka monta tällaista työtoveria rakennuksessa oikein on.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. At the LARGE Onofrio fountain near Pile Gate in Dubrovnik, pigeon camera on a real dry stone edge about 10 cm above that ledge. Extreme near perspective of ONE actual carved mask and its water spout, with natural trickling water catching light. An adult hand holding a refillable bottle enters from a distant side, not covering the carving. Reproduce a documented mask and real basin detail, not a gargoyle invented from imagination. Keep the building's curved polygonal wall behind. No Small Onofrio fountain substituted, no giant jet and no bird drinking dirty water as a gag.

**Jatkuvuus:** Kuvat 1–3 esittävät samaa suurta Onofrion suihkukaivoa. Kivinaamio ja valo säilyvät tunnistettavina.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.historyhit.com/locations/large-onofrio-fountain/)

### PuluCam / 2

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-dubrovnik-2`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Dubrovnik: sama vesi, lisää puheenvuoroja.

**Näkökulma:** Second frame at the SAME Large Onofrio fountain, Dubrovnik.

**Lyhyt kuvateksti (42):** Dubrovnik: sama vesi, lisää puheenvuoroja.

**Pitkä kuvateksti (362):** Siirryin seuraavan sivun kohdalle. Kivikasvojen jono jatkui kaivon ympäri, ja jokaiselle saapui vuorollaan joku pullon kanssa. Yksi rakennus järjestää kokonaisen aukion juomatauon. Aloin ymmärtää isoisän kiinnostusta, vaikka pidän veden maistelun mielelläni lyhyenä toimituksena. Laskennassa oli vielä kesken se tärkeä kysymys, lasketaanko ihmisten nenät mukaan.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. Second frame at the SAME Large Onofrio fountain, Dubrovnik. From another real dry ledge 10 cm above its surface, look tangentially along several genuine faces of the polygonal fountain, showing a sequence of actual carved masks and spouts. Close masonry recedes in strong ultra-wide depth toward two ordinary visitors refilling bottles. Use first frame and verified fountain photos for matching stone, scale and light. The masks must stay on their real individual sides; do not flatten all sixteen onto one façade or build extra tiers. Natural quiet civic life, no drawn speech bubbles.

**Jatkuvuus:** Kuva 1 referenssinä; eri katselukohta saman kaivon ulkopinnalla, samat olosuhteet.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.historyhit.com/locations/large-onofrio-fountain/)

### PuluCam / 3

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-dubrovnik-3`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Dubrovnik: kuusitoista suuta, yksi kaivo. Tarkastettu.

**Näkökulma:** Third frame of the SAME Large Onofrio fountain in Dubrovnik: a pigeon flight about 2 metres above the fountain's actual roof, camera banked slightly and looking diagonally down, enough to reveal its real polygonal body, domed roof, surrounding paving and correct nearby Pile Gate approach.

**Lyhyt kuvateksti (54):** Dubrovnik: kuusitoista suuta, yksi kaivo. Tarkastettu.

**Pitkä kuvateksti (379):** Lopuksi nousin kaivon yläpuolelle. Koko rakennus asettui paikalleen portin lähellä, ja vedenhakijoiden reitit erkanivat takaisin kujille. Kuusitoista sivua selvisi ilman, että minun tarvitsi maistaa niistä jokaista. Otin vielä tämän kuvan todistusaineistoksi. Isoisällä oli karttakynä; minulla on siivet ja kohtuullinen käsitys siitä, milloin laskut kannattaa tarkistaa ylhäältä.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. Third frame of the SAME Large Onofrio fountain in Dubrovnik: a pigeon flight about 2 metres above the fountain's actual roof, camera banked slightly and looking diagonally down, enough to reveal its real polygonal body, domed roof, surrounding paving and correct nearby Pile Gate approach. Use actual elevated-location references; no impossible walls moved to fit the picture. Retain matching light and a small recognizable bottle-filling visitor from previous frames. This is a short local survey, not a view of the entire walled city from hundreds of metres. No numbers or arrows overlaid.

**Jatkuvuus:** Ensimmäiset kaksi kuvaa ohjaavat jatkuvuutta. Kaikkia 16 naamioita ei pakoteta näkyviin yhdestä suunnasta.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.historyhit.com/locations/large-onofrio-fountain/)

---

## Sarajevo — sarajevo

**Isoisän luettava teksti:** Sarajevon kupariseppä naputti pannuun kuvioita niin pienellä vasaralla, että olisin hukannut sen liivintaskuun. Viereisessä puodissa kaadettiin kahvia samanlaiseen pannuun. Olin juonut siitä aamulla katsomatta. Nyt näin jokaisen jäljen. Basaarin kujilla kuului kilkutusta kaikkialta. Kaupunki oli tehnyt aamiaiseni astian käsin.

**Pulun kaupunkirepliikki (lähtöteksti):** Kupariseppiä on basaarissa yhä, ja kahvi tulee pienessä pannussa. Isoisä oppi katsomaan kuppiaan. Hyvä alku.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Seppä on pysähtynyt kuvan ajaksi; vasara, käsityö ja astiat ovat näkyvissä. Ajan tekniikalle uskottava tauko vastaa tekstin työtä.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-sarajevo-r20260909-paper-v4`

**Lyhyt kuvateksti (45):** Sarajevo, 1873. Vasara sai levätä kuvan ajan.

**Pitkä kuvateksti (382):** Pyysin kupariseppää odottamaan hetken. Hänen vasaransa jäi käteen, ja puoliksi valmistuneessa astiassa näkyi, kuinka sileästä pinnasta tulee kuvioitua yksi lyönti kerrallaan. Basaarin muiden puotien kilkutus jatkui sillä välin. Olin aamulla juonut samanlaisen pannun kahvia katsomatta pannua lainkaan. Tähän kuvaan annoin astioille niin paljon tilaa kuin pöytä ja kamerani sallivat.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://arhiva.visitsarajevo.ba/2018/04/sarajevo-coppersmiths-masters-of-an-old-craft/?lang=en)

### PuluCam / 1

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-sarajevo-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Sarajevo: pannun kylki kertoo, kuka teki aamukahvin mahdolliseksi.

**Näkökulma:** Present-day Kazandžiluk coppersmith street in Sarajevo, pigeon camera 10 cm above a real accessible shop-threshold ledge, very close to a copper coffee pot on an outdoor display/work surface.

**Lyhyt kuvateksti (66):** Sarajevo: pannun kylki kertoo, kuka teki aamukahvin mahdolliseksi.

**Pitkä kuvateksti (377):** Kazandžilukin kujalla kupariastiat heijastavat kapean kadun valoa. Yhden pannun pinta on sileä, toiseen kasvaa tekijän naputtama kuvio. Näin läheltä ero näyttää kokonaiselta maisemalta. Isoisä huomasi käsityön vasta juotuaan kahvinsa. Minä tulin katsomaan ensin. Seppä laski vasaran hetkeksi alas, ja työpöytä hiljeni. Siinä oli hyvä hetki ottaa kuva ja pitää oma nokka kiinni.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. Present-day Kazandžiluk coppersmith street in Sarajevo, pigeon camera 10 cm above a real accessible shop-threshold ledge, very close to a copper coffee pot on an outdoor display/work surface. The engraved texture is a large near foreground; a real adult craftsperson's hands and tiny resting hammer are visible further back beside a partly worked pot. Match the actual narrow street and shopfront from current references. Natural reflected street light, copper colour remains realistic, no golden fantasy bazaar. The moment is a pause in skilled work, not a startled worker swatting a bird. No fake shop signs or impossible see-through wall.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://visitbih.ba/en/one-of-the-oldest-streets-of-sarajevo-kazandziluk-500-years-long-tradition/)

---

## Sofia — sofia

**Isoisän luettava teksti:** Sofiassa maa tarjoaa kuumaa vettä pyytämättä halkoja. Lähteellä nainen täytti kannua ja odotti sen jäähtymistä. Minä olin maksanut majatalossa kylmästä pesuvedestä. Tällaisista epäjohdonmukaisuuksista matkailu muodostuu. Minareetin takana kohosi Vitoša. Vuori näytti nukkuvan, mutta sen kaupungin alla oli selvästi jo noustu keittämään.

**Pulun kaupunkirepliikki (lähtöteksti):** Sofia on nyt Bulgarian pääkaupunki. Lähdevettä haetaan yhä. Maa ei ole korottanut hintaa arvonimen takia.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-sofia-r20260909-paper-v4`

**Lyhyt kuvateksti (45):** Sofia, 1873. Maa oli ehtinyt lämmittää veden.

**Pitkä kuvateksti (396):** Nainen piti kannua varovasti, sillä lähteen tarjoilussa ei ollut kylmää vaihtoehtoa. Minareetti ja Vitošan rinne asettuivat kuvan taakse, mutta arjen tärkein rakennelma oli veden ottopaikka. Majataloni pesuvesi oli ollut viileää. Täällä lämpö nousi maasta ilman, että kukaan kantoi paikalle halkoa. Pyysin naista jäämään kuvaan odottamaan kannunsa jäähtymistä. Siitä oli meille molemmille hyötyä.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://visitsofia.bg/catalog/en/discover_sofiaEN/Discover_SofiaEN.pdf)

### PuluCam / 1

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-sofia-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Sofia: kuuma vesi, viileä harkinta.

**Näkökulma:** At the actual public mineral-water dispensing fountains beside Sofia's former Central Mineral Baths, camera only 10 cm above a dry cool edge OUTSIDE the hot-water flow.

**Lyhyt kuvateksti (35):** Sofia: kuuma vesi, viileä harkinta.

**Pitkä kuvateksti (405):** Sofian lähteillä vesi lasketaan nykyäänkin mukana tuotuihin astioihin. Muovipulloja on enemmän kuin isoisän kannuja, mutta odottamisen asento näyttää tutulta. Seisoin viileällä kivellä veden sivussa. En aikonut kokeilla lämpötilaa varpaalla, vaikka eräs ihminen teki juuri niin sormellaan. Vitosan kaupungissa on paljon nähtävää. Tällä kertaa katsoin, kuinka tavallinen päivä alkaa maan antamasta vedestä.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. At the actual public mineral-water dispensing fountains beside Sofia's former Central Mineral Baths, camera only 10 cm above a dry cool edge OUTSIDE the hot-water flow. An ordinary modern refill bottle dominates near foreground while an adult fills another at a genuine metal spout. Match current fountain arrangement, paving and visible bath-building direction from real references. Subtle steam only if supported by cool-air conditions. Warm human routine, natural early morning colour. No pigeon bathing in boiling water, no therapeutic claim, fantasy spring erupting through tiles or mountains pasted behind a view that cannot contain them.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.sofiacityguide.com/visit-the-sofia-mineral-springs/)

---

## Bukarest — bukarest

**Isoisän luettava teksti:** Bukarestin Manucin majatalossa huoneet kiertävät pihaa puuparvien takana. Avasin oven ja kuulin yhtä aikaa kolmet eri kaupat. Alhaalla mies nukkui säkkinsä päällä kuin pankki omaisuutensa vartijana. Keittiöstä nousi tuoksu, jolle ei tarvittu tulkkia. Menin alas ennen kuin ehdin laskea parven pylväät. Huoneeni löysin illalla naapurini kuorsauksesta.

**Pulun kaupunkirepliikki (lähtöteksti):** Manucin majatalon pihalla syödään edelleen. Isoisä löysi huoneensa korvalla. Minä löydän keittiön samoin.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-bukarest-r20260909-paper-v4`

**Lyhyt kuvateksti (73):** Bukarest, 1873. Majatalon pihassa tavara ja matkustaja lepäsivät yhdessä.

**Pitkä kuvateksti (394):** Manucin majatalon parvilta näki pihalle ja toisille parville, joten yksinäisyyttä oli tarjolla lähinnä oven sulkemisen hinnalla. Alhaalla mies oli tehnyt säkeistään vuoteen ja vartioi niitä samalla nukkumalla. Keittiön suunnasta liikkui ruokaa ja tuoksua. Kuvasin ennen alas menemistä. Pylväiden laskeminen olisi voinut odottaa iltaan, mutta en luottanut siihen, että päivällinen tekisi samoin.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://muzeulbucurestiului.ro/expozitia-tematica-hanurile-uitate-ale-bucurestilor/)
- [Lähde 2](https://www.hanulluimanuc.ro/)

### PuluCam / 1

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-bukarest-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Bukarest: parvelta löytyi suora yhteys lounaaseen.

**Näkökulma:** At the real Hanu' lui Manuc restaurant courtyard in Bucharest, lens 10 cm above an actual wooden upper-gallery balustrade.

**Lyhyt kuvateksti (50):** Bukarest: parvelta löytyi suora yhteys lounaaseen.

**Pitkä kuvateksti (396):** Manucin majatalon pihalla pöydät ovat nykyään ravintolan käytössä. Puiset parvet kehystävät aterioita kuten ennen matkustajien kohtaamisia. Minä laskeuduin kaiteelle ja löysin tarjoilijan reitin yhdellä silmäyksellä. Isoisä tunnisti huoneensa kuorsauksesta. Täällä on edelleen monta ääntä päällekkäin, mutta lautasen kevyt kilahdus erottuu yllättävän hyvin. Ammattitaito auttaa myös ravintolassa.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. At the real Hanu' lui Manuc restaurant courtyard in Bucharest, lens 10 cm above an actual wooden upper-gallery balustrade. Look down and across the documented courtyard geometry toward a waiter carrying ordinary plates among current outdoor tables. The near worn timber and repeating real gallery posts lead the eye to lunch below. Match current official courtyard photos, keep real balconies, stairs, umbrellas and any actual canopy where present. No fabricated open sky through a covered structure or generic Ottoman palace. Soft midday shade, warm ordinary human activity, photographer invisible.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://hanumanucrestaurant.ro/en/)
- [Lähde 2](https://www.hanulluimanuc.ro/en/)

---

## Kiova — kiova

**Isoisän luettava teksti:** Kiovan luostarin kupolit näkyvät kauas Dneprille, mutta pyhiinvaeltajat menevät maan alle. Seurasin kynttilöitä luoliin. Kun oma liekkini sammui, edellä kulkeva nainen sytytti sen omastaan sanomatta mitään. Kaksi liekkiä, eikä ensimmäiseltä puuttunut mitään. Olen tutkinut monta tapaa siirtää omaisuutta. Tämän haluan muistaa.

**Pulun kaupunkirepliikki (lähtöteksti):** Kiova on nyt Ukrainan pääkaupunki. Luostari on kärsinyt sodassa. Tätä isoisän sivua luen hiljaa.

### Isoisän kuva / 1

**Päätös:** KORJAA tällä jo toimitetulla aiheella

**Perustelu:** Nykyisessä kuvassa kynttilä sytytetään ulkona luolien edessä; lähikuvassa ele näyttää tulitikulla sytyttämiseltä. Tekstin ydin on naisen kynttilästä jaettu liekki luoliin mentäessä.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-kiova-r20260909-paper-v4`

**Lyhyt kuvateksti (54):** Kiova, 1873. Toinen liekki ei pienentänyt ensimmäistä.

**Pitkä kuvateksti (350):** Nainen suojasi tulta kädellään, ja toinen sydänlanka alkoi hehkua. Kapeassa käytävässä ei juuri ollut tilaa väistää, mutta tuolle eleelle oli. Kiovan luostarin alla kuljetaan pyhiinvaeltajien jäljissä kynttilä kerrallaan. Asetin saamani valon kivireunalle kameran viereen. Kuvassa se näyttää pieneltä. Sen turvin löysin kuitenkin takaisin muiden luo.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Jo toimitettu prompti:** `ISOISA-TARINA-V2-kiova` · `posti/matkakirja-isoisa-20260909-korjauspromptit.md`

Create a believable travel photograph made in 1873, printed as the SAME worn photographic paper style already approved for this series. Use https://media.matkakirja.app/kohtaamiset/isoisa/isoisa-giza-aged-r20260905-v1.jpg as the PAPER-TONE reference: pale neutral natural white, slightly grey, with only an extremely restrained grey-brown photographic image. No yellow or sepia-coloured paper. Soft period lens and print rendering, visibly irregular photographic grain; broad light and shadow shapes remain legible. Natural paper fibres, wear and clear irregular fold grooves continue beneath the uneven PALE edge fading all the way to the edges. Faint scene detail remains at the edges on the same continuous paper, no separate white backing, hard postcard border or dark vignette. True camera photograph with believable depth, light and materials, not drawn outlines or painterly patches. Do not sharpen masonry or fine decoration digitally. Landscape 3:2, 1536x1024, sRGB. Period-appropriate lens, exposure and illumination; no modern snapshots, flash or futuristic wide-angle effect. The grandfather is BEHIND the camera and never visible, even as a substitute foreground traveller. Other people are fictional anonymous locals. Use authentic period photographs or contemporary evidence to reconstruct the specific place, not later architecture. Kyiv Pechersk Lavra, May 1873. An intimate scene JUST INSIDE a real documented cave-entrance passage, at the daylight threshold where a supported 1873 exposure remains credible. The camera stays inside the passage and looks along the dim narrow route. A modestly dressed adult female pilgrim with a period head covering leans her already lit slender beeswax taper toward a second slender taper placed securely on a stone ledge beside the camera. The second wick is catching the first candle's flame: TWO CANDLES SHARING FIRE is unmistakably the central action. Her free hand shelters both lights; no match, lighter, torch or magical glow. The grandfather has set his candle on this ledge and remains entirely behind the camera, no visible hand or reflection of him. Anonymous people beyond can be faint slow-exposure shapes. Soft natural light from the nearby real entrance defines her face, fingers and worn pale passage surface; candles add small local highlights, not movie-set illumination. Do not depict a deep pitch-black cave as if brightly photographed, and do not move the encounter outside to an architectural panorama. Preserve a gentle, quiet human exchange. Use verified entrance proportions rather than inventing an ornate underground cathedral.

**Kuvatekstin käyttöönotto:** vasta tämän uuden kuvan kanssa. Vanha kuva säilyy siihen saakka.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://guide.kyivcity.gov.ua/lavra-vr/en/)
- [Lähde 2](https://whc.unesco.org/en/list/527/)

### PuluCam / 1

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-kiova-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Kiova: tähän kuvaan jätin tilaa hiljaisuudelle.

**Näkökulma:** A quiet fictional present-day human moment at a VERIFIED currently surviving accessible exterior threshold within Kyiv Pechersk Lavra, using up-to-date reference images after the documented wartime damage.

**Lyhyt kuvateksti (47):** Kiova: tähän kuvaan jätin tilaa hiljaisuudelle.

**Pitkä kuvateksti (356):** Kiovan luolaluostari kuuluu kaupungin pitkään muistiin, ja sota on vahingoittanut sitä. Tässä katson läheltä kiveä, käden suojaamaa liekkiä ja hetkeä, joka ei tarvitse selostusta. Isoisä kirjoitti valosta, jonka saattoi antaa pois menettämättä omaansa. En tiedä, mitä kuvani ihminen ajattelee. Siksi jätän sen kertomatta ja pidän kameran hetken paikallaan.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. A quiet fictional present-day human moment at a VERIFIED currently surviving accessible exterior threshold within Kyiv Pechersk Lavra, using up-to-date reference images after the documented wartime damage. Pigeon camera 10 cm above a dry stone step, with the hand of an ordinary adult sheltering a small candle in the near-middle frame. The hand, flame, real stone surface and a modest recognizable doorway detail carry the picture; no huge pristine monastery panorama. Do not reconstruct the entire prewar skyline as current, invent bomb damage, smoke, soldiers, memorial inscriptions or a specific real victim. Natural sober daylight, authentic colour, no romantic heart marks or comic food detail. Do not identify the person or imply this is a documentary photo of an actual recent event. If a proposed doorway no longer survives or is inaccessible, use another verified surviving public threshold and record the exact source before generation.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://whc.unesco.org/en/list/527/)
- [Lähde 2](https://www.unesco.org/en/articles/unesco-statement-ukraine)
- [Lähde 3](https://www.icomos.org/news/statement-attacks-june-2026-kyiv-ukraine/)

---

## Odessa — odessa

**Isoisän luettava teksti:** Odessan portaat on tehty niin leveiksi, että niitä pitkin voisi saapua kokonainen valtakunta. Minä saavuin yksin ja jouduin silti lepäämään puolivälissä. Satamassa vehnäsäkit siirtyivät selästä laivaan, ja ylhäällä puistokäytävällä herrat siirsivät vain kävelykeppiään. Merituuli kulki portaat yhdellä hengenvedolla. Sitä ei kukaan pysäyttänyt tullissa.

**Pulun kaupunkirepliikki (lähtöteksti):** Odessan vanha keskusta on nyt sodan uhkaamaa maailmanperintöä. Näitä portaita katson tänään toisin.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-odessa-r20260909-paper-v4`

**Lyhyt kuvateksti (58):** Odessa, 1873. Portailla kuorma näytti todellisen painonsa.

**Pitkä kuvateksti (409):** Alhaalta katsottuna portaat levittävät kaupunkia sataman ylle kuin näyttämöä. Vehnäsäkkien kantajat tekevät siinä työtä, jonka ylhäällä kävelevä herra voi sivuuttaa yhdellä katseella. Minä tarvitsin pysähdyksen puolivälissä, vaikka kannoin vain omia tavaroitani. Asetin kameran niin, että kuvaan jäivät sekä leveät askelmat että kuormat niiden lähellä. Pelkkä komeus olisi kertonut tästä paikasta liian vähän.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://whc.unesco.org/document/196047)
- [Lähde 2](https://whc.unesco.org/en/list/1703)

### PuluCam / 1

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-odessa-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Odessa: portaat jatkuvat kuvan ulkopuolelle.

**Näkökulma:** Present-day Odesa Potemkin Steps, from pigeon eye height 10 cm above ONE genuine step near a documented surviving accessible portion.

**Lyhyt kuvateksti (44):** Odessa: portaat jatkuvat kuvan ulkopuolelle.

**Pitkä kuvateksti (380):** Odessan leveät portaat yhdistävät kaupungin ylätason sataman suuntaan. Isoisä vertasi siellä tavaran kantajien työtä herrasväen kevyempiin liikkeisiin. Minä katson nyt samoja kiviä kaupungissa, jonka maailmanperintöä sota uhkaa. Tähän kuvaan ei tarvittu mitään suurta tapahtumaa. Valo kulki askelman yli, eikä sen perässä kuulunut kiirettä. Toivon, että tuollaisia hetkiä riittää.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. Present-day Odesa Potemkin Steps, from pigeon eye height 10 cm above ONE genuine step near a documented surviving accessible portion. Look diagonally along the broad real stone treads and strong side-light shadows, with only a limited geographically correct upper or harbour-side background. Use current references, preserving actual access barriers and visible present-day condition where relevant. A quiet close view of enduring public space; no invented bomb crater, fresh combat, victims, fake historic shipping bustle or cheerful staged tourist crowd. Avoid manufacturing a pristine complete seafront from old postcards. Natural documentary colour and sober light, no nostalgia filter, hearts or visual gag.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://whc.unesco.org/en/list/1703/)
- [Lähde 2](https://www.unesco.org/en/articles/odesa-unesco-condemns-renewed-attack-world-heritage-property)

---

## Moskova — moskova

**Isoisän luettava teksti:** Kremlissä seisoo valtava kello, joka ei ole soinut kertaakaan. Se halkesi ennen ensimmäistä lyöntiä. Irronnut pala on minun huonettani suuremman oloinen. Vartija kertoi painon ylpeästi, aivan kuin hiljaisuus olisi sillä voitettu. Illalla pieni käsikello kutsui minut syömään. Sillä oli vähemmän mainetta mutta selvästi enemmän vaikutusvaltaa.

**Pulun kaupunkirepliikki (lähtöteksti):** Tsaarinkello vaikenee edelleen. Moskova on nyt pääkaupunki. Minäkin tulen syömään pienemmästä kutsusta.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-moskova-r20260909-paper-v4`

**Lyhyt kuvateksti (52):** Moskova, 1873. Suuri kello ja sen irti päässyt pala.

**Pitkä kuvateksti (380):** Kellon kyljestä puuttuva kohta on niin suuri, että sitä voisi luulla tarkoitukselliseksi oveksi. Irronnut pala seisoo vieressä todistamassa toista. Vartija kertoi painosta ja antoi minun kuvata rauhassa. Tsaarinkello on ehtinyt saada maineensa käyttämättä ääntään kertaakaan. Tämän vedoksen tekeminen sujui siksi mainiosti: kohde ei liikkunut, eikä se vaatinut ketään hiljenemään.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://www.kreml.ru/en-Us/visit-to-kremlin/what-to-see/tsar-kolokol/)
- [Lähde 2](https://kremlin-architectural-ensemble.kreml.ru/the-tsar-bell/view/)

### PuluCam / 1

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-moskova-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Moskova: hiljaisuuden kyljessä on lintua suurempi aukko.

**Näkökulma:** At the Tsar Bell in the Moscow Kremlin, photograph from pigeon eye height 10 cm above the documented paving near the detached bronze fragment, without crossing any real barrier.

**Lyhyt kuvateksti (56):** Moskova: hiljaisuuden kyljessä on lintua suurempi aukko.

**Pitkä kuvateksti (387):** Tsaarinkellosta irronnut pala seisoo edelleen suuren kellon vieressä. Ihmiset kuvaavat kokonaisuutta muutaman askeleen päästä; minä tarkistin tyhjän kohdan läheltä. Pronssin reuna näyttää tästä korkeudesta kallionseinältä. Kello ei ole koskaan soinut. Se ei estä sitä keräämästä yleisöä, mutta myönnän arvostavani myös pienempiä esineitä, jotka tekevät sen, mitä varten ne on rakennettu.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. At the Tsar Bell in the Moscow Kremlin, photograph from pigeon eye height 10 cm above the documented paving near the detached bronze fragment, without crossing any real barrier. The rough broken edge becomes a monumental near foreground and the corresponding missing section in the great bell remains recognizable behind. Use exact sculpture, fragment orientation, base and actual surroundings from current photographs. Keep correct physical size relationships and modest distant visitors. Soft neutral daylight and real patinated bronze, no restored whole bell, ringing clapper action, new arch opening or camera hidden impossibly inside solid metal.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://en.wikipedia.org/wiki/Tsar_Bell)
- [Lähde 2](https://bridgetomoscow.com/time-gap-tsar-bell)

---

## Pietari — pietari

**Isoisän luettava teksti:** Pietarissa kesäyö on vaalea kuin loppuun pesty lakana. Kello käski nukkumaan, mutta Neva ei näyttänyt iltaa vanhemmalta. Rantakadulla nainen sulki päivänvarjonsa ja jäi silti kävelemään. Palatsien ikkunat hohtivat ilman kynttilöitä. Kirjoitin päivän tapahtumat loppuun. Päivä itse ei suostunut lopettamaan, joten lisäsin vielä tämän.

**Pulun kaupunkirepliikki (lähtöteksti):** Pietari ehti olla Leningradkin. Kesäyö on yhä valoisa. Isoisän kellosta taisi loppua valta.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-pietari-r20260909-paper-v4`

**Lyhyt kuvateksti (45):** Pietari, 1873. Neva ei näyttänyt kellonaikaa.

**Pitkä kuvateksti (394):** Rantakadun penkillä olisi ollut tilaa istua loppuun koko ilta, jos illalla olisi ollut selvempi loppu. Vaalea taivas jäi palatsien ikkunoihin ja joen pintaan. Päivänvarjo näytti tässä valossa tarpeelliselta vielä silloinkin, kun kello neuvoi aivan muuta. Kuvasin kaupungin ilman varsinaista yötä. Kameralle sellainen järjestely sopii hyvin; minun seuraavan aamuni voinnista en ollut yhtä varma.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://www.loc.gov/pictures/resource/ppmsc.03878)
- [Lähde 2](https://hermitagemuseum.org/panorama/pano_37/?floorNum=1&lng=en)

### PuluCam / 1

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-pietari-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Pietari: kello näyttää yötä, kaupunki esittää vastalauseen.

**Näkökulma:** A real Neva embankment in Saint Petersburg during the naturally pale June white night, pigeon camera 10 cm above a verified granite ledge beside a simple actual riverside bench.

**Lyhyt kuvateksti (59):** Pietari: kello näyttää yötä, kaupunki esittää vastalauseen.

**Pitkä kuvateksti (375):** Nevan rannassa vaalea kesäyö tekee kellonajasta huonon maisemaoppaan. Ihmiset pysähtyvät kaiteelle, vaikka päivän pitäisi jo olla valmis. Istuin kivireunalla ja kuvasin tyhjän penkin, jolle joku oli jättänyt tilaa toisellekin. Isoisä jatkoi kirjoittamista. Minä otin vielä yhden ruudun. Tämän valon kanssa ongelmana ei ole, ettei näkisi, vaan ettei tahdo lopettaa katsomista.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. A real Neva embankment in Saint Petersburg during the naturally pale June white night, pigeon camera 10 cm above a verified granite ledge beside a simple actual riverside bench. Look along the true embankment curve; one or two adults stroll in the middle distance, the bench largely empty, water and correctly placed opposite buildings softly lit by the low northern sky. Match a single real reference viewpoint, not a collection of palaces. No midnight sun high overhead, orange tropical sunset, invented opened bridge beside the bench or glowing city fantasy. Quiet photographic colour, sky still light, small human routine rather than spectacle.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.awaywithmaja.com/guide-st-petersburgs-white-nights/)

---

## Helsinki — helsinki

**Isoisän luettava teksti:** Helsingin valkoisen kirkon katolla apostolit katsovat merelle. Alhaalla torilla kalakauppias katseli vaakaa. Kummankin työ vaikutti vakavalta. Tuuli nosti paperini, ja nainen painoi sen paikoilleen silakalla ennen kuin ehdin auttaa. Nyt kartassani on Suomenlahden kohdalla täsmällinen rasvajälki. Harvoin olen saanut yhtä luotettavaa paikallistietoa.

**Pulun kaupunkirepliikki (lähtöteksti):** Kirkko on nyt tuomiokirkko. Kauppatorin lokit käyttäisivät isoisän paperipainoa mielellään.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Lähikatselussa kala on oikeasti karttapaperin päällä. Keskeinen tapahtuma näkyy; ei uusintaa pelkän yleiskuvan epäselvyyden vuoksi.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-helsinki-r20260909-paper-v4`

**Lyhyt kuvateksti (55):** Helsinki, 1873. Kartta sai rannikon päälle vielä kalan.

**Pitkä kuvateksti (391):** Torikauppias painoi paperini alas ennen kuin tuuli ehti viedä mittaustyötä merelle. Valkoinen kirkko kohosi myyntipaikkojen takana, ja kala jäi kartan päälle aivan toisenlaiseksi paikannimeksi. Pyysin pitämään asetelman hetken ennallaan. Kalan tehtävä oli yksinkertainen ja onnistui täydellisesti. Kamerakin sai näin oman todistuksensa siitä, että maantiede voi hyötyä kalakaupan välineistä.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://www.finna.fi/Record/hkm.CCD1A6CE-FD67-4BDD-9E29-D3C71E41D098)
- [Lähde 2](https://www.finna.fi/Record/hkm.F2DD5045-4DE1-49AF-8418-01F6629EEBB6)
- [Lähde 3](https://helsingintuomiokirkko.fi/index/kirkontarina.html)
- [Lähde 4](https://www.hamhelsinki.fi/en/sculptures/havis-amanda-2/)
- [Lähde 5](https://www.hamhelsinki.fi/en/sculptures/alexander-ii/)

### PuluCam / 1

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-helsinki-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Helsinki: paperipaino on siirtynyt lokkien kiinnostuksen piiriin.

**Näkökulma:** At a real current Helsinki Market Square fish stall, pigeon camera 9 cm above the paving next to the stall's leg.

**Lyhyt kuvateksti (65):** Helsinki: paperipaino on siirtynyt lokkien kiinnostuksen piiriin.

**Pitkä kuvateksti (393):** Kauppatorilla tuuli tarttuu paperiin yhtä luontevasti kuin ennenkin. Tällä kertaa sen lähellä seisova lokki huomasi kalatiskin ennen minua, mutta minä ehdin huomata lokin. Isoisä sai kartalleen silakan rasvajäljen. Nykyisen kauppiaan käärepaperi odottaa huomattavasti lyhyempää matkaa. Kuvasin tilanteen ennen kuin kumpikaan meistä ehti sekaantua kaupankäyntiin. Se vaati pientä itsehillintää.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. At a real current Helsinki Market Square fish stall, pigeon camera 9 cm above the paving next to the stall's leg. A natural gull near the camera tilts its head toward ordinary fish laid on wrapping paper on the ACTUAL stall counter above, while a vendor's hand secures a lifting paper corner. Real harbour-side surroundings and a geographically possible distant cathedral glimpse only if visible from the chosen verified stall position. No fish placed on filthy ground or vendor feeding wildlife, no enormous food. Wind gives paper a slight lift, real cool maritime daylight. Keep the narrative in the shared attention to the paper and fish.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.myhelsinki.fi/places/helsinki-cathedral/)
- [Lähde 2](https://www.myhelsinki.fi/places/senate-square/)

### PuluCam / 2

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-helsinki-2`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Helsinki: katolla seurataan toisenlaista toria.

**Näkökulma:** Short pigeon flight at Helsinki Cathedral roof level, close beside one ACTUAL documented zinc apostle statue, looking past a faithful section of its garment toward the real Senate Square sightline.

**Lyhyt kuvateksti (47):** Helsinki: katolla seurataan toisenlaista toria.

**Pitkä kuvateksti (382):** Tuomiokirkon katon apostolipatsailla on hyvä paikka katsella Helsinkiä. Minä kävin tarkistamassa näkymän yhden kiviseltä näyttävän vaipan vierestä; patsaat ovatkin sinkkiä. Alempana Senaatintori asettuu rakennusten väliin, ja merikaupunki jatkuu sen takana. Isoisä vertasi apostolien ja kalakauppiaan vakavuutta. Tästä kuvasta puuttuu vaaka, mutta tarkkaavaisuudessa on samaa sukua.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. Short pigeon flight at Helsinki Cathedral roof level, close beside one ACTUAL documented zinc apostle statue, looking past a faithful section of its garment toward the real Senate Square sightline. Reference the specific statue, material patina, position, roof edge and correct square below. Ultra-wide proximity makes the drapery large but does not change sculpture anatomy. Clear pale summer light, realistic metal surface. No cathedral apostles made of white marble, no market square directly under the statue instead of Senate Square, no fabricated ocean view through buildings. Keep camera bird invisible and flight physically plausible.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.myhelsinki.fi/places/helsinki-cathedral/)
- [Lähde 2](https://www.myhelsinki.fi/places/senate-square/)
- [Lähde 3](https://www.helsinginseurakunnat.fi/artikkelit/apostoliveistokset_0)

---

## Tampere — tampere

**Isoisän luettava teksti:** Tammerkoski tekee töitä kahden järven välissä. Sen partaalla puuvilla muuttuu langaksi ja miehet rahakkaiksi. Finlaysonin tehtaassa nainen näytti, kuinka katkennut lanka yhdistetään. Minun sormissani se katkesi uudestaan. Hän sitoi sen katsomatta ja palasi koneelleen. Merkitsen muistiin: tehtaan voimaa mitatessa pitäisi laskea myös sormet.

**Pulun kaupunkirepliikki (lähtöteksti):** Nyt Finlaysonilla on ravintoloita. Isoisä seurasi lankaa, minä tarjoilijaa. Molemmilla oli hyvä syy.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Työntekijän kädet ja langan liittäminen näkyvät lähitarkistuksessa. Kuvaa ei tarvitse vaihtaa uuteen tehdasyleiskuvaan.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-tampere-r20260909-paper-v4`

**Lyhyt kuvateksti (62):** Tampere, 1873. Katkennut lanka ja kädet, jotka osaavat jatkaa.

**Pitkä kuvateksti (385):** Tehtaan koneiden vierellä ihminen näyttää ensin pieneltä. Sitten lanka katkeaa, ja koneen koko ei auta sitä millään tavoin takaisin yhteen. Työntekijän sormet tekivät solmun ennen kuin olin kunnolla ymmärtänyt, mistä piti ottaa kiinni. Kuvasin hänet lankansa kanssa. Koskesta saa käyttövoimaa ja raudasta koneita; tämän taidon hankkimiseen täytyy ilmeisesti käyttää kokonainen ihminen.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://www.finna.fi/Search/Results?lookfor=Finlayson+tehdas+kehruusali&type=AllFields)

### PuluCam / 1

**Toimi:** JO TILATTU — jatka nykyistä työtä, ei uusintaa

**PromptId:** `OHJAUS-01-TAMPERE-V2-1`

**Promptin alkuperä:** `posti/matkakirja-pulucam-20260909-tampere-v2.md`

**Tarinallinen havainto:** Isoisä tarkasteli työntekijän sormia tehtaan sisällä. Livia seuraa tarjoilijan reittiä saman teollisuusalueen nykyisellä kattoterassilla. Paikan korkeus paljastuu jo reunakaiteen yli, mutta leipäkori kiinnostaa enemmän.

**Näkökulma:** 8–12 cm oikean kattoterassin kulkupinnasta, tuolien välissä. Avoin taivas ja kattotason oikea näkymä erottavat paikan pihasta.

**Lyhyt kuvateksti (57):** Tampere: seurasin tarjoilijaa ja päädyin tehtaan katolle.

**Pitkä kuvateksti (386):** Finlaysonin alueen Kattopuutarhassa kahvilan vieressä kasvaa kokonainen puutarha katon korkeudella. Ihmiset katselevat kaupunkia, minä tarkistan pöytien välisen liikenteen. Sinipaitaisella tarjoilijalla on leipäkori, joten hänen reittinsä on juuri nyt näkymistä kiinnostavin. Isoisä seurasi tehtaan lankaa. Minun tutkimukseni etenee tuolinjalalta toiselle ja vaatii yhtä tarkkaa silmää.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. On the real open-air terrace of Kahvilaputiikki Kattopuutarha, Media 54, fifth floor, Satakunnankatu 18 A, Tampere, photograph from 8–12 centimetres above the ACTUAL terrace walking surface between café chairs. Match current photographs of this particular rooftop: actual surface, furniture, planting beds, parapets or guardrails, nearby roof structures and skyline direction. The terrace is on a factory ROOF, never at courtyard ground level. Let open sky and a credible distant industrial rooftop or chimney visible from this verified spot establish the height; do not invent enclosing multi-storey courtyard walls. One modest bread crumb close to the lens draws the eye past chair legs to a fictional adult waiter in a blue shirt, dark apron, carrying a pale tray and a small bread basket. The waiter is walking through the real aisle toward a table. Ordinary daylight, natural colours, a serious route survey secretly motivated by lunch. The near crumb is prominent by perspective only. Keep a recognizable arrangement of plants, chairs and railing for frame 2. No visible camera pigeon, no fake signs, no cutaway roof and no giant bread. The fictional waiter need not resemble an actual employee. Use actual contemporary terrace reference photos rather than approximating its architecture.

**Jatkuvuus:** Tarjoilija: nimetön aikuinen, sininen paita, tumma esiliina, vaalea tarjotin ja pieni leipäkori. Nämä ovat luova jatkuvuusratkaisu, eivät todellisen työntekijän tuntomerkit.

**Paikkatarkistus:** Kahvilaputiikki Kattopuutarha, Media 54, Satakunnankatu 18 A, 5. kerros. Käytä kuvatuotannon jo varmentamaa nykyistä AVOTAIVASTA kohti aukeavaa kattoterassia ja sen oikeita kalusteita, kasvillisuutta, kulkupintoja, kaiteita sekä näkölinjoja. Ei Plevnaa, Siperian pihaa eikä Palatsia. Katettu tai lasitettu osa säilyy katettuna; kuva 2 lennetään ainoastaan oikeasti avoimen ulko-osan yllä. Älä siirrä katolle maantason tehdaspihan julkisivuja.

**Lähteet:**

- [Lähde 1](https://www.kattopuutarha.fi/)
- [Lähde 2](https://finlaysoninalue.fi/tehdaspuutarha/)
- [Lähde 3](https://finlaysoninalue.fi/ravintolat-ja-kahvilat/)

### PuluCam / 2

**Toimi:** JO TILATTU — jatka nykyistä työtä, ei uusintaa

**PromptId:** `OHJAUS-01-TAMPERE-V2-2`

**Promptin alkuperä:** `posti/matkakirja-pulucam-20260909-tampere-v2.md`

**Tarinallinen havainto:** Livia kohoaa saman avoimen kattoterassin yläpuolelle. Nyt näkyvät sekä tarjoilijan kulkureitti että katolla kasvava puutarha. Maiseman mittava kartoitus paljastuu pienen leipäkorin seuraamiseksi.

**Näkökulma:** Noin 2–3 m kattoterassin kulkupinnan yläpuolella, loivasti kaartuvasta lennosta alaviistoon. Korkeus mitataan katosta, ei kadusta.

**Lyhyt kuvateksti (72):** Tampere: puutarha katolla, leipäkori reitillä. Hyvä kaupunkisuunnitelma.

**Pitkä kuvateksti (404):** Nousin vähän ylemmäs. Kattopuutarhan pöydät ja istutukset asettuivat kartaksi, ja sama tarjoilija jatkoi korinsa kanssa kohti asiakasta. Tehdasalueelle on tullut kasveja, kahvia ja kokonaan uusia kulkureittejä. Minulle kahden tuolin väliin jää käytävä; ihmiselle siihen mahtuu korkeintaan anteeksipyyntö. Kuvassa on myös Tamperetta, jos maltat katsoa leipäkorin ohi. Minä maltoin juuri valotuksen verran.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. Second frame of the SAME present-day Kahvilaputiikki Kattopuutarha ROOFTOP terrace event in Tampere. Generate after frame 1 has passed place QA and attach it as the continuity image. The camera pigeon is now flying about 2–3 metres above the verified OPEN-AIR terrace floor, banking gently and looking diagonally down toward the SAME fictional blue-shirted waiter, dark apron, pale tray and small bread basket as they approach a customer table. Keep identical weather, sunlight, roof layout, plants, furniture, parapets and actual surrounding buildings. Reveal the real roof garden and routes between tables; the changing viewpoint explains both the rooftop place and the pigeon's lunch investigation. It is close flight above a roof, not a street-level courtyard, high-altitude drone, transparent building or roof removed for the camera. Frame only the genuinely open terrace part. Any existing canopy, glazing or roof must remain in its true position and occlude the view naturally. Match visible background to the selected current location references. The bread basket remains realistically small and traceable from frame 1. Subtle bank and slight far-edge movement, no exaggerated wing props, arrows, fake miniature effect, text or baked-in sticker.

**Jatkuvuus:** Kuva 1 lukitsee todellisen kattoterassin, tarjoilijan, leipäkorin ja valon. Ensimmäisestä kuvasta ei rajata uutta vaan generoidaan sama hetki aidosti muuttuneesta lentonäkökulmasta.

**Paikkatarkistus:** Kahvilaputiikki Kattopuutarha, Media 54, Satakunnankatu 18 A, 5. kerros. Käytä kuvatuotannon jo varmentamaa nykyistä AVOTAIVASTA kohti aukeavaa kattoterassia ja sen oikeita kalusteita, kasvillisuutta, kulkupintoja, kaiteita sekä näkölinjoja. Ei Plevnaa, Siperian pihaa eikä Palatsia. Katettu tai lasitettu osa säilyy katettuna; kuva 2 lennetään ainoastaan oikeasti avoimen ulko-osan yllä. Älä siirrä katolle maantason tehdaspihan julkisivuja.

**Lähteet:**

- [Lähde 1](https://www.kattopuutarha.fi/)
- [Lähde 2](https://finlaysoninalue.fi/tehdaspuutarha/)
- [Lähde 3](https://finlaysoninalue.fi/ravintolat-ja-kahvilat/)

---

## Tallinna — tallinna

**Isoisän luettava teksti:** Revalin torin apteekissa myytiin marsipaania sydänsuruihin. Kysyin, auttaako se myös silloin, kun ei vielä tiedä ketä kaipaa. Apteekkari leikkasi suuremman palan. Ikkunasta näkyi raatihuone ja sen vakava torni; sisällä tuoksui manteli. Söin lääkkeeni matkalla satamaan. Vaiva jäi, mutta hoitoon olin poikkeuksellisen tyytyväinen.

**Pulun kaupunkirepliikki (lähtöteksti):** Raeapteekki myy yhä marsipaania. Suurempi pala? Se mies osasi kuunnella potilasta.

### Isoisän kuva / 1

**Päätös:** KORJAA tällä jo toimitetulla aiheella

**Perustelu:** Nykykuvan apteekkari työskentelee vaa'alla; suuremman marsipaanipalan leikkaaminen ei erotu. Vaihdetaan päätoiminnoksi juuri tekstin leikkaus.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-tallinna-r20260909-paper-v4`

**Lyhyt kuvateksti (48):** Reval, 1873. Apteekkari määräsi suuremman palan.

**Pitkä kuvateksti (375):** Tiskillä oli vaaka, mutta tällä kertaa apteekkari luotti silmämäärään. Veitsi siirtyi hieman kauemmas, ja lääkeannokseni kasvoi. Raeapteekin hyllyillä seisoi vakavia astioita; mantelista ja sokerista tehty marsipaani piti niiden seurassa varsin iloista virkaa. Kuvasin leikatun palan ennen lähtöä. Se osoittautui hyväksi päätökseksi, sillä satamassa jäljellä oli enää paperi.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Jo toimitettu prompti:** `ISOISA-TARINA-V2-tallinna` · `posti/matkakirja-isoisa-20260909-korjauspromptit.md`

Create a believable travel photograph made in 1873, printed as the SAME worn photographic paper style already approved for this series. Use https://media.matkakirja.app/kohtaamiset/isoisa/isoisa-giza-aged-r20260905-v1.jpg as the PAPER-TONE reference: pale neutral natural white, slightly grey, with only an extremely restrained grey-brown photographic image. No yellow or sepia-coloured paper. Soft period lens and print rendering, visibly irregular photographic grain; broad light and shadow shapes remain legible. Natural paper fibres, wear and clear irregular fold grooves continue beneath the uneven PALE edge fading all the way to the edges. Faint scene detail remains at the edges on the same continuous paper, no separate white backing, hard postcard border or dark vignette. True camera photograph with believable depth, light and materials, not drawn outlines or painterly patches. Do not sharpen masonry or fine decoration digitally. Landscape 3:2, 1536x1024, sRGB. Period-appropriate lens, exposure and illumination; no modern snapshots, flash or futuristic wide-angle effect. The grandfather is BEHIND the camera and never visible, even as a substitute foreground traveller. Other people are fictional anonymous locals. Use authentic period photographs or contemporary evidence to reconstruct the specific place, not later architecture. Inside the historic Raeapteek on Tallinn's Town Hall Square, called Reval in September 1873. Photograph across a plausible period wooden pharmacy counter in window daylight. An anonymous adult apothecary has paused with a small knife at the end of a fresh cut through a clearly visible pale almond marzipan log on a wooden cutting board. A GENEROUS SLICE is separated next to the main piece on simple wrapping paper; his gesture presents it kindly toward the unseen customer/camera. This cutting and larger portion must be the main readable subject, not medicine being weighed. Brass scales and plausible period labelled jars recede into supporting background. Show realistic marzipan texture, not pills, bread, cheese or a rolled bandage. The moment is deliberately held still for a long exposure. The camera's customer stays entirely behind it. Respect the documented pharmacy room and window orientation; include only a physically possible small square glimpse, not a fabricated view of Town Hall through the wrong wall. No present-day cash register, plastic or pharmacy equipment. This is a warm understated joke about an unusually sympathetic prescription, not a medical advertisement.

**Kuvatekstin käyttöönotto:** vasta tämän uuden kuvan kanssa. Vanha kuva säilyy siihen saakka.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://raeapteek.ee/en/)
- [Lähde 2](https://visittallinn.ee/eng/visitor/see-do/things-to-do/attractions-museums/174823/town-hall-pharmacy)

### PuluCam / 1

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-tallinna-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Tallinna: parempi annoskoko löytyi jo ennen reseptiä.

**Näkökulma:** Outside the real Raeapteek entrance on Tallinn's Town Hall Square, camera 10 cm above a genuine threshold or paving edge, looking up obliquely at two adult visitors sharing a modest piece of pale marzipan from simple wrapping paper.

**Lyhyt kuvateksti (53):** Tallinna: parempi annoskoko löytyi jo ennen reseptiä.

**Pitkä kuvateksti (376):** Raeapteekki toimii edelleen Raatihuoneentorilla, ja marsipaania voi ostaa sen pitkästä historiasta kertovan vierailun lomassa. Tässä paketissa oli minusta harkittu koko. Sen omistaja pysähtyi portaalle jakamaan palan matkakumppanilleen. Isoisä piti suurempaa annosta hyvänä hoitona. Minä pidän jakamista lupaavana jatkotutkimuksena, vaikka en kuulu tämän seurueen potilaisiin.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. Outside the real Raeapteek entrance on Tallinn's Town Hall Square, camera 10 cm above a genuine threshold or paving edge, looking up obliquely at two adult visitors sharing a modest piece of pale marzipan from simple wrapping paper. Their hands and package are readable at near-middle distance; the true pharmacy doorway and a correctly oriented fragment of square provide context. No people feeding a bird or medicine scattered outside. Match current entrance and step geometry exactly. Natural northern daylight, subtle warm human humour about a generous portion. Photographer remains unseen, no bogus medical labels.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://raeapteek.ee/en/)
- [Lähde 2](https://visittallinn.ee/eng/visitor/see-do/things-to-do/attractions-museums/174823/town-hall-pharmacy)

---

## Riika — riika

**Isoisän luettava teksti:** Riikaan on tullut laulajia Latvian ensimmäisille suurille laulujuhlille. Luulin ensin kuulevani monta kuoroa, kunnes äänet ottivat saman hengenvedon. En ymmärtänyt sanoja. Viereinen mies lauloi kyynel poskellaan eikä pyyhkinyt sitä pois. Olin merkinnyt karttaan sataman ja kirkot. Kaupungin tärkein rakennus olikin hetken ajan tehty ihmisäänistä.

**Pulun kaupunkirepliikki (lähtöteksti):** Laulujuhlat jatkuvat yhä. Isoisä ei ymmärtänyt sanoja, mutta ymmärsi sentään olla puhumatta päälle.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-riika-r20260909-paper-v4`

**Lyhyt kuvateksti (49):** Riika, 1873. Kuoro hengitti kaupungin kokoiseksi.

**Pitkä kuvateksti (383):** Laulajien kasvot olivat erilaisia, mutta heidän seuraava hengenvetonsa kuului yhteen. Riian laulujuhlat ovat tuoneet paikalle väkeä, joka ei olisi muuten ehkä seissyt saman äänen sisällä. Pyysin pientä joukkoa pysähtymään kuvaan. Vieressäni laulanut mies ei pyyhkinyt poskeaan, enkä pyytänyt häntä tekemään sitä. Kameralla saa talteen ilmeen; siitä lähtenyt ääni täytyy muistaa itse.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://www.dziesmusvetki.lv/lv/zinas/pirmajiem-dziesmu-svetkiem-veltita-izstade-rlb/)
- [Lähde 2](https://www.dziesmusvetki.lv/en/about-the-celebration/the-song-and-dance-celebration/)

### PuluCam / 1

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-riika-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Riika: tämä pesä on rakennettu ihmisäänille.

**Näkökulma:** At the real present-day Mežaparks Great Bandstand in Riga, pigeon lens 10 cm above a verified spectator bench edge, looking toward the actual 2021 open lattice canopy and stage.

**Lyhyt kuvateksti (44):** Riika: tämä pesä on rakennettu ihmisäänille.

**Pitkä kuvateksti (371):** Mežaparksin suuri laululava on tehty kuoroja varten, ja sen rakenteet avautuvat ilmaan kuin oksisto. Isoisä kuuli Riian laulujuhlilla suuren joukon hengittävän yhdessä. Minä katsoin harjoitukseen asettuvia laulajia ja tyhjiä rivejä heidän edessään. Vielä oli tilaa hiljaisuudelle. Kuvasin tämän hetken ennen aloitusta, sillä laulun ajaksi sopi laskea kamera ja kuunnella.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. At the real present-day Mežaparks Great Bandstand in Riga, pigeon lens 10 cm above a verified spectator bench edge, looking toward the actual 2021 open lattice canopy and stage. A modest group of ordinary adult choir singers are arranging folders before a fictional rehearsal; most seating remains empty. Use current venue photos for the distinctive real canopy and seating geometry. Near bench leads into wide acoustic space. No recreation of the 1873 festival at this later venue, no invented mass rally, flags or legible event date. Natural clear rehearsal-day light, quiet expectancy and authentic colour.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.liveriga.com/en/1168-grand-stage-at-mezaparks)
- [Lähde 2](https://www.liveriga.com/en/14576-mezaparks-1)

---

## Vilna — vilna

**Isoisän luettava teksti:** Vilnan observatoriossa näytettiin valokuvaa auringonpilkuista. Olin pitänyt aurinkoa virheettömänä valaisimena, mutta silläkin on tahroja. Ikkunan alla kirkontornit osoittivat taivaaseen kukin omalla tavallaan. Tutkija odotti pilvien väistymistä. Joimme teetä. On lohdullista, että taivaan tutkiminenkin vaatii toisinaan vain hyvän tuolin.

**Pulun kaupunkirepliikki (lähtöteksti):** Vanha observatorio on yhä yliopiston käytössä. Tähtiä tutkitaan kauempana kaupungin valoista. Tuoli ei riitä.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-vilna-r20260909-paper-v4`

**Lyhyt kuvateksti (55):** Vilna, 1873. Auringolla oli pilkkuja, tutkijalla teetä.

**Pitkä kuvateksti (425):** Observatorion pöydällä valokuva auringonpilkuista näytti ensi silmäyksellä vialliselta vedokselta. Vika olikin huomattavasti kauempana, jos sitä viaksi sopii kutsua. Kaukoputki odotti, että pilvet väistyisivät, ja tuoli sai sillä välin tehdä osuutensa tutkimuksesta. Ikkunan takana Vilnan tornit osoittivat samaan suuntaan eri tarkoituksissa. Kuvasin pöydän, sillä se tuntui mukavalta paikalta aloittaa taivaan selvittäminen.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://www.muziejus.vu.lt/en/departments/observatory-of-ideas)
- [Lähde 2](https://www.knygynas.vu.lt/kitos-knygos/vadovas-po-senaja-vu-astronomijos-observatorija)

### PuluCam / 1

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-vilna-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Vilna: tähtitieteilijänkin ikkuna avautuu tavalliseen päivään.

**Näkökulma:** Pigeon viewpoint 10 cm above an actual exterior sill or low wall in Vilnius University's Observatory Courtyard, looking upward along the documented old observatory façade and genuine tower/window details.

**Lyhyt kuvateksti (62):** Vilna: tähtitieteilijänkin ikkuna avautuu tavalliseen päivään.

**Pitkä kuvateksti (389):** Vilnan yliopiston vanhan observatorion pihalla katse nousee väkisinkin ikkunoihin ja torneihin. Täällä taivasta tutkittiin keskellä kaupunkia. Nyt tarkimmat pimeät yöt löytyvät kauempaa valoista, mutta pihalla kuljetaan edelleen kirjojen ja laukkujen kanssa. Isoisä joi teetä pilviä odotellessaan. Minä odotin opiskelijan väistymistä kuvasta. Tutkimus vaatii selvästi yhä kärsivällisyyttä.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. Pigeon viewpoint 10 cm above an actual exterior sill or low wall in Vilnius University's Observatory Courtyard, looking upward along the documented old observatory façade and genuine tower/window details. One contemporary adult student carrying books crosses the lower middle distance. Use official Observatory Courtyard references, not Grand Courtyard or a rural modern observatory. Keep true window alignment, wall colours and limited sky. Soft daylight, near weathered surface with deep ultra-wide perspective. Do not invent an outdoor giant telescope, starry daytime sky, fake sundial or exposed interior.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://biblioteka.vu.lt/e.parodos/kiemeliai/vu/observatorijoskiemas/infoen.html)
- [Lähde 2](https://www.muziejus.vu.lt/en/)

---

## Tukholma — tukholma

**Isoisän luettava teksti:** Tukholmassa kruunattiin Oskar, mutta minun kohdalleni osui lähinnä toisten hattuja. Pieni tyttö nousi isänsä hartioille ja selosti meille lopuille. Hän huomasi hevoset, kukat ja yhden kadonneen kengän. Kuningas jäi lyhyelle maininnalle. Satamaan palatessa saarten välissä välkkyi vesi. Suosittelisin samaa selostajaa myös valtakunnan asioihin.

**Pulun kaupunkirepliikki (lähtöteksti):** Ruotsissa ei enää kruunata kuninkaita. Tyttö tiesi silti olennaisen: näkymä paranee, kun pääsee ylemmäs.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-tukholma-r20260909-paper-v4`

**Lyhyt kuvateksti (58):** Tukholma, 1873. Selostaja sai kyydin parhaaseen katsomoon.

**Pitkä kuvateksti (385):** Kruunajaisväen hatut muodostivat eteeni uuden kaupungin, jonka yli en nähnyt. Lapsi nousi aikuisen hartioille ja alkoi kertoa, mitä niiden takana tapahtui. Kuvasin tämän oman pienen katsomon sillä välin, kun kuningas sai varsinaisen huomion. Saarten kaupunki juhlii tänään Oskaria. Minun vedokseeni jäävät ne kaksi ihmistä, joiden avulla juhla tuli näkyväksi myös taaempana seisoville.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://www.kungligaslotten.se/english/list-of-swedish-monarchs/oskar-ii.html)
- [Lähde 2](https://www.kungligaslotten.se/vara-besoksmal/kungliga-slottet/skattkammaren.html)

### PuluCam / 1

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-tukholma-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Tukholma: hyvä näköalapaikka ei vaadi kruunua.

**Näkökulma:** From a real low ledge beside the Monteliusvägen viewpoint railing in Stockholm, pigeon camera 10 cm above the perch, looking across the actual Mälaren/Riddarfjärden sightline to the correctly placed city landmarks.

**Lyhyt kuvateksti (46):** Tukholma: hyvä näköalapaikka ei vaadi kruunua.

**Pitkä kuvateksti (391):** Monteliusvägenin kävelyreitiltä avautuu vettä, kattoja ja Tukholman tuttuja siluetteja. Lapsi nousi aikuisen hartioille ja osoitti jotakin kuvan laidassa. Aikuinen käänsi päätään vähän hitaammin. Isoisä sai kruunajaisissa parhaat selostukset juuri tästä katsomosta. Minä valitsin kaiteen vierestä oman paikkani. Molemmissa menetelmissä on etunsa, mutta minun ei tarvitse neuvotella kyydistä.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. From a real low ledge beside the Monteliusvägen viewpoint railing in Stockholm, pigeon camera 10 cm above the perch, looking across the actual Mälaren/Riddarfjärden sightline to the correctly placed city landmarks. A child on an adult parent's shoulders at a respectful middle distance points toward a passing boat; both seen from behind, no identifying face focus. Foreground railing and stone create bird-scale proximity, current clothes and genuine viewpoint layout. No royal parade, hats from 1873, Stockholm landmarks swapped across the water or unsafe child on a guardrail. Natural bright overcast summer light.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.visitstockholm.com/o/monteliusvagen/)

---

## Oslo — oslo

**Isoisän luettava teksti:** Christianian vuonolla lastattiin lankkuja laivaan. Metsä matkusti maailmalle siististi pinottuna. Sataman mies näytti rannan sahoja ja sanoi kaupungin kasvavan puusta. Se oli omituista kuultavaa paikassa, jossa kivitalot näyttivät niin ylpeiltä itsestään. Poimin vedestä lastun. Se tuoksui yhä metsältä, vaikka matka oli jo alkanut.

**Pulun kaupunkirepliikki (lähtöteksti):** Nimi on nyt Oslo, ja vuonon rannassa kävellään oopperan katolla. Siihen suuntaan kaupunkien pitäisi kasvaa.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-oslo-r20260909-paper-v4`

**Lyhyt kuvateksti (57):** Christiania, 1873. Metsä valmistautui lähtemään laivalla.

**Pitkä kuvateksti (398):** Lankut odottivat rannassa suorina pinoina, aivan kuin metsä olisi saanut ennen merimatkaa kunnollisen kasvatuksen. Sataman takana kohoavat talot näyttävät kiveltä, mutta niiden vauraus kulkee usein tätä kautta puuna. Kuvasin lastausta ennen kuin laiva peitti pinoja näkyvistä. Vedessä kellui pieni lastu. Se kertoi tuoksullaan lähtöpaikastaan tarkemmin kuin yksikään rahtipaperi, jonka olin nähnyt.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://www.oslobilder.no/search?page=10&query=%22havna%22)

### PuluCam / 1

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-oslo-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Oslo: ihmisetkin ovat alkaneet käyttää kattoa kulkureittinä.

**Näkökulma:** At the real Oslo Opera House public sloping roof, pigeon camera 9 cm above the pale stone surface looking upslope from a VERIFIED public pedestrian section.

**Lyhyt kuvateksti (60):** Oslo: ihmisetkin ovat alkaneet käyttää kattoa kulkureittinä.

**Pitkä kuvateksti (375):** Oslon oopperan vinoa kattoa pitkin kävellään veden ääreltä ylemmäs. Minä aloitin samasta kohdasta kuin ihmiset, lähinnä vertailun vuoksi. Valkoinen pinta levitti päivän valon joka suuntaan, ja kenkien varjot nousivat hitaasti rinnettä. Isoisä näki rannassa maailmalle lähteviä lankkuja. Nyt täällä katsellaan, miten kaupunki rakentaa itselleen yhteyttä vuonoon myös ylhäältä.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. At the real Oslo Opera House public sloping roof, pigeon camera 9 cm above the pale stone surface looking upslope from a VERIFIED public pedestrian section. Near stone joints and one adult visitor's shoe cast long but natural shadows; several walkers continue toward the actual skyline edge. Show true slope, joints, roof geometry and a physically possible water glimpse, not a snow mountain or invented stairway. Quiet summer light, modern casual people, ultra-wide near/far depth. No viewpoint through a solid parapet and no camera bird.

**Jatkuvuus:** Kuva 2 jatkaa samasta oopperatalosta ja samoissa valo-oloissa; tunnistettava punatakkinen aikuinen kävelijä molempiin.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.operaen.no/)

### PuluCam / 2

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-oslo-2`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Oslo: katon idea näkyi paremmin, kun nousin siitä irti.

**Näkökulma:** Second Oslo Opera House photograph, a pigeon flight only 3 metres above the same roof slope, diagonally outward across the TRUE meeting of sloping stone, public waterfront and harbour water.

**Lyhyt kuvateksti (55):** Oslo: katon idea näkyi paremmin, kun nousin siitä irti.

**Pitkä kuvateksti (385):** Lennosta oopperan katto asettuu vuonon reunalle kuin kaupungin jatkama kävelytie. Alempana ihmiset pysähtyvät katsomaan vettä; ylempänä näkyy uusia rakennuksia. Samaa reunaa voi käyttää niin monella tavalla, että siitä kannattaa ottaa toinenkin kuva. Ensimmäisessä seurasin kenkiä. Tässä tarkistin, mihin ne ovat menossa. Arvostan arkkitehtuuria, joka ei lopu ihmisen pään korkeudelle.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. Second Oslo Opera House photograph, a pigeon flight only 3 metres above the same roof slope, diagonally outward across the TRUE meeting of sloping stone, public waterfront and harbour water. Use the first frame and actual current site references. Retain a recognizable adult walker in a red jacket, weather, stone joints and real adjacent roof volumes. Reveal the architecture's wedge shape from close flight without turning into a high drone panorama. Correct Bjørvika orientation, no older timber port pasted into the present. Natural light and very slight bank, no bird or wing props.

**Jatkuvuus:** Sama punatakkinen kävelijä, talo ja valo kuin kuvassa 1. Ei sataman ja katon liitoskohtien keksimistä.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.operaen.no/)

---

## Bergen — bergen

**Isoisän luettava teksti:** Bergenin Bryggenissä puutalot seisovat kylki kyljessä, ja niiden välissä tuoksuu kapakala. Kauppias näytti kuivattua turskaa kuin hopeaharkkoa. Sillä on täällä maksettu paljon muutakin kuin päivällinen. Sade rummutti kattoa, kala pysyi kuivana ja minä en. Kaupungin arvojärjestys selvisi minulle ilman tulkkia.

**Pulun kaupunkirepliikki (lähtöteksti):** Bryggenin varastotalot ovat nyt maailmanperintöä. Kala päätyy yhä lautaselle. Kumman suojelu onnistui paremmin?

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-bergen-r20260909-paper-v4`

**Lyhyt kuvateksti (43):** Bergen, 1873. Kuiva kala, märkä vierailija.

**Pitkä kuvateksti (366):** Kauppias piti kapakalaa kädessään sellaisella varmuudella, jota näkee tavallisesti arvopaperien omistajilla. Bryggenin puuvarastot ovat kasvaneet tämän kaupan ympärille. Katon reuna suojasi kalaa ja myyjää, mutta kamerani jalat joutuivat sadeveden puolelle. Odotin hetken, että mies sai tavaransa hyvään asentoon. Kalalla ei näyttänyt olevan enää kiirettä mihinkään.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://hanseatiskemuseum.museumvest.no/kongetorsk-engelsk)

### PuluCam / 1

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-bergen-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Bergen: varastotalot saivat suojan, minä etsin oman.

**Näkökulma:** Within a REAL timber passage between Bryggen warehouses in Bergen, pigeon camera 8 cm above a dry threshold under an actual shallow overhang.

**Lyhyt kuvateksti (52):** Bergen: varastotalot saivat suojan, minä etsin oman.

**Pitkä kuvateksti (386):** Bryggenin vanhojen puutalojen väliset käytävät ovat kapeita, ja sade tekee niiden pinnoista oman karttansa. Kauppiaiden varastoissa toimii nyt myös pieniä liikkeitä ja työtiloja. Minä pysähdyin ulkoneman alle. Isoisä huomasi, että kala pidettiin kuivana ennen matkustajaa. Tämän kuvan perusteella kuiva paikka on edelleen arvokas löytö, vaikka siitä ei tarvitsisi tehdä maailmankauppaa.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. Within a REAL timber passage between Bryggen warehouses in Bergen, pigeon camera 8 cm above a dry threshold under an actual shallow overhang. Look along wet boards toward daylight and a small contemporary visitor folding an umbrella. Near wood grain and rain droplets, correct lean and timber supports, actual modest modern shop doorway. Match a documented passage, not a fairy-tale medieval street or canal. Soft rainy daylight, a readable dry-to-wet boundary, no fake snowfall or fish racks inserted into a current shop passage.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://en.visitbergen.com/things-to-do/bryggen-in-bergen-p878553)

### PuluCam / 2

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-bergen-2`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Bergen: ulkona satoi aivan samaa sadetta.

**Näkökulma:** Second Bergen frame, a brief pigeon flight 2 metres above the public harbour-side walkway OUTSIDE the SAME verified Bryggen passage, looking obliquely along the authentic row of coloured timber warehouse fronts.

**Lyhyt kuvateksti (41):** Bergen: ulkona satoi aivan samaa sadetta.

**Pitkä kuvateksti (396):** Käytävän suulta näkyy, kuinka Bryggenin talot seisovat sataman reunassa rinnakkain. Sisäpuolella löysin puun hajun ja suojan, ulkopuolella veden ja julkisivujen tutun rivin. Otin tämän toisen kuvan nopeasti. Se todistaa, että kävin myös ulkona, mikä on sateisena päivänä huomattavasti suurempi ansio kuin valmiista kuvasta voisi päätellä. Palasin saman tien puolen siivenmitan verran kuivemmalle.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. Second Bergen frame, a brief pigeon flight 2 metres above the public harbour-side walkway OUTSIDE the SAME verified Bryggen passage, looking obliquely along the authentic row of coloured timber warehouse fronts. Retain first frame's rain and soft light; the umbrella-carrying visitor may emerge from the correct passage entrance. Near wet quay surface and one real projecting roof edge dominate wide perspective; small boats only where current harbour references place them. Do not create fishing racks across the heritage façades, dry sunny conditions or a generic Norwegian fjord village. Not a high aerial view.

**Jatkuvuus:** Sama sadekuuro kuin kuvassa 1; lennosta näkyy aiemmin kuvattu oikea käytävän suu.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://en.visitbergen.com/things-to-do/bryggen-in-bergen-p878553)

---

## Kööpenhamina — kobenhavn

**Isoisän luettava teksti:** Kööpenhaminan Tivolissa näin vanhan pariskunnan tanssivan niin hitaasti, että orkesteri ehti edelle. He eivät lähteneet sen perään. Puistossa sytytettiin lamppuja, ja lampi sai oman tähtitaivaansa ennen oikeaa. Olin tullut katsomaan huvituksia. En arvannut, että paras niistä olisi kaksi ihmistä, joilla ei ollut enää tarvetta pysyä tahdissa.

**Pulun kaupunkirepliikki (lähtöteksti):** Tivoli huvittaa Kööpenhaminaa yhä. Minäkin pidän hitaista tanssijoista. Heidän pöytänsä ovat pitkään vapaina.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-kobenhavn-r20260909-paper-v4`

**Lyhyt kuvateksti (60):** Kööpenhamina, 1873. Orkesteri sai odottaa omassa tahdissaan.

**Pitkä kuvateksti (365):** Tivolin vanha pari liikkui vähän kerrallaan, niin että katsomiseen jäi aikaa. Puutarhan lamput syttyivät, ja niiden valo löysi lammesta toisen rivin. Pyysin heitä pysähtymään hetkeksi vedosta varten. Se ei näyttänyt muuttavan tanssia kovin paljon. Kaupungissa on paljon rakennettua huvitusta, mutta tähän riittivät kaksi kättä, tuttu askel ja haluttomuus kiirehtiä.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://www.tivoli.dk/en/about-tivoli/the-history-of-tivoli-gardens)

### PuluCam / 1

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-kobenhavn-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Kööpenhamina: tanssin ajaksi vapautui hyvä tarkkailupaikka.

**Näkökulma:** At a documented open café terrace beside Tivoli's real garden lake in Copenhagen, camera 10 cm above the terrace floor beneath a vacated table.

**Lyhyt kuvateksti (59):** Kööpenhamina: tanssin ajaksi vapautui hyvä tarkkailupaikka.

**Pitkä kuvateksti (359):** Tivolin puutarhassa musiikki saa osan ihmisistä nousemaan pöydästä ja osan jäämään kuuntelemaan. Minä valitsin jälkimmäisen tavan. Hitaasti liikkuva pari mahtui kuvaan pöydänjalkojen välistä, ja veden pinnassa syttyivät iltavalot. Isoisä piti kiireettömästä tanssista. Täytyy myöntää, että katsoin tällä kertaa itsekin hetken muualle kuin tyhjälle lautaselle.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. At a documented open café terrace beside Tivoli's real garden lake in Copenhagen, camera 10 cm above the terrace floor beneath a vacated table. Through actual chair legs, show two older adults quietly swaying together on a genuine open pedestrian patch while other visitors sit nearby. The intimate fictional dance is not a staged formal ballroom or a claimed scheduled event. Correct lake edge, planting, real building silhouettes and evening lamps from current Tivoli references. Near empty plate visible only at a plausible higher edge, not giant food. Soft twilight colour, kind human humour, no 1873 costume, invented pavilion or mandatory postcard landmarks.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.tivoli.dk/en/)

---

## Rovaniemi — lappi

**Isoisän luettava teksti:** Rovaniemellä Ounasjoki tuo vetensä Kemijokeen kuin matkustaja suurempaan veneeseen. Rannassa sidottiin kuormaa, ja kauppapuodissa puhuttiin yläjuoksun puista. Olin piirtänyt joet rajoiksi. Täällä ne olivat teitä. Veneeseen astuva nainen tiesi seuraavan talon savusta, ei kartasta. Lisäsin rannalle talon ja jätin savulle tilaa nousta.

**Pulun kaupunkirepliikki (lähtöteksti):** Rovaniemelle lennetään nyt joulupukin vuoksi. Joet kohtaavat yhä. Minusta niissäkin olisi matkan aihetta.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuva vastaa jokiliikenteen ja veneeseen astumisen aihetta. Kuvateksti ei väitä molempien jokien yhtymäkohdan näkyvän tässä rajauksessa.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-lappi-r20260909-paper-v4`

**Lyhyt kuvateksti (62):** Rovaniemi, 1873. Matkatavara sidottiin tien sijasta veneeseen.

**Pitkä kuvateksti (369):** Veneen kuorma sidottiin matalaksi, jotta se kulkisi vakaasti joella. Rannassa odottava nainen katseli seuraavaa matkaa yläjuoksun suuntaan. Ounasjoen ja Kemijoen seudulla veden ääreen asettunut talo on samalla reitin varrella. Kuvasin veneen ennen lähtöä ja jätin talon savun mukaan. Se kertoi käytössä olevasta paikasta, mitä pelkkä pieni neliö kartassa ei osaa sanoa.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://historia.rovaniemi.fi/historia/roieng24-27.pdf)
- [Lähde 2](https://www.finna.fi/Record/museovirasto.56B7F05404DF17550CEC4C1D3FD888DD)
- [Lähde 3](https://lapinkavijat.rovaniemi.fi/lapinportti/concorde.htm)

### PuluCam / 1

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-lappi-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Rovaniemi: jokien risteyksessä ei ole liikennevaloja.

**Näkökulma:** A low pigeon flight about 6–8 metres above a VERIFIED shoreline or small boat approach at the actual Ounasjoki–Kemijoki confluence in Rovaniemi.

**Lyhyt kuvateksti (53):** Rovaniemi: jokien risteyksessä ei ole liikennevaloja.

**Pitkä kuvateksti (389):** Ounasjoki liittyy Kemijokeen aivan Rovaniemen äärellä. Rannoilta nähtynä veden leveys on maisema; ilmasta sen suunnat alkavat muistuttaa reittejä. Lensin hetken veneen kulkusuunnan mukana ja kuvasin, missä virrat liittyvät. Isoisä piirsi joet ensin rajoiksi. Minä pidän hänen korjauksestaan. Kaupunkiin voi tulla lentäen ja huomata silti, että vesi ehti yhdistää paikat paljon aikaisemmin.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. A low pigeon flight about 6–8 metres above a VERIFIED shoreline or small boat approach at the actual Ounasjoki–Kemijoki confluence in Rovaniemi. Look obliquely across the true joining river channels, with one ordinary small boat providing scale and real wooded/city riverbanks behind. Use current aerial maps and a physically matching low-angle reference to choose which shore makes the confluence readable. Do not invent tropical water colours, mountain tundra, a Niagara-like junction or Santa imagery. Early-autumn northern daylight, near ripples and subdued banked motion, not a flat high-altitude map.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://www.visitrovaniemi.fi/professionals/media/rovaniemi-facts/)
- [Lähde 2](https://www.visitrovaniemi.fi/summer-by-the-river-in-rovaniemi/)

---

## Tromssa — tromssa

**Isoisän luettava teksti:** Tromssaan on perustettu museo. Satamasta tuodaan sinne pohjoisen luita ja kiviä, asioita joista laivanvarustaja ei tavallisesti maksa. Pöydällä makasi pieni simpukka ja sen vieressä luu, jonka eläimeen en toivo törmääväni uimassa. Ikkunasta näkyi pyyntilaivojen mastoja. Sama meri ruokkii täällä sekä vatsan että uteliaisuuden. Jälkimmäinen vaikutti pohjattomalta.

**Pulun kaupunkirepliikki (lähtöteksti):** Tromssassa on nyt yliopistokin. Isoisä osui oikeaan: pienestä simpukasta voi alkaa pitkä matka.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuva on varhaisen Tromssan museon huone, ei myöhempi Polaarimuseo. Pieni simpukka ja suuri luu ovat luennan mukaiset.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-tromssa-r20260909-paper-v4`

**Lyhyt kuvateksti (65):** Tromssa, 1873. Pieni simpukka ja suuri kysymys samassa huoneessa.

**Pitkä kuvateksti (396):** Museon pöydällä simpukka ja luu saivat paikan vierekkäin ilman, että suurempi olisi vienyt pienemmältä arvoa. Tromssan satamasta tuodaan näytteitä pohjoisen meriltä; osa tavarasta alkaa tuottaa kysymyksiä siinä missä muu lasti rahaa. Ikkunan mastot muistuttivat, ettei keräämiseen tarvita pelkkää kaappia vaan myös matka. Kuvasin pöydän sellaisenaan. Sen järjestys oli minusta hyvä alku museolle.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://en.uit.no/om/historie)
- [Lähde 2](https://uit.no/ressurs/uit/mediebok/Labyrint0412/Labyrint_2012-04_web.pdf)
- [Lähde 3](https://uit.no/tmu/samlinger/samling?p_document_id=667875)

### PuluCam / 1

**Toimi:** JO TILATTU — jatka nykyistä työtä, ei uusintaa

**PromptId:** `OHJAUS-01-tromssa-1`

**Promptin alkuperä:** `posti/matkakirja-pulucam-20260909-ohjaus-era1.md`

**Tarinallinen havainto:** Isoisän simpukka käynnistää uteliaisuuden. Pulu löytää laiturilta tyhjän kuoren ja kohtelee sitä pienenä arvoituksena. Kaupunki saa näkyä tutkimisen ympäristönä, ei pelkkänä taustakulissina.

**Näkökulma:** Polaarimuseon laiturilla muutama sentti lankkujen yläpuolella. Tyhjä sinisimpukan kuori lähellä, aito museorakennus ja satama kauempana.

**Lyhyt kuvateksti (59):** Tromssa: yksi simpukankuori ja koko meri täynnä kysymyksiä.

**Pitkä kuvateksti (400):** Tromssan Polaarimuseo toimii vanhoissa tullirakennuksissa meren äärellä. Se kertoo pyynnistä, retkikunnista ja arjesta pohjoisessa. Museon laituri on rakennettu uudelleen vanhojen valokuvien avulla. Laudalle jäänyt simpukankuori ei kuulu näyttelyyn, mutta pysäytti minut silti. Isoisäkin huomasi, että pienestä esineestä voi alkaa suuri uteliaisuus. Minä aloitin tarkistamalla, oliko asunto jo vapaa.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. Place the camera only a few centimetres above the wooden boards of the real Polar Museum pier at Skansen in Tromso, using the museum's current pier and building reference photographs. A small empty blue-mussel shell rests naturally near the lens, its curved interior catching cool northern light; perspective makes it look like a tiny abandoned boat without altering its realistic shape or scale. Beyond it, the pier leads into the correctly oriented historic Customs waterfront buildings now used by the Polar Museum, with a little harbour water and present-day life visible. The shell is tack-readable, the museum still recognisable, with credible optical depth rather than a pasted sharp foreground and blurred background. Clear cool summer daylight with a restrained warm highlight on the old wood. This is an inquisitive pigeon noticing a small mystery, not a wildlife portrait, a food advertisement or a macro photograph with no location. No pigeon in the frame, no fictional new museum architecture, no polar bear props or snow in summer.

**Paikkatarkistus:** Nykyinen Polaarimuseon laituri Skansenissa, UiT:n rakennussivu kuvaa laiturin paikan suhteessa varastoon. Ei väitettä, että tämä olisi isoisän vuonna 1873 mainitsema museorakennus: Polaarimuseo tuli tiloihin myöhemmin. Kuori on kohtauksen keksitty arkinen löytö.

**Lähteet:**

- [Lähde 1](https://en.uit.no/tavla/artikkel?p_document_id=804921)
- [Lähde 2](https://www.visittromso.no/polar-museum)
- [Lähde 3](https://en.uit.no/om/historie)

---

## Islanti — islanti

**Isoisän luettava teksti:** Reykjavikin ulkopuolella naiset pesivät pyykkiä kuumassa lähteessä. Höyry nousi maasta, ja tuuli yritti viedä sen merelle. Annoin pestäväksi paitani. Se oli ensimmäinen kerta, kun maa teki minulle palveluksen vaatimatta lapioimista. Paluumatkalla näin pienet talot ja niiden takana suuren tyhjyyden. Kaulukseni oli puhtaampi kuin käsitykseni tästä saaresta.

**Pulun kaupunkirepliikki (lähtöteksti):** Reykjavikin talotkin lämpiävät nyt maan lämmöllä. Paita oli lupaava alku. Minä arvostan lämmintä räystästä.

### Isoisän kuva / 1

**Päätös:** SÄILYTÄ nykyinen pääkuva

**Perustelu:** Kuvassa näkyy tekstin keskeinen paikka ja tilanne. Uusintaa ei tarvita.

**Nykyinen tarkistettu kuva:** `matkakirja-eurooppa-1873-islanti-r20260909-paper-v4`

**Lyhyt kuvateksti (47):** Reykjavik, 1873. Pyykkipäivä sai lämmön maasta.

**Pitkä kuvateksti (405):** Naiset pitivät pyykin, saippuan ja oman työnsä järjestyksessä samalla kun maa lämmitti veden. Lähteen höyry liikkui tuulen mukana niin, että osa maisemasta katosi hetkeksi näkyvistä. Reykjavikin pienet talot jäivät kauemmas, ja pesupaikka näytti tavalliselta osalta niiden arkea. Asetin kameran sivuun roiskeista. Minulle tämä oli ihme; kuvassa oleville naisille se oli tehtävä, joka piti saada valmiiksi.

**Pitkän viimeinen linkki:** Havainnekuva → pelin olemassa oleva havainnekuvaselitys. Lyhyeen ei linkkiä.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://borgarsogusafn.is/en/exhibitions/the-washerwomen-s-walk-a-stroll-into-history)

### PuluCam / 1

**Toimi:** UUSI KUVA — tuotantoon tällä promptilla

**PromptId:** `OHJAUS-EU-V1-islanti-1`

**Promptin alkuperä:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`

**Tarinallinen havainto:** Reykjavik: lämmin vesi on saanut ympärilleen kokonaisen arjen.

**Näkökulma:** At a genuine PUBLIC exterior viewpoint beside Reykjavík's Laugardalslaug in Laugardalur, pigeon lens 10 cm above a real fence or ledge, looking toward a documented outdoor heated pool and a small amount of steam in cool air.

**Lyhyt kuvateksti (62):** Reykjavik: lämmin vesi on saanut ympärilleen kokonaisen arjen.

**Pitkä kuvateksti (401):** Laugardalurissa kuumia lähteitä käytettiin ennen pyykinpesuun. Nyt laaksossa on myös suuri geotermisesti lämmitetty uimala, ja kaupungin talot saavat lämpönsä samasta maanalaisesta voimasta. Asetuin altaan ulkopuoliselle aidalle katsomaan höyryä. Isoisän paita oli tämän tarinan pieni alku. Minä pidän kehityksen suunnasta: ihmiset ovat löytäneet syyn istua ulkona silloinkin, kun ilma ei sitä ehdota.

**Valmis kuvakohtainen generointiprompti:**

Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. At a genuine PUBLIC exterior viewpoint beside Reykjavík's Laugardalslaug in Laugardalur, pigeon lens 10 cm above a real fence or ledge, looking toward a documented outdoor heated pool and a small amount of steam in cool air. Use actual current pool layout and visible buildings; ordinary adult swimmers at a respectful distant scale in standard swimwear, no changing rooms. Near fence material and far low city skyline establish the bird's perch. Do not invent a smoking rooftop or visible pipes that do not exist; do not place the historic washing spring in the modern swimming pool. Natural cool daylight with restrained warm water reflections, no aurora in daytime.

**Paikkatarkistus:** Kuvatuotanto valitsee lähteistä todelliseen kuvauskohtaan osuvan nykyreferenssin ja varmistaa näkölinjat. Tekstin puuttuvaa rakennetta ei saa keksiä. Jos paikka ei mahdollista tätä sommittelua, ilmoita ristiriita ennen generointia; älä korvaa paikkaa toisella omin päin.

**Lähteet:**

- [Lähde 1](https://visitreykjavik.is/laugardalur-valley)
- [Lähde 2](https://www.icelandtravel.is/attractions/laugardalur-2-2/)

---


