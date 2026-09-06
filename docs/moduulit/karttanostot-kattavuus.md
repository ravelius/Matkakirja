# Karttanostojen kattavuus maittain

Päivitetty: 6.9.2026 (Fable, runko; K2-erän inventaario ja erät 1–2 täyttivät
taulukon). Taulukko-osio on aina `node tools/laske-karttanostot.mjs --md`
-tulosteesta, ei käsin korjattu.
Omistaja 2.9.2026: *"pitäisi jatkaa kaikki Euroopan maat loppuun
näiden karttanostojen osalta. ja muistathan että kohdekaupunkien
nostot eivät tule pääkartalle?"* Tavoite per maa: 8 kohdetta,
3 maastokohdetta, 1 eläintäky, 2 skandaalia. Kohdekaupunkien kohdalla
olevat nostot menevät kohdekartalle, eivät pääkartalle (Raamattu).

## Miten taulukko syntyy

Luvut lasketaan koneellisesti eikä käsin:

```
node tools/laske-karttanostot.mjs        # luettava taulukko
node tools/laske-karttanostot.mjs --md   # tämän sivun taulukko
```

Työkalu lukee samat taulut kuin peli ja pyytää karttarivit pelin
omalta passilta (tools/tarkista-nostopaikat.mjs `paakartanNostot`),
joten kaksi työkalua ei voi antaa samasta maasta eri vastausta. Kun
maa täydennetään, taulukko ajetaan uusiksi eikä lukuja korjata käsin.

## Mitä sarakkeet ovat

| sarake | mistä |
|---|---|
| kohteet | maan kohdemerkit, joiden tyyppi ei ole maastoa |
| maastokohteet | saman listan maastotyypit: vuori, joki, meri, järvi, saari |
| eläintäky | `js/packs/elaintakyt.js`, 0 tai 1 |
| skandaalit | `js/packs/skandaalit.js` |
| hetket | `js/packs/historian-hetket.js`, maan `iso`-kentällä |
| kulttuurinostot | maan kaupunkien syvennykset ja täkynostot, joilla on **oma** karttapaikka (`js/syvennys.js`, `js/fokusnosto.js`) |
| pääkartalla | merkkejä maailmankartalla kaupunkikaton jälkeen |
| kohdekartalla | merkkejä kaupunkilehden kohdekartalla |

Jako on **tyypin** eikä tiedoston mukainen. Pelaaja näkee kartalla
tyypin, ei tiedostoa: Kreikan Ólympos on maastokohde, vaikka se asuu
kuratoidussa `fokuskohteet-grc.js`:ssä, ja Islannin Þjórsá on
maastokohde `maastokohteet-isl.js`:ssä. Peli katsoo listat joka
tapauksessa yhdessä (`js/fokuskohteet.js` KOHDE_MAAT).

## Kattavuus Euroopassa 6.9.2026 (erien 2–4 jälkeen)

| maa | kohteet | maastokohteet | eläintäky | skandaalit | hetket | kulttuurinostot | pääkartalla | kohdekartalla | tila |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Islanti (ISL) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Sveitsi (CHE) | 8 | 5 | 1 | 3 | 1 | 0 | 17 | 0 | täysi |
| Tšekki (CZE) | 8 | 3 | 1 | 3 | 0 | 4 | 14 | 4 | täysi |
| Viro (EST) | 8 | 3 | 1 | 3 | 0 | 4 | 13 | 5 | täysi |
| Latvia (LVA) | 8 | 3 | 1 | 2 | 0 | 5 | 16 | 2 | täysi |
| Tanska (DNK) | 8 | 3 | 1 | 3 | 1 | 4 | 15 | 4 | täysi |
| Ruotsi (SWE) | 8 | 4 | 1 | 3 | 0 | 4 | 14 | 5 | täysi |
| Itävalta (AUT) | 8 | 4 | 1 | 3 | 2 | 5 | 17 | 3 | täysi |
| Bosnia ja Hertsegovina (BIH) | 9 | 5 | 1 | 2 | 0 | 4 | 18 | 2 | täysi |
| Irlanti (IRL) | 8 | 3 | 1 | 3 | 0 | 6 | 17 | 3 | täysi |
| Liettua (LTU) | 8 | 3 | 1 | 3 | 0 | 6 | 17 | 3 | täysi |
| Alankomaat (NLD) | 8 | 3 | 1 | 3 | 0 | 7 | 18 | 3 | täysi |
| Suomi (FIN) | 8 | 4 | 1 | 3 | 1 | 7 | 14 | 8 | täysi |
| Romania (ROU) | 12 | 4 | 1 | 2 | 0 | 4 | 19 | 3 | täysi |
| Unkari (HUN) | 11 | 6 | 1 | 3 | 0 | 3 | 20 | 3 | täysi |
| Norja (NOR) | 8 | 4 | 1 | 3 | 2 | 8 | 20 | 3 | täysi |
| Portugali (PRT) | 8 | 4 | 1 | 3 | 2 | 7 | 19 | 4 | täysi |
| Bulgaria (BGR) | 12 | 6 | 1 | 3 | 0 | 5 | 18 | 7 | täysi |
| Kroatia (HRV) | 8 | 11 | 1 | 3 | 0 | 3 | 23 | 2 | täysi |
| Puola (POL) | 8 | 5 | 1 | 3 | 0 | 9 | 20 | 5 | täysi |
| Ukraina (UKR) | 8 | 5 | 1 | 3 | 0 | 9 | 21 | 4 | täysi |
| Ranska (FRA) | 8 | 6 | 1 | 3 | 6 | 9 | 15 | 11 | täysi |
| Iso-Britannia (GBR) | 8 | 5 | 1 | 3 | 9 | 7 | 20 | 7 | täysi |
| Venäjä (RUS) | 8 | 8 | 1 | 3 | 2 | 9 | 22 | 6 | täysi |
| Saksa (DEU) | 8 | 13 | 1 | 3 | 4 | 6 | 28 | 5 | täysi |
| Italia (ITA) | 10 | 9 | 1 | 3 | 3 | 10 | 22 | 12 | täysi |
| Espanja (ESP) | 8 | 5 | 1 | 3 | 4 | 15 | 25 | 10 | täysi |
| Turkki (TUR) | 22 | 6 | 1 | 3 | 2 | 3 | 29 | 6 | täysi |
| Kreikka (GRC) | 20 | 15 | 1 | 3 | 1 | 4 | 33 | 9 | täysi |

Maita 29, tavoitteessa 29, vajaita 0. Euroopan kohdetavoite on täynnä.

## Erä 1: viisi heikointa maata, ennen ja jälkeen

Erä valittiin taulukon heikoimmasta päästä. Karttamerkkien yhteismäärä
(pääkartta + kohdekartta) oli pienin näillä viidellä, ja jokaisella
niistä kuratoituja kohteita oli **nolla** — maasto, eläintäky ja
skandaalit olivat jo tavoitteessa, joten koko vaje oli kohteissa.

| maa | merkkejä ennen | merkkejä jälkeen | kohteet ennen → jälkeen |
|---|---:|---:|---|
| Islanti (ISL) | 5 | 13 | 0 → 8 |
| Sveitsi (CHE) | 8 | 16 | 0 → 8 |
| Tšekki (CZE) | 10 | 18 | 0 → 8 |
| Viro (EST) | 10 | 18 | 0 → 8 |
| Latvia (LVA) | 10 | 18 | 0 → 8 |

Yhteensä 40 uutta karttanostoa. Yksikään ei ole kohdekaupungin
kohdalla: lähin uusi merkki on Islannin Þingvellir 26,7 lautayksikön
päässä Islanti-laatasta, ja muissa maissa lähin on 29,1–29,6
yksikön päässä (raja `KAUPUNGIN_KOHDALLA_SADE` on 7). Kaikki 40 ovat
siis pääkartan merkkejä.

**Missä ne asuvat.** Kohteet kirjoitettiin maan omaan
`js/packs/maastokohteet-<iso>.js`-tiedostoon eikä uuteen
`fokuskohteet-<iso>.js`-pakkiin. Syy on kirjattu jokaisen tiedoston
alkuun: kohdepakki vaatisi rivin `js/fokuskohteet.js`:n
KOHDE_MAAT-tauluun (rinnakkaisen erän hallussa) sekä FOKUS_LISANIMET-
lohkon (`js/packs/fokus-grc.js`), jonka lähtöaineisto on ämpärissä
eikä repossa. Maastokohteiden hakemisto (`js/packs/maastokohteet.js`)
liittää listan peliin sellaisenaan, joten kohteet ovat kartalla heti.
Kun KOHDE_MAAT vapautuu, lohkot siirtyvät omiin pakkeihinsa
sellaisinaan — ja silloin on ajettava myös
`tools/tee-fokus-lisanimet.mjs`, jotta lehteen poltetut kaupunginnimet
eivät jää kaksinkerroin.

**Kuvaton erä.** Kortti kantaa tekstin ja lähteen, ei kuvaa — sama
linja kuin maastokohteilla muutenkin. Tarkistamaton Commons-tiedosto
olisi huonompi kuin kuvaton kortti.

## Erien järjestys

Erä valitaan aina taulukon heikoimmasta päästä: ensin ne maat, joiden
karttamerkkien yhteismäärä (pääkartta + kohdekartta) on pienin, ja
niiden sisällä ne lajit, joissa vaje on suurin.

- **K2, erä 1 (tehty)** — ISL, CHE, CZE, EST, LVA: 8 kohdetta kuhunkin,
  yhteensä 40 uutta karttanostoa.
- **Erä 2 (tehty 6.9.2026)** — DNK, SWE, AUT, IRL, LTU: 8 kohdetta
  kuhunkin, yhteensä 40 uutta karttanostoa. Omistaja 6.9.2026:
  *"Jatka kartta nostojen tekoa koko maailmaan."* Kaikilla viidellä oli
  nolla kohdetta ja pienin merkkimäärä jäljellä olevista, joten työ oli
  puhdasta kohdetyötä erän 1 mallilla. Yksikään uusi merkki ei ole
  pelikaupungin kohdalla: lähin on Tarán kukkula 15,1 lautayksikön
  päässä Dublinista (raja `KAUPUNGIN_KOHDALLA_SADE` on 7), joten kaikki
  40 ovat pääkartan merkkejä. Kuvaton erä, kuten erä 1. Ainoa hylätty
  ehdokas oli Drottningholm: kuusi yksikköä Tukholmasta eli kaupungin
  kohdalla.
- **Erä 3 (ehdotus)** — NLD 13, FIN 14, PRT 15, NOR 16, POL 17.
- **Erä 4 (ehdotus)** — UKR 17, RUS 20, ESP 26 sekä vajaat FRA (−6) ja
  GBR (−5), jotka ovat lähimpänä maalia.

Maastovajetta ei jäänyt: tyyppipohjaisella laskennalla jokaisella
maalla on jo vähintään kolme maastokohdetta, ja skandaalitavoite (2)
täyttyy kaikkialla. Koko jäljellä oleva vaje on siis kohteissa.

## Säännöt, jotka pätevät joka erässä

1. **Kohdekaupungin kohdalla oleva nosto ei ole pääkartalla.** Mitta on
   `KAUPUNGIN_KOHDALLA_SADE` (7 lautayksikköä, `js/fokuskohteet.js`).
   Uutta kohdetta ei siis kirjoiteta pelikaupungin viereen, ellei sille
   samalla tehdä pistettä kohdekartalle (`js/packs/maakartat.js`
   kohteet + `js/packs/nahtavyysjutut.js` `nosto`-kenttä).
2. **Jokainen nosto on jollakin kartalla.** `tools/tarkista-nostopaikat.mjs`
   ja `tests/nostot-kartalla.test.mjs` ovat portti.
3. **Sama nimi kartalla vain kerran** (N3). Maastokohteen nimi tulee
   `js/packs/maailmankartta-nimet.js`:stä, jos sama nimi on lähellä.
   Uusi kohde ei myöskään toista maan oman listan nimeä
   (`tools/savukkeet/savuke-maastokohteet.mjs`, vartio 6).
4. **Kuva vain Commonsin PD/CC-tiedostosta**, lisenssi ja tekijä
   tarkistettuina; kuvateksti kertoo kohteesta eikä kuvasta, yksi virke.
   Kuvaton kohde on parempi kuin tarkistamaton kuva.
5. **Lähde on en-Wikipedia + artikkelin osa + tarkistuspäivä**, ja
   jokainen väite on lähteen katteessa (faktakuri).

## Kattavuus koko maailmassa 6.9.2026

Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
Työkalu laskee siitä lähtien KAIKKI laudan maat, ei enää Euroopan 29:ää:
joukko on maailmankartan oma maalista (`map.cityCountry` -taulun uniikit
ISO-tunnukset, **112 maata**) eli täsmälleen ne maat, joissa pelaaja voi
olla. Nimet tulevat pelin omasta nimitaulusta (`map.countryShapes`), ja
kohdelista suoraan pelin `KOHDE_MAAT`-taulusta — työkaluun ei siis
tarvitse lisätä riviä, kun uusi `fokuskohteet-<iso>.js` syntyy.
Tavoite ja sarakkeet ovat samat kuin yllä.

Rivit on ryhmitelty maanosittain ja maanosan sisällä **heikoimmasta
vahvimpaan** (pääkartan ja kohdekartan merkkien summa) — siinä
järjestyksessä, jossa erät valitaan. Maanosa tulee laudan omasta
`cityManner`-taulusta; Euroopan laudan 29 maata pysyvät Euroopassa,
joten Turkki ja Venäjä ovat tässäkin siellä, missä niiden erät on
suunniteltu.

Edellä oleva 2.9.2026 taulukko on jätetty koskematta tarkoituksella:
rinnakkaiset erät päivittävät sitä, ja Euroopan luvut näkyvät tässä
osiossa tuoreina.

**Tilanne yhdellä silmäyksellä (erien M1–M6, M8, M9 ja M11 jälkeen, 6.9.2026 keskipäivä).** 112 maasta **67 on tavoitteessa** ja 45 vajaita. Tarkoitukselliset vajeet: Fidži, Salomonsaaret, Hongkong, Singapore, Qatar, Kuwait ja Kypros (lehden ikkuna tai kaupunkisäde). Erä M10 (Aasia 3) on työn alla; jäljellä Afrikan ja Aasian loput maat.

### Eurooppa (29 maata)

| maa | kohteet | maastokohteet | eläintäky | skandaalit | hetket | kulttuurinostot | pääkartalla | kohdekartalla | tila |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Islanti (ISL) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Sveitsi (CHE) | 8 | 5 | 1 | 3 | 1 | 0 | 17 | 0 | täysi |
| Tšekki (CZE) | 8 | 3 | 1 | 3 | 0 | 4 | 14 | 4 | täysi |
| Viro (EST) | 8 | 3 | 1 | 3 | 0 | 4 | 13 | 5 | täysi |
| Latvia (LVA) | 8 | 3 | 1 | 2 | 0 | 5 | 16 | 2 | täysi |
| Tanska (DNK) | 8 | 3 | 1 | 3 | 1 | 4 | 15 | 4 | täysi |
| Ruotsi (SWE) | 8 | 4 | 1 | 3 | 0 | 4 | 14 | 5 | täysi |
| Itävalta (AUT) | 8 | 4 | 1 | 3 | 2 | 5 | 17 | 3 | täysi |
| Bosnia ja Hertsegovina (BIH) | 9 | 5 | 1 | 2 | 0 | 4 | 18 | 2 | täysi |
| Irlanti (IRL) | 8 | 3 | 1 | 3 | 0 | 6 | 17 | 3 | täysi |
| Liettua (LTU) | 8 | 3 | 1 | 3 | 0 | 6 | 17 | 3 | täysi |
| Alankomaat (NLD) | 8 | 3 | 1 | 3 | 0 | 7 | 18 | 3 | täysi |
| Suomi (FIN) | 8 | 4 | 1 | 3 | 1 | 7 | 14 | 8 | täysi |
| Romania (ROU) | 12 | 4 | 1 | 2 | 0 | 4 | 19 | 3 | täysi |
| Unkari (HUN) | 11 | 6 | 1 | 3 | 0 | 3 | 20 | 3 | täysi |
| Norja (NOR) | 8 | 4 | 1 | 3 | 2 | 8 | 20 | 3 | täysi |
| Portugali (PRT) | 8 | 4 | 1 | 3 | 2 | 7 | 19 | 4 | täysi |
| Bulgaria (BGR) | 12 | 6 | 1 | 3 | 0 | 5 | 18 | 7 | täysi |
| Kroatia (HRV) | 8 | 11 | 1 | 3 | 0 | 3 | 23 | 2 | täysi |
| Puola (POL) | 8 | 5 | 1 | 3 | 0 | 9 | 20 | 5 | täysi |
| Ukraina (UKR) | 8 | 5 | 1 | 3 | 0 | 9 | 21 | 4 | täysi |
| Ranska (FRA) | 8 | 6 | 1 | 3 | 6 | 9 | 15 | 11 | täysi |
| Iso-Britannia (GBR) | 8 | 5 | 1 | 3 | 9 | 7 | 20 | 7 | täysi |
| Venäjä (RUS) | 8 | 8 | 1 | 3 | 2 | 9 | 22 | 6 | täysi |
| Saksa (DEU) | 8 | 13 | 1 | 3 | 4 | 6 | 28 | 5 | täysi |
| Italia (ITA) | 10 | 9 | 1 | 3 | 3 | 10 | 22 | 12 | täysi |
| Espanja (ESP) | 8 | 5 | 1 | 3 | 4 | 15 | 25 | 10 | täysi |
| Turkki (TUR) | 22 | 6 | 1 | 3 | 2 | 3 | 29 | 6 | täysi |
| Kreikka (GRC) | 20 | 15 | 1 | 3 | 1 | 4 | 33 | 9 | täysi |

### Lähi-itä (12 maata)

| maa | kohteet | maastokohteet | eläintäky | skandaalit | hetket | kulttuurinostot | pääkartalla | kohdekartalla | tila |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Jemen (YEM) | 0 | 3 | 0 | 0 | 0 | 0 | 3 | 0 | kohteita −8, eläintäky puuttuu, skandaaleja −2 |
| Syyria (SYR) | 1 | 3 | 0 | 0 | 0 | 0 | 4 | 0 | kohteita −7, eläintäky puuttuu, skandaaleja −2 |
| Qatar (QAT) | 5 | 3 | 0 | 2 | 0 | 0 | 10 | 0 | kohteita −3, eläintäky puuttuu |
| Kuwait (KWT) | 5 | 4 | 1 | 2 | 0 | 0 | 11 | 0 | kohteita −3 |
| Kypros (CYP) | 7 | 3 | 1 | 2 | 0 | 0 | 12 | 0 | kohteita −1 |
| Iran (IRN) | 8 | 3 | 1 | 2 | 0 | 0 | 12 | 1 | täysi |
| Irak (IRQ) | 8 | 3 | 1 | 2 | 0 | 0 | 12 | 1 | täysi |
| Jordania (JOR) | 8 | 3 | 1 | 2 | 0 | 0 | 12 | 1 | täysi |
| Oman (OMN) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Saudi-Arabia (SAU) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Arabiemiirikunnat (ARE) | 9 | 3 | 1 | 2 | 0 | 0 | 14 | 0 | täysi |
| Egypti (EGY) | 8 | 3 | 1 | 2 | 3 | 0 | 15 | 1 | täysi |

### Aasia (19 maata)

| maa | kohteet | maastokohteet | eläintäky | skandaalit | hetket | kulttuurinostot | pääkartalla | kohdekartalla | tila |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Taiwan (TWN) | 0 | 2 | 0 | 0 | 0 | 0 | 2 | 0 | kohteita −8, maastoa −1, eläintäky puuttuu, skandaaleja −2 |
| Japani (JPN) | 0 | 3 | 1 | 0 | 0 | 0 | 3 | 0 | kohteita −8, skandaaleja −2 |
| Kazakstan (KAZ) | 0 | 3 | 0 | 0 | 0 | 0 | 3 | 0 | kohteita −8, eläintäky puuttuu, skandaaleja −2 |
| Etelä-Korea (KOR) | 0 | 3 | 0 | 0 | 0 | 0 | 3 | 0 | kohteita −8, eläintäky puuttuu, skandaaleja −2 |
| Mongolia (MNG) | 1 | 2 | 0 | 0 | 0 | 0 | 3 | 0 | kohteita −7, maastoa −1, eläintäky puuttuu, skandaaleja −2 |
| Pakistan (PAK) | 0 | 3 | 0 | 0 | 0 | 0 | 3 | 0 | kohteita −8, eläintäky puuttuu, skandaaleja −2 |
| Uzbekistan (UZB) | 1 | 2 | 0 | 0 | 0 | 0 | 3 | 0 | kohteita −7, maastoa −1, eläintäky puuttuu, skandaaleja −2 |
| Afganistan (AFG) | 1 | 3 | 0 | 0 | 0 | 0 | 4 | 0 | kohteita −7, eläintäky puuttuu, skandaaleja −2 |
| Filippiinit (PHL) | 0 | 4 | 0 | 0 | 0 | 0 | 4 | 0 | kohteita −8, eläintäky puuttuu, skandaaleja −2 |
| Kiina (CHN) | 1 | 4 | 1 | 0 | 0 | 0 | 5 | 0 | kohteita −7, skandaaleja −2 |
| Hongkong (HKG) | 4 | 2 | 0 | 2 | 0 | 0 | 8 | 0 | kohteita −4, maastoa −1, eläintäky puuttuu |
| Singapore (SGP) | 5 | 1 | 0 | 2 | 0 | 0 | 8 | 0 | kohteita −3, maastoa −2, eläintäky puuttuu |
| Indonesia (IDN) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Intia (IND) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Sri Lanka (LKA) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Myanmar (MMR) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Nepal (NPL) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Thaimaa (THA) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Vietnam (VNM) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |

### Afrikka (27 maata)

| maa | kohteet | maastokohteet | eläintäky | skandaalit | hetket | kulttuurinostot | pääkartalla | kohdekartalla | tila |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Saint Helena (SHN) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, eläintäky puuttuu, skandaaleja −2 |
| Ghana (GHA) | 0 | 3 | 0 | 0 | 0 | 0 | 3 | 0 | kohteita −8, eläintäky puuttuu, skandaaleja −2 |
| Liberia (LBR) | 0 | 3 | 0 | 0 | 0 | 0 | 3 | 0 | kohteita −8, eläintäky puuttuu, skandaaleja −2 |
| Madagaskar (MDG) | 0 | 3 | 1 | 0 | 0 | 0 | 3 | 0 | kohteita −8, skandaaleja −2 |
| Mali (MLI) | 0 | 3 | 0 | 0 | 0 | 0 | 3 | 0 | kohteita −8, eläintäky puuttuu, skandaaleja −2 |
| Mosambik (MOZ) | 0 | 3 | 0 | 0 | 0 | 0 | 3 | 0 | kohteita −8, eläintäky puuttuu, skandaaleja −2 |
| Namibia (NAM) | 0 | 3 | 1 | 0 | 0 | 0 | 3 | 0 | kohteita −8, skandaaleja −2 |
| Sudan (SDN) | 0 | 3 | 0 | 0 | 0 | 0 | 3 | 0 | kohteita −8, eläintäky puuttuu, skandaaleja −2 |
| Senegal (SEN) | 0 | 3 | 0 | 0 | 0 | 0 | 3 | 0 | kohteita −8, eläintäky puuttuu, skandaaleja −2 |
| Sierra Leone (SLE) | 0 | 3 | 0 | 0 | 0 | 0 | 3 | 0 | kohteita −8, eläintäky puuttuu, skandaaleja −2 |
| Tšad (TCD) | 0 | 3 | 0 | 0 | 0 | 0 | 3 | 0 | kohteita −8, eläintäky puuttuu, skandaaleja −2 |
| Libya (LBY) | 1 | 3 | 0 | 0 | 0 | 0 | 4 | 0 | kohteita −7, eläintäky puuttuu, skandaaleja −2 |
| Nigeria (NGA) | 0 | 4 | 0 | 0 | 0 | 0 | 4 | 0 | kohteita −8, eläintäky puuttuu, skandaaleja −2 |
| Somalia (SOM) | 0 | 4 | 0 | 0 | 0 | 0 | 4 | 0 | kohteita −8, eläintäky puuttuu, skandaaleja −2 |
| Tunisia (TUN) | 1 | 3 | 0 | 0 | 0 | 0 | 4 | 0 | kohteita −7, eläintäky puuttuu, skandaaleja −2 |
| Etelä-Afrikka (ZAF) | 0 | 4 | 1 | 0 | 0 | 0 | 4 | 0 | kohteita −8, skandaaleja −2 |
| Zimbabwe (ZWE) | 1 | 3 | 0 | 0 | 0 | 0 | 4 | 0 | kohteita −7, eläintäky puuttuu, skandaaleja −2 |
| Angola (AGO) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Kamerun (CMR) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Kongo (COD) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Algeria (DZA) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Etiopia (ETH) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Kenia (KEN) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Marokko (MAR) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Etelä-Sudan (SDS) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Tansania (TZA) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Uganda (UGA) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |

### Pohjois-Amerikka (7 maata)

| maa | kohteet | maastokohteet | eläintäky | skandaalit | hetket | kulttuurinostot | pääkartalla | kohdekartalla | tila |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Meksiko (MEX) | 1 | 0 | 1 | 0 | 0 | 0 | 1 | 0 | kohteita −7, maastoa −3, skandaaleja −2 |
| Yhdysvallat (USA) | 0 | 0 | 1 | 0 | 4 | 0 | 3 | 0 | kohteita −8, maastoa −3, skandaaleja −2 |
| Kanada (CAN) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Kuuba (CUB) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Grönlanti (GRL) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Guatemala (GTM) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Nicaragua (NIC) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |

### Etelä-Amerikka (11 maata)

| maa | kohteet | maastokohteet | eläintäky | skandaalit | hetket | kulttuurinostot | pääkartalla | kohdekartalla | tila |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Ecuador (ECU) | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | kohteita −8, maastoa −3, eläintäky puuttuu, skandaaleja −2 |
| Panama (PAN) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, eläintäky puuttuu, skandaaleja −2 |
| Paraguay (PRY) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, eläintäky puuttuu, skandaaleja −2 |
| Uruguay (URY) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, eläintäky puuttuu, skandaaleja −2 |
| Venezuela (VEN) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, eläintäky puuttuu, skandaaleja −2 |
| Peru (PER) | 0 | 0 | 1 | 0 | 1 | 0 | 1 | 0 | kohteita −8, maastoa −3, skandaaleja −2 |
| Argentiina (ARG) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Bolivia (BOL) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Brasilia (BRA) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Chile (CHL) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Kolumbia (COL) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |

### Oseania (7 maata)

| maa | kohteet | maastokohteet | eläintäky | skandaalit | hetket | kulttuurinostot | pääkartalla | kohdekartalla | tila |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Vanuatu (VUT) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, eläintäky puuttuu, skandaaleja −2 |
| Fidži (FJI) | 5 | 3 | 0 | 2 | 0 | 0 | 10 | 0 | kohteita −3, eläintäky puuttuu |
| Salomonsaaret (SLB) | 6 | 3 | 0 | 2 | 0 | 0 | 11 | 0 | kohteita −2, eläintäky puuttuu |
| Australia (AUS) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Uusi-Seelanti (NZL) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Papua-Uusi-Guinea (PNG) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Itä-Timor (TLS) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |

Maita 112, tavoitteessa 67, vajaita 45.

## Maailman erät (ehdotus)

Sama sääntö kuin Euroopassa: erä on **viisi maata taulukon heikoimmasta
päästä**, ja jokaiselle kirjoitetaan **8 kohdetta, 3 maastokohdetta,
1 eläintäky ja 2 skandaalia**. Kohdekaupungin kohdalle
(`KAUPUNGIN_KOHDALLA_SADE`, 7 lautayksikköä) ei sijoiteta uutta
pääkartan merkkiä, ja jokainen väite on en-Wikipedian katteessa
lähderivillä. Erät ovat maanosittain, jotta yksi erä on yhtä
lähdeaineistoa ja yhtä karttaseutua — ja jotta parvi voi ajaa
useampaa maanosaa rinnakkain ilman, että kaksi erää koskee samaan
tiedostoon.

| erä | maanosa | maat (merkkejä nyt) |
|---|---|---|
| M1 (tehty 6.9.) | Etelä-Amerikka | Argentiina (ARG) 0, Bolivia (BOL) 0, Brasilia (BRA) 0, Chile (CHL) 0, Kolumbia (COL) 0 |
| M2 (tehty 6.9.) | Oseania | Australia (AUS) 0, Fidži (FJI) 0, Uusi-Seelanti (NZL) 0, Papua-Uusi-Guinea (PNG) 0, Salomonsaaret (SLB) 0 |
| M3 (tehty 6.9.) | Aasia | Hongkong (HKG) 0, Indonesia (IDN) 0, Intia (IND) 0, Sri Lanka (LKA) 0, Myanmar (MMR) 0 |
| M4 (tehty 6.9.) | Pohjois-Amerikka | Kanada (CAN) 0, Kuuba (CUB) 0, Grönlanti (GRL) 0, Guatemala (GTM) 0, Nicaragua (NIC) 0 |
| M5 (tehty 6.9.) | Afrikka | Saint Helena (SHN) 0, Etelä-Sudan (SDS) 2, Angola (AGO) 3, Kamerun (CMR) 3, Kongo (COD) 3 |
| M6 (tehty 6.9.) | Lähi-itä | Kypros (CYP) 2, Oman (OMN) 2, Qatar (QAT) 2, Arabiemiirikunnat (ARE) 3, Kuwait (KWT) 3 |
| M7 (tehty erinä 2–4) | Eurooppa | Tanska (DNK) 11, Ruotsi (SWE) 11, Itävalta (AUT) 12, Irlanti (IRL) 12, Liettua (LTU) 12 |

Erä M7 on sama kuin Euroopan "erä 2 (ehdotus)" yllä — sama viisikko,
sama peruste. Muut kuusi ovat uusia.

**Mitä työtä erä on.** Euroopan ulkopuolella vaje on kaikissa neljässä
lajissa eikä vain kohteissa: 32 maalla ei ole yhtäkään karttamerkkiä,
eläintäky puuttuu 59 maasta ja skandaalitavoite 83 maasta. Erän hinta on
siis korkeampi kuin Euroopassa — yhtä maata kohti 8 + 3 kohdetta,
1 eläintäky ja 2 skandaalia, eli viiden maan erässä noin 70 uutta
riviä. Ensimmäinen erä kannattaa ajaa yhtenä maanosana, jotta mitta
näkyy ennen kuin muut kuusi tilataan.

**Ajojärjestys ehdotuksena.** M1 ja M2 ensin (kaikki kymmenen maata
nollassa, ja niiden maastokohteet puuttuvat kokonaan — sama putki kuin
Euroopan erässä 1), sitten M3 ja M4, sitten M5 ja M6, ja M7 vasta
lopuksi: Euroopan heikoinkin maa on 11 merkissä, eli muualla sama työ
tuottaa moninkertaisen hyödyn.
## Erä 4 (tehty 6.9.2026)

Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
Erä vei loppuun Euroopan viimeiset vajaat maat. Yhteensä 35 uutta
kohdetta, kaikki maan omaan `js/packs/maastokohteet-<iso>.js`-tiedostoon
lohkoon "K2-ERÄ 4 6.9.2026". Yhdenkään tyyppi ei ole maastoa, kaikilla on
vain maailmankartan rivi (erillislaudasta luovuttu, Raamattu 30.8.2026),
ja erä on kuvaton. Taulukon luvut ajetaan `tools/laske-karttanostot.mjs`
-työkalulla erikseen.

| maa | uusia | kohteet |
|---|---:|---|
| Ukraina (UKR) | 8 | Kamjanets-Podilskyin linna, Tšernobylin ydinvoimala, Hersonesos, Lviv, Hortytsja, Poltavan taistelu, Sofijivkan puisto, Derzhprom |
| Venäjä (RUS) | 8 | Kizhin pogosta, Solovetskin luostari, Kazanin kreml, Veliki Novgorod, Kolan syväreikä, Tunguskan räjähdys, Tobolskin kreml, Jasnaja Poljana |
| Espanja (ESP) | 8 | Santiago de Compostela, Segovian akvedukti, Altamiran luola, Toledo, Córdoban moskeijakatedraali, Las Médulas, Méridan roomalainen teatteri, Salamancan yliopisto |
| Ranska (FRA) | 6 | Mont-Saint-Michel, Carcassonnen linnoituskaupunki, Lascaux, Chartresin katedraali, Pont du Gard, Carnacin kivirivit |
| Britannia (GBR) | 5 | Stonehenge, Hadrianuksen muuri, Skara Brae, Ironbridge, Bathin roomalaiset kylpylät |

FRA:lla oli jo kaksi ja GBR:llä kolme kuratoitua kohdetta
(`js/packs/fokuskohteet-fra.js`, `-gbr.js`); niihin ei koskettu eikä
yhtäkään niiden kohteista toistettu.

**Yksikään ei ole pelikaupungin kohdalla.** Etäisyys mitattiin jokaiseen
`js/packs/maailmankartta.js` CITIES-listan kaupunkiin, ja jokaisen
kohteen lähin on kirjattu sen koordinaattirivin viereen. Koko erän lähin
on Toledo 23,9 lautayksikön päässä Madridista; raja
`KAUPUNGIN_KOHDALLA_SADE` on 7. Kolme kohdetta jätettiin pois juuri
tästä säännöstä: Alhambra (Granadan kohdalla), Versailles (7,3 yksikköä
Pariisista) ja Forth Bridge (7,1 yksikköä Edinburghista).
## Erä 3 (tehty 6.9.2026)

Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
Viisi maata, kahdeksan kohdetta kuhunkin, yhteensä 40 uutta
karttanostoa. Kaikki asuvat maan omassa
`js/packs/maastokohteet-<iso>.js`-tiedostossa lohkossa "K2-ERÄ 3
6.9.2026" — sama ratkaisu ja sama perustelu kuin erässä 1, koska
`js/fokuskohteet.js` KOHDE_MAAT on yhä rinnakkaisen erän hallussa.
Erä on kuvaton; kortti kantaa tekstin ja lähteen. Taulukon luvut
päivittää Fable laskurilla (`node tools/laske-karttanostot.mjs --md`).

| maa | kohteet |
|---|---|
| Alankomaat (NLD) | Woudagemaal, Deltatyöt, Vredespaleis, Domtoren, Bourtange, Giethoorn, Kröller-Müllerin museo, Nijmegen |
| Suomi (FIN) | Olavinlinna, Turun linna, Vanha Rauma, Verla, Petäjäveden vanha kirkko, Sammallahdenmäki, Kerimäen kirkko, Bomarsund |
| Portugali (PRT) | Sintra, Batalhan luostari, Tomarin luostari, Guimarães, Almendresin kivikehä, São Vicenten niemi, Elvas, Óbidos |
| Norja (NOR) | Urnesin sauvakirkko, Røros, Altan kalliopiirrokset, Nordkapp, Nidarosin tuomiokirkko, Vemork, Flåmsbana, Eidsvollin rakennus |
| Puola (POL) | Malborkin linna, Auschwitz-Birkenau, Jasna Góra, Zamość, Westerplatte, Gniezno, Elblągin kanava, Krzemionki |

Kaikki 40 ovat pääkartan merkkejä: lähin uusi merkki on Sintra 9,2
lautayksikön päässä Lissabonista, eli yli `KAUPUNGIN_KOHDALLA_SADE`n
(7) ja yli kaupunkikaton säteen (8). Muissa maissa lähin on 15,2–61,1
yksikön päässä.

Pois jätettiin kohteita, joiden nimi on jo kartalla (sääntö N3):
Suomenlinna (Helsingin kohdekartan piste), Afsluitdijk, Delft, Porto,
Coimbra, Wieliczka, Toruń ja Wrocław (kaupunkien fokusvirran nostoja
omalla karttapaikallaan) sekä Białowieża (Puolan eläintäky).
Kinderdijk pudotettiin, koska sen nimiö osui Van Meegeren -skandaalin
nimiön päälle (`tools/tarkista-nimiolimitys.mjs`); tilalle tuli
Woudagemaal.

## Erä M1 (tehty 6.9.2026)

Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."* Erä M1
on maailman ensimmäinen Euroopan ulkopuolinen erä: Etelä-Amerikan viisi
maata, joilla ei ollut yhtäkään karttamerkkiä. Jokainen sai täyden
kiintiön — **8 kohdetta, 3 maastokohdetta, 1 eläintäky ja 2 skandaalia**
— eli 13 uutta pääkartan merkkiä maata kohti, yhteensä 65, sekä kaksi
uutta eläintäkyä (ARG, BRA ja CHL olivat jo eläintäkytaulussa). Kaikki viisi
ovat laskurin mukaan nyt "täysi" (`node tools/laske-karttanostot.mjs`);
taulukot ajaa Fable erikseen.

Erä on **kuvaton**, kuten K2-erät 1–4: kortti kantaa tekstin ja lähteen.
Se koskee myös Bolivian ja Kolumbian eläintäkyjä, jotka odottavat
kuvaputken toimitusta — `tests/elaintakyt.test.mjs` sallii nyt nollan
kuvan, koska kuvattomuus on kortissa tuettu tila (`elaintakynKuvat`).

| maa | kohteet | maastokohteet | eläintäky | skandaalit |
|---|---|---|---|---|
| Argentiina (ARG) | Cueva de las Manos, Quebrada de Humahuaca, Córdoban jesuiittakortteli, La Polvorillan viadukti, Península Valdés, Ushuaia, Ischigualasto, Perito Moreno -jäätikkö | Aconcagua, Río de la Plata, Argentiinanmeri | (oli jo: magellaninpingviini) | Rosario 1978, Bariloche 1994 |
| Bolivia (BOL) | Tiwanaku, Cerro Rico, Sucre, Chiquitosin lähetysasemat, Yungas-tie, Salar de Uyuni, Oruron karnevaali, El Fuerte de Samaipata | Nevado Sajama, Illimani, Desaguadero | boliviandelfiini | Vesisota 2000, Kokaiinikaappaus 1980 |
| Brasilia (BRA) | Brasília, Itaipun pato, Serra da Capivara, São Miguel das Missões, Olinda, Congonhasin profeetat, Pantanal, Lençóis Maranhenses | Pico da Neblina, Fernando de Noronha, Atlantti | (oli jo: kultatamariini) | Lava Jato, Brumadinho 2019 |
| Chile (CHL) | Atacama, Chuquicamata, Humberstone, Chinchorron muumiot, Sewell, Paranalin observatorio, Isla Negra, Valdivian maanjäristys | Ojos del Salado, Chiloé, Tyynimeri | (oli jo: guanako) | Colonia Dignidad, Santiago 1962 |
| Kolumbia (COL) | Ciudad Perdida, San Agustín, Tierradentro, Cartagena de Indias, Mompox, Guatavitan laguuni, Barranquillan karnevaali, Kahvimaisema | Pico Cristóbal Colón, Caño Cristales, Karibianmeri | kultamyrkkysammakko | San Josén aarre 1708, Ciénaga 1928 |

**Yksikään ei ole pelikaupungin kohdalla.** Etäisyys mitattiin jokaiseen
`js/packs/maailmankartta.js` CITIES-kaupunkiin, ja jokaisen kohteen lähin
on kirjattu sen koordinaattirivin viereen. Erän lähin on Itaipun pato
11,2 lautayksikön päässä Iguazústa; seuraavat ovat Guatavita 13,3
(Bogotá), Atlantti 27,5 (Salvador) ja Olinda 29,4 (João Pessoa). Raja
`KAUPUNGIN_KOHDALLA_SADE` on 7, joten kaikki 65 ovat pääkartan merkkejä
— mikä oli tässä erässä pakko, sillä Etelä-Amerikan kaupungeista vain
Buenos Airesilla ja Rio de Janeirolla on kohdekartta.

**Mitä pudotettiin ja miksi.** Pääsiäissaari (CHL) jäi pois, koska se on
maan fokuslehden rajauksen ulkopuolella (`savuke-maastokohteet.mjs`
vartio 7a): merkki olisi olemassa mutta pelaajan ulottumattomissa.
Zipaquirán suolakatedraali (COL) putosi, koska sen nimiö olisi tullut
Guatavitan laguunin päälle — pisteiden väli on 7,6 lautayksikköä.
Argentiinan corralito ja Kolumbian Proceso 8000 jäivät pois, koska
tapahtumapaikat ovat Buenos Airesin ja Bogotán ytimessä. Sääntö N3
(sama nimi kartalla vain kerran) pudotti Titicacan ja Mamorén (BOL),
Iguazún ja Paranán (ARG) sekä Amazonin, Rio Negron, São Franciscon,
Madeiran, Xingun, Tapajósin, Tocantinsin, Araguaian ja Purusin (BRA) —
siksi Brasilian kolmesta maastokohteesta yksikään ei ole joki.

**Herkät aiheet.** Kolme skandaalia koskee diktatuuria ja yksi
huumekauppaa. Ne on kirjoitettu asiallisesti ja tiukasti lähteen
katteessa: mitä tapahtui, kuka teki ja mitä siitä seurasi.
`node tools/tarkista-nimiolimitys.mjs` antaa "NIMIÖ NIMIÖN PÄÄLLÄ: 0".
## Erä M2 (tehty 6.9.2026)

Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."* Maailman
erä M2 on Oseania: **AUS, FJI, NZL, PNG ja SLB**, joilla kaikilla oli nolla
karttamerkkiä. Erä toi 35 kohdetta, 15 maastokohdetta ja 10 skandaalia eli
**60 uutta karttanostoa**. Kohteet ja maastokohteet asuvat maan omassa
`js/packs/maastokohteet-<iso>.js`-tiedostossa (viisi uutta tiedostoa,
rekisteröity `js/packs/maastokohteet.js`-hakemistoon); skandaalit ovat
`js/packs/skandaalit.js`:n lopussa lohkossa "ERÄ M2, OSEANIA". Erä on
kuvaton, ja jokaisella nostolla on vain maailmankartan rivi.

| maa | kohteet | maastokohteet | eläintäky | skandaalit |
|---|---|---|---|---|
| Australia (AUS) | Port Arthur, Ubirr, Parkesin radioteleskooppi, Broken Hill, Mungojärvi, Snowy Mountains -hanke, Eurekan paalutus, Cooktown | Mount Augustus (vuori), Iso valliriutta (meri), Tasmania (saari) | koala (oli jo) | Batavia 1629, Glenrowan 1880 |
| Fidži (FJI) | Levuka, Sigatokan dyynit, Taveuni, Sri Siva Subramaniya, Vatukoula | Bligh Water (meri), Vanua Levu (saari), Kadavu (saari) | **puuttuu** | Elizan musketit, Cakobaun lasku |
| Uusi-Seelanti (NZL) | Waitangi, Ruapekapeka, Cape Reinga, Whakarewarewa, Waitomon luola, Napier, Arrowtown, Denniston | Ruapehu (vuori), Taupojärvi (meri), Waikato (joki) | kiivi (oli jo) | Rainbow Warrior 1985, Parihaka 1881 |
| Papua-Uusi-Guinea (PNG) | Kokodan polku, Rabaul, Kukin suo, Trobriandsaaret, Gorokan näytös, Lae, Pangunan kaivos, Milne Bay | Mount Wilhelm (vuori), Flyjoki (joki), Bismarckinmeri (meri) | paratiisilintu (oli jo) | Ok Tedi, Uusi Ranska 1880 |
| Salomonsaaret (SLB) | Tulagi, Kennedysaari, Marovon laguuni, Arnavonsaaret, Langa Langa, Tetepare | Popomanaseu (vuori), Uuden-Georgian salmi (meri), Rennell (saari) | **puuttuu** | Kwaio 1927, Savo 1942 |

**Kaksi vajetta, molemmat kirjattuina.**

1. *Fidži 5 kohdetta ja Salomonsaaret 6 kohdetta kahdeksan sijaan.* Syy ei
   ole lähteissä vaan lehden ikkunassa. Fidžin fokuslehden rajaus on
   137 × 146 lautayksikköä ja Salomonsaarten 329 × 240
   (`js/packs/fokus-grc.js` FOKUS_POHJAT), ja kohteet ovat molemmissa
   maissa muutamassa rykelmässä. Kymmenen ja yksitoista merkkiä on se
   määrä, joka mahtuu ilman että naapurin nimiö jää toisen alle
   (`tools/tarkista-nimiolimitys.mjs`). Perustelut ja karsitut ehdokkaat
   ovat tiedostojen otsikkokommenteissa.
2. *Fidžin ja Salomonsaarten eläintäky puuttuu, ja se on kuvaputken työ.*
   `tests/elaintakyt.test.mjs` vaatii jokaiselta tietueelta vähintään yhden
   kuvan, eikä tietuetta voi siksi kirjoittaa ennen kuin kuva on olemassa.
   Tilaukset ovat erän raportissa.

**Yksikään ei ole pelikaupungin kohdalla.** Etäisyys mitattiin jokaiseen
`js/packs/maailmankartta.js` CITIES-kaupunkiin — Australiassa niitä on
kaksikymmentä — ja jokaisen kohteen lähin on kirjattu sen koordinaattirivin
viereen. Koko erän lähin on Popomanaseu 11,5 lautayksikön päässä
Honiarasta; raja `KAUPUNGIN_KOHDALLA_SADE` on 7. Tästä säännöstä karsiutui
Fidžin Tomanivi (7,2 Suvasta) sekä Salomonsaarten Henderson Field ja Gold
Ridge.

**Kolme jätettiin pois säännöllä N3** (sama nimi kartalla vain kerran):
Murray ja Kosciuszko ovat jo `js/packs/maailmankartta-nimet.js`:n omia
nimiöitä ("Murray"-jokirivi sekä "Kaakkois-Australian ylängöt" ja "Suuri
vedenjakajavuoristo", joiden `huippu` on Kosciuszko), ja Aoraki on
"Uuden-Seelannin Alpit" -rivin huippu. Tilalle tulivat Mount Augustus,
Tasmania ja Ruapehu. Uluru ja Sepik ovat pelikaupunkeja, joten nekään eivät
saaneet uutta merkkiä.

**Kiertävä kartta tarkistettu.** Fidžin itäiset saaret ylittävät
antimeridiaanin. Laudan x on `((lon + 175) mod 360) · 33,33`, joten 180° E
antaa x 11 833,3 ja jatkuu siististi kohti laudan reunaa 12 000. Taveuni
(tasan 180°) osuu lehden rajaukseen, mutta Laun saariryhmä (n. 178,8° W eli
x ≈ 11 873) jäisi sen ulkopuolelle, joten sieltä ei valittu mitään. Samasta
syystä Salomonsaarten Santa Cruzin saaret (Vanikoro, La Pérousen
haaksirikko) jäivät pois: ne ovat rajauksen itäpuolella.

**Vartiot menivät läpi ilman muutoksia.** `savuke-maastokohteet.mjs`
vartio 7a olettaa maalta fokuslehden rajauksen (`lehdenRajaus`), ja
kaikilla viidellä maalla se on olemassa — vartiota ei siis tarvinnut
koskea, vaan jokainen uusi rivi mitattiin sen sisään ennen kirjoittamista.
`tools/tarkista-nimiolimitys.mjs` antaa yhä "NIMIÖ NIMIÖN PÄÄLLÄ: 0".

## Erä M4 (tehty 6.9.2026)

Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."* Erä
M4 on Pohjois-Amerikan viisikko, jolla ei ollut yhtäkään karttamerkkiä:
**CAN, CUB, GRL, GTM ja NIC**. Jokainen sai täyden kiintiön — 8 kohdetta,
3 maastokohdetta, 1 eläintäky ja 2 skandaalia — eli 13 uutta merkkiä
maata kohti ja 65 koko erässä. Laskurin (`node tools/laske-karttanostot.mjs`)
mukaan kaikki viisi ovat erän jälkeen tilassa *täysi*; taulukot ajaa Fable.

Kohteet ja maastokohteet asuvat maan omassa uudessa
`js/packs/maastokohteet-<iso>.js`-tiedostossa (rekisteröity
`js/packs/maastokohteet.js`-hakemistoon, `sw.js`:n SHELL-listalle ja
`tools/build-standalone.mjs`:n MODULES-listalle), eläintäyt
`js/packs/elaintakyt.js`:ään ja skandaalit `js/packs/skandaalit.js`:ään.
Erä on kuvaton. Faktat ovat en-Wikipedian raakatekstistä, ja jokainen
lähderivi nimeää artikkelin ja sen osan sekä tarkistuspäivän 6.9.2026.

| maa | kohteet | maastokohteet | eläintäky | skandaalit |
|---|---|---|---|---|
| Kanada (CAN) | L'Anse aux Meadows, Craigellachie, Rideaun kanava, Head-Smashed-In, Dinosaur Provincial Park, Vanha Québec, Louisbourgin linnoitus, Dawson City | Mount Logan, Naha Dehé, Baffininsaari | (oli jo: jääkarhunpentu) | Pacific 1873, Bre-X 1997 |
| Kuuba (CUB) | Trinidad, Viñalesin laakso, San Pedro de la Roca, Cienfuegos, Camagüey, Baracoa, Hersheyn rata, Bayamo | Pico Turquino, Cauto, Nuorisonsaari | (oli jo: mehiläiskolibri) | Maine 1898, Playa Girón 1961 |
| Grönlanti (GRL) | Hvalsey, Ivittuut, Kangerlussuaq, Grönlannin jäätikkö, Sisimiut, Uummannaq, Ittoqqortoormiit, Koillis-Grönlannin kansallispuisto | Gunnbjørn Fjeld, Ilulissatin jäävuono, Diskonsaari | grönlanninkoira | Kuannersuit, Vihreä maa 985 |
| Guatemala (GTM) | Tikal, El Mirador, Quiriguá, Seibal, Iximche, Chichicastenango, Semuc Champey, San Felipe de Lara | Tajumulco, Atitlánjärvi, Motagua | ketsaali | Banaanisopimus 1904, Santa María 1902 |
| Nicaragua (NIC) | León, Granada, El Castillo, Bluefields, Solentiname, Somoton kanjoni, Ciudad Darío, Bilwi | Cosigüina, Ometepe, San Juanjoki | guardabarranco | Walker 1856, Kanava 2013 |

**Yksikään ei ole pelikaupungin kohdalla.** Etäisyys mitattiin jokaiseen
`js/packs/maailmankartta.js` CITIES-kaupunkiin, ja jokaisen kohteen lähin
on kirjattu sen koordinaattirivin viereen. Koko erän lähin merkki on
Ciudad Darío 12,6 lautayksikön päässä Managuasta; raja
`KAUPUNGIN_KOHDALLA_SADE` on 7. `node tools/tarkista-nostopaikat.mjs`
antaa kaikille 65:lle rivin *pääkartta*, ja
`node tools/tarkista-nimiolimitys.mjs` sanoo yhä "NIMIÖ NIMIÖN PÄÄLLÄ: 0".

**Kolme rajausta, jotka valitsivat sisällön.** (1) Laudan pohjoisreuna
on 76°N (Millerin lieriö), joten Grönlannista jäivät pois Pituffik
(Thule 1968), Camp Century ja Qaanaaq — ne olisivat saaneet negatiivisen
y-koordinaatin eli jääneet laudan yläreunan taakse. (2) Sääntö N3:
Mackenzie ja Nicaraguajärvi ovat jo laudan omalla nimitaululla
(`js/packs/maailmankartta-nimet.js`), joten Kanadan joeksi valittiin Naha
Dehé ja Nicaraguan maastokolmikkoon Cosigüinan tulivuori. (3)
Kaupunkisääntö pudotti Antigua Guatemalan (8,0 yksikköä pääkaupungista)
ja Momotombon (8,0 yksikköä Managuasta).

**Vartio 7a ja maat ilman lehteä.** `tools/savukkeet/savuke-maastokohteet.mjs`
vaatii, että jokainen kohde osuu maan fokuslehden rajaukseen
(`osuuLehteen`). Kaikilla viidellä maalla rajaus on olemassa
(`js/packs/fokus-grc.js` FOKUS_POHJAT), joten vartio pätee myös näihin
tiedostoihin eikä sitä ole kierretty; ratkaisu on kirjattu jokaisen
tiedoston otsikkokommenttiin. Jos maalla ei olisi rajausta,
`osuuLehteen` palauttaisi `null` ja vartio ohittaisi maan — vartioita ei
ole muutettu kummassakaan tapauksessa. Savuke menee läpi 8/8.

**Kuvat puuttuvat kolmelta eläintäyltä.** GRL, GTM ja NIC saivat
`kuva`-kenttään kuvaputken tunnuksen ilman kansiota (`elain-grl`,
`elain-gtm`, `elain-nic`), joka osoittaa ämpäriin: kun kuvaputki tekee
kuvan, se ilmestyy kortille ilman koodimuutosta, ja siihen asti kortti on
kuvaton.
## Erä M3 (tehty 6.9.2026)

Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
Maailman erien ensimmäinen Aasian erä: **HKG, IDN, IND, LKA, MMR** —
viisi maata, joilla ei ollut yhtäkään karttamerkkiä. Erä on kuvaton
kuten K2-erät 1–4, ja jokainen väite on en-Wikipedian raakatekstin
katteessa lähderivillä, joka nimeää artikkelin ja osan sekä
tarkistuspäivän 6.9.2026. Taulukon luvut ajetaan
`node tools/laske-karttanostot.mjs --md` -työkalulla erikseen.

Kohteet ja maastokohteet asuvat maan omassa
`js/packs/maastokohteet-<iso>.js`-tiedostossa (viisi uutta tiedostoa,
rekisteröity `js/packs/maastokohteet.js`-hakemistoon, `sw.js`:n
SHELL-listaan ja `tools/build-standalone.mjs`:n MODULES-listaan).
Eläintäyt ovat `js/packs/elaintakyt.js`:n lopussa ja skandaalit
`js/packs/skandaalit.js`:n lopussa; kummankin testin lukumäärä
päivitettiin (eläintäkyjä 53 → 56, skandaaleja 83 → 93 ja maita
29 → 34).

| maa | kohteet | maastokohteet | eläintäky | skandaalit |
|---|---|---|---|---|
| Hongkong (HKG) | Kowloonin muurikaupunki, Tai O, Tung Chungin linnake, Tai Fu Tai | Tai Mo Shan, Lantau | — | Godberin pako, Carrian |
| Indonesia (IDN) | Borobudur, Prambanan, Trowulan, Sangiran, Sawahlunto, Tana Toraja, Bandasaaret, Besakih | Krakatau, Tobajärvi, Komodo | babirusa | Max Havelaar, Bre-X 1997 |
| Intia (IND) | Taj Mahal, Ajanta, Ellora, Khajuraho, Hampi, Konarkin aurinkotemppeli, Jantar Mantar, Darjeelingin vuoristorata | Kangchenjunga, Chilikajärvi, Bengalinlahti | (oli jo: tiikerinpentu) | Natwarlal, Telgin leimat |
| Sri Lanka (LKA) | Sigiriya, Anuradhapura, Polonnaruwa, Yapahuwa, Kandyn hammastemppeli, Gallen linnoitus, Nuwara Eliya, Yhdeksän kaaren silta | Sri Pada, Mahaweli, Palkinlahti | sri lankan leopardi | Matalen kapina, Golden Key |
| Myanmar (MMR) | Bagan, Mrauk U, Beikthano, Kyaiktiyo, Pindayan luolat, Pyin Oo Lwin, Mawlamyine, Shwebo | Hkakabo Razi, Inlejärvi, Chindwin | surkkunenäapina | Dhammazedin kello, Kultainen kirje |

Neljä maata viidestä on tavoitteessa (`node tools/laske-karttanostot.mjs`
sanoo niistä "täysi"). Hongkong ei ole, ja syy on mitattu.

**Miksi Hongkong jäi vajaaksi.** Koko alue mahtuu maailmankartalla noin
11 × 9 lautayksikön ruutuun, ja yhden nostomerkin nimiölaatikko on
leveämpi kuin koko maa. Kahdeksan kohdetta ja kolme maastokohdetta
kirjoitettiin ensin; `tools/tarkista-nimiolimitys.mjs` löysi niistä
seitsemän nimiö–nimiö-limitystä, eikä nimien lyhentäminen auttanut,
koska laatikolla on vähimmäisleveys. Kahdeksan merkkiä on maan yläraja:
kahdeksalla limityksiä on nolla ja yhdeksännellä yksi. Kahdeksan
jaettiin neljään kohteeseen, kahteen maastokohteeseen ja kahteen
skandaaliin. Lisäksi Hongkongin kaupunkilehden kohdekartta
(`js/packs/maakartat.js` hongkong, lat 22,2665–22,3015 ja lon
114,1385–114,1805) kattaa koko Victoria-sataman, ja sen ruutuun osuva
nosto kuuluu kohdekartan pisteelle eikä pääkartalle
(`tests/nostot-kartalla.test.mjs`). Hongkongin kohdekartan työlistalle
jäävät siis valmiiksi kirjoitettuina Peak Tram (1888), Hongkongin
observatorio (1883), Tsim Sha Tsuin kellotorni, Victorian satama ja
Lei Cheng Ukin Han-hauta. Eläintäkyä ei voitu tehdä lainkaan: merkin on
oltava vähintään 35 lautayksikön päässä jokaisesta kaupunkimerkistä
(`tests/elaintakyt.test.mjs`), ja koko Hongkong on 11–20 yksikön päässä
omasta laatastaan. Ehdokas odottaa valmiina: Romerin puupuu, jonka
Chek Lap Kokin populaatio siirrettiin talteen 1992 ennen lentoaseman
rakentamista.

**Yksikään uusi merkki ei ole pelikaupungin kohdalla.** Etäisyys
mitattiin jokaiseen `js/packs/maailmankartta.js` CITIES-kaupunkiin.
Lähin uusi merkki on Hongkongin Tai Fu Tai 10,9 lautayksikön päässä
Hongkong-laatasta ja toiseksi lähin Myanmarin Pyin Oo Lwin 11,6
yksikön päässä Mandalaysta; raja `KAUPUNGIN_KOHDALLA_SADE` on 7 ja
kaupunkikaton säde 8. Pois jätettiin juuri tästä säännöstä Elephantan
luolat (Mumbain kohdalla), Shwedagon (Yangonin kohdalla), Inwa,
Amarapura ja Mingun (Mandalayn kohdalla) sekä Matale ja Kurunegala
(Colombo-laatta on saaren keskellä). Kahden skandaalin merkki
siirrettiin kohdekartan ruudun ulkopuolelle samalle rannalle —
Hongkongin Carrian ja Colombon Golden Key — ja syy on kirjattu
kummankin kortin viereen `js/packs/skandaalit.js`:ssä.

**Nimisääntö N3 karsi kaksi maastokohdetta.** Kartalla on jo
`js/packs/maailmankartta-nimet.js`:ssä jokinimiöt Ganges ja Iravadi,
joten Intian joeksi valittiin Bengalinlahti ja Myanmarin joeksi
Chindwin (Iravadin suurin sivujoki). Samasta syystä pois jäivät myös
Jamuna, Brahmaputra, Godavari, Krishna, Narmada, Indus, Sutlej,
Himalaja, Länsi-Ghatit ja Salween.

**Herkkien kohteiden linjaukset pidettiin**
(`docs/aasia-tyoaineisto/spec-asia.md`, SITOVA). Hongkongista ei
kirjoitettu 2010–2020-lukujen protesteja eikä turvallisuuslakia:
molemmat skandaalit ovat 1970–80-luvun talous- ja virkarikoksia.
Myanmarista ei kirjoitettu juntta- eikä konfliktisisältöä, minkä takia
kaksi muuten ilmeistä ehdokasta jäi pois: Goteikin viadukti (artikkeli
kertoo sen tuhoutuneen 2025 sisällissodassa) ja Mogokin
rubiinikaivokset (artikkelin nykytilaosuus on sotaa).

## Erä M5 (tehty 6.9.2026)

Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."* Maailman
erien ensimmäinen Afrikan erä: **SDS, AGO, CMR, COD ja DZA**. Neljällä maalla
oli kolme maastokohdetta ja Etelä-Sudanilla kaksi, mutta yhdelläkään ei ollut
yhtään kohdetta, eläintäkyä eikä skandaalia. Erä kirjoitti kullekin kahdeksan
kohdetta, yhden eläintäyn ja kaksi skandaalia sekä Etelä-Sudanille lisäksi
puuttuneen maastokohteen (Sudd) — yhteensä 56 uutta karttamerkkiä. Erä on
kuvaton kuten K2-erät 1–4 ja maailman erät M1–M4, ja jokainen väite on
en-Wikipedian raakatekstin katteessa lähderivillä, joka nimeää artikkelin ja
osan sekä tarkistuspäivän 6.9.2026. `node tools/laske-karttanostot.mjs` sanoo
erän jälkeen kaikista viidestä *täysi*; taulukot ajaa Fable.

| maa | kohteet | maastokohteet | eläintäky | skandaalit |
|---|---|---|---|---|
| Etelä-Sudan (SDS) | Gondokoro, Lado, Jonglein kanava, Boman puisto, Bandingilon puisto, Wau, Nzara, Nimule | Sudd (uusi; oli jo: Kinyeti, Valkoinen Niili) | kenkänokka | Fashoda 1898, Zubayr 1873 |
| Angola (AGO) | M’banza-Kongo, São Miguelin linnoitus, Kalandulan putoukset, Quiçaman puisto, Ionan puisto, Moçâmedes, Benguelan rata, Cuito Cuanavale | (oli jo: Morro de Moco, Atlantti, Cuanza) | jättiläisseeprantilooppi | Cassange 1961, Orjatie 1905 |
| Kamerun (CMR) | Foumbanin palatsi, Djan luonnonpuisto, Bimbia, Rhumsiki, Wazan kansallispuisto, Kribi, Korupin kansallispuisto, Ngaoundéré | (oli jo: Kamerunvuori, Guineanlahti, Sanaga) | goliattisammakko | Nyos 1986, Manga Bell 1914 |
| Kongo (COD) | Ingan padot, Boyoman putoukset, Virungan puisto, Kahuzi-Biéga, Salongan puisto, Garamban puisto, Upemban puisto, Lubumbashin kaivokset | (oli jo: Mount Stanley, Tanganjikajärvi, Kongo) | bonobo | Casement 1904, Shinkolobwe |
| Algeria (DZA) | Timgad, Djémila, Tipasa, Tassilin kalliotaide, Qal’at Bani Hammad, Tlemcen, M’zabin laakso, Constantine | (oli jo: Tahat, Välimeri, Chelif) | fennekki | Kärpäsviuhka 1827, Gerboise Bleue 1960 |

**Yksikään ei ole pelikaupungin kohdalla.** Etäisyys mitattiin jokaiseen
`js/packs/maailmankartta.js` CITIES-kaupunkiin, ja jokaisen kohteen lähin on
kirjattu sen koordinaattirivin viereen. Koko erän lähin merkki on Kribi 26,2
lautayksikön päässä Kamerun-laatasta ja skandaaleista Deim Zubeir 28,6
yksikön päässä Bahr el Ghazalista; raja `KAUPUNGIN_KOHDALLA_SADE` on 7.
`node tools/tarkista-nostopaikat.mjs` antaa kaikille 56:lle rivin *pääkartta*,
ja `node tools/tarkista-nimiolimitys.mjs` sanoo yhä "NIMIÖ NIMIÖN PÄÄLLÄ: 0".

**Neljä rajausta, jotka valitsivat sisällön.** (1) Sääntö N3 ja tiheä
rannikko: Angolan rannikolla Lobito, Benguela ja Catumbela ovat samassa
parinkymmenen lautayksikön ruudussa, joten radalle valittiin ylängön
Huambo-piste (radan oma artikkeli ei anna koordinaatteja) ja Nevinsonin
orjatien merkki jäi Benguelaan. Samasta syystä Kamerunista jäi pois Limbe ja
Buea (molemmat alle kymmenen yksikön päässä Bimbiasta) ja Etelä-Sudanista
Juba (kolmen yksikön päässä Gondokorosta) sekä Malakal, joka osuu Valkoisen
Niilin vanhan merkin päälle. (2) M3:n Myanmar-linja: artikkeleita, joiden
nykytila on sotaa, ei kirjoitettu. Kongosta jätettiin siksi pois Okapin
luonnonpuisto (artikkelin nykytilaosuus kertoo aseellisesta miehityksestä ja
siviiliuhreista), ja Virunga sekä Kahuzi-Biéga kirjoitettiin puistojen
historiasta ja luonnosta — uhanalaisten kohteiden luettelo mainitaan
asiallisesti yhtenä lauseena. Angolan Cuito Cuanavale on 1987–88 käyty
taistelu ja kirjoitettu tapahtumahistoriana New Yorkin sopimukseen asti.
(3) Tyyppi kertoo, mitä merkki näyttää: Tassili n'Ajjer on artikkelissa
vuoristo, joten nosto rajattiin sen kalliotaiteeseen (`kulttuuri`) eikä
kirjattu maastoksi, ja Sudd on `jarvi`. (4) Kaksi ehdokasta kaatui
lähdeaineiston ohuuteen: Tundavalasta ja Tchitundo-Hulusta ei ole
en-Wikipedian artikkelia lainkaan, ja Serra da Leban artikkeli on neljä riviä
— niiden tilalle tulivat Moçâmedes ja Ionan puisto.

**Eläintäkyjen paikat on mitattu koneellisesti.** Jokainen piste on maan
rajojen sisällä, maalla ja vähintään 35 lautayksikön päässä jokaisesta
kaupunkimerkistä (`tests/elaintakyt.test.mjs`). Kamerun oli erän ainoa tiukka
tapaus: koko goliattisammakon rannikkokaista on 26–36 yksikön päässä
Kamerun-laatasta, joten piste haettiin haravoimalla ja se asetettiin
vyöhykkeen pohjoispäähän (lon 9,9 / lat 3,4; etäisyys 36,5).

**Kuvat puuttuvat kaikilta viideltä eläintäyltä.** `kuva`-kentässä on
kuvaputken ämpäritunnus ilman kansiota (`elain-dza`, `elain-ago`,
`elain-cmr`, `elain-cod`, `elain-sds`): kun kuvaputki toimittaa kuvan, se
ilmestyy kortille ilman koodimuutosta, ja siihen asti kortti on kuvaton.
## Erä M8 (tehty 6.9.2026)

Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
Aasian toinen erä: **NPL, THA, VNM, SGP, TLS**. Nepalilla oli ennen erää
vain eläintäky, muilla neljällä ei yhtäkään karttamerkkiä. Erä on
kuvaton kuten K2-erät 1–4 ja maailman erät M1–M4, ja jokainen väite on
en-Wikipedian raakatekstin katteessa lähderivillä, joka nimeää
artikkelin ja osan sekä tarkistuspäivän 6.9.2026. Taulukon luvut ajetaan
`node tools/laske-karttanostot.mjs --md` -työkalulla erikseen.

Kohteet ja maastokohteet asuvat maan omassa
`js/packs/maastokohteet-<iso>.js`-tiedostossa (viisi uutta tiedostoa,
rekisteröity `js/packs/maastokohteet.js`-hakemistoon, `sw.js`:n
SHELL-listaan ja `tools/build-standalone.mjs`:n MODULES-listaan).
Eläintäyt ovat `js/packs/elaintakyt.js`:n lopussa ja skandaalit
`js/packs/skandaalit.js`:n lopussa; kummankin testin lukumäärä
päivitettiin (eläintäkyjä 61 → 64, skandaaleja 123 → 133 ja maita
49 → 54).

| maa | kohteet | maastokohteet | eläintäky | skandaalit |
|---|---|---|---|---|
| Nepal (NPL) | Lumbini, Bhaktapur, Gorkha, Janakpur, Muktinath, Lo Manthang, Nuwakot, Bardiyan kansallispuisto | Dhaulagiri, Koshi, Rara-järvi | (oli jo) | Khumjungin jetin päänahka, Yrjö V:n metsästysretki |
| Thaimaa (THA) | Ayutthaya, Sukhothai, Ban Chiang, Phanom Rung, Phimai, Khao Yai, Chiang Mai, Kuoleman rautatie | Doi Inthanon, Chao Phraya, Thaimaanlahti | kimalaislepakko | Phaulkonin nousu ja tuho, Sininen timantti |
| Vietnam (VNM) | Hội An, Huế, Mỹ Sơn, Phong Nha, Điện Biên Phủ, Hồ-linnoitus, Hoa Lư, Po Nagar | Fansipan, Punainenjoki, Hạ Longin lahti | saola | Hanoin rottapalkkiot, Hội Anin hylky |
| Singapore (SGP) | Kasvitieteellinen puutarha, Pulau Ubin, Kranji, Rafflesin majakka, Haw Par Villa | Bukit Timah | — | Barings, Pan-Electric |
| Itä-Timor (TLS) | Cristo Rei, Maubara, Balibo, Lailin luola, Baucau, Baguia, Viqueque, Nino Konis Santana | Matebian, Ataúro, Timorinmeri | timorinpeippo | Lifaun pako, Manufahin kapina |

Neljä maata viidestä on tavoitteessa (`node tools/laske-karttanostot.mjs`
sanoo niistä "täysi"). Singapore ei ole, ja syy on mitattu.

**Miksi Singapore jäi vajaaksi.** Koko maa mahtuu maailmankartalla noin
10 × 10 lautayksikön ruutuun — vielä Hongkongiakin ahtaammin — ja yhden
nostomerkin nimiölaatikko on leveämpi kuin koko maa. Kahdeksan merkkiä
on maan yläraja aivan kuten Hongkongissa: viisi kohdetta, yksi
maastokohde ja kaksi skandaalia, ja `tools/tarkista-nimiolimitys.mjs`
antaa niistä nollan nimiö–nimiö-limitystä. Yhdeksäs toi ensimmäisen.
Lisäksi Singaporen kaupunkilehden kohdekartta (`js/packs/maakartat.js`
singapore, lat 1,276–1,308 ja lon 103,836–103,874) kattaa koko
siirtomaa-ajan ytimen, ja sen ruutuun osuva nosto kuuluu kohdekartan
pisteelle eikä pääkartalle (`tests/nostot-kartalla.test.mjs`). Sinne
jäävät Fort Canningin kukkula, Raffles Hotel, Empress Place, Boat Quay
ja Sri Mariamman -temppeli, jotka ovat jo kohdekartan pisteitä; samasta
syystä molempien skandaalien merkit siirrettiin ruudun ulkopuolelle
(Barings ruudun itäpuolelle, Pan-Electric Changiin saaren
koilliskärkeen), ja syy on kirjattu kummankin kortin viereen. Eläintäkyä
ei voitu tehdä lainkaan: merkin on oltava vähintään 35 lautayksikön
päässä jokaisesta kaupunkimerkistä (`tests/elaintakyt.test.mjs`), ja
jokainen piste Singaporen alueella on 12,6–21,6 yksikön päässä omasta
laatastaan. Ehdokas odottaa valmiina: sarvinokkalintu (Anthracoceros
albirostris), joka katosi Singaporesta 1800-luvulla ja palasi Pulau
Ubinille 1990-luvulla.

**Yksikään uusi merkki ei ole pelikaupungin kohdalla.** Etäisyys
mitattiin jokaiseen `js/packs/maailmankartta.js` CITIES-kaupunkiin.
Lähin uusi merkki on Vietnamin Hanoin rottapalkkiot 12,8 lautayksikön
päässä Hanoi-laatasta ja toiseksi lähin Itä-Timorin Betano 12,9
yksikön päässä Dilistä; raja `KAUPUNGIN_KOHDALLA_SADE` on 7. Pois
jätettiin juuri tästä säännöstä Nepalin Kathmandun laakson kohteet
(Kirtipur, Pharpingin voimalaitos, Changu Narayan, Kathmandun
Durbar-aukio), Vietnamin Cổ Loan linnoitus (4,9 yksikköä Hanoista) sekä
Itä-Timorin **Tatamailau** (5,1 yksikköä Dilistä), joka on maan korkein
vuori — sen tilalle maastokohteeksi tuli Matebian. Kathmandun laaksoon
mahtui lisäksi vain yksi nimiö, joten Bhaktapurin naapurit jäivät pois
myös limityssyystä.

**Nimisääntö N3 karsi neljä ehdokasta.** Kartalla on jo
`js/packs/maailmankartta-nimet.js`:ssä nimiöt Himalaja, Ganges ja
Mekong, ja Etelä-Kiinan meri on Kiinan oma nosto
(`js/packs/maastokohteet-chn.js`). Siksi Nepalin vuoreksi valittiin
Dhaulagiri ja joeksi Koshi, ja Vietnamin joeksi Punainenjoki ja mereksi
Hạ Longin lahti. Saman säännön ja nimiölimityksen takia jäivät pois
myös Annapurna, Kali Gandaki ja Sa Pa (yhdeksän kilometriä
Fansipanista).

**Herkkien kohteiden linjaukset pidettiin**
(`docs/aasia-tyoaineisto/spec-asia.md`, SITOVA). Vietnamin sodista
kirjoitettiin vain lähteen katteessa ja ilman nykypolitiikkaa: Điện
Biên Phủ on ensimmäisen Indokiinan sodan ratkaisutaistelu 1954, ja Mỹ
Sơnin kortti mainitsee pommitusvaurion samalla tarkkuudella kuin
artikkeli. Itä-Timorin miehityksestä kerrotaan vain Balibon kortissa
toteavasti, ja molemmat maan skandaalit ovat siirtomaakaudelta (1769 ja
1911–1912). Nepalin sisällissodasta ei kirjoitettu lainkaan; maan
skandaalit ovat vuosilta 1911 ja 1960. Thaimaan ja Singaporen
skandaalit ovat talousrikoksia ja hovihistoriaa, kuten Hongkongissa
erässä M3.
## Erä M6 (tehty 6.9.2026)

Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
Maailman erä M6 on Lähi-itä: **CYP, OMN, QAT, ARE ja KWT** — viisi
maata, joilla oli yhteensä kaksitoista karttamerkkiä ja yksi kohde.
Erä toi **38 kohdetta ja maastokohdetta, 4 eläintäkyä ja 10 skandaalia
eli 52 uutta karttanostoa**. Kohteet ja maastokohteet asuvat maan
omassa `js/packs/maastokohteet-<iso>.js`-tiedostossa (kaikilla viidellä
tiedosto oli jo olemassa, joten `js/packs/maastokohteet.js`-hakemistoon,
`sw.js`:ään eikä `tools/build-standalone.mjs`:ään ei tarvinnut koskea);
eläintäyt ovat `js/packs/elaintakyt.js`:n lopussa ja skandaalit
`js/packs/skandaalit.js`:n lopussa lohkossa "ERÄ M6, LÄHI-ITÄ".
Erä on kuvaton, ja jokaisella nostolla on vain maailmankartan rivi.
Faktat ovat en-Wikipedian raakatekstistä, ja jokainen lähderivi nimeää
artikkelin ja sen osan sekä tarkistuspäivän 6.9.2026.

| maa | kohteet | maastokohteet | eläintäky | skandaalit |
|---|---|---|---|---|
| Kypros (CYP) | Paphoksen mosaiikit, Palaipafos, Kourion, Khirokitia, Asinoun kirkko, Kykkoksen luostari, Kap Greco | Levantinmeri (meri) | kyproksenpöllönen | Cesnolan kokoelma, Rikhardin Kypros-kauppa |
| Oman (OMN) | Bahlan linnoitus, Nizwan linnoitus, Batin haudat, Sur, Sumhuram, Sharqiyan hiekat, Nakhalin linnoitus, Musandam | Masirah (saari) | arabianleopardi | Oryksin suojelualue, Ubarin löytö |
| Qatar (QAT) | Zubarah, Jassasiya, Al Reem, Dukhan, Al Thakhira | Bahraininlahti (meri) | **mahdoton** | Dohan ryöstö, Zubarahin loppu |
| Arabiemiirikunnat (ARE) | Hili, Jebel Hafeet, Fujairahin linna, Al Bidyan moskeija, Mleiha, Ed Dur, Julfar, Qasr al-Hosn | Sir Bani Yas (saari) | arabiantahri | Merirosvorannikko, Dubai World |
| Kuwait (KWT) | Failaka, Bahra 1, Burganin kenttä, Kubbar, Umm al Maradim | Bubiyan (saari) | hietakissa | Souk Al-Manakh, Helmien loppu |

`node tools/laske-karttanostot.mjs` sanoo erän jälkeen Omanista ja
Arabiemiirikunnista *täysi*; Kypros on −1 kohdetta, Qatar −3 kohdetta ja
eläintäky, Kuwait −3 kohdetta. Kolme vajetta on mitattu eikä arvattu, ja
kaikki kolme johtuvat samasta asiasta: maa on pieni ja pelikaupunki
istuu sen keskellä.

**Miksi Qatar, Kuwait ja Kypros jäivät vajaiksi.** Mitta on
`tools/tarkista-nimiolimitys.mjs`, joka laskee poltettavien nimiöiden
laatikot laudan yksiköissä. Qatarin fokuslehden rajaus on 68,9 × 99,5
lautayksikköä ja Doha on itärannalla sen keskellä; kaupunkikaton
(`KAUPUNKIKATON_SADE` 8) ja rajauksen jälkeen käyttökelpoista tilaa jää
noin 25 × 25 yksikköä pohjoiseen ja kapea kaistale länteen, ja siihen
mahtuu viisi kohdetta. Kuwaitin rajaus on 103,3 × 100,5 yksikköä ja
Kuwait City lahden pohjukassa; kolme ilmeistä ehdokasta (Al Jahran
punainen linnake, Kazma, Umm an Namil) olisi tullut olemassa olevien
maastomerkkien päälle 2–3 yksikön päähän. Kyproksen rajaus on 100,9 ×
66,5 yksikköä, ja seitsemän kohdetta on se määrä, jolla jokainen nimiö
pysyy näkyvissä. Jokaisen tiedoston otsikkokommentti luettelee karsitut
ehdokkaat ja mitatut etäisyydet.

**Qatarin eläintäky on mahdoton, ja se on laskettu.**
`tests/elaintakyt.test.mjs` vaatii merkiltä vähintään 35 lautayksikön
etäisyyden jokaiseen kaupunkimerkkiin. Koko Qatarin maa-alue
haravoitiin kahden sadasosa-asteen ruudukolla (maan rengas ja
`js/mapart.js` `isOnLand`): kaukaisin maapiste Dohasta on niemimaan
pohjoiskärki, ja sekin vain 31,8 yksikön päässä. Sama tilanne kuin
Hongkongissa erässä M3. Ehdokas odottaa valmiina: arabianoryksi, jota
Al Reemin biosfäärialue suojelee.

## Erä M9 (tehty 6.9.2026)

Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
Lähi-idän toinen erä: **SAU, IRN, JOR, IRQ ja EGY**. Kaikilla viidellä
oli jo kolme (Saudi-Arabialla kaksi) maastokohdetta, ja neljällä oli
yksittäisiä kuratoituja kohteita fokuspakissaan, mutta yhdelläkään ei
ollut skandaaleja eikä — Saudi-Arabiaa lukuun ottamatta — eläintäkyä.
Erä kirjoitti kullekin maalle puuttuvat kohteet, Saudi-Arabialle lisäksi
puuttuneen maastokohteen (Farasansaaret) sekä neljä eläintäkyä ja
kymmenen skandaalia — yhteensä **42 uutta karttamerkkiä**. Erä on
kuvaton kuten K2-erät 1–4 ja maailman erät M1–M5 ja M8, ja jokainen
väite on en-Wikipedian raakatekstin katteessa lähderivillä, joka nimeää
artikkelin ja osan sekä tarkistuspäivän 6.9.2026.
`node tools/laske-karttanostot.mjs` sanoo erän jälkeen kaikista
viidestä *täysi*; taulukot ajaa Fable.

| maa | kohteet | maastokohteet | eläintäky | skandaalit |
|---|---|---|---|---|
| Saudi-Arabia (SAU) | Hegra, Al-Ahsan keidas, Jubbahin kalliotaide, Al-Ukhdud, Rijal Almaa, Qaryat al-Faw, Vanha Jedda | Farasansaaret (uusi; oli jo: Jabal Sawda, Rub al-Khali, Punainenmeri) | (oli jo: arabianoryksi) | Wallinin valeasu, Tayman kivi |
| Iran (IRN) | Pasargadai, Bamin linnoitus, Yazd, Shushtar, Soltaniyeh, Takht-e Soleyman, Gonbad-e Qabus | (oli jo: Damavand, Kaspianmeri, Karun) | persianonageri | Tupakkakapina, Susan kaivausmonopoli |
| Jordania (JOR) | Jerash, Umm Qais, Umm el-Jimal, Madaba, Kerakin linna, Wadi Rum, Ayla | (oli jo: Jabal Umm ad Dami, Kuollutmeri, Jordan) | nubiantorvikauris | Meshan steela, Azraqin kosteikko |
| Irak (IRQ) | Ur, Uruk, Samarran moskeija, Erbilin sitadelli, Hatra | (oli jo: Cheekha Dar, Tigris, Shatt al-Arab) | basranruokokerttunen | Bagdadin patteri, Rassamin oikeusjuttu |
| Egypti (EGY) | Abu Simbel, Abydos, Philae, Wadi al-Hitan | (oli jo: Siinainvuori, Punainenmeri, Niili) | egyptinmangusti | Denderan horoskooppi, Suezin osakekauppa |

**Yksikään uusi merkki ei ole pelikaupungin kohdalla.** Etäisyys
mitattiin jokaiseen `js/packs/maailmankartta.js` CITIES-kaupunkiin, ja
jokaisen kohteen lähin on kirjattu sen koordinaattirivin viereen. Koko
erän lähin merkki on Failaka 8,8 lautayksikön päässä Kuwait-laatasta;
raja `KAUPUNGIN_KOHDALLA_SADE` on 7 ja kaupunkikaton säde 8. Tästä
säännöstä karsiutuivat Qatarin Al Wakrah (5,0), Al Wajbahin linnake
(4,2) ja Barzanin tornit (5,7), Omanin Al-Baleed (5,8) sekä
Arabiemiirikuntien Al Shindagha ja Al Fahidi. `node
tools/tarkista-nimiolimitys.mjs` antaa yhä "NIMIÖ NIMIÖN PÄÄLLÄ: 0", ja
kaikki 64 Lähi-idän merkkiä pitävät nimiönsä näkyvissä.

**Kaksi skandaalimerkkiä on siirretty naapuriruutuun** samalla
periaatteella kuin erässä M3 (Hongkongin Carrian ja Colombon Golden
Key): Zubarahin hävitys on niemimaan pohjoisrannalla, koska Zubarahin
oma nosto istuu jo raunioiden päällä, ja Souk Al-Manakh Kuwaitinlahden
suulla, koska tapahtumapaikka Jibla on Kuwait Cityn sisällä. Kolmas
siirto on Kyproksen Rikhard-skandaali, joka on Limassolin itälaidalla
viiden kilometrin päässä keskustasta, koska Khirokitian nimiö on
keskustan kohdalla. Jokaisen kortin `paikka`-rivi kertoo tapahtuman
oikean paikan, ja syy on kirjattu merkin viereen koodiin.

**Sääntö N3 karsi kolme ehdokasta.** Saudi-Arabialla on jo
arabianoryksi, joten Omanin eläintäyksi valittiin arabianleopardi
(Jabal Samhanin luonnonsuojelualue) eikä oryksi; Kyproksen Salamis ja
Famagusta ovat käytännössä Pediaíos-nimiön päällä, joten kumpaakaan ei
otettu. Yksikään uusi nimi ei ole laudan omassa nimitaulussa
(`js/packs/maailmankartta-nimet.js`).

**Herkät aiheet asiallisesti** (`docs/aasia-tyoaineisto/spec-asia.md`).
Kyproksesta ei kirjoitettu vuoden 1974 jälkeisiä kiistoja eikä
nykypolitiikkaa: molemmat skandaalit ovat 1100- ja 1800-luvulta, ja
saaren hallinnollinen nykytilanne jätettiin kokonaan mainitsematta.
Warbahin saari jätettiin pois Kuwaitin listalta, koska sen artikkelin
historiaosuus on kokonaan rajakiistaa. Kolonialismi kerrotaan
neutraalina historiana ja lähteen katteessa (Fujairahin linnan
pommitus 1925, vuoden 1819 retkikunta ja sen kiistetty peruste).
Sotahistoriaa ei ole otettu kohteiksi.

**Vartiot menivät läpi ilman muutoksia.** `savuke-maastokohteet.mjs`
vartio 7a olettaa maalta fokuslehden rajauksen (`lehdenRajaus`), ja
kaikilla viidellä maalla se on olemassa (`js/packs/fokus-grc.js`
FOKUS_POHJAT) — vartiota ei siis tarvinnut koskea, vaan jokainen uusi
rivi mitattiin sen sisään ennen kirjoittamista. Savuke menee läpi 8/8.
`tests/elaintakyt.test.mjs` ja `tests/skandaalit.test.mjs` lukumäärät
päivitettiin (eläintäkyjä 61 → 65, skandaaleja 123 → 133 ja maita
49 → 54).

**Kuvaputkelle jää neljä eläintäkykuvaa.** CYP, OMN, ARE ja KWT saivat
`kuva`-kenttään kuvaputken tunnuksen ilman kansiota (`elain-cyp`,
`elain-omn`, `elain-are`, `elain-kwt`), joka osoittaa ämpäriin: kun
kuvaputki tekee kuvan, se ilmestyy kortille ilman koodimuutosta, ja
siihen asti kortti on kuvaton.
erän lähin merkki on Bagdadin patteri 11,2 lautayksikön päässä
Bagdadista, seuraavat Pasargadai 13,9 yksikköä Persepoliksesta ja
Denderan horoskooppi 15,7 yksikköä Luxorista; raja
`KAUPUNGIN_KOHDALLA_SADE` on 7. `node tools/tarkista-nostopaikat.mjs`
antaa kaikille 42:lle rivin *pääkartta*, ja
`node tools/tarkista-nimiolimitys.mjs` sanoo yhä "NIMIÖ NIMIÖN PÄÄLLÄ: 0".

**Kaupunkisääntö karsi eniten juuri tässä erässä.** Lähi-idän
pelikaupungit istuvat suoraan kuuluisimpien kohteiden päällä, joten
pois jäivät Persepolis (oma pelikaupunkinsa), Naqsh-e Rostam,
Diriyahin At-Turaif (5 yksikköä Riadista), Saqqara ja Dahshur (6–9
yksikköä Kairosta), Pyhän Katariinan luostari (käytännössä
Siinai-laatan päällä), Niniven Kuyunjik ja Deir el-Bahari (Luxorin
päällä). Nimiölimitys karsi lisäksi Al-Ulan vanhankaupungin (Hegran
vieressä), Ajlounin linnan (5,4 yksikköä Jerashista) ja Qusayr Amran
(8,3 yksikköä Azraqista). Kaksi kohdepaikkaa annettiin skandaalille:
Tayman keidas ja Nimrud kantavat nyt kortin "Tayman kivi" ja "Rassamin
oikeusjuttu", koska kaksi nimiötä samassa pisteessä olisi limitys.

**Herkkien aiheiden linjaus pidettiin** (`docs/aasia-tyoaineisto/
spec-asia.md`, SITOVA, sekä M3:n Myanmar-linja). Yksikään kortti ei
koske nykypolitiikkaan eikä käynnissä olevaan konfliktiin: Irakin
kohteet ovat muinaishistoriaa, ja Hatran vaurioista 2015 kerrotaan
yhdellä toteavalla virkkeellä lähteen sanamuodossa (veistoksia
tuhottiin, muurit ja tornit ovat yhä pystyssä). Nimrudia ei kirjoitettu
kohteeksi lainkaan. Kymmenestä skandaalista kahdeksan on vuosilta
1820–1902, ja kaksi 1900-luvun tapausta ovat Bagdadin patterin
tiedehuhu (1936–1938) ja Azraqin kosteikon kuivuminen (1960–1992),
joista jälkimmäinen on vesitalouden ympäristötapaus.

**Eläintäkyjen paikat on mitattu koneellisesti.** Jokainen piste on maan
rajojen sisällä, maalla ja vähintään 35 lautayksikön päässä jokaisesta
kaupunkimerkistä (`tests/elaintakyt.test.mjs`): Iranin onageri 140,8
yksikköä Teheranista, Irakin ruokokerttunen 71,6 Kuwaitista, Egyptin
mangusti 44,1 Kairosta ja Jordanian kauris 40,5 Petrasta. Jordania oli
erän tiukin tapaus — koko maa on niin kapea, että vain Mujibin ylänkö
Kuolleenmeren itäpuolella ylitti rajan. Egyptin eläimeksi ei voitu
ottaa fennekkiä (Algerian täky) eikä nubiantorvikaurista (Jordanian
täky), joten valinta on egyptinmangusti, joka on samalla muinaisen
Egyptin muumioitu ja jumalatar Mafdetiin liitetty eläin.

**Kuvat puuttuvat kaikilta neljältä eläintäyltä.** `kuva`-kentässä on
kuvaputken ämpäritunnus ilman kansiota (`elain-irn`, `elain-jor`,
`elain-irq`, `elain-egy`): kun kuvaputki toimittaa kuvan, se ilmestyy
kortille ilman koodimuutosta, ja siihen asti kortti on kuvaton.

## Erä M11 (tehty 6.9.2026)

Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
Afrikan toinen erä: **ETH, KEN, TZA, UGA ja MAR**. Kaikilla viidellä oli
ennen erää kolme maastokohdetta ja eläintäky mutta nolla kohdetta ja
nolla skandaalia, joten työ oli puhdasta kohde- ja skandaalityötä: 8
kohdetta ja 2 skandaalia kuhunkin maahan, yhteensä 50 uutta
karttamerkkiä. Erä on kuvaton kuten K2-erät 1–4 ja maailman erät M1–M8,
ja jokainen väite on en-Wikipedian raakatekstin katteessa lähderivillä,
joka nimeää artikkelin ja osan sekä tarkistuspäivän 6.9.2026.
`node tools/laske-karttanostot.mjs` sanoo erän jälkeen kaikista
viidestä *täysi*; taulukot ajaa Fable.

Kohteet asuvat maiden omissa `js/packs/maastokohteet-<iso>.js`
-tiedostoissa (kaikilla viidellä oli tiedosto jo olemassa, joten uusia
rekisteröintejä `maastokohteet.js`-hakemistoon, `sw.js`:ään tai
`tools/build-standalone.mjs`:ään ei tarvittu). Skandaalit ovat
`js/packs/skandaalit.js`:n lopussa, ja `tests/skandaalit.test.mjs`:n
lukumäärät päivitettiin (skandaaleja 143 → 153 ja maita 59 → 64).
Eläintäkyihin ei koskettu: ne olivat jo kaikilla viidellä maalla.

| maa | kohteet | maastokohteet | eläintäky | skandaalit |
|---|---|---|---|---|
| Etiopia (ETH) | Aksum, Fasil Ghebbi, Harar, Tiya, Debre Damo, Danakilin syvänne, Hadar, Balen kansallispuisto | (oli jo: Ras Dejen, Tanajärvi, Sininen-Niili) | (oli jo: gelada) | Magdalan ryöstö 1868, Wuchalen artikla 17 (1889) |
| Kenia (KEN) | Lamu, Fort Jesus, Gedin rauniot, Thimlich Ohinga, Koobi Fora, Hell's Gate, Amboseli, Lewa | (oli jo: Mount Kenya, Victorianjärvi, Intian valtameri) | (oli jo: kirahvinvasa) | Happy Valley 1920–1941, Tsavon ihmissyöjät 1898 |
| Tansania (TZA) | Olduvain rotko, Serengeti, Kondoan kalliotaide, Kilwa Kisiwani, Bagamoyo, Ujiji, Tabora, Kalambon putoukset | (oli jo: Kilimandžaro, Intian valtameri, Tanganjikajärvi) | (oli jo: norsunvasa) | Maji Maji 1905–1907, maapähkinähanke 1946–1951 |
| Uganda (UGA) | Kasubin haudat, Murchisonin putoukset, Queen Elizabethin puisto, Kibalen kansallispuisto, Nyeron kalliomaalaukset, Kidepon laakso, Fort Patiko, Jinja | (oli jo: Mount Stanley, Victorianjärvi, Niili) | (oli jo: gorillanpoikanen) | Kabakan karkotus 1953–1955, kadonneet kreivikunnat 1894–1964 |
| Marokko (MAR) | Volubilis, Aït Benhaddou, Essaouira, Chefchaouen, Hassan-torni, Erg Chebbi, El Jadida, Lixus | (oli jo: Toubkal, Atlantti, Drâa) | (oli jo: berberiapina) | Agadirin kriisi 1911, Annualin katastrofi 1921 |

**Yksikään ei ole pelikaupungin kohdalla.** Etäisyys mitattiin jokaiseen
`js/packs/maailmankartta.js` CITIES-kaupunkiin, ja jokaisen kohteen
lähin on kirjattu sen koordinaattirivin viereen. Koko erän lähin merkki
on Volubilis 19,2 lautayksikön päässä Fèsistä ja toiseksi lähin Tiya
20,6 yksikön päässä Addis Abebasta; raja `KAUPUNGIN_KOHDALLA_SADE` on 7.
`node tools/tarkista-nostopaikat.mjs` antaa kaikille 50:lle rivin
*pääkartta*, ja `node tools/tarkista-nimiolimitys.mjs` sanoo yhä
"NIMIÖ NIMIÖN PÄÄLLÄ: 0".

**Neljä rajausta, jotka valitsivat sisällön.** (1) M3:n Myanmar-linja:
artikkeleita, joiden nykytila on selkkaus, ei kirjoitettu. Etiopian
**Konso** oli erän ainoa kokonaan hylätty ehdokas — sen artikkelissa on
oma osio "Conflict since 1990", joka kertoo yhä käynnissä olevasta
väkivallasta — ja sen tilalle tuli Balen vuorten kansallispuisto.
Samasta linjasta Lamun kortti kertoo vain kaupungin historian eikä
artikkelin nykypäivän turvallisuustilannetta. (2) Merkkien
päällekkäisyys karsi kolme muuten hyvää ehdokasta: **Ngorongoro** osuisi
kahdeksan lautayksikön päähän Olduvain rotkosta (kraatteri mainitaan
Olduvain kortissa), **Meknès** on 6,6 yksikön päässä Volubiliksesta
(kaupunki mainitaan Volubiliksen kortissa) ja Ugandan **Bwindi** on
täsmälleen samassa pisteessä kuin maan eläintäky, gorillanpoikanen.
Samasta syystä myös kaksi skandaalia vaihtui: **Aksumin obeliski**
(Rooma 1937–2005) olisi tullut saman erän Aksum-kohteen päälle, joten
obeliskin tarina kerrotaan Aksumin kortissa ja Etiopian skandaaleiksi
tulivat Magdala ja Wuchale, ja **Entebbe 1976** olisi ollut samassa
pisteessä kuin kabakan karkotus, jonka neuvottelut käytiin Entebben
Government Housessa. (3) Tyyppi kertoo, mitä merkki näyttää: Danakilin
syvänne ja Erg Chebbi ovat `muu` eivätkä maastoa, koska maastokiintiö
oli jo täynnä, ja Kalambon putoukset on `historia`, koska kortti kertoo
maailman vanhimmasta tunnetusta puurakennelmasta eikä vesiputouksesta.
(4) Lähdeaineiston ohuus: Fort Patikon ja Kasubin hautojen koordinaatit
eivät ole en-Wikipedian `coordinates`-propissa vaan artikkelin omassa
infolaatikossa, ja ne on luettu sieltä; Bigo bya Mugenyi ja Sof Omar
jäivät pois, koska koordinaattia ei ollut kummassakaan.

**Herkät aiheet on kirjoitettu lähteen katteessa ja ilman
nykypolitiikkaa.** Maji Majin uhriluvut (75 000–300 000), Tsavon
uhriluvut (Pattersonin 135, päiväkirjan 28–31 ja isotooppitutkimuksen
10,5 + 24,2) ja Annualin tappiot ovat artikkelien omia lukuja.
Siirtomaahistorian pakkosiirrot mainitaan toteavasti siellä missä lähde
ne mainitsee (Kidepon ik ja ketebo, Queen Elizabethin songora), eikä
yhdenkään kortin aihe ole käynnissä oleva selkkaus.

## Erä M10 (tehty 6.9.2026)

Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
Aasian kolmas erä: **JPN, KOR, TWN, KAZ, MNG**. Kaikilla viidellä oli
ennen erää maastokohteita mutta ei yhtäkään kohdetta (Mongolialla yksi,
Gobi, tyyppi `muu`), ja Japania lukuun ottamatta ei eläintäkyä eikä
skandaalia. Erä on kuvaton kuten K2-erät 1–4 ja maailman erät M1–M8, ja
jokainen väite on en-Wikipedian raakatekstin katteessa lähderivillä,
joka nimeää artikkelin ja osan sekä tarkistuspäivän 6.9.2026. Taulukon
luvut ajetaan `node tools/laske-karttanostot.mjs --md` -työkalulla
erikseen.

Kohteet ja maastokohteet kirjoitettiin maiden omiin, jo olemassa
oleviin `js/packs/maastokohteet-<iso>.js`-tiedostoihin, joten uusia
rivejä `js/packs/maastokohteet.js`-hakemistoon, `sw.js`:n SHELL-listaan
tai `tools/build-standalone.mjs`:n MODULES-listaan ei tarvittu.
Eläintäyt ovat `js/packs/elaintakyt.js`:n lopussa ja skandaalit
`js/packs/skandaalit.js`:n lopussa; kummankin testin lukumäärä
päivitettiin (eläintäkyjä 69 → 73, skandaaleja 143 → 153 ja maita
59 → 64).

| maa | kohteet | maastokohteet | eläintäky | skandaalit |
|---|---|---|---|---|
| Japani (JPN) | Himejin linna, Nikkō Tōshō-gū, Shirakawa-gō, Hiroshiman rauhanmuistomerkki, Hōryū-ji, Iwamin hopeakaivos, Kumano Kodō, Dejima | (oli jo: Fuji, Japaninmeri, Shinanojoki) | (oli jo) | Namamugi 1862, Minamatan tauti |
| Etelä-Korea (KOR) | Gyeongju, Haeinsa, Hwaseong, Hahoe, Gochangin dolmenit, Jeonjun hanokit, Baekjen alueet, Songgwangsa | (oli jo: Hallasan, Keltainenmeri, Nakdong) | korean vesihirvi | Oegyujanggak 1866, Port Hamilton 1885–1887 |
| Taiwan (TWN) | Taroko, Santo Domingo, Jiufen, Lukang, Chaotian, Fort Zeelandia, Wushantou, Sanxiantai | Penghu (saari) | formosanmustakarhu | Roverin haaksirikko 1867, Lanyun ydinjätevarasto 1982 |
| Kazakstan (KAZ) | Yasawin mausoleumi, Tamgaly, Baikonur, Charynin kanjoni, Altyn-Emel, Issykin kurgaani, Aisha Bibi, Saryarka | (oli jo: Khan Tengri, Araljärvi, Irtyš) | saiga | Semipalatinskin koealue, Aralin kalasatama |
| Mongolia (MNG) | Amarbayasgalant, Bayanzag, Hustain nuruu, Peurakivet, Tövhön, Tsagaan agui, Tšingisin patsas (+ Gobi oli jo) | Hövsgöl (järvi) | przewalskinhevonen | Ongiin luostari 1939, Tarbosaurus-huutokauppa 2012 |

Kaikki viisi maata ovat erän jälkeen tavoitteessa: `node
tools/laske-karttanostot.mjs` sanoo niistä "täysi". Uusia karttamerkkejä
tuli 51 (39 kohdetta, 2 maastokohdetta, 4 eläintäkyä, 10 skandaalia).

**Yksikään uusi merkki ei ole pelikaupungin kohdalla.** Etäisyys
mitattiin jokaiseen `js/packs/maailmankartta.js` CITIES-kaupunkiin.
Lähin uusi merkki on Taiwanin Taroko 12,6 lautayksikön päässä
Taipei-laatasta ja toiseksi lähin Korean Hwaseongin linnoitus 12,6
yksikön päässä Soulista; raja `KAUPUNGIN_KOHDALLA_SADE` on 7. Kaksi
ehdokasta kaatui juuri tähän: Korean **Namhansanseong** (7,6 yksikköä
Soulista) ja Taiwanin **Sun Moon Lake** (6,0 yksikköä Taipeista).
`node tools/tarkista-nimiolimitys.mjs` sanoo koko maailmasta yhä
"NIMIÖ NIMIÖN PÄÄLLÄ: 0", ja `tools/tarkista-nostopaikat.mjs` antaa
jokaiselle uudelle nostolle rivin *pääkartta*.

**Nimiölimitys valitsi neljä kohdetta uudelleen.** Japanin
Itsukushiman pyhäkkö on 6,6 yksikön päässä Hiroshiman
rauhanmuistomerkistä, Taiwanin Alishan 5,4 yksikön päässä maan omasta
Yu Shan -merkistä, Kazakstanin Otrar 18,0 yksikön päässä Turkistanin
mausoleumista ja Korean Jejun Seongsan Ilchulbong 14,2 yksikön päässä
Hallasanista. Painavin tapaus on Mongolian **Karakorum**: maan oma
Orhon-merkki on Harhorinin kohdalla, ja Karakorumin nimiö osuisi 6,9
yksikön päähän siitä — sekä muinainen pääkaupunki että Erdene Zuun
luostari jäivät siksi pois, ja Orhonin laakson kohteista mukaan mahtui
Tövhön (21,8 yksikköä joen merkistä).

**Aasian linjaukset pidettiin** (`docs/aasia-tyoaineisto/spec-asia.md`,
SITOVA). Taiwanin korteissa ei ole salmikysymystä eikä nykypolitiikkaa:
painotus on 1600–1900-luvun Formosassa, kaupassa, kansoissa ja
tekniikassa, ja **Kinmen jätettiin pois kokonaan**, koska sen artikkeli
lepää nykyisen kiistan varassa. Japanin sotahistoriasta kirjoitettiin
vain Hiroshiman rauhanmuistomerkin kortissa: se kertoo rakennuksen
historian ja muistomerkin nykyisen tehtävän lähteen katteessa, ilman
uhrilukujen korostusta. Japanin skandaalit ovat ympäristö- ja
diplomatiahistoriaa (1862 ja 1932–1968), Korean 1800-luvun
siirtomaadiplomatiaa (1866 ja 1885–1887) ja Mongolian 1930-luvun
uskonnonvainot sekä fossiilien salakuljetus. Kazakstanin ydinkoealue ja
Araljärven kuivuminen kerrotaan artikkelien omalla tarkkuudella.

**Neljä eläintäkyä, kaikki kuvattomia.** `kuva`-kentässä on
kuvaputken ämpäritunnus ilman kansiota (`elain-kor`, `elain-twn`,
`elain-kaz`, `elain-mng`): kun kuvaputki toimittaa kuvan, se ilmestyy
kortille ilman koodimuutosta. Paikat on mitattu koneellisesti — jokainen
piste on maan rajojen sisällä, maalla ja vähintään 35 lautayksikön
päässä jokaisesta kaupunkimerkistä (`tests/elaintakyt.test.mjs`).
Tiukin oli Taiwan: Taipei-laatta on laudalla keskellä saarta, joten
formosanmustakarhun piste oli haettava saaren eteläosan vuoristosta
(etäisyys 49,7).
