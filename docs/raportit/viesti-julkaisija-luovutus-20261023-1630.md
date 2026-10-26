# Julkaisijan luovutus 23.10.2026 klo 16.30 (kova raja 35 %, Postivahti)

Vain voimassa oleva tila (Raamattu 7.22). Historia: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -80).
Osoitekirja /Users/Shared/Claude/osoitekirja.md; viestit `mcp__ccd_session_mgmt__send_message` session-id:llä.

## 0. TILA NYT
- **Juna 210 auki, TF 210 EI ennen PT:n lupaa** (omistaja tarkistaa grafiikan kuvat ensin). TF 209 ulkona.
- **Linjat:** L1 ja L2 vapaat 16.29; simut vapaat (VS-vahdille annettu simu.nyt 16.30 grafiikka-210-k8b-juna 18b47ba05).
- **Vahdit:** Valosepän vahti käynnissä (pid 84060; taukolippu poistettu 23.10.). Lukkovahti Monitorina:
  `zsh julkaisija-tyokalut/lukkovahti.zsh` (30 min, viritä uudelleen).
- **Avoimet PR:t:** ei omia. Jätetty: #5147 (luonnos, omistaja), #5121 (CLAUDE.md, vain omistaja), #5123/#5104/#5059 (pohjat odottavat), vanhat #4006–#5020.
- **Ämpäriin tänään junaan 210** (NS:llä polut): juoksupeli/maailma-v4/ paperilohikaarme-v3, kielletty-tausta-v18 ja -v19,
  avoimet-v15 ja -v16, osamallit791-v6, kielletty-rakennukset-v13; juoksupeli/otsikko-890-20261023/ (logo),
  juoksupeli/latauskuva-807-paamaski-20261023/; linssikatalogi/ (NUI:n 4 symbolia).

## 1. TÄNÄÄN SOVITUT KÄYTÄNNÖT
- **B tekotavat/julkaisu.md** mainissa (#5182 + NS:n luku 3 #5183); karttarivi PT:llä (#5187).
- **odota-ja-mergea.zsh** korjattu: koodi-PR (muu kuin docs/md/muutosloki) odottaa testit-tarkistuksen (#5185 mergeytyi ennen CI:tä).
- **VS:n grafiikka-210:** pysyvä L2-lupa samalla kaavalla (`vs-grafiikka-210-jono.zsh`-mallin kopio, SHA jonolokiin);
  haara suljettu vahdista (`!linssiseppa2/grafiikka-210` valoseppa-haarat.txt), koska vahti tuplasi käsikäännökset.
- **VS:n rakettivideo Mac:** `zsh julkaisija-tyokalut/vs-rakettivideo-mac-kaanna-sha.zsh <sha> > vs-rakettivideo-mac-<sha>.log`
  (odottaa L1+L2 vapaiksi; vain uusin .app `_tyo/julkaisija/rakettivideo-mac-app`; viimeisin 962139005). Varjostinmuutos →
  tarkista `Matkakirja-proto-mac/tulokset/mac.log` "Shader error in".
- **Simuraja 2:** NUI käyttää 123B4B25 (iPhone16) + F7513985 (iPad11), PK 39644E75 (iPad13), VS-vahti A26BC7D0.
  Kevyen koneen kuviin: taukolippu `/tmp/matkakirja-valovahti-tauko` ajon ajaksi, poista heti perään.
- **NS:n laitekäännökset L1:llä** ilman pyyntöä ovat sallittuja (2–3 min).
