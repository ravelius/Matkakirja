# Fablen luovutus 22.9.2026 klo 20.10 (Mac-käyttäjä koodaus, sessio 22.9. klo 10.15 → 20.10)

Edellinen luovutus: viesti-fable-luovutus-20260922.md. Kaikki päätökset lokissa
docs/raamattu-loki/paatokset-2026-09.md (22.9. klo 10.19 → 20.07, ~110 otsikkoa; HUOM
tekstien kellonajat klo 10.19–13.21 välillä ovat n. 3 h liian myöhäisiä, otsikoiden leimat
oikein). Raamattua ei muutettu. Kone kaatui klo ~16.24 ja palautui; mitään ei menetetty.

## Sessiot ja ympäristö
- Kaikki kuusi roolisessiota nollattu tänään; worktreet roolinimillä (Matkakirja-julkaisija,
  -pelikoodari, -karttaseppa, -sisaltokirjuri, -laitetestaaja; vanhat polut symlinkkejä).
  Sääntö: rooli-worktree pysyy haarassa jota ei mergetä; erät /Users/koodaus/wt-<rooli>-<aihe>.
  Worktree katosi kolmesti mergessä (Karttaseppä 2×, Sisältökirjuri) → Julkaisija ei käytä
  --delete-branch; palautus: git worktree prune + add -b <rooli>-tyo-<pvm> origin/main.
- Julkaisija kysyy mergeen kortin (oma "Merge Without Review" -esto). Omistaja lisää itse
  .claude/settings.json allow-listaan Bash(gh pr merge:*) ym. (Fable ei saa: luokitin estää
  itsemuokkauksen). Julkaisijan sääntö: PR:n head == rebasattu tip ennen mergeä (kaksi committia
  hävisi tänään: Tarkkuus liikkeessä ja kolme syötetapaa; molemmat palautettu).
- Kellonaika aina `date`-komennosta. Push laukaisee CI:n Macilla; mittausikkunat sovitaan
  omistajan kanssa etukäteen (koneella on hänen muuta työtään). Postivahti 10 min.
- iPhone Web Inspector toimii STP:llä kun puhelin on auki (tools/mac/LUEMINUT-iphone-inspector.md);
  Timelines-vienti ei toimi. Omistaja EI kytke puhelinta ellei pakko; hän testaa itse pelistä
  (ratasvalikko) ja lähettää kuvakaappauksia. Fablen CGEvent-klikkaus toimii, veto ei liikuta
  karttaa Safarissa (Laitetestaaja selvittää).

## Tuotanto: v2123 (22.9. klo 19.50)
Päivän saldo: sulavuuskatsaus docs/raportit/sulavuus-katsaus-20260922.md (21 kiveä) ja sen
erät 1–3 tuotannossa (v2097–v2103: syöte kerran kehyksessä, kameraloki, change-kuuntelijat,
ilmakehä pois lähikuvassa, pohja piiloon peitossa, kerma ilman pow, esikäännös, Livia/pöllö
lepoon, lepopiirto sykkeellä, nollakopio-bittikartta, roska pois kehyspolusta, atlas
osittain); hotfixit v2094 (kerma-shader ei linkittynyt v2084–v2093), v2104 (compileAsync),
v2105 (lepopiirto pois → v2107 tickin tasolle → v2109 oletukseksi → v2123 ele estää ohitukset);
v2110 syöte herättää lepopiirron; v2115/v2117 syöteputken 5 tapaa + ratasvalikko "Vedon
seuranta"; v2118 "Tarkkuus liikkeessä"; v2119 karttaselitteen linssi + vedin reaaliajassa;
v2120 nostosymbolin halo pois; v2121 nostopiste harmaaksi (väri vivusta; poltetun laatan piste
värillinen kunnes nostotaso poltetaan); v2122 ?koe=profiili-overlay; Karttaseppä: laattaputken
lattia #2753 (v2086), esilataus SW:hen #2760 (v2090), preconnect v2091, katkaisija #2762,
poltto 2026-09-22c (vesiviivat laudan yksiköihin, laikut maailmaan) v2116 + luettelo ämpärissä;
kohtaamiset C1–C7 (45 kaupunkia) mainissa, kuvat C1–C7 Codexilta (tilaukset 8–15), monumentit
69/69, pienoismallit 25/25; Codexin pulu-galleria v2106/v2108, neljä katseluelettä v2112,
pulun karttapaikka v2103. Mittaustyökalut: tools/mittaus/seuraamisvirhe-palvelin.mjs (#2814,
#2829), tasaisuusmittari, kehysprofiili-overlay.

## SULAVUUS: MISSÄ OLLAAN (tärkein)
- Työpöytä: Chrome pehmeä; Safari tökkii = WebKit ei tahdista pointermovea rAF:iin (Nolan
  Lawson 2019; iOS tahdistaa touchmoven, ei pointermovea). Syötetavat (interpolointi oletus,
  interpvanha, ennakko, jousi, touch) valikossa; A/B-mittaus aidoilla vedoilla tekemättä
  (edellinen data pätemätön: harness luki kameran väärästä hetkestä; korjattu #2829).
- iPhone (omistajan overlay-kaappaukset v2123): rAF 60 Hz, vedossa piirto 100 % (korjattu),
  mutta 17–35 pitkää PIIRRETTYÄ kehystä (dt p95 52–54 ms, max 103–113) joissa js ≈ 0,7 ms ja
  render ≈ 0,2 ms → aika Safarin GPU-prosessissa/komposiittorissa; ei syötetapa, ei dpr
  (Tasainen-tilassa mittari näytti 500 Hz = kehysketju moninkertaistuu pikselisuhteen
  vaihdossa → VIKA, Pelikoodari korjaa), ei MSAA (Kokeellinen), ei DOM-multiply (eiblend),
  ei laattojen saapuminen, ei lämpö. Netti: Safarin WebGL GPU-prosessissa (IPC/kutsu),
  bufferSubData kallis, alpha:false, vähemmän dc.
- TILATTU Pelikoodarilta (PR tänä iltana, versio aamuksi): Tasaisen ketjuvika; ratasvalikkoon
  "Piirtokoe" (Normaali / Ei puskurikirjoituksia vedossa / Ilman alfakanavaa / Pikselisuhde
  1,5 / Ei tekstuurivientejä vedossa / Vähemmän piirtokutsuja) + "Näytä kehysprofiili";
  overlayhin puskurikirjoitukset, uniformit, dc per laji, rAF-ketjujen määrä; mittaus Macin
  Safarilla lippu kerrallaan. Omistaja kokeilee TÄNÄ ILTANA heti kun PR on tuotannossa (klo 20.15: "ei odoteta huomista") ja lähettää overlay-kaappaukset.
- Laitetestaaja: Macin Safarin Web Inspector Frames -mittauksen ohje (ei puhelinta) ja
  CGEvent-vedon toimivuus.
- Karttaseppä: meren lika on laatassa (kaksi tasoa piirtää eri kuvion); poltto 22c ei
  pienentänyt A−B:tä (5,68 → 5,95); harvennus puree z6/z5-vaihdoissa; ehdotus: harvennetut
  viivat esiin vaimeina; paperirae b) (ruutukerros peliin) JÄIHIN kunnes lika on kohdistettu;
  omistajan tuntumatesti kartasta 22c odottaa; nostotason poltto harmaalla pisteellä odottaa
  omistajan hyväksyntää (E-kaappaukset näytetty, myös ?koe=symbolitkaukana).

## Odottaa omistajaa (tänä iltana kohta 1, muut huomenna)
1. Piirtokoe-tulokset iPhonella (overlay-kaappaus per vaihtoehto).
2. Harmaat pisteet vs piirrokset kaukonäkymässä; nostotason poltto.
3. Kartta 22c: hyväksyntä/hylkäys (palautus yhdellä versiolla).
4. Julkaisijan gh pr merge -lupasääntö settings.jsoniin.
5. Linssi-ideat jonossa: openinframap (kaikki kerrokset), webkamerat (YouTube Data API -avain
   tai Windy-avain omistajalta).

## Uuden Fable-session ensimmäiset askeleet
1. Lue tämä, Raamatun kohta 2, lokin viimeiset 12 otsikkoa. ListAgents; RC self päälle (voi
   estyä luokittimessa → omistaja on jo remotessa).
2. Odota Pelikoodarin Piirtokoe-PR → Julkaisija mergeää → ilmoita omistajalle versio ja ohje:
   ⚙ → Kartta → Piirtokoe, vedä 10 s, kaappaus overlaysta; kokoa tulokset taulukoksi.
3. Kirjaa kaikki lokiin; kortit vain aidoille päätöksille; kellonaika date-komennosta.
