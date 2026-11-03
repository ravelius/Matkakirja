# Natiivisepän luovutus 3.11.2026 klo 04.55 (konteksti 27 %, 7.37)

Vain voimassa oleva tila. Korvaa luovutuksen viesti-natiiviseppa-luovutus-20261103-0350.md (sen JONO ja TILA siirretty tähän).
Id:t: /Users/Shared/Claude/osoitekirja.md. Ei keskeneräisiä mergejä. JU:n vuoro käytetty: Iso iPadissa nyt 689cdc446 → VAPAA JU:lle lähetetty.

## ETUSIJA: INTRON MUISTITAPPO – KORJATTU, PT HYVÄKSYI KORJAUKSEN EHDOIN
**Juurisyy (mitattu, 50 ms MuistiTarkka, Release, Iso iPad):** kartan UI-kerrosten UITK-sumennuksen LIUKU (UiNakymat.
PaivitaKarttaUiSumennus, 27.10.): säde muuttuu joka ruudussa → uudet koko ruudun välitekstuurit joka ruudussa (+1,1–1,3 Gt
0,3 s:ssa) intron alussa (Kokoruutu päälle) ja lopussa (pois). Pallon renderScale/pysäytyskuva EI (koe "pallo 0" kuoli silti).
Esilataus EI (pelkkä runko 55ce62126 kuoli 82 s, marginaali −0 %). Lisäksi TraileriTaustan kerrosjuurisumennus 2,5 s:n kohdalla +490 Mt.

**Korjaus 689cdc446** (haara natiiviseppa/intro-muisti-218 työpuussa wt/proto-natiiviseppa-introkoe, runko 55ce62126 + 08aa2aa61
muistikoe-kytkimet + korjaus; peili pushattu):
- Tumman peitteen alla (aloitusintro, saapumistraileri) kartan UI-sumennus = 0 ja porras (TraileriTausta sumentaa kerrokset 2,5 s:n
  päästä kuten 17.10. ennen 27.10.:n liukua).
- TraileriTausta sumentaa pienet näkyvät osat (< 35 % ruudusta, ≤ 12 kpl) koko ruudun kerrosjuuren sijaan (loki: "kerrokset 10,12:4 osaa,15:3 osaa").
- Kytkimet: peli-komento `muistikoe karttaui 0|porras|1`, `muistikoe pallo 0|1`, `muistikoe kerrososat 0|1`.
- Tulos: huippu 3834 Mt = marginaali 25 % (huippu saapumisessa ennen introa), intron aikana ~30 %, 0 muistivaroitusta; intron alku/loppu
  gfx +30 Mt, TraileriTausta +196 Mt. Lokit proto-3d/lokit/natiiviseppa-muistikoe-689cdc446-runko-20261103/ ja -08aa2aa61-{runko,karttaui,pallo,porras}-20261103/.
- Nykäysvahti HYLÄTTY 80 pitkää ruutua kuten ennen (saapumisen kartta, ei intro).

**PT:n ehdot ennen runkoon vientiä (KESKEN):**
1. **Kuvapari ennen | jälkeen PT:lle** samasta hetkestä: intron 2,5 s (TraileriTaustan sumennus juuri päälle) ja intron loppu.
   Ennen = 08aa2aa61-äppi ilman komentoja (sama kuin runko), jälkeen = 689cdc446. Äpit valmiina lokit/natiiviseppa-app-210-runko-{08aa2aa61,689cdc446}-laite.
   Nykyinen skripti ottaa kuvat 6 s ja 20 s matkan jälkeen (intro alkaa ~63 s sovelluskelloa, vaihtelee ±1 s): lisää kuvat intron mukaan
   (esim. odota konsolista "esitys aloitusintro pariisi auki" ja lähetä "kuva" 2,7 s ja 17,5 s sen jälkeen) tai sarja 0,5 s välein ja valitse
   lokin aikaleimoista. Kohde kokonaan, sama rajaus (muisti: pari-sama-kohde-kokonaan). JU:n vuoro.
2. Omistajan pieni iPad: vastattu PT:lle (sama liuku rungossa 8b81a3f29 ja TF 217 60bd5c356; pieni iPad todennäköisesti ei kaadu, mittaamatta).
3. Sitten korjaus junaan 218: merge 689cdc446 → natiiviseppa/juna-218 (wt/proto-natiiviseppa-ehdokas) PT:n kuittauksella. Muistikoe-kytkimet
   saavat jäädä (diagnostiikka, oletus ennallaan).
- **Avoin riski (PT:lle tiedoksi, ei tehty):** sama liuku muissa Kokoruutu-tilanteissa (nosto kokoruudulla, lautapelit, arkki ≥ 70 %) → sama
  +1 Gt:n hetkellinen piikki. Ratkaisu tarvittaessa: porras tai harvat askeleet kaikkialla (ulkoasumuutos: sumennus ilman 0,3 s:n liukua) → PT:n päätös.

## JONO
1. **Ehdot 1 ja 3 yllä** (kuvapari → PT → merge junaan 218).
2. **Osa C (esilataus) ODOTTAA OMISTAJAN VALINTAA** (ennallaan; KK suosittaa (b) + taustaesilataus). Haara natiiviseppa/esilataus-218
   2cf83b7c3 (työpuu wt/proto-natiiviseppa-esilataus). Esilataus EI ollut muistitapon syy – PT:lle kerrottu.
3. **KS:n uusi pohjasarja** (tasot 9–10) → SileaUrl + offline.json kaupunkiRasteri + lepokuvat (lepokuvat-valitaso.sh, kaaret 1.5/0.8/0.4).
4. **GC-haara runkoon** vasta PT:n luvalla (2856c5cc3, haara natiiviseppa/gc-mvt-218).
5. **Merget** (VS/NUI/KS) PT:n kuittausten mukaan: `git merge-tree --write-tree runko haara` → commit-tree → update-ref.
   zsh-ansa: `$C:refs/...` ja `git show $c:polku` tulkitaan :r/:A-muuntimiksi → kirjoita `${C}:...`.
6. **Juna 218 jatkuu** (ei TF-tilausta). Lukitus ja TF vain "OMISTAJA PYYSI JULKAISUA" (tagi natiiviseppa/runko-218-tf).
7. **JU:n löydös (ei tehty)**: proto-kaanna.sh linja 2 → uninstall ennen installia vain epäonnistuneen käynnistyksen jälkeen.
8. **Odottavat (ennallaan):** LAV rakennukset-v95 ei runkoon ennen PK:n eunukkikorjausta + PT:n kuittausta; PK bugi 2; NUI:n
   leikehaara 7280634c4 EI. Pariisin vieritys osa 3 EI NYT. Pariisin piirrosta EI optimoida (tehdään alusta).
9. Jono tyhjä → rivi PT:lle "JONO TYHJÄ: Natiiviseppä".

## TILA
- TF 217 testaajilla (runko 60bd5c356). Juna 218 runko = 55ce62126 (wt/proto-natiiviseppa-ehdokas, haara natiiviseppa/juna-218).
  Kansiot ennallaan (rakennukset-v98, tausta-v100, palatsi-esto-v25, c2-v34, muurikate-v38, osamallit791-v10; TasoVersio
  haamu3-20261102, LeikeVersio leikkeet-20261102, SiltaVersio leikkeet-sillat-20261102).
- Nykäysvahti 4.24 on omistajan sitova sääntö; rajaa ei muuteta.
- Laiteäpit: 08aa2aa61, 689cdc446 (Release, uusimmat), 16c732c8c, 390e3d9d9, 2cf83b7c3. PT: pidä 2 uusinta + käytössä.
- Iso iPadissa nyt 689cdc446 (JU palauttaa uusimman rungon). Documents/muisti-tarkka.txt = "50" (VALI=50 kirjoittaa sen).
- Cron Unity-beeta "4 9 * * *" (python3 proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py; tyhjä = ei uutta) → luo uudelleen.
- Worktreet: ÄLÄ poista ehdokas, -tyokalut, -varjo, -saapuminen, -gcmvt, -esilataus, -introkoe eikä T7-kopioita. Luovutusworktreet
  natiiviseppa-luovutus-20261103-{0120,0230,0350,0500} saa poistaa mergen jälkeen (`tools/uusi-worktree.sh --poista <nimi>`).
- Testiaineisto (ei repoon, ODbL): Lontoon 9 Z14-palaa haetaan tarvittaessa
  https://tiles.openfreemap.org/planet/20261025_080012_pt/14/{8185..8187}/{5447..5449}.pbf.

## JATKOKOMENNOT
- **Muistikoe:** `zsh .../juna218/muisti-koe218.sh <sha9> [runko karttaui porras pallo juuri]` (kääntää puuttuvan Release-äpin, ajaa
  kokeet VALI=50; saapuminen-muisti218.sh tukee nyt VALI=<ms> ja ESIKOMENTO="peli-komento"). ANSA: joka toisen ajon muistiloki jäi
  hakematta ("VIKA haku muisti-tarkka.log", 0 tavua) → aja uudelleen, jos tarvitset numerot.
- Testit: `EI_PEILIA=1 nice -n 15 zsh /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna210/testit210-rinn.sh <työpuu>`
  (YKSI kerrallaan, ~4 min; peili: git push natiivi-backup HEAD:refs/heads/peili/proto/natiiviseppa/<haara>).
- Release-laitekäännös: `LAITE_KOPIO="/Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity-b6" zsh .../juna210/laite210.sh <sha9> runko-<sha9>` (~19 min).
- Muisti A/B (vuoro JU:lta): `zsh .../juna218/muisti-ab218.sh <shaA> <shaB>`.
- Pitkät ajot: Bash run_in_background lokitiedostoon + Monitor `tail -F | grep`; ÄLÄ aja pitkää skriptiä suoraan Monitorissa (30 min katto tappaa sen).
- Odotussilmukka-ansa: `until ! pgrep -f X` osuu omaan komentoriviin → käytä pid:tä (`kill -0 <pid>`).
