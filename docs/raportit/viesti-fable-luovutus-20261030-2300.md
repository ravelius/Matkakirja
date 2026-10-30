# PT:n luovutus 30.10.2026 klo 23.00

Edellinen: viesti-fable-luovutus-20261030-2120.md. Viestit aina id:llä (mcp__ccd_session_mgmt__send_message). Osoitteet: /Users/Shared/Claude/osoitekirja.md.

## Tehty (21.23–23.00)
- Juna 216: osasarja-v5 (kujien 02/05 kivijalkaregressio korjattu; omistaja 21.55 "Kelpaa"), Pariisin kartta c6a58d63f
  (omistaja 22.27: koot, vaaleat kadut, zoom 2× Z17; pyramidikin mittakaavaan PT:n päätöksellä), VS valo-216 4b4a6d947
  (half4→float4) → runko 782e348cf, testit vihreät. Oletus yhä vertailuvalo.
- OMISTAJA 22.27: "Tee kaikki samaan junaan ja julkaise vasta kun valo valmis" → EI junaa 217; TF vasta kun valo valmis ja
  hyväksytty (loki PR 5674). Asemataulu: 217-rivi yhdistetty 216:een; tila "Työn alla (runko 782e348cf)" (Asemataulun säännöt:
  tila ≤ 80 merkkiä, ei sanaa "valmis"; teksti alkaa "Työn alla:").
- Julkisivut (Taihemen v3, Taihedian v3, sivuhallit v2) oli jo hyväksytty 12.28/12.36 – PT:n turha korttipyyntö peruttu.
- Pariisin kartan loki PR 5669 (omistaja 21.42–21.50).
- Metro (Codex b2edc860e) omistaja 22.58 Kelpaa. KS mergesi PR 5677 (414be3ca7) myös EHJÄN Tuileries-palatsin, ennen PT:n pitoa.
- PT pysäytti PK:n turhan Unity-esikatselun 22.43 levyhätänä (swap 28 Gt täynnä).

## Kesken (jono)
1. VALO = junan 216 lähtöehto. VS diagnoosi 2: editorin batch-kaappaus ei piirrä varjokarttaa eikä leivottua valoa lainkaan
   (varjot muuttaa vain yleistasoa ~0,88). Diagnoosi 3 (linssiseppa2/varjo-diag3 972650080) ajossa 22.59 LAV:n Blenderin rinnalla
   (PT:n lupa). NS: iPad-käännös 782e348cf → LT 2 kuvaa `valo vertailu 0` (kuja 02 + aukio): näkyvätkö varjot laitteella → VS + PT.
2. LAV-leivonta: jatka-ns-jalkeen.zsh käynnisti rak 45/136 → tausta TUPLAT=1 v5-muureilla → osasarja-v6 (aamupäivä 31.10.).
   Yksi Blender; levyvahti < 82 Gi pysäyttää. 95 Gi -ehto poistettu (swap ei vapauta levyä ennen uudelleenkäynnistystä).
3. TUILERIES: kohde "Tuileriain rauniot", tarina 1873 raunioista. Omistaja hyväksyi 22.58 EHJÄN palatsin (kortti tehty ennen
   nimen selvitystä) ja se on jo mainissa (414be3ca7). KK:lle pyydetty kortti: A) repon käsin piirretty rauniopiirros
   pariisi-tuileriain-rauniot.webp (suositus) vai B) ehjä palatsi + nimi "Tuileriain palatsi". Vastauksen mukaan KS korjaa;
   tarkista onko vie-sisalto jo ajettu.
4. PK lahipuut-v12 (8b5337500, paketti _valmiit/juoksupeli-kk-pelikoodari-lahipuut-v12-vienti-20261030): 247 kujan puuta pois,
   muurien takana jäävät (omistaja 24.10. 02.38). EI KUITATTU: pari (02, 05, 07 peli + ylhäältä, kuja-8 orto, v11 233ba42b9 vs
   v12 a627dffbc) VS:n diagnoosi 3:n jälkeen → PT katsoo → JU vie → NS junaan 216.
5. Kuja 02 vasen muuri: ei vika rungossa (21.48 kuva vanhalla REF:llä, PK PR 5680); varmistus LT:n iPad-kuvasta.
6. Unity-ajot vain PT:n luvalla: yksi Unity kerrallaan + enintään yksi Blender; levy nyt ~85 Gi.
7. Valoerän lopuksi kortti KK:n kautta: valo oletuksena päälle? Tilinvaihto su 1.11. ~10–12, kaikki nollataan.

## Säännöt, jotka opin
- Ennen kuin välität omistajalle korttia, hae loki (loki-hae) – sama asia voi olla jo päätetty.
- Codex-tilauksen kohde tarkistetaan kohteen tekstistä (nimi + tarina), ei pelkästä kuvasta.
- Merge web-sisältöön = julkaisu kaikille; vasta omistajan OK:n jälkeen.
