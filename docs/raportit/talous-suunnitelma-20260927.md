# Pelin talous: suunnitelma (Pelikoodari 27.9.2026)

Omistajan linjaus 27.9.2026 klo 10.0x (sitova, Fablen välittämänä): rahaa kuluu matkustamisen lisäksi
**syömiseen ja asumiseen päivittäin** sekä **huvituksiin**. Linssit ja pelit voi ostaa **Kaupasta**, ja
edelleen myös löytää ilmaiseksi. **Jos rahat loppuvat, peli loppuu kahdessa vuorokaudessa.** Lisäys:
huvipuistoihin on sisäänpääsymaksu (luonnos 30 £), ja sisällä voi ansaita huvipuistopeleillä (voitto
enintään 100 £).

Tämä on suunnitelma. Koodia ei ole vielä tehty. Luvut ovat ehdotuksia, ja omistaja päättää ne (kohta 10).

---

## 1. Nykytila (web `js/game.js`, natiivi `Peli/Kaupat.cs` on sen suora portti)

| | Arvo | Missä |
|---|---|---|
| Aloitusraha | **300 £** kaikissa tiloissa | `START_MONEY` game.js:18 |
| Bussi | 50 £ | `BUS_FARE` rules.js:26 |
| Laiva | 100 £ | `SEA_FARE` game.js:19 |
| Lento (mannerlento) | 300 £ | `FLIGHT_PRICE` rules.js:6 |
| Vihje / 50–50 / kaveriapu / pulla | 40 / 80 / 25 / 25 £ | game.js:27–46 |
| Rosvon kaksintaistelu hävitty | **kaikki rahat** (`money = 0`) | game.js:2956, 2977 |
| Pieni / iso aarre | 100–250 / 500–800 £ | tokens.js:23–24 |
| Mantereen aarre | 1 000 £ | tokens.js:21 |
| Unohdettu aarre (vaellus) | 2 000 £ | `STAR_PRIZE` game.js:55 |
| Kaksintaistelun voitto | 200 £ | `DUEL_PRIZE` |
| Vaikea kysymys / tutki | 100 / 50 £ | `HARD_BONUS`, `EXPLORE_REWARD` |
| Tehtävät ja kortit | 10–50 £ (minitehtävä 10, eläintäky 20, kulttuuri 25, noston visa 25, fokustehtävä 50, täky 50) | useita |
| Sähketehtävä | 200 £, −25 % per ohilyönti | fokusvirta.js:5394 |
| Tapahtumakortti `raha` | ± pieni summa, ei alle nollan | game.js:2516 |
| **Pankin apu** | 100 £, jos mihinkään ei ole varaa | `STRANDED_AID` game.js:1650 |

- **Aika:** vuoro on 6 h, eli vuorokaudessa on 4 vuoroa (`TURN_HOURS`, `dayCount`). 80 päivää on vain ennätysmerkki, ei katto.
- **Päiväkuluja ei ole.** Rahan loppuminen ei lopeta peliä, vaan pankki antaa 100 £.
- **Kauppaa ei ole.** Linssit ansaitaan kynnyksillä (`js/linssit/omistus.js`), eikä niitä voi ostaa.
- **Huvipuistoja eikä minipelejä ole.** Tivoli ja Prater ovat vain kohtaamisteksteinä.
- **Kultaista omenaa, aarreruksia ja Pulun ±10:tä ei ole koodissa.** Ne ovat uusia mekaniikkoja.
- Hintatason dataa ei ole: matkaoppaan "Hinnat"-tähtiä on vain 7 kaupungilla.

## 2. Päiväkustannus: ruoka ja majoitus

**Veloitus vuorokauden vaihtuessa**, eli ensimmäisellä vuorolla, jolla `dayCount` kasvaa. Summa riippuu
kaupungista, jossa pelaaja on.

| | Perus | Huom. |
|---|---|---|
| Ruoka | 8 £ | kultainen omena korvaa yhden päivän ruoan |
| Majoitus | 12 £ | yöjuna ja yölaiva sisältävät majoituksen (jos yö kuluu matkalla) |
| **Yhteensä** | **20 £ × hintataso** | |

**Hintataso** maittain, kolme porrasta (dataa tarvitaan Sisältökirjurilta, `js/packs/hintatasot.js`,
~200 maata; oletus 1,0):

| Porras | Kerroin | Päivä | Esimerkkejä |
|---|---|---|---|
| Edullinen | 0,6 | 12 £ | Intia, Vietnam, Marokko, Bolivia |
| Keski | 1,0 | 20 £ | Espanja, Kreikka, Puola, Brasilia |
| Kallis | 1,6 | 32 £ | Sveitsi, Norja, Japani, Islanti |

Näin valinta tuntuu: halpa maa venyttää kassaa ja kallis vaatii ansioita. Ehdotan pyöristämistä
kokonaisiksi puniksi.

**Pelaajalle näkyy:** lokirivi "Yö Pariisissa: ruoka 8 £, majoitus 12 £ (−20 £)" ja kassa-arvio
("riittää noin 6 päiväksi") kassarivillä.

## 3. Kauppa: linssit ja pelit

Uusi pinta **Kauppa**, joka avautuu kaupunkikortista tai valikosta. Siellä on luettelo ja ostonappi.
Omistus on sama kuin ilmaiseksi löydetyllä (`js/linssit/omistus.js myonna`), joten ostettu ja löydetty
ovat samanarvoisia. Löytäminen säilyy.

| Tuote | Hinta (ehdotus) | Peruste |
|---|---|---|
| Pieni linssi (yksi aikajana, lyhyt esitys) | 60 £ | noin 3 päivän kulut |
| Iso linssi (Ihmisen matka, laaja) | 150 £ | noin yksi pieni aarre |
| Peli (minipeli, huvipuistopeli omaksi) | 40–80 £ | alle pienen aarteen |

Kauppa ei myy aarteita, vihjeitä eikä kulkuneuvoja (ne ovat jo omissa hinnoissaan).

## 4. Huvipuistot (omistajan lisäys)

- **Kohteet:** huvipuistot, joilla on erikoismalli tai nosto (Tivoli, Prater, Disneyland Paris, Linnanmäki,
  Efteling, Europa-Park, Coney Island…). Lista on Sisältökirjurin/Linssisepän datasta, ja lippu `huvipuisto: true`
  tulee nostoon.
- **Sisäänpääsy 30 £** (omistajan luonnos). Maksu kerran per vierailu, ja vierailu kestää yhden vuoron.
- **Pelit:** narunveto ja pallonheitto (ja myöhemmin muita) bottia tai kaveria vastaan.
  - Panos 10 £ per peli, voitto 30 £ (helppo) … 100 £ (vaikea tai täysosuma).
  - Enintään 3 peliä per vierailu (ei loputonta rahasammoa), ja botin taso on sama kuin kaksintaistelun.
  - Moninpelissä kaveri on toinen pelaaja, jolloin voitto siirtyy pelaajalta toiselle (nollasumma).
- **Odotusarvo** on hieman positiivinen taitavalle (noin +20 £ per vierailu), negatiivinen huolimattomalle.
  Huvipuisto on siis huvitus, joka voi maksaa itsensä takaisin, mutta ei rahasampo.

## 5. Tulolähteet (uudet ja muutokset)

| Lähde | Ehdotus | Huom. |
|---|---|---|
| Aarteet | ennallaan (100–2 000 £) | päätulo |
| Kysymykset ja tehtävät | ennallaan (10–200 £) | tasainen virta päiväkuluihin |
| Kaksintaistelu bottia/kaveria vastaan | voitto 200 £ ennallaan; **häviö 50 %** eikä kaikki | kohta 10: omistaja |
| Huvipuistopelit | 30–100 £ | kohta 4 |
| **Aarreruksi** | +100 £ | uusi; omistajan termi, määrittely puuttuu (kohta 10) |
| **Pulu** | ±10 £ (oikein +10, väärin −10?) | uusi; kohta 10 |
| **Kultainen omena** | korvaa päivän ruoan (−8 £ säästö) | uusi esine; löytyy nostoista |
| Pankin apu 100 £ | **pois** (korvautuu 2 vrk:n varoituksella) | ristiriidassa "rahat loppu → peli loppuu" -säännön kanssa |

## 5b. Pelistreak (Fablen lisäys 27.9.2026 klo 11.2x)

Palkinto siitä, että pelaaja **pelaa oikean elämän peräkkäisinä päivinä** (laitteen paikallinen päivämäärä).
Pelipäivä lasketaan, kun pelaaja tekee pelissä vähintään yhden teon (liike, tehtävä, visa) sinä päivänä.
Pelkkä avaaminen ei riitä.

| Streak | Palkinto (ehdotus) |
|---|---|
| päivät 1–2 | 0 |
| päivät 3–6 | 20 £ / päivä |
| päivä 7 | 50 £ + viikkobonus 100 £ |
| päivät 8+ | 30 £ / päivä, ja joka 7. päivä (14, 21, …) +100 £ |
| väliin jäänyt päivä | laskuri nollautuu (kerran viikossa yksi "armopäivä"? → omistaja) |

- **Maksu** päivän ensimmäisellä teolla. Lokiin tulee rivi "Kolmas päivä peräkkäin matkalla: +20 £", ja Pulu
  kuittaa.
- **Laskuri on tallennuksessa** (pelaajakohtainen: `streak: { paiva: 'YYYY-MM-DD', pituus }`). Uusi peli
  aloittaa laskurin alusta. iCloud-synkka kuljettaa laskurin laitteelta toiselle.
- **Vaikutus talouteen:** viikon streak tuo 20 × 4 + 50 + 100 = 230 £, eli noin 11 päiväkulua (20 £). Se ei
  yksin rahoita matkaa, mutta tekee säännöllisestä pelaamisesta turvallisempaa.
- **Web ja natiivi:** logiikka `js/game.js` (`kirjaaPelipaiva(nyt)`, päivämäärä annetaan ulkoa, jotta testit
  ovat deterministisiä) ja `Peli/Matka.cs`. UI näyttää vain lokirivin ja toastin (ei kalenteria vaiheessa 1).

## 6. Tasapainolaskelma: tyypillinen 30 päivän Euroopan-matka

**Menot**

| | £ |
|---|---|
| 30 vrk × keskimäärin 20 £ | 600 |
| 10 bussia, 3 laivaa, 1 lento | 500 + 300 + 300 = 1 100 |
| 2 linssiä, 1 peli | 60 + 150 + 60 = 270 |
| 2 huvipuistoa (pääsy) | 60 |
| Vihjeet, pullat | noin 100 |
| **Yhteensä** | **noin 2 130** |

**Tulot**

| | £ |
|---|---|
| Aloitus | 300 |
| 6 pientä aarretta (keskim. 175) | 1 050 |
| 1 iso aarre | 650 |
| 20 kysymystä/tehtävää (keskim. 30) | 600 |
| Huvipuistopelien netto | noin +40 |
| **Yhteensä ilman mantereen aarretta** | **noin 2 640** |

**Ero noin +500 £**, ja mantereen aarre (1 000 £) sekä unohdettu aarre (2 000 £) tulevat päälle. Pitkällä
aikavälillä kassa kestää, mutta **alku on tiukka**: 300 £ riittää noin 5 päivään ja kolmeen bussiin. Siksi
pelaajan on tehtävä ensimmäiset tehtävät ja löydettävä ensimmäinen pieni aarre viikon sisällä. Tätä
jännitettä omistaja haki.

**Riskikohdat:** rosvon kaksintaistelu, joka nyt vie kaiken (kohta 5), sekä lento heti alussa (300 £ = koko
aloituskassa). Ehdotan, ettei mannerlentoon pääse ennen kuin kassassa on lipun hinta + 3 päivän kulut
(varoitus, ei esto).

## 7. Rahat loppu: 2 vrk:n varoitus ja lopun kulku

1. **Päivän veloitus ei mene läpi** (kassa < päiväkulu): kassa jää nollaan, ja alkaa **varoitusaika 2 vrk**
   (8 vuoroa). Tallennukseen tulee kenttä `rahatLoppuivat: { paiva, vuoro }`.
2. **Varoitus näkyy heti:** kassarivi punaisena ja lokiin "Rahat ovat lopussa. Kaksi päivää aikaa hankkia
   rahaa – muuten matka päättyy". Livia tai Pulu sanoo saman omalla äänellään (sisältö: Sisältökirjuri).
   Kartalla korostuvat lähimmät ilmaiset tulonlähteet (tehtävät ja nostojen visat; huvipuisto ei, koska
   pääsymaksuun ei ole varaa).
3. **Varoitusaikana** peli jatkuu normaalisti. Matkustaa voi vain sen verran kuin rahaa on, joten jalan
   naapurikaupunkiin pääsee ilmaiseksi, jos liikkumissääntö sen sallii. Tämä on avoin kysymys (kohta 10).
4. **Kun kassa nousee** yli yhden päiväkulun, varoitus poistuu ("Kassa kunnossa") ja rästi (menneiden päivien
   ruoka ja majoitus) veloitetaan heti.
5. **Kahden vuorokauden jälkeen** peli loppuu: loppukortti "Matka päättyi <kaupunki>ssa, päivä N". Isoisän
   päiväkirja sulkeutuu, ja näkyviin tulevat tilastot (käydyt maat, löydetyt aarteet, linssit) ja napit "Uusi
   matka" / "Jatka viimeisimmästä tallennuksesta" (kohta 10).
6. **Moninpelissä** vain rahaton pelaaja putoaa, ja muut jatkavat. Viimeinen jäljellä oleva voittaa, jos
   muut putoavat.

## 8. Vaikutukset

**Web (Pelikoodari)**
- `js/game.js`:
  - päivän vaihdon koukku `beginTurn`: `veloitaPaivakulut`
  - hintataso, varoitustila, pelin loppu
  - `STRANDED_AID` pois
  - kaksintaistelun häviö 50 %
  - huvipuiston pääsy ja pelien panos/voitto
  - Kauppa-toiminto `actionOsta`
  - tallennuksen versio +1 ja siirto (vanha tallennus alkaa ilman rästiä)
- UI:
  - kassarivi, jossa päiväkulu ja "riittää N päivää"
  - varoitusnauha, loppukortti
  - Kauppa-pinta
  - huvipuistokortti ja kaksi minipeliä (narunveto, pallonheitto)
- Botti (`js/ai.js`) oppii ostamaan ja välttämään rahattomuutta.
- Testit: `rules.test.mjs` (veloitus, varoitus, loppu, rästi), savukkeet (2 vrk loppuun pelattuna,
  huvipuisto).

**Natiivi**
- `Peli/Kaupat.cs` + `KauppaVakiot` portataan samoin luvuin, ja kultaiset jäljet (kauppajälki) päivitetään
  vartijalla (Pelikoodari).
- UI-pinnat (Kauppa, kassa, varoitus, loppukortti, huvipuistopelit) ovat Natiivi-UI:n työtä web-kuvaparien
  mukaan.

**Data**
- Hintatasot maittain ja huvipuistojen lista + `huvipuisto`-lippu (Sisältökirjuri).
- Linssien ja pelien kauppahinnat yhteen tauluun (`js/packs/kauppa.js`).

**Arvioitu työ:**

| Osa | Kesto |
|---|---|
| Web-logiikka + testit | 1–2 päivää |
| Minipelit (2 kpl) | 1–2 päivää |
| Natiiviportti | 1 päivä |
| Natiivi-UI | erikseen |

## 9. Ehdotettu järjestys

1. Päiväkulut, hintataso (oletus 1,0 kaikille ennen dataa), varoitus ja loppu. Pankin apu pois. Tämä on
   perusmekaniikka.
2. Kauppa (linssit ja pelit).
3. Huvipuistot ja kaksi peliä.
4. Aarreruksi, Pulu ±10 ja kultainen omena, kun omistaja on määritellyt ne.

## 10. Avoimet kysymykset omistajalle

1. **Päiväkulu 20 £ × hintataso (12 / 20 / 32 £)**: sopiiko taso? (30 päivän Euroopan-matka: noin 600 £.)
2. **Aloitusraha** ennallaan 300 £ vai 400 £, jotta alku ei kaadu ensimmäiseen lentoon?
3. **Rosvon kaksintaistelu:** häviö vie 50 % (ehdotus) vai kaikki kuten nyt? Kaikki + 2 vrk:n sääntö voi
   lopettaa pelin yhdestä häviöstä.
4. **Pankin apu 100 £ pois**: vahvistus (muuten rahat eivät koskaan lopu).
5. **Loppu:** alkaako loppukortin jälkeen aina uusi matka, vai voiko jatkaa viimeisestä tallennuksesta (ennen
   rahojen loppua)?
6. **Aarreruksi (+100 £) ja Pulu (±10 £):** mikä laukaisee ne? (Ei vastinetta nykykoodissa.)
7. **Kultainen omena:** mistä se löytyy ja montako niitä on?
8. **Kaupan hinnat:** pieni linssi 60 £, iso 150 £, peli 40–80 £, sopiiko?
9. **Huvipuisto:** pääsy 30 £, panos 10 £, voitto 30–100 £, enintään 3 peliä per vierailu, sopiiko? Mitkä
   puistot ensimmäiseen erään?
10. **Rahaton liikkuminen varoitusaikana:** pääseekö jalan tai liftaamalla naapurikaupunkiin ilmaiseksi?
11. **Pelistreak (5b):** sopivatko luvut 20 / 50 + 100 / 30 £, ja saako viikossa yhden armopäivän?
