# Valosepän luovutus 6.11.2026 klo 17.36, täydentää -1556:n (lue se myös), korvaa sen kohdat 1 ja 3

Syy: konteksti 30 %, uusi iso tehtävä tuli pehmeän rajan yli (aloitusviesti: nollaus ensin). Ajoja ei ole käynnissä minulta.
LUKEMATTA Raamatusta edelleen: luvun 2 linssikohdat, luvun 7 ROOLIT ja viestit, 10.3 eteenpäin. Lue, ennen kuin aloitat kohdan 1.
zsh: `$C:refs` tulkitaan muuntimena, käytä `"${C}:refs/..."`. Python, jossa PIL: `/opt/homebrew/bin/python3`. Ei `=====`-merkkijonoa komennoissa.

## 1. UUSI TEHTÄVÄ: PIENET KOVAT VARJOT NÄHTÄVYYKSILLE (ALOITTAMATTA)
PT välitti: OMISTAJAN PÄÄTÖS klo 17.32: "nähtävyyksille pitää tehdä pienet kovat varjot jotta istuvat paremmin karttaan. toki osassa lähiympäristö vaatii myös korjaamista."
KK:n tavoite: seisoo kartalla kuin painetussa kuvakartassa: pieni terävärajainen varjo maassa samaan suuntaan kaikilla, väri kartan paletista, ei sumeaa läikkää. Korvaa 4.11. suunnitelman pehmeän varjon (loki PR 6372).
PT:n rajaus: kokeena, ei junaan. Rakenna nykyisen muodon mukaisen varjon pohjalta, jos sellainen on jo koodissa. EI reaaliaikaista varjopassia eikä varjovalintaa kallistettuna (kaatui iPadilla 4.11.). iPadin hinta arvioituna tulokseen. Kuvat KS:n yhteisessä ajossa, ei omaa ajoa.
Kuva KK:lle: kaikki kohteet samasta kuvakulmasta, ja lähiympäristön viat kohteittain omalla listallaan; niitä ET korjaa ennen KK:n sanaa. Tulos PT:lle: sha, polku, arvio.
Lähtökohdat, lukematta tarkemmin (`Assets/Matkakirja/Kartta/Nahtavyysalue.cs`, rivit c86660d78:ssa): `VarjoJono` 2994 :232, `VarjoYlhaalta` :234, `PuuVarjoSade` :242, `Malli.VarjoKerroin` :30 ja `Malli.Varjo` :42, `VarjoUsvaRaja` 0,6 :727 ja :765, koon asetus :796–:803, `AsetaMallinVarjo` :812, puiden varjot `PehmeaVarjoVerkko` ja `SarjaVarjoMateriaali` (LuoPuut), `Maamerkit.LisaaMaaVarjo` (rivin 4 kommentti), mallin ääripisteet `Aaripisteet` :393. Selvitä ensin, tuottaako jokin näistä mallin muotoisen varjon; "nykyisen muodon mukaista" en varmistanut. Kaikki varjot samaan suuntaan -vaatimus on tarkistettava kääntyvän mallin (`Suunta`) ja kameran kanssa.

## 2. LOUVRE: KOE TEHTY, AJOA ODOTTAA
`db0a42148` (natiivi-backup `linssiseppa2/usva-jalka`, a027be140:n päällä, puu `/Users/Shared/Claude/wt/proto-linssiseppa2-k30`), EI junaan, kääntämättä, tulos näkemättä. Muutos vain `NotreDameKirkkoYhteinen.hlsl`: `o.sumu` jalan syvyydestä (object y = 0) ja kynnykset 0,12–0,30 (sama kuin a9a0bfd89).
Pivotti tarkistettu: Louvre, puut 1–4 y-alku 0 GLB-otsikoista (`scratchpad`-skripti ei säily, helppo tehdä uudelleen); pyramidit koodista pohja y = 2. Sacré-Cœurin mäki −25 ja portaat −16 ulottuvat nollan alle, ei este.
Sha KS:lle 17.30 (d2fea94e, jonossa): seuraava yhteinen ajo, kuvat po2-ita, us-eiffel-85b, usvamitta, Notre-Dame lähellä. Jos ajo 26 oli jo tilattu, sitä seuraava.
Ajon jälkeen tulos PT:lle: sha, kuvien polku, arvio. Mittari: Louvre samassa usvassa kuin talot, ei leijumista; Notre-Damen yläosan vaaleneminen ja Eiffel 85b arvioidaan samalla. Vertailupohjat: Louvre `lokit/karttaseppa-yhteinen-20-b8-c86660d78/po2-ita.png`, Eiffel `lokit/karttaseppa-yhteinen-17-b8-1c376ecc5/us-eiffel-85b.png`. Parin ja mittauksen tekijät `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet/kuvat/yhteinen20-c86660d78/` (`tee-pari.py`, `tee-pari-eiffel.py`, `mittaa_usva.py`). Omistajalle vasta, kun leijuminen on poissa. KirkkoJono ennallaan.
Riski ennalta: korkea rakennus jää jalkansa tasoisena hahmona taivasta vasten, vaikka ei leiju.

## 3. POMPIDOU: HYVÄKSYTTY, EI TOIMIA
Omistaja 16.08 (KK): siksak riittää. 9e84124d4 (`linssiseppa2/pompidou-varit`). X-ristikot, matalat kanavat ja suorat putket eivät ole korjauspyyntöjä. Junaan vain PT:n erillisellä vuorolla.

## 4. MUUT
Tummuus suljettu (PT: tarkoituksellinen, väriparit samassa vuorokaudenajassa). Työpuu k30 on nyt haarassa `linssiseppa2/usva-jalka`, k17 haarassa `linssiseppa2/raystas-jalusta`; varjoille oma haara `linssiseppa2/*`, ei usva-jalan päälle ilman syytä. Worktreitä enintään 3.
