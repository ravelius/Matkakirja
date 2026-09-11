# Pulu — yhteinen tilakortti

Päivitetty 11.9.2026. Ylläpitäjä Codex. Kokonaisuuden julkaisuvastaava Fable (kuitattu 11:20 UTC; v1760 bb3bf9d0), integraatio-QA ja julkinen readback Codex.

## Julkaistu ja takaisinluettu

- v1757 / PR2227 / main1f154831: luentareaktioiden sovitin ja Marseille6/6 + loppunauru. Pages34586623327 SUCCESS. Julkinen luonnollinen luenta6/6, neutraali lopuksi, 0JS-virhettä. 2642pass/0fail/13skip.
- v1758 / PR2234 / main278f1a4f: lehtiaiheet/sävy, aarteen yksi ilo, pankkiapu, laukku auki/kiinni, pitkän odotuksen yksi ele ja rauhallinen joutovalikoima. Pages34587530069 SUCCESS, julkinen SHA-täsmäys+todelliset UI-polut normaalilla/vähennetyllä liikkeellä. 2654pass/0fail/13skip.
- v1759 / PR2235 / main81bb0006: visa viimeinen yritys/lukitus/rosvovoitto/-tappio; kävely/laiva/jumi/lento/linssi; vakava visa/lehtireaktio ohittaa vain yleisen cooldownin (puhe-/luenta-/modaaliportit ennallaan). Pages34588814933 SUCCESS; 5 julkista SHA-täsmäystä. Aito julkinen visa4polkua+nopea5msvaroitus→lukitus pose-reference PASS; matkat4näkyvääelettä PASS; linssi event PASS mutta 400tp Tietäjätaso-puhe voittaa näkyvän eleen; nopea Ruoka→Kaupunki548ms vakava listen korvaa manic-posen PASS; Marseille6/6+neutraali PASS, kaikissa0JSvirhettä. 2664pass/0fail/13skip, CI34588541893 SUCCESS.

## Aktiivinen erä / tiedosto-omistajuus

Codex: omistajan uusin aloituskaupungin ensiliito. Pulu kiirehtii kaukaisuudesta, tervehtii JO LENNON AIKANA ja kompuroi hieman laskeutuessaan. Tekninen js/livia.js/js/livia-eleet.js/js/livia-svg.js + pollo.js bridge. Kaupunkivalinta/peruutus/tausta/vähennetty liike testataan. Kaanonrepliikit ennallaan.

Codex: omistajan nimenomaisesti tilaama uusi Viisas pöllö -muotokuva jalustalla ja nimitekstillä, vain canonical avaus index4:n vieressä. Kuva generoitu/silmätarkistettu, alkuperäinen säilytetty, JPEG512x768. Erillinen assets/tietaja/viisas-pollo-muotokuva-v1.jpg, EI olemassa olevan avatarin korvausta. NaytaAvauskupla/CSS/SW-integraatio työn alla. Tämä uusi tilaus sallii vain tämän uuden median aiemman pilotin rajauksesta poiketen.

Fable: uusi saapumistraileri ja js/ui.js renderFact, fokusvirta/luenta, iskulauseet ja kaksi äänitehostetta; ks oma11:20UTComistajuuskuittaus. Codex väistö erillisenä eränä tuottajan jälkeen.

## Rajapinta / seuraava luovutus

Trailerin kirjaimet/loppu + seuraava matkakirja-narration sopivat. Codex pyysi c771ec6f:ssä lisäksi trailer{vaihe:peru,tunnus,kaupunki} kaupunginvaihtoon/tuhoon/aborttiin; tavallinen skip on loppu. Sama token kaikkialla, vanha loppu ei käynnistä uuden trailerin 3s-paluuajastinta. Odotetaan Fable-kuittausta/tuottajan committia ennen väistöjulkaisua.

Tarkat rekisterin K/T-rivit kootaan seuraavaksi, Fable päivittää rekisterin. Muiden kaupunkien sisältötagit/kohdistus Fablella saapumisversion jälkeen. Kaikkia dokumentoituja D-rivejä ei kuitata toteutetuiksi.

## Avoin tekninen huomio

Standalone rakentuu, niputus-/viitevartijat läpi, DOM-ready-rakennekoe käynnistää pelin/Pulun0JSvirheellä. Virallinen load-event savuke EI läpäise: 30s timeout ulkoisessa äänivarareitissä. Fable kirjasi erilliseksi asiaksi; ei väitetä hyväksytyksi.
