# Pelikoodarin luovutus 20.10.2026 klo 00.50 (Postivahdin KOVA RAJA 35 %)

Edellinen: viesti-pelikoodari-luovutus-20261019-2335.md. Rooli: Pelikoodari (Opus, high). Proto-repo paikallinen (ei pushia),
haara pelikoodari/juoksupeli-207, worktree /Users/Shared/Claude/wt/proto-pelikoodari-kerattavat-206 (puhdas).

## KÄYNNISSÄ NOLLAUSHETKELLÄ
- Ei ajoja. SIMU VAPAA annettu JU:lle 00.45.

## 206 (OMISTAJA PYYSI JULKAISUA 00.30)
- Lukitusehdokas = **208fd103e** (kapeat kujat 56bdb2c78 + drone hengittää 82bd1932f + LS rengas-v6) + VS 291109dde = JU:n yhteinen11.
- Lukitussimu yhteinen11 iPhone + iPad OK (kaikki oletukset, 0 poikkeusta): lokit/todistus-juoksu-sokkelo-206c-{iphone-20261020-0038,
  ipad-20261020-0041}/kuva-arkki.png → lähetetty KK + PT 00.4x. Todistuksen PUUTE (pitkiä ruutuja) on vain kartan käynnistyksessä.
- Sisältää myös: taso 1 ilman Spurtti-nappia, loppukortti "Jäit kiinni!"/"Uuvuit!", musiikki a/b/c (musiikki-taso1-v2, 4 s risti-
  häivytys, kerroin 0,45), hallit-koodi (pois päältä: 14,3 m ei mahdu 11 m:n pihaan), A/B `ui juoksupeli sokkelokamera 0|1`.

## 207 (kärki 413a7c074, ei vielä käännetty)
- 13bb1b98a + 413a7c074: aanet-v3 (kääretaulu repeää, puu-2, metalli-2…5, kivi-jade-3…6, huonesavy-halli silmukkana huoneissa);
  KK hylkäsi käännösäänet ja puu-3…5 → poistettu. Hurraat (omistaja 23.59): hurraa-taso1-v1 energia (jadepersikka) / omena
  (herkkuomena), tekstitys "Jee!". Äänittäjä tekee isommat A6–A9/B6–B9 → hurraa-taso1-v2 omistajan valinnan jälkeen (vaihda polku).
- Peli 653/653, tarkista.sh 0.

## ENSIN
1. Pyydä JU:lta käännös 413a7c074 (+ VS:n ja LS:n uusimmat, jos niitä on) → simu `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/
   simu-sokkelo-206/aja-c.zsh <app>/Matkakirja3D.app` (lisää skenaarioon jadepersikka/omena-kuva, jos haluat hurraat todisteeksi).
2. ESTEET LUETTAVIKSI (KK 00.4x, 207): hypättävät matalia ja leveitä maassa (penkki, laatikot, ruukut), liu'uttavat riippuvia
   (lyhdyt, viirit, palkki) varjolla; väri erottuu muurista; vaihtelua. Mallit Codexilta PT:n kautta, jos ämpärin esteet/ eivät riitä.
3. Codexin tilaus (PT, posti be06a9347): suorat muurit 11,0/12,4 m + 3,6 m umpimuuri, halli ≤ 10 × 10 m (2), pieni paviljonki,
   puutarhapala 11 m pihaan → vaihda JuoksuSokkeloMaailma.Mallit/Rakennukset sisään; hallien ehto `Sisapiha >= …` sopivaksi.
4. Omistaja 00.22 (PT:n jaolla, Codex → Lavastaja → PK): rakennuksiin useampi sisäänkäynti ja huoneita pujoteltavaksi, kokoerot, portaat.

## MITAT (VS, LS tietävät)
JuoksuSokkelo.Vali 16, KujaLeveys 3,6 (3 väylää 1,2 m), Ruutu 8; sisäpiha 11 × 11; JuoksuSokkeloMaailma Sade 4, KevytSade 5, purku
heti KevytSaden ulkopuolella → rakennettu alue neliö keskipiste (−cx·16 − 4, −cy·16 − 4), puolileveys 88 m (LS rengas-v6 aukko ±97 m,
keskipiste Puyi − (4, 4)). Jos KevytSade muuttuu → kerro LS:lle. Drone: DroneNosto.Sokkelo* (11/7 kujalla, 14/8,5 avoimessa risteyksessä).

## MUUT AVOIMET (ennallaan)
- iPadin loppukortti pieni = yhteinen KORTTI-pohja (Vahvistus) → PT:llä UI-pohjien kysymyksenä (ei omaa ratkaisua).
- Rakettivideo Mac-tallenteena yöllä; Mac WASD 4814ab2d1; hiha-uv1 kainalopatch c7d85b1a.
