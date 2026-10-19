# Valoseppä – luovutus 18.10.2026 klo 13.3x (Postivahdin KOVA RAJA 36 %)

Luovuttaja: Valoseppä (Opus, high). Edellinen (kaikki yksityiskohdat, kohdat 0–14): viesti-valoseppa-luovutus-20261018-paiva.md (e54910d0d).
Viestit `send_message` TÄYDELLÄ id:llä (osoitekirja /Users/Shared/Claude/osoitekirja.md): PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc (≤ 3 riviä),
JU local_1325b8e8-c39c-49f0-9ba2-7cabd4f44629, LR local_2cf16574-67b6-40c0-928e-68bf36c72db0, KK local_febfd152-516e-488f-b0ae-cb302e725365,
Postivahti local_63227b57-d045-4b93-ab52-cddc04e3b90f. D=/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2 (päiväkirja $D/JONO.md), L=$D/louvre-pilotti.
JU:n sääntö: simu vain JU:n SIMU NYT -viestillä, heti perään "SIMU VAPAA". Kiintiö 92 % (PT) → pienet erät. Kuvatekstit aina kuvan ulkopuolelle (omistaja 12.14).

## 0. KÄYNNISSÄ LUOVUTUSHETKELLÄ
- JU kääntää L1:llä sinisen maan KORJAUKSEN 3fad81c08 → $D/sininen-korjaus-app (~13.35). Simuvuoro NUI:n logon jälkeen, JU antaa SIMU NYT.
  → aja `zsh $D/simu-sininen-korjaus.zsh` (~7 min, taustalle), sitten SIMU VAPAA JU:lle. Kuvat $D/nakyvyys-202/diag/iphone (c1, c2 = opas → ISS)
  ja ipad (d1, d2 = suoraan). HYVÄKSYNTÄ: iPhonen c1/c2 maa näyttää kuten iPadin d1 (ruskea/vihreä maa, ei syvänsininen) → kuvapari
  (ffmpeg hstack, teksti EI kuvan päälle) PT:lle → PT/NS junaan. Jos yhä sininen: lokista grep "ruutu: \|kaupunki: muisti vapaa\|kaupunki: origo".

## 1. SININEN MAA – juurisyy (kohta 14 edellisessä)
Oppaan koko ruudun sivu (Ruudunpaivitys.CesiumSeis) pysäyttää pallon → kaupunki avautuu ja tallentaa palloOli = true → sivu pois → kaupunki
sulkeutuu ja palauttaa pallon suspendUpdate = true → ISS:llä vain Pohjapallo. Korjaus: Ruudunpaivitys.PysaytettyLevossa + CesiumKaupunki.
Junakelpoinen haara proto linssiseppa2/sininen-maa-202 3fad81c08 (wt /Users/Shared/Claude/wt/proto-linssiseppa2-sininen). Diag-haara
linssiseppa2/kyyti-sininen-diag (diag-commitit + a7c0afa1a) EI junaan; diag-appit kyyti-diag5/6-app → T7, kun korjaus on varmistettu.

## 2. LOUVREN PILOTTI (haara proto linssiseppa2/louvre-pilotti-202, wt /Users/Shared/Claude/wt/proto-linssiseppa2-louvre)
- Kärki cc3aa269e: se-päivänvalo (sali.json se 0,8/0,2/0,2 + heijastus 0,35), Tripo-ihmisille kontaktivarjo, vartija x 25,6 (867c74f40).
  LR yhdisti → yhdistetty-202 f5477b167; LR ajaa louvre4-kuvat itse v2n-käännöksestä (JU). Jos LR pyytää sinua: `zsh $D/simu-louvre4.zsh <app>`.
- Parit 3 KK:lla ($L/parit-3/). KK:n toive: k2/vartija kengät + varjo näkyviin (skenaario j11/j12 jo alaviistoon −15°).
- se-atlas leivottu vanhoilla arvoilla; LR ei leivo uusilla ennen louvre4-kuvia – jos leipoo, palauta ajonaikainen heijastus/ambient samalla.
- MuseoHenkilot.Paalla yhä false (kehityslippu) → true + testi, kun KK hyväksyy pelikuvat.

## 3. TRIPO – PERUTTU (19.10.): omistaja 07.20 "Työstän tätä codexin kanssa, ei pyydetä mitään muutoksia." (hahmot Pulu, Puyi, vartija, Louvren nainen: omistaja ohjaa Codexin kanssa suoraan) ja 08.28 "Tee jatkossa kaikki tripo mallit pyytämällä ne codexilta." → alla oleva EI ole enää Valosepän työtä, ei Codex-pyyntöjä. Vanha teksti:
## (vanha) 3. TRIPO (19.10. CHROMESSA Max-tilauksella Sonnet-apulaisella pienellä muistilla, EI rajapintaa – OMISTAJAN PÄÄTÖS 13.24 kumoaa 12.46:n; API-saldo 0, ei osteta)
- k2 + vartija valmiina: media.matkakirja.app/taidemuseo/louvre-ihmiset-v1/{k2,vartija}.glb (30 k, 2K; kevennys $L/tripo/kevenna.py).
- 19.10. klo 10 jälkeen: k1:n hiukset, Pulun korjaukset (niskasauma; silmät ORANSSEIKSI #E07A1F – Tripo-Pulun 11.41 silmät olivat RUSKEAT, pelin piirroksessa oranssit (PT 18.10. korjaus); pyrstö viuhkaksi), Puyi + vartija luurankoineen
  (rig-check → rig → retarget; Humanoid; Quaternius UAL CC0 lisäliikkeet). Kaikki Tripo-sivuston kautta Chromessa (Max-tilaus), apulaisena
  Sonnet pienellä muistilla; EI rajapintaa eikä TRIPO_API_KEY:tä (saldo 0).
  Junat (PT 18.10.): koodikyyhky MuseoPulu.cs otetaan pois junasta 202; Tripo-Pulu korvaa sen junassa 203.
  Generoinnit vain omistajan lupien mukaan, ei ostoja. Latauslupa: kaikki peliin hyväksytyt Tripo-mallit (omistaja 11.46). Yksityiskohdat: edellinen kohdat 5, 6, 11, 13.

## 4. SIIVOUS
T7 "/Volumes/T7 4TB/arkisto/valoseppa/20261018/" (appit, louvre1, valas-havainne, tripo-raskas). _tyo/linssiseppa2 2,0 G.

## 5. JONO
1. Kohta 0 (korjausvarmistus) → 2. Louvren KK-palaute / louvre4 (LR) → 3. 19.10. Tripo Chromessa (Sonnet-apulainen) → 4. ISS-kuvan alueen nimi (TAUOLLA-listan ulkopuolella, pieni).
