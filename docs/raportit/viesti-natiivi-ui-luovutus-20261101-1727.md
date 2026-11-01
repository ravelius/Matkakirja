# Natiivi-UI: luovutus 1.11.2026 klo 17.27 (Pariisin karikatyyrin napautus junassa 216)

Edellinen: viesti-natiivi-ui-luovutus-20261031-2215.md. Syy: konteksti yli pehmeän rajan (Raamattu 7.37). Tilinvaihto 31.10. illalla tehty.

## Valmiit tässä vuorossa (proto-3d)
- **Pariisin piirroskartta: karikatyyrin napautus avaa tiedot suoraan** (omistaja 1.11. 15.3x KK:n ja PT:n kautta: "Nyt kun Pariisissa
  on karikatyyri kuvat tärkeimmistä nähtävyyksistä, niin siihen ei tarvitse enää zoomaustoimintoa, vaan klikkaamalla nähtävyyttä voi
  aueta suoraan pop-up-ikkuna, jossa tiedot"). natiivi-ui/piirros-popup-216 **e0bcdadf0** → PT kuittasi → NS runkoon 216 **0100aede3**.
  - Ennen: piirroskerroksen aikana kohdenoston merkki on vain piste + nimiö karikatyyrin juurella; karikatyyrin kuvan napautus ei osunut.
  - Nyt: NostotKartalla.PiirrosNapautus (lepoKierto.Napautettu, ennen TietoNapautusta): napautus karikatyyrin kuva-alaan avaa saman
    Nahtavyysarkin kuin merkki (Kohdenostot.Avaa); kamera ei liiku. Ala = PiirrosAlat (metreinä pisteestä ylös, oletus 440 × 460 + 140 m
    alas, Eiffel-torni 420 × 800 + 120), mittakaava pisteen kohdalta itä–länsi; PiirrosPeitot-kohteille (Louvre/Tuileries) poltettu ala.
    Kohdenostot.Paikka(id) uusi.
  - Todistus (iPad 13 vaaka): lokit/todistus-piirros-popup-e0bcdadf0-c-20261101-1717 (Eiffel, Notre-Dame, Panthéon OK, K1 = K5);
    KK:lle kk/ (K1, K2 ilman kaistaa + selitteet.txt), polku PT:lle.

## KESKEN
- Ei omaa keskeneräistä. Muita karikatyyrejä kuin kolmea ei kokeiltu: jos pieni tai vierekkäinen osuu väärin, säädä PiirrosAlat.
- Nähtävyysarkki on ~60 % ruudun leveydestä (UI KEVYT 45 %); pohja ennallaan, PT tietää.

## Opit
- Todistusajon `tap` on laitteen PYSTYKEHYKSESSÄ myös vaaka-UI:ssa: iPad 13 vaakapiste (x, y) → `tap (1032 − y, x)`; lisää `--laite ipad`.
- `uusi-peli` + `komento aja` kaupunkiin: ensimmäinen kosketus käynnistää pelin odottavan saapumisen maahan (kamera loittonee).
  Skenaarioon ensin `tap` keskelle + odota 25 ja vasta sitten `komento aja`.
- Yhteiset simut: proto-3d/_tyo/natiivi-ui/piirros-popup/aja.zsh (simu-lukko.sh kaari natiivi-ui yhteinen-iPad13, SIMU_ODOTA, muistiraja 16).
