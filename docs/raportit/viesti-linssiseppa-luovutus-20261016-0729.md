# Linssisepän luovutus 16.10.2026 klo 07.29 (KOVA RAJA 35 %, Postivahti)

Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Ajot proto-3d/tyokalut/linssiseppa-ajot/.
Tarkistus `zsh tyokalut/tarkista.sh`, testit `sh Linssit-testit/kaanna.sh` worktreessa (komento `</dev/null`).
Viestit AINA send_message id:llä (/Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä),
Julkaisija local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03. Simu iPad 00CF62C2 vain Julkaisijan SIMU NYT -vuorolla.

## 1. KESKEN: PRAHA197B-SIMUAJO (KÄYNNISTÄ UUDELLEEN – taustaskripti kuolee nollauksessa)
PT 06.5x: Prahan portin lyhennys omana haarana junaan 197 (EI 196), todista ajolla: kuvat yhtä terävät kuin 196n, portti ≤ 4 s.
- Haara linssiseppa/portti-tasanne-197 (worktree /Users/Shared/Claude/wt/proto-linssiseppa-porttitasanne, juna-196 e16760a8e:n päällä):
  40f8ecd72 valmis tasanne (laatat ≥ 99,5 % ja tarkkuus ei parane 0,02 → läpi, ei TasanneMatalaS 8 s), 90cb8733b TasanneValmisS 2 → 1,5 s.
  Linssit 1904/1904, unity-tarkistus 0.
- praha197a (627f5f5e, 2 s): portti 9–13 s → Malá Strana 1,1, linna 4,4, Josefov 3,2, aukio 3,3, Venceslaus 4,4, Vyšehrad 4,5 s;
  Kaarlensilta 11,4 s (tarkkuus paranee lähestyessä = oikeaa latausta; kokonaiskatto rikkoi PallonPorttiEiHiiviPerilleEnnenTarkkuutta → ei tehty),
  Petřín 10,9 s (avaus, laatat 98 % → 8 s:n sääntö). Loki lokit/todistus-praha197a-ipad-20261016-0704.
- praha197b (90cb8733b) Julkaisijan L2:ssa → _tyo/linssiseppa/portti-197b-app, lippu simu-praha197b.nyt. Käynnistä:
  `zsh /Users/Shared/Claude/proto-3d/tyokalut/linssiseppa-ajot/ajo-praha197b.zsh > …/ajo-praha197b.log 2>&1` (run_in_background)
  ENSIN `pgrep -fl ajo-praha197b` ja loki: jos odottaja elää tai ajo valmis, älä käynnistä toista. Jos lippu jo kulutettu ja ajo ei käynnissä,
  pyydä Julkaisijalta uusi SIMU-vuoro.
- Ajon jälkeen: `python3 -I tyokalut/linssiseppa-ajot/kierrosyhteenveto.py <loki>/konsoli-stdout.log`, SIMU VAPAA Julkaisijalle,
  PT:lle rivi (portit, kuvat _valmiit/…) + kerro Kaarlensillan päätös. Hyväksynnällä → NS junaan 197.

## 2. VALMIIT TÄSSÄ VUOROSSA
- kuvat-196i (ef091fd8): Erekhtheion E0/E1 + Lontoon loppupysäkit → _valmiit/erekhtheion-lontoo-196i-20261016/. korostus-pieni-196 a620885a9 → NS junaan 196 (PT kuittasi).
- TAIDEMUSEON KAISTA: oli kehys, ei paspartuu – 189:n "teos = lähdekuva" (0eb5b720b) piirsi kaikki uuden salin kehykset valkoisena kuvatekstuurina
  (_TeosKeski.w = 1 myös kehyksillä). Haara linssiseppa/kehys-lahdekuva-196 dfca09fa7 (worktree wt/proto-linssiseppa-kehysvari) → NS junaan 196 PT:n
  kuittauksella: fb4ad1068 kehykset w = 2, f0fef2c82 antiikkikulta 150/134/104 × 1,2, dfca09fa7 Orsayn Cha-U-Kao uusi otto (MuseoKertoja.Manifest =
  manifest-196.json; Julkaisija vei ämpäriin 05.26). Kuvat _valmiit/taidemuseo-kehys-196l-20261016/ (LUE.md). Diagnoosityökalu: `linssi museo mika <vx> <vy>`.
- Kierrosajo 196n (dac33451): Lontoo/Praha/Ateena 24/24, ei jumeja, kuvat terävät → _valmiit/kierrokset-196n-20261016/ (LUE.md).
  Lontoon Tower/Greenwich tarkkuus 0,00 = mittarin raja puustossa, EI korjausta (PT 05.0x ja 06.0x kuittasi).
- Levysiivous: 5 vanhaa .appia + 3 proto-worktreetä (historia194, s2haivytys, yotaivas), ~6,3 Gi.

## 3. AVOIMET
- Worktreet: wt/proto-linssiseppa-kierrokset195 (ajoskriptien todistusajo.sh – poista vasta kun T-polku vaihdettu), korostusmaa (korostus-pieni junassa →
  poistettavissa kun juna 196 yhdistetty), kehysvari (poistettavissa kun juna 196 yhdistetty), puutomat191 (ei yhdistetty mihinkään), porttitasanne (työssä).
- Käännökset _tyo/linssiseppa/*-app (kuvat-196i, kehys-196l, kehys-196m, portti-197a, portti-197b): PT:n siivous / pyynnöstä itse (jätä uusin).
- REITIN KARKEA ESILATAUS odottaa omistajan korttia (ei koodia). Talven 32°N S2-reunan kuva avoin.
- tools/gpu-vapaa.sh ja .claude/settings.local.json* checkoutissa eivät ole minun (älä committaa).
- SKENAARIO-OPPI: `oleta … opas: saapui <Kohteen nimi>` (196n:stä alkaen nimellä; tyokalut/…/sk-kierrokset-196n.txt mallina).
  Kuorma: odota-kuorma.zsh <raja> <min> ja kuormaloki.zsh <ajon loki>.

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus (git show <sha>:docs/raportit/viesti-linssiseppa-luovutus-20261016-0729.md).
Ensin kohta 1: tarkista/käynnistä praha197b-odottaja, sitten tulokset PT:lle.
