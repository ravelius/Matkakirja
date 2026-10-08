# Firenzen PR #3483:n CI-poikkeama

PR: https://github.com/ravelius/Matkakirja/pull/3483
Vanha epäonnistunut ajo: https://github.com/ravelius/Matkakirja/actions/runs/36338434275 (yritys 2, 27.9.2026).

## Syy ja korjaus

Vanha kuvasisältöhaara oli commitissa `9b7a0574e57b5ba04200fd8e347f4cda27865f68`. Ajon 12 punaista jakautuivat neljään selainryhmään. Firenzen kuvamuutokset eivät muuttaneet kaupunkivalintaa, nostokortin asettelua tai kuvalähteiden avausta.

Kolme ryhmää oli korjattu päähaarassa 28.9.2026 commitissa `fdd94609d4a5a15cd7d38419cd52f2237fbef450` (#3565): kaupunkivalinnan testi hyväksyy nykyisen kaupunkipopupin, kuvalähteiden testi erottaa osion avauksen kuvan suurennoksesta ja nostokortin CSS säilyttää kortin oman sisennyksen. Firenzen alkuperäinen sisältöcommit siirrettiin päähaaran `7ab76de470e622c99a437b6aa3d72d4e4e270c99` päälle. Kuvat säilyivät samoina.

Piirtokokeessa oli lisäksi oikea näkyvyysvika. `?koe=vahemmandc` käytti kaikkien tasojen yhteistä `peittoOsuus`-arvoa tukilaattojen piilottamiseen. Puuttuvan tarkan laatan peittävä tukilaatta laskettiin ensin peittoon ja piilotettiin heti sen jälkeen. Camarguen lähizoomissa tarkka taso peitti 88,9 % näytteistä; kaikkien tasojen peitto oli 100 %, vaikka osa tuista oli välttämättömiä.

Piilotus edellyttää nyt nykyisen tason täyttä `peittoTaso`-arvoa. Savuke mittaa piilotuksen jälkeisen peiton suoraan näkyvien laattaverkkojen geometriasta (11 × 11 ruutupistettä), eikä vaadi myös ruudun ulkopuolisen ennakkovaran kaikkia laattoja ladatuiksi. Erillinen virhetilanne estää tarkkojen z9-laattojen verkkopyynnöt uudessa näkymässä.

## Todennettu selaimessa

Mac Studio, Node 22.23.2, Chromium + ANGLE Metal, yksi savuke kerrallaan. Tämä vastaa vanhan Actions-ajon todellista moottoria: WebKit ei käynnistynyt 30 sekunnissa ilman käyttäjän näyttöistuntoa, joten runner käytti Chromiumin headless-varareittiä.

| Ryhmä | Tulos |
| --- | --- |
| Kaupunkivalinta | 14/14 |
| Nostokortti | 78/78 |
| Kuvalähteet | 22/22 |
| Piirtokokeet ja estetty laattalataus | 9/9 |

Yhteensä 123/123 väitettä. Piirtokutsut vähenivät täydellä tarkalla peitolla 27 → 20. Kun kaikki tarkat laatat estettiin, 24 tukilaattaa säilyivät näkyvinä ja ruudun peitto oli 100 %.

Vastakoe tarjoili selaimelle vain vanhan piilotusehdon, muuten saman korjatun testin ja samat aineistot. Estetyssä latauksessa kaikki 24 tukilaattaa piiloutuivat, ruudun laattapeitto putosi 0 %:iin ja P5 epäonnistui (8/9). Korjaus ei siten vain lievennä testiä: uusi vartija havaitsee alkuperäisen vian.

## Muut portit ja rajaus

Ennen korjausta koko yksikkösarja: 5099 testiä, 5084 läpi, 15 ohitettu, 0 epäonnistunutta. Korjatun piirtopolun kohdennetut yksikkötestit: 43/43. Korjauksen jälkeen koko sarja uudelleen: 5099 testiä, 5084 läpi, 15 ohitettu, 0 epäonnistunutta (525 s). Italian nimiölimitysportti myös läpäisty (0 nimiö–nimiö-limitystä).

Kaksoisavaimet, niputus, savukevartija, standalone-koonti ja lähderaportti läpäisty korjatulla lähteellä.

Maailman nimiölimitysportti löytää yhden jo päähaarassa olevan NLD-parin (Naundorff / Delftin linssit). Sama tulos toistettiin puhtaalla päähaaran `7ab76de47` työkopiolla. `tests/nimiolimitys.test.mjs` nimeää tämän jo odottavaksi ulkoasupäätökseksi; se ei ole Firenzen muutoksen aiheuttama eikä nykyisen Actions-Testit-työnkulun portti. Tätä erillistä ulkoasupäätöstä ei muutettu CI-korjauksessa.

Savukkeet-työnkulun automaattinen PR-laukaisu poistettiin omistajan päätöksellä päähaarassa 29.9.2026. Vanhaa epäonnistunutta ajoa ei uusittu eikä työnkulkua palautettu. Uusi sisältö/koodicommit käynnistää nykyisen Testit-portin normaalisti.

PR jää luonnokseksi. Ei mergeä, versionnostoa tai julkaisua. Euroopan 50 kohteen yleinen Fable-kuittaus on erillinen vastaanottotila ja edelleen puuttuu.
