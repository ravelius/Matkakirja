# Julkaisijan luovutus 24.9.2026 yö (klo 23.45)

Julkaisija (Opus 5.5) → seuraava Julkaisija **Sonnetilla** (Fablen käsky 22.2x). Checkout
/Users/Shared/Claude/Matkakirja-julkaisija, työkalut /Users/Shared/Claude/julkaisija-tyokalut/.

## Lue ensin

CLAUDE.md; Raamatun Ydinajatus kohta 2 (Julkaisijan rooli, JUMI → KORTTI, TYÖTAVAN NELJÄ PARANNUSTA) ja
NATIIVI PELI ETUSIJALLE; docs/roolitus.md "Julkaisusäännöt"; tämä luovutus; edellinen
viesti-julkaisija-luovutus-20260924-ilta.md; natiivi-testflight-putki-20260924.md.

## Tila

- **TestFlight build 11** = 1.0.11, CFBundleVersion 202609241848, proto 6ff16f3, ajo 36042445620, sisäisessä
  ryhmässä. Laskuri `/Users/Shared/Claude/proto-3d/lokit/testflight-ordinaali.txt` = **11**.
  Muutosloki-natiivi build 11: #3121 mainissa.
- Web mainissa tänä iltana: v2197–v2208 (#2913 #3048 #3049 #3050 #3052 #3053 #3080 #3082 #3116 #3118 #3119),
  dokumentit ja sisältöpaketit #3081 #3099 #3100 #3103 #3111 #3113 #3114 #3115 #3121,
  työnkulut #3120 #3124, **ensimmäinen sisältöjuna #3125 (v2207)**: kohdekartat #3083–#3091, #3094, N2 #3097,
  N4 #3098, N5 #3101, N6 #3104 (suljettu viittauksella junaan).
- Sisältöpaketin 1.x-osoitin: v68 (1.35) palautettiin illalla väärän hälytyksen vuoksi hetkeksi v67:ään ja
  takaisin v68:aan (Fable perui). Palautus: `gh workflow run vie-sisalto.yml -f palauta=N` (20 uusinta säilyy).

## Uudet työtavat (omistaja/Fable 24.9. klo 21–23, sitovat)

1. **JUMI → KORTTI + PUSH:** jos luokitin estää tai päätös puuttuu → AskUserQuestion-kortti omistajalle tässä
   sessiossa + PushNotification "Julkaisija: kysymyskortti auki — <aihe>" + yksi rivi Fablelle.
2. **BUILD-sana → TestFlight ilman Fablen käskyä:** kun Natiiviseppä ilmoittaa proto-master-mergen sanalla BUILD,
   aja heti `gh workflow run proto3d-testflight.yml --ref main -f vie_unitysta=true -f ordinaali=<laskuri+1>`.
   ÄLÄ käytä `-f versio=` (laskuri ei kasva). Yöajo klo 04 säilyy.
3. **Käännöskopio (#3124):** työnkulku vie kopiosta `/Users/Shared/Claude/proto-3d/Matkakirja-proto-kaannos`
   (worktree, levossa puhdas irrotettu master) ja ottaa saman lukon kuin Natiivisepän proto-kaanna.sh
   (`/tmp/matkakirja-kaannospalvelu.lukko`, odottaa ≤ 45 min). Natiivisepän Unity pääkopiossa ei enää estä.
   **#3124 ajetaan ensimmäistä kertaa seuraavassa buildissa — seuraa "Käännöspalvelun lukko" -vaihetta.**
4. **Allekirjoitus (#3120):** arkisto Manual-tilassa TF-nipun Distribution-SHA-1:llä + App Store -profiili
   (PROVISIONING_PROFILE_SPECIFIER_APP), vienti manual. Login-nipun FD3S699799 ei enää käytössä. Hakulistaan
   ei kosketa. Allekirjoitusvian uusinta ilman Unityä: `-f vienti_kansio=yo -f ordinaali=N` (~10 min).
5. **SISÄLTÖJUNAT:** sisältö-PR:t (kohdekartat, lehdet, galleria, ennenNyt, sää, sisältöpaketit) kahdesti
   päivässä (~klo 10 ja 20) yhtenä junana: `zsh juna.sh "<rivi ≤60>" <PR>...` (yhdistää, yksi versionosto,
   testit, PR, merge vihreänä, sulkee alkuperäiset viittauksella). PR, joka ei yhdisty, jää auki (RIVI: POIS).
   Toimintokorjaukset ja natiivin PR:t heti `jono.sh`:lla.

## Kesken — tee nämä ensin

Jono on ajettu tyhjäksi (#2913 v2208 viimeisenä, klo 23.40). pidossa.txt on tyhjä.

1. Seuraava sisältöjuna ~klo 10: avoimet sisältö-PR:t (ks. alla) — tarkista ensin mitkä ovat Fablen
   hyväksymiä (vanhimmat sisalto-* -PR:t 2895–3045 eivät ole olleet jonossa; kysy Fablelta ennen junaan ottoa).

## Avoimet PR:t luovutushetkellä (ei jonossa)

- Sisältö (junaan Fablen luvalla): #3106 (kuvatilausluonnos), #3069 (ennenNyt 35), #3068 #3066 (galleria),
  #3045 (inventaario), #3000 (N3), #2987 (N1-klusteri), #2991, #2930, #2927, #2935, #2897, #2895, #3042.
- Karttaseppä: #3117 (aluenimet em), #3108 (satelliitti), #3105 (nimiöfontti), #3102 (raportti).
- Linssiseppä: #3122 (radio-topografia).
- Muut: #3077 (Natiivi-UI, ristiriita), #3043 #3005 #2988 (luovutukset), #2981, #2926 (Julkaisijan vanha
  savukejono-PR — tarkista tarvitaanko).

## Odottaa omistajaa / Fablea

- Savukkeiden uusinnat (luovutuksen 3. kohta): kaikki 7 uusittua ajoa punaisia (esim. 36004651653:
  savuke-astro-pallo#puhelin 62/64 UUSI PUNAINEN). Fablelle tiedoksi; ei uusita enempää ilman käskyä.

## Julkaisukaava

Ennallaan (docs/roolitus.md): `git fetch origin main` ennen versionumeroa; jono.sh / juna.sh hoitavat
versionoston ja mergen. Yksi PR-worktree kerrallaan; Unity-vienti vain ≥ 30 Gt.

## Ympäristö ja opit

- Odottava TF-ajo perutaan, jos samaan jonoryhmään (savukkeet-mac-macilla) tulee uudempi odottava ajo:
  web-PR:ien pushit (js/css) laukaisevat savukkeet → laita web-PR:t pidossa.txt:hen kunnes TF on in_progress.
- Taustaodottajissa EI `pgrep -f jono.sh` (osuu odottajan omaan komentoriviin → lukko). Käytä pid:tä tai
  scratchpad-skriptiä, äläkä tulosta odottajan output-tiedostoon ennen loppua.
- Luokitin estää: `gh workflow disable`, työnkulun ajon haarasta (`--ref <haara>`), muiden ajojen perumisen,
  avainnippumuutokset. Työnkulkumuutokset ja PR:ien sulkeminen vaativat omistajan kortin.
- Vertaisviestien raja: ~10 lähtevää ilman omistajan kirjoitusta → niputa; tarvittaessa Postivahti välittää.
