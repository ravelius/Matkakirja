# Linssisepän luovutus 11.10.2026 päivä (11.2x, nollaus 50 %)

Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Simu-, käännös- ja laitevuorot vain
Julkaisijalta (KÄÄNNÖS NYT / SIMULAATTORI NYT; Julkaisija voi antaa käännöslinjan 2: `PROTO_LINJA=2`). Ajoskriptit ja skenaariot:
proto-3d/tyokalut/linssiseppa-ajot/ (ketju-testi-182[a–i].zsh; portti `touch simu-182X.nyt`). Ketjut irrotettuna `perl -MPOSIX=setsid …`.
Testit: `sh Linssit-testit/kaanna.sh` (EI zsh: kirjastoviitteet eivät pilkkoudu), `zsh tyokalut/tarkista.sh`.
Poistot vain valmiilla työkaluilla (PT/omistaja 09.0x): Matkakirja `tools/uusi-worktree.sh --poista`, proto `git worktree remove`.

## Kuitattu tänään ja SHA Natiivisepälle
- **Pöllö-PR #4384** (liiku-listaan luokka + korkeus_m) tuotannossa; todennettu ettei riko TF 179/180:aa (OpasTaky.Lue ei lue kenttiä).
- **Kaupunkipuut a0b4c5240** (linssiseppa/kaupunkipuut-181: ef020d7a7 + 52d927252 runko ≤ 1/3, tyvi 25 näytteellä, Tukholma
  Googlen puut ensin, muistirivi "kaupunki: puut muisti …" + a0b4c5240 latvuksen valo/sävy, Tukholman katukamera). PT: Tukholma auto,
  Pariisi nykyinen. EHTO: iPad Pro 13 -muistiajo Natiivisepän junaajossa. Omistaja 09.3x: junaan 181 (Natiiviseppä).
  maa-tukholma.json ämpärissä (Karttaseppä). Todiste lokit/todistus-puut-182b-ipad-20261011-0640.
- **Kippi pysty 9642efcd7** (linssiseppa/kippi-pysty-182 ⊃ kippi-torni-182: a30ba79f7 San Marcon torni kuvassa, 12aa8ce09 QA
  `opas hyppy <Q|nimi>`, 5ed2754c8 listan korkeus_m on este, 11aedf241/3894633f5/9642efcd7 tornisääntö laitteen kuvasuhteella,
  pystykuvassa viisto kierto tornin ympäri, sietää 30 m paikkavirheen). Omistaja 09.3x: junaan 181.
- **Esittely v2a** (bryssel Q1255327 korkeus_m 96, firenze Q271928 94; _valmiit/opas-esittely-v2a-vienti-20261011) viety + worker
  #4385 tuotannossa (data, ei natiivikoodia).
- **Kippi leveät pystyssä e71176416 + af7314a19** (linssiseppa/kippi-leveat-pysty-182, 9642efcd7:n päällä): pystykuvassa aukiot
  lähikehyksessä ja monumentti (OpasKatseOletukset: Concorden obeliski Q1503331) 58 %:ssa leveydestä, loitonnus vain alue-luokalle,
  lähdön jatkuvuuskorjaus. e71176416 → 181 jos runko auki, af7314a19 → 182. Todiste todistus-leveat-pysty-jalkeen-182i-20261011-1111.
- Soundly v2 229141f7c (juna 182 → omistajan 09.3x mukaan 181).

## Kesken / havainnot seuraavalle
- Ei avointa erää. Agentti (Opus) teki kipin erät; seuraava erä uudella agentilla.
- Mahdollisia kippijatkoja (PT:n järjestys kippi > taidemuseo > kartta): (1) muiden aukioiden monumenttipaikat taulukkoon
  OpasKatseOletukset (nyt vain Concorde; muuten monumentti voi valua reunaan pystykuvassa); (2) Quattro Cantin kirkko lasketaan
  oletuskorkeudella 60 m (ei oikeaa korkeutta) → tornisääntö muuttaa kehystä turhaan; (3) kierto < 3 °/s kaukaisilla kehyksillä
  (Eiffel 0,7, Louvre 1,9 °/s iPadilla; silmän nopeusraja 10 m/s) — linjaus "kierto ≥ 3 °/s aina" ei täyty → kysy PT:ltä;
  (4) Trafalgar Square ja Stortorget puuttuvat kaupunkien kohdelistalta (PT: ei nyt).
- Taidemuseo on LS2:lla.
- Worktreet: proto-linssiseppa-leveat (af7314a19, valmis → poista kun junassa) ja proto-linssiseppa-testi182 (testihaara
  linssiseppa/testi-182-torni-puut c8acebc02 = kaikki yllä yhdistettynä; käännökset ajettiin tästä). App-kopiot lokit/linssiseppa-app:
  testi-182f, -g, -h, -i, esitys-musiikki-181-e, kippi-pysahdykset-181-e (poista vanhat kun juna on TF:ssä).
- Skenaariot: sk-aukiot-182(c).txt (San Marco + 10 aukiota hyppy Q-id:llä), sk-aukiot-pysty-182.txt, sk-leveat-pysty-182.txt
  (iPhone pysty; Eiffelillä `oleta 60 tarkka näkymä`), sk-puut-182.txt. iPhone-simu linssiseppa-iPhone BD64C8E4 (T7-sarja),
  iPad 00CF62C2.
- Kuormitettu kone (load > 25) hidastaa laattoja: saapumiskuva voi olla sininen matalan tason maasto → odota "tarkka näkymä".
