# Pelikoodarin luovutus 25.10.2026 klo 12.30 (Postivahdin kova raja 37 %)

Edellinen: viesti-pelikoodari-luovutus-20261025-1130.md (lisäyksineen; lue vain tämä). Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto,
haarat paikallisia. Esikatselu: `zsh <worktree>/tyokalut/esikatselu.sh <haara> <skenaario>` taustalle (jonottaa itse).
Arvio: `grep -E 'mittari: t (10|20|30|40) s|PELAAJA PIILOSSA|KAMERAHYPPY' unity.log` `drone alitus 0` -rivin jälkeen; kamerakorkeudet
loki.txt:n `kamera (x, y, z) pitch` -riveistä.

## JONO

### 1. KESKEN: räystäskamera (PT: junaan vasta, kun 0 kamerahyppyä ja 0 piiloruutua) + aukio 03 (HYVÄKSYTTY, menee samaan junaan)

Haara `pelikoodari/raystas-kamera-210` (worktree /Users/Shared/Claude/wt/proto-pelikoodari-raystas-210), junan 210 rungon 0ef01ab91 päällä:
dccaef28a, 4cac5fe5f, 8991e7626 (alitus pois, ennakko), 8314941bb (harjapaikka), 8e883bee8 + f8d48dc6e + 6f536fcbd (aukiokamera,
PT HYVÄKSYI 12.2x: 26°, katse 9,5°, loivennus porttimuurien ohi, QA `ui juoksupeli drone aukio 0|1`), **d04b6656a** (rakennusmallin
katto rekisteröidään vasta mallin ollessa paikallaan – kujaportin ja Taihemenin katot olivat origossa, eivät häivyneet), 1650a9bc7 +
c42db4c9e (LR:n osoittimet c94369db3 ja f40534b54 poimittu testiin: tausta-v49, muurikate-v15, rakennukset-v40; NS:llä myös
seuraavaan runkoon), **50fc50623** (läpikulkuportin katto häipyy räystäslinjalla 0,3 m ja palaa 1,8 m ulostulon jälkeen;
KattoHaivytys.OnPortti nimestä "portti"/"taihemen"; testi PortinKattoHaipyyRaystaalla). Testit 740/740, unity-tarkistus 0.

Tulokset (skenaario proto-3d/_tyo/pelikoodari/raystas-210/skenaariot/sk-katto-v39.txt = kujaportit + Taihemen → aukio):
- d04b6656a (esikatselu-1216): Taihemen 270 → 28 piiloa, kamera ~15 m (= Taihemenin harja 13 + vara: hyväksyttävä); kujaportti −794:
  24 piiloa (aukon yläpuolinen runko/palkit räystään alla, y 3,8) → LR siirsi ne katto-solmuun (rakennukset-v40, ämpärissä 12.25).
- c42db4c9e:tä edeltävä v39 (esikatselu-1221): −820 t-portti-424 katto toimii, mutta 25 piiloa sisääntulossa (katto häipyi vasta
  1,2 m sisällä) → 50fc50623.
- KÄYNNISSÄ 12.25: v40-ajo c42db4c9e (esikatselu-20261025-1225, ilman 50fc50623:a). SEURAAVAKSI: aja sama skenaario 50fc50623:lla.
  Odotus: kujaporteilla 0 piiloa; jäljelle vain juoksun alun artefakti (alku −249,4, 340 heti kujaportti-2:n jälkeen: 21–23 ruutua).
  Jos alun artefakti estää 0/0-tuloksen, siirrä skenaarion alku aiemmaksi (esim. −249,4, 320).
- Kun 0/0: (1) kolmikot PT:lle → KK → omistaja: aukio (havainne | 810 | kompromissi, kuten esikatselu-1203/aukio03-kolmikko-kompromissi.jpg,
  koostaja scratchpadissa ei säily: PIL, korkeus 900, 16 px musta väli, havainne = NUI:n 03b-kuvan vasen kolmannes) ja yksi kujaportin
  läpikulku (ennen | jälkeen | kamerakorkeus); (2) rebeisaa haara tuoreen junarungon (natiiviseppa/juna-210) päälle (LR:n osoittimet
  ovat siellä jo → pudota 1650a9bc7 ja c42db4c9e), testit, JU:lle junaan.
- Harjapaikan ja ennakon arvot jäivät (8314941bb, 4cac5fe5f); jos 0/0 toteutuu ilman niitä, ne eivät haittaa (aktivoituvat vain peitossa).

### 2. Lautaspöydän pari (PT: vasta räystäskameran jälkeen)

Kuvausrunko valmiina: `pelikoodari/lautaspoyta-kuvaus-210` 994427971 (worktree /Users/Shared/Claude/wt/proto-pelikoodari-lautaspoyta-kuvaus)
= raystas-kamera-210 (6f536fcbd) + ebe698506 (aarteet799-v4) + e806ef4bd (yksi pöytä) + e34e0fbe6:n sirpaleosa; testit 740/740.
Rebeisaa räystäskameran lopullisen haaran päälle. NUI:n lämmitysruutu 86c645bd1 on natiiviseppa/juna-210:ssä (esikatselu.sh kopioi
Esikatselu.cs:n ajavan worktreen puusta → aja tuoreen rungon päällä). Skenaario lautaspoyta-04/skenaariot/sk-lautaspoyta-04g.txt
(ei jäädytyskohtaa). Pari: kupla #949 /Users/Shared/Claude/wt/fable-posti-0945/posti/codex-fable-muistokupla4-lautaspoyta-20261025/04-lautaspino.jpg
| peli (PIL korkeus 1200, kupla vasemmalle, 16 px musta väli) → PT:lle 3 rivillä. PT:n tarkistus: yksi pöytä, tumma puu, kolme matalaa
pinoa, kontakti, sirpaleet oikean kokoisia ilman keltaista reunaa ja puhki palanutta valkoista, kamera 810 / räystään yllä.

### 3. Kuja-40:n levennys (omistaja 11.32, PT; omien tilausten jälkeen)

LR levensi kujat 02 ja 05 (tausta-v49, rakennukset-v39/v40, muurikate-v15 ämpärissä). Päivitä pohja, reitti ja esteet LR:n
muurilinjoilla: /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/kielletty-rakennukset/kuja40-levennys/pohja-muurit-kuja40.json
(muurit 66 ja 210 korvaavat pisteet + kujaportin paikka; kehys pohja.json, origo Taihedian). Samassa kansiossa muurilinjat-kuja40.json ja
reitti-katot.json. Palatsin kerroin pysyy 1,0 (mittakaavalistaa ei toteuteta).

## Tehty tänään (kuitattu)

- Aukio 03 kompromissi HYVÄKSYTTY (PT 12.2x). Raportti proto-3d/_tyo/pelikoodari/raystas-210/raportti-20261025-1155.md.
- Siivous 11.4x: 15 omaa viittaamatonta esikatselukansiota pois (~430 Mt).
- Havainto: juoksuvauhdissa drone on 12–13 m keisarin takana (nimellinen 7,1 m; DroneViive) → todelliset katseet loivempia
  (810 ≈ 11°). Ei tilausta; mainittu PT:lle.

## LISÄYS 12.3x: v40-ajon tulos (esikatselu-20261025-1225, c42db4c9e ilman 50fc50623:a)

0 kamerahyppyä; piilot: alun artefakti 25 (−742,8 kujaportti-2), −794 21 (este 239,4, 6,7 – kujaportin katon reuna sivussa),
−820 25 (t-portti-424, häipyi vasta 1,2 m sisällä), Taihemen 28 (sama syy); kamera enintään ~15 m (Taihemen). Nämä kolme
porttikohtaa ovat juuri se, mitä 50fc50623 korjaa → aja sk-katto-v39.txt 50fc50623:lla seuraavaksi.
