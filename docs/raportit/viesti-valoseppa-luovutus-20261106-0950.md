# Valosepän luovutus 6.11.2026 klo 09.50

Korvaa luovutuksen -0918 kohdat ODOTTAA ja SEURAAVAKSI; muut -0918:n kohdat pätevät (Concorde 3203aa555 kääntämättä). Syy: konteksti 25 %, pehmeä raja (Raamattu 7.37).
Luin aloituksessa periaatteet, luvun 6 ja kohdat 7.4, 7.23, 7.25, 9.1–9.3. Osin: 7.24, 7.37, 7.47, 9.5, 12.9; luvusta 12 muuten alut, luvusta 2 vain linssien otsikot. Lue lukulista 7.47 itse.

## UUSI TYÖ (PT 09.3x, sanatarkasti)
"räystäsliuku (JuoksuRaystasLiukuK, räystäskartta 0,5 m:n solu, sinun db48220d1) tekee kovan tumman suorakaiteen seinään katon alle. LAV: `valo raystasliuku 0` poistaa sen kolmella kameralla. PT katsoi parin: proto-3d/_tyo/linnanrakentaja/muuri/aukot/rajat8/r-k--151.png; myös r-k--188p5.png, r--155.png. Korjaa syy, älä sammuta oletusta: räystään alusvarjo saa jäädä, mutta ei kovaa reunaa väärään soluun; myös naapuriseinät (LAV). Selvitä, koskeeko muualla. Ei junaan, Macin ajo JU:n vuorolla, ei iPadia. Concorden jälkeen, ennen juoksupelin vientiä; sha PT:lle ja LAV:lle."

## TILA
Koodi: natiivi-backup `linssiseppa2/raystas-pehmea` 9b9ff0036 (35140432d:n päällä, LAV:n aukot8r:n sha). Vain `JuoksuValo.hlsl`. Valovahti ok. KÄÄNTÄMÄTTÄ, EI NÄHTY. Sha ei vielä PT:lle eikä LAV:lle: vasta kuvien jälkeen (9.5).
Ajo pyydetty JU:lta 09.50: `raystas/aja-raystas2.zsh <linja> 9b9ff0036`, tulos `proto-3d/_tyo/linssiseppa2/raystas/kuvat2`, 8 kuvaa. JU ilmoittaa Valosepälle.
Työkansio: `proto-3d/_tyo/linssiseppa2/raystas/`. Vianhakuajo `kuvat1` (9 kuvaa voimat 1, 2, 3; kartta-151 ja kartta-188 lähteineen). Kartan ote: skripti kartta_ote.py oli scratchpadissa eikä jää; kaava: PIL, px[i, 767-k], R·0,4 = alin alapinta, A·0,4 = alin katto (255 = ei), G<<8|B = lähde.

## SYY
TODENNETTU `r--155`:lla (kuvat1/v2--155.png + kartta): voima 2 näyttää keskellä tyhjän solun (0,1) ja sivuilla kerroksen; räystään ulkoreuna kulkee kartassa porrasta: sarake 390 riveillä 470–472, 391 riveillä 473–490, 392 riveillä 491–509. Näyte 0,45 m osuu lähes reunalle, joten räystäs on solussa vain osalla matkaa.
PÄÄTELTY, EI TODENNETTU: porras ja näytteen porras johtuvat seinän pienestä vinoudesta ruudukkoon (kamerat yaw 89/−91 viittaavat 1°:een; portaan jakso 18 riviä viittaa enemmän; ei mitattu). Oikean suikaleen rivit (px 1600–1950) täsmäsivät laskelmassani huonosti sarakkeeseen, ±2 riviä, en selvittänyt.
`k--151`: EI SELVITETTY LOPPUUN. Suorakaide on rivit 445–446 (laskettu, etäisyys arvioitu 2,2 m kuvasta). Yläreuna ja viereinen lyhyempi varjo vaativat solun ylempiä kerroksia, joita kuva ei näytä (vain alin alapinta ja alin katto). Tätä kohtaa vastaan korjaus on oletus, ei todiste. `k--188p5`: taulukko katsottu, ei kuvia eikä päätelmää.
"Koskeeko muualla": kartan perusteella koskee kaikkia seiniä, joissa räystään uloke on noin 0,45 m (0,1–0,8). Tämä on päättely; `muurikate` on tarkoituksella rajan alapuolella. Lisäkamerat eivät ole seulonta.

## KORJAUS
1. `JuoksuRaystasLiukuK`: neljä solua bilineaarisesti (ennen yksi).
2. `JuoksuRaystasSolu`: tummin kerros, paino nousee pehmeästi: alapinta y − 0,3 → y; katto y + 0,3 → y + 0,8. Vanha rajaus kynnys oli kova.
3. Vianhaku (voima 2 ja 3) yhä yhdestä solusta, omassa haarassa.
Oletusarvot ennallaan (voima 1, alku 0,5, pituus 3,5, ulos 0,45). Numerot 0,5 ja bilineaarisuus ovat omiani, ei kokeiltu.

## RISKIT, KATSO KUVISTA
- Portaan rajoilla voi jäädä pehmeä, noin 0,5 m:n kaista. Jos näkyy pilareina, levennä sekoitusta seinän suunnassa.
- Korkean hallin julkisivun ylin osa voi vaaleta (katon paino 0,3–0,8 m), PT:n b5-tavoite ylin 1/4 ≈ 0,65. Ei tarkistettu.
- Viisi tekstuurinäytettä → neljä, mutta ennen yksi: pikselikustannus nelinkertainen seinillä. EI MITATTU. PT:lle tieto.
- `sk-raystas2`:n lisäkamerat (x −162,4; z 245 ja 300) ovat arvauksia, voivat osua sisään. `kuvat2`-kansiossa ei ole voimia 2 ja 3.
- `r-*-pois` samasta ajosta: `valo raystasliuku 0` jättää kartan, kuten LAV:lla.

## ODOTTAA
1. JU: raystas2. 2. KS:n seuraava yhteinen ajo Concordelle: JU 09.3x: c0bfef077 valmistui 09.15 ilman Concordea, eikä seuraavaa yhteistä ole jonossa. PT:n "ei omaa ajoa" pätee, en pyytänyt omaa. Ei kerrottu PT:lle erikseen: kerro, jos jää pitkäksi.

## SEURAAVAKSI
1. Kun kuvat2 tulee: täysikokoisina `r-k--151-on`, `r-k--188p5-on`, `r--155-on` ja `-pois`-parit, lisäkamerat. Tarkista omistajan/PT:n sanoja vasten: ei kovaa reunaa, alusvarjo jää, naapuriseinät. Korjaa ja aja uudelleen tarvittaessa. Sitten sha + kuvien polku PT:lle ja LAV:lle.
2. Concorde -0918:n kohdan 1 mukaan, kun KS ilmoittaa kansion.
3. Sillat ja Pompidou -0903:n kohtien 2 ja 3 mukaan (järjestys sillat ennen Pompidouta KK:lta). PT: räystäsliuku Concorden jälkeen ja ennen juoksupelin vientiä; siltojen paikkaa räystäsliu'un suhteen PT ei sanonut, oletin räystäsliu'un ensin.

## MUUTA
Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut. Worktree proto-linssiseppa2-k17 on nyt haarassa raystas-pehmea (oli pariisi-tyyli, joka on tallella).
zsh: `$B:A` osuu muuttujan muuntimeen; kirjoita `${B}:Assets/...`.
