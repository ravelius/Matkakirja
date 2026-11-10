# Natiivi-UI: luovutus 10.11.2026 klo 23.05 (kontekstivahti 25 %; korvaa -2225:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, KS local_7b57e35a-3a8e-4943-aba1-c960b9eb4671
(KS:n seuraaja: luovutus 327b7125e), KK local_d5f31591-21fa-4cb0-bab3-bcd3435d075a.
TYÖTAPA (omistaja 21.38, KOE): näkyvän työn karkea kuva/video SUORAAN KK:lle, PT kopiona. Junaan vasta, kun KK on katsonut. Omistajalle vasta, kun ND toimii (KK).

## Koodi (koe, ei junaan)
Haara natiivi-backup `natiivi-ui/nahtavyys-paisuu`, worktree /Users/Shared/Claude/wt/proto-nui-paisuu. Kärki 7b1605f21:
- 1228952e8: kerroin ruudun mukaan (Paisunta.TavoiteOsuus 1/3 katseluetäisyydellä, katto 3; `ui paisunta osuus <x>`, 0 = metreistä).
  Esittelyn rajat tulevat piirtyvästä 1:1-koodimallista (Paisunta.PiirtyvaMalli, NahtavyysEsittely.TaysiMalli), ja rajaus mitoitetaan paisuneeseen kokoon (Paisunta.Rajaus = true).
- 9ea7f9fbc: merge juna 224 e3fab21a6 (KS:n vaalea kivi d36a7c7a2, talot v3).
- 6b7b00442 (KK 22.5x): zoomi ja koko PYSYVÄT valinnan ajan (NahtavyysEsittely.PalautaZoom ohittaa, kun Paisunta.Kohde != null; Paisunta.Paattyi palauttaa).
  Kiinteällä kameralla kerroin rajataan niin, että malli mahtuu ruutuun (MahtuvaKerroin, RuutuVara 0,03); jo tavoitteen kokoinen → ei kasvua.
- 7b1605f21 (PT/KK 23.0x kyltit, KS:n lupa 23.0x): OhjelmaKohteet.KoodiMalli + Kylttikohde.TRajat lukee näkyvän koodimallin rajat
  (kyltti, Osuu, Peittaa, PeittaaTarkasti = rajalaatikko, TaysiMalli; MallinKarjet epätosi koodimallille). **KS katsoo ennen junaa:
  sha KS:lle tai seuraajalle.** Panthéon (KS:n haara b8fed770e) saa saman korjauksen automaattisesti (Korvaa != null), kun se yhdistyy.
- Kaikki käännetty `sh Peli-testit/unity-tarkistus.sh`: 0 virhettä.

## Tehty ja lähetetty
- paisunta-4 (Riemukaari, 1228952e8) KK:lle ja PT:lle 22.56: esittelyssä RK ~1/3 ruudusta (0,32, zoomi 2,2, 1,68 km), paluu ✕:llä.
  KK 22.5x: "koko oikea"; korjattavat (pysyvyys, ruutuun mahtuminen) tehty 6b7b00442:ssa.
- Selvitys lähimmästä kamerasta PT:lle: a3f374468 docs/raportit/nui-lahin-kamera-1-1-20261110.md. Raja on PiirrosKerros.IsoisaLahinLeveys 0,525 (~1,75 km).
  ND ≥ 1/5 vaatii ~2,7 × lähemmäs (hinta: pehmeä piirros). Esittelyn 1/3 onnistuu ilman muutosta.

## JU:n jonossa (lokit /Users/Shared/Claude/proto-3d/lokit/)
1. nui-paisunta-5-1228952e8 (sk-paisunta-5.txt): kuvat k1-lahin-nyt / k2-lahizoomi-2-7 = kuvapari PT:lle (vapaa kamera lähin nyt / 2,7 ×). b-esittely-nd on vanhaa koodia: älä lähetä KK:lle.
2. nui-paisunta-6-6b7b00442 (sk-paisunta-6.txt): ND vaalealla kivellä, talot ämpäristä v3. Tarkista loki: "talot tila" palat > 0,
   "ruutuun mahtuu", "zoomi pysyy", Shader-error 0. KK:lle (kopio PT): b-esittely-nd.mp4 (pakkaa: ffmpeg -crf 26), a-kiintea-nd.mp4,
   kuvapari a0-ennen / a2-paisunut ja ARKKI 6–8 ruutua pelkästä kasvusta (0,5 s = 25 ruutua 50 fps:llä) ja paluusta (0,35 s)
   a-kiintea-nd/k-*.jpg:stä (aloita noin 1 s tallenteen alusta; valitse ruudut eroista). Kansio _tyo/natiivi-ui/paisunta/paisunta-6-*.
   KK katsoo: naapurit ja puut väistyvät ja palaavat, seinät eivät leikkaudu, liike pehmeä.
3. nui-kyltit-1-1-1-7b1605f21 (sk-kyltit-1-1-1.txt, KJ9:n kamerat): pari kivi-*.png (lokit/karttaseppa-kivi-kj9-d36a7c7a2) / kyltti-*.png
   → KK:lle (kopio PT, sha KS:lle). Tavoite: kyltti mallin juurella, ei naapurin (Sainte-Chapelle) vieressä.

## JONO (KK:n järjestys)
1. paisunta-6 → KK. Sen jälkeen KK:n palautteen mukaan; EIFFEL: korkeille muu ele (pieni nousu + valo), KK hyväksyi ND:n jälkeen.
2. Kyltit (yllä 3).
3. Vapaan kameran lähin: KK/PT päättää kuvaparista (paisunta-5). Muutos olisi KS:n PiirrosKerros.cs tai NS:n puoli (PT: "kerro PT:lle, jos tarvitset NS:ää").
4. HUOMENNA: iso iPad 0f0f950a6 (KS:n yhdistelmä; JU ajaa): grep "esteet ohitettu|estevirheitä|nähtävyyslataus|Exception" → PT (+ KS loki).
5. TARINAMERKIT: odottaa Codexin toimitusta (_review-tarinamerkit-20261110/ origin/claude/postilaatikko). Kierros 2 KK:lle (kopio PT).

Tunnettu: ajon alussa "ESIKATSELU POIKKEUS ArgumentOutOfRangeException" (myös paisunta-3:ssa, ei paisunnasta).
