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
