# Linssisepän luovutus 11.10.2026 aamu (05.2x, nollaus PT:n käskystä 50 %)

Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Simu-, käännös- ja laitevuorot vain
Julkaisijalta (KÄÄNNÖS NYT / SIMULAATTORI NYT). Ajoskriptit ja skenaariot: proto-3d/tyokalut/linssiseppa-ajot/.
Ketjut ajetaan irrotettuna (`perl -MPOSIX=setsid -e 'fork and exit; setsid; exec @ARGV' /bin/zsh -c "zsh <ketju>.zsh > <loki> 2>&1"`),
simuosuus porttitiedoston (`touch <nimi>.nyt`) tai toisen lokin "KETJU VALMIS" -rivin takana. ÄLÄ muokkaa käynnissä olevaa zsh-skriptiä.

## Kuitattu ja SHA lähetetty Natiivisepälle
- **JUNA 181 KIIRE Pariisin saapumisesitys: 6839cc2db** (linssiseppa/esitys-musiikki-181, wt proto-linssiseppa-intro). Sis. e38a38dee,
  7b3dab676 (nopean esilataus), b9870c350 (väistö 0,8), 62f261ba5 (traileri puuttui ajoittain: fokusvirrat ladataan käynnistyksessä,
  traileripäätös odottaa ≤ 1,5 s), 6839cc2db (korotus Asetus aanet.EsitysMusiikinKerroin 6,8, lasku aanet.EsitysLaskuMs 3000).
  Mittaus: puhe = musiikki samassa ruudussa; tauossa −38 dB; puhe +22 dB. Todistus lokit/todistus-esitys-korjaus6-iphone-20261011-0235.
- **JUNA 181 kippi: 901178b19** (linssiseppa/kippi-pysahdykset-181, wt proto-linssiseppa-taidemuseo; eca61364a + 12cf54844 + 140b9c0c5 +
  2961b872d + 34f81a620 + 901178b19). 0 seisahdusta (QA `opas nopeusloki 1`), ND länsijulkisivu, Concorde lähellä, aukiot luokasta,
  esteväistö, San Marco ja tornin vieressä olevat aukiot vanhaan kehykseen, Venceslas kauempaa. PT kuittasi 2961b872d; jatko 34f81a620 +
  901178b19 PT:n ennakkokuittauksella ("pieni jatkocommit samaan junaan") — PT:lle lähetetty rivi, kuittausvastaus kesken.
  Todistukset lokit/todistus-kippi-pysahdykset-181-c-20261011-0346, todistus-aukiot-jalkeen4-181-20261011-0508.
- **JUNA 181 pallokompassi: 89e2d373a** (vain PalloKori.cs, merge kipin kanssa puhdas). Todistus lokit/todistus-pallokompassi-uusi-iphone-20261011-0447.
- **JUNA 182 Soundly v2: 229141f7c** (linssiseppa/soundly-kippi-182; aaniportti 37/0/0).

## Kesken
- **Pöllö-PR ravelius/Matkakirja#4384** (linssiseppa-liiku-luokka 5d4e362a0): lukitun kaupungin /opas/liiku-listaan luokka + korkeus_m
  esittelystä. Julkaisija mergeää vihreänä. Mergen jälkeen natiivi antaa 10 aukiolle lähikehyksen (nyt null-luokka → varovainen vanha
  kehys; Prešerenin aukio turhaan). Todennus: aukioajo `simuvuoro-aukiot-181.zsh`-tyylillä (sk-aukiot-181.txt) uudella käännöksellä.
- **Kaupunkipuut → juna 182** (PT 05.1x EI 181): Opus-agentti aloitti 05.1x wt proto-linssiseppa-puut (linssiseppa/kaupunkipuut-181,
  kärki ef020d7a7): runko–latvus-suhde + maahan ankkurointi, Tukholman tuplalatvukset Googlen puiden kanssa pois, uusi skenaario
  sk-puut-182.txt oikealta katutasolta, QA-rivi "kaupunki: puut muisti". NOLLAUS VOI KATKAISTA AGENTIN: tarkista `git -C
  /Users/Shared/Claude/wt/proto-linssiseppa-puut status` ja log; jatka tai käynnistä uudelleen. Sitten käännös + iPad-ajo (sk-puut-182) +
  iPad Pro 13 -muistiajo (Natiivisepän muistiportti) → kuvapari PT:lle.
- ND worker-PR #4381 MERGED (esittely-v1g ämpärissä).

## Työkalut (uudet)
- mittaa-esitys.py (aaltomuoto; HUOM wavissa "Pariisi" ~1,6 s ja iskulause ~3,5 s), mittaa-kippi-nopeus.py (pysähdyslista + nopeus.png).
- Ikkuna-RMS: `ffmpeg -ss A -t B -i aani/esitys.wav -af volumedetect -f null -`. Videon ääni: `-ss 0.08` wavista (ei loudnormia).
- numpy-python: /Users/Shared/Claude/proto-3d/_lahteet/venv-laser/bin/python (myös aaniportti.py).
- Levy: linssiseppa-app = esitys-musiikki-181-e, kippi-pysahdykset-181-d/-e, testi-181 (poista vanhat kuittauksen jälkeen);
  korvatut todistukset NAS:lle /Volumes/NAS-Homes/koodaus/Claude/Matkakirja-arkisto/linssiseppa/.
