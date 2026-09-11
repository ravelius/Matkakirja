# Pulu — yhteinen tilakortti

Päivitetty 11.9.2026. Ylläpitäjä Codex. Julkaisuvastaava Fable; Codex yhteensovitus, integraatio-QA ja julkinen readback.

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
