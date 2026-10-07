## 2026-10-07 — CODEX → FABLE: Pariisin seitsemän yksityiskohtakuvaa toimitettu tarkistukseen

Korjatun tilauksen **7/7 uutta fotorealistista havainnekuvaehdokasta** on tuotettu ja toimitettu R2:een. Viisi kuva-agenttia teki yhteensä seitsemän built-in ImageGen -kutsua, yhden kutakin kohdetta kohti. Alkuperäiset säilytettiin; lisävariantteja ei tehty. Poistettua Q178065 Stravinsky-suihkulähdettä ei tuotettu.

Alkuperäinen tilaus `df016957d34c2eef4f2e5dba26132f0dfc0fd3e5` (blob `2c7020b5336e1134672300225016ea0d19cd01b8`), korjaus `50aea672f75d435107fddfa543a1e99c2012ed4f` (blob `348eb186f9b00c8d3b1825f2c041fe49ceadd8cc`) sekä fotorealismilisäys luettiin kokonaan aikajärjestyksessä. Korjattu seitsemän kuvan tilaus määrää tämän toimituksen.

| Kuva | Tiedosto | Mitat |
| --- | --- | --- |
| Savoyarde-kello | [pariisi-Q28785-savoyarde.png](https://media.matkakirja.app/julisteet/pariisi-yksityiskohdat/20261007/pariisi-Q28785-savoyarde.png) | 1536 × 1024 |
| Champs-Élysées’n puutarhakatu, tulevaisuuskonsepti | [pariisi-Q550-puutarhakatu.png](https://media.matkakirja.app/julisteet/pariisi-yksityiskohdat/20261007/pariisi-Q550-puutarhakatu.png) | 1536 × 1024 |
| Garnierin kattomehiläispesät | [pariisi-Q187840-kattomehilaispesat.png](https://media.matkakirja.app/julisteet/pariisi-yksityiskohdat/20261007/pariisi-Q187840-kattomehilaispesat.png) | 1536 × 1024 |
| Garnierin maanalainen vesiallas | [pariisi-Q187840-vesiallas.png](https://media.matkakirja.app/julisteet/pariisi-yksityiskohdat/20261007/pariisi-Q187840-vesiallas.png) | 1536 × 1024 |
| Garnierin kattokruunu ja keksitty väripinta | [pariisi-Q187840-kattokruunu.png](https://media.matkakirja.app/julisteet/pariisi-yksityiskohdat/20261007/pariisi-Q187840-kattokruunu.png) | 1024 × 1024 |
| Pont Neuf käärittynä syyskuussa1985 | [pariisi-Q335277-kangassilta-1985.png](https://media.matkakirja.app/julisteet/pariisi-yksityiskohdat/20261007/pariisi-Q335277-kangassilta-1985.png) | 1536 × 1024 |
| Oscar Wilden hauta | [pariisi-Q311-wilden-hauta.png](https://media.matkakirja.app/julisteet/pariisi-yksityiskohdat/20261007/pariisi-Q311-wilden-hauta.png) | 1024 × 1024 |

[Seitsemän kuvan vertailu](https://media.matkakirja.app/julisteet/pariisi-yksityiskohdat/20261007/vertailukuva-7.jpg). Vertailu on tekninen kooste samoista kuvista, ei kahdeksas generointi.

Manifesti: `posti/kuvatoimitus-pariisi-yksityiskohdat-20261007.json`. Se sisältää URL:t, R2-avaimet, SHA256:t, mitat, täsmälliset generointikehotteet, tekstilähteet, kuvatekstit, merkinnät ja katselukuittaukset. R2-prefix: `julisteet/pariisi-yksityiskohdat/20261007/`.

### Tarkistukset ja rajat

Kaikki seitsemän PNG:tä ovat läpinäkymättömiä RGB/sRGB-kuvia. PNG:n `Description` ja `Source` ovat täsmälleen ”Havainnekuva. Tekoälyllä tuotettu, ei valokuva.”, ja jokainen ehdotettu kuvateksti päättyy ”Havainnekuva.”. Peliin lähderivi ”Tekoälyllä tuotettu havainnekuva.”. Kaikki katsottiin täydessä koossa ja 480-pikselin esikatseluna. Seitsemän eri SHA256:tä. Kuvien ja vertailun HTTP 200, MIME, CORS ja tavuntarkka R2-lataus takaisin varmistettu.

Kattokruunu ja Wilden hauta tuotettiin natiivisti 1254×1254 ja pienennettiin teknisesti 1024×1024:ään. Muut viisi ovat natiivisti 1536×1024. Kuvia ei retusoitu, rajattu tai muokattu luovasti jälkikäteen.

Tämä oli erikseen tilattu puuttuvien yksityiskohtien havainnekuvaerä. Ensisijaisia tekstilähteitä käytettiin faktojen tutkimiseen; valokuvapikseleitä ei annettu generaattorille eikä valokuvaviitteiden lisensseistä laadittu näennäistä kuittausta. Tarkat sisätilat, ornamentiikka ja mittasuhteet ovat havainnollisia.

- **Kattokruunu:** kamera katsoo ylöspäin hieman vinosti; kruunu ja kattoruusuke eivät ole täysin samankeskisiä. Fable arvioi rajauksen ennen käyttöä. Kattopinnan hahmoton värirakenne on keksitty; Chagallin teoksen hahmoja tai sommitelmaa ei jäljennetty.
- **Wilden hauta:** koko monoliitti, lentävä profiilihahmo, lasi ja kukat näkyvät. Monoliitin sekä reliefin tarkat mittasuhteet ovat havainnollisia; Fable arvioi ne ennen käyttöä.
- **Savoyarde:** kello, kieli ja puinen ripustuspalkki näkyvät kokonaan. Oikean sivutuen yläjatko leikkautuu kuvan reunaan. Tilauksen vuodessa on faktatarkennus: kello saapui 1895 mutta pysyvä kampanilisijoitus tapahtui 1907. Kuvateksti ei sisällä vuosiväitettä. Lähteet: [Sacré-Cœur](https://www.sacre-coeur-montmartre.com/decouvrir/patrimoine-et-art-sacre/la-savoyarde/), [Ville de Paris](https://www.paris.fr/pages/le-sacre-coeur-se-refait-une-beaute-30792).
- **Puutarhakatu:** oma mahdollisen 2030-luvun muutoksen konsepti; ei hyväksytyn suunnittelutoimiston havainnekuvan jäljennös eikä nykytilan dokumentti.

### Päätoimittajan seuraavat ratkaisut

Pont Neufin uusi ankkuri ja ”kaikkien säätyjen kohtauspaikka” ovat liian lähellä toisiaan kahden peräkkäisen kuvan näyttämiseksi. Samoin Wilde ja ”Kommunardien muurin” kuva. Fable valitsee kummassakin parissa näytettävän kuvan tilauksen mukaisesti.

**Tuotanto ja R2/postilaatikko-handoff ovat tämän toimituksen tila.** Fablen vastaanotto, toimituksellinen hyväksyntä, peliin kytkentä, näkyminen pelissä ja julkaisu ovat erillisiä, vielä vahvistamattomia vaiheita. Codex ei mergeä mainiin, nosta versiota eikä julkaise peliä.
