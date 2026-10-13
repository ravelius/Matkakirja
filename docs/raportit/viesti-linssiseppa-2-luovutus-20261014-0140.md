# Linssiseppä 2 – välitila 14.10.2026 klo 01.40 (Suomen aika)

Edellinen: viesti-linssiseppa-2-luovutus-20261014-0030.md (OMISTAJAN RAKETTIPYYNNÖT sanatarkasti siellä).

## Valmista tässä vuorossa
- **Museon HDR-ehto (PT, juna 189)**: kattoikkuna ja katon kaari paloivat iPhonella valkoisiksi → muut kuin maalaukset leikataan 1:een
  (MuseoValaistu.shader). Todistus lokit/todistus-monalisa5b-iphone-20261014-0044/kanaan-haat-ennen-jalkeen.png; iPad ennallaan.
- **Rodinin pronssit**: simulaattori ei tue ASTC:tä → patsaiden värikuva JPEG-varasta (<maa>/patsaat/glb/<id>.glb); pronssit LR:n
  arvoilla (_Metalli 0,7 …). Todistus lokit/todistus-patsaat1-ipad-20261014-0123/pronssit-ennen-jalkeen.jpg.
  Museohaara linssiseppa2/museo-ranska-rodin2 **17dbdbd80** (sis. cc72dabfe = master-merge + katto) → junaan 189. PT:lle ilmoitettu.
- **Nordmela (PT 14.10. 00.3x)**: laukaisupaikka Pad A 69,10867 N 15,58883 E (LR:n alustamallin origo). Maastolaatta
  _valmiit/andoya-alusta-v4 (ämpärissä kartta/raketti/andoya-alusta-v4.glb, Julkaisija vei 00.44), skripti
  _tyo/linssiseppa2/andoya/rakenna_laatta_v4.py <lat> <lon>. TÄYTTÖMAA 6 m (Kartverketin DTM vanhempi kuin alusta, näytti merta).
  Pelin koordinaatit Nousu/RakettiReitti/Houkuttimet(+testi). LR:n kehys korjattu: glTF +X = 340°, −Z = 250° (GlbLukija peilaa z:n).
- **Raketti** (haara linssiseppa2/raketti-savu-189, rebasettu PK:n 53502a886 päälle, **aa77f623f**, käännös eda8c15f7):
  LR:n raketti v3 A+B (torni irtoaa 2. vaihe +15 s, nokkakartio SECO +15 s), alusta v3d + vesisuihkut (valot-ja-vesi.json),
  savu3 (vana venytetyistä hiukkasista välin mukaan, tasoitettu nopeus, esisavu hienompi), Max-Q-kartio, irtoamispöllähdys,
  liekin hehku maahan, kameran värinä (Nousu.Tarina), rungon ja savun aurinko TODELLISESTA auringosta (ennen RenderSettings.sun =
  kameraa seuraava valo → "kaikkialta valaistu"), valodiagnoosi lokiin, LR:n ISS v1 + telakointiportti IssMalliin (laatikot varalla).

## KESKEN
1. **savu3-simu** (ketju _tyo/linssiseppa2/raketti-savu/ketju-savu3.zsh odottaa lippua `raketti-savu/simu-nyt-savu3`;
   Julkaisijan SIMU NYT → `touch` lippu). iPad päivällä (`linssi linssi raketti kello +13`, PK:n komento), iPhone yöllä.
   Katso: rungon valo päivällä (aurinko–kamera-kulma lokissa), vana nauhana, esisavu, vesisuihkut, Max-Q, ISS-malli lähestymisessä.
2. Seuraavat: alustan valonheitinlinssit yöhehkuun (LR alusta-valot.glb, ei vielä kytketty), RCS-suihkut lähestymisessä,
   2. vaiheen syttymisvälähdys. Kuva-arkki + äänellinen tallenne PT:lle → juna 189.
3. Huom. vanha museoketjun loki nimetty ketju-ml5b-ajo.log (ketju-ml5b.log = savu2-vapautuksen lippu).
