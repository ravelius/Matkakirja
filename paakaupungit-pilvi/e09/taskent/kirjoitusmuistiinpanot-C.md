# Taškent — C-luonnos 12.10.2026

Omistus sessio 05, vain e09/taskent. Rajattu A ja kokonainen C-tekstiluonnos tallennettu NAS-kloonissa. Täysi kaupunki, hyväksyntä, pelikytkentä tai julkaisu ei ole valmis. Antananarivo tallennettiin ja tarkistettiin ennen tämän kaupungin aloittamista.

Oman kloonin AGENTS.md/CODEX.md ja konteksti luettu. PILVIOHJE, lehtityöresepti, kaupunkilehden mitat/kuvat/toistuvat viat, mantereiden yhteiset ja Aasian linjaukset tarkistettiin samaksi kuin tässä sessiossa e08:sta luetut ohjeet. Luku 13 ja LISÄSÄÄNTÖ käytössä. Dakar-rakennemalli tallennettu omaan väliaineistoon. Ei uusia agentteja tai sessioita.

## Kirjoitetut osiot

- Artikkeli: intro **1002** merkkiä ja kolmikappaleinen Lue lisää **969**.
- Kansi 4 nostoa, historia 4 nostoa ja minitehtävä. Nostot **469–520** merkkiä.
- Matkailijaosio ja opas 5 jaksoa, 5 parasta-riviä, 4 hyvä tietää -riviä.
- Visa 5 kysymystä, tasot 1–3, lähdeosoitteet; 3 tietoa ilman isoisän ääntä.
- Kartta partial 1/6–8: Kukeldashin oma WP-piste; kaksikappaleinen kohdejuttu **882** merkkiä.
- Kaikki 19 kuvaroolia tyhjiä, sää null.

Maalehden maanjäristys-, metro-, ruoka-, käsityö- ja tiedetarinoita ei toistettu. Televisioaihe poistettiin museokoosteen epävarman näytön vuoksi. Polovtsevin talon nykyisestä museokäytöstä ristiriita: nosto rajattu menneisiin käyttövaiheisiin, opasjakso korvattu kasvitieteellisellä puutarhalla. Porttien lukumäärät ja Yunus Khanin hautaväite jätetty pois. Tiilien siirron ja muiden tapahtumien vuodet yleistetty vuosisadoiksi.

## Alkuperäisen tarkistimen tulos

NAS-kloonissa: `node paakaupungit-pilvi/tyokalu.mjs tarkista e09 taskent --lyhyt`. Lopullinen loki `valiaikainen/nopea-e09-taskent/tarkistus-lopullinen.txt`: **19 virhettä, 2 varoitusta, 0 kuvaa**, exit 1. Kaikki 19 virhettä ovat `tiedosto puuttuu`: valokuva 1, kansikuvat 3, kannen nostot 4, matkailijalle 1, oppaan kuvat 5, teeman nostot 4 ja kohdejuttu 1. Ei tekstivirheitä tai muita rakennevirheitä; tarkistinta ei muokattu.

Alkuperäinen tarkistin ajettiin myös ilman --lyhyt-valitsinta varoitusten näkyvyyden vuoksi. Todelliset tyypit: `kohteita 1 (pohjataso 6; perustele RAPORTTI.md:ssä)` ja `saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)`. Erän RAPORTTI.md on pääsession vastuulla; omistusraja sallii perustelut vain tässä ja faktapohjassa.

## Puutteet ja luovutus

Kuvaputkelle avoinna 19 roolia: valokuva, kolme eri yleiskansikuvaa, kahdeksan noston kuvaa, matkailijan pystykuva, viisi oppaan kuvaa ja Kukeldashin kohdekuva. Ei modernia Chorsun kupolia, metroa, muistomerkkejä tai museotalon mahdollisesti suojattuja sisustuksia aiheiksi ilman tekijärajan varmennusta. Alkuperäisen medresan rakenteen ja myöhempien koristusten ero on myös B/D-portti.

Kartta 1/6–8, muiden kohteiden pisteet ja paikkafaktat avoinna. Sääauditointi, muuttuvat opastiedot, riippumaton D/E/F, toimituksen hyväksyntä, pelikytkentä ja julkaisu avoinna. Ei Git-operaatioita, peli- tai toisten kaupunkien muutoksia.

Lähteet, epäonnistuneiden hakujen todisteet, robots-lokit, mitat ja SHA256:t ovat `sessio-72-20261011/valiaikainen/nopea-e09-taskent/`. Tuotantotiedostojen ja lähteiden SHA:t ovat `SHA256SUMS.txt`:ssä. Commit-SHA:ta ei synny tässä työssä.


## Task118 korjaus 13.10.2026
Nimetyt löydökset käsitelty; lähdepohja ja tallennetut /wiki/-lähteet tarkistettu. Visojen vastauslähteet, vaihtoehdot, vihjeet, nimi-/termiasut, kuvatekstit sekä tuotantometalauseet korjattu. Dhakan rikshamaalaus korvattu paikannimien kauppayhteisöhistorialla (Dhaka, Mughal period; tuore mainin BGD.Dhaka sisältää jo rikshamaalauksen). Kuva-/kartta-/sääomistus säilytetty; näiden portit edelleen avoimet.
```text
VIRHE taskent: kansikuva 2: tiedosto puuttuu
VIRHE taskent: kansikuva 3: tiedosto puuttuu
VIRHE taskent: kansi nosto 1: tiedosto puuttuu
VIRHE taskent: kansi nosto 2: tiedosto puuttuu
VIRHE taskent: kansi nosto 3: tiedosto puuttuu
VIRHE taskent: kansi nosto 4: tiedosto puuttuu
VIRHE taskent: opas jakso 1: tiedosto puuttuu
VIRHE taskent: opas jakso 2: tiedosto puuttuu
VIRHE taskent: opas jakso 3: tiedosto puuttuu
VIRHE taskent: opas jakso 4: tiedosto puuttuu
VIRHE taskent: opas jakso 5: tiedosto puuttuu
VIRHE taskent: teemasivu historia nosto 1: tiedosto puuttuu
VIRHE taskent: teemasivu historia nosto 2: tiedosto puuttuu
VIRHE taskent: teemasivu historia nosto 3: tiedosto puuttuu
VIRHE taskent: teemasivu historia nosto 4: tiedosto puuttuu
VIRHE taskent: juttu Kukeldashin medresa kuva 1: tiedosto puuttuu
== taskent: 16 virhettä, 2 varoitusta, 3 kuvaa
YHTEENSÄ 1 kaupunkia: 16 virhettä, 2 varoitusta
```
SHA256 6d4e0173d19d1e0fcc598fd817a0ccdb64123db9f7686a6a434d83ad6afb98ee

Lopullinen Task118-tarkistus: kuvatiedostot/creditit, koordinaatit, rajat, sää ja vastausindeksit täsmälleen baselinen mukaiset. Tiedostohash 0825a8c2f7cf4f5774bcfa48d00606c643aa79a202d59b685cdcfd160e0b812b. Muuttuvat ohjeet keskitetty, kuvatekstitoisto ja merkistövirheet tarkistettu.

```text
VAROITUS taskent: kohteita 1 (pohjataso 6; perustele RAPORTTI.md:ssä)
VAROITUS taskent: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
```

Lopullinen Task118-tarkistus: kuvatiedostot/creditit, koordinaatit, rajat, sää ja vastausindeksit täsmälleen baselinen mukaiset. Tiedostohash 0825a8c2f7cf4f5774bcfa48d00606c643aa79a202d59b685cdcfd160e0b812b. Muuttuvat ohjeet keskitetty, kuvatekstitoisto ja merkistövirheet tarkistettu.

```text
VAROITUS taskent: kohteita 1 (pohjataso 6; perustele RAPORTTI.md:ssä)
VAROITUS taskent: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
```
