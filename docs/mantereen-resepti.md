# Uuden mantereen resepti — roolit, työjärjestys ja opit

Koottu 9.8.2026 Euroopan ja Lähi-idän kokemuksesta (omistajan pyyntö).
Tämä on järjestys, jolla kokonainen uusi manner rakennetaan peliin, ja
kuka sen tekee. Voimassa olevat roolit: docs/roolitus.md.

## Roolit

Voimassa oleva työnjako ja mallikohtaiset työtavat: docs/roolitus.md.
(Tässä ollut viiden session roolitaulukko poistettiin
dokumenttiremontin D5:ssä 17.8.2026 vanhentuneena — työtä tekevät
nyt Fablen sisäiset agentit, ks. roolitus.)

## Työjärjestys (vaiheet ja portit)

1. **Kaanon ja laudan suunnittelu — Fable + omistaja.**
   Tarinalinjaukset mantereelle (docs/tarina.md), herkkyysrajaukset
   (ei sotasisältöä; pyhät paikat kunnioittavasti ulkopuolelta),
   kaupunkilista ja laudan rajaus omistajan kanssa.
2. **Lautageometria — sisältöagentti.** Maiden rajat (<manner>-countries.js),
   kaupunkien paikat, laattamäärät. PILOTTI ensin: kuvakaappaus
   Fablelle hyväksyntään ennen jatkoa. **Samassa erässä
   map.cityCountry-taulu** (Dubai-oppi: ilman sitä menovinkit, liput
   ja maa numeroina eivät syty, ja puute huomataan vasta lehdessä).
3. **Maakartat (reliefit) — sisältöagentti, erissä.** Lisenssit Commonsin
   rajapinnasta, pisteet pelin karttapiste()-funktiolla JA
   pikselivärin vesitarkistuksella, katselu lehden 340 px koossa.
4. **Lehdet — sisältöagentti, erissä.** Kaupunkilehdet (kansi + aihesivu +
   minitehtävä; menovinkit maalehdestä) ja maalehtien aihesivut.
   Esitarkistin ajetaan LOPPUUN ennen liittämistä; kuva katsotaan
   silmin 480 px:ssä; kuvan pitää olla siitä maasta, jota sivu
   käsittelee. Vanhat jutut siirretään sanatarkasti kopioimalla.
5. **Kohdekartat — sisältöagentti, lehtien tahdissa.** Sääntö: kartta
   mergetään vasta kun kaupungin lehti on mainissa. Rajaus kohteen
   omassa mittakaavassa (Dubai 2,8 km oli oikein, ohjeen 5–8 km ei
   ole laki). Valmistelu saa alkaa rinnakkain lehden kanssa.
6. **Nähtävyysjutut — sisältöagentti, kohdekarttojen tahdissa.**
   Kuvakuraatio: useita kandidaatteja per kohde, jokainen katsotaan,
   valinta perustellaan; wiki-täsmennysansat kirjataan.
7. **Tarinakaari — Fable.** Tekstit (saapuminen + kohtaaminen&kysymys
   + aarre) → omistajan arvio työhuoneessa (luennat: false) →
   luennat (ElevenLabs) → pelikytkentä (KAARI_LAUDAT + lipun
   poisto). Manneraarteiden kuvat (AI, mustasta nousevat) jos manner
   tarvitsee uudet.
8. **QA-portit — QA-agentti, joka vaiheen perään.** Faktatarkistus
   kaaren kysymyksille (+ anakronismit vuoteen 1873), integraatio-QA
   oikealla selaimella (myös tallennus/lataus), kuvien ja linkkien
   auditointi, duplikaattihaku. Verkkolöydökset epävarma-merkinnällä.

## Julkaisukuri

Julkaisusäännöt ovat docs/roolitus.md:ssä (versionosto työkalulla,
testien lukeminen, squash-merge). Prosessin oma lisähuomio säilyy:

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
6. **Kehityskohteiden tilanne (toteutettu 9.8. illalla):**
   (a) TEHTY — `node tools/uusi-versio.mjs "Muutosrivi"` fetchaa
   mainin ja valitsee numeron atomisesti; TÄMÄ ON NYT JULKAISUKAAVAN
   VERSIONOSTOASKEL, käsin ei enää numeroida. (b) TEHTY osittain —
   .github/workflows/testit.yml ajaa testit joka PR:lle; pakolliseksi
   portiksi omistaja kytkee sen branch protectionista (ohje
   työnkulkutiedostossa). (c) KÄYTÄNTÖ — pienet muutokset niputetaan
   isompiin eriin kun julkaisijoita on monta. (d) KATETTU — työhuoneen
   etusivu näyttää jo kymmenen tuoreinta julkaisua muutoslokista
   automaattisesti; roolikohtainen tilannetaulu pysyy käsin
   kirjoitettuna, koska se on tulkintaa eikä dataa.

## Sanasto: valokuvapulma (nimetty 10.8.2026)

**Valokuvapulma** = isoisän pulma, jossa vastausvaihtoehdot ovat
OIKEITA VALOKUVIA piirrosten sijaan: kysymys nojaa isoisän
luonnokseen tai merkintään, ja pelaaja valitsee valokuvista sen,
joka vastaa luonnosta. Eri asia kuin *valokuvakysymys* ("mikä
paikka tämä on" -muoto). Kuvat kuratoidaan Commonsista samalla
lisenssi- ja silmätarkistuskurilla kuin muutkin kuvat, ja ne
kulkevat peilin kautta. Pilotti: Ateenan pylväspulma (Fable tekee
ensimmäisen kierroksen; monistus muihin pulmiin vasta hyväksytyn
mallin jälkeen).
