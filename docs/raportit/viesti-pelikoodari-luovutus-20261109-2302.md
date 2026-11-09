# Pelikoodari: luovutus 09.11.2026 klo 23.02

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (25 %) odotustauolla. Edellinen: `git show 14eabbc18:docs/raportit/viesti-pelikoodari-luovutus-20261109-2230.md`
(kaikki sen kohdat hoidettu tai alla). Kuvat ≤ 1000 px, laajat haut Sonnet-agenteilla. Viestit send_messagella session-id:llä.
Unity-työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu, nyt haaralla pelikoodari/juoksu-leivottu = 82ee46d21 (remote natiivi-backup).

## TEHTY TÄSSÄ VUOROSSA: JUOKSUPELIN LEIVOTTU LATAUS, VAIHE 1 (PT 23.0x, OMISTAJAN PYYNTÖ 22.24)
- Haara pelikoodari/juoksu-leivottu (pohja 224 b804a87d6): 3d0f62ae8 + fef369ae9 + 82ee46d21. unity-tarkistus 0 virhettä. EI junassa.
  - JuoksuLeivottu.cs: StreamingAssets/juoksu-leivottu/<ämpärin polku> + hakemisto.txt. JuoksuHahmot.Valimuistissa antaa paketin tiedoston
    (Hae + palatsin esihaku). PuraKuva/EsineKuva: .astcm-kuva → Reinitialize (sama sRGB/lin) + LoadRawTextureData, kaikki mipit.
    Ilman ASTC-tukea tai pakettia → ämpäri. QA `ui juoksupeli palatsi leivottu 0|1` ja `… leivontalista 1` (url:t LOKIIN riveinä
    "juoksupeli: leivontalista <url>"; tiedostoversio kirjoitti runnerin temp-kansioon, JU 22.53). Loppurivi "leivottu lataus …".
  - tyokalut/juoksu-leivonta.py LISTA|LOKI [ULOS] [--lohko 4x4|6x6]: glb:n kuvat → ASTC-mipketjut (TextureConverter Highest,
    rinnakkain 12), geometria tavulleen sama (tarkistettu). Lähteet ja .astcm välimuistissa _tyo/pelikoodari/juoksu-leivottu/{lahde,astcm};
    lähde tarkistetaan ämpäristä (koko + ETag). Kirjoittaa tyokalut/juoksu-leivonta-lista.txt (COMMITOI se oikealla listalla; nyt
    työpuussa on 6 rivin testilista, ÄLÄ commitoi sitä). Oletus-ULOS _tyo/pelikoodari/juoksu-leivottu/paketti-v1.
  - Rakennus.KopioiJuoksuLeivottu (PostProcessBuild 187): paketti-v1:n hakemiston tiedostot buildiin; ilman pakettia vain varoitus.
  - Koe 6 taustaglb:llä: 25 → 32 Mt (+28 %), 6,6 s. Koko paketti arviolta satoja Mt → raportoi koko PT:lle (6x6 puolittaa).
- PT 23.0x: leipominen toistettavaksi (tehty 82ee46d21). Omistaja 22.56: LAV tekee uuden lattian + valon → LAV ilmoittaa lähteiden
  muutoksesta → aja työkalu uudelleen. ÄLÄ muokkaa lattian geometriaa tai valoa. LAV:lle kerrottu: julkaise uusiin versiokansioihin.
- Kiertotärinä: JU:n ajo valmis (lokit/pk-kierto-tarina-dc2605d31), raportti NS:lle, ei toimia PK:lta.

## JONO
1. ODOTA JU:N MAC-LISTAUSAJOA (pyydetty fef369ae9:llä, skenaario _tyo/pelikoodari/juoksu-leivottu/sk-leivontalista.txt →
   lokit/pk-leivontalista-mac-fef369ae9; JU nollautuu ~23.3x, luovutus 307655f43). Sitten:
   `tyokalut/juoksu-leivonta.py /Users/Shared/Claude/proto-3d/lokit/pk-leivontalista-mac-fef369ae9/unity.log` (taustalla, Monitor),
   tarkista "VALMIS N glb" (~439), commitoi tyokalut/juoksu-leivonta-lista.txt haaraan, push.
2. JU:lle: iPad-käännös 82ee46d21:stä (tai uudemmasta) + sk-ipad-leivottu-0.txt / -1.txt vuorotellen 0,1,0,1 →
   lokit/pelikoodari-leivottu-{0a,1a,0b,1b}. Vertaa "latauksen ositus" (koko aika, rakenna, kuvien purku/pakkaus), huippu, "leivottu lataus".
   Rivi PT:lle luvuista + paketin koko. Kuvapari (ulkoasu ETC2 → ASTC 4x4) PT:lle, jos PT pyytää.
3. Vaihe 2 (PT:n "valmiit verkot"): RakennaSolmut-ryhmät (keruu ~1 s + muu rakenna ~1,2 s) leivottuina vasta mittauksen jälkeen.
   Muut ~13 s: lähipuut/koristeet 0,9 s, salit+katot 1,6 s, peittokartta 0,8 s, kaiteet/räystäät 2,7 s, juoksun sisältö 2,7 s,
   taivas 1,2 s (aikajana lokit/pelikoodari-lataus-glb-0c/muisti-tarkka.log 135.5–156.6 s). Ehdota PT:lle seuraava.

Testit: `sh Peli-testit/unity-tarkistus.sh` (työpuussa, sh ei zsh; ei kata Editor-kansiota).
