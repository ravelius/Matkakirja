# Valosepän luovutus 6.11.2026 klo 15.56, korvaa -1600:n ja -1530:n kohdat Pompidou, tummuus ja Louvre

Muut -1530:n kohdat pätevät. Syy: konteksti 26 % (pehmeä raja), kaikki odottaa muita.
Luettu tällä sessiolla: Raamattu 6, 9, 10.1–10.2, 7.7, 12.9, 12.20, vastuukartan rivi. LUKEMATTA: luvun 2 linssikohdat, luvun 7 ROOLIT ja viestit, 10.3 eteenpäin; lue ennen uutta isoa työtä. `docs/raportit/viesti-valoseppa-aloitus.md` puuttuu mainista, `docs/aloitusviestit/valoseppa.md` on olemassa.
Kuvat: `K=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet/kuvat`. zsh: `=====` ei kelpaa echolle, käytä `-----`.

## 1. LOUVRE JA LEIJUMINEN: PT:N SANAA ODOTTAA (TÄRKEIN)
PT (ajo 20): a027be140 jää kokeeseen, ei riitä; etuosa ja katot seisovat taivasta vasten maan häivyttyä alta. Mittari omistajan 10.47 ja 21.28/21.30: samaan usvaan kuin talot, ei leijumista. EI koodia ennen PT:n sanaa, KirkkoJono ennallaan, EI omistajalle ennen kuin leijuminen on poissa.
Juurisyy mitattu ajon 20 kuvasta `lokit/karttaseppa-yhteinen-20-b8-c86660d78/po2-ita.png`, skripti `$K/yhteinen20-c86660d78/mittaa_usva.py`:
- Usva on katseakselin syvyys (`NotreDameKirkkoYhteinen.hlsl`: `ComputeFogFactor(o.paikka.z)`; sama taloilla ja kartalla). 45°:ssa korkeus h lyhentää syvyyttä 0,707 h.
- Louvren huippu 350 (Nahtavyysalue.cs:140) = 247 m = 0,34 usvan matkasta (alku 1662, loppu 2391). Talo 25 m (arvio): 0,02.
- Kamera sovitettu usvamitan riveistä: 1/z = 6,458e-4 − 6,488e-4·k, k = (2Y−1)·tan 25°. Tarkistus: Louvren keskipiste 2440, usvamitta 2444.
- Talot seuraavat laskettua näkyvyyttä: rivi 580 laskettu 0,61, kontrastista 0,58; rivi 430 0,36 / 0,39; rivi 330 0,16 / 0,18. Rivin 230 lukema 0,54 on UI-napin osuma.
- Louvren jalka samaa usvaa kuin talot: rivi 420 kontrasti 0,193, talot samalla syvyydellä 0,178, näkyvyys 0,36.
- Katto: keskipaviljonki rivi 60 h ≈ 347, z ≈ 1890, näkyvyys 0,69, kun maan näkyvyys samalla ruudun rivillä on 0,00. Maa on täysin usvassa rivistä 256 ylöspäin.
Eli varjostin on oikein samalla syvyydellä; malli erottuu, koska korkeus tuo sen katseakselilla lähemmäs, ja se seisoo kohdassa, jossa maa on jo poissa.
Suositus PT:lle: `vert`-funktiossa sumu jalan syvyydestä, ei pikselin korkeudelta: `ComputeFogFactor(TransformWorldToHClip(TransformObjectToWorld(float3(i.paikka.x, 0, i.paikka.z))).z)`, ja a027be140 pois (0,12, 0,30 takaisin). Silloin malli ei voi näkyä siellä, missä maa sen alla on häipynyt. Kyltit käyttävät jo jalan usvaa (`JalanUsva`).
Tarkistettava ennen koodia ja ajossa: pivotti y = 0 Louvrella, puilla (`puuAine`) ja pyramideilla; Notre-Damen yläosa vaalenee (jalka 0,82, nyt yläosa lähes 1), PT kysyi tästä aiemmin; lähikuvat. Ajo vain KS:n yhteisessä: `po2-ita`, `us-eiffel-85b`, `usvamitta`, lisäksi Notre-Dame lähellä. Suositusta ei ole kokeiltu.

## 2. EIFFEL 85B: a027be140:N SIVUVAIKUTUS
`$K/yhteinen20-c86660d78/pari-eiffel-17-20.png`: yläosa 45 → 16, jalat 57 → 29 (p99−p1), Invalidit 135,5 ennallaan. a027be140 on ainoa varjostinmuutos ajojen 17 ja 20 välillä; Nahtavyysalue.cs:n muutos on vain kehittäjäkomento. PT kirjoitti "välissä muitakin muutoksia"; varjostimissa ei ole. 85°:ssa jalkakorvaus on vain noin 0,04 usvan matkasta, joten Eiffelin palautus tulee a027be140:n perumisesta.
Louvren pari `pari-louvre-18-20.png`: kaukopää 30,5 → 5,0, lähitorni 95 → 95. KS:n omat parit `_tyo/karttaseppa/parit-yhteinen-20/`. Y on c86660d78 (a027 mukana), EI junaan.

## 3. POMPIDOU: KK:N SANAA ODOTTAA
Ajo 19 (`lokit/karttaseppa-yhteinen-19-b8-e5cd281f1`, sisältää 9e84124d4). Parit `$K/yhteinen19-e5cd281f1/pari-pompidou-{lansi,ita}.png`, viesti KK:lle 15.49 kaikkine kerrottavineen (c44b0bd3, jonossa, lukemista ei vahvistettu). Oma arvio: siksak erottuu selvästi, mutta muistuttaa sahalaitaista viivaa ja on julkisivun vasemmassa kolmanneksessa. Kolmiot 3 156 → 3 132.

## 4. TUMMUUS: SULJETTU
PT: `mk-liike__savy` (PieniLiike.cs:83–99) on tarkoituksellinen vuorokaudenajan sävy, ei korjausta. Väriparit samassa vuorokaudenajassa. Kirjattu tieto, ei avoin asia: 0,939 on 2–4× webin kerrointa vahvempi ja väritön.

## 5. MUU
Dither d092f48cc on `julkaisija/runko-219-muisti`-haaran kärjessä, varmistettu. Puu-3: NS kertoo. LAV:n s--185p9 ja s--81p1, siltakuvat ja palettikuvat -1105:n mukaan, lippu -1153: KK:n sanaa.

## SEURAAVAKSI
PT:n sana suosituksesta (kohta 1). KK:n sana siksakista. Muuten jono tyhjä.
