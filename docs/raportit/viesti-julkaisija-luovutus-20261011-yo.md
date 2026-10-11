# Julkaisijan luovutus 11.10.2026 yö (~23.2x, konteksti 80 %)

Loki: `/Users/Shared/Claude/julkaisija-tyokalut/tf-jono-20261002.txt` (tail -80, kellonajat `date`-komennosta). Edellinen luovutus
`viesti-julkaisija-luovutus-20261011-ilta.md`. PT: session `local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc` (SendMessage id:llä; nimi on listalla kahdesti).
Asemataulu avataan session alussa (Artifact open https://claude.ai/artifact/Rq5ajPU4SraE2XKd7BYAix).

## 0. Junat

- **Juna 182 VALMIS:** TF iOS 38156401738 (BUILD 0ac269d2d), Mac 38156210986, sisäinen + Testattavaa, ulkoinen (Arvioijat + Beta-testaajat),
  **beta-arvio APPROVED** (todettu 20.42). Vain 182 ladattavissa: **111 vanhempaa buildia vanhennettu** (iOS + Mac, 38168629771).
- **Juna 183 – OMISTAJAN LUPA "julkaise lopuksi 183" (PT 22.3x):** kun PT lähettää NS:lle LUKITSE 183 ja BUILD 183 on valmis →
  1) muutosloki-api.sh 183 "<≤ 3 lausetta / 280 mrk NS:n listasta>" 2) muistiajo-183.txt (NS:n porttirivi) 3) tf-kaynnista.sh 183 <BUILD täysi SHA>
  <muutosloki merge SHA> 4) Mac 183 (NS) 5) Testattavaa = NS:n lista, **ei symbolia ☰** (whatsNew 409) 6) ketju vanhentaa vanhemmat itse
  beta-hyväksynnän jälkeen (uusi vaihe tf-ketju-pohja.sh:ssa). Rivi PT:lle joka vaiheesta. Asemataulu talo/eteneminen: Julkaisija vaiheet 4–5.
- **Nimi "Matkakirja 3D":** ASC on jo kaikkialla "Matkakirja" (#4452 sovellusnimi.py + testflight-sovellusnimi.yml, 0 muutettavaa);
  "3D" tulee buildin näyttönimestä → NS korjaa junaan 183.

## 1. Työkalut (uudet tänään)

- `.github/workflows/testflight-sovellusnimi.yml` (lue/vaihda nimi), `testflight-ulkoinen.yml -f vanhenna_vanhemmat=N` (#4454).
- `julkaisija-tyokalut/tf-ketju-pohja.sh`: ULKOINEN → beta APPROVED (15 min) → vanhenna < N. Varmuuskopio `.ennen-vanhenna-20261011`.
- `beta-arvio-182.sh` (malli), `muistiajo-182.txt`, `testattavaa-182.txt`, `muutosloki-182-proosa.txt`.

## 2. Olavinlinna

- Vahti (pid 58074, setsid). Lista: laituri-varoitus, **v48b 3613ce329**, aanet, olavinlinna-181, tyrma-tapahtumat, kadet-oikealle.
- Botti: paras **13/17** (auto-2219 840959229, v48b). Seuraava LR:n v48c:n jälkeen; Siirtoseppä ajaa botin itse vahdin VALMIS-rivin jälkeen
  (A 8362879F, B DBA3A288; EI A26BC7D0 = LS2:n iPad). Laitetestaajan 8. kierros vasta 17/17.

## 3. Avoimet uudelleenkäynnistyksen / nollauksen hetkellä

- Merge vihreänä käynnissä (setsid): **#4458** PT Raamattu + loki yö (b489ed318), **#4460** SK Riian Kolme veljestä -talot (96400d9dc, PT kuittasi).
  Tarkista `gh pr view` → rivit PT (#4458) ja SK (#4460).
- #4453 MERGED 4451b57a3 (skeema 1.64): vie-sisalto → **rivi NS:lle kun paketti ämpärissä** (uusin.json skeemaversio 1.64) – tarkista ja lähetä.
- LS1: testi-183-ls1 a29996ef0 linjalla 2 → portti simu-testi183.nyt auki (iPhone 12 + iPad 3 min); poista portit SIMU VAPAA:n jälkeen.
- NUI: kippi-ui-183 9a755c95b linja 1 → iPhone 6 min. NS: Pariisi-toisto natiiviseppa-iPad13 käynnissä 23.1x.

## 4. Säännöt / opit tältä illalta

- Linja 1 = vahti + juna; muille kun vahti joutilas. Simuraja 4 ma 12.10. asti (vapaa < 20 Gt tai swap > 12 Gt → 2).
- Docs-PR ilman CI:tä → merge käsin (`gh pr merge --squash --match-head-commit`); luonnos-PR → `gh pr ready` vain kun PT kuitannut.
- Monicommit-PR, jossa KESKEN-otsikko → `--subject "<PR:n otsikko> (#N)"`.
- vie-sisalto voi jumittaa kuvien pienennykseen 40+ min (SK:n suojakorjaukset) → ulkoista TF-jakelua ei pidätetä sen takia (omistaja halusi betan näkyviin).
- Uudelleenkäynnistyksen jälkeen setsid-ketjut (vahti, tf-ketju, merge-vihreana) jatkavat; Bash-taustat ja Monitorit kuolevat.
