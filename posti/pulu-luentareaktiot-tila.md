# Pulu — yhteinen tilakortti

Päivitetty 11.9.2026. Ylläpitäjä Codex. Julkaisuvastaava Fable; Codex yhteensovitus, integraatio-QA ja julkinen readback.

## Julkaistu ja takaisinluettu

- v1757 / PR2227 / main1f154831: Marseille-luentareaktiot 6/6 + loppunauru. Pages34586623327 SUCCESS, julkinen luonnollinen luenta6/6, neutraali lopuksi, 0JS-virhettä. 2642pass/0fail/13skip.
- v1758 / PR2234 / main278f1a4f: lehtiaiheet/sävy, yksi aarreilo, pankkiapu, laukku, pitkä odotus ja rauhalliset joutoeleet. Pages34587530069 SUCCESS, julkiset SHA:t + todelliset UI-polut normal/reduced. 2654pass/0fail/13skip.
- v1759 / PR2235 / main81bb0006: visan viimeinen yritys/lukitus/rosvovoitto/-tappio ja matkat. Pages34588814933 SUCCESS, viiden tiedoston SHA:t, julkiset visa4polkua+nopea5msvaroitus→lukitus, matkat4elettä, nopea Ruoka→Kaupunki548ms, Marseille6/6+neutraali PASS; 0JSvirhettä. Linssistä K/event, EI näkyvän eleen T:tä (samanaikainen Tietäjätaso-puhe voittaa). 2664pass/0fail/13skip.
- v1762 / PR2238 +2241 / main7b13f8a4: kiireinen ensiliito valintakartalle, puhe lennossa, pieni kompurointi, index4 Viisas Pöllö -muotokuva. Pages34594802873 SUCCESS; 8 julkista SHA-täsmäystä, myös alpha-PNG. Public ilman overlaytä 10/10: audio-on, normal393, koko muotokuva, reduced320, earlyAPI, näkyvän canvas-kohteen valinta, hidden/pagehide/destroy, reduce kesken liidon; 0JSvirhettä. Avaus-1 soi ennen laskua; 3 media-lisäajoa 22–28ms pyyntö→playing. Ensimmäinen epäonnistuminen ei toistunut; hitaan metadatan ajastinreuna erillinen huomio.

## Julkaisuvalmis

PR2239 READY, remote49c03c2484ce6a5f24748b12193387cbbc02d8e8, testattu puu f662b1f171c844f0fe392297d31d8373a0a53711 v1762-pohjalla. Vain visa.js + tests/pulu-kohtaamistagit.test.mjs. Producer f0d98f2d nyt mainissa. 2745pass/0fail/13skip, CI34596083456 SUCCESS. Kairo tervehdys/väärä vastaus ja Praha kaaritervehdys/laataton kaariaarre: neljä aitoa Game/UI-polkua, tagi+pose+dedupe, 0JSvirhettä. Muut kaupunkitagit K/yksikkötestit, EI kaikkien selain-T. Seuraava siirto Fable: versionosto/yhdistäminen/julkaisu.

## Aktiivinen erä: aloituslento ja traileriväistö

Omistajan uusin rajaus: valintakartan ensiliito säilyy, mutta Pulu poissa Ateenaan lennon ja pikaesittelyn ajan; paluu vasta esittelyn jälkeen. Isoisän luennan jälkeinen Kantsuu klikata -kupla pois.
Codex omistaa livia-eleet/svg/tilanteet sekä livia.js:n kuplapoiston ja minimaalisen ui.js startFlight-elinkaaren/saapumiskuplien odotuksen; EI renderFact/fokusvirta/luenta/trailerituottajan edittejä.
Sopimus: startFlight {vaihe:alku|loppu|peru,tunnus,kaupunki,odottaaTraileria}; trailer {kirjaimet|loppu|peru,sama traileritunnus}; paluu seuraavasta matkakirja-narrationista traileriloppu jälkeen tai 3s varalla. Piilotus säilyy vaiheiden välissä, stale/peru eivät palauta.
Tuottaja ja peru kuitattu Fable d0277098, mainv1762. Codex-ehdokas yhteensovituksessa ja aidon ensipelipolun QA edessä. EI valmis/julkaistu vielä.

## Seuraava erä: kuplat ja chat

Omistajan täsmätilaus 03bdc65a + jatkot tässä keskustelussa:
- kupla piiloon 3s PUHEEN lopusta tai kartan todellisesta liikkeestä;
- pieni plus-mini-kupla Pulun vas.yllä palauttaa viimeisen kuplan; Pulu avaa yhä chatin;
- automaattiset kuplaviestit pois chatin näkymähistoriasta, varsinaiset viestit ja data säilyvät;
- kaikki nykyiset odotustekstit täsmämäpätään tarkoitukseen sopiviin eleisiin, muutama uusi tarvittaessa;
- pöllöltä kysymisessä käynti asioilla, paluu vastauksen kera; kysymyskohtainen elinkaari;
- tietäväinen rauhallinen chat-perusilme/kirjan selailu ja sisältöön sidotut reaktiot.
Codex-agentit: pollo.js/pulunCSS-kuplakytkennät, eleet/svg/tilanteet-chat, read-only kaikkien tekstien kartoitus. Ei tarinatekstin/äänien generointia. EI vielä valmis/julkaistu.

## Fable ja muut rajat

Fable: Raamattu/reaktiorekisteri/sisältö/saapumistraileri/fokusvirta/luenta. Rekisterin tarkat v1757–1759 K/T-rivit omassa postissa64fda2cc (korjattu sisältö tiedostoon03fb933e).
Fablen 13:25UTC uusi45toisen luentakuvan tilaus reititetty olemassa olevalle kuvatuotantotehtävälle omistajuuden varmistamiseen, EI käynnistetty tässä Pulu-tehtävässä.
Kaikkia rekisterin D-rivejä ei kuitata toteutetuiksi.

## Avoimet laatuhuomiot

Standalone rakentuu ja DOM-ready-rakennekoe käynnistää pelin/Pulun0JSvirheellä; virallinen load-event savuke30s ulkoisen äänen aikakatkaisu edelleen erillinen, ei väitetä läpäistyksi.
Hidas Pulu-audio ilman metadataa voi ylittyvän kuplan lukuajan jälkeen peruuntua seuraavan rivin tieltä. Public4uusintaaPASS; rajattu event-pohjainen lisäodotus ehdotus, ei lähdekorjausta tässä erässä.
