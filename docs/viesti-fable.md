# Opus 17 → Fable: neljä nähtävyysjuttua (v695)

## Tilanne

| Kaupunki | Kohde (kartan piste) | Tila |
| --- | --- | --- |
| pariisi | Luxembourgin puisto (5/8) | **valmis** |
| pariisi | Panthéon (7/8) | **valmis** |
| helsinki | Linnanmäki (2/9) | **valmis** |
| helsinki | Kallion kirkko (5/9) | **valmis** |

Haara `claude/opus17-nahtavyysjutut`, versio **v695**, muutosloki­rivi
"Panthéon, Luxembourg, Kallio ja Linnanmäki" (42 merkkiä).

Pariisilla ja Helsingillä on nyt **oma juttu jokaisella kartan
kohteella** (8/8 ja 9/9) — yhtään wiki-ponnahdusta ei enää jää.

## Rajaus pidettiin

Muutetut tiedostot: `js/packs/nahtavyysjutut.js` + versiotiedostot
(`js/main.js`, `js/muutokset.js`, `sw.js`) + `dist/`-build +
tämä raportti. **`maakartat.js`:ään ei koskettu** (Opus 15 työstää sitä
rinnakkain), kaanoniin ei koskettu, API-avaimia ei ole repossa eikä
lokissa.

`node tools/vertaa-sisaltodiff.mjs origin/main HEAD
js/packs/nahtavyysjutut.js NAHTAVYYSJUTUT` → **muuttuneita kenttiä 0**.
Muutos on puhtaasti lisäävä: yhtäkään vanhaa kenttää ei ole muokattu,
joten pistokokeessa ei ole vanha/uusi-pareja luettavana.

Avaimet on todennettu ajonaikaisesti maakartat.js:ää vasten: kaikki
neljä täsmäävät kohdelistan nimiin merkilleen, ja juttujen järjestys
seuraa kartan pistenumerointia kuten tiedostossa ennenkin.

## Muoto

Jokaisessa: `aika`, 3 kappaletta, `lahde: 'Wikipedia'` (ei linkkiä).
Tekstipituudet 1 205–1 427 merkkiä, samaa luokkaa kuin Pariisin vanhat
jutut. **Lainaus vain yhdessä** (Panthéon) — muihin ei löytynyt aidosti
lähteistettyä sitaattia, joten kenttä jätettiin pois Reuter-linjan
mukaisesti.

Kuvia 1 per juttu, paitsi kaksi siellä missä aihe kantaa: Panthéonilla
rakennus + Foucault'n heiluri (oma kappaleensa tekstissä) ja
Luxembourgissa nykypäivä + Edelfeltin 1887 näkymä. Peli näyttää parin
karusellina, joten sivu ei veny.

## Kuvat: lisenssi tarkistettu tiedostosivulta ja KATSOTTU silmin

Jokainen ladattiin 480 px:n thumbina ja katsottiin. Alla omin sanoin
mitä kuvassa näkyy — ei pikselileveyksiä.

1. **`Panthéon, Paris 15 August 2011.jpg`** — Michal Osmenda, CC BY-SA 2.0,
   4288×2717.
   *Katsottu:* rakennus vinosti kadun toiselta puolen. Kupoli lepää
   pylväskehän päällä, huipulla lyhty ja risti. Oikealla korinttilainen
   pylväikkö ja päätykolmio; vasemmalle jatkuva pitkä sivuseinä on
   **täysin ikkunaton** — juuri se, mistä teksti kertoo. Alhaalla katu,
   pysäköityjä autoja, valkoinen pakettiauto ja kävelijöitä. Sininen
   taivas ja kumpupilviä. Ei väripalkkeja, vesileimoja eikä kollaasia.

2. **`Foucault pendulum at Panthéon de Paris, August 2023.JPG`** —
   Benoît Prieur, CC0, 4032×3024.
   *Katsottu:* ylhäältä kuvattu marmorilattian ruusuke. Heilurin
   **kullattu pallo** riippuu vasemmassa yläkulmassa, sen alla pyöreä
   metallikehikko. Lattian reunaan on merkitty numerot (10, 9, 8, 7
   näkyvissä). Yläreunassa kävijöiden jalkoja. Valoisa ja terävä.
   *(Hylättiin tilalta `Foucault pendulum at Panthéon de Paris
   (26126608674).jpg`: hämärä, ja väkijoukko peitti kehän.)*

3. **`Sunday in the Luxembourg Gardens, Paris May 2014.jpg`** —
   missbossy, CC BY 2.0, 5204×3473.
   *Katsottu:* aurinkoinen kesäpäivä. Taustalla Luxembourgin palatsi,
   oikealla kaidepylväikkö ja kivimaljakot, keskellä nurmirinne, jolla
   istuu ihmisiä. Vasemmalla väkeä puiston omilla metallituoleilla,
   ruukkupuita, kävelijöitä. Vihreä ja eloisa.
   *(Tekijämerkintä on Commonsin `Artist`-kentän mukaan käyttäjänimi
   `missbossy` — en arvannut sen taakse oikeaa nimeä, ks. tutki-aiheet
   vika 1.)*

4. **`Albert Edelfelt - The Luxembourg Gardens, Paris.jpg`** —
   Albert Edelfelt, PD, 8724×6528.
   *Katsottu:* maalaus 1887. Naisia tummissa puvuissa puiston
   punotuilla tuoleilla, keskellä punatukkainen tyttö valkoisessa
   mekossa **iso puuvanne** kädessään. Edessä kaksi pikkulasta
   kyykkimässä hiekalla, taustalla valkolakkisia lastenhoitajia,
   lastenvaunut, lehdettömiä puita ja vaaleat kaupungintalot.
   *(Valittu PD-tiedosto eikä Kansallisgallerian CC0-rinnakkaiskopio,
   koska siinä `Artist` on maalari eikä skannaaja. Sama kuva, sama
   koko.)*

5. **`Kallio Church Helsinki.jpg`** — Acediscovery, CC BY 4.0, 3000×2361.
   *Katsottu:* kirkko alaviistosta talvella. Massiivinen harmaa
   graniittitorni syvänsinistä taivasta vasten, tornin lakiosa ja
   alempi kupoli **patinoitunutta vihreää kuparia**, huipulla risti.
   Etualalla lumisia kuusia, vasemmalla vaalea kerrostalo. Kirkas valo.
   *(Hylättiin `Kallion kirkko 3.jpg`: etualaa hallitsi kirjava
   taideteos ja kirkko jäi pieneksi taustalle.)*

6. **`Linnanmäki Water Tower 2.jpg`** — Tatu Kosonen, CC BY-SA 4.0,
   3628×2644.
   *Katsottu:* huvipuiston **uudempi vesitorni**: valtava pyöreä
   tummanpunainen tiilirumpu, kyljessä laitteen nimikyltti. Edessä
   lehdettömiä koivuja, kirjavia kojuja ja iso joukko kävijöitä
   kevätvaatteissa. Vastaa suoraan tekstin ensimmäistä kappaletta.

Yksikään kuudesta ei ole ennestään käytössä näissä kaupungeissa
(tarkistettu koko `js/`-puusta). **Vuoristoradan oma kuva jätettiin
tarkoituksella pois:** `Linnanmäki Vuoristorata.jpg` on jo Helsingin
kannessa (`kulttuuri-kategoriat.js`, nosto "Vuoristoradan takana
seisoo jarrumestari"), joten juttu käyttää vesitornikuvaa ja painottaa
tekstissä eri asioita kuin lehden nosto (väliaikaisuus, Lebechin
piirustukset, olympialaiset, puuosien uusiminen) — ei toistoa.

## Mistä faktat tarkistettiin

Lähteenä en- ja fi-Wikipedia, ristiin tarkistettuna; ristiriitatapauksissa
haettiin kolmas artikkeli. Tekstit ovat oma tiivistys, eivät käännöstä.

- **Panthéon:** en `Panthéon`, fi `Panthéon`, fr `Panthéon (Paris)`.
  *Ristiriita:* fi antaa valmistumisvuodeksi 1789, en ja fr **1790** →
  käytettiin 1790. Zolan panteonisointi: fi sanoo 1902 (kuolinvuosi),
  en **1908** → jätettiin vuosiluku pois. Napoleonin ajan hautausten
  määrä 41/42 vaihtelee lähteittäin → jätettiin pois. Ikkunatieto
  "38 neljästäkymmenestäkahdesta" on fr-artikkelista (*"il obture
  trente-huit des quarante-deux fenêtres"*). Päätykolmion teksti ja sen
  vaiheet (1791 → poisto → 1830) en-artikkelista.
- **Luxembourgin puisto:** en `Jardin du Luxembourg`, fi, fr.
  *Ristiriita:* pinta-ala 23 ha (en) vs. 25,72/21,75 ha (fi) → luku
  jätettiin pois, hehtaarihistoria (8 → 30 → 40 → −7) on en-artikkelin
  aikajanasta. Medici-lähteen rakennusvuosi vaihtelee en-artikkelin
  sisällä (1620/1630) → vuosiluku jätettiin pois, kerrotaan vain
  siirto 1860-luvulla.
- **Kallion kirkko:** fi `Kallion kirkko`, en `Kallio Church`.
  *Ristiriita:* istumapaikat 900 (fi) vs. 1 100 (en) → jätettiin pois.
  Kellosävelmästä en sanoo, että se soitetaan neljällä kellolla, fi ei
  erittele → muotoiltu erittelemättä. "Työväen kaupunginosa" on
  lähteistetty fi-artikkelista `Kallio (Helsinki)`: *"Kallio on aiemmin
  tunnettu työväestön asuinalueena."*
- **Linnanmäki:** fi ja en `Linnanmäki`, en `Vuoristorata`.
  Vuoristoradan yksityiskohdat (talvi 1950, Lebechin piirustukset,
  avaus 13.7.1951, arvioitu 15 vuoden käyttöikä ja luvan jatkaminen,
  olympialaiset 1952, puuosat vaihdettu ≥5 kertaa vuoteen 2015,
  alkuperäisiä vain vaunujen tammirungot) ovat **en `Vuoristorata`**
  -artikkelista, joka on tarkempi kuin puiston oma artikkeli.
  Lahjoitusluvut (4,5 M€ 2023, yhteensä yli 130 M€) en-artikkelista.
  *Ristiriita:* säätiön perustamisvuosi 1956 (fi) vs. 1957 (en) →
  vuosiluku jätettiin pois. Karuselli 1896 / Linnanmäellä 1954 (en).

Vedenneitohalli ja puiston kaksi kuolemaan johtanutta onnettomuutta
jätettiin tarkoituksella pois: 13+ -linjan mukaan mikään ei ole liian
rankkaa, mutta kumpikaan ei mahdu kolmeen kappaleeseen ilman että
puiston oma tarina kärsii. **Kirjaan ne tähän, jos haluat ne mukaan.**

## Portit

| Portti | Tulos |
| --- | --- |
| `tools/kuvateksti-audit.mjs` | nahtavyysjutut **0/619 yli rajan**; uudet selitteet 137–158 mrk (raja 260) |
| `git fetch origin main` → `tools/uusi-versio.mjs` | v695, rivi 42 mrk |
| `node --test tests/*.test.mjs` | **# pass 710, # fail 0**, skipped 1 |
| `tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `tools/build-standalone.mjs` | dist 10 503 kt, ajettu tuoreesta mainista |
| Playwright-savuke | 4/4 juttua aukeaa oikeasta pisteestä, kuvat 900 px, ei sivuvirheitä |

Haara rebasettiin tuoreeseen mainiin (`dba4087`) **ennen** versionostoa,
jotta dist rakentui ajantasaisesta puusta.

### Savukkeen tulos

Ajettiin oikealla selaimella: kartta auki → piste napautettu → mitattu
mitä dialogiin tuli. Kaikki neljä: oma juttu auki (ei "Lue lisää"
-wikilinkkiä), otsikko oikein, 3 kappaletta, kuva latautui 900 px:iin.
Panthéonilla lainaus näkyy, muilla ei. Karusellilaskuri 1/2 ja 2/2
kahden kuvan jutuissa, 1/1 muissa. Kaappaukset katsottiin silmin:
taitto on ehjä, kuvasuhteet oikein, kuvateksti ja tekijämerkintä
kuvan alla, teksti ei purista.

**Kaksi konttihavaintoa savukkeesta** (eivät koske peliä, mutta
säästävät seuraavalta sessiolta tunnin):

1. Uudet kuvat palauttavat R2-peilistä 404:n, kunnes muutos on mainissa
   ja `peilaa.yml` on ajanut. Savukkeessa peili kytkettiin pois
   `sessionStorage`-katkaisijalla, jolloin kuvat tulevat Commonsista.
   **Peilaus tapahtuu mergen jälkeen itsestään — ei toimenpiteitä.**
2. Kaappauksissa kuvat jäivät ensin tyhjiksi, koska `sw.js` nappaa
   kuvapyynnöt ennen Playwrightin `route()`-välitystä. Ratkaisu:
   `newContext({ serviceWorkers: 'block' })`. Lisäksi Commonsin
   `Special:FilePath` antaa herkästi 429:n — `w/thumb.php` ei.

## Avoimet asiat

Ei esteitä. Kaksi asiaa tiedoksi:

1. **Pariisin ja Helsingin vanhat jutut ovat lyhyempiä ja
   yleisluontoisempia** kuin Berliinin ja Lontoon (esim. Riemukaaren
   kuvateksti on pelkkä "Riemukaari Pariisissa"). En koskenut niihin —
   rajaus oli neljä uutta juttua. Jos haluat, ne voi nostaa samalle
   tasolle omana eränään.
2. **Linnanmäen aihe menee osin päällekkäin Helsingin kannen noston
   kanssa** (ks. yllä). Ratkaisin sen kuvavalinnalla ja eri
   painotuksella, mutta jos pidät toistoa liiallisena, kannen nosto
   voisi vaihtua johonkin muuhun Helsinki-aiheeseen.

Kaikki on pushattu ja PR auki. Jään valmiuteen.
