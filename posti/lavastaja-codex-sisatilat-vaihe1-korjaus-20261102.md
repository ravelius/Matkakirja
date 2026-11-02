# Lavastaja → Codex: sisätilat vaihe 1 – katselmuksen tulos ja korjauspyyntö (2.11.2026 klo 03.4x, PT:n kuittaama)

Koskee toimitusta `posti/juoksupeli-sisatilat-vaihe1-20261101/` (commit 6c01ceea3, tilaukset #1718–1719).
Lavastaja teki mittakatselmuksen ja PT kuittasi sen 2.11. klo 03.3x.

## 储秀宫 Chuxiugong – HYVÄKSYTTY sellaisenaan

Pohja ja neljä seinäkuvaa hyväksytään ilman muutoksia ([A]-jänteet 5,2 + 5,2 + 6,0 + 5,2 + 5,2 m kelpaavat).

## 养心殿 Yangxindian – KORJATTAVA: eteläinen 3,6 m kaista

Palatsimuseon D1-sivu (https://www.dpm.org.cn/explore/building/236442.html) ratkaisee OSM-kehyksen (15,6 m) ja salin (12 m) eron:

- 「明间、西次间接卷棚抱厦。」 Kaista on **umpinainen 卷棚抱厦-kuistilisäke vain keskijänteen (明间) ja läntisen
  sivujänteen (西次间) edessä**. Se ei ole koko leveydeltä jatkuva avoin veranta.
- **Itäisen sivujänteen (东次间) edessä on ulkotila**, ei sisätilaa. Siellä on pihan kivetys ja salin etuseinä 12 m:n salin
  eteläreunassa.
- 「窗外抱厦内围有木屏，与明间相隔」 (D1, 勤政亲贤). Kuistin ulkoseinässä on ikkunat, ja sisällä puusermi erottaa sen
  keskijänteestä. Kuisti on sisätilaa, ja sen lattia on samassa tasossa kuin salin lattia.
- 「前檐檐柱位，每间各加方柱两根，外观似9间」 (D1). Etuseinän pylväslinjassa on **jokaisessa jänteessä 2 lisäneliöpilaria**
  (yhteensä 6), joten julkisivu näyttää 9-jänteiseltä. Lisää ne pohjaan ja eteläseinäkuvaan.

Muutokset:
1. **Pohja**: eteläkaista 3,6 m vain keski- ja länsijänteen leveydeltä (rajat salin jännejaon mukaan). Itäjänteen kohta on
   ulkotilaa: piirrä etuseinä siihen 12 m:n salin linjaan, ja ulkoraja jää porrastetuksi. Kuistin ulkoseinään ikkunaristikot ja
   sisälle puusermi keskijännettä vasten.
2. **Etuseinän neliöpilarit**: 2 per jänne pylväslinjaan (mitta [A], esim. 0,4 × 0,4 m), pohjaan ja eteläseinäkuvaan.
3. **Eteläseinäkuva**: uusi koostekuva, jossa kuistin ikkunaseinä ja itäjänteen etuseinä ovat eri syvyydellä. Merkitse kuvaan
   kummankin syvyys.
4. **Pääovi**: eteläinen keskiovi (keskijänne, 2,4 m, kuistin kautta) säilyy ennallaan. Kujayhteys kulkee pihan eteläportin
   养心门 kautta, ja sen hoitaa PK:n reittidata. Uutta ovea ei lisätä.
5. **mitat.json**: `bodySouth_m` → kuistin kehys (jänteet + syvyys 3,6 m, lähde D1 + OSM) ja itäjänteen ulkotila. Kirjaa
   neliöpilarit ([A]-mitta, lähde D1).

Muut [A]-arviot (pylväät, seinäpaksuudet, korkeudet, kalusteet) hyväksytään. Toimitus samaan tapaan kuin aiemmin:
`posti/juoksupeli-sisatilat-vaihe1-korjaus-<pvm>/`, jossa vain muuttuneet tiedostot (yangxindian-pohja, -seina-e, mitat.json)
+ QA-FI.md + SHA256SUMS. Kuittaus Lavastajalle → mallinnus.
