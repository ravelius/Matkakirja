# Julkaisija: luovutus 8.11.2026 klo 00.03 (korvaa -20261107-2243:n; sen ja -2124/-2040/-1803/-1700/-1628:n OPIT, SÄÄNNÖT ja YÖN SÄÄNNÖT voimassa: git show 5d438a934:docs/raportit/viesti-julkaisija-luovutus-20261107-2243.md)

Rooli: JU. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, jonoloki T/jono-20261103-ilta.txt.

## ALOITA: Monitor jonolokiin (tail -n 0 -F, grep 'AJO |VIKA|runko takaisin|ALKOI|SEIS|JONOSSA|PERUTTU|KORJAUS|vahtikytkin|skripti loppui|sarja loppui', 30 min), sitten ps alla olevista pid:eistä ja tail jonolokista: mitä jäi kuittaamatta. Kaikki nohupilla.

## 1. Juna 221 (TF VAIN OMISTAJAN SANALLA; omistaja 23.37 "Ei vielä")
juna 221 = 6e7981306 (natiivi-backup julkaisija/juna-221; worktree /Users/Shared/Claude/wt/julkaisija-juna-221): 34f96f97b + 3bfd18d9a (Lontoon talopalat sisäiseltä levyltä _tyo/julkaisija/lontoo-talot/palat-d10-kumpu, 243/243 sha OK, + talopalat/*.valmis-merkit) + 53dca9148 (VS saapuminen ei loitonna, PT 23.5x). unity-tarkistus 0 virhettä (sh). Asemataululla 2 riviä.
Syy: TF 220:stä puuttuivat Lontoon talot JA juoksupelin ulkoesineet (_tyo/karttaseppa = linkki T7:lle, runner EPERM; PostProcessBuildin poikkeus vain lokiin). Laitekäännös 3bfd18d9a todisti: lontoo 243, pariisi 220, ulkoesineet 4/4.
TF-työnkulku: jälkitarkistus talopalat pariisi/lontoo + ulkoesineet 4/4, PR 6493 yhdistetty 4f487a2dc (main).
ODOTTAA PT:N SANAA liitettäväksi: PK 22dc4c06b (otsikot + keisarin lähtö, KK:n kortti), PK 61f63adb9 (juoksupelin lataus, iPad-mittaus ensin). Liitä vain PT:n sanalla (cherry-pick -x worktreessa, unity-tarkistus sh, push HEAD:refs/heads/julkaisija/juna-221, juna.py lisaa --juna 221 ≤ 110 merkkiä).
Juna 220 AVOIN edelleen: iPhone-tarkistus junalla tekemättä (ks. -2243).

## 2. iPad-jono (lukko /tmp/matkakirja-ipad.lukko järjestää)
- YO-JONO pid 72046: ASTC 581b9ad07 ajossa 23.31 alkaen (~52 min, ~00.25), loki T/ns-yksi-ASTC/ajo.log → kuittaus NS:lle AJETTU/VALMIS-rivit.
- PK latauspari pid 85593 (T/pk-lataus-jono.zsh → T/pk-lataus-ipad.zsh): ennen 3bfd18d9a (lokit/pelikoodari-lataus-ennen-1), jälkeen 61f63adb9 (-jalkeen-1); vahti pois, muisti-tarkka päällä, 12 min. .appit valmiit. Kuittaus PK:lle: kansiot. Toinen pari (-2) vain jos aikaa ja PK haluaa.
- NS vaihe12-lisä pid 63055: 10604363c args 2 "v b", aikaraja 1800, loki T/ns-yksi-vaihe12lisa/ajo.log; YO-JONOn jälkeen. Kuittaus NS:lle AJETTU-riveillä.
- pid 9377 (ns-v-raja-perassa) poistuu itse (Vraja jo ajettu, lippu T/ns-vraja-ajettu).
Latauspari ja vaihe12-lisä kilpailevat lukosta ASTC:n jälkeen; kumpi tahansa ensin on ok.

## 3. Mac-jono (odottaa YO-JONOa 72046)
- NUI nimet-reuna 2c12b920a pid 72070 → ilmoitus NUI:lle (tallenne).
- NUI kohokartta-kytkin-1 b276782bd pid 16286 (nimet-reunan jälkeen), 5 kuvaa, varjostinmuutos: Shader-error kuittaukseen. lokit/nui-kohokartta-kytkin-1-b276782bd.
- KS lähialue-1 b73f9232d pid 72089: md5 ja kuvat nimeten KS:lle.

## 4. Kuitattu tällä vuorolla
NS taso1, vaihe12 (v1/b1 tilastoja 0/12, PUUTE hae → NS korjasi hae()), V raja (5/5), striimi-karkea 1–4. KS kohokartta-1 (31), -2 (afr-etela v2=v3), -3 (8/8). VS saapuminen-zoom 4 ajoa (16/16 eri), piirros-vesi (vk-on2 = vk-pois md5). PK esikatseluvuorot L1 (PK ajoi itse). PT: Lontoo-syy, juna 221.

## 5. ODOTTAA SANAA
.appit lokit/julkaisija-laite-218-*: kuten -2243 + 26423a0e4, 3bfd18d9a, 61f63adb9.
AAMU 8.11.: /Users/Shared/Claude/_levy/simu-yosiivous-20261108.log: ajo ja "iPad-välimuisti"-rivi → rivi PT:lle.

## OPIT
- T/ns-yksi-ajo.zsh välittää nyt lisäargumentit ("${@:5}") skriptille; ASTC-kutsussa koukku ajoi Vrajan ensin.
- T/ipad-skenaario-eikons.zsh: "oleta N ..." = odota N s (ilman konsolia ehtoa ei nähdä), merkki OLETA-ODOTUS. Ensimmäinen käyttö PK:n latauspari.
- sed-kopioinnissa älä korvaa "kohokartta-2" → "-3" globaalisti: kansio kohokartta-20261107 muuttui (kohokartta-3 kaatui 23.29). Tarkista polut grep:llä ennen käynnistystä.
- _tyo/karttaseppa, _tyo/linssiseppa2 ym. voivat olla T7-linkkejä: runner (TF) ei pääse niihin. Käännöksen lähteet aina sisäiselle levylle (ls -led).
- Mac-batch: AJO_KOKO voi olla esikatselu.sh-laitenimi (ipad, iphone, iphone-vaaka).

## Nollaus: tämä luovutus + "LUOVUTUS VALMIS <sha>" Postivahdille.
