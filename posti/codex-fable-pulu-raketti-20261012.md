# 12.10.2026 — Codex → Fable: Pulu raketin kyydissä, ensimmäinen profiiliehdokas (1/8)

Tilaus luettu kokonaan ja kaikki seitsemän hahmo-/peliviitettä katsottu. Uusia paikallisia tiedostoja tai samoja R2-avaimia ei ollut ennen aloitusta. Käyttäjän yhden kuvan kerrallaan tehtävän palautevaiheen mukaisesti tehtiin vain ensimmäinen kuva yhdellä sisäisellä ImageGen-generoinnilla. Muut seitsemän kuvaa odottavat palautetta; niistä ei ole annettu generointikutsuja. Vanhoja #70/#71 tauotettuja jonoja ei jatkettu.

- Tiedosto: `pulu-raketti-pito-profiili.png`
- Ensisijainen paikallinen toimitus: `/Users/Shared/Claude/proto-3d/_tyo/codex-pulu-raketti-20261012/toimitus/pulu-raketti-pito-profiili.png`
- R2: https://media.matkakirja.app/karttanostot/20261012/pulu-raketti/pulu-raketti-pito-profiili.png
- SHA-256: `e2c4c9af400ca37b4214c59b4affea6edc4cd233b93c72b37d381d6d5270e01e`
- Muoto: PNG 1024 × 1024, RGBA, straight alpha, sRGB, 294481 tavua.
- Kiinnityspiste: `[353, 490]`. Tämä on alemman vasemmalle ojentuvan siiven/rukkasen ulkoreuna; vatsan kontakti ei ole samassa tasossa.
- Kypärän keskipiste: `[534, 347]`; halkaisija noin `300` px, manuaalisen ulkokehän arvion perusteella.
- Katse: Ylävasemmalle kohti kuvan yläreunaa, ei kameraan.

## Ensimmäisen oton puutteet

Vatsa ei ole samassa vasemmanpuoleisessa kosketustasossa siipien kanssa; asento jää osin kiipeäväksi eikä täysin runkoon painautuvaksi ratsastukseksi. Visiiri on hieman etuviistossa ja katse ylävasemmalle, joten aivan puhdas sivuprofiili ja suora ylöspäin suunta eivät täysin toteudu. Uusi generointi lisää puvun ja kypärän yksityiskohtia ja pehmeämpää varjostusta: viitehahmon täsmällistä piirrostyyli-identtisyyttä ei väitetä.

Näkyvän alfa128-rajauksen ulkopuolella, neljän pikselin marginaali huomioiden, 614 pikselissä on erittäin heikko alfa 1/255. Valkoisella ja tummalla taustalla ei havaittu selvää valkoista haloa, mutta täysin alfa0-taustaehto ei kaikissa matalissa jäämissä toteudu. Kuvan uloimmat rivit ja sarakkeet ovat alfa0. Rakettia, alustaa, tekstiä, numeroita, logoja, lippuja, vesileimaa tai taustarakennetta ei havaittu.

Tilauksen mukaisesti tämä ainoa ensimmäinen ehdokas toimitetaan puutteineen; uusintaa tai varianttia ei tehty. Koko generoitua spriteä skaalattiin yhdenmukaisesti kypärän noin 300 px mittakaavaan ja asetettiin 1024 × 1024 läpinäkyvälle kankaalle. Poseerausta, kasvoja, raajoja tai taustaa ei retusoitu. Natiivikuva säilytettiin.

Paikallinen kopio on SHA-256/tavujen perusteella sama kuin R2-kuva. R2 HTTP 200, image/png, CORS sekä SHA-256/takaisinluku varmistettiin myös suorasta URL:sta. Manifesti: `posti/kuvatoimitus-pulu-raketti-20261012.json`. Omistajan palaute, Linssiseppä 2:n pelikytkentä ja julkaisu ovat erillisiä vaiheita. Tämä on 1/8 toimitus, ei koko tilauksen valmistumiskuittaus.
