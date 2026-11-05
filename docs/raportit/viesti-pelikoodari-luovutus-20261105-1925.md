# Pelikoodari: luovutus 5.11.2026 klo 19.25 (konteksti noin 33 %): mätä omena v3 kytketty, jahti nähty lokista, KK:n kattokysymys osin auki

Täydentää -1858:aa (kohdat 1 muuri, 2 kaiteet, 4.3–4.5, 5), -1822:ta ja -1744:ää. Proto `pelikoodari/tarkastelu-219`, kärki `74cf937fa`, pushattu natiivi-backupiin. Ei ajoa käynnissä, L2 ilmoitettu JU:lle vapaaksi. Ei junaan. **Taso 1 on yhä pääasia.** Skenaario `_tyo/pelikoodari/vapaa-1/sk-j.txt`.

## 1. Tehty
- **Mätä omena v3:** `KerattavaMallit` → `omena-mata-v3`, `HehkuMata`, varanimi `omena-mata`, kunnes v3 on ämpärissä. GLB paikallisesti `_tyo/pelikoodari/omena-mata-v3/` (SHA täsmää). Vienti vaatii luvan (PT:lle kerrottu, lupaa ei ole vielä). **v3 on ladattu pelissä (loki 0,14 m), mutta sitä ei ole nähty lähikuvassa.** Valkoiset pallot ajossa 191402 olivat herkkuomenan paikkamerkkejä, koska `kerattavajuuri` ei hakenut puuttuvaa mallia ämpäristä; korjattu `74cf937fa`, ei ajettu.
- **QA:** `ui juoksupeli eunukit K`, `kerattavajuuri url`; `paikka`-rivillä takaa-ajajan tila, paikka ja väli.
- **Eunukkien määrä (testi, botti, lähtö (-143,9; 437,1) etelään, 230 s, 24 siementä):** 0,4–0,5 kohtaamista, ei yhtään 15–17 ajossa. K = 20 antaa vain 1,5, joten kerroin ei yksin nosta määrää; suorien pituutta rajoittavana syynä ei ole mitattu. Botti jää myös 5 m:n silmukoihin. Tämä ei ole pelaajamittaus. **Omistajan asia, kun taso näytetään:** "koko pelin idea" vs. "alussa todella vähän". Tiheyttä ei muutettu. Mittaus `ZZKokeilu.cs.txt`.

## 2. Ajo `lokit/esikatselu-20261105-191402-2` (73f708b88, K = 20, 22 kuvaa 6 s välein; `arkki-skj.jpg` kohdassa 5)
- **e23-tyypin eunukki on takaa-ajaja (lokista):** kuvissa j17–j19 hän on 3,5–4,8 m kamerasta, vaikka on reittiä pitkin 18 m takana, koska botti kulkee tiukkaa silmukkaa. Muita eunukkeja lokissa ei ollut. Selittää -1744:n "sivuttain tai poispäin". Pelaajakin voi nähdä tämän tiukoissa käännöksissä; ei muutettu.
- **UUSI VIKA, selvitettävä:** ainoa oikea kohtaaminen: `varoitus 100 z452`, `eunukki jahtiin kontakti 460.2 sivu -22.8`. Eunukki oli 22,8 m reitistä kontaktin hetkellä, ei tullut kontaktiin, j09:ssä häntä ei näy ja j10:ssä hän on kaukana edessä. Syy tuntematon; testin mukainen logiikka on Maailman ulkopuolella, joten testi ei kata tätä. Epäilty: `JuoksuV4Maailma.cs` 4408–4415 (`zt` katkaistaan viimeisen osan päähän, ja reitti jatkuu käännöksessä), ei mitattu. **Lisää lokirivi varoituksesta: eunukin paikka, `z`, kontakti, ennen seuraavaa ajoa.**
- Sivulta tulevia, rikkoutumista (`rikkoi`) tai kiinniottoa ei tässä ajossa nähty. Yksi kala-allas näkyy j04–j06:ssa.
- Seuraavassa ajossa lyhyempi kuvaväli kohtaamisen ympärille ei onnistu: kuvia ei voi ajastaa tapahtumaan. Harkitse, olisiko `kuva`-laukaisu tapahtumasta halvin tapa.

## 3. KK:n kysymys 19.1x (vastaus viety KK:lle 19.2x)
Työkalut `katot.py`, `katot2.py` (säteet, rakennukset + tausta, kiertosuunta), kansio `malli/` scratchpadissa.
- **Eri syyt.** Muurin pääty on `v-ulkomuuri-026`, ja harmaa laatikko on `t-portti-m15` (V4_marmori). Molemmissa säde osuu ensin takapintaan ja poistuu etupinnasta. Merkillinen tilavuus on negatiivinen 80 `v-ulkomuuri-*`:lla ja 4 `t-portti-*`:lla, muilla ryhmillä positiivinen: **kiertosuunta nurin**.
- **Katon alapinta:** taustan `V4_gold` (y noin 5 m), yksipuolinen levy, ei alapintaa.
- **Leijuva nauha ja palaset (kaide-heitto0, kuvapisteet (600, 182), (310, 130)):** säde ei osu rakennuksiin LOD 0–2 (260 m) eikä taustaan (150 m). **Lähde selvittämättä.** Seuraavaksi: `c2`, `osasarja`, `koristeet.json` (-80,6; -14,8) ympäriltä, tai `ui juoksupeli mika x y` seuraavassa ajossa. Lokissa 404: `kielletty-c2-v34/a3-baoding-lod1.glb`, `a5-marmorikaide-pylvas-lod1.glb`, `kielletty-osasarja-v8/pursotukset.glb`; yhteyttä ei tiedetä.
- **Pelikamera:** `Korkeus`/`Etaisyys` lasketusta kamerasta: muuri 3,3–3,9 / 4,1–4,5 m, kaide 2,4–6,1 m / 3,5–6,0 m. Muurin räystäs on kameran yläpuolella. Ajon kuvat eivät olleet näistä pisteistä, joten **näkyvyys on auki**. Tarkista arkki ja katso pisteet oikealla pelikameralla.
- **Portti:** uusi piste seuraavaan ajoon, joka on muutenkin tarpeen (KK). Omistajan linja 17.51 ja 17.57: yleinen korjaus, ei ajoa pelkkää selvitystä varten.
- **LAV:lle viety 19.2x:** kiertosuunta ja räystään alapinta.

## 4. Seuraavaksi
1. Kontaktin 22,8 m:n vika (kohta 2): koodi, lokirivi, ja seuraava ajo samalla: omena lähikuvana, rikkoutuminen, sivulta, porttipiste, `mika`.
2. Leijuvien osien lähde ilman ajoa.
3. -1858 kohdat 2 (pisteet: näytön pikselirasteri rivillä 303 ei koske `V4_marmori`a, luettu koodista; `V4_marmori`n UV0 yhä tarkistamatta), 4.4, 4.5.
4. -1744 kohdat 3.3–3.5 (kynnysviesti, ympärikäännös, rivi KK:lle).
5. Yleiset jäljellä: `tarkista.sh`-liikevahti ennen junaa (-1822 kohta 4).

## 5. Työkalut
Scratchpad `/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-pelikoodari/ff5ae6e1-0e36-444c-bf33-f48ed950c33f/scratchpad/`: `katot.py`, `katot2.py`, `arkki.py`, `rajaus.py`, `tee-skj.py`, `ajo-skj.sh`, `ZZKokeilu.cs.txt`, `ZZKamera.cs.txt` (kopioi `Peli-testit/Testit/`:iin, älä commitoi). Kartan koordinaatit testissä ovat pohjan kehyksessä, eivät lokin maailmakoordinaatit.

## OPIT
- Kerro syy vain, jos se on todennettu samasta ajosta: lähetin PT:lle "selittää nollan: ei vika" mittauksesta läheltä, ja se piti korjata. Korjaus lähti heti.
- Nollatulos testissä voi johtua koordinaattikehyksestä: kaikki siemenet samat = lähtö seinän sisällä, ei tulos.
- QA-juuri kattaa kaikki sen alla haettavat, ei vain uutta mallia. Tarkista 404:t lokista heti ajon jälkeen.
