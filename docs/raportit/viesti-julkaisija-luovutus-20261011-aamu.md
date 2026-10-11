# Julkaisijan luovutus 11.10.2026 aamu (~08.40, konteksti 51 %)

Juokseva loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -80). Pitolista: `julkaisija-tyokalut/pidossa.txt`.
Päätoimittaja = "PÄÄTOIMITTAJA (Opus, max)". Viestit hänelle vain valmis erä, jumi tai kysymys (≤ 8 riviä). Ei kortteja.

## 0. Tila 08.40

- **Simut + lukko:** lukko vapaa. Simulla vain LS1 testi-182-torni-puut 9987d0cf2 (iPhone BD64C8E4 + iPad 00CF62C2, ~08.45 asti).
  Jonossa ei muita. Siirtoseppä SIMU VAPAA 08.39.
- **Juna 180** TF:ssä (iOS VALID 3886f332, Mac VALID c8e8fccb). **Juna 181 odottaa omistajan aamupäätöstä ja Natiivisepän
  "jatka"-ohjetta** (omistaja pysäytti Natiivisepän 00.4x: ei käännöksiä/iPad-ajoja/mergejä ennen hänen vastaustaan).
- **Levy:** 82 Gi vapaana (raja 50 Gi → heti rivi PT:lle). Roolit siivosivat yöllä ~20 Gi (NAS: Matkakirja-arkisto/).

## 1. Olavinlinnan yhdistetyt käännökset (PT:n yön painopiste)

Julkaisija kääntää yhdistetyn Olavinlinna-käännöksen aina pyynnöstä (Siirtoseppä ilmoittaa uuden kärjen):
- Skripti-malli: `julkaisija-tyokalut/kaanna-olavinlinna-yhd-181k.zsh` (kopioi → seuraava kirjain l, m…; vaihda kommentti).
  Haarat: `siirtoseppa/laituri-varoitus+siirtoseppa/v47f+pelikoodari/olavinlinna-aanet+natiivi-ui/olavinlinna-181+pelikoodari/tyrma-tapahtumat`
  (haaran nimet → uusin kärki automaattisesti). App-kopio `proto-3d/lokit/olavinlinna-yhdistetty-181<kirjain>/`.
- Ennen käännöstä merge-tree-kuivaharjoitus (`git -C proto-3d/Matkakirja-proto-kaannos merge-tree --write-tree --name-only`),
  ristiriidassa → pyydä haaran omistajaa yhdistämään (07.42: Pelikoodari ratkaisi 9250fff69).
- Käynnistys irrotettuna: `perl -e 'use POSIX qw(setsid); if (fork()==0) {setsid(); …exec "/bin/zsh",$ARGV[0]}' <skripti> <loki>`.
- Uusin: **v11 e3c5dd17b** (181k; laituri 41e1f55a9 + tyrma-tapahtumat 9250fff69). Vanhemmat poistettu.
- **Seuraava v12**: Siirtosepän tuleva kärki + Pelikoodarin 6dd9ee50e (Siirtoseppä ilmoittaa).
- Laitetestaajan kierrokset aina UUSIMMALLA valmiilla yhdistetyllä (PT). 6 kierrosta ajettu (v4→v11), raportit PT:lle.
- Raskaat simut (Laitetestaaja, Siirtosepän bottiajot) yksi kerrallaan; kevyet (LS1, NUI, Pelikoodari) rinnalle. Yöllä 2 simua ok.

## 2. Pidossa / odottaa

- **#4380** (KS aloituskaupungit, skeema 1.62): EI mergeä ennen TF 181:tä TestFlightissa (merge vaihtaa sisältöosoittimen heti).
  Sen jälkeen Pelikoodarin kultaiset jäljet 73fc9be13 → juna 182.
- **Juna 182**: LS1 kippi-torni-182 5ed2754c8; NUI paakaupunki-lehti 4cb6c437b (webin #4386 pari).
- **Natiiviseppä pysäytetty** (omistaja): LS1 kaupunkipuiden iPad Pro -muistiportti 3ca310a50 odottaa.
- Pulu CYP VIETY (41 maata, CYP=202610102110).

## 3. Yöllä tehty (tf-jono-lokissa SHA:t)

- Peili-404: #4378 + #4379 MERGED, kaikki korjatut kuvat/liput 200.
- Viennit: museo v2g (1454), kertoja v1+v2, 612–616 ASTC, omat-mallit v6k16 (osoitin uusin-4 EI vaihdettu), opas esittely v1g + v2a, Pulu CYP.
- Mergetty: #4381 + #4384 + #4385 (Pöllö, julkaistu), #4382 (Raamattu), #4383 (saa-normaalit), #4386 (14 pääkaupunkilehteä, peilaa 334 kuvaa).

## 4. Opit

- Lokin kellonajat: aja `date +%H.%M` ennen merkintää (kaksi väärää aikaa korjattu yöllä).
- Taustaketjun `grep -vq "<TAB>pass<TAB>"` vaatii oikean sarkaimen (BSD grep ei tunne `\t`:tä).
- Roolien "≤ 1 muu simu" -automaattiketjut voivat kilpailla → pyydä odottamaan erillistä SIMULAATTORI NYT -viestiä, kun kaksi on jonossa.
- Yhdistetyn skriptin `pgrep -f`-odotus osuu myös omaan odotuskomentoon → käytä odotuksessa app-kansion olemassaoloa.
