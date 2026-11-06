# Valosepän luovutus 6.11.2026 klo 10.34

Korvaa luovutuksen -1003 kohdat RÄYSTÄSLIUKU: TILA, ODOTTAA ja SEURAAVAKSI. Sen CONCORDE: TULOS ja MUUTA pätevät, samoin -0950:n SYY ja PT:n sanatarkka käsky. Syy: konteksti 26 %, pehmeä raja (Raamattu 7.37).
Luin aloituksessa periaatteet, kohdat 7.4, 7.23–7.25 ja 9.5 (pisimmät katkaistuina), 7.37:n alun, luvun 6 alut ja luvun 2 linssien rivien alut. En lukenut 9.1–9.3:a enkä luvun 12 komentosääntöjä. Lue lukulista 7.47 itse.

## RÄYSTÄSLIUKU: TILA
Koodi 35f849838 (natiivi-backup `linssiseppa2/raystas-pehmea`, b7, pushattu): oletus Ulos 0,45 → 0,25, `ValoKohteet.cs` rivi 306 ja kommentti. Muutokset: b774cfbca ja kommentin sulku 35f849838. EI AJETTU tällä oletuksella. Sha ei ole PT:llä eikä LAV:lla.
Kaikki tulokset: `proto-3d/_tyo/linssiseppa2/raystas/TULOS-raystas3.md` (LUE, lisäys lopussa). Kuvat `kuvat3`, `kuvat4`, suhteet `suhde3`, `suhde4`, parit `rajaukset3`, `rajaukset4`.

TODENNETTU mittaamalla:
- r--155: lohkon ero viereen 0,21 → 0,11 (0,45 → 0,25). Pienenee, EI HÄVIÄ. 0,7 hylätty: alusvarjo häviää.
- r-k--151: kiilan terävä yläreuna pehmenee, pehmeä laikku friisin yläpuolella jää.
- mk-a ja mk-b: 0,25 ei tuo uutta aluetta. Ainoa uusi mk-b:n vasen korkea seinä 0,96–0,98. Täysikoossa katsottu vain mk-b.

TODENNETTU kartasta, sijainti laskettu: lohko = sarake 390 riveillä 470–472, sopii kuvaan noin 40 px:n tarkkuudella. Se on sama porras, ei eri rakenne. Sahajakson selitys on päätelty.

## AUKI, KERRO PT:LLE
- Molemmat muurikameran seinät tummenevat jo arvolla 0,45 (0,69–0,74). 1.11.:n peruste "muurikate ei tummenna" ei päde niillä. Syy auki: uloke voi olla oletettua pitempi, tai 9b9ff0036:n neljä solua teki tämän. Vertailukuvaa ennen 9b9ff0036:ta ei ole.
- Aidosti räystäätöntä seinää EI testattu, joten 0,25:n riski omasta katosta on yhä mittaamatta.
- Pystyviiva r--155 x≈236: syy tutkimatta.
- Pikselikustannus (neljä solua) mittaamatta.
- Pehmeä saha jää (mk-b, r--155).
- b8-runkoa EN yhdistänyt: kaikki räystäskuvat ovat b7:ää, ja halusin raystas5:n vertailukelpoiseksi. NS pyysi yhdistämään, kun koodia jatketaan. Yhdistä kuvien jälkeen tai kerro PT:lle, ettei ole tehty.

## ODOTTAA
1. JU: raystas5, pyydetty 10.33: `raystas/aja-raystas5.zsh <linja> 35f849838`, uusi käännös, 5 kuvaa, tulos `raystas/kuvat5`. JU ilmoittaa Valosepälle. Kuvat `r-k--151`, `r-k--188p5`, `r--155`, `halli-on`, `halli-pois`. JU:n raja: enintään noin 5 kuvaa, enempi perustellaan skenaariossa (omistaja 17.58; JU palautti 16 kuvan pyynnön).
2. KS: Concorde bed1239dd seuraavaan yhteiseen ajoon, KS ilmoittaa kansion.

## KK 10.1x (sanatarkasti)
"Kyltti Tuileries'n reunalla: annetaan olla. Tummat hahmot ja lyhtyjen läikät: ei koodia, ellei omistaja pyydä. bed1239dd seuraavaan yhteiseen ajoon, vesikuva minulle; jatka sitten silloilla ja Pompidoulla."

## SEURAAVAKSI
1. Kuvat5: `r--155` pitää vastata `kuvat3/r--155-u25`:ttä, muuten oletus ei mennyt perille. Hallin kamera on arvio (bot 16,4 / −492,3 / −2,03 kamera-06.zsh:stä, komennon z merkki päätelty); jos se ei näytä hallia, sano se, älä tilaa uutta ilman perustelua. Ylin osa: PT:n tavoite 1/4 ≈ 0,65 (b5: 0,64–0,72). Sitten sha, kuvien polku ja AUKI-kohdat PT:lle ja LAV:lle. Ei junaan, ei iPadia.
2. Concorde, kun KS ilmoittaa: vesi co-yla mediaani vs Seine, -1003:n mittaustavalla. Vesikuva KK:lle.
3. Sillat ja Pompidou -0903:n kohtien 2 ja 3 mukaan, sillat ensin, KK:n sanan mukaan vasta vesikuvan jälkeen.

## MUUTA
Skriptit olivat scratchpadissa eivätkä jää. Kaava: Gaussian 3 px, L-kanava, on/pois, (s−0,5)·255. Kartan kaava: `px[i, 767-k]`, R·0,4 alapinta, A·0,4 katto (255 = ei), G<<8|B lähde; ikkuna `kartta-151.txt` soluina (−704, −1024), i = x·2 + 704, k = −z_komento·2 + 1024. Komennon z = −kartan z. Kuvan vasen = suurempi komennon z.
Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut.
