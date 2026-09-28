# Luovutus: Sisältökirjuri 28.9.2026 klo ~08.4x (konteksti ~68 %)

Fable käski nollauksen tämän vuoron jälkeen. Tämä raportti korvaa
-j-luovutuksen ja aiemman aloitusviestin ohjeet.

## 1. Lue ensin

1. `CLAUDE.md`
2. `docs/roolitus.md`
3. Tämä raportti kokonaan

## 2. VÄLITTÖMÄSTI SEURAAVAKSI: odota #3529 MERGED, sitten pushaa ihmeet-PR

Worktree `/Users/Shared/Claude/wt/sisaltokirjuri-ihmeet-14maata-kytkenta`
on täysin valmis ja committoitu (commit `8a9f02aba`, haara
`sisaltokirjuri-ihmeet-14maata-kytkenta`), mutta EI VIELÄ PUSHATTU eikä
PR:ää avattu — Julkaisija pyysi odottamaan, että PR #3529 (Codexin
historian hetket -PR, joka lisää saman kuuden maan MAA_KATEGORIAT-
taulukot) on MERGED ennen rebasea, jottei tule törmäystä.

Kun Julkaisija ilmoittaa #3529 MERGED:
1. `cd /Users/Shared/Claude/wt/sisaltokirjuri-ihmeet-14maata-kytkenta`
2. `git fetch origin main && git rebase origin/main` (voi tulla
   konflikti js/packs/maa-kategoriat.js:ssä jos #3529 mergetty samaan
   kohtaan — ratkaise pitämällä MOLEMMAT: Codexin `hetki-*`-oliot JA
   omat tulevat `historia`-oliot, ks. kohta 3).
3. `rm -rf dist && node tools/vienti/vie-sisalto.mjs && node tools/vienti/skeemasopimus.mjs --paivita`
   (skeemaversio 1.56 pitäisi pysyä samana, mutta aja silti — main on
   voinut liikkua).
4. `node --test tests/*.test.mjs` (koko sarja — oma ajoni jäi kesken
   kontekstin loppuessa; kohdennetut testit olivat vihreitä: nimiolimitys,
   sw.test, kuvatekstit, sisaltopaketti/skeema, maa-otsikot, historian-hetket,
   nostot-kartalla).
5. `git push -u origin sisaltokirjuri-ihmeet-14maata-kytkenta` + `gh pr create`.
   Commit-viesti selittää sisällön (14 ihme-kohdetta 6 kadonnutta +
   8 rappeutunutta parikuvana, 6 uutta hahmotelma-pakkia, skeema 1.56).

## 3. SEURAAVA ERILLINEN PR: maalehden Historia-aihe 6 maalle

Kolme agenttiraporttia ovat VALMIINA soveltamiseen (EI vielä sovellettu
kertaakaan koodiin — poistin ne tarkoituksella omasta PR:stäni törmäyksen
välttämiseksi, ks. yllä):
- `docs/raportit/sisaltokirjuri-maalehti-historia-srb-alb-20260928.md`
- `docs/raportit/sisaltokirjuri-maalehti-historia-mkd-mne-20260928.md`
- `docs/raportit/sisaltokirjuri-maalehti-historia-mda-blr-20260928.md`

Jokainen sisältää valmiin JS-lohkon (`{id:'historia', nimi:'Historia',
johdanto, nostot:[4], tehtava}`) SRB/ALB/MKD/MNE/MDA/BLR:lle. KUN #3529
ON MERGETTY: nämä LISÄTÄÄN olemassa olevaan `MAA_KATEGORIAT[ISO]`-
taulukkoon (Codexin `hetki-*`-olion viereen, EI korvaa sitä) — uusi
pieni PR, ei osana ihmeet-PR:ää. Kuvat on jo katsottu silmin ja
lisenssit tarkistettu (raporttien lopussa Commons-URL:t).

## 4. Ihmeet-tilaus Codexille: DNK-huomio

Alkuperäinen tilaus (`posti/fable-codexille-ihmeet-14maata-20260928.md`,
päivitetty `174510a59`) pyysi vahingossa myös DNK:n Christiansborg-
kuvan, joka oli JO PELISSÄ (`js/packs/monumentit-eurooppa.js` id
`christiansborg`). Codex tunnisti tämän itse ja kierrätti vanhan
hyväksytyn kuvan ("dnk-christiansborg-toinen-linna-loistoaika.jpg" on
identtinen sisällöltään). EN lisännyt DNK:ta uudelleen
`EUROOPAN_KADONNEET`-tauluun — ei toimenpiteitä tarvita, vain hyvä
tietää jos joku kysyy miksi DNK "puuttuu" 14 kuvan listasta.

## 5. Codex-korjaus: Nikosia 1878 (TEHTY, ei enää auki)

PR #3529:ssä oli virhe: "amiraali Lord John Gray" / 5.7.1878. Fable
pysäytti ennen kuin hyväksyin sen sokeasti (kuittasin ensin väärin,
peruin postilaatikossa). Oikea: **Lord John Hay**, **12.7.1878**
(tarkistettu en-Wikipediasta + 3 muusta lähteestä). Korjasin suoraan
Codexin haaraan `codex/historian-hetket-13-20260928` (committi
`0fd23bce5`), regeneroin lehtisivun `tools/paivita-hetkisivut.mjs`:llä,
testit vihreitä. Ei vaadi enää mitään — vain opetus: älä kuittaa
Codexin faktakorjauksia tarkistamatta, vaikka kiire painaisi.

## 6. Valmis ja mergetty / junassa

- **ROU**: PR #3514 MERGETTY mainiin.
- **CZE+HRV pitkä-korjaus**: PR #3524 OPEN, testit vihreitä
  (Livian nykyaika-ääni, 0/34 mainitsee "isoisä").
- **UKR pitkä+pulu (25/25)**: PR #3525 OPEN, testit vihreitä,
  ERASSA_1-poikkeus poistettu.
- **Kronborgin koordinaatti**: PR #3520 OPEN (pieni, riippumaton).
- **#3529 (Codex, 13 historian hetkeä)**: junassa, Julkaisija hoitaa
  mergen. Oma osuuteni valmis (kohta 5).

## 7. BGR — TUTKITTU, EI VIELÄ SOVELLETTU KOODIIN

Kaksi agenttiraporttia valmiina, EIVÄT VIELÄ pakassa:
- `docs/raportit/sisaltokirjuri-bgr-pitka-pulu-era1-20260928.md` (14 aluetta)
- `docs/raportit/sisaltokirjuri-bgr-pitka-pulu-era2-20260928.md` (14 aluetta)

Molemmat pistokoetarkistettu (0-2 "isoisä"/1873-mainintaa, oikea
tyyli). SEURAAVA TEHTÄVÄ ihmeet-PR:n ja maalehti-PR:n jälkeen:
sovella samalla menetelmällä kuin UKR (ks. PR #3525:n commit tai
`/private/tmp/.../scratchpad/apply-ukr.mjs`-tyylinen skripti — HUOM:
apostrofia sisältävät avaimet, esim. jos niitä ilmenee, tarvitsevat
`"..."`-lainausmerkit, ei `'...'`), poista BGR ERASSA_1:sta
`tests/maakunnat-pulu.test.mjs`:ssä, aja testit, PR.

## 8. Jono (Fablen alkuperäinen käsky, "14 kokonaan puuttuvaa maata")

**HUOM KAKSI ERI RATAA SAMOILLE MAILLE — älä sekoita:**
- **RATA A (tämä jono, maakuntien pitkä+pulu)**: UKR ✅ → **BGR (tutkittu,
  ei sovellettu, ks. kohta 7)** → SRB → BIH → ISL → ALB → MKD → MNE →
  CYP (myös kuva puuttuu) → MLT → LUX → MDA → BLR, sitten loput 21 maata
  (vain Pulu).
- **RATA B (valmis, eri sisältö)**: SRB/BIH/ALB/MKD/MNE/CYP/MLT/MDA/BLR
  saivat tässä vuorossa "Matkakirjan ihme" -kohteen (yksi karttanosto,
  ei maakuntia) ja maalehden Historia-aiheen (yksi lehtiaihe, ei
  maakuntia) — TÄMÄ EI KORVAA eikä nopeuta rataa A:ta. Maakuntien
  pitkä+pulu on yhä tekemättä näille maille.

Menetelmä joka toimi ROU/CZE/HRV/UKR/BGR:ssä: 2 tutkimusagenttia
(Sonnet, WebSearch), kukin ~12-14 aluetta, raportoi valmiin markdown-
tiedostoon. KORJAA OHJEISTUS agenteille aina: Livia-nykyaika-ääni
SUORAAN alusta asti (ei isoisä-runkoa edes ensimmäisellä yrittämällä —
tämä virhe tehtiin CZE/HRV/ROU:ssa ja piti korjata jälkikäteen).

## 9. Sitovat käytännöt (ei muutoksia)

- JUMI → FABLE, VIESTIRAJA ~10/vuoro.
- Agentit vain Sonnet/Opus, enintään 3-4 rinnan (tässä vuorossa käytin
  hetkittäin 5, koska ne olivat täysin riippumattomia — toimi hyvin,
  mutta älä venytä tätä säännöllisesti).
- Älä mergaa checkout-haaraa `sisalto-pelikatalogi-20260927`.
- VAIN EUROOPPA on maantieteellinen rajaus.
- Main liikkuu nopeasti: `git fetch origin main` + rebase juuri ennen
  pushia. `js/muutokset.js`-konfliktit ovat rutiinia.
- **UUSI OPPI TÄSTÄ VUOROSTA**: kun lisäät maalle ENSIMMÄISEN
  karttanoston (`js/packs/monumentit-eurooppa.js` tms.), tarkista AINA:
  1) tarvitaanko uusi `hahmotelma-<iso>.js` (jos maalla ei ole yhtään
  ennestään) ja rekisteröinti `js/fokuskohteet.js` + `sw.js` SHELL +
  `tools/build-standalone.mjs` MODULES; 2) `nimio`-kentät ≤ 18 merkkiä
  (`tests/sisaltopaketti.test.mjs` "skeema 1.40"); 3) nimiötörmäykset
  ruuhkautuneilla alueilla (`tests/nimiolimitys.test.mjs`) — käytä
  todellista maantiedettä lähtökohtana mutta siirrä pikseleitä tarpeen
  mukaan (kommentoi miksi); 4) skeemaversio nousee ja
  `node tools/vienti/vie-sisalto.mjs && node tools/vienti/skeemasopimus.mjs --paivita`
  ajetaan AINA ennen PR:ää kun paketin rakenne muuttuu (uusi moduuli,
  uusi kenttä).
- **Worktreet pois heti kun PR on avattu** (Fable 28.9., levytila
  lähellä rajaa) — älä säilytä worktreeta "varmuuden vuoksi" PR:n
  avaamisen jälkeen, `tools/uusi-worktree.sh --poista <nimi>`.
- **Älä kuittaa Codexin/kenenkään faktakorjauksia tarkistamatta** —
  ks. kohta 5, tämä oli tämän vuoron ainoa läheltä piti -tilanne.
