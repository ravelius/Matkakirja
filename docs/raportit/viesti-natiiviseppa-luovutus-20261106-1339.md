# Natiivisepän luovutus 6.11.2026 klo 13.39 (konteksti 27 %, 7.37)

Korvaa -1301:n SEURAAVA TYÖ:n. -1301:n "Mitä tässä sessiossa nähtiin" ja "Opit" sekä -1247:n kohta 6 pätevät. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja.
ENSIN: luo cron "4 9 * * *" (session-only, Raamattu 7.41). Skripti: /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py.
P = /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/palikkakoe. Python numpyllä ja PIL:llä: /opt/homebrew/opt/python@3.14/bin/python3 ilman -I:tä.

## Tila
- Haara natiiviseppa/palikka-koe 9669e48bf (peilissä), työpuu wt/proto-natiiviseppa-palikka puhdas. Sisältää Tripo-puut, PalikkaData-v4, korvausmittauksen, Forward-kopion, korjatun r4:n ja mittauskomennot. Palikka-testit 13/13. valmis-korvaus on käytetty, älä aja asenna.py:tä uudelleen.
- MAC-7 9669e48bf on JU:lla: P/sk-mac-7.txt, lokit lokit/natiiviseppa-palikka-mac7-9669e48bf. Tulos tulee viestinä, älä pyydä uudelleen.
- Iso iPad on vapaa, rungon laitekäännös 84872eaa9 asennettu 13.31. iPad 2 valmis, tulos KK:lla ja PT:llä. KK kertoo sen omistajalle yhdessä r4:n kanssa.
- VS:llä: pyöreiden Tripo-puiden 80 kolmion vaaleat laikut (kuva P/selvitys-mac6/rajaus-puut-2x.png). Laji todennäköisesti puu-3, vahvistamatta. Korjatusta commitista VS ilmoittaa; vie työpuuhun ennen iPad 3:a, jos ehtii, muuten erikseen.

## SEURAAVA TYÖ, järjestyksessä
1. MAC-7-TULOS. Katso kuvat täysikokoisina: r4-alku, -keski, -loppu, -loppu-b2. Silmä kulkee linjaa 48,8585, pituus 2,3340–2,3392 (Louvre), 157 m ellipsoidista eli 67 m kartan yllä, katse itään. PT:n ehto: rata ei saa kulkea minkään rakennuksen läpi; Eiffel ja Sacré-Cœur ovat 3–4 km sivussa, varmista kuvasta. Lue "jalki"-rivit: nostossa pitää olla 0 tai lähellä sitä, z tasainen, taaksepäin hyppiviä askelia 0 (skripti: katso kohta Työkalut), vaaka-nykäys samaa luokkaa kuin vedossa (0,07 m), nopeus enintään 60 m/s. Jos ei täsmää, älä lähetä iPadille. Kuvapari KK:lle, tiivistys PT:lle.
2. HÔTEL DE VILLEN RANTA: l-b2 ei osunut sinne (Mac-6:n kuva katsoo Panthéonilta pohjoiseen). Lisää uusi kuva seuraavaan Mac-ajoon, esim. aja 48.8570 2.3520, suunta 20. Kerrottu KK:lle. Tarkista myös c-b2:n vasemman rannan pienet tolpat vesirajassa täysikokoisena; ei ole katsottu rajauksena.
3. IPAD 3: P/ajopyynto-ipad-3.md on päivitetty r4:lle, lisää sha (lokit natiiviseppa-palikka-ipad3-<sha>) ja poista LUONNOS. Alussa A0|A0 20 12 (8 min, KK 13.16: laskeeko kuvamäärä ilman palikoita), sitten jälki r4, parit A0|KA0, A0|KB2, A0|A1 (A1 = Forward isolla iPadilla, Mobile-tasolla päinvastoin; kirjaa), B2L|B2T, lopuksi jälki oikeasta vedosta. Muut ehdot -1301:n kohdassa 4. Mittaa silmän jälki iPadilla, ilman r3:a (PT).
   Tuloksessa KK:lle: näkyykö iPad 2:n kuvamäärän lasku (55 → 44 kuvaa/s 8 minuutissa, GPU 29 → 40 ms, lämpö Normaali) myös ilman palikoita. Vertailu iPad 2:een on eri radalla: lasku palikoilla pitää katsoa r4-pareista. Tripo-puiden hinta suoraan.
4. C1 ja D2 -1247:n kohdan 6 mukaan. Forward-kopio pois listalta ennen C1:tä: RD vaatii Forward+:n kaikilla renderöijillä. Ilman renderöijän vaihtoa (KK).

## Mitä tässä sessiossa nähtiin
- TÄRINÄN SYY MITATTU (Mac-6, lokit/natiiviseppa-palikka-mac6-fe117905d): r3 asetti korkeuden 600 m lähimmän zoomin (Macilla z 146,5 / cos 85° = noin 1 680 m) alle, ja PalloKierto.NostaLahimpaan vetää korkeutta rajaa kohti kehysajan mukaan. Silmä heittää näkösuunnassa 4,15 m kehysajan millisekuntia kohti, korrelaatio −0,995 (P ei sisällä skriptiä; regressio radan pituuspoikkeama vs dt). Malli antaa 4,03 m/ms. Sama r3-nyt, r3-jaa (maastonäyte jäädytetty, nykäys ennallaan), r3h ja vanha r4. Silmä oli Sainte-Chapellen sisällä: r3-kappeli.png. Lukema oli 87–120 m ellipsoidista eli −3...+30 m kartan tasosta (90 m).
- Pelaajaa tämä ei koske: oikea veto (MacPanoroi, palikat veto) ei mene zoomin rajan alle; nykäys 0,07 m vs radoilla 2,4–3,1 m, taaksepäin hyppiviä askelia 0 vs 527–688/1 187.
- Kerrottu PT:lle: iPadin heitto on laskettu suuremmaksi, mutta sitä ei ole mitattu; PT kielsi uudet r3-ajot, joten sitä ei mitata. r2 (1 200 m) oli samassa viassa, nyt raja suojaa kaikki radat ja lokiin tulee varoitus. iPad 1:n ja 2:n luvut ovat vain saman radan sisäisiä vertailuja.
- Oma virheeni: ensimmäinen r4 nosti katsepistettä, mutta PalloKierto.Palauta purkaa katseKorkeuden (z saha 216–123 m), ja se oli yhä 600 m:ssä. Mac-6:n r4-kuvat ja -jälki eivät siis kelpaa. Älä käytä katseKorkeutta radoissa.
- Nopeus ei ollut syy: veto 0,03 ruutua/s = 62,6 m/s, 0,1 ruutua/s = 156–209 m/s lähimmällä zoomilla. Vanhan r3:n huippu 125 m/s on tavallinen veto. r4 = 60 m/s on hidas veto. Omistajan "pelaajan nopeudella" on siis täytetty, mutta rauhallinen pelaaja liikkuu nopeammin kuin r4: kerro tämä, jos tulos riippuu nopeudesta.
- Pelaajan silmä lähimmällä zoomilla on 56 m kartan yllä, siis alle Notre-Damen tornien (69 m). Tämä on pelin nykyinen tila eikä ole vika, jota PT olisi pyytänyt; rakennuksia ei läpäistä vain, kun kohdalla ei ole yli 56 m:n rakennusta. Ei ole kuvattu erikseen, ei korjausta koehaaraan.
- Näkymätön maasto: nosto laskee näyte × 2:sta, vaikka kartta on tasainen 90 m. Mitattu pelaajalla 2–13 m nostoa tasaisella alueella, enintään 0,23 m kehyksessä, Montmartrella 120 m, jossa mäki on piirretty. Pieni; PT:llä, ei korjausta koehaaraan ilman sanaa.
- Vedossa p-sivu yksittäinen 280 ms:n kehys (dt max) ja p-eteen 60 ms: Montmartren suuntaan, syy tutkimatta, Macilla. Ei viety kenellekään.
- Tripo-puut Mac-6:ssa: varjostinvirheet 0, muoto, käännös ja väri kunnossa, maalla c-b2:ssa. Palikat yhteensä 1,6–1,7 milj. kolmiota kehyksessä, korteilla 0,3 milj. KB2-ajo lokissa palikkakoe.jsonl (ei tulos).
- tyyppitarkistus.zsh antaa nyt 6 virhettä tiedostosta Valopohja.cs (ValoKohteet on Linssit-kokoonpanossa, kirjasto vanha). Ei liity Palikkaan; Unity kääntää ne.

## Työkalut
- P/sk-mac-6.txt on mittausajon malli. Komennot: palikat jalki <nimi> <s>, vaihe <0–1|pois>, maastovali <s> (25 = jäädytys jälkeen; palauta 0,4 ja odota 25 s), veto <x> <y> <s> (ruutua/s), rata r3h|r4.
- Jälkirivi lokissa: dt, nopeus, vaaka-askel, vaaka-nykäys, z-askel, z-nykäys, z ja näyte min..max, nostossa. CSV persistentDataPath/palikkajalki-*.csv.
- Nopeudet ja taaksepäin hyppivät askeleet: python3 CSV:stä, dx pituudesta × 111319,49 × cos(lat); suurin 0,5 s:n keskinopeus ja etumerkin vaihdot. Yhden rivin skripti, ei tallessa.

## Huomiot
- NS:n työpuita wt/-kansiossa 8 (raja 3): kerro PT:lle ennen poistoja.
- Canopéen välke liikkeessä edelleen katsomatta.
