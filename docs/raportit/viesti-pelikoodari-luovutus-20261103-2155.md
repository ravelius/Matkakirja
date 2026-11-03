# Pelikoodari: luovutus 3.11.2026 klo 21.55 – junat 218/219

Edellinen: -20261103-2106 (77780d892), voimassa ellei alla toisin. Syy: kontekstiraja 26 % (7.37). Proto-haarat paikallisia
(repo /Users/Shared/Claude/proto-3d/Matkakirja-proto). Ei omia taustaketjuja (kaikki ajot JU:n linjoilla).

## Tehty 21.09–21.55
- **KEISARI-KK VALMIS**: ajo 1 (lokit/pk-keisari-kk-7ac89ff33-2108) → KK:n 4 huomiota → ajo 2 (_tyo/pelikoodari/keisari-kk/aja-ipad-2.zsh,
  lokit/pk-keisari-kk2-7ac89ff33-2118, 17 kuvaa). **KK HYVÄKSYI 21.3x** ("kerron omistajalle, kun nosto on hänen iPadillaan"). Ei avoimia.
  Aloitusruutu juoksupelin päällä = testiajon jäänne (skripti ei painanut Jatka matkaa), ei vika. Tarinanappi vasta rikottujen Jatkan
  jälkeen. ☰/🔊 tekstin päällä = pohjan normaali (omistaja 28.9.), ennallaan.
- **NUI:lle** 21.1x: juoksupelin salikomentoa ("ui juoksupeli sali …") ei ole eikä tule → NUI kokoaa Testihypyt sk3-*.txt-riveistä.
- **JALKI v2 b72a1b16a** (JU 21.19): taso1b EI korjautunut (sama kuin v1, oikaisu 0); ys ei regressiota. Todellinen syy: muurin tarve
  5,6 m (kameraväli 11,59 "tarve 5,6"), kun käännöksen (kaanna 1 seina 11,09) viivästyneen kierron tavoite ja sivunäyte osuvat
  työhuoneen kulmaan (huippu 3,9), vaikka kamera on vapaana käytävässä. Havainnot: _tyo/pelikoodari/jalki-218/havainnot-v2.md. PT:lle 21.22.
- **JALKI v3 9d02ae999** (pelikoodari/jalki-massa-218 kärki, wt/proto-pelikoodari-ys-218): DroneNosto.SuuntaPiste + JuoksuV4Maailma
  "NYKYSUUNNAN PITO": kun tavoite tukossa tai sivunäyte muurilla (> MuuriRaja) ja tavoite poikkeaa kameran nykysuunnasta > 20°, kamera
  nykysuunnassa nimellisellä etäisyydellä, jos se vapaa (polkukameran siirtymä); muuten jälkipisteet. Loki "polkukamera alkaa …
  (nykysuunta)". QA-kytkin DroneNosto.SuuntaPitoPaalla. Testit 813/813, unity 0. **AJOPYYNTÖ JU:lle 21.27** (ketju.zsh taso1b ys, L2).
- **PALVELIJAT v4** (JU 21.20, esikatselu-20261103-212014): 0 säikähdystä. Syyt: lajirajaus (ruokaeunukin vaiheessa vedenkantaja näkyi
  aukiolla Puyin vieressä, ruokaeunukki-060.png), juoksu maaliin ennen lakaisija/vedenkantaja-vaiheita (kuvissa RIKOTUT-kortti),
  Palvelijatar "reitillä 0 säikähtämätöntä". → **v5 vain skenaario** (_tyo/pelikoodari/palvelijat-v5/aja-v5.zsh, sk-palvelijat-v5.txt:
  `saikahda` ilman lajia, 150 + 60 yritystä, kaksi osumaa osuma1/osuma2). **AJOPYYNTÖ JU:lle 21.55** (runko c35e3d150 ennallaan).

## SEURAAVA
0. **JALKI v3** (JU ilmoittaa): python3 -I scratch-tyyppinen vaiheloki-analyysi (kamera y ja dx t 10,8–13,5) tai suoraan unity.log:
   "polkukamera alkaa … (nykysuunta)", kameraväli t 11,3–12,2 "tarve" ja korkeus (tavoite y ≤ ~3 m, x ≈ Puyi); ys: polkukamera alkaa
   4,61/9,73/12,39 ennallaan, ei uutta kamerahyppyä → PT:lle ≤ 3 riviä + video. Jos ei korjaantunut: kameraväli-rivin "muurit v/o" ja
   "tavoite → m tarve" kertovat, laukesiko pito (ero > 20°? sp vapaa?).
1. **PALVELIJAT v5** (JU ilmoittaa): huom-*.txt "säikähdytetty #n …" → kuvat osuma1-*.png/osuma2-*.png → pelikuvapari PT:lle (≤ 3 riviä
   + polku). Jos 0: syyjakauma (grep "ei palvelijaa" | sort | uniq -c) ja harkitse maalin siirtoa pois (ui juoksupeli maali pois) tai
   pidempää juoksua.
2. Vedenkantajan WATER-POUR-CONTRACT vasta PT:n pelikuvaparikuittauksen jälkeen.
3. Yhdistys: arkihahmot-218 (86476dd60) junaan vasta PT:n kuittauksen jälkeen; jalki-massa-218 (9d02ae999) vasta ajon ja PT:n jälkeen.
4. POHJAVAHTI-huomio JuoksuAvausJuliste.cs (vari 1 > 0) tulee pohjasta a592f6e28, ei omasta muutoksesta.
5. Checkout /Users/Shared/Claude/Matkakirja-pelikoodari: luovutushaara koti/Matkakirja-pelikoodari (tämä tiedosto sen kärjessä).
