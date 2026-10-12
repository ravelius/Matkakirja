# Nassau — kirjoitusmuistiinpanot C, tehtävä 17

12.10.2026. Tila: C-tekstiluonnos kirjoitettu ja paikallisesti tarkistettu, kokonaiskaupunki partial. Vain e12/nassau ja oma väliaikaiskansio. Ei Git-operaatioita, kuvatyötä, pelikytkentää tai julkaisua.

## Kirjoitetut osiot

- Artikkeli: intro 920 merkkiä, 2 kappaletta, 9 virkettä, 2 lihavointia; Lue lisää 915 merkkiä, 3 kappaletta.
- Kansi + historia: 4 + 4 nostoa (475, 492, 496, 477 / 489, 492, 505, 501 merkkiä), kaksi johdantoa, teemasivun minitehtävä.
- Matkailijalle: viiden virkkeen kappale, 5 opasjaksoa, 5 parasta-riviä, 3 hyvaTietaa-riviä.
- 5 kysymystä (tasot 1–3), 3 tiedot-merkkijonoa.
- Kartta partial: 3 omaan Wikipedia-pisteeseen perustuvaa kohdetta ja 3 kohdejuttua (769, 802, 802 merkkiä, kaksi kappaletta kullakin).
- Kaikki 21 kuvaroolia neljällä tyhjällä kentällä; saatiedot:null.

## Alkuperäisen tarkistimen tulos

Komento `node paakaupungit-pilvi/tyokalu.mjs tarkista e12 nassau --lyhyt`, todellinen exit 1: **21 virhettä, 3 varoitusta, 0 kuvaa**. Vain virhetyyppi `tiedosto puuttuu`, kaikissa kuvaroolien paikoissa. Ei tekstien tai rakenteen konevirheitä. Tarkistinta ei muutettu, virheitä ei piilotettu. Täysi paikallinen ajo paljasti varoitustyypit:

1. Kysymys 2: source ei ole Wikipedia-artikkeli. Lähde on ohjeessa sallittu Wikivoyagen Nassau/See (conch-ruoat), ei lähteetön kysymys.
2. Kohteita 3, pohjataso 6. Kyseessä rajattu kolmesta varmennetusta pisteestä tehty kartta; kattavuusportti avoin, ei hyväksytty pienkaupunkipoikkeus.
3. Saatiedot puuttuu. saa.json on olemassa, mutta 48/48 primäärivarmennusta ei ole osoitettu; numerot jätettiin koskematta.

Alkuperäiset stdout-lokit ja todelliset exit-koodit: `valiaikainen/nopea-e12-nassau/tarkistus-lyhyt.txt`, `tarkistus-kaikki.txt`, `tarkistus-exit.json`. HTML/teksti/metatiedot ja lähdehakujen SHA:t samassa kansiossa; `lahdehakujen-todiste.json` on yhteislokista poimittu oman työn todiste.

## Toimitukselle ja kuvaputkelle

Faktapohjassa kirjattu: New Providencen väkiluvun laajuus ja lähteen eri lukema; portaiden 65/66-ristiriita; ongelmallinen Victorian orjuuden lakkauttamisväite; kirjaston 1837/1873-ristiriita; epävarma Junkanoo-etymologia. Näitä tarkkoja väitteitä ei siirretty tekstiin. Lentoasemasta ehdotetaan nimeä, ei lähteestä tarkistamatonta IATA-koodia.

Kuvatarve: valokuva; 3 laajaa kaupunkikantta; Junkanoon käsityö, Kuningattaren portaat, Bay Street/Straw Market, Paradise Island ilman modernia suojattua rakennusta kohteena; historianostojen 4 dokumentti-/historiakuvaa; oppaan maltillinen pysty ja 5 jaksokuvaa; Fincastlen, portaiden ja Charlotten kohdekuvat. Lopulliset kuva-aiheet, oikeudet, tekijäketjut ja kuvatekstit vahvistetaan kuvaputkessa. Mitään kuvaa ei ole valittu tai katsottu tässä työssä.

Avoinna: B, kartan 6–8 kohteen kattavuus, sääauditointi, riippumaton D/E/F, toimitushyväksyntä, pelikytkentä ja julkaisu. Tämä kirjoittaja ei voi tehdä oman tekstinsä riippumatonta tarkistusta.

## Tiedostojen SHA-256

- `faktapohja.md`: `be1a03774cccf47fd0678729ca8bc81e5401d655b46440c0fe74ca0b8fe4ea6a`
- `sisalto.json`: `76571e04610b6d59a6d3b99ce50e59f317ffdafeca3c74af4e8d0f557111836d`
