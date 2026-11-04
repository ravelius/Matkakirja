# Natiivisepän luovutus 4.11.2026 klo 22.43 (konteksti 25 %, pehmeä raja, 7.37)

Korvaa luovutuksen -2115. Id:t: /Users/Shared/Claude/osoitekirja.md. Cron Unity-beeta: luo uudelleen ("4 9 * * *", muisti unity67-paivitysseuranta). Vuoro aina JU:lta.
Luovutushaara natiiviseppa-luovutus-2052 (PR 6215), työpuu /Users/Shared/Claude/wt/natiiviseppa-luovutus-2052. Python, jossa numpy ja PIL: /opt/homebrew/bin/python3 (numpy ei löydy -I-valitsimella).

## TYÖ: muistin kevennys kohta 2, juoksupeli (omistaja 20.15; suunnitelma /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261104-muistin-kevennys.md)
Tavoite: peli ei kaadu eikä näytä huonommalta, ja uudelle sisällölle on tilaa. Raja 4080 Mt pysyy. Ei junaan ilman omistajan pyyntöä. **PT: "säästö mitataan iPadilla ennen kuin sitä kutsutaan säästöksi."**
Kaikki tiedot ja luvut: /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/muistikuva/kohta2-astc/tulos.md. Kohdan 0 tulos: ../tulos.md.

### Tilanne: koe odottaa iPad-vuoroa
- Koe **9ca48d7a2** natiiviseppa/normaali-astc-koe (d9cde0f50 + 1, proto, työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-muistikuva). **C#:ia ei ole käännetty**; käännösvirhe tulee JU:lta riviksi.
- JU:n jonossa (pyyntö 21.27 ja tarkennus 21.3x): Release-laitekäännös, ajo-muisti.zsh (5 ajoa: keräys, astc, ennallaan, astc, ennallaan), sen perään samassa lukossa sk-parit-laite.txt laitteella. Kumpikin kansiossa kohta2-astc.
- **Omistaja 22.41 (PT, Raamattu 2.207):** koe jatkuu, mutta iPad-jonossa kartan kuva-ajojen jälkeen.
- Odotettavissa JU:lta: kansio lokit/natiiviseppa-normaali-astc-9ca48d7a2, AJETTU-rivit ja konsolin kuvajako-rivit (normaaliastc tila, astc N, puuttuu M).

### Kun tulokset tulevat
1. Tarkista kuvajako-rivi: puuttuu 0, tila 2 todella päällä. Laske huippu, viimeiset 60 s ja latausaika (LentoAlkaa) astc- ja pois-ajoista. Vertailu d9cde0f50: huippu 4003, viimeiset 60 s 3636 Mt.
2. Katso parit täysikoossa (kuvien polku JU:lta). Kamerakohdat on poimittu LAV:n ajoista, eikä ole varmaa, että normaalikartallisia pintoja on lähellä; jos ei ole, uudet kohdat. Odotukset ovat kiinteitä (180 s, 15 s): jos lataus jäi kesken, se näkyy kuvista.
3. Luvut ja parit PT:lle. Kuvaparit vain PT:lle (muisti kuvaparit-pt-lle-kk-lle-vain-pyydetyt).

### PT 21.2x, sitova
Runko d9cde0f50. Hyväksytty suunta on valmiiksi pakattu; ajonaikainen ASTC vain kokeeseen, ja jos sen haluaa, luvut ja parit PT:lle, poikkeama menee KK:lle. Kalotti normaalien jälkeen, alfa säilyttäen. **Omistaja 22.41: Napakalotti odottaa Pariisin loppumittausta.**

### Tiedossa olevaa, ei tarvitse selvittää uudelleen
- ImageIOn laatua ei saa ylös (pahin p99 14°); Unityn astcenc thorough 6,1°, Macilla mip 0. Kahden kanavan normaali ei auttanut, ja se vaatisi varjostinmuutoksen.
- Lähdekuvat (52 poimittua): RGB, ei alfaa eikä ICC:tä. Varjostin lukee xyz:n. Epäneliöt sivut kokeilematta Unityssä: virheestä varoitus ja vanha polku, puuttuu-laskuri kertoo.
- PuraAstc ohittaa alfan eikä rajaa kokoa, joten se ei käy kalottiin.

### Seuraavaksi, kun normaalit on mitattu
- **Taivas:** valmis lippu `valo taivaspakkaus 1` (JuoksuV4Maailma.TaivasPalat.cs:170), pääsäikeessä, porrastusriski (PT/PK 27.10.). Pari ennen oletuksen vaihtoa.
- **Tuotantoreitti median kautta suunnittelematta** (media-vienti muuttaa julkaistua; PK vahvistaa viittaukset).
- Mahdollinen lisä, ei tilattu: media-osoitteiden kuvat 51 kpl 128 Mt.
- JuoksuV4Maailma.cs: PK tekee kohtaa 1 riveillä noin 2623–2633 ja 3051, haara pelikoodari/muurin-runko-219. Ei osu kokeeseen; sovi PK:n kanssa, jos osuu.
- Kuvat 859 + 752 Mt lokit/natiiviseppa-muistikuva-303a71dfb: voi poistaa, kun kohta 2 on valmis (levyä vähän, 60 Gi).

## Työ, ei kosketa ilman sanaa
- **Maakuntarajat b2101b95e (natiiviseppa/maakuntarajat-katko):** PT 21.0x: ei korjausta nyt, päätelmä jää tiedostoon, kunnes striimin versio on päätetty. _tyo/natiiviseppa/maakuntarajat/tulos.md, loppu.
- **Kallistus f0e256d9b (tasainen-striimi-3):** ei uusia ajoja, KK päättää. _tyo/natiiviseppa/striimi-sauma/tulos.md.
- **h-z13-sauma:** veden väriloikka z ≤ 11 | z ≥ 12 (ElavaTyyli.cs:490, :564). Ei korjausta ilman sanaa.
- **p-z15:** d9cde0f50 on runko ilman 694e1783a:ta ja e4180ac69:ää, ei kylmä tila. Vaakaraja ja taivaan portaat auki.
- **Versioriski:** VS:n yhdistelmä tarvitsee version > e20. Yhdistelmää tasainen-striimi-3 + maakuntarajat-katko ei ole tehty.
