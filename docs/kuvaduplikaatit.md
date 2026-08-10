# Kuvaduplikaattien vaihtolista (Sonnet 1:n QA 9.8.2026, Fable päätti)

Sonnet 1 kävi kaikki kahdesti esiintyvät kuvat läpi lukemalla molemmat
esiintymisyhteydet. Fablen päätös: alla olevat 17 vaihdetaan (toinen
esiintymä saa uuden kuvan), Las Meninas JÄÄ (kuva on itse taideteos,
josta molemmat tekstit puhuvat — vaihtokuvaa ei ole olemassa), Gizan
pyramidit JÄÄ (eri ominaisuus: lehden kansi vs. päivän kuva -palsta).

Tekijä: Opus 1, valokuvarajatapausten erän yhteydessä (sama työtapa:
jokainen korvaaja katsotaan silmällä 480 px:ssä, PD/CC ja peilaus).
Vaihda se esiintymä, jonka yhteyteen löytyy luonteva toinen kuva —
yleensä valokuvat.js/kategoriat-puolen "uusi"/"lisät"-kenttä, jotta
kulttuurinoston kuratoitu kuva säilyy.

1. Assekremin huiput — africa-kulttuuri.js:674 / africa-valokuvat.js:1227
2. Paluuttoman portti, Benin — africa-kulttuuri.js:836 / africa-valokuvat.js:363
3. Tšadjärven kalastaja — africa-kulttuuri.js:917 / maasto-tekstit.js:433
   (syntyi #652:n korjauksen sivuvaikutuksena)
4. Sossusvlein dyynit — africa-kulttuuri.js:1044 / africa-valokuvat.js:948
5. Big Hole, Kimberley — africa-kulttuuri.js:1164 / africa-valokuvat.js:533
6. Ilha de Moçambique — africa-kulttuuri.js:1205 / africa-valokuvat.js:1260
7. Kirahvi Nairobin siluetilla — africa-kulttuuri.js:1589 / africa-valokuvat.js:1083
8. Khan el-Khalili -basaari — africa-valokuvat.js:59 / nahtavyysjutut.js:367
9. Pyhän Katariinan luostari, Siinai — asia-valokuvat.js:1554 / maakartat.js:66
10. Härkähyppy-fresko, Kreeta — europe-kulttuuri.js:230 / europe-valokuvat.js:481
11. Brunost-juusto — europe-kulttuuri.js:1182 / europe-valokuvat.js:2434
12. Rossion aukion aaltokivetys — europe-valokuvat.js:1088 / maa-kategoriat.js:6589
13. Széchényin kylpylän shakki — europe-valokuvat.js:1575 / kulttuuri-kategoriat.js:3190
14. Arsenalnan liukuportaat, Kiova — europe-valokuvat.js:1747 / kulttuuri-kategoriat.js:4086
15. Eremitaasin kissa — europe-valokuvat.js:1933 / kulttuuri-kategoriat.js:4248
16. Muhammad Alin moskeija — kulttuuri-kategoriat.js:255 / nahtavyysjutut.js:341
17. Brandenburgin portti — kulttuuri-kategoriat.js:985 / nahtavyysjutut.js:87

Rivinumerot ovat v452:n (HEAD ed11bc3) mukaiset — tarkista grep'llä
tiedostonimen mukaan, rivit ovat voineet siirtyä.

KORJAUS 9.8. myöhäisilta: aiempi merkintä maasto-tekstit-malli.js:n
"siivouksesta" oli VÄÄRÄ. Opus 2 tarkisti sisällön ennen poistoa:
tiedosto sisältää pelin kymmenen kuuluisimman maastokohteen (Niili,
Amazon, Volga, Ganges, Jangtse, Baikal, Kaspianmeri, Himalaja, Andit,
Alpit) AINOAT tekstit ja 10 aikalaislainausta, joihin
tools/lainausankkurit.json ja tarkista-lainaukset.mjs nojaavat.
Tiedosto SÄILYY; vain sen harhaanjohtava kommenttiviite korjataan
(Opus 2:n erä). "Ei UI-importtia" ei kelpaa poistoperusteeksi —
kumpaakaan maastotekstipakettia ei ole vielä kytketty käyttöliittymään.

## Tilanne 10.8.2026 (Opus 1, v494–v497)

Listan 17 vaihdosta on tehty 16. Vaihdettu aina se esiintymä, jonka
yhteyteen löytyi luonteva toinen kuva samasta kohteesta — yleensä
valokuvapuoli, jotta kulttuurinoston kuratoitu kuva säilyy.

**Hyväksytyt duplikaatit** (ei vaihdeta, peruste kirjattu):

- **Las Meninas** ja **Gizan pyramidit** — Fablen alkuperäinen päätös.
- **#3 Tšadjärven kalastaja** — Commonsissa on vain sama valokuva
  kahtena versiona (suoristettu ja alkuperäinen), joten vaihto ei
  poistaisi toistoa. Esiintymät ovat africa-kulttuuri.js:ssä ja
  maasto-tekstit.js:ssä, jotka eivät näy pelaajalle vierekkäin.
- **Rio Javaés** — Commonsissa ei ole toista vapaata kuvaa Javaés-joelta
  eikä Bananalin saarelta. Sama peruste: maastosivu ja valokuvapaketti
  eivät ole pelaajalle vierekkäin.

**Listan ulkopuolelta löytyneet ja korjatut** (sama luokka kuin #16–#17,
syntyivät listan laatimisen jälkeen): Hagia Sofia (Istanbulin kansi sai
Yerebatanin vesisäiliön), Casa Batlló (nähtävyysjutun karusellikuva
vaihtui iltakuvaan), Ripon Falls (maasto-tekstit-malli sai vanhan
puupiirroksen Leclercqin valokuvan tilalle).

**Vielä auki**: Latin Bridge Sarajevo (kulttuuri-kategoriat ↔
nähtävyysjutut) syntyi v495:n nähtävyysjuttuerässä — sama luokka,
odottaa päätöstä.

Tarkistin: /tmp:n dup-kaikki.mjs lukee kaikki paketit tekstitasolla
(`tiedosto:`-kentät), jolloin rakenne ei voi piilottaa duplikaattia.
Ennen erää 23 päällekkäisyyttä, nyt 6.

## Tilanne 10.8.2026 ilta (Opus 1, v536): 13 viimeistä vaihdettu

Sonnet 1:n kokoava QA löysi 17 raakaduplikaattia, joista 4 oli jo
perusteltu yllä. Loput **13 vaihdettiin nyt**. Kaikki syntyivät
nähtävyysjuttuerissä v495–v508, joten vaihdettiin johdonmukaisesti
**nähtävyysjuttupuoli**: vanhempi esiintymä on kaupunkilehden tai
maalehden vakiintunut kuva, ja nähtävyysjutun karuselliin mahtuu
luontevasti eri näkymä samasta kohteesta.

| Kohde | Uusi kuva nähtävyysjutussa |
|---|---|
| Latinalaissilta, Sarajevo | koko silta Miljackan yli (CC0) |
| Baščaršija | Kazandžilukin kupariseppäkuja (CC BY 2.0) |
| Privozin tori, Odessa | torin sisäänkäynti ja ПРИВОЗ-kyltti (PD) |
| Kultainen portti, Kiova | portti puistikon laidalta (CC BY-SA 3.0) |
| Odessan oopperatalo | katsomo sisältä (CC BY-SA 4.0) |
| Vorontsovin majakka | aallonmurtajan pää ja rahtisatama (CC BY-SA 3.0) |
| Tromssan tuomiokirkko | urkuparvi ja puiset kattoristikot (CC BY-SA 4.0) |
| Mustapäiden talo, Riika | Rolandin patsas edessä (CC BY-SA 4.0) |
| Aamuportti, Vilna | kappelin holvi sisältä (CC BY-SA 3.0) |
| Gediminaksen torni | rinteen juurelta (CC BY 2.0) |
| Vilnan yliopisto | piha aamuauringossa (CC BY-SA 2.0) |
| Rundetårn | Christian IV:n rebus kattojen yli (CC BY-SA 3.0) |
| Parthenon | eteläsivu iltavalossa (CC BY-SA 2.5) |

**Parthenon oli luokan c rajatapaus, ja se ratkaistiin näin:** toinen
esiintymä on `europe-puzzles.js:117` eli valokuvapulman vaihtoehto, ja
sen koodikommentti (rivit 120–124) sitoo kuvan isoisän luonnokseen.
Pulmakuvaa **ei siis vaihdettu** — vain nähtävyysjuttupuoli.

Neljä ehdokasta kaatui silmätarkistuksessa ja korvattiin toisella:

- Voroncovin majakan lähikuva oli lähes identtinen vaihdettavan kanssa.
- Gediminaksen tornin talvikuva oli sumuinen yökuva, torni tuskin näkyi.
- Vilnan yliopiston pihakuvassa oli rakennustelineiden suojaverkko.
- Privozin sisäänkäyntikuvan etuala oli täynnä pysäköityjä autoja.

Lisäksi ensin valittu Aamuportin katunäkymä hylättiin, koska jutussa oli
jo lähes sama sommitelma; tilalle otettiin kappelin holvi sisältä.

**Ansa, joka jäi kiinni testissä:** Commonsin tiedostonimi katkaistiin
kahdelle riville, ja `tests/media.test.mjs` kaatui — peilaustyökalu
poimii vain ensimmäisen palan. Pitkä nimi on pakko kirjoittaa yhdelle
riville, vaikka rivi venyisi.

Tämän jälkeen pelissä on enää **4 duplikaattia**, kaikki yllä
perusteltuja: All Gizah Pyramids, Las Meninas, Rio Javaés ja
Tšadjärven kalastaja.

**Tarkastus eri silmin muutti viittä valintaa vielä tämän jälkeen.**
Kaksi agenttia kävi läpi 13 uutta kuvaa ja kuvatekstiä:

- **Privozin lihatiski hylättiin yksityisyyden takia.** Kuvassa oli
  toistakymmentä tunnistettavaa myyjää ja asiakasta lähikuvassa, yksi
  heistä epäedullisessa ilmeessä. PD-lisenssi ei ratkaise sitä, onko
  oikein levittää tunnistettavia ihmisiä julkaistavassa pelituotteessa.
  Tilalle torin sisäänkäynti ja kyltti.
- **Vilnan yliopiston arkadipiha oli tunnistamaton.** Kuvassa näkyi vain
  kahden pilarin juuri, ei pihaa — ja kuvateksti lupasi kiertävän
  kaarikäytävän, jota ei näkynyt.
- **Baščaršijan 1911-postikortti toisti jutun muita kuvia**: jutussa oli
  jo vanha mustavalkoinen torikuva vuodelta 1892 ja Sebilj näkyi
  ensimmäisessä kuvassa. Tilalle kupariseppäkuja, eri aihe.
- **Tromssan sisäkuvassa ei ollut mitään, mikä tunnistaisi kirkon** —
  ei alttaria, urkuja eikä suippokaaria, vain penkkejä ja poistumis-
  tiekyltti. Tilalle urkuparvi kattoristikoineen.
- **Majakan kaukokuvassa kohde vei 3–5 % ruudusta.** Tilalle kuva, jossa
  majakka on lähempänä ja takana rahtisatama.

Kuvateksteistä korjattiin lisäksi neljä asiavirhettä: Latinalaissillalla
ei näkynyt kulkijoita, Kiovan portin näkyvä muuri on rekonstruktiota
eikä vanhaa tiilimuuria, Rundetårnin kultainen merkki on kuva-arvoitus
(rebus) eikä kuvakirjoitus, ja majakan nimi oli kirjoitettu
kuvateksteissä muotoon "Voroncovin", vaikka jutun leipäteksti ja muut
paketit käyttävät muotoa **Vorontsovin** (kolme riviä yhtenäistetty).

**Viereinen havainto, ei korjattu (kuuluu erikseen päätettäväksi):**
Vorontsovin majakan jutun leipäteksti sanoo tornin kohoavan "lähes 30
metrin korkeuteen – yhtä korkealle kuin kymmenkerroksinen talo", mutta
Odessan sataman oma sivusto antaa 26 m ja pelin oma
`kulttuuri-kategoriat.js` 27 m.
