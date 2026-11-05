# Codex-tilaus 24g (Tripo 3D -sessio): Riemukaaren malli kuvista #2097 (Karttaseppä 5.11.2026)

Omistaja 5.11. klo 18.21 (kortti "Kelpaako Riemukaari malliksi?"): "Kelpaa (Suositus)". KK:n välittämä tilaus: "molemmille kapeille sivuille Wagramin puoli, kaaret oikeasti auki, ei puistorengasta." Omistajalle on kerrottu: noin 20 % leveämpi suhteessa ja suuri kaari kapeampi kuin oikeassa. **Kokemus: kaari tunnistuu heti ylhäältä ja viistosta, ja sen läpi näkee.** Tripon pysyvä lupa (Raamattu 7.15, 11.6). Yksi malli. Ei junaan.

**Tärkein ehto: kaaret ovat oikeasti auki läpi, sekä suuri että kapeat.** Kuvissa aukot ovat tummia ja kapeat näyttävät ovilta, mutta niissä ei ole ovia eikä seinää.

## ENSIN: varmista syöte, ennen kuin käytät krediittejä
Syöte on `riemukaari/tripo-syote/` (`SHA256SUMS` samassa kansiossa, mitat `mitat.json`). Kuvat ovat samassa mittakaavassa ja samalla maaviivalla (y = 970). **Älä käytä `_review-sarja-24/riemukaari/`:n sivukuvia syötteenä.**

| Tripon paikka | Tiedosto | Kuvassa |
|---|---|---|
| Front | `ita.png` | leveä sivu, suuri kaari (Champs-Élysées) |
| Back | `lansi.png` | leveä sivu, suuri kaari (Grande Armée) |
| Left | `pohjoinen.png` | kapea sivu, kapea kaari (Wagram) |
| Right | `pohjoinen.png` | sama kuva |

Sama kuva kahdessa paikassa on tarkoituksellinen, kuten Eiffelissä. **Varmista ennen krediittejä, että Tripo ottaa sen; jos ei, pysähdy ja viesti minulle postilaatikkoon.** Left ja Right voivat olla kumpin päin tahansa, koska kuva on sama.

**`etela.png` ei ole syöte eikä esikuva:** siinä on väärin suurten julkisivujen patsasryhmät, ja se on 15,6 % leveämpi. Kapeille sivuille ei tule patsasryhmiä.

**Tarkistuslähde, ei syöte:** `_review-sarja-24/riemukaari/`:n `viisto-lounas.png`, `viisto-koillinen.png`, `ylhaalta.png` ja `oikea.jpg`, sekä `riemukaari/jalanjalki.png`. Viistot ovat noin 33° horisontista eivätkä 65°, ja `ylhaalta.png`:n rakennus on noin kaksinkertainen, joten vertaa muotoa, älä kulmaa tai kokoa. Ei vanhoja kuvia eikä malleja. Ei Googlen laattoja (2.91). Pohja `docs/moduulit/tuotantopohjat/codex-3d-toimitus.md`.

**Kaksi epäonnistunutta ottoa → viesti minulle ennen kolmatta.** Epäonnistunut tarkoittaa esimerkiksi umpeutunutta kaarta, väärää suhdetta, kadonnutta päälistaa tai kattoa tai kapean kaaren tilalla olevaa ovea.

## Malli `riemukaari.glb`
- **Käyttö:** kartan esine, jota katsotaan ylhäältä ja viistosta kaikista suunnista. **LIIKE:** ei liikettä, ei luurankoa.
- **Suhteet sitovat, sallittu ero 5 %.** Nämä ovat kuvien suhteet, eivät oikean rakennuksen, ja omistaja on hyväksynyt ne. Leveys päälistan kohdalta 1,00. Syvyys 0,49. Kokonaiskorkeus 0,90.
- **Suuri kaari:** kulkee läpi syvyyssuunnassa (Front–Back). Leveys 0,226 ja korkeus 0,564 leveydestä, keskellä leveyttä. Holvattu yläosa.
- **Kapeat kaaret:** kulkevat läpi leveyssuunnassa (Left–Right). Leveys 0,149 ja korkeus 0,388 leveydestä, keskellä syvyyttä. Holvattu yläosa. Ne leikkaavat suuren kaaren keskellä.
- **Pinnat:** aukkojen sisäseinät ja holvit ovat samaa kiveä kuin julkisivu. Kuvien tumma aukkoväri ja kapean sivun ovilevyt eivät saa jäädä pinnoiksi. Patsaat saavat yksinkertaistua, mutta niiden paikat säilyvät. Ei läpinäkyvyyttä; aukko on oikea reikä geometriassa.
- **Jos Tripo jättää aukot umpeen:** leikkaa ne Blenderissä yllä olevilla mitoilla (kaksi ristikkäistä holvattua leikkuria), teksturoi sisäpinnat kivellä ja kirjaa se `huomiot.md`:hen. Tämä ei ole epäonnistunut otto, jos ulkomuoto säilyy.
- **Pakollinen aukkotesti, luvut `huomiot.md`:hen:** ortografinen kuva Front- ja Left-suunnasta tasaisella taustavärillä. Laske, kuinka suuri osa aukon alueen pikseleistä on taustaväriä suuressa ja kapeassa kaaressa. Tavoite vähintään 90 %, poikkeuksena vain holvin kaari ja sisäseinien perspektiivi.
- **Akselit ja pivot:** +Y ylös. Front-kuvan puoli (`ita.png`) kohti +Z, leveä sivu X-akselin suuntaisena. Origo jalanjäljen rajauslaatikon keskellä, alin piste y = 0, skaala sovellettuna. Mittakaava: 1 yksikkö = 1 m leveydellä 188 m. Skaalaa akselit yhtä paljon, älä litistä. Kirjaa lopulliset akselit `huomiot.md`:hen.
- **Pelkkä rakennus:** ei maata, puistorengasta, puita, ihmisiä, telineitä eikä kiveystä. Maapohjan teen itse.
- **Tiedosto:** GLB, kaikki upotettuna, ei Dracoa, enintään 15 Mt, enintään 300 primitiiviä, tavoite yksi materiaali, tekstuuri enintään 2048. Portin raja on 100 000 kolmiota. Ei varjoja tekstuuriin.

## Kevennys
Yli 30 000 kolmiota tai yli 2048 tekstuuria: kevennä Tripon omilla työkaluilla ja toimita molemmat, jos kevennys umpeuttaa aukot tai rikkoo UV:t. Aja aukkotesti myös kevennetylle. Louvren oppi: kevennys voi romahduttaa UV:t, eikä `codex-3d-tarkistus.mjs` huomaa sitä. Laske nollan UV-alan kolmiot, niiden 3D-ala ja mustat pikselit jokaisesta esikatselusta, ja kirjaa luvut `huomiot.md`:hen. Katso kaikki kuvat täysikoossa.

## Toimitus `riemukaari-3d-v1/` (aja ensin `node tools/codex-3d-tarkistus.mjs`)
`riemukaari.glb`, `SHA256SUMS`, `LAHTEET.md`; `esikatselu/{raaka,kevyt}-{ita,lansi,pohjoinen,etela}.png`, `esikatselu/ylhaalta.png`, `esikatselu/aukkotesti-{front,left}.png`, pakolliset `esikatselu/pelikulma-{lounas,koillinen}.png` noin 60°:n kulmasta; `huomiot.md`: syötepaikat, akselit, kolmiot, tekstuuri, koko ennen kevennystä ja sen jälkeen, otot, mitatut suhteet, aukkotestin luvut, UV-luvut, krediitit.

Viesti vain claude/postilaatikko-haaraan. Muita sarjan kohteita ei tehdä Tripolla tämän tilauksen nojalla.
