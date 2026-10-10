# Julkaisijan luovutus 10.10.2026 aamu (~08.25, PT:n nollauskäsky, konteksti 91 %)

Juokseva loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -80). Pitolista ja pysyvät linjat:
`julkaisija-tyokalut/pidossa.txt` (lopussa 10.10.). Kaikki alla oleva on myös lokissa aikaleimoin.

## 1. Simu- ja käännösjono juuri nyt

- **Lukossa** 08.17 alkaen: Natiivisepän junan 175 Release-laitekäännös d85e703fc (T7-kopio, lukko hänellä) → iPad-muistiajo.
- **Käynnissä:** LS2:n pitkä simu A26BC7D0 (alkoi 07.4x, ~55 min: Strömmen, omaaurinko, Préfecture, RH v3b, Concorde, Eiffel,
  ND v3d, pilvet, vesiväri + todistusajo, + Tukholman kaupungintalo v1 ennen|jälkeen ~5 min). Muistivahti 16 Gt päällä.
- **Jonossa järjestyksessä (raskas simu yksin, käännökset ryhmänä simujen väliin):**
  1. Siirtosepän esittely-nyky-arkki samasta 175/6.7-käännöksestä (PT 08.1x), kun Natiiviseppä ilmoittaa.
  2. Pelikoodarin jäätymiskoe ~09.05 (39644E75, oma 6.3-appi lokit/pelikoodari-pisteet-175/app2, sk-jaatyminen-a/-b, ~8 min).
  3. NUI:n kuvapari 85c8f47a4 + fonttikoko: 2 × (pallo ~3 + linna ~2 min), ei simuja, lukko vapaana osien välissä.
  4. LS1:n 4 ajoa 00CF62C2 (~20 min, simuvuoro-dtm-ls.zsh, app linssiseppa-app/maa-dtm-175b).
  - Natiivisepän 6.7-käännökset/iPad-ajot aina kärkeen (omistaja 07.4x).
- **Säännöt:** yksi raskas simu kerrallaan (Pariisi/Tukholma/Olavinlinna), memory_pressure free ≥ 20 % ennen käynnistystä,
  muistivahti jokaiselle simuvuorolle: `perl … setsid … /bin/zsh julkaisija-tyokalut/simu-muistivahti.zsh <TÄYSI UDID> 16`
  (raskas 16 Gt, kevyt 12; vahti sietää uudelleenkäynnistyksen ja loppuu kun simu alhaalla 5 min). Käännös ei raskaan simun rinnalla
  (juna edelle). Simusäännöt ma 12.10. asti (kuvaparit vain PT:n/omistajan pyynnöstä).
- Viestit: Desktop-session_message-raja (10) täyttyi; käytä SendMessage uds-osoitteella tai nimellä ("Natiiviseppä (Opus, high)",
  "Natiivi-UI (Opus, high)", "Siirtoseppä (Opus, high)", "PÄÄTOIMITTAJA (Opus, max)"). LS1 uds:/tmp/cc-socks/39935.sock,
  LS2 57431, Pelikoodari 62666, Sisältökirjuri 94709, Karttaseppä 69129 (vaihtuvat nollauksissa → ListAgents).

## 2. TF:t

- **TF 173 ja 174 TestFlightissa sisäisillä** (173: ajo 38022048008, sisäinen 07.04; 174: ajo 38022750730, BUILD 174 c47bded2c,
  sisäinen 07.16). Omistaja hyväksyi "Kyllä, molemmat".
- **TF 175 (Unity 6.7) TÄNÄÄN, omistajan pyyntö, vain sisäiselle:** runko natiiviseppa/juna-175 = a4c6539e5 (d85e703fc +
  unity-polku-175 920e5311c). Ehdot: Natiivisepän lukitus (simukäännös → BUILD 175 -merge masteriin → juna/b13), testit uusilla
  skripteillä, iPad-muistiajo läpi → kirjoita `julkaisija-tyokalut/muistiajo-175.txt` 1. rivi "OK <laite-SHA> <min vapaa Gt> <ajaja>".
  Resepti: muutosloki PT:ltä (≤ 3 lausetta / 280 merkkiä) → `muutosloki-api.sh 175 "<teksti>"` (aja checkoutissa) →
  `tf-kaynnista.sh 175 <BUILD 175 TÄYSI SHA> <muutosloki merge SHA>`. tf175-ei-ulkoista asetettu. Seuraa `gh run view` + tf175-ketju.log.
- **ULKOINEN ESTETTY** (omistaja 08.0x/08.1x): `julkaisija-tyokalut/ulkoinen-kielletty` → tf-kaynnista.sh ohittaa ulkoisen aina.
  Ei uusia buildeja ulkoiseen/julkisen linkin ryhmään ennen ikäkyselyä + kuratoitua tilaa. 165 ja julkinen linkki ennallaan
  ("Pidä auki"). ASC-tila (vain luku, `gh workflow run asc-tila.yml`): Arvioijat linkki PÄÄLLÄ raja 100, testaajia 0.

## 3. Unity 6.7 -putki (omistaja 07.4x päälinjaksi, 6.3 paluuta varten)

- `/Users/Shared/Claude/proto-3d/tyokalut/unity-polku.sh [--hakemisto|--maaritteet|--kirjastot|--versio] [projekti]` valitsee
  ProjectVersion.txt:n mukaan. 6.7 → symlinkki `/Users/Shared/Claude/unity/6000.7.0b4` (T7, ei välilyöntiä).
  `kirjastot-6000.7.0b4` → Natiivisepän T7-kopio proto-natiiviseppa-unity67/Library/ScriptAssemblies: SIIRRÄ pääkopioon
  (Matkakirja-proto/Library) kun se on 6.7:ssä; Natiiviseppä ei poista T7-kopiota ennen ilmoitustasi.
- proto-kaanna.sh + mac-kaanna.sh (proto-3d/tyokalut, ei gitissä) käyttävät sitä (varmuuskopiot .ennen-unity67-20261010).
- Proton haarat: julkaisija/unity-polku bd281dcb9 (unity-vahti, ui-asettelutesti) ja julkaisija/unity-polku-175 920e5311c
  (unity-tarkistukset, kaanna.sh:t, aja.sh, kaanna-editori; kääntäjäketju 6.3:sta) — molemmat mergetty juna-175:een.
- Ensimmäinen 6.7-käännös tuo jaetun käännöskopion Libraryn uudelleen (PT hyväksyi, ei toista kopiota). 6.3-tagit
  unity63-viimeinen (c47bded2c) ja unity63-viimeinen-175 (b7df7c444).

## 4. Osoittimet (kartta/omat-mallit/)

uusin.json = v2/giza (vanhat ≤169) · uusin-2 = **v6b3** · uusin-3 = **v6h3** · uusin-4 = **v6k4** (ND v3d + KL v6j, omistaja
hyväksyi; Natiivisepän iPad A 0,74 Gt). Työkalu `osoitin-omat-mallit.sh <versio> [2|3|4]` (regex, tukee 6b3/6hk3).

## 5. Viennit ja portit

- vie-paketti.sh portit: 4b omien mallien portti (LS2 omat_mallit_ktx2.py) ja 4c ääniportti (Pelikoodarin aaniportti.py,
  POIKKEUKSET-lista PT:n päätöksin). Pulu: `julkaisija-tyokalut/pulu-paketti.zsh <nimi> MAA:sha:haara …` → vie-paketti.sh →
  `pulu-maat-yhdista.zsh MAA=aikaleima` (maat.json nyt 25 maata, vanhat varmuuskopiot ämpärissä maat-varmuus-*).
- Levy 108 Gi (raja 100; DerivedData/Natiivisepän siivous vain jos < 100). NAS-arkistointi: nas-arkistoi-viedyt.zsh, lokit-nas.zsh.

## 6. Avoimet PR:t

#4326 (Sisältökirjuri: tekoäly ja alaikäiset, luonnos), #4256, #4251, #4006 — ei merge-pyyntöjä minulle. Kaikki minulle
pyydetyt (#4311, #4312, #4313, #4314, #4315, #4318, #4319, #4320, #4321, #4324, #4325, #4266) on mergetty.

## 7. Kielletyt tavat (muistutus)

Ei `zsh -c`/`bash -c`/eval (PT pysäytti 00.40) → skriptit tiedostoon ja `zsh tiedosto`. Ei rm muuttujapoluilla.
