# Juna 151 täysi savu 2a48148d (app 6a4d92de) — OK, siltalauseen ajoitus ja osa uusista kohdista todentamatta (17.32–17.41, iPhone-sim 1572C658, mykkä)

TODISTUS.md: `/Users/Shared/Claude/proto-3d/lokit/todistus-juna151-{a-20261006-1732,b-20261006-1735,c-20261006-1738}/` (kopiot repossa `todistus-juna151-2a48148d-{a,b,c}-20261006.md`). LS1 rinnalla (toinen simu). **0 Exception, 0 VIRHE-riviä, 0 kaatumista** kolmessa ajossa. Testimykistys natiivi päällä, Pöllö vastasi.

**TULOS 151 (2a48148d, app 6a4d92de): OK — käynnistys, kartta, ISS, oppaan aloitusvalikko (maanosat → maat → kaupungit oikeilla napautuksilla, kohteen vaihto Amsterdamiin), opas Amsterdamissa, Poistu → kartta ehjänä; 0 Exception, 0 kaatumista; siltalauseen ajoitus, suosikki-valinta, Kysy-vastaus ja Liiku-paneeli todentamatta.**

| Kohta | Tulos |
|---|---|
| Käynnistys, kartta, ISS, kartta ISS:n jälkeen, mykistys, asetukset | OK (ajo a) |
| **Oppaan aloitusvalikko ottaa napautukset (4cdf6e8f:n este)** | **OK**: `tap-teksti Eurooppa`, `Alankomaat`, `Amsterdam` löytyivät ja toimivat; loki `opas: täkyt 50`, `valikon rivi 52`, `opas: kohde Amsterdam (52,352, 4,915)` |
| Aloitusvalikon rakenne | OK: "VALITSE PAIKKA" 7 maanosaa (Aasia … Valtameret) + "Poistu linssistä" + "SUOSIKIT" (Eiffel-torni, Sydneyn oopperatalo, Central Park, Machu Picchu, Gizan pyramidit) tummalla pohjalla ilman karttaa (`juna151-2a48148d-aloitusvalikko.png`) |
| Maanosa → maa | OK: Eurooppa → maat suomeksi (Ahvenanmaa, Alankomaat, Albania, Andorra, Färsaaret, Gibraltar, Huippuvuoret …; aiemmat koodit ALD/AND/FRO/GIB poissa) (`…-eurooppa-maat.png`) |
| Maa → kaupunki → kohteen vaihto | OK Alankomaat → Amsterdam: `kaupunki vaihtuu → Amsterdam (52,367, 4,883)`, still Amsterdam (`…-amsterdam.png`); valinta sulki valikon, opas siirtyi ja kysyi "Mitä haluat nähdä Amsterdamissa?" [Esittele kaupunki / Näytä jotain outoa] |
| Oppaan nappirivi, ⏸ ja ≡ | OK: Kysy / Liiku / mikki / näppäimistö, ⏸ ja ≡ näkyvät |
| Poistu linssistä → kartta ehjänä | OK (`…-kartta-oppaan-jalkeen.png`) |
| Ranska → Pariisi (ajo b) | EI TODENNETTU: Ranska ei ollut näkyvissä (lista vierittyy), `tap-teksti` ei löytänyt; Alankomaat toimi tilalle |
| Suosikki-valinta | EI TESTATTU (lista näkyy, ei tappia) |
| **Siltalause vasta valinnan jälkeen** | **EI TODENNETTU**: lokissa `siltalauseet 166/166 ladattu`, mutta yhtään `siltalause <id>` -soittoriviä ei tullut ennen eikä jälkeen valinnan; ei näyttöä siitä, että se soisi ennen valintaa |
| Kysy-vastaus (`opas: kysy`), Liiku-paneeli, tauko, Jatka kierrosta / ■ Lopeta | EI TESTATTU tässä ajossa |
| Musta aloitusruutu + valkoinen logo, maakunta nostokorttina, Google-logo ja krediitit | EI ERIKSEEN TODENNETTU (aloitusruutu ohitetaan `uusi-peli`-komennolla; Google/Cesium-krediitit näkyvät oppaan kuvissa) |
| ISS-ohjaamo v3 (LAAJA/TELE) | EI TESTATTU tässä (vain avaus ja sulku) |
