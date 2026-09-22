# Pulun eleet, rytmi ja paikka — 22.9.2026

**Tämä on aamun lähdeauditin ja sijoittelukierroksen historiallinen raportti.** Myöhemmän omistajapyynnön rytmi-, vaihtelu-, karttaväistö- ja galleriamuutosten nykytila on `docs/raportit/pulu-rytmi-karttavaisto-20260922.md`. Sijoittelu toimitettiin erikseen commitissa `69f9a2e83963066488848034b0fcba48ef86d4c4`.

Lähdeauditin pohja: `origin/main` / `fc651208a9cd8deabc9766ff6245de55197f1ef1` (v2099).
Työhaara: `codex/pulu-katselu-ja-paikka-20260922`.

## Katselu

- https://matkakirja.app/docs/livia-svg.html — 70 rekisteröityä yksittäistä elettä, elevalinta, voimakkuus, hidastus, aikajana ja **Kaikki peräkkäin**. Ei kaikkien tuotantotilojen, asusteiden tai niiden yhdistelmien täydellinen luettelo.
- https://matkakirja.app/docs/livia-cue-ab.html — Berliinin ja Tromssan puhe-eleiden katselu oikean äänen kanssa, toistonopeus ja kelaus. Vähennetyn liikkeen valinta alustaa uuden ruudun; se ei testaa aitoa käyttöjärjestelmäasetuksen vaihtoa kesken puheen.

Molemmista saatiin HTTP 200. Äänen toistoa tai tämän muutoksen ulkoasua tuotantopelissä ei varmennettu tällä kierroksella.

## Nykyinen synkronointi

Oman puheen cue-rajat ja aktiivisen puhe-eleen eteneminen seuraavat `audio.currentTime`-aikaa. Ohjain käsittelee tauon, puskuroinnin, kelauksen, nopeuden muutoksen, päättymisen sekä vanhentuneet soittimet. Lataaja tarkistaa tekstin ja audioaineiston tunnisteet; puuttuva tai väärän version ajoitus ei kelpaa. Tämä on koodihavainto, ei 45 kaupungin läpikuuntelukuitti.

Luennan reaktiot käynnistyvät sanoihin kohdistetuista audioajoista, mutta yksittäisellä eleellä on sen jälkeen oma kestonsa. Nokan puheliike on vielä toistuva 1 500 ms animaatio, ei äänen voimakkuudesta tai äänteistä johdettu liike. Cue-rajojen havainto nojaa `timeupdate`-tapahtumiin, vaikka aktiivista asentoa piirretään mediakellosta.

Seuraavat parannukset, ei toteutettu tässä:

1. Johdetaan täsmälleen käytössä olevasta MP3:sta kevyt äänenvoimakkuuskäyrä. Nokka sulkeutuu puheen sisäisiin taukoihin ja avautuu muutamaan selkeään asentoon saman mediakellon mukaan. Ei edellytä uutta puhegenerointia.
2. Tarkennetaan cue-rajoja jo käytössä olevan piirtojakson kautta vain toiston aikana; ei uutta jatkuvasti pyörivää ajastinta.
3. Säilytetään tekstin tarkoittama tunne, mutta vaihdellaan siihen sopivaa kehon liikettä. Sama vierekkäinen ilme voidaan myös säilyttää ilman uutta aloitusnykäystä.
4. Erotetaan suun, katseen, tunnetilan, kehon ja asusteen kerrokset. Kuunteleva Pulu pysyy rauhallisena, eikä vakavan repliikin päälle arvota komiikkaa.

## Toistohavainnot lähdedatasta

45 kaupungin tämänhetkisessä cue-moduulissa on 198 cuea. `grin` esiintyy 46 ja `cityExplain` 43 kertaa (yhteensä noin 45 %). 35 kaupungin kommentti alkaa `cityExplain`-eleellä. Vierekkäisiä samoja eleitä on 11 paria, esimerkiksi Istanbulin ja Bergenin `grin` sekä Krakovan ja Tromssan `cityExplain`. Luvut kuvaavat aineiston määrityksiä, eivät havaittuja onnistuneita toistoja. Jatkuva rauhallinen kuunteluilme ei itsessään ole virhe.

Taustaeleiden valinta estää vain välittömästi edellisen eleen; pidempi lähihistoria voisi vähentää kaavamaisuutta. Lukemisen taustaliike vuorottelee kahden eleen välillä. Näihin ei tehty muutoksia.

## Toteutetut rajatut muutokset

- Lasiin törmäys oli joka seitsemännen paluun valinta ilman aikarajaa; tavallinen näkyviin paluu valitsi muuten kömpelön laskeutumisen. Näkymien vaihtaminen saattoi tihentää temppuja. Tämä on yleisen Pulun paluupolku, ei erikseen todistettu avaruuslinssin vika. Minipulun lähteessä ei ole vastaavaa törmäystä.
- Yhteinen paluuvalitsin sallii kömpelön saapumistempun aikaisintaan kolmen minuutin välein ja lasiin törmäyksen aikaisintaan kymmenen minuutin välein. Ensimmäinen törmäys voi tulla aikaisintaan kymmenen minuuttia ohjaimen luonnista. Normaali näkyviin paluu on rauhallinen; kesken jääneen lennon tavallinen paluu säilyy lentona.
- Puhe, luenta, avoin chat, lehtitila, odotus ja vähennetty liike estävät nämä paluutemput. Estetty yritys ei kuluta aikarajaa. Mitään temppua ei ajasteta myöhemmäksi. Aika on ohjaimen kelloa, ei erikseen laskettua näkyvää peliaikaa, ja rajat nollautuvat ohjaimen uudelleenluonnissa.
- Kartan Pulun ankkurin oikea ja alaväli ovat nyt molemmat `3.6rem` + kyseisen reunan turva-alue. Tavallisella 16 px juurifontilla muutos siirtää ankkuria noin 16 px vasemmalle ja 27 px alas. Paneelin väistö ja chatin erillinen sijoittelu säilyvät. Hahmon näkyvän siluetin tasapaino on vielä katsottava oikeassa pelissä myös puhelimella.

## Ulkoasuehdotukset, ei toteutettu

Nykyinen SVG osaa jo hymykaaren, nokan avautumisen ja useita silmäilmeitä. Kehittäisin ensisijaisesti nokan kulmaa, alaleukaa, poskia ja silmiä; irrallinen ihmismäinen suu tai hampaat muuttaisivat hahmon luonnetta enemmän. Pieni kieli voisi kuulua muutamaan erityiseen eleeseen, ei tavalliseen puheeseen.

Avaruuskypärän jatkoksi huivi/pipo kylmään, sadetakki sateeseen sekä lentäjänlasit ja huivi lentoon. Yksi hallitseva asuste kerrallaan, tilanteeseen perustuva pukeminen ja yhteinen ilme isolle Pululle sekä minipululle. Harvinaiset isot gagit säilytetään yllätyksinä.

## Varmennus ja toimitusraja

- Kohdennetut ohjain-, SVG-, chat- ja paneelitestit: 130/130 PASS.
- Koko `node --test --test-reporter=tap 'tests/*.test.mjs'`: 3 922 testiä, 3 909 PASS, 13 SKIP, 0 FAIL.
- Kaksoisavaimet, niputus, savukkeet, nimiöpäällekkäisyystarkistus ja `git diff --check`: PASS. Nimiötarkistin raportoi erikseen 56 tiedoksi luokiteltua nimiö–symboliosumaa.
- Ei teksti-, audio-, alignment-, asuste- tai ilmemuutoksia. Ei maksullista ajoa.
- Paikallinen toteutus: ei pushia, PR:ää, mergeä, versionnostoa eikä julkaisua. Tuotantopelin liikkuva katselmus ja mobiilisijoittelun hyväksyntä ovat avoinna.
