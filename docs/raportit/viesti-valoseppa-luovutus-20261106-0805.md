# Valosepän luovutus 6.11.2026 klo 08.05

Korvaa luovutuksen -0730 kohdat TILA, SEURAAVAKSI, AJO ja PT:N LISÄYKSET. Muut pätevät: -0730 SAINT-EUSTACHE, SAINT-SULPICE, POMPIDOU, ESIKATSELU, MUUTA; -0716 SILLAT, MITAT; -0702 TASAINEN KARTTA ja POMPIDOU-luku; -0135 SUOJATARKISTUS; -0115 maa ja mittarit (paitsi helma). Syy: konteksti pehmeällä rajalla (Raamattu 7.37).
Aloitusvuorolla luin periaatteet, 7.4, 7.23–7.25, 9.1–9.3, 9.5 kokonaan tai alusta; luvuista 6 ja 12 vain alut, luvusta 2 linssirivit ja 2.213. Lue lukulista 7.47 taas aloittaessa.

## TILA
Koodi 19e11d90d, haara `linssiseppa2/ohjelmakohteet`. Nimien kanssa ff96043a7, haara `linssiseppa2/ohjelmakohteet-nimet`. Molemmat natiivi-backupissa, worktree /Users/Shared/Claude/wt/proto-linssiseppa2-k30, haarana `linssiseppa2/ohjelmakohteet`. Ei junaan. Testit 17/17.
Jokainen muutos on yhdistettävä nimihaaraan; viimeisin yhdistyi ilman ristiriitaa.
D = /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet.

## AJO 127346f24 KATSOTTU (08.0x)
Kuvat `proto-3d/lokit/karttaseppa-yhteinen-2-127346f24` (exit 0, 18 kuvaa, JU). Tiedosto `karttaseppa/sk-pariisi-yhteinen-2.txt`, KS:n kokoama, sisältää minun 11 kuvaani ja palat-v3:n. Tulos KK:lla 08.0x. Parit `D/kuvat/yhteinen2-127346f24/`: pari-pompidou, pari-pont-royal, pari-concorde, hdv-katto-ennen-jalkeen; rajausskripti ei ole tallessa (scratchpad), rajaukset ovat 2752 px:n kuvasta.
Katsoin täysikoossa tai rajauksina: p-roy, p-con, se-et, ss-la, pb-etu, m-etu, p-pn-oik, tsj-et, hdv-110, po-la, keski-ylhaalta-hdv. EN katsonut KS:n, NS:n ja NUI:n kuvia heidän kohdistaan.
MITATTU: Hôtel de Villen katto 82,81,80 (ennen 78,84,96; kuva keski-ylhaalta-hdv, tumma alue, x 1570–1670, y 990–1090). Valokuva hdv-1-0: lappeet 108,108,112, siivet 104,104,104.
Loki: yksi `POIKKEUS ArgumentOutOfRangeException` 07.50.09 ui sulje -kohdassa; sama määrä myös ajossa 579ea327c. Syy selvittämättä, ei tutkittu.

## KUNNOSSA (silmämääräisesti)
- Hôtel de Ville: katto harmaa, ei sininen Louvren rinnalla (KK 07.42). Valkoiset pisteet reunalla näkyvät yhä kaukaa.
- Saint-Eustache: ruskea kaistale poissa etelästä.
- Saint-Sulpice: katto tumma, rakeet poissa. Portaat viistona (POIKKEAMA -0730).
- Madeleine, Palais Bourbon, Pont Neuf, Tour Saint-Jacques: seisovat maassa ilman helmaa, rakoa ei näy.

## SEURAAVAKSI (oma suositus KK:lle 08.0x; KK ei ollut vastannut tätä kirjoittaessa, joten lue KK:n viesti ensin)
Ajoon vasta kaikki yhdessä, yhteisellä ajolla JU:n ja KS:n kautta. Ei omaa ajoa. Omistajalle vasta korjatusta.
1. Sillat (`OhjelmaKohdeSillat.cs`, älä aja `a/tee-sillat-cs.py`): Pont Royalin ja Concorden pilarit ovat pieniä vaaleita tappeja; oikeat ovat massiivisia ja samaa kiveä kuin seinä, Concordella pyöreät, Pont Royalilla suippohattuiset (kuvat Pont Royal-0, Concorde-6). Concorden kaaret näkyvät lähes yhtenäisenä tummana nauhana. Tumma katkoviiva pohjoisreunassa ja mustat pisteet kaarien laella pois; syytä EI ole selvitetty. Kuvaa uudelleen kulmasta, jossa nimi tai kyltti ei peitä: nyt Pont Royalin vasen pää on Louvre-kyltin alla ja Concorden kannella on nimi.
2. Pompidou (`OhjelmaKohdeGeometria.Pompidou()` tiedostossa OhjelmaKohdeRakennukset.cs): katto on yksi tasainen sininen levy, oikeassa valkoisia ja sinisiä kanavia ja isot valkoiset lieriöt itäpäässä (pompidou-0). Julkisivu on mustien nauhojen raidoitus, oikeassa vaalea ristikko ja lasi. Liukuportaat ovat ohut katkonainen viiva, oikeassa selvä punainen vino. X-jäykisteet puuttuvat. Kuvassa nimi on pallon alla (pallo on pelinappula). Kuva vain tasaisella kartalla ja taloilla (KK 07.36), kuten sk-pariisi-yhteinen-2:ssa.
3. Katot: Palais Bourbon näyttää nyt selvästi siniseltä Hôtel de Villen rinnalla; Saint-Eustache sinertävä. Ne käyttävät yhteistä `Liuske` 0x4C5566. Hôtel de Villen arvot `HvLiuske` 0x4F5155, `HvPelti` 0x5A5D60, `HvSinkki` 0x6F7376 toimivat, Rakentajan kenttä `Sauma` antaa sauman värin. Madeleinen ja Tour Saint-Jacquesin väriä ei ole mitattu; ne eivät käytä Liusketta.

## KK:N SITOUTUMAT, JOTKA SIIRTYVÄT
- Kerro kuvan mukana, onko Pompidoun laatikko paloissa: NS poisti sen palat-v3:sta, kuvassa ei laatikkoa; vanha `palat` ennallaan (pala 15_16598_11272, 00.32). Tämä on kerrottu KK:lle.
- Omistajalle menevä Pompidou-pari: oikea rakennus, ei pienoismalli (`pompidou-mini.jpg` ei), ja maininta, jos X-jäykisteet yhä puuttuvat.
- Mallia ei ole hyväksytty; hyväksyntä on omistajan.
- Omistajalle menevän kuvan mukana kerrottava Hôtel de Villen kirkkaudesta: en muuttanut sitä, koska valokuvan valotusta ei voi verrata peliin.

## MUUTA
sk-maa5.txt ei enää ajeta erikseen (JU); KS kokosi siitä oman tiedostonsa. Seuraavaa ajoa varten lähetä KS:lle ja JU:lle uusi sha ja kuvarivit.
Virhe tältä vuorolta: kirjoitin KK:lle ensin Madeleinen ja Tour Saint-Jacquesin käyttävän Liusketta tarkistamatta; korjattu samalla viestiketjulla. Pidä väitteet koodista grepin takana.
Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut. Työlistahookin rivit eivät ole Valosepän.
