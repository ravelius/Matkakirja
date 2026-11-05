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

## LISÄYS 08.15: kuvat katsottu, KK:lle lähetetty, sävy committina
Kohta 1 tehty: `lokit/tarkastelukuvat-8cdda6041-080843`; 重华宫 ja 浴德殿 täysikoossa, muut arkeista `_tyo/pelikoodari/tayte/8cd/arkki-8cd-{1,2,3}.png`, rajaukset `8cd/raja-{c,y}.png`. 重华宫:n pätkät poissa. **浴德殿 ei korjattu:** täyte yhä seinää vaaleampi, teräväreunainen laatta, syy auki. KK:lle lähetetty 08.1x (jonossa, ei vahvistusta luetuksi): arkit, muutokset, täyte, viat ja ovettomat syineen. 1341826243:lle ei ole syytä `tulos.json`:ssa. Odota KK:n vastausta ennen täytteen jatkoa.
Kohta 3: sävy a committina c1d985643 haarassa `pelikoodari/muurin-runko-219`; QA-kytkin jäi, oletus on a. Ei käännetty tällä haaralla, ei junassa. Worktree palautettu `pelikoodari/tarkastelu-219`:ään. LOD2 ja haaleus yhä avoimia.

## LISÄYS 08.43: KK:n palaute 8cdda6041:stä, korjaukset 4373fd9fe (kartta v11), kuvat JU:lla
KK: malli ja sijoitus hyvät, "Jatka täytettä", ei junaan, seuraava arkki KK:lle, kun A ja B tehty. Lista 224, kansio tulee JU:lta. Työkalut `_tyo/pelikoodari/tayte/8cd/` (jalki.py nimi… = kaikki ovikokeilut, OMAT=1 = omat portaat; profiili.py; tila.npz jalki/-kansiossa; kaikki.py tekee kaikki.npz:n, 600 Mt, poistettu).
A/浴德殿: täyte 0,88 m seinästä, koska peitto-oven täyte oli kivijalan eteen siirretyn oven tasossa (e, enintään 0,62). Nyt `tsy` vie täytteen takaisin (36 ovea). Vaaleus: räystäsliuku on hypoteesi, todentamatta. Katso kuvasta, katoaako. Muut A:n kohdat tekemättä: 6 ilman valoa, 延禧宫 kivimöhkäle, 长春宫戏台 pilari, 四执库 lehti, ikkunat 皇极殿 ja 西暖殿.
B1 太极殿: nyt oma aukko (`puu_edessa` oma=True: lehtien ohi oven levyinen väylä). Muualla: omat hylätty 10 rakennuksella, viisi syynä räystäs (钟粹宫, 长春宫, 体和殿, 咸福宫, 怡情书史), näitä ei korjattu. KK:lle väitetty 10 samalla sivulla ja 24 kaikkiaan, joukossa voi olla vääriä.
B2: OVI_VALI 8 m; ensin muualle, sitten aiempi, viimeksi sinne. v10: 5 paria alle 8 m, v11: 0. Siirtyi 7: 太极殿, 房子26 (37 m, katso), 敬胜斋 (16,5), 房子4 (18), 房子6 (22,7 ja nyt pieni ovi sk 0,7), 平房11, 房子9. Kaikki kartan muut samat.
B3: PT antoi LAV:lle, ei minun. B4 弘义阁: laatat ovat kk-tausta-1-1-lod0:n V4_lattia, päällys y 0,81, x −91,5…−80,3, z −116,3…−109,8, samassa kohdassa V4_marmori; **KK:lle vastaamatta**, ja "irto-osiin" tarkistamatta.
C: 东所: piha suljettu (R tyhjä, T1 0), etusivua ei kokeiltu. KK:lle kerrottu, samoin 如意馆 ja 1341826243 (3 × 3 m pohja, luultavasti 竹香馆). Listassa käsin kamerat 西暖殿-kaukaa, 房子11-etela, 御景亭-etela: voivat osua esteeseen.
Sävy a c1d985643 kuten edellä; kärki 4373fd9fe ei sisällä sitä.

## LISÄYS 08.52: ajo 4373fd9fe katsottu, seuraava lyhyt ajo JU:lla
`lokit/tarkastelukuvat-4373fd9fe-084323`, arkki `8cd/arkki-437-1.png` (katsottu arkkina), täysikoossa 房子6, rajaus `8cd/raja-y2.png`.
浴德殿: täyte sulaa seinään selvästi paremmin; vasen kaista on yhä vaaleampi ja sen oikealla pystyviiva: tutkimatta (pieli täytteen edessä?). Räystäsliuku yhä todentamatta. 太极殿 omilla portailla, näyttää ehjältä.
房子6: väistö teki huonon: pieni ovi kapeassa kujassa, lehdet lähes kiinni, alareunassa tumma rako. Siksi 74f1f2aad: toinen kierros vain samankokoisena; 房子6 palasi, 房子2 siirtyi 4 m, parit alle 8 m yhä 0. Kuvaamatta: lista 225 (kärki `git log -1`), pyydetty JU:lta.
**Uusi vika:** 西暖殿: kuvassa `ovi-西暖殿-kaukaa` portaat vievät tyhjään seinään, ovea ei näy (ovi y 2,0, z 398,39). Syy auki, epäily: ovi seinän takana. Oli jo v10:ssä, koska kameraa ei ollut.
Epäonnistuneet käsikamerat: 御景亭-etela (puut edessä), 房子11-etela (pelkkä seinä, lattia tumma). Yritä toisesta suunnasta.
ovi-凝香亭: mittaus aikakatkaistu 120 s, sama kamerarivi toimi 8cdda6041:ssä; syy auki. `tarkastelu_kuvat.sh` tulostaa nyt VIKA, jos lokissa on PUUTE.
KK:lle 08.5x lähetetty tila; arkki vasta kun A ja B valmiit. Seuraavaksi: A:n loput, 西暖殿, B4:n irto-osat.

## LISÄYS 09.02: omistaja 08.33 "Kelpaa" ovien ulkonäöstä; korjaukset 380664d56 (kartta v12), kuvat JU:lla
Omistajan kortti KK:n kautta: ulkonäkö kelpaa, kun viat on korjattu; jatka; seuraava arkki KK:lle → omistajalle; ei junaan.
Lista 226 (41 ovea, runko 380664d56) pyydetty JU:lta. Kansio tulee riviksi. Sitten arkki: `_tyo/pelikoodari/tayte/arkki.py <kansio> <etuliite> 3`.
西暖殿: ovi oli 1,4 m ulkoseinän (z 399,75) takana mallin sisäkujassa ja portaat seinän läpi, koska porrastarkistus astui 0,5 m (seinä 0,25 m). Askel nyt V. Viimeisenä keinona `nakyva(..., kierros=1)`: seuraava tason 1 alue seinän takana. Uudet ovet samalla: 房子11, 如意馆; kuvista katsottava. Muut kartan ovet samat kuin v11 (kaikki_ero.py), paitsi 长春宫戏台.
长春宫戏台: pylväs oven keskellä; W > 6,5:n aukossa ovi lähimpään väliin.
四执库 ja muut kapeat jalustat: lehden kulma `Asin((syv − 0,17 − 0,1) / pit)`, ettei lehti ulotu jalustan ohi; alaraja 20° ennallaan, joten syv 0,5 (26 ovea) voi yhä ylittää noin 8 cm. Koodi käännetty vasta tässä ajossa.
Täyte: 永和宫 ja 平房15 saivat leivotun seinän mediaanin 8 m:n säteeltä (tasainen). 南库, 军机处, 绥寿殿, 益寿斋: alueella ei leivottua V4_red:iä, joten ilman valoa, kunnes malli leivotaan (ei minun).
延禧宫: malli on kivirakennus (tyyppi ruins), ovi seinässä; ei muutettu, kerro KK:lle.
弘义阁 (B4): y 0,81 -laatat EIVÄT ole LAV:n irto-listalla `linnanrakentaja/muuri/irto/lista.csv`; viereinen y 1,74 (ruutu 1-1, x −93…−90,5) on. Yleinen korjaus ei siis listan mukaan kata niitä. KK:lle vastaamatta.
Yhä auki: 浴德殿:n vasen kaista ja pystyviiva, 皇极殿:n ikkuna (viat 1), 御景亭 ei ovea.
