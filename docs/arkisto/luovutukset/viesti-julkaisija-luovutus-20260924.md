# Julkaisijan luovutus 24.9.2026

Julkaisija (Opus 5.5, Fablen päätöksellä kunnes yöajo on ajanut kerran itsestään).
Seuraava sessio: lue tämä, docs/raportit/natiivi-testflight-putki-20260924.md ja roolitus.md "Julkaisusäännöt".

## 1. TestFlight-putki (natiivi, proto3d-testflight.yml)

- **Build 4** 1.0.0 (202609232339), proto 7706efd, ladattu 24.9. 02.42, sisäinen ryhmä "Beta testaajat" (saa kaikki buildit automaattisesti; omistaja ryhmässä).
- **Build 5** 1.0.0 (202609240615), proto 7878cbc (sis. äänitehosteiden aanet-pcm-korjaus), ladattu 24.9. 09.23 ja saatavilla sisäisessä ryhmässä (run 35963215777). Ensimmäinen ajo kaatui lukittuun avainnippuun (korjattu #3037: unlock ennen set-keychain-settingsiä).
- **Seuraava**: Natiivisepän merge-erä c633408 (lehtiporras, pääaso, lehtiotsikko) odottaa Fablen päätöstä; kerro Natiivisepälle ennen Unity-vientiä.
- Käsiajo proton masterista: `gh workflow run proto3d-testflight.yml -f vie_unitysta=true` (Unity-vienti Build/yo, arkistointi, lataus, sisäinen ryhmä). Valmis vienti: `-f vienti_kansio=<kansio>`. Uusinta ryhmälle ilman latausta: `gh workflow run testflight-sisainen.yml -f build_numero=<n>`.
- Omistajan linjaus: TestFlight-build aina kun proton masteriin tulee merkittäviä muutoksia. Kaava: Natiiviseppä ilmoittaa SHA:n → Fable käskee → Julkaisija ajaa heti (yksi kerrallaan, ei polton aikana, paitsi Fablen erikseen käskemänä) → Fablelle rivi: build-numero, SHA, "käsitelty ja saatavilla" (testflight-sisainen-vaiheen loki). Natiivisepälle kuittaus "vienti valmis", jotta hän voi avata Unityn.
- **Yöajo** klo 04.00 Suomen aikaa (01.00 UTC), ensimmäinen 25.9. Ohitusehdot ja lokit: `/Users/Shared/Claude/proto-3d/lokit/yo-testflight.log`, viimeksi ladattu master `yo-testflight-viimeisin.txt`. Kun yöajo on ajanut kerran itsestään, ilmoita Fablelle (malli palaa Sonnetiin).
- Ennen ajoa: `df -g /System/Volumes/Data` ≥ 30 Gt (työnkulku ohittaa muuten), Unity kiinni, proto-työkopio puhdas master.
- Jokainen arkisto jättää ~4 Gt DerivedDataa projektipolkua kohden (`~/Library/Developer/Xcode/DerivedData/Unity-iPhone-*`); poistettujen Build-kansioiden välimuistit voi poistaa (info.plist WorkspacePath).

## 2. Varmenteet (ASC ja pysyvä avainnippu)

- Avainnippu `~/Library/Keychains/matkakirja-testflight.keychain-db` (koodaus), salasana secret PROTO3D_KEYCHAIN_PASSWORD. Ei oletusnippu; login palautettu 24.9.
- iOS Distribution: **PK8TVTL7Q8** käytössä (SHA-1 AE4FD1EA0BB82531103BA8504EBDB4DC1BBED775). **ACN2K38688** ylimääräinen (SHA-1 6448D38A…) — omistaja perii portaalissa (Fablelle ilmoitettu).
- DEVELOPMENT: 7T28T7UU6N (automaation, avain nipussa) + omistajan oma Apple Development (login-nippu).
- Työnkulku ei koskaan peru varmenteita. 409 → virhe näkyviin, omistaja päättää.

## 3. PR-jono

Mergetty tänään (versio): #2975 v2151, #2978 v2152, #2961 v2153, #2984 v2154, #3012 v2155, #2957 v2156, #3013 v2157; ilman versiota #2983 #2986 #2992 #2994 #2995 #2998 #3001 #3007 #3008 #3009 #3011 #3027 #3031 #3032 #3037.
Ämpäri: pyramidi-luettelo 23a vietiin #2957:n jälkeen (julisteet/pyramidi/pyramidi.json 2 412 792 t).

Jonossa Fablen järjestyksessä:
1. Sisältö N8–N16: #3015 #3016 #3017 #3018 #3020 #3021 #3022 #3025 #3026 (kukin versionosto).
2. #3023 (docs), #3014 (Pelikoodari: 8k-korjaus, poistaa 8k:n tunnetun punaisen), #3024 (vesistölinssi).
3. Siirtoseppä: #2918 #2932 #2948 #2993 (raportit docs) #3030 (1.27–1.30).
4. Vanhemmat: #2966 (haarassa vanha v2154-commit → versiotyökalu uudelleen), #2972 #2973 #2970 #2962 #2980 #2989 #2999; #2982 → #2990 (yöportti, aja natiivi-yoportti.yml kerran); #2985 (aja sahke-worker.yml käsin); #2997 ja #3003 (molemmat v2154 → työkalu uudelleen; #3003:n jälkeen ehdotukset-worker.yml käsin); #2942 → #2955; #2913 ristiriidassa (Siirtoseppä).

Työkalut `/Users/Shared/Claude/julkaisija-tyokalut/`: `valmistele.sh <PR> "<rivi>" [ei-versiota]` (worktree, main sisään, versio, testit, kaksoisavaimet, build, push), `mergaa.sh <PR> "<otsikko>"` (odottaa testit, squash), `jono.sh <PR> [<PR>:docs ...]` (ketjuttaa, pysähtyy virheeseen). Aja jono taustalla vain kun TestFlight-ajoa ei ole jonossa (samat Mac-ajurit).

## 4. Savukkeet

- savukkeet-mac oli punainen jokaisessa PR:ssä. Pysyvät syyt korjattu #3011:ssä: glnimiot-nostot/-nimet kaappasivat ennen lepopiirron sykettä (250 ms); lahizoom 390 8k tunnetuksi punaiseksi (korjaus #3014).
- Muut punaiset vaihtelevat ajosta toiseen (nostotasot, nimiot-sulavat, kaupunkipopup-1400, lahizoom-1400-liuska) = kuormaherkkiä. Merge-portti on Testit (roolitus.md sääntö 3).
- tools/savukkeet/savuke-etusivun-animaatio.mjs kaatuu myös mainissa (rakenne.sykkeita undefined) — vanhentunut savuke, ei jonossa.

## 5. Fable-haara

claude/bold-ride-vow4ki (Matkakirja-fable): 267 jäljessä ja 1488 edellä mainia; sisällöllinen ero 67 tiedostoa (+12 758 riviä), jotka eivät ole mainissa. Synkkauksesta ja PR:stä päättää Fable.

## 6. Avoimet

- Build 5:n muutosloki-natiivi-rivi kirjaamatta (1.0.0 (202609240615): äänitehosteiden korjaus, lukijaääni, linssit = web, maailman maasto). Yöajon ensimmäinen ajo 25.9.
- ACN2K38688:n peruminen (omistaja).
- Muutosloki-natiivi: build 2 ja 4 rivit tulivat #3012:n mukana; kirjaa jokaisesta uudesta buildista `node tools/vienti/muutosloki-natiivi.mjs --versio "1.0.0 (<n>)" --teksti "…"`.
- Julkinen TestFlight-ryhmä vasta omistajan kokeilun jälkeen (ei vielä).
