# Natiiviseppä: luovutus 10.10.2026 klo 07.4x (konteksti 64 %; junat 173 ja 174 lukittu, 175 runko kasvaa)

Rooli: Natiiviseppä (Opus; PT palauttaa effortin highiin). Checkout /Users/Shared/Claude/Matkakirja-3d-selvittaja (haara
selvittaja-3d-luovutus), proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto. Edellinen: viesti-natiiviseppa-luovutus-20261010.md
(yön juurisyy ja TILA-rivit 03.5x / 05.0x). Viestit PT:lle ja Julkaisijalle varakanavalla mcp__ccd_session_mgmt__send_message:
PT local_593b89a1-2514-4d74-b956-2a73db862382, Julkaisija local_22b29f10-7af8-43fc-a974-1d666f716c97.

## HETI (omistaja 07.4x PT:n kautta: "vaihda heti 6.7. versioon" → Unity 6000.7.0b4 PÄÄLINJAKSI)
PT:n järjestys: 1) paluu talteen ✔ tagit `unity63-viimeinen` (c47bded2c = BUILD 174) ja `unity63-viimeinen-175` (b7df7c444); 6.3-käännöskopio
→ T7 /Volumes/T7 4TB/koodaus/unity63-talteen/ (rsync käynnissä 07.5x, loki lokit/natiiviseppa-unity63-talteen.out); 6.3-editori jää.
2) 175-runko 6.7:ään: T7-kopio natiiviseppa/unity-67 = cb8f87f31 (6.7-korjaukset 931920957: GetGPUProjectionMatrix, GetInstanceID →
GetHashCode (Object.GetHashCode = instanssi-id, kelpaa), URP 17.7.0, Cesium 1.25.1 ennallaan; uudelleensarjallistus 7bab4da79; + juna 174).
Seuraavaksi: merge natiiviseppa/juna-175 (b7df7c444 tai uudempi) unity-67:ään → siitä uusi pääkehityshaara (PT nimeää; esim. juna-175 =
unity-67 + 175). ProjectVersion 6000.7.0b4. Editoripolku: Unity 6.7 on T7:llä /Volumes/T7 4TB/koodaus/Unity/6000.7.0b4/ → Julkaisija hoitaa
putken (proto-kaanna.sh UNITY=, juna-ajo, CI, aja.sh, unity-tarkistus.sh R=… ja MATKAKIRJA_KIRJASTOT=6.7-Library).
3) Testit 6.7:llä: Linssit/Peli/Kartta-kaanna.sh käyttävät 6.3:n dotnetia (puhdas C#, ok); unity-tarkistus vaatii 6.7:n Library/ScriptAssemblies
(MATKAKIRJA_KIRJASTOT="/Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity67/Library/ScriptAssemblies") ja 6.7:n moduulipolut (U=…).
Simukäännös 6.7:llä → BUILD-viesti kaikille rooleille (rebase-SHA, tarkistukset 6.7:llä, ei uusia GetInstanceID-kutsuja).
4) iPad: 6.3-vertailu jää pois. 6.7-laitekäännös (174-koodi) käynnissä nice 20 (B-app → lokit/natiiviseppa-app-ab67-laite) → Release-
muistiajo Pariisi A/B (vertailu R22/R23: 0,68 / 0,75 Gt) + Olavinlinna + lämpö; jetsam tai < 0,5 Gt → stop + rivi PT:lle. Asennus: ipad.sh
tai devicectl device install app (bundle fi.matkakirja.peli.kehitys), sitten muistitarkka-ipad.sh.
5) Mac myöhemmin. TF 175 huomenna 6.7:llä, jos muistiajo menee läpi.

## Junat

| Juna | Master | juna/b13 | Simukäännös | Tila |
|---|---|---|---|---|
| 173 | 39bb6921561fda7dcce7d11205adc90e6d315a51 | 85436c355 | be06cd054 | omistaja hyväksyi, TF 38022048008 käynnissä 06.5x (kiinteä SHA) |
| 174 | **c47bded2c643b619f3b8ced9cb434f6d0e7c427a** (uudelleenlukitus 06.14; ensimmäinen 5f84c3594) | **3ca7ab1ba** | de2b23c05 | omistaja hyväksyi, TF 173:n jälkeen (Julkaisija) |
| 175 | – | – | – | runko natiiviseppa/juna-175 **b7df7c444** (wt/proto-natiiviseppa-j175; + pulu-maat-23 078f8e8a4) |

- Portti 173 (iPad Pro 13, v6h3): A 0,66 / B 0,72 Gt. Muistiajo 174: A 0,68 / B 0,75 / A v6hk3 0,75 Gt. v6k4 (ND v3d + KL v6j, KTX2):
  A 0,74 Gt → uusin-4 → v6k4 (Julkaisija). 172 kaatuu yhä v6b3:lla (jetsam 41 s), rivi PT:lle annettu.
- Muutosloki 173 ja 174: BUILD-commitien viesteissä (PT kuittasi).
- HUOM: mittaukset tehdään kehitysbundlella ilman increased-memory-limitiä (TF:ssä se on) → TF:n marginaali on suurempi.

## Juna 175 runko 63fc300e3 (BUILD 174 5f84c3594:n päällä + 76bd7ad66)
Mukana: Pelikoodari pulu-automaatti 267413e08 (⊇ pulu-maat-10/13/14/16), NUI asettelutesti-paallekkain-175 523b4e8ec (⊇ osat, saapuminen,
ylivuoto; vain Editor), kirjainvali-175 76bd7ad66 + työkalu 326834f60, saadin-rivitys-175 822371b2e; LS1 ikkunavalot-175 a753d5b34
(⊇ julkisivuvalot 02421cc9b; LISÄÄ MUISTIA +2,36 Mt GPU / kehityskaupunki); Siirtoseppä esittely-1499 19028f893.
Testit L1292/P449/K453, unity 0, tarkista ok. EI VIELÄ (odottaa PT:tä): LS1 maa-dtm-175 08baea921 (+4,5 Mt, pari puiden alta),
LS1 ls-aanet 54ad76401, LR:n kartiokatot (Siirtoseppä vaihtaa kiinnityksen), LR Eiffel v1 (omistajan kortti; ~18 Mt, kuitattu teknisesti).
Lukitus kuten 173/174: Julkaisijan NYT → `PROTO_APP_KOPIO=… proto-kaanna.sh <runko>` → juna/b13 update-ref + juna.log → `git merge --no-ff
-F <viesti> juna/b13` päächeckoutissa (master, puhdas) → täysi SHA Julkaisijalle. Muistiajo ennen VIE:tä, jos juna lisää muistia.

## Kesken
1. **natiiviseppa/pohja-175** bd8cc2db2 (wt/proto-natiiviseppa-pohja175; PT kuittasi junaan 175 EHDOIN): alle 12 Gt pallossa MSAA 2×,
   SSAO pois, napakalotti 2048² (Ruudunpaivitys.PieniMuisti, testikytkin Documents/pieni-muisti.txt, komento `pieni-muisti 1|0|pois`).
   EHTO: ennen/jälkeen-kuvapari simulla → PT. Skenaario valmis: proto-3d/tyokalut/natiiviseppa-ajot/sk-pieni-muisti-175.txt.
   Julkaisijan vuoro jonossa (~06.50 jälkeen, raskaat simut edellä). Ajo: simukäännös bd8cc2db2 PROTO_APP_KOPIO:lla → `todistusajo.sh
   --era pieni-muisti-175 --udid A2A6FEF2-4779-4EA6-BC99-28C33C54F7E9 --laite ipad --app <app> --sha bd8cc2db2 --skenaario <sk> --nyt`.
   Kuvaparin jälkeen merge junan 175 runkoon.
2. Minimilaite-selvitys docs/raportit/minimilaite-20261010.md (PT:llä; omistajan myöhempi päätös).

3. **Unity 6.7 -laite-ABAB (PT 07.4x, omistajan kysymys; vie PT omistajalle heti)**: T7-kopio natiiviseppa/unity-67 = cb8f87f31
   (6.7-uudelleensarjallistus 44 tiedostoa + juna 174 3ca7ab1ba). B: 6.7-laitekäännös käynnissä 07.4x (vanha scratchpad
   32830f79…/unity67-laite.sh → lokit/natiiviseppa-app-ab67-laite/Matkakirja3D.app; loki natiiviseppa-unity67-laite.out ja
   T7 tulokset/laite-vahti.log). A: 6.3-laitekäännös samasta 3ca7ab1ba:sta kopiona `laite-sha-kopio.sh 3ca7ab1ba` (→ lokit/laite-rel-3ca7ab1ba,
   Julkaisijan vuoro). Sitten iPad-vuoro → `ipad-ab-ajo.sh <A.app> <B.app> <outdir>` (32830f79…/ab67/, JARJESTYS="A1 B1 A2 B2"; Pariisi +
   Olavinlinna: kehys, GPU ms, vapaa muisti, lämpö) → ab-analyysi.py → jatkoksi docs/raportit/unity67-tuonti-20261009.md + rivi PT:lle.
   Pulu-maat-23 078f8e8a4 on 175-rungossa (b7df7c444).

## Työkalut (uudet)
- proto-3d/tyokalut/natiiviseppa-ajot/portti-yhteenveto.py <ajokansio> → yksi rivi: jetsam, min vapaa, hätä, PORTTI OK/EI.
- muistitarkka-ipad-vali.sh (VALI=3 → ruutu 3 s välein). Odotusapuri scratchpadissa odota-loki.sh <loki> <teksti> <s> (taustalla).
- Worktreet: j175, pohja175, unity67 (T7). Raja 3.
