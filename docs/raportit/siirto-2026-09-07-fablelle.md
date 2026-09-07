# Siirtoprompti Fablelle — 7.9.2026 aamupäivä (Suomen aikaa)

Kopioi tämä uuden session ensimmäiseksi viestiksi. Edellinen sessio
(Fable, päätoimittaja) päättyi omistajan pyynnöstä resetiin
("Tehdään reset näiden jälkeen, kun on sopiva hetki").

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
poista vanha trig_01DXs2nnyR9UK56Jwrpnvu3Q ja luo uusi tähän sessioon
(tunneittain; sisältö: fetch claude/postilaatikko, lue
posti/kuvatoimitus.md kärjestä, vastaa posti/fable-vanha.md:n kärkeen,
poimi valmiit agenttityöt ja julkaise, ei salaisuuksia eikä sähköpostia).

## 1. Tila

- **main = v1668** (PR #2139) + docs. Työhaara
  `claude/matkakirja-v1637-siirto-jatkuu-6vtspr` nollattu mainiin
  (tämä tiedosto sen päällä). Yön ja aamun julkaisut: v1651 etusivun
  pallo koko ruutuun ja harso, v1652 pulun tyhjä vastaus, v1653 iOS-
  tärinän juurisyy (tartuntapiste, kehysolio), v1654 pulu näyttää
  paikan + Palaa, v1655 linssikalvo laattojen päälle, v1656 harson
  pitkä liuku, v1657 heiluri + syvempi zoom + z5-turvaverkko, v1658
  Ihmisen matka vanoina (V0–V5), v1659 pallon laattasarja 2026-09-07a
  ilman rantaviivaa (Macin uusintapoltto, 7,5 h), v1660 yön 24
  maalehteä, v1661 lehtien siivous + 4 kohtaamiskuvaa + linssikuvakkeet
  + Macin shardaus, v1662 maalehdet SOM TWN UZB ZAF + 4 kohdekarttaa,
  v1663 8 kohdekarttaa + 40 kuvaa, v1664 8 kohdekarttaa + 20
  löytökuvaa, v1665 4 kohdekarttaa + FJI/SLB eläintäyt, v1666 vanha
  kartta pois käytöstä + 28 kuvaa, v1667 räpsintä ja lennähdys
  korjattu, v1668 kaupunkilehdet Tanger ja Marrakech.
- **Maailma**: maalehtiä 110 (kaikki yön listan maat tehty),
  kohdekarttasarja täysi (24 kaupunkia + Wellington/Christchurch),
  kaupunkilehdet jatkuvat (tehty: Tanger, Marrakech, Addis Abeba,
  Guatemala; jonossa alla).
- **Mac Studio** on repon self-hosted-runner (SamiMacStudio2, 16
  ydintä). Polttoputki: tools/polta-paikallisesti.sh (pyramidi ja pallon
  sarja shardeina kaikille ytimille, vienti rinnakkain, edistymisraportti
  5 min välein osoitteeseen
  https://media.matkakirja.app/julisteet/poltto/<run-id>/edistyminen.json
  ja valmis.json, kaatuneen shardin uusinta kerran, eheystarkistus
  ennen luettelon vientiä). Koeajo 7.9. klo 10:17: yksi ydin 4,55
  laattaa/s, z8 16 ytimellä arviolta alle 20 min. Mac-työnkulut
  etusivupallolle, korkeuspaloille, pallotekstuurille ja pallovektoreille
  (ajokone-syöte, oletus mac). Ensimmäinen etusivupallon Mac-ajo kaatui
  Homebrewin node-kirjastovirheeseen (libsimdutf) → korjaus PR:ssä
  (node@22 kiinni, versio-syöte, ei ylikirjoitusta); omistajalle annettu
  komento `brew update && brew upgrade && brew reinstall simdutf`.
- **Pallo**: laattakerros + vektoriviivat + laattasarja
  2026-09-07a-nostot-e, pyramidi 2026-09-07a rantatasoineen. Tasokartta
  on pois käytöstä (VANHA_KARTTA_KAYTOSSA=false, js/ui-apurit.js).
  Räpsintä ja lennähdys korjattu v1667 (pinnanPiste yhdestä lähteestä,
  takapuolen pisteet pois osumatestistä); omistajan iOS-toisto odottaa.
  V3 (vektoriviivan leveys ja yleiskuvan taso) odottaa omistajan
  puhelinpalautetta.

## 2. Käynnissä / poimittavaa (worktreet katoavat resetissä)

Kun luet tämän, edellisen session worktreet ovat poissa. Jos jokin alla
olevista EI ole mainissa, se on aloitettava alusta:
- Kaupunkilehdet Fes + Dakar, Lagos + Sansibar (tools/parvi/
  kaupunkilehti-ohje.md; jos eivät ole v1669:ssä tai uudemmassa, tee
  uudestaan).
- Mac-työnkulkujen korjaus (node@22 kiinni, etusivupallon versio-syöte).

## 3. Seuraavat tehtävät

1. **Etusivupallon Mac-ajo** uuteen versiokansioon (taso 6, lava 1400,
   kuva 1200, sumennus 6), kun Homebrew on korjattu; sen jälkeen
   js/etusivupallo.js ETUSIVUPALLO_VERSIO uuteen kansioon ja julkaisu.
2. **Kaupunkilehdet** loput prioriteettijärjestyksessä (pareittain,
   enintään ~8 agenttia kerrallaan, checkpoint-commit ennen kuvahakuja):
   monterrey merida winnipeg stjohns nuuk anchorage salta antofagasta
   puntaarenas kumasi kano timbuktu dili santacruz iquitos alicesprings
   townsville whitehorse yellowknife iqaluit santafe puertomontt
   joaopessoa saoluis ouropreto kimberley lalibela managua. Säärivit
   erillisellä agentilla, kun Open-Meteon päiväraja on nollautunut
   (tools/parvi/ohjeet; 14 en-Wikipedia-riviä on jo lähdemerkitty).
3. **Karttanostojen täydennys** 9 pienelle maalle (QAT KWT CYP HKG SGP
   SHN FJI SLB VUT; tools/parvi/maailman-eran-ohje.md); VUT tarvitsee
   eläintäkyn (kookoskrapu) ja kuvan.
4. **Kuvaputki** (posti/kuvatoimitus.md): avoinna 29 nostoa (SOM TWN UZB
   ZAF), n. 200 miniatyyriä (kaikki kohdekartat + Tanger/Marrakech),
   yön 111 nostoa + 16 miniatyyriä, aiemmat erät. Toimitetut kytketään
   Opuksella (malli: git log --grep="Kuvat:"), kuvatekstit sanasta
   sanaan, tekoälyn keksimiä kasvoja todellisista henkilöistä EI oteta.
   FJI/SLB kuvatekstit päivitetty v1666.
5. **Ihmisen matka**: omistajan tasapelit avoinna (lopun keskipiste
   Aasia/Australia vai Tyynimeri; kuusi vai seitsemän kuvaa). Pienet
   viat lukuun 7 kirjattu (kaistan jänteet lähikuvassa, retkiläikän
   reuna, päivämääräraja, Tiedeliitteen rivi puhelimella).
6. **Lontoon kohtaaminen**: omistaja päättää, kirjoitetaanko kaari
   Minalle ja Theolle vai tilataanko Leilan kuva (kuva galleriassa).
7. **VUT tunnusluvut** valmiit paitsi bislaman tervehdys (ei Wiktionary-
   eikä Wikipedia-lähdettä) — omistaja päättää muun lähteen.
8. Vektorikerroksen porras 1 -suunnitelma (tiet, 1873 rautatiet, nimet)
   V3:n jälkeen; z9 vasta tarkemman korkeusaineiston kanssa.

## 4. Pysyvät säännöt (lyhyesti)

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
