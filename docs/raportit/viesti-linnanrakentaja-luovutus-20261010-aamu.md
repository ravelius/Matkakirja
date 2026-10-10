# Linnanrakentajan luovutus 10.10.2026 aamu (nollaus 06.4x, PT)

Edellinen: `viesti-linnanrakentaja-luovutus-20261010-yo.md` (koko yön TEHTY-osiot 02.4x–06.2x lopussa). Haarat:
työ `linnanrakentaja-tyo-20260929`, Olavinlinnan koodi/blender.json `linnanrakentaja-linna-v45e` (worktree
`/Users/Shared/Claude/wt/linnanrakentaja-linna-v45e`, viimeisin 6186da589 = v46v). Taustalla ei ole ajoja käynnissä.

## 1) ENSIN: Olavinlinna v46w (PT 06.4x: korjaa viat 1 ja 2 heti, tarkista pelikuvasta)

Lähtötila: v46v paketti cb8c8110742e5cba (blender fcd02e01b928b7bd), kytketty Siirtosepän `siirtoseppa/esittely-1499` a67739337
(juna 175). Arkki: `proto-3d/lokit/todistus-v46v-175-20261010-0624/kuva-arkki.png` (v09 = s5-torni, v13–v14 pohjoisranta).

**Vika 2 – suorakulmainen tiililaikku Kirkkotornin pohjoiskyljessä (v09, v14 oikea yläkulma): DIAGNOOSI VALMIS.**
Se on kävelyosa `kavely/kappeli-kavely.glb` (kappeli lähteistä Ø 7,8 m, lattia 9,6; v44i), jonka ulkopinta työntyy kuoren läpi:
osan raja glTF z −21,9, tornin ulkopinta ~ −20,6. Mittaus (olavinlinna-kavely-v1/lahde/tyokalut-lr/kappeli_ulos.py; tornin akseli Blender (−15,3, 14,0)):
`kappeli-kavely-kivi` 603 tahkoa / 337 m² säteellä > 6,0 m ja 203 / 128 m² > 7,0 m (z 9,3–16,0), lisäksi `-rappaus` 73 tahkoa
> 6,0 m, `-kivilattia` 4 tahkoa. Korjaus: poista kappeli-kavely.glb:stä näkyvän osan tahkot, joiden keskipiste on tornin kuoren
ulkopuolella (kuoren säde tällä korkeudella: säde ray castilla kuoresta suuntaan, tai kiinteä ~6,3 m) TAI leikkaa tahkot säteellä
6,2 m (bisect sylinterillä). Sisäpinnat (r ≈ 3,9) eivät muutu, joten pelaaja kappelissa ei huomaa eroa. Törmäys-/kävely-glb:t
ennallaan. Sitten valoatlas uudelleen: `cd olavinlinna-kavely-v1 && Blender -b -P lahde/leivo_kavely.py -- <kansio>
../olavinlinna-blender-v44/ulkokuori/ulkokuori_normaali.glb kappeli-kavely --pohja 0.3` (työkopio kuten v25-tyo3: kopioi
blender-v44/kavely → tyokansio, korjaa, leivo, kopioi takaisin; osat.json-paikka vain kappeli-kavelyn kentät – ÄLÄ korvaa koko
osat.json:ia kavely.py:n tuotoksella, siitä puuttuvat valoatlas-kentät, ulkoalue ja piilo:tupa-tynnyrit).

**Vika 1 – ruskeat suorakulmaiset tasolaikut vedessä (135°/180°/225°, myös v46u): HYPOTEESI.** kavely.py:n `ranta_1499()`
piirtää jokaisen b1499-leikkauslaatikon pohjalle vesiquadin y −7,02 ja koko kuoren alle quadin −7,05 (materiaali `vesi`, ilman
törmäystä). Pelin järvitaso −7,0 peitti ne aiemmin; käännöksessä 308f4b02 ne näkyvät ruskeina (vesi-materiaali ilman
läpinäkyvyyttä/väriä tai järvitason muutos). Muodot vastaavat leikkauslaatikoita (Vesiportin bastioni, Kellobastioni, ponttonisilta,
v46t:n Paksu bastioni). Varmista ensin: (a) ovatko laikut leikkauslaatikoiden kohdalla (ranta1499.json `leikkaukset`), (b) miltä
v46q näyttää samassa käännöksessä 308f4b02 (Siirtoseppä). Korjausvaihtoehdot: laske quadit −7,3:een, tai poista ne (niiden syy oli
"mustat aukot historiassa" 9.10. – historia-animaatio tarvitsee pohjan) ja anna ranta-1499:n kallion jatkua −7,6:een.
Kysy Siirtosepältä, renderöikö 175 `vesi`-pintaa omalla materiaalillaan.

**Vika 3 – valkoinen/lumimainen kallio koko saarella:** näkyy käännöksessä 308f4b02 sekä v46u:lla että v46v:llä; v46q
käännöksessä cd5e3a72 (todistus-v46q-0-20261010-0515) kallio oli tumma. Atlasmuutokseni koskivat vain 1,6–2,2 % tekseleistä
(seinät 5, 7–11 ja kaistat s12/14/16), joten koko saaren valkoisuus tulee todennäköisesti 175:n koodista/valaistuksesta
(esittely-1499 tai materiaali). Siirtoseppä tekee A/B:n (sama käännös, v46q vs v46v) ja ilmoittaa. Jos se on dataa:
vertaa `olavinlinna-ulkokuori-v25/ulkokuori-8k.jpg` ja `atlas-v46u/paiva-v46t-8k.jpg` kallioalueella.

Vienti kuten ennen: kokoa (atlas-v46u/kokoa_v46v.zsh -mallilla) → MUUTOKSET.md v46w → `zsh olavinlinna-kavely-v1/lahde/tyokalut-lr/vie46r.zsh`
(= `source ~/.zshrc; zsh /Users/Shared/Claude/wt/linnanrakentaja-linna-v45e/tools/dioraama/vie-blender.sh --lahde
/Users/Shared/Claude/proto-3d/_valmiit/olavinlinna-blender-v44`) → commit blender.json v45e:hen → `gh workflow run vie-dioraama.yml
--ref linnanrakentaja-linna-v45e -f rakennus=olavinlinna -f kuiva=false -f osoitin=false` → hash lokista → Siirtoseppä + PT.

## 2) Tukholman kaupungintalo (PT hyväksyi 06.2x)

PT:n ehdot (samat kuin Eiffel): toistuvat osat yhtenä meshinä per LOD jaetulla materiaalilla, lod0 ≤ 250 k, lod1 ≤ 80–100 k, GPU
mitattuna, portti 0, kolmiot Natiivisepän kanssa ennen peliä; yövalo: kerro LS1:lle, kun malli on pelissä (julkisivuvalo omaan
malliin); pelikuvapari pysähdyksestä 15 PT:lle; omistajan kortti ennen osoitinta.
- Pohjamalli v1 valmis: `_valmiit/stadshuset-v1` (lahde/hae.py, osat.py, stadshuset.py, stadshuset_kuva.py, LAHTEET.md,
  leikkaus_latlon.json, glb/ lod0 6,8 k / lod1 4,3 k / lod2 1,3 k, portti 0).
- Karttaseppä teki ohjauskuvat (`_tyo/karttaseppa/ohje-riddarholmen/codex-ohje-sh`, kopio `stadshuset-v1/codex-ohje`;
  tornin näkymän nimi **spiira**) ja LR antoi OK:n GPU-ajoon (~06.3x). Odota rivi Karttaseppältä (tulokset/sh_<näkymä>_v1.png).
- Sitten: `rsync` codex-ohje uudelleen jos Karttaseppä päivitti → `zsh kaupunkipinnat-v1/lahde/tekoaly_koko.zsh sh v1 -
  pelkka-kohdistus` → `zsh stadshuset-v1/aja_tekseli_v1.zsh` (kalibrointi_v1.json: tiili 150/80/62, kupari/kulta/kivi
  valoisuustilassa) → tarkistus `stadshuset_kuva.py` → LS2 (pelikuvapari) + Natiiviseppä (kolmiot). projisoi_tekseli.py tukee
  mallia `sh` (yhdistää yhdeksi meshiksi + atlas).

## 3) Muut avoimet

- **Eiffel v1** (`_valmiit/eiffel-v1`): Natiiviseppä kuittasi (~18 Mt, COLOR_0 tuettu), LS2 tekee testipaketin ja
  ennen/jälkeen-parin pysähdyksestä 14 (kamera tornista ~879 m suuntaan 67°, kallistus 64°). Väri arvio 106/86/70 → 128/106/86;
  säädä LS2:n mittauksen mukaan (`lahde/eiffel.py` RUSKEA0/1) ja aja portti.
- **ND v3d** (parvis 168/160/150, `notre-dame-v1/tekoaly-v3d`): LS2:lla pariin; EI vientiä ennen omistajan kyllä-vastausta.
  ND v3c pelissä OK, omistajalle aamulla v3b/v3c.
- **pp v1, Riddarholmen v3b, co v2**: LS2:n pelikuvat PT:lle (~05.2x jono).
- **Kalliorannan mattaus** (PT): odottaa vian 3 selvitystä; seuraavat heikot kalliot `olavinlinna-kavely-v1/lahde/tyokalut-lr/ranking_kallio.py` (
  kuvattu yö-luovutuksessa).
- Kappalaisen tartu.paikka kirjan reunaan (pieni, jonossa vanhasta luovutuksesta).
