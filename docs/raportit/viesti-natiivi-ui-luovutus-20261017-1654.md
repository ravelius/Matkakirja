# Natiivi-UI: luovutus 17.10.2026 klo 16.54 (Postivahti: kova raja 36 %)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Korvaa -1350:n jonon. Aiempien luovutusten "Opit" ovat yhä voimassa (-1350, -1200, -0930 …).
Viestit lähetetään send_messagella session id:llä (osoitteet: /Users/Shared/Claude/osoitekirja.md). PT:lle enintään 3 riviä.
Simua käytetään VAIN Julkaisijan SIMU NYT -viestistä, ja SIMU VAPAA lähetetään perään. Uusi käännösodottaja ilmoitetaan Julkaisijalle ETUKÄTEEN.
Ajot: /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/ (ketjut-20261016/yhteis-pariisi-200{d,e,f}-*.zsh). Laitteet: iPhone 123B4B25-36B7-4A76-B677-905621CD8F5A, iPad F7513985-C8BC-4E97-8D29-9C9BD420E962.

## OMISTAJAN PÄÄTÖKSET (PT:n kautta, sanatarkasti)
- **16.08:** "Iss paneelit nyt kumpikin muotopuolia. Katso tarkkaan kumpaakin ja mieti miten olisi parempi jos rakentaisit ne alusta."
  PT: laitenapit v2 ja levymerkinnät EIVÄT mene junaan (jäädytetty). Junaan nykyinen kamerapöytä nykyisellä ulkoasulla. KK:n suunnitelma:
  YKSI ohjauspöytä kahdella tilalla (LENTO | KAMERA), Cupolan robotiikkatyöaseman mallin mukaan, yhtenä 3D-mallina, matta harmaa levy,
  mustat nimet, valittu palaa, ≥ 44 pt, Ohita esittely / Pulu / etsin / kaupunkien nimet eivät koskaan pöydän päällä. Luonnos ensin, ei rakentamista ennen hyväksyntää.
  Valmis pöytä tyylikirjaan laitepöydän pohjaksi.
- **16.24** (luonnoksesta 1): "Ei saa olla noin korkea. Peittää liikaa näkymää" → ≤ 1/8 ruudusta, matalat rivit, iPadilla sama koko pisteinä, sauva yläviistosta.
- **16.33** (PT 16.4x, KK kannattaa): napeille kaksoismerkitys, valaistut tekstit vaihtuvat tilan mukaan: vipu NOPEUS ↔ ZOOM (LAAJA–TELE),
  näyttö paikka ↔ viimeisin kuva (napautus → galleria), monitoiminappi KOHTEET ↔ SEURAA; KUVAA, SUUNTA ja tilakytkin samat.

## TILA 16.54
- **Juna 200:** natiivi-ui/kamerapoyta-juna-200 7eee78829 (juna-200 + kamerapoyta-198 6d034cc5e ilman laitenappeja) → NS yhdisti, runko 7e719b637 vihreä.
  Web-PR #4811 (tyylikirja GALLERIA lasi) mergetty 326f7a013. Worktree kamerapoyta-juna-200 poistettu.
- **Luonnos 3 odottaa KK:ta / omistajaa:** /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/ohjauspoyta-luonnos3-1710/ (arkki3-{iphone,ipad}.png,
  poyta3-lento-kamera-lahi.png, LUE.md). Pöytä 393 × 78 pt yhdessä rivissä (iPhonella 9 %), iPadilla sama koko keskellä.
  Vasemmalta: vipu vaakana (valaistu NOPEUS/ZOOM), TILA LENTO | KAMERA, näyttö (PAIKKA / KUVAT), KUVAA, SUUNTA (sauva), monitoiminappi
  KOHTEET/SEURAA. Kosketusalueet poyta3-mitat.json. Luonnokset 1 ja 2: ohjauspoyta-luonnos-1700, ohjauspoyta-luonnos2-1650.
  Skriptit proto **natiivi-ui/ohjauspoyta-201** (wt/proto-natiivi-ui-ohjauspoyta-201, kärki 7d5dd7f0b): tyokalut/ohjauspoyta/luonnos{,2,3}.py
  (`Blender -b --factory-startup --python luonnos3.py -- <ulos> <viimeisin-kuva.png>`; kuvaksi kelpaa rajaus mistä tahansa Maa-simukuvasta).
- **Jäädytetty (ei junaan):** natiivi-ui/kamerapoyta-198 87169fdaf (laitenapit v2: nimen sovitus, kirkas hehku) + 030c06621
  (pohja-kamera.png TILA/KUVAT/OBJEKTIIVI/SUUNTA, tyokalut/ohjaamo-napit/pohja_kamera.py). Yhteishaara 85eaee09a sisältää ne.
- **Huntu** (VS 2ce907268) todennettu f-ajossa (K1c3 ennen | jälkeen) ja on junassa.
- **Kiina:** KS:n kysymys "esittely jää Käynnistä-painalluksen jälkeen" ei ollut UI-vika: väestöpinta −221 rakennettiin 3,1 s:n jumissa. KS korjasi aafdeed57
  (pinta esittelyn aikana, odotus ≤ 0,1 s/ruutu). KS ajaa v9-videon ja kertoo, jos ruutu silti jää.
- Apit _tyo/natiivi-ui: yhteis-pariisi-200d-app (8640682c0) ja -200f-app (cd9526ef1); c ja e poistettu. Yhteis-pariisi-200- ja -200b-app ovat tyhjiä kansioita.

## ENSIN
1. Odota PT:n viestiä luonnoksesta 3. Muutospyynnöt → luonnos3.py:n kopio luonnos4.py, render, kooste (ks. LUE.md:t; koostekoodi: vanha pöytä
   pois skaalaamalla näkymää ylhäältä vanhan pöydän yläreunaan (iPhone 2060 px, iPad 1990 px), pöytä alas keskelle).
2. Hyväksynnän jälkeen rakentaminen: uusi IssOhjaamo-pöytä (kuvat Blenderistä: levy + osat tiloittain kuten ohjaamo.json, valaistut tekstit koodissa
   Kirjasin.Lcd tai Mittari), Ohita esittely / Pulu / etsin pöydän yläpuolelle, kosketusalueet poyta3-mitat.json:n mukaan, sitten
   LAITEPÖYTÄ-pohja tyylikirjaan (web-PR kuten #4811). Rakentaminen omaan haaraan natiivi-ui/ohjauspoyta-201.
3. Jos jono on tyhjä: rivi PT:lle "JONO TYHJÄ: Natiivi-UI".

## Opit
- Tarkista.sh ajaa kirjainvali.py:n, joka MUUNTAA merkitsemättömät letter-spacing-arvot paikan päällä: anna uusille riveille kommentti, tai
  palauta muutos (git checkout) ennen committia.
- Käännöspalvelu hyväksyy useamman haaran: `proto-kaanna.sh A+B` (esim. oma kärki + toisen roolin korjaus samaan simuajoon).
- Paneelin alkuperäistä Blender-lähdettä (Linnanrakentajan tuotanto.py) ei ole koneella; pohja.png:n muutokset tehdään kuvaa muokkaamalla.
- Hidastuneen ruudun syy löytyy konsoli-stdout.log:sta: "kehysajat … max" heti komennon jälkeen.
- Älä kopioi renderöintikansion `poyta-*.png`:tä koostekansioon saman nimen päälle (luonnos 1:n koosteet ylikirjoittuivat kerran).
