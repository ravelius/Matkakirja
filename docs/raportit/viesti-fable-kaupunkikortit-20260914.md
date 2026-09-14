# Viesti Fablelle: Ranskan lisäkaupungeille kaupunkikortti

**Opus → Fable, 14.9.2026.** Haara
`claude/bold-ride-vow4ki-kaupunkikortit`, pohja
`claude/bold-ride-vow4ki-ranska-sisalto` (Ranskan sisältöerä #2447).

**Yhdellä rivillä:** Ranskan seitsemän lisäkaupunkia eivät ole enää
pelkkiä nimikylttejä — merkin napautus avaa kaupunkikortin lehden
kehyksessä, ja kortissa on kuvan paikkamerkki, paikka esittelylle ja
yksi kaupunkiin ankkuroitu maalehden nosto. **Esittelytekstejä EI ole
viety dataan**: seitsemän luonnosta ovat luvussa 3 sinun
hyväksyttävänäsi, ja datassa on `esittely: null`, jolloin kortti
jättää lohkon pois.

---

## 1. Omistajan päätös, josta tämä on tehty

Raamattu, KARTTAUUDISTUKSEN PAATOKSET 16, sanatarkasti:

> *"Yhdista nuo kaksi ens. Vaihtoehtoa ja pyyda putkelta kuhunkin
> kaupunkiin hero kuva. Esittelyn jalkeen voi siis tulla yksi nosto
> teksti. Jos useampi olisi tarjolla niin jatetaan seuraavat kartalle
> omiksi nostoikseen."*

Kortin rakenne on luettu tästä lauseesta järjestyksessä: **kuva →
esittely → yksi nosto**, ja *"jatetaan seuraavat kartalle omiksi
nostoikseen"* tarkoittaa, ettei yhtään nostoa siirretty pois kartalta
— kortti vain näyttää yhden niistä toistamiseen.

## 2. Mitä muuttui

| tiedosto | muutos |
| --- | --- |
| `js/packs/nakyvat-kaupungit-fra.js` | `vainNimi: true` poistui joka riviltä. Tilalle neljä kenttää: `kaupunkikortti: true`, `herokuva: null`, `esittely: null`, `korttiNosto` (viite maalehtinoston omaan olioon tai `null`). Tiedoston alkuun mittaustaulukko siitä, mille kaupungille nosto löytyi |
| `js/kaupunkinosto.js` | **uusi** `latoLisakaupunginKortti` + `avaaLisakaupunginKortti` (n. 150 riviä kommentteineen). Käyttää samaa `avaaKortti`-kehystä kuin tiivis kaupunkietusivu (PAATOKSET 10) |
| `js/fokuskohteet.js` | `avaaFokuskohde`: yksi haara `kohde.kaupunkikortti` → kaupunkikortti. Haara on tässä eikä merkkirivillä, jotta se pätee sekä pallon osumalistaan että tasokartan `lahinKohde`-polkuun |
| `css/kaupunkinosto.css` | **yksi uusi sääntö**: `.kaupunkipopup-heropaikka` (kuvan paikkamerkki) + noston otsikon kutistus kortissa. Perustelu luvussa 4 |
| `tools/savukkeet/savuke-kaupunkikortit.mjs` | **uusi savuke**, 35 vartiota |
| `tools/savukkeet/savuke-ranska-sisalto.mjs` | vartiot 8a ja 8b käännettiin: lisäkaupunki **on** nyt osumalistalla, ja vastakoe merkitsee rivin ajon ajaksi takaisin `vainNimi`ksi |
| `tools/savukkeet/README.md` | uusi rivi + ranska-sisalto-rivin 8a/8b päivitys |

**Ei koskettu:** maalehteen, kaupunkilehteen, Raamattuun, versionumeroon,
`js/pallolauta/`-tiedostoihin (`nostot.js`:n `avaa`-haara toimi
sellaisenaan, kun lippu poistui datasta), `dist/`iin eikä mediaan.

### 2.1 Kortin rakenne

```
[kehys: .kaupunkipopup .kaupunkipopup-lisakaupunki]   ← sama kuin tiivis etusivu
  otsikko  = kaupungin nimi          (kehyksen oma h3, sulkunappi vieressä)
  1 kuva   = herokuva  TAI  .kaupunkipopup-heropaikka (seepiaruutu + nimi)
  2 esittely = .arrival-intron kappaleet   — puuttuu kun `esittely` on null
  3 nosto  = h3.fokusnosto-kortti-otsikko + div.fokusnosto-teksti
             — puuttuu kun `korttiNosto` on null
  sulku    = ✕, Esc tai napautus kortin ulkopuolelle (kehyksen oma sopimus)
```

Otsikko on kehyksen omalla paikallaan kuvan yläpuolella eikä sen alla:
se on `avaaKortti`in kuuluva rivi, ja sen siirtäminen olisi ollut uusi
kehys eikä sama kehys.

### 2.2 Datakentät, ja miten herokuva vaihdetaan

```js
{
  id: 'nakyva-kaupunki-lyon',
  nimi: 'Lyon',
  tyyppi: 'kaupunki',
  kaupunkikortti: true,                      // napautus avaa kaupunkikortin
  herokuva: null,                            // ← kuvaputken URL tähän
  esittely: null,                            // ← hyväksytty esittely tähän
  korttiNosto: nosto('maalehti-cinematographe'),
  laudat: { maailmankartta: { x: 5994.3, y: 1569.8 } },
  lahde: '…',
}
```

**Kuvaputken vaihto on yksi rivi.** Kun putki toimittaa Lyonin heron,
`herokuva: null` → `herokuva: 'https://media.matkakirja.app/…'`, ja
kortti piirtää kuvan paikkamerkin sijaan. Paikkamerkki on herokuvien
3 : 2 -suhteessa, joten kortin korkeus ei hyppää vaihdossa.

**`korttiNosto` on VIITE, EI KOPIO.** `nosto(id)` hakee olion
`MAALEHTINOSTOT_FRA`:sta, joka puolestaan lukee otsikon ja tekstin
maalehdestä ajon aikana. Kortilla lukee siis sanasta sanaan sama kuin
noston omalla kortilla ja lehden sivulla — kirjoittavaa mallia ei ole
missään välissä. Savukkeen vartio 3b mittaa tämän `===`-vertailuna.

### 2.3 Millä kaupungilla on nosto — MITATTU

Jokaisen lisäkaupungin laudan piste mitattiin jokaista kahdeksaatoista
maalehtinoston ankkuria vastaan (lauta `maailmankartta`):

| kaupunki | lähin nosto | etäisyys (laudan yksikköä) | kortille? |
| --- | --- | ---: | --- |
| **Lyon** | `maalehti-cinematographe` (Lyon) | **0,3** | **kyllä** |
| Bordeaux | `maalehti-dune-du-pilat` (Dune du Pilat) | 23,1 | ei |
| Nantes | `maalehti-chandeleur` (Bretagne / Rennes) | 37,5 | ei |
| Toulouse | `maalehti-roquefort` (Roquefort-sur-Soulzon) | 53,5 | ei |
| Nizza | `maalehti-petanque` (La Ciotat) | 59,3 | ei |
| Lille | `maalehti-braille` (Pariisi) | 81,6 | ei |
| Strasbourg | `maalehti-cinematographe` (Lyon) | 153,3 | ei |

**Tehtävänannon oletus, että Bordeaux'lla olisi nosto, ei pidä.**
Bordeaux'n lähin on Dune du Pilat, joka on 60 km kaupungista ja jolla on
kartalla oma merkkinsä; sen siirtäminen Bordeaux'n korttiin olisi ollut
uusi keksitty ankkuri. **Nostolohko on siis vain Lyonilla**, ja
kuudella muulla kortti on kuva + esittely. Jos haluat lisää nostoja
kortteihin, se on sisältötyötä: joko uusi nosto kaupunkiin ankkuroituna
tai olemassa olevan ankkurin siirto, ja kumpikin on sinun päätöksesi.

---

## 3. SEITSEMÄN ESITTELYLUONNOSTA — SINUN HYVÄKSYTTÄVÄKSESI

**Nämä eivät ole pelissä.** Datassa on `esittely: null`, ja kortti
jättää esittelylohkon pois kokonaan (savukkeen vartio 4 mittaa sen).
Kun hyväksyt tai muokkaat tekstin, se menee yhteen datariviin per
kaupunki.

Säännöt, joita vasten nämä on kirjoitettu: jokainen fakta lähteellä,
1873/nyt-kontrasti, lyhyt ja konkreettinen, ei kryptisyyttä, ei
keksittyjä anekdootteja, ei eläviä yksityishenkilöitä, ei spoilereita
kartan visoihin, aistiankkuri noin joka toiseen, 180–260 merkkiä.

### 3.1 Luonnokset

| kaupunki | luonnos | merkkejä |
| --- | --- | ---: |
| **Lyon** | Vuonna 1873 Fourvièren kukkulalla seisoi rakennustelineitä: basilikan muuraus oli alkanut edellisvuonna ja jatkui 1884 asti. Alarinteillä kalisivat silkkikutomoiden kangaspuut. Nykyään vanha Lyon on Unescon maailmanperintöluettelossa. | 234 |
| **Bordeaux** | Garonnen yli pääsi 1873 vain yhtä tietä: kivisiltaa, jonka seitsemäntoista kaarta valmistuivat 1822. Se jäi kaupungin ainoaksi ajosillaksi vuoteen 1965. Nykyään sen kupeessa kahden sentin vesikalvo peilaa Bourse-aukion julkisivut. | 230 |
| **Lille** | Lille oli 1873 puuvillan kaupunki: kivihiili ja höyrykoneet pitivät kutomot käynnissä, ja Vaubanin linnoitus oli vartioinut niitä jo vuodesta 1670. Nykyään samasta kaupungista lähtee Eurostar, joka alkoi kulkea kanaalitunnelin auettua 1994. | 240 |
| **Strasbourg** | Vuonna 1873 Strasbourg ei ollut Ranskaa: kaupunki oli liitetty Saksaan 1871, ja tuomiokirkon katto oli palanut piirityksessä. Sen 142-metrinen torni oli yhä maailman korkein rakennus — vielä vuoden. Nykyään täällä istuu Euroopan parlamentti. | 241 |
| **Nizza** | Nizza oli ollut Ranskaa vasta kolmetoista vuotta, kun isoisä kulki ohi 1873. Rantabulevardin olivat kustantaneet englantilaiset talvivieraat 1820-luvulta alkaen, ja paikalliset sanoivat sitä Camin deis Anglésiksi. Nyt sitä riittää seitsemän kilometriä. | 252 |
| **Toulouse** | Toulousen tiilet ovat vaaleanpunaisia, ja siitä tuli nimi Ville rose. Vuonna 1873 kaupungin läpi kulki jo Canal du Midi, 1681 valmistunut vesitie Välimerelle. Nykyään täällä kootaan Airbusin koneet. | 198 |
| **Nantes** | Nantesissa syntyi 1828 Jules Verne, jonka Maailman ympäri 80 päivässä ilmestyi lehdessä 1872 — vuotta ennen isoisän matkaa. Loiren rannassa kolisivat telakat. Nykyään samalla saarella kävelee kaksitoistametrinen mekaaninen norsu. | 229 |

### 3.2 Faktat ja lähteet, rivi per väite

**Lyon**

| väite | lähde |
| --- | --- |
| Basilikan muuraus alkoi 1872 ja jatkui 1884 asti | en-Wikipedia *Basilica of Notre-Dame de Fourvière*: "built with private funds between 1872 and 1896", rakennustyö 1872–1884 <https://en.wikipedia.org/wiki/Basilica_of_Notre-Dame_de_Fourvi%C3%A8re> |
| Silkkikutomot ja kutojat (canut) 1800-luvun Lyonissa | en-Wikipedia *Lyon*, silkkityöläisten kapinat 1831 ja 1834 <https://en.wikipedia.org/wiki/Lyon> |
| Vanha Lyon Unescon maailmanperintöluettelossa | en-Wikipedia *Lyon*: "Old Lyon, the Fourvière hill, the Presqu'île … inscribed on the UNESCO World Heritage List" (vuosilukua ei väitetä) <https://en.wikipedia.org/wiki/Lyon> |

**Bordeaux**

| väite | lähde |
| --- | --- |
| Kivisillassa on seitsemäntoista kaarta, valmistui 1822 | fr-Wikipedia *Pont de pierre (Bordeaux)*: rakennettu 1810–1822, avattu liikenteelle 1.5.1822, 17 kaarta 16 pilarilla <https://fr.wikipedia.org/wiki/Pont_de_pierre_(Bordeaux)> |
| Ainoa ajosilta vuoteen 1965 | sama sivu: "seul pont … jusqu'à la construction du pont Saint-Jean en 1965" |
| Kahden sentin vesikalvo Bourse-aukion edessä | en-Wikipedia *Miroir d'eau*: 3 450 m², "granite slabs covered by 2 cm of water", rakennettu 2006, Place de la Bourse <https://en.wikipedia.org/wiki/Miroir_d%27eau> |

**Lille**

| väite | lähde |
| --- | --- |
| Puuvilla, kivihiili ja höyrykone 1800-luvun Lillessä | en-Wikipedia *Lille*: "known for its cotton", alue vaurastui "coal and the steam engine" <https://en.wikipedia.org/wiki/Lille> |
| Vaubanin linnoitus vuodesta 1670 | sama sivu: sitadelli rakennettiin 1667–1670 |
| Eurostar ja kanaalitunneli 1994 | sama sivu: kanaalitunneli avattiin 1994, "the arrival of the Eurostar train" samana vuonna |

**Strasbourg**

| väite | lähde |
| --- | --- |
| Kaupunki liitettiin Saksaan 1871 (oli siis 1873 saksalainen) | en-Wikipedia *Strasbourg*: "as part of the Imperial Territory of Alsace–Lorraine, became German again, until 1918" <https://en.wikipedia.org/wiki/Strasbourg> |
| Tuomiokirkon katto paloi piirityksessä | en-Wikipedia *Strasbourg Cathedral*: "The roof was set afire and the cross at the top of the spire was bent by a German artillery shell" (piiritys 1870) <https://en.wikipedia.org/wiki/Strasbourg_Cathedral> |
| 142 m, maailman korkein rakennus 1647–1874 | sama sivu: "142 metres", "from 1647 to 1874 (227 years)" |
| Euroopan parlamentti istuu Strasbourgissa | en-Wikipedia *Strasbourg*: Euroopan parlamentti, Euroopan neuvosto ym. |

**Nizza**

| väite | lähde |
| --- | --- |
| Nizza liitettiin Ranskaan 1860 (1873 siis kolmetoista vuotta) | en-Wikipedia *Promenade des Anglais*: "After Nice's annexation by France in 1860" <https://en.wikipedia.org/wiki/Promenade_des_Anglais> |
| Englantilaiset talvivieraat kustansivat rantabulevardin 1820-luvulta | sama sivu: rakentaminen alkoi 1820, "funded by the Reverend Lewis Way and members of Holy Trinity, the Anglican church in Nice" |
| Paikallinen nimi Camin deis Anglés | sama sivu |
| Pituus noin seitsemän kilometriä | sama sivu: "approximately 7 kilometres" |

**Toulouse**

| väite | lähde |
| --- | --- |
| Vaaleanpunaiset tiilet → nimi Ville rose | en-Wikipedia *Toulouse*: "pinkish terracotta bricks has earned Toulouse the nickname La Ville rose" <https://en.wikipedia.org/wiki/Toulouse> |
| Canal du Midi valmistui 1681 ja vie Välimerelle | sama sivu: Riquet aloitti 1666, valmis 1681, "links Toulouse to the Mediterranean Sea" |
| Airbusin koneita kootaan Toulousessa | sama sivu: "home to … Airbus", Euroopan ilmailu- ja avaruuskeskittymä |

**Nantes**

| väite | lähde |
| --- | --- |
| Jules Verne syntyi Nantesissa 1828 | en-Wikipedia *Jules Verne*: syntynyt 8.2.1828 Nantesissa <https://en.wikipedia.org/wiki/Jules_Verne> |
| *Maailman ympäri 80 päivässä* ilmestyi lehdessä 1872 | sama sivu: "first appeared in Le Temps in 1872" |
| Telakat Loiren rannassa | en-Wikipedia *Nantes*: 1900-luvun alussa "three shipyards which were among the largest in France" <https://en.wikipedia.org/wiki/Nantes> |
| Kaksitoistametrinen mekaaninen norsu samalla saarella | Les Machines de l'île, avattu 2007; Grand Éléphant 12 m korkea, 49 matkustajaa <https://www.lesmachines-nantes.fr/en/> ja <https://www.levoyageanantes.fr/en/activities/the-great-elephant/> |

### 3.3 Mitä jätin pois tarkoituksella

* **Lyonin elokuva.** Lyonin kortissa on jo nosto *Cinématographe*
  (Lumièren veljekset). Esittely ei siksi mainitse elokuvaa lainkaan —
  muuten kortti kertoisi saman asian kahdesti peräkkäin.
* **Bordeaux'n 1870–71.** Ranskan hallitus siirtyi väliaikaisesti
  Bordeaux'hun 1870, mutta se oli ohi ennen 1873:a eikä se näy
  kaupungissa; kivisilta näkyy.
* **Vuosiluvut, joita lähde ei sano.** Lyonin Unesco-listaus on
  luonnoksessa ilman vuotta, koska lukemani sivu ei anna sitä.
* **Spoilerit.** Yksikään luonnos ei sisällä vastausta Ranskan kartan
  kuuteen minikysymykseen (Versaillesin peilit, Combalou, Lumièren
  kymmenen elokuvaa, Dune du Pilat, pétanque, bouquinistit).
* **Elävät yksityishenkilöt.** Ei yhtään.

---

## 4. Yksi uusi tyylisääntö, ja miksi

Tehtävänanto sanoi "ei uusia tyylejä (lehden omat luokat)". Kortti
noudattaa sitä kaikessa muussa: kehys, otsikko, sulkunappi, kuvapaikka
(`.lehti-paakuva`), esittely (`.arrival-intro`) ja noston otsikko ja
leipä (`.fokusnosto-kortti-otsikko`, `.fokusnosto-teksti`) ovat kaikki
olemassa olevia luokkia.

**Poikkeus on `.kaupunkipopup-heropaikka`.** Kuvatonta kuvapaikkaa ei
ole ennen ollut olemassa missään, koska tähän asti kortin kuvapaikka on
joko saanut kuvan tai piiloutunut. Paikkamerkki on kartan seepiaa
samoilla arvoilla kuin kortin muut säännöt (`rgba(122, 85, 20, …)`) ja
herokuvien 3 : 2 -suhteessa. **Kun kuvaputki toimittaa kuvat, tämä
sääntö voi poistua kokonaan.**

Toinen lisätty rivi ei ole uusi ulkoasu vaan kutistus: noston otsikko
on kortissa väliotsikko eikä kortin otsikko, joten se saa saman
pienennyksen kuin kohdekartan otsikko jo saa.

---

## 5. Savuke ja portit

### 5.1 Uusi savuke

`tools/savukkeet/savuke-kaupunkikortit.mjs` — **35/35 vartiota läpi**
(390 × 844 ja 1400 × 900, aito hiirinapautus merkin ruutupisteeseen).

| vartio | mitä mittaa | tulos |
| --- | --- | --- |
| 1 | Lyonin merkin napautus avaa `.kaupunkipopup-lisakaupunki` | OK ×2 |
| 1b | otsikko = "Lyon" / "Lille", kortti karttaruudun sisällä | OK ×4 |
| 2 | paikkamerkki näkyy, kortissa **0 kuvaelementtiä** (ei ulkoista hakua) | OK ×4 |
| 3 | nostolohkon otsikko = datan otsikko | OK ×2 |
| 3b | nostolohkon teksti = datan teksti `===`-vertailussa | OK ×2 |
| 4 | esittelylohko puuttuu, koska `esittely` on `null` | OK ×4 |
| 5 | **vastapari**: Lille (ei ankkuroitua nostoa) saa kortin ilman nostolohkoa | OK ×2 |
| 6 | **vastakoe**: `korttiNosto` nollattuna Lyoninkin nostolohko katoaa | OK ×2 |
| 7 | yksikään lisäkaupunki ei ole laudan CITIES-matkakohde | OK (Node) |
| 7b | yksikään ei ole nopanheiton siirtovaihtoehto | OK ×2 |
| 8 | ei sivuvirheitä | OK ×2 |

**Vastakoe on pakollinen, ja se on tässä kahtena.** Vartio 5 on
luonnollinen vastapari (toinen kaupunki, eri data, eri tulos) ja
vartio 6 on aito vastakoe: sama kaupunki, sama kortti, pelkkä
datakenttä nollattuna ajon ajaksi — nostolohko katoaa. Ilman sitä
vartio 3 olisi voinut mitata kortin rakennetta eikä dataa.

### 5.2 Portit

| portti | tulos |
| --- | --- |
| `npm test` | **3353 pass / 2 fail** (lähtötaso samalla haaralla: 3354 / 1) |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `node tools/tarkista-niputus.mjs` | 389 moduulia, 4219 julistusta, ei törmäyksiä |
| `node tools/tarkista-savukkeet.mjs` | 1656 ui-viittausta, ei katkenneita |

**Kaksi punaista ovat `tests/pollo.test.mjs`:n kuormavartiot** —
`indeksi rakentuu ja on kokoluokaltaan järkevä` ja `haku on nopea myös
koko aineistolla`. Kumpikaan ei koske tätä erää: **ajettuna yksin
`tests/pollo.test.mjs` on 124/124 vihreä**, ja lähtötasolla samalla
haaralla toinen niistä oli jo punainen. Ne mittaavat kelloa
rinnakkaisajon kuormassa.

### 5.3 Päivitetty savuke

`savuke-ranska-sisalto.mjs` vartiot 8a ja 8b käännettiin ympäri:
aiemmin ne vaativat, ettei lisäkaupunki ole osumalistalla
(`vainNimi`), nyt ne vaativat että **on** (kaupunkikortti), ja
vastakoe merkitsee rivin ajon ajaksi takaisin `vainNimi`ksi ja mittaa
sen katoavan. Ilman tätä savuke olisi valehdellut heti ensimmäisellä
ajolla.

### 5.4 Kuvat

`docs/raportit/kuvat/kaupunkikortti-nakyva-kaupunki-{lyon,lille}-{390,1400}.jpg`
— Lyonin kortti nostolohkoineen ja Lillen kortti ilman, molemmilta
ruuduilta.

### 5.5 HUOMIO KUVISTA — kortti on nyt ohut

Katso `kaupunkikortti-nakyva-kaupunki-lille-390.jpg`: **Lillen kortissa
ei ole tällä hetkellä muuta kuin kuvan paikkamerkki.** Se on tämän erän
rehellinen lopputulos — herokuvaa ei ole vielä toimitettu ja esittely
odottaa hyväksyntääsi — mutta se ei ole julkaisukelpoinen näkymä.

**Suositukseni: älä julkaise tätä pelaajille ennen kuin joko esittelyt
tai herokuvat ovat paikallaan.** Kuudella seitsemästä kaupungista kortti
on siihen asti tyhjä kehys. Lyonin kortti (sama kuva 390 px:llä) on jo
nyt kokonainen, koska sillä on nosto.

Vaihtoehto, jos julkaisu on kiire: rajaa `kaupunkikortti: true` niihin
kaupunkeihin, joilla on jotain näytettävää (nyt vain Lyon), ja palauta
muille `vainNimi: true` siksi aikaa. Se on seitsemän datariviä eikä
koodimuutos. En tehnyt sitä oma-aloitteisesti, koska omistaja tilasi
kortin jokaiseen kaupunkiin.

---

## 6. Mitä sinulta tarvitaan

1. **Hyväksy tai muokkaa seitsemän esittelyä** (luku 3). Kun teksti on
   hyväksytty, se menee yhteen `esittely`-riviin per kaupunki.
2. **Päätä Lyonin ulkopuolisista nostoista.** Kuusi kaupunkia jää
   nostolohkotta, koska niihin ei ole ankkuroitua nostoa. Vaihtoehdot:
   (a) näin jää, kortti on kuva + esittely; (b) kirjoitetaan kaupunkiin
   ankkuroidut nostot; (c) siirretään jonkin nykyisen noston ankkuri —
   mutta se veisi noston kartalta väärään paikkaan, joten en suosittele.
3. **Tilaa herokuvat kuvaputkelta** seitsemälle kaupungille. Vaihto on
   datassa yksi rivi per kaupunki.
