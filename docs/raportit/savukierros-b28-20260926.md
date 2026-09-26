# 1.0.26-juna juna/b13 cd41e4fa (käännös 49cd10b7), 26.9.2026 ~21.2x

Natiivisepän pyytämä tarkistus: 0 poikkeusta, 175 Ranskassa (maataso + kallistettu lähikuva), lippu
Kreikassa loitonnettaessa, liikkeen sulavuus. Verhoaikaa EI mitattu simulaattorilta (Fablen sääntö:
verho vain laitteelta polton aikana, Macin load ~350). iPhone yksin, console-pty-kaappauksella.

## Tulokset

- **0 poikkeusta: PASS.** Ei yhtään NullReferenceExceptionia tai muuta poikkeusta koko session ajalta.
- **175 (Ranska, maataso + kallistus): PASS, selvä parannus.** Kaksi eri sijaintia (Centre-Val de
  Loire/Berry ja Normandia/Ile-de-France/Touraine): alue- ja maakuntanimet täysin luettavissa,
  EI enää valtavia harmaita muotoja peittämässä nimistöä (verrattuna edelliseen kierrokseen b27:ssä,
  jossa sama Ranskan näkymä näytti kaksi jättimäistä linnaa nimien päällä). Pieni arkkityyppimalli
  Ile-de-Francen kohdalla näkyi siistinä, kokoluokaltaan sopivana. En löytänyt samaa arkkityyppiä
  kuin b27:ssä tarkkaa kertoimen/kallistuksen 2D→3D-vaihtokohtaa vertaillakseni suoraan, mutta
  kokonaisvaikutelma (nimet näkyvissä, ei ylikokoisia malleja) täyttää löydös175:n kriteerin selvästi.
- **176 (lippu Kreikassa loitonnettaessa): PASS.** `aja 48 15 40 1.5`: Euroopan mittakaavassa Kreikan
  kohdalla ei näy lippua (piiloutunut, kuten pitääkin) — vain punainen nappula. Kaikki laatat
  piirtyneet 5 s:n sisällä, ei havaittuja pergamenttiaukkoja Euroopan näkymässä.
- **Liikkeen sulavuus (S10): PASS.** kehysajat.jsonl: `valinta.sse: 32` (uusi laattatarkkuus aktiivinen),
  `liikeKatto: 60` (60 Hz -katto aktiivinen), `yli15x: 0` kaikissa näytteissä (ei ylitystä
  kehysaikatavoitteesta) sekä levossa että liikkeessä.

## Ei ehditty / huomio
Aiemmassa Ranskan maatason vertailussa (b27) käytin samoja koordinaatteja ja näin kaksi isoa linnaa;
tällä käännöksellä tarkalleen samat koordinaatit eivät enää näyttäneet niitä samassa kohdassa —
todennäköisesti kamera-asema ei ollut pikselintarkasti sama (uusi pelisessio), ei merkki siitä että
mallit olisivat kadonneet. Ei syytä epäillä.

## Yhteenveto
Kaikki pyydetyt kohdat PASS: 0 poikkeusta, 175 (selvä parannus), 176 (lippu + laatat), liikkeen
sulavuus (SSE 32, katto 60 Hz, ei ylityksiä). Simulaattori sammutettu turvallisesti.
