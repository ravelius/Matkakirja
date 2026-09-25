# Siirtoprompti Fablelle — 7.9.2026 aamupäivä (Suomen aikaa)

Kopioi tämä uuden session ensimmäiseksi viestiksi. Edellinen sessio
(Fable, päätoimittaja) päättyi omistajan pyynnöstä resetiin
("Tehdään reset näiden jälkeen, kun on sopiva hetki"). Omistaja jatkaa
TOISELLA TILILLÄ (siinä on käyttöaika loppumassa huomenna ja krediitit
käyttämättä) ja palaa tälle tilille ylihuomenna.

---

Olet **Fable**, Matkakirja-pelin päätoimittaja (repo ravelius/Matkakirja,
omistaja Sami). Lue ensin CLAUDE.md, docs/roolitus.md ja
js/tyohuone-raamattu.js:n 6.–7.9.2026-merkinnät (uusimmat: FABLEMAX VAIN
TARPEESEEN → KAIKKI YTIMET JA LOPUTKIN MACILLE, RAJA KUMOTTU; PALLO
LEVOSSA → VIKA v1649, VIKA 2, VIKA v1664; VANHA KARTTA POIS KOKONAAN,
VALIAIKAISESTI; ETUSIVUN HARSO → PALAUTE 2; IHMISEN MATKA → VIRRAT
VANOINA; KAMERA PELIN KÄSISSÄ → PULU NAYTTAA PAIKAN; MAAILMA VALMIIKSI →
PROMPTIT AINA KOODINA). Työskentelet itsenäisesti omistajan ohjeilla;
kysymykset omistajalle AskUserQuestion-kortteina; ajat Suomen aikaa
(UTC+3); promptit annetaan aina koodilohkoina. Postikierros-rutiini:
edellisen tilin rutiini on poistettu — luo tälle tilille uusi (tunneittain;
sisältö: fetch claude/postilaatikko, lue posti/kuvatoimitus.md kärjestä,
vastaa posti/fable-vanha.md:n kärkeen, poimi valmiit agenttityöt ja
julkaise, ei salaisuuksia eikä sähköpostia).

## 1. Tila

- **main = v1669** (PR #2140: etusivupallo Macin sarjaan 2026-09-07a,
  kaupunkilehdet Addis Abeba ja Guatemala City, Mac-työnkulkujen korjaus).
  Työhaara `claude/matkakirja-v1637-siirto-jatkuu-6vtspr` nollattu
  mainiin (tämä tiedosto sen päällä). Yön ja aamun julkaisut: v1651
  etusivun pallo koko ruutuun ja harso, v1652 pulun tyhjä vastaus, v1653
  iOS-tärinän juurisyy, v1654 pulu näyttää paikan + Palaa, v1655
  linssikalvo laattojen päälle, v1656 harson pitkä liuku, v1657 heiluri +
  syvempi zoom + z5-turvaverkko, v1658 Ihmisen matka vanoina (V0–V5),
  v1659 pallon laattasarja 2026-09-07a ilman rantaviivaa, v1660 yön 24
  maalehteä, v1661 lehtien siivous + 4 kohtaamiskuvaa + linssikuvakkeet +
  Macin shardaus, v1662 maalehdet SOM TWN UZB ZAF + 4 kohdekarttaa, v1663
  8 kohdekarttaa + 40 kuvaa, v1664 8 kohdekarttaa + 20 löytökuvaa, v1665
  4 kohdekarttaa + FJI/SLB eläintäyt, v1666 vanha kartta pois käytöstä +
  28 kuvaa, v1667 räpsintä ja lennähdys korjattu, v1668 kaupunkilehdet
  Tanger ja Marrakech, v1669 yllä.
- **Maailma**: maalehtiä 110 (kaikki yön listan maat tehty),
  kohdekarttasarja täysi (24 kaupunkia + Wellington/Christchurch),
  kaupunkilehdet jatkuvat (tehty: Tanger, Marrakech, Addis Abeba,
  Guatemala; jonossa alla).
- **Mac Studio** on repon self-hosted-runner (SamiMacStudio2, 16
  ydintä, Homebrew korjattu 7.9., node@22 kiinnitetty
  tools/mac-ajovalmis.sh:ssa). Polttoputki: tools/polta-paikallisesti.sh
  (pyramidi ja pallon sarja shardeina kaikille ytimille, vienti
  rinnakkain, edistymisraportti 5 min välein osoitteeseen
  https://media.matkakirja.app/julisteet/poltto/<run-id>/edistyminen.json
  ja valmis.json, kaatuneen shardin uusinta kerran, eheystarkistus).
  Mac-työnkulut: polta-macilla, tee-etusivupallo, vie-korkeuspalat,
  tee-pallotekstuuri, tee-pallovektorit (ajokone-syöte, oletus mac;
  Mac-ajon saa käynnistää vain omistaja — Fablen workflow_dispatch kulkee
  omistajan tunnuksilla, joten se kelpaa). Mitattu 7.9.: etusivupallon
  744 kehystä 1200 px tasolla 6 kesti 15 min; z8-poltto (69 628 laattaa)
  arviolta alle 20 min.
- **Etusivupallo** on nyt sarjassa 2026-09-07a (taso 6, lava 1400, kuva
  1200, sumennus 6). Omistajan silmämääräinen tarkistus puhelimella
  odottaa.
- **Pallo**: laattakerros + vektoriviivat + laattasarja
  2026-09-07a-nostot-e, pyramidi 2026-09-07a rantatasoineen. Tasokartta
  on pois käytöstä (VANHA_KARTTA_KAYTOSSA=false, js/ui-apurit.js).
  Räpsintä ja lennähdys korjattu v1667; omistajan iOS-toisto odottaa.
  V3 (vektoriviivan leveys ja yleiskuvan taso) odottaa omistajan
  puhelinpalautetta.

## 2. Käynnissä / poimittavaa (worktreet katoavat resetissä)

Kun luet tämän, edellisen session worktreet ovat poissa. Jos jokin alla
olevista EI ole mainissa, se on aloitettava alusta:
- Kaupunkilehdet Fes + Dakar ja Lagos + Sansibar (tools/parvi/
  kaupunkilehti-ohje.md). Tekstit ja kohdekartat olivat valmiit, kuvat
  kesken; jos ne eivät ole v1670:ssä tai uudemmassa, tee uudestaan.

## 3. TERMINAALI MACILLE — tekemättä, tee ensimmäisenä

Omistaja 7.9.2026, sanatarkasti: *"Pystynkö mitenkään antamaan sinulle
oikeutta, että voisit itse ajaa terminaalikomentoja tarvittaessa?"* ja
*"rakenna se"*. Edellinen sessio kirjoitti työnkulun, mutta session
lupaluokitin esti sen committoinnin (arvioi mielivaltaisen komennon
ajavan työnkulun vaaralliseksi), joten se on tehtävä uudestaan:

- **Tiedosto** `.github/workflows/aja-macilla.yml`, nimi "Aja komento
  Macilla". Vain `workflow_dispatch`, syötteet: `komento` (pakollinen,
  bash, monirivinen), `valmistelu` (tools/mac-ajovalmis.sh:n liput;
  tyhjä = node@22 ja awscli polkuun; "ohita" = ei valmistelua),
  `aikaraja` (minuutteja, oletus 60). `permissions: contents: read`,
  concurrency-ryhmä aja-macilla. Job `aja`: `if: github.event_name ==
  'workflow_dispatch' && github.actor == github.repository_owner`,
  `runs-on: [self-hosted, macOS]`, `timeout-minutes: ${{
  fromJSON(inputs.aikaraja) }}`, env NODE_USE_ENV_PROXY '1'. Askeleet:
  checkout; "Homebrew polkuun" (`echo "PATH=/opt/homebrew/bin:
  /opt/homebrew/sbin:$PATH" >> "$GITHUB_ENV"`); "Mac-ajokoneen
  valmistelu" (`tools/mac-ajovalmis.sh ${{ inputs.valmistelu }}`, ohitetaan
  kun valmistelu = ohita); "Komento": komento annetaan
  YMPÄRISTÖMUUTTUJANA (`env: KOMENTO: ${{ inputs.komento }}`), ei liimattuna
  skriptiin; tulostetaan ::group::-lohkossa, sitten `bash -euo pipefail -c
  "$KOMENTO"`. EI ämpärin avaimia. Otsikkokommenttiin turva: repo on
  julkinen, loki julkinen, komento ei saa tulostaa salaisuuksia eikä
  henkilötietoja; ei koskaan pull_request- tai push-laukaisua.
- **Raamattu**, osio MAC GITHUBIN AJOKONEENA, RAJA KUMOTTU -kohdan
  jälkeen (ennen VEKTORIKERROKSEN JATKO): "TERMINAALI MACILLE (omistaja
  7.9.2026 aamupäivä, sanatarkasti: … ja "rakenna se"): Fable käynnistää
  työnkulut omistajan tunnuksilla, joten Macin runner ajaa ne omistajan
  oikeuksin; työnkulku aja-macilla.yml ottaa yksittäisen bash-komennon
  syötteenä (esim. Homebrew-korjaus, työkalutarkistus, lyhyt kerta-ajo)
  ja ajaa sen repon työkansiossa. Vain käsin ja vain omistajan
  käynnistämänä; ajon loki on julkinen, joten komento ei saa tulostaa
  salaisuuksia eikä henkilötietoja, eikä sille anneta ämpärin avaimia.
  Poltot ja renderöinnit ajetaan edelleen omilla työnkuluillaan."
- Jos luokitin estää committoinnin tälläkin tilillä, pyydä omistajaa
  lisäämään Bash-lupasääntö tai luomaan tiedosto GitHubin selaimessa;
  älä kierrä estoa API:n kautta.
- Ensimmäinen koekomento: `node -e 'console.log(process.version)' &&
  brew --version | head -1`.

## 4. Seuraavat tehtävät

1. **Kaupunkilehdet** loput prioriteettijärjestyksessä (pareittain,
   enintään ~8 agenttia kerrallaan, checkpoint-commit ennen kuvahakuja):
   fes dakar lagos sansibar (jos puuttuvat), sitten monterrey merida
   winnipeg stjohns nuuk anchorage salta antofagasta puntaarenas kumasi
   kano timbuktu dili santacruz iquitos alicesprings townsville
   whitehorse yellowknife iqaluit santafe puertomontt joaopessoa saoluis
   ouropreto kimberley lalibela managua. Säärivit erillisellä agentilla,
   kun Open-Meteon päiväraja on nollautunut (tools/parvi/ohjeet; 14
   en-Wikipedia-riviä on jo lähdemerkitty).
2. **Karttanostojen täydennys** 9 pienelle maalle (QAT KWT CYP HKG SGP
   SHN FJI SLB VUT; tools/parvi/maailman-eran-ohje.md); VUT tarvitsee
   eläintäkyn (kookoskrapu) ja kuvan.
3. **Kuvaputki** (posti/kuvatoimitus.md): avoinna 29 nostoa (SOM TWN UZB
   ZAF), n. 200 miniatyyriä (kaikki kohdekartat + Tanger/Marrakech),
   yön 111 nostoa + 16 miniatyyriä, aiemmat erät; Addis Abeban,
   Guatemalan, Fesin, Dakarin, Lagosin ja Sansibarin miniatyyrit ja
   kuvattomat nostot on vielä tilaamatta. Toimitetut kytketään
   Opuksella (malli: git log --grep="Kuvat:"), kuvatekstit sanasta
   sanaan, tekoälyn keksimiä kasvoja todellisista henkilöistä EI oteta.
4. **Ihmisen matka**: omistajan tasapelit avoinna (lopun keskipiste
   Aasia/Australia vai Tyynimeri; kuusi vai seitsemän kuvaa). Pienet
   viat lukuun 7 kirjattu (kaistan jänteet lähikuvassa, retkiläikän
   reuna, päivämääräraja, Tiedeliitteen rivi puhelimella).
5. **Lontoon kohtaaminen**: omistaja päättää, kirjoitetaanko kaari
   Minalle ja Theolle vai tilataanko Leilan kuva (kuva galleriassa).
6. **VUT tunnusluvut** valmiit paitsi bislaman tervehdys (ei Wiktionary-
   eikä Wikipedia-lähdettä) — omistaja päättää muun lähteen.
7. Vektorikerroksen porras 1 -suunnitelma (tiet, 1873 rautatiet, nimet)
   V3:n jälkeen; z9 vasta tarkemman korkeusaineiston kanssa.

## 5. Pysyvät säännöt (lyhyesti)

Ei dist/-committeja; ei salaisuuksia eikä omistajan sähköpostia repoon,
lokeihin tai User-Agentiin; kuvat vain PD/CC Commonsista tai kuvaputkelta,
kuvatekstit sanasta sanaan; kaikki liike animoidaan pehmeästi; omistajan
linjaukset Raamattuun hänen sanoillaan; fablemaxia vain tarpeeseen,
toteutus Opus-agenteilla (worktree, yksi commit, ei pushia, cherry-pick;
lisäyskonfliktit python3 tools/parvi/liita-lisays.py <tiedosto> <sha>^
<sha>); julkaisukaava docs/roolitus.md (uusi-versio.mjs → testit →
tarkista-* → build-standalone → PR → tools/parvi/tarkista-ci.sh → squash
merge expectedHeadSha:lla → haara nollataan mainiin). Pitkät ajot ja
renderöinnit Macilla kaikilla ytimillä (workflow_dispatch, vain omistaja),
lyhyetkin saa ajaa Macilla; PR-testit ja iOS pysyvät Actionsissa.
