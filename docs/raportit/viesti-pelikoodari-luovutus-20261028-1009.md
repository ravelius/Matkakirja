# Pelikoodari: luovutus 28.10.2026 klo 10.09

Seuraava Pelikoodari jatkaa tästä. Muisti: pelikoodari-tila-20261018-aamu.md (UUSIN). Edellinen luovutus -20261028-0905 (PR 5412, lisäys PR 5413).

## Haara
- Proto `pelikoodari/liikkeet-213` (wt /Users/Shared/Claude/wt/proto-pelikoodari-fpv-211, paikallinen proto-git), pää fc3b7d7ca. tarkista.sh 0, Peli 767/767.
  EI JUNAAN ennen KK:n kuittausta.
- Ketju 7304a15f3 (viitta Cull Off) → 35cf278aa (pehmeä drone palatsissa + QA `drone pehmea|vanha`, `kamerarata 1`) → b0d6b55ac (liito maaliin
  land_soft, mallinvaihdon jälkeen valon käsittely heti) → 98b76e40d (pehmeä drone PARKOUR-kameraan) → fc3b7d7ca (tasainen liito maassa = juoksu).

## Tehty (OMISTAJAN PÄÄTÖS 09.05 dronekamera)
- Codexin reitti (sokkelo 0) = omistajan videon kamera, vanha dronehaara: elo ±1,0 m ylös-alas (osajakso 3,1 s, pieneni käännöksissä) korvattu
  DroneNosto.Pehmea:lla (6 akselia omilla jaksoillaan, lyhyin 6,2 s; käännöksessä × (1 + 1,2 w)); korkeus SmoothDampilla; oviaukon matala pito 1,2 s.
- MITTAUS (simu-drone-vanha|pehmea, siemen 7, vaaka): suorilla pystyheilahdus 1 s ikkunoissa lattiasta mediaani 35–49 cm → 8 cm (PT:lle 10.0x).
  KK:n askelpomppu-hypoteesi ei päde: kamera seuraa reitin y:tä, ei luita.
- Viitan A/B (35cf278aa, k1/k0): Cull Off korjasi reiät, ei uusia vikoja → Codexille f1e12eb3e; parit _tyo/pelikoodari/kaapu-kk-20261028/viitta-ab-35cf278aa-*.png.
- Penkin turkoosit = Codexin oma lisäys (tilaus 7b6467f32 ei pyytänyt) → koe v01b (penkki-marmori-20261028/v01b, turkoosi graniitiksi, albedo tummempi).

## Seuraavaksi (kaikki ennen KK-videota)
1. KÄÄNNÖS fc3b7d7ca (JU:n KÄÄNNÖS NYT): kopioi parkour-20261027/kaanna-98b76e40d.zsh ja aja-drone-pehmea-98b76e40d.zsh uudella SHA:lla (sed), aja.
2. Pylväs peittää kuvan 29,5–29,75 s videolla (juoksun ~15,7 s) + lyhyet 17,4 / 32,0 s: epäily oviaukon matala pito (aliPito, JuoksuV4Maailma.cs
   pehmeaParkour-lohko) → kamera matalana pylväiden tasolla; vertaa samalla siemenellä `drone vanha` (siellä ei näkynyt 29,5 s:ssa).
3. Penkin päällys palaa valkoiseksi myös v01b:llä (juonteet näkyvät vain jaloissa) → syy valo tai varjostin, ei albedo → VS:lle / tarkista
   estemallin materiaalin luku (lukeeko juoksupelin muunnos baseColorTexturea päällyslaatalle). Lopullinen pinta Codexilta KK:n kautta.
4. Mallinvaihto perus → viitta yhdessä ruudussa (kova leikkaus; näkyvä siirtymä = UI-pohja → kysy PT:ltä).
5. Video: Sonnet tarkistaa (freezedetect, väläykset, läpikulut), rajaus -ss 13.7 -to 55 (video tallentuu pystyyn: transpose=2) → PT/KK.

## Jatko keskeytyksestä (Mac-uudelleenkäynnistys)
- Taustaajoja ei ole käynnissä. Käännös- ja simuskriptit ajetaan uudelleen alusta (ei osittaista tilaa); kuittaa JU:lle L1 VAPAA / SIMU VAPAA.

## Opit
- Codexin parkour-reitti (sokkelo 0) ei käytä yhtenäistä dronea (YhtenainenDrone && Sokkelossa) – kameramuutokset kumpaankin haaraan.
- Roolit eivät viesti KK:lle (osoitekirja) → raportit PT:lle.
