# Luovutus: Sisältökirjuri — 2026-09-22 ilta (konteksti 73 %)

Sessio nollataan kontekstin vuoksi Fablen pyynnöstä. Kohtaamiset-sarja
(erät C1–C7) on nyt VALMIS sisällöllisesti: kaikki 45 fokusvirta-
kaupunkia ja Kairo (vanha järjestelmä) ovat saaneet kohtaamisen. Kaikki
erät odottavat Julkaisijan mergeä.

## Prosessi lyhyesti (toistettavissa jatkossa samalla kaavalla)

Kuusi (tai C7:ssä kaksi) rinnakkaista Sonnet-agenttia per erä, yksi
kaupunki kerrallaan: agentti lukee `js/tyohuone-kehitys-data.js`
(KAARI_PAKETIT-ristiriita), `js/kohtaamiskuvat-data.js` ja
`docs/kuvatuotanto-kohtaamiset.md` (kuvaristiriita), tarkistaa
kaupungin oman fokusvirran/lehden jo kattamat aiheet, kirjoittaa
raportin `docs/raportit/kohtaamiset-c<N>-<kaupunki>-20260922.md`.
Sisältökirjuri kokoaa raportit yhdeksi `kohtaamiset-era-c<N>-
20260922.md`-tiedostoksi, lähettää Fablelle TARKASTUKSEEN ENNEN DATAA.
Fablen hyväksynnän jälkeen data kirjoitetaan `js/packs/kohtaamiset.js`:
ään omalle tuoreelle haaralle (`sisalto-kohtaamiset-c<N>`, aina
origin/mainista), testit `node --test`, kuvatilausraportti Codexille
(`kohtaamiset-kuvatilaus-c<N>-20260922.md`), ilmoitus Julkaisijalle.

## Erien tila (haarat ja committit)

Kaikki haarat `sisalto-kohtaamiset-c<N>` ovat origin/mainista tuoreena
haarautettuja — SAMA tiedosto (`js/packs/kohtaamiset.js`) muuttuu
jokaisessa, joten Julkaisija tarvitsee pienen konfliktiratkaisun joka
mergessä (molempien erien rivit säilytetään).

| Erä | Kaupungit | Haara | Data-commit | Tila |
| --- | --- | --- | --- | --- |
| C1 | Pariisi, Rooma, Wien, Helsinki, Istanbul, Amsterdam | (jo mainissa) | 81e643075 | **mergetty** |
| C2 | Ateena, Budapest, Firenze, Lissabon, Sofia, København | sisalto-kohtaamiset-c2 | 07aed5e72 | odottaa mergeä |
| C3 | Bukarest, Oslo, Tampere, Dublin, Granada, Pietari | sisalto-kohtaamiset-c3 | 49936b853 | odottaa mergeä |
| C4 | Tallinna, Vilna, Barcelona, Praha, Moskova, Ljubljana | sisalto-kohtaamiset-c4 | ed25483b9 | odottaa mergeä |
| C5 | Košice, Bergen, Edinburgh, Kraków, Warszawa, Sarajevo | sisalto-kohtaamiset-c5 | 38d82dec0 | odottaa mergeä |
| C6 | Sevilla, Bryssel, Marseille, Kiova, Luxemburg, Riika | sisalto-kohtaamiset-c6 | 2c5f17330 (+398d4d624 raporttikorjaus) | odottaa mergeä |
| C7 | Tromssa, Valletta (+ 6 kevyen pakin wiring-korjaus) | sisalto-kohtaamiset-c7 | 1a32dae8a | odottaa mergeä |

Kaikilla haaroilla testit olivat vihreällä paitsi kolme pre-existing,
tähän työhön liittymätöntä epäonnistumista `tools/arabia/
trim-narration.test.mjs`:ssä (vahvistettu puhtaalla origin/mainilla
stash-kokeella C3:ssa) — nämä toistuvat jokaisessa erässä samoina.

## C7:n erityistilanne (tärkeä konteksti seuraavalle sessiolle)

Fable siirsi kriteerin nostomäärästä ("41/48 kaupunkia") kattavuuteen:
tavoite = kohtaaminen JOKAISELLE Euroopan pelikaupungille jolla on
fokusvirta (`js/packs/fokusvirrat.js` FOKUSVIRRAT, 45 kaupunkia = 50
avainta miinus 5 aluepakettia: kreeta, sisilia, islanti, alpit, lappi).
Kun C1–C6 (36 kaupunkia) laski, jäljellä oli täsmälleen kaksi:
**Tromssa** ja **Valletta**. C7 on siis SARJAN VIIMEINEN erä — kaikki
45 fokusvirta-kaupunkia + Kairo (vanha järjestelmä, oli jo ennestään)
ovat nyt katettu.

Kaksi löydöstä matkan varrella, kirjattu tarkasti Fablen ja Sisältökirjurin
välillä (koko keskustelu tässä sessiossa, ei muualla):

1. **Kevyt fokusvirta ei estä kohtaamista.** Alun perin ajateltiin
   (Valletta C6:ssa), että `KEVYET_FOKUSVIRRAT`-joukon kaupungit
   (Tromssa, Bryssel, Ljubljana, Košice, Luxemburg, Valletta) eivät voi
   saada kohtaamista koska niillä ei ole täyttä kaupunkilehteä.
   Tarkistus osoitti: kohtaaminen kulkee KARTAN VIHREÄ PISTE →
   laattakysymys -polkua (`js/fokusvirta.js avaaFokusKohtaaminen`),
   EI vanhaa fokusvirtakortin kautta (se on pois päältä globaalisti,
   `FOKUSVIRTA_KORTIT === false`, 2.9.2026 lähtien). Fable vahvisti
   22.9.2026: kevyt pakki ei siis estä, ja Bryssel/Ljubljana/Košice/
   Luxemburg (jo C4–C6:ssa kirjoitetut) saavat pysyä, Valletta ja
   Tromssa kirjoitetaan C7:ssä normaaleina.
2. **Vihreä piste ei silti auennut oikeasti** — Laitetestaaja ajoi
   savukkeen Košicessa ja vahvisti: `js/packs/fokusvirta-<kaupunki>.js`
   -tiedostoista puuttuivat `kohtaaminen`- ja `kohtaamispiste`-kentät
   (täyden pakin malli, esim. `fokusvirta-tampere.js` tai
   `fokusvirta-riika.js`). Ilman niitä `avaaFokusKohtaaminen` palauttaa
   `false` eikä piste edes ilmesty kartalle. **Tämä on KORJATTU C7:ssä**
   kaikille kuudelle kevyelle kaupungille (Košice, Bryssel, Ljubljana,
   Luxemburg, Valletta, Tromssa) — kentät lisätty täyden pakin mallin
   mukaan, koordinaatit ovat kaupunkien omat laattapaikat
   (`js/packs/europe.js` ja `js/packs/maailmankartta.js`, sama
   perusteltu poikkeus kuin Tallinnassa/Riiassa: laattapaikka eikä
   raaka projektiopiste, koska raaka piste olisi liian kaukana laatasta
   PISTE_ERO_MIN-rajan ulkopuolella).

**Sivuvaikutus, myös korjattu:** `tests/liiku-nappi.test.mjs` vaati
aiemmin, ettei yhdelläkään kevyellä kohteella ole `kohtaamispistettä`
(regressiosuoja vanhaa v1855-umpikujabugia vastaan). Testi päivitetty:
todellinen suoja (Liiku-nappi ei riipu kohtaamispisteestä —
`liikuNappiNakyvissa`) on erillinen ja edelleen voimassa, kaikki 16
testiä vihreällä. Vain aluepaketeilla (kreeta/sisilia/islanti/alpit/
lappi) ei nyt ole kohtaamispistettä.

**EI VIELÄ TESTATTU PELISSÄ:** Laitetestaajan uusi savuke (Košice +
kolme muuta, Fablen pyyntö) EI ole vielä ajettu C7:n korjauksen
jälkeen — pyyntö lähetetty Laitetestaajalle mutta vastausta ei ehditty
saada ennen tätä luovutusta. **Seuraavan session pitäisi tarkistaa
Laitetestaajalta, ehtikö savuke valmistua, ja jos ei, pyytää se
uudelleen ennen kuin C7 mergetään.**

## Kuvatilausraportit Codexille

Kuusi raporttia, kaikki `docs/raportit/kohtaamiset-kuvatilaus-c<N>-
20260922.md` (C1–C7, yhteensä 40 uutta hahmoa, ei yhdelläkään ollut
käytettävissä olevaa kuvaa). Fable vie nämä postilaatikkoon Codexille
kun aika sopii — ei vielä tilattu.

## Ristiriitatarkistuksen menetelmä (tiedostot joita agentit lukevat)

1. `js/tyohuone-kehitys-data.js` KAARI_PAKETIT — onko kaupunki
   tarinakaarikaupunki, ja jos on, mikä hahmo/paikka/teema on varattu.
2. `js/kohtaamiskuvat-data.js` — onko olemassa kuva (tila `tarkistettu`
   = aktiivinen, `arkisto` = hylätty, EI vapaa toinen hahmo).
3. `docs/kuvatuotanto-kohtaamiset.md` — dokumentoidut tyylikokeet,
   joita ei aina ole vielä kuvakatalogissa (silti varattuja).
4. Kaupungin oma fokusvirta/lehti (`js/packs/fokusvirta-<kaupunki>.js`,
   `js/packs/europe-artikkelit.js`, laattakysymykset) — mitä aiheita
   lehti on jo käsitellyt, ettei kohtaaminen toista niitä.
5. Muiden erien jo kirjoitetut kaupungit (tämän ja edellisten erien
   raportit) — ettei sama teema/fakta toistu kahdesti.

Sääntö kaikissa: kaarikaupungissa uusi hahmo on AINA ERI kuin kaaren
oma (esim. Rooma: kaari=Enzo / visa=Fabrizio). Tunnetagit
tunneLoyto/Tyhja/Vaarin ovat AINA täsmälleen {ilo,0.7}/{miettiva,0.45}/
{hammentynyt,0.4}. Luennoissa vain roolit kertoja/hahmo, EI koskaan
pelaaja (nuori Fogg ei puhu). Mitat: tervehdys ≤280, muut ≤130 merkkiä.

## Riian sillan päivämäärän ratkaisu (esimerkki laatukontrollista)

C6:ssa Riian tervehdys väitti aluksi tarkkaa päivämäärää (1.1.1873)
rautatiesillan avaukselle. Fable pyysi toisen tarkistuksen ennen dataan
kirjoitusta — erillinen agentti luki molemmat siteeratut Wikipedia-
artikkelit suoraan ja totesi, ettei kumpikaan mainitse avauspäivää
(vain rakennusvuodet 1871–1872); kolmas, päivämäärän lähteenä ollut
sivusto nimesi väärän radan. Teksti korjattiin ("äskettäin" ilman
kuukautta) sekä dataan että era-c6-raporttiin. **Opetus jatkoon:** jos
Fable pyytää toisen tarkistuksen jollekin faktalle, käytä erillistä
agenttia joka LUKEE lähteet suoraan (WebFetch), ei vain luota
ensimmäisen agentin tiivistelmään.

## Mitä uusi sessio tekee ensin

1. Lue tämä luovutus ja Raamatun Ydinajatus kohta 2.
2. Tarkista Laitetestaajalta, valmistuiko toistettu savuke (Košice +
   kolme muuta) — jos kyllä ja vihreä, ilmoita Fablelle ja pyydä lupa
   C7:n mergeen Julkaisijan kautta; jos ei, pyydä savuke uudelleen.
3. Kysy Fablelta seuraava tehtävä — kohtaamiset-sarja on nyt
   sisällöllisesti valmis (45/45 fokusvirta-kaupunkia), joten
   todennäköinen jatko on Codex-toimitusten (monumentit, pienoismallit,
   kohtaamiskuvat, maakuntien havainnekuvat) otostarkistus, jonka
   Fable mainitsi alkuperäisessä tehtävänannossa.
4. ÄLÄ aloita uutta kohtaamiset-erää ilman Fablen nimenomaista käskyä
   — sarja on valmis.

---

valmis
