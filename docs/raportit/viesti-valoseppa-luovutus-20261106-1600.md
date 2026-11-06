# Valosepän luovutus 6.11.2026, korvaa -1530:n kohdat 1, 2 ja 3 (Louvre)

Muut -1530:n kohdat pätevät (lue se: b85b1b2f2, Raamattu-lista lukematta, repot, dither, puu-3, seuraavat). Syy: konteksti 35 %.

## 1. POMPIDOU: SIKSAK SEURAAVAAN YHTEISEEN AJOON
KK 15.40: "tee suosittelemasi, eli siksak 2–3 pitkäksi lenkiksi seuraavaan yhteiseen ajoon"; uusi KK näyttää parin omistajalle, joten kerrottavat parin viestiin.
Tehty: `9e84124d4` (`linssiseppa2/pompidou-varit`, natiivi-backup, k30), f26fed3af:n päällä. Kolme nousua 40° tasoille 16,4, 26 ja 35,6 m, profiili 3,2 m, kolmiot 3 156 → 3 132. Geometriatestit 19/19; aja-geometria.sh:n erillinen Concorde-FAIL on polkuvika (polku ilman worktreetä), ei tästä. Esikatselu `_tyo/linssiseppa2/ohjelmakohteet/rak-po/kk1540/pompidou-k40.png`. Unityssä kääntämättä, pelissä näkemättä.
KS:lle pyydetty 9e84124d4 + kamerat `sk-pompidou-sama-2.txt`. Ajon jälkeen uusi pari `kuvat/yhteinen18-e83a2d314/tee-pari.py`:n pohjalta ja viesti KK:lle (id osoitekirjasta). Viestiin: m/px kummallekin puolelle (arvioitu), kolmiot ennen ja jälkeen, kulma 70 (viite noin 3°, 85:ssä peittyy), kyltit (UI päällä), pallo ja kori, X:t, portaiden kulma 40° (oikeassa noin 30°), siksakin mahdollinen madaltuminen, tiilenpunainen, usvan haalennus, katon kanavat ja suorat putket. Lenkit ovat tietoinen yksinkertaistus.

## 2. TUMMUUS: AJOSTA 19 RIVI
PT: "ui peitteet 0.9" KS:n seuraavaan ajoon, ei korjausta ennen tulosta ja PT:n sanaa. KS lisäsi rivin luonnokseen `_tyo/karttaseppa/sk-pariisi-yhteinen-19-luonnos.txt` ja lähettää lokin. Mitattu: UI päällä = 0,939 × ui pois kaikilla kanavilla ja tasoilla, ei vinjettiä; ajojen ero poissuljettu (ajot 15/16/18 suhde 1,000). Elementtiä ei löytynyt koodista eikä USS:stä. (254/255)^16 = 0,939 on hypoteesi, ei todistettu. Tulos riville PT:lle. Laitteelta ei todistetta.

## 3. LOUVRE: PT:N SANAA ODOTTAA
Tulos ja suositus PT:llä. Haamu on läpinäkyvyyttä: NotreDameKirkko ZWrite Off + alfa, Peitto() hlsl:34 ja :43 antaa alfaa n 0,12–0,55, jono 3080. Lähde: ali-agentin luku; varmistin itse ZWrite, Blend, smoothstep-rivit ja KirkkoJono:n. Louvren n-arvot ovat arvioita, usvamitta puuttuu ajosta 18; 45°:n laskun kaukopää ei täsmää kuvaan, kaava ei muutu.
Suositus PT:lle: smoothstep(0,12, 0,30) → (0,25, 0,40) molemmilla riveillä seuraavaan yhteiseen ajoon, jos haamu jää, KirkkoJono alle 3050:n ja peittävä väripassi. Koodia ei tehty. Haara `linssiseppa2/usva`. Omistajan kortti "Samaan usvaan (Suositus)": `/Users/Shared/Claude/keskustelut/Keskustelukanava-2026-11-06-klo-0940-1124.md:202`; ehto -1048 rivi 25.
