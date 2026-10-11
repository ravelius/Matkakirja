# Julkaisijan luovutus 11.10.2026 ilta (Claude-sovelluksen uudelleenkäynnistys junan 182 jälkeen)

Juokseva loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -80, kellonajat `date`-komennosta 13.56 alkaen).
Pitolista: `julkaisija-tyokalut/pidossa.txt` (tyhjä). Päätoimittaja: SendMessage `local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc`
(nimi PÄÄTOIMITTAJA on kahdesti listalla → käytä session id:tä). Viestit PT:lle vain valmis erä, jumi tai kysymys (≤ 8 riviä).

## 0. Juna 182

- **BUILD 182 = proto master 0ac269d2d682c8f492c19634b588b64055ff783e** (juna/b13 549bb6a89, NS). Muutosloki #4439 MERGED
  689ae366a (NS:n 12 riviä → 3 lausetta / 270 mrk, `julkaisija-tyokalut/muutosloki-182-proosa.txt`).
- **TF 182 iOS** ajo 38156401738, ketju `julkaisija-tyokalut/tf182.sh` (setsid, loki `tf182-ketju.log`). Ketjussa portti ennen
  sisäistä: `muistiajo-182.txt` = OK (NS 19.41: Pariisi A 0,89 / B 0,86 Gt, Olavinlinna OK, museo huippu 2454 Mt, ei jetsameja).
  Ketju: TF → sisäinen → vienti ⊇ muutosloki → ulkoinen (Arvioijat + Beta-testaajat + beta-arvio).
- **Testattavaa** = NS:n `proto-3d/tyokalut/natiiviseppa-skriptit/juna182/muutosloki-182.txt` rivit 2–13
  (`julkaisija-tyokalut/testattavaa-182.txt`): erillinen `testflight-sisainen.yml -f testattavaa=…` -ajo SISAINEN-rivin jälkeen.
  TEHTY: 38158939556 success 20.1x (1. yritys hylättiin: ☰ ei kelpaa whatsNew-tekstiin).
- **TF 182 iOS Applella 20.04** (38156401738), SISÄINEN 38158107226 success 20.08; Asemataulu talo/eteneminen = edistys 5 (v3).
  Ketju odottaa vientiä ⊇ 689ae366a → ULKOINEN (beta-arvio).
- **Mac 182**: 38156210986 SUCCESS 19.5x (lataa + sisäinen). Ei ulkoista Macille.
- Uudelleenkäynnistyksen jälkeen: tarkista `tail tf182-ketju.log`, `gh run view 38156401738`, beta-arvion tila
  (beta-arvio-181.sh-malli) → rivi PT:lle "lähetetty arvioon" ja "hyväksytty".

## 1. Olavinlinna (PT: linna etusijalla)

- Vahti: `julkaisija-tyokalut/olavinlinna-vahti.zsh` (setsid, pid `/tmp/matkakirja-linnavahti.pid`). Lista
  `olavinlinna-haarat.txt`: laituri-varoitus, **v47v** (39aba163b), aanet, olavinlinna-181, tyrma-tapahtumat, kadet-oikealle.
  Paketti vaihtuu Siirtosepän pyynnöstä (v47i → n → o → p → q → t → v tänään).
- Botti 17 osaa: paras 12/17 (auto-1515, -1625, -1728). NavMesh-seinäkokeet heikensivät (11/17). Siirtoseppä käynnistää
  BOTTI ×2:n nyt itse vahdin VALMIS-rivin jälkeen (A 8362879F, B DBA3A288 siirtoseppa-iPad13-2; EI A26BC7D0 = LS2:n iPad).
- **Laitetestaajan 8. kierros** (2 simua) vasta, kun botti 17/17 – ei vielä.

## 2. Käännöslinjat ja simut

- Linja 1 = linnavahti + juna; muut linjalle 2. Linja 1 annetaan muille vain, kun vahti on joutilas.
- Simuraja **4** ma 12.10. asti (omistaja 15.4x), 2 jos vapaa muisti < 20 Gt tai swap > 12 Gt. Tarkista ennen SIMU NYT:
  `sysctl -n vm.swapusage; vm_stat`. Kuorma nousi illalla 300–400:aan (454 iOS-prosessia) → varoita ajajaa.
- LS1:n portit: `proto-3d/tyokalut/linssiseppa-ajot/<nimi>.nyt` (touch; poista käytön jälkeen).
- Pelikoodari käyttää iPhone 18 Pro 0AC1815C (nimeämätön T7-laite).

## 3. Avoimet (uudelleenkäynnistyksen hetkellä)

- SK suoja-PR:t 2. erä #4432–#4437 MERGED (e169c4d0f) – tarkista vain peilaa + vie-sisalto e169c4d0f:lle.
- LS2: 429-vara a40e44542 kääntyi linjalla 2 → iPhone 8D1FD618 ~5 min Madrid, sitten raketti e560bbef7 ~10 min; keittiö
  d00bd6b37 iPadilla A26BC7D0 käynnissä 19.4x.
- Pelikoodari: aarrelaskuri-50-183 linjalla 2 (19.37) → simu kun pyytää.
- NUI: testi-olavisa-museokuva 53c57be7f PYSÄYTETTY uudelleenkäynnistyksen takia → KÄÄNNÖS NYT linja 2 + iPhone 96044270 ~6 min Jatkan jälkeen.

## 4. Tänään mergetty / viety (ilta)

Mergetty: #4398, #4400–#4439, mm. #4410 aarremerkinnät (v677), #4413/#4416/#4428 workerin polut
(pollo-julkaisu success), #4418 + suoja-PR:t (peilaa success, uusin.json v684 = 0641ad913), #4439 muutosloki 182.
Viety: aloitus-aarre, kukkaro, soutaja v1+v2, esittely-suoja, Stortorget, musa-lyria-183 (15), Pariisin aukiot, omat mallit
v6k18 + **v6k19** (osoitin uusin-4 → v6k19 19.4x, varmuuskopiot `osoitin-varmuus/`).

## 5. Uudelleenkäynnistyksen jälkeen (järjestys)

1. `pgrep -f olavinlinna-vahti.zsh` – jos poissa, käynnistä setsid-perlillä (komento edellisessä luovutuksessa
   `viesti-julkaisija-luovutus-20261011-iltapaiva.md` kohta 2; lisää `--ohita-nykyiset`).
2. `pgrep -f tf182.sh` + `tail tf182-ketju.log`; jos ketju kuoli, jatka käsin pohjan `tf-ketju-pohja.sh` vaiheista.
3. Beta-arvion seuranta (beta-arvio-181.sh-malli) → rivi PT "lähetetty arvioon" + "hyväksytty"; Asemataulu-vaihe päivitys.
3b. Siirtoseppä: kun BOTTI 147d72aef valmis → lista v47v → **v47y a1cd52906** (ei ennen).
4. Peilaa + vie-sisalto e169c4d0f (kohta 3).
5. Monitorit: vahti-loki + linjan 2 lukko + tf182-ketju.

## 6. Opit

- TestFlightin whatsNew hylkää merkin ☰ (409 INVALID_TEXT) → poista symbolit Testattavaa-tekstistä.
- Asemataulu (omistaja 19.5x): talo/eteneminen, Julkaisija kirjoittaa vaiheet 4 (TF-lataus) ja 5 (Applella/TF); get → update if_version.

- `merge-vihreana-sha.zsh` jää ikuisesti odottamaan docs-haaroja, joilla ei ole CI:tä → merge käsin (`gh pr merge --squash
  --match-head-commit`), kun PT on kuitannut.
- Käännöslukko ei ole FIFO: lukkoa odottavista se, joka ehtii ensin, saa sen. Kerro vuoro ja linja, älä lupaa järjestystä.
- vie-sisalto peruuntuu uudemman ajon tieltä (concurrency) → seuraa viimeisintä ajoa ja tarkista uusin.json:n commit.
- Kellonajat lokiin aina `date`-komennosta (aamupäivän arvioajat olivat 5–10 min edellä).
