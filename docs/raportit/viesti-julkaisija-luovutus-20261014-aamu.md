# Julkaisijan luovutus 14.10.2026 klo 08.3x (NOLLAUS, PT:n käsky 08.31, konteksti 63 %)

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -150; kellonajat `date`-komennosta). Edellinen luovutus
`viesti-julkaisija-luovutus-20261013-tilinvaihto.md`; käytännöt ja sääntö 0 `viesti-julkaisija-luovutus-20261013-ilta.md` (voimassa).
PT = "PÄÄTOIMITTAJA (Opus, max)" (session local_593b89a1…). Roolit tavoittavat Julkaisijan samalla nimellä (ListAgents).

## 0. SÄÄNTÖ: julkaisu vain PT:n välittämästä "OMISTAJA PYYSI JULKAISUA"

Juna 189 julkaistaan (TF iOS + Mac + web-merget) VAIN kun PT välittää sanatarkasti "OMISTAJA PYYSI JULKAISUA". Ei ennen.

## 1. Juna 188 – VALMIS

- Omistaja 23.0x "julkaise heti ilman nappeja" (PT välitti). Web-merget: #4569 588fe1bd2, #4570 muutosloki b61fe6a44 (napit-rivi pois, 261 merkkiä).
- BUILD 188 = d42257f65 (NS). **TF 188 VALMIS 5/5**: iOS 38461704720 ✓ 23.24 → sisäinen ✓ 23.38 → vienti 38460578518 ✓ 00.12 →
  ulkoinen + beta-arvio HYVÄKSYTTY 00.33 → vanhennus ✓ 00.34 (187 iOS + Mac pois). Mac 1.1 (188) 38461711914 ✓ 23.26 (NS).
- Raamattu-PR #4574 (linssit eivät kuulu Eurooppa-rajaukseen) MERGETTY d6a4e8209.

## 2. Juna 189 (kertyy) – valmistelu

- **NS-runko d1c8befc9** (PT 08.31). Web-merget junalle: **#4573** (pääkaupungit e04–e14, 93 kaupunkia), **#4572** (saapumisintro 19 kuvaa),
  **#4571** (tyylikirja napin optinen keskitys), **#4576** (kohdekarttojen reunavara – mergeä #4573:n JÄLKEEN), **#4578** (tyylikirja GALLERIA leveä).
  Tila 08.3x: #4576 ja #4578 MERGEABLE, #4573/#4572/#4571 mergeable UNKNOWN (tarkista juuri ennen). Squash + `--match-head-commit`.
- **Muutosloki 189**: ei vielä tehty. Valmistele PT:n kuittaamana kuten 188 (tools/vienti/muutosloki-natiivi.mjs, raja 3 lausetta / 280 merkkiä;
  rivinvaihtolista käy, laske merkit). Uusi worktree `tools/uusi-worktree.sh julkaisija muutosloki-189`, poisto `--poista julkaisija-muutosloki-189`.
- **muistiajo-189.txt** = `OK 307bc356 1.29` (NS 05.45: raketti 189 huippu 3831 Mt / min vapaa 1288 Mt; museo 37591c5c min 2,36 Gt). Päivitä jos
  runkoon tulee muistia lisääviä eriä.
- **TF-käynnistys:** `julkaisija-tyokalut/tf-kaynnista.sh 189 <BUILD 189 täysi SHA NS:ltä> <muutosloki-merge täysi SHA mainissa>` → ketju tf189.sh
  irrotettuna (TF → sisäinen → vienti ⊇ muutosloki → ulkoinen + beta-arvio → vanhennus 188). Mac: anna NS:lle "TF NYT" (L2).
- **Asemataulu** (tämän tilin): https://claude.ai/artifact/EekZDPMuAcsjT3awvn4jPb, ArtifactData talo/eteneminen (get → update if_version).
  PT 14.10.: kun SISÄINEN TF ladattu → heti edistys 5/5, tila "TestFlightissa" (ulkoinen/beta-arvio ei näy keskeneräisenä).
- Juna 189 -sisältöä yöltä (tiedoksi): PK:n maapallobugin korjaus (674cdbf2f, origon siirto ei päivittänyt maan keskipistettä), LS2:n raketti-paketti
  (ed26d18b1 runkoon, f3b8c7160 ilmakehäkorjaus erikseen), NUI keskitys valmis (ei vikoja), museon kertoja manifest-189 + manifest-189b, Rodin vaaka.
  NUI: museon "napautus pyyhkäisyn jälkeen" -vika on jo TF 188:ssa (PT:lle kerrottu), korjaus kesken.

## 3. Ämpärivienit yöllä (kaikki vie-paketti.sh, 0 virhettä, CDN 200 + SHA)

vesi-v19 21.56, Ranskan teokset astc-v1 8443/8443 22.50 (4 osaa), vesi-v20 22.44, vesi-v21 23.26, andoya-alusta-v4 00.44,
taidemuseo-kertoja-v2 manifest-189.json 05.56, manifest-189b.json 07.23, korkeus-lontoo-ea-v2 08.28, korkeus-praha-cuzk-v2 08.31.
Hylkäyssyyt yöllä: .DS_Store SHA-riveillä, LAHTEET puuttui / ei lisenssisanaa, kansion nimi ei *-vienti-*, ylimääräiset tiedostot,
**immutable-tiedoston päivitys** (manifest.json oli jo ämpärissä → uusi nimi + koodi). Pyydä tekijää korjaamaan, älä muokkaa itse.
LS1 kirjoitti vahingossa Äänittäjän `_valmiit/taidemuseo-kertoja-v2-ranska-vienti-20261014` LAHTEET/SHA:n päälle (tiedostot jo ämpärissä; LS1 ilmoitti Äänittäjälle).

## 4. Linjat, simut, luvat

- Linjat: L1 ja L2 (molemmat projektikopiot nyt T7:llä symlinkin takana; NS huolsi L1 00.03–00.06, Mac-kopio 05.37–05.39).
  Lukkovahti: `zsh julkaisija-tyokalut/lukkovahti.zsh` Monitorina 30 min, uusi aina.
- Simuraja 2. Vapautus VAIN tekijän SIMU VAPAA -viestistä (laskenta `ps … launchd_sim` näytti välillä väärin, kun ketju vaihtoi laitetta → 3 simua 00.49).
- Yön pysyvät luvat (päättyneet nollauksiin: PK, LS2): NUI asettelutestit L1/L2 kun vapaa + saman apin lyhyet simu-uusinnat ilmoittaen;
  LS1 saman apin simu-uusinnat ilmoittaen (simuja < 2). Uudet sessiot pyytävät uudelleen.
- launchd-palvelu fi.matkakirja.juna-vahti kääntää jokaisen uuden juna/b<N>:n Laitetestaajan simuihin (~4 min, oma lukko L1) – normaali.
- Levy: 42 Gt vapaana 07.33 (käännösraja 25 Gt; 05.2x oli 29 Gt). wt/ ~41 Gt, proto-3d/lokit ~45 Gt (28 .app). Omat worktreet poistettu.
  Muiden tiedostoja ei poisteta (vain `tools/uusi-worktree.sh --poista`); PT:lle ilmoitettu.

## 5. Avoimet

- Ei käynnissä olevia TF-ketjuja eikä omia vientejä. Ei avoimia omia PR:iä. LS2 teosvalo3 simu ajossa 08.3x (odota SIMU VAPAA).
- Muiden docs-PR:t (#4569 mergetty; vanhat #4556, #4555, #4554, #4553, #4504, #4503, #4488, #4326, #4256, #4251, #4006) ei pyydetty Julkaisijalta.
