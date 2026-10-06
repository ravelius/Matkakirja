# Juna 152 lyhyt savu f9e4032c (app 7e91ce76) — OK (19.04–19.08, iPhone-sim 1572C658, mykkä)

TODISTUS.md: `/Users/Shared/Claude/proto-3d/lokit/todistus-juna152-20261006-1904/TODISTUS.md` (kopio `todistus-juna152-f9e4032c-20261006.md`). Ensikäynnistys tyhjennetyllä simulla (kartta näkyi ~50 s). **0 Exception, 0 VIRHE-riviä, 0 kaatumista.** Testimykistys natiivi päällä.

**TULOS 152 (f9e4032c, app 7e91ce76): OK — käynnistys, kartta, ISS-ohjaamo + uusi asettelu, opas (aloitusvalikko → Amsterdam, PCM-ääni) ja Poistu → kartta ehjänä; 0 Exception, 0 kaatumista.**

| Kohta | Tulos |
|---|---|
| Käynnistys, kartta (Liiku näkyy), mykistys, asetukset datana | OK |
| Satelliittilinssin taulu | OK: "Minne katsotaan?" Maapallo / Astronauttien kuvat / ISS-ohjaamo / Poistu + "Kysy Pululta" (`juna152-f9e4032c-taulu.png`) |
| **ISS-ohjaamo (Cupola) + juliste** | **OK**: Cupola-ikkuna (−13 % LS2 -muutos) ja Maa horisonttina, LCD "ST. CLOUD / YHDYSVALLAT", kiihdytys-liukusäädin, LAAJA/TELE, kamera-nappi, suunta-joystick, astronautti-Pulu (`…-iss-ohjaamo.png`). **Julkaisun "ISS-juliste" (kuvapohjainen)**: ohjaamon alapaneeli = uusittu asettelu, ei päällekkäisiä elementtejä |
| Kartta ISS:n jälkeen | OK |
| Opas auki oikealla napautuksella | OK: `tap-teksti Eurooppa → Alankomaat → Amsterdam`, loki `opas: täkyt 50`, `opas: kohde Amsterdam (52,352, 4,915)`; valinta sulki valikon |
| Oppaan ääni (PCM) | OK: `aani mittaa` rms **0,103** huippu 0,698 `[opas-pcm]` |
| **Poistu linssistä → kartta ehjänä** | **OK** (`…-kartta-oppaan-jalkeen.png`): laatat, nimet, Liiku, Pulu |
| Googlen 429 (LS1 -uusinta) | Ei 429-rivejä lokissa (ajo oikealla Pöllöllä/Googlella) |
| Ei testattu | ISS-julisteen kuva erikseen (S2-jatko v2f, ISS-kuvan kehitys), Cupola −13 % mittaus (kuormaton A/B), Kysy/Liiku, linna |
