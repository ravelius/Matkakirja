# Invalides otto 2 — lähdepreflight

TILAUS-24, 24d ja 24e luettu kokonaan. Lähde #2114: commit 489788225d36c1c95d3a4c1168ca5a4953f0b4e6, blob a4a13cebd1e4c31ed67fbd1fabc7877db6f6aa2a. Omistajan #2115 sallii rinnakkaisen valmistelun ja tuotannon kapasiteetin vapauduttua; root antoi tämän kohteen tähän agenttiin Opéran valmistuttua. Nykyisen manifestin kaikki 38 tiedostoa varmennettu.

## Lähdekuvat
- Koko korttelin pohjan mittari: IGN, 2018, BD Ortho, Commons-tiedosto Paris - Orthophotographie - 2018 - Hôtel des Invalides 01.jpg. https://commons.wikimedia.org/wiki/File:Paris_-_Orthophotographie_-_2018_-_H%C3%B4tel_des_Invalides_01.jpg . Commonsin ilmoittama lisenssi Licence Ouverte 1.0 (ei CC-niminen; tilaus24e ehdotti nimenomaan tätä sarjaa). Attribuutio: Institut national de l'information géographique et forestière (IGN), orthophotographie 2018; alkuperäaineisto https://www.data.gouv.fr/fr/datasets/orthophotographie-a-59cm-pixel-extraits-bd-ortho/ ; lupa https://www.etalab.gouv.fr/licence-ouverte-open-licence . Muuttamaton alkuperäinen6055×8073JPEG,18949410tavua, SHA256 0bd26b34f519a820493b179a5835518160df5c29a3f1e558259ab5e1716ce2b6. Metadata source/orthophoto-metadata.json.
- Koko rakennus ja korkeusmuoto: Eric Gaba (Wikimedia Commons user Sting), elokuu2002, Invalides aerial view.jpg. CC BY-SA3.0 https://creativecommons.org/licenses/by-sa/3.0/ ; https://commons.wikimedia.org/wiki/File:Invalides_aerial_view.jpg . Sama muuttamaton alkuperäinen kuin #2093:n oikea.jpg; Commonsissa2016 tehty värikorjaus. SHA256 be26db0e706c70f52a9feb49a30533ccfd5cc3b8fc5a153b4e9b073d90c159f9.
- Kuvat ovat pohjan/rakenteen lähteitä. Tuotanto on kokonaan uutta piirrosgenerointia; valokuvia ei rajattu, väritetty eikä osia kopioitu tuotantokuviin. Lähde- ja attribuutiotiedot säilytettävä.
- Hyväksytty maapohja: #2093:n toimitettu pohja-uusi.png kopioitu source/hyvaksytty-pohja-v1.png. Korjattaviksi on valtuutettu vain kaksi pohjoista vaaleaa korttelilaikkua x650–700/y70–145 ja x810–865/y45–185.

## Suunta: kaksi riippumatonta maamerkkiä
#2116 (ae84ac494024640ab4c13491a6686a6053391cf1) huomioitu. Pohjoispää päätelty esplanadin pitkän puistokäytävän jatkumisesta kohti Seineä (vanha kokonaisvalokuva ja pyyhitty.png); eteläpää kupolikirkon edessä olevasta Place Vaubanin kaarevasta aukiosta. Kunniapihan pitkä pääportti on pohjoisessa, kultakupoli etelässä. IGN-ortokuvan yläreuna näyttää esplanadin ja alareuna Vaubanin suunnan: ei 180°-käännöstä. Orto on rakennusakseliin lähes suoristettu, joten sen pikselisuuntaa ei väitetä tarkaksi maantieteelliseksi pohjoiseksi. Tuotanto suunnataan jalanjalki.png:n mukaan: pitkän sivun akseli94° idästä myötäpäivään, eli etelään mentäessä noin4° länteen. Viitekuva säilytetään muuttamattomana; uusi yläkuva piirretään oikeaan karttakiertoon.

## Mitat
Museon oma Patrimoine : le Lanternon (19.7.2022) tarkistettu nyt: https://www.musee-armee.fr/magazine/patrimoine-le-lanternon.html mainitsee107m. Tässä käytetään noin107m koko kultaisen kupolin/lyhdyn/kärjen tavoitekorkeutena tilauksen24e mukaan. Siipien noin25m ja todellinen verhokäyrä274×256m ovat Karttasepän mallinnusohje, eivät tässä tehty riippumaton rakennusmittaus. Mallin388×363m on pelin jalanjälki, ei kuvan korkeussuhteen nimittäjä.

## Topologinen tarkistus
Orto vahvistaa24e:n perusjaon: suuri avoin kunniapiha pohjoisessa, sen kummallakin puolella kaksi pienempää pihaa; kupolikirkko eteläisessä keskiosassa ja pitkä kirkkokatto kunniapihalle; lounaisen korttelin kolme erikokoista pihaa, kaakkoisen korttelin neljä pihaa, näistä etelämpänä erillinen U-siipi. Kupolin etupuolella ja lounaiskulmassa on avointa tilaa; niitä ei täytetä rakennuksilla. Vuoden2018 orton kunniapihan väliaikaiset vaaleat katokset, puut ja pysäköinti jätetään pois.

## Hakukäytännön kuitti
#2120:n mukaisesti hakuvuoro varattu vain tälle kohteelle rootin kautta. Robots.txt luettu erikseen. Sen jälkeen yksi virallinen haku, yksi metadatapyyntö ja yksi kuvalataus peräkkäin, tunniste MatkakirjaSourceReview/1.0 ilman henkilötietoja; ei429-vastauksia. Ei Overpassia. Lähdehakuvuoro vapautettu rootille.


## Tekninen syötekorjaus

Ensimmäinen ImageGen-kutsu palautti HTTP400 invalid_image_file, nolla kuvaehdokasta. Alkuperäinen18,9Mt orto säilytetty. Samasta lähteestä haettiin Commonsin virallinen1280×1707JPEG-esikatselu (863693tavua, SHA256615cd5193bc8d99f2eb52a500c0ba7b70b580e4cbcb6a550a417ab230ca6b8d4), katsottu ennen käyttöä; paikallisia pikselimuokkauksia ei tehty. Root vahvisti saman näkymän teknisen uudelleenlähetyksen. Työkalukutsujen todellinen määrä ja8kuvallisen näkymän raja pidetään erillään. Uusi metadatapyyntö ja lataus tehtiin uudelleen yksin varatulla Wikimedia-vuorolla, ei429-vastauksia.
