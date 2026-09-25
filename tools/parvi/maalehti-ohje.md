# Maalehtierän ohje (parvi, 6.9.2026 iltapäivä)

Lue ensin agentin-yhteiset-saannot.md samasta kansiosta ja noudata sitä. Lähtökohta origin/main v1635.

Omistaja 6.9.2026: "maailman saa tehdä kaikin puolin loppuun paitsi matkakirjan tekstejä sekä aarrekaarta". Tee VAIN maalehdet: EI matkakirjatekstiä, EI kohtaamisia, EI kysymyksiä.

MALLI mainissa: Egyptin (EGY), Japanin (JPN), Intian (IND), Brasilian (BRA), Australian (AUS), Meksikon (MEX), Kuuban (CUB) ja Kanadan (CAN) maalehdet — MAA_KATEGORIAT.<ISO> js/packs/maa-kategoriat.js:ssä (5 aihetta × 4 nostoa, minitehtävä yhdellä sivulla), UUTISLAHTEET-rivit js/packs/uutislahteet.js:ssä + tools/uutisproxy/worker.js SALLITUT + OHJE.md-merkintä, maaintro (vain intro-kenttä) mantereen artikkelitiedostossa (js/packs/africa-artikkelit.js, asia-artikkelit.js, southamerica-artikkelit.js, oceania-artikkelit.js, northamerica-artikkelit.js — katso miten EGY/JPN/BRA on tehty), faktapohja docs/mantereet-tyoaineisto/faktapohja-<maa>.md. Lue docs/moduulit/maalehti.md KOKONAAN ja docs/tyolista-opukselle.md:n ETUSIVUKUVAN KAAVA. Tunnusluvut (MAATIEDOT) ovat jo tehdyt useimmille maille — jos tests/maatiedot.test.mjs vaatii, lisää maa VIELA_ILMAN_TUNNUSLUKUJA-listalle.

Työnjako: jos maassa on jo kaupunkilehti (grep kaupungin id js/packs/kulttuuri-kategoriat.js:stä), lue se äläkä toista sen aiheita. Karttanostot (maastokohteet-<iso>.js, elaintakyt.js, skandaalit.js) ovat jo tehdyt: lue ne ja valitse maalehden aiheet niin, että lehti täydentää eikä toista. Herkät aiheet: historia asiallisesti, ei nykypolitiikkaa eikä nykyväkivaltaa (M3:n Myanmar-linja: käynnissä olevia selkkauksia ei kerrota). Uutislähde: testaa syöte ja artikkelisivu (<article> + og:image) kuten aiemmissa; jos ei kelvollista, jätä pois ja kirjaa raporttiin.

Kuvat: Commons API:sta, lisenssi ja tekijä tarkistettuina, leveys ≥ 1200 px, jokainen katsottu (Read näyttää kuvan); tunnistettavat kasvot, vesileimat ja museoleimat hylätään — silloin nosto mieluummin kuvaton. Rinnakkaisia Commons-hakuja enintään 2 kerrallaan, ja parvessa on nyt monta agenttia: 429 → odota 45 s.

Portit yhteisten sääntöjen mukaan (node --test tests/*.test.mjs fail 0; tarkista-kaksoisavaimet, -niputus, -savukkeet, -nimiolimitys). Yksi commit, ei pushia; commit-viestin ensimmäinen rivi ≤ 60 merkkiä; lopussa Co-Authored-By ja Claude-Session -rivit kuten yhteisissä säännöissä. Raportoi SHA, aiheet per maa, kuvien lähteet, kuvattomat nostot (kuvaputkelle: nosto — mitä kuvan pitää esittää) ja pistokoekohdat.
