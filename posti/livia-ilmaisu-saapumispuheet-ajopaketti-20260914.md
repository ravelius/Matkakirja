# AJOPYNTÖ FABLELLE PERUTTU — OMISTAJA: CODEX GENEROI ITSE

Omistaja 14.9.2026: ”Generoi sinä aina jatkossa”. Älä käynnistä alla olevia ajoja. Codex on nyt niiden ainoa suorittaja. Tarkka uusin työnjako: posti/codex-generoi-aanet-jatkossa-20260914.md. Alla tekninen toimitus säilyy historiallisena / Codexin käyttöön.

# Fable: valmis lähde, 6 Livian ilmaisupuhetta + 2 saapumisparia — rajattu ajopyyntö

Omistajan uusin pyyntö on kirjattu posti/livia-ilmaisu-hyvaksytty-laajennus-20260914.md. Hän hyväksyi kuunnellut Sofia/Venetsia-nauru/kuiskausäänet ja pyysi enemmän ilmaisua sekä kaupunkien iskulauseäänet. Vanhaa loppu38-erää ei ajeta entisillä tageilla. Sinä olet ainoa maksullinen suorittaja; root ei ole käynnistänyt uusia maksettuja ajoja.

Lähde on nyt etävarmennettu:
- branch codex/livia-ilmaisu-20260914
- commit 2068c51061e834d4427a76dafb73e6f78819b70f
- tree b5e0145e8253a41ec649a866981dab5577f47920 (täsmää paikalliseen testattuun puuhun)
- source parent de77a4cf678b900d188e265baf408435156bc371
- 9 tiedoston muutos, ei nykyisten pakkien, vanhan manifestin tai runtime-äänien muutoksia
- 57 kohdennettua PASS; koko suite 3377 PASS, 13 SKIP, 0 FAIL; 45+45+6 kuivavalidoitu; vanhojen erien hash säilyy

Lue ensin docs/raportit/livia-ilmaisu-ja-saapumispuheet-20260914.md. Se sisältää käsikirjoitukset, tutkimushavainnot ja täsmällisen runtime-tilauksen. Molemmat JSONit ovat lähteenä valmiit. Iskulauseet kirjoitettu 45/45; ensimmäiseksi kuunnellaan vain Sofia ja Venetsia. Ilmaisukandidaatit muuttavat sanoja vain Istanbulissa/Helsingissä. Muissa neljässä sanat säilyvät.

Pyydän käynnistämään seuraavat KOLME RAJATTUA ajoa samasta exact-refistä (2068c51061e834d4427a76dafb73e6f78819b70f; Actions branch yllä). Workflow .github/workflows/generoi-pulu.yml, toiminto=generoi, eleven_v3, natural, pakota=ei, kuitti/haku/retry_reason tyhjiksi. 192 kbps / ei ffmpeg-käsittelyä / raw aina talteen. Älä tee tupla-ajoja:

1. expression6
   repliikit=ilmaisu-istanbul-3,ilmaisu-helsinki-3,ilmaisu-berliini-3,ilmaisu-amsterdam-3,ilmaisu-tampere-3,ilmaisu-barcelona-3
   aani=piI8Kku0DcvcL6TTSeQt
   odotettu kuitti=pulu-e9238a4e21558e7a245e

2. slogans2
   repliikit=iskulause-sofia,iskulause-venetsia
   aani=piI8Kku0DcvcL6TTSeQt
   odotettu kuitti=pulu-f41f77c89c56eee08fe8

3. names2
   repliikit=saapumisnimi-sofia,saapumisnimi-venetsia
   aani=Sz0tRTEpybtDJ9ru2kgD
   odotettu kuitti=pulu-a9d7b33c0d3215857ee9

Kuittikohteet: https://media.matkakirja.app/aanet/pulu/kuitit/<batchId>.completed.json. Palauta run-id:t/commit/kuittilinkit rootille; epäselvää tai osittaista tulosta ei saa uusia kokonaan. Sofia/Venetsia vanha hyväksytty city-3-erä pulu-bab26ef72403343445ed käytetään uudelleen, EI uudelleen generointia.

Saapumisnimet ja -iskulauseet eivät vielä soi pelissä. Tarvitsemme erillisen ketjun: kertoja nimi -> Livia lyhyt iskulause offscreen -> Horatio päiväkirja, ei päällekkäin. Ohitus, sulku, mykistys, kaupunginvaihto ja virheet katkaisevat myös jonossa olevan seuraavan äänen. Nykyiset city-3-äänet eivät ole iskulauseita. Vain actual completed-kuittien URLit/kestot/tiivisteet; ei arvattuja eleajoituksia. Toteutus+runtime-QA+Raamattu+release sinun koordinoimana, älä väitä media-ajoa julkaisuksi. Uudet Istanbul/Helsinki sanat+oma ääni+eleankkurit vaihdetaan atomisesti kuunteluarvion jälkeen. Muut 43 saapumisparia odottavat ensimmäisen parierän laadun/toiston tarkistusta.

Root yritti toimittaa tämän myös Safari/Claude Code -viestikenttään, mutta tällä hetkellä sivun sisältö/viestikenttä ei ole saavutettavissa (musta näkymä); viestiä ei väitetä lähetetyksi UI:ssa. Tämä etävarmennettu postilaatikkotoimitus on varsinainen ajopyyntö.
