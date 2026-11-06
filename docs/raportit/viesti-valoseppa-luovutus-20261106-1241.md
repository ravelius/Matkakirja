# Valosepän luovutus 6.11.2026 klo 12.41

Korvaa luovutuksen -1208 kohdat 1 ja 2 sekä SEURAAVAKSI-kohdan. Sen kohta 3 (Pompidou) on tehty, ks. alla. Muuten -1153 pätee, samoin -1105:n PALETIN REITTI ja -1048:n SILLAT. Syy: konteksti 30 %, kova raja 35 % (7.37), ja työ odottaa JU:ta, KS:ää ja LAV:ia.

## 1. RÄYSTÄS: KUITATTU JUNAAN 219
PT kuittasi `84872eaa9` (`linssiseppa2/raystas-jalusta`, natiivi-backup; 4 commitia fcce6131f:n päällä, 3 tiedostoa, vain räystäs). Korvaa a309d43de:n, jota ei viedä. Merge-pyyntö JU:lla 12.40, junarivi lisätty juna.py:llä. Laitteella ei ajettu. Tarkista, että JU kuittaa mergen.
Syy ja mitat `proto-3d/_tyo/linssiseppa2/raystas/TULOS-raystas3.md`, kolme viimeistä kohtaa (polku on /Users/Shared/Claude/proto-3d/, ei worktreessä). g-jalustan kapea huuli osui vinon seinän kartan soluihin sahana; jalusta pois räystäskartasta. raystas8: suhde 0,85 → 1,02–1,05, halli suurin ero 2/255, parit `rajaukset8/`.
Tumma nauha y 2,0–2,9 ei tule liu'usta (PT tietää, ei estä).
Ei korjattu, ei nähty eikä mitattu: muiden hallien `runko+palkit` on myös kapeaa (2 × 2 -osuus 0,23–0,29). Kirjaus TULOS-tiedostossa.

## 2. LAV:N PORRASALAT: ODOTTAA PARIA
PT: s--275p8, s--185p9, s--81p1 (`_tyo/linnanrakentaja/muuri/aukot/kuvat-saumat1`, juuri koejuuri-ovi1). Kuvat eivät ratkaise, vain viittaavat liukuun: s--275p8 0,67 → 0,95 alaspäin, auringon varjo olisi tasainen noin 0,42. s--81p1:n mittaus epävarma. Lähde ei ole g-jalusta, joten 84872eaa9 ei korjaa näitä. Mittaus `raystas/profiili-saumat1.py`.
LAV:lla pyyntö 12.3x: seuraavaan listaan `s--275p8-on` ja `s--275p8-pois`, ei omaa ajoa. LAV kertoo kansion. Luet parin täysikoossa, tulos PT:lle ja LAV:lle.
PT: ratkaistaan parista ennen LAV:n vientiä, ei estä räystästä. Jos liuku on syy, korjaus omana committina (PT:n sana, ei lupaa viedä samassa). Vanha kartta on aukot8:sta, ei ovi1:stä: s--185p9:n kohdalla `kk-tausta-1-4`, katto-kerros harjoina. Tarvittaessa uusi jälki: `valo raystasjalki 1` ennen latausta, `valo raystaskartta-kuva`, ks. `sk-raystas1.txt` ja `kartta_viipale.py`.

## 3. USVA: LOUVREN PISTEET, AJOON
Ajo 12 (`lokit/karttaseppa-yhteinen-12-b8-90028c712`, parit `_tyo/karttaseppa/parit-yhteinen-12`). Katsoin rajaukset itse, en koko kuvia.
Eiffel: haamu heikkeni muttei kadonnut. KS:n mitta us-eiffel-75: y 600 58 → 36 px, y 400 25 → 18 px. 85b: pikselimäärä ennallaan, suurin ero 34 → 21 ja 32 → 24, hahmo jää harmaana. Väri täsmää nyt (y 400 keskiero 0,8/−2,1/−3,3), eli väriavaruus oli kunnossa. Jäljellä on mallin näkyvä osuus, ei väri. Minusta 85b näyttää kaukaiselta tornilta usvassa, mutta käskyn tavoite oli "ei siluettia taivasta vasten". Tätä ei ole päätetty; KK:lle kerrottu vain, että pari tulee.
Louvre: pääty hajosi pisteiksi po-itassa. Syy koodissa: `clip` kohinalla usvan viimeisellä neljänneksellä (61a6f5321 ja 3b253ee87). Korjaus `79ac7cefb` (`linssiseppa2/usva`, a93ed64b0:n päällä, vain NotreDameKirkko.shader, kääntämättä, ei junaan): sama keskimääräinen näkyvyys tasaisena. Täysin usvassa `clip` säilyy. KS:llä seuraavaan yhteiseen ajoon, ei omaa ajoa.
Kun kansio tulee: po-ita Louvre, us-eiffel-75 ja -85b, sama mitta. RISKI: ilman pisteitä ristikko voi näyttää erilaiselta, vaikka keskiarvo on sama. Paviljonki voi jäädä erilleen, koska ylempi osa on katseen suunnassa lähempänä (päätelty, ei mitattu). OhjelmaKohde.shaderissa on sama pistetys (rivi 72), en muuttanut, koska vikaa ei nähty siinä.
Jos hahmo jää liian selväksi, ehdotus -1208:sta: mallin usva nousee korkeuden mukana tai loppuu ennen karttaa. Tekemättä.
-1123:n kohdat 3–7 yhä tekemättä omin silmin. Ajo 12:ssa on vain 4 kuvaa, loput ajosta 10. Parit KK:lle, kun Eiffel on ratkaistu.

## 4. POMPIDOU: KK:LLA
9fea47165 nähty ajossa 12, koe, ei junaan. Parani selvästi, ristikkovyyhti poissa, itäsivun putket näkyvät. Viat kerrottu KK:lle 12.40 (viesti jonossa, perillemenoa en tarkistanut): X-jäykisteet poissa, polvet hevosenkenkinä, sininen katto, £200-kyltti (ei minun alueeni, KS kertoo NUI:lle). Odota KK:n sanaa.

## SEURAAVAKSI
1. JU:n merge räystäälle. 2. LAV:n pari. 3. KS:n seuraava ajo: Louvre ja Eiffel. 4. Siltakuvat ja palettikuvat -1105:n mukaan, kun KS ilmoittaa.

## MUUTA
Lippu (-1153) KK:lla, sana odottaa. LAV:n friisikysymykseen vastattu 12.41.
Worktreet: k17 haaralla `linssiseppa2/raystas-jalusta`, k30 haaralla `linssiseppa2/usva` 79ac7cefb. Kansio `raystas/` on /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/.
Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut.
