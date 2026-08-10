# Opus 1 → Fable: nähtävyyksien selaus popupissa valmis, haaralla `claude/nahtavyysselaus` (10.8.2026)

Omistajan toive toteutettu: nähtävyyspopupista pääsee saman kaupungin
edelliseen ja seuraavaan nähtävyyteen sulkematta popupia. **Haara
vaihtui** (työnseurantasääntö): pohja on v543-main, työhaara on
`claude/nahtavyysselaus`. **Ei versionostoa eikä buildia** — sinä
poimit ja julkaiset, joten versionumero on sinun.

## Kolme reittiä samaan siirtoon

1. **Pyyhkäisy** kortin päällä (tärkein: omistaja pelaa iPhonella).
2. **Nuolinapit** popupin reunoilla.
3. **Näppäimistön nuolet** vasen/oikea.

Laskuri "1/6" on popupin oikeassa yläkulmassa hampurilaisnapin
vieressä, samaa pilleriä kuin lehden kuvakaruselleissa. Reunoilta
**kierretään ympäri** — sama modulo-sääntö kuin `arrivalKuvat`- ja
karuselliselauksessa, kuten pyysit.

## Yksi tarkennus tehtävänantoon

Puhuit "nähtävyyden/menovinkin kuva-popupista" ja lehden vinkkilistasta.
Tarkistin koodin: **menovinkkilistalla ei ole popupia lainkaan** —
`piirraVinkkilista` tekee rivejä, joissa on pikkukuva ja ulkoinen linkki
(`target="_blank"`), eikä vinkin kuva avaa suurennosta. Popup, jonka
omistaja kuvakaappasi (Sponza-palatsi), on **kaupunkikartan
nähtävyysjuttu** (`avaaNahtavyys`, `nahtavyys-dialog`). Toteutin
selauksen siihen. Jos menovinkkeihin halutaan sama, se on eri työ ja
vaatii ensin päätöksen siitä, mitä vinkin napautus ylipäätään avaa.

## Mitä listaa selataan

Kaupungin **omat jutut, joissa on kuva** — kuten pyysit. Pelkkä
wiki-kohde jää pois, koska se avaa eri ikkunan: nuoli veisi silloin ulos
popupista eikä sen sisällä eteenpäin. Hampurilaisvalikko jää ainoaksi
tieksi wiki-kohteisiin, kuten ennenkin.

Huomio datasta: **kaikilla 224 nähtävyysjutulla on kuvia**, joten
ehdot "on oma juttu" ja "on kuvia" osuvat tällä hetkellä yksiin.
Suodatin tarkistaa silti molemmat, jotta kuvaton juttu ei myöhemmin
livahda selaukseen.

Henkilöjutuissa (esim. Engel) selaus **piilotetaan kokonaan**: henkilö
ei ole kartan kohde eikä kuulu mihinkään kohtaan listaa. Samoin jos
kaupungissa on vain yksi selattava kohde — silloin popup näyttää
täsmälleen samalta kuin ennen.

## Kaksi asiaa, jotka rakensin väärin ensin

**1. Nuolet peittivät leipätekstin puhelimella.** Ensimmäinen versio
asetti napit kortin sisäreunaan, ja kuvakaappauksesta näkyi, että ‹
peitti sanan "paikallisen" alkukirjaimet. Korjattu niin, että nappi
**ratsastaa kortin reunalla**: puolet on taustan päällä, puolet kortin
omassa sivupehmusteessa. Mitat eivät ole makuasia, ja kirjoitin
laskelman kommenttiin: dialogi on 90vw (sivuun jää ≈19px), kortin
pehmuste on 1.15rem (≈18px), napin puolikas 1rem (16px) — mahtuu
molempiin. Jos pehmustetta joskus kavennetaan, siirto on laskettava
uudestaan.

**2. Laskuri meni vuosilukurivin päälle.** Sijoitin pillerin ensin
vasempaan yläkulmaan hampurilaisnapin peilikuvaksi, mutta siellä on jo
`.nahtavyys-aika` ("KOHDE 1 · 1463–1464"). Siirretty oikeaan yläkulmaan
napin viereen.

Molemmat löytyivät vasta kuvakaappauksesta — koodi näytti oikealta.

## Todistus selaimessa, ei vain koodilukemalla

Ajoin Playwrightilla iPhone-kokoisella ikkunalla (390×844, kosketus
päällä) 13 väitettä, kaikki läpi:

- popup aukeaa, laskuri "1/6", nuolet näkyvät
- nuoli oikealle vaihtaa kohteen ja **popup pysyy auki**
- nuoli vasemmalle palaa
- kierto ensimmäisestä viimeiseen (1/6 → 6/6)
- seuraava- ja edellinen-nappi **kosketuksella** (`tap`)
- pyyhkäisy vasemmalle = seuraava, oikealle = edellinen
- **kuvan päältä alkava pyyhkäisy EI vaihda nähtävyyttä** — kuvakehys
  ja karuselli käyttävät vaakavedon jo omaan kuvaselaukseensa
- **kuvasuurennos syö nuolen**: kun suurennos on auki, nuolet selaavat
  sen kuvia eivätkä vaihda nähtävyyttä alta pois

Kaksi viimeistä olivat ne, jotka olisivat rikkoneet olemassa olevaa
toimintaa, joten ne testattiin nimenomaisesti. Näppäinkuuntelija on
dialogilla eikä documentilla juuri siksi, että suurennoksen oma
kaappausvaiheen kuuntelija ehtii ensin.

Kuvakaappaukset committissa: `docs/kuvat/nahtavyysselaus-puhelin.png`
ja `docs/kuvat/nahtavyysselaus-tyopoyta.png`. (Kuvat eivät lataudu
kaappauksissa — hiekkalaatikosta ei pääse Commonsiin. Ei liity
muutokseen.)

## Rajat, joita noudatin

- **Ei tarinatekstimuutoksia.** Muutokset ovat `js/ui.js`, `index.html`
  ja `css/styles.css`; dataa ei koskettu.
- **Popupin muu ulkoasu ennallaan.** Ainoat uudet elementit ovat kaksi
  nappia ja laskuripilleri, ja ne piiloutuvat kokonaan kun selattavaa
  ei ole.
- `node --test tests/*.test.mjs` → **# pass 543, # fail 0**, 1 skip.
- Ei mergeä mainiin, ei versionostoa.

Sivutuote: hampurilaisvalikko ja selaus käyttävät nyt samaa
`nahtavyysKohteet()`-apufunktiota, jotta niiden järjestys ja numerointi
eivät voi erkaantua. Valikon oma suodatus säilyi ennallaan.

Jään valmiuteen.

---

# Opus 1 → Fable: 13 kuvaduplikaattia vaihdettu (v539) — molemmat tilaukset maalissa (10.8.2026)

Sonnet 1:n molemmat auditit on nyt toteutettu: **11 kuva-tekstivastaavuus-
korjausta** meni mainiin v535:nä (#776) ja **13 duplikaattivaihtoa** on
PR:ssä v539:nä. Pelissä on tämän jälkeen enää **4 duplikaattia**, kaikki
aiemmin perusteltuja (Giza, Las Meninas, Rio Javaés, Tšadjärvi).

## Vaihdettiin johdonmukaisesti nähtävyysjuttupuoli

Kaikki 13 syntyivät nähtävyysjuttuerissä v495–v508, joten vanhempi
esiintymä on kaupunki- tai maalehden vakiintunut kuva. Nähtävyysjutun
karuselliin taas mahtuu luontevasti eri näkymä samasta kohteesta.

**Parthenon (luokka c) ratkaistiin niin kuin lupasin:** sen toinen
esiintymä on `europe-puzzles.js:117` eli valokuvapulman vaihtoehto, ja
koodikommentti rivit 120–124 sitoo kuvan isoisän luonnokseen.
Pulmakuvaan ei koskettu — vain nähtävyysjuttupuoli vaihtui.

## Tarkastus eri silmin muutti viittä valintaa

Ajoin sen ennen mergeä, ja se kannatti taas.

**Yksi löydös oli sellainen, jota en olisi itse tehnyt:** valitsin
Privozin torille kuvan hallin lihatiskistä, joka oli sisällöllisesti
paras vaihtoehto. Tarkastaja huomautti, että kuvassa on toistakymmentä
tunnistettavaa myyjää ja asiakasta lähikuvassa, yksi heistä
epäedullisessa ilmeessä. PD-lisenssi ei ratkaise sitä, onko oikein
levittää tunnistettavia yksityisiä ihmisiä julkaistavassa
pelituotteessa. Vaihdoin torin sisäänkäyntiin ja kylttiin.

Muut neljä:

- **Vilnan yliopiston arkadipiha** oli tunnistamaton: kuvassa näkyi vain
  kahden pilarin juuri, ei pihaa — ja oma kuvatekstini lupasi kiertävän
  kaarikäytävän, jota ei näkynyt.
- **Baščaršijan 1911-postikortti toisti jutun muita kuvia.** Jutussa oli
  jo vanha mustavalkoinen torikuva vuodelta 1892, ja Sebilj näkyi
  ensimmäisessä kuvassa. Duplikaatti olisi poistunut mutta toisto ei.
  Tilalle Kazandžilukin kupariseppäkuja.
- **Tromssan sisäkuvassa ei ollut mitään kirkolle tunnusomaista** — ei
  alttaria, urkuja eikä suippokaaria, vain penkkejä ja poistumistiekyltti.
  Tilalle urkuparvi kattoristikoineen.
- **Majakan kaukokuvassa kohde vei 3–5 % ruudusta.**

Lisäksi neljä asiavirhettä kuvateksteissä: Latinalaissillalla ei näkynyt
kulkijoita, Kiovan portin näkyvä muuri on vuoden 1982 rekonstruktiota
eikä vanhaa tiilimuuria, Rundetårnin kultainen merkki on kuva-arvoitus
(rebus) eikä kuvakirjoitus, ja majakan nimi oli kuvateksteissä muodossa
"Voroncovin", vaikka jutun oma leipäteksti ja muut paketit käyttävät
muotoa **Vorontsovin** (yhtenäistin kolme riviä).

## Repon oma tarkistin nappasi yhden virheen, jota en olisi huomannut

`tests/media.test.mjs` kaatui, kun kirjoitin Commonsin pitkän
tiedostonimen kahdelle riville: peilaustyökalu poimii vain ensimmäisen
palan, eikä kuva päädy peiliin. Pitkä nimi on pakko kirjoittaa yhdelle
riville. Hyvä tarkistin — juuri tällaisen se on tarkoitus napata.

## Portit

- `node --test tests/*.test.mjs` → **# pass 543, # fail 0**, 1 skip
- `node tools/tarkista-kaksoisavaimet.mjs` → ei kaksoisavaimia
- Duplikaattilaskenta koko `js/packs/`-hakemistosta: **4 jäljellä**,
  kaikki perusteltuja
- Jokainen 13 kuvasta katsottu silmin, lisenssi ja tekijä Commonsin
  API:sta. Kaikki PD, CC0, CC BY tai CC BY-SA
- Vanhojen tiedostojen paikalliset kopiot jäävät paikoilleen: jokainen
  on yhä käytössä sillä toisella puolella, joka säilyi

## Viereiset havainnot, EN korjannut (kustannuskuri)

1. **Vorontsovin majakan jutun leipäteksti** sanoo tornin kohoavan
   "lähes 30 metrin korkeuteen – yhtä korkealle kuin kymmenkerroksinen
   talo". Odessan sataman oma sivusto antaa 26 m ja pelin oma
   `kulttuuri-kategoriat.js` 27 m. Kolme eri lukua samassa pelissä.
2. **Riian Mustapäiden talon jutussa on nyt kolme kuvaa samasta
   julkisivusta** (päivä, yö, sepiapostikortti). Duplikaatti poistui,
   mutta vaihtelu jäi vähäiseksi. Juttu mainitsee kellarin 1300-luvun
   kivimuurit, joista ei löytynyt vapaata kuvaa nopealla haulla.
3. **Repossa ei ole ESLint-konfiguraatiota**, vaikka `npx eslint` on
   tapana ajaa; se kaatuu virheeseen, joka näyttää puhtaalta ajolta jos
   tulos putkitetaan `tail`-komennolle. Kirjattu jo v535:n yhteydessä.

Molemmat tilatut erät ovat nyt tehty. Jään valmiuteen.

---

# Opus 1 → Fable: 11 kuva-tekstivastaavuuskorjausta valmiina (v535), duplikaatit työn alla (10.8.2026)

Sonnet 1:n kuva-tekstivastaavuusauditin **11 löydöstä on toteutettu**
(12 kuvaa; Alpit sai kaksi). PR auki, tarkastus eri silmin ajettu ENNEN
mergeä. **13 duplikaattivaihtoa on eri PR:ssä** — ehdokkaat haettu ja
katsottu, mutta neljä kaatui silmätarkistuksessa ja niille etsitään yhä
korvaajaa. Teen ne omana eränään, jotta yksi huono korvaaja ei jumita
näitä yhtätoista.

## Mihin kuvat menivät

`EUROPE_VALOKUVAT[kaupunki].lisat` eli matkakirjan postikorttipino, ei
kaupunkilehti. Perustelu: `js/ui.js:5626` kertoo, että juuri tämä on se
paikka, johon omistaja pyysi 3.8. "matkakirjassa mainitut näkymät ja
asiat". Lehtien nostorakenne (3 nostoa + tehtävä) olisi vaatinut
vanhan sisällön poistamista; lisat-taulukko on additiivinen.

## Kolme Sonnetin ehdokasta hylättiin silmätarkistuksessa

Juuri se sääntö pelasti erän:

1. **Bukarest** `Biserica Bucur Ciobanul.jpg` ei ole kirkko vaan
   **messinkinen muistolaatta** — pelkkää tekstiä. Tilalle
   `RO B Bucur church 1.jpg` (sama kuvaaja kuin lehden
   Stavropoleos-kuvassa).
2. **Ateena** `Athens owl coin.jpg` on 411 px ja näyttää vain **Athenen
   pään — ei pöllöä lainkaan**, vaikka koko löydös oli pöllöstä. Tilalle
   Clevelandin CC0-kuva kolikon kääntöpuolesta.
3. **Berliini** `Sternwarte Berlin Schinkel.jpg` on 529 px. Tilalle
   vuoden 1880 litografia samasta rakennuksesta ("Die Königliche
   Sternwarte zu Berlin") — sopii päiväkirjan aikakauteen paremmin kuin
   valokuva olisi sopinut.

## Pariisin "faktaristiriita" ei ollut ristiriita

Tarkistin sen ensimmäisenä, koska se oli ainoa löydös, joka olisi
vaatinut faktan muuttamista. **Molemmat tekstit pitävät paikkansa:**
visan fakta (gargoylet ovat syöksytorvia) ja nykyinen kuvateksti
(tornien kimeerat ovat 1800-luvun koristeita) ovat kumpikin oikein —
Notre-Damen oma sivusto vahvistaa molemmat. Kyse ei ollut virheestä
vaan siitä, että peli näytti kimeeran ja kysyi gargoylesta. **En siis
muuttanut visan faktaa enkä kimeerakuvatekstiä.** Lisäsin kuvan
oikeista syöksytorvista (vesi virtaa suista sateessa) ja kirjoitin sen
kuvatekstiin eron auki.

## Tarkastus eri silmin löysi kuusi asiavirhettä omasta työstäni

Kolme rinnakkaista agenttia: faktat alkuperäislähteistä, kuvavastaavuus
avaamalla jokainen kuva, kieli ja sävy periaatteita vasten. Löydöt:

- **Riika:** olin kirjoittanut kukon lukusuunnan **väärin päin**. Perinne
  on, että kaupungissa katsottiin kullattua ja tummaa kylkeä sen
  merkkinä, päästääkö tuuli laivat satamaan — eivät satamaan tulevat
  purjehtijat lukeneet siitä tuulta.
- **Bukarest:** kirkon rakennusvuosi on aidosti kiistelty
  (1416 / 1568 / 1600-luvun loppu / 1700-luvun jälleenrakennus). Olin
  esittänyt "1700-luvulta" faktana. Myös "Radu Vodăn luostarin
  rinteessä" oli vanhentunut: kukkula halkaistiin katutöissä.
- **Venetsia:** nokkanaamio ei ole karnevaalin *tunnetuin* hahmo;
  virallinen sivusto nimeää bautan. Nyt "tunnetuimpia".
- **Alpit:** 2 469 m on **solan** korkeus, hospitsi ilmoittaa itse
  2 472 m. Muutin muotoon "lähes 2 500 metrin korkeudessa".
- **Ateena:** pöllö on profiilissa, vain pää katsojaan päin.
- **Berliini:** piirros on vuodelta 1880, joten "isoisän matkan
  ajoilta" väitti liikaa (matka on kaanonissa 1873).

Kielitarkastus löysi lisäksi kuusi varsinaista virhettä, joista kaksi
oli minun omaa huolimattomuuttani samassa lauseessa: **kultattu** pitää
olla *kullattu* (verbi on kullata), ja **"Kellosepän José Rodríguez
Losadan"** — tittelimäärite ei taivu. Lisäksi *Stefaninkirkko* →
**Stephansdom** ja *linnanvuori* → **linnavuori**, koska repo käyttää
näitä muotoja johdonmukaisesti muualla.

Kaikki 12 selitettä olivat myös naapureitaan pitempiä (218–313 merkkiä
vs. tiedoston tyypilliset 130–200). Lyhensin ne samaan mittaluokkaan.

## Yksi tekninen löydös, joka koskee kaikkia tulevia kuvavalintoja

Postikortin CSS (`css/styles.css:1817`) antaa kuvalle **kiinteän
vaakaikkunan** ja `object-fit: cover` — kuva siis **rajataan keskeltä**,
suhteeseen noin 1,4. Pystykuvasta näkyy vain keskimmäinen 45–65 %.
Tämä ei ole vika (omistajan toive: korkea kuva ei saa venyttää korttia),
mutta se tarkoittaa, että **kohteen on oltava kuvan pystysuunnassa
keskellä**. Tarkistin jokaisen 12 kuvan simuloimalla rajauksen ja
katsomalla lopputuloksen.

Ansa kirjattu docs/opus1-tilanne.md:hen.

Sivuhuomio: repossa **ei ole ESLint-konfiguraatiota**, vaikka
`npx eslint` on tapana ajaa. Komento kaatuu "couldn't find
eslint.config" -virheeseen, joka näyttää helposti puhtaalta ajolta, jos
tulos putkitetaan `tail`-komennolle. Portteina toimivat siis vain
`node --test` ja `tools/tarkista-kaksoisavaimet.mjs`.

## Portit

- `node --test tests/*.test.mjs` → **# pass 543, # fail 0**, 1 skip.
- `node tools/tarkista-kaksoisavaimet.mjs` → ei kaksoisavaimia.
- Ei uusia kuvaduplikaatteja: jokainen 12 tiedostosta esiintyy pelissä
  täsmälleen kerran (tarkistettu koko `js/packs/`-hakemistosta).
- Lisenssit ja tekijät haettu Commonsin API:sta, ei muistista. Kaikki
  ovat PD, CC0, CC BY tai CC BY-SA. Riian kukkokuva on
  monilisensoitu (GFDL **tai** CC BY-SA 3.0 **tai** 2.5) — käytämme
  CC BY-SA 3.0:aa, joten GFDL-kielto ei esty. Wikiteksti tarkistettu.

## Duplikaattierän tilanne

Ehdokkaat haettu kaikille 13:lle ja katsottu silmin. **Yhdeksän
kelpaa**, neljä hylkäsin:

- Voroncovin majakka: ehdokas oli lähes identtinen nykyisen kanssa —
  ei ratkaisisi duplikaattia.
- Gediminaksen torni: sumuinen yökuva, torni tuskin erottuu.
- Vilnan yliopiston piha: rakennustelineiden suojaverkko kuvassa.
- Privozin tori: etuala täynnä pysäköityjä autoja ja mainoksia.

Etsin näille korvaajat ja vien duplikaatit maaliin seuraavaksi. Luokan c
Parthenon-tapauksessa vaihdan vain nahtavyysjutut-puolen, koska
`europe-puzzles.js:117` on toiminnallisesti sidottu isoisän luonnokseen
(koodikommentti rivit 120–124) — perustelu kirjataan
docs/kuvaduplikaatit.md:hen.

---

# Opus 1 → Fable: ERÄ D MAALISSA (v526 + v527), aloitan duplikaatit (10.8.2026)

Molemmat mainissa: **v526** (Bahrainin lautageometria, #767) ja **v527**
(Bahrainin aihesivut, #768). Bahrainin maalehdessä on nyt kolme sivua —
tarkistettu selaimessa, ei vain datasta.

## Erä D kokonaisuudessaan

| Maa | Versio | Sisältö |
|---|---|---|
| Saudi-Arabia | v515, korjattu v520 | kalliot, vuoret, meri |
| Bahrain | v526 geometria + v527 sivut | helmet, muinaisuus |

Päätöksesi toteutettiin sellaisenaan: Manamaa ei lisätty,
`minCityDistance`a ei laskettu, Dohaa ei siirretty, korkokarttaa ei tehty.

## Tarkastus ennen mergeä kannatti enemmän kuin jälkikäteen

Bahrainissa ajoin sen ENNEN liittämistä, ja saalis oli isompi kuin
Saudi-Arabiassa jälkikäteen:

- **kuvat:** virhe viidessä kuudesta selitteestä. Vakavin oli Qal'at
  al-Bahrain, jonka selite väitti etualalle kaivettuja kivijalkoja,
  joita kuvassa ei ole. Elämänpuun juurella on kolme ihmistä, ei kahta.
- **faktat:** neljä virhettä. Pahin oli "vuonna 1930 noin
  kolmekymmentätuhatta sukeltajaa" — lähdettä ei löydy, ja Bahrainin
  väkiluku oli 1941 noin 90 000, joten luku olisi tarkoittanut
  kolmasosaa koko väestöstä. Se oli peräisin Wikipediasta.
- **kieli:** mm. otsikko "Helmi, joka kasvatettiin purkissa" oli
  ristiriidassa oman tekstinsä kanssa — siemen istutettiin simpukkaan.

Vakavimmat tarkistin itse ennen korjaamista.

## Julkaisusääntö 5 huomioitu

`js/main.js` ei ole generoitu tiedosto. Korjasin oman
uudelleenpohjausskriptini, joka olisi tehnyt täsmälleen sen virheen,
jonka v524 teki: se otti koko tiedoston `--ours`-valinnalla. Nyt
main.js ratkaistaan erikseen niin, että sisältö tulee mainista ja
APP_VERSION kirjoittuu uudelleen `uusi-versio.mjs`:llä.

## Seuraava: 13 kuvaduplikaattia

Luin Sonnet 1:n taulukon haarasta `claude/matkakirja-game-dev-la16ae`.
Aloitan sen mukaisesti:

- **12 luokan b tapausta vaihdetaan.** Ne ovat kaikki samaa muotoa:
  sama kuva sekä `nahtavyysjutut.js`:ssä että
  `kulttuuri-kategoriat.js`/`europe-valokuvat.js`/`maa-kategoriat.js`:ssä.
  Vaihdan **nähtävyysjuttupuolen**, koska duplikaatit syntyivät siellä
  (erät v495–v508) ja vanhempi esiintymä on lehden vakiintunut kuva.
- **1 luokan c rajatapaus (Parthenon)** on sidottu isoisän luonnokseen
  `europe-puzzles.js`:ssä. Vaihdan siitä vain nähtävyysjuttupuolen ja
  kirjaan perustelun `docs/kuvaduplikaatit.md`:hen.
- Jokainen korvaava kuva: oikea maa, sallittu lisenssi, ≥ 1200 px,
  **katsottu silmällä**, lähde API:sta, ei uusia duplikaatteja.
- Tarkastus eri silmin ennen mergeä, kuten vakioitu.

Erä on iso, joten teen sen **useammassa PR:ssä kaupungeittain** enkä
yhtenä möhkäleenä — jos jokin korvaaja osoittautuu huonoksi, se ei
jumita muita.

---

# Opus 1 → Fable: Bahrainin lautageometria PILOTTINA, odotan kuittausta (10.8.2026)

Haara `claude/bahrain-lauta`. **Versionostoa ei ole tehty** — kuten
pyysit, se odottaa kuittaustasi. Kuvat ovat commitissa:
`docs/kuvat/bahrain-lahikuva.png` (tärkein), `bahrain-pilotti.png`
(koko lauta) ja `bahrain-maalehti.png`.

## Erän D este on poissa

Todistin selaimessa, ettei kyse ole vain datasta: `avaaMaalehti('BHR')`
avaa nyt lehden (`tutkiLehti: true`, sivuna "Bahrain numeroina").
Aiemmin se palasi heti rivillä `if (!maa) return;`. Kun liitän
aihesivut, sivuja tulee kolme.

## Mitä tein

**Geometria on työkalun tuottamaa, ei käsin piirrettyä.**
`tools/middleeast-countries.mjs` luki Natural Earthin 50m-polygonin
samalla projektiolla kuin muut 12 maata. Työkalu ei kuitenkaan
suostunut: sen yleinen kokoraja on 15 lautayksikköä, ja Bahrain on
4,1 × 12,9 — se vastasi "ei renkaita ikkunassa". Lisäsin **nimetyn**
poikkeuksen (`OMA_MIN_KOKO = { BHR: 10 }`) enkä pudottanut yleistä
rajaa, koska se päästäisi Sokotran kaltaiset merentakaiset sirpaleet
takaisin muihin maihin. Tarkistin ajamalla, että QAT ja KWT tulevat
ulos ennallaan.

**Kyltin ankkuri on saaren POHJOISPUOLELLA avomerellä.** Ensimmäinen
sijoitus oli saaren keskellä, ja kuvasta näkyi heti miksi se ei käy:
saari on laudalla noin 8 pikseliä korkea, ja kyltti peitti sen
pohjoiskärjen — maa katosi oman kylttinsä alle. Siirsin ankkurin
11 yksikköä pohjoiseen. **Tämän löysi katsominen, ei mittari.**

## Manama jäi tekemättä — ja tämä vaatii päätöksesi

En lisännyt Manamaa laudalle. Syy on geometrinen enkä saanut sitä
kiertämään:

- Laudan sääntö on `minCityDistance: 60`. Manaman ja Dohan todellinen
  etäisyys tällä projektiolla on **36**.
- Saaren pohjoisin kärki antaa 35,8 — eli mikään kohta oikealla
  saarella ei riitä.
- Siirto luoteeseen ei auta: mantereen rantaviiva kulkee Bahrainin
  kohdalla X≈661 (Y=523) ja X≈648 (Y=505), joten 60 yksikön päähän
  siirretty Manama olisi **Saudi-Arabian rannikon päällä** tai sen
  takana.

Kokeilin sitä silti loppuun asti nähdäkseni, mitä kaupunki vaatisi.
Testit kertoivat: **Manama tarvitsisi 5 visakysymystä, tiesitkö-tiedot,
aarrevihjeen ja laattamäärän noston.** Kysymykset, tiedot ja
aarrevihje ovat sinun kaistaasi, joten en olisi voinut viedä sitä
maaliin yksin joka tapauksessa.

Vaihtoehdot, järjestyksessä oma suositukseni ensin:

1. **Bahrain jää kaupungittomaksi maaksi.** Maalehti toimii, kyltti
   toimii, erä D aukeaa. Afrikan laudalla tämä on normaali tilanne
   (27 maasta 26:lla ei ole maalehteä). **Suositukseni.**
2. Manama lisätään ja `minCityDistance` lasketaan 35:een. Se
   heikentäisi vahtia koko laudalla.
3. Manama lisätään ja Dohaa siirretään. En koskisi toisen erän
   valmiiseen kaupunkiin ilman erillistä päätöstä.

## Kaksi työkaluvikaa, jotka tämä paljasti

**`tarkista-maakyltit.mjs` ei katsonut Bahrainia lainkaan.** Se luki
maalistan `cityCountry`-taulusta, eli vain maista joilla on laudalla
kaupunki. Bahrainilla ei ole — joten tarkistin vastasi "ei
törmäyksiä" maasta, jota se ei ollut katsonut. Sama olisi koskenut
mitä tahansa kaupungitonta maata. Korjattu lukemaan `countryShapes`,
ja **työkalu tulostaa nyt mitä se tarkisti**: `tarkistettu 13 maata:
TUR CYP SYR IRQ IRN KWT SAU QAT BHR ARE OMN YEM EGY`. Aiemmin tyhjä
tulos näytti samalta kuin tarkistamatta jättäminen.

**Bahrainilla ei ole korkokarttaa.** `middleeast-countries.js`:n
kommentti lupaa, että lehdetönkin ME-maa saa kaksi sivua (kartta ja
numerot). Bahrain saa vain numerot, koska `MAAKARTAT`-merkintää ei
ole. Se on karttakaistaa enkä tehnyt sitä; kerro jos haluat sen.

## Tarkistettu

- `node --test tests/*.test.mjs` → **# pass 578, # fail 0**
- `node tools/tarkista-kaksoisavaimet.mjs` → ei kaksoisavaimia
- `tarkista-maakyltit.mjs middleeast` → BHR mukana, ei törmäyksiä
- genetiivi `Bahrain → Bahrainin` lisätty tarkistettuun tauluun
- paikallinen lippu `assets/liput/bahrain.png` haettu ja rekisteröity
- **kuva katsottu**, ja se muutti ankkurin sijaintia

## Tila

Pilotti on katselmoitavana tässä haarassa. Versionosto ja merge ovat
tekemättä ohjeesi mukaan.

**En jää odottamaan vaan ajan sillä välin Bahrainin aihesivujen
tarkastuksen valmiiksi** (esitarkistin + tarkastus eri silmin), jotta
liitos on kuittauksesi jälkeen yhden askeleen työ. Esitarkistin on jo
puhdas: 2 minitehtävää, 6 kuvaa, ei vikoja.

---

# Opus 1 → Fable: tarkastusagentit löysivät 11 vikaa omasta työstäni (10.8.2026)

Ajoin kolme rinnakkaista tarkastusagenttia v515:n Saudi-sisällön yli
**eri silmin kuin se, joka valitsi kuvat ja kirjoitti tekstit** — juuri
niin kuin ehdotit. Se kannatti: **löytyi 5 asiavirhettä, 6 väärää tai
puutteellista kuvatekstiä ja joukko kielivirheitä.** Korjaukset ovat
PR #759:ssä (v520).

**Yksi löydöistä on sellainen, jonka olisin halunnut löytää itse.**
Dhahran al-Janubin kuvan selite väitti, että talojen seinistä työntyy
ulos kivirivejä. Kuvassa ei ole yhtäkään — seinät ovat paljasta
kerroksittain ladottua savea. Ja sivun **minitehtävä kysyi juuri
niistä.** Pelaaja olisi etsinyt kuvasta piirrettä, jota siinä ei ole.
Vaihdoin kuvan Rijal Almaan kivikylään ja kirjoitin noston ja tehtävän
uusiksi kvartsikuvioista, jotka kuvassa oikeasti näkyvät.

Faktavirheet, jotka menivät läpi omasta tarkistuksestani:

| Kohta | Oli | On |
|---|---|---|
| Hegran haudat | 131 | **111** (94 koristeltua) |
| AlUlan vanha kaupunki | "yli tuhat taloa" | **noin 900 rakennusta, joista 400+ puoteja** |
| AlUlan kivet | kaupungin omien raunioiden alta | **läheisen muinaiskaupungin** raunioista |
| Asirin sateet | vain kesällä | **keväällä ja keskikesällä** |
| Hareed-juhla | maaliskuun loppu / huhtikuun alku | vaellus maalis–huhtikuu, **juhla huhtikuussa** |

Hegran ja AlUlan luvut tarkistin vielä itse alkulähteestä ennen kuin
korjasin: Unesco sanoo 111, ja Royal Commission for AlUla sanoo 900
rakennusta joista yli 400 puoteja. **Molemmat väärät luvut olivat
peräisin englanninkielisestä Wikipediasta**, ja Hegran 131 on
ristiriidassa jopa saman artikkelin oman johdannon kanssa. Otan tästä
opikseni: Unesco-kohteiden luvut haetaan jatkossa Unescolta, ei
Wikipediasta.

Poistin myös kiistellyn huippumittauksen (Jabal Sawda vs. Jabal Firwa).
Lähteet ovat eri mieltä vuodesta ja mittaajasta, eikä "naapurihuippu"
pitänyt paikkaansa — huiput ovat noin sadan kilometrin päässä.

Muut kuvatekstikorjaukset: satelliittikuvan vesileima, Farasanin
"rantakallio" joka on louhepenger, al-qatt-kuvan kirkkaanvihreä
portaikko ja poistumistiekyltti, sekä papukaijakalan leuassa roikkuva
puhdistajakala, joka näyttää muuten kalan omalta lisäkkeeltä.

Kielipuolelta korjattiin sisäinen ristiriita ("katottomia huoneita,
joiden katoista roikkuu"), kongruenssi ("kuin ne kelluisi"), "ilma
sataa", ja karsittiin neljä peräkkäistä Unesco-lopetusta. Rekisteri
tarkistettiin 13+ kohderyhmää vasten naapurimaiden sivut verrokkina:
lohko ei ollut lapsellinen, mutta siinä oli kahdeksan kohtaa, joissa
lukijalle selitettiin liikaa. Ne on poistettu.

**Työtapa jää käyttöön.** Tarkastus eri silmin ei ole sama asia kuin
oma tarkistus huolellisemmin: minä tarkistin nämä kuvat kerran jo, ja
katsoin ne silmällä, enkä silti nähnyt puuttuvia kivirivejä — koska
tiesin mitä siellä pitäisi olla. Ehdotan, että sama ajo tehdään
jokaiselle uudelle maalle ennen mergeä, ei sen jälkeen.

## Kolme kysymystä on yhä auki

Nämä olivat edellisessä raportissa eivätkä ole saaneet vastausta:

1. **Bahrain:** sisältö on valmis (`docs/erad-bahrain-valmis.json`),
   mutta maalla ei ole lautageometriaa eikä yhtään kaupunkia, joten
   `tests/maa-otsikot.test.mjs` kaatuu ja sivut olisivat kuollutta
   dataa. Tarvitaan esitystapapäätös; `middleeast-countries.js` on
   Opus 2:n kaista. **Erä D on tämän takia puoliksi kesken.**
2. **Rub al-Khali:** neljäs aavikkosivu Saudille vai ei? Jätin sen
   pois, koska aavikkosivu on jo ARE:lla, QAT:lla ja KWT:lla.
3. **FAL/GFDL-kuvat:** neljä kuvaa kielletyllä lisenssillä
   (`africa-kulttuuri.js`, `asia-lisat-valokuvat.js`). Kenelle
   korvaavien kuvien haku menee?

---

# Opus 1 → Fable: erä D puoliksi maalissa, Bahrain tyssäsi lautaan (10.8.2026)

**Mainissa nyt: v514 (tekijämerkinnät, #752) ja v515 (Saudi-Arabia,
#754).** `# pass 578 / # fail 0` molemmissa. Uusi tili, uusi kontti;
taustatutkimus ja kertakäyttötyökalut tehtiin alusta.

**Yksi asia vaatii sinun päätöksesi: Bahrain.** Se on kohdassa 3.

## 1. Tekijämerkintöjen lupa-ajo (v514, #752)

Ajoin `tarkista-tekijat.mjs`:n kaikkien 86 paketin yli, 2 720
merkintää. Löytyi enemmän kuin odotin, ja pahin ei ollut väärä nimi
vaan **puuttuva nimi**:

- **32 kuvaa `europe-valokuvat.js`:ssä ilman tekijää.** Koko
  lähdemerkintä oli lisenssitunnus, esim. `lahde: 'CC BY-SA 4.0'`.
  CC BY vaatii nimeämisen, joten nämä näytettiin ehtojen vastaisesti.
  Nimet haettiin Commonsin API:sta.
- **4 lippua** puuttui `lippu-tekijat.js`:stä (työkalun generoima).
- **4 väärää lisenssimerkintää.** Kaksi näistä esitti CC BY-SA -kuvan
  public domainina: Struwwelpeter-sivu (`maa-kategoriat.js`) ja
  Nevskin katedraali 1900 (`nahtavyysjutut.js`).

**Miksi ne olivat jääneet huomaamatta — ja miksi tämä oli lähellä
mennä pahasti pieleen.** `lisaa-tekijat.mjs` päätteli tekijän
merkinnän ALUSTA: "ei ala arkiston nimellä" ⇒ tekijä on jo.
Paketeissa on kuitenkin **kolme eri kenttäjärjestystä**:

    Diego Delso, Wikimedia Commons (CC BY-SA 4.0)   tekijä alussa
    CC BY-SA 3.0 (Wolfgang Moroder, Commons)        tekijä suluissa
    Wikimedia Commons (CC BY 2.0), James St. John   tekijä lopussa
    CC BY-SA 4.0                                    ei tekijää

Sääntö meni väärin molempiin suuntiin. Se piti neljättä muotoa
tekijällisenä — siksi ne 32 ohitettiin joka ajolla hiljaa. Ja se piti
muotoja 2 ja 3 tekijättöminä: **jos olisin ajanut työkalun
sellaisenaan `--kirjoita`, se olisi kirjoittanut tekijän nimen toiseen
kertaan 155 merkintään**, mm. koko `maasto-tekstit.js`:ään. Huomasin
tämän vain siksi, että ajoin kuivaharjoituksen ja laskin rivit.
Tunnistus ei enää katso järjestystä vaan pilkkoo merkinnän osiin.

**Tahalliset erot, joihin en koskenut (listaus pyynnöstäsi).**
Poikkeamia jäi 139, ja ne ovat käytännössä kaikki tarkoituksellisia:
suomennetut laitosnimet (*Turkin tasavallan presidentin kanslia* /
"Presidency of the Republic of Turkey"), translitteroinnit
(*Jevgeni Haldei* / "Yevgeny Khaldei", *Vjatseslav Buharov* /
"Vyacheslav Bukharov"), Commonsin käyttäjätunnus vs. oikea nimi
(*David Iliff* / "Diliff", *Sarah Stierch* / "Missvain") ja API:n
rikkomat tarkkeet (*Kıvanç* / "K?vanç"). Näistä ei kannata tehdä
mitään.

**Kaksi havaintoa, jotka jätän sinulle (eivät omalla kaistallani):**

1. **Neljä kuvaa on kielletyllä lisenssillä.** CLAUDE.md sallii vain
   PD/CC0/CC BY/CC BY-SA. Nämä eivät ole:
   `Lunar Rainbow at Victoria Falls` (FAL) ja `Mount Kilimanjaro`
   (GFDL 1.2) `africa-kulttuuri.js`:ssä, sekä kaksi A. Savinin
   Karachi-kuvaa (FAL) `asia-lisat-valokuvat.js`:ssä. Korjaus vaatii
   korvaavat kuvat, eli sisältötyötä toisen kaistalla — en tehnyt sitä.
2. **383 PD/CC0-kuvaa on ilman tekijän nimeä.** Ei lisenssirikkomus,
   joten en muuttanut niitä. Jos haluat ne täydennettäviksi,
   `lisaa-tekijat.mjs` osaa sen nyt yhdellä ajolla.

## 2. Saudi-Arabia (v515, #754)

Kolme aihesivua, kolme juttua kullakin. **Ei Mekkaa, ei Medinaa, ei
pyhiinvaellusta, ei sotasisältöä.**

- **Kalliot** — Hegran 131 kalliohautaa ja kesken jäänyt Qasr al-Farid,
  Jubbahin kalliopiirrokset ja kadonnut järvi, AlUlan vanha kaupunki,
  jonka talot ovat itse kaupungin muuri.
- **Vuoret** — Asirin vihreä vuoristo ja porrasviljelmät, savitornitalot
  ja niiden sadevesirivat, al-qatt al-asiri -seinämaalaus (Unesco 2017).
- **Meri** — Farasanin lähes 200 saarta satelliitista, kohonnut
  korallikivi, papukaijakala ja hareed-juhla.

Päällekkäisyys naapureihin tarkistettiin: aavikko on jo ARE:lla,
QAT:lla ja KWT:lla, mangrove ja flamingot ARE:lla, dhow ja
kilpikonnat OMN:lla. Siksi Rub al-Khali jäi väliin, vaikka se oli
listallasi — neljäs aavikkosivu peräkkäin olisi ollut toistoa.
Sanothan, jos haluat sen silti.

**Kuvat.** Yhdeksän, jokainen ladattu ja katsottu 600 px:n levyisenä
ennen selitteen kirjoittamista. Katsominen hylkäsi kaksi ehdokasta,
joiden tiedostonimi valehteli: *"Rijal Alma village from the inside"*
oli sisätila portaikkoineen, ei kylänäkymä, ja *"Bahrain's Pearling
Pathway"* oli nykyinen katunäkymä kauppakylttien ja pysäköityjen
autojen kanssa. Kumpaakaan ei olisi huomannut tiedostonimestä.

**Yhtään tekijänimeä ei kirjoitettu käsin** — lähdetäyttäjä hakee ne
API:sta. Se paljasti samalla oman bugini: siistimissääntö "X by Y"
söi lisenssistä "CC BY 2.0" → "2.0". Näkyi vain siksi, että työkalu
tulostaa kirjoittamansa rivit.

## 3. PÄÄTÖSTÄ VAATIVA: Bahrain ei ole laudalla

Bahrainin sisältö on **valmis** — kaksi sivua (helmenkalastus,
muinaisuus), kuusi juttua, kuvat katsottu, lähteet API:sta,
esitarkistin puhdas. Sitä ei voi liittää:

- Bahrainilla **ei ole maamuotoa yhdelläkään laudalla**:
  `middleeast-countries.js` 12 maata, `maailmankartta.js` 84 maata,
  ei kummassakaan BHR. Laudalla ei ole myöskään yhtään Bahrainin
  kaupunkia.
- `avaaMaalehti('BHR')` palaa heti rivillä `if (!maa) return;`, joten
  sivut olisivat kuollutta dataa.
- **Repo vahtii tätä jo itse:** `tests/maa-otsikot.test.mjs` kaatui
  heti liittämisen jälkeen viestiin *"BHR: maalla on aihesivuja mutta
  ei nimeä millään laudalla"*. Hyvä testi.

Korjaus on BHR:n lautageometria `middleeast-countries.js`:ään, joka on
**Opus 2:n kaista ja pilottitiedosto**, joten en koskenut siihen.
Huomaa myös, että tiedoston oma kommentti kertoo Jordanian ja Israelin
jääneen pois juuri siksi, ettei niillä ole laudalla kaupunkia johon
korostus kiinnittyisi — Bahrain on sama tapaus, joten tämä on
esitystapapäätös eikä pelkkä geometrian lisäys.

Valmis sisältö odottaa tiedostossa **`docs/erad-bahrain-valmis.json`**
(mainissa, #754:n mukana), otsakkeessaan syy ja se mitä tarvitaan. Se
liitetään sellaisenaan heti kun päätät esitystavan. **Erä D on siis
puoliksi kesken, ja odotan tästä ohjeen ennen erää E.**

## 4. Muuta huomattua

- **Kuvaduplikaatteja on nyt 17** (luovutuspaperissa 13). Yksikään ei
  ole uusista kuvista. Valtaosa on `nahtavyysjutut.js`:n ja
  `kulttuuri-kategoriat.js`:n välillä — mm. Latin Bridge, Baščaršija,
  Gedimino pilis, Vilnan yliopisto, Kööpenhaminan Rundetårn.
  Sonnet 2:n kaistaa, en koskenut.
- **Kohderyhmän muutos 13+ (v512) tuli kesken erän.** Luin sen ja
  kävin Saudi-tekstit läpi sitä vasten: ne ovat toteavia ja
  numeropitoisia, eivät lapsille selittäviä, joten en muuttanut niitä.
  Jos haluat rekisteriä vielä ylemmäs, kerro — se on helppo passi.
- **Versiotörmäyksiä oli kolme** (v512, v513, v514 menivät muille
  kesken työn). Kaavasi toimii; tein siitä skriptin, joka ottaa
  generoidut tiedostot mainista ja pysähtyy, jos konflikti on muualla.
- **Selainmittaria en ajanut.** Sen sijaan jokainen kuva ladattiin
  oikeasti proxyn läpi ja katsottiin — se todistaa latautumisen
  suoremmin kuin "rikki 0". Sano jos haluat silti Playwright-ajon.

## 5. Mitä tarvitsen sinulta

1. **Bahrain:** esitystapa vai odotetaanko? (kohta 3)
2. **Rub al-Khali:** neljäs aavikkosivu Saudille vai ei? (kohta 2)
3. **FAL/GFDL-kuvat:** kenelle korvaavien kuvien haku menee? (kohta 1)

---

# Opus 1 → Fable: ME-erä C valmis, jään valmiuteen (10.8.2026)

**v501 (Oman + Qatar) ja v507 (Egypti) mainissa; Kuwait (v511) on
PR #745:ssä ja mergeän sen heti kun CI on vihreä** — se on erän
viimeinen toimenpide, ei kesken jäävä työ.
`# tests 578 / # pass 577 / # fail 0`. Erä B:n raportti jäi haaralleni
rebasessa, joten sen ydin on tässä mukana. Jatkokohta on kirjattu
**docs/opus1-tilanne.md**:hen niin että toisen tilin uusi Opus voi
jatkaa suoraan siitä. **En aloita uusia eriä — jään valmiuteen.**

## Erä B: Oman ja Qatar (v501)

**Oman** — *Vuoret*: Jebel Shamsin rotko, Jebel Akhdarin terassikylät ja
ruusuvesi, suitsukehartsi. *Meri*: Surin dhow-telakka, vihreän
merikilpikonnan poikaset Ras al Jinzissä, Musandamin vuonot.
**Qatar** — *Aavikko*: Khor Al Adaidin sisämeri, Zekreetin sienikalliot,
hiekan alle jäänyt Al Zubarah. *Rakennukset*: kansallismuseon
aavikkoruusu, Souq Waqif, Islamilaisen taiteen museo.

Kirjoitin ensin Qatar-aiheen Omanin sivulle ja siirsin sen. Kirjaan
tämän, koska houkutus lainata naapurimaan aihetta kasvaa mitä
pienemmästä maasta on kyse.

## Erä C: Egypti (v507) ja Kuwait (v511)

**Egypti** oli jo seitsemän aihesivun maa, joten katsoin ensin mitä
puuttuu: **Eläimet** (Suezinlahden lintupullonkaula, dugongi
meriheinäniityllä, egyptinkilpikonna) ja **Käsityöt** (khayamiyan
ompelijoiden katu, Tunisin savenvalajakylä, nubialaiskylien maalatut
seinät).

**Kuwaitilla** ei ollut yhtään aihesivua. Nyt: **Linnut** (2–3 miljoonaa
läpimuuttavaa lintua vuodessa, Kubbarin 380 metriä leveä tiirasaari,
Al-Jahran ruovikko) ja **Aavikko** (Mitribahin 53,9 °C, talvisateen
jälkeinen kukinta ja arfaj, beduiinien sadu-kudonta).

## Kuwaitin sotaherkkyys: mitä tein ja miksi

Tutkimusvaiheessa nousi kolme kytkentää: Bubiyanin saarelle tehtiin
aseellinen maihinnousu 1.5.2026, Kubbarilla on kuusi vuoden 1991
sotahautaa, ja arfaj on noussut kestävyyden vertauskuvaksi tämän vuoden
iskujen aikana. Linjasi on **ei sotasisältöä**, joten:

- **Pudotin Bubiyanin kokonaan pois.** Kolmas lintujuttu olisi ollut sen
  vuorovesiuomista — aihe on hieno, mutta saarella on käynnissä olevan
  sodan tapahtumia. Tilalle tuli Al-Jahran kosteikko.
- **Kubbar jäi**, koska juttu kertoo tiirakoloniasta ja saari on
  luontokohde. Vuosi 1991 ei esiinny tekstissä.
- Hylkäsin myös kuvan, jossa muuttolinnut lensivät Vapaudentornin yli:
  torni on 1991-monumentti, ja se oli kuvan hallitsevin kohde.

Yksikään juttu ei mainitse sotaa, eikä maalehden nostoissa ole
wiki-linkkejä, joten lapsi ei päädy linkkiä seuraamallakaan
sota-artikkeliin. **Jos haluat Kuwaitin pois kokonaan tai Kubbarinkin
vaihtoon, sano — se on yhden erän työ.**

## Yksi asia, joka vaatii sinun päätöksesi

**Kirjoitin kuuden kuvan tekijän nimen muistista ja sain kaikki kuusi
väärin.** Kuwaitin `lahde`-kentissä oli keksittyjä mutta uskottavan
näköisiä nimiä. Sama vika oli lipsahtanut Egyptiin kahdesti, ja yksi
lisenssi oli merkitty public domainiksi, vaikka tiedoston wikitekstissä
lukee CC BY 4.0 (API:n `extmetadata` väittää siitä eri asiaa kuin sivun
oma lisenssimalline). Korjasin omani ja tein työkalun, joka kirjoittaa
kentän suoraan API:sta.

Tekijänmerkintä on CC BY:n **lisenssiehto**, joten väärä nimi on
rikkomus siinä missä puuttuvakin. `tools/lisaa-tekijat.mjs` täydentää
vain PUUTTUVAN tekijän eikä katso niitä rivejä, joissa nimi jo on —
siis juuri niitä, joissa tämä vika piilee. Lisäsin repoon
**`tools/tarkista-tekijat.mjs`**, joka vertaa olemassa olevat nimet
Commonsiin. Ajoin sen `maa-kategoriat.js`:lle: omat rivini ovat
puhtaita, ja jäljelle jää parikymmentä riviä, jotka ovat tahallisia
(suomennetut laitosnimet, translitteroinnit).

**Päätettäväksesi: ajanko työkalun kaikkien pakettien yli?** En koskenut
muiden sessioiden kirjoittamiin lähdemerkintöihin ilman lupaa. Ajo on
nopea ja tulos on lyhyt lista silmäiltäväksi.

## Seuraavaksi jonossa (ei aloitettu)

**Erä D = Saudi-Arabia ilman Mekkaa ja Medinaa + Bahrain.** Rajaukset,
aihe-ehdokkaat ja koko työtapa ovat docs/opus1-tilanne.md:ssä.

---

# Sonnet 2 → Fable: erä 13 valmis — EUROOPPA TÄYSIN KATETTU, jään valmiuteen (10.8.2026)

Varareitti käytössä pysyvästi (ei create_trigger- eikä
send_later-työkalua).

**Erä 13 (Vilna/Oslo/Kööpenhamina, 18 kohdetta) valmis**: v508
mainissa, PR #742 squash-mergetty itse CI:n mentyä vihreäksi
(Monitor-työkalulla). Versiokollisio v507→v508 hoidettu itse
(toinen PR ehti mergetä v507:n ensin — sama kaava kuin erässä 10).
Amalienborg-disambiguointi tarkistettu (Tanskan kuninkaanlinna, ei
pelin virheellisesti linkittämä ruotsalainen panimo). Haara nollattu
tuoreeseen mainiin.

**TÄLLÄ EUROOPPA ON TÄYSIN VALMIS**: kaikki 37 `maakartat.js`:n
Euroopan kohdekarttakaupunkia ovat saaneet nähtävyysjutut (tarkistettu
ohjelmallisesti diffaamalla `KAUPUNKIKARTAT`-avaimet
`NAHTAVYYSJUTUT`-avaimiin — täsmällinen osuma, ei puuttuvia eikä
ylimääräisiä). Ainoa `maakartat.js`:n kaupunki ilman nähtävyysjuttua
on Dubai, joka on Lähi-idän kaupunki eikä kuulu Eurooppa-tehtävään.

Kirjoitin täsmällisen jatko-/luovutusdokumentin `docs/sonnet2-
tilanne.md`:ään toista tiliä varten (kaikki 13 erää versionumeroineen
ja PR-numeroineen, lukittu sisältömalli ja uusi monikuvalinja
kriteereineen, koko toimiva prosessiputki vaihe vaiheelta, yleiset
wiki-disambiguointikuviot, "ei sotasisältöä" -linja Venäjän/Ukrainan
kohteissa, viestintärajoitus (ei create_trigger/send_later),
kontinkierrätyksen selviytymisohje). Tarkoitus on, että uusi sessio
voi jatkaa suoraan siitä ilman tätä keskustelua.

**En aloita erää 14 tai Lähi-idän töitä** — jään valmiustilaan kuten
pyysit. Odotan uutta kuittausta.

**Erä 12 (Tromssa/Dubrovnik/Riika) valmis** (edellinen raportti):
v502 mainissa, PR #733. Ei sotasisältöä -linja sovellettu.

---

# Opus 1 → Fable: ME-erä A valmis (10.8.2026)

**v499 mainissa** (#729). `# tests 571 / # pass 570 / # fail 0`.

## Mitä tuli

**Emiraatit, kolmas sivu "Ranta ja rata"** — mangrovemetsä, joka kasvaa
suolavedessä ja hengittää juurillaan; flamingot Ras Al Khorin lahdella
keskellä kaupunkia; kamelikilpailut, joissa ratsastajana on
radio-ohjattu robotti. Minitehtävä robotista.

**Jordania, maan ensimmäiset sivut.**
- *Vedet*: Kuollutmeri kannattelee kelluvaa, ranta siirtyy kauemmas
  pinnan laskiessa noin metrin vuodessa, ja maan 27 kilometrin
  merenranta Akabassa on korallien peitossa.
- *Rauniot*: Jerashin soikea tori, Ammanin Herkuleen temppeli ja
  Qusayr Amran aavikkolinna tähtitaivaskupoleineen.

Petraan ja Wadi Rumiin en koskenut, myöskään kuvissa.

## Kolme havaintoa

**1. Esitarkistin päivitetty** (hyväksyntäsi mukaan): 2–4 aihesivua,
kolme juttua kullakin. Sisältötarkistukset löysivät tästä erästä yhden
aidon vian — kamelitehtävän vastaus vuoti jutun otsikkoon — ja otsikko
kirjoitettiin uusiksi.

**2. Jordanialla ei ole menovinkkisivua**, eikä sitä ole muillakaan
tulevilla ME-mailla (vain ARE:lla ja EGY:llä on). Maalehti toimii ilman,
mutta viimeinen sivu jää nyt aihesivuksi. Sano jos haluat menovinkit
mukaan samoihin eriin — silloin lisään ne kunkin maan kohdalla, mikä
kasvattaa erän kokoa noin kolmanneksella.

**3. Kuvien maakohtaisuus vaati tarkkuutta.** Kuolleenmeren ja knafehin
parhaat Commons-kuvat ovat Israelin puolelta, ja sääntömme on että kuva
on siitä maasta, jota sivu käsittelee. Vaihdoin molemmat: Kuollutmeri
esitetään nyt jordanialaiselta rannalta, ja ruoka-aihe jäi kokonaan pois
tästä erästä, koska jordanialaisia ruokakuvia ei löytynyt riittävästi.
Jordanialle voi siis myöhemmin tehdä kolmannen sivun (ruoka tai Danan
luonnonpuisto), jos etsin kuvat erikseen.

## Seuraavaksi

Jatkan jonoa ilman eri lupaa: **erä B = Oman + Qatar**. Raportoin
samalla tavalla.
