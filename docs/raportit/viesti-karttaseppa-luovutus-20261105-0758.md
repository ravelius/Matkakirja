# Karttaseppä: luovutus 5.11.2026 klo 07.58 (KS)
Syy: konteksti 25 %, työt odottavat Codexia ja KK:ta. **Lue tämä, sitten -0750 (03f58c3c6) ja -0745 (d0f75f519).** Tämä voittaa ristiriidassa: Louvren "ei tilata" ja pyramidisovitus eivät päde. Python: /opt/homebrew/opt/python@3.14/bin/python3. A = /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pariisi-alueet-20261104. C = /Users/Shared/Claude/proto-3d/_tyo/codex. Worktree /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, karttaseppa/nahtavyydet-219, kärki 186aaea45.

## ENSIN
Käynnistä vahti Monitorilla (fetch origin claude/postilaatikko 60 s välein, /Users/Shared/Claude/wt/karttaseppa-postilaatikko), käsitelty 54477121d asti. Detached HEAD: ennen postia `git checkout --detach FETCH_HEAD`.

## Omistaja ja KK (sitovat)
- **Omistaja 07.46 (kortti): Louvren länsipää auki.** Otto 2: länsisiipi pois, pohjois- ja eteläsiipi päättyvät kulmapaviljonkeihin, itäsiipi ja keskipaviljongit pysyvät, piha jatkuu kiveyksenä kohti puistoa. Pohjoissivulle ikkunat ja sama tumma katto, ei piikkejä. Pyramidit sama koko, paikka, väri (omistaja 07.43). Jos otto 2 ei korjaa vikoja, omistajalle ennen kolmatta.
- **KK 07.47: nähtävyyden muoto verrataan oikeaan rakennukseen ennen Tripoa,** ei vain mallikarttaan.
- **KK 07.5x: nimet hyväksytty** valtuutuksella, mukaan versioon 186aaea45 sellaisenaan.
- **Sainte-Chapelle 22c: EI kuittausta Tripolle, ei kolmatta ottoa.** Itäpää on litteä (oikeassa monikulmainen apsis) ja torni paksu kruunu (oikeassa kapea). KK vie omistajalle kortilla ja kertoo vastauksen.
- **Raja:** KK katsoi k-013-parin: raja ja karkea kartta vain Macilla. Louvren lähikuva puuttuu iPadilta.

## Avoinna
1. **Codex 21f tilattu 54477121d** (C/pariisi-louvre-20261104/TILAUS-21f-otto2.md, asettelu ohje-21f-pohja.png, toimitus _review-otto2-21f/). Seitsemän kuvaa: viisto-lounas ensin, viisto-koillinen, ylhaalta, neljä julkisivua. **Kun tulee:** SHA, kaikki kuvat täysikoossa, sivut keskenään, vertaus oikeaan Louvreen (Commons PD/CC), erot mukaan → KK ennen Tripoa. Lännestä pyramidi näkyy ilman seinää edessä. Tripo-tilauksen pohja C/pariisi-louvre-20261104/TILAUS-21c-tripo.md + UV-oppi + sahalaita: odottaa KK:ta.
2. **Iso alue, versio 2 KK:lla** (ei tilattu, KK näyttää omistajalle): A/louvre-pohja/iso-alue/ehdotus-v2.jpg (tee-iso-alue.py 1.25 -160 -95, sitten tee-iso-v2.py). 1,13 km², 1 860 × 959 m, 2 palaa 1,0 m/px, itäpala x -710..826, länsipala x -1114..422, y -661..363 m mallin keskipisteestä (x itään, y etelään). Sauma Tuileries'n nurmelle. KK:lta: pohjoinen Palais-Royal'n taakse, idässä vähintään 2 korttelia, raja kaduille; eteläranta ja vasen ranta striiminä; Tuileries ja Lemonnierin poisto avoimen pään kohdalta ok. Versio 1 hylätty (kasvoi vain puistoon). Ennen tilausta tarkenna raja kaduille. Oppi 21e:stä: Codex ei tyhjentänyt jalanjälkeä eikä säilyttänyt maskin ulkopuolta, joten kooste tehdään itse (tee-louvre-pohja.py) ja tilaukseen selvä mittari. Koodiin kahden pohjan tuki Louvren alueelle. Pihan akseli osuu puiston keskialtaaseen, joten paikkaa ei siirretä.
3. **Mac 6b9788c79 valmis** (lokit/julkaisija-louvre-otto2-6b9788c79, 19 kuvaa). Syy nimille (unity.log): taso, nosto, nähtävyys eli Nimikerros.cs:606, :620, :690. Kuvissa väärä koodipyramidi, ei näytetä pyramidin takia. **186aaea45 ajamatta Macilla;** iPad-rivi JU:lla (lokit/julkaisija-louvre-otto2-186aaea45), odottaa vuoroa.
4. Pyramidikoodi ja komento `pyramidi`: siivoa, kun erillistä pyramidia ei tarvita.

## Ennallaan
-0745: Avoin (Pont Neufin liitos, SC:n pohja, s-090:n merkki), Jono ja odottavat, Opit. Laikka ja eteläranta uuden mallin jälkeen. Muistilukuja ei (2.207).

## Opit
- Isoa aluetta laskiessa kysy ensin, missä puute näkyy: pinta-ala kasvoi puistoon, vaikka omistajan kuvassa puute oli kapea reunus rakennuksen vieressä.
- Korttelien poiminta värin mukaan antaa rosoisen rajan (sisäpihat ovat kadun värisiä): opening + closing ennen kuvaa, hienosäätö vasta tilaukseen.
- zsh: `echo ====` kaatuu =-laajennukseen; käytä `echo ----`.
