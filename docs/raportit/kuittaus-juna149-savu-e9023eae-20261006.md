# Junan 149 savu e9023eae (31fa2050) — OK perus + opas, Kysy-chat-vastaus EI TODENNETTU (15.27–15.38, iPhone-sim 1572C658, mykkä)

TODISTUS.md: `/Users/Shared/Claude/proto-3d/lokit/todistus-juna149-{a-20261006-1527,b-20261006-1531,c-20261006-1534}/` (kopiot repossa `todistus-juna149-e9023eae-{a,b,c}-20261006.md`). Kone kuormassa (load 84 > 16, LS1:n muistimittaus rinnalla) → toimintatesti. **0 Exception, 0 VIRHE-riviä, 0 kaatumista** kolmessa ajossa. Testimykistys natiivi päällä. Pöllö vastasi (ei 429).

**Rivi: `juna149-savu e9023eae: OK perus + opas — käynnistys, kartta, ISS, opas (Praha, Parthenon; täky, lento, PCM-ääni rms 0,11–0,13, +7 kuvat), Kysy-paneeli ja Poistu → kartta ehjänä OK; 0 Exception, 0 kaatumista, muisti tasainen; Kysy-kysymyksen chat-vastaus ja Pulun luennan tauko EI TODENNETTU.`**

| Kohta | Tulos |
|---|---|
| Käynnistys, kartta, ISS, kartta ISS:n jälkeen; mykistys, asetukset | OK (ajo a) |
| Opas Praha (Prahan linna täky → lento → pysäkki) | OK: St. Vituksen katedraali, nimikyltti "Prahan linna", kuva-inset +7, nappirivi Kysy/Liiku/mikki/näppäimistö, ohjaintapit (`…-praha.png`); `aani mittaa` rms **0,132** huippu 0,707 `[opas-pcm]` |
| Opas Parthenon (Akropolis) | OK: pysäkki, ääni rms **0,123** |
| **Kysy-paneeli (matala chat)** | OK: "KYSY OPPAALTA" + 6 kysymystä Prahasta (Milloin Prahan linnan rakentaminen alkoi? …) (`…-kysy.png`) |
| **Kysymyksen valinta → chat-vastaus, chatin pin yläreunassa, Pulun luennan tauko** | **EI TODENNETTU**: kysymysrivin napautus (tap-teksti ja raaka (200,171)) ei tuottanut näkyvää chat-vastausta stilleissä (ruudulla vain pysäkki + nappirivi, `…-chat-ei-nakyvaa.png`); lokissa ei chat-riviä. Tarvitaan Pelikoodarin/Natiivisepän kuvaus odotetusta (rivin teksti `ui puu`:ssa vs. paneelin sulkeutuminen) |
| **Poistu linssistä → kartta ehjänä, ei tummaa vyötä** | OK (`…-kartta-oppaan-jalkeen.png`) |
| Oppaan muisti (kaatumiskorjaus a3a0ba3e) | Tasainen 2 pysähdyksessä: varattu 326→322 Mt, varaus 542 Mt, mono 343→347 Mt, tekstuurit 933→913 Mt, laattoja 776→746 (`opas: N. pysähdys, muisti`); ei kaatumista. Pitkä (≥8 pysähdystä) muistiajo kuuluu iPadille/LS1:lle |
| Noston tekstin napautus ei sulje | EI TESTATTU (nosto ei ollut osa ajoa) |
| Liiku-nappi (203,778), linna, Poistu-polku jälkeen | EI TESTATTU tässä |
