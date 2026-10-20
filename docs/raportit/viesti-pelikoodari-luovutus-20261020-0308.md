# Pelikoodarin luovutus 20.10.2026 klo 03.08 (Postivahdin KOVA RAJA 37 %)

Edellinen: viesti-pelikoodari-luovutus-20261020-0050.md. Rooli: Pelikoodari (Opus, high). Proto-repo paikallinen (ei pushia),
haara pelikoodari/juoksupeli-207 = **e60cad5e1**, worktree /Users/Shared/Claude/wt/proto-pelikoodari-kerattavat-206 (puhdas).

## KÄYNNISSÄ NOLLAUSHETKELLÄ
- Ei ajoja. Odotetaan JU:n SIMU NYT -viestiä yhteinen21:lle (= e60cad5e1 + LR c35eca1e8, valmis ~03.25, ilman rinnakkaisia käännöksiä).

## ENSIN (omistajan pari, KK 03.0x)
1. JU:n SIMU NYT → `zsh /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/simu-sokkelo-206/aja-207-r1.zsh /Users/Shared/Claude/proto-3d/_tyo/julkaisija/sokkelo-yhteinen21-207-app/Matkakirja3D.app`
   (taustalle; iPhone + iPad ~6 min; tarkista ensin kaannos.txt ja kuorma `sysctl -n vm.loadavg`).
   Skenaario sk-sokkelo-207-r1.txt: R0 (aika seis 0,2 s iskusta: pöly + sirpaleet), R1 (0,5 s), E1–E3 esteet v2 droonilta.
2. Heti ajon jälkeen SIMU VAPAA → JU. Katso kuvat täysikokoisina (kuvat/R0.png ym.): kuplan rivi 2 "Qing · 1700-luku" kokonaisena,
   ei Dynamic Island -soikiota, Puyi kuvassa, esteet v2 näkyvät.
3. Pari KK:lle (local_8e4fcfed…, KK pyysi) + kopio PT: iPhone R0 + R1 ja iPad R1 (+ E1–E3 tiedoksi). KK vie omistajalle.

## TEHTY TÄLLÄ VUOROLLA (kaikki haarassa pelikoodari/juoksupeli-207)
- a35c37af5 esteiden v2-muunnokset (esteet-v2/, EsteMuunnelmat, QA `ui juoksupeli esteet2 0|1`).
- 64893b8c0 + a384ac8ef sokkeloon väistöaarteet (~27 %) ja kääretaulut (~7 %); aarre ei vartijan kiertoväylällä; mallit
  kiinnittyvät juoksun aikana syntyviin esteisiin (AarreRikkoProto, kaaroProto). a384ac8ef on 207:ssä (PT OK → NS).
- b835320ab sirpaleet luettaviksi (≥ 0,16 m, 2–4 ×, Liikepohja.Tasainen, 6 s lattialla).
- 2cb706342 + 031214301 VS:n pöly 2459aeb85 yhdistetty ja kytketty (Polly).
- 3a8284011 QA `ui juoksupeli rikkopysays <s>` (aika jäätyy s rikkoutumisesta; jatko `ui juoksupeli valo jaady 0`).
- e60cad5e1 muistokupla kahdelle riville (nimi / KuplanAjoitus NoWrap, raita levenee vasemmalle).
- Codexin esteet v2 (719724): _valmiit/juoksupeli-esteet-v2-vienti-20261020, portti KAIKKI OK, JU vei 03.05 (julkinen URL 200).
  Koodi jo käännöksissä yht.14+ → latautuu ilman uutta käännöstä.
- Simutyökalu (worktree proto-pelikoodari-juoksupeli-kamera-204, ee88a0a93): kuvat/ ja aani/ luodaan uudelleen ennen kuvaa
  (ulkoinen siivous poisti tyhjät kansiot kesken iPad-ajon 03.00; poistajaa ei löytynyt → mainitse PT:lle, jos toistuu).
- Codex-luonnos esteet v2: docs/raportit/pelikoodari-codex-esteet-v2-luonnos-20261020.md (6855409f6).

## LÖYDÖKSET (kuitattu)
- LT:n 0,5 s nykäys = Lasipohja.Etsi (NUI korjasi b8198b4e, LT: 41 → 2). Logiikkapuolella ei 0,5 s työtä.
- "Jee!" näkyy vain Tekstitys-asetuksella (oletus pois), hurraa soi.

## AVOIMET (ennallaan)
- Codexin mittapalat 713718 menevät Lavastajalle; korttelikokoonpano (muurit 11/12,4/3,6 m, hallit ≤ 10 m) sovitaan Lavastajan kanssa,
  hallien ehto `Sisapiha >= …` JuoksuSokkeloMaailmassa.
- Omistaja 00.22: rakennuksiin useampi sisäänkäynti/huoneet/portaat (PT:n jako, Codex → Lavastaja → PK).
- hurraa-isommat (_valmiit/juoksupeli-hurraa-isommat-20261020) odottaa omistajan valintaa → vaihda PuyiHuudot-polku.
- iPadin loppukortti pieni = KORTTI-pohja → PT:llä UI-pohjakysymyksenä.
