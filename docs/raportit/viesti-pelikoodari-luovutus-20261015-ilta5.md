# Pelikoodarin luovutus 15.10.2026 ilta 5 (KOVA RAJA 35 %, Postivahti, klo 23.02)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari (haara pelikoodari-luovutus-20261014-paiva), proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto (haarat pelikoodari/<aihe>, worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*, peili
natiivi-backup peili/proto/<haara>). Edellinen luovutus viesti-pelikoodari-luovutus-20261015-ilta4.md: kaikki sen kohdat hoidettu tai alla.

## Lue ensin
- CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti. Viestit `send_message` session id:llä (osoitekirja /Users/Shared/Claude/osoitekirja.md).
  PT local_5df52e10-10e4-4b72-9554-0049db300dfe (nollautui 23.0x, seuraaja luovutuksesta -ilta7), JU local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914,
  NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03, NUI local_44392b3c-86ee-4873-9d76-82f9aaa6b832, SK local_72d15713-eb20-402b-95f7-87bdaaf91b74.
- Testit: `sh Linssit-testit/kaanna.sh` ja `sh Linssit-testit/unity-tarkistus.sh` (sh). Käännöstarkistus: L2 JU:lta → KÄÄNNETTY → NS + PT.
- Ajotyökalut: /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/ (ajo-*.zsh + sk-*.txt; SHA=… [UDID=…] zsh ajo-….zsh).
  Tahdistus videoihin: välähdys videosta (YAVG-hyppy) vs. 1 kHz piippaus wavista; skripti ennen yhdistystä aina itse (ks. VIDEO2.md).

## ENSIMMÄISENÄ: etsin + esikatselukortti junaan 196 (omistaja 22.37 "Kyllä, kehitys lyhyeksi")
- proto **pelikoodari/iss-kamera-195 f264f428e** = 0c7fe3cb4 (pysäytyskuva) + 6d11ccf6f (sRGB-korjaus) + 558f497a5 (Esikatseltu/Valmis-vaihto/
  EsikatseluPeruttu, IssKameraKuva) + NUI c16017d01 (kortti "Kuva tarkentuu…", vaihto samaan korttiin, alarivi "korkeus 429 km · 50 mm")
  + kytkimet PÄÄLLE (IssEtsin.Kaytossa, IssKameraKuva.EsikatseluKaytossa). Linssit 1879/1879, unity 0, ei konflikteja 196-haarojen kanssa.
- **L2 + asennus jonossa JU:lla** → iPhone 17 96044270-92AA-4BD3-BE2D-772C8495AB19, app _tyo/pelikoodari/iss-kamera-196-app/.
  Kun KÄÄNNETTY + SIMU NYT: `SHA=<käännös> UDID=96044270-92AA-4BD3-BE2D-772C8495AB19 zsh .../pelikoodari-ajot/ajo-etsin-kortti-196.zsh`
  (kuvat k0-tele, k1-esikatselu, k2-tarkka, k3-pino) → SIMU VAPAA JU:lle → kuvat PT:lle (iPhone ennen kytkentää, NUI:n pyyntö) →
  sha NS:lle junaan 196. Tarkista: kortti ~5 s laukaisusta, ei tyhjää väliä vaihdossa, merellä ei korttia ("EI MAATA KUVASSA").
  Huom: skenaario lentää Pariisin ylle (kohde pariisi valoisa) – Euroopassa on ilta, kuva on yökuva (kaupunkien valot), se on ok.

## Valmiit tässä vuorossa
- "En tunne" mp3 (f82aa303a) BUILD 195:ssä (lukittu 21.46).
- Pulun 5 ISS-vastausta + kohokohtien kysymykset 30e07d6f1 KÄÄNNETTY a4e0ddfb4 → NS junaan 196; kuvapari _tyo/pelikoodari/iss-pulu-vastaukset-196/
  (PT hyväksyi: äänitys soi myös kaiutin pois -tilassa). Testikomennot `ui chat iss [id]`, `ui chat kohokohta <tunnus>`.
- Pulun 49 chat-ottoa 5dfbe9f22 (ba2778726:n päällä) KÄÄNNETTY 0385dc85f → NS junaan 196 (soivat kaiuttimen ollessa päällä).
- Etsinvideo 2 omistajalla: _tyo/pelikoodari/iss-kamera-195/etsin-video-2-0ed5633a9.mp4 (+ VIDEO2.md).
- Web: PR #4651 (Pulun tekstit) mergetty a42f3f03c; PR #4661 kaupunkiesittelyt İzmir + 36 mergetty 90c2cabb8 (työkalu
  pelikoodari-ajot/kaupunkiesittelyt-kytke.py [tunnukset]). Molemmat worktreet poistettu.
- Minipallon mielivaltainen piste: NUI käyttää AstronauttiKerros.LennaOmaanValinnalla(nimi, lat, lon) – ei koodia minulta.

## Odottaa omistajaa / seurattavat
- **Pulun 4 uutta ISS-vastausta HYVÄKSYTTY** (omistaja 23.03, lyhennettyinä; tekstit main-lokissa b91af3460): Äänittäjä äänittää ja ilmoittaa
  → kytke junaan 196 samalla polulla (PuluChat.IssVastaukset: 4 uutta riviä Id/Kysymys/Vastaus/Aani; jos kysymys kuuluu kohokohtaan,
  Siirtosepälle id kohokohdat.json:iin) → L2 → NS + kuva PT:lle.
- Pieni viilaus (ei pyydetty): ISS-vastauksen kupla vierii loppuun, alku jää ylös (PuluChat.VastaaIssAanella → Vierita(kupla)).
- Proto-worktreet poistettavissa kun junassa: -mika-en-tunne-195, -mika-tama-on-195 (BUILD 195), -pulu-tekstit-196, -pulu-chat-aanet-196 ja
  -iss-pulu-vastaukset-196 kun NS on ottanut, -iss-kamera-195 kun junassa. Poisto `git -C …/Matkakirja-proto worktree remove <polku>`.

## Aloitusviesti uudelle Pelikoodarille
"Olet Pelikoodari (Opus, high). Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-pelikoodari-luovutus-20261015-ilta5.md
(haara pelikoodari-luovutus-20261014-paiva). Ensin etsin + esikatselukortti f264f428e: odota JU:n KÄÄNNETTY + SIMU NYT 96044270,
aja ajo-etsin-kortti-196.zsh, kuvat PT:lle ja sha NS:lle junaan 196."
