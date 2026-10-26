# Päätoimittajan luovutus 24.10.2026 klo 11.25 (konteksti 30 %; tili vvi@vvi.fi)

Id:t: /Users/Shared/Claude/osoitekirja.md. PT local_5df52e10. Edellinen -20261024-1000 (lue vain tämä).
ALOITA: tuotannonohjauksen osio 0, node tools/raamattu-luku.mjs 7.47, luvut 7, 8, 9, 12, 14. Avaa Asemataulu, Monitorit
ODOTTAJAVAHTI + CODEX-POSTI-VAHTI (7.41), RC päälle. OMISTAJA HEREILLÄ (vastasi kortteihin 10.20–10.53) → kysymykset KK:n kautta.
Keskustelu: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-10-24-klo-0957-1121.md. Loki: haara fable-loki-20261024f (PR mainiin, JU merge).
Codex-posti: git commit-tree + push "${C}:refs/heads/claude/postilaatikko" (zsh: $C:r syö merkit – käytä aaltosulkeita).

## 1. JUNA 210 – lukitus ja TF vasta, kun omistaja on hyväksynyt videot ja pyytää
Kokoonpano (NS kokoaa, kun NUI:n SHA tulee): 4bbdc3e89 (LT VIHREÄ 11.09: kamera 0/0, v11 0,29 %) + NUI 9d420ace4 (valkoinen
välähdys pois, omistaja "Poista") + PK lahikulma-210 8d9844b61 (kulmanvaihto jousella) ja b83e63e78 (vaakalatauskuva heti) + PK
alkulento-210 f8f5047de (leima 2 s ensimmäisestä piirretystä ruudusta) + NUI:n nimitekstit (AUKI).
EI junaan: c3bed52dc (v11 sama ilman sitä), saapumislento (omistaja 10.20 → juna 211, NS), vaakalatauksen 33 s (omistaja → 211).
AUKI:
- NUI: nimitekstit omistajan sanoin 10.46: "tee kielletty kaupunki yms. teksti vahvemmalla fontilla ja käytä ohuempaa tummaa viivaa
  tekstin ympärillä. sijoita teksti ylimpään kolmannekseen. riittää että teksti näkyy noin 7sek alussa. teksi saisi tulla näkyviin
  rivi kerrallaan." → SHA + kuvat PT:lle (tarkista 2×, ylin kolmannes kaikilla ruuduilla).
- PK: uudet omistajan videot (vaaka + pysty, äänellä) NUI:n SHA:lla. PT TARKISTAA ITSE (Raamattu 9.5 AJOITUKSET MITATAAN ITSE):
  leima ja ääni samassa ruudussa 2,0 s latauskuvan jälkeen (10 r/s + äänitaso 50 ms), tekstit 7 s ja rivi kerrallaan, ei valkoista
  välähdystä eikä kamerahyppyä juoksun alussa (vaaka ~81 s, pysty ~55 s), blackdetect. Vasta sitten KK:lle.
- Omistajan kysymys vastattu: videoissa Normaali-kulma; kuvakulmanappi 45ca4b28c on junassa.

## 2. MUURIT JA TAIVAS (omistaja 10.46/10.51/10.53, työlistassa) – ei junaan 210 ilman omistajan kuvapareja
Omistaja: "suurin ongelma: miksi punaisissa seinissä ei ole minkäänlaista muotoa. lisäksi ne ovat liian räikeän punaisia." +
"Vertaa myös muita yksityiskohtia ja paranna niitä myös (vihreä boordi, enemmän syvennyksiä, ikkunat, yms) myös taivaassa saisi
näkyä saävyt paremmin. Nyt näyttää puhkipalaneelle". Havainnekuvat: scratchpad/keskustelukanava/kuvat-20261024/v2-pari-*.jpg.
- LR muoto: vertailulista 2bf35c2a2, vaihe 1 luonnos 1ffe66f99 (proto lavastaja/muoto-210; pilasterit 9 m, vyö 0,58 m – PT pyysi
  vertaamaan tiheyttä ja leveyttä havainnekuviin). Seuraavaksi pelikuvapari kolmesta kulmasta + kolmiot + iPad-ruutuaika.
- VS väri, pinta, taivas, sävykartoitus (mittaus: ei puhki, vaan latteus). Raketti odottaa tämän jälkeen.
- CODEX: hyväksytty #917 rappaus-v2, #918 kivijalka, #920 taivas (a3c3edd34; postissa). Uusinnat #919b rappaus-ala, #921b
  palkkimaalaus; uudet #922 ikkunaristikko, #923 portin ovilehti, #924 huoneen ovi (e9f1c2f8a). Toimitukset: täysi koko + 2×2.
- Tilaus 18e5ec45a (havainnekuvat lähempää keisaria) yhä ilman kuittausta → Postivahdin käänteinen vahti.

## 3. MUUT
- NS: saapumislento junaan 211 (diagnostiikka 5e3f15ddb, iPad vapaa LT:ltä 11.09).
- PK: portti-kuja8 peittokartan lähde (LOD1-ovi umpimuurina) junaan 211, ei kamerasääntöä.
- Äänittäjä levossa (jono tyhjä). Juna 211 löydökset: scratchpad/paatoimittaja/juna211-loydokset.md.

## 4. Opit
- PT luotti PK:n ajoitusmittaukseen, KK löysi vaakan leiman 1,1 s / ääni 2,0 s → kirjattu 9.5 AJOITUKSET MITATAAN ITSE.
- Yksittäinen mittaus ei todista syytä: c3bed52dc palautettiin ja poistettiin tunnissa (v11 0,79 → 0,29 ilman muutosta).
