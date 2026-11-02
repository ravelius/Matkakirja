# Pelikoodari: luovutus 2.11.2026 klo 20.50 – juna 218

Edellinen: -20261102-1715 (3ac4a192c, haara pelikoodari-luovutus-1715): sen jono ja huomiot ovat voimassa, ellei alla toisin.
Syy: konteksti pehmeällä rajalla. Proto-worktree /Users/Shared/Claude/wt/proto-pelikoodari-tausta-v99, haara
pelikoodari/kapea-reitti-218 (commitit paikallisia), kärki **6fc19c1bf**. Salirunko pelikoodari/sali-218b = 6f48431dc (ennallaan, v112).

## Tehty tässä vuorossa
- **66dc02d2d** QA `kaanna <s> seina` hyväksytään vasta ohjauksen siirron jälkeen (`AvausKaynnissa` → "ei"); taso1b3:n vika
  (käännös avauksessa). unity-tarkistus 0 virhettä.
- **6fc19c1bf** 承乾宫 3a kytketty: rakennukset-v113 (c3-chengqiangong), tausta-v109, palatsi-esto-v34 (tavulleen v33). SHA256SUMS
  täsmää, testit 797/797, palatsi 1696 solmua, umpikujia 0 (+ sali 1). LAV:lle kuitattu, JU vei 20.41.
- **5fa87046d** (proto-worktree wt/proto-pelikoodari-kivi-216, haara pelikoodari/piirtajat-218) Esikatselu.cs: `kamerakierros x z y
  säde korkeus kaari kesto` (tallenteen kamera kiertää pohjan pisteen eteläpuolta, UI pois, pelin kamera palautetaan; vain
  tallenne) + `<nimi>/kamera.txt` (joka kuvan peliaika ja kameran paikka). PT 20.2x pyysi salitallenteisiin: Maali-kortti ~3 s,
  avauslento ~3 s ennen kujaa, sali ja valtaistuin näkyviin.
- Salien skenaariot v2: `sali-218b/sk2-<koodi>.txt` (tekijä scratchpadin tee-sk.py; kohde = rakennukset-v112:n 'Muted gold'
  -sermin keskikohta x, etureuna z − 0,9, lattia + 0,9; säde 4,8, kamera 1,7 m kohteen yllä, kaari 60°, 7 s). Vanhan skenaarion
  maaliehto `maali piste` ei koskaan vastannut lokia → silmukka kesti loppuun (kortti 50 s). Nyt `loppukortti Maali`, 0,5 s:n välein.
- `sali-218b/leikkaa.zsh`: alku leikataan 3 s ennen viimeistä laskeutumista (kamera.txt: viimeinen y > 8 m ennen kierrosta; avauslento
  käy välillä Meridiaaniportin alla y ~4). Koeajo cx 202932 (kierros 4,2/0,9/80 liian lähellä → nyt 4,8/1,7/60): 52 s → 29,7 s.
- KK 20.46 pyysi paketin suoraan KK:lle (kopio PT:lle). **Osa 1 lähetetty 20.5x**: taso1a2 (tallenne-218t/20261102-175105-taso1a2.mp4).

## KÄYNNISSÄ (JU:n ESIKATSELU linja 1, ei vielä vapautettu)
1. `tallenne-218t/ketju9.zsh` (→ ketju9.ulos): `sali-218b/ketju8.zsh cx yk ys th tj ty cc xf` → `sali-218b/<aika>-<koodi>-v2.mp4`
   (leikattu; leikkaamaton <aika>-<koodi>.mp4 ja kamera-/fps-tiedostot vieressä), sitten taso1b4 (66dc02d2d) →
   `tallenne-218t/<aika>-taso1b4.mp4`. ~9 min/sali.
2. `latauskuva-218/ketju.zsh` (odottaa ketju9:n): latausruutu ipad, ipad-pysty, iphone → `latauskuva-218/<koko>-lataus-{1,2,3}.png`.
Jos ajot kuolivat: aja puuttuvat samoilla skripteillä taustalla.

## Jono
1. Tarkista salit v2 (arkki: `ffmpeg -i X -vf "fps=1,scale=320:-1,tile=8x5" -frames:v 1 a.jpg`): avauslento ~3 s, valtaistuin
   näkyy kierroksessa (ei seinän sisällä), Maali-kortti ~3 s. th:ssä (体和殿) ei valtaistuinta: kierros salin pohjoispäässä.
2. Tarkista taso1b4: unity.log `kaanna 1 seina → =juoksupeli` vasta `OhjausPelaajalle`-rivin jälkeen, keisari juoksee ~60 s.
3. Tarkista latauskuvat: ei mustia reunoja, poika ja otsikko kokonaan.
4. Lähetä KK:lle polut (osa 2: 8 salia + B, osa 3: latauskuvat), kopio PT:lle ≤ 3 riviä. Sitten JU:lle "ESIKATSELU VAPAA".
5. Edellisen luovutuksen jono 4–5 ja TILA 20.25:n havainto (botin ajossa "käänny vasemmalle" -ohje ~20 s suoralla kujalla).

## TILA 21.25 (päivitys; tämä korvaa yllä olevan KÄYNNISSÄ-osion)
- Kärki **7127ca0c3**: 钟粹宫 kytketty (rakennukset-v114, tausta-v110, esto-v35 = v34 tavulleen; 797/797, 1705 solmua; LAV kuitattu).
- **409d7f494 (claude/postilaatikko)**: OMISTAJAN PÄÄTÖS 21.05 → arkiset hahmot tilattu Codexilta (ruokaeunukki, palvelijatar,
  vedenkantaja + tavarat ja jäänteet; särkymisen ääni EI houkuttele jahtaajia). Toteutus VASTA tallennepaketin, eunukkikorjausten
  ja ristikko-ovibugin jälkeen (KK). Video omistajalle taso 1:stä KK:n kautta. Worktree wt/pelikoodari-postilaatikko.
- Levyraja: muut roolit kuluttavat levyä; aja-sk.zsh-raja laskettu 30 → 20 Gi (ajo tarvitsee < 3 Gt).
- KK:lle lähetetty: osa 1 taso1a2, osa 2 cx-v2 (20261102-203937-cx-v2.mp4, OK) + latauskuvat ipad-lataus-2.png ja
  iphone-lataus-2.png (latauskuva-218/, OK).
- **iPad pysty -latauskuva EI onnistunut**: esikatselu-20261102-210012 kuvat näyttävät kartan, vaikka unity.log sanoo "latauskuva
  näkyy" (isäntä 1032×1376). Selvitä (Kuva()-kooste pystyssä? kokeile --ikkuna tai iPad pysty simulla JU:n kautta).
- **Salien maali**: alku ja maali ovat kujalla, ja botti oikaisi kujaa (yk 204900: 5 s) tai kiersi ulkokautta (ys 210522: kamera
  seinissä). Maali nyt salin SISÄLLÄ takaoven edessä (reitin viimeinen y>0-piste): th tj ty cc xf ja ys; yk takaovella (piste 10).
  Ajossa: b17z1sfox yk → `ketju8.zsh th tj ty cc xf` + taso1b4 (66dc02d2d) → `sali-218b/ketju11.zsh` (ys). Tarkista jokainen
  arkilla: botti kulkee salin läpi, kamera ei seinissä, kierros näyttää valtaistuimen, Maali ~3 s. Jos maalia ei saavuteta salin
  sisällä (silmukka 110 s loppuun), kokeile takaoven ulkopistettä tai `ui juoksupeli suosi`.
- Sitten osa 3 KK:lle (loput salit + taso1b4 + iPad pysty), kopio PT:lle ≤ 3 riviä, ja JU:lle "ESIKATSELU VAPAA".
