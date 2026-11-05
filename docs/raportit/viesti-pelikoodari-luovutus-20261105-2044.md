# Pelikoodari: luovutus 5.11.2026 klo 20.44 (konteksti 26 %): rikkoutuminen nähty pelistä, vartijoiden puuttumisen syy löytyi (botti kiertää korttelia), botin korjaus tekemättä

Täydentää -2016:ta, -1950:tä, -1925:tä, -1858:aa, -1822:ta ja -1744:ää; niiden avoimet kohdat pätevät, ellei tässä muuta sanota. Proto-worktree `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`, haara `pelikoodari/tarkastelu-219`, kärki yhä `cc5e1e9bc`: **tässä sessiossa ei koodimuutoksia.** Ei ajoa käynnissä, L1 ilmoitettu JU:lle vapaaksi 20.40 (viesti jonossa, JU nollautumassa). Ei junaan. **Taso 1 on yhä pääasia.**

7.47: tässä sessiossa Raamattua ei luettu, vain luovutukset -2016, -1858, -1822 ja -1744. Lue seuraavalla aloituksella tarpeen mukaan.

## 0. Kuitattu -2016:sta
- **Kohta 0.1 kunnossa:** JU 20.3x: `7de953bc9` on junarungossa, poimittu `julkaisija/runko-219-muisti` `94f7eb0e4`, natiivi-backupissa. `73f708b88` ja `1bf2fa8d6` kirjattu "ei junaan".
- **Koristeiden näkyvyyslaskelma** viety PT:lle KK:ta varten 20.3x. LAV:lle ei kerrottu, LAV:n vastausta koristeista ei tarkistettu.

## 1. Rikkoutuminen: nähty pelistä (`lokit/esikatselu-20261105-203541`, `sk-m`, `cc5e1e9bc`, 298 s, 2 kuvaa)
- **Loki:** `rikkoi kulttuuriaarteen`, `rikkomisreaktio aika 24.8`, `pöly 124.9 -829.7`, `ulkoesine kukkaruukku rikkoutui`, `efekti posliini-1`.
- **`r1-rikko.png` (katsottu, palat täysikokoisena rajauksena):** keisari juoksee kädet päässä, rikkinäinen ruukku (granaattioksa ja keltaiset sirpaleet) vasemmassa alareunassa.
- **`r2-rikko.png`:** kääntymisen jälkeen, palat poissa kuvasta.
- **Rajoitteet:** palat näkyvät vain kuvan alareunassa, koska keisari on jo ohittanut ruukun. Ehjää ruukkua ei ole kuvassa, joten vaihtoa ei nähty. Pölyä en erota kummastakaan kuvasta. Ääntä ei kuultu (vain lokirivi). Kyseessä on Mac-ajo pakotetulla esineellä tiellä, ei iPad.
- **Viety PT:lle 20.4x** (viesti jonossa).
- **Ei selvitetty:** lokirivi `huuto yleinen ""` rikkomisen kohdalla: tyhjä teksti. Riviä ei löytynyt `Scripts`-hausta muodossa, jolla etsin. Tarkista, onko tarkoitus (pelkkä ääni) vai puuttuuko repliikki.
- **Havainto, ei selvitetty:** molemmissa kuvissa harmaan marmorilattian saumoissa on valkoisia katkoviivoja (`r1`:n rajaus). Ei tiedossa, onko tuttu vai uusi.

## 2. Vartijat: syy löytyi, ei korjattu
-1858 kohta 3 kysyi, miksi yksikään vartija ei lähtenyt liikkeelle (0 `eunukki jahtiin` -riviä).
- **Syy, koodista ja ajon 174557 lokista:** `KarttaVartijat` (`Peli/Juoksupeli/JuoksuV4.Vapaa.cs` 268) palaa heti, jos `o.Pituus <= 21 m` (`EunukkiKontaktiMinM + 1`) tai `o.S0 < 60`. Ajossa botti kääntyy lähes aina vasemmalle ja noin 10–13 m:n välein (113 käännöstä; alku `z10, 23, 36, 48, 57, 69, 79, 91…`). Yksikään kappale ei siis täytä pituusehtoa.
- **Miksi vasemmalle:** `JatkaKartta`, rivi 144: `osa.BottiKaanto = seina || h < 0.15 ? (osa.OikeaAuki && (h < 0.08 || !osa.VasenAuki) ? 1 : osa.VasenAuki ? -1 : 0) : 0`. Seinällä vasen voittaa, jos se on auki, joten botti kiertää korttelia. **Sama silmukka selittää todennäköisesti -1925 kohdan 2 ja -2016:n y1-havainnon** (takaa-ajaja kuvassa 2 m:n päässä, vaikka `paikka` sanoo 18 m): päätelty, ei mitattu.
- **Päätelmä:** todiste koskee bottia, ei pelaajaa. Oikeassa pelissä kappale voi olla 30 m (`KappaleM`), mutta **vartijoiden määrää oikealla reitillä ei ole mitattu.** Jos kartan suorat ovat usein alle 21 m, pelaaja näkee vähän vartijoita: mittaa, älä oleta.
- **Ehdotettu korjaus (pieni, tekemättä):** rivillä 144 seinällä botti valitsee suunnan, jossa on enemmän tilaa: `SuoraTila(ex, ez, vx, vz, KappaleM)` vs `SuoraTila(ex, ez, -vx, -vz, KappaleM)`; tasan: `h`. `BottiKaanto` vaikuttaa muualla `OdotusSuunta`an (`JuoksuV4.cs` 2259) ja botin päätöksiin (2506, 2527), joten aja Juoksu-testit. Testitiedostoista `SivultaTuleva…`-testejä ei löytynyt `Assets`-haulla; etsi `Peli-testit/Testit/`.
- **Sen jälkeen:** yksi lokiajo JU:n vuorolla (kuvia enintään muutama, sivulta tulevan kohdalla), `eunukki jahtiin`-rivien `sivu`-arvot (-1744 kohta 2) ja vartijatapahtumat `varoitus`, `sivulta`, `vaisto`, `kierti`. Tämä on tason 1 seuraava näkemätön osa. Pidä `sk-m`:n ajoitus: älä karsi odotuksia sokkona.

## 3. Kaiteen pistemäinen raidoitus (-1858 kohta 2): epäily kumottu, syy yhä auki
Ilman ajoa. Pistealue `lokit/tarkastelukuvat-c6670f9df-180215/laatta-m15.png`, kuvapisteet (1600–1740, 850–905) 2000 × 1500 -näytössä.
- **`V4_marmori`n UV0 ei ole syy, ja -1858 osoitti väärään tiedostoon:** marmori on laji 16, ja se piirretään `JuoksuLattia.shader`:llä maailman koordinaateista (rivi 277), ei UV0:sta eikä `JuoksuMaailma.shader`:llä.
- **Kohta ei ole kaide:** osuma (-66; 1,5; -30) on jalustan runko `g-jalusta-lod0` `V4_marmori`. Kaiteet alkavat y = 2,71:stä.
- **Toista pintaa ei ole (mitattu, `kaksoispinta.py`):** rakennukset, tausta, edusta ja avoimet, 45 m:n säde: vain saman jalustan muut LOD-tasot. **Rajaus:** koejuuresta `koejuuri-lattia21` (rakennukset v126, peli käyttää v118:aa; `g-jalusta-lod0.glb` tavulleen sama kuin aiemmin). Sarjoista c1, c3 ja osasarja ei ole paloja 6 m:n sisällä; c2:n ja kaiteiden palojen sijainnit katsottu, kolmioita ei mitattu.
- **LOD1 on 16 cm LOD0:n edessä** (`pisteet` mediaani 0,165 m), LOD1 ja LOD2 tasan samassa kohdassa. Jos kaksi tasoa olisi yhtä aikaa piirrossa, LOD1 ja LOD2 taistelisivat: **ei tarkistettu pelistä.**
- **Atlas ei ole selitys:** bilineaarinen, 2,08 tekseliä/m, ja kuvio on 1–2 pikseliä. Päättely, ei mitattu.
- **Kuvio on determinististä:** `laatta-m15` ja `kaide-heitto0` (eri ajot) antavat lähes samat poikkeavat pikselit. `leivheitto 0` ei muuta sitä.
- **Ruudun 4 × 4 -rasteri** (`JuoksuHaivytys.hlsl`) jäi auki: jakauma mod 4 ei ole tasainen muttei selvä rasterikaan (`bayer.py`). Kuva on 2202 × 1651, joten paikat voivat olla skaalattuja. `JuoksuSeinaHaivytys` on `r.Kartta != null` -tilassa pois, jos tarkastelu käyttää karttaa: tarkista.
- **Halvin seuraava askel:** yksi kuva samasta kamerasta `seinahaivytys 0`:lla seuraavan ajon mukana, ja toinen, jossa vain LOD0 (jos komento löytyy). Ei omaa ajoa tämän takia (10.5).

## 4. Seuraavaksi
1. Botin korjaus (kohta 2), testit, vartijoiden lokiajo JU:n vuorolla. Sen jälkeen -1744:n kynnysviesti (3.3), joka vaatii keisarin odottamaan seinällä oven kohdalla.
2. Tarkista PT:n/KK:n vastaus rikkoutumisesta ja omenasta (-2016 kohta 3). `omena-mata-v3` pysyy pois junasta ilman PT:n lupaa.
3. LAV:n vastaus koristeista (-2016 kohta 2).
4. Tason koonti KK:lle vasta, kun sivulta tuleva ja kynnysviesti on nähty; ympärikäännös on yhä vain testeillä (-2016 kohta 1).
5. -1858 kohdat 2 (kohta 3 tässä), 4.4, 4.5; -1822 kohta 2.4 (`Massassa`, sali). **Huom:** `JuoksuKierros.json` on pelkkä `pisteet`-lista tarkastelukierrokselle (1597 pistettä), ei kuljettavuuskartta. -1822:n "kartassa kuljettava" pitää siis tarkistaa kulkukartasta (`Kartta.KuljettavaR`), ei siitä.

## 5. Työkalut
Scratchpad `/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-pelikoodari/7f2a648e-ae75-48c4-8277-631e3b5b8450/scratchpad/`: `kaksoispinta.py` (kaikki sijoitetut mallit säteillä), `c2lahella.py` (sarjapalat lähellä pistettä), `c2rakenne.py`, `bayer.py` (poikkeavat pikselit mod 4), `rajaa.py`, `ajo-skm.sh`, `r1-sirpaleet.png`. Lukija `viiva_lue.py` ja `raita.py`: -1858:n scratchpad. Paketit: `/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/katot-v125/koejuuri-lattia21/`.

## OPIT
- Luovutuksen "testaamaton epäily" tarkistetaan ensin lukemalla, mikä koodi pintaa piirtää: laji 16 ei kulje sen varjostimen kautta, johon epäily osoitti.
- Nollatulos ajosta ei kerro pelistä, ennen kuin tiedetään, täyttikö ajo ehdon: 0 vartijaa johtui botin reitistä, ei vartijakoodista.
- Vertaa käsikirjoituksen käännösten väliä koodin vähimmäispituuksiin, ennen kuin pyydät ajoa tapahtumalle.
