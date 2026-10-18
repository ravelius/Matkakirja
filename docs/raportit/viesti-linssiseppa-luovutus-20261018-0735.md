# Linssisepän luovutus 18.10.2026 klo 07.35 (Postivahti: KOVA RAJA 43 %)

Edellinen: viesti-linssiseppa-luovutus-20261018-0545.md. Id:t /Users/Shared/Claude/osoitekirja.md (PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc,
JU local_1325b8e8-c39c-49f0-9ba2-7cabd4f44629, NS local_04e2850b-d63c-481d-be73-c7d784a7cbcb, PK local_242febe9-d6cf-45ae-8280-faf394dc6e3e,
LR local_2cf16574-67b6-40c0-928e-68bf36c72db0, Postivahti local_63227b57-d045-4b93-ab52-cddc04e3b90f). Kaikki samaan junaan 201.
Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto; worktree /Users/Shared/Claude/wt/proto-linssiseppa-pyramidi (nyt haaralla
linssiseppa/kaanaan-haat-201b). Ajot proto-3d/tyokalut/linssiseppa-ajot/.

## 1. ENSIN: KAANAAN HÄÄT -UUSINTA (AJO KÄYNNISSÄ, IRROTETTU setsidillä)
- Haara linssiseppa/kaanaan-haat-201b = 7c8fad260 (kuvakulma päivittyy myös vapaassa kulussa) + 9119ccd6a ("Kaanaan häät"-nimi),
  juna-201 19b86e3d3:n päällä. SHA:t NS:llä (kärki 9119ccd6a junaan 201).
- ajo-museo201b.zsh (pid 70103, loki ajo-museo201b.log): odottaa L2-lukkoa (VS bf3c019a3 07.28 →), kääntää, sitten odottaa
  lippua `simu-museo201b.nyt`. JU lähettää "SIMU NYT" (jonossa PK → LR → VS → LS, arvio ~07.55) → `touch
  /Users/Shared/Claude/proto-3d/tyokalut/linssiseppa-ajot/simu-museo201b.nyt` → ajon jälkeen "SIMU VAPAA" JU:lle.
- Skenaario sk-museo201-iphone.txt: valitse louvre-inv-142 (kierros) → k1, vapaa → kävele ML → kävele Kaanaan häät → k2,
  6 s → h1 himmeä, tap 200 700 → h2 näkyvä. Tulokset proto-3d/lokit/todistus-museo201b-iphone-*/kuvat.
- TARKISTA TÄYSIKOKOISINA: k1 ja k2 koko kehys pystyruudussa (ei lähikuvaa), lokin "fov" Kaanaan häissä ~100° (ei 34,3°),
  h1: ☰, kaiutin ja i haaleat; h2: näkyvissä (i-nappi taulun oikeassa yläkulmassa). Sitten pari PT:lle (≤ 3 riviä + polut).
- Jos vika: ytimen testi MuseoKaanaanHaatTestit (3) ajaa kuten sovitin (vapaassa vain VapaaLiike).

## 2. TEHTY TÄLLÄ VUOROLLA
- Kaanaan häät 4417ce5b2 (junassa 201, 9cc0c2c44): katseluasento oli Mona Lisan väliseinän takana (musta alaosa) → KehysNakyy,
  10,1 m kaiteen edessä, Laajennus 2,14. Simu 07.18 (todistus-museo201-iphone-20261018-0718) paljasti: sovitin ei kutsu Paivitaa
  vapaassa kulussa → fov jäi ML:n kaiteen 34,3°:een → korjaus 7c8fad260 (kohta 1). k1 käytti QA-komentoa `museo teos` (ohittaa
  kierroksen) → nyt `museo valitse`.
- KK kohta 8 museo-himmea-201 4fb30be2c: HYVÄKSYTTY (PT 07.3x, h1|h2 0718-ajosta; kaiutin 138 vs 227). Syy: NaytaAutoNapit asetti
  inline-opasiteetin 1 → ohitti KehysNapit.Himmea; ☰- ja i-rivi kehysnapeiksi (KehysNapit.Merkki).
- Peking #361 V8-sn1: Codexille kuitattu 8bcde07d5 (postilaatikko); KTX2 + portti 0 virhettä (rakenna-peking361sn1-vienti.zsh),
  JU vei piilokippiin 06.22 (uusin.json → p361sn1), kopio T7:llä Matkakirja-arkisto/linssiseppa/tyo-20261018/peking361sn1. PT:lle
  rivi KK:lle annettu. AVOIN: Codexin pyytämät k1/k3/k5-pelikuvaparit klo 13 ja 18 (vaatii simuvuoron; mallina
  peking361-vertailu.zsh / ajo-peking361c.zsh) → tulokset postilaatikkoon.
- Pyramidin varjo 3b4117a67 (linssiseppa/pyramidi-varjo-201, galleria-200 b11dcbc12 päällä) → PK yhdistää + JU-ajo; LR:lle rivi.
  Iso soikio oli yhtenäisen tilan yleinen sarjasoikio (kuvan leveydestä), nyt PohjaSoikio (pohjan kokoinen + reunus vasemmalle alas).
- LR teki Auto Zoomin kehyssovituksen itse (661c71873, junassa 201).
- Siivous: _tyo/linssiseppa/ 6 vanhaa appia pois (≈ 3,5 G). Jäljellä museo202, museoveto201, kaanaanhaat201-app (keskeneräinen
  kopio, ajo-museo201b kirjoittaa sen yli). Pidä ≤ 2 uusinta.

## 3. AVOIMET
- Sisältökirjurin _tyo/sisaltokirjuri/taidemuseo-ranska-kohdat-20261014/ranska-kasikirjoitus-aanittajalle.json: "Kanaan" (PT:lle kerrottu;
  jos Äänittäjän Louvre-otot nauhoitettu, nimi väärin). Oma lähde teosluettelo-v1.json korjattu.
- Nimikyltin välähdys ja kierroksen kääntö Johannes Kastaja → Kaanaan häät (PT: myöhemmin). KehysNapit.Osuma kerrosjärjestys (NUI).
- tarkista.sh VALOVAHTI KaupunkiKuva.cs (Valosepän 3c0412ffd) → PT välitti VS:lle.
- tools/gpu-vapaa.sh ja .claude/settings.local.json* eivät ole minun (älä committaa).

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus. ENSIN kohta 1 (odota JU:n SIMU NYT → touch lippu → kuvat
täysikokoisina → PT). Sitten Pekingin k1/k3/k5-parit Codexille (kohta 2). Viestit send_message id:llä; PT:lle ≤ 3 riviä.
