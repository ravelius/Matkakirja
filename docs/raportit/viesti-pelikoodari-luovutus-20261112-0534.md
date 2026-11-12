# Pelikoodari: luovutus 12.11.2026 klo 05.34 (konteksti ~27 %, Raamattu 7.37)

Edellinen: viesti-pelikoodari-luovutus-20261112-0518.md (haara pelikoodari-luovutus-20261112-0518). TÄMÄ KORVAA SEN KOHDAN 1 ja lisäyksen;
kohdat 2 (massamittarin syy, valmis) ja 3 (työkopiot) ennallaan.

## 1. KAMERALAITE PALA 2: KK:N PÄÄTÖKSET 05.11 TEHTY, ODOTETAAN KK:N VALINTAA (viesti KK:lle lähetetty 05.33)
Tulos: /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kameralaite/TULOS-paatokset-0511.md (LUE KOKONAAN).
Koodi: natiivi-backup kameralaite/pala-2 @ ae7c3c004 (wt /Users/Shared/Claude/wt/proto-pelikoodari-kameralaite). Unity-tarkistus EI vielä tehty.
- 1–4 koodissa: Kameralaite.Leikkaa(asento, nopeus, katsenopeus) + T06b; ohjaajaan LeikkausAlku, leikkauksen vauhti, D suoran välin haulla,
  ehto (i) jäljen suhteen toistoon. 5a (KatseSivuAste 6, oletus) ja 5b (SeurantaAsetus tauVAhdas/paikkaSAhdas, ohjaaja.Tyyli(pohja)) koodissa;
  5b:n oletus = ei liukua. Testit: kaanna.sh 'Kameralaite|Seuranta' 41/43 (T07 1,52° > 1,5 5a:n takia; T14 kuja 30,8°), kameratoisto.sh T14 1/1.
- 6: a/j-huiput = seinätyöntö (0,5 m:n portainen SeinaEt), ω = vähittäinen ~150° käännös, laitteen oma katsepiste laitteen vieressä.
- 5a+5b: T5 ei täyty (ahdas 35° / 30°; (b) laitteen katseviive 45–52°). KK:lta kysytty: (1) keino T5:een, (2) 6:n korjaukset tähän palaan,
  (3) T7 1,52°. SEURAAVAKSI: KK:n vastaus koodiin → Unity-tarkistus → Mac-ajo JU:lle siemenellä 1942463309 (sk-kameralaite-pala2-siemen.txt,
  uusi sha) + peittoruutujen vienti 2749b7b77 (KK: ok).
- MASSAMITTARI (KK 05.19 kohta 2): Mac-ajon jälkikäsittelyyn massaetaisyys.py:n tuomari: ruutu TOSI vain, jos lähin pystypinta y ± 0,3
  < 0,3 m tai laite kappaleen sisällä; tuloste "massassa N, joista tosia M" + tosien rivit (S, kappale, etäisyys); hyväksyntä M = 0. EI TEHTY.
  GLB-lista (LOD1 palatsiOsat + avoimet-v52/*.glb, avoimet-sijoitus.json) kerättävä välimuistista; edellistä komentoriviä ei tallessa.
- Mittauskomennot: MITTAUS=c2b sh Linssit-testit/kaanna.sh C2b; MITTAUS=c2|c1 sh Linssit-testit/kameratoisto.sh C2Mittaus|C1Mittaus;
  MITTAUS=huiput [HUIPUT_RIVI=1–5] [HUIPUT_SARJA=siemen:t0:t1] kameratoisto.sh Huiput. Älä aja kahta kameratoisto.sh:ta yhtä aikaa.
Ei agentteja käynnissä. Ei uusia lupia.
