# Opus 2 — tilanne kontekstin nollausta varten

Päivitetty 9.8.2026, main v434.

## Kuka ja miten

Olen **Opus 2**. Otan työt **Fablelta** ja raportoin vain Fablelle —
en koskaan suoraan omistajalle. Fablen sessio-id on
`session_01R1jVv12E56gbU5qtH5xGaG`; raportti menee perille
`create_trigger` + `fire_trigger` -parilla (`persistent_session_id`),
ja triggeri poistetaan heti laukaisun jälkeen.

Lane: **kartat ja lehtien koodi**. Tarina ja kaanon ovat Fablen, QA on
Sonnetin. Maantieteellinen fakta saa mennä introihin vapaasti, mutta
tarinamateriaali vain Fablen kautta.

## Mikä on valmista

- **Maakartat (MAAKARTAT): Eurooppa valmis**, 30 maata.
- **Kaupunkikartat (KAUPUNKIKARTAT): 31/31 valmis** (v433, PR #614).
  Tarkistettu ohjelmallisesti: yksikään lehti ei ole ilman karttaa
  eikä yksikään kartta ilman lehteä.

## TV-kielto (omistajan päätös, v434)

TV-napit on poistettu pelistä kokonaan, koska ne laukaisivat
tietoturvaluokittimen. **Älä lisää tv:tä missään muodossa** — ei
koodiin, ei tyyleihin, ei lokiin, ei työohjeisiin. Radio ja uutiset
jäävät. Omat tv-tutkimusjätteeni on poistettu hiekkalaatikosta.

Kolme sanaa jäi kartta- ja introaineistoon, ja ne ovat **rakennuksia
ja historiaa, eivät poistettua toimintoa**. Jätin ne koskematta ja
kysyin Fablelta erikseen:

- `js/packs/maakartat.js` — Berliinin kohde `Tv-torni`
  (wiki `Berliinin televisiotorni`), kaupungin tunnistettavin maamerkki
- `tools/piirra-kaupunkikartta.mjs` — sama torni Berliinin
  rajauskommentissa
- `js/packs/europe-artikkelit.js` — Liettuan intro kertoo tammikuun
  1991 televisiotornin puolustamisesta

Jos Fable haluaa nekin pois, se on pieni muutos — mutta älä tee sitä
oma-aloitteisesti.

## Työtapa, joka toimii — älä oikaise tästä

1. Tutkimus agentille (agentti **ei kirjoita repoon**, palauttaa vain
   raportin). Kokoan datan itse.
2. Piirrä kartta työkalulla `tools/piirra-kaupunkikartta.mjs`.
3. **Todenna jokainen piste** pelin omalla `karttapiste()`-funktiolla
   kuvan päälle piirrettynä. Työkalu:
   `scratchpad/tarkista-kaupunki.mjs` (luo uudestaan jos kadonnut —
   lataa PNG repossa olevasta polusta ja piirtää numerot päälle).
4. **Katso jokainen kuva silmin.** Numeroiden osuminen oikeaan
   rakennukseen näkyy vain katsomalla.
5. Tarkista jokainen fi-wikin otsikko rajapinnasta ja **lue
   ensimmäinen virke** — se paljastaa täsmennyssivut ja väärät kohteet.
6. `npm test` ennen julkaisua.

## Julkaisu

`git fetch origin main` **juuri ennen versionumeron valintaa** — Opus 1
julkaisee rinnakkain ja törmäyksiä tulee jatkuvasti. Sitten
`js/main.js` APP_VERSION, `sw.js` CACHE (samat numerot),
`js/muutokset.js` (uusin ensin, rivi ≤60 merkkiä),
`node tools/build-standalone.mjs`, squash-merge, ja haaran reset
mergattuun mainiin.

## Mitä seuraavaksi (ehdotus, Fable päättää)

**Isojen jokirelaatioiden täyttö työkaluun.** `kokoaKerrokset()`
täyttää vesirelaation vain jos sen ulkorengas on alle 0,3 ×
rajauslaatikon ala. Siksi Kiovan Dnepr, Pietarin Neva ja julkaistun
Budapestin Tonava piirtyvät paljaina rantaviivoina, joiden välissä on
paperia. Kiovassa se on selvä laatuvirhe. Korjaus hyödyttäisi kolmea
karttaa kerralla, ja se kuuluu työkaluun — ei rajauksiin, joita on jo
kokeiltu ja jotka menivät huonommiksi.

Toinen mahdollinen: **rakennusten piirto**. Ilman sitä kainalokartta
kohteesta, jonka ympärillä ei ole katuverkkoa, on tyhjä paperi
(Tallinnan laulukenttä, Kiovan Lavra, Suomenlinnan ensiyritys).

## Ansat, joita ei tarvitse oppia uudestaan

Kaikki on kirjattu koodikommentteihin sinne, missä ne laukeavat.
Tärkeimmät:

- **Kolme merentäyttötapaa:** ei lippua (rantanauha), `meri: true`
  (vesipuoli), `meri: 'maa'` (maapuoli, vain kun maata on veden
  molemmin puolin — Istanbul). Venetsiassa täyttö tuhosi koko kartan;
  siellä on nimenomainen kielto.
- **Rantaviiva ei saa poistua ja palata samalta reunalta** — siitä jää
  täyttämätön paperikiila (Odessa; korjattiin viemällä itäraja
  avomerelle).
- **Kartta renderöityy puhelimessa n. 360 CSS-pikselin levyisenä.**
  1600 px:n kuvaan leivottu teksti kutistuu 0,22-kertaiseksi — mitoita
  sen mukaan (kainalon suuntateksti on `W/35`, ei `W/80`).
- **`nimiVasen` on dokumentoitu muttei toteutettu.** Agentit ehdottavat
  sitä toistuvasti. Älä käytä.
- **Projektiot:** Venäjän maakartta on LAEA, Norja ja Suomi kartiollisia,
  Kroatia ja Bosnia Mercatoria. Nämä ovat mitattuja, älä "paranna".
