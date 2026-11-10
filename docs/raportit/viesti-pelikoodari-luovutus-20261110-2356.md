- 00.2x: 2. ajo (L1) yhä viallinen → p1/ajo2-viallinen-L1/. SYY: linjan 1 datakansiosta puuttuvat palatsin mallit (jälkeen-loki
  "palatsi v2: osamalleja 0, ovia 0 (osamallit791-v10/)", ennen-loki "ovikoe koe → ovet vaatii palatsin", peli päättyi "Uuvuit!").
  Skenaario on kunnossa. JU:lta pyydetty 3. ajo LINJALLA 2 (aja-p1.zsh 2 3199b079a), kuittaus "P1 AJETTU" tulee SEURAAJALLE.
  SEURAAJA: tarkista lokista "ovet koe: 245 ovea" molemmissa ja rakennukset kuvissa; pari k2 + a2 (sips -Z 1000, rinnakkain ennen|jälkeen)
  → KK:lle näkyvänä työnä, kopio PT:lle, + P1-TOTEUTUS.txt; sitten pt-ok-pyyntö PT:lle 3199b079a. Jos L2:kin ilman palatsia → JUMI-rivi PT:lle.
- 00.4x: 3. ajo (L2) VIALLINEN TOISIN PÄIN → p1/ajo3-viallinen-L2/: ennen = ovet ilman palatsia ("osamalleja 0"), jälkeen = palatsi ilman ovia
  ja peli päättyi "Uuvuit!" (79 m, 0:30) → kamera väärässä paikassa. Eli EI linjavika vaan ajoitus/kilpajuoksu: palatsin osamallien lataus vs.
  ovikoe, ja keisarin elinvoima loppuu ennen kuvia. KORJAA sk-p1.txt ennen 4. ajoa:
  (1) `ui juoksupeli elinvoima 1000` heti latauksen jälkeen (etela-ajo käytti), (2) odota palatsin mallit: `oleta 600 palatsi v2: LOD1-kierros`
  tai toimivan osa8-skenaarion tapaan `odota 30` + tarkastelu (osa8-ovet/sk-mac-ovet-kiinni-auki.txt toimi 10.11. 18.4x),
  (3) ennen taso 0 -kohtaa `ui juoksupeli ovikoe koe` vasta, kun lokissa "ovet: mallit valmis". Pyydä sitten JU:lta 4. ajo (L2).
