# Valosepän luovutus 6.11.2026 klo 12.08

Korvaa luovutuksen -1153 räystäs- ja usvakohdat sekä SEURAAVAKSI-kohdan. Muuten -1153 pätee, samoin -1105:n PALETIN REITTI ja -1048:n SILLAT. Syy: konteksti 30 %, kova raja 35 % (7.37), ja työ odottaa JU:ta ja KS:ää.

## 1. PT:N KÄSKY, AUKI: RÄYSTÄÄN POIS-KUVA
`a309d43de` (`linssiseppa2/raystas-runko`, liuku 0,25) EI ole kuitattu junaan. PT katsoi kuvat6:n: halli on kunnossa, mutta marmorin laikun oikea reuna erottuu.
Pyyntö JU:lla 11.5x, jonossa, kuittausta ei näkynyt: `zsh proto-3d/_tyo/linssiseppa2/raystas/aja-raystas7.zsh <linja> a309d43de`. Lista `sk-raystas7.txt`, kuva `kuvat7/rs-raystaaton-pois.png`, sama kamera ja reitti, ainoa ero `raystasliuku 0`. Lista on ajamatta. Jos JU ei ilmoita, tarkista `kuvat7/` ja kysy JU:lta.
Kun kuva tulee: `python3 proto-3d/_tyo/linssiseppa2/raystas/vertaa7.py` (suhdeluvut, pari `rajaukset7/pari-laikku-on-pois.png`; skripti on ajamatta). Katso pari täysikoossa. Tulos PT:lle:
- Laikku myös pois-kuvassa: ei tule liu'usta, PT kuittaa junaan.
- Laikku katoaa: liuku korjataan räystäättömillä seinillä ennen kuittausta.
Mitattu kuvat6:sta, näyttö 2000 × 1500: laikku x 940–1480, rivit 905–990, L 153–158, viereinen 183–187 (0,85). Ei on/pois-suhdetta vielä.
Liitä samaan viestiin PT:n kysymä pallo: kerättävä herkkuomena, päätelty koodista (`JuoksuV4Maailma.cs` 3236, hehku vain kerättävillä, kulta-hehku), rajaus `raystas/rajaukset6/r-pallo-4x.png`. Oranssia sirppiä pallon vasemmalla puolella en selittänyt. PT:lle ei ole vielä kerrottu palloa.
Tulokset `raystas/TULOS-raystas3.md` lopussa.

PT: Qianqinggongin räystäsnauhaa ei tutkita tässä. Kirjaus: kartassa nauha vain etelässä, pohjoisseinän kohdalla (x −13 ja 3, z 322–345) alapinta 0. Syy auki.
Hallin ovissa vinoja kolmio-osia (mallijuuri aukot8), syy auki; PT tietää.

## 2. USVA: KORJAUS AJOON 12
KS ajo 10 (`lokit/karttaseppa-yhteinen-10-b8-61a6f5321`, parit `_tyo/karttaseppa/parit-yhteinen-10`): mallit, pohja ja puut häipyvät yhdessä, leijumista KS ei nähnyt. VIKA: us-eiffel-75:ssä torni yhtenäinen haamu taivasta vasten, 85b:ssä kalpea hahmo. En katsonut muita pareja itse, vain Eiffelin rajauksen; -1123:n kohdat 3–7 yhä tekemättä omin silmin. Parit KK:lle vain, kun Eiffel on kunnossa.
Syy mitattu: y 300 torni (231,224,195), taivas (214,217,208). Karttataivas on jonossa 3050, Kirkko 3080, joten malli ei sinerry. Jonoa ei voi laskea: malli jäisi piirroksen ja nimien alle.
Korjaus `a93ed64b0` (`linssiseppa2/usva`, natiivi-backup, 61a6f5321:n päällä), ajamatta, ei junaan: Karttataivas.cs antaa globaalit, NotreDameKirkko lerppaa usvan värin samaan liukuväriin. OhjelmaKohde on jonossa 2994, jo taivaan alla. Kartta-testit 668/668 eivät kata tätä. Väriavaruutta (SetGlobalColor vs SetColor) en ole todentanut; näkyy kuvasta.
KS:llä ajoon 12. Kun kansio tulee: us-eiffel-75 ja -85b, rivit y 600 ja 400, ero yli 3 (ajo 10: 58 ja 25 px). Alaosa ja 85b:n hahmo voivat jäädä, koska korjaus koskee vain väriä. Jos jäävät, ehdotus (ei tehty, luku kuvasta): mallin usva nousee korkeuden mukana tai loppuu ennen karttaa.

## 3. POMPIDOU: AJOON 12
`9fea47165` (`linssiseppa2/pompidou-muoto`, natiivi-backup, pohja 61a6f5321), ei junaan, Unityssä kääntämättä. Geometriatestit 19/19. Tiedot `_tyo/linssiseppa2/ohjelmakohteet/TULOS-pompidou-9fea47165.md`, esikatselu `rak-po/`, ajo `aja-pompidou.sh`.
KS ottaa ajoon 12 kuvineen `po-la`, `po-ita` (suunta 265 laskettu); ajon 11 `po-la` on vertailu ilman muotoja. Katso täysikoossa. Ei omistajalle ennen kuin nähty pelissä. Riski: X-jäykisteet pois, polvet hevosenkenkinä.
k30-worktree on nyt haaralla `linssiseppa2/usva` a93ed64b0.

## SEURAAVAKSI
1. Kohta 1, heti kun kuva on. 2. Ajo 12: Eiffel ja Pompidou. 3. Siltakuvat ja palettikuvat -1105:n mukaan, kun KS ilmoittaa.

## MUUTA
Lippu (-1153) KK:lla, sana odottaa. LAV:n friisikysymys edelleen lähettämättä seuraajalle (-1153, MUUTA): vastaus on -1153:ssa.
KS:n Y sisältää nyt usvan 61a6f5321:n; KS tietää molemmat uudet sha:t.
Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut.
