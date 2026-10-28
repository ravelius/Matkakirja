# Lavastaja → Codex: kujien kivipinnat v4, tarkennus havainteen mukaiseksi (KK 28.10. 00.0x, omistajan kysymys)

Jatkoa toimitukselle c56b5c011 (stone-surfaces-v3, 1191–1194). Pinnat on koottu peliin (v01) ja VS:n sävy on kohdallaan. Parikuva pelikamerasta:
`proto-3d/lokit/havainne-editori-20261027-235149/02/` (peli.png, havainne.png ja KK:n lähikuva `kk-lahikuva-kivijalka-lattia.png`, jossa vasen = peli,
oikea = havainne). Omistaja kysyi: "Miksei codexia voi vain pyytää tekemään identtiset palat kuin mitä havainnekuvassa on kivissä?" Tavoite on siis
pinta, joka on HAVAINNEKUVAN KIVIEN KALTAINEN, ei geneerinen kivi. Mitat, tiedostonimet, PNG-koot ja UV-sopimus pysyvät ennallaan (KAYTTO.md v3), joten
kokoan uudet pinnat suoraan nykyisiin UV:ihin.

## 1. Sokkeli (kivijalka), 2,00 × 1,20 m, ja sen yläpinta. Pohjaksi v02 (selvin sävyvaihtelu)
- Havainteessa on PIENIÄ TIILIÄ, noin 8 kerrosta 1,20 m:llä (kerros ~0,15 m), tiilen suhde 2–3:1 (pituus ~0,30–0,45 m), limitys puolikkaalla.
  v3:ssa on 4 kerrosta isoja lohkoja, joten tiilikoko puolittuu.
- JOKA TIILELLÄ OMA SÄVY: vaaleita ja tummia harmaita sekaisin (ei ruutumaista vuorottelua), kuten havainteessa.
- Reunat ovat PYÖRISTETYT JA KULUNEET: korkeus- ja normaalikartassa tiilen reuna kaartuu saumaan, jolloin valo osuu reunaan ja sauma näkyy varjona,
  ei ohuena tummana viivana.
- Yläpinta (sokkelin-ylapinta 2,00 × 0,10): pyöreäreunaiset katekivet, saumat samoissa kohdissa kuin sokkelin ylimmässä kerrassa.
- Pilarit (pilarin-etu 0,60 × 1,20 ja -sivu 0,40 × 1,20) samalla tiilellä ja kerroskorkeudella; kulmassa vuorottelu kuten v3:ssa.

## 2. Lattialaatat, 2,00 × 2,00 m toistuva. Pohjaksi v04 (limitys ja rauhallinen pinta)
- TYYNYMÄISET LAATAT: reunat pyöristyneet ja kuluneet, sauma varjona reunojen välissä (korkeus/normaali). Ei teräviä viivasaumoja.
- Limittäin vaihtelevin pituuksin, porrastettuna kuten havainteessa, ei tasaisina pystykaistoina eikä ruutumaisena vaalea/tumma-vuorotteluna.
- EI valkoisia kiemuraisia raapaleita tai suonia; havainteen pinta on rauhallinen, lämmin keskiharmaa.

## 3. Reunakivi: EI MUUTOKSIA (omistaja lukitsi muodon ja värin 27.10. 20.05).

Toimitus kuten v3: albedo + normal-opengl + height + roughness, SHA256SUMS ja vertailuarkki havainteen rinnalla. Yksi muunnelma riittää
(tai 2, jos epävarma), nimellä stone-surfaces-v4. Kun toimitus on postissa, kokoan sen ja teen uuden parin KK:lle. Omistaja näkee parin ennen junaa.
