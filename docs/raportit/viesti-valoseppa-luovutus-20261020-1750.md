# Valoseppä – luovutus 20.10.2026 klo 17.50 (Suomen aika), TILINVAIHTO (omistaja 17.49 PT:n kautta)

Valoseppä (Opus, session local_e675f86d) → seuraava Valoseppä. Edellinen: viesti-valoseppa-luovutus-20261020-1655.md (historia).
Id:t /Users/Shared/Claude/osoitekirja.md: PT local_8d8ebf72 (≤ 3 riviä), NS local_fcc10552, PK local_11aca9cd, LT local_36a45147,
JU local_24e63224 (vain simukäännökset; iPad-laitekäännökset NS:ltä), Postivahti local_0a4f4c68.
D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2 (päiväkirja $D/JONO.md – lue loppu ensin). Proto-wt /Users/Shared/Claude/wt/proto-linssiseppa2-jalki
(haarat paikallisia, yhteinen .git). VIESTIRAJA: SendMessage täynnä → mcp__ccd_session_mgmt__send_message session-id:llä.

## 1. Lue ensin
1. CLAUDE.md (repo + ~/.claude/CLAUDE.md: KK:n "OMISTAJAN PÄÄTÖS klo …" = omistajan päätös).
2. Raamattu: Ydinajatus kohta 2 TYÖTAPA JA SESSIOT; 9.11 OMISTAJA EI OLE ENSIMMÄINEN TARKISTAJA (iso iPad vapaasti, omistaja 17.17).
3. Tämä raportti ja $D/JONO.md loppu; docs/vastuukartta.md (oma alue: valo, varjot, jälkikäsittely, museo).

## 2. Tila
- Web main = origin/main 2ff154ba1 (#5047). Proton runko (NS) e3cff21f6 ⊃ hehku + avauskytkentä 404a63482 (PT:n OK).
- NS kokoaa omistajan iPhone-pakettia (KK 17.42); siihen otettu cc9564c36 (⊃ c5f9217ac). Omistaja 17.42: iPad-jumituksen mittaukset
  tauolla paketin ajan. PT 17.49: tilinvaihto paketin jälkeen – 0,8/MSAA2-erää EI aloitettu tällä tilillä (koodi valmis, ks. 3.1).

## 3. Haarat (proto, paikalliset; kaikki tarkista.sh vihreä: unity 0, vahdit ok)
| haara | kärki | sisältö | tila |
|---|---|---|---|
| linssiseppa2/jalki-gpu-208 | a53817ef2 | QA valo liike/mv/msaa/skaala | rungossa (PK:n 10e6a5a68 kautta) |
| linssiseppa2/hehku-208 | e35e43ee0 | kerättävien hehku (JuoksuHehku.shader, Hehku.cs) | rungossa (404a63482:n kautta) |
| linssiseppa2/hehku-avaus-208 | cc9564c36 | + avaus 1f1a75eec, hehku avauksen tahtiin (404a63482), OLETUS mv seinät 0 (c5f9217ac), hehku 0,5 + h² | iPhone-paketissa (NS), runkoon paketin mukana |
| linssiseppa2/iso-ipad-208 | 8d53e567e | cc9564c36 + isolla iPadilla juoksussa skaala 0,8 + MSAA 2 | EI runkoon ennen kuvaparia + PT:n OK:ta |

## 3.1 Kesken – tee nämä ensin
1. **ISO iPad 0,8 + MSAA 2 (PT 17.5x OK, juna 208)** – 8d53e567e: `IsoNaytto` = iOS ja ruudussa ≥ 5 M px (13" iPad; iPhonet ja 11" alle),
   juoksun ajaksi renderScale 0,8 (Valopohja.Piirtoskaala) + MSAA 2 (Ruudunpaivitys.MsaaKatto), liike-epäterävyys (kameraan rajattu) pysyy.
   QA `ui juoksupeli valo skaala S|auto`, `valo msaa 2|4|auto`. NS on kirjannut käännöksen paketin JÄLKEEN → polku LT:lle ja VS:lle.
   LT ajaa $D/varjot-koko/lt-gpu-komennot-6.txt (GPU A/T/A2/J; KUVAPARI Puyi + katot K-taysi.png 1,0/MSAA4 vs K-08.png auto; hehku 0,5
   lähikuvat H1/H0; avaus AV1–3 LentoAlkaa-lokirivistä, ei kosketusta) → tulokset $D/varjot-koko/kierros6/ + lt-gpu-tulos-6.txt.
   SINÄ: katso kuvapari itse (rajaukset venv-rembg-pythonilla -I, esim. scratchpadiin) → PT:lle 3 riviä: GPU-luku + kuvaparin polku +
   näkyykö ero. PT: ero näkyy → omistajalle valittavaksi; ei → NS runkoon juna 208.
2. **Hehku avauksessa** – tarkista LT:n kierros 6 AV1–3: lennossa ei hehkua, ~6 s nousee, ~9 s täysi. Lähikuvissa (5–10 m) hehku 0,5
   näkyy kehänä mutta hillittynä. Jos liian vahva/heikko: `valo hehkuvoima V` → uusi oletus Hehku.cs HehkuVoima.

## 4. Odottaa omistajan päätöstä
- Ei suoraan. 0,8/MSAA2-kuvaparin ero → PT vie omistajalle tarvittaessa (suositus: 0,8 + MSAA 2, liike-epäterävyys peittää eron juoksussa).

## 5. Mittaukset (LT, iPad Pro 13, siemen 777 raskas kohta ~14 s, jäädytys) – $D/varjot-koko/
- Kierros 1 (lt-gpu-tulos.txt): varjot EIVÄT ole syy (varjot pois −0,3 ms). farClip 400 ja jälkikäsittely pois yhdessä 34,5 → 10,3.
- Korjattu (LT/PT 17.3x): pääsyy liike-epäterävyys; 0,8 + MSAA 2 25,3 → + kamera-MV 11,7 → + sumea 0 10,5 ms.
- Kierros 5 (lt-gpu-tulos-5.txt, täysi res + MSAA 4): mv 1 33,6 | mv 0 26,3 | liike kamera 30,7 | sumea 0 29,4 (vaihtelu ±4) →
  täydellä resoluutiolla loppu on pikselityötä (MSAA 4 + HDR 2732×2048), ei enää liike-epäterävyyttä.
- Hehku (hehku-208/tulos.txt): päällä 37,93 / pois 37,92 ms → hinta ≈ 0; 0,35 katosi ~20 m:stä → 0,5 + h².
- Suositus ja perustelut: $D/varjot-koko/VS-suositus-208-gpu.md.

## 6. Työtavat (muuttunut tässä vuorossa)
- iPad-laitekäännökset pyydetään NS:ltä (JU vain simukäännökset). Ei simua (omistaja 11.45); iso iPad vapaasti (Raamattu 9.11).
- PK:n juoksun GPU-veto palasi VS:lle jälkikäsittelyn osalta (PT 17.3x); PK hoitaa geometrian (kokoluokat) ja avauksen.

## 7. Julkaisukaava (proto)
Haara proto-wt:ssä → `zsh tyokalut/tarkista.sh` (unity 0, vahdit) → commit → NS laitekäännös → LT mittaus/kuvat → katso itse →
PT:lle 3 riviä → PT OK → NS yhdistää runkoon. Web-repo (tämä checkout): vain luovutukset, push omalle haaralle linssiseppa2-tyo-20260928.

## 8. Ympäristö
- Mac Studio; proto /Users/Shared/Claude/proto-3d/Matkakirja-proto (URP-paketin lähde Library/PackageCache). Kuvaskriptit:
  /Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I (Homebrew-pythonissa ei numpya). Ei irrotettuja ajoja käynnissä, ei agentteja.

## 9. Opit
- Laitteen GPU-mittauksissa kulut eivät summaudu (Apple TBDR): geometria ja pikselityö ovat rinnakkaisia pullonkauloja; yhden
  keventäminen näkyy vasta, kun toinenkin kevenee. Mittaa osat toisen ollessa kevennettynä (esim. farClip 400).
- URP: MotionBlur CameraAndObjects pakottaa liikevektoripassin + syvyyskuvan; staattiset piirtäjät MotionVectorGenerationMode.Camera
  pois passista (Puyi pysyy terävänä hahmojen omilla liikevektoreilla).
- Valovahti hylkää renderScale-/MSAA-kirjoitukset muualla kuin Valopohjassa → Valopohja.Piirtoskaala.
- Avauksen kuvat ajoitetaan LentoAlkaa-lokirivistä (avauskello alkaa vasta maailman valmistuttua; kosketus ohittaa lennon).

## 10. Aloitusviesti uudelle sessiolle
```
Olet VALOSEPPÄ (Opus, high), Matkakirjan roolisessio (valo, varjot, jälkikäsittely, museo); checkout /Users/Shared/Claude/Matkakirja-linssiseppa-2,
proto-worktree /Users/Shared/Claude/wt/proto-linssiseppa2-jalki. Lue CLAUDE.md ja luovutus KOKONAAN: git fetch origin;
git show origin/linssiseppa2-tyo-20260928:docs/raportit/viesti-valoseppa-luovutus-20261020-1750.md, sitten /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md loppu.
ENSIN: iso iPad 0,8 + MSAA 2 (8d53e567e, PT OK) – odota NS:n laitekäännöstä iPhone-paketin jälkeen → LT kierros 6 → katso kuvapari itse → PT:lle 3 riviä.
Viestit send_messagella session id:llä (osoitekirja.md), PT:lle ≤ 3 riviä. Ei simua. Jos jono tyhjä: PT:lle "JONO TYHJÄ: Valoseppä".
```
