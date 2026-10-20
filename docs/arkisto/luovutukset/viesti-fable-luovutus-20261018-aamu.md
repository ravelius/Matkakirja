# Päätoimittajan luovutus 18.10.2026 klo 06.0x (konteksti 30 %, pehmeä raja)

PT local_cf5b4eca. Id:t /Users/Shared/Claude/osoitekirja.md (JU = JULKAISIJA local_1325b8e8, ei Laitetestaaja). Omistaja nukkuu.
Yön päätökset tehdään PT:n oletuksella, ja KK hyväksyy omistajan puolesta. Edellinen luovutus: viesti-fable-luovutus-20261018-yo2.md (käsitelty).

## 0. Heti
- VIESTIRAJA: kun SendMessage palauttaa "Not delivered … Paused", lähetä HETI mcp__ccd_session_mgmt__send_message id:llä
  (omistaja 05.36 + kortti 05.40; Raamattu päivitetty #4845). Ei odoteta omistajaa.
- PR #4846 (KK:n yönollaus Raamattuun): CI käynnistetty uudelleen; yhdistä, kun se on vihreä (gh pr checks 4846), ja poista sitten
  worktree: tools/uusi-worktree.sh --poista fable-kk-yonollaus (ja fable-luovutus-20261018-aamu).
- Kansio wt/fable-videosaanto jäi (worktree irrotettu, roskaa) → poista, kun sopii. Kansiot wt/fable-asemataulu-cron ja wt/fable-luovutus-20261016-aamu2
  eivät ole worktreitä (tuntemattomia), joten niihin ei kosketa.

## 1. Juna 201 (OMISTAJA 02.03: "kaikki suoraan samaan junaan", junaa 202 ei ole; kuvaparit, video vain jos välttämätön)
Runko ad1b9e604 VIHREÄ (NS): kaikki yön erät mukana (SS iss-fi, KS Nuuk + Kiina v10 5c59703d0, VS b986e5e5b + 92dc1db2e,
LS museo + veto 48fb08601, NUI kokoruutu a36a00eac, LR kehykset v3 589fa9957, PK pöytä 4e0711bba). Ämpärissä S2 v2h ja raketti v14.
JU:n kuvakäännös 3 ad1b9e604 valmistui ~06.10. KK:n tarkistus (scratchpad/keskustelukanava/tarkistus-201-0600/KK-tarkistus.md)
löysi 8 kohtaa. Ne on jaettu korjattaviksi junaan 201:
- NUI 2–4 → 6911a9f21 (natiivi-ui/kohdevalikko-korjaus-201) NS:lle; kokoruutu-pari odottaa JU:n vuoroa (PT pyysi).
- Valoseppä 5–7 (pilvien laattaraja, valittu kohde keskelle/otsikkoon, Reykjavík kortti kiinni) + 92dc1db2e:n simutodiste.
- LS 8 (museon napit eivät himmene, mutta napautus nielaistaan: kehysnappien tila) ENSIN, sitten Kaanaan häät (m0-valo + asento; 201 vain jos ehtii).
- Kohta 1 (pöytä irti alareunasta) ratkeaa PK:n pöydällä; tarkista kuvakäännöksestä.
KULKU: korjaukset NS:lle → kuvakäännös 4 → kuvaajat (PK pöytä, LR kehykset v3 + 2 muunnelmaa, VS, KS, NUI, LS) kuvapareina
→ PT täysikokoisina (kirjaa scratchpad/pt-juna201-kuvat-20261018.md) → KK → LUKITSE 201 (NS) → TF-lupa JU:lle → TF-rivi omistajalle aamuksi.
KS Kiina v10: siirtymä korjattu; nimi "208" ja Chengdun hehku yhä osin alla → SEURAAVA juna (KS:n seuraaja).

## 2. Muuta
- Asemataulu nollattu; se ei luo croneja ilman "OMISTAJAN PÄÄTÖS" -riviä → KK selvittää (aiempi päätös tai aamukortti).
- Nollattu yöllä: Valoseppä, Linssiseppä, Karttaseppä, Asemataulu; Pelikoodari nollautuu, kun pöydän käännös on valmis.
- Raamattuun kirjattu yöllä: EI PUSH -tarkennus (#4841), videot vain välttämättöminä + kaikki junaan 201 (#4842), viestiraja → varakanava (#4843, #4845).
- Omistaja 02.02: auth login ja pilviympäristö eivät ole nyt tarpeen (TOIMI peruttu).

## 3. Opit
- PT:n viestit olivat pysähdyksissä 01.55–05.33 → varakanava heti (ks. 0).
- Taustaskripti yhdisti PR:n tarkistamatta CI:tä (#4842; testit peruuntuivat, main vihreä) → yhdistä vain, kun kaikki tarkistukset ovat pass.
- Pakotettu push ei käynnistänyt CI:tä → tyhjä commit käynnistää sen.
