# Pelikoodari: luovutus 6.11.2026 klo 09.24: läikät ja merkki selvitetty, LAV:lle vastattu

Täydentää -0734:ää (sen kohdat 1, 3 ja 4 pätevät) ja -0716:ta. Proto-worktree `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`, haara `pelikoodari/tarkastelu-219`, kärki `81d3e839c`, puhdas. Ei junaan. **Taso 1 on yhä pääasia.** Ei ajoa käynnissä.

Lukulista: periaatteet ja yhteiset kohdat luettu; luvut 2, 4, 6 ja 12 vain haettu otteiksi. Seuraaja: lue lukulista ensin.

## 1. Tehty
- **Tarkistus:** `docs/raportit/viesti-pelikoodari-lehti-laikat-20261106.md` (86a16405e). Läikät = peukalokohdat (pelin UI, ei kuvavika). Lehden musta merkki = todennäköisesti mallin vika (mustaa täytettä väritekstuurissa); ei korjattu, malli Codexin, kolmion ja kuvan kohdan vastaavuutta ei todennettu.
- **Korjaus `81d3e839c`:** `Uudestaan` nollaa `mOhjausT`:n, muuten peukalokohdat jäivät näkymättömiksi uudessa juoksussa. `unity-tarkistus` 0 virhettä, testit 867/867. **Ei katsottu pelistä.** Testi ei kata näkymää.
- **LAV, täyte (154,7; 419,8):** vastattu: ei pääse, z 421:n sulkee tason 1 rajaus, ei seinä; lattia jatkuu pinnoissa. Noin 1 m:n näkyvä rako täytteen pään ja seinän välissä.
- **LAV, 19 lisäystä:** vastaus lähetetty 09.2x (jonossa, kun LAV oli kesken): 18 PÄÄSEE kartan mukaan, (-144,4; 287,9) ilman kaistaa; 6 kapeaa porttia epäiltäviä; 2 seinää ei irrota mitään. Kartta ei erota vuotoa oikeasta raosta. Skripti oli vain tämän session välikansiossa; toista tarvittaessa: kartta `JuoksuKulku.bytes`, esteinä `koejuuri-aukot5-taytteet.json` ja `lisays-suunnitelma.json`.

## 2. Auki
1. **Seuraavassa ajossa, jossa on `avaus nyt`:** peukalokohtien pitää näkyä kohdissa 14 % ja 86 % leveydestä, 70 % korkeudesta. Samalla katso kameran liike oven ohi (-0734 kohta 3.1), jos ajo sen näyttää.
2. **PT:n päätös:** mustan täytteen korvaus ovimallissa (ovi-v1 uudelleen) ennen vientiä; suositus raportissa. `ovi-v1` puuttuu yhä mediasta.
3. **Kuva KK:lle:** suositus odottaa seuraavaa ajoa; merkki mainitaan viestissä.
4. LAV voi kysyä jatkoa porteista: tarvittaessa vertaa portit pintoihin (`_tyo/pelikoodari/kulkukartta/v19/pinnat.npz`).

## OPIT
- Ruutuun kiinnittynyt symmetrinen läikkä on todennäköisesti UI: vertaa ensin koodin vakioihin.
- Kuljettavuuskartan este voi olla rajaus eikä seinä: vertaa myös fyysisiin pintoihin, ennen kuin sanot, mikä sulkee.
- Bash-skripti ajetaan bashilla: `Peli-testit/kaanna.sh` kaatuu zsh:lla (CS0006).
