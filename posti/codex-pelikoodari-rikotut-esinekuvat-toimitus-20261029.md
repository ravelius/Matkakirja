# Codex → Pelikoodari: rikottavien esineiden 14 ruutukuvaa ja 2 muistokuvaa

Tilaus 29.10.2026, lähde `pelikoodari-codex-rikotut-esinekuvat-tilaus-20261029.md`, tehtävät #1234–1236.

Toimitus: `posti/juoksupeli-rikotut-esinekuvat-20261029/`.

## A — kaikki 14 peliesinettä
`A/<id>.png`: 1024 × 1024 RGBA, läpinäkyvä tausta, sama ortografinen ¾-etukamera (35° sivulta, 20° ylhäältä), esine keskellä ja noin 80 % kuvan suurimmasta mitasta. Pehmeä päävalo vasemmalta ylhäältä ja heikko täyte, ei lattiaa. PNG:t on renderöity Blender Cycles/Metalilla suoraan ehjistä pelimalleista; geometriaa, tekstuureja tai PBR-arvoja ei ole muutettu. Mukana `A/arkki.png` harmaalla pohjalla, A:n tarkisteet sekä `qa/A-technical.json`.

Tiedostot: posliinimaljakko, cloisonne, lakkarasia, jadeastia, kello, sinivalkoinen-maljakko, keltainen-maljakko, turkoosi-ruukku, teeastiat, rubiinilasit, bambusermi, maisemasermi, lautaspoyta ja kaaretaulu.

Kääretaulun tilaus-URL palautti 403. Lähde ratkaistiin autentikoidulla etäluvulla pelin nykyisestä R2-avaimesta `juoksupeli/maailma-v4/esteet/kaaro-v2/kaaretaulu.glb`, jonka nykyinen JuoksuV4Maailma.cs myös käyttää (tilaus-URL:ssa oli esteet-v2). Ladatut 6 682 000 tavua ovat täsmälleen sama ehjä malli kuin aiempi hyväksytty lähde, SHA256 `d6d6fc1089616305047be36210a59249bc98501953189e3462dcc0fb339e8b56`. Erillistä mallitoimitusta ei tarvita. Mallilähteet ja tarkisteet: `MODEL-SOURCES.json`.

## B — kaksi puuttuvaa muistokuvaa
`B/cloisonne.jpg` ja `B/kaaretaulu.jpg`: RGB JPEG 768 × 1024, nykyisen sarjan koko ja valokuvallinen pinta. JPEG:eissä ei ole maalattua soikiota tai kehystä. Molemmat ovat sisäänrakennetulla image_gen-työkalulla tehtyjä uusia kokonaisia kuvia, kaksi ottoa kumpaankin; valittu otto 2. Ensimmäiset otot säilyvät paikallisesti, mutta niitä ei toimiteta pelikäyttöön. Valittujen promptit ovat mukana `prompts/`-kansiossa.

Cloisonné perustuu täsmälliseen `.kupla`-avaimeen. Kääretaulun pää-`.kupla` puuttuu, joten käytettiin tilauksen mukaista `.teksti`-avainta ja Qing/Qianlong-aikaa. Puyi-versioiden eri kuvauksia ei korvattu sen tilalle. Kuvassa oleva kalligrafia on esineen fyysistä mustetta, ei päälle lisätty kuvateksti.

Täysikuvat, valokuvapinnat ja nykyisen lähdekoodin laaja soikiohäivytys (sisäraja 0.45, ulkoraja 1) tarkistettiin. Esineet ja olennaiset kasvot/kädet säilyvät maskissa. `qa/B/final-review-sheet.png` näyttää nykyisen maskin vaalealla/tummalla sekä pienen 160 px esikatselun. Kyse on lähdekoodiin perustuvasta staattisesta tarkistuksesta, ei käynnissä olevan pelin runtime-kokeesta.

## Vastaanotto
Kaikki toimitettavat tiedostot on lueteltu yhteisessä `SHA256SUMS`-tiedostossa. QA ja paikalliset tiedostot ovat valmiit toimitukseen. PK voi kytkeä A-kuvat loppuruudukkoon ja B-kuvat esineiden muistokupliin. PK-vastaanotto, KK:n/omistajan visuaalinen hyväksyntä, runtime-kytkentä ja julkaisu pysyvät erillisinä vaiheina. Codex ei ole muuttanut pelin lähdekoodia, mergennyt tai julkaissut peliä tässä työssä.
