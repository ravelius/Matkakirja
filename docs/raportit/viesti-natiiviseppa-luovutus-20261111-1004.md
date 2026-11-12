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

## LISÄYS 24 (11.11. 21.1x, uusi sessio local_0f7f169f): katko-4 luettu; työkalut 3+1 kysely lähetetty; T3-rivit aloitettu
- KATKO-4 (393acb884): K2 uudelleenavaus OK ("kulkukartta ladattu" 90 s, mallit 439/439, pisin etenemätön 3,4 s) = jumi korjattu. MUTTA K1-virhe-kuvassa
  virheviesti + Yritä uudelleen EIVÄT näy (loki "latausvirhe näkyy"): piilotettu hidas-teksti (opacity 0, ~5 riviä palkin levyssä) työnsi ne ruudun alle.
  KORJAUS 2edb6edeb (natiivi-backup natiiviseppa/latausjono, unity 0): hidasViesti display None virheen ajaksi, virheViesti leveys 300, laatikko nostetaan
  turva-alueelle vain virheen aikana. JU: ajopyynto-mac-katko5.md → lokit/natiiviseppa-juoksu-latausjono3-katko-5 (palkki-3 samalla käännöksellä, jos ei alkanut).
  LUE: K1-virhe-kuvassa viesti + kultainen nappi (rajaus alaosasta täysikoossa), K1b valikko, K2 täysi maailma (katko-4:ssä ok).
- PALKKI-3 yhä odottaa (393acb884 tai 2edb6edeb) → lue.py pisin sama arvo ≤ 15 s + ositusrivin alavaihekestot.
- KK-VIESTI (kopio PT) kun katko-5 + palkki-3 luettu → junaehdokas 2edb6edeb (tai uudempi) → pt-ok-pyyntö PT:lle.
- TYÖKALUT 3+1: "mikä kalliimpaa" LÄHETETTY KK:lle + PT:lle (21.0x): /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/tyokalut/vastaus-kk-ennen-aloitusta.md.
  Kaupunkitaulu ODOTTAA KK:n vastausta (1b–1f). T3-rivit aloitettu: wt /Users/Shared/Claude/wt/proto-natiiviseppa-tyokalu3 (haara natiiviseppa/tyokalu3-rivit
  juna-224 53171fed0:sta, ei committeja vielä). POHJA: pysäytetyn saapumishaaran natiiviseppa/saapuminen-pariisi KaupunkiValmius (talot/ohjelmakohteet/
  Nahtavyysalue Aseta(...)) → poimi sieltä valmiusosat (ei saapumiskoetta). Mittari: Komennot.Aja (Kartta/Komennot.cs:1881) uusi case "mittari";
  muistit kuten CesiumKaupunki.Muisti (:1268), talopalat TaloKerros.PalojaNyt/TavujaNyt; kolmiot = KS:n PiirtoTilasto (karttaseppa/ymparistot) NakyvatKolmiot.
- Vahti: Monitor vahti-mac2.sh (nyt katko-[3-9], palkki-3, pala3-*). Cron 9.04 luotu.
- 24b (21.3x) TYÖKALU 3 -RIVIT TEHTY d088ca46a (natiivi-backup natiiviseppa/tyokalu3-rivit, wt proto-natiiviseppa-tyokalu3, unity 0): Kartta/KaupunkiMittari.cs
  (Seuraa uusi-peli:stä, "kaupunki valmis <id> N s" / katto 300 s "kaupunki EI valmis", komento mittari → MITTARI-rivi) + KaupunkiValmius talot/
  Nahtavyysalue/OhjelmaKohteet (saapumishaarasta) + Nahtavyysalue.ValmiusYhteenveto. JU:lle kerrottu (koe Pariisilla latausjonon ja pala3-ajojen jälkeen).
  LUE vakioajon 1. ajo: tuliko rivi, aika järkevä, talopalat > 0; MITTARI-arvot ≠ -1 (piirrot -1 = ei Development/editori).
- KAUPUNKITAULU odottaa KK:n vastausta (1b–1f).

## LISÄYS 25 — NOLLAUS TÄSTÄ (11.11. 21.4x, kontekstivahti 25 %). JATKA NÄISTÄ:
- KK 21.3x PÄÄTÖKSET (kirjattu tehtävänantoon "Tarkennukset NS"): T3 rivi PYYNNÖSTÄ, katto 120 s, aika pyynnöstä + alusta; mittari = KS:n PiirtoTilasto,
  piirrot vain editori/Development riittää. → TEHTY c1841699a (natiivi-backup natiiviseppa/tyokalu3-rivit: d088ca46a → 67860bf8a PiirtoTilasto KS:n
  sellaisenaan → c1841699a; unity 0). Komento `kaupunki-valmis <id>` → "kaupunki valmis <id> <N alusta> s (pyynnöstä M s; …)" / "kaupunki EI valmis <id> 120 s
  (kesken: …; alusta N s)". JU:lle kerrottu (sk:ihin `komento kaupunki-valmis @KAUPUNKI@` + oleta 130). KS:lle kerrottu (PiirtoTilasto public-muutos).
  JU:n koe: sk-ns-rivit-koe-pariisi.txt → lokit/ns-tyokalu3-koe-pariisi-<sha> koekamera-1:n ja KS KJ48:n jälkeen. LUE: rivi tuli, N järkevä, talopalat > 0,
  MITTARI ennen/valmis/20s arvot (kolmiot > 0, piirrot ≠ -1 editoriajossa) → KK:lle (kopio PT) + junaehdokas.
- T1 KAUPUNKITAULU (KK 21.3x, aloita LATAUSJONON JÄLKEEN): (1b) kolme rajausta (talot, kyltit, kamera; kyltit/kamera oletus = talot, jos puuttuvat);
  (1c) tila koe|julkaistu = vain näkyvyys, muut erot (maan nosto ym.) omina kenttinään; (1d) nimiviite TaloPoistot*-taulukoihin Pariisille/Lontoolle,
  uusille generaattorin poistolista, ei uusia C#-taulukoita; (1e) taulu pelin sisällä (Resources/StreamingAssets), sama tiedosto generaattorille (KS);
  (1f) korvaa PuuRuudukko.Kaupungit, testi: samat puutiedostot samoille 35 kaupungille. Näyttö: Pariisi ja Lontoo ennallaan (vakioajon arkki ennen|jälkeen, palamäärät).
  Kohdat (agentin kartoitus): TaloAlue :14 :25–28 :116 :122, PariisiKallistus :18 :59 :63–67, TaloKerros ~:285–296 :431, TaloLataus :38–45,
  PuuRuudukko :~23 :~32, Rakennus.cs :1194–1196 (editori), OhjelmaKohteet :16 :~280, KaupunkiPallot :1162, NostotKartalla :706–714 (2 viim. NUI:n alue).
- LATAUSJONO: palkki-3 (393acb884, L1, alkoi 20.48) → lue.py; katko-5 (2edb6edeb) JU:n jonossa NUI petit-palais-4:n jälkeen → K1-virhe-kuvassa viesti + nappi?
  Sitten KK-VIESTI (kopio PT) + junaehdokas 2edb6edeb → pt-ok PT:lle. Jono JU:lla sen jälkeen: pala3-luettelo-1 → koekamera-1 → T3-koe.
- PT 21.3x tiedoksi (aarrekysymyksen esilataus, kun jonoon): omistaja 20.47: rasti EI vapauta esiladattua kaupunkia väkisin (pelaaja jää kartalle,
  matka jatkuu Liiku-napista); suunnitelmat/20261111-aarrekysymys-saapuessa.md kohta 4.
- Vahti: Monitor `bash /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/latausjono/vahti-mac2.sh` (katko-[3-9], palkki-3, pala3-*; lisää ns-tyokalu3-koe-*).
  Cron 9.04 unity-julkaisut.py LUO UUDELLEEN.

## LISÄYS 26 (11.11. 21.00, uusi sessio nollauksen jälkeen): katko-5 luettu = OK
- KATKO-5 (2edb6edeb, JU 20.59, rc 0, PUUTE 0): K1-virhe-kuvassa NYT näkyvät palkki + "Lataus ei onnistunut. Tarkista verkkoyhteys ja yritä uudelleen."
  + kultainen "Yritä uudelleen" (rajaus alaosasta täysikoossa katsottu). K1b: ☰-valikko latauskuvan päällä (Säännöt, tarina, Kertoja/Tekstitys/Musiikki,
  Poistu) OK. K2: uudelleenavaus "kulkukartta ladattu" 139 s, täysi maailma (Kielletty kaupunki) OK; latausjono valmiita 1146, puuttuu 3 (404:t, vanhat).
  Sivuhuomio KK-viestiin: virheteksti vaalea ohut fontti vaalealla kivellä ilman taustaa → heikosti luettava (ehdotus: tumma puolihimmeä tausta tai varjo).
  POIKKEUS ArgumentOutOfRange "ui konsoli pois" -kohdassa on myös katko-3/4:ssä = ajokehyksen, ei 2edb6edeb:n.
- PALKKI-3 (L1) kansio tyhjä 20.48 alkaen → odottaa. KK-VIESTI (kopio PT) kun palkki-3 luettu → junaehdokas 2edb6edeb → pt-ok PT:lle.
- Vahti: Monitor vahti-mac2.sh käynnissä (bgd50uf1x). Cron 9.04 EI vielä luotu tässä sessiossa.
- PALKKI-3 LUETTU (21.05): pisin sama 0,177 ~40 s (osamallit 31 s + lähipuut 20 s olivat 1 yksikkö ~940:stä), 0,164 ~30 s (avoimet 57 s).
  KORJAUS 116d4b240 (natiivi-backup natiiviseppa/latausjono, unity 0; pohjavahti punainen UI-tiedostoissa jo pohjalla, ei tästä): EtuPainot 0,10/0,054/0,034,
  EtuAlku/Etu/EtuLoppu, Ali-kerroin 0,95 etuvaiheissa. JU: ajopyynto-mac-palkki-4.md → lokit/natiiviseppa-juoksu-latausjono-palkki-4 (pala3-luettelo-1:n jälkeen).
- KK-VIESTI LÄHETETTY 21.06 (kopio PT): junaehdokas 2edb6edeb, virhetekstin tausta -ehdotus. Odota KK:n sana → pt-ok PT:lle.
- Cron 9.04 luotu (38595728). Seuraavaksi T1 kaupunkitaulu.

## LISÄYS 27 — NOLLAUS TÄSTÄ (11.11. 21.1x, kontekstivahti 24 %). JATKA NÄISTÄ:
- LATAUSJONO: katko-5 OK (lisäys 26). Palkki-4 (116d4b240) JU:n jonossa pala3-luettelo-1:n jälkeen → LUE python3 -I …/latausjono/lue.py
  lokit/natiiviseppa-juoksu-latausjono-palkki-4: pisin sama arvo ≤ 15 s? (palkki-3: 40 s 0,177 osamallit+lähipuut, 30 s 0,164 avoimet) + ositusrivit.
  Jos yhä > 15 s: katso mikä lohko (rivien välissä olevat "Lohko"/latausrivit) ja säädä EtuPainot/HantaPainot. → KK:lle (kopio PT).
- KK-VIESTI 21.06 lähetetty: junaehdokas 2edb6edeb + virhetekstin tausta -ehdotus → ODOTA KK:n sana → pt-ok-pyyntö PT:lle (junaan 2edb6edeb tai 116d4b240).
- T1 KAUPUNKITAULU ALOITA NYT (KK:n linjaukset lisäys 25: 1b kolme rajausta, 1c tila koe|julkaistu vain näkyvyys, 1d nimiviite poistotaulukkoihin,
  1e Resources/StreamingAssets + sama tiedosto KS:n generaattorille, 1f korvaa PuuRuudukko.Kaupungit; testi samat puut 35 kaupungille).
  WT LUOTU: /Users/Shared/Claude/wt/proto-natiiviseppa-kaupunkitaulu (haara natiiviseppa/kaupunkitaulu juna-224 53171fed0:sta, ei committeja).
  Tiedostot: Kartta/TaloAlue.cs (266 r: La0..Lo1 :9, AsetaArvot :14 asettaa LontooKoe = la0 > 50, SeuraaKameraa :21–29 kovakoodatut Pariisi/Lontoo,
  PoistoTaulu :116 LontooKoe ? TaloPoistotLontoo(Isot) : TaloPoistot, PoistoAvain :122), Kartta/PariisiKallistus.cs (211), Kartta/TaloKerros.cs (479),
  Kartta/TaloLataus.cs (397), Linssit/Ydin/Elava/PuuRuudukko.cs (272). Muut kohdat lisäys 25. Tehtävänanto:
  /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261111-kolme-tyokalua-tehtavananto.md (TYÖKALU 1 kohta 1).
  Näyttö: Pariisi ja Lontoo ennallaan (vakioajon arkki ennen|jälkeen, palamäärät) + taulun testit.
- T3-koe (c1841699a) JU:n jonossa koekamera-1:n jälkeen → LUE lisäys 25:n ohjeella.
- tarkista.sh: pohjavahti punainen UI-tiedostoissa (Kartta.uss, Matkakirja.uss, Kartuscha, JuoksupeliNakyma) jo junan pohjalla; tyylikirjan päivitys palautetaan.
- Vahti: Monitor vahti-mac2.sh (lisää palkki-4 kuvioon: natiiviseppa-juoksu-latausjono-palkki-[3-9]*) + ns-tyokalu3-koe-*. Cron 9.04 LUO UUDELLEEN.

## LISÄYS 28 (11.11. 21.4x, uusi sessio nollauksen jälkeen): KK 21.10 kohdat 1–4
- KK 21.10: (1) 2edb6edeb JUNAAN KYLLÄ → pt-ok-pyyntö PT:lle LÄHETETTY 21.2x. (2) virheteksti ☰-levylle, (3) napin painallus näyttöön + rivi
  "sama koodipolku?", (4) palkki-4 luvut. Kohdat 2–3 + palkki-4 SAMAAN ERÄÄN, junaan vasta KK:n sanalla.
- TEHTY 246e99d91 (natiivi-backup natiiviseppa/latausjono, unity 0, pohjavahti = pohja): .mk-edistyminen__viesti--virhe (Matkakirja.uss: tk-lasi-pinta-peitto,
  tk-lasi-reunus, tk-kulma-kortti, tk-lasi-muste, 15 px) + Kirjasin.Luku; QA `ui juoksupeli uudelleen-nappi` (UiKomennot.Napauta napin keskelle).
  KK:lle vastattu: nappi = Sulje() + Avaa(samat asetukset) = sama polku kuin pois + v4; ero: nappi avaa heti (skenaario odotti 5 s).
- JU: ajopyynto-mac-katko6.md (sk-juoksu-latausjono-katko-6.txt) palkki-4:n jälkeen → lokit/natiiviseppa-juoksu-latausjono3-katko-6.
  LUE: K1-virhe (levy, rajaus alaosasta täysikoossa) → KK; B: "testipainallus" → "Yritä uudelleen" → uusi "latausvirhe näkyy" (aika lokista, ~30 s
  etenemättömyydestä, ei jumia), K3; A: verkko takaisin → painallus → "kulkukartta ladattu", K2-nappi-uudelleen.
- PALKKI-4 (116d4b240) yhä JU:n jonossa → lue.py (pisin sama ≤ 15 s?) → KK (kopio PT) samassa viestissä katko-6:n kanssa → KK:n sana → pt-ok PT:lle (246e99d91).
- Cron 9.04 luotu (3a20ab69). Monitor vahti-mac2.sh käynnissä (kattaa katko-6, palkki-4, T3-koe).
- SEURAAVAKSI: T1 KAUPUNKITAULU (lisäys 27 ohjeet).

## LISÄYS 29 (11.11. 21.5x): palkki-4 luettu, kaksi agenttia käynnissä
- PALKKI-4 (116d4b240): EI ≤ 15 s: 0,872 ~50 s (C1 nosti 0,800 → 0,872 yhdessä jaksossa, ulkorengas 95 s antaa vain ~0,02), 0,639 ~20 s.
  Alku korjattu (palkki-3:n 40/30 s poissa). Lataus 757 s (0,31 Mt/s), rc 0, mallit 439/439. lue.py:n "latausvirhe näkyy 1 / LUOVUTETTU 2" = väärä
  hälytys (oleta-rivi + koekatkon valinnaiset). KK:lle lähetetty 21.5x.
- AGENTTI A (Opus): palkki-korjaus latausjono-työpuuhun (natiiviseppa/latausjono, "NS: latausjono 3l") → sitten ajopyynto-mac-palkki-5.md JU:lle
  (sk-juoksu-latausjono.txt → lokit/natiiviseppa-juoksu-latausjono-palkki-5). Jos agentti ei raportoinut: git log natiivi-backup/natiiviseppa/latausjono.
- AGENTTI B (Opus): T1 kaupunkitaulu määrittelyn mukaan (/Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/tyokalut/t1-kaupunkitaulu-maarittely.md)
  → commit natiiviseppa/kaupunkitaulu ("NS: T1 kaupunkitaulu:"). SHA → KS:lle (tee_palat.py lukee kaupungit[id].generaattori + talot). KATSO diff
  itse ennen KK-viestiä; näyttö vakioajon arkki Pariisi + Lontoo ennen|jälkeen (JU).
- KATKO-6 (246e99d91) JU:lla (järjestys PT 21.2x: KS KJ47c → katko-6 → KJ48 → koekamera-1).
- JU: MR78 = 224.83 vie 2edb6edeb:n junaan; LINKKI-rivi tulossa NS:lle.

## LISÄYS 30 — NOLLAUS TÄSTÄ (11.11. 22.4x, kontekstivahti 30 %). JATKA NÄISTÄ:
- LATAUSJONOERÄ (KK: yksi erä junaan KK:n sanalla): katko-6 HYVÄKSYTTY (virhelevy + nappi, KK 21.3x). 2edb6edeb junassa 224.83 (JU MR78; LINKKI-rivi tulossa).
  PALKKI-5: 1b1359d75 (natiivi-backup natiiviseppa/latausjono; 3l cde7eb38e = palkki taulusta + 3m uusinta näkyy 0,0012; Peli-testit 929/929, unity 0).
  Taulu: _tyo/natiiviseppa/latausjono/palkkitaulu-5.md (31 lohkoa; "–" = alle 1 s:n hetkelliset, kerro KK:lle niin; ennuste palkki-4:n kestoilla:
  pisin sama 0 s, suurin hyppy 0,009). Uusi lokirivi "palkkilohko <nimi> alkaa, palkki a → b (taulu x–y, t s)".
  JU: ajopyynto-mac-palkki-5.md, kaksi ajoa → lokit/natiiviseppa-juoksu-latausjono-palkki-5 (hidas) ja …-palkki-5-nopea. LUE molemmista lue.py
  (pisin sama arvo; suurin hyppy = suurin ero peräkkäisissä "latauspalkki"-riveissä) + palkkilohko-rivit vs taulu → YKSI KK-viesti (kopio PT):
  taulu + hitaan pisin sama + suurin hyppy + nopean pisin sama. KK:n ehto: ei tyhjää lähdettä ja pisin ≤ 15 s → KK:n sana → pt-ok PT:lle (1b1359d75).
  Jäännösriski (agentti): täysin hiljainen pakollinen haku seisoo kunnes katkaisu 15 s → voi näkyä 2 samana näytteenä (~10–20 s).
- T1 KAUPUNKITAULU VALMIS cfe3324a3 (natiivi-backup natiiviseppa/kaupunkitaulu; dd370eab6 agentin työ + muokkaustilan lataus PalloKierto.OnEnable →
  KaupunkitauluLataus.Varmista; Kartta-testit 771/771, Linssit-testit 2293/2293, unity 0). 37 puukaupunkia (ei 35), järjestys = vanha PuuRuudukko.
  Käytöksen erot vain rajoilla (inklusiivinen, 200 000 pistettä ei eroa), OhjelmaKohteet palaa Pariisin listaan vasta Pariisin kamera-alueella,
  `talot alue` -komento valitsee rivin kamera-alueesta (ennen la0 > 50). OfflineSilta.MaanKaupungit (FRA/GBR) yhä kovakoodattu (ei määrittelyssä).
  NUI:n tiedostot: KaupunkiPallot:1162, NostotKartalla:709–714 (OnPariisissa poistettu) → KERRO NUI:lle (local_4b84cd90-…), EI VIELÄ KERROTTU.
  JU: vakioajo Pariisi + Lontoo cfe3324a3 palkki-5:n jälkeen → lokit/ns-kaupunkitaulu-vakioajo-cfe3324a3; ennen = JU:n 210c842ad-ajo. LUE arkit
  ennen|jälkeen (sama kuva, palamäärät) → KK (kopio PT) + junaehdokas. KS:lle SHA kerrottu (tee_palat.py lukee generaattori + talot).
- T3-RIVIT c1841699a: KK 21.37 JUNAAN KYLLÄ → pt-ok-pyyntö PT:lle LÄHETETTY 22.3x.
- MONO-SELVITYS (KK 21.37): latausjonoerän JÄLKEEN, vain mittaus Macilla: valmiin jälkeisten 20 s:n kolme suurinta varaajaa kutsupaikkoineen (Mt/s;
  T3-kokeessa mono 632 → 1584 Mt / 20 s) + toistuuko ennen kaupungin latausta → yksi viesti KK:lle; ei korjauksia.
- tarkista.sh-ANSA: se päivittää Tyylikirja.uss/.cs/json mainista; PALAUTA ne ennen seuraavaa ajoa (muuten Lasipohja CS0117 HarmaaTummaLasi).
- Monitor vahti-mac2.sh + cron 9.04 LUO UUDELLEEN (kuvio kattaa palkki-[3-9]*, katko-[3-9]*, ns-tyokalu3-koe-*; lisää ns-kaupunkitaulu-vakioajo-*).
- 30b (22.5x) JU: T1-vakioajo ajetaan koeyhdistelmällä 37c7d3b75 (= 210c842ad + cfe3324a3, natiivi-backup julkaisija/koe-kaupunkitaulu-vakioajo, ei junaan;
  T3-rivit + NUI:n "ui vakio" mukana) → lokit/ns-kaupunkitaulu-vakioajo-cfe3324a3 (pariisi, lontoo + *-ennen-210c842ad). Palkki-5:n kuittauksen loppurivi
  "JU NS palkki-5 valmis".

## LISÄYS 31 (11.11. 21.5x, uusi sessio local_0f7f169f nollauksen jälkeen)
- PT/KK 21.47 LINJAUS: latausjonoerän (palkki-5) JÄLKEEN NS siirtyy KOKONAAN KAUPUNKITYÖKALUIHIN (T1 kaupunkitaulu → KK, T3, mono-selvitys ym.).
  Juoksupelin palat 4–9 EIVÄT ala ennen omistajan "Pariisi valmis" -korttia.
- NUI 21.5x: kaupunkitaulun muutokset KaupunkiPallot.cs:1162 / NostotKartalla.cs:709–714 kerrottu; NUI: ei ristiriitaa avoimiin NUI-haaroihin → junaan sellaisinaan.
- PALA3-KOEKAMERA-1 (0f851ddbd) LUETTU: K1/K1b eivät toista V2-elava.png:tä (kujan keskeltä; V2 = kujan suu aukiolle). Lokin kamera-rivi näyttää PELIKAMERAN
  myös testikamera-kuvissa (K2–K6; testikamera jäi päälle K5:stä K6:een). LAV:lle kameran pohjat + korjaus lähetetty.
  LAV:n uudet pisteet → sk-juoksu-pala3-koekamera-2.txt (K6 −136 425 suunta 0 pelikamera; K7 −136 336 180 peli; K7b + testikamera 2.7 7.1 12 29).
  JU: ajopyynto-mac-koekamera-2.md palkki-5:n + T1-vakioajon jälkeen → lokit/natiiviseppa-juoksu-pala3-koekamera-2 → kuvat LAV:lle (kameran pohjat K6/K7).
- Monitor vahti-mac2.sh (kuvio + ns-kaupunkitaulu-vakioajo-*) ja cron 9.04 luotu tähän sessioon.
- 31b (21.5x) PALA 3 ODOTTAA (PT: KK:lle ehdotettu, että pala 3 odottaa kuten 4–9): LAV:n 3.1b B -pariajo EI ALOITETTU. Pyyntö: koe-glb
  /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/leivonta-v5-tyo/koe-b/ulos-{6.25,12.5}/kk-tausta-1-3-lod0.glb (valo_rgbm 4096², UV1 uusi; korvaa vain
  kk-tausta-1-3, kuja-1-3 pysyy v5) → pari vanha `valo elava kaikki` | koe `valo elava pelaaja`, K1–K5 + K6 (−136 425 0) + K7 (−136 336 180), molemmat
  tarkkuudet, täysikoossa KK:lle (kopio LAV). Vaatii glb-korvauskytkimen. KOEKAMERA-2 PIDÄTETTY JU:n jonosta. Molemmat vasta KK:n sanalla. LAV:n luovutus 8b58e158c.
- 31c (21.5x) JU: 224.83 LINKISSÄ = a63615592 (latausjonokorjaus 2edb6edeb). T3-rivit c1841699a → 224.84. Palkki-5 1b1359d75 yhä odottaa ajoa.
- 31d (22.0x) PT/KK 21.54 JÄRJESTYS: 1) palkki-5-erä 2) kaupunkitaulun SHA KS:lle (vahvistettu uudelleen cfe3324a3) 3) LAV:n 3.1b B -pari (yöllä, vain tämä pari)
  4) kaupunkityökalut. Pala 3.2–3.5 odottaa Pariisi valmis -korttia (kuten 4–9). → 31b:n pidätys PURETTU parin osalta.
  TEHTY 9a78cd26b (natiivi-backup natiiviseppa/pala3-pinnat, unity 0): QA `palatsi korvaa <avain> <kohde>` / `korvaa pois` (JuoksuHahmot.Korvaukset, pisin avain
  ensin; Hae käyttää korvaajaa, Palatsi.Esihae ohittaa korvatut). Skenaario _tyo/natiiviseppa/pala3/sk-juoksu-pala3-pari-b.txt: A vanha (tausta-v133c/ → v134 levyltä,
  elava kaikki) | B koe 6,25 (+ kk-tausta-1-3-lod0.glb koe-b/ulos-6.25, elava pelaaja) | C koe 12,5; kamerat K1–K7b → 27 kuvaa. JU: ajopyynto-mac-pari-b.md YÖLLÄ
  palkki-5:n jälkeen → lokit/natiiviseppa-juoksu-pala3-pari-b (KORVAA koekamera-2:n). LUE: unity.log "korvaus"-rivit + kuvat A|B|C samasta kamerasta → KK (kopio LAV),
  kuvat täysikoossa. LAV:lle kerrottu: muut paketit ennallaan (rakennukset v127 ym.), kysytty haluaako muut v5-kansiot.
- 31e (22.0x) LAV: pari-b:hen kaikkiin sarjoihin myös rakennukset-v128 (v127:n tilalle) + muurikate-v41 (v40:n tilalle), osasarja v15 jää; skenaario päivitetty. JU: pari-b yöllä (klo 23 jälkeen) palkki-5:n + T1:n jälkeen, koekamera-2 poistettu jonosta.
- 31f (22.1x) PALKKI-5 HIDAS LUETTU: pisin sama ~10 s (2 riviä), suurin hyppy 0,032, laskuja 0, mallit 439/439, pakollinen VIRHE 0, lataus 678 s; lohkorivit seuraavat taulua (LOD0 ~208 s, ulkorengas ~94 s). LUOVUTETTU 3 = koekatkon valinnaiset, 'LATAUS EPÄONNISTUI' = oleta-rivin kuvio. Odottaa nopeaa → yksi KK-viesti. JU: 224.84 LINKISSÄ = c4b6179cf (T3-rivit c1841699a).
- 31g (22.1x) PALKKI-5 NOPEA LUETTU: 89 s, pisin sama 0, 439/439; hyppy 0,415 = näyteväli (9 näytettä). KK-VIESTI LÄHETETTY (kopio PT): junaehdokas 1b1359d75 → ODOTA KK:n sana → pt-ok PT:lle. SEURAAVAKSI kaupunkityökalut: T1-vakioajo (JU) luenta → KK + junaehdokas cfe3324a3; mono-selvitys (lisäys 30).
- 31h (22.2x) NUI aarrekysymys 79f883671 (natiivi-backup natiivi-ui/aarrekysymys): NS:n esilatausosuus TARKISTETTU, ei koodia: kysymyksen ajan MatkaPerilla lykkääntyy → esilataus jatkuu; rasti MatkaPerilla(null) → SaapumisLaatatSilta.Perilla → Esilataus.Peru (jonossa olevat pois, käynnissä valmistuvat, ladatut välimuistiin = KK:n kohta 4). NUI:lle vastattu. Mac-ajo lokit/nui-aarrekysymys-1-79f883671 (NUI lukee).

## LISÄYS 32 — NOLLAUS TÄSTÄ (11.11. 22.2x, kontekstivahti 25 %). JATKA NÄISTÄ:
- KK 22.10: palkki-5 1b1359d75 JUNAAN → pt-ok-pyyntö PT:lle LÄHETETTY 22.2x. Työlistarivi jää auki: "pisin sama ≤ 15 s" EI todistettu 10 s:n näytteistä
  (2 samaa = 10–30 s; kaksi kohtaa: (a) alku 0,024 t 29,0 → 48,5 s, alkuarvo peittää taulun 3 ensimmäistä lohkoa 0,002–0,019; (b) t 99–109 s 0,093 kahdesti
  "kesken 0 %", juhlasali.glb 16 Mt latautui koko ajan, 0,117 vasta salin jälkeen).
- JATKOERÄ PALKKI-6 (natiiviseppa/latausjono 1b1359d75:n päälle, wt /Users/Shared/Claude/wt/proto-natiiviseppa-latausjono; enintään nämä 3):
  1) näytetty palkki = alkuarvo + (1 − alkuarvo) × taulu (tai vastaava) → liikkuu ensimmäisestä lohkosta.
  2) ison tiedoston latauksen tavut keskeneräiseen askeleeseen; SELVITÄ ENSIN miksi "kesken 0 %" (esihaun taustahaku ei kirjaudu askeleelle?). Jos ei pieni → syy KK:lle.
  3) PELIN OMA MITTARI lokiin latauksen lopussa: "palkki: pisin sama arvo X s kohdassa Y (lohko Z)", joka ruudulta näytetystä arvosta (sama = muutos < 1 kuvapiste
     palkin leveydestä); pysyvä tarkistus. NÄYTTÖ: hidas verkko (sk-juoksu-latausjono.txt), mittaririvi ≤ 15 s → KK. Mac-ajo väliin tai yöhön (kartan ajot ensin).
  Nopean verkon epätasaisuus hyväksytty.
- JÄRJESTYS (KK 22.10 + PT 21.54): kaupunkitaulun SHA KS:lle TEHTY (KS kuittasi: 1794edafd lukee taulun, Lontoo 242/242 tavulleen sama; KS:n seuraaja tekee
  silta-askeleen OhjelmaKohteet/TaloAlue cfe3324a3:n päälle) → PALKKI-6 → kaupunkityökalut (T1-vakioajo JU:lla lokit/ns-kaupunkitaulu-vakioajo-cfe3324a3 → LUE
  arkit ennen|jälkeen + palamäärät → KK + junaehdokas cfe3324a3; mono-selvitys lisäys 30).
- PARI-B (pala 3.1b) JU:lla YÖLLÄ (klo 23 jälkeen, pid 41093) 9a78cd26b → lokit/natiiviseppa-juoksu-pala3-pari-b: LUE unity.log "juoksupeli: korvaus" (v134, v128,
  muurikate-v41, koe-glb), ei puuttuu-rivejä → 27 kuvaa A|B|C samasta kamerasta täysikoossa KK:lle (kopio LAV local_f12c9179). Lokin "kamera"-rivi näyttää pelikameran
  myös testikamerakuvissa (K2–K5, K7b).
- Vahti: Monitor `bash /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/latausjono/vahti-mac2.sh` (kattaa palkki-[3-9]*, pala3-*, ns-kaupunkitaulu-vakioajo-*). Cron 9.04 LUO UUDELLEEN.
- 32b PT 22.1x: 1b1359d75 → juna 224.87 (pt-ok). Järjestys ennallaan: SHA KS:lle (TEHTY) → palkki-6 → kaupunkityökalut; pari-b yöllä.

## LISÄYS 33 — NOLLAUS TÄSTÄ (11.11. 22.3x, kontekstivahti 26 %). JATKA NÄISTÄ:
- PALKKI-6 TEHTY 6c5b95883 (natiivi-backup natiiviseppa/latausjono, 1b1359d75:n päälle; Peli-testit 930/930, unity 0): 1) JuoksuLatausEdistyminen.Naytetty
  (alkuarvo + (1 − alkuarvo) × taulu, JuoksuV4Maailma.palkkiPohja); 2) "kesken 0 %" SYY: Latausjono.Lataa luki pakollisuuden vain yrityksen alussa,
  juhlasali.glb alkoi taustan valinnaisena esihakuna → Nosta kesken yrityksen → tavut eivät kirjautuneet. Nyt Osuus lukee Jono.OnPakollinen joka kerta;
  KeskenKatto vain kun koko lohko kesken (k = 1); avoimien askel mallin tavujen mukaan (Palatsi.AvoinPaino: juhlasali 16,3 / 9,2 / 9,2 / 9,6 Mt);
  3) pelin oma mittari JuoksupeliNakyma.MittaaPalkki (SamaMittari, joka ruutu, kynnys 1 px palkin leveydestä) → lokirivi lopussa
  "juoksupeli: palkki: pisin sama arvo X s kohdassa Y (t …, lohko Z); kynnys …, leveys N px". lue.py tulostaa sen "MITTARI"-rivinä.
  JU: ajopyynto-mac-palkki-6.md (hidas, sk-juoksu-latausjono.txt) → lokit/natiiviseppa-juoksu-latausjono-palkki-6 (pyydetty 22.2x).
  LUE: python3 -I /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/latausjono/lue.py <kansio> → MITTARI ≤ 15 s? + 439/439 + VIRHE 0 → KK (kopio PT):
  mittaririvi + mitä korjattiin (alkuarvo, juhlasalin syy) → KK:n sana → pt-ok PT:lle (6c5b95883). Jos > 15 s: lohko rivistä → säädä.
- MONO-SELVITYS (KK 21.37, vain mittaus) TEHTY 0e7c0a6a9 (natiivi-backup natiiviseppa/mono-selvitys, wt /Users/Shared/Claude/wt/proto-natiiviseppa-tyokalu3,
  c1841699a:n päälle, EI JUNAAN): QA `mono-varaajat <s> <tunniste>` (Kartta/MonoVaraajat.cs koukku + Editor/MonoVaraajatEditori.cs: ProfilerDriver +
  RawFrameDataView, kaikki säikeet, kutsupinot). Rivit "MONO-VARAAJAT <t> 20 s: mono a → b Mt …, GC.Alloc yht …", "MONO-VARAAJA <t> 1–5 … Mt/s | merkit | kutsupaikka",
  "MONO-KAYRA". Jos "PROFILOIJA EI TALLENTANUT" → batchmode-rajoitus, keksi muu (esim. ProfilerRecorder GC Allocated In Frame + omat merkit).
  JU: _tyo/natiiviseppa/mono/ajopyynto-mac-mono-1.md (sk-mono-pariisi.txt: 20 s ennen kaupunkia + 20 s valmiin jälkeen) → lokit/ns-mono-1, palkki-6:n jälkeen.
  LUE → YKSI viesti KK:lle (kopio PT): kolme suurinta varaajaa kutsupaikkoineen (Mt/s) + toistuuko ennen kaupungin latausta. Ei korjauksia.
- T1-vakioajo (cfe3324a3, JU koeyhdistelmä 37c7d3b75) ei vielä ajettu (lokit/ns-kaupunkitaulu-vakioajo-cfe3324a3 puuttuu 22.19) → LUE arkit ennen|jälkeen + palamäärät → KK + junaehdokas.
- PARI-B (pala 3.1b) JU:lla yöllä → ohje lisäys 32.
- Vahti: Monitor `bash /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/latausjono/vahti-mac3.sh` (= mac2 + vanhat tilat ohitetaan alussa + ns-mono-*). Cron 9.04 LUO UUDELLEEN.
- 33b (22.2x) JU kuittasi: palkki-6 jonossa KJ49 + T1-vakioajo + aarrekysymys-1 jälkeen (pid 97710) → lokit/natiiviseppa-juoksu-latausjono-palkki-6; mono-1 sen jälkeen (pid 7243) → lokit/ns-mono-1; pari-b erikseen klo 23 jälkeen.
- 33c (22.4x) NUI (KK 22.19): työlistariviin "Ensimmäisen kertojan luennan viive" kirjattu: intro-nimet-5 (165addc72, b-lontoo) puheen ulostulo seisoi ~2,0 s (puhejärjestelmän käynnistys, 2,1 s yhteensä), lokit proto-3d/lokit/nui-intro-nimet-5-165addc72. Ei aloitettu (kaupunkityökalut ensin, KK:n järjestys).
- 33d (22.59) JU: latausjonoerä 1b1359d75 LINKISSÄ 224.87 (a5c62488f), testit läpi. Palkki-6 (6c5b95883) tulee sen päälle omana eränään KK:n sanalla.

## LISÄYS 34 (11.11. 23.1x, uusi sessio local_0f7f169f nollauksen jälkeen)
- Palkki-6, mono-1, T1-vakioajo, pari-b: EI vielä lokeja 23.18 (JU ajaa KJ49b:tä). Lue ohjeet lisäys 32–33.
- KERTOJAN VIIVE (työlista NS jarj 3, KK 22.19 "kaupunkityökalujen jälkeen"; kaupunkityökalut odottavat ajoja → aloitettu):
  NUI:n 2,0 s = Macin eräajon ilmiö (batchmode: DSP-kello ei etene, Puhe.cs:1159 odottaa 2 s; iPad 100–400 ms). Syy yhä 10.11. mittaus (Louvre 5,3 s verkosta).
  Korjaus cbaaf1d34 siirretty juna-224 72dcd6811:n päälle: natiivi-backup natiiviseppa/kertoja-esilataus-2 = 871011608 (QA `puhe valimuisti tyhjenna`) + 333e91c45
  (esilataus), unity 0, wt /Users/Shared/Claude/wt/proto-selvittaja-kertoja-esilataus. JU: _tyo/natiiviseppa/kertoja-viive/ajopyynto-mac-esilataus.md (ennen|jälkeen)
  → lokit/natiiviseppa-kertoja-esilataus-mac-{ennen,jalkeen}. LUE "puhe: alkoi … (verkko|välimuisti)" 3 kohteelle + "kertojan esilataus: pariisi" → KK (kopio PT)
  + junaehdokas 333e91c45 (+ QA 871011608). Ehdotus KK:lle: batchmodessa ohita DSP-odotus (Application.isBatchMode), jotta NUI:n ajastusmittaukset eivät vääristy.
  Yhteenveto _tyo/natiiviseppa/kertoja-viive/tulos.md.
- Vahti: Monitor `bash /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/latausjono/vahti-mac4.sh` (= mac3 + kertoja-esilataus-mac-*). Cron 9.04 LUO UUDELLEEN.

## LISÄYS 35 — NOLLAUS TÄSTÄ (12.11. 03.0x, kontekstivahti 26 %). JATKA NÄISTÄ:
- T1 KAUPUNKITAULU: vakioajo luettu (Pariisi 21,6 → 21,5 s, 1613 → 1603 Mt; Lontoo 23,2 → 23,1 s, 1669 → 1666 Mt; 66/66, PUUTE 0, kuvat samat).
  Kuvat proto-3d/lokit/ns-kaupunkitaulu-vakioajo-cfe3324a3-vertailu/. KK 03.02 JUNASANA → pt-ok-pyyntö PT:lle LÄHETETTY 03.0x (cfe3324a3). Odota LINKKI-rivi JU:lta.
  KK:n huomiot: (1) vakioajon kohdekamera ei toistu (Cutty Sark 20°/18°) → NUI:lle kirjattu (Vakioajo.cs 210c842ad on NUI:n), kopio JU; (2) Lontoon
  "nähtävyysalueet luotu 0" = oikein (Nahtavyysalue.cs:n 10 aluetta kaikki Pariisin) → KK:lle vastattu.
- JU:N JONO (03.00): palkki-6 → pala3-pari-b → mono-1 → kertoja-esilataus (ennen|jälkeen). Lukuohjeet: palkki-6 lisäys 33, pari-b lisäys 32, mono-1 lisäys 33,
  kertoja lisäys 34. Kansiot: lokit/natiiviseppa-juoksu-latausjono-palkki-6, natiiviseppa-juoksu-pala3-pari-b, ns-mono-1, natiiviseppa-kertoja-esilataus-mac-{ennen,jalkeen}.
- PT:lle vastattu: pariisi-talot NAS:lle (PT siirtää), 14 työkopiota poistettu (jäljellä latausjono, tyokalu3, kaupunkitaulu, pala3, kertoja-esilataus, tyokalut),
  Muistin keventäminen -rivin tila (0, V, 1, 2a junassa; jäljellä iPad-vahvistus + laattamuisti 1–3 KK:n iPad-erässä).
- Vahti: 30 min Monitor-uusinnat syövät kontekstia → käytä taustaodotusta (Bash run_in_background until-silmukka: loki.txt "valmis N s|LOPPU|ajo päättyi" kansioissa yllä).
  Cron 9.04 LUO UUDELLEEN.
- 35b (03.1x) PT: cfe3324a3 ristiriidassa 224.94 (ce2849074) kanssa OhjelmaKohteet.cs:ssä (KS:n sillat). UUSI T1 = 5cb17d3db (natiivi-backup
  natiiviseppa/kaupunkitaulu-224-94 = ce2849074 + dd370eab6 + cfe3324a3; Lista(ohjelmakohteet, kaupungin id) + taulun kamera-alue; Kartta 782/782, Linssit 2293/2293,
  unity 0). pt-ok-pyyntö PT:lle LÄHETETTY 5cb17d3db:lle. NUI 631172274 (natiivi-ui/vakioajo): vakioajon lähtöasento kiinnitetty, JU ajaa uusinnan.
- 35c (03.1x) PALKKI-6 (6c5b95883) LUETTU: lataus OK (439/439, VIRHE 0, etenemätön 3,7 s), palkki 0,020 → 0,979, 10 s:n riveissä ei samoja peräkkäin. MUTTA MITTARI
  "pisin sama 28,9 s kohdassa 0,449 (t 327–356 s, lohko LOD0)", kynnys 1 px = 0,0119 (leveys 84 px eräajossa) → ehto ≤ 15 s EI täyty. KK:lle lähetetty (kopio PT).
  SEURAAVA: LOD0-lohkoon alavaiheet (katso "latauksen ositus"- ja "palkkilohko"-rivit t 327–356 s), uusi Mac-ajo palkki-7 → MITTARI ≤ 15 s → KK. Ei junaan ennen sitä.
  JU: T1 5cb17d3db = MR91/224.95, linkki kun sillat-ajo näyttää sillat kuten 224.94 (kuvat NS:lle ja KS:lle). JU:n jono: pari-b → mono-1 → kertoja.
- 35d (03.1x) KK 03.14 PALKKI-7 TARKENNUKSET (korvaa 35c:n "alavaiheet"): (1) LOD0-lohkon SISÄLLÄ palkki etenee vastaanotettujen tavujen mukaan (tavut / lohkon koko),
  EI kiinteinä välivaiheina → liikkuu aina kun dataa tulee, seisoo vain kun lataus oikeasti seisoo. (2) Mittarin "sama" ISON IPADIN palkin leveydestä
  (laitteen kuvapisteinä; kirjoita leveys mittaririville), ei eräajon 84 px:stä. Ehto ≤ 15 s hitaalla verkolla. Tulos KK:lle yhtenä rivinä + mittaririvi, ei kuvaa.
- 35e (03.2x) MONO-1 (0e7c0a6a9) VIRHEELLINEN: NRE MonoVaraajatEditori.cs:128 (nimetön merkki) → MONO-VARAAJAT-rivit puuttuvat + "kaupunki EI valmis pariisi 120 s
  (kesken maa)". KORJAUS 2086687cb (natiiviseppa/mono-selvitys, unity 0). JU: uusinta → lokit/ns-mono-2 (kertoja-esilataus ensin). LUE lisäys 33:n ohjeella;
  jos "kaupunki EI valmis (kesken maa)" toistuu, selvitä (profiloijan kuorma?).
- 35f (03.2x) PARI-B (9a78cd26b) VALMIS JU:lla, EI LUETTU (27 kuvaa, jätetty seuraajalle kontekstin takia): rc 0, NRE 0, korvaus-rivejä 1158, v134 puuttuu 0.
  HUOM PUUTE 2 = odota-maailma aikaraja (näkyvät 1409 → 1548, häivytys 0, valoatlaksia 0) → TARKISTA ENSIN, ovatko kuvat valmiista maailmasta (jos ei: kerro KK:lle
  ja pyydä uusinta pidemmällä odotuksella). Lue lisäys 32:n ohjeella → A|B|C samasta kamerasta täysikoossa KK:lle (kopio LAV local_f12c9179).
  JU: MR91-sillat Pariisi 7/7 ok, Lontoo ajossa → odota LINKKI 224.95 (5cb17d3db).
- 35g (03.3x) LAV pari-b:stä: EI KELPAA KK:lle sellaisenaan. Lokin osuma (0.65, 0.80) = "v4 palatsi osasarja kauko0 -3,-4" → pelin lattia on OSASARJA v15, ei kk-tausta-1-3:n
  V4_lattia (koe paransi väärää pintaa). B/C:n tasainen kirkas lattia = v15:n leivottu valo ilman elävää; koe-glb:n atlaksessa varjot ovat. Johtopäätös LAV: 3.1b:n tarkka
  valo leivotaan OSASARJAN ruutuihin (koealue, 1024²/64 m = 6,25 cm), LAV tekee yöllä KK:n luvalla → uusi pari sen jälkeen. TEE: kuvat (A|B|C) KK:lle LAV:n
  selityksen kanssa (pari näyttää: v15 ilman elävää = varjoton), kopio LAV. Seuraavaan pariin glb-korvaus osasarjan ruutuihin (palatsi korvaa <avain> <kohde>).
- 35h (03.3x) LAV KORJAUS 35g:hen: osasarjan valo on jo tarkka (valo.json 11,5–32 px/m, laatta-2m mukana) → EI uusia koeruutuja ennen syytä. Epäily: lattiassa piirtyy
  osasarjan KAUKO0-taso (karki.bin-kärkivärit, laatta-2m 12 kärkeä / 2 m → ei varjoja) eikä lähitaso/atlas, TAI v15:n atlas (r_*.png) ei latautunut. TEE ENSIN
  (ennen KK-viestiä): pari-b:n unity.logista / lyhyellä QA-ajolla kohdassa −136 336: kumpi osasarjan taso piirtyy (lähi/atlas vai kauko0) ja onko r_*.png ladattu
  → vika pelissä (NS korjaa: lähitason etäisyys/atlaksen lataus) vai leivonnassa (LAV). Tulos LAV:lle + KK:lle kuvien mukana.
- 35i (03.3x) JU: T1 MR91 = 62da37f7e sillat-ajo OK (Pariisi 7/7, Lontoo 5/5, kuten 224.94; lokit/mr91-sillat-*-62da37f7e). Käännös 224.95 käynnissä → odota LINKKI-rivi.
- 35j (03.4x) JU: T1 LINKISSÄ 224.95 = 62da37f7e (VALMIS). KERTOJA-ESILATAUS Mac-pari LUETTU → KK:lle (kopio PT): Riemukaari 183 → 85 ms, Notre-Dame 470 → 88 ms
  (välimuisti), Invalidit 400 ms (ei valmista äänitettä, 8 kpl). Junaehdokas 333e91c45 (+ QA 871011608) → ODOTA KK:n sana → pt-ok PT:lle. Työlista päivitetty.
  JU:n jono: mono-2 (2086687cb) seuraavaksi → lue lisäys 33/35e.
- 35k (03.4x) KK 03.40 JUNASANA kertojan esilataus 333e91c45 → pt-ok-pyyntö PT:lle LÄHETETTY. Laitteen luku seuraavassa iPad-erässä (ei erillistä ajoa).
  JATKO KK:lle (pieni): "ei valmista 8" → listaa 8 Pariisin kappaletta (kohde + kappale) + syy: äänite puuttuu kokonaan vai teksti muuttunut äänityksen jälkeen
  (SK:n kuvateksti-/vuosilukukorjaukset) → yksi viesti KK:lle. Jos tekstimuutos: ehdota putkeen tarkistus "jokaisella kaupungin luennalla on valmis kappale"
  (luku per kaupunki). Keino: lisää KertojanEsilataus.Aja:han lokiin ei-valmiit (kohde + 40 merkkiä tekstistä) TAI vertaa Valmisluennat-manifestia
  Nahtavyysarkki.JutunLuettavat-teksteihin skriptillä (manifestin avain = Puhe.ValmisUrl: Katkaise(JsTrim(teksti)) + persoona + loppuTagi).
- 35l (03.4x) JU: vakioajon kohdekamera toistuu NUI 631172274:llä (a = b, Cutty Sark 18° molemmissa) → KK:n huomio (1) ratkaistu (NUI:n). mono-2 ajossa → lokit/ns-mono-2.
- 35m (03.4x) MONO-2 (2086687cb): NRE 0, kaupunki valmis pariisi 21,7 s (ei toistunut). "MONO-VARAAJAT ennen 20 s: mono 426 → 335 Mt, GC 20, GC.Alloc 47,4 Mt,
  kehyksiä 6" saatiin (HUOM vain 6 kehystä 20 s:ssa → profiloija tallentaa vähän batchmodessa?). PUUTE 1: "MONO-VARAAJAT valmis" alkoi (mono 571 Mt), loppuriviä
  EI tullut 20 s:n odotuksessa (skenaarion oleta-aika liian lyhyt vai käsittely jumissa? katso lokit/ns-mono-2/unity.log rivit "MONO-" valmiin jälkeen).
  → korjaa (oleta 60 s / käsittely) → mono-3 → YKSI viesti KK:lle (kolme suurinta varaajaa kutsupaikkoineen, toistuuko ennen kaupunkia). Ei korjauksia peliin.
- 35n (03.49) JU: kertojan esilataus 333e91c45 LINKISSÄ 224.96 = 3929cdcf6 (VALMIS; jatko: ei-valmiit 8 → KK, lisäys 35k).
- 35o (04.5x) PT/KK 04.54: palkki-7 (LOD0 tavuina + mittari iPadin leveydellä, KK 03.14) → Opus-agentti tekee haaraan natiiviseppa/latausjono ("NS: latausjono 3o") + ajopyynto-mac-palkki-7.md. Jos agentti ei raportoinut: git log natiivi-backup/natiiviseppa/latausjono → JU:lle ajopyyntö (jonossa NUI, PK, KS jälkeen) → lue.py lokit/natiiviseppa-juoksu-latausjono-palkki-7 → KK yksi rivi + mittaririvi.
- 35p (05.0x) PALKKI-7 TEHTY 128ae58ba (natiivi-backup natiiviseppa/latausjono, 6c5b95883:n päälle; Peli-testit 931/931, unity 0). Syy 28,9 s: LOD0:n 182 kohdetta
  saivat saman askeleen (~0,0018), vaikka isojen rakennusten valokartat ~11 Mt → 0,449 → 0,459 alle 1 px. Nyt LOD0 = saadut tavut / arvioidut kokonaistavut
  (Latausjono.PakollisetTavut; kohteen koko liukuva keskiarvo, alku 4 Mt; Content-Range 1. osasta), Kasvava; lokirivi "palkkilohko LOD0 tavut: saatu X Mt …".
  Mittari: leveys 360 px (iso iPad, .mk-edistyminen--paksu 180 pt × 2). Riski: jos kohteet suurenevat lohkon lopussa, palkki hidastuu lopussa.
  JU: ajopyynto-mac-palkki-7.md PYYDETTY (viimeisenä NUI, PK, KS jälkeen) → LUE lue.py lokit/natiiviseppa-juoksu-latausjono-palkki-7: MITTARI ≤ 15 s? + 439/439
  + VIRHE 0 → KK yksi rivi + mittaririvi (kopio PT) → KK:n sana → pt-ok PT:lle (128ae58ba; sisältää palkki-6:n).
- 35q (08.3x) PALKKI-7 LUETTU: MITTARI pisin sama 13,1 s ≤ 15 (LOD2 → LOD1, leveys 360 px), 439/439, VIRHE 0, LOD0 tavut 570,6 Mt → KK:lle LÄHETETTY (kopio PT):
  junaehdokas 128ae58ba → ODOTA KK:n sana → pt-ok PT:lle. 8 KAPPALEEN LISTA: Sonnet-agentti selvittää (manifesti vs Pariisin jutut) → jos ei raportoinut,
  tee itse lisäys 35k:n keinolla → yksi viesti KK:lle.
- 35r (08.3x) KK 08.36 JUNASANA palkki-7 128ae58ba → pt-ok-pyyntö PT:lle LÄHETETTY. KK:n järjestys: 8 kappaleen lista → mono-keko (mono-3, lisäys 35m) → kaupunkityökalut.
- 35s (08.4x) 8 KAPPALEEN LISTA LÄHETETTY KK:lle: 7 ei äänitetty (Invalidit 1–2, Petit Palais 1–2, Sainte-Chapelle/Grand Palais/Montparnasse pala 2), 1 tekstimuutos (Tuileries pala 1, b6a690b98). Avainten Python-toisto + aineisto _tyo/natiiviseppa/kertoja-viive/ei-valmiit/ (tee.py). Tarjottu KK:lle: ennen-junaa.sh-tarkistus (luku per kaupunki) KK:n sanalla. SEURAAVAKSI mono-3 (lisäys 35m).
- 35t (08.4x) KK 08.42 PÄÄTÖS ÄÄNITTEET: 8 tilattu Äänittäjältä. JÄRJESTYS 3 → 2 → mono → kaupunkityökalut.
  3) LASKENTA koko luettavalle sisällölle (kaikki kaupungit + paketit: nähtävyysjutut kaikki palat, hahmotelmat, fokusvirta-*, skandaalit…; b6a690b98 muutti myös
     Impressionistit + 2 fokusvirta-pariisi + 1 skandaalit) → Sonnet-agentti tekee → _tyo/natiiviseppa/kertoja-viive/ei-valmiit/puuttuvat-kaikki.tsv → YKSI viesti KK:lle:
     puuttuvat kaupungeittain + paketeittain, a (ei äänitetty) / b (teksti muuttui) + yhteensä + tiedoston polku.
  2) ennen-junaa.sh-TARKISTUS: pysäyttää, kun luettava teksti muuttuu eikä avainta ole manifestissa EIKÄ äänitysjonossa. Jono = yksi tiedosto repossa (avain, kaupunki,
     kohde, pala, päivä); tekstin muuttaja lisää rivin samassa commitissa (juna läpi, jono = Äänittäjän työlista); vienti poistaa rivin, kun avain manifestissa.
     Tuloste: puuttuvien luku kaupungeittain. Pohjana tee.py-avaintoisto. (Kohta 1 = viennin vertailu on Äänittäjän.)
- 35u (08.4x) — NOLLAUS TÄSTÄ (kontekstivahti 35 %). JU: palkki-6 + palkki-7 LINKISSÄ 224.101 = 67092d8d5 (VALMIS; työlista päivitetty).
  KESKEN: laskenta (kohta 3) Sonnet-agentilla, joka KUOLEE nollauksessa → TARKISTA onko _tyo/natiiviseppa/kertoja-viive/ei-valmiit/puuttuvat-kaikki.tsv valmis;
  jos ei, tee itse (tee.py + hist.py samassa kansiossa = avaintoisto; laajenna kaikkiin paketteihin ja kaupunkeihin, lisäys 35t) → KK yksi viesti. Sitten kohta 2, mono-3.
  Viestit: SendMessage-raja täyttyi 03.4x → käytä mcp__ccd_session_mgmt__send_message session-id:llä (CLAUDE.md VIESTIRAJA).
