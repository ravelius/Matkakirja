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
