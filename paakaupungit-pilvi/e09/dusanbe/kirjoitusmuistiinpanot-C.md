# Dušanbe — C-tekstiluonnos 12.10.2026

Tila: tekstiydin kirjoitettu ja alkuperäinen paikallinen tarkistin ajettu. Koko kaupunki ei ole valmis. Rajattu A-lähdekooste tehty ennen sisalto.jsonia; B-valintaa eikä D/E/F-hyväksyntää ei ole. Ei Git-, peli-, kuva- tai julkaisutoimia.

Tekstit: intro 881 merkkiä / 8 virkettä / 2 kappaletta / 2 lihavointia, jatkoteksti 955 merkkiä / 3 kappaletta, kansi ja musiikki-teema, 8 nostoa (524, 547, 530, 544, 538, 532, 527, 549 merkkiä), opas 5 jaksoa, 5 kysymystä, 3 tietoa. Oppaan parasta 5 ja hyvä tietää 3 riviä. Kohteita ja kohdejuttuja 0, sää null. Tarkkoja väestö-, pinta-ala-, rakennus- ja tapahtumalukuja ei käytetä; 1873 on kronologinen pelikehys, Two Roses / Kaksi ruusua teoksen nimi.

## Alkuperäisen tarkistimen todellinen tulos

`node paakaupungit-pilvi/tyokalu.mjs tarkista e09 dusanbe --lyhyt`

20 VIRHEttä, 2 VAROITUSta, 0 kuvaa; tarkistimen exit 1. Todisteet `valiaikainen/nopea-e09-dusanbe/tarkistus-lyhyt.txt` ja `tarkistus-kaikki.txt`.

- 18 kertaa **tiedosto puuttuu**: valokuva 1 + kansi 3 + nostot 8 + matkailijalle 1 + opas 5. Kaikkien kuvaroolien neljä kenttää tyhjiä. Tarkistinta ei muutettu eikä virheitä piilotettu.
- **kohdekartta.rajat { pohjoinen > etela, ita > lansi }**: rajat:null, koska hyväksyttyjä kohteita ei ole. Ei arvattua kaupunkipisteeseen perustuvaa rajausta.
- **kohteita 0 (1–15)**: aito partial-karttapuute. Ei kohdejuttuja ilman kelpoista kohdetta.

Varoitukset täsmälleen:

- kysymys 5: source ei ole Wikipedia-artikkeli. Shashmaqomin opetusta koskeva ensikäden lähde on UNESCO; sen oikea lähde säilytetään eikä vaihdeta tukemattomaan Wikipedia-linkkiin.
- saatiedot puuttuu. 48/48 primääriauditointi avoin. Saa.json on olemassa, mutta sen lukuja ei käytetä C:ssä tai muuteta.

## Ratkaisut ja avoimet faktat

Kevyen pisteen maanantaimarkkinat ja neuvostoaikainen kasvu ovat artikkelin taustaa. Uudet nostot käsittelevät Boulderin lahjateehuonetta, Varzobin rannalta toiselle kasvua, istutettua vihreyttä, kaupunkieläimistöä, Gurminjin keräilyä, shashmaqomin opetusta, Ayni-oopperaa ja baletin koulutusyhteyksiä. Teehuoneen oma ensikäden sivu ja UNESCO tallessa; teehuoneen vuosien ja lukujen Wikipedia/virallinen lähdepari ei ole riippumaton, joten numerot jätetty pois.

Rudaki Park -polku palauttaa kaupungin artikkelin, eikä sillä ole puiston omaa pistettä. Gurminjillä oma piste mutta rakennuksen tekijäketju avoin. Eläintarhalla oma piste mutta siirtosuunnitelman ja toiminnan nykytila tarkistamatta. Hisorin linnoitus on keskustan ulkopuolella. Näillä ei täytetty 6–8 kohteen tavoitetta. D2-matkaopas sekoittaa kansallismuseon ja muinaismuseon nimiä/kokoelmia; C sanoo laitosten olevan eri paikkoja eikä siirrä Buddha-kokoelmaa väärään museoon. Kontekstin väestöluvun hallinnollinen laajuus erotettu ristiriitaisista vanhoista rajauksista eikä väkilukua käytetä.

Kuvaputken roolit avoinna: 3 laajaa yleiskuvaa, matkakirjan valokuva, matkailijan pysty, Varzobin ympäristö, puistokävely, hyväksyttävä kaupunkiluonnon aihe, soitin-/musiikkiaiheet ja opas 5 jaksoa. Teehuoneen modernit käsityöpinnat, patsaat, Ayni-teatterin tarkistamaton julkisivu, yksittäinen balettiteos ja Gurminjin mahdollisesti suojatut esineet eivät ole hyväksyttyjä kuvamotiiveja. Ei kuvatekstiä ennen todellista valintaa ja katselua.

Avoimet portit: täysi A:n kohde-/tekijäketju- ja nykytila-auditointi, B, sää, riippumaton D, E/F, omistajan hyväksyntä, pelikytkentä ja julkaisu. Tiedosto- ja lähde-SHA:t sekä mitat NASin omassa väliaineistossa.


## Task118 korjaus 13.10.2026
Kaikki pelaajatekstikentät luettu ja sovellettu otoksen yleissäännöt. Lähdepohja, C-muistio sekä nykyiset Commons-lähdetiedot tarkistettu. Meta- ja täytelauseita korvattu kaupungin omilla faktoilla; vihjeet ja houkuttimet täsmennetty. Nykyiset kuvat, pisteet ja sää säilytetty; niiden puutteet ovat erillisiä portteja. Tuore mainin js/data-haku tehty ennen kirjoittamista. Ei Git, kuvia, pelikytkentää tai julkaisua.


```text
VIRHE dusanbe: kansikuva 1: tiedosto puuttuu
VIRHE dusanbe: kansikuva 2: tiedosto puuttuu
VIRHE dusanbe: kansikuva 3: tiedosto puuttuu
VIRHE dusanbe: kansi nosto 1: tiedosto puuttuu
VIRHE dusanbe: kansi nosto 3: tiedosto puuttuu
VIRHE dusanbe: kansi nosto 4: tiedosto puuttuu
VIRHE dusanbe: matkailijalle.kuva: tiedosto puuttuu
VIRHE dusanbe: opas jakso 1: tiedosto puuttuu
VIRHE dusanbe: opas jakso 2: tiedosto puuttuu
VIRHE dusanbe: opas jakso 3: tiedosto puuttuu
VIRHE dusanbe: opas jakso 4: tiedosto puuttuu
VIRHE dusanbe: opas jakso 5: tiedosto puuttuu
VIRHE dusanbe: teemasivu musiikki nosto 1: tiedosto puuttuu
VIRHE dusanbe: teemasivu musiikki nosto 2: tiedosto puuttuu
VIRHE dusanbe: teemasivu musiikki nosto 3: tiedosto puuttuu
VIRHE dusanbe: teemasivu musiikki nosto 4: tiedosto puuttuu
VIRHE dusanbe: kohdekartta.rajat { pohjoinen > etela, ita > lansi }
VIRHE dusanbe: kohteita 0 (1–15)
== dusanbe: 18 virhettä, 2 varoitusta, 2 kuvaa
YHTEENSÄ 1 kaupunkia: 18 virhettä, 2 varoitusta
```
SHA256 b59a47832cda8b72ac8a25ceaec7e78b755023e9f2c70f0af79b3a29ce83b429

Lopullinen Task118-tarkistus: kuvatiedostot/creditit, koordinaatit, rajat, sää ja vastausindeksit täsmälleen baselinen mukaiset. Tiedostohash 18dce38e942113d135101226db7160b1a3a7ed3d8694d6749fd52eb63beeb869. Muuttuvat ohjeet keskitetty, kuvatekstitoisto ja merkistövirheet tarkistettu.

```text
VAROITUS dusanbe: kysymys 5: source ei ole Wikipedia-artikkeli
VAROITUS dusanbe: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
```

Lopullinen Task118-tarkistus: kuvatiedostot/creditit, koordinaatit, rajat, sää ja vastausindeksit täsmälleen baselinen mukaiset. Tiedostohash 18dce38e942113d135101226db7160b1a3a7ed3d8694d6749fd52eb63beeb869. Muuttuvat ohjeet keskitetty, kuvatekstitoisto ja merkistövirheet tarkistettu.

```text
VAROITUS dusanbe: kysymys 5: source ei ole Wikipedia-artikkeli
VAROITUS dusanbe: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
```
