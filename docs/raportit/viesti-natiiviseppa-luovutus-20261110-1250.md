# Natiivisepän luovutus 10.11.2026 klo 12.50

Edellinen: -1152 (312b21acb), käsitelty kokonaan. Syy: kontekstivahti 25 % (7.37). Kansio Matkakirja-3d-selvittaja. Älä poista mitään.
Työkansio /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/, lokit /Users/Shared/Claude/proto-3d/lokit/. Repo proto-3d/Matkakirja-proto, remote natiivi-backup.
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (/opt/homebrew/bin/python3.14 /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py
ILMAN -I:tä; UUSI-rivit → PT "UNITY UUSI: …"). Työlista: PT kirjoittaa. Vahti: Monitor JU:n ajoille (Mac loki.txt "valmis N s", iPad konsoli.txt hiljaa > 60 s);
bash 3.2: merkkitiedostot, ei assosiatiivisia taulukoita.

## 1. KIIRE: LONTOON TYHJÄ KARTTA (omistaja 12.25, 224.16 = 0421af91a; PT 12.3x)
- Oire: liftaus Pariisi → Lontoo: Lontoossa vain pohjapallo (tasainen ruskea), nimet ja koodimallit; EI laattoja eikä taloja; saapumiskortti jäi; uusi
  käynnistys korjasi (12.26). Kuvat Matkakirja-fable/docs/raportit/kaappaukset/omistaja-20261110/lontoo-*.png, britannia-*.png.
- Puuttuvat kerrokset = kartan purun (aa277a430, junassa 224.12:sta) kerrokset → EPÄILY: KartanPurku-omistaja "kaupunki" tai pallon suspendUpdate jää
  päälle (oppaan 3D-kaupunki / Cesium-kaupunki Pariisissa; CesiumKaupunki.Sulje ilman finallya; suspendUpdatea kirjoittaa 4 tahoa: striimitauko,
  jarru, Ruudunpäivityksen lepo, CesiumKaupunki palloOli). EI vahvistettu.
- JU:n kylmä toisto 0421af91a (lokit/ju-kiire-liftaus-lontoo-ipad-0421af91a): EI toistunut (ei kaupunkia, ei striimitaukoa).
- Toisto 2: _tyo/natiiviseppa/lontoo-vika/sk-lontoo-opas-ipad.txt (JU ajaa kopion _tyo/julkaisija/lontoo-opas/, oleta-uusi → oleta)
  → lokit/natiiviseppa-lontoo-opas-ipad-0421af91a. LUE: "kartan purku: alku/loppu", "kartan purku tila" (päällä True Lontoossa = syy),
  "striimi tauolla/takaisin", "muistijarru: taso", kuvat M0–M5. Lukuapu: scratchpadin lontoo-lue.sh -tyyppinen grep.
- KORJAUS (PT 13.1x lupa junaan kiireellisenä): natiivi-backup natiiviseppa/lontoo-vika 9d5be8823 (wt /Users/Shared/Claude/wt/proto-natiiviseppa-lontoovika,
  = juna-224 f08387e78 + 1): Sulje finally; KartanPurku.Valvo (omistaja ilman kaupunkia 2 s → Loppu, "kartan purku: JUMI");
  PalloMuistiJarru.ValvoSeis (suspendUpdate 3 s ilman haltijaa → vapautus, "pallon muistijarru: JUMI"). unity-tarkistus 0. MR pyydetty JU:lta 12.49;
  JU ajaa toiston 2 myös 9d5be8823:lla, jos laitekäännös ehtii → lokit/natiiviseppa-lontoo-opas-ipad-9d5be8823 (JUMI-rivi = korjaus laukesi).
- KUN TOISTO 2 VALMIS: syy (≤ 3 riviä) PT:lle. Jos ei toistu, seuraava ehdokas: ISS/raketti (KartanPurku "iss" ei valvottu), juoksupeli (KartanMuisti).
- NUI:n osuus (päällekkäiset otsikot, jäävä kortti): PT välittää. JU:n sivuhuomio (toinen liftaus Lontoosta vei Pariisiin): sanoin "testin tapa",
  EI tarkistettu – Pelikoodarin asia, jos PT kysyy.

## 2. YKSI TARKKUUS a2 (natiiviseppa/yksi-tarkkuus a4fd9ad6b; tulos.md)
- Mac a2-05 (k 0,5) HYLÄTTY: hyppy 752/19, kärjissä karkea↔tarkka-vaihto (parit-a2/hyppy-a2-05-*.png); PT:lle ilmoitettu. k 1 (442/12) jatkaa.
- iPad-muisti: ajopyynto-6 kohta 1 sk-ipad-a2-1.txt → lokit/natiiviseppa-yksi-tarkkuus-ipad-a2-1 (JU: MR6-linkin jälkeen, laitekäännös lisämuistilla).
  Kohta 2 PERUTTU. Raja nyt 6553 Mt (OMISTAJA 12.06: muistiosuus efdb68d93 junaan MR9). KUN VALMIS: huippu + kuvat yd-* → pari + luvut PT:lle → KK:n kortti.
## 3. ISS iPad (tärinä + kupoli) – ennallaan JU:lla (luovutus -1152 kohta 2). ISS S2 RAUENNUT (PT 12.1x, ISS 4172 < raja).
## 4. KERTOJAN VIIVE: lokit/natiiviseppa-kertoja-viive-1 VALMIS (12.4x), ei vielä luettu: python3 -I kertoja-viive/lue.py <konsoli.txt>
  (tuloste pitkä: rajaa "puhe: alkoi", "ulostulo seisoi", "valmis kappale"); syy PT:lle ≤ 3 riviä.
## 5. PdG-esilataus – ennallaan JU:lla (luovutus -1105 kohta 1).

## VIESTIT TÄLLÄ VUOROLLA
PT: a2-05 hylätty 12.05, Lontoo syy+korjaus 12.4x (kuitattu 13.1x lupa). JU: ajopyyntö-6 (OX kuitattu), iPad a2-05 peruttu, toisto 2 (jonossa, pid 4096), MR 9d5be8823.
