# Natiivisepän luovutus 11.11.2026 klo 10.04

Edellinen: -0936 (8d4eaa74c, lisäykset 1–3) VOIMASSA paitsi alla päivitetyt. Syy: kontekstivahti 26 % (7.37).
Cron (klo 9.04 unity-julkaisut.py, tyokalut/natiiviseppa-skriptit/) ja vahti sessiokohtaisia: LUO UUDELLEEN. Vahti: Monitor
`bash /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/ajovahti/vahti.sh` (kattaa natiiviseppa-saapuminen-*, -laattalataus-*, -juoksu-*).
iPad TOIMII taas (JU 09.5x). JU:n iPad-järjestys: ruutunopeus ennen → jälkeen → turhatyö → hahmovarjo → saapuminen-ipad-muisti-1/-2 → laattamuisti 1–3.

## 1. KÄRKI (PT 10.0x, omistaja 09.54): JUOKSUPELI, KAIKKI VARJOT LEIVOTTUINA, ELÄVÄ VAIN PELAAJALLA (työlistarivi olemassa)
- SELVITYS 1–5 LÄHETETTY KK:lle (kopio PT): _tyo/natiiviseppa/varjot/selvitys-1.md. Ydin: rakennusten/muurien/porttien varjot JO leivottu lattiaan (LAV),
  julkaistussa elävä päälle = tupla; 224.65 (41bbbc320) poistaa rakennusten tuplan. Elävinä jäljellä lähipuut, osasarjan instanssit ennen atlasta, hahmot.
  Puiden/rekvisiitan varjoja EI leivottu → LAV:n uusintaleivonta (puut varjostajiksi, kaikki paketit uudelleen) ennen kuin "vain pelaaja" oletukseksi.
  Salin aurinko vaihtaa suuntaa → salin valo elävänä (ehdotettu KK:lle). Ruutuaika jäljellä ~3–4 ms P1.
- PT:lle kysytty: LAV:n uusintaleivonta ennen vai jälkeen v133:n (LAV ehdottaa v133 ensin). ODOTTAA PT:tä.
- LAV:lle kerrottu: valokartat ladataan ASTC 4×4 (~1,4 Mt/kartta). LUVATTU LAV:lle rekvisiitan lista + paikat (nimi + x/z cm): HUOM ulkoesineet
  (ruukut, kala-allas) ovat VAIN QA-koe (JuoksuV4Maailma.Ulkoesineet.cs `esinekoe`), eivät pelissä → lista = lähipuut (lahipuut-v17 puut.json) + puukortit;
  kerro LAV:lle, ettei ruukkuja/kalusteita ole pelissä.
- KOODI 367ea7f0a (natiivi-backup natiiviseppa/juoksu-turhatyo, wt /Users/Shared/Claude/wt/proto-natiiviseppa-turhatyo, unity 0, oletukset ennallaan):
  JuoksuV4Maailma.Varjot.cs + Resources/JuoksuLaikka.shader: `valo elava pelaaja|kaikki` (VainPelaaja: muut Off, myös Muurikate.PiirraInst; AlkuVarjoMatka pois),
  `valo hahmovarjo elava|laikka|ei`, `valo laikka VOIMA KOKO` (0,45 / 1,6). Valo tila -rivillä näkyy.
- PARI KK:lle: ajopyynto-hahmovarjo.md (sk-juoksu-hahmovarjo.txt, V1–V3 × elava|laikka|ei jäädytettynä) JU:lla → lokit/natiiviseppa-juoksu-hahmovarjo-1.
  Kuvat täysikoossa, sama rajaus, parit/kolmikot KK:lle suoraan (kopio PT). Jos hahmoja ei näy kuvissa, testikamera/katse seuraavaan ajoon.
- SEURAAVAKSI leivonnan jälkeen: VainPelaaja oletukseksi + aloituslento ennen|jälkeen (arkki + tallenne) + 3 pelikameraparia isolla iPadilla → KK.

## 2. A-LUOKKA (turha työ) c28e4adb0 (sama haara): varjoläpikäynti vain uusille (+ "kappaleläpikäynti" lokiin 20 s välein, QA `valo kappaleet kaikki|uudet`)
ja heijastuksen kaukoraja 400 → 200 m. Ajo JU:lla: ajopyynto-turhatyo.md → lokit/natiiviseppa-juoksu-turhatyo-1 (H1/H2-200|400|200b + kustannusrivit).
Luenta: kuvaparit samasta kehyksestä (ero?) → jos ei eroa, junaehdokas (c28e4adb0 tai 367ea7f0a, oletukset samat) PT:lle pt-ok:ta varten; jos heijastuksessa
ero → B-luokkaa, KK:n sana (PT 10.0x). Kustannus: kaikki vs. uudet ms PT:lle.

## 3. RUUTUNOPEUS ennen|jälkeen (JU käynnistänyt uudelleen 09.5x; ennen-ajo kaatui allekirjoitukseen, korjattu): lokit/natiiviseppa-juoksu-ruutunopeus-{ennen,jalkeen}
→ python3 -I _tyo/natiiviseppa/juoksu-piirto/fps.py <konsoli.txt> → yksi luku KK:lle (mediaani ruutua/s ennen | jälkeen + huonoin 5 s), kopio PT.
- ENNEN VALMIS (JU 10.10, iso iPad, 15 min, R1 1, NRE 0). Laitteen kehysajat.jsonl EI kopioitunut (vanha 09.53) → käytä kehysajat-konsolista.jsonl
  (JU poimii saman myös jälkeen-ajosta). Luenta: python3 -I _tyo/natiiviseppa/juoksu-piirto/fps-konsolista.py <kansio>/kehysajat-konsolista.jsonl
  → ENNEN: 60 ruutua/s mediaani, huonoin 5 s 29,8 (lataus t 25–80 s), alle 30: 3 %, alle 20: 0 %, gpuMs mediaani 8,4 / p95 24,2, lämpö Normaali, akku 95→95
  (lokit/…-ennen/yhteenveto-ns.txt). Liike-kehysajat vain alussa (151 ruutua, 37 nykäystä, max 215 ms) → nykäyksiä ei voi verrata. "kulkukartta ladattu → PUUTE"
  10.03 = vanhassa rungossa ei riviä. SEURAAVA: jälkeen (224.65) samalla skriptillä → yksi luku KK:lle, kopio PT.

## 4. SAAPUMINEN: korjaukset 1–4 TEHTY c31deb71d (natiiviseppa/saapuminen-pariisi, wt proto-natiiviseppa-saapuminen), KK:lle kerrottu.
Syy 36,9–37,9 s vaaleaan: yläkuva 1,35 × korkeudella → Cesium valitsi karkeammat laatat. Nyt KoeYlhaaltaKerroin 1,0, KoeYlaKallistus 15°, odotus jyrkässä
näkymässä (SaapumisTerava + lähinäkymä + KaupunkiValmius, ≤ 3 s, lokirivi "jyrkkä alkunäkymä"), kuvat kiertävät odotuksessa (JatkaKuvia), iskulause 1/3 nimestä
LukuLihava (Introesitys.Nimi iskuNimenMukaan), KoeLaskuS 3 s. Mac-3 JU:lla (ajopyynto-mac-3.md, sk-taysi/natiiviseppa-saapuminen-mac-3.txt) → lokit/natiiviseppa-saapuminen-mac-3:
lue, leikkaamaton tallenne KK:lle (kopio PT), tarkista s3b (kuvat liikkuvat), s4/s4b (ei vaaleaa, ei ponnahdusta). iPad-muisti-1/-2 nyt c31deb71d → muistihuippu KK:lle (katto 3940).
- ÄÄNITTÄJÄ 10.0x: Pariisin uusi otto valmis (nimi-iskulause.mp3 3,5 s), media-URL https://media.matkakirja.app/aanet/kaupunkinimet-william-v1/pariisi/nimi-iskulause.mp3
  vasta viennin jälkeen (ääniportin venv-vika, PT tietää) → kun viety, KoeWilliamUrl siihen (PeliOhjain.SaapumisKoe.cs) ja seuraavaan ajoon.

## 5. LAATTAMUISTI 1–3 ennallaan (-0936 kohta 2), JU:n jonossa muisti-ipadin jälkeen.

## VIESTIT TÄLLÄ VUOROLLA
PT: A-luokka c28e4adb0; varjoselvitys + kysymys v133/leivonta. KK: saapuminen 1–4; varjoselvitys. JU: turhatyö, mac-3 + ipad-muisti sha, hahmovarjo. LAV: putkikysely + työnjako.
Äänittäjä: kuittaus.

## LISÄYS 10.1x: KK:N PÄÄTÖKSET varjoselvityksestä (kopio PT)
1) Työnjako OK: LAV puut (+ ruukut/kalusteet, jos pelissä – ks. kohta 1: vain QA-koe) varjostajiksi + uusintaleivonta, V133 ENSIN; "vain pelaaja" oletukseksi VASTA saman leivonnan kanssa.
2) SALI poikkeus hyväksytty: salissa valo elävä (aurinko vaihtaa suuntaa) – RAJAA VAIN SALIIN (VainPelaaja ei saa poistaa salin elävää varjoa; nyt kytkin poistaa
   kaikki → lisää salin rajaus: esim. Valopohja.SaliAurinko aktiivinen / salin piirtäjät EiHeita/VainVarjo-joukon kautta). PARI SALIN OVELTA: ei saumaa leivotun ja elävän välillä.
3) Hahmot: KK odottaa paria ei varjoa | läikkä (hahmovarjo-1).
4) Puun leivottu varjo: lehvästön läikikkyys säilyy (ei möykky) → pari yhdestä puusta läheltä (LAV:n leivonnan jälkeen).
5) Kaukaiset muurinpalat: elävä varjo EI saa syttyä/sammua valokartan latautuessa aloituslennossa; jos kartta ei ehdi, hetki ilman varjoa parempi kuin vaihtuva
   (VainPelaaja + Muurikate.PiirraInst Off kattaa tämän: tarkista aloituslennon tallenteesta).
Näyttö: aloituslento ennen | jälkeen + 3 pelikameraparia isolla iPadilla.
PT 10.1x vahvisti: v133 ensin, uusintaleivonta LAV:n seuraava työ; kytkin + hahmoläikkäpari ok, oletus vasta leivonnan kanssa.
JU 10.1x: turhatyö-ajo käyttää 367ea7f0a (c28e4adb0-käännös ei alkanut), hahmovarjo-1 samalla käännöksellä heti perään, laattamuisti niiden jälkeen.

## LISÄYS 4 (10.4x, sama sessio jatkaa: nollaus ei mennyt läpi, jonossa oli viesti)
- KK 2) SALIN RAJAUS TEHTY 450ae41d7 + salin ovi -lokirivi 84b5c1f0e (natiiviseppa/juoksu-turhatyo, unity 0, oletukset ennallaan): JuoksuV4Maailma.SaliJuuret
  (LisaaAvoimenKatto rekisteröi juhlasalit) → VainPelaaja ei koske salia; tila-rivillä "vain pelaajalla + salit N". Pari: _tyo/natiiviseppa/varjot/ajopyynto-salinovi.md
  (sk-juoksu-salinovi.txt: oleta "salin ovi sisään|ulos" → S1/S2 kaikki|pelaaja) JU:lla hahmovarjo-1:n perään → lokit/natiiviseppa-juoksu-salinovi-1 → pari KK:lle (kopio PT).
  Jos PUUTE (botti ei salissa 600 s) → kiinteä kamera (tarkastelu keisari x z yaw ei liikuta salin aurinkoa: tarkista ennen).
- LAV: varjostajalista lähetetty (lahipuut-v17/puut.json 5759 puuta + taustan V4_puukortit kaukoalueelle; ruukut/kalusteet vain QA `esinekoe`; lehvästön alfa leivontaan, KK 4).
- Cron (unity-julkaisut.py, polku /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/) ja vahti luotu uudelleen tähän sessioon.

## LISÄYS 5 (10.5x): OMISTAJA 10.15 → KK PERUI SALIN POIKKEUKSEN: sali leivotaan salin valosta, elävä vain pelaajalla (ei poikkeuksia)
- 450ae41d7 PERUTTU 690fb3ce7 (ovirivi 84b5c1f0e jää). salinovi-ajo JU:n jonosta pois → ovipari vasta LAV:n salileivonnan jälkeen (sk-juoksu-salinovi.txt käy sellaisenaan).
- KK:lle vastattu: kohta 1 (yksi leivonta salin valosta) riittää; vaihto näkyy ruudulla (0,5 s, koko aurinko kääntyy), mutta leivottuna vaihtuvat vain pelaajan varjo
  ja piirretyt valojuovat (osuus); katto varjostaa lattian molemmissa valoissa. Jos oviparissa oviaukon valo hyppää → kohta 2 (kaksi karttaa + ristihäivytys, NS).
  Linjattavaksi KK:lle: salin esteiden häivytys (sermi/pylväät) jättää leivotun varjon lattiaan. ODOTTAA KK:ta.
- LAV:lle: SaliAurinko 45°/70° salin kehyksessä (ValoKohteet.cs:260, Valopohja.SaliAurinko), yksi leivonta juhlasali.glb:n kehyksessä kaikille kopioille,
  katto + palkisto varjostajiksi, juovat ei leivontaan. LAV aloittaa v133:n jälkeen.

## LISÄYS 6 (11.0x): KK:n salilinjaus + kohta 3
- KK: 1) yksi salileivonta OK, kaksi karttaa vain jos ovipari vaatii; 2) esteiden (sermi/pylväät) varjot LEIVOTAAN ja jäävät häivytettäessä; 4) varjon kääntyminen ovella ei saa näkyä.
- KK 3) PELAAJAN VARJO LEIVOTUSSA VARJOSSA (koko peli): TEHTY 9e67b65a0 (juoksu-turhatyo, unity 0): VainPelaaja → Valopohja.JuoksuLattiaElava false = lattiallekin
  varjomaski (JuoksuLeivottuAurinko, raja 0,45 → pehmeä reuna); `valo elava kaikki` palauttaa. PARI LAV:n leivonnan jälkeen: auringossa | rakennuksen varjossa |
  puun varjon reunalla | salissa katon alla (+ ovipari sk-juoksu-salinovi.txt molempiin suuntiin, varjon kääntyminen ei näy). Asemataulu-hook ohitettu (jäädytetty).

## LISÄYS 7 (11.1x) — NOLLAUS TÄSTÄ (kontekstivahti 26 %)
- SAAPUMINEN mac-3 (c31deb71d) LUETTU, KK:lle tallenne (kopio PT): kuvat kiertävät odotuksessa, kuva → kartta tasainen ~0,3 s, kartta terävä, ei vaaleaa
  eikä ponnahdusta. PUUTE "jyrkkä alkunäkymä" = skenaarion 60 s aikaraja (rivi tuli heti perään). Mac ~9 ruutua/s.
- iPad MUISTI-1 (c31deb71d) LUETTU: huippu 3940 Mt (muistivahti OK, varoituksia 0) = täsmälleen KK:n katto 3940 → ilmoita KK:lle "rajalla" muisti-2:n kanssa.
  ODOTUS 28 s (häivytys peitteestä 28,02 s, 11 kuvaa): "lopullinen näkymä EI valmis (katto 25 s), kesken talot"; talojen verkkolataus loppui ~4 s peitteestä,
  silti talot kesken kattoon asti. Epäily: TaloKerros.valmiusKesken (palaPuuttuu = pala verkosta ei etene, tai muistikaton kasvu UlkoSade → aina lataus).
  DIAGNOSTIIKKA b70f19656 (syy lokiin: "kesken talot (pala verkosta|levyltä, lataus, näkyvyys x/y, katto N m)"). Muisti-2 (c31deb71d, JU ajaa nyt):
  jos odotus lyhyt → kylmän verkkolatauksen syy; jos taas 25 s → seuraava iPad-ajo b8e641712:llä ja korjaus syyrivin mukaan. KK:lle vasta muisti-2:n jälkeen
  (huippu + odotus + johtopäätös). PUUTE nimi/häivytys/kierto muisti-1:ssä = skenaarion oleta-ajoitus (tarkistamatta).
- ÄÄNITTÄJÄ: v2 viety → b8e641712: KoeWilliamUrl oletus kaupunkinimet-william-v2/<kaupunki>/nimi-iskulause.mp3 (HTTP 200 tarkistettu). Haara natiiviseppa/saapuminen-pariisi:
  c31deb71d → b70f19656 → b8e641712 (unity 0).
- KESKEN/ODOTTAA: ruutunopeus JÄLKEEN (224.65, JU) → fps-konsolista.py → KK; turhatyo-1 + hahmovarjo-1 (367ea7f0a, JU) → parit KK:lle; LAV:n leivonta v133:n jälkeen
  → kohta 3 -pari (aurinko | rakennuksen varjo | puun varjon reuna | sali) + ovipari (sk-juoksu-salinovi.txt; käännös 9e67b65a0 tai uudempi juoksu-turhatyo).

## LISÄYS 8 (11.11. 11.10): OMISTAJAN PÄÄTÖS 11.09 (PT:n välitys) — juoksupelin peruskorjaus alkaa, KK lukee koodin (ensin drone/kamera)
- Kesken olevat loppuun: varjokytkimet (367ea7f0a), läikkäpari (hahmovarjo-1), pelaajan varjo leivotussa, A-luokan turha työ (c28e4adb0), ruutunopeus JÄLKEEN.
- EI uusia juoksupelin ominaisuuksia, EI mitään kameraan/droneen ilman KK:n määrittelyä. Siksi kohdan 1 "SEURAAVAKSI":
  VainPelaaja oletukseksi vain varjojen osalta; AlkuVarjoMatka (alkulennon varjomatka) jää ennalleen, kunnes KK määrittelee.
  Aloituslento ennen|jälkeen -pari otetaan vain kuvana (ei kamera-/lentokoodia); 3 pelikameraparia nykyisellä kameralla.

## LISÄYS 9 (11.11. 11.1x): saapuminen iPad MUISTI-2 (c31deb71d) LUETTU → KK:lle viesti
- Muistihuiput muisti-tarkka.logista: muisti-1 3253 Mt, muisti-2 3398 Mt (alle katon 3940). KORJAUS lisäykseen 7: "3940" tuli vanhasta
  muistivahti-tulos.txt:stä (klo 09.53 molemmissa kansioissa) → ei rajalla. JU:lle kerrottu.
- Odotus 28,05 s (kylmä) ja 28,15 s (napautus): "lopullinen näkymä EI valmis (katto)", lähinäkymä kesken, kesken "-"; jyrkkä alkunäkymä EI valmis 3 s
  (pallo 45,7 % / 99,7 %, piirros puuttuu 0/28). Talojen muistikatto ei kasva odotuksen aikana (talot muisti -rivit vasta myöhemmin) → epäily muistikatosta heikko;
  ei kylmän verkkolatauksen syy (napautuksessakin 28 s).
- SEURAAVAKSI: JU ajaa _tyo/natiiviseppa/saapuminen/ajopyynto-ipad-muisti-3.md (b8e641712, syyrivi) → korjaus syyn mukaan → KK. Saapuminen = Kaupungit-kärki, ei juoksupeliä.

## LISÄYS 10 (11.11. 11.4x): KK:n mac-3-palaute (SUUNTA OIKEA, EI JUNAAN VIELÄ) → saapumiskoe 4 d7a60539d (natiiviseppa/saapuminen-pariisi, unity 0, kameratesti 70/70)
- 1) tummennus liukuu 0,5 s (TraileriTausta.Alku liukuS, Introesitys.PehmeaTummennusS); 2) UiNakymat.SaapumisPiilo: yläpalkki, Turisti-info, luennan Ohita,
  maakyltti, pulu, nostot piiloon peitteen ajaksi (kuten lento), takaisin häivytyksessä; 3) ristihäivytys 1 s (Introesitys.PehmeaHaivytysS; pysäytyskuvan kopio
  häipyy elävän kartan päältä, TraileriTausta.HaivytaPysaytys); 4) kamera seisoo häivytyksen ajan, KiertoOhje.KallistusAlku 0 (oletus 0,2 = aloituslento ennallaan),
  AlkuS = KoeKiertoKiihdytysS 1,5; 5) lokiin "kallistus alkaa … X° → 45°, kesto" ja "kallistus valmis … X° → Y°".
- 6) asettelu (luennan Ohita Turisti-infon päällä, luentapalkki valkoisen napin alla) → NUI:lle 11.4x. KK: älä muuta kuvien kiertoa eikä nimen animaatiota.
- JU: ajopyynto-mac-4.md (sk-mac-saapuminen-4.txt, kuva s5b-kartta kohtaan 6) jonoon; iPad muisti-3 (b8e641712) jonossa ennallaan. KK:n ehto: iPad-muisti JU:lta yhä.
- tarkista.sh pysähtyy pohjavahtiin (vanhat rivit muissa tiedostoissa, myös Introesitys fontti 1 c31deb71d:stä) → valo/liike/kameravahti ja kameratesti ajettu erikseen: omat tiedostot puhtaat.

## LISÄYS 11 — NOLLAUS TÄSTÄ (kontekstivahti 25 %). JATKA NÄISTÄ:
- NUI kohta 6: syy (a) Luentakuvasarja.Kaistale = M-napin laatikko kaupunkinäkymässä → Ohita Turisti-infon päälle; korjaus NUI:n seuraavalta vuorolta d7a60539d:n
  päälle (NUI luovutus 237004290). (b) luentapalkki M:n alla: NUI selvittää s5b/mac-4-kuvista.
- JU:n jono: 1) saapuminen-mac-4 d7a60539d (jonossa 11.24) → lue lokit/natiiviseppa-saapuminen-mac-4: oleta-rivit, "kallistus alkaa/valmis" -kulmat, s1 (UI häipyy),
  s4 (ristihäivytys), s4b (kallistus levosta), n1 (yksi Ohita) → KK:lle video + arkki (kopio PT). 2) iPad muisti-3 b8e641712 → syyrivi "kesken …" → korjaus.
  3) Ruutunopeus JÄLKEEN (MR58 = 224.65 a61a98089 linkissä 11.24) → fps-konsolista.py → KK (ENNEN 60 / huonoin 29,8).
- Juoksupeli: omistajan päätös 11.09 (lisäys 8) — vain kesken olevat varjotyöt, ei kamera/drone-muutoksia.

## LISÄYS 12 (11.11. 11.36, uusi sessio local_0f7f169f): mac-4 + ruutunopeus JÄLKEEN luettu
- MAC-4 (d7a60539d): kohdat 1–5 ok (UI häipyy/palaa, kallistus 15,0° → 45,0° 3,02 s levosta, odotus 15,6 s, kartta terävä). VIKA: ristihäivytyksen keskellä
  vaalea välähdys (kirkkaus 129 → 220 → 161; vanha sumea pysäytyskuva häipyi hitaammin kuin peite) → KORJATTU b67f370b0 (HaivytaPysaytys: peitto = peitteen peitto²,
  unity 0). KK:lle tallenne + lokit/natiiviseppa-saapuminen-mac-4/arkki-ns.jpg + vaalea-valahdys-ns.jpg (kopio PT). JU: ajopyynto-mac-5.md → lue s4 + video
  (kirkkaus k-*.jpg monotoninen häivytyksessä: magick … -format '%[fx:mean*255]').
- RUUTUNOPEUS: ENNEN EI KELPAA (peli ei alkanut: avoimet glb Request timeout, latauskuva 15 min). JÄLKEEN pelasi (Taso läpi 4:00): fps-konsolista mediaani 40,
  huonoin 28,5, gpuMs 34,8 / p95 50,5. JU: ajopyynto-ruutunopeus-ennen-2.md → lokit/natiiviseppa-juoksu-ruutunopeus-ennen-2 → vertailu KK:lle (kopio PT).
- Cron (unity-julkaisut 9.04) ja ajovahti luotu tähän sessioon. Turhatyo-1 ALKOI 11.3x (vahti).

## LISÄYS 13 — NOLLAUS TÄSTÄ (11.11. 12.00, kontekstivahti 25 %). JATKA NÄISTÄ:
- SAAPUMINEN: mac-5 (b67f370b0) välähdys pienempi (118 → 192 → 161) muttei pois → KORJAUS 2 ef53afe7a (natiiviseppa/saapuminen-pariisi; Introesitys.PysaytysEsiS 0,3 s:
  pysäytyskuva häipyy ensin peitteen alla, sitten peite 1 s; sävy nollataan vasta lopussa; kamera seisoo PehmeaKokoS 1,3 s) + NUI 05d55e239 Ohitan paikka (cherry-pick 201f9fffa).
  JU: mac-6 ef53afe7a → lokit/natiiviseppa-saapuminen-mac-6: KIRKKAUS häivytyksen yli yhteen suuntaan (kehykset saapuminen-koko/k-*.jpg joka 3., magick -resize 64x
  -colorspace Gray -format '%[fx:mean*255]'; mac-5:ssä häivytys k-1785…1835) → KK (kopio PT). Tarkista myös s5b/s6/s7: Ohita kompassin alla (NUI 6a), luentapalkki (6b): jos näkyy, kehys NUI:lle.
- iPad MUISTI-3 (b8e641712): odotus 16,1/16,3 s (oli 28), huippu 3280 Mt (muisti-tarkka.log; muistivahti-tulos.txt VANHA, älä käytä). Syy 28 s:iin ei selvinnyt (ei syyriviä).
  JU: muisti-4 ef53afe7a → odotus < 25 s? (KK:n junaehto: mac-6 kirkkaus yhteen suuntaan + iPad-odotus < 25 s). KK:lle kerrottu.
- RUUTUNOPEUS: julkaistu runko jää latauskuvaan iPadilla 3/3 (Curl 28 15 s: taivas.png, avoimet-v52/juhlasali.glb; PT:lle HUOM lähetetty). ENNEN = ennen-3 rungosta
  79b04e870 (juna-224 ennen NS:n muutoksia; ajopyynto-ruutunopeus-ennen-3.md) → fps-konsolista.py → vertaa JÄLKEEN (a61a98089: mediaani 40, huonoin 28,5, gpu 34,8/50,5) → KK + PT.
- TURHATYÖ-1 (367ea7f0a): kappaleläpikäynti kaikki 262–755 ms/jakso, pisin 54–101 ms → uudet 15–22 ms, pisin ~3 ms (yksi 20050 uutta: 115/56 ms). H1/H2-kuvat (6) JU hakee iPadilta
  → lokit/natiiviseppa-juoksu-turhatyo-1: vertaa heijastus 200|400|200b (magick compare) → jos ei eroa, junaehdokas PT:lle; jos ero, KK.
- HAHMOVARJO-1: 9 kuvaa pikselilleen samat (ei hahmoja ruudussa) → hahmovarjo-2 (_tyo/natiiviseppa/varjot/sk-juoksu-hahmovarjo-2.txt: eunukki kurkistaa / huutavat / vartijan kehote)
  JU:n iPad-jonossa → kolmikot KK:lle (kopio PT).
- Cron (unity-julkaisut 9.04) ja ajovahti (Monitor vahti.sh) LUO UUDELLEEN.

## LISÄYS 14 (11.11. 12.5x, uusi sessio): KK 12.07 mac-6 -jäänteet → korjaus 204a54ecd (natiiviseppa/saapuminen-pariisi, unity 0)
- Jäänne 1 (notkahdus 36,7–37,0 s): pysäytyskuva häipyi ennen peitettä → pallon OMA sumennus (pieni renderScale) näkyi, sitten tarkkuus palasi 1 kehyksessä
  (reunat 118 → 126 → 100, ero 14). Jäänne 2 (ylitys 37,6–38,0 s): NimiPois-kirjaimet kasvavat ruudun kokoisiksi ja vaalentavat keskikohdan viimeisinä.
  Kuvat lokit/natiiviseppa-saapuminen-mac-6/jaanne*-ns.jpg. KK:lle selitetty.
- Korjaus: TraileriTausta.PohjaPeitteeseen (pysäytyskuvan kopio + sävy peitteen alimmiksi lapsiksi), Introesitys.PehmeaLoppu (ryhmähäivytys suodin opacity,
  käyrä lineaarinen/smoothstep-keskiarvo, odottaa PalloKierto.ElavaTerava + 2 kehystä, katto PehmeaValmisKattoS 1 s; nimi ei syöksy), PalloKierto.SumennusHetiPois,
  SaapumisKoe: UI palaa häivytyksen alkaessa (LoppuOdottaa), kamera seisoo LoppuKaynnissa. PysaytysEsiS/PehmeaKokoS/HaivytaPysaytys poistettu.
- JU: ajopyynto-mac-7.md (204a54ecd) + ajopyynto-ipad-muisti-4.md (sha päivitetty 204a54ecd). LUE mac-7: kirkkaus 10 näytettä/s (k-*.jpg joka 5., 50 fps;
  scratchpad-skripti alfa.py: /opt/homebrew/bin/python3 -P -E, numpy) → ehdot: yhteen suuntaan, poikkeama ≤ 2, ruutuero ≤ 2 × naapurit; lokirivit
  "elävä kartta valmis peitteen alla X s" ja "häivytys valmis". muisti-4: odotus < 25 s + huippu (muisti-tarkka.log). → KK (kopio PT).
- RUUTUNOPEUS VALMIS: ennen-3 37,5 / huonoin 27,4 / GPU 41,6/52,9 | jälkeen 40,0 / 28,5 / 34,8/50,5 → KK + PT lähetetty.
- Cron ja ajovahti luotu tähän sessioon.

## LISÄYS 15 — NOLLAUS TÄSTÄ (11.11. 13.0x, kontekstivahti 30 %). JATKA NÄISTÄ:
- OMISTAJA 12.15 / KK 12.16 (PT:n välitys): ISON IPADIN JUOKSUPELIAJOT SEIS (juoksupeli rakennetaan uudelleen). Ei juoksupelin iPad-tilauksia; hahmovarjo-2
  pysäytetty (JU 12.18). iPad-todiste vain KK:n erillisellä sanalla. Saapumisen iPad muisti-4 (204a54ecd) JATKUU.
- TURHATYÖ-1 luettu: H1/H2 heijastus ei näy → 367ea7f0a pt-ok 224.72 (MR65 JU:lla). Valmis.
- 1. KÄRKI (PT 12.2x, KK 12.07): LATAUSVIKA "Juoksupeli: lataus jää latauskuvaan, kun maailman tiedosto aikakatkeaa". Vaiheet 1–2 TEHTY, syy KK:lle + PT:lle 12.5x:
  julkaistu runko (ennen d42a45345 10.11.) jumi 3/3: haku 60 s katto, epäonnistunut avoin glb (juhlasali 42 Mt jne.) haetaan uudelleen JOKAISELLE 21 huoneelle
  (avoinPohjat[glb] täytetään vain onnistuessa, JuoksuSokkeloMaailma.Palatsi.cs:306–322) → ~21 × 60 s. Juna-224-runko (79b04e870, a61a98089) käynnistyi 2/2,
  mutta "verkko lataus katkaistu" 41/76 s ja 69/439 glb puuttui HILJAA → ruutunopeusvertailu vajaasta maailmasta (kerrottu KK:lle). iPad 0,04–0,13 Mt/s,
  hiljaisia katkoja 3–9; Mac curl samasta CDN:stä 22 Mt/s → epäily: rajaton rinnakkaisuus (JuoksuHahmot.Hae / JuoksuVerkko, ei jonoa eikä etusijaa; vain
  JuoksuLeivottu KuvaHakuja 8 / GlbHakuja 6). Hiljainen vanha sokkelo: JuoksuV4Maailma.cs:530 (Palatsi null, pohja.json :86) → VapaaValmis false →
  JuoksupeliNakyma.cs:791 LuoSokkelo ilman virhettä. Kulkukartta = Resources (JuoksuKulku), ei verkosta. Lataus: JuoksuV4Maailma.Lataa :456–561, Valmis :561.
  KORJAUSSUUNNITELMA (odottaa KK:n sanaa): (a) yksi jono, pakolliset ensin, ≤ ~6 rinnakkain, tausta odottaa; (b) epäonnistunut URL merkitään kerran, uusinta
  tauolla + Range-jatko; (c) ei hiljaista vajaata/vanhaa: näkyvä viesti + Yritä uudelleen; (d) todiste Macilla rajoitetulla nopeudella, iPad vain KK:n sanalla.
  Koodipohja: wt /Users/Shared/Claude/wt/proto-natiiviseppa-turhatyo (haara natiiviseppa/juoksu-turhatyo, 9e67b65a0) tai uusi haara juna-224:stä.
- SAAPUMINEN: mac-7 (204a54ecd) JU:n Mac-jonossa, muisti-4 iPadilla → lue (lisäys 14) → KK.
- VAHTI: muista luoda uudelleen (Monitor vahti.sh) + cron 9.04.
- LISÄ 13.1x (omistaja 12.20–12.21, KK, JU): MR65 367ea7f0a PIDOSSA KK:n päätökseen (ei 224.72 vielä). Juoksupelin vanhan koodin mittauksia/profilointeja/nopeutuksia
  EI tehdä (37,5 → 40 lähtötaso); aineistotyö (leivotut varjot) jatkuu. ISON IPADIN AJOT vain KK:n nimeämille valmiille kokonaisuuksille: muisti-ipad-4 POIS jonosta,
  laattamuisti-ipad-2 pysäytetty. Mac-ajot jatkuvat (mac-7 jonossa). PT:lle vastattu: muuta juoksukoodin nopeutusta ei kesken (c28e4adb0 ⊂ 367ea7f0a).
- PT 13.2x (Raamattu 12.26.5): iPad VAIN KK:n nimeämä valmis kokonaisuus viimeisenä tarkistuksena ennen versiota; NS ei tilaa iPad-ajoja. Latausvika: korjaus + todiste MACILLA.

## LISÄYS 16 — NOLLAUS TÄSTÄ (11.11. iltapäivä, kontekstivahti 26 %). JATKA NÄISTÄ:
- PT (KK 13.0x): 367ea7f0a JUNAAN 224.71. LATAUSVIKA hyväksytty, jonon kärki, ehdot: (i) latausjono omana moduulinaan, (ii) vastaa ensin koskeeko
  karttaa, (iii) ei hiljaa vajaata/vanhaa sokkeloa: "Lataus ei onnistunut. Tarkista verkkoyhteys ja yritä uudelleen." + "Yritä uudelleen",
  (iv) todiste MACILLA rajoitetulla nopeudella 5/5 käynnistystä, 439/439 mallia. Lähtötasoa 37,5 → 40 ei käytetä, uutta ei mitata.
- (ii) VASTATTU KK:lle + PT:lle: EI koske karttaa (Laattapalvelin + Esilataaja jo jonoissa) → /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/latausjono/vastaus-ii.md
- (i)+(iii) TEHTY 31f66a2c3 (natiivi-backup natiiviseppa/latausjono juna-224:n 17fbf3e35:stä, wt /Users/Shared/Claude/wt/proto-natiiviseppa-latausjono;
  Peli-testit 920/920, unity-tarkistus 0): Peli/Lataus/LatausjonoLogiikka.cs (puhdas, LatausjonoTestit 8) + Scripts/Peli/Latausjono.cs (ajuri: Range-osat,
  kuuntelijat, Peru, Nosta, Aja, QA KoeKatko). Kaikki juoksun haut jonossa (JuoksuHahmot.Hae, JuoksuLeivottu hakemisto/HaeGlb/kuvajono, osasarjan atlas).
  JuoksuVerkko: Ohita/Suojatut/HaeOsissa/Valttamaton POIS, katkaistun latauksen abort pois; LatausAlkaa → Latausjono.Peru + koukut (Odota, TaustaTauolla).
  JuoksuV4Maailma.LatausVirhe + Kelpaamaton (verkko / palatsi puuttuu / VapaaValmis false) → ei Valmista. JuoksupeliNakyma: virheViesti + uudelleenNappi
  (mk-nappi--kulta, palkin alla) → YritaUudelleen = Sulje + Avaa samoilla. Nappityyli NUI:n tarkistettavaksi kuvasta.
- SEURAAVAKSI (iv): Mac-käännös 31f66a2c3 JU:lta (ajopyyntö _tyo/natiiviseppa/latausjono/) → rajoitettu nopeus (QA "juoksupeli palatsi verkko viive S"
  + "verkko katko N" tai Network Link Conditioner, jos käytössä) → 5 kylmää käynnistystä (välimuisti tyhjäksi), lokista "latausjono: … valmiita"
  ja malleja 439/439, ei "LUOVUTETTU"/"LATAUS EPÄONNISTUI". Lisäksi 1 ajo verkko poikki → viesti + nappi näkyy (kuva) → nappi → lataus jatkuu.
  Tulos KK:lle + PT:lle. Ei iPad-ajoja (vain KK:n sanalla).
- SAAPUMINEN: mac-7 (204a54ecd) yhä JU:n Mac-jonossa → lue (lisäys 14) → KK.
- VS:lle vastattu striimikartasta (laatat KS:n, Z17 katto ElavaTyyli.Viimeinen, m/px ja muistiarvio).
- Cron (unity-julkaisut 9.04) ja ajovahti (Monitor vahti.sh) LUO UUDELLEEN.
- LISÄ 16b: KK 13.0x tarkisti (ii): rajaus vain juoksupeliin pitää; vastaus-ii.md:hen kirjattu Nakyva-tason kattottomuus (Esilataaja.cs:16, :164–169).
  Löydös PT:lle: KohdekarttaNakyma.cs:237 / NostotKartalla.cs:2991 Kuvat.Hae → Nakyva ilman kattoa (Pelikoodarin jono; Latausjonoa EI laajenneta).
- JU 13.10: saapuminen-mac-7 (204a54ecd) VALMIS (rc 0, kuvia 14/14, mp4 1, NRE 0) → lokit/natiiviseppa-saapuminen-mac-7: LUE ENSIN (lisäys 14 ehdot) → KK.
- PT 14.0x (KK) JONOON, järjestys: 1) latausvika (iv) Mac-todiste → 2) saapuminen mac-7 → 3) LÖYDÖS A (tarkistamatta): piirroskerros ei näy pelissä
  (ElavaTyyli.Striimi = true → Karikatyyri false), mutta PiirrosKerros.Purku pitkien ruutujen syissä → selvitä: lataako/purkaako laattoja turhaan,
  ja mitä kadonneiden ihmeiden tähdet siitä tarvitsevat. VAIN SELVITYS KK:lle + PT:lle, ei koodia ennen KK:n sanaa.
- VS 14.1x (KK 14.06, saumat-ja-maet osa 4): elävän kartan muste+kuitu tileset-varjostimeen (tee_tileset.py, kytkin _elavaMuste_n, oletus 0).
  Vastattu: paikka 0 (pohja), VS tekee haarassaan linssiseppa2/elava-muste, ehto: generaattori + shadergraph samassa commitissa ja todiste, että
  oletus 0 = ennallaan; NS katsoo diffin ennen junaa (renderöintiputki NS:n). Odottaa VS:n sha:ta.
- 16e: VS:n tileset-muutos 1efd29cb4 (linssiseppa2/elava-muste) KATSOTTU, NS OK junaehdokkaaksi muste-1-parin + unity 0 jälkeen (File-lähde oikein,
  multi_compile_fragment globaali → fragmenttivariantit 2×, kerrottu VS:lle KK:ta varten). Ei NS:n jatkotoimia.
- 16f LÖYDÖS (PT/KK 14.52, EI TYÖTÄ ennen KK:n sanaa): elävän kartan lähikuva sumenee laskussa 8,24 s:ssa, kun tarkka laatta vaihtuu karkeampaan
  (ilman mustetta). Kuva proto-3d/lokit/linssiseppa2-muste-2-tallenne-1a3081001/vs/pois-sumenee-k411-k413.jpg. Epäily (tarkistamatta): Cesiumin
  SSE/tason valinta laskeutuessa tai Laattapalvelimen elävä pala ei ehdi → vanhempi taso; tarkista lokista Elava-tilarivit samalta hetkeltä.
- 16g PT 15.4x (KK 15.38): SAAPUMISKOE PYSÄYTETTY (0651a87bb…204a54ecd, ei junaan; omistaja hyväksyi 224.71:n vanhan saapumisen, intron kuvamuutos peruttu).
  Haara natiivi-backup natiiviseppa/saapuminen-pariisi = 204a54ecd (tarkistettu). JU:lle kerrottu: saapumisajot pois jonosta. mac-7:ää EI lueta.
  JONO NYT: 1) latausvian Mac-todiste 5/5 täydellä mallimäärällä (439) → KK; 2) piirroskerroksen purku -selvitys (16c) → KK + PT.

## LISÄYS 17 — NOLLAUS TÄSTÄ (11.11. 16.3x, kontekstivahti 33 %; appi kaatui 16.08, PT herätti). JATKA NÄISTÄ:
- LATAUSVIAN MAC-TODISTE TILATTU: JU jonossa NUI napautus-224-1:n jälkeen. Ajopyyntö + skenaariot /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/latausjono/
  (ajopyynto-mac-latausjono.md, sk-juoksu-latausjono.txt: välimuisti tyhjä, verkko viive 1.5 + katko 7; sk-juoksu-latausjono-katko.txt: katko 1 → virhe, katko 0 → uudelleen).
  → lokit/natiiviseppa-juoksu-latausjono-1…5 + -katko-1. Vahti: Monitor `bash /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/latausjono/vahti-latausjono.sh` tai vahti.sh (kattaa natiiviseppa-juoksu-*).
- LUENTA (KK:n ehto 5/5 täydellä mallimäärällä 439): kustakin -1…5 konsoli.txt: "OK oleta" + "kulkukartta ladattu", EI "LUOVUTETTU"/"LATAUS EPÄONNISTUI"/
  "latausvirhe näkyy"; "verkko lataus X s … latausjono … valmiita N, puuttuu M, uusintoja U" -rivi; mallimäärä: Tila "sokkelo Ladattu/Mallit" ei lokissa →
  laske "palatsi v2 … puuttuu"/"puuttuu (" -rivit = 0 ja vertaa hakemiston glb-määrää (JuoksuLeivottu "leivottu paketti palvelimelta N tiedostoa").
  Jos 439 ei näy suoraan lokista: lisää yksi lokirivi (latausmalleja ladattu/odotettu) haaraan natiiviseppa/latausjono ja tilaa uusinta. Katko-1: K1-virhe-kuvassa
  viesti + Yritä uudelleen (näytä KK:lle kuva), K2-uudelleen täysi maailma. → yksi viesti KK:lle (kopio PT): 5/5 + uusinnat + kuva.
- Jonossa sen jälkeen: piirroskerroksen purku -selvitys (16c). VS:n tileset 1efd29cb4 katsottu (16e). Saapuminen pysäytetty (16g).
- Cron 9.04 + vahti LUO UUDELLEEN.

## LISÄYS 18 — NOLLAUS TÄSTÄ (11.11. 17.2x, kontekstivahti 26 %). JATKA NÄISTÄ:
- VAHTI: Mac-ajoissa EI konsoli.txt:tä → vahti.sh ei näe niitä. Käytä Monitor `bash /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/latausjono/vahti-mac.sh`
  (unity.log + loki.txt; latausjono*, piirros-ennakko-*; ALKOI/VALMIS/HUOM/HILJAA). Cron 9.04 unity-julkaisut.py LUO UUDELLEEN.
- 1) LATAUSJONO: Mac-ajo latausjono-1 (31f66a2c3) EI valmistunut 611 s:ssa (palatsi haki osat sarjassa: Esihae vain levyltä, taustahaku tauolla latausrajan
  120 s jälkeen). KORJAUS 9fb80c825 (natiivi-backup natiiviseppa/latausjono, wt /Users/Shared/Claude/wt/proto-natiiviseppa-latausjono): palatsin
  verkkoesihaku EsihakuVerkkoN 5 jonon kautta (JuoksuSokkeloMaailma.Palatsi.cs Esihae/VerkkoEsihaku) + "latausjono: tila …" 20 s välein. 920/920, unity 0.
  JU ajaa latausjono2-1…5 + -katko-1 (ajopyynto-mac-latausjono-2.md, 16 min/ajo; jatko vain jos ajo 1:ssä "kulkukartta ladattu" tai "latausvirhe näkyy").
  Luenta: python3 -I /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/latausjono/lue.py <kansiot> (unity.log; mallit "palatsi v2: ulkorengas … ladattu N glb:tä,
  puuttuu M"; valinnainen LUOVUTETTU = ennakkohaku, ei vika; vika vain LUOVUTETTU + "VIRHE").
- 2) KK 17.2x PÄÄTÖKSET latausjonoon (TEE SEURAAVAKSI 9fb80c825:n päälle, sitten uusi Mac-sarja):
  1. Latauspalkki etenee myös keskeneräisen tiedoston tavujen mukaan (nyt JuoksuV4Maailma.LatausOsuus = palatsin ALOITETUT osat / kaikki; LatausValmiit++
     ennen hakua, Palatsi.cs ~:442). Ehdotus: Latausjono tarjoaa keskeneräisten pakollisten tavuosuuden (ms.Length + downloadedBytes / Content-Range koko),
     lisätään (1/kaikki)·osuus; JuoksuLatausEdistyminen.Kasvava pitää palkin kasvavana. Todiste-ehto: hitaalla verkolla palkin arvo muuttuu ≤ 15 s välein.
  2. 30 s ilman MITÄÄN etenemistä → virhe + Yritä uudelleen; KORVAA 60 s/tiedosto (LatausjonoLogiikka.VirheRaja → ∞ ajurissa; testit pitävät 60:n).
     Eteneminen = tavuja mistä tahansa haussa olevasta TAI valmis tiedosto TAI käsittelyvaiheen merkki (purku/jäsennys/rakennus: esim. LatausValmiit-setteri
     + JuoksuRuutumerkinnat.Lohko päivittävät aikaleiman). Käsittely ei saa laukaista virhettä: lokiin "pisin etenemätön jakso X s (syy)" → todista < 30 s.
     Virhe asetetaan Latausjonoon (uusi Logiikka-metodi, Virhe-setteri private), jotta Kelpaamaton estää Valmiin. Yritä uudelleen jatkaa (valmiit välimuistissa).
  3. EI kokonaisrajaa virheenä (hidas mutta etenevä ok; hitaan yhteyden viesti riittää).
  4. Palkin arvo lokiin 10 s välein (JuoksupeliNakyma ~:1291).
  5. Poistuminen TARKISTETTU (KK:lle vastattu): ☰ latauskuvan päällä (KehysLatauskuvalle), Poistu ilman vahvistusta (:1929) → Sulje, haut perutaan.
     Todisteeseen kuva ☰ + Poistu latauskuvassa. Ei koodimuutosta.
  Normaalin verkon 5/5 + 439/439 yhä ehtona. Löydös juhlasali 42 Mt → PT:lle (pala 8) lähetetty.
- 3) PIIRROKSEN ENNAKKO (KK 16.45, linja A) TEHTY 41ba1b7e5 (natiivi-backup natiiviseppa/piirros-ennakko, wt proto-natiiviseppa-piirros-ennakko): Saapuu ohittaa
  ennakon striimikartalla + nollaus PaivitaLataukset; QA "karikatyyri tila" (tasolaatat muistissa/purettu, ennakko, tekstuuri-/varattu muisti) ja
  "karikatyyri striimi on|pois". ENNEN dc7219520 (natiiviseppa/piirros-ennakko-ennen = juna-224 2882f055a + vain QA). Ero 7 riviä. Selvitys + ajopyyntö:
  /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/piirros-purku/ (sk-mac-piirros-ennakko.txt). JU: ennen-ajo käynnissä toisella linjalla, jälkeen perään
  → lokit/natiiviseppa-piirros-ennakko-{ennen,jalkeen}. LUE (KK 16.45): 1) "ui saapuminen: kartta terävä X ms" + "traileri päättyi" (paljastus), s2-paljastus
  ennen|jälkeen: jos paljastus aikaistuu > 0,5 s tai kuva sumeampi → kuvat KK:lle ENNEN junaa; 2) muisti tila-riveiltä (s1–s4) + huippu, PiirrosKerros.Purku-
  rivit (odotus 0 jälkeen) ja "purettu yhteensä"; 3) t1-tahti (kuva); 4) k1-karikatyyri (laatat latautuvat). → KK + Muistin keventäminen -rivi
  (python3 -I tools/asemataulu/tyolista.py --kansio /Users/Shared/Claude/Matkakirja-fable/scratchpad/asemataulu/data/talo tilanne "Muistin keventäminen: vaiheet 0, V, 1, 2" "…").
  Sitten pt-ok-pyyntö PT:lle (junaehdokas 41ba1b7e5; QA-komennot mukana).
- 18b KK 17.2x TARKENNUS kohtaan 2: a) 30 s:n pysähdyksessä latauksen sisäinen Range-jatko (uusinta tauolla 1/2/4/8 s, kesken[url] säilyttää MemoryStreamin)
  yrittää ensin; virhe vasta kun jatkoyrityksetkään eivät tuo tavuja 30 s:iin (= globaali etenemisvahti laskee uusintojen tavut; TEE NYT kohdan 2 kanssa).
  b) Yritä uudelleen jatkaa kesken jääneen tiedoston Rangella samasta kohdasta, jos pituus + ETag (tai Last-Modified) samat; muuten alusta. NYT Peru hävittää
  kesken-MemoryStreamit (Latausjono.Peru) → b vaatii osittaisen tiedoston levylle (persistentDataPath, .osa + .meta: pituus, ETag/Last-Modified) + If-Range
  tai vertailu + testit. Arvio KK:lle: ~80–120 riviä + 3–4 testiä = EI pieni → OMA RIVI (KK:lle kerrottu). Todiste b:lle: katkaisu kesken salin → Yritä
  uudelleen → lokista "jatkettiin kohdasta N kt".
- 18c (17.35) KORJAUS kohtaan 3: PIIRROKSEN ENNAKKO-LÖYDÖS OLI VÄÄRÄ. PiirrosKerros.Keskusta() palauttaa null ilman karikatyyriä → striimikartalla ennakkoa
  ei asetu jo juna-224:ssä. Mac ENNEN-ajo dc7219520 (lokit/natiiviseppa-piirros-ennakko-ennen): ennakko pois, tasolaattoja 0, purettu 0. "puuttuu 0/28" =
  0 puuttuu 28:sta. 41ba1b7e5 TARPEETON, EI JUNAAN; JÄLKEEN-ajo peruttu JU:lta; KK, JU ja Muistin keventäminen -rivi korjattu. Haaroja ei poisteta.
  (Sivuhuomio: skenaarion "traileri päättyi" ei tullut 90 s:ssa vanhassa saapumisessa; ei jatkotoimia.) EI NS:n jatkotöitä tästä.

## LISÄYS 19 (11.11. 17.5x, uusi sessio local_0f7f169f): KK 17.2x päätökset 1–4 + 18b a TEHTY 7b7c06396 (natiiviseppa/latausjono, 924/924, unity 0)
- 1) Latausjono.KeskenOsuus (pakollisten keskeneräisten Σ saatu / Σ koko) → JuoksuLatausEdistyminen.Osuus(…, kesken): enintään 1 työyksikkö, Kasvava.
- 2) LatausjonoLogiikka VahtiAlkaa/Eteni/Vahdi/VahtiLoppuu: 30 s ilman tavuja / valmista / käsittelyn merkkiä (LatausValmiit-setteri, JuoksuLatausMittari.Lohko)
  ja pakollinen kesken → Virhe (private). Ajurissa VirheRaja ∞ → Range-uusinnat tauolla jatkuvat (18b a). Loki: "pisin etenemätön jakso X s (syy)",
  "EI ETENEMISTÄ 30 s … → VIRHE". 3) ei kokonaisrajaa. 4) "juoksupeli: latauspalkki 0.xxx (kesken N %, tila)" 10 s välein.
- MAC-SARJA JU:lle: _tyo/natiiviseppa/latausjono/ajopyynto-mac-latausjono-3.md (korvaa latausjono2:n) → lokit/natiiviseppa-juoksu-latausjono3-1…5
  + latausjono3-katko-1 (sk-juoksu-latausjono-katko-3.txt: + K1b-valikko-poistu = ☰ latauskuvan päällä). LUE: python3 -I …/latausjono/lue.py <kansiot>
  (uudet rivit: palkin pisin muuttumaton jakso ≤ 15 s, pisin etenemätön < 30 s, mallit 439). → yksi viesti KK:lle (kopio PT): 5/5 + uusinnat + K1/K1b-kuvat.
- 18b b (osittainen tiedosto levylle + If-Range) oma rivi, EI tehty. Vahti: Monitor vahti-mac.sh (kattaa latausjono3-*). Cron 9.04 luotu.
- JONO sen jälkeen: tyhjä (piirroksen ennakko 18c: ei jatkotöitä).
- 19b (17.5x): JU:n latausjono2-1 (9fb80c825) JUMI LOD1:ssä (haussa 0, pakollisia 0, valinnaisia 7, > 6 min). Syy: JuoksuLeivottu.HaeKuvat ohitti taustan
  aloittamat kuvat (valinnaisia, tauolla latausrajan jälkeen). KORJAUS d4fc36645: Latausjono.Nosta(KuvaUrl) + Vahdi: jumissa oleva valinnainenkin → Virhe
  (tyhjä jono ei). 925/925, unity 0. Mac-sarja -3 nyt d4fc36645:llä (JU:lle kerrottu; 7b7c06396 ei kelpaa).

## LISÄYS 20 — NOLLAUS TÄSTÄ (11.11. 18.1x, kontekstivahti 25 %). JATKA NÄISTÄ:
- JU ajaa latausjono3-sarjan d4fc36645:llä (hiljaisuusraja 1000 s): lokit/natiiviseppa-juoksu-latausjono3-1…5 + 3-katko-1. JU:n 10 min "SEIS" 2-1:ssä ja
  ensimmäisessä 3-1:ssä oli JU:n oma vahti; 2-1 (9fb80c825) oli SILTI aito jumi (sama tila > 5 min) → korjattu d4fc36645 (PT:lle kerrottu).
- LUE sarja: python3 -I /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/latausjono/lue.py <kansiot> → 5/5 kulkukartta ladattu, mallit 439, pisin etenemätön < 30 s,
  katko: K1-virhe + K1b-valikko-poistu + K2-uudelleen → yksi viesti KK:lle (kopio PT).
- PALKKI EI TÄYTÄ ≤ 15 s -EHTOA (3-1-katkaistu-10min, d4fc36645): seisoo 0,080 ~40 s (vaihe 0: sokkelo.Lataa jatkuu moduulien jälkeen, k katkaistu Osa-kattoon),
  0,16–0,19 ~60 s (vaihe 3 alku), 0,882 > 90 s (LOD0-kierroksen jälkeinen häntä: kaukopuut, muurikate, C2, osasarja, kaiteet, ulkorengas = vain ~5 yksikköä;
  JuoksuSokkeloMaailma.Palatsi.cs :290 LatausYhteensa, :723 LatausValmiit = LatausYhteensa). Kesken-tavuosuus liikuttaa vain 1 yksikön (< 1 px).
  KORJAUSIDEA (ei tehty): hännän vaiheille omat yksiköt tiedostojen mukaan TAI palkkiin leivotun paketin tiedostojen valmiusosuus (JuoksuLeivottu: hakemisto
  1054 tiedostoa, kuvatLevylla, glb-esihaku-laskurit :308/:333) painotettuna; vaihe 0: k vie kohti Moduulit→Pohja-rajaa, kun moduulit valmiit. Mitoita VALMIIN
  3-1:n aikajanalla (palkkirivit 10 s välein), sitten yksi erillinen Mac-ajo palkille (sk-juoksu-latausjono.txt), ei koko sarjaa uudelleen.
- KK:lle palkista kerrotaan sarjan tuloksen yhteydessä (mitä seisoi ja korjaus tulossa).
- Cron 9.04 (unity-julkaisut.py) + Monitor vahti-mac.sh LUO UUDELLEEN.

## LISÄYS 21 — NOLLAUS TÄSTÄ (11.11. 18.24, kontekstivahti 26 %). JATKA NÄISTÄ:
- LATAUSJONO (1. kärki): JU ajaa latausjono3-2…5 + 3-katko-1 (d4fc36645), sitten palkki-1 (363f3ce4b), sitten pala3-luettelo-1. 3-1 LUETTU: oleta OK,
  mallit 439/439, pisin etenemätön 5,6 s, valinnaisia luovutettu 5 (eunukki-3.glb ym. taustan esihaku: etuala hakee pakollisena uudelleen
  JuoksuLeivottu.HaeGlb + Logiikka.Pyyda :72 → ei hiljaa vajaa), puuttuu 4 = aitoja 404:iä (kielletty-c2-v34 a3-baoding-lod1, a5-marmorikaide-pylvas-lod1,
  osasarja-v15 pursotukset.glb, QA kala-allas). "LATAUS EPÄONNISTUI/latausvirhe näkyy" -osumat = skenaarion oleta-rivin kaiku, ei vika.
- KUVAT: "komento kuva X" ei tallenna batch-ajossa (JU) → sk-juoksu-latausjono.txt ja sk-juoksu-latausjono-katko-3.txt korjattu "kuva X" (JU:lle kerrottu).
  Tarkista katko-1:stä, että K1-virhe/K1b-valikko-poistu/K2-uudelleen-kuvat syntyivät.
- PALKKI KORJATTU 363f3ce4b (natiivi-backup natiiviseppa/latausjono, 926/926, unity 0): JuoksuLatausEdistyminen.Ali (keskeneräinen = tavuosuus,
  jokainen yksikön aikana valmistunut tiedosto −30 % jäljellä olevasta), vaihe 0 moduulit + 1, palatsin häntä HantaOsuus 0,4 painoin 0,38/0,06/0,03/0,07/0,46
  (muurikate/osasarja/kaiteet/C1/ulkorengas, 3-1:n kestot 66/11/5/12/80 s), Hanta()-kutsut Palatsi.cs:ssä, LatausKeskenYksikot. Ajo: _tyo/natiiviseppa/latausjono/
  ajopyynto-mac-palkki.md → lokit/natiiviseppa-juoksu-latausjono-palkki-1 → lue.py: "pisin sama arvo" ≤ 15 s (palkkirivit 10 s välein → enintään 1 sama peräkkäin).
  Aikajana: scratchpad-skripti katosi nollauksessa; lue.py riittää. Jos yhä seisoo: katso mikä lohko (JuoksuLatausMittari.Lohko-rivit / "latauksen ositus").
- SARJAN TULOS → yksi viesti KK:lle (kopio PT): 5/5 + uusinnat + K1/K1b/K2-kuvat + palkki-1 (pisin sama arvo). Junaehdokas sen jälkeen: natiiviseppa/latausjono
  (363f3ce4b tai uudempi) → pt-ok-pyyntö PT:lle.
- KK 18.15 PALA 3 (pintojen leivonta): tehtävänanto /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261111-pintojen-leivonta-pala3-tehtavananto.md
  (LUE KOKONAAN), LAV:n tila _tyo/linnanrakentaja/leivonta-v5-tyo/VASTAUS-KK-1806.md. JÄRJESTYS: latausjono → 3.0 → 3.3 pilotti (laji 2 pihan/kujan lattia kuvaksi
  työkalulla + uusi varjostinpolku kytkimen `pinnat uusi|vanha` takana) → lattian ruutuvalon lataus (LAV 3.1b) → 3.2 (EI ennen tarkkaa leivottua valoa versiossa).
  Rajaus-/poikkeusehdotukset KK:lle ENNEN toteutusta. Ei kameraa, sääntöjä, reittejä.
- 3.0 TEHTY 0f851ddbd (natiivi-backup natiiviseppa/pala3-pinnat juna 224 bd9a95a9d:stä, wt /Users/Shared/Claude/wt/proto-natiiviseppa-pala3, unity 0):
  JuoksuV4Maailma.Luettelo.cs, QA `valo luettelo <kansio>` → globaalit.txt (98 varjostinglobaalia, Valopohja.JuoksuK4…K24 C#-kytkimet, avainsanat)
  + piirtajat.tsv (MeshRenderer × materiaali: juuri, varjostin, laji, leivottu, UV1, kärkiväri, aktiivinen, koko). Ajo: _tyo/natiiviseppa/pala3/ajopyynto-mac-luettelo.md
  (sk-juoksu-pala3-luettelo.txt) → lokit/natiiviseppa-juoksu-pala3-luettelo-1. LUE → tiivistys KK:lle (kopio PT): K-kytkinten arvot, mitkä lajit (_Laji) käytössä
  (V4_tile/V4_stone/V4_capstone?), ilman leivottua valoa materiaaleittain + pinta-ala-arvio. KK:lle kerrottu (viesti 18.2x).
- Työlista: "Juoksupeli pala 3: pintojen kuvat (luettelot, pilotti pihan lattia)" tilanne päivitetty.
- Cron 9.04 (unity-julkaisut.py) + Monitor vahti-mac.sh LUO UUDELLEEN.
- 21b (18.31) KK: tehtävänanto VERSIO 3, uusi kohta 4c (LUE): valo kahtena kerroksena — pehmeä (taivas + heijastunut, karkea RGBM nykyisessä UV1:ssä) ja
  auringon varjo (näkyvyys 0–1, yksi kanava; lattialla ruuduittain 64 m, UV = maailman xz / 64; seinät/terassit lähiatlas). Kaava: valo = pehmeä × k1 +
  auringon väri × k2 × pinnan suunta × min(varjokuva, pelaajan varjo), polvipakkaus pelissä; 3 näytettä/kuvapiste. Järjestys ennallaan (latausjono → 3.0 → 3.3);
  3.3:n varjostinrunko kerrosjaolla jo pilotissa (saa käyttää nykyistä yhdistettyä valoa, kunnes LAV:n kerrokset valmiit). Lattiaruutujen lataus suunnitellaan
  vasta, kun LAV:n koepari on hyväksytty. LAV voi kysyä NS:ltä.
- 21c: latausjono3-2 valmis 745 s (palkki 1.00) mutta ei L1-kuvaa: alkoi 18.12 ennen skenaarion kuvarivikorjausta. Vahti-mac.sh ei tunnista "valmis N s" -riviä (HILJAA = väärä hälytys).
- 21d (18.4x) LAV (pala 3.1b koe, KK 18.31) pyysi V2-elava.png:n (lokit/natiiviseppa-juoksu-hahmovarjo-1) kameran + Puyin paikan POHJAN kehyksessä + toistettavan
  QA-kameran. Lokissa EI tarkkaa paikkaa (botti, jäädytys t 21,7 s); lähin Puyi maailmassa (124,7; −738,1) ~4 s ennen, kamera 7,1 m / 2,7 m / 29°. LAV:lle vastattu.
  TEE: lyhyt Mac-ajo (pala3-pinnat-käännös): ui juoksupeli valo sijoita 124.7 -738.1 [suunta] → jaady 1 → ui juoksupeli paikka (kuvan kamera pohja) + kuva,
  vertaa V2-elava.png:hen; anna LAV:lle pohjan x;z ja skenaariorivit (tai LAV:n valitsema piste).
- 21e (18.4x, uusi NS-sessio) LAV:n koekamera TILATTU: _tyo/natiiviseppa/pala3/ajopyynto-mac-koekamera.md (sk-juoksu-pala3-koekamera.txt, kuva3d K1–K6, `valo sijoita`
  pohjan kehyksessä (−136; 360/340/300/460), K2 toistettava `testikamera 2.7 7.1 12 29`) JU:n jonossa pala3-luettelo-1:n perässä samalla 0f851ddbd:llä
  → lokit/natiiviseppa-juoksu-pala3-koekamera-1. LAV:lle kerrottu (paikka-rivin kamera maailmassa → Pohjaan; "Puyi pohja" = reitin piste, ei sijoitus).
  TEE kun valmis: vertaa K1/K1b V2-elava.png:hen, anna LAV:lle K-kuvien kameran pohja (x; z).
- 21f (19.3x) LATAUSJONO3 1–5 LUETTU (lue.py): 5/5 oleta OK, mallit 439/439, pakollinen VIRHE 0, pisin etenemätön 4,3–9,2 s, puuttuu 4 (tunnetut 404),
  palkki d4fc36645:llä yhä 0,883 ~100 s (korjaus 363f3ce4b = palkki-1). KATKO-1 AITO VIKA: K2-uudelleenavaus ei hakenut MITÄÄN 10 min (palkki 0,020,
  latausjono 0/0/0): pysäytetyn korutiinin finally ei aja → JuoksuLeivottu.haetaan jäi true + kesken jääneet glb-työt Valmis = false. KORJAUS a58b3f4ec
  (natiivi-backup natiiviseppa/latausjono, 926/926, unity 0): JuoksuLeivottu.Peru (JuoksuVerkko.Peru:sta) + sukupolvi. K2-odotus 600 → 900 s
  (kylmä lataus ~750 s). JU: ajopyynto-mac-katko-2.md palkki-1:n jälkeen ennen pala3-luettelo-1:tä → lokit/natiiviseppa-juoksu-latausjono3-katko-2.
  KK-VIESTI (kopio PT) vasta kun palkki-1 + katko-2 luettu; junaehdokas sitten a58b3f4ec (tai uudempi) → pt-ok-pyyntö PT:lle.
- 21g (19.5x) PALKKI-1 (363f3ce4b) LUETTU: lataus OK (439/439, pisin etenemätön 5,1 s), palkki EI täytä ≤ 15 s: 0,757 ~60 s (muurikate), 0,079 ja 0,161 ~30 s.
  Syy: Ali laski KAIKKI valmistuneet tiedostot → taustan valinnaiset (890 → 926 muurikatteen aikana) veivät osuuden 0,99-kattoon sekunneissa.
  KORJAUS 34b73284a (= a58b3f4ec + LatausjonoLogiikka.PakollisiaValmiina → JuoksuV4Maailma.LatausOsuus; 926/926, unity 0). EI kelloa (suunnitteluperiaate).
  JU: katko-2 34b73284a:llä (tai a58b3f4ec, jos käännös jo alkoi) → palkki-2 (ajopyynto-mac-palkki-2.md) samalla käännöksellä → pala3-luettelo-1 → koekamera-1.
  Jos palkki-2 yhä seisoo > 15 s: muurikatteen alavaiheille Hanta(0, x) (glb, Lue, C3-json, C3-malli, C2-mallit, vanha kate) ja vaihe 0/3 alku vastaavasti.

## LISÄYS 22 — NOLLAUS TÄSTÄ (11.11. 20.0x, kontekstivahti 25 %). JATKA NÄISTÄ:
- KATKO-2 (a58b3f4ec) JUMI YHÄ: uudelleenavaus (K2) 900 s palkki 0,020, EI YHTÄÄN latausjonon pyyntöä (ei tila-rivejä = jono tyhjä). a58b3f4ec:n teoria
  (haetaan-lippu jäi true) EI ollut syy: vanha Valmistele eli ja päättyi sulun jälkeen ("hakemisto puuttuu → alkuperäiset glb:t", rivi 2942 katko-2 unity.log).
  Jumi on ennen ensimmäistä hakua: JuoksuV4Maailma.Lataa → sokkelo.Lataa → JuoksuHahmot.Hae → JuoksuLeivottu.Valmistele (?) — ei todennettu.
  a58b3f4ec + 34b73284a SÄILYVÄT (oikeita korjauksia muutenkin: glb-työt, sukupolvi; palkki vain pakolliset).
- DIAGNOOSI ee10425ff (natiivi-backup natiiviseppa/latausjono, 926/926, unity 0, ei toiminnallisia muutoksia): lokit "maailman lataus alkaa",
  "sokkelo hakee ensimmäisen moduulin", "leivottu hakemisto haetaan (sukupolvi)", "Valmistele odottaa hakemistoa > 5 s", "glb-työ odottaa > 10 s".
  JU: palkki-2 + katko-3 (ajopyynto-mac-katko-3.md → lokit/natiiviseppa-juoksu-latausjono3-katko-3) ee10425ff:llä (tai palkki-2 34b73284a:llä, jos alkoi).
  LUE katko-3: mikä diagnoosirivi on viimeinen K2-avauksen jälkeen → siitä jumin kohta. Muista: sulku = JuoksuV4Maailma.Tuhoa (JuoksuVerkko.Peru) → Juuri
  tuhotaan → Hahmot-korutiinit (Lataa, Esihae) pysähtyvät ilman finallya; Latausjono.Aja- ja muut pysyvät omistajat jatkavat.
- PALKKI-2: lue.py "pisin sama arvo" ≤ 15 s? Jos ei: muurikatteen alavaiheille Hanta(0, x) (21g).
- KK-VIESTI (kopio PT) vasta kun katko-3 + palkki-2 luettu: 3-1…5 OK (21f), palkki ja katko tila. Junaehdokas sen jälkeen.
- JONO JU:lla sen jälkeen: pala3-luettelo-1 (0f851ddbd) → koekamera-1 (LAV, 21e). LAV:lle kameran pohja K-kuvista, kun valmis.
- Vahdit sessiokohtaisia: luo Monitorit uudelleen (latausjono-palkki-2, -katko-3, pala3-luettelo-1, pala3-koekamera-1; "valmis N s" = valmis). Cron 9.04 LUO UUDELLEEN.
- 22b (20.1x) PALKKI-2 (34b73284a) LUETTU: lataus OK (439/439, pisin etenemätön 4,3 s), palkki EI parantunut: 0,757 ~50–60 s (muurikate), 0,161 ja 0,080 ~30 s.
  → muurikatteen aikana ei valmistu pakollisiakaan; lohko odottaa jotain muuta (CPU, levy tai taustan glb-työ). SEURAAVA: muurikatteen alavaiheiden kestot lokiin
  (Hae glb / Lue / C3-json / C3-malli / C2 / vanha kate) + Hanta(0, x) niiden väliin; vaihe 0 (0,080) ja vaihe 3 alku (0,161) samoin. Ei kelloa.
  Jono JU:lla: NUI HETI (KK) → katko-3 ee10425ff → pala3-luettelo-1 → koekamera-1.

## LISÄYS 23 (11.11. 20.4x, uusi sessio local_0f7f169f): katko-3 luettu → jumi korjattu; palkin alavaiheet tehty
- KATKO-3 (ee10425ff) SYY: sulun jälkeen myöhästynyt kutsu aloitti leivotun hakemiston haun (sukupolvi 1) juoksun korutiinissa → korutiini pysähtyi
  ilman finallya → JuoksuLeivottu.haetaan true → uudelleenavauksen Valmistele odotti 15 min ("Valmistele odottaa hakemistoa > 5 s (sukupolvi 1)").
  KORJAUS 393acb884: HaeHakemisto ajetaan Latausjono.Aja:lla (pysyvä omistaja, finally aina); jos uusi avaus perui jonon kesken haun
  (Latausjono.Sukupolvi muuttui, JuoksuLeivottu ei suljettu) → haetaan uudelleen uuteen jonoon. Sulku (JuoksuLeivottu.Peru) päättää kuten ennen.
- PALKKI (22b): 92df2f2cd: hännän lohko 0 alavaiheiksi (HantaAla: kaukopuut 0–0,08, muurikate haku/luku, C3-json, C3-malli, C2, vanha kate,
  rakennus + A3/A5), kukin osituksen lohko ("latauksen ositus" -rivi → kestot, mitoita painot niistä); sokkelon häntä Vaihe0Ala + Ali × Vaihe0Kesken
  (rakennukset 0–0,2, korttelit mallikohtaisesti 0,2–0,85, rengas); avoimen mallin haku keskeneräisenä = käyttäjähuoneiden määrä (juhlasali).
  Ali nollautuu alavaiheen vaihtuessa (avain + Alavaihe). Palkki-2:n syy: kaukopuiden aikana valmistuneet pakolliset täyttivät Alin koko lohkolle.
  Huom: "jonossa pakollisia 1" muurikatteessa = tauolla oleva uusinta (koekatko); valinnaiset eivät ala sinä aikana (pakollinen odottaa) → vapaita paikkoja.
- natiivi-backup natiiviseppa/latausjono = 393acb884 (926/926, unity 0; tarkista.sh päivittää tyylikirjan → palauta Tyylikirja.uss/.cs/json, ei committiin).
- JU: _tyo/natiiviseppa/latausjono/ajopyynto-mac-katko4-palkki3.md (katko-4 → lokit/…-latausjono3-katko-4, palkki-3 → …-latausjono-palkki-3), sitten
  pala3-luettelo-1 → koekamera-1. LUE katko-4: K2 "kulkukartta ladattu" + K1/K1b/K2-kuvat; palkki-3: lue.py pisin sama arvo ≤ 15 s + ositusrivin alavaihekestot.
  → KK-VIESTI (kopio PT): 3-1…5 OK (21f) + katko + palkki → junaehdokas 393acb884 (tai uudempi) → pt-ok-pyyntö PT:lle.
- Vahti: Monitor vahti-mac2.sh (katko-3/4, palkki-3, pala3-*; "valmis N s" = valmis). Cron 9.04 luotu.
- 23b (20.5x) PT (KK 20.5x, omistaja 19.16 "Työkalut ensin"): RINNAKKAIN latausjonon/pala 3:n jälkeen (ne KK:n järjestyksessä edellä): TYÖKALU 3 (kaksi lokiriviä)
  + TYÖKALU 1 (kaupunkitaulu) — /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261111-kolme-tyokalua-tehtavananto.md (LUE).
  Myöhemmin D:n esilataus (suunnitelmat/20261111-aarrekysymys-saapuessa.md). ENNEN ALOITUSTA yksi viesti KK:lle (local_d5f31591-…) + PT: mikä mahdotonta/kalliimpaa.
  EI ALOITETTU (nollaus 25 %). JU:n jono 20.4x: NUI intro-nimet-1 → petit-palais-3 → sivukuva-1 (omistaja 20.31) → [katko-4 + palkki-3, pyydetty] → pala3-luettelo-1 → koekamera-1.
- 23c (20.5x) JU TYÖKALU 3 -tarkennus: vakioajon skenaario /Users/Shared/Claude/julkaisija-tyokalut/vakioajo/sk-vakioajo.txt odottaa NS:ltä kaksi riviä:
  1) "kaupunki valmis <id> <N> s" (id = uusi-peli-argumentti, esim. pariisi; alku = peli alkaa/saapuminen, loppu = maa, talot, merkkirakennukset, puut ladattu);
  2) komento `mittari <tunniste>` → yksi rivi "MITTARI <tunniste> tekstuuri <Mt> varattu <Mt> mono <Mt> talopalat <n> <Mt> kolmiot <n> piirrot <n>"
  (arkki.py jäsentää avainsana-arvo-parit; KS:n näkökartiomittari kolmioihin). Kerro JU:lle (local_2a7d6c96-…) sha/haara, kun valmis.
