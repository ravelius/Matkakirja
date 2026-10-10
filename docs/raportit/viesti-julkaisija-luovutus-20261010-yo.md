# Julkaisijan luovutus 10.10.2026 yö (~23.55, PT:n nollauskäsky, konteksti 50 %)

Juokseva loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -80). Pitolista: `julkaisija-tyokalut/pidossa.txt`.
Päätoimittaja = "PÄÄTOIMITTAJA (Opus, max)". Viestit hänelle vain valmis erä, jumi tai kysymys (≤ 8 riviä). Ei kortteja.

## 0. Tila 23.55

- **JUNA 180 VALMIS (sisäinen):** BUILD 180 = 04c2af3649b06fca077cd659db6e4c107c6c70d4 (juna/b13 9caa3d49b),
  iOS VALID 3886f332 (TF 38082932130, sisäinen 38083414547), Mac VALID c8e8fccb (38083503406). Muutosloki #4376
  71843638621 (muutosloki-180-proosa.txt, 274 mrk). muistiajo-180.txt = OK 8f8a93acb 0.63. Ulkoinen ohitettu (tf180-ei-ulkoista).
- **Juna 181 kertyy.** TF 181 vasta PT:n luvalla; resepti kuten 180 (luovutus 20261010-ilta kohta 0): muistiajo-181.txt,
  tf181-ei-ulkoista, muutosloki-api.sh 181 "<≤3 lausetta, ≤280 mrk>" → tf-kaynnista.sh 181 <BUILD> <ml-merge> → Mac:
  Natiivisepän mac-kaanna.sh → `gh workflow run proto3d-mac-testflight.yml --ref main -f build=181 -f lataa=true -f sisainen_ryhma=true`.
  VALID-id:t: `gh run view <sisäinen/mac-ajo> --log | grep "käsitelty (id"`.
- **Sisältö: osoittimessa v660** (skeema 1.61). Tänään mergetty: #4364, #4365 (Louvre + Pöllö-worker), #4366, #4367, #4368,
  #4369, #4370, #4371, #4372, #4373, #4375, #4376, #4377.

## 1. Avoimet vuorot 23.55

- **Lukossa:** LS1 linssiseppa/testi-181-kompassi-puut 15973d4fa (23.50; vain kuvat, ei junaan) → simut iPhone D0D2CD1E →
  iPad 00CF62C2 peräkkäin ~45 min (ketju odottaa itse booted ≤ 1).
- **iPad Pro 13 (00008103):** Natiivisepän akku-/lämpömittaus (PT 21.0x/23.3x) käynnissä ~23.55 asti → hän ilmoittaa vapaaksi.
- **LS2 museo-180** käännetty a156d6a26 (69f77386e) → SIMU (~20 min, iPad-simu) VASTA kun museon vienti valmis (alla).
- **Museon vienti käynnissä irrotettuna** (setsid): vie-paketti.sh _valmiit/taidemuseo-alankomaat-v2g-vienti-20261010
  (11 111 tiedostoa; LS2 vei 9095 suoraan aws:llä, ETag-vertailu 0 eri; puuttuu 8 teosta = 2016 tiedostoa, viety ~540 ennen
  uudelleenkäynnistystä). Loki julkaisija-tyokalut/vienti-museo-v2g.log. Valmis → rivi LS2 "SIMULAATTORI NYT" + tarkista
  pistokoe 200 (esim. taidemuseo/alankomaat/astc-v1/mauritshuis-146/teos.json).
- Jonossa myöhemmin: LS2 ND v5f A26BC7D0 ~15 min (ei käännöstä, "muut"); Siirtosepän koko pelin läpiajo (Olavinlinna, etusija).

## 2. Omistajan linjaukset tänään (sitovat)

- **Vuorojärjestys (PT 20.5x):** 1) Olavinlinna 2) kippi 3) taidemuseo 4) kartta (Laitetestaajan karttakierros junan 180
  käännöksellä: SIMU NYT -viestiin junan 180 .app-polku + kaannos.txt-SHA, kopioi-juna-app.sh 1.1.180) 5) muut.
- **PEKING + PYÖRIMISLINSSI TAUOLLA** (pidossa.txt): ei LS2:n maa-ei-pyori-käännöksiä, ei Peking-simuja/-vientejä.
  omat-mallit v6k15 (Peking v4) on viety, mutta osoitin uusin-4 EI vaihdu.
- Bugikorjaukset ennen muuta kunnes juna lukitaan; ei-korjaukset odottavat.

## 3. Kesken / seuraavaksi

- **PEILI-404 (C1/C5):** syy selvitetty → julkaisija-tyokalut/peili-404-selvitys-20261010.md. Pelikoodari tekee 3 korjausta
  (media.mjs AMPARIN_KANSIOT + 'paakaupungit'; peilaa-media.mjs poimi() \s* + lainausmerkkiavain + fokusnosto.js; Nouméa ×2 ja
  heittomerkki paketeissa). SINÄ: merge vihreänä → peilaa.yml käynnistyy itse (push-laukaisin) → seuraa ajo (~100 Commons-hakua)
  → tarkista että 35 kuvaa + 65 lippua 200 → rivi PT. Jos ajo ei käynnisty: `gh workflow run peilaa.yml -f lajit=kuvat` ja `-f lajit=liput`.
- **Samaan erään (pidossa.txt):** SK C4: 5 ihmekuvaa /Users/samireivinen/Documents/Codex/20260928/ihmeet-14maata/ →
  kohtaamiset/ihmeet/ihme-<nimi>-loistoaika.jpg (SHA toimitustaulukossa posti/codex-fablelle-ihmeet-14maata-toimitus-20260928.md);
  paketoi _valmiit/:iin ja vie-paketti.sh.
- **Pulu CYP** (pulu-cyp-pilvi, 455): vienti vasta SK:n pistokokeen jälkeen. maat.json-versio = paketin "luotu" UTC-minuutteina
  (EI vientiaika; natiivin testi HakemistoKaikkiMaat) — pulu-maat-yhdista.zsh MAA=YYYYMMDDHHMM.
- Pulussa 40 maata (TUR + BLR-korjaus 11cead147 korvasi vanhan, vanha BLR.json.ennen-20261010).

## 4. Opit tänään

- LS2 vei museon tiedostot suoraan aws s3 cp:llä ohi vie-paketti.sh:n → PT muistutti. Tarkistus: vertaa-etag-20261010.zsh
  <paketti> <etuliitteet> (ETag = MD5 yksiosaisille).
- Rooleja on otettu lukkoon ilman NYT-viestiä (Pelikoodari 21.13) ja simuja jäänyt päälle (3 booted) → tarkista booted aina
  `zsh /Users/Shared/Claude/proto-3d/tyokalut/simusarja.sh simctl list devices booted`.
- Pitkät ajot (vie-paketti isoille paketeille, merge-vihreana) aina perl setsid -irrotuksella; sessiosta käynnistetty tausta kuolee nollauksessa.
- uusi-worktree.sh: poisto on `--poista <nimi>` (lippu ENSIN; väärin päin luo uuden worktreen).
- Äänisivu: Taidemuseo-osio Tehosteet-välilehden ensimmäisenä (aanisivu-taidemuseo-20261010.py), Belgrad-sali Pelissä.
- SendMessage-nimi voi olla kahdella sessiolla (Pelikoodari) → käytä `mcp__ccd_session_mgmt__send_message` session-id:llä
  (Pelikoodari local_242febe9…, LS1 local_4b4b976c…).
