# Julkaisijan luovutus 11.10.2026 iltapäivä (~12.45, konteksti ~51 %)

Juokseva loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -80). Pitolista: `julkaisija-tyokalut/pidossa.txt`.
Päätoimittaja = "PÄÄTOIMITTAJA (Opus, max)" (jos SendMessage-nimi on kahdesti, käytä varakanavaa
`mcp__ccd_session_mgmt__send_message` session_id `local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc`). Siirtoseppä tavoittaa
luotettavimmin varakanavalla `local_c264506b-dd61-4617-839f-23daf6d0bd5a`. Viestit PT:lle vain valmis erä, jumi tai kysymys (≤ 8 riviä).

## 0. Tila 12.45

- **Juna 181 VALMIS:** BUILD 181 = a93ce987f48bc35e4b2554990427573d51947d1c, muutosloki #4393 (0aa804428), TF 38121309251.
  iOS sisäinen OK 10.51, ULKOINEN Arvioijat + Beta-testaajat 11.02, **beta-arvio APPROVED 11.18**. Mac 181 sisäisellä (38122153499).
- **Juna 182 lähtee vasta omistajan sanasta** (PT 11.4x: beta-testaukset ensin). Natiivisepän runko ddadb8bae (+ LS2 museo-182
  7a6051553, lisää muistia → muistiajo ennen VIE:tä). Kun lähtee: muutosloki (≤ 3 lausetta / 280 mrk, muutosloki-api.sh)
  → `tf-kaynnista.sh 182 <BUILD täysi SHA> <muutosloki-merge-SHA>` (aja Matkakirja-julkaisija-kansiossa) → Mac (mac-kaanna.sh
  Natiiviseppä, sitten proto3d-mac-testflight.yml app_polku/versio 1.1/build/lataa=true).
- **Ulkoinen ryhmä junasta 181 alkaen** (omistajan kortti 09.5x): `ulkoinen-kielletty` poistettu (arkistoitu
  `.poistettu-20261011`). Jokainen PASS-build → sisäinen + Arvioijat (KxKekB4n) + **Beta-testaajat** (uusi, BBAT7tBm, raja 100) +
  yksi beta-arvio. testflight-ulkoinen.yml: tyhjä ryhmä = kaikki julkisen linkin ryhmät; `--alusta IOS` oletus (#4394,
  Mac-build samalla numerolla). Ilmoita PT:lle rivi: lähetetty arvioon + hyväksytty (seuranta: beta-arvio-181.sh-malli, 15 min).
- **Raadin seuranta:** asc-testaajat.yml 4×/pv (9.07/13.07/17.07/21.07) → `julkaisija-tyokalut/asc-testaajat.json`; Postivahti lukee.
- **Uusi ANTHROPIC_API_KEY** (omistaja 12.1x): pollo-julkaisu 38127630430 vei sen workeriin, live-Pulu vastaa (suora POST).
  savuke-pollo on punainen vanhentuneen testin takia (ei saa kysymystä syötettyä) → Pelikoodarille (PT:n päätös).
  ANTHROPIC_ADMIN_KEY näyttää yhä vanhan organisaation kulut.

## 1. Avoimet PR:t ja taustaketjut (tarkista heti)

| PR | tila | jatko |
|---|---|---|
| #4380 KS aloituskaupungit (Ateena, Pariisi, Tukholma; skeema 1.62) | MERGED f93110f34 | Taustaketju odottaa vie-sisalto-ajoa → sitten **SIMU NYT Laitetestaajalle KS:n kuva**: alkulennon lähtövalinta (odotus Lontoo + Ateena, Pariisi, Tukholma) TF 181 -appilla `proto-3d/lokit/juna-1.1.181-a93ce987/Matkakirja3D.app` → `_tyo/karttaseppa/aloituskaupungit-20261011/`. Tarkista `sisalto/1/uusin.json` commit = f93110f34 ennen kuvaa. |
| #4400 PT Raamattu + loki iltapäivä | merge-vihreana ajossa (merge-4400.log) | Raamattu 454/460,8 kt. |
| #4401 Pelikoodari kuratoitu Pulu (KIIRE) | merge-vihreana + pollo-julkaisu-odotus ajossa | Kun pollo-julkaisu valmis → rivi Pelikoodarille (hän ajaa curl-kokeen). |
| #4388 äänisivun valinnat.mjs | merge-vihreana ajossa | – |
| #4398 SK Olavinlinna faktat (docs) | merge-vihreana ajossa, MUTTA haaralla ei CI-tarkistuksia → skripti jää odottamaan; mergeä käsin (`gh pr merge 4398 --squash`), jos PT kuittaa. | – |

Mergetty tänään: #4387, #4389–#4397, #4399. Viety ämpäriin: Pulu opastus v1 + b, tietokerros-v2, musa Moskova/Ateena/Tukholma nopeat,
aloituskaupunki-äänet (7), ISS-radio (3). Kaikki 200.

## 2. Olavinlinna-vahti (uusi, PT 09.3x)

- `julkaisija-tyokalut/olavinlinna-vahti.zsh` (pid `/tmp/matkakirja-linnavahti.pid`, nyt 58074, setsid), lista
  `olavinlinna-haarat.txt` (nyt: laituri-varoitus, **v47i** bd7d74df6, aanet, olavinlinna-181, tyrma-tapahtumat, kadet-oikealle).
  Kärkimuutos → 120 s → merge-tree → käännös linjalla 1 vain kun lukko vapaa eikä `/tmp/matkakirja-linnavahti-tauko` ole →
  `proto-3d/lokit/olavinlinna-auto-<kkpp-hhmm>/` + linkki `lokit/olavinlinna-uusin`. Tila `lokit/olavinlinna-tila.txt`,
  loki `julkaisija-tyokalut/olavinlinna-vahti.log`, ristiriidat `lokit/olavinlinna-ristiriita.txt`.
- Uusin: **auto-1011-1228 7cef4f11a** (laituri 076e3b63f + v47i). Siirtoseppä: 17 osan botti 3/17 LÄPI, tarkistaa yksivärisyyskynnyksen,
  sitten pakettiajo v47i/v47k:lla. LR:n v47k tulossa → vaihda listaan, kun Siirtoseppä antaa SHA:n.
- Monitor: `tail -n 0 -F …/olavinlinna-vahti.log | grep --line-buffered -E "KÄÄNNÖS|VALMIS|VIKA|RISTIRIITA|puuttuu"`.
- **Claude-sovelluksen uudelleenkäynnistys junan jälkeen:** tarkista `pgrep -f olavinlinna-vahti.zsh`; jos poissa, käynnistä
  `perl -e 'use POSIX qw(setsid); if (fork()==0) {setsid(); open STDOUT,">>","…/olavinlinna-vahti.out"; open STDERR,">&STDOUT"; open STDIN,"<","/dev/null"; exec "/bin/zsh",$ARGV[0]}' /Users/Shared/Claude/julkaisija-tyokalut/olavinlinna-vahti.zsh`
  (lisää `--ohita-nykyiset`, jos nykyiset kärjet on jo käännetty).
- Taukolippu: juna/VIE/muistiajo/iPad-mittaus (Natiivisepän skriptit luovat itse; muille luo käsin ja poista lopuksi).

## 3. Käännöslinjat (PT 10.2x, Natiiviseppä toteutti)

- **Linja 1** `/tmp/matkakirja-kaannospalvelu.lukko`, Matkakirja-proto-kaannos: juna, TF, laite- ja Mac-käännökset, linnavahti.
  Roolien testikäännökset saa ohjata tänne, kun vahti on joutilas ja junaa ei ole.
- **Linja 2** `PROTO_LINJA=2` → `/tmp/matkakirja-kaannospalvelu-2.lukko`, kopio Matkakirja-proto-linja2 (T7): roolien testikäännökset.
  EINTR-kopiovika korjattu (uusinta kerran).
- Simuja enintään 2, toinen linnalle (päivä). Vapaiden laitteiden tarkistus: `source proto-3d/tyokalut/simusarja.sh; xcrun simctl list devices booted`.
  LS1:n ajot alkavat porttitiedostolla `proto-3d/tyokalut/linssiseppa-ajot/<nimi>.nyt` (touch).

## 4. Jono 12.45

- Linja 1: LS2 museo-zoom-182 bd00fb741 (KIIRE omistaja) → LS1 aloitusintro-182 (haaranimi, korjauscommit tulossa) →
  NUI pulu-opastus+linssiseppa/aloitusintro-182.
- Linja 2: NUI linna-kyltit bf81fe534 → NS pallohehku F0/F1.
- Simu: NUI kyltit (~12.56) + LS2 ennen-arkit (~12.52) → NS pallohehku F0/F1 ~15 min (PT: linna etusijalla) → LS2 museo-zoom jälkeen-arkit ~13 min →
  LS1 intro ~10 min (portti simu-aloitusintro182.nyt) → NUI yhdistelmä ~6 min → Laitetestaaja KS-kuva (#4380:n viennin jälkeen).
- Siirtoseppä pyytää linnapaikan pakettiajoon, kun v47k on vahdissa.

## 5. Opit

- Monitorin grep tarvitsee aina `--line-buffered` (myös `-v`): TF 181:n APPROVED-ilmoitus myöhästyi 15 min.
- Kun build-numero on sama iOS:llä ja Macilla, ASC-haku rajataan alustaan (`filter[preReleaseVersion.platform]`).
- Vahti kääntää myös proto masterin muutoksesta (esim. junan merge); ristiriita masterin kanssa → haaran omistaja yhdistää masterin.
- Pakettiin voi jäädä ylimääräisiä tiedostoja (.wrangler): vie-paketti hylkää → pyydä tekijää siivoamaan, älä poista itse.
