# Pelikoodari: luovutus 3.11.2026 klo 19.06 – juna 218

Edellinen: -20261103-1850 (8013aa09e + de4a6302e), voimassa ellei alla toisin. Syy: kontekstiraja 25 % (7.37) arkihahmojen
kytkennän ensimmäisen erän jälkeen. Proto-haarat paikallisia (repo /Users/Shared/Claude/proto-3d/Matkakirja-proto).

## Tehty 18.50–19.06
- Taustaprosessien tarkistus (PT 19.5x, JU:n vahinko 18.50): Pelikoodarilla ei omia taustaketjuja; al/am ovat JU:n linjoja. Ei rivejä PT:lle.
- **ARKIHAHMOJEN KYTKENTÄ, ERÄ 1 VALMIS (lipun takana)**: proto **pelikoodari/arkihahmot-218 5a8496836** (1ab6dfa38 = horisontti-218am:n
  kärjen päällä), wt /Users/Shared/Claude/wt/proto-pelikoodari-arkihahmot. Peli-testit 813/813, unity-tarkistus 0.
  - Peli/Juoksupeli/JuoksuPalvelija.cs (puhdas, oma kerros; omistaja 18.45): V4Palvelija kujan kehyksessä (Osa, T, Sivu; ennakko ja
    peilaus toimivat), JuoksuPalvelijat.Kujalle/Askel. Kujilla (leveys < 5 m) ruokaeunukki/palvelijatar kävelevät 0,85 m/s ±10 % kujasta
    kohdan 0,24 L ympärillä (70 % Puyia vastaan); aukioilla (≥ 5 m) vedenkantaja idle ja lakaisija sweep. 30 % kujista kolmannesta alkaen,
    ≥ 12 m, ei korttelin huoneissa. Sivu seinän vierellä kaistojen ulkopuolella → kauempi kaista ohittaa. Säikähdys ≤ 1,2 m vaakatasossa
    (korkeusero < 1,5 m) → startle 1,0 s → startle_idle 2,0 s → walk_empty kohti kujan päätä. Ei elinvoimakulua, ei Tapahtumia.
    Oma siemen Hash(…, 36–38, n): muu sisältö ennallaan (testi vertaa esteet/omenat/aarteet ja juoksun).
  - JuoksuV4.cs: Reitti.Palvelijat (Jatka poistaa ennakon toistoarvonnan, lyhennetty kuja poistaa yli jäävät), Saanto.Saikahdykset.
  - Scripts/Arkihahmot/ArkiHahmot.cs (yleiskäyttöinen): Pyyda/Valmis/UusiHahmo/UusiEsine/Tavara/Irrota. Ihoverkkosolmut (skin 0)
    yhdeksi SMR:ksi, tavara-solmun staattiset verkot MeshRenderereinä; skaala 1, kääntö JuoksuHahmot.KaantoAste. JuoksuHahmot.Materiaali
    erotettu jaettavaksi (Puyin käytös ennallaan).
  - Scripts/Juoksupeli/JuoksuV4Maailma.Palvelijat.cs: näkymät 45 m (poisto 60 m); irrotus 0,40 s: tavaran juuri = tavara-solmun
    maailmamatriisi (RUNTIME-CONTRACT; juuren oma TRS identiteetiksi = sama yhtälö), ballistinen lento käden nopeudella + 0,8 m/s ylös +
    pyörähdys; osuma: jäänne (posliinin sirpale-1…8 sinkoutuvat 0,35 s, ruoka, ämpärit + wet-puddle kasvaa 0,8 s), luuta jää lattialle
    (varren arvaus: solmun up-akseli vaakaan – tarkista kuvasta). PalvelijaPudotukset → JuoksupeliNakyma.Kerta (JuoksuAanet.Pudotus:
    maljakko posliini-1/2, muut puu-1/2; vedelle ei omaa ääntä).
  - QA `ui juoksupeli palvelijat 0|1` (oletus pois, seuraavasta juoksusta; tila tulostaa näkymät, pudotukset, arkihahmojen lataus).
  - Mallit haetaan https://media.matkakirja.app/juoksupeli/arkiset-v1/ – JU:n vienti (PT kuittasi) tarvitaan ennen kuvia.

## SEURAAVA
0. **PELIKUVAPARI PT:lle JU:n vuorolla** (lippu `palvelijat 1`): hahmot pelikamerasta, palvelijattaren maljakko takaa (Codexin huomio:
   ei näy takaa), sirpaleiden väri (valkoiset), luudan asento lattialla, säikähdyksen ajoitus ja kävelyn liukuminen (0,85 m/s vs walk).
   Varmista ensin `palvelijat`-tilasta, että 11 tiedostoa latautuivat (ämpärissä). Sokkeloon tarvitaan kuja, jolla palvelija (siemen 777:
   144 kpl ennakossa, 5 säikähdystä 120 s:n bottiajossa).
1. Vedenkantajan fill_right/fill_left + idle/walk_after_fill WATER-POUR-CONTRACTista (ei tehty), mahdollinen oma vesiääni (Äänittäjä).
2. Yhdistys: arkihahmot-218 → am-linjaan tai uuteen pakettiin vasta PT:n kuittauksen jälkeen (oletus pois, joten yhdistys on turvallinen).
3. Edellisen luovutuksen kohdat 1–7 ja lisäys 18.5x ennallaan (keisarin nosto: YKSI rivi KK:lle, kun JU:n iso-ajo a92302399+ näyttää
   noston iPadilla).
4. Checkout /Users/Shared/Claude/Matkakirja-pelikoodari: luovutushaara koti/Matkakirja-pelikoodari (mainin päällä; tämä tiedosto sen kärjessä).

## Lisäys 19.1x
- **PELIN NIMI (OMISTAJAN PÄÄTÖS 19.02, PT)** "Viimeisen keisarin karkumatka": proto **pelikoodari/karkumatka-nimi-218 3c02f62fe**
  (NUI fd8fd6a76:n päällä; wt /Users/Shared/Claude/wt/proto-pelikoodari-karkumatka): loppukortin ja sääntökortin kapiteeli
  ui.pelit.juoksupeli (ennen "Kielletty kaupunki"), viimeinen-keisari.json ingressi/osio 8. Latauskuva ennallaan. SHA JU:lle (jonossa) + PT:lle.
- PT tiedoksi: LAV tekee lahipuut-v16:n; juoksupelin reittikerrokseen runkojen poisto reittikaistoilta ±3 m + kannatinpoistot →
  Pelikoodari kytkee kerroksen, kun LAV lähettää (ei vielä saatu).
