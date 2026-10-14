# Sisältökirjurin luovutus 14.10.2026 ilta (PT:n pyyntö, konteksti 74 %; täydentää ...-20261014-aamu.md)

Rooli: Sisältökirjuri (Sonnet 5.5, high), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri, haara sisalto-pelikatalogi-20260927 (älä `git pull --rebase origin main`; työt omissa main-pohjaisissa worktreissä `tools/uusi-worktree.sh sisaltokirjuri <aihe>`, poista mergen jälkeen `--poista`). Agentit vain Sonnet/Opus. Viestit AINA `send_message` session id:llä (osoitekirja /Users/Shared/Claude/osoitekirja.md): PT = local_74630a27-8c1b-4ac3-9143-538efab8cbcd (≤ 3 riviä, tulos ensin); PK local_97810d35-a79c-484b-8573-660a4c40eaa6, LS1 local_45a869de-4d6b-4ed6-a6c9-30fd8442587e, Valoseppä local_fc4fcc54-9fa1-4ba2-9de2-97a8ee884e10, KS local_37708e68-5a58-45ca-8dee-c13620993531, Äänittäjä local_846757a4-5dce-40d7-b43b-12bfa7008396, Julkaisija local_22b29f10-7af8-43fc-a974-1d666f716c97, NUI local_33ba1387-d688-4e44-8e05-10951e61efc0. Äänet: ei kaiuttimiin (hiljainen tunti/ääni mykistetty), kertoja William eleven_v4_turbo pysyvä lupa.
**Ajastus kuolee:** Codex-posti-cron `3,23,43 * * * *` (CronCreate; prompti: `git fetch origin claude/postilaatikko` worktreessä /Users/Shared/Claude/wt/sisaltokirjuri-posti-paakaupunkikorjaus + reset --hard; tarkista vain (a) kuvatoimitus-saapumisintro-*, (b) fable-codex-saapumisintro-uudet-6-8-loput-hyvaksynta-N-*, (c) Ranska; ilman uutta älä kirjoita). Tähän asti ei ole tullut mitään SK:lle (kaikki posti Peking/Petřín). Remote control: set_remote_control self true.

## Valmista tänään (14.10.)
- Kaupunkikarttojen pidennetyt esittelyt: #4580 mergattu; e04–e14 93 esittelyä korjattuna (22 kohteetonta ilman loppulausetta) → PK kytkee: proto-3d/_tyo/sisaltokirjuri/kaupunkikartat-esittelyt-20261014/kaikki-esittelyt-e04-e14.json. Funafutin piste korjattu lähteessä (-8,5211/179,1966), mainin laudan-rivit + oppaan lat/lon KS:n/PK:n työ.
- Pallokierros Praha + Ateena (#4586 mergattu): 8+8 historiaosiota, Ateenan 8 pysäkkiä, faktaliitteet, GRC-listaan `pallokierros:ateena`; käsikirjoitukset Äänittäjällä (proto-3d/_tyo/sisaltokirjuri/pallokierros-praha-ateena-20261014/); H_m-lista KS:lle/LS1:lle. Akropolis-museo pois natiivin piilotuslistalla (LS1).
- Saapumisintro 6/8: 40 Commons-kuvaa (#4588 mergattu, vienti Julkaisijalla junaan 190, vasta "OMISTAJA PYYSI JULKAISUA"); Luxemburgin 4 kuvaa korjattu Nikosiasta. Lisenssit: docs/kohtaukset/saapumisintro-commons-lahteet-20261014.md.
- ISS-loppu: 7 repliikkiä (paikka-b "Valitse valikosta...") Äänittäjällä, PK kytkee: proto-3d/_tyo/sisaltokirjuri/iss-loppu-20261014/iss-loppu.json.
- Museon zoomikohdat: LS1:lle 37 teosta (taidemuseo-kohdat-20261014/taidemuseo-kohdat-ls1.json + kaikki.json) ja Ranskan sali 51 kertomusta (ranska-kertomukset-kaikki.json, faktatarkistettu, 23 198 mrk) → Äänittäjälle ranska-kasikirjoitus-aanittajalle.json, LS1:lle ranska-kohdat-ls1.json (69 kohtaa; 7 teosta ilman). LS1 ajoittaa kun Äänittäjän ajat/ranska/<id>.json valmiit.
- Petřín: PERUTTU (Valoseppä koonnut); korkeusratkaisu (runko 58,7 m, mastoineen ~71–72 m) mitat.md:ssä, lähetetty Valosepälle.

## Keskeneräistä / seuraavalle
1. Odota Äänittäjän kuittaus (Ranska 51, ISS-loppu, pallokierrokset) → PT:lle rivi; sana-ajat LS1:lle.
2. Julkaisija mergeää/vie #4588:n sisällön vasta julkaisupyynnöstä; ei omaa mergeä.
3. Ranskan salin seuraava: ei omia tehtäviä jonossa; PT antaa erät. Ei uutta erää ilman PT:n pyyntöä.
4. Heikot: Lappi 8 (Sampo ei liikkeessä), Barcelona 8, Praha 8 (1620 px; ≥2400 px samasta aiheesta ei löytynyt).

## Tekniikka ja työtilat
- Kopiot ja välitulokset: proto-3d/_tyo/sisaltokirjuri/ (13 vanhaa kansiota siirretty T7:lle /Volumes/T7 4TB/koodaus/proto-3d-sisaltokirjuri-20261014/, symlinkit tilalla). Scratchpad-skriptit: suodata.py (LS1-suodatus: bbox pidempi sivu ≥ 1/3), rakenna*.py, kytke_commons.py (kulttuuri-kategoriat.js avauskuvat, `tiedosto`-kenttä).
- Worktreet: vain wt/sisaltokirjuri-posti-paakaupunkikorjaus (cron). Muut poistettu.
- Verkko: Commons API User-Agent `MatkakirjaSisaltokirjuri/1.0 (sami@valokuvaamoklik.fi)`; Orsay/Britannica/UNESCO antavat 403 (ei kierretä); toinen lähde usein Wikipedia-perhe → mainitse.
- Tarkistus: `node --test tests/dokumentit.test.mjs` + kohdistetut testit (kuvatekstit, lehdet, avauskortti, vienti ym. 183/183 viimeksi). Muistitiedosto: /Users/koodaus/.claude/projects/-Users-Shared-Claude-Matkakirja-fable/memory/sisaltokirjuri-tila-20261014-aamu.md (päivitä).
