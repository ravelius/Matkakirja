# Pelikoodari 5.11.2026 klo 22.0x: näkymätön este kujalla: mitä se on ja mitä suosittelen

Mitattu kartasta v19 ja mallien kolmioista (tausta v115, rakennukset v118). Ei ajoa, ei muutoksia. Kuvasta on katsottu vain ajon 212358 `k2` ja ajon 214330 `q2`, `q3`, `q6`.

## Kuja (ajon 212358 k2)
- **Se ei ole kuja, vaan ontto talo.** Alue x −189…−180, z 406…416,5: yksi yhtenäinen kuljettava lattia (86 m²), katto 3–6,5 m harjakattona, koko ala saman `tausta`-mallin katon alla. Talon länsiseinää ei ole: lattia jatkuu kujalta talon sisälle ilman seinää (ruudukko 0,25 m, `kuja-ruudut.py`).
- **Aukot:** 1,55 m pohjoisessa (−188,8; 416) ja 1,55 m etelässä (−188,5; 405,8). Kuvassa aukko näyttää kujalta.
- **Talo ei ole pohja.json:ssa** (lähimmät 抚辰殿 ja 咸福宫 eivät kata sitä), joten kone ei tee sille ovea eikä seinätäytettä, kuten oikeille taloille.
- **Rajaus toimii säännön mukaan:** vähintään 2 m leveä katettu ala on sisätila. Raja 2,25–4 m ei avaa kujaa (mitattu), koska ala on 9 m leveä. Säännön väljentäminen ei siis ole korjaus.
- **Päätelty, ei nähty:** että talon sisältä näkyy kuvassa tyhjää. `k2`:ssa lattia jatkuu ikkunaseinän taakse, mutta sisälle ei ole otettu kuvaa.

## Kuinka monessa paikassa sama tilanne on
Kohdat, joissa tason 1 kulkualue koskee fyysisesti kuljettavaan alaan ilman seinää, näkyvä aukko vähintään 1,25 m (`kosketukset.json`):

| | yhteensä | 1,25–3 m | 3–6 m | ≥ 6 m | oven 4 m:n sisällä |
|---|---:|---:|---:|---:|---:|
| talon pohjalla | 321 | 54 | 80 | 187 | 65 |
| ei talon pohjalla, katettu | 172 | 45 | 65 | 62 | 9 |
| yhteensä | **493** | 99 | 145 | 249 | 74 |

Pitkät (≥ 6 m) ovat todennäköisesti kuisteja ja katettuja käytäviä (päätelty: mitat ja katto, ei katsottu kuvista). Yksi kohta on 70,8 m pitkä (1,5; 0,9), todennäköisesti isoja tiloja.

## Suositus
**Keisari kertoo jokaisella näistä rajoista saman kuin ovella: "Sisälle pääsee seuraavalla tasolla."**
- Kartta ei muutu, ja rakennusten sisälle ei edelleenkään pääse (omistaja 13.00). Pelaaja saa aina syyn pysähtymiselle, joten este ei enää ole näkymätön.
- Toteutus on pieni: kartta tietää rajat jo; viestin ehto `OviEdessa`n rinnalle. Vaatii kartan version (raja-lippu) ja testin kuten `KynnysViestiYltaaOvilleSuoraanEdesta`.
- **Ei korjaa tätä:** tässä ontossa talossa aukko näyttää yhä kujalta, ja sisältä voi näkyä tyhjää. Sen korjaus on seinä malliin (LAV), jos KK haluaa; suosittelen ensin katsomaan kuvan sisältä seuraavan ajon mukana.

Vaihtoehtoa, jossa onttoihin taloihin saa juosta sisään, en suosittele: ne ovat tyhjiä ja rikkovat päätöksen, ettei tason 1 taloihin pääse.

## Työkalut
Scratchpad `/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-pelikoodari/1c8f51a9-6803-454d-a6bd-47a4a1524352/scratchpad/`: `kuja-ruudut.py`, `kuja-kartta.py`, `kuja.png`, `kuja-kate.py`, `este-leveys.py`, `kosketukset.py`, `kosketukset.json`, `kosketukset.png`.
