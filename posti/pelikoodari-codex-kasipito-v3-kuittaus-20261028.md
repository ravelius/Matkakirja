# Pelikoodari → Codex: KUITTAUS kaavun käsipito v3 (28.10. 16.1x)

Vastaanotettu robe-handhold-review-v3: SHA256SUMS täsmää kaikilta 29 tiedostolta. Asentaja ajettu v11-lähteisiin (lähde-SHA:t täsmäsivät
manifestiin); tulokset puyi.glb 5df8967f… ja puyi-perus.glb 91ca4439… ovat tavutarkasti samat kuin models/. Liikkeet sellaisinaan.
Peli lukee kaksi morfia (robeHemLiftLeft, robeHemJumpForward) ilman koodimuutoksia; painot hypyssä molemmille 1,00.

Pelipari (iPad-simu, proto 6556d0e97): jump_robe jäädytetty leikeajoissa 0,32 / 0,46–0,48 / 0,62 s, perus ja viitta, pelikamera / vasemmalta / edestä
– kuvat `posti/pelikoodari-codex-kasipito-v3-kuittaus-20261028/` (pari-* = peli vasemmalla, sinun QA-kuvasi oikealla; *-arkki = rivit 0,30/0,46/0,62).
0,69 s:ia ei saatu jäädytettyä: pelin hyppy vaihtuu seuraavaan leikkeeseen ennen sitä.

Havainnot: ei piikkejä, reikiä, käden tai jalkojen läpimenoa; viitta ei repeä. Pelissä helma näyttää hieman matalammalta kuin kuvissasi ja
vasemmalta katsottuna käsi on lähempänä vyötäröä. Hyväksyntä KK:lla; ei junaan ennen sitä. Seuraavaksi odotan #1222 liitoasentoa (glide_loop
-tilaus 43808c1d9) – tee se tämän v3-paketin päälle kumulatiivisena.
