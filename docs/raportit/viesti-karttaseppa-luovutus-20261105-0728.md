# Karttaseppä: luovutus 5.11.2026 klo 07.28 (KS)
Syy: konteksti 31 % (7.37). Korvaa -2256:n jonon; sen "Opit", "Pohjan jatko" ja "Sainte-Chapelle pohjalle" pätevät, lue myös se. Python: /opt/homebrew/opt/python@3.14/bin/python3 ilman -I:tä. A = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-alueet-20261104. C = /Users/Shared/Claude/proto-3d/_tyo/codex. Worktree /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219 (natiivi-backup), kärki 24c679133.

## ENSIN
1. **Vahti kuolee nollauksessa: käynnistä Monitor** (fetch origin claude/postilaatikko 60 s välein, /Users/Shared/Claude/wt/karttaseppa-postilaatikko, tulosta uudet commitit). Käsitelty 7a1a61990 asti. Detached HEAD: ennen uutta postia `git checkout --detach FETCH_HEAD`.
2. Tarkista posti (Tripon 22c-toimitus voi olla tullut) ja KK:n vastaus (kohta "Odottaa KK:lta").

## Odottaa KK:lta (viesti lähti 07.2x, koko arvio siinä)
- **Louvre v1b:** suositin uutta Tripon ottoa ennen omistajaa. Perustelut pelikuvista lokit/julkaisija-louvre-v1b-24c679133: 1) pohjoissivu tyhjä, katto vaalea ja litteä (l-etela-ylos); 2) sahalaita etelänsiiven katolla (l-pohjoinen-ylos); 3) iso pyramidi jää keskipaviljongin taakse etelästä ja pohjoisesta, näkyy vain kaistale (omistaja: "kaikkein tunnistettavin asia"). Pyramidi on 128/156/158, tavoite G 128/168/194.
- **Jos KK sanoo otto:** kehä neljästä julkisivusta ja pyramidit erillisenä geometriana (c1bf48c07: monikuvasyötössä ei yläkuvan paikkaa). Pyramidi selvästi korkeammaksi kuin nyt 110 m, jotta näkyy paviljongin (240 m) yli 45°:n kulmasta; korkeutta ei ole mitattu, sovita ennen tilausta. Sininen G:tä kohti. Tripon pysyvä lupa. Tilauksen malli C/pariisi-louvre-20261104/TILAUS-21c-tripo.md, mukaan Louvren oppi UV-laskennasta.
- **Kyltti:** Louvren eikä Notre-Damen kylttiä näy yhdessäkään kuvassa. Todennäköinen syy Nimikerros.cs:674 Nahtavyysalue.Peittaa (KK 3.11. 23.29), ei varmistettu. Ehdotin: mallin oma nimi mallin viereen, muut piiloon. Älä tee ennen KK:n sanaa.
- **Eteläsiipi:** rivit ovat oikean Louvren eteläsiiven paikalla (tarkistus-alue.jpg), pelissä matalia kortteleita rannassa. Jätin ne; KK voi pyytää kiveystä.

## Tehty tässä vuorossa
- 09569fc73 v1b asennettu (asenna-louvre.py). 62f382cab Louvrelle oma Maaritys "louvre" ja pohja NotreDameKoe/louvre-pohja.png. 24c679133 Malli.Savy (1,26/1,33/1,15 = 0,72 × oletus), koska oletus leikkasi seinät. Täysi tasaus 0,52 × vei pyramidin harmaaksi (scratchpad-laskenta; atlakset kivi ND 156/124/89, Louvre 209/167/124).
- **Pohja:** A/louvre-pohja/tee-louvre-pohja.py <alue> <21e-kooste-kiveys.png> <ulos.png>: alfa maskista, ulkopuolella 0 (striimi näkyy). 21e-kooste-kiveys.png = 21e maskin sisällä, pohja.png ulkopuolella, jalanjäljessä kiveys. KK hyväksyi 5.11. koosteen ilman uutta ottoa. Koosteen tekoskripti oli scratchpadissa: logiikka on MinFilter(13)+Gauss(4) maskista ja jalanjälki MaxFilter(5)+Gauss(1,5), kiveys tilkku 21e:stä y 480–560, x 600–680.
- **22b** KK:n hyväksymä. **Tripo 22c** tilattu: C/pariisi-sainte-chapelle-20261104/TILAUS-22c-tripo.md, posti 7555488f5, Tripo kuittasi 7a1a61990 (#2082). Toimitus `sainte-chapelle-3d-v1/`.
- Vanhat scratchpadit T7:llä /Volumes/T7 4TB/koodaus/proto-3d/_tyo/karttaseppa/scratchpad-arkisto-20261105; PT tietää.

## Kun 22c tulee
SHA, kaikki esikatselut täysikoossa, UV-laskenta A/louvre-21c-v1/musta3.py ja mustat pikselit. Vertaa pelikulmaan ja itäpäätyyn (kivinen kolmiopääty, ei liuskekattoa). Asennus kuten Louvre, Maaritys: oma malli Notre-Damen alueelle, paikka ND:n pohjalla 475,502, akseli noin 112°, oma paikka pohjaan. Koko kartalla G:tä vasten, ei suurenneta (G:ssä huippu noin puolet ND:n torneista, ehdotus 320/540 = 0,59): skaala koodiin puuttuu, Malli ei skaalaa. Savy laske atlaksesta kuten Louvrella. Sitten KK.

## Avoin
- Louvren ja Notre-Damen pohjien liitos Pont Neufin kohdalla: -2256:n 12 m:n porras, ei vielä katsottu täysikoossa.
- Pohjan sävy striimiä vaaleampi kuten ND:llä.
- Skripti sk-louvre-v1b-pohja.txt T7:llä; ajot vain JU:n vuorolla (Mac L2). Muistilukuja ei (2.207).

## Jono ja odottavat (ennallaan -2256:sta)
Seis ilman sanaa: tasankopoltto (PT); nimet 79186922b ja ed711573d kääntämättä; Karsi, Vincennes, Boulogne, minor-nimet ja puut 43ba52fe7 odottavat pelikuvia. D iPad JU:lta, kun A ja vähintään yksi malli kasassa. s-090:n rengas: tarkista merkki koodista. Eiffel oma kortti (2.92).

## Opit
- Atlaksen kirkkaus vaihtelee mallista toiseen: laske Savy atlaksesta ennen ajoa, älä peri kirkon oletusta. p75 ≈ p97 kuvassa = leikkautuu.
- Pelikuvista katso, näkyykö tunnistettavin osa joka suunnasta: mallikuvien yläkulmat eivät paljasta pyramidin peittymistä 45°:ssa.
- Vaihda JU:n jonon sha heti ja varmista kuittaus: JU ajaa jonon järjestyksessä, ja rivi voi lähteä ennen viestiä.
