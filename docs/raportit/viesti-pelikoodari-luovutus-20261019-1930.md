# Pelikoodarin luovutus 19.10.2026 klo 19.30 (Postivahdin KOVA RAJA 56 %)

Edellinen: viesti-pelikoodari-luovutus-20261019-1740.md. Rooli: Pelikoodari (Opus, high). Proto-repo paikallinen (ei pushia).

## KÄYNNISSÄ NOLLAUSHETKELLÄ
- Ei omia ajoja eikä lukituksia. JU kääntää juoksupeli v1:n (ad203186e, 4. yritys L2:lla, valmis ~19.55; aiemmat 3 kaatuivat
  L2:n rikkinäiseen Burst-välimuistiin, ei koodivirhe) → _tyo/julkaisija/juoksupeli-v1-app. JU ilmoittaa KÄÄNNETTY + SIMU NYT.

## ENSIN (JUNA 205 = 204 + JUOKSUPELI v1; omistaja pyysi julkaisua 19.02, TF 22–23, merge NS:lle viim. ~21.15)
1. **Yhdistetty simu heti JU:n SIMU NYT:sta:** `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/simu-juoksu-v1/aja.zsh`
   (taustalle; iPhone 3E6A1D4D + iPad 39644E75 peräkkäin, ~15 min). Skenaariot sk-juoksu-v1-{iphone,ipad}.txt: valikosta
   oikeilla napautuksilla (Linssit → Pelit → Juoksupeli), vedot väylä ←/→, hyppy ↑, liuku ↓ ("pyyhkäisy …"-rivit), kiinni →
   "Uudestaan" → uusi juoksu, sitten botti uloskäynnin yli ("drone laskeutuu oviaukkoon … (s 10x" + U1–U3).
   Tarkista: lokit/todistus-juoksu-v1-{iphone,ipad}-*; tap-teksti voi osua väärin (Linssit/Pelit-rakenne arvaus) → katso M1/M2.
   → SIMU VAPAA JU:lle → PT:lle 3 riviä + kuvaparit (M2 valikko, J2/J3 vedot, K1/K2 kiinni + uusi yritys, U1–U3 uloskäynti)
   iPhone + iPad. Jos tap-teksti ei löydä valikkoa, korjaa skenaario (ui puu) ja aja uudelleen; lipsuessa rivi PT:lle heti.
2. Merge-pyyntö on jo NS:llä: juoksupeli-kaaro-v2-204 kärki **d9412447a** (= ad203186e + huutosoittimen ääniporttikorjaus;
   runko 4be2a647f oli punainen AanipohjaTestit → korjattu, Linssit 2110/2110, Peli 639/639). Simu ajetaan ad203186e-käännöksellä
   (korjaus ei näy kuvissa).

LISÄYS 19.3x (PT): NS:n juna 205 -runko on 5d41150ce. v1-käännös on JU:n prosessi (ei tämän session lapsi), simua EI ole
aloitettu → seuraaja käynnistää sen. Simukuvista puuttuu kaikki (M2, J2/J3, K1/K2, U1–U3 iPhone + iPad). Merge-raja 21.15.

## JUNA 205 / v1 – TILA (PT kuittasi puutelistan; _tyo/pelikoodari/raportit/juoksupeli-v1-puuttuvat-20261019.md)
- 1 Valikko: 5deb98c46 yksi rivi "Juoksupeli" → v4 (kuitattu). 6 Esteet: Codexin esteet-v1 ämpärissä 19.01, pelikuvat
  kuvapari-esteet-v1-20261019/ (KUITATTU). 4 Drone B "oviaukon läpi" (omistajan päätös 18.02): 6ca040b53 + uloskäynti 21bfda59e,
  KUITATTU (kuvapari-ovi-b-20261019/); uloskäynti simuun kohdassa 1. 7 Laitemittaus: LT yöjunasta (ei 205:n ehto).
- Kaaro-v2-haarassa myös: käärö v2, avoimet v2, v1-tehosteet pois (df8064143), pyyhkäisyloki ad203186e.

## YÖJUNA 206 (PT kuittasi, ei 205:n ehto) – haara pelikoodari/juoksupeli-kerattavat-206 kärki a4e3b86f3
- d67dee9db kerättävät (Codexin kerattavat-v1: herkku/mätä omena, jadepersikka; koko = paikkamerkin halkaisija), ämpärissä (JU 19.15).
- 123fa4a93 rikkoutuvat aarteet (aarteet-v1: posliinimaljakko, cloisonne, lakkarasia, jadeastia, kello jalustalla; törmäyksessä
  rikki-sirpaleet lentävät), ämpärissä (JU 19.19). a4e3b86f3 = merge kaaro-v2 d9412447a.
- EI VIELÄ SIMUSSA → 205:n jälkeen käännös (JU tietää kärjen) + simu (oleta "kerättävä … paikalleen", "aarre … paikalleen",
  "aarre … rikkoutui") + kuvapari Codexin esikatselujen rinnalle PT:lle → merge-pyyntö NS:lle 206.
- Valoseppä: juoksupelin valo linssiseppa2/juoksu-valo-205 6f56d3a5e (minun antamani erä); yhdistyy puhtaasti molempiin haaroihin.

## MUUT (odottavat PT:n mukaan)
- Rakettivideo: valaspätkä valmis (_tyo/pelikoodari/raportit/rakettivideo-20261019/); laukaisupätkä Mac-tallenteena yöllä:
  Mac-app _tyo/julkaisija/raketti-mac-app (8eb6e1945), skripti _tyo/pelikoodari/mac-rakettivideo/aja.zsh (vain kun omistaja
  poissa ≥ 5 min; tallentaa vain appin ikkunan). Valoseppä tekee erikseen video-laatutason kokeilun (247367757).
- Raketin autokäynnistys 30495a9a6 + Pulun välkkymiskorjaus 8eb6e1945 (raketti-autokaynnistys-204): raketti-iOS jonon hännillä.
- Lähteet-nimet: pelikoodari/lahteet-nimet-205 2c9c676a2 (Q-tunnukset pois listasta) – merge-pyyntö puuttuu (seuraava juna).
- Kuvalähde 5890ccd32 mergetty junaan 204 (NS).
- Mac WASD 4814ab2d1 omistajan paluuseen; PR ravelius/Matkakirja#4945 pidossa.

## TEHTY TÄSSÄ SESSIOSSA (17.48–19.30)
- Käärö v2b -simu tarkistettu (käärö ja avoimet v2 OK). Ovikamera: nosto → yläseinä peitti Puyin → A 90cf928ff → omistajan
  päätös B 6ca040b53 + uloskäynti 21bfda59e; DroneNostoTestit mittaa näköyhteyden koko radalla 4–11,25 m/s.
- Rakettivideon uusinta (simun tallenne jumittuu sytytyksessä myös kuormattomana); Pulun kuvan hystereesi 8eb6e1945.
- Kuvalähde-simu OK + merge-pyyntö; lähteet-nimet 2c9c676a2.
- Juoksupeli v1: puutelista, valikko, esteet-vienti + pelikuvat, pyyhkäisyloki, ääniporttikorjaus, 206:n kerättävät + aarteet.
- Siivous: 5 mergettyä worktreetä pois (~3,4 Gt).
