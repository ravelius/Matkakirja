# Ranskan testipeli, kierros 3 — Sonnet, 19.9.2026

Tuotanto: https://matkakirja.app/, versio **v1949 · kehittäjä** (näkyy asetusvalikossa).
Laite: iPhone 18 Pro -simulaattori (UDID 283EDDD1-56DB-4B84-A148-5E842645957D), Safari.
Aloitus: klo 11.12 Suomen aikaa, tallennus Sofiassa (Bulgaria). Lopetus: klo 11.48 (aikakatto 45 min).

## Iso este: Ranskaan pääsy vei suurimman osan ajasta

Tehtävänannon kuvaama "kaupunkiin pääsee napauttamalla sen laattaa" -oikotie
**ei toiminut siellä missä sitä ensin etsin** (asetusten "maailma PÄÄLLÄ" -kytkin ei
muuttanut senhetkistä maa-tason karttaa miksikään; pinch-zoom-ulos ja
yhden sormen panorointi eivät liikuttaneet Sofian/Kiovan/Varsovan/Berliinin
maakohtaista karttaa lainkaan, vaikka kokeilin sekä touch2_path-nipistystä
että swipe-panorointia useaan otteeseen oikeilla pistekoordinaateilla).
Toimiva reitti löytyi vasta kokeilemalla "Liiku"-toimintoa: se avaa
junayhteyslistan lähikaupunkeihin (kukin 50 puntaa), ja PERILLÄ yhden
kaupungin liikkeellelähtöruudussa peukalo/juna/laiva-valitsimen vieressä
avautuu **koko Euroopan yleiskartta nopanheittoa varten** — vasta siellä
näkyvät myös oman maan ulkopuoliset kaupungit nimillä (mm. "Pariisi"), ja
niiden napauttaminen **teleporttasi suoraan perille ilmaiseksi** (rahaa oli
jo 0 puntaa, silti toimi) riippumatta nopanheitosta tai matkan pituudesta.
Tämä siis toimii kehittäjätilan oikotienä, mutta reitti sinne on: oma
kaupunki → "Liiku" → mikä tahansa kuljetusmuoto → Euroopan yleiskartta
ilmestyy automaattisesti kun ollaan toisessa kaupungissa kuin lähtöpaikka.
Kulutin reittiä etsiessä useita vääriä hyppyjä (Bulgaria → Bukarest →
Odessa → Kiova → Varsova → Berliini, 250 → 0 puntaa) ennen kuin löysin
oikean tavan. **Suosittelen Opukselle:** dokumentoi tämä reitti selkeästi
tulevaa testausta varten (esim. Raamattuun tai tähän tiedostoon), tai
lisää suoraviivaisempi dev-oikotie (esim. pudotusvalikko maista/kaupungeista
kehittäjäasetuksiin), jotta seuraava testaaja ei kuluta 35 minuuttia
navigointiin.

Koska tämä vei ~35 minuuttia 45 minuutin kiintiöstä, alla olevat löydökset
kohdista 1, 3 (osittain), 5 ja 6 jäivät testaamatta tai vain osittain
testatuiksi. Kohdat 2 ja 4 sekä yksi nosto (kohta 3) ehdittiin tarkistaa.

## Löydöstaulukko

| # | Mitä tehtiin | Mitä odotettiin | Mitä tapahtui | Vakavuus | Kuva |
|---|---|---|---|---|---|
| 1 | Saavuttiin Pariisiin kehittäjähypyllä; katsottiin ensimmäistä ruutua | PAATOKSET 43 kohta 10: Ohita-nappi näkyvissä kunnes isoisän JA pulun luennat päättyvät | Isoisän/pulun ääniluentaa EI käynnistynyt kehittäjähypyn jälkeen — sen sijaan avautui tavallinen "puheenaihe"-kortti (Kynttilänpäivä, LISÄÄ-nappi, ei Ohita-nappia). En pystynyt vahvistamaan luentojen Ohita-käytöstä, koska kehittäjähyppy ei ilmeisesti laukaise samaa saapumisluentaa kuin pelaamalla saapuminen. **Ei siis validi testi tälle kohdalle** — täytyy testata pelaamalla oikeasti saapuen, ei dev-hypyllä. | — (ei testattu kunnolla) | 01-saapuminen-pariisiin.png |
| 2 | Pariisin kartta yleisnäkymässä, laskettiin nostopisteitä | ≥ 35 nostopistettä, muiden maiden nostot/kaupungit piilossa, nostot eivät meren päällä, tekstit piilossa kunnes napautetaan | Nostopisteitä runsaasti (Lille, Amiens, Étretat, Bayeux, Rouen, Mont-Saint-Michel, Chandeleur, Chartres, Le Mans, Loire, Kaulanauhajuttu, Chambord, Amboise, Chenonceau, Vézelay, Beaune, Reims, Verdun, Nancy, Nantes, Vichy, Chaîne des Puys, Puy de Sancy, Montgolfier, Le Puy-en-Velay, Lascaux, Saint-Émilion, Rocamadour, Millau, Pont du Gard, Mont Ventoux, Avignon, Gorges du Verdon, Cognac, Bordeaux, Toulouse, Roquefort, Nîmes, Camargue, Roquefavour, Carcassonne, Canal du Midi, Pic du Midi — selvästi yli 35), tekstit piilossa oletuksena (nimet näkyvät, mutta sisältö avautuu vasta napautuksesta) — TOIMII. **MUTTA**: naapurimaiden kaupungit **eivät** olleet piilossa — "Amsterdam" ja "Barcelona" näkyivät nimillä normaalissa (ei-siirto-) näkymässä, ja ruudun reunassa oli pysyvä noppa-kuvake + "Liiku"-teksti koko ajan näkyvissä ilman että olin aktiivisesti aloittamassa siirtoa. Tämä rikkoo PAATOKSET 43 kohdan 8 vaatimusta ("kohdemaan ulkopuolisten kaupunkien pisteet ja nimet piilotetaan pelinäkymässä, kun siirtovaihe ei ole päällä"). **Huom:** en voi sulkea pois, että tämä johtuu nimenomaan kehittäjähypystä (jäikö siirtovaihe-tila "päälle" hyppäämisen jäljiltä) — kannattaa varmistaa myös normaalilla pelaamisella saapuen. | 2 | 02-kartta-yleiskuva.png, 04-barcelona-nakyvissa.png |
| 3 | Avattiin yksi nosto: Mont-Saint-Michel ("Meri palaa saaren ympärille") | Teksti 3-5 virkettä, lähde, 2 pulun kysymystä, vähintään 2 kuvaa jotka latautuvat (PAATOKSET 44) | Teksti ja yksi kuva latautuivat oikein, lähdemerkintä näkyi asianmukaisesti (Mathias Neveling, Wikimedia Commons, CC BY-SA 4.0). **Vain yksi kuva löytyi** — en nähnyt toista kuvaa enkä pulun kahta kysymystä korttia vieritettäessä loppuun asti (kortin lopussa oli vain tekninen debug-teksti "Maalehden sivu 'luonto'..."). Muita nostoja ei ehditty ajan loppuessa avata testin vahvistamiseksi laajemmin. | 2 | 03-mont-saint-michel.png |
| 4 | Pariisin kaupunkiliuska (napautettiin omaa kaupunkia) | Nähtävyydet-arkki: vain piirroskohteet, kokoruutunappi kartan yläpuolella toimii, ei +/- -nappeja, ei selitteitä | Liuska avautui oikein kategorioilla (Kadonneet ihmeet 2, Historia 8, Kauppa ja tekniikka 6, Kulttuuri ja ruoka 9, Skandaalit 9, Muut 6) sekä Nähtävyydet- ja Turistiopas-linkit. Nähtävyydet-arkki: piirroskohteet kartalla oikein, KOKORUUTU-nappi kartan yläpuolella ja toimi (avasi täysruudun, X sulki). Ei +/- -nappeja kartalla — TOIMII. **Huom:** kartan alla oli aakkosellinen tekstilista kaikista kohteista (Eiffel-torni, Riemukaari, Concorden aukio, Louvre, jne.) — jos "ei selitteitä" tarkoittaa myös tätä listaa, tämä voi olla poikkeama; jos tarkoittaa vain karttaselitteitä/legendaa kartan päällä, tämä on ok. Vaatii Opuksen tulkinnan Raamatun tekstistä. | 1 (mahd. ei virhe) | 05-nahtavyydet.png |
| 5 | Nopanheiton kohdevalinta (Euroopan yleiskartalla kohdekaupungin napautus) | Kohdekaupungin napautus valitsee siirron heti ilman liuskaa (PAATOKSET 42) | Havaittiin epäsuorasti: napauttaessani "Pariisi"-nimeä Euroopan yleiskartalla (kehittäjätilassa, rahaa 0 puntaa) siirto/teleportti tapahtui HETI ilman väliliuskaa. Tämä TOIMII ainakin kehittäjä-/ilmaishypyn tapauksessa. Saaton suuntaa, ennakkozoomia ja siirtozoomia EI ehditty tarkistaa, koska teleportti tuntui ohittavan koreografian kokonaan (ei animaatiota havaittu). | — (osittain testattu) | — |
| 6 | Linssit (matkalaukku → Varusteet-ruudukko) | Topografialinssi ja Astronautin kamera avautuvat, toimivat oikein (v1949: aidot NASA-pilvet, pallo ei musta) | Varusteet-ruudukko löytyi (9 kuvaketta, mm. "Vesistölinssi" ja "Topografialinssi" nimetty napautuksella). Napautus näytti vain kuvakkeen nimen tooltip-tyylisesti — linssi ei näyttänyt avautuvan (ei uutta näkymää, ei relief- tai globe-näkymää auennut kahden napautuksen jälkeenkään). **Aika loppui kesken ennen kuin ehdin varmistaa, oliko kyse väärästä napautustavasta (esim. pitkä painallus tai kaksoisnapautus) vai oikeasta viasta.** Astronautin kameraa ei ehditty testata lainkaan. | — (ei ehditty) | — |
| 7 | Yleishavainnot koko testin ajalta | Ei jumeja, ei tyhjiä ruutuja, napit reagoivat | Sivu jumiutui kahdesti kokonaan (napit, mm. selite-/legendanappi ja asetuskuvake, lakkasivat reagoimasta) manuaalisten kaksisormi-touch2_path-eleiden jälkeen Sofian/Bulgarian kartalla; molemmilla kerroilla sivun uudelleenlataus (`xcrun simctl openurl`) korjasi tilanteen. En osaa sanoa, oliko jumi minun simulointityökaluni artefakti (esim. epätäydellinen kosketustapahtuma) vai aito pelin bugi — merkitsen tiedoksi, ei vakavuusluokiteltuna löytönä, koska en pystynyt toistamaan sitä hallitusti. | — (huomio) | — |

## "Toimii kuten pitää" -lista

- Kehittäjäasetukset (asetuskuvake → KEHITTÄJÄ-osio): "maailma", "mittari", "Raamattu"- ja "Kehittäjälehti"-linkit näkyvät ja avautuvat.
- Kehittäjälehti-sivu avautui ja listasi kaikki osiot (Tilannelehti, Poiminnat, Tilastot, Grafiikka, Lukijoilta, Musiikki, Lukijaääni) sekä Poistu-napin.
- "Uusi peli" -varmistuskortti näytti asianmukaisen varoituksen ("kaikki muistit tyhjennetään... Tätä ei voi perua") ja Peruuta toimi turvallisesti.
- Pariisin kartalla nostopisteitä runsaasti (selvästi yli tavoitteen 35), yksikään havaittu piste ei ollut ilmiselvästi meren päällä.
- Nostotekstit (nimet) näkyvät kartalla oletuksena, mutta sisältö avautuu vasta napautuksesta — tekstisisältö ei siis "vuoda" ennenaikaisesti.
- Mont-Saint-Michel-nosto: teksti asiallinen, lähde ja lisenssi merkitty oikein (CC BY-SA 4.0, tekijä nimetty).
- Pariisin kaupunkiliuskan kategoriajako ja nostomäärät näkyivät selkeästi.
- Nähtävyydet-arkin kokoruutunappi ja sen sulkeminen (X) toimivat sujuvasti; ei havaittu +/- -zoomausnappeja kartalla.
- Junamatkustuksen hintanäyttö (esim. "Berliini (50 p)") ja kukkaron päivitys (£250 → £200 → ... → £0) toimivat johdonmukaisesti jokaisen matkan jälkeen.

## Ehdotus korjauserien jaosta Opukselle

1. **Erä A (löydös #2, vakavuus 2):** Tutki miksi naapurimaiden kaupungit (Amsterdam, Barcelona) ja pysyvä noppa/Liiku-kuvake näkyivät Ranskan kartalla ilman aktiivista siirtovaihetta — tarkista sekä normaalilla pelaamisella saapuen että kehittäjähypyllä, jotta nähdään onko syy hyppymekanismissa jääneessä tilassa vai aidossa PAATOKSET 43.8 -regressiossa.
2. **Erä B (löydös #3, vakavuus 2):** Käy läpi Ranskan "maalehti"-tyyppiset nostot (kuten Mont-Saint-Michel "Meri palaa saaren ympärille") ja varmista, että jokaisessa on PAATOKSET 44:n vaatimat vähintään kaksi kuvaa ja (hahmotelma-nostoissa) kaksi pulun kysymystä — tämä yksittäinen nosto oli vajaa.
3. **Erä C (löydös #6, ei ehditty):** Selvitä Varusteet-ruudukon linssien avaustapa (napautus vain nimeää kuvakkeen, ei avaa näkymää) ja testaa sekä Topografialinssi että Astronautin kamera (v1949: NASA-pilvet, pallon musta-korjaus) kunnolla — tämä jäi kokonaan testaamatta ajan loppuessa.
4. **Erä D (dokumentaatio, ei koodikorjaus):** Kirjaa selkeästi (Raamattuun tai testausohjeisiin) kehittäjätilan oikea reitti Ranskaan/muihin maihin: oma kaupunki → "Liiku" → mikä tahansa kuljetuskuvake → avautuvalta Euroopan yleiskartalta kohteen nimen napautus teleporttaa ilmaiseksi. Nykyinen ohje ("napauta kaupungin laattaa kartalla" + pinch-zoom-ulos) johti minut harhaan ja kulutti ~35 minuuttia 45 minuutin kiintiöstä.
5. **Erä E (löydös #1, ei validi testi):** Varmista isoisän/pulun saapumisluentojen ja Ohita-napin pysyvyys (PAATOKSET 43.10) testaamalla oikealla pelaamisella saapuen Ranskaan — kehittäjähyppy ei laukaissut samaa luentaa.

## Ei ehditty testata

- Kohta 1 kunnolla (validi saapumisluenta + Ohita-käytös vain kehittäjähypyllä, ei pelaamalla).
- Kohta 3 laajasti: vain yksi nosto (Mont-Saint-Michel) ehdittiin avata kymmenen sijaan.
- Kohta 5 laajasti: ennakkozoomi, siirtozoomi ja saaton suunta (koreografia) eivät olleet havaittavissa teleportin nopeuden vuoksi.
- Kohta 6 kokonaan: Topografialinssi ei ehditty avata onnistuneesti; Astronautin kameraa ei testattu lainkaan.
- Kohta 7: ei systemaattista läpikäyntiä, vain sivutuotteena havaitut kaksi jumiutumista Bulgarian kartalla (mahdollisesti työkaluartefakteja).

---

Haara: `claude/bold-ride-vow4ki-ranska-testi-3`. Löydöksiä: 2 kpl vakavuus 2 (#2, #3), 1 kpl vakavuus 1/epäselvä (#4), lisäksi kaksi osittain testattua kohtaa (#1, #5) ja yksi kokonaan testaamatta jäänyt kohta (#6) ajan loppumisen vuoksi. Suurin osa 45 minuutin kiintiöstä (~35 min) kului Ranskaan pääsyyn, koska tehtävänannon kuvaama "napauta kaupungin laattaa" -oikotie ei löytynyt sieltä mistä sitä ensin etsittiin; toimiva reitti (Liiku → kuljetusvalinta → Euroopan yleiskartta → nimen napautus) löytyi vasta kokeilemalla.
