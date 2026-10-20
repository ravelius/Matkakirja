# Päätoimittajan luovutus 16.10.2026 klo 03.2x (konteksti 30 %; tili vvi@vvi.fi)

PT local_5df52e10-10e4-4b72-9554-0049db300dfe, KK local_dfa7296a-d3d3-41ef-a2b1-dbc42a652589. Id:t /Users/Shared/Claude/osoitekirja.md. Asemataulu https://claude.ai/artifact/Qo5w6Wk4JSYRwYbyf2fJrm; talo/junat v25 (PT vie itse, paikallinen kopio scratchpad/asemataulu/data/talo/junat.json päivitetty).

## 0. Heti aluksi
RC päälle, odottajavahti-Monitor, get_usage self. KK on odottanut omistajaa klo 00.46 lähtien (kortit kesken, omistaja ilmeisesti nukkumassa) → KK:lle jonotetut viestit etenevät vasta omistajan vastauksen jälkeen. ASEMATAULUN HOITAJA nollattu 02.02 eikä luo croneja ennen KK:n "OMISTAJAN PÄÄTÖS klo 23.35" -riviä (PT pyysi KK:ta 01.5x, Postivahti 02.11/02.31) → taulun mittarit seis 01.58; PT päivittää talo/junat itse. Levy 30 Gi 03.0x (laski L2-käännöksen aikana, kuten 23.2x); raja < 22 Gi → L2 seis.

## 1. JUNA 196: OMISTAJA PYYSI JULKAISUA klo 00.31 (ehdollinen)
Sanatarkasti: "Julkaise juna kun kaikki pyyntöni valmiina. Ei testejä". Loki #4689, #4690, #4692. Muistiajoa EI (EI TESTEJÄ JUNAAN 15.10. 09.36). NS ja Julkaisija tietävät: lukitus vain PT:n "LUKITSE 196". Web-PR:t lukitushetkellä: #4629 (apurahapallo), #4685, #4691 (merinostot + 22 Pulun vastausta 82–103, faktat korjattu). Pekingin PT284 v2 piilossa ämpärissä (Julkaisija 00.42).
Runko 196 = e12fad7bf (NS, testit vihreät). Tarkistuslista Asemataululla (Juna 196). KUITATTU ☑: Peking-testi, kippi (b43c288ce), korostus-maa, etsimen kipinäsumu (a0f1f82a0), merinostot + Pulun 81 äänitettyä vastausta (f7ffbff4d, MeriNostot päällä), kohtaamiskysymys + tuplanapautus + Mac-hipaisu (59b2068b5; Mac ei todennettu, omistaja näkee TF:ssä), revontulet-skanneri (4249f09a7), S2-häivytys (b5b1bb275), lehden vieritys (NUI 122169f34, ei vielä NS:lle kuitattu – kuittaa yhdessä NUI:n erän kanssa).
AUKI ☐:
- ISS-efektit (Valoseppä): salamat/perseidit/auringonnousu-videot VIETY KK:lle 02.0x (odottaa omistajan korttia); raketin väreily v3 + mustat kolmiot T+2:31 (Valoseppä korjaa samassa erässä) → video PT:lle → KK.
- 9 kortin kohokohdat (NUI): kuvat VIETY KK:lle 02.2x; tarttuva otsikko korjattu b5a27cbd4.
- Minipallo + aarre (NUI 94377c6ea): korjattu hakunimen luettavuus ja aarrepiste selväksi → iPhone-kuvat PT:lle → minipallo KK:lle. Sitten NUI-erä (122169f34 + b5a27cbd4 + 94377c6ea) NS:lle.
- Intro-fps: ei mitattavissa simulla (kuorma) → hyväksy koodina ellei NUI löydä muuta.
- Peruskartan neliöt (KS): maailma-sarja valmis, vienti Julkaisijalla 03.15 → b8167585d NS:lle ämpärin jälkeen.
- Taidemuseo (PK 4eb11bcbc: pause/Kuuntele, auto zoom kaikki salit SK 9d5e51692, kävely V2 + askeleet parketti v2 / marmori v2b): L2 → video PT:lle → KK → kytkimet päälle vasta omistajan hyväksynnällä.
- KORTIT omistajalla (KK): PULU-MERET-2 (22 uuden vastauksen äänitys, suositus kyllä) ja KIPPI-ESILATAUS (Googlen ehdot kieltävät koko reitin esilatauksen; suositus "seuraavaan pysähdykseen asti").

## 2. Muuta tältä vuorolta
- 00.40 omistaja: Pulun merivastaukset valmiit + äänitetyt (81 kpl, lupa vain tälle määrälle). Äänittäjä teki 80 ottoa (79 = 77), Whisper-tarkistus ok (matalimmat 20, 53, 64, 75).
- 00.33 Unity-beeta: b5 jo rungossa; jatkossa uusi beeta suoraan avoimeen junaan automaattitarkistusten jälkeen.
- Pelikoodarin vuoro pysäytetty 01.0x (49 %, ei luovuttanut 36 min) → luovutti ef46b4147.
- Muistikorjaus: julkaisu-vasta-omistajan-pyynnosta.md (muistiajo pois).
- Lepäävät ilman erää (syy kirjattu): SK, Äänittäjä, SS (odottavat PULU-MERET-2-korttia), LR (Valosepän Louvre-pari videoiden jälkeen), LS1 (jono tyhjä).
