# Päätoimittajan luovutus 14.10.2026 klo 13.5x (oma nollaus 69 %)

Rakenne ennallaan: PÄÄTOIMITTAJA (Opus, medium) local_74630a27-8c1b-4ac3-9143-538efab8cbcd orkestroi; KESKUSTELUKANAVA (Opus, max) local_593b89a1-2514-4d74-b956-2a73db862382 on omistajan kanava (kysymykset KYSYMYS <tunnus> sinne, omistajalle vain sinne yhdellä rivillä). Osoitteet: /Users/Shared/Claude/osoitekirja.md. Vastuut: docs/vastuukartta.md.

## 0. Heti aluksi
1. `set_remote_control self true`.
2. CronCreate `7,27,47 * * * *`: "JONOKIERROS (Päätoimittaja): lue ja toteuta tiedoston /Users/Shared/Claude/Matkakirja-fable/scratchpad/jonokierros-teksti.md kohdat 0–10 sellaisenaan".
3. Monitor "python3 -u /Users/Shared/Claude/hooks/odottajat-vahti.py", timeout_ms 1800000, kuvaus "roolit odottavat omistajaa (lupakysely tai kysymys)"; uudelleen joka vanhenemisella. ODOTTAA → ArtifactData set talo/<doc_id> + PushNotification; JATKUU → delete.
4. Asemataulu https://claude.ai/artifact/EekZDPMuAcsjT3awvn4jPb; omat dokumentit scratchpad/asemataulu/data/talo/{junat,tyolista}.json (Asemataulu-sessio vie).
5. Muisti: julkaisu-vasta-omistajan-pyynnosta (AVOIN JUNA 190), osoitekirja-ja-nollaukset-postivahdille, keskustelukanava-ja-paatoimittaja.

## 1. JUNA 190 – OMISTAJA PYYSI JULKAISUA EHDOLLA (13.41)
Sanatarkasti: "Junan voi julkaista, kun kaikki pyytämäni muutokset ovat valmiina. Ei tarvitse ajaa testejä." + kortti "Kaikki samaan junaan". Tarkistuslista Asemataulun junan 190 rivillä (✓ = kuitattu). Kun kaikki ✓ → NS:lle "LUKITSE 190" (muistiajo iPad Pro 13 Pariisi lukituksessa, Raamattu MUISTIAJO ENNEN TESTFLIGHTIÄ; ei laitetestejä) → TF → rivi Keskustelukanavalle.

Kuitattu ja NS:n rungossa (uusin runko NS:ltä): suikale- ja Cupola-pinta, telakointi + kevyt pallo, ISS AUTO, ISS-kohdevalikko + Pulun kysymykset + yökohinakorjaus, alkulento ilman huntua, metrokartta, karttamerkit, isoisän/Pulun isommat kuvat, kaupunki-intro, Cupolan latausruutu, Ateenan pallokierros v2, uusi peli -nollaus (800bb45c4; NS varmistaa rungossa yhden ruudun ilman huntua), telakoinnin todistus (LT 68771666d).

AVOIMET ennen lukitusta:
- Isoisän Kolme veljestä eleven_v3:lla (Äänittäjä) + kytkentä.
- ISS-palaute 12.25 (docs/raportit/kaappaukset/omistaja-20261014/iss-palaute-1225.md):
  - NUI iss-palaute-190 (2f9b1297d / 0390f5786): odottaa simutodistetta faktalaatikon läpinäkyvyydestä + iPad vaaka -lukemat 2×2; NUI iss-loppu-190 63e362fc3: napit keskelle isoina + video koko kulusta yhdessä PK:n 8ffdd3bdf:n kanssa.
  - PK (nollattu, luovutus 0badd6260): ISS 7 (kertoja loppuun + jatkokysymys, SK:n iss-loppu.json hyväksytty, korjaus "Valitse valikosta…"), 8 (äänitasot Äänittäjän kanssa), 9 (Max Q -tärinä).
  - Valoseppä: 1+3 maasto+horisontti andoya-kauko-190 89a4801cc (arkki ~14.20), katuvalot v2 kupoli-yovalot-juna190 44a598b42 (arkki ~14.35 + muistiajo), nimet kupoli-nimet-190 d5b07b2ed (~14.55), Kuu (~15.15), korostusläikkä b7afe279b, Buckingham-portti 5d6745971, valaan kytkentä.
  - Valas: LR v2 ~14.30 (korjauslista: rintaevät, pää, ruumis, pyrstö) → Valoseppä kytkee.
- Kaikki tekstilaatikot läpinäkyviksi kaikkiin pohjiin (omistajan tyylipäätös 12.25, Raamattu UI-POHJAT).
- Ateena v3 (LS1, kamerat lounaasta) – ei pelaajille, ei lukituksen ehto.

## 2. Muut avoimet
- Petřín tavoiteluuppi: Codex-tilaus d3ecc0bbf + korjaus bf2e58a79 + maskit 70328561b; havainnekuvat PT hyväksyy ennen Blender-kierroksia; vertailutyökalu proto-3d/tyokalut/tavoiteluuppi/ (IoU ≥ 90 %, korkeus ≤ 2 %).
- Peking Codex: tavoiteluuppi 781a30a5e.
- Lontoo kehityskaupungiksi vasta Greenwichin (harmaa maa + violetit puut) kuittauksen jälkeen.
- Junavahti tauolla (NS, T7-lupa); käännökset käsin.
- Seuranta: alkulennon Ateena-vika suljettu ja korjattu (uusi peli -nollaus).
- Raamattu 449 kt / raja 450 kt: lisäykset vaativat tiivistystä.

## 3. Nollaukset
Postivahti hoitaa roolien nollaukset NOLLAUS.md:n mukaan (omistajan pysyvä lupa, myös Postivahdin oma 13.48). Nollattu tänään: KS, PK×2, Valoseppä×2, NUI×2, LS1, Julkaisija, Postivahti. NS 64 % → luovutus pyydetty.

## 4. Opit
- Komennot skriptitiedostoina: zsh -c/eval/rm/cd&&-ketjut pysäyttävät jonon lupakyselyyn (Julkaisija 12.09, LT 13.31/13.44).
- Mykistys: myös Unityn batch-ajot ja selainvälilehdet (preview_stop ei sulje sivua).
- Haaroissa on usein kuittaamattomia committeja → pyydä erillinen haara/cherry-pick ennen NS:n yhdistämistä.
- Kuvat aina katsottava (sips -Z); Commonsista ladattaessa EI sähköpostia User-Agentiin.
