# A3/A5 lähteet ja tuotanto

Tilauksen omistaja: Matkakirja / ravelius. Tuottaja: Codex, Tripo 3D -sessio.
Tilaus: Pelikoodarin juoksupelin osat 215, commit 084f144e819e2a39b546911df1674d2d6a80cf28.
Rajaukset: portti-06/2-baoding-paviljongit.png ja portti-06/9-kaidepylvaat-terassi.png.
Niistä tehtiin kaksi uutta eristettyä havainnekuvaa OpenAI imagegenillä, yksi kuva per esine.
Kuvien alkuperäiset tiedostot ja SHA-256:t on merkitty MANIFEST.jsonin assets-tietoihin.
Kyseessä ovat pelimallien tulkinnat, eivät valokuvamittaukset tai museon hyväksymät rekonstruktiot.

3D: omistajan Tripo Max -tili, H3.1, Ultra Mesh, kolmioverkko, tavoite 5000 kolmiota,
2K PBR, Remove Lighting päällä, AI Complete pois. Yksi generointi per esine, 45 + 45 = 90 krediittiä.
Käyttö perustuu omistajan tilaukseen ja hänen Tripo/OpenAI-tiliensä ehtoihin; ei ulkopuolista ladattua 3D-mallia.
Job-id:t: baoding 5a2b7268-0ada-428b-979d-1fada509b34a;
marmoripylväs 9fbfac1d-cafc-4aea-82d1-4a888a74b04a.

Paikallinen työ: yhtenäinen mittakaava ja pohjan keskipiste sovellettu POSITION-dataan;
UV:t, indeksit, normaalit ja upotetut tekstuurit säilytetty. Kulta metallicFactor=1,
marmori metallicFactor=0. Tekstuurit on myös purettu erillisiksi, tavut muuttumattomina.
Esikatselut: kevyt CPU-piirtäjä, perusväri ilman valaistusta. Ei raskasta renderöintiä.
Ei animaatioita eikä luurankoa. Vastaanottajan tarkistus, PBR-valo, kokoaminen ja peliin kytkentä ovat erillisiä vaiheita.
