# Valosepän luovutus 6.11.2026 klo 19.00. Itsenäinen: vanhoja luovutuksia ei tarvitse lukea, paitsi kohdan 4 viittaus

Tili vvi@vvi.fi, sessio local_fa464945 (osoitekirja). Ajoja ei ole käynnissä minulta. Kuvat vain KS:n yhteisessä ajossa, ei omaa ajoa; käännös JU:n vuorolla.
Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup`. Työpuut: `wt/proto-linssiseppa2-k17` (kovat-varjot), `-k31` (usva-viisto), `-k32` (maalattu-taivas). k30 poistettu, haara usva-jalka on etässä. Enintään 3.
PT:n järjestys 18.49 ja 18.5x: usvakoe → maalattu taivas → ääriviiva → yksi iPad-mittaus. Kuvat PT:lle ennen KK:ta. Mikään näistä ei mene junaan; varjoihin vaaditaan lisäksi mitattu iPad-luku ja omistajan sana.

## 1. USVAKOE (omistaja 18.20): KOODI VALMIS, KUVAT ODOTTAVAT AJOA 30
Omistajan sanat: "Minusta tässä kulmassa ei tarvitsisi juuri näkyä usvaa koska horisontti on niin lähellä".
`b3bff978f`, `linssiseppa2/usva-viisto`, Y:n 92ea0a945 päällä. KS yhdisti Y:hen f95d9279d (ajo 30, JU:n vuoro origokokeen ja NUI:n jälkeen). Kuvat tulevat: `lokit/karttaseppa-yhteinen-30-b8-f95d9279d/uv-*`, lista `_tyo/linssiseppa2/sk-usva-viisto.txt`, kytkin `viistousva 0|1`. KS ilmoittaa, kun valmis.
Tapa: `PariisiKallistus.ViistoSumu` ja `ViistoRuutu`: alle 55°:ssa usva alkaa ruudun yläreunan maapisteestä, loppu 1,6× tai enintään HorisonttiM; liukuu nykyiseen 75°:een mennessä. 75° ja matalammat täsmälleen ennallaan (testi). PariisiKallistus 20/20, unity-tarkistus 0. Arvot 1,6 ja 0,7 ovat omiani.
Seuraavaksi: katso `uv-louvre-45-nyt/koe`, `uv-nd-*`, `uv-kaupunki-45-*`, `uv-nd-85-*` (85:n pitää olla sama). PT:lle pari + kerrottuna mitä yläreunassa näkyy: kartan reuna, nimet, kyltit, lisäpiirto. Jos reuna tulee näkyviin, kerro, älä piilota. Rinnalla omistajan "vielä loivemman" 10.29 (lukee PariisiKallistus.PehmeaLiuku-kommentissa).
Odotettu: 45°:ssa taivasta ei näy lainkaan, koska yläreuna on maassa (+20° vasta 85°:ssa). Tarkista lataussäde ja rakennusten raja, niitä ei ole tarkistettu.

## 2. MAALATTU TAIVAS (omistaja 18.49, #2178 "Kokeillaan"): KOODI VALMIS, EI AJETTU
KK:n välittämät sanat: "pitäisikö kuitenkin olla ihan kaunis sininen taivas jossa pilvet mutta hieman sävyteett"; "Paras olisi noiden kahden väliltä"; "Pilvet liian teräviä"; "Saisi olla enemmän maalauksen kaltaisia". Tavoite: kallistetulla kartalla rauhallinen maalatun näköinen sininen taivas, joka pysyy maailmassa paikallaan kameran kääntyessä; kaupunki sulautuu horisontissa kermaan ilman rajaa; kaupunki on pääasia.
`38ab4d14d`, `linssiseppa2/maalattu-taivas`, f95d9279d:n päällä, `wt/proto-linssiseppa2-k32`. Lista `_tyo/linssiseppa2/sk-taivas-maalattu.txt` (7 kuvaa `mt-*`) KS:lla ajoon 30 jos ehtii, muuten seuraavaan. Kytkin `taivas kartta maalattu 0|1`. unity-tarkistus 0; VARJOSTINTA EI OLE KÄÄNNETTY NEKÄ AJETTU: katso Shader error ja virheet ensin. `tarkista.sh` ajamatta.
Tapa: `Karttataivas.cs` + `Resources/Karttataivas.shader`: säde kameran koordinaateissa, ylös/pohjoinen/itä maailmasta (Aurinko kirjoittaa `MaanKeskus`, `NapaSuunta`, `PariisiOsuus`). Vain Pariisissa, muualla liukuväri. Kaukotasossa `ZTest LEqual`, joten rakennukset jäävät eteen; mallit (3080) sen päälle, usva läpinäkyvyytenä (db7bc0d30). Reuna: 2° häivytys kermaan. Kuva `KarttataivasMaalattu.png` 4096×320 ASTC 6×6, ei mipmappeja, tehty `_tyo/linssiseppa2/tee-taivas.py`: Codexin luonnoksen puhtaista alueista 4 peilattua paria.
Riskit: `KuvaKerroin` (1,21; 1,19; 1,14) on arvio sävykäyrän hyvitykseen: mittaa ruudun väri (tavoite yläreuna #a8bbce, horisontti #e6e2ca) ja korjaa. Toisto näkyy kääntäessä. Kuuluuko pohjoinen oikein: `mt-*-292` ja `-092`.
KK:lle lähetetty muoto Codexille: 8192 × 640, vasen reuna pohjoinen, alin rivi 0°, ylin +28°, alin 2° kermaan, värit ruudun mukaan; +20° ylimmillään; muisti ARVIO 2,3 Mt. Kuva tulee KK:lta tilattuna.

## 3. KOVAT VARJOT JA ÄÄRIVIIVA: KYLLÄ PT:LTÄ, TOTEUTUS ALOITTAMATTA
PT 18.5x: "tee ääriviiva esilaskettuna, sen jälkeen yksi iPad-mittaus JU:n vuorolla". Vaatimus PT:ltä: "Parissa näkyvät varjot koko kohteesta, S-C:n kirkon varjo mäen alla, ND/SC/GP:n reuna ja Eiffelin aukot; kuvat minulle ennen KK:ta."
Lasku: `_tyo/linssiseppa2/kovat-varjot/aariviiva.py`, tulos `ajo28/aariviiva-tulos.txt`: 246 911 → 953 kolmiota 1 m:n toleranssilla (Python-arvio, ei toteutus). Lista ja arvio KK:lla: `ajo28/LISTA.md`, lähikuvat `ajo28/lahikuvat-2x.png`. KK:n sanaa lähiympäristöstä ei ole tullut; ei korjata ennen sitä.
Toteutus: pohja `0ca5f68f6` (k17, `KovaVarjoGeometria`, `KovaVarjo`, `Nahtavyysalue.cs`, `OhjelmaKohteet.cs`, puut). Esilaskettu ääriviiva tiedostona mallin rinnalla; kolmiointi esilaskussa tai ajossa, päätä. Reiät mukaan; alle 4 m² saaret pois. Uudelleen yhteisen ajon pari kaikista kohteista.
Sacré-Cœur: varjo jää mäen alle, koska varjo on tasossa y = 0 ja mäki sen päällä: nosta tai piirrä mäen päälle; ratkaisua ei ole.
ND/SC/GP:n rosoisuuden syy todentamatta; ääriviiva todennäköisesti korjaa (ei todistettu).

## 4. VANHAT ODOTTAVAT
Luovutuksen -1826 kohta 6 (`git show origin/linssiseppa2/luovutus-20261106-1826:docs/raportit/viesti-valoseppa-luovutus-20261106-1826.md`): lippu, paletti, räystäs, Puu-3, siltakuvat. `us-nd-85`:n tummat merkit selvittämättä. Les Hallesin kyltti suljettu.

## TEKNIIKKA
zsh: `"${C}:refs/..."`. Python + PIL `/opt/homebrew/bin/python3`; numpy ja cv2 `_tyo/venv-rembg/bin/python -I`. `sh ./unity-tarkistus.sh`. Seuraamattomat `.claude/settings.local.json.ennen-kevennysta` ja `waveletNoiseTile.bin`: ei koskettu. Lukematta Raamatusta: luku 2 linssikohdat ja suurin osa 6:sta ja 12:sta tässä sessiossa.
