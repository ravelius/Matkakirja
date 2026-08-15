> **ARKISTOITU 15.8.2026** — kertaluontoinen tilannekuva tai toteutettu suunnitelma. Ei sisällä voimassa olevia ohjeita; ne ovat Raamattu 2.0:ssa (js/tyohuone-raamattu.js) ja sen dokumenttikartan tiedostoissa.

# Lehtitasapainon kartoitus (vaihe A)

Omistajan kaksi linjausta 9.8.2026:

1. *"Maalehti pitäisi aina olla pidempi kuin kaupunki. Muissakin
   kaupungeissa on turhan paljon artikkeleita jotka voisi siirtää
   maalehteen ennemmin."* Pahin esimerkki: Helsinki vs Suomi.
2. *"Kaupunkilehdestä voisi yrittää tehdä noin kolmisivuisen jotta sen
   jaksaa joka heitolla käydä läpi. Menovinkit voisi typistää muutamiin
   niin ei tarvitse omaa sivua niille kaupunkilehdessä. Maalehdessä saa
   olla edelleen pitkä versio."*

Tämä on kartoitus ennen siirtoja. Siirrot tehdään vasta Fablen
kuittauksen jälkeen, Helsinki/Suomi ensimmäisenä.

## Mistä lehti nyt koostuu

Mitattu selaimessa: kaupunkilehti on **viisi ruutua**, ei kolme.

| Ruutu | Sisältö | Mistä tulee |
|---|---|---|
| 1 | nimiö | lehtitaitto |
| 2 | kansi + kulttuurivisa | `kulttuuri-kategoriat.js`, sivu `kaupunki` |
| 3 | aihesivu 1 | `kulttuuri-kategoriat.js` |
| 4 | aihesivu 2 | `kulttuuri-kategoriat.js` |
| 5 | menovinkit | **maalehdestä**, liitetään ajonaikana (`ui.js`) |

Tavoite on kolme ruutua: nimiö + kansi + **yksi** aihesivu, ja
menovinkeistä 3–4 upotettuna, ei omaa ruutua.

Eli jokaisesta kaupungista lähtee **yksi aihesivu** ja **menovinkkiruutu**.

## Tasapaino: 15 rikettä 30:stä

Rike = kaupunkilehdessä on vähintään yhtä paljon artikkeleita kuin
maalehdessä.

| Maa | Maalehti (sivut/artikkelit) | Lehtikaupungit | Kaupungin artikkelit | Rike |
|---|---|---|---|---|
| Turkki | 0/0 | Istanbul | 7 | **kyllä** |
| Irlanti | 0/0 | Dublin | 7 | **kyllä** |
| Portugali | 0/0 | Lissabon | 7 | **kyllä** |
| Unkari | 0/0 | Budapest | 7 | **kyllä** |
| Puola | 0/0 | Krakova, Varsova | 7 + 7 | **kyllä** |
| **Suomi** | **0/0** | **Helsinki** | **7** | **kyllä** |
| Viro | 0/0 | Tallinna | 7 | **kyllä** |
| Ukraina | 0/0 | Kiova, Odessa | 7 + 7 | **kyllä** |
| Venäjä | 0/0 | Pietari, Moskova | 7 + 7 | **kyllä** |
| Bulgaria | 0/0 | Sofia | 7 | **kyllä** |
| Romania | 0/0 | Bukarest | 7 | **kyllä** |
| Bosnia | 0/0 | Sarajevo | 7 | **kyllä** |
| Alankomaat | 4/16 | Amsterdam | 8 | ei |
| Tšekki | 4/16 | Praha | 7 | ei |
| Itävalta | 4/16 | Wien | 7 | ei |
| Kreikka | 4/16 | Ateena | 7 | ei |
| Espanja | 5/20 | Madrid, Barcelona, Granada | 7 kukin | ei |
| Italia | 5/20 | Venetsia, Rooma | 7 kukin | ei |
| Ranska | 5/20 | Pariisi, Marseille | 7 kukin | ei |
| Ruotsi | 6/24 | Tukholma | 7 | ei |
| Saksa | 6/26 | Berliini | 7 | ei |
| Britannia | 8/54 | Lontoo, Edinburgh | 15, 7 | ei |

**Jokainen rike on sama vika:** maalla ei ole yhtään aihesivua. Kaupunki
ei ole liian pitkä — maa on tyhjä. Näissä kahdessatoista maassa
kaupunkilehdestä poistettava aihesivu on juuri se aineisto, josta
maalehti kannattaa aloittaa.

## Ehdotetut siirrot maittain

Sääntö: **jää** se aihesivu, jonka jutut ovat kiinni tämän kaupungin
kaduissa, rakennuksissa ja tavoissa. **Siirtyy** se, jonka jutut
kertovat koko maasta. Kansi ei muutu.

Sarake "maamaininnat" on koneellinen apu: montako sivun artikkelia
mainitsee maan nimen tekstissään.

### A. Maa on tyhjä — siirretty sivu perustaa maalehden (12 maata, 15 kaupunkia)

| Kaupunki | Jää kaupungille | Siirtyy maalle | Maamaininnat |
|---|---|---|---|
| **Helsinki** | historia (Suomenlinnan majakka, Helsinki näytteli Neuvostoliittoa) | **arki** → FIN: *Kolme miljoonaa saunaa* | 1/2 |
| Tallinna | historia (Oleviste, Epäluulon torni) | **arki** → EST: *Valtio mahtuu muovikorttiin*, kama | 1/2 |
| Istanbul | historia (mehter, Valensin vesijohto) | **ruoka** → TUR: tee, boza | 1/2 |
| Dublin | tiede (Hamilton, Schrödinger) | **musiikki** → IRL: uilleann-pilli, kolikon harppu | **2/2** |
| Lissabon | ruoka (pastel de nata, sardiinit) | **musiikki** → PRT: fado, Severa | **2/2** |
| Budapest | musiikki (tanssitalo, urut) | **ruoka** → HUN: gulassi, Dobos-kakku | **2/2** |
| Sarajevo | urheilu (1984, bobirata) | **arki** → BIH: kahvi aikayksikkönä, Sahat-kula | **2/2** |
| Sofia | arki (lämmin lähdevesi, banitsa) | **luonto** → BGR: kivijoki, Ruusulaakso | **2/2** |
| Bukarest | tiede (dioraama, Vlaicu) | **musiikki** → ROU: lăutar-suku, Hora staccato | **2/2** |
| Krakova | arki (obwarzanek, szopka) | **taide** → POL: Veit Stoss, Kärppä-muotokuva | 1/2 |
| Varsova | tiede (salainen yliopisto, esperanto) | **luonto** → POL: Veiksel, Kampinos | 0/2 |
| Kiova | musiikki (kobzari, Štšedryk) | **ruoka** → UKR: borssi, Kiovan kakku | 1/2 |
| Odessa | arki (Privoz, Humorina) | **musiikki** → UKR: Odessan viulukoulu | 0/2 |
| Pietari | arki (kuore, Punaiset purjeet) | **taide** → RUS: Verikirkko, Pähkinänsärkijä | 0/2 |
| Moskova | arki (metro, laskiainen) | **tiede** → RUS: Belka ja Strelka, Tetris | 0/2 |

Puola, Ukraina ja Venäjä saavat kaksi sivua kerralla (kaksi
lehtikaupunkia kumpikin), joten niiden maalehti alkaa heti kahdella
aihesivulla.

### B. Maalehti on jo olemassa — siirto vahvistaa sitä (10 maata)

| Kaupunki | Jää | Siirtyy | Minne maalehdessä |
|---|---|---|---|
| **Lontoo** | nykytaide (6 → karsitaan 3–4) | **luonto** (6 juttua) | GBR: uusi *Luonto* |
| Edinburgh | tiede (Dolly, kloroformi) | musiikki: säkkipilli | GBR/musiikki; Tattoo kannelle |
| Praha | musiikki (Vltava, Dvořák) | arki: nukketeatteri, chlebíček | CZE: uusi *Ruoka ja kieli* |
| Wien | musiikki (Straussin joki, Taikahuilu) | arki: kahvilaperinne | AUT/ruoka; Karl-Marx-Hof kannelle |
| Berliini | rakennukset (torni, maailmankello) | arki: currywurst, Spätkauf | DEU/ruoka |
| Amsterdam | taide (Yövartio, Maitotyttö) | arki: silli, katu-urut | NLD/ruoka, NLD: uusi *Musiikki* |
| Ateena | arki (souvlaki, evzonit) | musiikki: rebetiko, sirtaki | GRC: uusi *Musiikki* |
| Barcelona | talot (Casa Batlló, Palau) | ruoka: calçot, pa amb tomàquet | ESP/ruoka |
| Granada | musiikki (Falla, luolaflamenco) | ruoka: tapas, pionono | ESP/ruoka |
| Rooma | arki (nasoni, akveduktit) | ruoka: carbonara, supplì | ITA/ruoka |
| Madrid | rakennukset (Gran Vía, Alcázar) | urheilu → **karsitaan** | — |
| Venetsia | rakennukset (paalut, MOSE) | kasityo → **karsitaan** | — |
| Tukholma | rakennukset (Polhem, kuja) | elaimet: lohi, visentti | SWE/luonto |
| Marseille | ruoka (bouillabaisse, navette) | arki: äänestyslahjat, saippua | FRA: uusi *Käsityö* |
| Pariisi | musiikki (Piaf, Django) | arki: patonki | FRA/ruoka; bouquinistit kannelle |

**Karsitaan, ei siirretä (2):** Madridin *Urheilu* ja Venetsian
*Käsityö* ovat molemmat aidosti kaupunkikohtaisia eivätkä kuulu
maalehteen — mutta kolmen ruudun sääntö vaatii toisen sivun pois, ja
näissä kahdessa jäljelle jäävä sivu on vahvempi. Nämä ovat ainoat
kohdat, joissa sisältöä katoaa. Jos omistaja haluaa säilyttää ne,
vaihtoehto on nostaa toinen juttu kannelle.

## Menovinkit

Kaupunkilehden viides ruutu on maalehden menovinkkisivu sellaisenaan.
Se poistuu kaupunkilehdestä; täysi lista (6–20 kohdetta,
katsottavuussääntö) jää maalehteen, jonne pääsee lehden viimeisen sivun
*Lue [Maa]-liite ›* -napista (Fablen v416).

Kaupunkilehteen jää 3–4 parasta upotettuna jäljelle jäävälle
aihesivulle. Valinta: ne kohteet, jotka liittyvät juuri tähän
kaupunkiin (esim. Prahassa tähtikellon oma sivu, ei koko Tšekin
museohaku).

## Mitä siirto teknisesti vaatii

1. Artikkeli siirtyy `kulttuuri-kategoriat.js`:stä `maa-kategoriat.js`:ään
   sellaisenaan, mutta saa `aika`-kentän (maalehden nostoissa on se,
   kaupunkilehden nostoissa ei).
2. **Minitehtävä siirtyy artikkelin mukana.** Palkkioavain on
   `pakka:kaupunki:aihe`, ja maalehdessä `pakka:kaupunki:ISO:aihe`
   (v411). Avain muuttuu siis siirrossa itsestään — vanha suoritus ei
   siirry mukana, eli pelaaja voi ratkaista saman tehtävän uudestaan
   maalehdessä. Tämä on hyväksyttävää: tehtävä on eri paikassa ja
   sisältö on uutta sille, joka ei ole kaupungissa käynyt.
3. Kuvat siirtyvät mukana. Duplikaattitarkistus on ajettava siirron
   jälkeen: sama tiedosto ei saa jäädä molempiin.
4. `tests/lehdet.test.mjs` vaatii minitehtävän jokaiselta
   kaupunkilehden aihesivulta — sääntö pätee yhä, kun sivuja on yksi.

## Työjärjestys

1. **Helsinki/Suomi** (omistajan esimerkki). Suomen maalehti syntyy
   samalla.
2. Loput ryhmästä A, maa kerrallaan — jokainen synnyttää maalehden.
3. Ryhmä B, jossa maalehti on jo olemassa.
4. Lontoo viimeisenä: se on ainoa, jossa karsitaan kuudesta jutusta
   kolmeen, ja siihen kannattaa kysyä omistajan mielipide erikseen.
