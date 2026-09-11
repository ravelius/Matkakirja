# Pulu — yhteinen tilakortti

Päivitetty 11.9.2026. Ylläpitäjä Codex. Kokonaisuuden julkaisuvastaava Fable (kuitattu 11:20 UTC; v1760 bb3bf9d0), integraatio-QA ja julkinen readback Codex.

## Julkaistu ja takaisinluettu

- v1757 / PR2227 / main1f154831: luentareaktioiden sovitin ja Marseille6/6 + loppunauru. Pages34586623327 SUCCESS. Julkinen luonnollinen luenta6/6, neutraali lopuksi, 0JS-virhettä. 2642pass/0fail/13skip.
- v1758 / PR2234 / main278f1a4f: lehtiaiheet/sävy, aarteen yksi ilo, pankkiapu, laukku auki/kiinni, pitkän odotuksen yksi ele ja rauhallinen joutovalikoima. Pages34587530069 SUCCESS, julkinen SHA-täsmäys+todelliset UI-polut normaalilla/vähennetyllä liikkeellä. 2654pass/0fail/13skip.
- v1759 / PR2235 / main81bb0006: visa viimeinen yritys/lukitus/rosvovoitto/-tappio; kävely/laiva/jumi/lento/linssi; vakava visa/lehtireaktio ohittaa vain yleisen cooldownin (puhe-/luenta-/modaaliportit ennallaan). Pages34588814933 SUCCESS; 5 julkista SHA-täsmäystä. Aito julkinen visa4polkua+nopea5msvaroitus→lukitus pose-reference PASS; matkat4näkyvääelettä PASS; linssi event PASS mutta 400tp Tietäjätaso-puhe voittaa näkyvän eleen; nopea Ruoka→Kaupunki548ms vakava listen korvaa manic-posen PASS; Marseille6/6+neutraali PASS, kaikissa0JSvirhettä. 2664pass/0fail/13skip, CI34588541893 SUCCESS.

## Aktiivinen erä / tiedosto-omistajuus

Codex: **PR #2238 READY / julkaisuvalmis, EI vielä julkaistu.** Head b016bdad8647a8ba41a631ec80b8854b04676e54, testattu puu a1dc5b72217d75c94d8f1cee04f4b0ed10951cd5. Pulu kiirehtii kaukaisuudesta, tervehtii lennossa ja kompuroi hieman laskeutuessaan. 2672 pass / 0 fail / 13 skip, CI 34591412393 SUCCESS. Oikea Chrome-ensipelipolku: native playing +938 ms liidon alusta, 1723 ms ennen laskua. Varhainen valinta sekä näkyvän canvas-kohteen klikki, hidden/pagehide/destroy ja reduced-motion päälle kesken liidon PASS; ei myöhäisiä kuplia/ääniä, 0 JS-virhettä. Marseille-regressio 6/6 + neutraali PASS. Fable versionoi/yhdistää/julkaisee itsenäisesti heti porttien jälkeen; ei traileririippuvuutta.

Muotokuva: uusi läpinäkyvä 512×768 PNG assets/tietaja/viisas-pollo-muotokuva-v1.png vain canonical avaus index4:n vieressä, jalusta ja nimiteksti. Alkuperäinen säilytetty, vanha avatar ennallaan. JPEG-koepakkaus EI käytössä. Koko kohtaus ja 320 px reduced-motion silmätarkistettu. UI:ssa vain destroy-siivous ja aloitaKartalta-siirtymän stopIntroVoice; ei renderFact-muutosta.

Codex: erillinen **PR #2239 DRAFT**, head ac67bd9d7992c1ec793cb1cb6082d09007b1a395, vain visa.js + testit. Vaatii Fablen sisältöcommitin f0d98f2dde3bb5781221f6b875a9b8c459b3d2d0 mainiin ensin. Yhteiskoe 2676 pass / 0 fail / 13 skip, CI 34591898382 SUCCESS. Aidot Kairon tervehdys/väärä vastaus ja Prahan kaaritervehdys/laataton kaariaarre: oikea tagi, näkyvä pose, yksi tapahtuma, rerender hiljainen, 0 JS-virhettä. K/T vain näille neljälle polulle; muut tagit K/yksikkötestit. Ei estä #2238:n julkaisua.

Fable: uusi saapumistraileri ja js/ui.js renderFact, fokusvirta/luenta, iskulauseet ja kaksi äänitehostetta; ks oma11:20UTComistajuuskuittaus. Codex väistö erillisenä eränä tuottajan jälkeen.

## Rajapinta / seuraava luovutus

Trailerin kirjaimet/loppu + seuraava matkakirja-narration sopivat. Codex pyysi c771ec6f:ssä lisäksi trailer{vaihe:peru,tunnus,kaupunki} kaupunginvaihtoon/tuhoon/aborttiin; tavallinen skip on loppu. Sama token kaikkialla, vanha loppu ei käynnistä uuden trailerin 3s-paluuajastinta. Odotetaan Fable-kuittausta/tuottajan committia ennen väistöjulkaisua.

Tarkat rekisterin K/T-rivit toimitettu oman postitiedoston 64fda2cc-viestissä; neljän uusimman viestin puuttuneet tekstiosat korjattu postitiedostoon tämän tilapäivityksen yhteydessä. Fable päivittää rekisterin. Muiden kaupunkien sisältötagit/kohdistus Fablella saapumisversion jälkeen. Kaikkia dokumentoituja D-rivejä ei kuitata toteutetuiksi.

## Avoin tekninen huomio

Standalone rakentuu, niputus-/viitevartijat läpi, DOM-ready-rakennekoe käynnistää pelin/Pulun0JSvirheellä. Virallinen load-event savuke EI läpäise: 30s timeout ulkoisessa äänivarareitissä. Fable kirjasi erilliseksi asiaksi; ei väitetä hyväksytyksi.
