# Pelikoodari: luovutus 3.11.2026 klo 16.30 – juna 218

Edellinen: -20261103-1535 (c576d0ec9), voimassa ellei alla toisin. Syy: TILINVAIHTO (PT 16.26, omistaja).
Testit: bash Peli-testit/kaanna.sh 806/806; zsh tyokalut/tarkista.sh 0 virhettä (unity-tarkistus 0).
Proto-haarat ovat paikallisia (proto-3d:llä ei etärepoa); worktree /Users/Shared/Claude/wt/proto-pelikoodari-ys-218 = polku-218ai.

## Tehty 15.36–16.30
- **KK 15.26 kohdat 2–3 → f25009027** (proto pelikoodari/kurkistus-218ah = polku-218af 131103d47 + nämä):
  - Kohta 3 (taso1b 27,5–30 s eunukin lähikuva, Puyi ~2,5 s ruudun ulkopuolella): JuoksuAvaus.KurkistusRajaus – katse eunukin
    kasvojen ja Puyin (jalat + pää 1,35 m) kulmavälin keskelle, pystykenttä ≥ lähikuvan tele, ≤ max(kenttä, 60°). + testi.
  - Kohta 2 (vartija pojan läpi 95–96 s): EI kuolemattomuutta kiinniotossa – botti liukui onnistuneesti (loki "liuku 100");
    `ui juoksupeli elinvoima 100` 2 s välein vain täyttää elinvoimaa. Vartija piirtyi läpi, koska ohitettu väisti 4,5 m/s.
    Nyt: Puyin liukuessa syöksy 0,9 m Puyin sivulle (OhiSivuM), väistö ohituksessa 10 m/s (OhiNopeus, OhiMatkaM 1,5 m).
    Vastaus KK:lle mennyt PT:lle 15.45.
  - Huom. kohdan 2 kohdalla opetus kehotti "heitä omena vartijaan", mutta botti liukui (botti ei noudata opetusta) – ei korjattu.
- **218ag ajettu (JU L1 15.47–, runko kurkistus-218ah f25009027)**, tulokset /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/sali-218ag/:
  - cx (polkukamera 1×), ty (2×), xf (1×): af:n seinän takana -viat poissa. cx ~5 s seinäpala oikealla puolikkaassa, ty ~14 s korkea
    yläkuva (Puyi pieni) – pieniä.
  - cc: Maali-kortti Puyin alapuolella, Puyi näkyy → ok.
  - **ys ja tj: polkukamera EI alkanut** (ys ~7 s ja 10–12 s seinän/sermin sisällä, tj ~8 s sermin takana, ~4 s pelkkä ovipalkki).
  - taso1b: ajossa 16.26 (tulos sali-218ag/*-taso1b-v3.mp4 tulossa). Tarkista: 27,5–30 s eunukki+Puyi samassa kuvassa,
    95–96 s vartija ohi sivulta, aukio 78–92 s rakennukset + taivas (131103d47), 93,5–96 s porttikäytävä (ks. -1535).
- **Polkukorjaus 653e0ea4b + loki 6311df2d4** (proto pelikoodari/polku-218ai, kurkistus-218ah:n päällä): DroneNosto.PolkuMin 1,5 m
  (polkuehdokkaat ennen ≥ LahennysMin 3,2 m: keisarin kääntyessä heti ovesta jänne leikkasi pielen viereistä seinäruutua – OLETUS,
  ei todistettu); polkutukoslokiin "pisteitä N, tukos polulta ≤ 1 m kyllä/ei" erottaa lyhyen polun ja tukkeutuvan jänteen.
- Ajo valmiina, EI vielä pyydetty JU:lta: zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/sali-218ai/ketju-ai.zsh ys tj
  (runko pelikoodari/polku-218ai 6311df2d4; voi lisätä cx ty xf varmistukseksi).
- Sivuhavainto: taso1b:n unity.log:ssa 3646 musiikkiriviä "(alku, seuraava N)" – todennäköisesti eräajon ääni pois (isPlaying false →
  JuoksupeliNakyma.SoitaMusiikki aloittaa uudelleen); videossa ei ääniraitaa. Tarkista laitteella ennen kuin korjataan.

## SEURAAVA
1. taso1b-ag (sali-218ag/): yllä olevat kohdat; jos ok → KK-paketti kuten sali-218af/kk-taso1b/ (video + arkki).
2. JU:lle ai-ajo (ys tj); huom-*.txt: "polkukamera alkaa" pitää löytyä; jos ei, polkutukos-rivin "pisteitä" ja "polulta" kertovat syyn
   (pisteitä pieni → polku nollautuu, KameraPolku.Hyppy/Lisaa; "polulta ei" → jänne tukossa, harkitse polkua pitkin kulkevaa näkölinjaa).
3. Kun salit ok: salien paketti KK:lle (video + fps=1,scale=300:-1,tile=6x4).
4. Codex-toimitukset odottavat yhä (Viimeisen keisarin nosto 5345c2379, postilaatikossa ei vastausta 16.2x).
5. MUISTA (ennallaan): Editor-työkalumuutokset myös kivi-216-puuhun (tyokalut/esikatselu.sh kopioi sieltä).
6. Checkout /Users/Shared/Claude/Matkakirja-pelikoodari: luovutushaara koti/pelikoodari-20261103-1630.

## LISÄYS 16.40: taso1b-ag valmis (sali-218ag/20261103-162232-taso1b-v3.mp4, 97,3 s; "VIKA kuvia ei syntynyt" on taso1b:ssä normaali)
- Kohta 3 OK: 25–31 s eunukki ovella ja Puyi samassa kuvassa koko ajan.
- Kohta 1 OK: aukio 76–92 s rakennukset, puut ja taivas (131103d47).
- Kohta 2 EI TODISTETTU: tässä ajossa ei yhtään vartijaa juoksun aikana (ei "varoitus"-riviä; eri siemen). Tarvitsee ajon, jossa
  liuku vartijan alta (esim. sali-ajon skenaario vartijalla tai sama siemen kuin af 1217174437).
- 93–97 s: yhä jyrkkä kuva pelkkää kiveystä porttikäytävän jälkeen (ks. -1535: YhtKulmaMax katon alla → kuja-kulma) – AUKI.
- Ennen avausta (botti pois) "kiinni takaa v1 z10" – skenaarion odotusvaihe, ei tallenteessa.
- KK-paketti valmiina PT:lle: /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/sali-218ag/kk-taso1b/ (taso1b-218ag.mp4 + arkki-01…05, 20 s/arkki).
