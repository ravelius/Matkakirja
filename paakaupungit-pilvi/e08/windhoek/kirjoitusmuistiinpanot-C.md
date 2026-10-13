# Windhoek – kirjoitusmuistiinpanot C

12.10.2026. Omistus vain e08/windhoek. Rajattu A + kokonainen tekstiluonnos tallennettu oikeaan NAS-klooniin, ei Git-operaatioita eikä pelin tiedostojen muutoksia.

Kirjoitettu: intro ja kolmikappaleinen artikkeli; kansi + tiede-teemasivu, 4 + 4 nostoa; matkailijalle-kappale, viisiosainen opas ja 5 parasta / 3 hyvä tietää; viisi kysymystä (tasot 1–3), kolme tietoa, minitehtävä; kaksi omaan kohdepisteeseen sidottua nähtävyysjuttua.

Lopulliset mitat: intro 894 merkkiä, artikkeli 891; nostot 487 / 470 / 467 / 484 / 471 / 491 / 500 / 511. Jokainen nosto tavoitealueella 440–660.

Alkuperäinen `node paakaupungit-pilvi/tyokalu.mjs tarkista e08 windhoek --lyhyt` ajettu (exit 1). Tulos: 20 virhettä, 2 varoitusta, 0 kuvaa. Kaikki 20 virhettä ovat todellista tyyppiä `tiedosto puuttuu`: valokuva 1, kansi 3, nostot 8, matkailijalle 1, opas 5, nähtävyydet 2. Täysituloste vahvistaa kaksi varoitustyyppiä: `kohteita 2 (pohjataso 6)` ja `saatiedot puuttuu`. Ei tekstin pituus-, kappale-, nosto-, kysymys-, minitehtävä-, skeema- tai koordinaattivirheitä. Kone ei tarkista faktojen oikeellisuutta.

Avoimet portit: B/20 kuvaroolia, kuuden karttakohteen portti (partial 2), sääaineiston primääriauditointi, riippumaton D, tarvittava E ja pääsession F. Aseman tekijäketju ja puutarhan oma karttapiste jätettiin avoimiksi. Kuvaehdotuksissa käytetään vain kohteita; tiedostoja, kuvatekstejä ja lisenssejä ei keksitä. Kaikissa 20 kuvaoliossa neljä kenttää ovat tyhjiä.

Faktaratkaisut: Goreangabin ristiriitainen aloitusvuosi pois; orlamasutuksen henkilö-/vuosiristiriidan vuoksi vain yhteisö ja vuosisadan osa; ei superlatiiveja tai tarkkoja ilmastolukuja. Väkiluku jätetty pois. Alte Festen museokäyntiä ei luvata. Suunnittelijoiden kuolema ennen 1956 tarkistettu tallennetuista omista elämäkerroista, mutta kuvaputki tarkistaa itse kuvassa näkyvät teokset.

Todisteet: `valiaikainen/nopea-e08-windhoek/tarkistus-lyhyt.txt`, `tarkistus-taysi.txt`, `lahde-manifesti.json`, `lisalahde-manifesti.json`, `tuotanto-sha256.json`. Ei hyväksyntää, pelikytkentää tai julkaisua.


## Task118 korjaus 13.10.2026
Kaikki pelaajatekstikentät luettu ja sovellettu otoksen yleissäännöt. Lähdepohja, C-muistio sekä nykyiset Commons-lähdetiedot tarkistettu. Meta- ja täytelauseita korvattu kaupungin omilla faktoilla; vihjeet ja houkuttimet täsmennetty. Nykyiset kuvat, pisteet ja sää säilytetty; niiden puutteet ovat erillisiä portteja. Tuore mainin js/data-haku tehty ennen kirjoittamista. Ei Git, kuvia, pelikytkentää tai julkaisua.


```text
VIRHE windhoek: kansi nosto 1: tiedosto puuttuu
VIRHE windhoek: kansi nosto 2: tiedosto puuttuu
VIRHE windhoek: kansi nosto 3: tiedosto puuttuu
VIRHE windhoek: kansi nosto 4: tiedosto puuttuu
VIRHE windhoek: matkailijalle.kuva: tiedosto puuttuu
VIRHE windhoek: opas jakso 1: tiedosto puuttuu
VIRHE windhoek: opas jakso 2: tiedosto puuttuu
VIRHE windhoek: opas jakso 3: tiedosto puuttuu
VIRHE windhoek: opas jakso 4: tiedosto puuttuu
VIRHE windhoek: opas jakso 5: tiedosto puuttuu
VIRHE windhoek: teemasivu tiede nosto 1: tiedosto puuttuu
VIRHE windhoek: teemasivu tiede nosto 2: tiedosto puuttuu
VIRHE windhoek: teemasivu tiede nosto 3: tiedosto puuttuu
VIRHE windhoek: teemasivu tiede nosto 4: tiedosto puuttuu
VIRHE windhoek: juttu Alte Feste kuva 1: tiedosto puuttuu
== windhoek: 15 virhettä, 2 varoitusta, 5 kuvaa
YHTEENSÄ 1 kaupunkia: 15 virhettä, 2 varoitusta
```
SHA256 943c2590626193abe736b6f61cf7655d586152c37092c23008ec4459e45ba5bf

Lopullinen Task118-tarkistus: kuvatiedostot/creditit, koordinaatit, rajat, sää ja vastausindeksit täsmälleen baselinen mukaiset. Tiedostohash 7e91e4fba1a8a1eee31b4c0e573fcebfd23d205cb1628e1b906782b37c80b78b. Muuttuvat ohjeet keskitetty, kuvatekstitoisto ja merkistövirheet tarkistettu.

```text
VAROITUS windhoek: kohteita 2 (pohjataso 6; perustele RAPORTTI.md:ssä)
VAROITUS windhoek: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
```

Lopullinen Task118-tarkistus: kuvatiedostot/creditit, koordinaatit, rajat, sää ja vastausindeksit täsmälleen baselinen mukaiset. Tiedostohash 7e91e4fba1a8a1eee31b4c0e573fcebfd23d205cb1628e1b906782b37c80b78b. Muuttuvat ohjeet keskitetty, kuvatekstitoisto ja merkistövirheet tarkistettu.

```text
VAROITUS windhoek: kohteita 2 (pohjataso 6; perustele RAPORTTI.md:ssä)
VAROITUS windhoek: saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)
```
