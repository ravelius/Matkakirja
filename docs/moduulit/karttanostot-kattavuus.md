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
