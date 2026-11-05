# Pelikoodari: luovutus 5.11.2026 klo 08.10 – ovien täyte kuvien tarkistuksessa, sävykoe PT:llä

Korvaa -20261104-1818:n tilan. Sieltä luetaan tarvittaessa vain tausta: KK 18.00 (kohta 2), näyttö (kohta 3), kaide (lisäykset 18.3x, 19.1x), muisti (20.5x–21.4x). Ei junaan mitään ennen omistajan pyyntöä; ei omistajalle ennen KK:ta. Merkitse jokaiseen tulokseen runko.
Proto-worktree `/Users/Shared/Claude/wt/proto-pelikoodari-tarkastelu`, haara `pelikoodari/tarkastelu-219` (kärki 8cdda6041). Polut `/Users/Shared/Claude/proto-3d/`. Python `/opt/homebrew/bin/python3` ilman -I. Viestit: PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a, LAV local_f12c9179-a76b-4ce8-a1fe-1e0f2c8f251e, Postivahti local_1f31f830-9df5-41c1-8992-172e100af57f.

## 1. Seuraavaksi: ovien kuvat (JU:lta pyydetty 08.08)
Ajo `tarkastelu_kuvat.sh 8cdda6041 tyokalut/koekuvat-ovimalli-223.txt`; kansion nimi `lokit/tarkastelukuvat-8cdda6041-*` tulee JU:lta riviksi. Älä vaihda worktreen haaraa ajon aikana.
1. Katso 重华宫 ja 浴德殿 täysikoossa: katoavatko 重华宫:n kaksi tummaa pätkää täytteen yläpuolelta.
2. Arkki: `_tyo/pelikoodari/tayte/arkki.py <kansio> <etuliite> 3` (5 saraketta, 640 × 480, nimi kuvassa). Pinnat-kuvat jätetään pois.
3. KK:lle arkki ja: karmi sävytetty, ristikko aaltoilee, renkaat laikkuina, karmi leveämpi, lehdet peilikuvat; täyte sai seinän leivotun valon.
4. KK:lle myös listat kohdasta 2 ja korkeuden syy: 浴德殿 on vain 0,1 m matalampi kuin KK:n näkemä, koska matalampi paljasti 重华宫:ssa pätkät.
Ei väitetä korjatuksi ennen kuvia. Kääntyminen on todistettu vain b0cbcfa3a:lla; 8cdda6041 muuttaa vain dataa ja työkalua.

## 2. Täytteen tila
b0cbcfa3a katsottu (`lokit/tarkastelukuvat-b0cbcfa3a-075337`): 浴德殿, 四执库, 重华宫, 储秀宫 täysikoossa, muut arkeista `_tyo/pelikoodari/tayte/arkki-b0c-{1,2,3}.png`. Valo jatkuu seinästä täytteeseen, lehden alapaneeli ei enää tumma.
Kartta `_tyo/pelikoodari/kulkukartta/v10` (ovet samat kuin v9, 0 siirtynyt). `tyokalut/tayte_valo.py <kartta>` ajetaan aina kulkukartta.py:n jälkeen (se vain madaltaa, joten uudelleenajo ilman karttaa ei nosta), sitten `v10/ovet.json` kopioidaan käsin `Resources/JuoksuOvet.json`:iin.
Korkeus = tarkka ikkunan yläreuna + 0,35, alaraja 3,0. 重华宫 3,3, 浴德殿 3,5 (v9: 3,6), 四执库 3,2, 平房24 3,4 (v9: 5,35). 重华宫:n pätkien kohdalla seinä on tasainen V4_red (`tayte/rivit.py`), joten ne eivät ole geometriaa; leivottu varjo on päätelmä, atlaksesta ei mitattu. Mitta 0,33 m on arvioitu kuvan pikseleistä.
Ilman valoa 6, piirretään vanhalla täytteellä: 永和宫, 南库, 军机处, 绥寿殿, 益寿斋, 平房15. 南库 ja 军机处: kk-tausta-1-2:ssa ei valo_rgbm:ää. 平房15:n lähellä on leivottua V4_red:iä, syy auki.
Ilman kameraa: 房子11, 御景亭 (ovettomat, löysennysten jälkeenkin), 西暖殿 (ovi); 崇楼2 jää arkista KK:n luvalla. `viat` ikkuna: 皇极殿, 西暖殿.
Arkeista huomattu, tutkimatta: 延禧宫:n ovi harmaassa kivimöhkäleessä; 长春宫戏台:n oven läpi kulkee pilari; 四执库:ssa lehden alareuna roikkuu kapean jalustan yli; 绥寿殿:n täyte kirkas.
Työkalut ja kertaskriptit: `_tyo/pelikoodari/tayte/`.

## 3. Kaide
Sävykoe 7aca77c66 (`pelikoodari/kaide-savy-koe`): `_tyo/pelikoodari/kaide/kuvat`, ajo `lokit/esikatselu-20261105-075837` (poikkeusrivi on Unityn SearchDatabase, ei meidän). Kuvio palaa molemmilla, suositus a (0,42 0,50 0,62). Parit `kaide/pari-{lahi,kauko,terassi}-a.png`, rajaus `kaide/raja-lahi-ab.png`. Katsottu täysikoossa lahi a ja b, verrokki, kauko a, terassi b, taihemen a; kauko b, terassi a, taihemen b katsomatta.
**PT 08.1x, päätös:** "a hyväksytty pelin haaraan." "Haaleus: kaukokuvassa ja terassilta kaide jää lähes lattian väriseksi, joten kirjaa se avoimeksi; ei uutta sävykierrosta nyt. KK:lle ei näytetä, koska omistaja ei ole pyytänyt näitä kuvia; kaide menee junan tarkistukseen." PT katsoi parit pienennettyinä eikä arvioinut 25 m:n rajaa. **Avoin: haaleus** kaukana ja terassilta.
**TEKEMÄTTÄ:** sävy a vakiona (ei QA-kytkimen takana) omaksi committiksi pelin haaraan, kun JU:n ajo on valmis ja worktreen haaran saa vaihtaa. Haara on tulkintani: kaiteen korjaus on `pelikoodari/muurin-runko-219`:n (314cf6a97) varjostimessa, joten sävy sinne; koe 7aca77c66 on vain lähde. Ei junaan ennen omistajan pyyntöä. Solmuittainen piilotus peruttu (PT).
**Kaide ei ole valmis:** LOD2 mittaamatta. Lisää seuraavaan kaide-ajoon kamera, jossa g-jalusta on LOD2:lla (raja `Lod2 * LodKerroin`, varmista `valo lodtieto`-rivillä lokista), katso täysikoossa. Kk3-juuri tarvitsee rungon, jossa v124 (e73f5790f:n päällä).

## 4. Sen jälkeen
PT:n järjestys: täyte valmiiksi, sitten tk-taihemen-lod0:n syy (valkoiset pylväät ja ruskeat paneelit `tk-taihemen-lod0`:ssa, sama verrokissa; c2-sijoituksissa vain r = 2, todennäköisesti osasarjan kaukonippu, tarkistamatta).
Muurin muistisarja odottaa iPadia: omistaja 06.52 uudelleenkäynnistyksestä "Ei nyt". Kun iPad toimii, JU ajaa `_tyo/pelikoodari/muisti-ovet/sarja.zsh` (d9c, 789, 314; poista ensin tyhjä `-d9cde0f50-s1`) ja `juoksu.zsh`; varmista lokista, että botti juoksi. Tulos ja hajonta riviksi PT:lle. 789:n ja d9c:n ero on avoin, varjostinta ei kevennetä.
Ovimallin muisti iPadilla mittaamatta (PT 18.2x): raja 4080.

## Scratchpadit
Vanhat poistettu, kopio `T7 4TB/Claude-arkisto/pelikoodari-scratchpad-20261105`; PT:lle rivi lähetetty.
