# Uutisvälityksen käyttöönotto (omistajalle, n. 5 min)

> **Päivitys 6.9.2026 (Kenia, Tansania, Uganda):** sallittuihin
> lisättiin capitalfm.africa, globalpublishers.co.tz ja nilepost.co.ug
> (maalehdet KEN/TZA/UGA, testattu 6.9.2026: syöte aukeaa,
> artikkelisivun ensimmäisestä `<article>`-lohkosta jäsentyy leipäteksti
> ja `og:image` löytyy). Kaksi osoitetta on kirjoitettava täsmälleen
> oikein, koska worker ei seuraa uudelleenohjauksia: Capital FM on
> `.africa` (`.co.ke` vastaa 301:llä) ja Nile Postin syöteosoitteesta
> puuttuu loppukauttaviiva. Nation-ryhmän lehdet (Daily Nation, Taifa
> Leo, Daily Monitor, Mwananchi, The Citizen) ovat kaikissa kolmessa
> maassa Cloudflaren botti-eston takana; perustelut hylkäyksille ovat
> js/packs/uutislahteet.js:n maakohtaisissa kommenteissa. Julkaisu Git-
> integraatiolla mainista.
>
> **Päivitys 6.9.2026 (Papua-Uusi-Guinea, Salomonsaaret):**
> sallittuihin lisättiin www.postcourier.com.pg ja
> theislandsun.com.sb (maalehdet PNG/SLB, testattu 6.9.2026: syötteessä
> kymmenen juttua, artikkelisivun ensimmäisestä `<article>`-lohkosta
> jäsentyy leipäteksti ja `og:image` löytyy). **Fidži jäi ilman
> uutislähdettä:** Fiji Timesin ja FBC Newsin syötteet aukeavat, mutta
> kummankaan artikkelisivulla ei ole `<article>`-elementtiä eikä
> `[itemprop="articleBody"]`-merkintää, ja perustelut ovat
> js/packs/uutislahteet.js:n FJI-kommentissa. Julkaisu Git-
> integraatiolla mainista.
>
> **Päivitys 6.9.2026 (Uruguay, Paraguay, Venezuela):** sallittuihin
> lisättiin www.montevideo.com.uy, www.abc.com.py ja www.elnacional.com
> (maalehdet URY/PRY/VEN, testattu 6.9.2026: syöte aukeaa, artikkelisivun
> ensimmäisestä `<article>`-lohkosta jäsentyy leipäteksti ja `og:image`
> löytyy). ABC Colorin syöteosoitteessa on kyselymerkkijono
> (`?outputType=xml`); se kulkee workerin läpi ongelmitta, koska peli
> koodaa koko osoitteen url-parametriin. Julkaisu Git-integraatiolla
> mainista.
>
> **Päivitys 6.9.2026 (Chile, Kolumbia):** sallittuihin lisättiin
> www.lanacion.cl ja www.lasillavacia.com (maalehdet CHL/COL, testattu
> 6.9.2026: syöte aukeaa, artikkelisivun ensimmäisestä `<article>`-
> lohkosta jäsentyy leipäteksti ja `og:image` löytyy). **Kuuba jäi ilman
> uutislähdettä:** yksikään tavoitettavissa ollut kuubalainen sivusto ei
> läpäissyt artikkelisivutestiä, ja perustelut ovat
> js/packs/uutislahteet.js:n CUB-kommentissa. Julkaisu Git-
> integraatiolla mainista.
>
> **Päivitys 6.9.2026 (Kanada, Meksiko, Peru):** sallittuihin lisättiin
> globalnews.ca, www.jornada.com.mx ja rpp.pe (maalehdet CAN/MEX/PER,
> testattu 6.9.2026: syöte aukeaa, artikkelisivulta jäsentyy `<article>` ja
> `og:image`). Julkaisu Git-integraatiolla mainista.
>
> **Päivitys 7.8.2026 (automaattijulkaisu):** repo on kytketty
> Cloudflaren Git-integraatioon (Workers Builds), ja repossa on nyt
> `wrangler.jsonc`, joka kertoo sille workerin sisääntulopisteen.
> Jokainen push main-haaraan julkaisee `tools/uutisproxy/worker.js`:n
> itsestään — **Edit code → Deploy -käsivaihetta ei enää tarvita**,
> ja alla olevien vanhojen päivitysmerkintöjen käsijulkaisuohjeet
> jäävät historiaan. Käsijulkaisu toimii yhä varakeinona, jos
> integraatio joskus irrotetaan. Tämä julkaisu vei voimaan myös
> Saksan ja Ruotsin lähteet (alla).

> **Päivitys 7.8.2026 (Saksa/Berliini, v316):** sallittuihin
> lisättiin Saksan uutislähde (tagesschau:
> `https://www.tagesschau.de/`) Berliinin lehteä varten. Julkaise
> worker kerran uudelleen: **Edit code → liitä tuore `worker.js` →
> Deploy.** Siihen asti Berliinin lehti näkyy ilman uutisosiota —
> mikään ei mene rikki. Sama julkaisu tuo kaikki aiemmatkin
> päivitykset (myös alla olevan Ruotsin).

> **Päivitys 7.8.2026 (Ruotsi/Tukholma, v315):** sallittuihin lisättiin Ruotsin uutislähde
> (`https://www.svt.se/`) Tukholman lehteä varten. Julkaise worker
> kerran uudelleen: **Edit code → liitä tuore `worker.js` → Deploy.**
> Siihen asti Tukholman lehti näkyy ilman uutisosiota — muu lehti
> toimii normaalisti. Sama julkaisu tuo kaikki aiemmatkin
> päivitykset.

> **Päivitys 4 (v305):** sallittuihin lisättiin Britannian
> uutislähde (BBC: `feeds.bbci.co.uk`, `www.bbc.co.uk`,
> `www.bbc.com`) Lontoon lehteä varten. Julkaise worker kerran
> uudelleen: **Edit code → liitä tuore `worker.js` → Deploy.**
> Sama julkaisu tuo kaikki aiemmatkin päivitykset.

> **Päivitys 3 (v297):** sallittuihin lisättiin Egyptin uutislähde
> (`https://www.youm7.com/`) Kairon lehteä varten. Julkaise worker
> kerran uudelleen: **Edit code → liitä tuore `worker.js` → Deploy.**
> Siihen asti Kairon lehti näkyy ilman uutisosiota — mikään ei mene
> rikki.

> **Päivitys 5.8.2026 (v280):** worker hakee nyt myös uutisten
> artikkelisivut, jotta popupissa näkyy koko leipäteksti. Jos otit
> workerin käyttöön ennen tätä, julkaise se kerran uudelleen:
> **Edit code → poista vanha → liitä tuore `worker.js` → Deploy.**
> Ennen uudelleenjulkaisua popup näyttää vain syötteen lyhyen
> kuvauksen — mikään ei mene rikki.

> **Päivitys 6.8.2026 (Espanja/Madrid):** sallittuihin lisättiin
> `https://www.20minutos.es/` (Espanjan uutislähde). **Julkaise worker
> uudelleen: Edit code → liitä tuore `worker.js` → Deploy.** Siihen
> asti Espanjan lehden uutisosio on piilossa; muut maat toimivat
> ennallaan.

Lehden maaosaston uutisotsikot tarvitsevat pienen välityspalvelimen,
koska uutissivustot eivät salli selaimen hakea RSS-syötteitään suoraan
toiselta sivustolta (CORS). Välitys on ilmainen Cloudflare Worker —
alla vaiheet. Siihen asti uutisosio pysyy pelissä piilossa, eikä
mikään mene rikki.

## Vaiheet

1. Mene osoitteeseen <https://dash.cloudflare.com> ja kirjaudu
   (ilmainen tili riittää; luo tili jos ei vielä ole).
2. Valitse vasemmalta **Workers & Pages** → **Create** →
   **Create Worker**.
3. Anna nimeksi esim. `matkakirja-uutiset` ja paina **Deploy**.
4. Paina **Edit code**, poista mallikoodi ja liitä tilalle koko
   tiedosto `tools/uutisproxy/worker.js` tästä repositoriosta.
   Paina **Deploy** uudelleen.
5. Kopioi workerin osoite (muotoa
   `https://matkakirja-uutiset.<tunnus>.workers.dev`).
6. Avaa `js/packs/uutislahteet.js` ja kirjoita osoite UUTISPROXY-
   vakioon:

   ```js
   export const UUTISPROXY = 'https://matkakirja-uutiset.<tunnus>.workers.dev';
   ```

7. Julkaise peli normaalisti (versionosto + PR). Uutisosio ilmestyy
   lehden maaosastoon niissä maissa, joilla on lähde
   `UUTISLAHTEET`-listassa (aluksi Italia/ANSA).

## Kun lisäät uuden maan uutislähteen

Lisää syötteen osoite KAHTEEN paikkaan:

1. `js/packs/uutislahteet.js` → `UUTISLAHTEET` (nimi, kieli, syote)
2. `tools/uutisproxy/worker.js` → `SALLITUT`-lista

Kun muutos on mainissa, Cloudflaren Git-integraatio julkaisee
workerin itsestään (7.8.2026 alkaen, ks. ylin päivitysmerkintä) —
mitään ei tarvitse tehdä käsin. Jos integraatio ei ole käytössä,
varakeino on entinen käsijulkaisu: Edit code → liitä → Deploy.

Sallittujen lista on turvatoimi: ilman sitä kuka tahansa voisi
käyttää workeria yleisenä välityspalvelimena.

## Kustannus ja rajat

Cloudflaren ilmainen taso sallii 100 000 pyyntöä päivässä, ja worker
pitää syötettä 10 minuutin välimuistissa — perhekäytössä rajat eivät
tule koskaan vastaan. Käännösnappi käyttää MyMemory-palvelua suoraan
selaimesta (ilmainen, n. 5 000 merkkiä päivässä per käyttäjä) — se ei
kulje workerin kautta.
