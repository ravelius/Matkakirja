# Valosepän luovutus 7.11.2026 klo 00.45. Itsenäinen: vanhoja ei tarvitse lukea

Syy: konteksti 31 %, pehmeä raja. Tili vvi@vvi.fi. Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup`. Kuvat vain JU:n vuorolla, ei omaa ajoa. Mikään ei mene junaan. PT:n rajat yöllä: vain Pariisi, Lontoo, juoksupeli. Jumi: kaksi yritystä tai noin 30 min, sitten rivi PT:lle tai KK:lle.

## 1. LONTOO C: KOODI VALMIS, ODOTTAA PALOJA
Haara `linssiseppa2/lontoo-c`, kärki e031ce161, työpuu `/Users/Shared/Claude/wt/proto-linssiseppa2-k32`. Koodi `Assets/Matkakirja/Kartta/OhjelmaKohdeLontoo.cs`, rekisteri `OhjelmaKohteet.cs` LontoonKohteet(), testi `LontoonNimettyjenMitat`. Unity 0 virhettä; Mitat 10/11 (`ConcordenAukionMitat` kaatuu pikakäännöksessä, koska `concorde-esineet.bytes` ei löydy, ei liity Lontooseen).
Aineisto `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/lontoo-c/`: `aja-geometria.sh` (testit + OBJ), `obj/`, `esi/` (esikatselu, `pari-{bb,sp,tb}.png`), `sk-c1.txt`, `ajo-c1/ARVIO.md`, `ajo-c1/pari-*.png`. Esikatselu: `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I ../ohjelmakohteet/esikatsele.py obj esi <nimi> <kallistus> <suunnat> <leveys>`; kallistus 0 = sivulta, suuri = ylhäältä.

Tilanne ajon c1 jälkeen (a8d971917, palat-d2; kuvat `lokit/linssiseppa2-lontoo-c1-a8d971917`, arvioitu):
- Paikat oikein. PT tunnisti esikatseluparit oikeiksi rakennuksiksi; Tower Bridge tunnistuu myös pelikuvasta.
- Korjattu, mutta EI VIELÄ PELISSÄ NÄHTY: rummun pullistuma (626c5709f, PT:n löytö), pistekohina (Big Benin taulu, kupolin rivat, Tower Bridgen ristikko) ja Abbeyn sininen katto (e031ce161).
- St Paul'sin katot ja rumpu jäävät OSM-talon way/369161987 alle. PK poistaa sen palat-d3:ssa, ja hän tarkistaa Tower Bridgen kohdan (laiturit, tornien katto ja kannen alla näyttävät talon värisiltä; päätelty kuvasta, way-tunnuksia ei haettu). PK lähettää kansion viestinä; PK:lla on kovan rajan nollaus kesken.
- ARVIOIMATTA: St Paul'sin maan taso. `StPaulMaa` = 23 (seinien matalin kohta, pinta 22,5; mediaani noin 35), kuten Saint-Eustache, koska helma näkyy pelissä (`OhjelmaKohteet.TeeVerkko`; tämä korvaa luovutuksen 20261106-2355 ohjeen "seinät alas"). Keskellä malli on noin 16 m pinnan alla. Katso, istuuko se taloihin nähden.
- Big Ben (KK c): 75 px lähimmältä, 1,1 px/m. PT:lle annettu suositus: oikea koko, ei liioittelua. Liioittelu olisi linjamuutos, ei ilman KK:ta.
- Abbeyn akseli tarkistettu OSM:stä: -5,5°, koodissa -5,1°; ei muutettu.
- Exception-rivit luettu (11 riviä, 4 erilaista viestiä, loput pinoa): Cesium ion app data ja sen jatko AppDomainin latauksessa sekä ArgumentOutOfRange pinossa `UnityEditor.Search.SearchInit.IndexationOnStartup`. Kaikki editorin omia, ja samat viestit ovat ajossa 37. Eivät tule Lontoon koodista. Lue c2:n rivit samalla tavalla.

SEURAAVA: kun palat-d3 tulee, vaihda `talot kansio` tiedostossa sk-c1.txt, pyydä JU:lta ajo c2 kärjestä (PK yhdistää kärkensä 2fcf9008d päälle; käytä yhdistettyä, jos valmis), arvioi täysikokoisina rajauksina, tee parit ja lähetä PT:lle. PT vie KK:lle. Parit ovat 45° pelikuva vs. valokuva; KK:n (d) pyysi samaa kulmaa, joten lisää kuvalistaan matala kulma (`kallista`, tarkista raja lokista) ja vertaa suuntiin: St Paul's 0, Tower Bridge 110, Big Ben 45. Rajausten keskipisteet ovat täysikoon kuvassa noin Big Ben (1417,1034), St Paul's (1355,1030), Tower Bridge (1326,1030) lähin-kuvissa, ja `esi/`-mittakaava vaatii suurennoksen.
PT 00.4x: c1:n paikat ja Tower Bridge kelpaavat kokeena; ei KK:lle ennen c2:ta. PT vie Big Benin suosituksen KK:lle ja tilasi palat-d3:n PK:lta. c2 kärjestä, jossa ovat 626c5709f ja e031ce161. LISÄÄ c2:EEN ABBEYN PARI (viite: katso `viite/LAHTEET.md`, Abbeyn kuvaa ei ehkä ole: hae Commonsista luvan mukaan tai kerro PT:lle). Jos kansiota ei ole kohtuullisessa ajassa, älä odota: tee muuta Lontoota ja rivi PT:lle.
Sääntö ajosta: lähimmältä 1,1 px/m, joten alle metrin korkean kontrastin yksityiskohdat hajoavat pisteiksi.

## 2. PALAIS BOURBONIN PIHA
PT: ei saa viivyttää Lontoota. `sk-pb-piha.txt` pc-etela, pc-pohjoinen ajossa 37 (`lokit/karttaseppa-yhteinen-37-b8-eec08f293`) on katsomatta; katso kerran seuraavan ajon yhteydessä tai jätä KS:n ajoon 38.

## 3. JONOSSA (vasta Lontoon jälkeen)
Rosoisuus; mallin valo kääntyy kameran mukana, varjo ei; 65°:n yläreunan vyö, La Défensen läpikuultavat tornit, maan viiva 75°; `git show origin/linssiseppa2/luovutus-20261106-1826:docs/raportit/viesti-valoseppa-luovutus-20261106-1826.md` kohta 6. Ääriviivojen iPad-mittaus ennen junaa (PT).

## TEKNIIKKA
Python + PIL `/opt/homebrew/bin/python3`; numpy, cv2 `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I`. `sh ./unity-tarkistus.sh` kansiosta `Linssit-testit/` (sh, ei zsh). Maasto `_tyo/pelikoodari/lontoo/a/maasto.py`: `korkeus(la, lo, 12)[0]`. Seuraamattomat `.claude/settings.local.json.ennen-kevennysta` ja `waveletNoiseTile.bin`: ei koskettu. Kotihaara on jäljessä: luovutus plumbingilla (väliaikainen GIT_INDEX_FILE, read-tree origin/main, hash-object, update-index, write-tree, commit-tree, push). SendMessage voi pysähtyä: varakanava `mcp__ccd_session_mgmt__send_message`.
