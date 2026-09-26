# Natiivisepän luovutus 26.9.2026 (h), klo 12.4x

Luovuttaja: Natiiviseppä (Opus 5.5, Macin käyttäjä koodaus). Syy: konteksti 71 %. Edellinen: -g.md.

## Tila

- **BUILD 20** = proto-master **1a57cc39** (juna c8cd1d94, puu 671b0f44 = käännös 894f1feb) = **TF 1.0.20** (valmis 11.07).
  Laitetestaaja 69b566d93 + reseptit ac153e7e4: B (Attiki, `muste loyda`) ja 157 PASS.
- **BUILD 21 -juna juna/b13 19e5415e** (auki). Build 21:stä puuttuu vain **Linssisepän 162-osuus** (saapumisanimaatio
  luennan jälkeen, ElavaKartta käyttää Pelikoodarin PeliOhjain.SaapumisluentaKesken/-Paattyi; pelipuoli 23f262bf on junassa).
  Sen jälkeen käännös Laitetestaajalle: juna-ajo.sh tai vahti, ja SHA Laitetestaajalle ja Fablelle. PASS → master-merge
  (puu = käännöksen puu) → SHA Julkaisijalle (TF 1.0.21).
- Junassa (build 21): 153/159-usva (+ Horisonttiusva.hlsl, rajat, kynäviivat), 154 utu, 155 0,85, 156, 157 + maamaski
  (Karttasepän GSHHG maittain, 4× rasteri), 158, 160-prototyyppi (Symbolimallit: Delfoi, Meteora; 2D-kuvake piiloon),
  161 (Lipputanko + ElavaKerros + 3D-kangaslippu Lippu3D.shader), valintanimet (UI-pariteetti rivi 2), musiikki 2+3,
  maanosa-kaupungit, esilataaja-mittari, reitin väri ja katkoviiva (Linssiseppä 1308bfec), Natiivi-UI:n erät (kokoruutu,
  kuljettu-kytkin, pikkukuva-lähde, kuvat-kiinteät, lippu-kiinnitys, lipputanko-kytkentä).

## Omat haarat ja tärkeät tiedostot

- **Elävä kerros** (Kartta/ElavaKerros.cs, Resources/ElavaKerros.shader; rajapinta lukittu Linssisepän kanssa:
  proto-3d/lokit/elava-kerros-rajapinta.md). Tilat TAYSI, KAAPPAUS ja KERROS; Ruudunpaivitys.Tila.Kerros; komento
  `pallo kerros tila|pois|paalle|pakota`. TAYSI vs KERROS bitilleen samat (simulaattori). Käyttäjiä ovat lipputanko ja
  Liput.Aalto.Jatkuva; seuraavaksi Linssisepän kynäviiva, hetket ja Vana (hän siirtää kutsunsa).
- **161 A/B-mittaus** (iso iPad, Release): proto-3d/lokit/ab161-ipad13/raportti.md. A 71 ms/s, B 166 ms/s, C 486 ms/s,
  lämpö 0. 3D-lippu: kerroskehys 3,1 ms (lokit/lippu3d-ipad-b/). Omistajan päätös: B (lippu liehuu koko ajan).
- **161 paikka**: maan itäreuna, Karttasepän ankkurit vektorit/lippuankkurit-2026-09-26.json → Siirtosepän PR #3321 →
  paketin kartta/lippu_lonlat.json (Natiivi-UI lukee; ilman dataa ei tankoa).
- **160**: suunnitelma proto-3d/lokit/suunnitelma-160-3d-symbolinostot.md (omistaja hyväksyi, kohta 10 = animoidut
  erikoismallit elävällä kerroksella). Palettina Sisältökirjurin vari2-poiminta. Seuraavaksi omistajan arvio laitteella.
  Lopullinen kuvapari (6ecdbbbf-muodot) on ottamatta Macin muistipaineen takia (swap 15,7/17,4 Gt): skripti
  lokit/natiiviseppa-skriptit/symbolit160.sh.
- **157-maski**: Kartta/Maamaski.cs, komento `maakunta maski pois|paalle`.
- KehysMittari kirjaa gpuMs:n (enableFrameTimingStats 1) ja kerros-tilan. Komento `naytto valvo|oletus`.
- Skriptit: lokit/natiiviseppa-skriptit/ (taivas154, maakunta157, maski157, k153-laite, kerros161, ab161, tanko161b,
  lippu3d-laite, symbolit160, laite-release).

## Build 22 -jono (SEURAAJALLE)

1. **Esilataus kohdat 2–3, laatat** (Fable: build 22). Pohjana Pelikoodarin pelikoodari/esilataaja-5 **6ced5c90**:
   `StartCoroutine(Esilataaja.Tehtava(Taso, ryhmä, Func<IEnumerator>, laatta: true, peruttu))`. Laattojen mittari on
   kytketty Laattapalvelimeen (esihaku esilataus-polun kautta). Minun osuuteni: aloitusverho 5,4 s (odottaa pallon 100 %:a)
   ja aloituslento-musta 5,0 s → aloitusnäkymän laatat ja aloituslennon reitin pinta tasolla **SeuraavaRuutu** (Taso-enumissa
   ei ole Kaynnistys-tasoa), kohdekaupungin Z7–Z10 tasolla **Kohdekaupungit** valinnan ja lennon aikana. Raportti:
   lokit/esilataaja-5/kylma2/RAPORTTI.txt (LAATAT 13 %). Vanha natiiviseppa/lento-esilataus 34d31dbd voi auttaa.
2. 160: Akropolis ja muut GRC:n tason 1 mallit omistajan palautteen jälkeen. Mustejälki voi piirtyä mallin päälle (Natiivi-UI).
3. Elävän kerroksen hinnan puolitus (scissor tai bloom pois kerroskehyksiltä), jos omistaja haluaa.

## Käytännöt (uutta tänään)

- Fablen sääntö: yksi käännös tai ajo per simulaattori kerrallaan, päivällä enintään 2 simulaattoria käynnissä; oma FBBD41D7
  sammutetaan ajon jälkeen. Muistipaineessa (swap täynnä) simulaattori ei käynnistä sovellusta ("No such process") →
  testaa isolla iPadilla (laite-release.sh, Matkakirja-proto-kopio testihaaraan ja takaisin masteriin).
- juna-merge.sh: ÄLÄ ilmoita mergeä ennen kuin tulos on näkynyt (RISTIRIITA-rivi); ratkaise mergeämällä juna omaan haaraan.
- TF-viennin aikana (Julkaisija ilmoittaa) ei käännöspalvelua eikä junamergejä, vientilippu /tmp/natiiviseppa-vienti-tulossa.
