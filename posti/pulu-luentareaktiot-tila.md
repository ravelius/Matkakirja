# Pulu — yhteinen tilakortti

## 12.9.2026 — PR2273 READY: karttaleijunta

Head 0aff81e57090b0ee736511c199965f169e4db83d, puu 67f4b2cbfc6ecf519e8f779e7de694316086c867. CI34648829929 SUCCESS; 2988 pass / 0 fail / 13 skip; kohteet 102/102. Pulu nousee kameran liikkeestä (100 ms lukevat näytteet, myös inertia), 260 ms nosto noin 12 px, jalat sisään/siivet/maahan jäävä varjo. Pysähdyttyä 500 ms viive + 280 ms lasku; uusi liike jatkaa ilmasta. Tärkeämmät kohtaukset, puhe, chat, luenta, pulla ja reduced motion voittavat; elinkaaren siivous. Chrome oikea peli paikallisin ehdokastiedostoin 834×1194 ja 393×852 pan/wheel/laskeutuminen/reduced PASS; 393×852 lisäksi kahden sormen kosketusnipistys PASS; 0 JS-virhettä, kuvat katsottu. Ei fyysisen iPad/Safarin tai julkaistun asennetun sovelluksen readbackia. READY-posti ca0d3651e94a3989ac466e84a4a06e6a4a6f5e15. Seuraava siirto Fable: tarkistus/versionosto/julkaisu/Raamattu. PR2269 on jo mainissa v1782 / fbc94b8c; sen alla oleva READY on historiallinen.

## 11.9.2026 — PR2269 READY: satunnainen kartan nokkiminen

Head aa5712e3681820abf27f84211681c0ac6c81d403, puu 2f47b76ce3f6b13b4bfb7a558aee4eb9599894bd. CI34644605816 SUCCESS; 2909 pass / 0 fail / 13 skip; kohteet 88/88. mapPeck 2500 ms, kaksi maahan ulottuvaa nokkaisua, vähintään 30 s toimettomuutta, ei peräkkäisiä toistoja. Pelaajan toiminta, puhe ja näkymien elinkaari voittavat; reduced motion ei animoi. Chrome 834×1194 oikea Ateenan kartta paikallisin ehdokastiedostoin: 37041 ms lepo, wheel-keskeytys ja chat PASS, 0 JS-virhettä, kuvat tarkastettu. Ei fyysisen iPadin tai julkaistun asennetun sovelluksen readbackia. READY-posti e3ab37b8bcc743fb5dda03261e5bc9ca89c1574b. Seuraava siirto Fable: tarkistus/versionosto/julkaisu/Raamattu. PR2264 on nyt mainissa 76ce21f6 / versionosto 0aa63d56 (v1780), sen alla oleva READY on historiallinen.

## 11.9.2026 — PR2264 READY: chat-pikapyrähdys + puistelu vastatessa

Head1ecf91703504b853760bb8b0518e2bf7c1e7dfa1, puuf79cfcd0e6f330f8fb4d1268f7f70cbcc7fae7ec, CI34630854952 SUCCESS.2871pass/0fail/13skip, kohteet76/76. Lintu ulos165ms, pilvi300ms, paluu≤100ms, kotona puistelu1400ms vastauksen päällä → kirja. Earlyanswer0/40/120/320/3000ms, stale/close/hidden/reduced/rAF cleanup. Oikea chat+fixture Chrome tablet4/4PASS (SSE/JSON/cancel/reduced); kotona24/111–114/3ms vastauksesta;0JSvirhettä. Ei julkisen tai fyysisen iPadin readback. READY-posti 7a4b2aa1ac00c80dc681ba0d8552087126bcde4f. Fable: tarkistus/versionosto/julkaisu/Raamattu. #2258 julkaistu mainiin v1775:ssä, alempi READY-rivi on historiallinen.


## 11.9.2026 — PR2258 READY: valkoinen Pulu-neliö noston/chatin päällä

Head e0dbf6f93744107a52f7c08ca6a41af394868c9a, puu94d978e6bd0fcafd6d952bf46214a626d83332c8, CI34620674606 SUCCESS,2804pass/0fail/13skip. Vain Pulun CSS-vuorovaikutustilat ja regressiotesti. Todellinen Topkapın nosto+chat ennen/jälkeen Chrome tablet834×1194touch PASS; hover/active/focus/48px/sulku/lehti/kartta,0JSvirhettä. Ei fyysisen iPadin tai julkisen sovelluksen readbackia. READY-toimitus 1f619a21b9ce478e8d1caff7e33d3f97f6afaf86. Seuraava siirto Fable: tarkistus/versionosto/julkaisu.


Päivitetty 11.9.2026. Ylläpitäjä Codex. Julkaisuvastaava Fable; Codex yhteensovitus, integraatio-QA ja julkinen readback.

## Uusin tila 11.9.2026 klo 17.33 — PR2253 pullariemu READY

Head aa49f483e4ecce20f909c7c320525ee936db2148, paikallinen/remote puu 962187788f5939af37f22d90a549b38a01a9baa2. CI34610473537 SUCCESS. Kohdetestit71/71, koko sarja ennen viimeistä geometriatestiä2799pass/0fail/13skip; lopullinen koko sarja CI:ssä vihreä. Kaksoisavaimet/niputus/standalone OK.

K: yhteinen onnistunut pullaOstosnappi→bunGranted→bunFeast kaikissa kaupunkilehdissä (myös saman apufunktion sähkeen pullamaksut). Ei nimi-regexiä, ei hinta-/tekstimuutoksia. T: oikeat Chrome kandidaattilähteen UI-maksut Madrid(makea pulla), Pariisi(brioche), Madrid reduced; kolme puraisua, kiitoskupla ei katkaise,25£ kerran,0JSvirhettä. Lopullinen maskigeometria uusittu Madridissa. EI julkisen/asennetun uuden version readbackia.

Äänipyyntö db023d51: hihkaisu460ms, puraisut1564/2208/2852ms, tyytyväisyys3818ms. Uudet äänet eivät vielä ole tuotettu/kytketty. Fable / Opus omistaa niiden generoinnin, sound.js:n, versionoston/julkaisun ja Raamatun. Visuaalin READY-toimitus 18aabef2cd391213572a69fae0a18f4b8eab9b7d.

Korjaus alempiin historiallisiin READY-riveihin: Fable julkaisi #2239 ja #2246 v1765:ssä (6574a07b/b2919ef7, versioPR2247). Pohja fc895bbb sisältää ne. Julkisen sovelluksen v1765-käytösreadback yhä erillinen avoin tehtävä. Alempi teksti on aiemman toimitushetken historiaa.

## Julkaistu ja takaisinluettu

- v1757 / PR2227 / main1f154831: Marseille-luentareaktiot 6/6 + loppunauru. Pages34586623327 SUCCESS, julkinen luonnollinen luenta6/6, neutraali lopuksi, 0JS-virhettä. 2642pass/0fail/13skip.
- v1758 / PR2234 / main278f1a4f: lehtiaiheet/sävy, yksi aarreilo, pankkiapu, laukku, pitkä odotus ja rauhalliset joutoeleet. Pages34587530069 SUCCESS, julkiset SHA:t + todelliset UI-polut normal/reduced. 2654pass/0fail/13skip.
- v1759 / PR2235 / main81bb0006: visan viimeinen yritys/lukitus/rosvovoitto/-tappio ja matkat. Pages34588814933 SUCCESS, viiden tiedoston SHA:t, julkiset visa4polkua+nopea5msvaroitus→lukitus, matkat4elettä, nopea Ruoka→Kaupunki548ms, Marseille6/6+neutraali PASS; 0JSvirhettä. Linssistä K/event, EI näkyvän eleen T:tä (samanaikainen Tietäjätaso-puhe voittaa). 2664pass/0fail/13skip.
- v1762 / PR2238 +2241 / main7b13f8a4: kiireinen ensiliito valintakartalle, puhe lennossa, pieni kompurointi, index4 Viisas Pöllö -muotokuva. Pages34594802873 SUCCESS; 8 julkista SHA-täsmäystä, myös alpha-PNG. Public ilman overlaytä 10/10: audio-on, normal393, koko muotokuva, reduced320, earlyAPI, näkyvän canvas-kohteen valinta, hidden/pagehide/destroy, reduce kesken liidon; 0JSvirhettä. Avaus-1 soi ennen laskua; 3 media-lisäajoa 22–28ms pyyntö→playing. Ensimmäinen epäonnistuminen ei toistunut; hitaan metadatan ajastinreuna erillinen huomio.

## Julkaisuvalmis

PR2239 READY, remote49c03c2484ce6a5f24748b12193387cbbc02d8e8, testattu puu f662b1f171c844f0fe392297d31d8373a0a53711 v1762-pohjalla. Vain visa.js + tests/pulu-kohtaamistagit.test.mjs. Producer f0d98f2d nyt mainissa. 2745pass/0fail/13skip, CI34596083456 SUCCESS. Kairo tervehdys/väärä vastaus ja Praha kaaritervehdys/laataton kaariaarre: neljä aitoa Game/UI-polkua, tagi+pose+dedupe, 0JSvirhettä. Muut kaupunkitagit K/yksikkötestit, EI kaikkien selain-T. Seuraava siirto Fable: versionosto/yhdistäminen/julkaisu.

## Julkaisuvalmis: PR2246 — alkulento, kuplamuisti ja chat

READY, remote 0e43fb010b519d4d51736248007691c48a94b024, paikallinen f7f82648, testattu puu d1cc5eebebc34596b519d8e18fb4582f8f19aef5. Main v1764 f69387ab yhdistetty; ei versionostoa. CI34600161883 SUCCESS, 2786pass/0fail/13skip; kaksoisavaimet/niputus/standalone-build/diff-check PASS. Etäpuu takaisinluettu identtiseksi.

Omistajan tilaukset toteutettu: Pulu poissa aloituslennon ja Ateenan pikaesittelyn ajan; traileriväistö ja varovainen paluu, kuplat trailerilopun taakse; Kantsuu-ohje pois näkyvästä sarjasta ääniavaimia siirtämättä. Kuplat piiloon3s puheenlopusta/karttavedosta, plusmini palauttaa viimeisen saman kontekstin kuplan, Pulu avaa chatin. Automaattiset kuplaviestit pois näkymähistoriasta, data säilyy.

Kaikki52 odotusrepliikkiä exact-elekartassa (36yleistä/9vastaus/7pitkää), uusi bookStudy+lasit. Pyyntökohtainen lähtö/vastauspaluu, ehdotushaku→kysymys-race, speech start/end, hidden/pagehide, reduced, close/peru/stale suojattu. Fallback-JSON ei laukaise hyväksyttyä vastausta; SSE voi palata ensimmäisestä sisältöpalasta. Ei sanakohtaisen forced alignmentin väitettä.

K/T: aito v1764-normal alkuvalinta→lento→traileri→paljastus2kuplaa→isoisän luonnollinen loppu PASS571näytettä,0ennen­aikaista lintua/kuplaa,0JSvirhettä; reduced/skip/destroy3/3 aiemmalla integraatiolla. Aito Ateena-kartta veto/hover44px/kuplan näkyvä palautus/Pulu-chat PASS. Fixture-chat4/4 SSE/JSON/reduced/closecancel:9s vaste, poissa yli6s, oikea token tuo vastauksen mukana kirjan kanssa, ei myöhäistä paluuta perutusta;0JSvirhettä. Tuotanto-AI:n sisältölaatua ei testattu fixturellä. Kaikkien52 rivien K, ei52 erillisen selaintilanteen T-väitettä.

Rajaus: Codex livia-eleet/svg/tilanteet/puhetila/livia.js/pollo/pulunCSS, ui.js vain startFlight ja saapumiskuplaportti. Ei renderFact/fokusvirta/luenta/saapumistraileri-tuottajan/sisältö-/Raamattu-edittejä. Ei uutta rasterimediaa/ääntä.
READY-toimitus Fablelle 0a5010db1198ec0e0851d86dfd2059c1080155cc, varsinainen tiedostosisältö takaisinluettu.
Seuraava siirto Fable: versionosto/yhdistäminen/julkaisu. EI vielä julkaistu eikä julkista readbackia tälle erälle.

## Fable ja muut rajat

Fable: Raamattu/reaktiorekisteri/sisältö/saapumistraileri/fokusvirta/luenta. Rekisterin tarkat v1757–1759 K/T-rivit omassa postissa64fda2cc (korjattu sisältö tiedostoon03fb933e).
Fablen45toisen luentakuvan tilauksen omistaa olemassa oleva kuvatuotantotehtävä; kuittaus1fada1fe. EI käynnistetty päällekkäistä media-ajoa tässä Pulu-tehtävässä.
Kaikkia rekisterin D-rivejä ei kuitata toteutetuiksi.

## Avoimet laatuhuomiot

Standalone rakentuu ja DOM-ready-rakennekoe käynnistää pelin/Pulun0JSvirheellä; virallinen load-event savuke30s ulkoisen äänen aikakatkaisu edelleen erillinen, ei väitetä läpäistyksi.
Hidas Pulu-audio ilman metadataa voi ylittyvän kuplan lukuajan jälkeen peruuntua seuraavan rivin tieltä. Public4uusintaaPASS; rajattu event-pohjainen lisäodotus ehdotus, ei lähdekorjausta tässä erässä.
