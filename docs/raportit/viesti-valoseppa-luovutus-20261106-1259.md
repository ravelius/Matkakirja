# Valosepän luovutus 6.11.2026 klo 12.59

Korvaa -1241:n kohdat 2–4 ja SEURAAVAKSI-kohdan; sen kohta 1 (räystäs) ja taustamittaukset pätevät. Syy: PT:n pyyntö, konteksti yli pehmeän rajan, työ odottaa KS:ää ja LAV:ia.
HUOM zsh: `git show "$R:polku"` tulkitsee `:A`, `:t` jne. muokkaimina. Kirjoita `"${R}:polku"`.

## 1. RÄYSTÄS
JU:n `julkaisija/runko-219-muisti` sisältää 84872eaa9. Ei ajettu laitteella. Sinulta ei tarvita muuta.

## 2. LAV:N PORRASALAT: ODOTA PARI3
PT 12.58: pari2 korvattu pari3:lla, koodi b0f94ac0a (35140432d + 4 räystäscommittia, JU:lla). Kuvien kansiota en ole nähnyt, LAV ilmoittaa. kuvat-pari1:tä ei käytetä (kujan seinä puuttuu). Vastasin LAV:lle, etten tunnista syytä `v4 7`:stä; en selvittänyt sitä.
Luet parin täysikoossa, tulos PT:lle ja LAV:lle. Jos liuku on syy, korjaus omana committina. Muu -1241:n kohdasta 2 pätee.

## 3. USVA: db7bc0d30 AJOSSA
Ajo 13 (1739323ae, kansio lokit/karttaseppa-yhteinen-13-b8-1739323ae, parit _tyo/karttaseppa/parit-yhteinen-13) huononsi. Tasainen usvaväri ei täsmännyt taivaaseen: Louvren päädyssä kiila ja puumöhkäleet, Eiffel 75 y 400 18 → 47 px, y 600 36 → 17 px. Syytä väriin en selvittänyt.
Korjaus `db7bc0d30` (`linssiseppa2/usva`): malli aidosti läpinäkyvä, alfa = näkyvä osuus; syvyyspassi SRPDefaultUnlit (Offset 1,1) + sekoitus; yhteinen NotreDameKirkkoYhteinen.hlsl; Karttataivas.cs palautettu ennen a93ed64b0:aa. KS:n Y:ssä (dc2b743b9). KÄÄNTÄMÄTTÄ, ei junaan.
Kun KS ilmoittaa: po-ita Louvre, us-eiffel-75, -85b, sama mitta kuin ajoissa 12 ja 13. Katso raidat mallin pinnalla ja lähikuva pr-pohjoinen (lähellä alfan pitää olla 1). Takana oleva väri näkyy nyt suoraan, joten jäljelle jäävä hahmo tulee alfan ja mallin väristä.
RISKI: kärkilaskenta tuplaantuu nähtävyyksillä, iPadilla mittaamatta. Vaihtoehto, jos liian kallis: syvyyspassi vain mallille, joka on usvan alueella (SetShaderPassEnabled), tekemättä. OhjelmaKohde.shaderissa on yhä pisteytys (rivi 72), en muuttanut.
Eiffelin "ei siluettia" -tavoite on yhä auki. -1123:n kohdat 3–7 tekemättä omin silmin. Parit KK:lle, kun Eiffel on ratkaistu.

## 4. POMPIDOU: 32ec2fe2b AJOSSA
KK 12.53: laaja sininen katto vastoin omistajan sanoja 10.31; polvet hevosenkenkinä; seuraava kuva parina oikean rakennuksen kanssa, uudelle KK:lle; siitä pitää näkyä, viekö X-jäykisteiden poisto tunnistettavuutta.
`32ec2fe2b` (`linssiseppa2/pompidou-varit`, Y:n dc2b743b9 päällä, worktree k30 tällä haaralla): PoKanava #7E94A2, torvet umpinaisina. Portti ok, geometriatestit 19/19 (`_tyo/linssiseppa2/ohjelmakohteet/aja-pompidou.sh`), esikatselu `rak-po/pompidou-k40.png`. Ei Unityssä.
Punaista ei muutettu: PoPunainen on rajan sisällä; #9E5C48 ylitti portin (C 0,108). KK:lle kerrottu.
KS:ltä pyydetty po-la ja itäpuolen rajaus täysikokoisina. Tee pari: viite `_tyo/linssiseppa2/ohjelmakohteet/a/viite/pompidou-0.jpg`, `pompidou-mini.jpg`, `pompidou-pano.jpg` (kohde kokonaan, sama rajaus). £200-kyltti: KS kertoo NUI:lle.

## 5. KEVYET PUUT: VALMIS, PT KUITTASI
`09cfa17c4` (`linssiseppa2/puut-kevyet`, palikka-koe päällä), `Resources/NotreDameKoe/puut-kevyet/puu-{1..4}-{300,80}.bytes`, atlas vain puu-1:ssä. Sana NS:llä. Skriptit, kuvat: `/Users/Shared/Claude/proto-3d/_tyo/valoseppa/puut-kevyet/`. Siluetti 300: 95–98 %, 80: 89–93 % Blender-kuvista; ei ajettu Unityssä eikä GlbLukijalla. NS:n tai PT:n kuvasanaan asti ei muuta.

## SEURAAVAKSI
1. KS:n ajo: usva ja Pompidou. 2. LAV:n pari3. 3. Siltakuvat ja palettikuvat -1105:n mukaan, kun KS ilmoittaa. 4. Lippu (-1153) KK:n sanaa.

## MUUTA
Worktreet: k17 `linssiseppa2/raystas-jalusta`, k30 `linssiseppa2/pompidou-varit`. Taukolippu `julkaisija-tyokalut/valovahti-tauko` oli olemassa. Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut.
