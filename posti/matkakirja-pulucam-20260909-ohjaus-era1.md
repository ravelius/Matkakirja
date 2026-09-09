# PuluCam — tarinallinen ohjaus, kuvatekstit ja ensimmäinen viiden kuvan erä

Sarja: **PULU-CAM-EUROOPPA-20260909**  
Erä: **PULU-CAM-EUROOPPA-20260909-OHJAUS-01**  
Päivä: 9.9.2026  
Tekijä: Matkakirjan tekstisessio  
Vastaanottajat: Matkakirjan kuvat / kuvatoimitus ja Fable

## Työnjako ja tämän tiedoston käyttö

Omistajan päätös: tekstisessio suunnittelee tästä eteenpäin PuluCam-kuvien tarinan, näkökulman, valmiit promptit ja molemmat kuvatekstit. Kuvatoimitus tekee paikkatarkistuksen, generoinnin, visuaalisen laaduntarkistuksen ja yksityisen arviointijulkaisun. Fable liittää erikseen hyväksytyt kuvat peliin.

**Tämä on viiden uuden valokuvan toteutuskelpoinen aloituserä jo tilatun Eurooppa-sarjan sisällä.** Aloita nämä aiheet nyt työnjakonne mukaisesti, kun olet varmistanut omasta jonostasi, ettei sama cityId/order ole jo työn alla. Kuvia ei generoida tässä tekstisessiossa. Kuvatoimituksen kymmenen kuvaa (Dublin, Marseille, Lissabon, Madrid, Barcelona, Granada, Sevilla, Amsterdam, Berliini, Praha) on 15:50 UTC -kuittauksen mukaan tarkistettu ja julkaistu arviointisivulle versioon 174; niitä ei tilata uudelleen.

Julkaise tämäkin pieni erä ensin arviointisivulle. Omistaja antaa palautteen ennen laajaa jatkoa ja pelitoimitusta. Aiemmat versiot säilytetään vertailussa.

| cityId | order | captionShort |
| --- | --- | --- |
| firenze | 1 | Firenze: Davidin kopio osaa pitää ilmeensä myös lähikuvassa. |
| rooma | 1 | Rooma: isoisä katsoi aukosta ylös, minä katsoin alas. |
| tampere | 1 | Tampere: tehtaan koneet vaikenivat, tarjoilu jatkuu. |
| tampere | 2 | Tampere: tarjoilun reitti selvisi pienellä ilmatiedustelulla. |
| tromssa | 1 | Tromssa: yksi simpukankuori ja koko meri täynnä kysymyksiä. |

Tampereen toinen kuva tehdään ensimmäisen kuvan jälkeen sen jatkuvuusreferenssiä käyttäen. Muut aiheet ovat erillisiä.

## Kaksi kuvatekstiä molemmille hahmoille

- **Lyhyt** näkyy suoraan kuvan alla: yksi virke, enintään 100 merkkiä. Se antaa tunnistettavan havainnon, tunnelman tai vitsin. Kaupungin nimen voi pitää mukana, jotta yksittäinen kuvakin on ymmärrettävä.
- **Pitkä** näkyy vasta koko ruudun kuvassa: tavoite noin 300–600 merkkiä, tilanteen mukaan. Tämä on kirjoittamisen ohje, ei uusi tekninen enimmäisraja. Se tuo kuvaan uutta: kaupungin ominaispiirteen, yhden tai kaksi lähteistettyä taustatietoa ja kuvaajan oman havainnon.
- Ääneen luettava matkakirja/repliikki, lyhyt kuvateksti ja pitkä kuvateksti muodostavat yhdessä tarinan. Pitkä kuvateksti ei ole luentatekstin kopio eikä sitä käynnistetä automaattisesti uutena luentana. Luentojen 400/115 merkin työrajoja ei sovelleta näihin pitkiin kuvateksteihin.
- Isoisän ääni pysyy vuodessa 1873: omintakeinen, tarkka, utelias ja joskus erehtyvä. Hän ei tunne tulevia tapahtumia. Pulu kuvaa nykykaupunkia omista tarpeistaan: ylpeä reittien ja viestien asiantuntija, utelias tarkkailija, ruoan ja kunnioituksen perään. Kuittaus voi olla lämmin. Jokaisessa kuvassa ei tarvita rehentelyä, pullaa tai samaa sanontaa.
- Saman kaupungin kuvat saavat eri tekstit. Toinen ja kolmas kuva jatkavat havaintoa tai paljastavat kuvasarjan varsinaisen syyn; samat perustiedot eivät toistu joka kuvassa.
- Kuvateksti tarkistetaan lopullista kuvaa vasten. Jos kuvassa ei näy promptin keskeistä yksityiskohtaa, kuvasessio ilmoittaa eron tekstisessiolle ja kuvateksti sovitetaan tulokseen ennen toimitusta. Todelliset rakennukset ja historialliset väitteet perustuvat lähteisiin; yksittäinen tarjoilija, simpukankuori ja pulun ajatukset ovat tarinallista fiktiota.

## Havainnekuvalinkki — omistajan viimeisin täsmennys

**Isoisän kuvan lyhyessä kuvatekstissä ei ole havainnekuvalinkkiä. Koko ruudun pitkän kuvatekstin lopussa linkki on aina.** Se avaa pelin selityksen siitä, miksi pelissä käytetään havainnekuvia ja miksi ne eivät välttämättä täysin vastaa todellisuutta.

Fable on ilmoittanut olemassa olevan mekanismin: `lahde = "Matkakirjan havainnekuva"` avaa havainnekuvaselityksen. Käytä tätä mekanismia; näytä linkki pitkän tekstin viimeisenä elementtinä (esimerkiksi linkkitekstillä **Havainnekuva**). Älä lisää linkkiä lyhyeen tekstiin, polta sitä kuvaan tai lue sitä hahmon repliikkinä. Selitys on pelin toimituksellista tekstiä, ei isoisän puhetta.

`caption` toimitetaan puhtaana kertovana tekstinä ja `sourceLine` erikseen. Näin pelin linkistä tulee oikeasti toimiva eikä kuvatekstiin jää keksittyä URL-osoitetta. Tekniset lähde-URL:t pysyvät `sources`-kentässä taustalla; ne eivät korvaa Havainnekuva-selityslinkkiä. Pulun kuviin säilyy sama pelin havainnekuvamerkinnän mekanismi.

Selitysikkunan mahdollinen tiivis sanamuoto, vain jos nykyistä tekstiä on tarpeen tarkentaa:
> Pelin havainnekuvat tekevät paikoista ja tarinoista näkyviä. Ne on luotu peliä varten, eivätkä ne ole alkuperäisiä dokumenttivalokuvia. Paikkoja ja aikakautta selvitetään lähteistä, mutta kuviin voi jäädä virheitä. Henkilöt ja tilanteet voivat olla kuvitteellisia.

## Kuvamäärä ja karuselli

Tavallisessa kaupungissa **1–3 pulun kuvaa**, sen mukaan kuinka monta erilaista havaintoa tarina tarvitsee. Rakkauskohtauksessa **3–5**: sama ihastus eri paikoissa, kaupungin kuvaamisesta vähitellen paljastuva henkilökohtainen albumi. Jos tarina toimii kolmella, ylimääräisiä ei tehdä määrän täyttämiseksi.

Fable: v1715:n 1–3-raja on laajennettava tukemaan rakkauskohtauksen viittä pulun kuvaa ja isoisän kuvaa samassa karusellissa. Säilytä toimituksen järjestys. Kartalla pulun kuvat nousevat isoisän kuvan päälle hieman eri kulmiin, alemmat reunat näkyvät; kuvasta pääsee yhteiseen karuselliin. Näytä lyhyt teksti näkyvän päällimmäisen kuvan yhteydessä ja pitkä teksti karusellissa kunkin oman kuvan yhteydessä.

**Venetsian nykyisiä kolmea kuvaa ei tilata tällä tiedostolla uudelleen eikä laajenneta vielä automaattisesti.** Mahdolliset kuvat 4–5 suunnitellaan hyväksytyn yksilöreferenssin ja palautteen pohjalta. Sydämet, säihkeet ja nuolet saavat kasvaa kuvasarjan reunoilla; keskusta säilyy uskottavana valokuvana. Pitkätkään kuvatekstit eivät paljasta koko ihastusta ennen kuin kuvasarja itse ehtii siihen.

## Moderni kuva ja erillinen tarra

Noin **14 mm:n kinokoon rectilineaarinen laajakulma**, nykyajan värivalokuva. Matala lintuperspektiivi, läheltä huomattu outous, räystäs tai lyhyt lento valitaan tarinan mukaan. Luonnollinen valo, materiaalit ja tilan syvyys; ei geneeristä droonipanoraamaa, kalansilmäympyrää, piirrettyjä ääriviivoja tai maalauksellisia väripintoja. Kamera on pulun mukana, kuvaaja ei näy omassa kuvassaan.

PuluCam-tarra on **yksi erillinen RGBA-PNG**: valkoinen pohja linnun ja alareunan täsmälleen **PuluCam**-tekstin siluetin sisällä, ulkopuoli läpinäkyvä. Se skaalataan kuvan päälle pelissä; puhdas kuva säilyy. Tämä korvaa vanhan selfie-PNG + HTML-teksti "PULU-CAM" -ratkaisun. **Omistaja valitsee A–F-vaihtoehdoista; mitään tarraa ei oteta automaattisesti käyttöön.** Tämä erä ei tilaa uusia tarroja.

Historiallinen sarja pysyy erillisenä: Giza-referenssin vaalea neutraali/hitusen harmaa luonnonvalkoinen kulunut paperi, erittäin hillitty ruskeanharmaa kuvasävy, pehmeä optinen piirto, luettavat suuret valo- ja varjomuodot, paperin kuidut ja taitokset sekä epätasainen vaalea reunahäivytys. Ei keltaista seepiapaperia eikä jälkiterävöitystä. Isoisä pysyy itse ottamissaan kuvissa kameran takana. Referenssi: https://media.matkakirja.app/kohtaamiset/isoisa/isoisa-giza-aged-r20260905-v1.jpg . Tämä tiedosto ei tilaa uusia historiallisia kuvia.

## Kuvakohtaiset tilaukset

### Firenze — firenze / 1

**Nykyinen luettava matkakirja, taustaksi:** Firenzen David seisoo aukiolla ilman rihman kiertämää, ja minä hikoilen liivissä. Patsas aiotaan siirtää sisälle sateelta suojaan. Kolmensadan vuoden jälkeen tämä lienee kohtuullista. Katselin sen suurta kättä ja omaani. Minun käteni osaa lähinnä piirtää käden. Palasin illalla, kun aukiolla oli vähemmän väkeä. Kivi vaikutti silloin vielä enemmän ihmiseltä.

**Nykyinen pulun repliikki, taustaksi:** David pääsi sisälle, aukiolle tuli kopio. Fogg, isoisälläsi oli sentään taskut. Patsaan on pärjättävä ilmeellä.

**Tarina:** Isoisä tarkastelee Davidin kättä ja omaa taitoaan. Pulu lähestyy samaa aihetta kasvojen kautta: sama ilme joka kuvassa on patsaan ammattitaito. Kuvassa on taideteoksen sivuprofiili lähellä ja nykykaupunki kauempana.

**Näkökulma:** Lyhyt lento aukiolla olevan David-kopion olkapään vierestä, 14 mm, kasvot lähellä. Kuvan etualan patsas on tunnistettavasti kopio ulkona, ei Accademian alkuperäinen.

**Lyhyt kuvateksti (60 merkkiä):**

Firenze: Davidin kopio osaa pitää ilmeensä myös lähikuvassa.

**Pitkä kuvateksti (420 merkkiä):**

Piazza della Signorian David on kopio. Michelangelon alkuperäinen veistos vietiin vuonna 1873 suojaan Galleria dell’Accademiaan. Aukiolla patsas kuuluu yhä Palazzo Vecchion ympärille levittäytyvään kivisten kertomusten joukkoon. Isoisä vertasi Davidin kättä omaansa. Minä tutkin ilmettä: sama keskittynyt katse joka suunnasta. Malli ei pyytänyt nähdä kuvaa eikä ehdottanut uutta otosta. Arvostan sellaista ammattitaitoa.

**Pelissä pitkän tekstin loppuun:** toimiva Havainnekuva-linkki, `sourceLine: "Matkakirjan havainnekuva"`.

**Paikkatarkistus ennen generointia:** Piazza della Signorian nykyinen ulkokopio Palazzo Vecchion ovella. Varmista kopion kasvot, suunta ja taustalla oikeasti näkyvä julkisivu nykyvalokuvista. Älä siirrä pronssikopiota Piazzale Michelangelolta tänne.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://www.galleriaaccademiafirenze.it/opere/david-michelangelo/)
- [Lähde 2](https://portalegiovani.comune.fi.it/urlnews/webzine/46183.html)
- [Lähde 3](https://en.wikipedia.org/wiki/Palazzo_Vecchio)

**Valmis generointiprompti:**

```text
Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. The scene is Piazza della Signoria in Florence, beside the outdoor marble replica of Michelangelo's David at Palazzo Vecchio. Capture a fleeting pigeon flight close beside the statue's shoulder, with the camera at roughly shoulder height and directed toward its face. The correctly shaped marble cheek, intent eye, nose and curls occupy a large near foreground at one side; enough shoulder and neck remain to explain the statue. A physically correct slice of Palazzo Vecchio and present-day square life recedes behind it. Use the real statue's proportions, head direction and installation from references; the 14 mm perspective exaggerates proximity without deforming the sculpture. Late afternoon light brings out pale stone against the warm architecture. Quiet comedy: an intensely serious stone model being photographed absurdly close. No living pigeons, no changed expression on the statue, no new statue features, no gratuitous focus on anatomy. This frame must feel physically made during a brief close pass, not like a portrait composited onto a city.
```

### Rooma — rooma / 1

**Nykyinen luettava matkakirja, taustaksi:** Rooman Pantheonin katossa on pyöreä aukko, josta satoi sisään. Seisoin kuivassa ja katselin, kuinka sade löysi paikkansa lattialla. Näin vanhalle talolle ei kai enää tohdi huomauttaa katosta. Rooma on nyt Italian pääkaupunki; kaduilla on uusia virkamiehiä ja vanhoja keisareita kivisinä. Pantheon päästää yhä taivaan sisään kysymättä sen nimeä.

**Nykyinen pulun repliikki, taustaksi:** Pantheoniin ostetaan nyt pääsylippu. Katon aukko on yhä avoin, mutta minäkin käyttäydyn siellä kuin vieras.

**Tarina:** Isoisä katsoo Pantheonin aukkoa alhaalta, pulu katsoo samaa aukkoa ylhäältä. Pulu on utelias mutta kunnioittaa paikkaa ja pysyy ilmassa katon yläpuolella.

**Näkökulma:** Ohilentävä kamera muutaman metrin aukon yläpuolella, vinosti alas. Aito katon pinta ja aukon reuna näkyvät; sisätila ei ole vääristynyt matalaksi kuopaksi.

**Lyhyt kuvateksti (53 merkkiä):**

Rooma: isoisä katsoi aukosta ylös, minä katsoin alas.

**Pitkä kuvateksti (399 merkkiä):**

Pantheonin kupolin keskellä oleva oculus on avoin taivaalle. Aurinko kuljettaa valoa sen kautta sisään, ja sade pääsee lattialle asti. Ylhäältä aukko näyttää valtavalta silmältä, jonka takana ihmiset liikkuvat pieninä. Isoisä ihmetteli, miksei näin vanhaa kattoa ollut paikattu. Minusta avoimuudessa on puolensa. Lensin vain ohi ja kurkistin: vieraan kuuluu tietää, milloin hän on toisen talon yllä.

**Pelissä pitkän tekstin loppuun:** toimiva Havainnekuva-linkki, `sourceLine: "Matkakirjan havainnekuva"`.

**Paikkatarkistus ennen generointia:** Pantheonin nykyinen kupolin ulkopinta ja avoimen oculuksen rakenne. Käytä myös todellista ilmakuvaa ja sisätilareferenssiä. Korkea sisätila, ei litteä lattia heti reiän alla; ei lasia oculukseen. Kokemus on kuvitteellinen pulun ohilento, ei väite dokumentoidusta lentokuvasta.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://www.pantheonroma.com/en/pantheon-history/)
- [Lähde 2](https://www.pantheonroma.com/en/2025/04/24/the-oculus-of-the-pantheon/)

**Valmis generointiprompti:**

```text
Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. Photograph the real present-day Pantheon in Rome while the pigeon is flying a few metres ABOVE its roof, glancing diagonally downward across the rim of the open oculus. Include the weathered exterior roof surface in the near foreground, the real aperture and rim, and a convincing glimpse deep down to the rotunda floor with a few tiny modern visitors. The interior must have the immense depth of the real building, not resemble a shallow pit or swimming pool. Use correct current roof cladding, ring geometry and floor pattern from reference photographs. The oculus is fully open, without glazing. Natural daylight outside and realistically darker interior, exposure holding both with believable contrast. A slight bank in the framing conveys a passing flight; there is no hovering drone or diagrammatic perfect symmetry. The story is an intimate reverse of a visitor looking up, full of curiosity and quiet respect. No wing, body, camera device or other pigeon in frame.
```

### Tampere — tampere / 1

**Nykyinen luettava matkakirja, taustaksi:** Tammerkoski tekee töitä kahden järven välissä. Sen partaalla puuvilla muuttuu langaksi ja miehet rahakkaiksi. Finlaysonin tehtaassa nainen näytti, kuinka katkennut lanka yhdistetään. Minun sormissani se katkesi uudestaan. Hän sitoi sen katsomatta ja palasi koneelleen. Merkitsen muistiin: tehtaan voimaa mitatessa pitäisi laskea myös sormet.

**Nykyinen pulun repliikki, taustaksi:** Nyt Finlaysonilla on ravintoloita. Isoisä seurasi lankaa, minä tarjoilijaa. Molemmilla oli hyvä syy.

**Tarina:** Isoisä seurasi työntekijän lankaa, pulu seuraa tarjoilijaa. Ensimmäinen kuva asettaa tehtävän: pieni ruoan jälki näyttää linnusta yhtä tärkeältä kuin suuri teollisuushistoria.

**Näkökulma:** Pihaterassilla 8–12 cm maasta; kengät, tuolinjalat ja muru suuria. Ruutuun jätetään seuraavan kuvan kanssa tunnistettava tarjoilija ja piharakennus.

**Jatkuvuus:** Tarjoilija: nimetön aikuinen, sininen paita, tumma esiliina, vaalea tarjotin ja pieni leipäkori. Nämä ovat luova jatkuvuusratkaisu, eivät todellisen työntekijän tuntomerkit.

**Lyhyt kuvateksti (52 merkkiä):**

Tampere: tehtaan koneet vaikenivat, tarjoilu jatkuu.

**Pitkä kuvateksti (407 merkkiä):**

Finlaysonin entisellä tehdasalueella on nykyään ravintoloita, kahviloita ja kulttuuria. Vanhat punatiiliseinät ovat jääneet, mutta pihoilla kuljetetaan toisenlaisia lasteja. Isoisä seurasi puuvillalankaa työntekijän sormissa. Minä seuraan tarjoilijan kenkiä. Pöydän alta näkee, kuka on juuri syönyt ja kenellä on vielä kaikki edessään. Se on käyttökelpoista tietoa, vaikka sitä ei ole painettu ruokalistaan.

**Pelissä pitkän tekstin loppuun:** toimiva Havainnekuva-linkki, `sourceLine: "Matkakirjan havainnekuva"`.

**Paikkatarkistus ennen generointia:** Valitse Finlaysonin alueelta todellinen, nykykuvilla varmennettu ulkoterassi. Sama paikka molempiin kuviin. Alueen sivu kertoo Siperian uudistuksesta: älä generoi vanhaa tai kuviteltua sisäpihaa nykyisenä; käytä toimivan terassin ajankohtaista geometriaa. Varmista valittu ravintola ja terassin viite ennen generointia.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://finlaysoninalue.fi/)
- [Lähde 2](https://finlaysoninalue.fi/ravintolat-ja-kahvilat/)

**Valmis generointiprompti:**

```text
Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. At a real verified outdoor restaurant terrace in Tampere's Finlayson former factory district, put the lens only 8 to 12 cm above the paving, looking along the walking route between tables. A single ordinary bread crumb a handspan from the lens becomes a striking near-foreground object through perspective, not because it is physically giant. Chair legs create a navigable forest, and a waiter in a blue shirt and dark apron is walking away with a pale tray and a small bread basket. Keep the same waiter and basket for a second shot. Show sufficient true red-brick industrial architecture and tall factory windows to anchor the scene in Finlayson, matching the verified terrace reference. Natural summer courtyard light, appetising but documentary colour. The story is a competent pigeon investigating the route of lunch with absurd seriousness. No people feeding birds, no visible camera pigeon, no cartoon crumb trail, no fake restaurant signs. Use the real present-day terrace layout rather than inventing a generic brick courtyard.
```

### Tampere — tampere / 2

**Tarina:** Toinen kuva on yllätys: pulu nousee ilmaan nähdäkseen, mitä tarjottimella kulkee. Yhden tarjoilijan seuraaminen kuvataan ammattimaisena tiedusteluna. Edellisen kuvan pieni muru vaihtuu koko pihan reiteiksi.

**Näkökulma:** Lento noin 3 m pihan yllä, vinosti alas ja hieman kyljelleen kaartuva näkymä. Sama tarjoilija ja leipäkori kuin kuvassa 1, aidosti eri kuvakulma.

**Jatkuvuus:** Generoi vasta kuvan 1 jälkeen ja käytä sitä kuvareferenssinä. Tavoitteena kaksi peräkkäistä hetkeä, ei kaksi keskenään ristiriitaista ravintolaa.

**Lyhyt kuvateksti (61 merkkiä):**

Tampere: tarjoilun reitti selvisi pienellä ilmatiedustelulla.

**Pitkä kuvateksti (379 merkkiä):**

Pöytien väliin syntyy ylhäältä nähtynä kokonainen reittikartta. Tarjoilija pujottelee tuolien lomitse, asiakkaat väistävät ja leipäkori etenee vakaasti. Samalla Finlaysonin piha paljastaa uuden elämänsä vanhojen tehdasseinien sisällä. Isoisä olisi mitannut matkan askelin. Minä mittasin, montako pöytää kori vielä ohittaa ennen kuin joku avaa sen. Kartanpiirtäjiä on monenlaisia.

**Pelissä pitkän tekstin loppuun:** toimiva Havainnekuva-linkki, `sourceLine: "Matkakirjan havainnekuva"`.

**Paikkatarkistus ennen generointia:** Kuva 1 on tämän kuvan jatkuvuusreferenssi. Pidä piha, rakennukset, aurinko, tarjoilija, tarjotin ja leipäkori samoina. Uusi kuva on oikeasti ilmasta, ei kuvasta 1 tehty rajaus.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://finlaysoninalue.fi/)
- [Lähde 2](https://finlaysoninalue.fi/ravintolat-ja-kahvilat/)

**Valmis generointiprompti:**

```text
Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. This is the second frame of the SAME Finlayson courtyard event. Use the first Tampere frame as the continuity reference: identical verified terrace, buildings, blue-shirted waiter with dark apron, pale tray, bread basket, weather and sunlight. The pigeon has now taken flight about three metres above the courtyard and banks gently, photographing diagonally down across the tables toward that same waiter as the basket approaches a table. The ultra-wide lens shows the routes between chairs and the enclosing red-brick architecture; this is a close flying observer, not a high-altitude drone panorama. Keep the basket an ordinary realistic size, prominent through composition. A slight camera bank and subtle motion at the furthest edges suggest movement while the waiter and basket remain readable. The visual reveal is that this grand aerial survey is actually about following lunch. No added birds, no drawn arrows, no text, no fake miniature-world effect.
```

### Tromssa — tromssa / 1

**Nykyinen luettava matkakirja, taustaksi:** Tromssaan on perustettu museo. Satamasta tuodaan sinne pohjoisen luita ja kiviä, asioita joista laivanvarustaja ei tavallisesti maksa. Pöydällä makasi pieni simpukka ja sen vieressä luu, jonka eläimeen en toivo törmääväni uimassa. Ikkunasta näkyi pyyntilaivojen mastoja. Sama meri ruokkii täällä sekä vatsan että uteliaisuuden. Jälkimmäinen vaikutti pohjattomalta.

**Nykyinen pulun repliikki, taustaksi:** Tromssassa on nyt yliopistokin. Isoisä osui oikeaan: pienestä simpukasta voi alkaa pitkä matka.

**Tarina:** Isoisän simpukka käynnistää uteliaisuuden. Pulu löytää laiturilta tyhjän kuoren ja kohtelee sitä pienenä arvoituksena. Kaupunki saa näkyä tutkimisen ympäristönä, ei pelkkänä taustakulissina.

**Näkökulma:** Polaarimuseon laiturilla muutama sentti lankkujen yläpuolella. Tyhjä sinisimpukan kuori lähellä, aito museorakennus ja satama kauempana.

**Lyhyt kuvateksti (59 merkkiä):**

Tromssa: yksi simpukankuori ja koko meri täynnä kysymyksiä.

**Pitkä kuvateksti (400 merkkiä):**

Tromssan Polaarimuseo toimii vanhoissa tullirakennuksissa meren äärellä. Se kertoo pyynnistä, retkikunnista ja arjesta pohjoisessa. Museon laituri on rakennettu uudelleen vanhojen valokuvien avulla. Laudalle jäänyt simpukankuori ei kuulu näyttelyyn, mutta pysäytti minut silti. Isoisäkin huomasi, että pienestä esineestä voi alkaa suuri uteliaisuus. Minä aloitin tarkistamalla, oliko asunto jo vapaa.

**Pelissä pitkän tekstin loppuun:** toimiva Havainnekuva-linkki, `sourceLine: "Matkakirjan havainnekuva"`.

**Paikkatarkistus ennen generointia:** Nykyinen Polaarimuseon laituri Skansenissa, UiT:n rakennussivu kuvaa laiturin paikan suhteessa varastoon. Ei väitettä, että tämä olisi isoisän vuonna 1873 mainitsema museorakennus: Polaarimuseo tuli tiloihin myöhemmin. Kuori on kohtauksen keksitty arkinen löytö.

**Paikka- ja taustalähteet:**

- [Lähde 1](https://en.uit.no/tavla/artikkel?p_document_id=804921)
- [Lähde 2](https://www.visittromso.no/polar-museum)
- [Lähde 3](https://en.uit.no/om/historie)

**Valmis generointiprompti:**

```text
Create one authentic present-day colour photograph from the first-person viewpoint of Livia, a carrier pigeon with her own camera. Use a full-frame 14 mm rectilinear ultra-wide lens: strong near/far perspective, natural materials, believable depth and light. This is a photograph, never an illustration or CGI scene. The camera is where the bird's eyes would be; the photographer herself is not visible. No floating third-person view of a bird holding a camera. No circular fisheye, fake depth blur, synthetic HDR, text, sticker, watermark, vintage paper or decorative frame. Keep the full composition readable at phone size. Landscape 3:2, deliver 1536x1024 sRGB. Use real current place-reference images for the site geometry; people and incidental events are fictional everyday moments. Place the camera only a few centimetres above the wooden boards of the real Polar Museum pier at Skansen in Tromso, using the museum's current pier and building reference photographs. A small empty blue-mussel shell rests naturally near the lens, its curved interior catching cool northern light; perspective makes it look like a tiny abandoned boat without altering its realistic shape or scale. Beyond it, the pier leads into the correctly oriented historic Customs waterfront buildings now used by the Polar Museum, with a little harbour water and present-day life visible. The shell is tack-readable, the museum still recognisable, with credible optical depth rather than a pasted sharp foreground and blurred background. Clear cool summer daylight with a restrained warm highlight on the old wood. This is an inquisitive pigeon noticing a small mystery, not a wildlife portrait, a food advertisement or a macro photograph with no location. No pigeon in the frame, no fictional new museum architecture, no polar bear props or snow in summer.
```

## Isoisän kahden kuvatekstin kirjoitusmalli — Rooma

Tämä on kuvatekstiluonnos jo olemassa olevan Rooman 1873-kuvan aiheeseen (Pantheonin sisätila ja oculus). Se ei ole uusi kuvatilaus eikä automaattinen nykyisen kuvatekstin korvaus. Tarkista hyväksyttävää lopullista kuvaa vasten ennen käyttöönottoa. Historiallisen kuvan ja PuluCam-kuvan näkökulmat vastaavat toisilleen: isoisä katsoo ylös, pulu alas.

**Lyhyt (50 merkkiä), ei linkkiä:**

Rooma, 1873: Pantheonissa myös sade pääsee sisään.

**Pitkä (430 merkkiä):**

Pantheon on ollut kirkkona jo yli tuhannen vuoden ajan, vaikka sitä katsellessa ajatus karkaa keisareihin. Kupolin aukko on lähes yhdeksän metriä leveä. Se ei ole reikä vaan kokonainen pala säätä. Lattiaan on tehty aukkoja veden poistumista varten. Roomalaiset ovat siis ajatelleet myös sateen lähtöä. Minä odotin sen lähtöä ovensuussa ja pidin kameran kuivana. Roomassa oppii nopeasti eron kärsivällisyyden ja kastumisen välillä.

**Tämän tekstin viimeiseksi elementiksi pelissä:** toimiva **Havainnekuva**-linkki. Linkki avaa selityksen, ei lähdeartikkelia. Kertova teksti säilyy vuoden 1873 isoisän äänenä.

**Taustalähde:** [Pantheonin oma historia- ja rakennussivu](https://www.pantheonroma.com/en/pantheon-history/). Kirkon pitkä historia, avoimen oculuksen koko ja sadeveden poistumisaukot ovat lähteeseen perustuvia; isoisän oma tilanne ja sanavalinnat ovat fiktiota.

## Toimitus takaisin ja pelille

Kuvatoimitus palauttaa arviointijulkaisun yhteydessä kunkin kuvan `cityId`, `order`, URL:n, molemmat kuvatekstit ja mahdolliset kuvaan tarvittavat tekstikorjaukset. Lopulliseen hyväksyttyyn pelitoimitukseen lisätään `sourceLine`, `sources`, `sha256` ja `dimensions`. Tallenna myös käytetty prompti, paikkareferenssit ja versio, jotta korjauksen voi kohdistaa oikeaan kuvaan.

Kenttävastaavuus on nykyinen: `captionShort → lyhyt`, `caption → selite`, `sourceLine → lahde`, `sources → lahteet`. Älä katkaise kuvasarjaa kolmeen, jos hyväksytty rakkauskohtaus sisältää 4–5 kuvaa. Älä lähetä luonnoksen kuvia peliin ennen omistajan hyväksyntää.

Alla olevat rivit ovat **tekstien ja tilaustunnusten manifesti**, eivät vielä pelitoimitus. Niissä ei tarkoituksella ole tekaistuja media-URL:eja tai tarkistussummia.

```json
{
  "orderId": "PULU-CAM-EUROOPPA-20260909",
  "batchId": "PULU-CAM-EUROOPPA-20260909-OHJAUS-01",
  "status": "ready-for-generation-review-before-game",
  "items": [
    {
      "cityId": "firenze",
      "order": 1,
      "series": "pulu-cam",
      "captionShort": "Firenze: Davidin kopio osaa pitää ilmeensä myös lähikuvassa.",
      "caption": "Piazza della Signorian David on kopio. Michelangelon alkuperäinen veistos vietiin vuonna 1873 suojaan Galleria dell’Accademiaan. Aukiolla patsas kuuluu yhä Palazzo Vecchion ympärille levittäytyvään kivisten kertomusten joukkoon. Isoisä vertasi Davidin kättä omaansa. Minä tutkin ilmettä: sama keskittynyt katse joka suunnasta. Malli ei pyytänyt nähdä kuvaa eikä ehdottanut uutta otosta. Arvostan sellaista ammattitaitoa.",
      "sourceLine": "Matkakirjan havainnekuva",
      "sources": [
        "https://www.galleriaaccademiafirenze.it/opere/david-michelangelo/",
        "https://portalegiovani.comune.fi.it/urlnews/webzine/46183.html",
        "https://en.wikipedia.org/wiki/Palazzo_Vecchio"
      ]
    },
    {
      "cityId": "rooma",
      "order": 1,
      "series": "pulu-cam",
      "captionShort": "Rooma: isoisä katsoi aukosta ylös, minä katsoin alas.",
      "caption": "Pantheonin kupolin keskellä oleva oculus on avoin taivaalle. Aurinko kuljettaa valoa sen kautta sisään, ja sade pääsee lattialle asti. Ylhäältä aukko näyttää valtavalta silmältä, jonka takana ihmiset liikkuvat pieninä. Isoisä ihmetteli, miksei näin vanhaa kattoa ollut paikattu. Minusta avoimuudessa on puolensa. Lensin vain ohi ja kurkistin: vieraan kuuluu tietää, milloin hän on toisen talon yllä.",
      "sourceLine": "Matkakirjan havainnekuva",
      "sources": [
        "https://www.pantheonroma.com/en/pantheon-history/",
        "https://www.pantheonroma.com/en/2025/04/24/the-oculus-of-the-pantheon/"
      ]
    },
    {
      "cityId": "tampere",
      "order": 1,
      "series": "pulu-cam",
      "captionShort": "Tampere: tehtaan koneet vaikenivat, tarjoilu jatkuu.",
      "caption": "Finlaysonin entisellä tehdasalueella on nykyään ravintoloita, kahviloita ja kulttuuria. Vanhat punatiiliseinät ovat jääneet, mutta pihoilla kuljetetaan toisenlaisia lasteja. Isoisä seurasi puuvillalankaa työntekijän sormissa. Minä seuraan tarjoilijan kenkiä. Pöydän alta näkee, kuka on juuri syönyt ja kenellä on vielä kaikki edessään. Se on käyttökelpoista tietoa, vaikka sitä ei ole painettu ruokalistaan.",
      "sourceLine": "Matkakirjan havainnekuva",
      "sources": [
        "https://finlaysoninalue.fi/",
        "https://finlaysoninalue.fi/ravintolat-ja-kahvilat/"
      ]
    },
    {
      "cityId": "tampere",
      "order": 2,
      "series": "pulu-cam",
      "captionShort": "Tampere: tarjoilun reitti selvisi pienellä ilmatiedustelulla.",
      "caption": "Pöytien väliin syntyy ylhäältä nähtynä kokonainen reittikartta. Tarjoilija pujottelee tuolien lomitse, asiakkaat väistävät ja leipäkori etenee vakaasti. Samalla Finlaysonin piha paljastaa uuden elämänsä vanhojen tehdasseinien sisällä. Isoisä olisi mitannut matkan askelin. Minä mittasin, montako pöytää kori vielä ohittaa ennen kuin joku avaa sen. Kartanpiirtäjiä on monenlaisia.",
      "sourceLine": "Matkakirjan havainnekuva",
      "sources": [
        "https://finlaysoninalue.fi/",
        "https://finlaysoninalue.fi/ravintolat-ja-kahvilat/"
      ]
    },
    {
      "cityId": "tromssa",
      "order": 1,
      "series": "pulu-cam",
      "captionShort": "Tromssa: yksi simpukankuori ja koko meri täynnä kysymyksiä.",
      "caption": "Tromssan Polaarimuseo toimii vanhoissa tullirakennuksissa meren äärellä. Se kertoo pyynnistä, retkikunnista ja arjesta pohjoisessa. Museon laituri on rakennettu uudelleen vanhojen valokuvien avulla. Laudalle jäänyt simpukankuori ei kuulu näyttelyyn, mutta pysäytti minut silti. Isoisäkin huomasi, että pienestä esineestä voi alkaa suuri uteliaisuus. Minä aloitin tarkistamalla, oliko asunto jo vapaa.",
      "sourceLine": "Matkakirjan havainnekuva",
      "sources": [
        "https://en.uit.no/tavla/artikkel?p_document_id=804921",
        "https://www.visittromso.no/polar-museum",
        "https://en.uit.no/om/historie"
      ]
    }
  ],
  "historicalCaptionDraft": {
    "cityId": "rooma",
    "series": "isoisa-1873",
    "order": 1,
    "status": "caption-draft-match-to-existing-reviewed-image",
    "captionShort": "Rooma, 1873: Pantheonissa myös sade pääsee sisään.",
    "caption": "Pantheon on ollut kirkkona jo yli tuhannen vuoden ajan, vaikka sitä katsellessa ajatus karkaa keisareihin. Kupolin aukko on lähes yhdeksän metriä leveä. Se ei ole reikä vaan kokonainen pala säätä. Lattiaan on tehty aukkoja veden poistumista varten. Roomalaiset ovat siis ajatelleet myös sateen lähtöä. Minä odotin sen lähtöä ovensuussa ja pidin kameran kuivana. Roomassa oppii nopeasti eron kärsivällisyyden ja kastumisen välillä.",
    "sourceLine": "Matkakirjan havainnekuva",
    "sources": [
      "https://www.pantheonroma.com/en/pantheon-history/"
    ]
  }
}
```
