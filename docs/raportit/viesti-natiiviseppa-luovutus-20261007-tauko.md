# Natiivisepän luovutus 7.10.2026 (tilin 5 tunnin tauko 13.45–15.00)

Luovuttaja: Natiiviseppä (Opus 5.5, high). Edellinen: viesti-natiiviseppa-luovutus-20261005-iltapaiva.md (käytännöt voimassa).
Tarkempi lokirivistö: muisti natiiviseppa-tila-20261003.md (uusin rivi ylimpänä).

## ALOITUSVIESTI (Päätoimittaja herättää klo 15.00 jälkeen)

Olet Natiiviseppä (Opus, high). Lue tämä osio, MEMORY.md ja natiiviseppa-tila-20261003.md. Kytke Remote Control päälle.
Juna-SHA:t otetaan vain PÄÄTOIMITTAJAN suoralla kuittauksella; käännökset, simut ja iPad vain Julkaisijan NYT-viestillä.
Tarkista ensin taustalla jatkuneiden ajojen tulokset (alla) ja kerro ne Julkaisijalle ja PÄÄTOIMITTAJALLE.

## TILA HETI

- **BUILD 159 = master b00c06f7**; TF 159 ja Mac TF 159 ladattu. Mac TF -työnkulku: proto3d-mac-testflight.yml
  (`mac-kaanna.sh <SHA> 1.1 <build>` MATKAKIRJA_APPSTORE=1 + MATKAKIRJA_BUNDLE_ID=fi.matkakirja.peli, kopio
  lokit/natiiviseppa-mac-tf-<build>-<sha>, lataus vasta Julkaisijan luvalla).
- **JUNA 160:** runko natiiviseppa/juna-160-koe **2309f55d** (b00c06f7 + 264ef4e8 + 2db2d9d9 + NUI 7f262261 + NUI d277c738 +
  LS2 59d44e87), VAHVISTETTU. Koekäännös a5b381a7, savu OK. Odottaa: Laitetestaajan rutiini → VIE (Päätoimittaja) →
  JUNAN AVAUS NYT (Julkaisija) → `git update-ref refs/heads/juna/b13 2309f55d <vanha>` + juna.log, BUILD 160 master-merge,
  muutosloki-PR Päätoimittajan tekstillä, TF 160 + Mac TF 160.
- **JUNA 161 -korjaukset:** haara natiiviseppa/juna161-korjaukset **074c95a3** (wt/proto-natiiviseppa-kirjoitus) =
  kirjoituskoneääni f222e5eb (Aloitusnakyma soittaa Tehoste("pen") sanoittain, kuten webin KIRJOITUSRYTMI; iOS + Mac) +
  Mac vSync 107fabeb (Ruudunpaivitys: Macilla vSyncCount = näyttö/fps, oli 0 → repeämä) + lokirivi "MATKAKIRJA ruutu: Mac vSync".
  - KÄÄNNÖS NYT 12.47: iOS-yhdistelmä 074c95a3+47622521f(LS1 yövalot)+e16d100db(LS2 pallo-puoli), loki
    lokit/kaannospalvelu/20261007-124705-*.log, app-kopio lokit/natiiviseppa-juna161-koe/. Valmistuttua appin polku ja
    yhdistelmän SHA Julkaisijalle, LS1:lle ja LS2:lle. Sitten mac-kaanna 074c95a3 (dev, 1.1).
  - Todennus kesken: iOS intro "jälkeen"-kaappaus (linssi-komento `kaappaa N nimi`) vs lokit/natiiviseppa-savu160/intro-ennen.wav
    (pen-sovitesuodin freesound-856165); Mac intro-kaappaus + "Mac vSync"-lokirivi + nopea panorointi "jälkeen".
  - Mac repeämä ENNEN: TF 159 -kopiolla lokit/natiiviseppa-mac-repeama/ennen-panorointi.mov (hiiri veda 700 550 1300 550 0.25 16).
    screencapture tallentaa koostetun pinnan, joten repeämä ei näy kuvissa; juurisyy on koodissa (vSyncCount 0).
- **Muut juna 161 -ehdokkaat (odottavat Päätoimittajan SHA-vahvistusta):** LS1 torjunnan kesto, Siirtoseppä eleet-2 **67728f0b**
  (korvaa 1ca51a6b; kytkimet poikki eleet / poikki puolilahi), NUI lippurivin kielikorjaus, NUI kehittaja-tf **270992bd**
  (korvaa bb05c48a). kehittaja-tf todennetaan App Store -käännöksellä: ilman koodia ei Kehittäjä-riviä; testaajakoodilla
  (Päätoimittajalla) kaikki linssit ja vapaa liikkuminen ilman Kehittäjä-riviä; täydellä koodilla (POLLO_KEHITTAJAKOODI
  tiedostossa ~/.matkakirja-avaimet-koodaus.zsh) kaikki, myös Giza-kytkin. Koodia ei lokiin eikä viesteihin.
- **iPad FACEIT ABAB** (00008103): taustalla `ipad-faceit-abab.sh` klo 12.48 alkaen; analyysi
  `python3 lokit/natiiviseppa-skriptit/faceit-analyysi.py <kansio>` (raja 0,3 ms/kehys), yksi rivi Päätoimittajalle + Siirtosepälle.
- **Actions-ajurit** siirretty /Users/Shared/Claude/actions-runner(-2) (muisti actions-ajurit-shared-polussa).
