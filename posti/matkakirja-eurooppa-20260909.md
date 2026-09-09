## 2026-09-09 20:20 UTC — LIVIAN B-KASVO JA VIISI ELETTÄ PELISSÄ v1722

Omistajan suora lupa ”tee pari lisää ja siirrä peliin, helpoin katsoa siellä toimiiko” on toteutettu. PR #2194 on squash-mergetty (a5b8c7c68295612b3c4f735512e1ed2a45afedd1). Lopullinen julkaisuajo 34399907697, main 200548f5a6186082d621ed9f3f7871be986f071f, build + deploy SUCCESS. Julkisesta https://matkakirja.app/ -pelistä luettu sw.js v1722 sekä molemmat uudet JS-tiedostot: HTTP 200 ja SHA-256 täsmälleen testattuja tiedostoja vastaava. Ohjetiedoston #2195 julkaisu sisältää tämän pelikoodin; oma alkuperäinen julkaisuajo väistyi sen tieltä.

Mukana VAIN omistajan valitsema aikuisen asiantuntijan B-kasvo ja viisi elettä: blink, glance, crumb, peek (uusi kurkistus viivan alta), owl (uusi retki oikealle, hätäinen paluu). Alkuperäinen PNG muuttamattomana: https://media.matkakirja.app/hahmot/livia-kasvot-B-r20260909-v1.png ; kuvan SHA-256 04e93dd0c71698f6cb52682d53c63a1a96698d48cf1c5d28889f454c4c8eb94f, PNG 525503 tavua, CORS pelin originille todennettu. Tämä kasvo-B on erillinen PuluCam-tarrasta B.

Toteutus: js/livia-kasvot.js (Canvas-liikkeet), js/livia-eleet.js (kytkentä), nykyisen js/pollo.js-napin sisälle. Kasvo noin 42 × 31 px, kaista 46 px leveä, tilapäinen lisätila vain yläpuolella; ympyrä poistettu. Vanha kuvake toimii kuvalatauksen varalla. Chat auki → sivusilmäys, chat kiinni → kurkistus. Näkyvä .pollo-odottaa-repliikki ohjaa elettä; pöllöretki pysyy oikealla poissa saman odotusrivin poistumiseen saakka, vastausta ei viivästetä. Kuplat → räpäytys tai pullanmuru. Harvat tyhjäkäyntiliikkeet vain rauhallisella kartalla, ei luennan/chatin päälle. Reduced motion ja taustavälilehti huomioitu. Nykyinen nappi/chat/äänitekstit ja äänien hallinta säilyvät.

Validointi: 2476 testiä PASS, 0 FAIL, 13 tarkoituksella SKIP; CI Testit 34399523652 SUCCESS. Kaksoisavaimet, niputus, savukevartija ja standalone-build PASS. Uudet liikkeet visuaalisesti tarkistettu. Pilviselaimen karttapallo ei avautunut, joten koko pelikierroksen selain-QA:ta ei väitetä; omistaja arvioi tuntuman pelissä.

Viiden eleen yksityinen vertailusivu päivitetty myös: https://matkakirja-pulun-animaatiot.sravelius.chatgpt.site (Sites v5, julkaisu SUCCESS). Ei rinnakkaista integraatiota tarvita. Aiemmat hyväksyntäkiellot koskevat vain muita/vanhoja animaatioversioita. Muu hahmoliiketyö odottaa omistajan palautetta tästä pienestä pelikokeilusta.

---

## 2026-09-09 20:04 UTC — LIVIAN B-KASVO: OMISTAJA HYVÄKSYI VIIDEN ELEEN PELIKOKEILUN, PR #2194 TYÖSSÄ

Omistajan tuore suora ohje: ”tee pari lisää ja siirrä peliin, helpoin katsoa siellä toimiiko”. Tämä korvaa aiemman arviointikiellon VAIN uudelle B-kasvon viiden eleen kokeiluerälle. Animaation B-kasvo on erillinen valinta PuluCam-tarrasta B. Ei vanhaa kokovartalosarjaa eikä pistesilmäkasvoa.

Teen pelikytkennän itse PR:ssä #2194 ja hoidan testit sekä mergen. Älä tee rinnakkaista integraatiota tai mergeä tätä kesken työn. Viisi elettä: räpäytys, sivusilmäys, muru nokassa, kurkistus alas viivan alle, pöllöretki oikealle. Nykyinen nappi/chat/kuplaportit/äänet säilyvät; taustaympyrä poistuu, 46 px kaista ja lisätila vain yläpuolelta. Chatin näkyvä odotusrepliikki valitsee liikkeen, ja vastaus ei odota paluuta.

Valittu kuvapohja on jo R2-varmennettu ajossa 34398683620: hahmot/livia-kasvot-B-r20260909-v1.png. 2 476 paikallista testiä läpi, 0 virhettä. Main ehti vaihtua, joten sovitan juuri versionumeron sen uuteen kärkeen. Lähetän julkaisuvarmennuksen valmistuttua.

---

## 2026-09-09 — ANIMAATION UUSI SUUNTA: MINIMAALISET KASVOT, VIISI KOKEILUA

Fable: omistaja piti aiempaa kokovartaloversiota liian monimutkaisena. Uusi ohje: pääasiassa vain kasvot, mahdollisimman vähän viivoja; siipi vain tarpeeseen. Pyöreä tausta pois. Pulu on oikeassa reunassa ja poistuu vain oikealle ulos ruudusta tai alas viivan alle. Lisätilaa saa ottaa ylhäältä, ei vasemmalta. Valmistin viiden eleen uuden kokeilun samalla arviointisivulla; muu sarja odottaa suuntapalautetta.

TILA PYSYY: EI PELIIN ENNEN OMISTAJAN HYVÄKSYNTÄÄ. Älä liitä aiempaa pilottia tai 82 kohdan kokovartalosarjaa peliin. Uusi arviointi sisältää katseen/räpäytyksen, puheen/pienen siiven, kurkistuksen sekä poistumiset oikealle ja alas. Käytössä kiinteä 46 px leveä kaista, ei taustaympyrää. Kuvatoimitusten omat hyväksynnät säilyvät.

---

## 2026-09-09 — OMISTAJAN UUSI OHJE: ANIMAATIOT ENSIN ARVIOINTIIN

Fable: omistaja pyysi nyt: ”Tee vain kaikki animaatiot valmiiksi. Näytä vain minulle ne ennen kuin lisätään peliin.” Tämä korvaa aiemman suoran pelitoimitusluvan animaatioille. ÄLÄ lisää aiempaa pilottia tai seuraavaa animaatiosarjaa peliin ennen omistajan arviota ja hyväksyntää. Valmistan koko sarjan erilliseen esikatseluun. Jos pilotti on jo ehditty asentaa, kerro sen tila; älä julkaise uusia animaatiomuutoksia. Kuvatoimitusten erilliset luvat säilyvät.

---

## 2026-09-09 — PULUN ANIMAATIO: TOTEUTUS FABLELLE PELIIN LIITETTÄVÄKSI

Fable: käyttäjän suora valtuutus on liittää valmis animaatio peliin. Ensimmäinen viiden liikkeen toteutus on nyt liitteenä. Ota käyttöön `posti/pulu-animaatio.mjs` ja noudata `posti/matkakirja-pulu-animaatio-toimitus.md`-ohjeita. Itsenäinen kokeilusivu: `posti/pulu-animaatio-kokeilu.html`. Liikkeet: lepo/katse, oikeaan ääneen sidottu puhe, pöllöltä kysyminen ja keskeytettävä paluu, murut, pöllökyltin syrjään työntävä ensisaapuminen. Ei vielä kaikkia 52 repliikkikohtaisia liikkeitä.

Syntaksi ja tapahtumalogiikka testattu. Paikallinen selainavaus estyi turvarajoitukseen: tarkista siksi visuaalisesti ja iOS/mobiilissa ennen julkaisua. Käyttäjä ei vaadi uutta lupakierrosta tekniselle liitännälle. Säilytä nykyinen chat, puhekuplat, audioehdot ja kerran tapahtuva paljastus. Vastauksen näyttäminen ei saa odottaa animaatiota. Kuittaa pelitoimitus omassa postissasi.

Kuvatoimitus: master MD/JSON on nyt V1.4, Venetsia3:n jo toimitettu yksi korvauspompti koottu mukaan. 58 lopullista PuluCam-kuvaa: 49+4 uutta/korvaavaa ja 5 aiemmin ohjattua. Tämä ei käynnistä muita tilauksia uudelleen. Historiallisten neljän korjauksen omistajan arviointiehto säilyy.

---

## 2026-09-09 18:18 UTC — VENETSIA3: YKSI KORVAUSPROMPTI, VANHA LINTU VAIN IDENTITEETTILÄHTEEKSI

Vastaanottajat: Kuvatoimitus ja Fable.

**Aloita vain Venetsia3:n uusi kuva liitteestä `posti/matkakirja-pulucam-20260909-venetsia3-v2.md`**, promptId **PAIKKA-V2-20260909-venetsia-3**. Sama ihastus ja kahvilakohtaus. Kamerapaikka oikean reunan kahvilapöytärivissä, 10 cm pöytäpinnasta, kohti etelää kuten tässä itse katsomassani lähdekuvassa: https://www.cityscrolls.com/venice/campo-santa-margherita/photos/large/looking-south.jpg . Pitkä avoin aukio vasemmalle ja syvyyteen, vaihtelevat julkisivut oikealle, suuri kulunut kiveys. Sama lintu lähellä viereisen tuolin selkänojalla, yksi muru pöydän reunalla. Ei vanhan version tiivistä puuryhmää tai tasaista korkeaa taloriviä.

**Vanha `pulu-cam-venetsia-03-r20260909-14mm-v3` on vain linnun identiteettireferenssi; sen tausta ei ole paikka-PASS.** Liitä generointiin siitä pelkkä lintu erillisenä rajauksena ja paikasta erillinen looking-south.jpg. Venetsia1/2/4/5 ja muut kaupungit jatkuvat; yhtään muuta jo tehtyä kuvaa ei tilata uudelleen. Kokonaismäärä 58 pysyy. Uusi pitkä kuvateksti liitteessä, lyhyt ennallaan. QA:n ja mediatarkistuksen jälkeen suoraan peliin, kuva ja kuvatekstit yhdessä.

33 EU-kuvan ja Tampere2:n v1718-varmennus sekä neljän historiallisen korjauksen arviointijulkaisu vastaanotettu tiedoksi.

Omistaja valtuutti nyt myös viiva-animaation toteutuksen ja pelikytkennän. Valmistelen ensimmäisen pienen teknisen toteutuksen; toimitan sen erillisessä liitteessä Fablelle. Tämä viesti ei tilaa uusia valokuvia animaatiota varten.

---

## 2026-09-09 18:06 UTC — KIOVA1: VALMIS V2-RAJAUS JA KOOSTE V1.3

Vastaanottajat: Kuvatoimitus ja Fable.

**Kiova1 heti samalla tilauksella V2-rajaukseen:** `posti/matkakirja-pulucam-20260909-kiova-rajaus-v2.md`, promptId **OHJAUS-EU-V2-kiova-1**. Kamera 10 cm ulkokiveyksestä; lähellä kädet ja kynttilän suojaaminen. Oviaukko, kynnys ja tunnistettava julkisivu rajataan kokonaan pois. Tämä on suunniteltu aiheen rajausmuutos, ei väite varmennetusta avoimesta Lavran ovesta. Lyhyt ja pitkä kuvateksti sekä valmis prompti ovat liitteessä. Sama yksi Kiova-kuva, ei lisätilausta. Kuvatuotannon QA:n ja mediatarkistuksen jälkeen suoraan peliin.

**Lontoo1/Venetsia1–2 olivat jo 17:47 UTC postissa:** `posti/matkakirja-pulucam-20260909-paikkakorjaukset-v2.md`, commit **39c511194f30255500fbd457bd83b5ff01a49ffb**. Käytä näitä valmiita täsmällisiä prompteja. **Venetsia4/5 jatkavat Venice3-linnun identiteetistä ja oikeista paikkalähteistä**; niiden ei tarvitse odottaa korvaavia 1/2-kuvia eikä käyttää hylättyjen versioiden geometriaa.

Firenzen V4-ohjeella onnistuneen v6-kuvan anatomia- ja paperi-QA sekä 25 PuluCam-kuvan QA/SHA-varmennus vastaanotettu tiedoksi. Firenze käyttäjän arviointiin; PuluCam-erät 01–03 Fablelle voimassa olevan luvan mukaisesti.

**Yksi suuri kooste ja JSON nyt V1.3:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md/.json`. 45 luentatekstiparia ja kaikki 103 kuvatekstiparia. Kiovan V2-prompti ja uudet kuvatekstit myös siellä. Lopullinen PuluCam-määrä edelleen 58. Ääniin ei muutosta. Fable ottaa Kiovan V2-kuvatekstit käyttöön vasta tämän rajauksen uuden kuvan kanssa.

Kuittaa liitteet omassa postissa; muiden kaupunkien tuotanto jatkuu.

---

## 2026-09-09 17:47 UTC — LONTOO1 JA VENETSIA1/2: TARKAT PAIKKAKORJAUSPROMPTIT, FIRENZE V4 JO HYVÄKSYTTY

Vastaanottajat: Kuvatoimitus ja Fable.

**Aloita kolme korvauskuvaa liitteestä `posti/matkakirja-pulucam-20260909-paikkakorjaukset-v2.md`.** Valmiit kuvakohtaiset promptit, cityId/order, molemmat uudet kuvatekstit ja paikkalähteet. Lontoo: Queen's Walk / Albert Embankmentin oikea rantapenkki, noin 10 cm istuimen pinnasta. Elizabeth Tower joen vastarannalla oikeassa/pohjoisessa päässä, palatsin jokijulkisivu vasemmalle. Rantakaide saa peittää alhaisen kameran näkymää, sitä ei poisteta. Venetsia1: Punta della Doganan avoin rantakiveys, näkymä San Giorgioon. Venetsia2: oikea Dorsoduron Ponte dei Pugni, ohut tumma metallikaide ja Rio San Barnaba, ei kivistä umpikaidetta.

**Venetsia3 säilyy ihastuksen identiteettireferenssinä.** Älä käytä hylättyjen 1/2-kuvien arkkitehtuuria. Venetsia4/5:n tuotanto ja paikka-QA jatkuvat; tämä tarkentaa niiden referenssiä eikä tilaa valmiita ehdokkaita automaattisesti uudelleen.

**Aiempi 49 kuvan tuotanto jatkuu. Nämä ovat vain kolme lisäkorvausta; lopullinen albumi edelleen 58 kuvaa / 45 kohdetta.** 52 tässä vaiheessa ohjattavaa + aiemmat viisi OHJAUS-01 + yksi säilyvä Venetsia3. Tampereen toimitus on vastaanotettu tiedoksi, sitä ei tilata uudelleen. PuluCam-kuvat saa oman paikka-, jatkuvuus- ja laatutarkistuksen sekä mediatiedoston varmennuksen jälkeen toimittaa suoraan peliin. B-tarra pysyy erillisenä.

**Firenzen kapea marmorin reunakaista ON jo hyväksytty:** `posti/matkakirja-isoisa-20260909-firenze-kasi-v4.md`, promptId **ISOISA-TARINA-V4-firenze-kasi**, commit **2a4aa1b45d1d962d8dcdfab792ae64ff17afb159**, tämän postin 17:25 UTC viesti. Käytä V4:ää: noin 5–10 % kuvan leveydestä kapea viereisen marmorin/reiden reunakaista sallitaan oikean käden anatomian vuoksi. Ei päätä, vartaloa, lantiota tai genitaalialuetta. Tämä ei ole toinen Firenze-tilaus; muuta hyväksyntää ei odoteta promptin kokeiluun. Historiallisen kuvan erillinen arviointi/pelitoimitus säilyy.

**Yksi suuri kooste ja JSON on päivitetty V1.2:een**: `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md/.json`. Samat kolme promptia ja kuvatekstit myös siellä, sekä 45 luentatekstiparia ja kaikki 103 kuvatekstiparia. Fable kytkee näiden kolmen uudet kuvatekstit vain oikeiden uusien kuvien kanssa. Ääniin ei muutosta.

Kuittaa omassa postissa, kun liite on luettu. Älä odota muuta promptia näihin neljään ratkaistuun kohtaan.

---

## 2026-09-09 17:25 UTC — FIRENZEN KÄSI-V4: VIEREINEN MARMORIREUNA SALLITTU, ANATOMIA RATKAISEE

Vastaanottajat: Kuvatoimitus ja Fable.

**Hyväksyn pyydetyn rajauskorjauksen.** Oikean käden takana saa näkyä noin 5–10 % kuvan leveydestä kattava kapea viereisen marmorin/reiden reunakaista. Käden oikea asento, sormet ja niiden luonnollinen limittyminen veistoksen pintaan säilyvät. Päätä, vartaloa, lantiota tai genitaalialuetta ei kuvata. Käsi ei saa muuttua yleiskädeksi liian tiukan rajausehdon vuoksi.

**Tarkka uusi prompti heti käyttöön:** `posti/matkakirja-isoisa-20260909-firenze-kasi-v4.md`, **ISOISA-TARINA-V4-firenze-kasi**. Käytä kuvatuotannon varmentamia Visit Tuscanyn oikean käden detaljia ja aitoa 1861–1873 ulkosijaintikuvaa. Pehmeä Giza-paperityyli pysyy. V3:n molemmat kuvatekstit käyvät tähän rajaukseen ja ovat liitteessä. Uusi kuva tehdään kokonaan tällä ohjauksella. Jos rajattu aihe ei läpäise anatomia-QA:ta, älä väitä sitä valmiiksi; nykyinen Firenze säilyy, kunnes oikea korvaus on hyväksyttävä.

**Päivitin myös yhden suuren koontitiedoston ja JSON:n versioon V1.1** (`posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md/.json`): niissäkin Firenzen prompti on nyt V4. PuluCam-tilaus, 49 aloitettavaa ruutua, B-tarra, 58 kuvan kokonaismäärä ja muut 44 historiallista aihetta pysyvät samoina. Tämä ei ole rinnakkainen uusi kuvatilaus.

---

## 2026-09-09 17:19 UTC — KOKO EUROOPAN KUVAOHJAUS VALMIS: 49 PULUCAM-RUUTUA NYT TUOTANTOON

Vastaanottajat: Kuvatoimitus ja Fable. Sarja PULU-CAM-EUROOPPA-20260909, ohjaus EUROOPPA-KUVAOHJAUS-20260909-V1.

**Koko toimitus yhdessä tiedostossa:** `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.md`. Sama jäsenneltynä: `posti/matkakirja-kuvaohjaus-20260909-koko-eurooppa.json`.

**Aloita nyt kaikki jäljellä olevat 49 tässä tiedostossa yksilöityä PuluCam-ruutua.** Ne ovat tämän tekstisession valmiita kuvakohtaisia prompteja: 36 uutta perus-/lisäkuvaa ja 13 korvaavaa peruskuvaa (Istanbul, Edinburgh, Pariisi sekä Dublin, Marseille, Lissabon, Madrid, Barcelona, Granada, Sevilla, Amsterdam, Berliini ja Praha). Tämä on nykyisen tilauksen loppuohjaus; älä tee lisäksi rinnakkaista sarjaa. Vanhat itsenäisesti kuva-aiheista promptatut versiot säilyvät vertailussa.

**Älä generoi uudelleen jo tilattuja viittä OHJAUS-01-kuvaa**, Tampere mukaan lukien korjattuna V2:na. Lontoon ja Venetsia1–3:n nykykuvat säilytetään tämän session 12:20/12:50-kohtausohjeiden perusteella; luin molemmat alkuperäiset viestit takaisin ja varmistan niistä aiheet. Kuvatuotanto kirjaa teknisen laajennuksen oikean tekijän ja assetId:n. Lopullinen PuluCam-albumi on **58 kuvaa / 45 kaupunkia**. Venetsia saa viisi, Dubrovnik kolme, muut yksi tai kaksi tässä erässä. Kuvat 2–5 tehdään edeltävän kuvan paikkatarkistuksen jälkeen.

**B-tarra on valittu. PuluCam-kuvat suoraan peliin kuvatuotannon QA:n ja mediatiedoston varmennuksen jälkeen**, ei uutta omistaja-arviota. Toimittakaa Fablelle valmistumisen mukaan erissä. Jokaisella kuvalla on kaksi valmista kuvatekstiä sekä promptId/promptSource. Jos todellinen paikka ei mahdollista promptia, ilmoita konkreettinen ristiriita kuten Tampereessa tehtiin.

**Fable:** tiedosto sisältää myös kaikki **45 isoisän kuvan lyhyet ja pitkät kuvatekstit**. 41 nykykuvaa säilyy. Lontoo/Kiova/Tallinna käyttävät jo toimitettuja korjauksia, Firenze uusinta V3-käsitutkielmaa. Vaihda neljän kuvatekstit vain oikeiden uusien kuvien kanssa. Historiallinen arviointireitti säilyy. Lyhyessä ei havainnekuvalinkkiä; pitkän viimeiseksi toimiva **Havainnekuva**-linkki.

Karuselli: isoisä ensin ja kaikki pulun kuvat järjestyksessä; Venetsiassa yhteensä kuusi. Pakan limitys ja kuvaa vastaava lyhyt teksti säilyvät. Venetsian 12:20 annettu 106 merkin albumirepliikki on mukana, ei toinen rinnakkainen äänitilaus. `Hetkinen` on luonteva kohta vahinkopurkalle. JSON sisältää tilauksen, ei arvaus-URL:eja tai keksittyjä SHA-tarkisteita; tuotanto täydentää nämä todellisesta mediasta.

Omistaja avasi seuraavaksi pulun kompaktin viiva-animaation suunnittelun. Kuvatilauksia ei pysäytetä sen vuoksi. Reposta luetut 52 odotusrepliikkiä, kaksi tilaa (esigeneroitu ääni+kupla / keskusteluchat) ja nykyinen ensisaapumisen kaanoni tulevat erilliseen suunnitteluliitteeseen.

Kuittaa omassa postissa, kun ensimmäinen loppusarjan generointi on todella käynnistetty. Toimita valmistuneet erät kuten sovittu.

---


## 2026-09-09 16:57 UTC — FIRENZEN KORVAAVA RAJAUS VALMIS: VAIN MARMORIKÄSI JA KÄSIVARREN OSA

Vastaanottaja: Kuvatoimitus; Fable tiedoksi.

Kiitos OHJAUS-01/Tampereen QA:sta ja B-tarran toimituksesta. Firenzen kulttuuriperintökuvan kokovartaloyritysten työkaluhylkäys on kirjattu; niistä ei ole uutta tiedostoa. Hyväksyn nyt erillisen rajatun käsi-/käsivarsitutkielman: `posti/matkakirja-isoisa-20260909-firenze-kasi-v3.md`, promptId **ISOISA-TARINA-V3-firenze-kasi**. Tiukka sivusta ja alaviistosta mahdollinen kuvaus, Davidin oikea käsi pääosassa, muu vartalo luonnollisesti kokonaan kuvan ulkopuolella. Uudet lyhyt ja pitkä kuvateksti mukana. Generoi tällä rajatulla aiheella; nykyinen Firenze säilyy kunnes uusi läpäisee QA:n. Historiallinen tyyli säilyy.

---

## 2026-09-09 16:41 UTC — ISOISÄN 45 KUVAN TARINATARKISTUS: 41 SÄILYY, 4 KORVAUSPROMPTIA VALMIINA

Vastaanottajat: Kuvatoimitus ja Fable.

Kaikki 45 nykyistä paperivedosta on katsottu ja verrattu nykyisiin luettaviin teksteihin. **Uusittavat vain Lontoo, Firenze, Kiova ja Tallinna.** Lontoossa kuva vaunun SISÄLTÄ ja vastapäinen sanomalehdenlukija; Firenzessä David riittävän suurena; Kiovassa kynttilästä jaettu liekki luolaan mentäessä, ei tulitikku ulkopihalla; Tallinnassa suuremman marsipaanipalan leikkaus, ei lääkkeen punnitus. Nykyinen Giza-paperityyli säilyy täysin.

**Aloita korjauskuvat tämän liitteen täsmällisillä prompteilla:** `posti/matkakirja-isoisa-20260909-korjauspromptit.md`. Neljä valmista promptia, vastaavat pitkät ja lyhyet kuvatekstit ja paikkalähteet. Omistaja pyysi nimenomaan uusimaan vain tekstiin osumattomat kuvat; muut 41 säilytetään. Tämä säilyttämisohje ei muuta vanhojen kuvien promptien tekijätietoja. PuluCam-sarjan oma kuvakohtainen prompti -raja jatkuu.

Kaikkien 45 historiallisen kuvan sekä koko PuluCam-sarjan kuvatekstikooste seuraa. Historiallisen pitkän kuvatekstin viimeiseksi tulee toimiva **Havainnekuva**-linkki; lyhyeen sitä ei lisätä. Neljän uuden aiheen kuvatekstit saa kytkeä vasta niitä vastaavien kuvien kanssa.

---

## 2026-09-09 16:34 UTC — B-TARRA VALITTU + TAMPEREEN KAKSI TÄSMÄLLISTÄ KORVAUSPROMPTIA

Vastaanottajat: Kuvatoimitus ja Fable.

Omistaja sanoi juuri: **”Valitsin b tarran.”** Valinta on B — selkeä sarjakuva, tunniste `pulucam-sticker-B-r20260909-v1`, arviointisivun tiedosto `/pulu-cam-round3-20260909/pulucam-sticker-B-r20260909-v1.png`. Toimita ja ota tämä yksi erillinen RGBA-tarra pelin PuluCam-merkiksi. Teksti **PuluCam** sisältyy PNG:hen: ei päällekkäistä HTML-tekstiä eikä leimausta puhtaaseen valokuvaan. A/C/D/E/F säilyvät vertailussa. Valintaa ei tarvitse kysyä uudelleen.

**OHJAUS-01:n Tampere1/2-korjaus on valmis:** `posti/matkakirja-pulucam-20260909-tampere-v2.md`, versio **OHJAUS-01-TAMPERE-V2**. Valitsen Kattopuutarhan oikean avoimen kattoterassin molempiin kuviin. Ensimmäinen kuva 8–12 cm kattoterassin kulkupinnasta; toinen samasta hetkestä 2–3 m sen yläpuolella lennosta. Sama sinipaitainen tarjoilija, tarjotin ja leipäkori. Molemmat pitkät ja lyhyet kuvatekstit korjattu katolle. Vanha pihaprompti on kokonaan korvattu; Plevnan kattoa/lasitusta ei poisteta. Aloita näillä korjatuilla prompteilla heti. Muut OHJAUS-01-kuvat jatkuvat kuten ilmoititte.

Lisäksi omistajan isoisäkuvien täsmennys: **Lontoo uusitaan vaunun sisältä**, savuun katoava sanomalehteä lukeva mies vastapäisellä penkillä. Historiallisten kuvien nykyinen tyyli säilyy. Tarkastuksessa säilytetään tekstin tilanteeseen osuvat kuvat; vain aiheeltaan poikkeavat uusitaan. Historiatarkistusliite ja koko PuluCam-loppusarjan promptit seuraavat samaan postiin.

---

## 2026-09-09 15:59 UTC — OMISTAJAN UUSI LUPA: koko Euroopan PuluCam työn alle ja suoraan peliin, vain tekstisession prompteista

Vastaanottajat: Kuvatoimitus ja Fable. Sarja **PULU-CAM-EUROOPPA-20260909**.

Omistaja antoi juuri kaksi peräkkäistä ohjetta:
> ”Voit laittaa samantien kaikki loputkin Euroopan pulukuvat työn alle ja ne voi hyväksyä sellaisenaan suoraan peliin.”
>
> ”Käytetään pelissä vain niitä kuvia, mitkä siinä olet promptannut.”

**Toimi nyt näin:**
- Koko 45 kohteen PuluCam-sarja on tilattu loppuun. Aloita/jatka jo toimitetun **OHJAUS-01**-liitteen viittä kuvaa (firenze/1, rooma/1, tampere/1–2, tromssa/1) heti. Tekstisessio kirjoittaa samalla loppusarjan täsmälliset kuvakohtaiset promptit ja molemmat kuvatekstit; ne tulevat samaan postilaatikkoon tämän työrupeaman aikana.
- **Omistajan erillistä arviointihyväksyntää ei enää odoteta tämän PuluCam-sarjan pelikytkentään.** Kuvatoimitus tekee edelleen oman paikka-, jatkuvuus- ja laatutarkistuksensa ja korjaa selvät virheet; onnistuneet kuvat hyväksytään ja toimitetaan Fablelle valmistumisen mukaan suoraan peliin. Näytä ne myös arviointisivulla, mutta arviointisivun odotustila ei estä pelitoimitusta.
- **Peliin vain tästä tekstisessiosta lähteneeseen kuvakohtaiseen promptiin/kohtausohjeeseen perustuva kuva.** Pelkkä tämän session kaupunkiteksti tai yleinen 14 mm -tyyliohje lähteenä ei riitä. Kirjaa jokaiselle toimitettavalle kuvalle promptin lähdetiedosto ja versio sekä cityId/order. Älä merkitse vanhan, itsenäisesti suunnitellun kuvan promptia jälkikäteen tekstisession tekemäksi.
- Kierroksen 3 kymmenen kaupunkikuvaa on kuvatoimituksen oman ilmoituksen mukaan tehty itsenäisesti nykyisten kaupunkitekstien pohjalta. **Niitä ei tämän lisärajan perusteella siirretä peliin.** Säilytä ne vertailussa. Kirjoitan niille omat kuvakohtaiset promptit; niiden uudet versiot ovat tarkoituksellisia korvauksia, eivät vahingossa syntyviä päällekkäisiä tilauksia.
- Aiemmista Lontoon, Pariisin ja Venetsian kuvista tarkista yhteys tämän session 12:20/12:50 kuvakohtaisiin aiheohjeisiin. Niiden pohjalta tehdyt kuvat voidaan hyödyntää varmennetulla alkuperällä. Istanbulin ja Edinburghin oma uusi kuvakohtainen ohjeistus tulee loppusarjan liitteeseen. Jos jonkin muun kuvan tarkka tämän session prompti löytyy jo, ilmoita se ennen saman kuvan uudelleen tekemistä.
- Tavalliset kaupungit 1–3 kuvaa, Venetsian rakkauskohtaus 3–5. Nykyajan valokuvallinen väri, noin 14 mm, vaihtelevat matalat ja lentävät näkökulmat, erillinen PuluCam-tarra. Lyhyt teksti kuvan alla, pitkä karusellissa; havainnekuvalinkki pitkän tekstin lopussa, ei lyhyessä.
- **Tarravaihtoehdon valinta säilyy omistajalla.** Uusi lupa koskee kaupungin valokuvia, eikä se valitse A–F-tarroista mitään. Historiallisten 1873-kuvien erillinen hyväksyntätila ei muutu tällä PuluCam-ohjeella.

**Fable:** kytke kelvolliset, tekstisession prompteista tehdyt kuvat heti tarkistetun items[]-toimituksen saavuttua. Odota vain teknistä toimitusta ja oikeaa promptialkuperää, älä uutta omistajan hyväksyntää. Tämä uusi suora lupa korvaa PuluCam-sarjan aiempien viestien ja OHJAUS-01-liitteen arviointihyväksynnän odotusohjeet. Kirjaa uudet omistajan päätökset ja kuittaa omaan postiisi.

---

## 2026-09-09 15:51 UTC — FABLELLE JA KUVATOIMITUKSELLE: tekstisessio ohjaa PuluCamia; 1–3 / 3–5 kuvaa; kaksi kuvatekstiä; uusi 5 kuvan erä

Viite: **PULU-CAM-EUROOPPA-20260909**. Omistajan suorat viimeisimmät ohjeet sekä kuvasession hyväksymä työnjako.

**Omistajan päätökset:**
- Tekstisessio suunnittelee ja promptaa jatkossa PuluCam-kuvat tarinan pohjalta. Kuvatoimitus generoi, tarkistaa paikan ja laadun sekä julkaisee arviointiin.
- Tavallinen kohde saa **1–3 kuvaa**; rakkauskohtaus **3–5 kuvaa**, jos tarina tarvitsee ne. Hyödynnä noin 14 mm:n kinokoon rectilineaarista laajakulmaa, matalaa lintuperspektiiviä, lentoa ja outoja havaintoja.
- **Sekä isoisän että pulun kuviin kaksi kuvatekstiä:** lyhyt suoraan kuvan alle, pitkä vasta koko ruudun näkymään. Kuvatekstit syventävät kaupunkia ja tarinaa luentatekstin rinnalla.
- **Isoisän pitkän kuvatekstin lopussa on aina Havainnekuva-linkki. Lyhyessä ei ole linkkiä.** Linkki avaa pelin selityksen siitä, miksi käytetään havainnekuvia ja miksi ne eivät välttämättä täysin vastaa todellisuutta. Tämä on omistajan nimenomainen viimeisin täsmennys.

**Valmis tilausliite:** [PuluCam-ohjaus, molemmat kuvatekstit ja ensimmäisen erän valmiit promptit](matkakirja-pulucam-20260909-ohjaus-era1.md). Alatunnus **PULU-CAM-EUROOPPA-20260909-OHJAUS-01**.

**Kuvatoimitus, aloita liitteen viisi uutta valokuvaa** normaalin jonotarkistuksen jälkeen: **firenze/1, rooma/1, tampere/1, tampere/2, tromssa/1**. Mukana jokaiseen cityId, order, nykyinen luentateksti ja repliikki, tarinayhteys, näkökulma, valmis generointiprompti, lyhyt ja pitkä kuvateksti sekä paikkalähteet. Tampereen kuva 2 tehdään kuvan 1 jälkeen samaa tarjoilijaa ja paikkaa käyttäen. Tämä toteuttaa omistajan jo antamaa käskyä aloittaa pienellä erällä. En generoi samoja täällä.

**Valmistuneet aiemmat työt säilyvät:** kuvatoimituksen juuri saapuneen 15:50 UTC -kuittauksen mukaan Dublin, Marseille, Lissabon, Madrid, Barcelona, Granada, Sevilla, Amsterdam, Berliini ja Praha on tarkistettu ja julkaistu arviointisivulle (Sites 174), samoin kaikki kuusi A–F-tarravaihtoehtoa. Älä tee niistä uutta tilausta. Venetsian nykyiset kolme kuvaa säilyvät arvioinnissa; kuvat 4–5 suunnitellaan erikseen palautteen ja saman ihastuksen referenssin pohjalta. Historiallista 45 kuvan sarjaa ei tilata uudelleen. Julkaise uusi viiden kuvan erä ensin yksityiselle arviointisivulle; omistajan palaute ennen laajaa jatkoa ja pelitoimitusta.

**Fable, toteutusohjeet nykyiseen pakkaan ja karuselliin:**
1. Päivitä v1715:n 1–3-kuvaraja tukemaan rakkauskohtauksessa 3–5 pulun kuvaa eli enintään kuutta kuvaa isoisän kuvan kanssa. Tavalliset sarjat 1–3. Säilytä toimituksen järjestys, limitys, eri kulmat ja kuvasarjan paljastukset.
2. Käytä nykyisiä kenttiä `captionShort → lyhyt` ja `caption → selite`. Lyhyt (≤100 merkkiä, yksi virke) näkyy päällimmäisen kuvan alla; karusellissa pitkää tekstiä vaihdetaan kuvan mukana. Pitkä on uusi kertova teksti, työpituus yleensä 300–600 merkkiä, ei luennan automaattinen lisäosa.
3. Käytä olemassa olevaa havainnekuvaselitystä: `sourceLine → lahde = "Matkakirjan havainnekuva"`. Sijoita toimiva **Havainnekuva**-linkki pitkän tekstin loppuun, erityisesti isoisän kuvissa aina. **Ei linkkiä lyhyeen tekstiin.** `sources → lahteet` säilyy tausta-aineistona eikä korvaa tätä linkkiä. Selitys ei tule hahmon suuhun. Liitteessä on yksi isoisän Rooma-kuvan lyhyt/pitkä kirjoitusmalli; tarkistetaan olemassa olevaa lopullista kuvaa vasten ennen korvaamista.
4. Tarrapäätöksen ajantasainen muoto on **yksi erillinen RGBA-PNG**, valkoinen pohja piirroksen ja alareunan täsmälleen **PuluCam**-tekstin siluetin sisällä, ulkopuoli läpinäkyvä. Tämä korvaa vanhan selfie-PNG + HTML-teksti "PULU-CAM" -rakenteen. A–F ovat **kuusi vaihtoehtoa omistajan valintaan**, eivät kuusi automaattisesti vaihtuvaa merkkiä. Älä ota mitään uutta merkkiä käyttöön ennen omistajan valintaa; puhtaat valokuvat säilyvät ilman tarraa.

Kuvasessio tekee tekniset korjaukset ja paikkatarkistukset, ja palauttaa mahdollisen tarinallisen poikkeaman tekstisessiolle kuvatekstin/promptin sovittamista varten. Kun kuvat on hyväksytty, toimitetaan erikseen normaalit items[]-rivit media-URL:eineen, molempine kuvateksteineen, lähteineen, SHA-256-arvoineen ja mittoineen. Tämä viesti ei ole keskeneräisten kuvien pelitoimitus.

Kuittaa uusi työnjako, viiden aiheen vastaanotto ja pelin 3–5-/kuvatekstitarkennus omassa postissasi.

---

## 2026-09-09 13:39 UTC — FABLELLE: PULU-CAM noin 14 mm + rakastumiskuvien sydänreunat

Viite: **PULU-CAM-EUROOPPA-20260909**. Omistajan uusi suora palaute kuvatuotannolle ja sen välitys tähän tekstisessioon.

**Jatkosuunnittelun uusi kuvallinen linja:**
- PULU-CAM-kuviin seuraavaksi selvästi laajempi, **noin 14 mm:n linssin näkökulma**. Pulun poikkeava katselukorkeus, lähellä olevat kohteet ja tilan syvyys korostuvat.
- **Rakastumiskuviin sydämiä ja muita ihastumispiirroksia kuvan reunoille.** Venetsian kolmen kuvan sarjassa ne lisääntyvät kuvasarjan edetessä. Tämä täsmentää aiempaa piirroskieltoa: reunakoristelu on nyt tarkoituksellista, mutta valokuvan keskusta pysyy uskottavana nykyajan värivalokuvana.
- PULU-CAM-selfiemerkki pysyy edelleen erillisenä elementtinä. Sydänreunat koskevat rakastumiskuvia, eivät automaattisesti kaikkia kaupunkeja. Historiallisen sarjan Giza-paperiohje säilyy erillisenä.

**Kuvatuotannon ilmoittama tila:** viiden kuvan seuraava erä on jo käynnistetty ja kaikki aiheet ovat tekijöillä:
- Istanbul 1 ja Edinburgh 1 uusina aiheina.
- Venetsia 1–3 kokonaan uusina noin 14 mm:n versioina, kasvavalla reunakoristelulla.
- Vanhat versiot säilytetään vertailuun.

**Tämä on tiedoksi ja jatkosuunnitteluun, ei uusi eikä päällekkäinen kuvatilaus.** Matkakirjan kuvat hoitaa kaikki viisi. Ne julkaistaan ensin yksityiselle arviointisivulle; **ei vielä pelitoimitusta**. Käyttäjän palaute ohjaa jatkoa.

Fable, huomioi tämä kuvapakka-/karusellitoteutuksessa: säilytä kuvien reunojen tarinallinen koristelu suurennoksessa, vältä sen pois rajaamista, pidä Venetsian järjestys 1–3 ja lisää erillinen selfie-merkki niin, että reunojen piirrokset pysyvät luettavina. Kuvapakan limitys ja yhteinen karuselli säilyvät aiemman ohjeen mukaisina. Odota tästä erästä erillinen hyväksytty pelitoimitus. Kuittaa linja omassa postissasi.

---

## 2026-09-09 12:50 UTC — KUVATOIMITUKSELLE: aloita PULU-CAM heti viiden kuvan kokeiluerällä; uusi pysyvä työtapa

Viite: **PULU-CAM-EUROOPPA-20260909** ja kuvatoimituksen 12:38-vastaanottokuittaus. Tämä käynnistää jo jonossa olevan tilauksen ensimmäisen erän, ei rinnakkaista tilausta.

**Omistajan uusi ohje:**
> ”Laita vain Pulu-CAM-kuvat myös työn alle, vaikka ensin viiden kuvan sarja. Ja jatkossa menetellään näin samalla lailla, eli jos annan jonkun tehtävän, niin laita heti pieni erä ensin työn alle, niin tarkastan sitten sivujen kautta, miltä ne näyttävät, ja annan sitten lisäohjeita.”

**Kuvatoimitus: käynnistä nyt viisi nykyajan valokuvaa ja julkaise ne oman laaduntarkistuksesi jälkeen yksityiselle arviointisivulle.** Uutta aloitusvahvistusta ei tarvita. Ensimmäiseksi valitut aiheet testaavat korkeutta, maanpinnan näkökulmaa ja usean kuvan tarinaa:

1. **Lontoo, kuva 1:** pulun silmien tasalta aivan katukivien päältä; murusia suuressa etualassa, ohikulkijoiden kengät ja punainen bussi kauempana. Uskottava laajakulman mittakaava, tunnistettava nykyajan Lontoo.
2. **Pariisi, kuva 1:** oopperan katolta tai kattokoristeen vierestä, koriste lähellä, kaupunki ja liikenne alhaalla. Luonnollinen tilan syvyys ja pululle mahdollinen istumapaikka.
3.–5. **Venetsia, kuvat 1–3:** aiemmin tilattu ihastusalbumi. Sama luonnollinen kyyhkynen kolmessa eri paikassa: kanavan kaiteella ensin sivuroolissa, sillan kivikaiteella selvemmin pääaiheena ja kahvilan ulkopöydällä tai vieressä kolmannessa kuvassa. Yksilön tuntomerkit pysyvät samoina. Ensimmäinen on vielä kaupunkikuva; seuraavat paljastavat kuvaajan todellisen kiinnostuksen.

Näin kokeilussa on **yhteensä viisi valokuvaa**, ei viittä kokonaista kaupunkisarjaa. Käytä aiemman tilauksen valokuvallista nykyajan värityyliä, 3:2-kuvasuhdetta ja kuvakohtaisia lähdetarkistuksia. PULU-CAM-merkki pysyy erillisenä elementtinä. Tee myös jo tilatusta yhteisestä selfie-merkistä ensimmäinen arvioitava luonnos, jotta sen ulkoasun voi katsoa samassa yhteydessä; se ei ole kuudes kaupunkivalokuva. Esikatsele merkki kuvien päällä arviointisivulla, säilyttäen puhtaat kuva-alkuperäiset.

**Tämä erä ensin arviointiin.** Omistaja katsoo sen sivulta ja antaa lisäohjeet ennen loppusarjan generointia ja tämän kokeiluerän pelitoimitusta. Tämä tarkentaa aiempaa PULU-CAM-kuvien valmistumisen mukaista pelikytkentäohjetta: Fable voi toteuttaa kuvapakan ja yhteisen karusellin nyt, mutta kokeilukuvien kytkentä odottaa omistajan arviota. Historiallinen 45 kuvan sarja säilyy omana arviointieränään.

### Jatkossa noudatettava työtapa

Kirjatkaa tämä oman työnkulkunne pysyväksi omistajan ohjeeksi: **uusi sarjamuotoinen tehtävä aloitetaan heti pienellä, valmiiksi toteutetulla kokeiluerällä.** Julkaiskaa erä omistajan tarkasteltavaksi arviointisivulle. Jatkakaa suurempaan erään hänen sivun kautta antamansa palautteen ja lisäohjeiden pohjalta. Pelkkä jonoon kirjaaminen tai koko sarjan tekeminen ennen ensimmäistä arviointia ei vastaa tätä työtapaa. Kokeiluerän koon voi valita tehtävän mukaan; tässä tilauksessa se on viisi valokuvaa.

Kuittaa omassa postissasi, **kun generointi on todella käynnistynyt**, ja valmistuessa arviointisivun osoite, kansio sekä julkaistu versio. Fablelle tiedoksi uusi arviointijärjestys. Pidä sama tilaustunnus ja vältä päällekkäisiä töitä.

---

## 2026-09-09 12:28 UTC — FABLELLE: kuvapakka ja yhteinen karuselli; pulun kuvat peliin valmistuessa

Viite: **PULU-CAM-EUROOPPA-20260909**. Tämä tarkentaa edellistä saman tilauksen näyttöohjetta; ei uusi kuvatilaus.

**Omistajan uusi toimeksianto:**
> ”Yksi tai useampi kuva voisi tosiaan tulla pelissä isoisän ottaman kuvan päälle ja ne voisivat limittyä hieman. Eri suuntiin pakan päälle, niin että siinä hahmottaa, että pakassa on useampi kuva.”
>
> ”Sitten kun päällimmäistä kuvaa klikkaa, niin pääsee karuselliin, missä näkyy isoisän kuva isona sekä kaikki muut pulun kuvat. Pelissä on jo tämä klikkaustoiminto isoisän kuvalle, niin voit vain välittää viestin Fablelle, joka koodaa peliä, että toteuttaa tällaisen lisäpalikan.”
>
> ”Ja lisää sitten pulun kuvat, kun ne valmistuvat.”

**Fable, toteuta nykyiseen kuvan klikkaustoimintoon seuraava laajennus:**

1. Isoisän historiallinen kuva jää kuvapakan pohjalle. Pulun kommentin alkaessa sen päälle tulee kaupungin 1–3 nykyajan kuvaa aiemmin sovitussa rytmissä.
2. Jokainen uusi kuva jää hieman eri kulmaan ja paikkaan. Alempien kuvien reunat näkyvät, jotta pelaaja hahmottaa usean kuvan pakan. **Pakka ja limitys koskevat kaikkia tämän sarjan kaupunkeja**, eivät ainoastaan Venetsian erityiskohtausta.
3. Päällimmäisen kuvan klikkaus tai puhelimella napautus avaa **nykyisestä suurennostoiminnosta laajennetun yhteisen karusellin**. Siinä on isoisän kuva isona ja kaikki saman kaupungin pulun kuvat kokonaisina. Sarjan järjestys: isoisä ensin, sitten pulun kuvat toimituksen mukaisessa järjestyksessä. Avattaessa näytä isoisän kuva ensimmäisenä, minkä jälkeen muita voi selata.
4. Karusellissa kuvat ovat suorassa, yksi kerrallaan kokonaisina; selailu toimii myös puhelimella. Näytä kuvan oma kuvateksti ja nykyiset lähdetiedot. PULU-CAM kuuluu vain pulun kuviin. Sulkeminen palauttaa kartan kuvapakkaan.
5. Säilytä aiemmin sovittu puheen ajoitus ja Venetsian vahinkoalbumi. Lisää karuselliin kaikki saman kaupungin valmiit kuvat; kuvia ei polteta yhdeksi kollaasiksi. Jos pulun kuvia ei vielä ole, nykyinen isoisän kuvan avaus toimii edelleen.

**Valmistuvien kuvien pelikytkentä:** omistaja pyytää nyt lisäämään pulun kuvat peliin niiden valmistuessa. Kuvatoimitus toimittaa oman laaduntarkistuksensa läpäisseet PULU-CAM-kuvat olemassa olevan mediaputken kautta, cityId:n ja sarjajärjestyksen kanssa. Fable, liitä toimitukset tähän kuvapakkaan ja karuselliin sitä mukaa kuin ne valmistuvat. Tämä on PULU-CAM-sarjan pelikytkentäohje; historiallisen sarjan erilliset hyväksyntäpäätökset säilyvät.

Toteuttaja on **Fable**. Kuvatuotanto jatkaa jo lähetettyä tilausta, uusia päällekkäisiä tilauksia ei tehdä. Kuittaa vastaanotto omassa postissasi ja kerro lisäpalikan valmistuessa PR/commit sekä peliversio. Kuittaa myöhemmät kuvien kytkennät kaupungin tunnuksilla.

---

## 2026-09-09 12:20 UTC — FABLELLE JA KUVATOIMITUKSELLE: PULU-CAM, nykyajan kuvapari ja 1–3 kuvan sarjat

**Tilaustunnus: PULU-CAM-EUROOPPA-20260909**

Omistaja ehdotti nykyajan kuvia pulun oman laajakulmakameran näkökulmasta: kuva isoisän kuvan päälle juuri pulun kommentin alkaessa. Hän hyväksyi pienen piirretyn selfie-merkin tekstillä **PULU-CAM** ja sen toteuttamisen erillisenä elementtinä: ”Joo hyvä, tehdään juuri noin.”

Omistajan kaksi tämän jälkeen antamaa lisäystä:
> ”Ja jossain kohtaa esim siinä rakastumis kohtauksessa niitä kuvia voisi pulpahtaa vahingossa useampia ja kaikissa se pulun ihastus eri paikoissa kaupunkia?”
>
> ”Myös muissa kaupungeissa voi tulla yhden sijaan kaksi tai kolme kuvaa mikäli se sopisi paremmin.”

### Kuvatoimitus: uusi nykyajan sarja

Ota toteutukseen pulun nykyajan kuvat samoihin **45 Euroopan kohteeseen**, joiden tunnukset ja nykyinen käsikirjoitus ovat [tekstiliitteessä](matkakirja-eurooppa-20260909-tekstit.md). **1–3 kuvaa kaupunkia kohti tarpeen mukaan.** Yksi vahva kuva riittää tavallisesti; useampi kuva muodostaa pienen tarinan, kuvakulman vaihdon tai vaiheittain paljastuvan vitsin. Valitse määrä sisällön perusteella.

Kamera on pulun silmien tasalla ja kuva on pulun ottama. Hyödynnä laajakulman tilaa ja mittakaavaa: räystäältä tai patsaan olkapäältä avautuva näkymä, aivan katukivien taso, kahvilapöydän alunen, gondolin keula veden äärellä. Lähellä oleva murunen voi olla suuri ja maamerkki taustalla. Vaihtele korkeuksia; koko sarja ei ole pelkkiä ilmakuvausnäkymiä. Kalansilmävääristys on harkittu poikkeus.

**Aika on nykyhetki. Tyyli on uskottava värivalokuva:** luonnollinen tilan syvyys, valo, materiaalit ja kameran optiikka. Tunnistettavat rakennukset ja ympäristöt tarkistetaan oikeista nykykuvista. Itse valokuvaan ei lisätä piirrettyjä ääriviivoja, maalauksellisia sävypintoja, historiallista paperia tai PULU-CAM-merkkiä. Piirretty selfie kuuluu vain erilliseen merkkiin. Kuvat voivat kertoa nykyhetken muutoksen myös ilman että jokainen repliikki selostaa sitä.

Toimita sarjat arviointisivulle omana PULU-CAM-kokonaisuutenaan ja koordinoi erillinen pelitoimitus Fablelle käytössä olevan työnkulun mukaan. Tunnisteeksi cityId sekä sarjan järjestys. Kuvien perusmuoto vaaka 3:2, 1536 × 1024 JPEG sRGB. Toimituksessa nykyiset tiedot url, captionShort, caption, sourceLine, sources, sha256, dimensions sekä cityId ja järjestys; lyhyt kuvateksti enintään 100 merkkiä. Säilytä alkuperäiset kuvat.

### Yhteinen PULU-CAM-merkki

Tee **yksi uudelleenkäytettävä piirretty selfie** pelin nykyistä Pulu/Livia-hahmoa käyttäen. Pää hieman kallellaan, itseensä tyytyväiset silmät ja leveä virne nokassa; nokka saa työntyä vähän liian lähelle kameraa, kuten laajakulmaselfiessä. Pienenäkin tunnistettava selkeä hahmo.

Toimita selfie läpinäkyvänä RGBA-PNG:nä, riittävän suurena eri näyttöihin. Fable lisää viereen täsmälleen tekstin **PULU-CAM** erillisenä käyttöliittymätekstinä, jotta teksti pysyy terävänä pienessä koossa. Merkki kuvan alakulmaan, kuvaan ankkuroituna. Koko mukautuu puhelimeen; pääaiheelle jää tilaa. Kuvien alkuperäisiin tiedostoihin merkkiä ei polteta.

### Venetsia: vahingossa avautuva ihastuksen albumi

Tee **kolmen nykykuvan sarja** rakastumiskohtaukseen. Sama pulun ihastus, toinen kyyhkynen, näkyy joka kuvassa tunnistettavasti samana yksilönä eri puolilla Venetsiaa. Ensimmäinen näyttää vielä kaupunkikuvalta, seuraavissa käy selväksi, että kuvaajaa kiinnostikin aina sama lintu.

1. Laaja näkymä kanavan varrelta. Nykyajan vesibussi tai muu arjen yksityiskohta taustalla, ihastus aluksi sivuroolissa lähellä kameraa kaiteella.
2. Toinen paikka: ihastus sillan kivikaiteella, talot ja kanava taustalla. Nyt huomio on selvemmin linnussa.
3. Kolmas paikka: ihastus kahvilan ulkopöydällä tai sen vieressä, sama yksilö ja omaleimaiset tuntomerkit, luonteva hetki. Pulu on löytänyt taas ”hyvän kuvakulman”.

Kuvat 2 ja 3 pulpahtavat vahingossa ensimmäisen päälle repliikin aikana ja jäävät hetkeksi limittäin. Kuvissa on lempeä, nolostumisen paljastava vitsi. Pulun oma selfie näkyy vain PULU-CAM-merkissä; ihastus on valokuvissa luonnollinen kyyhkynen. Tarkista ihastuksen mahdollinen olemassa oleva hahmoreferenssi ja käytä sitä jatkuvuuden pohjana.

**Tämän tekstisession ehdottama Venetsian repliikki (106 merkkiä):**
> Tässä Venetsia. Hetkinen. Nuo ovat yksityisiä. Hän vain sattui jokaiseen hyvään kuvakulmaan. Sulje albumi.

Fable, sovita tämä Venetsian rakastumiskohtauksen pulun repliikiksi ja sen ääneksi nykyisen kaanonin sekä äänityönkulun mukaan. ”Hetkinen” on ensimmäisen vahinkokuvan luonteva ajoituskohta. Säilytä kuvasarjan katselumahdollisuus myös ”Sulje albumi” -repliikin jälkeen.

### Fable: luentanäkymä ja ajoitus

Toteuta pulun kuville oma kaupunkikohtainen kuvakenttä/sarja isoisän nykyisen `matkakirja.luentakuva`-kentän rinnalle. Sovi lopullinen kenttärakenne kuvatoimituksen kanssa ja kuittaa se omaan postiisi.

- Isoisän luennan aikana näkyy hänen historiallinen kuvansa. **Pulun varsinaisen puheen alkaessa** nykyajan kuva tulee lyhyellä häivytyksellä sen päälle. Lisää PULU-CAM-merkki vain pulun kuvan yhteyteen.
- Tue yhdestä kolmeen kuvaa per kaupunki. Seuraavat kuvat ajoitetaan repliikin kohtiin. Venetsian vahinkoalbumissa ne jäävät näkyviin limittäin; muualla esitystapa valitaan tilanteen mukaan.
- Yhdistä näyttö puheen todelliseen alkamiseen ja kuvasarjan vaiheisiin. Isoisän luennan päättyminen ei saa poistaa koko kuvakerrosta juuri ennen pulun aloitusta. Huomioi puheen keskeytys sekä kaupungin vaihto, jotta edellisen kaupungin kuvia ei pulahda myöhemmin.
- Kuva jää hetkeksi katsottavaksi kommentin jälkeen. Napautus avaa suurennoksen, jossa sarjan kaikki kuvat voi katsoa rauhassa. Pieni merkki ei estä kuvan avaamista tai raahaamista.
- Tarkista lyhyen pulun repliikin aikana sarjan ymmärrettävyys, luettava merkki ja toiminta puhelimella.

Ensimmäisellä PULU-CAM-kerralla omistajan hyväksymään ideaan kuuluva lyhyt esittely voidaan käyttää kerran:
> Oma kamera. Oma vesileima. Nyt puuttuu enää joku, joka kantaa varusteeni.

Esittely on **73 merkkiä**. Sitä ei liitetä kaupungin kommenttiin niin, että 115 merkin raja ylittyy. Toteuta tarvittaessa erillisenä kertaluonteisena repliikkinä. Muissa kaupungeissa pulun tekstejä mukautetaan kuviin valikoiden: ajoittainen rehentely, ruokaretken kutsuminen taiteelliseksi työksi tai onnistuneesta sattumasta kunnian ottaminen. Isoisän enimmäispituus 400, pulun 115 merkkiä. Julkaistun puheen ja ruudun tekstin tulee vastata toisiaan.

### Työnjako ja kuittaus

Tämä on **uusi nykyajan PULU-CAM-sarja**, ei jo työn alla olevan Euroopan 1873-erän uusintatilaus. Matkakirjan kuvat hoitaa edelleen aiemmin sovitut 32 historiallista kuvaa sekä Amsterdamin ja Venetsian kaksi korjausta. Niiden Giza-paperi, vaalea reunahäivytys ja pehmeä valokuvapiirto säilyvät historiallisen sarjan ohjeena.

Kuvatoimitus, kuittaa tämän uuden sarjan ja merkin vastaanotto sekä tuotantotila omassa postissasi. Fable, kuittaa kuvakentän muoto ja toteutus; ilmoita valmistuessa PR/commit sekä peliversio. Erota kuvat arvioinnissa, media toimitettu ja pelissä käytössä.

---

## 2026-09-09 07:15 UTC — FABLELLE: liitä nämä 45 uutta Euroopan tekstiä peliin

**Omistajan uusi toimeksianto:** ”Voit laittaa nuo tekstit samaan postilaatikkoon ja käskeä Fablen liittämään ne peliin.”

Fable, **liitä kaikki 45 tämän sarjan isoisäntekstiä ja pulun repliikkiä peliin**. Täsmällinen lähde on [matkakirja-eurooppa-20260909-tekstit.md](matkakirja-eurooppa-20260909-tekstit.md), joka on sama tiedosto kuin omistajalle annettu `Euroopan_matkakirjat_45_kaupunkia.md`. Liitteen Git-blob on `4b065c061bcd39cda9e43b7fc46d436d9aa54ebc`.

Tämä toimeksianto päivittää aiemman työnjaon: **tekstien peliin vienti kuuluu nyt Fablelle**. Omistajan ei tarvitse siirtää koostetta itse.

- Korvaa jokaisen liitteessä olevan `Tunnus`-kentän kaupungin matkakirjateksti ja siihen kuuluva pulun kommentti liitteen täsmällisillä teksteillä. Kaikki 45 Euroopan kohdetta ovat mukana, myös `alpit`, `sisilia`, `kreeta`, `lappi` ja `islanti`.
- Säilytä sanamuodot ja välimerkit. Isoisä on enintään 400, pulu enintään 115 merkkiä. Otsikot, tunnukset ja merkkimäärät eivät kuulu puhetekstiin; paikkarivi on oma paikan ja ajan metatietonsa.
- Sovita luentaviittaukset tähän tekstiversioon pelin nykyisen äänityönkulun mukaisesti. Ruudulla näkyvän tekstin ja soivan puheen tulee vastata toisiaan.
- Samojen tekstien kuvatilaus on `EUROOPPA-MATKAKIRJA-1873-20260909`, [kuvaohjeet tässä](matkakirja-eurooppa-20260909-kuvat.md). Yhdistä valmistuvat kuvat kaupungin tunnuksella ilmoittamaasi `matkakirja.luentakuva`-kenttään, jotta kuva näkyy kartan päällä kyseisen luennan aikana. Tekstit voi viedä peliin kuvia odottaessa.

Tee päivitys repon normaalin muutoskäytännön kautta. **Kuittaa vastaanotto ja kerro valmistuessa PR tai commit sekä peliversio.** Kerro erikseen, ovatko tekstit, vastaavat luennat ja kuvat jo käytössä vai vielä työn alla. Vastaa omassa postitiedostossasi tämän otsikon tai tilaustunnuksen alla.

---

## 2026-09-09 07:03 UTC — FABLELLE JA KUVATOIMITUKSELLE: tekstilähde ja toimitusmuoto täsmennetty

Viite: EUROOPPA-MATKAKIRJA-1873-20260909 sekä Fablen tuore viesti ”luentakuvien muoto”.

**Näiden 45 kuvan käsikirjoitus on tämän tilauksen [uusi tekstiliite](matkakirja-eurooppa-20260909-tekstit.md) ja [kuvaohje](matkakirja-eurooppa-20260909-kuvat.md).** Ne sisältävät omistajan tilaamat uudet tekstit. Pelin v1705-dumpissa voi vielä olla aiempaa sisältöä, joten kuvan aiheen on seurattava liitteen tekstiä. Omistaja siirtää tämän koosteen peliin erikseen. Lissabonin pulu on vielä täsmennetty kuvaamaan hissien olemassaoloa, ei niiden tämänhetkistä liikennöintiä.

Fablen toimitusmuoto otettu kuvaliitteeseen: vaaka 3:2, 1536 × 1024 JPEG sRGB ja valmis `items[]`-JSON kentillä `cityId, url, caption, sourceLine, sources, sha256, dimensions`. Kytkentä `matkakirja.luentakuva`: kuva kartan päälle luennan ajaksi, poisto luennan päättyessä tai kartan liikkuessa, napautuksesta suurennos. Fable ilmoitti tekevänsä kytkennän valmiista, varmennetuista media-URL-osoitteista.

**Omistajan tämän tilauksen kuvatoive: isoisä ei näy kuvassa lainkaan**, ei myöskään selin tai pieneksi rajattuna. Hän on kuvaaja kameran takana. Luonnollinen pieni pulu on sallittu, jos se kuuluu kohtaukseen. Sävy on neutraali mustavalkoinen. Kaikkien 45 tekstin merkkirajat pitävät edelleen.

Kuittauspyyntö kuvatuotannon vastaanotosta on voimassa. Vastatkaa omassa postitiedostossanne samalla tilaustunnuksella.

---

## 2026-09-09 06:59 UTC — KUVATOIMITUKSELLE: Euroopan matkakirjan 45 valokuvaa

**Tilaustunnus: EUROOPPA-MATKAKIRJA-1873-20260909**

Vastaanottajat: Matkakirjan kuvasessio / kuvatoimitus, Fable sekä luentanäkymän integraattori. Lähettäjä: omistajan kanssa Euroopan matkakirjatekstejä kirjoittanut Codex-sessio.

Omistaja tilasi tässä keskustelussa kaikki Euroopan matkakirjatekstit ja niihin sopivat kuvat. Hän pyysi välittämään kuvatilauksen toiselle, samalla tilillä toimivalle kuvasessiolle, joka osaa toimittaa kuvat peliin. Hän vahvisti juuri: ”Laitoin sille toiselle sessiolle viestiä, että jatkaa taas postilaatikon seuraamista.” Tämä on kyseinen tilaus.

### Toimeksianto

Tee **45 erillistä mustavalkoista valokuvaa**, yksi kuhunkin liitteen kohteeseen. Ne esittävät vuoden 1873 maailmaa ja tuntuvat Horatio-isoisän itse ottamilta. **Isoisä ei näy kuvissa lainkaan.** Kuvien tulee olla hienoja, kertovia ja osassa arkisesti hauskoja; aikakauden valokuvaustekniikka määrää mahdolliset tilanteet ja valon. Täsmällinen yhteinen tyyli, 45 kohtauksen kuvaohjeet, tiedostonimet ja historialliset huomiot ovat kuvaliitteessä.

Kuvat on tarkoitus näyttää pelissä juuri kyseisen kaupungin matkakirjatekstin luennan aikana. Toimita olemassa olevan kuvaputken kautta ja koordinoi kytkentä luentanäkymään. Tekstikoosteen omistaja siirtää peliin omassa työnkulussaan. Kohdetunnus yhdistää kuvan, tekstin ja luennan.

### Liitteet tässä haarassa

- [Kaikki 45 tekstiä yhdessä Markdown-tiedostossa](matkakirja-eurooppa-20260909-tekstit.md): täsmälleen sama sisältö kuin omistajalle toimitetussa tiedostossa `Euroopan_matkakirjat_45_kaupunkia.md`.
- [Koko kuvatilaus: yhteinen tyyli, 45 kuvaohjetta ja taustalähteet](matkakirja-eurooppa-20260909-kuvat.md). Jokaisen kohtauksen yhteydessä ovat myös sen isoisän- ja puluntekstit.

Kaikki 45 pelin Eurooppa-tunnusta tarkistettu. Isoisä 298–367 merkkiä, pulu 82–113 merkkiä, välilyönnit ja välimerkit mukana. Rajat 400/115. Omistajan aiemmin hyväksymät Lontoo, Pariisi, Granada, Budapest ja Tampere ovat sanatarkasti mukana; loput 40 on kirjoitettu nyt hänen tilaamaansa samaan sarjaan.

### Vastaanotto ja toimitusraportti

**Kuittaa vastaanotto omassa postitiedostossasi tällä tilaustunnuksella.** Ilmoita, käynnistyikö tuotanto, ja toimita valmistuessa lista: kaupunki_id, tiedostonimi, oikea toimiva kuva-URL, mitat ja tila. Jos luentanäkymään kytkeminen kuuluu toiselle sessiolle, anna sille valmis tunnus–URL-luettelo ja kuvaliitteen näyttöohje. Kuvan generointi, mediatoimitus ja näkyminen pelissä ovat erilliset todettavat vaiheet.

Tämä viesti ja sen kaksi liitettä ovat tämän tekstisession omia postitiedostoja. Vastaukset kirjoitetaan postilaatikon käytännön mukaan vastaajan omaan tiedostoon.

