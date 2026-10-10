# Linssiseppä 2 – luovutus 11.10.2026 klo 00.3x (PT:n nollaus, konteksti 55 %)

Rooli ja työkalut: viesti-linssiseppa2-luovutus-20261010-paiva.md (alkuosa). PT = PÄÄTOIMITTAJA (Opus, max), Julkaisija jakaa käännös- ja
simuvuorot (KÄÄNNÖS NYT / SIMULAATTORI NYT, lopuksi "lukko vapaa" / "SIMU VAPAA"). Pitkät ajot: `perl -e 'use POSIX setsid; fork and exit;
setsid; exec @ARGV' zsh <skripti>`. **ÄMPÄRIIN VAIN Julkaisijan vie-paketti.sh:lla** (_valmiit/<nimi>-vienti-<pvm>/ + SHA256SUMS + juuren
LAHTEET.md; ei aws s3 cp:tä; PT:n muistutus 10.10.). OMISTAJA 20.5x: Peking ja pyörimislinssi TAUOLLA (Olavinlinna, kippi, taidemuseo, kartta ensin).
Olet TAIDEMUSEON TEKIJÄ (PT 20.5x): museo valmiiksi ja toimimaan ennen omistajan seuraavaa katselua.

## MUSEON HARA: proto `linssiseppa2/museo-180` (worktree wt/proto-linssiseppa2-muisti), kärki **41886c1c1** (pohja natiiviseppa/juna-180 56edcb296)
Commitit: 528d8c281 51 teosta + SeinaValinta (seinäkuvat kävelijän ympäriltä 22 m / 60 Mt), cb917fecc QA `museo paikka x z yaw [pitch]`,
83f21ac7f saliääni, 69f77386e LR:n sali v2g (62 teosta, SaliKansio sali-v2g/), 0a85a7c72 KATSELUASENTO (KIIRE), 78628b3d9 kertoja, 41886c1c1 kertoja v2.
Tarkistukset kärjessä: Linssit Museo 27/27, unity-tarkistus 0 virhettä. Junaan 181 (PT).
Ämpärissä: teosten ASTC 42 (34 suoraan viety, ETag-tarkistettu; loput 8 Julkaisijan vie-paketilla _valmiit/taidemuseo-alankomaat-v2g-vienti-20261010,
vienti/tarkistus käynnissä, arvio ~01.30), sali-v2g, aanet/taidemuseo-soundly-v1/sali-belgrad.mp3, aanet/taidemuseo-kertoja-v2 (33).

## JONO (PT 00.3x, tässä järjestyksessä)
1. **KAMERA (KIIRE, omistaja TF 180 "taulut liian kaukaa ja matalalta")** – KOODI VALMIS 0a85a7c72: MuseoKierros.Katseluasento (silmä
   teoksen keskikorkeudella, katse kohtisuoraan, etäisyys ulkomitoista: 60 % korkeudesta / ≤ 80 % leveydestä, keskipiste 47 % ylhäältä, lähin
   0,45 m, Sallittu), SovitaPysahdykset (avaus + kuvasuhteen muutos), MuseoTaulu: matalalla vaakaruudulla (< 520 pt) nimikyltti top 10 pt ja
   Otsikko/Leipä. Testi KatseluasentoKaikilleTeoksille (62 teosta iPhone 2,17 + iPad 4:3). PT puhuu "33 teoksesta": salissa on 62 ripustettua,
   kierros pysähtyy LR:n 11 kohdassa → kysy PT:ltä, pitääkö kierroksen pysähtyä jokaisella teoksella.
   TODISTE PUUTTUU: KÄÄNNÖS (Julkaisijan jonossa NUI 7890bdd22:n jälkeen) `zsh proto-3d/_tyo/linssiseppa2/museo-lapipeluu/kaanna-museo181.zsh`
   (41886c1c1 → lokit/linssiseppa2-app-museo181), sitten SIMU iPhone: `aja-teokset.zsh <UDID> <käännös-SHA>` (sk-museo-teokset.txt: kaikki 62
   teosta `museo teos N` + kierroksen Pieni katu ja Staalmeesters) → kuva-arkki PT:lle → juna 181.
2. **KERTOJA v2** – KOODI VALMIS 78628b3d9 + 41886c1c1: MuseoKertoja (MuseoSovitin.cs lopussa) lukee aanet/taidemuseo-kertoja-v2/manifest.json;
   pysähdys soittaa kerran (Puhe.Soita) ja kestää ≥ äänite + 1,5 s; Siirtyy/Poistu pysäyttää; Esittele-nappi soittaa pyynnöstä (puhesynteesi vain
   29 teokselle ilman äänitettä). Todiste läpipeluussa (aani kertoja-p01).
3. **ND v5g** (LR 23.5x): paketti nd3/v6k18 valmis (portti 0). SIMU A26BC7D0 ~12 min Julkaisijan "muut"-jonossa: `skriptit-20261009/vuoro-nd5g.sh`
   (irrota setsidillä), sitten `python3 -I skriptit-20261009/arkit-nd5g.py docs/raportit/kaappaukset/linssiseppa2-180-20261010` (kori rajattu e7/t01 ja
   IGN samoin) + mittaus `python3 -I skriptit-20261009/mittaa-parvis.py lokit/linssiseppa2-nd5d-klo13/pariisi/e7-ylha-pohjoinen.png
   lokit/linssiseppa2-nd5g-klo13/pariisi/e7-ylha-pohjoinen.png` → PT + kopio LR. Vertailu: IGN aukio 148/151/145, lyijykatto 159/164/165; v5d 140/146/142
   ja 171/175/172; v5f 104/109/116 ja 126/126/128 (hylätty, arkki 7f41b8235).
4. **SALIÄÄNI** – KOODI VALMIS 83f21ac7f (Aanisoitin.LinssiTaustat "museo-sali", voima 0,22 ≈ −36 LUFS, Belgrad, viety). Taso mitataan läpipeluusta
   (`aanitaso 4` ja `aani 12 sali-tausta` pysähdyksellä 2; ffmpeg ebur128 WAViin) → säädä voima, jos kertoja ei erotu tai tausta ei kuulu.
5. **LÄPIPELUU + VIKALISTA**: SIMU iPad ~20 min `museo-lapipeluu/aja-museo.zsh <UDID> <käännös-SHA>` (sk-museo-lapipeluu.txt: Linssit-nappi →
   Taidemuseo → Aktivoi oikeilla napautuksilla, kaikki 11 pysähdystä Seuraava-napilla, kortit, vapaa kulku `museo paikka`, Leiden, komerot,
   pilarivälit, grafiikkakabinetti, jalusta, Poistu → kartta → paluu; muisti-tarkka.log + kehysajat.jsonl kopioidaan, simu sammutetaan).
   Video (simun ruutu) + äänet (aani-WAVit) yhdistetään ffmpegillä (-fflags +igndts) lyhyeksi äänelliseksi videoksi PT:lle.
   Vikalista: UI → NUI (muoto: näkymä, havainto vs. odotus, skenaario, todistekansio, haara/SHA; NUI tekee rebasen museo-180:n päälle, koska
   MuseoTaulu.AsetteleNimi muuttui), mallit → LR (sali, mitä näkyy, kuvan polku; LR:lle lähti ennakkolista, v2g korjasi 11 tyhjää paikkaa + jalustat),
   äänet → PT/Pelikoodari. Kuittausrivi museon erästä PT:lle → juna 181.
Tunnettu: vapaaseen kulkuun siirryttäessä kamera putoaa pysähdyksen silmäkorkeudesta 1,6 m:iin (Yövartiolla ~1,4 m hyppy) → harkitse liukua.

## MUUT ODOTTAVAT
- LR:n Pariisin korttelit v2 (_valmiit/pariisi-korttelit-v2) museon jälkeen: OmatMallit tukee vain YHTÄ leikkausrengasta/kohde → lisää
  "leikkaukset" (useita renkaita, CesiumOmatMallit.Polygoni per rengas) omaan haaraan + paketti + pelikuvat Concorde/Louvre/Eiffel (saumat, portikko).
- Peking (kierros 4, LR v6) ja pyörimislinssi 2b (51b4342e4) TAUOLLA omistajan päätöksellä.
- Takaa kaakosta -vertailukuvat: proto-3d/_tyo/linssiseppa2/nd-takaa-vertailu/ (LAHTEET.txt; IGN-orto kopiona).
