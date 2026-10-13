# Linssisepän luovutus 13.10.2026 klo 21.30 (TILINVAIHTO)

Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Ajot: ketju `ajo-<nimi>.zsh` kansiossa
proto-3d/tyokalut/linssiseppa-ajot/; Julkaisija antaa `kaannos-<nimi>.nyt` / `simu-<nimi>.nyt`; irrotus perl setsid; ilmoita LUKKO VAPAA ja SIMU VAPAA.
Testit `nice -n 15 sh Linssit-testit/kaanna.sh`, `nice -n 15 zsh tyokalut/tarkista.sh | grep "virheitä yhteensä"`. Edellinen: -20261013-2000.md.

## 1. KUITATTU TÄSSÄ SESSIOSSA (junaan 188)
- **Vesi index-v18** `linssiseppa/vesi-v18-188` ce8f49cdb (Sevilla v3, Sofia v3, Lissabon v2; Tampere ennallaan): PT kuittasi, ämpärissä 20.18, NS:llä.
- **Vesi index-v19** `linssiseppa/vesi-v19-189` 8f6273082 (= v18 + Sevilla KS vesi-v5 `sevilla3`): PT kuittasi 21.3x, ilmoitettu NS:lle.
  Vienti `_valmiit/vesi-v19-vienti-20261013` pyydetty Julkaisijalta 21.32 → TARKISTA, että ämpärissä (vesi/index-v19.json 200).

## 2. KESKEN: OMISTAJAN MUSEOPALAUTE TF 187 (PT 21.0x, menee Ranskan edelle, junaan 188)
Haara `linssiseppa/museo-palaute-188` **f7679f89d** (natiiviseppa/juna-188 f9170af15 päällä), wt /Users/Shared/Claude/wt/proto-linssiseppa-palaute188.
Käännetty **d150d7229** (21.26), appi lokit/linssiseppa-app/palaute-188. Simu `ajo-palaute188.zsh` ODOTTAA `simu-palaute188.nyt` (Julkaisija luo LS2:n
rodin4:n jälkeen): iPhone pysty + iPad vaaka (sk-palaute188-{iphone,ipad}.txt) → lokit/todistus-palaute188-{iphone,ipad}-*.
Toteutettu (testit 1744/1744, unity 0):
1. Ylivalotus: MuseoValaistu AgX-polku – pehmeä polvi 0,7→0,95 ennen SavyAgxKaanteinen ja globaali _MuseoTeosValotus = 2^−MuseoEV
   (MuseoNayttamo.KaytaSavy). NS vahvisti diagnoosin ja järjestyksen. Kuvat v1 (AgX) / v2 (agx 0) / v3 (museo 0 EV) / v4 (+0,6 EV): teoksen pitää pysyä samana.
2. Kertoja metrolistan jälkeen: VAIN syy lokiin ("museo: kertoja <id> ei alkanut (…)" / "odottaa: lista tauottanut") → katso simun konsolista
   (kuva k1), korjaa syyn mukaan (todennäköiset: Puhe.Paalla, pinnaus tai KertojaTauolla).
3. Rinkula → luenta suoraan ilman lappua (MuseoTaulu.Kohdat: kkLukija.Paina, kortti piilossa); uusi napautus/ohinapautus pysäyttää.
4. Rinkulat 0,85 → 0,5 (avoin 0,9), hehku hillitympi, väri InkLight→Kehys.Kulta 35 %.
5. i-nappi: OHJAUSNAPPI harmaa-kuulto (vedos 2) + uusi luokka `.mk-ohjausnappi__kirjain` (ohjausnappi.uss); paikka AINA kankaan yläreunan yläpuolella
   (MuseoKohdat.NapinYla/NapinVasen, sivuun otsikon/☰:n kohdalla, lähikuvassa piilossa).
6. Astu sisään: tk-teema-harmaa-kuulto + `.mk-museo-astu` (Linssit.uss: nappi-reunus, kuvakeväri), teksti keskellä.
7. Näyttely ovelta ULKOA: MuseoKierros.Ovensuu `Ulko` (OviUlosM 3,5 m oven ulkopuolelta, kävely KavelyMs ovelle + liuku, ~5–7 s).
**SIMU 21.43 (iPad vaaka OK, lokit/todistus-palaute188-ipad-*; kuva-arkki lokit/palaute188-pt/):** 1 Vermeer ei puhki, museo 0/+0,6 EV: teos sama ✓;
3 rinkula → luenta alkoi ilman lappua ✓; 4 himmeät ✓; 5 i-nappi kankaan yläpuolella ✓; 6 Astu sisään läpinäkyvä, keskellä ✓; 7 ruutusarja ovelta ✓.
2 KERTOJA: yv-salin teoksilla (mauritshuis-840/-670) EI äänitettä (manifest taidemuseo-kertoja-v2: 33 id:tä, vain SK-C-5 tästä salista) →
kertoja ei ala, eikä uusi syyrivi tulostu (kertoja.On false). Ehdotus PT:lle: äänitteettömälle teokselle esittelyn luenta kertojan äänellä
(KortinLukija) tai lisää äänitteitä. iPhone-ajo epäonnistui skenaariovirheen takia (Kunniagalleria listan alla) → uusinta palaute188b
(ajo-palaute188b.zsh odottaa simu-palaute188b.nyt, sk-palaute188-iphoneb.txt: Grafiikka-rivi).
Seuraava: katso kuvat → korjaa → kuva-arkki PT:lle (iPhone pysty + iPad vaaka: Vermeer ennen|jälkeen, Yövartio i + rinkulat, Astu sisään, ruutusarja o1–o4).
HUOM: uudet USS-luokat (.mk-ohjausnappi__kirjain, .mk-museo-astu) mainitse PT:lle (UI-pohjasääntö: pieni laajennus olemassa oleviin pohjiin).

## 3. KESKEN: RANSKAN TAIDEMUSEO
Haara `linssiseppa/museo-maa-188` **a29af6561** (= LS2:n linssiseppa2/museo-ranska-rodin2: sali-v2d + Kolme haamua, 8 veistosta, 57 pysähdystä).
Omat committini: 9fecfada9 (taivaskupoli MuseoRakennus.LataaTaivas + MuseoTaivas.shader, kulta 184/152/96, SK:n 51 teosta, näyttelyvalinta maan mukaan),
b6fd6de62 (v2b), 427bd1a04 (v2c ev100). LR:n paketit v2/v2b/v2d ämpärissä (v2d: tarkista Julkaisijalta); json-kopiot _tyo/linssiseppa/taidemuseo-ranska/.
- Teosten ASTC VALMIS 21.00: `_valmiit/taidemuseo-ranska-teokset-astc-v1-vienti-20261013` (51, 1,0 Gt) → vienti pyydetty 21.32 → tarkista astc-v1/orsay-rf-2739/teos.json 200.
- Simu `ajo-ranska188b.zsh` käynnissä odottamassa (LS2:n appi rodin3 = 9fecfada9, sha-ranska188b.txt 554c12de3, odottaa sali-v2 + ASTC ämpärissä
  ja simu-ranska188b.nyt). HUOM: appi on vanha (sali-v2) → parempi kääntää a29af6561 uudelleen ja vaihtaa APP/SHA ennen ajoa.
- Avoimet: Ranskan nayttelykuvat/<huone-id>.jpg ja kunniagalleria-panoraama (salikuvat s-* simusta → 256² + 1600×1200, panoraama 2048×1024);
  lahestyminen.json teksti (SK:n infolappu odottaa hyväksyntää); Ingres jää romantiikkaan (SK vahvisti).

## 4. KESKEN: VESI TAMPERE (KS)
- vesi19c (KS Tampere v6: vesi katkaistu OSM-patoviivoilla) jonossa: `ajo-vesi19c.zsh` odottaa simu-vesi19c.nyt (paikallinen juuri scratchpad
  vesitesti19, palvelin 8787 käynnistyy ajossa; tiedosto tampere5). Vertaa vesi19b:hen (tamp19b.jpg) ja v17:n ennen-kuvaan (kivikko näkyi).
- Särkänniemen vaalea läiskä jää (Googlen pinta Näsijärven tason yllä); PT: käsitellään v6:n kanssa. KS tarjosi Näsijärvi +1,0 m.
- Hyväksyttävä Tampere → index-v20 kuten v19 (tampere3-nimellä tuotantoon).

## 5. MUUTA
- Worktreet: proto-linssiseppa-{palaute188, museo188, vesi187 (haara vesi-v19-189)} + vanhat.
- tools/gpu-vapaa.sh checkoutissa seuraamaton (ei minun, älä committaa).
