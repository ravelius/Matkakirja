# Uuden mantereen resepti — roolit, työjärjestys ja opit

Koottu 9.8.2026 Euroopan ja Lähi-idän kokemuksesta (omistajan pyyntö).
Tämä on järjestys, jolla kokonainen uusi manner rakennetaan peliin, ja
kuka sen tekee. Voimassa olevat roolit: docs/roolitus.md.

## Roolit yhdellä rivillä

| Sessio   | Malli    | Vastuu |
|----------|----------|--------|
| Fable    | Fable 5  | Tarina ja kaanon, tarinakaari (tekstit + luennat + pelikytkentä), aarrekuvat, koordinointi, päätökset, julkaisujen ristiriidat |
| Opus 1   | Opus     | Lehdet: kaupunkilehdet, maalehdet aihesivuineen, minitehtävät, menovinkit, lehtien kuvat |
| Opus 2   | Opus     | Kartat: lautageometria, maakartat (reliefit), kohdekartat, introt, laudan kytkennät |
| Sonnet 1 | Sonnet   | QA: faktatarkistus, integraatiotestaus selaimessa, kuva- ja linkkiauditoinnit, duplikaatit |
| Sonnet 2 | Sonnet   | Nähtävyysjutut kohdekarttojen numeropisteisiin + kuvakuraatio |

## Työjärjestys (vaiheet ja portit)

1. **Kaanon ja laudan suunnittelu — Fable + omistaja.**
   Tarinalinjaukset mantereelle (docs/tarina.md), herkkyysrajaukset
   (ei sotasisältöä; pyhät paikat kunnioittavasti ulkopuolelta),
   kaupunkilista ja laudan rajaus omistajan kanssa.
2. **Lautageometria — Opus 2.** Maiden rajat (<manner>-countries.js),
   kaupunkien paikat, laattamäärät. PILOTTI ensin: kuvakaappaus
   Fablelle hyväksyntään ennen jatkoa. **Samassa erässä
   map.cityCountry-taulu** (Dubai-oppi: ilman sitä menovinkit, liput
   ja maa numeroina eivät syty, ja puute huomataan vasta lehdessä).
3. **Maakartat (reliefit) — Opus 2, erissä.** Lisenssit Commonsin
   rajapinnasta, pisteet pelin karttapiste()-funktiolla JA
   pikselivärin vesitarkistuksella, katselu lehden 340 px koossa.
4. **Lehdet — Opus 1, erissä.** Kaupunkilehdet (kansi + aihesivu +
   minitehtävä; menovinkit maalehdestä) ja maalehtien aihesivut.
   Esitarkistin ajetaan LOPPUUN ennen liittämistä; kuva katsotaan
   silmin 480 px:ssä; kuvan pitää olla siitä maasta, jota sivu
   käsittelee. Vanhat jutut siirretään sanatarkasti kopioimalla.
5. **Kohdekartat — Opus 2, lehtien tahdissa.** Sääntö: kartta
   mergetään vasta kun kaupungin lehti on mainissa. Rajaus kohteen
   omassa mittakaavassa (Dubai 2,8 km oli oikein, ohjeen 5–8 km ei
   ole laki). Valmistelu saa alkaa rinnakkain lehden kanssa.
6. **Nähtävyysjutut — Sonnet 2, kohdekarttojen tahdissa.**
   Kuvakuraatio: useita kandidaatteja per kohde, jokainen katsotaan,
   valinta perustellaan; wiki-täsmennysansat kirjataan.
7. **Tarinakaari — Fable.** Tekstit (saapuminen + kohtaaminen&kysymys
   + aarre) → omistajan arvio työhuoneessa (luennat: false) →
   luennat (ElevenLabs) → pelikytkentä (KAARI_LAUDAT + lipun
   poisto). Manneraarteiden kuvat (AI, mustasta nousevat) jos manner
   tarvitsee uudet.
8. **QA-portit — Sonnet 1, joka vaiheen perään.** Faktatarkistus
   kaaren kysymyksille (+ anakronismit vuoteen 1873), integraatio-QA
   oikealla selaimella (myös tallennus/lataus), kuvien ja linkkien
   auditointi, duplikaattihaku. Verkkolöydökset epävarma-merkinnällä.

## Julkaisukuri (kaikki sessiot)

- `git fetch origin main` JUURI ennen versionumeron valintaa ja
  muutokset.js:n ylimmän rivin tarkistus — 9.8. tuli kaksi
  numerotuplaa (v467, v468), kun kuusi julkaisijaa oli liikkeellä.
- Testit ajetaan ennen mergeä; punainen main pysäyttää myös
  DEPLOYN (Julkaise peli -workflow ohittaa deployn punaisella).
- Työhuone- ja docs-muutokset eivät nosta versiota, mutta menevät
  mainiin.

## Opit ja kehityskohteet (9.8. kerätty)

1. **cityCountry heti geometrian mukana** — siirretty vaiheeseen 2.
2. **Hiljaisesta ohituksesta näkyvä virhe.** Kolme vikaluokkaa
   samana päivänä: työkalu ohitti hiljaa (galleriat), vertailu meni
   läpi tyhjänä (päällekkäisjutut) ja testiajon `tail -3` piilotti
   "# fail" -rivin, jolloin punainen luettiin vihreäksi kolmessa
   erässä. Säännöt: tarkistin kaatuu mieluummin kuin vaikenee, ja
   testituloksesta luetaan aina "# pass"- ja "# fail" -rivit —
   ei katkaistua häntää.
3. **Jonot mitataan datasta, ei muistilistasta.** "Kuusi aluelehteä"
   olikin yksitoista lehdetöntä kaupunkia, kun asia laskettiin.
4. **Sisältö luetaan ennen poistoa.** maasto-tekstit-malli.js olisi
   poistettu "käyttämättömänä", vaikka siinä on kymmenen kohteen
   ainoat tekstit — pysäytys tuli sisällön lukemisesta.
5. **Generointi vasta hyväksynnän jälkeen** (luennat, aarrekuvat):
   tekstit ja tyylit omistajalle arvioon ennen kuin ääni- tai
   kuvageneraattori käynnistetään.
6. **Kehitettävää harkintaan:** (a) versionoston pieni työkalu, joka
   fetchaa ja bumppaa atomisesti → numerotuplat poistuvat; (b) CI
   required check ennen mergeä → punainen main ei pääse syntymään;
   (c) pienten erien niputus isommiksi, kun julkaisijoita on monta
   (rebase-kitka); (d) tilannetaulun automaattisempi päivitys —
   käsin ylläpidetty taulu laahaa julkaisutahdin perässä.
