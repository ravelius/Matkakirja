# Julkaisijan luovutus 1.10.2026 klo 07.5x (TILINVAIHTO)

Päivän kaikki vuorot: /Users/Shared/Claude/julkaisija-tyokalut/vuorot-20260928.txt (loppuosa).
Pidossa: /Users/Shared/Claude/julkaisija-tyokalut/pidossa.txt.

## TestFlight (versio kiinteä 1.1, build = juokseva numero)

- 1.1 (84)–(90) ladattu yön aikana; jokainen liitetty Arvioijat-ryhmään ja lähetetty beta-arvioon
  (ANOTHER_BUILD_IN_REVIEW → uusi yritys 30 min välein; aina uusin build).
- **TF 90** = proto master f89c5c79 (juna 12baf580, käännös 27c449e4), ladattu 05.52, beta-arvio 05.55.
  Sisältää Siirtosepän lukijakorjauksen 3a28322a (linnan ympäristöpaketin uusi muoto).
- **TF 91** = proto master 23041f6f (juna a84f649c, käännös f42339ca: Pulu turva-alue + pelaajan näkymä),
  ladattu 06.35, beta-arvio 06.39. Savuke 91 todensi mikserinapin piilotuksen ilman kehittäjätilaa (89:n TF-kohta).
- Juna 92: ei pyyntöjä (Natiiviseppä 06.3x).
- Kaava: muutoslokirivi PR:nä mainiin (tarkista MERGEABLE CLEAN) → `gh workflow run proto3d-testflight.yml
  --ref main -f vie_unitysta=true -f versio=1.1 -f ordinaali=NN -f proto_ref=SHA -f build_numero=NN
  -f sisainen_ryhma=false` → `gh workflow run testflight-ulkoinen.yml --ref main -f build_numero=NN`.
- Sisäinen testiryhmä: TF 85:n ajossa ryhmää ei löytynyt (ohimenevä API-vastaus). testflight-sisainen.yml
  build 91 (omistajan lupa 07.3x): "Beta testaajat" on olemassa, kaikki buildit automaattisesti, omistaja
  ryhmässä. Jatkossa TF ilman `-f sisainen_ryhma=false` (oletus true).

## Olavinlinnan osoitin

- **Vaihdettu 07.29** omistajan suoralla luvalla → 02987940f6567fd2 (v19 + v3c + taivas; ajo 36815257246,
  julkinen uusin.json vahvistettu). Siirtoseppä todentaa TF 91 .appilla 07.3x.
- Linnan jäädytys purettu; #3763 (puukortit v3) MERGETTY 07.4x; sen vie-dioraama-ajo 36817070107 oli
  kesken tilinvaihdossa → hash: `gh run view 36817070107 --log | grep '\*\*olavinlinna'`. Seuraava osoitinkierros: hash vie-dioraaman
  lokista → Siirtosepän kuittaus → omistajan lupa → `gh workflow run vie-dioraama.yml --ref main
  -f rakennus=olavinlinna -f kuiva=false -f osoitin=true` (rakentaa mainin kärjestä).

## Web-juna (tilinvaihdossa 07.53)

- Ajossa **#3734** (viestirajahook, omistajan mergelupa 07.3x; ajojono.sh 3734). #3763 ja #3735 mergetty.
- Taustalla jatkavat (nohup, eivät riipu sessiosta): ketju-etusija8.sh (pid 2154; etusija-seuraava.txt on
  tyhjä, lista käyty → päättyy #3734:n jälkeen) ja ketju-3754.sh (pid 2192; ajaa #3754 maakuntakuvat C
  etusija8:n jälkeen). Haltuunotto: `pgrep -fl "ketju-|ajojono.sh"`, lokit julkaisija-tyokalut/ketju-*.out;
  merge-ilmoitukset: #3734 → Päätoimittaja, #3754 → Sisältökirjuri ("on mainissa").
- Uusi PR junaan: `nohup zsh julkaisija-tyokalut/jonoon.sh NNNN &` tai `echo NNNN >> etusija-seuraava.txt`
  jos etusija8 vielä käynnissä. jonoon.sh:ssa linna-jaadytys-tarkistus (passiivinen ilman lippua).
- Squash-merge rikkoo toisiinsa pohjautuvat linnan PR:t → aina rebase uutena haarana ennen ajoa.

## Natiivi

- Juna 92: Siirtosepän ensilatauserä **894d16a4** (maasto 23,1 → 10,8 s, kuori 12,1 → 8,3 s) menee Natiivisepän
  kautta. Kun BUILD 92 PASS → muutosloki + TF (oletus sisainen_ryhma) + testflight-ulkoinen.
- Session omat taustavahdit (TF/ulkoinen) loppuivat; ei ajastuksia (loop/cron/Monitor) käynnissä.

## Vuorot

- Käännös- ja simulaattorijonot lähes tyhjät 05.56: Natiivi-UI FB234D08 (pelaajan-nakyma-2, 5 min),
  sitten Siirtoseppä (v19-kuittaus). 1 simulaattori kerrallaan, muisti ≥ 50 %, uninstall + shutdown
  omalla UDID:llä jokaisen ajon jälkeen (Päätoimittaja). Levy 48 Gt; < 40 Gt → `xcrun simctl delete
  503000D1` (rikkinäinen iPad Pro 11) varmistettuasi ettei kukaan käytä; laitekoot simukoot-20261001-0420.txt.
- Etusija: linna ja ISS ensin (omistaja 30.9.), juna/TF ennen testikäännöksiä.

## Omistajalle odottaa

- #3734 (viestirajahook) mergelupa omistajalta 07.3x → junassa #3763:n jälkeen.
