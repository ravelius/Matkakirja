# Karttanostojen kattavuus maittain

Päivitetty: 2.9.2026 (Fable, runko; K2-erän inventaario ja erä 1 täyttivät
taulukon).
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

## Kattavuus 2.9.2026 (erän 1 jälkeen)

| maa | kohteet | maastokohteet | eläintäky | skandaalit | hetket | kulttuurinostot | pääkartalla | kohdekartalla | tila |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Itävalta (AUT) | 0 | 4 | 1 | 3 | 0 | 5 | 9 | 3 | kohteita −8 |
| Bulgaria (BGR) | 12 | 6 | 1 | 3 | 0 | 5 | 18 | 7 | täysi |
| Bosnia ja Hertsegovina (BIH) | 9 | 5 | 1 | 2 | 0 | 4 | 18 | 2 | täysi |
| Sveitsi (CHE) | 8 | 5 | 1 | 3 | 0 | 0 | 16 | 0 | täysi |
| Tšekki (CZE) | 8 | 3 | 1 | 3 | 0 | 4 | 14 | 4 | täysi |
| Saksa (DEU) | 8 | 13 | 1 | 3 | 0 | 6 | 25 | 5 | täysi |
| Tanska (DNK) | 0 | 3 | 1 | 3 | 1 | 4 | 7 | 4 | kohteita −8 |
| Espanja (ESP) | 0 | 5 | 1 | 3 | 3 | 15 | 16 | 10 | kohteita −8 |
| Viro (EST) | 8 | 3 | 1 | 3 | 0 | 4 | 13 | 5 | täysi |
| Suomi (FIN) | 0 | 4 | 1 | 3 | 0 | 7 | 6 | 8 | kohteita −8 |
| Ranska (FRA) | 2 | 6 | 1 | 3 | 0 | 9 | 9 | 11 | kohteita −6 |
| Britannia (GBR) | 3 | 5 | 1 | 3 | 2 | 7 | 13 | 7 | kohteita −5 |
| Kreikka (GRC) | 20 | 15 | 1 | 3 | 0 | 4 | 33 | 9 | täysi |
| Kroatia (HRV) | 8 | 11 | 1 | 3 | 0 | 3 | 23 | 2 | täysi |
| Unkari (HUN) | 11 | 6 | 1 | 3 | 0 | 3 | 20 | 3 | täysi |
| Irlanti (IRL) | 0 | 3 | 1 | 3 | 0 | 6 | 9 | 3 | kohteita −8 |
| Islanti (ISL) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Italia (ITA) | 10 | 9 | 1 | 3 | 0 | 10 | 20 | 12 | täysi |
| Liettua (LTU) | 0 | 3 | 1 | 3 | 0 | 6 | 9 | 3 | kohteita −8 |
| Latvia (LVA) | 8 | 3 | 1 | 2 | 0 | 5 | 16 | 2 | täysi |
| Alankomaat (NLD) | 0 | 3 | 1 | 3 | 0 | 7 | 10 | 3 | kohteita −8 |
| Norja (NOR) | 0 | 4 | 1 | 3 | 2 | 8 | 13 | 3 | kohteita −8 |
| Puola (POL) | 0 | 5 | 1 | 3 | 0 | 9 | 12 | 5 | kohteita −8 |
| Portugali (PRT) | 0 | 4 | 1 | 3 | 1 | 7 | 11 | 4 | kohteita −8 |
| Romania (ROU) | 12 | 4 | 1 | 2 | 0 | 4 | 19 | 3 | täysi |
| Venäjä (RUS) | 0 | 8 | 1 | 3 | 0 | 9 | 14 | 6 | kohteita −8 |
| Ruotsi (SWE) | 0 | 4 | 1 | 3 | 0 | 4 | 6 | 5 | kohteita −8 |
| Turkki (TUR) | 22 | 6 | 1 | 3 | 0 | 3 | 28 | 6 | täysi |
| Ukraina (UKR) | 0 | 5 | 1 | 3 | 0 | 9 | 13 | 4 | kohteita −8 |

Maita 29, tavoitteessa 14, vajaita 15.

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
- **Erä 2 (ehdotus)** — DNK 11, SWE 11, AUT 12, IRL 12, LTU 12
  karttamerkkiä. Kaikilla nolla kohdetta ja pienin merkkimäärä
  jäljellä olevista; maasto, eläintäky ja skandaalit ovat niissä jo
  tavoitteessa, joten työ on puhdasta kohdetyötä samalla mallilla.
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

**Tilanne yhdellä silmäyksellä.** 112 maasta **14 on tavoitteessa** ja
98 vajaita; **32 maalla ei ole yhtäkään karttamerkkiä**. Kaikki
tavoitteessa olevat ovat Euroopassa. Kohdetavoitteesta (8) jää vajaaksi
98 maata, maastotavoitteesta (3) 44 maata, eläintäky puuttuu 59 maasta
ja skandaalitavoite (2) jää täyttymättä 83 maassa — skandaaleja ei ole
kirjoitettu Euroopan ulkopuolelle yhteenkään maahan.

### Eurooppa (29 maata)

| maa | kohteet | maastokohteet | eläintäky | skandaalit | hetket | kulttuurinostot | pääkartalla | kohdekartalla | tila |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Tanska (DNK) | 0 | 3 | 1 | 3 | 1 | 4 | 7 | 4 | kohteita −8 |
| Ruotsi (SWE) | 0 | 4 | 1 | 3 | 0 | 4 | 6 | 5 | kohteita −8 |
| Itävalta (AUT) | 0 | 4 | 1 | 3 | 2 | 5 | 9 | 3 | kohteita −8 |
| Irlanti (IRL) | 0 | 3 | 1 | 3 | 0 | 6 | 9 | 3 | kohteita −8 |
| Liettua (LTU) | 0 | 3 | 1 | 3 | 0 | 6 | 9 | 3 | kohteita −8 |
| Islanti (ISL) | 8 | 3 | 1 | 2 | 0 | 0 | 13 | 0 | täysi |
| Alankomaat (NLD) | 0 | 3 | 1 | 3 | 0 | 7 | 10 | 3 | kohteita −8 |
| Suomi (FIN) | 0 | 4 | 1 | 3 | 1 | 7 | 6 | 8 | kohteita −8 |
| Norja (NOR) | 0 | 4 | 1 | 3 | 2 | 8 | 12 | 3 | kohteita −8 |
| Portugali (PRT) | 0 | 4 | 1 | 3 | 2 | 7 | 11 | 4 | kohteita −8 |
| Sveitsi (CHE) | 8 | 5 | 1 | 3 | 1 | 0 | 17 | 0 | täysi |
| Puola (POL) | 0 | 5 | 1 | 3 | 0 | 9 | 12 | 5 | kohteita −8 |
| Ukraina (UKR) | 0 | 5 | 1 | 3 | 0 | 9 | 13 | 4 | kohteita −8 |
| Tšekki (CZE) | 8 | 3 | 1 | 3 | 0 | 4 | 14 | 4 | täysi |
| Viro (EST) | 8 | 3 | 1 | 3 | 0 | 4 | 13 | 5 | täysi |
| Latvia (LVA) | 8 | 3 | 1 | 2 | 0 | 5 | 16 | 2 | täysi |
| Bosnia ja Hertsegovina (BIH) | 9 | 5 | 1 | 2 | 0 | 4 | 18 | 2 | täysi |
| Ranska (FRA) | 2 | 6 | 1 | 3 | 6 | 9 | 9 | 11 | kohteita −6 |
| Venäjä (RUS) | 0 | 8 | 1 | 3 | 2 | 9 | 14 | 6 | kohteita −8 |
| Iso-Britannia (GBR) | 3 | 5 | 1 | 3 | 9 | 7 | 15 | 7 | kohteita −5 |
| Romania (ROU) | 12 | 4 | 1 | 2 | 0 | 4 | 19 | 3 | täysi |
| Unkari (HUN) | 11 | 6 | 1 | 3 | 0 | 3 | 20 | 3 | täysi |
| Bulgaria (BGR) | 12 | 6 | 1 | 3 | 0 | 5 | 18 | 7 | täysi |
| Kroatia (HRV) | 8 | 11 | 1 | 3 | 0 | 3 | 23 | 2 | täysi |
| Espanja (ESP) | 0 | 5 | 1 | 3 | 4 | 15 | 17 | 10 | kohteita −8 |
| Saksa (DEU) | 8 | 13 | 1 | 3 | 4 | 6 | 28 | 5 | täysi |
| Italia (ITA) | 10 | 9 | 1 | 3 | 3 | 10 | 22 | 12 | täysi |
| Turkki (TUR) | 22 | 6 | 1 | 3 | 2 | 3 | 29 | 6 | täysi |
| Kreikka (GRC) | 20 | 15 | 1 | 3 | 1 | 4 | 33 | 9 | täysi |

### Lähi-itä (12 maata)

| maa | kohteet | maastokohteet | eläintäky | skandaalit | hetket | kulttuurinostot | pääkartalla | kohdekartalla | tila |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Kypros (CYP) | 0 | 2 | 0 | 0 | 0 | 0 | 2 | 0 | kohteita −8, maastoa −1, eläintäky puuttuu, skandaaleja −2 |
| Oman (OMN) | 0 | 2 | 0 | 0 | 0 | 0 | 2 | 0 | kohteita −8, maastoa −1, eläintäky puuttuu, skandaaleja −2 |
| Qatar (QAT) | 0 | 2 | 0 | 0 | 0 | 0 | 2 | 0 | kohteita −8, maastoa −1, eläintäky puuttuu, skandaaleja −2 |
| Arabiemiirikunnat (ARE) | 1 | 2 | 0 | 0 | 0 | 0 | 3 | 0 | kohteita −7, maastoa −1, eläintäky puuttuu, skandaaleja −2 |
| Kuwait (KWT) | 0 | 3 | 0 | 0 | 0 | 0 | 3 | 0 | kohteita −8, eläintäky puuttuu, skandaaleja −2 |
| Saudi-Arabia (SAU) | 1 | 2 | 1 | 0 | 0 | 0 | 3 | 0 | kohteita −7, maastoa −1, skandaaleja −2 |
| Jemen (YEM) | 0 | 3 | 0 | 0 | 0 | 0 | 3 | 0 | kohteita −8, eläintäky puuttuu, skandaaleja −2 |
| Iran (IRN) | 1 | 3 | 0 | 0 | 0 | 0 | 3 | 1 | kohteita −7, eläintäky puuttuu, skandaaleja −2 |
| Jordania (JOR) | 1 | 3 | 0 | 0 | 0 | 0 | 3 | 1 | kohteita −7, eläintäky puuttuu, skandaaleja −2 |
| Syyria (SYR) | 1 | 3 | 0 | 0 | 0 | 0 | 4 | 0 | kohteita −7, eläintäky puuttuu, skandaaleja −2 |
| Irak (IRQ) | 3 | 3 | 0 | 0 | 0 | 0 | 5 | 1 | kohteita −5, eläintäky puuttuu, skandaaleja −2 |
| Egypti (EGY) | 4 | 3 | 0 | 0 | 3 | 0 | 9 | 1 | kohteita −4, eläintäky puuttuu, skandaaleja −2 |

### Aasia (19 maata)

| maa | kohteet | maastokohteet | eläintäky | skandaalit | hetket | kulttuurinostot | pääkartalla | kohdekartalla | tila |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Hongkong (HKG) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, eläintäky puuttuu, skandaaleja −2 |
| Indonesia (IDN) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, eläintäky puuttuu, skandaaleja −2 |
| Intia (IND) | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, skandaaleja −2 |
| Sri Lanka (LKA) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, eläintäky puuttuu, skandaaleja −2 |
| Myanmar (MMR) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, eläintäky puuttuu, skandaaleja −2 |
| Nepal (NPL) | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, skandaaleja −2 |
| Singapore (SGP) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, eläintäky puuttuu, skandaaleja −2 |
| Thaimaa (THA) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, eläintäky puuttuu, skandaaleja −2 |
| Vietnam (VNM) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, eläintäky puuttuu, skandaaleja −2 |
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

### Afrikka (27 maata)

| maa | kohteet | maastokohteet | eläintäky | skandaalit | hetket | kulttuurinostot | pääkartalla | kohdekartalla | tila |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Saint Helena (SHN) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, eläintäky puuttuu, skandaaleja −2 |
| Etelä-Sudan (SDS) | 0 | 2 | 0 | 0 | 0 | 0 | 2 | 0 | kohteita −8, maastoa −1, eläintäky puuttuu, skandaaleja −2 |
| Angola (AGO) | 0 | 3 | 0 | 0 | 0 | 0 | 3 | 0 | kohteita −8, eläintäky puuttuu, skandaaleja −2 |
| Kamerun (CMR) | 0 | 3 | 0 | 0 | 0 | 0 | 3 | 0 | kohteita −8, eläintäky puuttuu, skandaaleja −2 |
| Kongo (COD) | 0 | 3 | 0 | 0 | 0 | 0 | 3 | 0 | kohteita −8, eläintäky puuttuu, skandaaleja −2 |
| Algeria (DZA) | 0 | 3 | 0 | 0 | 0 | 0 | 3 | 0 | kohteita −8, eläintäky puuttuu, skandaaleja −2 |
| Etiopia (ETH) | 0 | 3 | 1 | 0 | 0 | 0 | 3 | 0 | kohteita −8, skandaaleja −2 |
| Ghana (GHA) | 0 | 3 | 0 | 0 | 0 | 0 | 3 | 0 | kohteita −8, eläintäky puuttuu, skandaaleja −2 |
| Kenia (KEN) | 0 | 3 | 1 | 0 | 0 | 0 | 3 | 0 | kohteita −8, skandaaleja −2 |
| Liberia (LBR) | 0 | 3 | 0 | 0 | 0 | 0 | 3 | 0 | kohteita −8, eläintäky puuttuu, skandaaleja −2 |
| Marokko (MAR) | 0 | 3 | 1 | 0 | 0 | 0 | 3 | 0 | kohteita −8, skandaaleja −2 |
| Madagaskar (MDG) | 0 | 3 | 1 | 0 | 0 | 0 | 3 | 0 | kohteita −8, skandaaleja −2 |
| Mali (MLI) | 0 | 3 | 0 | 0 | 0 | 0 | 3 | 0 | kohteita −8, eläintäky puuttuu, skandaaleja −2 |
| Mosambik (MOZ) | 0 | 3 | 0 | 0 | 0 | 0 | 3 | 0 | kohteita −8, eläintäky puuttuu, skandaaleja −2 |
| Namibia (NAM) | 0 | 3 | 1 | 0 | 0 | 0 | 3 | 0 | kohteita −8, skandaaleja −2 |
| Sudan (SDN) | 0 | 3 | 0 | 0 | 0 | 0 | 3 | 0 | kohteita −8, eläintäky puuttuu, skandaaleja −2 |
| Senegal (SEN) | 0 | 3 | 0 | 0 | 0 | 0 | 3 | 0 | kohteita −8, eläintäky puuttuu, skandaaleja −2 |
| Sierra Leone (SLE) | 0 | 3 | 0 | 0 | 0 | 0 | 3 | 0 | kohteita −8, eläintäky puuttuu, skandaaleja −2 |
| Tšad (TCD) | 0 | 3 | 0 | 0 | 0 | 0 | 3 | 0 | kohteita −8, eläintäky puuttuu, skandaaleja −2 |
| Tansania (TZA) | 0 | 3 | 1 | 0 | 0 | 0 | 3 | 0 | kohteita −8, skandaaleja −2 |
| Uganda (UGA) | 0 | 3 | 1 | 0 | 0 | 0 | 3 | 0 | kohteita −8, skandaaleja −2 |
| Libya (LBY) | 1 | 3 | 0 | 0 | 0 | 0 | 4 | 0 | kohteita −7, eläintäky puuttuu, skandaaleja −2 |
| Nigeria (NGA) | 0 | 4 | 0 | 0 | 0 | 0 | 4 | 0 | kohteita −8, eläintäky puuttuu, skandaaleja −2 |
| Somalia (SOM) | 0 | 4 | 0 | 0 | 0 | 0 | 4 | 0 | kohteita −8, eläintäky puuttuu, skandaaleja −2 |
| Tunisia (TUN) | 1 | 3 | 0 | 0 | 0 | 0 | 4 | 0 | kohteita −7, eläintäky puuttuu, skandaaleja −2 |
| Etelä-Afrikka (ZAF) | 0 | 4 | 1 | 0 | 0 | 0 | 4 | 0 | kohteita −8, skandaaleja −2 |
| Zimbabwe (ZWE) | 1 | 3 | 0 | 0 | 0 | 0 | 4 | 0 | kohteita −7, eläintäky puuttuu, skandaaleja −2 |

### Pohjois-Amerikka (7 maata)

| maa | kohteet | maastokohteet | eläintäky | skandaalit | hetket | kulttuurinostot | pääkartalla | kohdekartalla | tila |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Kanada (CAN) | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, skandaaleja −2 |
| Kuuba (CUB) | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, skandaaleja −2 |
| Grönlanti (GRL) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, eläintäky puuttuu, skandaaleja −2 |
| Guatemala (GTM) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, eläintäky puuttuu, skandaaleja −2 |
| Nicaragua (NIC) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, eläintäky puuttuu, skandaaleja −2 |
| Meksiko (MEX) | 1 | 0 | 1 | 0 | 0 | 0 | 1 | 0 | kohteita −7, maastoa −3, skandaaleja −2 |
| Yhdysvallat (USA) | 0 | 0 | 1 | 0 | 4 | 0 | 3 | 0 | kohteita −8, maastoa −3, skandaaleja −2 |

### Etelä-Amerikka (11 maata)

| maa | kohteet | maastokohteet | eläintäky | skandaalit | hetket | kulttuurinostot | pääkartalla | kohdekartalla | tila |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Argentiina (ARG) | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, skandaaleja −2 |
| Bolivia (BOL) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, eläintäky puuttuu, skandaaleja −2 |
| Brasilia (BRA) | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, skandaaleja −2 |
| Chile (CHL) | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, skandaaleja −2 |
| Kolumbia (COL) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, eläintäky puuttuu, skandaaleja −2 |
| Ecuador (ECU) | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | kohteita −8, maastoa −3, eläintäky puuttuu, skandaaleja −2 |
| Panama (PAN) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, eläintäky puuttuu, skandaaleja −2 |
| Paraguay (PRY) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, eläintäky puuttuu, skandaaleja −2 |
| Uruguay (URY) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, eläintäky puuttuu, skandaaleja −2 |
| Venezuela (VEN) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, eläintäky puuttuu, skandaaleja −2 |
| Peru (PER) | 0 | 0 | 1 | 0 | 1 | 0 | 1 | 0 | kohteita −8, maastoa −3, skandaaleja −2 |

### Oseania (7 maata)

| maa | kohteet | maastokohteet | eläintäky | skandaalit | hetket | kulttuurinostot | pääkartalla | kohdekartalla | tila |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Australia (AUS) | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, skandaaleja −2 |
| Fidži (FJI) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, eläintäky puuttuu, skandaaleja −2 |
| Uusi-Seelanti (NZL) | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, skandaaleja −2 |
| Papua-Uusi-Guinea (PNG) | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, skandaaleja −2 |
| Salomonsaaret (SLB) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, eläintäky puuttuu, skandaaleja −2 |
| Itä-Timor (TLS) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, eläintäky puuttuu, skandaaleja −2 |
| Vanuatu (VUT) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | kohteita −8, maastoa −3, eläintäky puuttuu, skandaaleja −2 |

Maita 112, tavoitteessa 14, vajaita 98.

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
| M1 | Etelä-Amerikka | Argentiina (ARG) 0, Bolivia (BOL) 0, Brasilia (BRA) 0, Chile (CHL) 0, Kolumbia (COL) 0 |
| M2 | Oseania | Australia (AUS) 0, Fidži (FJI) 0, Uusi-Seelanti (NZL) 0, Papua-Uusi-Guinea (PNG) 0, Salomonsaaret (SLB) 0 |
| M3 | Aasia | Hongkong (HKG) 0, Indonesia (IDN) 0, Intia (IND) 0, Sri Lanka (LKA) 0, Myanmar (MMR) 0 |
| M4 | Pohjois-Amerikka | Kanada (CAN) 0, Kuuba (CUB) 0, Grönlanti (GRL) 0, Guatemala (GTM) 0, Nicaragua (NIC) 0 |
| M5 | Afrikka | Saint Helena (SHN) 0, Etelä-Sudan (SDS) 2, Angola (AGO) 3, Kamerun (CMR) 3, Kongo (COD) 3 |
| M6 | Lähi-itä | Kypros (CYP) 2, Oman (OMN) 2, Qatar (QAT) 2, Arabiemiirikunnat (ARE) 3, Kuwait (KWT) 3 |
| M7 | Eurooppa | Tanska (DNK) 11, Ruotsi (SWE) 11, Itävalta (AUT) 12, Irlanti (IRL) 12, Liettua (LTU) 12 |

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
