# Natiivi-UI: luovutus 6.11.2026 klo 13.31 (pehmeä kontekstiraja, 7.37)

Korvaa -1306:n työlistan. -1306:n kohdat E, Havainnot ja Ei todennettu sekä -1150:n ja -1140:n avoimet ovat voimassa. Lukulista 7.47: lue itse.

## Lue ensin
1. proto-3d/lokit/nui-ui-d4bd6969b/tulos-nui.md
2. proto-3d/lokit/nui-ui-1af361f4c/tulos-nui.md (taulukko: vaihtelu on ajon tila)

## Tila
Worktree /Users/Shared/Claude/wt/proto-natiivi-ui-vesinimi, haara natiivi-ui/ui-sarja-219, kärki 87b01563a (peilissä natiivi-backup), ei muutoksia. Kääntämättä, ajamatta. Ei junaan ennen PT:n kuittausta. Ei omaa ajoa.
Ajo pyydetty JU:lta 13.30: yksi pysty, kuvat luento ja maakortti Ranska, lokit/nui-ui-87b01563a/pysty-keskitys-1.txt. JU lähettää polut tähän sessioon.
PT:lle lähetetty 13.30 tulos ja korjattu tulkinta; vastausta ei ole tullut.

## Kun ajo on valmis
1. Jos ei käänny (uudet rivit: SumennuksenSyy, sähkenäkymän sulku), korjaa ja pyydä uudelleen.
2. Lue `grep 'matala huippu' <loki>`: rivin lopussa "sumennus <taso>: <ehdot>". Katso kuvat täysikoossa.
3. Korjaa auki jäänyt tila sen näkymän sulussa testissä (AsetteluTesti.cs). Jos ehto on "ei ehtoa" ja kerros on silti sumea, suodin jää päälle UiNakymat.PaivitaKarttaUiSumennus:ssa: se olisi pelin vika, kerro PT:lle ennen korjausta.
4. Pysty x3 JU:lta. Vakaa pysty → tulos PT:lle 3 rivinä, täysi 15 varauksen sarja vasta sen jälkeen.
5. Jos radio jää teräväänkin 0 mitattu = VIKA, se on aito puute, kerro PT:lle (-1306). Rajaa 0,06 ei lasketa.

## Todistui
- Vaihtelu ei ole häivytystä: huippu ei nouse odotuksessa, ja arvot toistuvat täsmälleen ajosta toiseen. Oma aiempi tulkinta oli väärä.
- Kuvissa koko kartan UI-kerros 15 on sumea, mikään ei peitä (päällä 0, näkyvyys 1,00). Ohitan dy +0,67 on sumean musteen mitta.
- "0 mitattu" laskettiin vain uudelleenluvusta: palaute ja taidehalli olivat vääriä VIKOJA, korjaus todistui 3/3.
- Sähkeliuska oli testin jäänne (SuljeKaikki ei sulje sitä); korjattu 87b01563a:ssa. Se ei ole sumennuksen ehto.

## Ei todennettu
Mikä ehto sumentaa. Onko radion 0,09 puhtaissa ajoissa sumennusta. Palaute-kuva lukematta: Lähetä ehdotus [37,804 328×38] muste 0,00, vaikka näkyvyys 1,00 ja tausta D9A13B. Ohita on y 116 yhdessä ajossa ja y 241 kahdessa (JU), syy katsomatta.

## Odottaa, aloittamatta
Tappien lasku vaakapuhelimelle kokeena omaan committiin, kun UI-sarjan pysty on vakaa (-1306, PT 13.1x): OpasValikko.cs:1836, tavoite tappi y noin 287-351; oikean tilan ajo vasta PT:n vuorolla Pariisin ja juoksupelin jälkeen; kuva KK:lle; kortti vain, jos vipua pitäisi siirtää.
