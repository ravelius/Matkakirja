# Julkaisijan luovutus 1.10.2026 klo 06.0x (viikkokiintiö 95 %)

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
- **Sisäinen testiryhmä puuttuu**: TF 85:n ajossa /v1/apps/{id}/betaGroups ei palauttanut isInternalGroup-
  ryhmää (82:lla "Beta testaajat" löytyi). Siksi 86→ ajettu `sisainen_ryhma=false`. TF 85:n laskuri ja
  yömerkki korjattu käsin (proto-3d/lokit/testflight-ordinaali.txt, yo-testflight-viimeisin.txt).
  testflight-sisainen.yml -diagnoosi ESTYI luokittimeen [Permission Grant] → omistaja tarkistaa ASC:sta
  tai antaa luvan. Ryhmiä ei ole muutettu.

## Olavinlinnan osoitin (EI vaihdettu — odottaa omistajaa)

- Nykyinen osoitin 65e2535be38cc19d. Osoitin-dispatch (`vie-dioraama.yml -f osoitin=true`) ESTYI
  Julkaisijan sessiossa luokittimeen [Production Deploy] → omistaja ajaa itse tai antaa luvan uudelleen.
- Ehto (Päätoimittaja, pidossa.txt): TF 90 julki + Siirtoseppä kuitannut **mainin kärjen** paketin.
  osoitin=true rakentaa aina mainin kärjestä, ei tiettyä hashia.
- Kuitattu: 19f1ff3246be7386 (v18 + lähimaasto v3c) juna 90 .appilla, 0 virhettä.
- #3759 (v19) mergetty 05.57 (main 22bf2c6c6) → **osoitinkohde 02987940f6567fd2** (v19 + v3c + taivas,
  blender 74cbb16a1214441f 127/127). **KUITATTU 06.0x** juna 90 .appilla (0 virhettä). Odottaa vain omistajan osoitinkomentoa.
- **LINNAN JÄÄDYTYS PÄÄLLÄ** (Päätoimittaja 06.0x): lippu /Users/Shared/Claude/julkaisija-tyokalut/linna-jaadytys;
  jonoon.sh ohittaa js/dioraama/, tools/dioraama/rakenna*, blender.json -PR:t. **#3763 (puukortit v3,
  ca2cb680a, blender 90c024a12714e713) PIDOSSA** — ei etusija-seuraava.txt:ssä. Kun omistaja on ajanut
  osoittimen: `rm linna-jaadytys` ja `echo 3763 >> etusija-seuraava.txt` (puukortit seuraavalle osoitinkierrokselle).

## Web-juna

- ketju-etusija8.sh (pid 2154): ennen jokaista PR:ää ajetaan etusija-seuraava.txt:n PR:t (linnan
  rebasetut PR:t lisätään sinne: `echo NNNN >> julkaisija-tyokalut/etusija-seuraava.txt`), sitten
  3723 3733 3738 3731 3735. ketju-3754.sh odottaa etusija8:n loppumista (#3754 maakuntakuvat C).
- Squash-merge rikkoo toisiinsa pohjautuvat linnan PR:t → aina rebase uutena haarana ennen ajoa.
- Mergetty yöllä mm. #3730, #3737 (Pöllö julkaistu), #3739, #3745, #3746 (v18), #3748, #3755.

## Vuorot

- Käännös- ja simulaattorijonot lähes tyhjät 05.56: Natiivi-UI FB234D08 (pelaajan-nakyma-2, 5 min),
  sitten Siirtoseppä (v19-kuittaus). 1 simulaattori kerrallaan, muisti ≥ 50 %, uninstall + shutdown
  omalla UDID:llä jokaisen ajon jälkeen (Päätoimittaja). Levy 48 Gt; < 40 Gt → `xcrun simctl delete
  503000D1` (rikkinäinen iPad Pro 11) varmistettuasi ettei kukaan käytä; laitekoot simukoot-20261001-0420.txt.
- Etusija: linna ja ISS ensin (omistaja 30.9.), juna/TF ennen testikäännöksiä.

## Omistajalle odottaa

1. Olavinlinnan osoitin (komento vie-dioraama osoitin=true) — Päätoimittaja antaa luvan kuittauksen jälkeen.
2. Sisäisen testiryhmän tarkistus ASC:ssa.
4. #3734 (.claude/settings.json hook) pidossa: omistajan suora lupa.
